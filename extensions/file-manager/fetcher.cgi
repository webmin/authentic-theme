#!/usr/bin/perl

#
# Authentic Theme 18.48 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Alexandr Bezenkov (https://github.com/Real-Gecko/filemin)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
use lib ( dirname(__FILE__) . '/../../lib' );

require( dirname(__FILE__) . '/file-manager-lib.pm' );

if ( is_root() ) {

    if ( $in{'list_users'} ) {
        foreign_require("useradmin");
        my %uconfig = foreign_config("useradmin");
        my $user_home_base = resolve_links( $uconfig{'home_base'} || '/home' );

        my %users;
        while ( ( $name, $passwd, $uid, $gid, $quota, $comment, $gcos, $dir, $shell ) = getpwent ) {
            if ( index( $dir, $user_home_base ) > -1 ) {
                $users{$name} = $uid . ":" . $gid . ":" . $dir;
            }
        }
        print_json( \%users );
    }

}
