#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use File::Find;

our (%in, %text, @allowed_paths, $cwd, $base, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

no warnings 'once';
unless (opendir(DIR, $cwd)) {
    fatal_errors("$text{'theme_global_error'}: <tt>`$cwd`</tt>- $!.");
    exit;
}

my $tpath = ($in{'cpt'} ? $in{'cpt'} : $allowed_paths[0]);
print_json(get_tree($tpath, $in{'d'}, $in{'e'}));
