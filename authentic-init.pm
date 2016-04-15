#
# Authentic Theme 17.84 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

init_vars();

sub settings {
    my %c;
    my $f = $config_directory . "/authentic-theme/settings.js";
    if ( -r $f ) {
        my $k = &read_file_contents($f);
        my %k = $k =~ /(.*?)=(.*)/g;
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

sub embed_header {
    my (@args) = @_;
    my $charset
        = defined($main::force_charset)
        ? $main::force_charset
        : get_charset();

    print '<!DOCTYPE html>', "\n";
    print '<html data-background-style="' . $__settings{'settings_background_color'} . '">', "\n";
    print '<head>', "\n";
    print '<title data-initial="' . $args[0] . '">', $args[0], '</title>', "\n";
    print '<meta charset="' . ( $charset ? quote_escape($charset) : 'utf-8' ) . '">', "\n";
    print '<link rel="shortcut icon" href="'
        . $gconfig{'webprefix'}
        . '/images/favicon'
        . (
        ( &get_product_name() eq 'usermin' )
        ? '-usermin'
        : '-webmin'
        ) . '.ico">' . "\n";
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";
    ( $args[1] && ( print( $args[1] . "\n" ) ) );

    if ( $in{'stripped'} eq '1' ) {
        return;
    }

    if ( $args[2] eq 'debug' ) {

        my @css = (
            'bootstrap',             'bootstrap.tagsinput', 'datepicker',     'fontawesome',
            'fontawesome-animation', 'codemirror',          'jquery.jspanel', 'jquery.scrollbar',
            'jquery.datatables',     'jquery.autocomplete', 'nprogress',      'messenger',
            'select2',               'roboto',              'authentic'
        );

        my @js = (
            'timeplot',                  'jquery',
            'jquery-ui',                 'mobile-detect',
            'jquery.jspanel',            'jquery.scrollbar',
            'jquery.autocomplete',       'jquery.scrollintoview',
            'momentjs',                  'favico',
            'select2',                   'bootbox',
            'icheck',                    'jquery.purl',
            'bootstrap',                 'bootstrap.tagsinput',
            'datepicker',                'fileinput',
            'codemirror',                'jquery.datatables',
            'jquery.datatables.plugins', 'jquery.easypiechart',
            'jquery.injectCSS',          'tinymce/tinymce',
            'transition',                'nprogress',
            'messenger',                 'clipboard',
            'contextmenu',               'init'
        );

        foreach my $css (@css) {
            print '<link href="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/css/'
                . $css
                . '.src.css?1782" rel="stylesheet" type="text/css">' . "\n";
        }

        embed_styles();
        embed_settings();

        foreach my $js (@js) {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/'
                . $js . '.'
                . ( $js eq 'tinymce/tinymce' ? 'min' : 'src' )
                . '.js?1782" type="text/javascript"></script>' . "\n";
        }
    }
    else {
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/package.min.css?1782" rel="stylesheet" type="text/css">' . "\n";

        embed_styles();
        embed_settings();

        if (   index( $t_uri__i, '/virtual-server/history.cgi' ) != -1
            || index( $t_uri__i, '/server-manager/bwgraph.cgi' ) != -1
            || index( $t_uri__i, '/server-manager/history.cgi' ) != -1
            || index( $t_uri__i, '/server-manager/one_history.cgi' ) != -1 )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/timeplot.min.js?1782" type="text/javascript"></script>' . "\n";
        }

        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/package.min.js?1782" type="text/javascript"></script>' . "\n";
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/init.min.js?1782" type="text/javascript"></script>' . "\n";

        if (   &get_module_name() eq 'mailboxes'
            || &get_module_name() eq 'mailbox' )
        {
            print '<script src="'
                . $gconfig{'webprefix'}
                . '/unauthenticated/js/tinymce/tinymce.min.js?1782" type="text/javascript"></script>' . "\n";
        }

    }
    print '</head>', "\n";
}

sub embed_settings {

    if ( -r $config_directory . "/authentic-theme/settings.js" ) {

        copy_source_dest(
            $config_directory . "/authentic-theme/settings.js",
            $root_directory . "/authentic-theme/unauthenticated/js"
        );

        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/settings.js?'
            . time()
            . '" type="text/javascript"></script>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/unauthenticated/js/settings.js"
        && !-r $config_directory . "/authentic-theme/settings.js" )
    {
        unlink $root_directory . "/authentic-theme/unauthenticated/js/settings.js";
    }
}

sub embed_styles {

    if ( -r $config_directory . "/authentic-theme/styles.css" ) {
        if (  -s $config_directory
            . "/authentic-theme/styles.css" ne -s $root_directory
            . "/authentic-theme/unauthenticated/css/styles.css" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/styles.css",
                $root_directory . "/authentic-theme/unauthenticated/css"
            );
        }
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/styles.css?'
            . time()
            . '" rel="stylesheet" type="text/css">' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/unauthenticated/css/styles.css"
        && !-r $config_directory . "/authentic-theme/styles.css" )
    {
        unlink $root_directory . "/authentic-theme/unauthenticated/css/styles.css";
    }
}

sub embed_scripts {

    if ( $in{'stripped'} eq '1' ) {
        return;
    }

    if ( -r $config_directory . "/authentic-theme/scripts.js" ) {
        if (  -s $config_directory
            . "/authentic-theme/scripts.js" ne -s $root_directory
            . "/authentic-theme/unauthenticated/js/scripts.js" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/scripts.js",
                $root_directory . "/authentic-theme/unauthenticated/js"
            );
        }
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/scripts.js?'
            . time()
            . '" type="text/javascript"></script>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/unauthenticated/js/scripts.js"
        && !-r $config_directory . "/authentic-theme/scripts.js" )
    {
        unlink $root_directory . "/authentic-theme/unauthenticated/js/scripts.js";
    }
}

sub embed_footer {

    if ( $in{'stripped'} eq '1' ) {
        return;
    }
    my ($type) = @_;
    if ( get_env('script_name') ne '/session_login.cgi' ) {
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/authentic.'
            . ( $type eq 'debug' ? 'src' : 'min' )
            . '.js?1782" type="text/javascript"></script><script>___authentic_theme_footer___ = 1;</script>' . "\n";
    }
}

sub init_vars {
    our $t_uri__i   = get_env('request_uri');
    our %__settings = settings();
    our ( %text, %in, %gconfig, $current_theme, $root_directory, $theme_root_directory, $t_var_switch_m,
        $t_var_product_m );

    our %text = ( &load_language($current_theme), %text );
    our %text = ( &load_language('virtual-server'), %text );
    our %text = ( &load_language('server-manager'), %text );
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

sub usermin_available {
    my ($_module) = @_;
    $_module = ( $_module ? '/' . $_module : undef );
    $__usermin_root = $root_directory;
    $__usermin_root =~ s/webmin/usermin/;
    $__usermin_config = $config_directory;
    $__usermin_config =~ s/webmin/usermin/;

    if ( !-d $__usermin_config . '/authentic-theme' ) {
        mkdir( $__usermin_config . '/authentic-theme', 0755 );
    }

    if (   -r $__usermin_root . $_module
        && -r $__usermin_root . '/web-lib-funcs.pl' )
    {
        return 1;
    }
    else {
        return 0;
    }

}

sub dashboard_switch {
    if (   !&foreign_available("virtual-server")
        && !&foreign_available("server-manager")
        && &get_product_name() ne 'usermin' )
    {
        return 1;
    }
    else {
        return 0;
    }
}

sub get_current_user_language {
    return substr(
        (     $gconfig{ 'lang' . '_' . $base_remote_user }
            ? $gconfig{ 'lang' . '_' . $base_remote_user }
            : $gconfig{'lang'}
        ),
        0, 2
    );
}

sub get_filters {
    my ($type) = @_;
    return
          '-webkit-filter: grayscale('
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
        . ';';
}

sub get_user_level {
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
        $c
            = &virtual_server::master_admin()   ? 0
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

sub get_env {
    my ($key) = @_;
    return $ENV{ uc($key) };
}

1;
