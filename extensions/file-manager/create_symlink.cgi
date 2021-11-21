#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my $path_urlized = urlize($path);
my $error;

if (!@entries_list) {
    redirect_local(("list.cgi?path=$path_urlized&module=$in{'module'}" . extra_query()));
}
foreach my $name (@entries_list) {
    my $name_ = $name;
    $name = simplify_path($name);
    my $symlink = "$cwd/${name}_symlink";
    if (-e $symlink) {
        $symlink .= "_" . int(rand() * 10000);
    }
    if (symlink_file("$cwd/$name", $symlink) == 0) {
        $error .= "<br>" if ($error);
        $error .= text('filemanager_symlink_exists', html_escape("${name_}_symlink"), html_escape($cwd));
    }
}
redirect_local('list.cgi?path=' . $path_urlized . '&module=' . $in{'module'} . '&error=' . $error . extra_query());

