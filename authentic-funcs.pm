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

sub product_version_update
{
    my ($v, $p) = @_;
    my ($wv, $uv, $vv, $cv, $fv) = ('1.872', '1.734', '6.02', '9.3', '11.06');

    if (($p eq "w" && $v < $wv) ||
        ($p eq "u" && $v < $uv) ||
        ($p eq "v" && $v < $vv) ||
        ($p eq "c" && $v < $cv) ||
        ($p eq "f" && $v < $fv))
    {
        return (
               '<span data-toggle="tooltip" data-placement="auto top" data-title="' . $Atext{'theme_xhred_global_outdated'} .
                 '" class="bg-danger text-danger pd-lf-2 pd-rt-2 br-2">' . $v . '</span>');
    } else {
        return $v;
    }
}

sub string_contains
{
    return (index($_[0], $_[1]) != -1);
}

sub string_starts_with
{
    my ($string, $search) = @_;
    if ($string =~ m/^\Q$search/) {
        return 1;
    } else {
        return 0;
    }
}

sub array_contains
{
    my ($array_reference, $search, $loose) = @_;
    return (!$loose ? (grep {$_ eq $search} @$array_reference) : (grep {index($_, $search) != -1} @$array_reference));
}

sub array_unique
{
    my @unique;
    my %seen;

    foreach my $value (@_) {
        if (!$seen{$value}++) {
            $value =~ tr/\r\n//d;
            push @unique, $value;
        }
    }
    return @unique;
}

1;
