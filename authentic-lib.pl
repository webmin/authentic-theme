#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use lib ("$ENV{'THEME_ROOT'}/lib");

use File::Grep qw( fgrep fmap fdo );
use Encode qw( encode decode );
use Time::Local;
use File::Find;

BEGIN {push(@INC, "..");}
use WebminCore;

our (
    %in, %text, %config, %gconfig, %tconfig, %gaccess, $current_lang, $title, $base_remote_user, $remote_user,
    $theme_root_directory,
    $current_theme, $root_directory, $config_directory, $var_directory,

    %theme_text,     %module_text_full, %theme_config, $get_user_level, $theme_webprefix, $http_x_url,
    $has_virtualmin, $has_cloudmin,
    $has_usermin,    $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir, $has_usermin_var_dir);

init_type();
init_config();
do("$ENV{'THEME_ROOT'}/authentic-init.pl");

sub authentic
{
    init();
    header([$title]);
    content();
    footer();
}

sub get_sysinfo_warning
{
    my ($info_ref) = @_;
    my $returned_data = '';

    # Show notifications first
    if (ref($info_ref)) {
        @{$info_ref} =
          sort {($b->{'type'} eq 'warning') <=> ($a->{'type'} eq 'warning')} @{$info_ref};
        $returned_data .= '<br>';
        foreach my $info (@{$info_ref}) {
            if ($info->{'type'} eq 'warning') {
                my $def_level = $info->{'level'} || 'warn';
                my $info_data = $info->{'warning'};

                # Customize hardcode types
                if ($info_data &&
                    $info_data =~ /\/fix_os\.cgi/m)
                {
                    $def_level = 'info';
                }
                if (ref($info_data) eq 'HASH') {
                    $returned_data .= $info_data->{'alert'};
                } else {
                    $returned_data .=
                      replace("ui_submit ui_form_end_submit",
                              "btn-tiny ui_submit ui_form_end_submit",
                              &ui_alert_box($info_data, $def_level, undef, 1, $info->{'desc'}));
                }
            }
        }
    }
    return $returned_data;
}

sub get_extended_sysinfo
{
    my ($info_ref, $x) = @_;
    my $returned_sysinfo = '';

    if ($info_ref) {
        $returned_sysinfo .=
          '<div class="panel-group ui-sortable" id="extended_sysinfo' . $x . '" role="tablist" aria-multiselectable="true">';
        foreach my $info (@{$info_ref}) {
            if ($info->{'id'} ne 'notifications' &&
                $info->{'type'} ne 'link'            &&
                $info->{'module'} ne 'mailbox'       &&
                $info->{'module'} ne 'system-status' &&
                $info->{'type'} ne 'warning'         &&
                $a->{'type'} ne 'warning'            &&
                $b->{'type'} ne 'warning')
            {
                our $charts_not_supported = 'no';
                if ($info->{'type'} eq 'chart') {
                    foreach my $t (@{ $info->{'chart'} }) {
                        if ($t->{'chart'}[0] < 0 || $t->{'chart'}[1] < 0) {
                            $charts_not_supported = 'yes';
                        }
                    }
                }
                if ($theme_config{'settings_sysinfo_hidden_panels_user'} =~ /\'$info->{'id'}\'/) {
                    next;
                }
                if ($info->{'id'} && $charts_not_supported eq 'no') {
                    my $open =
                      ($info->{'open'} || $info->{'id'} eq 'domain') ? ' in' :
                      ($theme_config{'settings_sysinfo_expand_all_accordions'} eq 'true' ? ' in' : '');
                    my $formatted_title = (
                                        $info->{'id'} . '-' .
                                          $info->{'module'} eq 'status_services-status' ?
                                          $theme_text{'theme_xhred_sysinfo_system_monitors'} :
                                          ($info->{'id'} . '-' .
                                             $info->{'module'} eq 'sysinfo-virtual-server' ?
                                             $theme_text{'theme_xhred_sysinfo_software_versions'} :
                                             ($info->{'id'} . '-' .
                                                $info->{'module'} eq 'status-virtual-server' ?
                                                $theme_text{'theme_xhred_sysinfo_server_status'} :
                                                ($info->{'id'} . '-' .
                                                   $info->{'module'} eq 'quota-virtual-server' ?
                                                   $theme_text{'theme_xhred_sysinfo_disk_quotas'} :
                                                   ($info->{'id'} . '-' .
                                                      $info->{'module'} eq 'bw-virtual-server' ?
                                                      $theme_text{'theme_xhred_sysinfo_bandwidth_quotas'} :
                                                      ($info->{'id'} . '-' .
                                                         $info->{'module'} eq 'updates-virtual-server' ?
                                                         $theme_text{'theme_xhred_sysinfo_vm_package_updates'} :
                                                         ($info->{'id'} . '-' . $info->{'module'} eq 'acl_logins-acl' ?
                                                            $theme_text{'theme_xhred_sysinfo_recent_logins'} :
                                                            ($info->{'desc'}))))))));

                    $returned_sysinfo .= '
                    <div draggable="true" data-referrer="' .
                      $info->{'id'} . '" data-sorter="' . $info->{'module'} . '" class="panel '
                      .
                      ( $info->{'level'} ? (' panel-' . ($info->{'level'} ne 'warn' ? $info->{'level'} : 'warning') . '') :
                          'panel-default'
                      ) .
                      ' ui-sortable-handle">
                        <div class="panel-heading" data-toggle="collapse" data-target="#' .
                      $info->{'id'} . '-' . $info->{'module'} .
                      $x . '-collapse" role="tab" id="' . $info->{'id'} . '-' . $info->{'module'} . $x . '">
                          <h4 class="panel-title">
                            <a data-toggle="collapse" href="#'
                      . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse" aria-expanded="'
                      .
                      (
                        ($info->{'open'} ||
                           $info->{'id'} eq 'domain' ||
                           $theme_config{'settings_sysinfo_expand_all_accordions'} eq 'true'
                        ) ? 'true' :
                          'false'
                      ) .
                      '" aria-controls="' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse">
                              '
                      . $formatted_title . '<span class="pull-right on-hover"><i class="fa fa-fw fa-times-thin" '
                      .
                      get_button_tooltip("<span data-no-wrap>" .
                                             theme_text('theme_xhred_tooltip_dashboard_panels_disable', $formatted_title) .
                                             "</span>",
                                         undef,
                                         'auto right'
                      ) .
                      '></i></span></a>
                          </h4>
                        </div>
                    <div id="'
                      . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse" class="panel-collapse collapse' .
                      $open . '" role="tabpanel" aria-labelledby="' . $info->{'id'} . '-' . $info->{'module'} . $x . '">
                      <div class="panel-body '
                      . ($info->{'level'} ? ' alert-' . ($info->{'level'} ne 'warn' ? $info->{'level'} : 'warning') . '' :
                           undef
                      ) .
                      '">';

                    if ($info->{'id'} ne 'plugin_virtualmin-notes' && $info->{'id'} ne 'acl_logins') {
                        $returned_sysinfo .= '<div class="table-responsive">';
                    }

                    if ($info->{'type'} ne 'html') {
                        $returned_sysinfo .= '<table class="table table-striped"><tbody>';
                    }

                    if ($info->{'type'} eq 'table' &&
                        (   $info->{'module'} ne 'system-status' &&
                            $info->{'type'} ne 'link'

                        ))
                    {

                        foreach my $t (@{ $info->{'table'} }) {
                            my $__checkmark = '<i class="fa fa-fw fa-lg fa-check text-success"></i>';
                            my $__stop      = '<i class="fa fa-fw fa-lg fa-times-circle text-danger"></i>';
                            my $__down      = '<i class="fa fa-fw fa-lg fa-minus-circle text-danger"></i>';
                            my $__start     = '<i class="fa fa-fw fa-lg fa-play text-success"></i>';
                            my $__restart   = '<i class="fa fa-fw fa-lg fa-refresh text-info"></i>';

                            $t->{"value"} =~ s/<img src='.*?\/virtual-server\/images\/up.gif'.*?>/$__checkmark/g;
                            $t->{"value"} =~ s/<img src='.*?\/virtual-server\/images\/stop.png'.*?>/$__stop/g;
                            $t->{"value"} =~ s/<img src='.*?\/virtual-server\/images\/down.gif'.*?>/$__down/g;
                            $t->{"value"} =~ s/<img src='.*?\/virtual-server\/images\/start.png'.*?>/$__start/g;
                            $t->{"value"} =~ s/<img src='.*?\/virtual-server\/images\/reload.png'.*?>/$__restart/g;

                            $returned_sysinfo .= '<tr>
                                <td>' . $t->{"desc"} . '</td>
                                <td>' . $t->{"value"} . '</td>
                              </tr>';
                        }
                    } elsif ($info->{'type'} eq 'chart') {
                        $returned_sysinfo .= print_charts($info, $x);
                    } elsif ($info->{'type'} eq 'html') {
                        $info->{'html'} =~ s/<script[^>]*>.*?<\/script>//igs;
                        $returned_sysinfo .= $info->{'html'};
                    }

                    if ($info->{'id'} ne 'plugin_virtualmin-notes' && $info->{'id'} ne 'acl_logins') {
                        my $cltbody;
                        if ($info->{'type'} ne 'html') {
                            $cltbody = "</tbody></table>";
                        }
                        $returned_sysinfo .= "$cltbody</div>";
                    }

                    $returned_sysinfo .= '</div>
                    </div>
                </div>';

                }
            }
        }
        if ($get_user_level eq '0' &&
            $theme_config{'settings_sysinfo_real_time_status'} ne '0'     &&
            $theme_config{'settings_sysinfo_real_time_stored'} ne 'false' &&
            (acl_system_status('cpu') || acl_system_status('mem') || acl_system_status('load')))
        {
            my $data = '<div data-charts-loader class="text-muted loading-dots flex-center">
                          <div class="flex-center-inner">
                            <span class="cspinner"><span class="cspinner-icon light smaller2"></span></span>'
              . $theme_text{'theme_xhred_datatable_sloadingrecords'} . '
                          </div>
                        </div>
                            <span data-chart="cpu"></span>
                            <span data-chart="mem"></span>
                            <span data-chart="virt"></span>
                            <span data-chart="proc"></span>
                            <span data-chart="disk"></span>
                            <span data-chart="net"></span>';
            $returned_sysinfo .=
              print_panel(
                1,
                'live_stats',
"$theme_text{'theme_dashboard_accordion_live_stats'}<span class=\"pull-right on-hover\"><i class=\"fa fa-fw fa-times-thin\" "
                  .
                  get_button_tooltip(
                                     theme_text('theme_xhred_tooltip_dashboard_panels_disable',
                                                $theme_text{'theme_dashboard_accordion_live_stats'}
                                     ),
                                     undef,
                                     'auto right'
                  ) .
                  "></i></span>",
                $data,
                1,
                'A',
                'live_stats');
        }
        $returned_sysinfo .= '</div><br><br><br><br>';
        return $returned_sysinfo;
    }

}

sub print_charts
{
    my ($info, $x) = @_;
    my $returned_sysinfo = '';
    foreach my $t (@{ $info->{'chart'} }) {
        my $unlimited         = 0;
        my $percent_width_1   = int($t->{'chart'}[1]);
        my $percent_width_2   = int($t->{'chart'}[2]);
        my $percent_width_sum = $percent_width_1 + $percent_width_2;
        my $is_2              = defined($t->{'chart'}[2]);

        my $percent_1 = '&nbsp;' . $percent_width_1 . '%';
        my $percent_2 = '&nbsp;' . $percent_width_2 . '%';

        my $dd = $theme_text{'right_out'};
        $dd =~ s/\s|&nbsp;|\$1|\$2//g;

        if ($t->{"value"} !~ /\Q$dd/) {
            $percent_1       = '&nbsp;' . $theme_text{'right_unlimited'};
            $percent_width_1 = '0';
            $unlimited       = 1;
        }

        my $color;
        if ($percent_width_sum <= 49) {
            $color = 'green';
        } elsif ($percent_width_sum <= 90) {
            $color = 'yellow';
        } else {
            $color = 'red';
        }
        if ($unlimited || $percent_width_sum == 0) {
            $color = 'gray';
        }

        my $bar;
        if ($is_2 && !$unlimited && $percent_width_2) {
            $bar = '<strong data-first '
              .
              get_button_tooltip('edit_allquotah', undef, undef, 1, 1,
                                 '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') .
              ' class="bar ' . $color . '" style="width:' . $percent_width_1 . '%;">' . $percent_1 . '</strong>';
            $bar .= '<strong '
              .
              get_button_tooltip('edit_dbquota', undef, undef, 1, 1,
                                 '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') .
              ' class="bar ' . $color . '" style="width:' . $percent_width_2 . '%;">' . $percent_2 . '</strong>';
        } else {
            $bar = '<strong '
              .
              ( $is_2 ?
                  get_button_tooltip('edit_allquotah', undef, undef, 1, 1,
                                     '#' . $info->{'id'} . '-' . $info->{'module'} . $x . '-collapse', '(') :
                  undef
              ) .
              ' class="bar ' . $color . '" style="width:' . $percent_width_1 . '%;">' . $percent_1 . '</strong>';
        }

        $returned_sysinfo .= '<tr>
                                <td style="width:25%">'
          . replace('edit_domain', 'summary_domain', $t->{"desc"}) . '</td>
                                <td style="width:60%">
                                <div class="graph-container">
                                    <div class="graph">' . $bar . '</div>
                                </div>
                                </td>
                                      <td style="width:15%">'
          . $t->{"value"} . '</td>
                              </tr>';
    }

    return $returned_sysinfo;

}

sub print_easypie_charts
{
    my ($cpu_percent, $mem_percent, $virt_percent, $disk_percent) = @_;

    if (defined($cpu_percent) || defined($mem_percent) || defined($virt_percent) || defined($disk_percent)) {

        print '<div class="row" style="margin: 0;">' . "\n";
        my $columns = '3';

        # CPU usage
        defined($cpu_percent)
          &&
          print_easypie_chart($columns,
                              (   ($cpu_percent || $cpu_percent eq "0") ? $cpu_percent :
                                    'NaN'
                              ),
                              $theme_text{'body_cp'},
                              'sysinfo_cpu_percent');

        # Memory allocation
        defined($mem_percent)
          &&
          print_easypie_chart($columns,
                              (   ($mem_percent || $mem_percent eq "0") ? $mem_percent :
                                    'NaN'
                              ),
                              (   ($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_real2'} :
                                    $theme_text{'body_real'}
                              ),
                              'sysinfo_mem_percent');
        defined($virt_percent)
          &&
          print_easypie_chart($columns,
                              (($virt_percent || $virt_percent eq "0") ? $virt_percent : 'NaN'),
                              (   ($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_virt2'} :
                                    $theme_text{'body_virt'}
                              ),
                              'sysinfo_virt_percent');

        # Disk usage
        defined($disk_percent)
          &&
          print_easypie_chart($columns,
                              (   ($disk_percent || $disk_percent eq "0") ? $disk_percent :
                                    'NaN'
                              ),
                              (   ($current_lang eq 'ru' || $current_lang eq 'ru.UTF-8') ? $theme_text{'body_disk2'} :
                                    $theme_text{'body_disk'}
                              ),
                              'sysinfo_disk_percent');

        print '</div>' . "\n";
    }
}

sub print_sysstats_panel_end
{
    print '</div></div>';
}

sub print_sysstats_panel_start
{
    my ($info_ref) = @_;

    my $recollect;
    if ($info_ref) {
        my @recollect = @{$info_ref};
        @recollect = grep {$_->{'id'} =~ /recollect/} @recollect;
        if (@recollect) {
            $recollect =
'<span class="btn btn-transparent-link pull-right _sync_sysinfo_cnt"><i class="fa fa-fw fa fa-reload _sync_sysinfo_" '
              . get_button_tooltip('theme_xhred_tooltip_side_slider_sync_sysinfo', undef, 'auto right')
              . '></i></span>';
        }
    }
    my %virtualmin_config = foreign_config('virtual-server');
    my %cloudmin_config   = foreign_config('server-manager');

    print '<div id="system-status" class="panel panel-default" style="margin-bottom: 5px">' . "\n";
    print '<div class="panel-heading">' . "\n";
    print '<h3 class="panel-title">' .
      $recollect . '' . ($get_user_level eq '3' ? $theme_text{'body_header1'} : $theme_text{'body_header0'})
      .
      ( $cloudmin_config{'docs_link'} &&
          foreign_available("server-manager") ?
          '<a class="btn btn-default pull-right extra_documentation_links" href="' . $cloudmin_config{'docs_link'} .
          '"target="_blank"><i class="fa fa-book"> </i> ' . $cloudmin_config{'docs_text'} . '</a>' :
          undef
      ) .
      '
            '
      . ($virtualmin_config{'docs_link'} &&
           foreign_available("virtual-server") ?
           '<a class="btn btn-default pull-right extra_documentation_links" href="' . $virtualmin_config{'docs_link'} .
           '"target="_blank"><i class="fa fa-book"> </i> ' . $virtualmin_config{'docs_text'} . '</a>' :
           undef
      ) .
      '
    </h3>' . "\n";

    print '</div>';
    print '<div class="panel-body">' . "\n";
}

sub print_sysstats_table
{
    my ($data, $quota, $prod) = @_;

    if ((defined($data) && scalar(@{$data})) ||
        (defined($quota) && scalar(@{$quota})))
    {
        print '<table class="table table-hover">' . "\n";
        if (defined($data) && scalar(@{$data})) {
            foreach my $t (@{ @{$data}[0]->{'table'} }) {
                my $insert = ($t->{"desc"} =~ /\Q$prod/i);
                if ($insert && $get_user_level ne '3') {
                    print_table_row($theme_text{'body_webmin'}, get_webmin_version(1));
                }
                print_table_row($t->{"desc"}, $t->{"value"});
                if ($insert) {
                    print_table_row($theme_text{'theme_version'}, get_theme_user_link());
                }
            }
        }
        if (defined($quota) && scalar(@{$quota})) {
            print_table_row(@{$quota}[0]->{'desc'}, @{$quota}[0]->{"chart"}->[0]->{'value'});
        }
        print '</table>' . "\n";
    }
}

sub print_easypie_chart
{
    my ($columns, $percent, $label, $id) = @_;
    print '<div class="col-md-' . $columns . ' col-md-6 col-xs-6 text-center">' . "\n";
    print '<span class="piechart" data-charts="' . $id . '" data-percent="' . $percent . '">
        <div class="data-cnt">
          <span class="percent"></span>
          <span class="label">' . $label . '</span>
        </div>
    </span>';
    print '</div>' . "\n";
}

sub theme_list_combined_system_info
{
    return &list_combined_system_info({ 'qshow' => 1, 'max' => $theme_config{'settings_sysinfo_max_servers'} });
}

sub show_sysinfo_section
{
    my ($s) = @_;
    my %access = &get_module_acl(undef, 'system-status');
    $access{'show'} ||= "";
    if ($access{'show'} eq '*') {
        return 1;
    } else {
        return &indexof($s, split(/\s+/, $access{'show'})) >= 0;
    }
}

sub get_sysinfo_vars
{
    my ($info_ref) = @_;
    my ($info, $info_arr, @info);

    # Ask for collected info
    if (@_) {
        @info = @{$info_ref};
    } else {
        @info = theme_list_combined_system_info();
    }
    @info = grep {$_->{'id'} eq 'sysinfo'} @info;

    # Define used vars
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
        $authentic_remote_version,
        $local_motd);

    if (@info) {
        $info_arr = @info[0]->{'raw'};
        $info     = @$info_arr[0];
    } else {
        return;
    }

    if (!@$info_arr) {
        return;
    }

    # Require memory information
    my @m;
    if ($info->{'mem'}) {
        @m = @{ $info->{'mem'} };
    }

    # Easypie charts numbers
    if (show_sysinfo_section('cpu') && $info->{'cpu'}) {
        my @c = @{ $info->{'cpu'} };
        $cpu_percent = $c[0] + $c[1] + $c[3];
        $cpu_percent = int($cpu_percent);
    }

    if (show_sysinfo_section('mem')) {
        if (@m && $m[0]) {
            $mem_percent = ($m[0] - $m[1]) / $m[0] * 100;
            $mem_percent = int($mem_percent);
        }
        if (@m && $m[2]) {
            $virt_percent = ($m[2] - $m[3]) / $m[2] * 100;
            $virt_percent = int($virt_percent);
        }
    }
    if (show_sysinfo_section('disk')) {
        if ($info->{'disk_total'}) {
            my ($total, $free) =
              ($info->{'disk_total'}, $info->{'disk_free'});
            $disk_percent = ($total - $free) / $total * 100;
            $disk_percent = int($disk_percent);
        }
    }

    if (show_sysinfo_section('host')) {

        # Operation system
        my $ip =
          $info->{'ips'} ? $info->{'ips'}->[0]->[0] :
          &to_ipaddress(get_system_hostname());
        $ip   = " ($ip)" if ($ip);
        $host = &get_display_hostname() . $ip;
        if (&foreign_available("net")) {
            $host = '<a href=\'' . $theme_webprefix . '/net/list_dns.cgi\'>' . $host . '</a>';
        }

        # Operating System Info
        if ($gconfig{'os_version'} eq '*') {
            $os = $gconfig{'real_os_type'};
        } else {
            $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
        }

        my $is_hidden_link = ($get_user_level ne '0' ? ' hidden-force ' : undef);

        #Webmin version
        $webmin_version =
          product_version_update(get_webmin_version(1), 'w') . ' <div class="btn-group margined-left-4' . $is_hidden_link .
          '"><a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1" data-container="body" title="' .
          $theme_text{'theme_sysinfo_wmdocs'} .
          '" href="http://doxfer.webmin.com" target="_blank"><i class="fa fa-book"></i></a></div>';

        # Virtualmin version
        if ($has_virtualmin) {
            my ($vs_license, $__virtual_server_version);

            $vs_license               = check_pro_package('vm');
            $__virtual_server_version = (defined(@$info_arr[2]) ? @$info_arr[2]->{'vm_version'} : undef);
            $__virtual_server_version =~ s/.gpl//igs;
            $__virtual_server_version =~ s/.pro//igs;

            $virtualmin_version = (
                product_version_update($__virtual_server_version, 'v') . " " . (
                    $vs_license eq '0' ? '' :
                      ''

                      . ' Pro <div class="btn-group margined-left-4' . $is_hidden_link . '">'
                      .
                      ( ($vs_license eq '1') ?
                          ' <a data-license class="btn btn-default btn-xxs" data-container="body" title="' .
                          $theme_text{'right_vlcheck'} . '" href=\'' .
                          $theme_webprefix . '/virtual-server/licence.cgi\'><i class="fa fa-refresh"></i></a></div>' :
                          '</div>'
                      ) .
                      '<a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1' .
                      $is_hidden_link . '" data-container="body" title="' . $theme_text{'theme_sysinfo_vmdocs'} .
                      '" href="http://www.virtualmin.com/documentation" target="_blank"><i class="fa fa-book"></i></a>'

                ));
        }

        # Cloudmin version
        if ($has_cloudmin) {
            my ($cm_licensed, $cm_version, $cm_type, $cm_type_g, $cm_type_p, $cm_version_o);
            $cm_licensed = check_pro_package('cm');
            if (defined(&server_manager::get_module_version_and_type)) {
                ($cm_version, $cm_type) = &server_manager::get_module_version_and_type();
            } else {
                $cm_version_o = (defined(@$info_arr[3]) ? @$info_arr[3]->{'cm_version'} :
                                   (defined(@$info_arr[2]) ? @$info_arr[2]->{'cm_version'} : undef));
                $cm_version_o =~ s/(\.[a-z]+)$//igs;
            }
            $cm_type_g = $cm_version ? $cm_type : '';
            $cm_type_p = $cm_version ? $cm_type : 'Pro';
            $cloudmin_version = (
                product_version_update($cm_version || $cm_version_o, 'c') . " "
                  .
                  ( $cm_licensed eq '0' ? $cm_type_g :
                      ' ' . $cm_type_p . ' <div class="btn-group margined-left-4' . $is_hidden_link . '">'
                      .
                      ( ($cm_licensed eq '1') ?
                          ' <a data-license class="btn btn-default btn-xxs" data-container="body" title="' .
                          $theme_text{'right_slcheck'} . '" href=\'' .
                          $theme_webprefix . '/server-manager/licence.cgi\'><i class="fa fa-refresh"></i></a></div>' :
                          '</div>'
                      ) .
                      '<a class="btn btn-default btn-xxs btn-hidden hidden margined-left--1' .
                      $is_hidden_link . '" data-container="body" title="' . $theme_text{'theme_sysinfo_cmdocs'} .
'" href="http://www.virtualmin.com/documentation/cloudmin" target="_blank"><i class="fa fa-book"></i></a>'
                  ));
        }

        # Fetch theme version
        if ($get_user_level eq '0') {

            # Theme version/update
            my $authentic_remote_data                = theme_remote_version(1);
            my $authentic_installed_version          = theme_version();
            my ($authentic_installed_version_parsed) = $authentic_installed_version =~ /([0-9\.]+)/;
            my $authentic_installed_version_devel    = $authentic_installed_version =~ /alpha|beta|RC/;
            my $incompatible                         = theme_update_incompatible($authentic_remote_data);

            ($authentic_remote_version) = $authentic_remote_data =~ /^version=(.*)/gm;
            my $authentic_remote_version_local = $authentic_remote_version;

            if ($incompatible && $authentic_remote_version_local !~ /alpha|beta|RC/) {
                $authentic_remote_version = $authentic_installed_version;
            }

            if (
                $theme_config{'settings_sysinfo_theme_updates'} eq 'true' && (
                       (!$incompatible || ($incompatible && $authentic_remote_version_local =~ /alpha|beta|RC/))
                    &&
                    (
                        (($authentic_remote_version_local !~ /alpha|beta|RC/ && $authentic_installed_version_devel) &&
                         lc($authentic_remote_version_local) ge $authentic_installed_version_parsed
                        ) ||
                        lc($authentic_remote_version_local) gt lc($authentic_installed_version))

                ))
            {
                my $authentic_remote_beta        = $authentic_remote_version_local =~ /alpha|beta|RC/;
                my $authentic_remote_alpha_beta  = $authentic_remote_version_local =~ /alpha|beta/;
                my $authentic_remote_version_tag = $authentic_remote_version_local;
                my @_remote_version_tag          = split /-/, $authentic_remote_version_tag;
                $authentic_remote_version_tag = $_remote_version_tag[0];

                $authentic_theme_version =
                  '<a href="https://github.com/authentic-theme/authentic-theme" target="_blank">' .
                  $theme_text{'theme_name'} . '</a> ' . $authentic_installed_version . '. ' .
                  ($authentic_remote_beta ? $theme_text{'theme_git_patch_available'} : $theme_text{'theme_update_available'})
                  . ' ' . $authentic_remote_version_local .
                  '&nbsp;&nbsp;&nbsp;<div class="btn-group">' . '<a data-git="1" data-stable="' .
                  ((($authentic_remote_beta && $tconfig{'beta_updates'} eq '1') || $authentic_installed_version_devel) ?
                    0 : 1) .
                  '" class="btn btn-xxs btn-' . ($authentic_remote_beta ? 'warning' : 'success') .
                  ' authentic_update" href=\'' . $theme_webprefix . '/tconfig.cgi\'><i class="fa fa-fw ' .
                  ($authentic_remote_beta ? 'fa-git-pull' : 'fa-refresh') . '">&nbsp;</i>' . $theme_text{'theme_update'} .
                  '</a>' . '<a class="btn btn-xxs btn-info ' . ($authentic_remote_alpha_beta ? 'hidden' : 'btn-info') .
'" target="_blank" href="https://github.com/authentic-theme/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-fw fa-pencil-square-o">&nbsp;</i>'
                  . $theme_text{'theme_changelog'}
                  . '</a>' . '<a data-remove-version="' . $authentic_remote_version_local .
                  '" class="btn btn-xxs btn-warning' . ($authentic_remote_beta ? ' hidden' : '') .
                  '" target="_blank" href="https://github.com/authentic-theme/authentic-theme/releases/download/' .
                  $authentic_remote_version_tag . '/authentic-theme-' . $authentic_remote_version_local .
                  '.wbt.gz"><i class="fa fa-fw fa-download">&nbsp;</i>' . $theme_text{'theme_download'} .
                  '</a>' . '<a class="btn btn-xxs btn-primary" href=\'' . $theme_webprefix . '/tconfig.cgi\' data-href=\'' .
                  $theme_webprefix . '/tconfig.cgi\' ><i class="fa fa-fw fa-cogs">&nbsp;</i>' .
                  $theme_text{'theme_xhred_global_configuration'} . '</a>' . '</div>';

            } else {
                $authentic_theme_version = get_theme_user_link();
            }
        } else {
            $authentic_theme_version = get_theme_user_link();
        }

        # Load ConfigServer Security & Firewall lib if available
        ($csf_title, $csf_data, $csf_remote_version) = lib_csf_control('strings');

        #System time
        my ($_time);
        $_time      = time();
        $local_time = localtime($_time);
        my $no_theme_date_time = $theme_config{'settings_theme_make_date'} eq 'false';
        if (foreign_available("time")) {
            if ($no_theme_date_time) {
                $local_time = '<a href=\'' . $theme_webprefix . '/time/\'>' . $local_time . '</a>';
            } else {
                $local_time = '<a data-convertible-timestamp-full="' . $_time . '"  data-convertible-date-full="' .
                  $local_time . '" href=\'' . $theme_webprefix . '/time/\'>' . $local_time . '</a>';
            }
        } else {
            if ($no_theme_date_time) {
                $local_time = '<span>' . $local_time . '</span>';
            } else {
                $local_time = '<span data-convertible-timestamp-full="' .
                  $_time . '"   data-convertible-date-full="' . $local_time . '" >' . $local_time . '</span>';
            }
        }
    }

    if (show_sysinfo_section('cpu')) {

        # Kernel and arch
        if ($info->{'kernel'}) {
            $kernel_arch =
              &theme_text('body_kernelon',
                          $info->{'kernel'}->{'os'},
                          $info->{'kernel'}->{'version'},
                          $info->{'kernel'}->{'arch'});
        }

        # CPU Type and cores
        my @c;
        if ($info->{'load'}) {
            @c = @{ $info->{'load'} };
            if (@c > 3) {
                $cpu_type = &theme_text('body_cputype', @c);
            }
        }
    }

    if (show_sysinfo_section('temp')) {

        # Temperatures
        if ($info->{'cputemps'}) {
            my $cpucores = scalar(@{ $info->{'cputemps'} });
            foreach my $t (@{ $info->{'cputemps'} }) {
                $cpu_temperature .=
                  '<span class="badge-custom badge-drivestatus badge-cpustatus" data-stats="cpu"> ' .
                  ($cpucores > 1 ? ($theme_text{'theme_global_core'} . ' ' . (int($t->{'core'}) + 1) . ': ') : '')
                  .
                  ( get_module_config_data('system-status', 'collect_units') ?
                      (int(($t->{'temp'} * 9.0 / 5) + 32) . "&#176;F") :
                      (int($t->{'temp'}) . '&#176;C ')
                  ) .
                  '</span>';
            }
            if ($info->{'cpufans'}) {
                my $cpufans = scalar(@{ $info->{'cpufans'} });
                foreach my $t (@{ $info->{'cpufans'} }) {
                    $cpu_fans .=
                      '<span class="badge-custom badge-drivestatus badge-cpufans bg-semi-transparent" data-stats="fans"> ' .
                      ($cpufans > 1 ? ($theme_text{'theme_global_fan'} . ' ' . $t->{'fan'} . ': ') : '') .
                      "$t->{'rpm'} $theme_text{'body_cpufan_rpm'}" . '</span>';
                }
            }
        }
        if ($info->{'drivetemps'}) {
            foreach my $t (@{ $info->{'drivetemps'} }) {
                my $short = $t->{'device'};
                $short =~ s/^\/dev\///;
                my $emsg;
                if ($t->{'errors'}) {
                    $emsg .=
                      '&nbsp;&nbsp;<span class="label bg-primary-dark status-error">' .
                      &theme_text('body_driveerr', $t->{'errors'}) . "</span>";
                } elsif ($t->{'failed'}) {
                    $emsg .=
                      '&nbsp;&nbsp;<span class="label bg-danger-dark status-error">' .
                      &theme_text('body_drivefailed') . '</span>';
                }
                $hdd_temperature .= '<span class="badge-custom badge-drivestatus" data-stats="drive">' . $short . ': '
                  .
                  ( get_module_config_data('system-status', 'collect_units') ?
                      (int(($t->{'temp'} * 9.0 / 5) + 32) . "&#176;F") :
                      (int($t->{'temp'}) . '&#176;C ')
                  ) .
                  $emsg . '</span>';
            }
        }
    }

    if (show_sysinfo_section('load')) {

        # System uptime
        if (foreign_check("proc") && foreign_available("proc")) {
            foreign_require("proc");

            my @system_uptime = defined(&proc::get_system_uptime) ? proc::get_system_uptime() : ();
            if (@system_uptime) {
                my ($day, $hour, $minute) = @system_uptime;
                my $uptime_text;
                if ($day) {
                    $uptime_text = &theme_text('body_updays', $day, $hour, $minute);
                } elsif ($minute && $hour) {
                    $uptime_text = &theme_text('body_uphours', $hour, $minute);
                } elsif ($minute) {
                    $uptime_text = &theme_text('body_upmins', $minute);
                }

                $uptime = '<a href=\'' . $theme_webprefix . '/init/\'>' . $uptime_text . '</a>';

            }

            # Running processes
            my @procs = proc::list_processes();
            $running_proc = scalar(@procs);
            $running_proc = '<a href=\'' . $theme_webprefix . '/proc/index_tree.cgi\'>' . $running_proc . '</a>';
        }

        # Load averages
        if ($info->{'load'}) {
            my @c = @{ $info->{'load'} };
            if (@c) {
                $load = &theme_text('body_load', @c);
            }
        }
    }

    if (show_sysinfo_section('mem')) {

        # Memory
        if (@m) {

            # Real memory details
            if ($m[0] && $m[1]) {
                $real_memory =
                  &theme_text($m[4] ? 'body_used_cached_total' : 'body_used',
                              nice_size(($m[0]) * 1024,         -1),
                              nice_size(($m[0] - $m[1]) * 1024, -1),
                              ($m[4] ? nice_size($m[4] * 1024, -1) : undef));
            }

            # Virtual memory details
            if ($m[2] > 0) {
                $virtual_memory =
                  &theme_text('body_used', nice_size(($m[2]) * 1024, -1), nice_size(($m[2] - $m[3]) * 1024, -1));
            }

            if (get_text_ltr()) {
                $real_memory = reverse_string($real_memory, "/");
                if ($virtual_memory) {
                    $virtual_memory = reverse_string($virtual_memory, "/");
                }
            }
        }
    }

    if (show_sysinfo_section('disk')) {

        # Local disk space
        if ($info->{'disk_total'} && $info->{'disk_total'}) {
            $disk_space = &theme_text('body_used_and_free',
                                      nice_size($info->{'disk_total'},                        -1),
                                      nice_size($info->{'disk_free'},                         -1),
                                      nice_size($info->{'disk_total'} - $info->{'disk_free'}, -1));

            if ($disk_space && get_text_ltr()) {
                $disk_space = reverse_string($disk_space, "/");
            }
        }
    }

    if (show_sysinfo_section('poss')) {

        # Package updates
        if (&foreign_available("package-updates") && $info->{'poss'}) {
            my $msg;
            my @poss = @{ $info->{'poss'} };
            my @secs = grep {$_->{'security'}} @poss;

            my $poss = scalar(@poss);
            my $secs = scalar(@secs);

            if ($poss && $secs) {
                $msg = &theme_text(
                                   ($poss gt 1 &&
                                      $secs gt 1 ? 'body_upsec'  : $poss gt 1 &&
                                      $secs eq 1 ? 'body_upsec1' : $poss eq 1 &&
                                      $secs gt 1 ? 'body_upsec2' : 'body_upsec3'
                                   ),
                                   $poss,
                                   $secs);
            } elsif ($poss) {
                $msg = &theme_text(($poss gt 1 ? 'body_upneed' : 'body_upneed1'), $poss);
            } else {
                $msg = $theme_text{'body_upok'};
            }

            $msg =~ s/([0-9]+)/"<i class=\'badge badge-danger font-style-normal\'> $1 <\/i>"/eg;
            $package_message =
              '<a href=\'' . $theme_webprefix . '/package-updates/index.cgi?mode=updates\'>' . $msg . '</a>';

        }
    }

    # Get broadcasted, local message of the day from admins
    $local_motd = get_all_users_motd_data();

    return ($cpu_percent,
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
            $authentic_remote_version,
            $local_motd);

}

sub put_user_motd
{
    my ($data) = @_;
    my ($tvardir, $webmin_var) = theme_var_dir();
    my $user_motd_file = "$tvardir/motd.$remote_user";
    $data = &serialise_variable($data);
    &write_file_contents($user_motd_file,                                             $data);
    &write_file_contents(replace($webmin_var, $has_usermin_var_dir, $user_motd_file), $data)
      if ($has_usermin_var_dir);
}

sub get_user_motd
{
    my ($file) = @_;
    if (-r $file) {
        my $data = &read_file_contents($file);
        return &unserialise_variable($data);
    }
    return;
}

sub get_all_users_motd_data
{
    my ($specific_user) = @_;
    my ($tvardir)       = theme_var_dir();
    my @users_motd_files;
    my %users_motd;
    find(
        {
           wanted => sub {
               push(@users_motd_files, "$tvardir/$_")
                 if ((!$specific_user && $_ =~ /^motd\.[a-zA-Z0-9\_\-]+$/) ||
                     ($specific_user =~ /^[a-zA-Z0-9\_\-]+$/ && $_ =~ /^motd\.$specific_user$/));
           },
        },
        $tvardir);
    foreach my $user_motd_file (@users_motd_files) {
        my $user_motd = get_user_motd($user_motd_file);
        my ($user) = $user_motd_file =~ /\.([^.]+)$/;
        if ($user_motd) {
            my @user_motd_allowed;
            foreach my $motd (@{$user_motd}) {

                # Skip message if cannot be displayed for the given user
                if ($specific_user ||
                    ($motd->{'target'} eq 'all' ||
                        ($get_user_level eq '0' && $motd->{'target'} eq 'adm') ||
                        ($get_user_level eq '1' && $motd->{'target'} eq 'res') ||
                        ($get_user_level eq '2' && $motd->{'target'} eq 'vm')  ||
                        ($get_user_level eq '3' && $motd->{'target'} eq 'um')  ||
                        ($get_user_level eq '4' && $motd->{'target'} eq 'cm')))
                {
                    # Remove any script tag
                    $motd->{'msg'} =~ s/<script.+?>//g;

                    # Extract possible link in message
                    my ($href) = $motd->{'msg'} =~ /(?|<a.*?href=\s*['"](.*?)['">]|<a.*?href=\s*(.*?)[\s*>])/;

                    # Remove all attrs from tags
                    $motd->{'msg'} =~ s/(<[a-zA-Z]+).*?(>)/$1$2/gi;

                    # Restore link if any
                    $motd->{'msg'} =~ s/<a>/<a href='$href'>/g if ($href);

                    # Push as allowed
                    push(@user_motd_allowed, $motd);
                }
            }
            $users_motd{ lc($user) } = \@user_motd_allowed;
        }
    }
    return \%users_motd;
}

sub get_current_user_config
{
    our ($___user) =
      grep {$_->{'name'} eq $base_remote_user} &acl::list_users();
    return $___user;
}

sub get_col_num
{
    my ($info, $max_col) = @_;
    my $num_col = 0;
    if ($info->{'cpu'}) {$num_col++;}
    if ($info->{'mem'}) {
        my @m = @{ $info->{'mem'} };
        if (@m && $m[0]) {$num_col++;}
        if (@m && $m[2]) {$num_col++;}
    }
    if ($info->{'disk_total'}) {$num_col++;}
    my $col = $max_col / $num_col;
    return $col;
}

sub print_table_row
{
    my ($title, $content, $id) = @_;
    print '<tr>' . "\n";
    print '<td style="width:30%;"><strong>' . $title . '</strong></td>' . "\n";
    print '<td  style="width:70%;"><span data-id="' . $id . '">' . $content . '</span></td>' . "\n";
    print '</tr>' . "\n";
}

sub print_table_row_responsive
{
    my ($title, $content, $id, $title2, $content2, $id2) = @_;
    print '<tr>' . "\n";
    print '<td style="width:' . ($title2 ? '20' : '') . '%;"><strong>' . $title . '</strong></td>' . "\n";
    print '<td  style="width:' .
      ($title2 ? '30' : '') . '%;"><span data-id="' . $id . '">' . $content . '</span></td>' . "\n";
    if ($title2) {
        print '<td style="width:15%;"><strong>' . $title2 . '</strong></td>' . "\n";
        print '<td  style="width:35%;"><span data-id="' . $id2 . '">' . $content2 . '</span></td>' . "\n";
        print '</tr>' . "\n";
    }
}

sub print_favorites
{

    # Support for previous installs
    my $ff = $config_directory . "/$current_theme/favorites.json";
    if (-r $ff) {
        my $ffn = $ff;
        $ffn =~ s/\.json/-$remote_user.json/;
        rename_file($ff, $ffn);
    }

    my $f = &read_file_contents($config_directory . "/$current_theme/favorites-$remote_user.json");
    print '<div id="favorites-menu">
    <div class="favorites-menu-outer">
      <nav class="favorites-menu">
          <ul class="favorites-menu-content ui-sortable">
              <li class="menu-exclude exclude favorites-title">
                <h1><i class="fa fa-star-o"></i>&nbsp;&nbsp;'
      . $theme_text{'left_favorites'} .
'<sup style="position: absolute; margin: 25px 0 0 -10px;" class="hidden">&nbsp;&nbsp;<small class="text-white"> <a aria-label="'
      . $theme_text{'theme_xhred_filemanager_context_edit'}
      . '" href="' .
      $theme_webprefix . '/settings-editor_' . (foreign_available('webmin') ? undef : 'favorites_') . 'read.cgi?file=' .
      $config_directory . '/' . $current_theme . '/favorites-' . $remote_user . '.json" class="fa fa-pencil-square-o' .
      ($f =~ m/"favorites":/ ? '' : ' hidden') . '" style="display: inline; font-size: 1em;"></a></small></sup></h1>
              </li>';

    if ($f && $f =~ m/"favorites":/) {
        my ($f) = $f =~ /\{(?:\{.*\}|[^{])*\}/sg;
        eval {
            my $fc = convert_from_json($f);
            foreach my $favorite (@{ $fc->{'favorites'} }) {
                my $ln = quote_escape($favorite->{"link"}, '"');
                my $ic = quote_escape($favorite->{"icon"}, '"');
                my $tl = html_escape($favorite->{"title"});
                if (length($ln)) {
                    print '
              <li class="menu-exclude ui-sortable-handle">
                  <a class="menu-exclude-link" href="'
                      . ((string_starts_with($ln, "!edit") || string_starts_with($ln, "!view")) ?
                           undef :
                           $theme_webprefix
                      ) .
                      ($ln) . '"><i data-product="' . ($ic) . '" class="wbm-' .
                      ($ic) . ' wbm-sm">&nbsp;</i><span class="f__c">
                            ' . $tl . '
                        &nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px">';
                    print '<i aria-label="' .
                      $theme_text{'theme_xhred_favorites_remove'} . '" class="fa fa-times"></i></small></span>
                  </a>
              </li>';
                }
            }
        };
    }
    print '
              <li class="menu-exclude exclude favorites-no-message'
      . ($f !~ m/"favorites":/ ? '' : ' hidden') . '">
                    <span>' . $theme_text{'left_favorites_no'} . '</span>
              </li>
        ';

    print '
        </ul>
      </nav>
    </div>
    <a aria-label="' . $theme_text{'theme_xhred_global_close'} . '" class="favorites-menu-close">
      <div class="favorites-menu-icon">
        <div class="favorites-menu-bar"></div>
        <div class="favorites-menu-bar"></div>
      </div>
    </a>
</div>';
}

sub print_panels_group_start
{
    my ($id, $get) = @_;
    my $str = '<div class="panel-group ui-sortable" id="' . $id . '" role="tablist" aria-multiselectable="true">';
    if ($get) {
        return $str;
    }
    print $str;
}

sub print_panels_group_end
{
    my ($get) = @_;
    my $str = '</div>';
    if ($get) {
        return $str;
    }
    print $str;
}

sub print_panel
{
    my ($opened, $id, $title, $data, $get, $sorter, $ref) = @_;
    if ($sorter) {
        $sorter = ' data-sorter="' . $sorter . '" ';
    }
    if ($ref) {
        $ref = ' data-referrer="' . $ref . '" ';
    }
    my $str = '
              <div draggable="true"' . $sorter . ' class="panel panel-default ui-sortable-handle"' . $ref . '>
                  <div class="panel-heading" data-toggle="collapse" data-target="#' .
      $id . '-collapse" role="tab" id="' . $id . '">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#'
      . $id . '-collapse" aria-expanded="'
      .
      ( $opened ? 'true' :
          'false'
      ) .
      '" aria-controls="' . $id . '-collapse">' . $title . '</a>
                    </h4>
                  </div>
              <div id="'
      . $id . '-collapse" class="panel-collapse collapse' .
      ($opened ? ' in' : '') . '" role="tabpanel" aria-labelledby="' . $id . '">
                <div class="panel-body">' . $data . '</div></div></div>';
    if ($get) {
        return $str;
    }
    print $str;
}

sub parse_license_date
{
    if ($_[0] =~ /^(\d{4})-(\d+)-(\d+)$/) {
        return eval {timelocal(0, 0, 0, $3, $2 - 1, $1 - 1900)};
    }
    return undef;
}

sub embed_logo
{

    my $lgt;
    my $img;

    ((get_env('script_name') eq '/session_login.cgi' || get_env('script_name') eq '/pam_login.cgi') ?
       ($lgt = 'logo_welcome') :
       ($lgt = 'logo'));

    my $lnk = $config_directory . "/$current_theme/" . $lgt . ".png";
    if (-r $lnk) {
        $img = ('<img src="data:image/png;base64,' . encode_base64(read_file_contents($lnk)) . '">');
    }

    if ($get_user_level eq '1') {
        my %reseller = get_user_acl(undef, 'virtual-server');
        if (length $reseller{'logo'} > 4 && $reseller{'link'}) {
            $img = ('<a class="pointer-events-auto" target="_blank" href="' .
                    $reseller{'link'} . '"><img src="' . $reseller{'logo'} . '"></a>');
        } elsif ($reseller{'logo'}) {
            $img = ('<img src="' . $reseller{'logo'} . '">');
        }

    }

    if ($img && $img !~ /="none"/) {
        print '<div class="__' . $lgt . ' _' . $lgt . '">';
        print $img;
        print '</div>' . "\n";
    }
}

sub head
{
    print "Content-type: text/html\n\n";
}

sub embed_login_head
{
    my ($inline) = @_;
    my $ext = (theme_debug_mode() ? 'src' : 'min');

    # Define page title
    my $title = $text{'session_header'};

    print '<head>',                                           "\n";
    print ' <meta name="color-scheme" content="only light">', "\n";
    embed_noscript();
    print '<meta charset="utf-8">', "\n";
    embed_favicon('login-page');
    print '<title>', $title, '</title>', "\n";
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";

    if ($inline) {
        my $file_contents = read_file_contents("$root_directory/$current_theme/unauthenticated/css/bundle.min.css");
        print '<style>';
        print $file_contents;
        print '</style>';

        if (theme_night_mode_login()) {
            my $file_contents =
              read_file_contents("$root_directory/$current_theme/unauthenticated/css/palettes/nightrider.min.css");
            print '<style>';
            print $file_contents;
            print '</style>';
        }
        my $file_contents = read_file_contents("$root_directory/$current_theme/unauthenticated/css/fonts-roboto.min.css");
        print '<style>';
        print $file_contents;
        print '</style>';

    } else {
        print '<link href="' .
          $theme_webprefix . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";

        print
'<script>document.addEventListener("DOMContentLoaded", function(event) {var a=document.querySelectorAll(\'input[type="password"]\');i=0;
for(length=a.length;i<length;i++){var b=document.createElement("span"),d=30<a[i].offsetHeight?1:0;b.classList.add("input_warning_caps");b.setAttribute("title","Caps Lock");d&&b.classList.add("large");a[i].classList.add("use_input_warning_caps");a[i].parentNode.insertBefore(b,a[i].nextSibling);a[i].addEventListener("blur",function(){this.nextSibling.classList.remove("visible")});a[i].addEventListener("keydown",function(c){"function"===typeof c.getModifierState&&((state=20===c.keyCode?!c.getModifierState("CapsLock"):
c.getModifierState("CapsLock"))?this.nextSibling.classList.add("visible"):this.nextSibling.classList.remove("visible"))})};});function spinner() {var x = document.querySelector(\'button i.fa-sign-in:not(.invisible)\') || document.querySelector(\'button i.fa-qrcode:not(.invisible)\'),s = \'<span class="cspinner_container"><span class="cspinner"><span class="cspinner-icon white small"></span></span></span>\';if(x){x.classList.add("invisible"); x.insertAdjacentHTML(\'afterend\', s);x.parentNode.classList.add("disabled");x.parentNode.disabled=true}}setTimeout(function(){if(navigator&&navigator.oscpu){var t=navigator.oscpu,i=document.querySelector("html"),e="data-platform";t.indexOf("Linux")>-1?i.setAttribute(e,"linux"):t.indexOf("Windows")>-1&&i.setAttribute(e,"windows")}});</script>';

        embed_css_night_rider();
        embed_css_fonts();
    }

    embed_background();
    embed_styles();
    embed_overlay_head();
    print '</head>', "\n";
}

sub error_40x
{
    my %miniserv;
    get_miniserv_config(\%miniserv);

    our %theme_config = (settings($config_directory . "/$current_theme/settings-admin", 'settings_'),
                         settings($config_directory . "/$current_theme/settings-root",  'settings_'));

    # Get block time to refresh the page afterwards
    my $block_time =
      $miniserv{'blockhost_time'} < $miniserv{'blockuser_time'} ? $miniserv{'blockuser_time'} : $miniserv{'blockhost_time'};
    if ($block_time < 30) {
        $block_time = 30;
    }
    $block_time += 5;

    my $sec     = lc(get_env('https')) eq 'on' ? "; secure" : "";
    my $sidname = "sid";
    print "Set-Cookie: $sidname=x; path=/$sec\r\n" if ($in{'logout'});
    print "Set-Cookie: redirect=1; path=/\r\n";
    print "Set-Cookie: testing=1; path=/$sec\r\n";
    my $charset = &get_charset();
    &PrintHeader($charset);
    print '<!DOCTYPE HTML>', "\n";
    print '<html data-bgs="'
      .
      ( theme_night_mode() ? 'nightRider' :
          'gainsboro'
      ) .
      '" class="error_40x">', "\n";
    embed_login_head(!$main::session_id);
    print '<body class="error_40x" ' . $tconfig{'inbody'} . '>' . "\n";
    print '<meta http-equiv="refresh" content="' . $block_time . '; url=' .
      ($theme_webprefix ? $theme_webprefix : '/') . '">';
    embed_overlay_prebody();
    print '<div class="container error_40x" data-dcontainer="1">' . "\n";

    if (defined($in{'code'})) {
        my $file = get_env('request_uri');
        if ($file) {
            $file = "&nbsp; —  <kbd data-error>" . html_escape("$file") . "</kbd>";
        }
        print '<div class="alert alert-danger error_40x">' . "\n";
        print '<strong><i class ="fa fa-exclamation-triangle"></i> ' .
          html_escape($in{'code'}) . '</strong><br><span>' . html_escape($in{'message'}) . "$file</span>\n";
        print '</div>' . "\n";
    }
    &footer();
}

sub theme_update_incompatible
{
    my ($authentic_remote_data, $force_stable) = @_;

    my $webmin_compatible_version;
    my $usermin_compatible_version;
    my @notice;

    $force_stable ||= 0;

    my $force_button =
      '<a data-git="1" data-stable="' .
      $force_stable . '" data-force="1" class="authentic_update text-darker" href="javascript:;">' .
      $theme_text{'theme_xhred_global_click_here'} . '</a>';
    my $usermin_enabled_updates = ($theme_config{'settings_sysinfo_theme_updates_for_usermin'} ne 'false' ? 1 : 0);
    my ($authentic_remote_version) = $authentic_remote_data =~ /^version=(.*)/gm;

    $authentic_remote_data =~ /^depends=(\d.\d\d\d)\s+(\d.\d\d\d)|(\d.\d\d\d)/gm;
    $webmin_compatible_version  = $3 ? $3 : $1;
    $usermin_compatible_version = $2;

    my $webmin_version_file  = "$root_directory/version";
    my $usermin_version_file = "$has_usermin_root_dir/version";
    my $get_latest_dev       = sub {
        my ($file, $var) = @_;
        if (-r $file) {
            my $version_dev = read_file_lines($file, 1)->[0];
            if ($version_dev =~ /\d\.\d{4,}/) {
                my @file_stat = stat($file);
                if ($file_stat[9] > time() - (60 * 60)) {
                    ${$var} = 1;
                }
            }
        }
    };

    # Do we have latest dev version of Webmin installed
    &$get_latest_dev($webmin_version_file, \$webmin_compatible_version);

    # Do we have latest dev version of Usermin installed
    &$get_latest_dev($usermin_version_file, \$usermin_compatible_version);

    if (

        ($authentic_remote_version                           &&
         $webmin_compatible_version                          &&
         $usermin_compatible_version                         &&
         (get_webmin_version() < $webmin_compatible_version) &&
         ($has_usermin && $usermin_enabled_updates && $has_usermin_version < $usermin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                           theme_text('theme_git_patch_incompatible_message',
                                      $theme_text{'theme_name'},
                                      $authentic_remote_version,
                                      $theme_text{'theme_xhred_titles_wm'},
                                      $webmin_compatible_version,
                                      $theme_text{'theme_xhred_titles_um'},
                                      $usermin_compatible_version
                             ) .
                             " "
                             .
                             theme_text('theme_git_patch_incompatible_message_desc',
                                        $force_button,
                                        ($theme_text{'theme_xhred_titles_wm'} . "/" . $theme_text{'theme_xhred_titles_um'}))
                    ) };
    } elsif (

        ($authentic_remote_version && $webmin_compatible_version && (get_webmin_version() < $webmin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                                       theme_text('theme_git_patch_incompatible_message_s',
                                                  $theme_text{'theme_name'},
                                                  $authentic_remote_version,
                                                  $theme_text{'theme_xhred_titles_wm'},
                                                  $webmin_compatible_version
                                         ) .
                                         " "
                                         .
                                         theme_text('theme_git_patch_incompatible_message_desc',
                                                    $force_button,
                                                    $theme_text{'theme_xhred_titles_wm'})
                    ) };
    } elsif (

        ($authentic_remote_version   &&
         $usermin_compatible_version &&
         ($has_usermin && $usermin_enabled_updates && $has_usermin_version < $usermin_compatible_version))

      )
    {
        @notice = {
                    "incompatible" => (
                                       theme_text('theme_git_patch_incompatible_message_s',
                                                  $theme_text{'theme_name'},
                                                  $authentic_remote_version,
                                                  $theme_text{'theme_xhred_titles_um'},
                                                  $usermin_compatible_version
                                         ) .
                                         " "
                                         .
                                         theme_text('theme_git_patch_incompatible_message_desc',
                                                    $force_button,
                                                    $theme_text{'theme_xhred_titles_um'})
                    ) };
    }

    return @notice;
}

sub theme_remote_version
{

    my ($data, $force_stable_check, $force_beta_check, $nocache) = @_;

    my $remote_version = 0;
    my $remote_release;
    my $error;
    my $installed_version_devel = theme_version() =~ /alpha|beta|RC/;

    if (($theme_config{'settings_sysinfo_theme_updates'} eq 'true' || $data) && $get_user_level eq '0' && $in =~ /xhr-/) {
        if (($tconfig{'beta_updates'} eq '1' || $force_beta_check || $installed_version_devel) && !$force_stable_check) {
            if (!$nocache) {
                $remote_version = theme_cached('version-theme-development');
            }
            if (!$remote_version) {
                http_download('api.github.com',                                             '443',
                              '/repos/authentic-theme/authentic-theme/contents/theme.info', \$remote_version,
                              \$error,                                                      undef,
                              1,                                                            undef,
                              undef,                                                        30,
                              undef,                                                        undef,
                              { 'accept', 'application/vnd.github.v3.raw' });
                theme_cached('version-theme-development', $remote_version, $error);

            }

        } else {
            if (!$nocache) {
                $remote_version = theme_cached('version-theme-stable');
            }
            if (!$remote_version) {
                http_download('api.github.com', '443', '/repos/authentic-theme/authentic-theme/releases/latest',
                              \$remote_release, \$error, undef, 1, undef, undef, 30);
                $remote_release =~ /tag_name":"(.*?)"/;
                http_download('api.github.com',                                                            '443',
                              '/repos/authentic-theme/authentic-theme/contents/theme.info?ref=' . $1 . '', \$remote_version,
                              \$error,                                                                     undef,
                              1,                                                                           undef,
                              undef,                                                                       30,
                              undef,                                                                       undef,
                              { 'accept', 'application/vnd.github.v3.raw' });
                theme_cached('version-theme-stable', $remote_version, $error);
            }
        }
    }
    if ($data) {
        return $remote_version;
    } else {
        ($remote_version) = $remote_version =~ /^version=(.*)/m;
        return $remote_version;
    }

}

sub theme_cached
{
    my ($id, $cvalue, $error) = @_;
    $id || die "Can't use undefined as cache filename";

    my ($theme_var_dir) = theme_var_dir();
    my $fcached         = "$theme_var_dir/$id";
    my @cached          = stat($fcached);
    my $ctime           = $theme_config{'settings_cache_interval'} || 24 * 60 * 60;
    my $cache           = read_file_contents($fcached);
    my $cdata           = $cache ? unserialise_variable($cache) : undef;
    my @data;

    if (@cached && $cached[9] > time() - $ctime) {

        # Use cache for now
        @data = @$cdata;
    } else {

        # Error when catching remote data
        if ($error) {
            if ($cdata) {

                # Error: Use current cache for another period
                @data = @$cdata;
            } else {

                # Error: No cache available
                return undef;
            }
        } elsif ($cvalue) {

            # Use supplied data
            push(@data, $cvalue);
        }

        if (@data) {

            # Write cache
            my $fh = "cache";
            open_tempfile($fh, ">$fcached");
            print_tempfile($fh, serialise_variable(\@data));
            close_tempfile($fh);
        }
    }
    return wantarray ? @data : $data[0];
}

sub theme_var_dir
{

    my $product_var = $var_directory || get_env('webmin_var');
    if (!$product_var) {
        open(VARPATH, "$config_directory/var-path");
        chop($product_var = <VARPATH>);
        close(VARPATH);
    }

    my $var_dir       = $product_var . "/modules";
    my $theme_var_dir = "$var_dir/$current_theme";

    if (!-d $var_dir) {
        mkdir($var_dir, 0700);
    }
    if (!-d $theme_var_dir) {
        mkdir($theme_var_dir, 0700);
    } else {
        chmod(0700, $theme_var_dir);
    }
    return ($theme_var_dir, $product_var);
}

sub clear_theme_cache
{
    my ($root)  = @_;
    my $salt    = substr(encode_base64($main::session_id), 0, 16);
    my $tmp_dir = tempname_dir();
    my ($theme_var_dir, $product_var) = theme_var_dir();

    # Clear cached files
    if ($root) {
        unlink_file("$theme_var_dir/version-theme-stable");
        unlink_file("$theme_var_dir/version-theme-development");
        unlink_file("$theme_var_dir/version-csf-stable");
        unlink_file("$theme_var_dir/software-latest");

        # Clear stats history
        unlink_file("$theme_var_dir/stats-$remote_user.json");
        kill_byname("$current_theme/stats.cgi", 9);

    }

    # Remove cached downloads
    unlink_file("$product_var/cache");

    # Remove and regenerate OS cache
    if (&foreign_available('webmin')) {
        &foreign_require("webmin");
        &webmin::detect_operating_system();
    }

    # Clear potentially stuck BIND cache
    if (&foreign_available('bind8')) {
        &foreign_require("bind8");
        &bind8::flush_zone_names();
    }

    # Clear potentially stuck Apache cache
    if (&foreign_available('apache')) {
        &foreign_require("apache", "postinstall.pl");
        &apache::module_install();
    }

    # Clear links cache
    if (&foreign_available('virtual-server')) {
        &foreign_require("virtual-server");
        &virtual_server::clear_links_cache();

        my $licence_status = &virtual_server::cache_file_path("licence-status");
        unlink_file($licence_status);

        my $collected_info_file = &virtual_server::cache_file_path("collected");
        unlink_file($collected_info_file);
    }

    # Clear potentially stuck menus and other cache
    flush_webmin_caches();

    # Clear session specific temporary files
    opendir(my $dir, $tmp_dir);
    grep {unlink_file("$tmp_dir/$_") if (/^\.theme/ && $_ =~ /$salt/)} readdir($dir);
    closedir $dir;
}

sub theme_make_config_dir
{
    my $_wm_at_conf_dir = $config_directory . '/' . $current_theme;

    if (!-d $_wm_at_conf_dir) {
        mkdir($_wm_at_conf_dir, 0755);
    } else {
        chmod(0755, $_wm_at_conf_dir);
    }

    if ($has_usermin) {
        (my $_um_at_conf_dir = $config_directory) =~ s/webmin/usermin/;

        if (!-d $_um_at_conf_dir) {
            mkdir($_um_at_conf_dir, 0755);
        } else {
            chmod(0755, $_um_at_conf_dir);
        }
    }
}

sub get_theme_user_link
{
    my $is_hidden = (!foreign_available("webmin") &&
                       $theme_config{'settings_theme_config_admins_only_privileged'} eq 'true' ? ' hidden-force ' :
                       undef);
    my $is_hidden_link = ($get_user_level ne '0' ? ' hidden-force ' : undef);
    my $link           = '/tconfig.cgi';

    my $mversion = theme_version(1, 1);

    return '' . theme_version() . $mversion .
' <div class="btn-group margined-left-4"><a data-href="#theme-info" onclick="theme_update_notice(this);this.classList.add(\'disabled\')" data-container="body" title="'
      . $theme_text{'theme_update_notice'}
      . '" class="btn btn-default btn-xxs' .
      ($is_hidden . $is_hidden_link) . '"><i class="fa fa-info-circle"></i></a><a href="' .
      ($theme_webprefix . $link) . '" data-href="' . ($theme_webprefix . $link) .
      '" class="btn btn-default btn-xxs btn-hidden hidden' . $is_hidden . '" data-container="body" title="' .
      $theme_text{'settings_right_theme_left_configuration_title'} . '"><i class="fa2 fa-fw fa2-palette"></i></a></div>';
}

sub get_xhr_request
{

    if ($in =~ /xhr-/) {
        head();

        if ($in{'xhr-settings'} eq '1') {
            if ($in{'restore'} eq '1') {
                theme_config_restore();
            }
        } elsif ($in{'xhr-manage-config'} eq '1') {
            if ($in{'save'} eq '1') {
                theme_config_save();
            } elsif ($in{'load'} eq '1') {
                print theme_config_get();
            }
        } elsif ($in{'xhr-get_available_modules'} eq '1') {
            print get_available_modules('json');
        } elsif ($in{'xhr-get_theme_locale_languages'} eq '1') {
            my %__config = settings(get_tuconfig_file(), 'config_');
            print ui_select(
                "config_portable_theme_locale_languages",
                ($__config{'config_portable_theme_locale_languages'} ? $__config{'config_portable_theme_locale_languages'} :
                   get_before_delimiter($current_lang, '.')
                ),
                [
                 map {
                     !string_contains(lc($_->{'lang'}), 'utf') ?
                       [get_before_delimiter(lc(replace('_', '-', $_->{'lang'})), '.'), $_->{'desc'}] :
                       ()
                 } list_languages()
                ]);
        } elsif ($in{'xhr-get_size'} eq '1') {
            set_user_level();
            my $module      = $in{'xhr-get_size_cmodule'};
            my $jailed_user = get_fm_jailed_user($module);
            my $path        = ($jailed_user || get_access_data('root')) . $in{'xhr-get_size_path'};
            my $nodir       = $in{'xhr-get_size_nodir'};
            my $home        = ($jailed_user || get_user_home());
            if (($jailed_user || $get_user_level eq '3') && !string_starts_with($path, $home)) {
                $path = $home . $path;
                $path =~ s/\/\//\//g;
            }
            if ($nodir && -d $path) {
                print "$theme_text{'theme_xhred_global_error'}|-2";
            } elsif (!-r $path) {
                print "$theme_text{'theme_xhred_global_error'}|-1";
            } else {
                my $size = recursive_disk_usage($path);
                print nice_size($size, -1) . '|' . nice_number($size);
            }
        } elsif ($in{'xhr-get_list'} eq '1') {

            my $path   = "$in{'xhr-get_list_path'}";
            my $module = $in{'xhr-get_list_cmodule'};
            my @dirs;

            my $jailed_user = get_fm_jailed_user($module);
            if ($jailed_user || $get_user_level eq '2' || $get_user_level eq '4') {
                $path = ($jailed_user || get_user_home()) . $path;
            }
            opendir(my $dirs, $path);
            while (my $dir = readdir $dirs) {
                next unless -d $path . '/' . $dir;
                next if $dir eq '.' or $dir eq '..';
                push @dirs, $dir;
            }
            closedir $dirs;

            @dirs = sort {"\L$a" cmp "\L$b"} @dirs;
            print convert_to_json(\@dirs);

        } elsif ($in{'xhr-encoding_convert'} eq '1') {

            my $module           = $in{'xhr-encoding_convert_cmodule'};
            my $jailed_user      = get_fm_jailed_user($module, 1);
            my $jailed_user_home = get_fm_jailed_user($module);
            my $cfile            = $in{'xhr-encoding_convert_file'};
            if ($jailed_user) {
                switch_to_unix_user_local($jailed_user);
                $cfile = $jailed_user_home . $cfile;
            } else {
                set_user_level();
            }
            my $data = &ui_read_file_contents_limit(
                                                    { 'file',    $cfile, 'limit', $in{'xhr-encoding_convert_limit'},
                                                      'reverse', $in{'xhr-encoding_convert_reverse'},
                                                      'head',    $in{'xhr-encoding_convert_head'},
                                                      'tail',    $in{'xhr-encoding_convert_tail'} });
            if (-s $cfile < 128 || -T $cfile) {
                eval {$data = Encode::encode('utf-8', Encode::decode($in{'xhr-encoding_convert_name'}, $data));};
            }
            print $data;
        } elsif ($in{'xhr-get_gpg_keys'} eq '1') {
            my $module      = $in{'xhr-get_gpg_keys_cmodule'};
            my $jailed_user = get_fm_jailed_user($module, 1);
            switch_to_unix_user_local($jailed_user || undef);
            my ($public, $secret, $gpgpath) = get_gpg_keys($in{'xhr-get_gpg_keys_all'});
            my %keys;
            $keys{'public'}  = $public;
            $keys{'secret'}  = $secret;
            $keys{'gpgpath'} = $gpgpath;
            print convert_to_json(\%keys);
        } elsif ($in{'xhr-get_user_level'} eq '1') {
            print $get_user_level;
        } elsif ($in{'xhr-get_update_notice'} eq '1') {
            print update_notice();
        } elsif ($in{'xhr-get_nice_size'} eq '1') {
            print nice_size($in{'xhr-get_nice_size_sum'}, -1);
        } elsif ($in{'xhr-get_command_exists'} eq '1') {
            print has_command($in{'xhr-get_command_exists_name'});
        } elsif ($in{'xhr-get_symlink'} eq '1') {
            print(resolve_links(get_access_data('root') . ($in{'xhr-get_symlink_path'})));
        } elsif ($in{'xhr-theme_temp_data'} eq '1') {
            if ($in{'xhr-theme_temp_data_action'} eq 'set') {
                set_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_value'});
            } elsif ($in{'xhr-theme_temp_data_action'} eq 'get') {
                print get_theme_temp_data($in{'xhr-theme_temp_data_name'}, $in{'xhr-theme_temp_data_keep'});
            }
        } elsif ($in{'xhr-shell-pop'}) {
            my $file    = get_history_shell_file();
            my $index   = (int($in{'xhr-shell-pop'}) - 1);
            my $history = read_file_lines($file);
            if (@$history[$index]) {
                splice(@$history, $index, 1);
                flush_file_lines($file);
                print 1;
            }
        } elsif ($in{'xhr-shell-insert'}) {
            my $file    = get_history_shell_file();
            my $history = read_file_lines($file);
            push(@$history, $in{'xhr-shell-inserted'}) if ($in{'xhr-shell-inserted'});
            flush_file_lines($file);
            print convert_to_json($history);
        } elsif ($in{'xhr-get_autocompletes'} eq '1') {
            my @data =
              get_autocomplete_shell($in{'xhr-get_autocomplete_type'}, $in{'xhr-get_autocomplete_string'});
            print convert_to_json(\@data);
        } elsif ($in{'xhr-theme_latest_version'} eq '1') {
            my @current_versions;
            push(@current_versions,
                 (theme_remote_version(1, 1) =~ /^version=(.*)/m), (theme_remote_version(1, 0, 1) =~ /^version=(.*)/m));
            print convert_to_json(\@current_versions);
        } elsif ($in{'xhr-theme_clear_cache'} eq '1') {
            my $is_root = $get_user_level eq '0';
            clear_theme_cache($is_root);
        } elsif ($in{'xhr-update'} eq '1' && foreign_available('webmin')) {
            my @update_rs;
            my $version_type            = ($in{'xhr-update-type'} eq '-beta' ? '-beta' : '-release');
            my $update_force            = $in{'xhr-update-force'};
            my $update_version          = $in{'xhr-update-version'};
            my $usermin_enabled_updates = ($theme_config{'settings_sysinfo_theme_updates_for_usermin'} ne 'false' ? 1 : 0);
            if (!has_command('git') || !has_command('curl') || !has_command('bash')) {
                @update_rs = {
                               "no_git" => replace((!has_command('curl') || !has_command('bash') ? '>git<'  : '~'),
                                                   (!has_command('curl')                         ? '>curl<' : '>bash<'),
                                                   $theme_text{'theme_git_patch_no_git_message'}
                               ), };
                print convert_to_json(\@update_rs);
            } else {
                if ($update_force ne "1" && !$update_version) {
                    my $authentic_remote_data;

                    if ($version_type eq '-release') {
                        $authentic_remote_data = theme_remote_version(1, 1, undef, 1);
                    } else {
                        $authentic_remote_data = theme_remote_version(1, 0, 1, 1);
                    }

                    if ($authentic_remote_data eq '0') {
                        @update_rs = { "no_connection" => $theme_text{'theme_git_update_locked'} };
                        print convert_to_json(\@update_rs);
                        exit;
                    }

                    @update_rs = theme_update_incompatible($authentic_remote_data, ($version_type eq '-release' ? 1 : 0));
                    if (@update_rs) {
                        print convert_to_json(\@update_rs);
                        exit;
                    }
                }
                my $usermin = ($has_usermin && $usermin_enabled_updates);
                my $usermin_root;
                $version_type = "$version_type:$update_version" if ($update_version);
                backquote_logged("yes | $root_directory/$current_theme/theme-update.sh $version_type -no-restart");
                if ($usermin) {
                    $usermin_root = $root_directory;
                    $usermin_root =~ s/webmin/usermin/;
                    backquote_logged("yes | $usermin_root/$current_theme/theme-update.sh $version_type -no-restart");
                }
                my $tversion = theme_version();
                my $mversion = theme_version(1, 1);
                $tversion = $tversion . $mversion;

                @update_rs = {
                               "success" => ($usermin ? theme_text('theme_git_patch_update_success_message2', $tversion) :
                                               theme_text('theme_git_patch_update_success_message', $tversion)
                               ) };
                print convert_to_json(\@update_rs);
            }
        } elsif ($in{'xhr-info'} eq '1') {
            my @info = theme_list_combined_system_info();
            our ($cpu_percent,
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
                 $authentic_remote_version,
                 $local_motd
            ) = get_sysinfo_vars(\@info);

            # Build update info
            my @updated_info = {
                  "data"                     => 1,
                  "cpu_percent"              => $cpu_percent,
                  "mem_percent"              => $mem_percent,
                  "virt_percent"             => $virt_percent,
                  "disk_percent"             => $disk_percent,
                  "host"                     => $host,
                  "os"                       => $os,
                  "webmin_version"           => $webmin_version,
                  "virtualmin_version"       => $virtualmin_version,
                  "cloudmin_version"         => $cloudmin_version,
                  "authentic_theme_version"  => $authentic_theme_version,
                  "local_time"               => $local_time,
                  "kernel_arch"              => $kernel_arch,
                  "cpu_type"                 => $cpu_type,
                  "cpu_temperature"          => $cpu_temperature,
                  "cpu_fans"                 => $cpu_fans,
                  "hdd_temperature"          => $hdd_temperature,
                  "uptime"                   => $uptime,
                  "proc"                     => $running_proc,
                  "cpu"                      => $load,
                  "mem"                      => $real_memory,
                  "virt"                     => $virtual_memory,
                  "disk"                     => $disk_space,
                  "package_message"          => $package_message,
                  "authentic_remote_version" => $authentic_remote_version,
                  "local_motd"               => $local_motd,
                  "csf_title"                => $csf_title,
                  "csf_data"                 => $csf_data,
                  "csf_remote_version"       => $csf_remote_version,
                  "csf_deny"                 => (
                      (defined(&csf_temporary_list) && $theme_config{'settings_sysinfo_csf_temp_list_privileged'} ne 'false')
                      ? csf_temporary_list() :
                        undef
                  ),
                  "collect_interval" => get_module_config_data('system-status', 'collect_interval'),
                  "extended_si"      => get_extended_sysinfo(\@info, undef),
                  "warning_si"       => get_sysinfo_warning(\@info), };
            print convert_to_json(\@updated_info);
        } elsif ($in{'xhr-search-in-file'} eq '1') {
            set_user_level();
            my @files = split(/,/, $in{'xhr-search-in-file-files'});
            my $match = trim($in{'xhr-search-in-file-string'});
            my @match;
            fdo {
                my ($file, $line, $text) = @_;
                if ($text =~ /\Q$match\E/i) {
                    push(@match, ([$files[$file] => [html_escape(substr($text, 0, 120)), $line]]));
                }
            }
            @files;
            print convert_to_json(\@match);
        } elsif ($in{'xhr-csf-unload'} eq '1') {
            lib_csf_control('unload');
        } elsif ($in{'xhr-gennewpass'} eq 'get') {
            my $pass;
            if (&foreign_available('virtual-server')) {
                &foreign_require("virtual-server");
                $pass = &virtual_server::random_password();
            } elsif (&foreign_available('useradmin')) {
                &foreign_require("useradmin", "user-lib.pl");
                $pass = &useradmin::generate_random_password();
            }
            print $pass;
        }

        exit;
    }
}

sub init_type
{
    (($ENV{'CONTENT_TYPE'}  =~ /multipart\/form-data/i) ? ReadParseMime() :
       ($ENV{'SCRIPT_NAME'} =~ /session_login|pam_login/i ? ReadParse(undef, undef, undef, 2) : ReadParse()));
}

sub init
{
    # Don't log XHR requests
    my %tmp_miniserv;
    get_miniserv_config(\%tmp_miniserv);
    my $nolog = quotemeta('/stats.cgi?xhr-stats=general');
    $nolog =~ s/\\ / /g;
    if ($tmp_miniserv{'nolog'} ne $nolog) {
        $tmp_miniserv{'nolog'} = $nolog;
        put_miniserv_config(\%tmp_miniserv);
        reload_miniserv();
    }

    # Make sure that config directory exists
    theme_make_config_dir();

    # Provide unobstructive access for AJAX calls
    get_xhr_request();

    # Load module lib if available
    lib_csf_control('load');
}

sub content
{
    # Mobile toggle
    print '<div class="' . ($theme_config{'settings_navigation_always_collapse'} eq 'true' ? '' : 'visible-xs ') .
      'mobile-menu-toggler" style="position: fixed; ' . get_filters() . '">';

    print '<button aria-label="' . $theme_text{'left_toggle_navigation_menu'} .
      '" type="button" class="btn btn-primary btn-menu-toggler" style="padding-left: 6px; padding-right: 5px;">' . "\n";
    print '<i class="fa fa-fw fa-lg fa-bars"></i>' . "\n";
    print '</button>' . "\n";
    print '</div>' . "\n";

    # Navigation
    do("$ENV{'THEME_ROOT'}/navigation-lib.pl");
    print '<aside style="' . get_filters() . '" id="sidebar" class="hidden-xs">' . "\n";
    print_switch();
    print "<ul class=\"navigation\">\n";
    print nav_menu($get_user_level eq '2'   ? 'virtualmin' :
                     $get_user_level eq '4' ? 'cloudmin' :
                     $get_user_level eq '3' ? 'usermin' :
                     undef);
    print "</ul>\n";
    print '</aside>' . "\n";

    # Authenticated logo
    embed_logo();

    # Favorites menu
    print_favorites();

    # Content
    print '<div id="content" class="__page' .
      ($theme_config{'settings_right_page_hide_persistent_vscroll'} eq 'false' ? ' fvscroll' : undef) . '">' . "\n";

    print ' <div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1"></div>' . "\n";
}

sub update_notice
{
    my $changelog_data =
      (read_file_contents($root_directory . '/' . $current_theme . "/CHANGELOG.md") =~
        /#### Version(.*?)<!--- separator --->/s)[0];
    if ($changelog_data) {
        $changelog_data =~ s/###(.*?)\)/<\/ul>@{[get_version_link($1, 2)]}<hr><ul>/g;
    } else {
        $changelog_data =
          (read_file_contents($root_directory . '/' . $current_theme . "/CHANGELOG.md") =~
            /### Version(.*?)<!--- separator --->/s)[0];
    }
    my @changelog_version = split /\n/, $changelog_data;

    $changelog_data =~ s/^[^\n]*\n/\n/s;
    $changelog_data =~ s/`(.*?)`/<code>$1<\/code>/g;
    $changelog_data =~ s/__(.*?)__/<strong>$1<\/strong>/g;
    $changelog_data =~ s/_(.*?)_/<em>$1<\/em>/g;
    $changelog_data =~ s/(Fixed bugs)/<span data-fixed="1">$1<\/span>/g;
    $changelog_data =~ s/\[([^\[]+)\]\(([^\)]+)\)/<a class="label label-default" href="$2" target="_blank">$1<\/a>/g;
    $changelog_data =~ s/\n\*(.*)/\n<li>$1<\/li>/g;

    my @version           = split(/ /, $changelog_version[0]);
    my $changelog_content = '
      <div class="modal fade fade5" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true" data-backdrop="static" data-keyboard="true">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header background-success background--bordered">
                <button type="button" data-toggle="tooltip" data-title="'
      . $theme_text{'theme_xhred_global_close'} .
'" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-fw fa-info-circle">&nbsp;&nbsp;</i>'
      . $theme_text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body" style="font-weight: 300">
                <h4>Version ' . $version[1] . '</h4>
                <ul>
                  ' . $changelog_data . '
                </ul>
                <hr>
                <h4 data-development style="margin-top:20px;">'
      . $theme_text{'theme_development_support'} .
'&nbsp;&nbsp;<a href="https://github.com/authentic-theme/authentic-theme#donate" target="_blank" class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c; cursor: alias;"></a></h4>'
      .
      theme_text(
        'theme_update_footer',
'<a class="badge fa fa-github" target="_blank" href="https://github.com/authentic-theme/authentic-theme/issues"><span class="font-family-default">&nbsp;&nbsp;&nbsp;&nbsp;GitHub</span></a>',
'<a target="_blank" class="badge background-info fa fa2 fa2-telegram" href="https://t.me/virtualmin"><span class="font-family-default">&nbsp;&nbsp;&nbsp;&nbsp;Telegram</span></a>'
      ) .
      '
              </div>
            </div>
          </div>
       </div>';
    return $changelog_content;
}

sub get_cookies
{

    my @r = split /; /, get_env('http_cookie');
    my %c;

    foreach (@r) {
        my ($k, $v) = split /=/, $_;
        $c{$k} = $v;
    }

    return %c;
}

sub get_access_data
{
    my ($key) = @_;
    if ($key) {
        if ($key eq 'root' && $gaccess{'root'} eq '/') {
            return undef;
        } else {
            return $gaccess{$key};
        }
    } else {
        return %gaccess;
    }
}

sub get_available_modules
{
    my ($json) = @_;
    my @mods;

    foreach my $x (get_all_module_infos()) {
        if ($x->{'dir'} ne undef && &foreign_available($x->{'dir'})) {
            push @mods, $x->{'dir'};
        }
    }
    if ($json eq 'json') {
        return convert_to_json(\@mods);
    } else {
        return @mods;
    }
}

sub theme_config_save
{
    theme_make_config_dir();
    my %u = settings_filter(%in);
    my %a = %u;

    # Never allow saving privileged options sent from user
    delete @u{ grep(/_privileged$/, keys %u) };
    write_file(get_tuconfig_file(), \%u);

    # Master administrator must also save certain options to
    # global `settings.js` config file to affect all users
    if ($get_user_level eq '0') {
        delete @a{ grep(!/^settings_/, keys %a) };

        # Never save user-based options to global config
        delete @a{ grep(/_user$/, keys %a) };
        write_file(get_tgconfig_file(), \%a);

        # Never save extra options
        delete @a{ grep(/_extra_/, keys %a) };
        write_file(get_tgconfig_file(), \%a);

        # Check for Usermin configuration
        if ($has_usermin_conf_dir) {
            my $theme_settings_webmin_file  = get_tgconfig_file();
            my $theme_settings_usermin_file = $theme_settings_webmin_file;
            $theme_settings_usermin_file =~ s/$config_directory/$has_usermin_conf_dir/;
            if (!-l $theme_settings_usermin_file) {
                symlink_file($theme_settings_webmin_file, $theme_settings_usermin_file);
            }
        }
    }
}

sub theme_config_get
{
    my %tuconfig;
    my $tuconfig_file = get_tuconfig_file();
    if (-f $tuconfig_file) {
        my %tuconfig = settings($tuconfig_file);
        return convert_to_json(\%tuconfig);
    } else {
        return convert_to_json();
    }

}

sub theme_config_restore
{
    my $tuconfig_file = get_tuconfig_file();
    unlink_file($tuconfig_file);
    if ($get_user_level eq '0') {
        my $tgconfig_file = get_tgconfig_file();
        unlink_file($tgconfig_file);
        if ($has_usermin) {
            my $tugconfig_file = $tgconfig_file;
            $tugconfig_file =~ s/$config_directory/$has_usermin_conf_dir/;
            unlink_file($tugconfig_file);
        }
    }
}

sub get_user_acl
{
    my ($key, $module) = @_;

    if ($module) {
        $module = '/' . $module;
    }
    my $acl = "$config_directory$module/$remote_user.acl";

    my %config;
    read_file($acl, \%config);

    if (-r $acl) {
        if ($key) {
            return $config{$key};
        } else {
            return %config;
        }
    } else {
        return undef;
    }

}

sub get_module_config_data
{
    my ($module, $key) = @_;

    if (-r $config_directory . '/' . $module . '/config') {

        my %config;
        read_file(($config_directory . '/' . $module . '/config'), \%config);

        if ($key) {
            return $config{$key};
        } else {
            return %config;
        }
    } else {
        return undef;
    }

}

sub get_history_shell_file
{
    my $file;
    if ($in{'xhr-shell-cms'} eq "1") {
        my $id = $in{'xhr-shell-cmsid'};
        $id =~ s/[^\p{L}\p{N}.\-\/]//g;
        $file = "$config_directory/server-manager/previous/$id";
    } else {
        $file = "$config_directory/shell/previous.$remote_user";
    }

    return $file;
}

sub get_autocomplete_shell
{
    my ($type, $string) = @_;
    my ($cd, $cmd, $cmd2, $cd_cmd, $command, @rs, @rs_tmp);

    if ($type eq 'commands') {
        $command = '-c';
    } elsif ($type eq 'groups') {
        $command = '-g';
    } elsif ($type eq 'service') {
        (!string_starts_with($string, '::::') && ($command = '-s'));
    } elsif ($type eq 'systemctl') {
        $command = undef;
    } elsif ($type eq 'users') {
        $command = '-u';
    } else {
        my @strings =
          split /::::/, $string;
        ($cd, $string, $cmd, $cmd2) = @strings[0, 1, 2, 3];
        $cd_cmd  = "cd $cd; ";
        $command = '-o default';
    }

    if ($command) {
        @rs =
          array_unique(
               backquote_command($cd_cmd . "bash -c 'compgen " . $command . " '" . quotemeta($cmd2 ? $cmd2 : $string) . ""));

    } else {
        if ($type eq 'service' && has_command('service')) {
            my @cmd = split /::::/, $string;
            my $units_tmp =
              backquote_command("service " . quotemeta($cmd[1]));
            my ($unit_tmp) = $units_tmp =~ / \(  ( [^\)]+ )  \) /x;
            if (!$unit_tmp) {
                ($unit_tmp) = $units_tmp =~ / {  ( [^}]+ )  } /x;
            }
            if (!$unit_tmp) {
                ($unit_tmp) = $units_tmp =~ / \[  ( [^]]+ )  \] /x;
            }

            $unit_tmp =~ s/\s+//g;
            $unit_tmp =~ s/\|/,/g;
            $unit_tmp =~ s/;/,/g;

            my @units_tmp          = split /,/, $unit_tmp;
            my @units_possible_tmp = ('start', 'stop', 'restart', 'try-restart', 'reload', 'force-reload', 'status');
            @rs_tmp = (@units_tmp ? @units_tmp : @units_possible_tmp);
            my @rs_cmd;

            if ($cmd[2]) {
                foreach my $cmd (@rs_tmp) {
                    if (string_starts_with($cmd, $cmd[2])) {
                        push @rs_cmd, $cmd;
                    }
                }
                @rs = @rs_cmd;
            } else {
                @rs = @rs_tmp;
            }
        }
        if ($type eq 'systemctl' && has_command('systemctl')) {
            my (@units, @units_tmp);

            @units_tmp = array_unique(backquote_command("systemctl list-unit-files"));
            my $i = 0;
            my $n = $#units_tmp;
            foreach my $unit (@units_tmp) {
                my @tmp = split / {1,}/, $unit;
                my ($unit_tmp, $status_tmp) = @tmp[0, 1];

                if ($i        &&
                    --$n      &&
                    $unit_tmp &&
                    (!$string ||
                        string_starts_with($unit_tmp, $string)))
                {
                    push @units, $unit_tmp;
                }

                $i++;
            }
            @rs = @units;
        }
    }
    if ($cd || $cmd2) {
        my @rs_tmp;
        foreach my $file (@rs) {
            if (-d $file || -d ($cd . $file)) {
                push @rs_tmp, ($file . '/');
            } else {
                if ($cmd ne 'cd') {
                    push @rs_tmp, $file;
                }
            }
        }
        @rs = @rs_tmp;
    }
    return @rs;
}

1;
