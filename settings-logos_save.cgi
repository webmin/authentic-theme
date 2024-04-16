#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, $current_theme, $config_directory, $get_user_level, %theme_text, $has_usermin, $has_usermin_conf_dir);

do($ENV{'THEME_ROOT'} . "/authentic-lib.pl");

&webmin_user_is_admin() ||
  &error($theme_text{'theme_error_access_not_root_user'});

theme_make_config_dir();

my $ls = "logo.png";
my $lr = "/$current_theme/$ls";

my $lsw = "logo_welcome.png";
my $lw  = "/$current_theme/$lsw";

my $logo_auth = $in{'authenticated_logo'};
my $logo_unauth = $in{'unauthenticated_logo'};
my $data_logo_auth = $in{'authenticated_logo_file'};
my $data_logo_unauth = $in{'unauthenticated_logo_file'};

# Check if the uploaded file is an actual image
if (($logo_auth eq "1" || $logo_unauth eq "1") &&
     has_command('file')) {
    foreach my $img ($data_logo_auth, $data_logo_unauth) {
        if ($img) {
            my $img_tmp_file = &transname();
            write_file_contents($img_tmp_file, $img);
            my $out = backquote_command("file --brief --mime-type ".quotemeta($img_tmp_file), 1);
            if ($out !~ /^image\//) {
                &error($theme_text{'settings_right_logos_error'} . " : " . html_escape($out));
            }
        }
    }
}

if ($logo_auth eq "1" && length $data_logo_auth) {
    unlink_file($config_directory . $lr);
    write_file_contents($config_directory . $lr, $data_logo_auth);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lr);
        write_file_contents($has_usermin_conf_dir . $lr, $data_logo_auth);
    }
} elsif ($logo_auth ne "1") {
    unlink_file($config_directory . $lr);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lr);
    }
}

if ($logo_unauth eq "1" && length $data_logo_unauth) {
    unlink_file($config_directory . $lw);
    write_file_contents($config_directory . $lw, $data_logo_unauth);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
        write_file_contents($has_usermin_conf_dir . $lw, $data_logo_unauth);
    }
} elsif ($logo_unauth ne "1") {
    unlink_file($config_directory . $lw);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
    }
}

redirect("settings-logos.cgi?saved=1");
