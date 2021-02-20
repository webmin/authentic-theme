// Theme options defaults

var
    // General options
    settings_background_color = 'gainsboro',
    settings_right_default_tab_usermin = 'mail',
    settings_right_virtualmin_default = 'sysinfo.cgi',
    settings_right_cloudmin_default = 'sysinfo.cgi',
    settings_right_reload = true,
    settings_document_title = 1,
    settings_cm_editor_palette = 'monokai',
    settings_global_palette_unauthenticated = 'light',

    // Dashboard and real-time monitoring
    settings_sysinfo_easypie_charts = true,
    settings_sysinfo_easypie_charts_size = 190,
    settings_sysinfo_easypie_charts_width = 3,
    settings_sysinfo_easypie_charts_scale = 10,
    settings_sysinfo_max_servers = 10,
    settings_sysinfo_real_time_status = true,
    settings_sysinfo_real_time_status_disk = true,
    settings_sysinfo_real_time_stored = true,
    settings_sysinfo_real_time_stored_length = 600,

    // Navigation menu options defaults
    settings_navigation_color = 'blue',
    settings_grayscale_level_navigation = '0',
    settings_sepia_level_navigation = '0',
    settings_saturate_level_navigation = '1.40',
    settings_hue_level_navigation = '0',
    settings_invert_level_navigation = '0',
    settings_brightness_level_navigation = '1',
    settings_contrast_level_navigation = '1',
    settings_navigation_always_collapse = false,
    settings_leftmenu_width = 260,
    settings_switch_rdisplay = false,
    settings_leftmenu_section_hide_refresh_modules = false,
    settings_leftmenu_section_hide_unused_modules = false,
    settings_collapse_navigation_link = true,
    settings_sysinfo_link_mini = false,
    settings_show_night_mode_link = true,
    settings_show_terminal_link2 = true,
    settings_favorites = true,
    settings_theme_options_button = true,
    settings_leftmenu_button_language = false,
    settings_leftmenu_button_refresh = false,
    settings_leftmenu_netdata = true,
    settings_leftmenu_user_html = '',
    settings_leftmenu_user_html_only_for_administrator = false,
    settings_leftmenu_custom_links = '',
    
    // Side slider options
    settings_side_slider_enabled = true,
    settings_side_slider_fixed = false,
    settings_side_slider_sysinfo_enabled = true,
    settings_side_slider_notifications_enabled = true,
    settings_side_slider_favorites_enabled = true,

    // Table options
    settings_right_hide_table_icons = false,
    settings_right_small_table_icons = false,
    settings_right_animate_table_icons = true,
    settings_right_grayscaled_table_icons = true,
    settings_table_init_datatables = 20000,

    // Hotkeys options defaults
    settings_hotkeys_active = true,
    settings_hotkey_toggle_modifier = 'altKey',
    settings_hotkey_toggle_key_webmin = 'w',
    settings_hotkey_toggle_key_virtualmin = 'v',
    settings_hotkey_toggle_key_cloudmin = 'c',
    settings_hotkey_toggle_key_usermin = 'u',
    settings_hotkey_toggle_key_webmail = 'm',
    settings_hotkey_shell2 = 'k',
    settings_hotkey_sysinfo = 'i',
    settings_hotkey_toggle_slider = 'n',
    settings_hotkey_favorites = 'f',
    settings_hotkey_focus_search = 's',
    settings_hotkey_reload = 'r',
    settings_hotkey_navigation = 'a',
    settings_hotkey_slider = 'e',
    settings_hotkey_toggle_key_night_mode = 'l',

    // Custom links hotkeys options defaults
    settings_hotkey_custom_1 = '',
    settings_hotkey_custom_2 = '',
    settings_hotkey_custom_3 = '',
    settings_hotkey_custom_4 = '',
    settings_hotkey_custom_5 = '',
    settings_hotkey_custom_6 = '',
    settings_hotkey_custom_7 = '',
    settings_hotkey_custom_8 = '',
    settings_hotkey_custom_9 = '',
    
    // Theme updates options defaults
    settings_sysinfo_theme_updates = false,
    settings_cache_interval = 86400,
    settings_sysinfo_theme_updates_for_usermin = true,

    // Default order for panels on Dashboard
    settings_sysinfo_panels_order = '{\'live_stats\':\'A\',\'acl_logins\':\'B\',\'status\':\'C\',\'status_services\':\'D\',\'net_net_info\':\'E\',\'ips\':\'F\',\'mount_disks_info\':\'F\',\'quota\':\'G\',\'bw\':\'I\',\'sysinfo\':\'H\',\'updates\':\'I\',\'ftypes\':\'J\',\'serial\':\'K\'}',

    // File Manager injectable options defaults
    config_portable_module_filemanager_records_per_page = 30,
    config_portable_module_filemanager_records_for_server_pagination = 1000,
    config_portable_module_filemanager_default_sort = 0,
    config_portable_module_filemanager_hide_tree_view = false,
    config_portable_module_filemanager_tree_expand_search = true,
    config_portable_module_filemanager_tree_view_depth = 2,
    config_portable_module_filemanager_tree_exclude_on_first_load = true,
    config_portable_module_filemanager_hide_actions = true,
    config_portable_module_filemanager_hide_toolbar = false,
    config_portable_module_filemanager_hovered_toolbar = false,
    config_portable_module_filemanager_calculate_size = true,
    config_portable_module_filemanager_force_tar = true,
    config_portable_module_filemanager_switch_user = true,
    config_portable_module_filemanager_remember_tabs = true,
    config_portable_module_filemanager_editor_maximized = false,
    config_portable_module_filemanager_view_limit = 512000,
    config_portable_module_filemanager_move_to_trash = false,


    // Locale defaults
    config_portable_theme_locale_language = false,
    config_portable_theme_locale_format_full = 'LLLL',
    config_portable_theme_locale_format_long = 'LL',
    config_portable_theme_locale_format_short = 'L',
    config_portable_theme_locale_format_time = 'LTS',
    config_portable_theme_locale_languages = null,

    // MySQL/PostgreSQL injectable module option
    config_portable_module_xsql_fit_content_screen_height = false,

    //
    // Options that are not presented on UI but could be controlled manually,
    // E.g. to change options below, you would need to open browser's console,
    // change an option boolean value and call `theme.config.save()` function.
    //
    settings_right_page_hide_persistent_vscroll = true,
    settings_hide_top_loader = false,
    settings_theme_make_date = true,
    settings_enable_container_offset = true,
    settings_contrast_mode = false,
    settings_show_theme_configuration_for_admins_only = false,
    settings_sysinfo_remember_accordions = true,
    settings_sysinfo_expand_all_accordions = false,
    settings_mail_ui = true,
    settings_mailbox_slash_delimiter = true,
    settings_leftmenu_vm_cm_dropdown_icons = true,
    settings_perform_content_scrolling = true,
    settings_sysinfo_csf_updates = true,

    // This option can be set to any absolute or relative path
    settings_usermin_default_module = 'sysinfo.cgi',

    // This option can be set to `nav`, `gray` or `white`
    settings_side_slider_palette = 'nav';
    //
    //
    //