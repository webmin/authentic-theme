#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . "/authentic-lib.pm");

ui_print_header(($Atext{'settings_subtitle'} . ' <tt>' . $remote_user . '</tt>'),
                $Atext{'settings_title'},
                undef, undef, undef, 1);

print ui_form_start("save_config.cgi", "post", undef, 'id="settings_"');

print ui_table_start(
      ('<i class="fa fa-cogs vertical-align-text-middle"></i> ' . $Atext{'settings_right_theme_configurable_options_title'}),
      undef, 2);

print ui_table_row(undef, '<b data-first-child>' . $Atext{'settings_global_options_title'} . '</b>', 2);

print ui_table_row($Atext{'settings_font_family'},
                   settings_get_select_font_family(
                                                   ($__settings{'settings_font_family'} ne 'undefined' ?
                                                      $__settings{'settings_font_family'} :
                                                      '0'
                                                   ),
                                                   'settings_font_family'
                   ));
print ui_table_row($Atext{'settings_navigation_color'},
                   settings_get_select_navigation_color(
                                                        ($__settings{'settings_navigation_color'} ne 'undefined' ?
                                                           $__settings{'settings_navigation_color'} :
                                                           'blue'
                                                        ),
                                                        'settings_navigation_color'
                   ));
print ui_table_row($Atext{'settings_cm_editor_palette'},
                   settings_get_select_editor_color(
                                                    ($__settings{'settings_cm_editor_palette'} ne 'undefined' ?
                                                       $__settings{'settings_cm_editor_palette'} :
                                                       'monokai'
                                                    ),
                                                    'settings_cm_editor_palette'
                   ));

print ui_table_row(undef, '<b>' . $Atext{'settings_right_navigation_menu_title'} . '</b>', 2);

print ui_table_row($Atext{'settings_button_tooltip'},
                   ui_yesno_radio('settings_button_tooltip', $__settings{'settings_button_tooltip'}, "true", "false"));
print ui_table_row($Atext{'settings_hide_top_loader'},
                   ui_yesno_radio('settings_hide_top_loader', $__settings{'settings_hide_top_loader'}, "true", "false"));
print ui_table_row($Atext{'settings_animation_left'},
                   ui_yesno_radio('settings_animation_left', $__settings{'settings_animation_left'}, "true", "false"));
print ui_table_row($Atext{'settings_animation_tabs'},
                   ui_yesno_radio('settings_animation_tabs', $__settings{'settings_animation_tabs'}, "true", "false"));
if (dashboard_switch() ne '1') {
    print ui_table_row($Atext{'settings_sysinfo_link_mini'},
                       ui_yesno_radio('settings_sysinfo_link_mini', $__settings{'settings_sysinfo_link_mini'},
                                      "true",                       "false"
                       ));
}
print ui_table_row($Atext{'settings_show_night_mode_link'},
                   ui_yesno_radio('settings_show_night_mode_link', $__settings{'settings_show_night_mode_link'},
                                  "true",                          "false"
                   ));
print ui_table_row($Atext{'settings_theme_options_button'},
                   ui_yesno_radio('settings_theme_options_button', $__settings{'settings_theme_options_button'},
                                  "true",                          "false"
                   ));
print ui_table_row($Atext{'settings_leftmenu_button_refresh'},
                   ui_yesno_radio('settings_leftmenu_button_refresh', $__settings{'settings_leftmenu_button_refresh'},
                                  "true",                             "false"
                   ));

print ui_table_row(undef, '<b>' . $Atext{'settings_right_hotkey_options_title'} . '</b>', 2);
print ui_table_row($Atext{'settings_hotkeys_active'},
                   ui_yesno_radio('settings_hotkeys_active', $__settings{'settings_hotkeys_active'}, "true", "false"));

print ui_table_end();

print ui_hidden('path', $path);

print ui_form_end([[save_user, $Atext{'save'}]]);

ui_print_footer();
