#!/usr/bin/perl

#
# Authentic Theme 12.00 (https://github.com/qooob/authentic-theme)
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
    print '<!DOCTYPE HTML>',        "\n";
    print '<html>',                 "\n";
    print '<head>',                 "\n";
    print '<title>',                $title, '</title>', "\n";
    print '<meta charset="utf-8">', "\n";
    print '<link rel="shortcut icon" href="'
        . $gconfig{'webprefix'}
        . '/images/favicon'
        . (
        ( &get_product_name() eq 'usermin' )
        ? '-usermin'
        : '-webmin'
        ) . '.ico">' . "\n";
    print
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        . "\n";
    print '<link href="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/css/bootstrap.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print '<link href="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/css/fontawesome.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print '<link href="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/css/login.min.css" rel="stylesheet" type="text/css">',
        "\n";
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/jquery.min.js" type="text/javascript"></script>',
        "\n";
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/bootstrap.min.js" type="text/javascript"></script>',
        "\n";
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/login.min.js" type="text/javascript"></script>',
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
print '<!DOCTYPE HTML>',        "\n";
print '<html>',                 "\n";
print '<head>',                 "\n";
print '<title>',                $title, '</title>', "\n";
print '<meta charset="utf-8">', "\n";
print '<link rel="shortcut icon" href="'
    . $gconfig{'webprefix'}
    . '/images/favicon'
    . (
    ( &get_product_name() eq 'usermin' )
    ? '-usermin'
    : '-webmin'
    ) . '.ico">' . "\n";
print '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    . "\n";
print '<link href="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/css/bootstrap.min.css" rel="stylesheet" type="text/css">',
    "\n";
print '<link href="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/css/fontawesome.min.css" rel="stylesheet" type="text/css">',
    "\n";
print '<link href="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/css/login.min.css" rel="stylesheet" type="text/css">',
    "\n";
print '<script src="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/js/jquery.min.js" type="text/javascript"></script>',
    "\n";
print '<script src="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/js/bootstrap.min.js" type="text/javascript"></script>',
    "\n";
print '<script src="'
    . $gconfig{'webprefix'}
    . '/unauthenticated/js/login.min.js" type="text/javascript"></script>',
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
print '<form method="post" target="_top" action="'
    . $gconfig{'webprefix'}
    . '/session_login.cgi" class="form-signin clearfix" role="form">' . "\n";
print
    '<h2 class="form-signin-heading"><img alt="" style="height:36px; opacity: .8" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOm5zMD0iJmFtcDsjMzg7bnNfYWk7IiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjEyOCIgICBoZWlnaHQ9IjEyOCIgICB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgICBpZD0ic3ZnNzMyNiIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiICAgc29kaXBvZGk6ZG9jbmFtZT0iV2VibWluLWljb24tYmxhY2stbW9ub2Nocm9tZS5zdmciPiAgPGRlZnMgICAgIGlkPSJkZWZzNzMyOCIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOnpvb209IjIuODI4NDI3MSIgICAgIGlua3NjYXBlOmN4PSIxNi4yNDMzMjYiICAgICBpbmtzY2FwZTpjeT0iNjYuMjEwMDkzIiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIiAgICAgc2hvd2dyaWQ9ImZhbHNlIiAgICAgdW5pdHM9InB4IiAgICAgd2lkdGg9IjEyOHB4IiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxNCIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjI3IiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNzMzMSI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtOTI0LjM2MjIpIj4gICAgPHBhdGggICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MSIgICAgICAgaWQ9InBhdGg2NjgyIiAgICAgICBkPSJtIDE1LjI4MjU3OSwxMDE5LjMyMjggYyAtMC43NTkwOTgsNS42MjQ2IDAuMTE3NDg1LDEwLjQ0NjcgMi42Njc2ODMsMTQuNTc2NSA1Ljc1NjQ4Nyw5LjQxMSAxOC41Nzc5OTgsMTIuOTQyNiAyOC4xOTE0Miw3LjgzMzEgNS42MzkwMDYsLTMuMDM2NCAxMS4zMDMzMTcsLTYuMDYxOSAxNy4wMjAwNDEsLTkuMTIzNSBsIDAsMCBjIDUuNTg2NTkzLDMuMTUyIDExLjE1ODcyNyw2LjMwNTggMTYuNzE4MjEsOS40NTYxIDQuODkyNTYxLDIuNzQ5IDEwLjY3NjE1OCwzLjMwNzQgMTUuOTczNTcxLDEuOTY4MiA1LjE2NTQ2NiwtMS4zMDY3IDkuOTQwNTU2LC00LjQ2NDIgMTIuOTc2OTQ2LC05LjE4MTQgMi42ODIxNCwtNC4xNDA3IDMuNjExMTQsLTkuMDY1NyAyLjkwNDQ1LC0xNC44Mjc3IDUuNTU5NDgsLTEuNzcyOSA5LjczMjcxLC00LjgzMjkgMTIuNTg0NzQsLTkuMjYyNyAzLjE3OTE4LC00LjkzNDIgMy45MzgyOCwtMTAuNjQwMSAyLjYyOTc0LC0xNS44MjAwNCAtMS4zMzIwNCwtNS4yNjQ4OSAtNC44MzgzNCwtMTAuMTM1NzYgLTEwLjE1MDIyLC0xMy4xMDM0NyAtNS40MjkzNCwtMy4wMjczNCAtMTAuODQ2MDUsLTYuMDUyODggLTE2LjI1MDEsLTkuMDY3NTkgMC4xMTgzMSwtNi4yNTY4IDAuMjMwNzEsLTEyLjk5ODA1IDAuMzM5OSwtMTguNzQwODEgMC4yMjIyOSwtMTIuMTk2MTYgLTkuOTI3OTEyLC0yMi4yMjg5IC0yMi4zNjk4NzUsLTIyLjAzMTg4IC01LjU0NTAyNCwwLjA4MTQgLTEwLjUyOTc2MSwyLjA2OTQzIC0xNS4xNDc2MDEsNS45MjQ1NiAtNC45MzIzMjQsLTMuNzM5NDUgLTkuOTQyMzY1LC01LjU4MTE3IC0xNS4xODkxNzIsLTUuNTEwNjggLTExLjk0NDkzNCwwLjE3MTcgLTIxLjg2MDE4OCw5Ljk0MDU2IC0yMS43ODA2NjQsMjEuMjM4NDUgMC4wMjUzLDYuNDE3OTkgMC4xNDA4NTUsMTMuMDM4MDMgMC4xODA2MDgsMTkuNDM2MTQgMC4zNjUwOSwtMC4yMjA1MSAwLjcwODYxNCwtMC42Mzk0NSAxLjExMzQ2NiwtMC44Njg5OCAwLjQ0NDYxNCwtMC4yNDIxOSAwLjkwMTg3OSwtMC41Mjk1NiAxLjMwODUzOSwtMC43OTM0NCA0LjE0NjExNiwtMi4yMDg2MSA4LjA3MTczMSwtMS41MzA4NSAxMC4yMjk3MzcsMi4wMzY5MSAwLjgzNjgxMywxLjM5MTY4IDEuMTY1NzU2LDIuODUzODQgMC45NTYxLDQuMjMyODYgbCAwLDAuMDEyNyAwLDAuMDcwNCBjIDAsMC4wMTEzIDAsMC4wMjE3IC0wLjAyODkyLDAuMDM0MyAwLDAuMDExMyAwLDAuMDIzNCAtMC4wMTI2NSwwLjAzNDQgMCwwLjA4MTQgMCwwLjE1MDAyIC0wLjAxMjY1LDAuMjQ0IDAuMTcxNywtMC43MjQ3NiAwLjI3NjUyOCwtMS41MDkxNiAwLjMyODk0MSwtMi4zNjA0MyAtMC4wMjcxMSwtMC41Mjc3NSAtMC4wMjcxMSwtMS4wMzM4MSAtMC4wMzc5NiwtMS41NDE2OSAwLC01LjcwNzY4IC0wLjAwOSwtMTEuMzY4MzggMCwtMTcuMDg1MTEgMC4wMDM2LC0zLjAzNjM4IDAuMTE3NDg2LC00LjI5MDcgMC42MDE4NTYsLTUuODU1ODkgMC45NTYxMDEsLTMuMTA2ODcgMy44NTg3NDMsLTUuMjQ2ODEgNy4zNTA1OSwtNS4yNzkzNCAzLjQwMzI4NSwtMC4wMjUzIDYuMzk4MTA0LDIuMTQ4OTcgNy4yMzQ5MTgsNS4xNTI4MyAwLjQ1NzI2NiwxLjM2OTk4IDAuNjM5ODExLDMuMzQ5MDYgMC42Mjg5NjYsNS44NjY3NCAtMC4wMjcxMiw1LjcxODUyIC0wLjAzOTc2LDExLjQ0OTcxIC0wLjA2Njg3LDE3LjE2NjQ0IDAsMC40OTM0MSAwLDEuMDIyOTcgMC4wMTQ0NSwxLjUzMDg0IC0wLjAxNDQ1LDQuNTMyOSAyLjgxMjI3Myw3LjYxNjI4IDcuMDI1MjYyLDcuNjE2MjggNC4yNzgwNTUsMCA3LjA2NTAyNSwtMi45OTEyMSA3LjExNzQzOSwtNy42Mzk3OCAwLC0wLjUwNjA2IDAsLTEuMDIyOTcgMC4wMTI2NSwtMS41NDM1IDAuMDUyNDEsLTUuNzI5MzcgMC4xMDQ4MjUsLTExLjQ2MDU2IDAuMTQ2Mzk3LC0xNy4yMzMzIDAuMDIxNjksLTMuNTc2OCAwLjM3Nzc0MSwtNS4yNTc2NSAxLjM3MTc5NywtNy4xNTcyIDEuMjE2MzYzLC0yLjI5ODk5IDMuNzkzNjc5LC0zLjc5MzY4IDYuNjIwNDExLC0zLjgxODk5IDMuMTM3NjAyLC0wLjAzMDcgNi4wNzQ1ODQsMS43Mzg3IDcuMTAyOTgsNC4zMzc2OSAwLjYzMjU4LDEuNTk3NzMgMC44MDk3MDQsMi45MzMzOCAwLjc3MTc0OSw2LjUzMzY2IC0wLjEwNDgyNCw1Ljc3NjM3IC0wLjE3MTcsMTEuNTYxNzggLTAuMjM0OTU4LDE3LjMyNzMgLTAuMDM5NzYsMC41MDQyNSAtMC4wMjcxMSwxLjAzMzgxIC0wLjAzOTc2LDEuNTY1MTggLTAuMDM3OTYsMy4xNzM3NSAxLjM0ODMwMSw1LjY3MTU1IDMuNzAzMzA5LDYuODY4MDMgMC4yNzI5MTMsMC4xOTUxOSAwLjU3NDc0NSwwLjM5MDM4IDAuOTAxODc5LDAuNTc0NzUgMC40NTcyNjYsMC4yNDIxOCAwLjkwMzY4OCwwLjQ2MDg4IDEuMzQ4MzAxLDAuNzQ2NDQgNS4wMjI2OTMsMi43ODUxNiAxMC4wODUxNTUsNS42MDQ2NyAxNS4wOTcwMDUsOC40MzMyMSAzLjA4Njk5LDEuNzM4NjkgNC4xNjA1NywyLjU2NjQ2IDUuMTY3MjgsMy44NTY5NCAxLjczODY5LDIuMTM5OTIgMS43OTI5Miw1LjM3MTU3IDAuMTgyNTUsNy44ODAxNyAtMS40Mzg2NywyLjI1MzggLTQuMDI4NjQsMy42NDczIC02LjYzMzA3LDMuNDczOCAtMi4xMTgyNSwtMC4xMzc0IC0zLjcwMTUsLTAuNjkwNSAtNi43Nzc2NTgsLTIuMzkzIC00Ljk5NTU4MiwtMi44MTk1IC05Ljk4MDMxOCwtNS42MTM3MiAtMTQuOTUyNDA0LC04LjQwOTczIC0wLjQ0NDYxNSwtMC4yNjM4NyAtMC44ODkyMjksLTAuNTE2OTEgLTEuMzQ2NDk0LC0wLjc1OTEgLTQuMDU1NzQ4LC0yLjI2NjQ1IC04LjA4NDM4NSwtMS40NzEyIC0xMC4xNjY0NzgsMS45ODk5MiAtMi4xNDUzNTQsMy40NjMwMSAtMC44NzQ3NjksNy4yOTQ2MSAzLjA2MTY5LDkuNTE1OTEgMC40NTcyNjYsMC4yNTQ4IDAuOTAxODgxLDAuNDk1MiAxLjM2MDk1MywwLjc0ODMgNC45MTc4NjQsMi43ODUyIDkuODYyODQsNS41NDQ5IDE0LjgyMDQ2Nyw4LjMyODQgMi4xODUxMTUsMS4yMTk5IDMuNzgxMDI2LDIuMzQ3NyA0LjcyNDQ3NSwzLjMzNjQgMi4xODMzMDgsMi4xNjE1IDIuNTIzMDk1LDUuNjE1NSAwLjgwOTcwNSw4LjM0MDkgLTEuNzkxMTA4LDIuNzk2MSAtNS4wMTAwNDIsNC4wNjI5IC04LjE3NDc1MywzLjMyNzMgLTEuNTgzMjYsLTAuMzM2MSAtMi43MjE5MDYsLTAuODc0NyAtNS4yODQ3NjMsLTIuMzEzMyAtNC45MTk2NzEsLTIuNzg1MiAtOS44MjQ4ODQsLTUuNTY4NSAtMTQuNzY4MDUyLC04LjMwODUgLTAuNDMxOTYzLC0wLjI3NDcgLTAuODkxMDM2LC0wLjUxNjkgLTEuMzQ4MzAyLC0wLjc2OTkgLTEuNjYwOTc2LC0wLjg5NjYgLTMuMzM2NDExLC0xLjI5MDYgLTQuODU0NjA2LC0xLjE5NjUgbCAtMC4wMTI2NSwwIGMgLTEuNDExNTU5LC0wLjAyNCAtMi45NTY4NjQsMC4zNDUyIC00LjQ4NTkwMiwxLjEzODYgLTAuNDQ0NjE0LDAuMjU0OCAtMC44ODkyMjgsMC41MDYxIC0xLjM0ODMwMSwwLjc0ODIgLTQuOTcwMjc5LDIuNjgwNCAtOS44ODk5NTEsNS4zNzg3IC0xNC43OTUxNjMsOC4wMzAyIC0yLjU3MzcwMSwxLjM5MzUgLTMuNjg4ODUxLDEuODg1MSAtNS4yNTk0NTksMi4xOTc4IC0zLjEzOTQwOCwwLjY1NDIgLTYuMjUzNTEzLC0wLjY2NyAtNy45NjY5MDUsLTMuNDc1NiAtMS42MzU2NzIsLTIuNzE0NyAtMS4yNTYxMjUsLTYuMDgzNiAwLjg3NjU3NywtOC4xOTEgMC45NTYxMDEsLTAuOTc2IDIuNDg1MTQsLTIuMDcxMyA0LjYxOTY0OCwtMy4yMzE2IDQuOTE5NjcxLC0yLjY5MTEgOS44NzU0OTIsLTUuMzk1IDE0Ljc5NTE2MywtOC4xMjIzIDAuNDMwMTU2LC0wLjI0MjIgMC45MTYzMzksLTAuNTA2MSAxLjM0NjQ5NCwtMC43MzU2IDMuOTUyNzI3LC0yLjE4NyA1LjI1OTQ1OCwtNi4wMDYgMy4xNzkxNzEsLTkuNDY4OTMgLTIuMDk0NzQ2LC0zLjQ3NTU3IC02LjA1NjUxLC00LjIzMTA1IC0xMC4wODY5NTQsLTEuOTkxNzIgLTAuNDQwOTk5LDAuMjQ1OCAtMC45MTQ1MzIsMC40OTUyMyAtMS4zNDgzMDEsMC43MjI5NSAtNC45NzAyNzgsMi43Mzk5OCAtOS44NzczLDUuNTAxNyAtMTQuNzU1NDAyLDguMjUwNyAtMy4wMjE5MjksMS42NjgxIC00LjYwNTE4OCwyLjE4NTIgLTYuNjQ1NzEzLDIuMzAwOSAtMi40OTk1OTksMC4xMzU1IC00Ljk4NjU0NiwtMS4yMzI3IC02LjMzMTIzMiwtMy40NTQgLTEuNDkxMDg0LC0yLjQ1OTkgLTEuNDM4NjY5LC01LjYxMzc1IDAuMjIyMzA3LC03LjY5NTg0IDEuMDE5MzU4LC0xLjI3NzgxIDIuMDY3NjM1LC0yLjA4MjEgNS4wNjI0NTQsLTMuNzczNzkgNC45MDUyMTQsLTIuNzQ5MDMgOS44MTIyMzQsLTUuNTQ1MDMgMTQuNzE3NDQ3LC04LjM0MTAzIDAuNDQ0NjE1LC0wLjI2Mzg4IDAuOTI4OTksLTAuNTA2MDcgMS4zNTkxNDUsLTAuNzU5MTEgMy45NTA5MiwtMi4yMjEyNSA1LjQyMzU1OSwtNi4zNTA2MSAzLjMyODgxMywtOS44NDk2OSAtMi4xMDU1OTEsLTMuNDk3MjcgLTYuNTYxNTg3LC00LjM3NTI4IC0xMC4wNjE3NzUsLTIuMTAzNTQgMCwwIC0wLjcwMTYzMSwwLjQ1MTk4IC0xLjE0NDQzOCwwLjcwNjgyIC01LjY2NDMxLDMuMjQ0MjQgLTExLjc1NzkxMSw2LjkxOTU2IC0xNy4zODI0NTgsMTAuMTUxMTUgLTEwLjA0NzE5MjIzLDUuNzc2MzcgLTEzLjM4MzYwNSwxOC41MDAzMyAtNy40ODI1MjkyLDI4LjE1MzUzIDIuNjUzMjI1OSw0LjMzMDUgNi42Mjk0NDgzLDcuMzMyNiAxMS45MjY4NjEyLDkuMTc0MiB6IiAgICAgICBuczA6a25vY2tvdXQ9Ik9mZiIgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NzY2NjY2NjY2NjY2Njc2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NzY2NjY2NjY2NjYyIgLz4gIDwvZz48L3N2Zz4="> '
    . ucfirst( &get_product_name() ) . '</h2>' . "\n";

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
print '<input type="text" class="form-control" name="user" placeholder="'
    . &text('login_user') . '" '
    . $tag . ' autofocus>' . "\n";
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

if ( -r $root_directory . "/virtualmin-password-recovery/index.cgi"
    && index( %miniserv->{'anonymous'}, 'virtualmin-password-recovery' )
    > -1 )
{
    print
        '<button onclick=\'window.open("/virtualmin-password-recovery", "password_recovery", "toolbar=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=500");\' class="btn btn-warning pull-left" type="reset"><i class="fa fa-undo"></i> '
        . &text('login_reset')
        . '</button>' . "\n";
}
else {
    print
        '<button class="btn btn-danger pull-left" type="reset"><i class="fa fa-eraser"></i> '
        . &text('login_reset')
        . '</button>' . "\n";
}
print
    '<button class="btn btn-primary pull-right" type="submit"><i class="fa fa-sign-in"></i> '
    . &text('login_signin')
    . '</button>' . "\n";
print '</form>' . "\n";
&footer();
