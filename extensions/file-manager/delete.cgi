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

my %errors;

foreach my $name (split(/\0/, $in{'name'})) {
    $name = simplify_path($name);
    if (!&unlink_file($cwd . '/' . $name)) {
        $errors{ urlize(html_escape($name)) } = "$text{'error_delete'}";
    }
}

redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors));
