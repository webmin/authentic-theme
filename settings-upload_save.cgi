#!/usr/bin/perl

#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

do "authentic-theme/authentic-lib.pm";

!foreign_available("webmin") && error( $Atext{'theme_error_access_not_root'} );

theme_config_dir_available();

my $lr  = "/authentic-theme/logo.png";
my $lrd = "/authentic-theme/images/logo.png";

my $lw  = "/authentic-theme/logo_welcome.png";
my $lwd = "/authentic-theme/images/logo_welcome.png";

if ( usermin_available() ) {
    ( our $_usermin_config_directory = $config_directory ) =~ s/webmin/usermin/;
    ( our $_usermin_root_directory   = $root_directory ) =~ s/webmin/usermin/;

}

if ( $in{'authenticated_logo'} eq "1"
     && length $in{'authenticated_logo_file'} )
{
    unlink_file( $config_directory . $lr );
    write_file_contents( $config_directory . $lr, $in{'authenticated_logo_file'} );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory . $lr );
        write_file_contents( $_usermin_config_directory . $lr, $in{'authenticated_logo_file'} );

        unlink_file( $_usermin_root_directory . $lrd );
        write_file_contents( $_usermin_root_directory . $lrd, $in{'authenticated_logo_file'} );
    }
}
elsif ( $in{'authenticated_logo'} ne "1" ) {
    unlink_file( $config_directory . $lr );
    unlink_file( $root_directory . $lrd );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory . $lr );
        unlink_file( $_usermin_root_directory . $lrd );
    }
}

if ( $in{'unauthenticated_logo'} eq "1"
     && length $in{'unauthenticated_logo_file'} )
{
    unlink_file( $config_directory . $lw );
    write_file_contents( $config_directory . $lw, $in{'unauthenticated_logo_file'} );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory . $lw );
        write_file_contents( $_usermin_config_directory . $lw, $in{'unauthenticated_logo_file'} );

        unlink_file( $_usermin_root_directory . $lwd );
        write_file_contents( $_usermin_root_directory . $lwd, $in{'unauthenticated_logo_file'} );
    }
}
elsif ( $in{'unauthenticated_logo'} ne "1" ) {
    unlink_file( $config_directory . $lw );
    unlink_file( $root_directory . $lwd );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory . $lw );
        unlink_file( $_usermin_root_directory . $lwd );
    }
}

copy_source_dest( $config_directory . $lr, $root_directory . "/authentic-theme/images" );

copy_source_dest( $config_directory . $lw, $root_directory . "/authentic-theme/images" );

redirect('/settings-upload.cgi?saved=1');
