#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($Atext{'theme_error_access_not_root'});

my @files = ($config_directory . "/$current_theme/styles.css",
             $config_directory . "/$current_theme/scripts.js",
             $config_directory . "/$current_theme/scripts.pm",
             $config_directory . "/$current_theme/favorites.json",
             $config_directory . "/$current_theme/custom-lang");
$in{'file'} = $files[0] if (!$in{'file'});
&ui_print_header(undef, $Atext{'settings_right_theme_extensions_title'}, undef, undef, undef, 1);
print '' . &Atext('settings_right_extensions_title') . '
            <p></p>';
print "<form action=\"settings-editor_read.cgi\" method=\"get\" class=\"margined-bottom-3\">\n";
print '<div class="pull-right" style="margin-top: 15px; margin-right: 24px;"><span class="badge label-default">'
  .
  ( $in{'file'} =~ /.css/    ? $Atext{'theme_fileformat_css'} :
      $in{'file'} =~ /.json/ ? $Atext{'theme_fileformat_json'} :
      $in{'file'} =~ /.js/   ? $Atext{'theme_fileformat_js'} :
      $in{'file'} =~ /.pm/   ? $Atext{'theme_fileformat_perl'} :
      $Atext{'theme_fileformat_plain_text'}
  ) .
  '</span></div>';
print "<input type=submit value='$Atext{'settings_right_file_edit'}'>\n";
print "<select name=\"file\">\n";

foreach $f (@files) {
    printf "<option %s>%s</option>\n", $f eq $in{'file'} ? 'selected' : '', $f;
    $found++ if ($f eq $in{'file'});
}
print "</select></form>\n";

$data = &read_file_contents($in{'file'});

print &ui_form_start("settings-editor_write.cgi", "form-data");
print &ui_hidden("file", $in{'file'}), "\n";
print &ui_textarea("data",
                   ($in{'file'} =~ '.json' ? ($data =~ /\{(?:\{.*\}|[^{])*\}/sg) :
                      $data
                   ),
                   20, 80, undef, undef,
                   "style='width: 100%' "
                     .
                     ( $in{'file'} =~ '.pm' ? 'placeholder="' . $Atext{'theme_fileformat_perl_placeholder'} . '"' :
                         ''
                     ) .
                     "");
print &ui_form_end([["save", $text{'save'}]]);
&ui_print_footer("webmin/edit_themes.cgi", $Atext{'right_return_theme_options'});
