#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $current_theme, $config_directory, %theme_text, $has_usermin, $has_usermin_conf_dir);

require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($theme_text{'theme_error_access_not_root'});

theme_config_dir_available();

my $ls = "logo.png";
my $lr = "/$current_theme/$ls";

my $lsw = "logo_welcome.png";
my $lw  = "/$current_theme/$lsw";

if ($in{'authenticated_logo'} eq "1" &&
    length $in{'authenticated_logo_file'})
{
    unlink_file($config_directory . $lr);
    write_file_contents($config_directory . $lr, $in{'authenticated_logo_file'});
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lr);
        write_file_contents($has_usermin_conf_dir . $lr, $in{'authenticated_logo_file'});
    }
} elsif ($in{'authenticated_logo'} ne "1") {
    unlink_file($config_directory . $lr);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lr);
    }
}

if ($in{'unauthenticated_logo'} eq "1" &&
    length $in{'unauthenticated_logo_file'})
{
    unlink_file($config_directory . $lw);
    write_file_contents($config_directory . $lw, $in{'unauthenticated_logo_file'});
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
        write_file_contents($has_usermin_conf_dir . $lw, $in{'unauthenticated_logo_file'});
    }
} elsif ($in{'unauthenticated_logo'} ne "1") {
    unlink_file($config_directory . $lw);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
    }
}

redirect('/settings-logos.cgi?saved=1');
