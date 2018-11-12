#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $cwd);

require(dirname(__FILE__) . '/file-manager-lib.pm');

my $mask = trim($in{'query'});
my $criteria;
my $insensitive;
if ($in{'caseins'}) {
    $criteria    = '-iname';
    $insensitive = 'i';
} else {
    $criteria = '-name';
}
our @list = split('\n', &backquote_logged("find " . quotemeta($cwd) . " $criteria " . quotemeta("*$mask*")));

my $query = quotemeta(trim($in{'grepstring'}));
if (length $query) {
    my @matched;

    foreach my $file (@list) {
        if ($insensitive) {
            if (read_file_contents($file) =~ /$query/i) {
                push @matched, $file;
            }
        } else {
            if (read_file_contents($file) =~ /$query/) {
                push @matched, $file;
            }
        }
    }
    undef(@list);
    @list = @matched;
}

my $replace = trim($in{'grepreplace'});
if (length $query && length $replace) {
    foreach my $file (@list) {
        if ($insensitive) {
            (my $fc = read_file_contents($file)) =~ s/$query/$replace/gi;
            write_file_contents($file, $fc);
        } else {
            (my $fc = read_file_contents($file)) =~ s/$query/$replace/g;
            write_file_contents($file, $fc);
        }
    }
}

print_content();
