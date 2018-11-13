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

my $perms = $in{'perms'};

# Selected directories and files only
if ($in{'applyto'} eq '1') {
    foreach my $name (split(/\0/, $in{'name'})) {
        $name = simplify_path($name);
        if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta("$cwd/$name")) != 0) {
            $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
        }
    }
}

# Selected files and directories and files in selected directories
if ($in{'applyto'} eq '2') {
    foreach my $name (split(/\0/, $in{'name'})) {
        $name = simplify_path($name);
        if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta("$cwd/$name")) != 0) {
            $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
        }
        if (-d "$cwd/$name") {
            if (
                system_logged(
                      "find " . quotemeta("$cwd/$name") . " -maxdepth 1 -type f -exec chmod " . quotemeta($perms) . " {} \\;"
                ) != 0)
            {
                $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

# All (recursive)
if ($in{'applyto'} eq '3') {
    foreach my $name (split(/\0/, $in{'name'})) {
        $name = simplify_path($name);
        if (system_logged("chmod -R " . quotemeta($perms) . " " . quotemeta("$cwd/$name")) != 0) {
            $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
        }
    }
}

# Selected files and files under selected directories and subdirectories
if ($in{'applyto'} eq '4') {
    foreach my $name (split(/\0/, $in{'name'})) {
        $name = simplify_path($name);
        if (-f "$cwd/$name") {
            if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta("$cwd/$name")) != 0) {
                $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
            }
        } else {
            if (system_logged("find " . quotemeta("$cwd/$name") . " -type f -exec chmod " . quotemeta($perms) . " {} \\;")
                != 0)
            {
                $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

# Selected directories and subdirectories
if ($in{'applyto'} eq '5') {
    foreach my $name (split(/\0/, $in{'name'})) {
        if (-d "$cwd/$name") {
            if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta("$cwd/$name")) != 0) {
                $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
            }
            if (system_logged("find " . quotemeta("$cwd/$name") . " -type d -exec chmod " . quotemeta($perms) . " {} \\;")
                != 0)
            {
                $errors{ urlize(html_escape($name)) } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors));
