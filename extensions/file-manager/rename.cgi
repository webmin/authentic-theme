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

if (!$in{'name'}) {
	redirect_local('list.cgi?path='.urlize($path).'&module=filemin'.extra_query());
	}

$path = $path || "/";

my $to_file = fm_checked_cwd_path_or_error($in{'name'});
my $type;
if (-d $to_file) {
	$type = 'directory';
	}
else {
	$type = 'file';
	}

if (-e $to_file) {
	print_error(
		(
			text(
				'filemanager_rename_exists',
				html_escape($in{'name'}),
				$path,
				$text{'theme_xhred_global_'.$type.''}
			)
		)
	);
	}
else {
	my $from = $in{'file'};
	my $to = $in{'name'};
	my $fsid = $in{'fsid'};
	my $from_file = fm_checked_cwd_path_or_error($from);
	my $from_dir = $from_file;
	my $to_dir = $to_file;
	$from_dir =~ s/\/[^\/]*$//;
	$to_dir =~ s/\/[^\/]*$//;
	$from_dir ||= '/';
	$to_dir ||= '/';

	if (can_move($from_file, $from_dir, $to_dir) &&
		rename_file($from_file, $to_file))
	{
		cache_search_rename($fsid, $from, $to) if ($fsid);
		redirect_local(
			'list.cgi?path='.urlize($path).'&module=filemin'.extra_query());
		}
	else {
		print_error(
			(
				text(
					'filemanager_rename_denied',
					html_escape($to),
					html_escape($path),
					lc($text{'theme_xhred_global_'.$type.''})
				)
			)
		);
		}
	}
