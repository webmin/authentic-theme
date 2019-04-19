#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.io>
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;
use lib (dirname(__FILE__) . '/../../lib');

use Cwd 'abs_path';
use Encode qw(decode encode);
use File::MimeInfo;
use File::Find;
use File::Grep qw( fdo );
use POSIX;

our (%access,           %in,            %text,       @remote_user_info, $base_remote_user,
     $config_directory, $current_theme, %userconfig, @allowed_paths,    $base,
     $cwd,              $path,          $remote_user);
our $checked_path;

our %request_uri = get_request_uri();
set_module($request_uri{'module'});
get_libs($request_uri{'module'});

sub set_module
{
    my ($module) = @_;
    set_env('foreign_module_name', $module);
    set_env('foreign_root_directory', (get_env('document_root') . '/' . $module));
}

sub get_libs
{
    my ($module) = @_;

    require(get_env('document_root') . '/' . $module . '/' . $module . '-lib.pl');

    &ReadParse();

    get_paths();

    switch_to_user($in{'username'});

    $checked_path = $path;
    if (join(" , ", @allowed_paths) ne '/') {
        $checked_path =~ s/$in{'cwd'}\//\//ig;
    }

    %text = (load_language($current_theme), load_language($module), %text);
}

sub get_type
{
    my ($dir) = @_;
    if (-d $dir) {
        return 1;
    } else {
        return 0;
    }
}

sub get_errors
{
    my %errors = %{ $_[0] };

    if (scalar %errors) {
        return convert_to_json(\%errors);
    } else {
        return undef;
    }

}

sub get_request_uri
{
    (my $uri = get_env('request_uri')) =~ s/\?/&/;
    my @r = split /&/, $uri;
    my %c;

    foreach (@r) {
        my ($k, $v) = split /=/, $_;
        $c{$k} = $v;
    }

    return %c;
}

sub get_user_config
{
    my ($k) = @_;

    my %t;
    read_file("$config_directory/$current_theme/settings-$remote_user", \%t);

    if ($k) {
        my $v = $t{$k};
        $v =~ s/'|;//g;
        return $v;
    } else {
        my %c = map {(my $v = $t{$_}) =~ s/'|;//g; $_ => $v} keys %t;
        return %c;
    }
}

sub kill_previous
{
    my $pid = get_token($_[0]);
    if ($pid) {
        kill(9, $pid);
    }
    set_token($_[0], $_[1]);
}

sub set_token
{
    my ($key, $value) = @_;
    my %var;

    $key =~ tr/A-Za-z0-9//cd;
    $var{$key} = $value;
    write_file(tempname('.theme_' . get_product_name() . '_' . $key . '_' . $remote_user), \%var);
}

sub get_token
{
    my ($key) = @_;

    $key =~ tr/A-Za-z0-9//cd;

    my $tmp_file = tempname('.theme_' . get_product_name() . '_' . $key . '_' . $remote_user);

    my %theme_temp_data;
    read_file($tmp_file, \%theme_temp_data);
    unlink_file($tmp_file);
    return $theme_temp_data{$key};
}

sub string_starts_with
{
    return substr($_[0], 0, length($_[1])) eq $_[1];
}

sub string_ends_with
{
    my $length = length($_[1]);
    return substr($_[0], -$length, $length) eq $_[1];
}

sub get_pagination
{

    my ($page, $pages, $query) = @_;

    our ($path);

    my $search_follow_symlinks  = $in{'follow'};
    my $search_case_insensitive = $in{'caseins'};
    my $search_grep             = $in{'grepstring'};
    my $all_items               = $in{'all_items'};

    my $left  = $page - 2;
    my $right = $page + 3;
    my @range;
    my $last;
    my $pagination;
    my $invisible = $pages == 1 ? ' invisible' : undef;

    my $start = sub {
        my $start;
        my $disabled = ($page == 1 ? " disabled" : undef);

        $start = "<div class=\"dataTables_paginate paging_simple_numbers spaginates$invisible\">";
        $start .= '<ul class="pagination">';
        $start .= "<li class='paginate_button previous$disabled'>";
        $start .= '<a href="#"><i class="fa fa-fw fa-angle-left"></i></a>';
        $start .= "</li>";
        return $start;
    };

    my $current = sub {
        my ($i) = @_;
        my $end;
        my $active = ($page eq $i ? " active" : undef);
        $end = "<li class='paginate_button$active'>";
        $end .=
"<a class='spaginated' href='list.cgi?page=$i&path=@{[urlize($path)]}&query=@{[urlize($query)]}&follow=$search_follow_symlinks&caseins=$search_case_insensitive&grepstring=$search_grep&all_items=$all_items'>$i</a>";
        $end .= "</li>";
        return $end;
    };

    my $range = sub {
        my $range;
        $range = '<li class="paginate_button disabled">';
        $range .= '<a href="#">…</a>';
        $range .= "</li>";

    };

    my $end = sub {
        my $end;
        my $disabled = ($page == $pages ? " disabled" : undef);
        $end = "<li class='paginate_button next$disabled'>";
        $end .= '<a href="#"><i class="fa fa-fw fa-angle-right"></i></a>';
        $end .= "</li>";
        $end .= '</ul>';
        $end .= '</div>';
        return $end;
    };

    for (my $i = 1; $i <= $pages; $i++) {
        if ($i == 1 || $i == $pages || $i >= $left && $i < $right) {
            push(@range, $i);
        }
    }

    foreach my $i (@range) {
        if ($last) {
            if ($i - $last == 2) {
                $pagination .= &$current($last + 1);
            } elsif ($i - $last != 1) {
                $pagination .= &$range();
            }
        }
        $pagination .= &$current($i);
        $last = $i;
    }

    $pagination = &$start() . $pagination . &$end();
    return $pagination;
}

sub test_all_items_query
{
    return $in{'all_items'} eq '3' ? 3 : 0;
}

sub get_entries_list
{
    my @entries_list;
    if (test_all_items_query()) {
        if ($in{'query'}) {
            @entries_list = exec_search('list');
        } else {
            find(
                {
                   wanted => sub {
                       my $found = $File::Find::name;
                       push(@entries_list, $_);
                   },
                },
                $cwd);
            @entries_list = grep {$_ ne '.' && $_ ne '..'} @entries_list;
        }
    } else {
        @entries_list = split(/\0/, $in{'name'});
    }
    return @entries_list;
}

sub head
{
    print "Content-type: text/html\n\n";
}

sub extra_query
{
    my $page       = $in{'page'};
    my $query      = $in{'query'};
    my $paginate   = $in{'paginate'};
    my $follow     = $in{'follow'};
    my $caseins    = $in{'caseins'};
    my $grepstring = $in{'grepstring'};
    my $all_items  = $in{'all_items'};
    return
"&page=$page&query=$query&paginate=$paginate&follow=$follow&caseins=$caseins&grepstring=$grepstring&all_items=$all_items";
}

sub set_response
{
    my ($c) = @_;
    print "Set-Cookie: file-manager-response=" . $c . "; path=/\r\n";
}

sub set_response_count
{
    my ($c) = @_;
    print "Set-Cookie: file-manager-response_count=" . $c . "; path=/\r\n";
}

sub fatal_errors
{
    my @errors = @_;

    head();
    print $text{'errors_occured'};
    print "<ul>";
    foreach my $error (@errors) {
        print("<li>$error</li>");
    }
    print "</ul>";
}

sub print_error
{
    my ($err_msg) = @_;
    my %err;
    $err{'error'} = $err_msg;
    print_json([\%err]);
    exit;

}

sub exec_search
{
    my ($list)  = @_;
    my $mask    = $in{'query'};
    my $grep    = $in{'grepstring'};
    my $replace = $in{'grepreplace'};
    my $caseins = $in{'caseins'};
    my $follow = ($in{'follow'} ? 1 : 0);

    my @results;

    find(
        {
           wanted => sub {
               my $found = $File::Find::name;
               if ($found ne $path) {
                   my $found_text = $_;
                   my $mask_text  = $mask;
                   if ($caseins) {
                       $found_text = lc($found_text);
                       $mask_text  = lc($mask_text);
                   }
                   if (index($found_text, $mask_text) != -1) {
                       if ($list) {
                           $found = $_;
                       } else {
                           $found =~ s/^\Q$cwd\E//g;
                       }
                       push(@results, $found);
                   }

               }
           },
           follow      => $follow,
           follow_skip => 2,
        },
        $cwd);

    my @replaces;
    if (length $grep || length $replace) {
        if (length $grep) {
            @results = map {&simplify_path("$cwd/$_")} @results;
            my @matched;
            fdo {
                my ($file, $line, $text) = @_;
                if (index($text, $grep) != -1) {
                    push(@replaces, $results[$file]);

                    $results[$file] =~ s/^\Q$cwd\E//g;
                    push(@matched, $results[$file]);
                }
            }
            @results;
            undef(@results);
            @results = @matched;

        }
        if (length $replace) {
            foreach my $file (@replaces) {
                if ($caseins) {
                    (my $fc = read_file_contents($file)) =~ s/\Q$grep\E/$replace/gi;
                    write_file_contents($file, $fc);
                } else {
                    (my $fc = read_file_contents($file)) =~ s/$grep/$replace/g;
                    write_file_contents($file, $fc);
                }
            }
        }
    }
    return @results;
}

sub server_pagination_enabled
{
    my ($totals, $max_allowed, $query) = @_;
    return ($totals > $max_allowed || ($query && $totals));
}

sub print_content
{
    my %list_data;
    my $query = $in{'query'};

    unless (opendir(DIR, $cwd)) {
        print_error("$text{'theme_global_error'}: <tt>`$cwd`</tt>- $!.");
        exit;
    }

    my @list = grep {$_ ne '.' && $_ ne '..'} readdir(DIR);
    closedir(DIR);

    # In case of search trim the list accordingly
    if ($query) {
        @list = exec_search();
    }

    # Filter out not allowed entries
    if ($remote_user_info[0] ne 'root' && $allowed_paths[0] ne '$ROOT') {

        # Leave only allowed
        my @tmp_list;
        for $path (@allowed_paths) {
            my $slashed = $path;
            $slashed .= "/" if ($slashed !~ /\/$/);
            push @tmp_list, grep {
                string_starts_with($slashed, "$cwd/$_/") ||
                  index($slashed, $_) != -1 ||
                  index("$cwd/$_", $slashed) != -1
            } @list;
        }

        # Remove duplicates
        my %hash = map {$_, 1} @tmp_list;
        @list = keys %hash;
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

    if (server_pagination_enabled($totals, $max_allowed, $query)) {
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

    @list = map {&simplify_path("$cwd/$_")} @list;

    my $setype = get_selinux_command_type();
    my %secontext;
    my %attributes;

    # List attributes
    if ($userconfig{'columns'} =~ /attributes/ && get_attr_status()) {
        my $command =
          get_attr_command() . join(' ', map {quotemeta("$_")} @list);
        my $output = `$command`;
        my @attributesArr =
          map {[split(/\s+/, $_, 2)]} split(/\n/, $output);
        %attributes = map {$_->[1] => ('<span data-attributes="s">' . $_->[0] . '</span>')} @attributesArr;
    }

    # List security context
    if ($userconfig{'columns'} =~ /selinux/ && get_selinux_status()) {
        my $command =
          get_selinux_command() . join(' ', map {quotemeta("$_")} @list);
        my $output = `$command`;
        (!$setype && ($output =~ s/\n//g, $output =~ s/,\s/,/g));
        my $delimiter = ($setype ? '\n' : ',');
        my @searray =
          map {[split(/\s+/, $_, 2)]} split(/$delimiter/, $output);
        %secontext =
          map {$_->[1] => ($_->[0] eq "?" ? undef : ('<span data-secontext>' . $_->[0] . '</span>'))} @searray;
    }

    # Get info about directory entries
    my @info = map {[$_, lstat($_), &mimetype($_), -d, -l $_, $secontext{$_}, $attributes{$_}]} @list;
    my @folders = map {$_} grep {$_->[15] == 1} @info;
    my @files   = map {$_} grep {$_->[15] != 1} @info;

    if (server_pagination_enabled($totals, $max_allowed, $query)) {
        undef(@list);
        push(@list, @info);
    } else {
        @folders = sort {$a->[0] cmp $b->[0]} @folders;
        @files   = sort {$a->[0] cmp $b->[0]} @files;
        undef(@list);
        push(@list, @folders, @files);
    }

    my $info_total;
    my $info_files   = scalar(@files);
    my $info_folders = scalar(@folders);

    my @allowed_for_edit = split(/\s+/, $access{'allowed_for_edit'});
    my %allowed_for_edit = map {$_ => 1} @allowed_for_edit;

    # Set icons variables
    my $edit_icon    = "<i class='fa fa-edit' alt='$text{'edit'}'></i>";
    my $rename_icon  = "<i class='fa fa-font' title='$text{'rename'}'></i>";
    my $extract_icon = "<i class='fa fa-external-link' alt='$text{'extract_archive'}'></i>";
    my $goto_icon    = "<i class='fa fa-arrow-right' alt='$text{'goto_folder'}'></i>";

    my $server_pagination = undef;
    $list_data{'pagination_limit'} = undef;

    if (server_pagination_enabled($totals, $max_allowed, $query)) {
        $page = int($in{'page'}) || 1;
        $pagelimit = int($in{'paginate'}) || int($tuconfig_per_page) || 30;
        $pages = ceil(($totals) / $pagelimit);
        if ($page > $pages) {
            $page = $pages;
            $in{'page'} = $page;
        }
        $server_pagination = get_pagination($page, $pages, $query);
        $list_data{'pagination_limit'} = $in{'paginate'} || undef;

        my $pagination_text = $text{'theme_xhred_datatable_sinfo'};
        my $start           = $page * $pagelimit - $pagelimit + 1;
        my $end             = $page * $pagelimit;
        if ($end > $totals) {
            $end = $totals;
        }
        $pagination_text =~ s/_START_/$start/ig;
        $pagination_text =~ s/_END_/$end/ig;
        $pagination_text =~ s/_TOTAL_/$totals/ig;
        $list_data{'pagination_text'} = $pagination_text;
    }

    $list_data{'pagination'} = $server_pagination;
    my $total_with_pagination;
    if ($server_pagination) {
        $total_with_pagination = "_paginated";
    }

    if ($info_files eq 1 && $info_folders eq 1) {
        $info_total = ('filemanager_global_info' . $total_with_pagination . '_total1');
    } elsif ($info_files ne 1 && $info_folders eq 1) {
        $info_total = ('filemanager_global_info' . $total_with_pagination . '_total2');
    } elsif ($info_files eq 1 && $info_folders ne 1) {
        $info_total = ('filemanager_global_info' . $total_with_pagination . '_total3');
    } else {
        $info_total = ('filemanager_global_info' . $total_with_pagination . '_total4');
    }
    $list_data{'total'} = "<div class='total'>"
      .
      ( $query ? ($text{'filemanager_global_search_results'} . ": ") :
          ($server_pagination ? ($text{'filemanager_global_paginated_results'} . ": ") : undef)
      ) .
      "" . text($info_total, $info_files, $info_folders, $totals, $pages) . "</div>";

    # Render current directory entries
    $list_data{'form'} = &ui_form_start("", "post", undef, "id='list_form'");

    my @ui_columns = ('<input class="_select-unselect_" type="checkbox" onclick="selectUnselect(this)" />', '');
    push @ui_columns, ('<span data-head-name>' . $text{'name'} . '</span>');
    push @ui_columns, ('<span data-head-type>' . $text{'type'} . '</span>')
      if ($userconfig{'columns'} =~ /type/);
    push @ui_columns, ('<span data-head-actions>' . $text{'actions'} . '</span>');
    push @ui_columns, ('<span data-head-size>' . $text{'size'} . '</span>')
      if ($userconfig{'columns'} =~ /size/);
    push @ui_columns, ('<span data-head-owner_user>' . $text{'ownership'} . '</span>')
      if ($userconfig{'columns'} =~ /owner_user/);
    push @ui_columns, ('<span data-head-permissions>' . $text{'permissions'} . '</span>')
      if ($userconfig{'columns'} =~ /permissions/);
    push @ui_columns, ('<span data-head-attributes>' . $text{'attributes'} . '</span>')
      if (get_attr_status() && $userconfig{'columns'} =~ /attributes/);
    push @ui_columns, ('<span data-head-selinux>' . $text{'selinux'} . '</span>')
      if (get_selinux_status() && $userconfig{'columns'} =~ /selinux/);
    push @ui_columns, ('<span data-head-last_mod_time>' . $text{'last_mod_time'} . '</span>')
      if ($userconfig{'columns'} =~ /last_mod_time/);

    $list_data{'rows'} = '';
    for (my $count = 1; $count <= $totals_spliced; $count++) {
        if ($count > $totals) {last;}
        my $class = $count & 1 ? "odd" : "even";
        my $link = $list[$count - 1][0];
        $link =~ s/\Q$cwd\E\///;
        $link =~ s/^\///g;
        my $vlink = html_escape($link);
        $vlink = decode('UTF-8', $vlink, Encode::FB_DEFAULT);
        my $hlink = html_escape($vlink);
        $path = html_escape($path);

        my $type = $list[$count - 1][14];
        $type =~ s/\//\-/g;
        my $img = "images/icons/mime/$type.png";
        unless (-e $request_uri{'module'} . '/' . $img) {
            $img = "images/icons/mime/unknown.png";
        }

        my $actions =
"<a class='action-link' href='javascript:void(0)' onclick='renameDialog(\"$hlink\")' title='$text{'rename'}' data-container='body'>$rename_icon</a>";
        my $href;
        my $is_archive = 0;
        my $is_file    = 1;
        my $is_gpg     = 0;
        if ($list[$count - 1][15] == 1) {
            $is_file = 0;
            if ($path eq '/' . $link) {
                $href = "index.cgi?path=" . &urlize("$path");
            } else {
                $href = "index.cgi?path=" . &urlize("$path/$link");
            }
        } else {
            my ($fname, $fpath, $fsuffix) =
              fileparse($list[$count - 1][0]);
            if ($base ne '/') {
                $fpath =~ s/^\Q$base\E//g;
            }
            $href = "download.cgi?file=" . &urlize($link) . "&path=" . &urlize($fpath);
            if ($0 =~ /search.cgi/) {
                $actions =
                  "$actions<a class='action-link' " .
                  "href='index.cgi?path=" . &urlize($fpath) . "' " . "title='$text{'goto_folder'}'>$goto_icon</a>";
            }
            if ($type =~ /text-/ or
                exists($allowed_for_edit{$type}))
            {
                $actions =
                  "$actions<a class='action-link' href='edit_file.cgi?file=" . &urlize($link) .
                  "&path=" . &urlize($path) . "' title='$text{'edit'}' data-container='body'>$edit_icon</a>";
            }
            my $type_archive = $type;
            if (string_ends_with($link, '.gpg') || string_ends_with($link, '.pgp')) {
                my $link_gpg = $link;
                $link_gpg =~ s/\.(gpg|pgp)$//;
                $type_archive = mimetype($link_gpg);
                $is_gpg       = 1;
            }
            if (($type_archive =~ /application-zip/ && has_command('unzip')) ||
                ($type_archive =~ /application-x-7z-compressed/ &&
                    has_command('7z')) ||
                ($type_archive =~ /application-x-rar|application-vnd\.rar/ &&
                    (has_command('unrar') || has_command('unar'))) ||
                ($type_archive =~ /application-x-rpm/ &&
                    has_command('rpm2cpio') &&
                    has_command('cpio')) ||
                ($type_archive =~ /application-x-deb/ &&
                    has_command('dpkg'))
                ||
                (
                    ($type_archive =~ /x-compressed-tar/ || $type_archive =~ /-x-tar/ ||
                     ($type_archive =~ /-x-bzip/ &&
                         has_command('bzip2')) ||
                     ($type_archive =~ /-gzip/ &&
                         has_command('gzip')) ||
                     ($type_archive =~ /-x-xz/ &&
                         has_command('xz'))
                    ) &&
                    has_command('tar')))
            {
                $is_archive = 1;
                $actions =
                  "$actions <a class='action-link' href='extract.cgi?path=" . &urlize($path) .
                  "&file=" . &urlize($link) . "' title='$text{'extract_archive'}' data-container='body'>$extract_icon</a> ";
            }
        }
        my @row_data = ("<a href='$href' data-filemin-link=\"$hlink\"><img src=\"$img\"></a>",
                        "<a href=\"$href\" data-filemin-link=\"$hlink\">$vlink</a>");
        my @td_tags = (undef,
                       'class="col-icon"',
                       'class="col-name" data-xarchive="' .
                         $is_archive . '" data-xfile="' . $is_file . '" data-gpg="' . $is_gpg . '"');
        if ($userconfig{'columns'} =~ /type/) {
            push(@row_data, $type);
            push(@td_tags,  'class="col-type"');
        }
        push @row_data, $actions;
        push(@td_tags, 'class="col-actions"');

        if ($userconfig{'columns'} =~ /size/) {
            my $size = &local_nice_size($list[$count - 1][8]);
            push @row_data,
              (
"<span data-toggle=\"tooltip\" data-html=\"true\" data-title=\"$text{'theme_xhred_filemanager_global_size_in_bytes'}<br>@{[nice_number($list[$count - 1][8])]}\">"
                  . $size . "</span>");
            push(@td_tags, undef);
        }
        if ($userconfig{'columns'} =~ /owner_user/) {
            my $user;
            my $group;
            if (supports_users()) {
                my $uid = getpwuid($list[$count - 1][5]);
                my $gid = getgrgid($list[$count - 1][6]);
                $user  = $uid ? $uid : $list[$count - 1][5];
                $group = $gid ? $gid : $list[$count - 1][6];
            } else {
                $user  = $list[$count - 1][5];
                $group = $list[$count - 1][6];
            }
            push @row_data,
              (
"<span data-toggle=\"tooltip\" data-html=\"true\" data-title=\"$text{'filemanager_global_user_group_id'}<br>$list[$count - 1][5]:$list[$count - 1][6]\">"
                  . $user . ':' . $group . "</span>");
            push(@td_tags, 'class="col-ownership"');
        }

        if ($userconfig{'columns'} =~ /permissions/) {
            my $permissions = sprintf("%04o", $list[$count - 1][3] & 07777);
            push @row_data, $permissions;
            push(@td_tags, 'class=col-permissions');
        }

        if (get_attr_status() && $userconfig{'columns'} =~ /attributes/) {
            push @row_data, $list[$count - 1][18];
            push(@td_tags, 'class="col-attrs"');
        }
        if (get_selinux_status() && $userconfig{'columns'} =~ /selinux/) {
            push @row_data, $list[$count - 1][17];
            push(@td_tags, 'class="col-selinux"');
        }

        if ($userconfig{'columns'} =~ /last_mod_time/) {
            my $access_time = POSIX::strftime('%Y/%m/%d - %T', localtime($list[$count - 1][9]));
            my $mod_time    = POSIX::strftime('%Y/%m/%d - %T', localtime($list[$count - 1][10]));
            my $change_time = POSIX::strftime('%Y/%m/%d - %T', localtime($list[$count - 1][11]));
            push @row_data,
              (
"<span data-toggle=\"tooltip\" data-html=\"true\" data-title=\"$text{'filemanager_global_access_change_time'}<br>$access_time<br>$change_time\">"
                  . $mod_time . "</span>");
            push(@td_tags, 'class="col-time"');
        }

        $list_data{'rows'} .= &ui_checked_columns_row(\@row_data, \@td_tags, "name", $vlink);
    }

    $list_data{'form'} .= &ui_hidden("path", $path), "\n";
    $list_data{'form'} .= '</form>';
    $list_data{'success'}     = (length $in{'success'}     ? $in{'success'}     : undef);
    $list_data{'error'}       = (length $in{'error'}       ? $in{'error'}       : undef);
    $list_data{'error_fatal'} = (length $in{'error_fatal'} ? $in{'error_fatal'} : undef);
    $list_data{'output'}      = (length $in{'output'}      ? $in{'output'}      : undef);
    $list_data{'page_requested'}       = $page;
    $list_data{'pagination_requested'} = $in{'paginate'};
    $list_data{'totals'}               = $totals;
    $list_data{'searched'}             = $query ? 1 : 0;
    $list_data{'flush'}                = test_all_items_query() ? 1 : 0;
    $list_data{'flush_reset'}          = $in{'flush_reset'} ? 1 : 0;

    print_json([\%list_data]);
}

sub get_tree
{
    my ($p, $d, $e) = @_;
    my $df = int($d);
    my %r;
    my @r;

    my $wanted = sub {
        my $td = $File::Find::name;
        if (-d $td && !-l $td) {
            $td =~ s|^\Q$p\E/?||;
            if ($r{$td} || !$td) {
                return;
            }
            my ($pd, $cd) = $td =~ m|^ (.+) / ([^/]+) \z|x;
            my $pp = $p ne '/' ? $p : undef;
            my $c = $r{$td} =
              { key => html_escape("$pp/$td"), title => (defined($cd) ? html_escape($cd) : html_escape($td)) };
            defined $pd ? (push @{ $r{$pd}{children} }, $c) : (push @r, $c);
        }
    };
    my $preprocess = sub {
        my $td = $File::Find::name;
        my $d  = $td =~ tr[/][];

        if ($e && $p eq "/" && $d == 1) {
            if ($td =~ /^\/(cdrom|dev|lib|lost\+found|mnt|proc|run|snaps|sys|tmp|.trash)/i) {
                return;
            }
        }
        my $dd = ($df > 0 ? ($df + 1) : 0);
        if ($dd) {
            if ($d < $dd) {
                return sort @_;
            }
            return;
        }
        sort @_;
    };
    find(
         {  wanted     => $wanted,
            preprocess => $preprocess
         },
         $p);
    return \@r;
}

sub local_nice_size
{
    # my %text = (load_language($current_theme), %text);
    my ($units, $uname);
    if (abs($_[0]) > 1024 * 1024 * 1024 * 1024 * 1024 || $_[1] >= 1024 * 1024 * 1024 * 1024 * 1024) {
        $units = 1024 * 1024 * 1024 * 1024 * 1024;
        $uname = $text{'theme_nice_size_PB'};
    } elsif (abs($_[0]) > 1024 * 1024 * 1024 * 1024 || $_[1] >= 1024 * 1024 * 1024 * 1024) {
        $units = 1024 * 1024 * 1024 * 1024;
        $uname = $text{'theme_nice_size_TB'};
    } elsif (abs($_[0]) > 1024 * 1024 * 1024 || $_[1] >= 1024 * 1024 * 1024) {
        $units = 1024 * 1024 * 1024;
        $uname = $text{'theme_nice_size_GB'};
    } elsif (abs($_[0]) > 1024 * 1024 || $_[1] >= 1024 * 1024) {
        $units = 1024 * 1024;
        $uname = $text{'theme_nice_size_MB'};
    } elsif (abs($_[0]) > 1024 || $_[1] >= 1024) {
        $units = 1024;
        $uname = $text{'theme_nice_size_kB'};
    } else {
        $units = 1;
        $uname = $text{'theme_nice_size_b'};
    }
    my $sz = sprintf("%.2f", ($_[0] * 1.0 / $units));
    $sz =~ s/\.00$//;
    return '<span data-filesize-bytes="' . $_[0] . '">' . ($sz . " " . $uname) . '</span>';
}

sub nice_number
{
    my ($number) = @_;
    $number =~ s/(\d)(?=(\d{3})+(\D|$))/$1\ /g;
    return $number;
}

sub paster
{
    my ($c, $f, $s, $d, $r, $m) = @_;
    my $x;
    my $j = $c . ($f =~ m/^\// ? undef : '/') . $f;
    if (!$r && -f $j ne -d $j) {
        for (my $t = 1;; $t += 1) {
            my ($jn, $je) = $j =~ /(.*)\.(.*)/;
            if (!-e ($jn . '(' . $t . ')' . ".$je") && (!-e ($j . '(' . $t . ')'))) {
                $x = $t;
                last;
            }
        }
    }
    $s =~ s/\/\//\//g;
    if ($m && -d $j && $j =~ /^\Q$s\E/) {
        set_response('merr');
        return;
    }
    if (-d $j) {
        $j = $j . (!$x ? '' : '(' . $x . ')');
    } else {
        my ($jn, $je) = $j =~ /(.*)\.(.*)/;
        if ($je) {
            $j = $jn . (!$x ? '' : '(' . $x . ')') . ".$je";
        } else {
            $j = $j . (!$x ? '' : '(' . $x . ')');
        }
    }
    my ($o, $e) = copy_source_dest($s, $j);
    if ($x) {
        set_response('cc');
    }
    if ($m) {
        unlink_file($s);
    }

    return $e;

}

sub get_gpg_version() {
    my ($gpgpath) = @_;
    if (!$gpgpath) {
        $gpgpath = "gpg";
    }
    my $gpg = quotemeta($gpgpath);
    $gpg = `$gpg --version`;
    $gpg =~ /(\*|\d+(\.\d+){0,2})/;
    return $1;
}

sub switch_to_user
{
    if (!supports_users()) {
        return undef;
    }
    my ($username) = @_;
    my @uinfo = getpwnam($username);
    if (@uinfo) {
        switch_to_unix_user(\@uinfo);
    }
}

sub is_root
{
    return ($base_remote_user eq 'root' ? 1 : 0);
}

sub get_env
{
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub set_env
{
    my ($k, $v) = @_;
    $ENV{ uc($k) } = $v;
}

sub trim
{
    my $s = shift;
    $s =~ s/^\s+|\s+$//g;
    return $s;
}

1;
