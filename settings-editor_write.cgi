#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, $get_user_level, %theme_text, $has_usermin);

do("@{[miniserv::getenv('theme_root')]}/authentic-lib.pl");

$get_user_level ne '0' && error($theme_text{'theme_error_access_not_root_user'});

theme_make_config_dir();
my $file = html_escape($in{'file'});
unlink_file($file);
write_file_contents($file, $in{'data'});

if ($has_usermin) {
    (my $_file = $file) =~ s/webmin/usermin/;
    unlink_file($_file);
    write_file_contents($_file, $in{'data'});
}
if ($ENV{'HTTP_X_PJAX'} eq "true") {
    redirect($gconfig{'webprefix'} . "/tconfig.cgi");
} else {
    head();
}
