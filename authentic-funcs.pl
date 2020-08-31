#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in,
     %text,
     %module_text_full,
     %theme_text,
     %theme_config,
     %gconfig,
     $current_lang_info,
     $root_directory,
     $remote_user,
     $get_user_level);

sub settings
{
    my ($f, $e) = @_;
    my %c;
    if (-r $f) {
        my $k = read_file_contents($f);
        my %k = $k =~ /(.*?)=(.*)/g;
        delete @k{ grep(!/^$e/, keys %k) };
        foreach my $s (keys %k) {
            $k{$s} =~ s/^[^']*\K'|'(?=[^']*$)|;(?=[^;]*$)//g;
            $k{$s} =~ s/\\'/'/g;
            $c{$s} .= $k{$s};
        }
        return %c;
    } else {
        return %c;
    }
}

sub theme_ui_checkbox_local
{
    my ($name, $value, $label, $sel, $tags, $dis) = @_;
    my $after;
    my $rand = int rand(1e4);
    if ($label =~ /^([^<]*)(<[\000-\377]*)$/) {
        $label = $1;
        $after = $2;
    }
    $label = trim($label);
    my $bl = string_ends_with($label, '<br>') ? ' ds-bl-fs' : undef;
    return "<span class=\"awcheckbox awobject$bl\"><input class=\"iawobject\" type=\"checkbox\" " .
      "name=\"" . &quote_escape($name) .
      "\" " . "value=\"" . &quote_escape($value) . "\" " . ($sel ? " checked" : "") . ($dis ? " disabled=true" : "") .
      " id=\"" . &quote_escape("${name}_${value}_${rand}") . "\"" . ($tags ? " " . $tags : "") .
      "> " . '<label class="lawobject" for="' . &quote_escape("${name}_${value}_${rand}") . '">' .
      (length $label ? $label : '&nbsp;') . '</label></span>' . $after;
}

sub theme_make_date_local
{
    if (
        (
         (get_env('script_name') =~ /disable_domain/ ||
          $main::webmin_script_type ne 'web' ||
          ($main::header_content_type ne "text/html" &&
              $main::header_content_type ne "application/json")
         ) &&
         !$main::theme_allow_make_date
        ) ||
        $theme_config{'settings_theme_make_date'} eq 'false')
    {
        $main::theme_prevent_make_date = 1;
        return &make_date(@_);
    }
    my ($s, $o, $f) = @_;
    my $t = "x-md";
    my $d = "<$t-d>$s";
    ($d .= (string_starts_with($f, 'yyyy') ? ";2" : (string_contains($f, 'mon') ? ";1" : ($f == -1 ? ";-1" : ";0"))) .
     "</$t-d>");
    (!$o && ($d .= " <$t-t>$s</$t-t>"));
    return $d;
}

sub theme_nice_size_local
{
    my ($bytes, $minimal, $decimal) = @_;

    my ($decimal_units, $binary_units) = (1000, 1024);
    my $bytes_initial = $bytes;
    my $unit          = $decimal ? $decimal_units : $binary_units;

    my $label = sub {
        my ($item) = @_;
        my $text   = 'theme_xhred_nice_size_';
        my $unit   = ($unit > $decimal_units ? 'I' : undef);
        my @labels = ($theme_text{"${text}b"},
                      $theme_text{"${text}k${unit}B"},
                      $theme_text{"${text}M${unit}B"},
                      $theme_text{"${text}G${unit}B"},
                      $theme_text{"${text}T${unit}B"},
                      $theme_text{"${text}P${unit}B"});
        return $labels[$item - 1];
    };
    my $allowed = sub {
        my ($item) = @_;
        return $minimal >= $unit && $minimal >= ($unit**$item);
    };

    my $do = sub {
        my ($bytes) = @_;
        return abs($bytes) >= $unit;
    };

    my $item = 1;
    if (&$do($bytes)) {
        do {
            $bytes /= $unit;
            ++$item;
        } while ((&$do($bytes) || &$allowed($item)) && $item <= 5);
    } elsif (&$allowed($item)) {
        $item  = int(log($minimal) / log($unit)) + 1;
        $bytes = $item == 2 ? $bytes / (defined($unit) ? $unit : $item) : 0;
    }

    my $factor    = 10**2;
    my $formatted = int($bytes * $factor) / $factor;

    if ($minimal == -1) {
        return $formatted . " " . &$label($item);
    }
    return '<span data-filesize-bytes="' . $bytes_initial . '">' . ($formatted . " " . &$label($item)) . '</span>';
}

sub nice_number
{
    my ($number, $delimiter) = @_;
    $delimiter = " " if (!$delimiter);
    $number =~ s/(\d)(?=(\d{3})+(\D|$))/$1$delimiter/g;
    return $number;
}

sub get_time_offset
{
    my $offset = backquote_command('date +"%z"');
    $offset =~ s/\n//;
    return $offset;
}

sub get_theme_language
{
    my %s;
    foreach my $key (keys %theme_text) {
        if ($key !~ /_xhred_/ &&
            $key !~ /body_/  &&
            $key !~ /right_/ &&
            $key !~ /_level_navigation/)
        {
            next;
        }
        $s{$key} = $theme_text{$key};
    }

    # Pass additional language strings
    my %xhred = ('vm', 'scripts_desc');
    foreach my $key (keys %xhred) {
        $s{ $key . "_" . $xhred{$key} } = $text{ $xhred{$key} } if ($text{ $xhred{$key} });
    }
    return convert_to_json(\%s);

}

sub get_gpg_keys
{
    my $gnupg  = 'gnupg';
    my $target = foreign_available($gnupg) ? $gnupg : get_product_name();
    my $gpglib = $root_directory . "/$target/gnupg-lib.pl";
    if (-r $gpglib) {
        do($gpglib);
        my %gpgconfig    = foreign_config($target);
        my $gpgpath      = $gpgconfig{'gpg'} || "gpg";
        my @keys_avoided = ('11F63C51', 'F9232D77', 'D9C821AB');
        my @keys         = list_keys_sorted();
        my @keys_secret  = sort {lc($a->{'name'}->[0]) cmp lc($b->{'name'}->[0])} list_secret_keys();
        my %keys_;
        my %keys_secret_;

        foreach my $k (@keys) {
            my $key  = substr($k->{'key'}, -8, 8);
            my $name = $k->{'name'}->[0];
            $name =~ s/\(.*?\)//gs;
            if ($_[0] || (!$_[0] && !grep(/^$key$/, @keys_avoided))) {
                $keys_{ $k->{'key'} } = trim($name) . " ($k->{'email'}->[0] [$key/$k->{'size'}, $k->{'date'}])";
            }
        }
        foreach my $k (@keys_secret) {
            my $key  = substr($k->{'key'}, -8, 8);
            my $name = $k->{'name'}->[0];
            $name =~ s/\(.*?\)//gs;
            if ($_[0] || (!$_[0] && !grep(/^$k->{'key'}$/, @keys_avoided))) {
                $keys_secret_{ $k->{'key'} } =
                  trim($name) . " ($k->{'email'}->[0] [$key/$k->{'size'}, $k->{'date'}])";
            }
        }
        return (\%keys_, \%keys_secret_, $gpgpath);
    }
}

sub switch_to_unix_user_local
{
    if (!supports_users()) {
        return undef;
    }
    my ($username) = @_;
    if (!$username) {
        $username = $in{'username'} || $in{'switch_to_username'};
    }
    my @uinfo = getpwnam($username);
    if (@uinfo) {
        switch_to_unix_user(\@uinfo);
    }
}

sub get_text_ltr
{
    if ($current_lang_info && $current_lang_info->{'rtl'} eq "1") {
        return 0;
    } else {
        return 1;
    }
}

sub reverse_string
{
    my ($str, $delimiter) = @_;
    my @strings = reverse(split(/\Q$delimiter\E/, $str));
    return join(" " . $delimiter . " ", @strings);
}

sub ltrim
{
    my $s = shift;
    $s =~ s/^\s+//;
    return $s;
}

sub rtrim
{
    my $s = shift;
    $s =~ s/\s+$//;
    return $s;
}

sub trim
{
    my $s = shift;
    $s =~ s/^\s+|\s+$//g;
    return $s;
}

sub replace
{
    my ($from, $to, $string) = @_;
    $string =~ s/\Q$from\E/$to/ig;

    return $string;
}

sub replace_meta
{
    my ($string) = @_;

    my $hostname   = &get_display_hostname();
    my $version    = &get_webmin_version();
    my $os_type    = $gconfig{'real_os_type'} || $gconfig{'os_type'};
    my $os_version = $gconfig{'real_os_version'} || $gconfig{'os_version'};
    $string =~ s/%HOSTNAME%/$hostname/g;
    $string =~ s/%VERSION%/$version/g;
    $string =~ s/%USER%/$remote_user/g;
    $string =~ s/%OS%/$os_type $os_version/g;

    return $string;
}

sub product_version_update
{
    my ($v, $p) = @_;
    my ($wv, $uv, $vv, $cv, $fv) = ('1.941', '1.791', '6.08', '9.4', '14.01');

    if (($p eq "w" && $v < $wv) ||
        ($p eq "u" && $v < $uv) ||
        ($p eq "v" && $v < $vv) ||
        ($p eq "c" && $v < $cv) ||
        ($p eq "f" && $v < $fv))
    {
        return '<span data-toggle="tooltip" data-placement="auto top" data-title="' .
          $theme_text{'theme_xhred_global_outdated'} .
          '" class="bg-danger text-danger pd-lf-2 pd-rt-2 br-2">' . $v . '</span>';
    } else {
        return $v;
    }
}

sub string_contains
{
    return (index($_[0], $_[1]) != -1);
}

sub string_starts_with
{
    return substr($_[0], 0, length($_[1])) eq $_[1];
}

sub string_ends_with
{
    my $length = length($_[1]);
    return substr($_[0], -$length, $length) eq $_[1];
}

sub array_contains
{
    my ($array_reference, $search, $loose) = @_;
    return (!$loose ? (grep {$_ eq $search} @$array_reference) : (grep {index($_, $search) != -1} @$array_reference));
}

sub array_unique
{
    my @unique;
    my %seen;

    foreach my $value (@_) {
        if (!$seen{$value}++) {
            $value =~ tr/\r\n//d;
            push @unique, $value;
        }
    }
    return @unique;
}

sub get_before_delimiter
{
    my ($v, $d) = @_;

    $v =~ /^(.*)\Q$d\E/;
    return ($1 ? $1 : $v);
}

sub get_chooser_button_template
{
    my ($onclick, $icon) = @_;
    return
"<button class='btn btn-default chooser_button' type=button onClick='ifield = form.$_[0]; chooser = window.open(\"$gconfig{'webprefix'}/$onclick, \"chooser\"); chooser.ifield = ifield; window.ifield = ifield'>
  <i class=\"fa $icon vertical-align-middle\"></i>
 </button>\n";
}

sub directory_empty
{
    if (-e $_[0] && -d $_[0]) {
        opendir my $dir, $_[0] or die $!;
        if (grep !/^\.\.?$/, readdir $dir) {
            return 0;
        } else {
            return 1;
        }
    }
    return -1;
}

sub hash_to_query
{
    my ($c, %h) = @_;
    return $c . join(q{&}, map {qq{$_=@{[urlize($h{$_})]}}} keys %h);
}

sub head
{
    print "Content-type: text/html\n\n";
}

sub module_text_full
{
    if (!%module_text_full) {
        %module_text_full = load_language(get_module_name());
    }
    return %module_text_full;
}

sub is_switch_webmin
{
    return (
        ((($theme_config{'settings_right_default_tab_webmin'} eq '/' && get_product_name() eq 'webmin')) ||
           (($theme_config{'settings_right_default_tab_usermin'} eq '/' || !foreign_available("mailbox")) &&
             get_product_name() eq 'usermin') ||
           ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/ && $get_user_level eq '4') ||
           ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/   &&
             ($get_user_level eq '1' || $get_user_level eq '2'))
           ||
           ( $get_user_level ne '3' &&
             (   (!foreign_available("virtual-server") && !$theme_config{'settings_right_default_tab_webmin'}) ||
                 (!foreign_available("virtual-server") && $theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/)
                 ||
                 (!foreign_available("server-manager") &&
                     $theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/))
           )
        ) ? 1 : 0);
}

sub is_switch_virtualmin
{
    return (
            (
             (($get_user_level eq '2' && get_webmin_switch_mode() ne '1') ||
                !$theme_config{'settings_right_default_tab_webmin'} ||
                ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/)
             ) &&
               $get_user_level ne '4'
            ) ? 1 : 0);
}

sub is_switch_cloudmin
{
    return ((!$theme_config{'settings_right_default_tab_webmin'} && $get_user_level eq '4') ||
            ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/) ? 1 : 0);
}

sub is_switch_webmail
{
    return (
            (
             !get_theme_temp_data('goto', 1) && (!$theme_config{'settings_right_default_tab_usermin'} ||
                                                 $theme_config{'settings_right_default_tab_usermin'} =~ /mail/)
            ) ? 1 : 0);
}

sub strip_html
{
    my ($string) = @_;
    $string =~ s|<.+?>||g;
    return $string;
}

sub format_document_title
{
    my ($title_initial) = $_[0] =~ /(?|.*:\s+(.*)|(.*))/;
    my ($product, $os_type) = $title_initial =~ /(?|(.*\d+).*(\(.*)|(.*\d+))/;
    $os_type = undef if (length($os_type) < 4);
    my $title = ($os_type ? "$product $os_type" : $product);
    $title =~ s/\R//g;
    return $title;
}

sub current_kill_previous
{
    my ($keep) = @_;
    my $pid = current_running(1);
    if ($pid) {
        kill(9, $pid);
    }
    current_to_pid($keep);
}

sub current_to_filename
{
    my ($filename) = @_;
    my $salt       = substr(encode_base64($main::session_id), 0, 16);
    my $user       = $remote_user;

    $filename =~ s/(?|([\w-]+$)|([\w-]+)\.)//;
    $filename = $1;
    $filename =~ tr/A-Za-z0-9//cd;
    $user     =~ tr/A-Za-z0-9//cd;
    $salt     =~ tr/A-Za-z0-9//cd;
    return '.theme_' . $salt . '_' . get_product_name() . '_' . $user . '_' . "$filename.pid";
}

sub current_running
{
    my ($clean) = @_;
    my %pid;
    my $filename = tempname(current_to_filename($0));
    read_file($filename, \%pid);
    $clean && unlink_file($filename);
    return $pid{'pid'} || 0;
}

sub current_to_pid
{
    my ($keep) = @_;
    my $script = current_to_filename($0);

    my $tmp_file = ($keep ? tempname($script) : transname($script));
    my %pid      = (pid => $$);
    write_file($tmp_file, \%pid);
}

sub network_stats
{
    # Get network data from all interfaces
    my ($type) = @_;
    my $file = "/proc/net/dev";
    return () unless -r $file;
    open(my $dev, $file);
    my (@titles, %result);
    while (my $line = <$dev>) {
        chomp($line);
        if ($line =~ /^.{6}\|([^\\]+)\|([^\\]+)$/) {
            my ($rec, $trans) = ($1, $2);
            @titles = ((map {"r$_"} split(/\s+/, $rec)), (map {"t$_"} split(/\s+/, $trans)));
        } elsif ($line =~ /^\s*([^:]+):\s*(.*)$/) {
            my ($id, @data) = ($1, split(/\s+/, $2));
            $result{$id} = { map {$titles[$_] => $data[$_];} (0 .. $#titles) };
        }
    }
    close($dev);

    # Return current network I/O
    if ($type eq 'io') {
        my ($rbytes, $tbytes, $rbytes2, $tbytes2) = (0, 0, 0, 0);
        my @rs;
        my $results = \%result;

        # Parse current data
        foreach (%$results) {
            $rbytes += $results->{$_}->{'rbytes'};
            $tbytes += $results->{$_}->{'tbytes'};
        }

        # Wait for one second and fetch data over again
        sleep 1, $results = network_stats();

        # Parse data after dalay
        foreach (%$results) {
            $rbytes2 += $results->{$_}->{'rbytes'};
            $tbytes2 += $results->{$_}->{'tbytes'};
        }

        # Return current network I/O
        $rbytes = int($rbytes2 - $rbytes);
        $tbytes = int($tbytes2 - $tbytes);

        @rs = ($rbytes, $tbytes);
        return serialise_variable(\@rs);
    }
    return \%result;
}

sub acl_system_status
{
    my ($show) = @_;
    my %access = get_module_acl($remote_user, 'system-status');
    $access{'show'} ||= "";
    if ($access{'show'} eq '*') {
        return 1;
    } else {
        return indexof($show, split(/\s+/, $access{'show'})) >= 0;
    }
}

1;
