#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Alexandr Bezenkov (https://github.com/real-gecko/filemin)
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our %request_uri = get_request_uri();
set_module($request_uri{'module'});
get_libs($request_uri{'module'});

our %text = (load_language($current_theme), %text);
our %text = (load_language($request_uri{'module'}), %text);

our $checked_path;

sub set_module
{
    my ($module) = @_;
    set_env('foreign_module_name', $module);
    set_env('foreign_root_directory', (get_env('document_root') . '/' . $module));
}

sub get_libs
{
    my ($module) = @_;

    use Cwd 'abs_path';
    use Encode qw(decode encode);
    use File::Basename;
    use File::MimeInfo;
    use POSIX;
    use JSON qw( decode_json );

    require(get_env('document_root') . '/' . $module . '/filemin-lib.pl');

    &ReadParse();

    get_paths();

    switch_to_user($in{'username'});

    if (!$in{'error'}) {
        set_response();
        set_response_count();
    }

    $checked_path = $path;
    if (join(" , ", @allowed_paths) ne '/') {
        $checked_path =~ s/$in{'cwd'}\//\//ig;
    }

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

sub get_json
{
    return JSON->new->latin1->encode(@_);
}

sub print_json
{
    head(), print get_json(@_);
}

sub get_errors
{
    my %errors = %{ $_[0] };

    if (scalar %errors) {
        return JSON->new->latin1->encode(\%errors);
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

sub head
{
    print "Content-type: text/html\n\n";
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
    foreach $error (@errors) {
        print("<li>$error</li>");
    }
    print "</ul>";
}

sub print_error
{
    my ($error) = @_;

    head();
    print $error;
    exit;

}

sub print_content
{

    my $setype = get_selinux_command_type();
    my %secontext;
    my %attributes;

    # Filter out not allowed entries
    if ($remote_user_info[0] ne 'root' && $allowed_paths[0] ne '$ROOT') {

        # Leave only allowed
        for $path (@allowed_paths) {
            my $slashed = $path;
            $slashed .= "/" if ($slashed !~ /\/$/);
            push @tmp_list, grep {$slashed =~ /^$_\// || $_ =~ /$slashed/} @list;
        }

        # Remove duplicates
        my %hash = map {$_, 1} @tmp_list;
        @list = keys %hash;
    }

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
    @info = map {[$_, lstat($_), &mimetype($_), -d, -l $_, $secontext{$_}, $attributes{$_}]} @list;

    # Filter out folders
    @folders = map {$_} grep {$_->[15] == 1} @info;

    # Filter out files
    @files = map {$_} grep {$_->[15] != 1} @info;

    # Sort stuff by name
    @folders = sort {$a->[0] cmp $b->[0]} @folders;
    @files   = sort {$a->[0] cmp $b->[0]} @files;

    # Recreate list
    undef(@list);
    push @list, @folders, @files;

    @allowed_for_edit = split(/\s+/, $access{'allowed_for_edit'});
    %allowed_for_edit = map {$_ => 1} @allowed_for_edit;

    # Set icons variables
    $edit_icon    = "<i class='fa fa-edit' alt='$text{'edit'}'></i>";
    $rename_icon  = "<i class='fa fa-font' title='$text{'rename'}'></i>";
    $extract_icon = "<i class='fa fa-external-link' alt='$text{'extract_archive'}'></i>";
    $goto_icon    = "<i class='fa fa-arrow-right' alt='$text{'goto_folder'}'></i>";

    $page      = 1;
    $pagelimit = 4294967295;

    my $info_total;
    my $info_files   = scalar @files;
    my $info_folders = scalar @folders;

    if ($info_files eq 1 && $info_folders eq 1) {
        $info_total = 'filemanager_global_info_total1';
    } elsif ($info_files ne 1 && $info_folders eq 1) {
        $info_total = 'filemanager_global_info_total2';
    } elsif ($info_files eq 1 && $info_folders ne 1) {
        $info_total = 'filemanager_global_info_total3';
    } else {
        $info_total = 'filemanager_global_info_total4';
    }

    head();
    print '<!DOCTYPE html>';
    print '<html>';
    print '<head></head>';
    print '<body>';
    print "<div class='total'>" . text($info_total, $info_files, $info_folders) . "</div>";

    # Render current directory entries
    print &ui_form_start("", "post", undef, "id='list_form'");
    @ui_columns = ('<input id="select-unselect" type="checkbox" onclick="selectUnselect(this)" />', '');
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

    print &ui_columns_start(\@ui_columns);
    for (my $count = 1 + $pagelimit * ($page - 1); $count <= $pagelimit + $pagelimit * ($page - 1); $count++) {
        if ($count > scalar(@list)) {last;}
        my $class = $count & 1 ? "odd" : "even";
        my $link = $list[$count - 1][0];
        $link =~ s/\Q$cwd\E\///;
        $link =~ s/^\///g;
        $vlink = html_escape($link);
        $vlink = decode('UTF-8', $vlink, Encode::FB_DEFAULT);
        $hlink = html_escape($vlink);
        $path  = html_escape($path);

        my $type = $list[$count - 1][14];
        $type =~ s/\//\-/g;
        my $img = "images/icons/mime/$type.png";
        unless (-e $request_uri{'module'} . '/' . $img) {
            $img = "images/icons/mime/unknown.png";
        }
        $size = &nice_size($list[$count - 1][8]);
        $user =
          getpwuid($list[$count - 1][5]) ?
          getpwuid($list[$count - 1][5]) :
          $list[$count - 1][5];
        $group =
          getgrgid($list[$count - 1][6]) ?
          getgrgid($list[$count - 1][6]) :
          $list[$count - 1][6];
        $permissions = sprintf("%04o", $list[$count - 1][3] & 07777);

        if (get_selinux_status() && $userconfig{'columns'} =~ /selinux/) {
            $selinux = $list[$count - 1][17];
        }

        if (get_attr_status() && $userconfig{'columns'} =~ /attributes/) {
            $attributes = $list[$count - 1][18];
        }

        $mod_time = POSIX::strftime('%Y/%m/%d - %T', localtime($list[$count - 1][10]));

        $actions =
"<a class='action-link' href='javascript:void(0)' onclick='renameDialog(\"$hlink\")' title='$text{'rename'}' data-container='body'>$rename_icon</a>";

        if ($list[$count - 1][15] == 1) {
            if ($path eq '/' . $link) {
                $href = "index.cgi?path=" . &urlize("$path");
            } else {
                $href = "index.cgi?path=" . &urlize("$path/$link");
            }
        } else {
            ($fname, $fpath, $fsuffix) =
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
            if (($type =~ /application-zip/ && has_command('unzip')) ||
                ($type =~ /application-x-7z-compressed/ &&
                    has_command('7z')) ||
                ($type =~ /application-x-rar/ &&
                    has_command('unrar')) ||
                ($type =~ /application-x-rpm/ &&
                    has_command('rpm2cpio') &&
                    has_command('cpio')) ||
                ($type =~ /application-x-deb/ &&
                    has_command('dpkg'))
                ||
                (
                    ($type =~ /x-compressed-tar/ || $type =~ /-x-tar/ ||
                     ($type =~ /-x-bzip/ &&
                         has_command('bzip2')) ||
                     ($type =~ /-gzip/ &&
                         has_command('gzip')) ||
                     ($type =~ /-x-xz/ &&
                         has_command('xz'))
                    ) &&
                    has_command('tar')))
            {
                $actions =
                  "$actions <a class='action-link' href='extract.cgi?path=" . &urlize($path) .
                  "&file=" . &urlize($link) . "' title='$text{'extract_archive'}' data-container='body'>$extract_icon</a> ";
            }
        }
        @row_data = ("<a href='$href'><img src=\"$img\"></a>", "<a href=\"$href\" data-filemin-link=\"$hlink\">$vlink</a>");
        push @row_data, $type if ($userconfig{'columns'} =~ /type/);
        push @row_data, $actions;
        push @row_data, $size if ($userconfig{'columns'} =~ /size/);
        push @row_data, $user . ':' . $group
          if ($userconfig{'columns'} =~ /owner_user/);
        push @row_data, $permissions
          if ($userconfig{'columns'} =~ /permissions/);
        push @row_data, $attributes
          if (get_attr_status() && $userconfig{'columns'} =~ /attributes/);
        push @row_data, $selinux
          if (get_selinux_status() && $userconfig{'columns'} =~ /selinux/);
        push @row_data, $mod_time
          if ($userconfig{'columns'} =~ /last_mod_time/);
        print &ui_checked_columns_row(\@row_data, "", "name", $vlink);
    }
    print ui_columns_end();
    print &ui_hidden("path", $path), "\n";
    print '</form>';
    print '<div class="error_message">' . $in{'error'} . '</div>'
      if (length $in{'error'});
    print '<div class="error_fatal">' . $in{'error_fatal'} . '</div>'
      if (length $in{'error_fatal'});
    print '</body>';
    print '</html>';

}

sub paster
{
    my ($c, $f, $s, $d, $r, $m) = @_;
    my $x;
    my $j = $c . '/' . $f;
    if (!$r && -f $j ne -d $j) {
        for (my $t = 1; $t <= inf; $t += 1) {
            if (!-e ($j . '(' . $t . ')')) {
                $x = $t;
                last;
            }
        }
    }
    if ($m && $j =~ /\Q$s\E/) {
        set_response('merr');
        return;
    }
    my ($o, $e) = copy_source_dest($s, $j . (!$x ? '' : '(' . $x . ')'));
    if ($x) {
        set_response('cc');
    }
    if ($m) {
        unlink_file($s);
    }

    return $e;

}

sub switch_to_user
{
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
