#!/usr/bin/perl

#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

do "authentic-theme/authentic-lib.pm";

!foreign_available("webmin") && error( $Atext{'theme_error_access_not_root'} );

&ui_print_header( $in{'file'}, $Atext{'settings_right_theme_logos_title'}, undef, undef, undef, 1 );

print '' . &Atext('settings_right_logos_title') . '
            <p></p>';
print &ui_form_start( "settings-upload_save.cgi", "form-data" );
print &ui_hidden( "path", $config_directory ), "\n";
print '
<div class="table-responsive">
    <table class="table table-striped table-condensed table-subtable">
        <thead><tr><th class="table-title" style="width: auto"><b>'
  . $Atext{'settings_right_options'}
  . '</b></th></tr></thead>
        <tbody>
            <tr>
                <td>
                    <table class="sub_table_container table-hardcoded" width="100%">
                        <tbody>
                            <tr class="atshover">
                                <td class="col_label" style="width:25%"><b>'
  . $Atext{'settings_right_logo_authenticated_users'}
  . '</b></td>
                                <td class="col_value" style="width:15%">'
  . ui_yesno_radio( "authenticated_logo", ( -r $config_directory . "/authentic-theme/logo.png" ? "1" : "0" ),
                    "1", "0" )
  . '</td>
                                <td class="col_value" style="width:60%">
                                    <button class="btn btn-default file_chooser_button file_chooser_button_preview'
  . ( !-r $root_directory . "/authentic-theme/images/logo.png" && ' disabled' )
  . '" style="display: inline; width: 40px; height: 28px; margin-right: 0px !important; margin-top: 2px !important; margin-left: 3px;" type="button"'
  . ( -r $root_directory . "/authentic-theme/images/logo.png"
      && ' data-image="' . $gconfig{'webprefix'} . '/images/logo.png?' . time() . '"' )
  . '>
                                        <i class="fa fa-fw fa-eye text-muted" style="font-size: 11px; pointer-events: none; margin-top: -1px;"></i>
                                    </button>
                                    <input style="margin: 4px 0;" class="ui_upload'
  . ( !-r $config_directory . '/authentic-theme/logo.png' && ' disabled' )
  . '" type=file name="authenticated_logo_file" accept=".png" size="40" >

                                </td>
                            </tr>
                            <tr class="atshover">
                                <td class="col_label" style="width:25%"><b>'
  . $Atext{'settings_right_logo_unauthenticated_users'}
  . '</b></td>
                                <td class="col_value" style="width:15%">'
  . ui_yesno_radio( "unauthenticated_logo",
                    ( -r $config_directory . "/authentic-theme/logo_welcome.png" ? "1" : "0" ),
                    "1", "0" )
  . '</td>
                                <td class="col_value" style="width:60%">
                                    <button class="btn btn-default file_chooser_button file_chooser_button_preview'
  . ( !-r $root_directory . "/authentic-theme/images/logo_welcome.png" && ' disabled' )
  . '" style="display: inline; width: 40px; height: 28px; margin-right: 0px !important; margin-top: 2px !important; margin-left: 3px;" type="button"'
  . ( -r $root_directory . "/authentic-theme/images/logo_welcome.png"
      && ' data-image="' . $gconfig{'webprefix'} . '/images/logo_welcome.png?' . time() . '"' )
  . '>
                                        <i class="fa fa-fw fa-eye text-muted" style="font-size: 11px; pointer-events: none; margin-top: -1px;"></i>
                                    </button>
                                    <input style="margin: 4px 0;" class="ui_upload'
  . ( !-r $config_directory . '/authentic-theme/logo_welcome.png' && ' disabled' )
  . '" type=file name="unauthenticated_logo_file" accept=".png" size="40">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    <table class="ui_form_end_buttons" style="width: 100%; margin-top: -11px;">
        <tr>
            <td>
                <button class="btn btn-info file-editor-saved'
  . ( $in{'saved'} ne 1 && ' hidden' )
  . '" type="submit" name="save" id="saved"><i class="fa fa-fw fa-check-square-o" style="margin-right:2px;"></i>'
  . $Atext{'settings_right_saved'}
  . ' </button>
                <button class="btn btn-success file-editor-save page_footer_ajax_submit'
  . ( $in{'saved'} eq 1 && ' hidden' )
  . '" type="submit" name="save" id="save"><i class="fa fa-fw fa-floppy-o" style="margin-right:2px;"></i>'
  . $text{'save'}
  . ' </button>
            </td>
            <td style="text-align: right;">
                <a class="btn btn-default page_footer_ajax_submit" style="margin-top: 2px !important; margin-bottom: 2px !important; margin-right:-3px;" href="'
  . $gconfig{'webprefix'}
  . '/settings-editor_read.cgi"><i class="fa fa-fw fa-file-code-o"> </i> '
  . &Atext('settings_right_theme_extensions') . '
                </a>
            </td>
        </tr>
    </table>
</form>';
&ui_print_footer( "webmin/edit_themes.cgi", $Atext{'right_return_theme_options'} );
