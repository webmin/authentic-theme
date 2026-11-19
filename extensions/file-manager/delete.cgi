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
use Fcntl qw(O_RDONLY O_NOFOLLOW O_NONBLOCK O_CREAT O_WRONLY O_EXCL);

our (%in, %text, $cwd, $path, @allowed_paths);

require($ENV{'THEME_ROOT'}."/extensions/file-manager/file-manager-lib.pl");

my %errors;
my @deleted_entries;

my @entries_list = get_entries_list();
@entries_list = sort_delete_entries(@entries_list);
my $fsid = $in{'fsid'};
my $time = strftime('%Y-%m-%d_%H:%M:%S', localtime());
my $tdirname = '.Trash';
my $etrashed = 0;

# enter_trash_directory(home, relative-directory)
# Enter each directory by handle so a renamed directory cannot redirect
# later operations. New directories belong to the owner of the trash home.
sub enter_trash_directory
{
my ($home, $relative) = @_;
my $dh;
sysopen($dh, $home, O_RDONLY | O_NOFOLLOW | O_NONBLOCK) && -d $dh && chdir($dh) ||
	return;
return if (!fm_path_is_allowed(Cwd::getcwd()));
my @owner = (stat($dh))[4, 5];
foreach my $part (split(m{/+}, $relative)) {
	next if ($part eq '' || $part eq '.');
	return if ($part eq '..');
	my $created = mkdir($part, 0700);
	return if (!$created && !$!{EEXIST});
	sysopen($dh, $part, O_RDONLY | O_NOFOLLOW | O_NONBLOCK) && -d $dh && chdir($dh) ||
		return;
	return if ($created && $> == 0 && !chown(@owner, $dh));
	}
return $dh;
}

# trash_move(file, name, time)
# The current directory is the verified trash destination. Reserve the
# name so simultaneous deletions keep separate copies of the same file.
sub trash_move
{
my ($file, $name, $time) = @_;
my @src = lstat($file);
return 0 if (!@src);
my $isdir = -d _;
my ($target, $fh);
for (my $i = 0; ; $i++) {
	$target = !$i ? $name : $i == 1 ? "$name-$time" : "$name-$time-$i";
	last if ($isdir ? mkdir($target, 0700) :
	    sysopen($fh, $target, O_WRONLY | O_CREAT | O_EXCL, 0600));
	return 0 if (!$!{EEXIST});
	}
return 1 if (rename($file, $target));

# Across filesystems a regular file must be copied before removing it.
# Use open handles for the copy and keep the file's ordinary permissions
# and timestamps. A symbolic link stays a link.
my $err = $!;
if ($!{EXDEV} && !$isdir) {
	if (($src[2] & 0170000) == 0120000) {
		my $link = readlink($file);
		unlink($target) || return 0;
		defined($link) && symlink($link, $target) || return 0;
		return unlink($file);
		}
	my $in;
	if (($src[2] & 0170000) == 0100000 &&
	    sysopen($in, $file, O_RDONLY | O_NOFOLLOW | O_NONBLOCK) &&
	    filemin_same_file(\@src, [ stat($in) ]) && copy($in, $fh) &&
	    ($> != 0 || chown(@src[4, 5], $fh)) &&
	    chmod($src[2] & 0777, $fh) && utime(@src[8, 9], $fh) &&
	    close($fh)) {
		return unlink($file);
		}
	if ($!) {
		$err = $!;
		}
	}
$isdir ? rmdir($target) : unlink($target);
$! = $err;
return 0;
}

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

		opendir(my $orig, '.') || die "Cannot open current directory: $!";
		my $dir = enter_trash_directory($hdir, $relative);
		if (!$dir) {
			$errors{$name_} = $text{'error_delete'}." - $!";
			}
		elsif (!trash_move($file, basename($name), $time)) {
			$errors{$name_} = $text{'error_delete'}." - $!";
			}
		else {
			push(@deleted_entries, $name);
			}
		chdir($orig) || die "Cannot return to original directory: $!";
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
