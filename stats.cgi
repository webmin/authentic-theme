#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

require($ENV{'THEME_ROOT'} . "/stats-lib.pl");
our ($config_directory, $current_theme, $root_directory, $var_directory,
     $base_remote_user, %text);

# Check access
init_prefail();
if (!defined(&webmin_user_is_admin) || !webmin_user_is_admin()) {
    print_json({ error => $text{'index_noadmin_eaccess'}, access => 0 });
    exit;
}

# Check dependencies
my @errors;
my @modnames = ("Digest::SHA", "Digest::MD5", "IO::Select",
                "Time::HiRes", "Net::WebSocket::Server");

foreach my $modname (@modnames) {
    eval "use ${modname};";
    if ($@) {
        push(@errors, $@, $modname);
        push(@errors, text('index_mods_missing', $modname));
        last;
    }
}
if (@errors) {
    print_json({ error => $errors[2], 
                 error_module => $errors[1],
                 error_stack => $errors[0] });
    exit;
}

# Get the log file
my $get_logfile = sub {
    my ($port) = @_;
    return "$var_directory/modules/$current_theme/stats-server-$port.log";
};

# Get the socket URL
my $get_socket = sub {
    my ($port) = @_;
    return get_miniserv_websocket_url($port, undef, $current_theme);
};

# Prevent race condition
my $tempname_dir = tempname_dir();
my $lock_file = "stats-server-locking";
my $lock_file_checked = 0;
while ($lock_file_checked < 3 && -r "$tempname_dir/$lock_file") {
    $lock_file_checked++;
    sleep(1);
}
my $lock = transname($lock_file);
my $lockfh;
open_tempfile($lockfh, ">$lock");
print_tempfile($lockfh, $$);
close_tempfile($lockfh);
sleep(1);

# Do we have an active socket?
my %miniserv;
get_miniserv_config(\%miniserv);
foreach my $k (keys %miniserv) {
    if ($k =~ /^websockets_\/$current_theme\/ws-(\d+)$/) {
        my $port = $1;
        my $host = $miniserv{$k};
        ($host) = $host =~ /.*host=([^ ]+).*/;
        next if (!$host);

        # Is this socket still active?
        my $err;
        open_socket($host, $port, my $fh, \$err);
        next if ($err);
        print_json({ success => 1, port => $port, new => 0,
                     socket => $get_socket->($port),
                     errlog => $get_logfile->($port) });
        exit;
    }
}

# Allocate port
my $port = allocate_miniserv_websocket($current_theme, $base_remote_user);

# Launch the stats server
my $server_name = "stats.pl";
my $statsserver_cmd = "$config_directory/$current_theme/$server_name";
create_wrapper($statsserver_cmd, $current_theme, $server_name)
    if (!-r $statsserver_cmd);

# Launch the server in a sub-process (no fork)
my $logfile = $get_logfile->($port);
my $rs = system_logged(
    "SESSION_ID=$main::session_id ".
    "$statsserver_cmd @{[quotemeta($port)]} ".
    ">$logfile 2>&1 </dev/null &");

# Return the result
print_json({ success => !$rs, port => $port,
             socket => $get_socket->($port),
             new => 1, errlog => $logfile });

# Make sure the server is up
sleep(1);
