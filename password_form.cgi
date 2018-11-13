#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %gconfig, %text, $pragma_no_cache, %theme_text, %theme_config);

require(dirname(__FILE__) . "/authentic-lib.pm");

$pragma_no_cache = 1;
$ENV{'MINISERV_INTERNAL'} || die "Can only be called by miniserv.pl";

my $charset = &get_charset();
&PrintHeader($charset);

print '<!DOCTYPE HTML>', "\n";
print '<html data-background-style="' . $theme_config{'settings_background_color'} . '" class="session_login">', "\n";
embed_login_head();
print '<body class="session_login">' . "\n";
print '<div class="container session_login">' . "\n";

if ($in{'expired'} == 2) {
    print '<div class="alert alert-info">' . "\n";
    print '<i class ="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;' . $text{'password_temp'} . '' . "\n";
    print '</div>' . "\n";
} else {
    print '<div class="alert alert-info">' . "\n";
    print '<i class ="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;' . $text{'password_expired'} . '' . "\n";
    print '</div>' . "\n";
}

# Start of the form
print "$text{'password_prefix'}\n";

print '<form method="post" target="_top" action="' . $gconfig{'webprefix'} .
  '/password_change.cgi" class="form-signin session_login clearfix" role="form" onsubmit="spinner()">' . "\n";
print ui_hidden("user",    $in{'user'});
print ui_hidden("pam",     $in{'pam'});
print ui_hidden("expired", $in{'expired'});

print '<i class="wbm-webmin"></i><h2 class="form-signin-heading">
     <span>'
  . (&get_product_name() eq 'webmin' ? $theme_text{'theme_xhred_titles_wm'} :
       $theme_text{'theme_xhred_titles_um'}
  ) .
  '</span></h2>' . "\n";

# Process logo
embed_logo();

# Login message
my $host;
if ($gconfig{'realname'}) {
    $host = &get_display_hostname();
} else {
    $host = get_env('server_name');
    $host =~ s/:\d+//g;
    $host = &html_escape($host);
}

print '<p class="form-signin-paragraph">' .
  theme_text('theme_new_password_header') . ' <em><strong>' . $in{'user'} . '</strong></em></p>' . "\n";

print '<div class="input-group form-group">' . "\n";
print '<span class="input-group-addon"><i class="fa fa-fw fa-key"></i></span>' . "\n";
print '<input type="password" class="form-control session_login" name="old" autocomplete="off" placeholder="' .
  theme_text('password_old') . '" autocomplete="off">' . "\n";
print '</div>' . "\n";

print '<div class="input-group form-group">' . "\n";
print '<span class="input-group-addon"><i class="fa fa-fw fa-key-plus"></i></span>' . "\n";
print '<input type="password" class="form-control session_login" name="new1" autocomplete="off" placeholder="' .
  theme_text('password_new1') . '" autocomplete="off">' . "\n";
print '</div>' . "\n";

print '<div class="input-group form-group">' . "\n";
print '<span class="input-group-addon"><i class="fa fa-fw fa-key-plus"></i></span>' . "\n";
print '<input type="password" class="form-control session_login" name="new2" autocomplete="off" placeholder="' .
  theme_text('password_new2') . '" autocomplete="off">' . "\n";
print '</div>' . "\n";

print '<div class="form-group">';
print
'<button class="btn btn-primary" type="submit" style="margin-top: 0 !important; width: 100%"><i class="fa fa-unlock"></i>&nbsp;&nbsp;'
  . &theme_text('password_ok')
  . '</button>' . "\n";
print
'<script>function spinner(){var x=$(".fa.fa-unlock"),s =\'<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: 2px; margin-left: -22px;"><span class="cspinner-icon white small"></span></span></span>\';x.addClass("invisible").after(s);x.parent(".btn").addClass("disabled")}</script>';
print '</div>';
print '</form>' . "\n";

print "$text{'password_postfix'}\n";
&footer();
