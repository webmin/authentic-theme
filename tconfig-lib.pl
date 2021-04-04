#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%gconfig, %text, %theme_config, %theme_text, $has_usermin, $has_usermin_root_dir, $get_user_level);

sub theme_settings_raw
{
    return (
        [
         {  'id'    => 's1',
            'title' => &theme_text('settings_global_general_options_title'),
            'data'  => [
                       'settings_right_default_tab_webmin',
                       'settings_right_default_tab_usermin',
                       'settings_webmin_default_module',
                       'settings_right_virtualmin_default',
                       'settings_right_cloudmin_default',
                       'settings_right_page_keep',
                       'settings_right_reload',
                       'settings_document_title',
                       'settings_cm_editor_palette',
                       'settings_global_palette_unauthenticated',
                       'settings_theme_config_admins_only_privileged',
                       'settings_embed_product_branding_privileged',
            ]
         }
        ],

        [
         {  'id'    => 's2',
            'title' => &theme_text('settings_right_sysinfo_page_options'),
            'data'  => [
                       'settings_sysinfo_easypie_charts',
                       'settings_sysinfo_easypie_charts_size',
                       'settings_sysinfo_easypie_charts_width',
                       'settings_sysinfo_easypie_charts_scale',
                       'settings_sysinfo_hidden_panels_user',
                       'settings_sysinfo_max_servers',
                       'settings_sysinfo_real_time_status',
                       'settings_sysinfo_real_time_status_disk',
                       'settings_sysinfo_real_time_stored',
                       'settings_sysinfo_real_time_stored_length',
            ]
         }
        ],

        [
         {  'id'    => 's3',
            'title' => &theme_text('settings_right_navigation_menu_options'),
            'data'  => [
                       'settings_navigation_color',
                       'settings_grayscale_level_navigation',
                       'settings_sepia_level_navigation',
                       'settings_saturate_level_navigation',
                       'settings_hue_level_navigation',
                       'settings_invert_level_navigation',
                       'settings_brightness_level_navigation',
                       'settings_contrast_level_navigation',
                       'settings_navigation_always_collapse',
                       'settings_leftmenu_width',
                       'settings_switch_rdisplay',
                       'settings_leftmenu_section_hide_refresh_modules',
                       'settings_leftmenu_section_hide_unused_modules',
                       'settings_collapse_navigation_link',
                       'settings_sysinfo_link_mini',
                       'settings_show_night_mode_link',
                       'settings_show_terminal_link2',
                       'settings_favorites',
                       'settings_theme_options_button',
                       'settings_leftmenu_button_language',
                       'settings_leftmenu_button_refresh',
                       'settings_leftmenu_netdata',
                       'settings_leftmenu_netdata_link',
                       'settings_leftmenu_user_html',
                       'settings_leftmenu_user_html_only_for_administrator',
                       'settings_leftmenu_custom_links',
            ]
         }
        ],

        [
         {  'id'    => 's4',
            'title' => &theme_text('settings_right_notification_slider_options'),
            'data'  => [
                       'settings_side_slider_enabled',
                       'settings_side_slider_fixed',
                       'settings_side_slider_sysinfo_enabled',
                       'settings_side_slider_notifications_enabled',
                       'settings_side_slider_favorites_enabled',
            ]
         }
        ],

        [
         {  'id'    => 's5',
            'title' => &theme_text('settings_right_table_options'),
            'data'  => [
                       'settings_right_hide_table_icons',
                       'settings_right_small_table_icons',
                       'settings_right_animate_table_icons',
                       'settings_right_grayscaled_table_icons',
                       'settings_table_init_datatables',
            ]
         }
        ],

        [
         {  'id'    => 's6',
            'title' => &theme_text('settings_right_hotkey_options'),
            'data'  => [
                       'settings_hotkeys_active',
                       'settings_hotkey_toggle_modifier',
                       'settings_hotkey_toggle_key_webmin',
                       'settings_hotkey_toggle_key_virtualmin',
                       'settings_hotkey_toggle_key_cloudmin',
                       'settings_hotkey_toggle_key_usermin',
                       'settings_hotkey_toggle_key_webmail',
                       'settings_hotkey_shell2',
                       'settings_hotkey_sysinfo',
                       'settings_hotkey_toggle_slider',
                       'settings_hotkey_favorites',
                       'settings_hotkey_focus_search',
                       'settings_hotkey_reload',
                       'settings_hotkey_navigation',
                       'settings_hotkey_slider',
                       'settings_hotkey_toggle_key_night_mode',
            ]
         }
        ],

        [
         {  'id'    => 's7',
            'title' => &theme_text('settings_right_hotkey_custom_options'),
            'desc'  => &theme_text('settings_right_hotkey_custom_options_description'),
            'data'  => [
                       'settings_hotkey_custom_1_user',
                       'settings_hotkey_custom_2_user',
                       'settings_hotkey_custom_3_user',
                       'settings_hotkey_custom_4_user',
                       'settings_hotkey_custom_5_user',
                       'settings_hotkey_custom_6_user',
                       'settings_hotkey_custom_7_user',
                       'settings_hotkey_custom_8_user',
                       'settings_hotkey_custom_9_user',
            ]
         }
        ],

        [
         {  'id'    => 's8',
            'title' => &theme_text('settings_right_soft_updates_page_options'),
            'data'  =>
              ['settings_sysinfo_theme_updates', 'settings_cache_interval', 'settings_sysinfo_theme_updates_for_usermin',]
         }
        ]);
}

sub theme_settings_filter
{
    my @theme_settings_filter;

    # Exclude list of combined settings for Virtualmin/Cloudmin
    if (!foreign_available("server-manager") &&
        !foreign_available("virtual-server"))
    {
        push(@theme_settings_filter,
             'settings_right_default_tab_webmin',
             'settings_right_reload', 'settings_right_page_keep');
    }

    # Assign default for options provided by the server side
    else {
        if (!$theme_config{'settings_right_default_tab_webmin'}) {
            my $def_tab = '/';
            if (foreign_available("server-manager")) {
                $def_tab = 'cloudmin';
            } elsif (foreign_available("virtual-server")) {
                $def_tab = 'virtualmin';
            }
            $theme_config{'settings_right_default_tab_webmin'} = $def_tab;
        }
    }

    # Assign default for options provided by the server side
    if (!$theme_config{'settings_webmin_default_module'}) {
        $theme_config{'settings_webmin_default_module'} = get_goto_module();
    }

    # Assign default for options provided by the server side
    if (!$theme_config{'settings_leftmenu_netdata_link'}) {
        $theme_config{'settings_leftmenu_netdata_link'} =
          ('//' . get_system_hostname() . ':19999');
    }

    # Exclude hidden panels if none
    if (!$theme_config{'settings_sysinfo_hidden_panels_user'}) {
        push(@theme_settings_filter, 'settings_sysinfo_hidden_panels_user');
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
    if (!-r "$has_usermin_root_dir/mailbox") {
        push(@theme_settings_filter, 'settings_hotkey_toggle_key_webmail', 'settings_right_default_tab_usermin');
    }

    # Exclude Netdata link and default address
    if (!has_command('netdata')) {
        push(@theme_settings_filter, 'settings_leftmenu_netdata', 'settings_leftmenu_netdata_link');
    }

    # Exclude Command Shell button if not available
    if (!foreign_available("shell")) {
        push(@theme_settings_filter, 'settings_show_terminal_link2', 'settings_hotkey_shell2');
    }

    # Limit to certain options for non privleged user
    if ($get_user_level ne '0') {
        push(@theme_settings_filter,
             'settings_theme_config_admins_only_privileged',
             'settings_embed_product_branding_privileged',
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
        if ($get_user_level eq '3') {
            push(@theme_settings_filter, 'settings_hotkey_toggle_key_webmin', 'settings_webmin_default_module');
        } elsif ($get_user_level eq '2' || $get_user_level eq '4') {
            push(@theme_settings_filter,
                 'settings_hotkey_toggle_key_webmin',
                 'settings_hotkey_toggle_key_usermin',
                 'settings_hotkey_toggle_key_webmail',
                 'settings_right_default_tab_webmin',
                 'settings_webmin_default_module');
        }
        if ($get_user_level ne '3') {
            push(@theme_settings_filter, 'settings_right_default_tab_usermin');
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
        $v = ui_yesno_radio($k, $v, 'true', 'false');

    } elsif ($k =~ /settings_sysinfo_hidden_panels_user/ &&
             $theme_config{'settings_sysinfo_hidden_panels_user'})
    {
        my $excluded_accordions;
        my @excluded_accordions;
        my @selected_excluded_accordions;
        eval {
            my $data = $theme_config{'settings_sysinfo_hidden_panels_user'};
            $data =~ s/'/"/g;
            $excluded_accordions          = convert_from_json($data);
            @selected_excluded_accordions = keys %{$excluded_accordions};
            foreach my $key (@selected_excluded_accordions) {
                push(@excluded_accordions, [$key, $excluded_accordions->{$key}]);
            }
        };
        if (!$@) {
            $v = &ui_select("settings_sysinfo_hidden_panels_user",
                            \@selected_excluded_accordions,
                            \@excluded_accordions, scalar(@selected_excluded_accordions), 1);
        }

    } elsif ($k eq 'settings_sysinfo_easypie_charts_size') {
        $v = ui_textbox($k, $v, 3);
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
                <option value="webmail"' .
          ($v eq 'webmail' && ' selected') . '>' . $theme_text{'theme_xhred_titles_mail'} . '</option>
          

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
                            [[undef,       $theme_text{'theme_xhred_titles_dashboard'}],
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
                            [[undef,       $theme_text{'theme_xhred_titles_dashboard'}],
                             ['index.cgi', $theme_text{'theme_config_cloudmin'}],
                             map {[$_->{'id'}, $_->{'host'}]} @servers,
                            ]);
        }

    } elsif ($k eq 'settings_navigation_color') {
        $v = settings_get_select_navigation_color($v, $k);
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
    } elsif ($k eq 'settings_sysinfo_real_time_status') {
        my $yes_forced =
"$theme_text{'settings_sysinfo_real_time_status_forced'} <sup @{[get_button_tooltip('settings_sysinfo_real_time_status_forced_warn')]} class=\"fa fa-exclamation-circle\"></sup>";
        $v = ui_radio($k, $v, [[1, $text{'yes'}], [2, $yes_forced], [0, $text{'no'}]]);
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
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_logos\" href=\"$gconfig{'webprefix'}/settings-backgrounds.cgi\">
                <i class=\"fa fa-fw fa-image\" style=\"margin-right:7px;\"></i>$theme_text{'theme_xhred_settings_right_theme_bgs'}
            </a>
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_logos\" href=\"$gconfig{'webprefix'}/settings-logos.cgi\">
                <i class=\"fa fa-fw fa-file-image-o\" style=\"margin-right:7px;\"></i>$theme_text{'theme_xhred_settings_right_theme_logos'}
            </a>
            <a class=\"btn btn-default page_footer_ajax_submit\" id=\"edit_styles\" href=\"$gconfig{'webprefix'}/settings-editor_read.cgi\">
                <i class=\"fa fa-fw fa-file-code-o\" style=\"margin-right:7px;\"></i>$theme_text{'settings_right_theme_extensions'}
            </a>
        </div>" :
           ""
        ));
}

1;
