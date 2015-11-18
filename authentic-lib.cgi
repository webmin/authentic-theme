#!/usr/bin/perl

#
# Authentic Theme 17.10 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $t_uri_virtualmin = index( $ENV{'REQUEST_URI'}, 'virtualmin' );
our $t_uri_cloudmin   = index( $ENV{'REQUEST_URI'}, 'cloudmin' );
our $t_uri_webmail    = index( $ENV{'REQUEST_URI'}, 'mail' );
our $t_uri_dashboard  = index( $ENV{'REQUEST_URI'}, 'dashboard' );
our $t_goto           = get_default_right();
our ( $t_var_switch_m, $t_var_product_m ) = get_swith_mode();
our ( $has_virtualmin, $get_user_level, $has_cloudmin ) = get_user_level();

sub init_error {
    if (  !-d $root_directory . "/authentic-theme"
        && -d $root_directory . "/authentic-theme-master" )
    {
        die("ATTENTION:\nHave you downloaded Authentic Theme from GitHub, and unpacked it manually\nto Webmin directory? In this case you need to rename theme directory from\n`authentic-theme-master` to `authentic-theme` in order to make theme work.\nAfterward, you will need to reset the theme again in Webmin Configuration.\n"
        );
    }
}

sub authentic {
    &init();
    &header($title);
    &content();
    &footer();
}

sub __settings {
    my ($_s) = @_;
    my $f = $config_directory . "/authentic-theme/settings.js";
    if ( -r $f ) {
        for (
            split(
                '\n',
                $s = do {
                    local $/ = undef;
                    open my $fh, "<", $f;
                    <$fh>;
                    }
            )
            )
        {
            if ( index( $_, '//' ) == -1
                && ( my @m = $_ =~ /(?:$_s\s*=\s*(.*))/g ) )
            {
                my $m = join( '\n', @m );
                $m =~ s/^[^']*\K'|'(?=[^']*$)|;(?=[^;]*$)//g;
                $m =~ s/\\'/'/g;
                return $m;
            }
        }
    }
}

sub notify {
    our ($type) = @_;
    if (__settings($type)
        && ((   __settings('settings_security_notify_for_webmin') ne 'false'
                && &get_product_name() eq 'webmin'
            )
            || ( __settings('settings_security_notify_for_usermin') ne 'false'
                && &get_product_name() eq 'usermin' )
        )
        )
    {
        my %messages = (
            "%1" => $remote_user,
            "%2" => $ENV{REMOTE_ADDR},
            "%3" => ucfirst( &get_product_name() )
        );
        my %subjects = ( "%3" => ucfirst( &get_product_name() ) );
        my @mail = split( /\|/, __settings($type) );
        ( my $message = $mail[0] )
            =~ s/(@{[join "|", keys %messages]})/$messages{$1}/g;
        ( my $subject = $mail[1] )
            =~ s/(@{[join "|", keys %subjects]})/$subjects{$1}/g;
        if (  !length $mail[3]
            || length $mail[3] && index( $mail[3], $ENV{REMOTE_ADDR} ) == -1 )
        {
            system(`echo "$message" | mail -s "$subject" "$mail[2]"`);
        }
    }
}

sub licenses {
    my ($id) = @_;
    if ( &foreign_available("virtual-server") && $id eq "vm" ) {
        my %virtualmin = &get_module_info("virtual-server");
        if ( $virtualmin{'version'} =~ /gpl/ ) {
            return 0;
        }
        else {
            return 1;
        }
    }
    elsif ( &foreign_available("server-manager") && $id eq "cm" ) {
        my %cloudmin = &get_module_info("server-manager");
        if ( $cloudmin{'version'} =~ /gpl/ ) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else {
        return 0;
    }
}

sub print_category {
    my ( $c, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;

    if (   $c eq 'webmin'
        || $c eq 'usermin'
        || $c eq 'settings'
        || $c eq 'global_settings'
        || $c eq 'global_setting'
        || $c eq 'cat_setting' )
    {
        our $icon = 'fa-cog';
    }
    elsif ( $c eq 'system' || $c eq 'cat_system' ) {
        our $icon = 'fa-wrench';
    }
    elsif ( $c eq 'servers' || $c eq 'global_servers' ) {
        our $icon = 'fa-rocket';
    }
    elsif ( $c eq 'other' || $c eq 'global_other' ) {
        our $icon = 'fa-gavel';
    }
    elsif ( $c eq 'net' || $c eq 'global_net' ) {
        our $icon = 'fa-shield';
    }
    elsif ( $c eq 'info' || $c eq 'global_info' ) {
        our $icon = 'fa-info';
    }
    elsif ($c eq 'hardware'
        || $c eq 'global_hardware'
        || $c eq 'global_storage' )
    {
        our $icon = 'fa-hdd-o';
    }
    elsif ( $c eq 'cluster' || $c eq 'global_cluster' ) {
        our $icon = 'fa-power-off';
    }
    elsif ( $c eq 'unused' || $c eq 'global_unused' ) {
        our $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'mail' || $c eq 'global_mail' ) {
        our $icon = 'fa-envelope';
    }
    elsif ( $c eq 'login' || $c eq 'global_login' ) {
        our $icon = 'fa-user';
    }
    elsif ( $c eq 'apps' || $c eq 'global_apps' ) {
        our $icon = 'fa-rocket';
    }
    elsif ( $c eq 'email' || $c eq 'global_email' ) {
        our $icon = 'fa-envelope';
    }
    elsif ( $c eq 'custom' || $c eq 'global_custom' ) {
        our $icon = 'fa-wrench';
    }
    elsif ( $c eq 'ip' || $c eq 'global_ip' ) {
        our $icon = 'fa-shield';
    }
    elsif ( $c eq 'check' || $c eq 'global_check' ) {
        our $icon = 'fa-user-md';
    }
    elsif ( $c eq 'add' || $c eq 'global_add' ) {
        our $icon = 'fa-plus';
    }
    elsif ( $c eq 'backup' || $c eq 'global_backup' || $c eq 'global_backup' )
    {
        our $icon = 'fa-save';
    }
    elsif ($c eq 'global_server'
        || $c eq 'cat_server'
        || $c eq 'global_system' )
    {
        our $icon = 'fa-cogs';
    }
    elsif ( $c eq 'global_delete' || $c eq 'cat_delete' ) {
        our $icon = 'fa-plug';
    }
    elsif ( $c eq 'global_logs' || $c eq 'cat_logs' ) {
        our $icon = 'fa-file-text';
    }
    elsif ( $c eq 'global_services' || $c eq 'cat_services' ) {
        our $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'create_new' ) {
        our $icon = 'fa-plus';
    }
    elsif ( $c eq 'global_gce' ) {
        our $icon = 'fa-google';
    }
    elsif ( $c eq 'global_ec2' ) {
        our $icon = 'fa-cubes';
    }
    elsif ( $c eq 'global_hosts' ) {
        our $icon = 'fa-globe';
    }
    elsif ( $c eq 'global_virtualmin' ) {
        our $icon = 'fa-sun-o';
    }
    elsif ( $c eq 'global_owners' ) {
        our $icon = 'fa-users';
    }
    elsif ( $c eq 'global_monitor' ) {
        our $icon = 'fa-desktop';
    }
    elsif ( $c eq 'global_settings' ) {
        our $icon = 'fa-cloud';
    }
    elsif ( $c eq 'cat_manage' ) {
        our $icon = 'fa-gavel';
    }
    elsif ( $c eq 'cat_res' ) {
        our $icon = 'fa-share-alt';
    }
    elsif ( $c eq 'global_admin' || $c eq 'cat_admin' ) {
        our $icon = 'fa-key';
    }
    elsif ( $c eq 'global_power' || $c eq 'cat_power' ) {
        our $icon = 'fa-power-off';
    }
    else {
        our $icon = 'fa-link';
    }

    if ($label) {

        # Show link to close or open catgory
        print '<li class="has-sub">' . "\n";
        print '<a href="#'
            . $c
            . '"><i class="fa '
            . $icon
            . ' fa-fw"></i> <span>'
            . $label
            . '</span></a>' . "\n";
        print '</li>' . "\n";
    }
}

sub get_swith_mode {
    my ( $t_var_switch_m, $t_var_product_m );

    if (   &get_product_name() eq 'webmin'
        && &foreign_available("asterisk") )
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '5';
    }
    elsif (&get_product_name() eq 'usermin'
        && &foreign_available("mailbox") )
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '4';
    }
    elsif (!&foreign_available("virtual-server")
        && !&foreign_available("server-manager")
        || &get_product_name() eq 'usermin'
        || $get_user_level eq '2' )
    {

        $t_var_switch_m  = '2';
        $t_var_product_m = '1';
    }
    elsif (&foreign_available("virtual-server")
        && &foreign_available("server-manager") )
    {
        $t_var_switch_m  = '3';
        $t_var_product_m = '3';
    }
    elsif (
           &foreign_available("virtual-server")
        || &foreign_available("server-manager")
        && (   !&foreign_available("virtual-server")
            || !&foreign_available("server-manager") )
        )
    {
        $t_var_switch_m  = '2';
        $t_var_product_m = '2';
    }

    return ( $t_var_switch_m, $t_var_product_m );
}

sub print_switch_webmin {
    print '<input class="dynamic" id="open_'
        . &get_product_name()
        . '" name="product-switcher" type="radio"'
        . (    $t_uri_virtualmin == -1
            && $t_uri_cloudmin == -1
            && $t_uri_webmail == -1 ? " checked" : "" )
        . '>
        <label for="open_'
        . &get_product_name() . '">
                <i class="wbm-webmin wbm-sm"></i><span>'
        . ucfirst( &get_product_name() ) . '</span></label>';
}

sub print_switch_dashboard {
    print
        '<input class="dynamic" id="open_dashboard" name="product-switcher" type="radio"'
        . ( $t_uri_dashboard != -1 ? " checked" : "" ) . '>
          <label for="open_dashboard" style="padding-top: 1px;">
          <i class="fa fa-asterisk __sysinfo_asterisk blinking-default hidden" style="position: absolute; font-size: 40%; margin-top: 1px; margin-left: 26px; color: #e4312d !important"></i><i class="fa fa-stack fa-area-chart"></i><span>Dashboard</span></label>';
}

sub print_switch_virtualmin {
    print
        '<input class="dynamic" id="open_virtualmin" name="product-switcher" type="radio"'
        . ( $t_uri_virtualmin != -1 ? " checked" : "" ) . '>
          <label for="open_virtualmin">
          <i class="wbm-virtualmin wbm-sm"></i><span>Virtualmin</span></label>';
}

sub print_switch_cloudmin {
    print
        '<input class="dynamic" id="open_cloudmin" name="product-switcher" type="radio"'
        . ( $t_uri_cloudmin != -1 ? " checked" : "" ) . '>
          <label for="open_cloudmin">
          <i class="wbm-cloudmin wbm-sm"></i><span>Cloudmin</span></label>';
}

sub print_switch_webmail {
    print
        '<input class="dynamic" id="open_webmail" name="product-switcher" type="radio"'
        . ( $t_uri_webmail != -1 ? " checked" : "" ) . '>
          <label for="open_webmail">
          <i class="fa fa-stack fa-envelope"></i>
          <span>Mail</span></label>';
}

sub print_switch_thirdlane {
    print
        '<input class="dynamic" id="open_thirdlane" id="open_cloudmin" name="product-switcher" type="radio">
          <label for="open_thirdlane">
          <img alt="" style="margin-left:3px; height:17px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnPjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTI0LjksNDguOEMxMS44LDQ4LjgsMSwzOC4xLDEsMjQuOVMxMS44LDEsMjQuOSwxczIzLjksMTAuNywyMy45LDIzLjlTMzguMSw0OC44LDI0LjksNDguOHogTTI0LjksMy44Yy0xMS43LDAtMjEuMSw5LjUtMjEuMSwyMS4xczkuNSwyMS4xLDIxLjEsMjEuMWMxMS43LDAsMjEuMS05LjUsMjEuMS0yMS4xUzM2LjYsMy44LDI0LjksMy44eiIvPjwvZz48Zz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDIwLjJjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywxOC4xLDI1LjEsMjAuMiwxNi42LDIwLjJ6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDI3LjRjLTAuOCwwLTEuNC0wLjYtMS40LTEuNHMwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywyNS4zLDI1LjEsMjcuNCwxNi42LDI3LjR6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDM0LjZjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywzMi41LDI1LjEsMzQuNiwxNi42LDM0LjZ6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==">
          <span class="block">Thirdlane</span></label>';
}

sub print_switch {
    print '<div class="switch-toggle switch-'
        . $t_var_switch_m
        . ' switch-mins">';
    if ( $t_var_product_m eq '1' ) {
        $get_user_level eq '2'
            ? print_switch_virtualmin()
            : print_switch_webmin();
        print_switch_dashboard();
    }
    if ( $t_var_product_m eq '2' ) {
        print_switch_webmin();
        &foreign_available("virtual-server")
            ? print_switch_virtualmin()
            : print_switch_cloudmin();
    }
    if ( $t_var_product_m eq '3' ) {
        print_switch_webmin();
        print_switch_virtualmin();
        print_switch_cloudmin();
    }
    if ( $t_var_product_m eq '4' ) {
        print_switch_webmail();
        print_switch_webmin();
    }
    if ( $t_var_product_m eq '5' ) {
        print_switch_webmin();
        print_switch_thirdlane();
    }
    print '<a></a>
            </div><br style="line-height:4.4">';
}

sub print_category_link {
    my ( $link, $label, $state ) = @_;
    print '<li' . ( $state && ' class="hidden"' ) . '>' . "\n";
    print '<a target="page" href="' . $link . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub dashboard_switch {
    if (   !&foreign_available("virtual-server")
        && !&foreign_available("server-manager")
        && &get_product_name() ne 'usermin'

        #|| ($get_user_level eq '2')
        )
    {
        return 1;
    }
    else {
        return 0;
    }
}

sub print_sysinfo_link {
    if ( dashboard_switch() ne '1' ) {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/sysinfo.cgi" class="navigation_module_trigger'
            . ( __settings('settings_sysinfo_link_mini') ne 'false'
                && ' hidden' )
            . '"><i class="fa fa-asterisk __sysinfo_asterisk blinking-default hidden" style="position: absolute; font-size: 40%; margin-top: -3px; margin-left: 8px;"></i><i class="fa fa-fw fa-info"></i> <span>'
            . $text{'left_home'}
            . '</span></a></li>' . "\n";
    }
}

sub print_sysinfo_warning {
    my (@info) = @_;

    # Show notifications first
    @info = sort {
        ( $b->{'type'} eq 'warning' ) <=> ( $a->{'type'} eq 'warning' )
    } @info;
    print '<br>';
    foreach my $info (@info) {
        if ( $info->{'type'} eq 'warning' ) {
            print &ui_alert_box( $info->{'warning'},
                $info->{'level'} || 'warn' );
        }
    }
}

sub print_extended_sysinfo {
    my (@info) = @_;
    if (@info) {
        print
            '<div class="panel-group" id="extended_sysinfo" role="tablist" aria-multiselectable="true">';
        foreach my $info (@info) {
            if (   $info->{'id'} ne 'sysinfo'
                && $info->{'id'} ne 'domain'
                && $info->{'id'} ne 'notifications'
                && $info->{'type'} ne 'link'
                && $info->{'module'} ne 'mailbox'
                && $a->{'type'} ne 'warning'
                && $b->{'type'} ne 'warning' )
            {
                our $charts_not_supported = 'no';
                if ( $info->{'type'} eq 'chart' ) {
                    foreach my $t ( @{ $info->{'chart'} } ) {
                        if ( $t->{'chart'}[0] < 0 || $t->{'chart'}[1] < 0 ) {
                            our $charts_not_supported = 'yes';
                        }
                    }
                }

                if ( $info->{'id'} && $charts_not_supported eq 'no' ) {

                    my $open
                        = $info->{'open'}
                        ? ' in'
                        : (
                        __settings('settings_sysinfo_expand_all_accordions')
                            eq 'true' ? ' in' : '' );

                    print '
                    <div class="panel panel-default'
                        . (
                        __settings('settings_animation_tabs') ne 'false'
                        ? ''
                        : ' disable-animations'
                        )
                        . '">
                        <div class="panel-heading" role="tab" id="'
                        . $info->{'id'} . '-' . $info->{'module'} . '">
                          <h4 class="panel-title">
                            <a data-toggle="collapse" href="#'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse" aria-expanded="true" aria-controls="'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse">
                              ' . $info->{'desc'} . '
                            </a>
                          </h4>
                        </div>
                    <div id="'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse" class="panel-collapse collapse'
                        . $open
                        . '" role="tabpanel" aria-labelledby="'
                        . $info->{'id'} . '-'
                        . $info->{'module'} . '">
                      <div class="panel-body">';

                    print
                        '<div class="table-responsive" style="width:99.8%"><table class="table table-striped"><tbody>';

                    if ($info->{'type'} eq 'table'
                        && (   $info->{'id'} ne 'sysinfo'
                            && $info->{'type'} ne 'link' )
                        )
                    {

                        foreach my $t ( @{ $info->{'table'} } ) {
                            my $__checkmark
                                = '<i class="fa fa-fw fa-lg fa-check text-success"></i>';
                            my $__stop
                                = '<i class="fa fa-fw fa-lg fa-times-circle text-danger"></i>';
                            my $__down
                                = '<i class="fa fa-fw fa-lg fa-minus-circle text-danger"></i>';
                            my $__start
                                = '<i class="fa fa-fw fa-lg fa-play text-success"></i>';
                            my $__restart
                                = '<i class="fa fa-fw fa-lg fa-refresh text-info"></i>';

                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/up.gif'.*?>/$__checkmark/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/stop.png'.*?>/$__stop/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/down.gif'.*?>/$__down/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/start.png'.*?>/$__start/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/reload.png'.*?>/$__restart/g;

                            print '<tr>
                                <td>' . $t->{"desc"} . '</td>
                                <td>'
                                . $t->{"value"} . '</td>
                              </tr>';
                        }
                    }
                    elsif ( $info->{'type'} eq 'chart' ) {
                        foreach my $t ( @{ $info->{'chart'} } ) {
                            print '<tr>
                                <td style="width:25%">'
                                . $t->{"desc"} . '</td>
                                <td style="width:60%">
                                <div class="graph-container">
                                    <div class="graph">
                                        <strong class="bar" style="width:'
                                . $t->{'chart'}[1] . '%;">'
                                . $t->{'chart'}[1]
                                . '%</strong>
                                    </div>
                                </div>
                                </td>
                                      <td style="width:15%">'
                                . $t->{"value"} . '</td>
                              </tr>';
                        }
                    }
                    elsif ( $info->{'type'} eq 'html' ) {
                        $info->{'html'} =~ s/<script[^>]*>.*?<\/script>//igs;
                        print $info->{'html'};
                    }
                    print '</tbody></table></div>';

                    print '</div>
                    </div>
                </div>';

                }
            }
        }
        print '</div><br><br><br><br>';
    }

}

sub print_sysstat_link {
    my $link;
    if ( $get_user_level eq '0'
        && ( $t_uri_cloudmin != -1 || $t_uri_virtualmin != -1 ) )
    {
        if ( $t_uri_cloudmin == -1
            && -d $root_directory . "/virtual-server/timeplot" )
        {
            $link = 'virtual-server';
        }
        elsif ( $t_uri_cloudmin != -1
            && -d $root_directory . "/server-manager/timeplot" )
        {
            $link = 'server-manager';
        }
        if ($link) {
            print '<li><a target="page" data-href="'
                . $gconfig{'webprefix'} . '/'
                . $link
                . '/history.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-area-chart"></i> <span>'
                . $text{'left_statistics'}
                . '</span></a></li>' . "\n";
        }
    }
}

sub print_search {
    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print
            '<li class="menu-container"><form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
            . "\n";
        print '<div class="form-group">' . "\n";
        if ( $t_uri_virtualmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="virtual-server">'
                . "\n";
        }
        if ( $t_uri_cloudmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="server-manager">'
                . "\n";
        }

        if ((      &get_product_name() == 'webmin'
                || &get_product_name() == 'usermin'
            )
            && $t_uri_virtualmin == -1
            && $t_uri_cloudmin == -1
            )
        {
            $_search = ucfirst( &get_product_name() );
        }
        elsif ( $t_uri_virtualmin != -1 ) {
            $_search = 'Virtualmin';
        }
        elsif ( $t_uri_cloudmin != -1 ) {
            $_search = 'Cloudmin';
        }
        print
            '<i class="fa fa-search"></i><input type="text" class="form-control sidebar-search" name="search" placeholder="'
            . $text{'left_search'} . '"">' . "\n";
        print '</div>' . "\n";
        print '</form></li>' . "\n";
    }
    else {
        print '<br>';
    }
}

sub add_webprefix {
    my ($link) = @_;
    if ( substr( $link, -5 ) eq '&amp;' ) {
        $link = substr( $link, 0, -5 );
    }
    return $link =~ /^\// ? $gconfig{'webprefix'} . $link : $link;
}

sub print_left_menu {
    my ( $module, $items, $group, $id, $selected, $xhr ) = @_;
    my $__hr = 0;
    foreach my $item (@$items) {
        if ( $module eq $item->{'module'} || $group ) {

            my $link = add_webprefix( $item->{'link'} );

            if (   $item->{'type'} eq 'item'
                && $link ne "/virtual-server/edit_lang.cgi"
                && $link ne "/virtual-server/edit_lang.cgi"
                && $link ne "/virtual-server/history.cgi" )
            {

                # Define an icon for the link/accordion
                if (   $link eq "/virtual-server/index.cgi"
                    || $link eq "/server-manager/index.cgi" )
                {
                    our $icon = '<i class="fa fa-fw fa-tasks"></i>';
                }
                elsif ($link eq "/mailbox/list_folders.cgi"
                    || $link eq "/mailbox/list_ifolders.cgi" )
                {
                    our $icon = '<i class="fa fa-fw fa-folder"></i>';
                }
                elsif ( $link eq "/mailbox/list_addresses.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-users"></i>';
                }
                elsif ( $link eq "/filter/edit_forward.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-share"></i>';
                }
                elsif ( $link eq "/filter/edit_auto.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-reply-all"></i>';
                }
                elsif ( $link eq "/filter/" ) {
                    our $icon = '<i class="fa fa-fw fa-filter"></i>';
                }
                elsif ( $link eq "/mailbox/edit_sig.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-pencil"></i>';
                }
                elsif ( index( $link, 'mailbox/index.cgi?id=' ) > -1 ) {
                    our $icon = '<i class="fa fa-fw fa-folder-o"></i>';
                }

                if ( __settings('settings_leftmenu_singlelink_icons') ne
                    'false' )
                {
                    if (index( $link, '/virtual-server/domain_form.cgi' )
                        > -1 )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-plus-square-o"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/edit_domain.cgi' )
                        > -1
                        || index( $link, '/server-manager/edit_serv.cgi' )
                        > -1 )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-pencil-square-o"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/view_domain.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-info-circle"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/list_users.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-users"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_aliases.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-envelope-o"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_databases.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-database"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_scripts.cgi' )
                        > -1
                        || index(
                            $link, '/server-manager/mass_update_form.cgi'
                        ) > -1
                        )
                    {
                        our $icon = '<i class="fa fa-fw fa-archive"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/edit_html.cgi' ) > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-globe"></i>';
                    }
                    elsif (
                        index( $link, '/server-manager/edit_pass.cgi' ) > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-key"></i>';
                    }
                    elsif (
                        index( $link, '/server-manager/save_serv.cgi' ) > -1 )
                    {
                        if ( index( $link, 'refresh=1' ) > -1 ) {
                            our $icon = '<i class="fa fa-fw fa-refresh"></i>';
                        }
                        elsif ( index( $link, 'regen=1' ) > -1 ) {
                            our $icon = '<i class="fa fa-fw fa-retweet"></i>';
                        }
                    }
                    elsif ($link =~ /^http:\/\//
                        || $link =~ /^https:\/\//
                        || $link =~ /^ftp:\/\//
                        || $link =~ /^ftps:\/\// )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-external-link"></i>';
                    }

                }

                # Set variable in case it hasn't been set before
                if ( !length $link ) {
                    our $icon = undef;
                }

                if ($link
                    && index( $link, '/virtual-server/list_scripts.cgi' )
                    == -1
                    && index( $link, '/virtual-server/edit_html.cgi' ) == -1
                    && index( $link, '/virtual-server/list_buckets.cgi' )
                    == -1
                    || ((   __settings('settings_leftmenu_vm_installscripts')
                            ne 'false' && index(
                                $link, '/virtual-server/list_scripts.cgi'
                            ) > -1
                        )
                        || ( __settings('settings_leftmenu_vm_webpages') ne
                            'false'
                            && index( $link, '/virtual-server/edit_html.cgi' )
                            > -1 )
                        || (__settings('settings_leftmenu_vm_backup_amazon')
                            ne 'false'
                            && index(
                                $link, '/virtual-server/list_buckets.cgi'
                            ) > -1
                        )
                    )
                    )
                {
                    if ( $id eq 'cat_webmin' ) {
                        substr( $link, 0, 1, "" )
                            if "/" eq substr( $link, 0, 1 );
                    }
                    print '<li'
                        . (
                        $item->{'target'}
                        ? ' class="navigation_external"'
                        : ''
                        ) . '>' . "\n";
                    print '<a target="'
                        . ( $item->{'target'} ? '_blank' : 'page' ) . '" '
                        . (
                        ( !$group && !$item->{'target'} )
                        ? "class=\"navigation_module_trigger\" data-"
                        : ''
                        )
                        . 'href="'
                        . $link . '">'
                        . ( index( $icon, '<i ' ) > -1 ? $icon : '' )
                        . ' <span>'
                        . $item->{'desc'}
                        . '</span></a>' . "\n";
                    print '</li>' . "\n";
                    print "\n";
                }

            }
            elsif ( $item->{'type'} eq 'html' ) {
                print '<li class="menu-container menu-status hidden">'
                    . $item->{'html'} . '</li>';
            }
            elsif ( $item->{'type'} eq 'cat' ) {
                my $c = $item->{'id'};
                if ( $item->{'module'} ne 'mailbox' ) {
                    &print_category( $c, $item->{'desc'} );
                }
                print
                    '<li class="sub-wrapper"><ul class="sub" style="display: none;" id="'
                    . $c . '">' . "\n";
                print_left_menu( $module, $item->{'members'}, 1, $c );
                print "</ul></li>\n";
            }
            elsif ( $item->{'type'} eq 'hr' ) {
                if ( $__hr eq '1' ) {
                    print_search();
                }
                $__hr++;
            }
            elsif (
                ( $item->{'type'} eq 'menu' || $item->{'type'} eq 'input' )
                && $item->{'module'} ne 'mailbox' )
            {
                # For with an input of some kind
                if ( $item->{'cgi'} ) {
                    print
                        "<li class=\"menu-container\"><form action='$item->{'cgi'}' target=page>\n";
                }
                else {
                    print "<li class=\"menu-container\"><form>\n";
                }
                foreach my $h ( @{ $item->{'hidden'} } ) {
                    print ui_hidden(@$h);
                }
                print $item->{'desc'}, "\n";
                if ( $item->{'type'} eq 'menu' ) {
                    my $sel = "";
                    if ( $item->{'onchange'} ) {
                        $sel = "window.parent.frames[1].location = "
                            . "\"$item->{'onchange'}\" + this.value";
                    }

                    my $default = __settings(
                        'settings_right_'
                            . (
                            $t_uri_cloudmin == -1 ? 'virtualmin' : 'cloudmin'
                            )
                            . '_default'
                    );

                    print ui_select(
                        $item->{'name'},
                        (   ( ( $selected || $selected == 0 ) && $xhr )
                            ? $selected
                            : ( $default ? $default : $item->{'value'} )
                        ),
                        $item->{'menu'},
                        1, 0, 0, 0,
                        "data-autocomplete-title=\"
                            "
                            . (
                            index( $ENV{'REQUEST_URI'}, 'virtualmin' ) != -1
                            ? $text{'right_fdoms'}
                            : $text{'right_fvm2'}
                            )
                            . "
                            \" "
                            . "style='width:236px; margin-top: 0 !important' disabled"
                    );

                }
                print "</form></li>\n";
            }
        }
    }
}

sub print_easypie_charts {
    my ( $cpu_percent, $mem_percent, $virt_percent, $disk_percent ) = @_;

    print '<div class="row" style="margin: 0;">' . "\n";
    my $columns = '3';

    # CPU usage
    print_easypie_chart( $columns, $cpu_percent, $text{'body_cp'},
        'sysinfo_cpu_percent' );

    # Memory allocation
    print_easypie_chart(
        $columns,
        $mem_percent,
        (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
            ? $text{'body_real2'}
            : $text{'body_real'}
        ),
        'sysinfo_mem_percent'
    );
    print_easypie_chart(
        $columns,
        $virt_percent,
        (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
            ? $text{'body_virt2'}
            : $text{'body_virt'}
        ),
        'sysinfo_virt_percent'
    );

    # Disk usage
    print_easypie_chart(
        $columns,
        $disk_percent,
        (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
            ? $text{'body_disk2'}
            : $text{'body_disk'}
        ),
        'sysinfo_disk_percent'
    );

    print '</div>' . "\n";
}

sub print_easypie_chart {
    my ( $columns, $percent, $label, $id ) = @_;
    print '<div class="col-xs-6 col-sm-' . $columns . ' text-center">' . "\n";
    print '<span class="piechart" data-charts="'
        . $id
        . '" data-percent="'
        . $percent . '">
        <span class="percent"></span>
        <span class="label">' . $label . '</span>
    </span>';
    print '</div>' . "\n";
}

sub get_sysinfo_vars {

    # Ask status module for collected info
    &foreign_require("system-status");
    $info = &system_status::get_collected_info();

    # Define used vars
    my ($cpu_percent,        $mem_percent,
        $virt_percent,       $disk_percent,
        $host,               $os,
        $webmin_version,     $virtualmin_version,
        $cloudmin_version,   $authentic_theme_version,
        $local_time,         $kernel_arch,
        $cpu_type,           $cpu_temperature,
        $hdd_temperature,    $uptime,
        $running_proc,       $load,
        $real_memory,        $virtual_memory,
        $disk_space,         $package_message,
        $csf_title,          $csf_data,
        $csf_remote_version, $authentic_remote_version
    );

    # Require memory information
    if ( $info->{'mem'} ) {
        @m = @{ $info->{'mem'} };
    }

    # Easypie charts numbers
    if ( $info->{'cpu'} ) {
        @c           = @{ $info->{'cpu'} };
        $cpu_percent = $c[0] + $c[1] + $c[3];
        $cpu_percent = int($cpu_percent);
    }
    if ( @m && $m[0] ) {
        $mem_percent = ( $m[0] - $m[1] ) / $m[0] * 100;
        $mem_percent = int($mem_percent);
    }
    if ( @m && $m[2] ) {
        $virt_percent = ( $m[2] - $m[3] ) / $m[2] * 100;
        $virt_percent = int($virt_percent);
    }
    if ( $info->{'disk_total'} ) {
        ( $total, $free )
            = ( $info->{'disk_total'}, $info->{'disk_free'} );
        $disk_percent = ( $total - $free ) / $total * 100;
        $disk_percent = int($disk_percent);
    }

    # Operation system
    my $ip
        = $info->{'ips'}
        ? $info->{'ips'}->[0]->[0]
        : &to_ipaddress( get_system_hostname() );
    $ip = " ($ip)" if ($ip);
    my $host = &get_system_hostname() . $ip;
    if ( &foreign_available("net") ) {
        $host
            = '<a href="'
            . $gconfig{'webprefix'}
            . '/net/list_dns.cgi">'
            . $host . '</a>';
    }

    # Operating System Info
    if ( $gconfig{'os_version'} eq '*' ) {
        $os = $gconfig{'real_os_type'};
    }
    else {
        $os = $gconfig{'real_os_type'} . ' ' . $gconfig{'real_os_version'};
    }

    #Webmin version
    $webmin_version = &get_webmin_version();

    # Virtualmin version
    if ($has_virtualmin) {
        my ( $vs_license, $is_virtual_server_gpl, $__virtual_server_version );
        my %vinfo = &get_module_info("virtual-server");
        $is_virtual_server_gpl = $vinfo{'version'} =~ /gpl/;

        if ( $is_virtual_server_gpl eq '1' ) {
            $vs_license = '0';

        }
        else {
            $vs_license = '1';
        }

        $__virtual_server_version = $vinfo{'version'};
        $__virtual_server_version =~ s/.gpl//igs;

        $virtualmin_version = (
            $__virtual_server_version . " " . (
                $vs_license eq '0'
                ? ''
                : 'Pro'

                    . (
                    ( $vs_license eq '1' )
                    ? ' <a class="btn btn-default btn-xs btn-hidden hidden" title="'
                        . $text{'right_vlcheck'}
                        . '" style="margin-left:1px;padding:0 12px; line-height: 12px; height:15px;font-size:11px" href="'
                        . $gconfig{'webprefix'}
                        . '/virtual-server/licence.cgi"><i class="fa fa-refresh" style="padding-top:1px"></i></a>'
                    : ''
                    )

            )
        );
    }

    # Cloudmin version
    if ($has_cloudmin) {
        my ( $vm2_license,
            $is_server_manager_gpl, $__server_manager_version );
        my %vinfo = &get_module_info("server-manager");
        $is_server_manager_gpl = $vinfo{'version'} =~ /gpl/;

        if ( $is_server_manager_gpl eq '1' ) {
            $vm2_license = '0';

        }
        else {
            $vm2_license = '1';
        }

        $__server_manager_version = $vinfo{'version'};
        $__server_manager_version =~ s/.gpl//igs;

        $cloudmin_version = (
            $__server_manager_version . " " . (
                $vm2_license eq '0'
                ? ''
                : 'Pro'

                    . (
                    ( $vm2_license eq '1' )
                    ? ' <a class="btn btn-default btn-xs btn-hidden hidden" title="'
                        . $text{'right_slcheck'}
                        . '" style="margin-left:1px;padding:0 12px; line-height: 12px; height:15px;font-size:11px" href="'
                        . $gconfig{'webprefix'}
                        . '/server-manager/licence.cgi"><i class="fa fa-refresh" style="padding-top:1px"></i></a>'
                    : ''
                    )

            )
        );
    }

    #
    # Theme version/updates
    get_authentic_version();

    $authentic_remote_version = $remote_version;

    # Build version response message
    if ( $remote_version <= $installed_version ) {
        do "authentic-theme/changelog.pl";
        $authentic_theme_version
            = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
            . $text{'theme_name'} . '</a> '
            . $installed_version
            . ( __settings('settings_theme_options_button') ne 'false'
                && '<a href="/webmin/edit_themes.cgi" data-href="'
                . $gconfig{'webprefix'}
                . '/webmin/edit_themes.cgi" class="btn btn-default btn-xs btn-hidden hidden" title="'
                . $text{'settings_right_theme_configurable_options_title'}
                . '" style="margin-left: 6px; margin-right: -8px; padding: 0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-cogs" style="padding-top:1px"></i></a> '
            )
            . '<button data-href="#theme-info" class="btn btn-default btn-xs btn-hidden hidden" style="margin-left: 6px; padding: 0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-info-circle" style="padding-top:1px"></i></button> '
            . $__changelog;
    }
    else {
        $authentic_theme_version
            = '<a href="https://github.com/qooob/authentic-theme" target="_blank">'
            . $text{'theme_name'} . '</a> '
            . $installed_version . '. '
            . $text{'theme_update_available'} . ' '
            . $remote_version
            . '&nbsp;&nbsp;&nbsp;<div class="btn-group">'
            . '<a class="btn btn-xs btn-success authentic_update" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="'
            . $gconfig{'webprefix'}
            . '/webmin/edit_themes.cgi"><i class="fa fa-refresh" style="padding-top:1px">&nbsp;</i>'
            . $text{'theme_update'} . '</a>'
            . '<a class="btn btn-xs btn-info" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
            . $text{'theme_changelog'} . '</a>'
            . '<a class="btn btn-xs btn-warning" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
            . $text{'theme_download'} . '</a>'
            . '</div>';
    }

    #System time
    use Time::Local;
    $local_time = localtime( time() );
    if ( &foreign_available("time") ) {
        $local_time
            = '<a href='
            . $gconfig{'webprefix'}
            . '/time/>'
            . $local_time . '</a>';
    }

    # Kernel and arch
    if ( $info->{'kernel'} ) {
        $kernel_arch = &text(
            'body_kernelon',                $info->{'kernel'}->{'os'},
            $info->{'kernel'}->{'version'}, $info->{'kernel'}->{'arch'}
        );
    }

    # CPU Type and cores
    if ( $info->{'load'} ) {
        @c = @{ $info->{'load'} };
        if ( @c > 3 ) {
            $cpu_type = &text( 'body_cputype', @c );
        }
    }

    # Temperatures
    if ( $info->{'cputemps'} ) {
        foreach my $t ( @{ $info->{'cputemps'} } ) {
            my $cpu_temperature
                .= '<span class="badge-custom badge-drivestatus badge-cpustatus" style="margin-right:3px; margin-bottom: 3px"> Core '
                . $t->{'core'} . ': '
                . int( $t->{'temp'} )
                . '&#176;C</span>'
                . (
                __settings('settings_sysinfo_drive_status_on_new_line') eq
                    'true' ? '<br>' : '&nbsp;' );
        }
    }
    if ( $info->{'drivetemps'} ) {
        foreach my $t ( @{ $info->{'drivetemps'} } ) {
            my $short = $t->{'device'};
            $short =~ s/^\/dev\///;
            my $emsg;
            if ( $t->{'errors'} ) {
                $emsg
                    .= '&nbsp;&nbsp;<span class="label label-warning" style="vertical-align: middle; max-height: 11px; display: inline-block; line-height: 9px;">'
                    . &text( 'body_driveerr', $t->{'errors'} )
                    . "</span>";
            }
            elsif ( $t->{'failed'} ) {
                $emsg
                    .= '&nbsp;&nbsp;<span class="label label-danger" style="vertical-align: middle; max-height: 11px; display: inline-block; line-height: 9px;">'
                    . &text('body_drivefailed')
                    . '</span>';
            }
            $hdd_temperature
                .= '<span class="badge-custom badge-drivestatus" style="margin-right:3px; margin-bottom: 3px">'
                . $short . ': '
                . int( $t->{'temp'} )
                . '&#176;C '
                . $emsg
                . '</span>'
                . (
                __settings('settings_sysinfo_drive_status_on_new_line') eq
                    'true' ? '<br>' : '&nbsp;' );
        }
    }

    # System uptime
    &foreign_require("proc");
    my ( $day, $hour, $minute ) = &proc::get_system_uptime();
    if ($day) {
        $uptime_text = &text( 'body_updays', $day, $hour, $minute );
    }
    elsif ( $minute && $hour ) {
        $uptime_text = &text( 'body_uphours', $hour, $minute );
    }
    elsif ($minute) {
        $uptime_text = &text( 'body_upmins', $minute );
    }

    $uptime
        = '<a href='
        . $gconfig{'webprefix'}
        . '/init/>'
        . $uptime_text . '</a>';

    # Running processes
    if ( &foreign_check("proc") ) {
        @procs        = &proc::list_processes();
        $running_proc = scalar(@procs);
        if ( &foreign_available("proc") ) {
            $running_proc
                = '<a href='
                . $gconfig{'webprefix'}
                . '/proc/>'
                . $running_proc . '</a>';
        }
    }

    # Load averages
    if ( $info->{'load'} ) {
        my @c = @{ $info->{'load'} };
        if (@c) {
            $load = &text( 'body_load', @c );
        }
    }

    # Memory
    if ( $info->{'mem'} ) {

        # Real memory details
        $real_memory = &text(
            'body_used',
            nice_size( ( $m[0] ) * 1000 ),
            nice_size( ( $m[0] - $m[1] ) * 1000 )
        );

        # Virtual memory details
        $virtual_memory = &text(
            'body_used',
            nice_size( ( $m[2] ) * 1000 ),
            nice_size( ( $m[2] - $m[3] ) * 1000 )
        );
    }

    # Local disk space
    if ( $info->{'disk_total'} && $info->{'disk_total'} ) {
        $disk_space = &text(
            'body_used_and_free',
            nice_size( $info->{'disk_total'} ),
            nice_size( $info->{'disk_free'} ),
            nice_size( $info->{'disk_total'} - $info->{'disk_free'} )
        );
    }

    #ConfigServer Security & Firewall
    if ( &foreign_check("csf") && &foreign_available("csf") ) {

        # Define CSF installed version
        my $csf_installed_version
            = read_file_lines( '/etc/csf/version.txt', 1 );
        our $csf_installed_version = $csf_installed_version->[0];

        # Define CSF actual version if allowed
        if ( __settings('settings_sysinfo_csf_updates') eq 'true' ) {
            http_download( 'download.configserver.com', '80',
                '/csf/version.txt', \$csf_remote_version, \$error, undef,
                undef, undef, undef, 5 );

            # Trim versions' number
            $csf_installed_version =~ s/^\s+|\s+$//g;
            $csf_remote_version =~ s/^\s+|\s+$//g;
        }
        else {
            $csf_remote_version = '0';
        }

        if ( $csf_remote_version <= $csf_installed_version ) {
            $csf_update_required = '0';
        }
        else {
            $csf_update_required = '1';
        }

        $csf_title
            = $text{'body_firewall'} . ' '
            . (
              `pgrep lfd`
            ? ''
            : ' &nbsp;&nbsp;&nbsp;&nbsp;<a class="csf-submit" href="#" data-id="csf_lfdstatus" class="label label-danger">Stopped</a> '
            );
        $csf_data = (
                  '<a href="/csf">ConfigServer Security & Firewall</a> '
                . $csf_installed_version . ''
                . (
                $csf_update_required eq '1'
                ? '. '
                    . $text{'theme_update_available'} . ' '
                    . $csf_remote_version
                    . '&nbsp;&nbsp;&nbsp;'
                : '&nbsp;&nbsp;&nbsp;'
                )
                . '
                <form action="/csf/index.cgi" method="post" class="hidden" id="csf_lfdstatus">
                    <input type="hidden" name="action" value="lfdstatus">
                </form>
                <form action="/csf/index.cgi" method="post" class="hidden" id="csf_upgrade">
                    <input type="hidden" name="action" value="upgrade">
                </form>
                <form action="/csf/index.cgi" method="post" class="hidden" id="csf_temporary_ip_entries">
                    <input type="hidden" name="action" value="temp">
                </form>
                <form action="/csf/index.cgi" method="post" class="hidden" id="csf_search_system_log">
                    <input type="hidden" name="action" value="loggrep">
                </form>
                <form action="/csf/index.cgi" method="post" class="hidden" id="csf_denyf">
                    <input type="hidden" name="action" value="denyf">
                </form>
            '
                . (
                $csf_update_required eq '1'
                ? '<div class="btn-group">
                <a class="btn btn-xs btn-success csf csf-submit" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_upgrade"><i class="fa fa-refresh" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_update'} . '</a>
                <a class="btn btn-xs btn-info csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf/changelog.txt"><i class="fa fa-pencil-square-o" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_changelog'} . '</a>
                <a class="btn btn-xs btn-warning csf" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" target="_blank" href="https://download.configserver.com/csf.tgz"><i class="fa fa-download" style="padding-top:1px">&nbsp;</i>'
                    . $text{'theme_download'} . '</a>
            </div>'
                : '<div class="btn-group">
               <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="top" data-container="body" data-title="Search system logs" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_search_system_log"><i class="fa fa-filter" style="padding-top:1px"></i></a>
               <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" data-toggle="tooltip" data-placement="top" data-container="body" data-title="Temporary IP entries" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_temporary_ip_entries"><i class="fa fa-ban" style="padding-top:1px"></i></a>
               <a class="btn btn-default btn-xs btn-hidden hidden csf csf-submit" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="#" data-id="csf_denyf"><i class="fa fa-trash-o" style="padding-top:1px"></i> Flush all blocks</a>
              </div>'
                )
                . ''
        );
    }

    # Package updates
    if ( &foreign_available("package-updates") && $info->{'poss'} ) {
        @poss = @{ $info->{'poss'} };
        @secs = grep { $_->{'security'} } @poss;
        if ( @poss && @secs ) {
            $msg
                = &text( 'body_upsec', scalar(@poss), scalar(@secs) );
        }
        elsif (@poss) {
            $msg = &text( 'body_upneed', scalar(@poss) );
        }
        else {
            $msg = $text{'body_upok'};
        }
        if ( &foreign_available("package-updates") ) {
            $msg =~ s/([0-9]+)/"<i class=\'badge badge-danger\'> $1 <\/i>"/eg;
            $package_message
                = '<a href="'
                . $gconfig{'webprefix'}
                . '/package-updates/index.cgi?mode=updates">'
                . $msg
                . '</a> <a href="/?updated" target="_top" data-href="'
                . $gconfig{'webprefix'}
                . '/package-updates/index.cgi" data-refresh="system-status package-updates" class="btn btn-primary btn-xs btn-hidden hidden" style="margin-left:4px;color: white;padding:0 12px; line-height: 12px; height:15px; font-size:11px"><i class="fa fa-refresh" style="padding-top:1px"></i></a>';
        }
    }

    return (
        $cpu_percent,        $mem_percent,
        $virt_percent,       $disk_percent,
        $host,               $os,
        $webmin_version,     $virtualmin_version,
        $cloudmin_version,   $authentic_theme_version,
        $local_time,         $kernel_arch,
        $cpu_type,           $cpu_temperature,
        $hdd_temperature,    $uptime,
        $running_proc,       $load,
        $real_memory,        $virtual_memory,
        $disk_space,         $package_message,
        $csf_title,          $csf_data,
        $csf_remote_version, $authentic_remote_version
    );

}

sub get_current_user_config {
    our ($___user)
        = grep { $_->{'name'} eq $base_remote_user } &acl::list_users();
    return $___user;
}

sub get_col_num {
    my ( $info, $max_col ) = @_;
    my $num_col = 0;
    if ( $info->{'cpu'} ) { $num_col++; }
    if ( $info->{'mem'} ) {
        @m = @{ $info->{'mem'} };
        if ( @m && $m[0] ) { $num_col++; }
        if ( @m && $m[2] ) { $num_col++; }
    }
    if ( $info->{'disk_total'} ) { $num_col++; }
    my $col = $max_col / $num_col;
    return $col;
}

sub print_table_row {
    my ( $title, $content, $id ) = @_;
    print '<tr>' . "\n";
    print
        '<td style="width:30%;vertical-align:middle; padding:8px;"><strong>'
        . $title
        . '</strong></td>' . "\n";
    print
        '<td  style="width:70%; vertical-align:middle; padding:8px;"><span data-id="'
        . $id . '">'
        . $content
        . '</span></td>' . "\n";
    print '</tr>' . "\n";
}

sub print_favorites {

    my $f = &read_file_contents(
        $config_directory . "/authentic-theme/favorites.json" );

    print '
    <div id="favorites-menu">
        <div class="favorites-menu-outer">
            <nav class="favorites-menu">
                <ul class="favorites-menu-content ui-sortable">
                    <li class="menu-exclude exclude favorites-title">
                        <h1><i class="fa fa-star-o"></i>&nbsp;&nbsp;'
        . $text{'left_favorites'}
        . '<sup style="position: absolute; margin: 25px 0 0 -10px;" class="hidden">&nbsp;&nbsp;<small class="text-white"> <a href="'
        . $gconfig{'webprefix'}
        . '/settings-editor_read.cgi?file='
        . $config_directory
        . '/authentic-theme/favorites.json" target="page" class="fa fa-pencil-square-o'
        . ( $f =~ m/"favorites":/ ? '' : ' hidden' )
        . '" style="display: inline; font-size: 1em;"></a></small></sup></h1>
                    </li>
    ';

    if ( $f && $f =~ m/"favorites":/ ) {
        my ($f) = $f =~ /\{(?:\{.*\}|[^{])*\}/sg;
        my $fc = decode_json($f);
        foreach my $favorite ( @{ $fc->{'favorites'} } ) {
            if ( length( $favorite->{"link"} ) ) {
                print '
                    <li class="menu-exclude ui-sortable-handle">
                        <a class="menu-exclude-link" target="page" href="'
                    . $favorite->{"link"}
                    . '"><i data-product="'
                    . $favorite->{"icon"}
                    . '" class="wbm-'
                    . $favorite->{"icon"}
                    . ' wbm-sm">&nbsp;</i><span class="f__c">
                            ' . $favorite->{"title"} . '
                        &nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px"><i class="fa fa-times"></i></small></span></a>
                    </li>
              ';
            }
        }
    }
    print '
                <li class="menu-exclude exclude favorites-no-message'
        . ( $f !~ m/"favorites":/ ? '' : ' hidden' ) . '">
                    <span>' . $text{'left_favorites_no'} . '</span>
                </li>
        ';

    print '
                </ul>
            </nav>
        </div>
        <a class="favorites-menu-close">
            <div class="favorites-menu-icon">
                <div class="favorites-menu-bar"></div>
                <div class="favorites-menu-bar"></div>
            </div>
        </a>
    </div>
    ';
}

sub get_user_level {
    my ( $a, $b, $c );
    $b = &foreign_available("server-manager");
    $a = &foreign_available("virtual-server");
    if ($b) {
        &foreign_require( "server-manager", "server-manager-lib.pl" );
    }
    if ($a) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    }
    if ($b) {
        $c = $server_manager::access{'owner'} ? 4 : 0;
    }
    elsif ($a) {
        $c
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;
    }
    elsif ( &get_product_name() eq "usermin" ) {
        $c = 3;
    }
    else {
        $c = 0;
    }
    return ( $a, $c, $b );
}

sub parse_license_date {
    if ( $_[0] =~ /^(\d{4})-(\d+)-(\d+)$/ ) {
        return eval { timelocal( 0, 0, 0, $3, $2 - 1, $1 - 1900 ) };
    }
    return undef;
}

sub _post_install {

    #Clear update notice
    unlink $root_directory . '/authentic-theme/update';

    return '1';
}

sub embed_logo {
    warn $@;
    if ( $ENV{'SCRIPT_NAME'} eq '/session_login.cgi' ) {
        our $logo = 'logo_welcome';
    }
    else {
        our $logo = 'logo';
    }
    if ( -r $config_directory . "/authentic-theme/" . $logo . ".png" ) {
        if (  -s $config_directory
            . "/authentic-theme/"
            . $logo
            . ".png" ne -s $root_directory
            . "/authentic-theme/images/"
            . $logo
            . ".png" )
        {
            # Update logo in case it changed
            copy_source_dest(
                $config_directory . "/authentic-theme/" . $logo . ".png",
                $root_directory . "/authentic-theme/images" );
        }
        print '<div class="__' . $logo . ' _' . $logo . '">';
        print '<img src="'
            . $gconfig{'webprefix'}
            . '/images/'
            . $logo
            . '.png">';
        print '</div>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/images/" . $logo . ".png"
        && !-r $config_directory . "/authentic-theme/" . $logo . ".png" )
    {
        # Delete logo
        unlink $root_directory . "/authentic-theme/images/" . $logo . ".png";
    }
}

sub embed_settings {
    if ( -r $config_directory . "/authentic-theme/settings.js" ) {
        if (  -s $config_directory
            . "/authentic-theme/settings.js" ne -s $root_directory
            . "/authentic-theme/unauthenticated/js/settings.js" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/settings.js",
                $root_directory . "/authentic-theme/unauthenticated/js"
            );
        }
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/settings.js" type="text/javascript"></script>'
            . "\n";
    }
    elsif ( -r $root_directory
        . "/authentic-theme/unauthenticated/js/settings.js"
        && !-r $config_directory
        . "/authentic-theme/settings.js" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/js/settings.js";
    }
}

sub embed_styles {
    if ( -r $config_directory . "/authentic-theme/styles.css" ) {
        if (  -s $config_directory
            . "/authentic-theme/styles.css" ne -s $root_directory
            . "/authentic-theme/unauthenticated/css/styles.css" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/styles.css",
                $root_directory . "/authentic-theme/unauthenticated/css"
            );
        }
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/styles.css?'
            . time()
            . '" rel="stylesheet" type="text/css">' . "\n";
    }
    elsif ( -r $root_directory
        . "/authentic-theme/unauthenticated/css/styles.css"
        && !-r $config_directory
        . "/authentic-theme/styles.css" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/css/styles.css";
    }
}

sub embed_scripts {
    if ( -r $config_directory . "/authentic-theme/scripts.js" ) {
        if (  -s $config_directory
            . "/authentic-theme/scripts.js" ne -s $root_directory
            . "/authentic-theme/unauthenticated/js/scripts.js" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/scripts.js",
                $root_directory . "/authentic-theme/unauthenticated/js"
            );
        }
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/scripts.js?'
            . time()
            . '" type="text/javascript"></script>' . "\n";
    }
    elsif (
        -r $root_directory . "/authentic-theme/unauthenticated/js/scripts.js"
        && !-r $config_directory . "/authentic-theme/scripts.js" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/js/scripts.js";
    }
}

sub embed_footer {
    my ($type) = @_;
    if ( $ENV{'SCRIPT_NAME'} ne '/session_login.cgi' ) {
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/authentic.'
            . ( $type eq 'debug' ? 'src' : 'min' )
            . '.js?1710" type="text/javascript"></script><script>___authentic_theme_footer___ = 1;</script>'
            . "\n";
    }
}

sub embed_header {

    my ($type) = @_;

    if ( $type eq 'debug' ) {

        my @css = (
            'bootstrap',         'datepicker',
            'fontawesome',       'fontawesome-animation',
            'codemirror',        'jquery.scrollbar',
            'jquery.datatables', 'jquery.autocomplete',
            'nprogress',         'messenger',
            'select2',           'roboto',
            'authentic'
        );

        my @js = (
            'timeplot',                  'jquery',
            'jquery-ui',                 'jquery.scrollbar',
            'jquery.autocomplete',       'select2',
            'icheck',                    'jquery.purl',
            'bootstrap',                 'datepicker',
            'fileinput',                 'autosizeinput',
            'codemirror',                'jquery.datatables',
            'jquery.datatables.plugins', 'jquery.easypiechart',
            'tinymce/tinymce',           'transition',
            'nprogress',                 'messenger',
            'init'
        );

        foreach my $css (@css) {
            print '<link href="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/css/'
                . $css
                . '.src.css?1710" rel="stylesheet" type="text/css">' . "\n";
        }

        embed_styles();
        embed_settings();

        foreach my $js (@js) {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/'
                . $js . '.'
                . ( $js eq 'tinymce/tinymce' ? 'min' : 'src' )
                . '.js?1710" type="text/javascript"></script>' . "\n";
        }
    }
    else {
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/package.min.css?1710" rel="stylesheet" type="text/css">'
            . "\n";

        embed_styles();
        embed_settings();

        if (index( $ENV{'REQUEST_URI'}, '/virtual-server/history.cgi' ) != -1
            || index( $ENV{'REQUEST_URI'}, '/server-manager/bwgraph.cgi' )
            != -1
            || index( $ENV{'REQUEST_URI'}, '/server-manager/history.cgi' )
            != -1
            || index( $ENV{'REQUEST_URI'}, '/server-manager/one_history.cgi' )
            != -1 )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/timeplot.min.js?1710" type="text/javascript"></script>'
                . "\n";
        }

        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/package.min.js?1710" type="text/javascript"></script>'
            . "\n";
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/init.min.js?1710" type="text/javascript"></script>'
            . "\n";

        if (   &get_module_name() eq 'mailboxes'
            || &get_module_name() eq 'mailbox' )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/tinymce/tinymce.min.js?1710" type="text/javascript"></script>'
                . "\n";
        }

    }
}

sub embed_login_head {
    print '<head>',                 "\n";
    print '<title>',                $title, '</title>', "\n";
    print '<meta charset="utf-8">', "\n";
    print '<link rel="shortcut icon" href="'
        . $gconfig{'webprefix'}
        . '/images/favicon'
        . (
        ( &get_product_name() eq 'usermin' )
        ? '-usermin'
        : '-webmin'
        ) . '.ico">' . "\n";
    print
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        . "\n";
    print '<link href="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/css/package.min.css?1710" rel="stylesheet" type="text/css">'
        . "\n";
    embed_styles();
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/package.min.js?1710" type="text/javascript"></script>'
        . "\n";
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/init.min.js?1710" type="text/javascript"></script>'
        . "\n";
    print '</head>', "\n";
}

sub get_authentic_version {

    # Get local version
    my $installed_version
        = read_file_lines( $root_directory . "/authentic-theme/VERSION.txt",
        1 );
    our $installed_version = $installed_version->[0];

    $installed_version =~ s/^\s+|\s+$//g;
    $installed_version = sprintf '%.2f', $installed_version;

    if ( __settings('settings_sysinfo_theme_updates') eq 'true' ) {

        # Get remote version if allowed
        http_download(
            'raw.githubusercontent.com',                 '443',
            '/qooob/authentic-theme/master/VERSION.txt', \$remote_version,
            \$error,                                     undef,
            1,                                           undef,
            undef,                                       5
        );

        # Trim versions' number
        $remote_version =~ s/^\s+|\s+$//g;
        $remote_version = sprintf '%.2f', $remote_version;
    }
    else {
        $remote_version = '0';
    }

    return ( $installed_version, $remote_version );
}

sub __config_dir_available {
    if ( !-d $config_directory . '/authentic-theme' ) {
        mkdir( $config_directory . '/authentic-theme', 0755 );
    }
}

sub usermin_available {
    my ($_module) = @_;
    $_module = ( $_module ? '/' . $_module : undef );
    $__usermin_root = $root_directory;
    $__usermin_root =~ s/webmin/usermin/;
    $__usermin_config = $config_directory;
    $__usermin_config =~ s/webmin/usermin/;

    if ( !-d $__usermin_config . '/authentic-theme' ) {
        mkdir( $__usermin_config . '/authentic-theme', 0755 );
    }

    if (   -r $__usermin_root . $_module
        && -r $__usermin_root . '/web-lib-funcs.pl' )
    {
        return 1;
    }
    else {
        return 0;
    }

}

sub domain_available {
    my ($id) = @_;
    if ( -r $config_directory . '/virtual-server/domains/' . $id ) {
        return 1;
    }
    else {
        return undef;
    }

}

sub server_available {
    my ($id) = @_;
    if ( -r $config_directory . '/servers/' . $id . '.serv' ) {
        return 1;
    }
    else {
        return undef;
    }

}

sub _settings {
    my ( $t, $k, $v ) = @_;

    if ( $t eq 'get' ) {
        my @settings = (
            '__',
            _settings(
                'fa',
                'file-o',
                &text('settings_right_page_defaults_title') . "~"
                    . &text('settings_right_page_default_description')
            ),
            'settings_right_default_tab_webmin',
            ( foreign_available("virtual-server") ? '/?virtualmin' : '/' ),
            'settings_right_default_tab_usermin',
            '/',
            'settings_right_virtualmin_default',
            'sysinfo.cgi',
            'settings_right_cloudmin_default',
            'sysinfo.cgi',

            '__',
            _settings(
                'fa', 'desktop',
                &text('settings_right_window_options_title')
            ),
            'settings_navigation_color',
            'blue',
            'settings_background_color',
            'lightGrey',
            'settings_animation_left',
            'true',
            'settings_animation_tabs',
            'true',
            'settings_loader_top',
            'true',
            'settings_loader_left',
            'true',
            'settings_loader_right',
            'true',
            'settings_right_reload',
            'true',
            'settings_window_autoscroll',
            'true',
            'settings_window_customized_checkboxes_and_radios',
            'true',

            '__',
            _settings(
                'fa', 'bars',
                &text('settings_right_navigation_menu_title')
            ),
            'settings_leftmenu_section_hide_refresh_modules',
            'false',
            'settings_leftmenu_section_hide_unused_modules',
            'false',
            'settings_sysinfo_link_mini',
            'true',
            'settings_favorites',
            'true',
            'settings_leftmenu_button_language',
            'false',
            'settings_leftmenu_button_refresh',
            'true',
            'settings_leftmenu_singlelink_icons',
            'true',
            'settings_leftmenu_vm_installscripts',
            'true',
            'settings_leftmenu_vm_webpages',
            'true',
            'settings_leftmenu_vm_backup_amazon',
            'true',

            '__',
            _settings(
                'fa', 'table',
                &text('settings_right_table_options_title')
            ),
            'settings_right_iconize_header_links',
            'true',
            'settings_right_hide_table_icons',
            'false',
            'settings_right_small_table_icons',
            'false',
            'settings_right_xsmall_table_icons',
            'false',
            'settings_right_animate_table_icons',
            'true',
            'settings_right_grayscaled_table_icons',
            'true',

            '__',
            _settings(
                'fa', 'keyboard-o',
                &text('settings_right_hotkey_options_title')
            ),
            'settings_hotkeys_active',
            'true',
            'settings_hotkey_toggle_modifier',
            'altKey',
            'settings_hotkey_toggle_key_webmin',
            'w',
            'settings_hotkey_toggle_key_virtualmin',
            'v',
            'settings_hotkey_toggle_key_cloudmin',
            'c',
            'settings_hotkey_toggle_key_usermin',
            'u',
            'settings_hotkey_toggle_key_webmail',
            'm',
            'settings_hotkey_sysinfo',
            'i',
            'settings_hotkey_favorites',
            'f',
            'settings_hotkey_focus_search',
            's',
            'settings_hotkey_reload',
            'r', '__',
            _settings(
                'fa',
                'sub-title',
                '' . "~"
                    . &text(
                    'settings_right_hotkey_custom_options_description')
            ),
            'settings_hotkey_custom_1',
            '',
            'settings_hotkey_custom_2',
            '',
            'settings_hotkey_custom_3',
            '',
            'settings_hotkey_custom_4',
            '',
            'settings_hotkey_custom_5',
            '',
            'settings_hotkey_custom_6',
            '',
            'settings_hotkey_custom_7',
            '',
            'settings_hotkey_custom_8',
            '',
            'settings_hotkey_custom_9',
            '',

            '__',
            _settings(
                'fa', 'info-circle',
                &text('settings_right_sysinfo_page_options_title')
            ),
            'settings_sysinfo_background_call_timeout',
            '2',
            'settings_sysinfo_easypie_charts',
            'true',
            'settings_theme_options_button',
            'true',
            'settings_sysinfo_theme_updates',
            'false',
            'settings_sysinfo_csf_updates',
            'false',
            'settings_sysinfo_drive_status_on_new_line',
            'true',
            'settings_sysinfo_expand_all_accordions',
            'false',

            '__',
            _settings(
                'fa',
                'bell-o',
                &text('settings_security_title') . "~"
                    . &text('settings_security_description')
            ),
            'settings_security_notify_for_webmin',
            'true',
            'settings_security_notify_for_usermin',
            'true',
            'settings_security_notify_on_login_success',
            '%3 successful login alert for user %1 from %2|%3 successful login alert|root',
            'settings_security_notify_on_login_request',
            '%3 login page is accessed by unauthenticated user from %2|%3 login page access alert|root',
            'settings_security_notify_on_pre_login_request',
            '%3 pre-login page is accessed by unauthenticated user from %2|%3 pre-login page access alert|root'
        );

        return (@settings);
    }

    if ( $t eq 'exclusions' ) {
        my @_s_e = ();

        ##
        # List of combined settings for Virtualmin/Cloudmin/Usermin
        my @s_vc_e = (
            'settings_leftmenu_singlelink_icons',
            'settings_right_default_tab_webmin',
            'settings_right_reload'
        );

        if (   !&foreign_available("server-manager")
            && !foreign_available("virtual-server") )
        {
            foreach my $e (@s_vc_e) {
                push( @_s_e, $e );
            }
        }

        if (   !&foreign_available("server-manager")
            && !foreign_available("virtual-server")
            && !usermin_available('mailbox') )
        {
            push( @_s_e, 'settings_right_page_defaults_title' );
        }

        #
        ##

        ##
        # List of settings for Virtualmin
        my @s_vm_e = (
            'settings_leftmenu_vm_installscripts',
            'settings_leftmenu_vm_webpages',
            'settings_leftmenu_vm_backup_amazon',
            'settings_right_virtualmin_default',
            'settings_hotkey_toggle_key_virtualmin'
        );

        if ( !foreign_available("virtual-server") ) {
            foreach my $e (@s_vm_e) {
                push( @_s_e, $e );
            }
        }
        #
        ##

        ##
        # List of settings for Cloudmin
        my @s_cm_e = (
            'settings_right_cloudmin_default',
            'settings_hotkey_toggle_key_cloudmin'
        );
        if ( !&foreign_available("server-manager") ) {
            foreach my $e (@s_cm_e) {
                push( @_s_e, $e );
            }
        }
        #
        ##

        ##
        # List of settings for Usermin
        my @s_um_e = ('settings_hotkey_toggle_key_usermin');
        if ( !usermin_available() ) {
            foreach my $e (@s_um_e) {
                push( @_s_e, $e );
            }
        }
        #
        ##

        ##
        # List of settings for Webmail
        my @s_wm_e = (
            'settings_hotkey_toggle_key_webmail',
            'settings_right_default_tab_usermin'
        );
        if ( !usermin_available("mailbox") ) {
            foreach my $e (@s_wm_e) {
                push( @_s_e, $e );
            }
        }
        #
        ##

        ##
        # List of settings for ConfigServer Security & Firewall
        my @s_cf_e = ('settings_sysinfo_csf_updates');
        if ( !&foreign_available("csf") ) {
            foreach my $e (@s_cf_e) {
                push( @_s_e, $e );
            }
        }
        #
        ##

        return @_s_e;
    }

    if ( $t eq 'fa' ) {
        return $v;

      #   '<i class="fa fa-'
      # . $k
      # . '" style="vertical-align: text-bottom !important;">&nbsp;&nbsp;</i>'
      # . $v;
    }

    if ( $t eq 'header' ) {
        return '
            ' . &text('settings_right_title') . '
            <p></p>
            <form class="ui_form" role="form" action="/settings.cgi" method="post"
                data-text-current_theme="'
            . &text('settings_right_current_theme')

            . '" data-text-settings_right_saved="'
            . &text('settings_right_saved')

            . '" data-text-save="' . &text('save')

            . '" data-text-settings_right_saving="'
            . &text('settings_right_saving')

            . '" data-text-settings_right_restore_defaults="'
            . &text('settings_right_restore_defaults')

            . '" data-text-settings_right_restored="'
            . &text('settings_right_restored')

            . '" data-text-settings_right_restoring="'
            . &text('settings_right_restoring')

            . '" data-text-error="' . &text('error')

            . '">
                <div class="table-responsive">
                    <table class="table table-striped table-rounded table-condensed table-subtable">
                        <thead><tr><th class="table-title" style="width: auto"><i class="fa fa-cogs">&nbsp;&nbsp;</i><b>'
            . &text('settings_right_theme_configurable_options_title')
            . '</b></th></tr></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <table class="sub_table_container table-hardcoded" width="100%">
                                        <tbody>
                                        ';
    }

    if ( $t eq 'section' ) {
        foreach my $e (@_s_e) {
            if ( index( $k, &text($e) ) != -1 ) {
                return;
            }
        }
        return '
            <tr>
                <td colspan="2" class="col_value'
            . ( $k ? ' col_header ' : '' )
            . ' atssection"><b>'
            . $k . '</b>'
            . ( $v
                && '<br><div class="smaller text-normal no-padding">'
                . $v
                . '</div>' )
            . '</td>
            </tr>
        ';
    }

    if ( $t eq 'content' ) {
        foreach my $o (@_s_e) {
            if ( $k eq $o ) {
                return;
            }
        }

        my $v = ( length __settings($k) ? __settings($k) : $v );

        if ( $v eq 'true' || $v eq 'false' ) {
            $v = '
                <input class="ui_radio" type="radio" name="'
                . $k
                . '" id="'
                . $k
                . '_1" value="true"'
                . ( $v eq 'true' && ' checked' ) . '>
                <label class="radio" for="'
                . $k
                . '_1" style="margin-right:10px !important;">'
                . &text('yes')
                . '</label>
                <input class="ui_radio" type="radio" name="'
                . $k
                . '" id="'
                . $k
                . '_0" value="false"'
                . ( $v eq 'false' && ' checked' ) . '>
                <label class="radio" for="'
                . $k . '_0">' . &text('no') . '</label>
            ';

        }
        elsif (index( $k, 'settings_security_notify_on_' ) != -1
            || index( $k, 'settings_hotkey_toggle_key_' ) != -1
            || $k eq 'settings_hotkey_focus_search'
            || $k eq 'settings_hotkey_reload'
            || $k eq 'settings_hotkey_sysinfo'
            || $k eq 'settings_hotkey_favorites'
            || $k eq 'settings_sysinfo_background_call_timeout' )
        {

            my $width
                = (    index( $k, 'settings_hotkey_toggle_key_' ) != -1
                    || $k eq 'settings_hotkey_focus_search'
                    || $k eq 'settings_hotkey_reload'
                    || $k eq 'settings_hotkey_sysinfo'
                    || $k eq 'settings_hotkey_favorites'
                    || $k eq 'settings_sysinfo_background_call_timeout' )
                ? ' width: 31px; '
                : ' width: 95%; ';
            my $max_length
                = (    index( $k, 'settings_hotkey_toggle_key_' ) != -1
                    || $k eq 'settings_hotkey_focus_search'
                    || $k eq 'settings_hotkey_reload'
                    || $k eq 'settings_hotkey_sysinfo'
                    || $k eq 'settings_hotkey_favorites' )
                ? ' maxlength="1"'
                : ' ';

            $v = '
                <input style="display: inline;'
                . $width
                . 'height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="text" name="'
                . $k
                . '" value="'
                . $v . '"'
                . $max_length . '>
            ';

        }
        elsif ($k eq 'settings_hotkey_custom_1'
            || $k eq 'settings_hotkey_custom_2'
            || $k eq 'settings_hotkey_custom_3'
            || $k eq 'settings_hotkey_custom_4'
            || $k eq 'settings_hotkey_custom_5'
            || $k eq 'settings_hotkey_custom_6'
            || $k eq 'settings_hotkey_custom_7'
            || $k eq 'settings_hotkey_custom_8'
            || $k eq 'settings_hotkey_custom_9' )
        {
            my $width = ' width: 40%; ';

            $v = '
                <input style="display: inline;'
                . $width
                . 'height: 28px; vertical-align: middle;" class="form-control ui_textbox" type="text" name="'
                . $k
                . '" value="'
                . $v . '">
            ';
        }
        elsif ( $k eq 'settings_right_default_tab_webmin' ) {
            $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
                . ( $v eq '/' && ' selected' ) . '>Webmin</option>

                '
                . ( &foreign_available("virtual-server")
                    && ' <option value="/?virtualmin"'
                    . ( $v eq '/?virtualmin' && ' selected' )
                    . '>Virtualmin</option> ' )
                . '

               '
                . ( &foreign_available("server-manager")
                    && ' <option value="/?cloudmin"'
                    . ( $v eq '/?cloudmin' && ' selected' )
                    . '>Cloudmin</option>' )
                . '
                </select>';
        }
        elsif ( $k eq 'settings_right_default_tab_usermin' ) {
            $v = '<select class="ui_select" name="' . $k . '">
                <option value="/"'
                . ( $v eq '/' && ' selected' ) . '>Usermin</option>

                '
                . ( usermin_available('mailbox')
                    && ' <option value="/?mail"'
                    . ( $v eq '/?mail' && ' selected' )
                    . '>Mail</option> ' )
                . '

                </select>';
        }

        elsif ( $k eq 'settings_hotkey_toggle_modifier' ) {
            $v = '<select class="ui_select" name="' . $k . '">
                    <option value="altKey"'
                . ( $v eq 'altKey' && ' selected' ) . '>Alt</option>
                    <option value="ctrlKey"'
                . ( $v eq 'ctrlKey' && ' selected' ) . '>Ctrl</option>
                    <option value="metaKey"'
                . ( $v eq 'metaKey' && ' selected' ) . '>Meta</option>
                </select>';
        }
        elsif ( $k eq 'settings_right_virtualmin_default' ) {
            get_user_level();
            $v = &ui_select(
                $k, $v,
                [   [ "", $text{'edright_first'} ],
                    map {
                        [ $_->{'id'}, &virtual_server::show_domain_name($_) ]
                        }
                        grep { &virtual_server::can_edit_domain($_) }
                        sort { $a->{'dom'} cmp $b->{'dom'} }
                        &virtual_server::list_domains()
                ]
            );
        }
        elsif ( $k eq 'settings_right_cloudmin_default' ) {
            get_user_level();
            @servers
                = &server_manager::list_available_managed_servers_sorted();
            $v = &ui_select(
                $k, $v,
                [   [ "", $text{'edright_first'} ],
                    map { [ $_->{'id'}, $_->{'host'} ] } @servers
                ]
            );

        }
        elsif ( $k eq 'settings_navigation_color' ) {
            $v = '<select class="ui_select" name="' . $k . '">

                    <option value="blue"'
                . ( $v eq 'blue' && ' selected' )
                . '>Royal Blue (Default)</option>

                    <option value="darkBlue"'
                . ( $v eq 'darkBlue' && ' selected' )
                . '>Midnight Blue</option>

                    <option value="lightBlue"'
                . ( $v eq 'lightBlue' && ' selected' )
                . '>Dodger Blue</option>

                    <option value="gold"'
                . ( $v eq 'gold' && ' selected' ) . '>Pale Golden</option>

                    <option value="green"'
                . ( $v eq 'green' && ' selected' ) . '>Sea Green</option>

                 <option value="red"'
                . ( $v eq 'red' && ' selected' ) . '>Dark Red</option>

                    <option value="indianRed"'
                . ( $v eq 'indianRed' && ' selected' ) . '>Indian Red</option>

                    <option value="orange"'
                . ( $v eq 'orange' && ' selected' ) . '>Orange</option>

                    <option value="brown"'
                . ( $v eq 'brown' && ' selected' ) . '>Saddle Brown</option>

                    <option value="purple"'
                . ( $v eq 'purple' && ' selected' ) . '>Dark Purple</option>

                    <option value="grey"'
                . ( $v eq 'grey' && ' selected' ) . '>Dim Grey</option>

                    <option value="darkGrey"'
                . ( $v eq 'darkGrey' && ' selected' ) . '>Dark Grey</option>

                    <option value="user-palette-1"'
                . ( $v eq 'user-palette-1' && ' selected' )
                . '>User Palette 1</option>

                    <option value="user-palette-2"'
                . ( $v eq 'user-palette-2' && ' selected' )
                . '>User Palette 2</option>

                    <option value="user-palette-3"'
                . ( $v eq 'user-palette-3' && ' selected' )
                . '>User Palette 3</option>

                    <option value="user-palette-4"'
                . ( $v eq 'user-palette-4' && ' selected' )
                . '>User Palette 4</option>

                    <option value="user-palette-5"'
                . ( $v eq 'user-palette-5' && ' selected' )
                . '>User Palette 5</option>

                    <option value="user-palette-6"'
                . ( $v eq 'user-palette-6' && ' selected' )
                . '>User Palette 6</option>

                    <option value="user-palette-7"'
                . ( $v eq 'user-palette-7' && ' selected' )
                . '>User Palette 7</option>

                    <option value="user-palette-8"'
                . ( $v eq 'user-palette-8' && ' selected' )
                . '>User Palette 8</option>

                    <option value="user-palette-9"'
                . ( $v eq 'user-palette-9' && ' selected' )
                . '>User Palette 9</option>

                    <option value="user-palette-10"'
                . ( $v eq 'user-palette-10' && ' selected' )
                . '>User Palette 10</option>


                </select>';
        }
        elsif ( $k eq 'settings_background_color' ) {
            $v = '<select class="ui_select" name="' . $k . '">

                    <option value="lightGrey"'
                . ( $v eq 'lightGrey' && ' selected' )
                . '>White Smoke (Default)</option>

                    <option value="gainsboro"'
                . ( $v eq 'gainsboro' && ' selected' ) . '>Gainsboro</option>

                    <option value="ghostWhite"'
                . ( $v eq 'ghostWhite' && ' selected' )
                . '>Ghost White</option>

                </select>';
        }

        return '
            <tr class="atshover">
                <td class="col_label atscontent"><b>'
            . &text($k) . '</b>'
            . ( &text( $k . '_description' )
                && '<div class="smaller text-normal no-padding">'
                . &text( $k . '_description' )
                . '</div>' )
            . '</td>
                <td class="col_value atscontent"><span>'
            . $v . '</span></td>
            </tr>
        ';
    }

    if ( $t eq 'footer' ) {
        return '
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table class="ui_form_end_buttons" style="width:100%">
                    <tbody>
                        <tr>
                            <td>
                                <a style="min-width:106px" class="btn btn-success" id="atsave"><i class="fa fa-fw fa-floppy-o" style="margin-right:7px;"></i>'
            . &text('save') . '</a>
                                <a style="min-width:146px" class="btn btn-default" id="atrestore"><i class="fa fa-fw fa-history" style="margin-right:7px;"></i>'
            . &text('settings_right_restore_defaults') . '</a>
                            </td>
                            <td style="text-align: right;">
                                <a class="btn btn-default" id="edit_styles" href="/settings-editor_read.cgi"><i class="fa fa-fw fa-file-code-o" style="margin-right:7px;"></i>'
            . &text('settings_right_theme_extensions') . '</a>
                                <a class="btn btn-default" id="edit_logos" href="/settings-upload.cgi"><i class="fa fa-fw fa-file-image-o" style="margin-right:7px;"></i>'
            . &text('settings_right_theme_logos') . '</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        ';
    }

    if ( $t eq 'save' || $t eq 'restore' ) {

        __config_dir_available();

        if ( $t eq 'save' ) {
            delete @in{ grep( !/^settings_/, keys %in ) };
            for ( values %in ) {s/(.*)/'$1';/}
            for ( values %in ) {s/'true'/true/g}
            for ( values %in ) {s/'false'/false/g}
            for ( values %in ) {
                s/
                   \G
                   (
                      (?: ^ [^']* ' | (?!^) )
                      (?: [^'\\]+ | \\. )*
                   )
                   '
                   (?! [^']* \z )
                /
                   $1 . "\\'"
                /xseg;
            }
            write_file( $config_directory . "/authentic-theme/settings.js",
                \%in );
        }
        if ( $t eq 'restore' ) {
            unlink_file( $config_directory . "/authentic-theme/settings.js" );
            if ( usermin_available() ) {
                unlink_file(
                    $__usermin_config . "/authentic-theme/settings.js" );
            }
        }

        if ( usermin_available() ) {
            unlink_file( $__usermin_config . "/authentic-theme/settings.js" );
            copy_source_dest(
                $config_directory . "/authentic-theme/settings.js",
                $__usermin_config . "/authentic-theme" );
        }

        if ( -r $config_directory . "/authentic-theme/logo.png"
            && usermin_available() )
        {
            unlink_file( $__usermin_config . "/authentic-theme/logo.png" );
            copy_source_dest(
                $config_directory . "/authentic-theme/logo.png",
                $__usermin_config . "/authentic-theme"
            );
        }
        if ( -r $config_directory . "/authentic-theme/logo_welcome.png"
            && usermin_available() )
        {
            unlink_file(
                $__usermin_config . "/authentic-theme/logo_welcome.png" );
            copy_source_dest(
                $config_directory . "/authentic-theme/logo_welcome.png",
                $__usermin_config . "/authentic-theme" );
        }
    }
}

sub serialize_string_list {
    return join(
        '|',
        map {
            (   defined($_)
                ? do { local $_ = $_; s/\^/^1/g; s/\|/^2/g; $_ }
                : '^0'
                )
        } @_
    );
}

sub get_xhr_request {
    if ( $in{'xhr-navigation'} eq '1' ) {
        print "Content-type: text/html\n\n";
        do "authentic-theme/navigation.cgi";
        exit;
    }
    elsif ( $in{'xhr-buttons'} eq '1' ) {
        print "Content-type: text/html\n\n";
        do "authentic-theme/buttons.cgi";
        exit;
    }
    elsif ( $in{'xhr-default'} eq '1' ) {
        print "Content-type: text/html\n\n";
        print $t_goto;
        exit;
    }
    elsif ( $in{'xhr-settings'} eq '1' ) {
        print "Content-type: text/html\n\n";
        if ( $in{'save'} eq '1' ) {
            _settings( 'save', undef, undef );
        }
        elsif ( $in{'restore'} eq '1' ) {
            _settings( 'restore', undef, undef );
        }
        else {
            do "authentic-theme/settings.cgi";
        }
        exit;
    }
    elsif ( $in{'xhr-info'} eq '1' ) {

        our (
            $cpu_percent,        $mem_percent,
            $virt_percent,       $disk_percent,
            $host,               $os,
            $webmin_version,     $virtualmin_version,
            $cloudmin_version,   $authentic_theme_version,
            $local_time,         $kernel_arch,
            $cpu_type,           $cpu_temperature,
            $hdd_temperature,    $uptime,
            $running_proc,       $load,
            $real_memory,        $virtual_memory,
            $disk_space,         $package_message,
            $csf_title,          $csf_data,
            $csf_remote_version, $authentic_remote_version
        ) = get_sysinfo_vars();

        print "Content-type: text/html\n\n";

        if ( &foreign_available("system-status") ) {

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
                "hdd_temperature"          => $hdd_temperature,
                "uptime"                   => $uptime,
                "running_proc"             => $running_proc,
                "load"                     => $load,
                "real_memory"              => $real_memory,
                "virtual_memory"           => $virtual_memory,
                "disk_space"               => $disk_space,
                "package_message"          => $package_message,
                "csf_title"                => $csf_title,
                "csf_data"                 => $csf_data,
                "csf_remote_version"       => $csf_remote_version,
                "authentic_remote_version" => $authentic_remote_version
            };
            print JSON->new->utf8->encode(@updated_info);
        }
        else {
            print JSON->new->utf8->encode( { "data" => 0 } );
        }
        exit;
    }
}

sub get_default_right {
    my $udefgoto;
    my $t_goto;

    # Check user settings on default page for Virtualmin/Cloudmin
    if (   $t_uri_virtualmin != -1
        && length __settings('settings_right_virtualmin_default')
        && __settings('settings_right_virtualmin_default') ne ''
        && domain_available( __settings('settings_right_virtualmin_default') )
        )
    {
        if ( $get_user_level eq '2' ) {
            $udefgoto = '/sysinfo.cgi';
        }
        else {
            $udefgoto = '/virtual-server/summary_domain.cgi?dom='
                . __settings('settings_right_virtualmin_default');
        }
    }
    elsif ($t_uri_cloudmin != -1
        && length __settings('settings_right_cloudmin_default')
        && __settings('settings_right_cloudmin_default') ne ''
        && server_available( __settings('settings_right_cloudmin_default') ) )
    {
        $udefgoto = '/server-manager/edit_serv.cgi?id='
            . __settings('settings_right_cloudmin_default');
    }
    else {
        $udefgoto = '/sysinfo.cgi';
    }

    #Going to default right page
    my $minfo = &get_goto_module();
    $t_goto
        = ( $t_uri_virtualmin != -1 || $t_uri_cloudmin != -1 ) ? $udefgoto
        : $minfo ? "$minfo->{'dir'}/"
        :          $udefgoto;

    # Filemin tweak for maintaining localStorage consistency
    if ( index( $t_goto, 'filemin' ) == 0 ) {
        $t_goto = $t_goto . 'index.cgi?path=';
    }

    return $t_goto;
}

sub init {

    # User-friendly message for those installing from GitHub
    &init_error();

    # Provide unobstructive access for AJAX calls
    &get_xhr_request();

    # Redirect user away, in case requested mode can not be satisfied
    if (   $ENV{'REQUEST_URI'} ne '/'
        && $ENV{'REQUEST_URI'} ne '/?virtualmin'
        && $ENV{'REQUEST_URI'} ne '/?cloudmin'
        && $ENV{'REQUEST_URI'} ne '/?mail'
        && $ENV{'REQUEST_URI'} ne '/?dashboard'
        && index( $ENV{'REQUEST_URI'}, 'xhr' ) lt 0 )
    {
        my $webmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'} . '/';
        print "Location: $webmin\n\n";
    }
    elsif (
        ( $t_uri_virtualmin != -1 && !&foreign_available("virtual-server") )
        || ( $t_uri_cloudmin != -1 && !&foreign_available("server-manager") )
        || ($t_uri_webmail != -1
            && (&get_product_name() ne 'usermin'
                || ( &get_product_name() eq 'usermin'
                    && !&foreign_available("mailbox") )
            )
        )
        )
    {
        print "Set-Cookie: redirect=0; path=/\r\n";
        my $webmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'} . '/';
        print "Location: $webmin\n\n";
    }

# In case Virtualmin/Cloudmin is installed, after logging in, redirect to Virtualmin/Cloudmin
    if ($ENV{'HTTP_COOKIE'} =~ /redirect=1/
        && (   &foreign_available("virtual-server")
            || &foreign_available("server-manager") )
        && &get_product_name() eq "webmin"
        && ( $t_uri_virtualmin == -1 && $t_uri_cloudmin == -1 )
        )
    {
        print "Set-Cookie: redirect=0; path=/\r\n";
        my $virtualmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'}
            . (
            length __settings('settings_right_default_tab_webmin')
            ? __settings('settings_right_default_tab_webmin')
            : ( foreign_available("virtual-server") ? '/?virtualmin' : '/' )
            );
        print "Location: $virtualmin\n\n";
    }

  # In case Mailbox module is installed, after logging in, redirect to Webmail
    if (   $ENV{'HTTP_COOKIE'} =~ /redirect=1/
        && &foreign_check("mailbox")
        && &foreign_available("mailbox")
        && &get_product_name() eq "usermin"
        && $t_uri_webmail == -1 )
    {
        print "Set-Cookie: redirect=0; path=/\r\n";
        my $webmail
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'}
            . (
            length __settings('settings_right_default_tab_usermin')
            ? __settings('settings_right_default_tab_usermin')
            : '/'
            );
        print "Location: $webmail\n\n";
    }

    if ( $ENV{'HTTP_COOKIE'} =~ /redirect=1/ ) {
        print "Set-Cookie: redirect=0; path=/\r\n";

        # Notify on successful authentication
        notify('settings_security_notify_on_login_success');
    }

    # Clearing possibly stuck update states
    if (   index( $ENV{'REQUEST_URI'}, 'updating-webmin-theme' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'downloading-webmin-theme' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'updating-usermin-theme' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'downloading-usermin-theme' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'recollect' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'recollect-system-status' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'recollecting' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'recollecting-system-status' ) != -1
        || index( $ENV{'REQUEST_URI'}, 'recollecting-package-updates' ) != -1
        || index( $ENV{'REQUEST_URI'},
            'recollecting-package-updates-processing' ) != -1
        )
    {
        if ( $t_uri_virtualmin != -1 ) {
            my $virtualmin
                = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
                . $ENV{'HTTP_HOST'}
                . '/?virtualmin';
            print "Location: $virtualmin\n\n";
        }
        elsif ( $t_uri_cloudmin != -1 ) {
            my $cloudmin
                = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
                . $ENV{'HTTP_HOST'}
                . '/?cloudmin';
            print "Location: $cloudmin\n\n";
        }
        elsif ( $t_uri_dashboard != -1 ) {
            my $dashboard
                = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
                . $ENV{'HTTP_HOST'}
                . '/?dashboard';
            print "Location: $dashboard\n\n";
        }
        else {
            my $webmin
                = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
                . $ENV{'HTTP_HOST'} . '/';
            print "Location: $webmin\n\n";
        }
    }

    # Force regular user to be in Virtualmin
    if (   $get_user_level eq '2'
        && $ENV{'REQUEST_URI'} ne '/?virtualmin' )
    {
        my $virtualmin
            = ( $ENV{'HTTPS'} ? 'https://' : 'http://' )
            . $ENV{'HTTP_HOST'}
            . '/?virtualmin';
        print "Location: $virtualmin\n\n";
    }

}

sub content {

    # Wrapper
    print '<div id="wrapper" data-product="'
        . &get_product_name()
        . '" data-virtual-server="'
        . $t_uri_virtualmin
        . '" data-server-manager="'
        . $t_uri_cloudmin
        . '" data-webmail="'
        . $t_uri_webmail
        . '" data-dashboard="'
        . $t_uri_dashboard
        . '" data-access-level="'
        . $get_user_level
        . '" data-hostname="'
        . &get_display_hostname()
        . '" class="index">' . "\n";

    # Mobile toggle
    print
        '<div class="visible-xs mobile-menu-toggler" style="position: fixed">';
    print
        '<button type="button" class="btn btn-primary btn-menu-toggler" style="padding-left: 6px; padding-right: 5px;">'
        . "\n";
    print '<i class="fa fa-fw fa-lg fa-bars"></i>' . "\n";
    print '</button>' . "\n";
    print '</div>' . "\n";

    #### Left
    print '<aside style="z-index:10;" id="sidebar" class="hidden-xs">' . "\n"
        . "\n";

    &print_switch();

    # Navigation
    print '<ul class="navigation">' . "\n";
    do "authentic-theme/navigation.cgi";
    print '</ul>' . "\n";

    # Buttons
    print '<br><br><ul class="user-links">';
    do "authentic-theme/buttons.cgi";
    print '</ul>';

    print '</aside>' . "\n";

    # Authenticated logo
    embed_logo();

    # Favorites menu
    print_favorites();

    # Right
    print '<div id="content" class="__page">' . "\n";
    print '<div class="loader-container">' . "\n";
    print '<div class="loader"><span class="loading"></span></div>' . "\n";
    print '</div>' . "\n";
    print '<script>__lrs()</script>';
    print '<iframe name="page" id="iframe" src="'
        . $gconfig{'webprefix'}
        . (
        (   !-f $root_directory . '/authentic-theme/update'
                && $t_uri_dashboard == -1
        )
        ? $t_goto
        : '/sysinfo.cgi'
        ) . '">' . "\n";
    print '</iframe>' . "\n";
    print '</div>' . "\n";

}

sub get_current_user_language {
    return substr(
        (     $gconfig{ 'lang' . '_' . $base_remote_user }
            ? $gconfig{ 'lang' . '_' . $base_remote_user }
            : $gconfig{'lang'}
        ),
        0, 2
    );
}

# sub prt {
#     my ($____v) = @_;
#     use Data::Dumper;
#     print '<div style="color: red">';
#     print Dumper $____v;
#     print '</div>';
# }

