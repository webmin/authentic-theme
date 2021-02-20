#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%gconfig, %text, %theme_config, %theme_text, $has_usermin, $get_user_level);

sub theme_settings_raw
{
    return (
        [
         {  'id'    => 's1',
            'title' => &theme_text('settings_global_general_options_title'),
            'data'  => [
                'settings_right_default_tab_webmin',
                (foreign_available("virtual-server") ? 'virtualmin' : '/'),

                'settings_right_default_tab_usermin',
                'mail',

                'settings_webmin_default_module',
                get_goto_module(),

                'settings_right_virtualmin_default',
                'sysinfo.cgi',

                'settings_right_cloudmin_default',
                'sysinfo.cgi',

                'settings_right_reload',
                'true',

                'settings_document_title',
                '1',

                'settings_cm_editor_palette',
                'monokai',

                'settings_global_palette_unauthenticated',
                'light',
            ]
         }
        ],

        [
         {  'id'    => 's2',
            'title' => &theme_text('settings_right_sysinfo_page_options'),
            'data'  => [
                'settings_sysinfo_easypie_charts',
                'true',

                'settings_sysinfo_easypie_charts_size',
                '172',

                'settings_sysinfo_easypie_charts_width',
                '2',

                'settings_sysinfo_easypie_charts_scale',
                '8',

                'settings_sysinfo_hidden_panels_provisional',
                '',

                'settings_sysinfo_max_servers',
                '10',

                'settings_sysinfo_real_time_status',
                'true',

                'settings_sysinfo_real_time_status_disk',
                'true',

                'settings_sysinfo_real_time_stored',
                'true',

                'settings_sysinfo_real_time_stored_length',
                '600',
            ]
         }
        ],

        [
         {  'id'    => 's3',
            'title' => &theme_text('settings_right_navigation_menu_options'),
            'data'  => [

                'settings_navigation_color',
                'blue',

                'settings_grayscale_level_navigation',
                '0',

                'settings_sepia_level_navigation',
                '0',

                'settings_saturate_level_navigation',
                '1',

                'settings_hue_level_navigation',
                '0',

                'settings_invert_level_navigation',
                '0',

                'settings_brightness_level_navigation',
                '1',

                'settings_contrast_level_navigation',
                '1',

                'settings_navigation_always_collapse',
                'false',

                'settings_leftmenu_width',
                '260',

                'settings_switch_rdisplay',
                'false',

                'settings_leftmenu_section_hide_refresh_modules',
                'false',

                'settings_leftmenu_section_hide_unused_modules',
                'false',

                'settings_collapse_navigation_link',
                'true',

                'settings_sysinfo_link_mini',
                'false',

                'settings_show_night_mode_link',
                'true',

                'settings_show_terminal_link2',
                'true',

                'settings_favorites',
                'true',

                'settings_theme_options_button',
                'true',

                'settings_leftmenu_button_language',
                'false',

                'settings_leftmenu_button_refresh',
                'false',

                'settings_leftmenu_netdata',
                'true',

                'settings_leftmenu_netdata_link',
                'http://' . get_system_hostname() . ':19999',

                'settings_leftmenu_user_html',
                '',

                'settings_leftmenu_user_html_only_for_administrator',
                'false',

                'settings_leftmenu_custom_links',
                '',

            ]
         }
        ],

        [
         {  'id'    => 's4',
            'title' => &theme_text('settings_right_notification_slider_options'),
            'data'  => [
                'settings_side_slider_enabled',
                'true',

                'settings_side_slider_fixed',
                'false',

                'settings_side_slider_sysinfo_enabled',
                'true',

                'settings_side_slider_notifications_enabled',
                'true',

                'settings_side_slider_favorites_enabled',
                'true',
            ]
         }
        ],

        [
         {  'id'    => 's5',
            'title' => &theme_text('settings_right_table_options'),
            'data'  => [
                'settings_right_hide_table_icons',
                'false',

                'settings_right_small_table_icons',
                'false',

                'settings_right_animate_table_icons',
                'true',

                'settings_right_grayscaled_table_icons',
                'true',

                'settings_table_init_datatables',
                '20000',
            ]
         }
        ],

        [
         {  'id'    => 's6',
            'title' => &theme_text('settings_right_hotkey_options'),
            'data'  => [
                'settings_hotkeys_active',
                'true',

                'settings_hotkey_toggle_modifier',
                'altKey',

                'settings_hotkey_toggle_key_webmin',
                'w',

                'settings_hotkey_toggle_key_virtualmin',
                'v',

                'settings_hotkey_toggle_key_cloudmin',
                'c',

                'settings_hotkey_toggle_key_usermin',
                'u',

                'settings_hotkey_toggle_key_webmail',
                'm',

                'settings_hotkey_shell2',
                'k',

                'settings_hotkey_sysinfo',
                'i',

                'settings_hotkey_toggle_slider',
                'n',

                'settings_hotkey_favorites',
                'f',

                'settings_hotkey_focus_search',
                's',

                'settings_hotkey_reload',
                'r',

                'settings_hotkey_navigation',
                'a',

                'settings_hotkey_slider',
                'e',

                'settings_hotkey_toggle_key_night_mode',
                'l',
            ]
         }
        ],

        [
         {  'id'    => 's7',
            'title' => &theme_text('settings_right_hotkey_custom_options'),
            'desc'  => &theme_text('settings_right_hotkey_custom_options_description'),
            'data'  => [
                'settings_hotkey_custom_1',
                '',

                'settings_hotkey_custom_2',
                '',

                'settings_hotkey_custom_3',
                '',

                'settings_hotkey_custom_4',
                '',

                'settings_hotkey_custom_5',
                '',

                'settings_hotkey_custom_6',
                '',

                'settings_hotkey_custom_7',
                '',

                'settings_hotkey_custom_8',
                '',

                'settings_hotkey_custom_9',
                '',
            ]
         }
        ],

        [
         {  'id'    => 's8',
            'title' => &theme_text('settings_right_soft_updates_page_options'),
            'data'  => [
                'settings_sysinfo_theme_updates',
                'false',

                'settings_cache_interval',
                '86400',

                'settings_sysinfo_theme_updates_for_usermin',
                'true'
            ]
         }
        ]);
}

sub theme_settings_filter
{
    my @theme_settings_filter;

    # Exclude list of combined settings for UserminVirtualmin/Cloudmin
    if (!&foreign_available("server-manager") &&
        !foreign_available("virtual-server") &&
        !get_usermin_data("mailbox"))
    {
        push(@theme_settings_filter, 'settings_show_theme_configuration_for_admins_only');
    }

    # Exclude list of combined settings for Virtualmin/Cloudmin
    if (!&foreign_available("server-manager") &&
        !foreign_available("virtual-server"))
    {
        push(@theme_settings_filter, 'settings_right_default_tab_webmin', 'settings_right_reload');
    }

    # Exclude hidden panels if none
    if (!$theme_config{'settings_sysinfo_hidden_panels_provisional'}) {
        push(@theme_settings_filter, 'settings_sysinfo_hidden_panels_provisional');
    }

    # Exclude list of settings for Virtualmin
    if (!foreign_available("virtual-server")) {
        push(@theme_settings_filter,
             'settings_right_virtualmin_default',
             'settings_hotkey_toggle_key_virtualmin',
             'settings_sysinfo_max_servers');
    }

    # Exclude Cloudmin related options
    if (!&foreign_available("server-manager")) {
        push(@theme_settings_filter, 'settings_right_cloudmin_default', 'settings_hotkey_toggle_key_cloudmin');
    }

    # Exclude list of settings for Usermin
    if (!$has_usermin) {
        push(@theme_settings_filter, 'settings_hotkey_toggle_key_usermin', 'settings_sysinfo_theme_updates_for_usermin');
    }

    # Exclude list of settings for Webmail
    if (!get_usermin_data("mailbox")) {
        push(@theme_settings_filter, 'settings_hotkey_toggle_key_webmail', 'settings_right_default_tab_usermin');
    }

    # Exclude list of settings for ConfigServer Security & Firewall
    if (!&foreign_available("csf")) {
        push(@theme_settings_filter, 'settings_sysinfo_csf_updates');
    }

    # Exclude Netdata link and default address
    if (!has_command('netdata')) {
        push(@theme_settings_filter, 'settings_leftmenu_netdata', 'settings_leftmenu_netdata_link');
    }

    # Exclude Command Shell button if not available
    if (!foreign_available("shell")) {
        push(@theme_settings_filter, 'settings_show_terminal_link2');
    }

    # Limit to certain options for non privleged user
    if ($get_user_level ne '0') {
        push(@theme_settings_filter,
             'settings_hotkey_slider',
             'settings_hotkey_toggle_slider',
             'settings_global_palette_unauthenticated',
             'settings_sysinfo_easypie_charts',
             'settings_sysinfo_easypie_charts_size',
             'settings_sysinfo_easypie_charts_width',
             'settings_sysinfo_easypie_charts_scale',
             'settings_sysinfo_max_servers',
             'settings_sysinfo_real_time_status',
             'settings_sysinfo_real_time_status_disk',
             'settings_sysinfo_real_time_stored',
             'settings_sysinfo_real_time_stored_length',
             'settings_leftmenu_section_hide_refresh_modules',
             'settings_leftmenu_section_hide_unused_modules',
             'settings_leftmenu_netdata',
             'settings_leftmenu_netdata_link',
             'settings_leftmenu_user_html_only_for_administrator',
             'settings_table_init_datatables',
             'settings_side_slider_enabled',
             'settings_side_slider_fixed',
             'settings_side_slider_sysinfo_enabled',
             'settings_side_slider_notifications_enabled',
             'settings_side_slider_favorites_enabled',
             'settings_sysinfo_theme_updates',
             'settings_cache_interval',
             'settings_sysinfo_theme_updates_for_usermin');
        if ($get_user_level eq 3) {
            push(@theme_settings_filter, 'settings_hotkey_toggle_key_webmin', 'settings_webmin_default_module');
        }
    }
    return @theme_settings_filter;
}

sub theme_settings_format
{
    my ($k, $v, $excluded) = @_;

    foreach my $o (@{$excluded}) {
        if ($k eq $o) {
            return [];
        }
    }

    my $v = (length $theme_config{$k} ? $theme_config{$k} : $v);

    if ($v eq 'true' || $v eq 'false') {
        my $disabled;

        # Force disabled state
        if (!has_command('git') &&
            ($k eq 'settings_sysinfo_theme_updates' ||
                $k eq 'settings_sysinfo_theme_updates_for_usermin'))
        {
            $disabled = " pointer-events-none";
        }

        $v =
          '<span class="awradio awobject' . $disabled . '">' . '<input class="iawobject" type="radio" name="' . $k .
          '" id="' . $k . '_1" value="true"' . ($v eq 'true' && ' checked') . '>' . '<label class="lawobject" for="' .
          $k . '_1">' . $text{'yes'} . '</label>' . '<input class="iawobject" type="radio" name="' .
          $k . '" id="' . $k . '_0" value="false"' . ($v eq 'false' && ' checked') .
          '>' . '<label class="lawobject" for="' . $k . '_0">' . $text{'no'} . '</label>' . '</span>
            ';

    } elsif ($k =~ /settings_sysinfo_hidden_panels_provisional/ &&
             $theme_config{'settings_sysinfo_hidden_panels_provisional'})
    {
        my $excluded_accordions;
        my @excluded_accordions;
        my @selected_excluded_accordions;
        eval {
            my $data = $theme_config{'settings_sysinfo_hidden_panels_provisional'};
            $data =~ s/'/"/g;
            $excluded_accordions          = convert_from_json($data);
            @selected_excluded_accordions = keys %{$excluded_accordions};
            foreach my $key (@selected_excluded_accordions) {
                push(@excluded_accordions, [$key, $excluded_accordions->{$key}]);
            }
        };
        if (!$@) {
            $v = &ui_select("settings_sysinfo_hidden_panels_provisional",
                            \@selected_excluded_accordions,
                            \@excluded_accordions, scalar(@selected_excluded_accordions), 1);
        }

    } elsif ($k eq 'settings_sysinfo_easypie_charts_size') {
        $v = ui_textbox($k, $v, 2);
    } elsif ($k =~ /settings_hotkey_toggle_key_/ ||
             $k eq 'settings_hotkey_focus_search'  ||
             $k eq 'settings_hotkey_navigation'    ||
             $k eq 'settings_hotkey_slider'        ||
             $k eq 'settings_hotkey_toggle_slider' ||
             $k eq 'settings_hotkey_reload'        ||
             $k eq 'settings_hotkey_shell2'        ||
             $k eq 'settings_hotkey_sysinfo'       ||
             $k eq 'settings_hotkey_favorites')
    {
        $v = ui_textbox($k, $v, 1, undef, 1);
    } elsif ($k eq 'settings_sysinfo_easypie_charts_width' ||
             $k eq 'settings_sysinfo_easypie_charts_scale' ||
             $k eq 'settings_sysinfo_max_servers')
    {
        $v = ui_textbox($k, $v, 1);
    } elsif ($k eq 'settings_grayscale_level_navigation' ||
             $k eq 'settings_sepia_level_navigation'      ||
             $k eq 'settings_saturate_level_navigation'   ||
             $k eq 'settings_hue_level_navigation'        ||
             $k eq 'settings_invert_level_navigation'     ||
             $k eq 'settings_brightness_level_navigation' ||
             $k eq 'settings_contrast_level_navigation'   ||
             $k eq 'settings_leftmenu_width'              ||
             $k eq 'settings_table_init_datatables')
    {

        my $range_max = '1';
        my $range_min = '0';
        my $iwidth    = '80';
        my $range_step;

        if ($k eq 'settings_grayscale_level_navigation' ||
            $k eq 'settings_sepia_level_navigation'    ||
            $k eq 'settings_saturate_level_navigation' ||
            $k eq 'settings_invert_level_navigation')
        {

            if ($k eq 'settings_saturate_level_navigation') {
                $range_max = '3';
            }
            $range_step = '0.01';
        } elsif ($k eq 'settings_brightness_level_navigation' ||
                 $k eq 'settings_contrast_level_navigation')
        {
            $range_min  = '0.1';
            $range_max  = '3';
            $range_step = '0.01';
        } elsif ($k eq 'settings_hue_level_navigation') {
            $range_min  = '-360';
            $range_max  = '360';
            $range_step = '1';
        } elsif ($k eq 'settings_leftmenu_width') {
            $range_min  = '260';
            $range_max  = '520';
            $range_step = '1';
            $iwidth     = '25';
        } elsif ($k eq 'settings_table_init_datatables') {
            $range_min  = '500';
            $range_max  = '50000';
            $range_step = '500';
            $iwidth     = '25';
        }
        $v = '
                <input style="display: inline; width: ' .
          $iwidth . '%; height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="range" min="' .
          $range_min . '" max="' . $range_max . '" step="' . $range_step . '" name="' . $k . '" value="' . $v . '">
            ';

    } elsif ($k eq 'settings_leftmenu_custom_links') {
        $v = ui_textarea($k, $v, 1);
    } elsif ($k =~ /settings_hotkey_custom/ ||
             $k eq 'settings_leftmenu_netdata_link' ||
             $k eq 'settings_leftmenu_user_html')
    {
        my $width = ' width: 40%; ';
        if ($k eq 'settings_leftmenu_netdata_link') {
            $width = ' width: 50%; ';
        } elsif ($k eq 'settings_leftmenu_user_html') {
            $width = ' width: 95%; ';
        }

        $v = '
                <input style="display: inline;'
          . $width . 'height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="text" name="' .
          $k . '" value="' . $v . '">
            ';
    } elsif ($k eq 'settings_right_default_tab_webmin') {
        $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
          . ($v eq '/' && ' selected') . '>' . $theme_text{'theme_xhred_titles_wm'} . '</option>

                '
          . (&foreign_available("virtual-server") &&
             ' <option value="virtualmin"' .
             ($v eq 'virtualmin' && ' selected') . '>' . $theme_text{'theme_xhred_titles_vm'} . '</option> ') .
          '

               '
          . (&foreign_available("server-manager") &&
             ' <option value="cloudmin"' .
             ($v eq 'cloudmin' && ' selected') . '>' . $theme_text{'theme_xhred_titles_cm'} . '</option>') .
          '
                </select>';
    } elsif ($k eq 'settings_webmin_default_module') {
        $v = settings_get_select_default_module('goto_webmin_default_module', $gconfig{'gotomodule'});
    } elsif ($k eq 'settings_right_default_tab_usermin') {
        $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
          . ($v eq '/' && ' selected') . '>' . $theme_text{'theme_xhred_titles_um'} . '</option>

                '
          . (get_usermin_data('mailbox') &&
             ' <option value="mail"' .
             ($v eq 'mail' && ' selected') . '>' . $theme_text{'theme_xhred_titles_mail'} . '</option> ') .
          '

                </select>';
    } elsif ($k eq 'settings_hotkey_toggle_modifier') {
        $v = '<select class="ui_select" name="' . $k . '">
                    <option value="altKey"'
          . ($v eq 'altKey' && ' selected') . '>Alt</option>
                    <option value="ctrlKey"'
          . ($v eq 'ctrlKey' && ' selected') . '>Ctrl</option>
                    <option value="metaKey"'
          . ($v eq 'metaKey' && ' selected') . '>Meta</option>
                </select>';
    } elsif ($k eq 'settings_cache_interval') {
        $v = '<select class="ui_select" name="' . $k . '">
                    <option value="3600"' .
          ($v eq '3600' && ' selected') . '>' . $theme_text{'settings_cache_interval_1h'} . '</option>
                    <option value="43200"' .
          ($v eq '43200' && ' selected') . '>' . $theme_text{'settings_cache_interval_12h'} . '</option>
                    <option value="86400"' .
          ($v eq '86400' && ' selected') . '>' . $theme_text{'settings_cache_interval_1d'} . '</option>
                    <option value="604800"' .
          ($v eq '604800' && ' selected') . '>' . $theme_text{'settings_cache_interval_7d'} . '</option>
                    <option value="1209600"' .
          ($v eq '1209600' && ' selected') . '>' . $theme_text{'settings_cache_interval_14d'} . '</option>
                    <option value="2419200"' .
          ($v eq '2419200' && ' selected') . '>' . $theme_text{'settings_cache_interval_1m'} . '</option>
                    <option value="7257600"' .
          ($v eq '7257600' && ' selected') . '>' . $theme_text{'settings_cache_interval_3m'} . '</option>
                    <option value="14515200"' .
          ($v eq '14515200' && ' selected') . '>' . $theme_text{'settings_cache_interval_6m'} . '</option>
                    <option value="29030400"' .
          ($v eq '29030400' && ' selected') . '>' . $theme_text{'settings_cache_interval_1y'} . '</option>
                </select>';
    } elsif ($k eq 'settings_right_virtualmin_default') {
        if (foreign_available('virtual-server')) {
            $v = &ui_select($k,
                            $v,
                            [[undef,       undef],
                             ['index.cgi', $theme_text{'theme_config_virtualmin'}],
                             map    {[$_->{'id'}, &virtual_server::show_domain_name($_)]}
                               grep {&virtual_server::can_edit_domain($_)}
                               sort {$a->{'dom'} cmp $b->{'dom'}} &virtual_server::list_domains()
                            ]);
        }
    } elsif ($k eq 'settings_right_cloudmin_default') {
        if (&foreign_available('server-manager')) {
            my @servers = &server_manager::list_available_managed_servers_sorted();
            $v = &ui_select($k,
                            $v,
                            [[undef,       undef],
                             ['index.cgi', $theme_text{'theme_config_cloudmin'}],
                             map {[$_->{'id'}, $_->{'host'}]} @servers,
                            ]);
        }

    } elsif ($k eq 'settings_navigation_color') {
        $v = settings_get_select_navigation_color($v, $k);
    } elsif ($k eq 'settings_background_color') {
        $v = settings_get_select_background_color($v, $k);
    } elsif ($k eq 'settings_cm_editor_palette') {
        $v = settings_get_select_editor_color($v, $k);
    } elsif ($k eq 'settings_global_palette_unauthenticated') {
        $v = ui_select($k,
                       $v,
                       [[('light', $theme_text{'theme_xhred_global_light'})],
                        [('dark',  $theme_text{'theme_xhred_global_dark'})]
                       ]);
    } elsif ($k eq 'settings_sysinfo_real_time_stored_length') {
        $v = '<select class="ui_select" name="' . $k . '">

                    <option value="600"'
          . ($v eq '600' && ' selected') . '>10 ' . lc($theme_text{'theme_xhred_global_minutes'}) . '</option>

                    <option value="1800"'
          . ($v eq '1800' && ' selected') . '>30 ' . lc($theme_text{'theme_xhred_global_minutes'}) . '</option>

              <option value="3600"'
          . ($v eq '3600' && ' selected') . '>1 ' . lc($theme_text{'theme_xhred_global_hour'}) . '</option>

              <option value="7200"'
          . ($v eq '7200' && ' selected') . '>2 ' . lc($theme_text{'theme_xhred_global_hours'}) . '</option>

              <option value="10800"'
          . ($v eq '10800' && ' selected') . '>3 ' . lc($theme_text{'theme_xhred_global_hours'}) . '</option>

              <option value="21600"'
          . ($v eq '21600' && ' selected') . '>6 ' . lc($theme_text{'theme_xhred_global_hours'}) . '</option>

              <option value="43200"'
          . ($v eq '43200' && ' selected') . '>12 ' . lc($theme_text{'theme_xhred_global_hours'}) . '</option>

              <option value="86400"'
          . ($v eq '86400' && ' selected') . '>24 ' . lc($theme_text{'theme_xhred_global_hours'}) . '</option>

                </select>';
    } elsif ($k eq 'settings_document_title') {
        $v = settings_get_select_document_title($v, $k);
    }
    my $description     = $theme_text{ $k . '_description' };
    my $popover_trigger = 'click';
    my $cursor          = ($popover_trigger eq 'click' ? ' cursor-pointer' : undef);

    # Return formatted
    return [
            (
             (
              $description && (
                             $k =~ /level_navigation|leftmenu_width/ ? undef :
                             '<sup class="fa fa-fw fa-0_80x fa-question-circle module-help showpass-popover cursor-help' .
                             $cursor . '" data-html="true" data-toggle="popover" data-trigger="' . $popover_trigger .
                             '" data-title="' . $theme_text{$k} . '" data-content="' . html_escape($description) . '"></sup>'
              )
             ) .
               '' . $theme_text{$k} . ''
               .
               (
                 $description && ($k =~ /level_navigation|leftmenu_width/ ?
                                  '<div class="smaller text-normal no-padding">' . $description . '</div>' :
                                  $k =~ /sysinfo_theme_updates/ &&
                                  '<div class="smaller text-normal no-padding margined-left-1"></div>'
                 )
               )
            ),
            "<span>$v</span>"];
}

sub theme_footer
{
    my $update_dropdown = (
        $get_user_level eq '0' ?
          '                     <span id="force_update_menu_cnt" class="dropup"'
          .
          ( has_command('git') ?
              get_button_tooltip('settings_update_theme_tooltip', undef, undef, 1, 1, '#force_update_menu_cnt') :
              get_button_tooltip('settings_sysinfo_theme_updates_description', undef, undef, 1, 1)
          ) .
          '>
                                       <button class="btn btn-info dropdown-toggle margined-left--1 no-style-hover' .
          (has_command('git') ? undef : ' disabled') .
          '" type="button" id="force_update_menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                         <i class="fa fa-fw fa-download-cloud margined-right-8"></i>' .
          $theme_text{'theme_force_upgrade'} . '&nbsp;&nbsp;
                                         <span class="caret"></span>
                                       </button>
                                       <ul class="dropdown-menu" aria-labelledby="force_update_menu">
                                         <li><a data-git="1" data-stable="1" class="authentic_update" href="javascript:;"><i class="fa fa-fw fa-package-install margined-right-8"></i>'
          . $theme_text{'theme_xhred_force_upgrade_stable'} . '</a></li>
                                         <li><a data-git="1" data-stable="0" class="authentic_update" href="javascript:;"><i class="fa fa-fw fa-git-commit margined-right-8"></i>'
          . $theme_text{'theme_xhred_force_upgrade_beta'} . '</a></li>
                                       </ul>
                                   </span>'
        :
          '');
    return (
        "<div class=\"btn-group\">
            <a style=\"min-width:90px\" class=\"btn btn-success\" id=\"atsave\">
                <i class=\"fa fa-fw fa-floppy-o\" style=\"margin-right:7px;\"></i>$text{'save'}
            </a>
            <a style=\"min-width:146px\" class=\"btn btn-default\" id=\"atrestore\">
                <i class=\"fa fa-fw fa-history\" style=\"margin-right:7px;\"></i>$theme_text{'settings_right_restore_defaults'}
            </a>
            <a style=\"min-width:132px\" class=\"btn btn-default\" onclick=\"theme_cache_clear(this);\" @{[get_button_tooltip('settings_reset_cache_tooltip', undef, undef, 1, 1)]}>
                <i class=\"fa fa-fw fa-hourglass-o\" style=\"margin-right:7px;\"></i>$theme_text{'settings_right_clear_local_cache'}
            </a>
            $update_dropdown
        </div>",
        ($get_user_level eq '0' ?
           "<div class=\"btn-group\">
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_styles\" href=\"$gconfig{'webprefix'}/settings-editor_read.cgi\">
                <i class=\"fa fa-fw fa-file-code-o\" style=\"margin-right:7px;\"></i>$theme_text{'settings_right_theme_extensions'}
            </a>
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_logos\" href=\"$gconfig{'webprefix'}/settings-logos.cgi\">
                <i class=\"fa fa-fw fa-file-image-o\" style=\"margin-right:7px;\"></i>$theme_text{'theme_xhred_settings_right_theme_logos'}
            </a>
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_logos\" href=\"$gconfig{'webprefix'}/settings-backgrounds.cgi\">
                <i class=\"fa fa-fw fa-image\" style=\"margin-right:7px;\"></i>$theme_text{'theme_xhred_settings_right_theme_bgs'}
            </a>
        </div>" :
           ""
        ));
}

1;
