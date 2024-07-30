#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

our (@theme_bundle_css,
     @theme_bundle_js,
     %module_text_full,
     %theme_config,
     %theme_text,
     %theme_temp_data,
     $get_user_level,
     $theme_webprefix,
     $theme_server_webprefix,
     $has_cloudmin,
     $has_usermin_conf_dir,
     $has_usermin_root_dir,
     $has_usermin_version,
     $has_usermin,
     $has_virtualmin,
     $http_x_url,
     $server_x_goto,
     $xnav,
     %config,
     %gaccess,
     %gconfig,
     %in,
     %tconfig,
     %text,
     $config_directory,
     $current_lang,
     $current_theme,
     $remote_user,
     $root_directory,
     $theme_root_directory,
     $title);

do($ENV{'THEME_ROOT'} . "/authentic-funcs.pl");
init_prefail();
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

sub get_theme_color
{
    # Chrome application header color should be darker than the theme color
    my %theme_colors = ('blue'   => '#003374', # '#004090',
                        'teal'   => '#024048', # '#034f58',
                        'green'  => '#1a5936', # '#285332',
                        'purple' => '#3a2b3f', # '#533e71',
                        'brown'  => '#423328', # '#594739',
                        'gold'   => '#624b33', # '#74573a',
                        'orange' => '#724e2d', # '#885c34',
                        'red'    => '#752323', # '#9a3531',
                        'maroon' => '#772543', # '#862b4c',
                        'grey'   => '#313533', # '#3b3e41',
                        'white'  => '#eeeeee');# '#ffffff'

    my $color = $theme_config{'settings_navigation_color'};
    return $theme_colors{$color};
}

sub embed_favicon
{
    my ($is_login_page) = @_;

    return if ($theme_config{"settings_embed_favicon_privileged"} eq 'false');

    my $product      = get_product_name() eq 'usermin' ? 'usermin' : 'webmin';
    my $product_name = $product;
    if ($get_user_level eq '1' || $get_user_level eq '2') {
        $product_name = 'virtualmin';
    }
    if ($get_user_level eq '4') {
        $product_name = 'cloudmin';
    }

    my $theme_config_dir = "$config_directory/$current_theme";
    my $theme_user_color = get_theme_color() || "#004090";

    my $favicon_path = $theme_webprefix . '/images/favicons/' . $product_name;
    my $ref_link     = 'data-link-ref';

    my $favicon_dpath = "$root_directory/$current_theme/images/favicons/$product_name";
    my $favicon_cpath = "$theme_config_dir/favicons/$product_name";
    my $favicon_spath = -r $favicon_cpath ? $favicon_cpath : $favicon_dpath;

    # Embed standard favicons using a direct link
    if (!-r $favicon_cpath) {
        print ' <link ' .
          $ref_link .
          ' rel="apple-touch-icon" sizes="180x180" href="' .
          $favicon_path .
          '/apple-touch-icon.png">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="32x32" href="' .
          $favicon_path .
          '/favicon-32x32.png">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="192x192" href="' .
          $favicon_path .
          '/android-chrome-192x192.png">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="16x16" href="' .
          $favicon_path .
          '/favicon-16x16.png">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="mask-icon" href="' .
          $favicon_path .
          '/safari-pinned-tab.svg" color="' .
          $theme_user_color .
          '">' . "\n";
        print ' <meta ' .
          $ref_link .
          ' name="msapplication-TileImage" content="' .
          $favicon_path .
          '/mstile-150x150.png">' . "\n";
    }

    # Embed custom favicons using base64 encoding
    else {
        print ' <link ' .
          $ref_link .
          ' rel="apple-touch-icon" sizes="180x180" href="data:text/css;base64,' .
          trim_lines(trim(encode_base64(read_file_contents($favicon_spath . '/apple-touch-icon.png')))) .
          '">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="32x32" href="data:text/css;base64,' .
          trim_lines(trim(encode_base64(read_file_contents($favicon_spath . '/favicon-32x32.png')))) .
          '">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="192x192" href="data:text/css;base64,' .
          trim_lines(trim(encode_base64(read_file_contents($favicon_spath . '/android-chrome-192x192.png')))) .
          '">' . "\n";
        print ' <link ' .
          $ref_link .
          ' rel="icon" type="image/png" sizes="16x16" href="data:text/css;base64,' .
          trim_lines(trim(encode_base64(read_file_contents($favicon_spath . '/favicon-16x16.png')))) .
          '">' . "\n";
    }
    print ' <meta name="msapplication-TileColor" content="' . $theme_user_color . '">' . "\n";
    print ' <meta name="theme-color" content="' . $theme_user_color . '">' . "\n";

    # Generate manifest file from template
    my $display_hostname         = get_display_hostname();
    my $manifest_product_name_uc = ucfirst($product_name);
    my $manifest_product_name_uc_with_hostname =
        $manifest_product_name_uc . ($display_hostname ? " on " . $display_hostname : "");
    my %manifest_prod_descs = ('webmin'     => 'Powerful and flexible web-based server management control panel',
                                'usermin'    => 'Powerful and flexible web-based user management interface',
                                'virtualmin' => 'Powerful and flexible web hosting control panel',
                                'cloudmin'   => 'Powerful and flexible cloud computing platform');
    my $manifest_desc     = $manifest_prod_descs{$product_name};
    my $manifest_file     = "$root_directory/$current_theme/manifest.template";
    my $manifest_contents = read_file_contents($manifest_file);
    $manifest_contents =~ s/\%name\%/$manifest_product_name_uc_with_hostname/;
    $manifest_contents =~ s/\%name_short\%/$manifest_product_name_uc/;
    $manifest_contents =~ s/\%desc\%/$manifest_desc/;
    $manifest_contents =~ s/\%prod\%/$product_name/g;
    $manifest_contents =~ s/\%color\%/$theme_user_color/;
    eval {
        $main::error_must_die = 1;
        write_file_contents("$theme_config_dir/manifest-$product_name.json", $manifest_contents)
            if (-w $theme_config_dir);
    };

    print ' <script src="' . $theme_webprefix . '/service-worker.js" type="application/javascript" defer></script>' . "\n";
    print ' <link ' .
        $ref_link .
        ' crossorigin="use-credentials" rel="manifest" href="' .
        $theme_webprefix .
        '/manifest-' .
        $product_name .
        '.json">' . "\n";
}

sub embed_header
{
    my (@args) = @_;
    my $charset = defined($main::force_charset) ? $main::force_charset : get_charset();

    print "<!DOCTYPE html>\n";
    print '<html ' . header_html_data(undef, undef, @args) . '>', "\n";
    print '<head>',                                               "\n";
    print ' <meta name="color-scheme" content="only light">',     "\n";
    embed_noscript();
    print ' <meta charset="utf-8">', "\n";
    embed_favicon() if (!http_x_request());
    print ' <title>',
      ( $args[4] ?
          (get_product_name() eq 'usermin' ? $theme_text{'theme_xhred_titles_um'} : $theme_text{'theme_xhred_titles_wm'}) :
          $args[0]
      ),
      '</title>', "\n";

    print ' <meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n" if (!http_x_request());

    ($args[1] && (print($args[1] . "\n")));

    if (http_x_request()) {
        print "</head>\n";
        return;
    }

    # Print default options
    print " <script src=\"$theme_webprefix/unauthenticated/js/defaults.js?" .
      theme_version('timestamped') . "\"></script>\n";

    #
    # Server statuses to JavaScript. Start.
    # This code is only called once upon main page load
    # and requires full page reload to have it re-applied
    my $_sstj = sub {
        my ($var, $sub, $mod, $jsFunc, $perlSubArgs) = @_;
        my $quote_opening    = '"';
        my $quote_closing    = $quote_opening;
        my $quotes_resetting = sub {
            $quote_opening = $quote_closing = '';
        };
        if ($jsFunc) {
            &$quotes_resetting();
        }
        my $rs;
        local $main::error_must_die = 1;
        eval {
            if ($mod && &foreign_available($mod)) {
                &foreign_require($mod);
                $rs = &foreign_call($mod, $sub);
            } elsif (!$mod) {
                $rs = &foreign_call('main', $sub);
            }
            if ($jsFunc) {
                $rs = "$jsFunc($rs)";
            } else {
                if ($rs =~ /^[-+]?([\d]+|[\d]+.[\d]+)$/) {
                    &$quotes_resetting();
                }
                if ($rs =~ /^(true|false|null|undefined)$/) {
                    &$quotes_resetting();
                }
            }
        };
        if (!defined($rs)) {
            $rs = "null";
            &$quotes_resetting();
        }
        if (!length(trim($rs)) && !$quote_opening) {
            $rs = "null";
        }
        return "$var=$quote_opening$rs$quote_closing;";
    };
    print ' <script>';
    print &$_sstj('theme_server_data_available_acls',    'get_acls_status',    'filemin');
    print &$_sstj('theme_server_data_available_selinux', 'get_selinux_status', 'filemin');
    print "</script>\n";

    # Server statuses to JavaScript. End.
    #

    embed_settings();
    embed_tconfig();

    # Print object with language strings
    print ' <script>';
    print 'var v___theme_language = ' . get_theme_language();
    print "</script>\n";

    if ($args[2]) {
        do($ENV{'THEME_ROOT'} . "/dependencies.pl");
    }

    if ($args[3] eq '1') {

        if ($args[2]) {
            foreach my $css (@theme_bundle_css) {
                print ' <link href="' .
                  $theme_webprefix .
                  '/unauthenticated/css/' .
                  $css .
                  '.src.css?' .
                  theme_version('timestamped') .
                  '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {
            embed_css_bundle();
        }

        embed_css_night_rider();

        embed_background();
        embed_styles();

        if ($args[2]) {
            foreach my $js (@theme_bundle_js) {
                if (sysstats_available() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print ' <script src="' .
                  $theme_webprefix .
                  '/unauthenticated/js/' .
                  $js .
                  '.src.js?' .
                  theme_version('timestamped') .
                  '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }
    } else {
        if ($args[2]) {
            foreach my $css (@theme_bundle_css) {
                print ' <link href="' .
                  $theme_webprefix .
                  '/unauthenticated/css/' .
                  $css .
                  '.src.css?' .
                  theme_version('timestamped') .
                  '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {
            embed_css_bundle();
        }

        embed_css_night_rider();

        if ((length $theme_config{'settings_navigation_color'} && $theme_config{'settings_navigation_color'} ne 'blue') ||
            theme_night_mode())
        {
            print ' <link href="' .
              $theme_webprefix .
              '/unauthenticated/css/palettes/' .
              (theme_night_mode() ? 'gunmetal' : lc($theme_config{'settings_navigation_color'})) . '.' .
              ($args[2]           ? 'src'      : 'min') . '.css?' .
              theme_version('timestamped') .
              '" rel="stylesheet" data-palette>' . "\n";

        }

        embed_background();
        embed_styles();

        if ($args[2]) {
            foreach my $js (@theme_bundle_js) {

                if (sysstats_available() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print ' <script src="' .
                  $theme_webprefix .
                  '/unauthenticated/js/' .
                  $js .
                  '.src.js?' .
                  theme_version('timestamped') .
                  '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }

    }
    embed_js_scripts();

    # Head theme overlay
    embed_overlay_head();
    
    # Embed theme switcher
    print &ui_switch_theme_javascript()
        if (defined(&ui_switch_theme_javascript));
    
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

    my $admin_def_config_file = get_taconfig_file();
    my $global_config_file    = get_tgconfig_file();
    my $user_config_file      = get_tuconfig_file();

    # Embed admin defaults
    if (-r $admin_def_config_file) {
        $admin_def_config_file = read_file_contents($admin_def_config_file);
        $admin_def_config_file =~ tr/\r\n/;/d;
        $admin_def_config_file =~ s/\s*(.*?=)'([\d\.]+)'(;)\s*/$1$2$3/g;
        print ' <script>' . $admin_def_config_file . '</script>' . "\n";
    }

    # Embed global configuration
    if (-r $global_config_file) {
        $global_config_file = read_file_contents($global_config_file);
        $global_config_file =~ tr/\r\n/;/d;
        $global_config_file =~ s/\s*(.*?=)'([\d\.]+)'(;)\s*/$1$2$3/g;
        print ' <script>' . $global_config_file . '</script>' . "\n";
    }

    # Embed user configuration
    if (-r $user_config_file) {
        $user_config_file = read_file_contents($user_config_file);
        $user_config_file =~ tr/\r\n/;/d;
        $user_config_file =~ s/\s*(.*?=)'([\d\.]+)'(;)\s*/$1$2$3/g;
        print ' <script>' . $user_config_file . '</script>' . "\n";
    }
}

sub embed_tconfig
{
    print ' <script>tconfig_beta_updates=' . ($tconfig{'beta_updates'} ne '1' ? 0 : 1) . '</script>' . "\n";
}

sub embed_styles
{
    if ($theme_config{'settings_contrast_mode'} eq 'true') {
        print ' <link href="' .
          $theme_webprefix .
          '/unauthenticated/css/high-contrast.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' .
          time() .
          '" rel="stylesheet" data-high-contrast>' . "\n";
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
    my $scripts = "$config_directory/$current_theme/scripts.pl";
    if (-r $scripts && -s $scripts) {
        do($scripts);
    }
}

sub embed_css_fonts
{
    my ($return) = @_;
    my $font_link = ' <link href="' .
      $theme_webprefix .
      '/unauthenticated/css/fonts-roboto.' .
      (theme_debug_mode() ? 'src' : 'min') . '.css?' .
      theme_version('timestamped') .
      '" rel="stylesheet">' . "\n";
    if ($return) {
        return $font_link;
    } else {
        print $font_link;
    }
}

sub embed_css_bundle
{
    print ' <link href="' .
      $theme_webprefix .
      '/unauthenticated/css/bundle.min.css?' .
      theme_version('timestamped') .
      '" rel="stylesheet">' . "\n";
    embed_css_fonts();
}

sub embed_css_night_rider
{
    if (theme_night_mode_login() || theme_night_mode()) {
        print ' <link href="' .
          $theme_webprefix .
          '/unauthenticated/css/palettes/nightrider.' .
          (theme_debug_mode() ? 'src' : 'min') . '.css?' .
          theme_version('timestamped') .
          '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_js_bundle
{
    print ' <script src="' .
      $theme_webprefix .
      '/unauthenticated/js/bundle.min.js?' .
      theme_version('timestamped') .
      '"></script>' . "\n";
}

sub embed_js_scripts
{

    return if (http_x_request());

    my $js = $config_directory . "/$current_theme/scripts.js";
    if (-r $js && -s $js) {
        $js = read_file_contents($js);
        print ' <script data-custom-script>' . $js . '</script>' . "\n";
    }
}

sub embed_noscript
{
    return if (http_x_request());
    my $noscript = <<EOF;
      <noscript>
      <style>
        html[data-bgs="gainsboro"]
        {
          background-color: #d6d6d6;
        }
        html[data-bgs="nightRider"]
        {
          background-color: #1a1c20;
        }
        html[data-bgs="nightRider"] div[data-noscript]
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

sub get_css_inline
{
    my ($target) = @_;
    if ($target eq 'calendar') {
        return <<CALENDAR;
.calendar-table .calendar-cell,
.calendar-table .calendar-cell strong,
.calendar-table strong {
  font-weight: 500;
}
.calendar-details .detail strong {
  opacity: 0.97;
}
CALENDAR
        }
}

sub embed_port_shell
{
    if (!@_ &&
        get_env('script_name') ne '/session_login.cgi' &&
        get_env('script_name') ne '/pam_login.cgi'     &&
        get_env('script_name') ne '/401.cgi'           &&
        get_env('script_name') ne '/403.cgi'           &&
        get_env('script_name') ne '/404.cgi')
    {
        my $prefix;
        my $hostname = ($prefix) = split(/\./, get_display_hostname());
        my $host     = ($prefix ? $prefix : get_display_hostname());
        my $xterm    = foreign_available('xterm') ? ' hidden' : '';
        print '<div data-autocomplete="' . (has_command('bash') ? 1 : 0) . '" class="-shell-port-">
  <div class="-shell-port-container">
    <div aria-label="' . $theme_text{'theme_xhred_global_close'} . '" class="-shell-port-close"></div>
    <div data-output="true"><pre data-xconsole></pre></div>
    <div class="-shell-port-cmd' . $xterm . '">
      <span class="-shell-port-prompt"><span class="-shell-port-type">['
          . $remote_user .
          '@<span data-shell-host="' .
          $host . '">' .
          $host .
          '</span> <span class="-shell-port-pwd" data-home="' .
          get_user_home() .
          '" data-pwd="' .
          get_user_home() .
          '">~</span>]' .
          (&webmin_user_is_admin() ? '#' : '$') .
'</span></span><input type="text" data-command="true" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"><span class="-shell-port-cursor">&nbsp;</span>
    </div>
  </div>
</div>', "\n";
    }
}

sub embed_footer
{
    my (@args) = @_;
    if (get_env('script_name') !~ /session_login.cgi/ &&
        get_env('script_name') !~ /pam_login.cgi/     &&
        get_env('script_name') !~ /password_form.cgi/ &&
        get_env('script_name') !~ /password_change.cgi/)
    {

        # Load `MySQL/PostgreSQL` specific scripts
        if (get_module_name() =~ /mysql/ ||
            get_module_name() =~ /postgresql/)
        {
            print ' <script src="' .
              $theme_webprefix .
              '/extensions/sql.' .
              ($args[0] ? 'src' : 'min') . '.js?' .
              theme_version('timestamped') .
              '"></script>' . "\n";
        }

        # Load `File Manager` specific scripts
        if (get_module_name() =~ /file-manager/ ||
            get_module_name() =~ /filemin/)
        {
            print ' <script src="' .
              $theme_webprefix .
              '/extensions/file-manager/file-manager.' .
              ($args[0] ? 'src' : 'min') . '.js?' .
              theme_version('timestamped') .
              '"></script>' . "\n";
        }

    }
}

sub sysstats_available
{
    return ($http_x_url !~ /\/virtual-server\/pro\/history\.cgi/ &&
            $http_x_url !~ /\/server-manager\/bwgraph\.cgi/ &&
            $http_x_url !~ /\/server-manager\/history\.cgi/ &&
            $http_x_url !~ /\/server-manager\/one_history\.cgi/) ?
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
        do("$root_directory/$current_theme/.debug.pl");
    }

    our %theme_config = (settings(get_tdconfig_file()),
                         settings(get_taconfig_file()),
                         settings(get_tgconfig_file(), "settings_"),
                         settings(get_tuconfig_file(), "settings_"));
    our $http_x_url =
      (get_env('http_x_pjax_url') || get_env('http_x_progressive_url'));

    # Load theme language
    our %theme_text = (load_language($current_theme), %text);

    # Load other modules language strings conditionally
    if (!http_x_request() ||
        ($http_x_url =~ /sysinfo\.cgi/ || grep {/xhr-info/} keys %in))
    {
        my @text_mods = ("virtual-server", "server-manager");
        foreach my $mod (@text_mods) {
            if (foreign_available($mod)) {
                %theme_text = (load_language($mod), %theme_text);
            }
        }
    }

    our ($get_user_level, $has_virtualmin, $has_cloudmin) = get_user_level();
    our ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir, $has_usermin_var_dir) =
      get_usermin_vars();

    # Set webprefix that should be used by the theme
    our ($theme_webprefix, $theme_server_webprefix) = theme_get_webprefix_local('array');

    our $xnav = "xnavigation=1";

    our %gaccess = &get_module_acl();
    our $title   = &get_html_framed_title();
    our %cookies = get_cookies();

    my $server_x_goto_ = get_theme_temp_data('goto');
    if ($server_x_goto_) {
        $server_x_goto = $server_x_goto_;
        setvar('theme-goto', $server_x_goto);
    }

}

sub check_pro_package
{
    my ($id) = @_;
    if (&foreign_available("virtual-server") && $id eq "vm") {
        &foreign_require("virtual-server");
        return $virtual_server::virtualmin_pro ? 1 : 0;
    } elsif (&foreign_available("server-manager") && $id eq "cm") {
        my %cloudmin = &get_module_info("server-manager");
        if ($cloudmin{'version'} =~ /pro/is || $cloudmin{'version'} =~ /real/is) {
            return 1;
        } elsif ($cloudmin{'version'} =~ /\..*?\./is) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 0;
    }
}

sub get_usermin_vars
{
    my ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir, $has_usermin_var_dir);
    eval {
        my %uminiserv;

        # Load miniserv config based on login mode
        if (get_product_name() eq 'usermin') {
            get_miniserv_config(\%uminiserv);
        } elsif (&foreign_exists("usermin")) {
            &foreign_require("usermin");
            &usermin::get_usermin_miniserv_config(\%uminiserv);
        }
        if (%uminiserv) {

            # Usermin config dir
            $has_usermin_conf_dir = $uminiserv{'env_WEBMIN_CONFIG'};

            # Usermin var dir
            $has_usermin_var_dir = $uminiserv{'env_WEBMIN_VAR'};

            # Usermin root dir
            $has_usermin_root_dir = $uminiserv{'root'};

            # Usermin minor version
            my $get_usermin_version_release = sub {
                my $usermin_version_release = read_file_contents("$has_usermin_root_dir/release") || "";
                $usermin_version_release =~ s/\r|\n//g;
                return $usermin_version_release > 1 ? $usermin_version_release : undef;
            };

            # Usermin version
            $has_usermin_version = $uminiserv{'server'};
            $has_usermin_version =~ /\/([\d\.]+)/;
            $has_usermin_version = "$1";

            if ($has_usermin_version) {
                my $has_usermin_version_release = &$get_usermin_version_release;
                $has_usermin_version .= "-" . $has_usermin_version_release
                  if ($has_usermin_version_release);
            }

            # Usermin installed
            $has_usermin = -r $has_usermin_root_dir;

            # Usermin Authentic Theme config dir exists
            my $theme_conf_usermin = "$has_usermin_conf_dir/$current_theme";
            if ($has_usermin &&
                $has_usermin_conf_dir &&
                !-d $theme_conf_usermin)
            {
                mkdir($theme_conf_usermin, 0755);
            }
        }
    };
    return ($has_usermin, $has_usermin_version, $has_usermin_root_dir, $has_usermin_conf_dir, $has_usermin_var_dir);
}

sub get_current_user_locale
{
    my $language = $gconfig{ 'locale_' . $remote_user } ||
      &parse_accepted_language(\%gconfig)               ||
      $gconfig{'locale'}                                ||
      &get_default_system_locale();

    $language =~ s/\..*//;
    $language =~ s/_/-/;
    return $language;
}

sub get_current_user_language
{
    my $language = $gconfig{ 'lang_' . $remote_user } ||
      &parse_accepted_language(\%gconfig)             ||
      $gconfig{'lang'}                                ||
      &get_default_system_locale();
    return lc(substr($language, 0, 2));
}

sub get_filters
{
    return 'filter: grayscale(' .
      $theme_config{'settings_grayscale_level_navigation'} . ') ' .
      'sepia(' .
      $theme_config{'settings_sepia_level_navigation'} . ')' .
      ' saturate(' .
      $theme_config{'settings_saturation_level_navigation'} .
      ') hue-rotate(' .
      $theme_config{'settings_hue_level_navigation'} . 'deg)' .
      ' invert(' .
      $theme_config{'settings_invert_level_navigation'} .
      ') brightness(' .
      $theme_config{'settings_brightness_level_navigation'} .
      ') contrast(' .
      $theme_config{'settings_contrast_level_navigation'} .
      ')' . ';';
}

sub get_user_icon
{
    my $user_icon = 'fa2-user-cog';
    if ($get_user_level eq '1') {
        $user_icon = 'fa2-user-plus';
    } elsif ($get_user_level eq '2') {
        $user_icon = 'fa2-user-check';
    } elsif ($get_user_level eq '3') {
        $user_icon = 'fa2-user';
    } elsif ($get_user_level eq '4') {
        $user_icon = 'fa2-user-friends';
    }
    return $user_icon;
}

sub switch_to_remote_user_safe
{
    if (!&webmin_user_is_admin() && $get_user_level ne '1') {
        switch_to_remote_user();
    }
}

sub get_initial_wizard
{
    # Prevent running Virtualmin post installation wizard
    my $mod_vm = 'virtual-server';
    if (&webmin_user_is_admin() && foreign_exists($mod_vm)) {
        my %virtualmin_config = foreign_config($mod_vm);
        return $virtualmin_config{'wizard_run'};
    }
    return 1;
}

sub get_button_style
{

    my $label = quote_escape(@_);

    my %module_text = module_text_full();
    my ($keys) = grep {$module_text{$_} eq $label} keys %module_text;
    if (!$keys) {
        my %text_replaced = &text();
        $keys = $text_replaced{$label};
    }
    my $icon;
    my $class = "default";

    if (string_contains($keys, 'mail_fchange')) {
        $class = "default";
    } elsif (string_contains($keys, 'sform_ok')) {
        $icon  = "search";
        $class = "info";
    } elsif (string_contains($keys, 'edit_createnow') || string_contains($keys, 'edit_savenow')) {
        $icon = "backup fa-1_25x";
    } elsif (string_contains($keys, "pass_ok")) {
        $icon  = " fa2 fa2-key";
        $class = "warning ";
    } elsif (string_ends_with($keys, "_gnupg") ||
             string_contains($keys, 'secret_setup') ||
             string_contains($keys, 'ssl_gen')      ||
             string_contains($keys, 'index_sok2'))
    {
        $icon  = " fa2 fa2-key";
        $class = "success ";
        if (string_contains($keys, 'ssl_gen')) {
            $class = "grey ";
        }
    } elsif (string_contains($keys, "user_createover")) {
        $class = "warning ";
        $icon  = "user-switch fa-1_10x";
    } elsif (string_contains($keys, "check_updatenow")) {
        $class = "warning ";
        $icon  = "refresh";
    } elsif (string_contains($keys, "newips")) {
        $icon = "pencil-square-o";
    } elsif (string_contains($keys, "form_edit")) {
        $icon  = "pencil-square-o";
        $class = "success ";
    } elsif (string_contains($keys, "fdelete_delete") ||
             string_contains($keys, "lock_term") ||
             string_contains($keys, "delete_ok")) {
        $class = "danger ";
        $icon  = "times-circle";
    } elsif (string_contains($keys, "lock_kill"))
    {
        $class = "warning ";
        $icon  = "stop";
    } elsif (string_contains($keys, "mail_delete")) {
        $icon  = "times-circle";
        $class = "danger ";
    } elsif (string_contains($keys, "mail_forward")) {
        $icon = "forward";
    } elsif (string_contains($keys, "view_quick_all")) {
        $icon = "reply-all";
    } elsif (string_contains($keys, "view_reply")) {
        $icon  = "reply";
        $class = "info ";
    } elsif (string_contains($keys, "mail_compose")) {
        $icon  = "plus";
        $class = "success ";
    } elsif (string_contains($keys, "view_razor")) {
        $icon  = "spam";
        $class = "warning ";
    } elsif (string_contains($keys, "reply_save")) {
        $icon  = "pencil-square-o";
        $class = "info ";
    } elsif (string_contains($keys, "docker_reg")) {
        $class = "success ";
        $icon  = "server-add";
    } elsif (string_contains($keys, "login_enable")) {
        $class = "success ";
        $icon  = " fa-1_15x fa2 fa2-account-key";
    } elsif (string_contains($keys, "login_disable")) {
        $class = "warning ";
        $icon  = " fa-1_15x fa2 fa2-key-minus";
    } elsif (string_contains($keys, "rmfeatures")) {
        $icon  = "question-circle";
        $class = "warning ";
    } elsif (string_contains($keys, "newmxs_saveadd")) {
        $icon  = "toggle-switch  fa-1_25x";
        $class = "warning ";
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
    } elsif (string_contains($keys, "cluster")) {
        $icon = " fa2 fa2-server-network";
    } elsif (string_contains($keys, "unapply")) {
        $class = "info ";
        $icon  = "circle-o-notch";
    } elsif (string_contains($keys, "ifaces_apply")) {
        $class = "transparent-force ";
        $icon  = "toggle-switch  fa-1_05x";
    } elsif (string_contains($keys, "apply")) {
        $class = "info ";
        $icon  = "check-circle-o";
    } elsif (string_contains($keys, "migrate_show") ||
             string_contains($keys, "import_show") ||
             string_contains($keys, "keys_import"))
    {
        $class = "success ";
        $icon  = " fa2 fa2-import";
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
    } elsif (string_contains($keys, "disable_ok") || string_contains($keys, "jail_block")) {
        $class = "warning ";
        $icon  = "lock";
    } elsif (string_contains($keys, "scripts_kit") && string_contains($keys, "_login")) {
        $class = "success ";
        $icon  = "unlock fa-1_05x";
    } elsif (string_contains($keys, "enable_ok") || string_contains($keys, "jail_unblock")) {
        $class = "success ";
        $icon  = "unlock";
    } elsif (string_contains($keys, "twofactor_enable")) {
        $class = "info ";
        $icon  = "lock";
    } elsif (string_contains($keys, "blockip")) {
        $class = "grey ";
        $icon  = " fa2 fa2-not-interested fa-1_10x margined-left--2";
    } elsif (string_contains($keys, "twofactor_disable")) {
        $class = "warning ";
        $icon  = "unlock";
    } elsif (string_contains($keys, "zonekey")) {
        if ($keys eq "zonekey_disable") {
            $class = "danger ";
            $icon  = " fa2 fa2-key-minus fa-1_15x";
        } else {
            $icon = " fa2 fa2-key";
        }
    } elsif (
             (string_contains($keys, "install")     ||
              string_contains($keys, "recsok")      ||
              string_contains($keys, "scripts_iok") ||
              string_contains($keys, "cert_newok") ||
              string_contains($keys, "missing_now") ||
              string_contains($keys, "right_upok")
             ) &&
             !string_contains($keys, "uninstall"))
    {
        $class = "success ";
        $icon  = "package-install fa-1_25x";
    } elsif (string_contains($keys, "user_priv_create_view") ||
             string_contains($keys, "dbase_addview")) {
        $class = "success ";
        $icon = "list";
    } elsif (string_contains($keys, "dbase_add")) {
        $class = "success ";
        $icon  = "database-plus fa-1_25x";
    } elsif (string_contains($keys, "uninstall") ||
             string_contains($keys, "edit_uninst") ||
             string_contains($keys, "scripts_uok") ||
             string_contains($keys, "scripts_utitle") ||
             string_contains($keys, "drecs_ok"))
    {
        $class = "danger ";
        $icon  = "times-circle-o";
    } elsif (string_contains($keys, "cert_remove")) {
        $class = "warning ";
        $icon  = " fa2 fa2-certificate-delete";
    } elsif (string_contains($keys, "cert_copyall2")) {
        $class = "info ";
        $icon  = " fa2 fa2-certificate-global";
    } elsif (string_contains($keys, "newtmpl_setdef") ||
             string_contains($keys, "plans_setdefault")) {
        $icon  = " fa2 fa-0_85x fa2-check-double";
    } elsif (string_contains($keys, "cert_copyall")) {
        $class = "info ";
        $icon  = " fa2 fa2-certificate-add";
    } elsif (string_contains($keys, "notif_upgradeok")) {
        $class = "warning ";
        $icon  = "update";
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
    } elsif (string_contains($keys, "disable_domain")) {
        $class = "success ";
        $icon = "clock";
    } elsif (string_contains($keys, "shutdown")) {
        $icon = "power-off";
    } elsif (string_contains($keys, "index_shut")) {
        $icon  = "power-off";
        $class = "danger ";
    } elsif (string_contains($keys, "index_reboot reboot_title")) {
        $icon  = "refresh-mdi fa-1_25x";
        $class = "warning ";
    } elsif (string_contains($keys, "docker_reg") || string_contains($keys, "wizard_finish")) {
        $icon = "check-circle-o";
    } elsif (string_contains($keys, "goback") ||
             string_contains($keys, "tmpl_nprev") ||
             string_contains($keys, "wizard_prev")) {
        $icon = "arrow-circle-o-left";
    } elsif (string_contains($keys, "tmpl_nnext") ||
             string_contains($keys, "wizard_next") ||
             string_contains($keys, "tmpl_cnext")  ||
             string_contains($keys, "tmpl_snext")  ||
             string_contains($keys, "continue")    ||
             string_contains($keys, "download_cont"))
    {
        $icon = "arrow-circle-o-right";
        if (string_contains($keys, "continue")) {
            $class = "success ";
        }
    } elsif (string_contains($keys, "cancel")) {
        $icon = "times-circle-o";
    } elsif (string_contains($keys, "wizard_end")) {
        $icon = "virtualmin fa-1_05x";
    } elsif (string_contains($keys, "ticket_submit")) {
        $icon = "question-circle";
    } elsif (string_contains($keys, "trace_change")) {
        $icon  = " fa2 fa2-toggle-off  fa-0_90x";
        $class = "warning ";
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
             string_contains($keys, "view_refresh")  ||
             string_contains($keys, "refresh_title") ||
             string_contains($keys, "refreshmods")   ||
             string_contains($keys, "index_buttinit"))
    {
        if (string_contains($keys, "refresh_title")) {
            $class = "success ";
        } elsif (string_contains($keys, "refreshmods")) {
            $class = "primary ";
        } elsif (!string_contains($keys, "reboot_ok") && !string_contains($keys, "index_reboot") ||
                 string_contains($keys, "index_buttinit"))
        {
            $class = "warning ";
        }

        if (string_contains($keys, "view_refresh")) {
            $icon = "refresh-fi  fa-1_25x";
        } else {
            $icon = "refresh-mdi fa-1_25x";
        }
    } elsif ($keys eq "view_filter_btn") {
        $icon = "filter fa-1_10x";
        $class = "info";
    } elsif (string_contains($keys, "search") ||
             string_contains($keys, "index_broad")    ||
             string_contains($keys, "scripts_findok") ||
             string_contains($keys, "kill_title"))
    {
        $class = "info ";
        $icon  = "search";
    } elsif (string_contains($keys, "dmass_move") ||
             string_contains($keys, "domains_move") ||
             string_contains($keys, "databases_remoteok"))
    {
        $class = "warning ";
        $icon  = " fa2 fa2-transfer";
    } elsif (string_contains($keys, "restart") ||
             string_contains($keys, "edit_kill") ||
             string_contains($keys, "licence_recheck"))
    {
        $class = "warning ";
        $icon  = "refresh";
    } elsif (string_contains($keys, "scripts_ureload")) {
        $icon  = "refresh";
    } elsif (string_contains($keys, "ddrop_empty")) {
        $class = "warning ";
        $icon  = "times-circle-o";
    } elsif (string_contains($keys, "start") ||
             string_contains($keys, "index_run") ||
             string_contains($keys, "edit_run")  ||
             string_contains($keys, "form_exec"))
    {
        $class = "success ";
        $icon  = "play";
    } elsif (string_contains($keys, "index_stop") ||
             string_contains($keys, "running_stop") ||
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
             string_contains($keys, "index_reset")    ||
             string_contains($keys, "index_regen")    ||
             string_contains($keys, "index_drefresh") ||
             string_contains($keys, "index_reload"))
    {
        $class = "warning ";
        $icon  = "refresh";
    } elsif (string_contains($keys, "scripts_ustop")) {
        $icon = "stop";
    } elsif (string_contains($keys, "index_script")) {
        $icon = "update";
    } elsif (string_contains($keys, "cron_ok")) {
        $icon  = "check-circle-o";
        $class = "success ";
    } elsif (string_contains($keys, "status")) {
        $icon = "info-circle";
    } elsif (string_contains($keys, "warnok")) {
        $icon  = "check-circle-o";
        $class = "warning ";
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
    } elsif (string_contains($keys, "reply_send")) {
        $icon  = "send";
        $class = "success ";
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
    } elsif (string_contains($keys, "databases_import")) {
        $class = "success ";
        $icon  = "database-plus fa-1_25x";
    } elsif (
         (string_contains($keys, "add") &&
          !string_contains($keys, "edit_addinc")) ||
         string_contains($keys, "create") ||
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
        if (string_contains($keys, "restore_now2")) {
            $class = "success ";
        }
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
    } elsif (string_contains($keys, "index_down") ||
             string_contains($keys, "transfer_downloadok") ||
             string_contains($keys, "index_up")            ||
             string_contains($keys, "download_need"))
    {
        $class = "primary ";
        $icon  = "download";
    } elsif (string_contains($keys, "images_get")) {
        $class = "success ";
        $icon  = "download";
    } elsif (string_contains($keys, "umass_del1") ||
             string_contains($keys, "gdel_del")    ||
             string_contains($keys, "gdel_title")  ||
             string_contains($keys, "drecs_title") ||
             string_contains($keys, "rdmass_ok"))
    {
        $icon = "times-circle-o";
    } elsif (string_contains($keys, "users_dok") ||
             string_contains($keys, "users_delete") ||
             string_contains($keys, "users_dconfirm"))
    {
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
    } elsif (string_contains($keys, "lkeys_sok2") ||
             string_contains($keys, "mail_login"))
    {
        $class = "success ";
        $icon  = "key";
    } elsif (string_contains($keys, "letsencrypt_title") ||
             string_contains($keys, "ssl_copycert"))
    {
        $class = "success ";
        $icon  = " fa2 fa2-certificate-request";
    } elsif (string_contains($keys, "cert_letsonly")) {
        $icon  = " fa2 fa2-certificate-update-time";
        $class = "info ";
    } elsif (string_contains($keys, "index_tree")) {
        $icon = "tree";
    } elsif (string_contains($keys, "listrules")) {
        $icon  = " fa2 fa2-fire";
        $class = "info ";
    }

    if ($icon) {
        $icon = "<i class=\"fa fa-fw fa-$icon\"></i>";
    }

    return ($keys, $class, $icon);
}

sub embed_login_head
{
    my ($inline) = @_;
    my $ext = (theme_debug_mode() ? 'src' : 'min');

    # Define page title
    my $title = $text{'session_header'};

    print '<head>',                                           "\n";
    print ' <meta name="color-scheme" content="only light">', "\n";
    embed_noscript();
    print '<meta charset="utf-8">', "\n";
    embed_favicon('login-page');
    print '<title>', $title, '</title>', "\n";
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";

    if ($inline) {
        my $file_contents = read_file_contents("$root_directory/$current_theme/unauthenticated/css/bundle.min.css");
        print '<style>';
        print $file_contents;
        print '</style>';

        if (theme_night_mode_login()) {
            my $file_contents =
              read_file_contents("$root_directory/$current_theme/unauthenticated/css/palettes/nightrider.min.css");
            print '<style>';
            print $file_contents;
            print '</style>';
        }
        my $file_contents = read_file_contents("$root_directory/$current_theme/unauthenticated/css/fonts-roboto.min.css");
        print '<style>';
        print $file_contents;
        print '</style>';

    } else {
        print '<link href="' . $theme_webprefix .
          '/unauthenticated/css/bundle.min.css?' . theme_version('timestamped') . '" rel="stylesheet">' . "\n";

        print
'<script>document.addEventListener("DOMContentLoaded", function(event) {var a=document.querySelectorAll(\'input[type="password"]\');i=0;
for(length=a.length;i<length;i++){var b=document.createElement("span"),d=30<a[i].offsetHeight?1:0;b.classList.add("input_warning_caps");b.setAttribute("title","Caps Lock");d&&b.classList.add("large");a[i].classList.add("use_input_warning_caps");a[i].parentNode.insertBefore(b,a[i].nextSibling);a[i].addEventListener("blur",function(){this.nextSibling.classList.remove("visible")});a[i].addEventListener("keydown",function(c){"function"===typeof c.getModifierState&&((state=20===c.keyCode?!c.getModifierState("CapsLock"):
c.getModifierState("CapsLock"))?this.nextSibling.classList.add("visible"):this.nextSibling.classList.remove("visible"))})};});function spinner() {var x = document.querySelector(\'button i.fa-sign-in:not(.invisible)\') || document.querySelector(\'button i.fa-qrcode:not(.invisible)\'),s = \'<span class="cspinner_container"><span class="cspinner"><span class="cspinner-icon white small"></span></span></span>\';if(x){x.classList.add("invisible"); x.insertAdjacentHTML(\'afterend\', s);x.parentNode.classList.add("disabled");x.parentNode.disabled=true}}setTimeout(function(){if(navigator&&navigator.oscpu){var t=navigator.oscpu,i=document.querySelector("html"),e="data-platform";t.indexOf("Linux")>-1?i.setAttribute(e,"linux"):t.indexOf("Windows")>-1&&i.setAttribute(e,"windows")}});</script>';

        embed_css_night_rider();
        embed_css_fonts();
    }

    embed_background();
    embed_styles();
    embed_overlay_head();
    if (get_env('script_name') =~ /password_change\.cgi$/) {
        print '<script>';
        print 'document.addEventListener("DOMContentLoaded", function() {';
        my $palette = theme_night_mode_login() ? 'nightRider' : 'gainsboro';
            print 'document.querySelector("html").setAttribute("data-bgs", "' . $palette . '");';
            print 'document.querySelector("body").classList.add("container", "session_login");';
        print '});';
        print '</script>';
    }
    print '</head>', "\n";
}

sub theme_night_mode
{
    if ($theme_config{'settings_force_night_mode'} eq '1') {
        return 1;
    } else {
        return 0;
    }
}

sub theme_night_mode_login
{
    if ($theme_config{'settings_global_palette_unauthenticated'} eq 'dark') {
        return 1;
    } else {
        return 0;
    }
}

sub theme_version
{
    my ($version_type, $nocache) = @_;
    my $tversions = getvar('tversion_cached');

    if (!$tversions || $nocache) {
        my %tinfo    = get_theme_info($current_theme);
        my $version  = $tinfo{'version'};
        my $mversion = $tinfo{'mversion'};
        my $bversion = $tinfo{'bversion'};

        my $is_alpha          = string_contains($version, 'alpha');
        my $is_beta           = string_contains($version, 'beta');
        my $is_rc             = string_contains($version, 'RC');
        my $is_devel_ver      = $is_alpha || $is_beta || $is_rc || theme_debug_mode();
        my ($ver_dot_one)     = $version =~ /\d+\.([\d]+)/;
        my ($ver_dot_two_pre) = $version =~ /\.\d+\.([\d]+)$/;
        my $ver_dot_two       = $ver_dot_two_pre ? $ver_dot_two_pre : 0;
        my $ver_dot_one_str   = (int($ver_dot_one) < 10 ? ("0" + $ver_dot_one) : $ver_dot_one);
        my $ver_dot_two_str   = (int($ver_dot_two) < 10 ? ("0" + $ver_dot_two) : $ver_dot_two);
        my $theme_full_version_str =
          (int($version) . "" . $ver_dot_one_str . "" . $ver_dot_two_str . "" . $mversion . "$bversion");
        my $theme_full_version_with_minor_str =
          ($version . (int($mversion) > 1 ? "-" . int($mversion) : "") . (int($bversion) > 1 ? ":" . int($bversion) : ""));
        $tversions->{'timestamped'} = ($theme_full_version_str . "" . ($is_devel_ver ? time() : '9999999999'));
        $tversions->{'version'}     = $version;
        $tversions->{'versionfull'} = $theme_full_version_with_minor_str;
        setvar('tversion_cached', $tversions);
    }

    if ($version_type) {

        # Return all versions in stringified object
        if ($version_type eq 'json') {
            return convert_to_json($tversions);
        }

        # Return a string
        else {
            return $tversions->{$version_type};
        }
    }

    # Return all versions in hash ref
    else {
        return $tversions;
    }
}

sub theme_debug_mode
{
    my $mode_cache = getvar('theme-debug-mode');
    return $mode_cache if (defined($mode_cache));
    if (-r "$ENV{'THEME_ROOT'}/dependencies.pl") {
        setvar('theme-debug-mode', 1);
        return 1;
    } else {
        setvar('theme-debug-mode', 0);
        return 0;
    }
}

sub theme_post_update
{
    my $update = $root_directory . "/$current_theme/update";

    if (-f $update && &webmin_user_is_admin()) {
        unlink $update;
        return '1';
    } else {
        return '0';
    }
}

sub header_html_data
{
    my ($module, $skip, @args) = @_;
    my $redirect = get_theme_temp_data('redirected');
    $redirect = "" if ($redirect eq "/");
    return 'data-redirect="' . $redirect .

      # ref.: CXX1010000
      '" data-needs-restart="' .
      getvar('needs-restart') .
      '" data-host="' .
      get_env('http_host') .
      '" data-hostname="' .
      get_display_hostname() .
      '" data-title-initial="' .
      format_document_title($args[0]) .
      '" data-debug="' .
      theme_debug_mode() .
      '" data-session="' .
      ($remote_user ? '1' : '0') .
      '" data-session-hash="' .
      (eval { return &miniserv::hash_session_id($main::session_id) }) .
      '" data-script-name="' .
      ($module ? "/$module/" : get_env('script_name')) . '"' .
      ($skip   ? ''          : ' data-bgs="' . (theme_night_mode() ? 'nightRider' : 'gainsboro') . '"') . '' .
      ($skip   ? ''          : ' data-night-mode="' . theme_night_mode() . '"') .
      ' data-high-contrast="' .
      ($theme_config{'settings_contrast_mode'} eq 'true' ? '1' : '0') .
      '" data-navigation-collapsed="' .
      ($theme_config{'settings_navigation_always_collapse'} eq 'true' ? '1' : '0') .
      '" data-slider-fixed="' .
      ($theme_config{'settings_side_slider_fixed'} eq "true" &&
        &webmin_user_is_admin() &&
        $theme_config{'settings_side_slider_enabled'} ne "false" ? '1' : '0') .
      '" data-terminal="' .
      foreign_available("xterm") .
      '" data-shell="' .
      foreign_available("shell") .
      '" data-webmin="' .
      foreign_available("webmin") .
      '" data-usermin="' .
      $has_usermin .
      '" data-navigation="' .
      ($args[3] eq '1' ? '0' : '1') .
      '" data-status="' .
      foreign_available("system-status") .
      '" data-package-updates="' .
      foreign_available("package-updates") .
      '" data-csf="' .
      foreign_available("csf") . '"' .
      ($skip ? '' : ' data-theme="' . (theme_night_mode() ? 'gunmetal' : $theme_config{'settings_navigation_color'}) . '"')
      . '' .
      ($skip ? '' : ' data-default-theme="' . $theme_config{'settings_navigation_color'} . '"') .
      ' data-editor-palette="' .
      $theme_config{'settings_cm_editor_palette'} .
      '" data-theme-version="' .
      theme_version('version') .
      '" data-theme-version-data="' .
      urlize(theme_version('json')) .
      '"  data-level="' .
      $get_user_level .
      '" data-user-home="' .
      get_user_home() .
      '" data-user-id="' .
      get_user_id() .
      '" data-user="' .
      $remote_user .
      '" data-ltr="' .
      get_text_ltr() .
      '" data-language="' .
      get_current_user_language() .
      '" data-locale="' .
      get_current_user_locale() .
      '" data-charset="' .
      get_charset() .
      '" data-notice="' .
      theme_post_update() .
      '" data-initial-wizard="' .
      get_initial_wizard() .
      '" data-webprefix="' .
      $theme_webprefix .
      '" data-webprefix-proxy="' .
      $theme_server_webprefix .
      '" data-current-product="' .
      get_product_name() .
      '" data-pro-vm="' .
      check_pro_package('vm') .
      '"  data-pro-cm="' .
      check_pro_package('cm') .
      '" data-module="' .
      ($module ? "$module" : get_module_name()) .
      '" data-uri="' .
      ($module ? "/$module/" : html_escape(un_urlize(get_env('request_uri'), 1))) .
      '" data-progress="' .
      ($theme_config{'settings_hide_top_loader'} ne 'true' ? '1' : '0') .
      '" data-product="' .
      get_product_name() .
      '" data-access-level="' .
      $get_user_level .
      '" data-time-offset="' .
      get_time_offset() . '"';
}

sub header_body_data
{
    my ($module) = @_;
    return 'data-uri="' .
      ($module ? "/$module/" : html_escape(get_env('request_uri'))) . '"'
      .
      ( (get_module_name() || $module) ?
          ' class="' .
          ($module ? $module : get_module_name()) .
          '" data-module="' .
          ($module ? $module : get_module_name()) . '"' :
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
          get_version_full($version) .
          '" class="versionSeparator">' .
          get_version_full($version, 1) . '</a>';
    }

}

sub get_version_full
{
    my ($version, $beta) = @_;
    ($version) = $version =~ /([0-9]+[.][0-9]+(?:.\d+|-alpha[\d]+|-beta[\d]+|-RC[\d]+|))/;

    if ($version =~ /alpha|beta|RC/ && $beta) {
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
    my $salt = substr(encode_base64($main::session_id), 0, 6);
    my %var;

    $salt =~ tr/A-Za-z0-9//cd;
    $key  =~ tr/A-Za-z0-9//cd;

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
    my ($data, $tmp_file, %theme_temp_data);
    my $salt = substr(encode_base64($main::session_id), 0, 6);
    $salt =~ tr/A-Za-z0-9//cd;

    # Process multiple goto requests
    if ($key eq 'goto') {
        my $tmp_dir = tempname_dir();
        opendir(my $dir, $tmp_dir);
        my @gotos = grep {/^\.theme_/ && /$salt/ && /$key/ && /$remote_user/} readdir($dir);
        closedir $dir;
        if ($tmp_dir && $gotos[0] && -r "$tmp_dir/$gotos[0]") {
            $tmp_file = "$tmp_dir/$gotos[0]";
        }
    } else {
        $tmp_file = tempname('.theme_' . $salt . '_' . get_product_name() . '_' . $key . '_' . $remote_user);
    }

    if ($tmp_file &&
        -r $tmp_file)
    {
        read_file($tmp_file, \%theme_temp_data);
        unlink_file($tmp_file)
          if (!$keep && length trim($tmp_file) > 3);

        $data = $theme_temp_data{$key};
        if ($data) {
            $data =~ s/[?|&]$xnav//g;
            $data =~ s/[?|&]randomized=[\d]+//g;
            $data =~ s/\.cgi&/.cgi?/g;
        }
    }
    return $data;
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

sub get_fm_jailed_user
{
    if (!supports_users()) {
        return undef;
    }
    my $jailed_user = 0;
    my %fmaccess    = get_module_acl(undef, $_[0]);
    if (&webmin_user_is_admin() && %fmaccess && $fmaccess{'work_as_user'} && $fmaccess{'work_as_user'} ne $remote_user) {
        my @user_info = getpwnam($fmaccess{'work_as_user'});
        $jailed_user = $_[1] ? $user_info[0] : $user_info[7];
    }
    return $jailed_user;
}

sub get_tdconfig_file
{
    return "$root_directory/$current_theme/unauthenticated/js/defaults.js";
}

sub get_taconfig_file
{
    return "$config_directory/$current_theme/defaults.js";
}

sub get_tgconfig_file
{
    return "$config_directory/$current_theme/settings.js";
}

sub get_tuconfig_file
{
    my $oconfig = "$config_directory/$current_theme/settings-$remote_user";
    return -r $oconfig ? $oconfig : "$oconfig.js";
}

sub http_x_request
{
    if (get_env('http_x_requested_with') eq "XMLHttpRequest") {
        return 1;
    } else {
        return 0;
    }
}

sub fetch_content
{
    if (get_env('request_uri') =~ /fetch-content=1/ ||
        get_module_name() eq "file")
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

sub get_button_tooltip
{
    my ($label, $key, $placement, $html, $force, $container, $br_label_on) = @_;

    my $mod_key      = $theme_config{'settings_hotkey_toggle_modifier'};
    my $hot_key      = ($key ? ucfirst($theme_config{$key}) : undef);
    my $hot_keys_map = { 'dot' => '.', 'comma' => ',' };
    $hot_key = "⇧ + $hot_keys_map->{$theme_config{$key}}"
      if ($hot_keys_map->{ $theme_config{$key} });

    if (!$container) {
        $container = '#content';
    }
    my $tooltip_text = ($theme_text{$label} ? $theme_text{$label} : ($text{$label} ? $text{$label} : $label));
    if ($br_label_on) {
        my @tooltip_text = split(/\Q$br_label_on\E/, $tooltip_text, 2);
        $tooltip_text = join('<br>' . $br_label_on, @tooltip_text);
    }
    my $alt_key  = 'Alt';
    my $ctrl_key = 'Ctrl';
    my $meta_key = 'Meta';
    if (get_env('http_user_agent') =~ /macintosh/i) {
        $alt_key  = '⌥';
        $ctrl_key = '⌃';
        $meta_key = '⌘';
    }
    my $hot_key_full;
    if ($hot_key) {
        $hot_key_full =
            ($mod_key eq "altKey" ?
            $alt_key : $mod_key eq "ctrlKey" ?
            $ctrl_key : $meta_key) . ' + ' . $hot_key;
        $hot_key_full .= ", $hot_key_full"
            if ($key =~ /^settings_/ && $key =~ /_dbl$/);
    }

    return (' aria-label="' .
              strip_html($tooltip_text) .
              '" data-container="' .
              $container .
              '" data-placement="' .
              $placement .
              '" data-toggle="tooltip" data-html="' .
              ($html ? 'true' : 'false') .
              '" data-title="'
              .
              ($tooltip_text
                 .
                 (length $theme_config{'settings_hotkeys_active'} &&
                    $theme_config{'settings_hotkeys_active'} ne 'false' &&
                    $hot_key ? " ($hot_key_full)" : '')) .
              '"');
}

sub error_40x_handler
{
    my %miniserv;
    get_miniserv_config(\%miniserv);
    if ($_[0]) {
        if ($miniserv{'error_handler_403'}) {
            $miniserv{'error_handler_401'} = undef;
            $miniserv{'error_handler_403'} = undef;
            $miniserv{'error_handler_404'} = undef;
            put_miniserv_config(\%miniserv);
            reload_miniserv();
        }
    } else {
        if (!$miniserv{'error_handler_403'}) {
            $miniserv{'error_handler_401'} = "401.cgi";
            $miniserv{'error_handler_403'} = "403.cgi";
            $miniserv{'error_handler_404'} = "404.cgi";
            put_miniserv_config(\%miniserv);
            reload_miniserv();
        }
    }
}

sub lib_csf_control
{
    my ($action) = @_;
    if (webmin_user_is_admin() &&
        foreign_check("csf")     &&
        foreign_available("csf") &&
        has_command("csf")       &&
        $current_theme =~ /authentic-theme/)
    {
        do("$root_directory/$current_theme/extensions/csf/csf-lib.pl");
        if ($action eq 'load') {
            csf_mod();
        } elsif ($action eq 'unload') {
            csf_clear();
        } elsif ($action eq 'strings') {
            return csf_strings();
        }
    }
}

sub embed_product_branding
{

    return if (get_env('script_name') =~ /password_change\.cgi/);
    return if (getvar('error-fatal'));
    return if ($theme_config{"settings_embed_product_splash_privileged"} eq 'false');
    return &custom_embed_product_branding(@_)
      if (defined(&custom_embed_product_branding));

    my ($brand,
        $brand_name,
        $brand_dir_default,
        $brand_dir_custom,
        $brand_dir,
        $loader,
        $vm_mod_name,
        $vm_available,
        $cm_mod_name,
        $cm_available);

    # Set brand directory
    $brand_dir_default = "$root_directory/$current_theme/images/brand";
    $brand_dir_custom  = "$config_directory/$current_theme/brand";
    $brand_dir         = -r $brand_dir_custom ? $brand_dir_custom : $brand_dir_default;
    $loader            = read_file_contents("$brand_dir/loader.html");

    # Virtualmin available
    $vm_mod_name  = "virtual-server";
    $vm_available = foreign_available($vm_mod_name);

    # Cloudmin available and requested
    $cm_mod_name  = "server-manager";
    $cm_available = foreign_available($cm_mod_name);

    # Define brand image for Virtualmin
    if ($vm_available && !$cm_available) {
        $brand      = read_file_contents("$brand_dir/virtualmin.html");
        $brand_name = "brand-virtualmin";
    }

    # Define brand image for Cloudmin
    elsif ($cm_available) {
        $brand      = read_file_contents("$brand_dir/cloudmin.html");
        $brand_name = "brand-cloudmin";
    }

    # Webmin/Usermin brand image
    else {
        my $prod = get_product_name();
        $brand      = read_file_contents("$brand_dir/$prod.html");
        $brand_name = "brand-$prod";
    }
    $brand =
"<div tabindex=\"1\" class=\"branding-backdrop $brand_name\"><div class=\"centered\">$brand<br><div class=\"branding-loader\">$loader</div></div></div>";
    $brand .= "<script>page.branding.process()</script>";
    print $brand;
}

sub navigation_link_clean
{
    my ($link) = @_;
    if ($link) {
        $link =~ s/\?$xnav&/?/g;
        $link =~ s/[?|&]$xnav//g;
    }
    return $link;
}

1;
