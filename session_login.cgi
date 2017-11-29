#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . "/authentic-lib.pm");

get_miniserv_config(\%miniserv);

our %__settings = (settings($config_directory . "/$current_theme/settings-root", 'settings_'));

# Define page title
$title = $text{'session_header'};
if ($gconfig{'showhost'}) {
    $title = &get_display_hostname() . " : " . $title;
}

# Show pre-login text banner
if ($gconfig{'loginbanner'} &&
    get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'}                       &&
    !$in{'failed'}                       &&
    !$in{'timed_out'})
{

    print "Auth-type: auth-required=1\r\n";
    print "Set-Cookie: banner=1; path=/\r\n";
    &PrintHeader($charset);
    print '<!DOCTYPE HTML>', "\n";
    print '<html data-background-style="'
      .
      ( theme_night_mode() ? 'nightRider' :
          'gainsboro'
      ) .
      '" class="session_login">', "\n";
    embed_login_head();
    print '<body class="session_login" data-style="' . get_filters('content') . '">' . "\n";
    print
'<div class="form-signin-banner container session_login alert alert-danger" data-dcontainer="1"><i class="fa fa-3x fa-exclamation-triangle"></i><br><br>'
      . "\n";
    $url = $in{'page'};
    open(BANNER, $gconfig{'loginbanner'});

    while (<BANNER>) {
        s/LOGINURL/$url/g;
        print;
    }

    close(BANNER);
    &footer();
    return;
}

$sec = lc(get_env('https')) eq 'on' ? "; secure" : "";
$sidname = $miniserv{'sidname'} || "sid";
print "Auth-type: auth-required=1\r\n";
print "Set-Cookie: banner=0; path=/$sec\r\n"   if ($gconfig{'loginbanner'});
print "Set-Cookie: $sidname=x; path=/$sec\r\n" if ($in{'logout'});
print "Set-Cookie: redirect=1; path=/\r\n";
print "Set-Cookie: testing=1; path=/$sec\r\n";
$charset = &get_charset();
&PrintHeader($charset);
print '<!DOCTYPE HTML>', "\n";
print '<html data-background-style="'
  .
  ( theme_night_mode() ? 'nightRider' :
      'gainsboro'
  ) .
  '" class="session_login">', "\n";
embed_login_head();
print '<body class="session_login" data-style="' . get_filters('content') . '">' . "\n";
print '<div class="container session_login" data-dcontainer="1">' . "\n";

if (defined($in{'failed'})) {
    if ($in{'twofactor_msg'}) {
        print "<h3>",, "</h3><p></p>\n";
        print '<div class="alert alert-warning" data-twofactor>' . "\n";
        print '<strong><i class ="fa fa-exclamation-triangle"></i> ' . $Atext{'login_warning'} .
          '</strong><br /><span>' . &Atext('session_twofailed', &html_escape($in{'twofactor_msg'})) . "</span>\n";
        print '</div>' . "\n";
    } else {
        print '<div class="alert alert-warning">' . "\n";
        print '<strong><i class ="fa fa-exclamation-triangle"></i> ' . $Atext{'login_warning'} . '</strong><br />' . "\n";
        print '<span>' . $Atext{'theme_xhred_session_failed'} . "</span>\n";
        print '</div>' . "\n";
    }
} elsif ($in{'logout'}) {
    print '<div class="alert alert-success">' . "\n";
    print '<strong><i class ="fa fa-check"></i> ' . $Atext{'login_success'} . '</strong><br />' . "\n";
    print '<span>' . $Atext{'session_logout'} . "</span>\n";
    print '</div>' . "\n";
} elsif ($in{'timed_out'}) {
    print '<div class="alert alert-warning">' . "\n";
    print '<strong><i class ="fa fa fa-exclamation-triangle"></i> ' . $Atext{'login_warning'} . '</strong><br />' . "\n";
    print '<span>' . &Atext('session_timed_out', int($in{'timed_out'} / 60)) . "</span>\n";
    print '</div>' . "\n";
}
print "$text{'session_prefix'}\n";
print '<form method="post" target="_top" action="' . $gconfig{'webprefix'} .
  '/session_login.cgi" class="form-signin session_login clearfix" role="form" onsubmit="spinner()">' . "\n";

print '<i class="wbm-webmin"></i><h2 class="form-signin-heading">
     <span>'
  . (&get_product_name() eq 'webmin' ? $Atext{'theme_xhred_titles_wm'} :
       $Atext{'theme_xhred_titles_um'}
  ) .
  '</span></h2>' . "\n";

# Process logo
embed_logo();

# Login message
if ($gconfig{'realname'}) {
    $host = &get_display_hostname();
} else {
    $host = get_env('server_name');
    $host =~ s/:\d+//g;
    $host = &html_escape($host);
}
print '<p class="form-signin-paragraph">' . &Atext('login_message') . '<strong> ' . $host . '</strong></p>' . "\n";
$tag = $gconfig{'noremember'} ? 'autocomplete="off"' : '';
print '<div class="input-group form-group">' . "\n";
print '<span class="input-group-addon"><i class="fa fa-fw fa-user"></i></span>' . "\n";
print '<input type="text" class="form-control session_login" name="user" autocomplete="off" autocapitalize="none" placeholder="' .
  &Atext('theme_xhred_login_user') . '" ' . $tag . ' autofocus>' . "\n";
print '</div>' . "\n";
print '<div class="input-group form-group">' . "\n";
print '<span class="input-group-addon"><i class="fa fa-fw fa-lock"></i></span>' . "\n";
print '<input type="password" class="form-control session_login" name="pass" autocomplete="off" placeholder="' .
  &Atext('theme_xhred_login_pass') . '"  ' . $tag . '>' . "\n";
print '</div>' . "\n";

if ($miniserv{'twofactor_provider'}) {
    print '<div class="input-group form-group">' . "\n";
    print '<span class="input-group-addon"><i class="fa fa-fw fa-qrcode"></i></span>' . "\n";
    print '<input type="text" class="form-control session_login" name="twofactor" autocomplete="off" placeholder="' .
      &Atext('theme_xhred_login_token') . '">' . "\n";
    print '</div>' . "\n";
}
if (!$gconfig{'noremember'}) {
    print '<div class="input-group form-group">
            <span class="awcheckbox awobject"><input class="iawobject" name="save" value="1" id="save" type="checkbox"> <label class="lawobject" for="save">'
      . $Atext{'login_save'} . '</label></span>
         </div>' . "\n";
}
print '<div class="form-group form-signin-group">';
print '<button class="btn btn-primary" type="submit"><i class="fa fa-sign-in"></i>&nbsp;&nbsp;' .
  &Atext('login_signin') . '</button>' . "\n";

if ($text{'session_postfix'} =~ "href") {
    my $link = get_link($text{'session_postfix'}, 'ugly');

    print '<button onclick=\'window.open("' . $link->[0] . '", "' . $link->[1] .
'", "toolbar=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=500");return false;\' class="btn btn-warning"><i class="fa fa-unlock"></i>&nbsp;&nbsp;'
      . &Atext('login_reset')
      . '</button>' . "\n";
}

print '</div>';
print '</form>' . "\n";

&footer();
