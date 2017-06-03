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

get_paths();
$confdir = "$remote_user_info[7]/.filemin";

if ( !-d $confdir ) {
    mkdir $confdir or &error("$text{'error_creating_conf'}: $!");
}

if ( !-f "$confdir/.bookmarks" ) {
    utime time, time, "$configdir/.bookmarks";
}

$bookmarks = read_file_lines( $confdir . '/.bookmarks' );
if ( !length $path ) {
    $path = '/';
}
if ( grep { $_ eq $path } @$bookmarks ) {
    @$bookmarks = grep !/\A\Q$path\E\z/, @$bookmarks;
}
else {
    push @$bookmarks, $path;
}

flush_file_lines( $confdir . '/.bookmarks' );
head();
