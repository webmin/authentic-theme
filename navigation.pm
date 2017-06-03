#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

if (( !%in )
    || (    $t_uri___i_virtualmin
         || $t_uri___i_cloudmin )

  )
{
    $in{$t_uri____i} = get_default_target();
}

my @leftitems = list_combined_webmin_menu( $sects, \%in );

if (    $t_uri_virtualmin == -1 && $t_uri_cloudmin == -1 && $t_uri_webmail == -1
     || $in{'xhr-navigation-type'} eq 'webmin' )
{
    print_search();

    my @cats           = &get_visible_modules_categories();
    my @modules        = map { @{ $_->{'modules'} } } @cats;
    my $show_unused    = $__settings{'settings_leftmenu_section_hide_unused_modules'} eq 'true' ? 0 : 1;
    my $__custom_print = 0;

    foreach my $c (@cats) {
        if (    $gconfig{"notabs_${base_remote_user}"} ne '2'
             && $gconfig{"notabs"} ne '1'
             && ( $c && !$c->{'unused'} )
             || ( $c && $c->{'unused'} && $show_unused ) )
        {
            &print_category( $c->{'code'}, $c->{'desc'} );
            print '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="'
              . $c->{'code'} . '">' . "\n";
            foreach my $minfo ( @{ $c->{'modules'} } ) {
                if ( ( $minfo->{'dir'} eq 'webmin' && &foreign_available("webmin") )
                     && $__custom_print eq '0' )
                {
                    print_category_link( $gconfig{'webprefix'} . "/webmin/edit_themes.cgi",
                                         $Atext{'settings_right_theme_left_configuration_title'}, 1 );
                    print_category_link( $gconfig{'webprefix'} . "/settings-editor_read.cgi",
                                         $Atext{'settings_right_theme_left_extensions_title'}, 1 );
                    print_category_link( $gconfig{'webprefix'} . "/settings-upload.cgi",
                                         $Atext{'settings_right_theme_left_logo_title'}, 1 );
                    $__custom_print++;

                }
                elsif ( !foreign_available("webmin") && $__custom_print eq '0' ) {
                    print_category_link( $gconfig{'webprefix'} . "/settings-user.cgi",
                                         $Atext{'settings_title'}, 1 );
                    $__custom_print++;
                }

                if ( licenses('vm') eq '1' ) {
                    &print_category_link( $gconfig{'webprefix'} . "/virtual-server/licence.cgi",
                                          $Atext{'right_vlcheck'}, 1 );
                }
                if ( licenses('cm') eq '1' ) {
                    &print_category_link( $gconfig{'webprefix'} . "/server-manager/licence.cgi",
                                          $Atext{'right_slcheck'}, 1 );
                }

                if ( ( $minfo->{'dir'} ne 'virtual-server' && $minfo->{'dir'} ne 'server-manager' )
                     || ( ( $minfo->{'dir'} eq 'virtual-server' || $minfo->{'dir'} eq 'server-manager' )
                          && $__settings{'settings_leftmenu_section_hide_vm_and_cm_links'} eq 'false' ) )
                {
                    &print_category_link( "$minfo->{'dir'}/", $minfo->{'desc'}, undef );
                }

            }
            print '</ul></li>' . "\n";
        }
        elsif ( $gconfig{"notabs_${base_remote_user}"} eq '2' || $gconfig{"notabs"} eq '1' ) {
            foreach my $minfo ( @{ $c->{'modules'} } ) {
                print '<li><a target="page" data-href="'
                  . $gconfig{'webprefix'} . '/'
                  . $minfo->{'dir'}
                  . '" class="navigation_module_trigger navigation_trigger_single_link"><i class="fa fa-fw fa-link"></i>  <span>'
                  . $minfo->{'desc'}
                  . '</span></a></li>' . "\n";
            }
        }
    }

    if (    &foreign_available("webmin")
         && $__settings{'settings_leftmenu_section_hide_refresh_modules'} ne 'true' )
    {
        print '<li><a target="page" data-href="'
          . $gconfig{'webprefix'}
          . '/webmin/refresh_modules.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-refresh"></i> <span>'
          . $Atext{'left_refresh_modules'}
          . '</span></a></li>' . "\n";
    }
    print_sysinfo_link($get_user_level eq '3' ? 1 : undef);
    print_sysstat_link();
    print_netdata_link();

    if (    &get_product_name() eq 'webmin'
         && !get_env('anonymous_user')
         && $gconfig{'nofeedbackcc'} != 2
         && $gaccess{'feedback'}
         && $gconfig{'feedback_to'}
         || &get_product_name() eq 'usermin' && !get_env('anonymous_user') && $gconfig{'feedback'} )
    {
        print '<li><a target="page" data-href="'
          . $gconfig{'webprefix'}
          . '/feedback_form.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-envelope"></i> <span>'
          . $Atext{'left_feedback'}
          . '</span></a></li>' . "\n";
    }
}

elsif (    $t_uri_virtualmin != -1
        || $in{'xhr-navigation-type'} eq 'virtualmin' )
{

    print_left_menu( 'virtual-server', \@leftitems, 0, 0, $in{'dom'}, $in{'xhr-navigation-type'} );
    print_sysinfo_link();
    print_sysstat_link();
    print_netdata_link();

}

elsif ( $t_uri_cloudmin != -1 || $in{'xhr-navigation-type'} eq 'cloudmin' ) {

    print_left_menu( 'server-manager', \@leftitems, 0, 0, $in{'sid'}, $in{'xhr-navigation-type'} );
    print_sysinfo_link();
    print_sysstat_link();
    print_netdata_link();
}

elsif ( $t_uri_webmail != -1 || $in{'xhr-navigation-type'} eq 'webmail' ) {

    print_left_menu( 'mailbox', \@leftitems, 0, 0, 0, $in{'xhr-navigation-type'} );

    print '<li><a target="page" data-href="'
      . $gconfig{'webprefix'}
      . '/uconfig.cgi?mailbox" class="navigation_module_trigger"><i class="fa fa-fw fa-cog"></i> <span>'
      . $Atext{'theme_left_mail_prefs'}
      . '</span></a></li>' . "\n";

    print '<li><a target="page" data-href="'
      . $gconfig{'webprefix'}
      . '/changepass" class="navigation_module_trigger"><i class="fa fa-fw fa-key"></i> <span>'
      . $Atext{'theme_left_mail_change_password'}
      . '</span></a></li>' . "\n";

    print_sysinfo_link(1);
}

1;
