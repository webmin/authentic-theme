#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;

our (%in, $cwd, @allowed_paths);

require($ENV{'THEME_ROOT'}."/extensions/file-manager/file-manager-lib.pl");

my $command;
my $has_zip = has_command('zip');
my $has_tar = has_command('tar');
my $do_zip = ($in{'do_zip'} eq '1' ? 1 : 0);
my $extension = (($has_zip && $do_zip && !test_all_items_query()) ? "zip" : "tar.gz");
my $filename = $in{'filename'};
my $target_dir = tempname("$filename");
my $target = "$target_dir/$filename.$extension";

if ($in{'cancel'} eq '1') {
	unlink_file($target_dir);
	}
elsif ($in{'download'} eq '2') {
	my $file = fm_checked_cwd_path_or_error($filename);
	$file = &resolve_links($file);
	print_error(
		&text(
			'notallowed',
			&html_escape($file),
			&html_escape(join(" , ", @allowed_paths))
		)
	) if (!fm_path_is_allowed($file));
	my $size = -s "$file";
	(my $name, my $dir, my $ext) = fileparse($file, qr/\.[^.]*/);
	print "Content-Type: application/x-download\n";
	print "Content-Disposition: attachment; filename=\"$name$ext\"\n";
	print "Content-Length: $size\n\n";
	open(FILE, "< $file") or die "can't open $file: $!";
	binmode FILE;
	local $/ = \&get_buffer_size_binary();

	while (<FILE>) {
		print $_;
		}
	close FILE;
	}
elsif ($in{'download'} eq '1') {
	# Serve the archive built by the earlier request, accepting the
	# other format too, in case the selection changed between the
	# requests and the format was computed differently
	my ($found) = grep { -e "$target_dir/$filename.$_" }
		($extension, $extension eq 'zip' ? 'tar.gz' : 'zip');
	if ($found) {
		my $file = simplify_path("$target_dir/$filename.$found");
		my $size = -s $file;
		print "Content-Type: application/x-download\n";
		print
		    "Content-Disposition: attachment; filename=\"$filename.$found\"\n";
		print "Content-Length: $size\n\n";
		open(FILE, "< $file") or die "can't open $file: $!";
		binmode FILE;
		local $/ = \&get_buffer_size_binary();

		while (<FILE>) {
			print $_;
			}
		close FILE;
		unlink_file($target_dir);
		}
	else {
		print_error(
			text(
				'theme_download_error_missing',
				&html_escape("$filename.$extension")
			)
		);
		}
	}
else {
	mkdir($target_dir, 0755);
	my @entries_list = get_entries_list();

	# Pass the names through a list file, so that a name starting
	# with a dash is not taken for an option
	my $list = transname();
	open(my $fh, ">", $list) or die $!;
	print $fh "$_\n" for @entries_list;
	close($fh);
	if ($extension eq 'zip') {
		# Store symlinks as links, and suppress normal per-file output
		$command =
		    "cd ".
		    quotemeta($cwd)." && ".
		    quotemeta($has_zip || 'zip')." -q -r -y ".
		    quotemeta($target)." -@ < ".quotemeta($list);
		}
	else {
		my $gnu_tar_param = get_tar_verbatim();

		# No need to resolve links and do extra check
		# because tar by default doesn't resolve links
		$command =
		    "".
		    quotemeta($has_tar || 'tar')." czf ".
		    quotemeta($target)." -C ".
		    quotemeta($cwd).
		    "$gnu_tar_param -T ".
		    quotemeta($list);
		}

	# Report a failed archive command right away, instead of leaving
	# the download request to find no archive. GNU tar exits with 1
	# for warnings, such as a file changed while being read, with the
	# archive still complete, so only higher codes count as failures.
	my $out = &backquote_logged("($command) 2>&1");
	my $code = $? >> 8;
	unlink($list);
	my $failed = $extension eq 'zip' ? $code != 0 : $code > 1;
	if ($failed || !-s $target) {
		unlink_file($target_dir);
		$out =~ s/^\s+|\s+$//g;
		print_error(
			text(
				'theme_download_error_create',
				&html_escape($out || "exit status $code")
			)
		);
		}
	}
head();
