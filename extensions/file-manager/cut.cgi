#!/usr/bin/perl

#
# Authentic Theme 18.32 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Alexandr Bezenkov (https://github.com/Real-Gecko/filemin)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
use lib ( dirname(__FILE__) . '/../../lib' );

require( dirname(__FILE__) . '/file-manager-lib.pm' );

$path_urlized = urlize($path);

open( my $fh, ">", &get_paste_buffer_file() ) or die "Error: $!";
print $fh "cut\n";
print $fh "$path\n";

foreach $name ( split( /\0/, $in{'name'} ) ) {
    print $fh "$name\n";
}

close($fh);

head();
