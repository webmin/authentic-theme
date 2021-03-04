#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my %errors;
my $status;
my $action     = $in{'action'};
my $delete     = $in{'delete'};
my $passphrase = $in{'passphrase'};

my $gpgpath = get_gpg_path();
my $no_command;

foreach my $name (@entries_list) {
    next if (-d "$cwd/$name");
    my $localtime = POSIX::strftime('%H%M%S', localtime());
    my ($iname, $fname, $fext);
    my $gpg;

    $iname = $name;
    $iname =~ s/\.(gpg|pgp)$// if ($action eq "decrypt");
    ($fname, $fext) = $iname =~ /^(?|(.*)\.(tar\.gz)|(.*)\.(wbt\.gz)|(.*)\.(.*)|(.*))$/;
    $fext   = ".$fext" if ($fext);
    $iname  = $fname . "_" . substr($action, 0, 1) . "$localtime" . $fext;
    $status = 0;

    if ($action eq "encrypt") {
        my $key = quotemeta($in{'key'});
        $gpg =
"cd @{[quotemeta($cwd)]} && $gpgpath --encrypt --always-trust --output @{[quotemeta($iname)]}.gpg --recipient $key @{[quotemeta($name)]}";
        $status = system($gpg);

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
        $gpg = "cd @{[quotemeta($cwd)]} && $gpgpath $extra --output @{[quotemeta($iname)]} --decrypt @{[quotemeta($name)]}";
        open my $fh => "| $gpg" or $no_command = 1;
        print $fh $passphrase;
        close $fh;
        $status = $?;
    }

    if ($delete && $status == 0) {
        unlink_file("$cwd/$name");
    }

    if (!has_command($gpgpath) || $no_command) {
        $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', $gpgpath);
    }
    if ($status != 0) {
        if ($status == 512) {
            $errors{ $name } = $text{'filemanager_archive_gpg_private_error'};
        }
    }
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
