#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use Digest::MD5 qw(md5_hex);
use Encode qw( encode decode );

our (%in, $current_theme, $default_charset, %userconfig, %config, %gconfig, %dsnreplies, %delreplies);

our %request_uri = get_request_uri();
set_module();
get_libs();
set_charset();

our %text = (load_language($current_theme), load_language(get_module()));

sub get_env
{
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub set_env
{
    my ($k, $v) = @_;
    $ENV{ uc($k) } = $v;
}

sub set_charset
{
    if (lc($gconfig{'lang'}) =~ 'utf-8') {
        $default_charset = "utf-8";
    }
}

sub get_request_uri
{
    (my $uri = get_env('request_uri')) =~ s/\?/&/;
    my @r = split /&/, $uri;
    my %c;

    foreach (@r) {
        my ($k, $v) = split /=/, $_;
        $c{$k} = $v;
    }

    return %c;
}

sub get_libs
{
    require(dirname(__FILE__) . '/../../authentic-funcs.pm');
    require(get_env('document_root') . '/' . get_module() . '/' . get_module() . '-lib.pl');

    ReadParse();
}

sub get_module
{
    return ($request_uri{'module'} eq "mailboxes" ? "mailboxes" : "mailbox");
}

sub set_module
{
    my $module = get_module();
    set_env('foreign_module_name', $module);
    set_env('foreign_root_directory', (get_env('document_root') . '/' . $module));
}

sub encode_guess
{
    my ($str, $type) = @_;
    my $encoding;

    if (!$encoding) {
        eval "use Encode::Detect::Detector;";
        if (!$@) {
            $encoding = Encode::Detect::Detector::detect($str);
        }
    }

    my ($mime_header) = $str =~ /\=\?([-\w]+)\?/;
    if ($mime_header || (lc(get_charset()) eq "utf-8" && ($encoding && lc($encoding) ne "utf-8"))) {
        eval {$str = encode('utf-8', decode(($mime_header ? 'MIME-Header' : $encoding), $str))};
    }

    return $str;
}

sub folders_process
{
    my ($folder) = @_;
    if ($folder eq 'Maildir') {
        $folder = '.INBOX';
    }
    return $folder;

}

sub folders_key_escape
{
    my ($str) = @_;
    $str =~ s/%26/&/g;
    return replace(' ', '_', $str);
}

sub folders_title_escape
{
    my ($str) = @_;
    $str =~ s/\\&quot;/"/g;
    return $str;
}

sub folders_title_unseen
{
    my ($folder, $count) = @_;
    $folder = $folder .= "<span class=\"label label-danger\">$count</span>" if $count;
    return $folder;
}

sub folders_select
{
    my ($folders, $folder, $type) = @_;
    my @opts;
    my $id;
    my $offset = 0;

    push(@opts, [undef, undef]);
    push(@opts, [-1,    $text{'sform_all'}]);
    push(@opts, [-2,    $text{'sform_local'}]);

    foreach my $f (@$folders) {
        $f->{'name'} =~ tr/\./\//d;
        $id = ($type ? folder_name($f) : $f->{'index'});
        if ($f->{'name'} =~ /^INBOX\//) {
            $f->{'name'} =~ tr/INBOX/Inbox/d;
            splice(@opts, (4 + $offset), 0, [$id, $f->{'name'}]);
            $offset++;
        } else {
            push(@opts, [$id, $f->{'name'}]);
        }
    }
    return ui_select(undef, undef, \@opts);
}

sub folder_counts
{
    my ($folder) = @_;
    my $total;
    my $unread;
    my $special;
    if (should_show_unread($folder)) {
        ($total, $unread, $special) = mailbox_folder_unread($folder);
    }
    return (int($total), int($unread), int($special));
}

sub folder_data
{
    my ($folder) = @_;
    my ($folder_id, $folder_file, $folder_name) = ($folder->{'id'}, $folder->{'file'}, $folder->{'name'});

    if ($in{'searched_folder_id'}) {
        $folder_id = $in{'searched_folder_id'};
    }

    if ($in{'searched_folder_file'}) {
        $folder_file = $in{'searched_folder_file'};
    }

    return ($folder_id, $folder_file, $folder_name);
}

sub message_avatar
{
    my ($sender, $blank) = @_;
    my $hash = $blank ? undef : md5_hex($sender);

    return '</td><td data-blank="' . ($blank ? '1' : '0') . '"><span class="mail-list-avatar-container"><span data-blank="' .
      ($blank ? '1'     : '0') . '" class="mail-list-avatar"><img src="//www.gravatar.com/avatar/' . $hash . '?d=' .
      ($blank ? "blank" : "mm") . '&s=30" alt></span></span></td>';
}

sub message_addressee
{
    my @addressees = split(',', $_[0]);
    my @addressees_proc;
    my $x;
    foreach my $addressee (@addressees) {
        my ($x_name)    = $addressee =~ /((?:(?!<).)*)/;
        my ($x_address) = $addressee =~ /<(.*?)>/;
        if ($x_name =~ /^?=/) {
            $x_name = undef;
        }
        if ($x_address || $x_name) {
            $x = ui_bold(html_escape($x_name || $x_address)) . html_escape(' &lt;' . trim($x_address || $x_name) . '&gt;');
        }
        push(@addressees_proc, $x);
    }

    if ($x) {
        $x = join(($_[1] ? $_[1] : '<br>'), @addressees_proc);
    }

    return $x;
}

sub message_details
{
    my ($mail, $folder) = @_;
    my ($headers, $header) = ($mail->{'headers'}, $mail->{'header'});
    my $data;
    my $status;
    if ($folder->{'show_from'}) {    #$folder->{'inbox'} == 1

        my $from  = message_addressee($header->{'from'});
        my $reply = message_addressee($header->{'reply-to'});
        if ($reply) {
            my @characters = split(//, $reply);
            my $length = 66;
            if (scalar(@characters) > $length) {
                $reply =
                  join("", @characters[0 .. $length]) . "..." .
                  join("", @characters[$#characters - $length / 2 .. $#characters]);
            }
        }

        my $to  = message_addressee($header->{'to'});
        my $cc  = message_addressee($header->{'cc'});
        my $bcc = message_addressee($header->{'bcc'});

        my $date = $header->{'date'};

        my @headers = map {ref $_ eq "ARRAY" ? @$_ : $_} @$headers;
        $headers = join(' ', @headers);

        # print_array($headers);
        my ($source) = $headers =~ /eceived\sfrom\s(?!localhost)(.*?)\(.*?\[(?!127.0.0.1)(.*?)\]/;
        if ($1 && $2) {
            $source = $1 . " " . ui_text($2, 'light');
        }

        my ($dkim_signature) = $headers =~ /dkim-signature.+?d=(.+?)[;|\s]/i;

        my ($dkim) =
          (($header->{'authentication-results'} =~ /dkim=(pass)\s/) ||
            ($header->{'x-spam-status'} =~ /(dkim_valid)/i) ||
            ($header->{'x-spam-status'} =~ /(dkim_signed)/i));

        my ($spf) = $header->{'authentication-results'} =~ /spf=(pass)\s/ || $header->{'x-spam-status'} =~ /(spf_pass)/i;
        my ($encryption) = $headers =~ /ESMTP/;
        my $encryption_label;
        if ($encryption) {
            if ($headers =~ /ESMTPS/) {
                $encryption       = 1;
                $encryption_label = $text{'extensions_mail_flag_tls_on'};
            } else {
                $encryption_label = $text{'extensions_mail_flag_tls_off'};
                $encryption       = 0;
            }
        } else {
            $encryption_label = $text{'extensions_mail_flag_tls_none'};
            $encryption       = -1;
        }

        my $spam_status;
        if ($header->{'x-spam-status'}) {
            $header->{'x-spam-status'} =~ /(.*),\s*score=((?:-)?\d*.\d*)\s*required=(\d*.\d*)/;
            my $label     = $1;
            my $score     = $2;
            my $score_max = $3;
            if ($label && $score && $score_max) {
                my $spam_result = $label =~ /no/i ? 0 : 1;
                $label =
                  $label =~ /no/i ? $text{'theme_xhred_global_no'} : ui_text($text{'theme_xhred_global_yes'}, 'danger');
                $spam_status =
                  $label . " " . ui_text(text('extensions_mail_flag_spam_status_data', $score, $score_max), 'light');
                $spam_status = $spam_result ? ui_text($spam_status, 'danger') : ui_text($spam_status);
            }
        }

        my $encrypted = $encryption ? 'lock text-success' : 'unlocked text-danger fa-flip-horizontal';
        my $lock = 'lock';
        $status = 'info';
        if ($dkim && !$encryption) {
            $status = 'warning';
        } elsif ($dkim && $encryption) {
            $status = 'success';
        } elsif (!$dkim && !$encryption) {
            $lock   = 'unlocked fa-flip-horizontal';
            $status = 'danger';
        }
        my $success = ui_icon('check text-success');
        my $fail    = ui_icon('times text-danger');

        $data = ui_table_tbody_start('table table-condensed table-transparent table-message-details');
        my @tcontent;

        push(@tcontent, [$text{'extensions_mail_header_from'} . ":",      $from])        if ($from);
        push(@tcontent, [$text{'extensions_mail_header_reply_to'} . ":",  $reply])       if ($reply && $reply ne $from);
        push(@tcontent, [$text{'extensions_mail_header_to'} . ":",        $to])          if ($to);
        push(@tcontent, [$text{'extensions_mail_header_cc'} . ":",        $cc])          if ($cc);
        push(@tcontent, [$text{'extensions_mail_header_bcc'} . ":",       $bcc])         if ($bcc);
        push(@tcontent, [$text{'extensions_mail_header_date'} . ":",      $date])        if ($date);
        push(@tcontent, [$text{'extensions_mail_header_spam'} . ":",      $spam_status]) if ($spam_status);
        push(@tcontent, [$text{'extensions_mail_header_mailed_by'} . ":", $source])      if ($source);
        push(@tcontent,
             [$text{'extensions_mail_header_signed_by'} . ":",
              ui_italic(($dkim_signature ? $dkim_signature : $fail), 'light')
             ]
        ) if ($dkim_signature);
        push(@tcontent, [$text{'extensions_mail_header_dkim'} . ":", ui_italic(($dkim ? $success : $fail), 'light')])
          if ($dkim_signature && $dkim || (!$dkim_signature && !$dkim));
        push(@tcontent, [$text{'extensions_mail_header_spf'} . ":", ui_italic(($spf ? $success : $fail), 'light')]);
        push(@tcontent,
             [$text{'extensions_mail_header_encrypted'} . ":",
              ui_icon($encrypted)
                .
                ui_italic(
                          (  $encryption ? $encryption_label :
                               ui_italic($encryption_label, 'danger')
                          ),
                          'light'
                )
             ]
        ) if $encryption != -1;

        $data .= ui_table_content(@tcontent);
        $data .= ui_table_tbody_end();

    }
    return ($data, $status);
}

sub message_flags
{
    my ($mail, $showto, $folder) = @_;

    my @special;
    my $special;
    my $read    = get_mail_read($folder, $mail);
    my $unread  = 0;
    my $starred = $read & 2 ? 1 : 0;
    if ($starred) {
        $special = ui_icon('star star', 'theme_xhred_global_starred');
    } else {
        $special = ui_icon('star-o star', 'theme_xhred_global_unstarred');
    }
    if (($read & 1) == 0) {
        $unread = 1;
    }

    my @reply;
    my $reply;
    if ($read & 4) {
        $reply = ui_icon('reply mail-list-reply');
    }

    my @security;
    my ($security_data, $security_status) = message_details($mail, $folder);
    my $security;
    if ($security_data) {
        $security = ui_icon('caret-down text-light mail-list-dkim', $security_data, 'bottom');
    }

    my @all;
    my $all;
    my $p = int($mail->{'header'}->{'x-priority'});
    if ($p == 1 || $p == 2) {
        $all .= ui_icon('exclamation text-danger mail-list-important', 'extensions_mail_flag_important');
    } else {
        $all .= ui_icon();
    }

    if (mail_has_attachments($mail, $folder)) {
        $all .= ui_icon('paperclip fa-rotate-315 mail-list-attachment',
                        (
                         ui_text($text{'extensions_mail_flag_attachment'} . "<br>(" . nice_size($mail->{'size'}, 1024) . ")"
                         )
                        ),
                        'auto top',
                        1);
    } else {
        $all .= ui_icon();
    }

    my @dns;
    my $dns;
    if ($showto && defined(&open_dsn_hash)) {
        open_dsn_hash();
        my $mid = $mail->{'header'}->{'message-id'};
        if ($dsnreplies{$mid}) {
            $dns = ui_icon('read text-primary mail-list-dns-reply');
        }
        if ($delreplies{$mid}) {
            my ($bounce) = grep {/^\!/}
              split(/\s+/, $delreplies{$mid});
            if ($bounce) {
                $dns = ui_icon('read text-danger mail-list-dns-reply');
            } else {
                $dns = ui_icon('read text-success mail-list-dns-reply');
            }
        }
    }

    push(@reply,    $reply);
    push(@special,  $special);
    push(@security, $security);
    push(@all,      $all);
    push(@dns,      $dns);
    return ($unread, $starred, @reply, @special, @security, @all, @dns);
}

# Generate pagination link for messages
sub message_pagination_link
{
    my ($type, $link) = @_;
    my $icon = 'btn btn-lg  btn-default fa fa-fw fa-angle-';

    if ($type eq 'left') {
        $icon .= "left";
    } elsif ($type eq 'right') {
        $icon .= "right";
    } elsif ($type eq 'first') {
        $icon .= "double-left";
    } elsif ($type eq 'last') {
        $icon .= "double-right";
    }

    if ($link =~ /undefined/) {
        $link = '';
    }

    if ($type eq 'first' || $type eq 'last') {
        if ($link) {
            return $link;
        }
        return undef;
    } else {
        return '<a ' . ui_tooltip($text{ 'extensions_mail_pagination_' . $type . '' }) . ' class="' . $icon . '' .
          ($link ? undef : ' disabled') . '" href="' . $link . '"></a>';
    }
}

# Generate sort link for messages
sub messages_sort_link
{
    my ($title, $field, $folder, $start, %searched) = @_;
    my ($sortfield, $sortdir) = get_sort_field($folder);
    my $dir = $sortfield eq $field ? !$sortdir : 0;
    my $img =
      $sortfield eq $field && $dir  ? "sort-desc" :
      $sortfield eq $field && !$dir ? "sort-asc" :
      "sort-inactive";
    if ($folder->{'sortable'} && $userconfig{'show_sort'}) {
        return "<a data-href='sort.cgi?returned_format=json&field=" .
          &urlize($field) . "&dir=" . &urlize($dir) . "&folder=" . &urlize($folder->{'index'}) .
          "&start=" . &urlize($start) . hash_to_query('&', %searched) . "'><i class=\"fa fa-fw fa-$img\"> </i>$title";
    } else {
        return $title;
    }
}

#Get single message and its read status
sub message_fetch
{
    my ($id, $folder) = @_;
    my $mail = mailbox_get_mail($folder, $id, 0);
    my $read_status = get_mail_read($folder, $mail);

    return ($mail, $read_status);

}

# Mark message as read
sub message_mark_read
{
    my ($id, $folder) = @_;
    my ($mail, $read_status) = message_fetch($id, $folder);
    if (($read_status & 1) == 0) {
        set_mail_read($folder, $mail, $read_status + 1);
    }
}

# Mark message as unread
sub message_mark_unread
{
    my ($id, $folder) = @_;
    my ($mail, $read_status) = message_fetch($id, $folder);
    if (($read_status & 1) == 1) {
        set_mail_read($folder, $mail, $read_status - 1);
    }
}

# Mark message as starred (special)
sub message_mark_starred
{
    my ($id, $folder, $state) = @_;
    my ($mail, $read_status) = message_fetch($id, $folder);
    if ($state eq 'unread') {
        set_mail_read($folder, $mail, 2);
    } elsif ($state eq 'read') {
        set_mail_read($folder, $mail, 3);
    }
}

# Extract the list of email messages
sub messages_fetch
{
    my ($start, $end, $perpage, $jump, $folder, $user_config, $error) = @_;
    my @mail = mailbox_list_mails_sorted($start, $end, $folder, $user_config, $error);
    if ($start >= @mail && $jump) {
        $start = @mail - $perpage;
        @mail = mailbox_list_mails_sorted($start, $end, $folder, $user_config, $error);
    }
    return ($start, @mail);
}

# Return list of email messages
sub messages_list
{

    my ($start, $end, $showfrom, $showto, $folder, @mail) = @_;
    my $list_mails;

    $list_mails .= ui_table_tbody_start();
    mail_has_attachments([map {$mail[$_]} ($start .. $end)], $folder);

    for (my $i = $start; $i <= $end; $i++) {
        my @colattrs;
        my $m   = $mail[$i];
        my $mid = $m->{'header'}->{'message-id'};

        my $idx = $m->{'idx'};
        my $id  = $m->{'id'};
        my @cols;

        # Trim folder id for search
        my $searched_folder_id = $in{'searched_folder_id'};
        if (defined($searched_folder_id)) {
            $id = trim(replace(folders_key_escape($searched_folder_id), '', $id));
        }

        # Special flag
        my ($unread, $starred, $flag_reply, $flag_special, $flag_security, $flags_all, $flags_dns) =
          message_flags($m, $folder->{'sent'}, $folder);
        push(@cols, $flag_special);
        my @dcolumn;
        my $dcolumn;
        $dcolumn = ui_span_row('drow drow-container');

        $dcolumn .= ui_span_row('row trow trow-container');
        if ($showfrom) {
            $dcolumn .=
              ui_span_row('trow trow-from') .
              view_mail_link($folder, $id, $start, encode_guess($m->{'header'}->{'from'}, 'from')) . ui_span_row();
        }
        if ($showto) {
            $dcolumn .=
              ui_span_row('trow trow-to-pointer', 1) .
              ui_span_row('trow trow-to') . ($showfrom ? ui_icon('long-arrow-right') : undef) .
              view_mail_link($folder, $id, $start, encode_guess($m->{'header'}->{'to'}, 'to')) . ui_span_row();
        }
        $dcolumn .= ui_span_row('trow trow-flag-security') . $flag_security . ui_span_row();
        $dcolumn .= ui_span_row();
        $dcolumn .= ui_span_row();

        push(@dcolumn, $dcolumn);
        push(@cols,    @dcolumn);

        my @bcolumn;
        my $bcolumn;
        my $subject = encode_guess(simplify_subject($m->{'header'}->{'subject'}), 'subject');
        $bcolumn .= ui_span_row('mrow mrow-subject') . $flag_reply .
          ($subject ? $subject : $text{'extensions_mail_header_no_subject'}) . ui_span_row();
        my $preview;
        if ($userconfig{'show_body'}) {
            my $plen = $in{'show_body_len'} || $userconfig{'show_body_len'};
            parse_mail($m);
            my $preview_data = mail_preview($m, $plen);
            if ($preview_data) {
                $preview = html_escape($preview_data);
                $preview = encode_guess($preview, 'preview');
                if (length $preview > 2) {
                    $bcolumn .= ui_span_row('mrow mrow-preview') . " - " . $preview . ui_span_row();
                }
            }
        }

        push(@bcolumn, $bcolumn);
        push(@cols,    @bcolumn);

        my @fcolumn;
        my $fcolumn;
        $fcolumn = ui_span_row('frow frow-container');

        $flags_all = $flags_dns . $flags_all;

        if ($folder->{'spam'}) {
            if ($m->{'header'}->{'x-spam-status'} =~ /(hits|score)=([0-9\.]+)/) {
                $flags_all =
                  $flags_all . '<i ' . ui_tooltip($text{'extensions_mail_flag_spam_score'} . ': ' . $2, 'top') .
                  ' class="fa fa-fw fa-spam text-danger spam"></i>';
            }
        }
        $fcolumn .= ui_span_row('row trow trow-flags') . $flags_all . ui_span_row();

        $fcolumn .= ui_span_row();
        push(@fcolumn, $fcolumn);
        push(@cols,    @fcolumn);

        my @scolumn;
        my $scolumn;
        $scolumn = ui_span_row('srow srow-container');

        my ($sorted) = get_sort_field($folder);
        if ($sorted eq 'size') {
            $scolumn .= ui_span_row('row brow brow-size') . nice_size($m->{'size'}, 1024) . ui_span_row();
        } else {
            $scolumn .=
              ui_span_row('row mrow mrow-date') . theme_make_date_local($m->{'header'}->{'date'}, 1, -1) . ui_span_row();
        }

        $scolumn .= ui_span_row();

        push(@scolumn, $scolumn);
        push(@cols,    @scolumn);

        # Detect IMAP deleted mail
        if ($m->{'deleted'}) {
            foreach my $c (@cols) {
                $c = "<strike>$c</strike>";
            }
        }

        #Mark unread
        push(@colattrs, " data-unread=\"$unread\" data-starred=\"$starred\"");

        $list_mails .= ui_message_list_column(\@cols, \@colattrs, "d", $id, $m, $folder);
        update_delivery_notification($mail[$i], $folder);
    }

    $list_mails .= ui_table_tbody_end();
    return $list_mails;
}

sub message_email_address
{
    my ($message_header_addressee) = @_;
    my @sender_addresses = split_addresses($message_header_addressee);
    return $sender_addresses[0]->[0];
}

sub message_select_link
{
    my ($name, $folder, $mail, $start, $end, $status, $label) = @_;
    my @rows;
    if ($folder) {
        for (my $i = $start; $i <= $end; $i++) {
            my $m = $mail->[$i];
            my $read = get_mail_read($folder, $m);
            if ($status == 0 && !($read & 1) ||
                $status == 1 && ($read & 1) ||
                $status == 2 && ($read & 2))
            {
                push(@rows, $m->{'id'});
            }
        }
    }
    my $data = "" . join(",", map {"" . quote_escape($_) . ""} @rows) . "";
    my $link = '<a data-type="' . $status . '" data-select-mass="' . $data . '">' . $label . '</a>';
    return $link;
}

sub ui_message_list_column
{
    my ($cols, $trattrs, $checkname, $checkvalue, $message, $folder) = @_;
    my $rv;
    my $editable = editable_mail($message);

    $rv .= "<tr  " . $trattrs->[0] . " class='ui_checked_columns'>\n";
    $rv .= "<td class='" . ($editable ? 'ui_checked_checkbox' : undef) . "'>";
    if ($editable) {
        $rv .= theme_ui_checkbox_local($checkname, $checkvalue, undef, undef, "data-check") . "";
    }
    $rv .= message_avatar(message_email_address($message->{'header'}->{'from'}), $folder->{'sent'});
    $rv .= '</td>';

    my $i;
    for ($i = 0; $i < @$cols; $i++) {
        $rv .= "<td>";
        if ($cols->[$i] !~ /<a\s+href|<span|<i|<input|<select|<textarea/) {
            $rv .= "<label for=\"" . quote_escape("${checkname}_${checkvalue}") . "\">";
        }
        $rv .= ($cols->[$i] !~ /\S/ ? "<br>" : $cols->[$i]);
        if ($cols->[$i] !~ /<a\s+href|<input|<select|<textarea/) {
            $rv .= "</label>";
        }
        $rv .= "</td>\n";
    }
    $rv .= "</tr>\n";
    return $rv;
}

sub ui_tooltip
{
    return "data-tooltip='mailbox' data-placement='@{[$_[1] || 'bottom']}' data-title='$_[0]'";
}

sub ui_icon
{
    my ($fa, $tt, $tp, $cb) = @_;
    if ($tt) {
        $tt = (index($tt, '</') != -1 ? $tt : $text{$tt});
        $tp = $tp ? " data-placement=\"$tp\""  : undef;
        $cb = $cb ? " data-placement=\"body\"" : undef;
        my $td = $tp ? 'tooltip="mailbox"' : 'toggle="tooltip"';
        return "<i data-$td title=\"$tt\" $tp $cb class=\"fa fa-fw fa-$fa\"></i>";
    } elsif ($fa) {
        return "<i class='fa fa-fw fa-" . $fa . "'></i>";
    } else {
        return "<i class='fa fa-fw'></i>";
    }

}

sub ui_bold
{
    my ($str) = @_;
    return '<strong>' . html_escape($str) . '</strong>';

}

sub ui_italic
{
    my ($str, $cls) = @_;
    return '<em class=\'text-' . $cls . '\'>' . html_escape($str) . '</em>';

}

sub ui_text
{
    my ($str, $cls) = @_;
    return '<span class=\'text-' . $cls . '\'>' . html_escape($str) . '</span>';

}

sub ui_span_row
{
    my ($c, $e) = @_;
    if ($c) {
        my @c = split(/\s/, $c);
        $c = join ' ', map "mail-list-$_", @c;
        return "<span class=\"$c\">" . ($e ? ui_span_row() : undef);
    } else {
        return "</span>";
    }

}

sub ui_span
{
    my ($data, $cls) = @_;
    return '<span class=\'' . $cls . '\'>' . $data . '</span>';

}

sub ui_btn
{
    my ($str, $cls, $data) = @_;
    return '<button ' . $data . ' class=\'btn btn-' . $cls . '\'>' . html_escape($str) . '</button>';

}

sub ui_table_tbody_start
{
    my ($classes) = @_;
    if (!$classes) {
        $classes = 'table table-striped table-hover table-condensed table-responsive table-mail-listing';
    }

    return '<table class=\'' . $classes . '\'><tbody>';
}

sub ui_table_content
{
    my (@content) = @_;
    my $content;
    foreach my $row (@content) {
        $content .= "<tr>";
        foreach my $cell (@$row) {
            $content .= "<td>";
            $content .= $cell;
            $content .= "</td>";
        }
        $content .= "</tr>";
    }
    return $content;
}

sub ui_table_tbody_end
{
    return '</tbody></table>';
}

# sub print_hash
# {
#     print "Content-type: text/html\n\n";
#     my (%d) = @_;
#
#     use Data::Dumper;
#     print Dumper(\%d);
# }
#
# sub print_array
# {
#     print "Content-type: text/html\n\n";
#     my ($____v) = @_;
#     use Data::Dumper;
#     print '<pre style="color: red">';
#     print Dumper $____v;
#     print '</pre>';
# }

1;
