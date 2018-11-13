#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%module_text_full,  %theme_text,  %theme_config,   %gconfig, %tconfig,
     $current_lang_info, $remote_user, $get_user_level, $webmin_script_type);

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
    return "<span class=\"awcheckbox awobject\"><input class=\"iawobject\" type=\"checkbox\" " .
      "name=\"" . &quote_escape($name) .
      "\" " . "value=\"" . &quote_escape($value) . "\" " . ($sel ? " checked" : "") . ($dis ? " disabled=true" : "") .
      " id=\"" . &quote_escape("${name}_${value}_${rand}") . "\"" . ($tags ? " " . $tags : "") .
      "> " . '<label class="lawobject" for="' . &quote_escape("${name}_${value}_${rand}") . '">' .
      (length trim($label) ? trim($label) : '&nbsp;') . '</label></span>' . $after;
}

sub theme_make_date_local
{
    my ($s, $o, $f) = @_;
    my $t = "x-md";
    my $d = "<$t-d>$s";
    ($d .= (string_starts_with($f, 'yyyy') ? ";2" : (string_contains($f, 'mon') ? ";1" : ($f == -1 ? ";-1" : ";0"))) .
     "</$t-d>");
    (!$o && ($d .= " <$t-t>$s</$t-t>"));
    return ($main::webmin_script_type eq 'web' ? $d : strftime("%c (%Z %z)", localtime($s)));
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
        $s{$key} .= $theme_text{$key};
    }

    return convert_to_json(\%s);

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
    my ($wv, $uv, $vv, $cv, $fv, $d) =
      ('1.890', '1.740', '6.03', '9.3', '12.06', $tconfig{'show_beta_updates'});

    if (($p eq "w" && $v < $wv) ||
        ($p eq "u" && $v < $uv) ||
        ($p eq "v" && $v < $vv) ||
        ($p eq "c" && $v < $cv) ||
        ($p eq "f" && $v < $fv))
    {
        return (($d eq '1' || ($d ne '1' && $p eq "f")) ?
                  '<span data-toggle="tooltip" data-placement="auto top" data-title="' .
                  $theme_text{'theme_xhred_global_outdated'} .
                  '" class="bg-danger text-danger pd-lf-2 pd-rt-2 br-2">' . $v . '</span>' :
                  $v);
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
    my ($string, $search) = @_;
    if ($string =~ m/^\Q$search/) {
        return 1;
    } else {
        return 0;
    }
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
           ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
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
            (!$theme_config{'settings_right_default_tab_usermin'} ||
               $theme_config{'settings_right_default_tab_usermin'} =~ /mail/
            ) ? 1 : 0);
}

1;
