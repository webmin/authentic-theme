#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in,             %gconfig,     %text,                $current_theme, $config_directory,
     $remote_user,    $title,       %theme_config,        %theme_text,    $get_user_level,
     $has_virtualmin, $has_usermin, $has_usermin_version, $has_usermin_conf_dir);

require(dirname(__FILE__) . "/authentic-lib.pm");

header($title, 'stripped');

print '<div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1">' . "\n";

# Get system info to show
my @info = theme_list_combined_system_info();
my ($has_stats,          $cpu_percent,        $mem_percent,             $virt_percent,
    $disk_percent,       $host,               $os,                      $webmin_version,
    $virtualmin_version, $cloudmin_version,   $authentic_theme_version, $local_time,
    $kernel_arch,        $cpu_type,           $cpu_temperature,         $hdd_temperature,
    $uptime,             $running_proc,       $load,                    $real_memory,
    $virtual_memory,     $disk_space,         $package_message,         $csf_title,
    $csf_data,           $csf_remote_version, $authentic_remote_version
) = get_sysinfo_vars(\@info);

if ($has_stats) {
    print_sysstats_panel_start(\@info);

    # Easypie charts
    if ($theme_config{'settings_sysinfo_easypie_charts'} ne 'false') {
        print_easypie_charts($cpu_percent, $mem_percent, $virt_percent, $disk_percent);
    }

    print '<table class="table table-hover margined-top-25"><tbody>' . "\n";

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

    print '</tbody></table>' . "\n";

    # Print System Warning
    print get_sysinfo_warning(\@info);

    print_sysstats_panel_end();

    print get_extended_sysinfo(\@info, '-1');

} elsif ($get_user_level eq '3') {

    my @mailbox = grep {$_->{'module'} eq 'mailbox'} @info;
    my @quota   = grep {$_->{'module'} eq 'quota'} @info;
    my $prod    = &get_product_name();

    print_sysstats_panel_start();
    print_sysstats_table(\@mailbox, \@quota, $prod);
    print_sysstats_panel_end();

    # Common modules
    my @commonmods =
      grep {&foreign_available($_)} ("filter", "changepass", "gnupg", "filemin", "mysql", "postgresql", "datastore");
    my $commonmods_data = ui_table_start(undef, "data-class=\"no-inner-formatting\"", 2);
    if (@commonmods) {
        foreach my $mod (@commonmods) {
            my %minfo = &get_module_info($mod);
            $commonmods_data .=
              ui_table_row($minfo{'desc'}, "<a href='$mod/'>" . ($text{ 'common_' . $mod } || $minfo{'longdesc'}) . "</a>");
        }
    }
    $commonmods_data .= ui_table_end();
    print_panel(1, 'account_functions', $theme_text{'theme_left_mail_account_functions'}, ($commonmods_data));
} else {

    # print_array(\@info);
    print get_extended_sysinfo(\@info, '-1');

}

print '</div>' . "\n";
footer('stripped');
