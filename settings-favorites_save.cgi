#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($Atext{'theme_error_access_not_root'});

theme_config_dir_available();

$in =~ s/\t\n\r//g;
$in =~ /\{(?:\{.*\}|[^{])*\}/sg;

my $file    = $config_directory . "/$current_theme/favorites.json";
my $content = $in{'favorites'};

unlink_file($file);
write_file_contents($file, $content);
head();
