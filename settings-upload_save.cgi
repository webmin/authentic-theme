#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&init_config();
&ReadParseMime();
&switch_to_remote_user();

do "authentic-theme/authentic-lib.cgi";
__config_dir_available();

if ( usermin_available() ) {
    ( our $_usermin_config_directory = $config_directory )
        =~ s/webmin/usermin/;
}

if ( $in{'authenticated_logo'} eq "true"
    && length $in{'authenticated_logo_file'} )
{
    unlink_file( $config_directory . "/authentic-theme/logo.png" );
    write_file_contents( $config_directory . '/authentic-theme/logo.png',
        $in{'authenticated_logo_file'} );
    if ( usermin_available() ) {
        unlink_file(
            $_usermin_config_directory . "/authentic-theme/logo.png" );
        write_file_contents(
            $_usermin_config_directory . '/authentic-theme/logo.png',
            $in{'authenticated_logo_file'} );
    }
    if (  -s $config_directory
        . "/authentic-theme/logo.png" ne -s $root_directory
        . "/authentic-theme/images/logo.png" )
    {
        copy_source_dest(
            $config_directory . "/authentic-theme/logo.png",
            $root_directory . "/authentic-theme/images"
        );
    }
}
elsif ( $in{'authenticated_logo'} ne "true" ) {
    unlink_file( $config_directory . '/authentic-theme/logo.png' );
    unlink_file( $root_directory . '/authentic-theme/images/logo.png' );
    if ( usermin_available() ) {
        unlink_file(
            $_usermin_config_directory . "/authentic-theme/logo.png" );
    }
}

if ( $in{'unauthenticated_logo'} eq "true"
    && length $in{'unauthenticated_logo_file'} )
{
    unlink_file( $config_directory . "/authentic-theme/logo_welcome.png" );
    write_file_contents(
        $config_directory . '/authentic-theme/logo_welcome.png',
        $in{'unauthenticated_logo_file'} );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory
                . "/authentic-theme/logo_welcome.png" );
        write_file_contents(
            $_usermin_config_directory . '/authentic-theme/logo_welcome.png',
            $in{'unauthenticated_logo_file'}
        );
    }
    if (  -s $config_directory
        . "/authentic-theme/logo_welcome.png" ne -s $root_directory
        . "/authentic-theme/images/logo_welcome.png" )
    {
        copy_source_dest(
            $config_directory . "/authentic-theme/logo_welcome.png",
            $root_directory . "/authentic-theme/images"
        );
    }
}
elsif ( $in{'unauthenticated_logo'} ne "true" ) {
    unlink_file( $config_directory . '/authentic-theme/logo_welcome.png' );
    unlink_file(
        $root_directory . '/authentic-theme/images/logo_welcome.png' );
    if ( usermin_available() ) {
        unlink_file( $_usermin_config_directory
                . "/authentic-theme/logo_welcome.png" );
    }
}

copy_source_dest( $config_directory . "/authentic-theme/" . $logo . ".png",
    $root_directory . "/authentic-theme/images" );

&redirect('settings-upload.cgi?saved=1');
