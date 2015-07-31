#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
$pragma_no_cache = 1;
&ReadParse();
&init_config();

%text = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
&get_miniserv_config( \%miniserv );

#Define page title
$title = $text{'session_header'};
if ( $gconfig{'showhost'} ) {
    $title = &get_display_hostname() . " : " . $title;
}

# Load dependencies
do "authentic-theme/authentic-lib.cgi";

# Show pre-login text banner
if (   $gconfig{'loginbanner'}
    && $ENV{'HTTP_COOKIE'} !~ /banner=1/
    && !$in{'logout'}
    && !$in{'failed'}
    && !$in{'timed_out'} )
{
    # Notify when unauthenticated user is seeing pre-login banner
    notify('settings_security_notify_on_pre_login_request');

    print "Set-Cookie: banner=1; path=/\r\n";
    &PrintHeader($charset);
    print '<!DOCTYPE HTML>', "\n";
    print '<html class="session_login">',          "\n";
    embed_login_head();
    print '<body class="session_login">' . "\n";
    print
        '<div class="form-signin-banner container session_login alert alert-danger"><i class="fa fa-3x fa-exclamation-triangle"></i><br><br>'
        . "\n";
    $url = $in{'page'};
    open( BANNER, $gconfig{'loginbanner'} );

    while (<BANNER>) {
        s/LOGINURL/$url/g;
        print;
    }

    close(BANNER);
    &footer();
    return;
}
else {
    # Notify when unauthenticated user is landed on login page
    notify('settings_security_notify_on_login_request');

}

$sec = uc( $ENV{'HTTPS'} ) eq 'ON' ? "; secure" : "";
$sidname = $miniserv{'sidname'} || "sid";
print "Set-Cookie: banner=0; path=/$sec\r\n"   if ( $gconfig{'loginbanner'} );
print "Set-Cookie: $sidname=x; path=/$sec\r\n" if ( $in{'logout'} );
print "Set-Cookie: redirect=1; path=/\r\n";
print "Set-Cookie: testing=1; path=/$sec\r\n";
$charset = &get_charset();
&PrintHeader($charset);
print '<!DOCTYPE HTML>', "\n";
print '<html class="session_login">',          "\n";
embed_login_head();
print '<body class="session_login">' . "\n";
print '<div class="container session_login">' . "\n";

if ( defined( $in{'failed'} ) ) {
    if ( $in{'twofactor_msg'} ) {
        print "<h3>",, "</h3><p></p>\n";
        print '<div class="alert alert-danger">' . "\n";
        print '<strong><i class ="fa fa-bolt"></i> '
            . $text{'login_danger'}
            . '</strong><br />'
            . &text( 'session_twofailed',
            &html_escape( $in{'twofactor_msg'} ) )
            . "\n";
        print '</div>' . "\n";
    }
    else {
        print '<div class="alert alert-danger">' . "\n";
        print '<strong><i class ="fa fa-bolt"></i> '
            . $text{'login_danger'}
            . '</strong><br />' . "\n";
        print $text{'session_failed'} . "\n";
        print '</div>' . "\n";
    }
}
elsif ( $in{'logout'} ) {
    print '<div class="alert alert-success">' . "\n";
    print '<strong><i class ="fa fa-check"></i> '
        . $text{'login_success'}
        . '</strong><br />' . "\n";
    print $text{'session_logout'} . "\n";
    print '</div>' . "\n";
}
elsif ( $in{'timed_out'} ) {
    print '<div class="alert alert-warning">' . "\n";
    print '<strong><i class ="fa fa fa-exclamation-triangle"></i> '
        . $text{'login_warning'}
        . '</strong><br />' . "\n";
    print &text( 'session_timed_out', int( $in{'timed_out'} / 60 ) ) . "\n";
    print '</div>' . "\n";
}
print '<form method="post" target="_top" action="'
    . $gconfig{'webprefix'}
    . '/session_login.cgi" class="form-signin session_login clearfix" role="form">' . "\n";

print '<i class="wbm-webmin"></i><h2 class="form-signin-heading">
     <span>'
    . ucfirst( &get_product_name() ) . '</span></h2>' . "\n";

#Process logo
embed_logo();

# Login message
if ( $gconfig{'realname'} ) {
    $host = &get_display_hostname();
}
else {
    $host = $ENV{'SERVER_NAME'};
    $host =~ s/:\d+//g;
    $host = &html_escape($host);
}
print '<p class="form-signin-paragraph">'
    . &text('login_message')
    . '<strong> '
    . $host
    . '</strong></p>' . "\n";
$tag = $gconfig{'noremember'} ? 'autocomplete="off"' : '';
print '<div class="input-group form-group">' . "\n";
print
    '<span class="input-group-addon"><i class="fa fa-fw fa-user"></i></span>'
    . "\n";
print '<input type="text" class="form-control session_login" name="user" placeholder="'
    . &text('login_user') . '" '
    . $tag
    . ' autofocus>' . "\n";
print '</div>' . "\n";
print '<div class="input-group form-group">' . "\n";
print
    '<span class="input-group-addon"><i class="fa fa-fw fa-lock"></i></span>'
    . "\n";
print '<input type="password" class="form-control session_login" name="pass" placeholder="'
    . &text('login_pass') . '"  '
    . $tag . '>' . "\n";
print '</div>' . "\n";

if ( $miniserv{'twofactor_provider'} ) {
    print '<div class="input-group form-group">' . "\n";
    print
        '<span class="input-group-addon"><i class="fa fa-fw fa-qrcode"></i></span>'
        . "\n";
    print
        '<input type="text" class="form-control session_login" name="twofactor" placeholder="'
        . &text('login_token')
        . '" autocomplete=off>' . "\n";
    print '</div>' . "\n";
}
if ( !$gconfig{'noremember'} ) {
    print
        '<div class="input-group form-group"><input type="checkbox" value="1" name="save" id="remember-me" class="remember-me session_login">'
        . "\n";
    print '<label class="checkbox remember-me" for="remember-me">' . "\n";
    print '<i class="fa"></i> <span>'
        . $text{'login_save'}
        . '</span></label></div>' . "\n";
}
print '<div class="form-group">';
if ( -r $root_directory . "/virtualmin-password-recovery/index.cgi"
    && index( %miniserv->{'anonymous'}, 'virtualmin-password-recovery' )
    > -1 )
{
    print
        '<button onclick=\'window.open("/virtualmin-password-recovery", "password_recovery", "toolbar=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=500");\' class="btn btn-warning pull-left" type="reset"><i class="fa fa-undo"></i>&nbsp;&nbsp;'
        . &text('login_reset')
        . '</button>' . "\n";
}
else {
    print
        '<button class="btn btn-danger pull-left" type="reset"><i class="fa fa-eraser"></i>&nbsp;&nbsp;'
        . &text('login_reset')
        . '</button>' . "\n";
}
print
    '<button class="btn btn-primary pull-right" type="submit" style="margin-top: 0 !important"><i class="fa fa-sign-in"></i>&nbsp;&nbsp;'
    . &text('login_signin')
    . '</button>' . "\n";
print '</div>';
print '</form>' . "\n";
&footer();
