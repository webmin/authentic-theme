#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
use lib ($ENV{'LIBROOT'} . "/vendor_perl");
BEGIN {push(@INC, "..");}
use WebminCore;
init_config();
do($ENV{'THEME_ROOT'} . "/authentic-funcs.pl");
do($ENV{'THEME_ROOT'} . "/stats-lib-funcs.pl");

1;
