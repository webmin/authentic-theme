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

my $recursive;
my %errors;
my $error_fatal;

if   ( $in{'recursive'} eq 'true' ) { $recursive = '-R'; }
else                                { $recursive = ''; }

if ( !$in{'label'} ) {
    redirect( 'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} );
}

foreach my $file ( split( /\0/, $in{'name'} ) ) {
    $file = simplify_path($file);
    if (
        system_logged( "chcon $recursive " . quotemeta("$in{'label'}") . " " . quotemeta("$cwd/$file") ) != 0 )
    {
        $errors{ html_escape($file) } = lc("$text{'context_label_error_proc'}: $?");
    }
}

redirect(   'list.cgi?path='
          . urlize($path)
          . '&module='
          . $in{'module'}
          . '&error='
          . get_errors( \%errors )
          . '&error_fatal='
          . $error_fatal );
