#
# Authentic Theme 18.32 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $user = $remote_user;

if ( $__settings{'settings_sysinfo_link_mini'} ne 'false'
    && dashboard_switch() ne '1' )
{
    print '<li class="user-link">';
    print
      '<a class="menu-exclude-link sidebar_sysinfo_link" target="page" href="'
      . $gconfig{'webprefix'}
      . '/sysinfo.cgi"><i class="fa fa-fw fa-dashboard"></i></a>';
    print '</li>';
}

if ( $__settings{'settings_show_terminal_link'} ne 'false'
    && foreign_available("shell") )
{
    print '<li class="user-link ported-console cursor-pointer">';
    print '<span><i class="fa fa-fw fa-terminal"></i></span>';
    print '</li>';
}

if ( $get_user_level eq '0'
    && foreign_available('webmin') )
{
    print '<li class="user-link favorites cursor-pointer'
      . ( $__settings{'settings_favorites'} ne 'false' ? '' : ' hidden' )
      . '">';
    print '<span><i class="fa fa-fw fa-star"></i></span>';
    print '</li>';
}

if (   $__settings{'settings_theme_options_button'} ne 'false'
    && $get_user_level eq '0'
    && foreign_available('webmin') )
{
    print '<li class="user-link theme-options cursor-pointer">';
    print '<a class="menu-exclude-link" target="page" href="'
      . $gconfig{'webprefix'}
      . '/webmin/edit_themes.cgi" data-href="'
      . $gconfig{'webprefix'}
      . '/webmin/edit_themes.cgi"><i class="fa fa-fw fa-cogs"></i></a>';
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
      . '"><i class="fa fa-fw fa-user"></i>&nbsp;<span>'
      . $user
      . '</span></a>';
}
else {
    print
'<a class="menu-exclude-link" style="pointer-events: none;"><i class="fa fa-fw fa-user"></i>&nbsp;<span>'
      . $user
      . '</span></a>';
}
print '</li>';

&get_miniserv_config( \%miniserv );

if (   $miniserv{'logout'}
    && !get_env('ssl_user')
    && !get_env('local_user')
    && get_env('http_user_agent') !~ /webmin/i )
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

if (
       -r "$root_directory/virtual-server/edit_lang.cgi"
    && $__settings{'settings_leftmenu_button_language'} eq 'true'
    && (   $t_uri_virtualmin != -1
        || $t_uri_cloudmin != -1
        || $in{'xhr-buttons-type'} eq '1' )
  )
{
    print '<li class="user-link">
                    <a class="menu-exclude-link" target="page" href="'
      . $gconfig{'webprefix'} . '/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe"></i>
                    </a>
                </li>';
}
elsif (&foreign_available("change-user")
    && $__settings{'settings_leftmenu_button_language'} eq 'true' )
{
    print
      '<li class="user-link"><a class="menu-exclude-link" target="page" href="'
      . $gconfig{'webprefix'}
      . '/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
}

if ( $__settings{'settings_leftmenu_button_refresh'} ne 'false' ) {
    print
'<li class="user-link"><a class="menu-exclude-link" data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';
}

1;
