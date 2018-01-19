#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

if ((!%in) ||
    ($t_uri__i =~ /virtual-server/ || $t_uri__i =~ /server-manager/))
{
    $in{$t_uri____i} = get_default_target();
}

my @leftitems = list_combined_webmin_menu($sects, \%in);

if (dashboard_switch()
    ||
    (   $in{'xhr-navigation-type'} ne 'virtualmin' &&
        $in{'xhr-navigation-type'} ne 'cloudmin'   &&
        $in{'xhr-navigation-type'} ne 'webmail'    &&
        (   (($__settings{'settings_right_default_tab_webmin'} eq '/' && get_product_name() eq 'webmin')) ||
            (($__settings{'settings_right_default_tab_usermin'} eq '/' || !foreign_available("mailbox")) &&
                get_product_name() eq 'usermin'))
    ) ||
    $in{'xhr-navigation-type'} eq 'webmin' ||
    ($__settings{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
        $get_user_level eq '4' &&
        !$in{'xhr-navigation-type'}) ||
    ($__settings{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
        ($get_user_level eq '1' || $get_user_level eq '2') &&
        !$in{'xhr-navigation-type'}) ||

    (
     $get_user_level ne '3' && (
                                (!foreign_available("virtual-server")              &&
                                 !$__settings{'settings_right_default_tab_webmin'} &&
                                 !$in{'xhr-navigation-type'}                       &&
                                 $get_user_level ne '4'
                                ) ||
                                (!foreign_available("virtual-server") &&
                                 $__settings{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
                                 !$in{'xhr-navigation-type'}) ||
                                (!foreign_available("server-manager") &&
                                 $__settings{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
                                 !$in{'xhr-navigation-type'})))

  )
{
    print_search();

    my @cats           = &get_visible_modules_categories();
    my @modules        = map {@{ $_->{'modules'} }} @cats;
    my $show_unused    = $__settings{'settings_leftmenu_section_hide_unused_modules'} eq 'true' ? 0 : 1;
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
                                        $Atext{'settings_right_theme_left_configuration_title'}, 1);
                    print_category_link($gconfig{'webprefix'} . "/settings-editor_read.cgi",
                                        $Atext{'settings_right_theme_left_extensions_title'}, 1);
                    print_category_link($gconfig{'webprefix'} . "/settings-upload.cgi",
                                        $Atext{'settings_right_theme_left_logo_title'}, 1);
                    $__custom_print++;

                } elsif (!foreign_available("webmin") && $__custom_print eq '0') {
                    print_category_link($gconfig{'webprefix'} . "/settings-user.cgi", $Atext{'settings_title'}, 1);
                    $__custom_print++;
                }
                if ($__print_hidden eq '0') {
                    if (licenses('vm') eq '1') {
                        &print_category_link($gconfig{'webprefix'} . "/virtual-server/licence.cgi",
                                             $Atext{'right_vlcheck'}, 1);
                    }
                    if (licenses('cm') eq '1') {
                        &print_category_link($gconfig{'webprefix'} . "/server-manager/licence.cgi",
                                             $Atext{'right_slcheck'}, 1);
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
        $__settings{'settings_leftmenu_section_hide_refresh_modules'} ne 'true')
    {
        print '<li data-linked><a href="' . $gconfig{'webprefix'} .
          '/webmin/refresh_modules.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-refresh"></i> <span>' .
          $Atext{'left_refresh_modules'} . '</span></a></li>' . "\n";
    }
    print_sysinfo_link($get_user_level eq '3' ? 1 : undef);
    print_netdata_link();

    if (&get_product_name() eq 'webmin' &&
        !get_env('anonymous_user')    &&
        $gconfig{'nofeedbackcc'} != 2 &&
        $gaccess{'feedback'}          &&
        $gconfig{'feedback_to'} ||
        &get_product_name() eq 'usermin' && !get_env('anonymous_user') && $gconfig{'feedback'})
    {
        print '<li data-linked><a href="' . $gconfig{'webprefix'} .
          '/feedback_form.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-envelope"></i> <span>' .
          $Atext{'left_feedback'} . '</span></a></li>' . "\n";
    }
}

elsif (
       ((!$__settings{'settings_right_default_tab_webmin'} && $in{'xhr-navigation-type'} ne 'cloudmin') ||
        (foreign_available("virtual-server") &&
         $__settings{'settings_right_default_tab_webmin'} =~ /virtualmin/ &&
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
       (!$__settings{'settings_right_default_tab_webmin'} ||
        (foreign_available("server-manager") &&
         $__settings{'settings_right_default_tab_webmin'} =~ /cloudmin/ &&
         $in{'xhr-navigation-type'} ne 'virtualmin') ||
        $in{'xhr-navigation-type'} eq 'cloudmin'
       ) &&
       get_product_name() ne 'usermin')
{

    print_left_menu('server-manager', \@leftitems, 0, 0, $in{'sid'}, $in{'xhr-navigation-type'});
    print_sysinfo_link();
}

elsif (
      foreign_available("mailbox") &&
      ((!$__settings{'settings_right_default_tab_usermin'} || $__settings{'settings_right_default_tab_usermin'} =~ /mail/) ||
        $in{'xhr-navigation-type'} eq 'webmail'))
{

    print_left_menu('mailbox', \@leftitems, 0, 0, 0, $in{'xhr-navigation-type'});

    print '<li data-linked><a href="' . $gconfig{'webprefix'} .
      '/uconfig.cgi?mailbox" class="navigation_module_trigger"><i class="fa fa-fw fa-cog"></i> <span>' .
      $Atext{'theme_left_mail_prefs'} . '</span></a></li>' . "\n";

    print '<li data-linked><a href="' .
      $gconfig{'webprefix'} . '/changepass" class="navigation_module_trigger"><i class="fa fa-fw fa-key"></i> <span>' .
      $Atext{'theme_left_mail_change_password'} . '</span></a></li>' . "\n";

    print_sysinfo_link(1);
}

1;
