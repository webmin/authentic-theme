#
# Authentic Theme 17.84 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our %request_uri = get_request_uri();
set_module( $request_uri{'module'} );
get_libs( $request_uri{'module'} );

our %text = ( &load_language( $request_uri{'module'} ), %text );

sub set_module {
    my ($module) = @_;
    set_env('foreign_module_name', $module);
    set_env('foreign_root_directory', (get_env('document_root') . '/' . $module));

}

sub get_libs {
    my ($module) = @_;
    require (get_env('document_root') . '/' . $module . '/filemin-lib.pl');

    use Cwd 'abs_path';
    &ReadParse();

    get_paths();
    set_response();
    set_response_count();
}

sub get_request_uri {
    ( my $uri = get_env('request_uri') ) =~ s/\?/&/;
    my @r = split /&/, $uri;
    my %c;

    foreach (@r) {
        my ( $k, $v ) = split /=/, $_;
        $c{$k} = $v;
    }

    return %c;
}

sub head {
    print "Content-type: text/html\n\n";
}

sub set_response {
    my ($c) = @_;
    print "Set-Cookie: file-manager-response=" . $c . "; path=/\r\n";
}

sub set_response_count {
    my ($c) = @_;
    print "Set-Cookie: file-manager-response_count=" . $c . "; path=/\r\n";
}

sub paster {
    my ( $c, $f, $s, $d, $r, $m ) = @_;
    my $x;
    my $j = $c . '/' . $f;
    if ( !$r && -f $j ne -d $j ) {
        for ( my $t = 1; $t <= inf; $t += 1 ) {
            if ( !-e ( $j . '(' . $t . ')' ) ) {
                $x = $t;
                last;
            }
        }
    }
    if ( $m && index( $j, $s ) eq '0' ) {
        set_response('merr');
        return;
    }
    my ( $o, $e ) = copy_source_dest( $s, $j . ( !$x ? '' : '(' . $x . ')' ) );
    if ($x) {
        set_response('cc');
    }
    if ($m) {
        unlink_file($s);
    }

    return $e;

}

sub get_env {
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub set_env {
    my ($k, $v) = @_;
    $ENV{ uc($k) } = $v;
}

1;
