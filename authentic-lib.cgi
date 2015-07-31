#!/usr/bin/perl

#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

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

sub print_switch_empty {
    my ($num) = @_;
    print '<input id="reserve_empty_' . $num
        . '" name="product-switcher" type="radio">
<label for="reserve_empty_' . $num . '">&nbsp;</label>';
}

sub print_switch_webmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_'
        . &get_product_name()
        . '" name="product-switcher" type="radio"'
        . (    $is_virtualmin == -1
            && $is_cloudmin == -1
            && $is_webmail == -1 ? " checked" : "" )
        . '>
        <label for="open_'
        . &get_product_name() . '">
                <i class="wbm-webmin wbm-sm"></i><span>'
        . ucfirst( &get_product_name() ) . '</span></label>';
}

sub print_switch_virtualmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_virtualmin" name="product-switcher" type="radio"'
        . ( $is_virtualmin != -1 ? " checked" : "" ) . '>
          <label for="open_virtualmin">
          <i class="wbm-virtualmin wbm-sm"></i><span>Virtualmin</span></label>';
}

sub print_switch_cloudmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_cloudmin" name="product-switcher" type="radio"'
        . ( $is_cloudmin != -1 ? " checked" : "" ) . '>
          <label for="open_cloudmin">
          <i class="wbm-cloudmin wbm-sm"></i><span>Cloudmin</span></label>';
}

sub print_switch_webmail {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_webmail" name="product-switcher" type="radio"'
        . ( $is_webmail != -1 ? " checked" : "" ) . '>
          <label for="open_webmail">
          <i class="fa fa-envelope"></i>
          <span>Mail</span></label>';
}

sub print_switch_thirdlane {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_thirdlane" id="open_cloudmin" name="product-switcher" type="radio">
          <label for="open_thirdlane">
          <img alt="" style="margin-left:3px; height:17px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnPjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTI0LjksNDguOEMxMS44LDQ4LjgsMSwzOC4xLDEsMjQuOVMxMS44LDEsMjQuOSwxczIzLjksMTAuNywyMy45LDIzLjlTMzguMSw0OC44LDI0LjksNDguOHogTTI0LjksMy44Yy0xMS43LDAtMjEuMSw5LjUtMjEuMSwyMS4xczkuNSwyMS4xLDIxLjEsMjEuMWMxMS43LDAsMjEuMS05LjUsMjEuMS0yMS4xUzM2LjYsMy44LDI0LjksMy44eiIvPjwvZz48Zz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDIwLjJjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywxOC4xLDI1LjEsMjAuMiwxNi42LDIwLjJ6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDI3LjRjLTAuOCwwLTEuNC0wLjYtMS40LTEuNHMwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywyNS4zLDI1LjEsMjcuNCwxNi42LDI3LjR6Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNi42LDM0LjZjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRjOC4yLDAsMTYuMy0yLDE2LjQtMi4xYzAuNy0wLjIsMS41LDAuMywxLjcsMWMwLjIsMC43LTAuMywxLjUtMSwxLjdDMzMuMywzMi41LDI1LjEsMzQuNiwxNi42LDM0LjZ6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==">
          <span class="block">Thirdlane</span></label>';
}

sub print_category_link {
    my ( $link, $label, $state ) = @_;
    print '<li' . ( $state && ' class="hidden"' ) . '>' . "\n";
    print '<a target="page" href="' . $link . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub print_sysinfo_link {
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/sysinfo.cgi" class="navigation_module_trigger'
        . ( __settings('settings_sysinfo_link_mini') ne 'false' && ' hidden' )
        . '"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
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
    if (   $virtual_server::module_info{'virtualmin'} eq 'pro'
        && $virtual_server_access_level eq '0'
        && ( -d $root_directory . "/virtual-server/timeplot" ) )
    {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/history.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-area-chart"></i> <span>'
            . $text{'left_statistics'}
            . '</span></a></li>' . "\n";
    }
}

sub print_search {
    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print
            '<li class="menu-container"><form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
            . "\n";
        print '<div class="form-group">' . "\n";
        if ( $is_virtualmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="virtual-server">'
                . "\n";
        }
        if ( $is_cloudmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="server-manager">'
                . "\n";
        }

        if ((      &get_product_name() == 'webmin'
                || &get_product_name() == 'usermin'
            )
            && $is_virtualmin == -1
            && $is_cloudmin == -1
            )
        {
            $_search = ucfirst( &get_product_name() );
        }
        elsif ( $is_virtualmin != -1 ) {
            $_search = 'Virtualmin';
        }
        elsif ( $is_cloudmin != -1 ) {
            $_search = 'Cloudmin';
        }
        print
            '<i class="fa fa-search"></i><input type="text" class="form-control sidebar-search" name="search" placeholder="'
            . $text{'left_search'}
            . '" disabled>' . "\n";
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
    my ( $module, $items, $group, $id ) = @_;
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
                    print ui_select(
                        $item->{'name'},
                        $item->{'value'},
                        $item->{'menu'},
                        1,
                        0,
                        0,
                        0,
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
    my ($info) = @_;

    print '<div class="row" style="margin: 0;">' . "\n";
    my $columns = &get_col_num( $info, 12 );

    # CPU usage
    if ( $info->{'cpu'} ) {
        @c = @{ $info->{'cpu'} };
        my $percent = $c[0] + $c[1] + $c[3];
        print_easypie_chart( $columns, $percent, $text{'body_cp'} );
    }

    # Memory allocation
    if ( $info->{'mem'} ) {
        @m = @{ $info->{'mem'} };
        if ( @m && $m[0] ) {
            my $percent = ( $m[0] - $m[1] ) / $m[0] * 100;
            print_easypie_chart(
                $columns, $percent,
                (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
                    ? $text{'body_real2'}
                    : $text{'body_real'}
                )
            );
        }
        if ( @m && $m[2] ) {
            my $percent = ( $m[2] - $m[3] ) / $m[2] * 100;
            print_easypie_chart(
                $columns, $percent,
                (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
                    ? $text{'body_virt2'}
                    : $text{'body_virt'}
                )
            );
        }
    }

    # Disk usage
    if ( $info->{'disk_total'} ) {
        ( $total, $free ) = ( $info->{'disk_total'}, $info->{'disk_free'} );
        my $percent = ( $total - $free ) / $total * 100;
        print_easypie_chart(
            $columns, $percent,
            (   ( $current_lang eq 'ru' || $current_lang eq 'ru.UTF-8' )
                ? $text{'body_disk2'}
                : $text{'body_disk'}
            )
        );
    }
    print '</div>' . "\n";
}

sub print_easypie_chart {
    my ( $columns, $percent, $label ) = @_;
    print '<div class="col-xs-6 col-sm-' . $columns . ' text-center">' . "\n";
    print '<span class="piechart" data-percent="' . int($percent) . '">
        <span class="percent"></span>
        <span class="label">' . $label . '</span>
    </span>';
    print '</div>' . "\n";
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
    local ( $title, $content ) = @_;
    print '<tr>' . "\n";
    print
        '<td style="width:30%;vertical-align:middle; padding:8px;"><strong>'
        . $title
        . '</strong></td>' . "\n";
    print '<td  style="width:70%; vertical-align:middle; padding:8px;">'
        . $content . '</td>' . "\n";
    print '</tr>' . "\n";
}

sub get_virtualmin_user_level {
    local ( $hasvirt, $hasvm2, $level );
    $hasvm2  = &foreign_available("server-manager");
    $hasvirt = &foreign_available("virtual-server");
    if ($hasvm2) {
        &foreign_require( "server-manager", "server-manager-lib.pl" );
    }
    if ($hasvirt) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    }
    if ($hasvm2) {
        $level = $server_manager::access{'owner'} ? 4 : 0;
    }
    elsif ($hasvirt) {
        $level
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;
    }
    elsif ( &get_product_name() eq "usermin" ) {
        $level = 3;
    }
    else {
        $level = 0;
    }
    return ( $hasvirt, $level, $hasvm2 );
}

sub parse_license_date {
    if ( $_[0] =~ /^(\d{4})-(\d+)-(\d+)$/ ) {
        return eval { timelocal( 0, 0, 0, $3, $2 - 1, $1 - 1900 ) };
    }
    return undef;
}

sub parse_virtual_server_access_level {

    # Where we at
    if ( &foreign_available("virtual-server") ) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
        our $virtual_server_access_level
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;
    }
    return $virtual_server_access_level;
}

sub _post_install {

    #Clear update notice
    unlink $root_directory . '/authentic-theme/update';

    return '1';
}

sub embed_logo {
    if ( $ENV{'SCRIPT_NAME'} eq '/session_login.cgi' ) {
        our $logo = 'logo_welcome';
    }
    else {
        our $logo = 'logo';
    }
    if ( -r $config_directory . "/authentic-theme/" . $logo . ".png" ) {

# Store logo in config directory, defaults in most case to `/etc/webmin`. Theme config directory is `/etc/webmin/authentic-theme`
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
        print '<div class="__logo _' . $logo . '">';
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

    #if ( $ENV{'SCRIPT_NAME'} ne '/session_login.cgi' ) {
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/authentic.'
        . ( $type eq 'debug' ? 'src' : 'min' )
        . '.js?1402" type="text/javascript"></script>' . "\n";

    #}
}

sub embed_header {

    my ($type) = @_;

    if ( $type eq 'debug' ) {

        my @css = (
            'bootstrap',         'datepicker',
            'fontawesome',       'fontawesome-animation',
            'codemirror',        'jquery.scrollbar',
            'jquery.datatables', 'jquery.autocomplete',
            'nprogress',         'select2',
            'roboto',            'authentic'
        );

        my @js = (
            'timeplot',            'jquery',
            'jquery.scrollbar',    'jquery.autocomplete',
            'select2',             'icheck',
            'jquery.purl',         'bootstrap',
            'datepicker',          'fileinput',
            'autosizeinput',       'codemirror',
            'jquery.datatables',   'jquery.datatables.plugins',
            'jquery.easypiechart', 'tinymce/tinymce',
            'transition',          'nprogress',
            'loader'
        );

        foreach my $css (@css) {
            print '<link href="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/css/'
                . $css
                . '.src.css?1402" rel="stylesheet" type="text/css">' . "\n";
        }

        embed_styles();
        embed_settings();

        foreach my $js (@js) {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/'
                . $js . '.'
                . ( $js eq 'tinymce/tinymce' ? 'min' : 'src' )
                . '.js?1402" type="text/javascript"></script>' . "\n";
        }
    }
    else {
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/package.min.css?1402" rel="stylesheet" type="text/css">'
            . "\n";

        embed_styles();
        embed_settings();

        if (
            index( $ENV{'REQUEST_URI'}, '/virtual-server/history.cgi' ) != -1
            ||
            index( $ENV{'REQUEST_URI'}, '/server-manager/bwgraph.cgi' ) != -1
            ||
            index( $ENV{'REQUEST_URI'}, '/server-manager/history.cgi' ) != -1
            ||
            index( $ENV{'REQUEST_URI'}, '/server-manager/one_history.cgi' ) != -1
            )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/timeplot.min.js?1402" type="text/javascript"></script>'
                . "\n";
        }

        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/package.min.js?1402" type="text/javascript"></script>'
            . "\n";

        if (   &get_module_name() eq 'mailboxes'
            || &get_module_name() eq 'mailbox' )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/tinymce/tinymce.min.js?1402" type="text/javascript"></script>'
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
        . '/unauthenticated/css/package.min.css?1402" rel="stylesheet" type="text/css">'
        . "\n";
    embed_styles();
    print '<script src="'
        . $gconfig{'webprefix'}
        . '/unauthenticated/js/package.min.js?1402" type="text/javascript"></script>'
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

    if ( __settings('settings_sysinfo_theme_updates') eq 'false' ) {
        $remote_version = '0';
    }
    else {
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
            '/',
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
            'settings_sysinfo_easypie_charts',
            'true',
            'settings_theme_options_button',
            'true',
            'settings_sysinfo_theme_updates',
            'true',
            'settings_sysinfo_csf_updates',
            'true',
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
        return
              '<i class="fa fa-'
            . $k
            . '" style="vertical-align: text-bottom !important;">&nbsp;&nbsp;</i>'
            . $v;
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
                <td class="col_label atssection"><span>'
            . $k
            . '</span>'
            . ( $v
                && '<br><div class="smaller text-normal no-padding">'
                . $v
                . '</div>' )
            . '</td>
                <td class="col_value atssection"></td>
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
            || $k eq 'settings_hotkey_sysinfo' )
        {

            my $width
                = (    index( $k, 'settings_hotkey_toggle_key_' ) != -1
                    || $k eq 'settings_hotkey_focus_search'
                    || $k eq 'settings_hotkey_reload'
                    || $k eq 'settings_hotkey_sysinfo' )
                ? ' width: 31px; '
                : ' width: 95%; ';
            my $max_length
                = (    index( $k, 'settings_hotkey_toggle_key_' ) != -1
                    || $k eq 'settings_hotkey_focus_search'
                    || $k eq 'settings_hotkey_reload'
                    || $k eq 'settings_hotkey_sysinfo' )
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
            get_virtualmin_user_level();
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
            get_virtualmin_user_level();
            @servers
                = &server_manager::list_available_managed_servers_sorted();
            $v = &ui_select(
                $k, $v,
                [   [ "", $text{'edright_first'} ],
                    map { [ $_->{'id'}, $_->{'host'} ] } @servers
                ]
            );

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
    if ( __settings($type) ) {
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

sub prt {
    my ($____v) = @_;
    use Data::Dumper;
    print '<div style="color: red">';
    print Dumper $____v;
    print '</div>';
}

