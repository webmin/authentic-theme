#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use feature 'state';

our $json;
eval "use JSON::XS";
if (!$@) {
    $json = JSON::XS->new->latin1;
} else {
    eval "use JSON::PP";
    $json = JSON::PP->new->latin1;
}

# Import global variables
our ($config_directory, $var_directory, $current_theme);

# Load theme language and settings
our %stats_text = load_language($current_theme);
%stats_text = map { $_ => $stats_text{$_} }
    qw(body_load body_used_cached_total body_used
       index_noadmin_eaccess index_mods_missing);
my %settings = settings("$config_directory/$current_theme/settings.js", 'settings_');

# Required libs
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
    temp => acl_system_status('temp'),
};

sub stats_text
{
    my $rv = $stats_text{ $_[0] };
    $rv =~ s/\$(\d+)/$1 < @_ ? $_[$1] : '$'.$1/ge;
    return $rv;
}

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
    my $time = time();
    my $stats = {
        graphs => {
            cpu  => [{x => $time, y => 0}],
            mem  => [{x => $time, y => 0}],
            proc => [{x => $time, y => 0}],
            temp => [{x => $time, y => []}]
        }
    };
    $stats->{'graphs'}->{'virt'} = [{x => $time, y => 0}]
        if (has_stats_virt());
    $stats->{'graphs'}->{'disk'} = [{x => $time, y => [0, 0]}]
        if (has_stats('proc', 'disk'));
    $stats->{'graphs'}->{'net'} = [{x => $time, y => [0, 0]}]
        if (has_stats('proc', 'network'));
    return $stats;
}

sub get_stats_now
{
    my %data;
    my $graphs = {};
    my $gadd = sub {
        my $time = time();
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
                $data{'cpu'} = [$cpu, stats_text('body_load', ($cpuinfo[0], $cpuinfo[1], $cpuinfo[2]))];
                $gadd->('cpu', $cpu);
                # Disk I/O
                my $in  = $cpuusage[5];
                my $out = $cpuusage[6];
                if (has_stats('proc', 'disk') &&
                    (($in && $out) || $in eq '0' || $out eq '0')) {
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
                                    stats_text(($memory[4] ? 'body_used_cached_total' : 'body_used'),
                                            nice_size($memory[0] * 1024),
                                            nice_size(($memory[0] - $memory[1]) * 1024),
                                            ($memory[4] ? nice_size($memory[4] * 1024) : undef)
                                    )];
                    $gadd->('mem', $mem);
                }
                if (@memory && $memory[2] && $memory[2] > 0) {
                    my $virt = (100 - int(($memory[3] / $memory[2]) * 100));
                    $data{'virt'} = [$virt,
                                        stats_text('body_used',
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
    if (has_stats('proc', 'network') && $acl_system_status->{'load'}) {
        my $nrs = stats_network();
        my ($in, $out) = @{$nrs};

        if ($in && $out || $in eq '0' || $out eq '0') {
            $data{'net'} = [$in, $out];
            $gadd->('net', [$in, $out]);
        }
        # Release memory
        undef($nrs);
        undef($in);
        undef($out);
    }
    # Temperature and fans
    if ($acl_system_status->{'temp'}) {
        my ($cpu, $fans) = defined(&proc::get_current_cpu_data) ?
                proc::get_current_cpu_data() : (undef, undef);
        if ($cpu || $fans) {
            $data{'sensors'} = [{cpu => $cpu, fans => $fans}];
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
    # Assign data
    $data{'graphs'} = $graphs;
    # Release memory
    undef($graphs);
    # Return data
    return \%data;
}

sub get_stats_history_file
{
    return "$var_directory/modules/$current_theme/real-time-monitoring.json";
}

sub get_stats_history
{
    my ($noempty) = @_;
    my $file = get_stats_history_file();
    my $graphs = jsonify(theme_read_file_contents($file));
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
               load => ['proc', 'net',
                        'temp']);
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
    my $time = time();
    my $get_default_graph = sub {
        my ($key, $time) = @_;
        my $default = get_stats_empty();
        return $default->{'graphs'}{$key};
    };
    my $n = get_stats_option('stored_duration', 1) || 1200;
    if ($n < 300 || $n > 86400) {
        $n = 1200;
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
    my $file = "$var_directory/modules/$current_theme/real-time-monitoring.json";
    theme_write_file_contents($file, $json->encode($graphs));
    # Release memory
    undef($graphs_chunk);
    undef($all_stats_histoy);
    undef($graphs);
}

sub has_stats
{
    my ($mod, $type) = @_;
    state %cache;
    my $cached_func = "$mod:$type";
    return $cache{$cached_func} if (exists($cache{$cached_func}));
    my $func_name = "${mod}::has_${type}_stats";
    my $func_ref = \&{$func_name} if defined(&{$func_name});
    $cache{$cached_func} = $func_ref ? $func_ref->() : 0;
    return $cache{$cached_func};
}

sub has_stats_virt
{
    state $has_virt_memory;
    return $has_virt_memory if defined($has_virt_memory);
    if (defined(&proc::get_memory_info)) {
		my @m = &proc::get_memory_info();
        if (@m && $m[2]) {
            $has_virt_memory = 1;
            return 1;
        }
    }
    $has_virt_memory = 0;
    return 0;
}

sub stats_network
{
    return stats_network_proc() || stats_network_netstat();
}

sub stats_network_proc
{
    # Return if not available
    state $no_stats_network_proc = 0;
    return () if ($no_stats_network_proc);
    # Get network data from all interfaces
    my ($await) = @_;
    my $file = "/proc/net/dev";
    if (!-r $file) {
        $no_stats_network_proc = 1;
        return ();
    }
    # Read and parse network data
    my (@titles, %result);
    open(my $dev, $file);
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
    if (!$await) {
        my ($rbytes, $tbytes, $rbytes2, $tbytes2) = (0, 0, 0, 0);
        my @rs;
        my $results = \%result;
        # Parse current data
        foreach (%$results) {
            $rbytes += $results->{$_}->{'rbytes'};
            $tbytes += $results->{$_}->{'tbytes'};
        }
        # Wait for quater of a second and fetch data over again
        my $wait_interval = 0.25;
        select(undef, undef, undef, $wait_interval);
        $results = stats_network_proc(1);
        # Parse data after dalay
        foreach (%$results) {
            $rbytes2 += $results->{$_}->{'rbytes'};
            $tbytes2 += $results->{$_}->{'tbytes'};
        }
        # Return current network I/O (per second)
        $rbytes = int(($rbytes2 - $rbytes) / $wait_interval);
        $tbytes = int(($tbytes2 - $tbytes) / $wait_interval);
        # Return data
        @rs = ($rbytes, $tbytes);
        return \@rs;
    }
    return \%result;
}

sub stats_network_netstat
{
    state $no_stats_network_netstat = 0;
    # Return if not available
    return () if ($no_stats_network_netstat);
    # Check if netstat is available
    if (!has_command('netstat')) {
        $no_stats_network_netstat = 1;
        return ();
    }
    # Quarter of a second interval
    my $interval = 0.25;
    # Capture network stats
    my $get_net_stats = sub {
        my %stats;
        open(my $netstat, '-|', 'netstat -ib');
        while (<$netstat>) {
            next if $. == 1;  # Skip header
            my @fields = split;
            my $iface = $fields[0];
            next if $iface =~ /\*$/;
            my $ibytes = $fields[-5];
            my $obytes = $fields[-2];
            $stats{$iface} = [$ibytes, $obytes];
        }
        close($netstat);
        return \%stats;
    };
    # Capture initial network statistics
    my $before_stats = $get_net_stats->();
    select(undef, undef, undef, $interval);
    # Capture network statistics after the interval
    my $after_stats = $get_net_stats->();
    # Calculate the total received and transmitted bytes
    my ($total_rx_before, $total_tx_before, $total_rx_after, $total_tx_after) = (0, 0, 0, 0);
    foreach my $iface (keys %$before_stats) {
        $total_rx_before += $before_stats->{$iface}->[0];
        $total_tx_before += $before_stats->{$iface}->[1];
        $total_rx_after += $after_stats->{$iface}->[0];
        $total_tx_after += $after_stats->{$iface}->[1];
    }
    my $rbytes = ($total_rx_after - $total_rx_before) / $interval;
    my $tbytes = ($total_tx_after - $total_tx_before) / $interval;
    $rbytes = $rbytes < 0 ? 0 : $rbytes;
    $tbytes = $tbytes < 0 ? 0 : $tbytes;
    my @rs = ($rbytes, $tbytes);
    return \@rs;
}

1;
