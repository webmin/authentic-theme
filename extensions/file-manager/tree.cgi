#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use File::Find;

our (%in, %text, @allowed_paths, $cwd, $base, $path);

do(dirname(__FILE__) . '/file-manager-lib.pl');

kill_previous($0, $$);

no warnings 'once';
unless (opendir(DIR, $cwd)) {
    fatal_errors("$text{'theme_xhred_global_error'}: [tt]`$cwd`[/tt]- $!.");
    exit;
}

my $tpath = ($in{'cpt'} ? $in{'cpt'} : $allowed_paths[0]);
print_json(get_tree($tpath, $in{'d'}, $in{'e'}));
