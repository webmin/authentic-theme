#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in);

require(dirname(__FILE__) . '/file-manager-lib.pm');

if (is_root() && supports_users()) {

    if ($in{'list_users'} || $in{'home_base'}) {
        foreign_require("useradmin");
        my %uconfig = foreign_config("useradmin");
        my $user_home_base = resolve_links($uconfig{'home_base'} || '/home');

        if ($in{'list_users'}) {
            my %users;
            while (my ($name, $passwd, $uid, $gid, $quota, $comment, $gcos, $dir, $shell) = getpwent) {
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
