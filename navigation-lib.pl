#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in,
     $root_directory,
     %gconfig,
     %gaccess,
     $base_remote_user,
     $remote_user,
     $theme_webprefix,
     %theme_text,
     %theme_config,
     $get_user_level,
     $http_x_url,
     $server_x_goto);

# Detects the state of navigation menu on initial load
# Returns navigation tab name and right page defaults
sub nav_detector
{
    # Get tab and dependent right page
    my $tab;
    my $page;

    # Get goto if the page been reloaded
    my $req_goto;
    if (!http_x_request()) {
        $req_goto = $server_x_goto;
    }

    my $prod    = get_product_name();
    my $mod_def = $gconfig{'gotomodule'};

    my $prd_cm           = "cloudmin";
    my $mod_cm           = "server-manager";
    my $mod_cm_available = foreign_available($mod_cm);

    my $prd_vm           = "virtualmin";
    my $mod_vm           = "virtual-server";
    my $mod_vm_available = foreign_available($mod_vm);

    my $prd_mb           = "webmail";
    my $mod_mb           = "mailbox";
    my $mod_mb_available = foreign_available($mod_mb);

    my $prd_db      = "dashboard";
    my $prd_db_mode = 0;

    my $page_sysinfo = "$theme_webprefix/sysinfo.cgi";
    my $nav_def_tab  = $theme_config{"settings_right_default_tab_$prod"};

    # If we have goto substitute default
    if ($req_goto) {
        if ($req_goto =~ /\/$mod_cm\//) {
            $nav_def_tab = $prd_cm;
        } elsif ($req_goto =~ /\/$mod_vm\//) {
            $nav_def_tab = $prd_vm;
        } elsif ($req_goto =~ /\/$mod_mb\//) {
            $nav_def_tab = $prd_mb;
        } else {
            $nav_def_tab = $prod;
        }

        # Page should be what was it reload on
        $page = $req_goto;
    }

    # If no goto and defaults not set
    else {
        if (!$nav_def_tab) {

            # Define default tab
            if ($mod_cm_available) {
                $nav_def_tab = $prd_cm;
            } elsif ($mod_vm_available) {
                $nav_def_tab = $prd_vm;
            } elsif ($mod_mb_available) {
                $nav_def_tab = $prd_mb;
            } else {
                $nav_def_tab = $prod;
            }
        }

        # If default set and if module available
        if (($nav_def_tab eq $prd_cm && !$mod_cm_available) ||
            ($nav_def_tab eq $prd_vm && !$mod_vm_available) ||
            ($nav_def_tab eq $prd_mb && !$mod_mb_available))
        {
            # This is the single product switch mode
            $nav_def_tab = $prd_db;
            $prd_db_mode = 1;
        }

        # Check if real product is set
        if ($nav_def_tab eq '/') {
            $nav_def_tab = $prod;
        }

        # Define default page for Webmin/Usermin
        if ($nav_def_tab eq $prod || $nav_def_tab eq $prd_db) {
            if ($mod_def) {
                $page        = "$theme_webprefix/$mod_def/index.cgi";
                $nav_def_tab = $prod;
            } else {
                $page        = $page_sysinfo;
                $nav_def_tab = $prd_db if ($prd_db_mode);
            }
        }

        # Define for modules
        else {
            my $prod_target =
              ($mod_cm_available && $nav_def_tab eq $prd_cm) ? $prd_cm :
              ($mod_vm_available && $nav_def_tab eq $prd_vm) ? $prd_vm :
              undef;

            if ($prod_target) {
                $page = $theme_config{"settings_right_${prod_target}_default"};
                if ($page eq 'index.cgi') {
                    $page =
                      ($mod_cm_available && $nav_def_tab eq $prd_cm) ? "$theme_webprefix/$mod_cm/index.cgi" :
                      ($mod_vm_available && $nav_def_tab eq $prd_vm) ? "$theme_webprefix/$mod_vm/index.cgi" :
                      $page_sysinfo;
                }

                # If set to domain/server id, try using it
                elsif ($page =~ /^(\d+)$/) {
                    my $id_ = "$1";
                    my $id;
                    if ($id_) {
                        if ($mod_cm_available && $nav_def_tab eq $prd_cm) {
                            $id = cloudmin_server_available($id_, 'id');
                        } elsif ($mod_vm_available && $nav_def_tab eq $prd_vm) {
                            $id = virtualmin_domain_available($id_, 'id');
                        }
                    }

                    # If current user has access to domain/server
                    if ($id) {
                        my $vm_file = $get_user_level eq '2' ? 'view_domain.cgi' : 'summary_domain.cgi';
                        $page =
                          $nav_def_tab eq $prd_cm ? "$theme_webprefix/$mod_cm/edit_serv.cgi?id=$id" :
                          $nav_def_tab eq $prd_vm ? "$theme_webprefix/$mod_vm/$vm_file?dom=$id" :
                          $page_sysinfo;
                    }

                    # Fallback to default for user
                    else {
                        $page = $page_sysinfo;
                    }
                }
            }

            # If it is not set assume dashboard
            else {
                $page = $page_sysinfo;
            }
        }

        # In case of Usermin
        if ($get_user_level eq '3') {
            if ($nav_def_tab eq $prod) {
                $page = $mod_def eq $mod_mb ? $page_sysinfo : "$theme_webprefix/$mod_def/index.cgi";
            } elsif ($nav_def_tab eq $prd_mb) {
                $page = "$theme_webprefix/$mod_mb/index.cgi?id=INBOX";
            }
        }
    }

    $tab  = $nav_def_tab;
    $page = $page;

    return ($tab, $page);
}

sub nav_webmin_menu
{
    my ($page) = @_;
    my $rv;
    $rv = nav_search();

    my @menus  = list_modules_webmin_menu();
    my $unused = $theme_config{'settings_leftmenu_section_hide_unused_modules'} eq 'true';
    my $extra_links;

    foreach my $menu (@menus) {
        next if ($menu->{'id'} eq 'unused' && $unused);
        $rv .= nav_cat($menu->{'id'}, $menu->{'desc'});
        $rv .= "<li class=\"sub-wrapper\"><ul class=\"sub\" style=\"display: none;\" id=\"$menu->{'id'}\">\n";
        foreach my $module (@{ $menu->{'members'} }) {
            $rv .= nav_cat_link("$theme_webprefix/$module->{'id'}/", $module->{'desc'});
            if (!$extra_links++) {
                if ($get_user_level eq '0' || $theme_config{'settings_theme_config_admins_only_privileged'} ne 'true') {
                    $rv .= nav_cat_link("$theme_webprefix/tconfig.cgi",
                                        $theme_text{'settings_right_theme_left_configuration_title'}, 'hidden');
                }
                if ($get_user_level eq '0') {
                    $rv .= nav_cat_link("$theme_webprefix/settings-editor_read.cgi",
                                        $theme_text{'settings_right_theme_left_extensions_title'}, 'hidden');
                    $rv .=
                      nav_cat_link("$theme_webprefix/settings-logos.cgi",
                                   $theme_text{'settings_right_theme_left_logo_title'}, 'hidden');
                    $rv .= nav_cat_link("$theme_webprefix/settings-backgrounds.cgi",
                                        $theme_text{'settings_right_theme_left_background_title'}, 'hidden');
                }
            }
        }
        $rv .= "</ul></li>\n";
    }
    if (&foreign_available("webmin") &&
        $theme_config{'settings_leftmenu_section_hide_refresh_modules'} ne 'true')
    {
        $rv .= nav_menu_link('/webmin/refresh_modules.cgi', $theme_text{'left_refresh_modules'}, 'fa-refresh');
    }
    $rv .= nav_link_sysinfo($get_user_level eq '3');
    $rv .= nav_link_netdata();
    $rv .= nav_theme_links();
    $rv .= nav_links();
    $rv .= nav_detect_page($page);
    $rv .= nav_detect_script();
    return $rv;
}

sub nav_virtualmin_menu
{
    my ($page) = @_;
    my ($rv, $login_mode);
    my $mod  = 'virtual-server';
    my $def  = nav_get_server_id($mod);
    my @menu = list_combined_webmin_menu({ 'dom' => "$def" }, \%in, $mod);
    ($rv, $login_mode) = nav_list_combined_menu([$mod], \@menu, undef, undef, $page);
    $rv .= nav_link_sysinfo();
    $rv .= nav_link_sysstat();
    $rv .= nav_links($login_mode);
    $rv .= nav_detect_page($page);
    $rv .= nav_detect_script();
    return $rv;
}

sub nav_cloudmin_menu
{
    my ($page) = @_;
    my ($rv, $login_mode);
    my $mod  = 'server-manager';
    my $def  = nav_get_server_id($mod);
    my @menu = list_combined_webmin_menu({ 'id' => "$def" }, \%in, $mod);
    ($rv, $login_mode) = nav_list_combined_menu([$mod], \@menu, undef, undef, $page);
    $rv .= nav_link_sysinfo();
    $rv .= nav_links($login_mode);
    $rv .= nav_detect_page($page);
    $rv .= nav_detect_script();
    return $rv;
}

sub nav_mailbox_menu
{
    my ($page) = @_;
    my $rv;
    my $mod       = 'mailbox';
    my $nofolders = $theme_config{'settings_mail_ui'} ne 'false' ? 1 : 0;
    my @menu      = list_combined_webmin_menu({ 'nofolders' => $nofolders });
    ($rv) = nav_list_combined_menu([$mod, 'changepass'], \@menu, undef, undef, $page);
    $rv .= nav_menu_link("/uconfig.cgi?$mod", $theme_text{'theme_left_mail_prefs'}, 'fa-cog');
    $rv .= nav_link_sysinfo('user');
    $rv .= nav_links();
    $rv .= nav_detect_page($page);
    $rv .= nav_detect_script();
    return $rv;
}

sub nav_menu
{
    my ($tab, $page) = nav_detector();
    my $rv;

    if ($tab eq 'virtualmin') {
        $rv = nav_virtualmin_menu($page);
    } elsif ($tab eq 'cloudmin') {
        $rv = nav_cloudmin_menu($page);
    } elsif ($tab eq 'webmail') {
        $rv = nav_mailbox_menu($page);
    } else {
        $rv = nav_webmin_menu($page);
    }
    return $rv;
}

sub nav_get_server_id
{
    my ($module) = @_;
    my $default;

    # Try to find default
    my $module_ =
      $module eq 'virtual-server' ? 'virtualmin' :
      $module eq 'server-manager' ? 'cloudmin' :
      $module;

    if ($theme_config{ 'settings_right_' . $module_ . '_default' } =~ /^(\d+)$/) {
        $default = "$1";
    }

    # If we have goto substitute default
    if ($server_x_goto =~ /\/$module\// &&
        ($server_x_goto =~ /dom=(\d+)/ || $server_x_goto =~ /id=(\d+)/))
    {
        my $id_ = "$1";
        if ($id_ =~ /^(\d+)$/) {
            $default = $id_;
        }
    }
    return $default;
}

sub nav_detect_page
{
    my ($page) = @_;
    my $rv;
    if ($page) {
        $page = quote_escape($page);
        $page =~ s/&amp;/&/g;
        $rv .= "<li data-goto=\"$page\" class=\"hidden\"></li>\n";
    }
    return $rv;
}

sub nav_detect_script
{
    # Get goto hidden li element
    my $rv;
    if ($server_x_goto) {
        my $link = quote_escape($server_x_goto);
        $link =~ s/&amp;/&/g;
        $rv =
"<li data-script-goto><script>plugins.navigation.detect(\"$link\");plugins.navigation.detect(\"$link\", 1);\$(\"li[data-script-goto]\").remove();</script></li>\n";
    }
    return $rv;
}

sub nav_menu_link
{
    my ($link, $text, $icon, $hidden, $after) = @_;
    if ($icon !~ /\s+/) {
        $icon = "fa fa-fw $icon";
    }
    if ($after) {
        $after = " data-after";
    }
    if ($hidden) {
        $hidden = " hidden";
    }
    return
"<li data-linked$after><a href=\"$theme_webprefix$link\" class=\"navigation_module_trigger$hidden\"><i class=\"$icon\"></i> <span>$text</span></a></li>\n";
}

sub nav_cat_link
{
    my ($link, $label, $hidden) = @_;
    my $rv;
    $rv = '<li data-linked' . ($hidden && ' class="hidden"') . '>' . "\n";
    $rv .= '<a' . ($hidden && ' data-parent-hidden') . ' href="' .
      (($link !~ /^\// && $link !~ /^http/) ? ('/' . $link) : $link) . '"> ' . $label . '</a>' . "\n";
    $rv .= "</li>\n";
    return $rv;
}

sub nav_cat
{
    my ($c, $label) = @_;
    my %icon_table = ('webmin'            => 'fa-cog',
                      'usermin'           => 'fa-cog',
                      'settings'          => 'fa-cog',
                      'global_setting'    => 'fa-cog',
                      'cat_settings'      => 'fa-cog',
                      'system'            => 'fa2 fa2-system',
                      'cat_system'        => 'fa2 fa2-system',
                      'servers'           => 'fa2 fa2-server',
                      'other'             => 'fa2 fa2-tools',
                      'info'              => 'fa-info',
                      'hardware'          => 'fa2 fa2-disk',
                      'global_hardware'   => 'fa2 fa2-disk',
                      'global_storage'    => 'fa2 fa2-disk',
                      'cluster'           => 'fa2 fa2-cluster',
                      'global_cluster'    => 'fa-power-off',
                      'unused'            => 'fa-puzzle-piece',
                      'global_unused'     => 'fa-puzzle-piece',
                      'mail'              => 'fa2 fa2-email scaled1_5',
                      'global_mail'       => 'fa2 fa2-email scaled1_5',
                      'email'             => 'fa2 fa2-email scaled1_5',
                      'global_email'      => 'fa2 fa2-email scaled1_5',
                      'login'             => 'fa-user',
                      'global_login'      => 'fa-user',
                      'apps'              => 'fa2 fa2-server',
                      'global_apps'       => 'fa2 fa2-server',
                      'custom'            => 'fa2 fa2-system',
                      'global_custom'     => 'fa2 fa2-system',
                      'net'               => 'fa2 fa2-network',
                      'ip'                => 'fa2 fa2-network',
                      'global_ip'         => 'fa2 fa2-network',
                      'check'             => 'fa-user-md',
                      'global_check'      => 'fa-user-md',
                      'add'               => 'fa-plus',
                      'global_add'        => 'fa-plus',
                      'backup'            => 'fa-backup fa-1_15x',
                      'global_backup'     => 'fa-backup fa-1_15x',
                      'global_server',    => 'fa-cogs',
                      'cat_server',       => 'fa-cogs',
                      'global_system'     => 'fa-cogs',
                      'global_delete'     => 'fa-plug',
                      'cat_delete'        => 'fa-plug',
                      'global_logs'       => 'fa-file-text',
                      'cat_logs'          => 'fa-file-text',
                      'global_services'   => 'fa-puzzle-piece',
                      'cat_services'      => 'fa-puzzle-piece',
                      'create_new'        => 'fa-plus',
                      'create_add'        => 'fa-plus',
                      'create_create'     => 'fa-server-add',
                      'global_gce'        => 'fa-google',
                      'global_ec2'        => 'fa2 fa2-amazon scaled1_5',
                      'global_hosts'      => 'fa-globe',
                      'global_virtualmin' => 'fa-virtualmin scaled1_5',
                      'global_owners'     => 'fa-users',
                      'global_monitor'    => 'fa2 fa2-system',
                      'global_settings'   => 'fa-cloud',
                      'cat_manage'        => 'fa2 fa2-tools',
                      'cat_res'           => 'fa-share-alt',
                      'global_admin'      => 'fa-key',
                      'cat_admin'         => 'fa-key',
                      'global_power'      => 'fa-power-off',
                      'cat_power'         => 'fa-power-off',);

    my $icon = $icon_table{$c} || 'fa-link';
    if ($label) {
        my $rv;

        # Show link to close or open catgory
        $rv = "<li class=\"has-sub\">\n";
        $rv .= "<a data-has-sub-link href=\"#$c\">";
        $rv .= "<i class=\"fa $icon fa-fw\"></i> <span>$label</span></a>\n";
        $rv .= '</li>' . "\n";
        return $rv;
    }
}

sub nav_search
{
    my $rv = "<li><br></li>";
    if (-r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'}) {
        $rv = "<li class=\"menu-container search-form-container\">\n";
        $rv .= "<form id=\"webmin_search_form\" action=\"$theme_webprefix/webmin_search.cgi\" role=\"search\">\n";
        $rv .= "<div class=\"form-group\">\n";
        $rv .= "<i class=\"fa fa-search\"></i>\n";
        $rv .=
"<input type=\"text\" class=\"form-control sidebar-search\" name=\"search\" placeholder=\"$theme_text{'left_search'}\">\n";
        $rv .= "</div>\n";
        $rv .= "</form>\n</li>\n";
    }
    return $rv;
}

sub nav_link_sysinfo
{
    my ($user) = @_;
    return
      nav_menu_link('/sysinfo.cgi',
                    $user ? $theme_text{'body_header1'} : $theme_text{'theme_xhred_titles_dashboard'},
                    ($user ? 'fa-user-circle' : 'fa-dashboard'),
                    $theme_config{'settings_sysinfo_link_mini'} eq 'true', 1)
      if (dashboard_switch() ne '1');

}

sub nav_link_sysstat
{
    my $link;
    if ($get_user_level eq '0') {
        if (-d $root_directory . "/virtual-server/pro/timeplot") {
            $link = 'virtual-server/pro';
        } elsif (-d $root_directory . "/server-manager/timeplot") {
            $link = 'server-manager';
        }
        if ($link) {
            return nav_menu_link("/$link/history.cgi", $theme_text{'left_statistics'}, 'fa-area-chart', 0, 1);
        }
    }
}

sub nav_link_netdata
{
    my $link;
    if ($get_user_level eq '0') {
        if (has_command('netdata') &&
            $theme_config{'settings_leftmenu_netdata'} ne 'false')
        {
            ($theme_config{'settings_leftmenu_netdata_link'} ? ($link = $theme_config{'settings_leftmenu_netdata_link'}) :
               ($link = 'http://' . get_system_hostname() . ':19999'));
        }
        if ($link) {
            my $rv;
            $rv = "<li data-after class=\"leftmenu_netdata_link\">\n";
            $rv .= "<a target=\"_blank\" href=\"$link\" class=\"navigation_external_link leftmenu_netdata_link\">\n";
            $rv .= "<i class=\"fa fa-fw fa-line-chart\"></i> <span>$theme_text{'left_netdata'}</span>\n";
            $rv .= "</a></li>\n";
            return $rv;
        }
    }
}

sub nav_theme_links
{
    my $extra = $theme_config{'settings_leftmenu_custom_links'};
    my $rv    = "";
    if ($extra) {
        $extra = replace('\'', '"', un_urlize($extra, 1));
        if ($extra && $extra =~ m/"extra":/) {
            my ($extra) = $extra =~ /\{(?:\{.*\}|[^{])*\}/sg;
            my $extra_json = convert_from_json($extra);
            foreach my $e (@{ $extra_json->{'extra'} }) {
                if (length($e->{"link"}) && (!length($e->{"level"}) || string_contains($e->{"level"}, $get_user_level))) {
                    my $target = $e->{"target"};
                    if ($target) {
                        $target = " target=\"$target\"";
                    }
                    if ($e->{"port"}) {
                        my $host = get_env('http_host');
                        $host =~ s/:(\d+)$/:$e->{'port'}/;
                        $e->{"link"} = "//$host$e->{'link'}";
                    }
                    my $type = string_contains($e->{'link'}, '&#47;&#47') ? '' : 'data-linked';
                    my $type_class = $type ? "navigation_module_trigger" : "navigation_external_link";
                    $rv .= '<li ' . $type . ' data-after><a ' . $target . ' href="' .
                      $e->{"link"} . '" class="' . $type_class . '"><i class="fa fa-fw fa-' . $e->{"icon"} . '"></i> <span>';
                    utf8::encode($e->{'title'});
                    $rv .= $e->{'title'};
                    $rv .= '</span></a></li>';
                }
            }
        }
    }
    return $rv;
}

# Return HTML menu structure for given module
sub nav_list_combined_menu
{
    my ($modules, $items, $id, $group, $page) = @_;
    my $nav_pos;
    my $extra_links;
    my $login_mode;

    my $rv;
    my $gwp = sub {
        my ($link) = @_;

        # Link could but shouldn't end with just &
        $link =~ s/&amp;$//;

        if ($link) {
            if (!string_starts_with($link, "http") &&
                !string_starts_with($link, "ftp") &&
                !string_starts_with($link, "www"))
            {
                $link = "/$link" if (!string_starts_with($link, "/"));
                $link = "$theme_webprefix$link";
            }
        }
        return $link;
    };
    foreach my $item (@$items) {
        if ((grep {$_ eq $item->{'module'}} @{$modules}) || $group) {

            my $link = &$gwp($item->{'link'});
            my $icon;

            if ($item->{'type'} eq 'item' &&
                $link !~ /virtual-server\/pro\/history\.cgi/)
            {

                # Define an icon for the link/accordion
                if ($link =~ /virtual-server\/index\.cgi/ ||
                    $link =~ /server-manager\/index\.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa-tasks"></i>';
                } elsif ($link =~ /\/virtual-server\/edit_newvalidate\.cgi/ &&
                         $get_user_level ne '0')
                {
                    $icon = '<i class="fa fa-fw fa-user-md"></i>';
                } elsif ($link =~ /mailbox\/list_folders\.cgi/ ||
                         $link =~ /mailbox\/list_ifolders\.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa-folder"></i>';
                } elsif ($link =~ /mailbox\/list_addresses\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-address-book"></i>';
                } elsif ($link =~ /filter\/edit_forward\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-share"></i>';
                } elsif ($link =~ /filter\/edit_auto\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-reply-all"></i>';
                } elsif ($link =~ /filter/) {
                    $icon = '<i class="fa fa-fw fa-filter"></i>';
                } elsif ($link =~ /mailbox\/edit_sig\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-pencil"></i>';
                } elsif ($link =~ /mailbox\/index\.cgi?id=/) {
                    $icon = '<i class="fa fa-fw fa-folder-o"></i>';
                }
                if ($get_user_level == 1) {
                    if ($link =~ /\/virtual-server\/edit_pass\.cgi/ &&
                        $link !~ /\/virtual-server\/edit_pass\.cgi\?/)
                    {
                        $icon = '<i class="fa fa-fw fa-key"></i>';
                    } elsif ($link =~ /\/virtual-server\/edit_newplan\.cgi/) {
                        $icon = '<i class="fa fa-fw fa-list"></i>';
                    } elsif ($link =~ /\/virtual-server\/edit_newresels\.cgi/) {
                        $icon = '<i class="fa fa-fw fa-cog"></i>';
                    } elsif ($link =~ /\/virtual-server\/bwgraph\.cgi/ && $id ne 'cat_logs') {
                        $icon = '<i class="fa fa-fw fa-line-chart"></i>';
                    }
                }

                if ($link =~ /\/virtual-server\/domain_form\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-server-add"></i>';

                } elsif ($link =~ /\/virtual-server\/edit_domain\.cgi/ ||
                         $link =~ /\/server-manager\/edit_serv\.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa2 fa2-settings"></i>';
                } elsif ($link =~ /\/virtual-server\/view_domain\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-info-circle"></i>';

                } elsif ($link =~ /\/virtual-server\/list_users\.cgi/) {
                    $icon = '<i class="fa fa-fw fa2 fa2-users-cog"></i>';
                } elsif ($link =~ /\/virtual-server\/list_aliases\.cgi/) {
                    $icon = '<i class="fa fa-fw fa2 fa2-maillist"></i>';
                } elsif ($link =~ /\/virtual-server\/list_databases\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-database"></i>';
                } elsif ($link =~ /\/virtual-server\/list_scripts\.cgi/ ||
                         $link =~ /\/server-manager\/mass_update_form\.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa-update scaled1"></i>';
                } elsif ($link =~ /\/filemin\/index\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-file-manager scaled2"></i>';

                } elsif ($link =~ /\/virtual-server\/edit_html\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-globe"></i>';
                } elsif ($link =~ /\/server-manager\/edit_pass\.cgi/ ||
                         $link =~ /\/virtual-server\/edit_pass\.cgi$/ ||
                         $link =~ /\/changepass\/$/)
                {
                    $icon = '<i class="fa fa-fw fa-key"></i>';
                } elsif ($link =~ /\/server-manager\/save_serv\.cgi/ && $link =~ /recheck=1/) {
                    $icon = '<i class="fa fa-fw fa-exclamation-triangle"></i>';
                } elsif ($link =~ /\/server-manager\/create_form\.cgi/ && !$group) {
                    $icon = '<i class="fa fa-fw fa-server-add"></i>';
                } elsif ($link =~ /\/server-manager\/save_serv\.cgi/) {
                    if ($link =~ /refresh=1/) {
                        $icon = '<i class="fa fa-fw fa-refresh"></i>';
                    } elsif ($link =~ /regen=1/) {
                        $icon = '<i class="fa fa-fw fa-retweet"></i>';
                    }
                } elsif ($link =~ /^http:\/\// ||
                         $link =~ /^https:\/\// ||
                         $link =~ /^ftp:\/\//   ||
                         $link =~ /^ftps:\/\//)
                {
                    $icon = '<i class="fa fa-fw fa-external-link"></i>';
                } elsif ($link =~ /\/\.\.\/servers\/link\.cgi/) {
                    $icon = '<i class="fa fa-fw fa-webmin scaled1_5"></i>';
                }

                # Print Virtual Server Summary link
                my $print_server_summary = sub {
                    my ($dom_id) = @_;
                    return '<li data-linked><a target="page" class="navigation_module_trigger" href="' .
                      $theme_webprefix . '/virtual-server/summary_domain.cgi?dom=' .
                      $dom_id . '"><i class="fa fa-fw fa-info-circle"></i> <span>' .
                      $theme_text{'right_vm_server_summary'} . '</span></a></li>' . "\n";
                };
                if (($get_user_level eq '0' || $get_user_level eq '1') &&
                    $link =~ /\/virtual-server\/domain_form\.cgi/ &&
                    virtualmin_domain_available_count())
                {
                    my $dom_id = $item->{'link'};
                    $dom_id =~ /gparent=(\d+)/;
                    $dom_id = $1;
                    if ($dom_id) {
                        $rv .= &$print_server_summary($dom_id);
                    }
                }

                # Set variable in case it hasn't been set before
                if (!length $link) {
                    $icon = undef;
                }

                $rv .= '<li data-linked'
                  .
                  ( $item->{'target'} ? ' class="navigation_external"' :
                      ''
                  ) .
                  '>' . "\n";
                $rv .=
                  '<a ' .
                  ($link !~ /switch_user/ ? ' target="' . ($item->{'target'} ? '_blank' : 'page') . '" ' : '') . ' '
                  .
                  ( (!$group && !$item->{'target'}) ? "class=\"navigation_module_trigger\" " :
                      ''
                  ) .
                  'href="' . $link . '">' .
                  ($icon =~ /<i/ ? $icon : '') . ' <span>' . $item->{'desc'} . '</span></a>' . "\n";
                $rv .= '</li>' . "\n";
                $rv .= "\n";

            } elsif ($item->{'type'} eq 'html') {
                $rv .= '<li class="menu-container menu-status"><span class="badge"><i class="fa2 fa-fw fa2-pulsate"></i>' .
                  $item->{'html'} . '</span></li>';
            } elsif ($item->{'type'} eq 'text' && $item->{'desc'}) {
                if ($login_mode++ == 1) {
                    $login_mode =
"<span><strong>$theme_text{'theme_global_access_level'}</strong>:&nbsp;&nbsp;<em>@{[html_escape($item->{'desc'})]}</em></span>";
                }
            } elsif ($item->{'type'} eq 'cat') {

                # Skip printing Webmin category because there is a switch for it
                if ($item->{'id'} eq 'cat_webmin' && $get_user_level eq '2') {
                    next;
                }
                $rv .= nav_cat($item->{'id'}, $item->{'desc'});
                $rv .= '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="' . $item->{'id'} . '">' . "\n";
                my ($rvx) = nav_list_combined_menu([$item->{'module'}], $item->{'members'}, $item->{'id'}, 'group');
                $rv .= $rvx;

                if (($item->{'id'} eq 'global_setting' || $item->{'id'} eq 'global_settings') &&
                    $get_user_level eq '0' &&
                    !$extra_links++)
                {
                    $rv .= nav_cat_link($theme_webprefix . "/tconfig.cgi",
                                        $theme_text{'settings_right_theme_left_configuration_title'}, 'hidden');
                    $rv .= nav_cat_link($theme_webprefix . "/settings-editor_read.cgi",
                                        $theme_text{'settings_right_theme_left_extensions_title'}, 'hidden');
                    $rv .= nav_cat_link($theme_webprefix . "/settings-logos.cgi",
                                        $theme_text{'settings_right_theme_left_logo_title'}, 'hidden');
                    $rv .= nav_cat_link($theme_webprefix . "/settings-backgrounds.cgi",
                                        $theme_text{'theme_xhred_settings_right_theme_bgs_title'}, 'hidden');

                    if (check_pro_package('vm') eq '1' &&
                        $item->{'module'} eq 'virtual-server')
                    {
                        $rv .=
                          nav_cat_link($theme_webprefix . "/virtual-server/licence.cgi", $theme_text{'right_vlcheck'}, 1);
                    }

                    if (check_pro_package('cm') eq '1' &&
                        $item->{'module'} eq 'server-manager')
                    {
                        $rv .=
                          nav_cat_link($theme_webprefix . "/server-manager/licence.cgi", $theme_text{'right_slcheck'}, 1);
                    }

                } elsif ($get_user_level ne '0' &&
                         $theme_config{'settings_theme_config_admins_only_privileged'} ne 'true' &&
                         !$extra_links++)
                {
                    $rv .= nav_cat_link($theme_webprefix . "/tconfig.cgi",
                                        $theme_text{'settings_right_theme_left_configuration_title'}, 1);
                }
                $rv .= "</ul></li>\n";
            } elsif ($item->{'type'} eq 'hr') {
                if ($nav_pos++ eq '1') {
                    $rv .= nav_search();
                }
            } elsif (($item->{'type'} eq 'menu' || $item->{'type'} eq 'input') &&
                     $item->{'module'} ne 'mailbox')
            {

                # For with an input of some kind
                if ($item->{'cgi'}) {
                    $rv .= "<li class=\"menu-container\"><form action='$item->{'cgi'}'>\n";
                } else {
                    $rv .= "<li class=\"menu-container\"><form>\n";
                }
                foreach my $h (@{ $item->{'hidden'} }) {
                    $rv .= ui_hidden(@$h);
                }

                $rv .= $item->{'desc'}, "\n";
                if ($item->{'type'} eq 'menu' || $item->{'type'} eq 'input') {
                    if ($item->{'name'} eq 'dname' && $item->{'module'} eq 'virtual-server') {

                        # Force select type
                        $item->{'name'}  = 'dom';
                        $item->{'value'} = $item->{'domid'};

                        # Regenerate data for select
                        $item->{'menu'} = [
                            map {
                                [$_->{'id'},
                                 virtual_server::shorten_domain_name($_),
                                 "title=\"" . virtual_server::show_domain_name($_) . "\""]
                              }
                              grep {virtual_server::can_edit_domain($_)}
                              sort {$a->{'dom'} cmp $b->{'dom'}} virtual_server::list_domains()];
                    }
                    my $data_title =
                      $item->{'module'} eq 'virtual-server' ? $theme_text{'right_fdoms'} : $theme_text{'right_fvm2'};
                    my $select_width = ($theme_config{'settings_leftmenu_width'} - 11 * 2);
                    my $style        = "data-autocomplete-title=\"$data_title\" style=\"width:${select_width}px;\"";

                    # Build select menu
                    $rv .= ui_select($item->{'name'}, $item->{'value'}, $item->{'menu'}, 1, 0, 0, 0, $style);
                }
                $rv .= "</form></li>\n";
            }
        }
    }
    return ($rv, $login_mode);
}

# Returns a list of tiny square buttons for navigation menu
sub nav_links
{
    my ($login_mode) = @_;
    my $rv;
    $rv =
      '<ul class="user-links"><li data-collapse-trigger-container data-linked' .
      get_button_tooltip('theme_xhred_tooltip_navigation_pinned', 'settings_hotkey_navigation', 'auto top') .
      ' class="user-link cursor-pointer' .
      ($theme_config{'settings_collapse_navigation_link'} eq 'false' && ' hidden') . '">';
    $rv .=
'<span class="pd-lf-rt-6"><i data-collapse-trigger="1" class="fa fa2 fa-fw fa2-collapse-left vertical-align-middle"></i></span>';
    $rv .= '</li>';

    if ($theme_config{'settings_sysinfo_link_mini'} eq 'true' &&
        dashboard_switch() ne '1')
    {
        $rv .= '<li data-linked' .
          get_button_tooltip('theme_xhred_titles_dashboard', 'settings_hotkey_sysinfo', 'auto top') . ' class="user-link">';
        $rv .=
          '<a class="menu-exclude-link sidebar_sysinfo_link" href="' .
          $theme_webprefix . '/sysinfo.cgi"><i class="fa fa-fw fa-' .
          ($get_user_level eq '3' ? 'user-circle' : 'dashboard') . '"></i></a>';
        $rv .= '</li>';
    }

    $rv .=
      '<li data-linked' .
      get_button_tooltip('theme_tooltip_night_mode', 'settings_hotkey_toggle_key_night_mode', 'auto top') .
      ' class="user-link palette-toggle cursor-pointer'
      .
      ( $theme_config{'settings_show_night_mode_link'} ne 'false' ? '' :
          ' hidden'
      ) .
      '">';
    $rv .= '<span><i class="fa fa-fw ' . (theme_night_mode() ? 'fa-sun vertical-align-middle' : 'fa-moon') . '"></i></span>';
    $rv .= '</li>';

    if ($theme_config{'settings_show_terminal_link2'} ne 'false' &&
        foreign_available("shell"))
    {
        $rv .= '<li data-linked' . get_button_tooltip('theme_tooltip_terminal_link2', 'settings_hotkey_shell2', 'auto top') .
          ' class="user-link ported-console cursor-pointer">';
        $rv .= '<span class="pd-rt-4"><i class="fa fa-fw fa-terminal"></i></span>';
        $rv .= '</li>';
    }

    $rv .=
      '<li data-linked' . get_button_tooltip('left_favorites', 'settings_hotkey_favorites', 'auto top') .
      ' class="user-link favorites cursor-pointer' .
      ($theme_config{'settings_favorites'} ne 'false' ? '' : ' hidden') . '">';
    $rv .= '<span class="pd-rt-4"><i class="fa fa-fw fa-star"></i></span>';
    $rv .= '</li>';

    if (($get_user_level eq '0' && $theme_config{'settings_theme_options_button'} ne 'false') ||
        ($get_user_level ne '0' &&
            $theme_config{'settings_theme_config_admins_only_privileged'} ne 'true' &&
            $theme_config{'settings_theme_options_button'} ne 'false'))
    {
        $rv .= '<li data-linked class="user-link theme-options cursor-pointer">';
        my $tooltip = get_button_tooltip('settings_title', undef, 'auto top');
        $rv .= '<a' . $tooltip . ' class="menu-exclude-link" href="' . $theme_webprefix .
          '/tconfig.cgi" data-href="' . $theme_webprefix . '/tconfig.cgi"><i class="fa2 fa-fw fa2-palette"></i></a>';
        $rv .= '</li>';
    }

    if (&foreign_available("change-user") &&
        $theme_config{'settings_leftmenu_button_language'} eq 'true')
    {
        $rv .=
          '<li data-linked' . get_button_tooltip('theme_xhred_title_language_locale', undef, 'auto top') .
          ' class="user-link"><a class="menu-exclude-link pd-rt-4" href="' .
          $theme_webprefix . '/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
    }

    $rv .= '<li class="user-link user-link-acl">';
    my $foreign_acl = &foreign_available("acl");
    my $user_mode   = get_product_name() eq 'usermin';
    my $edit_user =
      ($foreign_acl ? ("<hr class='hr-no-margin hr-darker'>" . $theme_text{'theme_tooltip_edit_user'}) : undef);
    my $title_proc;
    if (!$user_mode && $login_mode && $login_mode !~ /^\d+$/) {
        $title_proc = $login_mode . $edit_user;
    } else {
        $title_proc =
          $foreign_acl ? $theme_text{'theme_tooltip_edit_user'} :
          ( get_product_name() eq 'usermin' ?
"<span><strong>$theme_text{'theme_global_access_level'}</strong>:&nbsp;&nbsp;<em>$theme_text{'theme_global_user_mode'}</em></span>"
            :
              undef);
    }
    my $user_title = get_button_tooltip($title_proc, undef, 'auto top', 1, undef, "aside .user-link");

    if ($foreign_acl) {
        $rv .=
          '<a' . $user_title . ' class="menu-exclude-link" data-href="' .
          $theme_webprefix . '/acl/edit_user.cgi" href="' . $theme_webprefix . '/acl/edit_user.cgi?user=' .
          (get_env('base_remote_user') eq "root" ? "root" : $remote_user) . '"><i class="fa2 fa-fw ' .
          get_user_icon() . ' vertical-align-baseline"></i>&nbsp;<span>' . $remote_user . '</span></a>';
    } else {
        $rv .=
          '<a ' . $user_title . ' class="menu-exclude-link cursor-default no-hover"><i class="fa2 fa-fw ' . get_user_icon() .
          ' vertical-align-baseline"></i>&nbsp;<span class="pointer-events-none">' . $remote_user . '</span></a>';
    }
    $rv .= '</li>';

    my %miniserv;
    &get_miniserv_config(\%miniserv);

    if ($miniserv{'logout'} &&
        !get_env('ssl_user') &&
        get_env('http_user_agent') !~ /webmin/i)
    {
        # no warnings 'once';

        $rv .= '<li class="user-link __logout-link">';
        if ($main::session_id) {
            $rv .=
              '<a data-nref' .
              get_button_tooltip('theme_tooltip_logout', undef, 'auto top') . ' class="menu-exclude-link pd-rt-4" href="' .
              $theme_webprefix . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out text-danger"></i></a>';
        } else {
            $rv .=
              '<a data-nref' . get_button_tooltip('theme_xhred_tooltip_switch_user', undef, 'auto top') .
              ' class="menu-exclude-link pd-rt-4" href="' .
              $theme_webprefix . '/switch_user.cgi"><i class="fa fa-fw fa-exchange text-danger"></i></a>';
        }
        $rv .= '</li>';
    }

    $rv .=
      '<li data-linked' .
      get_button_tooltip('theme_xhred_filemanager_context_refresh', 'settings_hotkey_reload', 'auto top') .
      ' class="user-link' . ($theme_config{'settings_leftmenu_button_refresh'} ne 'true' && ' hidden') .
'"><a class="menu-exclude-link pd-rt-4" data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';
    $rv .= '</ul>';
    $rv .= "\n";
    return $rv;
}

# XXX - needs further refactor
sub print_switch_webmin
{
    my ($tab)   = @_;
    my $prod    = get_product_name();
    my $checked = 0;
    if ($tab eq $prod) {
        $checked = 1;
    }

    print '<input class="dynamic" id="open_' . $prod . '" name="product-switcher" type="radio"' .
      ($checked ? " checked" : "") . '>
        <label'
      . get_button_tooltip(
                           (get_product_name() eq 'usermin' ? 'theme_xhred_titles_um' :
                              'theme_xhred_titles_wm'
                           ),
                           'settings_hotkey_toggle_key_' . get_product_name() . '',
                           'auto bottom'
      ) .
      ' for="open_' . get_product_name() . '">
                <i class="wbm-webmin wbm-sm"></i><span>'
      . (&get_product_name() eq 'webmin' ? $theme_text{'theme_xhred_titles_wm'} :
           $theme_text{'theme_xhred_titles_um'}
      ) .
      '</span></label>';
}

# XXX - needs further refactor
sub print_switch_dashboard
{
    my ($tab) = @_;
    my $checked = 0;
    if ($tab eq 'dashboard') {
        $checked = 1;
    }

    print '<input class="dynamic" id="open_dashboard" name="product-switcher" type="radio"' .
      ($checked ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_dashboard', 'settings_hotkey_sysinfo', 'auto right') .
      ' for="open_dashboard" style="padding-top: 1px;">
          <i class="fa fa-stack fa-dashboard"></i><span>'
      . $theme_text{'theme_xhred_titles_dashboard'} . '</span></label>';
}

# XXX - needs further refactor
sub print_switch_virtualmin
{
    my ($tab) = @_;
    my $checked = 0;
    if ($tab eq 'virtualmin') {
        $checked = 1;
    }

    print '<input class="dynamic" id="open_virtualmin" name="product-switcher" type="radio"' .
      ($checked ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_vm', 'settings_hotkey_toggle_key_virtualmin', 'auto right') .
      ' for="open_virtualmin">
          <i class="wbm-virtualmin wbm-sm"></i><span>'
      . $theme_text{'theme_xhred_titles_vm'} . '</span></label>';
}

# XXX - needs further refactor
sub print_switch_cloudmin
{
    my ($tab) = @_;
    my $checked = 0;
    if ($tab eq 'cloudmin') {
        $checked = 1;
    }

    print '<input class="dynamic" id="open_cloudmin" name="product-switcher" type="radio"' .
      ($checked ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_cm', 'settings_hotkey_toggle_key_cloudmin', 'auto right') .
      ' for="open_cloudmin">
          <i class="wbm-cloudmin wbm-sm"></i><span>'
      . $theme_text{'theme_xhred_titles_cm'} . '</span></label>';
}

# XXX - needs further refactor
sub print_switch_webmail
{
    my ($tab) = @_;
    my $checked = 0;
    if ($tab eq 'webmail') {
        $checked = 1;
    }

    print '<input class="dynamic" id="open_webmail" name="product-switcher" type="radio"' . ($checked ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_mail', 'settings_hotkey_toggle_key_webmail', 'auto right') .
      ' for="open_webmail">
          <i class="fa fa-stack fa-envelope"></i>
          <span>' . $theme_text{'theme_xhred_titles_mail'} . '</span></label>';
}

# XXX - needs further refactor
sub print_switch
{

    my ($t_var_switch_m, $t_var_product_m);

    if (&get_product_name() eq 'usermin' &&
        &foreign_available("mailbox"))
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '4';
    } elsif (!&foreign_available("virtual-server") && !&foreign_available("server-manager") ||
             &get_product_name() eq 'usermin' ||
             $get_user_level eq '2')
    {

        $t_var_switch_m  = '2';
        $t_var_product_m = '1';
    } elsif (&foreign_available("virtual-server") &&
             &foreign_available("server-manager"))
    {
        $t_var_switch_m  = '3';
        $t_var_product_m = '3';
    } elsif (&foreign_available("virtual-server") ||
             &foreign_available("server-manager") && (!&foreign_available("virtual-server") ||
                                                      !&foreign_available("server-manager")))
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '2';
    }

    my $o = ($theme_config{'settings_switch_rdisplay'} ne 'true' ? 'd' :
               'r');
    my ($tab, $page) = nav_detector();

    print '<div class="switch-toggle switch-' . $t_var_switch_m . ' switch-mins">';
    if ($t_var_product_m eq '1') {
        if ($o eq 'd') {
            if ($get_user_level eq '2') {
                if (get_webmin_switch_mode() eq '1') {
                    print_switch_webmin($tab);
                }
                print_switch_virtualmin($tab);
                if (get_webmin_switch_mode() ne '1') {
                    print_switch_dashboard($tab);
                }

            } else {
                print_switch_webmin($tab);
                print_switch_dashboard($tab);
            }
        } else {
            if ($get_user_level eq '2') {
                if (get_webmin_switch_mode() ne '1') {
                    print_switch_dashboard($tab);
                }
                print_switch_virtualmin($tab);
                if (get_webmin_switch_mode() eq '1') {
                    print_switch_webmin($tab);
                }

            } else {
                print_switch_dashboard($tab);
                print_switch_webmin($tab);
            }
        }
    }
    if ($t_var_product_m eq '2') {

        if ($o eq 'd') {
            print_switch_webmin($tab);
            &foreign_available("virtual-server") ? print_switch_virtualmin($tab) :
              print_switch_cloudmin($tab);

        } else {
            &foreign_available("virtual-server") ? print_switch_virtualmin($tab) :
              print_switch_cloudmin($tab);
            print_switch_webmin($tab);

        }

    }
    if ($t_var_product_m eq '3') {
        if ($o eq 'd') {
            print_switch_webmin($tab);
            print_switch_virtualmin($tab);
            print_switch_cloudmin($tab);

        } else {
            print_switch_cloudmin($tab);
            print_switch_virtualmin($tab);
            print_switch_webmin($tab);

        }
    }
    if ($t_var_product_m eq '4') {

        if ($o eq 'd') {
            print_switch_webmail($tab);
            print_switch_webmin($tab);
        } else {
            print_switch_webmin($tab);
            print_switch_webmail($tab);
        }

    }
    print '<a></a>
            </div><div class="toggle-space"></div>';
}

# XXX - needs further refactor
sub get_webmin_switch_mode
{
    my $user = $remote_user;
    $user =~ s/-//g;
    return ($theme_config{"settings_show_webmin_tab_$user"} ne "false" ? 1 : 0);
}

# XXX - needs further refactor
sub dashboard_switch
{
    if (($get_user_level eq '2' && get_webmin_switch_mode() ne '1') ||
        (!foreign_available("virtual-server") &&
            !foreign_available("server-manager") &&
            (get_product_name() ne 'usermin' || (get_product_name() eq 'usermin' && !foreign_available("mailbox")))))
    {
        return 1;
    } else {
        return 0;
    }
}

1;
