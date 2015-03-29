#!/usr/bin/perl

#
# Authentic Theme 11.01 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

sub print_category {
    my ( $c, $label ) = @_;
    $label = $c eq "others" ? $text{'left_others'} : $label;

    if (   $c eq 'webmin'
        || $c eq 'usermin'
        || $c eq 'settings'
        || $c eq 'global_settings' )
    {
        our $icon = 'fa-cog';
    }
    elsif ( $c eq 'system' || $c eq 'global_system' ) {
        our $icon = 'fa-wrench';
    }
    elsif ( $c eq 'servers' || $c eq 'global_servers' ) {
        our $icon = 'fa-rocket';
    }
    elsif ( $c eq 'other' || $c eq 'global_other' ) {
        our $icon = 'fa-gavel';
    }
    elsif ( $c eq 'net' || $c eq 'global_net' ) {
        our $icon = 'fa-shield';
    }
    elsif ( $c eq 'info' || $c eq 'global_info' ) {
        our $icon = 'fa-info';
    }
    elsif ($c eq 'hardware'
        || $c eq 'global_hardware'
        || $c eq 'cat_storage' )
    {
        our $icon = 'fa-hdd-o';
    }
    elsif ( $c eq 'cluster' || $c eq 'global_cluster' ) {
        our $icon = 'fa-power-off';
    }
    elsif ( $c eq 'unused' || $c eq 'global_unused' ) {
        our $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'mail' || $c eq 'global_mail' ) {
        our $icon = 'fa-envelope';
    }
    elsif ( $c eq 'login' || $c eq 'global_login' ) {
        our $icon = 'fa-user';
    }
    elsif ( $c eq 'apps' || $c eq 'global_apps' ) {
        our $icon = 'fa-rocket';
    }
    elsif ( $c eq 'email' || $c eq 'global_email' ) {
        our $icon = 'fa-envelope';
    }
    elsif ( $c eq 'custom' || $c eq 'global_custom' ) {
        our $icon = 'fa-wrench';
    }
    elsif ( $c eq 'ip' || $c eq 'global_ip' ) {
        our $icon = 'fa-shield';
    }
    elsif ( $c eq 'check' || $c eq 'global_check' ) {
        our $icon = 'fa-user-md';
    }
    elsif ( $c eq 'add' || $c eq 'global_add' ) {
        our $icon = 'fa-plus';
    }
    elsif ( $c eq 'backup' || $c eq 'global_backup' || $c eq 'cat_backup' ) {
        our $icon = 'fa-save';
    }
    elsif ( $c eq 'cat_server' || $c eq 'cat_system' ) {
        our $icon = 'fa-cogs';
    }
    elsif ( $c eq 'cat_delete' ) {
        our $icon = 'fa-plug';
    }
    elsif ( $c eq 'cat_logs' ) {
        our $icon = 'fa-file-text';
    }
    elsif ( $c eq 'cat_services' ) {
        our $icon = 'fa-puzzle-piece';
    }
    elsif ( $c eq 'create_new' ) {
        our $icon = 'fa-plus';
    }
    elsif ( $c eq 'cat_gce' ) {
        our $icon = 'fa-google';
    }
    elsif ( $c eq 'cat_ec2' ) {
        our $icon = 'fa-cubes';
    }
    elsif ( $c eq 'cat_hosts' ) {
        our $icon = 'fa-globe';
    }
    elsif ( $c eq 'cat_virtualmin' ) {
        our $icon = 'fa-sun-o';
    }
    elsif ( $c eq 'cat_owners' ) {
        our $icon = 'fa-users';
    }
    elsif ( $c eq 'cat_monitor' ) {
        our $icon = 'fa-desktop';
    }
    elsif ( $c eq 'cat_settings' ) {
        our $icon = 'fa-cloud';
    }
    elsif ( $c eq 'cat_manage' ) {
        our $icon = 'fa-gavel';
    }
    elsif ( $c eq 'cat_res' ) {
        our $icon = 'fa-share-alt';
    }
    elsif ( $c eq 'cat_admin' ) {
        our $icon = 'fa-key';
    }
    elsif ( $c eq 'cat_power' ) {
        our $icon = 'fa-power-off';
    }
    else {
        our $icon = 'fa-link';
    }

    if ($label) {

        # Show link to close or open catgory
        print '<li class="has-sub">' . "\n";
        print '<a href="#'
            . $c
            . '"><i class="fa '
            . $icon
            . ' fa-fw"></i> <span>'
            . $label
            . '</span></a>' . "\n";
        print '</li>' . "\n";
    }
}

sub print_switch_empty {
    my ($num) = @_;
    print '<input id="reserve_empty_' . $num
        . '" name="product-switcher" type="radio">
<label for="reserve_empty_' . $num . '">&nbsp;</label>';
}

sub print_switch_webmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_'
        . &get_product_name()
        . '" name="product-switcher" type="radio"'
        . (    $is_virtualmin == -1
            && $is_cloudmin == -1
            && $is_webmail == -1 ? " checked" : "" )
        . '>
<label for="open_'
        . &get_product_name() . '">
        <img alt="" style="height:17px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOm5zMD0iJmFtcDsjMzg7bnNfYWk7IiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjEyOCIgICBoZWlnaHQ9IjEyOCIgICB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgICBpZD0ic3ZnNzMyNiIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiICAgc29kaXBvZGk6ZG9jbmFtZT0iV2VibWluLWljb24td2hpdGUtbW9ub2Nocm9tZS5zdmciPiAgPGRlZnMgICAgIGlkPSJkZWZzNzMyOCIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjMDAwMDAwIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIgICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiICAgICBpbmtzY2FwZTp6b29tPSIyLjgyODQyNzEiICAgICBpbmtzY2FwZTpjeD0iMTYuMjQzMzI2IiAgICAgaW5rc2NhcGU6Y3k9IjY2LjIxMDA5MyIgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIgICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgICAgIHNob3dncmlkPSJmYWxzZSIgICAgIHVuaXRzPSJweCIgICAgIHdpZHRoPSIxMjhweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTQiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyNyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+ICA8bWV0YWRhdGEgICAgIGlkPSJtZXRhZGF0YTczMzEiPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZyAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTkyNC4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiICAgICAgIGlkPSJwYXRoNjY4MiIgICAgICAgZD0ibSAxNS4yODI1NzksMTAxOS4zMjI4IGMgLTAuNzU5MDk4LDUuNjI0NiAwLjExNzQ4NSwxMC40NDY3IDIuNjY3NjgzLDE0LjU3NjUgNS43NTY0ODcsOS40MTEgMTguNTc3OTk4LDEyLjk0MjYgMjguMTkxNDIsNy44MzMxIDUuNjM5MDA2LC0zLjAzNjQgMTEuMzAzMzE3LC02LjA2MTkgMTcuMDIwMDQxLC05LjEyMzUgbCAwLDAgYyA1LjU4NjU5MywzLjE1MiAxMS4xNTg3MjcsNi4zMDU4IDE2LjcxODIxLDkuNDU2MSA0Ljg5MjU2MSwyLjc0OSAxMC42NzYxNTgsMy4zMDc0IDE1Ljk3MzU3MSwxLjk2ODIgNS4xNjU0NjYsLTEuMzA2NyA5Ljk0MDU1NiwtNC40NjQyIDEyLjk3Njk0NiwtOS4xODE0IDIuNjgyMTQsLTQuMTQwNyAzLjYxMTE0LC05LjA2NTcgMi45MDQ0NSwtMTQuODI3NyA1LjU1OTQ4LC0xLjc3MjkgOS43MzI3MSwtNC44MzI5IDEyLjU4NDc0LC05LjI2MjcgMy4xNzkxOCwtNC45MzQyIDMuOTM4MjgsLTEwLjY0MDEgMi42Mjk3NCwtMTUuODIwMDQgLTEuMzMyMDQsLTUuMjY0ODkgLTQuODM4MzQsLTEwLjEzNTc2IC0xMC4xNTAyMiwtMTMuMTAzNDcgLTUuNDI5MzQsLTMuMDI3MzQgLTEwLjg0NjA1LC02LjA1Mjg4IC0xNi4yNTAxLC05LjA2NzU5IDAuMTE4MzEsLTYuMjU2OCAwLjIzMDcxLC0xMi45OTgwNSAwLjMzOTksLTE4Ljc0MDgxIDAuMjIyMjksLTEyLjE5NjE2IC05LjkyNzkxMiwtMjIuMjI4OSAtMjIuMzY5ODc1LC0yMi4wMzE4OCAtNS41NDUwMjQsMC4wODE0IC0xMC41Mjk3NjEsMi4wNjk0MyAtMTUuMTQ3NjAxLDUuOTI0NTYgLTQuOTMyMzI0LC0zLjczOTQ1IC05Ljk0MjM2NSwtNS41ODExNyAtMTUuMTg5MTcyLC01LjUxMDY4IC0xMS45NDQ5MzQsMC4xNzE3IC0yMS44NjAxODgsOS45NDA1NiAtMjEuNzgwNjY0LDIxLjIzODQ1IDAuMDI1Myw2LjQxNzk5IDAuMTQwODU1LDEzLjAzODAzIDAuMTgwNjA4LDE5LjQzNjE0IDAuMzY1MDksLTAuMjIwNTEgMC43MDg2MTQsLTAuNjM5NDUgMS4xMTM0NjYsLTAuODY4OTggMC40NDQ2MTQsLTAuMjQyMTkgMC45MDE4NzksLTAuNTI5NTYgMS4zMDg1MzksLTAuNzkzNDQgNC4xNDYxMTYsLTIuMjA4NjEgOC4wNzE3MzEsLTEuNTMwODUgMTAuMjI5NzM3LDIuMDM2OTEgMC44MzY4MTMsMS4zOTE2OCAxLjE2NTc1NiwyLjg1Mzg0IDAuOTU2MSw0LjIzMjg2IGwgMCwwLjAxMjcgMCwwLjA3MDQgYyAwLDAuMDExMyAwLDAuMDIxNyAtMC4wMjg5MiwwLjAzNDMgMCwwLjAxMTMgMCwwLjAyMzQgLTAuMDEyNjUsMC4wMzQ0IDAsMC4wODE0IDAsMC4xNTAwMiAtMC4wMTI2NSwwLjI0NCAwLjE3MTcsLTAuNzI0NzYgMC4yNzY1MjgsLTEuNTA5MTYgMC4zMjg5NDEsLTIuMzYwNDMgLTAuMDI3MTEsLTAuNTI3NzUgLTAuMDI3MTEsLTEuMDMzODEgLTAuMDM3OTYsLTEuNTQxNjkgMCwtNS43MDc2OCAtMC4wMDksLTExLjM2ODM4IDAsLTE3LjA4NTExIDAuMDAzNiwtMy4wMzYzOCAwLjExNzQ4NiwtNC4yOTA3IDAuNjAxODU2LC01Ljg1NTg5IDAuOTU2MTAxLC0zLjEwNjg3IDMuODU4NzQzLC01LjI0NjgxIDcuMzUwNTksLTUuMjc5MzQgMy40MDMyODUsLTAuMDI1MyA2LjM5ODEwNCwyLjE0ODk3IDcuMjM0OTE4LDUuMTUyODMgMC40NTcyNjYsMS4zNjk5OCAwLjYzOTgxMSwzLjM0OTA2IDAuNjI4OTY2LDUuODY2NzQgLTAuMDI3MTIsNS43MTg1MiAtMC4wMzk3NiwxMS40NDk3MSAtMC4wNjY4NywxNy4xNjY0NCAwLDAuNDkzNDEgMCwxLjAyMjk3IDAuMDE0NDUsMS41MzA4NCAtMC4wMTQ0NSw0LjUzMjkgMi44MTIyNzMsNy42MTYyOCA3LjAyNTI2Miw3LjYxNjI4IDQuMjc4MDU1LDAgNy4wNjUwMjUsLTIuOTkxMjEgNy4xMTc0MzksLTcuNjM5NzggMCwtMC41MDYwNiAwLC0xLjAyMjk3IDAuMDEyNjUsLTEuNTQzNSAwLjA1MjQxLC01LjcyOTM3IDAuMTA0ODI1LC0xMS40NjA1NiAwLjE0NjM5NywtMTcuMjMzMyAwLjAyMTY5LC0zLjU3NjggMC4zNzc3NDEsLTUuMjU3NjUgMS4zNzE3OTcsLTcuMTU3MiAxLjIxNjM2MywtMi4yOTg5OSAzLjc5MzY3OSwtMy43OTM2OCA2LjYyMDQxMSwtMy44MTg5OSAzLjEzNzYwMiwtMC4wMzA3IDYuMDc0NTg0LDEuNzM4NyA3LjEwMjk4LDQuMzM3NjkgMC42MzI1OCwxLjU5NzczIDAuODA5NzA0LDIuOTMzMzggMC43NzE3NDksNi41MzM2NiAtMC4xMDQ4MjQsNS43NzYzNyAtMC4xNzE3LDExLjU2MTc4IC0wLjIzNDk1OCwxNy4zMjczIC0wLjAzOTc2LDAuNTA0MjUgLTAuMDI3MTEsMS4wMzM4MSAtMC4wMzk3NiwxLjU2NTE4IC0wLjAzNzk2LDMuMTczNzUgMS4zNDgzMDEsNS42NzE1NSAzLjcwMzMwOSw2Ljg2ODAzIDAuMjcyOTEzLDAuMTk1MTkgMC41NzQ3NDUsMC4zOTAzOCAwLjkwMTg3OSwwLjU3NDc1IDAuNDU3MjY2LDAuMjQyMTggMC45MDM2ODgsMC40NjA4OCAxLjM0ODMwMSwwLjc0NjQ0IDUuMDIyNjkzLDIuNzg1MTYgMTAuMDg1MTU1LDUuNjA0NjcgMTUuMDk3MDA1LDguNDMzMjEgMy4wODY5OSwxLjczODY5IDQuMTYwNTcsMi41NjY0NiA1LjE2NzI4LDMuODU2OTQgMS43Mzg2OSwyLjEzOTkyIDEuNzkyOTIsNS4zNzE1NyAwLjE4MjU1LDcuODgwMTcgLTEuNDM4NjcsMi4yNTM4IC00LjAyODY0LDMuNjQ3MyAtNi42MzMwNywzLjQ3MzggLTIuMTE4MjUsLTAuMTM3NCAtMy43MDE1LC0wLjY5MDUgLTYuNzc3NjU4LC0yLjM5MyAtNC45OTU1ODIsLTIuODE5NSAtOS45ODAzMTgsLTUuNjEzNzIgLTE0Ljk1MjQwNCwtOC40MDk3MyAtMC40NDQ2MTUsLTAuMjYzODcgLTAuODg5MjI5LC0wLjUxNjkxIC0xLjM0NjQ5NCwtMC43NTkxIC00LjA1NTc0OCwtMi4yNjY0NSAtOC4wODQzODUsLTEuNDcxMiAtMTAuMTY2NDc4LDEuOTg5OTIgLTIuMTQ1MzU0LDMuNDYzMDEgLTAuODc0NzY5LDcuMjk0NjEgMy4wNjE2OSw5LjUxNTkxIDAuNDU3MjY2LDAuMjU0OCAwLjkwMTg4MSwwLjQ5NTIgMS4zNjA5NTMsMC43NDgzIDQuOTE3ODY0LDIuNzg1MiA5Ljg2Mjg0LDUuNTQ0OSAxNC44MjA0NjcsOC4zMjg0IDIuMTg1MTE1LDEuMjE5OSAzLjc4MTAyNiwyLjM0NzcgNC43MjQ0NzUsMy4zMzY0IDIuMTgzMzA4LDIuMTYxNSAyLjUyMzA5NSw1LjYxNTUgMC44MDk3MDUsOC4zNDA5IC0xLjc5MTEwOCwyLjc5NjEgLTUuMDEwMDQyLDQuMDYyOSAtOC4xNzQ3NTMsMy4zMjczIC0xLjU4MzI2LC0wLjMzNjEgLTIuNzIxOTA2LC0wLjg3NDcgLTUuMjg0NzYzLC0yLjMxMzMgLTQuOTE5NjcxLC0yLjc4NTIgLTkuODI0ODg0LC01LjU2ODUgLTE0Ljc2ODA1MiwtOC4zMDg1IC0wLjQzMTk2MywtMC4yNzQ3IC0wLjg5MTAzNiwtMC41MTY5IC0xLjM0ODMwMiwtMC43Njk5IC0xLjY2MDk3NiwtMC44OTY2IC0zLjMzNjQxMSwtMS4yOTA2IC00Ljg1NDYwNiwtMS4xOTY1IGwgLTAuMDEyNjUsMCBjIC0xLjQxMTU1OSwtMC4wMjQgLTIuOTU2ODY0LDAuMzQ1MiAtNC40ODU5MDIsMS4xMzg2IC0wLjQ0NDYxNCwwLjI1NDggLTAuODg5MjI4LDAuNTA2MSAtMS4zNDgzMDEsMC43NDgyIC00Ljk3MDI3OSwyLjY4MDQgLTkuODg5OTUxLDUuMzc4NyAtMTQuNzk1MTYzLDguMDMwMiAtMi41NzM3MDEsMS4zOTM1IC0zLjY4ODg1MSwxLjg4NTEgLTUuMjU5NDU5LDIuMTk3OCAtMy4xMzk0MDgsMC42NTQyIC02LjI1MzUxMywtMC42NjcgLTcuOTY2OTA1LC0zLjQ3NTYgLTEuNjM1NjcyLC0yLjcxNDcgLTEuMjU2MTI1LC02LjA4MzYgMC44NzY1NzcsLTguMTkxIDAuOTU2MTAxLC0wLjk3NiAyLjQ4NTE0LC0yLjA3MTMgNC42MTk2NDgsLTMuMjMxNiA0LjkxOTY3MSwtMi42OTExIDkuODc1NDkyLC01LjM5NSAxNC43OTUxNjMsLTguMTIyMyAwLjQzMDE1NiwtMC4yNDIyIDAuOTE2MzM5LC0wLjUwNjEgMS4zNDY0OTQsLTAuNzM1NiAzLjk1MjcyNywtMi4xODcgNS4yNTk0NTgsLTYuMDA2IDMuMTc5MTcxLC05LjQ2ODkzIC0yLjA5NDc0NiwtMy40NzU1NyAtNi4wNTY1MSwtNC4yMzEwNSAtMTAuMDg2OTU0LC0xLjk5MTcyIC0wLjQ0MDk5OSwwLjI0NTggLTAuOTE0NTMyLDAuNDk1MjMgLTEuMzQ4MzAxLDAuNzIyOTUgLTQuOTcwMjc4LDIuNzM5OTggLTkuODc3Myw1LjUwMTcgLTE0Ljc1NTQwMiw4LjI1MDcgLTMuMDIxOTI5LDEuNjY4MSAtNC42MDUxODgsMi4xODUyIC02LjY0NTcxMywyLjMwMDkgLTIuNDk5NTk5LDAuMTM1NSAtNC45ODY1NDYsLTEuMjMyNyAtNi4zMzEyMzIsLTMuNDU0IC0xLjQ5MTA4NCwtMi40NTk5IC0xLjQzODY2OSwtNS42MTM3NSAwLjIyMjMwNywtNy42OTU4NCAxLjAxOTM1OCwtMS4yNzc4MSAyLjA2NzYzNSwtMi4wODIxIDUuMDYyNDU0LC0zLjc3Mzc5IDQuOTA1MjE0LC0yLjc0OTAzIDkuODEyMjM0LC01LjU0NTAzIDE0LjcxNzQ0NywtOC4zNDEwMyAwLjQ0NDYxNSwtMC4yNjM4OCAwLjkyODk5LC0wLjUwNjA3IDEuMzU5MTQ1LC0wLjc1OTExIDMuOTUwOTIsLTIuMjIxMjUgNS40MjM1NTksLTYuMzUwNjEgMy4zMjg4MTMsLTkuODQ5NjkgLTIuMTA1NTkxLC0zLjQ5NzI3IC02LjU2MTU4NywtNC4zNzUyOCAtMTAuMDYxNzc1LC0yLjEwMzU0IDAsMCAtMC43MDE2MzEsMC40NTE5OCAtMS4xNDQ0MzgsMC43MDY4MiAtNS42NjQzMSwzLjI0NDI0IC0xMS43NTc5MTEsNi45MTk1NiAtMTcuMzgyNDU4LDEwLjE1MTE1IC0xMC4wNDcxOTIyMyw1Ljc3NjM3IC0xMy4zODM2MDUsMTguNTAwMzMgLTcuNDgyNTI5MiwyOC4xNTM1MyAyLjY1MzIyNTksNC4zMzA1IDYuNjI5NDQ4Myw3LjMzMjYgMTEuOTI2ODYxMiw5LjE3NDIgeiIgICAgICAgbnMwOmtub2Nrb3V0PSJPZmYiICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njc2NjY2NjY2NjY2NjY3NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njc2NjY2NjY2NjY2MiIC8+ICA8L2c+PC9zdmc+">
        <br>'
        . ucfirst( &get_product_name() ) . '</label>';
}

sub print_switch_virtualmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_virtualmin" name="product-switcher" type="radio"'
        . ( $is_virtualmin != -1 ? " checked" : "" ) . '>
          <label for="open_virtualmin">
          <img alt="" style="margin-left:3px; height:18px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgaWQ9InN2ZzExNjAwIiAgIGhlaWdodD0iMTIuODY0MTFtbSIgICB3aWR0aD0iMTIuODY0MTFtbSIgICB2ZXJzaW9uPSIxLjAiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiICAgc29kaXBvZGk6ZG9jbmFtZT0iVmlydHVhbG1pbi1Mb2dvLXdoaXRlLW1vbm9jaHJvbWVfbm90X2lua3NjYXBlLnN2ZyI+ICA8c29kaXBvZGk6bmFtZWR2aWV3ICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEiICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiICAgICBndWlkZXRvbGVyYW5jZT0iMTAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIgICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI1NjAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDIwIiAgICAgaWQ9Im5hbWVkdmlldzI0IiAgICAgc2hvd2dyaWQ9ImZhbHNlIiAgICAgZml0LW1hcmdpbi10b3A9IjAiICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIiAgICAgZml0LW1hcmdpbi1ib3R0b209IjAiICAgICBpbmtzY2FwZTp6b29tPSI3LjEwOTA3NDIiICAgICBpbmtzY2FwZTpjeD0iMjguMTM0OTUiICAgICBpbmtzY2FwZTpjeT0iMjMuMzA3NDg1IiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjciICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iZzMzNzUiIC8+ICA8bWV0YWRhdGEgICAgIGlkPSJtZXRhZGF0YTIxODciPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZGVmcyAgICAgaWQ9ImRlZnMzIiAvPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yLjU2MzAwNTgsLTQ1LjI5MTgyNSkiICAgICBzdHlsZT0iZmlsbDojMDBmZjAwO2ZpbGwtb3BhY2l0eToxIiAgICAgaWQ9ImczMzc1Ij4gICAgPHBhdGggICAgICAgZD0iTSAyNS4xOTQxNTgsODAuODczMjggQyAxNy42MDIyMjMsODAuODQxNzggMi41NTE4ODcsNjEuMTk4MDggMi41NjMwMTIsNTguNjU2NzUgYyAwLjAwNjg5LC0xLjU3OTQ5IDE1LjEwMTIyNyw5LjgyMjY3IDIyLjY4NTEzOSw5Ljg1NDA5IDcuNjA5OTI0LDAuMDMxNiAyMi45MDMxOTcsLTExLjI0NjU0IDIyLjg5NjMzLC05LjY2NTA1IC0wLjAxMTEyLDIuNTM5MzQgLTE1LjM0ODQyMiwyMi4wNTkwNCAtMjIuOTUwMzIzLDIyLjAyNzQ5IHoiICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuNDE2NzgxMTM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MSIgICAgICAgaWQ9InBhdGg1MjAxNiIgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4gIDwvZz48L3N2Zz4=">
          <br>Virtualmin</label>';
}

sub print_switch_cloudmin {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_cloudmin" id="open_cloudmin" name="product-switcher" type="radio"'
        . ( $is_cloudmin != -1 ? " checked" : "" ) . '>
          <label for="open_cloudmin">
          <img alt="" style="margin-left:3px; height:17px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOm9zYj0iaHR0cDovL3d3dy5vcGVuc3dhdGNoYm9vay5vcmcvdXJpLzIwMDkvb3NiIiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgaWQ9InN2ZzQ3MTQiICAgdmVyc2lvbj0iMS4xIiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IiAgIHhtbDpzcGFjZT0icHJlc2VydmUiICAgd2lkdGg9IjEyOC4wMDY5OSIgICBoZWlnaHQ9IjEyOCIgICB2aWV3Qm94PSIwIDAgMTI4LjAwNjk4IDEyOCIgICBzb2RpcG9kaTpkb2NuYW1lPSJjbG91ZG1pbi1pY29uLXdoaXRlLW1vbm9jaHJvbWUuc3ZnIj48bWV0YWRhdGEgICAgIGlkPSJtZXRhZGF0YTQ3MjAiPjxyZGY6UkRGPjxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcyAgICAgaWQ9ImRlZnM0NzE4Ij48bGluZWFyR3JhZGllbnQgICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NTg1NyIgICAgICAgb3NiOnBhaW50PSJzb2xpZCI+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxOyIgICAgICAgICBvZmZzZXQ9IjAiICAgICAgICAgaWQ9InN0b3A1ODU5IiAvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoICAgICAgIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBpZD0iY2xpcFBhdGg0NzI4Ij48cGF0aCAgICAgICAgIGQ9Im0gMTEzLjk1NywzNzEuNjk5IDkxLjg3MywwIDAsLTEwMC4yNTYgLTkxLjg3MywwIDAsMTAwLjI1NiB6IiAgICAgICAgIGlkPSJwYXRoNDczMCIgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PGxpbmVhckdyYWRpZW50ICAgICAgIHgxPSIwIiAgICAgICB5MT0iMCIgICAgICAgeDI9IjEiICAgICAgIHkyPSIwIiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgzMy45NTA0NywtMzUuMDg5OTgxLDM1LjA4OTk4MSwzMy45NTA0NywxNDIuOTE4OTUsMzM5LjExNzE5KSIgICAgICAgc3ByZWFkTWV0aG9kPSJwYWQiICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQ3NDAiPjxzdG9wICAgICAgICAgc3R5bGU9InN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6I2ZmZmZmZiIgICAgICAgICBvZmZzZXQ9IjAiICAgICAgICAgaWQ9InN0b3A0NzQyIiAvPjxzdG9wICAgICAgICAgc3R5bGU9InN0b3Atb3BhY2l0eTowLjUwMTk2MDc4O3N0b3AtY29sb3I6I2ZmZmZmZiIgICAgICAgICBvZmZzZXQ9IjAuMjcwNTg0IiAgICAgICAgIGlkPSJzdG9wNDc0NCIgLz48c3RvcCAgICAgICAgIHN0eWxlPSJzdG9wLW9wYWNpdHk6MDtzdG9wLWNvbG9yOiNmZmZmZmYiICAgICAgICAgb2Zmc2V0PSIxIiAgICAgICAgIGlkPSJzdG9wNDc0NiIgLz48L2xpbmVhckdyYWRpZW50PjxtYXNrICAgICAgIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiICAgICAgIHg9IjAiICAgICAgIHk9IjAiICAgICAgIHdpZHRoPSIxIiAgICAgICBoZWlnaHQ9IjEiICAgICAgIGlkPSJtYXNrNDc0OCI+PGcgICAgICAgICBpZD0iZzQ3NTAiPjxnICAgICAgICAgICBpZD0iZzQ3NTIiPjxnICAgICAgICAgICAgIGlkPSJnNDc1NCI+PGcgICAgICAgICAgICAgICBpZD0iZzQ3NTYiPjxwYXRoICAgICAgICAgICAgICAgICBkPSJtIC0zMjc2OCwzMjc2NyA2NTUzNSwwIDAsLTY1NTM0IC02NTUzNSwwIDAsNjU1MzQgeiIgICAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ0NzQwKTtzdHJva2U6bm9uZSIgICAgICAgICAgICAgICAgIGlkPSJwYXRoNDc1OCIgICAgICAgICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PC9nPjwvZz48L2c+PC9nPjwvbWFzaz48bGluZWFyR3JhZGllbnQgICAgICAgeDE9IjAiICAgICAgIHkxPSIwIiAgICAgICB4Mj0iMSIgICAgICAgeTI9IjAiICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDMzLjk1MDQ3LC0zNS4wODk5ODEsMzUuMDg5OTgxLDMzLjk1MDQ3LDE0Mi45MTg5NSwzMzkuMTE3MTkpIiAgICAgICBzcHJlYWRNZXRob2Q9InBhZCIgICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDc2NCI+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMCIgICAgICAgICBpZD0ic3RvcDQ3NjYiIC8+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMC4yNzA1ODQiICAgICAgICAgaWQ9InN0b3A0NzY4IiAvPjxzdG9wICAgICAgICAgc3R5bGU9InN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6I2ZmZmZmZiIgICAgICAgICBvZmZzZXQ9IjEiICAgICAgICAgaWQ9InN0b3A0NzcwIiAvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoICAgICAgIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBpZD0iY2xpcFBhdGg0Nzc4Ij48cGF0aCAgICAgICAgIGQ9Im0gMCw1OTUuMjggODQxLjg5LDAgTCA4NDEuODksMCAwLDAgMCw1OTUuMjggWiIgICAgICAgICBpZD0icGF0aDQ3ODAiICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz48L2NsaXBQYXRoPjxjbGlwUGF0aCAgICAgICBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgICAgICAgaWQ9ImNsaXBQYXRoNDc5MCI+PHBhdGggICAgICAgICBkPSJtIDEzMS45MTksMzIxLjU3MSBjIDAsLTI3LjYyMSAxNi41MjUsLTUwLjAyMSAzNi45MDIsLTUwLjAyMSBsIDAsMCBjIDIwLjM3OCwwIDM2LjkwMiwyMi40IDM2LjkwMiw1MC4wMjEgbCAwLDAgYyAwLDI3LjYyMSAtMTYuNTI0LDUwLjAyIC0zNi45MDIsNTAuMDIgbCAwLDAgYyAtMjAuMzc3LDAgLTM2LjkwMiwtMjIuMzk5IC0zNi45MDIsLTUwLjAyIiAgICAgICAgIGlkPSJwYXRoNDc5MiIgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PGxpbmVhckdyYWRpZW50ICAgICAgIHgxPSIwIiAgICAgICB5MT0iMCIgICAgICAgeDI9IjEiICAgICAgIHkyPSIwIiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCg5Ny45NjA5ODMsLTYwLjAwMTI1MSw0OC4zMTQxOTQsMTIxLjY1NzQ2LDgxLjE2MTYyMSwzNzUuMjY0MTYpIiAgICAgICBzcHJlYWRNZXRob2Q9InBhZCIgICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDgwMiI+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMCIgICAgICAgICBpZD0ic3RvcDQ4MDQiIC8+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjA7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMSIgICAgICAgICBpZD0ic3RvcDQ4MDYiIC8+PC9saW5lYXJHcmFkaWVudD48bWFzayAgICAgICBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICB4PSIwIiAgICAgICB5PSIwIiAgICAgICB3aWR0aD0iMSIgICAgICAgaGVpZ2h0PSIxIiAgICAgICBpZD0ibWFzazQ4MDgiPjxnICAgICAgICAgaWQ9Imc0ODEwIj48ZyAgICAgICAgICAgaWQ9Imc0ODEyIj48ZyAgICAgICAgICAgICBpZD0iZzQ4MTQiPjxnICAgICAgICAgICAgICAgaWQ9Imc0ODE2Ij48cGF0aCAgICAgICAgICAgICAgICAgZD0ibSAtMzI3NjgsMzI3NjcgNjU1MzUsMCAwLC02NTUzNCAtNjU1MzUsMCAwLDY1NTM0IHoiICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50NDgwMik7c3Ryb2tlOm5vbmUiICAgICAgICAgICAgICAgICBpZD0icGF0aDQ4MTgiICAgICAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvZz48L2c+PC9nPjwvZz48L21hc2s+PGxpbmVhckdyYWRpZW50ICAgICAgIHgxPSIwIiAgICAgICB5MT0iMCIgICAgICAgeDI9IjEiICAgICAgIHkyPSIwIiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCg5Ny45NjA5ODMsLTYwLjAwMTI1MSw0OC4zMTQxOTQsMTIxLjY1NzQ2LDgxLjE2MTYyMSwzNzUuMjY0MTYpIiAgICAgICBzcHJlYWRNZXRob2Q9InBhZCIgICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDgyNCI+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMCIgICAgICAgICBpZD0ic3RvcDQ4MjYiIC8+PHN0b3AgICAgICAgICBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjojZmZmZmZmIiAgICAgICAgIG9mZnNldD0iMSIgICAgICAgICBpZD0ic3RvcDQ4MjgiIC8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggICAgICAgY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiICAgICAgIGlkPSJjbGlwUGF0aDQ4MzYiPjxwYXRoICAgICAgICAgZD0ibSAwLDU5NS4yOCA4NDEuODksMCBMIDg0MS44OSwwIDAsMCAwLDU5NS4yOCBaIiAgICAgICAgIGlkPSJwYXRoNDgzOCIgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PGNsaXBQYXRoICAgICAgIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBpZD0iY2xpcFBhdGg0ODQ0Ij48cGF0aCAgICAgICAgIGQ9Im0gMTQyLjg2NiwzNzkuNzY3IDc4LjkxMiwwIDAsLTEyNC40MTYgLTc4LjkxMiwwIDAsMTI0LjQxNiB6IiAgICAgICAgIGlkPSJwYXRoNDg0NiIgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PGNsaXBQYXRoICAgICAgIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBpZD0iY2xpcFBhdGg0ODQ4Ij48cGF0aCAgICAgICAgIGQ9Im0gMTQyLjg2NiwzNzkuNzY3IDc4LjkxMiwwIDAsLTEyNC40MTYgLTc4LjkxMiwwIDAsMTI0LjQxNiB6IiAgICAgICAgIGlkPSJwYXRoNDg1MCIgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PGNsaXBQYXRoICAgICAgIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiAgICAgICBpZD0iY2xpcFBhdGg0ODcyIj48cGF0aCAgICAgICAgIGQ9Im0gMjQxLjA0NSwzNzcuOTc1IDQ0LjU0NCwwIDAsLTU1LjI5NiAtNDQuNTQ0LDAgMCw1NS4yOTYgeiIgICAgICAgICBpZD0icGF0aDQ4NzQiICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz48L2NsaXBQYXRoPjxjbGlwUGF0aCAgICAgICBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgICAgICAgaWQ9ImNsaXBQYXRoNDg3NiI+PHBhdGggICAgICAgICBkPSJtIDI0MS4wNDUsMzc3Ljk3NSA0NC41NDQsMCAwLC01NS4yOTYgLTQ0LjU0NCwwIDAsNTUuMjk2IHoiICAgICAgICAgaWQ9InBhdGg0ODc4IiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PC9jbGlwUGF0aD48L2RlZnM+PHNvZGlwb2RpOm5hbWVkdmlldyAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxIiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIgICAgIGdyaWR0b2xlcmFuY2U9IjEwIiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSI5MzAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI2MTAiICAgICBpZD0ibmFtZWR2aWV3NDcxNiIgICAgIHNob3dncmlkPSJmYWxzZSIgICAgIGlua3NjYXBlOnpvb209IjEuMDk5MzE0NiIgICAgIGlua3NjYXBlOmN4PSItODMuNjk1NyIgICAgIGlua3NjYXBlOmN5PSI4My45NTAyNDYiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iNDciICAgICBpbmtzY2FwZTp3aW5kb3cteT0iNzQiICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iZzQ4MzIiIC8+PGcgICAgIGlkPSJnNDcyMiIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpbmtzY2FwZTpsYWJlbD0iY2xvdWRtaW4tbG9nbyIgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMjUsMCwwLC0xLjI1LDAsMTI4LjAwMDAyKSI+PGcgICAgICAgaWQ9Imc0MjQ4Ij48ZyAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNTc2MDkzMTQsMCwwLDAuNTc2MDkzMTQsLTcxLjM1MTg1NCwtMTM1LjEzMzUxKSIgICAgICAgICBpZD0iZzQ3NzQiICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSI+PGcgICAgICAgICAgIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDQ3NzgpIiAgICAgICAgICAgaWQ9Imc0Nzc2IiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSI+PGcgICAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg4LjY4NTEsMzgyLjczMzkpIiAgICAgICAgICAgICBpZD0iZzQ3ODIiICAgICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiPjxwYXRoICAgICAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgICAgICAgICBpZD0icGF0aDQ3ODQiICAgICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIgICAgICAgICAgICAgICBkPSJtIDAsMCBjIDQwLjIzMSwtMS41MzcgMjIuNjY4LC0yMS43NjkgNzMuNzQzLC04LjI4NCA0My41MDYsMTEuNDg2IDUyLjI1OSwtNTkuNTEzIDYuNzA1LC01NS4wMjMgLTMxLjcwNywzLjEyNiAtMTguMDMsLTUxLjg0MiAtODAuNDQ4LC01NS4yNzQgLTM0LjU5MiwwIC02Mi42NDUsMjYuNTUxIC02Mi42NDUsNTkuMjkxIEMgLTYyLjY0NSwtMjYuNTUxIC0zNC41OTIsMCAwLDAiIC8+PC9nPjwvZz48L2c+PGcgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjU3NjA5MzE0LDAsMCwwLjU3NjA5MzE0LC03MS4zNTE4NTQsLTEzNS4xMzM1MSkiICAgICAgICAgaWQ9Imc0Nzg2IiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiPjxnICAgICAgICAgICBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGg0NzkwKSIgICAgICAgICAgIGlkPSJnNDc4OCIgICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiPjxnICAgICAgICAgICAgIGlkPSJnNDc5NCIgICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSI+PGcgICAgICAgICAgICAgICBpZD0iZzQ3OTYiICAgICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSIgLz48ZyAgICAgICAgICAgICAgIG1hc2s9InVybCgjbWFzazQ4MDgpIiAgICAgICAgICAgICAgIGlkPSJnNDgyMCIgICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIj48ZyAgICAgICAgICAgICAgICAgaWQ9Imc0ODIyIiAgICAgICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSI+PHBhdGggICAgICAgICAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgICAgICAgICAgICAgaWQ9InBhdGg0ODMwIiAgICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAgICAgICAgICAgICAgICAgICBkPSJtIDEzMS45MTksMzIxLjU3MSBjIDAsLTI3LjYyMSAxNi41MjUsLTUwLjAyMSAzNi45MDIsLTUwLjAyMSBsIDAsMCBjIDIwLjM3OCwwIDM2LjkwMiwyMi40IDM2LjkwMiw1MC4wMjEgbCAwLDAgYyAwLDI3LjYyMSAtMTYuNTI0LDUwLjAyIC0zNi45MDIsNTAuMDIgbCAwLDAgYyAtMjAuMzc3LDAgLTM2LjkwMiwtMjIuMzk5IC0zNi45MDIsLTUwLjAyIiAvPjwvZz48L2c+PC9nPjwvZz48L2c+PGcgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjU3NjA5MzE0LDAsMCwwLjU3NjA5MzE0LC03MS4zNTE4NTQsLTEzNS4xMzM1MSkiICAgICAgICAgaWQ9Imc0ODMyIiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7b3BhY2l0eToxIj48ZyAgICAgICAgICAgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoNDgzNikiICAgICAgICAgICBpZD0iZzQ4MzQiICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7b3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiI+PGcgICAgICAgICAgICAgaWQ9Imc0ODQwIiAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2Ij48ZyAgICAgICAgICAgICAgIGlkPSJnNDg0MiIgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2IiAvPjxnICAgICAgICAgICAgICAgaWQ9Imc0ODUyIiAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiMyODM5NDYiPjxnICAgICAgICAgICAgICAgICBpZD0iZzQ4NTQiICAgICAgICAgICAgICAgICBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGg0ODQ0KSIgICAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiMyODM5NDYiPjxnICAgICAgICAgICAgICAgICAgIGlkPSJnNDg1NiIgICAgICAgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiI+PGcgICAgICAgICAgICAgICAgICAgICBpZD0iZzQ4NTgiICAgICAgICAgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiIgLz48ZyAgICAgICAgICAgICAgICAgICAgIGlkPSJnNDg2MCIgICAgICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2Ij48ZyAgICAgICAgICAgICAgICAgICAgICAgaWQ9Imc0ODYyIiAgICAgICAgICAgICAgICAgICAgICAgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoNDg0OCkiICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2Ij48ZyAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwtMSwxNDIuODY1NywyODQuMTUxNCkiICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPSJmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0OjkwMDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtc2l6ZToxMTUuMTk5OTk2OTVweDtmb250LWZhbWlseTonQXZlbmlyIExUIFN0ZCA2NSBNZWRpdW0nOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246QXZlbmlyTFRTdGQtQmxhY2s7d3JpdGluZy1tb2RlOmxyLXRiO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO2ZpbGw6IzI4Mzk0NiIgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9InRleHQ0ODY0Ij48cGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9Im0gNzUuNDU1OTk4LC03MS42NTQzOTggYyAtNi45MTIsLTguODcwNCAtMTguNDMyLC0xMS45ODA4IC0yNy41MzI3OTksLTExLjk4MDggLTI1LjQ1OTIsMCAtNDQuMDA2Mzk5MSwxNi43MDQgLTQ0LjAwNjM5OTEsNDIuODU0Mzk5IDAsMjYuMTUwMzk5IDE4LjU0NzE5OTEsNDIuODU0Mzk4OSA0NC4wMDYzOTkxLDQyLjg1NDM5ODkgMTEuMTc0Mzk5LDAgMjIuNjk0Mzk5LC00LjQ5Mjc5OTggMjkuNDkxMTk5LC0xNC4xNjk1OTk5IGwgLTE0Ljk3NiwtMTEuMTc0Mzk5IGMgLTMuNjg2NCw1LjUyOTU5OSAtOS41NjE1OTksOC43NTUxOTkgLTE2LjgxOTE5OSw4Ljc1NTE5OSAtMTMuMDE3NiwwIC0yMy4wNCwtMTEuMDU5MTk5IC0yMy4wNCwtMjYuMjY1NTk5IDAsLTE1LjIwNjQgMTAuMDIyNCwtMjYuMjY1NTk5IDIzLjYxNiwtMjYuMjY1NTk5IDYuNjgxNiwwIDExLjg2NTU5OSwyLjQxOTIgMTUuNDM2Nzk5LDYuNjgxNiBsIDEzLjgyNCwtMTEuMjg5NiB6IiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiMyODM5NDYiICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9InBhdGg0MjEwIiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjxnICAgICAgICAgICAgIGlkPSJnNDg2OCIgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiI+PGcgICAgICAgICAgICAgICBpZD0iZzQ4NzAiICAgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiIgLz48ZyAgICAgICAgICAgICAgIGlkPSJnNDg4MCIgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2Ij48ZyAgICAgICAgICAgICAgICAgaWQ9Imc0ODgyIiAgICAgICAgICAgICAgICAgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoNDg3MikiICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2Ij48ZyAgICAgICAgICAgICAgICAgICBpZD0iZzQ4ODQiICAgICAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiMyODM5NDYiPjxnICAgICAgICAgICAgICAgICAgICAgaWQ9Imc0ODg2IiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiMyODM5NDYiIC8+PGcgICAgICAgICAgICAgICAgICAgICBpZD0iZzQ4ODgiICAgICAgICAgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiI+PGcgICAgICAgICAgICAgICAgICAgICAgIGlkPSJnNDg5MCIgICAgICAgICAgICAgICAgICAgICAgIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDQ4NzYpIiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzI4Mzk0NiI+PGcgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsLTEsMjQxLjA0NDksMzM1LjQ3OTUpIiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT0iZm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDo5MDA7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6NTEuMjAwMDAwNzZweDtmb250LWZhbWlseTonQXZlbmlyIExUIFN0ZCA2NSBNZWRpdW0nOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246QXZlbmlyTFRTdGQtQmxhY2s7d3JpdGluZy1tb2RlOmxyLXRiO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO2ZpbGw6IzI4Mzk0NiIgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9InRleHQ0ODkyIj48cGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9Im0gMi43MTM2LDAgNy42OCwwIDAsLTEyLjM5MDQgYyAwLC0zLjIyNTYgMC42MTQ0LC02LjM0ODggNC42MDgsLTYuMzQ4OCAzLjUzMjgsMCAzLjQzMDQsMy43Mzc2IDMuNDMwNCw1LjU4MDggbCAwLDEzLjE1ODQgNy42OCwwIDAsLTEzLjE1ODQgYyAwLC0zLjA3MiAxLjEyNjQsLTUuNTgwOCA0LjY1OTIsLTUuNTgwOCAyLjUwODgsMCAzLjM3OTIwMSwxLjk0NTYgMy4zNzkyMDEsNC4yNDk2IGwgMCwxNC40ODk2IDcuNjgsMCAwLC0xNC42OTQ0IGMgMCwtNi4wNDE2IC0yLjA0OCwtMTAuODAzMiAtOC44MDY0MDEsLTEwLjgwMzIgLTMuNjg2NCwwIC02LjA5MjgsMS4yOCAtNy44ODQ4LDQuNDU0NCAtMS4zMzEyLC0zLjAyMDggLTQuMTk4NCwtNC40NTQ0IC03LjY4LC00LjQ1NDQgLTMuNzM3NiwwIC02LjI0NjQsMi4wNDggLTcuMjcwNCwzLjk5MzYgbCAtMC4xMDI0LDAgMCwtMy4zNzkyIC03LjM3MjgsMCAwLDI0Ljg4MzIgeiIgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojMjgzOTQ2IiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSJwYXRoNDIxMyIgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9zdmc+">
          <br>Cloudmin</label>';
}

sub print_switch_webmail {
    my ($dynamic) = @_;
    print '<input'
        . ( $dynamic == 1 ? " class=\"dynamic\"" : "" )
        . ' id="open_webmail" id="open_webmail" name="product-switcher" type="radio"'
        . ( $is_webmail != -1 ? " checked" : "" ) . '>
          <label for="open_webmail">
          <i class="fa fa-envelope"></i>
          <br>Mail</label>';
}

sub print_category_link {
    local ( $link, $label ) = @_;
    print '<li>' . "\n";
    print '<a target="page" href="' . $link . '"> ' . $label . '</a>' . "\n";
    print '</li>' . "\n";
}

sub print_sysinfo_link {
    print '<li><a target="page" data-href="'
        . $gconfig{'webprefix'}
        . '/sysinfo.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-info"></i> <span>'
        . $text{'left_home'}
        . '</span></a></li>' . "\n";
}

sub print_sysinfo_warning {
    my (@info) = @_;

    # Show notifications first
    @info = sort {
        ( $b->{'type'} eq 'warning' ) <=> ( $a->{'type'} eq 'warning' )
    } @info;
    print '<br>';
    foreach my $info (@info) {
        if ( $info->{'type'} eq 'warning' ) {
            print &ui_alert_box( $info->{'warning'},
                $info->{'level'} || 'warn' );
        }
    }
}

sub print_extended_sysinfo {
    my (@info) = @_;
    if (@info) {
        print
            '<div class="panel-group" id="extended_sysinfo" role="tablist" aria-multiselectable="true">';
        foreach my $info (@info) {
            if (   $info->{'id'} ne 'sysinfo'
                && $info->{'id'} ne 'domain'
                && $info->{'id'} ne 'notifications'
                && $info->{'type'} ne 'link'
                && $info->{'module'} ne 'mailbox'
                && $a->{'type'} ne 'warning'
                && $b->{'type'} ne 'warning' )
            {
                our $charts_not_supported = 'no';
                if ( $info->{'type'} eq 'chart' ) {
                    foreach my $t ( @{ $info->{'chart'} } ) {
                        if ( $t->{'chart'}[0] < 0 || $t->{'chart'}[1] < 0 ) {
                            our $charts_not_supported = 'yes';
                        }
                    }
                }

                if ( $info->{'id'} && $charts_not_supported eq 'no' ) {

                    my $open
                        = $info->{'open'}
                        ? ' in'
                        : (
                        __settings('settings_sysinfo_expand_all_accordions')
                            eq 'true' ? ' in' : '' );

                    print '
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="'
                        . $info->{'id'} . '-' . $info->{'module'} . '">
                          <h4 class="panel-title">
                            <a data-toggle="collapse" href="#'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse" aria-expanded="true" aria-controls="'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse">
                              ' . $info->{'desc'} . '
                            </a>
                          </h4>
                        </div>
                    <div id="'
                        . $info->{'id'} . '-'
                        . $info->{'module'}
                        . '-collapse" class="panel-collapse collapse'
                        . $open
                        . '" role="tabpanel" aria-labelledby="'
                        . $info->{'id'} . '-'
                        . $info->{'module'} . '">
                      <div class="panel-body">';

                    print
                        '<div class="table-responsive" style="width:99.8%"><table class="table table-striped table-rounded"><tbody>';

                    if ($info->{'type'} eq 'table'
                        && (   $info->{'id'} ne 'sysinfo'
                            && $info->{'type'} ne 'link' )
                        )
                    {

                        foreach my $t ( @{ $info->{'table'} } ) {
                            my $__checkmark
                                = '<i class="fa fa-fw fa-lg fa-check text-success"></i>';
                            my $__stop
                                = '<i class="fa fa-fw fa-lg fa-times-circle text-danger"></i>';
                            my $__down
                                = '<i class="fa fa-fw fa-lg fa-minus-circle text-danger"></i>';
                            my $__start
                                = '<i class="fa fa-fw fa-lg fa-play text-success"></i>';
                            my $__restart
                                = '<i class="fa fa-fw fa-lg fa-refresh text-info"></i>';

                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/up.gif'.*?>/$__checkmark/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/stop.png'.*?>/$__stop/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/down.gif'.*?>/$__down/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/start.png'.*?>/$__start/g;
                            $t->{"value"}
                                =~ s/<img src='\/virtual-server\/images\/reload.png'.*?>/$__restart/g;

                            print '<tr>
                                <td>' . $t->{"desc"} . '</td>
                                <td>'
                                . $t->{"value"} . '</td>
                              </tr>';
                        }
                    }
                    elsif ( $info->{'type'} eq 'chart' ) {
                        foreach my $t ( @{ $info->{'chart'} } ) {
                            print '<tr>
                                <td style="width:25%">'
                                . $t->{"desc"} . '</td>
                                <td style="width:60%">
                                <div class="graph-container">
                                    <div class="graph">
                                        <strong class="bar" style="width:'
                                . $t->{'chart'}[1] . '%;">'
                                . $t->{'chart'}[1]
                                . '%</strong>
                                    </div>
                                </div>
                                </td>
                                      <td style="width:15%">'
                                . $t->{"value"} . '</td>
                              </tr>';
                        }
                    }
                    elsif ( $info->{'type'} eq 'html' ) {
                        $info->{'html'} =~ s/<script[^>]*>.*?<\/script>//igs;
                        print $info->{'html'};
                    }
                    print '</tbody></table></div>';

                    print '</div>
                    </div>
                </div>';

                }
            }
        }
        print '</div><br><br><br><br>';
    }

}

sub print_sysstat_link {
    if (   $virtual_server::module_info{'virtualmin'} eq 'pro'
        && $virtual_server_access_level eq '0'
        && ( -d $root_directory . "/virtual-server/timeplot" ) )
    {
        print '<li><a target="page" data-href="'
            . $gconfig{'webprefix'}
            . '/virtual-server/history.cgi" class="navigation_module_trigger"><i class="fa fa-fw fa-area-chart"></i> <span>'
            . $text{'left_statistics'}
            . '</span></a></li>' . "\n";
    }
}

sub print_search {
    if ( -r "$root_directory/webmin_search.cgi" && $gaccess{'webminsearch'} )
    {
        print
            '<li class="menu-container"><form id="webmin_search_form" action="webmin_search.cgi" target="page" role="search">'
            . "\n";
        print '<div class="form-group">' . "\n";
        if ( $is_virtualmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="virtual-server">'
                . "\n";
        }
        if ( $is_cloudmin != -1 ) {
            print
                '<input type="hidden" class="form-control" name="mod" value="server-manager">'
                . "\n";
        }

        if ((      &get_product_name() == 'webmin'
                || &get_product_name() == 'usermin'
            )
            && $is_virtualmin == -1
            && $is_cloudmin == -1
            )
        {
            $_search = ucfirst( &get_product_name() );
        }
        elsif ( $is_virtualmin != -1 ) {
            $_search = 'Virtualmin';
        }
        elsif ( $is_cloudmin != -1 ) {
            $_search = 'Cloudmin';
        }
        print
            '<i class="fa fa-search"></i><input type="text" class="form-control sidebar-search" name="search" placeholder="'
            . $text{'left_search'}
            . '" disabled>' . "\n";
        print '</div>' . "\n";
        print '</form></li>' . "\n";
    }
    else {
        print '<br>';
    }
}

sub add_webprefix {
    my ($link) = @_;
    if ( substr( $link, -5 ) eq '&amp;' ) {
        $link = substr( $link, 0, -5 );
    }
    return $link =~ /^\// ? $gconfig{'webprefix'} . $link : $link;
}

sub print_left_menu {
    my ( $module, $items, $group ) = @_;
    my $__hr = 0;
    foreach my $item (@$items) {
        if ( $module eq $item->{'module'} || $group ) {

            my $link = add_webprefix( $item->{'link'} );

            if (   $item->{'type'} eq 'item'
                && $link ne "/virtual-server/edit_lang.cgi"
                && $link ne "/virtual-server/edit_lang.cgi"
                && $link ne "/virtual-server/history.cgi" )
            {

                # Define an icon for the link/accordion
                if (   $link eq "/virtual-server/index.cgi"
                    || $link eq "/server-manager/index.cgi" )
                {
                    our $icon = '<i class="fa fa-fw fa-tasks"></i>';
                }
                elsif ($link eq "/mailbox/list_folders.cgi"
                    || $link eq "/mailbox/list_ifolders.cgi" )
                {
                    our $icon = '<i class="fa fa-fw fa-folder"></i>';
                }
                elsif ( $link eq "/mailbox/list_addresses.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-users"></i>';
                }
                elsif ( $link eq "/filter/edit_forward.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-share"></i>';
                }
                elsif ( $link eq "/filter/edit_auto.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-reply-all"></i>';
                }
                elsif ( $link eq "/filter/" ) {
                    our $icon = '<i class="fa fa-fw fa-filter"></i>';
                }
                elsif ( $link eq "/mailbox/edit_sig.cgi" ) {
                    our $icon = '<i class="fa fa-fw fa-pencil"></i>';
                }
                elsif ( index( $link, 'mailbox/index.cgi?id=' ) > -1 ) {
                    our $icon = '<i class="fa fa-fw fa-folder-o"></i>';
                }

                if ( __settings('settings_leftmenu_singlelink_icons') ne
                    'false' )
                {
                    if (index( $link, '/virtual-server/domain_form.cgi' )
                        > -1 )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-plus-square-o"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/edit_domain.cgi' )
                        > -1
                        || index( $link, '/server-manager/edit_serv.cgi' )
                        > -1 )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-pencil-square-o"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/view_domain.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-info-circle"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/list_users.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-users"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_aliases.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-envelope-o"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_databases.cgi' )
                        > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-database"></i>';
                    }
                    elsif (
                        index( $link, '/virtual-server/list_scripts.cgi' )
                        > -1
                        || index(
                            $link, '/server-manager/mass_update_form.cgi'
                        ) > -1
                        )
                    {
                        our $icon = '<i class="fa fa-fw fa-archive"></i>';
                    }

                    elsif (
                        index( $link, '/virtual-server/edit_html.cgi' ) > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-globe"></i>';
                    }
                    elsif (
                        index( $link, '/server-manager/edit_pass.cgi' ) > -1 )
                    {
                        our $icon = '<i class="fa fa-fw fa-key"></i>';
                    }
                    elsif (
                        index( $link, '/server-manager/save_serv.cgi' ) > -1 )
                    {
                        if ( index( $link, 'refresh=1' ) > -1 ) {
                            our $icon = '<i class="fa fa-fw fa-refresh"></i>';
                        }
                        elsif ( index( $link, 'regen=1' ) > -1 ) {
                            our $icon = '<i class="fa fa-fw fa-retweet"></i>';
                        }
                    }
                    elsif ($link =~ /^http:\/\//
                        || $link =~ /^https:\/\//
                        || $link =~ /^ftp:\/\//
                        || $link =~ /^ftps:\/\// )
                    {
                        our $icon
                            = '<i class="fa fa-fw fa-external-link"></i>';
                    }

                }

                # Set variable in case it hasn't been set before
                if ( !length $link ) {
                    our $icon = undef;
                }

                if ($link
                    && index( $link, '/virtual-server/list_scripts.cgi' )
                    == -1
                    && index( $link, '/virtual-server/edit_html.cgi' ) == -1
                    && index( $link, '/virtual-server/list_buckets.cgi' )
                    == -1
                    || ((   __settings('settings_leftmenu_vm_installscripts')
                            ne 'false' && index(
                                $link, '/virtual-server/list_scripts.cgi'
                            ) > -1
                        )
                        || ( __settings('settings_leftmenu_vm_webpages') ne
                            'false'
                            && index( $link, '/virtual-server/edit_html.cgi' )
                            > -1 )
                        || (__settings('settings_leftmenu_vm_backup_amazon')
                            ne 'false'
                            && index(
                                $link, '/virtual-server/list_buckets.cgi'
                            ) > -1
                        )
                    )
                    )
                {
                    print '<li>' . "\n";
                    print '<a target="page" '
                        . (
                        !$group
                        ? "class=\"navigation_module_trigger\" data-"
                        : ''
                        )
                        . 'href="'
                        . $link . '">'
                        . ( index( $icon, '<i ' ) > -1 ? $icon : '' )
                        . ' <span>'
                        . $item->{'desc'}
                        . '</span></a>' . "\n";
                    print '</li>' . "\n";
                    print "\n";
                }

            }
            elsif ( $item->{'type'} eq 'cat' ) {
                my $c = $item->{'id'};
                if ( $item->{'module'} ne 'mailbox' ) {
                    &print_category( $c, $item->{'desc'} );
                }
                print '<ul class="sub" style="display: none;" id="'
                    . $c . '">' . "\n";
                print_left_menu( $module, $item->{'members'}, 1 );
                print "</ul>\n";
            }
            elsif ( $item->{'type'} eq 'hr' ) {
                if ( $__hr eq '1' ) {
                    print_search();
                }
                $__hr++;
            }
            elsif (
                ( $item->{'type'} eq 'menu' || $item->{'type'} eq 'input' )
                && $item->{'module'} ne 'mailbox' )
            {
                # For with an input of some kind
                if ( $item->{'cgi'} ) {
                    print
                        "<li class=\"menu-container\"><form action='$item->{'cgi'}' target=page>\n";
                }
                else {
                    print "<li class=\"menu-container\"><form>\n";
                }
                foreach my $h ( @{ $item->{'hidden'} } ) {
                    print ui_hidden(@$h);
                }
                print $item->{'desc'}, "\n";
                if ( $item->{'type'} eq 'menu' ) {
                    my $sel = "";
                    if ( $item->{'onchange'} ) {
                        $sel = "window.parent.frames[1].location = "
                            . "\"$item->{'onchange'}\" + this.value";
                    }
                    print ui_select(
                        $item->{'name'},
                        $item->{'value'},
                        $item->{'menu'},
                        1,
                        0,
                        0,
                        0,
                        "data-autocomplete-title=\"
                            "
                            . (
                            index( $ENV{'REQUEST_URI'}, 'virtualmin' ) != -1
                            ? $text{'right_fdoms'}
                            : $text{'right_fvm2'}
                            )
                            . "
                            \" "
                            . "style='width:236px; margin-top: 0 !important' disabled"
                    );

                }
                print "</form></li>\n";
            }
        }
    }
}

sub print_progressbar_colum {
    my ( $xs, $sm, $percent, $label ) = @_;
    use POSIX;
    $percent = ceil($percent);
    if ( $percent < 75 ) {
        $class = 'success';
    }
    elsif ( $percent < 90 ) {
        $class = 'warning';
    }
    else {
        $class = 'danger';
    }
    print '<div class="col-xs-' . $xs . ' col-sm-' . $sm . '">' . "\n";
    print '<div data-progress="'
        . $percent
        . '" class="progress progress-circle">' . "\n";
    print '<div class="progress-bar-circle progress-bar-' . $class . '">'
        . "\n";
    print '<div class="progress-bar-circle-mask progress-bar-circle-full">'
        . "\n";
    print '<div class="progress-bar-circle-fill"></div>' . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-mask progress-bar-circle-half">'
        . "\n";
    print '<div class="progress-bar-circle-fill"></div>' . "\n";
    print
        '<div class="progress-bar-circle-fill progress-bar-circle-fix"></div>'
        . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-inset">' . "\n";
    print '<div class="progress-bar-circle-title">' . "\n";
    print '<strong class="text-muted">' . $label . '</strong>' . "\n";
    print '</div>' . "\n";
    print '<div class="progress-bar-circle-percent">' . "\n";
    print '<span></span>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
    print '</div>' . "\n";
}

sub get_col_num {
    my ( $info, $max_col ) = @_;
    my $num_col = 0;
    if ( $info->{'cpu'} ) { $num_col++; }
    if ( $info->{'mem'} ) {
        @m = @{ $info->{'mem'} };
        if ( @m && $m[0] ) { $num_col++; }
        if ( @m && $m[2] ) { $num_col++; }
    }
    if ( $info->{'disk_total'} ) { $num_col++; }
    my $col = $max_col / $num_col;
    return $col;
}

sub print_table_row {
    local ( $title, $content ) = @_;
    print '<tr>' . "\n";
    print
        '<td style="width:30%;vertical-align:middle; padding:10px;"><strong>'
        . $title
        . '</strong></td>' . "\n";
    print '<td  style="width:70%; vertical-align:middle; padding:10px;">'
        . $content . '</td>' . "\n";
    print '</tr>' . "\n";
}

sub get_virtualmin_user_level {
    local ( $hasvirt, $hasvm2, $level );
    $hasvm2  = &foreign_available("server-manager");
    $hasvirt = &foreign_available("virtual-server");
    if ($hasvm2) {
        &foreign_require( "server-manager", "server-manager-lib.pl" );
    }
    if ($hasvirt) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
    }
    if ($hasvm2) {
        $level = $server_manager::access{'owner'} ? 4 : 0;
    }
    elsif ($hasvirt) {
        $level
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;
    }
    elsif ( &get_product_name() eq "usermin" ) {
        $level = 3;
    }
    else {
        $level = 0;
    }
    return ( $hasvirt, $level, $hasvm2 );
}

sub parse_license_date {
    if ( $_[0] =~ /^(\d{4})-(\d+)-(\d+)$/ ) {
        return eval { timelocal( 0, 0, 0, $3, $2 - 1, $1 - 1900 ) };
    }
    return undef;
}

sub parse_virtual_server_access_level {

    # Where we at
    if ( &foreign_available("virtual-server") ) {
        &foreign_require( "virtual-server", "virtual-server-lib.pl" );
        our $virtual_server_access_level
            = &virtual_server::master_admin()   ? 0
            : &virtual_server::reseller_admin() ? 1
            :                                     2;
    }
    return $virtual_server_access_level;
}

sub _post_install {

    #Clear update notice
    unlink $root_directory . '/authentic-theme/update';

    return '1';
}

sub embed_logo {
    if ( $ENV{'SCRIPT_NAME'} eq '/session_login.cgi' ) {
        our $logo = 'logo_welcome';
    }
    else {
        our $logo = 'logo';
    }
    if ( -r $config_directory . "/authentic-theme/" . $logo . ".png" ) {

# Store logo in config directory, defaults in most case to `/etc/webmin`. Theme config directory is `/etc/webmin/authentic-theme`
        if (  -s $config_directory
            . "/authentic-theme/"
            . $logo
            . ".png" ne -s $root_directory
            . "/authentic-theme/images/"
            . $logo
            . ".png" )
        {
            # Update logo in case it changed
            copy_source_dest(
                $config_directory . "/authentic-theme/" . $logo . ".png",
                $root_directory . "/authentic-theme/images" );
        }
        print '<div class="__logo _' . $logo . '">';
        print '<img src="'
            . $gconfig{'webprefix'}
            . '/images/'
            . $logo
            . '.png">';
        print '</div>' . "\n";
    }
    elsif ( -r $root_directory . "/authentic-theme/images/" . $logo . ".png"
        && !-r $config_directory . "/authentic-theme/" . $logo . ".png" )
    {
        # Delete logo
        unlink $root_directory . "/authentic-theme/images/" . $logo . ".png";
    }
}

sub embed_styles {
    if ( -r $config_directory . "/authentic-theme/styles.css" ) {
        if (  -s $config_directory
            . "/authentic-theme/styles.css" ne -s $root_directory
            . "/authentic-theme/unauthenticated/css/styles.css" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/styles.css",
                $root_directory . "/authentic-theme/unauthenticated/css"
            );
        }
        print '<link href="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/css/styles.css" rel="stylesheet" type="text/css">'
            . "\n";
    }
    elsif ( -r $root_directory
        . "/authentic-theme/unauthenticated/css/styles.css"
        && !-r $config_directory
        . "/authentic-theme/styles.css" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/css/styles.css";
    }
}

sub embed_settings {
    if ( -r $config_directory . "/authentic-theme/settings.js" ) {
        if (  -s $config_directory
            . "/authentic-theme/settings.js" ne -s $root_directory
            . "/authentic-theme/unauthenticated/js/settings.js" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/settings.js",
                $root_directory . "/authentic-theme/unauthenticated/js"
            );
        }
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/settings.js" type="text/javascript"></script>'
            . "\n";
    }
    elsif ( -r $root_directory
        . "/authentic-theme/unauthenticated/js/settings.js"
        && !-r $config_directory
        . "/authentic-theme/settings.js" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/js/settings.js";
    }
}

sub embed_scripts {
    if ( -r $config_directory . "/authentic-theme/scripts.js" ) {
        if (  -s $config_directory
            . "/authentic-theme/scripts.js" ne -s $root_directory
            . "/authentic-theme/unauthenticated/js/scripts.js" )
        {
            copy_source_dest(
                $config_directory . "/authentic-theme/scripts.js",
                $root_directory . "/authentic-theme/unauthenticated/js"
            );
        }
        print '<script src="'
            . $gconfig{'webprefix'}
            . '/unauthenticated/js/scripts.js" type="text/javascript"></script>'
            . "\n";
    }
    elsif (
        -r $root_directory . "/authentic-theme/unauthenticated/js/scripts.js"
        && !-r $config_directory . "/authentic-theme/scripts.js" )
    {
        unlink $root_directory
            . "/authentic-theme/unauthenticated/js/scripts.js";
    }
}

sub get_authentic_version {

    # Get local version
    my $installed_version
        = read_file_lines( $root_directory . "/authentic-theme/VERSION.txt",
        1 );
    our $installed_version = $installed_version->[0];

    $installed_version =~ s/^\s+|\s+$//g;
    $installed_version = sprintf '%.2f', $installed_version;

    if ( __settings('settings_sysinfo_theme_updates') eq 'false' ) {
        $remote_version = '0';
    }
    else {
        # Get remote version if allowed
        http_download(
            'raw.githubusercontent.com',                 '443',
            '/qooob/authentic-theme/master/VERSION.txt', \$remote_version,
            \$error,                                     undef,
            1,                                           undef,
            undef,                                       5
        );

        # Trim versions' number
        $remote_version =~ s/^\s+|\s+$//g;
        $remote_version = sprintf '%.2f', $remote_version;
    }

    return ( $installed_version, $remote_version );
}

sub __settings {
    my ($_s) = @_;
    my $f = $config_directory . "/authentic-theme/settings.js";
    if ( -r $f ) {
        for (
            split(
                '\n',
                $s = do {
                    local $/ = undef;
                    open my $fh, "<", $f;
                    <$fh>;
                    }
            )
            )
        {
            if ( index( $_, '//' ) == -1
                && ( my @m = $_ =~ /(?:$_s\s*=\s*(.*))/g ) )
            {
                my $m = join( '\n', @m );
                $m =~ s/[\'\;]//g;
                return $m;
            }
        }
    }
}

sub notify {
    our ($type) = @_;
    if ( __settings($type) ) {
        my %messages = (
            "%1" => $remote_user,
            "%2" => $ENV{REMOTE_ADDR},
            "%3" => ucfirst( &get_product_name() )
        );
        my %subjects = ( "%3" => ucfirst( &get_product_name() ) );
        my @mail = split( /\|/, __settings($type) );
        ( my $message = $mail[0] )
            =~ s/(@{[join "|", keys %messages]})/$messages{$1}/g;
        ( my $subject = $mail[1] )
            =~ s/(@{[join "|", keys %subjects]})/$subjects{$1}/g;
        if (  !length $mail[3]
            || length $mail[3] && index( $mail[3], $ENV{REMOTE_ADDR} ) == -1 )
        {
            system(`echo "$message" | mail -s "$subject" "$mail[2]"`);
        }
    }
}

sub prt {
    my ($____v) = @_;
    use Data::Dumper;
    print '<div style="color: white">';
    print Dumper $____v;
    print '</div>';
}

