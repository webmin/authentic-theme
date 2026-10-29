#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

my %email;
our (%in, %text);

do($ENV{'THEME_ROOT'} . "/extensions/mail/mail-lib.pl");

my @folders = mailbox::list_folders_sorted();
my ($folder) = grep {$_->{'index'} == $in{'folder'}} @folders;
$folder || error($text{'view_efolder'});
my @ids = split(/\0/, $in{'d'});

# Fetch headers once so flag changes do not rescan and sort the whole folder.
my @messages = grep { $_ } mailbox::mailbox_select_mails($folder, \@ids, 1);

# Mark message as read
if ($in{'mark'} eq 'read') {
    foreach my $message (@messages) {
        message_mark_read($message, $folder);
    }
}

# Mark message as unread
if ($in{'mark'} eq 'unread') {
    foreach my $message (@messages) {
        message_mark_unread($message, $folder);
    }
}

# Mark message as starred (special)
if ($in{'mark'} eq 'starred') {
    foreach my $message (@messages) {
        message_mark_starred($message, $folder, $in{'state'});
    }
}

print_json(\%email);
