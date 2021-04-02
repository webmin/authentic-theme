#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %gconfig);

sub xhr
{
    my $type    = $in{'type'};
    my $subtype = $in{'subtype'};
    my $action  = $in{'action'};
    my %data    = ();

    if ($type eq 'nav') {

        # Returns navigation menu available for requested domain/server
        if ($action eq 'validate') {
            my $module = $in{'module'};
            my $param  = $in{'param'};
            my @menu   = list_combined_webmin_menu(undef, \%in, $module);

            # Returns a list of allowed domain related links
            if ($subtype eq 'links') {
                my @submenu = map {($_->{'link'} =~ /.*?$module.*\/(\w+\.cgi).*?$param=/)}
                  array_flatten(grep {$_->[0]->{'link'}} map {$_->{'members'}} @menu);
                @menu         = map {$_->{'link'} =~ /.*?$module.*\/(\w+\.cgi).*?$param=/} @menu;
                @menu         = (@menu, @submenu);
                $data{'menu'} = \@menu;
            }

        }

        # Returns default goto if set
        if ($action eq 'goto') {
            my $mod_def = $gconfig{'gotomodule'};

            # Validate if default goto is allowed for the given user
            if ($mod_def && foreign_available($mod_def)) {
                $data{'gotomodule'} = $mod_def;
            }

        }

        # Returns requested navigation
        if ($action eq 'get') {
            require("$ENV{'THEME_ROOT'}/navigation-lib.pl");
            my ($tab, $page) = nav_detector();
            if ($subtype eq 'cloudmin') {
                $data{'menu'} = nav_cloudmin_menu($page);
            } elsif ($subtype eq 'virtualmin') {
                $data{'menu'} = nav_virtualmin_menu($page);
            } elsif ($subtype eq 'webmail') {
                $data{'menu'} = nav_mailbox_menu($page);
            } else {
                $data{'menu'} = nav_webmin_menu($page);
            }
        }
    }

    # Check if action is allowed
    if ($type eq 'can') {
        if ($action eq 'view_dom') {
            $data{$action} = virtualmin_domain_available($in{'dom'}, 'id');
        }
    }

    # Set no links header
    print "x-no-links: 1\n";

    # Return fetched data if any
    print_json(\%data);
}

1;
