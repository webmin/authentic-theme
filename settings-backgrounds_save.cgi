#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, $current_theme, $config_directory, $get_user_level, %theme_text, $has_usermin, $has_usermin_conf_dir);

do("$ENV{'THEME_ROOT'}/authentic-lib.pl");

&webmin_user_is_admin() ||
  &error($theme_text{'theme_error_access_not_root_user'});

theme_make_config_dir();

my $lsw = "background_content.png";
my $lw  = "/$current_theme/$lsw";

if ($in{'unauthenticated_bg'} eq "1" &&
    length $in{'unauthenticated_bg_file'})
{
    unlink_file($config_directory . $lw);
    write_file_contents($config_directory . $lw, $in{'unauthenticated_bg_file'});
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
        write_file_contents($has_usermin_conf_dir . $lw, $in{'unauthenticated_bg_file'});
    }
} elsif ($in{'unauthenticated_bg'} ne "1") {
    unlink_file($config_directory . $lw);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
    }
}

redirect("settings-backgrounds.cgi?saved=1");
