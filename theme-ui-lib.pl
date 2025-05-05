# theme-ui-lib.pl
# UI library functions

use strict;
use warnings;
no warnings 'uninitialized';

our (%theme_text);

# format_http_header(name, value)
# Function to format a single HTTP header. Returns the formatted string with
# CRLF ending
sub format_http_header
{
return theme_format_http_header(@_) if (defined(&theme_format_http_header));
my ($name, $value) = @_;
return "$name: $value\r\n";
}

# ui_tag_start(tag, [attrs], [no-new-line])
# Function to create an opening HTML tag with optional attributes.
# Attributes are passed as a hash reference and its values are quote escaped.
sub ui_tag_start
{
return theme_ui_tag_start(@_) if (defined(&theme_ui_tag_start));
my ($tag, $attrs, $nnl) = @_;

# Ensure every tag gets a proper marker class
$attrs ||= {};
$attrs->{'class'} = defined($attrs->{class})
	? "ui--$tag $attrs->{class}"
	: "ui--$tag";

# Start building tag
my $rv = "<$tag";

# Add attributes if provided
if ($attrs && ref($attrs) eq 'HASH') {
	foreach my $key (keys %$attrs) {
		my $value = $attrs->{$key};
		if (defined($value)) {
			$value = &quote_escape($value, '"');
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
$rv .= $nnl ? ">" : ">\n";

# Handle special case for <html> tag
$rv = "<!DOCTYPE html>\n$rv" if ($tag eq 'html');

return $rv;
}

# ui_tag_content(content)
# Function to handle the content of an HTML tag.
sub ui_tag_content
{
return theme_ui_tag_content(@_) if (defined(&theme_ui_tag_content));
my ($content) = @_;
my $rv;
$rv = $content."\n" if (defined($content));
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
sub ui_tag
{
return theme_ui_tag(@_) if (defined(&theme_ui_tag));
my ($tag, $content, $attrs) = @_;
my $rv = ui_tag_start($tag, $attrs, !defined($content));
$rv .= ui_tag_content($content) if (defined($content));
my %void_tags = map { $_ => 1 }
	qw(
		area base br col embed hr img input link
		meta param source track wbr
	);
$rv .= ui_tag_end($tag) if (!exists($void_tags{lc($tag)}));
return $rv;
}

# ui_alert(content, type, [icon], [attrs])
# Generates an HTML alert with the specified content, type, and optional icon
# and attributes.
#
# Parameters:
#   content - The main message/body of the alert
#   type    - Alert style: "success", "info", "warning", "danger", "danger-fatal"
#   icon    - Optional. Controls icon and title display:
#             - If undefined: uses default icon and title for the alert type
#             - If string: uses as icon class with default title
#             - If array ref [icon, title, no_break]:
#               - icon: Icon class
#               - title: Custom title (if undef, uses default for type)
#               - no_break: If 1, no line break after title (space instead)
#   attrs   - Optional hash ref of additional HTML attributes for the alert div
#
# Examples:
#   ui_alert("Operation completed", "success");
#   ui_alert("Access denied", "danger", "fa-lock");
#   ui_alert("Settings changed", "info", ["fa-info-circle", "", 1]);
#   ui_alert("Server offline", "warning", undef, {id => "server-status"});
sub ui_alert
{
return theme_ui_alert(@_) if (defined(&theme_ui_alert));
my ($content, $type, $icon, $attrs) = @_;

# Default alert type
$type ||= 'info';

# Default icons and titles based on type
my %type_defaults = (
	'success' => {
		'icon' => 'fa-check-circle',
		'title' => $theme_text{'theme_global_success'}
	},
	'info' => {
		'icon' => 'fa-info-circle',
		'title' => $theme_text{'theme_global_info'}
	},
	'warning' => {
		'icon' => 'fa-exclamation-triangle',
		'title' => $theme_text{'theme_global_warning'}
	},
	'danger' => {
		'icon' => 'fa-bolt',
		'title' => $theme_text{'theme_xhred_global_error'}
	},
	'danger-fatal' => {
		'icon' => 'fa-exclamation-triangle',
		'title' => $theme_text{'theme_xhred_global_error_fatal'}
	}
);

my $use_icon = '';
my $use_title = '';
my $use_br = 1;  # Default to using line break

# Process icon parameter
if (!defined($icon)) {
	# Use defaults based on type
	if ($type_defaults{$type}) {
		$use_icon = $type_defaults{$type}{'icon'};
		$use_title = $type_defaults{$type}{'title'};
		}
	}
elsif (ref($icon)) {
	# Array format [icon_class, title, no_br]
	if (defined($icon->[0])) {
		$use_icon = $icon->[0];
		}
	else {
		$use_icon = $type_defaults{$type}{'icon'};
		}

	# Title: if provided use it, else use default for type
	if (defined($icon->[1])) {
		$use_title = $icon->[1];
		}
	elsif ($type_defaults{$type}) {
		$use_title = $type_defaults{$type}{'title'};
		}

	# Line break flag: 1 = no break, anything else = break
	$use_br = $icon->[2] ? 0 : 1 if (defined($icon->[2]));
	}
else {
	# String format: just the icon class
	$use_icon = $icon;
	$use_title = $type_defaults{$type} ? $type_defaults{$type}{'title'} : '';
	}

# Prepare attributes for the alert div
my $all_attrs = $attrs || {};

# Add alert class
my $class = 'alert';
$class .= ' alert-'.$type if ($type);

$all_attrs->{'class'} = $all_attrs->{'class'}
	? "$class $all_attrs->{'class'}"
	:  $class;

# Build alert
my $rv = '';

# Start alert container
$rv .= ui_tag_start('div', $all_attrs);

# Add icon and title if either is available
if ($use_icon || $use_title) {
	# Add icon if available
	if ($use_icon) {
		$rv .= ui_tag('i', undef, { 'class' => "fa fa-fw $use_icon" });
		$rv .= ' ';
		}

	# Add title if available
	if ($use_title) {
		$rv .= ui_tag('strong', $use_title);
		}

	# Add line break if needed
	if ($use_br) {
		$rv .= '<br>';
		}
	else {
		$rv .= ' ';
		}
	$rv .= "\n";
	}

# Add main content
$rv .= ui_tag_content($content);

# Close alert container
$rv .= ui_tag_end('div');

return $rv;
}

# ui_button_icon(text, icon, [attrs])
# Creates a button with an icon and text
# Parameters:
#   text    - The text/label for the button
#   icon    - Icon class
#   attrs   - Optional hash ref of additional HTML attributes
#
# Examples:
#   ui_button_icon("Save", "save", {class => "primary"})
#   ui_button_icon("Delete", "trash", {type => "submit", name => "delete"})
sub ui_button_icon
{
return theme_ui_button_icon(@_) if (defined(&theme_ui_button_icon));
my ($text, $icon, $attrs) = @_;

# Default to button type if not specified
my $all_attrs = $attrs || {};
$all_attrs->{'type'} ||= 'button';

# Button class
my $btn_cls = $all_attrs->{'class'};
$all_attrs->{'class'} = "btn " . ($btn_cls 
	? ($btn_cls =~ /^btn-/ ? $btn_cls
	: "btn-$btn_cls") : 'btn-default');

# Build the button
my $rv = ui_tag_start('button', $all_attrs);

# Add icon if specified
if ($icon) {
	my $icon_class = "";

	# Check if icon specifies a specific bundle (fa2)
	if ($icon =~ /^fa2-/) {
		$icon_class = "fa2 $icon";
		}
	# Check if it already has fa- prefix
	elsif ($icon =~ /^fa-/) {
		$icon_class = "fa $icon";
		}
	# Otherwise add the default fa- prefix
	else {
		$icon_class = "fa fa-$icon";
		}
	$rv .= ui_tag('i', undef, {'class' => $icon_class});
	$rv .= "&nbsp;&nbsp;";
	}

# Add text
$rv .= ui_tag_content($text) if defined($text);

# Close the button
$rv .= ui_tag_end('button');

return $rv;
}

# ui_link_icon(href, text, [icon], [attrs])
# Creates a link with an icon and text
# Parameters:
#   href    - The URL for the link
#   text    - The text/label for the link
#   icon    - Icon class
#   attrs   - Optional hash ref of additional HTML attributes
#
# Examples:
#   ui_link_icon("view.cgi?id=1", "View Details", "eye", {class => "primary"})
#   ui_link_icon("docs.html", "Documentation", "book", {target => "_blank"})
sub ui_link_icon
{
return theme_ui_link_icon(@_) if (defined(&theme_ui_link_icon));
my ($href, $text, $icon, $attrs) = @_;

# Create attribute hash and set href
my $all_attrs = $attrs || {};
$all_attrs->{'href'} = $href if (defined($href));

# Button class
my $btn_cls = $all_attrs->{'class'};
$all_attrs->{'class'} = "btn " . ($btn_cls 
	? ($btn_cls =~ /^btn-/ ? $btn_cls
	: "btn-$btn_cls") : 'btn-default');

# Build the link
my $rv = ui_tag_start('a', $all_attrs);

# Add icon if specified
if ($icon) {
	my $icon_class = "";

	# Check if icon specifies a specific bundle (fa2)
	if ($icon =~ /^fa2-/) {
		$icon_class = "fa2 $icon";
		}
	# Check if it already has fa- prefix
	elsif ($icon =~ /^fa-/) {
		$icon_class = "fa $icon";
		}
	# Otherwise add the default fa- prefix
	else {
		$icon_class = "fa fa-$icon";
		}
	$rv .= ui_tag('i', undef, {'class' => $icon_class});
	$rv .= "&nbsp;&nbsp;";
	}

# Add text
$rv .= ui_tag_content($text) if (defined($text));

# Close the link
$rv .= ui_tag_end('a');

return $rv;
}

# ui_icon(icon, [attrs])
# Creates an icon element
# Parameters:
#   icon    - Icon class (with or without fa- prefix)
#   attrs   - Optional hash ref of additional HTML attributes
#
# Examples:
#   ui_icon("search")                  # Standard icon
#   ui_icon("fa2-warning")             # Extended icon set
sub ui_icon
{
return theme_ui_icon(@_) if (defined(&theme_ui_icon));
my ($icon, $attrs) = @_;

return "" if (!defined($icon)) || $icon eq '';

# Create attribute hash
my $all_attrs = $attrs || {};

# Process icon class
my $icon_class = "";

# Check if icon is in a specific bundle
if ($icon =~ /^fa2-/) {
	$icon_class = "fa2 $icon";
	}
elsif ($icon =~ /^fa-/) {
	$icon_class = "fa $icon";
	}
else {
	$icon_class = "fa fa-$icon";
	}

# Make icon always fixed width unless specified otherwise
$icon_class .= " fa-fw" if ($all_attrs->{'class'} !~ /fa-dw/);

# Add icon class to any existing classes
if ($all_attrs->{'class'}) {
	$all_attrs->{'class'} .= " $icon_class";
} else {
	$all_attrs->{'class'} = $icon_class;
	}

# Build the icon tag
return ui_tag('i', undef, $all_attrs);
}

# ui_br([attrs])
# Creates a line break element
sub ui_br
{
return theme_ui_br(@_) if (defined(&theme_ui_br));
my ($attrs) = @_;
return ui_tag('br', undef, $attrs);
}

# ui_p(content, [attrs])
# Creates a paragraph element with optional content
sub ui_p
{
return theme_ui_p(@_) if (defined(&theme_ui_p));
my ($content, $attrs) = @_;
return ui_tag('p', $content, $attrs);
}

1;