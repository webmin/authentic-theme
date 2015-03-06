#!/usr/bin/perl

#
# Authentic Theme 10.0.0 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
use version;
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
print '<div class="container">' . "\n";
print
    '<div id="system-status" class="panel panel-default" style="margin-bottom: 5px">'
    . "\n";
print '<div class="panel-heading">' . "\n";
print '<h3 class="panel-title">' . &text('body_header0') . (
    ( $level != 2 && $level != 3 && &foreign_available("webmin") )
    ? '<a href="/?updated" target="_top" data-href="'
        . $gconfig{'webprefix'}
        . '/webmin/edit_webmincron.cgi" data-refresh="system-status" class="btn btn-success pull-right" style="margin:-6px -11px;color: white"><i class="fa fa-refresh"></i></a>
        <button type="button" class="btn btn-primary" style="display: none; visibility: hidden" data-toggle="modal" data-target="#update_notice"></button>'
    : ''
) . '</h3>' . "\n";

print '</div>';
print '<div class="panel-body">' . "\n";

# Get system info to show
my @info = &list_combined_system_info( { 'qshow', 1 } );

if ( $level == 0 ) {

    # Ask status module for collected info
    &foreign_require("system-status");
    $info = &system_status::get_collected_info();

    # Circle Progress Container
    print '<div class="row" style="margin: 0;">' . "\n";
    $col_width = &get_col_num( $info, 12 );

    # CPU Usage
    if ( $info->{'cpu'} ) {
        @c    = @{ $info->{'cpu'} };
        $used = $c[0] + $c[1] + $c[3];
        &print_progressbar_colum( 6, $col_width, $used, 'CPU' );
    }

    # MEM e VIRT Usage
    if ( $info->{'mem'} ) {
        @m = @{ $info->{'mem'} };
        if ( @m && $m[0] ) {
            $used = ( $m[0] - $m[1] ) / $m[0] * 100;
            &print_progressbar_colum( 6, $col_width, $used, 'MEM' );
        }
        if ( @m && $m[2] ) {
            $used = ( $m[2] - $m[3] ) / $m[2] * 100;
            &print_progressbar_colum( 6, $col_width, $used, 'VIRT' );
        }
    }

    # HDD Usage
    if ( $info->{'disk_total'} ) {
        ( $total, $free ) = ( $info->{'disk_total'}, $info->{'disk_free'} );
        $used = ( $total - $free ) / $total * 100;
        &print_progressbar_colum( 6, $col_width, $used, 'HDD' );
    }
    print '</div>' . "\n";

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
        $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
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
                    ? ' <a class="btn btn-default btn-xs btn-hidden hidden" data-toggle="tooltip" data-placement="top" data-title="'
                        . $text{'right_vlcheck'}
                        . '" style="margin-left:1px;padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="'
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
                    ? ' <a class="btn btn-default btn-xs btn-hidden hidden" data-toggle="tooltip" data-placement="top" data-title="'
                        . $text{'right_slcheck'}
                        . '" style="margin-left:1px;padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="'
                        . $gconfig{'webprefix'}
                        . '/server-manager/licence.cgi"><i class="fa fa-refresh" style="padding-top:1px"></i></a>'
                    : ''
                    )

            )
        );
    }

    # Theme version/updates
    # Define installed version
    open my $authentic_installed_version, '<',
        $root_directory . "/authentic-theme/VERSION.txt";
    my $installed_version = <$authentic_installed_version>;
    close $authentic_installed_version;

    # Define remote version
    use LWP::Simple;
    my $remote_version
        = get(
        'https://raw.githubusercontent.com/qooob/authentic-theme/master/VERSION.txt'
        );
    open( FILENAME, '<', \$remote_version );

    # Trim spaces
    $installed_version =~ s/\s+$//;
    $remote_version =~ s/\s+$//;

    # Parse response message
    if ( version->parse($remote_version)
        <= version->parse($installed_version) )
    {
        $authentic_theme_version
            = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
            . $text{'authentic_theme'} . '</a> '
            . $installed_version
            . '<div class="modal fade" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-update">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="update_notice_label">'
            . $text{'theme_update_notice'} . '</h4>
                      </div>
                      <div class="modal-body">
                        <h4>Version 10.0.0 (March 4, 2015)</h4>
                        <ul>
                            <li>Improved left menu design to be more flat-like <em>(complete page reload is required)</em></li>
                            <li>Improved the look of old <code>ui_hidden</code> collapse, to look more like new <em>Bootstrap</em> collapse</li>
                            <li>Added support for <code>Webmail</code> in <em>Usermin</em> <a href="https://github.com/qooob/authentic-theme/issues/104" target="_blank">(Issue 104)</a></li>
                            <li>Added <code>dataTables</code>, search in case table contains more than 10 rows</li>
                            <li>Added <code>dataTables</code> on filesize, to properly sort columns containing filesize data <a href="https://github.com/qooob/authentic-theme/issues/103" target="_blank">(Issue 103)</a></li>
                            <li>Added <code>custom logo</code> support for login screen <a href="https://github.com/qooob/authentic-theme/issues/116" target="_blank">(Issue 116)</a>. Read the <a href="https://github.com/qooob/authentic-theme#how-do-i-set-custom-logos" target="_blank">manual</a></li>
                            <li>Added support for <code>basic settings</code> to control the theme (disable loaders and more). Read the <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">manual</a></li>
                            <li>Added extended controls to <em>System Information</em> page for <code>ConfigServer Security & Firewall</code></li>
                            <li>Added complete support for scrolling on <em>iPhone/iPad</em> <a href="https://github.com/qooob/authentic-theme/issues/115" target="_blank">(Issue 115)</a></li>
                            <li>Fixed server-side search that stopped working after adding <em>autocomplete</em></li>
                            <li>Fixed <code>select</code> issue in <em>Internet Explorer</em> browser <a href="https://github.com/qooob/authentic-theme/issues/99" target="_blank">(Issue 99)</a></li>
                            <li>Fixed package updates showing wrong numbers on <em>System Information</em> page <a href="https://github.com/qooob/authentic-theme/issues/112" target="_blank">(Issue 112)</a></li>
                            <li>Fixed <code>quotas charts</code> issue, displaying incorrect numbers in <em>System Information</em>/<em>Quotas</em> <a href="https://github.com/qooob/authentic-theme/issues/110" target="_blank">(Issue 110)</a></li>
                            <li>Fixed missing left menu reload upon importing new virtual server</li>
                            <li>Fixed stuck loader appearing in certain cases <a href="https://github.com/qooob/authentic-theme/issues/117" target="_blank">(Issue 117)</a></li>
                            <li>Fixed stuck loader in all third party modules, like <code>AWStat, Webminstat</code> and <code>OpenVPN + CA</code> <a href="https://github.com/qooob/authentic-theme/issues/106" target="_blank">(Issue 106)</a></li>
                            <li>Fixed <code>hotkeys triggers</code>, which now is executed only in case the switch is not already active <a href="https://github.com/qooob/authentic-theme/issues/118" target="_blank">(Issue 118)</a></li>
                            <li>Fixed fatal error happening when changing domain in <em>Webmin/Virtualmin</em> domain owner mode</li>
                            <li>Fixed <code>System Statistics</code> link to be shown only in administrative mode</li>
                            <li>Fixed <em>Virtualmin->Administration Options->Switch To Server\'s Admin</em> link, being opened in <code>__parent</code> window</li>
                            <li>Fixed <code>WYSIWYG bar</code> being <em>lower</em> than it should be from the upper border, when composing new message</li>
                            <li>Fixed login page throwing an error to the console</li>
                            <li>Removed screen-saver, as it was eating a lot of memory</li>
                            <li>Changed theme <code>repo location</code> to <em>GitHub</em>.  <strong>Attention:</strong> It\'s required that your <em>Perl</em> installation can handle <em>https</em> connections. Make sure to have installed, either <em>LWP::Protocol::https</em> or <em>Bundle::LWP</em> modules to make future <em>automatic updates</em> work</li>
                        </ul>
                        <h4 style="margin-top:20px">'
            . $text{'theme_development_support'} . '</h4>
                        Thank you for using <a target="_blank" href="https://github.com/qooob/authentic-theme"><kbd style="background:#5cb85c">'
            . $text{'authentic_theme'}
            . '<kbd></a>. Overall development of this theme has already passed the stage of <kbd>400</kbd> hours.
                          I am happy to provide <em>Authentic</em> Theme for free but please know, that it would mean a World to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you send me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                          It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em>help me to pay my bills</em>, excite future development and improve your everyday experience, while working with the theme.
                          <br>
                          <br>
                          Please <i class="badge fa fa-thumbs-up" style="font-size: 11px; background:#5cb85c"> Like</i> theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://www.youtube.com/watch?v=gfuPFuGpyv8"> YouTube</a> channel.
                          <br>
                          <br>
                          Don\'t forget nor be lazy to post to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a> found bugs.
                      </div>
                    </div>
                  </div>
               </div>';
    }
    else {
        $authentic_theme_version
            = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
            . $text{'authentic_theme'} . '</a> '
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
            . '<a class="btn btn-xs btn-warning" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://raw.githubusercontent.com/qooob/authentic-theme/master/authentic-theme-latest.wbt.gz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
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
        $tm = '<a href=' . $gconfig{'webprefix'} . '/time/>' . $tm . '</a>';
    }
    &print_table_row( &text('body_time'), $tm );

    # Kernel and CPU Info
    if ( $info->{'kernel'} ) {
        &print_table_row(
            &text('body_kernel'),
            &text(
                'body_kernelon',                $info->{'kernel'}->{'os'},
                $info->{'kernel'}->{'version'}, $info->{'kernel'}->{'arch'}
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
                    .= ' (<span class="text-danger">'
                    . &text( 'body_driveerr', $t->{'errors'} )
                    . "</span>)";
            }
            elsif ( $t->{'failed'} ) {
                $emsg
                    .= ' (<span class="text-danger">'
                    . &text('body_drivefailed')
                    . '</span>)';
            }
            $hddtemp
                .= $short . ': '
                . int( $t->{'temp'} )
                . '&#176;C<br>'
                . $emsg;
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
            &print_table_row( $text{'body_cpu'}, &text( 'body_load', @c ) );
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
        $csf_installed_version = read_file_contents('/etc/csf/version.txt');

        # Define CSF actual version
        use LWP::Simple;
        my $csf_remote_version
            = get('http://download.configserver.com/csf/version.txt');
        open( FILENAME, '<', \$csf_remote_version );

        # Trim spaces
        $csf_installed_version =~ s/\s+$//;
        $csf_remote_version =~ s/\s+$//;

        if ( version->parse($csf_remote_version)
            <= version->parse($csf_installed_version) )
        {
            $csf_update_required = '0';
        }
        else {
            $csf_update_required = '1';
        }

        &print_table_row(
            $text{'body_firewall'} . ' '
                . (
                  `pgrep lfd` ? ''
                : ' &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="document.getElementById(\'csf_lfdstatus\').submit()" class="label label-danger">Stopped</a> '
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
                    <a class="btn btn-xs btn-success csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" onclick="document.getElementById(\'csf_upgrade\').submit()"><i class="fa fa-refresh" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_update'} . '</a>
                    <a class="btn btn-xs btn-info csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf/changelog.txt"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_changelog'} . '</a>
                    <a class="btn btn-xs btn-warning csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf.tgz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_download'} . '</a>
                </div>'
                : '<div class="btn-group">
                   <a class="btn btn-info btn-xs btn-hidden hidden csf" data-container="body" data-toggle="tooltip" data-placement="top" title="Search system logs" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" onclick="document.getElementById(\'csf_search_system_log\').submit()"><i class="fa fa-filter" style="padding-top:1px"></i></a>
                   <a class="btn btn-danger btn-xs btn-hidden hidden csf" data-container="body" data-toggle="tooltip" data-placement="top" title="Temporary IP entries" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" onclick="document.getElementById(\'csf_temporary_ip_entries\').submit()"><i class="fa fa-ban" style="padding-top:1px"></i></a>
                   <a class="btn btn-success btn-xs btn-hidden hidden csf" data-container="body" data-toggle="tooltip" data-placement="top" title="Flush all blocks" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" onclick="document.getElementById(\'csf_denyf\').submit()"><i class="fa fa-trash-o" style="padding-top:1px"></i></a>
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
            $msg =~ s/([0-9]+)/"<i class=\'badge badge-danger\'> $1 <\/i>"/eg;
            $message
                = '<a href="'
                . $gconfig{'webprefix'}
                . '/package-updates/index.cgi?mode=updates">'
                . $msg
                . '</a> <a href="/?updated" target="_top" data-href="'
                . $gconfig{'webprefix'}
                . '/webmin/edit_webmincron.cgi" data-refresh="system-status package-updates" class="btn btn-primary btn-xs btn-hidden hidden" style="margin-left:4px;color: white;padding:0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-refresh" style="padding-top:1px"></i></a>';
        }
        &print_table_row( $text{'body_updates'}, $message );
    }
    print '</table>' . "\n";

    # Print System Warning
    print_sysinfo_warning(@info);

    print '</div>';    # Panel Body
    print '</div>';    # Panel Heading

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
    print '</div>';    # Panel Heading

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
    # Define installed version
    open my $authentic_installed_version, '<',
        $root_directory . "/authentic-theme/VERSION.txt";
    my $installed_version = <$authentic_installed_version>;
    close $authentic_installed_version;

    # Define remote version
    use LWP::Simple;
    my $remote_version
        = get(
        'https://raw.githubusercontent.com/qooob/authentic-theme/master/VERSION.txt'
        );
    open( FILENAME, '<', \$remote_version );

    # Trim spaces
    $installed_version =~ s/\s+$//;
    $remote_version =~ s/\s+$//;

    # Parse response message
    if ( version->parse($remote_version)
        <= version->parse($installed_version) )
    {
        $authentic_theme_version
            = '' . $text{'authentic_theme'} . ' ' . $installed_version;
    }
    else {
        $authentic_theme_version
            = ''
            . $text{'authentic_theme'} . ' '
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
    print '</div>';    # Panel Heading

    print_extended_sysinfo(@info);
}

# End of page
# print '</div>'; # Panel Body
# print '</div>'; # Panel Heading

print '</div>' . "\n";

&footer();
