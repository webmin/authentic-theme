#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Jamie Cameron <jamie@virtualmin.com>
# Copyright Ilia Ross <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;
use warnings;

our (%text, %in, $root_directory, $config_directory, $user_config_directory);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$root_directory/config-lib.pl");

my (%newconfig, %oldconfig, %canconfig, $module, $module_dir, $custom_config, $config_post_save);

$module = $in{'module'};
&error_setup($text{'config_err'});
&foreign_available($module) || &error($text{'config_eaccess'});
&switch_to_remote_user();
&create_user_config_dirs();

mkdir("$user_config_directory/$module", 0700);
&lock_file("$user_config_directory/$module/config");
&read_file("$user_config_directory/$module/config", \%newconfig);
&read_file("$config_directory/$module/canconfig",   \%canconfig);
%oldconfig  = %newconfig;
$module_dir = &module_root_directory($module);

if (-r "$module_dir/uconfig_info.pl") {

    # Module has a custom config editor
    &foreign_require($module, "uconfig_info.pl");
    my $fn = "${module}::config_form";
    if (defined(&$fn)) {
        $custom_config++;
        &foreign_call($module, "config_save", \%newconfig, \%canconfig);
    }
}
if (!$custom_config) {

    # Use config.info to parse config inputs
    &parse_config(\%newconfig, "$module_dir/uconfig.info", $module, (%canconfig ? \%canconfig : undef), $in{'section'});
}
&write_file("$user_config_directory/$module/config", \%newconfig);
&unlock_file("$user_config_directory/$module/config");

# Call any post-config save function
$config_post_save = "${module}::config_post_save";
if (defined(&$config_post_save)) {
    &foreign_call($module, "config_post_save", \%newconfig, \%oldconfig, \%canconfig);
}

if ($in{'save_next'}) {
    &redirect("uconfig.cgi?module=$module&section=$in{'section_next'}");
} else {
    &redirect("/$module/");
}

