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
my $status_gpg;
my $pparam;
my $iname;
my $gpg;
my $password = $in{'password'};
my $delete   = $in{'delete'};

foreach my $name (@entries_list) {
    my $no_command;
    $status     = 0;
    $status_gpg = 0;
    $gpg        = 0;
    $iname      = $name;
    if (string_ends_with($name, '.gpg') || string_ends_with($name, '.pgp')) {
        my $gpgpath = get_gpg_path();
        $gpg = 1;
        $name =~ s/\.(gpg|pgp)$//;
        my $pparam_gpg;
        if ($password) {
            my $gpg_ver = get_gpg_version($gpgpath);
            if ($gpg_ver ge '2.1') {
                $pparam_gpg = " --pinentry-mode loopback ";
            } else {
                $pparam_gpg = " --yes --batch  ";
            }
            $pparam_gpg .= "  --passphrase-fd 0 ";
        }

        $status_gpg = "cd @{[quotemeta($cwd)]} && $gpgpath $pparam_gpg --output @{[quotemeta($name)]} --decrypt " .
          quotemeta("$cwd/$iname");

        open my $fh => "| $status_gpg" or $no_command = 1;
        print $fh $password;
        close $fh;
        $status_gpg = $?;
        if (!has_command($gpgpath) || $no_command) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', $gpgpath);
        }
    }

    my $archive_type = mimetype($cwd . '/' . $name);
    if ($archive_type =~ /x-tar/ || $archive_type =~ /x-compressed-tar/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $status = system("$tar_cmd xpf " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
        }
    } elsif ($archive_type =~ /x-bzip/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $status = system("$tar_cmd xjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
        }
    } elsif ($archive_type =~ /\/gzip/) {
        my $gz_cmd = has_command('gunzip') || has_command('gzip');
        if (!$gz_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'gzip/gunzip');
        } else {
            $status = system("$gz_cmd -d -f -k " . quotemeta("$cwd/$name"));
        }
    } elsif ($archive_type =~ /x-xz/) {
        my $xz_cmd = has_command('xz');
        if (!$xz_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'xz');
        } else {
            $status = system("$xz_cmd -d -f -k " . quotemeta("$cwd/$name"));
        }
    } elsif ($archive_type =~ /x-7z/) {
        my $x7z_cmd = has_command('7z');
        if (!$x7z_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', '7z');
        } else {
            if ($password) {
                $pparam = (" -p" . quotemeta($password) . " ");
            }
            $status = system("$x7z_cmd x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($cwd) . $pparam);
        }
    } elsif ($archive_type =~ /\/zip/) {
        my $unzip_cmd = has_command('unzip');
        if (!$unzip_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'unzip');
        } else {
            if ($password) {
                $pparam = (" -P " . quotemeta($password) . " ");
            }
            my $unzip_out = `unzip --help`;
            my $uu        = ($unzip_out =~ /-UU/ ? '-UU' : undef);
            $status = system("$unzip_cmd $pparam $uu -q -o " . quotemeta("$cwd/$name") . " -d " . quotemeta($cwd));
        }
    } elsif ($archive_type =~ /\/x-rar|\/vnd\.rar/) {
        my $unrar_cmd = has_command('unar') || has_command('unrar');
        if (!$unrar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'unrar/unar');
        } else {
            if ($password) {
                $pparam = (" -p " . quotemeta($password) . " ");
            }
            if ($unrar_cmd eq 'unar') {
                $status = system("$unrar_cmd $pparam -r " . quotemeta("$cwd/$name") . " -o " . quotemeta($cwd));
                if ($status == 512) {
                    $status = 65280;
                }
            } else {
                $pparam =~ s/(?<=.)\s//;
                $status = system("$unrar_cmd $pparam x -r -y -o+ " . quotemeta("$cwd/$name") . " " . quotemeta($cwd));
            }
        }
    } elsif ($archive_type =~ /\/x-rpm/) {
        my $rpm2cpio_cmd = has_command('rpm2cpio');
        my $cpio_cmd     = has_command('cpio');
        if (!$rpm2cpio_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'rpm2cpio');
        } elsif (!$cpio_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'cpio');
        } else {
            my $dir  = fileparse("$cwd/$name", qr/\.[^.]*/);
            my $path = quotemeta("$cwd/$dir");
            system("mkdir $path");
            $status = system("($rpm2cpio_cmd " . quotemeta("$cwd/$name") . " | (cd " . $path . "; $cpio_cmd -idmv))");
        }

    } elsif ($archive_type =~ /\/x-deb|debian\.binary-package/) {
        my $dpkg_cmd = has_command('dpkg');
        if (!$dpkg_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'dpkg');
        } else {
            my $dir  = fileparse("$cwd/$name", qr/\.[^.]*/);
            my $path = quotemeta("$cwd/$dir");
            system("mkdir $path");
            $status = system("$dpkg_cmd -x " . quotemeta("$cwd/$name") . " " . $path);
        }
    }

    if (!%errors && ($delete || $gpg) && ($status == 0 && $status_gpg == 0)) {
        unlink_file("$cwd/$name");
        if ($delete && $gpg) {
            unlink_file("$cwd/$iname");
        }
    }

    if ($status != 0 || $status_gpg != 0) {
        if ($gpg) {
            if ($status_gpg == 512) {
                $errors{$name} = $text{'filemanager_archive_gpg_private_error'};
            }
        } elsif ($status == 1280 || $status == 65280) {
            $errors{$name} = $text{'filemanager_archive_password_required'};
        } elsif ($status == 256 || $status == 512 || $status == 768 || $status == 20992) {
            $errors{$name} = $text{'filemanager_archive_password_wrong'};
        } elsif ($status == 2304 || $status == 2560) {
            $errors{$name} = $text{'filemanager_archive_file_not_found'};
        }
    }
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
