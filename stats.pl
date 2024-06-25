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
use threads::shared;

our ($current_theme);
require($ENV{'THEME_ROOT'} . "/stats-lib.pl");

# Get port number
my ($port) = @ARGV;

# Check if user is admin
if (!webmin_user_is_admin()) {
    &remove_miniserv_websocket($port, $current_theme);
    &error_stderr("WebSocket server cannot be accessed because the user is not a master administrator");
    exit(2);
}

# Clean up when socket is terminated
$SIG{'ALRM'} = sub {
    &remove_miniserv_websocket($port, $current_theme);
    &error_stderr("WebSocket server timeout waiting for a connection");
    exit(1);
    };
alarm(60);

# Log successful connection
&error_stderr("WebSocket server is listening on port $port");

# Used variables
my $stats_stack :shared = 0;
my $stats_interval :shared = 1;
my $stats_running :shared = 1;
my $clients_connected :shared = 0;
my $server_shutdown :shared = 0;
my $server_paused :shared = 0;

# Start WebSocket server
Net::WebSocket::Server->new(
    listen     => $port,
    tick_period => 1,
    on_tick => sub {
        my ($serv) = @_;
        # If asked to stop running, then shut down the server
        if (!$stats_running) {
            $serv->shutdown();
            return;
        }
        # Collect stats and send them to all connected clients unless paused
        my $stats = encode_json(stats($stats_stack));
        if (!$server_paused) {
            foreach my $conn_id (keys %{$serv->{'conns'}}) {
                my $conn = $serv->{'conns'}->{$conn_id}->{'conn'};
                if ($conn->{'verified'}) {
                    $conn->send_utf8($stats);
                }
            }
        }
        # If interval is set then sleep minus one
        # second becase tick_period is one second
        if ($stats_interval > 1) {
            sleep($stats_interval-1);
        }
    },
    on_connect => sub {
        my ($serv, $conn) = @_;
        &error_stderr("WebSocket connection $conn->{'port'} established");
        $clients_connected++;
        alarm(0);
        # Set post-connect activity timeout
        $SIG{'ALRM'} = sub {
            &error_stderr("WebSocket connection $conn->{'port'} is closed due to inactivity");
            $conn->disconnect();
        };
        alarm(15);
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
                    my %miniserv;
                    foreign_require('acl');
                    &get_miniserv_config(\%miniserv);
                    &acl::open_session_db(\%miniserv);
                    my $client_allowed = 0;
                    foreach my $k (grep { $acl::sessiondb{$_} } keys %acl::sessiondb) {
                        if ($k eq $data->{'session'}) {
                            my ($user) = split(/\s+/, $acl::sessiondb{$k});
                            last if (!$user);
                            if ($user !~ /^(root|admin|sysadm)$/) {
                                my %access = &get_module_acl($user, "");
                                if ($access{'_safe'} == 1 || $access{'rpc'} == 0) {
                                    # Disconnect if user is not a master administrator
                                    &error_stderr("WebSocket connection for user $user was denied");
                                    $conn->disconnect();
                                    return;
                                }
                            }
                            $client_allowed++;
                            &error_stderr("WebSocket connection for user $user is granted");
                            last;
                        }
                    }
                    # If session id is unknown then disconnect as well
                    if (!$client_allowed) {
                        &error_stderr("WebSocket connection closed as it cannot be verified");
                        $conn->disconnect();
                        return;
                    }
                    # Set connection as verified
                    $conn->{'verified'} = 1;
                }
                # Update shared variables
                $stats_stack = $data->{'stack'} // 0;
                $stats_interval = $data->{'interval'} // 1;
                $stats_running = $data->{'running'} // 1;
                $server_shutdown = $data->{'shutdown'} // 0;
                $server_paused = $data->{'paused'} // 0;
            },
            disconnect => sub {
                my ($conn) = @_;
                $clients_connected--;
                &error_stderr("WebSocket connection $conn->{'port'} closed");
                # If shutdown requested and no clients connected
                # then exit the server
                if ($server_shutdown && $clients_connected == 0) {
                    &error_stderr("WebSocket server has shut down on last client disconnect");
                    &remove_miniserv_websocket($port, $current_theme);
                    exit(0);
                }
            }
        );
    },
)->start;
if ($stats_running) {
    &error_stderr("WebSocket server failed");
}
else {
    &error_stderr("WebSocket server has gracefully shut down");
}
&remove_miniserv_websocket($port, $current_theme);
&cleanup_miniserv_websockets([$port], $current_theme);

1;
