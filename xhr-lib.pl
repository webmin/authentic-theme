#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in);

sub xhr
{
    my $type = $in{'type'};
    my %data = ();

    # Returns navigation menu available for requested virtual server
    if ($type eq 'nav') {
        my @menu = list_combined_webmin_menu(undef, \%in);

        # Returns a list of allowed domain related links
        if ($in{'subtype'} eq 'links') {
            my @submenu = map {($_->{'link'} =~ /.*\/(\w+\.cgi).*?dom=/)}
              array_flatten(grep {$_->[0]->{'link'}} map {$_->{'members'}} @menu);
            @menu         = map {$_->{'link'} =~ /.*\/(\w+\.cgi).*?dom=/} @menu;
            @menu         = (@menu, @submenu);
            $data{'menu'} = \@menu;
        }
    }

    # Return fetched data if any
    print_json(\%data);
}

1;
