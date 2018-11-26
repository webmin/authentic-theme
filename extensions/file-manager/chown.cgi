#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %text, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

my %errors;
my $error_fatal;

if (!$in{'owner'} || !$in{'group'} || !supports_users()) {
    redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
}

(my $login, my $pass, my $uid, my $gid) = getpwnam($in{'owner'});
my $grid = getgrnam($in{'group'});
my $recursive;
if   ($in{'recursive'} eq 'true') {$recursive = '-R';}
else                              {$recursive = '';}

if (!defined $login) {
    $errors{ $in{'owner'} } = $text{'error_user_not_found'};
    $error_fatal = 1;
}

if (!defined $grid) {
    $errors{ $in{'group'} } = $text{'error_group_not_found'};
    $error_fatal = 1;
}

if (!scalar %errors) {
    foreach my $name (split(/\0/, $in{'name'})) {
        $name = simplify_path($name);
        if (!$name || system_logged("chown $recursive $uid:$grid " . quotemeta("$cwd/$name")) != 0) {
            $errors{ urlize($name) } = lc("$text{'error_chown'}: $?");
        }
    }
}

redirect('list.cgi?path=' .
         urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal);
