#
# Authentic Theme 9.0.1 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

$user = $remote_user;
print '<li>';
if ( &foreign_available("acl") ) {
    print '<a target="page" href="'
        . $gconfig{'webprefix'}
        . '/acl/edit_user.cgi?user='
        . $user
        . '"><i class="fa fa-fw fa-user text-success"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
else {
    print '<a><i class="fa fa-fw fa-user text-success"></i>&nbsp;&nbsp;'
        . $user . '</a>';
}
print '</li><li>';

&get_miniserv_config( \%miniserv );

if (   $miniserv{'logout'}
    && !$ENV{'SSL_USER'}
    && !$ENV{'LOCAL_USER'}
    && $ENV{'HTTP_USER_AGENT'} !~ /webmin/i )
{

    if ($main::session_id) {
        print '<a href="'
            . $gconfig{'webprefix'}
            . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out text-danger"></i></a>';
    }
    else {
        print '<a href="'
            . $gconfig{'webprefix'}
            . '/switch_user.cgi"><i class="fa fa-fw fa-exchange text-warning"></i></a>';
    }
}

print '</li>';

if (-r "$root_directory/virtual-server/edit_lang.cgi"
    && (   $is_virtualmin != -1
        || $is_cloudmin != -1
        || $in{'xhr-buttons-type'} eq '1' )
    )
{
    print '<li>
                    <a target="page" href="/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe text-warning"></i>
                    </a>
                </li>';
}
elsif ( &foreign_available("change-user") ) {
    print
        '<li><a target="page" href="/change-user"><i class="fa fa-fw fa-globe text-primary"></i></a></li>';
}

print
    '<li><a data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh fa-spin"></i></a></li>';
