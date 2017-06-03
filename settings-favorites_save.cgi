#!/usr/bin/perl

#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

do "authentic-theme/authentic-lib.pm";

!foreign_available("webmin") && error( $Atext{'theme_error_access_not_root'} );

theme_config_dir_available();

$in =~ s/\t\n\r//g;
$in =~ /\{(?:\{.*\}|[^{])*\}/sg;

my $file    = $config_directory . '/authentic-theme/favorites.json';
my $content = $in{'favorites'};

unlink_file($file);
write_file_contents( $file, $content );
head();
