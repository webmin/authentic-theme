#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my $path_urlized = urlize($path);

if (!$in{'name'}) {
    redirect_local(("list.cgi?path=$path_urlized&module=$in{'module'}" . extra_query()));
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
        redirect_local(("list.cgi?path=$path_urlized&module=$in{'module'}" . extra_query()));
    } else {
        print_error(
                    (
                     text('filemanager_create_object_denied', html_escape($in{'name'}),
                          html_escape($path),                 $text{'theme_xhred_global_file'}
                     )
                    ));
    }
}
