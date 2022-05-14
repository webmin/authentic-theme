#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our ($config_directory, $current_theme, $remote_user);

sub get_settings_editor_files
{
    return ($config_directory . "/$current_theme/styles.css",
            $config_directory . "/$current_theme/scripts.js",
            $config_directory . "/$current_theme/scripts.pl",
            $config_directory . "/$current_theme/favorites-$remote_user.json",
            $config_directory . "/$current_theme/custom-lang");
}
