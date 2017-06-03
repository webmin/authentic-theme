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

if ( !$in{'name'} ) {
    redirect( 'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} );
}

my $type;
if ( -d "$cwd/$in{'name'}" ) {
    $type = 'directory';
}
else {
    $type = 'file';
}

if ( -e "$cwd/$in{'name'}" ) {
    print_error(
          (
            text( 'filemanager_rename_exists', $in{'name'}, $path, $text{ 'theme_xhred_global_' . $type . '' }
            )
          ) );
}
else {
    if ( &rename_file( $cwd . '/' . $in{'file'}, $cwd . '/' . $in{'name'} ) ) {
        redirect( 'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} );
    }
    else {
        print_error(
                     (
                       text( 'filemanager_rename_denied', $in{'name'},
                             $path,                       lc( $text{ 'theme_xhred_global_' . $type . '' } )
                       )
                     ) );
    }
}
