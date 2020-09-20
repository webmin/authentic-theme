#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Jamie Cameron <jamie@virtualmin.com>
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;
use warnings;

use File::Basename;

our (%text, %in, $config_directory, $user_config_directory, %theme_text);

require(dirname(__FILE__) . "/authentic-lib.pl");
require(dirname(__FILE__) . "/../config-lib.pl");

my (%access,
    %module_info,
    %info,
    %newconfig,
    %canconfig,
    @info_order,
    @sections,
    $help,
    $idx,
    $sname,
    $section,
    $module,
    $module_dir,
    %moduletext);

$module = $in{'module'} || $ARGV[0];
&foreign_available($module) || &error($text{'config_eaccess'});
&switch_to_remote_user();
&create_user_config_dirs();
%module_info = &get_module_info($module);

if (-r &help_file($module, "config_intro")) {
    $help = ["config_intro", $module];
} else {
    $help = undef;
}
&ui_print_header(&text('config_dir', $module_info{'desc'}), $text{'config_title'}, "", $help, 0, 1);
$module_dir = &module_root_directory($module);

# Read the uconfig.info file to find sections
&read_file("$module_dir/uconfig.info", \%info, \@info_order);
foreach my $i (@info_order) {
    my @p = split(/,/, $info{$i});
    if ($p[1] == 11) {
        push(@sections, [$i, $p[0]]);
    }
}
if (@sections > 1) {

    # Work out template section to edit
    $in{'section'} ||= $sections[0]->[0];
    $idx = &indexof($in{'section'}, map {$_->[0]} @sections);
    if ($in{'nprev'}) {
        $idx--;
        $idx = @sections - 1 if ($idx < 0);
    } elsif ($in{'nnext'}) {
        $idx++;
        $idx = 0 if ($idx >= @sections);
    }
    $in{'section'} = $sections[$idx]->[0];

    # We have some sections .. show a menu to select
    print &ui_form_start("uconfig.cgi");
    print &ui_hidden("module", $module), "\n";
    print &ui_span_local($theme_text{'settings_config_configuration_category'} . ":", 'row-block-label') . "\n";
    print &ui_select("section", $in{'section'}, \@sections, 1, 0, 0, 0, "onChange='form.submit()'");
    print &ui_button_group_local(
                                 (
                                  &ui_submit($theme_text{'extensions_mail_pagination_left'},
                                             "nprev", undef, undef, "fa fa-fw fa-arrow-circle-o-left",
                                             "heighter-28")
                                    .
                                    &ui_submit($theme_text{'extensions_mail_pagination_right'},
                                               "nnext", undef, undef, "fa fa-fw fa-arrow-circle-o-right",
                                               "heighter-28"
                                    )
                                 ),
                                 'end_submits');
    print &ui_form_end();
    ($section) = grep {$_->[0] eq $in{'section'}} @sections;
    $sname = "$section->[1]";
}
$sname = $theme_text{'theme_xhred_config_configurable_options'} if (!$sname);

print &ui_form_start("uconfig_save.cgi", "post");
print &ui_hidden("module", $module), "\n";
print &ui_hidden("section", $in{'section'}), "\n";
if ($section) {

    # Find next section
    $idx = &indexof($section, @sections);
    if ($idx == @sections - 1) {
        print &ui_hidden("section_next", $sections[0]->[0]);
    } else {
        print &ui_hidden("section_next", $sections[$idx + 1]->[0]);
    }
}
print &ui_table_start($sname, "width=100%", 2);
&read_file("$module/defaultuconfig",                \%newconfig);
&read_file("$config_directory/$module/uconfig",     \%newconfig);
&read_file("$user_config_directory/$module/config", \%newconfig);
&read_file("$config_directory/$module/canconfig",   \%canconfig);

my $func;
if (-r "$module_dir/uconfig_info.pl") {

    # Module has a custom config editor
    &foreign_require($module, "uconfig_info.pl");
    my $fn = "${module}::config_form";
    if (defined(&$fn)) {
        $func++;
        &foreign_call($module, "config_form", \%newconfig, \%canconfig);
    }
}
if (!$func) {

    # Use config.info to create config inputs
    &generate_config(\%newconfig, "$module_dir/uconfig.info", $module, (%canconfig ? \%canconfig : undef),
                     undef, $in{'section'});
}
print &ui_table_end();
print &ui_form_end([["save", $text{'save'}], $section ? (["save_next", $theme_text{'settings_config_save_and_next'}]) : ()]);

%moduletext = &load_language($module);
&ui_print_footer("/$module", $moduletext{'index_return'} || $text{'index'});
