#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (
	%in, %gconfig, $root_directory, $remote_user,
	$get_user_level, %theme_config, $theme_info, %theme_text,
	$current_theme, $has_usermin
);

sub xhr_filemin_acl_user_info
{
my ($access, $path, $unix_user) = @_;
my @user_info;
my $switchto;

if (get_product_name() eq 'usermin') {
	$switchto = $remote_user;
	@user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
	}
elsif ($access->{'work_as_root'}) {
	$switchto = 'root';
	@user_info = getpwnam('root');
	}
elsif ($access->{'work_as_dir'}) {
	foreach my $du (split(/\s+/, $access->{'work_as_dir'})) {
		my ($user, $dir) = split(/:/, $du, 2);
		if (is_under_directory($dir, $path)) {
			$switchto = $user;
			last;
			}
		}
	$switchto ||= $access->{'work_as_user'};
	@user_info = getpwnam($switchto) if ($switchto);
	}
elsif ($access->{'work_as_user'}) {
	$switchto = $access->{'work_as_user'};
	@user_info = getpwnam($access->{'work_as_user'});
	}
else {
	$switchto = $remote_user;
	@user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
	}

$$unix_user = $switchto if ($unix_user);
return @user_info;
}

sub xhr_filemin_allowed_paths
{
my ($module, $path, $access_ref, $user_info_ref) = @_;
my %access =
    $access_ref ? %{$access_ref} : get_module_acl(undef, $module);
my @paths = split(/\s+/, $access{'allowed_paths'});
my @user_info = $user_info_ref
    ? @{$user_info_ref}
    : xhr_filemin_acl_user_info(\%access, $path);

if (get_product_name() eq 'usermin') {
	my %filemin_config = foreign_config($module);
	push(@paths, split(/\t+/, $filemin_config{'allowed_paths'}));
	}

if ($user_info[0] eq 'root' &&
	@paths == 1 &&
	($paths[0] eq '$HOME' || $paths[0] eq '$ROOT'))
{
	@paths = ('/');
	}
else {
	@paths =
	    map { $_ eq '$HOME' ? $user_info[7] : $_ eq '$ROOT' ? '/' : $_ }
	    @paths;
	@paths = map { s/\$USER/$remote_user/g; $_ } @paths;
	}

return
    grep { defined($_) && $_ ne '' } map { simplify_path($_) } unique(@paths);
}

sub xhr_filemin_checked_path
{
my ($module, $path, $home_prefix, $user_info_ref, $unix_user) = @_;
return undef if (!defined($path) || $path =~ /[\0\r\n]/);

$path =~ s/\/+/\//g;
$path = simplify_path($path);
return undef if (!defined($path));

my %access = get_module_acl(undef, $module);
my $initial_unix_user;
my @initial_user_info =
    xhr_filemin_acl_user_info(\%access, $path, \$initial_unix_user);
$home_prefix ||= $initial_user_info[7] if (@initial_user_info);

# Prefer an explicitly allowed absolute path. Only then try a home-relative path.
my @candidates = ($path);
if ($home_prefix && !is_under_directory($home_prefix, $path)) {
	$home_prefix =~ s/\/$//;
	my $relative_path = $path =~ /^\// ? $path : "/$path";
	my $home_path = simplify_path($home_prefix.$relative_path);
	push(@candidates, $home_path)
		if (defined($home_path) && $home_path ne $path);
	}

my (@last_user_info, $last_unix_user);
foreach my $candidate (@candidates) {
	my $candidate_unix_user;
	my @user_info = xhr_filemin_acl_user_info(
		\%access, $candidate, \$candidate_unix_user);
	@last_user_info = @user_info;
	$last_unix_user = $candidate_unix_user;
	next if (!@user_info);

	foreach my $allowed_path (
		xhr_filemin_allowed_paths(
			$module, $candidate, \%access, \@user_info))
	{
		if (is_under_directory($allowed_path, $candidate)) {
			@{$user_info_ref} = @user_info if ($user_info_ref);
			$$unix_user = $candidate_unix_user if ($unix_user);
			return $candidate;
			}
		}
	}
@{$user_info_ref} = @last_user_info if ($user_info_ref);
$$unix_user = $last_unix_user || $initial_unix_user if ($unix_user);
return undef;
}

# Switch to a complete Unix identity and verify that no broader identity remains.
sub xhr_switch_to_user_info
{
my ($user_info, $supplementary_groups) = @_;
return 0 if (!$user_info || !@{$user_info});

my @allowed_groups = ($user_info->[3],
	$supplementary_groups ? @{$supplementary_groups} :
	$user_info->[0] ? other_groups($user_info->[0]) : ());
my %allowed_groups = map { $_ => 1 } @allowed_groups;
switch_to_unix_user($user_info);
my $real_gid = $(;
my ($effective_gid, @effective_supplementary_groups) = split(/\s+/, $));
return 0 if ($< != $user_info->[2] || $> != $user_info->[2] ||
	$real_gid != $user_info->[3] || $effective_gid != $user_info->[3] ||
	grep { !$allowed_groups{$_} } @effective_supplementary_groups);

@WebminCore::remote_user_info = @{$user_info};
$ENV{'USER'} = $ENV{'LOGNAME'} = $user_info->[0];
$ENV{'HOME'} = $user_info->[7];
return 1;
}

# Check the path and use its File Manager Unix identity before accessing it.
sub xhr_filemin_path_as_user
{
my ($module, $path, $home_prefix, $user_info_ref, $unix_user) = @_;
my @user_info;
$path = xhr_filemin_checked_path($module, $path, $home_prefix,
	\@user_info, $unix_user);
@{$user_info_ref} = @user_info if ($user_info_ref);
return undef if (!$path || !@user_info);

# Fail closed if the process cannot assume the configured Unix identity.
xhr_switch_to_user_info(\@user_info) || return undef;
return $path;
}

# Check a general file-chooser path and use its configured Unix identity.
sub xhr_chooser_path_as_user
{
my ($path) = @_;
return undef if (!defined($path) || $path =~ /[\0\r\n]/);
$path = simplify_path($path);
return undef if (!defined($path));

# Use Webmin's canonical global file ACL check.
can_read_file_under_global_acl($path) || return undef;

return $path if (!supports_users());
my ($username, $user_error) = global_acl_file_unix_user();
return undef if ($user_error || !$username);
my @user_info = getpwnam($username);
return undef if (!@user_info || !xhr_switch_to_user_info(\@user_info));
return $path;
}

# Apply the Shell module's configured Unix identity and optional chroot.
sub xhr_shell_access_as_user
{
my $module = 'shell';
my %access = get_module_acl(undef, $module);
return \%access if (!supports_users());

my $username = get_product_name() eq 'usermin'
	? $remote_user : ($access{'user'} || $remote_user);
my @user_info = $username ? getpwnam($username) : getpwuid($<);
return undef if (!@user_info);
my @supplementary_groups = $username ? other_groups($username) : ();

# Enter the configured jail before dropping privileges, just like Shell commands.
my $chroot = get_product_name() eq 'usermin'
	? ($user_info[7] =~ /^(.*)\/\.\// ? $1 : undef)
	: $access{'chroot'};
if ($chroot && $chroot ne '/') {
	$chroot = simplify_path($chroot);
	return undef if (!defined($chroot) || $chroot !~ /^\// || !-d $chroot ||
		$< != 0);
	CORE::chroot($chroot) || return undef;
	chdir('/') || return undef;
	$user_info[7] =~ s/^\Q$chroot\E//;
	$user_info[7] ||= '/';
	}

xhr_switch_to_user_info(\@user_info, \@supplementary_groups) || return undef;
return \%access;
}

sub xhr
{
my $type = $in{'type'};
my $subtype = $in{'subtype'};
my $action = $in{'action'};
my %data = ();
my $output = sub {
	my ($data) = @_;

	# Set no links header
	print "x-no-links: 1\n";

	# Return fetched data if any
	print_json($data);
	};

if ($type eq "data") {
	if ($subtype eq "theme") {
		# List theme hotkeys
		if ($action eq "list-hotkeys") {
			do("$ENV{'THEME_ROOT'}/tconfig-lib.pl");
			my @hotkeys_labels = (
				$theme_text{'settings_right_hotkey_options'},
				$theme_text{
					'settings_right_hotkey_custom_options'}
			);
			my $settings_data = theme_settings_data();
			my @config_quick_access =
			    @{$settings_data->{'config_quick_access'}};
			my @hotkeys_global;

			# Theme hotkeys
			foreach my $opt (@config_quick_access) {
				next
				    if (
					&indexof($opt->{'data'}->{'category'},
						@hotkeys_labels) < 0
				    );
				next
				    if (
					&indexof(
						$opt->{'key'},
						('settings_hotkeys_active',
							'settings_hotkey_toggle_hold_modifier',
							'settings_hotkey_toggle_modifier',
						)
					) >= 0
				    );
				push(
					@hotkeys_global,
					{
						key => $opt->{'key'},
						title => $opt->{'value'},
						section => $opt->{'section'}
					}
				);
				}
			$data{'hotkeys-global'} = \@hotkeys_global;

			# File Manager hotkeys
			my $file_manager =
			    read_help_file($current_theme, 'file-manager');
			my @file_manager_hotkeys_labels =
			    $file_manager =~ /<tr.*?<td.*?>(.*?)<\//gms;
			my @file_manager_hotkeys_values = $file_manager =~
			    /<tr.*?<td.*?<td.*?h[\d]>(.*?)<\//gms;
			my %file_manager_hotkeys_map;
			@file_manager_hotkeys_map{(@file_manager_hotkeys_values)
			} = (@file_manager_hotkeys_labels);
			my @hotkeys_file_manager;
			foreach my $value (@file_manager_hotkeys_values) {
				push(
					@hotkeys_file_manager,
					{
						key =>
						    $file_manager_hotkeys_map{
							$value},
						title => $value
					}
				);
				}
			$data{'hotkeys-file-manager'} = \@hotkeys_file_manager;

			my @hotkeys_editor;
			my $editor = read_help_file($current_theme, 'editor');
			my @editor_hotkeys_labels =
			    $editor =~ /<tr.*?<td.*?>(.*?)<\//gms;
			my @editor_hotkeys_values =
			    $editor =~ /<tr.*?<td.*?<td.*?>(.*?)<\//gms;
			my %editor_hotkeys_map;
			@editor_hotkeys_map{(@editor_hotkeys_values)} =
			    (@editor_hotkeys_labels);

			foreach my $value (@editor_hotkeys_values) {
				push(
					@hotkeys_editor,
					{
						key =>
						    $editor_hotkeys_map{$value},
						title => $value
					}
				);
				}
			$data{'hotkeys-editor'} = \@hotkeys_editor;
			}

		# Control theme settings
		if ($action eq "settings") {
			my $do = $in{'do'};
			if ($do eq 'save') {
				theme_config_save();
				}
			elsif ($do eq 'restore') {
				theme_config_restore();
				}
			}
		}
	}

if ($type eq "cmd") {

	# Fail state restart
	if ($action eq "restart") {
		if (foreign_available('webmin')) {
			my $systemd = has_command('systemctl');
			if ($systemd) {

		 # We need to force kill a potentially stuck process without pid
				my %miniserv;
				get_miniserv_config(\%miniserv);

				my $force_restart =
				    -r $miniserv{'pidfile'}
				    ? "${systemd} kill -s SIGTERM webmin"
				    : "/etc/webmin/stop ; /etc/webmin/start ; /etc/webmin/.stop-init --kill";
				system($force_restart);
				}
			else {
				restart_miniserv();
				}
			}
		}
	}

if ($type eq 'nav') {

	# Returns navigation menu available for requested domain/server
	if ($action eq 'validate') {
		my $module = $in{'module'};
		my $param = $in{'param'};
		my @menu = list_combined_webmin_menu(undef, \%in, $module);

		# Returns a list of allowed domain/server related links
		if ($subtype eq 'links') {
			my @submenu = map {
				$_->{'link'} =~
				    /.*?\Q$module\E.*\/(\w+\.cgi).*?\Q$param\E=/,
				    $_->{'link'} =~ /(\/.*?_log\.cgi\?.*)/,
				    $_->{'link'} =~
				    /(.*?\/webminlog\/.*?\.cgi.*)/,
				    $_->{'link'} =~ /(.*?\/phpini\/.*?\.cgi.*)/,
				    $_->{'link'} =~ /(.*?\/spam\/.*?\.cgi.*)/,
				    $_->{'link'} =~ /(.*?\/apache\/.*?\.cgi.*)/,
				    $_->{'link'} =~
				    /(.*?\/virtualmin-.*?\/.*?\.cgi.*)/,
			} array_flatten(grep { $_->[0]->{'link'} }
				map { $_->{'members'} } @menu);

		    # Always forbidden Delete Server page when switching domains
			@submenu = grep { $_ !~ /delete_domain.cgi/ } @submenu
			    if (@submenu);

			# Include domain-specific plugin links rendered at top level
			my @domainmenu = map {
				$_->{'link'} =~
				    /(.*?\/virtualmin-.*?\/.*?\.cgi.*?\Q$param\E=.*)/
				    } grep { $_->{'link'} } @menu;
			my @fmmenu =
			    map { $_->{'link'} =~ /(filemin\/.*?\.cgi.*)/ }
			    @menu;
			@menu = map {
				$_->{'link'} =~
				    /.*?\Q$module\E.*\/(\w+\.cgi).*?\Q$param\E=/
				    } @menu;
			@menu = (@menu, @submenu, @domainmenu, @fmmenu);
			$data{'menu'} = \@menu;
			}
		}

	# Returns default goto if set
	if ($action eq 'goto') {

		# Validate if default goto is allowed for the given user
		my $mod_def = get_default_module();

		if ($mod_def) {
			$data{'gotomodule'} = "$mod_def";
			}
		}

	# Returns requested navigation
	if ($action eq 'get') {
		require("$ENV{'THEME_ROOT'}/navigation-lib.pl");
		my ($tab, $page) = nav_detector();
		if ($subtype eq 'cloudmin') {
			$data{'menu'} = nav_cloudmin_menu($page);
			}
		elsif ($subtype eq 'virtualmin') {
			$data{'menu'} = nav_virtualmin_menu($page);
			}
		elsif ($subtype eq 'webmail') {
			$data{'menu'} = nav_mailbox_menu($page);
			}
		else {
			$data{'menu'} = nav_webmin_menu($page);
			}
		}
	}

# Check if action is allowed
if ($type eq 'can') {
	if ($action eq 'view_dom') {
		require("$ENV{'THEME_ROOT'}/navigation-lib.pl");
		$data{$action} =
		    nav_virtualmin_domain_available($in{'dom'}, 'id');
		}
	}

if ($type eq 'file') {
	if ($action eq 'cache') {
		if ($in{'module'} eq 'virtual-server') {
			if ($in{'submodule'} eq 'server-templates') {
				if (foreign_available('virtual-server')) {
					foreign_require("virtual-server");
					my $var_dir =
					    $virtual_server::module_var_directory;
					my $server_template_id =
					    int($in{'server-template-id'});
					my $server_template_id_user_file =
					    "$var_dir/$in{'module'}-$in{'submodule'}-$server_template_id.$remote_user";
					if ($in{'subaction'} eq 'get') {
						if (
							-r $server_template_id_user_file
						    )
						{
							$data{'cached'} =
							    unserialise_variable(
								read_file_contents(
									$server_template_id_user_file
								));
							}
						}
					elsif ($in{'subaction'} eq 'put') {
						my $data = convert_from_json(
							$in{'data'});
						write_file_contents(
							$server_template_id_user_file,
							serialise_variable(
								$data));
						&$output(\%data);
						exit;
						}
					}
				}
			}
		}

	if ($action eq 'motd') {

		# Get current user motd file
		if ($subtype eq 'get') {
			$data{'motd'} = get_all_users_motd_data($remote_user);
			}

		# Save current user motd file
		if ($subtype eq 'set' &&
			theme_user_can_manage())
		{
			my $data = convert_from_json($in{'data'});
			put_user_motd($data);
			}

		# Get current user motd sent messages
		if ($subtype eq 'receive') {
			$data{'motd'} = get_all_users_motd_data();
			}
		}

	# Generate given file info
	if ($action eq 'stat') {
		my ($module, $sumtype, $cfile, $unix_user,
			$mime, $dir, $fzi, $fz, $fzx, $ft, $s, $sz, $nz);
		my @user_info;
		$module = 'filemin';    # $in{'module'};
		if (!foreign_available($module)) {
			$data{'module-access-denied'} = $module;
			$data{'error'} = text('config_eaccess');
			&$output(\%data);
			exit;
			}
		$cfile = $in{'file'};
		$sumtype = $in{'checksum'};
		$cfile = xhr_filemin_path_as_user($module, $cfile, undef,
			\@user_info, \$unix_user);
		if (defined($unix_user) && !@user_info) {
			$data{'error'} =
			    text('switch_remote_euser', $unix_user);
			&$output(\%data);
			exit;
			}
		if (!$cfile) {
			$data{'file-access-denied'} = 1;
			$data{'error'} =
			    $theme_text{'theme_xhred_global_no_target'};
			&$output(\%data);
			exit;
			}
		if (!@user_info) {
			$data{'error'} =
			    $theme_text{'theme_xhred_filemanager_no_unix_user'};
			&$output(\%data);
			exit;
			}
		my $get_file_checksum = sub {
			my ($cfile, $cmd) = @_;
			my $sum = 0;
			my @allowed_checksum_cmds =
			    ('md5sum', 'sha1sum', 'sha256sum');
			foreach my $c (@allowed_checksum_cmds) {
				if ($cmd eq $c) {
					if (has_command($c)) {
						$sum =
						    backquote_command("$c ".
							    quotemeta($cfile).
							    " 2>/dev/null");
						$sum =~ s/(\S+)(\s+)(.*)/$1/;
						$sum = trim($sum);
						}
					else {
						$sum = -1;
						}
					}
				}
			return $sum;
			};

		# Get given checksum and exit
		if ($sumtype) {
			my $sum = &$get_file_checksum($cfile, $sumtype);
			$data{'checksum'} = $sum;
			&$output(\%data);
			exit;
			}

		# Build extended file stats
		$fzi = recursive_disk_usage($cfile);
		$dir = -d $cfile;
		$fz = $fzi;
		$fz = nice_size($fz, -1);
		$fzx = ($fz =~ /$theme_text{'nice_size_b'}/);
		$ft = backquote_command(
			"file -b ".quotemeta($cfile)." 2>/dev/null");
		$s =
		    backquote_command("stat ".quotemeta($cfile)." 2>/dev/null");
		$ft = trim($ft);
		$s =~ /(Size:)(\s+)(\d+)(\s+)/;
		$sz = length($3) + length($4);
		$nz = length($fz);
		$sz -= $nz;
		$sz = " " x ($sz + 2);
		$s =~
		    s/(Size:)(\s+)(\d+)(\s+)/$fzx ? "$1$2$fz$sz" : "$1$2$fz ($3 $theme_text{'nice_size_b'})$sz"/e;


		if (!$dir) {
			$mime = guess_mime_type($cfile, -1);
			if ($mime == -1) {
				$mime = undef;
				}
			else {
				$mime = " ($mime) ";
				}
			}
		$s =~ s/(File:)(.*)\n/$1$2\n  Type: $ft\n/ if ($ft);
		$s =~ s/(File:)(\s+)(.*)/$1$2$cfile$mime/;
		$s =~ s/(Birth:\s+-.*[\n\s]+)//m;
		$s =~ s/\((\s*)(\d+\/)\s*(.*?)\)/($2$3)/g;

		my $lsattr_cmd = has_command('lsattr');
		if ($lsattr_cmd) {
			my $lsattr;
			my $lsattr_param = $dir ? " -d" : undef;
			$lsattr =
			    backquote_command("$lsattr_cmd$lsattr_param ".
				    quotemeta($cfile).
				    " 2>/dev/null");
			$lsattr =~ s/(\S+)(\s+)(.*)/$1/;
			$s =~ s/(Links:)(.*)\n/$1$2\n Attrs: $lsattr/
			    if ($lsattr);
			}

		my $getfacl_cmd = has_command('getfacl');
		if ($getfacl_cmd) {
			my $lbl = $lsattr_cmd ? "Attrs:" : "Links:";
			my $getfacl =
			    backquote_command("$getfacl_cmd -p ".
				    quotemeta($cfile).
				    " 2>/dev/null");
			my @getfacls =
			    ($getfacl =~
				    /^(?!(#|user::|group::|other::))([\w\:\-\_]+)/gm
			    );
			$getfacl = join(' ', @getfacls);
			$s =~ s/($lbl)(.*)\n/$1$2\n  ACLs:$getfacl\n/
			    if ($getfacl);
			}

		if (!$dir) {
			my @csums = ('md5sum', 'sha1sum', 'sha256sum');
			foreach my $c (@csums) {
				my ($sp, $sumv, $sum, $sumn);
				$sum = 'data-a-checksum="'.$c.'"';
				$sumn = $c;
				$sumn =~ s/sum//;
				$sp = " " x (6 - length($sumn));
				if ($fzi < 1024000) {
					$sumv = &$get_file_checksum($cfile, $c);
					$sum = $sumv if ($sumv != -1);
					}
				$s = rtrim($s);
				$s = "$s\n";
				$s .= "$sp$sumn: $sum\n" if ($sumv != -1);
				}
			}
		$data{'content'} = rtrim($s);
		$data{'size'} = [$fz, $fzi];
		}
	}

# Legacy calls from index page
if (post_has('xhr-')) {
	head();

	if ($in{'xhr-get_available_modules'} eq '1') {
		print get_available_modules('json');
		}

	# Enforce the ACL for the UI that selected the requested path.
	elsif ($in{'xhr-get_size'} eq '1') {
		my $nodir = $in{'xhr-get_size_nodir'};
		my $path = $in{'xhr-get_size_path'};
		my $module = $in{'xhr-get_size_cmodule'};
		$module = 'filemin'
			if (defined($module) && $module eq 'file-manager');
		if (defined($module) && $module eq 'filemin' &&
			foreign_available($module)) {
			$path = xhr_filemin_path_as_user($module, $path);
			}
		elsif (defined($module) && $module eq 'chooser') {
			$path = xhr_chooser_path_as_user($path);
			}
		else {
			$path = undef;
			}
		if (!$path) {
			print "$theme_text{'theme_xhred_global_error'}|-1";
			exit;
			}
		if ($nodir && -d $path) {
			print "$theme_text{'theme_xhred_global_error'}|-2";
			}
		elsif (!-r $path) {
			print "$theme_text{'theme_xhred_global_error'}|-1";
			}
		else {
			my $size = recursive_disk_usage($path);
			print nice_size($size, -1).'|'.nice_number($size);
			}
		}
	elsif ($in{'xhr-get_list'} eq '1') {
		my $module = 'filemin';    # $in{'xhr-get_list_cmodule'};
		exit if (!foreign_available($module));
		my $path = "$in{'xhr-get_list_path'}";
		my @dirs;

		$path = xhr_filemin_path_as_user($module, $path);
		if (!$path) {
			print convert_to_json(\@dirs);
			exit;
			}
		opendir(my $dirs, $path);
		while (my $dir = readdir $dirs) {
			next unless -d $path.'/'.$dir;
			next if $dir eq '.' or $dir eq '..';
			push @dirs, $dir;
			}
		closedir $dirs;

		@dirs = sort { "\L$a" cmp "\L$b" } @dirs;
		print convert_to_json(\@dirs);

		}
	elsif ($in{'xhr-encoding_convert'} eq '1') {
		my $module = 'filemin';   # $in{'xhr-encoding_convert_cmodule'};
		exit if (!foreign_available($module));
		my $cfile = $in{'xhr-encoding_convert_file'};
		$cfile = xhr_filemin_path_as_user($module, $cfile);
		exit if (!$cfile);
		my $data = &ui_read_file_contents_limit(
			{
				'file',
				$cfile,
				'limit',
				$in{'xhr-encoding_convert_limit'},
				'reverse',
				$in{'xhr-encoding_convert_reverse'},
				'head',
				$in{'xhr-encoding_convert_head'},
				'tail',
				$in{'xhr-encoding_convert_tail'}
			}
		);
		if (-s $cfile < 128 || -T $cfile) {
			eval {
				$data = Encode::encode(
					'utf-8',
					Encode::decode(
						$in{'xhr-encoding_convert_name'
						},
						$data
					)
				);
				};
			}
		print $data;
		}
	elsif ($in{'xhr-get_gpg_keys'} eq '1') {
		my $module = 'filemin';    # $in{'xhr-get_gpg_keys_cmodule'};
		exit if (!foreign_available($module));
		my $jailed_user = get_fm_jailed_user($module, 1);
		my ($public, $gpgpath) =
		    get_user_allowed_gpg_keys($jailed_user,
			$in{'xhr-get_gpg_keys_all'});
		my %keys;
		$keys{'public'} = $public;
		$keys{'gpgpath'} = $gpgpath;
		print convert_to_json(\%keys);
		}
	elsif ($in{'xhr-get_user_level'} eq '1') {
		print $get_user_level;
		}
	elsif ($in{'xhr-get_update_notice'} eq '1') {
		print update_notice();
		}
	elsif ($in{'xhr-get_nice_size'} eq '1') {
		print nice_size($in{'xhr-get_nice_size_sum'}, -1);
		}
	elsif ($in{'xhr-get_command_exists'} eq '1') {
		print has_command($in{'xhr-get_command_exists_name'});
		}
	elsif ($in{'xhr-theme_temp_data'} eq '1') {
		if ($in{'xhr-theme_temp_data_action'} eq 'set') {
			set_theme_temp_data(
				$in{'xhr-theme_temp_data_name'},
				$in{'xhr-theme_temp_data_value'}
			);
			}
		elsif ($in{'xhr-theme_temp_data_action'} eq 'get') {
			print get_theme_temp_data(
				$in{'xhr-theme_temp_data_name'},
				$in{'xhr-theme_temp_data_keep'}
			);
			}
		}
	elsif ($in{'xhr-shell-pop'}) {
		my $file = get_history_shell_file();
		my $index = (int($in{'xhr-shell-pop'}) - 1);
		my $history = read_file_lines($file);
		if (@$history[$index]) {
			splice(@$history, $index, 1);
			flush_file_lines($file);
			print 1;
			}
		}
	elsif ($in{'xhr-shell-insert'}) {
		my $file = get_history_shell_file();
		my $history = read_file_lines($file);
		push(@$history, $in{'xhr-shell-inserted'})
		    if ($in{'xhr-shell-inserted'});
		flush_file_lines($file);
		print convert_to_json($history);
		}
	elsif ($in{'xhr-get_autocompletes'} eq '1') {
		if (foreign_available("shell")) {
			xhr_shell_access_as_user() || exit;
			my @data = get_autocomplete_shell(
				$in{'xhr-get_autocomplete_type'},
				$in{'xhr-get_autocomplete_string'}
			);
			print convert_to_json(\@data);
			}
		}
	elsif ($in{'xhr-theme_clear_cache'} eq '1') {
		clear_theme_cache(&theme_user_can_manage(),
			$in{'xhr-theme_clear_cache_full'});
		}
	elsif ($in{'xhr-info'} eq '1') {
		if (&foreign_available('virtual-server')) {
			&foreign_require("virtual-server");

			# Refresh regularly collected info on status of services
			&virtual_server::refresh_startstop_status();
			}
		my @info = theme_list_combined_system_info();
		our (
			$cpu_percent, $mem_percent,
			$virt_percent, $disk_percent,
			$host, $os,
			$webmin_version, $virtualmin_version,
			$cloudmin_version, $authentic_theme_version,
			$local_time, $kernel_arch,
			$cpu_type, $cpu_temperature,
			$cpu_fans, $hdd_temperature,
			$uptime, $running_proc,
			$load, $real_memory,
			$virtual_memory, $disk_space,
			$package_message, $csf_title,
			$csf_data, $local_motd
		) = get_sysinfo_vars(\@info);

		# Build update info
		my @updated_info = {
			"data" => 1,
			"cpu_percent" => $cpu_percent,
			"mem_percent" => $mem_percent,
			"virt_percent" => $virt_percent,
			"disk_percent" => $disk_percent,
			"host" => $host,
			"os" => $os,
			"webmin_version" => $webmin_version,
			"virtualmin_version" => $virtualmin_version,
			"cloudmin_version" => $cloudmin_version,
			"authentic_theme_version" => $authentic_theme_version,
			"local_time" => $local_time,
			"kernel_arch" => $kernel_arch,
			"cpu_type" => $cpu_type,
			"cpu_temperature" => $cpu_temperature,
			"cpu_fans" => $cpu_fans,
			"hdd_temperature" => $hdd_temperature,
			"uptime" => $uptime,
			"proc" => $running_proc,
			"cpu" => $load,
			"mem" => $real_memory,
			"virt" => $virtual_memory,
			"disk" => $disk_space,
			"package_message" => $package_message,
			"local_motd" => $local_motd,
			"csf_title" => $csf_title,
			"csf_data" => $csf_data,
			"csf_deny" => (
				(
					defined(&csf_temporary_list) &&
					    $theme_config{
						'settings_sysinfo_csf_temp_list_privileged'
					    } ne 'false'
				)
				? csf_temporary_list()
				: undef
			),
			"collect_interval" => get_module_config_data(
				'system-status', 'collect_interval'
			),
			"extended_si" => get_extended_sysinfo(\@info, undef),
			"warning_si" => get_sysinfo_warning(\@info),
		};
		print convert_to_json(\@updated_info);
		}
	elsif ($in{'xhr-search-in-file'} eq '1') {
		my $module = 'filemin';
		exit if (!foreign_available($module));
		my $match = trim($in{'xhr-search-in-file-string'});
		my @match;
		# Directory-based ACLs can select a different Unix user for each file.
		foreach my $file (split(/,/, $in{'xhr-search-in-file-files'})) {
			my @user_info;
			$file = xhr_filemin_checked_path($module, $file,
				undef, \@user_info);
			next if (!$file || !@user_info);
			my $search = sub {
				my ($effective_gid) = split(/\s+/, $));
				return if ($> != $user_info[2] ||
					$effective_gid != $user_info[3]);
				# Open a literal filename, without File::Grep's two-argument open.
				open(my $fh, '<', $file) || return;
				fdo {
					my ($index, $line, $text) = @_;
					if ($text =~ /\Q$match\E/i) {
						push(@match, [ $file => [
							html_escape(substr($text, 0, 120)),
							$line ] ]);
						}
					} $fh;
				close($fh);
				};
			if ($< == 0) {
				# Restore root between files so each uses its own ACL identity.
				eval_as_unix_user($user_info[0], $search);
				}
			else {
				# An already unprivileged process can only read as its own user.
				&$search();
				}
			}
		print convert_to_json(\@match);
		}
	elsif ($in{'xhr-csf-unload'} eq '1') {
		lib_csf_control('unload');
		}
	elsif ($in{'xhr-gennewpass'} eq 'get') {
		my $pass;
		if (&foreign_available('virtual-server')) {
			&foreign_require("virtual-server");
			$pass = &virtual_server::random_password();
			}
		elsif (&foreign_available('useradmin')) {
			&foreign_require("useradmin", "user-lib.pl");
			$pass = &useradmin::generate_random_password();
			}
		print $pass;
		}

	exit;
	}

&$output(\%data);
}

1;
