#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our %request_uri = get_request_uri();
set_module();
get_libs();

our %text = (load_language($current_theme), %text);
%text = (load_language(get_module()), %text);

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

sub get_libs
{
    use File::Basename;
    use JSON qw( decode_json );

    require(dirname(__FILE__) . '/../../authentic-funcs.pm');
    require(get_env('document_root') . '/' . get_module() . '/' . get_module() . '-lib.pl');

    ReadParse();
}

sub get_module
{
    return ($request_uri{'module'} eq "mailboxes" ? "mailboxes" : "mailbox");
}

sub set_module
{
    my $module = get_module();
    set_env('foreign_module_name', $module);
    set_env('foreign_root_directory', (get_env('document_root') . '/' . $module));
}

sub get_json
{
    my (@obj) = @_;
    print "Content-type: application/json\n\n";

    if (scalar @_) {
        print JSON->new->latin1->encode(\@_);
    } else {
        print JSON->new->latin1->encode({});
    }
}

sub folders_title_unseen
{
    my ($folder, $count) = @_;
    $folder = $folder .= "<span class=\"label label-danger\">$count</span>" if $count;
    return $folder;
}

1;
