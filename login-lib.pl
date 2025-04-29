#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

require("$ENV{'THEME_ROOT'}/login-lib-funcs.pl");

our (%gconfig, $config_directory, $pragma_no_cache, $current_theme);
our ($miniserv, $charset, $webprefix, $bg, $textbox_attrs, $secook, $hostname);

# Use config from miniserv
$miniserv = \%miniserv::config;

# Load the theme library
load_theme_library();

# Set basic variables
$charset = &get_charset();
$webprefix = &get_webprefix();
$bg = theme_night_mode_login() ? "nightRider" : "gainsboro";
$textbox_attrs = sub {
	my $complete = shift;
	$complete ||= $gconfig{'noremember'} ? "off" : "username";
	return "autocomplete=$complete autocorrect=off autocapitalize=none";
	};

# Secure cookie
$secook = lc(get_env('https')) eq 'on' ? "; secure" : "";
$secook .= "; httpOnly" if (!$miniserv->{'no_httponly'});

# Check to add error handler
error_40x_handler();

# Collect theme configs
my %theme_config = (
    settings("$config_directory/$current_theme/settings.js",    'settings_'),
    settings("$config_directory/$current_theme/settings-admin", 'settings_'),
    settings("$config_directory/$current_theme/settings-root",  'settings_'));

# Get hostname
if ($theme_config{'settings_login_page_server_name'}) {
    $hostname = $theme_config{'settings_login_page_server_name'};
    }
elsif ($gconfig{'realname'}) {
    $hostname = &get_display_hostname();
    }
else {
    $hostname = get_env('server_name');
    $hostname =~ s/:\d+//g;
    $hostname = &html_escape($hostname);
    }

# Never cache
$pragma_no_cache = 1;

1;