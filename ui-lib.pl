#
# Authentic Theme (https://github.com/webmin/authentic-theme)
# Copyright Ilia Ross <ilia@webmin.dev>
# Licensed under MIT (https://github.com/webmin/authentic-theme/blob/master/LICENSE)
#
use strict;
use warnings;

# ui_http_header(name, value)
# Function to format a single HTTP header. Returns the formatted string with
# CRLF ending
sub ui_http_header
{
return theme_ui_http_header(@_) if (defined(&theme_ui_http_header));
my ($name, $value) = @_;
return "$name: $value\r\n";
}

# ui_tag_escape_quote(string, quote)
# Function to handle escaping of quotes in attribute values. If the input
# is a string, it will be escaped using the provided quote character (default
# is double quote). This is useful for HTML attributes where quotes need to
# be escaped to prevent breaking the HTML structure. If the input is an
# array reference, it will be treated as a raw value and not HTML escaped.
sub ui_tag_escape_quote
{
return theme_ui_tag_escape_quote(@_) if (defined(&theme_ui_tag_escape_quote));
my ($string, $quote) = @_;
my $escape = 1;     # Default is to quote escape the value

# Check if input is an array ref to allow unescaped value
($string, $escape) = ($string->[0], 0) if (ref($string) eq 'ARRAY');

# Escape the value if needed
$string = quote_escape($string, $quote || '"') if ($escape);

return $string;
}

# ui_tag_escape_value(string|array-ref)
# Function to handle escaping of values inside open HTML tag. If the input is
# an array reference, it will be treated as a raw value and not HTML escaped.
sub ui_tag_escape_value
{
return theme_ui_tag_escape_value(@_) if (defined(&theme_ui_tag_escape_value));
my ($input) = @_;
my $escape = 1;     # Default is to HTML escape the value

# Check if input is an array ref to allow unescaped value
($input, $escape) = ($input->[0], 0) if (ref($input) eq 'ARRAY');

# Escape the value if needed
$input = html_escape($input) if ($escape);

return $input;
}

# ui_tag_start(tag, [attrs])
# Function to create an opening HTML tag with optional attributes.
# Attributes are passed as a hash reference and its values are quote escaped.
sub ui_tag_start
{
return theme_ui_tag_start(@_) if (defined(&theme_ui_tag_start));
my ($tag, $attrs) = @_;

# Start building tag
my $rv = "<$tag";

# Add attributes if provided
if ($attrs && ref($attrs) eq 'HASH') {
	foreach my $key (keys %$attrs) {
		my $value = $attrs->{$key};
		if (defined($value)) {
			$value = ui_tag_escape_quote($value);
			$value =~ tr/\n\t//d;
			$value =~ s/\s+/ /g;
			$rv .= " $key=\"$value\"" ;
			}
		elsif ($key) {
			$rv .= " $key";
			}
		}
	}

# Close the opening tag
$rv .= ">\n";

# Handle special case for <html> tag
$rv = "<!DOCTYPE html>\n$rv" if ($tag eq 'html');

return $rv;
}

# ui_tag_content(content|array-ref)
# Function to handle the content of an HTML tag. If the input is an array
# reference, it will be treated as a raw value and not HTML escaped.
sub ui_tag_content
{
return theme_ui_tag_content(@_) if (defined(&theme_ui_tag_content));
my ($content) = @_;
my $rv;
$rv = ui_tag_escape_value($content)."\n" if (defined($content));
return $rv;
}


# ui_tag_end(tag)
# Function to create a closing HTML tag.
sub ui_tag_end
{
return theme_ui_tag_end(@_) if (defined(&theme_ui_tag_end));
my ($tag) = @_;
return "</$tag>\n";
}

# ui_tag(tag, [content], [attrs])
# Function to create a complete HTML tag with optional content and attributes.
# If content is an array reference, it will be treated as a raw value and not
# HTML escaped. Self-closing tags are handled automatically and do not require
# a closing tag.
sub ui_tag
{
return theme_ui_tag(@_) if (defined(&theme_ui_tag));
my ($tag, $content, $attrs) = @_;
my $rv = ui_tag_start($tag, $attrs);
$rv .= ui_tag_content($content) if (defined($content));
my %void_tags = map { $_ => 1 }
	qw(
		area base br col embed hr img input link
		meta param source track wbr
	);
$rv .= ui_tag_end($tag) if (!exists($void_tags{lc($tag)}));
return $rv;
}

1;