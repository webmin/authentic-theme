#!/usr/local/bin/perl

use strict;
use warnings;
use WebminCore;
init_config();

our ($config_directory, $root_directory);
symlink_logged("$config_directory/authentic-theme/manifest-usermin.json",
               "$root_directory/authentic-theme/manifest-usermin.json");
