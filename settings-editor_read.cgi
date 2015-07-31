#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&init_config();
&ReadParse();
%text = &load_language($current_theme);
&switch_to_remote_user();

my @files = (
    $config_directory . '/authentic-theme/styles.css',
    $config_directory . '/authentic-theme/scripts.js'
);
$in{'file'} = $files[0] if ( !$in{'file'} );
&ui_print_header( $in{'file'}, $text{'settings_right_theme_extensions_title'}, undef );
print '' . &text('settings_right_extensions_title') . '
            <p></p>';
print "<form>\n";
print '<div class="pull-right" style="margin-top: 10px;"><span class="badge label-default">' . ( index( $in{'file'}, '.css' ) > -1 ? 'CSS' : 'JS' ) . '</span></div>';
print "<input type=submit value='$text{'settings_right_file_edit'}'>\n";
print "<select name=\"file\" onchange=\"form.submit();\">\n";

foreach $f (@files) {
    printf "<option %s>%s</option>\n",
        $f eq $in{'file'} ? 'selected' : '', $f;
    $found++ if ( $f eq $in{'file'} );
}
print "</select></form>\n";

$data = &read_file_contents( $in{'file'} );
print &ui_form_start( "settings-editor_write.cgi", "form-data" );
print &ui_hidden( "file", $in{'file'} ), "\n";
print &ui_textarea( "data", $data, 20, 80, undef, undef,
    "style='width: 100%'" );
print '
	<table class="ui_form_end_buttons" style="width:100%">
		<tr>
			<td>
				<button class="btn btn-info file-editor-saved'
    . ( $in{'saved'} ne 1 && ' hidden' )
    . '" type="submit"
name="save" id="saved"><i class="fa fa-fw fa-check-square-o" style="margin-right:2px;"></i>'
    . $text{'settings_right_saved'}
    . ' </button>
				<button class="btn btn-success file-editor-save'
    . ( $in{'saved'} eq 1 && ' hidden' )
    . '" type="submit" name="save" id="save"><i class="fa fa-fw fa-floppy-o" style="margin-right:2px;"></i>'
    . $text{'save'}
    . ' </button>
			</td>
			<td style="text-align: right;">
				<a class="btn btn-default" style="margin-top: 2px !important; margin-bottom: 2px !important; margin-right:-8px;" href="/settings-upload.cgi"><i class="fa fa-fw fa-file-image-o"> </i> '
            . &text('settings_right_theme_logos') . '</a>
			</td>
		</tr>
	</table>
</form>';
&ui_print_footer( "/webmin/edit_themes.cgi", $text{'error_previous'} );

