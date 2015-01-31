#
# Authentic Theme 9.0.0 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

sub print_category {
    local ( $c, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;

    if (   $c eq 'webmin'
        || $c eq 'usermin'
        || $c eq 'settings'
        || $c eq 'global_settings' )
    {
        $icon = 'fa-cog';
    }
    elsif ( $c eq 'system' || $c eq 'global_system' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'servers' || $c eq 'global_servers' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'other' || $c eq 'global_other' ) {
        $icon = 'fa-gavel';
    }
    elsif ( $c eq 'net' || $c eq 'global_net' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'info' || $c eq 'global_info' ) {
        $icon = 'fa-info';
    }
    elsif ($c eq 'hardware'
        || $c eq 'global_hardware'
        || $c eq 'cat_storage' )
    {
        $icon = 'fa-hdd-o';
    }
    elsif ( $c eq 'cluster' || $c eq 'global_cluster' ) {
        $icon = 'fa-power-off';
    }
    elsif ( $c eq 'unused' || $c eq 'global_unused' ) {
        $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'mail' || $c eq 'global_mail' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'login' || $c eq 'global_login' ) {
        $icon = 'fa-user';
    }
    elsif ( $c eq 'apps' || $c eq 'global_apps' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'email' || $c eq 'global_email' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'custom' || $c eq 'global_custom' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'ip' || $c eq 'global_ip' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'check' || $c eq 'global_check' ) {
        $icon = 'fa-user-md';
    }
    elsif ( $c eq 'add' || $c eq 'global_add' ) {
        $icon = 'fa-plus';
    }
    elsif ( $c eq 'backup' || $c eq 'global_backup' || $c eq 'cat_backup' ) {
        $icon = 'fa-save';
    }
    elsif ( $c eq 'cat_server' || $c eq 'cat_system' ) {
        $icon = 'fa-cogs';
    }
    elsif ( $c eq 'cat_delete' ) {
        $icon = 'fa-plug';
    }
    elsif ( $c eq 'cat_logs' ) {
        $icon = 'fa-file-text';
    }
    elsif ( $c eq 'cat_services' ) {
        $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'create_new' ) {
        $icon = 'fa-plus';
    }
    elsif ( $c eq 'cat_gce' ) {
        $icon = 'fa-google';
    }
    elsif ( $c eq 'cat_ec2' ) {
        $icon = 'fa-cubes';
    }
    elsif ( $c eq 'cat_hosts' ) {
        $icon = 'fa-globe';
    }
    elsif ( $c eq 'cat_virtualmin' ) {
        $icon = 'fa-sun-o';
    }
    elsif ( $c eq 'cat_owners' ) {
        $icon = 'fa-users';
    }
    elsif ( $c eq 'cat_monitor' ) {
        $icon = 'fa-desktop';
    }
    elsif ( $c eq 'cat_settings' ) {
        $icon = 'fa-cloud';
    }
    elsif ( $c eq 'cat_manage' ) {
        $icon = 'fa-gavel';
    }
    elsif ( $c eq 'cat_res' ) {
        $icon = 'fa-share-alt';
    }
    elsif ( $c eq 'cat_admin' ) {
        $icon = 'fa-key';
    }
    else {
        $icon = 'fa-cog';
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
        . ( $is_virtualmin == -1 && $is_cloudmin == -1 ? " checked" : "" )
        . '>
<label for="open_'
        . &get_product_name()
        . '"><i class="fa '
        . ( &get_product_name() eq 'usermin' ? "fa-user" : "fa-cog" )
        . '"></i><br>'
        . ucfirst( &get_product_name() )
        . '</label>';
}

sub print_switch_virtualmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_virtualmin" name="product-switcher" type="radio"'
        . ( $is_virtualmin != -1 ? " checked" : "" ) . '>
          <label for="open_virtualmin"><i class="fa fa-sun-o"></i><br>Virtualmin</label>';
}

sub print_switch_cloudmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_cloudmin" id="open_cloudmin" name="product-switcher" type="radio"'
        . ( $is_cloudmin != -1 ? " checked" : "" ) . '>
          <label for="open_cloudmin"><i class="fa fa-cloud"></i><br>Cloudmin</label>';
}

sub print_category_link {
    local ( $link, $label ) = @_;
    print '<li>' . "\n";
    print '<a target="page" href="' . $link . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub print_sysstat_link {
    if ( $virtual_server::module_info{'virtualmin'} eq 'pro'
        && (-d $root_directory . "/virtual-server/timeplot"))
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
        print '<input type="hidden" class="form-control" name="title" value="'
            . $_search . ' '
            . $text{'global_search'} . '">' . "\n";
        print
            '<i class="fa fa-search"></i><input type="text" class="form-control sidebar-search" name="search" placeholder="'
            . $text{'global_search'}
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
    my ( $module, $items, $group ) = @_;
    foreach my $item (@$items) {
        if ( $module eq $item->{'module'} || $group ) {

            my $link = add_webprefix( $item->{'link'} );

            if (   $item->{'type'} eq 'item'
                && $link ne "/virtual-server/edit_lang.cgi" && $link ne "/virtual-server/edit_lang.cgi" && $link ne "/virtual-server/history.cgi" )
            {
                if (   $link eq "/virtual-server/index.cgi"
                    || $link eq "/server-manager/index.cgi" )
                {
                    our $icon = '<i class="fa fa-fw fa-tasks"></i>';
                }
                else {
                    our $icon = undef;
                }
                print '<li>' . "\n";
                print '<a target="page" '
                    . (
                    !$group
                    ? "class=\"navigation_module_trigger\" data-"
                    : ''
                    )
                    . 'href="'
                    . $link . '">'
                    . $icon
                    . ' <span>'
                    . $item->{'desc'}
                    . '</span></a>' . "\n";
                print '</li>' . "\n";
                print "\n";
            }
            elsif ( $item->{'type'} eq 'cat' ) {
                my $c = $item->{'id'};
                &print_category( $c, $item->{'desc'} );
                print '<ul class="sub" style="display: none;" id="'
                    . $c . '">' . "\n";
                print_left_menu( $module, $item->{'members'}, 1 );
                print "</ul>\n";
            }
            elsif ( $item->{'type'} eq 'hr' ) {
                if ( $__hr eq '1' ) {
                    print_search();
                }
                $__hr++;
            }
            elsif ($item->{'type'} eq 'menu'
                || $item->{'type'} eq 'input' )
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
                            ". (index( $ENV{'REQUEST_URI'}, 'virtualmin' ) ? $text{'right_fdoms'} : $text{'right_fvm2'}) . "
                            \" onChange='form.submit(); $sel' "
                            . "style='width:236px; margin-top: 0 !important' disabled"
                    );

                }
                print "</form></li>\n";
            }
        }
    }
}

sub print_progressbar_colum {
    my ( $xs, $sm, $percent, $label ) = @_;
    use POSIX;
    $percent = ceil($percent);
    if ( $percent < 75 ) {
        $class = 'success';
    }
    elsif ( $percent < 90 ) {
        $class = 'warning';
    }
    else {
        $class = 'danger';
    }
    print '<div class="col-xs-' . $xs . ' col-sm-' . $sm . '">' . "\n";
    print '<div data-progress="'
        . $percent
        . '" class="progress progress-circle">' . "\n";
    print '<div class="progress-bar-circle progress-bar-' . $class . '">'
        . "\n";
    print '<div class="progress-bar-circle-mask progress-bar-circle-full">'
        . "\n";
    print '<div class="progress-bar-circle-fill"></div>' . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-mask progress-bar-circle-half">'
        . "\n";
    print '<div class="progress-bar-circle-fill"></div>' . "\n";
    print
        '<div class="progress-bar-circle-fill progress-bar-circle-fix"></div>'
        . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-inset">' . "\n";
    print '<div class="progress-bar-circle-title">' . "\n";
    print '<strong class="text-muted">' . $label . '</strong>' . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-percent">' . "\n";
    print '<span></span>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
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
    print '<td style="vertical-align:middle; padding:10px;"><strong>'
        . $title
        . '</strong></td>' . "\n";
    print '<td  style="vertical-align:middle; padding:10px;">'
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

sub show_new_features {
    my ($nosect) = @_;
    my $newhtml;
    if (   $hasvirt
        && !$sects->{'nonewfeatures'}
        && defined(&virtual_server::get_new_features_html)
        && ( $newhtml = virtual_server::get_new_features_html($defdom) ) )
    {
        # Show new features HTML for Virtualmin
        if ($nosect) {
            print "<h3>$text{'right_newfeaturesheader'}</h3>\n";
        }
        else {
            print ui_hidden_table_start( $text{'right_newfeaturesheader'},
                "width=100%", 2, "newfeatures", 1 );
        }
        print &ui_table_row( undef, $newhtml, 2 );
        if ( !$nosect ) {
            print ui_hidden_table_end("newfeatures");
        }
    }
    if (   $hasvm2
        && !$sects->{'nonewfeatures'}
        && defined(&server_manager::get_new_features_html)
        && ( $newhtml = server_manager::get_new_features_html(undef) ) )
    {
        # Show new features HTML for Cloudmin
        if ($nosect) {
            print "<h3>$text{'right_newfeaturesheadervm2'}</h3>\n";
        }
        else {
            print ui_hidden_table_start( $text{'right_newfeaturesheadervm2'},
                "width=100%", 2, "newfeaturesvm2", 1 );
        }
        print &ui_table_row( undef, $newhtml, 2 );
        if ( !$nosect ) {
            print ui_hidden_table_end("newfeaturesvm2");
        }
    }
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

sub prt {
    my ($____v) = @_;
    use Data::Dumper;
    print '<div style="color: white">';
    print Dumper $____v;
    print '</div>';
}

