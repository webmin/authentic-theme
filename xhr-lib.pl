#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, $root_directory, $remote_user, $get_user_level,
     %theme_config, %theme_text, $current_theme, $has_usermin);

sub xhr
{
    my $type    = $in{'type'};
    my $subtype = $in{'subtype'};
    my $action  = $in{'action'};
    my %data    = ();
    my $output  = sub {
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
                my @hotkeys_labels =
                  ($theme_text{'settings_right_hotkey_options'}, $theme_text{'settings_right_hotkey_custom_options'});
                my $settings_data       = theme_settings_data();
                my @config_quick_access = @{ $settings_data->{'config_quick_access'} };
                my @hotkeys_global;

                # Theme hotkeys
                foreach my $opt (@config_quick_access) {
                    next if (&indexof($opt->{'data'}->{'category'}, @hotkeys_labels) < 0);
                    next
                      if (
                          &indexof($opt->{'key'},
                                   ('settings_hotkeys_active',
                                    'settings_hotkey_toggle_hold_modifier',
                                    'settings_hotkey_toggle_modifier',
                                   )
                          ) >= 0);
                    push(@hotkeys_global, { key => $opt->{'key'}, title => $opt->{'value'}, section => $opt->{'section'} });
                }
                $data{'hotkeys-global'} = \@hotkeys_global;

                # File Manager hotkeys
                my $file_manager                = read_help_file($current_theme, 'file-manager');
                my @file_manager_hotkeys_labels = $file_manager =~ /<tr.*?<td.*?>(.*?)<\//gms;
                my @file_manager_hotkeys_values = $file_manager =~ /<tr.*?<td.*?<td.*?h[\d]>(.*?)<\//gms;
                my %file_manager_hotkeys_map;
                @file_manager_hotkeys_map{ (@file_manager_hotkeys_values) } = (@file_manager_hotkeys_labels);
                my @hotkeys_file_manager;
                foreach my $value (@file_manager_hotkeys_values) {
                    push(@hotkeys_file_manager, { key => $file_manager_hotkeys_map{$value}, title => $value });
                }
                $data{'hotkeys-file-manager'} = \@hotkeys_file_manager;

                my @hotkeys_editor;
                my $editor = read_help_file($current_theme, 'editor');
                my @editor_hotkeys_labels = $editor =~ /<tr.*?<td.*?>(.*?)<\//gms;
                my @editor_hotkeys_values = $editor =~ /<tr.*?<td.*?<td.*?>(.*?)<\//gms;
                my %editor_hotkeys_map;
                @editor_hotkeys_map{(@editor_hotkeys_values)} = (@editor_hotkeys_labels);
                foreach my $value (@editor_hotkeys_values) {
                    push(@hotkeys_editor, { key => $editor_hotkeys_map{$value}, title => $value });
                }
                $data{'hotkeys-editor'} = \@hotkeys_editor;
            }
            # Control theme settings
            if ($action eq "settings") {
                my $do = $in{'do'};
                if ($do eq 'save') {
                    theme_config_save();
                } elsif ($do eq 'restore') {
                    theme_config_restore();
                }
            }
        }
    }

    if ($type eq "cmd") {

        # Fail state restart
        if ($action eq "restart") {
            if (webmin_user_is_admin()) {
                my $systemd = has_command('systemctl');
                if ($systemd) {

                    # We need to force kill a potentially stuck process without pid
                    my %miniserv;
                    get_miniserv_config(\%miniserv);

                    my $force_restart =
                      -r $miniserv{'pidfile'} ? "${systemd} kill -s SIGTERM webmin" :
                      "/etc/webmin/stop ; /etc/webmin/start ; /etc/webmin/.stop-init --kill";
                    system($force_restart);
                } else {
                    restart_miniserv();
                }
            }
        }
    }

    if ($type eq 'nav') {

        # Returns navigation menu available for requested domain/server
        if ($action eq 'validate') {
            my $module = $in{'module'};
            my $param  = $in{'param'};
            my @menu   = list_combined_webmin_menu(undef, \%in, $module);

            # Returns a list of allowed domain/server related links
            if ($subtype eq 'links') {
                my @submenu = map {
                    $_->{'link'}   =~ /.*?$module.*\/(\w+\.cgi).*?$param=/,
                      $_->{'link'} =~ /(\/.*?_log\.cgi\?.*)/,
                      $_->{'link'} =~ /(.*?\/webminlog\/.*?\.cgi.*)/,
                      $_->{'link'} =~ /(.*?\/phpini\/.*?\.cgi.*)/,
                      $_->{'link'} =~ /(.*?\/spam\/.*?\.cgi.*)/,
                      $_->{'link'} =~ /(.*?\/apache\/.*?\.cgi.*)/,
                      $_->{'link'} =~ /(.*?\/virtualmin-.*?\/.*?\.cgi.*)/,
                } array_flatten(grep {$_->[0]->{'link'}} map {$_->{'members'}} @menu);

                # Always forbidden Delete Server page when switching domains
                @submenu = grep {$_ !~ /delete_domain.cgi/} @submenu if (@submenu);

                my @fmmenu = map {$_->{'link'} =~ /(filemin\/.*?\.cgi.*)/} @menu;
                @menu         = map {$_->{'link'} =~ /.*?$module.*\/(\w+\.cgi).*?$param=/} @menu;
                @menu         = (@menu, @submenu, @fmmenu);
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
            } elsif ($subtype eq 'virtualmin') {
                $data{'menu'} = nav_virtualmin_menu($page);
            } elsif ($subtype eq 'webmail') {
                $data{'menu'} = nav_mailbox_menu($page);
            } else {
                $data{'menu'} = nav_webmin_menu($page);
            }
        }
    }

    # Check if action is allowed
    if ($type eq 'can') {
        if ($action eq 'view_dom') {
            require("$ENV{'THEME_ROOT'}/navigation-lib.pl");
            $data{$action} = nav_virtualmin_domain_available($in{'dom'}, 'id');
        }
    }

    if ($type eq 'file') {
        if ($action eq 'cache') {
            if ($in{'module'} eq 'virtual-server') {
                if ($in{'submodule'} eq 'server-templates') {
                    if (foreign_available('virtual-server')) {
                        foreign_require("virtual-server");
                        my $var_dir            = $virtual_server::module_var_directory;
                        my $server_template_id = int($in{'server-template-id'});
                        my $server_template_id_user_file =
                          "$var_dir/$in{'module'}-$in{'submodule'}-$server_template_id.$remote_user";
                        if ($in{'subaction'} eq 'get') {
                            if (-r $server_template_id_user_file) {
                                $data{'cached'} = unserialise_variable(read_file_contents($server_template_id_user_file));
                            }
                        } elsif ($in{'subaction'} eq 'put') {
                            my $data = convert_from_json($in{'data'});
                            write_file_contents($server_template_id_user_file, serialise_variable($data));
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
                webmin_user_is_admin())
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
            my ($module, $sumtype, $jailed_user, $jailed_user_home, $cfile, $mime, $dir, $fzi, $fz, $fzx, $ft, $s, $sz, $nz);
            $module = 'filemin';    # $in{'module'};
            if (!foreign_available($module)) {
                $data{'module-access-denied'} = $module;
                &$output(\%data);
                exit;
            }
            $cfile            = $in{'file'};
            $sumtype          = $in{'checksum'};
            $jailed_user      = get_fm_jailed_user($module, 1);
            $jailed_user_home = get_fm_jailed_user($module);
            if ($jailed_user) {
                switch_to_given_unix_user($jailed_user);
                $cfile = $jailed_user_home . $cfile;
            } else {
                switch_to_remote_user_safe();
            }

            my $get_file_checksum = sub {
                my ($cfile, $cmd) = @_;
                my $sum                   = 0;
                my @allowed_checksum_cmds = ('md5sum', 'sha1sum', 'sha256sum');
                foreach my $c (@allowed_checksum_cmds) {
                    if ($cmd eq $c) {
                        if (has_command($c)) {
                            $sum = backquote_command("$c " . quotemeta($cfile) . " 2>/dev/null");
                            $sum =~ s/(\S+)(\s+)(.*)/$1/;
                            $sum = trim($sum);
                        } else {
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
            $fz  = $fzi;
            $fz  = nice_size($fz, -1);
            $fzx = ($fz =~ /$theme_text{'nice_size_b'}/);
            $ft  = backquote_command("file -b " . quotemeta($cfile) . " 2>/dev/null");
            $s   = backquote_command("stat " . quotemeta($cfile) . " 2>/dev/null");
            $ft  = trim($ft);
            $s =~ /(Size:)(\s+)(\d+)(\s+)/;
            $sz = length($3) + length($4);
            $nz = length($fz);
            $sz -= $nz;
            $sz = " " x ($sz + 2);
            $s =~ s/(Size:)(\s+)(\d+)(\s+)/$fzx ? "$1$2$fz$sz" : "$1$2$fz ($3 $theme_text{'nice_size_b'})$sz"/e;


            if (!$dir) {
                $mime = guess_mime_type($cfile, -1);
                if ($mime == -1) {
                    $mime = undef;
                } else {
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
                $lsattr = backquote_command("$lsattr_cmd$lsattr_param " . quotemeta($cfile) . " 2>/dev/null");
                $lsattr =~ s/(\S+)(\s+)(.*)/$1/;
                $s      =~ s/(Links:)(.*)\n/$1$2\n Attrs: $lsattr/ if ($lsattr);
            }

            my $getfacl_cmd = has_command('getfacl');
            if ($getfacl_cmd) {
                my $lbl      = $lsattr_cmd ? "Attrs:" : "Links:";
                my $getfacl  = backquote_command("$getfacl_cmd -p " . quotemeta($cfile) . " 2>/dev/null");
                my @getfacls = ($getfacl =~ /^(?!(#|user::|group::|other::))([\w\:\-\_]+)/gm);
                $getfacl = join(' ', @getfacls);
                $s =~ s/($lbl)(.*)\n/$1$2\n  ACLs:$getfacl\n/ if ($getfacl);
            }

            if (!$dir) {
                my @csums = ('md5sum', 'sha1sum', 'sha256sum');
                foreach my $c (@csums) {
                    my ($sp, $sumv, $sum, $sumn);
                    $sum  = 'data-a-checksum="' . $c . '"';
                    $sumn = $c;
                    $sumn =~ s/sum//;
                    $sp = " " x (6 - length($sumn));
                    if ($fzi < 1024000) {
                        $sumv = &$get_file_checksum($cfile, $c);
                        $sum  = $sumv if ($sumv != -1);
                    }
                    $s = rtrim($s);
                    $s = "$s\n";
                    $s .= "$sp$sumn: $sum\n" if ($sumv != -1);
                }
            }
            $data{'content'} = rtrim($s);
            $data{'size'}    = [$fz, $fzi];
        }
    }

    # Legacy calls from index page
    if (post_has('xhr-')) {
        head();

        if ($in{'xhr-get_available_modules'} eq '1') {
            print get_available_modules('json');
        }

        # This should be split on next refactor to be used separately by modules (filemin/mailbox)
        elsif ($in{'xhr-get_size'} eq '1') {
            switch_to_remote_user_safe();
            my $nodir  = $in{'xhr-get_size_nodir'};
            my $path   = get_access_data('root') . $in{'xhr-get_size_path'};
            my $home   = get_user_home();
            my $module = $in{'xhr-get_size_cmodule'};                          # $in{'xhr-get_size_cmodule'};
            if ($module eq 'filemin') {
                exit if (!foreign_available($module));
                my $jailed_user = get_fm_jailed_user($module);
                if ($jailed_user) {
                    $home = $jailed_user;
                    $path = $home . $in{'xhr-get_size_path'};
                }
                if (($jailed_user || $get_user_level eq '3') && !string_starts_with($path, $home)) {
                    $path = $home . $path;
                    $path =~ s/\/\//\//g;
                }
            }
            if ($nodir && -d $path) {
                print "$theme_text{'theme_xhred_global_error'}|-2";
            } elsif (!-r $path) {
                print "$theme_text{'theme_xhred_global_error'}|-1";
            } else {
                my $size = recursive_disk_usage($path);
                print nice_size($size, -1) . '|' . nice_number($size);
            }
        } elsif ($in{'xhr-get_list'} eq '1') {
            switch_to_remote_user_safe();
            my $module = 'filemin';    # $in{'xhr-get_list_cmodule'};
            exit if (!foreign_available($module));
            my $path = "$in{'xhr-get_list_path'}";
            my @dirs;

            my $jailed_user = get_fm_jailed_user($module);
            if ($jailed_user ||
                $get_user_level eq '2' ||
                $get_user_level eq '4' ||
                webmin_user_is('safe-user'))
            {
                $path = ($jailed_user || get_user_home()) . $path;
            }
            opendir(my $dirs, $path);
            while (my $dir = readdir $dirs) {
                next unless -d $path . '/' . $dir;
                next if $dir eq '.' or $dir eq '..';
                push @dirs, $dir;
            }
            closedir $dirs;

            @dirs = sort {"\L$a" cmp "\L$b"} @dirs;
            print convert_to_json(\@dirs);

        } elsif ($in{'xhr-encoding_convert'} eq '1') {
            my $module = 'filemin';    # $in{'xhr-encoding_convert_cmodule'};
            exit if (!foreign_available($module));
            my $jailed_user      = get_fm_jailed_user($module, 1);
            my $jailed_user_home = get_fm_jailed_user($module);
            my $cfile            = $in{'xhr-encoding_convert_file'};
            if ($jailed_user) {
                switch_to_given_unix_user($jailed_user);
                $cfile = $jailed_user_home . $cfile;
            } else {
                switch_to_remote_user_safe();
            }
            my $data = &ui_read_file_contents_limit(
                                                    { 'file',    $cfile, 'limit', $in{'xhr-encoding_convert_limit'},
                                                      'reverse', $in{'xhr-encoding_convert_reverse'},
                                                      'head',    $in{'xhr-encoding_convert_head'},
                                                      'tail',    $in{'xhr-encoding_convert_tail'} });
            if (-s $cfile < 128 || -T $cfile) {
                eval {$data = Encode::encode('utf-8', Encode::decode($in{'xhr-encoding_convert_name'}, $data));};
            }
            print $data;
        } elsif ($in{'xhr-get_gpg_keys'} eq '1') {
            my $module = 'filemin';    # $in{'xhr-get_gpg_keys_cmodule'};
            exit if (!foreign_available($module));
            my $jailed_user = get_fm_jailed_user($module, 1);
            my ($public, $gpgpath) =
              get_user_allowed_gpg_keys($jailed_user, $in{'xhr-get_gpg_keys_all'});
            my %keys;
            $keys{'public'}  = $public;
            $keys{'gpgpath'} = $gpgpath;
            print convert_to_json(\%keys);
        } elsif ($in{'xhr-get_user_level'} eq '1') {
            print $get_user_level;
        } elsif ($in{'xhr-get_update_notice'} eq '1') {
            print update_notice();
        } elsif ($in{'xhr-get_nice_size'} eq '1') {
            print nice_size($in{'xhr-get_nice_size_sum'}, -1);
        } elsif ($in{'xhr-get_command_exists'} eq '1') {
            print has_command($in{'xhr-get_command_exists_name'});
        } elsif ($in{'xhr-theme_temp_data'} eq '1') {
            if ($in{'xhr-theme_temp_data_action'} eq 'set') {
                set_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_value'});
            } elsif ($in{'xhr-theme_temp_data_action'} eq 'get') {
                print get_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_keep'});
            }
        } elsif ($in{'xhr-shell-pop'}) {
            my $file    = get_history_shell_file();
            my $index   = (int($in{'xhr-shell-pop'}) - 1);
            my $history = read_file_lines($file);
            if (@$history[$index]) {
                splice(@$history, $index, 1);
                flush_file_lines($file);
                print 1;
            }
        } elsif ($in{'xhr-shell-insert'}) {
            my $file    = get_history_shell_file();
            my $history = read_file_lines($file);
            push(@$history, $in{'xhr-shell-inserted'}) if ($in{'xhr-shell-inserted'});
            flush_file_lines($file);
            print convert_to_json($history);
        } elsif ($in{'xhr-get_autocompletes'} eq '1') {
            if (foreign_available("shell")) {
                switch_to_remote_user_safe();
                my @data =
                    get_autocomplete_shell(
                        $in{'xhr-get_autocomplete_type'},
                        $in{'xhr-get_autocomplete_string'});
                print convert_to_json(\@data);
            }
        } elsif ($in{'xhr-theme_latest_version'} eq '1') {
            my @current_versions;
            my @remote_version = theme_remote_version(1, 0, 1);
            my ($remote_version_number) = "@remote_version" =~ /^version=(.*)/m;
            my ($remote_mversion_number) = "@remote_version" =~ /^mversion=(.*)/m;
            if ($remote_mversion_number <= 1) {
                $remote_mversion_number = "";
            } else {
                $remote_mversion_number = "-$remote_mversion_number";
            }
            my ($remote_bversion_number) = "@remote_version" =~ /^bversion=(.*)/m;
            if ($remote_bversion_number <= 1) {
                $remote_bversion_number = "";
            } else {
                $remote_bversion_number = ":$remote_bversion_number";
            }
            push(@current_versions,
                 (theme_remote_version(1, 1) =~ /^version=(.*)/m),
                 "$remote_version_number$remote_mversion_number$remote_bversion_number");
            print convert_to_json(\@current_versions);
        } elsif ($in{'xhr-theme_clear_cache'} eq '1') {
            clear_theme_cache(&webmin_user_is_admin(), $in{'xhr-theme_clear_cache_full'});
        } elsif ($in{'xhr-update'} eq '1' && &webmin_user_is_admin()) {
            my @update_rs;
            my $version_type            = ($in{'xhr-update-type'} eq '-beta' ? '-beta' : '-release');
            my $update_force            = $in{'xhr-update-force'};
            my $update_version          = $in{'xhr-update-version'};
            my $usermin_enabled_updates = ($theme_config{'settings_sysinfo_theme_updates_for_usermin'} ne 'false' ? 1 : 0);
            if (!has_command('git') || !has_command('curl') || !has_command('bash')) {
                @update_rs = {
                               "no_git" => replace((!has_command('curl') || !has_command('bash') ? '>git<'  : '~'),
                                                   (!has_command('curl')                         ? '>curl<' : '>bash<'),
                                                   $theme_text{'theme_git_patch_no_git_message'}
                               ), };
                print convert_to_json(\@update_rs);
            } else {
                if ($update_force ne "1" && !$update_version) {
                    my $authentic_remote_data;

                    if ($version_type eq '-release') {
                        $authentic_remote_data = theme_remote_version(1, 1, undef, 1);
                    } else {
                        $authentic_remote_data = theme_remote_version(1, 0, 1, 1);
                    }

                    if ($authentic_remote_data eq '0') {
                        @update_rs = { "no_connection" => $theme_text{'theme_git_update_locked'} };
                        print convert_to_json(\@update_rs);
                        exit;
                    }

                    @update_rs = theme_update_incompatible($authentic_remote_data, ($version_type eq '-release' ? 1 : 0));
                    if (@update_rs) {
                        print convert_to_json(\@update_rs);
                        exit;
                    }
                }
                my $usermin = ($has_usermin && $usermin_enabled_updates);
                my $usermin_root;
                $version_type = "$version_type:$update_version" if ($update_version);
                backquote_logged("yes | $root_directory/$current_theme/theme-update.sh $version_type -no-restart");
                if ($usermin) {
                    $usermin_root = $root_directory;
                    $usermin_root =~ s/webmin/usermin/;
                    backquote_logged("yes | $usermin_root/$current_theme/theme-update.sh $version_type -no-restart");
                }
                my $tversion = theme_version('versionfull', 'no-cache');

                @update_rs = {
                               "success" => ($usermin ? theme_text('theme_git_patch_update_success_message2', $tversion) :
                                               theme_text('theme_git_patch_update_success_message', $tversion)
                               ) };
                print convert_to_json(\@update_rs);
            }
        } elsif ($in{'xhr-info'} eq '1') {
            if (&foreign_available('virtual-server')) {
                &foreign_require("virtual-server");

                # Refresh regularly collected info on status of services
                &virtual_server::refresh_startstop_status();
            }
            my @info = theme_list_combined_system_info();
            our ($cpu_percent,
                 $mem_percent,
                 $virt_percent,
                 $disk_percent,
                 $host,
                 $os,
                 $webmin_version,
                 $virtualmin_version,
                 $cloudmin_version,
                 $authentic_theme_version,
                 $local_time,
                 $kernel_arch,
                 $cpu_type,
                 $cpu_temperature,
                 $cpu_fans,
                 $hdd_temperature,
                 $uptime,
                 $running_proc,
                 $load,
                 $real_memory,
                 $virtual_memory,
                 $disk_space,
                 $package_message,
                 $csf_title,
                 $csf_data,
                 $csf_remote_version,
                 $authentic_remote_version,
                 $local_motd
            ) = get_sysinfo_vars(\@info);

            # Build update info
            my @updated_info = {
                  "data"                     => 1,
                  "cpu_percent"              => $cpu_percent,
                  "mem_percent"              => $mem_percent,
                  "virt_percent"             => $virt_percent,
                  "disk_percent"             => $disk_percent,
                  "host"                     => $host,
                  "os"                       => $os,
                  "webmin_version"           => $webmin_version,
                  "virtualmin_version"       => $virtualmin_version,
                  "cloudmin_version"         => $cloudmin_version,
                  "authentic_theme_version"  => $authentic_theme_version,
                  "local_time"               => $local_time,
                  "kernel_arch"              => $kernel_arch,
                  "cpu_type"                 => $cpu_type,
                  "cpu_temperature"          => $cpu_temperature,
                  "cpu_fans"                 => $cpu_fans,
                  "hdd_temperature"          => $hdd_temperature,
                  "uptime"                   => $uptime,
                  "proc"                     => $running_proc,
                  "cpu"                      => $load,
                  "mem"                      => $real_memory,
                  "virt"                     => $virtual_memory,
                  "disk"                     => $disk_space,
                  "package_message"          => $package_message,
                  "authentic_remote_version" => $authentic_remote_version,
                  "local_motd"               => $local_motd,
                  "csf_title"                => $csf_title,
                  "csf_data"                 => $csf_data,
                  "csf_remote_version"       => $csf_remote_version,
                  "csf_deny"                 => (
                      (defined(&csf_temporary_list) && $theme_config{'settings_sysinfo_csf_temp_list_privileged'} ne 'false')
                      ? csf_temporary_list() :
                        undef
                  ),
                  "collect_interval" => get_module_config_data('system-status', 'collect_interval'),
                  "extended_si"      => get_extended_sysinfo(\@info, undef),
                  "warning_si"       => get_sysinfo_warning(\@info), };
            print convert_to_json(\@updated_info);
        } elsif ($in{'xhr-search-in-file'} eq '1') {
            switch_to_remote_user_safe();
            my @files = split(/,/, $in{'xhr-search-in-file-files'});
            my $match = trim($in{'xhr-search-in-file-string'});
            my @match;
            fdo {
                my ($file, $line, $text) = @_;
                if ($text =~ /\Q$match\E/i) {
                    push(@match, ([$files[$file] => [html_escape(substr($text, 0, 120)), $line]]));
                }
            }
            @files;
            print convert_to_json(\@match);
        } elsif ($in{'xhr-csf-unload'} eq '1') {
            lib_csf_control('unload');
        } elsif ($in{'xhr-gennewpass'} eq 'get') {
            my $pass;
            if (&foreign_available('virtual-server')) {
                &foreign_require("virtual-server");
                $pass = &virtual_server::random_password();
            } elsif (&foreign_available('useradmin')) {
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
