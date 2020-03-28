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

do(dirname(__FILE__) . '/file-manager-lib.pl');

my %errors;
my @deleted_entries;

my @entries_list = get_entries_list();
my $fsid         = $in{'fsid'};

foreach my $name (@entries_list) {
	my $name_ = $name;
    $name = simplify_path($name);
    if (!&unlink_file($cwd . '/' . $name)) {
        $errors{ $name_ } = lc($text{'error_delete'});
    } else {
        push(@deleted_entries, $name);
    }
}

if ($fsid) {
    cache_search_delete($fsid, \@deleted_entries);
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
