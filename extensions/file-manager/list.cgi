#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%text, $cwd);

require(dirname(__FILE__) . '/file-manager-lib.pm');

unless (opendir(DIR, $cwd)) {
    fatal_errors("$text{'theme_global_error'}: <tt>`$cwd`</tt>- $!.");
    exit;
}

# Push file names with full paths to array, filtering out "." and ".."
our @list = map {&simplify_path("$cwd/$_")} grep {$_ ne '.' && $_ ne '..'} readdir(DIR);
closedir(DIR);

print_content();
