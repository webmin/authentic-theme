#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%text, @remote_user_info, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

get_paths();
my $confdir = "$remote_user_info[7]/.filemin";

if (!-d $confdir) {
    mkdir $confdir or &error("$text{'error_creating_conf'}: $!");
}

if (!-f "$confdir/.bookmarks") {
    utime time, time, "$confdir/.bookmarks";
}

my $bookmarks = read_file_lines($confdir . '/.bookmarks');
if (!length $path) {
    $path = '/';
}
if (grep {$_ eq $path} @$bookmarks) {
    @$bookmarks = grep !/\A\Q$path\E\z/, @$bookmarks;
} else {
    push @$bookmarks, $path;
}

flush_file_lines($confdir . '/.bookmarks');
head();
