#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Jamie Cameron <jamie@virtualmin.com>
# Copyright Ilia Ross <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;
use warnings;

our (%text, %in, $root_directory, $config_directory);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$root_directory/config-lib.pl");

my (%access,
    %newconfig,
    %oldconfig,
    $module,
    $module_dir,
    $custom_config,
    $config_post_save);

$module = $in{'module'};
&error_setup($text{'config_err'});
&foreign_available($module) || &error($text{'config_eaccess'});
%access = &get_module_acl(undef, $module);
$access{'noconfig'} && &error($text{'config_ecannot'});

mkdir("$config_directory/$module", 0700);
&lock_file("$config_directory/$module/config");
&read_file("$config_directory/$module/config", \%newconfig);
%oldconfig  = %newconfig;
$module_dir = &module_root_directory($module);

if (-r "$module_dir/config_info.pl") {

    # Module has a custom config editor
    &foreign_require($module, "config_info.pl");
    my $fn = "${module}::config_form";
    if (defined(&$fn)) {
        $custom_config++;
        &foreign_call($module, "config_save", \%newconfig);
    }
}
if (!$custom_config) {

    # Use config.info to parse config inputs
    &parse_config(\%newconfig, "$module_dir/config.info", $module, undef, $in{'section'});
}
&write_file("$config_directory/$module/config", \%newconfig);
&unlock_file("$config_directory/$module/config");
&save_module_preferences($module, \%newconfig);

# Call any post-config save function
if (&foreign_require($module) &&
    &foreign_func_exists($module, 'config_post_save')) {
    &foreign_call($module, "config_post_save", \%newconfig, \%oldconfig);
}

# Refresh installed modules
if (&foreign_check("webmin")) {
    &foreign_require("webmin", "webmin-lib.pl");
    &webmin::build_installed_modules(0, $module);
}

&webmin_log("_config_", undef, undef, \%in, $module);
if ($in{'save_next'}) {
    &redirect("config.cgi?module=$module&section=$in{'section_next'}");
} else {
    &redirect("/$module/");
}
