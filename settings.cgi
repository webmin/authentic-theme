#!/usr/bin/perl
#
<<<<<<< HEAD
# Authentic Theme 17.00 (https://github.com/qooob/authentic-theme)
=======
# Authentic Theme 16.01 (https://github.com/qooob/authentic-theme)
>>>>>>> 26c36195a7bc42a58e36b30aed57642ba4b432c4
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

