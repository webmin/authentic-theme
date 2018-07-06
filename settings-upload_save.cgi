#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($Atext{'theme_error_access_not_root'});

theme_config_dir_available();

my $ls = "logo.png";
my $lr = "/$current_theme/$ls";

my $lsw = "logo_welcome.png";
my $lw  = "/$current_theme/$lsw";

my $usermin_config_directory;
if (usermin_available()) {
    ($usermin_config_directory = $config_directory) =~ s/webmin/usermin/;
}

if ($in{'authenticated_logo'} eq "1" &&
    length $in{'authenticated_logo_file'})
{
    unlink_file($config_directory . $lr);
    write_file_contents($config_directory . $lr, $in{'authenticated_logo_file'});
    if (usermin_available()) {
        unlink_file($usermin_config_directory . $lr);
        write_file_contents($usermin_config_directory . $lr, $in{'authenticated_logo_file'});
    }
} elsif ($in{'authenticated_logo'} ne "1") {
    unlink_file($config_directory . $lr);
    if (usermin_available()) {
        unlink_file($usermin_config_directory . $lr);
    }
}

if ($in{'unauthenticated_logo'} eq "1" &&
    length $in{'unauthenticated_logo_file'})
{
    unlink_file($config_directory . $lw);
    write_file_contents($config_directory . $lw, $in{'unauthenticated_logo_file'});
    if (usermin_available()) {
        unlink_file($usermin_config_directory . $lw);
        write_file_contents($usermin_config_directory . $lw, $in{'unauthenticated_logo_file'});
    }
} elsif ($in{'unauthenticated_logo'} ne "1") {
    unlink_file($config_directory . $lw);
    if (usermin_available()) {
        unlink_file($usermin_config_directory . $lw);
    }
}

redirect('/settings-upload.cgi?saved=1');
