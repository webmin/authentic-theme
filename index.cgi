#
# Authentic Theme 9.0.1 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&ReadParse();

init_config();

# Detecting Virtualmin/Cloudmin request
$is_virtualmin = index( $ENV{'REQUEST_URI'}, 'virtualmin' );
$is_cloudmin   = index( $ENV{'REQUEST_URI'}, 'cloudmin' );

#Going to default right page
$minfo = &get_goto_module();
$__goto
    = ( $is_virtualmin != -1 || $is_cloudmin != -1 ) ? '/body.cgi'
    : $minfo ? "$minfo->{'dir'}/"
    :          "/body.cgi";

%text    = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
$title   = &get_html_framed_title();

# Load dependencies
do "authentic-theme/authentic-lib.cgi";

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

parse_virtual_server_access_level();

# Force regular user to be in Virtualmin
if (   $virtual_server_access_level eq '2'
    && $ENV{'REQUEST_URI'} ne '/?virtualmin' )
{
    $virtualmin
        = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
        . $ENV{'HTTP_HOST'}
        . '/?virtualmin';
    print "Location: $virtualmin\n\n";
}

# Provide unobstructive access for AJAX calls
if ( $in{'xhr-navigation'} eq '1' ) {
    print "Content-type: text/html\n\n";
    do "authentic-theme/navigation.cgi";
}
elsif ( $in{'xhr-buttons'} eq '1' ) {
    print "Content-type: text/html\n\n";
    do "authentic-theme/buttons.cgi";
}
elsif ( $in{'xhr-switch'} eq '1' ) {
    print "Content-type: text/html\n\n";
    print $__goto;
}
else {

    &header($title);

    #### Wrapper. Start.
    #
    #
    print '<div id="wrapper" data-product="'
        . &get_product_name()
        . '" data-virtual-server="'
        . $is_virtualmin
        . '" data-server-manager="'
        . $is_cloudmin
        . '" class="index">' . "\n";

    #### Mobile. Start.
        print '<div class="pull-right visible-xs mobile-menu-toggler">';
        print '<button type="button" class="btn btn-lg btn-default">'
        . "\n";
    print '<i class="fa fa-lg fa-fw fa-bars"></i>' . "\n";
    print '</button>' . "\n";
    print '</div>' . "\n";
    #### Mobile. End.

    #### Left side desktop. Start.
    print '<aside style="z-index:10;" id="sidebar" class="hidden-xs">' . "\n"
        . "\n";

    ### Product switcher. Start.
    #
    #
    if (   !&foreign_available("virtual-server")
        && !&foreign_available("server-manager")
        || &get_product_name() eq 'usermin'
        || $virtual_server_access_level eq '2' )
    {
        our $switch_mode  = '3';
        our $product_mode = '1';
    }
    elsif (&foreign_available("virtual-server")
        && &foreign_available("server-manager") )
    {
        our $switch_mode  = '3';
        our $product_mode = '3';
    }
    elsif (
           &foreign_available("virtual-server")
        || &foreign_available("server-manager")
        && (   !&foreign_available("virtual-server")
            || !&foreign_available("server-manager") )
        )
    {
        our $switch_mode  = '2';
        our $product_mode = '2';
    }

    print '<div class="switch-toggle switch-'
        . $switch_mode
        . ' switch-mins">';

    if ( $product_mode eq '1' ) {
        print_switch_empty(1);
        $virtual_server_access_level eq '2'
            ? print_switch_virtualmin()
            : print_switch_webmin();
        print_switch_empty(2);
    }
    if ( $product_mode eq '2' ) {
        print_switch_webmin(1);
        &foreign_available("virtual-server")
            ? print_switch_virtualmin(1)
            : print_switch_cloudmin(1);
    }
    if ( $product_mode eq '3' ) {
        print_switch_webmin(1);
        print_switch_virtualmin(1);
        print_switch_cloudmin(1);
    }

    print '<a></a>
            </div><br><br><br>';

    #
    #
    ### Product switcher. Start.

    ## Navigation Main Container. Start.
    print '<ul class="navigation">' . "\n";
    do "authentic-theme/navigation.cgi";
    print '</ul>' . "\n";
    ## Navigation Main Container. End.

    ### User Buttons. Start.
    print '<br><br><ul class="user-links">';
    do "authentic-theme/buttons.cgi";
    print '</ul>';
    ### User Buttons. End.

    print '</aside>' . "\n";
    #### Left Side. End.
    #Process logo
    if ( -r $config_directory . "/authentic-theme/logo.png" ) {
    # Store logo in config directory, defaults in most case to `/etc/webmin`. Theme config directory is `/etc/webmin/authentic-theme`
        if (  -s $config_directory
            . "/authentic-theme/logo.png" ne -s $root_directory
            . "/authentic-theme/images/logo.png" )
        {
            # Update logo in case it changed
            copy_source_dest(
                $config_directory . "/authentic-theme/logo.png",
                $root_directory . "/authentic-theme/images"
            );
        }
        print '<div class="__logo">';
            print '<img src="'
            . $gconfig{'webprefix'}
            . '/images/logo.png">';
        print '</div>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/images/logo.png"
        && !-r $config_directory . "/authentic-theme/logo.png" )
    {
        # Delete logo
        unlink $root_directory . "/authentic-theme/images/logo.png";
    }

    ### Right Side. Start.
    print '<div id="content" class="__page">' . "\n";
    print '<div class="loader-container">' . "\n";
    print '<div class="loader" id="loader-insertion-point"></div>' . "\n";
    print '</div>' . "\n";
    print
        '<script>new Spinner($__spinner).spin(document.getElementById(\'loader-insertion-point\'));loading_right_start()</script>';
    print '<iframe name="page" id="iframe" src="'
        . $gconfig{'webprefix'}
        . (
        ( !-f $root_directory . '/authentic-theme/update' )
        ? $__goto
        : '/body.cgi'
        ) . '">' . "\n";
    print '</iframe>' . "\n";
    print '</div>' . "\n";
    ### Right Side. End.

    #print '</div>' . "\n"; // Possibly stray tag
    #
    #
    #### Wrapper. End.

    &footer();
}
