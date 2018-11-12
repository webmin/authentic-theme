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

require(dirname(__FILE__) . '/file-manager-lib.pm');

my $recursive;
my %errors;
my $error_fatal;

if   ($in{'recursive'} eq 'true') {$recursive = '-R';}
else                              {$recursive = '';}

if (!$in{'label'}) {
    redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
}

my $label = quotemeta("$in{'label'}");
$label =~ s/\\-/-/g;
$label =~ s/\\+//g;
$label =~ tr/a-zA-Z\-\+ //dc;

foreach my $file (split(/\0/, $in{'name'})) {
    $file = simplify_path($file);
    if (system_logged("chattr $recursive " . $label . " " . quotemeta("$cwd/$file")) != 0) {
        $errors{ html_escape($file) } = lc("$text{'attr_label_error_proc'}: $?");
    }
}

redirect('list.cgi?path=' .
         urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal);
