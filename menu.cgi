#!/usr/bin/perl

#
# Authentic Theme 6.0.0 (https://github.com/qooob/authentic-theme)
# Copyright 2014 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&ReadParse();
&init_config();
%text    = &load_language($current_theme);
%gaccess = &get_module_acl( undef, "" );
$charset = &get_charset();
$title   = &get_html_framed_title();
&header($title);
print '<div id="wrapper" class="page">' . "\n";
print '<div class="container">' . "\n";
@cats       = &get_visible_modules_categories();
$virtualmin = $in{'virtualmin'};
$category   = $in{'category'};
$row        = 1;

if ( $virtualmin == -1 ) {
    if ( $category eq '' ) {
        foreach $cat (@cats) {
            if ( $row eq 1 ) {
                print '<div class="row menu-row">' . "\n";
                &print_category( $cat->{'code'}, $cat->{'desc'} );
                $row = 0;
            }
            else {
                &print_category( $cat->{'code'}, $cat->{'desc'} );
                print '</div>' . "\n";
                $row = 1;
            }
        }
    }
    else {
        print '<div class="list-group">' . "\n";
        foreach $cat (@cats) {
            next if ( $cat->{'code'} ne $category );
            foreach my $module ( @{ $cat->{'modules'} } ) {
                &print_category_link( "$module->{'dir'}/",
                    $module->{'desc'} );
            }
        }
        print '</div>' . "\n";
    }
}
elsif ( $is_virtualmin != -1 ) {

    &foreign_require( "virtual-server", "virtual-server-lib.pl" );

    $level
        = &virtual_server::master_admin()   ? 0
        : &virtual_server::reseller_admin() ? 1
        :                                     2;

    if ( $level != 2 ) {

        my @buts = &virtual_server::get_all_global_links();
        my @tcats = &unique( map { $_->{'cat'} } @buts );

        if ( $category eq '' ) {
            foreach $c (@tcats) {
                my @incat = grep { $_->{'cat'} eq $c } @buts;
                if ( $row eq 1 ) {
                    print '<div class="row menu-row">' . "\n";
                    &print_category( $c, $incat[0]->{'catname'} );
                    $row = 0;
                }
                else {
                    &print_category( $c, $incat[0]->{'catname'} );
                    print '</div>' . "\n";
                    $row = 1;
                }
            }
        }
        else {
            print '<div class="list-group">' . "\n";
            foreach $c (@tcats) {
                my @incat = grep { $_->{'cat'} eq $c } @buts;
                next if ( $c ne $category );
                foreach my $l (@incat) {

                    # Show domain creation link
                    if ((      &virtual_server::can_create_master_servers()
                            || &virtual_server::can_create_sub_servers()
                        )
                        && ( $category eq 'add' )
                        && ( !length $print_virtualmin_link )
                        )
                    {

                        &print_category_link(
                            "virtual-server/domain_form.cgi",
                            $text{'virtualmin_left_generic'}
                        );
                        $print_virtualmin_link = 1;
                    }
                    $l->{'url'} =~ s/^\/+//;
                    &print_category_link( $l->{'url'}, $l->{'title'} );

                }
            }
            print '</div>' . "\n";
        }
    }
    elsif ( $level == 2 ) {
        print '<meta HTTP-EQUIV="REFRESH" CONTENT="0;URL=/virtual-server/index.cgi">';
    }
}

print '</div>' . "\n";

&footer();

sub print_category {
    local ( $c, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;
    if ( $c eq 'webmin' || $c eq 'usermin' || $c eq 'settings' ) {
        $icon = 'fa-cog';
    }
    elsif ( $c eq 'system' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'servers' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'other' ) {
        $icon = 'fa-gavel';
    }
    elsif ( $c eq 'net' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'info' ) {
        $icon = 'fa-info';
    }
    elsif ( $c eq 'hardware' ) {
        $icon = 'fa-hdd-o';
    }
    elsif ( $c eq 'cluster' ) {
        $icon = 'fa-power-off';
    }
    elsif ( $c eq 'unused' ) {
        $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'mail' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'login' ) {
        $icon = 'fa-user';
    }
    elsif ( $c eq 'apps' ) {
        $icon = 'fa-rocket';
    }
    elsif ( $c eq 'email' ) {
        $icon = 'fa-envelope';
    }
    elsif ( $c eq 'custom' ) {
        $icon = 'fa-wrench';
    }
    elsif ( $c eq 'ip' ) {
        $icon = 'fa-shield';
    }
    elsif ( $c eq 'check' ) {
        $icon = 'fa-user-md';
    }
    elsif ( $c eq 'add' ) {
        $icon = 'fa-plus';
    }
    elsif ( $c eq 'backup' ) {
        $icon = 'fa-save';
    }
    else {
        $icon = 'fa-cog';
    }
    if ($label) {
        print '<div class="col-xs-6">' . "\n";
        print
            '<div class="menu-col" style="background-color: #5885d6; border-radius: 4px; margin: 0 auto 30px; width: 130px; height: 150px;">'
            . "\n";
        print '<a class="menu-link" href="menu.cgi?category='
            . $c
            . '&virtualmin='
            . $virtualmin . '"">' . "\n";
        print '<div style="padding: 15px 10px;">' . "\n";
        print '<i class="fa ' . $icon . ' fa-fw"></i>' . "\n";
        print '<span style="margin-top: 6px;">' . $label . '</span>' . "\n";
        print '</div>' . "\n";
        print '</a>' . "\n";
        print '</div>' . "\n";
        print '</div>' . "\n";
    }
}

sub print_category_link {
    local ( $link, $label, $image, $noimage, $target ) = @_;
    $target ||= "page";
    print '<a class="list-group-item" target="'
        . $target
        . '" href="'
        . $link . '"> '
        . $label . '</a>' . "\n";
}
