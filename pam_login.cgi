#!/usr/local/bin/perl
# pam_login.cgi
# PAM login page

use strict;
no strict 'refs';

our (%in, %gconfig, %tconfig, %text, %theme_text);
our ($miniserv, $webprefix, $bg, $textbox_attrs, $hostname);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");
require("$ENV{'THEME_ROOT'}/login-lib.pl");

# Show pre-login text banner
if ($gconfig{'loginbanner'} &&
    get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'}                       &&
	!$in{'forgot'}                       &&
    !$in{'failed'}                       &&
    !$in{'password'}                     &&
    !$in{'error'}                        &&
    $in{'initial'}) {
	print_banner();
	return;
	}

# Print login_start
print_login_start('pam');

# Print pre-login element
print_login_fix($text{'pam_prefix'});

# Print the form
print &ui_form_start("$webprefix/pam_login.cgi", "post", undef,
	'role="form" onsubmit="theme_spinner()"',
	'form-signin session_login pam_login clearfix');
print ui_hidden("cid", $in{'cid'});

# Add Webmin icon and title
print_login_logo();

# Embed custom logo
embed_logo();

# Filter the username returned by the server, if needed
$in{'failed'} = login_username_filter();

# Print login container wrapper
print_login_container();

# Print welcome message
my $welcome_message = ui_tag('p',
	&text($gconfig{'nohostname'}
		? 'pam_mesg2' : 'pam_mesg', ui_tag('strong', &html_escape($hostname))),
	{ 'class' => 'form-signin-paragraph' });
$welcome_message =~ s/\.\s*(<\/p>)$/$1/; # remove last dot for consistency
print $welcome_message;

# Print the input fields
if (!$in{'password'}) {
	print ui_tag_start('div', { 'class' => 'input-group form-group' });
	print &ui_textbox("answer", undef, 20, 0, undef,
		"@{[$textbox_attrs->()]} ".
		"placeholder='$theme_text{'theme_xhred_login_user'}' autofocus",
		'session_login pam_login', 1);
	print ui_tag_start('span', { 'class' => 'input-group-addon' });
	print ui_icon('user');
	print ui_tag_end('span');
	print ui_tag_end('div');
	}
else {
	print ui_tag_start('div', { 'class' => 'input-group form-group' });
	my $boxfunc = 'ui_password';
	my $boxtext = $theme_text{'theme_xhred_login_pass'};
	my $boxicon = 'fa2-key';
	if ($in{'question'} =~ /code/i) {
		$boxfunc = 'ui_textbox';
		$boxtext = $theme_text{'theme_xhred_login_passphrase'};
		$boxicon = 'qrcode';
		}
	print &{$boxfunc}("answer", undef, 20, 0, undef,
		"@{[$textbox_attrs->()]} ".
		"placeholder='$boxtext' autofocus",
		'session_login pam_login', 1);
	print ui_tag_start('span', { 'class' => 'input-group-addon' });
	print ui_icon($boxicon);
	print ui_tag_end('span');
	print ui_tag_end('div');
	}

# Print submit button
print ui_tag_start('div', { 'class' => 'form-group form-signin-group' });
my $submit_button_text = $in{'password'}
	? $text{'pam_login'} 
	: $theme_text{'login_signin'};
print ui_button_icon($submit_button_text, "sign-in",
	{ class => "primary", 'type' => 'submit', 'data-submit' => 'login' });
if ($in{'failed'} && $gconfig{'forgot_pass'}) {
	print ui_button_icon($theme_text{'session_forgot'}, "unlock",
			     {class => "grey", 'data-flipper'});
	}

# Print post-login element
print_login_fix($text{'pam_postfix'});

print ui_tag_end('div');

print ui_tag_end('div'); # front side end

# Print password reset inputs
print_password_reset();

# Print login end
print_login_end();
