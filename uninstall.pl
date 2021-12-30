use strict;
use warnings;
use WebminCore;
init_config();

our ($root_directory);

sub module_uninstall
{
    foreach my $f (
        "manifest-cloudmin.json",
        "manifest-usermin.json",
        "manifest-webmin.json",
        "manifest-virtualmin.json")
    {
	&unlink_logged("$root_directory/authentic-theme/$f");
    }
}
