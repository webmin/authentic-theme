#!/usr/bin/perl

#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Alexandr Bezenkov (https://github.com/Real-Gecko/filemin)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

use File::Basename;
use lib ( dirname(__FILE__) . '/../../lib' );

require( dirname(__FILE__) . '/file-manager-lib.pm' );

my $mask = trim( $in{'query'} );
my $criteria;
my $insensitive;
if ( $in{'caseins'} ) {
    $criteria    = '-iname';
    $insensitive = 'i';
}
else {
    $criteria = '-name';
}
@list = split( '\n', &backquote_logged( "find " . quotemeta($cwd) . " $criteria " . quotemeta("*$mask*") ) );

my $query = quotemeta( trim( $in{'grepstring'} ) );
if ( length $query ) {
    my @matched;

    foreach my $file (@list) {
        if ($insensitive) {
            if ( read_file_contents($file) =~ /$query/i ) {
                push @matched, $file;
            }
        }
        else {
            if ( read_file_contents($file) =~ /$query/ ) {
                push @matched, $file;
            }
        }
    }
    undef(@list);
    @list = @matched;
}

my $replace = trim( $in{'grepreplace'} );
if ( length $query && length $replace ) {
    foreach my $file (@list) {
        if ($insensitive) {
            ( my $fc = read_file_contents($file) ) =~ s/$query/$replace/gi;
            write_file_contents( $file, $fc );
        }
        else {
            ( my $fc = read_file_contents($file) ) =~ s/$query/$replace/g;
            write_file_contents( $file, $fc );
        }
    }
}

print_content();
