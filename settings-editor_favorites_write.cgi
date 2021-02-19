#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, %theme_text, $config_directory, $current_theme, $remote_user, $has_usermin);

do("@{[miniserv::getenv('theme_root')]}/authentic-lib.pl");

theme_make_config_dir();

my $file = $config_directory . "/$current_theme/favorites-$remote_user.json";
unlink_file($file);
write_file_contents($file, $in{'data'});
if ($ENV{'HTTP_X_PJAX'} eq "true") {
    redirect($gconfig{'webprefix'} . "/sysinfo.cgi");
} else {
    head();
}
