#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, %tconfig, %text, %theme_text);
our ($miniserv, $webprefix, $bg, $textbox_attrs, $hostname);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$ENV{'THEME_ROOT'}/login-lib.pl");

# Filter the username returned by the server, if needed
login_username_filter();

# Populate other input data not passed back by the server
login_params_populate();

# Print the pre-login text banner and exit
if ($gconfig{'loginbanner'}              &&
    get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'}                       &&
    !$in{'forgot'}                       &&
    !$in{'failed'}                       &&
    !$in{'timed_out'}) {
	print_banner();
	return;
	}

# Print login_start
print_login_start('session');

# Print pre-login element
print_login_fix($text{'session_prefix'});

# Print the form
print &ui_form_start("$webprefix/session_login.cgi", "post", undef,
	'role="form" onsubmit="theme_spinner()"',
	'form-signin session_login clearfix');

# Add Webmin icon and title
print_login_logo();

# Embed custom logo
embed_logo();

# Print login container wrapper
print_login_container();

# Print welcome message
print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
print ui_tag_content($theme_text{'login_message'});
print ui_tag('strong', $hostname);
print ui_tag_end('p');

# Print the input fields
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

# Print remember me checkbox
if (!$gconfig{'noremember'}) {
	print ui_tag_start('div',
		{ 'class' => 'input-group form-group form-group-remember' });
	print ui_tag_start('div',
		{ 'class' => 'wh-100p flex-wrapper flex-centered flex-start' });
	print &ui_checkbox("save", 1, $theme_text{'login_save'}, 0,
			   undef, undef, ' solid primary');
	print ui_tag_end('div'), ui_tag_end('div');
	}

# Print the submit button
print ui_tag_start('div', { 'class' => 'form-group form-signin-group' });
print ui_button_icon($theme_text{'login_signin'}, "sign-in",
	{ class => "primary", 'type' => 'submit', 'data-submit' => 'login' });
if ($in{'failed'} && $gconfig{'forgot_pass'}) {
	print ui_button_icon($theme_text{'session_forgot'}, "unlock",
			     {class => "grey", 'data-flipper'});
	}

# Print post-login element
print_login_fix($text{'session_postfix'});

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

# Print reset password inputs
print_password_reset();

# Print login end
print_login_end();
