#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Ross <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;

our (%in, $cwd);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my $command;
my $has_zip    = has_command('zip');
my $do_zip     = ($in{'do_zip'} eq '1' ? 1 : 0);
my $extension  = (($has_zip && $do_zip && !test_all_items_query()) ? "zip" : "tar.gz");
my $filename   = $in{'filename'};
my $target_dir = tempname("$filename");
my $target     = "$target_dir/$filename.$extension";

if ($in{'cancel'} eq '1') {
    unlink_file($target_dir);
} elsif ($in{'download'} eq '1') {
    my $file = simplify_path($target);
    my $size = -s "$target";
    print "Content-Type: application/x-download\n";
    print "Content-Disposition: attachment; filename=\"$filename.$extension\"\n";
    print "Content-Length: $size\n\n";
    open(FILE, "< $file") or die "can't open $file: $!";
    binmode FILE;
    local $/ = \102400;
    while (<FILE>) {
        print $_;
    }
    close FILE;
    unlink_file($target_dir);
    last;
} else {
    mkdir($target_dir, 0755);
    my @entries_list = get_entries_list();
    if ($has_zip && $do_zip && !test_all_items_query()) {
        $command = "cd " . quotemeta($cwd) . " && zip -r " . quotemeta($target);
        foreach my $name (@entries_list) {
            if (-e ($cwd . '/' . $name)) {
                $command .= " " . quotemeta($name);
            }
        }
    } else {
        my $list = transname();
        my $gnu_tar_param = get_tar_verbatim();
        open my $fh, ">", $list or die $!;
        print $fh "$_\n" for @entries_list;
        close $fh;
        $command = "tar czf " . quotemeta($target) . " -C " . quotemeta($cwd) . "$gnu_tar_param -T " . $list;
    }
    system_logged($command);
}
head();
