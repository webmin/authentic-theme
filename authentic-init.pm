#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (@theme_bundle_css,            @theme_bundle_js,          %module_text_full,      %theme_config,
     %theme_text,                  %theme_temp_data,          $get_user_level,        $global_prefix,
     $has_cloudmin,                $has_usermin_conf_dir,     $has_usermin_root_dir,  $has_usermin_version,
     $has_usermin,                 $has_virtualmin,           $theme_module_query_id, $t_uri___i,
     $theme_requested_from_module, $theme_requested_from_tab, $theme_requested_url,   $t_var_product_m,
     $t_var_switch_m,              $xnav,                     %config,                %gaccess,
     %gconfig,                     %in,                       %tconfig,               %text,
     $base_remote_user,            $config_directory,         $current_lang,          $current_theme,
     $remote_user,                 $root_directory,           $theme_root_directory,  $title);

do(dirname(__FILE__) . "/authentic-funcs.pm");

init_vars();

sub settings_filter
{
    my (%in_data) = @_;

    delete @in_data{ grep(!/^config_portable_|^settings_/, keys %in_data) };
    delete @in_data{ grep(!m/^\w*$/,                       keys %in_data) };
    for (values %in_data) {s/(.*)/'$1';/}
    for (values %in_data) {s/\$|`*//g}
    for (values %in_data) {s/<<//g}
    for (values %in_data) {s/"/'/g}
    for (values %in_data) {s/\/\//&#47;&#47;/g}
    for (values %in_data) {s/'true'/true/g}
    for (values %in_data) {s/'false'/false/g}
    for (values %in_data) {s/'1'/1/g}
    for (values %in_data) {s/'0'/0/g}
    for (values %in_data) {
        s/
         \G
         (
            (?: ^ [^']* ' | (?!^) )
            (?: [^'\\]+ | \\. )*
         )
         '
         (?! [^']* \z )
      /
         $1 . "\\'"
      /xseg;
    }
    return %in_data;
}

sub settings_default
{
    my %c;
    $c{'settings_font_family'}                        = '0';
    $c{'settings_navigation_color'}                   = 'white';
    $c{'settings_background_color'}                   = 'gainsboro';
    $c{'settings_grayscale_level_navigation'}         = '0';
    $c{'settings_sepia_level_navigation'}             = '0';
    $c{'settings_saturate_level_navigation'}          = '1';
    $c{'settings_hue_level_navigation'}               = '0';
    $c{'settings_invert_level_navigation'}            = '0';
    $c{'settings_brightness_level_navigation'}        = '1';
    $c{'settings_contrast_level_navigation'}          = '1';
    $c{'settings_enable_container_offset'}            = 'true';
    $c{'settings_contrast_mode'}                      = 'false';
    $c{'settings_right_page_hide_persistent_vscroll'} = 'true';
    $c{'settings_button_tooltip'}                     = 'true';
    $c{'settings_hide_top_loader'}                    = 'false';
    $c{'settings_animation_left'}                     = 'true';
    $c{'settings_animation_tabs'}                     = 'true';
    $c{'settings_sysinfo_link_mini'}                  = 'false';
    $c{'settings_show_night_mode_link'}               = 'true';
    $c{'settings_theme_options_button'}               = 'true';
    $c{'settings_leftmenu_button_refresh'}            = 'false';
    $c{'settings_hotkeys_active'}                     = 'true';
    $c{'settings_hotkey_toggle_modifier'}             = 'altKey';
    $c{'settings_hotkey_toggle_key_webmin'}           = 'w';
    $c{'settings_hotkey_toggle_key_virtualmin'}       = 'v';
    $c{'settings_hotkey_toggle_key_cloudmin'}         = 'c';
    $c{'settings_hotkey_toggle_key_usermin'}          = 'u';
    $c{'settings_hotkey_toggle_key_webmail'}          = 'm';
    $c{'settings_hotkey_shell'}                       = 'k';
    $c{'settings_hotkey_sysinfo'}                     = 'i';
    $c{'settings_hotkey_navigation'}                  = 'a';
    $c{'settings_hotkey_toggle_slider'}               = 'n';
    $c{'settings_hotkey_favorites'}                   = 'f';
    $c{'settings_hotkey_focus_search'}                = 's';
    $c{'settings_hotkey_reload'}                      = 'r';
    $c{'settings_hotkey_toggle_key_night_mode'}       = 'l';
    $c{'settings_mail_ui'}                            = 'true';

    return %c;
}

sub embed_favicon
{
    my $product = get_product_name() eq 'usermin' ? 'usermin' : 'webmin';

    if ($get_user_level eq '1' || $get_user_level eq '2') {
        $product = 'virtualmin';
    }
    if ($get_user_level eq '4') {
        $product = 'cloudmin';
    }

    my $favicon_path = $gconfig{'webprefix'} . '/images/favicons/' . $product;
    my $ref_link     = 'data-link-ref';
    print '<link ' .
      $ref_link . ' rel="apple-touch-icon" sizes="180x180" href="' . $favicon_path . '/apple-touch-icon.png">';
    print '<link ' .
      $ref_link . ' rel="icon" type="image/png" sizes="32x32" href="' . $favicon_path . '/favicon-32x32.png">';
    print '<link ' .
      $ref_link . ' rel="icon" type="image/png" sizes="192x192" href="' . $favicon_path . '/android-chrome-192x192.png">';
    print '<link ' .
      $ref_link . ' rel="icon" type="image/png" sizes="16x16" href="' . $favicon_path . '/favicon-16x16.png">';
    print '<link ' . $ref_link . ' rel="manifest" href="' . $favicon_path . '/site.webmanifest">';
    print '<link ' . $ref_link . ' rel="mask-icon" href="' . $favicon_path . '/safari-pinned-tab.svg" color="#3d74ca">';
    print '<meta name="msapplication-TileColor" content="#3d74ca">';
    print '<meta ' . $ref_link . ' name="msapplication-TileImage" content="' . $favicon_path . '/mstile-144x144.png">';
    print '<meta name="theme-color" content="#3d74ca">';

}

sub embed_header
{
    my (@args) = @_;
    my $charset = defined($main::force_charset) ? $main::force_charset : get_charset();

    print "<!DOCTYPE html>\n";
    print '<html ' . header_html_data(undef, undef, @args) . '>', "\n";
    print ' <head>', "\n";
    embed_noscript();
    print ' <meta charset="' . ($charset ? quote_escape($charset) : 'utf-8') . '">', "\n";
    embed_favicon();
    print ' <title>', $args[0], '</title>', "\n";

    print ' <meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";

    ($args[1] && (print($args[1] . "\n")));

    if (get_stripped()) {
        print '</head>';
        return;
    }

    # Print object with language strings
    print '<script>';
    print 'var v___theme_language = ' . get_theme_language();
    print '</script>';

    if ($args[2]) {
        do(dirname(__FILE__) . "/dependencies.pm");
    }

    if ($args[3] eq '1') {

        if ($args[2]) {
            foreach my $css (@theme_bundle_css) {
                print ' <link href="' . $gconfig{'webprefix'} .
                  '/unauthenticated/css/' . $css . '.src.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {

            embed_css_bundle();
        }

        embed_css_night_rider();

        embed_background();
        embed_styles();
        embed_settings();

        if ($args[2]) {
            foreach my $js (@theme_bundle_js) {

                if (is_st_p() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print ' <script src="' . $gconfig{'webprefix'} .
                  '/unauthenticated/js/' . $js . '.src.js?' . theme_version(1) . '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }
    } else {

        if ($args[2]) {
            foreach my $css (@theme_bundle_css) {
                print ' <link href="' . $gconfig{'webprefix'} .
                  '/unauthenticated/css/' . $css . '.src.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {
            embed_css_bundle();
        }

        embed_css_night_rider();

        if (
            (length $theme_config{'settings_navigation_color'} &&
             $theme_config{'settings_navigation_color'} ne 'blue' &&
             $theme_config{'settings_navigation_color'} ne 'white'
            ) ||
            theme_night_mode())
        {
            print ' <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/' .
              (theme_night_mode() ? 'gunmetal' : lc($theme_config{'settings_navigation_color'})) . '.' .
              ($args[2] ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";

        }

        embed_background();
        embed_styles();
        embed_settings();

        if ($args[2]) {
            foreach my $js (@theme_bundle_js) {

                if (is_st_p() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print ' <script src="' . $gconfig{'webprefix'} .
                  '/unauthenticated/js/' . $js . '.src.js?' . theme_version(1) . '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }

    }
    embed_js_scripts();

    # Head theme overlay
    embed_overlay_head();

    print '</head>', "\n";
}

sub embed_overlay_head
{
    print "$tconfig{'headhtml'}\n" if ($tconfig{'headhtml'});
    if ($tconfig{'headinclude'}) {
        my ($theme, $overlay) = split(' ', $gconfig{'theme'});
        my $file_contents = read_file_contents("$root_directory/$overlay/$tconfig{'headinclude'}");
        $file_contents = replace_meta($file_contents);
        print $file_contents;
    }
}

sub embed_overlay_prebody
{
    if (defined(&theme_prebody)) {
        &theme_prebody(@_);
    }
    my $prebody = $tconfig{'prebody'};
    if ($prebody) {
        $prebody = replace_meta($prebody);
        print "$prebody\n";
    }
    if ($tconfig{'prebodyinclude'}) {
        my ($theme, $overlay) = split(' ', $gconfig{'theme'});
        my $file_contents = read_file_contents("$root_directory/$overlay/$tconfig{'prebodyinclude'}");
        $file_contents = replace_meta($file_contents);
        print $file_contents;
    }
}

sub embed_overlay_postbody
{
    my $postbody = $tconfig{'postbody'};
    if ($postbody) {
        $postbody = replace_meta($postbody);
        print "$postbody\n";
    }
    if ($tconfig{'postbodyinclude'}) {
        my ($theme, $overlay) = split(' ', $gconfig{'theme'});
        my $file_contents = read_file_contents("$root_directory/$overlay/$tconfig{'postbodyinclude'}");
        $file_contents = replace_meta($file_contents);
        print $file_contents;
    }
    if (defined(&theme_postbody)) {
        &theme_postbody(@_);
    }
}

sub embed_settings
{

    my $str_settings       = "settings";
    my $str_js             = "js";
    my $global_config_file = ($config_directory . "/" . $current_theme . "/" . $str_settings . "." . $str_js);
    my $user_config_file   = (get_tuconfig_file());

    # Global configuration
    if (-r $global_config_file) {
        $global_config_file = read_file_contents($global_config_file);
        $global_config_file =~ tr/\r\n/;/d;
        print ' <script>' . $global_config_file . '</script>' . "\n";
    }

    # User configuration
    if (-r $user_config_file) {
        $user_config_file = read_file_contents($user_config_file);
        $user_config_file =~ tr/\r\n/;/d;
        print ' <script>' . $user_config_file . '</script>' . "\n";
    }
}

sub embed_styles
{
    if ($theme_config{'settings_contrast_mode'} eq 'true') {
        print ' <link href="' .
          $gconfig{'webprefix'} . '/unauthenticated/css/high-contrast.' . (theme_debug_mode() ? 'src' : 'min') . '.css?' .
          time() . '" rel="stylesheet" data-high-contrast>' . "\n";
    }

    my $css = $config_directory . "/$current_theme/styles.css";
    if (-r $css && -s $css) {
        print ' <link data-custom-style href="data:text/css;base64,' .
          trim(encode_base64(read_file_contents($css))) . '" rel="stylesheet">' . "\n";
    }

}

sub embed_background
{
    if ($ENV{'HTTP_X_REQUESTED_WITH'} eq "XMLHttpRequest") {
        return;
    }

    my $background_type;

    ((get_env('script_name') eq '/session_login.cgi' || get_env('script_name') eq '/pam_login.cgi') ?
       ($background_type = 'content') :
       ($background_type = 'aside'));

    my $lnk = $config_directory . "/$current_theme/background_" . $background_type . ".png";
    if (-r $lnk) {
        my $background_base64 = encode_base64(read_file_contents($lnk));
        my $background_css;
        if ($background_type eq 'content') {
            $background_css = <<EOF;
              <style>
              body.session_login {
                background: url(data:image/png;base64,$background_base64) no-repeat center center fixed;
                background-size: cover;
              }

              html.session_login .container:not(.form-signin-banner) {
                background-color: transparent !important;
              }
              </style>
EOF
            $background_css =~ tr/\r\n//d;
            $background_css =~ s/\s+/ /g;
            print $background_css, "\n";
        }
    }
}

sub embed_pm_scripts
{
    my $scripts = $config_directory . "/$current_theme/scripts.pm";
    if (-r $scripts && -s $scripts) {
        require $scripts;
    }
}

sub embed_css_fonts
{

    if (!$theme_config{'settings_font_family'} || $theme_config{'settings_font_family'} eq 'undefined') {
        print ' <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/fonts-roboto.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    } elsif ($theme_config{'settings_font_family'} != '1') {
        print ' <link href="' .
          $gconfig{'webprefix'} . '/unauthenticated/css/font-' . $theme_config{'settings_font_family'} . '.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    }
}

sub embed_css_bundle
{
    print ' <link href="' .
      $gconfig{'webprefix'} . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    embed_css_fonts();
}

sub embed_css_night_rider
{
    if (theme_night_mode()) {
        print ' <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/nightrider.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_css_content_palette
{
    if (theme_night_mode()) {
        print ' <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/nightrider.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_js_timeplot
{
    print ' <script src="' . $gconfig{'webprefix'} . '/unauthenticated/js/timeplot.' .
      (theme_debug_mode() ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
}

sub embed_js_bundle
{
    print ' <script src="' .
      $gconfig{'webprefix'} . '/unauthenticated/js/bundle.min.js?' . theme_version(1) . '"></script>' . "\n";
}

sub embed_js_scripts
{

    (get_stripped() && return);

    my $js = $config_directory . "/$current_theme/scripts.js";
    if (-r $js && -s $js) {
        $js = read_file_contents($js);
        $js =~ tr/\r\n/;/d;
        print ' <script data-custom-script>' . $js . '</script>' . "\n";
    }
}

sub embed_noscript
{
    my $noscript = <<EOF;
      <noscript>
      <style>
        html[data-background-style="gainsboro"]
        {
          background-color: #d6d6d6;
        }
        html[data-background-style="nightRider"]
        {
          background-color: #1a1c20;
        }
        html[data-background-style="nightRider"] div[data-noscript]
        {
          color: #979ba080;
        }
        html[data-slider-fixed='1']
        {
          margin-right: 0 !important;
        }
        body > div[data-noscript] ~ *
        {
            display: none !important;
        }
        div[data-noscript]
        {
            visibility: hidden;

            animation: 2s noscript-fadein;
            animation-delay: 1s;
            text-align: center;

            animation-fill-mode: forwards;
        }
        \@keyframes noscript-fadein
        {
            0%
            {
                opacity: 0;
            }
            100%
            {
                visibility: visible;

                opacity: 1;
            }
        }
      </style>
        <div data-noscript>
          <div class="fa fa-3x fa-exclamation-triangle margined-top-20 text-danger"></div>
          <h2>$theme_text{'body_no_javascript_title'}</h2>
          <p>$theme_text{'body_no_javascript_message'}</p>
        </div>
      </noscript>
EOF

    $noscript =~ tr/\r\n//d;
    $noscript =~ s/\s+/ /g;
    print $noscript, "\n";
}

sub embed_footer
{
    my (@args) = @_;

    (get_stripped() && return);

    if (get_env('script_name') !~ /session_login.cgi/ &&
        get_env('script_name') !~ /pam_login.cgi/     &&
        get_env('script_name') !~ /password_form.cgi/ &&
        get_env('script_name') !~ /password_change.cgi/)
    {

        # Load `MySQL/PostgreSQL` specific scripts
        if (get_module_name() =~ /mysql/ ||
            get_module_name() =~ /postgresql/)
        {
            print ' <script src="' . $gconfig{'webprefix'} . '/extensions/sql.' .
              ($args[0] ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
        }

        # Load `File Manager` specific scripts
        if (get_module_name() =~ /file-manager/ ||
            get_module_name() =~ /filemin/)
        {
            print ' <script src="' . $gconfig{'webprefix'} . '/extensions/file-manager/file-manager.' .
              ($args[0] ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
        }

    }
}

sub is_st_p
{
    return ($theme_requested_url !~ /\/virtual-server\/pro\/history.cgi/ &&
            $theme_requested_url !~ /\/server-manager\/bwgraph.cgi/ &&
            $theme_requested_url !~ /\/server-manager\/history.cgi/ &&
            $theme_requested_url !~ /\/server-manager\/one_history.cgi/) ?
      1 :
      0;
}

sub theme_text
{

    my $rv = $theme_text{ $_[0] };
    $rv =~ s/\$(\d+)/$1 < @_ ? $_[$1] : '$'.$1/ge;
    return $rv;
}

sub init_vars
{
    if (theme_debug_mode()) {
        do "$root_directory/$current_theme/.debug.pm";
    }

    our %theme_text = (load_language($current_theme), %text);

    our %theme_config = (settings_default(),
                         settings($config_directory . "/$current_theme/settings.js", 'settings_'),
                         settings(get_tuconfig_file(),                               'settings_'));

    our $theme_requested_url         = (get_env('http_x_pjax_url') || get_env('http_x_progressive_url'));
    our $theme_requested_from_module = get_env('http_x_requested_from');
    our $theme_requested_from_tab    = get_env('http_x_requested_from_tab');

    if ($theme_requested_url =~ /sysinfo.cgi/ || (grep {/xhr-info/} keys %in)) {
        if (foreign_available("virtual-server")) {
            %theme_text = (load_language('virtual-server'), %theme_text);
        }
        if (foreign_available("server-manager")) {
            %theme_text = (load_language('server-manager'), %theme_text);
        }
    }

    if (!(grep {/xhr-/} keys %in)) {
        if ($theme_config{'settings_right_default_tab_webmin'} =~ /virtualmin/) {
            $theme_requested_url = 'virtual-server';
        } elsif ($theme_config{'settings_right_default_tab_webmin'} =~ /cloudmin/) {
            $theme_requested_url = 'server-manager';
        }
    }

    our ($has_virtualmin, $get_user_level, $has_cloudmin) = get_user_level();
    our ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir) = get_usermin_data();

    our $t_uri__x = get_env('script_name');
    our $t_uri___i;
    our $theme_module_query_id;

    my ($server_link, $server_prefix) = parse_servers_path();
    our $global_prefix = ($server_prefix ? $server_prefix : $gconfig{'webprefix'});

    our $xnav = "xnavigation=1";

    our %gaccess = &get_module_acl();
    our $title   = &get_html_framed_title();
    our %cookies = get_cookies();

    our ($t_var_switch_m, $t_var_product_m) = get_swith_mode();

}

sub licenses
{
    my ($id) = @_;
    if (&foreign_available("virtual-server") && $id eq "vm") {
        my %virtualmin = &get_module_info("virtual-server");
        if ($virtualmin{'version'} =~ /gpl/igs) {
            return 0;
        } else {
            return 1;
        }
    } elsif (&foreign_available("server-manager") && $id eq "cm") {
        my %cloudmin = &get_module_info("server-manager");
        if ($cloudmin{'version'} =~ /gpl/igs) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 0;
    }
}

sub get_usermin_data
{
    my ($module) = @_;
    my ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir);

    $has_usermin_root_dir = $root_directory;
    $has_usermin_conf_dir = $config_directory;
    $has_usermin_root_dir =~ s/web/user/;
    $has_usermin_conf_dir =~ s/web/user/;

    if ($module) {
        if (-r "$has_usermin_root_dir/$module") {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (!-d $has_usermin_conf_dir . '/' . $current_theme) {
            mkdir($has_usermin_conf_dir . '/' . $current_theme, 0755);
        }

        if (-r $has_usermin_root_dir . '/web-lib-funcs.pl') {
            $has_usermin = 1;
        }

        $has_usermin_version = read_file_lines($has_usermin_conf_dir . '/version', 1)->[0];
        return ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir);
    }
}

sub get_webmin_switch_mode
{
    my $user = $remote_user;
    $user =~ s/-//g;
    return ($theme_config{"settings_show_webmin_tab_$user"} ne "false" ? 1 : 0);
}

sub dashboard_switch
{
    if (($get_user_level eq '2' && get_webmin_switch_mode() ne '1') ||
        (!foreign_available("virtual-server") &&
            !foreign_available("server-manager") &&
            (get_product_name() ne 'usermin' || (get_product_name() eq 'usermin' && !foreign_available("mailbox")))))
    {
        return 1;
    } else {
        return 0;
    }
}

sub get_current_user_language
{
    my ($full) = @_;
    my $language;
    my @languages;
    my $language_browser = $gconfig{'acceptlang'};

    if ($language_browser) {
        $language = $ENV{'HTTP_ACCEPT_LANGUAGE'};
        $language =~ s/;.*//;
        @languages = split /,/, $language;
        $language = $languages[0];
    }

    if (($language_browser && !$language) || !$language_browser) {
        $language = $gconfig{ 'lang' . '_' . $base_remote_user };
        $language = ($language ? $language : $gconfig{'lang'});
    }

    $language = substr($language, 0, ($full ? 5 : 2));
    $language =~ s/\..*//;
    $language =~ s/_/-/;
    return lc($language);
}

sub get_filters
{
    return '-webkit-filter: grayscale(' . $theme_config{'settings_grayscale_level_navigation'} .
      ') ' . 'sepia(' . $theme_config{'settings_sepia_level_navigation'} .
      ')' . ' saturate(' . $theme_config{'settings_saturate_level_navigation'} .
      ') hue-rotate(' . $theme_config{'settings_hue_level_navigation'} .
      'deg)' . ' invert(' . $theme_config{'settings_invert_level_navigation'} .
      ') brightness(' . $theme_config{'settings_brightness_level_navigation'} .
      ') contrast(' . $theme_config{'settings_contrast_level_navigation'} .
      ')' . '; filter: grayscale(' . $theme_config{'settings_grayscale_level_navigation'} .
      ') ' . 'sepia(' . $theme_config{'settings_sepia_level_navigation'} .
      ')' . ' saturate(' . $theme_config{'settings_saturate_level_navigation'} .
      ') hue-rotate(' . $theme_config{'settings_hue_level_navigation'} .
      'deg)' . ' invert(' . $theme_config{'settings_invert_level_navigation'} .
      ') brightness(' . $theme_config{'settings_brightness_level_navigation'} .
      ') contrast(' . $theme_config{'settings_contrast_level_navigation'} . ')' . ';';
}

sub get_user_level
{
    my ($a, $b, $c);
    $b = &foreign_available("server-manager");
    $a = &foreign_available("virtual-server");
    if ($b) {
        &foreign_require("server-manager", "server-manager-lib.pl");
    }
    if ($a) {
        &foreign_require("virtual-server", "virtual-server-lib.pl");
    }
    if ($b) {
        no warnings 'once';
        $c = $server_manager::access{'owner'} ? 4 : 0;
    } elsif ($a) {
        $c =
          &virtual_server::master_admin()   ? 0 :
          &virtual_server::reseller_admin() ? 1 :
          2;
    } elsif (&get_product_name() eq "usermin") {
        $c = 3;
    } else {
        $c = 0;
    }
    return ($a, $c, $b);
}

sub set_user_level
{
    if ($get_user_level ne '0' && $get_user_level ne '1') {
        switch_to_remote_user();
    }
}

sub get_initial_wizard
{
    # Going to Post-Installation Wizard
    if ($get_user_level eq '0') {
        our %virtualmin_config = foreign_config('virtual-server');
        if ($virtualmin_config{'wizard_run'} ne '1') {
            return 1;
        }
    }
    return 0;
}

sub get_button_style
{

    my $label = quote_escape(@_);

    my %module_text = module_text_full();
    my (@keys) = grep {$module_text{$_} eq $label} keys %module_text;

    my $keys = "@keys";
    my $icon;
    my $class = "default";

    if (string_contains($keys, 'edit_createnow') || string_contains($keys, 'edit_savenow')) {
        $icon = "backup fa-1_25x";
    } elsif (string_contains($keys, "newips")) {
        $icon = "pencil-square-o";
    } elsif (string_contains($keys, "docker_reg")) {
        $class = "success ";
        $icon  = "server-add";
    } elsif (string_contains($keys, "save") ||
             string_contains($keys, "backup_ok2")    ||
             string_contains($keys, "sharedips_ok")  ||
             string_contains($keys, "categories_ok") ||
             string_contains($keys, "frame_ok")      ||
             string_contains($keys, "newquotas_ok")  ||
             string_contains($keys, "newdynip_ok"))
    {
        $class = "success ";
        $icon  = "check-circle";
    } elsif (string_contains($keys, "form_ok")) {
        $class = "success ";
        $icon  = "check-circle";
    } elsif (string_contains($keys, "apply")) {
        $class = "info ";
        $icon  = "check-circle-o";
    } elsif (string_contains($keys, "update") ||
             string_contains($keys, "index_sync"))
    {
        $class = "info ";
        $icon  = "refresh";
    } elsif ((string_contains($keys, "delete") && !string_contains($keys, "users_delete")) ||
             string_contains($keys, "wipe")          ||
             string_contains($keys, "ddrop_ok")      ||
             string_contains($keys, "dbs_dok")       ||
             string_contains($keys, "tprivs_dok")    ||
             string_contains($keys, "hosts_dok")     ||
             string_contains($keys, "cprivs_dok")    ||
             string_contains($keys, "dbase_drop")    ||
             string_contains($keys, "ddrop_title")   ||
             string_contains($keys, "dbase_delete2") ||
             string_contains($keys, "table_drop")    ||
             string_contains($keys, "tdrop_title")   ||
             string_contains($keys, "tdrop_ok")      ||
             string_contains($keys, "index_drops")   ||
             string_contains($keys, "delq_confirm")  ||
             string_contains($keys, "umass_del2")    ||
             string_contains($keys, "index_gmass")   ||
             string_contains($keys, "master_del")    ||
             string_contains($keys, "newstyles_del") ||
             string_contains($keys, "html_dtitle"))
    {
        $class = "danger ";

        $icon = "times-circle";
    } elsif (string_contains($keys, "twofactor_enable")) {
        $class = "info ";
        $icon  = "lock";
    } elsif (string_contains($keys, "twofactor_disable")) {
        $class = "warning ";
        $icon  = "unlock";
    }
    elsif (
           (string_contains($keys, "install")     ||
            string_contains($keys, "recsok")      ||
            string_contains($keys, "scripts_iok") ||
            string_contains($keys, "right_upok")
           ) &&
           !string_contains($keys, "uninstall"))
    {
        $class = "success ";
        $icon  = "package-install fa-1_25x";
    } elsif (string_contains($keys, "uninstall") ||
             string_contains($keys, "edit_uninst") ||
             string_contains($keys, "drecs_ok"))
    {
        $class = "danger ";
        $icon  = "times-circle-o";
    } elsif (string_contains($keys, "upgrade") ||
             string_contains($keys, "massg_ok") ||
             string_contains($keys, "massscript_ok"))
    {
        $class = "info ";
        $icon  = "update";
    } elsif (string_contains($keys, "index_srefresh")) {
        $icon = "user-md";
    } elsif (string_contains($keys, "quota")) {
        $icon = "pie-chart";
    } elsif (string_contains($keys, "addboot") ||
             string_contains($keys, "enable") ||
             string_contains($keys, "massdomains_enaok"))
    {
        $icon = "toggle-switch  fa-1_25x";
    } elsif (string_contains($keys, "shutdown")) {
        $icon = "power-off";
    } elsif (string_contains($keys, "docker_reg")) {
        $icon = "check-circle-o";
    } elsif (string_contains($keys, "tmpl_nprev") || string_contains($keys, "wizard_prev")) {
        $icon = "arrow-circle-o-left";
    } elsif (string_contains($keys, "tmpl_nnext") ||
             string_contains($keys, "wizard_next") ||
             string_contains($keys, "tmpl_cnext")  ||
             string_contains($keys, "tmpl_snext")  ||
             string_contains($keys, "download_cont"))
    {
        $icon = "arrow-circle-o-right";
    } elsif (string_contains($keys, "cancel")) {
        $icon = "times-circle-o";
    } elsif (string_contains($keys, "ticket_submit")) {
        $icon = "question-circle";
    } elsif (string_contains($keys, "passwd_change")) {
        $icon  = "key-li";
        $class = "warning ";
    } elsif (string_contains($keys, "nf_seen")) {
        $icon = "clear-all fa-1_25x";
    } elsif (string_contains($keys, "history_ok")) {
        $icon = "area-chart";
    } elsif (string_contains($keys, "edit_open") || string_contains($keys, "edit_list")) {
        $icon = "files-o";
    } elsif (string_contains($keys, "reboot") ||
             string_contains($keys, "view_refresh") ||
             string_contains($keys, "refreshmods")  ||
             string_contains($keys, "index_buttinit"))
    {
        if (string_contains($keys, "refreshmods")) {
            $class = "primary ";
        } elsif (!string_contains($keys, "reboot_ok") && !string_contains($keys, "index_reboot") ||
                 string_contains($keys, "index_buttinit"))
        {
            $class = "warning ";
        }
        $icon = "refresh-fi fa-1_25x";
    } elsif (string_contains($keys, "search") ||
             string_contains($keys, "index_broad")    ||
             string_contains($keys, "scripts_findok") ||
             string_contains($keys, "kill_title"))
    {
        $class = "info ";
        $icon  = "search";
    } elsif (string_contains($keys, "restart") || string_contains($keys, "edit_kill")) {
        $class = "warning ";
        $icon  = "refresh";
    } elsif (string_contains($keys, "ddrop_empty")) {
        $class = "warning ";
        $icon  = "times-circle-o";
    } elsif (string_contains($keys, "start")) {
        $class = "success ";
        $icon  = "play";
    } elsif (string_contains($keys, "index_stop") ||
             string_contains($keys, "edit_stopnow"))
    {
        $class = "danger ";
        $icon  = "stop";
    } elsif (string_contains($keys, "ok_ok")) {
        $icon  = "check-square-o";
        $class = "success ";
    } elsif (string_contains($keys, "index_delboot")) {
        $class = "grey ";
        $icon  = "toggle-switch-off fa-1_25x";
    } elsif (string_contains($keys, "index_refsel") ||
             string_contains($keys, "index_reset") ||
             string_contains($keys, "index_regen") ||
             string_contains($keys, "index_reload"))
    {
        $class = "warning ";
        $icon  = "refresh";
    } elsif (string_contains($keys, "index_script")) {
        $icon = "update";
    } elsif (string_contains($keys, "status")) {
        $icon = "info-circle";
    } elsif (string_contains($keys, "index_clear") || string_contains($keys, "shell_clear")) {
        $icon = "history";
    } elsif (string_contains($keys, "index_clearcmds") || string_contains($keys, "shell_clearcmds")) {
        $icon = "broom fa-1_25x";
    } elsif (string_contains($keys, "index_boot") ||
             string_contains($keys, "index_bootup")      ||
             string_contains($keys, "index_atboot")      ||
             string_contains($keys, "massdomains_disok") ||
             string_contains($keys, "disable"))
    {
        $icon = "toggle-switch-off fa-1_25x";
    } elsif (string_contains($keys, "index_global") ||
             string_contains($keys, "umass_ok")    ||
             string_contains($keys, "vars_edit")   ||
             string_contains($keys, "lusers_mass") ||
             string_contains($keys, "root_ok")     ||
             string_contains($keys, "index_edit"))
    {
        $class = "primary ";
        $icon  = "pencil-square-o";
    } elsif (string_contains($keys, "clone")) {
        $icon = "clone";
    } elsif (string_contains($keys, "index_tmpls")) {
        $icon = "table-edit fa-1_25x";
    } elsif (string_contains($keys, "index_sched") ||
             string_contains($keys, "sched_title"))
    {
        if (string_contains($keys, "sched_title")) {
            $class = "primary ";
        }
        $icon = "clock";
    } elsif (string_contains($keys, "uedit_mail") || string_contains($keys, "newnotify_ok")) {
        $icon = "envelope-o";
    } elsif (string_contains($keys, "sendmail")) {
        $icon  = "envelope-o";
        $class = "info ";
    } elsif (string_contains($keys, "uedit_swit") || string_contains($keys, "user_switch")) {
        $icon = "webmin";
    } elsif (string_contains($keys, "uedit_logins") ||
             string_contains($keys, "index_logins") ||
             string_contains($keys, "login_enable"))
    {
        $icon = "key";
    } elsif (string_contains($keys, "index_who")) {
        $icon = "sign-in";
    } elsif (string_contains($keys, "dbase_add") || string_contains($keys, "databases_import")) {
        $class = "success ";
        $icon  = "database-plus fa-1_25x";
    }
    elsif (
        (string_contains($keys, "add") && !string_contains($keys, "dbase_addview") && !string_contains($keys, "edit_addinc"))
        ||
        (string_contains($keys, "create") &&
            !string_contains($keys, "user_priv_create_view")) ||
        string_contains($keys, "index_crnow") ||
        string_contains($keys, "view_new")    ||
        string_contains($keys, "mass_ok")     ||
        string_contains($keys, "rmass_ok"))
    {
        $class = "success ";
        $icon  = "plus-circle";
    } elsif (string_contains($keys, "force_title") ||
             string_contains($keys, "index_force"))
    {
        $class = "warning ";
        $icon  = "rotate-3d fa-1_25x margined-left--3 margined-right--3";
    } elsif (string_contains($keys, "csv")) {
        $icon = "export";
    } elsif (string_contains($keys, "restore")) {
        $icon = "restore fa-1_25x";
    } elsif (string_contains($keys, "backup_title") ||
             string_contains($keys, "dbase_backup") ||
             string_contains($keys, "index_dump")   ||
             string_contains($keys, "backup_ok")    ||
             string_contains($keys, "export")       ||
             string_contains($keys, "backup_now"))
    {
        $icon = "backup fa-1_25x";
    } elsif (string_contains($keys, "dbase_exec") ||
             string_contains($keys, "exec_exec")         ||
             string_contains($keys, "user_priv_execute") ||
             string_contains($keys, "exec_title")        ||
             string_contains($keys, "exec_tabexec"))
    {
        $icon = "database";
    } elsif (string_contains($keys, "create_view") ||
             string_contains($keys, "addview") ||
             string_contains($keys, "view_title1"))
    {
        $icon = "list";
    } elsif (string_contains($keys, "table_data")) {
        $icon = "database-outline";
    } elsif (string_contains($keys, "index_title1") || string_contains($keys, "table_index")) {
        $icon = "key-plus fa-1_25x";
    } elsif (string_contains($keys, "transfer_transferok")) {
        $icon = "transform fa-1_25x";
    } elsif (string_contains($keys, "transfer_uploadok") ||
             string_contains($keys, "transfer_tabupload") ||
             string_contains($keys, "html_uploadok"))
    {
        $class = "primary ";
        $icon  = "upload";
    } elsif (string_contains($keys, "index_down") || string_contains($keys, "transfer_downloadok")) {
        $class = "primary ";
        $icon  = "download";
    } elsif (string_contains($keys, "index_up") || string_contains($keys, "download_need")) {
        $class = "primary ";
        $icon  = "download";
    } elsif (string_contains($keys, "umass_del1") ||
             string_contains($keys, "gdel_del")    ||
             string_contains($keys, "gdel_title")  ||
             string_contains($keys, "drecs_title") ||
             string_contains($keys, "rdmass_ok"))
    {
        $icon = "times-circle-o";
    } elsif (string_contains($keys, "users_dok") || string_contains($keys, "users_delete")) {
        $class = "danger ";
        $icon  = "user-times";
    } elsif (string_contains($keys, "index_mass2")) {
        $class = "warning ";
        $icon  = "toggle-switch  fa-1_25x";
    } elsif (string_contains($keys, "index_mass3")) {
        $class = "success ";
        $icon  = "toggle-switch-off  fa-1_25x";
    } elsif (string_contains($keys, "lang")) {
        $icon  = "globe";
        $class = "warning ";
    } elsif (string_contains($keys, "_ok")) {
        $icon  = "check-circle-o";
        $class = "success ";
    } elsif (string_contains($keys, "_change") &&
             !string_contains($keys, "edit_change") &&
             !string_contains($keys, "trace_change"))
    {
        $class = "warning ";
        $icon  = "pencil-square-o";
    } elsif (string_contains($keys, "lkeys_sok2")) {
        $class = "success ";
        $icon  = "key";
    } elsif (string_contains($keys, "letsencrypt_title") ||
             string_contains($keys, "cert_letsonly") ||
             string_contains($keys, "ssl_copycert"))
    {
        $icon = "certificate";
    } elsif (string_contains($keys, "index_tree")) {
        $icon = "tree";
    }

    if ($icon) {
        $icon = "<i class=\"fa fa-fw fa-$icon\"></i>";
    }

    return ($keys, $class, $icon);
}

sub theme_night_mode
{
    if ($theme_config{'settings_force_night_mode'} eq '1') {
        return 1;
    } else {
        return 0;
    }
}

sub theme_version
{
    my ($string, $mod) = @_;
    my %tinfo       = get_theme_info($current_theme);
    my $version     = $tinfo{'version'};
    my $mversion    = $tinfo{'mversion'};
    my $development = string_contains($version, '-');

    if ($mod) {
        return $mversion;
    }

    if ($string) {
        $version =~ s/beta[\d+]|\.|-//ig;
        if (theme_debug_mode() || $development) {
            $version .= (time() . $mversion);
        } else {
            $version .= ('9999999999' . $mversion);
        }
    }

    return $version;
}

sub theme_debug_mode
{
    my $debug_mode = "$root_directory/$current_theme/unauthenticated/js/authentic.src.js";
    if (-r $debug_mode) {
        return 1;
    } else {
        return 0;
    }
}

sub theme_post_update
{
    my $update = $root_directory . "/$current_theme/update";

    if (-f $update && $get_user_level eq '0') {
        unlink $update;
        return '1';
    } else {
        return '0';
    }
}

sub header_html_data
{
    my ($module, $skip, @args) = @_;
    return 'data-host="' . get_env('http_host') . '" data-hostname="' . get_display_hostname() .
      '" data-title-initial="' . $args[0] . '" data-debug="' . theme_debug_mode() . '" data-session="' .
      ($remote_user ? '1' : '0') . '" data-script-name="' . ($module ? "/$module/" : get_env('script_name')) .
      '"' . ($skip ? '' : ' data-background-style="' . (theme_night_mode() ? 'nightRider' : 'gainsboro') . '"') .
      '' . ($skip ? '' : ' data-night-mode="' . theme_night_mode() . '"') . ' data-high-contrast="' .
      ($theme_config{'settings_contrast_mode'} eq 'true'              ? '1' : '0') . '" data-navigation-collapsed="' .
      ($theme_config{'settings_navigation_always_collapse'} eq 'true' ? '1' : '0') . '" data-slider-fixed="' .
      ($theme_config{'settings_side_slider_fixed'} eq "true" && $get_user_level eq '0' ? '1' : '0') .
      '" data-sestatus="' . is_selinux_enabled() . '" data-shell="' .
      foreign_available("shell") . '" data-webmin="' . foreign_available("webmin") . '" data-usermin="' . $has_usermin .
      '" data-navigation="' . ($args[3] eq '1' ? '0' : '1') . '" data-status="' . foreign_available("system-status") .
      '" data-package-updates="' . foreign_available("package-updates") . '" data-csf="' . foreign_available("csf") . '"' .
      ($skip ? '' : ' data-theme="' . (theme_night_mode() ? 'gunmetal' : $theme_config{'settings_navigation_color'}) . '"')
      . '' . ($skip ? '' : ' data-default-theme="' . $theme_config{'settings_navigation_color'} . '"') .
      ' data-theme-version="' . theme_version(0) . '" data-theme-mversion="' .
      theme_version(0, 1) . '"  data-level="' . $get_user_level . '" data-user-home="' . get_user_home() .
      '" data-user-id="' . get_user_id() . '" data-user="' . $remote_user . '" data-dashboard="' . dashboard_switch() .
      '" data-ltr="' . get_text_ltr() . '" data-language="' . get_current_user_language() . '" data-language-full="' .
      get_current_user_language(1) . '" data-charset="' . get_charset() . '" data-notice="' . theme_post_update() .
      '" data-redirect="' . get_theme_temp_data('redirected') . '" data-initial-wizard="' . get_initial_wizard() .
      '" data-webprefix="' . $global_prefix . '" data-current-product="' . get_product_name() . '" data-module="' .
      ($module ? "$module" : get_module_name()) . '" data-uri="' . ($module ? "/$module/" : get_env('request_uri')) .
      '" data-progress="' . ($theme_config{'settings_hide_top_loader'} ne 'true' ? '1' : '0') .
      '" data-product="' . get_product_name() . '" data-access-level="' . $get_user_level . '"';
}

sub header_body_data
{
    my ($module) = @_;
    return 'data-uri="' . ($module ? "/$module/" : get_env('request_uri')) . '"'
      .
      ( (get_module_name() || $module) ?
          ' class="' .
          ($module ? $module : get_module_name()) . '" data-module="' . ($module ? $module : get_module_name()) . '"' :
          undef
      ) .
      '' .
      (get_env('request_uri') =~ /\/config.cgi\?/ ? ' id="configCGI"' : '') . '';
}

sub get_version
{
    my ($version) = @_;
    return $version =~ /([0-9]+[.][0-9]+)/;
}

sub get_version_range
{
    my ($start, $end, $step) = @_;
    $step ||= 1;
    return map {sprintf("%.2f", $_ * $step)} (sprintf("%.2f", $start / $step) .. sprintf("%.2f", $end / $step));

}

sub get_version_link
{
    my ($version, $type) = @_;

    if ($version =~ /\.\.\./) {
        ($version) = $version =~ /([0-9]+[.][0-9]+\.\.\.[0-9]+[.][0-9]+)/;
        my $links_start = '<div class="pull-right versionSeparatorContainer">';
        my $links_end   = '</div>';
        my @versions    = split(/\.\.\./, $version);

        if ($type eq '1' || $type eq '2') {
            return "$links_start <span class=\"versionSeparator\">$version</span> $links_end";
        }

        @versions = get_version_range($versions[0], $versions[1], 0.01);
        foreach my $version (@versions) {
            $links_start .= get_version_link($version) . " ";
        }
        $links_start .= $links_end;
        return $links_start;
    }

    if ($type eq '2') {
        return "<span class=\"versionSeparator\">" . get_version_full($version, 1) . "</span>";
    } else {
        return '<a href="https://github.com/authentic-theme/authentic-theme/releases/tag/' .
          get_version_full($version) . '" class="versionSeparator">' . get_version_full($version, 1) . '</a>';
    }

}

sub get_version_full
{
    my ($version, $beta) = @_;
    ($version) = $version =~ /([0-9]+[.][0-9]+(?:.\d+|-alpha[\d]+|-beta[\d]+|-RC[\d]+|))/;

    if ($version =~ /beta/ && $beta) {
        return undef;
    }

    return $version;
}

sub get_env
{
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub set_theme_temp_data
{
    my ($key, $value) = @_;
    my $salt = substr(encode_base64($main::session_id), 0, 16);
    my %var;

    $salt =~ tr/A-Za-z0-9//cd;
    $key =~ tr/A-Za-z0-9//cd;

    $value =~ s/[?|&]$xnav//g;
    $value =~ s/[?|&]randomized=[\d]+//g;
    $value =~ s/.cgi&/.cgi?/g;
    $value =~ s/[^\p{L}\p{N},;:.%&#=_@\+\?\-\/]//g;

    $var{$key} = $value;

    write_file(tempname('.theme_' . $salt . '_' . get_product_name() . '_' . $key . '_' . $remote_user), \%var);
}

sub get_theme_temp_data
{
    my ($key, $keep) = @_;
    my $salt = substr(encode_base64($main::session_id), 0, 16);

    $salt =~ tr/A-Za-z0-9//cd;

    my $tmp_file = tempname('.theme_' . $salt . '_' . get_product_name() . '_' . $key . '_' . $remote_user);

    # Process multiple goto requests
    if ($key eq 'goto') {
        my (%theme_goto_temp);
        my $tmp_dir = tempname_dir();
        my @gotos;
        opendir(my $dir, $tmp_dir) || die "Can't open temporary directory $tmp_dir: $!";
        @gotos = grep {/^\.theme/ && $_ =~ /goto/ && -f "$tmp_dir/$_"} readdir($dir);
        closedir $dir;
        foreach (@gotos) {
            read_file("$tmp_dir/$_", \%theme_goto_temp);
            my $url_hex = substr(unpack("H*", $theme_goto_temp{'goto'}), -180);
            $tmp_file =
              tempname('.theme_' . $salt . '_' . $url_hex . '_' . get_product_name() . '_' . $key . '_' . $remote_user);
        }
    }

    read_file($tmp_file, \%theme_temp_data);
    if (!$keep) {
        unlink_file($tmp_file);
    }

    my $data = $theme_temp_data{$key};
    $data =~ s/[?|&]$xnav//g;
    $data =~ s/[?|&]randomized=[\d]+//g;
    $data =~ s/.cgi&/.cgi?/g;

    return $data;
}

sub parse_servers_path
{
    my ($parent) = $ENV{'HTTP_WEBMIN_PATH'};

    if ($parent) {
        my ($parent_link)   = $parent =~ /(\S*link\.cgi\/[\d]{8,16})/;
        my ($parent_prefix) = $parent_link =~ /(\/servers\/link.cgi\S*)/;
        return ($parent_link, $parent_prefix);
    } else {
        return (undef, undef);
    }
}

sub get_user_home
{
    if (!supports_users()) {
        return undef;
    }
    my @my_user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
    return $my_user_info[7];
}

sub get_user_id
{
    if (!supports_users()) {
        return undef;
    }
    my @my_user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
    return $my_user_info[2];
}

sub get_tuconfig_file
{
    my $tuconfig = $config_directory . "/$current_theme/settings-" . $remote_user;
    return $tuconfig;
}

sub get_stripped
{
    if (get_env('request_uri') =~ /stripped=1/ || get_env('http_x_pjax') eq 'true') {
        return 1;
    } else {
        return 0;
    }
}

sub get_raw
{
    if (get_env('request_uri') =~ /stripped=1&stripped=2/ ||
        get_module_name() eq "file" ||
        get_env('http_progressive_output') eq 'progressive')
    {
        return 1;
    } else {
        return 0;
    }
}

sub get_link
{
    my ($string, $type) = @_;
    my $url;

    if ($type eq 'ugly') {
        $string =~ /<a.*href=([\s\S]+?)>/;
        $url = $1;
    } elsif ($type eq 'bad') {
        $string =~ /<a.*href='([\s\S]+?)'.*>/;
        $url = $1;
    } else {
        $string =~ /<a.*href="([\s\S]+?)".*>/;
        $url = $1;
    }
    $string =~ /<a.*href.*>([\s\S]+?)<\/a>/;

    return [$url, $1];

}

1;
