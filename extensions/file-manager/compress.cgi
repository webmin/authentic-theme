#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %text, $cwd, $path);

do(dirname(__FILE__) . '/file-manager-lib.pl');

if (!$in{'arch'}) {
    redirect_local('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
}

my %errors;
my $command;
my $extension;

my @entries_list = get_entries_list();
my $delete       = $in{'arcmove'} ? 1 : 0;
my $encrypt      = $in{'arcencr'} ? 1 : 0;
my $password     = $in{'arcencr_val'};
my $key_id       = quotemeta($in{'arkkey'});

if ($in{'method'} eq 'tar') {
    my $list = transname();
    open my $fh, ">", $list or die $!;
    print $fh "$_\n" for @entries_list;
    close $fh;

    my $file  = "$cwd/$in{'arch'}.tar.gz";
    my $fileq = quotemeta($file);
    $command = "tar czf " . $fileq . " -C " . quotemeta($cwd) . " -T " . $list;
    system($command);

    if ($encrypt && $key_id) {
        my %webminconfig = foreign_config("webmin");
        my $gpgpath      = quotemeta($webminconfig{'gpg'} || "gpg");
        my $gpg          = "$gpgpath --encrypt --always-trust --recipient $key_id $fileq";

        if (!has_command($gpgpath)) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', $gpgpath);
        }

        if (system($gpg) != 0) {
            $errors{ $file } = "$text{'filemanager_archive_gpg_error'}: $?";
        }
        unlink_file($file);
    }
} elsif ($in{'method'} eq 'zip') {
    my $pparam;
    if ($encrypt && $password) {
        $pparam = (" -P " . quotemeta($password) . " ");
    }
    $command = "cd " . quotemeta($cwd) . " && zip $pparam -r " . quotemeta("$cwd/$in{'arch'}.zip");
    foreach my $name (@entries_list) {
        $command .= " " . quotemeta($name);

        if (!-e ($cwd . '/' . $name)) {
            $errors{ $name } = lc($text{'theme_xhred_global_no_target'});
        }
    }
    system($command);
}

if ($delete) {
    if (!%errors) {
        foreach my $name (@entries_list) {
            unlink_file("$cwd/$name");
        }
    } else {
        $errors{ $text{'theme_xhred_filemanager_archive_move_to'} } = $text{'filemanager_archive_move_to_archive_failed'};
    }

}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
