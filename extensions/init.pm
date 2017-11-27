#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN {push(@INC, "..");}
use WebminCore;
use lib (dirname(__FILE__) . '/../lib');
use JSON qw( decode_json );

ReadParse();

our %config = ();
read_file_cached(get_env('webmin_config') . "/config", \%config);

sub get_env
{
    my ($key) = @_;
    return $ENV{ uc($key) };
}

sub get_env_local_path
{
    my ($system, $path) = @_;
    if ($system eq 'freebsd') {
        return "/usr/local/$path/";
    }

}

sub enforce_command
{
    my ($system, $command) = @_;
    if (!has_command($command)) {
        if ($system eq 'freebsd') {
            backquote_logged("pkg install -y $command 2>&1 </dev/null");
        }
    }
}

sub get_json
{
    return JSON->new->latin1->encode(@_);
}

sub print_json
{
    print "Content-type: text/html\n\n";
    print get_json(@_);
}

1;
