#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;

our (%in, $cwd, @allowed_paths, @remote_user_info);

do($ENV{'THEME_ROOT'} . "/extensions/file-manager/file-manager-lib.pl");

my $command;
my $has_zip    = has_command('zip');
my $has_tar    = has_command('tar');
my $do_zip     = ($in{'do_zip'} eq '1'                             ? 1     : 0);
my $extension  = (($has_zip && $do_zip && !test_all_items_query()) ? "zip" : "tar.gz");
my $filename   = $in{'filename'};
var_dump(\%in, 'user_info');
var_dump(\@remote_user_info, 'in');
my $target_dir = tempname("$filename");
my $target     = "$target_dir/$filename.$extension";

if ($in{'cancel'} eq '1') {
    unlink_file($target_dir);
} elsif ($in{'download'} eq '2') {
    my $file  = &resolve_links(&simplify_path("$cwd/$filename"));
    my $error = 1;
    for my $allowed_path (@allowed_paths) {
        if (&is_under_directory($allowed_path, $file)) {
            $error = 0;
        }
    }
    $error && &print_error(&text('notallowed', &html_escape($file), &html_escape(join(" , ", @allowed_paths))));
    my $size = -s "$file";
    (my $name, my $dir, my $ext) = fileparse($file, qr/\.[^.]*/);
    print "Content-Type: application/x-download\n";
    print "Content-Disposition: attachment; filename=\"$name$ext\"\n";
    print "Content-Length: $size\n\n";
    open(FILE, "< $file") or die "can't open $file: $!";
    binmode FILE;
    local $/ = \&get_buffer_size_binary();

    while (<FILE>) {
        print $_;
    }
    close FILE;
} elsif ($in{'download'} eq '1') {
    my $file = simplify_path($target);
    if (-e $file) {
        my $size = -s "$target";
        print "Content-Type: application/x-download\n";
        print "Content-Disposition: attachment; filename=\"$filename.$extension\"\n";
        print "Content-Length: $size\n\n";
        open(FILE, "< $file") or die "can't open $file: $!";
        binmode FILE;
        local $/ = \&get_buffer_size_binary();

        while (<FILE>) {
            print $_;
        }
        close FILE;
        unlink_file($target_dir);
    } else {
        print_error(text('theme_download_error', &html_escape(join(" , ", @allowed_paths))));
    }
} else {
    mkdir($target_dir, 0755);
    my @entries_list = get_entries_list();
    if ($has_zip && $do_zip && !test_all_items_query()) {
        $command = "cd " . quotemeta($cwd) . " && " . quotemeta($has_zip || 'zip') . " -r " . quotemeta($target);

        # Do extra check because zip actually resolves links by default
        foreach my $name (@entries_list) {
            my $ffile = &resolve_links(&simplify_path("$cwd/$name"));
            my $error = 1;
            for my $allowed_path (@allowed_paths) {
                if (&is_under_directory($allowed_path, $ffile)) {
                    $error = 0;
                }
            }
            if (-e $ffile && !$error) {
                $command .= " " . quotemeta($name);
            }
        }
    } else {
        my $list          = transname();
        my $gnu_tar_param = get_tar_verbatim();

        # No need to resolve links and do extra check
        # because tar by default doesn't resolve links
        open my $fh, ">", $list or die $!;
        print $fh "$_\n" for @entries_list;
        close $fh;
        $command =
          "" .
          quotemeta($has_tar || 'tar') . " czf " .
          quotemeta($target) . " -C " .
          quotemeta($cwd) .
          "$gnu_tar_param -T " .
          $list;
    }
    system_logged($command);
}
head();
