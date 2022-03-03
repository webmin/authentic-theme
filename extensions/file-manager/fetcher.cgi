#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

if (is_root() && supports_users()) {
    if ($in{'list_users'} || $in{'home_base'}) {
        foreign_require("useradmin");
        my %uconfig        = foreign_config("useradmin");
        my $user_home_base = resolve_links($uconfig{'home_base'} || '/home');

        if ($in{'list_users'}) {
            my %users;
            while (my ($name, $passwd, $uid, $gid, $quota, $comment, $gcos, $dir, $shell) = getpwent) {
                if ($dir =~ /\Q$user_home_base\E/) {
                    if ($in{'list_user'}) {
                        $users{$name} = { uid => $uid, guid => $gid, home => $dir } if ($in{'list_user'} eq $name);
                    } else {
                        $users{$name} = $uid . ":" . $gid . ":" . $dir;
                    }
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
