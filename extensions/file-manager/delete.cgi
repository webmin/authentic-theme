#!/usr/local/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use lib ($ENV{'LIBROOT'}."/vendor_perl");

use File::Copy;
use File::Path;

our (%in, %text, $cwd, $path, @allowed_paths);

require($ENV{'THEME_ROOT'}."/extensions/file-manager/file-manager-lib.pl");

my %errors;
my @deleted_entries;

my @entries_list = get_entries_list();
@entries_list = sort_delete_entries(@entries_list);
my $fsid = $in{'fsid'};
my $time = strftime('%Y-%m-%d_%H:%M:%S', localtime());
my $tdirname = '.Trash';
my $mkpath_ = sub {
	my ($dir) = @_;
	my $rs = mkpath($dir, {owner => int($in{'uid'}), group => int($in{'guid'})});
	return $rs;
	};
my $etrashed = 0;

sub delete_entry_depth
{
my ($name) = @_;
my $depth = 0;
$depth++ while ($name =~ m!/!g);
return $depth;
}

sub sort_delete_entries
{
my @entries = @_;
my %seen;
my %order;
my %depth;
my @normalized;

foreach my $name (@entries) {
	$name = fm_normalize_path_name($name, $cwd);
	next if (!defined($name) || $name eq '' || $seen{$name}++);
	$order{$name} = scalar(@normalized);
	$depth{$name} = delete_entry_depth($name);
	push(@normalized, $name);
	}

# Search results can contain both a directory and its descendants.
return sort {
	$depth{$b} <=> $depth{$a} ||
	    $order{$a} <=> $order{$b}
	} @normalized;
}

foreach my $name (@entries_list) {
	my $name_ = $name;
	my $file = fm_checked_cwd_path_or_error($name);
	if ($in{'etrash'}) {
		# A listing may include allowed children of a restricted parent.
		# Check the trash directory itself before emptying it.
		my $tdir = fm_checked_cwd_path_or_error($tdirname);
		if (-l $tdir) {
			$errors{$name_} = $text{'filemanager_trash_symlink'};
			next;
			}
		if (!can_write($tdir)) {
			$errors{$name_} =
			    lc($text{'error_delete'}.lc(" - $text{'error_write'}"));
			next;
			}
		if (!&unlink_file($tdir)) {
			$errors{$name_} = lc($text{'error_delete'}.lc(" - $!"));
			}
		else {
			push(@deleted_entries, $name);
			}
		}
	elsif (!can_write($file)) {
		$errors{$name_} = lc($text{'error_delete'}.lc(" - $text{'error_write'}"));
		}
	elsif ($in{'trash'}) {
		my $jdir = $in{'home'};
		$jdir = $1 if ($jdir =~ m{/\.(/.*)$});
		my ($hdir) = grep { defined($_) && -d $_ && -w _ &&
		    fm_path_is_allowed($_) } ($jdir, $allowed_paths[0]);
		$hdir = abs_path($hdir) if (defined($hdir));
		if (!$hdir || !fm_path_is_allowed($hdir)) {
			$errors{$name_} = fm_not_allowed_error($name_, $jdir);
			next;
			}
		# Moving the trash into itself means emptying it only when
		# the trash is the sole selection. Never remove an ancestor.
		my $trash = simplify_path("$hdir/$tdirname");
		if (!-l $file && abs_path($file) eq $trash) {
			next if (@entries_list != 1);
			if (unlink_file($file)) {
				$etrashed = 1;
				push(@deleted_entries, $name);
				}
			else {
				$errors{$name_} = $text{'error_delete'};
				}
			next;
			}
		my $relative = "$tdirname/$cwd/".dirname($name);
		if ((!-l $file && filemin_path_under_directory($file, "$hdir/$relative")) ||
		    basename($name) eq '.') {
			$errors{$name_} = $text{'error_delete'};
			next;
			}

		my $tdir = "$hdir/$tdirname/$cwd";
		my $mkpathr = &$mkpath_($tdir);
		my $tfile;
		if (!$mkpathr && (-e "$tdir/$name" || -l "$tdir/$name")) {
			$tfile = "$tdir/$name-$time";
			&$mkpath_($tdir);
			}
		my $target = $tfile || "$tdir/$name";
		if ($name =~ m!/!) {
			(my $target_dir = $target) =~ s!/[^/]+$!!;
			&$mkpath_($target_dir) if (!-d $target_dir);
			}
		if (!move($file, $target)) {
			$errors{$name_} = lc($text{'error_delete'}.lc(" - $!"));
			}
		else {
			push(@deleted_entries, $name);
			}
		}
	elsif (!&unlink_file($file)) {
		$errors{$name_} = lc($text{'error_delete'}.lc(" - $!"));
		}
	else {
		push(@deleted_entries, $name);
		}
	}

if ($fsid) {
	cache_search_delete($fsid, \@deleted_entries);
	}

redirect_local('list.cgi?path='.
	    urlize($path).
	    '&module=filemin'.
	    '&etrashed='.
	    $etrashed.
	    '&error='.
	    get_errors(\%errors).
	    extra_query());
