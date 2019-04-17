#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %text, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

my @entries_list = get_entries_list();
my %errors;
my $status;
my $status_gpg;
my $pparam;
my $iname;
my $gpg;
my $password = decode_base64($in{'password'});
my $delete   = $in{'delete'};

foreach my $name (@entries_list) {
    $status     = 0;
    $status_gpg = 0;
    $gpg        = 0;
    $iname      = $name;
    if (string_ends_with($name, '.gpg') || string_ends_with($name, '.pgp')) {
        my %webminconfig = foreign_config("webmin");
        my $gpgpath = quotemeta($webminconfig{'gpg'} || "gpg");
        $gpg = 1;
        $name =~ s/\.(gpg|pgp)$//;
        my $pparam_gpg;
        if ($password) {
            $pparam_gpg = (" --batch --yes --passphrase " . quotemeta($password) . " ");
        }
        $status_gpg =
          system("cd @{[quotemeta($cwd)]} && $gpgpath $pparam_gpg --output @{[quotemeta($name)]} --decrypt " .
                 quotemeta("$cwd/$iname"));
    }

    my $archive_type = mimetype($cwd . '/' . $name);
    if ($archive_type =~ /x-bzip/) {
        system("tar xvjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
    } elsif ($archive_type =~ /x-tar/ ||
             $archive_type =~ /\/gzip/ ||
             $archive_type =~ /x-xz/   ||
             $archive_type =~ /x-compressed-tar/)
    {
        $status = system("tar xfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
    } elsif ($archive_type =~ /x-7z/) {
        if ($password) {
            $pparam = (" -p" . quotemeta($password) . " ");
        }
        $status = system("7z x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($cwd) . $pparam);
    } elsif ($archive_type =~ /\/zip/) {
        if ($password) {
            $pparam = (" -P " . quotemeta($password) . " ");
        }
        $status = system("unzip $pparam -o " . quotemeta("$cwd/$name") . " -d " . quotemeta($cwd));

    } elsif ($archive_type =~ /\/x-rar|\/vnd\.rar/) {
        if ($password) {
            $pparam = (" -p " . quotemeta($password) . " ");
        }
        if (has_command('unar')) {
            $status = system("unar $pparam -r " . quotemeta("$cwd/$name") . " -o " . quotemeta($cwd));
            if ($status == 512) {
                $status = 65280;
            }
        } else {
            $pparam =~ s/(?<=.)\s//;
            $status = system("unrar $pparam x -r -y -o+ " . quotemeta("$cwd/$name") . " " . quotemeta($cwd));
        }
    } elsif ($archive_type =~ "/x-rpm" || $archive_type =~ /\/x-deb/) {
        my $dir = fileparse("$cwd/$name", qr/\.[^.]*/);
        my $path = quotemeta("$cwd/$dir");
        system("mkdir $path");
        if ($archive_type =~ /\/x-rpm/) {
            system("(rpm2cpio " . quotemeta("$cwd/$name") . " | (cd " . $path . "; cpio -idmv))");
        } else {
            system("dpkg -x " . quotemeta("$cwd/$name") . " " . $path);
        }
    }

    if (($delete || $gpg) && ($status == 0 && $status_gpg == 0)) {
        unlink_file("$cwd/$name");
        if ($delete && $gpg) {
            unlink_file("$cwd/$iname");
        }
    }

    if ($status != 0 || $status_gpg != 0) {
        if ($gpg) {
            if ($status_gpg == 512) {
                $errors{ html_escape($name) } = $text{'filemanager_archive_gpg_private_error'};
            }
        } elsif ($status == 1280 || $status == 65280) {
            $errors{ html_escape($name) } = $text{'filemanager_archive_password_required'};
        } elsif ($status == 256 || $status == 512 || $status == 768) {
            $errors{ html_escape($name) } = $text{'filemanager_archive_password_wrong'};
        } elsif ($status == 2304 || $status == 2560) {
            $errors{ html_escape($name) } = $text{'filemanager_archive_file_not_found'};
        }
    }
}

redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
