use strict;
use warnings;
use WebminCore;
init_config();

our ($config_directory, $root_directory);

sub module_install
{
    foreach my $f (
        "manifest-cloudmin.json",
        "manifest-usermin.json",
        "manifest-webmin.json",
        "manifest-virtualmin.json")
    {
        symlink_logged("$config_directory/authentic-theme/$f",
                       "$root_directory/authentic-theme/$f");
    }

    # Clear potentially stuck menus and other cache
    flush_webmin_caches();

    # Clear links cache
    if (&foreign_check('virtual-server')) {
        &foreign_require("virtual-server");
        &virtual_server::clear_links_cache();
    }
}
