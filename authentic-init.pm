#
# Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
#

init_vars();
init_funcs();

sub settings
{
    my ( $f, $e ) = @_;
    my %c;
    if ( -r $f ) {
        my $k = read_file_contents($f);
        my %k = $k =~ /(.*?)=(.*)/g;
        delete @k{ grep( !/^$e/, keys %k ) };
        foreach $s ( keys %k ) {
            $k{$s} =~ s/^[^']*\K'|'(?=[^']*$)|;(?=[^;]*$)//g;
            $k{$s} =~ s/\\'/'/g;
            $c{$s} .= $k{$s};
        }
        return %c;
    }
    else {
        return %c;
    }
}

sub settings_filter
{
    my (%in_data) = @_;

    delete @in_data{ grep( !/^config_portable_|^settings_/, keys %in_data ) };
    delete @in_data{ grep( !m/^\w*$/,                       keys %in_data ) };
    for ( values %in_data ) { s/(.*)/'$1';/ }
    for ( values %in_data ) { s/\$|`*//g }
    for ( values %in_data ) { s/<<//g }
    for ( values %in_data ) { s/"/'/g }
    for ( values %in_data ) { s/\/\//&#47;&#47;/g }
    for ( values %in_data ) { s/'true'/true/g }
    for ( values %in_data ) { s/'false'/false/g }
    for ( values %in_data ) { s/'1'/1/g }
    for ( values %in_data ) { s/'0'/0/g }
    for ( values %in_data ) {
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
    $c{'settings_window_autoscroll'}            = 'true';
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
    my $charset =
      defined($main::force_charset)
      ? $main::force_charset
      : get_charset();

    print '<!DOCTYPE html>', "\n";
    print '<html data-hostname="'
      . &get_display_hostname()
      . '" data-session="'
      . ( $main::session_id ? 1 : 0 )
      . '" data-script-name="'
      . get_env('script_name')
      . '" data-sestatus="'
      . is_selinux_enabled()
      . '" data-background-style="'
      . ( theme_night_mode()
          ? 'nightRider'
          : 'gainsboro' )
      . '" data-default-background-style="'
      . 'gainsboro'
      . '" data-night-mode="'
      . theme_night_mode()
      . '">', "\n";
    print '<head>', "\n";
    print '<title data-initial="' . $args[0] . '">', $args[0], '</title>', "\n";
    print '<meta charset="' . ( $charset ? quote_escape($charset) : 'utf-8' ) . '">', "\n";
    print '<link rel="shortcut icon" href="'
      . $gconfig{'webprefix'}
      . '/images/favicon'
      . ( ( &get_product_name() eq 'usermin' )
          ? '-usermin'
          : '-webmin'
      ) . '.ico">' . "\n";
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";
    ( $args[1] && ( print( $args[1] . "\n" ) ) );

    ( get_stripped() && return );

    if ( $args[3] eq '1' ) {

        my @css = ( 'bootstrap',         'bootstrap.tagsinput',
                    'datepicker',        'fontawesome-animation',
                    'jquery.datatables', 'fontbase',
                    'authentic' );

        my @js = ( 'timeplot',                  'jquery',
                   'jquery.scrollintoview',     'bootbox',
                   'jquery.purl',               'bootstrap',
                   'bootstrap.tagsinput',       'datepicker',
                   'fileinput',                 'jquery.datatables',
                   'jquery.datatables.plugins', 'jquery.easypiechart',
                   'clipboard',                 'contextmenu',
                   'init' );

        if ( $args[2] eq 'debug' ) {
            foreach my $css (@css) {
                print '<link href="'
                  . $gconfig{'webprefix'}
                  . '/unauthenticated/css/'
                  . $css
                  . '.src.css?'
                  . theme_version()
                  . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        }
        else {
            embed_css_content();
            embed_css_bundle();
        }

        embed_css_content_palette();
        embed_styles(0);
        embed_settings();

        if ( $args[2] eq 'debug' ) {
            foreach my $js (@js) {

                if ( is_st_p()
                     && $js eq 'timeplot' )
                {
                    next;
                }

                print '<script src="'
                  . $gconfig{'webprefix'}
                  . '/unauthenticated/js/'
                  . $js
                  . '.src.js?'
                  . theme_version()
                  . '"></script>' . "\n";
            }
        }
        else {
            embed_js_bundle();
            embed_js_content();
            embed_js_init();
        }
    }
    else {

        my @css = ( 'bootstrap', 'fontawesome-animation', 'jquery.scrollbar', 'jquery.autocomplete',
                    'nprogress', 'messenger',             'select2',          'fontbase',
                    'authentic' );

        my @js = ( 'jquery',           'bootstrap',  'jquery.scrollbar', 'jquery.autocomplete',
                   'momentjs',         'favico',     'select2',          'jquery.purl',
                   'jquery.injectCSS', 'transition', 'nprogress',        'messenger',
                   'init' );

        if ( $args[2] eq 'debug' ) {
            foreach my $css (@css) {
                print '<link href="'
                  . $gconfig{'webprefix'}
                  . '/unauthenticated/css/'
                  . $css
                  . '.src.css?'
                  . theme_version()
                  . '" rel="stylesheet">' . "\n";
            }
            embed_css_fonts();
        }
        else {
            embed_css_parent();
            embed_css_bundle();
        }

        if (
             ( length $__settings{'settings_navigation_color'}
               && $__settings{'settings_navigation_color'} ne 'blue' )
             || theme_night_mode() )
        {
            print '<link href="'
              . $gconfig{'webprefix'}
              . '/unauthenticated/css/palettes/'
              . ( theme_night_mode()  ? 'gunmetal' : lc( $__settings{'settings_navigation_color'} ) ) . '.'
              . ( $args[2] eq 'debug' ? 'src'      : 'min' ) . '.css?'
              . theme_version()
              . '" rel="stylesheet" data-palette>' . "\n";
        }

        embed_styles(1);
        embed_settings();

        if ( $args[2] eq 'debug' ) {
            foreach my $js (@js) {
                print '<script src="'
                  . $gconfig{'webprefix'}
                  . '/unauthenticated/js/'
                  . $js
                  . '.src.js?'
                  . theme_version()
                  . '"></script>' . "\n";
            }
        }
        else {
            embed_js_bundle();
            embed_js_parent();
            embed_js_init();
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
    my $global_config_file =
      ( $config_directory . "/" . $current_theme . "/" . $str_settings . "." . $str_js );
    my $user_config_file  = ( get_tuconfig_file() );
    my $js_directory      = "/" . $current_theme . "/" . $str_unauthenticated . "/" . $str_js;
    my $js_root_directory = ( $root_directory . $js_directory );

    # Global configuration
    if ( -r $global_config_file ) {

        copy_source_dest( $global_config_file, $js_root_directory );
        print '<script src="'
          . $gconfig{'webprefix'} . '/'
          . $str_unauthenticated . '/'
          . $str_js . '/'
          . $str_settings . '.'
          . $str_js . '?'
          . $cur_time
          . '"></script>' . "\n";
    }
    elsif ( -r $js_root_directory . "/" . $str_settings . "." . $str_js && !-r $global_config_file ) {
        unlink $js_root_directory . "/" . $str_settings . "." . $str_js;
    }

    #User configuration
    if ( -r $user_config_file ) {

        copy_source_dest( $user_config_file,
                          $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js );
        print '<script src="'
          . $gconfig{'webprefix'} . '/'
          . $str_unauthenticated . '/'
          . $str_js . '/'
          . $str_settings . '_'
          . $remote_user . '.'
          . $str_js . '?'
          . $cur_time
          . '"></script>' . "\n";
    }
    elsif ( -r $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js
            && !-r $user_config_file )
    {
        unlink $js_root_directory . "/" . $str_settings . "_" . $remote_user . "." . $str_js;
    }
}

sub embed_styles
{
    my ($force) = @_;
    if ( -r $config_directory . "/authentic-theme/styles.css" ) {
        if ( $force
             || (   -s $config_directory
                  . "/authentic-theme/styles.css" ne -s $root_directory
                  . "/authentic-theme/unauthenticated/css/styles.css" ) )
        {
            copy_source_dest( $config_directory . "/authentic-theme/styles.css",
                              $root_directory . "/authentic-theme/unauthenticated/css" );
        }
        print '<link href="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/css/styles.css?'
          . time()
          . '" rel="stylesheet">' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/unauthenticated/css/styles.css"
            && !-r $config_directory . "/authentic-theme/styles.css" )
    {
        unlink $root_directory . "/authentic-theme/unauthenticated/css/styles.css";
    }
}

sub embed_pm_scripts
{
    my $scripts = $config_directory . "/authentic-theme/scripts.pm";
    if ( -r $scripts ) {
        require $scripts;
    }
}

sub embed_css_fonts
{

    if ( !$__settings{'settings_font_family'} || $__settings{'settings_font_family'} eq 'undefined' ) {
        print '<link href="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/css/fonts-roboto.'
          . ( theme_mode() eq 'debug' ? 'src' : 'min' ) . '.css?'
          . theme_version()
          . '" rel="stylesheet">' . "\n";
    }
    elsif ( $__settings{'settings_font_family'} != '1' ) {
        print '<link href="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/css/font-'
          . $__settings{'settings_font_family'} . '.'
          . ( theme_mode() eq 'debug' ? 'src' : 'min' ) . '.css?'
          . theme_version()
          . '" rel="stylesheet">' . "\n";
    }
}

sub embed_css_bundle
{
    print '<link href="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/css/bundle.min.css?'
      . theme_version()
      . '" rel="stylesheet">' . "\n";
    embed_css_fonts();
}

sub embed_css_parent
{
    print '<link href="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/css/parent.bundle.min.css?'
      . theme_version()
      . '" rel="stylesheet">' . "\n";
}

sub embed_css_content
{
    print '<link href="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/css/content.bundle.min.css?'
      . theme_version()
      . '" rel="stylesheet">' . "\n";
}

sub embed_css_content_palette
{
    if ( theme_night_mode() ) {
        print '<link href="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/css/palettes/nightrider.'
          . ( theme_mode() eq 'debug' ? 'src' : 'min' ) . '.css?'
          . theme_version()
          . '" rel="stylesheet" data-palette>' . "\n";
    }
}

sub embed_js_timeplot
{
    print '<script src="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/js/timeplot.min.js?'
      . theme_version()
      . '"></script>' . "\n";
}

sub embed_js_bundle
{
    print '<script src="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/js/bundle.min.js?'
      . theme_version()
      . '"></script>' . "\n";
}

sub embed_js_parent
{
    print '<script src="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/js/parent.bundle.min.js?'
      . theme_version()
      . '"></script>' . "\n";
}

sub embed_js_content
{
    print '<script src="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/js/content.bundle.min.js?'
      . theme_version()
      . '"></script>' . "\n";
}

sub embed_js_init
{
    print '<script src="'
      . $gconfig{'webprefix'}
      . '/unauthenticated/js/init.min.js?'
      . theme_version()
      . '"></script>' . "\n";
}

sub embed_js_scripts
{

    ( get_stripped() && return );

    if ( -r $config_directory . "/authentic-theme/scripts.js" ) {
        if (   -s $config_directory
             . "/authentic-theme/scripts.js" ne -s $root_directory
             . "/authentic-theme/unauthenticated/js/scripts.js" )
        {
            copy_source_dest( $config_directory . "/authentic-theme/scripts.js",
                              $root_directory . "/authentic-theme/unauthenticated/js" );
        }
        print '<script src="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/js/scripts.js?'
          . time()
          . '"></script>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/unauthenticated/js/scripts.js"
            && !-r $config_directory . "/authentic-theme/scripts.js" )
    {
        unlink $root_directory . "/authentic-theme/unauthenticated/js/scripts.js";
    }
}

sub embed_footer
{
    my (@args) = @_;

    ( get_stripped() && return );

    if (    index( get_env('script_name'), 'session_login.cgi' ) eq '-1'
         && index( get_env('script_name'), 'pam_login.cgi' ) eq '-1'
         && index( get_env('script_name'), 'password_form.cgi' ) eq '-1'
         && index( get_env('script_name'), 'password_change.cgi' ) eq '-1' )
    {

        print '<script src="'
          . $gconfig{'webprefix'}
          . '/unauthenticated/js/postinit.'
          . ( $args[0] eq 'debug' ? 'src' : 'min' ) . '.js?'
          . theme_version()
          . '"></script><script>___authentic_theme_footer___ = 1;</script>' . "\n";

        if ( $args[1] eq '1' || $args[2] eq 'stripped' ) {
            print '<script src="'
              . $gconfig{'webprefix'}
              . '/unauthenticated/js/content.'
              . ( $args[0] eq 'debug' ? 'src' : 'min' ) . '.js?'
              . theme_version()
              . '"></script>' . "\n";

            # Load `MySQL/PostgreSQL` specific scripts
            if (    index( get_module_name(), 'mysql' ) gt '-1'
                 || index( get_module_name(), 'postgresql' ) gt '-1' )
            {
                print '<script src="'
                  . $gconfig{'webprefix'}
                  . '/extensions/sql.'
                  . ( $args[0] eq 'debug' ? 'src' : 'min' ) . '.js?'
                  . theme_version()
                  . '"></script>' . "\n";
            }

            # Load `File Manager` specific scripts
            if (    index( get_module_name(), 'file-manager' ) gt '-1'
                 || index( get_module_name(), 'filemin' ) gt '-1' )
            {
                print '<script src="'
                  . $gconfig{'webprefix'}
                  . '/extensions/file-manager/file-manager.'
                  . ( $args[0] eq 'debug' ? 'src' : 'min' ) . '.js?'
                  . theme_version()
                  . '"></script>' . "\n";
            }
        }
        else {
            print '<script src="'
              . $gconfig{'webprefix'}
              . '/unauthenticated/js/parent.'
              . ( $args[0] eq 'debug' ? 'src' : 'min' ) . '.js?'
              . theme_version()
              . '"></script>' . "\n";
        }
    }
}

sub is_st_p
{
    return (    index( $t_uri__i, '/virtual-server/history.cgi' ) == -1
             && index( $t_uri__i, '/server-manager/bwgraph.cgi' ) == -1
             && index( $t_uri__i, '/server-manager/history.cgi' ) == -1
             && index( $t_uri__i, '/server-manager/one_history.cgi' ) == -1 )
      ? 1
      : 0;
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
    our %__settings = ( settings_default(),
                        settings( $config_directory . "/authentic-theme/settings.js", 'settings_' ),
                        settings( get_tuconfig_file(),                                'settings_' ) );
    our ( %text, %in, %gconfig, $current_theme, $root_directory, $theme_root_directory, $t_var_switch_m,
          $t_var_product_m );

    our %Atext = ( &load_language($current_theme), %Atext );

    my $t_sysinfo = index( $t_uri__i, 'sysinfo.cgi' );
    if ( $t_sysinfo != -1 ) {
        our %Atext = ( &load_language('virtual-server'), %Atext );
        our %Atext = ( &load_language('server-manager'), %Atext );
    }

    our ( $has_virtualmin, $get_user_level, $has_cloudmin ) = get_user_level();

    our $t_uri__x = get_env('script_name');
    our $t_uri___i;
    our $t_uri____i;
    our $t_uri___i_virtualmin;
    our $t_uri___i_cloudmin;
    our $t_uri_virtualmin = index( $t_uri__i, 'virtualmin' );
    our $t_uri_cloudmin   = index( $t_uri__i, 'cloudmin' );
    our $t_uri_webmail    = index( $t_uri__i, 'mail' );
    our $t_uri_dashboard  = index( $t_uri__i, 'dashboard' );

    our %gaccess = &get_module_acl();
    our $title   = &get_html_framed_title();
    our %cookies = get_cookies();

    our ( $t_var_switch_m, $t_var_product_m ) = get_swith_mode();
}

sub init_funcs
{

    # Embed debug functions
    if ( theme_mode() eq 'debug' ) {
        require "$root_directory/$current_theme/.debug.pm";
    }

}

sub usermin_available
{
    my ($_module) = @_;
    $_module = ( $_module ? ( $_module eq '__version' ? $_module : ( '/' . $_module ) ) : undef );
    $__usermin_root = $root_directory;
    $__usermin_root =~ s/webmin/usermin/;
    $__usermin_config = $config_directory;
    $__usermin_config =~ s/webmin/usermin/;

    if ( !-d $__usermin_config . '/authentic-theme' ) {
        mkdir( $__usermin_config . '/authentic-theme', 0755 );
    }

    if ( ( -r $__usermin_root . $_module || $_module eq '__version' )
         && -r $__usermin_root . '/web-lib-funcs.pl' )
    {
        my $usermin_version = read_file_lines( $__usermin_config . '/version', 1 )->[0];
        return ( $_module eq '__version' ? $usermin_version : 1 );
    }
    else {
        return 0;
    }

}

sub dashboard_switch
{
    if (    !&foreign_available("virtual-server")
         && !&foreign_available("server-manager")
         && &get_product_name() ne 'usermin' )
    {
        return 1;
    }
    else {
        return 0;
    }
}

sub get_current_user_language
{
    return
      substr(
              (    $gconfig{ 'lang' . '_' . $base_remote_user }
                 ? $gconfig{ 'lang' . '_' . $base_remote_user }
                 : $gconfig{'lang'}
              ),
              0, 2 );
}

sub get_filters
{
    my ($type) = @_;
    return foreign_available('webmin')
      ? '-webkit-filter: grayscale('
      . $__settings{ 'settings_grayscale_level_' . $type . '' } . ') '
      . ( $type eq 'navigation' && 'sepia(' . $__settings{ 'settings_sepia_level_' . $type . '' } . ')' )
      . ' saturate('
      . $__settings{ 'settings_saturate_level_' . $type . '' }
      . ') hue-rotate('
      . $__settings{ 'settings_hue_level_' . $type . '' } . 'deg)'
      . ( $type eq 'navigation'
          && ' invert('
          . $__settings{ 'settings_invert_level_' . $type . '' }
          . ') brightness('
          . $__settings{ 'settings_brightness_level_' . $type . '' }
          . ') contrast('
          . $__settings{ 'settings_contrast_level_' . $type . '' }
          . ')' )
      . '; filter: grayscale('
      . $__settings{ 'settings_grayscale_level_' . $type . '' } . ') '
      . ( $type eq 'navigation' && 'sepia(' . $__settings{ 'settings_sepia_level_' . $type . '' } . ')' )
      . ' saturate('
      . $__settings{ 'settings_saturate_level_' . $type . '' }
      . ') hue-rotate('
      . $__settings{ 'settings_hue_level_' . $type . '' } . 'deg)'
      . ( $type eq 'navigation'
          && ' invert('
          . $__settings{ 'settings_invert_level_' . $type . '' }
          . ') brightness('
          . $__settings{ 'settings_brightness_level_' . $type . '' }
          . ') contrast('
          . $__settings{ 'settings_contrast_level_' . $type . '' }
          . ')' )
      . ';'
      : undef;
}

sub get_user_level
{
    my ( $a, $b, $c );
    $b = &foreign_available("server-manager");
    $a = &foreign_available("virtual-server");
    if ($b) {
        &foreign_require( "server-manager", "server-manager-lib.pl" );
    }
    if ($a) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    }
    if ($b) {
        $c = $server_manager::access{'owner'} ? 4 : 0;
    }
    elsif ($a) {
        $c =
            &virtual_server::master_admin()   ? 0
          : &virtual_server::reseller_admin() ? 1
          :                                     2;
    }
    elsif ( &get_product_name() eq "usermin" ) {
        $c = 3;
    }
    else {
        $c = 0;
    }
    return ( $a, $c, $b );
}

sub get_button_style
{
    my ( $mod, $label ) = @_;

    my %_lang = reverse load_language($mod);
    my $entry = $_lang{ &quote_escape($label) };

    my $class = "default";
    my $icon  = '<i class="fa fa-fw fa-%icon"></i>';

    if ( $entry eq 'edit_createnow' || $entry eq 'edit_savenow' ) {
        $icon =~ s/%icon/backup fa-1_25x/ig;
    }
    elsif (    index( $entry, 'save' ) gt "-1"
            || $entry eq 'backup_ok2'
            || $entry eq 'sharedips_ok'
            || $entry eq 'categories_ok'
            || $entry eq 'frame_ok'
            || $entry eq 'newquotas_ok'
            || $entry eq 'newdynip_ok' )
    {
        $class = "success ";
        $icon =~ s/%icon/check-circle/ig;
    }
    elsif ( $entry eq 'form_ok' ) {
        $class = "success ";
        $icon =~ s/%icon/check-circle/ig;
    }
    elsif ( index( $entry, 'apply' ) gt "-1" ) {
        $class = "info ";
        $icon =~ s/%icon/check-circle-o/ig;
    }
    elsif (    index( $entry, 'update' ) gt "-1"
            || index( $entry, 'index_sync' ) gt "-1" )
    {
        $class = "info ";
        $icon =~ s/%icon/refresh/ig;
    }
    elsif (    ( index( $entry, 'delete' ) gt "-1" && $entry ne 'users_delete' )
            || index( $entry, 'wipe' ) gt "-1"
            || index( $entry, 'ddrop_ok' ) gt "-1"
            || index( $entry, 'dbs_dok' ) gt "-1"
            || index( $entry, 'tprivs_dok' ) gt "-1"
            || index( $entry, 'hosts_dok' ) gt "-1"
            || index( $entry, 'cprivs_dok' ) gt "-1"
            || index( $entry, 'dbase_drop' ) gt "-1"
            || index( $entry, 'ddrop_title' ) gt "-1"
            || index( $entry, 'dbase_delete2' ) gt "-1"
            || index( $entry, 'table_drop' ) gt "-1"
            || index( $entry, 'tdrop_title' ) gt "-1"
            || index( $entry, 'tdrop_ok' ) gt "-1"
            || index( $entry, 'index_drops' ) gt "-1"
            || index( $entry, 'delq_confirm' ) gt "-1"
            || index( $entry, 'umass_del2' ) gt "-1"
            || index( $entry, 'index_gmass' ) gt "-1"
            || $entry eq 'html_dtitle' )
    {
        $class = "danger ";

        $icon =~ s/%icon/times-circle/ig;
    }
    elsif (
            (    index( $entry, 'install' ) gt "-1"
              || index( $entry, 'recsok' ) gt "-1"
              || $entry eq 'scripts_iok'
              || $entry eq 'right_upok' )
            && index( $entry, 'uninstall' ) eq "-1" )
    {
        $class = "success ";
        $icon =~ s/%icon/package-install fa-1_25x/ig;
    }
    elsif ( index( $entry, 'uninstall' ) gt "-1" || $entry eq 'drecs_ok' ) {
        $class = "danger ";
        $icon =~ s/%icon/times-circle-o/ig;
    }
    elsif ( index( $entry, 'upgrade' ) gt "-1" ) {
        $class = "info ";
        $icon =~ s/%icon/update/ig;
    }
    elsif ( index( $entry, 'index_srefresh' ) gt "-1" ) {
        $icon =~ s/%icon/user-md/ig;
    }
    elsif ( index( $entry, 'quota' ) gt "-1" ) {
        $icon =~ s/%icon/pie-chart/ig;
    }
    elsif (    index( $entry, 'addboot' ) gt "-1"
            || index( $entry, 'enable' ) gt "-1"
            || $entry eq 'massdomains_enaok' )
    {
        $icon =~ s/%icon/toggle-switch  fa-1_25x/ig;
    }
    elsif ( index( $entry, 'shutdown' ) gt "-1" ) {
        $icon =~ s/%icon/power-off/ig;
    }
    elsif ( index( $entry, 'docker_reg' ) gt "-1" ) {
        $icon =~ s/%icon/check-circle-o/ig;
    }
    elsif ( $entry eq 'tmpl_nprev' || $entry eq 'wizard_prev' ) {
        $icon =~ s/%icon/arrow-circle-o-left/ig;
    }
    elsif (    $entry eq 'tmpl_nnext'
            || $entry eq 'wizard_next'
            || $entry eq 'tmpl_cnext'
            || $entry eq 'tmpl_snext'
            || $entry eq 'download_cont' )
    {
        $icon =~ s/%icon/arrow-circle-o-right/ig;
    }
    elsif ( index( $entry, 'cancel' ) gt "-1" ) {
        $icon =~ s/%icon/times-circle-o/ig;
    }
    elsif ( $entry eq 'ticket_submit' ) {
        $icon =~ s/%icon/question-circle/ig;
    }
    elsif ( $entry eq 'passwd_change' ) {
        $icon =~ s/%icon/key-li/ig;
    }
    elsif ( $entry eq 'newnotify_ok' ) {
        $icon =~ s/%icon/send fa-1_25x/ig;
    }
    elsif ( $entry eq 'nf_seen' ) {
        $icon =~ s/%icon/clear-all fa-1_25x/ig;
    }
    elsif ( index( $entry, 'history_ok' ) gt "-1" ) {
        $icon =~ s/%icon/area-chart/ig;
    }
    elsif ( index( $entry, 'edit_open' ) gt "-1" ) {
        $icon =~ s/%icon/files-o/ig;
    }
    elsif (    index( $entry, 'reboot' ) gt "-1"
            || $entry eq 'view_refresh'
            || index( $entry, 'refreshmods_title' ) gt "-1"
            || $entry eq 'index_buttinit' )
    {
        if ( index( $entry, 'refreshmods_title' ) gt "-1" ) {
            $class = "primary ";
        }
        elsif (    $entry ne 'reboot_ok' && $entry ne 'index_reboot'
                || $entry eq 'index_buttinit' )
        {
            $class = "warning ";
        }
        $icon =~ s/%icon/refresh-fi fa-1_25x/ig;
    }
    elsif (    index( $entry, 'search' ) gt "-1"
            || index( $entry, 'index_broad' ) gt "-1"
            || $entry eq 'scripts_findok'
            || $entry eq 'kill_title' )
    {
        $class = "info ";
        $icon =~ s/%icon/search/ig;
    }
    elsif ( index( $entry, 'restart' ) gt "-1" || $entry eq 'edit_kill' ) {
        $class = "warning ";
        $icon =~ s/%icon/refresh/ig;
    }
    elsif ( $entry eq "ddrop_empty" ) {
        $class = "warning ";
        $icon =~ s/%icon/times-circle-o/ig;
    }
    elsif ( index( $entry, 'start' ) gt "-1" ) {
        $class = "success ";
        $icon =~ s/%icon/play/ig;
    }
    elsif (    index( $entry, 'index_stop' ) gt "-1"
            || index( $entry, 'edit_stopnow' ) gt "-1" )
    {
        $class = "danger ";
        $icon =~ s/%icon/stop/ig;
    }
    elsif ( index( $entry, 'ok_ok' ) gt "-1" ) {
        $icon =~ s/%icon/check-square-o/ig;
        $class = "success ";
    }
    elsif ( index( $entry, 'index_delboot' ) gt "-1" ) {
        $class = "grey ";
        $icon =~ s/%icon/toggle-switch-off fa-1_25x/ig;
    }
    elsif (    index( $entry, 'index_refsel' ) gt "-1"
            || $entry eq 'index_reset'
            || $entry eq 'index_regen'
            || $entry eq 'index_reload' )
    {
        $class = "warning ";
        $icon =~ s/%icon/refresh/ig;
    }
    elsif ( $entry eq 'index_script' ) {
        $icon =~ s/%icon/update/ig;
    }
    elsif ( index( $entry, 'status' ) gt "-1" ) {
        $icon =~ s/%icon/info-circle/ig;
    }
    elsif ( $entry eq 'index_clear' || $entry eq 'shell_clear' ) {
        $icon =~ s/%icon/history/ig;
    }
    elsif ( $entry eq 'index_clearcmds' || $entry eq 'shell_clearcmds' ) {
        $icon =~ s/%icon/broom fa-1_25x/ig;
    }
    elsif (    $entry eq 'index_boot'
            || $entry eq 'index_bootup'
            || $entry eq 'index_atboot'
            || $entry eq 'massdomains_disok'
            || index( $entry, 'disable' ) gt "-1" )
    {
        $icon =~ s/%icon/toggle-switch-off fa-1_25x/ig;
    }
    elsif (    index( $entry, 'index_global' ) gt "-1"
            || $entry eq 'umass_ok'
            || $entry eq 'vars_edit'
            || $entry eq 'lusers_mass'
            || $entry eq 'root_ok'
            || $entry eq 'index_edit' )
    {
        $class = "primary ";
        $icon =~ s/%icon/pencil-square-o/ig;
    }
    elsif ( index( $entry, 'clone' ) gt "-1" ) {
        $icon =~ s/%icon/clone/ig;
    }
    elsif ( index( $entry, 'index_tmpls' ) gt "-1" ) {
        $icon =~ s/%icon/table-edit fa-1_25x/ig;
    }
    elsif (    index( $entry, 'index_sched' ) gt "-1"
            || index( $entry, 'sched_title' ) gt "-1" )
    {
        if ( index( $entry, 'sched_title' ) gt "-1" ) {
            $class = "primary ";
        }
        $icon =~ s/%icon/clock/ig;
    }
    elsif ( index( $entry, 'uedit_mail' ) gt "-1" ) {
        $icon =~ s/%icon/envelope/ig;
    }
    elsif ( index( $entry, 'uedit_swit' ) gt "-1" || $entry eq 'user_switch' ) {
        $icon =~ s/%icon/webmin/ig;
    }
    elsif (    index( $entry, 'uedit_logins' ) gt "-1"
            || index( $entry, 'index_logins' ) gt "-1"
            || $entry eq 'login_enable' )
    {
        $icon =~ s/%icon/key/ig;
    }
    elsif ( index( $entry, 'index_who' ) gt "-1" ) {
        $icon =~ s/%icon/sign-in/ig;
    }
    elsif ( $entry eq 'dbase_add' || $entry eq 'databases_import' ) {
        $class = "success ";
        $icon =~ s/%icon/database-plus fa-1_25x/ig;
    }
    elsif ( ( index( $entry, 'add' ) gt "-1" && $entry ne 'dbase_addview' && $entry ne 'edit_addinc' )
            || ( index( $entry, 'create' ) gt "-1"
                 && $entry ne 'user_priv_create_view' )
            || index( $entry, 'index_crnow' ) gt "-1"
            || $entry eq 'view_new'
            || $entry eq 'mass_ok'
            || $entry eq 'rmass_ok' )
    {
        $class = "success ";
        $icon =~ s/%icon/plus-circle/ig;
    }
    elsif (    index( $entry, 'force_title' ) gt "-1"
            || index( $entry, 'index_force' ) gt "-1" )
    {
        $class = "warning ";
        $icon =~ s/%icon/rotate-3d fa-1_25x margined-left--3 margined-right--3/ig;
    }
    elsif ( index( $entry, 'csv' ) gt "-1" ) {
        $icon =~ s/%icon/export/ig;
    }
    elsif (    $entry eq 'backup_title'
            || $entry eq 'dbase_backup'
            || $entry eq 'backup_ok'
            || $entry eq 'backup_now' )
    {
        $icon =~ s/%icon/backup fa-1_25x/ig;
    }
    elsif (    index( $entry, 'dbase_exec' ) gt "-1"
            || index( $entry, 'exec_exec' ) gt "-1"
            || index( $entry, 'user_priv_execute' ) gt "-1"
            || index( $entry, 'exec_title' ) gt "-1"
            || index( $entry, 'exec_tabexec' ) gt "-1" )
    {
        $icon =~ s/%icon/database/ig;
    }
    elsif (    index( $entry, 'create_view' ) gt "-1"
            || index( $entry, 'addview' ) gt "-1"
            || $entry eq "view_title1" )
    {
        $icon =~ s/%icon/list/ig;
    }
    elsif ( $entry eq 'table_data' ) {
        $icon =~ s/%icon/database-outline/ig;
    }
    elsif ( $entry eq 'index_title1' || $entry eq 'table_index' ) {
        $icon =~ s/%icon/key-plus fa-1_25x/ig;
    }
    elsif ( $entry eq 'transfer_transferok' ) {
        $icon =~ s/%icon/transform fa-1_25x/ig;
    }
    elsif (    $entry eq 'transfer_uploadok'
            || $entry eq 'transfer_tabupload'
            || $entry eq 'html_uploadok' )
    {
        $class = "primary ";
        $icon =~ s/%icon/upload/ig;
    }
    elsif ( $entry eq 'index_down' || $entry eq 'transfer_downloadok' ) {
        $class = "primary ";
        $icon =~ s/%icon/download/ig;
    }
    elsif ( $entry eq 'index_up' || $entry eq 'download_need' ) {
        $class = "primary ";
        $icon =~ s/%icon/download/ig;
    }
    elsif (    index( $entry, 'umass_del1' ) gt "-1"
            || index( $entry, 'gdel_del' ) gt "-1"
            || index( $entry, 'gdel_title' ) gt "-1"
            || $entry eq 'drecs_title'
            || $entry eq 'rdmass_ok' )
    {
        $icon =~ s/%icon/times-circle-o/ig;
    }
    elsif ( $entry eq 'users_dok' || $entry eq 'users_delete' ) {
        $class = "danger ";
        $icon =~ s/%icon/user-times/ig;
    }
    elsif ( $entry eq 'index_mass2' ) {
        $class = "warning ";
        $icon =~ s/%icon/toggle-switch  fa-1_25x/ig;
    }
    elsif ( $entry eq 'index_mass3' ) {
        $class = "success ";
        $icon =~ s/%icon/toggle-switch-off  fa-1_25x/ig;
    }
    elsif (    $entry eq 'index_ok'
            || $entry eq 'assignment_ok'
            || $entry eq 'lang_ok' )
    {
        $icon =~ s/%icon/check-circle-o/ig;
    }
    else {
        $icon = undef;
    }

    return ( $entry, $class, $icon );
}

sub theme_night_mode
{
    if ( $__settings{'settings_force_night_mode'} eq '1' ) {
        return 1;
    }
    else {
        return 0;
    }
}

sub theme_git_version
{
    my ($force)          = @_;
    my $git_version      = undef;
    my $git_version_file = $root_directory . "/authentic-theme/version";
    if ( -e $git_version_file
         && ( $__settings{'settings_sysinfo_theme_patched_updates'} eq 'true' || $force ) )
    {
        $git_version = read_file_lines( $git_version_file, 1 );
        $git_version = $git_version->[0];
    }
    return $git_version;
}

sub theme_version
{
    my ($switch)            = @_;
    my $sh__ln__p___version = '18.48';
    my $sh__ln__c___version = '18.49';
    my $sh__ln__g___version = theme_git_version('uncond');
    (     ( !$switch && $sh__ln__g___version )
       && ( $sh__ln__c___version = $sh__ln__g___version, ( $sh__ln__c___version =~ s/\.|-|git//ig ) ) );

    if ( theme_mode() eq 'debug' && !$switch && $sh__ln__g___version ) {
        $sh__ln__c___version .= time();
    }
    elsif ( ( !$switch || $switch eq 'full' ) && !$sh__ln__g___version ) {
        $sh__ln__c___version = read_file_lines( $root_directory . "/authentic-theme/VERSION.txt", 1 )->[0];
        if ( $switch ne 'full' ) {
            $sh__ln__c___version =~ s/\.|-//ig;
            if ( length($sh__ln__c___version) < 5 ) {
                $sh__ln__c___version .= "0";
            }
        }
    }
    return $sh__ln__c___version;
}

sub get_version
{
    my ($version) = @_;
    return $version =~ /([0-9]+[.][0-9]+)/;
}

sub get_env
{
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub get_user_home
{
    my @my_user_info = $remote_user ? getpwnam($remote_user) : getpwuid($<);
    return @my_user_info[7];
}

sub get_tuconfig_file
{
    my $tuconfig = $config_directory . "/authentic-theme/settings-" . $remote_user;
    return $tuconfig;
}

sub get_stripped
{
    if ( index( get_env('request_uri'), 'stripped=1' ) gt -1 ) {
        return 1;
    }
    else {
        return 0;
    }
}

sub get_raw
{
    if ( index( get_env('request_uri'), 'stripped=1&stripped=2' ) gt -1
         || get_module_name() eq "file" )
    {
        return 1;
    }
    else {
        return 0;
    }
}

sub ltrim
{
    my $s = shift;
    $s =~ s/^\s+//;
    return $s;
}

sub rtrim
{
    my $s = shift;
    $s =~ s/\s+$//;
    return $s;
}

sub trim
{
    my $s = shift;
    $s =~ s/^\s+|\s+$//g;
    return $s;
}

sub replace
{
    my ( $from, $to, $string ) = @_;
    $string =~ s/$from/$to/ig;

    return $string;
}

sub get_link
{
    my ( $string, $type ) = @_;
    my $url;

    if ( $type eq 'ugly' ) {
        $string =~ /<a.*href=([\s\S]+?)>/;
        $url = $1;
    }
    elsif ( $type eq 'bad' ) {
        $string =~ /<a.*href='([\s\S]+?)'.*>/;
        $url = $1;
    }
    else {
        $string =~ /<a.*href="([\s\S]+?)".*>/;
        $url = $1;
    }
    $string =~ /<a.*href.*>([\s\S]+?)<\/a>/;

    return [ $url, $1 ];

}

sub theme_mode
{
    my $debug_mode = "$root_directory/$current_theme/.debug.pm";
    if ( -r $debug_mode ) {
        return 'debug';
    }
    else {
        return 'production';
    }
}

1;
