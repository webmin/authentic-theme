// Theme options defaults

var
    // General defaults
    settings_right_default_tab_usermin = 'webmail',
    settings_right_virtualmin_default = 'index.cgi',
    settings_right_cloudmin_default = 'index.cgi',
    settings_right_page_keep = true,
    settings_right_reload = true,
    settings_document_title = 1,
    settings_cm_editor_palette = 'monokai',
    settings_global_palette_unauthenticated = 'light',
    settings_theme_config_admins_only_privileged = false,

    // Dashboard and real-time monitoring
    settings_sysinfo_easypie_charts = true,
    settings_sysinfo_easypie_charts_size = 196,
    settings_sysinfo_easypie_charts_width = 4,
    settings_sysinfo_easypie_charts_scale = 10,
    settings_sysinfo_max_servers = 10,
    settings_sysinfo_real_time_status = 1,
    settings_sysinfo_real_time_status_disk = true,
    settings_sysinfo_real_time_stored = true,
    settings_sysinfo_real_time_stored_length = 600,

    // Navigation menu options defaults
    settings_navigation_color = 'blue',
    settings_navigation_auto_fold_category = true,
    settings_grayscale_level_navigation = '0',
    settings_sepia_level_navigation = '0',
    settings_saturation_level_navigation = '1',
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
    settings_leftmenu_user_html_privileged = false,
    settings_leftmenu_custom_links = '',

    // Side slider options
    settings_side_slider_enabled = true,
    settings_side_slider_fixed = false,
    settings_side_slider_sysinfo_enabled = true,
    settings_side_slider_notifications_enabled = true,
    settings_side_slider_favorites_enabled = true,

    // Table options
    settings_right_table_links_type = 2,
    settings_right_table_animate_icons = false,
    settings_right_table_grayscaled_icons = true,

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
    settings_hotkey_custom_1_user = '',
    settings_hotkey_custom_2_user = '',
    settings_hotkey_custom_3_user = '',
    settings_hotkey_custom_4_user = '',
    settings_hotkey_custom_5_user = '',
    settings_hotkey_custom_6_user = '',
    settings_hotkey_custom_7_user = '',
    settings_hotkey_custom_8_user = '',
    settings_hotkey_custom_9_user = '',

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
    config_portable_module_filemanager_tree_expand_search = false,
    config_portable_module_filemanager_tree_view_depth = 3,
    config_portable_module_filemanager_tree_exclude_on_first_load = true,
    config_portable_module_filemanager_hide_actions = true,
    config_portable_module_filemanager_hide_toolbar = false,
    config_portable_module_filemanager_hovered_toolbar = false,
    config_portable_module_filemanager_calculate_size = true,
    config_portable_module_filemanager_force_tar = true,
    config_portable_module_filemanager_files_safe_mode = true,
    config_portable_module_filemanager_switch_users = true,
    config_portable_module_filemanager_remember_tabs = true,
    config_portable_module_filemanager_editor_maximized = false,
    config_portable_module_filemanager_editor_detect_encoding = true,
    config_portable_module_filemanager_editor_tabs_to_spaces = false,
    config_portable_module_filemanager_view_limit = 512000,
    config_portable_module_filemanager_checksum_limit = 1024000,
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
    settings_table_init_datatables = 20000,
    settings_right_page_hide_persistent_vscroll = true,
    settings_hide_top_loader = false,
    settings_theme_make_date = true,
    settings_enable_container_offset = true,
    settings_contrast_mode = false,
    settings_sysinfo_remember_accordions = true,
    settings_sysinfo_expand_all_accordions = false,
    settings_mail_ui = true,
    settings_mailbox_slash_delimiter = true,
    settings_leftmenu_vm_cm_dropdown_icons = true,
    settings_perform_content_scrolling = true,
    settings_sysinfo_query_timeout = 1000,
    settings_sysinfo_cpu_fans_base_rpm = 1000,
    settings_sysinfo_cpu_and_fans_side_slider_always_show = false,

    // Notifications related
    config_portable_notifications_self = true,

    // ConfigServer Security & Firewall related
    settings_sysinfo_csf_updates = true,
    settings_sysinfo_csf_temp_list_privileged = true,

    // File Manager related
    config_portable_module_filemanager_editor_tabs_to_spaces_number = "    ",

    // Control min and max time for branding to show in seconds
    settings_product_branding_show_time_min_privileged = 1,
    settings_product_branding_show_time_max_privileged = 6,

    // Embed default/custom favicons
    settings_embed_favicon_privileged = true,

    // This option can be set to any absolute or relative path
    settings_usermin_default_module = 'sysinfo.cgi',

    // This option can be set to `nav`, `gray` or `white`
    settings_side_slider_palette = 'nav',

    // Show splash screen upon login
    settings_embed_product_branding_privileged = true,

    // This option associates extra names for a given module/page to be searchable in autocomplete dropdown
    settings_autocomplete_extra_associations_privileged = {
        'en': [
            { 'acl': 'acl 2fa two-factor twofactor permissions modules permissions authentication' },
            { 'webmin': 'ssl lets encrypt let\'s encrypt 2fa two-factor twofactor install module tempdir language port address logging authentication cron schedule ip 10000' },
            { 'usermin': 'ssl lets encrypt let\'s encrypt 2fa two-factor twofactor authentication language port address 20000' },
            { 'apache': 'webserver httpd http https 80 443' },
            { 'bind8': '53 master slave zone' },
            { 'dovecot': 'mail 143 993 995' },
            { 'mysql': 'mysql mariadb 3306' },
            { 'postfix': 'mail queue smtp 25 587' },
            { 'proftpd': '21 ftp' },
            { 'sshd': '22 sftp' },
            { 'status': 'monitors' },
            { 'filemin': 'files nautilus krusader total double norton midnight commander mc far' },
            { 'firewalld': 'iptables' },
            { 'firewall': 'iptables' },
            { 'firewall6': 'iptables' },
            { 'fail2ban': 'jail brute-force bruteforce firewall iptables' },
            { 'net': 'routing gateways hostname dns /etc/hosts' },
            { 'fdisk': 'fdisk' },
            { 'lvm': 'lvm' },
            { 'csf': 'csf' },
            {
                'virtual-server': [
                    ['edit_limits', 'jail chroot allowed acl shell'],
                    ['rename_form', 'rename alter'],
                    ['edit_newmysqls', 'MySQL MariaDB'],
                    ['dkim', 'DKIM'],
                    ['edit_domdkim', 'DKIM'],
                    ['dnsclouds', 'AWS Amazon Route 53 Google Cloud DNS gcdns Cloudflare DNS'],
                    ['list_clouds', 'AWS Amazon S3 Rackspace Cloud Files Google Cloud Storage Dropbox Backblaze'],
                    ['edit_newvalidate', 'fix reset'],
                    ['list_scripts', 'wordpress roundcube whmcs phpmyadmin'],
                    ['list_users', 'new add password realname fullname email database permissions quota mail forwarding shell thunderbird outlook geary'],
                    ['edit_domain', 'domain update plan template password features dns website database mariadb mysql mail spam webalizer webmin login awstats'],
                    ['domain_form', 'new add domain'],
                    ['edit_newupgrade', 'support donate patron pay money buy shop license licence serial'],
                    ['migrate_form', 'cpanel ensim plesk lxadmin directadmin'],
                    ['cert_form', 'lets encrypt let\'s encrypt'],
                ]
            }
        ]
    };
//
//
//