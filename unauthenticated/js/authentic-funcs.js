/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
function addmodule(e, t) {
    return adduser(e, t), !1
}

function addgroup(e, t) {
    return adduser(e, t), !1
}

function adduser(e, t) {
    return $v__mpp__g_olt = 0, $('.mppopup input[data-role="tagsinput"]').tagsinput("add", e), setTimeout(function() {
        v__mpp__ml_t__e || ($(".mppopup_filter_input").val(""), $(".mppopup_filter_input").focus().trigger("keyup")), v__mpp__ml_t__e = 0
    }, 440), !1
}

function parentdir(e) {
    fileclick(e, "1"), $v__mpp__g_gp = 1
}

function fileclick(e, t) {
    $v__mpp__g_ol = e, $v__mpp__g_olt = t
}

function select(e, t) {
    return $data_mppopup_value.val(e), !1
}

function filter_match(e, t, i) {
    t = "", i = i || !1;
    var a = function(e) {
        e = e || !1;
        var a = $(".mppopup table tbody tr");
        if (a.length > 0)
            for (var n = 0; n < a.length; n++) {
                var s = a[n],
                    r = s.className;
                (i || r === t) && (i && null === r.match(t) || (s.style.display = e ? "" : "none"))
            }
        return a
    };
    if ("" !== (e = e.trim())) {
        var n = a(!1);
        if (n.length > 0)
            for (var s = 0; s < n.length; s++) {
                var r = n[s].className;
                if ((i || r === t) && (!i || null !== r.match(t)))
                    for (var _ = n[s].getElementsByTagName("a"), o = 0; o < _.length; o++) {
                        var l = _[o].innerHTML.trim();
                        "" !== (l = l.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "")) && (l = l.toLowerCase()).match(e.toLowerCase()) && (n[s].style.display = "")
                    }
            }
    } else a(!0)
}

function tab_action(e, t) {
    document.forms[0] && document.forms[0][e] && (document.forms[0][e].value = t)
}

function hidden_opener(e, t) {
    0 === $("#" + e).parent(".opener_container").length && $("#" + e).wrapAll('<div class="opener_container opener_sub_container margined-top"></div>'), $("#" + e).hasClass("opener_shown") ? ($("#" + e).parent(".opener_container").prev(".opener_extra_container.opener_extra_container_style").find(".opener_extra_container_a_style").removeClass("opener_container_opened").addClass("opener_container_closed"), $("#" + e).parent(".opener_container").prev("p").find(".opener_extra_container_a_style").removeClass("opener_container_opened").addClass("opener_container_closed"), $("#" + e).parent(".opener_container").parent("tr").prev("tr").find("td a:nth-child(1)").removeClass("opener_container_opened").addClass("opener_container_closed"), $("#" + e).parent(".opener_container").show().find("#" + e).slideUp($settings_animation_tabs_slide_time, function() {
        $("#" + e).removeClass("opener_shown").addClass("opener_hidden").parent('.opener_container:not(".opener_sub_container")').hide(), $("#" + e).parent(".opener_sub_container").removeClass("margined-top")
    })) : ($("#" + e).parent(".opener_container").prev(".opener_extra_container.opener_extra_container_style").find(".opener_extra_container_a_style").addClass("opener_container_opened").removeClass("opener_container_closed"), $("#" + e).parent(".opener_container").prev("p").find(".opener_extra_container_a_style").addClass("opener_container_opened").removeClass("opener_container_closed"), $("#" + e).parent(".opener_container").parent("tr").prev("tr").find("td a:nth-child(1)").addClass("opener_container_opened").removeClass("opener_container_closed"), $("#" + e).slideUp(0).removeClass("opener_hidden").addClass("opener_shown").parent(".opener_container").slideDown($settings_animation_tabs_slide_time).find(".opener_shown").slideDown($settings_animation_tabs_slide_time), $("#" + e).parent(".opener_sub_container").addClass("margined-top"))
}

function select_mode(e) {
    var t = v___available_navigation ? 1 : 0,
        a = t && ($t_uri_virtualmin || $t_uri_cloudmin) ? 1 : 0;
    for (i = 0; i < document.forms[0 + t + a].mode.length; i++) document.forms[0 + t + a].mode[i].checked = document.forms[0 + t + a].mode[i].value == e
}

function theme_select_all_link(e, t) {
    var a = v___available_navigation ? 1 : 0,
        n = a && ($t_uri_virtualmin || $t_uri_cloudmin) ? 1 : 0,
        s = document.forms[e + a + n][t];
    if (s)
        for (s.checked = !0, i = 0; i < s.length; i++) s[i].disabled || (s[i].checked = !0)
}

function theme_select_invert_link(e, t) {
    var a = v___available_navigation ? 1 : 0,
        n = a && ($t_uri_virtualmin || $t_uri_cloudmin) ? 1 : 0,
        s = document.forms[e + a + n][t];
    if (s)
        for (s.checked = !s.checked, i = 0; i < s.length; i++) s[i].disabled || (s[i].checked = !s[i].checked)
}

function theme_date_chooser(e, t, i, a) {
    var n = 1 == $(t).find("option:eq(0)").val() ? 0 : 1,
        s = $(a);
    parseInt($(e).val()), !!$(t).val() && parseInt($(t).val()), $(i).val();
    s.datepicker({
        format: " yyyy-m-d",
        language: get_server_data("language"),
        autoclose: !0
    }).on("hide", function(a) {
        var r = !!s.val() && s.val().split("-");
        s.val(""), r && ($(e).val(parseInt(r[2])), $(t).val(parseInt(r[1]) - n), $(i).val(parseInt(r[0])))
    }).focus()
}

function g__line_breaker(e, t, i) {
    e && t.text() && t.text().length && $.each(t, function() {
        var e = new RegExp(RegExp.quote(i), "g"),
            t = $(this).text().replace(e, ", ");
        $(this).html("<br>" + t)
    })
}

function g__text_breaker(e, t) {
    if (e.val()) {
        var i = e.val().split(t),
            a = "";
        $.each(i, function(e, i) {
            i && (a += t + i + "\n")
        }), e.val(a)
    }
}

function extract_content(e, t, i, a) {
    if (!e) return 0;
    var n = a ? 0 : t.length,
        s = a ? i.length : 0,
        r = e.indexOf(t),
        _ = e.indexOf(i, r),
        o = -1 === _ ? e.length : _;
    return e.slice(r + n, o + s)
}

function get_form_data(e) {
    return (e.attr("enctype") && e.attr("enctype").indexOf("form-data") > -1 ? 0 : 1) ? e.serialize() : new FormData(e[0])
}

function page_extended() {
    return "settings-upload.cgi" === v___location_file || "settings-upload_save.cgi" === v___location_file || "settings-editor_read.cgi" === v___location_file || "settings-editor_write.cgi" === v___location_file || "settings-favorites_save.cgi" === v___location_file ? 1 : 0
}

function get_bundle_csf() {
    var e = $("head"),
        t = v___server_extensions_path + "/csf/csf." + v___source_type + ".css?" + v___theme_version_plain,
        i = v___server_extensions_path + "/csf/csf." + v___source_type + ".js?" + v___theme_version_plain;
    Test.arrContains(o___gotten_scripts, i) || (e.append('<link href="' + t + '" rel="stylesheet" type="text/css">'), $.getScript("" + i, function(e, t, a) {
        o___gotten_scripts.push(i)
    }))
}

function get_bundle_file_manager(e) {
    $("head");
    var t = v___server_extensions_path + "/file-manager/file-manager." + v___source_type + ".js?" + v___theme_version_plain;
    Test.arrContains(o___gotten_scripts, t) || $.getScript("" + t, function(i, a, n) {
        o___gotten_scripts.push(t), e && ___f__tw()
    })
}

function get_bundle_sql() {
    $("head");
    var e = v___server_extensions_path + "/sql." + v___source_type + ".js?" + v___theme_version_plain;
    Test.arrContains(o___gotten_scripts, e) || $.getScript("" + e, function(t, i, a) {
        o___gotten_scripts.push(e)
    })
}

function theme_open_new_tab(e) {
    var e = Test.strContains(e, v___location_origin) ? e : v___location_origin + (e.startsWith("/") ? e : "/" + e);
    $("body").append('<a href="' + e + '" target="_blank" class="hidden" id="theme_open_new_tab"></a>'), $("#theme_open_new_tab").simulateUserClick().remove()
}

function theme_to_new_tab() {
    $.each($('a[href*="virtualmin-awstats/view.cgi?config="],             .virtualmin-awstats a[href*="view.cgi?config="],             a.ui_link_replaced[href*="search.cgi/webminlog"]   '), function() {
        $(this).addClass("--to-new-tab")
    })
}

function theme_reload() {
    window.location.href = location.origin + v___location_prefix
}

function theme_update_notice(e) {
    0 === $("#update_notice").length && $.ajax({
        type: "POST",
        url: v___location_prefix + "/index.cgi?xhr-get_update_notice=1",
        success: function(t) {
            $("body").prepend(t);
            var i = $("#update_notice");
            e && i.addClass("r"), i.modal("show")
        },
        error: function(e) {}
    })
}

function theme_title_generate() {
    if (v___available_navigation) {
        var e = $("#headln2c span[data-main_title]").text() || $('.panel-heading font[size="+2"]').text();
        if ($('li.sub_active a[href*="' + v___module_file_manager + '"]').length) {
            var t = v___module_file_manager;
            $('body[class*="' + t + '"] .active form input#path').val() ? document.title = Convert.uriDecodeComponent($('body[class*="' + t + '"] .active form input#path').val()) + " - " + $("li.sub_active a").text() + " — " + v___title_initial : document.title = $("li.sub_active a").text() + " — " + v___title_initial
        } else($t_uri_virtualmin || $t_uri_cloudmin) && $("aside select option:checked").text() && $("aside select option:checked").text().length ? e && e.length ? $("#webmin_search_form").parent("li").prevAll().has(".sub_active, .current-large").length ? document.title = $("aside select option:checked").text() + " - " + e + " — " + v___title_initial : document.title = e + " — " + v___title_initial : document.title = get_navigation_module_name() + " — " + v___title_initial : $t_uri_webmail ? e && e.length ? document.title = e + " - Mail  — " + v___title_initial : document.title = get_navigation_module_name() + " — " + v___title_initial : e && e.length ? document.title = e + " — " + v___title_initial : document.title = v___title_initial;
        var i = $(".right-side-tabs .list-group-item:not(.no-notifications, .opacity-0_3)").length;
        settings_side_slider_enabled && settings_side_slider_notifications_enabled ? titlenotifier.set(i) : titlenotifier.set(0)
    }
}

function navigation_clear() {
    var e = ".navigation";
    $(e + " li.has-sub").removeClass("sub_active"), $(e + " > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove(), $(e + " > li > ul.sub > li").removeClass("sub_active").find("span.current").remove(), $(e + " > li.has-sub").removeClass("active"), $(e + " > li > ul.sub").hide(), $(e + " > li > a > i.fa.fa-folder-open-o").removeClass("fa-folder-open-o")
}

function navigation_detect(e, t) {
    if (Test.arrContains(["webmin_search.cgi"], v___location_file)) navigation_clear();
    else {
        if (void 0 === t) {
            if (v___blocked_navigation) return;
            var i = 1,
                a = $('.navigation a[href*="' + v___location_path + '"]:not([data-parent-hidden]):first');
            $('.navigation a[href^="' + v___location_resource + '"]:not([data-parent-hidden]):first').length ? (e = v___location_resource, i = 0) : Test.strContains(v___location_file, "cgi") && a.length && (e = a.attr("href"), i = 0);
            var e = e ? e.replace("/edit_users.cgi", "/list_users.cgi").replace("/edit_user.cgi", "/list_users.cgi").replace("/edit_alias.cgi", "/list_aliases.cgi").replace("/edit_database.cgi", "/list_databases.cgi").replace("/save_database.cgi", "/list_databases.cgi").replace("/edit_script.cgi", "/list_scripts.cgi").replace("/script_form.cgi", "/list_scripts.cgi") : e;
            i && Test.strContains(v___location_resource, "config.cgi") && (e = $t_uri_virtualmin ? v___location_prefix + "/config.cgi?virtual-server" : $t_uri_cloudmin ? v___location_prefix + "/config.cgi?server-manager" : v___location_prefix + "/" + v___location_query + "/");
            var n = $t_uri_webmin || $t_uri_usermin;
            if (!e && n)
                if (Test.strContains(v___location_file, ".cgi") && !Test.strContains(v___location_file, "sysinfo.cgi")) e = v___location_path.replace(v___location_file, ""), page_extended() && (e = v___location_prefix + "/webmin/");
                else if (!e) {
                var s = new RegExp("^" + v___location_prefix, "i");
                e = get_server_data("data-uri").replace(s, "").split("/").filter(function(e) {
                    return 0 !== e.length
                })[0], e = v___location_prefix + "/" + e
            }
            targeted_menu_link = $('.navigation a[href^="' + e + '"]:not([data-parent-hidden]):first'), targeted_menu_link.length && navigation_clear()
        } else targeted_menu_link = $('.navigation a[href^="' + e + '"]:not([data-parent-hidden]):first'), targeted_menu_link.length && navigation_clear();
        targeted_menu_link.parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
    }
}

function navigation_render_start() {
    $(".mCSB_container, .mCSB_dragger").css("top", "0"), !$("#_menu_loader").length && $("body ul.navigation").before('<span id="_menu_loader" class="loading loading-sm"></span>'), setTimeout(function() {
        $("#loader-close-sm").removeClass("hidden"), $("#loader-close-sm i").trigger("click")
    }, 4200), $("body aside .mCSB_scrollTools, body ul.navigation, body ul.user-links").css("visibility", "hidden"), $("aside ul.user-html").addClass("invisible")
}

function navigation_render_end() {
    $("aside ul.user-html").removeClass("invisible"), $("body aside .mCSB_scrollTools, body ul.navigation, body ul.user-links").css("visibility", "visible"), $("#_menu_loader").remove(), navigation_init_select(), navigation_select_label(), theme_to_new_tab()
}

function navigation_display() {
    "none" == $("aside").css("transform") && ($("aside").transition({
        x: settings_leftmenu_width
    }, 2.5 * $settings_animation_left_slide_time, function() {
        $(".__logo") && "none" == $(".__logo").css("transform") && !$(".mobile-menu-toggler:visible").length && $(".__logo").transition({
            y: "-140px"
        }, 1.5 * $settings_animation_left_slide_time)
    }), setTimeout(function() {
        $(".switch-toggle").css("display", "table")
    }, 1))
}

function navigation_hide() {
    var e = "mobile-menu-toggler";
    "function" == typeof jQuery().transition && $("." + e + ":visible").length && $("." + e).attr("style") && -1 == $("." + e).attr("style").indexOf("ease") && ($(".__logo") && $(".__logo").transition({
        y: 0
    }, 1.5 * $settings_animation_left_slide_time), $("aside, ." + e).transition({
        x: 0
    }, $settings_animation_left_slide_time, function() {
        $("." + e).removeClass("selected").find("button").removeClass("btn-primary").addClass("btn-primary"), $(".switch-toggle").css("display", "none"), $("aside").addClass("hidden-xs")
    }))
}

function navigation_init_select() {
    $(".form-control.sidebar-search").is(":focus") || $.each($("aside select > option"), function() {
        var e = $(this).text().match(/^\s{0,4}/)[0].length,
            t = $(this).text();
        settings_leftmenu_vm_cm_dropdown_icons && (4 === e && -1 === t.indexOf("↱") ? $(this).html("&nbsp;&nbsp;&nbsp;&nbsp;↱&nbsp;" + t.replace(/\s/g, "")) : 2 === e && -1 === t.indexOf("↴") && $(this).html("&nbsp;&nbsp;↴&nbsp;" + t.replace(/\s/g, "")))
    }).promise().done(function() {
        var e = $("aside select");
        e.length && (e.removeAttr("onchange disabled"), !!e.data("select2") && e.select2("destroy"), e.unbind("select2:select"), e.select2({
            minimumResultsForSearch: $.browser.mobile ? -1 : 5
        }), setTimeout(function() {
            var t = e.data("select2");
            t && (t.open(), t.close())
        }, 1), e.on("select2:select", function(e) {
            "dom" === e.currentTarget.id ? (get_navigation_menu_virtualmin(e.currentTarget.value), get_default_virtualmin_content(e.currentTarget.value)) : "sid" === e.currentTarget.id && (get_navigation_menu_cloudmin(e.currentTarget.value), get_default_cloudmin_content(e.currentTarget.value))
        }), e.on("select2:open", function(e) {
            $.each($("select > option"), function() {
                if ($(this).attr("style") && $(this).attr("style").indexOf("italic") > -1) {
                    var e = $(this);
                    setTimeout(function() {
                        $("body").find('li[id$="' + e.attr("value") + '"]').attr("style", "color: #" + (v___theme_night_mode_enabled ? "9a5150" : "e97471") + " !important;")
                    }, 1)
                }
            })
        }), 1 === $("aside select option").length && ($(".select2 span").css("cursor", "default"), $(".select2 .select2-selection__arrow").remove(), e.on("select2:open", function() {
            $(".select2-container .select2-dropdown").css("opacity", "0")
        })), $.each($("aside select > option"), function() {
            $(this).attr("style") && $(this).attr("style").indexOf("italic") > -1 && $(".select2-selection > .select2-selection__rendered").text().trim() == $(this).text().trim() && $(".select2-selection > .select2-selection__rendered").attr("style", "color: #" + (v___theme_night_mode_enabled ? "9a5150" : "e97471") + " !important;")
        }))
    })
}

function navigation_trigger(e, t) {
    return 1 === t && (e = e.replace("?" + $__theme_navigation, "").replace("&" + $__theme_navigation, "")), 2 === t && (Test.strContains(e, $__theme_navigation) || (e = Test.strContains(e, "?") ? e + "&" + $__theme_navigation : e + "?" + $__theme_navigation)), e
}

function navigation_init_autocomplete(e, t) {
    if ("c" != e || ($(".autocomplete-suggestions").remove(), $(".form-control.sidebar-search").removeAttr("disabled"), $(".form-control.sidebar-search").autocomplete("dispose"), $(".form-control.sidebar-search").val(""), !t)) {
        var i = {};
        $.each($('li:not(.menu-exclude):not(.user-link) > ul[id^="global_"].sub > li:not(.menu-exclude):not(.user-link) > a'), function(e, t) {
            i[("/" == $(this).attr("href").substring(0, 1) ? "" : "/") + $(this).attr("href")] = $.trim($(this).text())
        }), $('li > a[target="page"][data-href="/virtual-server/index.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/sysinfo.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/virtual-server/pro/history.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_folders.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_ifolders.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_addresses.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_forward.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_auto.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_auto.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/edit_sig.cgi"]').each(function(e, t) {
            i[$(this).attr("data-href")] = $.trim($(this).text())
        });
        var a = $.map(i, function(e, t) {
                if ("undefined" != t) return {
                    value: e,
                    url: t,
                    data: {
                        category: get_navigation_module_name()
                    }
                }
            }),
            n = {};
        v___location_path != v___location_prefix + "/custom/" && v___location_path != v___location_prefix + "/custom/index.cgi" && v___location_path != v___location_prefix + "/backup-config/" && v___location_path != v___location_prefix + "/backup-config/index.cgi" && v___location_path != v___location_prefix + "/usermin/" && v___location_path != v___location_prefix + "/usermin/index.cgi" && v___location_path != v___location_prefix + "/webmin/" && v___location_path != v___location_prefix + "/webmin/index.cgi" && v___location_path != v___location_prefix + "/acl/" && v___location_path != v___location_prefix + "/acl/index.cgi" && v___location_path != v___location_prefix + "/init/" && v___location_path != v___location_prefix + "/init/index.cgi" && v___location_path != v___location_prefix + "/mount/" && v___location_path != v___location_prefix + "/mount/index.cgi" && v___location_path != v___location_prefix + "/quota/" && v___location_path != v___location_prefix + "/quota/index.cgi" && v___location_path != v___location_prefix + "/fsdump/" && v___location_path != v___location_prefix + "/fsdump/index.cgi" && v___location_path != v___location_prefix + "/inittab/" && v___location_path != v___location_prefix + "/inittab/index.cgi" && v___location_path != v___location_prefix + "/logrotate/" && v___location_path != v___location_prefix + "/logrotate/index.cgi" && v___location_path != v___location_prefix + "/mailcap/" && v___location_path != v___location_prefix + "/mailcap/index.cgi" && v___location_path != v___location_prefix + "/pam/" && v___location_path != v___location_prefix + "/pam/index.cgi" && v___location_path != v___location_prefix + "/proc/" && v___location_path != v___location_prefix + "/proc/index_tree.cgi" && v___location_path != v___location_prefix + "/proc/index_user.cgi" && v___location_path != v___location_prefix + "/proc/index_size.cgi" && v___location_path != v___location_prefix + "/proc/index_cpu.cgi" && v___location_path != v___location_prefix + "/proc/index_tree.cgi" && v___location_path != v___location_prefix + "/proc/index_search.cgi" && v___location_path != v___location_prefix + "/cron/" && v___location_path != v___location_prefix + "/cron/index.cgi" && v___location_path != v___location_prefix + "/syslog/" && v___location_path != v___location_prefix + "/syslog/index.cgi" && v___location_path != v___location_prefix + "/useradmin/" && v___location_path != v___location_prefix + "/useradmin/index.cgi" && v___location_path != v___location_prefix + "/apache/" && v___location_path != v___location_prefix + "/apache/index.cgi" && v___location_path != v___location_prefix + "/bind8/" && v___location_path != v___location_prefix + "/bind8/index.cgi" && v___location_path != v___location_prefix + "/dhcpd/" && v___location_path != v___location_prefix + "/dhcpd/index.cgi" && v___location_path != v___location_prefix + "/dovecot/" && v___location_path != v___location_prefix + "/dovecot/index.cgi" && v___location_path != v___location_prefix + "/ldap-server/" && v___location_path != v___location_prefix + "/ldap-server/index.cgi" && v___location_path != v___location_prefix + "/virtualmin-nginx/" && v___location_path != v___location_prefix + "/virtualmin-nginx/index.cgi" && v___location_path != v___location_prefix + "/fetchmail/" && v___location_path != v___location_prefix + "/fetchmail/index.cgi" && v___location_path != v___location_prefix + "/mysql/" && v___location_path != v___location_prefix + "/mysql/index.cgi" && v___location_path != v___location_prefix + "/mysql/edit_dbase.cgi" && v___location_path != v___location_prefix + "/postgresql/" && v___location_path != v___location_prefix + "/postgresql/index.cgi" && v___location_path != v___location_prefix + "/postgresql/edit_dbase.cgi" && v___location_path != v___location_prefix + "/postfix/" && v___location_path != v___location_prefix + "/postfix/index.cgi" && v___location_path != v___location_prefix + "/procmail/" && v___location_path != v___location_prefix + "/procmail/index.cgi" && v___location_path != v___location_prefix + "/proftpd/" && v___location_path != v___location_prefix + "/proftpd/index.cgi" && v___location_path != v___location_prefix + "/mailboxes/" && v___location_path != v___location_prefix + "/mailboxes/index.cgi" && v___location_path != v___location_prefix + "/mailboxes/list_mail.cgi" && v___location_path != v___location_prefix + "/mailbox/" && v___location_path != v___location_prefix + "/mailbox/index.cgi" && v___location_path != v___location_prefix + "/samba/" && v___location_path != v___location_prefix + "/samba/index.cgi" && v___location_path != v___location_prefix + "/spam/" && v___location_path != v___location_prefix + "/spam/index.cgi" && v___location_path != v___location_prefix + "/squid/" && v___location_path != v___location_prefix + "/squid/index.cgi" && v___location_path != v___location_prefix + "/sshd/" && v___location_path != v___location_prefix + "/sshd/index.cgi" && v___location_path != v___location_prefix + "/webalizer/" && v___location_path != v___location_prefix + "/webalizer/index.cgi" && v___location_path != v___location_prefix + "/cpan/" && v___location_path != v___location_prefix + "/cpan/index.cgi" && v___location_path != v___location_prefix + "/htaccess-htpasswd/" && v___location_path != v___location_prefix + "/htaccess-htpasswd/index.cgi" && v___location_path != v___location_prefix + "/status/" && v___location_path != v___location_prefix + "/status/index.cgi" && v___location_path != v___location_prefix + "/net/" && v___location_path != v___location_prefix + "/net/index.cgi" && v___location_path != v___location_prefix + "/tcpwrappers/" && v___location_path != v___location_prefix + "/tcpwrappers/index.cgi" && v___location_path != v___location_prefix + "/fdisk/" && v___location_path != v___location_prefix + "/fdisk/index.cgi" && v___location_path != v___location_prefix + "/fail2ban/" && v___location_path != v___location_prefix + "/fail2ban/index.cgi" && v___location_path != v___location_prefix + "/nis/" && v___location_path != v___location_prefix + "/nis/index.cgi" && v___location_path != v___location_prefix + "/passwd/" && v___location_path != v___location_prefix + "/passwd/index.cgi" || $($(".container-fluid .panel-body a[href]:not([href*='javascript'],[href*='list_users.cgi?dom'],[href*='edit_hdparm.cgi?disk'],[href*='blink.cgi?disk'],[href*='smart-status/index.cgi?drive'],[href*='help.cgi'],[href*='edit_user.cgi?new='],[href*='edit_user.cgi?idx='],[href*='edit_recipe.cgi'],[href*='up.cgi'],[href*='down.cgi'],[href*='virt_index.cgi'],[href*='save_log.cgi'],[href*='backup.cgi'],[href*='activate.cgi'],[href*='#'])")).each(function(e, t) {
            v___location_path == v___location_prefix + "/syslog/" || v___location_path == v___location_prefix + "/syslog/index.cgi" ? n["/" + v___location_path_lead_unslashed + $(this).parent("td").next("td.td_tag").next("td.td_tag").next("td.td_tag").find("a").attr("href")] = $.trim($(this).text()) : (v___location_path == v___location_prefix + "/backup-config/" || v___location_path == v___location_prefix + "/backup-config/index.cgi" ? $description = $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) : v___location_path == v___location_prefix + "/mount/" || v___location_path == v___location_prefix + "/mount/index.cgi" || v___location_path == v___location_prefix + "/quota/" || v___location_path == v___location_prefix + "/quota/index.cgi" ? $description = $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) : v___location_path == v___location_prefix + "/fsdump/" || v___location_path == v___location_prefix + "/fsdump/index.cgi" ? $description = $.trim($(this).parents("td").next("td").next("td").next("td").find("label").find("tt").find("tt").text()) : v___location_path == v___location_prefix + "/proc/" || v___location_path == v___location_prefix + "/proc/index_tree.cgi" || v___location_path == v___location_prefix + "/proc/index_user.cgi" || v___location_path == v___location_prefix + "/proc/index_size.cgi" || v___location_path == v___location_prefix + "/proc/index_cpu.cgi" || v___location_path == v___location_prefix + "/proc/index_tree.cgi" || v___location_path == v___location_prefix + "/proc/index_search.cgi" ? v___location_path == v___location_prefix + "/proc/index_size.cgi" || v___location_path == v___location_prefix + "/proc/index_cpu.cgi" ? $description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").text()) : v___location_path == v___location_prefix + "/proc/index_search.cgi" ? $description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").text()) : $description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parents("td").next("td").next("td").next("td").text()) : v___location_path == v___location_prefix + "/useradmin/" || v___location_path == v___location_prefix + "/useradmin/index.cgi" ? $description = $.trim($(this).parents("td").next("td").find("label").text()) + " — " + $(this).text() + ":" + $.trim($(this).parents("td").next("td").next("td").find("label").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").find("label").text()) + ", " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").next("td").find("label").text()) : v___location_path == v___location_prefix + "/mailboxes/list_mail.cgi" || v___location_path == v___location_prefix + "/mailbox/" || v___location_path == v___location_prefix + "/mailbox/index.cgi" ? $description = $.trim($(this).parents("td").next("td").next("td").next("td").find("label").text()) + " — " + $.trim($(this).parents("td").next("td").find("label").text()) + " [" + $.trim($(this).parents("td").next("td").next("td").find("label").text()) + "]" : v___location_path == v___location_prefix + "/cpan/" || v___location_path == v___location_prefix + "/cpan/index.cgi" ? $description = $.trim($(this).parents("td").next("td").next("td").find("label").text()) : v___location_path == v___location_prefix + "/fdisk/" || v___location_path == v___location_prefix + "/fdisk/index.cgi" ? $description = $.trim($(this).parent("td").next("td.td_tag").text()) + " - " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) : $description = $.trim($(this).parent("td").next("td.td_tag").text()), $description ? $_description = !0 : $_description = !1, n[("/" == $(this).attr("href").substring(0, 1) ? "" : "/") + v___location_directory_unslashed_trail_slashed + $(this).attr("href")] = $.trim($(this).text()) + ($_description ? " (" : "") + $description + ($_description ? ")" : ""))
        });
        var s = $.map(n, function(e, t) {
                if ("undefined" != t) return {
                    value: e,
                    url: t,
                    data: {
                        category: get_module_title()
                    }
                }
            }),
            r = {};
        $.each($('li:not(.menu-exclude):not(.user-link) > ul.sub:not([id^="global_"]) > li:not(.menu-exclude):not(.user-link) > a'), function(e, t) {
            r[("/" == $(this).attr("href").substring(0, 1) ? "" : "/") + $(this).attr("href")] = $.trim($(this).text())
        }), $('li:not(.menu-exclude):not(.user-link) > a[target="page"]:not([data-href="/acl/edit_user.cgi"],[data-href="/virtual-server/index.cgi"],[data-href="/sysinfo.cgi"],[data-href="/virtual-server/pro/history.cgi"], [data-href="/mailbox/list_folders.cgi"], [data-href="/mailbox/list_ifolders.cgi"], [data-href="/mailbox/list_addresses.cgi"], [data-href="/filter/edit_forward.cgi"], [data-href="/filter/edit_auto.cgi"], [data-href="/filter/edit_auto.cgi"], [data-href="/filter/"], [data-href="/mailbox/edit_sig.cgi"])').each(function(e, t) {
            $t_uri_usermin || navigation_dashboard_switch_available() || (r[$(this).attr("data-href")] = $.trim($(this).text()))
        });
        var _ = $.map(r, function(e, t) {
                if ("undefined" != t && !Test.strContains(t, "/shell") && !Test.strContains(t, "shell=1")) return {
                    value: e,
                    url: t,
                    data: {
                        category: $("aside .select2-selection__rendered").text() ? '<span style="font-style: italic">' + $("aside .select2-selection__rendered").clone().children().remove().end().text() + "</span>" : get_navigation_module_name()
                    }
                }
            }),
            o = {};
        $("aside select option").each(function() {
            o[$(this).val() + ":::" + $(this).parent("select").attr("name")] = $.trim($(this).text())
        });
        var l = $.map(o, function(e, t) {
            if ("undefined" != t) return {
                value: e,
                url: t,
                data: {
                    category: $("aside select").data("autocomplete-title")
                }
            }
        }).concat(s).concat(_).concat(a);
        $(".form-control.sidebar-search").on("keydown", function(e) {
            34 != e.keyCode && 33 != e.keyCode && 20 != e.keyCode && 17 != e.keyCode && 16 != e.keyCode && 9 != e.keyCode || (e.preventDefault(), e.stopPropagation())
        }), $(".form-control.sidebar-search").autocomplete({
            lookup: l,
            onSelect: function(e) {
                if (!0 === navigation_dashboard_switch_available() && $t_uri_dashboard && 2 != get_access_level() && 4 != get_access_level() && set_switch_position("webmin"), $(this).val("").blur(), navigation_hide(), "/" == e.url.substring(0, 1)) {
                    var t = $("body").find('a[href="' + e.url + '"]').attr("target");
                    t && "_parent" == t || get_pjax_content(e.url.indexOf(v___location_prefix) > -1 ? e.url : v___location_prefix + e.url, ["reference"])
                } else e.url && e.url.indexOf(":::") > -1 && (navigation_render_start(), $("select").val(e.url.split(":::")[0]).trigger("change").trigger("select2:select"))
            },
            groupBy: "category"
        })
    }
}

function navigation_update(e) {
    if (!get_onbeforeunload_status()) {
        var e = void 0 === e || -1 == e || "" == e ? $("aside select").val() : e,
            t = $t_uri_virtualmin ? "virtualmin" : $t_uri_cloudmin ? "cloudmin" : $t_uri_usermin ? "usermin" : $t_uri_webmin ? "webmin" : "mail";
        "webmin" == t ? (set_switch_position("webmin"), get_navigation_menu_webmin("webmin")) : "virtualmin" == t ? (set_switch_position("virtualmin"), get_navigation_menu_virtualmin(e)) : "cloudmin" == t ? (set_switch_position("cloudmin"), get_navigation_menu_cloudmin(e)) : "usermin" == t ? (set_switch_position("usermin"), get_navigation_menu_webmin("usermin")) : "mail" == t && (set_switch_position("webmail"), get_navigation_menu_webmin("webmail"))
    }
}

function navigation_select_label() {
    if ($t_uri_cloudmin && $("aside").find("li.menu-container.menu-status.hidden").find("font").length > 0) {
        var e = $("aside").find("li.menu-container.menu-status.hidden").find("font"),
            t = e.text(),
            i = e.attr("color");
        i = i && (i.indexOf("00ff00") || i.indexOf("008800") || i.indexOf("00aa00")) ? "success" : i && (i.indexOf("ff6600") || i.indexOf("ff00ff") || i.indexOf("ff22ff") || i.indexOf("ff44ff")) ? "warning" : i && (i.indexOf("ff0000") || i.indexOf("ff1100") || i.indexOf("aa0000") || i.indexOf("ff2200") || i.indexOf("ff4400")) ? "danger" : "info", "Virtualmin" == t && (t = "VM"), setTimeout(function() {
            var e = $("aside .select2-selection__rendered");
            if (!e.find(".menu-status-label").length) {
                e.append('<span class="pull-right label label-' + i + ' menu-status-label bg-light-grey pointer-events-none">' + t + "</span>");
                var a = $("aside .select2-selection__rendered .menu-status-label");
                a.animate({
                    opacity: 1
                }, 500), a.on("mouseover", function() {
                    $(this).removeClass("bg-light-grey")
                }).on("mouseout", function() {
                    $(this).addClass("bg-light-grey")
                }), e.on("mouseover", function() {
                    $(this).find(".menu-status-label").removeClass("bg-light-grey")
                }).on("mouseout", function() {
                    $(this).find(".menu-status-label").addClass("bg-light-grey")
                })
            }
        }, 300)
    }
}

function navigation_form_control(e) {
    var t = $("aside select");
    e ? $.each($("aside").find("forms"), function() {
        $(this).replaceTagName("form")
    }).promise().done(function() {
        navigation_init_select()
    }) : (!!t.data("select2") && t.select2("destroy"), $.each($("aside").find("form"), function() {
        $(this).replaceTagName("forms")
    }))
}

function navigation_filter_reset() {
    var e = "-webkit-filter: grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) invert(0) brightness(1) contrast(1); filter: grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) invert(0) brightness(1) contrast(1);";
    $(".visible-xs.mobile-menu-toggler").attr("style", "position: fixed;" + e), $("aside, .visible-xs.mobile-menu-toggler").attr("style", "z-index: 10; overflow: visible; transform: translate(" + settings_leftmenu_width + "px, 0px);" + e), $('input[name="settings_grayscale_level_navigation"], input[name="settings_sepia_level_navigation"], input[name="settings_hue_level_navigation"], input[name="settings_invert_level_navigation"]').val(0), $('input[name="settings_saturate_level_navigation"], input[name="settings_brightness_level_navigation"], input[name="settings_contrast_level_navigation"]').val(1), $('input[name="settings_grayscale_level_navigation"], input[name="settings_sepia_level_navigation"], input[name="settings_saturate_level_navigation"], input[name="settings_hue_level_navigation"], input[name="settings_invert_level_navigation"], input[name="settings_brightness_level_navigation"], input[name="settings_contrast_level_navigation"]').each(function() {
        $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val())
    })
}

function get_pjax_push(e) {
    return !0
}

function get_pjax_type(e) {
    new String;
    if (e && e.href && e.href.match(/([^\/]*)\/*$/)[1], Test.string(e)) {
        var t = e.replace(v___location_origin, ""),
            i = t.replace("/" + v___module + "/", ""),
            a = $('form[action="' + t + '"]:visible'),
            n = (a = a.length ? a : $('form[action="' + i + '"]:visible')).attr("method");
        if ("multipart/form-data" === a.attr("enctype")) return "post";
        if (n) return n;
        if (!n) {
            var n = (n = $('form[action="' + t + '"]').attr("method")) || $('form[action="' + URI(t).filename() + '"]').attr("method"),
                s = $('form[action="' + t + '"]').attr("enctype");
            return n || s ? "multipart/form-data" === s ? "post" : n : "get"
        }
    } else if ("object" == typeof e && $(e).is("form")) {
        var r = e.attr("method");
        return r || "get"
    }
    return e && Test.strContains(e, ".cgi?") && !Test.strContains(e, "config.cgi?") ? "GET" : "POST"
}

function get_pjax_content(e, t) {
    if (!get_onbeforeunload_status()) {
        var t = "object" == typeof t ? t : function() {},
            i = !!$.isArray(t) && $("<a>", {
                href: e
            })[0];
        $.pjax({
            url: e,
            timeout: 0,
            push: get_pjax_push(),
            type: get_pjax_type(i || e),
            container: "[data-dcontainer]",
            fragment: "[data-dcontainer]",
            callback: t
        })
    }
}

function get_pjax_event_end(e, t) {
    if (v___available_session && null != t && void 0 !== t.responseText) {
        var i = t.responseText.replace(/<body\b[^<]*(?:(?!<\/body>)<[^<]*)*<\/body>/gim, "").replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gim, "").replace("<!DOCTYPE html>", "").replace("<html", '<div id="xhtml0"').replace("</html>", "</div>"),
            a = $(i).filter("#xhtml0");
        $(a[0].attributes).each(function() {
            "id" !== this.nodeName && (this.nodeName, v___available_navigation && "data-redirect" === this.nodeName && this.nodeValue && this.nodeValue != "/?" + $__theme_navigation && history.replaceState({}, null, navigation_trigger(this.nodeValue, 2)), get_server_data(this.nodeName, this.nodeValue))
        }).promise().done(function() {
            if (get_pjax_event_end_funcs(1), $.each($(".container-fluid img"), function() {
                    var e = $(this),
                        t = e.attr("src");
                    t && !t.startsWith("/") && e.attr("src", v___location_directory_trail_slashed + t)
                }), unbuffered_header_post(t), e) {
                var i = $(e.relatedTarget),
                    a = i.attr("href"),
                    n = i.parent().is("[data-linked], .favorites-dcontainer, .menu-exclude.ui-sortable-handle");
                (n && (Test.strContains(a, "mysql") || Test.strContains(a, "postgresql")) || Test.strContains(v___module, "mysql") || Test.strContains(v___module, "postgresql")) && f__ex__mysql_runner(), (n && Test.strContains(a, "csf") || Test.strContains(v___module, "csf")) && csf_init()
            }
            1 === v___theme_updated && (v___theme_updated = 0, theme_update_notice(1))
        })
    }
}

function get_pjax_event_end_funcs(e) {
    if (page_init(), e || setTimeout(function() {
            get_server_data("data-title-initial", $("#headln2c span[data-main_title]").text()), get_server_data("data-script-name", v___location_path), get_server_data("data-uri", v___location_resource);
            var e = new RegExp("^" + v___location_prefix, "i");
            v___module = get_server_data("data-uri").replace(e, "").split("/").filter(function(e) {
                return 0 !== e.length
            })[0], get_server_data("data-module", v___module), page_render(1)
        }, 40), Test.strContains(v___location_directory, v___module_file_manager) && setTimeout(function() {
            "function" == typeof ___f__tw ? ___f__tw() : get_bundle_file_manager(1)
        }, 40), Core.curModule("csf") || get_server_data("post", 0, 1), e && page_render(0), $(".tooltip").tooltip("hide"), $(".popover").popover("hide"), theme_title_generate(), navigation_detect(), e && $(".__page").scrollTop(0), v___available_navigation) {
        var t = navigation_trigger(v___location.href, 1).replace(v___location_origin + v___location_prefix, "");
        "" == t || "/" == t || "/index.cgi" == t || unbuffered_header_processor_allow(v___location.href) || "csf" === v___module || (set_server_tmp_var_timeout = setTimeout(function() {
            set_server_tmp_var("goto", navigation_trigger(v___location.href, 1))
        }, 1e3))
    }
}

function get_pjax_action_submit(e, t) {
    if (!get_onbeforeunload_status())
        if (e && !v___theme_force_buffered && e.target && e.target.action && unbuffered_header_processor_allow(e.target.action)) unbuffered_header_processor(e, 1);
        else {
            v___theme_force_buffered = 0;
            var i = document.activeElement,
                a = $(i).attr("name"),
                n = $.trim(i.value) ? $.trim(i.value) : $.trim(i.innerText),
                s = i.value,
                r = i.type,
                _ = i.nodeName.toLowerCase(),
                o = $(e.target).find('[name="' + a + '"]'),
                l = o.attr("type");
            ("input" !== _ || o.val() == s && "submit" !== l) && ("button" !== _ || $.trim(o.text()) == n && "submit" !== l) || "button" !== l && "submit" !== l && "submit" !== r || $("<input>").attr({
                type: "hidden",
                name: a,
                value: n || s
            }).appendTo($(e.target)), $.pjax.submit(e, "[data-dcontainer]", {
                timeout: 0,
                push: get_pjax_push(),
                type: get_pjax_type(e.target.action),
                fragment: "[data-dcontainer]"
            })
        }
}

function get_pjax_action_click(e, t) {
    if (void 0 != $(t).attr("href")) return $(e.target).is(".gl-icon-select") ? (e.preventDefault(), void $(t).trigger("contextmenu")) : t && t.href && unbuffered_header_processor_allow(t.href) ? (e.preventDefault(), void unbuffered_header_processor(t.href, 0)) : void $.pjax.click(e, {
        timeout: 0,
        push: get_pjax_push(),
        type: get_pjax_type(t),
        container: "[data-dcontainer]",
        fragment: "[data-dcontainer]"
    })
}

function get_onbeforeunload_message(e, t) {
    bootbox.dialog({
        message: "" + theme_language("theme_xhred_global_unbeforeunload_message"),
        title: '<i class="fa fa-fw fa-question-circle font-size-80p bootbox-o__f_m-save-prompt">&nbsp;&nbsp;</i> <strong class="font-size-90p">' + theme_language("theme_xhred_global_unbeforeunload_title") + "</strong>",
        buttons: {
            main: {
                label: '&nbsp;<i class="fa fa-fw fa-arrow-circle-o-left">&nbsp;&nbsp;</i>' + theme_language("theme_xhred_global_cancel") + "&nbsp;&nbsp;",
                className: "btn-default vertical-align-top margined-left--2",
                callback: function() {
                    $(t).removeClass("disabled").find("i").removeClass("invisible").next(".cspinner_container").remove(), navigation_detect()
                }
            },
            danger: {
                label: '&nbsp;<i class="fa fa-fw fa-arrow-circle-o-right">&nbsp;&nbsp;</i>' + theme_language("theme_xhred_global_continue") + "&nbsp;&nbsp;",
                className: "btn-danger vertical-align-top margined-left--2",
                callback: function() {
                    set_onbeforeunload_status(0, 0), set_onbeforeunload_status(0, 1), "object" == typeof progressive_request && 1 === progressive_request.readyState && progressive_request.abort();
                    var i = $(t).is("form");
                    i ? i && get_pjax_action_submit(e, t) : t.href && t.href.length && get_pjax_content(t.href, !1)
                }
            }
        },
        onEscape: function() {}
    })
}

function get_onbeforeunload_status() {
    return $('.container-fluid > .panel > .panel-body[data-unload-warning="1"]').length || $('html[data-unload-warning="1"]').length
}

function set_onbeforeunload_status(e, t) {
    var i = t ? "html" : ".container-fluid > .panel > .panel-body";
    e ? $(i).attr("data-unload-warning", "1") : $(i).removeAttr("data-unload-warning")
}

function set_side_slider_visibility(e) {
    var t = "body .right-side-tabs";
    "0" != get_server_data("access-level") && "1" != Core.moduleAvailable("status") || (e ? ($(t + "-toggler").addClass("hidden"), $(t).css("right", "0px").addClass("right-side-tabs-fixed"), settings_side_slider_enabled && get_server_data("data-slider-fixed", "1")) : (settings_side_slider_enabled && $(t + "-toggler").removeClass("hidden opened").css("right", "0"), $(t).css("right", "-302px").removeClass("right-side-tabs-fixed"), get_server_data("data-slider-fixed", "0")))
}

function set_side_slider_labels() {
    var e = $('a[href*="#right-side-tabs-sysinfo"]'),
        t = theme_language("theme_xhred_titles_dashboard");
    e.length && void 0 !== t ? (e.text(t), $('a[href*="#right-side-tabs-notifications"]').text(theme_language("theme_xhred_global_notifications")), $('a[href*="#right-side-tabs-favorites"]').text(theme_language("theme_xhred_global_favorites")), $(".theme_xhred_notification_no_data").text(theme_language("theme_xhred_notification_no_data").toUpperCase()), $(".theme_xhred_notification_no_favorites").text(theme_language("theme_xhred_notification_no_favorites").toUpperCase()), $(".theme_xhred_notification_none").text(theme_language("theme_xhred_notification_none").toUpperCase())) : setTimeout(set_side_slider_labels, 200)
}

function theme_password_generator() {
    var e = settings_global_passgen_format.split("|")[1].split(","),
        t = parseInt(settings_global_passgen_format.split("|")[0]),
        i = "",
        a = "";
    $.inArray("a-z", e) >= 0 && (i += "abcdefghijklmnopqrstuvwxyz"), $.inArray("A-Z", e) >= 0 && (i += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"), $.inArray("0-9", e) >= 0 && (i += "0123456789"), $.inArray("#", e) >= 0 && (i += "![]{}()%&*$#^<>~@|");
    for (var n = 0; n < t; n++) a += i.charAt(Math.floor(Math.random() * i.length));
    return a
}

function get_cookie(e) {
    for (var t = e + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var n = i[a];
            " " == n.charAt(0);) n = n.substring(1, n.length);
        if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
    }
    return null
}

function array_swap(e) {
    var t = {};
    for (var i in e) t[e[i]] = i;
    return t
}

function theme_buttonify(e, t, i, a, n, s, r, _, o, l) {
    void 0 === n && (n = !1), void 0 === s && (s = ""), void 0 === r && (r = ""), (void 0 === _ || 0 == _) && (_ = ""), (void 0 === o || 0 == o) && (o = !1), (void 0 === l || 0 == l) && (l = !1), $.each(e, function(e, c) {
        v___location_path == v___location_prefix + c && (1 !== s && (s = s.split("~"), r = r.split("~")), $.each($(s), function(e, i) {
            if (1 !== s) {
                var a = new RegExp(RegExp.quote(i), "g");
                $(t + ':not(.f__lnk_t_btn):contains("' + i + '")').replaceText(a, r[e])
            }
        }).promise().done(function() {
            var e = "",
                s = "";
            _ && _.indexOf("~") > -1 && (_ = _.split("~"), e = _[0], s = _[1]), $.each($(t).find(i), function() {
                if (!$(this).parents(t).hasClass("f__lnk_t_btn")) {
                    if (o) {
                        var r = new RegExp(RegExp.quote(o), "g");
                        $(this).parent().replaceText(r, l || "")
                    }
                    a && a.indexOf("__center__") > -1 && $(i).parent().addClass("text-center"), $(this).html(e + $(this).text().replace(/\.\.$/, "") + s).addClass(a).removeClass("ui_link").prepend(n ? '<i class="fa fa-fw margined-left--3 ' + n + '" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>' : ""), $(this).parent(t).addClass("f__lnk_t_btn")
                }
            })
        }))
    })
}

function theme_toggle_night_mode() {
    var e = $("body .user-link.palette-toggle"),
        t = e.find(".fa-sun").length ? 0 : 1,
        i = (get_server_data("data-night-mode"), get_server_data("data-default-theme")),
        a = settings_background_color,
        n = $("input, textarea").is(":focus");
    if ((!v___available_navigation || !n) && v___available_navigation && !$("body").find(".modal.in:visible").length) {
        if (1 === t) {
            e.find(".fa-moon").removeClass("fa-moon").addClass("fa-sun vertical-align-middle"), $(document).find(".settings_navigation_color_toggle").addClass("hidden");
            var s = $("html").find('head link[href*="palettes"][data-palette]');
            $("html").find("head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/gunmetal." + v___source_type + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>'), $("html").find("head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/nightrider." + v___source_type + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>'), setTimeout(function() {
                get_server_data("data-theme", "gunmetal"), s.remove(), get_server_data("data-background-style", "nightRider"), get_server_data("data-night-mode", 1)
            }, 3), v___theme_night_mode_enabled = 1, v___theme_night_mode = 1
        } else {
            $("body").find(".settings_navigation_color_toggle").removeClass("hidden"), e.find(".fa-sun").removeClass("fa-sun vertical-align-middle").addClass("fa-moon");
            var r = $("html").find('head link[href*="gunmetal"]');
            "blue" != get_server_data("data-default-theme") && $("html").find("head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/" + i.toLowerCase() + "." + v___source_type + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>'), get_server_data("data-theme", i), r.remove(), get_server_data("data-background-style", a), get_server_data("data-night-mode", 0), "nightRider" !== settings_background_color && $("html").find('head link[href*="nightrider"]').remove(), v___theme_night_mode_enabled = "nightRider" === settings_background_color ? 1 : 0, v___theme_night_mode = 0
        }
        v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "sysinfo.cgi" && "0" == v___user_level ? (setTimeout(function() {
            $.each($(".piechart"), function() {
                $(this).addClass("bg-filter-blur-grayscale-invert-opacity75").data("easyPieChart").update(0)
            })
        }, 1 === t ? 150 : 0), theme_config("save", ['get_pjax_content("' + v___location_prefix + '/sysinfo.cgi")', 0])) : theme_config("save")
    }
}

function theme_shell_clear(e) {
    e.val(""), e.focus()
}

function theme_shell_open(e, t) {
    var i = i = void 0 !== t && (t.startsWith("!") ? t.substr(1) : t),
        a = $("body").find(".-shell-port- input");
    if (i) {
        a.val(i);
        var n = $.Event("keydown");
        n.which = 13, a.trigger(n)
    }
    e.css("bottom", "0vh").addClass("opened"), theme_shell_adapt(), setTimeout(function() {
        i || (focus(), a.focus())
    }, 20)
}

function theme_shell_close(e) {
    e.css("bottom", "100vh").removeClass("opened")
}

function theme_shell_adapt() {
    if (1 == Core.moduleAvailable("shell")) {
        var e = parseInt($("body").find(".-shell-port-cmd").width()),
            t = parseInt($("body").find(".-shell-port-prompt").width());
        $("body").find('.-shell-port- input[data-command="true"]').css("width", e - t - 50 + "px")
    }
}

function theme_shell_check_available() {
    var e = $t_uri_cloudmin && $('a[target="page"][href*="/server-manager/save_serv.cgi"][href*="shell=1"]').length;
    return 1 == Core.moduleAvailable("shell") || e ? 1 : 0
}

function theme_shell_link_control() {
    theme_shell_check_available() ? 0 != settings_show_terminal_link && $(".user-link.ported-console").removeClass("hidden") : $(".user-link.ported-console").addClass("hidden")
}

function theme_spinner_small() {
    return '<span class="cspinner in-btn-md" style="position: relative"><span class="cspinner-icon dark" style="width:12px; height:12px; margin-right: 7px;"></span></span>'
}

function spinnerfy_buttons(e, t, i, a) {
    var n = !!(e.attr("onclick") && -1 !== e.attr("onclick").indexOf("blank") || e.parents("form").attr("target") && -1 !== e.parents("form").attr("target").indexOf("blank")),
        s = e.hasClass("heighter-28"),
        r = "28px" == e.css("height"),
        _ = e.hasClass("btn-lg"),
        o = Core.curModule("server-manager") ? 2 : 0,
        l = e.find(".fa").hasClass("fa-1_25x"),
        c = e.find(".fa"),
        d = void 0 !== t && 0 != t && t,
        h = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (d ? d[0] + "px" : !s && !r || l || _ ? l ? "1.6px" : _ ? "1.5px" : "0" : -.5 + o + "px") + " !important; margin-left: " + (d ? d[1] + "px" : !s && !r || l || _ ? _ ? "-28px" : s || r || !l ? "-25.5px" : "-27.5px" : "-23.5px") + ' !important;"><span class="cspinner-icon white ' + (d ? d[2] ? d[2] : "" : s || r ? "smaller" : "small") + '"></span></span></span>',
        p = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (d ? d[0] + "px" : !s && !r || l || _ ? l ? "1.6px" : _ ? "1.5px" : "0" : -.5 + o + "px") + " !important; margin-left: " + (d ? d[1] + "px" : !s && !r || l || _ ? _ ? "-28px" : s || r || !l ? "-25.5px" : "-27.5px" : "-23.5px") + '  !important;"><span class="cspinner-icon dark ' + (d ? d[2] ? d[2] : "" : s || r ? "smaller" : "small") + '"></span></span></span>';
    setTimeout(function() {
        !n && e.addClass("disabled")
    }, 10), c.length && !n && setTimeout(function() {
        e.hasClass("btn-default") ? c.addClass("invisible").after(p) : c.addClass("invisible").after(h)
    }, 10), "undefind" == typeof i && (i = !1), "undefind" == typeof a && (a = !1), (d[3] || i) && setTimeout(function() {
        e.removeClass("disabled"), c.removeClass("invisible"), e.find(".cspinner_container").remove()
    }, i || d[3]), a && setTimeout(function() {
        NProgress.done()
    }, 400)
}

function theme_language(e, t) {
    void 0 === t && (t = !1);
    var i = get_server_data("language-strings");
    return t ? !!i && Convert.arrFlip(i)[$.trim(e)] : !!i && i[e]
}

function theme_config($action, callBack) {
    var callBack = "object" == typeof callBack && callBack,
        watched_options = ["config_portable_module_csf_style_custom_promoted", "config_portable_theme_charset_warning_shown", "config_portable_module_xsql_fit_content_screen_height", "config_portable_module_filemanager_hide_toolbar", "config_portable_module_filemanager_hovered_toolbar", "config_portable_module_filemanager_hide_actions", "config_portable_module_filemanager_remember_tabs", "config_portable_module_filemanager_calculate_size", "config_portable_module_filemanager_switch_user", "config_portable_module_filemanager_notification_type"];
    if ("get_options" == $action) return watched_options;
    if ("save" == $action) {
        var storeStorage = {},
            val = 0;
        $.each(localStorage, function(e, t) {
            "string" == typeof e && e.indexOf(v___server_hostname) > -1 && Test.arrIntersect(watched_options, e) && "undefined" != (val = "true" == t || "false" != t && (Test.numeric(t) ? parseInt(t) : t)) && (storeStorage[e.replace(v___server_hostname + "-", "")] = val)
        }), storeStorage.settings_force_night_mode = v___theme_night_mode, "undefind" != settings_font_family && (storeStorage.settings_font_family = settings_font_family), "undefind" != settings_navigation_color && (storeStorage.settings_navigation_color = settings_navigation_color), "undefind" != settings_background_color && (storeStorage.settings_background_color = settings_background_color), "undefind" != settings_cm_editor_palette && (storeStorage.settings_cm_editor_palette = settings_cm_editor_palette), "undefind" != settings_button_tooltip && (storeStorage.settings_button_tooltip = settings_button_tooltip), "undefind" != settings_hide_top_loader && (storeStorage.settings_hide_top_loader = settings_hide_top_loader), "undefind" != settings_animation_left && (storeStorage.settings_animation_left = settings_animation_left), "undefind" != settings_animation_tabs && (storeStorage.settings_animation_tabs = settings_animation_tabs), "undefind" != settings_sysinfo_link_mini && (storeStorage.settings_sysinfo_link_mini = settings_sysinfo_link_mini), "undefind" != settings_show_night_mode_link && (storeStorage.settings_show_night_mode_link = settings_show_night_mode_link), "undefind" != settings_theme_options_button && (storeStorage.settings_theme_options_button = settings_theme_options_button), "undefind" != settings_leftmenu_button_refresh && (storeStorage.settings_leftmenu_button_refresh = settings_leftmenu_button_refresh), "undefind" != settings_hotkeys_active && (storeStorage.settings_hotkeys_active = settings_hotkeys_active), setTimeout(function() {
            $.ajax({
                type: "POST",
                url: v___location_prefix + "/index.cgi?xhr-manage-config=1&save=1",
                data: storeStorage,
                dataType: "text",
                success: function(c) {
                    setTimeout(function() {
                        theme_settings_controls(0)
                    }, 400), callBack && (callBack[2] ? setTimeout(function() {
                        eval(callBack[0])
                    }, callBack[2]) : eval(callBack[0]))
                },
                error: function() {}
            })
        }, 10)
    } else if ("load" === $action) {
        var val = 0;
        $.ajax({
            type: "GET",
            url: v___location_prefix + "/index.cgi?xhr-manage-config=1&load=1",
            data: !1,
            dataType: "json",
            success: function(e) {
                $.each(e, function(e, t) {
                    val = "true" == t || "false" != t && (Test.numeric(t) ? parseInt(t) : t), localStorage.setItem(v___server_hostname + "-" + e, val), window[e] = val
                })
            },
            error: function() {}
        })
    }
}

function get_server_data(e, t, i) {
    var a = $("html"),
        n = $("body"),
        s = "data-" + e,
        r = e.replace("data-", "");
    if (void 0 !== i) e.startsWith("data-") ? (a.removeAttr(e), a.removeData(r)) : (a.removeAttr(s), a.removeData(e));
    else {
        if (void 0 === t) return e.startsWith("data-") ? a.attr(e) : a.data(e);
        e.startsWith("data-") ? a.attr(e, t).data(r, t) : a.data(e, t).attr(s), "data-uri" !== e && "data-module" !== e || (n.attr(e, t), "data-module" === e && n.removeClass().addClass(t))
    }
}

function control_server_tmp_var(e, t, i, a, n, s) {
    return $.ajax({
        type: "POST",
        url: v___location_prefix + "/index.cgi/?xhr-tmp_var=1&xhr-tmp_var_action=" + e + "&xhr-tmp_var_name=" + t + "&xhr-tmp_var_value=" + (i ? Convert.uriEncodeComponent(i) : i) + "&xhr-tmp_var_keep=" + a,
        data: !1,
        dataType: "text",
        success: function(e) {
            "function" == typeof n && (!e.length || e.length && 1 === s) && n()
        },
        error: function(e) {}
    })
}

function get_server_tmp_var(e, t, i, a) {
    return control_server_tmp_var("get", e, !1, t, i, a)
}

function set_server_tmp_var(e, t) {
    control_server_tmp_var("set", e, t)
}

function get_navigation_module_name() {
    return $t_uri_webmin ? theme_language("theme_xhred_titles_wm") : $t_uri_usermin ? theme_language("theme_xhred_titles_um") : $t_uri_virtualmin ? theme_language("theme_xhred_titles_vm") : $t_uri_cloudmin ? theme_language("theme_xhred_titles_cm") : $t_uri_webmail ? theme_language("theme_xhred_titles_mail") : $t_uri_dashboard ? theme_language("theme_xhred_titles_dashboard") : void 0
}

function update_navigation_module_name() {
    $t_uri_webmin = $('.switch-toggle input[id="open_webmin"]:checked').length ? 1 : 0, $t_uri_usermin = $('.switch-toggle input[id="open_usermin"]:checked').length ? 1 : 0, $t_uri_virtualmin = $('.switch-toggle input[id="open_virtualmin"]:checked').length ? 1 : 0, $t_uri_cloudmin = $('.switch-toggle input[id="open_cloudmin"]:checked').length ? 1 : 0, $t_uri_webmail = $('.switch-toggle input[id="open_webmail"]:checked').length ? 1 : 0, $t_uri_dashboard = $('.switch-toggle input[id="open_dashboard"]:checked').length ? 1 : 0
}

function page_display() {
    var e = $("body"),
        t = $("body").find(".container-fluid"),
        i = $("head");
    t.css({
        opacity: 1,
        "pointer-events": "auto"
    }), e.css("overflow", "auto"), i.find("#__tmp_no_overflow").remove()
}

function page_adjust(e, t) {
    "function" == typeof $.injectCSS && ($("style[data-persist]").remove(), t = !!t && "translate(" + t + "px, 0px) !important", $.injectCSS({
        "#sidebar": {
            left: -e + "px",
            width: e + "px",
            transform: t
        },
        ".switch-toggle": {
            width: e + "px"
        },
        "#content.__page": {
            "margin-left": e + "px"
        },
        ".autocomplete-suggestions": {
            "min-width": e - 23 + "px !important"
        },
        ".__logo": {
            width: e + "px",
            "max-width": e + "px"
        }
    }), $("aside select").length && ($("aside select[data-autocomplete-title]").attr("style", "width:" + (e - 24) + "px; margin-top: 0 !important"), navigation_init_select()))
}

function navigation_lock_width() {
    if ("undefined" == typeof settings_leftmenu_width_initial && (settings_leftmenu_width_initial = settings_leftmenu_width), matchMedia("(max-width: 767px)").matches) settings_leftmenu_width = 260, page_adjust(settings_leftmenu_width, 0);
    else {
        if (1 === v___initial_load) return;
        settings_leftmenu_width = settings_leftmenu_width_initial, page_adjust(settings_leftmenu_width, settings_leftmenu_width)
    }
}

function theme_modal_dismiss() {
    $(".modal.in").find("[data-dismiss]").trigger("click")
}

function navigation_focus_search(e) {
    if (settings_hotkeys_active) return String.fromCharCode(e.which).toLowerCase() != settings_hotkey_focus_search || !e[settings_hotkey_toggle_modifier] || (e.preventDefault(), $search = $(".form-control.sidebar-search").focus(), !1)
}

function theme_shortcut_check(e) {
    return "0" == get_access_level() || !!Core.moduleAvailable(URI("/" + e).directory().replace(/\//g, ""))
}

function theme_shortcuts(e) {
    if (settings_hotkeys_active) {
        if (!("1" == String.fromCharCode(e.which) && settings_hotkey_custom_1 && e[settings_hotkey_toggle_modifier] || "2" == String.fromCharCode(e.which) && settings_hotkey_custom_2 && e[settings_hotkey_toggle_modifier] || "3" == String.fromCharCode(e.which) && settings_hotkey_custom_3 && e[settings_hotkey_toggle_modifier] || "4" == String.fromCharCode(e.which) && settings_hotkey_custom_4 && e[settings_hotkey_toggle_modifier] || "5" == String.fromCharCode(e.which) && settings_hotkey_custom_5 && e[settings_hotkey_toggle_modifier] || "6" == String.fromCharCode(e.which) && settings_hotkey_custom_6 && e[settings_hotkey_toggle_modifier] || "7" == String.fromCharCode(e.which) && settings_hotkey_custom_7 && e[settings_hotkey_toggle_modifier] || "8" == String.fromCharCode(e.which) && settings_hotkey_custom_8 && e[settings_hotkey_toggle_modifier] || "9" == String.fromCharCode(e.which) && settings_hotkey_custom_9 && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_favorites && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_shell && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_sysinfo && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_slider && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_reload && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_night_mode && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_webmail && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_usermin && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_cloudmin && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_virtualmin && e[settings_hotkey_toggle_modifier] || String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_webmin && e[settings_hotkey_toggle_modifier])) return !0;
        "1" == String.fromCharCode(e.which) && settings_hotkey_custom_1 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_1) && get_pjax_content(v___location_prefix + settings_hotkey_custom_1)), "2" == String.fromCharCode(e.which) && settings_hotkey_custom_2 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_2) && get_pjax_content(v___location_prefix + settings_hotkey_custom_2)), "3" == String.fromCharCode(e.which) && settings_hotkey_custom_3 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_3) && get_pjax_content(v___location_prefix + settings_hotkey_custom_3)), "4" == String.fromCharCode(e.which) && settings_hotkey_custom_4 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_4) && get_pjax_content(v___location_prefix + settings_hotkey_custom_4)), "5" == String.fromCharCode(e.which) && settings_hotkey_custom_5 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_5) && get_pjax_content(v___location_prefix + settings_hotkey_custom_5)), "6" == String.fromCharCode(e.which) && settings_hotkey_custom_6 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_6) && get_pjax_content(v___location_prefix + settings_hotkey_custom_6)), "7" == String.fromCharCode(e.which) && settings_hotkey_custom_7 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_7) && get_pjax_content(v___location_prefix + settings_hotkey_custom_7)), "8" == String.fromCharCode(e.which) && settings_hotkey_custom_8 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_8) && get_pjax_content(v___location_prefix + settings_hotkey_custom_8)), "9" == String.fromCharCode(e.which) && settings_hotkey_custom_9 && (e.preventDefault(), theme_shortcut_check(settings_hotkey_custom_9) && get_pjax_content(v___location_prefix + settings_hotkey_custom_9)), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_webmin && (e.preventDefault(), $('.switch-toggle input[id="open_webmin"]').trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_virtualmin && (e.preventDefault(), $('.switch-toggle input[id="open_virtualmin"]').trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_cloudmin && (e.preventDefault(), $('.switch-toggle input[id="open_cloudmin"]').trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_usermin && (e.preventDefault(), $('.switch-toggle input[id="open_usermin"]').trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_webmail && (e.preventDefault(), $('.switch-toggle input[id="open_webmail"]').trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_key_night_mode && (e.preventDefault(), theme_toggle_night_mode()), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_toggle_slider && (e.preventDefault(), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_reload && $('.user-links a[data-refresh="true"]') && (e.preventDefault(), get_pjax_content(v___location_resource));
        var t = $t_uri_cloudmin && $('a[target="page"][href*="/server-manager/save_serv.cgi"][href*="shell=1"]').length;
        if (String.fromCharCode(e.which).toLowerCase() == settings_hotkey_shell && (1 == Core.moduleAvailable("shell") || t)) {
            e.preventDefault();
            var i = $("body").find(".-shell-port-");
            i.hasClass("opened") ? theme_shell_close(i) : theme_shell_open(i)
        }
        return String.fromCharCode(e.which).toLowerCase() == settings_hotkey_sysinfo && (e.preventDefault(), 1 == navigation_dashboard_switch_available() ? navigation_dashboard_switch_select() : get_pjax_content(v___location_prefix + "/sysinfo.cgi")), String.fromCharCode(e.which).toLowerCase() == settings_hotkey_favorites && (e.preventDefault(), "0px" != $(".favorites-menu-outer").css("left") ? $(".user-link.favorites").trigger("click") : $(".favorites-menu-outer").removeClass("hover")), !1
    }
}

function get_access_level() {
    return parseInt(get_server_data("level"))
}

function navigation_dashboard_switch_available() {
    return "1" == get_server_data("dashboard")
}

function navigation_dashboard_switch_select() {
    set_switch_position("dashboard"), navigation_clear(), get_pjax_content(v___location_prefix + "/sysinfo.cgi")
}

function theme_messenger(e, t, i, a, n) {
    var s = void 0 === a ? 1 : a,
        r = void 0 === n || n;
    if ($('body[class^="' + v___module_file_manager + '"]').length) {
        if ("4" == config_portable_module_filemanager_notification_type && "info" != i && "warning" != i && "error" != i) return;
        if ("2" == config_portable_module_filemanager_notification_type && "warning" != i && "error" != i) return
    }
    "function" == typeof Messenger && (window["Messenger_" + s] = Messenger().post({
        message: e,
        hideAfter: t,
        theme: "air",
        showCloseButton: r,
        type: i,
        id: s
    }))
}

function theme_message_dismiss(e) {
    void 0 !== window["Messenger_" + e] && window["Messenger_" + e].hide()
}

function theme_alert(e, t, i, a, n, s, r, _) {
    (void 0 === i || 0 == i) && (i = !1), (void 0 === a || 0 == a) && (a = "md"), (void 0 === n || 0 == n) && (n = "danger"), (void 0 === s || 0 == s) && (s = "exclamation-triangle"), (void 0 === r || 0 == r) && (r = "7"), (void 0 === _ || 0 == _) && (_ = !1);
    $.isArray(i);
    var o = "modal-global-notification",
        l = '<div class="modal fade' + r + " " + o + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-' + a + '"><div class="modal-content"><div class="modal-header background-' + n + ' background--bordered"><button type="button" class="close" data-dismiss="modal" aria-label="' + theme_language("theme_xhred_global_close") + '"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"><i class="fa fa-fw fa-' + s + '">&nbsp;&nbsp;</i> ' + (theme_language(e) ? theme_language(e) : e) + '</h4></div><div class="modal-body"><p>' + (theme_language(t) ? theme_language(t) : t) + "</p><div" + ($.isArray(i) ? "" : ' class="hidden"') + '><button class="btn btn-default btn-xs btn-block margined-bottom-1" type="button" data-toggle="collapse" data-target="#collapse-' + o + '" aria-expanded="false" aria-controls="collapse-' + o + '">' + theme_language(i[0]) + '</button><div class="collapse" id="collapse-' + o + '"><div class="well">' + i[1] + "</div></div></div></div></div></div></div>";
    setTimeout(function() {
        $("body").hasClass("modal-open") || ($("body").append(l), $("." + o).modal("show"), $("." + o).on("click", ".modal-body a.label", function(e) {
            $("." + o).modal("hide")
        }), $("." + o).on("hidden.bs.modal", function(e) {
            $("." + o).remove()
        }))
    }, _)
}

function theme_alert_charset() {
    var e = get_server_data("charset");
    if (e && -1 === e.toLowerCase().indexOf("utf") && "true" != localStorage.getItem(v___server_hostname + "-config_portable_theme_charset_warning_shown")) {
        var t = "<p>" + theme_language("theme_xhred_encoding_warning").replace("_hidden_", $t_uri_usermin ? "hidden" : "").replace("%prod", get_navigation_module_name()).replace("%lang", get_server_data("language")).replace("%charset", get_server_data("charset")).replace("%link", v___location_prefix + ($t_uri_usermin ? "/language" : "/webmin/edit_lang.cgi")) + "</p>";
        theme_alert(theme_language("theme_xhred_global_warning"), t, !1, "sm", "warning", !1, "7 modal-charset-warning", 2e3), $("body").on("click", ".modal-charset-warning a.label", function(e) {
            $(".modal-charset-warning").modal("hide")
        }), $("body").on("hide.bs.modal", ".modal-charset-warning", function(e) {
            localStorage.setItem(v___server_hostname + "-config_portable_theme_charset_warning_shown", "true"), theme_config("save")
        })
    }
}

function get_module_title() {
    return $_right_menu_title = $("#headln2c"), $_right_menu_title.find("span[data-main_title]").text().length ? $_right_menu_title.find("span[data-main_title]").text() : $_right_menu_title.text().length ? $_right_menu_title.text().text() : "->"
}

function get_module_subtitle() {}

function set_switch_position(e) {
    get_onbeforeunload_status() || ($('.switch-toggle input:not([id="open_' + e + '"])').each(function() {
        $(this).removeAttr("checked")
    }).promise().done(function() {
        $("#open_" + e).prop("checked", !0)
    }), update_navigation_module_name())
}

function editor_background_save(e) {
    if (1 === $('textarea[name="data"], textarea[name="text"], textarea[name="directives"], textarea[name="manual"]').length && 1 === $('textarea[name="data"], textarea[name="text"], textarea[name="directives"], textarea[name="manual"]').parents("form").find('input[type="submit"]').length) {
        if (!$(".CodeMirror").length) return;

        function t() {
            "undefined" != typeof __cm_editor_static && $(".container-fluid > .panel > .panel-body").attr("data-cm-line", __cm_editor_static.getCursor().line + "," + __cm_editor_static.getCursor().ch).attr("data-cm-state", $('[data-form="submitter"]').hasClass("btn-warning") && !$('[data-form="submitter"]').next("button").hasClass("disabled"))
        }
        $(".ui_reset").remove();
        var i = $('.container-fluid textarea[name="data"], .container-fluid textarea[name="text"], .container-fluid textarea[name="directives"], .container-fluid textarea[name="manual"]').parents("form"),
            a = i.find('button[type="button"]').length ? i.find('button[type="button"]') : i.find('input[type="submit"]'),
            n = $('.container-fluid textarea[name="directives"]').length ? "-12px" : "0";
        $(".container-fluid select").val() ? $(".container-fluid select").val() : $(".container-fluid .table-title").text() ? $(".container-fluid .table-title").text() : $(".container-fluid .panel-body tt:first").text() ? $(".container-fluid .panel-body tt:first").text() : $(".container-fluid #headln2c tt:first").text() && $(".container-fluid #headln2c tt:first").text();
        a.parents("table.ui_form_end_buttons").prev("br").remove(), a.parents("table.ui_form_end_buttons").prev("div.table-responsive").attr("style", "margin-bottom: -4px !important"), a.replaceWith('\t\t\t<span class="btn-group" style="margin-top: ' + n + '">\t\t\t\t<button type="button" class="btn btn-' + (e ? "warning" : "success") + ' btn-34 margined-top-5" data-form="submitter" data-form-onbeforeunload="' + (e ? "1" : "0") + '"><i class="fa fa-fw fa-floppy-o">&nbsp;&nbsp;</i>' + theme_language("theme_xhred_global_save") + '&nbsp;</button>\t\t\t\t<button type="submit" class="btn btn-default btn-34 margined-top-5"><i class="fa fa-fw fa-arrow-circle-o-left">&nbsp;&nbsp;</i>' + theme_language("theme_xhred_global_save_and_close") + "&nbsp;</button>\t\t\t</span>\t\t");
        var s = $('.container-fluid button[type="button"]:not(.ui_form_end_submit)'),
            r = $('.container-fluid button[type="submit"]:not(.ui_form_end_submit)');
        window.__cm_editor_static.on("change", function(e, i) {
            __cm_editor_static.save(), s.addClass("btn-warning").removeClass("btn-success").attr("data-form-onbeforeunload", 1), t()
        }), $("body").off("mousedown.cm1"), $("body").on("mousedown.cm1", ".CodeMirror", function(e) {
            t()
        }), $("body").off("keydown.cm1"), $("body").on("keydown.cm1", function(e) {
            13 == e.keyCode && e.ctrlKey && !e.shiftKey ? s.trigger("click") : 13 == e.keyCode && e.ctrlKey && e.shiftKey && r.trigger("click")
        });
        var _ = 'button[type="submit"]:not(.disabled)';
        $("body").undelegate(_, "click.cm"), $("body").on("click.cm", _, function(e) {
            set_onbeforeunload_status(0, 0), $("button").addClass("disabled").find(".fa.fa-arrow-circle-o-left").addClass("invisible").after('<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: -0.5px; margin-left: -28px;"><span class="cspinner-icon dark small"></span></span></span>'), s.attr("data-form-onbeforeunload", 0)
        });
        var o = 'button[data-form="submitter"]:not(.disabled)';
        $("body").undelegate(o, "click.cm"), $("body").on("click.cm", o, function(e) {
            e.preventDefault();
            var t = $(this).parents("form"),
                a = (t.attr("enctype") && t.attr("enctype").indexOf("form-data") > -1 ? 0 : 1) ? t.serialize() : new FormData(t[0]);
            $("button").addClass("disabled").find(".fa.fa-floppy-o").addClass("invisible").after('<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: -0.5px; margin-left: -28px;"><span class="cspinner-icon white small"></span></span></span>'), setTimeout(function() {
                $.ajax({
                    type: "POST",
                    url: i.attr("action"),
                    data: a,
                    dataType: "text",
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    success: function(e) {
                        if (s.removeClass("btn-warning").addClass("btn-success").attr("data-form-onbeforeunload", 0), $("button").removeClass("disabled").find(".fa").removeClass("invisible").parent().find(".cspinner_container").remove(), $(".container-fluid > .panel > .panel-body").attr("data-cm-state", "false"), set_onbeforeunload_status(0, 0), $(e).find(".panel-body > hr + h3").length && !$(e).find(".panel-body .table").length && !$(e).find(".panel-body form[action]").length) return theme_messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + $(e).find(".panel-body hr + h3").html(), 60, "error", "magic_save_error"), s.removeClass("btn-success").addClass("btn-warning").attr("data-form-onbeforeunload", 1), void $(".container-fluid > .panel > .panel-body").attr("data-cm-state", "true")
                    },
                    error: function(e) {}
                })
            }, 300)
        })
    }
}

function page_resized() {
    navigation_lock_width(), $(".mobile-menu-toggler").hasClass("selected") || ($("aside").addClass("hidden-xs"), $("aside").css("transform", "translate(" + settings_leftmenu_width + "px, 0px)"), $(".switch-toggle").css("display", "table"), "function" == typeof jQuery().transition && $(".__logo") && !$(".mobile-menu-toggler:visible").length ? $(".__logo").transition({
        y: "-140px"
    }, 700, function() {}) : $(".__logo") && $(".__logo").css("transform", "translate(0px, 0px)")), set_side_slider_visibility(!0 !== settings_side_slider_fixed || $(".mobile-menu-toggler:visible").length || !v___available_navigation ? 0 : 1)
}

function theme_settings_controls(e) {
    var t = $("#atsave, #save_user");
    e ? (set_onbeforeunload_status(1, 0), t.addClass("btn-warning")) : (set_onbeforeunload_status(0, 0), t.removeClass("btn-warning"))
}

function theme_settings_update() {
    $.each($("#atsettings .ui_form").serializeArray(), function(e, t) {
        if ("true" == t.value || "false" == t.value) {
            if ("true" == t.value) i = !0;
            else if ("false" == t.value) i = !1
        } else var i = t.value;
        window[t.name] = Test.numeric(i) ? parseInt(i) : i
    })
}

function bind_sameorigin() {
    $("body").on("click", 'a[href^="http"], a[href^="https"], a[href^="ftp"], a[href^="ftps"]', function(e) {
        Core.linkSameOrigin($(this)) || $(this).attr("target", "_blank")
    }), $.each($('ul.navigation a[href^="http"], ul.navigation a[href^="https"], ul.navigation a[href^="ftp"], ul.navigation a[href^="ftps"], ul.navigation a[data-href^="http"], ul.navigation a[data-href^="https"], ul.navigation a[data-href^="ftp"], ul.navigation a[data-href^="ftps"]'), function() {
        $(this).removeClass("navigation_module_trigger").parents("li").addClass("navigation_external"), $(this).attr("target", "_blank"), $(this).attr("href", $(this).data("href")), $(this).removeAttr("data-href")
    })
}

function get_navigation_menu_webmin(e) {
    get_onbeforeunload_status() || (navigation_render_start(), $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=" + ("webmail" == e ? "webmail" : "webmin"),
        data: !1,
        dataType: "text",
        success: function(e) {
            $("body ul.navigation").html(e), navigation_render_end(), !get_server_data("loading") && navigation_detect()
        }
    }), get_navigation_menu_buttons())
}

function get_navigation_menu_virtualmin(e) {
    get_onbeforeunload_status() || (navigation_render_start(), $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=virtualmin" + (e ? "&dom=" + e : settings_right_virtualmin_default ? "&dom=" + settings_right_virtualmin_default : ""),
        data: !1,
        dataType: "text",
        success: function(e) {
            $("body ul.navigation").html(e), navigation_render_end(), get_navigation_menu_virtualmin_summary(), !get_server_data("loading") && navigation_detect()
        }
    }), get_navigation_menu_buttons())
}

function get_navigation_menu_virtualmin_summary() {
    if (!get_onbeforeunload_status()) {
        var e = $('a[href*=".cgi?dom=$#DOM"]'),
            t = e.attr("href"),
            i = $('aside [name="dom"]').val();
        e.length && i && e.attr("href", t.replace("$#DOM", i))
    }
}

function get_navigation_menu_cloudmin(e) {
    get_onbeforeunload_status() || (navigation_render_start(), $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=cloudmin" + (e || 0 === e ? "&sid=" + e : settings_right_cloudmin_default ? "&sid=" + settings_right_cloudmin_default : ""),
        data: !1,
        dataType: "text",
        success: function(e) {
            $("body ul.navigation").html(e), theme_shell_link_control(), navigation_render_end(), !get_server_data("loading") && navigation_detect()
        }
    }), get_navigation_menu_buttons())
}

function get_navigation_menu_buttons() {
    get_onbeforeunload_status() || $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-buttons=1&xhr-buttons-type=" + ($t_uri_virtualmin || $t_uri_cloudmin ? 1 : 0),
        data: !1,
        dataType: "text",
        success: function(e) {
            $("body ul.user-links").html(e), theme_shell_link_control()
        }
    })
}

function get_default_content() {
    get_onbeforeunload_status() || ($("body").append('<span id="____switch"></span>'), $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-default=1",
        data: !1,
        dataType: "text",
        success: function(e) {
            $("#____switch").html(e), $____switch = $("#____switch").text();
            var t = v___location_prefix + (3 == v___user_level && Core.moduleAvailable("mailbox") && $t_uri_webmail ? "/mailbox/index.cgi?id=INBOX" : 3 == v___user_level ? "/sysinfo.cgi" : ("/" == $____switch.substring(0, 1) ? "" : "/") + $____switch);
            (Test.strContains(t, "mysql") || Test.strContains(t, "postgresql")) && get_bundle_sql(), Test.strContains(t, v___module_file_manager) && get_bundle_file_manager(), Test.strContains(t, "csf") && get_bundle_csf(), get_pjax_content(t), $("#____switch").remove()
        }
    }))
}

function get_default_virtualmin_content(e, t) {
    if (!get_onbeforeunload_status() || t) {
        var i, a = "/virtual-server";
        if (i = 1 == get_server_data("initial-wizard") ? a + "/wizard.cgi" : !1 !== e ? a + "/summary_domain.cgi?dom=" + e : "sysinfo.cgi" == settings_right_virtualmin_default || "" == settings_right_virtualmin_default ? "/sysinfo.cgi" : "index.cgi" == settings_right_virtualmin_default ? a + "/index.cgi" : a + "/summary_domain.cgi?dom=" + settings_right_virtualmin_default, t) return v___location_prefix + i;
        get_pjax_content(v___location_prefix + i)
    }
}

function get_default_cloudmin_content(e, t) {
    if (!get_onbeforeunload_status() || t) {
        var i;
        if (i = !1 === e || settings_right_cloudmin_default || "0" == settings_right_cloudmin_default ? "sysinfo.cgi" == settings_right_cloudmin_default || "" == settings_right_cloudmin_default && "0" != settings_right_cloudmin_default ? "sysinfo.cgi" : "index.cgi" == settings_right_cloudmin_default ? "server-manager/index.cgi" : "server-manager/edit_serv.cgi?id=" + settings_right_cloudmin_default : "server-manager/edit_serv.cgi?id=" + e, t) return v___location_prefix + "/" + i;
        get_pjax_content(v___location_prefix + "/" + i)
    }
}

function get_navigation_and_content(e, t, i) {
    get_onbeforeunload_status() || ("virtualmin" === e ? (get_navigation_menu_virtualmin(!1), 1 != settings_right_reload && 1 !== t || 1 === i || get_default_virtualmin_content(!1)) : "cloudmin" === e ? (get_navigation_menu_cloudmin(!1), 1 != settings_right_reload && 1 !== t || 1 === i || get_default_cloudmin_content(!1)) : (0 == navigation_dashboard_switch_available() && get_navigation_menu_webmin(e), 1 != settings_right_reload && 1 !== t || 1 === i || get_default_content()))
}

function information_update() {
    if (!$("body .modal.in").length && 0 == v___user_level) {
        var e = $("body").find("#system-status"),
            t = e.length ? e[0] : 0;
        $("#right-side-tabs-sysinfo .graph-container").length || $("#right-side-tabs .info-container").html(get_right_panel_sysinfo_data()), t && $(t).find('h3 > a[data-refresh="system-status"]').addClass("disabled").find("i").addClass("fa-spin");
        var i = $(".right-side-tabs-dismiss .fa-reload");
        i.addClass("fa-spin-fast"), setTimeout(function() {
            i.removeClass("fa-spin-fast")
        }, 3e3), $.ajax({
            type: "GET",
            url: v___location_prefix + "/index.cgi/?xhr-info=1",
            data: !1,
            dataType: "json",
            success: function(e) {
                $.each(e, function(e, i) {
                    if ("cpu_percent" != e && "mem_percent" != e && "virt_percent" != e && "disk_percent" != e || (Test.numeric(i) ? localStorage.setItem(v___server_hostname + "-sysinfo_" + e + "_stats", i) : localStorage.setItem(v___server_hostname + "-sysinfo_" + e + "_stats", "")), t) {
                        if ($(t).find('span[data-id="sysinfo_' + e + '"]').html(i), "local_time" == e || "uptime" == e || "running_proc" == e) {
                            var a = $(t).find('span[data-id="sysinfo_' + e + '"]'),
                                n = $(t).find('span[data-id="sysinfo_' + e + '"] a'),
                                s = $(t).find('span[data-id="sysinfo_' + e + '"]').text();
                            "local_time" == e && settings_window_replace_timestamps ? n && n.length ? (s = $(t).find('span[data-id="sysinfo_' + e + '"] a').data("convertible-timestamp-full"), a.html(n.html(moment.unix(s).format(settings_window_replaced_timestamp_format_full)))) : (s = $(t).find('span[data-id="sysinfo_' + e + '"] > span').data("convertible-timestamp-full"), a.html(moment.unix(s).format(settings_window_replaced_timestamp_format_full))) : n && n.length && a.html(n.html(s))
                        }
                        if ($(t).find('.piechart[data-charts="sysinfo_' + e + '"]').length) {
                            var r = $("body").find('.piechart[data-charts="sysinfo_' + e + '"]');
                            r.length && !isNaN(parseInt(i)) && r.data("easyPieChart").update(i)
                        }
                        "cpu_percent" != e && "mem_percent" != e && "virt_percent" != e && "disk_percent" != e || localStorage.setItem(v___server_hostname + "-sysinfo_" + e + "_seen", i), $(t).find(".modal-backdrop").remove()
                    }
                    if ($__id__ = moment().unix(), "cpu_percent" == e || "mem_percent" == e || "virt_percent" == e || "disk_percent" == e || "csf_title" == e || "csf_remote_version" == e || "authentic_remote_version" == e || "package_message" == e ? localStorage.getItem(v___server_hostname + "-sysinfo_" + e) || localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i) : i && null != i && NaN != i ? localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i) : localStorage.setItem(v___server_hostname + "-sysinfo_" + e, ""), localStorage.getItem(v___server_hostname + "-sysinfo_package_message_initial") || localStorage.setItem(v___server_hostname + "-sysinfo_package_message_initial", 1), "authentic_theme_version" == e && !localStorage.getItem(v___server_hostname + "-sysinfo_theme_current_version") && i && localStorage.setItem(v___server_hostname + "-sysinfo_theme_current_version", i.match(/^\d+|\d+\b|\d+(?=\w)/g)[0] + "." + i.match(/^\d+|\d+\b|\d+(?=\w)/g)[1]), "csf_data" == e && !localStorage.getItem(v___server_hostname + "-sysinfo_csf_current_version") && i && localStorage.setItem(v___server_hostname + "-sysinfo_csf_current_version", i.match(/^\d+|\d+\b|\d+(?=\w)/g)[0] + "." + i.match(/^\d+|\d+\b|\d+(?=\w)/g)[1]), "csf_title" == e || "csf_data" == e || "csf_remote_version" == e || "authentic_remote_version" == e || "authentic_theme_version" == e || "package_message" == e) {
                        if ("package_message" === e) {
                            if ((localStorage.getItem(v___server_hostname + "-sysinfo_" + e) != i || 1 == localStorage.getItem(v___server_hostname + "-sysinfo_package_message_initial")) && i && i.indexOf("badge-danger") > -1) {
                                var _ = theme_language("theme_xhred_notifications_packages_updates"),
                                    o = $(i).html().replace(/badge-danger/g, "badge-success");
                                localStorage.setItem(v___server_hostname + "-notifications_" + $__id__ + "_package_message", JSON.stringify({
                                    title: _,
                                    time: $__id__,
                                    timestamp: $__id__,
                                    message: o,
                                    readStatus: 0,
                                    type: e,
                                    link: $(i).attr("href")
                                })), slider_mark_group_notifications_read("package_message"), localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i), localStorage.setItem(v___server_hostname + "-sysinfo_package_message_initial", 0), notifications(_, o, e)
                            } else "package_message" === e && localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i);
                            $(i).find("i.badge:first-child").length || slider_mark_group_notifications_read("package_message")
                        }
                        var l = localStorage.getItem(v___server_hostname + "-sysinfo_theme_current_version");
                        if (settings_sysinfo_theme_updates && (0 == localStorage.getItem(v___server_hostname + "-sysinfo_authentic_remote_version") && localStorage.removeItem(v___server_hostname + "-sysinfo_authentic_remote_version"), l && localStorage.getItem(v___server_hostname + "-sysinfo_authentic_remote_version") && "authentic_remote_version" == e && l < i && "0" != i && "0.00" != i && null != i)) {
                            var c = theme_language("theme_xhred_notifications_theme_update"),
                                d = theme_language("theme_xhred_notifications_theme_update_message").replace("%v", i) + '&nbsp;&nbsp;<span class="label label-success authentic_update" href="' + v___location_prefix + '/webmin/edit_themes.cgi"><i class="fa fa-fw fa-refresh"></i></span>';
                            localStorage.setItem(v___server_hostname + "-notifications_" + $__id__ + "_authentic_remote_version", JSON.stringify({
                                title: c,
                                time: $__id__,
                                timestamp: $__id__,
                                message: d,
                                readStatus: 0,
                                type: e,
                                link: v___location_prefix + "/sysinfo.cgi"
                            })), localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i), localStorage.setItem(v___server_hostname + "-sysinfo_theme_current_version", i), notifications(c, d, e)
                        }
                        if ("authentic_theme_version" !== e || Test.strContains(i, "CHANGELOG.md") || slider_mark_group_notifications_read("authentic_remote_version"), settings_sysinfo_csf_updates) {
                            var h = localStorage.getItem(v___server_hostname + "-sysinfo_csf_current_version");
                            if (h && null != h && localStorage.getItem(v___server_hostname + "-sysinfo_csf_remote_version") && "csf_remote_version" == e && h < i && "0" != i && "0.00" != i && null != i) {
                                var p = theme_language("theme_xhred_notifications_firewall_update"),
                                    f = theme_language("theme_xhred_notifications_firewall_update_message").replace("%v", i);
                                localStorage.setItem(v___server_hostname + "-notifications_" + $__id__ + "_csf_remote_version", JSON.stringify({
                                    title: p,
                                    time: $__id__,
                                    timestamp: $__id__,
                                    message: f,
                                    readStatus: 0,
                                    type: e,
                                    link: v___location_prefix + "/csf/index.cgi"
                                })), slider_mark_group_notifications_read("csf_remote_version"), localStorage.setItem(v___server_hostname + "-sysinfo_" + e, i), localStorage.setItem(v___server_hostname + "-sysinfo_csf_current_version", i), notifications(p, f, e)
                            }
                        }
                        if ("csf_data" === e && Test.strContains(i, "data-no-update") && slider_mark_group_notifications_read("csf_remote_version"), "csf_title" == e)
                            if (i && i.indexOf("label-danger") > -1 && 1 != localStorage.getItem(v___server_hostname + "-sysinfo_csf_not_running")) {
                                var g = theme_language("theme_xhred_notifications_firewall_danger"),
                                    u = theme_language("theme_xhred_notifications_firewall_danger_message").replace("%v", moment.unix($__id__).format(settings_window_replaced_timestamp_format_short));
                                localStorage.setItem(v___server_hostname + "-notifications_" + $__id__ + "_csf_title", JSON.stringify({
                                    title: g,
                                    time: $__id__,
                                    timestamp: $__id__,
                                    message: u,
                                    readStatus: 0,
                                    type: e,
                                    link: v___location_prefix + "/csf/index.cgi"
                                })), slider_mark_group_notifications_read("csf_title"), localStorage.setItem(v___server_hostname + "-sysinfo_csf_not_running", 1), notifications(g, u, "csf_remote_version")
                            } else i && -1 === i.indexOf("label-danger") && (slider_mark_group_notifications_read("csf_title"), localStorage.removeItem(v___server_hostname + "-sysinfo_csf_not_running"))
                    }
                    if ("csf_deny" == e) {
                        var m = JSON.parse(i);
                        $.each(m, function(t, i) {
                            var a = (i = i.split("|"))[0],
                                n = i[1],
                                s = i[2],
                                r = i[3],
                                _ = (i[4], i[5], i[6], i[7]);
                            if (_ = _.replace("*Port Scan*", s && r ? 'Port <i data-port-href="http://www.speedguide.net/port.php?port=' + r + '" class="badge bg-dark-red">' + r + "</i> scan" : "Port scan"), !localStorage.getItem(v___server_hostname + "-allowed_trigger_" + (a + n.replace(/\./g, "0")) + "_csf_deny")) {
                                var o = theme_language("theme_xhred_notifications_firewall_warning"),
                                    l = _ + (s && r ? " <span>(" + s + ":" + r + ")</span>" : "");
                                localStorage.setItem(v___server_hostname + "-notifications_" + (a + n.replace(/\./g, "0")) + "_csf_deny", JSON.stringify({
                                    title: o,
                                    time: $__id__,
                                    timestamp: $__id__,
                                    message: l,
                                    readStatus: 0,
                                    type: e,
                                    link: v___location_prefix + "/csf/index.cgi"
                                })), localStorage.setItem(v___server_hostname + "-allowed_trigger_" + (a + n.replace(/\./g, "0")) + "_csf_deny", 1)
                            }
                        })
                    }
                    "cpu_percent" != e && "mem_percent" != e && "virt_percent" != e && "disk_percent" != e || null !== localStorage.getItem(v___server_hostname + "-sysinfo_" + e + "_seen") && i >= 85 && localStorage.getItem(v___server_hostname + "-sysinfo_" + e + "_seen"), setTimeout(function() {
                        if ((localStorage.getItem(v___server_hostname + "-sysinfo_cpu_percent_stats") || localStorage.getItem(v___server_hostname + "-sysinfo_mem_percent_stats") || localStorage.getItem(v___server_hostname + "-sysinfo_virt_percent_stats") || localStorage.getItem(v___server_hostname + "-sysinfo_disk_percent_stats")) && $("#right-side-tabs-sysinfo .graph-container").length) {
                            var t = !localStorage.getItem(v___server_hostname + "-sysinfo_" + e + "_stats"),
                                a = $(".info-container .graph-container." + e);
                            t ? a.addClass("hidden").prev("br").addClass("hidden") : a.removeClass("hidden").prev("br").removeClass("hidden"), "cpu_percent" == e && ($("#right-side-tabs-sysinfo .graph-container." + e + " .description").attr("title", localStorage.getItem(v___server_hostname + "-sysinfo_load")).text(theme_language("theme_xhred_global_cpu_load") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_cpu_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_load") + ")"), $("#right-side-tabs-sysinfo .graph-container." + e + " .bar").attr("style", "width:" + localStorage.getItem(v___server_hostname + "-sysinfo_cpu_percent_stats") + "%")), "mem_percent" == e && ($("#right-side-tabs-sysinfo .graph-container." + e + " .description").attr("title", localStorage.getItem(v___server_hostname + "-sysinfo_real_memory")).text(theme_language("body_real") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_mem_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_real_memory") + ")"), $("#right-side-tabs-sysinfo .graph-container." + e + " .bar").attr("style", "width:" + localStorage.getItem(v___server_hostname + "-sysinfo_mem_percent_stats") + "%")), "virt_percent" == e && ($("#right-side-tabs-sysinfo .graph-container." + e + " .description").attr("title", localStorage.getItem(v___server_hostname + "-sysinfo_virtual_memory")).text(theme_language("body_virt") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_virt_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_virtual_memory") + ")"), $("#right-side-tabs-sysinfo .graph-container." + e + " .bar").attr("style", "width:" + localStorage.getItem(v___server_hostname + "-sysinfo_virt_percent_stats") + "%")), "disk_percent" == e && ($("#right-side-tabs-sysinfo .graph-container." + e + " .description").attr("title", localStorage.getItem(v___server_hostname + "-sysinfo_disk_space")).text(theme_language("body_disk") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_disk_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_disk_space") + ")"), $("#right-side-tabs-sysinfo .graph-container." + e + " .bar").attr("style", "width:" + localStorage.getItem(v___server_hostname + "-sysinfo_disk_percent_stats") + "%"))
                        }
                        if ($('#right-side-tabs .info-container .info-list-data span[data-data="' + e + '"]').html(i), "package_message" == e && $('#right-side-tabs .info-container .info-list-data span[data-data="' + e + '"]').html($(i).html($(i).html().split(",")[0])[0].outerHTML), "local_time" == e && settings_window_replace_timestamps) {
                            (o = $('#right-side-tabs .info-container .info-list-data span[data-data="' + e + '"] a')) && o.length && o.html(o.next("span").detach());
                            var n = $(".info-container").find("span[data-convertible-timestamp-full]"),
                                s = n.attr("data-convertible-timestamp-full");
                            n.html(moment.unix(s).format(settings_window_replaced_timestamp_format_full))
                        }
                        if ("cpu_temperature" == e) {
                            var r = 0;
                            $.each($(i).filter(".badge-cpustatus"), function(e, t) {
                                var a = parseInt($(this).text().split(":")[1]),
                                    n = a;
                                label = a <= 30 ? "bg-info" : a > 30 && a <= 60 ? "bg-success" : a > 60 && a <= 80 ? "bg-warning" : a > 80 ? "bg-danger" : "", is_celcius = $(this).text().indexOf("°C") > -1, is_fan_rpm = $(this).text().indexOf("RPM") > -1, is_celcius || is_fan_rpm ? is_fan_rpm && (label = n <= 1600 ? "bg-info" : n > 1600 && n <= 2100 ? "bg-success" : n > 2100 && n <= 2800 ? "bg-warning" : n > 2800 ? "bg-danger" : "") : label = a <= 86 ? "bg-info" : a > 86 && a <= 140 ? "bg-success" : a > 140 && a <= 176 ? "bg-warning" : a > 176 ? "bg-danger" : "", "bg-warning" != label && "bg-danger" != label || (r = 1), $("#right-side-tabs .info-container .badge-drivestatus.badge-cpustatus").length || $('strong[data-stats="cpu"] + br[data-stats="cpu"]').after(i.replace(/<br>|&nbsp;/gi, "")), $($("#right-side-tabs .info-container .badge-drivestatus.badge-cpustatus")[e]).html($(this).text()).removeClass(function(e, t) {
                                    return (t.match(/(^|\s)bg-\S+/g) || []).join(" ")
                                }).addClass(label)
                            }).promise().done(function() {
                                r || "undefined" != typeof config_custom_force_display_cpu_sensors ? $('.info-container [data-stats="cpu"]').removeClass("hidden") : $('.info-container [data-stats="cpu"]').addClass("hidden")
                            })
                        }
                        if ("hdd_temperature" == e) {
                            var _ = 0;
                            $.each($(i), function(e, t) {
                                var a = parseInt($(this).text().split(":")[1]),
                                    n = a <= 30 ? "bg-info" : a > 30 && a <= 60 ? "bg-success" : a > 60 && a <= 80 ? "bg-warning" : a > 80 ? "bg-danger" : "";
                                $(this).text().indexOf("°C") > -1 || (n = a <= 86 ? "bg-info" : a > 86 && a <= 140 ? "bg-success" : a > 140 && a <= 176 ? "bg-warning" : a > 176 ? "bg-danger" : ""), "bg-warning" != n && "bg-danger" != n || (_ = 1), $("#right-side-tabs .info-container .badge-drivestatus:not(.badge-cpustatus)").length || $('strong[data-stats="drive"] + br[data-stats="drive"]').after(i.replace(/<br>|&nbsp;/gi, "")), $($("#right-side-tabs .info-container .badge-drivestatus:not(.badge-cpustatus)")[e]).html($(this).text()).removeClass(function(e, t) {
                                    return (t.match(/(^|\s)bg-\S+/g) || []).join(" ")
                                }).addClass(n)
                            }).promise().done(function() {
                                _ || "undefined" != typeof config_custom_force_display_drive_sensors ? $('.info-container [data-stats="drive"]').removeClass("hidden") : $('.info-container [data-stats="drive"]').addClass("hidden")
                            })
                        }
                        if ("uptime" == e || "running_proc" == e) {
                            var o = $('#right-side-tabs .info-container .info-list-data span[data-data="' + e + '"] a');
                            if (o && o.length) {
                                var l = o.parent(),
                                    c = l.text();
                                l.html(o.text(c))
                            }
                        }
                        if ("warning_si" == e && ((d = $("#right-side-tabs .info-container .warning-list-data")).html(i.replace(/<(script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/type='submit'/g, "formtarget='page' type='submit'").replace(/class='ui_submit/g, "class='ui_submit btn btn-default btn-xs").replace(/ui_form_end_submit" type="button"/g, 'ui_form_end_submit" type="submit" formtarget="page"').replace(/ui_form_end_submit/g, "ui_form_end_submit btn-tiny")), "<br>" == i && d.empty()), "extended_si" == e) {
                            var d = $("#right-side-tabs .info-container .extended-list-data"),
                                h = i.replace(/aria-expanded="true"/gi, 'aria-expanded="false"').replace(/collapse in/gi, "collapse");
                            opened_tabs = $("#extended_sysinfo .panel .in").map(function() {
                                h = h.replace('data-toggle="collapse" href="#' + this.id + '" aria-expanded="false" aria-controls="' + this.id + '"', 'data-toggle="collapse" href="#' + this.id + '" aria-expanded="true" aria-controls="' + this.id + '"'), h = h.replace('div id="' + this.id + '" class="panel-collapse collapse"', 'div id="' + this.id + '" class="panel-collapse collapse in"')
                            }).promise().done(function() {
                                d.html('<div style="height: 11px"></div>' + h);
                                var e = $("#right-side-tabs .extended-list-data");
                                e.find("div.panel-heading:not(#status_services-status):not(#status-virtual-server):not(#acl_logins-acl):not(#sysinfo-virtual-server):not(#quota-virtual-server):not(#bw-virtual-server)").parent().remove(), $.each(e.find("div.panel-heading .panel-title"), function() {
                                    var e = $(this).find("a"),
                                        t = "true" != $(this).find("a").attr("aria-expanded") ? 1 : 0,
                                        i = t ? "+" : "—";
                                    $(this).append('<span class="pull-right panel-title-status' + (t ? " margined-right-2" : "") + '">' + i + "</span>"), e.text(Convert.strUpFirst($.trim(e.text())))
                                }), e.find(".panel.panel-default").detach().appendTo("#right-side-tabs #extended_sysinfo"), e.find("div.panel-body").find("img").remove(), e.find('input[type="submit"]').addClass("btn btn-default btn-xs"), e.find('input[type="submit"]').parents("form").attr("formtarget", "page"), e.find('button[type="button"].ui_submit').addClass("btn btn-default btn-xs"), e.find('button[type="button"].ui_submit').parents("form").attr("formtarget", "page"), $("#extended_sysinfo .panel").on("show.bs.collapse", function() {
                                    $(this).find(".panel-title-status").removeClass("margined-right-2").text("—")
                                }).on("hide.bs.collapse", function() {
                                    $(this).find(".panel-title-status").addClass("margined-right-2").text("+")
                                })
                            })
                        }
                        $.trim($(".info-list-data").text()).length && setTimeout(function() {
                            $("#right-side-tabs .is-sysinfo_data").removeClass("hidden"), $("#right-side-tabs .no-sysinfo_data").addClass("hidden")
                        }, 100)
                    }, 101)
                }), setTimeout(function() {
                    slider_check_notifications()
                }, 3e3), t && $(t).find('h3 > a[data-refresh="system-status"]').removeClass("disabled").find("i").removeClass("fa-spin")
            }
        })
    }
}

function information_check() {
    if (setTimeout(function() {
            information_update()
        }, 1e4), settings_side_slider_enabled && !$("body .modal.in").length) return setInterval(function() {
        information_update()
    }, 6e4 * settings_side_slider_background_refresh_time)
}

function slider_display_notification_badges() {
    if (settings_side_slider_enabled && settings_side_slider_notifications_enabled) {
        var e = "right-side-tab-notification-asterix",
            t = "faa-ring faa-slow animated-hover",
            i = $(".right-side-tabs .list-group-item:not(.no-notifications, .opacity-0_3)").length;
        favicon.badge(i), i > 0 ? ($(".right-side-tabs-toggler button i.fa-bell").addClass(t), $(".right-side-tabs-toggler button span.badge").removeClass("hidden").text(i), $("#right-side-tabs ." + e).removeClass("hidden").text(i)) : ($(".right-side-tabs-toggler button i.fa-bell").removeClass(t), $(".right-side-tabs-toggler button span.badge").addClass("hidden").text(0), $("#right-side-tabs ." + e).addClass("hidden").text(0))
    }
}

function slider_check_notifications() {
    var $current_localData_notifications = {};
    $.each(localStorage, function(e, t) {
        if ("string" == typeof e && e.indexOf("notifications_") > -1 && e.indexOf(v___server_hostname) > -1) {
            var i = e.split("_")[1],
                a = JSON.parse(t),
                n = a.title,
                s = a.time,
                r = a.timestamp,
                _ = a.message,
                o = a.readStatus,
                l = a.type,
                c = a.link;
            $current_localData_notifications[s + "_" + n] = i + "~~~~" + n + "~~~~" + s + "~~~~" + r + "~~~~" + _ + "~~~~" + o + "~~~~" + l + "~~~~" + c, $('.list-group-item[id="' + i + '"][data-type="' + l + '"]').length && $('.list-group-item[id="' + i + '"][data-type="' + l + '"] .list-group-item-heading small').text(moment.unix(s).fromNow())
        }
    });
    var package_message_num = Object.values($current_localData_notifications).filter(function(e) {
            return e.indexOf("package_message") > -1
        }).length,
        csf_remote_version_num = Object.values($current_localData_notifications).filter(function(e) {
            return e.indexOf("csf_remote_version") > -1
        }).length,
        authentic_remote_version_num = Object.values($current_localData_notifications).filter(function(e) {
            return e.indexOf("authentic_remote_version") > -1
        }).length,
        csf_title_num = Object.values($current_localData_notifications).filter(function(e) {
            return e.indexOf("csf_title") > -1
        }).length,
        keys = [];
    for (var key in $current_localData_notifications) $current_localData_notifications.hasOwnProperty(key) && keys.push(key);
    $current_localData_notifications_sorted_keys = keys.sort(), $.each($current_localData_notifications_sorted_keys, function(i, v) {
        var vx = $current_localData_notifications[v],
            $__id__ = vx.split("~~~~")[0],
            $__data__title = vx.split("~~~~")[1],
            $__data__time = vx.split("~~~~")[2],
            $__data__timestamp = vx.split("~~~~")[3],
            $__data__message = vx.split("~~~~")[4],
            $__data__readStatus = vx.split("~~~~")[5],
            $__data__type = vx.split("~~~~")[6],
            $__data__link = vx.split("~~~~")[7];
        if ("package_message" == $__data__type || "csf_remote_version" == $__data__type || "authentic_remote_version" == $__data__type || "csf_title" == $__data__type) {
            var $__num = eval($__data__type + "_num");
            i + 1 < $__num && ($__data__readStatus = 1)
        }
        $('.list-group-item[id="' + $__id__ + '"][data-type="' + $__data__type + '"]').length || slider_add_notification($__id__, $__data__title, $__data__time, $__data__timestamp, $__data__message, $__data__readStatus, $__data__type, $__data__link)
    })
}

function slider_remove_all_notifications() {
    $.each(localStorage, function(e, t) {
        "string" == typeof e && e.indexOf("notifications_") > -1 && e.indexOf(v___server_hostname) > -1 && delete localStorage[e]
    })
}

function slider_mark_notification_read(e, t, i, a) {
    var n = JSON.parse(localStorage.getItem(v___server_hostname + "-notifications_" + e + "_" + t));
    n && localStorage.setItem(v___server_hostname + "-notifications_" + e + "_" + t, JSON.stringify({
        title: n.title,
        time: n.time,
        timestamp: n.timestamp,
        message: n.message,
        readStatus: i,
        type: n.type,
        link: n.link
    })), a && slider_display_notification_badges()
}

function slider_mark_group_notifications_read(e) {
    var t = "";
    e && (t = '[data-type="' + e + '"]'), $(".right-side-tabs .list-group-item" + t + ":not(.no-notifications)").each(function() {
        $(this).addClass("opacity-0_3"), slider_mark_notification_read($(this).attr("id"), $(this).data("type"), 1, 0)
    }).promise().done(function() {
        slider_display_notification_badges()
    })
}

function slider_add_notification(e, t, i, a, n, s, r, _) {
    $(".right-side-tabs .list-group").prepend('  \t\t\t<a class="list-group-item right-side-tabs-notification' + ("1" == s ? " opacity-0_3" : "") + '" data-type="' + r + '" id="' + e + '" href="' + _ + '">  \t\t\t    <div class="media-body">  \t\t\t    <i class="fa fa-fw fa-trash-o pull-right hidden"></i>  \t\t\t    <i class="fa fa-fw fa-clear-all pull-right hidden"></i>  \t\t\t        <div class="list-group-item-heading">' + t + " <small>" + moment.unix(i).fromNow() + "</small></div>  \t\t\t        <small>" + n + "</small>  \t\t\t    </div>  \t\t\t</a>  \t\t\t"), $(".right-side-tabs-no-notifications").remove(), slider_display_notification_badges(), v___initial_load || slider_add_no_notifications()
}

function slider_add_no_notifications() {
    if (0 === $(".right-side-tabs .list-group-item").length) {
        var e = theme_language("theme_xhred_notification_none");
        $(".right-side-tabs .list-group").prepend('          <div class="right-side-tabs-no-notifications" style="opacity: 0">          <div class="list-group-item text-center no-notifications">          <small class="list-group-item-text text-lighter theme_xhred_notification_none">' + (e ? e.toUpperCase() : "") + "</small>          </div>          </div>        "), $(".right-side-tabs-no-notifications").animate({
            opacity: "1"
        }, $settings_animation_left_slide_time, function() {})
    }
    setTimeout(function() {
        slider_display_notification_badges()
    }, $settings_animation_left_slide_time)
}

function fetch_right_pane_favorites() {
    if ("function" == typeof favorites_get) {
        var e = favorites_get(),
            t = $("#right-side-tabs .no-favorites_data");
        $("#right-side-tabs .favorites-dcontainer .right_pane_favorites_link, #right-side-tabs .favorites-dcontainer .right_pane_favorites_num").remove(), e.length ? ($.each(e, function(e, t) {
            $("#right-side-tabs .favorites-dcontainer").append('<span class="right_pane_favorites_num">' + (e + 1) + '</span><a class="right_pane_favorites_link" target="page" href="' + t.link + '"><i data-product="' + t.icon + '" class="wbm-' + t.icon + (t.icon, "") + ' wbm-sm">&nbsp;&nbsp;</i><span title="' + t.title + '" class="right_pane_favorites_text">' + t.title + "</span></a>")
        }), t.addClass("hidden")) : t.removeClass("hidden")
    }
}

function get_right_panel_sysinfo_data() {
    function e() {
        var e = $("#right-side-tabs-sysinfo span[data-convertible-timestamp-full]");
        e.data("convertible-timestamp-full", parseInt(e.data("convertible-timestamp-full")) + 1), e.text(moment.unix(e.data("convertible-timestamp-full")).format(settings_window_replaced_timestamp_format_full))
    }
    return $(function() {
        setInterval(e, 1e3)
    }), $_____________got_rp__sys_dat = 1, '      <div class="is-sysinfo_data hidden">        <div class="' + _v__ls__a + '" style="height: 4px"></div>        <div class="graph-container graph-container-fw cpu_percent' + _v__ls__a + '"><div class="graph"><div class="description" title="' + localStorage.getItem(v___server_hostname + "-sysinfo_load") + '">' + theme_language("theme_xhred_global_cpu_load") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_cpu_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_load") + ')</div><strong class="bar" style="width:' + localStorage.getItem(v___server_hostname + "-sysinfo_cpu_percent_stats") + '%"></strong></div></div><br class="' + _v__ls__a + '">        <div class="graph-container graph-container-fw mem_percent' + _v__ls__a + '"><div class="graph"><div class="description" title="' + localStorage.getItem(v___server_hostname + "-sysinfo_real_memory") + '">' + theme_language("body_real") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_mem_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_real_memory") + ')</div><strong class="bar" style="width:' + localStorage.getItem(v___server_hostname + "-sysinfo_mem_percent_stats") + '%"></strong></div></div><br class="' + _v__ls__a + '">        <div class="graph-container graph-container-fw virt_percent' + _v__ls__a + '"><div class="graph"><div class="description" title="' + localStorage.getItem(v___server_hostname + "-sysinfo_virtual_memory") + '">' + theme_language("body_virt") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_virt_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_virtual_memory") + ')</div><strong class="bar" style="width:' + localStorage.getItem(v___server_hostname + "-sysinfo_virt_percent_stats") + '%"></strong></div></div><br class="' + _v__ls__a + '">        <div class="graph-container graph-container-fw disk_percent' + _v__ls__a + '"><div class="graph"><div class="description" title="' + localStorage.getItem(v___server_hostname + "-sysinfo_disk_space") + '">' + theme_language("body_disk") + ": " + localStorage.getItem(v___server_hostname + "-sysinfo_disk_percent_stats") + "% (" + localStorage.getItem(v___server_hostname + "-sysinfo_disk_space") + ')</div><strong class="bar" style="width:' + localStorage.getItem(v___server_hostname + "-sysinfo_disk_percent_stats") + '%"></strong></div></div><br class="' + _v__ls__a + '">                <div data-stats="cpu" style="height: 10px"></div><strong data-stats="cpu">' + theme_language("body_cputemps") + '</strong><br data-stats="cpu">' + (localStorage.getItem(v___server_hostname + "-sysinfo_cpu_temperature") ? localStorage.getItem(v___server_hostname + "-sysinfo_cpu_temperature").replace(/<br>|&nbsp;/gi, "") : "") + '<br data-stats="cpu">        <div data-stats="drive" style="height: 10px"></div><strong data-stats="drive">' + theme_language("body_drivetemps") + '</strong><br data-stats="drive">' + (localStorage.getItem(v___server_hostname + "-sysinfo_hdd_temperature") ? localStorage.getItem(v___server_hostname + "-sysinfo_hdd_temperature").replace(/<br>|&nbsp;/gi, "") : "") + '<br data-stats="drive">                <div class="info-list-data">          <strong>' + theme_language("body_host") + '</strong><br><span data-data="host">' + localStorage.getItem(v___server_hostname + "-sysinfo_host") + "</span>          <strong>" + theme_language("body_os") + '</strong><br><span data-data="os">' + localStorage.getItem(v___server_hostname + "-sysinfo_os") + "</span>          <strong>" + theme_language("body_time") + '</strong><br><span data-data="local_time">' + (settings_window_replace_timestamps && localStorage.getItem(v___server_hostname + "-sysinfo_local_time") ? moment.unix($(localStorage.getItem(v___server_hostname + "-sysinfo_local_time")).attr("data-convertible-timestamp-full")).format(settings_window_replaced_timestamp_format_full) : localStorage.getItem(v___server_hostname + "-sysinfo_local_time")) + "</span>          <strong>" + theme_language("body_kernel") + '</strong><br><span data-data="kernel_arch">' + localStorage.getItem(v___server_hostname + "-sysinfo_kernel_arch") + "</span>          <strong>" + theme_language("body_uptime") + '</strong><br><span data-data="uptime">' + localStorage.getItem(v___server_hostname + "-sysinfo_uptime") + "</span>          <strong>" + theme_language("body_procs") + '</strong><br><span data-data="running_proc">' + localStorage.getItem(v___server_hostname + "-sysinfo_running_proc") + "</span>          <strong>" + theme_language("body_updates") + '</strong><br><span data-data="package_message">' + (localStorage.getItem(v___server_hostname + "-sysinfo_package_message") ? $(localStorage.getItem(v___server_hostname + "-sysinfo_package_message")).html($(localStorage.getItem(v___server_hostname + "-sysinfo_package_message")).html().split(",")[0])[0].outerHTML : "") + '</span>        </div>        <div class="warning-list-data">        </div>        <div class="extended-list-data">        </div>              </div>      <div class="no-sysinfo_data">          <div style="height: 5px"></div>          <small class="list-group-item-text text-lighter theme_xhred_notification_no_data">' + theme_language("theme_xhred_notification_no_data").toUpperCase() + "</small>      </div>    "
}

function editor_html_init(e) {
    CKEDITOR_BASEPATH = "/unauthenticated/js/ckeditor/", $.getScript(v___location_prefix + "/unauthenticated/js/ckeditor/ckeditor.js", function(t, i, a) {
        /**
         * Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
         * For licensing, see LICENSE.md or http://ckeditor.com/license
         */
        CKEDITOR.env.ie && CKEDITOR.env.version < 9 && CKEDITOR.tools.enableHtml5Elements(document), CKEDITOR.config.height = $(window).height() / e[1], CKEDITOR.config.width = "auto", CKEDITOR.config.removePlugins = "save, about", (v___theme_night_mode_enabled || v___theme_night_mode ? 1 : 0) && (CKEDITOR.config.contentsCss = v___location_prefix + "/unauthenticated/css/palettes/nightrider_ckeditor_content." + v___source_type + ".css?" + v___theme_version_plain, $('html head link[href*="css/nightrider_ckeditor."]').length || $("html head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/nightrider_ckeditor." + v___source_type + ".css?" + v___theme_version_plain + '" rel="stylesheet" type="text/css">'));
        var n = "%REV%" == CKEDITOR.revision || !!CKEDITOR.plugins.get("wysiwygarea"),
            s = CKEDITOR.document.getById(e[0]);
        if (n) {
            var r = get_server_data("language");
            CKEDITOR.replace(e[0], {
                language: "zh" == r ? "zh-cn" : r
            })
        } else s.setAttribute("contenteditable", "true"), CKEDITOR.inline(e[0]);
        if (!0 === e[2])
            for (var _ in CKEDITOR.instances) CKEDITOR.instances[_].on("change", function(e) {
                e.removeListener(), set_onbeforeunload_status(1, 0)
            });
        "edit_web" === e[3] && setTimeout(function() {
            $("hr + b").removeClass("hidden"), $(".__tmp__spinner").remove()
        }, 100)
    })
}

function table_data_filter() {
    $(".__page .dataTables_filter").length && setTimeout(function() {
        $(".btn-filter-top-right").length || ($("#headln2r .btn-group a").addClass("pull-left").attr("style", ""), $("#headln2r .btn-group").prepend('        <a class="btn btn-link text-lighter btn-filter-top-right text-decoration-none pull-left" data-placement="auto top" data-toggle="tooltip" data-title="' + theme_language("theme_xhred_datatable_filter") + '" data-container="body">          <label>          &nbsp;&nbsp;<span class="fa fa-times-circle-o vertical-align-middle filter_mirror_clear text-lighter"></span>            <input type="text" class="dataTable-mirror" placeholder="' + theme_language("theme_xhred_datatable_filter") + '">          </label>          <i class="fa fa-filter"></i>        </a>      ')), $(".container-fluid .nav.nav-tabs").length && $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
            var t = $(e.target).parent(".active");
            t.data("filter-value") ? $(".dataTable-mirror").val(t.data("filter-value")).trigger("keyup") : $(".dataTable-mirror").val("").trigger("keyup"), table_data_filter_toggle_visibility()
        }), $(".dataTables_filter").hide(), $(".filter_mirror_clear").mousedown(function(e) {
            $(e.target).is(".filter_mirror_clear") && table_data_filter_clear()
        }), $(".btn-filter-top-right").click(function(e) {
            !$(e.target).is("input") && $(this).find("label").slideToggle(300, function() {
                $(this).find("input").focus()
            })
        }), $(".dataTable-mirror").keydown(function(e) {
            76 == e.keyCode && e.ctrlKey && (e.preventDefault(), e.stopPropagation(), table_data_filter_clear())
        }).keyup(function(e) {
            $(".container-fluid .nav.nav-tabs").length ? ($(".nav-tabs li.active").data("filter-value", $(this).val()), $(".active .dataTables_filter input").val($(this).val()).trigger("keyup")) : $(".dataTables_filter input").val($(this).val()).trigger("keyup"), $.trim($(this).val()).length > 0 ? ($(".btn-filter-top-right span").removeClass("text-lighter"), $(".btn-filter-top-right i").addClass("text-danger")) : ($(".btn-filter-top-right span").addClass("text-lighter"), $(".btn-filter-top-right i").removeClass("text-danger"))
        }), $(".btn-filter-top-right input").blur(function(e) {
            $(this).parent("label").slideToggle(0)
        }), table_data_filter_toggle_visibility()
    }, 0)
}

function table_data_filter_toggle_visibility() {
    $(".container-fluid .nav.nav-tabs").length && $(".active .dataTables_filter").length || !$(".container-fluid .nav.nav-tabs").length && $(".dataTables_filter").length ? $(".btn-filter-top-right").show() : $(".btn-filter-top-right").hide()
}

function table_data_filter_clear() {
    var e = $(".btn-filter-top-right .dataTable-mirror"),
        t = $(".btn-filter-top-right input");
    e.val("").trigger("keyup"), t.is(":visible") && t.trigger("blur")
}

function table_data_init(e, t, i, a) {
    function n(e) {
        e.DataTable({
            order: [],
            aaSorting: [],
            bDestroy: !0,
            bPaginate: !1,
            columnDefs: [a],
            bInfo: !1,
            bStateSave: t,
            destroy: !0,
            dom: i ? "Rlfrtip" : "f",
            oLanguage: {
                sEmptyTable: theme_language("theme_xhred_datatable_semptytable"),
                sInfo: theme_language("theme_xhred_datatable_sinfo"),
                sInfoEmpty: theme_language("theme_xhred_datatable_sinfoempty"),
                sLengthMenu: theme_language("theme_xhred_datatable_slengthmenu"),
                sLoadingRecords: theme_language("theme_xhred_datatable_sloadingrecords"),
                sProcessing: theme_language("theme_xhred_datatable_sprocessing"),
                sSearch: " ",
                sZeroRecords: theme_language("theme_xhred_datatable_szerorecords")
            },
            initComplete: function(e) {
                $(".dataTables_filter").find('input[type="search"]').attr("placeholder", theme_language("theme_xhred_datatable_filter"))
            }
        })
    }
    if (void 0 === t && (t = !1), void 0 === i && (i = !1), void 0 === a && (a = !1), Core.curModuleFile("virtual-server", "index.cgi") && (t = !0), $.fn.dataTableExt.sErrMode = "throw", Core.curModuleFile("virtual-server", "list_users.cgi")) {
        var s = $(".table thead tr th").filter(function() {
            return $(this).text().match(/Last login|Dernière Connexion|Siste innlogging|Letzer Login|Laatste login/)
        }).index();
        s > -1 ? $.each(e.find("tbody tr td:nth-child(" + (s + 1) + ")"), function(e, t) {
            var i = $(this).text();
            /Never|Jamais|Aldri|Niemals|Nigdy|Nooit/i.test(i) && (i = 0), $(this).attr("data-sort", i)
        }).promise().done(function() {
            n(e)
        }) : n(e)
    } else n(e)
}

function favorites_check() {
    return $("#favorites-menu .favorites-menu-content li:not(.exclude)").length
}

function favorites_get() {
    var e = [];
    return $.each($("#favorites-menu .favorites-menu-content li:not(.exclude) a"), function() {
        var t = $(this).text(),
            i = $(this).attr("href"),
            a = $(this).find(".wbm-sm").attr("data-product");
        favorite = {}, favorite.link = navigation_trigger(i, 1), favorite.title = t.trim(), favorite.icon = "virtualmin" == a ? a + "" : a, e.push(favorite)
    }), e
}

function favorites_init() {
    "function" == typeof sortable && $("#favorites-menu > div > nav > ul").length && sortable("#favorites-menu > div > nav > ul", {
        items: ":not(.favorites-title)",
        forcePlaceholderSize: !1
    }).on("sortupdate", function() {
        favorites_save()
    })
}

function favorites_save() {
    $.ajax({
        type: "POST",
        url: v___location_prefix + "/settings-favorites_save.cgi",
        data: {
            favorites: '{"favorites":' + JSON.stringify(favorites_get(), null, 4).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f") + "}"
        },
        success: function(e) {
            fetch_right_pane_favorites()
        },
        error: function(e) {}
    }), sortable("#favorites-menu > div > nav > ul")
}

function favorites_add(e, t, i) {
    var a = "favorites-menu .favorites-menu-content";
    0 === favorites_check() && ($("#" + a + " li.favorites-no-message").addClass("hidden"), $("#" + a + " .favorites-title sup a").removeClass("hidden")), $("#" + a + " li.favorites-title").after('<li class="menu-exclude" draggable="true"><a class="menu-exclude-link" target="page" href="' + navigation_trigger(e, 1) + '"><i data-product="' + i + '" class="wbm-' + i + ' wbm-sm">&nbsp;</i><span class="f__c">' + t + '&nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px"><i class="fa fa-fw fa-times"></i></small></span></a></li>')
}

function favorites_empty() {
    var e = "favorites-menu .favorites-menu-content";
    0 === favorites_check() && ($("#" + e + " li.favorites-no-message").removeClass("hidden"), $("#" + e + " .favorites-title sup a").addClass("hidden"))
}

function favorites_remove(e) {
    $("#favorites-menu .favorites-menu-content").find('a[href="' + navigation_trigger(e, 1) + '"]').parent("li").remove(), $("#headln2c > .favorites, .xcustom-favorites").addClass("fa-star-o").removeClass("fa-star text-warning"), favorites_empty(), favorites_save()
}

function favorites_detect() {
    var e = $("#favorites-menu .favorites-menu-content li:not(.exclude) a").map(function(e, t) {
            return navigation_trigger($(t).attr("href"), 1)
        }).toArray(),
        t = $("#headln2c > .favorites, .xcustom-favorites"),
        i = navigation_trigger(URI(v___location).resource(), 1),
        a = i + "index.cgi";
    $.inArray(i, e) > -1 || $.inArray(a, e) > -1 ? t.addClass("fa-star").removeClass("fa-star-o") : t.removeClass("fa-star").addClass("fa-star-o")
}

function page_table_rows_control() {
    $("body").attr("class") && $("body").attr("class").indexOf(v___module_file_manager) > -1 || $.each($(".ui_checked_columns"), function(e, t) {
        !$(t).find("a[href]") || $("body").hasClass("servers") || $(this).hasClass("selectable") || $(t).addClass("cursor-pointer").find("td").addClass("cursor-pointer").find("label").addClass("cursor-pointer").find("tt").addClass("cursor-pointer"), $(t).find("td:not(.selectable)").click(function(e) {
            if (!$(e.target).is(".awobject, .iawobject, .lawobject, .awcheckbox, .awradio") && $(t).find("a[href]") && !$("body").hasClass("servers")) {
                var i = $(t).find("a[href]")[0],
                    a = ($(this).parents("tr.ui_checked_columns"), $(e.target).find('input[type="checkbox"]:not(":disabled")')),
                    n = a.length;
                n && a.trigger("click"), !i || $(this).find("a").attr("href") !== $(i).attr("href") && void 0 !== $(this).find("a").attr("href") || $(e.target).is("select, input, .awobject, .iawobject, .lawobject, .awcheckbox, .awradio") || 0 !== $(this).parent("tr").find('a[href*="download.cgi"]').length || ($(i).attr("target") ? (e.preventDefault(), !n && window.open($(i).attr("href"), $(i).attr("target"))) : e.originalEvent && !$(e.target).is("a") && $(i).trigger("click"))
            }
        }), $(t).find("td").contextmenu(function(e) {
            var t = $(this).parents("tr.ui_checked_columns");
            e.preventDefault(), ($(this).parents("tr").find('input[type="checkbox"]:first').length && 0 === $(this).parents("tr").find('input[type="checkbox"][disabled]').length || $(this).parents("tr").find('input[type="checkbox"][disabled]').length && $(this).parents("tr").find("input").length > 1) && (t.find('input[type="checkbox"]:first').is(":checked") ? t.removeClass("hl-aw") : t.addClass("hl-aw"), "function" == typeof __r____changed && __r____changed(), t.find('input[type="checkbox"]:first').trigger("click"))
        })
    })
}

function page_radios_evolve() {
    "conf" != get_server_data("post") && $.each($('input[type="radio"]:not(.iawobject), input[type="checkbox"]:not(.iawobject)'), function() {
        $(this)[0] && ($___text = $(this)[0].nextSibling);
        var e = $(this).next('input:not([type="radio"], [type="checkbox"], [type="hidden"]), select, textarea'),
            t = $___text && $___text.nodeValue && $.trim($___text.nodeValue).length > 1,
            i = t ? $___text.nodeValue : "&nbsp;",
            a = $(this).attr("type").toLowerCase();
        if (0 === $(this).next("label").length && 0 === e.length && t) {
            if ($(this).addClass("iawobject"), !1 === (s = !!$(this).attr("id") && 'for="' + $(this).attr("id") + '"') && $(this).attr("name") && $(this).val()) {
                var n = "__replaced_" + $(this).attr("name") + "_" + $(this).val(),
                    s = 'for="' + n + '"';
                $(this).attr("id", n)
            }
            $($___text).wrap('<label class="lawobject" ' + s + ">" + i.replace(/<hr>/g, "&lt;hr&gt;").replace(/<header>/g, "&lt;header&gt;") + " </label>"), $($___text).remove(), $(this).next("label").addBack().wrapAll('<span class="aw' + a + ' awobject awobjectm"></span>')
        } else if (0 !== e.length || 0 !== $(this).next("label").length || 1 !== $(this).prev("label").length || t) {
            if (0 === e.length && 0 === $(this).next("label").length && !t) {
                $(this).addClass("iawobject");
                var r = $(this).attr("name");
                r && (r = $(this).attr("name").replace(".", "").replace(/:/g, "").replace(/\//g, "").replace("%", "")), $(this).attr("id") || $("#" + r).length || $(this).attr("id", r), $(this).after('<label class="lawobject" for="' + Convert.htmlEscape($(this).attr("id") ? $(this).attr("id") : $(this).attr("name")) + '">&nbsp;</label>'), $(this).next("label").addBack().wrapAll('<span class="aw' + a + ' awobject awobjectm"></span>')
            }
        } else {
            var _ = $(this).prev("label"),
                o = _.text();
            $(this).addClass("iawobject"), $(this).attr("id") || $("#" + $(this).attr("name")).length || $(this).attr("id", $(this).attr("name")), $(this).after('<label class="lawobject" for="' + Convert.htmlEscape($(this).attr("name")) + '-aur0">' + o + "</label>"), $(this).next("label").addBack().wrapAll('<span class="aw' + a + ' awobject awobjectm"></span>'), $(this).attr("id", $(this).attr("name") + "-aur0").removeClass("form-control").css("width", "initial"), _.remove()
        }
        1 === e.length && 0 === $(this).next("label").length && ($(this).addClass("iawobject"), $("#" + e.attr("name")).length ? $("#" + e.attr("name")).length || e.attr("id", e.attr("name")) : $(this).attr("id", e.attr("name")), $(this).after('<label class="lawobject" for="' + Convert.htmlEscape(i ? $(this).attr("id") : e.attr("name")) + '">' + i + "</label>"), $(this).next("label").addBack().wrapAll('<span class="aw' + a + ' awobject awobjectm"></span>'), t && $($___text).remove())
    })
}

function chooser_get(e) {
    $(".mppopup .cspinner.hidden").removeClass("hidden"), $.ajax({
        type: "POST",
        url: e,
        data: !1,
        dataType: "text",
        success: function(e) {
            var t = e.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, ""),
                i = $(t).filter(".table").html(),
                a = $(t).filter(".table").prev("b").html();
            a = chooser_breadcrumbs(a), $(".mppopup .modal-body").html(a + '<table class="table table-hover table-condensed table-striped">' + i + "</table>"), $v__mpp__g_gp = 0, $(".mppopup_filter_input").focus(), $(".mppopup_filter_input").val("")
        }
    })
}

function chooser_get_link(e) {
    return e.replace(/&file.*&chroot/, "&file=" + Convert.uriEncodeComponent(($v__mpp__g_ol + "/").replace(/\/\/+/g, "/")) + "&chroot")
}

function chooser_get_target(e, t) {
    var i = e.prev('input[type="text"], input[name]');
    return i.is("input") || e.prev("textarea").length || e.prev("br").prev("textarea").length ? i.length || i.is("input") || !t || (i = e.prev("textarea")).length || (i = e.prev("br").prev("textarea")) : i = e.prev("span:not(.awradio)").find('input[type="text"]'), i
}

function chooser_control(e, t, i) {
    if (i) {
        if ($(".refInputData").is("textarea")) {
            var a = $(".refInputData");
            a.val() ? a.val(a.val() + "\n" + e.replace(/\/\/+/g, "/")) : a.val(e.replace(/\/\/+/g, "/"))
        } else $(".refInputData").val(e.replace(/\/\/+/g, "/"));
        var n = $(".refInputData").parent("td").prev("td").find('input[type="radio"]'),
            s = $(".refInputData").parent("span").prev("span").find('input[type="radio"]'),
            r = $(".refInputData").prev("span").find('input[type="radio"]'),
            _ = $(".refInputData").prev("select").find('option[value="*"]');
        s.length ? s.trigger("click") : r.length ? r.trigger("click") : _.length ? _.parent("select").val("*").trigger("change") : n.trigger("click")
    }
    t && $("body .mppopup").modal("hide")
}

function chooser_breadcrumbs(e) {
    e = $.url(e).attr("path").replace(/\/$/g, "").split("/");
    var t = "";
    return $.each(e, function(e, i) {
        t += "" === i ? '<a href="#' + e + '">' + (0 == get_access_level() ? '<i class="fa fa-hdd-o margined-left--5"></i>' : '<i class="fa fa-user text-light margined-left--5"></i>') + "</a>\n" : '<a href="#' + e + '">' + i + "</a>\n"
    }), '<nav class="breadcrumbx">' + t + "</nav>" + '<span class="cspinner hidden" style="margin-top: 2px; margin-left: 8px;"><span class="cspinner-icon smaller"></span></span>'
}

function popover_visibility_position(e) {
    $.each($(".module-help"), function(t, i) {
        e.is($(this)) ? $(this).css({
            "z-index": 214748364 + t,
            opacity: 1
        }) : $(this).css({
            "z-index": 214748364 - t,
            opacity: .85
        })
    })
}

function page_render(e) {
    if (update_navigation_module_name(), e && "undefined" != typeof __cm_editor_static && (__cm_editor_static.toTextArea(), $('button[data-form="submitter"]').unwrap(), $('.CodeMirror, button[data-form="submitter"] + button, .-helper.__helper').remove()), function() {
            var e = $("body");
            e.off("mousedown.cm1 keydown.cm1"), e.undelegate('button[type="submit"]:not(.disabled)', "click.cm"), e.undelegate('button[data-form="submitter"]:not(.disabled)', "click.cm")
        }(), $("body").find('a[href*="virtual-server/switch_user.cgi"]').attr("target", "_parent"), $("body").attr("style", get_server_data("style")), $.each($('select[onchange="form.submit()"]'), function() {
            $(this).removeAttr("onchange").addClass("onchange_form_submit_triggger")
        }), editor_init_check()) {
        var t = $('select[name="file"]');
        t.addClass("onchange_form_submit_triggger"), t.next("button.ui_form_end_submit").addClass("hidden")
    }
    v___available_navigation && (Core.curModule("tunnel") || Core.curModule("updown") || Core.curModuleFile("mysql", "backup_form.cgi") || Core.curModuleFile("postgresql", "backup_form.cgi")) && $("form").on("submit", function(e) {
        var t = $(document.activeElement);
        Core.curModule("updown") && !$('a[href="#att_fetch"]').parent().is(".active") || (Core.curModuleFile("mysql", "backup_form.cgi") || Core.curModuleFile("postgresql", "backup_form.cgi")) && !$('input[name="dest"][value="1"]').is(":checked") && t.is('[name="backup"]') || t.is('[name="save"]') || (e.preventDefault(), e.stopPropagation(), $.ajax({
            type: $(this).attr("method") ? "GET" : "POST",
            url: v___location_prefix + "/" + v___module + "/" + $(this).attr("action"),
            data: get_form_data($(this)),
            dataType: "text",
            complete: function() {
                theme_open_new_tab(this.url), t.removeClass("disabled").find("i").removeClass("invisible").next(".cspinner_container").remove()
            }
        }))
    }), check_location_resource("/config.cgi?tunnel") && $('table table[width="100%"] tr:first-child').addClass("hidden"), $.each($('tr td:last-child a:contains("..")'), function() {
        v___location_path == v___location_prefix + "/virtual-server/list_databases.cgi" && $(this).html($(this).text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("ui_link")
    }), 0 == get_access_level() && v___available_navigation && !e && $("#headln2c").prepend('<i class="fa fa-fw fa-inverse fa-2x fa-star-o text-lighter favorites"></i>&nbsp;'), favorites_empty(), favorites_detect(), $(".switch-toggle").find('label[for="open_thirdlane"]').length && $('.switch-toggle input:not([id="open_webmin"])').each(function() {
        $(this).removeAttr("checked")
    }).promise().done(function() {
        $("#open_webmin").prop("checked", !0)
    }), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "init/" && $("table.table tbody tr").addClass("ui_checked_columns"), page_table_rows_control(), !e && page_radios_evolve();
    $('.ui_checked_columns td.ui_checked_checkbox input[type="checkbox"]:checked:not(disabled)').parents("tr.ui_checked_columns").addClass("hl-aw");
    if ($("body").hasClass("servers") && $('form[action="delete_servs.cgi"] a.icon_link, form[action="delete_servs.cgi"] a.ui_link, form[action="delete_servs.cgi"] .col-xs-1').on("click", function(e) {
            if ($(e.target).is(".gl-icon-select")) v___available_navigation ? $(this).trigger("contextmenu") : $(this).parents(".gl-icon-container").trigger("contextmenu");
            else {
                var t = v___location_href + $(this).attr("href"),
                    i = $(this).attr("href");
                $(this);
                i && i.indexOf("edit_serv.cgi") > -1 || i && i.indexOf("logout.cgi") > -1 ? void 0 !== e.originalEvent && $.pjax.click(e, {
                    timeout: 0,
                    push: get_pjax_push(),
                    type: get_pjax_type(),
                    container: "[data-dcontainer]",
                    fragment: "[data-dcontainer]"
                }) : i && -1 === i.indexOf("://") ? open(t) : open(i), e.preventDefault(), e.stopPropagation()
            }
        }), v___location_path != v___location_prefix + "/apache/edit_global.cgi" && v___location_path != v___location_prefix + "/apache/edit_virt.cgi" && v___location_path != v___location_prefix + "/apache/edit_dir.cgi" || $.each($(".ui_opt_textbox.form-control"), function() {
            $(this).parent("span").next("button.btn.btn-default.file_chooser_button").length > 0 && $(this).css("margin-right", "4px")
        }), e || ($(".opener_container").length && $.each($(".opener_container"), function() {
            $(this).find(".opener_shown").is(":visible") && $(this).parent("tr").prev("tr").find("td a:nth-child(1)").addClass("opener_container_opened").removeClass("opener_container_closed")
        }), $(".opener_shown").length > 0 && $(".opener_trigger").length > 0 && ($(".panel-body  .ui_form .table  tbody  tr").removeClass("thead"), $(".opener_trigger").parents("table.table").addClass("opener_table_style"), $(".opener_trigger").parents("tr").addClass("_c__op_r").attr("style", "border: 0 !important"), $(".opener_trigger").parent("td").addClass("_c__op_d"), $(".opener_trigger").parent("td").find("a").addClass("link_hover_effect link_hover_effect_style_extra")), $('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').length > 0 && ($('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').each(function(e, t) {
            var i = !!(v___location_path == v___location_prefix + "/virtual-server/backup_form.cgi" && v___location_href && v___location_href.indexOf("?sched=") > -1);
            if ($(this).find("img").length > 0 && $(this).remove(), $(this).css("border-bottom", "0"), $(this).parents("table.table").addClass("opener_table_style_small"), $(this).parent("td").addClass("opener_table_cell_style_small"), i || $(this).parent("td").addClass("opener_table_cell_style_small opener_table_cell_style_small_exclusion_border_top"), $(this).parent("td").find("a").addClass("link_hover_effect link_hover_effect_style"), $(this).parent().is(".panel-body") || $(this).parent().is(".ui_form")) {
                var a = $(this),
                    n = a.parent().is(".panel-body") ? ".panel-body" : ".ui_form";
                a.parent(n).find('a[href^="javascript:hidden_opener"]:eq(1)').wrapAll('<div class="opener_extra_container"></div>'), Core.curModuleFile("bind8", "edit_zonekey.cgi") && a.parent(n).find('a[href^="javascript:hidden_opener"]:eq(' + (e + 1) + ")").wrapAll('<div class="opener_extra_container"></div>'), a.parent('.panel-body > a[href^="javascript:hidden_opener"]:first-child').remove();
                var s = a.parent(n).find(".opener_extra_container");
                $(s).next("br").remove(), $(s).addClass("opener_extra_container_style"), $(s).find("a").addClass("opener_extra_container_a_style link_hover_effect"), $(s).next(".opener_hidden").attr("style", "padding:8px")
            }
        }), $.each($(".opener_hidden"), function() {
            $(this).css("display", "none")
        })), $("a.opener_trigger").each(function() {
            $(this).parent("td").css("text-align", "left")
        }), $('form[action*="seen_newfeatures.cgi"]').each(function() {
            $(this).parents("table.table-striped").next(".ui_form_end_buttons").css("margin-top", "14px")
        }), $("#tall_0").before("<br>"), $(".opener_container").each(function(e, t) {
            $(this).find("div").hasClass("opener_hidden") ? $(this).hide() : $(this).show()
        }), $.each($("div.barchart"), function() {
            var e = $(this).find('img[src*="red.gif"]'),
                t = $(this).parent("td").contents().filter(function() {
                    return 3 == this.nodeType
                }).text();
            e && e.attr("width") && $(this).parent("td").html('<div class="graph-container graph-container-fw"><div class="graph"><div class="description"> ' + t + ' </div><strong class="bar" style="width:' + e.attr("width") + '">' + e.attr("width") + "</strong></div></div>")
        }), $('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody > tr").css("border", "none").parents("table").css("margin-top", "20px"), $('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody").css("border", "none"), $('.ui_grid_table > tbody > tr.ui_grid_row > td:has(button[type="submit"])').parents("table.ui_grid_table").css("border", "none"), $("form.ui_form > table label.radio, form.ui_form > table label.checkbox").each(function() {
            var e = $(this),
                t = e.find("i.fa"),
                i = e.find("i.fa").text().trim(),
                a = e.text().trim();
            0 === i.length && 0 === a.length && t.parent("label").remove()
        })), v___location_path && (v___location_path.indexOf("/webmin/edit_themes.cgi") > -1 || v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-user.cgi")) {
        v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-user.cgi" && navigation_clear();
        var i = 'form[action*="settings.cgi"] select, form[action*="save_config.cgi"] select, form[action*="settings.cgi"] input, form[action*="save_config.cgi"] input';
        $("body").undelegate(i, "change"), $("body").on("change", i, function(e) {
            var t = $(this).val();
            if ("true" == t || "false" == t) {
                if ("true" == t) i = !0;
                else if ("false" == t) i = !1
            } else var i = t;
            window[$(this).attr("name")] = i, void 0 !== e.originalEvent && (v___initial_load && "settings-user.cgi" !== v___location_file ? v___initial_load = 0 : theme_settings_controls(1))
        });
        var a = 'form[action*="settings.cgi"] input, form[action*="save_config.cgi"] input';
        $("body").undelegate(a, "keydown"), $("body").on("keydown", a, function(e) {
            void 0 !== e.originalEvent && theme_settings_controls(1)
        }), v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-user.cgi" && $('button[type="button"][name="save_user"]').on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), theme_config("save"), navigation_render_start(), spinnerfy_buttons($(this), [-.5, -25, "small", 750]), setTimeout(function() {
                navigation_update()
            }, 1400)
        }), $(function() {
            function t() {
                $("body").undelegate("#atrestore:not(.disabled)", "click"), $("body").on("click", "#atrestore:not(.disabled)", function() {
                    set_onbeforeunload_status(0, 0), $(this).off();
                    var e = $(this);
                    e.hasClass("btn-inverse") || setTimeout(function() {
                        spinnerfy_buttons(e, [1.5, -33, "small", !1]);
                        var t = $(".ui_form").serialize();
                        $.ajax({
                            type: "POST",
                            url: v___location_prefix + "/index.cgi?xhr-settings=1&restore=1",
                            data: t,
                            success: function(e) {
                                theme_reload()
                            },
                            error: function(t) {
                                e.addClass("btn-danger").removeClass("btn-default btn-inverse opacity-0_5")
                            }
                        })
                    }, 0)
                })
            }
            Core.moduleAvailable("webmin") && !e && ($(".container-fluid .nav.nav-tabs").prepend('<li><a data-toggle="tab" href="#atsettings"><span class="cspinner" style="position: relative"><span class="cspinner-icon" style="width:12px; height:12px; "></span></span></a></li>'), $(".container-fluid .tab-pane").first().before('<div id="atsettings" class="tab-pane text-center"><span class="cspinner" style="margin-top:18px; position: relative"><span class="cspinner-icon"></span></span></div>'), $('.container-fluid .nav-tabs a[href="#atsettings"]').tab("show")), e || $.ajax({
                type: "GET",
                url: v___location_prefix + "/index.cgi/?xhr-settings=1",
                data: !1,
                dataType: "text",
                success: function(e) {
                    function i(e) {
                        void 0 === e && (e = $('input[name="settings_right_hide_table_icons"]:checked'));
                        var t = ["settings_right_small_table_icons", "settings_right_animate_table_icons", "settings_right_grayscaled_table_icons"];
                        "true" == e.val() ? $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !0), $('input[name="' + t + '"]').parent(".aradio").addClass("disabled")
                        }) : $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !1), $('input[name="' + t + '"]').parent(".aradio").removeClass("disabled")
                        })
                    }

                    function a(e) {
                        void 0 === e && (e = $('input[name="settings_hotkeys_active"]:checked'));
                        var t = ["settings_hotkey_custom_1", "settings_hotkey_custom_2", "settings_hotkey_custom_3", "settings_hotkey_custom_4", "settings_hotkey_custom_5", "settings_hotkey_custom_6", "settings_hotkey_custom_7", "settings_hotkey_custom_8", "settings_hotkey_custom_9", "settings_hotkey_toggle_modifier", "settings_hotkey_toggle_key_webmin", "settings_hotkey_toggle_key_virtualmin", "settings_hotkey_toggle_key_cloudmin", "settings_hotkey_toggle_key_usermin", "settings_hotkey_toggle_key_webmail", "settings_hotkey_focus_search", "settings_hotkey_toggle_slider", "settings_hotkey_reload", "settings_hotkey_reload", "settings_hotkey_toggle_key_night_mode", "settings_hotkey_sysinfo", "settings_hotkey_favorites"];
                        "false" == e.val() ? $.each(t, function(e, t) {
                            $('input[name="' + t + '"], select[name="' + t + '"]').prop("disabled", !0)
                        }) : $.each(t, function(e, t) {
                            $('input[name="' + t + '"], select[name="' + t + '"]').prop("disabled", !1)
                        })
                    }

                    function n(e) {
                        void 0 === e && (e = $('input[name="settings_side_slider_enabled"]:checked'));
                        var t = ["settings_side_slider_palette", "settings_side_slider_fixed", "settings_side_slider_background_refresh_time", "settings_side_slider_sysinfo_enabled", "settings_side_slider_notifications_enabled", "settings_side_slider_favorites_enabled"];
                        "false" == e.val() ? $.each(t, function(e, t) {
                            "settings_side_slider_fixed" == t && $('input[name="settings_side_slider_fixed"][value="false"]').trigger("click"), $('input[name="' + t + '"], select[name="' + t + '"]').prop("disabled", !0).parent(".aradio").addClass("disabled")
                        }) : $.each(t, function(e, t) {
                            $('input[name="' + t + '"], select[name="' + t + '"]').prop("disabled", !1).parent(".aradio").removeClass("disabled")
                        })
                    }

                    function s(e) {
                        void 0 === e && (e = $('input[name="settings_sysinfo_easypie_charts"]:checked'));
                        var t = ["settings_sysinfo_easypie_charts_size", "settings_sysinfo_easypie_charts_width", "settings_sysinfo_easypie_charts_scale"];
                        "true" == e.val() ? $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !1).removeClass("disabled")
                        }) : $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !0).addClass("disabled")
                        })
                    }

                    function r(e) {
                        void 0 === e && (e = $('input[name="settings_sysinfo_theme_updates"]:checked'));
                        var t = ["settings_sysinfo_theme_patched_updates"];
                        "true" == e.val() ? $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !1).removeClass("disabled")
                        }) : ($('input[name="settings_sysinfo_theme_patched_updates"][value="false"]').trigger("click"), $.each(t, function(e, t) {
                            $('input[name="' + t + '"]').prop("disabled", !0).addClass("disabled")
                        }))
                    }
                    $("#atsettings").html(e);
                    var _ = $("div#atsettings").find(".ui_form");
                    $__theme_text_right_save = _.data("text-save"), $__theme_text_right_saved = _.data("text-settings_right_saved"), $__theme_text_right_saving = _.data("text-settings_right_saving"), $__theme_text_right_restore_defaults = _.data("text-settings_right_restore_defaults"), $__theme_text_right_restored = _.data("text-settings_right_restored"), $__theme_text_right_restoring = _.data("text-settings_right_restoring"), $__theme_text_right_error = _.data("text-error"), $('.container-fluid .nav-tabs a[href="#atsettings"]').text(_.data("text-current_theme")), $("div#atsettings").removeClass("text-center"), t(), theme_settings_update();
                    var o = $("body").find(".fa.fa-sub-title").parent("span");
                    $(o).next("br").remove(), $(o).next("div.smaller").attr("style", "margin-top: -15px !important"), o.remove(), i(), $('input[name="settings_right_hide_table_icons"]').on("change", function() {
                        i($(this))
                    }), a(), $('input[name="settings_hotkeys_active"]').on("change", function() {
                        a($(this))
                    }), n(), $('input[name="settings_side_slider_enabled"]').on("change", function() {
                        n($(this))
                    }), s(), $('input[name="settings_sysinfo_easypie_charts"]').on("change", function() {
                        s($(this))
                    }), r(), $('input[name="settings_sysinfo_theme_updates"]').on("change", function() {
                        r($(this))
                    }), $('select[name="settings_navigation_color"]').on("click keyup change", function(e) {
                        var t = $(this).val();
                        get_server_data("data-theme", t), $("link[data-palette]").remove(), "blue" != t && $("head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/" + t.toLowerCase() + "." + v___source_type + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>'), get_server_data("data-default-theme", t), $("body .user-link.palette-toggle").find(".fa-sun").trigger("click"), theme_settings_update()
                    }), $('select[name="settings_background_color"]').on("click keyup change", function(e) {
                        var t = $(this).val();
                        get_server_data("data-background-style", t), get_server_data("data-background-style", t), $("link[data-palette]").remove(), "gainsboro" != t && ($("head").append('<link href="' + v___location_prefix + "/unauthenticated/css/palettes/" + t.toLowerCase() + "." + v___source_type + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>'), $('select[name="settings_navigation_color"]').val("gunmetal").trigger("change")), theme_settings_update()
                    }), $('select[name="settings_side_slider_palette"]').change(function(e) {
                        $("body .right-side-tabs, body .right-side-tabs-toggler").attr("data-background-style", $(this).val())
                    }), $('input[name="settings_side_slider_enabled"]').change(function(e) {
                        "true" == $(this).val() ? ($("body .right-side-tabs-toggler").removeClass("hidden"), $("body .right-side-tabs").removeClass("hidden"), $('input[name="settings_side_slider_sysinfo_enabled"][value="true"], input[name="settings_side_slider_notifications_enabled"][value="true"], input[name="settings_side_slider_favorites_enabled"][value="true"]').trigger("click")) : ($("body .right-side-tabs-toggler").addClass("hidden"), $("body .right-side-tabs").addClass("hidden")), theme_settings_update()
                    }), $('input[name="settings_side_slider_fixed"]').change(function(e) {
                        set_side_slider_visibility("true" == $(this).val() ? 1 : 0), theme_settings_update()
                    }), $('input[name="settings_side_slider_sysinfo_enabled"], input[name="settings_side_slider_notifications_enabled"], input[name="settings_side_slider_favorites_enabled"]').change(function(e) {
                        var t = "right-side-tabs-" + $(this).attr("name").split("_")[3],
                            i = $(this).attr("name"),
                            a = $("body").find("#" + t).hasClass("active"),
                            n = $('input[name="settings_side_slider_sysinfo_enabled"][value="true"]:checked, input[name="settings_side_slider_notifications_enabled"][value="true"]:checked, input[name="settings_side_slider_favorites_enabled"][value="true"]:checked').length;
                        "true" == $(this).val() ? ($("body").find('a[href="#' + t + '"], #' + t).removeClass("hidden").parent().removeClass("hidden"), "settings_side_slider_notifications_enabled" === i && ($(".right-side-tab-notification-asterix").removeClass("invisible hidden hidden-forged"), $(".right-side-tabs-toggler .badge.badge-danger").removeClass("invisible hidden hidden-forged"), setTimeout(function() {
                            "function" == typeof slider_display_notification_badges && slider_display_notification_badges()
                        }, 300))) : ($("body").find('a[href="#' + t + '"], #' + t).addClass("hidden"), a && n ? $("body #right-side-tabs").find("li:not(.active) a:not(.hidden)").first().trigger("click") : 0 === n && $('input[name="settings_side_slider_enabled"][value="false"]').trigger("click"), "settings_side_slider_notifications_enabled" === i && ($(".right-side-tab-notification-asterix").addClass("invisible hidden hidden-forged"), $(".right-side-tabs-toggler .badge.badge-danger").addClass("invisible hidden hidden-forged"), favicon.badge(0), titlenotifier.set(0))), theme_settings_update()
                    }), $('input[name="settings_side_slider_sysinfo_enabled"], input[name="settings_side_slider_notifications_enabled"], input[name="settings_side_slider_favorites_enabled"]').each(function() {
                        $('input[name="' + $(this).attr("name") + '"][value="' + window[$(this).attr("name")] + '"]').trigger("change")
                    }), $('select[name="settings_navigation_color"]').after('<i class="fa fa-fw fa-cog text-light settings_navigation_color_toggle cursor-default" data-name="settings_navigation_color" style="margin-left: 10px; vertical-align: middle; background-color: transparent !important"></i>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t <i class="fa fa-fw fa-refresh text-light settings_navigation_color_reset cursor-default hidden" data-name="settings_navigation_color" style="margin-left: 4px; vertical-align: middle; background-color: transparent !important"></i>'), $(".settings_navigation_color_toggle, .settings_background_color_toggle").on("click", function() {
                        void 0 === window[$(this).attr("data-name") + "controller"] || "hidden" == window[$(this).attr("data-name") + "controller"] ? ($("." + $(this).attr("data-name") + "_reset, ." + $(this).attr("data-name") + "_rows").removeClass("hidden"), window[$(this).attr("data-name") + "controller"] = "shown") : ($("." + $(this).attr("data-name") + "_reset, ." + $(this).attr("data-name") + "_rows").addClass("hidden"), window[$(this).attr("data-name") + "controller"] = "hidden")
                    }), $(".settings_navigation_color_reset").on("click", function() {
                        "settings_navigation_color" == $(this).attr("data-name") && navigation_filter_reset()
                    });
                    var l = $('input[name="settings_grayscale_level_navigation"], input[name="settings_sepia_level_navigation"], input[name="settings_saturate_level_navigation"], input[name="settings_hue_level_navigation"], input[name="settings_invert_level_navigation"], input[name="settings_brightness_level_navigation"], input[name="settings_contrast_level_navigation"]');
                    l.on("click keyup change", function(e) {
                        var t = "-webkit-filter: grayscale(" + $('input[name="settings_grayscale_level_navigation"]').val() + ") sepia(" + $('input[name="settings_sepia_level_navigation"]').val() + ") saturate(" + $('input[name="settings_saturate_level_navigation"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_navigation"]').val() + "deg) invert(" + $('input[name="settings_invert_level_navigation"]').val() + ") brightness(" + $('input[name="settings_brightness_level_navigation"]').val() + ") contrast(" + $('input[name="settings_contrast_level_navigation"]').val() + "); filter: grayscale(" + $('input[name="settings_grayscale_level_navigation"]').val() + ") sepia(" + $('input[name="settings_sepia_level_navigation"]').val() + ") saturate(" + $('input[name="settings_saturate_level_navigation"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_navigation"]').val() + "deg) invert(" + $('input[name="settings_invert_level_navigation"]').val() + ") brightness(" + $('input[name="settings_brightness_level_navigation"]').val() + ") contrast(" + $('input[name="settings_contrast_level_navigation"]').val() + ");";
                        $(".visible-xs.mobile-menu-toggler").attr("style", "position: fixed;" + t), $("aside, .visible-xs.mobile-menu-toggler").attr("style", "z-index: 10; overflow: visible; transform: translate(" + settings_leftmenu_width + "px, 0px);" + t), $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), theme_settings_update()
                    }), l.each(function() {
                        $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), $(this).parent().parent("td").parent("tr.atshover").addClass("hidden settings_navigation_color_rows")
                    });
                    var c = $('input[name="settings_grayscale_level_content"], input[name="settings_saturate_level_content"], input[name="settings_hue_level_content"]');
                    c.on("click keyup change", function(e) {
                        var t = "-webkit-filter: grayscale(" + $('input[name="settings_grayscale_level_content"]').val() + ") saturate(" + $('input[name="settings_saturate_level_content"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_content"]').val() + "deg); filter: grayscale(" + $('input[name="settings_grayscale_level_content"]').val() + ") saturate(" + $('input[name="settings_saturate_level_content"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_content"]').val() + "deg);";
                        $("body").attr("style", t), $("#content .loading-container").attr("style", t), $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), theme_settings_update()
                    }), c.each(function() {
                        $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), $(this).parent().parent("td").parent("tr.atshover").addClass("hidden settings_background_color_rows")
                    });
                    var d = $('input[name="settings_leftmenu_width"]');
                    d.on("click keyup change", function(e) {
                        page_adjust($(this).val(), $(this).val()), $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), theme_settings_update(), settings_leftmenu_width_initial = $(this).val()
                    }), d.each(function() {
                        $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val()), settings_leftmenu_width_initial = $(this).val()
                    }), "restored" == v___location_query && (l.trigger("click"), c.trigger("click"), d.trigger("click"), $('select[name="settings_navigation_color"], select[name="settings_background_color"]').trigger("change")), $("aside ul.user-html li.user-html-string").html($('input[name="settings_leftmenu_user_html"]').val()), $('input[name="settings_leftmenu_user_html"]').keyup(function(e) {
                        $("aside ul.user-html li.user-html-string").html($(this).val())
                    }), navigation_dashboard_switch_available() && $('input[name="settings_sysinfo_link_mini"]').parent().parent().parent().parent("tr").remove(), $('input[name^="settings_leftmenu_netdata_link"], input[name^="settings_leftmenu_user_html_only_for_administrator"], input[name="settings_sysinfo_easypie_charts_size"], input[name="settings_sysinfo_easypie_charts_width"], input[name="settings_sysinfo_easypie_charts_scale"], input[name="settings_sysinfo_theme_patched_updates"]').parents("td.col_value.atscontent").parent("tr.atshover").addClass("settings_option_padded"), $('input[data-role="tagsinput"]').tagsinput(), $("body").css("overflow", "auto"), $.getScript(v___location_prefix + "/unauthenticated/js/detector." + v___source_type + ".js?" + v___theme_version_plain, function(e, t, i) {
                        var a = new Detector;
                        $.each($('select[name="settings_font_family"] option'), function() {
                            var e = $(this).text();
                            a.detect(e) || "system-default" == $(this).val() || $(this).attr("disabled", "disabled").text(e + " (" + theme_language("theme_xhred_global_not_available") + ")")
                        }), $('select[name="settings_font_family"]').on("click keyup change", function(e) {
                            var t = $(this).val(),
                                i = ($.merge($("head"), $("head")), $("head").find('link[href*="font-"]').add($("head").find('link[href*="font-"]')).add($("head").find('link[href*="fonts-roboto"]')).add($("head").find('link[href*="fonts-roboto"]'))),
                                a = (a = $.merge($("head").find('link[href*="/authentic."]'), $("head").find('link[href*="/authentic."]'))).length ? a : $.merge($("head").find('link[href*="/bundle."]'), $("head").find('link[href*="/bundle."]'));
                            i.remove(), "0" == t || "1" == t ? "0" == t && a.after('<link href="' + v___location_prefix + "/unauthenticated/css/fonts-roboto." + v___source_type + ".css?" + v___theme_version_plain + '" rel="stylesheet" type="text/css">') : a.after('<link href="' + v___location_prefix + "/unauthenticated/css/font-" + t + "." + v___source_type + ".css?" + v___theme_version_plain + '" rel="stylesheet" type="text/css">')
                        })
                    }), $('input[name="settings_leftmenu_netdata"]').on("change", function() {
                        var e = $('input[name="settings_leftmenu_netdata_link"]');
                        "true" == $(this).val() ? e.removeAttr("disabled") : e.attr("disabled", "disabled")
                    }), $('input[name="settings_leftmenu_netdata"]:checked').trigger("change"), 0 != Core.moduleAvailable("status") && $(".right-side-tabs-toggler").length || ($('input[name="settings_side_slider_enabled"][value="false"]').trigger("click"), $('input[name="settings_side_slider_enabled"]').attr("disabled", "disabled"))
                }
            })
        });
        n = "#atsave:not(.btn-inverse):not(.disabled)";
        $("body").undelegate(n, "click"), $("body").on("click", n, function(e) {
            e.preventDefault();
            var t = $(this);
            spinnerfy_buttons(t, [1.5, -33, "small", 1e3]), set_onbeforeunload_status(0, 0), theme_settings_update(), theme_config("save"), $.ajax({
                type: "POST",
                url: v___location_prefix + "/webmin/edit_startpage.cgi",
                data: !1,
                dataType: "text",
                success: function(e) {
                    var t = $(e).find("form.ui_form");
                    t.find('select[name="gotomodule"]').val($.trim($('select[name="goto_webmin_default_module"]').val())), $.ajax({
                        type: "POST",
                        url: v___location_prefix + "/webmin/change_startpage.cgi",
                        data: $(t).serialize(),
                        dataType: "text",
                        success: function(e) {},
                        error: function() {}
                    })
                },
                error: function() {}
            }), setTimeout(function() {
                $.ajax({
                    type: "POST",
                    url: v___location_prefix + "/index.cgi?xhr-settings=1&save=1",
                    data: t.parents("form").serialize(),
                    dataType: "text",
                    success: function(e) {
                        navigation_update(), theme_settings_controls(0)
                    },
                    error: function() {
                        t.addClass("btn-danger").removeClass("btn-success btn-inverse opacity-0_5")
                    }
                })
            }, 1e3)
        });
        var n = ".authentic_update:not(.disabled), .page_footer_ajax_submit:not(.disabled)";
        $("body").undelegate(n, "click"), $("body").on("click", n, function() {
            spinnerfy_buttons($(this), [1.5, -33, "small", !1])
        })
    }
    if (e || v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "settings-editor_read.cgi" && v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "settings-upload.cgi" || ($('link[href*="/unauthenticated/css/styles.css"]').length && $('link[href*="/unauthenticated/css/styles.css"]').attr("href", $('link[href*="/unauthenticated/css/styles.css"]').attr("href").split("?")[0] + "?" + (new Date).getTime()), $('script[src*="/unauthenticated/js/scripts.js"]').length && $('script[src*="/unauthenticated/js/scripts.js"]').attr("src", $('script[src*="/unauthenticated/js/scripts.js"]').attr("src").split("?")[0] + "?" + (new Date).getTime()), setTimeout(function() {
            $(".file-editor-saved").remove(), $(".file-editor-save").removeClass("hidden")
        }, 2400), check_location_resource("/settings-upload.cgi?saved=1") && $.each($(".file_chooser_button_preview:first"), function() {
            $(this).hasClass("disabled") ? $("aside + .__logo").remove() : matchMedia("(max-width: 767px)").matches || ($("aside + .__logo").length ? ($('.__logo img[src*="/images/logo.png"]').attr("src", $('.__logo img[src*="/images/logo.png"]').attr("src").split("?")[0] + "?" + (new Date).getTime()), $("aside + .__logo").attr("style", "transform: translate(0px, 0px);"), setTimeout(function() {
                $(".__logo").transition({
                    y: "-140px"
                }, 1200)
            }, 400)) : ($("aside").after('<div class="__logo _logo" style="transform: translate(0px, 0px);"><img src="' + v___location_prefix + "/images/logo.png?" + (new Date).getTime() + '"></div>'), setTimeout(function() {
                $(".__logo").transition({
                    y: "-140px"
                }, 1200)
            }, 400)))
        }), $(".page_footer_ajax_submit:not(.disabled):not(.file-editor-saved)").on("click", function() {
            spinnerfy_buttons($(this), [1.5, -28, "small", !1])
        }), setTimeout(function() {
            v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-editor_read.cgi" && $(".end_submits").parent("td").after('<td style="text-align: right;"><a class="btn btn-default page_footer_ajax_submit pull-right" style="margin-top: 5px; margin-right: -2px;" id="edit_logos" href="' + v___location_prefix + '/settings-upload.cgi" data-original-title="" title=""><i class="fa fa-fw fa-file-image-o" style="margin-right:5px;"></i>Theme logos</a>').parents(".ui_form_end_buttons").css("width", "100%"), $(".btn-group.end_submits").css("margin-left", "2px")
        }, 100)), e || v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "settings-upload.cgi" || ($(function() {
            function e(e) {
                void 0 === e && (e = $('input[name="authenticated_logo"]:checked'));
                var t = ["authenticated_logo_file"];
                "1" != e.val() ? $.each(t, function(e, t) {
                    $('input[name="' + t + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
                }) : $.each(t, function(e, t) {
                    $('input[name="' + t + '"]').parents(".file-input-wrapper").removeClass("disabled"), "1" == $_authenticated_logo && $('input[name="' + t + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
                })
            }

            function t(e) {
                void 0 === e && (e = $('input[name="unauthenticated_logo"]:checked'));
                var t = ["unauthenticated_logo_file"];
                "1" != e.val() ? $.each(t, function(e, t) {
                    $('input[name="' + t + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
                }) : $.each(t, function(e, t) {
                    $('input[name="' + t + '"]').parents(".file-input-wrapper").removeClass("disabled"), "1" == $_unauthenticated_logo && $('input[name="' + t + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
                })
            }
            $_authenticated_logo = $('input[name="authenticated_logo"]:checked').val(), $_unauthenticated_logo = $('input[name="unauthenticated_logo"]:checked').val(), e(), $('input[name="authenticated_logo"]').on("change", function() {
                e($(this))
            }), t(), $('input[name="unauthenticated_logo"]').on("change", function() {
                t($(this))
            })
        }), $(".file_chooser_button_preview").on("mouseout", function(e) {
            $(this).css("background", "white")
        }).on("mouseover", function(e) {
            $(this).css("background", "#eee")
        }), $.each($(".file_chooser_button_preview"), function() {
            $(this).data("image") && $(this).popover({
                trigger: "hover",
                html: !0,
                content: function() {
                    return "<img src='" + $(this).data("image") + "'>"
                }
            })
        })), $("#system-status > div.panel-body > table > tbody > tr").on("mouseover", function() {
            $(this).find(".btn-hidden").removeClass("hidden")
        }).on("mouseout", function() {
            $(this).find(".btn-hidden").addClass("hidden")
        }), $('input[name="but_switch"]').on("click", function(e) {
            $(this).parents("form").attr("target", "_top")
        }), $('form[action*="switch_user.cgi"], a[href*="switch_user.cgi"]').each(function() {
            $(this).attr("target", "_top")
        }), (Core.curModule("mysql") || Core.curModule("postgresql")) && ($('a > img[src*="images/left.gif"]').each(function(e, t) {
            $(this).replaceWith('<i class="fa fa-fw fa-lg fa-arrow-circle-o-left text-semi-light vertical-align-baseline"></i>')
        }), $('a > img[src*="images/right.gif"]').each(function(e, t) {
            $(this).replaceWith('<i class="fa fa-fw fa-lg fa-arrow-circle-o-right text-semi-light vertical-align-baseline"></i>')
        })), Core.curModule("mailboxes") || Core.curModule("mailbox")) {
        var s = 'form.ui_form[action="index.cgi"]',
            r = "fa fa-fw fa-lg text-semi-light vertical-align-baseline fa-angle-";
        $(s + ' img[src*="images/left"], center img[src*="images/left"]').each(function() {
            $(this).replaceWith('<i class="' + r + 'left"></i>')
        }), $(s + ' img[src*="images/right"], center img[src*="images/right"]').each(function() {
            $(this).replaceWith('<i class="' + r + 'right"></i>')
        }), $(s + ' img[src*="images/first"]').each(function() {
            $(this).replaceWith('<i class="' + r + 'double-left"></i>')
        }), $(s + ' img[src*="images/last"]').each(function() {
            $(this).replaceWith('<i class="' + r + 'double-right"></i>')
        })
    }
    if (Core.curModule("mailbox") && $.each($('[onclick*="document.forms"]'), function() {
            var e = $(this),
                t = e.attr("onclick");
            e.attr("onclick", t.replace("document.forms[0]", "document.forms[1]"))
        }), Core.curModuleFile("virtual-server", "list_scripts.cgi") && ($('td > a > img[src*="images/staroff.gif"]').each(function(e, t) {
            $(this);
            $(t).attr("src", v___location_prefix + "/images/staroff.gif")
        }), $('td > a > img[src*="images/staron.gif"]').each(function(e, t) {
            $(this);
            $(t).attr("src", v___location_prefix + "/images/staron.gif")
        })), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "status/" && ($('td img[src*="images/up.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/check.png"), i.addClass("scale-08")
        }), $('td img[src*="images/down.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/cross.png"), i.addClass("scale-08")
        }), $('td img[src*="images/not.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/not.png"), i.addClass("scale-08")
        })), $('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/up.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/up.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/up.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/check.png"), i.addClass("scale-08")
        }), $('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/down.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/down.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/down.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/cross.png"), i.addClass("scale-08")
        }), $('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/not.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/not.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/not.gif"]:not(".ui_icon_protected")').each(function(e, t) {
            var i = $(this);
            $(t).attr("src", v___location_prefix + "/images/not.png"), i.addClass("scale-08")
        }), (Core.curModule("proc") || Core.curModule("firewall") || Core.curModule("firewall6") || Core.curModule("shorewall") || Core.curModule("shorewall6") || Core.curModuleFile("pam", "edit_pam.cgi") || Core.curModule("filter")) && ($("td a img[src], td label a img[src]").parents("td").addClass("text-center"), $('td img[src*="images/gap.gif"]').replaceWith('<i class="fa fa-fw fa-caret-down invisible"></i>'), $('td a img[src*="images/down.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_down") + '" class="fa fa-fw fa-move-down cursor-pointer"></i>'), $('td a img[src*="images/up.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_up") + '" class="fa fa-fw  fa-move-up cursor-pointer"></i>'), $('td a img[src*="images/after.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_add_after") + '" class="fa fa-fw fa-level-down cursor-pointer"></i>'), $('td a img[src*="images/before.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_add_before") + '" class="fa fa-fw fa-level-down fa-flip-vertical cursor-pointer"></i>')), (Core.curModule("squid") || Core.curModule("cron")) && ($('td a img[src*="images/movedown.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_down") + '" class="fa fa-fw fa-move-down cursor-pointer"></i>'), $('td a img[src*="images/moveup.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_up") + '" class="fa fa-fw fa-move-up cursor-pointer"></i>')), Core.curModule("cron") && ($('td a img[src*="images/bottom.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_bottom") + '" class="fa fa-fw fa-level-down cursor-pointer"></i>'), $('td a img[src*="images/top.gif"]').replaceWith('<i title="' + theme_language("theme_xhred_move_top") + '" class="fa fa-fw fa-level-down fa-flip-vertical cursor-pointer"></i>')), $("input").each(function(e, t) {
            "images/ok.gif" == $(this).attr("src") && ($(t).attr("src", v___location_prefix + "/" + $(this).attr("src")), $(this).parents("td").attr("style", "white-space: nowrap"))
        }), !e) {
        if (!$(".ui_table tr td").has(".ui_grid_table.table-hardcoded") || v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "passwd/" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "mailboxes/" && v___location_path != v___location_prefix + "/usermin/list_configs.cgi" || ($(".ui_table tr td .ui_grid_table.table-hardcoded").parents("table").css("border", "1px solid #f0f0f0"), $(".ui_table tr td .ui_grid_table.table-hardcoded").addClass("table").parents("tr").css("border", "1px solid #f0f0f0")), ($("body").attr("class") && $('body[class="custom"]').length || $("body").attr("class") && 0 === $("body").attr("class").search(/custom\d+$/)) && "view.cgi" == v___location_file) {
            var _ = $('form[action="save.cgi"]').find(".table-title").find("tt").text();
            $('form[action="save.cgi"]').find(".table-title").find("b").empty().append("<tt>" + _ + "</tt>")
        }
        if ($.each($("form > table"), function() {
                $(this).next('input[type="submit"]') && $(this).attr("style")
            }), $.each($("table tr"), function() {
                $(this).is(":empty") && $(this).remove()
            }), $.each($("span > input"), function() {
                var e = $(this).parent("span").next(".file_chooser_button"),
                    t = $(this).parent("span").next('input[type="button"][onclick]');
                $(this).parent("span").next("select");
                e && e.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; margin-top:4px !important;").find("i.fa-files-o").css("margin-top", "0").addClass("vertical-align-middle"), $(this).parents(".tab-content") && e.css("margin-top", "4px"), t && (t.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; vertical-align: middle").next("i.fa-files-o").css("margin-top", "11px").addClass("vertical-align-middle"), t.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; vertical-align: middle").next("i.fa-calendar").attr("style", "margin-top: 8px !important; font-size: 11px; margin-left: -27px; pointer-events: none;"))
            }), $.each($('input[type="button"][onclick^="ifield"]'), function(e, t) {
                $(this).css("margin-left", "0").css("width", "40px").css("height", "28px")
            }), $('.ui_form[action="switch.cgi"] > input.form-control.ui_textbox').next('input[type="button"][onclick^="ifield"]').attr("style", "margin-top: 2px !important; margin-bottom: 2px !important; margin-left: 0 !important"), setTimeout(function() {
                $('.ui_form[action="switch.cgi"]  .file_chooser_button_attached').attr("style", "font-size: 11px; pointer-events: none; margin-top: 14px !important;")
            }, 10), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "cshrc/" && $("textarea").each(function(e, t) {
                $(this).attr("style", "height: 20em !important")
            }), v___location_path != v___location_prefix + "/acl/" && v___location_path != v___location_prefix + "/acl/edit_user.cgi" || $('.ui_grid_table.table-hardcoded .ui_grid_row .ui_grid_cell input[type="checkbox"], .table-hardcoded .col_value input[type="checkbox"]').each(function(e, t) {
                $(this).attr("style", "vertical-align: bottom !important")
            }), ($("body").attr("class") && $('body[class="custom"]').length || $("body").attr("class") && 0 === $("body").attr("class").search(/custom\d+$/)) && ($(".panel-body > .ui_grid_table.table-hardcoded").each(function(e, t) {
                $(this).attr("style", "margin-top: 3px !important")
            }), $(".panel-body td > .ui_form").each(function() {
                $(this).attr("style", "padding-top: 0 !important")
            }), $(".panel-body > a.ui_link").each(function(e, t) {
                $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link"), $(this).text($(this).text().replace(/\.$/, "")), $(this).parent().contents().filter(function() {
                    return 3 == this.nodeType
                }).remove(), 0 === $(this).attr("href").indexOf("edit_cmd.cgi?new") && $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text()), 0 === $(this).attr("href").indexOf("edit_file.cgi?new") && $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text()), 0 === $(this).attr("href").indexOf("edit_sql.cgi?new") && $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text())
            }), $.each($('td.td_tag:contains("|")'), function() {
                $(this).find('a[href^="edit_"]').addClass("ui_link_replaced btn btn-success btn-xxs").css("margin-right", "3px").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil">&nbsp;</i>'), $(this).find('a:not([href^="edit_"])').remove(), $(this).parents("table").find("thead > tr > th:eq(2)").addClass("pointer-events-none").html("")
            }), $('td.td_tag:contains("|")').contents().filter(function() {
                return 3 == this.nodeType
            }).remove()), theme_buttonify(["/virtual-server/cert_form.cgi", "/webmin/edit_ssl.cgi", "/usermin/edit_ssl.cgi"], "#att_current", "a", "btn btn-link btn-link-bordered btn-xxs margined-left-3 vertical-align-top margined-top-2 --to-new-tab", 0, "", "", "", "|"), theme_buttonify(["/sysinfo.cgi", "/virtual-server/edit_newchangelog.cgi", "/server-manager/edit_newchangelog.cgi"], "#newfeatures-virtual-server-1-collapse dt, #newfeatures-server-manager-1-collapse dt, .table td dt", "a", "btn btn-link btn-link-bordered btn-xxs margined-left-3 vertical-align-top margined-top-2", "fa-eye", "|", ""), theme_buttonify(["/virtual-server/", "/virtual-server/index.cgi", "/virtual-server/edit_plan.cgi"], "form table tbody td", 'a[href*="list_users.cgi?"], a[href*="list_aliases.cgi?"]', "btn btn-transparent btn-transparent-link-force btn-borderless btn-xxs vertical-align-top margined-top-2", 0, "(~)", " ~ ", "(~..)"), theme_buttonify(["/quota/", "/quota/index.cgi"], ".table tbody td.td_tag", 'a[href*="activate.cgi"][href*="&active=3"]', "btn btn-warning btn-xxs vertical-align-top margined-top-2", "fa-ban"), theme_buttonify(["/quota/", "/quota/index.cgi"], ".table tbody td.td_tag", 'a[href*="activate.cgi"][href*="&active=0"]', "btn btn-success btn-xxs vertical-align-top margined-top-2", "fa-check-circle-o"), theme_buttonify(["/virtualmin-google-analytics/", "/virtualmin-google-analytics/index.cgi"], ".table tbody td.td_tag", 'a[href*="edit.cgi"]', "btn btn-warning btn-xxs vertical-align-top margined-top-2", "fa-pencil-square"), theme_buttonify(["/apache/", "/apache/index.cgi"], ".table tbody tr td:last-child", "a.ui_link", "btn btn-transparent btn-link-bordered btn-xxs vertical-align-top margined-top-2", "fa-external-link"), ($('body[class*="status"]').length && "edit_mon.cgi" == v___location_file || v___location_path == v___location_prefix + "/virtual-server/list_sched.cgi" || v___location_path == v___location_prefix + "/ldap-server/edit_schema.cgi" || v___location_path == v___location_prefix + "/software/list_pack.cgi" || v___location_path == v___location_prefix + "/mailboxes/view_mail.cgi" || v___location_path == v___location_prefix + "/mailbox/view_mail.cgi" || v___location_path == v___location_prefix + "/mailbox/list_folders.cgi" || v___location_path == v___location_prefix + "/phpini/" || v___location_path == v___location_prefix + "/phpini/index.cgi" || v___location_path == v___location_prefix + "/fsdump/" || v___location_path == v___location_prefix + "/fsdump/index.cgi" || v___location_path == v___location_prefix + "/fdisk/" || v___location_path == v___location_prefix + "/fdisk/index.cgi" || v___location_path == v___location_prefix + "/virtualmin-awstats/" || v___location_path == v___location_prefix + "/virtualmin-awstats/index.cgi" || v___location_path == v___location_prefix + "/syslog/" || v___location_path == v___location_prefix + "/syslog/index.cgi") && ($.each($('tr td:last-child:contains("|")'), function() {
                v___location_path == v___location_prefix + "/virtual-server/list_sched.cgi" && ($(this).find('a[href^="backup_form.cgi"]').html($(this).find('a[href^="backup_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="restore_form.cgi"]').html($(this).find('a[href^="restore_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-reply" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="backuplog.cgi"]').html($(this).find('a[href^="backuplog.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-file-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), v___location_path == v___location_prefix + "/ldap-server/edit_schema.cgi" && ($(this).find('a[href^="view_sfile.cgi"]').html($(this).find('a[href^="view_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="edit_sfile.cgi"]').html($(this).find('a[href^="edit_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), v___location_path != v___location_prefix + "/phpini/" && v___location_path != v___location_prefix + "/phpini/index.cgi" || ($(this).find('a[href^="list_ini.cgi"]').html($(this).find('a[href^="list_ini.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="edit_manual.cgi"]').html($(this).find('a[href^="edit_manual.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), v___location_path != v___location_prefix + "/fdisk/" && v___location_path != v___location_prefix + "/fdisk/index.cgi" || ($(this).find('a[href^="edit_hdparm.cgi"]').html($(this).find('a[href^="edit_hdparm.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link"), $(this).find('a[href*="smart-status/index.cgi"]').html($(this).find('a[href*="smart-status/index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link"), $(this).find('a[href^="blink.cgi"]').html($(this).find('a[href^="blink.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link")), v___location_path == v___location_prefix + "/mailbox/list_folders.cgi" && ($(this).find('a[href^="index.cgi"]').html($(this).find('a[href^="index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="edit_auto.cgi"]').html($(this).find('a[href^="edit_auto.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-recycle" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="copy_form.cgi"]').html($(this).find('a[href^="copy_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-clone" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), v___location_path != v___location_prefix + "/mailboxes/view_mail.cgi" && v___location_path != v___location_prefix + "/mailbox/view_mail.cgi" || ($(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').html($(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href*="detach.cgi"][target="_blank"]').html($(this).find('a[href*="detach.cgi"][target="_blank"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-external-link" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href*="&save=1"]:not([target="_blank"])').html($(this).find('a[href*="&save=1"]:not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-download" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), v___location_path != v___location_prefix + "/virtualmin-awstats/" && v___location_path != v___location_prefix + "/virtualmin-awstats/index.cgi" || ($(this).find('a[href^="view.cgi"]').html($(this).find('a[href^="view.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="config.cgi"]').html($(this).find('a[href^="config.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'))
            }), $('body[class*="status"]').length && "edit_mon.cgi" == v___location_file ? ($('a[href*="edit_mon.cgi?id"]').addClass("ui_link_replaced btn btn-default btn-xxs").removeClass("heighter-34").removeClass("ui_link"), $('a[href*="edit_mon.cgi?id"]').last().css("margin-left", "-1px"), $('tr td:last-child:contains("|")').replaceText(/\|/gi, "")) : $('tr td:last-child:contains("|")').contents().filter(function() {
                return 3 == this.nodeType
            }).remove(), v___location_path != v___location_prefix + "/fdisk/" && v___location_path != v___location_prefix + "/fdisk/index.cgi" || $("body").find('a[href^="blink.cgi"]:not(.ui_link_replaced)').html($("body").find('a[href^="blink.cgi"]:not(.ui_link_replaced)').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link"), v___location_path != v___location_prefix + "/fsdump/" && v___location_path != v___location_prefix + "/fsdump/index.cgi" || $.each($("tr td:last-child"), function() {
                $(this).find('a[href^="backup.cgi"]').html($(this).find('a[href^="backup.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>'), $(this).find('a[href^="kill.cgi"]').html($(this).find('a[href^="kill.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-danger btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-trash-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
            }), v___location_path != v___location_prefix + "/syslog/" && v___location_path != v___location_prefix + "/syslog/index.cgi" || $.each($("tr td:last-child"), function() {
                $(this).find('a[href*="save_log.cgi"][href*="view=1"]').html($(this).find('a[href*="save_log.cgi"][href*="view=1"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
            }), v___location_path == v___location_prefix + "/software/list_pack.cgi")) {
            $('td a.ui_link[href*="view.cgi"]').html('<i class="fa fa-fw fa-eye-fi fa-1_25x"></i>').addClass("ui_link_replaced btn btn-default btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 2px !important; margin-bottom: 0 !important; margin-right: 15px").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if (v___location_path == v___location_prefix + "/fdisk/edit_disk.cgi") {
            var o = [];
            $.each($(".panel-body > table.table.table-striped tbody tr"), function(e, t) {
                ($(this).find("td:nth-child(3)").find('img[src*="images/use"]').length || $(this).find("td:nth-child(3)").find('img[src*="images/gap"]').length) && ($(this).find("td:nth-child(3)").remove(), o.push(e))
            }), $.isEmptyObject(o) || ($(".panel-body > table.table.table-striped thead").find("th:nth-child(3)").remove(), delete o)
        }
        v___location_path == v___location_prefix + "/virtual-server/edit_link.cgi" && $(".table-hardcoded").find('input[name="open"]').parent("td").parent("tr").remove(), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "init/" && $('.table.table-striped.table-condensed tr.tr_tag td.td_tag input[type="checkbox"]').each(function(e, t) {
            $(this).attr("style", "vertical-align: middle !important")
        }), v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "proc/" && v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "proc/index.cgi" || ((v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "proc/" && v___location_file && v___location_file.indexOf("index_") > -1 || v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "proc/index.cgi" || v___location_path === v___location_prefix + "/proc/") && ($("a.ui_link + b").addClass("btn").css("margin-left", "3px"), $("b + a.ui_link").addClass("btn").css("margin-left", "3px"), $('.panel-body > b:first-child:contains("Display")').length > 0 && $(".panel-body > b:first-child").remove(), $(".panel-body > b").addClass("btn btn-success")), $(".panel-body").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), $(".panel-body > a.ui_link").addClass("btn").css("margin-left", "3px")), v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "proc/edit_proc.cgi" && $("#signal").attr("style", "margin-bottom: 0 !important;"), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "procmail/" && ($(".panel-body p:first-child").next("p").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), $(".panel-body p:last-child").prev("a.ui_link").remove()), v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "cron/" && v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "cron/index.cgi" || $('.panel-body form.ui_form[action="index.cgi"]').next("script").next("b").next("p").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "filter/" && $(".panel-body > b").next("p").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "dhcpd/" && $(".panel-body > p").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "htaccess-htpasswd/" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "forward/" || $("td table.table-hardcoded.table.table-subtable").removeClass("table-striped"), $(".ui_buttons_hr > td > table.table-hardcoded > tbody > tr > td[nowrap]").each(function() {
            $(this).parents("table").attr("style", "margin-bottom: 15px !important")
        }), $("textarea.form-control.ui_textarea").next('button[type="button"].btn-default').each(function() {
            $(this).prev("textarea").attr("style", "margin-bottom: 1px !important"), $(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
        }), $("textarea.form-control.ui_textarea").next("br").next('button[type="button"].btn-default').each(function() {
            $(this).prev("textarea").attr("style", "margin-bottom: 1px !important"), $(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
        }), $(".table-hardcoded > tbody > tr > td > input.form-control.ui_textbox").next('button[type="button"].ui_button').each(function() {
            $(this).attr("style", "margin-top: 2px !important")
        }), $(".table-hardcoded > tbody > tr > td.col_label b a, .ui_table_row td a").each(function(e, t) {
            $(this).attr("href") || $(this).attr("style", "color: #333; text-decoration: none; cursor:default")
        }), $('input[name="all_weekdays"], .ui_grid_cell > table.table-condensed, table.table-hardcoded table.table-condensed, select[multiple][name="days"]').each(function() {
            $(this).parent("td").attr("style", "vertical-align: top !important; padding-left:2px; padding-right:2px;")
        }), $('input[type="submit"]').each(function() {
            $(this).addClass("btn btn-default")
        }), $("table tr th").each(function() {
            $(this).text() && $(this).attr("style", "width: auto")
        }), $("table thead th:not(.table-title)").each(function() {
            $(this).css("border-top", "none"), $(this).css("border-bottom", "none")
        }), $("body").attr("class") && $("body").attr("class").indexOf(v___module_file_manager) > -1 && (!$("body").hasClass("file-manager") && $("body").addClass("file-manager"), $("#headln2l").prepend("<a onClick='window.open(\"" + v___location_prefix + '/help.cgi/authentic-theme/file-manager", "help", "toolbar=no,menubar=no,scrollbars=yes,width=600,height=400,resizable=yes"); return false\' href="' + v___location_prefix + '/help.cgi/authentic-theme/file-manager"></a>'));
        var l = $(".panel-heading > table.header > tbody > tr > td > a");
        $.each(l, function() {
            if ($(this).attr("href") && $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href") == v___location_directory_trail_slashed || $(this).attr("href").indexOf("index.cgi") > -1 && v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "openvpn/" || $(this).attr("href").indexOf("index.cgi?") > -1 && v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "spam/" || $(this).attr("href").indexOf("restart_zone.cgi") > -1 || $(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1 || $(this).attr("href").indexOf("start.cgi") > -1 || $(this).attr("href").indexOf("stop.cgi") > -1 || "//" == $(this).attr("href") && (v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-editor_read.cgi" || v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "settings-upload.cgi") || $(this).attr("href").indexOf("delete_") > -1 || $(this).attr("href").indexOf("list_mail.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1 || $(this).attr("href").indexOf("help.cgi") > -1) {
                if ($.each($(this).next("br"), function() {
                        $(this).remove()
                    }), $.each($(this).prev("br"), function() {
                        $(this).remove()
                    }), $(this).attr("href").indexOf("help.cgi") > -1) {
                    var e = $(this),
                        t = $(this).parent("td");
                    $(this).remove(), t.append(e)
                }
                $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href") == v___location_directory_trail_slashed || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1 ? ($iconized_class = "fa-arrow-left", $(this).data("title", "").data("back", 1)) : "//" != $(this).attr("href") || v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "settings-editor_read.cgi" && v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "settings-upload.cgi" ? $(this).attr("href").indexOf("config.cgi") > -1 ? ($iconized_class = "fa-cog", $(this).data("title", "")) : $(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1 ? $iconized_class = "fa-refresh" : $(this).attr("href").indexOf("restart_zone.cgi") > -1 ? $iconized_class = "fa-retweet" : $(this).attr("href").indexOf("start.cgi") > -1 ? $iconized_class = "fa-play" : $(this).attr("href").indexOf("stop.cgi") > -1 ? $iconized_class = "fa-square" : $(this).attr("href").indexOf("man/search.cgi") > -1 ? $iconized_class = "fa-search" : $(this).attr("href").indexOf("delete_") > -1 ? $iconized_class = "fa-trash-o" : $(this).attr("href").indexOf("list_mail.cgi") > -1 ? $iconized_class = "fa-inbox" : $(this).attr("href").indexOf("index.cgi") > -1 && v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "openvpn/" ? $iconized_class = "fa-cogs" : $(this).attr("href").indexOf("index.cgi?") > -1 && v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "spam/" && ($iconized_class = "fa-arrow-left", $(this).data("back", 1)) : ($iconized_class = "fa-arrow-left", $(this).attr("href", v___location_prefix + "/webmin/edit_themes.cgi").data("title", "").data("back", 1));
                var i = $(this).attr("href").indexOf("help.cgi") > -1;
                i && ($iconized_class = "fa-question-circle", $(this).data("title", "")), $(this).data("toggle", "tooltip").data("title", Convert.strUpInitial(i ? theme_language("theme_xhred_global_help") : 1 === $(this).data("back") ? Core.curModule(v___module_file_manager) ? "" : theme_language("theme_xhred_global_return_to_module_index") : $(this).text())).attr("data-container", "body").addClass("btn btn-link text-lighter").removeClass("ui_link").append('<i class="fa ' + $iconized_class + '"></i>'), $(this).contents().filter(function() {
                    return 3 == this.nodeType
                }).remove(), $(this).tooltip({
                    container: "body",
                    placement: "auto top",
                    delay: {
                        show: 600,
                        hide: 30
                    }
                }), ((v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "apache/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "proftpd/") && ($(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1) || $(this).parent("td").find("a") && 1 == $(this).parent("td").find("a").length || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1) && (($(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1) && $("body").attr("class") && $("body").attr("class").indexOf(v___module_file_manager) > -1 ? $(this).attr("style", "margin-right: 0 !important; padding: 6px 12px") : $(this).attr("style", "margin-right: 0 !important"))
            }
            $("#headln2l").removeClass("invisible")
        }), $.each($('td.ui_grid_cell:contains("|")'), function() {
            $(this).contents().filter(function() {
                return 3 == this.nodeType
            }).remove()
        }), $('a[href*="help.cgi"][onclick], a[href*="showpass.cgi?"][onclick]').attr("onclick", "").unbind("click").addClass("help_popup"), $(".help_popup").each(function() {
            $(this).attr("style", "color: #333; text-decoration: none; cursor:help")
        })
    }
    if ($(".help_popup").on("click", function(e) {
            e.stopPropagation(), e.preventDefault();
            var t = $(this),
                i = $(this).attr("href"),
                a = $(this).parents("td");
            a.append('<div class="_tmp_help_content hidden"></div>'), $.ajax({
                type: "POST",
                url: t.attr("href").indexOf("showpass.cgi") > -1 ? v___location_directory_trail_slashed + t.attr("href") : t.attr("href"),
                data: !1,
                dataType: "text",
                success: function(e) {
                    a.find("._tmp_help_content").html(e.replace(/<(script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "")), $help_title = a.find("._tmp_help_content .ui_subheading").first().text(), $help_body = a.find("._tmp_help_content title").remove(), $help_body = a.find("._tmp_help_content h3.ui_subheading").remove(), $help_body = a.find("._tmp_help_content h3").addClass("h3_help"), $help_body = a.find("._tmp_help_content hr").remove();
                    var n = a.find("._tmp_help_content a");
                    void 0 !== n.attr("href") && $.each(n, function() {
                        var e = $(this).attr("href");
                        e.startsWith("http") ? $help_body = a.find("._tmp_help_content a").attr("target", "_blank").css("text-decoration", "none").css("font-style", "italic") : ($("body").undelegate('a[href="' + e + '"]', "click"), $("body").one("click", 'a[href="' + e + '"]', function(a) {
                            if ($(a.target).is($('a[href="' + e + '"]'))) {
                                a.preventDefault();
                                var n = Convert.pathnamePopLast(t.attr("href")) + "/" + e;
                                $('a[href="' + i + '"].help_popup').attr("data-initial", i).attr("data-substituted", n), $('a[href="' + i + '"].help_popup').attr("href", n), t.trigger("click")
                            }
                        }))
                    }), $help_body = a.find("._tmp_help_content").html(), a.find("._tmp_help_content").remove();
                    var s = '<button type="button" class="close pull-right close-popover-trigger font-size-120p">&times;</button>',
                        r = t.attr("href").indexOf("showpass.cgi") > -1;
                    r && (s = ""), t.popover({
                        html: !0,
                        container: "body",
                        template: '<div class="popover module-help' + (r ? " showpass-popover" : "") + '" role="tooltip" style="z-index: ' + (2147483642 + 10 * $(".module-help").length) + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                        title: function() {
                            return s + $help_title
                        },
                        content: function() {
                            return $help_body
                        },
                        placement: "auto right"
                    }), t.popover("show"), t.on("shown.bs.popover", function() {
                        $help_body.indexOf("<ad>") > -1 && $(".popover").animate({
                            "max-width": "540px"
                        }, 300), $("body").find(".popover:visible").addClass("module-help"), $('body[class*="' + v___module_file_manager + '"]').find(".popover:visible").addClass("file-manager-help"), setTimeout(function() {
                            $.each($(".module-help"), function() {
                                $(this).is(t.next(".module-help")) ? ($(this).animate({
                                    opacity: 1
                                }, 600), popover_visibility_position($(this))) : $(".module-help").length > 1 ? $(this).css("opacity", .85) : $(this).css("opacity", 1)
                            })
                        }, 100)
                    }), t.on("hidden.bs.popover", function() {
                        $("body").undelegate(":not(tt)", "click"), t.attr("data-initial") && (t.attr("href", t.attr("data-initial")), t.removeAttr("data-initial").removeAttr("data-substituted"))
                    })
                }
            })
        }), !e) {
        if (v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "fdisk/" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "postfix/" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "pam/" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "syslog/" || $("p > a[href], table + a[href], div.panel-body > a.ui_link").each(function(e, t) {
                $(this).text($(this).text().replace(/\.$/, ""))
            }), $('.panel-body > form > p > a.ui_link, .panel-body > table.table + a.ui_link, .panel-body > p > a:not([href*="config.cgi?bacula-backup"]), body[data-current-product="usermin"] div.panel-body > p > a, div.panel-body > a[href^="edit_"]:not([href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_form > a, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a.ui_link:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_grid_cell > a.select_all, .ui_grid_cell > a.select_invert, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a[href*=".cgi"]:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_grid_cell > a[href*=".cgi"]:first-child:not([href^="edit_rpc.cgi"],[href^="edit_nuser.cgi"],[href*="edit_user.cgi?idx"]), .tab-pane > p > a, .tab-pane > a.ui_link, .tab-pane > .table-condensed > a.ui_link, .tab-pane > a, .panel-body > p > a.ui_link, a.select_all, a.select_invert, form[action="delete.cgi"] > table table.ui_grid_table + a').each(function() {
                if (!(Core.curModuleFile("samba", "edit_epass.cgi") || Core.curModule("acl") && ($(this).is('[href^="edit_user.cgi?user="]') || $(this).parent("td.ui_grid_cell").length) && !$(this).parents("b").length) && !Core.curModuleFile("virtual-server", "history.cgi") && !Core.curModuleFile("server-manager", "one_history.cgi") && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "passwd/" && $(this).text() && v___location_path != v___location_prefix + "/mailboxes/" && v___location_path != v___location_prefix + "/mailboxes/index.cgi" && v___location_path != v___location_prefix + "/usermin/list_configs.cgi" && !$(this).hasClass("help_popup")) {
                    $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced"), $(this).text($(this).text().replace(/\.$/, ""));
                    var e = $(this).parent().contents().filter(function() {
                        return 3 == this.nodeType
                    });
                    e && $.each(e, function() {
                        $(this).text() && $(this).text().length <= 3 && $(this).remove()
                    }), $(this).hasClass("select_all") && $(this).html('<i class="fa fa-fw fa-check-square-o"> </i> ' + $(this).text()), $(this).hasClass("select_invert") && $(this).html('<i class="fa fa-fw fa-share-square-o"> </i> ' + $(this).text()), $(this).attr("href") && (0 === $(this).attr("href").indexOf("edit") && 0 !== $(this).attr("href").indexOf("edit_allow") || 0 === $(this).attr("href").indexOf("master_form") || 0 === $(this).attr("href").indexOf("slave_form") || 0 === $(this).attr("href").indexOf("stub_form") || 0 === $(this).attr("href").indexOf("forward_form") || 0 === $(this).attr("href").indexOf("delegation_form") || 0 === $(this).attr("href").indexOf("mass_form") || 0 === $(this).attr("href").indexOf("newdb_form")) ? $(this).html('<i class="fa fa-fw fa-plus-square-o"> </i> ' + $(this).text()) : $(this).attr("href") && 0 === $(this).attr("href").indexOf("edit_allow") ? $(this).html('<i class="fa fa-fw fa-shield"> </i> ' + $(this).text()) : $(this).attr("href") && 0 === $(this).attr("href").indexOf("mass_ucreate") && $(this).html('<i class="fa fa-fw fa-user"> </i> ' + $(this).text()), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "custom/" && ($(this).attr("href") && 0 === $(this).attr("href").indexOf("edit_cmd.cgi?new") && $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text()), $(this).attr("href") && 0 === $(this).attr("href").indexOf("edit_file.cgi?new") && $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text()), $(this).attr("href") && 0 === $(this).attr("href").indexOf("edit_sql.cgi?new") && $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text())), $(this).attr("href") || $(this).remove()
                }
            }), $.each($(".btn-tiny.ui_link_replaced"), function() {
                $(this).prev('[class="table table-striped table-condensed"]').length && $(this).next(':not(".ui_link_replaced")').length && $(this).removeClass("btn-tiny ui_link_replaced").addClass("ui_link_re-replaced")
            }), $("a.ui_link_replaced").each(function() {
                $(this).prev().is("b") && $(this).prev("b").addClass("btn btn-success btn-tiny"), $(this).next().is("b") && $(this).next("b").addClass("btn btn-success btn-tiny")
            }), $("a.ui_link_replaced").each(function() {
                return !$(this).next().is("a.ui_link_replaced") || $(this).hasClass("select_all") || $(this).hasClass("select_invert") ? !$(this).prev().is("a.ui_link_replaced") || $(this).hasClass("select_all") || $(this).hasClass("select_invert") ? void 0 : ($(this).prev("a.ui_link_replaced").not(".btn-xxs"), !1) : ($(this).next("a.ui_link_replaced").not(".btn-xxs"), !1)
            }), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "fetchmail/" && $("a.ui_link").each(function() {
                $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").css("margin-bottom", "10px").css("margin-top", "4px"), $(this).text($(this).text().replace(/\.$/, "")), $(this).parent().contents().filter(function() {
                    return 3 == this.nodeType
                }).remove()
            }), $('select.ui_select[name="days"]').each(function() {
                $(this).parent("td").attr("style", "vertical-align: top !important")
            }), v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "mailboxes/" && v___location_path != v___location_prefix + "/mailboxes/index.cgi" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "mailbox/" && v___location_path != v___location_prefix + "/postfix/view_mailq.cgi" || (v___location_file ? "list_mail.cgi" == v___location_file && $('.container-fluid input:not([type="checkbox"]), .container-fluid .ui_form_end_submit, .container-fluid select').addClass("heighter-34").removeClass("heighter-28").css("margin-bottom", "-1px") : ($(".ui_form_end_submit").css("margin-top", "0"), $("input#user").addClass("heighter-34 vertical-align-top")), $("body").find("form").removeAttr("onsubmit"), $header_tables = $("body").find('input[name="from"]').parents(".tab-pane").parent("td"), $header_tables.children("table").hide(), $.each($header_tables.find("input, textarea, select"), function() {
                $(this).hasClass("ui_select") || $(this).attr("onclick") || "checkbox" == $(this).attr("type") || "submit" == $(this).attr("type") || $(this).attr("style", "width: 60%").addClass("inline-block"), $(this).attr("onclick") && $(this).addClass("inline-block")
            }), onbeforeunload = null, 1 == $("body").find('input.ui_hidden[name="html_edit"]').val() && editor_html_init(["body", 2, !1, "edit_web"]), $("body").find('input[name="from"]').parents(".tab-pane").prev("table").remove(), $("body").find('input[name="from"]').parents(".tab-pane ").parent("td").find("div, table").each(function(e, t) {
                $(this).find(".col_label").css("width", "20%"), $(this).find('input[name="subject"]').parent("td").prev("td").find("b").attr("style", "font-size: 13px !important"), $(this).find('input[name="subject"]').parents("table").show(), $(this).find('input[name="subject"]').parent("td").find(".submitter").remove()
            }), $editor_mode_link_container = $("body").find('textarea[id="body"]').parents("table").find("thead > tr > th:last-child"), $editor_mode_link = $editor_mode_link_container.find("a").addClass("editor_mode_link"), $editor_mode_link_container.parent("tr").find("th:first-child").append($editor_mode_link), $editor_mode_link_container.remove(), $editor_mode_link_button = $("body").find('textarea[id="body"]').parents("table").find(".editor_mode_link"), $editor_mode_link_button_state = !!$editor_mode_link_button.attr("href") && $editor_mode_link_button.attr("href").indexOf("html=0"), $editor_mode_link_button.attr("title", $editor_mode_link_button.text()).addClass("editor_mode_link_button pull-right btn btn-sm " + (-1 == $editor_mode_link_button_state ? "btn-success" : "btn-primary")).html('<i class="fa ' + (-1 == $editor_mode_link_button_state ? "fa-font" : "fa-text-width") + '"> </i>'), $("body").find('textarea[id="body"]').parents("table").find("thead > tr > th").find("b").css("padding-left", "45px"), $(".editor_mode_link_button").tooltip(), $fileinput_container = $("body").find('a[onclick="return add_ss_attachment()"]'), $fileinput_container.parent("td").contents().filter(function() {
                return 3 == this.nodeType
            }).remove(), $fileinput_container.remove(), $fileinput_add_another_attachment = $("body").find('a[onclick="return add_attachment()"]'), $fileinput_add_another_attachment.addClass("btn btn-default"), $fileinput_add_another_attachment.text($fileinput_add_another_attachment.text().replace(/\.$/, "")), (v___location_path.indexOf("view_mail.cgi") > -1 || v___location_path.indexOf("view_mailq.cgi") > -1) && ($table_title_header_container = $(".ui_form").find("div.table-responsive").first().find(".table-title"), $table_title_links_container = $table_title_header_container.next(), $table_title_links_container.contents().filter(function() {
                return 3 == this.nodeType
            }).remove(), $table_title_links_container.find("a").addClass("table_title_links pull-right btn btn-info btn-tiny"), $table_title_links = $table_title_links_container.html(), $table_title_header_container.append($table_title_links), $table_title_links_container.remove(), $table_title_header_container_text_padding = 35, $(".table-title > a.table_title_links").each(function() {
                $table_title_header_container_text_padding = v___location_path == v___location_prefix + "/postfix/view_mailq.cgi" ? 120 : 235
            }), $(".table_title_links_container a").each(function() {
                $table_title_header_container_text_padding += $(this).width()
            }), $table_title_header_container.find("b").css("padding-left", $table_title_header_container_text_padding), $table_title_second_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("table:first-child"), $table_title_header_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th:first-child"), $table_title_links_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th:last-child"), 2 == $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th").length && $table_title_links_container.remove(), $table_title_links_container.find("a").addClass("table_title_links pull-right btn btn-tiny"), $table_title_links_container.find("a").attr("href") && $table_title_links_container.find("a").attr("href").indexOf("body=1") > -1 ? $table_title_links_container.find("a").addClass("btn-info") : $table_title_links_container.find("a").addClass("btn-warning"), $table_title_links = $table_title_links_container.html(), $table_title_header_container.append($table_title_links), $table_title_header_container_text_padding = 10, $table_title_header_container.find("a").each(function() {
                $table_title_header_container_text_padding += $(this).width()
            }), setTimeout(function() {
                if ($(".ui_form").find("div.table-responsive").first().find("table:first-child").outerWidth() != $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("table:first-child").outerWidth()) {
                    var e = parseInt($(".ui_form").find("div.table-responsive").first().find("table:first-child").width() / 2);
                    $table_title_second_container.find(".table-title").addClass("left").find("b").css("padding-left", e - 175), $table_title_second_container.find(".pull-right").removeClass("pull-right").addClass("pull-left")
                }
                $.each($table_title_second_container.find("table"), function() {
                    $(this).removeClass().addClass("clear-formatting"), $.each($(this).find("td.col_value"), function() {
                        $(this).css("background-color", "white")
                    })
                })
            }, 30), $table_title_header_container.find("b").css("padding-left", $table_title_header_container_text_padding), $table_title_header_container.find("b") && $table_title_header_container.find("b").length > 1 && $table_title_header_container.find("b:first-child").text() == $table_title_header_container.find("b:last-child").text() && $table_title_header_container.find("b:last-child").remove()), $("td > a").on("click", function() {
                $(this).attr("onclick"), $("input[type=file]").each(function() {
                    $(this).parent("a").hasClass("file-input-wrapper") || $(this).bootstrapFileInput()
                })
            }), settings_mailbox_slash_delimiter && $("select.ui_select[name] > option").each(function(e, t) {
                $(t).text($(t).text().replace(/\./g, "/").replace(/\/\//g, "/"))
            }), $.each($('table td[align="right"], table td[align="left"]'), function(e, t) {
                $(this).attr("style", "border: 0 !important;"), $(this).parents("tbody").attr("style", "border: 0 !important;"), $(this).parents("table.table-hardcoded.table.table-striped.table-condensed.table-subtable").removeClass("table-hardcoded table table-striped table-condensed table-subtable")
            }), $.each($("div.table-responsive > table tbody tr td > table.table-hardcoded"), function(e, t) {
                $(this).find("tr > td.col_label > b").removeAttr("style"), $(this).removeClass("table table-condensed")
            }), $.each($("div.table-responsive > table tbody tr td > div.tab-pane"), function(e, t) {
                $(this).find("table").removeClass("table"), $(this).parents("div.table-responsive").find("table").removeClass("table-striped table-subtable")
            }), $.each($('div.table-responsive > table tbody tr td > div.tab-pane .col_value > input[type="button"][onclick^="ifield"]'), function(e, t) {
                $(this).attr("style", "margin-left: 0; margin-bottom: 3px !important")
            })), $.each($(".barchart"), function() {
                $(this).find("img").attr("height", 4)
            }), $('#extended_sysinfo-1 div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px"), $('#extended_sysinfo-1 div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px").prev("table.table-condensed").prev("table.table.table-striped").addClass("invisible"), $("a").each(function() {
                $(this).attr("href") || $(this).addClass("no_effect")
            }), v___location_path != v___location_prefix + "/virtual-server/domain_form.cgi" && v___location_path != v___location_prefix + "/server-manager/list_images.cgi" && v___location_path != v___location_prefix + "/virtual-server/bwgraph.cgi" || ($(".panel-body > a").each(function() {
                $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link"), $(this).text($(this).text().replace(/\.$/, ""))
            }), $.each($('.panel-body:contains("|")'), function() {
                $(this).contents().filter(function() {
                    return 3 == this.nodeType
                }).wrap('<span class="btn btn-info btn-tiny btn-automated"></span>')
            }), $.each($(".btn-automated"), function() {
                $(this).text().replace(/[\t\n]+/g, " ").length < 4 ? $(this).remove() : ($(this).text($(this).text().replace("|", "").replace("|", "").replace(/(?:\r\n|\r|\n)/g, "")), $(this).prev().is("img") && $(this).removeClass().addClass("margined-left-3"))
            }), $(".panel-body > b").css("margin-right", "7px"), v___location_path == v___location_prefix + "/virtual-server/domain_form.cgi" && $.each($(".btn-automated, .ui_link_replaced"), function(e, t) {
                0 == e && $(this).html('<i class="fa fa-fw fa-plus-square"> </i> ' + $(this).text()), 1 == e && $(this).html('<i class="fa fa-fw fa-level-down"> </i> ' + $(this).text()), 2 == e && $(this).html('<i class="fa fa-fw fa-reply fa-flip-horizontal"> </i> ' + $(this).text()), 3 == e && $(this).html('<i class="fa fa-fw fa-reply-all fa-flip-horizontal"> </i> ' + $(this).text())
            })), v___location_path == v___location_prefix + "/server-manager/edit_serv.cgi" && setTimeout(function() {
                $('.opener_container .table-hardcoded .col_value a[href^="edit_serv.cgi"]').each(function() {
                    $(this).addClass("btn btn-inverse btn-xxs ui_link_replaced margined-right--2").removeClass("ui_link").attr("style", "margin-top: 0 !important"), $(this).text($(this).text().replace(/\.$/, ""))
                }), $.each($('.opener_container .table-hardcoded .col_value:contains("|")'), function() {
                    $(this).find('a[href^="edit_serv.cgi"]').length && $(this).contents().filter(function() {
                        return 3 == this.nodeType
                    }).wrap('<a class="btn btn-success btn-xxs ui_link_replaced btn-automated margined-right--2" style="margin-top: 0 !important"></a>'), $.each($(".btn-automated"), function() {
                        $(this).text().length < 4 ? $(this).remove() : $(this).text($(this).text().replace("|", "").replace("|", "").replace(/(?:\r\n|\r|\n)/g, ""))
                    })
                })
            }, 20), $.each($("input:not(.ui_upload)"), function() {
                "28px" == $(this).css("height") && $(this).prev("input").addClass("heighter-28")
            }), $.each($(".container-fluid select"), function() {
                "34px" == $(this).next("input").css("height") && $(this).addClass("heighter-34")
            }), $.each($(".container-fluid .ui_buttons_row input, .container-fluid .ui_buttons_row select"), function() {
                $(this).addClass("heighter-34")
            }), Core.curModuleFile("gnupg", "list_keys.cgi") && $('.container-fluid input[id="id"]').addClass("heighter-34"), Core.curModuleFile("virtual-server", "edit_script.cgi")) {
            var c = $('input[name="version"]');
            c.length && c.attr("style", c.attr("style").replace("n: middle", "n: bottom !important")).addClass("heighter-34")
        }
        if ($.each($("tr > .ui_form"), function() {
                $(this).next().next("td").find("input.submitter") && $(this).next().next("td").find("input.submitter").addClass("heighter-34")
            }), $.each($("input.heighter-34").next(".file_chooser_button"), function() {
                $(this).addClass("heighter-34"), $(this).find(".fa.fa-files-o").css("margin-top", "0").addClass("vertical-align-middle")
            }), setTimeout(function() {
                $.each($(".container-fluid select"), function() {
                    34 == $(this).next("input").outerHeight() || 34 == $(this).prev("input").outerHeight() ? $(this).addClass("heighter-34").removeClass("heighter-28") : 28 != $(this).next("input").outerHeight() && 28 != $(this).prev("input").outerHeight() || $(this).addClass("heighter-28").removeClass("heighter-34")
                })
            }, 1), Core.curModule("term")) {
            var d = $("iframe");
            if (d.length) {
                var h = d;
                h.on("load", function() {
                    h.contents().find("#term").css("width", "99.3%").css("height", "576px").css("margin-top", "4px")
                }), $(this).next("br").remove().next('input[type="button"]').remove(), $(this).next('input[type="button"]').remove(), $(this).next("p").remove()
            }
        }
        $.each($(".file_chooser_button"), function() {
            $(this).prev("input").attr("style") && $(this).prev("input").attr("style").indexOf("max-width: 100%") > -1 && $(this).prev("input").css("max-width", "93%")
        }), v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "sysinfo.cgi" && 1 == settings_sysinfo_link_mini && $(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove(), $.each($('input[value="..."], input[value=" ..."], input[value="  ..."], input[value="... "], input[value="...  "], input[value=" ... "], input[value="  ...  "]'), function() {
            $(this).after('<i class="fa fa-fw fa-files-o file_chooser_button_attached vertical-align-middle" style="font-size:11px; pointer-events: none"></i>'), $(this).attr("value", "")
        }), $.each($(".file_chooser_button"), function() {
            $(this).prev("input").css("margin-top", "2px").css("margin-bottom", "2px")
        }), $.each($(".file_chooser_button_attached"), function() {
            $(this).prev('input[type="button"]').prev("input").css("margin-top", "2px").css("margin-bottom", "2px"), $(this).parents(".ui_buttons_label").length || $(this).parents(".table-subtable").length || $(this).css("margin-top", "11px")
        }), $.each($(".container-fluid .ui_form > .file_chooser_button_attached"), function() {
            ($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length || $(this).next(".heighter-34") && $(this).next(".heighter-34").length) && ($(this).css("margin-top", "16px"), $(this).prev("input[onclick]").css("width", "40px"))
        }), $.each($('.container-fluid .ui_form[action="init_cache.cgi"] > .file_chooser_button_attached'), function() {
            ($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length || $(this).next(".heighter-34") && $(this).next(".heighter-34").length) && $(this).css("margin-top", "14px")
        }), $.each($(".col_value > .file_chooser_button_attached"), function() {
            $(this).prev("input[onclick]").css("width", "40px").css("margin-left", "0")
        }), $("a.ui_link, .btn").each(function() {
            "." != $(this).text().substr(-1) || $(this).parent().is("label") || $(this).text($(this).text().substr(0, $(this).text().length - 1))
        }), v___location_path != v___location_prefix + "/virtualmin-mailman/" && v___location_path != v___location_prefix + "/virtualmin-mailman/index.cgi" || $("input[name^=reset_]").addClass("heighter-28"), v___location_path != v___location_prefix + "/software/edit_pack.cgi" && v___location_path != v___location_prefix + "/apache/show.cgi" && v___location_path != v___location_prefix + "/proc/index_search.cgi" || $.each($(".container-fluid .btn:not(.file_chooser_button)"), function() {
            $(this).removeClass("heighter-28").addClass("heighter-34")
        }), v___location_path != v___location_prefix + "/virtualmin-git/" && v___location_path != v___location_prefix + "/virtualmin-git/index.cgi" || $.each($(".btn.btn-default.submitter.ui_submit"), function() {
            $(this).removeClass("heighter-28").addClass("heighter-28")
        }), v___location_path != v___location_prefix + "/apache/edit_global.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_newlinks.cgi" && v___location_path != v___location_prefix + "/virtualmin-awstats/" && v___location_path != v___location_prefix + "/postfix/master.cgi" || $.each($(".container-fluid .ui_link_replaced"), function() {
            $(this).not(".btn-xxs").removeClass("btn-tiny").addClass("heighter-34")
        }), v___location_path != v___location_prefix + "/virtualmin-init/" && v___location_path != v___location_prefix + "/virtualmin-dav/list_shares.cgi" && v___location_path != v___location_prefix + "/squid/edit_acl.cgi" && v___location_path != v___location_prefix + "/virtualmin-nginx/" && v___location_path != v___location_prefix + "/fdisk/edit_disk.cgi" && v___location_path != v___location_prefix + "/server-manager/edit_newlinks.cgi" && v___location_directory_unslashed_trail_slashed != v___location_prefix_unslashed_trail_slashed + "backup-config/" || $.each($(".container-fluid .ui_link_re-replaced"), function() {
            $(this).addClass("btn-tiny").removeClass("heighter-34")
        }), v___location_path == v___location_prefix + "/pam/" && $(".panel-body > a.ui_link").addClass("btn-tiny"), v___location_path != v___location_prefix + "/syslog/" && v___location_path != v___location_prefix + "/syslog/index.cgi" || $.each($(".btn"), function() {
            $(this).removeClass("btn-tiny")
        }), v___location_path != v___location_prefix + "/software/" && v___location_path != v___location_prefix + "/software/index.cgi" || ($(".container-fluid input#search").addClass("heighter-34 vertical-align-top"), $('form[action="file_info.cgi"] > .ui_form_end_submit').addClass("heighter-28 heighter-28-force margined-top-0")), v___location_path == v___location_prefix + "/software/tree.cgi" && $(".ui_link").addClass("margined-top-10"), v___location_path == v___location_prefix + "/syslog/save_log.cgi" && ($.each($(".container-fluid .heighter-34"), function() {
            $(this).removeClass("heighter-34").addClass("heighter-28")
        }), $("form:first").next("script").next("br").remove(), $("form:last").css("margin-top", "5px")), v___location_path == v___location_prefix + "/status/edit_mon.cgi" && ($('td.col_value > table[cellspacing="1"] tbody').attr("style", "border: 0 !important;"), $(".opener_trigger:last-child").css("font-size", "16px"), $.each($("table.sub_table_container td > font"), function() {
            $(this).parents("tbody"), $(this).contents().unwrap().wrap('<i class="fa fa-info-circle"><span class="font-family-default vertical-align-baseline margined-left-3">&nbsp;</span></i>')
        })), v___location_path != v___location_prefix + "/shell/" && v___location_path != v___location_prefix + "/shell/index.cgi" && v___location_path != v___location_prefix + "/server-manager/shell.cgi" || ($.each($(".container-fluid .btn:not(.btn-link), .container-fluid select, .container-fluid input"), function() {
            $(this).removeClass("heighter-28").addClass("heighter-34"), $(this).is('input[type="button"]') && $($(this).addClass("submitter")), $(".form-control.sidebar-search").val() && $(".form-control.sidebar-search").val().trim().startsWith("!") && $(".form-control.sidebar-search").val(""), $(".ui_form").find("input.btn.btn-default:first").addClass("btn-success")
        }), $(".container-fluid input#cmd").focus()), $.each($("input"), function() {
            "28px" == $(this).css("height") && "28px" != $(this).next("input").css("height") && $(this).is(':not([type="hidden"])') && $(this).next("input").addClass("heighter-28")
        }), $.each($(".container-fluid select"), function() {
            "34px" == $(this).css("height") && "34px" != $(this).next("select").css("height") && $(this).next("select").addClass("heighter-34")
        }), v___location_path == v___location_prefix + "/cluster-passwd/edit_passwd.cgi" && $.each($("input + button"), function(e, t) {
            "28px" == $(this).css("height") && $(this).addClass("heighter-28").css("line-height", "12px").css("margin-top", "2px")
        }), v___location.pathname != v___location_prefix + "/virtual-server/pro/history.cgi" && v___location.pathname != v___location_prefix + "/server-manager/bwgraph.cgi" && v___location.pathname != v___location_prefix + "/server-manager/history.cgi" && v___location.pathname != v___location_prefix + "/server-manager/one_history.cgi" || ($("body").find("table.ui_form_end_buttons .btn.btn-default.submitter.ui_submit").addClass("btn-success"), $(".panel-body > table tr td b").each(function(e, t) {
            $(this).addClass("btn btn-success btn-tiny ui_link_replaced")
        }), $(".panel-body > table a").each(function(e, t) {
            $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link"), $(this).text($(this).text().replace(/\.$/, "")), $(this).text() && $(this).text().indexOf("<<") > -1 && ($(this).text($(this).text().replace(/\<\</, "")), $(this).html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-angle-double-left"> </i> ' + $(this).text())), $(this).text() && $(this).text().indexOf(">>") > -1 && ($(this).text($(this).text().replace(/\>\>/, "")), $(this).html($(this).text() + ' <i style="vertical-align: baseline !important;" class="fa fa-fw fa-angle-double-right"> </i>')), $(this).parent().contents().filter(function() {
                return 3 == this.nodeType
            }).remove(), 0 === $(this).attr("href").indexOf("edit_cmd.cgi?new") && $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text()), 0 === $(this).attr("href").indexOf("edit_file.cgi?new") && $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text()), 0 === $(this).attr("href").indexOf("edit_sql.cgi?new") && $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text()), $(this).parents("table").css("margin-bottom", "3px")
        }), $("#history").next("table.ui_grid_table").next("a").length ? ($("#history").next("table").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank"), $("#history").next("table").next("a").text($("#history").next("table").next("a").text().replace(/\.\.$/, "")), $("#history").next("table").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-external-link"></i>&nbsp;' + $("#history").next("table").next("a").text())) : ($("#history").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank"), $("#history").next("a").text($("#history").next("a").text().replace(/\.\.$/, "")), $("#history").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-external-link"></i>&nbsp;' + $("#history").next("a").text())), $(".panel-body > hr + b").attr("style", "font-size: 16px; font-weight: normal;"), $(".panel-body > hr + b").text($(".panel-body > hr + b").text().replace(/\:$/, "")), onLoad()), $.each($('tr > td[valign="top"][width="50%"]'), function() {
            $(this).attr("style", "vertical-align: top !important; " + $(this).attr("style"))
        }), $("body table").each(function(e, t) {
            $(this);
            $(t).hasClass("table") || $(t).hasClass("header") || $(t).hasClass("ui_form_end_buttons") || $(t).hasClass("ui_table") || ($(t).addClass("table-hardcoded"), $t_uri_usermin && ($(t).addClass("table-subtable"), $(t).find("tr.thead").length || $(t).hasClass("sub_table_container table-hardcoded table-subtable") ? ($(t).find("tr.thead").attr("style", "border: 1px solid #efefef"), $(t).attr("style", "border: 1px solid #efefef")) : $(t).attr("style") && v___location_path.indexOf("view_mail.cgi") > -1 || $(t).attr("style", "margin-top: 10px;")))
        }), v___location_path != v___location_prefix + "/bind8/" && v___location_path != v___location_prefix + "/postfix/virtual.cgi" || table_data_init($(".table.table-striped.table-hover.table-condensed")), v___location_path == v___location_prefix + "/virtual-server/list_scripts.cgi" && table_data_init($("#att_existing > form > table.table.table-striped.table-condensed")), v___location_path == v___location_prefix + "/virtual-server/edit_newscripts.cgi" && table_data_init($("#att_summary > table.table.table-striped.table-condensed")), v___location_path != v___location_prefix + "/server-manager/index.cgi" && v___location_path != v___location_prefix + "/virtualmin-htpasswd/index.cgi" || table_data_init($("body > div > div > div.panel-body > form > table.table.table-striped.table-condensed")), ($('body[class*="status"]').length && !$('body[class*="smart-status"]').length && !v___location_file || v___location_path == v___location_prefix + "/servers/" || v___location_path == v___location_prefix + "/servers/index.cgi" || v___location_path == v___location_prefix + "/webminlog/search.cgi") && table_data_init($("table.table-striped.table-condensed")), $('body[class*="ldap-useradmin"]').length && table_data_init($("form > table.table.table-striped.table-condensed")), v___location_path == v___location_prefix + "/virtual-server/list_sched.cgi" && table_data_init($(".table.table-striped.table-hover.table-condensed"), !1, !1, {
            orderable: !1,
            targets: [0, -1]
        }), v___location_path != v___location_prefix + "/servers/" && v___location_path != v___location_prefix + "/servers/index.cgi" || ($(".ui_checked_columns td table tr td").find('a.ui_link[href*="edit_serv.cgi"]').addClass("margined-left-4 label label-sm label-primary hidden").html('<i class="fa fa-fw fa-pencil-square-o"></i>'), $(".ui_checked_columns").hover(function() {
            $(this).find("td table tr a.ui_link.label.hidden").removeClass("hidden")
        }, function() {
            $(this).find("td table tr a.ui_link.label").addClass("hidden")
        })), $.each($('table.table.table-striped.table-condensed.dataTable.no-footer > thead > tr[role="row"]:first-child'), function(e, t) {
            $(this).attr("style", "border-top: 4px solid #f2f2f2 !important")
        }), $.each($('button[onclick^="ifield"].btn.btn-default.ui_button'), function() {
            $(this).addClass("file_chooser_button_emulate")
        }), $.each($(".file_chooser_button_emulate"), function() {
            $(this).find(".fa-files-o").length || $(this).append('<i class="fa fa-fw fa-files-o vertical-align-middle" style="font-size:11px; pointer-events: none"></i>'), "28px" == $(this).prev("input").css("height") && $(this).addClass("heighter-28")
        }), $.each($("label > img"), function(e, t) {
            $(this).attr("style", "vertical-align: baseline !important")
        }), $.each($('select[multiple][name="weekdays"]'), function() {
            $(this).parents('td[valign="top"], td.td_tag').attr("style", "vertical-align: top !important"), $(this).parents('table[width="100%"]').parents(".ui_radio_table.table-hardcoded").css("width", "100%")
        }), $.each($("label").find("br"), function() {
            $(this).parent("label").prev(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;"), $(this).parent("label").next(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;")
        }), $.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function() {
            $(this).find(".heighter-34").length && $.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function() {
                $(this).find(".btn").addClass("heighter-34")
            })
        }), v___location_path == v___location_prefix + "/cpan/edit_mod.cgi" && $('.container-fluid form[action="download.cgi"]').next().next().next().find(".submitter.ui_submit").addClass("heighter-34"), v___location_path != v___location_prefix + "/cpan/" && v___location_path != v___location_prefix + "/cpan/index.cgi" || $('input[name="cpan"]').next("button").append('<i class="fa fa-fw fa-files-o vertical-align-middle" style="font-size:11px; margin-top: -6px; pointer-events: none"></i>').attr("style", "width: 40px; height: 28px; vertical-align:middle !important; margin-top:2px; margin-bottom:2px;"), $("form").find(".icons-row:not(.inline-row)").length && ($("form").find(".icons-row").addClass("_processed_"), $("form").find(".icons-row").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef"), $("form").find(".icons-row").find(".icons-container").addClass("icons-container-stretched"));

        function p() {
            $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
                "padding-top": "8px",
                "padding-bottom": "8px"
            }), $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef")
        }

        function f() {
            $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
                "padding-top": "8px"
            }), $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef")
        }

        function g() {
            $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
                "padding-bottom": "6px"
            }), $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-bottom", "1px solid #efefef")
        }
        v___location_path != v___location_prefix + "/lvm/" && v___location_path != v___location_prefix + "/virtualmin-support/" && v___location_path != v___location_prefix + "/proftpd/virt_index.cgi" && v___location_path != v___location_prefix + "/dhcpd/" && v___location_path != v___location_prefix + "/dhcpd/index.cgi" && v___location_path != v___location_prefix + "/cluster-usermin/" && v___location_path != v___location_prefix + "/cluster-usermin/index.cgi" && v___location_path != v___location_prefix + "/cluster-useradmin/" && v___location_path != v___location_prefix + "/cluster-useradmin/index.cgi" && v___location_path != v___location_prefix + "/cluster-webmin/" && v___location_path != v___location_prefix + "/cluster-webmin/index.cgi" || p(), v___location_path != v___location_prefix + "/proftpd/" && v___location_path != v___location_prefix + "/proftpd/index.cgi" && v___location_path != v___location_prefix + "/bacula-backup/" && v___location_path != v___location_prefix + "/bacula-backup/index.cgi" || f(), v___location_path == v___location_prefix + "//" && g();
        if ($.each($(".row.icons-row.inline-row"), function(e, t) {
                $(this).find("a.icon_link").contents().filter(function() {
                    return 3 == this.nodeType
                }).remove()
            }), $.each($(".row.icons-row:not(.inline-row) .icons-container"), function(e, t) {
                $(this).removeAttr("data-title").removeAttr("data-toggle").removeAttr("data-placement").removeAttr("data-container")
            }), ($("body").find(".icons-row > div.icons-container").length || $("body").find(".icons-row > div.small-icons-container").length) && ($.each($(".icons-row .hidden-forged-6"), function() {
                $(this).find("input").is(":checked") && $(this).parents('div[class*="icons-container"]').addClass("highlighted")
            }), $.each($(".hidden-forged-7 > a"), function() {
                $(this).removeClass(), $(this).parents(".hidden-forged-7").hasClass("hidden-forged-7-small") ? ($(this).html('<i class="fa fa-edit text-semi-dark text-dark-hoverd"> </i>'), $(this).parent().parent().prepend('<i class="fa fa-fw fa-select text-dark text-dark-hoverd gl-icon-select" style="top:1px; left:-1px"></i>')) : ($(this).html('<i class="fa fa-edit text-semi-dark text-dark-hoverd"> </i>'), $(this).parent().parent().prepend('<i class="fa fa-fw fa-lg fa-select text-dark text-dark-hoverd gl-icon-select"></i>'))
            })), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "virtualmin-registrar/" && $.each($("td > input "), function() {
                $(this).parents("table.table-hardcoded").find('form[action="edit.cgi"]').length && ($(this).css("margin-left", "5px"), $(this).parent("td").prev("td").find("select").css("margin-left", "5px"))
            }), v___location_path == v___location_prefix + "/cluster-webmin/edit_host.cgi" && $.each($(".panel-body > .table-hardcoded"), function() {
                $(this).attr("style", "margin-top: 10px !important")
            }), v___location_path != v___location_prefix + "/virtual-server/list_scripts.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_newscripts.cgi" || $('form[action="disable_scripts.cgi"] thead + thead tr th, form[action="disable_scripts.cgi"] tbody + thead tr th, form[action="script_form.cgi"] thead + thead tr th, form[action="script_form.cgi"] tbody + thead tr th').attr("colspan", "5"), $.each($(".file_chooser_button_attached"), function(e, t) {
                $(this).prev('input[onclick*=".cgi"]') && $(this).prev('input[onclick*=".cgi"]').css("width", "40px")
            }), !$t_uri_cloudmin || v___location_path != v___location_prefix + "/server-manager/add_form.cgi" && v___location_path != v___location_prefix + "/server-manager/scan_form.cgi" || $.each($("label"), function() {
                $(this).find("br").remove()
            }), (v___location_path == v___location_prefix + "/mysql/view_table.cgi" || v___location_path == v___location_prefix + "/postgresql/view_table.cgi") && $("td.td_tag > table.table-hardcoded")) {
            var u = $("td.td_tag > table.table-hardcoded").parents("table").find("thead").find("tr").find("th").length;
            $("td.td_tag > table.table-hardcoded").parent("td.td_tag").attr("colspan", u).attr("style", "padding: 1px !important;")
        }
        if (v___location_path == v___location_prefix + "/virtual-server/backup_form.cgi" && v___location_href && v___location_href.indexOf("?sched=") > -1 && ($("body > div > div > div.panel-body > form > table:nth-child(4) > tbody > tr:nth-child(2) > td").css("display", "table-cell"), setTimeout(function() {
                $("a[href=\"javascript:hidden_opener('hiddendiv_adddest', 'hiddenopener_adddest')\"]").next().attr("style", "").addClass("btn btn-tiny btn-default")
            }, 10)), "/config.cgi" === v___location_path && $("thead tr th.table-title").prepend('<i class="fa fa-fw fa-cogs vertical-align-text-bottom"></i>&nbsp;&nbsp;'), $.each($('form[action="save_global.cgi"], form[action="save_iptables.cgi"], form[action="save_domain.cgi"],form[action="domain_setup.cgi"],form[action="mass_create.cgi"],form[action="save_roundrobin.cgi"],form[action="save_alert.cgi"], body.time form[action="apply.cgi"]'), function() {
                $(this).find(".col_header").removeClass("col_header")
            }), (check_location_resource("/virtual-server/edit_newchangelog.cgi") || check_location_resource("/server-manager/edit_newchangelog.cgi") || check_location_resource("/shell/") || check_location_resource("/shell/index.cgi") || check_location_resource("/server-manager/shell.cgi")) && $("td.col_value.col_value").removeClass("col_header"), check_location_resource("/ldap-server/edit_ldif.cgi") && $("span > input.ui_opt_textbox").unwrap(), v___location_path == v___location_prefix + "/server-manager/gvnc.cgi" && $("body.server-manager p > object").css("height", "100%").parent("p").attr("style", "display: block; height: " + parseInt($(window).outerHeight() / 1.4) + "px"), v___location_path == v___location_prefix + "/spam/edit_simple.cgi" || v___location_path == v___location_prefix + "/spam/edit_header.cgi") {
            var m = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:first-child"),
                v = (b = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:last-child")).find("a");
            m.append(v), b.remove(), m.find("a").addClass("table_title_links pull-right btn btn-xs btn-grey").attr("style", "position: absolute; right: 23px; margin-top: 7px !important;")
        }
        if (v___location_path == v___location_prefix + "/server-manager/edit_pass.cgi" && $('form[action="save_pass.cgi"]').find('a[href*="edit_pass.cgi?"]:not(.btn)').length) {
            var m = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:first-child"),
                b = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:last-child"),
                v = b.find("a");
            m.append(v), b.remove(), m.find("a").addClass("table_title_links pull-right btn btn-info btn-tiny").attr("style", "position: absolute; right: 20px; margin-top: 3px !important;")
        }
        if ($('.panel-default + a[href="/virtual-server/"]').attr("href", "/virtual-server/index.cgi"), $('.panel-default + a[href="/server-manager/"]').attr("href", "/server-manager/index.cgi"), v___location_directory_trail_slashed == v___location_prefix + "/virtual-server/" ? $("#headln2l > a:first-child .fa-arrow-left").parent("a").attr("href", "/virtual-server/index.cgi") : v___location_directory_trail_slashed == v___location_prefix + "/server-manager/" && $("#headln2l > a:first-child .fa-arrow-left").parent("a").attr("href", "/server-manager/index.cgi"), v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "acl/") {
            $("body.acl > div > div > div.panel-body > form > div > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody").attr("style", "border: 0 !important");
            var x = $("br").next(".ui_grid_table.table-hardcoded").find("tbody").attr("style", "border: 1px solid #" + (v___theme_night_mode_enabled || v___theme_night_mode ? "393b3f" : "eee") + " !important").parent("table").prev("br").prev("b");
            $("br").next(".ui_grid_table.table-hardcoded").css("margin-bottom", "3px"), $.each(x, function(e, t) {
                "" == $(this).text() && ($(this).next("br").remove(), $(this).remove())
            }), x.attr("style", "margin-bottom: -3px !important").next("br").remove()
        }
        $('body[class*="bandwidth"]').length && $(".fa.fa-calendar.file_chooser_button_attached").attr("style", "font-size: 11px; margin-top: 9px !important; pointer-events: none; margin-left: -27px !important;"), v___location_path != v___location_prefix + "/mysql/exec_form.cgi" && v___location_path != v___location_prefix + "/postgresql/exec_form.cgi" || ($('select[name="old"], input[name="clear"], select[name="charset"]').removeClass("heighter-34").addClass("heighter-28"), $('input[name="clear"]').attr("style", "margin-bottom: 3px !important;"), $('select[name="old"]').attr("style", "margin-bottom: 3px !important; margin-right: 0 !important;")), "config.cgi" != v___location_file && "uconfig.cgi" != v___location_file || "mysql" != v___location_query && "postgresql" != v___location_query || $('input[name="style"]').parents("td.col_value").parent("tr").after('\t\t<tr>\t\t\t<td class="col_label"><b>' + theme_language("theme_xhred_xsql_fit_content_screen_height") + '</b></td>\t\t\t<td class="col_value"><span>\t\t\t<span class="awradio awobject">\t\t\t\t<input class="iawobject" name="config_portable_module_xsql_fit_content_screen_height" id="config_portable_module_xsql_fit_content_screen_height_1" value="true"' + (config_portable_module_xsql_fit_content_screen_height ? " checked" : "") + ' type="radio">\t\t\t\t<label class="lawobject" for="config_portable_module_xsql_fit_content_screen_height_1">' + theme_language("theme_xhred_global_yes") + '</label>\t\t\t\t<input class="iawobject" name="config_portable_module_xsql_fit_content_screen_height" id="config_portable_module_xsql_fit_content_screen_height_0" value="false"' + (config_portable_module_xsql_fit_content_screen_height ? "" : " checked") + ' type="radio">\t\t\t\t<label class="lawobject" for="config_portable_module_xsql_fit_content_screen_height_0">' + theme_language("theme_xhred_global_no") + "</label>\t\t\t</span>\t\t</span></td>\t\t</tr>\t"), $(".ui_post_header.hidden").html() && $(".ui_post_header.hidden").html().length > 5 && ($("#headln2c").append("<span data-sub_title>" + $(".ui_post_header.hidden").html() + "</span>"), $(".ui_post_header.hidden").remove())
    }
    if (v___location_path && v___location_path.indexOf("/sysinfo.cgi") > -1) {
        if (!e) {
            $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/up.gif"]:not(".ui_icon_protected")').each(function(e, t) {
                var i = $(this);
                $(t).attr("src", v___location_prefix + "/images/check.png").css("margin-right", "3px").attr("title", $.trim(i.parent(".td_tag").text()))
            }), $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/down.gif"]:not(".ui_icon_protected")').each(function(e, t) {
                var i = $(this);
                $(t).attr("src", v___location_prefix + "/images/cross.png").css("margin-right", "3px").attr("title", $.trim(i.parent(".td_tag").text()))
            }), $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/not.gif"]:not(".ui_icon_protected")').each(function(e, t) {
                var i = $(this);
                $(t).attr("src", v___location_prefix + "/images/not.png").css("margin-right", "3px").attr("title", $.trim(i.parent(".td_tag").text()))
            }), $.each($(".piechart"), function() {
                isNaN($(this).data("percent")) && $(this).parents(".text-center").remove()
            }).promise().done(function() {
                var e = $("span[data-charts]"),
                    t = 'div[class^="col-xs-"]',
                    i = e.parents(".row").find(t).length;
                $.each(e.parents(".row"), function() {
                    $(this).find(t).removeClass().addClass("text-center col-xs-6 col-sm-" + 12 / i)
                })
            });
            $(".__page .panel-default:not(#system-status)").sort(function(e, t) {
                return $(e).data("sorter") > $(t).data("sorter") ? 1 : -1
            }).appendTo("#extended_sysinfo-1.panel-group")
        }

        function y() {
            var e = $("[data-convertible-timestamp-full]");
            e.parent().contents().filter(function() {
                return 3 === this.nodeType
            }).remove(), e.data("convertible-timestamp-full", parseInt(e.data("convertible-timestamp-full")) + 1), "undefined" != typeof moment && e.text(moment.unix(e.data("convertible-timestamp-full")).format(settings_window_replaced_timestamp_format_full))
        }
        y(), $(function() {
            "undefined" != typeof $_update_time_ && clearInterval($_update_time_), $_update_time_ = setInterval(y, 1e3)
        })
    }
    if (!e) {
        if (v___location_path == v___location_prefix + "/virtual-server/edit_phpmode.cgi" && $("#hiddendiv_phpinfo table tbody tr").css("border", "1px solid #" + (v___theme_night_mode_enabled ? "393b3f" : "eee")), $.each($('a[href*="showpass.cgi?"][onclick]'), function() {
                $(this).html('<i class="fa fa-fw fa-lg fa-key margined-left-4"></i>').css("color", "#555")
            }), v___location_path == v___location_prefix + "/webmin/edit_startpage.cgi" && ($('select[name="deftab"]').parents("td.col_value").parent("tr").hide(), $('select[name="gotomodule"] option').each(function() {
                ("virtual-server" == $(this).val() || "server-manager" == $(this).val()) && $(this).remove()
            })), v___location_path != v___location_prefix + "/webmin/edit_ui.cgi" && v___location_path != v___location_prefix + "/usermin/edit_ui.cgi" || ($('select[name*="sysinfo"], input[name*="sizefile_def"], input[name*="sizeuser_def"], input[name*="sizemodule_def"], input[name*="sizeusers_def"], input[name*="sizemodules_w"], input[name*="cs_link_def"], input[name*="cs_header_def"], input[name*="cs_table_def"], input[name*="cs_text_def"], input[name*="cs_page_def"], input[name*="width_def"], input[name*="height_def"], input[name*="sizedate_def"], input[name*="texttitles"]').parents("td.col_value").parent("tr").addClass("hidden"), $(".sub_table_container tr td.no-border").parent("tr").addClass("hidden")), (check_location_resource("/config.cgi?virtual-server") || check_location_resource("/config.cgi?server-manager")) && $('input[name="theme_image"], input[name="theme_link"], input[name="theme_alt"]').parents("td.col_value").parent("tr").hide(), v___location_path == v___location_prefix + "/virtual-server/edit_resel.cgi" && $('input[name="logo"][id="logo"], input[name="link"]').parents("td.col_value").parent("tr").hide(), v___location_path == v___location_prefix + "/virtual-server/edit_newfeatures.cgi" && ($('tr td:last-child label:contains("|")').replaceText(/\|/gi, ""), $("td a.ui_link").addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')), $("#headln2l .btn .fa-arrow-left").length) {
            $("body").attr("class") && $("body").attr("class").indexOf(v___module_file_manager) > -1 || $("#headln2l .btn .fa-arrow-left").parent("a").attr("href", $("#headln2l .btn .fa-arrow-left").parent("a").attr("href").replace("index.cgi", ""));
            var w = URI(v___location);
            v___location_file = w.filename()
        }
        $("#headln2r, #headln2l").prepend('<div class="btn-group">').append("</div>"), $("#headln2r a").detach().appendTo("#headln2r .btn-group"), $("#headln2l a").detach().appendTo("#headln2l .btn-group"), $.each($(".ui_form_end_submit"), function() {
            if (v___location_path_lead_unslashed != v___location_prefix_unslashed_trail_slashed + "proc/edit_proc.cgi" && "edit_dbase.cgi" != v___location_file && "edit_pam.cgi" != v___location_file && "list_records.cgi" != v___location_file && !Core.curModule("mailbox") && !Core.curModule("mailboxes")) {
                var e = $(this).parent().find(".ui_form_end_submit");
                !e.parents(".btn-group").length && e.length > 1 && $(this).parent().find(".ui_form_end_submit, .ui_form_end_submit + input").wrapAll('<div class="btn-group end_submits"></div>')
            }
        }).promise().done(function() {
            $.each($(".end_submits"), function(e, t) {
                ($(this).prev(".heighter-28").length || "28px" == $(this).prev("input, select").css("height")) && $(this).find(".ui_form_end_submit").addClass("heighter-28")
            })
        }), $.each($(".btn-group").find("span"), function() {
            $(this).not("[class]").length && !$.trim($(this).text()).length && $(this).remove()
        }), 2 === $(".panel-default").nextAll("a.btn.btn-primary").length && $(".panel-default").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-o-left"), 3 === $(".panel-default").nextAll("a.btn.btn-primary").length && ($(".panel-default").next("a.btn.btn-primary").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-left"), $(".panel-default").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-o-left")), v___location_path == v___location_prefix + "/init/reboot.cgi" && $("input.btn-success").removeClass("btn-success").addClass("btn-warning"), v___location_path == v___location_prefix + "/init/shutdown.cgi" && $("input.btn-success").removeClass("btn-success").addClass("btn-danger"), v___available_navigation || page_display(), $(".dataTable .ui_checked_checkbox").parent("tr").parent("tbody").prev("thead").find("th:first-child").addClass("opacity-0 pointer-events-none"), $("table tr.thead td").addClass("tdhead"), (Core.curModuleFile("virtual-server", "edit_newchroot.cgi") || Core.curModuleFile("virtual-server", "edit_newglobal.cgi") || Core.curModuleFile("virtual-server", "edit_newshells.cgi") || Core.curModuleFile("virtual-server", "edit_newfields.cgi") || Core.curModuleFile("server-manager", "edit_docker.cgi") || Core.curModuleFile("server-manager", "edit_vserver.cgi") || Core.curModuleFile("server-manager", "edit_zone.cgi") || Core.curModuleFile("server-manager", "edit_openvz.cgi") || Core.curModuleFile("server-manager", "list_locations.cgi") || Core.curModuleFile("server-manager", "edit_lxc.cgi") || Core.curModuleFile("server-manager", "list_ips.cgi") || $('body[class*="bind8"]').length && v___location_file || $('body[class*="status"]').length && "edit_mon.cgi" == v___location_file || $('body[class*="custom"]').length && "edit_sql.cgi" == v___location_file || $('body[class*="custom"]').length && "edit_cmd.cgi" == v___location_file || $('body[class*="custom"]').length && "edit_file.cgi" == v___location_file) && $(".table").removeClass("table-hover");
        var k = $(".fa-toggle-switch-off").parent("button.btn-default");
        1 === k.length && "1" == k.parent("td").find('input[type="radio"]:checked').val() && k.find(".fa-toggle-switch-off").addClass("fa-toggle-switch").removeClass("fa-toggle-switch-off"), k.parents("td").addClass("vertical-align-bottom");
        var C = $('form[action*="manual"] > select[name="file"], form[action*="manual.cgi"] > select[name="manual"], form[action*="edit_"] > select[name="file"]');
        C.length && (C.addClass("heighter-34"), $('form[action*="manual"], form[action*="edit_"]').css("margin-bottom", "2px")), Core.curModule("firewalld") && ($("select#zone").addClass("heighter-34"), $('form[action="save_ifaces.cgi"] button').addClass("heighter-28-force")), $('body[class*="proftpd"] .table-hardcoded tr td > input + input.btn.btn-default').removeClass("heighter-28").addClass("heighter-34").prev("input").addClass("heighter-34"), $('body[class*="proftpd"] form[action="find_ftpaccess.cgi"] > input:first-child').removeClass("heighter-34").addClass("heighter-28"), "edit_simple.cgi" == v___location_file && $('body[class*="spam"]').length && $("tr td").contents().filter(function() {
            return 3 == this.nodeType
        }).remove(), "edit_awl.cgi" == v___location_file && $('body[class*="spam"]').length && $('input[name="user"]').next("input").addBack().addClass("heighter-34"), Core.curModuleFile("usermin", "list_sessions.cgi") && $('.container-fluid #user, .container-fluid input[type="button"]').addClass("heighter-34"), (Core.curModuleFile("htaccess-htpasswd", "") || Core.curModuleFile("htaccess-htpasswd", "index.cgi")) && ($("#search, .file_chooser_button").addClass("heighter-34").css("margin-bottom", "-1px"), $("#search").css("margin-top", "0")), (Core.curModuleFile("mailboxes", "") || Core.curModuleFile("mailboxes", "index.cgi")) && $("#user, .file_chooser_button").addClass("heighter-34 vertical-align-middle").css("margin-bottom", "-1px"), Core.curModuleFile("mailboxes", "list_mail.cgi") && $("#mfolder1, #mfolder2").addClass("heighter-34").css("margin-bottom", "-1px").css("margin-top", "-1px"), Core.curModuleFile("quota", "list_users.cgi") && $("#user, #user + input").addClass("heighter-34"), Core.curModuleFile("quota", "list_groups.cgi") && $("#group, #group + input").addClass("heighter-34"), (Core.curModuleFile("apache", "htaccess.cgi") || Core.curModuleFile("virtualmin-registrar", "index.cgi") || Core.curModuleFile("virtualmin-registrar", "")) && $(".ui_form_end_submit").addClass("heighter-28-force");
        var O = $('form:not([action="save_log.cgi"]) .table-responsive .table .sub_table_container .table tbody tr td > select,\t\t\t\t\t\t\t   form:not([action="save_log.cgi"], [action="save_net.cgi"]) .table-responsive .table .sub_table_container .table tbody tr td > input,\t\t\t\t\t\t\t   form:not([action="save_user.cgi"], [action="save_group.cgi"]) .table td.opener_container td.col_value table tbody tr td > select,\t\t\t\t\t\t\t   form:not([action="save_user.cgi"], [action="save_group.cgi"]) .table td.opener_container td.col_value table tbody tr td > input,\t\t\t\t\t\t\t   form[action="save_newglobal.cgi"] > table tbody tr td input,\t\t\t\t\t\t\t   form[action="save_newfields.cgi"] > table tbody tr td input,\t\t\t\t\t\t\t   form[action="save_newfields.cgi"] > table tbody tr td select,\t\t\t\t\t\t\t   form[action="save_newshells.cgi"] > table tbody tr td select,\t\t\t\t\t\t\t   form[action="save_newshells.cgi"] > table tbody tr td input,\t\t\t\t\t\t\t   form[action="save_linkcats.cgi"] > table tbody tr td input,\t\t\t\t\t\t\t   form[action="save_gen.cgi"] > table tbody tr td input\t\t\t\t\t\t\t   ');
        $.each(O, function(e, t) {
            $(this).parent().find("input[data-mmclick]").length || $(this).parent().find("button[data-mmclick]").length || $(this).parent().find('input[onclick*="window.open"]').length || $(this).parent().find('button[onclick*="window.open"]').length || ($(this).prev(".awobject").length ? $(this).css("width", "auto") : 1 == $(this).parent().find('input:not([type="checkbox"], [type="radio"]), select').length ? $(this).css("width", "100%").css("min-width", "100%") : 2 == $(this).parent().find('input:not([type="checkbox"], [type="radio"]), select').length && ($(this).parent().find("input, select").first().css("width", "39%"), $(this).parent().find("input, select").last().css("width", "60%").css("float", "right")))
        }), Core.curModuleFile("virtual-server", "edit_newstyles.cgi") ? $('a[onclick^="window.open(\\"thumb_style.cgi?"]').html('<i class="fa fa-fw fa-external-link"></i>').addClass("btn btn-default btn-xxs margined-top--3") : Core.curModule("virtual-server") && $('a[onclick^="window.open(\\"thumb_style.cgi?"]').html('<i class="fa fa-fw fa-external-link" style="margin-top: 7px;"></i>').addClass("btn btn-default heighter-28-force");
        var T = '        body button[onclick*="window.open"][onclick*="choose"][onclick*="chooser.cgi"]:not([onclick*="_chooser.cgi"]),        body input[onclick*="window.open"][onclick*="choose"][onclick*="chooser.cgi"]:not([onclick*="_chooser.cgi"]),                body button[onclick*="window.open"][onclick*="choose"][onclick*="standard_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="standard_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="third_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="third_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="user_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="user_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="group_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="group_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="my_group_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="my_group_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="module_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="module_chooser.cgi"]    ';
        if ($(T).length && $(T).each(function() {
                $(this).attr("data-mmclick", $(this).attr("onclick")).removeAttr("onclick"), chooser_get_target($(this), 0).length && $(this).css("margin-left", "-8px")
            }), (Core.curModuleFile("virtualmin-nginx", "") || Core.curModuleFile("virtualmin-awstats", "") || Core.curModuleFile("fdisk", "edit_disk.cgi") || Core.curModuleFile("virtual-server", "edit_newlinks.cgi") || Core.curModuleFile("virtualmin-dav", "list_shares.cgi") || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "pam/" && !v___location_file || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "syslog/" && !v___location_file || v___location_path == v___location_prefix + "/postfix/master.cgi") && setTimeout(function() {
                var e = $('.panel-body > .ui_link, .panel-body > .ui_link_replaced,\t\t\t\t\t body[data-uri*="virtualmin-awstats"] .panel-body > form > .ui_link_replaced,\t\t\t\t\t body[data-uri*="edit_disk.cgi"] .panel-body p > a.ui_link_replaced,\t\t\t\t\t body[data-uri*="edit_newlinks.cgi"] .panel-body > form > .ui_link_replaced,\t\t\t\t\t body[data-uri*="edit_newlinks.cgi"] .panel-body > .ui_emptymsg + p > .ui_link_replaced'),
                    t = $.trim(e.first().text()),
                    i = e.first().attr("href");
                $("#headln2r .btn-group a").addClass("pull-left").attr("style", ""), $("#headln2r .btn-group").prepend('\t\t<a href="' + (v___available_navigation ? v___location_directory_trail_slashed : "") + i + '" class="btn btn-link text-lighter text-decoration-none pull-left" data-placement="auto top" data-toggle="tooltip" data-container="body" data-title="' + t + '">\t\t\t<i class="fa fa-plus"></i>\t\t</a>\t'), e.next("br").remove(), e.remove()
            }, 0), v___theme_night_mode_enabled || v___theme_night_mode) {
            if ($(".opener_shown").length > 0) {
                var S = $(".opener_container, .opener_container:hidden").find(".ui_grid_table, .ui_grid_table:hidden");
                S.length && $.each(S, function(e, t) {
                    $(this).parent("td").attr("style", "padding: 0 !important")
                })
            }
            if ($(".opener_table_style_small").length > 0) {
                var I = $(".opener_table_style_small, .opener_table_style_small:hidden").find(".sub_table_container.table-hardcoded, .sub_table_container.table-hardcoded:hidden");
                I.length && $.each(I, function(e, t) {
                    $(this).parent("td").attr("style", "padding: 0 !important"), $(this).find("tbody tr td").attr("style", "padding-left: 3px !important; padding-right: 3px !important")
                })
            }
        }
        $('html[data-script-name*="webmin/edit_assignment.cgi"] table table tbody tr td, html[data-script-name*="usermin/edit_assignment.cgi"] table table tbody tr td').hover(function() {
            $(this).is("td:nth-child(1)") || $(this).is("td:nth-child(3)") ? $(this).addClass("hl-ow").next("td").addClass("hl-ow") : ($(this).is("td:nth-child(2)") || $(this).is("td:nth-child(4)")) && $(this).addClass("hl-ow").prev("td").addClass("hl-ow")
        }, function() {
            $(this).removeClass("hl-ow").next("td").removeClass("hl-ow"), $(this).removeClass("hl-ow").prev("td").removeClass("hl-ow")
        }), (Core.curModule("changepass") || Core.curModuleFile("server-manager", "edit_pass.cgi") || Core.curModuleFile("virtual-server", "list_databases.cgi") || Core.curModuleFile("acl", "edit_user.cgi") || Core.curModuleFile("virtual-server", "clone_form.cgi") || Core.curModuleFile("virtual-server", "edit_user.cgi") || Core.curModuleFile("virtual-server", "edit_domain.cgi") || Core.curModuleFile("virtual-server", "domain_form.cgi") || Core.curModuleFile("samba", "edit_euser.cgi") || Core.curModuleFile("samba", "ask_epass.cgi") || Core.curModuleFileQuery("virtualmin-registrar", "edit.cgi", "registrar=") || Core.curModuleFileQuery("htaccess-htpasswd", "edit_user.cgi", "new=") || Core.curModuleFileQuery("postgresql", "edit_user.cgi", "new=") || Core.curModuleFileQuery("mysql", "edit_user.cgi", "new=") || Core.curModuleFile("useradmin", "edit_group.cgi") || Core.curModuleFile("useradmin", "edit_user.cgi") || Core.curModuleFileQuery("passwd", "edit_passwd.cgi", "user=")) && setTimeout(function() {
            $("#headln2r .btn-group a").addClass("pull-left").attr("style", ""), $("#headln2r .btn-group").prepend('\t\t<a class="btn btn-link text-lighter text-decoration-none pull-left generate-password-key" data-placement="auto top" data-toggle="tooltip" data-container="body" data-title="' + Convert.strUpInitial(theme_language("theme_xhred_password_generator_new")) + '">\t\t\t<i class="fa fa-1_25x fa-key-plus" style="width: 14px; margin-left: -3px;"></i>\t\t</a>\t')
        }, 0), 0 == v___user_level && 1 == Core.moduleAvailable("status") || (settings_side_slider_enabled = !1, settings_side_slider_enabled = !1, get_server_data("data-slider-fixed", "0"), $("#right-side-tabs, .right-side-tabs-toggler").addClass("hidden")), Core.curModuleFile("bind8", "edit_zonekey.cgi") && g__text_breaker($("textarea#ds"), $("#headln2c").find("span[data-sub_title]").text()), Core.curModuleFile("virtual-server", "edit_script.cgi") && $('select[name="version"]').addClass("heighter-34 margined-top-4"), Core.curModuleFile("virtual-server", "transfer_form.cgi") && $('input[name="newttl"]').addClass("heighter-34"), g__line_breaker(Core.curModuleFile("firewall", "") || Core.curModuleFile("firewall", "index.cgi"), $(".ui_checked_columns td label b"), ","), $.each($(".gl-icon-container"), function(e, t) {
            $(this).find("a:first").find("i.fa-edit").length || ($(this).find("a:first").prepend('<i class="fa fa-fw fa-lg fa-select text-dark text-dark-hoverd gl-icon-select"></i>'), $(this).find("a:first").prepend('<i class="fa fa-fw fa-edit text-semi-dark text-dark-hoverd gl-icon-edit"></i>'))
        }), Core.curModuleFile("virtual-server", "index.cgi") && $('a[href*="edit_domain.cgi"], a[href*="list_users.cgi"], a[href*="list_aliases.cgi"]').on("click", function(e) {
            var t = URI.parseQuery(URI($(this).attr("href")).query()).dom;
            t != $('select[name="dom"]').val() && get_navigation_menu_virtualmin(t)
        }), Core.curModuleFile("server-manager", "index.cgi") && $('a[href*="edit_serv.cgi"], a[href*="mass_update_form.cgi"]').on("click", function(e) {
            var t = URI.parseQuery(URI($(this).attr("href")).query()).id;
            t != $('select[name="sid"]').val() && get_navigation_menu_cloudmin(t)
        }), (Core.curModuleFile("webmin", "refresh_modules.cgi") || Test.strContains(v___location_query, "refresh=1")) && navigation_update(-1), v___location_path == v___location_prefix + "/proc/index_search.cgi" && $(".col_header").removeClass("col_header"), 1 == get_server_data("notice") && (v___theme_updated = 1), $('input[type="file"]').bootstrapFileInput(), setTimeout(function() {
            $.each($(".file-input-wrapper > span"), function() {
                $(this).html('<i class="fa fa-fw fa-paperclip">')
            })
        }, 1)
    }
    if (editor_init_check() && editor_init($("textarea"), !1, !1, "static", !1, !0, !1, e), viewer_init_check() && viewer_init(), settings_sysinfo_easypie_charts && v___location_path == v___location_prefix + "/sysinfo.cgi") {
        var M = v___theme_night_mode_enabled || v___theme_night_mode ? 1 : 0;
        $("body").find("#system-status").find(".piechart").easyPieChart({
            barColor: function(e) {
                return e < 50 ? M ? "#269373" : "#5cb85c" : e < 85 ? M ? "#c38d40" : "#f0ad4e" : "#cb3935"
            },
            trackColor: M ? "#3b424b" : "#f8f8f8",
            scaleColor: M ? "#3b424b" : "#dfe0e0",
            size: parseInt(settings_sysinfo_easypie_charts_size),
            scaleLength: parseInt(settings_sysinfo_easypie_charts_scale),
            trackWidth: parseInt(settings_sysinfo_easypie_charts_width),
            lineWidth: 0,
            lineCap: "square",
            onStep: function(e, t, i) {
                $(this.el).find(".percent").text(Math.round(i))
            }
        })
    }
    if (((-1 === v___location_path.indexOf(".cgi") || -1 !== v___location_path.indexOf("link.cgi") || v___location_path == v___location_prefix + "/proc/open_files.cgi" || v___location_path == v___location_prefix + "/webmin/edit_webmincron.cgi" || v___location_path == v___location_prefix + "/postfix/mailq.cgi" || v___location_path == v___location_prefix + "/webmin_search.cgi" || v___location_path == v___location_prefix + "/useradmin/index.cgi" || v___location_path == v___location_prefix + "/quota/list_users.cgi" || v___location_path == v___location_prefix + "/quota/list_groups.cgi" || v___location_path == v___location_prefix + "/init/index.cgi") && (v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "webmin/" && -1 === v___location_prefix.indexOf("servers/link.cgi") || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "proc/" || v___location_path_lead_unslashed == v___location_prefix_unslashed_trail_slashed + "webmin_search.cgi" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "postfix/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "virtual-server/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "init/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "mount/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "custom/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "quota/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "php-pear/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "fsdump/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "inittab/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "logrotate/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "mailcap/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "cron/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "software/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "syslog/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "useradmin/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "apache/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "webalizer/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "cpan/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "htaccess-htpasswd/" || v___location_directory_unslashed_trail_slashed == v___location_prefix_unslashed_trail_slashed + "fdisk/") || Core.curModuleFile("cron", "index.cgi") || Core.curModuleFile("ruby-gems", "index.cgi") || Core.curModuleFile("postfix", "master.cgi") || Core.curModuleFile("fail2ban", "list_filters.cgi") || Core.curModuleFile("fail2ban", "list_actions.cgi") || Core.curModuleFile("fail2ban", "list_jails.cgi") || Core.curModuleFile("virtual-server", "list_databases.cgi") || Core.curModuleFile("virtual-server", "connectivity.cgi") || Core.curModuleFile("virtualmin-git", "index.cgi") || Core.curModuleFile("net", "list_ifcs.cgi") || Core.curModuleFile("net", "list_hosts.cgi") || Core.curModuleFile("bind8", "edit_recs.cgi") || Core.curModule("firewall") || Core.curModule("firewall6") || v___location_path == v___location_prefix + "/useradmin/list_logins.cgi" || v___location_path == v___location_prefix + "/man/search.cgi" || v___location_path == v___location_prefix + "/proc/index_tree.cgi" || v___location_path == v___location_prefix + "/proc/index_user.cgi" || v___location_path == v___location_prefix + "/proc/index_size.cgi" || v___location_path == v___location_prefix + "/proc/index_cpu.cgi" || v___location_path == v___location_prefix + "/proc/index_search.cgi" || v___location_path == v___location_prefix + "/software/search.cgi" || v___location_path == v___location_prefix + "/software/file_info.cgi" || v___location_path == v___location_prefix + "/software/list_pack.cgi" || v___location_path == v___location_prefix + "/virtual-server/index.cgi" || v___location_path == v___location_prefix + "/virtual-server/list_users.cgi" || v___location_path == v___location_prefix + "/virtual-server/edit_newplan.cgi" || v___location_path == v___location_prefix + "/virtual-server/edit_newfeatures.cgi" || v___location_path == v___location_prefix + "/virtual-server/edit_newtmpl.cgi" || v___location_path == v___location_prefix + "/virtual-server/backuplog.cgi" || v___location_path == v___location_prefix + "/package-updates/" || v___location_path == v___location_prefix + "/package-updates/index.cgi" || v___location_path == v___location_prefix + "/virtual-server/usage.cgi" || v___location_path == v___location_prefix + "/virtual-server/search.cgi" || (v___location_path == v___location_prefix + "/fetchmail/" || v___location_path == v___location_prefix + "/filter/") && $t_uri_usermin) && $(".__page table.table").each(function() {
            if ($(this).find("thead") && $(this).find("thead").length && $(this).find("thead tr th") && $(this).find("thead tr th").length > 2) {
                if ($(this).find("thead") && $(this).find("thead").length > 1) {
                    var e = $(this).find("thead:first-child");
                    e.remove(), !$t_uri_webmin || v___location_path != v___location_prefix + "/quota/list_users.cgi" && v___location_path != v___location_prefix + "/quota/list_groups.cgi" || ($(this).before(e), $(this).prev("thead").replaceTagName("table"))
                }
                table_data_init($(this)), $(this).find("th").each(function() {
                    $(this).text() || $(this).css("opacity", "0").css("cursor", "default")
                });
                var t = -1 / 0;
                if ($(this).find("tr").each(function(e, i) {
                        t = Math.max(t, parseFloat(e))
                    }), t < 10 && $(this).parents(".dataTables_wrapper").find(".dataTables_filter").remove(), ($(this).parents(".dataTables_wrapper").find(".dataTables_filter").length ? 1 : 0) && ($('body[class="init"]').length || $('body[class^="init"]').length && null != $('body[class^="init"]').attr("class").match(/\d+$/) || $('body[class="quota"]').length || $('body[class^="quota"]').length && null != $('body[class^="quota"]').attr("class").match(/\d+$/) || $('body[class="cron"]').length || $('body[class^="cron"]').length && null != $('body[class^="cron"]').attr("class").match(/\d+$/))) {
                    var i = -15,
                        a = $(this).parents(".dataTables_wrapper").attr("style");
                    $('body[class^="quota"]').length && (i = -27), $(this).parents(".dataTables_wrapper").attr("style", "margin-top: " + i + "px !important; " + (a || ""))
                }
            }
        }).promise().done(function() {
            table_data_filter()
        }), $(".select_all").on("click", function() {
            $(this).parents("form").find('.icons-row div[class*="icons-container"]').length && $.each($(".icons-row .hidden-forged-6"), function() {
                $(this).parents('div[class*="icons-container"]').addClass("highlighted"), $(this).parents('div[class*="icons-container"]').find(".fa-select").removeClass("fa-select").addClass("fa-selected")
            })
        }), $(".select_invert").on("click", function() {
            $.each($(".icons-row .hidden-forged-6"), function() {
                $(this).find("input").is(":checked") ? ($(this).parents('div[class*="icons-container"]').addClass("highlighted"), $(this).parents('div[class*="icons-container"]').find(".fa-select, .fa-selected").removeClass("fa-select").addClass("fa-selected")) : ($(this).parents('div[class*="icons-container"]').removeClass("highlighted"), $(this).parents('div[class*="icons-container"]').find(".fa-select, .fa-selected").removeClass("fa-selected").addClass("fa-select"))
            })
        }), $('.icons-row div[class*="icons-container"]').on("mouseover", function(e) {
            $(this).find(".hidden-forged-7").removeClass("hidden-forged")
        }).on("mouseout", function(e) {
            $(this).find(".hidden-forged-7").addClass("hidden-forged")
        }), "?dashboard" != v___location.search && 1 == navigation_dashboard_switch_available() && ("sysinfo.cgi" == v___location_file ? (set_switch_position("dashboard"), navigation_clear()) : $("#open_webmin").length > 0 && "open_webmin" != $(".switch-toggle input:checked").attr("id") ? set_switch_position("webmin") : $("#open_virtualmin").length > 0 && "open_virtualmin" != $(".switch-toggle input:checked").attr("id") ? set_switch_position("virtualmin") : $("#open_cloudmin").length > 0 && "open_cloudmin" != $(".switch-toggle input:checked").attr("id") ? set_switch_position("cloudmin") : $("#open_usermin").length > 0 && "open_usermin" != $(".switch-toggle input:checked").attr("id") && set_switch_position("usermin")), $('form[action="bootup.cgi"]').on("submit", function(e) {
            $("#starting").length > 0 ? ($("#starting").remove(), $(this).append('<input type="hidden" id="starting" name="starting" value="' + $('input[name="boot"]:checked').val() + '">')) : $("#table").length > 0 ? $(this).append('<input type="hidden" id="table" name="table" value="' + $('input[name="boot"]:checked').val() + '">') : $('input[name="boot"][type="hidden"]').length > 0 && ($('input[name="boot"][type="hidden"]').remove(), $(this).append('<input type="hidden" name="boot" value="' + $('input[name="boot"]:checked').val() + '">'))
        }), $('input[name="config_portable_module_xsql_fit_content_screen_height"]').on("change", function() {
            var e = $(this).attr("name"),
                t = $(this).val();
            localStorage.setItem(v___server_hostname + "-" + e, t), window[e] = t, theme_config("save")
        }), v___location_path != v___location_prefix + "/virtual-server/domain_form.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_domain.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_user.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_alias.cgi" && v___location_path != v___location_prefix + "/virtual-server/edit_limits.cgi" || $("input, select").on("blur", function() {
            !__is_tabbed || $(this).next("input:visible").length || $(this).prev("input:visible").length || $(this).next("select:visible").length || $(this).prev("select:visible").length || (__is_shifted ? $(this).parent("td").parent("tr").prev("tr").find("select:visible").length || $(this).parent("td").parent("tr").prev("script").prev("tr").find("select:visible").length || $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find("select:visible").length ? ($(this).parent("td").parent("tr").prev("tr").find("select:first:visible").focus(), $(this).parent("td").parent("tr").prev("script").prev("tr").find("select:first:visible").focus(), $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find("select:first:visible").focus()) : ($(this).parent("td").parent("tr").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus(), $(this).parent("td").parent("tr").prev("script").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus(), $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus()) : $(this).parent("td").parent("tr").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length || $(this).parent("td").parent("tr").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length || $(this).parent("td").parent("tr").next("script").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length ? ($(this).parent("td").parent("tr").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus(), $(this).parent("td").parent("tr").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus(), $(this).parent("td").parent("tr").next("script").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus()) : ($(this).parent("td").parent("tr").next("tr").find("select:first:visible").focus(), $(this).parent("td").parent("tr").next("script").next("tr").find("select:first:visible").focus(), $(this).parent("td").parent("tr").next("script").next("script").next("tr").find("select:first:visible").focus()))
        }), $('.ui_form_end_submit[onclick^="window.open"]').click(function() {
            var e = $(this);
            setTimeout(function() {
                e.removeClass("disabled"), navigation_render_end()
            }, 100)
        }), v___location_path && v___location_path.indexOf("/sysinfo.cgi") > -1 && ($("body").undelegate(".piechart canvas", "mouseover mouseleave"), $("body").on("mouseover", ".piechart canvas", function() {
            var e = $(this).parent("span").attr("data-charts").split("_")[1];
            ("cpu" != e && "mem" != e && "virt" != e || Core.moduleAvailable("proc")) && ("disk" != e || Core.moduleAvailable("disk-usage") || Core.moduleAvailable("quota")) && ($(this).addClass("cursor-alias"), $(this).prev("span").prepend('<i class="fa fa-fw fa-link">&nbsp;</i>'))
        }).on("mouseleave", ".piechart canvas", function() {
            $(this).prev("span").find("i").remove()
        }), $("body").undelegate("canvas", "click"), $("body").on("click", "canvas", function(e) {
            e.preventDefault();
            var t, i = $(this).parent("span").attr("data-charts").split("_")[1];
            "cpu" == i && Core.moduleAvailable("proc") ? t = v___location_prefix + "/proc/index_cpu.cgi" : "mem" != i && "virt" != i || !Core.moduleAvailable("proc") ? "disk" == i && Core.moduleAvailable("disk-usage") ? t = v___location_prefix + "/disk-usage" : "disk" == i && Core.moduleAvailable("quota") && (t = v___location_prefix + "/quota/list_users.cgi?dir=%2F") : t = v___location_prefix + "/proc/index_size.cgi", t.length && get_pjax_content(t)
        }), !v___available_navigation && $('a[href="/?updated"], a[data-href="#theme-info"]').remove()), $t_uri_virtualmin && Core.curModuleFileQuery("syslog", "save_log.cgi", "view=1") && ($('select[name="idx"] option').filter(function() {
            return this.text == $.trim($("span[data-sub_title] tt").text())
        }).attr("selected", !0), $('select[name="idx"]').addClass("hidden")), Core.curModuleFileQuery("syslog", "save_log.cgi", "view=1")) {
        var m = ".panel-body .fa-refresh-fi",
            j = localStorage.getItem(v___server_hostname + "-option_" + v___module + "_refresh"),
            q = m + ", .panel-body .refresh-timer-timeout",
            F = '<span class="label label-transparent-35 label-sm margined-top-1 refresh-timer-timeout">' + (j || "0") + "&nbsp;</span>";
        $.each($(m + ":not([data-processed])").parent("button"), function(e, t) {
            if ($(this).find("i").attr("data-processed", 1), $(this).wrap('<div class="btn-group' + (1 === e ? " dropup" : "") + '"></div>'), $(this).after('<button class="btn btn-warning dropdown-toggle" data-toggle="dropdown" data-original-title="" title="" aria-expanded="false"><i class="fa fa-caret-down"></i></button><ul class="dropdown-menu dropdown-menu-right refresh-timer-select"><li><a data-off data-timeout="0">' + theme_language("theme_xhred_global_automatic_refresh") + ": " + theme_language("theme_xhred_global_off") + '</a></li><li class="divider"></li><li><a data-on data-timeout="5">5 ' + theme_language("theme_xhred_global_seconds") + '</a></li><li><a data-on data-timeout="15">15 ' + theme_language("theme_xhred_global_seconds") + '</a></li><li><a data-on data-timeout="30">30 ' + theme_language("theme_xhred_global_seconds") + '</a></li><li><a data-on data-timeout="60">60 ' + theme_language("theme_xhred_global_seconds") + '</a></li><li><a data-on data-timeout="120">2 ' + theme_language("theme_xhred_global_minutes") + '</a></li><li><a data-on data-timeout="300">5 ' + theme_language("theme_xhred_global_minutes") + "</a></li></ul>"), j && "0" != j) {
                var i = $(q);
                $(this).find("i").before(F), $(this).find("i").remove();
                var a = j;
                "number" == typeof refreshTimer && clearInterval(refreshTimer), refreshTimer = setInterval(function() {
                    --a, $(".refresh-timer-timeout").text(a), a <= 0 && ($(i[0]).parent().trigger("click"), clearInterval(refreshTimer))
                }, 1e3)
            }
        }).promise().done(function() {
            $(".refresh-timer-select li").click(function() {
                "number" == typeof refreshTimer && clearInterval(refreshTimer);
                var e = '<span class="label label-transparent-35 label-sm margined-top-1 refresh-timer-timeout">' + (j || "0") + "&nbsp;</span>";
                localStorage.setItem(v___server_hostname + "-option_" + v___module + "_refresh", $(this).find("a").data("timeout")), j = localStorage.getItem(v___server_hostname + "-option_" + v___module + "_refresh");
                var t = $(q).parent();
                if (j && "0" != j) {
                    t.find(".refresh-timer-timeout").length || t.prepend(e), t.find(".refresh-timer-timeout").html(j + "&nbsp;"), $(".fa-refresh-fi").remove();
                    var i = j;
                    refreshTimer = setInterval(function() {
                        if (--i, $(".refresh-timer-timeout").text(i), i <= 0) {
                            var e = $(q);
                            $(e[0]).parent().trigger("click"), clearInterval(refreshTimer)
                        }
                    }, 1e3)
                } else $(".refresh-timer-timeout").remove(), !t.find(".fa-refresh-fi").length && t.prepend('<i class="fa fa-fw fa-refresh-fi fa-1_25x refresh-timer-icon"></i>')
            })
        })
    }
    Core.curModuleFile("virtual-server", "summary_domain.cgi") && $(".__page #headln2l .btn-group, .__page .page_footer_submit").remove(), settings_side_slider_enabled && (Core.curModule("package-updates") && slider_mark_group_notifications_read("package_message"), Core.curModule("csf") && (slider_mark_group_notifications_read("csf_remote_version"), slider_mark_group_notifications_read("csf_title"))), $('#content [data-dcontainer="1"]').tooltip("destroy"),
        // $('[data-dcontainer="1"] [data-toggle="tooltip"], [data-dcontainer="1"] [data-toggle="virtualmin-license"], [data-dcontainer="1"] .panel-body td a, [data-dcontainer="1"] .icons-container').tooltip('destroy');
        $('#content [data-dcontainer="1"]').tooltip({
            selector: '[data-toggle="tooltip"], [data-toggle="virtualmin-license"], .panel-body td a, .icons-container',
            container: "body",
            placement: "auto " + ($(".gl-icon-container").length ? "bottom" : "top"),
            html: !0,
            delay: {
                show: 600,
                hide: 30
            }
        }), v___available_navigation && window.matchMedia("(max-width: 767px)").matches && (navigation_lock_width(), set_side_slider_visibility()), "undefined" != typeof v___user_level && 0 != v___user_level && (settings_right_virtualmin_default = "sysinfo.cgi", settings_right_cloudmin_default = "sysinfo.cgi"), $("body").hasClass("session_login") && setTimeout(function() {
            page_display()
        }, 200), moment.locale(get_server_data("language-full")), theme_to_new_tab()
}

function page_init() {
    "undefined" == typeof v___initial_load && (v___initial_load = 1), "undefined" == typeof v___title_initial && (v___title_initial = get_server_data("title-initial")), "undefined" == typeof v___theme_updated && (v___theme_updated = 0), v___location = location, $__theme_name__ = "authentic", $__theme_navigation = "xnavigation=1", v___user_level = get_server_data("access-level"), v___shell_type = 0 == v___user_level ? "#" : "$", v___shell_processing = 0, v___debug = get_server_data("debug"), v___source_type = "debug" == v___debug ? "src" : "min", v___available_usermin = get_server_data("usermin"), "undefined" == typeof v___available_navigation && (v___available_navigation = get_server_data("navigation")), v___available_session = get_server_data("session"), v___blocked_navigation = $(document.activeElement).is("li.has-sub, a[data-has-sub-link]") ? 1 : 0, v___server_username = get_server_data("user"), v___server_userhome = get_server_data("user-home"), v___module = get_server_data("module"), v___script_name = get_server_data("script-name").replace(/^\//g, ""), v___module_file_manager = "file" + (Core.moduleAvailable("file-manager") ? "-manager" : "min"), v___server_hostname = get_server_data("hostname"), v___server_sestatus = get_server_data("sestatus"), v___theme_version = get_server_data("theme-version").toString(), v___theme_version_git = get_server_data("theme-git-version").toString(), v___theme_version_plain = v___theme_version.replace(".", ""), v___theme_force_buffered = 0, v___theme_night_mode = "1" == get_server_data("data-night-mode") ? 1 : 0, v___theme_night_mode_enabled = "undefined" != typeof settings_background_color && "nightRider" === settings_background_color ? 1 : v___theme_night_mode, o___gotten_scripts = "undefined" == typeof o___gotten_scripts ? [] : o___gotten_scripts, v___URI = URI(v___location), v___location_protocol = v___URI.protocol(), v___location_port = v___URI.port(), v___location_origin = v___URI.origin(), v___location_hostname = v___URI.hostname(), v___location_href = v___location.href, v___location_path = v___URI.path().replace(/\/+/g, "/"), v___location_path_unslashed = v___location_path.replace(/^\//g, "").replace(/\/$/g, ""), v___location_path_lead_unslashed = v___location_path.replace(/^\//g, ""), v___location_file = v___URI.filename(), v___location_directory = v___URI.directory(), v___location_directory_trail_slashed = v___location_directory ? v___location_directory.endsWith("/") ? v___location_directory : v___location_directory + "/" : "/", v___location_directory_unslashed = v___location_directory.replace(/^\//g, "").replace(/\/$/g, ""), v___location_directory_unslashed_trail_slashed = v___location_directory_unslashed + "/", v___location_query = navigation_trigger(v___URI.query(), 1), v___location_resource = navigation_trigger(v___URI.resource(), 1), v___location_resource_unslashed = v___location_resource.replace(/^\//g, "").replace(/\/$/g, ""), v___location_prefix = get_server_data("webprefix"), v___location_prefix_unslashed_trail_slashed = v___location_prefix.replace(/^\//g, "").replace(/\/$/g, "") + "/", "/" === v___location_prefix_unslashed_trail_slashed && (v___location_prefix_unslashed_trail_slashed = ""), v___server_extensions_path = v___location_prefix + "/extensions",
        // $t___license_vm = get_server_data("virtual-server-license"),
        // $t___license_cm = get_server_data("server-manager-license"),
        update_navigation_module_name()
}

function editor_init_check() {
    return 1 === $("textarea").length && ("data" === $("textarea").attr("name") || "text" === $("textarea").attr("name") || "conf" === $("textarea").attr("name") || "script" === $("textarea").attr("name") || v___location_file.indexOf("manual") > -1) ? Core.curModule("gnupg") || Core.curModuleFile("virtual-server", "mass_ucreate_form.cgi") || Core.curModuleFile("virtual-server", "mass_create_form.cgi") || Core.curModuleFile("server-manager", "edit_pubkey.cgi") || Core.curModuleFile("server-manager", "edit_key.cgi") || check_location_resource("/config.cgi?server-manager") || Core.curModuleFile("useradmin", "batch_form.cgi") || Core.curModuleFile("useradmin", "gbatch_form.cgi") || "mass_form.cgi" == v___location_file || "notes" === $("textarea").attr("id") ? 0 : 1 : 0
}

function editor_init(e, t, i, a, n, s, r, _) {
    (r = void 0 !== r && 0 != r) || (n = void 0 !== n && 0 != n, s = void 0 !== s && 0 != s, $.each(e, function(r, o) {
        $(this);
        var l = ["phpini", "bind8"];
        $("#headln2l a").attr("href") ? $page = $("#headln2l a").attr("href").split("/")[1] : $page = null, l.indexOf($page) >= 0 && $(this).data("name", "data"), CodeMirror.modeURL = v___location_prefix + "/unauthenticated/js/codemirror/mode/%N/%N.js";
        var c = null,
            d = "text/plain",
            h = !1;
        v___location_path == v___location_prefix + "/custom/view.cgi" ? h = $('form[action="save.cgi"]').find(".table-title").find("tt").text() : $('body[class^="' + v___module_file_manager + '"]').length ? (h = t.replace(/<(?:.|\n)*?>/gm, "").replace(/ *\([^)]*\) */g, ""), t = h) : h = $('select[name="file"]').val();
        var p, f = t || h;
        if (p = /.+\.([^.]+)$/.exec(f))(g = CodeMirror.findModeByExtension(p[1])) && (c = g.mode, d = g.mime);
        else if (/\//.test(f)) {
            var g = CodeMirror.findModeByMIME(f);
            g && (c = g.mode, d = f)
        } else c = null, d = "text/plain";
        if ("apache" == $page || "postfix" == $page || "dovecot" == $page || "spam" == $page || "virtualmin-nginx" == $page || "sendmail" == $page || "samba" == $page || "proftpd" == $page || "fail2ban" == $page || "sshd" == $page || "squid" == $page || "ldap-server" == $page ? (c = "rpm", d = "rpm-spec") : "phpini" == $page ? (c = "z80", d = "text/x-z80") : "bind8" == $page || "procmail" == $page || Core.curModuleFile("virtual-server", "manual_records.cgi") ? (c = "clike", d = "text/x-java") : "virtual-server" == $page && "body" == $(this).attr("name") && (c = "htmlmixed", d = "text/html"), $current_file = v___location_path.replace(/^\//g, ""), $current_file && ($current_file = $current_file.split("/")[1]), editor_init_check() || $(".jsPanel").length || n) {
            CodeMirror.commands.autocomplete = function(e) {
                e.showHint({
                    hint: CodeMirror.hint.anyword
                })
            }, window["__cm_editor_" + a] = CodeMirror.fromTextArea(o, {
                tabMode: "indent",
                matchBrackets: !0,
                lineNumbers: !0,
                keyMap: "sublime",
                highlightSelectionMatches: {
                    showToken: /\w/,
                    annotateScrollbar: !0
                },
                lineWrapping: !0,
                indentUnit: 0,
                autofocus: !0,
                foldGutter: !0,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                },
                styleActiveLine: !0,
                theme: v___theme_night_mode ? "monokai" : settings_cm_editor_palette
            }), window["__cm_editor_" + a].setOption("mode", d), "rpm" != c && CodeMirror.autoLoadMode(window["__cm_editor_" + a], c), setTimeout(function() {
                $("body").find(".jsPanel").length || $(".CodeMirror").before('<i class="fa fa-fw fa-lg fa-question-circle text-muted -helper __helper"></i>');
                var e = $(".fa.fa-question-circle.__helper, .__helper___");
                e.popover({
                    container: "body",
                    placement: "auto left",
                    title: '<button type="button" class="close pull-right close-popover-trigger font-size-120p">&times;</button>' + theme_language("theme_xhred_editor_help_title"),
                    content: theme_language("theme_xhred_editor_help_content"),
                    trigger: "click",
                    html: !0
                }), e.on("inserted.bs.popover", function() {
                    $("body").find(".theme_xhred_editor_help").parents(".popover").addClass("_helper")
                })
            }, 100), s && window["__cm_editor_" + a].on("change", function(e, t) {
                set_onbeforeunload_status(1, 0)
            });
            var u = $(".container-fluid > .panel > .panel-body").attr("data-cm-line"),
                m = $(".container-fluid > .panel > .panel-body").attr("data-cm-state");
            _ && u && __cm_editor_static.setCursor(parseInt(u.split(",")[0]), parseInt(u.split(",")[1])), "edit_cron.cgi" != $current_file && v___location_path != v___location_prefix + "/virtualmin-password-recovery/" && v___location_path != v___location_prefix + "/bind8/forward_form.cgi" && ($resize = i || 2.8, i ? (window["__cm_editor_" + a].on("change", function(t, i) {
                e.val(window["__cm_editor_" + a].getValue()), $(":focus").parents(".jsPanel").is(".jsPanel") && ($(":focus").parents(".jsPanel").find("._filemanager_file_editor_save").addClass("text-danger __locked__"), $(":focus").parents(".jsPanel").find("select[data-encoding]").addClass("pointer-events-none"))
            }), window["__cm_editor_" + a].setSize($resize[0], $resize[1])) : ($window_height = $(window).outerHeight() - $(window).outerHeight() / $resize, window["__cm_editor_" + a].setSize(null, $window_height), $(window).resize(function() {
                $window_height = $(window).outerHeight() - $(window).outerHeight() / $resize, window["__cm_editor_" + a].setSize(null, $window_height)
            }))), $(".sub_table_container").find(".CodeMirror").length && ($(".sub_table_container").addClass("xcontent-force-no-styling"), $(".panel-body").addClass("xqcontent-forced")), editor_background_save(_ && !!u && "true" == m)
        }
    }))
}

function viewer_init_check() {
    return $('body[class^="syslog"]').length && v___location_query && v___location_query.indexOf("view=1") > -1 ? 1 : 0
}

function viewer_init() {
    if ($("pre[data-cm-viewer]").remove(), !$(".panel-body pre").find("i").length) {
        var e = !1;
        $(".panel-body pre").each(function(t, i) {
            var a = $(this),
                n = Convert.htmlStrip(a.html());
            a.addClass("hidden"), a.after("<pre data-cm-viewer data-cm-viewer-id-" + (t + 1) + "></pre>"), $target = $("pre[data-cm-viewer-id-" + (t + 1) + "]"), e = CodeMirror($target[0], {
                value: n,
                lineNumbers: !1,
                mode: null,
                theme: v___theme_night_mode ? "monokai" : settings_cm_editor_palette,
                readOnly: !0
            })
        }).promise().done(function() {})
    }
}

function notifications(e, t, i) {
    if (settings_side_slider_enabled && settings_side_slider_notifications_enabled) {
        var e = Convert.htmlUnEscape($.trim(e.replace(/(<([^>]+)>)/gi, ""))).replace(/\s+/g, " "),
            t = Convert.htmlUnEscape($.trim(t.replace(/(<([^>]+)>)/gi, ""))).replace(/\s+/g, " ");
        "granted" === Notification.permission ? new Notification(e, {
            body: t,
            icon: v___location_prefix + "/images/notifications_" + i + ".png"
        }).onclick = function() {
            window.focus()
        } : "denied" !== Notification.permission && Notification.requestPermission(function(a) {
            "granted" === a && (new Notification(e, {
                body: t,
                icon: v___location_prefix + "/images/notifications_" + i + ".png"
            }).onclick = function() {
                window.focus()
            })
        })
    }
}

function session_check(e) {
    e && ("auth-required=1" === e.getResponseHeader("Auth-type") || e.responseText && e.responseText.indexOf("reset-fonts-grids-base") > -1 && e.responseText.indexOf("window.top.location = window.location;") > -1) && (v___available_session = 0, window.location.href = location.origin + v___location_prefix)
}

function unbuffered_header_post(e) {
    if (Test.strContains(e.responseText, "theme_post_save")) {
        var t = e.responseText.match(/theme_post_save(.*)$/gm);
        t && navigation_update(t[0].split("=")[1])
    }
}

function unbuffered_header_processor_allow(e) {
    var t = URI(v___location).path();
    return void 0 !== e && (t = e), t && Test.strContains(t, ".cgi") && (Test.strContains(t, "webmin/install_theme.cgi") || Test.strContains(t, "usermin/install_theme.cgi") || t.indexOf("/virtual-server/import.cgi") > -1 || t.indexOf("/virtual-server/edit_newlinks.cgi") > -1 || t.indexOf("/virtual-server/postsave.cgi") > -1 || t.indexOf("/virtual-server/validate.cgi") > -1 || t.indexOf("/server-manager/edit_serv.cgi") > -1 || t.indexOf("/server-manager/save_serv.cgi") > -1 || t.indexOf("/server-manager/index.cgi") > -1 || t.indexOf("/server-manager/list_ifaces.cgi") > -1 || t.indexOf("/server-manager/mass_update.cgi") > -1 || t.indexOf("/server-manager/get_images.cgi") > -1 || t.indexOf("/server-manager/edit_newlinks.cgi") > -1 || t.indexOf("/server-manager/list_gces.cgi") > -1 || t.indexOf("/server-manager/list_ec2s.cgi") > -1 || t.indexOf("/server-manager/unpause.cgi") > -1 || t.indexOf("/server-manager/find.cgi") > -1 || t.indexOf("useradmin/batch_exec.cgi") > -1 || t.indexOf("useradmin/gbatch_exec.cgi") > -1 || t.indexOf("useradmin/mass_delete_user.cgi") > -1 || t.indexOf("virtual-server/domain_setup.cgi") > -1 || t.indexOf("virtual-server/upgrade.cgi") > -1 || t.indexOf("virtual-server/mass_create.cgi") > -1 || t.indexOf("virtual-server/restore.cgi") > -1 || t.indexOf("virtual-server/save_newip.cgi") > -1 || t.indexOf("virtual-server/mass_domains_change.cgi") > -1 || t.indexOf("virtual-server/save_domain.cgi") > -1 || t.indexOf("virtual-server/backup.cgi") > -1 || t.indexOf("virtual-server/save_phpmode.cgi") > -1 || t.indexOf("virtual-server/script_install.cgi") > -1 || t.indexOf("virtual-server/mass_change.cgi") > -1 || t.indexOf("virtual-server/save_ratelimit.cgi") > -1 || t.indexOf("virtual-server/mass_scripts.cgi") > -1 || t.indexOf("virtual-server/mass_upgrade.cgi") > -1 || t.indexOf("virtual-server/save_newips.cgi") > -1 || t.indexOf("virtual-server/letsencrypt.cgi") > -1 || t.indexOf("virtual-server/migrate.cgi") > -1 || t.indexOf("virtual-server/save_mail.cgi") > -1 || t.indexOf("virtual-server/mass_delete_domains.cgi") > -1 || t.indexOf("virtual-server/delete_domain.cgi") > -1 || t.indexOf("virtual-server/unscript_install.cgi") > -1 || t.indexOf("virtual-server/mass_uninstall.cgi") > -1 || t.indexOf("virtual-server/clone.cgi") > -1 || t.indexOf("virtual-server/fix_symlinks.cgi") > -1 || t.indexOf("virtual-server/disable_domain.cgi") > -1 || t.indexOf("virtual-server/delete_databases.cgi") > -1 || t.indexOf("virtual-server/move.cgi") > -1 || t.indexOf("virtual-server/enable_domain.cgi") > -1 || t.indexOf("virtual-server/transfer.cgi") > -1 || t.indexOf("virtual-server/mass_disable.cgi") > -1 || t.indexOf("virtual-server/rename.cgi") > -1 || t.indexOf("virtual-server/save_dbname.cgi") > -1 || t.indexOf("virtual-server/mass_enable.cgi") > -1 || t.indexOf("virtual-server/save_frame.cgi") > -1 || t.indexOf("virtual-server/check.cgi") > -1 || t.indexOf("virtual-server/save_newchroot.cgi") > -1 || t.indexOf("virtual-server/enable_dkim.cgi") > -1 || t.indexOf("virtual-server/save_proxy.cgi") > -1 || t.indexOf("virtual-server/save_dbpass.cgi") > -1 || t.indexOf("virtual-server/save_dbhosts.cgi") > -1 || t.indexOf("virtual-server/unalias.cgi") > -1 || t.indexOf("virtual-server/save_newautoconfig.cgi") > -1 || t.indexOf("virtual-server/quotacheck.cgi") > -1 || t.indexOf("virtual-server/unsub.cgi") > -1 || t.indexOf("virtual-server/save_domdkim.cgi") > -1 || t.indexOf("virtual-server/fix_modphp.cgi") > -1 || t.indexOf("virtual-server/connectivity.cgi") > -1 || t.indexOf("virtual-server/all_webmin.cgi") > -1 || t.indexOf("virtualmin-support/send_ticket.cgi") > -1 || t.indexOf("virtualmin-support/enable_login.cgi") > -1 || t.indexOf("virtualmin-support/disable_login.cgi") > -1 || t.indexOf("server-manager/create.cgi") > -1 || t.indexOf("server-manager/mass.cgi") > -1 || t.indexOf("server-manager/manual_image.cgi") > -1 || t.indexOf("server-manager/save_limits.cgi") > -1 || t.indexOf("server-manager/upgrade.cgi") > -1 || t.indexOf("server-manager/empty.cgi") > -1 || t.indexOf("server-manager/save_pass.cgi") > -1 || t.indexOf("server-manager/create_image.cgi") > -1 || t.indexOf("server-manager/restore.cgi") > -1 || t.indexOf("server-manager/clone.cgi") > -1 || t.indexOf("server-manager/scan.cgi") > -1 || t.indexOf("server-manager/add.cgi") > -1 || t.indexOf("server-manager/gcescan.cgi") > -1 || t.indexOf("server-manager/create_gceattach.cgi") > -1 || t.indexOf("server-manager/ec2scan.cgi") > -1 || t.indexOf("server-manager/create_domain.cgi") > -1 || t.indexOf("server-manager/restore_domain.cgi") > -1 || t.indexOf("server-manager/create_ec2attach.cgi") > -1 || t.indexOf("server-manager/newami.cgi") > -1 || t.indexOf("server-manager/move_disk.cgi") > -1 || t.indexOf("server-manager/convert_image.cgi") > -1 || t.indexOf("server-manager/save_vcpus.cgi") > -1 || t.indexOf("server-manager/boot.cgi") > -1 || t.indexOf("server-manager/delete_backuplogs.cgi") > -1 || t.indexOf("server-manager/mass_script.cgi") > -1 || t.indexOf("server-manager/save_ec2address.cgi") > -1 || t.indexOf("server-manager/mass_move.cgi") > -1 || t.indexOf("server-manager/delete_ec2attach.cgi") > -1 || t.indexOf("server-manager/move.cgi") > -1 || t.indexOf("server-manager/backup.cgi") > -1 || t.indexOf("server-manager/create_dimage.cgi") > -1 || t.indexOf("server-manager/massupload.cgi") > -1 || t.indexOf("server-manager/delete_volumes.cgi") > -1 || t.indexOf("server-manager/delete_ec2_snapshots.cgi") > -1 || t.indexOf("server-manager/download.cgi") > -1 || t.indexOf("server-manager/create_gdisk.cgi") > -1 || t.indexOf("server-manager/failover.cgi") > -1 || t.indexOf("server-manager/create_dkvolume.cgi") > -1 || t.indexOf("server-manager/upload.cgi") > -1 || t.indexOf("server-manager/transfer.cgi") > -1 || t.indexOf("server-manager/delete_gceattach.cgi") > -1 || t.indexOf("server-manager/reset.cgi") > -1 || t.indexOf("server-manager/find.cgi") > -1 || t.indexOf("server-manager/create_volume.cgi") > -1 || t.indexOf("server-manager/create_gsnapshot.cgi") > -1 || t.indexOf("server-manager/create_gimage.cgi") > -1 || t.indexOf("server-manager/exec_vbackup.cgi") > -1 || t.indexOf("server-manager/unpause.cgi") > -1 || t.indexOf("server-manager/pause.cgi") > -1 || t.indexOf("server-manager/create_ec2_snapshot.cgi") > -1 || t.indexOf("server-manager/delete_addresses.cgi") > -1 || t.indexOf("server-manager/exec_vsync.cgi") > -1 || t.indexOf("server-manager/create_address.cgi") > -1 || t.indexOf("cluster-usermin/upgrade.cgi") > -1 || t.indexOf("cluster-usermin/install.cgi") > -1 || t.indexOf("cluster-usermin/update.cgi") > -1 || t.indexOf("ldap-useradmin/batch_exec.cgi") > -1 || t.indexOf("ldap-useradmin/mass_delete_user.cgi") > -1 || t.indexOf("usermin/upgrade.cgi") > -1 || t.indexOf("usermin/update.cgi") > -1 || t.indexOf("cpan/download.cgi") > -1 || t.indexOf("cpan/install.cgi") > -1 || t.indexOf("burner/save_profile.cgi") > -1 || t.indexOf("burner/burn.cgi") > -1 || t.indexOf("bind8/mass_create.cgi") > -1 || t.indexOf("bind8/mass_rcreate.cgi") > -1 || t.indexOf("bind8/mass_delete.cgi") > -1 || t.indexOf("bind8/mass_update.cgi") > -1 || t.indexOf("bind8/zone_dnssecmigrate_dt.cgi") > -1 || t.indexOf("bind8/mass_rdelete.cgi") > -1 || t.indexOf("bind8/enable_zonekey.cgi") > -1 || t.indexOf("bind8/enable_zonedt.cgi") > -1 || t.indexOf("bind8/disable_zonedt.cgi") > -1 || t.indexOf("webalizer/save_log.cgi") > -1 || t.indexOf("bacula-backup/restore.cgi") > -1 || t.indexOf("bacula-backup/backup.cgi") > -1 || t.indexOf("bacula-backup/gbackup.cgi") > -1 || t.indexOf("bacula-backup/label.cgi") > -1 || t.indexOf("bacula-backup/mount.cgi") > -1 || t.indexOf("cluster-software/install_pack.cgi") > -1 || t.indexOf("updown/download.cgi") > -1 || t.indexOf("software/install_pack.cgi") > -1 || t.indexOf("software/do_install.cgi") > -1 || t.indexOf("software/apt_upgrade.cgi") > -1 || t.indexOf("software/rhn_check.cgi") > -1 || t.indexOf("software/yum_upgrade.cgi") > -1 || t.indexOf("software/urpmi_upgrade.cgi") > -1 || t.indexOf("software/csw_upgrade.cgi") > -1 || t.indexOf("software/ports_upgrade.cgi") > -1 || t.indexOf("webmin/letsencrypt.cgi") > -1 || t.indexOf("webmin/delete_webmincron.cgi") > -1 || t.indexOf("webmin/test_sendmail.cgi") > -1 || t.indexOf("package-updates/update.cgi") > -1 || t.indexOf("custom/run.cgi") > -1 || t.indexOf("custom/sql.cgi") > -1 || t.indexOf("virtualmin-init/save.cgi") > -1 || t.indexOf("virtualmin-init/mass.cgi") > -1 || t.indexOf("backup-config/save.cgi") > -1 || t.indexOf("squid/init_cache.cgi") > -1 || t.indexOf("squid/clear.cgi") > -1 || t.indexOf("squid/chown.cgi") > -1 || t.indexOf("ldap-client/check.cgi") > -1 || t.indexOf("sendmail/del_mailqs.cgi") > -1 || t.indexOf("sendmail/flushq.cgi") > -1 || t.indexOf("init/mass_start_stop.cgi") > -1 || t.indexOf("init/mass_launchd.cgi") > -1 || t.indexOf("init/mass_systemd.cgi") > -1 || t.indexOf("init/mass_upstarts.cgi") > -1 || t.indexOf("init/mass_rcs.cgi") > -1 || t.indexOf("init/save_services.cgi") > -1 || t.indexOf("ldap-server/create.cgi") > -1 || t.indexOf("change-user/change.cgi") > -1 || t.indexOf("virtualmin-slavedns/save.cgi") > -1 || t.indexOf("proc/trace.cgi") > -1 || t.indexOf("proc/run.cgi") > -1 || t.indexOf("proc/kill_proc_list.cgi") > -1 || t.indexOf("fsdump/backup.cgi") > -1 || t.indexOf("fsdump/restore.cgi") > -1 || t.indexOf("webmin_search.cgi") > -1 || t.indexOf("security-updates/update.cgi") > -1 || t.indexOf("virtualmin-mailrelay/save.cgi") > -1 || t.indexOf("cluster-copy/exec.cgi") > -1 || t.indexOf("cron/exec_cron.cgi") > -1 || t.indexOf("virtualmin-registrar/import.cgi") > -1 || t.indexOf("virtualmin-registrar/save_ns.cgi") > -1 || t.indexOf("virtualmin-registrar/transfer.cgi") > -1 || t.indexOf("virtualmin-registrar/renew.cgi") > -1 || t.indexOf("virtualmin-registrar/create.cgi") > -1 || t.indexOf("htaccess-htpasswd/search.cgi") > -1 || t.indexOf("acl/makedn.cgi") > -1 || t.indexOf("acl/cert_issue.cgi") > -1 || t.indexOf("acl/maketables.cgi") > -1 || t.indexOf("acl/schema.cgi") > -1 || t.indexOf("filter/move.cgi") > -1 || t.indexOf("fetchmail/check.cgi") > -1 || t.indexOf("servers/find.cgi") > -1 || t.indexOf("cluster-cron/exec.cgi") > -1 || t.indexOf("raid/mkfs.cgi") > -1 || t.indexOf("lvm/pvmove.cgi") > -1 || t.indexOf("lvm/mkfs.cgi") > -1 || t.indexOf("ppp-client/init.cgi") > -1 || t.indexOf("fdisk/mkfs.cgi") > -1 || t.indexOf("fdisk/tunefs.cgi") > -1 || t.indexOf("fdisk/fsck.cgi") > -1 || t.indexOf("spam/deleteall_awl.cgi") > -1 || t.indexOf("quota/check_quotas.cgi") > -1 || t.indexOf("virtualmin-awstats/generate.cgi") > -1 || t.indexOf("postfix/flushq.cgi") > -1 || t.indexOf("status/delete_mons.cgi") > -1 || t.indexOf("status/refresh.cgi") > -1 || t.indexOf("/webmin/upgrade.cgi") > -1) ? 1 : 0
}

function unbuffered_header_processor_allow_scroll() {
    var e = ["webmin_search.cgi"];
    return Test.arrContains(e, v___location_file) ? 0 : 1
}

function unbuffered_header_processor(e, t) {
    if (t) {
        var i = e,
            a = $(i.target),
            n = i.target.action,
            s = $(document.activeElement).attr("name"),
            r = $.trim(document.activeElement.innerText),
            _ = document.activeElement.value;
        a.find('input[name="' + s + '"]') && a.find('input[name="' + s + '"]').val() == (r || _) || $("<input>").attr({
            type: "hidden",
            name: s,
            value: r || _
        }).appendTo(a);
        var o = Test.strContains(a.attr("enctype"), "multipart/form-data"),
            l = o ? new FormData(a[0]) : a.serialize();
        if (o || (l = Test.strContains(l, s + "=") ? l : l + "&" + s + "=" + _), $("input:file:visible").val()) return v___theme_force_buffered = 1, void a.submit()
    }
    var c = 0,
        d = 0,
        h = t ? n : e,
        p = 0,
        f = $('div[data-dcontainer="1"] > .panel.panel-default').clone();
    NProgress.start(), set_onbeforeunload_status(1, 1), progressive_request = $.ajax({
        xhr: function() {
            var e = new window.XMLHttpRequest;
            return e.addEventListener("progress", function(e) {
                var t = e.target.responseText,
                    i = $(t).filter('div[data-dcontainer="1"]').html();
                if (!!i && d++, 0 === p && (window.history.pushState(null, "", e.currentTarget.responseURL + (Test.strContains(e.currentTarget.responseURL, "?") ? "&" : "?") + $__theme_navigation), p = 1, $(window).on("popstate.unbuffered", function() {
                        $('.container-fluid[data-dcontainer="1"]').html(f), $(this).unbind("popstate.unbuffered"), setTimeout(function() {
                            get_pjax_event_end_funcs(0)
                        }, 40)
                    })), d > 3 && !c) i && ($('div[data-dcontainer="1"]').html(i), c++, unbuffered_header_processor_allow_scroll() && ($(".__page").hasScrollBar() ? $(".__page").scrollTop($(".__page")[0].scrollHeight) : $(".__page").scrollTop(0)), $(".__page").addClass("progressing"), get_pjax_event_end(!1, e.target));
                else if (c) {
                    var a = extract_content(t, '<div class="panel-body">', "</div>", 0);
                    a && $('div[data-dcontainer="1"]').find(".panel-body").html(a), unbuffered_header_processor_allow_scroll() && $(".__page").scrollTop($(".__page")[0].scrollHeight)
                }
            }, !1), e
        },
        type: get_pjax_type(a || h),
        url: h,
        processData: !t || !o,
        contentType: (!t || !o) && "application/x-www-form-urlencoded; charset=UTF-8",
        data: !!t && l,
        complete: function(e) {
            $('div[data-dcontainer="1"]').html($(e.responseText).filter('div[data-dcontainer="1"]').html()), get_pjax_event_end(!1, e), unbuffered_header_processor_allow_scroll() && $(".__page").scrollTop($(".__page")[0].scrollHeight), $(".__page").removeClass("progressing"), NProgress.done(), set_onbeforeunload_status(0, 1), unbuffered_header_post(e), Core.curModuleFile("package-updates", "update.cgi") && information_update()
        }
    })
}

function check_selected_text() {
    return getSelection ? getSelection().toString() : document.selection ? document.selection.createRange().text : ""
}

function check_location_resource(e) {
    return v___location_resource === e
}

function check_current_file(e) {
    return v___location_file == e
}
browser.internet_explorer_version() > 5 && browser.internet_explorer_version() <= 11 && (setTimeout(function() {
        var e = "<p>" + theme_language("theme_xhred_browser_warning") + "</p>";
        theme_alert(theme_language("theme_xhred_global_warning"), e, !1, "md", "danger", !1, "10 modal-ie-warning", 0)
    }, 2e3), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        var i = this.toString();
        ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > i.length) && (t = i.length), t -= e.length;
        var a = i.lastIndexOf(e, t);
        return -1 !== a && a === t
    }), String.prototype.startsWith || String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
        return t = t || 0, this.indexOf(e, t) === t
    })), Object.defineProperty(Array.prototype, "reOrder", {
        enumerable: !1,
        value: function(e, t) {
            if (t >= this.length)
                for (var i = t - this.length; 1 + i--;) this.push(void 0);
            return this.splice(t, 0, this.splice(e, 1)[0]), this
        }
    }), jQuery.fn.simulateUserClick = function() {
        return this.each(function() {
            if ("createEvent" in document) {
                var e = this.ownerDocument,
                    t = e.createEvent("MouseEvents");
                t.initMouseEvent("click", !0, !0, e.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), this.dispatchEvent(t)
            } else this.click()
        })
    },
    function(e) {
        e.fn.replaceTagName = function(t) {
            for (var i = [], a = this.length; a--;) {
                for (var n = document.createElement(t), s = this[a], r = s.attributes, _ = r.length - 1; _ >= 0; _--) {
                    var o = r[_];
                    n.setAttribute(o.name, o.value)
                }
                n.innerHTML = s.innerHTML, e(s).after(n).remove(), i[a - 1] = n
            }
            return e(i)
        }
    }(jQuery), jQuery.fn.selectText = function() {
        var e = document,
            t = this[0];
        if (e.body.createTextRange)(a = document.body.createTextRange()).moveToElementText(t), a.select();
        else if (window.getSelection) {
            var i = window.getSelection(),
                a = document.createRange();
            a.selectNodeContents(t), i.removeAllRanges(), i.addRange(a)
        }
    },
    function(e) {
        e.fn.replaceText = function(t, i, a) {
            return this.each(function() {
                var n, s, r = this.firstChild,
                    _ = [];
                if (r)
                    do {
                        3 === r.nodeType && (s = (n = r.nodeValue).replace(t, i)) !== n && (!a && /</.test(s) ? (e(r).before(s), _.push(r)) : r.nodeValue = s)
                    } while (r = r.nextSibling);
                _.length && e(_).remove()
            })
        }
    }(jQuery), jQuery.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height()
    }, $.fn.toggleCheckbox = function() {
        "checkbox" == $(this).attr("type") && $(this).prop("checked", !$(this).is(":checked"))
    }, jQuery.fn.confirmation = function(e, t) {
        return e = $.extend({
            className: "btn-danger",
            timeout: 2500
        }, e), $(this).each(function(i, a) {
            function n() {
                r.removeClass(e.className).data("confirmed", !1).find(".tmp_question").remove()
            }
            var s, r = $(a);
            r.html();
            r.data("confirmed", !1), r.on("click.confirm", function(i) {
                i.preventDefault(), r.data("confirmed") ? (t.call(r, i), n()) : (r.data("confirmed", !0), r.append('<em class="tmp_question">?</em>').addClass(e.className).bind("mouseout.confirm", function() {
                    s = setTimeout(n, e.timeout)
                }).bind("mouseover.confirm", function() {
                    clearTimeout(s)
                }))
            }).removeClass(e.className)
        }), $(this)
    }, RegExp.quote = function(e) {
        return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }, $(function() {
        var e, t = ".blinking-default:not(.hidden)";
        setInterval(function() {
            0 == e ? ($(t).css("opacity", "1"), e = 1) : (e = 1) && ($(t).css("opacity", "0"), e = 0)
        }, 900)
    });