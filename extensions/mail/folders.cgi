#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;
use File::Basename;
use lib (dirname(__FILE__) . '/../../lib');

our (%in);

require(dirname(__FILE__) . '/mail-lib.pm');

my %temporary;
my @folders_data = list_folders_sorted();
my @folders;
foreach my $folder (@folders_data) {
    if ($folder->{'hide'} && $folder ne $_[1]) {
        next;
    }

    my $unread;
    if (should_show_unread($folder)) {
        my ($total_count, $unread_count, $special_count) = mailbox_folder_unread($folder);
        $unread = $unread_count;
    }

    my $id = $folder->{'id'} || $folder->{'file'};
    my ($fid) = $id =~ m#([^/]+)$#;
    my ($parent, $child) = $fid =~ m|^ (.+) \. ([^\.]+) \z|x;
    my $name   = $folder->{'name'};
    my $key    = folders_key_escape($id);
    my $title  = folders_title_escape(folders_title_unseen(html_escape($child ? $child : $name), $unread));
    my $active = (folders_key_escape($in{'key'}) eq $key ? 1 : 0);
    my $data = $temporary{$fid} = { key    => $key,
                                    title  => $title,
                                    active => $active,
                                    unread => $unread, };
    defined $parent ? (push @{ $temporary{$parent}{children} }, $data) : (push(@folders, $data));
}
get_json(@folders);
