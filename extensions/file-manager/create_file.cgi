#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %text, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

my $path_urlized = urlize($path);

if (!$in{'name'}) {
    redirect("list.cgi?path=$path_urlized&module=$in{'module'}");
}

my $type;
if (-d "$cwd/$in{'name'}") {
    $type = 'directory';
} else {
    $type = 'file';
}

if (-f "$cwd/$in{'name'}" || -d "$cwd/$in{'name'}") {
    print_error(
                (
                 text('filemanager_create_object_exists', html_escape($in{'name'}),
                      html_escape($path),                 $text{ 'theme_xhred_global_' . $type . '' }
                 )
                ));
} else {
    if (open my $fh, "> $cwd/$in{'name'}") {
        close($fh);
        redirect("list.cgi?path=$path_urlized&module=$in{'module'}");
    } else {
        print_error(
                    (
                     text('filemanager_create_object_denied', html_escape($in{'name'}),
                          html_escape($path),                 $text{'theme_xhred_global_file'}
                     )
                    ));
    }
}
