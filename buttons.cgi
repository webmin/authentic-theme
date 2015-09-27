#!/usr/bin/perl

#
# Authentic Theme 16.01 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

do "authentic-theme/authentic-lib.cgi";

our $user = $remote_user;

if ( __settings('settings_sysinfo_link_mini') ne 'false' && dashboard_switch() ne '1') {
    print '<li class="user-link">';
    print '<a class="menu-exclude-link" target="page" href="'
        . $gconfig{'webprefix'}
        . '/sysinfo.cgi"><i class="fa fa-fw fa-info"></i></a>';
    print '</li>';
}

if ( __settings('settings_favorites') ne 'false' && $get_user_level == 0) {
    print '<li class="user-link favorites cursor-pointer">';
    print '<span><i class="fa fa-fw fa-star"></i></span>';
    print '</li>';
}

print '<li class="user-link">';
if ( &foreign_available("acl") ) {
    print '<a class="menu-exclude-link" target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/acl/edit_user.cgi" href="'
        . $gconfig{'webprefix'}
        . '/acl/edit_user.cgi?user='
        . $user
        . '"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
else {
    print
        '<a class="menu-exclude-link" style="pointer-events: none;"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
print '</li>';

&get_miniserv_config( \%miniserv );

if (   $miniserv{'logout'}
    && !$ENV{'SSL_USER'}
    && !$ENV{'LOCAL_USER'}
    && $ENV{'HTTP_USER_AGENT'} !~ /webmin/i )
{
    print '<li class="user-link __logout-link">';
    if ($main::session_id) {
        print '<a class="menu-exclude-link" href="'
            . $gconfig{'webprefix'}
            . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out text-danger"></i></a>';
    }
    else {
        print '<a class="menu-exclude-link" href="'
            . $gconfig{'webprefix'}
            . '/switch_user.cgi"><i class="fa fa-fw fa-exchange text-danger"></i></a>';
    }
    print '</li>';
}

if (   -r "$root_directory/virtual-server/edit_lang.cgi"
    && __settings('settings_leftmenu_button_language') eq 'true'
    && (   $t_uri_virtualmin != -1
        || $t_uri_cloudmin != -1
        || $in{'xhr-buttons-type'} eq '1' )
    )
{
    print '<li class="user-link">
                    <a class="menu-exclude-link" target="page" href="'
        . $gconfig{'webprefix'}
        . '/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe"></i>
                    </a>
                </li>';
}
elsif ( &foreign_available("change-user")
    && __settings('settings_leftmenu_button_language') eq 'true' )
{
    print '<li class="user-link"><a class="menu-exclude-link" target="page" href="'
        . $gconfig{'webprefix'}
        . '/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
}

if ( __settings('settings_leftmenu_button_refresh') ne 'false' ) {
    print
        '<li class="user-link"><a class="menu-exclude-link" data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';
}
