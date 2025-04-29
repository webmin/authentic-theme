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

# Print the pre-login text banner and exit
if ($gconfig{'loginbanner'}              &&
    get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'}                       &&
    !$in{'failed'}                       &&
    !$in{'timed_out'}) {
	print_banner();
	return;
	}

# Print login_start
print_login_start('session');

# Print pre-login text
print "$text{'session_prefix'}\n";

# Print the form
print &ui_form_start("$webprefix/session_login.cgi", "post", undef,
	'role="form" onsubmit="theme_spinner()"',
	'form-signin session_login clearfix');

# Add Webmin icon and title
print_login_logo();

# Embed custom logo
embed_logo();

# Filter the username returned by the server, if needed
login_username_filter();

# Populate other input data not passed back by the server
login_params_populate();

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
		print ui_tag('strong', $hostname);
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
