#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

foreach my $name (split(/\0/, $in{'name'})) {
    my $archive_type = mimetype($cwd . '/' . $name);
    if ($archive_type =~ /x-bzip/) {
        &backquote_logged("tar xvjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
    } elsif ($archive_type =~ /x-tar/ ||
             $archive_type =~ /\/gzip/ ||
             $archive_type =~ /x-xz/   ||
             $archive_type =~ /x-compressed-tar/)
    {
        &backquote_logged("tar xfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd));
    } elsif ($archive_type =~ /x-7z/) {
        &backquote_logged("7z x -aoa " . quotemeta("$cwd/$name") . " -o" . quotemeta($cwd));
    } elsif ($archive_type =~ /\/zip/) {
        &backquote_logged("unzip -o " . quotemeta("$cwd/$name") . " -d " . quotemeta($cwd));
    } elsif ($archive_type =~ /\/x-rar|\/vnd\.rar/) {
        &backquote_logged("unrar x -r -y -o+ " . quotemeta("$cwd/$name") . " " . quotemeta($cwd));
    } elsif ($archive_type =~ "/x-rpm" || $archive_type =~ /\/x-deb/) {
        my $dir = fileparse("$cwd/$name", qr/\.[^.]*/);
        my $path = quotemeta("$cwd/$dir");
        &backquote_logged("mkdir $path");
        if ($archive_type =~ /\/x-rpm/) {
            &backquote_logged("(rpm2cpio " . quotemeta("$cwd/$name") . " | (cd " . $path . "; cpio -idmv))");
        } else {
            &backquote_logged("dpkg -x " . quotemeta("$cwd/$name") . " " . $path);
        }
    }
}

redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'});
