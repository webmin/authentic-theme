#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
no warnings 'uninitialized';
use lib ($ENV{'LIBROOT'} . "/vendor_perl");
BEGIN {push(@INC, "..");}
use WebminCore;
init_config();
do($ENV{'THEME_ROOT'} . "/authentic-funcs.pl");

# Import global variables
our (%in, $config_directory, $var_directory, $current_theme, $remote_user);

# Load theme language and settings
our %text = load_language($current_theme);
my %settings = settings("$config_directory/$current_theme/settings.js", 'settings_');

# Check if feature is enabled
sub get_stats_option
{
    if ($_[1]) {
        return $settings{"settings_sysinfo_real_time_$_[0]"};
    }
    if (!scalar %settings) {
        return 1;
    }
    return ($settings{"settings_sysinfo_real_time_$_[0]"} eq 'false') ? 0 : 1;
}

# JSON conversion
sub jsonify
{
    my $json = shift;
    my $json_obj;
    eval {
        $json_obj = convert_from_json($json);
    };
    return (ref($json_obj) eq 'HASH' && keys %{$json_obj}) ? $json_obj : {};
}

sub get_stats_real
{
    my %data;
    my $graphs = {};
    my $gadd = sub {
        my $time = time();
        my ($k, $d) = @_;
        $graphs->{$k} = [] if (ref($graphs->{$k}) ne 'ARRAY');
        push(@{$graphs->{$k}}, {x => $time, y => $d});
    };
    # Collect stats
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
                $gadd->('cpu', $cpu);
                # Disk I/O
                my $in  = $cpuusage[5];
                my $out = $cpuusage[6];
                if ($in && $out || $in eq '0' || $out eq '0') {
                    $data{'io'} = [$in, $out];
                    $gadd->('disk', [$in, $out]);
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
                    $gadd->('mem', $mem);
                }
                if (@memory && $memory[2] && $memory[2] > 0) {
                    my $virt = (100 - int(($memory[3] / $memory[2]) * 100));
                    $data{'virt'} = [$virt,
                                        text('body_used',
                                            nice_size(($memory[2]) * 1024),
                                            nice_size(($memory[2] - $memory[3]) * 1024)
                                        )];
                    $gadd->('virt', $virt);
                }
            }
        }
        # Number of running processes
        if (acl_system_status('load')) {
            my @processes = proc::list_processes();
            my $proc      = scalar(@processes);
            $data{'proc'} = $proc;
            $gadd->('proc', $proc);
        }
    }
    # Network I/O
    if (acl_system_status('load')) {
        my $network = network_stats('io');
        my $nrs = unserialise_variable($network);
        my $in  = @{$nrs}[0];
        my $out = @{$nrs}[1];

        if ($in && $out || $in eq '0' || $out eq '0') {
            $data{'net'} = [$in, $out];
            $gadd->('net', [$in, $out]);
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
    $data{'_current'} = $graphs;
    # Return data
    return \%data;
}

sub get_stats_history
{
    my $file = "$var_directory/modules/$current_theme".
                    "/real-time-monitoring.json";
    my $graphs = jsonify(read_file_contents($file));
    # No data yet
    if (!keys %{$graphs}) {
        unlink($file);
        return $graphs;
    }
    # Check if data is right
    foreach my $k (keys %{$graphs}) {
        if (ref($graphs->{$k}) ne 'ARRAY') {
            $graphs->{$k} = [];
        }
    }
    # Check if still avilable based on current ACLs
    my %map = (cpu  => ['cpu',  'disk'],
               mem  => ['mem',  'virt'],
               load => ['proc', 'net']);
    foreach my $key (keys %map) {
        my $feature = acl_system_status($key);
        unless ($feature) {
            foreach my $skey (@{$map{$key}}) {
                delete $graphs->{$skey};
            }
        }
    }
    # Return data
    return $graphs;
}

sub save_stats_history
{
    # Store complete dataset
    my ($graphs)  = @_;
    my $file = "$var_directory/modules/$current_theme".
                    "/real-time-monitoring.json";
    # Trim dataset
    my $time = time();
    my $n = get_stats_option('stored_length', 1) || 600;
    if ($n < 300 || $n > 3600) {
        $n = 600;
    }
    foreach my $k (keys %{$graphs}) {
        for my $i (0 .. @{ $graphs->{$k} }) {
            if (defined(@{ $graphs->{$k} }[$i])) {
                if (($time - @{ $graphs->{$k} }[$i]->{'x'}) > $n) {
                    delete @{ $graphs->{$k} }[$i];
                }
            }
        }
        @{ $graphs->{$k} } = grep {$_ ne undef} @{ $graphs->{$k} };
    }
    # Save data
    lock_file($file);
    write_file_contents($file, convert_to_json($graphs));
    unlock_file($file);
}

1;
