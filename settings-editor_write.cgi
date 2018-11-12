#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %theme_text, $has_usermin);

require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($theme_text{'theme_error_access_not_root'});

theme_config_dir_available();
my $file = html_escape($in{'file'});
unlink_file($file);
write_file_contents($file, $in{'data'});

if ($has_usermin) {
    (my $_file = $file) =~ s/webmin/usermin/;
    unlink_file($_file);
    write_file_contents($_file, $in{'data'});
}
redirect("/webmin/edit_themes.cgi");
