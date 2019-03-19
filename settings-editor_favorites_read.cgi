#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, $current_theme, $config_directory, $remote_user, %theme_text);

require(dirname(__FILE__) . "/authentic-lib.pm");

my $file = $config_directory . "/$current_theme/favorites-$remote_user.json";
my $data = &read_file_contents($file);
($data =~ /\{(?:\{.*\}|[^{])*\}/sg);

&ui_print_header(undef, $theme_text{'left_favorites_edit'}, undef, undef, undef, 1);
print '' . &theme_text('left_favorites_edit_desc') . '<p></p>';
print &ui_form_start("settings-editor_favorites_write.cgi", "form-data");
print &ui_textarea("data", $data, 20, 80, undef, undef);
print &ui_form_end([["save", $theme_text{'theme_xhred_global_save'}]]);
&ui_print_footer();
