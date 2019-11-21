#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %text, %gconfig, %request_uri, %userconfig, @allowed_paths, @remote_user_info, $cwd, $path);

require(dirname(__FILE__) . '/file-manager-lib.pm');

kill_previous($0, $$);

my %data;
my @list;
my @items;
my $auto_orient    = " -auto-orient";
my $width          = int($in{'width'});
my $height         = int($in{'height'});
my $file_requested = $in{'file_requested'};
my $files_all      = $in{'files_all'};
my $files_selected = $in{'files_selected'};
my $search         = $in{'query'};

# Use only current file or read list of files
if (!$files_all) {
    @list = ($file_requested);
    if ($files_selected) {
        @list = split(/\0/, $in{'name'});
    }
} else {
    if ($search) {
        @list = exec_search();
    } else {
        unless (opendir(DIR, $cwd)) {
            print_error("$text{'theme_xhred_global_error'}: <tt>`$cwd`</tt>- $!.");
            exit;
        }
        @list = grep {$_ ne '.' && $_ ne '..'} readdir(DIR);
        closedir(DIR);
    }

    my $page      = 1;
    my $pagelimit = 4294967295;
    my $pages     = 0;

    my $max_allowed = int($userconfig{'max_allowed'});
    if ($max_allowed !~ /^[0-9,.E]+$/ || $max_allowed < 100 || $max_allowed > 2000) {
        $max_allowed = 300;
    }

    my $totals         = scalar(@list);
    my $totals_spliced = $totals;

    my $tuconfig_per_page = get_user_config('config_portable_module_filemanager_records_per_page');

    if (server_pagination_enabled($totals, $max_allowed, $search)) {
        $page = int($in{'page'}) || 1;
        $pagelimit = int($in{'paginate'}) || int($tuconfig_per_page) || 30;
        $pages = ceil(($totals) / $pagelimit);
        if ($page > $pages) {
            $page = $pages;
            $in{'page'} = $page;
        }
        my $splice_start = $pagelimit * ($page - 1);
        my $splice_end = $pagelimit;

        @list = sort {$a cmp $b} @list;
        @list = splice(@list, $splice_start, $splice_end);
        $totals_spliced = scalar(@list);
    }
}

# Leave only allowed
if ($remote_user_info[0] ne 'root' && $allowed_paths[0] ne '$ROOT') {
    my @tmp_list;
    for $path (@allowed_paths) {
        my $slashed = $path;
        $slashed .= "/" if ($slashed !~ /\/$/);
        push @tmp_list,
          grep {string_starts_with($slashed, "$cwd/$_/") || index($slashed, $_) != -1 || index("$cwd/$_", $slashed) != -1}
          @list;
    }
    my %hash = map {$_, 1} @tmp_list;
    @list = keys %hash;
}

my $index           = 0;
my $index_requested = 0;
if (has_command('identify')) {
    foreach my $filename (@list) {
        my $file       = simplify_path("$cwd/$filename");
        my $type       = mimetype($file);
        my $files_size = -s $file;
        my $file_encoded;
        my $processed = 0;
        my ($w, $h, $o) = (0, 0, undef);

        if (string_starts_with($type, 'image')) {

            if ($files_all || $files_selected || $file_requested eq $filename) {

                my $data_auto = ($auto_orient ? '%w %h %[orientation]' : '%w %h');
                my $data = `identify -ping -format '$data_auto' @{[quotemeta($file)]}`;
                ($w, $h, $o) = $data =~ /(?|(\d+)\s(\d+)\s(\w+)|(\d+)\s(\d+))/;
                my $orientation = ($w > $h ? $w     : $h);
                my $factor      = ($w > $h ? $width : $height);
                my $types_excluded = (string_contains($type, 'svg') || string_contains($type, 'microsoft.icon'));

                if ($w && $h) {

                    # Process image in case it's larger than 600kb or its dimensions larger than user's screen resolution
                    if (!$types_excluded && ($orientation > $factor || $files_size > 600000)) {

                        # Fix orientation sizes
                        if ($auto_orient && $o) {
                            if (string_starts_with($o, 'Left') || string_starts_with($o, 'Right')) {
                                my $w_ = $w;
                                my $h_ = $h;
                                $h = $w_;
                                $w = $h_;
                            }
                        }

                        # Extract smaller version of the file
                        my $file_out = "$file.bak~";
                        my $convert_size = (($w > $h ? undef : 'x') . ($orientation > $factor ? $factor : $orientation));
                        system(
"convert -quality 60% -resize $convert_size @{[quotemeta($file)]} $auto_orient @{[quotemeta($file_out)]}");

                        # Store smaller version data
                        $file_encoded = encode_base64(read_file_contents($file_out));
                        if ($orientation > $factor) {
                            $h = int($factor / ($w / $h));
                            $w = $factor;
                        }

                        # Remove temporary file
                        unlink_file($file_out);

                        $processed++;
                    } else {
                        $file_encoded = encode_base64(read_file_contents($file));
                    }

                }

                if ($file_requested eq $filename) {
                    $index_requested = $index;
                }
            }

            if ($file_encoded) {
                push(@items,
                     {  index => $index,
                        title => html_escape("$filename (@{[theme_nice_size_local($files_size, -1)]})"),
                        file  => $filename,
                        cwd   => $cwd,
                        src   => ("data:$type;base64,$file_encoded"),
                        p     => $processed,
                        w     => int($w),
                        h     => int($h),
                     });
                $index++;
            }
        }
    }
    if (@items) {
        $data{'items'}           = \@items;
        $data{'index_requested'} = $index_requested;
    } else {
        $data{'warning'} = $text{'theme_xhred_filemanager_preview_images_error'};
    }
} else {

    # Let user install ImageMagick in single click
    $data{'error'} = $text{'theme_xhred_filemanager_preview_images_deps_error1'};
    my $package_updates = "package-updates";
    if (foreign_available($package_updates)) {
        my $redir                = "$gconfig{'webprefix'}/$request_uri{'module'}";
        my $pkgname              = ($gconfig{'os_type'} =~ /debian/ ? 'imagemagick' : 'ImageMagick');
        my %package_updates_lang = load_language($package_updates);
        my $update_failed        = html_escape($package_updates_lang{'update_failed'});
        my $update_ok            = html_escape(text('global_deps_installed', "<code>$pkgname</code>"));
        my $update_error         = html_escape(text('global_deps_error', "<kbd>$pkgname</kbd>"));
        my $installing_text      = html_escape(text('global_deps_installing', "<code>$pkgname</code>"));
        my $install_link =
"$gconfig{'webprefix'}/$package_updates/update.cgi?source=3&confirm=1&mode=new&u=$pkgname&redir=$redir&redirdesc=File%20Manager&xnavigation=1";
        $data{'error'} .= " "
          .
          text('theme_xhred_filemanager_preview_images_deps_error2',
               ui_link('javascript:;',
                       $text{'theme_xhred_global_click_here'},
                       'text-darker',
" nref onclick='fm_install_deps(\"$install_link\", [\"$update_failed\", \"$update_ok\", \"$update_error\", \"$installing_text\"], this)'"
               ));
    }
}

print_json([\%data]);
