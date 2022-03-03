#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in);

do("$ENV{'THEME_ROOT'}/authentic-lib.pl");
do("$ENV{'THEME_ROOT'}/xhr-lib.pl");

xhr();
