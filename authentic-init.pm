#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
do(dirname(__FILE__) . "/authentic-funcs.pm");

init_vars();
init_funcs();

sub settings
{
    my ($f, $e) = @_;
    my %c;
    if (-r $f) {
        my $k = read_file_contents($f);
        my %k = $k =~ /(.*?)=(.*)/g;
        delete @k{ grep(!/^$e/, keys %k) };
        foreach $s (keys %k) {
            $k{$s} =~ s/^[^']*\K'|'(?=[^']*$)|;(?=[^;]*$)//g;
            $k{$s} =~ s/\\'/'/g;
            $c{$s} .= $k{$s};
        }
        return %c;
    } else {
        return %c;
    }
}

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
    $c{'settings_font_family'}                  = '0';
    $c{'settings_navigation_color'}             = 'blue';
    $c{'settings_background_color'}             = 'gainsboro';
    $c{'settings_button_tooltip'}               = 'true';
    $c{'settings_hide_top_loader'}              = 'false';
    $c{'settings_animation_left'}               = 'true';
    $c{'settings_animation_tabs'}               = 'true';
    $c{'settings_sysinfo_link_mini'}            = 'false';
    $c{'settings_show_night_mode_link'}         = 'true';
    $c{'settings_theme_options_button'}         = 'true';
    $c{'settings_leftmenu_button_refresh'}      = 'false';
    $c{'settings_hotkeys_active'}               = 'true';
    $c{'settings_hotkey_toggle_modifier'}       = 'altKey';
    $c{'settings_hotkey_toggle_key_webmin'}     = 'w';
    $c{'settings_hotkey_toggle_key_virtualmin'} = 'v';
    $c{'settings_hotkey_toggle_key_cloudmin'}   = 'c';
    $c{'settings_hotkey_toggle_key_usermin'}    = 'u';
    $c{'settings_hotkey_toggle_key_webmail'}    = 'm';
    $c{'settings_hotkey_shell'}                 = 'k';
    $c{'settings_hotkey_sysinfo'}               = 'i';
    $c{'settings_hotkey_toggle_slider'}         = 'n';
    $c{'settings_hotkey_favorites'}             = 'f';
    $c{'settings_hotkey_focus_search'}          = 's';
    $c{'settings_hotkey_reload'}                = 'r';
    $c{'settings_hotkey_toggle_key_night_mode'} = 'l';

    return %c;
}

sub embed_header
{
    my (@args) = @_;
    my $charset = defined($main::force_charset) ? $main::force_charset : get_charset();

    print "<!DOCTYPE html>\n";
    print '<html ' . header_html_data(undef, undef, @args) . '>', "\n";
    print '  <head>', "\n";
    embed_noscript();
    print '  <meta charset="' . ($charset ? quote_escape($charset) : 'utf-8') . '">', "\n";
    print '  <title>', $args[0], '</title>', "\n";
    print '  <link rel="shortcut icon" href="' . $gconfig{'webprefix'} . '/images/favicon'
      .
      ( (&get_product_name() eq 'usermin') ? '-usermin' :
          '-webmin'
      ) .
      '.ico">' . "\n";
    print '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";

    ($args[1] && (print($args[1] . "\n")));

    if (get_stripped()) {
        print '</head>';
        return;
    }

    my @css = ('bootstrap',           'fontawesome-animation', 'fontbase',   'jquery.scrollbar',
               'jquery.autocomplete', 'codemirror',            'nprogress',  'messenger',
               'select2',             'bootstrap.tagsinput',   'datepicker', 'jquery.datatables',
               'authentic');

    my @js = ('timeplot',          'jquery',                    'bootstrap',           'jquery.scrollintoview',
              'bootbox',           'bootstrap.tagsinput',       'datepicker',          'fileinput',
              'jquery.datatables', 'jquery.datatables.plugins', 'jquery.easypiechart', 'clipboard',
              'contextmenu',       'pjax',                      'jquery.scrollbar',    'jquery.autocomplete',
              'codemirror',        'momentjs',                  'favico',              'select2',
              'jquery.purl',       'jquery.injectCSS',          'jquery.mobile',       'transition',
              'nprogress',         'messenger',                 'sortable',            'any-resize-event',
              'authentic-objs',    'authentic-funcs',           'authentic');

    if ($args[3] eq '1') {

        if ($args[2] eq 'debug') {
            foreach my $css (@css) {
                print '  <link href="' . $gconfig{'webprefix'} .
                  '/unauthenticated/css/' . $css . '.src.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {

            embed_css_bundle();
        }

        embed_css_night_rider();

        embed_styles(0);
        embed_settings();

        if ($args[2] eq 'debug') {
            foreach my $js (@js) {

                if (is_st_p() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print '  <script src="' . $gconfig{'webprefix'} .
                  '/unauthenticated/js/' . $js . '.src.js?' . theme_version(1) . '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }
    } else {

        if ($args[2] eq 'debug') {
            foreach my $css (@css) {
                print '  <link href="' . $gconfig{'webprefix'} .
                  '/unauthenticated/css/' . $css . '.src.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        } else {
            embed_css_bundle();
        }

        embed_css_night_rider();

        if ((length $__settings{'settings_navigation_color'} && $__settings{'settings_navigation_color'} ne 'blue') ||
            theme_night_mode())
        {
            print '  <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/' .
              (theme_night_mode() ? 'gunmetal' : lc($__settings{'settings_navigation_color'})) . '.' .
              ($args[2] eq 'debug' ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";

        }

        embed_styles(1);
        embed_settings();

        if ($args[2] eq 'debug') {
            foreach my $js (@js) {

                if (is_st_p() &&
                    $js eq 'timeplot')
                {
                    next;
                }

                print '  <script src="' . $gconfig{'webprefix'} .
                  '/unauthenticated/js/' . $js . '.src.js?' . theme_version(1) . '"></script>' . "\n";
            }
        } else {
            embed_js_bundle();
        }

    }
    embed_js_scripts();
    print '</head>', "\n";
}

sub embed_settings
{
    my $str_unauthenticated = "unauthenticated";
    my $str_settings        = "settings";
    my $str_js              = "js";
    my $cur_time            = time();
    my $global_config_file  = ($config_directory . "/" . $current_theme . "/" . $str_settings . "." . $str_js);
    my $user_config_file    = (get_tuconfig_file());
    my $js_directory        = "/" . $current_theme . "/" . $str_unauthenticated . "/" . $str_js;
    my $js_root_directory   = ($root_directory . $js_directory);

    # Global configuration
    if (-r $global_config_file) {

        copy_source_dest($global_config_file, $js_root_directory);
        print '  <script src="' . $gconfig{'webprefix'} . '/' . $str_unauthenticated .
          '/' . $str_js . '/' . $str_settings . '.' . $str_js . '?' . $cur_time . '"></script>' . "\n";
    } elsif (-r $js_root_directory . "/" . $str_settings . "." . $str_js && !-r $global_config_file) {
        unlink $js_root_directory . "/" . $str_settings . "." . $str_js;
    }

    # User configuration
    if (-r $user_config_file) {
        copy_source_dest($user_config_file, $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js);
        print '  <script src="' . $gconfig{'webprefix'} . '/' . $str_unauthenticated .
          '/' . $str_js . '/' . $str_settings . '_' . $remote_user . '.' . $str_js . '?' . $cur_time . '"></script>' . "\n";
    } elsif (-r $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js &&
             !-r $user_config_file)
    {
        unlink $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js;
    }
}

sub embed_styles
{
    my ($force) = @_;
    if (-r $config_directory . "/$current_theme/styles.css") {
        if ($force ||
            (-s $config_directory .
                "/$current_theme/styles.css" ne -s $root_directory . "/$current_theme/unauthenticated/css/styles.css"))
        {
            copy_source_dest($config_directory . "/$current_theme/styles.css",
                             $root_directory . "/$current_theme/unauthenticated/css");
        }
        print '  <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/styles.css?' .
          time() . '" rel="stylesheet">' . "\n";
    } elsif (-r $root_directory . "/$current_theme/unauthenticated/css/styles.css" &&
             !-r $config_directory . "/$current_theme/styles.css")
    {
        unlink $root_directory . "/$current_theme/unauthenticated/css/styles.css";
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

    if (!$__settings{'settings_font_family'} || $__settings{'settings_font_family'} eq 'undefined') {
        print '  <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/fonts-roboto.' .
          (theme_mode() eq 'debug' ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    } elsif ($__settings{'settings_font_family'} != '1') {
        print '  <link href="' .
          $gconfig{'webprefix'} . '/unauthenticated/css/font-' . $__settings{'settings_font_family'} . '.' .
          (theme_mode() eq 'debug' ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    }
}

sub embed_css_bundle
{
    print '  <link href="' .
      $gconfig{'webprefix'} . '/unauthenticated/css/bundle.min.css?' . theme_version(1) . '" rel="stylesheet">' . "\n";
    embed_css_fonts();
}

sub embed_css_night_rider
{
    if (theme_night_mode()) {
        print '  <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/nightrider.' .
          (theme_mode() eq 'debug' ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_css_content_palette
{
    if (theme_night_mode()) {
        print '  <link href="' . $gconfig{'webprefix'} . '/unauthenticated/css/palettes/nightrider.' .
          (theme_mode() eq 'debug' ? 'src' : 'min') . '.css?' . theme_version(1) . '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_js_timeplot
{
    print '  <script src="' . $gconfig{'webprefix'} . '/unauthenticated/js/timeplot.' .
      (theme_mode() eq 'debug' ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
}

sub embed_js_bundle
{
    print '  <script src="' .
      $gconfig{'webprefix'} . '/unauthenticated/js/bundle.min.js?' . theme_version(1) . '"></script>' . "\n";
}

sub embed_js_scripts
{

    (get_stripped() && return);

    if (-r $config_directory . "/$current_theme/scripts.js" && -s $config_directory . "/$current_theme/scripts.js") {
        copy_source_dest($config_directory . "/$current_theme/scripts.js",
                         $root_directory . "/$current_theme/unauthenticated/js");
        print '  <script src="' . $gconfig{'webprefix'} . '/unauthenticated/js/scripts.js?' . time() . '"></script>' . "\n";
    } else {
        unlink $root_directory . "/$current_theme/unauthenticated/js/scripts.js";
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
          <h2>$Atext{'body_no_javascript_title'}</h2>
          <p>$Atext{'body_no_javascript_message'}</p>
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
            print '  <script src="' . $gconfig{'webprefix'} . '/extensions/sql.' .
              ($args[0] eq 'debug' ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
        }

        # Load `File Manager` specific scripts
        if (get_module_name() =~ /file-manager/ ||
            get_module_name() =~ /filemin/)
        {
            print '  <script src="' . $gconfig{'webprefix'} . '/extensions/file-manager/file-manager.' .
              ($args[0] eq 'debug' ? 'src' : 'min') . '.js?' . theme_version(1) . '"></script>' . "\n";
        }

    }
}

sub is_st_p
{
    return ($t_uri__i !~ /\/virtual-server\/pro\/history.cgi/ &&
            $t_uri__i !~ /\/server-manager\/bwgraph.cgi/ &&
            $t_uri__i !~ /\/server-manager\/history.cgi/ &&
            $t_uri__i !~ /\/server-manager\/one_history.cgi/) ?
      1 :
      0;
}

sub Atext
{

    my $rv = $Atext{ $_[0] };
    $rv =~ s/\$(\d+)/$1 < @_ ? $_[$1] : '$'.$1/ge;
    return $rv;
}

sub init_vars
{

    our $t_uri__i = get_env('request_uri');
    our %__settings = (settings_default(),
                       settings($config_directory . "/$current_theme/settings.js", 'settings_'),
                       settings(get_tuconfig_file(),                               'settings_'));
    our (%text, %in, %gconfig, $current_theme, $root_directory, $theme_root_directory, $t_var_switch_m, $t_var_product_m);

    our %Atext = (&load_language($current_theme), %Atext);

    if ($t_uri__i =~ /sysinfo.cgi/ || $in =~ /xhr-info/) {
        our %Atext = (&load_language('virtual-server'), %Atext);
        our %Atext = (&load_language('server-manager'), %Atext);
    }

    our ($has_virtualmin, $get_user_level, $has_cloudmin) = get_user_level();

    our $t_uri__x = get_env('script_name');
    our $t_uri___i;
    our $t_uri____i;

    my ($server_link, $server_prefix) = parse_servers_path();
    our $global_prefix = ($server_prefix ? $server_prefix : $gconfig{'webprefix'});

    our $xnav = "xnavigation=1";

    our %gaccess = &get_module_acl();
    our $title   = &get_html_framed_title();
    our %cookies = get_cookies();

    our ($t_var_switch_m, $t_var_product_m) = get_swith_mode();
}

sub init_funcs
{

    # Embed debug functions
    if (theme_mode() eq 'debug') {
        do "$root_directory/$current_theme/.debug.pm";
    }
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

sub usermin_available
{
    my ($_module) = @_;
    $_module = ($_module ? ($_module eq '__version' ? $_module : ('/' . $_module)) : undef);
    $__usermin_root = $root_directory;
    $__usermin_root =~ s/webmin/usermin/;
    $__usermin_config = $config_directory;
    $__usermin_config =~ s/webmin/usermin/;

    if (!-d $__usermin_config . '/' . $current_theme) {
        mkdir($__usermin_config . '/' . $current_theme, 0755);
    }

    if ((-r $__usermin_root . $_module || $_module eq '__version') &&
        -r $__usermin_root . '/web-lib-funcs.pl')
    {
        my $usermin_version = read_file_lines($__usermin_config . '/version', 1)->[0];
        return ($_module eq '__version' ? $usermin_version : 1);
    } else {
        return 0;
    }

}

sub dashboard_switch
{
    if (!foreign_available("virtual-server") &&
        !foreign_available("server-manager") &&
        (get_product_name() ne 'usermin' || (get_product_name() eq 'usermin' && !foreign_available("mailbox"))))
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
    my ($type) = @_;
    return foreign_available('webmin') ?
      '-webkit-filter: grayscale(' . $__settings{ 'settings_grayscale_level_' . $type . '' } .
      ') ' . ($type eq 'navigation' && 'sepia(' . $__settings{ 'settings_sepia_level_' . $type . '' } . ')') .
      ' saturate(' . $__settings{ 'settings_saturate_level_' . $type . '' } .
      ') hue-rotate(' . $__settings{ 'settings_hue_level_' . $type . '' } . 'deg)' . ($type eq 'navigation' &&
                                              ' invert(' . $__settings{ 'settings_invert_level_' . $type . '' } .
                                              ') brightness(' . $__settings{ 'settings_brightness_level_' . $type . '' } .
                                              ') contrast(' . $__settings{ 'settings_contrast_level_' . $type . '' } . ')') .
      '; filter: grayscale(' . $__settings{ 'settings_grayscale_level_' . $type . '' } .
      ') ' . ($type eq 'navigation' && 'sepia(' . $__settings{ 'settings_sepia_level_' . $type . '' } . ')') .
      ' saturate(' . $__settings{ 'settings_saturate_level_' . $type . '' } .
      ') hue-rotate(' . $__settings{ 'settings_hue_level_' . $type . '' } . 'deg)' . ($type eq 'navigation' &&
                                              ' invert(' . $__settings{ 'settings_invert_level_' . $type . '' } .
                                              ') brightness(' . $__settings{ 'settings_brightness_level_' . $type . '' } .
                                              ') contrast(' . $__settings{ 'settings_contrast_level_' . $type . '' } . ')') .
      ';' :
      undef;
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
    my ($mod, $label) = @_;

    my %_lang = reverse load_language($mod);
    my $entry = $_lang{ &quote_escape($label) };

    my $class = "default";
    my $icon  = '<i class="fa fa-fw fa-%icon"></i>';

    if ($entry eq 'edit_createnow' || $entry eq 'edit_savenow') {
        $icon =~ s/%icon/backup fa-1_25x/ig;
    } elsif ($entry =~ /changeip/ || $entry =~ /newips/) {
        $icon =~ s/%icon/pencil-square-o/ig;
    } elsif ($entry eq 'kvms_start' || $entry eq 'docker_reg') {
        $class = "success ";
        $icon =~ s/%icon/server-add/ig;
    } elsif ($entry =~ /save/ ||
             $entry eq 'backup_ok2'    ||
             $entry eq 'sharedips_ok'  ||
             $entry eq 'categories_ok' ||
             $entry eq 'frame_ok'      ||
             $entry eq 'newquotas_ok'  ||
             $entry eq 'newdynip_ok')
    {
        $class = "success ";
        $icon =~ s/%icon/check-circle/ig;
    } elsif ($entry eq 'form_ok') {
        $class = "success ";
        $icon =~ s/%icon/check-circle/ig;
    } elsif ($entry =~ /apply/) {
        $class = "info ";
        $icon =~ s/%icon/check-circle-o/ig;
    } elsif ($entry =~ /update/ ||
             $entry =~ /index_sync/)
    {
        $class = "info ";
        $icon =~ s/%icon/refresh/ig;
    } elsif (($entry =~ /delete/ && $entry ne 'users_delete') ||
             $entry =~ /wipe/          ||
             $entry =~ /ddrop_ok/      ||
             $entry =~ /dbs_dok/       ||
             $entry =~ /tprivs_dok/    ||
             $entry =~ /hosts_dok/     ||
             $entry =~ /cprivs_dok/    ||
             $entry =~ /dbase_drop/    ||
             $entry =~ /ddrop_title/   ||
             $entry =~ /dbase_delete2/ ||
             $entry =~ /table_drop/    ||
             $entry =~ /tdrop_title/   ||
             $entry =~ /tdrop_ok/      ||
             $entry =~ /index_drops/   ||
             $entry =~ /delq_confirm/  ||
             $entry =~ /umass_del2/    ||
             $entry =~ /index_gmass/   ||
             $entry =~ /master_del/    ||
             $entry =~ /newstyles_del/ ||
             $entry eq 'html_dtitle')
    {
        $class = "danger ";

        $icon =~ s/%icon/times-circle/ig;
    } elsif ($entry =~ /twofactor_enable/) {
        $class = "info ";
        $icon =~ s/%icon/lock/ig;
    } elsif ($entry =~ /twofactor_disable/) {
        $class = "warning ";
        $icon =~ s/%icon/unlock/ig;
    } elsif (($entry =~ /install/ || $entry =~ /recsok/ || $entry eq 'scripts_iok' || $entry eq 'right_upok') &&
             $entry !~ /uninstall/)
    {
        $class = "success ";
        $icon =~ s/%icon/package-install fa-1_25x/ig;
    } elsif ($entry =~ /uninstall/ || $entry =~ /edit_uninst/ || $entry eq 'drecs_ok') {
        $class = "danger ";
        $icon =~ s/%icon/times-circle-o/ig;
    } elsif ($entry =~ /upgrade/ || $entry =~ /massscript_ok/ || $entry =~ /massg_ok/) {
        $class = "info ";
        $icon =~ s/%icon/update/ig;
    } elsif ($entry =~ /index_srefresh/) {
        $icon =~ s/%icon/user-md/ig;
    } elsif ($entry =~ /quota/) {
        $icon =~ s/%icon/pie-chart/ig;
    } elsif ($entry =~ /addboot/ ||
             $entry =~ /enable/ ||
             $entry eq 'massdomains_enaok')
    {
        $icon =~ s/%icon/toggle-switch  fa-1_25x/ig;
    } elsif ($entry =~ /shutdown/) {
        $icon =~ s/%icon/power-off/ig;
    } elsif ($entry =~ /docker_reg/) {
        $icon =~ s/%icon/check-circle-o/ig;
    } elsif ($entry eq 'tmpl_nprev' || $entry eq 'wizard_prev') {
        $icon =~ s/%icon/arrow-circle-o-left/ig;
    } elsif ($entry eq 'tmpl_nnext' ||
             $entry eq 'wizard_next' ||
             $entry eq 'tmpl_cnext'  ||
             $entry eq 'tmpl_snext'  ||
             $entry eq 'download_cont')
    {
        $icon =~ s/%icon/arrow-circle-o-right/ig;
    } elsif ($entry =~ /cancel/) {
        $icon =~ s/%icon/times-circle-o/ig;
    } elsif ($entry eq 'ticket_submit') {
        $icon =~ s/%icon/question-circle/ig;
    } elsif ($entry =~ /passwd_change/) {
        $icon =~ s/%icon/key-li/ig;
        $class = "warning ";
    } elsif ($entry eq 'nf_seen') {
        $icon =~ s/%icon/clear-all fa-1_25x/ig;
    } elsif ($entry =~ /history_ok/) {
        $icon =~ s/%icon/area-chart/ig;
    } elsif ($entry =~ /edit_open/ || $entry =~ /edit_list/) {
        $icon =~ s/%icon/files-o/ig;
    } elsif ($entry =~ /reboot/ ||
             $entry eq 'view_refresh' ||
             $entry =~ /refreshmods/  ||
             $entry eq 'index_buttinit')
    {
        if ($entry =~ /refreshmods/) {
            $class = "primary ";
        } elsif ($entry ne 'reboot_ok' && $entry ne 'index_reboot' ||
                 $entry eq 'index_buttinit')
        {
            $class = "warning ";
        }
        $icon =~ s/%icon/refresh-fi fa-1_25x/ig;
    } elsif ($entry =~ /search/ ||
             $entry =~ /index_broad/ ||
             $entry eq 'scripts_findok' ||
             $entry eq 'kill_title')
    {
        $class = "info ";
        $icon =~ s/%icon/search/ig;
    } elsif ($entry =~ /restart/ || $entry eq 'edit_kill') {
        $class = "warning ";
        $icon =~ s/%icon/refresh/ig;
    } elsif ($entry eq "ddrop_empty") {
        $class = "warning ";
        $icon =~ s/%icon/times-circle-o/ig;
    } elsif ($entry =~ /start/) {
        $class = "success ";
        $icon =~ s/%icon/play/ig;
    } elsif ($entry =~ /index_stop/ ||
             $entry =~ /edit_stopnow/)
    {
        $class = "danger ";
        $icon =~ s/%icon/stop/ig;
    } elsif ($entry =~ /ok_ok/) {
        $icon =~ s/%icon/check-square-o/ig;
        $class = "success ";
    } elsif ($entry =~ /index_delboot/) {
        $class = "grey ";
        $icon =~ s/%icon/toggle-switch-off fa-1_25x/ig;
    } elsif ($entry =~ /index_refsel/ ||
             $entry eq 'index_reset' ||
             $entry eq 'index_regen' ||
             $entry eq 'index_reload')
    {
        $class = "warning ";
        $icon =~ s/%icon/refresh/ig;
    } elsif ($entry eq 'index_script') {
        $icon =~ s/%icon/update/ig;
    } elsif ($entry =~ /status/) {
        $icon =~ s/%icon/info-circle/ig;
    } elsif ($entry eq 'index_clear' || $entry eq 'shell_clear') {
        $icon =~ s/%icon/history/ig;
    } elsif ($entry eq 'index_clearcmds' || $entry eq 'shell_clearcmds') {
        $icon =~ s/%icon/broom fa-1_25x/ig;
    } elsif ($entry eq 'index_boot' ||
             $entry eq 'index_bootup'      ||
             $entry eq 'index_atboot'      ||
             $entry eq 'massdomains_disok' ||
             $entry =~ /disable/)
    {
        $icon =~ s/%icon/toggle-switch-off fa-1_25x/ig;
    } elsif ($entry =~ /index_global/ ||
             $entry eq 'umass_ok'    ||
             $entry eq 'vars_edit'   ||
             $entry eq 'lusers_mass' ||
             $entry eq 'root_ok'     ||
             $entry eq 'index_edit')
    {
        $class = "primary ";
        $icon =~ s/%icon/pencil-square-o/ig;
    } elsif ($entry =~ /clone/) {
        $icon =~ s/%icon/clone/ig;
    } elsif ($entry =~ /index_tmpls/) {
        $icon =~ s/%icon/table-edit fa-1_25x/ig;
    } elsif ($entry =~ /index_sched/ ||
             $entry =~ /sched_title/)
    {
        if ($entry =~ /sched_title/) {
            $class = "primary ";
        }
        $icon =~ s/%icon/clock/ig;
    } elsif ($entry =~ /uedit_mail/ || $entry eq 'newnotify_ok') {
        $icon =~ s/%icon/envelope-o/ig;
    } elsif ($entry =~ /sendmail/) {
        $icon =~ s/%icon/envelope-o/ig;
        $class = "info ";
    } elsif ($entry =~ /uedit_swit/ || $entry eq 'user_switch') {
        $icon =~ s/%icon/webmin/ig;
    } elsif ($entry =~ /uedit_logins/ ||
             $entry =~ /index_logins/ ||
             $entry eq 'login_enable')
    {
        $icon =~ s/%icon/key/ig;
    } elsif ($entry =~ /index_who/) {
        $icon =~ s/%icon/sign-in/ig;
    } elsif ($entry eq 'dbase_add' || $entry eq 'databases_import') {
        $class = "success ";
        $icon =~ s/%icon/database-plus fa-1_25x/ig;
    }
    elsif (($entry =~ /add/ && $entry ne 'dbase_addview' && $entry ne 'edit_addinc') ||
           ($entry =~ /create/ &&
            $entry ne 'user_priv_create_view') ||
           $entry =~ /index_crnow/ ||
           $entry eq 'view_new'    ||
           $entry eq 'mass_ok'     ||
           $entry eq 'rmass_ok')
    {
        $class = "success ";
        $icon =~ s/%icon/plus-circle/ig;
    } elsif ($entry =~ /force_title/ ||
             $entry =~ /index_force/)
    {
        $class = "warning ";
        $icon =~ s/%icon/rotate-3d fa-1_25x margined-left--3 margined-right--3/ig;
    } elsif ($entry =~ /csv/) {
        $icon =~ s/%icon/export/ig;
    } elsif ($entry =~ /restore/) {
        $icon =~ s/%icon/restore fa-1_25x/ig;
    } elsif ($entry eq 'backup_title' ||
             $entry eq 'dbase_backup' ||
             $entry eq 'backup_ok'    ||
             $entry =~ /export/       ||
             $entry eq 'backup_now')
    {
        $icon =~ s/%icon/backup fa-1_25x/ig;
    } elsif ($entry =~ /dbase_exec/ ||
             $entry =~ /exec_exec/         ||
             $entry =~ /user_priv_execute/ ||
             $entry =~ /exec_title/        ||
             $entry =~ /exec_tabexec/)
    {
        $icon =~ s/%icon/database/ig;
    } elsif ($entry =~ /create_view/ ||
             $entry =~ /addview/ ||
             $entry eq "view_title1")
    {
        $icon =~ s/%icon/list/ig;
    } elsif ($entry eq 'table_data') {
        $icon =~ s/%icon/database-outline/ig;
    } elsif ($entry eq 'index_title1' || $entry eq 'table_index') {
        $icon =~ s/%icon/key-plus fa-1_25x/ig;
    } elsif ($entry eq 'transfer_transferok') {
        $icon =~ s/%icon/transform fa-1_25x/ig;
    } elsif ($entry eq 'transfer_uploadok' ||
             $entry eq 'transfer_tabupload' ||
             $entry eq 'html_uploadok')
    {
        $class = "primary ";
        $icon =~ s/%icon/upload/ig;
    } elsif ($entry eq 'index_down' || $entry eq 'transfer_downloadok') {
        $class = "primary ";
        $icon =~ s/%icon/download/ig;
    } elsif ($entry eq 'index_up' || $entry eq 'download_need') {
        $class = "primary ";
        $icon =~ s/%icon/download/ig;
    } elsif ($entry =~ /umass_del1/ ||
             $entry =~ /gdel_del/    ||
             $entry =~ /gdel_title/  ||
             $entry eq 'drecs_title' ||
             $entry eq 'rdmass_ok')
    {
        $icon =~ s/%icon/times-circle-o/ig;
    } elsif ($entry eq 'users_dok' || $entry eq 'users_delete') {
        $class = "danger ";
        $icon =~ s/%icon/user-times/ig;
    } elsif ($entry eq 'index_mass2') {
        $class = "warning ";
        $icon =~ s/%icon/toggle-switch  fa-1_25x/ig;
    } elsif ($entry eq 'index_mass3') {
        $class = "success ";
        $icon =~ s/%icon/toggle-switch-off  fa-1_25x/ig;
    } elsif ($entry =~ /lang/) {
        $icon =~ s/%icon/globe/ig;
        $class = "warning ";
    } elsif ($entry =~ /_ok/) {
        $icon =~ s/%icon/check-circle-o/ig;
        $class = "success ";
    } elsif ($entry =~ /_change/ && $entry ne "edit_change" && $entry ne "trace_change") {
        $class = "warning ";
        $icon =~ s/%icon/pencil-square-o/ig;
    } elsif ($entry =~ /lkeys_sok2/) {
        $class = "success ";
        $icon =~ s/%icon/key/ig;
    } elsif ($entry =~ /letsencrypt_title/ || $entry =~ /cert_letsonly/ || $entry =~ /ssl_copycert/) {
        $icon =~ s/%icon/certificate/ig;
    } elsif ($entry =~ /index_tree/) {
        $icon =~ s/%icon/tree/ig;
    } else {
        $icon = undef;
    }

    return ($entry, $class, $icon);
}

sub theme_night_mode
{
    if ($__settings{'settings_force_night_mode'} eq '1') {
        return 1;
    } else {
        return 0;
    }
}

sub theme_version
{
    my ($string) = @_;
    my %tinfo    = get_theme_info($current_theme);
    my $version  = $tinfo{'version'};

    if ($string) {
        $version =~ s/beta|\.|-//ig;

        if (theme_mode() eq 'debug') {
            $version .= time();
        }
    }

    return $version;
}

sub theme_mode
{
    my $debug_mode = "$root_directory/$current_theme/.debug.pm";
    if (-r $debug_mode) {
        return 'debug';
    } else {
        return 'production';
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
    return 'data-host="' . get_env('http_host') . '" data-hostname="' .
      get_display_hostname() . '" data-title-initial="' . $args[0] . '" data-debug="' . theme_mode() . '" data-session="' .
      ($remote_user ? '1' : '0') . '" data-script-name="' . ($module ? "/$module/" : get_env('script_name')) .
      '"' . ($skip ? '' : ' data-background-style="' . (theme_night_mode() ? 'nightRider' : 'gainsboro') . '"') .
      '' . ($skip ? '' : ' data-night-mode="' . theme_night_mode() . '"') .
      ' data-slider-fixed="' . ($__settings{'settings_side_slider_fixed'} eq "true" ? '1' : '0') .
      '" data-sestatus="' . is_selinux_enabled() . '" data-shell="' . foreign_available("shell") .
      '" data-webmin="' . foreign_available("webmin") . '" data-usermin="' . usermin_available() .
      '" data-navigation="' . ($args[3] eq '1' ? '0' : '1') . '" data-status="' . foreign_available("system-status") .
      '" data-package-updates="' . foreign_available("package-updates") . '" data-csf="' . foreign_available("csf") . '"' .
      ($skip ? '' : ' data-theme="' . (theme_night_mode() ? 'gunmetal' : $__settings{'settings_navigation_color'}) . '"') .
      '' .
      ($skip ? '' : ' data-default-theme="' . $__settings{'settings_navigation_color'} . '"') . ' data-theme-version="' .
      theme_version(0) . '" data-level="' . $get_user_level . '" data-user-home="' . get_user_home() .
      '" data-user-id="' . get_user_id() . '" data-user="' . $remote_user . '" data-dashboard="' . dashboard_switch() .
      '" data-ltr="' . get_text_ltr() . '" data-language="' . get_current_user_language() . '" data-language-full="' .
      get_current_user_language(1) . '" data-charset="' . get_charset() . '" data-notice="' . theme_post_update() .
      '" data-redirect="' . get_tmp_var('redirected') . '" data-initial-wizard="' . get_initial_wizard() .
      '" data-webprefix="' . $global_prefix . '" data-current-product="' . get_product_name() . '" data-module="' .
      ($module ? "$module" : get_module_name()) . '" data-uri="' . ($module ? "/$module/" : get_env('request_uri')) .
      '" data-progress="' . ($__settings{'settings_hide_top_loader'} ne 'true' ? '1' : '0') .
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

sub set_tmp_var
{
    my ($key, $value) = @_;
    my $salt = substr(encode_base64($main::session_id), 0, 16);
    my %var;

    $salt =~ tr/A-Za-z0-9//cd;
    $key =~ tr/A-Za-z0-9//cd;

    $value =~ s/[?|&]$xnav//g;
    $value =~ s/[^\p{L}\p{N},;:.%&#=_@\+\?\-\/]//g;

    $var{$key} = $value;

    write_file(tempname('.theme_' . $salt . '_' . get_product_name() . '_' . $key . '_' . $remote_user), \%var);
}

sub get_tmp_var
{
    my ($key, $keep) = @_;
    my $salt = substr(encode_base64($main::session_id), 0, 16);

    $salt =~ tr/A-Za-z0-9//cd;

    my $tmp_file = tempname('.theme_' . $salt . '_' . get_product_name() . '_' . $key . '_' . $remote_user);

    read_file($tmp_file, \%tmp_var);
    if (!$keep) {
        unlink_file($tmp_file);
    }

    return $tmp_var{$key};
}

sub parse_servers_path
{
    my ($parent) = $ENV{'HTTP_WEBMIN_PATH'};

    if ($parent) {
        my ($parent_link)   = $parent =~ /(\S*link\.cgi\/[\d]{8,16}+)/;
        my ($parent_prefix) = $parent_link =~ /(\/servers\/link.cgi\S*)/;
        return ($parent_link, $parent_prefix);
    } else {
        return (undef, undef);
    }
}

sub get_user_home
{
    my @my_user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
    return $my_user_info[7];
}

sub get_user_id
{
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
