#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %miniserv, %gconfig, %tconfig, %text,
     $config_directory, $current_theme, %theme_text);

require("$ENV{'THEME_ROOT'}/authentic-lib.pl");

# Use config from miniserv
my $miniserv = \%miniserv::config;

# Load the theme library
load_theme_library();

# Set basic variables
my $charset = &get_charset();
my $webprefix = &get_webprefix();
my $bg = theme_night_mode_login() ? "nightRider" : "gainsboro";

# Secure cookie
my $secook = lc(get_env('https')) eq 'on' ? "; secure" : "";
$secook .= "; httpOnly" if (!$miniserv->{'no_httponly'});

# Check to add error handler
error_40x_handler();

our %theme_config = (
    settings($config_directory . "/$current_theme/settings.js",    'settings_'),
    settings($config_directory . "/$current_theme/settings-admin", 'settings_'),
    settings($config_directory . "/$current_theme/settings-root",  'settings_'));

# Show pre-login text banner
if ($gconfig{'loginbanner'} && get_env('http_cookie') !~ /banner=1/ &&
#     !$in{'logout'} && !$in{'failed'} && !$in{'timed_out'} || 1==1) {
    !$in{'logout'} && !$in{'failed'} && !$in{'timed_out'}) {
	print ui_http_header("Set-Cookie", "banner=1; path=/$secook")
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
	print ui_tag_content(
		['<i class="fa fa-3x fa-exclamation-triangle"></i>']);
	print ui_tag("br"), ui_tag("br");
	# Print the banner
	if (open(my $banner_fh, '<', $gconfig{'loginbanner'})) {
		while (my $line = <$banner_fh>) {
			$line =~ s/LOGINURL/$in{'page'}/g;
			print $line;
			}
		close($banner_fh);
		}
	# print "XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX XXXXXXXXXXXX ";
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
	"role=\"form\" onsubmit=\"theme_spinner()\"",
	"form-signin session_login clearfix");



print "<i class=\"wbm-webmin\"></i><h2 class=\"form-signin-heading\"><span> "
	.
	( &get_product_name() eq "webmin" ? $theme_text{'theme_xhred_titles_wm'} :
			$theme_text{'theme_xhred_titles_um'}
	) .
	"</span></h2>" . "\n";

# Process logo
embed_logo();

# Login message
my $host;
if ($theme_config{'settings_login_page_server_name'}) {
		$host = $theme_config{'settings_login_page_server_name'};
} elsif ($gconfig{'realname'}) {
		$host = &get_display_hostname();
} else {
		$host = get_env('server_name');
		$host =~ s/:\d+//g;
		$host = &html_escape($host);
}

# Print inputs
my $attr_ac = $gconfig{'noremember'} ? "off" : "username";
eval {
		require utf8;
		utf8::decode($in{'failed'});
};
if ($in{'failed'} !~ /^[\p{L}\p{N}_.-]+$/) {
		$in{'failed'} = "";
}
if ($gconfig{'forgot_pass'} && !$in{'failed'}) {
		($in{'forgot'}) = get_env('request_uri') =~ /[?&]forgot=([A-Fa-f0-9]+)/;
}
if ($in{'forgot'}) {
		($in{'username'}) = get_env('request_uri') =~ /[?&]username=([\p{L}\p{N}_.-]+)/;
}

print '<div class="session_login_wrapper">';
print "<div class=\"session_login_flipper@{[$in{'forgot'} ? ' flipped forgot no-transition' : '']}\">";

# Front side
print '<div class="session_login_front">';
print '<p class="form-signin-paragraph">';
print &theme_text('login_message') . "<strong> $host</strong></p>";

print '<div class="input-group form-group">';
print &ui_textbox("user", $in{'failed'}, 20, 0, undef,
	"autocomplete='$attr_ac' autocorrect='off' autocapitalize='none' ".
	"placeholder='$theme_text{'theme_xhred_login_user'}'" .
		(!$in{"failed"} ? ' autofocus' : ''), 'session_login', 1);
print '<span class="input-group-addon">';
print '<i class="fa fa-fw fa-user"></i></span>';
print '</div>';

print '<div class="input-group form-group">';
print &ui_password("pass", undef, 20, 0, undef,
	"autocomplete='off' autocorrect='off' autocapitalize='none' ".
	"placeholder='$theme_text{'theme_xhred_login_pass'}' ".
		($in{"failed"} ? ' autofocus' : '')."", 
	'session_login', 1);
print '<span class="input-group-addon">';
print '<i class="fa fa-fw fa2 fa2-key"></i></span>';
print '</div>';

if (!$gconfig{'noremember'}) {
		print '<div class="input-group form-group form-group-remember">
		<div class="wh-100p flex-wrapper flex-centered flex-start">
					<span class="awcheckbox awobject solid primary"><input class="iawobject" name="save" value="1" id="save" type="checkbox"> <label class="lawobject" for="save"><span>'
			. $theme_text{'login_save'} . '</span></label></span>
		</div></div>' . "\n";
}
print '<div class="form-group form-signin-group">';
print '<button data-submit="login" class="btn btn-primary" type="submit">';
print '<i class="fa fa-sign-in"></i>&nbsp;&nbsp;' .
	&theme_text('login_signin') . '</button>' . "\n";

if ($in{'failed'} && $gconfig{'forgot_pass'}) {
	# Show forgotten password link
	print "<button data-flipper type='button' class=\"btn btn-grey\">".
				"<i class=\"fa fa-unlock\"></i>".
				"&nbsp;&nbsp;$text{'session_forgot'}</button>";
}

if ($text{'session_postfix'} =~ "href") {
		my $link = get_link($text{'session_postfix'}, 'ugly');
		print '<a target="_blank" href=' .
			$link->[0] . ' class="btn btn-warning"><i class="fa fa-unlock"></i>&nbsp;&nbsp;' . $link->[1] . '</a>' . "\n";
}

print '</div>'; # form sign-in group
print '</div>'; # front side end

# Do we have 2fa
if ($miniserv->{'twofactor_provider'}) {
	print '<div class="session_login_back twofactor">';
	print '<p class="form-signin-paragraph">';
	print "$theme_text{'theme_xhred_login_message_2fa'}</p>\n";

	print '<div class="input-group form-group">';
	print &ui_textbox("twofactor", undef, 20, 0, undef,
		"autocomplete='one-time-code' autocorrect='off' autocapitalize='none' ".
		"placeholder='$theme_text{'theme_xhred_login_token'}'",
		'session_login', 1);
	print '<span class="input-group-addon">';
	print '<i class="fa fa-fw fa-qrcode"></i></span>';
	print '</div>'; # 2fa input
	print '<div class="form-group form-signin-group">';
	print '<button data-submit="2fa" data-redirect="'.&get_webmin_email_url().'" class="btn btn-info" type="submit">';
	print '<i class="fa fa-qrcode"></i>&nbsp;&nbsp;' .
		&theme_text('theme_xhred_global_verify') . '</button>' . "\n";
	print '<a class="btn btn-default" href="' . $webprefix .
		'/"><i class="fa fa-times-circle-o"></i>&nbsp;&nbsp;' . &theme_text('theme_xhred_global_cancel') . '</a>' . "\n";
	print '</div>'; # form sign-in group
	print '</div>'; # back side end
}

# Can reset password
if ($gconfig{'forgot_pass'} && ($in{'failed'} || $in{'forgot'})) {
	# Back side
	print '<div class="session_login_back forgot"' . ($in{'username'}
		? " data-username=\"$in{'username'}\" data-forgot=\"$in{'forgot'}\"" : "").'>';
	if($in{'forgot'}) {
		print '<p class="form-signin-paragraph">';
		print &theme_text('reset_message', $in{'username'}).
			" <strong>$host</strong></p>";

		print '<div class="input-group form-group">';
		print &ui_password("newpass", undef, 20, 0, undef,
			"autocomplete='off' autocorrect='off' autocapitalize='none' ".
			"placeholder='$theme_text{'session_resetpass1'}' autofocus",
			'session_login', 1);
		print '<span class="input-group-addon">';
		print '<i class="fa-fw fa2 fa2-account-key"></i></span>';
		print '</div>';

		print '<div class="input-group form-group">';
		print &ui_password("newpass2", undef, 20, 0, undef,
			"autocomplete='off' autocorrect='off' autocapitalize='none' ".
			"placeholder='$theme_text{'session_resetpass2'}'", 'session_login', 1);
		print '<span class="input-group-addon">';
		print '<i class="fa fa-fw fa-key-plus"></i></span>';
		print '</div>';

		print '<div class="form-group form-signin-group">';
		print '<button class="btn btn-warning" type="button" data-unlocker>';
		print '<i class="fa fa-unlock"></i>&nbsp;&nbsp;' .
			&theme_text('theme_left_mail_change_password') . '</button>' . "\n";
		print "<button data-flipper type='button' class=\"btn btn-default\">".
							"<i class=\"fa2 fa2-back-in-time\"></i>".
							"&nbsp;&nbsp;$theme_text{'theme_xhred_global_cancel'}</button>";
		print '</div>'; # form sign-in group
	}
	elsif ($in{'failed'}) {

		print '<p class="form-signin-paragraph">';
		print &theme_text('lost_message')."</p>";
		
		print '<div class="input-group form-group">';
		print &ui_textbox("forgot", $in{'failed'}, 20, 0, undef,
			"autocomplete='$attr_ac' autocorrect='off' autocapitalize='none' ".
			"placeholder='$theme_text{'theme_xhred_login_user'}' autofocus",
			"session_login", 1);
		print '<span class="input-group-addon">';
		print '<i class="fa fa-fw fa-user-o"></i></span>';
		print '</div>';
		
		print '<div class="form-group form-signin-group">';
		print '<button class="btn btn-success" type="submit">';
		print '<i class="fa2 fa2-email"></i>&nbsp;&nbsp;' .
			&theme_text('login_recover') . '</button>' . "\n";
		print "<button data-flipper type='button' class='btn btn-default'>".
					"<i class='fa fa-undo'></i>".
					"&nbsp;&nbsp;$theme_text{'login_back'}</button>";
		print '</div>'; # form sign-in group
	}
	print '</div>'; # back side end
}

print '</div>'; # flipper
print '</div>'; # wrapper


print '</form>' . "\n";

&footer();
