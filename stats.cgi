#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
no warnings 'uninitialized';

use File::Basename;
use lib (dirname(__FILE__) . '/lib');

use WebminCore;
BEGIN {push(@INC, "..");}

our (%in, $config_directory, $current_theme);

do(dirname(__FILE__) . "/authentic-funcs.pm");

init_config();
ReadParse();

our %text = load_language($current_theme);
my %settings = settings($config_directory . "/$current_theme/settings.js", 'settings_');
my $foreign_mount_allowed = (!scalar %settings || $settings{'settings_sysinfo_real_time_status_disk'} eq 'true') ? 1 : 0;

my %data;
if ($in{'xhr-stats'} =~ /[[:alpha:]]/) {
    my $target = $in{'xhr-stats'};
    if ($target eq 'general') {

        if (foreign_check("proc")) {
            foreign_require("proc");

            # CPU stats
            my @cpuinfo  = defined(&proc::get_cpu_info)     ? proc::get_cpu_info()     : ();
            my @cpuusage = defined(&proc::get_cpu_io_usage) ? proc::get_cpu_io_usage() : ();
            if (@cpuinfo && @cpuusage) {

                # CPU load
                $data{'cpu'} = [int($cpuusage[0] + $cpuusage[1] + $cpuusage[3]),
                                text('body_load', ($cpuinfo[0], $cpuinfo[1], $cpuinfo[2]))];

                # IO blocks
                $data{'io'} = [$cpuusage[5], $cpuusage[6]];
            }

            # Memory stats
            my @memory = defined(&proc::get_memory_info) ? proc::get_memory_info() : ();
            if (@memory) {
                $data{'mem'} = (
                           @memory && $memory[0] && $memory[0] > 0 ?
                             [(100 - int(($memory[1] / $memory[0]) * 100)),
                              text('body_used', nice_size(($memory[0]) * 1000), nice_size(($memory[0] - $memory[1]) * 1000))
                             ] :
                             []);
                $data{'virt'} = (
                           @memory && $memory[2] && $memory[2] > 0 ?
                             [(100 - int(($memory[3] / $memory[2]) * 100)),
                              text('body_used', nice_size(($memory[2]) * 1000), nice_size(($memory[2] - $memory[3]) * 1000))
                             ] :
                             []);
            }

            # Number of running processes
            my @processes = proc::list_processes();
            $data{'proc'} = scalar(@processes);
        }

        # Disk space
        if (foreign_check("mount") && $foreign_mount_allowed) {
            foreign_require("mount");

            my @disk_space = defined(&mount::local_disk_space) ? mount::local_disk_space() : ();
            if (@disk_space) {
                $data{'disk'} = (@disk_space && $disk_space[0] && $disk_space[0] > 0 ?
                                   [int(($disk_space[0] - $disk_space[1]) / $disk_space[0] * 100),
                                    text('body_used_and_free',      nice_size($disk_space[0]),
                                         nice_size($disk_space[1]), nice_size($disk_space[0] - $disk_space[1])
                                    )
                                   ] :
                                   []);
            }

        }

        # Reverse output for LTR users
        if (get_text_ltr()) {
            my @watched = ('mem', 'virt', 'disk');
            foreach my $key (@watched) {
                if ($data{$key} && $data{$key}[1]) {
                    $data{$key}[1] = reverse_string($data{$key}[1], "/");
                }
            }
        }
    }
}

print_json(\%data);
