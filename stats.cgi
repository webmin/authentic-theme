#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
no warnings 'uninitialized';

use lib ("@{[miniserv::getenv('theme_root')]}/lib");
use Async;

BEGIN {push(@INC, "..");}
use WebminCore;

our (%in, $config_directory, $var_directory, $current_theme, $remote_user);
do("@{[miniserv::getenv('theme_root')]}/authentic-funcs.pl");

init_config();
ReadParse();

# Load theme language and settings
our %text = load_language($current_theme);
my %settings = settings("$config_directory/$current_theme/settings.js", 'settings_');

my $option = sub {
    if ($_[1]) {
        return $settings{"settings_sysinfo_real_time_$_[0]"};
    }
    if (!scalar %settings) {
        return 1;
    }
    return ($settings{"settings_sysinfo_real_time_$_[0]"} eq 'false') ? 0 : 1;
};

my %data;
my $tdata  = {};
my $sdata  = $in{'sdata'} ? 1 : 0;
my $fdatad = "$var_directory/modules/$current_theme";
my $fdata  = "$fdatad/stats-$remote_user.json";
my $cdata  = read_file_contents($fdata);
my $time   = time();
my $ddata  = sub {
    my ($k, $d) = @_;

    # Save and return data
    if (!$k) {
        if (&$option('stored')) {

            # Clear existing cache if available features was disabled
            my %map = (cpu  => ['cpu',  'disk'],
                       mem  => ['mem',  'virt'],
                       load => ['proc', 'net']);

            foreach my $key (keys %map) {
                my $feature = acl_system_status($key);
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
            mkdir($fdatad, 0700) if (!-d $fdatad);
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
         {  x => $time,
            y => $d
         });

    my $n = &$option('stored_length', 1) || 600;

    # User option sanity check
    if ($n < 600 || $n > 86400) {
        $n = 600;
    }

    # Trim dataset
    for my $i (0 .. @{ $cdata->{$k} }) {
        if (defined(@{ $cdata->{$k} }[$i])) {
            if (($time - @{ $cdata->{$k} }[$i]->{'x'}) > $n) {
                delete @{ $cdata->{$k} }[$i];
            }
        }
    }
    @{ $cdata->{$k} } = grep {$_ ne undef} @{ $cdata->{$k} };

    # Store single dataset
    if (ref($tdata->{$k}) ne 'ARRAY') {
        $tdata->{$k} = [];
    }
    push(@{ $tdata->{$k} },
         {  x => time(),
            y => $d
         });
};

eval {$cdata = convert_from_json($cdata) if ($cdata);};
unlink($fdata), $cdata = {} if ($@);
$cdata ||= {};

if ($in{'xhr-stats'} =~ /[[:alpha:]]/) {
    my $target = $in{'xhr-stats'};
    if ($target eq 'general') {

        # Run in async to reduce script execution time
        my $network;
        if (acl_system_status('load')) {
            $network = Async->new(sub {network_stats('io')});
        }

        if (foreign_check("proc")) {
            foreign_require("proc");

            # CPU stats
            if (acl_system_status('cpu')) {
                my @cpuinfo  = defined(&proc::get_cpu_info)     ? proc::get_cpu_info()     : ();
                my @cpuusage = defined(&proc::get_cpu_io_usage) ? proc::get_cpu_io_usage() : ();
                if (@cpuinfo && @cpuusage) {

                    # CPU load
                    my $cpu = int($cpuusage[0] + $cpuusage[1] + $cpuusage[3]);
                    $data{'cpu'} = [$cpu, text('body_load', ($cpuinfo[0], $cpuinfo[1], $cpuinfo[2]))];
                    &$ddata('cpu', $cpu);

                    # Disk I/O
                    my $in  = $cpuusage[5];
                    my $out = $cpuusage[6];
                    if ($in && $out || $in eq '0' || $out eq '0') {
                        $data{'io'} = [$in, $out];
                        &$ddata('disk', [$in, $out]);
                    }
                }
            }

            # Memory stats
            if (acl_system_status('mem')) {
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
            if (acl_system_status('load')) {
                my @processes = proc::list_processes();
                my $proc      = scalar(@processes);
                $data{'proc'} = $proc;
                &$ddata('proc', $proc);
            }
        }

        # Disk space
        if (acl_system_status('disk')) {
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

                        if ($in && $out || $in eq '0' || $out eq '0') {
                            $data{'net'} = [$in, $out];
                            &$ddata('net', [$in, $out]);
                        }
                    }
                    last;
                }
                select(undef, undef, undef, 0.1);
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
