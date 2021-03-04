#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my %errors;
my $error_fatal;

if (!$in{'owner'} || !$in{'group'} || !supports_users()) {
    redirect_local('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
}

(my $login, my $pass, my $uid, my $gid) = getpwnam($in{'owner'});
my $grid = getgrnam($in{'group'});
my $recursive;
if ($in{'recursive'} eq 'true') {
    $recursive = '-R';
} else {
    $recursive = '';
}

if (!defined $login) {
    $errors{ $in{'owner'} } = $text{'error_user_not_found'};
    $error_fatal = 1;
}

if (!defined $grid) {
    $errors{ $in{'group'} } = $text{'error_group_not_found'};
    $error_fatal = 1;
}

my @entries_list = get_entries_list();

if (!scalar %errors) {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        $name = simplify_path($name);
        if (!$name || system_logged("chown $recursive $uid:$grid " . quotemeta("$cwd/$name")) != 0) {
            $errors{ $name_ } =  lc("$text{'error_chown'}: $?");
        }
    }
}

redirect_local('list.cgi?path=' . urlize($path) .
             '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal . extra_query());
