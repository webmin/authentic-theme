#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use Fcntl qw(O_RDONLY O_NONBLOCK);

our (%in, %text, $cwd, $path);

require($ENV{'THEME_ROOT'} . "/extensions/file-manager/file-manager-lib.pl");

my %errors;

my $perms = $in{'perms'};

my @entries_list = get_entries_list();

# Apply only ordinary permission bits to files. Directory group inheritance
# is set separately so regular files never receive privileged bits.
my $restricted = filemin_restricted_root();
my $dir_setgid;
if ($restricted) {
    print_error($text{'filemanager_chmod_octal'}) if ($perms !~ /\A[0-7]{1,4}\z/);
    $dir_setgid = oct($perms) & 02000;
    # An explicit fifth digit lets chmod clear group inheritance on directories.
    $perms = sprintf("%05o", oct($perms) & 01777);
}

# Selected directories and files only
if ($in{'applyto'} eq '1') {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);
        if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta($file)) != 0) {
            $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
        }
    }
}

# Selected files and directories and files in selected directories
if ($in{'applyto'} eq '2') {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);
        if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta($file)) != 0) {
            $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
        }
        if (-d $file) {
            if (
                system_logged(
                      "find " . quotemeta($file) . " -maxdepth 1 -type f -exec chmod " . quotemeta($perms) . " {} \\;"
                ) != 0)
            {
                $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

# All (recursive)
if ($in{'applyto'} eq '3') {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);
        if (system_logged("chmod -R " . quotemeta($perms) . " " . quotemeta($file)) != 0) {
            $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
        }
    }
}

# Selected files and files under selected directories and subdirectories
if ($in{'applyto'} eq '4') {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);
        if (-f $file) {
            if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta($file)) != 0) {
                $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
            }
        } else {
            if (system_logged("find " . quotemeta($file) . " -type f -exec chmod " . quotemeta($perms) . " {} \\;")
                != 0)
            {
                $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

# Selected directories and subdirectories
if ($in{'applyto'} eq '5') {
    foreach my $name (@entries_list) {
        my $name_ = $name;
        my $file = fm_checked_cwd_path_or_error($name);
        if (-d $file) {
            if (system_logged("chmod " . quotemeta($perms) . " " . quotemeta($file)) != 0) {
                $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
            }
            if (system_logged("find " . quotemeta($file) . " -type d -exec chmod " . quotemeta($perms) . " {} \\;")
                != 0)
            {
                $errors{ $name_ } = lc("$text{'error_chmod'}: $?");
            }
        }
    }
}

# Set group inheritance through an open directory handle. A replaced path
# must never receive directory-only permissions.
if ($dir_setgid && $in{'applyto'} =~ /\A[1235]\z/ && !is_readonly_mode()) {
    foreach my $name (@entries_list) {
        my $file = fm_checked_cwd_path_or_error($name);
        next if ($errors{$name} || !-d $file);
        my $setgid = sub {
            my ($dir, $st) = @_;
            return if (($st->[2] & 0170000) != 0040000);
            my $dh;
            if (!sysopen($dh, $dir, O_RDONLY | O_NONBLOCK) || !filemin_same_file($st, [ stat($dh) ]) ||
                !chmod(oct($perms) | 02000, $dh)) {
                $errors{$name} = $text{'error_chmod'};
            }
        };
        $setgid->($file, [ stat($file) ]);
        filemin_walk_tree($file, -1, $setgid) if ($in{'applyto'} eq '3' || $in{'applyto'} eq '5');
    }
}

redirect_local('list.cgi?path=' . urlize($path) . '&module=filemin' . '&error=' . get_errors(\%errors) . extra_query());
