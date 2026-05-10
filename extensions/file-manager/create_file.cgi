#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (%in, %text, $cwd, $path);

require($ENV{'THEME_ROOT'}."/extensions/file-manager/file-manager-lib.pl");

my $path_urlized = urlize($path);

if (!$in{'name'}) {
	redirect_local(("list.cgi?path=$path_urlized&module=filemin".extra_query()));
	}

my $file = fm_checked_cwd_path_or_error($in{'name'});
my $type;
if (-d $file) {
	$type = 'directory';
	}
else {
	$type = 'file';
	}

if (-f $file || -d $file) {
	print_error(
		(
			text(
				'filemanager_create_object_exists',
				html_escape($in{'name'}),
				html_escape($path),
				$text{'theme_xhred_global_'.$type.''}
			)
		)
	);
	}
else {
	if (open my $fh, ">", $file) {
		close($fh);
		redirect_local(
			("list.cgi?path=$path_urlized&module=filemin".extra_query()));
		}
	else {
		print_error(
			(
				text(
					'filemanager_create_object_denied',
					html_escape($in{'name'}),
					html_escape($path),
					$text{'theme_xhred_global_file'}
				)
			)
		);
		}
	}
