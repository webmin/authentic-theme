#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %gconfig, $current_theme, $config_directory, %theme_text);

require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($theme_text{'theme_error_access_not_root'});

&ui_print_header(html_escape($in{'file'}), $theme_text{'theme_xhred_settings_right_theme_bgs_title'}, undef, undef, undef, 1);

my $bg_content = $config_directory . "/$current_theme/background_content.png";

print '' . $theme_text{'settings_right_bgs_title'} . '
            <p></p>';
print &ui_form_start("settings-backgrounds_save.cgi", "form-data");
print '
<div class="table-responsive">
    <table class="table table-striped table-condensed table-subtable">
        <thead><tr><th class="table-title"><b>'
  . $theme_text{'theme_xhred_config_configurable_options'} . '</b></th></tr></thead>
        <tbody>
            <tr>
                <td>
                    <table class="sub_table_container table-hardcoded" width="100%">
                        <tbody>
                            <tr class="atshover">
                                <td class="col_label"><b>'
  . $theme_text{'settings_right_bg_unauthenticated_users'} . '</b></td>
                                <td class="col_value" >'
  . ui_yesno_radio("unauthenticated_bg", (-r $bg_content ? "1" : "0"), "1", "0") . '</td>
                                <td class="col_value">
                                    <button class="btn btn-default chooser_button file_chooser_button_preview'
  . (!-r $bg_content && ' disabled') . '" type="button"' . (-r $bg_content &&
        ' data-image-bg_content data-image="data:image/png;base64,' . encode_base64(read_file_contents($bg_content)) . '"') .
  '>
                                        <i class="fa fa-fw fa-eye text-muted"></i>
                                    </button>
                                    <input class="ui_upload'
  . (!-r $bg_content && ' disabled') . '" type=file name="unauthenticated_bg_file" accept=".png" size="40">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    <table class="ui_form_end_buttons" width="100%">
        <tr>
            <td>
                <button class="btn btn-info file-editor-saved'
  . ($in{'saved'} ne 1 && ' hidden') .
  '" type="submit" name="save" id="saved"><i class="fa fa-fw fa-check-square-o"></i> ' .
  $theme_text{'settings_right_saved'} . ' </button>
                <button class="btn btn-success file-editor-save page_footer_ajax_submit'
  . ($in{'saved'} eq 1 && ' hidden') . '" type="submit" name="save" id="save"><i class="fa fa-fw fa-floppy-o"></i> ' .
  $theme_text{'theme_xhred_global_save'} . ' </button>
            </td>
            <td align="right">
                <a class="btn btn-default page_footer_ajax_submit" href="'
  . $gconfig{'webprefix'} .
  '/settings-editor_read.cgi"><i class="fa fa-fw fa-file-code-o"> </i> ' . $theme_text{'settings_right_theme_extensions'} . '
                </a>
                <a class="btn btn-default page_footer_ajax_submit" href="'
  . $gconfig{'webprefix'} . '/settings-logos.cgi"><i class="fa fa-fw fa-file-image-o"> </i> ' .
  $theme_text{'theme_xhred_settings_right_theme_logos'} . '
                </a>
            </td>
        </tr>
    </table>
</form>';
&ui_print_footer("webmin/edit_themes.cgi", $theme_text{'right_return_theme_options'});
