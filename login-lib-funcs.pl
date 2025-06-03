# login-lib-funcs.pl
# Login library reusable functions
use strict;
use warnings;
no warnings 'uninitialized';

our (%in, %gconfig, $root_directory, $config_directory, %tconfig, %theme_text);
our ($miniserv, $bg, $webprefix, $textbox_attrs, $hostname);

# get_secure_cookie()
# Returns the secure cookie string
sub get_secure_cookie
{
my $secook = lc(get_env('https')) eq 'on' ? "; secure" : "";
$secook .= "; httpOnly" if (!$miniserv->{'no_httponly'});
return $secook;
}

# get_banner_auth_headers()
# Returns headers for the login banner
sub get_banner_auth_headers
{
my $secook = get_secure_cookie();
my @headers;
push(@headers, ["Set-Cookie", "banner=1; path=/$secook"]);
return \@headers;
}

# print_banner()
# Prints the login banner
sub print_banner
{
&PrintHeader(&get_charset(), undef, get_banner_auth_headers());
print ui_tag_start('html',
	{ 'class' => 'session_login', 'data-bgs' => $bg });
embed_login_head();
print ui_tag_start('body',
	{ 'class' => 'session_login', $tconfig{'inbody'} => undef });
embed_overlay_prebody();
print ui_tag_start('div',
	{ 'class' => 'form-signin-banner container session_login
		      alert alert-danger', 'data-dcontainer' => 1 });
print ui_icon('exclamation-triangle', { 'class' => 'fa-3x' });
print ui_br(), ui_br();
my $banner = &read_file_contents($gconfig{'loginbanner'});
my $page = $gconfig{'loginpage'} || $in{'page'} || $webprefix || '/';
$banner =~ s/LOGINURL/$page/g;
print "$banner\n";
print ui_tag_end('div');
print ui_tag_end('body');
print ui_tag_end('html');
}

# get_login_auth_headers()
# Returns headers for the login page
sub get_login_auth_headers
{
my $sidname = $miniserv->{'sidname'} || "sid";
my $secook = get_secure_cookie();
my @headers;
push(@headers, ["Auth-type", "auth-required=1"]);
push(@headers, ["Set-Cookie", "banner=0; path=/$secook"])
	if ($gconfig{'loginbanner'});
push(@headers, ["Set-Cookie", "$sidname=x; path=/$secook"])
	if ($in{'logout'});
push(@headers, ["Set-Cookie", "redirect=1; path=/$secook"]);
push(@headers, ["Set-Cookie", "testing=1; path=/$secook"]);
return \@headers;
}

# print_login_start($type)
# Prints the start of the login page
sub print_login_start
{
my $type = shift;
my $class = 'session_login';
$class .= ' pam_login' if ($type eq 'pam');

# Print the standard header
&PrintHeader(&get_charset(), undef, get_login_auth_headers());

# Print the HTML header
print ui_tag_start('html', { 'class' => $class, 'data-bgs' => $bg });
embed_login_head();
print ui_tag_start('body', { 'class' => $class, $tconfig{'inbody'} => undef });
embed_overlay_prebody();

# Print the container HTML
print ui_tag_start('div',
	{ 'class' => "container $class", 'data-dcontainer' => 1 }); 

# Print alert if bundled SSL cert is used
if (&miniserv_using_default_cert()) {
	print ui_alert(&text('defcert_error', ucfirst(&get_product_name()), 
		       	($ENV{'MINISERV_KEYFILE'} || $miniserv->{'keyfile'})),
		       'warning', undef,
		       { 'data-defcert' => 1,
		         'class' => 'faa-horizontal animated' });
	}
# Print success on password reset
if ($in{'returned'}) {
	# Password reset successful
	print ui_alert($theme_text{'session_pwdsucc'},
		       'success', ['fa-unlock', $theme_text{'login_success'}],
		       { 'class' => 'faa-bounce animated' });
	}
# Print alert on failed login
elsif ($in{'failed'}) {
	# Two-factor authentication failed
	if ($in{'twofactor_msg'}) {
		print ui_alert(&theme_text('session_twofailed',
			       $in{'twofactor_msg'}), 'warning',
			       undef, { 'data-twofactor' => 1,
			                'class' => 'faa-horizontal animated' });
		}
	# Login failed
	else {
		print ui_alert($theme_text{'theme_xhred_session_failed'},
			       'warning', undef,
			       { 'class' => 'faa-horizontal animated' });
		}
	}
# Print alert on logout
elsif ($in{'logout'}) {
	print ui_alert($theme_text{'session_logout'},
		       'success', ['fa-sign-out', $theme_text{'login_success'}],
		       { 'class' => 'faa-bounce animated' });
	}
# Print alert on session timeout
elsif ($in{'timed_out'}) {
	print ui_alert(&theme_text('session_timed_out',
				   int($in{'timed_out'} / 60)),
		       'warning', ['fa-clock'],
		       { 'class' => 'faa-horizontal animated' });
	}
}

# print_login_end()
# Prints the end of the login page
sub print_login_end
{
print ui_tag_end('div');  # flipper end
print ui_tag_end('div');  # wrapper end
print ui_tag_end('form'); # form end

print ui_tag_end('div');  # main container end 
print ui_tag_end('body');
print ui_tag_end('html');
}

# print_login_fix(type)
# Prints an auxiliary element for the login page before opening the form and
# before closing it. If the type is "href", it will print a properly formatted
# link to the login page.
sub print_login_fix
{
my $type = shift;
if ($type =~ "href") {
	my $link = get_link($type, 'ugly');
	print ui_link_icon($link->[0], $link->[1], "unlock",
		{ class => 'warning', target => "_blank" });
	}
else {
	print "$type\n";
	}
}

# print_login_logo()
# Prints the Webmin logo and title
sub print_login_logo
{
# Default icon and title
my $product_name = &get_product_name();
local $root_directory = $root_directory;
local $config_directory = $config_directory;
# If request came from Usermin, use its branding instead
if ($in{'return'}) {
	$product_name = "usermin";
	$root_directory =~ s|/webmin|/usermin|;
	$config_directory =~ s|/webmin|/usermin|;
	}
my %def_brand = (
	file => "$root_directory/images/brand_$product_name.svg",
	title => $product_name eq "usermin"
		? $theme_text{'theme_xhred_titles_um'}
		: $theme_text{'theme_xhred_titles_wm'} );
my %brand = %def_brand;
# Read brand info from file if it exists
my $brand_info = "$config_directory/brand.info";
if (-f $brand_info) {
	my %mod_brand;
	&read_file($brand_info, \%mod_brand);
	# If enabled, use the brand file
	if ($mod_brand{'enabled'}) {
		%brand = %mod_brand;
		# If brand file defined but doesn't exist use default
		if (defined($brand{'file'}) && !-f $brand{'file'}) {
			%brand = %def_brand;
			}
		}
	}
# Print either logo from file or icon
my $brand_file = $brand{'file'} && -r $brand{'file'} ? $brand{'file'} : undef;
my $title = $brand_file ? undef :
	"&nbsp;". $brand{'title'} // $theme_text{'theme_xhred_titles_wm'};
my $mime;
$mime = &guess_mime_type($brand_file) if ($brand_file);
if ($mime && $mime =~ /^image\//) {
	my $image = &read_file_contents($brand_file);
	$image =~ s/[\r\n\t ]+/ /g;
	print ui_tag('img', undef,
		{ 'src' => "data:$mime;base64,".&encode_base64($image),
		  'alt' => $brand{'title'},
		  'class' => 'img-title' });
	}
else {
	print ui_tag('i', undef, { 'class' => $brand{'icon'} // 'wbm-webmin' });
	}
# Print the product title
print ui_tag('h2', ui_tag('span', $title),
	     { 'class' => 'form-signin-heading' } );
}

# login_username_filter(&in)
# Filters the username returned by the server
sub login_username_filter
{
my ($in) = @_;
my $username = $in->{'failed'};
decode_utf8(\$username);
$username = ($username =~ /^[\p{L}\p{N}\@\_\.\-]+$/) ? $username : undef;
$in->{'failed'} = $username;
}

# login_params_populate(&in)
# Populates the input data not passed back by the server
sub login_params_populate
{
my ($in) = @_;
if ($gconfig{'forgot_pass'} && !$in->{'failed'}) {
	my $request_uri_uu = &un_urlize(get_env('request_uri'));
	($in->{'forgot'}) = $request_uri_uu =~ /[?&]forgot=([A-Fa-f0-9]+)/;
	($in->{'username'}) =
		$request_uri_uu =~ /[?&]username=([\p{L}\p{N}\@\_\.\-]+)/
			if ($in->{'forgot'});
	($in->{'return'}) = $request_uri_uu =~ /[?&]return=([^&]+)/;
	$in->{'returned'} =
		($request_uri_uu =~ /[?&]returned=password-reset-success\b/);
	}
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

# print_password_reset()
# Prints the password reset inputs
sub print_password_reset
{
# Can reset password and failed or forgot
if ($gconfig{'forgot_pass'}) {
	# Back side
	my $extra_attrs = $in{'username'} ? {
		'data-username' => $in{'username'},
		'data-forgot' => $in{'forgot'} } : {};
	print ui_tag_start('div',
		{ 'class' => 'session_login_back forgot', %{$extra_attrs} });
	if($in{'forgot'}) {
		print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
		print ui_tag_content(
			&theme_text('reset_message',
				&html_escape($in{'username'})));
		print ui_tag('strong', &html_escape($hostname));
		print ui_tag_end('p');

		print ui_tag_start('div',
			{ 'class' => 'input-group form-group' });
		print &ui_password("newpass", undef, 20, 0, undef,
			"@{[$textbox_attrs->('off')]} ".
			"data-return='".&quote_escape($in{'return'}, "'")."' ".
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
			"unlock", { class => "warning", 'data-unlocker' => undef });
		print ui_button_icon(
			$theme_text{'theme_xhred_global_cancel'},
			"fa2-back-in-time", { 'data-flipper' => undef });
		print ui_tag_end('div');
		
		print ui_tag_end('div'); # back side end
		}
	else {
		print ui_tag_start('p', { 'class' => 'form-signin-paragraph' });
		print ui_tag_content($theme_text{'lost_message'});
		print ui_tag_end('p');
		
		print ui_tag_start('div',
			{ 'class' => 'input-group form-group' });
		print &ui_textbox("forgot", $in{'failed'}, 20, 0, undef,
			"@{[$textbox_attrs->()]} ".
			"data-return='".&quote_escape($in{'return'}, "'")."' ".
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
			$theme_text{'login_back'}, "undo",
				{ 'data-flipper' => undef });
		print ui_tag_end('div');
		}
	print ui_tag_end('div'); # back side end
	}
}

1;
