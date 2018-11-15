#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use lib (dirname(__FILE__) . "/lib");

use File::Grep qw( fgrep fmap fdo );
use Encode qw( encode decode );
use Fcntl qw( :flock );
use Time::Local;

use WebminCore;
BEGIN {push(@INC, "..");}

our (
    %in, %text, %config, %gconfig, %tconfig, %gaccess, $current_lang, $title, $base_remote_user, $remote_user,
    $theme_root_directory,
    $current_theme, $root_directory, $config_directory,

    %theme_text, %module_text_full, %theme_config, $get_user_level, $theme_requested_url,
    $theme_requested_from_tab, @theme_settings_excluded, $t_uri___i, $theme_module_query_id, $has_virtualmin, $has_cloudmin,
    $has_usermin,              $has_usermin_version,
    $has_usermin_root_dir, $has_usermin_conf_dir, $t_var_switch_m, $t_var_product_m);

init_type();
init_config();

require(dirname(__FILE__) . "/authentic-init.pm");

sub authentic
{
    init();
    header($title);
    content();
    footer();
}

sub print_category
{
    my ($c, $label) = @_;
    $label = $c eq "others" ? $theme_text{'left_others'} : $label;

    my %icon_table = ('webmin'            => 'fa-cog',
                      'usermin'           => 'fa-cog',
                      'settings'          => 'fa-cog',
                      'global_setting'    => 'fa-cog',
                      'cat_settings'      => 'fa-cog',
                      'system'            => 'fa-wrench',
                      'cat_system'        => 'fa-wrench',
                      'servers'           => 'fa-rocket',
                      'other'             => 'fa-gavel',
                      'info'              => 'fa-info',
                      'hardware'          => 'fa-hdd-o',
                      'global_hardware'   => 'fa-hdd-o',
                      'global_storage'    => 'fa-hdd-o',
                      'cluster'           => 'fa-power-off',
                      'global_cluster'    => 'fa-power-off',
                      'unused'            => 'fa-puzzle-piece',
                      'global_unused'     => 'fa-puzzle-piece',
                      'mail'              => 'fa-envelope',
                      'global_mail'       => 'fa-envelope',
                      'email'             => 'fa-envelope',
                      'global_email'      => 'fa-envelope',
                      'login'             => 'fa-user',
                      'global_login'      => 'fa-user',
                      'apps'              => 'fa-rocket',
                      'global_apps'       => 'fa-rocket',
                      'custom'            => 'fa-wrench',
                      'global_custom'     => 'fa-wrench',
                      'net'               => 'fa-shield',
                      'ip'                => 'fa-shield',
                      'global_ip'         => 'fa-shield',
                      'check'             => 'fa-user-md',
                      'global_check'      => 'fa-user-md',
                      'add'               => 'fa-plus',
                      'global_add'        => 'fa-plus',
                      'backup'            => 'fa-floppy-o',
                      'global_backup'     => 'fa-floppy-o',
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
                      'global_gce'        => 'fa-google',
                      'global_ec2'        => 'fa-cubes',
                      'global_hosts'      => 'fa-globe',
                      'global_virtualmin' => 'fa-sun-o',
                      'global_owners'     => 'fa-users',
                      'global_monitor'    => 'fa-desktop',
                      'global_settings'   => 'fa-cloud',
                      'cat_manage'        => 'fa-gavel',
                      'cat_res'           => 'fa-share-alt',
                      'global_admin'      => 'fa-key',
                      'cat_admin'         => 'fa-key',
                      'global_power'      => 'fa-power-off',
                      'cat_power'         => 'fa-power-off',);
    my $icon = $icon_table{$c} || 'fa-link';

    if ($label) {

        # Show link to close or open catgory
        print '<li class="has-sub">' . "\n";
        print '<a data-has-sub-link href="#' .
          $c . '"><i class="fa ' . $icon . ' fa-fw"></i> <span>' . $label . '</span></a>' . "\n";
        print '</li>' . "\n";
    }
}

sub get_swith_mode
{
    my ($t_var_switch_m, $t_var_product_m);

    if (&get_product_name() eq 'webmin' &&
        &foreign_available("asterisk"))
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '5';
    } elsif (&get_product_name() eq 'usermin' &&
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
    }
    elsif (&foreign_available("virtual-server") ||
           &foreign_available("server-manager") && (!&foreign_available("virtual-server") ||
                                                    !&foreign_available("server-manager")))
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '2';
    }

    return ($t_var_switch_m, $t_var_product_m);
}

sub print_switch_webmin
{
    print '<input class="dynamic" id="open_' . &get_product_name() . '" name="product-switcher" type="radio"' .
      (is_switch_webmin() ? " checked" : "") . '>
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

sub print_switch_dashboard
{
    print '<input class="dynamic" id="open_dashboard" name="product-switcher" type="radio"' .
      (($theme_requested_url =~ /sysinfo/ || ($get_user_level eq '2' && get_webmin_switch_mode() ne '1')) ? " checked" : "")
      . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_dashboard', 'settings_hotkey_sysinfo', 'auto right') .
      ' for="open_dashboard" style="padding-top: 1px;">
          <i class="fa fa-stack fa-dashboard"></i><span>'
      . $theme_text{'theme_xhred_titles_dashboard'} . '</span></label>';
}

sub print_switch_virtualmin
{
    print '<input class="dynamic" id="open_virtualmin" name="product-switcher" type="radio"' .
      (is_switch_virtualmin() ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_vm', 'settings_hotkey_toggle_key_virtualmin', 'auto right') .
      ' for="open_virtualmin">
          <i class="wbm-virtualmin wbm-sm"></i><span>'
      . $theme_text{'theme_xhred_titles_vm'} . '</span></label>';
}

sub print_switch_cloudmin
{
    print '<input class="dynamic" id="open_cloudmin" name="product-switcher" type="radio"' .
      (is_switch_cloudmin() ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_cm', 'settings_hotkey_toggle_key_cloudmin', 'auto right') .
      ' for="open_cloudmin">
          <i class="wbm-cloudmin wbm-sm"></i><span>'
      . $theme_text{'theme_xhred_titles_cm'} . '</span></label>';
}

sub print_switch_webmail
{
    print '<input class="dynamic" id="open_webmail" name="product-switcher" type="radio"' .
      (is_switch_webmail() ? " checked" : "") . '>
          <label'
      . get_button_tooltip('theme_xhred_titles_mail', 'settings_hotkey_toggle_key_webmail', 'auto right') .
      ' for="open_webmail">
          <i class="fa fa-stack fa-envelope"></i>
          <span>' . $theme_text{'theme_xhred_titles_mail'} . '</span></label>';
}

sub print_switch_thirdlane
{
    print '<input class="dynamic" id="open_thirdlane" id="open_cloudmin" name="product-switcher" type="radio">
          <label for="open_thirdlane">
          <img alt="" style="margin-left:3px; height:17px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnPjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTI0LjksNDguOEMxMS44LDQ4LjgsMSwzOC4xLDEsMjQuOVMxMS44LDEsMjQuOSwxczIzLjksMTAuNywyMy45LDIzLjlTMzguMSw0OC44LDI0LjksNDguOHogTTI0LjksMy44Yy0xMS43LDAtMjEuMSw5LjUtMjEuMSwyMS4xczkuNSwyMS4xLDIxLjEsMjEuMWMxMS43LDAsMjEuMS05LjUsMjEuMS0yMS4xUzM2LjYsMy44LDI0LjksMy44eiIvPjwvZz48Zz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDIwLjJjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywxOC4xLDI1LjEsMjAuMiwxNi42LDIwLjJ6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDI3LjRjLTAuOCwwLTEuNC0wLjYtMS40LTEuNHMwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywyNS4zLDI1LjEsMjcuNCwxNi42LDI3LjR6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDM0LjZjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywzMi41LDI1LjEsMzQuNiwxNi42LDM0LjZ6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==">
          <span class="block">'
      . $theme_text{'theme_xhred_titles_thirdlane'} . '</span></label>';
}

sub print_switch
{
    my $o = ($theme_config{'settings_switch_rdisplay'} ne 'true' ? 'd' :
               'r');

    print '<div class="switch-toggle switch-' . $t_var_switch_m . ' switch-mins">';
    if ($t_var_product_m eq '1') {
        if ($o eq 'd') {
            if ($get_user_level eq '2') {
                if (get_webmin_switch_mode() eq '1') {
                    print_switch_webmin();
                }
                print_switch_virtualmin();
                if (get_webmin_switch_mode() ne '1') {
                    print_switch_dashboard();
                }

            } else {
                print_switch_webmin();
                print_switch_dashboard();
            }
        } else {
            if ($get_user_level eq '2') {
                if (get_webmin_switch_mode() ne '1') {
                    print_switch_dashboard();
                }
                print_switch_virtualmin();
                if (get_webmin_switch_mode() eq '1') {
                    print_switch_webmin();
                }

            } else {
                print_switch_dashboard();
                print_switch_webmin();
            }
        }
    }
    if ($t_var_product_m eq '2') {

        if ($o eq 'd') {
            print_switch_webmin();
            &foreign_available("virtual-server") ? print_switch_virtualmin() :
              print_switch_cloudmin();

        } else {
            &foreign_available("virtual-server") ? print_switch_virtualmin() :
              print_switch_cloudmin();
            print_switch_webmin();

        }

    }
    if ($t_var_product_m eq '3') {
        if ($o eq 'd') {
            print_switch_webmin();
            print_switch_virtualmin();
            print_switch_cloudmin();

        } else {
            print_switch_cloudmin();
            print_switch_virtualmin();
            print_switch_webmin();

        }
    }
    if ($t_var_product_m eq '4') {

        if ($o eq 'd') {
            print_switch_webmail();
            print_switch_webmin();
        } else {
            print_switch_webmin();
            print_switch_webmail();
        }

    }
    if ($t_var_product_m eq '5') {

        if ($o eq 'd') {
            print_switch_webmin();
            print_switch_thirdlane();
        } else {
            print_switch_thirdlane();
            print_switch_webmin();
        }

    }
    print '<a></a>
            </div><br style="line-height:4.4">';
}

sub print_category_link
{
    my ($link, $label, $state) = @_;
    print '<li data-linked' . ($state && ' class="hidden"') . '>' . "\n";
    print '<a' . ($state && ' data-parent-hidden') . ' href="' .
      (($link !~ /^\// && $link !~ /^http/) ? ('/' . $link) : $link) . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub print_sysinfo_link
{
    my ($user) = @_;
    if (dashboard_switch() ne '1') {
        print '<li data-linked><a href="' . $gconfig{'webprefix'} . '/sysinfo.cgi" class="navigation_module_trigger' .
          ($theme_config{'settings_sysinfo_link_mini'} eq 'true' && ' hidden') .
          '"><i class="fa fa-fw ' . ($user ? 'fa-user-circle' : 'fa-dashboard') .
          '"></i> <span>' . $theme_text{'theme_xhred_titles_dashboard'} . '</span></a></li>' . "\n";
    }
}

sub get_sysinfo_warning
{
    my ($info_ref) = @_;
    my $returned_data = '';

    # Show notifications first
    if (ref($info_ref)) {
        @{$info_ref} =
          sort {($b->{'type'} eq 'warning') <=> ($a->{'type'} eq 'warning')} @{$info_ref};
        $returned_data .= '<br>';
        foreach my $info (@{$info_ref}) {
            if ($info->{'type'} eq 'warning') {
                $returned_data .= replace("ui_submit ui_form_end_submit",
                                          "btn-tiny ui_submit ui_form_end_submit",
                                          &ui_alert_box($info->{'warning'}, $info->{'level'} || 'warn',
                                                        undef, 1,
                                                        $info->{'desc'} || undef
                                          ));
            }
        }
    }
    return $returned_data;
}

sub get_extended_sysinfo
{
    my ($info_ref, $x) = @_;
    my $returned_sysinfo = '';

    if ($info_ref) {
        $returned_sysinfo .=
          '<div class="panel-group" id="extended_sysinfo' . $x . '" role="tablist" aria-multiselectable="true">';
        foreach my $info (@{$info_ref}) {
            if ($info->{'id'} ne 'notifications' &&
                $info->{'type'} ne 'link'            &&
                $info->{'module'} ne 'mailbox'       &&
                $info->{'module'} ne 'system-status' &&
                $info->{'type'} ne 'warning'         &&
                $a->{'type'} ne 'warning'            &&
                $b->{'type'} ne 'warning')
            {
                our $charts_not_supported = 'no';
                if ($info->{'type'} eq 'chart') {
                    foreach my $t (@{ $info->{'chart'} }) {
                        if ($t->{'chart'}[0] < 0 || $t->{'chart'}[1] < 0) {
                            $charts_not_supported = 'yes';
                        }
                    }
                }

                if ($info->{'id'} && $charts_not_supported eq 'no') {
                    my $open =
                      ($info->{'open'} || $info->{'id'} eq 'domain') ? ' in' :
                      ($theme_config{'settings_sysinfo_expand_all_accordions'} eq 'true' ? ' in' : '');

                    $returned_sysinfo .= '
                    <div  data-referrer="' . $info->{'id'} . '" data-sorter="' . $info->{'module'} . '" class="panel '
                      .
                      ( $info->{'level'} ? (' panel-' . ($info->{'level'} ne 'warn' ? $info->{'level'} : 'warning') . '') :
                          'panel-default'
                      ) .
                      ''
                      .
                      ( $theme_config{'settings_animation_tabs'} ne 'false' ? '' :
                          ' disable-animations'
                      ) .
                      '">
                        <div class="panel-heading" data-toggle="collapse" data-target="#' .
                      $info->{'id'} . '-' . $info->{'module'} .
                      $x . '-collapse" role="tab" id="' . $info->{'id'} . '-' . $info->{'module'} . $x . '">
                          <h4 class="panel-title">
                            <a data-toggle="collapse" href="#'
                      . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse" aria-expanded="'
                      .
                      (
                        ($info->{'open'} ||
                           $info->{'id'} eq 'domain' ||
                           $theme_config{'settings_sysinfo_expand_all_accordions'} eq 'true'
                        ) ? 'true' :
                          'false'
                      ) .
                      '" aria-controls="' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse">
                              '
                      . ($info->{'id'} . '-' .
                           $info->{'module'} eq 'status_services-status' ?
                           $theme_text{'theme_xhred_sysinfo_system_monitors'} :
                           ($info->{'id'} . '-' .
                              $info->{'module'} eq 'sysinfo-virtual-server' ?
                              $theme_text{'theme_xhred_sysinfo_software_versions'} :
                              ( $info->{'id'} . '-' .
                                  $info->{'module'} eq 'status-virtual-server' ?
                                  $theme_text{'theme_xhred_sysinfo_server_status'} :
                                  ( $info->{'id'} . '-' .
                                      $info->{'module'} eq 'quota-virtual-server' ?
                                      $theme_text{'theme_xhred_sysinfo_disk_quotas'} :
                                      ( $info->{'id'} . '-' .
                                          $info->{'module'} eq 'bw-virtual-server' ?
                                          $theme_text{'theme_xhred_sysinfo_bandwidth_quotas'} :
                                          ( $info->{'id'} . '-' .
                                              $info->{'module'} eq 'updates-virtual-server' ?
                                              $theme_text{'theme_xhred_sysinfo_vm_package_updates'} :
                                              ( $info->{'id'} . '-' . $info->{'module'} eq 'acl_logins-acl' ?
                                                  $theme_text{'theme_xhred_sysinfo_recent_logins'} :
                                                  ($info->{'desc'})
                                              )
                                          )
                                      )
                                  )
                              )
                           )
                      ) .
                      '
                            </a>
                          </h4>
                        </div>
                    <div id="'
                      . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse" class="panel-collapse collapse' .
                      $open . '" role="tabpanel" aria-labelledby="' . $info->{'id'} . '-' . $info->{'module'} . $x . '">
                      <div class="panel-body '
                      . ($info->{'level'} ? ' alert-' . ($info->{'level'} ne 'warn' ? $info->{'level'} : 'warning') . '' :
                           undef
                      ) .
                      '">';

                    if ($info->{'id'} ne 'plugin_virtualmin-notes' && $info->{'id'} ne 'acl_logins') {
                        $returned_sysinfo .=
'<div class="table-responsive" style="width:99.8%"><table class="table table-striped table-hover"><tbody>';
                    }

                    if ($info->{'type'} eq 'table' &&
                        (   $info->{'module'} ne 'system-status' &&
                            $info->{'type'} ne 'link'

                        ))
                    {

                        foreach my $t (@{ $info->{'table'} }) {
                            my $__checkmark = '<i class="fa fa-fw fa-lg fa-check text-success"></i>';
                            my $__stop      = '<i class="fa fa-fw fa-lg fa-times-circle text-danger"></i>';
                            my $__down      = '<i class="fa fa-fw fa-lg fa-minus-circle text-danger"></i>';
                            my $__start     = '<i class="fa fa-fw fa-lg fa-play text-success"></i>';
                            my $__restart   = '<i class="fa fa-fw fa-lg fa-refresh text-info"></i>';

                            $t->{"value"} =~ s/<img src='\/virtual-server\/images\/up.gif'.*?>/$__checkmark/g;
                            $t->{"value"} =~ s/<img src='\/virtual-server\/images\/stop.png'.*?>/$__stop/g;
                            $t->{"value"} =~ s/<img src='\/virtual-server\/images\/down.gif'.*?>/$__down/g;
                            $t->{"value"} =~ s/<img src='\/virtual-server\/images\/start.png'.*?>/$__start/g;
                            $t->{"value"} =~ s/<img src='\/virtual-server\/images\/reload.png'.*?>/$__restart/g;

                            $returned_sysinfo .= '<tr>
                                <td>' . replace('href=\'', "href='$gconfig{'webprefix'}", $t->{"desc"}) . '</td>
                                <td>'
                              . replace('href=\'', "href='$gconfig{'webprefix'}", $t->{"value"}) . '</td>
                              </tr>';
                        }
                    } elsif ($info->{'type'} eq 'chart') {
                        $returned_sysinfo .= print_charts($info, $x);
                    } elsif ($info->{'type'} eq 'html') {
                        $info->{'html'} =~ s/<script[^>]*>.*?<\/script>//igs;
                        $returned_sysinfo .= $info->{'html'};
                    }

                    if ($info->{'id'} ne 'plugin_virtualmin-notes' && $info->{'id'} ne 'acl_logins') {
                        $returned_sysinfo .= '</tbody></table></div>';
                    }

                    $returned_sysinfo .= '</div>
                    </div>
                </div>';

                }
            }
        }
        $returned_sysinfo .= '</div><br><br><br><br>';
        return $returned_sysinfo;
    }

}

sub print_charts
{
    my ($info, $x) = @_;
    my $returned_sysinfo = '';
    foreach my $t (@{ $info->{'chart'} }) {
        my $unlimited         = 0;
        my $percent_width_1   = int($t->{'chart'}[1]);
        my $percent_width_2   = int($t->{'chart'}[2]);
        my $percent_width_sum = $percent_width_1 + $percent_width_2;
        my $is_2              = defined($t->{'chart'}[2]);

        my $percent_1 = '&nbsp;' . $percent_width_1 . '%';
        my $percent_2 = '&nbsp;' . $percent_width_2 . '%';

        my $dd = $theme_text{'right_out'};
        $dd =~ s/\s|&nbsp;|\$1|\$2//g;

        if ($t->{"value"} !~ /\Q$dd/) {
            $percent_1       = '&nbsp;' . $theme_text{'right_unlimited'};
            $percent_width_1 = '0';
            $unlimited       = 1;
        }

        my $color;
        if ($percent_width_sum <= 49) {
            $color = 'green';
        } elsif ($percent_width_sum <= 90) {
            $color = 'yellow';
        } else {
            $color = 'red';
        }
        if ($unlimited || $percent_width_sum == 0) {
            $color = 'gray';
        }

        my $bar;
        if ($is_2 && !$unlimited && $percent_width_2) {
            $bar = '<strong data-first '
              .
              get_button_tooltip('edit_allquotah', undef, undef, 1, 1,
                                 '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') .
              ' class="bar ' . $color . '" style="width:' . $percent_width_1 . '%;">' . $percent_1 . '</strong>';
            $bar .= '<strong '
              .
              get_button_tooltip('edit_dbquota', undef, undef, 1, 1,
                                 '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') .
              ' class="bar ' . $color . '" style="width:' . $percent_width_2 . '%;">' . $percent_2 . '</strong>';
        } else {
            $bar = '<strong '
              .
              ( $is_2 ?
                  get_button_tooltip('edit_allquotah', undef, undef, 1, 1,
                                     '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') :
                  undef
              ) .
              ' class="bar ' . $color . '" style="width:' . $percent_width_1 . '%;">' . $percent_1 . '</strong>';
        }

        $returned_sysinfo .= '<tr>
                                <td style="width:25%">'
          . replace('edit_domain', 'summary_domain', replace('href=\'', "href='$gconfig{'webprefix'}", $t->{"desc"})) .
          '</td>
                                <td style="width:60%">
                                <div class="graph-container">
                                    <div class="graph">' . $bar . '</div>
                                </div>
                                </td>
                                      <td style="width:15%">'
          . $t->{"value"} . '</td>
                              </tr>';
    }

    return $returned_sysinfo;

}

sub print_sysstat_link
{
    my $link;
    if ($get_user_level eq '0') {
        if (-d $root_directory . "/virtual-server/pro/timeplot") {
            $link = 'virtual-server/pro';
        } elsif (-d $root_directory . "/server-manager/timeplot") {
            $link = 'server-manager';
        }
        if ($link) {
            print '<li data-linked><a href="' . $gconfig{'webprefix'} .
              '/' . $link . '/history.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-area-chart"></i> <span>' .
              $theme_text{'left_statistics'} . '</span></a></li>' . "\n";
        }
    }
}

sub print_netdata_link
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
            print '<li class="leftmenu_netdata_link"><a target="_blank" href="' . $link .
              '" class="navigation_external_link leftmenu_netdata_link"><i class="fa fa-fw fa-line-chart"></i> <span>' .
              $theme_text{'left_netdata'} . '</span></a></li>' . "\n";
        }
    }
}

sub print_search
{
    if (-r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'}) {
        print '<li class="menu-container search-form-container"><form id="webmin_search_form" action="' .
          $gconfig{'webprefix'} . '/webmin_search.cgi" role="search">' . "\n";
        print '<div class="form-group">' . "\n";
        print '<i class="fa fa-search"></i>' . "\n";
        print '<input type="text" class="form-control sidebar-search" name="search" placeholder="' .
          $theme_text{'left_search'} . '">' . "\n";
        print '</div>' . "\n";
        print '</form></li>' . "\n";
    } else {
        print '<br>';
    }
}

sub add_webprefix
{
    my ($link) = @_;

    if (substr($link, -5) eq '&amp;') {
        $link = substr($link, 0, -5);
    }

    if ($link !~ /^http/) {
        $link = ($link !~ /^\Q$gconfig{'webprefix'}/ ? $gconfig{'webprefix'} . $link : $link);

        if ($link !~ /^\//) {
            $link = "/" . $link;
        }
    }
    return $link;
}

sub print_left_menu
{
    my ($module, $items, $group, $id, $selected, $xhr) = @_;
    my $__hr           = 0;
    my $__custom_print = 0;
    my $__custom_link  = 0;
    my $__mail_spinner = 0;
    foreach my $item (@$items) {
        if ($module eq $item->{'module'} || $group) {

            my $link = add_webprefix($item->{'link'});
            my $icon;

            if ($theme_config{'settings_mail_ui'} ne 'false' && string_contains($link, 'mailbox/index.cgi?id')) {
                next;
            }

            if ($item->{'type'} eq 'item' &&
                $link ne add_webprefix("/virtual-server/edit_lang.cgi") &&
                $link ne add_webprefix("/virtual-server/edit_lang.cgi") &&
                $link ne add_webprefix("/virtual-server/pro/history.cgi"))
            {

                # Define an icon for the link/accordion
                if ($link eq add_webprefix("/virtual-server/index.cgi") ||
                    $link eq add_webprefix("/server-manager/index.cgi"))
                {
                    $icon = '<i class="fa fa-fw fa-tasks"></i>';
                } elsif ($link =~ /\/virtual-server\/edit_newvalidate.cgi/ &&
                         $get_user_level ne '0')
                {
                    $icon = '<i class="fa fa-fw fa-user-md"></i>';
                } elsif ($link eq add_webprefix("/mailbox/list_folders.cgi") ||
                         $link eq add_webprefix("/mailbox/list_ifolders.cgi"))
                {
                    $icon = '<i class="fa fa-fw fa-folder"></i>';
                } elsif ($link eq add_webprefix("/mailbox/list_addresses.cgi")) {
                    $icon = '<i class="fa fa-fw fa-address-book"></i>';
                } elsif ($link eq add_webprefix("/filter/edit_forward.cgi")) {
                    $icon = '<i class="fa fa-fw fa-share"></i>';
                } elsif ($link eq add_webprefix("/filter/edit_auto.cgi")) {
                    $icon = '<i class="fa fa-fw fa-reply-all"></i>';
                } elsif ($link eq add_webprefix("/filter/")) {
                    $icon = '<i class="fa fa-fw fa-filter"></i>';
                } elsif ($link eq add_webprefix("/mailbox/edit_sig.cgi")) {
                    $icon = '<i class="fa fa-fw fa-pencil"></i>';
                } elsif ($link =~ /mailbox\/index.cgi?id=/) {
                    $icon = '<i class="fa fa-fw fa-folder-o"></i>';
                }
                if ($get_user_level == 1) {
                    if ($link =~ /\/virtual-server\/edit_pass.cgi/ &&
                        $link !~ /\/virtual-server\/edit_pass.cgi\?/)
                    {
                        $icon = '<i class="fa fa-fw fa-key"></i>';
                    } elsif ($link =~ /\/virtual-server\/edit_newplan.cgi/) {
                        $icon = '<i class="fa fa-fw fa-list"></i>';
                    } elsif ($link =~ /\/virtual-server\/edit_newresels.cgi/) {
                        $icon = '<i class="fa fa-fw fa-cog"></i>';
                    } elsif ($link =~ /\/virtual-server\/bwgraph.cgi/ && $id ne 'cat_logs') {
                        $icon = '<i class="fa fa-fw fa-line-chart"></i>';
                    }
                }

                if ($link =~ /\/virtual-server\/domain_form.cgi/) {
                    $icon = '<i class="fa fa-fw fa-plus-square-o"></i>';
                }

                elsif ($link =~ /\/virtual-server\/edit_domain.cgi/ ||
                       $link =~ /\/server-manager\/edit_serv.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa-pencil-square-o"></i>';
                } elsif ($link =~ /\/virtual-server\/view_domain.cgi/) {
                    $icon = '<i class="fa fa-fw fa-info-circle"></i>';
                }

                elsif ($link =~ /\/virtual-server\/list_users.cgi/) {
                    $icon = '<i class="fa fa-fw fa-users"></i>';
                } elsif ($link =~ /\/virtual-server\/list_aliases.cgi/) {
                    $icon = '<i class="fa fa-fw fa-envelope-o"></i>';
                } elsif ($link =~ /\/virtual-server\/list_databases.cgi/) {
                    $icon = '<i class="fa fa-fw fa-database"></i>';
                } elsif ($link =~ /\/virtual-server\/list_scripts.cgi/ ||
                         $link =~ /\/server-manager\/mass_update_form.cgi/)
                {
                    $icon = '<i class="fa fa-fw fa-update scaled1"></i>';
                } elsif ($link =~ /\/filemin\/index.cgi/) {
                    $icon = '<i class="fa fa-fw fa-file-manager scaled2"></i>';
                }

                elsif ($link =~ /\/virtual-server\/edit_html.cgi/) {
                    $icon = '<i class="fa fa-fw fa-globe"></i>';
                } elsif ($link =~ /\/server-manager\/edit_pass.cgi/) {
                    $icon = '<i class="fa fa-fw fa-key"></i>';
                } elsif ($link =~ /\/server-manager\/save_serv.cgi/) {
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
                } elsif ($link =~ /\/servers\/link.cgi/) {
                    $icon = '<i class="fa fa-fw fa-webmin scaled1_5"></i>';
                }

                # Print Virtual Server Summary link
                if (($get_user_level eq '0' || $get_user_level eq '1') &&
                    $__custom_link eq '0' &&
                    $link =~ /\/virtual-server\/domain_form.cgi/ &&
                    domain_available_count())
                {
                    print '<li data-linked><a target="page" class="navigation_module_trigger" href="' .
                      $gconfig{'webprefix'} .
                      '/virtual-server/summary_domain.cgi?dom=$#DOM"><i class="fa fa-fw fa-info-circle"></i> <span>' .
                      $theme_text{'right_vm_server_summary'} . '</span></a></li>' . "\n";
                }

                # Set variable in case it hasn't been set before
                if (!length $link) {
                    $icon = undef;
                }

                print '<li data-linked'
                  .
                  ( $item->{'target'} ? ' class="navigation_external"' :
                      ''
                  ) .
                  '>' . "\n";
                print '<a ' .
                  ($link !~ /switch_user/ ? ' target="' . ($item->{'target'} ? '_blank' : 'page') . '" ' : '') . ' '
                  .
                  ( (!$group && !$item->{'target'}) ? "class=\"navigation_module_trigger\" " :
                      ''
                  ) .
                  'href="' . $link . '">' .
                  ($icon =~ /<i/ ? $icon : '') . ' <span>' . $item->{'desc'} . '</span></a>' . "\n";
                print '</li>' . "\n";
                print "\n";

            } elsif ($item->{'type'} eq 'html') {
                print '<li class="menu-container menu-status hidden">' . $item->{'html'} . '</li>';
            } elsif ($item->{'type'} eq 'cat') {

                # Skip printing Webmin category because there is a switch for it
                if ($item->{'id'} eq 'cat_webmin' && $get_user_level eq '2') {
                    next;
                }

                my $c = $item->{'id'};
                if ($item->{'module'} ne 'mailbox') {
                    &print_category($c, $item->{'desc'});
                    print '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="' . $c . '">' . "\n";
                }
                print_left_menu($module, $item->{'members'}, 1, $c);

                if (($c eq 'global_setting' || $c eq 'global_settings' && &foreign_available("webmin")) &&
                    $__custom_print eq '0')
                {
                    &print_category_link($gconfig{'webprefix'} . "/webmin/edit_themes.cgi",
                                         $theme_text{'settings_right_theme_left_configuration_title'}, 1);
                    &print_category_link($gconfig{'webprefix'} . "/settings-editor_read.cgi",
                                         $theme_text{'settings_right_theme_left_extensions_title'}, 1);
                    &print_category_link($gconfig{'webprefix'} . "/settings-logos.cgi",
                                         $theme_text{'settings_right_theme_left_logo_title'}, 1);
                    &print_category_link($gconfig{'webprefix'} . "/settings-backgrounds.cgi",
                                         $theme_text{'theme_xhred_settings_right_theme_bgs_title'}, 1);

                    $__custom_print++;

                    if (licenses('vm') eq '1' &&
                        $item->{'module'} eq 'virtual-server')
                    {
                        &print_category_link($gconfig{'webprefix'} . "/virtual-server/licence.cgi",
                                             $theme_text{'right_vlcheck'}, 1);
                    }

                    if (licenses('cm') eq '1' &&
                        $item->{'module'} eq 'server-manager')
                    {
                        &print_category_link($gconfig{'webprefix'} . "/server-manager/licence.cgi",
                                             $theme_text{'right_slcheck'}, 1);
                    }

                } elsif (!foreign_available("webmin") &&
                         $__custom_print eq '0' &&
                         $theme_config{'settings_show_theme_configuration_for_admins_only'} ne 'true')
                {
                    print_category_link($gconfig{'webprefix'} . "/settings-user.cgi", $theme_text{'settings_title'}, 1);
                    $__custom_print++;
                }
                if ($item->{'module'} ne 'mailbox') {
                    print "</ul></li>\n";
                }
            } elsif ($item->{'type'} eq 'hr') {
                if ($__hr eq '1') {
                    print_search();
                }
                $__hr++;
            } elsif (($item->{'type'} eq 'menu' || $item->{'type'} eq 'input') &&
                     $item->{'module'} ne 'mailbox')
            {
                # For with an input of some kind
                if ($item->{'cgi'}) {
                    print "<li class=\"menu-container\"><form action='$item->{'cgi'}'>\n";
                } else {
                    print "<li class=\"menu-container\"><form>\n";
                }
                foreach my $h (@{ $item->{'hidden'} }) {
                    print ui_hidden(@$h);
                }

                print $item->{'desc'}, "\n";
                if ($item->{'type'} eq 'menu' || $item->{'type'} eq 'input') {
                    my $default = get_default_target();
                    my @dname;

                    if ($item->{'name'} eq 'dname' && foreign_available('virtual-server')) {
                        @dname = [
                            map {
                                [$_->{'id'},
                                 virtual_server::shorten_domain_name($_),
                                 "title=\"" . virtual_server::show_domain_name($_) . "\""]
                              }
                              grep {
                                virtual_server::can_edit_domain($_)
                              }
                              sort {
                                $a->{'dom'} cmp $b->{'dom'}
                              } virtual_server::list_domains()];
                    }
                    print ui_select(
                        ($item->{'name'} eq 'dname' ? 'dom' :
                           $item->{'name'}
                        ),
                        ((($selected || $selected == 0) && $xhr) ? $selected :
                           ( $default ? $default :
                               $item->{'value'}
                           )
                        ),
                        ($item->{'name'} eq 'dname' ? @dname : $item->{'menu'}),
                        1, 0, 0, 0,
                        "data-autocomplete-title=\"
                            "
                          . (
                             ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/ ||
                                $in{'xhr-navigation-type'} eq 'virtualmin'
                             ) ? $theme_text{'right_fdoms'} :
                               $theme_text{'right_fvm2'}
                          ) .
                          "
                            \" "
                          . "style='width:"
                          .
                          (
                            ($theme_config{'settings_leftmenu_width'} ? $theme_config{'settings_leftmenu_width'} :
                               '260'
                            ) - 24
                          ) .
                          "px; margin-top: 0 !important' disabled");

                }
                print "</form></li>\n";
            }
        }
    }
}

sub print_easypie_charts
{
    my ($cpu_percent, $mem_percent, $virt_percent, $disk_percent) = @_;

    print '<div class="row" style="margin: 0;">' . "\n";
    my $columns = '3';

    # CPU usage
    print_easypie_chart($columns,
                        (($cpu_percent || $cpu_percent eq "0") ? $cpu_percent :
                           'NaN'
                        ),
                        $theme_text{'body_cp'},
                        'sysinfo_cpu_percent');

    # Memory allocation
    print_easypie_chart($columns,
                        (($mem_percent || $mem_percent eq "0") ? $mem_percent :
                           'NaN'
                        ),
                        (($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_real2'} :
                           $theme_text{'body_real'}
                        ),
                        'sysinfo_mem_percent');
    print_easypie_chart($columns,
                        (($virt_percent || $virt_percent eq "0") ? $virt_percent : 'NaN'),
                        (($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_virt2'} :
                           $theme_text{'body_virt'}
                        ),
                        'sysinfo_virt_percent');

    # Disk usage
    print_easypie_chart($columns,
                        (($disk_percent || $disk_percent eq "0") ? $disk_percent :
                           'NaN'
                        ),
                        (($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_disk2'} :
                           $theme_text{'body_disk'}
                        ),
                        'sysinfo_disk_percent');

    print '</div>' . "\n";
}

sub print_sysstats_panel_end
{
    print '</div></div>';
}

sub print_sysstats_panel_start
{
    my ($info_ref) = @_;

    my $recollect;
    if ($info_ref) {
        my @recollect = @{$info_ref};
        @recollect = grep {$_->{'id'} =~ /recollect/} @recollect;
        if (@recollect) {
            $recollect =
'<span class="btn btn-transparent-link pull-right _sync_sysinfo_cnt"><i class="fa fa-fw fa fa-reload _sync_sysinfo_" '
              . get_button_tooltip('theme_xhred_tooltip_side_slider_sync_sysinfo', undef, 'auto right')
              . '></i></span>';
        }
    }
    my %virtualmin_config = foreign_config('virtual-server');
    my %cloudmin_config   = foreign_config('server-manager');

    print '<div id="system-status" class="panel panel-default" style="margin-bottom: 5px">' . "\n";
    print '<div class="panel-heading">' . "\n";
    print '<h3 class="panel-title">' .
      $recollect . '' . ($get_user_level eq '3' ? $theme_text{'body_header1'} : $theme_text{'body_header0'})
      .
      ( $cloudmin_config{'docs_link'} &&
          foreign_available("server-manager") ?
          '<a class="btn btn-default pull-right extra_documentation_links" href="' . $cloudmin_config{'docs_link'} .
          '"target="_blank"><i class="fa fa-book"> </i> ' . $cloudmin_config{'docs_text'} . '</a>' :
          undef
      ) .
      '
            '
      . ($virtualmin_config{'docs_link'} &&
           foreign_available("virtual-server") ?
           '<a class="btn btn-default pull-right extra_documentation_links" href="' . $virtualmin_config{'docs_link'} .
           '"target="_blank"><i class="fa fa-book"> </i> ' . $virtualmin_config{'docs_text'} . '</a>' :
           undef
      ) .
      '
    </h3>' . "\n";

    print '</div>';
    print '<div class="panel-body">' . "\n";
}

sub print_sysstats_table
{
    my ($data, $quota, $prod) = @_;

    if ((defined($data) && scalar(@{$data})) ||
        (defined($quota) && scalar(@{$quota})))
    {
        print '<table class="table table-hover">' . "\n";
        if (defined($data) && scalar(@{$data})) {
            foreach my $t (@{ @{$data}[0]->{'table'} }) {
                my $insert = ($t->{"desc"} =~ /\Q$prod/i);
                if ($insert && $get_user_level ne '3') {
                    print_table_row($theme_text{'body_webmin'}, get_webmin_version());
                }
                print_table_row($t->{"desc"}, $t->{"value"});
                if ($insert) {
                    print_table_row($theme_text{'theme_version'}, get_theme_user_link());
                }
            }
        }
        if (defined($quota) && scalar(@{$quota})) {
            print_table_row(@{$quota}[0]->{'desc'}, @{$quota}[0]->{"chart"}->[0]->{'value'});
        }
        print '</table>' . "\n";
    }
}

sub print_easypie_chart
{
    my ($columns, $percent, $label, $id) = @_;
    print '<div class="col-md-' . $columns . ' col-md-6 col-xs-6 text-center">' . "\n";
    print '<span class="piechart" data-charts="' . $id . '" data-percent="' . $percent . '">
        <div class="data-cnt">
          <span class="percent"></span>
          <span class="label">' . $label . '</span>
        </div>
    </span>';
    print '</div>' . "\n";
}

sub theme_list_combined_system_info
{
    return &list_combined_system_info({ 'qshow' => 1, 'max' => $theme_config{'settings_sysinfo_max_servers'} });
}

sub get_sysinfo_vars
{
    my ($info_ref) = @_;
    my ($info, $info_arr, @info);

    # Ask for collected info
    if (@_) {
        @info = @{$info_ref};
    } else {
        @info = theme_list_combined_system_info();
    }
    @info = grep {$_->{'id'} eq 'sysinfo'} @info;

    # Define used vars
    my ($webmin_version_str, $cpu_percent,        $mem_percent,             $virt_percent,
        $disk_percent,       $host,               $os,                      $webmin_version,
        $virtualmin_version, $cloudmin_version,   $authentic_theme_version, $local_time,
        $kernel_arch,        $cpu_type,           $cpu_temperature,         $hdd_temperature,
        $uptime,             $running_proc,       $load,                    $real_memory,
        $virtual_memory,     $disk_space,         $package_message,         $csf_title,
        $csf_data,           $csf_remote_version, $authentic_remote_version);

    if (@info) {
        $info_arr = @info[0]->{'raw'};
        $info     = @$info_arr[0];
    } else {
        return;
    }

    if (!@$info_arr) {
        return;
    }

    $webmin_version_str = @$info_arr[1]->{'webmin_version'};

    # Require memory information
    my @m;
    if ($info->{'mem'}) {
        @m = @{ $info->{'mem'} };
    }

    # Easypie charts numbers
    if ($info->{'cpu'}) {
        my @c = @{ $info->{'cpu'} };
        $cpu_percent = $c[0] + $c[1] + $c[3];
        $cpu_percent = int($cpu_percent);
    }
    if (@m && $m[0]) {
        $mem_percent = ($m[0] - $m[1]) / $m[0] * 100;
        $mem_percent = int($mem_percent);
    }
    if (@m && $m[2]) {
        $virt_percent = ($m[2] - $m[3]) / $m[2] * 100;
        $virt_percent = int($virt_percent);
    }
    if ($info->{'disk_total'}) {
        my ($total, $free) =
          ($info->{'disk_total'}, $info->{'disk_free'});
        $disk_percent = ($total - $free) / $total * 100;
        $disk_percent = int($disk_percent);
    }

    # Operation system
    my $ip =
      $info->{'ips'} ? $info->{'ips'}->[0]->[0] :
      &to_ipaddress(get_system_hostname());
    $ip = " ($ip)" if ($ip);
    $host = &get_system_hostname() . $ip;
    if (&foreign_available("net")) {
        $host = '<a href=\'' . $gconfig{'webprefix'} . '/net/list_dns.cgi\'>' . $host . '</a>';
    }

    # Operating System Info
    if ($gconfig{'os_version'} eq '*') {
        $os = $gconfig{'real_os_type'};
    } else {
        $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
    }

    my $is_hidden_link = ($get_user_level ne '0' ? ' hidden-force ' : undef);

    #Webmin version
    $webmin_version =
      product_version_update($webmin_version_str, 'w') . ' <div class="btn-group margined-left-4' .
      $is_hidden_link . '"><a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1" title="' .
      $theme_text{'theme_sysinfo_wmdocs'} .
      '" href="http://doxfer.webmin.com" target="_blank"><i class="fa fa-fwh fa-book"></i></a></div>';

    # Virtualmin version
    if ($has_virtualmin) {
        my ($vs_license, $__virtual_server_version);

        $vs_license               = licenses('vm');
        $__virtual_server_version = @$info_arr[2]->{'vm_version'};
        $__virtual_server_version =~ s/.gpl//igs;

        $virtualmin_version = (
            product_version_update($__virtual_server_version, 'v') . " " . (
                $vs_license eq '0' ? '' :
                  ''

                  . ' Pro <div class="btn-group margined-left-4' . $is_hidden_link . '">'
                  .
                  ( ($vs_license eq '1') ?
                      ' <a data-license class="btn btn-default btn-xxs" title="' .
                      $theme_text{'right_vlcheck'} . '" href=\'' .
                      $gconfig{'webprefix'} . '/virtual-server/licence.cgi\'><i class="fa fa-refresh"></i></a></div>' :
                      '</div>'
                  ) .
                  '<a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1' .
                  $is_hidden_link . '" title="' . $theme_text{'theme_sysinfo_vmdocs'} .
                  '" href="http://www.virtualmin.com/documentation" target="_blank"><i class="fa fa-book"></i></a>'

            ));
    }

    # Cloudmin version
    if ($has_cloudmin) {
        my ($vm2_license, $__server_manager_version);

        $vm2_license = licenses('cm');

        $__server_manager_version = @$info_arr[3]->{'cm_version'} || @$info_arr[2]->{'cm_version'};
        $__server_manager_version =~ s/.gpl//igs;

        $cloudmin_version = (
            product_version_update($__server_manager_version, 'c') . " " . (
                $vm2_license eq '0' ? '' :
                  ''

                  . ' Pro <div class="btn-group margined-left-4' . $is_hidden_link . '">'
                  .
                  ( ($vm2_license eq '1') ?
                      ' <a data-license class="btn btn-default btn-xxs" title="' .
                      $theme_text{'right_slcheck'} . '" href=\'' .
                      $gconfig{'webprefix'} . '/server-manager/licence.cgi\'><i class="fa fa-refresh"></i></a></div>' :
                      '</div>'
                  ) .
                  '<a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1' .
                  $is_hidden_link . '" title="' . $theme_text{'theme_sysinfo_cmdocs'} .
                  '" href="http://www.virtualmin.com/documentation/cloudmin" target="_blank"><i class="fa fa-book"></i></a>'
            ));
    }

    # Fetch theme version
    if ($get_user_level eq '0') {

        # Theme version/update
        my $authentic_remote_data       = theme_remote_version(1);
        my $authentic_installed_version = theme_version();
        my $incompatible                = theme_update_incompatible($authentic_remote_data);

        ($authentic_remote_version) = $authentic_remote_data =~ /^version=(.*)/gm;
        my $authentic_remote_version_local = $authentic_remote_version;

        if ($incompatible && $authentic_remote_version_local !~ /beta/) {
            $authentic_remote_version = $authentic_installed_version;
        }

        if (   (!$incompatible || ($incompatible && $authentic_remote_version_local =~ /beta/))
            &&
            (
                (($authentic_remote_version_local !~ /beta/ && $authentic_installed_version =~ /beta/) &&
                 $authentic_remote_version_local ge substr($authentic_installed_version, 0, 5)
                ) ||
                $authentic_remote_version_local gt $authentic_installed_version))
        {
            my $authentic_remote_beta        = $authentic_remote_version_local =~ /beta/;
            my $authentic_remote_version_tag = $authentic_remote_version_local;
            my @_remote_version_tag          = split /-/, $authentic_remote_version_tag;
            $authentic_remote_version_tag = $_remote_version_tag[0];

            $authentic_theme_version =
              '<a href="https://github.com/authentic-theme/authentic-theme" target="_blank">' .
              $theme_text{'theme_name'} . '</a> ' . $authentic_installed_version . '. ' .
              ($authentic_remote_beta ? $theme_text{'theme_git_patch_available'} : $theme_text{'theme_update_available'}) .
              ' ' . $authentic_remote_version_local . '&nbsp;&nbsp;&nbsp;<div class="btn-group">' . '<a data-git="'
              .
              ( $authentic_remote_beta ? 1 :
                  0
              ) .
              '" class="btn btn-xxs btn-' . ($authentic_remote_beta ? 'warning' : 'success') .
              ' authentic_update" href=\'' . $gconfig{'webprefix'} . '/webmin/edit_themes.cgi\'><i class="fa fa-fw ' .
              ($authentic_remote_beta ? 'fa-git-pull' : 'fa-refresh') . '">&nbsp;</i>' . $theme_text{'theme_update'} .
              '</a>' . '<a class="btn btn-xxs btn-info ' . ($authentic_remote_beta ? 'hidden' : 'btn-info') .
'" target="_blank" href="https://github.com/authentic-theme/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-fw fa-pencil-square-o">&nbsp;</i>'
              . $theme_text{'theme_changelog'}
              . '</a>' . '<a data-remove-version="' . $authentic_remote_version_local .
              '" class="btn btn-xxs btn-warning' . ($authentic_remote_beta ? ' hidden' : '') .
              '" target="_blank" href="https://github.com/authentic-theme/authentic-theme/releases/download/' .
              $authentic_remote_version_tag .
              '/authentic-theme-' . $authentic_remote_version_local . '.wbt.gz"><i class="fa fa-fw fa-download">&nbsp;</i>' .
              $theme_text{'theme_download'} . '</a>' . '<a class="btn btn-xxs btn-primary" href=\'' .
              $gconfig{'webprefix'} . '/webmin/edit_themes.cgi\' data-href=\'' .
              $gconfig{'webprefix'} . '/webmin/edit_themes.cgi\' ><i class="fa fa-fw fa-cogs">&nbsp;</i>' .
              $theme_text{'settings_right_options'} . '</a>' . '</div>';

        } else {
            $authentic_theme_version = get_theme_user_link();
        }
    } else {
        $authentic_theme_version = get_theme_user_link();
    }

    #ConfigServer Security & Firewall
    if (&foreign_check("csf") && &foreign_available("csf")) {

        # Define CSF installed version
        my $csf_update_required;
        my $csf_installed_version = read_file_lines('/etc/csf/version.txt', 1);
        $csf_installed_version = $csf_installed_version->[0];

        # Define CSF actual version if allowed
        if ($theme_config{'settings_sysinfo_csf_updates'} eq 'true' &&
            $get_user_level eq '0' &&
            $in =~ /xhr-/)
        {
            http_download('download.configserver.com', '80', '/csf/version.txt', \$csf_remote_version, undef, undef,
                          undef, undef, undef, 5);

            # Trim versions' number
            $csf_installed_version =~ s/^\s+|\s+$//g;
            $csf_remote_version =~ s/^\s+|\s+$//g;
        } else {
            $csf_remote_version = '0';
        }

        if ($csf_remote_version <= $csf_installed_version) {
            $csf_update_required = '0';
        } else {
            $csf_update_required = '1';
        }

        $csf_title = $theme_text{'body_firewall'} . ' '
          .
          ( `pgrep lfd` ? '' :
' &nbsp;&nbsp;&nbsp;&nbsp;<a class="label label-danger csf-submit" data-id="csf_lfdstatus" class="label label-danger">Stopped</a> '
          );
        $csf_data = (
            '<a href=\'' .
              $gconfig{'webprefix'} . '/csf/index.cgi\' data-id="csf_link_open">ConfigServer Security & Firewall</a> ' .
              product_version_update($csf_installed_version, 'f') . ''

              . ($csf_update_required eq '1' ?
                   '. ' . $theme_text{'theme_update_available'} . ' ' . $csf_remote_version . '&nbsp;&nbsp;&nbsp;' :
                   '&nbsp;&nbsp;&nbsp;'
              ) .
              '
            <form action="/csf/index.cgi" method="post" class="hidden" id="csf_lfdstatus">
                <input type="hidden" name="action" value="lfdstatus">
            </form>
            <form action="/csf/index.cgi" method="post" class="hidden" id="csf_upgrade">
                <input type="hidden" name="action" value="upgrade">
            </form>
            <form action="/csf/index.cgi" method="post" class="hidden" id="csf_temporary_ip_entries">
                <input type="hidden" name="action" value="temp">
            </form>
            <form action="/csf/index.cgi" method="post" class="hidden" id="csf_search_system_log">
                <input type="hidden" name="action" value="loggrep">
            </form>
            <form action="/csf/index.cgi" method="post" class="hidden" id="csf_denyf">
                <input type="hidden" name="action" value="denyf">
            </form>
        '
              . (
                $csf_update_required eq '1' ?
                  '<div class="btn-group">
            <a class="btn btn-xxs btn-success csf csf-submit" data-id="csf_upgrade"><i class="fa fa-fw fa-refresh">&nbsp;</i>'
                  . $theme_text{'theme_update'} . '</a>
            <a class="btn btn-xxs btn-info csf" target="_blank" href="https://download.configserver.com/csf/changelog.txt"><i class="fa fa-fw fa-pencil-square-o">&nbsp;</i>'
                  . $theme_text{'theme_changelog'} . '</a>
            <a class="btn btn-xxs btn-warning csf" target="_blank" href="https://download.configserver.com/csf.tgz"><i class="fa fa-fw fa-download">&nbsp;</i>'
                  . $theme_text{'theme_download'} . '</a>
        </div>'
                :
                  '<div class="btn-group" data-no-update>
           <a class="btn btn-default btn-xxs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="auto top" data-container="body" data-title="Search system logs" data-id="csf_search_system_log"><i class="fa fa-fw fa-filter"></i></a>
           <a class="btn btn-default btn-xxs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="auto top" data-container="body" data-title="Temporary IP entries" data-id="csf_temporary_ip_entries"><i class="fa fa-fw fa-ban"></i></a>
           <a class="btn btn-default btn-xxs btn-hidden hidden csf csf-submit" data-id="csf_denyf"><i class="fa fa-fw fa-trash-o"></i> Flush all blocks</a>
          </div>'
              ) .
              '');
    }

    #System time
    my ($_time);
    $_time      = time();
    $local_time = localtime($_time);
    if (foreign_available("time")) {
        $local_time = '<a data-convertible-timestamp-full="' . $_time . '"  data-convertible-date-full="' .
          $local_time . '" href=\'' . $gconfig{'webprefix'} . '/time/\'>' . $local_time . '</a>';
    } else {
        $local_time = '<span data-convertible-timestamp-full="' .
          $_time . '"   data-convertible-date-full="' . $local_time . '" >' . $local_time . '</span>';
    }

    # Kernel and arch
    if ($info->{'kernel'}) {
        $kernel_arch =
          &theme_text('body_kernelon',                $info->{'kernel'}->{'os'},
                      $info->{'kernel'}->{'version'}, $info->{'kernel'}->{'arch'});
    }

    # CPU Type and cores
    my @c;
    if ($info->{'load'}) {
        @c = @{ $info->{'load'} };
        if (@c > 3) {
            $cpu_type = &theme_text('body_cputype', @c);
        }
    }

    # Temperatures
    if ($info->{'cputemps'}) {
        foreach my $t (@{ $info->{'cputemps'} }) {
            $cpu_temperature .=
              '<span class="badge-custom badge-drivestatus badge-cpustatus" data-stats="cpu"> Core ' .
              $t->{'core'} . ': '
              .
              ( get_module_config_data('system-status', 'collect_units') ?
                  (int(($t->{'temp'} * 9.0 / 5) + 32) . "&#176;F") :
                  (int($t->{'temp'}) . '&#176;C ')
              ) .
              '</span>&nbsp;';
        }
    }
    if ($info->{'drivetemps'}) {
        foreach my $t (@{ $info->{'drivetemps'} }) {
            my $short = $t->{'device'};
            $short =~ s/^\/dev\///;
            my $emsg;
            if ($t->{'errors'}) {
                $emsg .=
                  '&nbsp;&nbsp;<span class="label bg-primary-dark status-error">' .
                  &theme_text('body_driveerr', $t->{'errors'}) . "</span>";
            } elsif ($t->{'failed'}) {
                $emsg .=
                  '&nbsp;&nbsp;<span class="label bg-danger-dark status-error">' .
                  &theme_text('body_drivefailed') . '</span>';
            }
            $hdd_temperature .= '<span class="badge-custom badge-drivestatus" data-stats="drive">' . $short . ': '
              .
              ( get_module_config_data('system-status', 'collect_units') ?
                  (int(($t->{'temp'} * 9.0 / 5) + 32) . "&#176;F") :
                  (int($t->{'temp'}) . '&#176;C ')
              ) .
              $emsg . '</span>&nbsp;';
        }
    }

    # System uptime
    if (foreign_check("proc") && foreign_available("proc")) {
        foreign_require("proc");

        my @system_uptime = defined(&proc::get_system_uptime) ? proc::get_system_uptime() : ();
        if (@system_uptime) {
            my ($day, $hour, $minute) = @system_uptime;
            my $uptime_text;
            if ($day) {
                $uptime_text = &theme_text('body_updays', $day, $hour, $minute);
            } elsif ($minute && $hour) {
                $uptime_text = &theme_text('body_uphours', $hour, $minute);
            } elsif ($minute) {
                $uptime_text = &theme_text('body_upmins', $minute);
            }

            $uptime = '<a href=\'' . $gconfig{'webprefix'} . '/init/\'>' . $uptime_text . '</a>';

        }

        # Running processes
        my @procs = proc::list_processes();
        $running_proc = scalar(@procs);
        $running_proc = '<a href=\'' . $gconfig{'webprefix'} . '/proc/index_tree.cgi\'>' . $running_proc . '</a>';
    }

    # Load averages
    if ($info->{'load'}) {
        my @c = @{ $info->{'load'} };
        if (@c) {
            $load = &theme_text('body_load', @c);
        }
    }

    # Memory
    if ($info->{'mem'}) {

        # Real memory details
        $real_memory =
          &theme_text('body_used', nice_size(($m[0]) * 1000, -1), nice_size(($m[0] - $m[1]) * 1000, -1));

        # Virtual memory details
        if ($m[2] > 0) {
            $virtual_memory =
              &theme_text('body_used', nice_size(($m[2]) * 1000, -1), nice_size(($m[2] - $m[3]) * 1000, -1));
        }

        if (get_text_ltr()) {
            $real_memory = reverse_string($real_memory, "/");
            if ($virtual_memory) {
                $virtual_memory = reverse_string($virtual_memory, "/");
            }
        }
    }

    # Local disk space
    if ($info->{'disk_total'} && $info->{'disk_total'}) {
        $disk_space = &theme_text('body_used_and_free',
                                  nice_size($info->{'disk_total'},                        -1),
                                  nice_size($info->{'disk_free'},                         -1),
                                  nice_size($info->{'disk_total'} - $info->{'disk_free'}, -1));

        if ($disk_space && get_text_ltr()) {
            $disk_space = reverse_string($disk_space, "/");
        }
    }

    # Package updates
    if (&foreign_available("package-updates") && $info->{'poss'}) {
        my $msg;
        my @poss = @{ $info->{'poss'} };
        my @secs = grep {$_->{'security'}} @poss;

        my $poss = scalar(@poss);
        my $secs = scalar(@secs);

        if ($poss && $secs) {
            $msg = &theme_text(
                               ($poss gt 1 &&
                                  $secs gt 1 ? 'body_upsec'  : $poss gt 1 &&
                                  $secs eq 1 ? 'body_upsec1' : $poss eq 1 &&
                                  $secs gt 1 ? 'body_upsec2' : 'body_upsec3'
                               ),
                               $poss, $secs);
        } elsif ($poss) {
            $msg = &theme_text(($poss gt 1 ? 'body_upneed' : 'body_upneed1'), $poss);
        } else {
            $msg = $theme_text{'body_upok'};
        }

        $msg =~ s/([0-9]+)/"<i class=\'badge badge-danger font-style-normal\'> $1 <\/i>"/eg;
        $package_message =
          '<a href=\'' . $gconfig{'webprefix'} . '/package-updates/index.cgi?mode=updates\'>' . $msg . '</a>';

    }

    return ($webmin_version_str, $cpu_percent,        $mem_percent,             $virt_percent,
            $disk_percent,       $host,               $os,                      $webmin_version,
            $virtualmin_version, $cloudmin_version,   $authentic_theme_version, $local_time,
            $kernel_arch,        $cpu_type,           $cpu_temperature,         $hdd_temperature,
            $uptime,             $running_proc,       $load,                    $real_memory,
            $virtual_memory,     $disk_space,         $package_message,         $csf_title,
            $csf_data,           $csf_remote_version, $authentic_remote_version);

}

sub csf_mod
{
    if (foreign_check("csf") &&
        foreign_available("csf") &&
        $current_theme =~ /authentic-theme/)
    {
        my $ext = (theme_debug_mode() ? 'src' : 'min');

        my $csf_header_mod  = $config_directory . "/$current_theme/csf.header";
        my $csf_body_mod    = $config_directory . "/$current_theme/csf.body";
        my $csf_footer_mod  = $config_directory . "/$current_theme/csf.footer";
        my $csf_htmltag_mod = $config_directory . "/$current_theme/csf.htmltag";
        my $csf_bodytag_mod = $config_directory . "/$current_theme/csf.bodytag";

        open(my $fh, '>', $csf_header_mod) or die $!;

        print $fh '<link data-hostname="' . &get_display_hostname() . '" data-version="' . (theme_version(1)) .
          '" rel="shortcut icon" href="' . $gconfig{'webprefix'} . '/images/favicon-webmin.ico">' . "\n";
        print $fh '<link href="' .
          $gconfig{'webprefix'} . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
        print $fh '<link href="' . $gconfig{'webprefix'} .
          '/unauthenticated/css/palettes/nightrider.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";

        if (!$theme_config{'settings_font_family'}) {
            print $fh '<link href="' . $gconfig{'webprefix'} .
              '/unauthenticated/css/fonts-roboto.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
        } elsif ($theme_config{'settings_font_family'} != '1') {
            print $fh '<link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/font-' .
              $theme_config{'settings_font_family'} . '.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
        }

        print $fh '<script src="' .
          $gconfig{'webprefix'} . '/unauthenticated/js/bundle.min.js?' . theme_version(1) . '"></script>' . "\n";

        print $fh '<link href="' .
          $gconfig{'webprefix'} . '/extensions/csf/csf.' . $ext . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
        print $fh '<script src="' .
          $gconfig{'webprefix'} . '/extensions/csf/csf.' . $ext . '.js?' . theme_version(1) . '"></script>' . "\n";

        close $fh;

        open(my $fh2, '>', $csf_body_mod) or die $!;
        print $fh2 '<div class="container-fluid col-lg-10 col-lg-offset-1 csf-container" data-dcontainer="1">' . "\n";
        close $fh2;

        open(my $fh3, '>', $csf_footer_mod) or die $!;
        print $fh3 '</div><script>!v___available_navigation && csf_init()</script>' . "\n";
        close $fh3;

        open(my $fh4, '>', $csf_htmltag_mod) or die $!;
        print $fh4 ' '
          .
          replace("\"", "'",
                  header_html_data('csf', '1',
                                   ("ConfigServer Security & Firewall — " . get_html_framed_title(), 0, 0, '1')
                  )
          ) .
          '';
        close $fh4;

        open(my $fh5, '>', $csf_bodytag_mod) or die $!;
        print $fh5 ' ' . replace("\"", "'", header_body_data('csf')) . '';
        close $fh5;

        my $csf_etc      = "/etc/csf";
        my $csf_prefix   = "csf.";
        my $csf_header   = $csf_etc . "/" . $csf_prefix . "header";
        my $csf_body     = $csf_etc . "/" . $csf_prefix . "body";
        my $csf_footer   = $csf_etc . "/" . $csf_prefix . "footer";
        my $csf_html_tag = $csf_etc . "/" . $csf_prefix . "htmltag";
        my $csf_body_tag = $csf_etc . "/" . $csf_prefix . "bodytag";
        if (-e $csf_etc && -d $csf_etc) {
            copy_source_dest($csf_header_mod, $csf_etc);

            copy_source_dest($csf_body_mod, $csf_etc);

            copy_source_dest($csf_footer_mod, $csf_etc);

            copy_source_dest($csf_htmltag_mod, $csf_etc);

            copy_source_dest($csf_bodytag_mod, $csf_etc);

        }
        my $csf_ui   = uc('style' . '_' . 'custom');
        my $csf_conf = ($csf_etc . "/" . $csf_prefix . "conf");

        if (-f $csf_conf &&
            !-f $config_directory . "/$current_theme/" . $csf_prefix . "ui-introduced")
        {

            (my $fc = read_file_contents($csf_conf)) =~ s/$csf_ui = "0"/$csf_ui = "1"/g;

            write_file_contents($csf_conf,                                                              $fc);
            write_file_contents($config_directory . "/$current_theme/" . $csf_prefix . "ui-introduced", "\n");
        }

    }
}

sub csf_temporary_list
{
    if (foreign_check("csf") && foreign_available("csf")) {
        my $let = "/etc/csf/csf.allow";
        my $ban = "/etc/csf/csf.deny";
        my $cnf = "/etc/csf/csf.conf";
        my $tmp = "/var/lib/csf/csf.tempban";
        my $log = "/var/lib/csf/stats/iptables_log";

        my @p;
        my @t;
        my @l;

        if (-e $cnf && !-z $cnf) {
            my @q;
            my $x = read_file_contents($let) . read_file_contents($ban);
            my $z = read_file_contents($cnf);
            (@p) = $z =~
/(?:TCP_IN|UDP_IN|TCP6_IN|UDP6_IN|PORTS_TCP|PORTS_UDP|CT_PORTS|CLUSTER_PORT|PORTS_webmin|PORTS_sshd).*=\s*"([\d+,]+)"/g;
            (@q) = $x =~ /^(?:(?!#).).*\|(?:d|s)=([\d+,]+)\|/gm;
            if (@p || @q) {
                @p = array_unique(split(",", join(",", (@p, @q))));
            }

        }

        if (-e $tmp && !-z $tmp) {
            open(my $IN, "<", $tmp) or die $!;
            @t = <$IN>;
            chomp @t;
            close($IN);
        }

        if (@t && -e $log) {
            open(my $IN, "<", $log) or die $!;
            flock($IN, LOCK_SH);
            my @i = <$IN>;
            close($IN);
            chomp @i;
            @i = reverse @i;
            my $c = 0;

            my $s = scalar @i;
            my @g;

            foreach my $h (reverse @t) {
                if ($h) {
                    my ($a, $b, $d, $e, $f, $g) = split(/\|/, $h);
                    my ($ll, $dl) = (undef, '|');
                    for (my $x = 0; $x < $s; $x++) {
                        $c++;
                        my $u = $i[$x];
                        my ($o, $l) = split(/\|/, $u);
                        my ($r, $w, $k);
                        if ($l =~ /SRC=(\S+)/) {$r = $1}
                        if ($l =~ /DST=(\S+)/) {$w = $1}
                        if ($l =~ /DPT=(\d+)/) {$k = $1}
                        if (($r eq $b && array_contains(\@p, $k)) || $d =~ /\d/g || $g =~ /failed|\(CT\)/gi) {
                            $ll = ($a . $dl . $b . $dl . $w . $dl . $k . $dl . $d . $dl . $e . $dl . $f . $dl . $g);
                            if (!array_contains(\@g, $g) && !array_contains(\@l, $ll)) {
                                push @g, $g;
                                push @l, $ll;
                            }
                        }
                    }
                }
            }
        }

        convert_to_json(\@l);
    } else {
        convert_to_json();
    }
}

sub get_current_user_config
{
    our ($___user) =
      grep {$_->{'name'} eq $base_remote_user} &acl::list_users();
    return $___user;
}

sub get_col_num
{
    my ($info, $max_col) = @_;
    my $num_col = 0;
    if ($info->{'cpu'}) {$num_col++;}
    if ($info->{'mem'}) {
        my @m = @{ $info->{'mem'} };
        if (@m && $m[0]) {$num_col++;}
        if (@m && $m[2]) {$num_col++;}
    }
    if ($info->{'disk_total'}) {$num_col++;}
    my $col = $max_col / $num_col;
    return $col;
}

sub print_table_row
{
    my ($title, $content, $id) = @_;
    print '<tr>' . "\n";
    print '<td style="width:30%;"><strong>' . $title . '</strong></td>' . "\n";
    print '<td  style="width:70%;"><span data-id="' . $id . '">' . $content . '</span></td>' . "\n";
    print '</tr>' . "\n";
}

sub print_table_row_responsive
{
    my ($title, $content, $id, $title2, $content2, $id2) = @_;
    print '<tr>' . "\n";
    print '<td style="width:' . ($title2 ? '20' : '') . '%;"><strong>' . $title . '</strong></td>' . "\n";
    print '<td  style="width:' .
      ($title2 ? '30' : '') . '%;"><span data-id="' . $id . '">' . $content . '</span></td>' . "\n";
    if ($title2) {
        print '<td style="width:15%;"><strong>' . $title2 . '</strong></td>' . "\n";
        print '<td  style="width:35%;"><span data-id="' . $id2 . '">' . $content2 . '</span></td>' . "\n";
        print '</tr>' . "\n";
    }
}

sub print_favorites
{

    my $f = &read_file_contents($config_directory . "/$current_theme/favorites.json");

    print '<div id="favorites-menu">
    <div class="favorites-menu-outer">
      <nav class="favorites-menu">
          <ul class="favorites-menu-content ui-sortable">
              <li class="menu-exclude exclude favorites-title">
                <h1><i class="fa fa-star-o"></i>&nbsp;&nbsp;'
      . $theme_text{'left_favorites'} .
'<sup style="position: absolute; margin: 25px 0 0 -10px;" class="hidden">&nbsp;&nbsp;<small class="text-white"> <a href="'
      . $gconfig{'webprefix'}
      . '/settings-editor_read.cgi?file=' .
      $config_directory . '/' . $current_theme . '/favorites.json" class="fa fa-pencil-square-o' .
      ($f =~ m/"favorites":/ ? '' : ' hidden') . '" style="display: inline; font-size: 1em;"></a></small></sup></h1>
              </li>';

    if ($f && $f =~ m/"favorites":/) {
        my ($f) = $f =~ /\{(?:\{.*\}|[^{])*\}/sg;
        my $fc = convert_from_json($f);
        foreach my $favorite (@{ $fc->{'favorites'} }) {
            if (length($favorite->{"link"})) {
                print '
              <li class="menu-exclude ui-sortable-handle">
                  <a class="menu-exclude-link" href="'
                  . $favorite->{"link"} . '"><i data-product="' .
                  $favorite->{"icon"} . '" class="wbm-' . $favorite->{"icon"} . ' wbm-sm">&nbsp;</i><span class="f__c">
                            ' . $favorite->{"title"} . '
                        &nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px"><i class="fa fa-times"></i></small></span>
                  </a>
              </li>';
            }
        }
    }
    print '
              <li class="menu-exclude exclude favorites-no-message'
      . ($f !~ m/"favorites":/ ? '' : ' hidden') . '">
                    <span>' . $theme_text{'left_favorites_no'} . '</span>
              </li>
        ';

    print '
        </ul>
      </nav>
    </div>
    <a class="favorites-menu-close">
      <div class="favorites-menu-icon">
        <div class="favorites-menu-bar"></div>
        <div class="favorites-menu-bar"></div>
      </div>
    </a>
</div>';
}

sub print_panels_group_start
{
    my ($id) = @_;
    print '<div class="panel-group" id="' . $id . '" role="tablist" aria-multiselectable="true">';
}

sub print_panels_group_end
{
    print '</div>';
}

sub print_panel
{
    my ($opened, $id, $title, $data) = @_;

    print '
              <div class="panel panel-default'
      . ($theme_config{'settings_animation_tabs'} ne 'false' ? '' :
           ' disable-animations'
      ) .
      '">
                  <div class="panel-heading" data-toggle="collapse" data-target="#' .
      $id . '-collapse" role="tab" id="' . $id . '">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#'
      . $id . '-collapse" aria-expanded="'
      .
      ( $opened ? 'true' :
          'false'
      ) .
      '" aria-controls="' . $id . '-collapse">' . $title . '</a>
                    </h4>
                  </div>
              <div id="'
      . $id . '-collapse" class="panel-collapse collapse' .
      ($opened ? ' in' : '') . '" role="tabpanel" aria-labelledby="' . $id . '">
                <div class="panel-body">' . $data . '</div></div></div>';

}

sub parse_license_date
{
    if ($_[0] =~ /^(\d{4})-(\d+)-(\d+)$/) {
        return eval {timelocal(0, 0, 0, $3, $2 - 1, $1 - 1900)};
    }
    return undef;
}

sub embed_logo
{

    my $lgt;
    my $img;

    ((get_env('script_name') eq '/session_login.cgi' || get_env('script_name') eq '/pam_login.cgi') ?
       ($lgt = 'logo_welcome') :
       ($lgt = 'logo'));

    my $lnk = $config_directory . "/$current_theme/" . $lgt . ".png";
    if (-r $lnk) {
        $img = ('<img src="data:image/png;base64,' . encode_base64(read_file_contents($lnk)) . '">');
    }

    if ($get_user_level eq '1') {
        my %reseller = get_user_acl(undef, 'virtual-server');
        if (length $reseller{'logo'} > 4 && $reseller{'link'}) {
            $img = ('<a class="pointer-events-auto" target="_blank" href="' .
                    $reseller{'link'} . '"><img src="' . $reseller{'logo'} . '"></a>');
        } elsif ($reseller{'logo'}) {
            $img = ('<img src="' . $reseller{'logo'} . '">');
        }

    }

    if ($img && $img !~ /="none"/) {
        print '<div class="__' . $lgt . ' _' . $lgt . '">';
        print $img;
        print '</div>' . "\n";
    }
}

sub head
{
    print "Content-type: text/html\n\n";
}

sub embed_login_head
{

    my $ext = (theme_debug_mode() ? 'src' : 'min');

    # Define page title
    my $title = $text{'session_header'};

    print '<head>', "\n";
    embed_noscript();
    print '<meta charset="utf-8">', "\n";
    embed_favicon();
    print '<title>', $title, '</title>', "\n";
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";

    print '<link href="' .
      $gconfig{'webprefix'} . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    print '<script>setTimeout(function(){var a=document.querySelectorAll(\'input[type="password"]\');i=0;
for(length=a.length;i<length;i++){var b=document.createElement("span"),d=30<a[i].offsetHeight?1:0;b.classList.add("input_warning_caps");b.setAttribute("title","Caps Lock");d&&b.classList.add("large");a[i].classList.add("use_input_warning_caps");a[i].parentNode.insertBefore(b,a[i].nextSibling);a[i].addEventListener("blur",function(){this.nextSibling.classList.remove("visible")});a[i].addEventListener("keydown",function(c){"function"===typeof c.getModifierState&&((state=20===c.keyCode?!c.getModifierState("CapsLock"):
c.getModifierState("CapsLock"))?this.nextSibling.classList.add("visible"):this.nextSibling.classList.remove("visible"))})};},100);function spinner() {var x = document.querySelector(\'.fa-sign-in:not(.invisible)\'),s = \'<span class="cspinner_container"><span class="cspinner"><span class="cspinner-icon white small"></span></span></span>\';if(x){x.classList.add("invisible"); x.insertAdjacentHTML(\'afterend\', s);x.parentNode.classList.add("disabled");x.parentNode.disabled=true}}</script>';

    embed_css_night_rider();
    embed_css_fonts();
    embed_background();
    embed_styles();
    embed_overlay_head();
    print '</head>', "\n";
}

sub theme_update_incompatible
{
    my ($authentic_remote_data) = @_;

    my $webmin_compatible_version;
    my $usermin_compatible_version;
    my @notice;
    my $force_button =
      '<a data-git="1" data-stable="0" data-force="1" class="authentic_update text-darker" href="javascript:;">' .
      $theme_text{'theme_xhred_global_click_here'} . '</a>';
    my $usermin_enabled_updates = ($theme_config{'settings_sysinfo_theme_updates_for_usermin'} ne 'false' ? 1 : 0);
    my ($authentic_remote_version) = $authentic_remote_data =~ /^version=(.*)/gm;

    $authentic_remote_data =~ /^depends=(\d.\d\d\d)\s+(\d.\d\d\d)|(\d.\d\d\d)/gm;
    $webmin_compatible_version = $3 ? $3 : $1;
    $usermin_compatible_version = $2;

    if (

        ($authentic_remote_version                           &&
         $webmin_compatible_version                          &&
         $usermin_compatible_version                         &&
         (get_webmin_version() < $webmin_compatible_version) &&
         ($has_usermin && $usermin_enabled_updates && $has_usermin_version < $usermin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                           theme_text('theme_git_patch_incompatible_message', $theme_text{'theme_name'},
                                      $authentic_remote_version,              $theme_text{'theme_xhred_titles_wm'},
                                      $webmin_compatible_version,             $theme_text{'theme_xhred_titles_um'},
                                      $usermin_compatible_version
                             ) .
                             " "
                             .
                             theme_text('theme_git_patch_incompatible_message_desc',
                                        $force_button,
                                        ($theme_text{'theme_xhred_titles_wm'} . "/" . $theme_text{'theme_xhred_titles_um'})
                             )
                    ) };
    } elsif (

        ($authentic_remote_version && $webmin_compatible_version && (get_webmin_version() < $webmin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                                       theme_text('theme_git_patch_incompatible_message_s', $theme_text{'theme_name'},
                                                  $authentic_remote_version, $theme_text{'theme_xhred_titles_wm'},
                                                  $webmin_compatible_version
                                         ) .
                                         " "
                                         .
                                         theme_text('theme_git_patch_incompatible_message_desc', $force_button,
                                                    $theme_text{'theme_xhred_titles_wm'}
                                         )
                    ) };
    } elsif (

        ($authentic_remote_version   &&
         $usermin_compatible_version &&
         ($has_usermin && $usermin_enabled_updates && $has_usermin_version < $usermin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                                       theme_text('theme_git_patch_incompatible_message_s', $theme_text{'theme_name'},
                                                  $authentic_remote_version, $theme_text{'theme_xhred_titles_um'},
                                                  $usermin_compatible_version
                                         ) .
                                         " "
                                         .
                                         theme_text('theme_git_patch_incompatible_message_desc', $force_button,
                                                    $theme_text{'theme_xhred_titles_um'}
                                         )
                    ) };
    }

    return @notice;
}

sub theme_remote_version
{

    my ($data, $force_stable_check, $force_beta_check) = @_;

    my $remote_version = '0';
    my $remote_release;
    my $error;

    if (($theme_config{'settings_sysinfo_theme_updates'} eq 'true' || $data) && $get_user_level eq '0' && $in =~ /xhr-/) {
        if (($tconfig{'show_beta_updates'} eq '1' || $force_beta_check) && !$force_stable_check) {
            http_download('api.github.com',                                             '443',
                          '/repos/authentic-theme/authentic-theme/contents/theme.info', \$remote_version,
                          \$error,                                                      undef,
                          1,                                                            undef,
                          undef,                                                        5,
                          undef,                                                        undef,
                          { 'accept', 'application/vnd.github.v3.raw' });

        } else {
            http_download('api.github.com', '443', '/repos/authentic-theme/authentic-theme/releases/latest',
                          \$remote_release, \$error, undef, 1, undef, undef, 5);
            $remote_release =~ /tag_name":"(.*?)"/;
            http_download('api.github.com',                                                            '443',
                          '/repos/authentic-theme/authentic-theme/contents/theme.info?ref=' . $1 . '', \$remote_version,
                          \$error,                                                                     undef,
                          1,                                                                           undef,
                          undef,                                                                       5,
                          undef,                                                                       undef,
                          { 'accept', 'application/vnd.github.v3.raw' });
        }
    }
    if ($data) {
        return $remote_version;
    } else {
        ($remote_version) = $remote_version =~ /^version=(.*)/m;
        return $remote_version;
    }

}

sub theme_config_dir_available
{
    my $_wm_at_conf_dir = $config_directory . '/' . $current_theme;

    if (!-d $_wm_at_conf_dir) {
        mkdir($_wm_at_conf_dir, 0755);
    } else {
        chmod(0755, $_wm_at_conf_dir);
    }

    if ($has_usermin) {
        (my $_um_at_conf_dir = $config_directory) =~ s/webmin/usermin/;

        if (!-d $_um_at_conf_dir) {
            mkdir($_um_at_conf_dir, 0755);
        } else {
            chmod(0755, $_um_at_conf_dir);
        }
    }
}

sub domain_available
{
    my ($id, $type) = @_;
    if (&foreign_available('virtual-server')) {
        &foreign_require("virtual-server", "virtual-server-lib.pl");
        foreach my $dom (&virtual_server::list_visible_domains()) {
            if ($id eq $dom->{$type}) {
                return $dom;
            }
        }
    } else {
        return undef;
    }

}

sub domain_available_count
{
    if (&foreign_available('virtual-server')) {
        &foreign_require("virtual-server", "virtual-server-lib.pl");
        my %doms = virtual_server::list_visible_domains();
        return scalar(keys %doms);
    }
}

sub server_available
{
    my ($id, $type) = @_;
    if (&foreign_available('server-manager')) {
        &foreign_require("server-manager", "server-manager-lib.pl");
        foreach my $host (&server_manager::list_managed_servers()) {
            if ($id eq $host->{$type}) {
                return $host;
            }
        }
    } else {
        return undef;
    }

}

sub get_default_target
{
    my $default;
    my $taget_data;
    my $in_local;
    my $module;

    if ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/) {
        $module = 'virtualmin';
    } elsif ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/) {
        $module = 'cloudmin';
    }

    if ($theme_requested_url =~ /virtual-server/ || $theme_requested_url =~ /server-manager/) {
        $module = ($theme_requested_url =~ /virtual-server/ ? 'virtualmin' :
                     'cloudmin');
        $in_local = $t_uri___i;
    } else {
        $in_local = $in{$theme_module_query_id};
    }

    $taget_data = ($module eq 'virtualmin' ? domain_available($in_local, 'dom') :
                     server_available($in_local, 'host'));
    if ($taget_data) {
        $default = $taget_data->{'id'};
    } else {
        $default = $theme_config{ 'settings_right_' . $module . '_default' };
        $default = ($default ne 'index.cgi' ? $default :
                      undef);
    }

    return $default;
}

sub get_theme_user_link
{
    my $is_hidden = (!foreign_available("webmin") &&
                       $theme_config{'settings_show_theme_configuration_for_admins_only'} eq 'true' ? ' hidden-force ' :
                       undef);
    my $is_hidden_link = ($get_user_level ne '0' ? ' hidden-force '          : undef);
    my $link           = ($get_user_level eq '0' ? '/webmin/edit_themes.cgi' : '/settings-user.cgi');

    return '' . theme_version() .
      ' <div class="btn-group margined-left-4"><a data-href="#theme-info" class="btn btn-default btn-xxs' .
      ($is_hidden . $is_hidden_link) .
      '"><i class="fa fa-info-circle"></i></a><a href="' . ($gconfig{'webprefix'} . $link) . '" data-href="' .
      ($gconfig{'webprefix'} . $link) . '" class="btn btn-default btn-xxs btn-hidden hidden' . $is_hidden . '" title="' .
      $theme_text{'settings_right_theme_configurable_options_title'} . '"><i class="fa fa-cogs"></i></a></div>';
}

sub settings_get_select_font_family
{
    my ($v, $k) = @_;
    return '<select class="ui_select" name="' . $k . '">

                    <option value="system-default"'
      . ($v eq 'system-default' && ' selected') . '>[' . $theme_text{'theme_xhred_global_local_system_default'} . ']</option>

                    <option value="0"'
      . ($v eq '0' && ' selected') . '>Roboto (' . $theme_text{'theme_xhred_global_default'} . ', ' .
      lc($theme_text{'theme_xhred_global_shipped'}) . ')</option>

                    <option value="1"'
      . ($v eq '1' && ' selected') . '>Roboto</option>

                    <option value="arial"'
      . ($v eq 'arial' && ' selected') . '>Arial</option>


                    <option value="helvetica-neue"'
      . ($v eq 'helvetica-neue' && ' selected') . '>Helvetica Neue</option>

                    <option value="open-sans"'
      . ($v eq 'open-sans' && ' selected') . '>Open Sans</option>

                    <option value="open-sans-condensed"'
      . ($v eq 'open-sans-condensed' && ' selected') . '>Open Sans Condensed</option>

                    <option value="sans-serif"'
      . ($v eq 'sans-serif' && ' selected') . '>Sans Serif</option>

                    <option value="segoe-ui"'
      . ($v eq 'segoe-ui' && ' selected') . '>Segoe UI</option>

                    <option value="tahoma"'
      . ($v eq 'tahoma' && ' selected') . '>Tahoma</option>

                    <option value="trebuchet-ms"'
      . ($v eq 'trebuchet-ms' && ' selected') . '>Trebuchet MS</option>

                </select>';

}

sub settings_get_select_navigation_color
{
    my ($v, $k) = @_;
    return '<select class="ui_select" name="' . $k . '">

                    <option value="blue"'
      . ($v eq 'blue' && ' selected') . '>Royal Blue</option>

                    <option value="darkBlue"'
      . ($v eq 'darkBlue' && ' selected') . '>Midnight Blue</option>

                    <option value="lightBlue"'
      . ($v eq 'lightBlue' && ' selected') . '>Dodger Blue</option>

                    <option value="gold"'
      . ($v eq 'gold' && ' selected') . '>Pale Golden</option>

                    <option value="green"'
      . ($v eq 'green' && ' selected') . '>Sea Green</option>

                 <option value="red"'
      . ($v eq 'red' && ' selected') . '>Dark Red</option>

                    <option value="indianRed"'
      . ($v eq 'indianRed' && ' selected') . '>Indian Red</option>

                    <option value="orange"'
      . ($v eq 'orange' && ' selected') . '>Longhorn Orange</option>

                    <option value="white"'
      . ($v eq 'white' && ' selected') . '>White Snow (' . $theme_text{'theme_xhred_global_default'} . ')</option>

                    <option value="brown"'
      . ($v eq 'brown' && ' selected') . '>Saddle Brown</option>


                    <option value="purple"'
      . ($v eq 'purple' && ' selected') . '>Dark Purple</option>

                    <option value="grey"'
      . ($v eq 'grey' && ' selected') . '>Dim Grey</option>

                    <option value="darkGrey"'
      . ($v eq 'darkGrey' && ' selected') . '>Dark Grey</option>

                    <option value="noir"'
      . ($v eq 'noir' && ' selected') . '>Noir</option>

                    <option value="gunmetal"'
      . ($v eq 'gunmetal' && ' selected') . '>Gunmetal</option>
                </select>';

}

sub settings_get_select_editor_color
{
    my ($v, $k) = @_;
    return '<select class="ui_select" name="' . $k . '">

            <option value="monokai"'
      . ($v eq 'monokai' && ' selected') .
      '>' . $theme_text{'theme_xhred_global_dark'} . ' (' . $theme_text{'theme_xhred_global_default'} . ')</option>

            <option value="elegant"'
      . ($v eq 'elegant' && ' selected') . '>' . $theme_text{'theme_xhred_global_light'} . '</option>


        </select>';

}

sub theme_settings
{
    my ($t, $k, $v) = @_;

    if ($t eq 'get') {
        my @settings = (
            '__',
            theme_settings('fa',
                           'file-o',
                           &theme_text('settings_right_page_defaults_title') .
                             "~" . &theme_text('settings_right_page_default_description')
            ),
            'settings_right_default_tab_webmin',
            (foreign_available("virtual-server") ? 'virtualmin' : '/'),
            'settings_webmin_default_module',
            get_goto_module(),
            'settings_right_virtualmin_default',
            'sysinfo.cgi',
            'settings_right_cloudmin_default',
            'sysinfo.cgi',
            'settings_right_default_tab_usermin',
            'mail',

            '__',
            theme_settings('fa', 'desktop', &theme_text('settings_global_options_title')),
            'settings_font_family',
            '0',
            'settings_navigation_color',
            'white',
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
            'settings_cm_editor_palette',
            'monokai',
            'settings_right_page_hide_persistent_vscroll',
            'true',
            'settings_hide_top_loader',
            'false',
            'settings_enable_container_offset',
            'true',
            'settings_contrast_mode',
            'false',
            'settings_perform_content_scrolling',
            'true',
            'settings_animation_left',
            'true',
            'settings_animation_tabs',
            'true',
            'settings_right_reload',
            'true',
            'settings_global_passgen_format',
            '15|a-z,A-Z,0-9',

            '__',
            theme_settings('fa', 'info-circle', &theme_text('settings_sysinfo_real_time_status_options')),
            'settings_sysinfo_real_time_status',
            'true',
            'settings_sysinfo_real_time_status_disk',
            'true',
            'settings_sysinfo_real_time_timeout',
            '1000',

            '__',
            theme_settings('fa', 'info-circle', &theme_text('settings_right_sysinfo_page_options_title')),
            'settings_sysinfo_easypie_charts',
            'true',
            'settings_sysinfo_easypie_charts_size',
            '172',
            'settings_sysinfo_easypie_charts_width',
            '2',
            'settings_sysinfo_easypie_charts_scale',
            '8',
            'settings_sysinfo_expand_all_accordions',
            'false',
            'settings_sysinfo_max_servers',
            '10',

            '__',
            theme_settings('fa', 'bars', &theme_text('settings_right_navigation_menu_title')),
            'settings_navigation_always_collapse',
            'false',
            'settings_leftmenu_width',
            '260',
            'settings_switch_rdisplay',
            'false',
            'settings_show_webmin_tab',
            'true',
            'settings_button_tooltip',
            'true',
            'settings_leftmenu_section_hide_refresh_modules',
            'false',
            'settings_leftmenu_section_hide_unused_modules',
            'false',
            'settings_sysinfo_link_mini',
            'false',
            'settings_show_night_mode_link',
            'true',
            'settings_show_terminal_link',
            'true',
            'settings_favorites',
            'true',
            'settings_theme_options_button',
            'true',
            'settings_show_theme_configuration_for_admins_only',
            'false',
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

            '__',
            theme_settings('fa', 'bell', &theme_text('settings_right_notification_slider_options_title')),
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
            'settings_side_slider_palette',
            'grey',

            '__',
            theme_settings('fa', 'table', &theme_text('settings_right_table_options_title')),
            'settings_right_hide_table_icons',
            'false',
            'settings_right_small_table_icons',
            'false',
            'settings_right_animate_table_icons',
            'true',
            'settings_right_grayscaled_table_icons',
            'true',

            '__',
            theme_settings('fa', 'keyboard-o', &theme_text('settings_right_hotkey_options_title')),
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
            'settings_hotkey_shell',
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
            'l', '__',
            theme_settings('fa', 'sub-title', '' . "~" . &theme_text('settings_right_hotkey_custom_options_description')),
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

            '__',
            theme_settings('fa', 'info-circle', &theme_text('settings_right_soft_updates_page_options_title')),
            'settings_sysinfo_theme_updates',
            'false',
            'settings_sysinfo_theme_updates_for_usermin',
            'true',
            'settings_sysinfo_csf_updates',
            'false');

        return (@settings);
    }

    if ($t eq 'exclusions') {

        # Exclude list of combined settings for UserminVirtualmin/Cloudmin
        my @s_vc_e = ('settings_show_theme_configuration_for_admins_only');

        if (!&foreign_available("server-manager") &&
            !foreign_available("virtual-server") &&
            !get_usermin_data("mailbox"))
        {
            foreach my $e (@s_vc_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of combined settings for Virtualmin/Cloudmin
        my @s_vc_e = ('settings_right_default_tab_webmin', 'settings_right_reload');

        if (!&foreign_available("server-manager") &&
            !foreign_available("virtual-server"))
        {
            foreach my $e (@s_vc_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of settings for Virtualmin
        my @s_vm_e = ('settings_right_virtualmin_default',     'settings_show_webmin_tab',
                      'settings_hotkey_toggle_key_virtualmin', 'settings_sysinfo_max_servers');

        if (!foreign_available("virtual-server")) {
            foreach my $e (@s_vm_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of settings for Cloudmin
        my @s_cm_e = ('settings_right_cloudmin_default', 'settings_hotkey_toggle_key_cloudmin');
        if (!&foreign_available("server-manager")) {
            foreach my $e (@s_cm_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of settings for Usermin
        my @s_um_e = ('settings_hotkey_toggle_key_usermin', 'settings_sysinfo_theme_updates_for_usermin');
        if (!$has_usermin) {
            foreach my $e (@s_um_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of settings for Webmail
        my @s_wm_e = ('settings_hotkey_toggle_key_webmail', 'settings_right_default_tab_usermin');
        if (!get_usermin_data("mailbox")) {
            foreach my $e (@s_wm_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude list of settings for ConfigServer Security & Firewall
        my @s_cf_e = ('settings_sysinfo_csf_updates');
        if (!&foreign_available("csf")) {
            foreach my $e (@s_cf_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        # Exclude Netdata link and default address
        my @s_netd_e = ('settings_leftmenu_netdata', 'settings_leftmenu_netdata_link');
        if (!has_command('netdata')) {
            foreach my $e (@s_netd_e) {
                push(@theme_settings_excluded, $e);
            }
        }

        return @theme_settings_excluded;
    }

    if ($t eq 'fa') {
        return $v;
    }

    if ($t eq 'header') {
        return '
            ' . $theme_text{'settings_right_title'} . '
            <p></p>
            <form class="ui_form" action="/settings.cgi" method="post"
                data-text-current_theme="'
          . $theme_text{'settings_right_current_theme'}

          . '" data-text-settings_right_saved="' . $theme_text{'settings_right_saved'}

          . '" data-text-save="' . $text{'save'}

          . '" data-text-settings_right_saving="' . $theme_text{'settings_right_saving'}

          . '" data-text-settings_right_restore_defaults="' . $theme_text{'settings_right_restore_defaults'}

          . '" data-text-settings_right_clear_local_cache="' . $theme_text{'settings_right_clear_local_cache'}

          . '" data-text-settings_right_restored="' . $theme_text{'settings_right_restored'}

          . '" data-text-settings_right_restoring="' . $theme_text{'settings_right_restoring'}

          . '" data-text-error="' . $theme_text{'error'}

          . '">
                <div class="table-responsive">
                    <table class="table table-striped table-condensed table-subtable">
                        <thead><tr><th class="table-title" style="width: auto"><i class="fa fa-cogs vertical-align-text-middle"></i>&nbsp;<b>'
          . $theme_text{'settings_right_theme_configurable_options_title'} . '</b></th></tr></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <table class="sub_table_container table-hardcoded" width="100%">
                                        <tbody>
                                        ';
    }

    if ($t eq 'section') {
        foreach my $e (@theme_settings_excluded) {
            if ($k =~ /\Q$theme_text{$e}\E/) {
                return;
            }
        }
        return '
            <tr>
                <td colspan="2" class="col_value'
          . ($k ? ' col_header ' : '') . ' atssection"><b>' . $k . '</b>' .
          ($v && '<br><div class="smaller text-normal no-padding">' . $v . '</div>') . '</td>
            </tr>
        ';
    }

    if ($t eq 'content') {
        foreach my $o (@theme_settings_excluded) {
            if ($k eq $o) {
                return;
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

            $v = '<span class="awradio awobject' . $disabled . '">
                    <input class="iawobject" type="radio" name="'
              . $k . '" id="' . $k . '_1" value="true"' . ($v eq 'true' && ' checked') . '>
                    <label class="lawobject" for="'
              . $k . '_1">' . $text{'yes'} . '</label>
                    <input class="iawobject" type="radio" name="'
              . $k . '" id="' . $k . '_0" value="false"' . ($v eq 'false' && ' checked') . '>
                    <label class="lawobject" for="'
              . $k . '_0">' . $text{'no'} . '</label>
                </span>
            ';

        } elsif ($k =~ /settings_security_notify_on_/ ||
                 $k =~ /settings_hotkey_toggle_key_/           ||
                 $k eq 'settings_hotkey_focus_search'          ||
                 $k eq 'settings_hotkey_navigation'            ||
                 $k eq 'settings_hotkey_slider'                ||
                 $k eq 'settings_hotkey_toggle_slider'         ||
                 $k eq 'settings_hotkey_reload'                ||
                 $k eq 'settings_hotkey_shell'                 ||
                 $k eq 'settings_hotkey_sysinfo'               ||
                 $k eq 'settings_hotkey_favorites'             ||
                 $k eq 'settings_sysinfo_real_time_timeout'    ||
                 $k eq 'settings_sysinfo_easypie_charts_size'  ||
                 $k eq 'settings_sysinfo_easypie_charts_width' ||
                 $k eq 'settings_sysinfo_easypie_charts_scale' ||
                 $k eq 'settings_sysinfo_max_servers')
        {

            my $width =
              ($k =~ /settings_hotkey_toggle_key_/ ||
                $k eq 'settings_hotkey_focus_search'          ||
                $k eq 'settings_hotkey_navigation'            ||
                $k eq 'settings_hotkey_slider'                ||
                $k eq 'settings_hotkey_toggle_slider'         ||
                $k eq 'settings_hotkey_reload'                ||
                $k eq 'settings_hotkey_shell'                 ||
                $k eq 'settings_hotkey_sysinfo'               ||
                $k eq 'settings_hotkey_favorites'             ||
                $k eq 'settings_sysinfo_easypie_charts_width' ||
                $k eq 'settings_sysinfo_easypie_charts_scale' ||
                $k eq 'settings_sysinfo_max_servers') ? ' width: 36px; ' :
              ( ($k eq 'settings_sysinfo_real_time_timeout' || $k eq 'settings_sysinfo_easypie_charts_size') ?
                  ' width: 50px; ' :
                  ' width: 95%; ');
            my $max_length =
              ($k =~ /settings_hotkey_toggle_key_/ ||
                $k eq 'settings_hotkey_focus_search'  ||
                $k eq 'settings_hotkey_navigation'    ||
                $k eq 'settings_hotkey_slider'        ||
                $k eq 'settings_hotkey_toggle_slider' ||
                $k eq 'settings_hotkey_reload'        ||
                $k eq 'settings_hotkey_shell'         ||
                $k eq 'settings_hotkey_sysinfo'       ||
                $k eq 'settings_hotkey_favorites') ?
              ' maxlength="1"' :
              ' ';

            $v = '
                <input style="display: inline;'
              . $width . 'height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="text" name="' .
              $k . '" value="' . $v . '"' . $max_length . '>
            ';

        } elsif ($k eq 'settings_grayscale_level_navigation' ||
                 $k eq 'settings_sepia_level_navigation'      ||
                 $k eq 'settings_saturate_level_navigation'   ||
                 $k eq 'settings_hue_level_navigation'        ||
                 $k eq 'settings_invert_level_navigation'     ||
                 $k eq 'settings_brightness_level_navigation' ||
                 $k eq 'settings_contrast_level_navigation'   ||
                 $k eq 'settings_leftmenu_width')
        {

            my $range_max = '1';
            my $range_min = '0';
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
            }
            $v = '
                <input style="display: inline; width: 80%; height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="range" min="'
              . $range_min . '" max="' . $range_max . '" step="' . $range_step . '" name="' . $k . '" value="' . $v . '">
            ';

        } elsif ($k eq 'settings_hotkey_custom_1' ||
                 $k eq 'settings_hotkey_custom_2'       ||
                 $k eq 'settings_hotkey_custom_3'       ||
                 $k eq 'settings_hotkey_custom_4'       ||
                 $k eq 'settings_hotkey_custom_5'       ||
                 $k eq 'settings_hotkey_custom_6'       ||
                 $k eq 'settings_hotkey_custom_7'       ||
                 $k eq 'settings_hotkey_custom_8'       ||
                 $k eq 'settings_hotkey_custom_9'       ||
                 $k eq 'settings_leftmenu_netdata_link' ||
                 $k eq 'settings_leftmenu_user_html'    ||
                 $k eq 'settings_global_passgen_format')
        {
            my $width = ' width: 40%; ';

            if ($k eq 'settings_global_passgen_format') {
                $width = ' width: 30%; ';
            }
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
              . ($v eq '/' && ' selected') . '>Webmin</option>

                '
              . (&foreign_available("virtual-server") &&
                 ' <option value="virtualmin"' . ($v eq 'virtualmin' && ' selected') . '>Virtualmin</option> ') .
              '

               '
              . (&foreign_available("server-manager") &&
                 ' <option value="cloudmin"' . ($v eq 'cloudmin' && ' selected') . '>Cloudmin</option>') .
              '
                </select>';
        } elsif ($k eq 'settings_webmin_default_module') {
            my @modules = get_all_module_infos();
            my $select = ui_select("goto_webmin_default_module",
                                   $gconfig{'gotomodule'},
                                   [["", ""], map {[$_->{'dir'}, $_->{'desc'}]}
                                      sort {$a->{'desc'} cmp $b->{'desc'}} @modules
                                   ]);
            $v = $select;
        } elsif ($k eq 'settings_right_default_tab_usermin') {
            $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
              . ($v eq '/' && ' selected') . '>Usermin</option>

                '
              . (get_usermin_data('mailbox') && ' <option value="mail"' . ($v eq 'mail' && ' selected') . '>Mail</option> ')
              . '

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
        } elsif ($k eq 'settings_right_virtualmin_default') {
            get_user_level();
            if (foreign_available('virtual-server')) {
                $v = &ui_select($k, $v,
                                [[undef,       undef],
                                 ['index.cgi', $theme_text{'theme_config_virtualmin'}],
                                 map {[$_->{'id'}, &virtual_server::show_domain_name($_)]}
                                   grep {&virtual_server::can_edit_domain($_)}
                                   sort {$a->{'dom'} cmp $b->{'dom'}} &virtual_server::list_domains()
                                ]);
            }
        } elsif ($k eq 'settings_right_cloudmin_default') {
            if (&foreign_available('server-manager')) {
                get_user_level();
                my @servers = &server_manager::list_available_managed_servers_sorted();
                $v = &ui_select($k, $v,
                                [[undef,       undef],
                                 ['index.cgi', $theme_text{'theme_config_cloudmin'}],
                                 map {[$_->{'id'}, $_->{'host'}]} @servers,
                                ]);
            }

        } elsif ($k eq 'settings_font_family') {
            $v = settings_get_select_font_family($v, $k);
        } elsif ($k eq 'settings_navigation_color') {
            $v = settings_get_select_navigation_color($v, $k);
        } elsif ($k eq 'settings_background_color') {
            $v = settings_get_select_background_color($v, $k);
        } elsif ($k eq 'settings_cm_editor_palette') {
            $v = settings_get_select_editor_color($v, $k);
        } elsif ($k eq 'settings_side_slider_palette') {
            $v = '<select class="ui_select" name="' . $k . '">

                    <option value="grey"'
              . ($v eq 'grey' && ' selected') . '>Dim Grey (' . $theme_text{'theme_xhred_global_default'} . ')</option>

                    <option value="white"'
              . ($v eq 'white' && ' selected') . '>White</option>

                </select>';
        }

        return '
            <tr class="atshover">
                <td class="col_label atscontent"><b>'
          . $theme_text{$k} . '</b>' . ($theme_text{ $k . '_description' } &&
                            '<div class="smaller text-normal no-padding">' . $theme_text{ $k . '_description' } . '</div>') .
          '</td>
                <td class="col_value atscontent"><span>'
          . $v . '</span></td>
            </tr>
        ';
    }

    if ($t eq 'footer') {
        return '
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table class="ui_form_end_buttons" style="width:100%">
                    <tbody>
                        <tr>
                            <td>
                                <div class="btn-group">
                                    <a style="min-width:90px" class="btn btn-success" id="atsave"><i class="fa fa-fw fa-floppy-o" style="margin-right:7px;"></i>'
          . $text{'save'} . '</a>
                                    <a style="min-width:146px" class="btn btn-default" id="atrestore"><i class="fa fa-fw fa-history" style="margin-right:7px;"></i>'
          . $theme_text{'settings_right_restore_defaults'} . '</a>
                                    <a style="min-width:132px" class="btn btn-default" id="atclearcache"><i class="fa fa-fw fa-hourglass-o" style="margin-right:7px;"></i>'
          . $theme_text{'settings_right_clear_local_cache'} . '</a>
         ' . (
            $get_user_level eq '0' ?
              '                     <span class="dropup"'
              .
              ( has_command('git') ?
                  undef :
                  get_button_tooltip('settings_sysinfo_theme_updates_description', undef, undef, 1, 1)
              ) .
              '>
                                       <button class="btn btn-info dropdown-toggle margined-left--1 no-style-hover' .
              (has_command('git') ? undef : ' disabled') .
              '" type="button" id="force_update_menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                         <i class="fa fa-fw fa-download-cloud margined-right-8"></i>'
              . $theme_text{'theme_force_upgrade'} . '&nbsp;&nbsp;
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
              ''
          ) .
          '
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div class="btn-group">
                                    <a class="btn btn-default page_footer_ajax_submit" id="edit_styles" href="'
          . $gconfig{'webprefix'} .
          '/settings-editor_read.cgi"><i class="fa fa-fw fa-file-code-o" style="margin-right:7px;"></i>' .
          $theme_text{'settings_right_theme_extensions'} . '</a>
                                    <a class="btn btn-default page_footer_ajax_submit" id="edit_logos" href="'
          . $gconfig{'webprefix'} .
          '/settings-logos.cgi"><i class="fa fa-fw fa-file-image-o" style="margin-right:7px;"></i>' .
          $theme_text{'theme_xhred_settings_right_theme_logos'} . '</a>
                                    <a class="btn btn-default page_footer_ajax_submit" id="edit_logos" href="'
          . $gconfig{'webprefix'} .
          '/settings-backgrounds.cgi"><i class="fa fa-fw fa-image" style="margin-right:7px;"></i>' .
          $theme_text{'theme_xhred_settings_right_theme_bgs'} . '</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        ';
    }

    if ($t eq 'save' || $t eq 'restore') {

        theme_config_dir_available();

        if ($t eq 'save') {
            !foreign_available("webmin") &&
              error($theme_text{'theme_error_access_not_root'});
            my %i = settings_filter(%in, $t);
            write_file($config_directory . "/$current_theme/settings.js", \%i);
        }
        if ($t eq 'restore') {

            !foreign_available("webmin") &&
              error($theme_text{'theme_error_access_not_root'});

            unlink_file($config_directory . "/$current_theme/settings.js");
            unlink_file(get_tuconfig_file());
            if ($has_usermin) {
                unlink_file($has_usermin_conf_dir . "/$current_theme/settings.js");
            }
        }

        if ($has_usermin) {
            unlink_file($has_usermin_conf_dir . "/$current_theme/settings.js");
            copy_source_dest($config_directory . "/$current_theme/settings.js", $has_usermin_conf_dir . "/$current_theme");
        }

        if (-r $config_directory . "/$current_theme/logo.png" &&
            $has_usermin)
        {
            unlink_file($has_usermin_conf_dir . "/$current_theme/logo.png");
            copy_source_dest($config_directory . "/$current_theme/logo.png", $has_usermin_conf_dir . "/$current_theme");
        }
        if (-r $config_directory . "/$current_theme/logo_welcome.png" &&
            $has_usermin)
        {
            unlink_file($has_usermin_conf_dir . "/$current_theme/logo_welcome.png");
            copy_source_dest($config_directory . "/$current_theme/logo_welcome.png",
                             $has_usermin_conf_dir . "/$current_theme");
        }
    }
}

sub get_xhr_request
{

    if ($in =~ /xhr-/) {
        head();

        if ($in{'xhr-navigation'} eq '1') {
            require(dirname(__FILE__) . "/navigation.pm");
        } elsif ($in{'xhr-buttons'} eq '1') {
            require(dirname(__FILE__) . "/buttons.pm");
        } elsif ($in{'xhr-default'} eq '1') {
            print get_default_right();
        } elsif ($in{'xhr-settings'} eq '1') {
            if ($in{'save'} eq '1') {
                theme_settings('save', undef, undef);
            } elsif ($in{'restore'} eq '1') {
                theme_settings('restore', undef, undef);
            } else {
                require(dirname(__FILE__) . "/settings.pm");
            }
        } elsif ($in{'xhr-manage-config'} eq '1') {
            if ($in{'save'} eq '1') {
                manage_theme_config('save');
            } elsif ($in{'load'} eq '1') {
                print manage_theme_config('load');
            }
        } elsif ($in{'xhr-get_available_modules'} eq '1') {
            print get_available_modules('json');
        } elsif ($in{'xhr-get_theme_locale_languages'} eq '1') {
            my %__config = settings(get_tuconfig_file(), 'config_');
            print ui_select(
                "config_portable_theme_locale_languages",
                ($__config{'config_portable_theme_locale_languages'} ? $__config{'config_portable_theme_locale_languages'} :
                   get_before_delimiter($current_lang, '.')
                ),
                [
                 map {
                     !string_contains(lc($_->{'lang'}), 'utf') ?
                       [get_before_delimiter(lc(replace('_', '-', $_->{'lang'})), '.'), $_->{'desc'}] :
                       ()
                 } list_languages()
                ]);
        } elsif ($in{'xhr-get_size'} eq '1') {
            my $size = recursive_disk_usage(get_access_data('root') . $in{'xhr-get_size_path'});
            print nice_size($size, -1) . '|' . $size;
        } elsif ($in{'xhr-get_list'} eq '1') {

            my $path = "$in{'xhr-get_list_path'}";
            my @dirs;

            if ($get_user_level eq '2' || $get_user_level eq '4') {
                $path = get_user_home() . $path;
            }
            opendir(my $dirs, $path);
            while (my $dir = readdir $dirs) {
                next unless -d $path . '/' . $dir;
                next if $dir eq '.' or $dir eq '..';
                push @dirs, $dir;
            }
            closedir $dirs;

            @dirs = sort {"\L$a" cmp "\L$b"} @dirs;
            print convert_to_json(\@dirs);

        } elsif ($in{'xhr-encoding_convert'} eq '1') {
            set_user_level();

            my $data;
            eval {
                $data = Encode::encode('utf-8',
                                       Encode::decode($in{'xhr-encoding_convert_name'},
                                                      read_file_contents($in{'xhr-encoding_convert_file'})
                                       ));
            };
            print $data;
        } elsif ($in{'xhr-get_user_level'} eq '1') {
            print $get_user_level;
        } elsif ($in{'xhr-get_update_notice'} eq '1') {
            print update_notice();
        } elsif ($in{'xhr-get_nice_size'} eq '1') {
            print nice_size($in{'xhr-get_nice_size_sum'}, -1);
        } elsif ($in{'xhr-get_command_exists'} eq '1') {
            print has_command($in{'xhr-get_command_exists_name'});
        } elsif ($in{'xhr-get_symlink'} eq '1') {
            print resolve_links(get_access_data('root') . urlize($in{'xhr-get_symlink_path'}));
        } elsif ($in{'xhr-theme_temp_data'} eq '1') {
            if ($in{'xhr-theme_temp_data_action'} eq 'set') {
                set_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_value'});
            } elsif ($in{'xhr-theme_temp_data_action'} eq 'get') {
                print get_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_keep'});
            }
        } elsif ($in{'xhr-shell-pop'}) {
            my $file;
            if ($in{'xhr-shell-cms'} eq "1") {
                my $id = $in{'xhr-shell-cmsid'};
                $id =~ s/[^\p{L}\p{N}.\-\/]//g;
                $file = "$config_directory/server-manager/previous/$id";
            } else {
                $file = "$config_directory/shell/previous.$remote_user";
            }
            my $index   = (int($in{'xhr-shell-pop'}) - 1);
            my $history = read_file_lines($file);
            if (@$history[$index]) {
                splice(@$history, $index, 1);
                flush_file_lines($file);
                print 1;
            }
        } elsif ($in{'xhr-get_autocompletes'} eq '1') {
            my @data =
              get_autocomplete_shell($in{'xhr-get_autocomplete_type'}, $in{'xhr-get_autocomplete_string'});
            print convert_to_json(\@data);
        } elsif ($in{'xhr-theme_latest_version'} eq '1') {
            my @current_versions;
            push(@current_versions,
                 (theme_remote_version(1, 1) =~ /^version=(.*)/m), (theme_remote_version(1, 0, 1) =~ /^version=(.*)/m));
            print convert_to_json(\@current_versions);
        } elsif ($in{'xhr-update'} eq '1' && foreign_available('webmin')) {
            my @update_rs;
            my $version_type            = ($in{'xhr-update-type'} eq '-beta' ? '-beta' : '-release');
            my $update_force            = $in{'xhr-update-force'};
            my $usermin_enabled_updates = ($theme_config{'settings_sysinfo_theme_updates_for_usermin'} ne 'false' ? 1 : 0);
            if (!has_command('git') || !has_command('curl') || !has_command('bash')) {
                @update_rs = { "no_git" =>
                                 replace((!has_command('curl') || !has_command('bash') ? '>git<' : '~'),
                                         (!has_command('curl') ? '>curl<' : '>bash<'),
                                         $theme_text{'theme_git_patch_no_git_message'}
                                 ), };
                print convert_to_json(\@update_rs);
            } else {
                if ($update_force ne "1") {
                    my $authentic_remote_data;

                    if ($version_type eq '-release') {
                        $authentic_remote_data = theme_remote_version(1, 1);
                    } else {
                        $authentic_remote_data = theme_remote_version(1, 0, 1);
                    }

                    if ($authentic_remote_data eq '0') {
                        @update_rs = { "no_connection" => $theme_text{'theme_git_update_locked'} };
                        print convert_to_json(\@update_rs);
                        exit;
                    }

                    @update_rs = theme_update_incompatible($authentic_remote_data);
                    if (@update_rs) {
                        print convert_to_json(\@update_rs);
                        exit;
                    }
                }
                my $usermin = ($has_usermin && $usermin_enabled_updates);
                my $usermin_root;
                backquote_logged("yes | $root_directory/$current_theme/theme-update.sh -$version_type -no-restart");
                if ($usermin) {
                    $usermin_root = $root_directory;
                    $usermin_root =~ s/webmin/usermin/;
                    backquote_logged("yes | $usermin_root/$current_theme/theme-update.sh -$version_type -no-restart");
                }
                my $tversion = theme_version();
                @update_rs = {
                               "success" => ($usermin ? theme_text('theme_git_patch_update_success_message2', $tversion) :
                                               theme_text('theme_git_patch_update_success_message', $tversion)
                               ) };
                print convert_to_json(\@update_rs);
            }
        } elsif ($in{'xhr-info'} eq '1') {
            my @info = theme_list_combined_system_info();
            our ($webmin_version_str, $cpu_percent,        $mem_percent,             $virt_percent,
                 $disk_percent,       $host,               $os,                      $webmin_version,
                 $virtualmin_version, $cloudmin_version,   $authentic_theme_version, $local_time,
                 $kernel_arch,        $cpu_type,           $cpu_temperature,         $hdd_temperature,
                 $uptime,             $running_proc,       $load,                    $real_memory,
                 $virtual_memory,     $disk_space,         $package_message,         $csf_title,
                 $csf_data,           $csf_remote_version, $authentic_remote_version
            ) = get_sysinfo_vars(\@info);

            my @updated_info = { "data"                     => 1,
                                 "is_data"                  => $webmin_version_str,
                                 "cpu_percent"              => $cpu_percent,
                                 "mem_percent"              => $mem_percent,
                                 "virt_percent"             => $virt_percent,
                                 "disk_percent"             => $disk_percent,
                                 "host"                     => $host,
                                 "os"                       => $os,
                                 "webmin_version"           => $webmin_version,
                                 "virtualmin_version"       => $virtualmin_version,
                                 "cloudmin_version"         => $cloudmin_version,
                                 "authentic_theme_version"  => $authentic_theme_version,
                                 "local_time"               => $local_time,
                                 "kernel_arch"              => $kernel_arch,
                                 "cpu_type"                 => $cpu_type,
                                 "cpu_temperature"          => $cpu_temperature,
                                 "hdd_temperature"          => $hdd_temperature,
                                 "uptime"                   => $uptime,
                                 "proc"                     => $running_proc,
                                 "cpu"                      => $load,
                                 "mem"                      => $real_memory,
                                 "virt"                     => $virtual_memory,
                                 "disk"                     => $disk_space,
                                 "package_message"          => $package_message,
                                 "csf_title"                => $csf_title,
                                 "csf_data"                 => $csf_data,
                                 "csf_remote_version"       => $csf_remote_version,
                                 "authentic_remote_version" => $authentic_remote_version,
                                 "csf_deny"                 => csf_temporary_list(),
                                 "collect_interval"         => get_module_config_data('system-status', 'collect_interval'),
                                 "extended_si"              => get_extended_sysinfo(\@info, undef),
                                 "warning_si"               => get_sysinfo_warning(\@info), };
            print convert_to_json(\@updated_info);
        } elsif ($in{'xhr-search-in-file'} eq '1') {
            set_user_level();
            my @files = split(/,/, $in{'xhr-search-in-file-files'});
            my $match = trim($in{'xhr-search-in-file-string'});
            my @match;
            fdo {
                my ($file, $line, $text) = @_;
                if ($text =~ /\Q$match\E/i) {
                    push(@match, ([$files[$file] => [html_escape(substr($text, 0, 120)), $line]]));
                }
            }
            @files;
            print convert_to_json(\@match);
        }

        exit;
    }
}

sub get_default_right
{
    # Check user settings on default page for Virtualmin/Cloudmin
    if ($theme_requested_url =~ /virtual-server/ &&
        (   $t_uri___i ||
            (   length $theme_config{'settings_right_virtualmin_default'} &&
                $theme_config{'settings_right_virtualmin_default'} ne ''  &&
                (\domain_available($theme_config{'settings_right_virtualmin_default'}, 'id') ||
                    $theme_config{'settings_right_virtualmin_default'} eq 'index.cgi')))

      )
    {
        if ($get_user_level eq '2') {
            if ($t_uri___i) {
                my $dom = domain_available($t_uri___i, 'dom');
                if ($dom) {
                    return '/virtual-server/view_domain.cgi?dom=' . $dom->{'id'};
                } else {
                    return '/sysinfo.cgi';
                }
            } else {
                return '/sysinfo.cgi';
            }

        } else {
            if ($theme_config{'settings_right_virtualmin_default'} eq 'index.cgi' &&
                !$t_uri___i)
            {
                return '/virtual-server/index.cgi';
            } else {
                if (!$t_uri___i) {
                    return '/virtual-server/summary_domain.cgi?dom=' . $theme_config{'settings_right_virtualmin_default'};
                } else {
                    if ($t_uri___i) {
                        my $dom = domain_available($t_uri___i, 'dom');
                        if ($dom) {
                            return '/virtual-server/summary_domain.cgi?dom=' . $dom->{'id'};
                        } else {
                            return '/virtual-server/index.cgi';
                        }
                    } else {
                        return '/virtual-server/index.cgi';
                    }
                }

            }
        }
    }
    elsif ($theme_requested_url =~ /server-manager/ &&
           ($t_uri___i ||
            (   length $theme_config{'settings_right_cloudmin_default'} &&
                $theme_config{'settings_right_cloudmin_default'} ne ''  &&
                (\server_available($theme_config{'settings_right_cloudmin_default'}, 'id') ||
                    $theme_config{'settings_right_cloudmin_default'} eq 'index.cgi'))))
    {
        if ($theme_config{'settings_right_cloudmin_default'} eq 'index.cgi' &&
            !$t_uri___i)
        {
            return '/server-manager/index.cgi';
        } else {
            if (!$t_uri___i) {
                return '/server-manager/edit_serv.cgi?id=' . $theme_config{'settings_right_cloudmin_default'};
            } else {

                if ($t_uri___i) {
                    my $host = server_available($t_uri___i, 'host');
                    if ($host) {
                        return '/server-manager/edit_serv.cgi?id=' . $host->{'id'};
                    } else {
                        return '/server-manager/index.cgi';
                    }
                } else {
                    return '/server-manager/index.cgi';
                }
            }
        }
    }

    # Going to default right page for Webmin/Usermin
    my $minfo = &get_goto_module();
    return ($minfo ? "$minfo->{'dir'}/" : '/sysinfo.cgi');

    # Prevent Virtualmin/Cloudmin module from being set as default page
    if ($minfo->{'dir'} eq 'virtual-server' ||
        $minfo->{'dir'} eq 'server-manager')
    {
        return '/sysinfo.cgi';
    }

    # Goto Inbox in Usermin Mail mode
    if ($get_user_level eq '3' & foreign_available("mailbox") &&
        $theme_requested_url =~ /mailbox/)
    {
        return '/mailbox/index.cgi?id=INBOX';
    }
}

sub init_type
{
    (($ENV{'CONTENT_TYPE'} =~ /multipart\/form-data/i) ? ReadParseMime() :
       ($ENV{'SCRIPT_NAME'} =~ /session_login|pam_login/i ? ReadParse(undef, undef, undef, 2) : ReadParse()));
}

sub init
{
    # Don't log XHR requests
    my %tmp_miniserv;
    get_miniserv_config(\%tmp_miniserv);
    if (!$tmp_miniserv{'nolog'}) {
        $tmp_miniserv{'nolog'} = ".*xhr.*";
        put_miniserv_config(\%tmp_miniserv);
        reload_miniserv();
    }

    # Make sure that config directory exists
    theme_config_dir_available();

    # Register hooks
    $theme_module_query_id = ($theme_requested_url =~ /virtual-server/ ? 'dom' : 'sid');
    $theme_requested_url =~ /virtual-server/ ? ($t_uri___i = ($in{'domain'} ? $in{'domain'} : $in{'dom'})) :
      undef;
    $theme_requested_url =~ /server-manager/ ? ($t_uri___i = ($in{'serv'} ? $in{'serv'} : $in{'server'})) :
      undef;

    # Provide unobstructive access for AJAX calls
    get_xhr_request();

    # ConfigServer Security Firewall mod
    csf_mod();
}

sub content
{
    # Mobile toggle
    print '<div class="' . ($theme_config{'settings_navigation_always_collapse'} eq 'true' ? '' : 'visible-xs ') .
      'mobile-menu-toggler" style="position: fixed; ' . get_filters() . '">';

    print '<button type="button" class="btn btn-primary btn-menu-toggler" style="padding-left: 6px; padding-right: 5px;">' .
      "\n";
    print '<i class="fa fa-fw fa-lg fa-bars"></i>' . "\n";
    print '</button>' . "\n";
    print '</div>' . "\n";

    print '<aside style="' . get_filters() . '" id="sidebar" class="hidden-xs">' . "\n";

    &print_switch();

    # Navigation
    print '<ul class="navigation">' . "\n";
    require(dirname(__FILE__) . "/navigation.pm");
    print '</ul>' . "\n";

    # Buttons
    print '<br><br><ul class="user-links">';
    require(dirname(__FILE__) . "/buttons.pm");
    print '</ul>';

    # Custom text
    print '<ul class="user-html"><li class="user-html-string">'
      .
      (
        ($theme_config{'settings_leftmenu_user_html_only_for_administrator'} ne 'true' ||
           $theme_config{'settings_leftmenu_user_html_only_for_administrator'} eq 'true' && $get_user_level eq '0'
        ) ? $theme_config{'settings_leftmenu_user_html'} :
          undef
      ) .
      '</li></ul>';
    print '</aside>' . "\n";

    # Authenticated logo
    embed_logo();

    # Favorites menu
    print_favorites();

    # Content
    print '<div id="content" class="__page' .
      ($theme_config{'settings_right_page_hide_persistent_vscroll'} eq 'false' ? ' fvscroll' : undef) . '">' . "\n";

    print ' <div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1"></div>' . "\n";
}

sub update_notice
{
    my $changelog_data =
      (read_file_contents($root_directory . '/' . $current_theme . "/CHANGELOG.md") =~
        /#### Version(.*?)<!--- separator --->/s)[0];
    if ($changelog_data) {
        $changelog_data =~ s/###(.*?)\)/<\/ul>@{[get_version_link($1, 2)]}<hr><ul>/g;
    } else {
        $changelog_data =
          (read_file_contents($root_directory . '/' . $current_theme . "/CHANGELOG.md") =~
            /### Version(.*?)<!--- separator --->/s)[0];
    }
    my @changelog_version = split /\n/, $changelog_data;

    $changelog_data =~ s/^[^\n]*\n/\n/s;
    $changelog_data =~ s/`(.*?)`/<code>$1<\/code>/g;
    $changelog_data =~ s/__(.*?)__/<strong>$1<\/strong>/g;
    $changelog_data =~ s/_(.*?)_/<em>$1<\/em>/g;
    $changelog_data =~ s/(Fixed bugs)/<span data-fixed="1">$1<\/span>/g;
    $changelog_data =~ s/\[([^\[]+)\]\(([^\)]+)\)/<a class="label label-default" href="$2" target="_blank">$1<\/a>/g;
    $changelog_data =~ s/\n\*(.*)/\n<li>$1<\/li>/g;

    my @version = split(/ /, $changelog_version[0]);
    my $changelog_content = '
      <div class="modal fade fade9" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header background-success background--bordered">
                <button type="button" data-toggle="tooltip" data-title="'
      . $theme_text{'theme_xhred_global_close'} .
'" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-fw fa-info-circle">&nbsp;&nbsp;</i>'
      . $theme_text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body" style="font-weight: 300">
                <h4>Version ' . $version[1] . '</h4>
                <ul>
                  ' . $changelog_data . '
                </ul>
                <hr>
                <h4 data-development style="margin-top:20px;">'
      . $theme_text{'theme_development_support'} .
'&nbsp;&nbsp;<a href="https://github.com/authentic-theme/authentic-theme#donate" target="_blank" class="fa fa-fw fa-lg faa-pulse animated-hover fa-heartbeat" style="color: #c9302c; cursor: alias;"></a></h4>'
      .
      theme_text(
        'theme_update_footer',
'<a class="badge fa fa-github" target="_blank" href="https://github.com/authentic-theme/authentic-theme/issues"><span class="font-family-default">&nbsp;&nbsp;&nbsp;&nbsp;GitHub</span></a>',
'<a target="_blank" class="badge background-info fa fa-twitter" href="https://twitter.com/authentic_theme"><span class="font-family-default">&nbsp;&nbsp;&nbsp;&nbsp;Twitter</span></a>'
      ) .
      '
              </div>
            </div>
          </div>
       </div>';
    return $changelog_content;
}

sub get_cookies
{

    my @r = split /; /, get_env('http_cookie');
    my %c;

    foreach (@r) {
        my ($k, $v) = split /=/, $_;
        $c{$k} = $v;
    }

    return %c;
}

sub get_access_data
{
    my ($key) = @_;
    if ($key) {
        if ($key eq 'root' && $gaccess{'root'} eq '/') {
            return undef;
        } else {
            return $gaccess{$key};
        }
    } else {
        return %gaccess;
    }
}

sub get_available_modules
{
    my ($json) = @_;
    my @mods;

    foreach my $x (get_all_module_infos()) {
        if ($x->{'dir'} ne undef && &foreign_available($x->{'dir'})) {
            push @mods, $x->{'dir'};
        }
    }
    if ($json eq 'json') {
        return convert_to_json(\@mods);
    } else {
        return @mods;
    }

}

sub manage_theme_config
{
    my ($action) = @_;
    my %tuconfig;

    if ($action eq 'save') {
        my %i = settings_filter(%in);
        write_file(get_tuconfig_file(), \%i);
    } elsif ($action eq 'load') {
        my $tuconfig_file = (get_tuconfig_file());
        if (-f $tuconfig_file) {
            my %tuconfig = (settings($tuconfig_file, 'config_portable_'));
            return convert_to_json(\%tuconfig);
        } else {
            return convert_to_json();
        }
    }
}

sub get_button_tooltip
{
    my ($label, $key, $placement, $html, $force, $container, $br_label_on) = @_;

    my $mod_key = $theme_config{'settings_hotkey_toggle_modifier'};
    my $hot_key = ($key ? ucfirst($theme_config{$key}) : undef);
    if (!$container) {
        $container = 'body';
    }
    my $tooltip_text = ($theme_text{$label} ? $theme_text{$label} : $text{$label});
    if ($br_label_on) {
        my @tooltip_text = split(/\Q$br_label_on\E/, $tooltip_text, 2);
        $tooltip_text = join('<br>' . $br_label_on, @tooltip_text);
    }

    return (($theme_config{'settings_button_tooltip'} ne 'false' || $force) ?
              (' data-container="' . $container . '" data-placement="' .
                 $placement . '" data-toggle="tooltip" data-html="' . ($html ? 'true' : 'false') . '" data-title="'
                 .
                 ($tooltip_text
                    .
                    (length $theme_config{'settings_hotkeys_active'} &&
                       $theme_config{'settings_hotkeys_active'} ne 'false' &&
                       $hot_key ?
                       " (" .
                       ($mod_key eq "altKey" ? "Alt" : $mod_key eq "ctrlKey" ? "Ctrl" : "Meta") . '+' . $hot_key . ")" :
                       ''
                    )
                 ) .
                 '"'
              ) :
              ' ');
}

sub get_user_acl
{
    my ($key, $module) = @_;

    if ($module) {
        $module = '/' . $module;
    }
    my $acl = "$config_directory$module/$remote_user.acl";

    my $config = read_file_contents($acl);
    my %config = $config =~ /(.*?)=(.*)/g;

    if (-r $acl) {

        my %config = $config =~ /(.*?)=(.*)/g;

        if ($key) {
            return $config{$key};
        } else {
            return %config;
        }
    } else {
        return undef;
    }

}

sub get_module_config_data
{
    my ($module, $key) = @_;

    if (-r $config_directory . '/' . $module . '/config') {

        my $config = &read_file_contents($config_directory . '/' . $module . '/config');
        my %config = $config =~ /(.*?)=(.*)/g;

        if ($key) {
            return $config{$key};
        } else {
            return %config;
        }
    } else {
        return undef;
    }

}

sub get_autocomplete_shell
{
    my ($type, $string) = @_;
    my ($cd, $cmd, $cmd2, $cd_cmd, $command, @rs, @rs_tmp);

    if ($type eq 'commands') {
        $command = '-c';
    } elsif ($type eq 'groups') {
        $command = '-g';
    } elsif ($type eq 'service') {
        (!string_starts_with($string, '::::') && ($command = '-s'));
    } elsif ($type eq 'systemctl') {
        $command = undef;
    } elsif ($type eq 'users') {
        $command = '-u';
    } else {
        my @strings =
          split /::::/, $string;
        ($cd, $string, $cmd, $cmd2) = @strings[0, 1, 2, 3];
        $cd_cmd  = "cd $cd; ";
        $command = '-o default';
    }

    if ($command) {
        @rs =
          array_unique(
               backquote_command($cd_cmd . "bash -c 'compgen " . $command . " '" . quotemeta($cmd2 ? $cmd2 : $string) . ""));

    } else {
        if ($type eq 'service' && has_command('service')) {
            my @cmd = split /::::/, $string;
            my $units_tmp =
              backquote_command("service " . quotemeta($cmd[1]));
            my ($unit_tmp) = $units_tmp =~ / \(  ( [^\)]+ )  \) /x;
            if (!$unit_tmp) {
                ($unit_tmp) = $units_tmp =~ / {  ( [^}]+ )  } /x;
            }
            if (!$unit_tmp) {
                ($unit_tmp) = $units_tmp =~ / \[  ( [^]]+ )  \] /x;
            }

            $unit_tmp =~ s/\s+//g;
            $unit_tmp =~ s/\|/,/g;
            $unit_tmp =~ s/;/,/g;

            my @units_tmp = split /,/, $unit_tmp;
            my @units_possible_tmp = ('start', 'stop', 'restart', 'try-restart', 'reload', 'force-reload', 'status');
            @rs_tmp = (@units_tmp ? @units_tmp : @units_possible_tmp);
            my @rs_cmd;

            if ($cmd[2]) {
                foreach my $cmd (@rs_tmp) {
                    if (string_starts_with($cmd, $cmd[2])) {
                        push @rs_cmd, $cmd;
                    }
                }
                @rs = @rs_cmd;
            } else {
                @rs = @rs_tmp;
            }
        }
        if ($type eq 'systemctl' && has_command('systemctl')) {
            my (@units, @units_tmp);

            @units_tmp = array_unique(backquote_command("systemctl list-unit-files"));
            my $i = 0;
            my $n = $#units_tmp;
            foreach my $unit (@units_tmp) {
                my @tmp = split / {1,}/, $unit;
                my ($unit_tmp, $status_tmp) = @tmp[0, 1];

                if ($i        &&
                    --$n      &&
                    $unit_tmp &&
                    (!$string ||
                        string_starts_with($unit_tmp, $string)))
                {
                    push @units, $unit_tmp;
                }

                $i++;
            }
            @rs = @units;
        }
    }
    if ($cd || $cmd2) {
        my @rs_tmp;
        foreach my $file (@rs) {
            if (-d $file || -d ($cd . $file)) {
                push @rs_tmp, ($file . '/');
            } else {
                if ($cmd ne 'cd') {
                    push @rs_tmp, $file;
                }
            }
        }
        @rs = @rs_tmp;
    }
    return @rs;
}

1;
