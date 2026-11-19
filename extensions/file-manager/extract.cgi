#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, %config, $cwd, $path);

require($ENV{'THEME_ROOT'} . "/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my %errors;
my $password  = $in{'password'};
my $delete    = $in{'delete'};
my $safe_mode = $in{'overwrite_efiles'} ne 'true';

foreach my $name (@entries_list) {
    my $created;
    my $archive = fm_checked_cwd_path_or_error($name);
    my $ecwd = $cwd;
    my $pparam = '';

    # Each extractor writes into the private directory supplied below.
    my ($cmd, $tar_archive);
    my $unar;
    my @stream_stat;

    # Check the RPM extractor before creating an output directory
    my $archive_type = mimetype($archive);
    my $bsdtar_cmd;
    if ($archive_type =~ /\/(x-rpm|x-source-rpm)/) {
        $bsdtar_cmd = has_command('bsdtar');
        if (!$bsdtar_cmd) {
            $errors{$name} = text('filemanager_archive_extract_missing_bsdtar', html_escape($name));
            next;
        }
    }

    # Based on options put extracted content to a separate directory
    if ($safe_mode) {
        my ($fname, $fext) = file_name_extension_splitter($name);
        $fname ||= $name;
        my $extract_dir = fm_checked_cwd_path_or_error($fname);

        # If directory exists add a numerable suffix
        if (-e $extract_dir || -l $extract_dir) {
            my $__ = 1;
            for (;;) {
                my $necwd = fm_checked_cwd_path_or_error($fname . "(" . $__++ . ")");
                if (!-e $necwd && !-l $necwd) {
                    $ecwd = $necwd;
                    last;
                }
            }
        } else {
            $ecwd = $extract_dir;
        }
        $created = mkdir($ecwd);
        if (!$created) {
            $errors{$name} = html_escape("$!");
            next;
        }
    }

    if ($archive_type =~ /x-tar/ || $archive_type =~ /-compressed-tar/ || $archive_type =~ /zstd/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $tar_archive = $archive;
            $cmd = "$tar_cmd xpf " . quotemeta($archive);
        }
    } elsif ($archive_type =~ /x-bzip/) {
        my $tar_cmd = has_command('tar');
        if (!$tar_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', 'tar');
        } else {
            $tar_archive = $archive;
            $cmd = "$tar_cmd xjpf " . quotemeta($archive);
        }
    } elsif ($archive_type =~ m{/gzip|/x-gzip|/x-xz}) {
        my $xz = $archive_type =~ /x-xz/;
        my $tool = $xz ? has_command('xz') : has_command('gunzip') || has_command('gzip');
        if ($tool) {
            # In overwrite mode a single compressed file expands beside its source.
            $ecwd = dirname($archive) if (!$safe_mode);
            @stream_stat = stat($archive);
            $cmd = filemin_decompress_command($tool, $archive);
        } else {
            $errors{$name} = text('theme_xhred_global_no_such_command', $xz ? 'xz' : 'gzip/gunzip');
        }
    } elsif ($archive_type =~ /x-7z/ ||
             $archive_type =~ /x-raw-disk-image/ ||
             $archive_type =~ /x-cd-image/)
    {
        my $x7z_cmd = has_command('7z');
        if (!$x7z_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', '7z');
        } else {
            if ($password) {
                $pparam = (" -p" . quotemeta($password) . " ");
            }
            $cmd = "$x7z_cmd x -aoa " . quotemeta($archive) . " -o." . $pparam;
        }
    } elsif ($archive_type =~ /\/zip/) {
        my $unzip_cmd = has_command('unzip');
        if (!$unzip_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', 'unzip');
        } else {
            my $x7z_cmd = has_command('7z');
            if ($password && $x7z_cmd) {
                $pparam = (" -p" . quotemeta($password) . " ");
                $cmd = "$x7z_cmd x -aoa " . quotemeta($archive) . " -o." . $pparam;
            } else {
                if ($password) {
                    $pparam = (" -P " . quotemeta($password) . " ");
                }
                my $unzip_out = `unzip --help`;
                my $uu        = ($unzip_out =~ /-UU/ ? '-UU' : undef);
                $cmd = "$unzip_cmd $pparam $uu -q -o " . quotemeta($archive) . " -d .";
            }
        }
    } elsif ($archive_type =~ /\/x-rar|\/vnd\.rar/) {
        my $unrar_cmd = has_command('unar') || has_command('unrar');
        if (!$unrar_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', 'unrar/unar');
        } else {
            if ($password) {
                $pparam = (" -p " . quotemeta($password) . " ");
            }
            if ($unrar_cmd =~ /unar$/) {
                $cmd  = "$unrar_cmd $pparam " . quotemeta($archive) . " -o .";
                $unar = 1;
            } else {
                $pparam =~ s/(?<=.)\s//;
                $cmd = "$unrar_cmd $pparam x -r -y -o+ " . quotemeta($archive) . " ./";
            }
        }
    } elsif ($archive_type =~ /\/(x-rpm|x-source-rpm)/) {
        my $dir = fileparse($name, qr/\.[^.]*/);
        $ecwd = fm_checked_cwd_path_or_error($dir) if (!$safe_mode);
        # RPM payloads must not restore privileged permissions or archive owners.
        $cmd = quotemeta($bsdtar_cmd) . " --no-same-owner --no-same-permissions -xf " . quotemeta($archive);
    } elsif ($archive_type =~ /\/x-deb|debian\.binary-package/) {
        my $dpkg_cmd = has_command('dpkg');
        if (!$dpkg_cmd) {
            $errors{$name} = text('theme_xhred_global_no_such_command', 'dpkg');
        } else {
            my $dir = fileparse($name, qr/\.[^.]*/);
            $ecwd = fm_checked_cwd_path_or_error($dir) if (!$safe_mode);
            $cmd = "$dpkg_cmd -x " . quotemeta($archive) . " .";
        }
    } else {
        $errors{$name} = $text{'extract_etype'};
    }

    if ($cmd) {
        # Follow the user's chosen directory link and check the actual destination.
        $ecwd = abs_path($ecwd) if (-l $ecwd && ($ecwd eq $cwd || @stream_stat));
        if (!fm_path_is_allowed($ecwd)) {
            $errors{$name} = fm_not_allowed_error($name, $ecwd);
            next;
        }
        # Package formats use a named output directory even in overwrite mode.
        $created = mkdir($ecwd) if (!$safe_mode && !-e $ecwd && !-l $ecwd);
        my @original = lstat($archive);
        my $diagnostic;
        my ($status, @errors) = extract_in_private_dir($ecwd, 1, sub {
            $diagnostic = qx{($cmd) 2>&1 >/dev/null </dev/null};
            my $result = $?;
            # gzip and xz normally preserve file modes and timestamps. Restore
            # them on the single output before it leaves the private directory.
            if (!$result && @stream_stat) {
                filemin_walk_tree(".", 1, sub {
                    my ($output) = @_;
                    if (!chmod($stream_stat[2] & 0777, $output) ||
                        !utime(@stream_stat[8, 9], $output)) {
                        $diagnostic = "$!";
                        $result = -1;
                    }
                });
            }
            return $result;
        }, (@stream_stat ? @stream_stat[4, 5] : (undef, undef)), $tar_archive);
        if ($status && !@errors) {
            # Quiet unzip signals a bad password with exit code 82.
            if (($archive_type =~ /\/zip/ && $status == (82 << 8)) ||
                ($unar && !$diagnostic && $status == 512) ||
                ($archive_type =~ /zip|rar|7z/ && $diagnostic =~ /password|passphrase/i)) {
                push(@errors, $text{$password ? 'filemanager_archive_password_wrong' : 'filemanager_archive_password_required'});
            } else {
                push(@errors, text('filemanager_archive_extract_failed', html_escape($name),
                                   html_escape($diagnostic || ($status >> 8) || $status)));
            }
        }
        if (@errors) {
            $errors{$name} = join('<br>', @errors);
        } elsif ($delete && filemin_same_file(\@original, [ lstat($archive) ])) {
            # The archive may have contained a replacement with its own name.
            unlink_file($archive) || ($errors{$name} = html_escape("$!"));
        }
    }
    rmdir($ecwd) if ($created && exists($errors{$name}));
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=filemin' . '&error=' . get_errors(\%errors) . extra_query());
