#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
use lib (dirname(__FILE__) . '/../../lib');

require(dirname(__FILE__) . '/mail-lib.pm');

my %temporary;
my @folders_data = list_folders_sorted();
my @folders;
foreach my $folder (@folders_data) {
    if ($folder->{'hide'} && $folder ne $_[1]) {
        next;
    }

    my ($total, $unread, $special) = mailbox_folder_unread($folder);
    if (!should_show_unread($folder)) {
        $unread = 0;
    }

    my $id = $folder->{'id'};
    my ($parent, $child) = $id =~ m|^ (.+) \. ([^\.]+) \z|x;
    my $name   = $folder->{'name'};
    my $key    = replace(' ', '_', $id);
    my $title  = folders_title_unseen(html_escape($child ? $child : $name), $unread);
    my $active = ($in{'key'} eq $key ? 1 : 0);
    my $data = $temporary{$id} = { key     => $key,
                                   title   => $title,
                                   active  => $active,
                                   total   => $total,
                                   unread  => $unread,
                                   special => $special };
    defined $parent ? (push @{ $temporary{$parent}{children} }, $data) : (push(@folders, $data));
}
get_json(@folders);
