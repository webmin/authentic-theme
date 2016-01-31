#!/usr/bin/perl

#
# Authentic Theme 17.61 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

BEGIN { push( @INC, ".." ); }
use WebminCore;
&ReadParse();
&init_config();

use lib 'authentic-theme/lib';
use JSON qw( decode_json );

do "authentic-theme/authentic-lib.cgi";

&authentic();
