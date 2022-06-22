#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, %config, $cwd, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my %errors;
my $status;
my $pparam;
my $password  = $in{'password'};
my $delete    = $in{'delete'};
my $ecwd      = $cwd;
my $safe_mode = $in{'overwrite_efiles'} ne 'true';

foreach my $name (@entries_list) {
    my $no_command;
    $ecwd   = $cwd;
    $status = undef;

    # Based on options put extracted content to a separate directory
    if ($safe_mode) {
        my ($fname, $fext) = file_name_extension_splitter($name);

        # If directory exists add a numerable suffix
        if (-e "$ecwd/$fname") {
            my $__ = 1;
            for (;;) {
                my $necwd = "$ecwd/$fname(" . $__++ . ")";
                if (!-e $necwd) {
                    $ecwd = $necwd;
                    last;
                }
            }
        } else {
            $ecwd = "$ecwd/$fname";
        }
        my $qecwd = quotemeta($ecwd);
        system("mkdir $qecwd");
    }

    my $archive_type = mimetype($cwd . '/' . $name);
    if ($archive_type =~ /x-tar/ || $archive_type =~ /-compressed-tar/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $status = system("$tar_cmd xpf " . quotemeta("$cwd/$name") . " -C " . quotemeta($ecwd));
        }
    } elsif ($archive_type =~ /x-bzip/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $status = system("$tar_cmd xjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($ecwd));
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
    } elsif ($archive_type =~ /x-7z/ ||
             $archive_type =~ /x-raw-disk-image/ ||
             $archive_type =~ /x-cd-image/)
    {
        my $x7z_cmd = has_command('7z');
        if (!$x7z_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', '7z');
        } else {
            if ($password) {
                $pparam = (" -p" . quotemeta($password) . " ");
            }
            $status = system("$x7z_cmd x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($ecwd) . $pparam);
        }
    } elsif ($archive_type =~ /\/zip/) {
        my $unzip_cmd = has_command('unzip');
        if (!$unzip_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'unzip');
        } else {
            my $x7z_cmd = has_command('7z');
            if ($password && $x7z_cmd) {
                $pparam = (" -p" . quotemeta($password) . " ");
                $status = system("$x7z_cmd x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($ecwd) . $pparam);
            } else {
                if ($password) {
                    $pparam = (" -P " . quotemeta($password) . " ");
                }
                my $unzip_out = `unzip --help`;
                my $uu        = ($unzip_out =~ /-UU/ ? '-UU' : undef);
                $status = system("$unzip_cmd $pparam $uu -q -o " . quotemeta("$cwd/$name") . " -d " . quotemeta($ecwd));
            }
        }
    } elsif ($archive_type =~ /\/x-rar|\/vnd\.rar/) {
        my $unrar_cmd = has_command('unar') || has_command('unrar');
        if (!$unrar_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'unrar/unar');
        } else {
            if ($password) {
                $pparam = (" -p " . quotemeta($password) . " ");
            }
            if ($unrar_cmd =~ /unar$/) {
                $status = system("$unrar_cmd $pparam " . quotemeta("$cwd/$name") . " -o " . quotemeta($ecwd));
                if ($status == 512) {
                    $status = 65280;
                }
            } else {
                $pparam =~ s/(?<=.)\s//;
                $status = system("$unrar_cmd $pparam x -r -y -o+ " . quotemeta("$cwd/$name") . " " . quotemeta($ecwd));
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
            my $path = quotemeta($safe_mode ? $ecwd : "$ecwd/$dir");
            system("mkdir $path");
            $status = system("($rpm2cpio_cmd " . quotemeta("$cwd/$name") . " | (cd " . $path . "; $cpio_cmd -idmv))");
        }

    } elsif ($archive_type =~ /\/x-deb|debian\.binary-package/) {
        my $dpkg_cmd = has_command('dpkg');
        if (!$dpkg_cmd) {
            $errors{ $text{'theme_xhred_global_error'} } = text('theme_xhred_global_no_such_command', 'dpkg');
        } else {
            my $dir  = fileparse("$cwd/$name", qr/\.[^.]*/);
            my $path = quotemeta($safe_mode ? $ecwd : "$ecwd/$dir");
            system("mkdir $path");
            $status = system("$dpkg_cmd -x " . quotemeta("$cwd/$name") . " " . $path);
        }
    }

    if (!%errors && $delete && $status == 0) {
        unlink_file("$cwd/$name");
    }

    if ($status != 0) {
        if ($status == 1280 || $status == 65280) {
            $errors{$name} = $text{'filemanager_archive_password_required'};
        } elsif ($status == 256 || $status == 512 || $status == 768 || $status == 20736 || $status == 20992) {
            $errors{$name} = $text{'filemanager_archive_password_wrong'};
        } elsif ($status == 2304 || $status == 2560) {
            $errors{$name} = $text{'filemanager_archive_file_not_found'};
        }
    }
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=filemin' . '&error=' . get_errors(\%errors) . extra_query());
