#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Jamie Cameron <jamie@virtualmin.com>
# Copyright Ilia Ross <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;
use warnings;

our (%text, %in, $root_directory, $config_directory, $remote_user, $current_theme, %theme_text);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$root_directory/config-lib.pl");

my (%newconfig, $module, $module_custom_config_file, $config_file);

$module                    = $in{'module'};
$module_custom_config_file = "$root_directory/$current_theme/modules/$module/config.info";
$config_file               = "$config_directory/$module/config";

&error_setup($text{'config_err'});
&foreign_available($module) || &error($theme_text{'config_eaccess'});

mkdir("$config_directory/$module", 0700);
if (-r $module_custom_config_file) {
    my $module_custom_config_default = "$root_directory/$current_theme/modules/$module/config.defaults";
    if (-r $module_custom_config_default) {
        &read_file($module_custom_config_default, \%newconfig);
    }
    &load_module_preferences($module, \%newconfig);
    &parse_config(\%newconfig, $module_custom_config_file, $module, undef, $in{'section'});
    &save_module_preferences($module, \%newconfig);

    # Redirect
    if ($in{'save_next'}) {

        # Used to return to the current section if needed W00900XXX
        my $section_next = $in{'section_curr'} || $in{'section_next'};
        &redirect("mconfig.cgi?module=$module&section=$section_next");
    } else {
        &redirect("/$module/");
    }

} else {
    &error($theme_text{'config_ecannot'});
}
