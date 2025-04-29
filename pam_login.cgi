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

# Show pre-login text banner
if ($gconfig{'loginbanner'} &&
    get_env('http_cookie') !~ /banner=1/ &&
    !$in{'logout'}                       &&
    !$in{'failed'}                       &&
    !$in{'password'}                     &&
    !$in{'error'}                        &&
    $in{'initial'}) {
	print_banner();
	return;
	}

# Print login_start
print_login_start('pam');

# Print pre-login text
print "$text{'pam_prefix'}\n";

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
login_username_filter();

# Print login container wrapper
print_login_container();

my $autocompleteuser = $gconfig{'noremember'} ? "autocomplete=off" : "autocomplete=username";
print '<p class="form-signin-paragraph">' .
  text($gconfig{'nohostname'} ? 'pam_mesg2' : 'pam_mesg', "<br><strong>$hostname</strong>") . "\n";
if (!$in{'password'}) {
    print '<div class="input-group form-group">' . "\n";
    print '<input type="text" class="form-control session_login pam_login" name="answer" ' .
      $autocompleteuser . ' autocorrect="off" autocapitalize="none" placeholder="' .
      &theme_text('theme_xhred_login_user') . '" ' . ' autofocus>' . "\n";
    print '<span class="input-group-addon"><i class="fa fa-fw fa-user"></i></span>' . "\n";
    print '</div>' . "\n";
} else {
    print '<div class="input-group form-group">' . "\n";
    print '<input type="' . ($in{'question'} =~ /code/i ? 'text' : 'password') .
      '" class="form-control session_login pam_login" name="answer" autocomplete="off" autocorrect="off" placeholder="' .
      ($in{'question'} =~ /code/i ? theme_text('theme_xhred_login_passphrase') : theme_text('theme_xhred_login_pass')) .
      '" autofocus>' . "\n";
    print '<span class="input-group-addon"><i class="fa fa-fw fa-' .
      ($in{'question'} =~ /code/i ? 'qrcode' : ' fa2 fa2-key') . '"></i></span>' . "\n";
    print '</div>' . "\n";
}

print '<div class="form-group form-signin-group">';
print '<button class="btn btn-primary" type="submit"><i class="fa fa-sign-in"></i>&nbsp;&nbsp;' .
  ($in{'password'} ? &theme_text('pam_login') : &theme_text('login_signin')) . '</button>' . "\n";
if (!$in{'password'}) {
    if ($text{'session_postfix'} =~ "href") {
	my $link = get_link($text{'session_postfix'}, 'ugly');
	print '<a target="_blank" href=' .
	  $link->[0] . ' class="btn btn-warning"><i class="fa fa-unlock"></i>&nbsp;&nbsp;' . $link->[1] . '</a>' . "\n";
    }
}

print '</div>';
print '</form>' . "\n";
print "$text{'pam_postfix'}\n";
&footer();
