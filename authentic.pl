#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our ($get_user_level,
     $xnav,
     %theme_config,
     %theme_text,
     %config,
     %gconfig,
     %tconfig,
     %text,
     %in,
     $scriptname,
     $basic_virtualmin_domain,
     $basic_virtualmin_menu,
     $cb,
     $tb,
     $title,
     $cloudmin_no_create_links,
     $cloudmin_no_edit_buttons,
     $cloudmin_no_global_links,
     $current_theme,
     $done_theme_post_save_server,
     $mailbox_no_addressbook_button,
     $mailbox_no_folder_button,
     $module_index_link,
     $module_index_name,
     $nocreate_virtualmin_menu,
     $nosingledomain_virtualmin_mode,
     $page_capture,
     $remote_user,
     $root_directory,
     $session_id,
     $ui_formcount,
     $theme_ui_post_header_text,
     $user_module_config_directory,
     $theme_webprefix);

do($ENV{'THEME_ROOT'} . "/authentic-init.pl");

sub theme_header
{

    return if (fetch_content());
    if (get_env('script_name') =~ /password_change\.cgi$/) {
        embed_login_head();
        print "<body>";
        return;
    }
    my $tref   = ref($_[0]) eq 'ARRAY';
    my $ttitle = $tref ? $_[0]->[0] : $_[0];
    embed_header(
                 (($ttitle ne $title ? ($title ? "$ttitle - $title" : $ttitle) : $ttitle),
                  $_[7], theme_debug_mode(),
                  (@_ > 1 ? '1' : '0'),
                  ($tref  ? 1   : 0)));
    my $body_initial = !http_x_request() ? ' data-load-initial="1"' : undef;
    print '<body data-initial-load="1" ' . header_body_data(undef) . '' . $body_initial . ' ' . $tconfig{'inbody'} . '>' . "\n";
    embed_overlay_prebody() if (!http_x_request());

    # Embed branding
    embed_product_branding()
      if (!http_x_request() &&
          (!get_env('http_referer') || get_env('http_referer') =~ /(session|pam)_login\.cgi/) &&
          !getvar('theme-goto', 'main', 'unset'));

    if (@_ > 1 && $_[1] ne 'stripped') {

        # Print default container
        print '<div class="container-fluid col-lg-10 col-lg-offset-1" data-dcontainer="1">' . "\n";
        my %this_module_info = &get_module_info(&get_module_name());
        print '<div data-module-sortable="' . ($this_module_info{'sortable'} ? 1 : 0) . 
              '" class="panel panel-default">' . "\n";
        print '<div class="panel-heading">' . "\n";
        print $tconfig{'preheader'};
        print '<div class="header">
                <div class="row">';
        print '<div data-header-left id="headln2l" class="invisible col-sm-4">';

        if (!$_[5] && !$tconfig{'noindex'}) {
            my @avail = &get_available_module_infos(1);
            my $nolo  = get_env('anonymous_user') ||
              get_env('ssl_user')   ||
              get_env('local_user') ||
              get_env('http_user_agent') =~ /webmin/i;
            if ($gconfig{'gotoone'} &&
                $main::session_id &&
                @avail == 1 &&
                !$nolo)
            {
                print
                  "<a href='$theme_webprefix/session_login.cgi?logout=1'>",
                  "$text{'main_logout'}</a><br>";
            } elsif ($gconfig{'gotoone'} && @avail == 1 && !$nolo) {
                print "<a href=$theme_webprefix/switch_user.cgi>", "$text{'main_switch'}</a><br>";
            }

        }
        if (!$_[4] && !$tconfig{'nomoduleindex'}) {
            my $idx = $this_module_info{'index_link'};
            my $mi  = $module_index_link || "/" . &get_module_name() . "/$idx";
            my $mt  = $module_index_name || $text{'header_module'};
            print "<a href=\"$theme_webprefix$mi\">$mt</a><br>\n";
        }
        if (ref($_[2]) eq "ARRAY" &&
            !get_env('anonymous_user') &&
            !$tconfig{'nohelp'})
        {
            print &hlink($text{'header_help'}, $_[2]->[0], $_[2]->[1]), "<br>\n";
        } elsif (defined($_[2]) &&
                 !get_env('anonymous_user') &&
                 !$tconfig{'nohelp'})
        {
            print &hlink($text{'header_help'}, $_[2]), "<br>\n";
        }
        if ($_[3]) {
            my %access = &get_module_acl();
            if (!$access{'noconfig'} && !$config{'noprefs'}) {
                my $cprog =
                  $user_module_config_directory ? "uconfig.cgi" :
                  "config.cgi";
                my $params = "";
                foreach my $k (keys %in) {
                    foreach my $v (split(/\0/, $in{$k})) {
                        $params .= "&_cparam_".
                        &urlize($k)."=".&urlize($v);
                    }
                }
                $params .= "&_cscript=".&urlize($scriptname);
                $params .= $_[3] eq '1' ? "" : $_[3];
                print "<a href=\"$theme_webprefix/$cprog?module=", &get_module_name().$params . "\">", $text{'header_config'}, "</a><br>\n";
            }
        }
        print "</div>\n";
        if ($_[1]) {
            print "<div data-current-module-name=\"$this_module_info{'desc'}\" id=\"headln2c\" class=\"col-sm-4\">",
              "<img alt=\"$ttitle\" src=\"$_[1]\"></td>\n";
        } else {
            my $ts =
              defined($tconfig{'titlesize'}) ? $tconfig{'titlesize'} :
              "+2";
            print "<div data-current-module-name=\"$this_module_info{'desc'}\" id='headln2c' class=\"col-sm-4\">",
              ($ts ? "<span data-main_title>" : ""), $ttitle, ($ts ? "</span>" : "");
            print "<br><span data-main_title_sub>$_[9]</span>\n" if ($_[9]);
            if ($theme_ui_post_header_text) {
                print "<span data-sub_title><br>$theme_ui_post_header_text</span>";
            } else {
                print "<p class=\"margined-bottom-5\"></p>";
            }
            print "</div>\n";
        }
        print "<div data-header-right id=\"headln2r\" class=\"col-sm-4\">";
        print $_[6];
        print "</div></div></div>\n";
        print $tconfig{'postheader'};
        print '</div>' . "\n";
        print '<div class="panel-body">' . "\n";
    }
    $miniserv::page_capture          = 1;
    $miniserv::theme_header_captured = 1;
}

sub theme_footer
{
    my $script_name = $ENV{'SCRIPT_NAME'};
    if (index($script_name, 'session_login.cgi') != -1 ||
        index($script_name, 'pam_login.cgi') != -1 ||
        index($script_name, 'password_change.cgi') != -1)
    {
        print "</div>\n";
        embed_js_scripts();
        print "</body>\n";
        print "</html>\n";
    }

    return if (fetch_content());
    ((!$miniserv::theme_header_captured && !$miniserv::page_capture) && return);
    my %this_module_info = &get_module_info(&get_module_name());
    for (my $i = 0; $i + 1 < @_; $i += 2) {
        my $url = $_[$i];
        if ($url ne '/' || !$tconfig{'noindex'}) {
            if ($url eq '/') {
                $url = "/?cat=$this_module_info{'category'}";
            } elsif ($url eq '' && &get_module_name()) {
                $url = "/" . &get_module_name() . "/" . $this_module_info{'index_link'};
            } elsif ($url =~ /^\?/ && &get_module_name()) {
                $url = "/" . &get_module_name() . "/$url";
            }
            $url = "$theme_webprefix$url" if ($url =~ /^\//);
            $url = $url . "/"             if ($url =~ /[^\/]$/ && $url !~ /.cgi/ && $url !~ /javascript:history/ && $url !~ /[&?]/);
            print
"&nbsp;<a style='margin-bottom: 15px;' class='btn btn-primary btn-lg page_footer_submit' href=\"$url\"><i class='fa fa-fw fa-arrow-left'>&nbsp;</i> <span>",
              &text('main_return', $_[$i + 1]), "</span></a>\n";
        }
    }

    print "</div>\n";
    embed_port_shell() if (!http_x_request());
    embed_footer((theme_debug_mode()),
                 (
                  (get_module_name() ||
                     get_env('request_uri') =~ /\/config.cgi\?/                       ||
                     get_env('request_uri') =~ /\/uconfig.cgi\?/                      ||
                     get_env('request_uri') =~ /\/webmin_search.cgi\?/                ||
                     get_env('request_uri') =~ /\/tconfig.cgi/                        ||
                     get_env('request_uri') =~ /\/settings-editor_read.cgi/           ||
                     get_env('request_uri') =~ /\/settings-editor_favorites_read.cgi/ ||
                     get_env('request_uri') =~ /\/settings-logos.cgi/                 ||
                     get_env('request_uri') =~ /\/settings-backgrounds.cgi/
                  ) ? '1' : '0'
                 ),
                 $_[0]
    ) if (!http_x_request());
    embed_pm_scripts();

    if ($theme_config{'settings_hide_top_loader'} ne 'true' &&
        get_env('script_name') ne '/session_login.cgi' &&
        get_env('script_name') ne '/pam_login.cgi'     &&
        !http_x_request())
    {
        if (!getvar('error-fatal')) {
            print '<div class="top-aprogress"></div>', "\n";
        }
    }

    # Post-body header overlay
    embed_overlay_postbody() if (!http_x_request());

    print '</body>', "\n";
    print '</html>', "\n";
}

sub theme_ui_print_header
{
    my ($text, @args) = @_;
    if (length($text)) {
        $theme_ui_post_header_text = $text;
    }
    &header(@args);
}

sub theme_popup_prehead
{
    print '<style>#popup .ui_form_end_submit {display: none}</style>';
}

sub theme_file_chooser_button
{
    my $chroot = defined($_[3]) ? $_[3] : "/";
    my $add    = int($_[4]);
    my $link   = "chooser.cgi?add=$add&type=$_[1]&chroot=$chroot&file=\"+encodeURIComponent(ifield.value)";
    my $icon   = 'fa-fw fa-files-o -cs';

    return get_chooser_button_template($link, $icon);
}

sub theme_user_chooser_button
{
    my $link = "user_chooser.cgi?multi=$_[1]&user=\"+encodeURIComponent(ifield.value)";
    my $icon = 'fa-user-o';

    return get_chooser_button_template($link, $icon);
}

sub theme_group_chooser_button
{
    my $link = "group_chooser.cgi?multi=$_[1]&group=\"+encodeURIComponent(ifield.value)";
    my $icon = 'fa-group-o';
    return get_chooser_button_template($link, $icon);
}

sub theme_interfaces_chooser_button
{
    my $link = "net/interface_chooser.cgi?multi=$_[1]&interface=\"+encodeURIComponent(ifield.value)";
    my $icon = 'fa2 fa2-plus-network';
    return get_chooser_button_template($link, $icon);
}

sub theme_date_chooser_button
{
    return
"<button data-day=\"$_[0]\" data-month=\"$_[1]\" data-year=\"$_[2]\" type=button class=\"btn btn-default heighter-28 chooser_button date_chooser_button\"><i class=\"fa fa-fw fa-calendar\"></i></button>\n";
}

sub theme_popup_window_button
{
    my ($url, $w, $h, $scroll, $fields) = @_;
    my $scrollyn = $scroll ? "yes" : "no";
    my $icon     = "fa-files-o -cs";
    if ($url =~ /third_chooser|standard_chooser/) {
        $icon = "fa-world";
    }

    my $rv = "<button class='btn btn-default chooser_button' type=button onClick='";
    foreach my $m (@$fields) {
        $rv .= "$m->[0] = form.$m->[1]; ";
    }
    my $sep = $url =~ /\?/ ? "&" : "?";
    $rv .= "chooser = window.open(\"$url\"";
    foreach my $m (@$fields) {
        if ($m->[2]) {
            $rv .= "+\"$sep$m->[2]=\"+encodeURIComponent($m->[0].value)";
            $sep = "&";
        }
    }
    $rv .= ", \"chooser\", \"toolbar=no,menubar=no,scrollbars=$scrollyn,resizable=yes,width=$w,height=$h\"); ";
    foreach my $m (@$fields) {
        $rv .= "chooser.$m->[0] = $m->[0]; ";
        $rv .= "window.$m->[0] = $m->[0]; ";
    }
    $rv .= "'><i class=\"fa $icon vertical-align-middle\" ></i></button>";
    return $rv;
}

sub theme_ui_upload
{
    my ($name, $size, $dis, $tags, $multiple) = @_;
    $size = &ui_max_text_width($size);
    return "<input class='ui_upload' type=file name=\"" .
      &quote_escape($name) . "\" " . "size=$size " . ($dis ? "disabled=true" : "") . ($multiple ? " multiple" : "") .
      ($tags ? " " . $tags : "") . ">";
}

sub theme_icons_table {
    my ($links, $titles, $icons, $cols, $href, $width, $height, $befores, $afters) = @_;
    my $lt           = $theme_config{'settings_right_table_links_type'};
    my $sm           = $lt eq '1' ? ' small-icons' : undef;
    my $nl           = $lt eq '0' ? 1              : undef;
    my $icons_sorted = $theme_config{'settings_right_table_links_sorted'} eq 'true' ? 1 : 0;

    # Sort links, titles, and icons
    if ($icons_sorted) {
        my @sorted_indices = sort { $titles->[$a] cmp $titles->[$b] } 0 .. $#$titles;
        @$links   = @$links[@sorted_indices];
        @$titles  = @$titles[@sorted_indices];
        @$icons   = @$icons[@sorted_indices];
        @$befores = @$befores[@sorted_indices];
        @$afters  = @$afters[@sorted_indices];
    }

    if ($nl) {
        # Print plain text links
        print "<div class=\"links-row-padded\">";
        print
"<div class=\"row-flex row-flex-cols-sm-1 row-flex-cols-md-2 row-flex-cols-lg-3 row-flex-cols-xl-3 row-flex-cols-xxl-4 links-row\">";

        for my $i (0 .. $#$links) {
            my $after  = $afters->[$i] // '';
            my $before = $befores->[$i] // '';

            # Process "after" HTML
            $after =~ s/ui_link/margined-left-4 btn btn-default btn-transparent-link btn-xxs btn-xxs-compact btn-hover-hide f__lnk_t_btn-el/g;
            $after =~ s/>\((.*?)\)</>$1</g;

            # Print individual link
            print "<div class=\"col-flex-sm-6"
              . ($before ? " link-row-col" : " link-row-col-narrow")
              . "\">";
            print "$before <a class='row-link' href='$links->[$i]' "
              . (ref($href) ? $href->[$i] : $href)
              . ">"
              . ($before ? "" : "<i class='fa fa-fw fa-angle-right'>&nbsp;&nbsp;</i>")
              . "<span>@{[html_strip($titles->[$i], ' ')]}</span></a> $after";
            print "</div>";
        }

        print "</div>";
        print "</div>";
    } else {
        # Print icons
        my $ff;
        my $total = scalar(@$links);
        print "<div class=\"row icons-row$sm\">\n";

        for my $i (0 .. $#$links) {
            &generate_icon($icons->[$i], $titles->[$i], $links->[$i],
                ref($href) ? $href->[$i] : $href,
                $width, $height, $befores->[$i], $afters->[$i]);

            $ff .= '<div class="icons-container-filler"></div>' if (!$sm);
        }

        # Adjust fillers for row balancing
        if ($total < 2) {
            $ff .= "$ff" x 16;
        } elsif ($total < 4) {
            $ff .= "$ff" x 8;
        } elsif ($total < 8) {
            $ff .= "$ff" x 4;
        } elsif ($total < 16) {
            $ff .= "$ff" x 2;
        }
        print "$ff</div>\n";
    }
}

sub theme_generate_icon
{
    my ($icon, $title, $link, $href, $width, $height, $before, $after) = @_;
    my $icon_outer = $icon;
    my $wp         = $theme_webprefix;

    my $lt = $theme_config{'settings_right_table_links_type'};

    $icon =~ s/^$wp//g if ($wp);
    $icon =~ s/\/images//g;
    $icon =~ s/images//g;

    my $grayscaled_table_icons = ($theme_config{'settings_right_table_grayscaled_icons'} ne 'false' ? 0 : 1);
    my $animate_table_icons = ($theme_config{'settings_right_table_animate_icons'} ne 'false' ? 0 :
                                 1);
    (my $___svg = $icon) =~ s/.gif/.svg/;

    (!-r $root_directory . "/" . get_module_name() . "/" . $icon_outer) &&
      ($icon_outer = undef);

    my $mod            = get_module_name();
    my $images_modules = 'images/modules';
    my $root_images    = $root_directory . "/$current_theme/$images_modules/";
    my $__icon = (-r $root_images . $icon            ? $wp . "/$images_modules" . $icon :
                    -r $root_images . $mod . $icon   ? $wp . "/$images_modules/" . $mod . $icon :
                    -r $root_images . $mod . $___svg ? $wp . "/$images_modules/" . $mod . $___svg :
                    $icon_outer                      ? $icon_outer :
                    ($wp . "/images/not_found.svg"));

    if ($lt eq '1') {
        print '<div class="col-xs-1 small-icons-container' .
          (!$_[6] && !$_[7] ? ' forged-xx-skip' : ' gl-icon-container') .
          '' . (!$grayscaled_table_icons && ' grayscaled') . '' . (!$animate_table_icons && ' animated') .
          '" data-title="' . $title . '" data-toggle="tooltip" data-container="body">';
        if ($_[6] || $_[7]) {
            if ($_[6]) {
                print "<span class='hidden-forged hidden-forged-6'>$_[6]</span>\n";
            }
            if ($_[7]) {
                print
"<span style='position: absolute; top:-2px; right: 2px;' class='hidden-forged hidden-forged-7 hidden-forged-7-small'>$_[7]</span>\n";
            }
        }
        print "<a href=\"$link\" class=\"icon_link\">" . '<img class="ui_icon' .
          ($icon_outer && ' ui_icon_protected') . '" src="' . $__icon . '" alt="">';
        print "<span class=\"hidden\">$title</span></a>\n";
        print '</div>';
    } else {
        print '<div class="col-xs-1 icons-container' . (!$_[6] && !$_[7] ? ' forged-xx-skip' : ' gl-icon-container') .
          '' . (!$grayscaled_table_icons && ' grayscaled') . '' . (!$animate_table_icons && ' animated') . '" data-title="' .
          (($lt eq '1') ? $title : '') . '" data-toggle="tooltip" data-container="body">';
        if ($_[6] || $_[7]) {
            if ($_[6]) {
                print "<span class='hidden-forged hidden-forged-6' forged-xx-data forged-xx-sub>$_[6]</span>\n";
            }
            if ($_[7]) {
                print
"<span style='position: absolute; top:3px; right: 4px;' class='hidden-forged hidden-forged-7'>$_[7]</span>\n";
            }
        }
        print "<a href=\"$link\" class=\"icon_link\" data-title=\""
          .
          ( ($_[6] || $_[7]) ? $title :
              (string_contains($title, '<tt') ? "<span class='word-break-all'>$title</span>" : undef)
          ) .
          "\" data-toggle=\"tooltip\" data-placement=\"auto bottom\" data-container=\"body\" " .
          (string_contains($title, '<tt') ? " data-fbplacement" : undef) . ">" . '<img class="ui_icon' .
          ($icon_outer && ' ui_icon_protected') . '" src="' . $__icon . '" alt=""><br>';
        print "$title</a>\n";
        print "</div>\n";
    }

}

sub theme_ui_columns_start
{
    my ($heads, $width, $noborder, $tdtags, $title, $sortable) = @_;
    my ($rv, $i);

    $sortable = ' dtable-sortable' if ($sortable);
    my $width_;
    $width_ = ' w-auto-force" ' if ($width eq 'auto');
    $rv .= "<table class=\"table table-striped table-hover table-condensed$sortable$width_\">" . "\n";
    if ($title) {
        $rv .= "<caption>$title</caption>\n";
    }
    if (ref($heads) && scalar(@{$heads})) {
        $rv .= '<thead>' . "\n";
        $rv .= '<tr>' . "\n";
        for ($i = 0; $i < @$heads; $i++) {
            $rv .= "<th " . (ref($tdtags) ? $tdtags->[$i] : undef) . ">";
            $rv .= ($heads->[$i] eq '' ? '<br>' : $heads->[$i]);
            $rv .= '</th>' . "\n";
        }
        $rv .= '</tr>' . "\n";
        $rv .= '</thead>' . "\n";
    }
    $rv .= '<tbody>' . "\n";

    return $rv;
}

sub theme_ui_columns_row
{
    my ($cols, $tdtags) = @_;
    my ($rv, $i);

    $rv .= '<tr class="tr_tag">' . "\n";
    if (ref($cols)) {
        for ($i = 0; $i < @$cols; $i++) {
            $rv .= "<td data-td-e " . (ref($tdtags) ? $tdtags->[$i] : undef) . ">\n";
            $rv .= ($cols->[$i] !~ /\S/ ? '<br>' : $cols->[$i]);
            $rv .= '</td>' . "\n";
        }
    }
    $rv .= '</tr>' . "\n";

    return $rv;
}

sub theme_ui_columns_header
{
    my ($cols, $tdtags) = @_;
    my ($rv, $i);

    $rv .= '<thead>' . "\n";
    $rv .= '<tr>' . "\n";
    if (ref($cols)) {
        for ($i = 0; $i < @$cols; $i++) {
            $rv .= "<th " . (ref($tdtags) ? $tdtags->[$i] : undef) . ">";
            $rv .= ($cols->[$i] eq '' ? '#' : $cols->[$i]);
            $rv .= '</th>' . "\n";
        }
    }
    $rv .= '</tr>' . "\n";
    $rv .= '</thead>' . "\n";

    return $rv;
}

sub theme_ui_columns_end
{
    my $rv;

    $rv .= '</tbody></table>' . "\n";

    return $rv;
}

sub theme_ui_help
{
    my ($title) = @_;
    return (
"<sup class=\"ui_help\" data-container=\"body\" data-placement=\"auto right\" data-title=\"$title\" data-toggle=\"tooltip\"><i class=\"fa fa-0_80x fa-question-circle cursor-help\"></i></sup>"
    );
}

sub theme_hlink
{
    my ($txt, $page, $mod, $width, $height, $tmpl) = @_;
    $mod ||= &get_module_name();
    $width  = $width || $tconfig{'help_width'}  || $gconfig{'help_width'}  || 600;
    $height = $height || $tconfig{'help_height'} || $gconfig{'help_height'} || 400;
    my $params = $tmpl ? "?".join("&", map { "tmpl_".&urlize($_)."=".&urlize($tmpl->{$_}) } keys %{$tmpl}) : "";
    return
"<a onClick='window.open(\"$theme_webprefix/help.cgi/$mod/$page$params\", \"help\", \"toolbar=no,menubar=no,scrollbars=yes,width=$width,height=$height,resizable=yes\"); return false' href=\"$theme_webprefix/help.cgi/$mod/$page$params\">$txt</a>";
}

sub theme_ui_link
{

    my ($href, $text, $class, $tags) = @_;
    return (
          "<a class='ui_link" . ($class ? " " . $class : "") . "' href='$href'" . ($tags ? " " . $tags : "") . ">$text</a>");
}
sub theme_ui_links_row
{

    my ($links, $nopuncs) = @_;
    my $link          = "<a";
    my $targetblocked = "pagination_search";
    if (ref($links)) {
        if (string_contains("@$links", $link)) {
            @$links =
              map {
                string_contains($_, $link)            ? $_ :
                  string_contains($_, $targetblocked) ? "<span class='ui_form_element_wrapper ui_link_empty'>$_</span>" :
                  "<span class=\"btn btn-success ui_link ui_link_empty\">$_</span>"
              } @$links;
            return @$links ? "<div class=\"btn-group ui_links_row\" role=\"group\">" . join("", @$links) . "</div><br>\n" :
              "";
        } else {
            if ($nopuncs == 1) {
                return @$links ? join(", ", @$links) . "<br>\n" : "";
            } elsif ($nopuncs == 2) {
                return @$links ? join(" ", @$links) . "<br>\n" : "";
            } else {
                my $dot = ".";
                if (scalar(@$links) == 1) {
                    $dot = "";
                }
                return @$links ? join(", ", @$links) . "$dot<br>\n" : "";
            }
        }
    }
}

sub theme_select_all_link
{

    my ($field, $form, $text) = @_;
    $form = int($form);
    $text ||= $text{'ui_selall'};
    return
"<a class='select_all' href='#' onclick='theme_select_all_link($form, \"$field\"); return false'><span>$text</span></a>";
}

sub theme_select_invert_link
{

    my ($field, $form, $text) = @_;
    $form = int($form);
    $text ||= $text{'ui_selinv'};
    return
"<a class='select_invert' href='#' onclick='theme_select_invert_link($form, \"$field\"); return false'><span>$text</span></a>";
}

sub theme_select_rows_link
{
    my ($field, $form, $text, $rows) = @_;
    $form = int($form);
    my $js = "var sel = { " . join(",", map {"\"" . &quote_escape($_) . "\":1"} @$rows) . " }; ";
    $js .=
"for(var i=0; i<document.forms[$form].${field}.length; i++) { var r = document.forms[$form].${field}[i]; r.checked = sel[r.value]; \$(r).trigger(\"change\"); } ";
    $js .= "return false;";
    return "<a href='#' onClick='$js'><span>$text</span></a>";
}

sub theme_ui_form_start
{
    my ($script, $method, $target, $tags, $class) = @_;
    my $rv;

    $class = 'ui_form' if (!$class);

    $rv .= "<form class=\"$class\" ";
    $rv .= 'action="' . &html_escape($script) . '" ';
    $rv .= ($method eq 'post' ? 'method="post" ' :
              ($method eq 'form-data' ? 'method="post" enctype="multipart/form-data" ' : 'method="get" '));
    $rv .= ($target ? 'target="' . $target . '" ' : '');
    $rv .= ($tags   ? $tags                       : '');
    $rv .= '>' . "\n";

    return $rv;
}

sub theme_ui_form_end
{
    $ui_formcount++;
    my ($buttons, $width, $nojs) = @_;
    my $rv;
    if ($buttons && @$buttons) {
        $rv .= "<table class='ui_form_end_buttons' " . ($width ? " width=$width" : "") . "><tr><td>\n";
        my $b;
        $rv .= '<div class="btn-group end_submits">';
        foreach $b (@$buttons) {
            if (ref($b)) {
                $rv .= &ui_submit($b->[1], $b->[0], $b->[3], $b->[4], $b->[5], $b->[6]) . ($b->[2] ? " " . $b->[2] : "");
            } elsif ($b) {
                $rv .= "<span data-ui-form-end='inline'>$b</span>\n";
            } else {
                $rv .= "<span data-ui-form-end='empty'>&nbsp;</span>\n";
            }
        }
        $rv .= '</div>';
        $rv .= "</td></tr></table>\n";
    }
    $rv .= "</form>\n";
    if (!$nojs) {

        # When going back to a form, re-enable any text fields generated by
        # ui_opt_textbox that aren't in the default state.
        $rv .= "<script>\n";
        $rv .= "var opts = document.getElementsByClassName('ui_opt_textbox');\n";
        $rv .= "for(var i=0; i<opts.length; i++) {\n";
        $rv .= "  opts[i].disabled = document.getElementsByName(opts[i].name+'_def')[0].checked;\n";
        $rv .= "}\n";
        $rv .= "</script>\n";
    }
    return $rv;
}

sub theme_ui_textbox
{
    my ($name, $value, $size, $dis, $max, $tags, $class, $nostyle) = @_;
    my $rv;

    my $ids;
    $ids = "_i_$main::ui_textbox_tcalled" if ($main::ui_textbox_tcalled++);
    $class = $class ? " $class" : "";
    my $style = ' style="display: inline; width: auto; max-width: 100%; height: 28px; padding-top: 0; padding-bottom: 2px; vertical-align: middle"';
    $style = '' if ($nostyle);
    $rv .=
"<input$style class=\"form-control ui_textbox$class\" type=\"text\" ";
    $rv .= 'id="' . &quote_escape($name . $ids) . '" ';
    $rv .= 'name="' . &quote_escape($name) . '" ';
    $rv .= 'value="' . &quote_escape($value) . '" ';
    $rv .= 'size="' . $size . '" ';
    $rv .= ($dis  ? 'disabled="true" '          : '');
    $rv .= ($max  ? 'maxlength="' . $max . '" ' : '');
    $rv .= ($tags ? $tags                       : '');
    $rv .= '>' . "\n";

    return $rv;
}

sub theme_ui_password
{
    my ($name, $value, $size, $dis, $max, $tags) = @_;
    my $rv;

    $rv .=
'<input spellcheck="false" style="display: inline; width: auto; height: 28px; padding-top: 0; padding-bottom: 2px; vertical-align:middle" class="form-control ui_password" type="password" ';
    $rv .= 'name="' . &quote_escape($name) . '" ';
    $rv .= 'value="' . &quote_escape($value) . '" ';
    $rv .= 'size="' . $size . '" ';
    $rv .= ($dis  ? 'disabled="true" '          : '');
    $rv .= ($max  ? 'maxlength="' . $max . '" ' : '');
    $rv .= ($tags ? $tags                       : '');
    $rv .= '>' . "\n";

    return $rv;
}

sub theme_ui_page_flipper
{
    my ($msg, $inputs, $cgi, $left, $right, $farleft, $farright, $below) = @_;
    my $rv    = "<center class='ui_page_flipper'>";
    my $class = 'fa fa-fw fa-lg text-semi-light vertical-align-baseline';
    $rv .= &ui_form_start($cgi) if ($cgi);

    # Far left link, if needed
    if (@_ > 5) {
        if ($farleft) {
            $rv .=
              "<a href='$farleft'>" . "<i " . get_button_tooltip('right_pagination_first', undef, 'auto top') .
              "class='$class fa-angle-double-left'></i></a>\n";
        } else {
            $rv .= "<i class='$class fa-angle-double-left disabled'></i>\n";
        }
    }

    # Left link
    if ($left) {
        $rv .=
          "<a href='$left'>" . "<i " . get_button_tooltip('extensions_mail_pagination_left', undef, 'auto top') .
          "class='$class fa-angle-left'></i></a>\n";
    } else {
        $rv .= "<i class='$class fa-angle-left disabled'></i>\n";
    }

    # Message and inputs
    $rv .= $msg;
    $rv .= " " . $inputs if ($inputs);

    # Right link
    if ($right) {
        $rv .=
          "<a href='$right'>" . "<i " . get_button_tooltip('extensions_mail_pagination_right', undef, 'auto top') .
          "class='$class fa-angle-right'></i></a>\n";
    } else {
        $rv .= "<i class='$class fa-angle-right disabled'></i>\n";
    }

    # Far right link, if needed
    if (@_ > 5) {
        if ($farright) {
            $rv .=
              "<a href='$farright'>" . "<i " . get_button_tooltip('right_pagination_last', undef, 'auto top') .
              "class='$class fa-angle-double-right'></i></a>\n";
        } else {
            $rv .= "<i class='$class fa-angle-double-right disabled'></i>\n";
        }
    }

    $rv .= "<br>" . $below if ($below);
    $rv .= &ui_form_end()  if ($cgi);
    $rv .= "</center>\n";
    return $rv;
}

sub theme_ui_select
{

    my ($name, $value, $opts, $size, $multiple, $missing, $dis, $tags) = @_;
    my $rv;
    $rv .=
      "<select class='ui_select' " . "name=\"" . &quote_escape($name) .
      "\" " . ($size ? " size='$size'" : "") . ($multiple ? " multiple" : "") . ($dis ? " disabled=true" : "") .
      ($tags ? " " . $tags : "") . ">\n";
    my ($o, %opt, $s, $v);
    my %sel = ref($value) ? (map {$_, 1} @$value) : ($value, 1);
    my $t   = 'x-md-';
    foreach $o (@$opts) {
        $o = [$o] if (!ref($o));
        $v = ($o->[1] || $o->[0]);
        $rv .=
          "<option value=\"" .
          &quote_escape($o->[0]) . "\"" . ($sel{ $o->[0] } ? " selected" : "") . ($o->[2] ne '' ? " " . $o->[2] : "") . ">" .
          (string_contains($v, $t) ? html_escape($v) : $v) . "</option>\n";
        $opt{ $o->[0] }++;
    }
    foreach $s (keys %sel) {
        if (!$opt{$s} && $missing) {
            $rv .= "<option value=\"" . &quote_escape($s) . "\"" . " selected>" .
              ($s eq "" ? "&nbsp;" : (string_contains($s, $t) ? html_escape($s) : $s)) . "</option>\n";
        }
    }
    $rv .= "</select>\n";
    return $rv;
}

sub theme_ui_radio
{
    my ($name, $val, $opts, $dis) = @_;
    my ($rv, $o);
    my $rand = int rand(1e4);
    foreach $o (@$opts) {
        my $id    = &quote_escape($name . "_" . $o->[0]);
        my $label = $o->[1] || $o->[0];
        my $after;
        if ($label =~ /^([\000-\377]*?)((<a\s+href|<input|<select|<textarea|<span|<br|<p|<label)[\000-\377]*)$/i) {
            $label = $1;
            $after = $2;
        }
        $label = trim($label);
        my $bl = string_ends_with($label, '<br>') ? ' ds-bl-fs' : undef;
        $rv .= "<span class=\"awradio awobject$bl\"><input class=\"iawobject\" type=\"radio\" ";
        $rv .= 'name="' . &quote_escape($name) . '" ';
        $rv .= 'value="' . &quote_escape($o->[0]) . '" ';
        $rv .= ($o->[0] eq $val ? 'checked '         : '');
        $rv .= ($dis            ? 'disabled="true" ' : '');
        $rv .= 'id="' . $id . '_' . $rand . '" ';
        $rv .= $o->[2] . ' ';
        $rv .= '><label class="lawobject" ';
        $rv .= 'for="' . $id . '_' . $rand . '">';
        $rv .= '' . (length $label ? "&nbsp;&nbsp;$label&nbsp;" : '&nbsp;&nbsp;');
        $rv .= '</label></span>' . $after . "\n";
    }

    return $rv;
}

sub theme_ui_yesno_radio
{
    my ($name, $value, $yes, $no, $dis) = @_;
    $yes = 1 if (!defined($yes));
    $no  = 0 if (!defined($no));
    if ($value =~ /^[0-9,.E]+$/ || !$value) {
        $value = int($value);
    }
    return ui_radio($name, $value, [[$yes, $text{'yes'}], [$no, $text{'no'}]], $dis);
}

sub theme_ui_oneradio
{
    my ($name, $value, $label, $sel, $tags, $dis) = @_;
    my $id = &quote_escape("${name}_${value}");
    my $after;
    my $rand = int rand(1e4);
    if ($label =~ /^([^<]*)(<[\000-\377]*)$/) {
        $label = $1;
        $after = $2;
    }
    $label = trim($label);
    my $bl = string_ends_with($label, '<br>') ? ' ds-bl-fs' : undef;
    my $ret =
      "<span class=\"awradio awobject$bl\"><input class=\"iawobject\" type=\"radio\" name=\"" .
      &quote_escape($name) . "\" " . "value=\"" .
      &quote_escape($value) . "\" " . ($sel ? " checked" : "") . ($dis ? " disabled=true" : "") . " id=\"$id\_$rand\"" .
      ($tags ? " " . $tags : "") . ">";
    $ret .=
      '<label class="lawobject" for="' . $id . '_' . $rand . '">' .
      (length $label ? "&nbsp;&nbsp;$label&nbsp;" : '&nbsp;&nbsp;') . '</label></span>';
    $ret .= "$after\n";
    return $ret;
}

sub theme_ui_checkbox
{
    return theme_ui_checkbox_local(@_);
}

sub theme_ui_textarea
{
    my ($name, $value, $rows, $cols, $wrap, $dis, $tags) = @_;
    $cols = &ui_max_text_width($cols, 1);

    my $ids;
    $ids = "_t_$main::ui_textarea_tcalled" if ($main::ui_textarea_tcalled++);

    return "<textarea style='display: inline; width:100%;' class='form-control ui_textarea' " .
      "name=\"" . &quote_escape($name) . "\" " . "id=\"" . &quote_escape($name . $ids) .
      "\" " . "rows='$rows' cols='$cols'" . ($wrap ? " wrap=$wrap" : "") . ($dis ? " disabled=true" : "") .
      ($tags ? " $tags" : "") . ">" . &html_escape($value) . "</textarea>";
}

sub theme_ui_submit
{
    my ($label, $name, $dis, $tags, $icon_class, $btn_class_extra) = @_;
    my ($keys, $class, $icon) = get_button_style($label);
    if ($icon_class && !$icon) {
        $icon = "<i class=\"$icon_class\"></i>";
    }
    my $ids;
    $ids = "_s_$main::ui_submit_tcalled" if ($main::ui_submit_tcalled++);

    my $nbsp;
    if ($label) {
        $nbsp = "&nbsp;";
    }
    # Form attr has to be passed directly to input
    my $form_value = "";
    if ($tags && $tags =~ /form=/) {
        if ($tags =~ s/(form='([^']*)')//) {
            $form_value = " $1";
        }
    }
    return "<button class=\"btn btn-$class ui_submit ui_form_end_submit $btn_class_extra\" type=\"button\"" .
      ($name ne '' ? " name=\"" . &quote_escape($name) . "\""      : "") .
      ($name ne '' ? " id=\"" . &quote_escape($name . $ids) . "\"" : "") .
      ($dis        ? " disabled=true" : "") . ($tags ? " " . $tags : "") . ">" . $icon . "$nbsp<span data-entry=\"$keys\">" .
      &html_escape($label) . "$nbsp</span></button>\n" . "<input$form_value class=\"hidden\" type=\"submit\""
      .
      ( $name ne '' ? " name=\"" . &quote_escape($name) . "\" value=\"" . &quote_escape($label) . "\"" :
          ""
      ) .
      " >\n";
}

sub theme_ui_reset
{
    my ($label, $dis) = @_;
    my $rv;

    $rv .= '<button class="btn btn-default ui_reset" style="height: 28px; vertical-align:middle" type="reset" ';
    $rv .= ($dis ? 'disabled="disabled">' : '>');
    $rv .= &html_escape($label);
    $rv .= '</button>' . "\n";

    return $rv;
}

sub theme_ui_button
{
    my ($label, $name, $dis, $tags, $icon, $type, $btn_class_extra) = @_;
    my $rv;
    my $label_safe = &html_escape($label);
    my $nbsp;
    if ($label) {
        $nbsp = "&nbsp;";
    }
    if ($icon) {
        $label_safe = "<i class=\"$icon\"></i>$nbsp<span data-entry>$label_safe$nbsp</span>";
    }
    $type = "button" if (!$type);

    $rv .= "<button type=\"$type\" class=\"btn btn-default ui_button $btn_class_extra\" ";
    $rv .= ($name ne '' ? 'name="' . &quote_escape($name) . '" ' : '');
    $rv .= ($dis        ? 'disabled="disabled"'                  : '');
    $rv .= ($tags       ? ' ' . $tags                            : '') . '>';
    $rv .= $label_safe;
    $rv .= '</button>' . "\n";

    return $rv;
}

sub theme_ui_date_input
{
    my ($day, $month, $year, $dayname, $monthname, $yearname, $dis) = @_;
    my $rv;
    $rv .= "<span class='ui_data ui_date_input'>";
    $rv .= &ui_textbox($dayname, $day, 3, $dis);
    $rv .= &ui_select($monthname, $month, [map {[$_, $text{"smonth_$_"}]} (1 .. 12)], 1, 0, 0, $dis);
    $rv .= &ui_textbox($yearname, $year, 5, $dis);
    $rv .= "</span>";
    return $rv;
}

sub theme_ui_pre_footer
{
    my $rv;
    $rv .= '</div>' . "\n";
    $rv .= '</div>' . "\n";

    return $rv;
}

sub theme_ui_tabs_start
{
    my ($tabs, $name, $sel, $border) = @_;
    my $rv;

    $rv .= '<ul class="nav nav-tabs">' . "\n";
    foreach my $t (@$tabs) {
        if ($t->[0] eq $sel) {
            $rv .=
              '<li class="active"><a data-toggle="tab" onclick="return tab_action(\'' .
              $name . '\', \'' . $t->[0] . '\', this, event)" href="#att_' . $t->[0] . '">' . $t->[1] . '</a></li>' . "\n";
        } else {
            $rv .=
              '<li><a data-toggle="tab" onclick="return tab_action(\'' .
              $name . '\', \'' . $t->[0] . '\', this, event)" href="#att_' . $t->[0] . '">' . $t->[1] . '</a></li>' . "\n";
        }
    }
    $rv .= '</ul>' . "\n";
    $rv .= '<div class="tab-content">' . "\n";
    $main::ui_tabs_selected = $sel;
    $rv .= &ui_hidden($name, $sel) . "\n";

    return $rv;
}

sub theme_ui_tabs_end
{
    my ($border) = @_;
    my $rv;

    $rv .= '</div>' . "\n";

    return $rv;
}

sub theme_ui_tabs_start_tab
{
    my ($name, $tab) = @_;
    my $rv;
    my $defclass = $tab eq $main::ui_tabs_selected ? 'active' : '';

    $rv .= '<div id="att_' . $tab . '" class="tab-pane ' . $defclass . '">' . "\n";

    return $rv;
}

sub theme_ui_tabs_end_tab
{
    my $rv;

    $rv .= '</div>' . "\n";

    return $rv;
}

sub theme_ui_hr
{
    my $rv;

    $rv .= '<hr>' . "\n";

    return $rv;
}

sub theme_ui_alert_box
{
    my ($msg, $class, $style, $new_line, $desc_to_title, $desc_icon) = @_;
    my ($rv, $type, $tmsg, $fa);

    if ($class eq "success") {
        $type = 'alert-success', $tmsg = ($theme_text{'theme_global_success'} . '!'), $fa = 'fa-check-circle';
    } elsif ($class eq "info") {
        $type = 'alert-info', $tmsg = ($theme_text{'theme_global_info'} . '!'), $fa = 'fa-info-circle';
    } elsif ($class eq "warn") {
        $type = 'alert-warning', $tmsg = ($theme_text{'theme_global_warning'} . '!'),
          $fa = 'fa2 fa2-warning fa-1_15x margined-left--2';
    } elsif ($class eq "danger") {
        $type = 'alert-danger', $tmsg = ($theme_text{'theme_xhred_global_error'} . '!'), $fa = 'fa-bolt';
    } elsif ($class eq "danger-fatal") {
        $type = 'alert-danger-fatal', $tmsg = ($theme_text{'theme_xhred_global_error_fatal'} . '!'),
          $fa = 'fa-exclamation-triangle';
    }

    my $tmsg_space = " ";
    if (defined($desc_to_title)) {
        $tmsg       = $desc_to_title || '';
        $tmsg_space = '' if (!$tmsg);
    }

    if ($desc_icon) {
        $fa = $desc_icon;
    }

    $rv .= '<div class="alert ' . $type . '" style=" ' . $style . '">' . "\n";
    $rv .= '<i class="fa fa-fw ' . $fa . '"></i>' . $tmsg_space . '<strong>' . $tmsg . '</strong>';
    $rv .= ($new_line ? '<br>' : ($tmsg_space ? '&nbsp;' : '')) . "\n";
    $msg =~ s/button class="btn/button class="btn btn-tiny/gm;
    $msg =~ s/input class="ui_submit/input class="ui_submit btn btn-default btn-xs/gm;
    $rv .= $msg . "\n";
    $rv .= '</div>' . "\n";

    return $rv;
}

sub theme_ui_table_start
{
    my ($heading, $tabletags, $cols, $tds, $rightheading) = @_;
    if (defined($main::ui_table_cols)) {

        push(@main::ui_table_cols_stack,        $main::ui_table_cols);
        push(@main::ui_table_pos_stack,         $main::ui_table_pos);
        push(@main::ui_table_default_tds_stack, $main::ui_table_default_tds);
    }
    my $colspan = 1;
    my $rv;
    $rv .= "<div class='table-responsive'>" .
      "<table data-table-type='ui-table' class='table table-striped table-condensed table-subtable' $tabletags>\n";
    if (defined($heading) || defined($rightheading)) {
        $rv .= "<thead><tr>";
        if (defined($heading)) {
            $rv .= "<th class='table-title'><b>$heading</b></th>";
        }
        if (defined($rightheading)) {
            $rv .= "<th>$rightheading</th>";
            $colspan++;
        }
        $rv .= "</tr></thead>\n";
    }
    $rv .= "<tbody> <tr><td>" .
      "<table class='sub_table_container' width=100%>\n";
    $main::ui_table_cols        = $cols || 4;
    $main::ui_table_pos         = 0;
    $main::ui_table_default_tds = $tds;
    $rv .= "<tbody data-tbody-type='ui-table' data-table-cols='$main::ui_table_cols'>\n";
    return $rv;
}

sub theme_ui_table_end
{
    my $rv;
    if ($main::ui_table_cols == 4 && $main::ui_table_pos) {

        $rv .= &ui_table_row(" ", " ");
    }
    if (@main::ui_table_cols_stack) {
        $main::ui_table_cols        = pop(@main::ui_table_cols_stack);
        $main::ui_table_pos         = pop(@main::ui_table_pos_stack);
        $main::ui_table_default_tds = pop(@main::ui_table_default_tds_stack);
    } else {
        $main::ui_table_cols        = undef;
        $main::ui_table_pos         = undef;
        $main::ui_table_default_tds = undef;
    }
    $rv .= "</tbody></table></td></tr></tbody></table></div>\n";
    return $rv;
}

sub theme_ui_table_row
{
    my ($label, $value, $cols, $tds, $trs) = @_;
    $cols ||= 1;
    $tds  ||= $main::ui_table_default_tds;
    my $rv;
    if ($main::ui_table_pos + $cols + 1 > $main::ui_table_cols &&
        $main::ui_table_pos != 0)
    {
        $rv .= "</tr>\n";
        $main::ui_table_pos = 0;
    }
    # Only allow data-* attributes as other,
    # like width, can have negative effects
    my ($tds1, $tds2);
    $tds1 = $tds->[0] if (ref($tds) && $tds->[0] =~ /^data-/);
    $tds2 = $tds->[1] if (ref($tds) && $tds->[1] =~ /^data-/);
    my $trtags_attrs = ref($trs) eq 'ARRAY' && $trs->[0] ? " $trs->[0]" : "";
    $trtags_attrs .= " data-row-type='ui-table' data-cell-colspan='$cols'";
    $trtags_attrs .= ' data-column-span="all" data-column-locked="1"'
      if ($cols == 2 && !length($label));
    my $trtags_class = ref($trs) eq 'ARRAY' && $trs->[1] ? " class='$trs->[1]'" : "";
    $rv .= "<tr$trtags_class$trtags_attrs>\n"
      if ($main::ui_table_pos % $main::ui_table_cols == 0);
    $rv .= "<td $tds1 class='col_label'><b>$label</b></td>\n"
      if (defined($label));
    $rv .= '<td ' . $tds2 . ' colspan="' . $cols . '" class="col_value' . (!length($label) && ' col_header') . '">' . $value . '</td>';
    $main::ui_table_pos += $cols + (defined($label) ? 1 : 0);
    if ($main::ui_table_pos % $main::ui_table_cols == 0) {
        $rv .= "</tr>\n";
        $main::ui_table_pos = 0;
    }
    return $rv;
}

sub theme_ui_table_hr
{
    my $rv;
    if ($main::ui_table_pos) {
        $rv .= "</tr>\n";
        $main::ui_table_pos = 0;
    }
    $rv .= "<tr> " . "<td colspan=$main::ui_table_cols class='no-border'><hr data-row-separator></td></tr>\n";
    return $rv;
}

sub theme_ui_opt_textbox
{
    my ($name, $value, $size, $opt1, $opt2, $dis, $extra, $max, $tags, $type) = @_;
    my $dis1 = &js_disable_inputs([$name, (defined($extra) ? @$extra : ())], []);
    my $dis2 = &js_disable_inputs([], [$name, (defined($extra) ? @$extra : ())]);
    my $rv;
    $type ||= 'text';
    $size = &ui_max_text_width($size);
    $rv .= &ui_radio($name . "_def",
                     $value eq '' ? 1 : 0,
                     [[1, $opt1, "onClick='$dis1'"], [0, $opt2 || " ", "onClick='$dis2'"]], $dis) .
      "\n";
    my $min_width = $size ? '' : ' min-width: 15%;';
    $rv .=
"<span><input class='ui_opt_textbox form-control' style='display: inline; width: auto; height: 28px; padding-top: 0; padding-bottom: 2px;$min_width' type='$type' name=\""
      . &quote_escape($name)
      . "\" " . "size=$size value=\"" .
      &quote_escape($value) . "\"" . ($dis ? " disabled=true" : "") . ($max ? " maxlength=$max" : "") .
      ($tags ? " " . $tags : "") . "></span>";

    # Optional (extra) elements must also be disabled (or enabled) on load
    if (defined($extra)) {
        $rv .= "<script>\$('#content form input[name=\"${name}_def\"]:checked').click();</script>";
    }
    return $rv;
}

sub theme_ui_checked_columns_row
{
    my ($cols, $tdtags, $checkname, $checkvalue, $checked, $disabled, $tags) = @_;
    my $rv;
    $rv .= "<tr" . ($cb ? " " . $cb : "") . " class='ui_checked_columns'>\n";
    $rv .=
      "<td class='ui_checked_checkbox flexed' " .
      (ref($tdtags) ? $tdtags->[0] : '') . "><div class=\"wh-100p flex-wrapper flex-centered flex-start\">" .
      &ui_checkbox($checkname, $checkvalue, undef, $checked, $tags, $disabled, ' thick') . "</div></td>\n";
    my $i;
    for ($i = 0; $i < @$cols; $i++) {
        $rv .= "<td " . (ref($tdtags) ? $tdtags->[$i + 1] : '') . ">";
        if ($cols->[$i] !~ /<a\s+href|<input|<select|<textarea/) {
            $rv .= "<label for=\"" . &quote_escape("${checkname}_${checkvalue}") . "\">";
        }
        $rv .= ($cols->[$i] !~ /\S/ ? "<br>" : $cols->[$i]);
        if ($cols->[$i] !~ /<a\s+href|<input|<select|<textarea/) {
            $rv .= "</label>";
        }
        $rv .= "</td>\n";
    }
    $rv .= "</tr>\n";
    return $rv;
}

sub theme_ui_hidden_javascript
{
    my $rv;
    my ($jscb, $jstb) = ($cb, $tb);
    $jscb =~ s/'/\\'/g;
    $jstb =~ s/'/\\'/g;
    return undef;
}

sub theme_ui_hidden
{
    my $ids;
    $ids = "_h_$main::ui_hidden_tcalled" if ($main::ui_hidden_tcalled++);

    my ($name, $value, $formid) = @_;
    return "<input class='ui_hidden' type='hidden' " . "name=\"" . &quote_escape($name) . "\" " . 
    "id=\"" . &quote_escape($name . $ids) . "\" " . 
    "value=\"" . &quote_escape($value) . "\"" .
    ($formid ? " form=\"$formid\"" : "") . ">\n";

}

sub theme_ui_hidden_start
{

    my ($title, $name, $status, $url) = @_;
    my $rv;
    if (!$main::ui_hidden_start_donejs++) {
        $rv .= &ui_hidden_javascript();
    }
    my $divid    = "hiddendiv_$name";
    my $openerid = "hiddenopener_$name";
    my $defclass = $status ? 'opener_shown' : 'opener_hidden';
    $rv .= "<a class=\"hidden\" href=\"javascript:hidden_opener('$divid', '$openerid')\" id='$openerid'></a>\n";
    $rv .= "<a href=\"javascript:hidden_opener('$divid', '$openerid')\">$title</a><br>\n";
    $rv .= "<div class='$defclass' id='$divid'>\n";
    return $rv;
}

sub theme_ui_hidden_table_start
{
    my ($heading, $tabletags, $cols, $name, $status, $tds, $rightheading) = @_;
    my $rv;
    if (!$main::ui_hidden_start_donejs++) {
        $rv .= &ui_hidden_javascript();
    }
    my $divid    = "hiddendiv_$name";
    my $openerid = "hiddenopener_$name";
    my $defclass =
      $status ? 'opener_shown' :
      'opener_hidden';
    my $text =
      defined($tconfig{'cs_text'}) ? $tconfig{'cs_text'} :
      defined($gconfig{'cs_text'}) ? $gconfig{'cs_text'} :
      "f00";
    $rv .= "<table class='table table-striped table-hover table-condensed' $tabletags>\n";
    my $colspan = 1;

    if (defined($heading) || defined($rightheading)) {
        $rv .= "<tr" . ($tb ? " " . $tb : "") . "><td>";
        if (defined($heading)) {
            $rv .=
"<a tabindex='-1' class='opener_trigger' href=\"javascript:hidden_opener('$divid', '$openerid')\" id='$openerid'></a> <a class='opener_trigger' href=\"javascript:hidden_opener('$divid', '$openerid')\">$heading</a></td>";
        }
        if (defined($rightheading)) {
            $rv .= "<td align=right>$rightheading</td>";
            $colspan++;
        }
        $rv .= "</td> </tr>\n";
    }
    $rv .=
      "<tr" . ($cb ? " " . $cb : "") .
      "><td class='opener_container' colspan=$colspan><div class='$defclass' id='$divid'><table width=100%>\n";
    $main::ui_table_cols        = $cols || 4;
    $main::ui_table_pos         = 0;
    $main::ui_table_default_tds = $tds;
    $rv .= "<tbody data-tbody-type='ui-table' data-table-cols='$main::ui_table_cols'>\n";
    return $rv;
}

sub ui_hidden_table_row_end
{
    return "</tbody></table></div><table width='100%'>\n";
}

sub theme_ui_buttons_start
{
    return "<table width='100%' class='ui_buttons_table'>\n<tbody>\n<tr>\n<td>\n";
}

sub theme_ui_buttons_row
{
    my ($script, $label, $desc, $hiddens, $after, $before) = @_;
    if (ref($hiddens)) {
        $hiddens = join("\n", map {&ui_hidden(@$_)} @$hiddens);
    }
    return
      "<tr data-ui-buttons-row-form-container>\n<td>\n<form action='$script' method='post' class='ui_buttons_form'>\n" .
      $hiddens . "<table>" . "<tr class='ui_buttons_row'> " . "<td data-nowrap class=ui_buttons_label>" .
      ($before ? $before . " " : "") . &ui_submit($label) . ($after ? " " . $after : "") . "</td>\n" .
      "<td class=ui_buttons_value><span>" . $desc . "</span></td></tr>\n" . "</table>\n" . "</form>\n</td>\n</tr>\n";
}

sub theme_ui_buttons_end
{
    return "</td>\n</tr>\n</tbody>\n</table>\n";
}

sub theme_ui_radio_table
{
    my ($name, $sel, $rows, $nobold) = @_;
    return "" if (!$rows || !@$rows);
    my $rv = "<table data-radio-table=\"$name\" class='ui_radio_table'>\n";
    foreach my $r (@$rows) {
        $rv .= "<tr>\n";
        $rv .=
          "<td" . (defined($r->[2]) ? "" : " colspan=2") .
          ">" . ($nobold ? "" : "<b>") . &ui_oneradio($name, $r->[0], $r->[1], $r->[0] eq $sel, $r->[3]) .
          ($nobold ? "" : "</b>") . "</td>\n";
        if (defined($r->[2])) {
            $rv .= "<td>" . $r->[2] . "</td>\n";
        }
        $rv .= "</tr>\n";
    }
    $rv .= "</table>\n";
    return $rv;
}

sub theme_ui_make_date
{
    my ($date, $ts) = @_;
    return $date if ($main::webmin_script_type ne 'web' ||
                     $main::theme_prevent_make_date);
    return "<span data-filesize-bytes='$ts'>$date</span>";
}

sub theme_make_date
{
    return theme_make_date_local(@_);
}

sub theme_nice_size
{
    return theme_nice_size_local(@_);
}

sub theme_get_webprefix
{
    return theme_get_webprefix_local(@_)
      if (defined(&theme_get_webprefix_local));
}

sub theme_redirect
{
    my $request_uri = navigation_link_clean($ENV{'REQUEST_URI'});
    if ($request_uri =~ /noredirect=1/) {
        head();
        return;
    }

    my $origin   = $ENV{'HTTP_ORIGIN'};
    my $referer  = navigation_link_clean($ENV{'HTTP_REFERER'});
    my $prefix   = $theme_webprefix;
    my $noredir  = $gconfig{'webprefixnoredir'};
    my $relredir = $gconfig{'relative_redir'};
    my ($arg1, $arg2) = (navigation_link_clean($_[0]),
                         navigation_link_clean($_[1]));

    # Clean redirected links query string if requested
    if ($request_uri =~ /no-query=string/) {
        my $nocache = "no-cache=1";
        $arg1 =~ s/\.cgi.*/.cgi/;
        $arg2 =~ s/\.cgi.*/.cgi/;
        if ($request_uri =~ /\Q$nocache\E/) {
            $arg1 .= "?" . $nocache;
            $arg2 .= "?" . $nocache;
        }
    }

    my ($link) = $arg1 || $arg2;
    my ($url)  = $arg2;

    if (!$relredir) {
        ($url) = $arg2 =~ /\/\/\S+?(\/.*)/;
    }
    $url = "$prefix$url" if ($url && $noredir);
    theme_redirect_url_alterer(\$url);

    my ($remote_server_webprefix, $remote_server_linked) = &theme_get_webprefix_local('array');
    if ($remote_server_webprefix) {
        ($link) = $arg2 =~ /:\d+(.*)/;
        $url = "$remote_server_webprefix$link"
          if ($url !~ /^$remote_server_webprefix/);
    } elsif ((string_starts_with($arg1, 'http') && ($arg1 !~ /$origin/ || $referer !~ /$arg1/))) {
        print "Location: $arg1\n\n";
        return;
    } elsif (string_contains($arg1, '../')) {
        eval {
            $main::error_must_die = 1;
            set_theme_temp_data('redirected', $arg1) if ($arg1 !~ /switch\.cgi/);
        };
        print "Location: $arg1\n\n";
        return;
    }

    if (!theme_redirect_download($url)) {
        eval {
            $main::error_must_die = 1;
            set_theme_temp_data('redirected', $url)
              if (!theme_set_redirect_forbidden($url));
        };
        print "Location: $url\n\n";
    }
}

sub theme_redirect_url_alterer
{
    my ($u) = @_;
    my ($q) = $u =~ /\.cgi.*(\?)/;
    my $r   = &getvar('navigation-reload');

    if ($r) {
        if ($u !~ /\.cgi/) {
            if ($u !~ /\/$/) {
                $$u .= '/';
            }
            $$u .= 'index.cgi';
        }
        my $t = $q ? '&' : '?';
        $$u .= "${t}refresh-navigation=1";
    }
}

sub theme_set_redirect_forbidden
{
    my ($url) = @_;

    if ($url &&
        ($url =~ /\/tunnel\/link\.cgi\//))
    {
        return 1;
    }
    return 0;
}

sub theme_header_redirect_download
{
    my ($url, $delay, $message) = @_;

    PrintHeader();
    print "<!DOCTYPE html>\n";
    print "<html>\n";
    print "<head>\n";
    print '<meta charset="' . get_charset() . '">', "\n";
    print "</head>\n";
    my $script =
      '<form data-predownload action="' .
      $url . '" method="post" name="redirect"></form><script>setTimeout(function(){document.forms.redirect.submit()}, ' .
      ($delay ? $delay . "000" : 0) . ');</script>';
    print "<body>\n";
    print $script . "\n";

    if ($message) {
        print $message . "\n";
    }
    print "</body>\n";
    print '</html>';
}

sub theme_redirect_download
{
    if ($_[0] =~ /fetch.cgi/) {
        my $query = get_env('query_string');
        my $show  = $query =~ /show=1/  ? 1 : 0;
        my $delay = $_[0]  =~ /unzip=1/ ? 1 : 0;
        my $zip   = $_[0]  =~ /.zip/    ? 1 : 0;
        my $message;

        if ($delay) {
            $message = $theme_text{'theme_xhred_download_is_being_prepared'};
        }
        elsif (!$delay && !$show) {
            $message = $theme_text{'right_download_is_ready'};
        } else {
            $message = $theme_text{'right_file_is_being_prepared'};
        }

        theme_header_redirect_download($_[0], $delay, $message);

        return 1;
    } else {
        return 0;
    }
}

sub theme_js_redirect
{
    my ($url, $window, $timeout) = @_;
    $window ||= "window";
    $timeout ||= 100;
    if ($url =~ /^\//) {
        # If the URL is like /foo , add webprefix
        $url = &get_webprefix().$url;
    }
    return "<script type='text/javascript'>"."
            try {
                progress.end();
                set_onbeforeunload_status_native(0);
                set_onbeforeunload_status(0, 0);
            } catch (e) {};
            setTimeout(function(){location.href='@{[quote_escape($url)]}'},$timeout)".
           "</script>\n";
}

sub theme_post_save_domain
{
    my ($d) = @_;
    print '<script>';
    print 'theme_post_save=' . ($d->{'id'} ? $d->{'id'} : '-1') . '', "\n";
    print "</script>\n";
}

sub theme_post_save_domains
{
    print '<script>';
    print 'theme_post_save=-1', "\n";
    print "</script>\n";
}

sub theme_post_save_server
{
    my ($s, $action) = @_;
    if ($action eq 'create' ||
        $action eq 'delete' ||
        !$done_theme_post_save_server++)
    {
        print '<script>';
        print 'theme_post_save=' . ($s->{'id'} ? $s->{'id'} : '-1') . '', "\n";
        print "</script>\n";
    }
}

sub theme_select_domain
{
    my ($s) = @_;
    print '<script>';
    print 'theme_select_server=' . ($s->{'id'} ? $s->{'id'} : '') . '', "\n";
    print "</script>\n";
}

sub theme_select_server
{
    my ($s) = @_;
    print '<script>';
    print 'theme_select_server=' . ($s->{'id'} ? $s->{'id'} : '0') . '', "\n";
    print "</script>\n";
}

sub theme_post_change_theme
{
    # Clear module modifications
    lib_csf_control('unload');

    # Remove error handler
    error_40x_handler(1);
    
    # Remove service worker
    print '<script>';
    print 'navigator.serviceWorker.getRegistrations().then(
        registrations => {registrations.forEach(reg => reg.unregister());});';
    print "</script>\n";
}

sub theme_post_change_modules
{
    print '<script>';
    print 'theme_post_save=-1', "\n";
    print "</script>\n";
}

sub theme_ui_text_color
{
    my ($text, $type) = @_;
    $type = "warning" if ($type eq "warn");
    return "<span class=\"ui_text_color text_type_$type text-$type\">$text</span>\n";
}

sub theme_error
{
    my ($iref) = @_;
    my @err_msg = @{$iref->{'err'}};
    my @err_stack = @{$iref->{'stack'}};
    my $err_caller = $iref->{'err_caller'};
    my $main_header  = $main::done_webmin_header;
    my $main_capture = $miniserv::page_capture ? " captured" : "";
    my $err_last_eval  = $main::error_last_eval;
    $err_last_eval =~ s/\n$// if ($err_last_eval);
    &header($text{'error'}, "") if (!$main_header);
    my $error_what      = ($main::whatfailed ? "$main::whatfailed : " : "");
    my $error_message   = join(", ", @err_msg);
    my $main_web        = $main::webmin_script_type eq 'web';
    my $err_caller_msg_esc  =
        &quote_escape(($err_last_eval ? "$err_last_eval : $err_caller" : $err_caller), '"');
    if ($err_caller && $main_web) {
        if ($err_last_eval) {
            $err_caller = &ui_details({
                'title' => $text{'main_error_details'},
                'content' => $err_caller_msg_esc,
                'class' =>'error'}, 1);
        } else {
            $err_caller = &ui_help(&html_strip($err_caller_msg_esc)) if ($err_caller);
        }
    }
    my $error           = $error_what . $error_message . $err_caller;
    $error              = &html_strip($error_what . $error_message . $err_caller) if (!$main_web);
    my $get_error_stack = sub {
        # Show call stack
        my $error_stack = "";
        if ($gconfig{'error_stack'}) {
            $error_stack = "<br>" if ($main_header);
            my $cls_err_caption = " class=\"err-head$main_capture\"";
            my $cls_err_td      = $main_capture ? " class=\"@{[&trim($main_capture)]}\"" : "";
            $error_stack .= "<hr>\n" if ($main_capture);
            $error_stack .=
              "<table class=\"err-stack$main_capture\"><caption$cls_err_caption>$text{'error_stack'}</caption>\n";
            $error_stack .= "<tr><td$cls_err_td><b>$text{'error_file'}</b></td> ";
            $error_stack .= "<td$cls_err_td><b>$text{'error_line'}</b></td>";
            $error_stack .= "<td$cls_err_td><b>$text{'error_sub'}</b></td></tr>\n";
            foreach my $stack (@err_stack) {
                $error_stack .= "<tr>\n";
                $error_stack .= "<td$cls_err_td>$stack->[1]</td>\n";
                $error_stack .= "<td$cls_err_td>$stack->[2]</td>\n";
                $error_stack .= "<td$cls_err_td>$stack->[3]</td>\n";
                $error_stack .= "</tr>\n";
            }
            $error_stack .= "</table>\n";
        }
        return $error_stack;
    };
    if (!$main_header) {
        print "<hr>\n";
        print "<h3 data-fatal-error-text>$error</h3>\n";
        print &$get_error_stack();
        print "<hr>\n";
        if ($ENV{'HTTP_REFERER'} && $main::completed_referers_check) {
            &footer("javascript:history.back()", $text{'error_previous'});
        }
    } else {
        print ui_alert_box("<tt class='font-size-90pf'>$error</tt>@{[&$get_error_stack()]}", 'danger-fatal', undef, 1);
    }
}

sub theme_ui_page_refresh
{
return "page_refresh()";
}

sub theme_fonts
{
    return embed_css_fonts(1);
}

sub theme_css_inline
{
    return get_css_inline(@_);
}

$main::cloudmin_no_create_links = 1;
$main::cloudmin_no_edit_buttons = 1;
$main::cloudmin_no_global_links = 1;

$main::mailbox_no_addressbook_button = 1;
$main::mailbox_no_folder_button      = 1;

$main::basic_virtualmin_menu          = 1;
$main::basic_virtualmin_domain        = 1;
$main::nocreate_virtualmin_menu       = 1;
$main::nosingledomain_virtualmin_mode = 1;

1;
