#
# Authentic Theme 8.1.0 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&ReadParse();
&init_config();
if ( $in{'mod'} ) {
    $minfo = { &get_module_info( $in{'mod'} ) };
}
else {
    $minfo = &get_goto_module();
}
$goto
    = $minfo      ? "$minfo->{'dir'}/"
    : $in{'page'} ? ""
    :               "/body.cgi";

if ($minfo) {
    $cat = "?$minfo->{'category'}=1";
}
if ( $in{'page'} ) {
    $goto .= "/" . $in{'page'};
}
%text    = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
$title   = &get_html_framed_title();

# Detecting Virtualmin/Cloudmin request
$is_virtualmin = index( $ENV{'REQUEST_URI'}, 'virtualmin' );
$is_cloudmin   = index( $ENV{'REQUEST_URI'}, 'cloudmin' );

# Redirect user away, in case requested mode can not be satisfied
if (   ( $is_virtualmin != -1 && !&foreign_available("virtual-server") )
    || ( $is_cloudmin != -1 && !&foreign_available("server-manager") ) )
{
    print "Set-Cookie: redirect=0; path=/\r\n";
    $webmin
        = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
        . $ENV{'HTTP_HOST'} . '/';
    print "Location: $webmin\n\n";
}

# In case Virtualmin is installed, after logging in, redirect to Virtualmin
if (   $ENV{'HTTP_COOKIE'} =~ /redirect=1/
    && &foreign_available("virtual-server")
    && &get_product_name() eq "webmin"
    && $is_virtualmin == -1 )
{
    print "Set-Cookie: redirect=0; path=/\r\n";
    $virtualmin
        = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
        . $ENV{'HTTP_HOST'}
        . '/?virtualmin';
    print "Location: $virtualmin\n\n";
}

# Clearing possibly stuck update states
if (   index( $ENV{'REQUEST_URI'}, 'updating' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'updating-processing' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollect' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollect-system-status' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollecting' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollecting-system-status' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollecting-package-updates' ) != -1
    || index( $ENV{'REQUEST_URI'}, 'recollecting-package-updates-processing' )
    != -1 )
{
    if ( $is_virtualmin != -1 ) {
        $virtualmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'}
            . '/?virtualmin';
        print "Location: $virtualmin\n\n";
    }
    elsif ( $is_cloudmin != -1 ) {
        $cloudmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'}
            . '/?cloudmin';
        print "Location: $cloudmin\n\n";
    }
    else {
        $webmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'} . '/';
        print "Location: $webmin\n\n";
    }
}

&header($title);

print '<div id="wrapper" data-product="'
    . &get_product_name()
    . '" data-virtual-server="'
    . $is_virtualmin
    . '" data-server-manager="'
    . $is_cloudmin
    . '" class="index">' . "\n";
print '<header>' . "\n";
print '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">'
    . "\n";
print '<div class="navbar-header">' . "\n";
print
    '<button type="button" class="navbar-toggle visible-xs" data-toggle="collapse" data-target="#collapse">'
    . "\n";
print '<span class="sr-only">Toggle navigation</span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '</button>' . "\n";
print '<span class="navbar-brand">';

# Menu parser. Start.
# No abstraction at all. Easy to read - hard to enjoy.
# Front-end user doesn't give a thing - it works the
# same in the end. Beautify whenever time comes.
if (   &foreign_available("virtual-server")
    || &foreign_available("server-manager") )
{
    print '<ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" id="product-menu" role="button" class="dropdown-toggle" data-toggle="dropdown">
              <small>';
    if ( $is_virtualmin == -1 && $is_cloudmin == -1 ) {
        print '<i class="fa fa-cogs"></i>';
    }
    elsif ( $is_virtualmin != -1 ) {
        print '<i class="fa fa-sun-o"></i>';
    }
    elsif ( $is_cloudmin != -1 ) {
        print '<i class="fa fa-cloud"></i>';
    }
    print '</small>&nbsp;&nbsp;';

    if ( $is_virtualmin == -1 && $is_cloudmin == -1 ) {
        print 'Webmin';
    }
    elsif ( $is_virtualmin != -1 ) {
        print 'Virtualmin';
    }
    elsif ( $is_cloudmin != -1 ) {
        print 'Cloudmin';
    }

    print '<span class="caret" style="margin-left:6px;"></span></a>
              <ul class="dropdown-menu" role="button" aria-labelledby="product-menu">';
    if ( $is_virtualmin == -1 && $is_cloudmin == -1 ) {
        if (   &foreign_available("virtual-server")
            && &foreign_available("server-manager") )
        {
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="virtualmin" href="/?virtualmin"><i class="fa fa-sun-o">&nbsp;&nbsp;</i>Virtualmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+V)</span></a></li>';
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="cloudmin" href="/?cloudmin"><i class="fa fa-cloud">&nbsp;&nbsp;</i>Cloudmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+C)</span></a></li>';
        }
        elsif ( &foreign_available("virtual-server") ) {
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="virtualmin" href="/?virtualmin"><i class="fa fa-sun-o">&nbsp;&nbsp;</i>Virtualmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+V)</span></a></li>';
        }
        elsif ( &foreign_available("server-manager") ) {
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="cloudmin" href="/?cloudmin"><i class="fa fa-cloud">&nbsp;&nbsp;</i>Cloudmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+C)</span></a></li>';
        }

    }
    elsif ( $is_virtualmin != -1 ) {
        print
            '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="webmin" href="/"><i class="fa fa-cogs">&nbsp;&nbsp;</i>Webmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+W)</span></a></li>';
        if ( &foreign_available("server-manager") ) {
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="cloudmin" href="/?cloudmin"><i class="fa fa-cloud">&nbsp;&nbsp;</i>Cloudmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+C)</span></a></li>';
        }
    }
    elsif ( $is_cloudmin != -1 ) {
        print
            '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="webmin" href="/"><i class="fa fa-cogs">&nbsp;&nbsp;</i>Webmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+W)</span></a></li>';
        if ( &foreign_available("virtual-server") ) {
            print
                '<li role="presentation"><a role="menuitem" tabindex="-1" data-shortcut="virtualmin" href="/?virtualmin"><i class="fa fa-sun-o">&nbsp;&nbsp;</i>Virtualmin<span class="text-muted small">&nbsp;&nbsp;&nbsp;(Alt+V)</span></a></li>';
        }
    }
    print '</ul>
            </li>
          </ul><span class="hidden-xs">&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="fa fa-desktop"></i></small>&nbsp;&nbsp;<a class="data-refresh" href="/'
        . ( $is_virtualmin != -1 && "?virtualmin" )
        . ( $is_cloudmin != -1   && "?cloudmin" )
        . '" style="color:#777">'
        . &get_display_hostname()
        . '</a></span>';
}

elsif ( &get_product_name() eq 'webmin' ) {
    print '<small><i class="fa fa-cogs">&nbsp;</i></small>&nbsp;'
        . ucfirst( &get_product_name() )
        . '<span class="hidden-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="fa fa-desktop">&nbsp;</i></small></span>&nbsp;&nbsp;<a class="data-refresh hidden-xs" href="/" style="color:#777">'
        . &get_display_hostname() . '</a>';
}
else {
    print '<small><i class="fa fa-user">&nbsp;</i></small>&nbsp;'
        . ucfirst( &get_product_name() )
        . '<span class="hidden-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="fa fa-desktop">&nbsp;</i></small></span>&nbsp;&nbsp;<a class="data-refresh hidden-xs" href="/" style="color:#777">'
        . &get_display_hostname() . '</a>';
}

# Menu parser. End

#Refresh button. Start
print
    '<div class="pull-right" style="margin-top:2px; margin-left:10px;"><a href="'
    . $gconfig{'webprefix'}
    . '/" target="_top" data-refresh="true" data-hover="true"><i class="fa fa-refresh" style="color:#888;"></i>'
    . $minfo{'desc'}
    . '</a></div>';

#Refresh button. End

# Quick access menu. Start.
# Implementing procedural, bulky build of quick access menu.
# It's just quick and first attempt to make
# the things work. Abstraction will be done later.
if (   &foreign_available("change-user")
    || &foreign_available("webmin")

    || ( &foreign_available("language") && &get_product_name() eq "usermin" )
    || ( &foreign_available("theme")    && &get_product_name() eq "usermin" )
    || (   &foreign_available("changepass")
        && &get_product_name() eq "usermin" )
    || ( &foreign_available("mailbox")   && &get_product_name() eq "usermin" )
    || ( &foreign_available("filter")    && &get_product_name() eq "usermin" )
    || ( &foreign_available("procmail")  && &get_product_name() eq "usermin" )
    || ( &foreign_available("fetchmail") && &get_product_name() eq "usermin" )

    || ( &foreign_available("passwd") && $level == 2 )
    || ( &foreign_available("proc")   && $level == 2 )
    || ( &foreign_available("syslog") && $level == 2 )

    || &foreign_available("webminlog")
    || &foreign_available("cron")
    || &foreign_available("shell")
    || &foreign_available("file")
    || &foreign_available("tunnel")
    || &foreign_available("csf")
    || &foreign_available("firewall")
    || &foreign_available("useradmin")
    || &foreign_available("package-updates")
    || &foreign_available("updown")
    || &foreign_available("man")
    )
{

    print
        '<div class="pull-right" style="margin:2px 2px 0 20px;"><div class="dropdown">
          <a href="#" type="button" data-toggle="dropdown" data-hover="true" role="button" aria-expanded="false"><i class="fa fa-bars" style="color:#888"></i><span class="caret" style="margin-left:8px;color:#888"></span></a>
          <ul class="dropdown-menu" role="menu">';

    if ( &foreign_available("change-user") ) {
        my %minfo = &get_module_info( 'change-user', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/change-user" target="page" data-loader="true" style="color:#666; padding-left:8px"><i class="fa fa-language" style="margin-right:11px"></i><i class="fa fa-picture-o" style="left:16px; top:18px; position:absolute; font-size:80%"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("language")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'language', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/language" target="page" data-loader="true" style="color:#666; padding-left:9px"><i class="fa fa-language" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("theme")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'theme', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/theme" target="page" data-loader="true" style="color:#666; padding-left:6px"><i class="fa fa-picture-o" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("changepass")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'changepass', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/changepass" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-key" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("mailbox")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'mailbox', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/mailbox" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-envelope-o" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("fetchmail")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'fetchmail', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/fetchmail" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-cloud-download" style="margin-right:10px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("filter")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'filter', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/filter" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-filter" style="margin-right:14px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("procmail")
        && &get_product_name() eq "usermin" )
    {
        my %minfo = &get_module_info( 'procmail', 0, 1 );

        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/procmail" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-flag" style="margin-right:12px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if (  !&foreign_available("change-user")
        && &foreign_available("webmin") )
    {
        my %minfo = &load_language('webmin');
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/webmin/edit_lang.cgi" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-language" style="margin-right:11px"></i>'
            . $minfo{'lang_ok'} . '</a>
                </li>';

        $minfo{'themes_tabchange'} =~ s/\b(\w)/\U$1/g;
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/webmin/edit_themes.cgi" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-picture-o" style="margin-right:8px"></i>'
            . $minfo{'themes_tabchange'} . '</a>
                </li>';
    }

    if (   &foreign_available("webmin")
        && $is_virtualmin == -1
        && $is_cloudmin == -1 )
    {
        my %minfo = &load_language('webmin');
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/webmin" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-wrench" style="margin-right:10px"></i>'
            . $minfo{'index_title'} . '</a>
                </li>';
    }
    elsif ( $is_virtualmin != -1 ) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
        if ( &virtual_server::master_admin() ) {
            my %minfo = &load_language('virtual-server');
            print '<li>
                   <a href="'
                . $gconfig{'webprefix'}
                . '/config.cgi?virtual-server" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-wrench" style="margin-right:10px"></i>'
                . $minfo{'index_virtualminconfig'} . '</a>
                </li>';
        }
    }
    if ( &foreign_available("virtual-server") ) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
        $level
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;

        if ( &foreign_available("passwd") && $level == 2 ) {
            my %minfo = &load_language('passwd');

            print '<li>
                   <a href="'
                . $gconfig{'webprefix'}
                . '/passwd" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-key" style="margin-right:11px"></i>'
                . $minfo{'passwd_title'} . '</a>
                </li>';
        }
        if ( &foreign_available("proc") && $level == 2 ) {
            my %minfo = &load_language('proc');

            print '<li>
                   <a href="'
                . $gconfig{'webprefix'}
                . '/proc" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-cubes" style="margin-right:8px"></i>'
                . $minfo{'index_title'} . '</a>
                </li>';
        }
        if ( &foreign_available("syslog") && $level == 2 ) {
            my %minfo = &load_language('syslog');

            print '<li>
                   <a href="'
                . $gconfig{'webprefix'}
                . '/syslog" target="page" data-loader="true" style="color:#666; padding-left:7px"><i class="fa fa-files-o" style="margin-right:12px"></i>'
                . $minfo{'index_title'} . '</a>
                </li>';
        }
    }
    if ( &foreign_available("webminlog") ) {
        my %minfo = &get_module_info( 'webminlog', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/webminlog" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-file-text" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }

    if ( &foreign_available("cron") ) {
        my %minfo = &get_module_info( 'cron', 0, 1 );
        print '
                <li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/cron" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-clock-o" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("file") ) {
        my %minfo = &get_module_info( 'file', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/file" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-folder-open-o" style="margin-right:8px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("shell") ) {
        my %minfo = &get_module_info( 'shell', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/shell" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-terminal" style="margin-right:9px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("tunnel") ) {
        my %minfo = &get_module_info( 'tunnel', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/tunnel" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-external-link" style="margin-right:9px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("csf") ) {
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/csf" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-fire" style="margin-right:11px"></i>ConfigServer Security & Firewall</a>
                </li>';
    }
    elsif ( &foreign_available("firewall") ) {
        my %minfo = &get_module_info( 'firewall', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/firewall" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-fire" style="margin-right:11px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("useradmin") ) {
        my %minfo = &get_module_info( 'useradmin', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/useradmin" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-users" style="margin-right:8px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';

    }
    if ( &foreign_available("package-updates") ) {
        my %minfo = &get_module_info( 'package-updates', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/package-updates" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-cube" style="margin-right:9px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }

    if ( &foreign_available("updown") ) {
        my %minfo = &get_module_info( 'updown', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/updown" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-download" style="margin-right:9px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }
    if ( &foreign_available("man") ) {
        my %minfo = &get_module_info( 'man', 0, 1 );
        print '<li>
                   <a href="'
            . $gconfig{'webprefix'}
            . '/man" target="page" data-loader="true" style="color:#666; padding-left:10px"><i class="fa fa-book" style="margin-right:10px"></i>'
            . $minfo{'desc'} . '</a>
                </li>';
    }

    print '</ul>
        </div></div>';
}

# Quick access menu. End.

print '</span>' . "\n";
print '</div>' . "\n";
print '<div class="collapse navbar-collapse" id="collapse">' . "\n";
print '<ul class="nav navbar-nav visible-xs">' . "\n";
print
    '<li><a data-toggle="collapse" data-target="#collapse" target="page" href="'
    . $gconfig{'webprefix'}
    . '/menu.cgi?virtualmin='
    . $is_virtualmin
    . '"><i class="fa fa-tags"></i> '
    . $text{'left_main'}
    . '</a></li>' . "\n";

print '<li><a target="page" data-href="'
    . $gconfig{'webprefix'}
    . '/body.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_module_trigger"><i class="fa fa-info"></i> '
    . $text{'left_home'}
    . '</a></li>' . "\n";
get_sysstat_link();
%gaccess = &get_module_acl( undef, "" );
if (   &get_product_name() eq 'webmin'
    && !$ENV{'ANONYMOUS_USER'}
    && $gconfig{'nofeedbackcc'} != 2
    && $gaccess{'feedback'}
    && $gconfig{'feedback_to'}
    || &get_product_name() eq 'usermin'
    && !$ENV{'ANONYMOUS_USER'}
    && $gconfig{'feedback'} )
{
    print
        '<li><a data-toggle="collapse" data-target="#collapse" target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/feedback_form.cgi" class="navigation_feedback_trigger"><i class="fa fa-envelope"></i> '
        . $text{'left_feedback'}
        . '</a></li>' . "\n";
}
if ( &foreign_available("webmin") ) {
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/webmin/refresh_modules.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_refresh_modules_trigger"><i class="fa fa-refresh"></i> '
        . $text{'left_refresh_modules'}
        . '</a></li>' . "\n";
}
print '</ul>' . "\n";

print '<div class="navbar-right" style="margin-right:0">' . "\n";

$user = $remote_user;
if ( &foreign_available("net") ) {
    $user
        = '<a target="page" href="'
        . $gconfig{'webprefix'}
        . '/acl/edit_user.cgi?user='
        . $user . '">'
        . $user . '</a>';
}

print '<div>';
print '<p class="navbar-text pull-left">'
    . $text{'global_welcome'} . ' '
    . $user . '</p>' . "\n";
&get_miniserv_config( \%miniserv );
if (   $miniserv{'logout'}
    && !$ENV{'SSL_USER'}
    && !$ENV{'LOCAL_USER'}
    && $ENV{'HTTP_USER_AGENT'} !~ /webmin/i )
{

    if ($main::session_id) {
        print '<a href="'
            . $gconfig{'webprefix'}
            . '/session_login.cgi?logout=1" class="btn btn-danger navbar-btn pull-right"><i class="fa fa-sign-out"></i> '
            . $text{'main_logout'} . '</a>' . "\n";
    }
    else {
        print '<a href="'
            . $gconfig{'webprefix'}
            . '/switch_user.cgi" class="btn btn-danger navbar-btn pull-right">'
            . $text{'main_switch'} . '</a>' . "\n";
    }
}
print '</div>';
print '</div>' . "\n";
print '</div>' . "\n";
print '</nav>' . "\n";
print '</header>' . "\n" . "\n";
print '<aside style="z-index:10;" id="sidebar" class="hidden-xs">' . "\n"
    . "\n";
print '<ul class="navigation">' . "\n";
print '<li>' . "\n";
print '<a href="#hide" class="hidden"></a>' . "\n";
print '</li>' . "\n";
@cats = &get_visible_modules_categories();
@modules = map { @{ $_->{'modules'} } } @cats;

if ( $is_virtualmin == -1 && $is_cloudmin == -1 ) {
    if (   $gconfig{"notabs_${base_remote_user}"} == 2
        || $gconfig{"notabs_${base_remote_user}"} == 0 && $gconfig{'notabs'}
        || @modules <= 1 )
    {
        foreach $minfo (@modules) {
            $target = $minfo->{'noframe'} ? "_top" : "right";
            print
                "<a target=$target href=$minfo->{'dir'}/>$minfo->{'desc'}</a><br>\n";
        }
    }
    else {
        foreach $c (@cats) {
            &print_category(
                $c->{'code'},
                $in{ $c->{'code'} } ? 1 : 0,
                $c->{'unused'}
                ? '<span style="color: #888888">' . $c->{'desc'} . '</span>'
                : $c->{'desc'}
            );
            print '<ul class="sub" style="display: none;" id="'
                . $c->{'code'} . '">' . "\n";
            foreach my $minfo ( @{ $c->{'modules'} } ) {
                if ( $minfo->{'dir'} ne 'virtual-server' ) {
                    &print_category_link( "$minfo->{'dir'}/",
                        $minfo->{'desc'} );
                }
            }
            print '</ul>' . "\n";
        }
    }

    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print '<li class="open-hidden">' . "\n";
        print '<a href="#search"><i class="fa fa-search fa-fw"></i></a>'
            . "\n";
        print '</li>' . "\n";
    }
    print '</ul>' . "\n";
    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print
            '<form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
            . "\n";
        print '<div class="form-group">' . "\n";
        print
            '<input type="hidden" class="form-control" name="title" value="'
            . ucfirst( &get_product_name() ) . ' '
            . $text{'global_search'} . '">' . "\n";
        print
            '<input type="text" class="form-control sidebar-search" name="search" placeholder="'
            . $text{'global_search_in'} . ' '
            . ucfirst( &get_product_name() ) . '" onfocus="this.placeholder = \'' . $text{'global_search_in'} . ' ' . ucfirst( &get_product_name() ) . '              (Alt+S)' . '\'" onblur="this.placeholder = \'' . $text{'global_search_in'} . ' ' . ucfirst( &get_product_name() ) . '\'">' . "\n";
        print '</div>' . "\n";
        print '</form>' . "\n";
    }
    print '<ul class="navigation">' . "\n";
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/body.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
    get_sysstat_link();
    if (   &get_product_name() eq 'webmin'
        && !$ENV{'ANONYMOUS_USER'}
        && $gconfig{'nofeedbackcc'} != 2
        && $gaccess{'feedback'}
        && $gconfig{'feedback_to'}
        || &get_product_name() eq 'usermin'
        && !$ENV{'ANONYMOUS_USER'}
        && $gconfig{'feedback'} )
    {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/feedback_form.cgi" class="navigation_feedback_trigger"><i class="fa fa-fw fa-envelope"></i> <span>'
            . $text{'left_feedback'}
            . '</span></a></li>' . "\n";
    }
    if ( &foreign_available("webmin") ) {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/webmin/refresh_modules.cgi" class="navigation_refresh_modules_trigger"><i class="fa fa-fw fa-refresh"></i> <span>'
            . $text{'left_refresh_modules'}
            . '</span></a></li>' . "\n";
    }

}
elsif ( $is_virtualmin != -1 ) {

    &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    $goto = '/virtual-server/index.cgi';

    $level
        = &virtual_server::master_admin()   ? 0
        : &virtual_server::reseller_admin() ? 1
        :                                     2;

    if ( $level != 2 ) {
        my @buts = &virtual_server::get_all_global_links();
        my @tcats = &unique( map { $_->{'cat'} } @buts );
        foreach my $c (@tcats) {
            my @incat = grep { $_->{'cat'} eq $c } @buts;

            &print_category( $c, \@incat, $incat[0]->{'catname'} );

            print '<ul class="sub" style="display: none;" id="'
                . $c . '">' . "\n";
            foreach my $l (@incat) {

                # Show domain creation link
                if ((      &virtual_server::can_create_master_servers()
                        || &virtual_server::can_create_sub_servers()
                    )
                    && ( $c eq 'add' )
                    && ( !length $print_virtualmin_link )
                    )
                {

                    &print_category_link(
                        "virtual-server/domain_form.cgi",
                        $text{'virtualmin_left_generic'}
                    );
                    $print_virtualmin_link = 1;
                }
                $l->{'url'} =~ s/^\/+//;
                &print_category_link( $l->{'url'}, $l->{'title'} );

            }
            print '</ul>' . "\n";

        }
    }
    elsif ( $level == 2 ) {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/index.cgi" class="navigation_domain_settings_trigger"><i class="fa fa-fw fa-list-alt"></i> <span>'
            . $text{'virtualmin_left_virtualmin'}
            . '</span></a></li>' . "\n";
    }

    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print '<li class="open-hidden">' . "\n";
        print '<a href="#search"><i class="fa fa-search fa-fw"></i></a>'
            . "\n";
        print '</li>' . "\n";
    }
    print '</ul>' . "\n";
    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print
            '<form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
            . "\n";
        print '<div class="form-group">' . "\n";
        print
            '<input type="hidden" class="form-control" name="mod" value="virtual-server">'
            . "\n";
        print
            '<input type="hidden" class="form-control" name="title" value="Virtualmin '
            . $text{'global_search'} . '">' . "\n";
        print
            '<input type="text" class="form-control sidebar-search" name="search"  placeholder="'
            . $text{'global_search_in'} . ' '
            . 'Virtualmin' . '" onfocus="this.placeholder = \'' . $text{'global_search_in'} . ' ' . 'Virtualmin' . '            (Alt+S)' . '\'" onblur="this.placeholder = \'' . $text{'global_search_in'} . ' ' . 'Virtualmin' . '\'">' . "\n";

        print '</div>' . "\n";
        print '</form>' . "\n";
    }
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/body.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
    get_sysstat_link();
    if ( &foreign_available("webmin") ) {
        print '<li><a href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/index.cgi" target="page"><i class="fa fa-fw fa-tasks"></i> <span>'
            . $text{'virtualmin_left_virtualmin'}
            . '</span></a></li>' . "\n";
    }
}

elsif ( $is_cloudmin != -1 ) {

    &foreign_require( "server-manager", "server-manager-lib.pl" );
    $is_master = &server_manager::can_action( undef, "global" );

    $goto = '/server-manager/index.cgi';

    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/body.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";

    print '<li><a data-href="'
        . $gconfig{'webprefix'}
        . '/server-manager/index.cgi" class="navigation_module_trigger" target="page"><i class="fa fa-fw fa-tasks"></i> <span>'
        . 'List Managed Systems'
        . '</span></a></li>' . "\n";

    print '</ul>' . "\n";

}

print '</ul>' . "\n";
print '</aside>' . "\n";
print '<div id="content" class="menu">' . "\n";
print
    '<div class="loader-container" style="background: none repeat scroll 0% 0% #f5f5f5; position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index:5; display: none;">'
    . "\n";
print '<div class="loader" id="loader-insertion-point"></div>' . "\n";
print '</div>' . "\n";
print '<iframe name="page" id="iframe" src="'
    . $gconfig{'webprefix'}
    . $goto . '">' . "\n";
print '</iframe>' . "\n";
print '</div>' . "\n";
print '</div>' . "\n";
&footer();

sub print_category {
    local ( $c, $status, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;

    if ( $c eq 'webmin' || $c eq 'usermin' || $c eq 'settings' ) {
        $icon = 'fa-cog';
    }
    elsif ( $c eq 'system' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'servers' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'other' ) {
        $icon = 'fa-gavel';
    }
    elsif ( $c eq 'net' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'info' ) {
        $icon = 'fa-info';
    }
    elsif ( $c eq 'hardware' ) {
        $icon = 'fa-hdd-o';
    }
    elsif ( $c eq 'cluster' ) {
        $icon = 'fa-power-off';
    }
    elsif ( $c eq 'unused' ) {
        $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'mail' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'login' ) {
        $icon = 'fa-user';
    }
    elsif ( $c eq 'apps' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'email' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'custom' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'ip' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'check' ) {
        $icon = 'fa-user-md';
    }
    elsif ( $c eq 'add' ) {
        $icon = 'fa-plus';
    }
    elsif ( $c eq 'backup' ) {
        $icon = 'fa-save';
    }
    else {
        $icon = 'fa-cog';
    }

    if ($label) {

        # Show link to close or open catgory
        print '<li>' . "\n";
        print '<a href="#'
            . $c
            . '"><i class="fa '
            . $icon
            . ' fa-fw"></i> <span>'
            . $label
            . '</span></a>' . "\n";
        print '</li>' . "\n";
    }
}

sub print_category_link {
    local ( $link, $label ) = @_;
    print '<li>' . "\n";
    print '<a target="page" href="' . $link . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub get_sysstat_link {
    if ( $virtual_server::module_info{'virtualmin'} eq 'pro' && !$access{'noconfig'} ) {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/history.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-area-chart"></i> <span>'
            . $text{'left_statistics'}
            . '</span></a></li>' . "\n";
    }
}
