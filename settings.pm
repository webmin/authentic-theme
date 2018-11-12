#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

theme_settings('exclusions', undef, undef);
my @settings = theme_settings('get', undef, undef);
print theme_settings('header', undef, undef);
for (my $i = 0; $i < scalar(@settings) - 1; $i += 2) {
    if ($settings[$i] ne '__') {
        print theme_settings('content', $settings[$i], $settings[$i + 1]);
    } else {
        my @section = split(/\~/, $settings[$i + 1]);
        print theme_settings('section', $section[0], $section[1]);
    }
}
print theme_settings('footer', undef, undef);

1;
