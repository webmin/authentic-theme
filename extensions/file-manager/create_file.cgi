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

$path_urlized = urlize($path);

if ( !$in{'name'} ) {
    redirect("list.cgi?path=$path_urlized&module=$in{'module'}");
}

my $type;
if ( -d "$cwd/$in{'name'}" ) {
    $type = 'directory';
}
else {
    $type = 'file';
}

if ( -f "$cwd/$in{'name'}" || -d "$cwd/$in{'name'}" ) {
    print_error(
                 (
                   text( 'filemanager_create_object_exists', $in{'name'},
                         $path,                              $text{ 'theme_xhred_global_' . $type . '' }
                   )
                 ) );
}
else {
    if ( open my $fh, "> $cwd/$in{'name'}" ) {
        close($fh);
        redirect("list.cgi?path=$path_urlized&module=$in{'module'}");
    }
    else {
        print_error(
              (
                text( 'filemanager_create_object_denied', $in{'name'}, $path, $text{'theme_xhred_global_file'}
                )
              ) );
    }
}
