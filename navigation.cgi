#
# Authentic Theme 9.0.2 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

## Building Webmin/Usermin menu. Start.
#
if (   $is_virtualmin == -1 && $is_cloudmin == -1
    || $in{'xhr-navigation-type'} eq 'webmin' )
{

    print_search();

    @cats = &get_visible_modules_categories();
    @modules = map { @{ $_->{'modules'} } } @cats;

    foreach $c (@cats) {
        &print_category( $c->{'code'},
            $c->{'unused'}
            ? '<span style="color: #888888">' . $c->{'desc'} . '</span>'
            : $c->{'desc'} );
        print '<ul class="sub" style="display: none;" id="'
            . $c->{'code'} . '">' . "\n";
        foreach my $minfo ( @{ $c->{'modules'} } ) {
            if ( $minfo->{'dir'} ne 'virtual-server' && $minfo->{'dir'} ne 'server-manager' ) {
                &print_category_link( "$minfo->{'dir'}/", $minfo->{'desc'} );
            }
        }
        print '</ul>' . "\n";
    }

    if ( &foreign_available("webmin") ) {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/webmin/refresh_modules.cgi" class="navigation_refresh_modules_trigger"><i class="fa fa-fw fa-refresh"></i> <span>'
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
            . '/feedback_form.cgi" class="navigation_feedback_trigger"><i class="fa fa-fw fa-envelope"></i> <span>'
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
        #my $sects = get_right_frame_sections();
        my @leftitems = list_combined_webmin_menu( $sects, \%in );
        my ($lefttitle) = grep { $_->{'type'} eq 'title' } @leftitems;

        print_left_menu( 'virtual-server', \@leftitems, 0 );
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

                print '<ul class="sub" style="display: none;" id="'
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
                            $text{'virtualmin_left_generic'}
                        );
                        $print_virtualmin_link = 1;
                    }
                    $l->{'url'} =~ s/^\/+//;

                    &print_category_link( $l->{'url'}, $l->{'title'} );

                }
                print '</ul>' . "\n";
            }
        }

        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/index.cgi" class="navigation_domain_settings_trigger"><i class="fa fa-fw fa-tasks"></i> <span>'
            . $text{'virtualmin_left_virtualmin'}
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
        #my $sects = get_right_frame_sections();
        my @leftitems = list_combined_webmin_menu( $sects, \%in );
        my ($lefttitle) = grep { $_->{'type'} eq 'title' } @leftitems;

        print_left_menu( 'server-manager', \@leftitems, 0 );
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

sub print_sysinfo_link {
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/body.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
}
