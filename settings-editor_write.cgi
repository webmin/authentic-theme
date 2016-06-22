#!/usr/bin/perl

#
# Authentic Theme 18.03 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

do "authentic-theme/authentic-lib.pm";

__config_dir_available();

unlink_file( $in{'file'} );
write_file_contents( $in{'file'}, $in{'data'} );

if ( usermin_available() ) {
    ( my $_file = $in{'file'} ) =~ s/webmin/usermin/;
    unlink_file($_file);
    write_file_contents( $_file, $in{'data'} );
}
redirect("/webmin/edit_themes.cgi");
