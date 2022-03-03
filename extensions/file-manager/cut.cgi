#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

open(my $fh, ">", &get_paste_buffer_file()) or die "Error: $!";
print $fh "cut\n";
print $fh "$path\n";

foreach my $name (split(/\0/, $in{'name'})) {
    print $fh "$name\n";
}

close($fh);

head();
