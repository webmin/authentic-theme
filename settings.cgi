#!/usr/bin/perl
#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our @_s_e = _settings( 'exclusions', undef, undef );
my @settings = _settings( 'get', undef, undef );
print _settings( 'header', undef, undef );
for ( my $i = 0; $i < scalar(@settings) - 1; $i += 2 ) {
    if ( $settings[$i] ne '__' ) {
        print _settings( 'content', $settings[$i], $settings[ $i + 1 ] );
    }
    else {
        my @section = split /\~/, $settings[ $i + 1 ];
        print _settings( 'section', $section[0], $section[1] );
    }
}
print _settings( 'footer', undef, undef );

