#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;

use File::Basename;
use Time::Local;

our (%in, %text, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

if (!$in{'link'}) {
    redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . extra_query());
    return;
}

my ($host, $port, $page, $ssl) = parse_http_url($in{'link'});
if (!$host) {
    print_error($text{'error_invalid_uri'});
} else {
    my $file = $page;
    my $full;
    $file =~ s/^.*\///;
    $file ||= "index.html";
    $full = "$cwd/$file";

    if (-e $full) {
        print_error(text('filemanager_rename_exists', $file, $path, $text{'theme_xhred_global_file'}) . ".");
    } else {
        my $success;
        my @st = stat($cwd);
        if ($ssl == 0 || $ssl == 1) {
            http_download($host, $port, $page, $full, undef, undef, $ssl, $in{'username'}, $in{'password'});
        } else {
            ftp_download($host, $page, $full, undef, undef, $in{'username'}, $in{'password'}, $port);
        }
        set_ownership_permissions($st[4], $st[5], undef, $full);
        @st = stat($cwd);
        $success .= text('http_done', nice_size($st[7]), "<tt>" . html_escape($full) . "</tt>");
        redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&success=' . $success . extra_query());
    }
}
