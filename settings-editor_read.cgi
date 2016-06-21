#!/usr/bin/perl

#
# Authentic Theme 18.03 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

do "authentic-theme/authentic-lib.pm";

my @files = (
    $config_directory . '/authentic-theme/styles.css',
    $config_directory . '/authentic-theme/scripts.js',
    $config_directory . '/authentic-theme/favorites.json',
    $config_directory . '/authentic-theme/custom-lang'
);
$in{'file'} = $files[0] if ( !$in{'file'} );
&ui_print_header( $in{'file'}, $text{'settings_right_theme_extensions_title'}, undef );
print '' . &text('settings_right_extensions_title') . '
            <p></p>';
print "<form class=\"margined-bottom-3\">\n";
print '<div class="pull-right" style="margin-top: 15px; margin-right: 24px;"><span class="badge label-default">'
    . (
      index( $in{'file'}, '.css' ) > -1 ? $text{'theme_fileformat_css'}
    : index( $in{'file'}, '.json' ) > -1 ? $text{'theme_fileformat_json'}
    : index( $in{'file'}, '.js' ) > -1   ? $text{'theme_fileformat_js'}
    :                                      $text{'theme_fileformat_plain_text'}
    ) . '</span></div>';
print "<input type=submit value='$text{'settings_right_file_edit'}'>\n";
print "<select name=\"file\" onchange=\"form.submit();\">\n";

foreach $f (@files) {
    printf "<option %s>%s</option>\n", $f eq $in{'file'} ? 'selected' : '', $f;
    $found++ if ( $f eq $in{'file'} );
}
print "</select></form>\n";

$data = &read_file_contents( $in{'file'} );

print &ui_form_start( "settings-editor_write.cgi", "form-data" );
print &ui_hidden( "file", $in{'file'} ), "\n";
print &ui_textarea(
    "data",
    (   index( $in{'file'}, '.json' ) > -1
        ? ( $data =~ /\{(?:\{.*\}|[^{])*\}/sg )
        : $data
    ),
    20, 80, undef, undef,
    "style='width: 100%'"
);
print &ui_form_end( [ [ "save", $text{'save'} ] ] );
&ui_print_footer( "webmin/edit_themes.cgi", $text{'right_return_theme_options'} );

