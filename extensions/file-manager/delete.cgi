#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Copy;
use File::Path;

our (%in, %text, $cwd, $path);

do("@{[miniserv::getenv('theme_root')]}/extensions/file-manager/file-manager-lib.pl");

my %errors;
my @deleted_entries;

my @entries_list = get_entries_list();
my $fsid         = $in{'fsid'};
my $to_trash     = $in{'trash'};
my $time         = strftime('%Y-%m-%d_%H:%M:%S', localtime());

foreach my $name (@entries_list) {
    my $name_ = $name;
    $name = simplify_path($name);
    my $mkpath_ = sub {
        my ($dir) = @_;
        my $rs = mkpath($dir, { owner => int($in{'uid'}), group => int($in{'guid'}) });
        return $rs;
    };
    if ($to_trash) {
        my $tdir    = "$in{'home'}/.Trash/$cwd";
        my %mkpopts = { owner => int($in{'uid'}), group => int($in{'guid'}) };
        my $mkpathr = &$mkpath_($tdir);
        my $tfile;
        if (!$mkpathr && -f "$tdir/$name" && -r "$tdir/$name") {
            $tfile = "$tdir/$name-$time";
        } elsif (!$mkpathr && glob("$tdir/$name/*")) {
            $tfile = "$tdir/$name-$time";
            &$mkpath_($tdir);
        }
        if (!move("$cwd/$name", $tfile || "$tdir/$name")) {
            $errors{$name_} = lc($text{'error_delete'} . lc(" - $!"));
        } else {
            push(@deleted_entries, $name);
        }
    } else {
        if (!&unlink_file($cwd . '/' . $name)) {
            $errors{$name_} = lc($text{'error_delete'} . lc(" - $!"));
        } else {
            push(@deleted_entries, $name);
        }
    }
}

if ($fsid) {
    cache_search_delete($fsid, \@deleted_entries);
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
