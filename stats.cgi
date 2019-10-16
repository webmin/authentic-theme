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

use Async;
use Time::HiRes qw (usleep);

BEGIN {push(@INC, "..");}
use WebminCore;

our (%in, $config_directory, $current_theme, $remote_user);
do(dirname(__FILE__) . "/authentic-funcs.pm");

init_config();
ReadParse();

# Load theme language and settings
our %text = load_language($current_theme);
my %settings = settings($config_directory . "/$current_theme/settings.js", 'settings_');

my $option = sub {
    if ($_[1]) {
        return $settings{"settings_sysinfo_real_time_$_[0]"};
    }
    if (!scalar %settings) {
        return 1;
    }
    return ($settings{"settings_sysinfo_real_time_$_[0]"} eq 'false') ? 0 : 1;
};
my $available = sub {
    my ($show) = @_;
    my %access = get_module_acl($remote_user, 'system-status');
    $access{'show'} ||= "";
    if ($access{'show'} eq '*') {
        return 1;
    } else {
        return indexof($show, split(/\s+/, $access{'show'})) >= 0;
    }
};

my %data;
my $tdata = {};
my $sdata = $in{'sdata'} ? 1 : 0;
my $fdata = "$config_directory/$current_theme/stats-$remote_user.json";
my $cdata = read_file_contents($fdata);
my $ddata = sub {
    my ($k, $d) = @_;

    # Save and return data
    if (!$k) {
        if (&$option('stored')) {

            # Clear existing cache if available features was disabled
            my %map = (cpu  => ['cpu', 'dio'],
                       mem  => ['mem', 'virt'],
                       load => 'proc');

            foreach my $key (keys %map) {
                my $feature = &$available($key);
                if (ref($map{$key}) eq 'ARRAY') {
                    foreach my $skey (@{ $map{$key} }) {
                        if (!$feature) {
                            delete $cdata->{$skey};
                        }
                    }
                } else {
                    if (!$feature) {
                        delete $cdata->{ $map{$key} };
                    }
                }
            }

            # Cache complete dataset
            write_file_contents($fdata, convert_to_json($cdata));

            # Return requested data
            if ($sdata) {
                $data{'fcached'} = $cdata;
            } else {
                $data{'scached'} = $tdata;
            }
        }
        return;
    }

    # Store complete dataset
    if (ref($cdata->{$k}) ne 'ARRAY') {
        $cdata->{$k} = [];
    }
    push(@{ $cdata->{$k} },
         {  x => time(),
            y => $d
         });

    # Trim stored dataset based on user option
    my $qf = 1000;
    my $n  = int(&$option('stored_length', 1) * $qf);
    if ($n < $qf / 10 || $n > $qf * 6) {
        $n = $qf;
    }
    if ($n < scalar @{ $cdata->{$k} }) {
        splice(@{ $cdata->{$k} }, 0, -$n);
    }

    # Store single dataset
    if (ref($tdata->{$k}) ne 'ARRAY') {
        $tdata->{$k} = [];
    }
    push(@{ $tdata->{$k} },
         {  x => time(),
            y => $d
         });
};
$cdata = convert_from_json($cdata) if ($cdata);
$cdata ||= {};

if ($in{'xhr-stats'} =~ /[[:alpha:]]/) {
    my $target = $in{'xhr-stats'};
    if ($target eq 'general') {

        # Run in async to reduce script execution time
        my $network = Async->new(sub {network_stats('io')});

        if (foreign_check("proc")) {
            foreign_require("proc");

            # CPU stats
            if (&$available('cpu')) {
                my @cpuinfo  = defined(&proc::get_cpu_info)     ? proc::get_cpu_info()     : ();
                my @cpuusage = defined(&proc::get_cpu_io_usage) ? proc::get_cpu_io_usage() : ();
                if (@cpuinfo && @cpuusage) {

                    # CPU load
                    my $cpu = int($cpuusage[0] + $cpuusage[1] + $cpuusage[3]);
                    $data{'cpu'} = [$cpu, text('body_load', ($cpuinfo[0], $cpuinfo[1], $cpuinfo[2]))];
                    &$ddata('cpu', $cpu);

                    # Disk I/O
                    my $io = [$cpuusage[5], $cpuusage[6]];
                    $data{'io'} = $io;
                    &$ddata('dio', $io);
                }
            }

            # Memory stats
            if (&$available('mem')) {
                my @memory = defined(&proc::get_memory_info) ? proc::get_memory_info() : ();
                if (@memory) {
                    $data{'mem'}  = [];
                    $data{'virt'} = [];

                    if (@memory && $memory[0] && $memory[0] > 0) {
                        my $mem = (100 - int(($memory[1] / $memory[0]) * 100));
                        $data{'mem'} = [$mem,
                                        text(($memory[4] ? 'body_used_cached_total' : 'body_used'),
                                             nice_size($memory[0] * 1024),
                                             nice_size(($memory[0] - $memory[1]) * 1024),
                                             ($memory[4] ? nice_size($memory[4] * 1024) : undef)
                                        )];
                        &$ddata('mem', $mem);
                    }
                    if (@memory && $memory[2] && $memory[2] > 0) {
                        my $virt = (100 - int(($memory[3] / $memory[2]) * 100));
                        $data{'virt'} = [$virt,
                                         text('body_used',
                                              nice_size(($memory[2]) * 1024),
                                              nice_size(($memory[2] - $memory[3]) * 1024)
                                         )];
                        &$ddata('virt', $virt);
                    }
                }
            }

            # Number of running processes
            if (&$available('load')) {
                my @processes = proc::list_processes();
                my $proc      = scalar(@processes);
                $data{'proc'} = $proc;
                &$ddata('proc', $proc);
            }
        }

        # Disk space
        if (&$available('disk')) {
            if (foreign_check("mount") && &$option('status_disk')) {
                foreign_require("mount");

                my @disk_space = defined(&mount::local_disk_space) ? mount::local_disk_space() : ();
                if (@disk_space) {
                    $data{'disk'} = [];

                    if (@disk_space && $disk_space[0] && $disk_space[0] > 0) {
                        my $disk = int(($disk_space[0] - $disk_space[1]) / $disk_space[0] * 100);
                        $data{'disk'} = [$disk,
                                         text('body_used_and_free',
                                              nice_size($disk_space[0]),
                                              nice_size($disk_space[1]),
                                              nice_size($disk_space[0] - $disk_space[1])
                                         )];
                    }
                }
            }
        }

        # Network I/O
        if ($network) {
            for (;;) {
                if ($network->ready) {
                    if (!$network->error) {
                        my $nrs = unserialise_variable($network->result);
                        my $in  = @{$nrs}[0];
                        my $out = @{$nrs}[1];

                        $data{'network'} = [$in, $out];
                        &$ddata('network', [$in, $out]);
                    }
                    last;
                }
                usleep 1e5;
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
    &$ddata();
}

print_json(\%data);
