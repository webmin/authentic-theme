#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

our (%gconfig, %in);
our ($miniserv, $secook);

# print_banner_auth_headers()
# Prints the headers for the login banner
sub print_banner_auth_headers
{
print ui_http_header("Set-Cookie", "banner=1; path=/$secook");
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