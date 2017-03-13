package Version::Compare;
$Version::Compare::VERSION = '0.15.0';
BEGIN {
  $Version::Compare::AUTHORITY = 'cpan:TEX';
}
# ABSTRACT: Compare version strings

use warnings;
use strict;


sub max {
    my $x = shift;
    my $y = shift;
    return ( $x > $y ? $x : $y );
}

## no critic(ProhibitNumberedNames ProhibitCStyleForLoops)
sub version_compare {
    my $ver1 = shift || 0;
    my $ver2 = shift || 0;
    my @v1 = split /[.+:~-]/, $ver1;
    my @v2 = split /[.+:~-]/, $ver2;

    for ( my $i = 0 ; $i < max( scalar(@v1), scalar(@v2) ) ; $i++ ) {

        # Add missing version parts if one string is shorter than the other
        # i.e. 0 should be lt 0.2.1 and not equal, so we append .0
        # -> 0.0.0 <=> 0.2.1 -> -1
        push( @v1, 0 ) unless defined( $v1[$i] );
        push( @v2, 0 ) unless defined( $v2[$i] );
        if ( int( $v1[$i] ) > int( $v2[$i] ) ) {
            return 1;
        }
        elsif ( int( $v1[$i] ) < int( $v2[$i] ) ) {
            return -1;
        }
    }
    return 0;
}

sub semver_compare {
  my $ver1 = shift || 0;
  my $ver2 = shift || 0;

  print "\n\n$ver1 vs. $ver2\n";

  my $v1 = _parse_semver( $ver1 );
  my $v2 = _parse_semver( $ver2 );

  foreach my $k (qw(Major Minor Patch)) {
    if ( int ( $v1->{$k} ) > int( $v2->{$k} ) ) {
      return 1;
    }
    elsif ( int( $v1->{$k} ) < int( $v2->{$k} ) ) {
      return -1;
    }
  }
  return _semver_prs_compare( $v1->{'PR'}, $v2->{'PR'} );
}

sub _semver_prs_compare {
  my $pr1 = shift;
  my $pr2 = shift;

  if(scalar(@$pr1) == 0 && scalar(@$pr2) == 0) {
    return 0;
  } elsif( scalar(@$pr1) == 0 && scalar(@$pr2) > 0) {
    return 1;
  } elsif( scalar(@$pr1) > 0 && scalar(@$pr2) == 0) {
    return -1;
  } else {
    my $i = 0;

    PR: for ( ; $i < scalar(@$pr1) && $i < scalar(@$pr2); $i++ ) {
      my $comp = _semver_pr_compare($pr1->[$i], $pr2->[$i]);
      if($comp == 0) {
        next PR;
      } elsif( $comp == 1 ) {
        return 1;
      } else {
        return -1;
      }
    }
    if ( $i == scalar(@$pr1) && $i == scalar(@$pr2) ) {
      return 0;
    } elsif( $i == scalar(@$pr1) && $i < scalar(@$pr2) ) {
      return -1;
    } else {
      return 1;
    }
  }
}

sub _semver_pr_compare {
  my $pr1 = shift;
  my $pr2 = shift;

  my $re = qr/^[0-9]+$/;
  if ( $pr1 =~ m/^$re$/ && $pr2 !~ m/^$re$/ ) {
    return -1;
  } elsif ( $pr1 !~ m/^$re$/ && $pr2 =~ m/^$re$/ ) {
    return 1;
  } elsif ( $pr1 =~ m/^$re$/ && $pr2 =~ m/^$re$/ ) {
    return $pr1 <=> $pr2;
  } else {
    return $pr1 cmp $pr2;
  }
}

sub _parse_semver {
  my $sv = shift;

  my $vp = {};
  # [0] -> Major
  # [1] -> Minor
  # [2] -> Patch+PR+Meta
  my @v = split /\./, $sv, 3;
  if(scalar(@v) < 3) {
    die("Invalid version string!");
  }
  $vp->{'Major'} = $v[0];
  $vp->{'Minor'} = $v[1];

  my ($patch, $pr, $build);
  if( $v[2] =~ m/\+-/ ) {
    ( $patch, $pr, $build ) = split /[+-]/, $v[2];
  } elsif( $v[2] =~ m/\+/ ) {
    ( $patch, $build ) = split /[+]/, $v[2];
  } elsif( $v[2] =~ m/-/ ) {
    ( $patch, $pr ) = split /[-]/, $v[2];
  } else {
    $patch = $v[2];
  }
  $vp->{'Patch'} = $patch;
  $vp->{'PR'} = _parse_semver_pr( $pr );

  if ( $build ) {
    $vp->{'Build'} = $build;
  }

  return $vp;
}

sub _parse_semver_pr {
  my $pr = shift;

  return [] if !$pr;
  return [] if length($pr) < 1;

  my @prs = split /\./, $pr;
  return \@prs;
}
## use critic

## no critic (RequireArgUnpacking ProhibitBuiltinHomonyms)
sub cmp {
    return version_compare(@_);
}
## use critic


1; # End of Version::Compare

__END__

=pod

=encoding UTF-8

=head1 NAME

Version::Compare - Compare version strings

=head1 SYNOPSIS

    use Version::Compare;

    if(&Version::Compare::version_compare('2.6.26','2.6.0') == 1) {
        print "2.6.26 is greater than 2.6.0\n";
    }

=head1 NAME

Version::Compare - Comparing version strings

=head1 SUBROUTINES/METHODS

=head2 max

Return the bigger of the two numerical values

=head2 version_compare

Compare two unix-style version strings like 2.6.23.1 and 2.6.33 and return and sort-like
return code (1 => LHS bigger, 0 => equal, -1 => RHS bigger)

0.0 < 0.5 < 0.10 < 0.99 < 1 < 1.0~rc1 < 1.0 < 1.0+b1 < 1.0+nmu1 < 1.1 < 2.0

=head2 semver_compare

Compare two semantic version strings as defined by the
Semantic Versioning spec 2.0.0.

=head2 cmp

See L<version_compare>.

=head1 AUTHOR

Dominik Schulz, C<< <dominik.schulz at gauner.org> >>

=head1 BUGS

Please report any bugs or feature requests to C<bug-version-compare at rt.cpan.org>, or through
the web interface at L<http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Version-Compare>.  I will be notified, and then you'll
automatically be notified of progress on your bug as I make changes.

=head1 SUPPORT

You can find documentation for this module with the perldoc command.

    perldoc Version::Compare

You can also look for information at:

=over 4

=item * RT: CPAN's request tracker

L<http://rt.cpan.org/NoAuth/Bugs.html?Dist=Version-Compare>

=item * AnnoCPAN: Annotated CPAN documentation

L<http://annocpan.org/dist/Version-Compare>

=item * CPAN Ratings

L<http://cpanratings.perl.org/d/Version-Compare>

=item * Search CPAN

L<http://search.cpan.org/dist/Version-Compare/>

=back

=head1 LICENSE AND COPYRIGHT

Copyright 2012 Dominik Schulz

This program is free software; you can redistribute it and/or modify it
under the terms of either: the GNU General Public License as published
by the Free Software Foundation; or the Artistic License.

See http://dev.perl.org/licenses/ for more information.

=head1 AUTHOR

Dominik Schulz <dominik.schulz@gauner.org>

=head1 COPYRIGHT AND LICENSE

This software is copyright (c) 2014 by Dominik Schulz.

This is free software; you can redistribute it and/or modify it under
the same terms as the Perl 5 programming language system itself.

=cut
