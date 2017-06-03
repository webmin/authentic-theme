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

if ( is_root() ) {

    if ( $in{'list_users'} || $in{'home_base'} ) {
        foreign_require("useradmin");
        my %uconfig = foreign_config("useradmin");
        my $user_home_base = resolve_links( $uconfig{'home_base'} || '/home' );

        if ( $in{'list_users'} ) {
            my %users;
            while ( ( $name, $passwd, $uid, $gid, $quota, $comment, $gcos, $dir, $shell ) = getpwent ) {
                if ( index( $dir, $user_home_base ) > -1 ) {
                    $users{$name} = $uid . ":" . $gid . ":" . $dir;
                }
            }
            print_json( \%users );
        }

        if ( $in{'home_base'} ) {
            print_json( {'home_base' => $user_home_base} );
        }
    }
} else {
  print_json({});
}
