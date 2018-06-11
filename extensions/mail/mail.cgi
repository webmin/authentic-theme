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

our (%text, %in, %userconfig, %config, $special_folder_id);

require(dirname(__FILE__) . '/mail-lib.pm');

my %mails;

open_dsn_hash();

# Get all available folders
my @folders = list_folders_sorted();

# Get current folder
if (defined($in{'id'})) {
    my $id = find_named_folder($in{'id'}, \@folders);
    if ($id) {
        $in{'folder'} = $id->{'index'};
    }
} elsif (!defined($in{'folder'}) && $userconfig{'default_folder'}) {
    my $df = find_named_folder($userconfig{'default_folder'}, \@folders);
    if ($df) {
        $in{'folder'} = $df->{'index'};
    }

}
my ($folder) = grep {$_->{'index'} == $in{'folder'}} @folders;

# Check mail quota
my ($qtotal, $qcount, $totalquota, $countquota) = get_user_quota();
if ($totalquota) {
    $mails{'quota'} = text('mail_quota', nice_size($qtotal), nice_size($totalquota));
}

# Work out start from jump page
my $perpage = $folder->{'perpage'} || $userconfig{'perpage'} || 20;
$mails{'perpage'} = $perpage;

if ($in{'jump'} =~ /^\d+$/ && $in{'jump'} > 0) {
    $in{'start'} = ($in{'jump'} - 1) * $perpage;
}

# Get email to show, in order
my @error;
my @mail = mailbox_list_mails_sorted(int($in{'start'}), int($in{'start'}) + $perpage - 1,
                                     $folder, !$userconfig{'show_body'}, \@error);
if ($in{'start'} >= @mail && $in{'jump'}) {
    $in{'start'} = @mail - $perpage;
    @mail = mailbox_list_mails_sorted(int($in{'start'}), int($in{'start'}) + $perpage - 1,
                                      $folder, !$userconfig{'show_body'}, \@error);
}

# Refresh timeout
$mails{'refresh'} = $userconfig{'refresh'} || 5;

#Folder id
$mails{'folder_id'} = ($folder->{'id'} || $folder->{'file'});

# Folder breadcrumb
my @folders_breadcrumb = split(/\./, $mails{'folder_id'});
$mails{'folder_breadcrumb'} = \@folders_breadcrumb;

# Folder title
$mails{'folder_title'} = $folder->{'name'};

# Folder name
$mails{'folder_name'} = $folders_breadcrumb[-1];

# Folders select
my $folders_select = folders_select(\@folders, $folder);
$mails{'folders_select'} = $folders_select;

# Pagination arrows
my $link    = "index.cgi?folder=" . $in{'folder'};
my $initial = @mail - $in{'start'} - $perpage + 1;

$mails{'pagination_arrow_left'} = $in{'start'} ? $link . "&start=" . ($in{'start'} - $perpage) : undef;
$mails{'pagination_arrow_right'} = $in{'start'} + $perpage < @mail ? $link . "&start=" . ($in{'start'} + $perpage) : undef;
$mails{'pagination_arrow_first'} = $in{'start'} ? $link . "&start=0" : undef;
$mails{'pagination_arrow_last'} =
  $in{'start'} + $perpage < @mail ? $link . "&start=" . (int((scalar(@mail) - $perpage - 1) / $perpage + 1) * $perpage) :
  undef;
$mails{'pagination_message'} =
  @mail ?
  text('extensions_mail_current_position',
       $initial < 1 ? 1 : $initial,
       (@mail - $in{'start'}),
       scalar(@mail), $folders_select) :
  text('mail_none', $folders_select);

# Work out displayed range
my $start = int($in{'start'});
my $end   = $in{'start'} + $perpage - 1;
if ($end >= scalar(@mail)) {
    $end = scalar(@mail) - 1;
}

$mails{'pagination_start'} = $start;
$mails{'pagination_end'}   = $end;

# Buttons for managing mail
my $form_list_buttons;
if (@mail) {
    my $folders_count   = scalar(@folders);
    my $can_report_spam = (can_report_spam($folder) && $userconfig{'spam_buttons'} =~ /list/ || $folder->{'spam'} ? 1 : 0);
    my $can_report_ham  = (can_report_ham($folder) && $userconfig{'ham_buttons'} =~ /list/ || $folder->{'spam'} ? 1 : 0);

    $form_list_buttons = {
                 'submit' => {
                     'new'     => [$text{'mail_compose'}, $userconfig{'open_mode'}],
                     'forward' => [$text{'mail_forward'}, $userconfig{'open_mode'}],
                     'unread'  => [$text{'view_markas0'}],
                     'read'    => [$text{'view_markas1'}],
                     'special' => [$text{'view_markas2'}],
                     'delete'  => [$text{'mail_delete'}],
                     'copy1'   => [$text{'mail_copy'},    $folders_count],
                     'move1'   => [$text{'mail_move'},    $folders_count],
                     'black'   => [$text{'mail_black'},   $can_report_spam],
                     'razor' => [$userconfig{'spam_del'} ? $text{'view_razordel'} : $text{'view_razor'}, $can_report_spam],
                     'white' => [$userconfig{'white_move'} ? $text{'mail_whitemove'} : $text{'mail_white'}, $can_report_ham],
                     'ham'   => [$userconfig{'ham_move'}   ? $text{'view_hammove'}   : $text{'view_ham'},   $can_report_ham],
                     'new' => [$text{'mail_black'}, $can_report_spam],
                 },
                 'select' => {
                         'all'     => select_all_link("d", 1),
                         'invert'  => select_invert_link("d", 1),
                         'read'    => select_status_link("d", 1, $folder, \@mail, $start, $end, 1, $text{'mail_selread'}),
                         'unread'  => select_status_link("d", 1, $folder, \@mail, $start, $end, 0, $text{'mail_selunread'}),
                         'special' => select_status_link("d", 1, $folder, \@mail, $start, $end, 2, $text{'mail_selspecial'}),
                 } };
}

# Form for managing mail
$mails{'form_list'} = {
              'target' => 'delete_mail.cgi',
              ('hidden' => { 'folder' => $folder->{'index'}, 'mod' => modification_time($folder), 'start' => $in{'start'} }),
              'buttons' => $form_list_buttons };

# Assign errors
if (@error) {
    $mails{'error'} = text('mail_err', $error[0] == 0 ? $error[1] : text('save_elogin', $error[1]));
}

# Mail list sorter
my ($sorted) = get_sort_field($folder);
my $showfrom = $folder->{'show_from'};
my $list_sort_from;
if ($showfrom) {
    $list_sort_from = field_sort_link($text{'extensions_mail_sort_by_sender'}, "from", $folder, $in{'start'});
}
my $showto = $folder->{'show_to'};
my $list_sort_to;
if ($showto) {
    $list_sort_to = field_sort_link($text{'extensions_mail_sort_by_recipient'}, "to", $folder, $in{'start'});
}
my $list_sort_spam;
if ($folder->{'spam'}) {
    $list_sort_spam = field_sort_link($text{'extensions_mail_sort_by_spam'}, "x-spam-status", $folder, $in{'start'});
}

# Mail list content
my $list_mails;
if (@mail) {
    my $type = 0;
    $list_mails = messages_list($start, $end, $showfrom, $showto, $folder, $type, @mail);
}

$mails{'list'} = {
    'sort' => {
        'from'    => $list_sort_from,
        'to'      => $list_sort_to,
        'date'    => field_sort_link($text{'extensions_mail_sort_by_date'}, "date", $folder, $in{'start'}),
        'size'    => field_sort_link($text{'extensions_mail_sort_by_size'}, "size", $folder, $in{'start'}),
        'spam'    => $list_sort_spam,
        'subject' => field_sort_link($text{'extensions_mail_sort_by_subject'}, "subject", $folder, $in{'start'}),

    },
    'mails'  => $list_mails,
    'sorted' => ($sorted ? "<a href='sort.cgi?folder=$folder->{'index'}&start=$start'>$text{'mail_nosort'}</a>" :
                   "$text{'mail_nosort'}"
    ) };

save_last_folder_id($folder);
pop3_logout();

get_json(\%mails);
