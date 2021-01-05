#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("@{[miniserv::getenv('theme_root')]}/extensions/file-manager/file-manager-lib.pl");

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

my $label = quotemeta("$in{'label'}");
$label =~ s/\\-/-/g;
$label =~ s/\\+//g;
$label =~ tr/a-zA-Z\-\+ //dc;

my @entries_list = get_entries_list();

foreach my $file (@entries_list) {
	my $file_ = $file;
    $file = simplify_path($file);
    if (system_logged("chattr $recursive " . $label . " " . quotemeta("$cwd/$file")) != 0) {
        $errors{ $file_ } = lc("$text{'attr_label_error_proc'}: $?");
    }
}

redirect_local('list.cgi?path=' . urlize($path) .
         '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal . extra_query());
