#
# Authentic Theme (https://github.com/qooob/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

sub get_text_ltr
{
    if ($current_lang_info && $current_lang_info->{'rtl'} eq "1") {
        return 0;
    } else {
        return 1;
    }

}

sub reverse_text
{
    my ($str, $delimiter) = @_;
    my @strings = reverse(split(/\Q$delimiter\E/, $str));
    return join(" " . $delimiter . " ", @strings);
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
    my ($from, $to, $string) = @_;
    $string =~ s/\Q$from\E/$to/ig;

    return $string;
}

1;
