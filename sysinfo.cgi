#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&ReadParse();
&init_config();

do "authentic-theme/authentic-lib.cgi";

&load_theme_library();
( $hasvirt, $level, $hasvm2 ) = get_virtualmin_user_level();
%text = &load_language($current_theme);
%text = ( &load_language('virtual-server'), %text );

&header($title);
print '<div id="wrapper" class="page" data-notice="'
    . (
    ( -f $root_directory . '/authentic-theme/update' && $level == 0 )
    ? _post_install()
    : '0'
    ) . '">' . "\n";
print '<div class="container-fluid col-lg-10 col-lg-offset-1">' . "\n";

if ( $level != 4 ) {
    print
        '<div id="system-status" class="panel panel-default" style="margin-bottom: 5px">'
        . "\n";
    print '<div class="panel-heading">' . "\n";
    print '<h3 class="panel-title">' . &text('body_header0') . (
        ( $level != 2 && $level != 3 && &foreign_available("webmin") )
        ? '<a href="/?updated" target="_top" data-href="'
            . $gconfig{'webprefix'}
            . '/webmin/edit_webmincron.cgi" data-refresh="system-status" class="btn btn-success pull-right" style="margin:-6px -11px; color: white;"><i class="fa fa-refresh"></i></a>
        <button type="button" class="btn btn-primary" style="display: none; visibility: hidden" data-toggle="modal" data-target="#update_notice"></button>'
        : ''
    ) . '</h3>' . "\n";

    print '</div>';
    print '<div class="panel-body">' . "\n";
}

# Get system info to show
my @info = &list_combined_system_info( { 'qshow', 1 } );

if ( $level == 0 || $level == 4 ) {

    if ( $level != 4 ) {

        # Ask status module for collected info
        &foreign_require("system-status");
        $info = &system_status::get_collected_info();

        # Easypie Charts
        if ( __settings('settings_sysinfo_easypie_charts') ne 'false' ) {
            print_easypie_charts($info);
        }

        # Info table
        print '<table class="table table-hover">' . "\n";

        # Hostname Info
        $ip
            = $info && $info->{'ips'}
            ? $info->{'ips'}->[0]->[0]
            : &to_ipaddress( get_system_hostname() );
        $ip = " ($ip)" if ($ip);
        $host = &get_system_hostname() . $ip;
        if ( &foreign_available("net") ) {
            $host
                = '<a href="'
                . $gconfig{'webprefix'}
                . '/net/list_dns.cgi">'
                . $host . '</a>';
        }
        &print_table_row( &text('body_host'), $host );

        # Operating System Info
        if ( $gconfig{'os_version'} eq '*' ) {
            $os = $gconfig{'real_os_type'};
        }
        else {
            $os = $gconfig{'real_os_type'} . ' '
                . $gconfig{'real_os_version'};
        }
        &print_table_row( &text('body_os'), $os );

        # Webmin version
        &print_table_row( &text('body_webmin'), &get_webmin_version() );

        # Virtualmin version
        if ($hasvirt) {
            my %vinfo                 = &get_module_info("virtual-server");
            my $is_virtual_server_gpl = $vinfo{'version'} =~ /gpl/;
            if ( $is_virtual_server_gpl eq '1' ) {
                $vs_license = '0';

            }
            else {
                $vs_license = '1';
            }

            $__virtual_server_version = $vinfo{'version'};
            $__virtual_server_version =~ s/.gpl//igs;
            print_table_row(
                $text{'right_virtualmin'},
                $__virtual_server_version . " " . (
                    $vs_license eq '0'
                    ? ''
                    : 'Pro'

                        . (
                        ( $vs_license eq '1' )
                        ? ' <a class="btn btn-default btn-xs btn-hidden hidden" title="'
                            . $text{'right_vlcheck'}
                            . '" style="margin-left:1px;padding:0 12px; line-height: 12px; height:15px;font-size:11px" href="'
                            . $gconfig{'webprefix'}
                            . '/virtual-server/licence.cgi"><i class="fa fa-refresh" style="padding-top:1px"></i></a>'
                        : ''
                        )

                )
            );
        }

        # Cloudmin version
        if ($hasvm2) {
            my %vinfo = &get_module_info("server-manager");
            $is_server_manager_gpl = $vinfo{'version'} =~ /gpl/;
            if ( $is_server_manager_gpl eq '1' ) {
                $vm2_license = '0';

            }
            else {
                $vm2_license = '1';
            }

            $__server_manager_version = $vinfo{'version'};
            $__server_manager_version =~ s/.gpl//igs;
            print_table_row(
                $text{'right_vm2'},
                $__server_manager_version . " " . (
                    $vm2_license eq '0'
                    ? ''
                    : 'Pro'

                        . (
                        ( $vm2_license eq '1' )
                        ? ' <a class="btn btn-default btn-xs btn-hidden hidden" title="'
                            . $text{'right_slcheck'}
                            . '" style="margin-left:1px;padding:0 12px; line-height: 12px; height:15px;font-size:11px" href="'
                            . $gconfig{'webprefix'}
                            . '/server-manager/licence.cgi"><i class="fa fa-refresh" style="padding-top:1px"></i></a>'
                        : ''
                        )

                )
            );
        }

        #
        # Theme version/updates
        get_authentic_version();

        # Build version response message
        if ( $remote_version <= $installed_version ) {
            do "authentic-theme/changelog.pl";
            $authentic_theme_version
                = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
                . $text{'theme_name'} . '</a> '
                . $installed_version
                . ( __settings('settings_theme_options_button') ne 'false'
                    && '<a href="/webmin/edit_themes.cgi" data-href="'
                    . $gconfig{'webprefix'}
                    . '/webmin/edit_themes.cgi" class="btn btn-default btn-xs btn-hidden hidden" title="'
                    . $text{'settings_right_theme_configurable_options_title'}
                    . '" style="margin-left: 6px; margin-right: -8px; padding: 0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-cogs" style="padding-top:1px"></i></a> '
                )
                . '<button data-href="#theme-info" class="btn btn-default btn-xs btn-hidden hidden" style="margin-left: 6px; padding: 0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-info-circle" style="padding-top:1px"></i></button> '
                . $__changelog;
        }
        else {
            $authentic_theme_version
                = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
                . $text{'theme_name'} . '</a> '
                . $installed_version . '. '
                . $text{'theme_update_available'} . ' '
                . $remote_version
                . '&nbsp;&nbsp;&nbsp;<div class="btn-group">'
                . '<a class="btn btn-xs btn-success authentic_update" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="'
                . $gconfig{'webprefix'}
                . '/webmin/edit_themes.cgi"><i class="fa fa-refresh" style="padding-top:1px">&nbsp;</i>'
                . $text{'theme_update'} . '</a>'
                . '<a class="btn btn-xs btn-info" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
                . $text{'theme_changelog'} . '</a>'
                . '<a class="btn btn-xs btn-warning" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
                . $text{'theme_download'} . '</a>'
                . '<a class="btn btn-xs btn-default" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"><i class="fa fa-rub" style="padding-top:1px">&nbsp;</i>'
                . $text{'theme_donate'} . '</a>'
                . '</div>';
        }
        &print_table_row( $text{'theme_version'}, $authentic_theme_version );

        #System Time
        use Time::Local;
        $tm = localtime( time() );
        if ( &foreign_available("time") ) {
            $tm
                = '<a href='
                . $gconfig{'webprefix'}
                . '/time/>'
                . $tm . '</a>';
        }
        &print_table_row( &text('body_time'), $tm );

        # Kernel and CPU Info
        if ( $info->{'kernel'} ) {
            &print_table_row(
                &text('body_kernel'),
                &text(
                    'body_kernelon',
                    $info->{'kernel'}->{'os'},
                    $info->{'kernel'}->{'version'},
                    $info->{'kernel'}->{'arch'}
                )
            );
        }

        # CPU Type and cores
        if ( $info->{'load'} ) {
            @c = @{ $info->{'load'} };
            if ( @c > 3 ) {
                &print_table_row( $text{'body_cpuinfo'},
                    &text( 'body_cputype', @c ) );
            }
        }

        # Temperatures Info (if available)
        if ( $info->{'cputemps'} ) {
            foreach my $t ( @{ $info->{'cputemps'} } ) {
                $cputemp
                    .= 'Core '
                    . $t->{'core'} . ': '
                    . int( $t->{'temp'} )
                    . '&#176;C<br>';
            }
            &print_table_row( $text{'body_cputemps'}, $cputemp );
        }
        if ( $info->{'drivetemps'} ) {
            foreach my $t ( @{ $info->{'drivetemps'} } ) {
                my $short = $t->{'device'};
                $short =~ s/^\/dev\///;
                my $emsg;
                if ( $t->{'errors'} ) {
                    $emsg
                        .= '&nbsp;&nbsp;<span class="label label-warning" style="vertical-align: middle; max-height: 11px; display: inline-block; line-height: 9px;">'
                        . &text( 'body_driveerr', $t->{'errors'} )
                        . "</span>";
                }
                elsif ( $t->{'failed'} ) {
                    $emsg
                        .= '&nbsp;&nbsp;<span class="label label-danger" style="vertical-align: middle; max-height: 11px; display: inline-block; line-height: 9px;">'
                        . &text('body_drivefailed')
                        . '</span>';
                }
                $hddtemp
                    .= '<span class="badge-custom badge-drivestatus" style="margin-right:3px; margin-bottom: 3px">'
                    . $short . ': '
                    . int( $t->{'temp'} )
                    . '&#176;C '
                    . $emsg
                    . '</span>'
                    . (
                    __settings('settings_sysinfo_drive_status_on_new_line')
                        eq 'true' ? '<br>' : '&nbsp;' );
            }
            &print_table_row( $text{'body_drivetemps'}, $hddtemp );
        }

        # System uptime
        &foreign_require("proc");
        my $uptime;
        my ( $d, $h, $m ) = &proc::get_system_uptime();
        if ($d) {
            $uptime = &text( 'body_updays', $d, $h, $m );
        }
        elsif ($m) {
            $uptime = &text( 'body_uphours', $h, $m );
        }
        elsif ($m) {
            $uptime = &text( 'body_upmins', $m );
        }
        if ($uptime) {
            if ( &foreign_available("init") ) {
                $uptime
                    = '<a href='
                    . $gconfig{'webprefix'}
                    . '/init/>'
                    . $uptime . '</a>';
            }
            &print_table_row( $text{'body_uptime'}, $uptime );
        }

        # Running processes
        if ( &foreign_check("proc") ) {
            @procs = &proc::list_processes();
            $pr    = scalar(@procs);
            if ( &foreign_available("proc") ) {
                $pr
                    = '<a href='
                    . $gconfig{'webprefix'}
                    . '/proc/>'
                    . $pr . '</a>';
            }
            &print_table_row( $text{'body_procs'}, $pr );
        }

        # Load averages
        if ( $info->{'load'} ) {
            @c = @{ $info->{'load'} };
            if (@c) {
                &print_table_row( $text{'body_cpu'},
                    &text( 'body_load', @c ) );
            }
        }

        # Real memory details
        &print_table_row(
            $text{'body_real'},
            &text(
                'body_used',
                nice_size( ( $m[0] ) * 1000 ),
                nice_size( ( $m[0] - $m[1] ) * 1000 )
            )
        );

        # Virtual memory details
        &print_table_row(
            $text{'body_virt'},
            &text(
                'body_used',
                nice_size( ( $m[2] ) * 1000 ),
                nice_size( ( $m[2] - $m[3] ) * 1000 )
            )
        );

        # Local disk space
        &print_table_row(
            $text{'body_disk'},
            &text(
                'body_used_and_free',
                nice_size( $info->{'disk_total'} ),
                nice_size( $info->{'disk_free'} ),
                nice_size( $info->{'disk_total'} - $info->{'disk_free'} )
            )
        );

        # Local disk space
        if ( &foreign_check("csf") && &foreign_available("csf") ) {

            # Define CSF installed version
            my $csf_installed_version
                = read_file_lines( '/etc/csf/version.txt', 1 );
            our $csf_installed_version = $csf_installed_version->[0];

            # Define CSF actual version if allowed
            if ( __settings('settings_sysinfo_csf_updates') eq 'false' ) {
                $csf_remote_version = '0';
            }
            else {
                http_download(
                    'download.configserver.com', '80',
                    '/csf/version.txt',          \$csf_remote_version,
                    \$error,                     undef,
                    undef,                       undef,
                    undef,                       5
                );

                # Trim versions' number
                $csf_installed_version =~ s/^\s+|\s+$//g;
                $csf_remote_version =~ s/^\s+|\s+$//g;
            }

            if ( $csf_remote_version <= $csf_installed_version ) {
                $csf_update_required = '0';
            }
            else {
                $csf_update_required = '1';
            }

            &print_table_row(
                $text{'body_firewall'} . ' '
                    . (
                      `pgrep lfd` ? ''
                    : ' &nbsp;&nbsp;&nbsp;&nbsp;<a class="csf-submit" href="#" data-id="csf_lfdstatus" class="label label-danger">Stopped</a> '
                    ),
                '<a href="/csf">ConfigServer Security & Firewall</a> '
                    . $csf_installed_version . ''
                    . (
                    $csf_update_required eq '1'
                    ? '. '
                        . $text{'theme_update_available'} . ' '
                        . $csf_remote_version
                        . '&nbsp;&nbsp;&nbsp;'
                    : '&nbsp;&nbsp;&nbsp;'
                    )
                    . '
                    <form action="/csf/index.cgi" method="post" class="hidden" id="csf_lfdstatus">
                        <input type="hidden" name="action" value="lfdstatus">
                    </form>
                    <form action="/csf/index.cgi" method="post" class="hidden" id="csf_upgrade">
                        <input type="hidden" name="action" value="upgrade">
                    </form>
                    <form action="/csf/index.cgi" method="post" class="hidden" id="csf_temporary_ip_entries">
                        <input type="hidden" name="action" value="temp">
                    </form>
                    <form action="/csf/index.cgi" method="post" class="hidden" id="csf_search_system_log">
                        <input type="hidden" name="action" value="loggrep">
                    </form>
                    <form action="/csf/index.cgi" method="post" class="hidden" id="csf_denyf">
                        <input type="hidden" name="action" value="denyf">
                    </form>
                '
                    . (
                    $csf_update_required eq '1'
                    ? '<div class="btn-group">
                    <a class="btn btn-xs btn-success csf csf-submit" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_upgrade"><i class="fa fa-refresh" style="padding-top:1px">&nbsp;</i>'
                        . $text{'theme_update'} . '</a>
                    <a class="btn btn-xs btn-info csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf/changelog.txt"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
                        . $text{'theme_changelog'} . '</a>
                    <a class="btn btn-xs btn-warning csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf.tgz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
                        . $text{'theme_download'} . '</a>
                </div>'
                    : '<div class="btn-group">
                   <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="top" data-container="body" data-title="Search system logs" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_search_system_log"><i class="fa fa-filter" style="padding-top:1px"></i></a>
                   <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="top" data-container="body" data-title="Temporary IP entries" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_temporary_ip_entries"><i class="fa fa-ban" style="padding-top:1px"></i></a>
                   <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_denyf"><i class="fa fa-trash-o" style="padding-top:1px"></i> Flush all blocks</a>
                  </div>'
                    )
                    . ''
            );
        }

        # Package updates
        if ( &foreign_available("package-updates") && $info->{'poss'} ) {
            @poss = @{ $info->{'poss'} };
            @secs = grep { $_->{'security'} } @poss;
            if ( @poss && @secs ) {
                $msg = &text( 'body_upsec', scalar(@poss), scalar(@secs) );
            }
            elsif (@poss) {
                $msg = &text( 'body_upneed', scalar(@poss) );
            }
            else {
                $msg = $text{'body_upok'};
            }
            if ( &foreign_available("package-updates") ) {
                $msg
                    =~ s/([0-9]+)/"<i class=\'badge badge-danger\'> $1 <\/i>"/eg;
                $message
                    = '<a href="'
                    . $gconfig{'webprefix'}
                    . '/package-updates/index.cgi?mode=updates">'
                    . $msg
                    . '</a> <a href="/?updated" target="_top" data-href="'
                    . $gconfig{'webprefix'}
                    . '/package-updates/index.cgi" data-refresh="system-status package-updates" class="btn btn-primary btn-xs btn-hidden hidden" style="margin-left:4px;color: white;padding:0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-refresh" style="padding-top:1px"></i></a>';
            }
            &print_table_row( $text{'body_updates'}, $message );
        }
        print '</table>' . "\n";

        # Print System Warning
        print_sysinfo_warning(@info);

        print '</div>';    # Panel Body
        print '</div>';    # Panel Default
    }

    print_extended_sysinfo(@info);

}
elsif ( $level == 2 ) {

    # Domain owner
    # Show a server owner info about one domain
    $ex = virtual_server::extra_admin();
    if ($ex) {
        $d = virtual_server::get_domain($ex);
    }
    else {
        $d = virtual_server::get_domain_by( "user", $remote_user, "parent",
            "" );
    }

    print '<table class="table table-hover">' . "\n";

    &print_table_row( $text{'right_login'}, $remote_user );

    &print_table_row( $text{'right_from'}, $ENV{'REMOTE_HOST'} );

    # Print Virtualmin version
    if ($hasvirt) {
        my $__virtual_server_version
            = $virtual_server::module_info{'version'};
        $__virtual_server_version =~ s/.gpl//igs;
        &print_table_row( $text{'right_virtualmin'},
            $__virtual_server_version );
    }
    else {
        &print_table_row( $text{'right_virtualmin'}, $text{'right_not'} );
    }

    # Print Theme version/updates
    get_authentic_version();

    # Build response message
    if ( $remote_version <= $installed_version ) {
        $authentic_theme_version
            = '' . $text{'theme_name'} . ' ' . $installed_version;
    }
    else {
        $authentic_theme_version
            = ''
            . $text{'theme_name'} . ' '
            . $installed_version . '. '
            . $text{'theme_update_available'} . ' '
            . $remote_version
            . '&nbsp;&nbsp;<a class="btn btn-xs btn-info" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
            . ''
            . $text{'theme_changelog'} . '</a>';
    }
    &print_table_row( $text{'theme_version'}, $authentic_theme_version );

    # Print domain name
    $dname
        = defined(&virtual_server::show_domain_name)
        ? &virtual_server::show_domain_name($d)
        : $d->{'dom'};
    &print_table_row( $text{'right_dom'}, $dname );

    @subs = ( $d, virtual_server::get_domain_by( "parent", $d->{'id'} ) );
    @reals = grep { !$_->{'alias'} } @subs;
    @mails = grep { $_->{'mail'} } @subs;
    ( $sleft, $sreason, $stotal, $shide )
        = virtual_server::count_domains("realdoms");
    if ( $sleft < 0 || $shide ) {
        &print_table_row( $text{'right_subs'}, scalar(@reals) );
    }
    else {
        &print_table_row( $text{'right_subs'},
            text( 'right_of', scalar(@reals), $stotal ) );
    }

    @aliases = grep { $_->{'alias'} } @subs;
    if (@aliases) {
        ( $aleft, $areason, $atotal, $ahide )
            = virtual_server::count_domains("aliasdoms");
        if ( $aleft < 0 || $ahide ) {
            &print_table_row( $text{'right_aliases'}, scalar(@aliases) );
        }
        else {
            &print_table_row( $text{'right_aliases'},
                text( 'right_of', scalar(@aliases), $atotal ) );
        }
    }

    # Users and aliases info
    $users = virtual_server::count_domain_feature( "mailboxes", @subs );
    ( $uleft, $ureason, $utotal, $uhide )
        = virtual_server::count_feature("mailboxes");
    $msg = @mails ? $text{'right_fusers'} : $text{'right_fusers2'};
    if ( $uleft < 0 || $uhide ) {
        &print_table_row( $msg, $users );
    }
    else {
        &print_table_row( $msg, text( 'right_of', $users, $utotal ) );
    }

    if (@mails) {
        $aliases = virtual_server::count_domain_feature( "aliases", @subs );
        ( $aleft, $areason, $atotal, $ahide )
            = virtual_server::count_feature("aliases");
        if ( $aleft < 0 || $ahide ) {
            &print_table_row( $text{'right_faliases'}, $aliases );
        }
        else {
            &print_table_row( $text{'right_faliases'},
                text( 'right_of', $aliases, $atotal ) );
        }
    }

    # Databases
    $dbs = virtual_server::count_domain_feature( "dbs", @subs );
    ( $dleft, $dreason, $dtotal, $dhide )
        = virtual_server::count_feature("dbs");
    if ( $dleft < 0 || $dhide ) {
        &print_table_row( $text{'right_fdbs'}, $dbs );
    }
    else {
        &print_table_row( $text{'right_fdbs'},
            text( 'right_of', $dbs, $dtotal ) );
    }

    if ( !$sects->{'noquotas'}
        && virtual_server::has_home_quotas() )
    {
        # Disk usage for all owned domains
        $homesize = virtual_server::quota_bsize("home");
        $mailsize = virtual_server::quota_bsize("mail");
        ( $home, $mail, $db ) = virtual_server::get_domain_quota( $d, 1 );
        $usage = $home * $homesize + $mail * $mailsize + $db;
        $limit = $d->{'quota'} * $homesize;
        if ($limit) {
            &print_table_row( $text{'right_quota'},
                text( 'right_of', nice_size($usage), &nice_size($limit) ),
                3 );
        }
        else {
            &print_table_row( $text{'right_quota'}, nice_size($usage), 3 );
        }
    }

    if (  !$sects->{'nobw'}
        && $virtual_server::config{'bw_active'}
        && $d->{'bw_limit'} )
    {
        # Bandwidth usage and limit
        &print_table_row(
            $text{'right_bw'},
            &text(
                'right_of',
                &nice_size( $d->{'bw_usage'} ),
                &text(
                    'edit_bwpast_' . $virtual_server::config{'bw_past'},
                    &nice_size( $d->{'bw_limit'} ),
                    $virtual_server::config{'bw_period'}
                )
            ),
            3
        );
    }

    print '</table>' . "\n";

    # New features for domain owner
    #show_new_features(0);

    print '</div>';    # Panel Body
    print '</div>';    # Panel Default

    print_extended_sysinfo(@info);
}
elsif ( $level == 3 ) {
    print '<table class="table table-hover">' . "\n";

    # Host and login info
    &print_table_row( &text('body_host'), &get_system_hostname() );

    # Operating System Info
    if ( $gconfig{'os_version'} eq '*' ) {
        $os = $gconfig{'real_os_type'};
    }
    else {
        $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
    }
    &print_table_row( &text('body_os'), $os );

    # Usermin version
    &print_table_row( &text('body_usermin'), &get_webmin_version() );

    # Theme version/updates
    get_authentic_version();

    # Build response message
    if ( $remote_version <= $installed_version ) {
        $authentic_theme_version
            = '' . $text{'theme_name'} . ' ' . $installed_version;
    }
    else {
        $authentic_theme_version
            = ''
            . $text{'theme_name'} . ' '
            . $installed_version . '. '
            . $text{'theme_update_available'} . ' '
            . $remote_version
            . '&nbsp;&nbsp;<a class="btn btn-xs btn-info" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
            . ''
            . $text{'theme_changelog'} . '</a>';
    }
    &print_table_row( $text{'theme_version'}, $authentic_theme_version );

    #System Time
    $tm = localtime( time() );
    if ( &foreign_available("time") ) {
        $tm = '<a href=' . $gconfig{'webprefix'} . '/time/>' . $tm . '</a>';
    }
    &print_table_row( &text('body_time'), $tm );

    print '</table>' . "\n";

    print '</div>';    # Panel Body
    print '</div>';    # Panel Default

    print_extended_sysinfo(@info);
}

# End of page

print '</div>' . "\n";
print '</div>' . "\n";
&footer();
