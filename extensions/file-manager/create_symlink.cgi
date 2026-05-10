#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

require($ENV{'THEME_ROOT'}."/extensions/file-manager/file-manager-lib.pl");

my @entries_list = get_entries_list();
my $path_urlized = urlize($path);
my $error;

if (!@entries_list) {
	redirect_local(("list.cgi?path=$path_urlized&module=filemin".extra_query()));
	}
foreach my $name (@entries_list) {
	my $name_ = $name;
	my $source = fm_checked_cwd_path_or_error($name);
	my $symlink_name = "${name}--symlink";
	my $symlink = fm_checked_cwd_path_or_error($symlink_name);

	# If symlink exists add a numerable suffix
	if (-e $symlink) {
		my $__ = 1;
		for (; ;) {
			my $necwd =
			    fm_checked_cwd_path_or_error($symlink_name."(".$__++ .")");
			if (!-e $necwd) {
				$symlink = $necwd;
				last;
				}
			}
		}

	if (symlink_file($source, $symlink) == 0) {
		$error .= "<br>" if ($error);
		$error .=
		    text('filemanager_symlink_exists', html_escape("${name_}_symlink"),
			html_escape($cwd));
		}
	}
redirect_local('list.cgi?path='.
	    $path_urlized.
	    '&module=filemin'.
	    '&error='.
	    $error.
	    extra_query());
