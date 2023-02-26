#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use lib ($ENV{'LIBROOT'} . "/vendor_perl");

our (%in, %text, $cwd, $path, @allowed_paths);

do($ENV{'THEME_ROOT'} . "/extensions/file-manager/file-manager-lib.pl");

my %errors;

# Files to work on (arr)
my @files = get_entries_list();

# Action
my $action = $in{'action'};

# Permission
my $perms = $in{'perms'};

# User
my $user = $in{'user'};

# Group
my $group = $in{'group'};

# Recursive
my $recursive = $in{'recursive'} ? " -R" : "";

# Manual
my $extra = $in{'manual'};

# Apply to (arr)
my @apply_to = split(/\0/, $in{'apply_to'});

# Delete doesn't allow perms
$perms = "" if ($action eq '-x');

# Build params
my @types;
foreach my $type (@apply_to) {
    if ($user && $type eq 'u') {
        push(@types, "u:${user}:${perms}");
    }
    if ($group && $type eq 'g') {
        push(@types, "g:${group}:${perms}");
    }
    if ($type =~ /^m|o$/) {
        push(@types, "${type}::${perms}");
    }
}
my $cmd = &has_command('setfacl');
if (!$cmd) {
    $errors{ $text{'error'} } = "$text{'acls_error'}";

} else {
    my $types;
    # Params are not accepted in clear mode
    if ($action ne '-b' && $action ne '-k') {
        $types = join(',', @types) if (@types);
        $types .= " $extra"        if ($extra);
    }
    my $args = "$action $types $recursive";
    $args =~ s/\s+/ /g;
    $args = &trim($args);
    $args =~ s/[\`\$\;\/\'\"\?\%\&\#\*\(\)\+]//g;

    foreach my $file (@files) {
        my $qfile = quotemeta("$path/$file");
        next if (!-r "$path/$file");
        my $fullcmd = "$cmd $args $qfile";
        my $out     = &backquote_logged("$fullcmd 2>&1 >/dev/null </dev/null");
        if ($?) {
            $out =~ s/\s+Usage:\ssetfacl.*//g;
            $out =~ s/\s+Try\s`.*//g;
            $out =~ s/.*setfacl.*?:\s+//g;
            $errors{$file} = "\[tt\]$cmd $args $path/$file\[/tt\] : $out";
        }
    }
}

redirect_local('list.cgi?path=' . urlize($path) . '&module=filemin' . '&error=' . get_errors(\%errors) . extra_query());
