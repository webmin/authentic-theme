#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
require(dirname(__FILE__) . '/../init.pm');

my %data;
if ($in{'xhr-stats'} =~ /[[:alpha:]]/) {
    my $target = $in{'xhr-stats'};
    if ($target eq 'general') {
        my $os = $config{'os_type'};
        if ($os =~ /-linux$/ || $os eq 'freebsd') {

            # CPU stats
            my $cpu = backquote_command("vmstat 1 2 2>/dev/null");
            if (!$?) {
                my @lines = split(/\r?\n/, $cpu);
                my @w     = split(/\s+/,   $lines[$#lines]);
                !length($w[0]) && shift(@w);
                if ($os =~ /-linux$/) {
                    if ($w[8] =~ /^\d+$/ && $w[9] =~ /^\d+$/) {
                        $data{'io'} = [$w[8], $w[9]];
                        $data{'cpu'} = int($w[12]);
                    }
                } else {
                    $data{'cpu'} = int($w[16]);
                }
            }

            # Memory stats
            my $memory = 'free';
            if ($os eq 'freebsd') {
                $memory .= 'color';
                enforce_command($os, $memory);
                $memory = get_env_local_path($os, 'bin') . $memory . ' -o';
            }

            my $memory = backquote_command($memory);
            if (!$?) {
                my @lines = split(/\s+/, $memory);
                if ($lines[8] =~ /^\d+$/ && $lines[9] =~ /^\d+$/) {
                    $data{'mem'} =
                      [($lines[9] / $lines[8]) * 100, [nice_size(int($lines[8]* 1024 )), nice_size(int($lines[9]* 1024 ))]];
                }
                if ($lines[15] =~ /^\d+$/ && $lines[16] =~ /^\d+$/) {
                    $data{'virt'} =
                      [($lines[16] / $lines[15]) * 100, [nice_size(int($lines[15]* 1024 ) ), nice_size(int($lines[16]* 1024 ))]];
                }
            }

            # Load average
            my $load_average = backquote_command("uptime 2>&1");
            $data{'cpu'} = [$data{'cpu'},
              ($load_average =~ /average(s)?:\s+([0-9\.]+),?\s+([0-9\.]+),?\s+([0-9\.]+)/i ? [$2, $3, $4] : [])];

        }
    }
}
print_json(\%data);
