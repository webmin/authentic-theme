#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
use lib (dirname(__FILE__) . '/../../lib');

require(dirname(__FILE__) . '/file-manager-lib.pm');

if (is_root()) {

    if ($in{'list_users'} || $in{'home_base'}) {
        foreign_require("useradmin");
        my %uconfig = foreign_config("useradmin");
        my $user_home_base = resolve_links($uconfig{'home_base'} || '/home');

        if ($in{'list_users'}) {
            my %users;
            while (($name, $passwd, $uid, $gid, $quota, $comment, $gcos, $dir, $shell) = getpwent) {
                if ($dir =~ /\Q$user_home_base\E/) {
                    $users{$name} = $uid . ":" . $gid . ":" . $dir;
                }
            }
            print_json(\%users);
        }

        if ($in{'home_base'}) {
            print_json({ 'home_base' => $user_home_base });
        }
    }
} else {
    print_json({});
}
