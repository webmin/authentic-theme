#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use lib (dirname(__FILE__) . '/../../lib');

our (%text, %in, %userconfig, %config, $special_folder_id);

require(dirname(__FILE__) . '/mail-lib.pm');

my %mails;

open_dsn_hash();

# Get all available folders
my @folders = list_folders_sorted();

# Get current folder
if (defined($in{'id'}) && length $in{'id'}) {
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
    $mails{'quota'} =
      text('extensions_mail_quota', nice_size($qtotal), (int($qtotal * 100 / $totalquota)), nice_size($totalquota));
}

# Work out start from jump page
my $perpage = $folder->{'perpage'} || $userconfig{'perpage'} || 20;
$mails{'perpage'} = $perpage;

# Work out displayed range
my $start = int($in{'start'});
my $end   = int($start + $perpage - 1);

if ($in{'jump'} =~ /^\d+$/ && $in{'jump'} > 0) {

    $start = ($in{'jump'} - 1) * $perpage;
}

# Get email to show, in order
my @error;
my ($start, @mail) = messages_fetch($start, $end, $perpage, $in{'jump'}, $folder, !$userconfig{'show_body'}, \@error);

if ($end >= scalar(@mail)) {
    $end = scalar(@mail) - 1;
}
if ($end < $start) {
    $start = 0;
    $end   = int($start + $perpage - 1);
    ($start, @mail) = messages_fetch($start, $end, $perpage, $in{'jump'}, $folder, !$userconfig{'show_body'}, \@error);
}

# Store default folders data
my $folder_index = $folder->{'index'};
my $folder_id    = $folder->{'id'};
my $folder_file  = $folder->{'file'};
my $folder_name  = $folder->{'name'};

# Searched messages
my %searched;
if ($in{'searched'}) {
    %searched = ('searched'              => $in{'searched'},
                 'searched_message'      => $in{'searched_message'},
                 'searched_folder_index' => $in{'searched_folder_index'},
                 'searched_folder_name'  => $in{'searched_folder_name'},
                 'searched_folder_id'    => $in{'searched_folder_id'},
                 'searched_folder_file'  => $in{'searched_folder_file'},);

    $mails{'searched'}              = $searched{'searched'};
    $mails{'searched_message'}      = $searched{'searched_message'};
    $mails{'searched_folder_index'} = $searched{'searched_folder_index'};
    $mails{'searched_folder_name'}  = $searched{'searched_folder_name'};
    $mails{'searched_folder_id'}    = folders_key_escape($searched{'searched_folder_id'});
    $mails{'searched_folder_file'}  = $searched{'searched_folder_file'};
}

# Refresh timeout
$mails{'refresh'} = $userconfig{'refresh'} || 5;

#Folder index
$mails{'folder_index'} = int($folder_index);

#Folder id
$mails{'folder_id'} = folders_key_escape(($folder_id || $folder_file));

# Folder breadcrumb
my @folders_breadcrumb = split(/\./, $folder_name);
$mails{'folder_breadcrumb'} = \@folders_breadcrumb;

# Folder title
$mails{'folder_title'} = $folder_name;

# Folder name
$mails{'folder_name'} = $folders_breadcrumb[-1];

# Folder counts
my $total = scalar(@mail);
$mails{'total'} = $total;

# Folders select
my $folders_select_by_id = folders_select(\@folders, $folder);

# Pagination
$mails{'pagination_start'}   = $start;
$mails{'pagination_end'}     = $end;
$mails{'pagination_current'} = int($start / $perpage) + 1;

my $link       = "index.cgi?folder=" . $in{'folder'};
my $initial    = @mail - $start - $perpage + 1;
my $percurrent = ($mails{'pagination_current'} * $perpage);
$mails{'pagination_arrow_left'} =
  message_pagination_link('left', $start ? $link . "&start=" . ($start - $perpage) : undef);
$mails{'pagination_arrow_right'} =
  message_pagination_link('right', $start + $perpage < @mail ? $link . "&start=" . ($start + $perpage) : undef);
$mails{'pagination_arrow_first'} = message_pagination_link('first', $start ? $link . "&start=0" : undef);
$mails{'pagination_arrow_last'} =
  message_pagination_link('last',
                   $start + $perpage < @mail ? $link . "&start=" . (int(($total - $perpage - 1) / $perpage + 1) * $perpage) :
                                     undef);
$mails{'pagination_message'} =
  @mail ?
  text('extensions_mail_current_position',
       $initial < 1 ? ($start ? $start + 1 : 1) : ($percurrent + 1 - $perpage),
       ($total < $percurrent ? $total : $percurrent),
       scalar(@mail)) :
  text('mail_none', $mails{'folder_name'});

# Buttons for managing mail
my $form_list_buttons;
if (@mail) {
    my $folders_count   = scalar(@folders);
    my $can_report_spam = (can_report_spam($folder) || $folder->{'spam'} ? 1 : 0);  #&& $userconfig{'spam_buttons'} =~ /list/
    my $can_report_ham  = (can_report_ham($folder) || $folder->{'spam'} ? 1 : 0);   #&& $userconfig{'ham_buttons'} =~ /list/

    $form_list_buttons = {
        'submit' => {
            'buttons' => [['delete' => $text{'mail_delete'}], ['forward' => $text{'mail_forward'}]],
            'dropdowns' => [
                [
                 'move' => [
                      ['move1' => $folders_select_by_id],
                      ['copy1' =>
                         ui_span(
                                 theme_ui_checkbox_local('copy_only', undef, $text{'extensions_mail_move_copy_only'},
                                                         undef, "data-copy-only"
                                 ),
                                 'pull-left'
                         )
                         .
                         ui_span(
                           ui_btn($text{'theme_xhred_global_move'}, 'default disabled', 'data-transfer-submit'), 'pull-right'
                         )
                      ],
                 ]
                ],
                [
                 'more' => [
                     ['markas1' => $text{'extensions_mail_mark_read'}],
                     ['markas0' => $text{'extensions_mail_mark_unread'}],

                     # ['markas2' => $text{'extensions_mail_mark_special'}],
                     ($can_report_ham ?
                        [ 'white' => ($userconfig{'white_move'} && $folder->{'spam'}) ?
                            $text{'extensions_mail_mark_spam_mail_whitemove'} :
                            $text{'extensions_mail_mark_spam_mail_white'}
                        ] :
                        []
                     ),
                     ($can_report_spam ? ['black' => $text{'extensions_mail_mark_spam_mail_black'}] : []),
                     ($can_report_spam ?
                        [ 'razor' => $userconfig{'spam_del'} ? $text{'extensions_mail_mark_spam_view_razordel'} :
                            $text{'extensions_mail_mark_spam_view_razor'}
                        ] :
                        []
                     ),
                     (($can_report_ham) ?
                        [ 'ham' => ($userconfig{'ham_move'} && $folder->{'spam'}) ?
                            $text{'extensions_mail_mark_spam_view_hammove'} :
                            $text{'extensions_mail_mark_spam_view_ham'}
                        ] :
                        []
                     ),
                 ]
                ],

            ],

        },
        'select' => {
              'all'    => message_select_link("d", undef, undef, undef, undef, 5, $text{'extensions_mail_select_all'}),
              'none'   => message_select_link("d", undef, undef, undef, undef, 4, $text{'extensions_mail_select_none'}),
              'invert' => message_select_link("d", undef, undef, undef, undef, 3, $text{'extensions_mail_select_invert'}),
              'read'   => message_select_link("d", $folder, \@mail, $start, $end, 2, $text{'extensions_mail_select_read'}),
              'unread' => message_select_link("d", $folder, \@mail, $start, $end, 1, $text{'extensions_mail_select_unread'}),
              'special' => message_select_link("d", $folder, \@mail, $start, $end, 0, $text{'theme_xhred_global_starred'}),
        } };
}

# Form for managing mail
$mails{'form_list'} = { 'target' => 'delete_mail.cgi',
                        (
                         'hidden' => { 'id'      => folders_key_escape(($folder_id || $folder_file)),
                                       'folder'  => $folder_index,
                                       'mod'     => modification_time($folder),
                                       'start'   => $start || defined,
                                       'confirm' => 1,
                         }
                        ),
                        'buttons' => $form_list_buttons // defined };

# Assign errors
if (@error) {
    $mails{'error'} = text('mail_err', $error[0] == 0 ? $error[1] : text('save_elogin', $error[1]));
}
if ($in{'error_fatal'} eq '1') {
    my $error_message = $in{'error'};
    my $errors        = $mails{'error'};
    if ($errors) {
        $mails{'error'} = { error => [$errors, $error_message] };
    } else {
        $mails{'error'} = { error => [$error_message] };
    }
}

# Mail list sorter
my ($sorted) = get_sort_field($folder);
my $showfrom = $folder->{'show_from'};
my $list_sort_from;
if ($showfrom) {
    $list_sort_from = messages_sort_link($text{'extensions_mail_sort_by_sender'}, "from", $folder, $start, %searched);
}
my $showto = $folder->{'show_to'};
my $list_sort_to;

if ($showto) {
    $list_sort_to = messages_sort_link($text{'extensions_mail_sort_by_recipient'}, "to", $folder, $start, %searched);
}
my $list_sort_spam;
if ($folder->{'spam'}) {
    $list_sort_spam = messages_sort_link($text{'extensions_mail_sort_by_spam'}, "x-spam-status", $folder, $start, %searched);
}

# Mail list content
my $list_mails;
if (@mail) {
    $list_mails = messages_list($start, $end, $showfrom, $showto, $folder, @mail);
}

$mails{'list'} = {
    'sort' => {
        'from'    => $list_sort_from,
        'to'      => $list_sort_to,
        'date'    => messages_sort_link($text{'extensions_mail_sort_by_date'}, "date", $folder, $start, %searched),
        'size'    => messages_sort_link($text{'extensions_mail_sort_by_size'}, "size", $folder, $start, %searched),
        'spam'    => $list_sort_spam,
        'subject' => messages_sort_link($text{'extensions_mail_sort_by_subject'}, "subject", $folder, $start, %searched),

    },
    'messages' => $list_mails,
    'sorted'   => (
        $sorted ?
"<a @{[ui_tooltip($text{'extensions_mail_search_filter_reset'})]} data-href='sort.cgi?returned_format=json&folder=$folder_index&start=$start@{[hash_to_query('&', %searched)]}' class=\"fa fa-fw fa-filter-clear text-danger\"></a>"
        :
          undef
    ) };

save_last_folder_id($folder);
pop3_logout();

print_json([\%mails]);
