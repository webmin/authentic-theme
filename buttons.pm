#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $user = $remote_user;

if ($__settings{'settings_sysinfo_link_mini'} eq 'true' &&
    dashboard_switch() ne '1')
{
    print '<li data-linked' .
      get_button_tooltip('theme_xhred_titles_dashboard', 'settings_hotkey_sysinfo', 'auto top') . ' class="user-link">';
    print '<a class="menu-exclude-link sidebar_sysinfo_link" href="' .
      $gconfig{'webprefix'} . '/sysinfo.cgi"><i class="fa fa-fw fa-' .
      ($get_user_level eq '3' ? 'user-circle' : 'dashboard') . '"></i></a>';
    print '</li>';
}

print '<li data-linked' .
  get_button_tooltip('theme_tooltip_night_mode', 'settings_hotkey_toggle_key_night_mode', 'auto top') .
  ' class="user-link palette-toggle cursor-pointer'
  .
  ( ($__settings{'settings_show_night_mode_link'} ne 'false' && $__settings{'settings_background_color'} ne "nightRider") ?
      '' :
      ' hidden'
  ) .
  '">';
print '<span><i class="fa fa-fw ' . (theme_night_mode() ? 'fa-sun vertical-align-middle' : 'fa-moon') . '"></i></span>';
print '</li>';

if ($__settings{'settings_show_terminal_link'} ne 'false' &&
    foreign_available("shell"))
{
    print '<li data-linked' . get_button_tooltip('theme_tooltip_terminal_link', 'settings_hotkey_shell', 'auto top') .
      ' class="user-link ported-console cursor-pointer">';
    print '<span><i class="fa fa-fw fa-terminal"></i></span>';
    print '</li>';
}

if ($get_user_level eq '0' &&
    foreign_available('webmin'))
{
    print '<li data-linked' . get_button_tooltip('left_favorites', 'settings_hotkey_favorites', 'auto top') .
      ' class="user-link favorites cursor-pointer' .
      ($__settings{'settings_favorites'} ne 'false' ? '' : ' hidden') . '">';
    print '<span><i class="fa fa-fw fa-star"></i></span>';
    print '</li>';
}

if ($__settings{'settings_theme_options_button'} ne 'false') {
    print '<li data-linked' .
      get_button_tooltip('settings_title', undef, 'auto top') . ' class="user-link theme-options cursor-pointer">';
    if ($get_user_level eq '0' && foreign_available('webmin')) {
        print '<a class="menu-exclude-link" href="' . $gconfig{'webprefix'} . '/webmin/edit_themes.cgi" data-href="' .
          $gconfig{'webprefix'} . '/webmin/edit_themes.cgi"><i class="fa fa-fw fa-cogs"></i></a>';
    } else {
        print '<a class="menu-exclude-link" href="' . $gconfig{'webprefix'} . '/settings-user.cgi" data-href="' .
          $gconfig{'webprefix'} . '/settings-user.cgi"><i class="fa fa-fw fa-cogs"></i></a>';
    }
    print '</li>';
}

print '<li class="user-link">';
if (&foreign_available("acl")) {
    print '<a' . get_button_tooltip('theme_tooltip_edit_user', undef, 'auto top') .
      ' class="menu-exclude-link" data-href="' . $gconfig{'webprefix'} . '/acl/edit_user.cgi" href="' .
      $gconfig{'webprefix'} . '/acl/edit_user.cgi?user=' . (get_env('base_remote_user') eq "root" ? "root" : $user) .
      '"><i class="fa fa-fw fa-user"></i>&nbsp;<span>' . $user . '</span></a>';
} else {
    print '<a class="menu-exclude-link" style="pointer-events: none;"><i class="fa fa-fw fa-user"></i>&nbsp;<span>' .
      $user . '</span></a>';
}
print '</li>';

&get_miniserv_config(\%miniserv);

if ($miniserv{'logout'} &&
    !get_env('ssl_user') &&
    get_env('http_user_agent') !~ /webmin/i)
{
    print '<li class="user-link __logout-link">';
    if ($main::session_id) {
        print '<a data-nref' .
          get_button_tooltip('theme_tooltip_logout', undef, 'auto top') . ' class="menu-exclude-link" href="' .
          $gconfig{'webprefix'} . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out text-danger"></i></a>';
    } else {
        print '<a data-nref' .
          get_button_tooltip('theme_xhred_tooltip_switch_user', undef, 'auto top') . ' class="menu-exclude-link" href="' .
          $gconfig{'webprefix'} . '/switch_user.cgi"><i class="fa fa-fw fa-exchange text-danger"></i></a>';
    }
    print '</li>';
}

if (-r "$root_directory/virtual-server/edit_lang.cgi" &&
    $__settings{'settings_leftmenu_button_language'} eq 'true' &&
    ($t_uri_virtualmin != -1 ||
        $t_uri_cloudmin != -1 ||
        $in{'xhr-buttons-type'} eq '1'))
{
    print '<li data-linked' . get_button_tooltip('settings_tooltip_language_link', undef, 'auto top') . ' class="user-link">
                    <a class="menu-exclude-link" href="'
      . $gconfig{'webprefix'} . '/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe"></i>
                    </a>
                </li>';
} elsif (&foreign_available("change-user") &&
         $__settings{'settings_leftmenu_button_language'} eq 'true')
{
    print '<li data-linked' . get_button_tooltip('settings_tooltip_language_link', undef, 'auto top') .
      ' class="user-link"><a class="menu-exclude-link" href="' .
      $gconfig{'webprefix'} . '/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
}

print '<li data-linked' .
  get_button_tooltip('theme_xhred_filemanager_context_refresh', 'settings_hotkey_reload', 'auto top') .
  ' class="user-link' . ($__settings{'settings_leftmenu_button_refresh'} ne 'true' && ' hidden') .
  '"><a class="menu-exclude-link" data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';

1;
