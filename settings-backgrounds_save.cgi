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

my $lsw = "background_content.png";
my $lw  = "/$current_theme/$lsw";

my $bg_unauth = $in{'unauthenticated_bg'};
my $data_bg_unauth = $in{'unauthenticated_bg_file'};

# Check if the uploaded file is an actual image
if ($bg_unauth eq "1" && has_command('file')) {
    if ($data_bg_unauth) {
        my $bg_tmp_file = &transname();
        write_file_contents($bg_tmp_file, $data_bg_unauth);
        my $out = backquote_command("file --brief --mime-type ".quotemeta($bg_tmp_file), 1);
        if ($out !~ /^image\//) {
            &error($theme_text{'settings_right_logos_error'} . " : " . html_escape($out));
        }
    }
}

if ($bg_unauth eq "1" && length $data_bg_unauth) {
    unlink_file($config_directory . $lw);
    write_file_contents($config_directory . $lw, $data_bg_unauth);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
        write_file_contents($has_usermin_conf_dir . $lw, $data_bg_unauth);
    }
} elsif ($bg_unauth ne "1") {
    unlink_file($config_directory . $lw);
    if ($has_usermin) {
        unlink_file($has_usermin_conf_dir . $lw);
    }
}

redirect("settings-backgrounds.cgi?saved=1");
