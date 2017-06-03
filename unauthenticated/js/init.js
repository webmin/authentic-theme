/*!
 * Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
 */
;
$__theme_name__ = "authentic";
$___________ready = 0;
t___wi = window;
t__wi_p = t___wi.parent;
t__wi_p.$___________right = 0;
t__wi_p.$____shelling__ = 0;
t__wi_p.$____loader_block__ = 0;
t__wi_p.$____cm__has_init__ = 0;
t__wi_p.$____has_frame__ = (!!t__wi_p.$("aside").length ? 1 : 0);
const $t_av__session = $("html").data("session"),
    $t_av__script_name = $("html").data("script-name").replace(/^\//g, ""),
    $hostname = $("html").data("hostname"),
    $t_av_sestatus = $("html").data("sestatus");
var __isNM = ($("html").attr("data-night-mode") == "1" ? 1 : 0);
typeof t__wi_p.$___________lrs_r_l == "undefined" ? t__wi_p.$___________lrs_r_l = 0 : false;
if (t___wi.location == t__wi_p.location) {
    t__wi_p.$___________left = 0
}
typeof t__wi_p.$___________initial == "undefined" ? t__wi_p.$___________initial = 1 : false;
typeof t__wi_p.$___ajax_requested_url == "undefined" ? t__wi_p.$___ajax_requested_url = "_blank" : false;
typeof settings_mailbox_slash_delimiter == "undefined" ? settings_mailbox_slash_delimiter = true : false;
typeof settings_window_autoscroll == "undefined" ? settings_window_autoscroll = true : false;
typeof settings_right_reload == "undefined" ? settings_right_reload = true : false;
typeof settings_right_default_tab_usermin == "undefined" ? settings_right_default_tab_usermin = "/" : false;
typeof settings_right_virtualmin_default == "undefined" ? settings_right_virtualmin_default = "sysinfo.cgi" : false;
typeof settings_right_cloudmin_default == "undefined" ? settings_right_cloudmin_default = "sysinfo.cgi" : false;
typeof settings_navigation_color == "undefined" ? settings_navigation_color = "blue" : false;
typeof settings_background_color == "undefined" ? settings_background_color = "gainsboro" : false;
typeof settings_cm_view_palette == "undefined" ? settings_cm_view_palette = "monokai" : false;
typeof settings_cm_editor_palette == "undefined" ? settings_cm_editor_palette = "monokai" : false;
typeof settings_side_slider_palette == "undefined" ? settings_side_slider_palette = "grey" : false;
typeof settings_side_slider_enabled == "undefined" ? settings_side_slider_enabled = true : false;
typeof settings_side_slider_fixed == "undefined" ? settings_side_slider_fixed = false : false;
typeof settings_side_slider_sysinfo_enabled == "undefined" ? settings_side_slider_sysinfo_enabled = true : false;
typeof settings_side_slider_notifications_enabled == "undefined" ? settings_side_slider_notifications_enabled = true : false;
typeof settings_side_slider_favorites_enabled == "undefined" ? settings_side_slider_favorites_enabled = true : false;
typeof settings_side_slider_tabs_hotkeys == "undefined" ? settings_side_slider_tabs_hotkeys = true : false;
config_portable_module_filemanager_hide_actions = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_hide_actions") == "false" ? false : true);
config_portable_module_filemanager_hide_toolbar = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_hide_toolbar") == "true" ? true : false);
config_portable_module_filemanager_hovered_toolbar = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_hovered_toolbar") == "true" ? true : false);
config_portable_module_filemanager_notification_type = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_notification_type") ? localStorage.getItem($hostname + "-config_portable_module_filemanager_notification_type") : 1);
config_portable_module_filemanager_calculate_size = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_calculate_size") == "true" ? true : false);
config_portable_module_filemanager_switch_user = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_switch_user") == "false" ? false : true);
config_portable_module_filemanager_remember_tabs = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_filemanager_remember_tabs") == "false" ? false : true);
config_portable_module_xsql_fit_content_screen_height = (typeof localStorage != "undefined" && localStorage.getItem($hostname + "-config_portable_module_xsql_fit_content_screen_height") == "true" ? true : false);
typeof settings_hotkeys_active == "undefined" ? settings_hotkeys_active = true : false;
typeof settings_button_tooltip == "undefined" ? settings_button_tooltip = true : false;
typeof settings_hotkey_toggle_modifier == "undefined" ? settings_hotkey_toggle_modifier = "altKey" : false;
typeof settings_hotkey_toggle_key_webmin == "undefined" ? settings_hotkey_toggle_key_webmin = "w" : false;
typeof settings_hotkey_toggle_key_virtualmin == "undefined" ? settings_hotkey_toggle_key_virtualmin = "v" : false;
typeof settings_hotkey_toggle_key_cloudmin == "undefined" ? settings_hotkey_toggle_key_cloudmin = "c" : false;
typeof settings_hotkey_toggle_key_usermin == "undefined" ? settings_hotkey_toggle_key_usermin = "u" : false;
typeof settings_hotkey_toggle_key_webmail == "undefined" ? settings_hotkey_toggle_key_webmail = "m" : false;
typeof settings_hotkey_toggle_key_night_mode == "undefined" ? settings_hotkey_toggle_key_night_mode = "l" : false;
typeof settings_hotkey_shell == "undefined" ? settings_hotkey_shell = "k" : false;
typeof settings_hotkey_sysinfo == "undefined" ? settings_hotkey_sysinfo = "i" : false;
typeof settings_hotkey_favorites == "undefined" ? settings_hotkey_favorites = "f" : false;
typeof settings_hotkey_focus_search == "undefined" ? settings_hotkey_focus_search = "s" : false;
typeof settings_hotkey_toggle_slider == "undefined" ? settings_hotkey_toggle_slider = "n" : false;
typeof settings_hotkey_reload == "undefined" ? settings_hotkey_reload = "r" : false;
typeof settings_global_passgen_format == "undefined" ? settings_global_passgen_format = "12|a-z,A-Z,0-9,#" : false;
typeof settings_window_replace_timestamps == "undefined" ? settings_window_replace_timestamps = true : false;
typeof settings_window_replaced_timestamp_format_full == "undefined" ? settings_window_replaced_timestamp_format_full = "LLLL" : false;
typeof settings_window_replaced_timestamp_format_short == "undefined" ? settings_window_replaced_timestamp_format_short = "L, LTS" : false;
typeof settings_leftmenu_vm_cm_dropdown_icons == "undefined" ? settings_leftmenu_vm_cm_dropdown_icons = true : false;
typeof settings_hotkey_custom_1 == "undefined" ? settings_hotkey_custom_1 = false : false;
typeof settings_hotkey_custom_2 == "undefined" ? settings_hotkey_custom_2 = false : false;
typeof settings_hotkey_custom_3 == "undefined" ? settings_hotkey_custom_3 = false : false;
typeof settings_hotkey_custom_4 == "undefined" ? settings_hotkey_custom_4 = false : false;
typeof settings_hotkey_custom_5 == "undefined" ? settings_hotkey_custom_5 = false : false;
typeof settings_hotkey_custom_6 == "undefined" ? settings_hotkey_custom_6 = false : false;
typeof settings_hotkey_custom_7 == "undefined" ? settings_hotkey_custom_7 = false : false;
typeof settings_hotkey_custom_8 == "undefined" ? settings_hotkey_custom_8 = false : false;
typeof settings_hotkey_custom_9 == "undefined" ? settings_hotkey_custom_9 = false : false;
typeof settings_side_slider_background_refresh_time == "undefined" ? settings_side_slider_background_refresh_time = 5 : false;
typeof settings_leftmenu_width == "undefined" ? settings_leftmenu_width = 260 : false;
typeof settings_sysinfo_easypie_charts == "undefined" ? settings_sysinfo_easypie_charts = true : false;
typeof settings_sysinfo_easypie_charts_size == "undefined" ? settings_sysinfo_easypie_charts_size = 172 : (settings_sysinfo_easypie_charts_size = parseInt(settings_sysinfo_easypie_charts_size));
typeof settings_sysinfo_easypie_charts_width == "undefined" ? settings_sysinfo_easypie_charts_width = 4 : (settings_sysinfo_easypie_charts_width = parseInt(settings_sysinfo_easypie_charts_width));
typeof settings_sysinfo_easypie_charts_scale == "undefined" ? settings_sysinfo_easypie_charts_scale = 8 : (settings_sysinfo_easypie_charts_scale = parseInt(settings_sysinfo_easypie_charts_scale));
typeof settings_sysinfo_theme_updates == "undefined" ? settings_sysinfo_theme_updates = false : false;
typeof settings_sysinfo_theme_patched_updates == "undefined" ? settings_sysinfo_theme_patched_updates = false : false;
typeof settings_sysinfo_csf_updates == "undefined" ? settings_sysinfo_csf_updates = false : false;
typeof settings_sysinfo_link_mini == "undefined" ? settings_sysinfo_link_mini = false : false;
typeof settings_loader_top == "undefined" ? settings_loader_top = true : false;
typeof settings_animation_left == "undefined" ? settings_animation_left = true : false;
settings_animation_left ? $settings_animation_left_slide_time = 280 : $settings_animation_left_slide_time = 0;
typeof settings_animation_tabs == "undefined" ? settings_animation_tabs = true : false;
settings_animation_tabs ? $settings_animation_tabs_slide_time = 280 : $settings_animation_tabs_slide_time = 0;
typeof settings_show_terminal_link == "undefined" ? settings_show_terminal_link = true : false;
typeof settings_favorites == "undefined" ? settings_favorites = true : false;
try {
    t__wi_p.$
} catch (e) {
    t__wi_p = window
}
if (typeof localStorage == "object") {
    try {
        localStorage.setItem("d41d8cd98f00", 1);
        localStorage.removeItem("d41d8cd98f00");
        $_v__ls__a = 1
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
        $_v__ls__a = 0
    }
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(c, b) {
        var a = this.toString();
        if (typeof b !== "number" || !isFinite(b) || Math.floor(b) !== b || b > a.length) {
            b = a.length
        }
        b -= c.length;
        var d = a.lastIndexOf(c, b);
        return d !== -1 && d === b
    }
}
if (!String.prototype.startsWith) {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(b, a) {
            a = a || 0;
            return this.indexOf(b, a) === a
        }
    }
}

function detect_msbrowser() {
    var c = window.navigator.userAgent;
    var b = c.indexOf("MSIE ");
    if (b > 0) {
        return parseInt(c.substring(b + 5, c.indexOf(".", b)), 10)
    }
    var a = c.indexOf("Trident/");
    if (a > 0) {
        var f = c.indexOf("rv:");
        return parseInt(c.substring(f + 3, c.indexOf(".", f)), 10)
    }
    var d = c.indexOf("Edge/");
    if (d > 0) {
        return parseInt(c.substring(d + 5, c.indexOf(".", d)), 10)
    }
    return false
}

function escape_html(b) {
    var a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "=": "&#61;"
    };
    return String(b).replace(/[&<>"'=]/g, function(c) {
        return a[c]
    })
}

function decode_html(d) {
    var c = [
        ["amp", "&"],
        ["apos", "'"],
        ["#x27", "'"],
        ["#x2F", "/"],
        ["#39", "'"],
        ["#47", "/"],
        ["#61", "="],
        ["lt", "<"],
        ["gt", ">"],
        ["nbsp", " "],
        ["quot", '"']
    ];
    if (!!d) {
        for (var b = 0, a = c.length; b < a; ++b) {
            d = String(d).replace(new RegExp("&" + c[b][0] + ";", "g"), c[b][1])
        }
    }
    return !!d ? d : ""
}
$_v__ls__a ? _v__ls__a = "" : _v__ls__a = " hidden";

function n___p__f(b) {
    var a = t__wi_p.$("#wrapper").data("access-level");
    if (a != "0" && is_module("status") != "1") {
        return
    }
    if (b) {
        t__wi_p.$("body .right-side-tabs-toggler").addClass("hidden");
        t__wi_p.$("body .right-side-tabs").css("right", "0px").addClass("right-side-tabs-fixed");
        if (settings_side_slider_enabled) {
            t__wi_p.$("html").attr("data-slider-fixed", "1")
        }
    } else {
        if (settings_side_slider_enabled) {
            t__wi_p.$("body .right-side-tabs-toggler").removeClass("hidden opened").css("right", "0")
        }
        t__wi_p.$("body .right-side-tabs").css("right", "-302px").removeClass("right-side-tabs-fixed");
        t__wi_p.$("html").attr("data-slider-fixed", "0")
    }
}
if (t__wi_p.$(".mobile-menu-toggler:visible").length) {
    n___p__f(0)
}

function upperFirst(a) {
    return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
}

function upperFirstLowerAll(a) {
    return (a.length ? upperFirst(a.toLowerCase()) : a)
}
Object.defineProperty(Array.prototype, "reOrder", {
    enumerable: false,
    value: function(c, a) {
        if (a >= this.length) {
            var b = a - this.length;
            while ((b--) + 1) {
                this.push(undefined)
            }
        }
        this.splice(a, 0, this.splice(c, 1)[0]);
        return this
    }
});

function __slm() {
    if (t__wi_p.$("aside").css("transform") == "none") {
        t__wi_p.$("aside").transition({
            x: settings_leftmenu_width
        }, 600, function() {
            if (t__wi_p.$(".__logo") && t__wi_p.$(".__logo").css("transform") == "none" && !t__wi_p.$(".mobile-menu-toggler:visible").length) {
                t__wi_p.$(".__logo").transition({
                    y: "-140px"
                }, 900)
            }
        });
        setTimeout(function() {
            t__wi_p.$(".switch-toggle").css("display", "table")
        }, 1)
    }
}
__slm();
! function(b, a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : b.sortable = a(b.jQuery)
}(this, function(J) {
    var w, N, z = J(),
        C = [],
        F = function(a) {
            a.off("dragstart.h5s"), a.off("dragend.h5s"), a.off("selectstart.h5s"), a.off("dragover.h5s"), a.off("dragenter.h5s"), a.off("drop.h5s")
        },
        B = function(a) {
            a.off("dragover.h5s"), a.off("dragenter.h5s"), a.off("drop.h5s")
        },
        K = function(b, a) {
            b.dataTransfer.effectAllowed = "move", b.dataTransfer.setData("text", ""), b.dataTransfer.setDragImage && b.dataTransfer.setDragImage(a.item, a.x, a.y)
        },
        y = function(b, a) {
            return a.x || (a.x = parseInt(b.pageX - a.draggedItem.offset().left)), a.y || (a.y = parseInt(b.pageY - a.draggedItem.offset().top)), a
        },
        E = function(a) {
            return {
                item: a[0],
                draggedItem: a
            }
        },
        I = function(d, c) {
            var b = E(c);
            b = y(d, b), K(d, b)
        },
        G = function(b, a) {
            return "undefined" == typeof b ? a : b
        },
        H = function(a) {
            a.removeData("opts"), a.removeData("connectWith"), a.removeData("items"), a.removeAttr("aria-dropeffect")
        },
        L = function(a) {
            a.removeAttr("aria-grabbed"), a.removeAttr("draggable"), a.removeAttr("role")
        },
        q = function(b, a) {
            return b[0] === a[0] ? !0 : void 0 !== b.data("connectWith") ? b.data("connectWith") === a.data("connectWith") : !1
        },
        A = function(f) {
            var c = f.data("opts") || {},
                b = f.children(c.items),
                d = c.handle ? b.find(c.handle) : b;
            B(f), H(f), d.off("mousedown.h5s"), F(b), L(b)
        },
        D = function(d) {
            var b = d.data("opts"),
                f = d.children(b.items),
                g = b.handle ? f.find(b.handle) : f;
            d.attr("aria-dropeffect", "move"), g.attr("draggable", "true");
            var c = (document || window.document).createElement("span");
            "function" != typeof c.dragDrop || b.disableIEFix || g.on("mousedown.h5s", function() {
                -1 !== f.index(this) ? this.dragDrop() : J(this).parents(b.items)[0].dragDrop()
            })
        },
        k = function(f) {
            var c = f.data("opts"),
                b = f.children(c.items),
                d = c.handle ? b.find(c.handle) : b;
            f.attr("aria-dropeffect", "none"), d.attr("draggable", !1), d.off("mousedown.h5s")
        },
        M = function(f) {
            var c = f.data("opts"),
                b = f.children(c.items),
                d = c.handle ? b.find(c.handle) : b;
            F(b), d.off("mousedown.h5s"), B(f)
        },
        j = function(b, d) {
            var c = J(b),
                a = String(d);
            return d = J.extend({
                connectWith: !1,
                placeholder: null,
                dragImage: null,
                disableIEFix: !1,
                placeholderClass: "sortable-placeholder",
                draggingClass: "sortable-dragging",
                hoverClass: !1
            }, d), c.each(function() {
                var l = J(this);
                if (/enable|disable|destroy/.test(a)) {
                    return void j[a](l)
                }
                d = G(l.data("opts"), d), l.data("opts", d), M(l);
                var m, n, t, o = l.children(d.items),
                    f = null === d.placeholder ? J("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : "div") + ' class="' + d.placeholderClass + '"/>') : J(d.placeholder).addClass(d.placeholderClass);
                if (!l.attr("data-sortable-id")) {
                    var h = C.length;
                    C[h] = l, l.attr("data-sortable-id", h), o.attr("data-item-sortable-id", h)
                }
                if (l.data("items", d.items), z = z.add(f), d.connectWith && l.data("connectWith", d.connectWith), D(l), o.attr("role", "option"), o.attr("aria-grabbed", "false"), d.hoverClass) {
                    var r = "sortable-over";
                    "string" == typeof d.hoverClass && (r = d.hoverClass), o.hover(function() {
                        J(this).addClass(r)
                    }, function() {
                        J(this).removeClass(r)
                    })
                }
                o.on("dragstart.h5s", function(g) {
                    g.stopImmediatePropagation(), d.dragImage ? (K(g.originalEvent, {
                        item: d.dragImage,
                        x: 0,
                        y: 0
                    }), console.log("WARNING: dragImage option is deprecated and will be removed in the future!")) : I(g.originalEvent, J(this), d.dragImage), w = J(this), w.addClass(d.draggingClass), w.attr("aria-grabbed", "true"), m = w.index(), N = w.height(), n = J(this).parent(), w.parent().triggerHandler("sortstart", {
                        item: w,
                        placeholder: f,
                        startparent: n
                    })
                }), o.on("dragend.h5s", function() {
                    w && (w.removeClass(d.draggingClass), w.attr("aria-grabbed", "false"), w.show(), z.detach(), t = J(this).parent(), w.parent().triggerHandler("sortstop", {
                        item: w,
                        startparent: n
                    }), (m !== w.index() || n.get(0) !== t.get(0)) && w.parent().triggerHandler("sortupdate", {
                        item: w,
                        index: t.children(t.data("items")).index(w),
                        oldindex: o.index(w),
                        elementIndex: w.index(),
                        oldElementIndex: m,
                        startparent: n,
                        endparent: t
                    }), w = null, N = null)
                }), J(this).add([f]).on("drop.h5s", function(g) {
                    return q(l, J(w).parent()) ? (g.stopPropagation(), z.filter(":visible").after(w), w.trigger("dragend.h5s"), !1) : void 0
                }), o.add([this]).on("dragover.h5s dragenter.h5s", function(u) {
                    if (q(l, J(w).parent())) {
                        if (u.preventDefault(), u.originalEvent.dataTransfer.dropEffect = "move", o.is(this)) {
                            var p = J(this).height();
                            if (d.forcePlaceholderSize && f.height(N), p > N) {
                                var i = p - N,
                                    g = J(this).offset().top;
                                if (f.index() < J(this).index() && u.originalEvent.pageY < g + i) {
                                    return !1
                                }
                                if (f.index() > J(this).index() && u.originalEvent.pageY > g + p - i) {
                                    return !1
                                }
                            }
                            w.hide(), f.index() < J(this).index() ? J(this).after(f) : J(this).before(f), z.not(f).detach()
                        } else {
                            z.is(this) || J(this).children(d.items).length || (z.detach(), J(this).append(f))
                        }
                        return !1
                    }
                })
            })
        };
    return j.destroy = function(a) {
        A(a)
    }, j.enable = function(a) {
        D(a)
    }, j.disable = function(a) {
        k(a)
    }, J.fn.sortable = function(a) {
        return j(this, a)
    }, j
});
(function(c) {
    function a(g) {
        var f = c(this);
        f.data("mouseheld_timeout", setTimeout(function() {
            f.trigger("mouseheld")
        }, g.data))
    }

    function b() {
        var f = c(this);
        clearTimeout(f.data("mouseheld_timeout"))
    }
    var d = c.event.special.mouseheld = {
        setup: function(f) {
            var g = c(this);
            g.bind("mousedown", +f || d.time, a);
            g.bind("mouseleave mouseup", b)
        },
        teardown: function() {
            var f = c(this);
            f.unbind("mousedown", a);
            f.unbind("mouseleave mouseup", b)
        },
        time: 750
    }
})(jQuery);

function array_flip(c) {
    var b, a = {};
    for (b in c) {
        if (c.hasOwnProperty(b)) {
            a[c[b]] = b
        }
    }
    return a
}

function removeLastDirectoryPartOf(a) {
    var b = a.split("/");
    b.pop();
    return (b.join("/"))
}

function arrayIntersect(g, d) {
    var f = [];
    $.each(g, function(b, a) {
        if (d.match(new RegExp(a, "gi"))) {
            f.push(a)
        }
    });
    return !$.isEmptyObject(f)
}

function is_numeric(a) {
    return Number(parseFloat(a)) == a
}

function is_module(a) {
    if (t__wi_p.$("body").data(a) != undefined) {
        if (t__wi_p.$('iframe[name="page"]').contents().length && t__wi_p.$('iframe[name="page"]').contents().find("body").data(a) != undefined) {
            return t__wi_p.$('iframe[name="page"]').contents().find("body").data(a)
        } else {
            return t__wi_p.$("body").data(a)
        }
    } else {
        if ($.inArray(a, t__wi_p.$("body").data("available-modules")) > -1) {
            return true
        } else {
            return false
        }
    }
}

function is__m(a) {
    return $('body[class*="' + a + '"]').length
}

function is__f(a) {
    return ($__source_file == a)
}

function is__mf(a, b) {
    return ($('body[class*="' + a + '"]').length && $__source_file == b)
}

function is__mfq(a, c, b) {
    return ($('body[class*="' + a + '"]').length && $__source_file == c && ($__source_query && $__source_query.indexOf(b) !== -1))
}

function lang(b, a) {
    typeof a == "undefined" ? a = false : false;
    var c = t__wi_p.$("body").data("language-strings");
    if (a) {
        return c ? array_flip(c)[$.trim(b)] : false
    } else {
        return c ? c[b] : false
    }
}

function manageConfig(d) {
    var b = ["config_portable_module_csf_style_custom_promoted", "config_portable_theme_charset_warning_shown", "config_portable_module_xsql_fit_content_screen_height", "config_portable_module_filemanager_hide_toolbar", "config_portable_module_filemanager_hovered_toolbar", "config_portable_module_filemanager_hide_actions", "config_portable_module_filemanager_remember_tabs", "config_portable_module_filemanager_calculate_size", "config_portable_module_filemanager_switch_user", "config_portable_module_filemanager_notification_type"];
    if (d == "get_options") {
        return b
    }
    if (d == "save") {
        var a = {},
            c = 0;
        $.each(localStorage, function(g, f) {
            if (typeof g == "string" && g.indexOf($hostname) > -1 && arrayIntersect(b, g)) {
                if (f == "true") {
                    c = true
                } else {
                    if (f == "false") {
                        c = false
                    } else {
                        if (is_numeric(f)) {
                            c = parseInt(f)
                        } else {
                            c = f
                        }
                    }
                }
                if (c != "undefined") {
                    a[g.replace($hostname + "-", "")] = c
                }
            }
        });
        a.settings_force_night_mode = __isNM;
        t__wi_p.settings_font_family != "undefind" && (a.settings_font_family = t__wi_p.settings_font_family);
        t__wi_p.settings_navigation_color != "undefind" && (a.settings_navigation_color = t__wi_p.settings_navigation_color);
        t__wi_p.settings_background_color != "undefind" && (a.settings_background_color = t__wi_p.settings_background_color);
        t__wi_p.settings_cm_editor_palette != "undefind" && (a.settings_cm_editor_palette = t__wi_p.settings_cm_editor_palette);
        t__wi_p.settings_button_tooltip != "undefind" && (a.settings_button_tooltip = t__wi_p.settings_button_tooltip);
        t__wi_p.settings_hide_top_loader != "undefind" && (a.settings_hide_top_loader = t__wi_p.settings_hide_top_loader);
        t__wi_p.settings_animation_left != "undefind" && (a.settings_animation_left = t__wi_p.settings_animation_left);
        t__wi_p.settings_animation_tabs != "undefind" && (a.settings_animation_tabs = t__wi_p.settings_animation_tabs);
        t__wi_p.settings_sysinfo_link_mini != "undefind" && (a.settings_sysinfo_link_mini = t__wi_p.settings_sysinfo_link_mini);
        t__wi_p.settings_show_night_mode_link != "undefind" && (a.settings_show_night_mode_link = t__wi_p.settings_show_night_mode_link);
        t__wi_p.settings_theme_options_button != "undefind" && (a.settings_theme_options_button = t__wi_p.settings_theme_options_button);
        t__wi_p.settings_leftmenu_button_refresh != "undefind" && (a.settings_leftmenu_button_refresh = t__wi_p.settings_leftmenu_button_refresh);
        t__wi_p.settings_hotkeys_active != "undefind" && (a.settings_hotkeys_active = t__wi_p.settings_hotkeys_active);
        t__wi_p.$___ajax_requested_url = "___blocked";
        setTimeout(function() {
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi?xhr-manage-config=1&save=1",
                data: a,
                dataType: "text",
                success: function(f) {
                    setTimeout(function() {
                        if (typeof t___wi.page.at__s_s__b == "function") {
                            t__wi_p.$____has_frame__ ? t___wi.page.at__s_s__b(0) : at__s_s__b(0)
                        }
                    }, 400)
                },
                error: function() {}
            })
        }, 300)
    } else {
        if (d === "load") {
            t__wi_p.$___ajax_requested_url = "___blocked";
            var c = 0;
            $.ajax({
                type: "GET",
                url: $_____link_full + "/index.cgi?xhr-manage-config=1&load=1",
                data: false,
                dataType: "json",
                success: function(f) {
                    $.each(f, function(h, g) {
                        if (g == "true") {
                            c = true
                        } else {
                            if (g == "false") {
                                c = false
                            } else {
                                if (is_numeric(g)) {
                                    c = parseInt(g)
                                } else {
                                    c = g
                                }
                            }
                        }
                        localStorage.setItem(($hostname + "-" + h), c);
                        window[h] = c
                    })
                },
                error: function() {}
            })
        }
    }
}

function __lrs(j, g) {
    var h = t__wi_p.document.getElementById("iframe"),
        k = t__wi_p.document.activeElement,
        i = ["export", "export as csv.", "download", "upload"];
    if (k) {
        if (($(k).is("a") && $(k).attr("href") && ($(k).attr("href").indexOf("awstats/view.cgi") > -1 || $(k).attr("href").indexOf("cwaf") > -1))) {
            return
        }
    }
    h ? h = h.contentDocument.activeElement : h = false;
    if (h) {
        if ((t__wi_p.$('iframe[name="page"]').attr("src") !== "/csf/") && (($(h).is("a") && $(h).attr("href") && ($(h).attr("href").indexOf("webminlog.csv") > -1 || $(h).attr("href").indexOf("detach.cgi") > -1 || $(h).attr("href").indexOf("download.cgi") > -1 || ($("body.virtualmin-awstats") && $("body.virtualmin-awstats").length && $(h).attr("href").indexOf("view.cgi?config") > -1))) || ($(h).is("a") && $(h).text() && (arrayIntersect(i, $(h).text()))) || ($(h).is("input") && $(h).val() && (arrayIntersect(i, $(h).val()) || $(h).parents('form[action="create_vpn.cgi"]').length)))) {
            return
        }
    }
    if (t__wi_p.$('iframe[name="page"]').attr("src") && t__wi_p.$('iframe[name="page"]').attr("src").indexOf("cwaf") > -1) {
        return
    }
    typeof j == "undefined" ? j = false : j = true;
    typeof g == "undefined" ? g = 80 : false;
    if (t__wi_p.$___________initial === 1) {
        t__wi_p.$(".loader-container").addClass("loading-started");
        if (((t__wi_p.$("aside").css("transform") == "none" || t__wi_p.$("aside").css("transform") != "matrix(1, 0, 0, 1, " + settings_leftmenu_width + ", 0)") && !t__wi_p.$(".btn-menu-toggler").is(":visible"))) {
            t__wi_p.$(".loader-container").css("background-color", "#ededed").css("display", "block")
        } else {
            t__wi_p.setTimeout(function() {
                if (t__wi_p.$___________right === 0 && t__wi_p.$___________lrs_r_l === 0) {
                    t__wi_p.$___________lrs_r_l = 1;
                    if (t__wi_p.$(".loader-container").hasClass("loading-started")) {
                        if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
                            t__wi_p.NProgress.remove();
                            t__wi_p.NProgress.start()
                        }
                        t__wi_p.$(".loader-container").css("background-color", "#ededed").css("display", "block")
                    }
                    t__wi_p.setTimeout(function() {
                        t__wi_p.$___________lrs_r_l = 0
                    }, 1500)
                }
            }, 1500)
        }
    } else {
        if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
            t__wi_p.NProgress.remove();
            t__wi_p.NProgress.start()
        }
    }
}

function product_name_lang(d) {
    if (t__wi_p.$("#wrapper").data("server-manager") != -1) {
        return lang("theme_xhred_titles_cm")
    } else {
        if (t__wi_p.$("#wrapper").data("virtual-server") != -1) {
            return lang("theme_xhred_titles_vm")
        } else {
            if (t__wi_p.$("#wrapper").data("webmail") != -1 && !d) {
                return lang("theme_xhred_titles_mail")
            } else {
                var c = t__wi_p.$("#wrapper").data("product");
                return (c == "webmin" ? lang("theme_xhred_titles_wm") : lang("theme_xhred_titles_um"))
            }
        }
    }
}

function product_name(d) {
    if (t__wi_p.$("#wrapper").data("server-manager") != -1) {
        return "Cloudmin"
    } else {
        if (t__wi_p.$("#wrapper").data("virtual-server") != -1) {
            return "Virtualmin"
        } else {
            if (t__wi_p.$("#wrapper").data("webmail") != -1 && !d) {
                return "Mail"
            } else {
                var c = t__wi_p.$("#wrapper").data("product");
                return c.charAt(0).toUpperCase() + c.slice(1)
            }
        }
    }
}

function __s___() {
    if (t__wi_p.$____loader_block__) {
        return
    }
    var g = t__wi_p.$('iframe[name="page"]').get(0),
        d = t__wi_p.$('iframe[name="page"]').contents(),
        d = (d.length ? d : $(document));
    if (g && typeof g.contentWindow.$ != "function" || !__num()) {
        return
    }
    var b = false,
        f = false,
        c = false;
    if (g) {
        f = g.contentWindow.$("body");
        b = g.contentWindow.$("body").find(".container-fluid");
        c = g.contentWindow.$("head")
    } else {
        f = $("body");
        b = $("body").find(".container-fluid");
        c = $("head")
    }
    b.css({
        opacity: 1,
        "pointer-events": "auto"
    });
    f.css("overflow", "auto");
    c.find("#__tmp_no_overflow").remove()
}

function __lre(a) {
    typeof a == "undefined" ? a = 1 : false;
    if (t__wi_p.$____loader_block__) {
        return
    }
    __s___();
    t__wi_p.$(".loader-container").removeClass("loading-started").css("background-color", "transparent").css("display", "none");
    t__wi_p.$('iframe[name="page"]').css("opacity", 1);
    if (t__wi_p.$("aside").css("transform") == "none") {
        __slm()
    }
    if (__num()) {
        if (typeof t__wi_p.$('iframe[name="page"]').get(0) !== "undefined" && typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__dlm == "function") {
            t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__dlm()
        }
    }
    t__wi_p.$(".loader .loader-close").hide();
    if (settings_loader_top && t__wi_p.t___p__xhr_l === 0 && __num() && a) {
        t__wi_p.NProgress.done()
    }
    if (typeof hide_mobile_menu == "function") {
        hide_mobile_menu()
    }
}

function f__r__s(b, a) {
    if (typeof $.injectCSS == "function") {
        t__wi_p.$("#injected-css").remove();
        a ? (a = "translate(" + a + "px, 0px) !important") : (a = false);
        $.injectCSS({
            "#sidebar": {
                left: -b + "px",
                width: b + "px",
                transform: a
            },
            ".switch-toggle": {
                width: b + "px"
            },
            "#content.__page": {
                "margin-left": b + "px"
            },
            ".autocomplete-suggestions": {
                "min-width": (b - 23) + "px !important"
            },
            ".__logo": {
                width: b + "px",
                "max-width": b + "px"
            }
        });
        if (t__wi_p.$("aside select").length) {
            t__wi_p.$("aside select[data-autocomplete-title]").attr("style", "width:" + (b - 24) + "px; margin-top: 0 !important");
            t__wi_p.t_sel_i()
        }
    }
}

function f__c_view() {
    if (typeof t__wi_p.settings_leftmenu_width_initial == "undefined") {
        t__wi_p.settings_leftmenu_width_initial = t__wi_p.settings_leftmenu_width
    }
    if (t__wi_p.matchMedia("(max-width: 767px)").matches) {
        t__wi_p.settings_leftmenu_width = 260;
        t__wi_p.f__r__s(t__wi_p.settings_leftmenu_width, 0)
    } else {
        if (t__wi_p.$___________initial === 1) {
            return
        }
        t__wi_p.settings_leftmenu_width = t__wi_p.settings_leftmenu_width_initial;
        t__wi_p.f__r__s(t__wi_p.settings_leftmenu_width, t__wi_p.settings_leftmenu_width)
    }
}

function s(d) {
    var g = document.getElementsByTagName("head")[0];
    var f = document.createElement("script");
    f.type = "text/javascript";
    f.src = d;
    g.appendChild(f)
}
if (t__wi_p.$___________initial === 1 || detect_msbrowser()) {
    if (detect_msbrowser()) {
        t__wi_p.$('iframe[name="page"]').unbind("load")
    }
    t__wi_p.$('iframe[name="page"]').on("load", function() {
        if (t__wi_p.$___________initial === 1 && typeof $__post_init_script != "undefined") {
            setTimeout(function() {
                $.each(manageConfig("get_options"), function(b, a) {
                    localStorage.setItem(($hostname + "-" + a), t__wi_p[a]);
                    window[a] = t__wi_p[a]
                })
            }, 500);
            __mss();
            t__wi_p.fetch_right_pane_favorites()
        }
        var c = t__wi_p.$('iframe[name="page"]').contents();
        if (c && c.find('iframe[name="page"]').length) {
            console.log("Error! Entered fail state.. Authentic Theme is reloading...");
            t___wi.top.location.reload();
            return
        }
        var d = false;
        if (c && c.find("title").text() && c.find("title").text().indexOf("ConfigServer Security & Firewall") > -1) {
            d = true
        }
        if (__num() && !d) {
            t__wi_p.__lre()
        }
        if ($("body").find(".form-signin-banner").length === 1 || $("body").find('form[action*="session_login.cgi"]').length === 1 || $("body").find('form[action*="pam_login.cgi"]').length === 1 || $("body").is("[vlink=#376ebd]")) {
            t__wi_p.location = t___wi.location.origin
        }
        ____iframe___ = t__wi_p.$("#iframe")[0];
        if (!t__wi_p.$(".form-control.sidebar-search").is(":focus")) {
            ____iframe___ && ____iframe___.contentWindow.focus()
        }
        $("body").on("shown.bs.modal", ".modal.in", function() {
            $(this).focus()
        });
        setTimeout(function() {
            if (typeof t__m__m != "undefined" && typeof t__m__m == "function") {
                t__m__m(false, true)
            }
            t__wi_p.$___________m_locked = 0
        }, 200);
        setTimeout(function() {
            t__wi_p.$___________initial = 0
        }, 1000);
        $("body").find('a[href*="virtual-server/switch_user.cgi"]').attr("target", "_parent");
        if (c && !c.text().match(/___authentic_theme_footer___/)) {
            if (d) {
                return
            }
            __lre();
            if (typeof $load____ext != "undefined") {
                s(t__wi_p.$_____link_full + "/unauthenticated/js/postinit." + $load____ext + ".js?" + $g__t__ver_str + "");
                s(t__wi_p.$_____link_full + "/unauthenticated/js/content." + $load____ext + ".js?" + $g__t__ver_str + "")
            }
        }
        if (settings_loader_top && t__wi_p.t___p__xhr_l === 0 && __num() && !t__wi_p.$____loader_block__) {
            t__wi_p.NProgress.done()
        }
        if (typeof t__wi_p.__dpt == "function") {
            t__wi_p.__dpt()
        }
        $("body").unbind("mousewheel");
        !t__wi_p.$___________initial && __lre();
        delete __________was_runner___;
        t__wi_p.$___________right = 1;
        $(function() {
            if (t__wi_p.location.search == "?theme-update-finished" || $("#wrapper").data("notice") == 1) {
                t__wi_p.$('.right-side-tabs-notification[data-type="authentic_remote_version"]').find("i.af-clear-all").trigger("click");
                $("#update_notice").modal("show");
                __s___()
            }
        })
    })
}
$(function() {
    if ($("html.session_login").length) {
        $("body").attr("style", $("body").data("style"));
        if (t__wi_p.$("aside").length) {
            t__wi_p.location.href = "/"
        }
        $("form").on("click", 'button[type="submit"]', function(b) {
            b.preventDefault();
            $(this).prop("disabled", "true").removeClass("btn-primary").addClass("btn-default").find(".fa-sign-in").removeClass("fa-sign-in").addClass("fa fa-circle-o-notch faa-spin faa-slow animated");
            $(this).parents("form").submit()
        })
    }
    if (t___wi.location == t__wi_p.location && window.matchMedia("(max-width: 767px)").matches) {
        f__c_view()
    }
    if (typeof $access_level != "undefined" && $access_level != 0) {
        settings_right_virtualmin_default = "sysinfo.cgi";
        settings_right_cloudmin_default = "sysinfo.cgi"
    }
    $___________ready = 1
});

function __num() {
    var d = URI(t___wi.location),
        c = d.path();
    if ((c && c.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-webmin-theme") || (c && c.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?downloading-webmin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?downloading-webmin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?updating-usermin-theme") || (c && c.indexOf("/usermin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-usermin-theme") || (c && c.indexOf("/usermin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?downloading-usermin-theme") || (c && c.indexOf("/usermin/install_theme.cgi") > -1 && t__wi_p.location.search == "?downloading-usermin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?theme-update-finished") || (c && c.indexOf("/webmin/edit_webmincron.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollect-system-status" || t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting-system-status")) || (c && c.indexOf("/webmin/delete_webmincron.cgi") > -1 && (t__wi_p.location.search == "?recollecting-system-status" || t__wi_p.location.search == "?recollect-system-status" || t__wi_p.location.search == "?recollect-finished" || t__wi_p.location.search == "?recollecting-finished" || t__wi_p.location.search == "?recollecting-package-updates")) || (c && c.indexOf("/package-updates/index.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollecting-package-updates" || t__wi_p.location.search == "?recollecting-package-updates-processing")) || (c && c.indexOf("/package-updates/update.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollecting-package-updates" || t__wi_p.location.search == "?recollecting-package-updates-processing" || t__wi_p.location.search == "?recollecting-finished"))) {
        return false
    } else {
        return true
    }
}

function unbuffered_header() {
    var d = URI(t___wi.location),
        c = d.path();
    if (c && c.indexOf("/virtual-server/import.cgi") > -1 || c.indexOf("/virtual-server/edit_newlinks.cgi") > -1 || c.indexOf("/virtual-server/postsave.cgi") > -1 || c.indexOf("/virtual-server/validate.cgi") > -1 || c.indexOf("/server-manager/edit_serv.cgi") > -1 || c.indexOf("/server-manager/save_serv.cgi") > -1 || c.indexOf("/server-manager/index.cgi") > -1 || c.indexOf("/server-manager/list_ifaces.cgi") > -1 || c.indexOf("/server-manager/mass_update.cgi") > -1 || c.indexOf("/server-manager/get_images.cgi") > -1 || c.indexOf("/server-manager/edit_newlinks.cgi") > -1 || c.indexOf("/server-manager/list_gces.cgi") > -1 || c.indexOf("/server-manager/list_ec2s.cgi") > -1 || c.indexOf("/server-manager/unpause.cgi") > -1 || c.indexOf("/server-manager/find.cgi") > -1 || c.indexOf("useradmin/batch_exec.cgi") > -1 || c.indexOf("useradmin/gbatch_exec.cgi") > -1 || c.indexOf("useradmin/mass_delete_user.cgi") > -1 || c.indexOf("virtual-server/domain_setup.cgi") > -1 || c.indexOf("virtual-server/upgrade.cgi") > -1 || c.indexOf("virtual-server/mass_create.cgi") > -1 || c.indexOf("virtual-server/restore.cgi") > -1 || c.indexOf("virtual-server/save_newip.cgi") > -1 || c.indexOf("virtual-server/mass_domains_change.cgi") > -1 || c.indexOf("virtual-server/save_domain.cgi") > -1 || c.indexOf("virtual-server/backup.cgi") > -1 || c.indexOf("virtual-server/save_phpmode.cgi") > -1 || c.indexOf("virtual-server/script_install.cgi") > -1 || c.indexOf("virtual-server/mass_change.cgi") > -1 || c.indexOf("virtual-server/save_ratelimit.cgi") > -1 || c.indexOf("virtual-server/mass_scripts.cgi") > -1 || c.indexOf("virtual-server/mass_upgrade.cgi") > -1 || c.indexOf("virtual-server/save_newips.cgi") > -1 || c.indexOf("virtual-server/letsencrypt.cgi") > -1 || c.indexOf("virtual-server/migrate.cgi") > -1 || c.indexOf("virtual-server/save_mail.cgi") > -1 || c.indexOf("virtual-server/mass_delete_domains.cgi") > -1 || c.indexOf("virtual-server/delete_domain.cgi") > -1 || c.indexOf("virtual-server/unscript_install.cgi") > -1 || c.indexOf("virtual-server/mass_uninstall.cgi") > -1 || c.indexOf("virtual-server/clone.cgi") > -1 || c.indexOf("virtual-server/fix_symlinks.cgi") > -1 || c.indexOf("virtual-server/disable_domain.cgi") > -1 || c.indexOf("virtual-server/delete_databases.cgi") > -1 || c.indexOf("virtual-server/move.cgi") > -1 || c.indexOf("virtual-server/enable_domain.cgi") > -1 || c.indexOf("virtual-server/transfer.cgi") > -1 || c.indexOf("virtual-server/mass_disable.cgi") > -1 || c.indexOf("virtual-server/rename.cgi") > -1 || c.indexOf("virtual-server/save_dbname.cgi") > -1 || c.indexOf("virtual-server/mass_enable.cgi") > -1 || c.indexOf("virtual-server/save_frame.cgi") > -1 || c.indexOf("virtual-server/check.cgi") > -1 || c.indexOf("virtual-server/save_newchroot.cgi") > -1 || c.indexOf("virtual-server/enable_dkim.cgi") > -1 || c.indexOf("virtual-server/save_proxy.cgi") > -1 || c.indexOf("virtual-server/save_dbpass.cgi") > -1 || c.indexOf("virtual-server/save_dbhosts.cgi") > -1 || c.indexOf("virtual-server/unalias.cgi") > -1 || c.indexOf("virtual-server/save_newautoconfig.cgi") > -1 || c.indexOf("virtual-server/quotacheck.cgi") > -1 || c.indexOf("virtual-server/unsub.cgi") > -1 || c.indexOf("virtual-server/save_domdkim.cgi") > -1 || c.indexOf("virtual-server/fix_modphp.cgi") > -1 || c.indexOf("virtual-server/connectivity.cgi") > -1 || c.indexOf("virtual-server/all_webmin.cgi") > -1 || c.indexOf("virtualmin-support/send_ticket.cgi") > -1 || c.indexOf("virtualmin-support/enable_login.cgi") > -1 || c.indexOf("virtualmin-support/disable_login.cgi") > -1 || c.indexOf("server-manager/create.cgi") > -1 || c.indexOf("server-manager/mass.cgi") > -1 || c.indexOf("server-manager/manual_image.cgi") > -1 || c.indexOf("server-manager/save_limits.cgi") > -1 || c.indexOf("server-manager/upgrade.cgi") > -1 || c.indexOf("server-manager/empty.cgi") > -1 || c.indexOf("server-manager/save_pass.cgi") > -1 || c.indexOf("server-manager/create_image.cgi") > -1 || c.indexOf("server-manager/restore.cgi") > -1 || c.indexOf("server-manager/clone.cgi") > -1 || c.indexOf("server-manager/scan.cgi") > -1 || c.indexOf("server-manager/add.cgi") > -1 || c.indexOf("server-manager/gcescan.cgi") > -1 || c.indexOf("server-manager/create_gceattach.cgi") > -1 || c.indexOf("server-manager/ec2scan.cgi") > -1 || c.indexOf("server-manager/create_domain.cgi") > -1 || c.indexOf("server-manager/restore_domain.cgi") > -1 || c.indexOf("server-manager/create_ec2attach.cgi") > -1 || c.indexOf("server-manager/newami.cgi") > -1 || c.indexOf("server-manager/move_disk.cgi") > -1 || c.indexOf("server-manager/convert_image.cgi") > -1 || c.indexOf("server-manager/save_vcpus.cgi") > -1 || c.indexOf("server-manager/boot.cgi") > -1 || c.indexOf("server-manager/delete_backuplogs.cgi") > -1 || c.indexOf("server-manager/mass_script.cgi") > -1 || c.indexOf("server-manager/save_ec2address.cgi") > -1 || c.indexOf("server-manager/mass_move.cgi") > -1 || c.indexOf("server-manager/delete_ec2attach.cgi") > -1 || c.indexOf("server-manager/move.cgi") > -1 || c.indexOf("server-manager/backup.cgi") > -1 || c.indexOf("server-manager/create_dimage.cgi") > -1 || c.indexOf("server-manager/massupload.cgi") > -1 || c.indexOf("server-manager/delete_volumes.cgi") > -1 || c.indexOf("server-manager/delete_ec2_snapshots.cgi") > -1 || c.indexOf("server-manager/download.cgi") > -1 || c.indexOf("server-manager/create_gdisk.cgi") > -1 || c.indexOf("server-manager/failover.cgi") > -1 || c.indexOf("server-manager/create_dkvolume.cgi") > -1 || c.indexOf("server-manager/upload.cgi") > -1 || c.indexOf("server-manager/transfer.cgi") > -1 || c.indexOf("server-manager/delete_gceattach.cgi") > -1 || c.indexOf("server-manager/reset.cgi") > -1 || c.indexOf("server-manager/find.cgi") > -1 || c.indexOf("server-manager/create_volume.cgi") > -1 || c.indexOf("server-manager/create_gsnapshot.cgi") > -1 || c.indexOf("server-manager/create_gimage.cgi") > -1 || c.indexOf("server-manager/exec_vbackup.cgi") > -1 || c.indexOf("server-manager/unpause.cgi") > -1 || c.indexOf("server-manager/pause.cgi") > -1 || c.indexOf("server-manager/create_ec2_snapshot.cgi") > -1 || c.indexOf("server-manager/delete_addresses.cgi") > -1 || c.indexOf("server-manager/exec_vsync.cgi") > -1 || c.indexOf("server-manager/create_address.cgi") > -1 || c.indexOf("cluster-usermin/upgrade.cgi") > -1 || c.indexOf("cluster-usermin/install.cgi") > -1 || c.indexOf("cluster-usermin/update.cgi") > -1 || c.indexOf("ldap-useradmin/batch_exec.cgi") > -1 || c.indexOf("ldap-useradmin/mass_delete_user.cgi") > -1 || c.indexOf("usermin/upgrade.cgi") > -1 || c.indexOf("usermin/update.cgi") > -1 || c.indexOf("cpan/download.cgi") > -1 || c.indexOf("cpan/install.cgi") > -1 || c.indexOf("burner/save_profile.cgi") > -1 || c.indexOf("burner/burn.cgi") > -1 || c.indexOf("bind8/mass_create.cgi") > -1 || c.indexOf("bind8/mass_rcreate.cgi") > -1 || c.indexOf("bind8/mass_delete.cgi") > -1 || c.indexOf("bind8/mass_update.cgi") > -1 || c.indexOf("bind8/zone_dnssecmigrate_dt.cgi") > -1 || c.indexOf("bind8/mass_rdelete.cgi") > -1 || c.indexOf("bind8/enable_zonekey.cgi") > -1 || c.indexOf("bind8/enable_zonedt.cgi") > -1 || c.indexOf("bind8/disable_zonedt.cgi") > -1 || c.indexOf("webalizer/save_log.cgi") > -1 || c.indexOf("bacula-backup/restore.cgi") > -1 || c.indexOf("bacula-backup/backup.cgi") > -1 || c.indexOf("bacula-backup/gbackup.cgi") > -1 || c.indexOf("bacula-backup/label.cgi") > -1 || c.indexOf("bacula-backup/mount.cgi") > -1 || c.indexOf("cluster-software/install_pack.cgi") > -1 || c.indexOf("updown/download.cgi") > -1 || c.indexOf("software/install_pack.cgi") > -1 || c.indexOf("software/do_install.cgi") > -1 || c.indexOf("software/apt_upgrade.cgi") > -1 || c.indexOf("software/rhn_check.cgi") > -1 || c.indexOf("software/yum_upgrade.cgi") > -1 || c.indexOf("software/urpmi_upgrade.cgi") > -1 || c.indexOf("software/csw_upgrade.cgi") > -1 || c.indexOf("software/ports_upgrade.cgi") > -1 || c.indexOf("webmin/letsencrypt.cgi") > -1 || c.indexOf("webmin/delete_webmincron.cgi") > -1 || c.indexOf("webmin/test_sendmail.cgi") > -1 || c.indexOf("webmin/refresh_modules.cgi") > -1 || c.indexOf("package-updates/update.cgi") > -1 || c.indexOf("custom/run.cgi") > -1 || c.indexOf("custom/sql.cgi") > -1 || c.indexOf("virtualmin-init/save.cgi") > -1 || c.indexOf("virtualmin-init/mass.cgi") > -1 || c.indexOf("backup-config/save.cgi") > -1 || c.indexOf("squid/init_cache.cgi") > -1 || c.indexOf("squid/clear.cgi") > -1 || c.indexOf("squid/chown.cgi") > -1 || c.indexOf("ldap-client/check.cgi") > -1 || c.indexOf("sendmail/del_mailqs.cgi") > -1 || c.indexOf("sendmail/flushq.cgi") > -1 || c.indexOf("init/mass_start_stop.cgi") > -1 || c.indexOf("init/mass_launchd.cgi") > -1 || c.indexOf("init/mass_systemd.cgi") > -1 || c.indexOf("init/mass_upstarts.cgi") > -1 || c.indexOf("init/mass_rcs.cgi") > -1 || c.indexOf("init/save_services.cgi") > -1 || c.indexOf("ldap-server/create.cgi") > -1 || c.indexOf("change-user/change.cgi") > -1 || c.indexOf("virtualmin-slavedns/save.cgi") > -1 || c.indexOf("proc/trace.cgi") > -1 || c.indexOf("proc/run.cgi") > -1 || c.indexOf("proc/kill_proc_list.cgi") > -1 || c.indexOf("fsdump/backup.cgi") > -1 || c.indexOf("fsdump/restore.cgi") > -1 || c.indexOf("webmin_search.cgi") > -1 || c.indexOf("security-updates/update.cgi") > -1 || c.indexOf("virtualmin-mailrelay/save.cgi") > -1 || c.indexOf("cluster-copy/exec.cgi") > -1 || c.indexOf("cron/exec_cron.cgi") > -1 || c.indexOf("virtualmin-registrar/import.cgi") > -1 || c.indexOf("virtualmin-registrar/save_ns.cgi") > -1 || c.indexOf("virtualmin-registrar/transfer.cgi") > -1 || c.indexOf("virtualmin-registrar/renew.cgi") > -1 || c.indexOf("virtualmin-registrar/create.cgi") > -1 || c.indexOf("htaccess-htpasswd/search.cgi") > -1 || c.indexOf("acl/makedn.cgi") > -1 || c.indexOf("acl/cert_issue.cgi") > -1 || c.indexOf("acl/maketables.cgi") > -1 || c.indexOf("acl/schema.cgi") > -1 || c.indexOf("filter/move.cgi") > -1 || c.indexOf("fetchmail/check.cgi") > -1 || c.indexOf("servers/find.cgi") > -1 || c.indexOf("cluster-cron/exec.cgi") > -1 || c.indexOf("raid/mkfs.cgi") > -1 || c.indexOf("lvm/pvmove.cgi") > -1 || c.indexOf("lvm/mkfs.cgi") > -1 || c.indexOf("ppp-client/init.cgi") > -1 || c.indexOf("fdisk/mkfs.cgi") > -1 || c.indexOf("fdisk/tunefs.cgi") > -1 || c.indexOf("fdisk/fsck.cgi") > -1 || c.indexOf("spam/deleteall_awl.cgi") > -1 || c.indexOf("quota/check_quotas.cgi") > -1 || c.indexOf("virtualmin-awstats/generate.cgi") > -1 || c.indexOf("postfix/flushq.cgi") > -1 || c.indexOf("status/delete_mons.cgi") > -1 || c.indexOf("status/refresh.cgi") > -1 || c.indexOf("/webmin/upgrade.cgi") > -1) {
        return 1
    } else {
        return 0
    }
}
var $__was = function() {
    var d = URI(t___wi.location),
        c = d.path();
    if (unbuffered_header()) {
        $("html").data("data-pagescroll", true)
    }
    if ($("body").hasClass("__e__") || (c && c.indexOf("sysinfo.cgi") > -1)) {
        return
    }
    if (!$('body[class^="syslog"]').length && (($("pre") && $("pre").length > 0 && $("pre").length <= 2) || $("html").data("data-pagescroll") === true)) {
        if (__num()) {
            setTimeout(function() {
                __s___()
            }, 1200)
        }
        $("body").bind("mousewheel", function() {
            return false
        });
        __________was_runner___ = t___wi.onbeforeunload = function(b) {
            return lang("theme_xhred_server_process_running")
        };
        t___wi.clearInterval($__was_runner);
        refresh = function() {
            $("body, html").animate({
                scrollTop: $(document).height()
            }, 400)
        };
        refresher = t___wi.setInterval(refresh, 401)
    }
};
if (t___wi.location == t__wi_p.location) {
    t__wi_p.f__r__s(settings_leftmenu_width, 0);
    t__wi_p.f__c_view()
} else {
    $("head").append('<style id="__tmp_no_overflow">body {overflow: hidden}</style>')
}
$("html").on("dblclick", "body", function() {
    if ($(this).find(".container-fluid").css("opacity") != 1) {
        __s___()
    }
});
if (settings_window_autoscroll && t___wi.location != t__wi_p.location) {
    $__was_runner = t___wi.setInterval($__was, 201)
}
setTimeout(function() {
    if ($("body").hasClass("__e__")) {
        __lre(0)
    }
}, 400);
if ($t_av__session === 0) {
    setTimeout(function() {
        __s___()
    }, 200)
};