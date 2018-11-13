#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our ($remote_user, %theme_config, %theme_text);

require(dirname(__FILE__) . "/authentic-lib.pm");

$theme_config{'settings_show_theme_configuration_for_admins_only'} eq 'true' && error($theme_text{'settings_show_theme_configuration_for_admins_only_error'});

ui_print_header(($theme_text{'settings_subtitle'} . ' <tt>' . $remote_user . '</tt>'),
                $theme_text{'settings_title'},
                undef, undef, undef, 1);

print ui_form_start("save_config.cgi", "post", undef, 'id="settings_"');

print ui_table_start(
      ('<i class="fa fa-cogs vertical-align-text-middle"></i> ' . $theme_text{'settings_right_theme_configurable_options_title'}),
      undef, 2);

print ui_table_row(undef, '<b data-first-child>' . $theme_text{'settings_global_options_title'} . '</b>', 2);

print ui_table_row($theme_text{'settings_font_family'},
                   settings_get_select_font_family(
                                                   ($theme_config{'settings_font_family'} ne 'undefined' ?
                                                      $theme_config{'settings_font_family'} :
                                                      '0'
                                                   ),
                                                   'settings_font_family'
                   ));
print ui_table_row($theme_text{'settings_navigation_color'},
                   settings_get_select_navigation_color(
                                                        ($theme_config{'settings_navigation_color'} ne 'undefined' ?
                                                           $theme_config{'settings_navigation_color'} :
                                                           'blue'
                                                        ),
                                                        'settings_navigation_color'
                   ));
print ui_table_row($theme_text{'settings_cm_editor_palette'},
                   settings_get_select_editor_color(
                                                    ($theme_config{'settings_cm_editor_palette'} ne 'undefined' ?
                                                       $theme_config{'settings_cm_editor_palette'} :
                                                       'monokai'
                                                    ),
                                                    'settings_cm_editor_palette'
                   ));
print ui_table_row($theme_text{'settings_enable_container_offset'},
                   ui_yesno_radio('settings_enable_container_offset', $theme_config{'settings_enable_container_offset'},
                                  "true",                             "false"
                   ));
print ui_table_row($theme_text{'settings_contrast_mode'},
                   ui_yesno_radio('settings_contrast_mode', $theme_config{'settings_contrast_mode'}, "true", "false"));

print ui_table_row($theme_text{'settings_right_page_hide_persistent_vscroll'},
                   ui_yesno_radio('settings_right_page_hide_persistent_vscroll',
                                  $theme_config{'settings_right_page_hide_persistent_vscroll'},
                                  "true", "false"
                   ));
print ui_table_row($theme_text{'settings_mail_ui'},
                   ui_yesno_radio('settings_mail_ui', $theme_config{'settings_mail_ui'}, "true", "false"));
print ui_table_row(undef, '<b>' . $theme_text{'settings_right_navigation_menu_title'} . '</b>', 2);

print ui_table_row($theme_text{'settings_button_tooltip'},
                   ui_yesno_radio('settings_button_tooltip', $theme_config{'settings_button_tooltip'}, "true", "false"));
print ui_table_row($theme_text{'settings_hide_top_loader'},
                   ui_yesno_radio('settings_hide_top_loader', $theme_config{'settings_hide_top_loader'}, "true", "false"));
print ui_table_row($theme_text{'settings_animation_left'},
                   ui_yesno_radio('settings_animation_left', $theme_config{'settings_animation_left'}, "true", "false"));
print ui_table_row($theme_text{'settings_animation_tabs'},
                   ui_yesno_radio('settings_animation_tabs', $theme_config{'settings_animation_tabs'}, "true", "false"));
if (dashboard_switch() ne '1') {
    print ui_table_row($theme_text{'settings_sysinfo_link_mini'},
                       ui_yesno_radio('settings_sysinfo_link_mini', $theme_config{'settings_sysinfo_link_mini'},
                                      "true",                       "false"
                       ));
}
print ui_table_row($theme_text{'settings_show_night_mode_link'},
                   ui_yesno_radio('settings_show_night_mode_link', $theme_config{'settings_show_night_mode_link'},
                                  "true",                          "false"
                   ));
print ui_table_row($theme_text{'settings_theme_options_button'},
                   ui_yesno_radio('settings_theme_options_button', $theme_config{'settings_theme_options_button'},
                                  "true",                          "false"
                   ));
print ui_table_row($theme_text{'settings_leftmenu_button_refresh'},
                   ui_yesno_radio('settings_leftmenu_button_refresh', $theme_config{'settings_leftmenu_button_refresh'},
                                  "true",                             "false"
                   ));

print ui_table_row(undef, '<b>' . $theme_text{'settings_right_hotkey_options_title'} . '</b>', 2);
print ui_table_row($theme_text{'settings_hotkeys_active'},
                   ui_yesno_radio('settings_hotkeys_active', $theme_config{'settings_hotkeys_active'}, "true", "false"));

print ui_table_end();

print ui_hidden();

print ui_form_end([['save_user', $theme_text{'save'}]]);

ui_print_footer();
