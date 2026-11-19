#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

require($ENV{'THEME_ROOT'} . "/extensions/file-manager/file-manager-lib.pl");

my %errors;
my $error_fatal;

if (!$in{'owner'} || !$in{'group'} || !supports_users()) {
    redirect_local('list.cgi?path=' . urlize($path) . '&module=filemin');
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
my $restricted = filemin_restricted_root() && !is_readonly_mode();

if (!scalar %errors) {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);

        # Non-recursive chown follows a selected link. Clear privileged
        # modes on the same object before handing it to another owner.
        if ($restricted) {
            if (!$recursive && -l $file) {
                $file = abs_path($file);
                if (!fm_path_is_allowed($file)) {
                    $errors{$name_} = fm_not_allowed_error($name);
                    next;
                }
            }
            filemin_drop_setid($file, $recursive ? -1 : 0);
        }
        if (!$file || system_logged("chown $recursive $uid:$grid " . quotemeta($file)) != 0) {
            $errors{ $name_ } =  lc("$text{'error_chown'}: $?");
        }
    }
}

redirect_local('list.cgi?path=' . urlize($path) .
             '&module=filemin' . '&error=' . get_errors(\%errors) . '&error_fatal=' . $error_fatal . extra_query());
