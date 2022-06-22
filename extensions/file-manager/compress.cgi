#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, %config, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

if (!$in{'arch'}) {
    redirect_local('list.cgi?path=' . urlize($path) . '&module=filemin');
}

my %errors;
my $command;
my $extension;

my @entries_list = get_entries_list();
my $delete       = $in{'arcmove'} ? 1 : 0;
my $encrypt      = $in{'arcencr'} ? 1 : 0;
my $password     = $in{'arcencr_val'};
my $key_id       = quotemeta($in{'arkkey'});
my $status;
my $safe_mode = $in{'overwrite_efiles'} ne 'true';

if ($in{'method'} eq 'tar' || $in{'method'} eq 'zip') {
    if ($in{'method'} eq 'tar') {
        if (!has_command('tar')) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'tar');
        }
        my $list = transname();
        open my $fh, ">", $list or die $!;
        print $fh "$_\n" for @entries_list;
        close $fh;

        my $file = "$cwd/$in{'arch'}.tar.gz";
        if (-e $file && $safe_mode) {
            my $__ = 1;
            for (;;) {
                my $new_file = "$cwd/$in{'arch'}(" . $__++ . ").tar.gz";
                if (!-e $new_file) {
                    $file = $new_file;
                    last;
                }
            }
        }
        my $fileq         = quotemeta($file);
        my $gnu_tar_param = get_tar_verbatim();
        $command = "tar czf " . $fileq . " -C " . quotemeta($cwd) . "$gnu_tar_param -T " . $list;
        $status  = system($command);

        if ($encrypt && $key_id) {
            my %webminconfig = foreign_config("webmin");
            my $gpgpath      = quotemeta($webminconfig{'gpg'} || "gpg");
            my $gpg          = "$gpgpath --encrypt --always-trust --recipient $key_id $fileq";

            if (!has_command($gpgpath)) {
                $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', $gpgpath);
            }
            $status = system($gpg);
            if ($status != 0) {
                $errors{$file} = "$text{'filemanager_archive_gpg_error'}: $?";
            } else {
                unlink_file($file);
            }
        }
    } elsif ($in{'method'} eq 'zip') {
        if (!has_command('zip')) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'zip');
        }
        my $pparam;
        if ($encrypt && $password) {
            $pparam = (" -P " . quotemeta($password) . " ");
        }
        my $zipped_file = "$cwd/$in{'arch'}.zip";
        if (-e $zipped_file && $safe_mode) {
            my $__ = 1;
            for (;;) {
                my $new_zipped_file = "$cwd/$in{'arch'}(" . $__++ . ").zip";
                if (!-e $new_zipped_file) {
                    $zipped_file = $new_zipped_file;
                    last;
                }
            }
        }
        $command = "cd " . quotemeta($cwd) . " && zip $pparam -r " . quotemeta($zipped_file);
        foreach my $name (@entries_list) {
            $command .= " " . quotemeta($name);

            if (!-e ($cwd . '/' . $name)) {
                $errors{$name} = lc($text{'theme_xhred_global_no_target'});
            }
        }
        $status = system($command);
    }

    if ($delete) {
        if (!%errors && $status == 0) {
            foreach my $name (@entries_list) {
                unlink_file("$cwd/$name");
            }
        } else {
            $errors{ $text{'theme_xhred_filemanager_archive_move_to'} } =
              $text{'filemanager_archive_move_to_archive_failed'};
        }

    }
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=filemin' . '&error=' . get_errors(\%errors) . extra_query());
