#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, %tconfig, %text, %theme_text);
our ($miniserv, $charset, $webprefix, $bg,
     $textbox_attrs, $secook, %theme_config);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$ENV{'THEME_ROOT'}/login-lib.pl");

# Show pre-login text banner
if ($gconfig{'loginbanner'} && get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'} && !$in{'failed'} && !$in{'timed_out'}) {
	print ui_http_header("Set-Cookie", "banner=1; path=/$secook");
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
	# Print the banner
	if (open(my $banner_fh, '<', $gconfig{'loginbanner'})) {
		while (my $line = <$banner_fh>) {
			$line =~ s/LOGINURL/$in{'page'}/g;
			print $line;
			}
		close($banner_fh);
		}
	print ui_tag_end('div');
	print ui_tag_end('body');
	print ui_tag_end('html');
	return;
	}

# Print the header
my $sidname = $miniserv->{'sidname'} || "sid";
print ui_http_header("Auth-type", "auth-required=1");
print ui_http_header("Set-Cookie", "banner=0; path=/$secook")
	if ($gconfig{'loginbanner'});
print ui_http_header("Set-Cookie", "$sidname=x; path=/$secook")
	if ($in{'logout'});
print ui_http_header("Set-Cookie", "redirect=1; path=/$secook");
print ui_http_header("Set-Cookie", "testing=1; path=/$secook");
&PrintHeader($charset);

# Print the HTML header
print ui_tag_start('html', { 'class' => 'session_login', 'data-bgs' => $bg });
embed_login_head();
print ui_tag_start('body', { 'class' => 'session_login', $tconfig{'inbody'} });
embed_overlay_prebody();

# Print the container HTML
print ui_tag_start('div',
	{ 'class' => 'container session_login', 'data-dcontainer' => 1 }); 

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

# Print pre-login text
print "$text{'session_prefix'}\n";

# Print the form
print &ui_form_start("$webprefix/session_login.cgi", "post", undef,
	'role="form" onsubmit="theme_spinner()"',
	"form-signin session_login clearfix");

# Add Webmin icon and title
print ui_tag('i', undef, { 'class' => 'wbm-webmin' });
print ui_tag('h2', 
    [ui_tag('span', ' ' .
        (&get_product_name() eq "webmin" ? 
        	$theme_text{'theme_xhred_titles_wm'} : 
        	$theme_text{'theme_xhred_titles_um'}))],
    { 'class' => 'form-signin-heading' }
);

# Embed custom logo
embed_logo();

# Login message
my $host;
if ($theme_config{'settings_login_page_server_name'}) {
	$host = $theme_config{'settings_login_page_server_name'};
	}
elsif ($gconfig{'realname'}) {
	$host = &get_display_hostname();
	}
else {
	$host = get_env('server_name');
	$host =~ s/:\d+//g;
	$host = &html_escape($host);
	}

# Decode the UTF-8 username returned by the server, if needed
decode_utf8($in{'failed'});
$in{'failed'} = "" if ($in{'failed'} !~ /^[\p{L}\p{N}_.-]+$/);

# Parse other input data not passed back by the server
($in{'forgot'}) = get_env('request_uri') =~ /[?&]forgot=([A-Fa-f0-9]+)/
	if ($gconfig{'forgot_pass'} && !$in{'failed'});
($in{'username'}) = get_env('request_uri') =~ /[?&]username=([\p{L}\p{N}_.-]+)/
	if ($in{'forgot'});

# Print login container wrapper
print ui_tag_start('div', { 'class' => 'session_login_wrapper' });
print ui_tag_start('div',
	{ 'class' => "session_login_flipper".
		     ($in{'forgot'} ? ' flipped forgot no-transition' : '') });

# Front side
print ui_tag_start('div', { 'class' => 'session_login_front' });

print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
print ui_tag_content($theme_text{'login_message'});
print ui_tag('strong', $host);
print ui_tag_end('p');

print ui_tag_start('div', { 'class' => 'input-group form-group' });
print &ui_textbox("user", $in{'failed'}, 20, 0, undef,
	"@{[$textbox_attrs->()]} ".
	"placeholder='$theme_text{'theme_xhred_login_user'}'" .
		(!$in{"failed"} ? ' autofocus' : ''), 'session_login', 1);
print ui_tag_start('span', { 'class' => 'input-group-addon' });
print ui_icon('user');
print ui_tag_end('span');
print ui_tag_end('div');

print ui_tag_start('div', { 'class' => 'input-group form-group' });
print &ui_password("pass", undef, 20, 0, undef,
	"@{[$textbox_attrs->('off')]} ".
	"placeholder='$theme_text{'theme_xhred_login_pass'}' ".
		($in{"failed"} ? ' autofocus' : '')."", 
	'session_login', 1);
print ui_tag_start('span', { 'class' => 'input-group-addon' });
print ui_icon('fa2-key');
print ui_tag_end('span');
print ui_tag_end('div');

if (!$gconfig{'noremember'}) {
	print ui_tag_start('div',
		{ 'class' => 'input-group form-group form-group-remember' });
	print ui_tag_start('div',
		{ 'class' => 'wh-100p flex-wrapper flex-centered flex-start' });
	print &ui_checkbox("save", 1, $theme_text{'login_save'}, 0,
			   undef, undef, ' solid primary');
	print ui_tag_end('div'), ui_tag_end('div');
	}

print ui_tag_start('div', { 'class' => 'form-group form-signin-group' });
print ui_button_icon($theme_text{'login_signin'}, "sign-in",
	{ class => "primary", 'type' => 'submit', 'data-submit' => 'login' });
if ($in{'failed'} && $gconfig{'forgot_pass'}) {
	print ui_button_icon($theme_text{'session_forgot'}, "unlock",
			     {class => "grey", 'data-flipper'});
	}
if ($text{'session_postfix'} =~ "href") {
	my $link = get_link($text{'session_postfix'}, 'ugly');
	print ui_link_icon($link->[0], $link->[1], "unlock",
		{ class => 'warning', target => "_blank" });
	}
else {
	print $text{'session_postfix'};
	}
print ui_tag_end('div');

print ui_tag_end('div'); # front side end

# 2FA
if ($miniserv->{'twofactor_provider'}) {
	print ui_tag_start('div', { 'class' => 'session_login_back twofactor' });

	print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
	print ui_tag_content($theme_text{'theme_xhred_login_message_2fa'});
	print ui_tag_end('p');
	print ui_tag_start('div', { 'class' => 'input-group form-group' });
	print &ui_textbox("twofactor", undef, 20, 0, undef,
		"@{[$textbox_attrs->('one-time-code')]} ".
		"placeholder='$theme_text{'theme_xhred_login_token'}'",
		'session_login', 1);
	print ui_tag_start('span', { 'class' => 'input-group-addon' });
	print ui_icon('qrcode');
	print ui_tag_end('span');
	print ui_tag_end('div');

	print ui_tag_start('div', { 'class' => 'form-group form-signin-group' });
	print ui_button_icon($theme_text{'theme_xhred_global_verify'}, "qrcode",
		{ class => "info", 'type' => 'submit', 'data-submit' => '2fa',
		 'data-redirect' => &get_webmin_email_url() });
	print ui_link_icon("$webprefix/", 
		$theme_text{'theme_xhred_global_cancel'}, "times-circle-o",
		{ class => 'warning' });
	print ui_tag_end('div');
	
	print ui_tag_end('div'); # back side end
	}

# Can reset password
if ($gconfig{'forgot_pass'} && ($in{'failed'} || $in{'forgot'})) {
	# Back side
	my $extra_attrs = $in{'username'} ? {
		'data-username' => $in{'username'},
		'data-forgot' => $in{'forgot'} } : {};
	print ui_tag_start('div',
		{ 'class' => 'session_login_back forgot', %{$extra_attrs} });
	if($in{'forgot'}) {
		print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
		print ui_tag_content(
			&theme_text('reset_message', $in{'username'}));
		print ui_tag('strong', $host);
		print ui_tag_end('p');

		print ui_tag_start('div',
			{ 'class' => 'input-group form-group' });
		print &ui_password("newpass", undef, 20, 0, undef,
			"@{[$textbox_attrs->('off')]} ".
			"placeholder='$theme_text{'session_resetpass1'}'",
			'session_login', 1);
		print ui_tag_start('span', { 'class' => 'input-group-addon' });
		print ui_icon('fa2-account-key');
		print ui_tag_end('span');
		print ui_tag_end('div');
		
		print ui_tag_start('div',
			{ 'class' => 'input-group form-group' });
		print &ui_password("newpass2", undef, 20, 0, undef,
			"@{[$textbox_attrs->('off')]} ".
			"placeholder='$theme_text{'session_resetpass2'}'",
			'session_login', 1);
		print ui_tag_start('span', { 'class' => 'input-group-addon' });
		print ui_icon('key-plus');
		print ui_tag_end('span');
		print ui_tag_end('div');

		print ui_tag_start('div',
			{ 'class' => 'form-group form-signin-group' });
		print ui_button_icon(
			$theme_text{'theme_left_mail_change_password'},
			"unlock", { class => "warning", 'data-unlocker' });
		print ui_button_icon(
			$theme_text{'theme_xhred_global_cancel'},
			"fa2-back-in-time", { 'data-flipper' });
		print ui_tag_end('div');
		
		print ui_tag_end('div'); # back side end
		}
	elsif ($in{'failed'}) {

		print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
		print ui_tag_content($theme_text{'lost_message'});
		print ui_tag_end('p');
		
		print ui_tag_start('div',
			{ 'class' => 'input-group form-group' });
		print &ui_textbox("forgot", $in{'failed'}, 20, 0, undef,
			"@{[$textbox_attrs->()]} ".
			"placeholder='$theme_text{'theme_xhred_login_user'}'",
			"session_login", 1);
		print ui_tag_start('span', { 'class' => 'input-group-addon' });
		print ui_icon('user-o');
		print ui_tag_end('span');
		print ui_tag_end('div');

		print ui_tag_start('div',
			{ 'class' => 'form-group form-signin-group' });
		print ui_button_icon(
			$theme_text{'login_recover'}, "fa2-email",
			{ class => "success", type => 'submit' });
		print ui_button_icon(
			$theme_text{'login_back'}, "undo", { 'data-flipper' });
		print ui_tag_end('div');
		}
	print ui_tag_end('div'); # back side end
	}

print ui_tag_end('div');  # flipper end
print ui_tag_end('div');  # wrapper end
print ui_tag_end('form'); # form end

print ui_tag_end('div');  # main container end 
print ui_tag_end('body');
print ui_tag_end('html');
