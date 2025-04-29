#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

our (%in, %gconfig, %tconfig, %theme_text);
our ($miniserv, $charset, $bg, $webprefix, $secook);

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
print_banner_auth_headers();
&PrintHeader($charset);
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

# print_login_start($type)
# Prints the start of the login page
sub print_login_start
{
my $type = shift;
my $class = 'session_login';
$class .= ' pam_login' if ($type eq 'pam');

# Print the standard header
print_login_auth_headers();
&PrintHeader($charset);

# Print the HTML header
print ui_tag_start('html', { 'class' => $class, 'data-bgs' => $bg });
embed_login_head();
print ui_tag_start('body', { 'class' => $class, $tconfig{'inbody'} });
embed_overlay_prebody();

# Print the container HTML
print ui_tag_start('div',
	{ 'class' => "container $class", 'data-dcontainer' => 1 }); 

# Print alert if bundled SSL cert is used
if (&miniserv_using_default_cert()) {
	print ui_alert(
		[&text('defcert_error', ucfirst(&get_product_name()), 
		       ($ENV{'MINISERV_KEYFILE'} || $miniserv->{'keyfile'}))],
		'warning', undef, { 'data-defcert' => 1 }
		);
	}
# Print alert on failed login
if (defined($in{'failed'})) {
	# Two-factor authentication failed
	if ($in{'twofactor_msg'}) {
		print ui_alert(&theme_text('session_twofailed',
			       $in{'twofactor_msg'}), 'warning',
			       undef, { 'data-twofactor' => 1 });
		}
	# Login failed
	else {
		print ui_alert($theme_text{'theme_xhred_session_failed'},
			       'warning');
		}
	}
# Print alert on logout
elsif ($in{'logout'}) {
	print ui_alert($theme_text{'session_logout'},
		       'success', ['fa-sign-out', $theme_text{'login_success'}]);
	}
# Print alert on session timeout
elsif ($in{'timed_out'}) {
	print ui_alert(&theme_text('session_timed_out',
				   int($in{'timed_out'} / 60)),
		       'warning', ['fa-clock']);
	}
}

# print_login_logo()
# Prints the Webmin logo and title
sub print_login_logo
{
print ui_tag('i', undef, { 'class' => 'wbm-webmin' });
print ui_tag('h2', 
	[ui_tag('span', ' ' .
		(&get_product_name() eq "webmin"
			? $theme_text{'theme_xhred_titles_wm'}
			: $theme_text{'theme_xhred_titles_um'}))],
	{ 'class' => 'form-signin-heading' }
);
}

# login_username_filter()
# Filters the username returned by the server
sub login_username_filter
{
decode_utf8($in{'failed'});
$in{'failed'} = "" if ($in{'failed'} !~ /^[\p{L}\p{N}_.-]+$/);
}

# login_params_populate()
# Populates the input data not passed back by the server
sub login_params_populate
{
($in{'forgot'}) = get_env('request_uri') =~ /[?&]forgot=([A-Fa-f0-9]+)/
	if ($gconfig{'forgot_pass'} && !$in{'failed'});
($in{'username'}) = get_env('request_uri') =~ /[?&]username=([\p{L}\p{N}_.-]+)/
	if ($in{'forgot'});
}

# print_login_container()
# Prints the login container
sub print_login_container
{
# Print login container wrapper
print ui_tag_start('div', { 'class' => 'session_login_wrapper' });
print ui_tag_start('div',
	{ 'class' => "session_login_flipper".
		     ($in{'forgot'} ? ' flipped forgot no-transition' : '') });
# Front side
print ui_tag_start('div', { 'class' => 'session_login_front' });
}

1;
