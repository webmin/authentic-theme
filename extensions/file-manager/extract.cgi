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

foreach my $name ( split( /\0/, $in{'name'} ) ) {
    $archive_type = mimetype( $cwd . '/' . $name );
    if ( index( $archive_type, "x-bzip" ) != -1 ) {
        &backquote_logged( "tar xvjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd) );
    }
    elsif (    index( $archive_type, "x-tar" ) != -1
            || index( $archive_type, "/gzip" ) != -1
            || index( $archive_type, "x-xz" ) != -1
            || index( $archive_type, "x-compressed-tar" ) != -1 )
    {
        &backquote_logged( "tar xfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "x-7z" ) != -1 ) {
        &backquote_logged( "7z x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "/zip" ) != -1 ) {
        &backquote_logged( "unzip -o " . quotemeta("$cwd/$name") . " -d " . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "/x-rar" ) != -1 ) {
        &backquote_logged( "unrar x -r -y -o+ " . quotemeta("$cwd/$name") . " " . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "/x-rpm" ) != -1 || index( $archive_type, "/x-deb" ) != -1 ) {
        my $dir = fileparse( "$cwd/$name", qr/\.[^.]*/ );
        my $path = quotemeta("$cwd/$dir");
        &backquote_logged("mkdir $path");
        if ( index( $archive_type, "/x-rpm" ) != -1 ) {
            &backquote_logged( "(rpm2cpio " . quotemeta("$cwd/$name") . " | (cd " . $path . "; cpio -idmv))" );
        }
        else {
            &backquote_logged( "dpkg -x " . quotemeta("$cwd/$name") . " " . $path );
        }
    }
}

redirect( 'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} );
