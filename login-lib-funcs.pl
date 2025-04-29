#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

our (%gconfig, %tconfig, %in);
our ($miniserv, $bg, $webprefix, $secook);

# print_banner_auth_headers()
# Prints the headers for the login banner
sub print_banner_auth_headers
{
print ui_http_header("Set-Cookie", "banner=1; path=/$secook");
}

# print_banner()
# Prints the login banner
sub print_banner
{
print ui_tag_start('html',
	{ 'class' => 'session_login', 'data-bgs' => $bg });
embed_login_head();
print ui_tag_start('body',
	{ 'class' => 'session_login', $tconfig{'inbody'} });
embed_overlay_prebody();
print ui_tag_start('div',
	{ 'class' => 'form-signin-banner container session_login
		      alert alert-danger', 'data-dcontainer' => 1 });
print ui_icon('exclamation-triangle', { 'class' => 'fa-3x' });
print ui_tag("br"), ui_tag("br");
my $banner = &read_file_contents($gconfig{'loginbanner'});
my $page = $gconfig{'loginpage'} || $in{'page'} || $webprefix || '/';
$banner =~ s/LOGINURL/$page/g;
print "$banner\n";
print ui_tag_end('div');
print ui_tag_end('body');
print ui_tag_end('html');
}

# print_login_auth_headers()
# Prints the headers for the login page
sub print_login_auth_headers
{
my $sidname = $miniserv->{'sidname'} || "sid";
print ui_http_header("Auth-type", "auth-required=1");
print ui_http_header("Set-Cookie", "banner=0; path=/$secook")
    if ($gconfig{'loginbanner'});
print ui_http_header("Set-Cookie", "$sidname=x; path=/$secook")
    if ($in{'logout'});
print ui_http_header("Set-Cookie", "redirect=1; path=/$secook");
print ui_http_header("Set-Cookie", "testing=1; path=/$secook");
}

1;