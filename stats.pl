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
my ($wsconn, $thread);
my $stats_extract :shared = 0;
my $stats_interval :shared = 1;
my $stats_running :shared = 0;

# Start WebSocket server
Net::WebSocket::Server->new(
    listen     => $port,
    on_connect => sub {
        my ($serv, $conn) = @_;
        &error_stderr("WebSocket connection established");
        if ($wsconn) {
            &error_stderr("Unexpected another connection attempted to the same port.");
            $wsconn->disconnect();
            return;
        }
        $wsconn = $conn;
        alarm(0);
        
        $conn->on(
            handshake => sub {
                # Is the key valid for this Webmin session?
                my ($conn, $handshake) = @_;
                my $key   = $handshake->req->fields->{'sec-websocket-key'};
                my $dsess = &encode_base64($main::session_id);
                $key   =~ s/\s//g;
                $dsess =~ s/\s//g;
                if (!$key || !$dsess || $key ne $dsess) {
                    &error_stderr("Key $key does not match session ID $dsess");
                    $conn->disconnect();
                    }
                },
            utf8 => sub {
                my ($conn, $msg) = @_;
                utf8::encode($msg) if (utf8::is_utf8($msg));
                my $data = decode_json($msg);
                $stats_extract = $data->{'save'};
                $stats_interval = $data->{'interval'};
                $stats_running = $data->{'running'};
                my $collect = sub {
                    while ($stats_running) {
                        $wsconn->send_utf8(encode_json(stats($stats_extract)));
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
                &error_stderr("WebSocket connection closed");
                &remove_miniserv_websocket($port);
                kill('KILL', $pid) if ($pid);
                exit(0);
                }
            );
    },
)->start;
&error_stderr("WebSocket server failed");
&remove_miniserv_websocket($port);
&cleanup_miniserv_websockets([$port]);

# 1;
