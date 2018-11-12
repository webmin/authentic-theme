#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $in, $current_theme, $config_directory, %theme_text);

require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($theme_text{'theme_error_access_not_root'});

theme_config_dir_available();

$in =~ s/\t\n\r//g;
$in =~ /\{(?:\{.*\}|[^{])*\}/sg;

my $file    = $config_directory . "/$current_theme/favorites.json";
my $content = $in{'favorites'};

unlink_file($file);
write_file_contents($file, $content);
head();
