#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, $current_theme, $config_directory, $get_user_level, $remote_user, %theme_text);

do("$ENV{'THEME_ROOT'}/authentic-lib.pl");

&webmin_user_is_admin() ||
  &error($theme_text{'theme_error_access_not_root_user'});
if ($in{'file'}) {
  &is_under_directory("$config_directory/$current_theme", $in{'file'}) ||
    &error($theme_text{'theme_error_access_dir_not_allowed'});
}
my @files = ($config_directory . "/$current_theme/styles.css",
             $config_directory . "/$current_theme/scripts.js",
             $config_directory . "/$current_theme/scripts.pl",
             $config_directory . "/$current_theme/favorites-$remote_user.json",
             $config_directory . "/$current_theme/custom-lang");
my $file = html_escape($in{'file'});
$file = $files[0] if (!$file);
&ui_print_header(undef, $theme_text{'settings_right_theme_extensions_title'}, undef, undef, undef, 1);
print '' . &theme_text('settings_right_extensions_title') . '
            <p></p>';
print "<form action=\"settings-editor_read.cgi\" method=\"get\" class=\"margined-bottom-3\">\n";
print '<div class="pull-right" style="margin-top: 15px; margin-right: 24px;"><span class="badge label-default">'
  .
  ( $file =~ /.css/    ? $theme_text{'theme_fileformat_css'} :
      $file =~ /.json/ ? $theme_text{'theme_fileformat_json'} :
      $file =~ /.js/   ? $theme_text{'theme_fileformat_js'} :
      $file =~ /.pl/   ? $theme_text{'theme_fileformat_perl'} :
      $theme_text{'theme_fileformat_plain_text'}
  ) .
  '</span></div>';
print "<input type=submit value='$theme_text{'settings_right_file_edit'}'>\n";
print "<select name=\"file\">\n";

foreach my $f (@files) {
    printf "<option %s>%s</option>\n", $f eq $file ? 'selected' : '', $f;
}
print "</select></form>\n";

my $data = &read_file_contents($file);

print &ui_form_start("settings-editor_write.cgi", "form-data");
print &ui_hidden("file", $file), "\n";
print &ui_textarea("data",
                   ($file =~ '.json' ? ($data =~ /\{(?:\{.*\}|[^{])*\}/sg) :
                      $data
                   ),
                   20, 80, undef, undef,
                   "style='width: 100%' "
                     .
                     ( $file =~ '.pl' ? 'placeholder="' . $theme_text{'theme_fileformat_perl_placeholder'} . '"' :
                         ''
                     ) .
                     "");
print &ui_form_end([["save", $theme_text{'theme_xhred_global_save'}]]);
&ui_print_footer("tconfig.cgi", $theme_text{'right_return_theme_options'});
