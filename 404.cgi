#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Ross <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our $trust_unknown_referers = 1;

do("$ENV{'THEME_ROOT'}/authentic-lib.pl");

error_40x();