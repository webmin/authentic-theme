#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %request_uri, $cwd, $base, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

open(my $fh, "<" . &get_paste_buffer_file()) or die "Error: $!";
my @arr = <$fh>;
close($fh);
my $act = $arr[0];
my $dir = $arr[1];
chomp($act);
chomp($dir);
my $from = abs_path($base . $dir);
my @errors;
my $mv = ($act eq "copy"            ? 0 : 1);
my $fr = (length $request_uri{'ua'} ? 1 : 0);
my $fo = ($request_uri{'ua'} eq '1' ? 1 : 0);

for (my $i = 2; $i <= scalar(@arr) - 1; $i++) {
    chomp($arr[$i]);
    $arr[$i] = simplify_path($arr[$i]);

    my $out;
    if ((-e "$cwd/$arr[$i]") && $cwd ne $from && !$fr) {
        set_response('ep');
    } else {
        $out = paster("$cwd", "$arr[$i]", "$from/$arr[$i]", "$cwd/$arr[$i]", $fo, $mv);
    }
    $out && push(@errors, $out);
}

if (scalar(@errors) > 0) {
    set_response('err');
    redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=' . text('filemanager_paste_warning'));
} else {
    set_response_count(scalar(@arr) - 2);
    redirect('list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} . '&error=1');
}
