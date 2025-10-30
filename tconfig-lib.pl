#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%gconfig,
     %text,
     $root_directory,
     $current_theme,
     $theme_webprefix,
     %theme_config,
     $theme_info,
     %theme_text,
     $has_usermin,
     $has_usermin_root_dir,
     $get_user_level);

sub theme_settings_raw
{
    # Available settings
    my @theme_settings_raw = (
        [
         {  'id'    => 's1',
            'title' => &theme_text('settings_global_general_options_title'),
            'data'  => [
                       'settings_roundish_corners',
                       'settings_right_default_tab_webmin',
                       'settings_right_default_tab_usermin',
                       'settings_webmin_default_module',
                       'settings_right_virtualmin_default',
                       'settings_right_cloudmin_default',
                       'settings_right_page_keep',
                       'settings_right_sync',
                       'settings_document_title',
                       'settings_palette_auto',
                       'settings_global_palette_unauthenticated',
                       'settings_cm_editor_palette',
                       'settings_theme_config_admins_only_privileged',
            ] }
        ],

        [
         {  'id'    => 's2',
            'title' => &theme_text('settings_right_sysinfo_page_options'),
            'data'  => [
                       'settings_sysinfo_easypie_charts',
                       'settings_sysinfo_hidden_panels_user',
                       'settings_sysinfo_max_servers',
                       'settings_sysinfo_real_time_status',
            ] }
        ],

        [
         {  'id'    => 's3',
            'title' => &theme_text('settings_right_navigation_menu_options'),
            'data'  => [
                       'settings_navigation_color',
                       'settings_grayscale_level_navigation',
                       'settings_sepia_level_navigation',
                       'settings_saturation_level_navigation',
                       'settings_hue_level_navigation',
                       'settings_invert_level_navigation',
                       'settings_brightness_level_navigation',
                       'settings_contrast_level_navigation',
                       'settings_navigation_always_collapse',
                       'settings_switch_rdisplay',
                       'settings_navigation_auto_fold_category',
                       'settings_leftmenu_section_hide_refresh_modules',
                       'settings_leftmenu_section_hide_unused_modules',
                       'settings_collapse_navigation_link',
                       'settings_sysinfo_link_mini',
                       'settings_show_night_mode_link',
                       'settings_show_terminal_link',
                       'settings_show_terminal_link2',
                       'settings_favorites',
                       'settings_theme_options_button',
                       'settings_leftmenu_button_language',
                       'settings_leftmenu_button_refresh',
                       'settings_leftmenu_netdata',
                       'settings_leftmenu_netdata_link',
                       'settings_leftmenu_user_html',
                       'settings_leftmenu_user_html_privileged',
                       'settings_leftmenu_custom_links',
            ] }
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
            ] }
        ],

        [
         {  'id'    => 's5',
            'title' => &theme_text('settings_right_table_options'),
            'data'  => [
                       'settings_right_table_links_type',
                       'settings_right_table_links_sorted',
                       'settings_right_table_animate_icons',
                       'settings_right_table_grayscaled_icons',
            ] }
        ],

        [
         {  'id'    => 's6',
            'title' => &theme_text('settings_right_hotkey_options'),
            'data'  => [
                       'settings_hotkeys_active',
                       'settings_hotkey_toggle_modifier',
                       'settings_hotkey_toggle_hold_modifier',
                       'settings_hotkey_toggle_key_webmin',
                       'settings_hotkey_toggle_key_virtualmin',
                       'settings_hotkey_toggle_key_cloudmin',
                       'settings_hotkey_toggle_key_usermin',
                       'settings_hotkey_toggle_key_webmail',
                       'settings_hotkey_shell',
                       'settings_hotkey_shell2',
                       'settings_hotkey_sysinfo',
                       'settings_hotkey_favorites',
                       'settings_hotkey_navigation',
                       'settings_hotkey_slider',
                       'settings_hotkey_toggle_key_night_mode',
                       'settings_hotkey_focus_search',
                       'settings_hotkey_reload',
                       'settings_hotkey_logout_dbl',
            ] }
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
            ] }
        ]);
    # Add upgrade settings if available
    if ($theme_config{'settings_upgrade_allowed'} eq 'true') {
        push(@theme_settings_raw,
        [
         {  'id'    => 's8',
            'title' => &theme_text('settings_right_soft_updates_page_options'),
            'data'  => [
                        'settings_sysinfo_theme_updates', 
                        'settings_sysinfo_theme_updates_for_usermin',
                        'settings_cache_interval'
            ] }
        ]);
    }
    return @theme_settings_raw;
}

sub theme_settings_filter
{
    my @theme_settings_filter;

    # Exclude list of combined settings for Virtualmin/Cloudmin
    if (!foreign_available("server-manager") &&
        !foreign_available("virtual-server"))
    {
        push(@theme_settings_filter,
             'settings_right_default_tab_webmin', 'settings_right_page_keep');
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

    # Exclude Command Shell button if not available or if Terminal is available
    if (!foreign_available("shell") || foreign_available("xterm")) {
        push(@theme_settings_filter, 'settings_show_terminal_link2', 'settings_hotkey_shell2');
    }

    # Exclude Terminal button if not available
    if (!foreign_available("xterm")) {
        push(@theme_settings_filter, 'settings_show_terminal_link', 'settings_hotkey_shell');
    }

    # Limit to certain options for non privileged user
    if (!&webmin_user_is_admin()) {
        push(@theme_settings_filter,
             'settings_theme_config_admins_only_privileged',
             'settings_embed_product_splash_privileged',
             'settings_hotkey_slider',
             'settings_global_palette_unauthenticated',
             'settings_sysinfo_easypie_charts',
             'settings_sysinfo_max_servers',
             'settings_sysinfo_real_time_status',
             'settings_sysinfo_real_time_stored_duration',
             'settings_leftmenu_section_hide_refresh_modules',
             'settings_leftmenu_section_hide_unused_modules',
             'settings_leftmenu_netdata',
             'settings_leftmenu_netdata_link',
             'settings_leftmenu_user_html_privileged',
             'settings_side_slider_enabled',
             'settings_side_slider_fixed',
             'settings_side_slider_sysinfo_enabled',
             'settings_side_slider_notifications_enabled',
             'settings_side_slider_favorites_enabled',
             'settings_sysinfo_theme_updates',
             'settings_sysinfo_theme_updates_for_usermin',
             'settings_cache_interval');
        if ($get_user_level eq '3') {
            push(@theme_settings_filter, 'settings_hotkey_toggle_key_webmin');
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

        # If admin limits user HTML snippet for nav menu
        if ($theme_config{'settings_leftmenu_user_html_privileged'} eq 'true') {
            push(@theme_settings_filter, 'settings_leftmenu_user_html');
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

    $v = (length $theme_config{$k} ? $theme_config{$k} : $v);

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

    } elsif ($k =~ /settings_hotkey_toggle_key_/ ||
             $k eq 'settings_hotkey_focus_search'  ||
             $k eq 'settings_hotkey_navigation'    ||
             $k eq 'settings_hotkey_slider'        ||
             $k eq 'settings_hotkey_reload'        ||
             $k eq 'settings_hotkey_logout_dbl'    ||
             $k eq 'settings_hotkey_shell'         ||
             $k eq 'settings_hotkey_shell2'        ||
             $k eq 'settings_hotkey_sysinfo'       ||
             $k eq 'settings_hotkey_favorites')
    {
        $v = ui_textbox($k, $v, 1, undef, 1);
    } elsif ($k eq 'settings_sysinfo_max_servers')
    {
        $v = ui_textbox($k, $v, 1);
    } elsif ($k eq 'settings_grayscale_level_navigation' ||
             $k eq 'settings_sepia_level_navigation'      ||
             $k eq 'settings_saturation_level_navigation' ||
             $k eq 'settings_hue_level_navigation'        ||
             $k eq 'settings_invert_level_navigation'     ||
             $k eq 'settings_brightness_level_navigation' ||
             $k eq 'settings_contrast_level_navigation')
    {

        my $range_max = '1';
        my $range_min = '0';
        my $iwidth    = '80';
        my $range_step;

        if ($k eq 'settings_grayscale_level_navigation' ||
            $k eq 'settings_sepia_level_navigation'      ||
            $k eq 'settings_saturation_level_navigation' ||
            $k eq 'settings_invert_level_navigation')
        {

            if ($k eq 'settings_saturation_level_navigation') {
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
        }
        $v = '
                <input style="display: inline; width: ' .
          $iwidth .
          '%; height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="range" min="' .
          $range_min .
          '" max="' .
          $range_max .
          '" step="' .
          $range_step .
          '" name="' .
          $k .
          '" value="' .
          $v . '">
            ';

    } elsif ($k eq 'settings_leftmenu_custom_links') {
        my $line_count = 1;
        if ($v) {
            $v = replace('\'', '"', un_urlize($v, 1));
            $v = convert_from_json($v);
            $v = convert_to_json($v, 1);
            $line_count = () = $v =~ /\n/g;
        }
        $v = ui_textarea($k, $v, $line_count);
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
        $v =~ s/(<(\/|\s*)(html|head|meta|link|title|body).*?>)//g;
        $v = '
                <input style="display: inline;'
          . $width .
          'height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="text" name="' .
          $k .
          '" value="' .
          $v . '">
            ';
    } elsif ($k eq 'settings_right_default_tab_webmin') {
        $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
          . ($v eq '/' && ' selected') . '>' . $theme_text{'theme_xhred_titles_wm'} . '</option>

                '
          . (&foreign_available("virtual-server") &&
             ' <option value="virtualmin"' .
             ($v eq 'virtualmin' && ' selected') . '>' .
             $theme_text{'theme_xhred_titles_vm'} .
             '</option> ') .
          '

               '
          . (&foreign_available("server-manager") &&
             ' <option value="cloudmin"' .
             ($v eq 'cloudmin' && ' selected') . '>' .
             $theme_text{'theme_xhred_titles_cm'} .
             '</option>') .
          '
                </select>';
    } elsif ($k eq 'settings_webmin_default_module') {
        if ($get_user_level eq '3') {
            $k = 'settings_usermin_default_module';
        }
        $v = settings_get_select_default_module('goto_webmin_default_module', get_default_module());
    } elsif ($k eq 'settings_right_default_tab_usermin') {
        $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
          . ($v eq '/' && ' selected') . '>' . $theme_text{'theme_xhred_titles_um'} . '</option>       
                <option value="webmail"' .
          ($v eq 'webmail' && ' selected') . '>' .
          $theme_text{'theme_xhred_titles_mail'} .
          '</option>
          

                </select>';
    } elsif ($k eq 'settings_hotkey_toggle_hold_modifier') {
        $v = '<select class="ui_select" name="' . $k . '">
                    <option value="altKey"'
          . ($v eq 'altKey' && ' selected') . '>Alt</option>
                    <option value="ctrlKey"'
          . ($v eq 'ctrlKey' && ' selected') . '>Ctrl</option>
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
          ($v eq '3600' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_1h'} .
          '</option>
                    <option value="43200"' .
          ($v eq '43200' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_12h'} .
          '</option>
                    <option value="86400"' .
          ($v eq '86400' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_1d'} .
          '</option>
                    <option value="604800"' .
          ($v eq '604800' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_7d'} .
          '</option>
                    <option value="1209600"' .
          ($v eq '1209600' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_14d'} .
          '</option>
                    <option value="2419200"' .
          ($v eq '2419200' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_1m'} .
          '</option>
                    <option value="7257600"' .
          ($v eq '7257600' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_3m'} .
          '</option>
                    <option value="14515200"' .
          ($v eq '14515200' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_6m'} .
          '</option>
                    <option value="29030400"' .
          ($v eq '29030400' && ' selected') . '>' .
          $theme_text{'settings_cache_interval_1y'} .
          '</option>
                </select>';
    } elsif ($k eq 'settings_right_virtualmin_default') {
        if (foreign_available('virtual-server')) {
            $v = &ui_select($k,
                            $v,
                            [[undef,       $theme_text{'theme_xhred_titles_dashboard'}],
                             ['index.cgi', $theme_text{'theme_config_virtualmin'}],
                             map    {[$_->{'id'}, &virtual_server::show_domain_name($_)]}
                               grep {&virtual_server::can_edit_domain($_)}
                               sort {$a->{'dom'} cmp $b->{'dom'}} &virtual_server::list_visible_domains()
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
    } elsif ($k eq 'settings_global_palette_unauthenticated') {
        $v = ui_select($k,
                       $v,
                       [[('auto', $theme_text{'theme_xhred_global_auto'})],
                        [('light', $theme_text{'theme_xhred_global_light'})],
                        [('dark',  $theme_text{'theme_xhred_global_dark'})]
                       ]);
    } elsif ($k eq 'settings_cm_editor_palette') {
        $v = settings_get_select_editor_color($v, $k);
    } elsif ($k eq 'settings_right_sync') {
        $v = ui_select($k, $v, [
            [2, $theme_text{"settings_right_sync2"}],
            [1, $theme_text{"settings_right_sync1"}],
            [0, $theme_text{"settings_right_sync0"}]
        ]);
    } elsif ($k eq 'settings_document_title') {
        $v = settings_get_select_document_title($v, $k);
    } elsif ($k eq 'settings_sysinfo_real_time_status') {
        my $realtime = 'settings_sysinfo_real_time_';
        my $realtime_pref = "${realtime}status_";
        my $duration_key = "${realtime}stored_duration";
        my $select = ui_select($duration_key, $theme_config{$duration_key},
                       [
                        [(900, $theme_text{"${realtime_pref}history_duration1"})],
                        [(1800, $theme_text{"${realtime_pref}history_duration2"})],
                        [(2700, $theme_text{"${realtime_pref}history_duration3"})],
                        [(3600, $theme_text{"${realtime_pref}history_duration4"})],
                        [(21600, $theme_text{"${realtime_pref}history_duration5"})],
                        [(43200, $theme_text{"${realtime_pref}history_duration6"})],
                        [(64800, $theme_text{"${realtime_pref}history_duration7"})],
                        [(86400, $theme_text{"${realtime_pref}history_duration8"})]
                       ]);
        $v = ui_radio($k, $v, [
            [1, $theme_text{"${realtime_pref}history1"}.$select],
            [2, $theme_text{"${realtime_pref}history2"}],
            [0, $text{'no'}]
        ]);
    } elsif ($k eq 'settings_right_table_links_type') {
        $v = ui_radio($k,
                      $v,
                      [[2, $theme_text{'settings_right_table_links_type_2'}],
                       [1, $theme_text{'settings_right_table_links_type_1'}],
                      ]);
    }
    my $description = $theme_text{ $k . '_description' };

    # Return formatted
    if ($description =~ /<pre.*?data-json>(.*?)<\/pre>/s) {
        my $json_str = $1;
        my $json_data = convert_from_json($json_str);
        my $pretty_json = convert_to_json($json_data, 1);
        $pretty_json =~ s/   /&nbsp;/g;
        $pretty_json =~ s/\n/<br>/g;
        $description =~ s/<pre.*?data-json>.*?<\/pre>/<pre data-json>$pretty_json<\/pre>/s;
    }
    return [
        (
         (
          $description && (
              $k =~ /level_navigation|leftmenu_width/ ? undef :
'<sup class="fa fa-fw fa-0_80x fa-question-circle module-help showpass-popover cursor-pointer tconfig-popover" data-html="true" data-toggle="popover" data-trigger="click" data-title="'
              . $theme_text{$k}
              . '" data-content="' . html_escape($description) . '"></sup>')
         ) .
           '<span data-text>' .
           $theme_text{$k} .
           '</span>'
           .
           (
             $description && (
                       $k =~ /level_navigation|leftmenu_width/ ?
                       '<div class="smaller text-normal no-padding">' . $description . '</div>' :
                       $k =~ /sysinfo_theme_updates/ &&
                       '<div class="smaller text-normal no-padding margined-left-1 theme-version-installed-vs-remote"></div>'
             ))
        ),
        "<span>$v</span>"];
}

sub theme_controls
{
    my ($section) = @_;
    my $changelog_contents = read_file_contents($root_directory . '/' . $current_theme . "/CHANGELOG.md");
    my @changelog_stable_versions =
      ($changelog_contents =~ /####\s+Version\s+((?|\d+.\d+\s+|\d+.\d+.\d+\s+)\([\d\w\s,]+\))/g);
    my $stable_versions_dropdown_submenu;
    my $stable_versions_dropdown_submenu_content;
    if (@changelog_stable_versions) {
        $stable_versions_dropdown_submenu         = ' class="dropdown-submenu prelocked clickable"';
        $stable_versions_dropdown_submenu_content = '<ul class="dropdown-menu theme-versions" role="menu">';
        foreach my $ver (@changelog_stable_versions) {
            my ($ver_str) = ($ver =~ /^(?|(\d+.\d+)\s+|(\d+.\d+.\d+)\s+)/);
            $stable_versions_dropdown_submenu_content .=
              '<li><a tabindex="-1" href="javascript:;" data-git="1" data-stable="1" data-version="' .
              $ver_str .
              '" class="authentic_update">&nbsp;' .
              $ver .
              '</a></li>';
        }
        $stable_versions_dropdown_submenu_content .= '</ul>';
    }

    my $update_dropdown = (
        (&webmin_user_is_admin() && $section eq $theme_text{'settings_right_soft_updates_page_options'}) ?
          '                     <span id="force_update_menu_cnt" class="dropup"'
          .
          ( has_command('git') ? '' :
              get_button_tooltip('settings_sysinfo_theme_updates_description', undef, undef, 1, 1)
          ) .
          '>
                                       <button class="btn btn-info dropdown-toggle margined-left--1 no-style-hover capitalize'
          . (has_command('git') ? undef : ' disabled') .
          '" type="button" id="force_update_menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                         <i class="fa fa-fw fa-download-cloud margined-right-8"></i>' .
          $theme_text{'theme_force_upgrade'} . '&nbsp;&nbsp;
                                         <span class="caret"></span>
                                       </button>
                                       <ul class="dropdown-menu" aria-labelledby="force_update_menu">
                                         <li' .
          $stable_versions_dropdown_submenu .
'><a data-git="1" data-stable="1" class="authentic_update" href="javascript:;"><i class="fa2 fa2-release-tagged fa-0_90x"></i>'
          . $theme_text{'theme_xhred_force_upgrade_stable'}
          . '</a>' .
          $stable_versions_dropdown_submenu_content . '</li>
                                         <li><a data-git="1" data-stable="0" class="authentic_update" href="javascript:;"><i class="fa2 fa2-release-master"></i>'
          . $theme_text{'theme_xhred_force_upgrade_beta'} . '</a></li>
                                       </ul>
                                   </span>'
        :
          '');
    return (
        "<div class=\"btn-group\">
            <a tabindex='1' class=\"btn btn-success capitalize\" id=\"atsave\">
                <i class=\"fa fa-fw fa-floppy-o\"></i><span>$text{'save'}&nbsp;</span>
            </a>
            <a tabindex='1' class=\"btn btn-default capitalize\" id=\"atrestore\">
                <i class=\"fa fa-fw fa-history\"></i><span>$theme_text{'settings_right_restore_defaults'}</span>
            </a>
            <a tabindex='1' class=\"btn btn-default capitalize\" onclick=\"theme_cache_clear(this,1);\">
                <i class=\"fa fa-fw fa-hourglass-o\"></i><span>$theme_text{'settings_right_clear_local_cache'}</span>
            </a>
            $update_dropdown
        </div>",
        (&webmin_user_is_admin() ?
           "<div class=\"btn-group\">
            <a tabindex='1' class=\"btn btn-default page_footer_ajax_submit capitalize\" id=\"edit_logos\" href=\"$theme_webprefix/settings-backgrounds.cgi\">
                <i class=\"fa fa-fw fa-image\"></i><span>$theme_text{'theme_xhred_settings_right_theme_bgs'}</span>
            </a>
            <a tabindex='1' class=\"btn btn-default page_footer_ajax_submit capitalize\" id=\"edit_logos\" href=\"$theme_webprefix/settings-logos.cgi\">
                <i class=\"fa fa-fw fa-file-image-o\"></i><span>$theme_text{'theme_xhred_settings_right_theme_logos'}</span>
            </a>
            <a tabindex='1' class=\"btn btn-default page_footer_ajax_submit capitalize\" id=\"edit_styles\" href=\"$theme_webprefix/settings-editor_read.cgi\">
                <i class=\"fa fa-fw fa-file-code-o\"></i><span>$theme_text{'settings_right_theme_extensions'}</span>
            </a>
        </div>" :
           ""
        ));
}

sub settings_get_select_navigation_color
{
    my ($v, $k) = @_;
    return '<select class="ui_select" name="' . $k . '">

                    <option value="blue"'
      . ($v eq 'blue' && ' selected') . '>Blue (' . $theme_text{'theme_xhred_global_default'} . ')</option>

                    <option value="teal"'
      . ($v eq 'teal' && ' selected') . '>Teal</option>

                    <option value="green"'
      . ($v eq 'green' && ' selected') . '>Green</option>

                    <option value="purple"'
      . ($v eq 'purple' && ' selected') . '>Purple</option>
      
                    <option value="brown"'
      . ($v eq 'brown' && ' selected') . '>Brown</option>

                    <option value="gold"'
      . ($v eq 'gold' && ' selected') . '>Gold</option>

                    <option value="orange"'
      . ($v eq 'orange' && ' selected') . '>Orange</option>
      
                     <option value="red"'
      . ($v eq 'red' && ' selected') . '>Red</option>

                     <option value="maroon"'
      . ($v eq 'maroon' && ' selected') . '>Maroon</option>

                    <option value="grey"'
      . ($v eq 'grey' && ' selected') . '>Gray</option>

                    <option value="white"'
      . ($v eq 'white' && ' selected') . '>White</option>



      </select>';

}

sub settings_get_select_editor_color
{
    my ($v, $k) = @_;
    return '<select class="ui_select" name="' . $k . '">

            <option value="auto"'
      . ($v eq 'auto' && ' selected') . '>' . $theme_text{'theme_xhred_global_auto'} . '</option>

            <option value="monokai"'
      . ($v eq 'monokai' && ' selected') . '>' . $theme_text{'theme_xhred_global_dark'} . '</option>

            <option value="elegant"'
      . ($v eq 'elegant' && ' selected') . '>' . $theme_text{'theme_xhred_global_light'} . '</option>


        </select>';

}

sub settings_get_select_document_title
{
    my ($v, $k) = @_;
    my $prod_name =
      get_product_name() ne 'webmin' ? $theme_text{'theme_xhred_titles_um'} : $theme_text{'theme_xhred_titles_wm'};
    return '<select class="ui_select" name="' . $k . '">
      <option value="3"'
      . ($v eq '3' && ' selected') . '>' . theme_text('settings_document_title_option_3', ucfirst($prod_name)) . '</option>
      <option value="7"'
      . ($v eq '7' && ' selected') . '>' . theme_text('settings_document_title_option_7', ucfirst($prod_name)) . '</option>
      <option value="1"'
      . ($v eq '1' && ' selected') . '>' .
      theme_text('settings_document_title_option_1', ucfirst($prod_name)) . ' (' .
      $theme_text{'theme_xhred_global_default'} .
      ')</option>
      <option value="2"'
      . ($v eq '2' && ' selected') . '>' . theme_text('settings_document_title_option_2', ucfirst($prod_name)) . '</option>
      <option value="4"'
      . ($v eq '4' && ' selected') . '>' . theme_text('settings_document_title_option_4', ucfirst($prod_name)) . '</option>
      <option value="5"'
      . ($v eq '5' && ' selected') . '>' . theme_text('settings_document_title_option_5', ucfirst($prod_name)) . '</option>
      <option value="8"'
      . ($v eq '8' && ' selected') . '>' . theme_text('settings_document_title_option_8', ucfirst($prod_name)) . '</option>
      <option value="9"'
      . ($v eq '9' && ' selected') . '>' . theme_text('settings_document_title_option_9', ucfirst($prod_name)) . '</option>
      <option value="6"'
      . ($v eq '6' && ' selected') . '>' . theme_text('settings_document_title_option_6', ucfirst($prod_name)) . '</option>
      </select>';
}

sub settings_get_select_default_module
{
    my ($name, $value) = @_;
    my @modules = get_available_module_infos();
    @modules = grep {!$_->{'hidden'} && !$_->{'webmin_hidden'}} @modules;
    if ($get_user_level eq '3') {
        @modules = grep {$_->{'dir'} ne 'mailbox'} @modules;
    }
    my $select = ui_select($name,
                           $value,
                           [["", $theme_text{'theme_xhred_titles_dashboard'}],
                            map    {[$_->{'dir'}, $_->{'desc'}]}
                              sort {$a->{'desc'} cmp $b->{'desc'}} @modules
                           ]);
    return $select;
}

sub theme_settings_data
{
    my @settings         = theme_settings_raw();
    my @excluded_options = theme_settings_filter();
    my @sections;
    my @config_quick_access;

    # Format options for display and build quick access filter
    foreach my $sections (0 .. $#settings) {
        foreach my $section ($settings[$sections]) {
            for (my $i = 0; $i < scalar(@{ $section->[0]->{'data'} }); $i++) {
                my $key_value = @{ $section->[0]->{'data'} }[$i];
                my @key_value_formated =
                  theme_settings_format(@{ $section->[0]->{'data'} }[$i],
                                        $theme_config{ @{ $section->[0]->{'data'} }[$i] },
                                        \@excluded_options);
                if (!$key_value_formated[0][0]) {
                    delete $section->[0]->{'data'}[$i];
                    next;
                }
                $section->[0]->{'data'}[$i] = [$key_value_formated[0][0], $key_value_formated[0][1]];
                $key_value_formated[0][0] =~ s/<div.*?>.*?<\/div>//gm;
                $key_value_formated[0][0] =~ s/<span\s+data-text.*?>(.*?)<\/span>/$1/gm;
                $key_value_formated[0][0] =~ s/<span.*?>.*?<\/span>//gm;
                $key_value_formated[0][0] =~ s/<sup.*?>.*?<\/sup>//gm;
                $key_value_formated[0][0] =~ s/<code>(.*?)<\/code>.*/$1/;
                $key_value_formated[0][0] = entities_to_ascii($key_value_formated[0][0]);
                push(@config_quick_access,
                     {  'value'   => $key_value_formated[0][0],
                        'key'     => $key_value,
                        'section' => $section->[0]->{'id'},
                        'data'    => { category => $section->[0]->{'title'} }
                     });
            }

            # Remove undefined values which where previously discarded
            @{ $section->[0]->{'data'} } = grep(defined, @{ $section->[0]->{'data'} });

            # If section happened to be empty, remove it as well
            if (!scalar(@{ $section->[0]->{'data'} })) {
                delete $settings[$sections];
            } else {
                push(@sections, [$section->[0]->{'id'}, $section->[0]->{'title'}]);
            }
        }
    }
    return { 'sections'            => \@sections,
             'config_quick_access' => \@config_quick_access,
             'settings'            => \@settings,
             'excluded_options'    => \@excluded_options };
}

1;
