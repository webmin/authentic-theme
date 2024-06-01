#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

require($ENV{'THEME_ROOT'} . "/stats-lib.pl");
our ($config_directory, $current_theme, $root_directory, $var_directory, %text);
do "$root_directory/websockets-lib-funcs.pl";

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

# Allocate port
my $port = &allocate_miniserv_websocket();

# Launch the stats server
my $server_name = "stats.pl";
my $statsserver_cmd = "$config_directory/$current_theme/$server_name";
&create_wrapper($statsserver_cmd, $current_theme, $server_name)
    if (!-r $statsserver_cmd);

# Launch the server
my $logfile = "$var_directory/modules/$current_theme/stats-server-$port.log";
my $rs = &system_logged(
    "SESSION_ID=$main::session_id ".
    "$statsserver_cmd @{[quotemeta($port)]} ".
    ">$logfile 2>&1 </dev/null &");
print_json({success => !$rs, port => $port, errlog => $logfile});
