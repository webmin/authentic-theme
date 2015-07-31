#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

## Building Webmin/Usermin menu. Start.
#

if (   $is_virtualmin == -1 && $is_cloudmin == -1 && $is_webmail == -1
    || $in{'xhr-navigation-type'} eq 'webmin' )
{
    print_search();

    @cats = &get_visible_modules_categories();
    @modules = map { @{ $_->{'modules'} } } @cats;
    $show_unused
        = __settings('settings_leftmenu_section_hide_unused_modules') eq
        'true' ? 0 : 1;

    foreach $c (@cats) {
        if ( $gconfig{"notabs_${base_remote_user}"} ne '2'
            && ( $c && !$c->{'unused'} )
            || ( $c && $c->{'unused'} && $show_unused ) )
        {
            &print_category( $c->{'code'}, $c->{'desc'} );
            print '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="'
                . $c->{'code'} . '">' . "\n";
            foreach my $minfo ( @{ $c->{'modules'} } ) {
                if ( $minfo->{'dir'} eq 'webmin' ) {
                    &print_category_link( "/webmin/edit_themes.cgi",
                        $text{'settings_right_theme_configuration_title'},
                        1 );
                }
                if (   $minfo->{'dir'} ne 'virtual-server'
                    && $minfo->{'dir'} ne 'server-manager' )
                {
                    &print_category_link( "$minfo->{'dir'}/",
                        $minfo->{'desc'}, undef );
                }
            }
            print '</ul></li>' . "\n";
        }
        elsif ( $gconfig{"notabs_${base_remote_user}"} eq '2' ) {
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

    if ( &foreign_available("webmin")
        && __settings('settings_leftmenu_section_hide_refresh_modules') ne
        'true' )
    {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/webmin/refresh_modules.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-refresh"></i> <span>'
            . $text{'left_refresh_modules'}
            . '</span></a></li>' . "\n";
    }
    print_sysinfo_link();
    print_sysstat_link();

    if (   &get_product_name() eq 'webmin'
        && !$ENV{'ANONYMOUS_USER'}
        && $gconfig{'nofeedbackcc'} != 2
        && $gaccess{'feedback'}
        && $gconfig{'feedback_to'}
        || &get_product_name() eq 'usermin'
        && !$ENV{'ANONYMOUS_USER'}
        && $gconfig{'feedback'} )
    {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/feedback_form.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-envelope"></i> <span>'
            . $text{'left_feedback'}
            . '</span></a></li>' . "\n";
    }
}
#
## Building Webmin/Usermin menu. End.

elsif ( $is_virtualmin != -1 || $in{'xhr-navigation-type'} eq 'virtualmin' ) {

    ## Generate menu using new mechanism
    if ( -r "$root_directory/virtual-server/webmin_menu.pl"
        && &get_webmin_version() >= 1.730 )
    {
        my @leftitems = list_combined_webmin_menu( $sects, \%in );

        print_left_menu( 'virtual-server', \@leftitems, 0, 0 );
        print_sysinfo_link();
        print_sysstat_link();
    }

    ## Generate menu using old mechanism (compatibility mode)
    else {
        print_search();
        if ( $virtual_server_access_level != 2 ) {

            my @buts = &virtual_server::get_all_global_links();
            my @tcats = &unique( map { $_->{'cat'} } @buts );
            foreach my $c (@tcats) {
                my @incat = grep { $_->{'cat'} eq $c } @buts;

                &print_category( $c, $incat[0]->{'catname'} );

                print '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="'
                    . $c . '">' . "\n";
                foreach my $l (@incat) {

                    # Show domain creation link
                    if ((      &virtual_server::can_create_master_servers()
                            || &virtual_server::can_create_sub_servers()
                        )
                        && ( $c eq 'add' )
                        && ( !length $print_virtualmin_link )
                        )
                    {

                        &print_category_link(
                            "virtual-server/domain_form.cgi",
                            $text{'left_virtualmin_create'}, undef );
                        $print_virtualmin_link = 1;
                    }
                    $l->{'url'} =~ s/^\/+//;

                    &print_category_link( $l->{'url'}, $l->{'title'}, undef );

                }
                print '</ul></li>' . "\n";
            }
        }

        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/index.cgi" class="navigation_feedback_trigger"><i class="fa fa-fw fa-tasks"></i> <span>'
            . $text{'left_virtualmin_list'}
            . '</span></a></li>' . "\n";

        print_sysinfo_link();
        print_sysstat_link();
    }
}
#
##### Virtualmin left side. End. ######

elsif ( $is_cloudmin != -1 || $in{'xhr-navigation-type'} eq 'cloudmin' ) {

    ## Generate menu using new mechanism
    if ( -r "$root_directory/server-manager/webmin_menu.pl"
        && &get_webmin_version() >= 1.730 )
    {
        my @leftitems = list_combined_webmin_menu( $sects, \%in );

        print_left_menu( 'server-manager', \@leftitems, 0, 0 );
        print_sysinfo_link();
        print_sysstat_link();
    }
    else {
        &foreign_require( "server-manager", "server-manager-lib.pl" );
        $is_master = &server_manager::can_action( undef, "global" );

        print_sysinfo_link();

        print '<li><a data-href="'
            . $gconfig{'webprefix'}
            . '/server-manager/index.cgi" class="navigation_module_trigger" target="page"><i class="fa fa-fw fa-tasks"></i> <span>'
            . 'List Managed Systems'
            . '</span></a></li>' . "\n";
    }
}

elsif ( $is_webmail != -1 || $in{'xhr-navigation-type'} eq 'webmail' ) {
    ## Generate menu using new mechanism
    if ( &get_webmin_version() >= 1.630 ) {
        my @leftitems = list_combined_webmin_menu( $sects, \%in );

        print_left_menu( 'mailbox', \@leftitems, 0, 0 );
        print_sysinfo_link();
    }
    else {
        print_sysinfo_link();
    }

}
