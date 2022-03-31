#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use lib ("$ENV{'THEME_ROOT'}/lib");

our (%access, @remote_user_info, %in, %text, $path);

do("$ENV{'THEME_ROOT'}/extensions/file-manager/file-manager-lib.pl");

my %errors;
my $tdirname = '.Trash';
my $trashall = $in{'trash_all'};

# Delete all trashes if allowed
if ($trashall &&
    $access{'work_as_root'} &&
    !$access{'work_as_user'})
{
    &foreign_require("useradmin");
    my %uaconfig   = %useradmin::config;
    my %uaaccess   = %useradmin::access;
    my @uaallulist = &useradmin::list_users();
    my @uaulist    = &useradmin::list_allowed_users(\%uaaccess, \@uaallulist);
    return if (!$uaconfig{'home_base'} || $uaconfig{'base_uid'} !~ /^\d+$/);
    my @uahomeulist =
      grep {$_->{'home'} =~ /^\Q$uaconfig{'home_base'}\E/ && $_->{'uid'} >= $uaconfig{'base_uid'}} @uaulist;
    foreach my $uhome (@uahomeulist) {
        my $tdir = "$uhome->{'home'}/$tdirname";
        &unlink_file($tdir) if (-w $tdir);
    }
}

# Delete for the current user
elsif (-w $remote_user_info[7]) {
    my $tdir = "$remote_user_info[7]/$tdirname";
    &unlink_file($tdir) if (-w $tdir);
}

redirect_local(
           'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . get_errors(\%errors) . extra_query());
