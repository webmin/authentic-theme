#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use lib ("$ENV{'PERLLIB'}/vendor_perl");
use Net::WebSocket::Server;
use utf8;
use JSON;
use threads;
use threads::shared;
use threads 'exit' => 'threads_only';

require($ENV{'THEME_ROOT'} . "/stats-lib.pl");
do "$root_directory/websockets-lib-funcs.pl";

# Get port number
my ($port) = @ARGV;

# Check if user is admin
if (!webmin_user_is_admin()) {
    &remove_miniserv_websocket($port);
    &error_stderr("WebSocket server cannot be accessed because the user is not a master administrator");
    exit(2);
}

# Clean up when socket is terminated
$SIG{'ALRM'} = sub {
    &remove_miniserv_websocket($port);
    &error_stderr("WebSocket server timeout waiting for a connection");
    exit(1);
    };
alarm(60);

# Log successful connection
&error_stderr("WebSocket server is listening on port $port");

# Used variables
my ($thread);
my $stats_stack :shared = 0;
my $stats_interval :shared = 1;
my $stats_running :shared = 1;
my $clients_connected :shared = 0;
my $client_disconnected :shared = 0;
my $server_shutdown :shared = 0;

# Start WebSocket server
Net::WebSocket::Server->new(
    listen     => $port,
    on_connect => sub {
        my ($serv, $conn) = @_;
        &error_stderr("WebSocket connection $conn->{'port'} established");
        $client_disconnected = 0;
        $clients_connected++;
        $thread = undef;
        alarm(0);
        # Set post-connect activity timeout
        $SIG{'ALRM'} = sub {
            &error_stderr("WebSocket connection $conn->{'port'} will be closed due to post-connection inactivity");
            $conn->disconnect();
        };
        alarm(1);
        # Handle connection events
        $conn->on(
            utf8 => sub {
                # Reset inactivity timer
                alarm(0);
                # Decode JSON message
                my ($conn, $msg) = @_;
                utf8::encode($msg) if (utf8::is_utf8($msg));
                my $data = decode_json($msg);
                # Connection permission test
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
                                &error_stderr("WebSocket connection for user $user will be closed because the user is not a master administrator");
                                $conn->disconnect();
                                return;
                            }
                        }
                        $client_allowed++;
                        &error_stderr("WebSocket connection for user $user is granted as the user is a master administrator");
                        last;
                    }
                }
                # If session id is unknown then disconnect as well
                if (!$client_allowed) {
                    &error_stderr("WebSocket connection will be closed because the session for the user cannot be verified");
                    $conn->disconnect();
                    return;
                }
                # Set connection as verified
                $conn->{'verified'} = 1;
                # Set shared variables
                $stats_stack = $data->{'stack'} // 0;
                $stats_interval = $data->{'interval'} // 1;
                $stats_running = $data->{'running'} // 1;
                $server_shutdown = $data->{'shutdown'} // 0;
                my $collect = sub {
                    while ($stats_running) {
                        # Exit this thread if new client connected
                        last if (scalar(keys %{$serv->{'conns'}})
                            != $clients_connected && !$client_disconnected);
                        # Pull stats and send to all connected clients
                        my $stats = encode_json(stats($stats_stack));
                        foreach my $conn_id (keys %{$serv->{'conns'}}) {
                            my $conn = $serv->{'conns'}->{$conn_id}->{'conn'};
                            if ($conn->{'verified'}) {
                                $conn->send_utf8($stats);
                            }
                        }
                        sleep($stats_interval);
                    }
                };
                # Ensure thread is restarted if needed
                if (!$stats_running) {
                    $thread->join() if ($thread && $thread->is_joinable());
                    $thread = undef;
                }
                # Initiate non-blocking data collection using shared
                # variables for controlling the loop from the client
                if ($stats_running && (!$thread || !$thread->is_running())) {
                    $thread = threads->create($collect);
                }
            },
            disconnect => sub {
                my ($conn) = @_;
                $client_disconnected = 1;
                $clients_connected--;
                &error_stderr("WebSocket connection $conn->{'port'} closed");
                # If shutdown requested and no clients connected
                # then exit the server
                if ($server_shutdown && $clients_connected == 0) {
                    foreach my $thr (threads->list(threads::all)) {
                        if ($thr->is_joinable()) {
                            $thr->join();
                        } else {
                            $thr->detach();
                        }
                    }
                    &error_stderr("WebSocket server has shut down");
                    &remove_miniserv_websocket($port);
                    exit(0);
                }
            }
        );
    },
)->start;
&error_stderr("WebSocket server failed");
&remove_miniserv_websocket($port);
&cleanup_miniserv_websockets([$port]);

1;
