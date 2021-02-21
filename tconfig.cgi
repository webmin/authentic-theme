#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our ($remote_user, %gconfig, %text, %in, %theme_config, %theme_text, $has_usermin, $get_user_level);

do("@{[miniserv::getenv('theme_root')]}/authentic-lib.pl");
do("@{[miniserv::getenv('theme_root')]}/tconfig-lib.pl");

($get_user_level ne '0' && $theme_config{'settings_theme_config_admins_only_privileged'} eq 'true') &&
  error($theme_text{'settings_theme_config_admins_only_privileged_error'});

ui_print_header(($theme_text{'settings_subtitle'} . ' <tt>' . $remote_user . '</tt>'),
                $theme_text{'settings_title'},
                undef, undef, undef, 1);

# Define all available options
my @excluded_options = theme_settings_filter();
my @settings         = theme_settings_raw();
my @sections;
my @config_quick_access;

# Format options for display and build quick access filter
foreach my $sections (keys @settings) {
    foreach my $section ($settings[$sections]) {
        for (my $i = 0; $i < scalar(@{ $section->[0]->{'data'} }); $i++) {
            my @key_value_formated =
              theme_settings_format(@{ $section->[0]->{'data'} }[$i],
                                    $theme_config{ @{ $section->[0]->{'data'} }[$i] },
                                    \@excluded_options);
            if (!$key_value_formated[0][0]) {
                delete $section->[0]->{'data'}[$i];
                next;
            }
            $section->[0]->{'data'}[$i] = [$key_value_formated[0][0], $key_value_formated[0][1]];
            $key_value_formated[0][0] =~ s/<div.*?>.*?<\/div>//gm;
            $key_value_formated[0][0] =~ s/<span.*?>.*?<\/span>//gm;
            $key_value_formated[0][0] =~ s/<sup.*?>.*?<\/sup>//gm;
            $key_value_formated[0][0] =~ s/<code>(.*?)<\/code>.*/$1/;
            push(@config_quick_access,
                 {  'value'   => $key_value_formated[0][0],
                    'section' => $section->[0]->{'id'},
                    'data'    => { category => $section->[0]->{'title'} }
                 });
        }

        # Remove undefined values which where previously discarded
        @{ $section->[0]->{'data'} } = grep(defined, @{ $section->[0]->{'data'} });

        # If section happened to be empty, remove it as well
        if (!scalar(@{ $section->[0]->{'data'} })) {
            delete $settings[$sections];
        } else {
            push(@sections, [$section->[0]->{'id'}, $section->[0]->{'title'}]);
        }
    }
}

my ($section, $sid, $sname);
if (@sections > 1) {
    print ' <script>';
    print 'var config_quick_access = ' . convert_to_json(\@config_quick_access);
    print "</script>\n";

    # Work out template section to edit
    $in{'section'} ||= $sections[0]->[0];
    my $idx = &indexof($in{'section'}, map {$_->[0]} @sections);
    if ($in{'nprev'}) {
        $idx--;
        $idx = @sections - 1 if ($idx < 0);
    } elsif ($in{'nnext'}) {
        $idx++;
        $idx = 0 if ($idx >= @sections);
    }
    $in{'section'} = $sections[$idx]->[0];

    print &ui_form_start("tconfig.cgi");
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
    $sid   = "$section->[0]";
    $sname = "$section->[1]";
}

print ui_form_start("tconfig.cgi", "post", undef, 'id="settings_"');
print &ui_hidden("section", $in{'section'}), "\n";
print ui_table_start($sname, undef, 2);
foreach my $s (@settings) {
    if ($s->[0]->{'id'} eq $sid) {
        if ($s->[0]->{'desc'}) {
            print ui_table_row(undef, "<div class=\"table-cell-padded\">$s->[0]->{'desc'}</div>", 2);
        }
        for (my $i = 0; $i < scalar(@{ $s->[0]->{'data'} }); $i++) {
            print ui_table_row(@{ $s->[0]->{'data'} }[$i]->[0], @{ $s->[0]->{'data'} }[$i]->[1]);
        }
    }
}
print ui_table_end();

# Print footer with left and
my @theme_footer = theme_footer();
print '
<table class="ui_form_end_buttons" style="width:100%">
    <tbody>
        <tr>
            <td>
                ' . $theme_footer[0] . '
            </td>
            <td>
                ' . $theme_footer[1] . '
            </td>
        </tr>
    </tbody>
</table>';
