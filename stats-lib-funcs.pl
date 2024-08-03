#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our $json;
eval "use JSON::XS";
if (!$@) {
    $json = JSON::XS->new->latin1;
} else {
    eval "use JSON::PP";
    $json = JSON::PP->new->latin1;
}

# Import global variables
our ($config_directory, $var_directory, $current_theme, $time);

# Load theme language and settings
our %text = load_language($current_theme);
my %settings = settings("$config_directory/$current_theme/settings.js", 'settings_');

# Reuqired libs
my $foreign_check_proc = foreign_check("proc");
if ($foreign_check_proc) {
    foreign_require("proc");
}
# System status ACLs
my $acl_system_status = {
    cpu  => acl_system_status('cpu'),
    mem  => acl_system_status('mem'),
    load => acl_system_status('load'),
    proc => acl_system_status('proc'),
    disk => acl_system_status('disk'),
    net  => acl_system_status('net'),
    virt => acl_system_status('virt'),
};

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
    my $json_ = shift;
    my $json_obj;
    eval {
        $json_obj = $json->decode($json_)
    };
    return (ref($json_obj) eq 'HASH' && keys %{$json_obj}) ? $json_obj : {};
}

sub get_stats_empty
{
    return {
        graphs =>
            { cpu =>  [{x => $time, y => 0}],
              mem =>  [{x => $time, y => 0}],
              virt => [{x => $time, y => 0}],
              proc => [{x => $time, y => 0}],
              disk => [{x => $time, y => [0, 0]}],
              net =>  [{x => $time, y => [0, 0]}]
            }
    };
}

sub get_stats_now
{
    my %data;
    my $graphs = {};
    my $gadd = sub {
        my ($k, $d) = @_;
        $graphs->{$k} = [] if (ref($graphs->{$k}) ne 'ARRAY');
        push(@{$graphs->{$k}}, {x => $time, y => $d});
        # Release memory
        undef($d);
    };
    # Collect stats
    if ($foreign_check_proc) {
        # CPU stats
        if ($acl_system_status->{'cpu'}) {
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
                # Release memory
                undef(@cpuinfo);
                undef(@cpuusage);
            }
        }
        # Memory stats
        if ($acl_system_status->{'mem'}) {
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
                # Release memory
                undef(@memory);
            }
        }
        # Number of running processes
        if ($acl_system_status->{'load'}) {
            my $proc      = proc::count_processes();
            $data{'proc'} = $proc;
            $gadd->('proc', $proc);
        }
    }
    # Network I/O
    if ($acl_system_status->{'load'}) {
        my $nrs = stats_network('io');
        my $in  = @{$nrs}[0];
        my $out = @{$nrs}[1];

        if ($in && $out || $in eq '0' || $out eq '0') {
            $data{'net'} = [$in, $out];
            $gadd->('net', [$in, $out]);
        }
        # Release memory
        undef($nrs);
        undef($in);
        undef($out);
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
    # Assign data
    $data{'graphs'} = $graphs;
    # Release memory
    undef($graphs);
    # Return data
    return \%data;
}

sub get_stats_history
{
    my ($noempty) = @_;
    my $file = "$var_directory/modules/$current_theme".
                    "/real-time-monitoring.json";
    my $graphs = jsonify(read_file_contents($file));
    # No data yet
    if (!keys %{$graphs}) {
        unlink($file);
        return $noempty ? undef : get_stats_empty();
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
        my $feature = $acl_system_status->{$key};
        unless ($feature) {
            foreach my $skey (@{$map{$key}}) {
                delete $graphs->{$skey};
            }
        }
    }
    # Trim dataset
    trim_stats_history($graphs);
    # No data is available anymore
    if (!keys %{$graphs}) {
        unlink($file);
        return $noempty ? undef : get_stats_empty();
    }
    # Return data
    return { graphs => $graphs };
}

sub trim_stats_history
{
    my ($graphs) = @_;
    my $get_default_graph = sub {
        my ($key, $time) = @_;
        my $default = get_stats_empty();
        return $default->{'graphs'}{$key};
    };
    my $n = get_stats_option('stored_duration', 1) || 600;
    if ($n < 300 || $n > 3600) {
        $n = 600;
    }
    foreach my $k (keys %{$graphs}) {
        my @new_array;
        foreach my $entry (@{ $graphs->{$k} }) {
            if (defined($entry) && ($time - $entry->{'x'}) <= $n) {
                push(@new_array, $entry);
            }
        }
        $graphs->{$k} =
            @new_array ? \@new_array : $get_default_graph->($k, $time);
    }
}

sub merge_stats {
    my ($graphs1, $graphs2) = @_;
    foreach my $key (keys %{$graphs2}) {
        if (exists($graphs1->{$key})) {
            push(@{$graphs1->{$key}}, @{$graphs2->{$key}});
        } else {
            $graphs1->{$key} = $graphs2->{$key};
        }
    }
    # Release memory
    undef($graphs2);
    return $graphs1;
}

sub save_stats_history
{
    # Store complete dataset
    my ($graphs_chunk)  = @_;
    # Load stored data
    my $all_stats_histoy = get_stats_history()->{'graphs'};
    # Merge data
    my $graphs = merge_stats($all_stats_histoy, $graphs_chunk);
    # Trim dataset
    trim_stats_history($graphs);
    # Save data
    my $file = "$var_directory/modules/$current_theme".
                    "/real-time-monitoring.json";
    lock_file($file);
    write_file_contents($file, $json->encode($graphs));
    unlock_file($file);
    # Release memory
    undef($graphs_chunk);
    undef($all_stats_histoy);
    undef($graphs);
}

sub stats_network
{
    # Get network data from all interfaces
    my ($type) = @_;
    my $file = "/proc/net/dev";
    return () unless -r $file;
    open(my $dev, $file);
    my (@titles, %result);
    while (my $line = <$dev>) {
        chomp($line);
        if ($line =~ /^.{6}\|([^\\]+)\|([^\\]+)$/) {
            my ($rec, $trans) = ($1, $2);
            @titles = ((map {"r$_"} split(/\s+/, $rec)), (map {"t$_"} split(/\s+/, $trans)));
        } elsif ($line =~ /^\s*([^:]+):\s*(.*)$/) {
            my ($id, @data) = ($1, split(/\s+/, $2));
            $result{$id} = { map {$titles[$_] => $data[$_];} (0 .. $#titles) };
        }
    }
    close($dev);

    # Return current network I/O
    if ($type eq 'io') {
        my ($rbytes, $tbytes, $rbytes2, $tbytes2) = (0, 0, 0, 0);
        my @rs;
        my $results = \%result;

        # Parse current data
        foreach (%$results) {
            $rbytes += $results->{$_}->{'rbytes'};
            $tbytes += $results->{$_}->{'tbytes'};
        }

        # Wait for quater of a second and fetch data over again
        select(undef, undef, undef, 0.25);
        $results = stats_network();

        # Parse data after dalay
        foreach (%$results) {
            $rbytes2 += $results->{$_}->{'rbytes'};
            $tbytes2 += $results->{$_}->{'tbytes'};
        }

        # Return current network I/O
        $rbytes = int($rbytes2 - $rbytes);
        $tbytes = int($tbytes2 - $tbytes);

        @rs = ($rbytes, $tbytes);
        return \@rs;
    }
    return \%result;
}

1;
