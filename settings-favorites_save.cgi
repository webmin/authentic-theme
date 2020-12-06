#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, $in, $current_theme, $config_directory, $remote_user, %theme_text);

do("$ENV{'THEME_ROOT'}/authentic-lib.pl");

theme_config_dir_available();

$in =~ s/\t\n\r//g;
$in =~ /\{(?:\{.*\}|[^{])*\}/sg;

my $file = $config_directory . "/$current_theme/favorites-$remote_user.json";
my $content = $in{'favorites'};

unlink_file($file);
write_file_contents($file, $content);
head();
