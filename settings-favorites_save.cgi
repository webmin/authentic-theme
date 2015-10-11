#!/usr/bin/perl

#
<<<<<<< HEAD
# Authentic Theme 17.00 (https://github.com/qooob/authentic-theme)
=======
# Authentic Theme 16.01 (https://github.com/qooob/authentic-theme)
>>>>>>> 26c36195a7bc42a58e36b30aed57642ba4b432c4
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&init_config();
&ReadParse();
#&switch_to_remote_user();

print "Content-type: text/html\n\n";

do "authentic-theme/authentic-lib.cgi";
__config_dir_available();

our ($in);

$in =~ s/\t\n\r//g;
$in =~ /\{(?:\{.*\}|[^{])*\}/sg;
my $file    = $config_directory . '/authentic-theme/favorites.json';
my $content = $in;

unlink_file($file);
write_file_contents( $file, $content );
