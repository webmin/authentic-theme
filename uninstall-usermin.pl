use strict;
use warnings;
use WebminCore;
init_config();

our ($root_directory);
unlink_logged("$root_directory/authentic-theme/manifest-usermin.json");
