#!/usr/bin/perl

#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN {push(@INC, "..");}
use WebminCore;
use File::Basename;
use lib (dirname(__FILE__) . '/lib');
use JSON qw( );

do(dirname(__FILE__) . "/authentic-funcs.pm");

init_config();
ReadParse();

our %text = load_language($current_theme);

my %data;
if ($in{'xhr-stats'} =~ /[[:alpha:]]/) {
    my $target = $in{'xhr-stats'};
    if ($target eq 'general') {

        if (foreign_check("proc")) {
            foreign_require("proc");
            my @cpuusage  = defined(&proc::get_cpu_io_usage) ? proc::get_cpu_io_usage() : ();
            my @cpuinfo   = proc::get_cpu_info();
            my @memory    = proc::get_memory_info();
            my @processes = proc::list_processes();

            # CPU stats and load average
            $data{'cpu'} =
              [int($cpuusage[0] + $cpuusage[1] + $cpuusage[3]), text('body_load', ($cpuinfo[0], $cpuinfo[1], $cpuinfo[2]))];

            # IO blocks
            $data{'io'} = [$cpuusage[5], $cpuusage[6]];

            # Memory stats
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
            $data{'proc'} = scalar(@processes);
        }

        if (foreign_check("mount")) {
            foreign_require("mount");
            my @disk_space = mount::local_disk_space();

            $data{'disk'} = (@disk_space && $disk_space[0] && $disk_space[0] > 0 ?
                               [int(($disk_space[0] - $disk_space[1]) / $disk_space[0] * 100),
                                text('body_used_and_free',      nice_size($disk_space[0]),
                                     nice_size($disk_space[1]), nice_size($disk_space[0] - $disk_space[1])
                                )
                               ] :
                               []);
        }

        # Reverse output for LTR users
        if (get_text_ltr()) {
            my @watched = ('mem', 'virt', 'disk');
            foreach my $key (@watched) {
                if ($data{$key} && $data{$key}[1]) {
                    $data{$key}[1] = reverse_text($data{$key}[1], "/");
                }
            }
        }
    }
}

print "Content-type: application/json\n\n";
print JSON->new->latin1->encode(\%data);
