#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in,
     %gconfig,
     %text,
     $current_theme,
     $config_directory,
     $remote_user,
     $title,
     %theme_config,
     %theme_text,
     $get_user_level,
     $has_virtualmin,
     $has_usermin,
     $has_usermin_version,
     $has_usermin_conf_dir,
     $theme_webprefix,
     $trust_unknown_referers);

$trust_unknown_referers = 1;

do($ENV{'THEME_ROOT'} . "/authentic-lib.pl");
do($ENV{'THEME_ROOT'} . "/stats-lib-funcs.pl");

header($title, 'stripped');

print '<div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1">' . "\n";

# Get system info to show
my @info = theme_list_combined_system_info();
my ($cpu_percent,
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
    $authentic_remote_version
) = get_sysinfo_vars(\@info);

if ($get_user_level ne '3') {
    my $sysinfo = grep { $_->{'id'} eq 'sysinfo' } @info;
    my @table_data;

    # Hostname
    if ($host) {
        push @table_data, [theme_text('body_host'), $host, 'sysinfo_host'];
    }

    # Operating system
    if ($os) {
        push @table_data, [theme_text('body_os'), $os, 'sysinfo_os'];
    }

    # Webmin and Usermin versions
    if ($webmin_version) {
        push @table_data, [theme_text('body_webmin'), $webmin_version, 'sysinfo_webmin_version'];

        # Usermin version
        if ($has_usermin) {
            push @table_data,
              [theme_text('body_usermin'), product_version_update($has_usermin_version, 'u'), 'sysinfo_usermin_version'];
        }
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
    if ($local_time) {
        push @table_data, [theme_text('body_time'), $local_time, 'sysinfo_local_time'];
    }

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
        my $cores = () = $cpu_temperature =~ /&#176;/g;
        my $label = $cores > 1 ? $theme_text{'body_cputemps'} : $theme_text{'body_cputemp'};
        push @table_data, [$label, $cpu_temperature, 'sysinfo_cpu_temperature'];
        if ($cpu_fans) {
            my $fans = () = $cpu_fans =~ /$theme_text{'body_cpufan_rpm'}/g;
            $label = $fans > 1 ? $theme_text{'body_cpufans'} : $theme_text{'body_cpufan'};
            push @table_data, [$label, $cpu_fans, 'sysinfo_cpu_fans'];
        }
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

    # Pre-load history data
    print '<script type="application/javascript">vars.stats.history = ' .
        convert_to_json(get_stats_history()) . ';</script>' . "\n"
            if ($sysinfo && webmin_user_is_admin());

    # Print system info table
    if (@table_data) {
        # Print sysinfo panel start
        print_sysstats_panel_start(\@info) 
            if ($sysinfo);

        # Easypie charts
        if ($sysinfo && $theme_config{'settings_sysinfo_easypie_charts'} ne 'false') {
            print_easypie_charts($cpu_percent, $mem_percent, $virt_percent, $disk_percent);
        }

        print '<table class="table table-hover margined-top-25"><tbody>' . "\n";
        while (scalar(@table_data) > 0) {
            my $left  = shift(@table_data);
            my $right = shift(@table_data);
            print_table_row_responsive(@$left, @$right);
        }
        print '</tbody></table>' . "\n";
    
        # Print System Warning
        print get_sysinfo_warning(\@info) if ($sysinfo);

        # Print sysinfo panel end
        print_sysstats_panel_end() if ($sysinfo);
    }


    print get_extended_sysinfo(\@info, '-1');
    print '<script type="application/javascript">typeof stats === "object" && stats.sys.preRender();</script>' . "\n" if ($sysinfo);

} else {

    my @mailbox = grep {$_->{'module'} eq 'mailbox'} @info;
    my @quota   = grep {$_->{'module'} eq 'quota'} @info;
    # Handle theme link if allowed
    if (!defined($gconfig{'ui_show'}) || $gconfig{'ui_show'} =~ /\btver\b/) {
        my $link =
            { desc  => $theme_text{theme_version}, value => get_theme_user_link() };
        foreach my $item (@mailbox) {
            for (my $i = 0; $i < @{$item->{'table'}}; $i++) {
                if ($item->{'table'}->[$i]->{'type'} =~ /^(version|time)$/) {
                    splice(@{$item->{'table'}}, $i + ($1 eq 'time' ? -1 : 1), 0, $link);
                    undef($link);
                    last;
                }
            }
        }
        push(@{$mailbox[0]->{'table'}}, $link) if ($link);
    }
    print_sysstats_panel_start();
    print_sysstats_table(\@mailbox, \@quota);
    print_sysstats_panel_end();

    # Common modules
    my @commonmods =
      grep {&foreign_available($_)} ("filter", "changepass", "gnupg", "filemin", "mysql", "postgresql", "datastore");
    my $commonmods_data = ui_table_start(undef, "data-class=\"no-inner-formatting\"", 2);
    if (@commonmods) {
        foreach my $mod (@commonmods) {
            my %minfo = &get_module_info($mod);
            $commonmods_data .=
              ui_table_row($minfo{'desc'},
                           "<a href='$theme_webprefix/$mod/'>" . ($text{ 'common_' . $mod } || $minfo{'longdesc'}) . "</a>");
        }
    }
    $commonmods_data .= ui_table_end();
    print_panel(1, 'account_functions', $theme_text{'theme_left_mail_account_functions'}, ($commonmods_data));
}
print '</div>' . "\n";
footer('stripped');
