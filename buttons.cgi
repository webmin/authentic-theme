#!/usr/bin/perl

#
# Authentic Theme 10.0.0 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

$user = $remote_user;
print '<li class="user-link">';
if ( &foreign_available("acl") ) {
    print '<a target="page" href="'
        . $gconfig{'webprefix'}
        . '/acl/edit_user.cgi?user='
        . $user
        . '"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
else {
    print
        '<a style="pointer-events: none;"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
print '</li><li class="user-link __logout-link'
    . ( &get_product_name() eq "usermin" ? ' __logout-link-bg' : '' ) . '">';

&get_miniserv_config( \%miniserv );

if (   $miniserv{'logout'}
    && !$ENV{'SSL_USER'}
    && !$ENV{'LOCAL_USER'}
    && $ENV{'HTTP_USER_AGENT'} !~ /webmin/i )
{

    if ($main::session_id) {
        print '<a'
            . (
            &get_product_name() eq "usermin" ? ' class="bg-dark-red"' : '' )
            . ' href="'
            . $gconfig{'webprefix'}
            . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out '
            . ( &get_product_name() eq "usermin" ? '' : 'text-danger' )
            . '"></i></a>';
    }
    else {
        print '<a'
            . (
            &get_product_name() eq "usermin"
            ? ' class="bg-dark-yellow"'
            : ''
            )
            . ' href="'
            . $gconfig{'webprefix'}
            . '/switch_user.cgi"><i class="fa fa-fw fa-exchange '
            . ( &get_product_name() eq "usermin" ? '' : 'text-warning' )
            . '"></i></a>';
    }
}

print '</li>';

if (-r "$root_directory/virtual-server/edit_lang.cgi"
    && (   $is_virtualmin != -1
        || $is_cloudmin != -1
        || $in{'xhr-buttons-type'} eq '1' )
    )
{
    print '<li class="user-link">
                    <a target="page" href="/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe"></i>
                    </a>
                </li>';
}
elsif ( &foreign_available("change-user") ) {
    print
        '<li class="user-link"><a target="page" href="/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
}

print
    '<li class="user-link"><a data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';
