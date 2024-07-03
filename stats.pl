#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use lib ("$ENV{'PERLLIB'}/vendor_perl");
use Net::WebSocket::Server;
use utf8;
use JSON;

our ($current_theme);
require($ENV{'THEME_ROOT'} . "/stats-lib.pl");

# Get port number
my ($port) = @ARGV;

# Check if user is admin
if (!webmin_user_is_admin()) {
    remove_miniserv_websocket($port, $current_theme);
    error_stderr("WebSocket server cannot be accessed because the user is not a master administrator");
    exit(2);
}

# Clean up when socket is terminated
$SIG{'ALRM'} = sub {
    remove_miniserv_websocket($port, $current_theme);
    error_stderr("WebSocket server timeout waiting for a connection");
    exit(1);
    };
alarm(60);

# Log successful connection
error_stderr("WebSocket server is listening on port $port");

# Get currently saved stats
my $stats_histoy = get_stats_history();

# Start WebSocket server
Net::WebSocket::Server->new(
    listen     => $port,
    tick_period => 1,
    on_tick => sub {
        my ($serv) = @_;
        # If asked to stop running, then shut down the server
        if ($serv->{'disable'}) {
            $serv->shutdown();
            return;
        }
        # Collect current stats and send them to all connected
        # clients unless paused for some client
        my $stats_now = encode_json(get_stats_real());
        foreach my $conn_id (keys %{$serv->{'conns'}}) {
            my $conn = $serv->{'conns'}->{$conn_id}->{'conn'};
            if ($conn->{'verified'} && !$conn->{'paused'}) {
                $conn->send_utf8($stats_now);
            }
        }
        # If interval is set then sleep minus one
        # second becase tick_period is one second
        if ($serv->{'interval'} > 1) {
            sleep($serv->{'interval'}-1);
        }

        # Save stats to history
        if ($serv->{'ticked'}++ % 30 == 0) {
            # XXXX
        }
    },
    on_connect => sub {
        my ($serv, $conn) = @_;
        error_stderr("WebSocket connection $conn->{'port'} opened");
        $serv->{'clients_connected'}++;
        alarm(0);
        # Set post-connect activity timeout
        $SIG{'ALRM'} = sub {
            error_stderr("WebSocket connection $conn->{'port'} is closed due to inactivity");
            $conn->disconnect();
        };
        alarm(15);
        # Set maximum send size
        $conn->max_send_size(256 * 1024);
        # Handle connection events
        $conn->on(
            utf8 => sub {
                # Reset inactivity timer
                alarm(0);
                # Decode JSON message
                my ($conn, $msg) = @_;
                utf8::encode($msg) if (utf8::is_utf8($msg));
                my $data = decode_json($msg);
                # Connection permission test unless already verified
                if (!$conn->{'verified'}) {
                    my $user = verify_session_id($data->{'session'});
                    if ($user && webmin_user_is_admin()) {
                        # Set connection as verified and continue
                        error_stderr("WebSocket connection for user $user is granted");
                        $conn->{'verified'} = 1;
                    } else {
                        # Deny connection and disconnect
                        error_stderr("WebSocket connection for user $user was denied");
                        $conn->disconnect();
                        return;
                    }
                }
                # Update connection variables
                $conn->{'paused'} = $data->{'paused'} // 0;
                # Update WebSocket server variables
                $serv->{'interval'} = $data->{'interval'} // 1;
                $serv->{'disable'} = $data->{'disable'} // 0;
                $serv->{'shutdown'} = $data->{'shutdown'} // 0;
            },
            disconnect => sub {
                my ($conn) = @_;
                $serv->{'clients_connected'}--;
                error_stderr("WebSocket connection $conn->{'port'} closed");
                # If shutdown requested and no clients connected
                # then exit the server
                if ($serv->{'shutdown'} && $serv->{'clients_connected'} == 0) {
                    error_stderr("WebSocket server is shutting down on last client disconnect");
                    $serv->shutdown();
                }
            }
        );
    },
    on_shutdown => sub {
        # Shutdown the server and clean up
        my ($serv) = @_;
        error_stderr("WebSocket server has gracefully shut down");
        remove_miniserv_websocket($port, $current_theme);
        cleanup_miniserv_websockets([$port], $current_theme);
        exit(0);
    },
)->start;
error_stderr("WebSocket server failed");
remove_miniserv_websocket($port, $current_theme);
cleanup_miniserv_websockets([$port], $current_theme);

1;
