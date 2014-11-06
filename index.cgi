#
# Authentic Theme 6.1.0 (https://github.com/qooob/authentic-theme)
# Copyright 2014 Ilia Rostovtsev <programming@rostovtsev.ru>
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
    :               "body.cgi";

if ($minfo) {
    $cat = "?$minfo->{'category'}=1";
}
if ( $in{'page'} ) {
    $goto .= "/" . $in{'page'};
}
%text          = &load_language($current_theme);
%gaccess       = &get_module_acl( undef, "" );
$title         = &get_html_framed_title();
$is_virtualmin = index( $ENV{'REQUEST_URI'}, 'virtualmin' );

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

&header($title);
print '<div id="wrapper" data-product="'
    . &get_product_name()
    . '" data-virtual-server="'
    . $is_virtualmin
    . '" class="index">' . "\n";
print '<header>' . "\n";
print '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">'
    . "\n";
print '<div class="navbar-header">' . "\n";
print
    '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse">'
    . "\n";
print '<span class="sr-only">Toggle navigation</span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '<span class="icon-bar"></span>' . "\n";
print '</button>' . "\n";
print '<span class="navbar-brand">';

if ( &foreign_available("virtual-server") ) {
    print '<ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" id="product-menu" role="button" class="dropdown-toggle" data-toggle="dropdown">
              <small>';
    if ( $is_virtualmin == -1 ) {
        print '<i class="fa fa-cogs"></i>';
    }
    else {
        print '<i class="fa fa-sun-o"></i>';
    }
    print '</small>&nbsp;&nbsp;';
    if ( $is_virtualmin == -1 ) {
        print 'Webmin';
    }
    else {
        print 'Virtualmin';
    }
    print '<span class="caret"></span></a>
              <ul class="dropdown-menu" role="button" aria-labelledby="product-menu">';
    if ( $is_virtualmin == -1 ) {
        print
            '<li role="presentation"><a role="menuitem" tabindex="-1" href="/?virtualmin"><i class="fa fa-sun-o">&nbsp;</i>Virtualmin</a></li>';
    }
    else {
        print
            '<li role="presentation"><a role="menuitem" tabindex="-1" href="/"><i class="fa fa-cogs">&nbsp;</i>Webmin</a></li>';
    }
    print '</ul>
            </li>
          </ul><span class="hidden-xs">&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="fa fa-desktop"></i></small>&nbsp;&nbsp;'
        . &get_display_hostname() . '</span>';
}
elsif ( &get_product_name() eq 'webmin' ) {
    print '<small><i class="fa fa-cogs">&nbsp;</i></small>&nbsp;'
        . ucfirst( &get_product_name() )
        . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hidden-xs"><small><i class="fa fa-desktop">&nbsp;</i></small></span>&nbsp;&nbsp;'
        . &get_display_hostname();
}
else {
    print '<small><i class="fa fa-user">&nbsp;</i></small>&nbsp;'
        . ucfirst( &get_product_name() )
        . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hidden-xs"><small><i class="fa fa-desktop">&nbsp;</i></small></span>&nbsp;&nbsp;'
        . &get_display_hostname();
}

print '</span>' . "\n";
print '</div>' . "\n";
print '<div class="collapse navbar-collapse" id="collapse">' . "\n";
print '<ul class="nav navbar-nav visible-xs">' . "\n";
print
    '<li><a data-toggle="collapse" data-target="#collapse" target="page" href="menu.cgi?virtualmin='
    . $is_virtualmin
    . '"><i class="fa fa-tags"></i> '
    . $text{'left_main'}
    . '</a></li>' . "\n";

print
    '<li><a target="page" data-href="body.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_sysinfo_modules_trigger"><i class="fa fa-info"></i> '
    . $text{'left_home'}
    . '</a></li>' . "\n";
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
        '<li><a data-toggle="collapse" data-target="#collapse" target="page" data-href="feedback_form.cgi" class="navigation_feedback_trigger"><i class="fa fa-envelope"></i> '
        . $text{'left_feedback'}
        . '</a></li>' . "\n";
}
if ( &foreign_available("webmin") ) {
    print
        '<li><a target="page" data-href="webmin/refresh_modules.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_refresh_modules_trigger"><i class="fa fa-refresh"></i> '
        . $text{'left_refresh_modules'}
        . '</a></li>' . "\n";
}
print '</ul>' . "\n";

print '<div class="navbar-right">' . "\n";
$user = $remote_user;
if ( &foreign_available("net") ) {
    $user
        = '<a data-toggle="collapse" data-target="#collapse" target="page" href="acl/edit_user.cgi?user='
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
        print
            '<a href="session_login.cgi?logout=1" class="btn btn-danger navbar-btn pull-right"><i class="fa fa-sign-out"></i> '
            . $text{'main_logout'} . '</a>' . "\n";
    }
    else {
        print
            '<a href="switch_user.cgi" class="btn btn-danger navbar-btn pull-right">'
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

if ( $is_virtualmin == -1 ) {
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
                &print_category_link( "$minfo->{'dir'}/", $minfo->{'desc'} );
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
            '<input type="text" class="form-control" name="search" placeholder="'
            . $text{'global_search_in'} . ' '
            . ucfirst( &get_product_name() ) . '">' . "\n";
        print '</div>' . "\n";
        print '</form>' . "\n";
    }
    print '<ul class="navigation">' . "\n";
    print
        '<li><a target="page" data-href="/body.cgi" class="navigation_sysinfo_modules_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
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
            '<li><a target="page" data-href="/feedback_form.cgi" class="navigation_feedback_trigger"><i class="fa fa-fw fa-envelope"></i> <span>'
            . $text{'left_feedback'}
            . '</span></a></li>' . "\n";
    }
    if ( &foreign_available("webmin") ) {
        print
            '<li><a target="page" data-href="/webmin/refresh_modules.cgi" class="navigation_refresh_modules_trigger"><i class="fa fa-fw fa-refresh"></i> <span>'
            . $text{'left_refresh_modules'}
            . '</span></a></li>' . "\n";
    }

}
elsif ( $is_virtualmin != -1 ) {

    &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    $goto = 'virtual-server/index.cgi';

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
        print
            '<li><a target="page" data-href="/virtual-server/index.cgi" class="navigation_domain_settings_trigger"><i class="fa fa-fw fa-list-alt"></i> <span>'
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
            '<input type="text" class="form-control" name="search" placeholder="'
            . $text{'global_search_in'}
            . ' Virtualmin">' . "\n";

        print '</div>' . "\n";
        print '</form>' . "\n";
    }
    print
        '<li><a target="page" data-href="/body.cgi" class="navigation_sysinfo_modules_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";

    if ( &foreign_available("webmin") ) {
        print
            '<li><a href="virtual-server/index.cgi" target="page"><i class="fa fa-fw fa-tasks"></i> <span>'
            . $text{'virtualmin_left_virtualmin'}
            . '</span></a></li>' . "\n";
    }
}

# Reloading theme in case sysinfo was update
if ( index( $ENV{'REQUEST_URI'}, 'updated' ) != -1 || index( $ENV{'REQUEST_URI'}, 'updated&virtualmin' ) != -1) {
    $goto = 'body.cgi';
}

print '</ul>' . "\n";
print '</aside>' . "\n";
print '<div id="content" class="menu">' . "\n";
print
    '<div class="loader-container" style="background: none repeat scroll 0% 0% rgba(255, 255, 255, 0.5); position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index:5; display: none;">'
    . "\n";
print
    '<div class="loader"><i class="fa fa-spin fa-lg fa-3x fa-circle-o-notch"></i></div>'
    . "\n";
print '</div>' . "\n";
print '<iframe name="page" id="iframe" src="' . $goto . '">' . "\n";
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
