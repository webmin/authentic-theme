#!/usr/bin/perl

#
# Authentic Theme 16.01 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

my @leftitems = list_combined_webmin_menu( $sects, \%in );

if (   $t_uri_virtualmin == -1 && $t_uri_cloudmin == -1 && $t_uri_webmail == -1
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
            print
                '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="'
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

elsif ( $t_uri_virtualmin != -1 || $in{'xhr-navigation-type'} eq 'virtualmin' ) {

    print_left_menu( 'virtual-server', \@leftitems, 0, 0, $in{'dom'}, $in{'xhr-navigation-type'} );
    print_sysinfo_link();
    print_sysstat_link();

}

elsif ( $t_uri_cloudmin != -1 || $in{'xhr-navigation-type'} eq 'cloudmin' ) {

    print_left_menu( 'server-manager', \@leftitems, 0, 0, $in{'sid'}, $in{'xhr-navigation-type'} );
    print_sysinfo_link();
    print_sysstat_link();
}

elsif ( $t_uri_webmail != -1 || $in{'xhr-navigation-type'} eq 'webmail' ) {

    print_left_menu( 'mailbox', \@leftitems, 0, 0, 0, $in{'xhr-navigation-type'} );
    print_sysinfo_link();
}
