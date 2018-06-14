#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

use File::Basename;
use JSON;

our (%in, $current_theme, %userconfig, %config, %dsnreplies, %delreplies);

our %request_uri = get_request_uri();
set_module();
get_libs();

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

sub get_json
{
    my (@obj) = @_;
    print "Content-type: application/json\n\n";
    if (scalar(@_)) {
        print JSON->new->latin1->encode(\@_);
    } else {
        print JSON->new->latin1->encode({});
    }
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
    my ($folders, $folder) = @_;
    my @opts;
    my $name;
    foreach my $f (@$folders) {
        next if ($f->{'hide'} && $f ne $_[1]);
        my $umsg;
        if (should_show_unread($f)) {
            my ($c, $u) = mailbox_folder_unread($f);
            if ($u) {
                $umsg = " ($u)";
            }
        }
        $f->{'name'} =~ tr/\./\//d;
        $name = folder_name($f) . ".." . $f->{'index'};
        push(@opts, [$name, $f->{'name'} . $umsg]);
    }
    return ui_select(undef, $name, \@opts, 0, 0, 0, 0);
}

sub message_avatar
{
    use Digest::MD5 qw(md5_hex);
    return '<span class="mail-list-avatar-container"><span class="mail-list-avatar"><img src="//www.gravatar.com/avatar/' .
      md5_hex($_[0]) . '?d=mm&s=40" alt></span></span>';
}

sub message_flags
{
    my ($mail, $showto, $folder) = @_;

    my @special;
    my $special;
    my $read = get_mail_read($folder, $mail);
    if ($read & 2) {
        $special = ui_icon('star text-warning');
    } else {
        $special = ui_icon('star-o text-warning');
    }

    my @reply;
    my $reply;
    if ($read & 4) {
        $reply = ui_icon('reply mail-list-reply');
    }

    my @security;
    my $security;
    if ($folder->{'show_from'} && $folder->{'inbox'} == 1) {

        my ($spf)            = $mail->{'header'}->{'authentication-results'} =~ /spf=(.*?)\s/;
        my ($dkim)           = $mail->{'header'}->{'authentication-results'} =~ /dkim=(.*?)\s/;
        my ($dkim_signature) = $mail->{'header'}->{'dkim-signature'} =~ /d=(.*?);/;
        my $encryption       = $mail->{'header'}->{'received'} =~ /SMTPS/;

        my $lock  = 'lock';
        my $class = 'info';
        if ($dkim eq 'pass' && !$encryption) {
            $class = 'warning';
        } elsif ($dkim eq 'pass' && $encryption) {
            $class = 'success';
        } elsif ($dkim ne 'pass' && !$encryption) {
            $lock  = 'unlocked fa-flip-horizontal';
            $class = 'danger';
        }
        my $success = ui_icon('check text-success');
        my $fail    = ui_icon('times text-danger');
        $security .= ui_icon('' . $lock . ' text-' . $class . ' mail-list-dkim',
                             '' . $text{'extensions_mail_security_signed_by'} .
                               ': <em class=\'text-light\'>' . ($dkim_signature ? $dkim_signature : $fail) . '</em><br> ' .
                               $text{'extensions_mail_security_spf'} . ': ' . ($spf eq 'pass' ? $success : $fail) . '<br> ' .
                               $text{'extensions_mail_security_dkim'} . ': ' . ($dkim ? $success : $fail) . '<br> ' .
                               $text{'extensions_mail_security_encryption'} . ': ' . ($encryption ? $success : $fail) . '');
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
        $all .= ui_icon('paperclip mail-list-attachment', 'extensions_mail_flag_attachment');
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
    return (@reply, @special, @security, @all, @dns);
}

# Return list of email messages
sub messages_list
{

    my ($start, $end, $showfrom, $showto, $folder, $type, @mail) = @_;
    my $list_mails;

    $list_mails .= ui_table_tbody_start();
    mail_has_attachments([map {$mail[$_]} ($start .. $end)], $folder);

    if ($type) {
        for (my $i = $start; $i <= $end; $i++) {
            my @rowtds;
            my $m   = $mail[$i];
            my $mid = $m->{'header'}->{'message-id'};

            my $idx = $m->{'idx'};
            my $id  = $m->{'id'};
            my @cols;

            my ($flag_reply, $flag_special, $flags_all, $flags_dns) = message_flags($m, $folder->{'sent'}, $folder);
            push(@cols, $flag_special);

            if ($showfrom) {
                push(@cols, view_mail_link($folder, $id, $in{'start'}, $m->{'header'}->{'from'}));
            }
            if ($showto) {
                push(@cols, view_mail_link($folder, $id, $in{'start'}, $m->{'header'}->{'to'}));
            }

            my $preview;
            if ($userconfig{'show_body'}) {
                my $plen = $in{'show_body_len'} || $userconfig{'show_body_len'};
                parse_mail($m);
                my $preview_data = mail_preview($m, $plen);
                if ($preview_data) {
                    $preview = $preview_data;
                }
            }

            if ($folder->{'spam'}) {
                if ($m->{'header'}->{'x-spam-status'} =~ /(hits|score)=([0-9\.]+)/) {
                    $flags_all = $flags_all
                      .
                      join("\n",
                           '<i data-toggle="tooltip" title="' . $text{'extensions_mail_flag_spam_score'} .
                               ': ' . $2 . '" class="fa fa-fw fa-spam text-danger mail-list-spam"></i>');
                }
            }
            my $subject = simplify_subject($m->{'header'}->{'subject'});
            push(@cols,
                 join("\n", $flag_reply)
                   .
                   ( ($subject ? $subject : $text{'extensions_mail_header_no_subject'}) . " " .
                       join("\n", '<span class="text-light">' . $preview . "</span>")
                   ));

            push(@cols, $flags_all . join("\n", $flags_dns));

            push(@cols, nice_size($m->{'size'}, 1024));
            push(@cols, make_date($m->{'header'}->{'date'}, 1, -1));

            # Detect IMAP deleted mail
            if ($m->{'deleted'}) {
                foreach my $c (@cols) {
                    $c = "<strike>$c</strike>";
                }
            }

            $list_mails .=
              ui_message_list_column(\@cols, \@rowtds, "d", $id, message_sender($m->{'header'}->{'to'}), editable_mail($m));

            update_delivery_notification($mail[$i], $folder);
        }
    } else {
        for (my $i = $start; $i <= $end; $i++) {
            my @rowtds;
            my $m   = $mail[$i];
            my $mid = $m->{'header'}->{'message-id'};

            my $idx = $m->{'idx'};
            my $id  = $m->{'id'};
            my @cols;

            # Special flag
            my ($flag_reply, $flag_special, $flag_security, $flags_all, $flags_dns) =
              message_flags($m, $folder->{'sent'}, $folder);
            push(@cols, $flag_special);

            my @dcolumn;
            my $dcolumn;
            $dcolumn = ui_span_row('drow drow-container');

            $dcolumn .= ui_span_row('row trow trow-container');
            if ($showfrom) {
                $dcolumn .=
                  ui_span_row('trow trow-from') .
                  view_mail_link($folder, $id, $in{'start'}, $m->{'header'}->{'from'}) . ui_span_row();
            }
            if ($showto) {
                $dcolumn .=
                  ui_span_row('trow trow-to-pointer', 1) . ui_span_row('trow trow-to') .
                  view_mail_link($folder, $id, $in{'start'}, $m->{'header'}->{'to'}) . ui_span_row();
            }
            $dcolumn .= ui_span_row('trow trow-flag-security') . $flag_security . ui_span_row();
            $dcolumn .= ui_span_row();

            $dcolumn .= ui_span_row('row mrow mrow-container');
            my $subject = simplify_subject($m->{'header'}->{'subject'});
            $dcolumn .= ui_span_row('mrow mrow-subject') . $flag_reply .
              ($subject ? $subject : $text{'extensions_mail_header_no_subject'}) . ui_span_row();
            $dcolumn .= ui_span_row();

            my $preview;
            if ($userconfig{'show_body'}) {
                my $plen = $in{'show_body_len'} || $userconfig{'show_body_len'};
                parse_mail($m);
                my $preview_data = mail_preview($m, $plen);
                if ($preview_data) {
                    $preview = $preview_data;
                }
                $dcolumn .= ui_span_row('row brow brow-container');
                $dcolumn .= ui_span_row('brow brow-preview') . $preview . ui_span_row();
                $dcolumn .= ui_span_row();

            }

            $dcolumn .= ui_span_row();

            push(@dcolumn, $dcolumn);
            push(@cols,    @dcolumn);

            my @scolumn;
            my $scolumn;
            $scolumn = ui_span_row('srow srow-container');

            $flags_all .= $flags_dns;

            if ($folder->{'spam'}) {
                if ($m->{'header'}->{'x-spam-status'} =~ /(hits|score)=([0-9\.]+)/) {
                    $flags_all =
                      $flags_all . '<i data-toggle="tooltip" title="' . $text{'extensions_mail_flag_spam_score'} .
                      ': ' . $2 . '" class="fa fa-fw fa-spam text-danger spam"></i>';
                }
            }
            $scolumn .= ui_span_row('row trow trow-flags') . $flags_all . ui_span_row();
            $scolumn .=
              ui_span_row('row mrow mrow-date') . make_date($m->{'header'}->{'date'}, 1, -1) . ui_span_row();
            $scolumn .= ui_span_row('row brow brow-size') . nice_size($m->{'size'}, 1024) . ui_span_row();
            $scolumn .= ui_span_row();

            push(@scolumn, $scolumn);
            push(@cols,    @scolumn);

            # Detect IMAP deleted mail
            if ($m->{'deleted'}) {
                foreach my $c (@cols) {
                    $c = "<strike>$c</strike>";
                }
            }

            $list_mails .=
              ui_message_list_column(\@cols, \@rowtds, "d", $id, message_sender($m->{'header'}->{'to'}), editable_mail($m));

            update_delivery_notification($mail[$i], $folder);
        }
    }

    $list_mails .= ui_table_tbody_end();
    return $list_mails;
}

sub message_sender
{
    my ($message_header_addressee) = @_;
    my @sender_addresses = split_addresses($message_header_addressee);
    return $sender_addresses[0]->[0];
}

sub ui_message_list_column
{
    my ($cols, $tdtags, $checkname, $checkvalue, $sender, $editable) = @_;
    my $rv;

    $rv .= "<tr class='ui_checked_columns'>\n";
    $rv .= "<td class='" . ($editable ? 'ui_checked_checkbox' : undef) . "' " . $tdtags->[0] . ">";
    if ($editable) {
        $rv .= ui_checkbox($checkname, $checkvalue) . "";
    }
    $rv .= message_avatar($sender);
    $rv .= '</td>';

    my $i;
    for ($i = 0; $i < @$cols; $i++) {
        $rv .= "<td " . $tdtags->[$i + 1] . ">";
        if ($cols->[$i] !~ /<a\s+href|<input|<select|<textarea/) {
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

sub ui_icon
{
    my ($fa, $tt) = @_;
    if ($tt) {
        $tt = (index($tt, '</') != -1 ? $tt : $text{$tt});
        return "<i data-toggle=\"tooltip\" title=\"$tt\" class=\"fa fa-fw fa-$fa\"></i>";
    } elsif ($fa) {
        return "<i class='fa fa-fw fa-" . $fa . "'></i>";
    } else {
        return "<i class='fa fa-fw'></i>";
    }

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

sub ui_table_tbody_start
{
    return '<table class="table table-hover table-responsive"><tbody>';
}

sub ui_table_tbody_end
{
    return '</tbody></table>';
}

1;
