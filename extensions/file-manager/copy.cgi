#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

open(my $fh, ">", &get_paste_buffer_file()) or die "Error: $!";
print $fh "copy\n";
print $fh "$path\n";

foreach my $name (split(/\0/, $in{'name'})) {
    print $fh "$name\n";
}

close($fh);

head();
