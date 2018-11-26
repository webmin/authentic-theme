#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, $base_remote_user, %theme_text, %theme_config, $get_user_level, $theme_requested_url,
     $theme_module_query_id);

if ((!%in) ||
    ($theme_requested_url =~ /virtual-server/ || $theme_requested_url =~ /server-manager/))
{
    $in{$theme_module_query_id} = get_default_target();
}

my @leftitems = list_combined_webmin_menu(undef, \%in);

if (
    ($get_user_level ne '2' || $get_user_level eq '2' && get_webmin_switch_mode() eq '1') && (
        dashboard_switch()
        ||
        (   $in{'xhr-navigation-type'} ne 'virtualmin' &&
            $in{'xhr-navigation-type'} ne 'cloudmin'   &&
            $in{'xhr-navigation-type'} ne 'webmail'    &&
            (   (($theme_config{'settings_right_default_tab_webmin'} eq '/' && get_product_name() eq 'webmin')) ||
                (($theme_config{'settings_right_default_tab_usermin'} eq '/' || !foreign_available("mailbox")) &&
                    get_product_name() eq 'usermin'))
        ) ||
        $in{'xhr-navigation-type'} eq 'webmin' ||
        ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
            $get_user_level eq '4' &&
            !$in{'xhr-navigation-type'}) ||
        ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
            ($get_user_level eq '1' || $get_user_level eq '2') &&
            !$in{'xhr-navigation-type'}) ||

        (
         $get_user_level ne '3' && (
                                    (!foreign_available("virtual-server")                &&
                                     !$theme_config{'settings_right_default_tab_webmin'} &&
                                     !$in{'xhr-navigation-type'}                         &&
                                     $get_user_level ne '4'
                                    ) ||
                                    (!foreign_available("virtual-server") &&
                                     $theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
                                     !$in{'xhr-navigation-type'}) ||
                                    (!foreign_available("server-manager") &&
                                     $theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
                                     !$in{'xhr-navigation-type'})))

    ))
{
    print_search();

    my @cats           = &get_visible_modules_categories();
    my @modules        = map {@{ $_->{'modules'} }} @cats;
    my $show_unused    = $theme_config{'settings_leftmenu_section_hide_unused_modules'} eq 'true' ? 0 : 1;
    my $__custom_print = 0;
    my $__print_hidden = 0;

    foreach my $c (@cats) {
        if ($gconfig{"notabs_${base_remote_user}"} ne '2' && $gconfig{"notabs"} ne '1' && ($c && !$c->{'unused'}) ||
            ($c && $c->{'unused'} && $show_unused))
        {
            &print_category($c->{'code'}, $c->{'desc'});
            print '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="' . $c->{'code'} . '">' . "\n";
            foreach my $minfo (@{ $c->{'modules'} }) {
                if (($minfo->{'dir'} eq 'webmin' && foreign_available("webmin")) &&
                    $__custom_print eq '0')
                {
                    print_category_link($gconfig{'webprefix'} . "/webmin/edit_themes.cgi",
                                        $theme_text{'settings_right_theme_left_configuration_title'}, 1);
                    print_category_link($gconfig{'webprefix'} . "/settings-editor_read.cgi",
                                        $theme_text{'settings_right_theme_left_extensions_title'}, 1);
                    print_category_link($gconfig{'webprefix'} . "/settings-logos.cgi",
                                        $theme_text{'settings_right_theme_left_logo_title'}, 1);
                    print_category_link($gconfig{'webprefix'} . "/settings-backgrounds.cgi",
                                        $theme_text{'settings_right_theme_left_background_title'}, 1);
                    $__custom_print++;

                } elsif (!foreign_available("webmin") && $__custom_print eq '0' &&
                         $theme_config{'settings_show_theme_configuration_for_admins_only'} ne 'true') {
                    print_category_link($gconfig{'webprefix'} . "/settings-user.cgi", $theme_text{'settings_title'}, 1);
                    $__custom_print++;
                }
                if ($__print_hidden eq '0') {
                    if (licenses('vm') eq '1') {
                        &print_category_link($gconfig{'webprefix'} . "/virtual-server/licence.cgi",
                                             $theme_text{'right_vlcheck'}, 1);
                    }
                    if (licenses('cm') eq '1') {
                        &print_category_link($gconfig{'webprefix'} . "/server-manager/licence.cgi",
                                             $theme_text{'right_slcheck'}, 1);
                    }

                    $__print_hidden++;
                }

                if ($minfo->{'dir'} ne 'mailbox') {
                    &print_category_link("$gconfig{'webprefix'}/$minfo->{'dir'}/"
                                           .
                                           ( "/$minfo->{'dir'}/" =~ 'filemin' ? 'index.cgi?path=/' :
                                               ("/$minfo->{'dir'}/" =~ 'csf' ? 'index.cgi' : '')
                                           ),
                                         $minfo->{'desc'},
                                         undef);
                }

            }
            print '</ul></li>' . "\n";
        } elsif ($gconfig{"notabs_${base_remote_user}"} eq '2' || $gconfig{"notabs"} eq '1') {
            foreach my $minfo (@{ $c->{'modules'} }) {
                print '<li data-linked><a href="' . $gconfig{'webprefix'} . '/' . $minfo->{'dir'} .
'" class="navigation_module_trigger navigation_trigger_single_link"><i class="fa fa-fw fa-link"></i>  <span>'
                  . $minfo->{'desc'}
                  . '</span></a></li>' . "\n";
            }
        }
    }

    if (&foreign_available("webmin") &&
        $theme_config{'settings_leftmenu_section_hide_refresh_modules'} ne 'true')
    {
        print '<li data-linked><a href="' . $gconfig{'webprefix'} .
          '/webmin/refresh_modules.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-refresh"></i> <span>' .
          $theme_text{'left_refresh_modules'} . '</span></a></li>' . "\n";
    }
    print_sysinfo_link($get_user_level eq '3' ? 1 : undef);
    print_netdata_link();
}

elsif (
       ((!$theme_config{'settings_right_default_tab_webmin'} && $in{'xhr-navigation-type'} ne 'cloudmin') ||
        (foreign_available("virtual-server") &&
         $theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
         $in{'xhr-navigation-type'} ne 'cloudmin') ||
        $in{'xhr-navigation-type'} eq 'virtualmin'
       ) &&
       get_product_name() ne 'usermin' &&
       $get_user_level ne '4')
{
    print_left_menu('virtual-server', \@leftitems, 0, 0, $in{'dom'}, $in{'xhr-navigation-type'});
    print_sysinfo_link();
    print_sysstat_link();
}

elsif (
       (!$theme_config{'settings_right_default_tab_webmin'} ||
        (foreign_available("server-manager") &&
         $theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
         $in{'xhr-navigation-type'} ne 'virtualmin') ||
        $in{'xhr-navigation-type'} eq 'cloudmin'
       ) &&
       get_product_name() ne 'usermin')
{

    print_left_menu('server-manager', \@leftitems, 0, 0, $in{'sid'}, $in{'xhr-navigation-type'});
    print_sysinfo_link();
}

elsif (foreign_available("mailbox") &&
       (
        (!$theme_config{'settings_right_default_tab_usermin'} ||
         $theme_config{'settings_right_default_tab_usermin'} =~ /mail/) ||
        $in{'xhr-navigation-type'} eq 'webmail'))
{

    print_left_menu('mailbox', \@leftitems, 0, 0, 0, $in{'xhr-navigation-type'});

    print '<li data-linked><a href="' . $gconfig{'webprefix'} .
      '/uconfig.cgi?mailbox" class="navigation_module_trigger"><i class="fa fa-fw fa-cog"></i> <span>' .
      $theme_text{'theme_left_mail_prefs'} . '</span></a></li>' . "\n";

    print '<li data-linked><a href="' .
      $gconfig{'webprefix'} . '/changepass/" class="navigation_module_trigger"><i class="fa fa-fw fa-key"></i> <span>' .
      $theme_text{'theme_left_mail_change_password'} . '</span></a></li>' . "\n";

    print_sysinfo_link(1);
}

1;
