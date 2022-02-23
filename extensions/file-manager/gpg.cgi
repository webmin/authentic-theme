#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, %config, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my %errors;
my $status;
my $action     = $in{'action'};
my $key        = quotemeta($in{'key'});
my $delete     = $in{'delete'};
my $passphrase = $in{'passphrase'};
my $keyuser    = $in{'keyuser'};
my $homeuser   = $in{'homeuser'};
my $safe_mode  = $config{'config_portable_module_filemanager_files_safe_mode'} ne 'false';

my $gpgpath = get_gpg_path();
my $no_command;

# Get user level
my ($user_level) = get_user_level();

# In case this is a master admin login,
# and the key to encrypt data belonging
# to /root, do not switch to the current
# home directory user and use that instead
my $forceuser;
if (!$user_level && $keyuser) {
    $forceuser = $keyuser;
}

# Set user env and switch to remote user first
switch_to_given_unix_user($forceuser);

foreach my $name (@entries_list) {
    my ($iname);
    my $gpg;

    $iname = $name;
    $iname .= ($key ? ("_" . substr($key, 0, 6)) : '');

    # Clean extension name when decrypting
    if ($action eq "decrypt") {
        $iname =~ s/(_[a-h0-9]+\.gpg|pgp)$//i;
    }

    my $ffext;
    $ffext = ".gpg" if ($action eq "encrypt");

    # Check if file exist
    if ($safe_mode && -e "$cwd/$iname$ffext") {
        my $__ = 0;
        for (;;) {
            $__++;
            my $niname = "$iname(" . $__ . ")";
            if ($action eq 'decrypt') {
                my ($fname, $fext) = file_name_extension_splitter($iname);
                $niname = "$fname(" . $__ . ")" . ($fext ? ".$fext" : '');
            }
            if (!-e "$cwd/$niname$ffext") {
                $iname = "$niname$ffext";
                last;
            }
        }
    } else {
        $iname = "$iname$ffext";
        unlink_file("$cwd/$iname$ffext") if (-e "$cwd/$iname$ffext");
    }
    $status = 0;

    if ($action eq "encrypt") {
        my $fpath = "$cwd/$name";
        $gpg =
"cd @{[quotemeta($cwd)]} && $gpgpath --encrypt --always-trust --output @{[quotemeta($iname)]} --recipient $key @{[quotemeta($fpath)]}";
        $status = system($gpg);

        # Set file owner in case was encrypted usign master admin keys
        system("chown --reference=" . quotemeta($cwd) . " " . quotemeta("$cwd/$iname"))
          if (!$status && $homeuser && !$user_level);

    } elsif ($action eq "decrypt") {
        my $extra;
        if ($passphrase) {
            my $gpg_ver = get_gpg_version($gpgpath);
            if ($gpg_ver ge '2.1') {
                $extra = " --pinentry-mode loopback ";
            } else {
                $extra = " --yes --batch  ";
            }
            $extra .= "  --passphrase-fd 0 ";
        }
        my $fpath = "$cwd/$name";
        $gpg = "cd @{[quotemeta($cwd)]} && $gpgpath $extra --output @{[quotemeta($iname)]} --decrypt @{[quotemeta($fpath)]}";
        open my $fh => "| $gpg" or $no_command = 1;
        print $fh $passphrase;
        close $fh;
        $status = $?;

        # Set file owner in case was decrypted usign master admin keys
        system("chown --reference=" . quotemeta($cwd) . " " . quotemeta("$cwd/$iname"))
          if (!$status && $homeuser && !$user_level);
    }

    if ($delete && $status == 0) {
        unlink_file("$cwd/$name");
    }

    if (!has_command($gpgpath) || $no_command) {
        $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', $gpgpath);
    }
    if ($status != 0) {
        if ($status == 512) {
            $errors{$name} = $text{'filemanager_archive_gpg_private_error'};
        }
    }
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
