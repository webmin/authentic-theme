#!/usr/bin/perl
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
%text    = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
$title   = &get_html_framed_title();
&header($title);
print '<div id="wrapper" data-product="'
    . &get_product_name()
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
print '<span class="navbar-brand">'
    . ucfirst( &get_product_name() ) . ' - '
    . &get_display_hostname()
    . '</span>' . "\n";
print '</div>' . "\n";
print '<div class="collapse navbar-collapse" id="collapse">' . "\n";
print '<ul class="nav navbar-nav visible-xs">' . "\n";
print
    '<li><a data-toggle="collapse" data-target="#collapse" target="page" href="menu.cgi"><i class="fa fa-tags"></i> Main menu</a></li>'
    . "\n";

print
    '<li><a href="#" target="page" data-href="body.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_sysinfo_modules_trigger"><i class="fa fa-home"></i> System Information</a></li>'
    . "\n";
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
        '<li><a data-toggle="collapse" data-target="#collapse" target="page" href="feedback_form.cgi"><i class="fa fa-envelope"></i> Send Feedback</a></li>'
        . "\n";
}
if ( &foreign_available("webmin") ) {
    print
        '<li><a href="#" target="page" data-href="webmin/refresh_modules.cgi" data-toggle="collapse" data-target="#collapse" class="navigation_refresh_modules_trigger"><i class="fa fa-refresh"></i> Refresh Modules</a></li>'
        . "\n";
}
print '</ul>' . "\n";
if ( &get_product_name() eq "usermin" ) {
    $level = 3;
}
else {
    $level = 0;
}

print '<div class="navbar-right">' . "\n";
$user = $remote_user;
if ( &foreign_available("net") ) {
    $user
        = '<a data-toggle="collapse" data-target="#collapse" target="page" href="acl/edit_user.cgi?user='
        . $user . '">'
        . $user . '</a>';
}
print '<div>';
print '<p class="navbar-text pull-left">Welcome ' . $user . '</p>' . "\n";
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

        # Show category opener, plus modules under it
        # Modified the span
        &print_category_opener(
            $c->{'code'},
            $in{ $c->{'code'} } ? 1 : 0,
            $c->{'unused'}
            ? '<span style="color: #888888">' . $c->{'desc'} . '</span>'
            : $c->{'desc'}
        );
        $cls = $in{ $c->{'code'} } ? "itemshown" : "itemhidden";
        print '<ul class="sub" style="display: none;" id="'
            . $c->{'code'} . '">' . "\n";
        foreach my $minfo ( @{ $c->{'modules'} } ) {
            &print_category_link( "$minfo->{'dir'}/", $minfo->{'desc'}, undef,
                undef, $minfo->{'noframe'} ? "_top" : "",
            );
        }
        print '</ul>' . "\n";
    }
}
if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} ) {
    print '<li class="open-hidden">' . "\n";
    print '<a href="#search"><i class="fa fa-search fa-fw"></i></a>' . "\n";
    print '</li>' . "\n";
}
print '</ul>' . "\n";
if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} ) {
    print
        '<form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
        . "\n";
    print '<div class="form-group">' . "\n";
    print
        '<input type="text" class="form-control" name="search" placeholder="Search in '
        . &get_product_name() . '">' . "\n";
    print '</div>' . "\n";
    print '</form>' . "\n";
}
print '<ul class="navigation">' . "\n";
print
    '<li><a href="#" target="page" data-href="/body.cgi" class="navigation_sysinfo_modules_trigger"><i class="fa fa-fw fa-info"></i> <span>System Information</span></a></li>'
    . "\n";
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
        '<li><a target="page" href="feedback_form.cgi"><i class="fa fa-fw fa-envelope"></i> <span>Send Feedback</span></a></li>'
        . "\n";
}
if ( &foreign_available("webmin") ) {
    print
        '<li><a href="#" target="page" data-href="/webmin/refresh_modules.cgi" class="navigation_refresh_modules_trigger"><i class="fa fa-fw fa-refresh"></i> <span>Refresh Modules</span></a></li>'
        . "\n";
}
print '</ul>' . "\n";
print '</aside>' . "\n";
print '<div id="wrapper" class="menu">' . "\n";
print
    '<div class="loader-container" style="background: none repeat scroll 0% 0% rgba(255, 255, 255, 0.5); position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; z-index:5; display: none;">'
    . "\n";
print '<div class="loader"><i class="fa fa-3x fa-gear fa-spin"></i></div>'
    . "\n";
print '</div>' . "\n";
print '<iframe name="page" src="' . $goto . '">' . "\n";
print '</iframe>' . "\n";
print '</div>' . "\n";
print '</div>' . "\n";
&footer();

# print_category_opener(name, &allcats, label)
# Prints out an open/close twistie for some category
sub print_category_opener {
    local ( $c, $status, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;
    local $img = $status ? "gray-open.gif" : "gray-closed.gif";
    use feature qw(switch);
    given ($c) {
        when ('webmin')   { $icon = 'fa-cog'; }
        when ('usermin')  { $icon = 'fa-cog'; }
        when ('system')   { $icon = 'fa-wrench'; }
        when ('servers')  { $icon = 'fa-rocket'; }
        when ('other')    { $icon = 'fa-file'; }
        when ('net')      { $icon = 'fa-shield'; }
        when ('info')     { $icon = 'fa-info'; }
        when ('hardware') { $icon = 'fa-hdd-o'; }
        when ('cluster')  { $icon = 'fa-power-off'; }
        when ('unused')   { $icon = 'fa-puzzle-piece'; }
        when ('mail')     { $icon = 'fa-envelope'; }
        when ('login')    { $icon = 'fa-user'; }
        when ('apps')     { $icon = 'fa-rocket'; }
        default           { $icon = 'fa-cog'; }
    }

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

sub print_category_link {
    local ( $link, $label, $image, $noimage, $target ) = @_;
    $target ||= "page";
    print '<li>' . "\n";
    print '<a target="'
        . $target
        . '" href="'
        . $link . '"> '
        . $label . '</a>' . "\n";
    print '</li>' . "\n";
}
