/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
if (get_server_data("debug")) {
    if ("object" == typeof localStorage) try {
        localStorage.setItem("d41d8cd98f00", 1), localStorage.removeItem("d41d8cd98f00"), $_v__ls__a = 1
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem, Storage.prototype.setItem = function() {}, $_v__ls__a = 0
    }
    if (page_init(), $___________lrs_r_l = 0, $___________left = v___available_navigation ? 1 : 0, "undefined" == typeof settings_mailbox_slash_delimiter && (settings_mailbox_slash_delimiter = !0), "undefined" == typeof settings_right_reload && (settings_right_reload = !0), "undefined" == typeof settings_right_default_tab_usermin && (settings_right_default_tab_usermin = "/"), "undefined" == typeof settings_right_virtualmin_default && (settings_right_virtualmin_default = "sysinfo.cgi"), "undefined" == typeof settings_right_cloudmin_default && (settings_right_cloudmin_default = "sysinfo.cgi"), "undefined" == typeof settings_font_family && (settings_font_family = 0), "undefined" == typeof settings_navigation_color && (settings_navigation_color = "blue"), "undefined" == typeof settings_background_color && (settings_background_color = "gainsboro"), "undefined" == typeof settings_hide_top_loader && (settings_hide_top_loader = !1), "undefined" == typeof settings_show_night_mode_link && (settings_show_night_mode_link = !0), "undefined" == typeof settings_theme_options_button && (settings_theme_options_button = !0), "undefined" == typeof settings_leftmenu_button_refresh && (settings_leftmenu_button_refresh = !1), "undefined" == typeof settings_cm_view_palette && (settings_cm_view_palette = "monokai"), "undefined" == typeof settings_cm_editor_palette && (settings_cm_editor_palette = "monokai"), "undefined" == typeof settings_side_slider_palette && (settings_side_slider_palette = "grey"), "undefined" == typeof settings_side_slider_enabled && (settings_side_slider_enabled = !0), "undefined" == typeof settings_side_slider_fixed && (settings_side_slider_fixed = !1), "undefined" == typeof settings_side_slider_sysinfo_enabled && (settings_side_slider_sysinfo_enabled = !0), "undefined" == typeof settings_side_slider_notifications_enabled && (settings_side_slider_notifications_enabled = !0), "undefined" == typeof settings_side_slider_favorites_enabled && (settings_side_slider_favorites_enabled = !0), config_portable_module_filemanager_hide_actions = "undefined" == typeof localStorage || "false" != localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_hide_actions"), config_portable_module_filemanager_hide_toolbar = "undefined" != typeof localStorage && "true" == localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_hide_toolbar"), config_portable_module_filemanager_hovered_toolbar = "undefined" != typeof localStorage && "true" == localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_hovered_toolbar"), config_portable_module_filemanager_notification_type = "undefined" != typeof localStorage && localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_notification_type") ? localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_notification_type") : 2, config_portable_module_filemanager_calculate_size = "undefined" != typeof localStorage && "true" == localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_calculate_size"), config_portable_module_filemanager_switch_user = "undefined" == typeof localStorage || "false" != localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_switch_user"), config_portable_module_filemanager_remember_tabs = "undefined" == typeof localStorage || "false" != localStorage.getItem(v___server_hostname + "-config_portable_module_filemanager_remember_tabs"), config_portable_module_xsql_fit_content_screen_height = "undefined" != typeof localStorage && "true" == localStorage.getItem(v___server_hostname + "-config_portable_module_xsql_fit_content_screen_height"), "undefined" == typeof settings_hotkeys_active && (settings_hotkeys_active = !0), "undefined" == typeof settings_button_tooltip && (settings_button_tooltip = !0), "undefined" == typeof settings_hotkey_toggle_modifier && (settings_hotkey_toggle_modifier = "altKey"), "undefined" == typeof settings_hotkey_toggle_key_webmin && (settings_hotkey_toggle_key_webmin = "w"), "undefined" == typeof settings_hotkey_toggle_key_virtualmin && (settings_hotkey_toggle_key_virtualmin = "v"), "undefined" == typeof settings_hotkey_toggle_key_cloudmin && (settings_hotkey_toggle_key_cloudmin = "c"), "undefined" == typeof settings_hotkey_toggle_key_usermin && (settings_hotkey_toggle_key_usermin = "u"), "undefined" == typeof settings_hotkey_toggle_key_webmail && (settings_hotkey_toggle_key_webmail = "m"), "undefined" == typeof settings_hotkey_toggle_key_night_mode && (settings_hotkey_toggle_key_night_mode = "l"), "undefined" == typeof settings_hotkey_shell && (settings_hotkey_shell = "k"), "undefined" == typeof settings_hotkey_sysinfo && (settings_hotkey_sysinfo = "i"), "undefined" == typeof settings_hotkey_favorites && (settings_hotkey_favorites = "f"), "undefined" == typeof settings_hotkey_focus_search && (settings_hotkey_focus_search = "s"), "undefined" == typeof settings_hotkey_toggle_slider && (settings_hotkey_toggle_slider = "n"), "undefined" == typeof settings_hotkey_reload && (settings_hotkey_reload = "r"), "undefined" == typeof settings_global_passgen_format && (settings_global_passgen_format = "12|a-z,A-Z,0-9,#"), "undefined" == typeof settings_window_replace_timestamps && (settings_window_replace_timestamps = !0), "undefined" == typeof settings_window_replaced_timestamp_format_full && (settings_window_replaced_timestamp_format_full = "LLLL"), "undefined" == typeof settings_window_replaced_timestamp_format_short && (settings_window_replaced_timestamp_format_short = "L, LTS"), "undefined" == typeof settings_leftmenu_vm_cm_dropdown_icons && (settings_leftmenu_vm_cm_dropdown_icons = !0), "undefined" == typeof settings_hotkey_custom_1 && (settings_hotkey_custom_1 = !1), "undefined" == typeof settings_hotkey_custom_2 && (settings_hotkey_custom_2 = !1), "undefined" == typeof settings_hotkey_custom_3 && (settings_hotkey_custom_3 = !1), "undefined" == typeof settings_hotkey_custom_4 && (settings_hotkey_custom_4 = !1), "undefined" == typeof settings_hotkey_custom_5 && (settings_hotkey_custom_5 = !1), "undefined" == typeof settings_hotkey_custom_6 && (settings_hotkey_custom_6 = !1), "undefined" == typeof settings_hotkey_custom_7 && (settings_hotkey_custom_7 = !1), "undefined" == typeof settings_hotkey_custom_8 && (settings_hotkey_custom_8 = !1), "undefined" == typeof settings_hotkey_custom_9 && (settings_hotkey_custom_9 = !1), "undefined" == typeof settings_side_slider_background_refresh_time && (settings_side_slider_background_refresh_time = 5), "undefined" == typeof settings_leftmenu_width && (settings_leftmenu_width = 260), "undefined" == typeof settings_sysinfo_easypie_charts && (settings_sysinfo_easypie_charts = !0), "undefined" == typeof settings_sysinfo_easypie_charts_size ? settings_sysinfo_easypie_charts_size = 172 : settings_sysinfo_easypie_charts_size = parseInt(settings_sysinfo_easypie_charts_size), "undefined" == typeof settings_sysinfo_easypie_charts_width ? settings_sysinfo_easypie_charts_width = 4 : settings_sysinfo_easypie_charts_width = parseInt(settings_sysinfo_easypie_charts_width), "undefined" == typeof settings_sysinfo_easypie_charts_scale ? settings_sysinfo_easypie_charts_scale = 8 : settings_sysinfo_easypie_charts_scale = parseInt(settings_sysinfo_easypie_charts_scale), "undefined" == typeof settings_sysinfo_theme_updates && (settings_sysinfo_theme_updates = !1), "undefined" == typeof settings_sysinfo_theme_patched_updates && (settings_sysinfo_theme_patched_updates = !1), "undefined" == typeof settings_sysinfo_csf_updates && (settings_sysinfo_csf_updates = !1), "undefined" == typeof settings_sysinfo_link_mini && (settings_sysinfo_link_mini = !1), "undefined" == typeof settings_loader_top && (settings_loader_top = !0), "undefined" == typeof settings_animation_left && (settings_animation_left = !0), settings_animation_left ? $settings_animation_left_slide_time = 180 : $settings_animation_left_slide_time = 0, "undefined" == typeof settings_animation_tabs && (settings_animation_tabs = !0), settings_animation_tabs ? $settings_animation_tabs_slide_time = 180 : $settings_animation_tabs_slide_time = 0, "undefined" == typeof settings_show_terminal_link && (settings_show_terminal_link = !0), "undefined" == typeof settings_favorites && (settings_favorites = !0), $_v__ls__a ? _v__ls__a = "" : _v__ls__a = " hidden", $(".mobile-menu-toggler:visible").length && set_side_slider_visibility(0), navigation_display(), v___available_navigation ? (page_adjust(settings_leftmenu_width, 0), navigation_lock_width()) : $("head").append('<style id="__tmp_no_overflow">body {overflow: hidden}</style>'), $("html").on("dblclick", "body", function() {
            1 != $(this).find(".container-fluid").css("opacity") && page_display()
        }), $.support.pjax && v___available_navigation) {
        var $t_av__excluded_selectors = ':not([target="_blank"]):not([href^="#"]):not([data-href^="#"]):not([data-toggle="collapse"]):not([href*="javascript:"]):not(.has-sub):not([data-has-sub-link]):not([onclick])';
        $(document).on("submit", "form", function(e) {
            e.preventDefault(), get_onbeforeunload_status() ? get_onbeforeunload_message(e, this) : get_pjax_action_submit(e, this)
        }), $(document).on("click", "a" + $t_av__excluded_selectors, function(e) {
            get_onbeforeunload_status() ? (e.preventDefault(), get_onbeforeunload_message(e, this)) : get_pjax_action_click(e, this)
        }), $(document).on("pjax:error", function(e, t, i, a, s) {
            if ("error" === i) {
                var n = $.active;
                if (n && ($.active = n - 1), Test.strContains(s.url, "/csf/index.cgi")) return void theme_reload()
            }
        }), $(document).on("pjax:start", function(e, t) {}), $(document).on("pjax:beforeReplace", function(e, t) {}), $(document).on("ready pjax:beforeSend", function(e, t, i) {
            settings_loader_top && NProgress.start(), v___module === v___module_file_manager && "function" == typeof __f_____undel && (jsPanel.closeChildpanels("body"), __f_____undel()), "csf" === v___module && "function" == typeof __c_____undel && __c_____undel(), "mysql" !== v___module && "postgresql" !== v___module || "function" != typeof __sql_____undel || __sql_____undel(), "syslog" === v___module && "number" == typeof refreshTimer && clearInterval(refreshTimer);
            var a = $(e.relatedTarget),
                s = a.attr("href");
            s = s || i.url.replace(v___location_origin, ""), clicked_in_nav_menu = a.parent().is("[data-linked], .favorites-dcontainer, .menu-exclude.ui-sortable-handle") || "object" == typeof i.callback && "reference" === i.callback[0], clicked_in_nav_menu && ((Test.strContains(s, "mysql") || Test.strContains(s, "postgresql")) && get_bundle_sql(), Test.strContains(s, v___module_file_manager) && get_bundle_file_manager(), Test.strContains(s, "csf") && get_bundle_csf()), "object" == typeof i.callback && "beforeSend" === i.callback[0] && (i.callback[3] ? setTimeout(function() {
                window[i.callback[1].apply(this, i.callback[2])]
            }, i.callback[3]) : window[i.callback[1].apply(this, i.callback[2])])
        }), $(document).on("pjax:success", function(e, t, i, a, s) {
            "object" == typeof s.callback && "success" === s.callback[0] && (s.callback[3] ? setTimeout(function() {
                window[s.callback[1].apply(this, s.callback[2])]
            }, s.callback[3]) : window[s.callback[1].apply(this, s.callback[2])])
        }), $(document).on("pjax:complete", function(e, t, i) {
            settings_loader_top && NProgress.done(), t && session_check(t)
        }), $(document).on("ready pjax:end", function(e, t) {
            get_pjax_event_end(e, t)
        }), $(document).on("pjax:popstate", function(e, t) {
            setTimeout(function() {
                get_pjax_event_end_funcs(0)
            }, 40)
        })
    }
    v___available_session && ($.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-get_theme_language=1",
        data: !1,
        dataType: "text",
        async: v___available_navigation,
        success: function(e) {
            get_server_data("language-strings", JSON.parse(e)), "function" == typeof set_side_slider_labels && set_side_slider_labels()
        }
    }), $.ajax({
        type: "GET",
        url: v___location_prefix + "/index.cgi/?xhr-get_available_modules=1",
        data: !1,
        dataType: "text",
        async: v___available_navigation,
        success: function(e) {
            get_server_data("available-modules", JSON.parse(e))
        }
    }), theme_config("load")), $(function() {
        1 === v___initial_load && v___available_navigation && (page_display(), navigation_display());
        var e = window.navigator.userAgent,
            t = !!e.match(/iPad/i) || !!e.match(/iPhone/i),
            a = !!e.match(/WebKit/i),
            s = t && a && !e.match(/CriOS/i) && !e.match(/OPiOS/i);
        navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && navigator.userAgent.match("CriOS");
        if (bind_sameorigin(), s && $("html").css("overflow", "auto"), Core.curModuleFile("syslog", "save_log.cgi") && $(".container-fluid.col-lg-10.col-lg-offset-1").removeClass("col-lg-10 col-lg-offset-1").addClass("margined-top-15"), !v___available_navigation && $(".container-fluid").removeClass("col-lg-10 col-lg-offset-1").addClass("margined-top-15").parents("html").addClass("single_tab"), $("body").on("click", "#quota-virtual-server-collapse a.ui_link, #quota-virtual-server-1-collapse a.ui_link, #bw-virtual-server-collapse a.ui_link, #bw-virtual-server-1-collapse a.ui_link", function() {
                var e = URI.parseQuery(URI($(this).attr("href")).query()).dom,
                    t = "virtualmin";
                $('.switch-toggle input:not([id="open_' + t + '"]):checked').length && set_switch_position(t), setTimeout(function() {
                    $("aside select").val() != e && get_navigation_menu_virtualmin(e)
                }, 300)
            }), $("body").on("click", ".file-input-wrapper", function() {
                var e = $(this).prev('input[type="radio"]').add($(this).parent("td").prev("td").find('input[type="radio"]'));
                1 === e.length && e.prop("checked", !0)
            }), $("body").on("click", '.--to-new-tab, a.ui_link_replaced[href*="search.cgi/webminlog"]', function() {
                $(this).attr("target", "_blank")
            }), $("body").on("click", ".favorites-menu a.menu-exclude-link, .right_pane_favorites_link", function() {
                var e = Test.strContains($(this).attr("href"), "/virtual-server/") ? "dom" : !!Test.strContains($(this).attr("href"), "/server-manager/") && "id",
                    t = Test.strContains($(this).attr("href"), "gparent") ? "gparent" : e,
                    i = URI.parseQuery(URI($(this).attr("href")).query())[t],
                    a = "dom" === e ? "virtualmin" : "id" === e ? "cloudmin" : "webmin",
                    s = $('.switch-toggle input:not([id="open_' + a + '"]):checked').length;
                s && set_switch_position(a), e ? setTimeout(function() {
                    $("aside select").val() != i && ("dom" === e ? get_navigation_menu_virtualmin(i) : "id" === e && get_navigation_menu_cloudmin(i))
                }, 300) : s && get_navigation_menu_webmin()
            }), $(document).on("click", function(e) {
                $(e.target).attr("class") && 0 === $(e.target).attr("class").indexOf("select2") || $("aside select") && $("aside select").length > 0 && $("aside select").hasClass("select2-hidden-accessible") && $("aside select").select2("close")
            }), $("a").each(function() {
                $(this).find("img").length && $(this).css("text-decoration", "none")
            }), $("body").on("keydown", function(e) {
                var t = e.keyCode ? e.keyCode : e.which,
                    i = String.fromCharCode(t).toLowerCase();
                $('aside input[name="search"]').is(":focus") || $(".-shell-port-").hasClass("opened") || v___location_path != v___location_prefix + "/server-manager/gvnc.cgi" && v___location_path != v___location_prefix + "/server-manager/login.cgi" && v___location_path != v___location_prefix + "/telnet/" && v___location_path != v___location_prefix + "/telnet/index.cgi" && v___location_path != v___location_prefix + "/stunnel/" && v___location_path != v___location_prefix + "/stunnel/index.cgi" && ($("input").is(":focus") || $("select").is(":focus") || $("textarea").is(":focus") || $(".modal.in").length || !i || !/[a-zA-Z0-9]/.test(i) || e.ctrlKey || e.altKey || e.metaKey || 106 === t || 107 === t || 109 === t || 112 === t || 113 === t || 114 === t || 115 === t || 116 === t || 117 === t || 118 === t || 119 === t || 120 === t || 121 === t || 122 === t || 123 === t || ($(".dataTables_filter label input").length ? ($(".btn-filter-top-right").trigger("click"), $(".btn-filter-top-right .dataTable-mirror").focus().trigger("keyup")) : setTimeout(function() {
                    e.shiftKey && "1" == i ? $('aside input[name="search"]').focus().val("!") : $('aside input[name="search"]').focus().val(i)
                }, 1)))
            }), v___available_navigation && ($(document).ajaxSend(function(e, t, i) {}).ajaxStop(function() {}), $.ajaxSetup({
                complete: function(e, t) {
                    session_check(e)
                }
            })), function() {
                if ("function" == typeof Messenger.Message) {
                    var e, t, i, a = {}.hasOwnProperty,
                        s = function(e, t) {
                            function i() {
                                this.constructor = e
                            }
                            for (var s in t) a.call(t, s) && (e[s] = t[s]);
                            return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
                        };
                    e = jQuery, i = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>', t = function(t) {
                        function a() {
                            return a.__super__.constructor.apply(this, arguments)
                        }
                        return s(a, t), a.prototype.template = function(t) {
                            var s;
                            return (s = a.__super__.template.apply(this, arguments)).append(e(i)), s
                        }, a
                    }(Messenger.Message), Messenger.themes.air = {
                        Message: t
                    }, Messenger.options = {
                        extraClasses: "messenger-fixed messenger-on-bottom",
                        theme: "air"
                    }
                }
            }.call(this), v___available_navigation) {
            0 == v___user_level && settings_side_slider_enabled && settings_side_slider_fixed && get_server_data("data-slider-fixed", "1"), 1 === v___initial_load && (console.log("Welcome to Authentic Theme " + (v___theme_version_git || v___theme_version) + "\nhttps://github.com/qooob/authentic-theme"), setTimeout(function() {
                $t_uri_virtualmin && (get_navigation_menu_virtualmin_summary(), get_default_virtualmin_content(!1)), $t_uri_cloudmin && get_default_cloudmin_content(!1), $t_uri_virtualmin || $t_uri_cloudmin || get_default_content()
            }, 20), $.each(theme_config("get_options"), function(e, t) {
                localStorage.setItem(v___server_hostname + "-" + t, window[t])
            }), navigation_select_label(), setTimeout(function() {
                fetch_right_pane_favorites()
            }, 300)), $("body").on("focus", ".sidebar-search", function() {
                navigation_init_autocomplete("c", !1)
            }), $("body").on("blur", ".sidebar-search", function() {
                setTimeout(function() {
                    navigation_init_autocomplete("c", !0)
                }, 150)
            });
            information_check();
            settings_loader_top && "object" == typeof NProgress && NProgress.configure({
                showSpinner: !1,
                trickleRate: .09,
                trickleSpeed: 100
            }), navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $("#content").attr("style", "-webkit-overflow-scrolling: touch !important; overflow-y: scroll !important;"), $('a[target="page"][href="link/"]').first().length && $('a[target="page"][href="link/"]').first().attr("target", "blank"), $("aside").on("click", ".select2-container .select2-selection__arrow b", function(e) {
                e.preventDefault(), e.stopPropagation()
            }), $("aside").on("click", 'a[href*="/file/"], a[href*="history.cgi"]', function(e) {
                e.preventDefault(), e.stopPropagation(), window.open($(this).attr("href"), "_blank")
            }), $("body").on("keydown", ".sidebar-search", function(e) {
                if (-1 !== get_server_data("webmail") && 13 == e.keyCode) return e.preventDefault(), !1
            }), $("body").on("click", ".mobile-menu-toggler", function(e) {
                $this = $(this), $("aside").hasClass("hidden-xs") ? ($(this).addClass("selected").find("button").addClass("btn-primary").removeClass("btn-default"), $(".__logo") && ($(".__logo").css("transform", "translate(0px, 0px)"), setTimeout(function() {
                    $(".__logo").transition({
                        y: "-140px"
                    }, 1.5 * $settings_animation_left_slide_time)
                }, 1100)), $this.css("transform", "translate(0px, 0px)"), $("aside").css("transform", "translate(0px, 0px)"), $(".switch-toggle").css("display", "none"), $("aside").removeClass("hidden-xs"), $("aside, .mobile-menu-toggler").transition({
                    x: settings_leftmenu_width
                }, 2.5 * $settings_animation_left_slide_time), $(".switch-toggle").css("display", "table")) : navigation_hide()
            }), $.each($('ul.navigation li.navigation_external a[href^="../servers/link.cgi/"]'), function(e, t) {
                $(this).attr("href", v___location_href + $(this).attr("href").replace("../", "").replace(/\/$/g, ""))
            }), $("body").on("click", '.navigation a[target="page"], .user-links a[target="page"]', function() {
                navigation_hide()
            }), $("body").on("click", ".navigation > li .navigation_external_link", function(e) {
                e.preventDefault(), e.stopPropagation(), b = $(this), window.open(b.attr("href"), "_blank")
            }), $("body").on("click", ".navigation > li:not('.sub-wrapper'):not('.menu-container'):not('.navigation_external'):not([data-linked])", function(e) {
                if (e.preventDefault(), e.stopPropagation(), v___blocked_navigation = 1, "undefined" == typeof $processing && ($processing = !1), !$processing) {
                    $processing = !0;
                    var t = $("a", this).attr("href"),
                        i = $("a", this).attr("target"),
                        a = $(this);
                    i && $(".navigation > li > ul.sub > li").each(function() {
                        $(this).removeClass("sub_active").find("span.current").remove()
                    }), $.when($("#sidebar .navigation > li").each(function() {
                        var e = $(this),
                            t = e.find("a").is("[data-has-sub-link]");
                        e.is(a) || (e.removeClass("active"), "#search" != e.find("a").attr("href") && t && $(e.find("a").attr("href")).slideUp($settings_animation_left_slide_time))
                    })).done(function() {
                        a.hasClass("active") ? a.removeClass("active") : "#hide" != t && !i && a.addClass("active"), setTimeout(function() {
                            $(t).is(":visible") && "#hide" != t && !i ? a.addClass("active") : a.removeClass("active"), $processing = !1
                        }, 2 * $settings_animation_left_slide_time > 0 ? 2 * $settings_animation_left_slide_time : 1), $(t).slideToggle($settings_animation_left_slide_time)
                    }), "#search" == t && $('#sidebar input[name="search"]').focus()
                }
            }), $("body").on("click", ".navigation > li > ul.sub > li:not('.menu-container')", function(e) {
                if (!e.target || !$(e.target).is("li")) {
                    var t = $(this);
                    $(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove(), $(".navigation > li > ul.sub > li").each(function() {
                        $(this).removeClass("sub_active").find("span.current").remove()
                    }), $("#webmin_search_form").find('input[name="search"]').val(""), t.addClass("sub_active").append('<span class="current"></span>')
                }
            }), $(".navigation > li > ul.sub").each(function() {
                "" === $(this).attr("id") && $(this).remove()
            }), $('.switch-toggle label[for^="reserve_empty"]').on("click", function(e) {
                e.preventDefault()
            }), $("body").on("click", 'a[data-refresh="true"]', function(e) {
                e.preventDefault(), get_pjax_content(v___location_resource)
            }), $("body").on("click", function(e) {
                $("ul.dropdown").is(e.target) || 0 !== $("ul.dropdown").has(e.target).length || 0 !== $(".open").has(e.target).length || $("ul.dropdown").removeClass("open")
            }), $(".switch-toggle").on("click", "input.dynamic", function(e) {
                "open_thirdlane" != $(this).attr("id") ? (set_switch_position($(this).attr("id").replace("open_", "")), "open_dashboard" != $(this).attr("id") ? get_navigation_and_content($(this).attr("id").replace("open_", ""), 0, 0) : get_pjax_content(v___location_prefix + "/sysinfo.cgi")) : location.href = v___location_prefix + "/asterisk/index.cgi"
            }), navigation_init_select(), $("aside").mCustomScrollbar({
                axis: "y",
                theme: "minimal",
                scrollInertia: 100,
                scrollButtons: !1,
                callbacks: {
                    onScroll: function() {
                        $(".mobile-menu-toggler").is(":visible") || ($(".form-control.sidebar-search").blur(), $("aside select") && $("aside select").length > 0 && $("aside select").hasClass("select2-hidden-accessible") && $("aside select").select2("close"))
                    }
                }
            }), $(".loader").append('<div class="loader-close" id="loader-close"><i class="fa fa-fw fa-times-circle pull-right hidden"></i></div>'), $("body").on("mouseover", "#loader-close, #loader-close-sm", function() {
                $(this).find(".fa").removeClass("hidden")
            }).on("mouseout", "#loader-close, #loader-close-sm", function() {
                $(this).find(".fa").addClass("hidden")
            }), $("body").on("click", "#loader-close-sm > .fa", function(e) {
                navigation_render_end()
            }), __shell_commands__i__ = 0, $(".form-control.sidebar-search").focus(function(e) {
                $(".__logo").addClass("inited"), e.preventDefault(), e.stopPropagation(), __shell_commands__i__ = 0
            });
            var n = $("body").find(".-shell-port-"),
                o = n.find('input[data-command="true"]'),
                l = n.find("div[data-output]"),
                r = n.find(".-shell-port-container"),
                _ = n.data("autocomplete");
            if ($(window).keydown(function(e) {
                    var t = $("body").find(".-shell-port-").hasClass("opened");
                    if (t || (navigation_focus_search(e), theme_shortcuts(e)), 38 === e.keyCode && (o.is(":focus") && t || $(".form-control.sidebar-search").is(":focus")) && e.preventDefault(), 9 === e.keyCode && o.is(":focus") && t) {
                        if (e.preventDefault(), !_) return;
                        var i = o.val().trim().split(/\s+(?!-)/),
                            a = i.length,
                            s = i[0] && -1 === i[0].indexOf("-") ? 0 : 1,
                            d = i[1] && -1 === i[1].indexOf(":") ? 0 : 1,
                            c = o.val().endsWith(" "),
                            p = "service" === $.trim(i[0]),
                            f = "systemctl" === $.trim(i[0]),
                            g = $.trim(i[0]) && $.trim(i[0]).startsWith("chown"),
                            u = 1 !== i.length || !o.val().length || s || c ? p || f ? "services" : g ? "permissions" : "lists" : "commands";
                        if (!$.trim(o.val()).length) return;
                        var m = o.val(),
                            h = n.find(".-shell-port-pwd").attr("data-pwd");
                        if ("services" === u) {
                            if ("systemctl" === (u = p ? "service" : "systemctl") && 3 !== i.length) return;
                            m = "service" == u ? $.trim(i[1]) : $.trim(i[2]), "service" === $.trim(i[0]) && (2 === i.length && c || 3 === i.length) && (m = 3 === i.length ? "::::" + $.trim(i[1]) + "::::" + $.trim(i[2]) : "::::" + $.trim(i[1]))
                        }
                        if (g) {
                            if (1 === a && !c) return void o.val($.trim(i[0]) + " ");
                            d && $.trim(i[1]) ? c || i[2] ? (u = "lists", m = h + "/::::" + $.trim(i[2])) : (u = "groups", m = $.trim($.trim(i[1]).split(":")[1])) : (u = "users", m = $.trim(i[1]))
                        }
                        "lists" !== u || g || (m = h + "/::::" + $.trim(i[1]) + "::::" + $.trim(i[0]) + "::::" + $.trim(i[2])), $.ajax({
                            type: "POST",
                            url: v___location_prefix + "/index.cgi?xhr-get_autocompletes=1&xhr-get_autocomplete_type=" + u + "&xhr-get_autocomplete_string=" + m,
                            data: !1,
                            dataType: "json",
                            success: function(e) {
                                var t = e.length;
                                if (1 === t)
                                    if ("service" === u || "systemctl" === u || "lists" === u) {
                                        var a = $.trim(i[0]),
                                            s = $.trim(i[0]) + " " + $.trim(i[1]);
                                        "lists" === u ? ("cd" === a && e[0].endsWith("/") || "cd" !== a) && ("cd" === a || "cat" === a ? o.val(a + " " + e[0]) : $.trim(i[2]) ? o.val(s + " " + e[0]) : o.val(a + " " + e[0])) : "service" !== a || 2 !== i.length && 3 !== i.length ? "systemctl" === a && 3 === i.length && o.val(a + " " + $.trim(i[1]) + " " + e[0]) : 2 === i.length ? o.val(a + " " + e[0] + " ") : 3 === i.length && o.val($.trim(i[0]) + " " + $.trim(i[1]) + " " + e[0])
                                    } else g ? d ? c || i[2] ? o.val($.trim(i[0]) + " " + $.trim(i[1]) + " " + e[0]) : o.val($.trim(i[0]) + " " + $.trim($.trim(i[1]).split(":")[0]) + ":" + e[0] + " ") : o.val($.trim(i[0]) + " " + e[0] + ":") : o.val(e[0] + " ");
                                else if (t > 1) {
                                    var n = "<b>" + $(".-shell-port-type").text() + " " + Convert.htmlEscape(o.val()) + "</b>\n";
                                    l.find("pre").append(n), l.find("pre").append(Convert.htmlEscape(e.join("\n") + "\n")), r.scrollTop(r[0].scrollHeight)
                                }
                                setTimeout(function() {
                                    o.focus().mousedown()
                                }, 10)
                            },
                            error: function() {}
                        })
                    }
                }), $(window).keyup(function(e) {
                    var t = $("body").find(".-shell-port-").hasClass("opened");
                    if (t) {
                        var a = 0,
                            s = 0,
                            r = 0,
                            _ = $(".form-control.sidebar-search"),
                            d = $t_uri_cloudmin && $('a[target="page"][href*="/server-manager/save_serv.cgi"][href*="shell=1"]').length,
                            c = 0,
                            p = 0;
                        if (d) p = v___location_prefix + "/server-manager/shell.cgi";
                        else {
                            if (!Core.moduleAvailable("shell")) return;
                            p = v___location_prefix + "/shell/index.cgi"
                        }
                        if ((t || _.is(":focus")) && 8 === e.keyCode && (__shell_commands__i__ = 0), t ? (a = $.trim(o.val()), s = 1, r = 1) : (a = _.val(), s = void 0 !== _.val(), r = 0), (r || s && (!a.trim() || a.trim().startsWith("!"))) && (38 == e.keyCode || 40 == e.keyCode)) {
                            e.preventDefault(), e.stopPropagation(), void 0 === localStorage.getItem(v___server_hostname + "-shell_commands") && localStorage.setItem(v___server_hostname + "-shell_commands", JSON.stringify({}));
                            var f = JSON.parse(localStorage.getItem(v___server_hostname + "-shell_commands")),
                                g = f ? f.length : 0;
                            if (0 === __shell_commands__i__ && !a && 40 == e.keyCode) return;
                            if (0 === __shell_commands__i__ && a && 38 == e.keyCode) return void(c = 1);
                            if (__shell_commands__i__ = 40 == e.keyCode ? ++__shell_commands__i__ : --__shell_commands__i__, __shell_commands__i__ < 0 && 38 === e.keyCode ? __shell_commands__i__ = g - 1 : __shell_commands__i__ > g && (__shell_commands__i__ = 0), f && f[__shell_commands__i__ % g]) {
                                if (!$.isEmptyObject(f) && (__shell_commands__i__ == g && 38 === e.keyCode || __shell_commands__i__ == g && 40 === e.keyCode || c)) return t ? o.val("").focus() : _.val("").focus(), void(__shell_commands__i__ = 0);
                                if (t) {
                                    var u = f[__shell_commands__i__ % g].replace(/^!/, "");
                                    o.val(Convert.htmlUnEscape(u)).focus()
                                }
                            }
                            return
                        }
                        if (s && a.trim().startsWith("!") && 27 == e.keyCode) return e.preventDefault(), e.stopPropagation(), void _.val("").focus();
                        if (s && a.trim().startsWith("!") && 13 == e.keyCode && (_.addClass("_shell_form_"), e.preventDefault(), e.stopPropagation(), 1 == Core.moduleAvailable("shell") || d)) {
                            o.val(a.trim().substring(1)).focus(), theme_shell_open(n);
                            var m = $.Event("keyup");
                            m.keyCode = 13, o.trigger(m)
                        }
                        var h = n.find(".-shell-port-container"),
                            v = n.find(".-shell-port-pwd"),
                            b = v.attr("data-pwd"),
                            y = $.trim(o.val()),
                            k = 0,
                            x = e.keyCode ? e.keyCode : e.which,
                            w = e.altKey && "l" == String.fromCharCode(e.which).toLowerCase();
                        if (27 === x) return void theme_shell_close(n);
                        if (o.is(":focus") || check_selected_text() || (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || o.val(o.val() + String.fromCharCode(e.which).toLowerCase()), o.focus()), (y && 13 === x || w) && (Core.moduleAvailable("shell") || d)) {
                            if (1 === v___shell_processing) return;
                            v___shell_processing = 1, ("clear" == y || "reset" == y || "exit" == y || w) && (l.find("pre").html(""), theme_shell_clear(o), "exit" == y && theme_shell_close(n)), "cd ~" == y && (k = y, y = "cd " + v.attr("data-home"));
                            var C = !1;
                            if ("cd /" == y && (C = "/"), "history -c" == y) {
                                localStorage.setItem(v___server_hostname + "-shell_commands", JSON.stringify({}));
                                D = "<b>" + $(".-shell-port-type").text() + " " + y + "</b>\n";
                                l.find("pre").append(D), theme_shell_clear(o), h.scrollTop(h[0].scrollHeight);
                                var T = '<form class="hidden" role="form" action="' + p + '" method="post" enctype="multipart/form-data">                            ' + (d ? '<input type="hidden" id="id" name="id" value="' + $("#sid").val() + '">' : "") + '                            <input type="hidden" id="clearcmds" name="clearcmds" value="clearcmds">                            <input type="hidden" id="pwd" name="pwd" value="' + b + '">                          </form>',
                                    S = new FormData($(T)[0]);
                                $.ajax({
                                    type: "POST",
                                    url: p + "?stripped=1&stripped=2",
                                    data: S,
                                    dataType: "text",
                                    cache: !1,
                                    contentType: !1,
                                    processData: !1,
                                    success: function(e) {},
                                    error: function(e) {}
                                })
                            } else if (y.startsWith("history")) {
                                theme_shell_clear(o);
                                var j = JSON.parse(localStorage.getItem(v___server_hostname + "-shell_commands")),
                                    I = j ? j.length : 0,
                                    P = I ? I.toString().length : 0,
                                    D = "<b>" + $(".-shell-port-type").text() + " " + y + "</b>\n";
                                $.each($(j), function(e, t) {
                                    var a = e.toString().length,
                                        s = "";
                                    for (i = 0; i < P + 1 - a; i++) s += " ";
                                    "string" == typeof t && (D += e + 1 + s + t + "\n")
                                }).promise().done(function() {
                                    l.find("pre").append(D), h.scrollTop(h[0].scrollHeight)
                                })
                            }
                            if ("clear" == y || "reset" == y || "exit" == y || y.startsWith("history") || w) return v___shell_processing = 0, __shell_commands__i__ = 0, theme_shell_adapt(), void o.focus();
                            var O = '<form class="hidden" role="form" action="' + p + '" method="post" enctype="multipart/form-data">                        ' + (d ? '<input type="hidden" id="id" name="id" value="' + $("#sid").val() + '">' : "") + '                        <input type="hidden" id="cmd" name="cmd" value="' + y.replace(/"/g, "&quot;") + '">                        <input type="hidden" id="pwd" name="pwd" value="' + b + '">                      </form>',
                                q = new FormData($(O)[0]);
                            o.attr("readonly", "true"), $.ajax({
                                type: "POST",
                                url: p + "?stripped=1&stripped=2",
                                data: q,
                                dataType: "text",
                                cache: !1,
                                contentType: !1,
                                processData: !1,
                                success: function(e) {
                                    var t = $(".-shell-port-type").text(),
                                        i = $(e).find("pre").html().replace(/>&gt;/g, ">" + t),
                                        a = $(e).find('select[name="pcmd"] option').map(function() {
                                            return Convert.htmlEscape($(this).val())
                                        }).get().reOrder(-1, 0).reverse();
                                    localStorage.setItem(v___server_hostname + "-shell_commands", JSON.stringify(a)), newPwd = $(e).find('input[name="pwd"]').val(), l.find("pre").append(k ? i.replace(new RegExp(y, "g"), k) : i), v.text(C || (newPwd == v.attr("data-home") ? "~" : newPwd.split("/").filter(function(e) {
                                        return "" != $.trim(e)
                                    }).slice(-1)[0])).attr("data-pwd", C || newPwd).attr("title", C || newPwd), theme_shell_adapt(), theme_shell_clear(o), h.scrollTop(h[0].scrollHeight), setTimeout(function() {
                                        v___shell_processing = 0, __shell_commands__i__ = 0, o.removeAttr("readonly").focus()
                                    }, 100)
                                },
                                error: function(e) {}
                            })
                        }
                    }
                }), $("body").on("keyup", "#webmin_search_form", function(e) {
                    var t = $(this).find("input.sidebar-search"),
                        i = t.val(),
                        a = $("body").find(".-shell-port-");
                    i && 13 == e.keyCode && (i.startsWith("!") ? theme_shell_open(a, i) : ($(this).trigger("submit"), t.val("")))
                }), $("body").on("click", "#right-side-tabs .right_pane_favorites_link", function(e) {
                    $(".favorites-menu-outer.hover + .favorites-menu-close").trigger("click")
                }), $("aside").on("click", ".user-links > li.favorites", function(e) {
                    $(".favorites-menu-outer").addClass("hover")
                }), $("body").on("click", "nav.favorites-menu li a", function() {}), $("body").on("click", ".favorites-menu-close, nav.favorites-menu li a", function() {
                    $(".favorites-menu-outer").removeClass("hover")
                }), $(document).on("keydown", function(e) {
                    "0px" == $(".favorites-menu-outer").css("left") && 27 == e.keyCode && $(".favorites-menu-outer").removeClass("hover")
                }), favicon = new Favico({
                    animation: "none"
                }), 0 == v___user_level && 1 == Core.moduleAvailable("status")) {
                var d = localStorage.getItem(v___server_hostname + "-right-side-tab") ? localStorage.getItem(v___server_hostname + "-right-side-tab") : "#right-side-tabs-sysinfo";
                $("body").append('  \t\t<div id="right-side-tabs" class="' + (settings_side_slider_enabled ? "" : " hidden ") + "right-side-tabs" + (settings_side_slider_fixed ? " right-side-tabs-fixed" : "") + '" data-background-style="' + settings_side_slider_palette + '">  \t  \t\t<ul class="nav nav-tabs" role="tablist">          <li role="presentation" class="' + ("#right-side-tabs-sysinfo" == d ? "active " : "") + (settings_side_slider_sysinfo_enabled ? "" : " hidden") + '"><a href="#right-side-tabs-sysinfo" aria-controls="home" role="tab" data-toggle="tab">&nbsp;</a></li>  \t\t\t\t<li role="presentation" class="' + ("#right-side-tabs-notifications" == d ? "active " : "") + ($_v__ls__a && settings_side_slider_notifications_enabled && (1 == Core.moduleAvailable("package-updates") || 1 == Core.moduleAvailable("csf")) ? "" : " hidden") + '"><span class="right-side-tab-notification-asterix pointer-events-none hidden"></span><a href="#right-side-tabs-notifications" aria-controls="home" role="tab" data-toggle="tab">&nbsp;</a></li>  \t\t\t\t<li role="presentation" class="' + ("#right-side-tabs-favorites" == d ? "active " : "") + (settings_side_slider_favorites_enabled && Core.moduleAvailable("webmin") ? "" : " hidden") + '"><a href="#right-side-tabs-favorites" aria-controls="home" role="tab" data-toggle="tab">&nbsp;</a></li>  \t\t\t</ul>  \t\t\t<div class="tab-content">            <div role="tabpanel" class="tab-pane' + ("#right-side-tabs-sysinfo" == d ? " active" : "") + (settings_side_slider_sysinfo_enabled ? "" : " hidden") + '" id="right-side-tabs-sysinfo">                <div class="info-container">                    <div class="no-sysinfo_data"><div style="height: 5px"></div>              <small class="list-group-item-text text-lighter theme_xhred_notification_no_data"></small>            </div>                </div>    \t\t\t  </div>            <div role="tabpanel" class="tab-pane' + ("#right-side-tabs-notifications" == d ? " active" : "") + ($_v__ls__a && settings_side_slider_notifications_enabled && (1 == Core.moduleAvailable("package-updates") || 1 == Core.moduleAvailable("csf")) ? "" : " hidden") + '" id="right-side-tabs-notifications">                <div class="list-group"></div>            </div>            <div role="tabpanel" class="tab-pane' + ("#right-side-tabs-favorites" == d ? " active" : "") + (settings_side_slider_favorites_enabled && Core.moduleAvailable("webmin") ? "" : " hidden") + '" id="right-side-tabs-favorites">                <div class="favorites-dcontainer">                    <div class="no-favorites_data"><div style="height: 4px"></div>                <small class="list-group-item-text text-lighter theme_xhred_notification_no_favorites"></small>              </div>                </div>    \t\t\t  </div>                        <div class="right-side-tabs-dismiss pull-right">                <i class="fa fa-fw fa-lg fa-reload"></i>                <i class="fa fa-fw fa-star-o right-side-tabs-favorites-ctl pull-right"></i>                <i class="fa fa-fw fa-lg fa-question-circle pull-right theme"></i>                <i class="fa fa-fw fa-lg fa-dashboard pull-right"></i>                <i class="fa fa-fw fa-lg fa-trash pull-right"></i>                <i class="fa fa-fw fa-lg fa-clear-all pull-right"></i>            </div>  \t\t\t</div>  \t\t</div>  \t\t  <div class="' + (settings_side_slider_enabled ? "" : " hidden ") + "right-side-tabs-toggler" + (settings_side_slider_fixed ? " hidden" : "") + '" data-background-style="' + settings_side_slider_palette + '">  \t\t  \t<button type="button" class="btn btn-primary btn-menu-toggler" style="padding-left: 6px; padding-right: 5px;">  \t\t  \t\t<span class="badge badge-danger hidden"></span>  \t\t  \t\t<i class="fa fa-fw fa-lg fa-bell"></i>  \t\t  \t</button>  \t\t  </div>    \t'), $('a[href="' + d + '"]:visible').length || $("#right-side-tabs ul.nav-tabs li a:visible").trigger("click"), $('#right-side-tabs .nav.nav-tabs a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
                    var t = $(e.target).attr("href");
                    localStorage.setItem(v___server_hostname + "-right-side-tab", t)
                }), $("body").on("click", ".right-side-tabs-favorites-ctl", function(e) {
                    $(".favorites-menu-outer").hasClass("hover") ? $(".favorites-menu-close").trigger("click") : $(".user-link.favorites").trigger("click")
                }), $("body").on("click", '#right-side-tabs a:not([data-toggle="collapse"]):not([role="tab"]):not(.list-group-item)', function(e) {
                    $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")
                }), $("body").on("click", "#right-side-tabs .info-container .graph-container-fw", function(e) {
                    var t, i = $(this).attr("class"),
                        a = i.indexOf("cpu_") > -1 ? "cpu" : i.indexOf("mem_") > -1 ? "mem" : i.indexOf("virt_") > -1 ? "virt" : "disk";
                    "cpu" == a && Core.moduleAvailable("proc") ? t = v___location_prefix + "/proc/index_cpu.cgi" : "mem" != a && "virt" != a || !Core.moduleAvailable("proc") ? "disk" == a && Core.moduleAvailable("disk-usage") ? t = v___location_prefix + "/disk-usage" : "disk" == a && Core.moduleAvailable("quota") && (t = v___location_prefix + "/quota/list_users.cgi?dir=%2F") : t = v___location_prefix + "/proc/index_size.cgi", get_pjax_content(t), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")
                }), $("body").on("click", "#right-side-tabs .fa-dashboard", function(e) {
                    get_onbeforeunload_status() ? (this.href = v___location_prefix + "/sysinfo.cgi", get_onbeforeunload_message(e, this)) : get_pjax_content(v___location_prefix + "/sysinfo.cgi"), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")
                }), $("body").on("click", "#right-side-tabs .fa-question-circle.theme", function(e) {
                    theme_update_notice(0), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")
                })
            } else get_server_data("data-slider-fixed", "0"), $(".right-side-tabs-toggler").addClass("hidden");
            $(".right-side-tabs .tab-pane").each(function() {
                $(this).css("height", $(window).height() - 92)
            }), $(".right-side-tabs").on("mouseover", ".list-group-item", function(e) {
                $(this).find(".fa.fa-trash-o").removeClass("hidden"), !$(this).hasClass("opacity-0_3") && $(this).find(".fa-clear-all").removeClass("hidden")
            }).on("mouseout", ".list-group-item", function(e) {
                $(this).find(".fa.fa-trash-o").addClass("hidden"), $(this).find(".fa-clear-all").addClass("hidden")
            }), $(".right-side-tabs").on("click", "[data-port-href]", function(e) {
                e.preventDefault(), e.stopPropagation(), open($(this).data("port-href"))
            }), $("body").on("click", 'a[data-id^="csf_"], a[data-type^="csf_"]', function(e) {
                get_bundle_csf()
            }), $("body").on("click", 'a[href*="mysql"], a[href*="postgresql"]', function(e) {
                get_bundle_sql()
            }), $(".right-side-tabs").on("click", 'a.list-group-item[data-type="csf_deny"]', function(e) {
                e.preventDefault(), e.stopPropagation(), $(e.target).is(".fa.fa-trash-o") || $(e.target).is(".fa-clear-all") || $(e.target).is("[data-port-href]") || (get_bundle_csf(), $("body").append('  \t\t\t\t\t\t<form action="' + v___location_prefix + '/csf/" method="post" class="hidden" id="csf_temporary_ip_entries">              \t<input type="hidden" name="action" value="temp">              </form>'), $("form#csf_temporary_ip_entries").submit().remove(), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click"))
            }), $(".right-side-tabs").on("click contextmenu", "a.list-group-item", function(e) {
                if (e.preventDefault(), "contextmenu" == e.type) return $(this).find(".fa-clear-all").trigger("click"), e.preventDefault(), void e.stopPropagation();
                if ($(e.target).is(".fa.fa-trash-o") || $(e.target).is(".fa-clear-all") || $(e.target).is("[data-port-href]")) {
                    if ($(e.target).is(".fa-clear-all")) return $(this).addClass("opacity-0_3"), $(this).find(".fa-clear-all").addClass("hidden"), void slider_mark_notification_read($(this).attr("id"), $(this).data("type"), 1, 1);
                    $(this).animate({
                        opacity: "0"
                    }, $settings_animation_left_slide_time, function() {
                        $(this).remove(), localStorage.removeItem(v___server_hostname + "-notifications_" + $(this).attr("id") + "_" + $(this).data("type")), slider_add_no_notifications()
                    })
                } else $(this).attr("href") && $(this).attr("href").length && "undefined" != $(this).attr("href") && "csf_deny" != $(this).attr("data-type") ? ($(this).addClass("opacity-0_3"), $(this).find(".fa-clear-all").addClass("hidden"), slider_mark_notification_read($(this).attr("id"), $(this).data("type"), 1, 1), $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click"), get_pjax_content($(this).attr("href"))) : ($(this).addClass("opacity-0_3"), slider_mark_notification_read($(this).attr("id"), $(this).data("type"), 1, 1))
            }), $(".right-side-tabs-dismiss i.fa-reload").click(function(e) {
                information_update()
            }), $(".right-side-tabs-dismiss i.fa-clear-all").click(function(e) {
                slider_mark_group_notifications_read(!1)
            }), $(".right-side-tabs-dismiss i.fa-trash").click(function(e) {
                $(".right-side-tabs .list-group-item:not(.no-notifications)").animate({
                    opacity: "0"
                }, $settings_animation_left_slide_time, function() {
                    $(this).remove(), slider_remove_all_notifications(), slider_add_no_notifications()
                })
            }), $("body").on("click", ".right-side-tabs-toggler:not(.hidden)", function(e) {
                $(this).hasClass("opened") ? ($(this).removeClass("opened"), $(this).animate({
                    right: "0"
                }, $settings_animation_left_slide_time), $(".right-side-tabs").animate({
                    right: "-302"
                }, $settings_animation_left_slide_time)) : ($(this).addClass("opened"), $(this).animate({
                    right: "300"
                }, $settings_animation_left_slide_time), $(".right-side-tabs").animate({
                    right: "0"
                }, $settings_animation_left_slide_time))
            }), $(".right-side-tabs .tab-pane").mCustomScrollbar({
                axis: "y",
                theme: "minimal",
                scrollInertia: 100,
                scrollButtons: !1
            }), settings_button_tooltip && $("body").tooltip({
                selector: 'li[data-toggle="tooltip"], li > a[data-toggle="tooltip"].menu-exclude-link, label[data-toggle="tooltip"]',
                container: "body",
                html: !0,
                delay: {
                    show: 800,
                    hide: 30
                }
            }), $("body").on("click", ".user-link.palette-toggle", function(e) {
                theme_toggle_night_mode()
            }), $("body").on("click", ".user-link.ported-console", function(e) {
                theme_shell_check_available() && theme_shell_open(n)
            }), slider_add_no_notifications(), slider_check_notifications(), moment.locale(get_server_data("language"))
        }
        $("body").on("click", "#headln2c > .favorites, .xcustom-favorites", function(e) {
            e.preventDefault();
            var t = URI(v___location).resource();
            if ($(this).hasClass("fa-star-o")) {
                $(this).removeClass("fa-star-o").addClass("fa-star text-warning");
                var i = $("#headln2c > span[data-main_title]").text(),
                    a = $(".has-sub.active").text().trim(),
                    s = $(".sub_active").text().trim(),
                    n = "",
                    o = "";
                ($t_uri_virtualmin || $t_uri_cloudmin) && (n = $("aside .ui_select option:selected").text()), $('body[class^="' + v___module_file_manager + '"]').length && (o = (o = URI.parseQuery(URI(v___location).query()).path) ? "[" + o + "]" : "[/]"), favorites_add(t, (n.length ? n + " - " : "") + (a.length ? a + "/" : "") + (s.length ? s + (i.trim().length ? ": " : "") : "") + i.trim() + (o.length ? " " + o : ""), $t_uri_virtualmin ? "virtualmin" : $t_uri_cloudmin ? "cloudmin" : "webmin"), favorites_save()
            } else $(this).addClass("fa-star-o").removeClass("fa-star text-warning"), favorites_remove(t)
        }), 1 === v___initial_load && favorites_init(), $("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function() {
            $(this).find("small").removeClass("hidden")
        }).on("mouseleave", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function() {
            $(this).find("small").addClass("hidden")
        }), $("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) small", function() {
            $(this).find(".fa-times").removeClass("fa-times").addClass("fa-times-circle"), $(this).animate({
                "font-size": "0.7em",
                "margin-top": "-2px",
                "margin-left": "-1px"
            }, 160)
        }).on("mouseleave", "li:not(.exclude) small", function() {
            $(this).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-times"), $(this).animate({
                "font-size": "0.6em",
                "margin-top": "-1px",
                "margin-left": "0"
            }, 80)
        }), $("#favorites-menu .favorites-menu-content").on("click", "li:not(.exclude) small .fa-times-circle", function(e) {
            e.preventDefault(), e.stopPropagation(), favorites_remove($(this).parents("a").attr("href"))
        }), $(document).on("keydown", function(e) {
            "0px" == $(".favorites-menu-outer").css("left") && 27 == e.keyCode && $(".favorites-menu-outer").removeClass("hover")
        }), $("body").on("shown.bs.modal", ".modal.in", function() {
            $(this).focus()
        }), $("body").on("click", ".module-help", function(e) {
            popover_visibility_position($(this))
        }), $("body").on("click", function(e) {
            $(e.target).is(".close-popover-trigger") && $(e.target).parent().parent().popover("hide");
            var t = ".showpass-popover";
            $(t).length && $(t).each(function() {
                $(this).is(e.target) || 0 !== $(this).has(e.target).length || 0 !== $(".popover").has(e.target).length || $(this).popover("hide")
            })
        }), $('body:not(".mobile-menu-toggler")').on("click", function(e) {
            $(e.target).is('.wbm-sm, input[name="product-switcher"], label[for*="open_"], span, .sidebar-search, .select2-selection__rendered, .select2-selection') || navigation_hide()
        }), $("body").on("change", 'input[type="checkbox"], input[type="radio"]', function(e) {
            var t = $(this).parents("tr.ui_checked_columns");
            t.length && t.find("input:first").is($(this)) && ($(this).is(":checked") ? t.addClass("hl-aw") : t.removeClass("hl-aw"), "function" == typeof __r____changed && __r____changed())
        }), $("body").on("click", ".ui_link, .ui_link_replaced", function() {
            $.each($('input[type="checkbox"]'), function() {
                $(this).is(":checked") ? $(this).parents("tr.ui_checked_columns").addClass("hl-aw") : $(this).parents("tr.ui_checked_columns").removeClass("hl-aw"), "function" == typeof __r____changed && __r____changed()
            })
        }), $("body").on("click", '#extended_sysinfo-1 span[data-entry="nf_seen"]', function(e) {
            e.preventDefault();
            var t = $(this),
                i = $('form[action*="seen_newfeatures.cgi"]');
            $.ajax({
                type: "GET",
                url: i.attr("action"),
                data: !1,
                statusCode: {
                    200: function() {
                        t.parents(".panel.panel-default").remove()
                    }
                }
            })
        }), $("body").on("click", '#extended_sysinfo-1 span[data-entry="right_upok"]', function(e) {
            e.preventDefault();
            $(this);
            var t = $('form[action*="package-updates/update.cgi"]');
            t.attr("method", "POST"), $("<input>").attr({
                type: "submit",
                value: 1
            }).appendTo(t), $('input[name="u"]').appendTo(t), t.submit()
        }), $("body").on("click", "a#atclearcache", function(e) {
            set_onbeforeunload_status(0, 0), Object.keys(localStorage).forEach(function(e) {
                /^allowed_trigger|^notifications_|^sysinfo_/.test(e) && localStorage.removeItem(v___server_hostname + "-" + e)
            }), $(".right-side-tabs-dismiss .fa-trash").trigger("click"), $(".right-side-tabs-dismiss .fa-refresh").trigger("click");
            var t = $(this);
            spinnerfy_buttons(t, [1.5, -33, "small", 1e3])
        }), $("body").on("click", function(e) {
            $(e.target).is('select[name="settings_navigation_color"], select[name="settings_background_color"], select[name="settings_side_slider_palette"], input[name="settings_side_slider_fixed"], label[for^="settings_side_slider_fixed"], div.aradio') || $(".right-side-tabs-toggler").hasClass("hidden") || !$(".right-side-tabs-toggler").hasClass("opened") || $(e.target).parents("#right-side-tabs").is("#right-side-tabs") || $(e.target).is(".btn-menu-toggler") || $(e.target).is(".fa-bell") || $(e.target).is("li.user-link.favorites") || $(e.target).is(".badge.badge-danger") || $(".right-side-tabs-toggler:not(.hidden) .btn-menu-toggler").trigger("click")
        }), $("body").on("click", ".authentic_update:not(.disabled)", function(e) {
            e.preventDefault(), e.stopPropagation();
            var t = $(this),
                i = $("body").add($(".__page")),
                a = $("aside").add($("#right-side-tabs")).add($(".__page")),
                s = "1" == t.data("stable") ? "-release" : "-beta";
            i.addClass("pointer-events-none"), set_onbeforeunload_status(1, 0), a.addClass("bg-filter-blur-grayscale-opacity50"), theme_messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + theme_language("theme_xhred_git_patch_initiated") + " " + theme_language("theme_xhred_global_please_wait") + '&nbsp;&nbsp;&nbsp;<span class="cspinner"><span class="cspinner-icon white smallest margined-top-4"></span></span>', 1800, "info", "themeUpgrade", 0), $.ajax({
                type: "POST",
                url: v___location_prefix + "/index.cgi?xhr-update=1&xhr-update-type=" + s,
                data: !1,
                dataType: "json",
                success: function(e) {
                    e[0] && e[0].success ? (theme_messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + e[0].success, 4, "success", "themeUpgrade"), slider_mark_group_notifications_read("authentic_remote_version"), setTimeout(function() {
                        theme_reload()
                    }, 2e3)) : e[0] && e[0].no_git ? (theme_messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + e[0].no_git, 20, "warning", "themeUpgrade"), a.removeClass("bg-filter-blur-grayscale-opacity50"), i.removeClass("pointer-events-none")) : (theme_messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + theme_language("theme_xhred_git_patch_update"), 20, "error", "themeUpgrade"), a.removeClass("bg-filter-blur-grayscale-opacity50"), i.removeClass("pointer-events-none"))
                },
                error: function(e) {
                    theme_messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + theme_language("theme_xhred_git_patch_update"), 20, "error", "themeUpgrade"), a.removeClass("bg-filter-blur-grayscale-opacity50"), i.removeClass("pointer-events-none")
                },
                complete: function(e) {
                    set_onbeforeunload_status(0, 0)
                }
            })
        }), $("body").on("click", 'a[data-href="#theme-info"]', function() {
            theme_update_notice(0)
        }), $("body").on("hide.bs.modal", "#update_notice", function() {
            $(this).hasClass("r") ? ($("body").append('<div class="update_notice_overlay" style="position: absolute; z-index: 10000001; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; background-color: ' + $("html").css("background-color") + ' !important; pointer-events: none;"></div>'), $("div.update_notice_overlay").animate({
                opacity: 1
            }, 560, function() {
                setTimeout(function() {
                    theme_reload()
                }, 100)
            })) : ($("#content").animate({
                "margin-left": ___________content_initial_
            }, 280), $("aside").animate({
                "margin-left": 0
            }, 280, function() {
                $(".right-side-tabs, .right-side-tabs-toggler").removeClass("pointer-events-none bg-filter-grayscale-opacity50"), $(".container-fluid").removeClass("bg-filter-blur-grayscale-opacity50")
            })), $("#update_notice").remove()
        }).on("show.bs.modal", "#update_notice", function() {
            $("#update_notice").length;
            $(this);
            var e = $("aside").css("left");
            ___________content_initial_ = $("#content").css("margin-left"), ________version_date_obj = $(this).find(".modal-body > h4:first-child"), ________version_curr_text = ________version_date_obj.text().split(/\s+/)[1], ________version_first_text = $(".version_separator:last").text(), ________multi_in_branch = $(".version_separator").length, _____version__x = ________version_first_text + "..." + ________version_curr_text, __release_time = v___theme_version_git.slice(-4, -2) + ":" + v___theme_version_git.slice(-2), _____release_date_ = ________version_date_obj.text().match(/\(([^)]+)\)/), _____release_date = !!_____release_date_ && _____release_date_[1], __release_date_time = _____release_date + (__release_time.length > 2 ? ", " + __release_time : "");
            var t = theme_language("theme_xhred_global_release").toLowerCase(),
                i = $(".version_separator"),
                a = theme_language("theme_xhred_global_development_version");
            $.each(i, function() {
                $(this).attr("target", "_blank"), -1 === $(this).text().indexOf(t) && -1 === $(this).text().indexOf("-beta") && -1 === $(this).text().indexOf("-RC") && $(this).append('<span class="smaller">-' + t + " </span>")
            }), setTimeout(function() {
                $(".container-fluid").addClass("bg-filter-blur-grayscale-opacity50")
            }, 0), $("#content").animate({
                "margin-left": 0
            }, 450), $("aside").animate({
                "margin-left": e
            }, 450), $(".right-side-tabs, .right-side-tabs-toggler").addClass("pointer-events-none bg-filter-grayscale-opacity50");
            var s = $(this).find(".modal-body h4");
            if ($modal_h4_first = $(this).find(".modal-body h4:first"), !$(this).find(".modal-body h4:first .diffctl").length) {
                o = new RegExp(RegExp.quote(________version_curr_text), "g");
                if (________multi_in_branch && (s.replaceText(o, "<span>" + _____version__x + "</span>"), s.replaceText(/Version/, "Versions")), s.length && $(this).find('.modal-body h4:contains("patch")').length) {
                    var n = parseFloat($(this).find('.modal-body a[href*="authentic-theme/releases"]:first').text().match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                    $modal_h4_first.append('<a data-toggle="tooltip" data-title="<strong>' + theme_language("theme_xhred_git_compare_changes") + "</strong><br>" + theme_language("theme_xhred_global_committed_on") + ": <em>" + __release_date_time + '</em>" class="btn btn-transparent diffctl text-dark text-force-link-hover" href="https://github.com/qooob/authentic-theme/compare/' + n + '...master"><i class="fa fa-lg fa-git-pull fa-flip-horizontal"></i></a>'), $modal_h4_first.after('<span class="version_separator" style="margin-top: -32px;margin-right: 0;">            <span class="smaller text-danger"><span>' + a + "</span></span></span>")
                } else $modal_h4_first.append('<a target="_blank" data-toggle="tooltip" data-html="true" data-title="<strong>' + theme_language("theme_xhred_global_complete_changelog") + "</strong><br>" + theme_language("theme_xhred_global_released_on") + ": <em>" + __release_date_time + '</em>" class="btn btn-transparent diffctl changelogctl text-dark text-force-link-hover" href="https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md"><i class="fa fa-1_50x fa-changelog' + (________multi_in_branch ? " multi-ver" : " single_ver") + '"></i></a>').append('<a href="https://github.com/qooob/authentic-theme/releases/tag/' + ________version_curr_text + '" class="version_separator margined-top-10">' + ________version_curr_text + "</a>")
            }
            var o = new RegExp(RegExp.quote("(" + _____release_date + ")"), "g");
            s.replaceText(o, "");
            var l = [];
            $.each($(this).find('li span:contains("Fixed bugs")'), function() {
                var e = $(this),
                    t = $(this).parent("li"),
                    i = t.parent("ul"),
                    a = t.find("a:not(.bctl)"),
                    s = a.length;
                ________multi_in_branch ? (l.push(a), 1 === i.find("li").length && (i.prev("hr").prev("a").remove(), i.prev("hr").remove(), i.addClass("no-data")), t.remove()) : (e.html([e.text().slice(0, 6), s + " ", e.text().slice(6)].join("")), t.find("a:first").before('<a class="btn btn-xxs btn-transparent bctl margined-right-8 text-semi-dark text-force-link-hover" style="padding-left: 1px; padding-right: 1px" href="javascript:;" ><i class="fa fa-plus-square-o"></i></a>'), t.find("a.bctl").click(function(e) {
                    a.toggleClass("hidden"), t.find("a.bctl i").toggleClass("fa-minus-square-o")
                }), a.addClass("obj-popup hidden"))
            }).promise().done(function() {
                if (________multi_in_branch && !$(".bctl").length) {
                    $(".modal-body h4[data-development]").prev("hr").before('      <hr class="hr-dashed margined-top-15">      <div data-bugs><ul><li><span data-fixed-bugs data-fixed-bugs-obj>Fixed bugs</span><span data-bugs-container></span></li></ul></div>'), $(".modal-body span[data-bugs-container]").append(l);

                    function e(e, t) {
                        return parseInt($(t).text().replace("#", "")) < parseInt($(e).text().replace("#", "")) ? 1 : -1
                    }
                    $(".modal-body span[data-bugs-container] a").sort(e).appendTo(".modal-body span[data-bugs-container]");
                    var t = $("span[data-fixed-bugs]"),
                        i = ($("span[data-bugs-container]"), $(".modal-body span[data-bugs-container]").find("a:not(.bctl)")),
                        a = i.length;
                    t.html([t.text().slice(0, 6), a + " ", t.text().slice(6)].join("")), t.append('<a class="btn btn-xxs btn-transparent bctl margined-left-4 text-semi-dark text-force-link-hover" style="padding-left: 1px; padding-right: 1px" href="javascript:;" ><i class="fa fa-plus-square-o"></i></a>'), t.find("a.bctl").click(function(e) {
                        i.toggleClass("hidden"), t.find("a.bctl i").toggleClass("fa-minus-square-o")
                    }), i.addClass("obj-popup hidden");
                    var s = $("div[data-bugs]"),
                        n = s.find("a:not(.bctl)").length;
                    !n && s.prev(".hr-dashed").remove(), !n && s.remove()
                }
            })
        }), $("body").on("click contextmenu", 'a[data-href*="/webmin/edit_webmincron.cgi"]', function(e) {
            e.preventDefault(), e.stopPropagation();
            var t = Core.moduleAvailable("virtual-server") ? "virtual-server" : "system-status";
            theme_messenger('<i class="fa fa-lg fa-fw fa-refresh-fi"></i>' + theme_language("theme_xhred_sysinfo_update_start") + '.&nbsp;&nbsp;&nbsp;<span class="cspinner"><span class="cspinner-icon white smallest margined-top-4"></span></span>', 1800, "info", "sysinfoRecollect", 0), $("body").find("#system-status").find('h3 > a[data-refresh="system-status"]').addClass("disabled btn-inverse").removeClass("btn-success"), $.ajax({
                type: "GET",
                url: v___location_prefix + "/" + t + "/recollect.cgi",
                data: !1,
                dataType: "text",
                success: function(e) {
                    get_pjax_content(v___location_prefix + "/sysinfo.cgi", ["success", theme_messenger, ['<i class="fa fa-lg fa-fw fa-refresh-fi"></i>' + theme_language("theme_xhred_sysinfo_update_end"), 4, "success", "sysinfoRecollect"], 0])
                },
                error: function(e) {
                    theme_messenger('<i class="fa fa-lg fa-fw fa-refresh-fi"></i>' + theme_language("theme_xhred_sysinfo_update_failed"), 20, "error", "sysinfoRecollect")
                }
            })
        }), $("body").on("click", ".csf-submit", function(e) {
            e.preventDefault();
            var t = $(this).data("id");
            $("#" + t).submit()
        }), $("body").on("click", ".inline-row input", function(e) {
            $(this).is(":checked") ? $(this).parents(".gl-icon-container").addClass("highlighted") : $(this).parents(".gl-icon-container").removeClass("highlighted")
        }), $("body").on("click contextmenu", "div.icons-container, div.small-icons-container", function(e) {
            if ("click" === e.type && $(e.target).is(".gl-icon-select") && !v___available_navigation) e.preventDefault(), $(this).trigger("contextmenu");
            else if ("contextmenu" === e.type) {
                e.preventDefault(), $(this).find("input").is(":checked") ? ($(this).find("input").prop("checked", !1), $(this).removeClass("highlighted")) : $(this).find("input").length && ($(this).find("input").prop("checked", !0), $(this).addClass("highlighted"));
                var t = $(e.target).is(".icon_link") ? $(e.target).parent(".gl-icon-container").find(".fa-select, .fa-selected") : $(e.target).is(".gl-icon-select") ? $(e.target) : $(e.target).is("img") ? $(e.target).parent("a").parent(".gl-icon-container").find(".fa-select, .fa-selected") : $(e.target).find(".fa-select, .fa-selected");
                t.hasClass("fa-select") ? t.removeClass("fa-select").addClass("fa-selected") : t.removeClass("fa-selected").addClass("fa-select")
            }
            "function" == typeof db_check_selected && db_check_selected()
        }), $("body").on("click", ".row.icons-row.vertical-align .icons-container, .row.icons-row.vertical-align .small-icons-container", function() {
            $(this).hasClass("forged-xx-skip")
        }), __is_shifted = !1, __is_tabbed = !1, $(document).on("keyup keydown", function(e) {
            var t = e.keyCode ? e.keyCode : e.which;
            __is_shifted = e.shiftKey, __is_tabbed = 9 == t
        }), $("body").on("change", ".onchange_form_submit_triggger", function(e) {
            e.preventDefault(), $(this).parent("form").submit()
        }), $("body").on("click", 'button.ui_form_end_submit[type="button"]:not(.disabled)', function() {
            var e = $(this).next('input[type="submit"].hidden'),
                t = $(this).parent(".btn-group").next('input[type="submit"].hidden');
            e.length || (e = t);
            var i = e.parent(),
                a = e.parents("form");
            if (!a.length) return (a = e.closest("form")).length || (a = i.prev("form")), a.length || (a = i.prev().prev("form")), a.length || (a = i.prev().prev().prev("form")), a.length || (a = i.prev().prev().prev().prev("form")), a.length || (a = i.prev().prev().prev().prev().prev("form")), a.length || (a = i.prev().prev().prev().prev().prev().prev("form")), a.append(a.nextUntil(i)), void $.each(i.find("select, input"), function() {
                $("<input>").attr({
                    type: "hidden",
                    name: $(this).attr("name") ? $(this).attr("name") : $(this).attr("id"),
                    value: $(this).val()
                }).appendTo(a)
            }).promise().done(function() {
                a.submit()
            });
            $("<input>").attr({
                type: "hidden",
                name: e.attr("name") ? e.attr("name") : e.attr("id"),
                value: $.trim(e.val())
            }).appendTo(a), e.trigger("click")
        }), $("body").on("click", '.ui_form_end_submit:not(.disabled), .page_footer_submit:not(.disabled):not([href*="javascript:history"])', function() {
            var e = !1,
                t = !1;
            ($(this).parents('form[action="fetch.cgi"]').length || $(this).parents('form[action="download.cgi"]').length && !Core.curModule("cpan")) && (e = 1e3, t = 1), Core.curModule("csf") ? spinnerfy_buttons($(this), [2, -29, "small", t]) : spinnerfy_buttons($(this), !1, e, t)
        }), $("body").on("dblclick", '.mppopup a[onclick*="fileclick("], .mppopup a[onclick*="parentdir("]', function(e) {
            e.preventDefault()
        });
        var c = 0,
            p = null;
        $("body").on("dblclick", '.mppopup a[onclick*="select("]', function(e) {
            $(".mppopup button[data-mppopup_confirm]").trigger("click")
        }), $("body").on("click", '.mppopup a[onclick*="fileclick("], .mppopup a[onclick*="parentdir("]', function(e) {
            if (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), c++, $data_mppopup_value.val($v__mpp__g_ol), 1 === c) p = setTimeout(function() {
                if (c = 0, "undefined" == typeof $v__mpp__g_gp && ($v__mpp__g_gp = 0), $v__mpp__g_gp) {
                    var e = chooser_get_link($v__mpp__g_op);
                    chooser_get(e)
                } else chooser_control($v__mpp__g_ol, 0, 0);
                $v__mpp__g_gp = 0
            }, 240);
            else if (clearTimeout(p), c = 0, $v__mpp__g_olt) {
                var t = chooser_get_link($v__mpp__g_op);
                chooser_get(t)
            } else chooser_control($v__mpp__g_ol, 1, 1)
        }), $("body").on("click", ".mppopup button[data-mppopup_confirm]", function() {
            chooser_control($data_mppopup_value.val(), 1, 1)
        }), $("body").on("show.bs.modal", ".mppopup", function() {
            v__mpp__ml_t__e = 0, $data_mppopup_value = $(".mppopup input[data-mppopup_value]"), $('.mppopup input[data-role="tagsinput"]').tagsinput({
                onTagExists: function(e, t) {
                    t.hide().fadeIn(), v__mpp__ml_t__e = 1
                }
            })
        }), $("body").on("shown.bs.modal", ".mppopup", function() {
            var e = $("body .mppopup").find(".modal-head");
            $("body .mppopup").find(".modal-body"), $("body .mppopup").find(".modal-body table"), e.find(".mppopup_filter > input");
            setTimeout(function() {
                $(".mppopup_filter_input").animate({
                    opacity: 1
                }, $settings_animation_tabs_slide_time), $(".mppopup_filter_input").focus()
            }, 0)
        }), $("body").on("hidden.bs.modal", ".mppopup", function() {
            refInput.removeClass("refInputData"), $('.mppopup input[data-role="tagsinput"]').tagsinput("destroy"), $("body .mppopup").remove(), $("button[data-mmclick].disabled, input[data-mmclick].disabled").removeClass("disabled").removeAttr("disabled")
        }), $("body").on("click", ".mppopup_multi_done", function(e) {
            refInput.val($.trim($('.mppopup input[data-role="tagsinput"]').val().replace(/,/g, " "))), $('.mppopup span[aria-hidden="true"]').trigger("click")
        }), $("body").on("keyup", ".mppopup_filter_input", function(e) {
            var t = e.which,
                i = $(".mppopup table tbody tr:visible"),
                a = i.find("td:first-child a");
            if (!$(".mppopup .breadcrumbx").length) {
                if (13 != t || 1 !== i.length || e.shiftKey) {
                    if (13 == t && 1 === i.length && e.shiftKey) {
                        a.trigger("click").trigger("dblclick");
                        var s = $(".mppopup .mppopup_multi_done:visible");
                        s.length && setTimeout(function() {
                            s.trigger("click")
                        }, 240)
                    }
                } else a.trigger("click");
                $(".mppopup table tbody tr.noresults").length || $(".mppopup table tbody").append('<tr class="hidden noresults"><td class="text-center" colspan="' + $(".mppopup table tbody tr:first-child td").length + '">' + theme_language("theme_xhred_global_no_results_found") + "</td></tr>");
                var n = $(".mppopup table tbody tr:visible:not(.noresults)"),
                    o = $(".mppopup table tbody tr.noresults");
                n.length ? o.addClass("hidden") : o.removeClass("hidden")
            }
        }), $("body").on("click", "button[data-mmclick]:not(.disabled), input[data-mmclick]:not(.disabled)", function(e) {
            e.preventDefault(), e.stopPropagation(), refInput = chooser_get_target($(this), 1);
            var t = $(this),
                i = refInput.val(),
                a = encodeURIComponent(i),
                s = $(this).attr("data-mmclick").match("window.open\\(['\"]*(.*?)(\\s*['\"]*,.*?)"),
                n = s[1].match(/(\w+\.[a-z]{3,4})/gi)[0].replace(".cgi", "");
            if (t.addClass("disabled").attr("disabled", "disabled"), s[1]) {
                var o = s[1].replace("encodeURIComponent(ifield.value)", "refInputCurrValSafe");
                o = o.replace('"+"', "").replace('"+', "").replace("refInputCurrValSafe", a);

                function l(e, t, a, s, o) {
                    var l;
                    l = o ? '                <div class="modal-footer">                  <div class="input-group">                    <input data-role="tagsinput" class="form-control ui_textbox" type="text" value="' + (i ? i.replace(/ /g, ",") : "") + '">                    <span class="input-group-btn mppopup_multi_done">                      <button type="button" class="btn btn-success heighter-28"><i class="fa fa-fw fa-circle-check"> </i>&nbsp;' + theme_language("theme_xhred_global_select") + "</button>                    </span>                  </div>                </div>" : '                <div class="modal-footer">                  <div class="input-group">                    <input class="form-control ui_textbox" data-mppopup_value type="text" value="' + (refInput.is("textarea") ? "" : i) + '">                    <span class="input-group-btn mppopup_string_done">                      <button type="button" class="btn btn-success heighter-28" data-mppopup_confirm><i class="fa fa-fw fa-circle-check"> </i>&nbsp;' + theme_language("theme_xhred_global_select") + "</button>                    </span>                  </div>                </div>";
                    var r = '                    <div class="modal fade fade5 mppopup" tabindex="-1" role="dialog">                      <div class="modal-dialog" role="document">                      <div class="modal-content">                        <div class="modal-header">                          <button type="button" class="close" data-dismiss="modal" aria-label="' + theme_language("theme_xhred_global_close") + '"><span aria-hidden="true">&times;</span></button>                          <h4 class="modal-title">                            <div class="mppopup_filter">                              <input class="form-control ui_textbox mppopup_filter_input" style="opacity: 0" type="text" placeholder="' + theme_language("theme_xhred_datatable_filter") + '" size="50" onkeyup="filter_match(this.value,\'row\',true);">                            </div>                          </h4>                        </div>                        <div class="modal-body ' + n + '">                          ' + e + "                        </div>                          " + l + "                      </div>                    </div>                  </div>              ";
                    $("body").append(r), refInput.addClass("refInputData"), $("body .mppopup").modal("show")
                }

                function r(e) {
                    e[1].startsWith("/") ? $v__mpp__g_op = e[1] : $v__mpp__g_op = "/" + e[1]
                }
                $.ajax({
                    type: "POST",
                    url: o,
                    data: !1,
                    dataType: "text",
                    success: function(e) {
                        var t = e,
                            i = e.match('<frame.*?src="([^"]+)"');
                        if ($.isArray(i) && i[1] && -1 === i[1].indexOf("&multi=1")) r(i), $.ajax({
                            type: "POST",
                            url: $v__mpp__g_op,
                            data: !1,
                            dataType: "text",
                            success: function(e) {
                                var t = e.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, ""),
                                    i = $(t).filter(".table").html(),
                                    a = $(t).filter(".table").prev("b").html();
                                l(t = chooser_breadcrumbs(a) + '<table class="table table-hover table-condensed table-striped">' + i + "</table>", 0, 0, refInput, 0)
                            }
                        });
                        else if ($.isArray(i)) r(i), $.ajax({
                            type: "POST",
                            url: $v__mpp__g_op,
                            data: !1,
                            dataType: "text",
                            success: function(e) {
                                var t = e.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, "");
                                l(t = '<table class="table table-hover table-condensed table-striped type2">' + $(t).filter("table").html() + "</table>", 0, 0, refInput, 1)
                            }
                        });
                        else {
                            if ($.isArray(i) && -1 === i[1].indexOf("&multi=1")) return;
                            var a = t,
                                s = $(a).filter("table").html();
                            l('<table class="table table-hover table-condensed table-striped type2" data-target="' + refInput + '">' + s + "</table>", 0, 0, refInput, 0)
                        }
                    }
                })
            } else $(this).removeClass("disabled"), $(this).attr("onclick", $(this).attr("data-mmclick")).removeAttr("data-mmclick"), $(this).trigger("click")
        }), $("body").on("click", ".generate-password-key", function(e) {
            var t = theme_password_generator();
            $("body").append('<button class="hidden tmp-clipboard-obj" data-clipboard-text="' + t + '"></button>');
            var i = new Clipboard(".tmp-clipboard-obj");
            $(".tmp-clipboard-obj").trigger("click"), $(".tmp-clipboard-obj").remove(), i.destroy(), theme_messenger('<i class="fa fa-lg fa-fw fa-key-plus"></i>' + theme_language("theme_xhred_password_generator_new_success").replace("%password", '&nbsp;<code class="vertical-align-middle">' + t + "</code>&nbsp;"), 10, "success", "newGeneratedPassword")
        }), $("body").on("click", 'aside li[data-linked] a[href="' + v___location_prefix + '/shell/"], aside a[href="' + v___location_prefix + '/server-manager/shell.cgi"], aside a[href*="shell=1"]', function(e) {
            e.preventDefault(), e.stopPropagation(), $(".user-link.ported-console:visible").trigger("click")
        }), $("body").on("change", 'form[action*="save_log.cgi"] select[name="idx"]', function(e) {
            var t = $("button.ui_submit.ui_form_end_submit");
            t.first().trigger("click"), t.addClass("disabled")
        }), $("body").on("keydown", 'form[action*="save_log.cgi"] input[name="filter"], form[action*="save_log.cgi"] input[name="lines"]', function(e) {
            if (13 == e.keyCode) {
                e.preventDefault();
                var t = $("button.ui_submit.ui_form_end_submit");
                t.first().trigger("click"), t.addClass("disabled")
            }
        }), $(window).on("resize", function() {
            page_resized(), theme_shell_adapt()
        }), setTimeout(function() {
            window.onbeforeunload = function() {
                if (get_onbeforeunload_status()) return "object" == typeof NProgress && NProgress.done(), !0;
                window.setTimeout(function() {
                    v___available_navigation ? window.location = v___location_prefix || "/" : "object" == typeof NProgress && NProgress.start()
                }, 0), window.onbeforeunload = null
            }, $(function() {
                v___available_navigation || "object" == typeof NProgress && NProgress.done()
            }), "debug" === get_server_data("debug") && (window.onerror = function(e, t, i) {
                console.log("Error", {
                    acc: "error",
                    data: "Error:" + e + " URL:" + t + " L:" + i
                })
            })
        }, 100), theme_alert_charset(), favorites_detect(), page_render(0), setTimeout(function() {
            v___initial_load = 0
        }, 1e3)
    })
}