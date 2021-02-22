#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Jamie Cameron <jamie@virtualmin.com>
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

use strict;
use warnings;

our (%text, %in, $root_directory, $config_directory, $remote_user, $current_theme, %theme_text);

require("@{[miniserv::getenv('theme_root')]}/authentic-lib.pl");
require("$root_directory/config-lib.pl");

my (%access, %module_info, %info, %newconfig, @info_order, @sections, $help, $idx, $sname, $section, $module, $module_dir,
    $module_custom_config_file, $module_config_file, %moduletext);

$module                    = $in{'module'} || $ARGV[0];
$module_custom_config_file = "$root_directory/$current_theme/modules/$module/config.info";

&foreign_available($module) || &error($text{'config_eaccess'});
%access = &get_module_acl(undef, $module);
$access{'noconfig'} && &error($text{'config_ecannot'});
%module_info = &get_module_info($module);
if (-r &help_file($module, "config_intro")) {
    $help = ["config_intro", $module];
} else {
    $help = undef;
}
&ui_print_header(&text('config_dir', $module_info{'desc'}), $text{'config_title'}, "", $help, 0, 1);
$module_dir         = &module_root_directory($module);
$module_config_file = -r $module_custom_config_file ? $module_custom_config_file : "$module_dir/config.info";

# Read the config.info file to find sections
&read_file($module_config_file, \%info, \@info_order);
my @config_quick_access;
my $config_quick_access_section;
my $config_quick_access_category;
foreach my $i (@info_order) {
    my @p = split(/,/, $info{$i});
    if ($p[1] == 11) {
        push(@sections, [$i, $p[0]]);
        $config_quick_access_section  = $i;
        $config_quick_access_category = $p[0];
    } else {
        my $value = $p[0];
        $value =~ s/<(?:[^>'"]*|(['"]).*?\1)*>//gs;
        push(@config_quick_access,
             {  value   => $value,
                section => $config_quick_access_section,
                data    => { category => $config_quick_access_category }
             });
    }
}
if (@sections > 1) {
    print ' <script>';
    print 'var config_quick_access = ' . convert_to_json(\@config_quick_access);
    print "</script>\n";

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
    print &ui_form_start("config.cgi");
    print &ui_hidden("module", $module), "\n";
    print &ui_span_local($theme_text{'settings_config_configuration_category'} . ":", 'row-block-label') . "\n";
    print &ui_select("section", $in{'section'}, \@sections, 1, 0, 0, 0, "onChange='form.submit()'");
    print &ui_button_group_local(
                                 (
                                  &ui_dropdown_local([(&ui_textbox('search'))],
                                                     {  'title'           => $theme_text{'config_search_options_all'},
                                                        'icon'            => 'fa fa-md fa-file-find',
                                                        'container-class' => 'elm-rel-z config-search',
                                                        'button-class'    => 'btn-default elm-rel-z heighter-28 pd-lr-8',
                                                        'ul-class'        => 'pd-tb-0',
                                                     }
                                    )
                                    .
                                    &ui_submit($theme_text{'extensions_mail_pagination_left'},
                                               "nprev", undef, undef,
                                               "fa fa-fw fa-arrow-circle-o-left",
                                               "heighter-28 margined-left-5")
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

print &ui_form_start("config_save.cgi", "post");
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

# A rare and not recommened case to use, when
# custom config needs to be used for a module
# provided by theme itself
if (-r $module_custom_config_file) {
    my $module_custom_config_default = "$root_directory/$current_theme/modules/$module/config.defaults";
    if (-r $module_custom_config_default) {
        &read_file($module_custom_config_default, \%newconfig);
    }
}

# Load module default config
my $current_config = "$config_directory/$module/config";
&read_file($current_config, \%newconfig);

# Load user preferences
&load_module_preferences($module, \%newconfig);

my $func;
if (-r "$module_dir/config_info.pl") {

    # Module has a custom config editor
    &foreign_require($module, "config_info.pl");
    my $fn = "${module}::config_form";
    if (defined(&$fn)) {
        $func++;
        &foreign_call($module, "config_form", \%newconfig);
    }
}
if (!$func) {

    # Use config.info to create config inputs
    &generate_config(\%newconfig, $module_config_file, $module, undef, undef, $in{'section'});
}
print &ui_table_end();
print &ui_form_end([["save", $text{'save'}], $section ? (["save_next", $theme_text{'settings_config_save_and_next'}]) : ()]);

%moduletext = &load_language($module);
&ui_print_footer("/$module", $moduletext{'index_return'} || $text{'index'});

