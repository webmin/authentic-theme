#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <ilia@virtualmin.com>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#

# This file contains a copy/paste of core libraries that
# are part of "WebminCore" and which may fail to load as
# to enabled caching and in case Webmin wasn't restarted
# as expected during upgrade process.

use feature 'state';

=head2 get_buffer_size

Returns the buffer size for read/write operations

=cut
sub get_buffer_size
{
my %miniserv;
&get_miniserv_config(\%miniserv);
return $miniserv{'bufsize'} || 32768;
}

=head2 get_webprefix

Returns ready to use webprefix

=cut
sub get_webprefix
{
# &load_theme_library();
if (defined(&theme_get_webprefix)) {
    return &theme_get_webprefix(@_);
    }
return $gconfig{'webprefix'} || '';
}

=head2 get_sub_ref_name

Returns a name of the subroutine name of a code reference

=cut
sub get_sub_ref_name
{
my ($sub_ref) = @_;
eval "use B qw(svref_2object);";
if (!$@) {
    if (ref($sub_ref)) {
        my $cv = svref_2object ( $sub_ref );
        if ($cv->can(GV)) {
            my $gv = $cv->GV;
            if ($gv->can(NAME)) {
                return $gv->NAME;
                }
            }
        }
    }
}

=head2 globals(action-type, variable-name, [[set-variable-value]|[get-scope-name]], [set-scope-name])

Provides access to handle global variables all in one place internally allowing to
differentiate the scope if needed. Must not be used directly. For internal use only

=cut
sub globals
{
my ($action, $variable, $value, $scope) = @_;
state $globals;
$scope = $value || 'main'
    if ($action =~ /get|delete/ && defined($variable) && defined($value) && !$scope);
$scope ||= 'main';

if ($action eq 'set') {
    $globals->{$scope}->{$variable} = $value
        if (defined($variable) && defined($value));
    }
elsif ($action eq 'get' ||
       $action eq 'got') {
    if (defined($variable)) {
        # Return single global variable in given scope
        if (defined($globals->{$scope}) &&
            defined($globals->{$scope}->{$variable})) {
            my $__ = $globals->{$scope}->{$variable};
            globals('delete', $variable, $value, $scope)
                if ($action eq 'got');
            return $__;
            }
        else {
            return;
            }
        }
    }
elsif ($action eq 'delete') {
    if (defined($variable)) {
        if ($variable eq '*') {
            delete $globals->{$scope};
        }
        else {
            # Remove single global variable in scope
            delete $globals->{$scope}->{$variable};
            if (!keys %{$globals->{$scope}}) {
                delete $globals->{$scope};
                }
            }
        }
    else {
        # Delete all registered globals
        foreach (keys %{$globals}) {
            delete $globals->{$_};
            }
        }
    }

# Always return a reference with all registered globals
return $globals;
}


=head2 setvar(variable-name, variable-value, [scope-name])

A wrapper function to set global variables using `globals` sub

Examples:

    Set variable in default "main" scope
      - setvar('var-1', 'val-1');
    Set variable in given "virtual-server" scope
      - setvar('var-1', 'val-1', 'virtual-server');

=cut
sub setvar
{
my ($variable, $value, $scope) = @_;
return &globals('set', $variable, $value, $scope);
}

=head2 getvar(variable-name, [scope-name], [get-and-unset])

A wrapper function to get global variables using `globals` sub

Examples:

    Get variable value previously set on default "main" scope
      - getvar('var-1');
    Get variable value previously set on given "virtual-server" scope
      - getvar('var-1', 'virtual-server');
    Get and unset variable previously set on given "virtual-server" scope and delete immediately
      - getvar('var-1', 'virtual-server', 'unset');

=cut
sub getvar
{
my ($variable, $scope, $unset) = @_;
return &globals(($unset ? 'got' : 'get'), $variable, $scope);
}

=head2 delvar(variable-name, [scope-name])

A wrapper function to delete global variables using `globals` sub

Examples:
    
    Delete variable in default "main" scope
      - delvar('var-1');

    Delete variable in given "virtual-server" scope
      - delvar('var-1', 'virtual-server');

    Delete all variables in "main" scope
      - delvar('*');

    Delete all variables in given "virtual-server" scope
      - delvar('*', 'virtual-server');

    Delete all variables in all scopes
      - delvar();


=cut
sub delvar
{
my ($variable, $scope) = @_;
return &globals('delete', $variable, $scope);
}

# webmin_user_can_rpc()
# Returns 1 if the given user can make remote calls
sub webmin_user_can_rpc
{
my $u = $base_remote_user;
my %access = &get_module_acl($u, "");
return 1 if ($access{'rpc'} == 1);  # Can make arbitrary RPC calls
return 0 if ($access{'rpc'} == 0);  # Cannot make RPCs

# Assume that standard admin usernames
# are root-capable as a fallback
return $u eq 'root' ||
       $u eq 'admin' ||
       $u eq 'sysadm';
}

# webmin_user_login_mode()
# Returns currently logged in user mode
sub webmin_user_login_mode
{
# Default mode
my $mode = 'root';

# Check for foreign modules
my $foreign_virtual_server
    = &foreign_available("virtual-server");
&foreign_require("virtual-server")
    if ($foreign_virtual_server);
my $foreign_server_manager
    = &foreign_available("server-manager");
&foreign_require("server-manager")
    if ($foreign_server_manager);

# Get current user and base user global permissions
my %uaccess = &get_module_acl($remote_user, "");
my %access = &get_module_acl($base_remote_user, "");

# Check if mode must be restricted
if ($base_remote_user !~ /^(root|admin|sysadm)$/) {
    if ($uaccess{'_safe'} == 1 || $access{'_safe'} == 1 ||
        $uaccess{'rpc'} == 0 || $access{'rpc'} == 0) {
            # Safe Webmin user
            $mode = 'safe-user';
        }
    }
if (&get_product_name() eq "usermin") {
    # Usermin user
    $mode = 'mail-user';
    }
if ($foreign_server_manager) {
    # Cloudmin machine owner
    $mode = 'cloud-owner'
        if ($server_manager::access{'owner'});
    }
elsif ($foreign_virtual_server) {
    $mode =
      &virtual_server::reseller_admin() ?
        # Virtualmin reseller or owner
        'virtual-reseller' : 'virtual-owner'
            if (!&virtual_server::master_admin());
    }
return $mode;
}

# webmin_user_is_admin()
# Returns 1 if currently logged in user is an admin
sub webmin_user_is_admin
{
return &webmin_user_login_mode() eq 'root';
}

# webmin_user_is()
# Returns 1 if currently logged in user belongs to one
# of the requested types: root, safe-user, mail-user,
# cloud-owner, virtual-reseller, virtual-reseller
# Simply a convenience wrapper function
sub webmin_user_is
{
my ($user_type) = @_;

# Test mode
return &webmin_user_login_mode() eq $user_type;
}

# get_current_theme_info_cached([no-cache])
# Returns cached theme info
sub get_current_theme_info_cached
{
my ($nocache) = @_;
state %current_theme_info;
if (!%current_theme_info || $nocache) {
    %current_theme_info = &get_theme_info($current_theme);
    }
return \%current_theme_info;
}

1;
