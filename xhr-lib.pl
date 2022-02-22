#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig, $root_directory, $remote_user, $get_user_level);

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

    if ($type eq 'nav') {

        # Returns navigation menu available for requested domain/server
        if ($action eq 'validate') {
            my $module = $in{'module'};
            my $param  = $in{'param'};
            my @menu   = list_combined_webmin_menu(undef, \%in, $module);

            # Returns a list of allowed domain related links
            if ($subtype eq 'links') {
                my @submenu = map {($_->{'link'} =~ /.*?$module.*\/(\w+\.cgi).*?$param=/)}
                  array_flatten(grep {$_->[0]->{'link'}} map {$_->{'members'}} @menu);
                @menu         = map {$_->{'link'} =~ /.*?$module.*\/(\w+\.cgi).*?$param=/} @menu;
                @menu         = (@menu, @submenu);
                $data{'menu'} = \@menu;
            }

        }

        # Returns default goto if set
        if ($action eq 'goto') {
            my $mod_def = $gconfig{'gotomodule'};

            # Validate if default goto is allowed for the given user
            if ($mod_def &&
                foreign_available($mod_def) &&
                -r "$root_directory/$mod_def/index.cgi")
            {
                $data{'gotomodule'} = $mod_def;
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
                $get_user_level eq '0')
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
            my ($module, $sumtype, $jailed_user, $jailed_user_home, $cfile, $mime, $dir, $fzi, $fz, $ft, $s, $sz, $nz);
            $module           = 'filemin'; # $in{'module'};
            $cfile            = $in{'file'};
            $sumtype          = $in{'checksum'};
            $jailed_user      = get_fm_jailed_user($module, 1);
            $jailed_user_home = get_fm_jailed_user($module);
            if ($jailed_user) {
                switch_to_unix_user_local($jailed_user);
                $cfile = $jailed_user_home . $cfile;
            } else {
                set_user_level();
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
            $ft  = backquote_command("file -b " . quotemeta($cfile) . " 2>/dev/null");
            $s   = backquote_command("stat " . quotemeta($cfile) . " 2>/dev/null");
            $ft  = trim($ft);
            $s =~ /(Size:)(\s+)(\d+)(\s+)/;
            $sz = length($3) + length($4);
            $nz = length($fz);
            $sz -= $nz;
            $sz = " " x ($sz + 2);
            $s =~ s/(Size:)(\s+)(\d+)(\s+)/$1$2$fz$sz/;

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
    &$output(\%data);
}

1;
