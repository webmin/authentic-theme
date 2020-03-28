#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, %miniserv, $remote_user, $root_directory, %theme_config, %theme_text, $get_user_level, $mode_status);

print "<li data-x-buttons><ul data-x-container>";
print '<li data-collapse-trigger-container data-linked' .
  get_button_tooltip('theme_xhred_tooltip_navigation_pinned', 'settings_hotkey_navigation', 'auto top') .
  ' class="user-link cursor-pointer' .
  ($theme_config{'settings_collapse_navigation_link'} eq 'false' && ' hidden') . '">';
print
'<span class="pd-lf-rt-6"><i data-collapse-trigger="1" class="fa fa2 fa-fw fa2-collapse-left vertical-align-middle"></i></span>';
print '</li>';

if ($theme_config{'settings_sysinfo_link_mini'} eq 'true' &&
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
  ( ($theme_config{'settings_show_night_mode_link'} ne 'false' && $theme_config{'settings_background_color'} ne "nightRider")
    ? '' :
      ' hidden'
  ) .
  '">';
print '<span><i class="fa fa-fw ' . (theme_night_mode() ? 'fa-sun vertical-align-middle' : 'fa-moon') . '"></i></span>';
print '</li>';

if ($theme_config{'settings_show_terminal_link'} ne 'false' &&
    foreign_available("shell"))
{
    print '<li data-linked' . get_button_tooltip('theme_tooltip_terminal_link', 'settings_hotkey_shell', 'auto top') .
      ' class="user-link ported-console cursor-pointer">';
    print '<span class="pd-rt-4"><i class="fa fa-fw fa-terminal"></i></span>';
    print '</li>';
}

print '<li data-linked' . get_button_tooltip('left_favorites', 'settings_hotkey_favorites', 'auto top') .
  ' class="user-link favorites cursor-pointer' .
  ($theme_config{'settings_favorites'} ne 'false' ? '' : ' hidden') . '">';
print '<span class="pd-rt-4"><i class="fa fa-fw fa-star"></i></span>';
print '</li>';

if (($get_user_level eq '0' && $theme_config{'settings_theme_options_button'} ne 'false') ||
    ($get_user_level ne '0' &&
        $theme_config{'settings_show_theme_configuration_for_admins_only'} ne 'true' &&
        $theme_config{'settings_theme_options_button'} ne 'false'))
{
    print '<li data-linked class="user-link theme-options cursor-pointer">';
    my $tooltip = get_button_tooltip('settings_title', undef, 'auto top');
    if ($get_user_level eq '0' && foreign_available('webmin')) {
        print '<a' .
          $tooltip . ' class="menu-exclude-link" href="' . $gconfig{'webprefix'} . '/webmin/edit_themes.cgi" data-href="' .
          $gconfig{'webprefix'} . '/webmin/edit_themes.cgi"><i class="fa fa-fw fa-cogs"></i></a>';
    } else {
        print '<a' .
          $tooltip . ' class="menu-exclude-link" href="' . $gconfig{'webprefix'} . '/settings-user.cgi" data-href="' .
          $gconfig{'webprefix'} . '/settings-user.cgi"><i class="fa fa-fw fa-cogs"></i></a>';
    }
    print '</li>';
}

print '<li class="user-link user-link-acl">';
my $foreign_acl = &foreign_available("acl");
my $user_mode   = get_product_name() eq 'usermin';
my $edit_user   = ($foreign_acl ? ("<hr class='hr-no-margin hr-darker'>" . $theme_text{'theme_tooltip_edit_user'}) : undef);
my $title_proc;
if (!$user_mode && $mode_status && $mode_status !~ /^\d+$/) {
    $title_proc = $mode_status . $edit_user;
} else {
    $title_proc =
      $foreign_acl ? $theme_text{'theme_tooltip_edit_user'} :
      ( get_product_name() eq 'usermin' ?
"<span><strong>$theme_text{'theme_global_access_level'}</strong>:&nbsp;&nbsp;<em>$theme_text{'theme_global_user_mode'}</em></span>"
        :
          undef);
}
my $user_title = get_button_tooltip($title_proc, undef, 'auto top', 1, undef, "aside .user-link");

if ($foreign_acl) {
    print '<a' . $user_title . ' class="menu-exclude-link" data-href="' .
      $gconfig{'webprefix'} . '/acl/edit_user.cgi" href="' . $gconfig{'webprefix'} . '/acl/edit_user.cgi?user=' .
      (get_env('base_remote_user') eq "root" ? "root" : $remote_user) . '"><i class="fa2 fa-fw ' .
      get_user_icon() . ' vertical-align-baseline"></i>&nbsp;<span>' . $remote_user . '</span></a>';
} else {
    print '<a ' . $user_title . ' class="menu-exclude-link cursor-default"><i class="fa2 fa-fw ' .
      get_user_icon() . ' vertical-align-baseline"></i>&nbsp;<span>' . $remote_user . '</span></a>';
}
print '</li>';

&get_miniserv_config(\%miniserv);

if ($miniserv{'logout'} &&
    !get_env('ssl_user') &&
    get_env('http_user_agent') !~ /webmin/i)
{
    no warnings 'once';

    print '<li class="user-link __logout-link">';
    if ($main::session_id) {
        print '<a data-nref' .
          get_button_tooltip('theme_tooltip_logout', undef, 'auto top') . ' class="menu-exclude-link pd-rt-4" href="' .
          $gconfig{'webprefix'} . '/session_login.cgi?logout=1"><i class="fa fa-fw fa-sign-out text-danger"></i></a>';
    } else {
        print '<a data-nref' . get_button_tooltip('theme_xhred_tooltip_switch_user', undef, 'auto top') .
          ' class="menu-exclude-link pd-rt-4" href="' .
          $gconfig{'webprefix'} . '/switch_user.cgi"><i class="fa fa-fw fa-exchange text-danger"></i></a>';
    }
    print '</li>';
}

if (-r "$root_directory/virtual-server/edit_lang.cgi" &&
    $theme_config{'settings_leftmenu_button_language'} eq 'true' &&
    ($in{'xhr-navigation-type'} eq 'virtualmin' || $in{'xhr-navigation-type'} eq 'cloudmin'))
{
    print '<li data-linked' . get_button_tooltip('theme_tooltip_language_link', undef, 'auto top') . ' class="user-link">
                    <a class="menu-exclude-link pd-rt-4" href="'
      . $gconfig{'webprefix'} . '/virtual-server/edit_lang.cgi">
                        <i class="fa fa-fw fa-globe"></i>
                    </a>
                </li>';
} elsif (&foreign_available("change-user") &&
         $theme_config{'settings_leftmenu_button_language'} eq 'true')
{
    print '<li data-linked' . get_button_tooltip('theme_xhred_title_language_locale', undef, 'auto top') .
      ' class="user-link"><a class="menu-exclude-link pd-rt-4" href="' .
      $gconfig{'webprefix'} . '/change-user"><i class="fa fa-fw fa-globe"></i></a></li>';
}

print '<li data-linked' .
  get_button_tooltip('theme_xhred_filemanager_context_refresh', 'settings_hotkey_reload', 'auto top') .
  ' class="user-link' . ($theme_config{'settings_leftmenu_button_refresh'} ne 'true' && ' hidden') .
'"><a class="menu-exclude-link pd-rt-4" data-refresh="true" style="cursor: pointer"><i class="fa fa-fw fa-refresh"></i></a></li>';

print "</ul></li>";

1;
