#!/usr/bin/perl
# config_save.cgi
# Save inputs from config.cgi

eval "use WebminCore;";
if ($@) {
    do '../web-lib.pl';
    do '../ui-lib.pl';
}
&init_config();
&load_theme_library();
require '../config-lib.pl';
&ReadParse();
$m = $in{'module'};
&error_setup($text{'config_err'});
&foreign_available($m) || &error($text{'config_eaccess'});
%access = &get_module_acl(undef, $m);
$access{'noconfig'} && &error($text{'config_ecannot'});

mkdir("$config_directory/$m", 0700);
&lock_file("$config_directory/$m/config");
&read_file("$config_directory/$m/config", \%newconfig);

$mdir = &module_root_directory($m);
if (-r "$mdir/config_info.pl") {

    # Module has a custom config editor
    &foreign_require($m, "config_info.pl");
    local $fn = "${m}::config_form";
    if (defined(&$fn)) {
        $func++;
        &foreign_call($m, "config_save", \%newconfig);
    }
}
if (!$func) {

    # Use config.info to parse config inputs
    &parse_config(\%newconfig, "$mdir/config.info", $m, undef, $in{'section'});
}
&write_file("$config_directory/$m/config", \%newconfig);
&unlock_file("$config_directory/$m/config");
&webmin_log("_config_", undef, undef, \%in, $m);
if ($in{'save_next'}) {
    &redirect("config.cgi?module=$in{'module'}&section=$in{'section_next'}");
} else {
    &redirect("/$m/");
}

