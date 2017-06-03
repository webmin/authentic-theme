#!/usr/bin/perl

#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Alexandr Bezenkov (https://github.com/Real-Gecko/filemin)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

use File::Basename;
use lib ( dirname(__FILE__) . '/../../lib' );

require( dirname(__FILE__) . '/file-manager-lib.pm' );

unless ( opendir( DIR, $cwd ) ) {
    fatal_errors("$text{'theme_global_error'}: <tt>`$cwd`</tt>- $!.");
    exit;
}

# Push file names with full paths to array, filtering out "." and ".."
@list = map { &simplify_path("$cwd/$_") } grep { $_ ne '.' && $_ ne '..' } readdir(DIR);
closedir(DIR);

print_content();
