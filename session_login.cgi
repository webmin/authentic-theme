#
# Authentic Theme 4.1.3 (https://github.com/qooob/authentic-theme)
# Copyright 2014 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

#!/usr/bin/perl
BEGIN { push( @INC, ".." ); }
use WebminCore;
$pragma_no_cache = 1;
&ReadParse();
&init_config();

%text = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
&get_miniserv_config( \%miniserv );
$title = &get_html_framed_title();

# Show pre-login text banner
if (   $gconfig{'loginbanner'}
    && $ENV{'HTTP_COOKIE'} !~ /banner=1/
    && !$in{'logout'}
    && !$in{'failed'}
    && !$in{'timed_out'} )
{
    print "Set-Cookie: banner=1; path=/\r\n";
    &PrintHeader($charset);
    print '<!DOCTYPE HTML>',        "\n";
    print '<html>',                 "\n";
    print '<head>',                 "\n";
    print '<title>',                $title, '</title>', "\n";
    print '<meta charset="utf-8">', "\n";
    print '<link rel="shortcut icon" href="/favicon-'
        . &get_product_name()
        . '.ico">' . "\n";
    print
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        . "\n";
    print
        '<link href="/unauthenticated/css/bootstrap.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print
        '<link href="/unauthenticated/css/fontawesome.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print
        '<link href="/unauthenticated/css/login.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print
        '<script src="/unauthenticated/js/jquery.min.js" type="text/javascript"></script>',
        "\n";
    print
        '<script src="/unauthenticated/js/bootstrap.min.js" type="text/javascript"></script>',
        "\n";
    print '</head>', "\n";
    print '<body>' . "\n";
    print
        '<div class="form-signin-banner container alert alert-danger"><i class="fa fa-3x fa-exclamation-triangle"></i><br><br>'
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

$sec = uc( $ENV{'HTTPS'} ) eq 'ON' ? "; secure" : "";
$sidname = $miniserv{'sidname'} || "sid";
print "Set-Cookie: banner=0; path=/$sec\r\n"   if ( $gconfig{'loginbanner'} );
print "Set-Cookie: $sidname=x; path=/$sec\r\n" if ( $in{'logout'} );
print "Set-Cookie: redirect=1; path=/\r\n";
print "Set-Cookie: testing=1; path=/$sec\r\n";
$charset = &get_charset();
&PrintHeader($charset);
print '<!DOCTYPE HTML>',        "\n";
print '<html>',                 "\n";
print '<head>',                 "\n";
print '<title>',                $title, '</title>', "\n";
print '<meta charset="utf-8">', "\n";
print '<link rel="shortcut icon" href="/favicon-'
    . &get_product_name()
    . '.ico">' . "\n";
print '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    . "\n";
print
    '<link href="/unauthenticated/css/bootstrap.min.css" rel="stylesheet" type="text/css">',
    "\n";
print
    '<link href="/unauthenticated/css/fontawesome.min.css" rel="stylesheet" type="text/css">',
    "\n";
print
    '<link href="/unauthenticated/css/login.min.css" rel="stylesheet" type="text/css">',
    "\n";
print
    '<script src="/unauthenticated/js/jquery.min.js" type="text/javascript"></script>',
    "\n";
print
    '<script src="/unauthenticated/js/bootstrap.min.js" type="text/javascript"></script>',
    "\n";
print '</head>', "\n";
print '<body>' . "\n";
print '<div class="container">' . "\n";
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
print '<form method="post" action="'
    . $gconfig{'webprefix'}
    . '/session_login.cgi" class="form-signin clearfix" role="form">' . "\n";
print '<h2 class="form-signin-heading"><i class="fa fa-cogs"></i> '
    . ucfirst( &get_product_name() ) . ' '
    . &get_webmin_version() . '</h2>' . "\n";

# Login message
if ( $gconfig{'realname'} ) {
    $host = &get_display_hostname();
}
else {
    $host = $ENV{'HTTP_HOST'};
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
print '<input type="text" class="form-control" name="user" placeholder="'
    . &text('login_user') . '" '
    . $tag . '>' . "\n";
print '</div>' . "\n";
print '<div class="input-group form-group">' . "\n";
print
    '<span class="input-group-addon"><i class="fa fa-fw fa-lock"></i></span>'
    . "\n";
print '<input type="password" class="form-control" name="pass" placeholder="'
    . &text('login_pass') . '"  '
    . $tag . '>' . "\n";
print '</div>' . "\n";

if ( $miniserv{'twofactor_provider'} ) {
    print '<div class="input-group form-group">' . "\n";
    print
        '<span class="input-group-addon"><i class="fa fa-fw fa-qrcode"></i></span>'
        . "\n";
    print
        '<input type="text" class="form-control" name="twofactor" placeholder="'
        . &text('login_token')
        . '" autocomplete=off>' . "\n";
    print '</div>' . "\n";
}
if ( !$gconfig{'noremember'} ) {
    print
        '<input type="checkbox" value="1" name="save" id="remember-me" class="remember-me">'
        . "\n";
    print '<label class="checkbox remember-me" for="remember-me">' . "\n";
    print '<i class="fa"></i> ' . $text{'login_save'} . "\n";
    print '</label>' . "\n";
}
print
    '<button class="btn btn-danger pull-left" type="reset"><i class="fa fa-pencil"></i> '
    . &text('login_reset')
    . '</button>' . "\n";
print
    '<button class="btn btn-primary pull-right" type="submit"><i class="fa fa-sign-in"></i> '
    . &text('login_signin')
    . '</button>' . "\n";
print '</form>' . "\n";
print '</div>' . "\n";
&footer();
