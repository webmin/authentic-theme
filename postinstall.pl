
use WebminCore;
init_config();

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

    clear_theme_cache();
}
