#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;
no warnings 'uninitialized';

use lib ($ENV{'LIBROOT'} . "/vendor_perl");
use Async;

BEGIN {push(@INC, "..");}
use WebminCore;

do($ENV{'THEME_ROOT'} . "/authentic-funcs.pl");
do($ENV{'THEME_ROOT'} . "/stats-lib.pl");

init_config();
ReadParse();

init_prefail();
print_json({}), exit if (!defined(&webmin_user_is_admin));
print_json({}), exit if (!webmin_user_is_admin());

# Return results
print_json(stats());
