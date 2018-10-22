#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in,             %gconfig,     %text,                $current_theme, $config_directory,
     $remote_user,    $title,       %theme_config,        %theme_text,    $get_user_level,
     $has_virtualmin, $has_usermin, $has_usermin_version, $has_usermin_conf_dir);

require(dirname(__FILE__) . "/authentic-lib.pm");

my %virtualmin_config = &foreign_config('virtual-server');
my %cloudmin_config   = &foreign_config('server-manager');

header($title, 'stripped');

print '<div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1">' . "\n";
if ($get_user_level ne '4' && &foreign_available("system-status")
    ||
    (   !&foreign_available("system-status") &&
        ($get_user_level eq '1' ||
            $get_user_level eq '2' ||
            $get_user_level eq '3')))
{
    print '<div id="system-status" class="panel panel-default" style="margin-bottom: 5px">' . "\n";
    print '<div class="panel-heading">' . "\n";
    print '<h3 class="panel-title">' . ($get_user_level eq '3' ? $theme_text{'body_header1'} : $theme_text{'body_header0'})
      .
      ( $cloudmin_config{'docs_link'} &&
          foreign_available("server-manager") ?
          '<a class="btn btn-default pull-right extra_documentation_links" href="' . $cloudmin_config{'docs_link'} .
          '"target="_blank"><i class="fa fa-book"> </i> ' . $cloudmin_config{'docs_text'} . '</a>' :
          undef
      ) .
      '
            '
      . ($virtualmin_config{'docs_link'} &&
           foreign_available("virtual-server") ?
           '<a class="btn btn-default pull-right extra_documentation_links" href="' . $virtualmin_config{'docs_link'} .
           '"target="_blank"><i class="fa fa-book"> </i> ' . $virtualmin_config{'docs_text'} . '</a>' :
           undef
      ) .
      '
    </h3>' . "\n";

    print '</div>';
    print '<div class="panel-body">' . "\n";

}

# Get system info to show
my @info = &list_combined_system_info({ 'qshow' => 1, 'max' => $theme_config{'settings_sysinfo_max_servers'} });

if ($get_user_level eq '0' || $get_user_level eq '4') {

    if ($get_user_level ne '4' && &foreign_available("system-status")) {

        my ($cpu_percent,        $mem_percent,             $virt_percent,    $disk_percent,
            $host,               $os,                      $webmin_version,  $virtualmin_version,
            $cloudmin_version,   $authentic_theme_version, $local_time,      $kernel_arch,
            $cpu_type,           $cpu_temperature,         $hdd_temperature, $uptime,
            $running_proc,       $load,                    $real_memory,     $virtual_memory,
            $disk_space,         $package_message,         $csf_title,       $csf_data,
            $csf_remote_version, $authentic_remote_version
        ) = get_sysinfo_vars();

        # Easypie charts
        if ($theme_config{'settings_sysinfo_easypie_charts'} ne 'false') {
            print_easypie_charts($cpu_percent, $mem_percent, $virt_percent, $disk_percent);
        }

        print '<table class="table table-hover margined-top-25">' . "\n";

        my @table_data;

        # Hostname
        if ($host) {
            push @table_data, [theme_text('body_host'), $host, 'sysinfo_host'];
        }

        # Operating system
        if ($os) {
            push @table_data, [theme_text('body_os'), $os, 'sysinfo_os'];
        }

        # Webmin version
        push @table_data, [theme_text('body_webmin'), $webmin_version, 'sysinfo_webmin_version'];

        # Usermin version
        if ($has_usermin) {
            push @table_data,
              [theme_text('body_usermin'), product_version_update($has_usermin_version, 'u'), 'sysinfo_usermin_version'];
        }

        # Virtualmin version
        if ($virtualmin_version) {
            push @table_data, [$theme_text{'right_virtualmin'}, $virtualmin_version, 'sysinfo_virtualmin_version'];
        }

        # Cloudmin version
        if ($cloudmin_version) {
            push @table_data, [$theme_text{'right_vm2'}, $cloudmin_version, 'sysinfo_cloudmin_version'];
        }

        # Theme version
        if ($authentic_theme_version) {
            push @table_data, [$theme_text{'theme_version'}, $authentic_theme_version, 'sysinfo_authentic_theme_version'];
        }

        # ConfigServer Security & Firewall version
        if ($csf_title && $csf_data) {
            push @table_data, [$csf_title, $csf_data, 'sysinfo_csf_data'];
        }

        #System time
        push @table_data, [theme_text('body_time'), $local_time, 'sysinfo_local_time'];

        # Kernel and arch
        if ($kernel_arch) {
            push @table_data, [theme_text('body_kernel'), $kernel_arch, 'sysinfo_kernel_arch'];
        }

        # CPU Type and cores
        if ($cpu_type) {
            push @table_data, [$theme_text{'body_cpuinfo'}, $cpu_type, 'sysinfo_cpu_type'];
        }

        # Temperatures
        if ($cpu_temperature) {
            push @table_data, [$theme_text{'body_cputemps'}, $cpu_temperature, 'sysinfo_cpu_temperature'];
        }
        if ($hdd_temperature) {
            push @table_data, [$theme_text{'body_drivetemps'}, $hdd_temperature, 'sysinfo_hdd_temperature'];
        }

        # System uptime
        if ($uptime) {
            push @table_data, [$theme_text{'body_uptime'}, $uptime, 'sysinfo_uptime'];
        }

        # Running processes
        if ($running_proc) {
            push @table_data, [$theme_text{'body_procs'}, $running_proc, 'sysinfo_proc'];
        }

        # Load averages
        if ($load) {
            push @table_data, [$theme_text{'body_cpu'}, $load, 'sysinfo_cpu'];
        }

        # Real memory details
        if ($real_memory) {
            push @table_data, [$theme_text{'body_real'}, $real_memory, 'sysinfo_mem'];
        }

        # Virtual memory details
        if ($virtual_memory) {
            push @table_data, [$theme_text{'body_virt'}, $virtual_memory, 'sysinfo_virt'];
        }

        # Local disk space
        if ($disk_space) {
            push @table_data, [$theme_text{'body_disk'}, $disk_space, 'sysinfo_disk'];
        }

        # Package updates
        if ($package_message) {
            push @table_data, [$theme_text{'body_updates'}, $package_message, 'sysinfo_package_message'];
        }

        while (scalar(@table_data) > 0) {
            my $left  = shift(@table_data);
            my $right = shift(@table_data);
            print_table_row_responsive(@$left, @$right);
        }

        print '</table>' . "\n";

        # Print System Warning
        print get_sysinfo_warning(@info);

        print '</div>';
        print '</div>';

    } elsif ($get_user_level ne '4') {
        print &ui_alert_box($theme_text{'sysinfo_system_status_warning'}, 'warn', undef, 0);
    }

    print get_extended_sysinfo(\@info, '-1');

} elsif ($get_user_level eq '1' || $get_user_level eq '2') {

    # Domain owner
    # Show a server owner info about one domain
    my $d;
    my $ex = virtual_server::extra_admin();
    if ($ex) {
        $d = virtual_server::get_domain($ex);
    } else {
        $d = virtual_server::get_domain_by("user", $remote_user, "parent", "");
    }

    print '<table class="table table-hover">' . "\n";

    if ($get_user_level eq '1') {

        # Host and login info
        &print_table_row(&theme_text('body_host'), &get_system_hostname());

        # Operating System Info
        my $os;
        if ($gconfig{'os_version'} eq '*') {
            $os = $gconfig{'real_os_type'};
        } else {
            $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
        }
        &print_table_row(&theme_text('body_os'), $os);

    }

    &print_table_row($theme_text{'right_login'}, $remote_user);

    &print_table_row($theme_text{'right_from'}, get_env('remote_host'));

    # Webmin version
    &print_table_row(&theme_text('body_webmin'), get_webmin_version(), 'sysinfo_webmin_version');

    # Usermin version
    if ($has_usermin) {
        print_table_row(&theme_text('body_usermin'), $has_usermin_version, 'sysinfo_usermin_version');
    }

    # Print Virtualmin version
    if ($has_virtualmin) {
        my $__virtual_server_version = $virtual_server::module_info{'version'};
        $__virtual_server_version =~ s/.gpl//igs;
        $__virtual_server_version .=
          ' <a class="btn btn-default btn-xs btn-hidden hidden" title="' . $theme_text{'theme_sysinfo_vmdocs'} .
'" style="margin-left:1px;margin-right:-3px;padding:0 12px; line-height: 12px; height:15px;font-size:11px" href="http://www.virtualmin.com/documentation/users/'
          . ($get_user_level eq '1' ? 'reseller' : 'server-owner')
          . '" target="_blank"><i class="fa fa-book" style="padding-top:1px"></i></a>';

        &print_table_row($theme_text{'right_virtualmin'}, $__virtual_server_version);
    } else {
        &print_table_row($theme_text{'right_virtualmin'}, $theme_text{'right_not'});
    }

    &print_table_row($theme_text{'theme_version'},
                     '<a href="https://github.com/authentic-theme/authentic-theme" target="_blank">' .
                       $theme_text{'theme_name'} .
                       '</a> ' . theme_version() . '<div class="btn-group margined-left-4"><a href="' .
                       $gconfig{'webprefix'} . '/settings-user.cgi" data-href="' . $gconfig{'webprefix'} .
                       '/settings-user.cgi" class="btn btn-default btn-xxs btn-hidden hidden" title="' .
                       $theme_text{'settings_right_theme_configurable_options_title'} . '"><i class="fa fa-cogs"></i></a> ' .
'<a data-href="#theme-info" class="btn btn-default btn-xxs btn-hidden hidden"><i class="fa fa-info-circle"></i></a></div>');

    if ($get_user_level ne '1') {

        # Print domain name
        my $dname =
          defined(&virtual_server::show_domain_name) ? &virtual_server::show_domain_name($d) :
          $d->{'dom'};
        &print_table_row($theme_text{'right_dom'}, $dname);

        my @subs = ($d, virtual_server::get_domain_by("parent", $d->{'id'}));
        my @reals = grep {!$_->{'alias'}} @subs;
        my @mails = grep {$_->{'mail'}} @subs;
        my ($sleft, $sreason, $stotal, $shide) = virtual_server::count_domains("realdoms");
        if ($sleft < 0 || $shide) {
            &print_table_row($theme_text{'right_subs'}, scalar(@reals));
        } else {
            &print_table_row($theme_text{'right_subs'}, theme_text('right_of', scalar(@reals), $stotal));
        }

        my @aliases = grep {$_->{'alias'}} @subs;
        if (@aliases) {
            my ($aleft, $areason, $atotal, $ahide) = virtual_server::count_domains("aliasdoms");
            if ($aleft < 0 || $ahide) {
                &print_table_row($theme_text{'right_aliases'}, scalar(@aliases));
            } else {
                &print_table_row($theme_text{'right_aliases'}, theme_text('right_of', scalar(@aliases), $atotal));
            }
        }

        # Users and aliases info
        my $users = virtual_server::count_domain_feature("mailboxes", @subs);
        my ($uleft, $ureason, $utotal, $uhide) = virtual_server::count_feature("mailboxes");
        my $msg = @mails ? $theme_text{'right_fusers'} : $theme_text{'right_fusers2'};
        if ($uleft < 0 || $uhide) {
            &print_table_row($msg, $users);
        } else {
            &print_table_row($msg, theme_text('right_of', $users, $utotal));
        }

        if (@mails) {
            my $aliases = virtual_server::count_domain_feature("aliases", @subs);
            my ($aleft, $areason, $atotal, $ahide) = virtual_server::count_feature("aliases");
            if ($aleft < 0 || $ahide) {
                &print_table_row($theme_text{'right_faliases'}, $aliases);
            } else {
                &print_table_row($theme_text{'right_faliases'}, theme_text('right_of', $aliases, $atotal));
            }
        }

        # Databases
        my $dbs = virtual_server::count_domain_feature("dbs", @subs);
        my ($dleft, $dreason, $dtotal, $dhide) = virtual_server::count_feature("dbs");
        if ($dleft < 0 || $dhide) {
            &print_table_row($theme_text{'right_fdbs'}, $dbs);
        } else {
            &print_table_row($theme_text{'right_fdbs'}, theme_text('right_of', $dbs, $dtotal));
        }

        if (virtual_server::has_home_quotas()) {

            # Disk usage for all owned domains
            my $homesize = virtual_server::quota_bsize("home");
            my $mailsize = virtual_server::quota_bsize("mail");
            my ($home, $mail, $db) = virtual_server::get_domain_quota($d, 1);
            my $usage = $home * $homesize + $mail * $mailsize + $db;
            my $limit = $d->{'quota'} * $homesize;
            if ($limit) {
                &print_table_row($theme_text{'right_quota'},
                                 theme_text('right_of', nice_size($usage), &nice_size($limit)), 3);
            } else {
                &print_table_row($theme_text{'right_quota'}, nice_size($usage), 3);
            }
        }

        if ($virtual_server::config{'bw_active'} &&
            $d->{'bw_limit'})
        {
            # Bandwidth usage and limit
            &print_table_row($theme_text{'right_bw'},
                             &theme_text('right_of',
                                         &nice_size($d->{'bw_usage'}),
                                         &theme_text('edit_bwpast_' . $virtual_server::config{'bw_past'},
                                                     &nice_size($d->{'bw_limit'}),
                                                     $virtual_server::config{'bw_period'}
                                         )
                             ),
                             3);
        }
    }

    print '</table>' . "\n";

    print '</div>';
    print '</div>';

    print get_extended_sysinfo(\@info, '-1');
} elsif ($get_user_level eq '3') {
    print '<table class="table table-hover">' . "\n";

    # Host and login info
    &print_table_row(&theme_text('body_host'), &get_system_hostname());

    # Operating System Info
    my $os;
    if ($gconfig{'os_version'} eq '*') {
        $os = $gconfig{'real_os_type'};
    } else {
        $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
    }
    &print_table_row(&theme_text('body_os'), $os);

    # Usermin version
    &print_table_row(&theme_text('body_usermin'), get_webmin_version());

    &print_table_row($theme_text{'theme_version'},
                     '<a href="https://github.com/authentic-theme/authentic-theme" target="_blank">' .
                       $theme_text{'theme_name'} .
                       '</a> ' . theme_version() . '<div class="btn-group margined-left-4"><a href="' .
                       $gconfig{'webprefix'} . '/settings-user.cgi" data-href="' . $gconfig{'webprefix'} .
                       '/settings-user.cgi" class="btn btn-default btn-xxs btn-hidden hidden" title="' .
                       $theme_text{'settings_right_theme_configurable_options_title'} . '"><i class="fa fa-cogs"></i></a> ' .
'<a data-href="#theme-info" class="btn btn-default btn-xxs btn-hidden hidden"><i class="fa fa-info-circle"></i></a></div>');

    print '</table>' . "\n";

    print '</div>';
    print '</div>';

    # Common modules
    my @commonmods =
      grep {&foreign_available($_)} ("filter", "changepass", "gnupg", "filemin", "mysql", "postgresql", "datastore");
    my $commonmods_data = ui_table_start(undef, "data-class=\"no-inner-formatting\"", 2);
    if (@commonmods) {

        # print ui_hidden_table_start( '44', "width=100%", 2, $open{'common'} );
        foreach my $mod (@commonmods) {
            my %minfo = &get_module_info($mod);
            $commonmods_data .=
              ui_table_row($minfo{'desc'}, "<a href='$mod/'>" . ($text{ 'common_' . $mod } || $minfo{'longdesc'}) . "</a>");
        }
    }
    $commonmods_data .= ui_table_end();
    print get_extended_sysinfo(\@info, '-1');

    print_panel(1, 'account_functions', $theme_text{'theme_left_mail_account_functions'}, ($commonmods_data));

}

print '</div>' . "\n";
footer('stripped');
