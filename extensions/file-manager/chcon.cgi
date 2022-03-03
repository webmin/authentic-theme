#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my $recursive;
my %errors;
my $error_fatal;

if ($in{'recursive'} eq 'true') {
    $recursive = '-R';
} else {
    $recursive = '';
}

if (!$in{'label'}) {
    redirect_local('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
}

my @entries_list = get_entries_list();

foreach my $file (@entries_list) {
	my $file_ = $file;
    $file = simplify_path($file);
    if (system_logged("chcon $recursive " . quotemeta("$in{'label'}") . " " . quotemeta("$cwd/$file")) != 0) {
        $errors{ $file_ } = lc("$text{'context_label_error_proc'}: $?");
    }
}

redirect_local('list.cgi?path=' . urlize($path) .
             '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal . extra_query());
