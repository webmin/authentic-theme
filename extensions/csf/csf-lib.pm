#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use Fcntl qw( :flock );

our (%gconfig, $current_theme, $config_directory, %theme_text, %theme_config);

my $csf_conf     = "/etc/csf";
my $csf_lib      = "/var/lib/csf";
my $header       = "csf.header";
my $body         = "csf.body";
my $footer       = "csf.footer";
my $htmltag      = "csf.htmltag";
my $bodytag      = "csf.bodytag";
my $csf_header   = "$csf_conf/$header";
my $csf_body     = "$csf_conf/$body";
my $csf_footer   = "$csf_conf/$footer";
my $csf_html_tag = "$csf_conf/$htmltag";
my $csf_body_tag = "$csf_conf/$bodytag";

sub csf_clear
{
    unlink_file($csf_header);
    unlink_file($csf_body);
    unlink_file($csf_footer);
    unlink_file($csf_html_tag);
    unlink_file($csf_body_tag);
}

sub csf_mod
{
    my $ext = (theme_debug_mode() ? 'src' : 'min');

    my $csf_header_mod  = "$config_directory/$current_theme/$header";
    my $csf_body_mod    = "$config_directory/$current_theme/$body";
    my $csf_footer_mod  = "$config_directory/$current_theme/$footer";
    my $csf_htmltag_mod = "$config_directory/$current_theme/$htmltag";
    my $csf_bodytag_mod = "$config_directory/$current_theme/$bodytag";

    open(my $fh, '>', $csf_header_mod) or die $!;

    print $fh '<link data-hostname="' . &get_display_hostname() . '" data-version="' .
      (theme_version(1)) . '" rel="shortcut icon" href="' . $gconfig{'webprefix'} . '/images/favicon-webmin.ico">' . "\n";
    print $fh '<link href="' .
      $gconfig{'webprefix'} . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    print $fh '<link href="' . $gconfig{'webprefix'} .
      '/unauthenticated/css/palettes/nightrider.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";

    if (!$theme_config{'settings_font_family'}) {
        print $fh '<link href="' . $gconfig{'webprefix'} .
          '/unauthenticated/css/fonts-roboto.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    } elsif ($theme_config{'settings_font_family'} != '1') {
        print $fh '<link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/font-' .
          $theme_config{'settings_font_family'} . '.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    }

    print $fh '<script src="' .
      $gconfig{'webprefix'} . '/unauthenticated/js/bundle.min.js?' . theme_version(1) . '"></script>' . "\n";

    print $fh '<link href="' .
      $gconfig{'webprefix'} . '/extensions/csf/csf.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    print $fh '<script src="' .
      $gconfig{'webprefix'} . '/extensions/csf/csf.' . $ext . '.js?' . theme_version(1) . '"></script>' . "\n";

    close $fh;

    open(my $fh2, '>', $csf_body_mod) or die $!;
    print $fh2 '<div class="container-fluid col-lg-10 col-lg-offset-1 csf-container" data-dcontainer="1">' . "\n";
    close $fh2;

    open(my $fh3, '>', $csf_footer_mod) or die $!;
    print $fh3 '</div><script>!$.support.spa && csf_init()</script>' . "\n";
    close $fh3;

    open(my $fh4, '>', $csf_htmltag_mod) or die $!;
    print $fh4 ' '
      .
      replace("\"", "'",
              header_html_data('csf', '1', ($theme_text{'theme_xhred_csf'} . " — " . get_html_framed_title(), 0, 0, '1')
              )
      ) .
      '';
    close $fh4;

    open(my $fh5, '>', $csf_bodytag_mod) or die $!;
    print $fh5 ' ' . replace("\"", "'", header_body_data('csf')) . '';
    close $fh5;

    if (-e $csf_conf && -d $csf_conf) {
        copy_source_dest($csf_header_mod,  $csf_conf);
        copy_source_dest($csf_body_mod,    $csf_conf);
        copy_source_dest($csf_footer_mod,  $csf_conf);
        copy_source_dest($csf_htmltag_mod, $csf_conf);
        copy_source_dest($csf_bodytag_mod, $csf_conf);
    }
    my $csf_ui   = uc('style' . '_' . 'custom');
    my $csf_conf = ("$csf_conf/csf.conf");

    if (-f $csf_conf && !-f "$config_directory/$current_theme/csf.ui-introduced") {
        (my $fc = read_file_contents($csf_conf)) =~ s/$csf_ui = "0"/$csf_ui = "1"/g;
        write_file_contents($csf_conf,                                            $fc);
        write_file_contents("$config_directory/$current_theme/csf.ui-introduced", "\n");
    }
}

sub csf_temporary_list
{
    my $let = "$csf_conf/csf.allow";
    my $ban = "$csf_conf/csf.deny";
    my $cnf = "$csf_conf/csf.conf";
    my $tmp = "$csf_lib/csf.tempban";
    my $log = "$csf_lib/stats/iptables_log";

    my @p;
    my @t;
    my @l;

    if (-e $cnf && !-z $cnf) {
        my @q;
        my $x = read_file_contents($let) . read_file_contents($ban);
        my $z = read_file_contents($cnf);
        (@p) = $z =~
/(?:TCP_IN|UDP_IN|TCP6_IN|UDP6_IN|PORTS_TCP|PORTS_UDP|CT_PORTS|CLUSTER_PORT|PORTS_webmin|PORTS_sshd).*=\s*"([\d+,]+)"/g;
        (@q) = $x =~ /^(?:(?!#).).*\|(?:d|s)=([\d+,]+)\|/gm;
        if (@p || @q) {
            @p = array_unique(split(",", join(",", (@p, @q))));
        }

    }

    if (-e $tmp && !-z $tmp) {
        open(my $IN, "<", $tmp) or die $!;
        @t = <$IN>;
        chomp @t;
        close($IN);
    }

    if (@t && -e $log) {
        open(my $IN, "<", $log) or die $!;
        flock($IN, LOCK_SH);
        my @i = <$IN>;
        close($IN);
        chomp @i;
        @i = reverse @i;
        my $c = 0;

        my $s = scalar @i;
        my @g;

        foreach my $h (reverse @t) {
            if ($h) {
                my ($a, $b, $d, $e, $f, $g) = split(/\|/, $h);
                my ($ll, $dl) = (undef, '|');
                for (my $x = 0; $x < $s; $x++) {
                    $c++;
                    my $u = $i[$x];
                    my ($o, $l) = split(/\|/, $u);
                    my ($r, $w, $k);
                    if ($l =~ /SRC=(\S+)/) {$r = $1}
                    if ($l =~ /DST=(\S+)/) {$w = $1}
                    if ($l =~ /DPT=(\d+)/) {$k = $1}
                    if (($r eq $b && array_contains(\@p, $k)) || $d =~ /\d/g || $g =~ /failed|\(CT\)/gi) {
                        $ll = ($a . $dl . $b . $dl . $w . $dl . $k . $dl . $d . $dl . $e . $dl . $f . $dl . $g);
                        if (!array_contains(\@g, $g) && !array_contains(\@l, $ll)) {
                            push @g, $g;
                            push @l, $ll;
                        }
                    }
                }
            }
        }
    }
    convert_to_json(\@l);
}

1;
