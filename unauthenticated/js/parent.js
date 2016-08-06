/*!
 * Authentic Theme 18.10 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2016 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
if ($access_level == 0) {
    settings_notification_slider_fixed && t__wi_p.$("html").attr("data-slider-fixed", "1")
}
if (t__wi_p.$___________initial === 1) {
    console.log("Welcome to Authentic Theme 18.10 https://github.com/qooob/authentic-theme")
}
typeof t__wi_p.t___p__xhr_l == "undefined" ? t__wi_p.t___p__xhr_l = 0 : false;
typeof t__wi_p.t___p__ll == "undefined" ? t__wi_p.t___p__ll = 0 : false;
$(function() {
    t___wi.parent.$___________left = 1
});
t__wi_p.$("body").on("focus", ".sidebar-search", function() {
    if (typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.t__au__c___i == "function") {
        t__wi_p.$('iframe[name="page"]').get(0).contentWindow.t__au__c___i("c", false)
    } else {
        t__wi_p.t__au__c___i("c", false)
    }
});
t__wi_p.$("body").on("blur", ".sidebar-search", function() {
    setTimeout(function() {
        t__wi_p.t__au__c___i("c", true)
    }, 150)
});

function __si__bg_upd_exec() {
    if (t__wi_p.$___ajax_requested_url.indexOf("?xhr-buttons=1") > -1 || t__wi_p.$___ajax_requested_url.indexOf("?xhr-navigation=1") > -1) {
        return
    }
    if (t__wi_p.$('iframe[name="page"]').contents().find("body .modal.in").length) {
        return
    }
    if ($access_level == 0) {
        t__wi_p.$___ajax_requested_url = "/index.cgi/?xhr-info=1";
        var b = t__wi_p.$('iframe[name="page"]').contents().find("body").find(".page.__sytem_information"),
            a = (b.length && __num()) ? b : 0;
        if (a) {
            $(a).find('h3 > a[data-refresh="system-status"]').addClass("disabled").find("i").addClass("fa-spin")
        }
        $.ajax({
            type: "GET",
            url: $_____link_full + "/index.cgi/?xhr-info=1",
            data: false,
            dataType: "json",
            success: function(c) {
                $.each(c, function(j, m) {
                    if (a) {
                        $(a).find('span[data-id="sysinfo_' + j + '"]').html(m);
                        if (j == "local_time" || j == "uptime" || j == "running_proc") {
                            var h = $(a).find('span[data-id="sysinfo_' + j + '"]'),
                                g = $(a).find('span[data-id="sysinfo_' + j + '"] a'),
                                k = $(a).find('span[data-id="sysinfo_' + j + '"]').text();
                            if (j == "local_time" && settings_window_replace_timestamps) {
                                if (g && g.length) {
                                    k = $(a).find('span[data-id="sysinfo_' + j + '"] a').data("convertible-timestamp-full");
                                    h.html(g.html(moment.unix(k).format(settings_window_replaced_timestamp_format_full)))
                                } else {
                                    k = $(a).find('span[data-id="sysinfo_' + j + '"] > span').data("convertible-timestamp-full");
                                    h.html(moment.unix(k).format(settings_window_replaced_timestamp_format_full))
                                }
                            } else {
                                (g && g.length) && h.html(g.html(k))
                            }
                        }
                        if ($(a).find('.piechart[data-charts="sysinfo_' + j + '"]').length) {
                            var f = t__wi_p.$('iframe[name="page"]').get(0),
                                e = t__wi_p.$('iframe[name="page"]').get(0).contentWindow.$("body").find('.piechart[data-charts="sysinfo_' + j + '"]');
                            if (f && f.contentWindow && e.length) {
                                e.data("easyPieChart").update(m)
                            }
                        }
                        if (j == "cpu_percent" || j == "mem_percent" || j == "virt_percent" || j == "disk_percent") {
                            localStorage.setItem("sysinfo_" + j + "_seen", m)
                        }
                        $(a).find(".modal-backdrop").remove()
                    }
                    $__id__ = moment().unix();
                    if (j == "cpu_percent" || j == "mem_percent" || j == "virt_percent" || j == "disk_percent" || j == "csf_title" || j == "csf_remote_version" || j == "authentic_remote_version" || j == "package_message") {
                        if (!localStorage.getItem("sysinfo_" + j)) {
                            localStorage.setItem("sysinfo_" + j, m)
                        }
                    }
                    if (!localStorage.getItem("sysinfo_package_message_initial")) {
                        localStorage.setItem("sysinfo_package_message_initial", 1)
                    }
                    if (j == "authentic_theme_version") {
                        if (!localStorage.getItem("sysinfo_theme_current_version") && m) {
                            localStorage.setItem("sysinfo_theme_current_version", (m.match(/^\d+|\d+\b|\d+(?=\w)/g)[0] + "." + m.match(/^\d+|\d+\b|\d+(?=\w)/g)[1]))
                        }
                    }
                    if (j == "csf_data") {
                        if (!localStorage.getItem("sysinfo_csf_current_version") && m) {
                            localStorage.setItem("sysinfo_csf_current_version", (m.match(/^\d+|\d+\b|\d+(?=\w)/g)[0] + "." + m.match(/^\d+|\d+\b|\d+(?=\w)/g)[1]))
                        }
                    }
                    if (j == "csf_title" || j == "csf_remote_version" || j == "authentic_remote_version" || j == "package_message") {
                        if (j == "package_message" && (localStorage.getItem("sysinfo_" + j) != m || localStorage.getItem("sysinfo_package_message_initial") == 1) && m && m.indexOf("badge-danger") > -1) {
                            localStorage.setItem("notifications_" + $__id__ + "_package_message", JSON.stringify({
                                title: lang("theme_xhred_notifications_packages_updates"),
                                time: $__id__,
                                timestamp: $__id__,
                                message: ($(m).html().replace(/badge-danger/g, "badge-success")),
                                readStatus: 0,
                                type: j,
                                link: $(m).attr("href")
                            }));
                            localStorage.setItem("sysinfo_" + j, m);
                            localStorage.setItem("sysinfo_package_message_initial", 0)
                        }
                        if (settings_sysinfo_theme_updates) {
                            if (localStorage.getItem("sysinfo_authentic_remote_version") == 0) {
                                delete localStorage.sysinfo_authentic_remote_version
                            }
                            if (localStorage.getItem("sysinfo_theme_current_version") && localStorage.getItem("sysinfo_authentic_remote_version")) {
                                if (j == "authentic_remote_version" && localStorage.getItem("sysinfo_theme_current_version") != m && m != "0" && m != "0.00" && m != null) {
                                    localStorage.setItem("notifications_" + $__id__ + "_authentic_remote_version", JSON.stringify({
                                        title: lang("theme_xhred_notifications_theme_update"),
                                        time: $__id__,
                                        timestamp: $__id__,
                                        message: lang("theme_xhred_notifications_theme_update_message").replace("%v", m) + '&nbsp;&nbsp;<span class="label label-success authentic_update" style="padding:0 6px; line-height: 12px; height:15px;font-size:11px" href="' + $_____link_full + '/webmin/edit_themes.cgi"><i class="fa fa-fw fa-refresh" style="padding-top:1px"></i></span>',
                                        readStatus: 0,
                                        type: j,
                                        link: $_____link_full + "/sysinfo.cgi"
                                    }));
                                    localStorage.setItem("sysinfo_" + j, m);
                                    localStorage.setItem("sysinfo_theme_current_version", m)
                                }
                            }
                        }
                        if (settings_sysinfo_csf_updates) {
                            if (localStorage.getItem("sysinfo_csf_current_version") && localStorage.getItem("sysinfo_csf_current_version") != null && localStorage.getItem("sysinfo_csf_remote_version")) {
                                if (j == "csf_remote_version" && localStorage.getItem("sysinfo_csf_current_version") != m && m != "0" && m != "0.00" && m != null) {
                                    localStorage.setItem("notifications_" + $__id__ + "_csf_remote_version", JSON.stringify({
                                        title: lang("theme_xhred_notifications_firewall_update"),
                                        time: $__id__,
                                        timestamp: $__id__,
                                        message: lang("theme_xhred_notifications_firewall_update_message").replace("%v", m),
                                        readStatus: 0,
                                        type: j,
                                        link: $_____link_full + "/csf"
                                    }));
                                    localStorage.setItem("sysinfo_" + j, m);
                                    localStorage.setItem("sysinfo_csf_current_version", m)
                                }
                            }
                        }
                        if (j == "csf_title" && m && m.indexOf("label-danger") > -1 && localStorage.getItem("sysinfo_csf_not_running") != 1) {
                            localStorage.setItem("notifications_" + $__id__ + "_csf_title", JSON.stringify({
                                title: lang("theme_xhred_notifications_firewall_danger"),
                                time: $__id__,
                                timestamp: $__id__,
                                message: lang("theme_xhred_notifications_firewall_danger_message").replace("%v", moment.unix($__id__).format(settings_window_replaced_timestamp_format_short)),
                                readStatus: 0,
                                type: j,
                                link: $_____link_full + "/csf"
                            }));
                            localStorage.setItem("sysinfo_csf_not_running", 1)
                        } else {
                            if (j == "csf_title" && m && m.indexOf("label-danger") === -1) {
                                delete localStorage.sysinfo_csf_not_running
                            }
                        }
                    }
                    if (j == "csf_deny") {
                        var l = JSON.parse(m);
                        $.each(l, function(s, p) {
                            var p = p.split("|"),
                                t = p[0],
                                i = p[1],
                                u = p[2],
                                d = p[3],
                                r = p[4],
                                n = p[5],
                                q = p[6],
                                o = p[7];
                            o = o.replace("*Port Scan*", ((u && d) ? 'Port <i data-port-href="http://www.speedguide.net/port.php?port=' + d + '" class="badge bg-dark-red">' + d + "</i> scan" : "Port scan"));
                            if (!localStorage.getItem("allowed_trigger_" + (t + i.replace(/\./g, "0")) + "_csf_deny")) {
                                localStorage.setItem("notifications_" + (t + i.replace(/\./g, "0")) + "_csf_deny", JSON.stringify({
                                    title: lang("theme_xhred_notifications_firewall_warning"),
                                    time: $__id__,
                                    timestamp: $__id__,
                                    message: o + ((u && d) ? " <span>(" + u + ":" + d + ")</span>" : ""),
                                    readStatus: 0,
                                    type: j,
                                    link: $_____link_full + "/csf"
                                }));
                                localStorage.setItem("allowed_trigger_" + (t + i.replace(/\./g, "0")) + "_csf_deny", 1)
                            }
                        })
                    }
                    if (j == "cpu_percent" || j == "mem_percent" || j == "virt_percent" || j == "disk_percent") {
                        if (localStorage.getItem("sysinfo_" + j + "_seen") !== null && m >= 85 && localStorage.getItem("sysinfo_" + j + "_seen") < m) {}
                    }
                });
                setTimeout(function() {
                    t__wi_p.$___ajax_requested_url = "_blank"
                }, 500);
                setTimeout(function() {
                    n___ck()
                }, 3000);
                if (a) {
                    $(a).find('h3 > a[data-refresh="system-status"]').removeClass("disabled").find("i").removeClass("fa-spin")
                }
            }
        })
    }
}

function __si__bg_upd() {
    if (settings_notification_slider_enabled && !t__wi_p.$('iframe[name="page"]').contents().find("body .modal.in").length) {
        return t___wi.setInterval(function() {
            __si__bg_upd_exec()
        }, (settings_sysinfo_background_call_timeout * 60000))
    }
}
var __si__bg_upd_id = __si__bg_upd();
if (settings_loader_top) {
    NProgress.configure({
        showSpinner: true,
        trickleRate: 0.08,
        trickleSpeed: 200
    })
}
$(window).ajaxStart(function() {
    if (t__wi_p.$___ajax_requested_url.indexOf("index.cgi/?xhr-info=1") === -1 && t__wi_p.$___ajax_requested_url.indexOf("___LL_PREV___") === -1) {
        t___p__xhr_l = 1;
        t__wi_p.__lls()
    }
}).ajaxStop(function() {
    if (t__wi_p.$___ajax_requested_url.indexOf("index.cgi/?xhr-info=1") === -1) {
        t___p__xhr_l = 0;
        t__wi_p.__lle()
    }
});
(function() {
    var i, h, j, g = {}.hasOwnProperty,
        e = function(a, c) {
            for (var d in c) {
                if (g.call(c, d)) {
                    a[d] = c[d]
                }
            }

            function b() {
                this.constructor = a
            }
            b.prototype = c.prototype;
            a.prototype = new b();
            a.__super__ = c.prototype;
            return a
        };
    i = jQuery;
    j = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';
    h = (function(b) {
        e(a, b);

        function a() {
            return a.__super__.constructor.apply(this, arguments)
        }
        a.prototype.template = function(c) {
            var d;
            d = a.__super__.template.apply(this, arguments);
            d.append(i(j));
            return d
        };
        return a
    })(t___wi.Messenger.Message);
    t___wi.Messenger.themes.air = {
        Message: h
    };
    Messenger.options = {
        extraClasses: "messenger-fixed messenger-on-bottom",
        theme: "air"
    }
}).call(this);
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    $("#content").attr("style", "-webkit-overflow-scrolling: touch !important; overflow-y: scroll !important;")
}
if (t__wi_p.$('a[target="page"][href="link/"]').first().length) {
    t__wi_p.$('a[target="page"][href="link/"]').first().attr("target", "blank")
}
$("aside").on("click", ".select2-container .select2-selection__arrow b", function(a) {
    a.preventDefault();
    a.stopPropagation()
});
$("aside").on("contextmenu", 'a[href*="csf/"][target="page"]', function(a) {
    a.preventDefault();
    a.stopPropagation();
    $(this)[0].click()
});
$("body").on("keydown", ".sidebar-search", function(b) {
    if (t__wi_p.$("#wrapper").data("webmail") !== -1) {
        if (b.keyCode == 13) {
            b.preventDefault();
            return false
        }
    }
});
$("body").on("click", ".mobile-menu-toggler", function(b) {
    $this = $(this);
    if ($("aside").hasClass("hidden-xs")) {
        $(this).addClass("selected").find("button").addClass("btn-primary").removeClass("btn-default");
        if (t__wi_p.$(".__logo")) {
            t__wi_p.$(".__logo").css("transform", "translate(0px, 0px)");
            setTimeout(function() {
                t__wi_p.$(".__logo").transition({
                    y: "-140px"
                }, 1000)
            }, 1100)
        }
        t__wi_p.$this.css("transform", "translate(0px, 0px)");
        t__wi_p.$("aside").css("transform", "translate(0px, 0px)");
        t__wi_p.$(".switch-toggle").css("display", "none");
        $("aside").removeClass("hidden-xs");
        t__wi_p.$("aside, .mobile-menu-toggler").transition({
            x: settings_leftmenu_width
        }, 1000);
        t__wi_p.$(".switch-toggle").css("display", "table")
    } else {
        hide_mobile_menu()
    }
});
$.each($('ul.navigation li.navigation_external a[href^="../servers/link.cgi/"]'), function(d, c) {
    $(this).attr("href", $__source_url + $(this).attr("href").replace("../", "").replace(/\/$/g, ""))
});
$("body").on("click", '.navigation a[target="page"], .user-links a[target="page"]', function() {
    hide_mobile_menu()
});
$("body").on("click", ".navigation > li:not('.sub-wrapper'):not('.menu-container'):not('.navigation_external')", function(g) {
    g.preventDefault();
    g.stopPropagation();
    t__wi_p.$___________m_locked = 1;
    typeof $processing == "undefined" ? $processing = false : false;
    if (!$processing) {
        $processing = true;
        var f = $("a", this).attr("href"),
            h = $("a", this).attr("target"),
            e = $(this);
        if (h) {
            $(".navigation > li > ul.sub > li").each(function() {
                $(this).removeClass("sub_active").find("span.current").remove()
            })
        }
        $("#webmin_search_form").submit(function() {
            $(".navigation > li > ul.sub > li").each(function() {
                $(this).removeClass("sub_active").find("span.current").remove()
            })
        });
        $.when($("#sidebar .navigation > li").each(function() {
            var a = $(this);
            if (!$(this).is(e)) {
                $(this).removeClass("active");
                if ($(this).find("a").attr("href") != "#search" && !$(this).find("a").attr("target")) {
                    if ($(a.find("a").attr("href")).hasClass("sub")) {
                        $(a.find("a").attr("href")).slideUp($settings_animation_left_slide_time)
                    }
                }
            }
        })).done(function() {
            e.hasClass("active") ? e.removeClass("active") : (f != "#hide" && !h) ? e.addClass("active") : false;
            setTimeout(function() {
                if ($(f).is(":visible") && f != "#hide" && !h) {
                    e.addClass("active")
                } else {
                    e.removeClass("active")
                }
                $processing = false
            }, ((2 * $settings_animation_left_slide_time) > 0 ? (2 * $settings_animation_left_slide_time) : 1));
            $(f).slideToggle($settings_animation_left_slide_time)
        });
        if (f == "#search") {
            $('#sidebar input[name="search"]').focus()
        }
    }
});
$("body").on("click", ".navigation > li > ul.sub > li:not('.menu-container')", function(c) {
    if (c.target && $(c.target).is("li")) {
        return
    }
    var b = $(this);
    if (__num()) {
        t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove()
    }
    $(".navigation > li > ul.sub > li").each(function() {
        $(this).removeClass("sub_active").find("span.current").remove()
    });
    $("#webmin_search_form").find('input[name="search"]').val("");
    b.addClass("sub_active").append('<span class="current"></span>')
});
$(".navigation > li > ul.sub").each(function() {
    if ($(this).attr("id") === "") {
        $(this).remove()
    }
});
$("body").on("submit", "#webmin_search_form", function() {});
$("body").on("click", ".navigation_module_trigger", function(b) {
    b.preventDefault();
    b.stopPropagation();
    $('iframe[name="page"]').attr("src", $(this).data("href"));
    $(".navbar-toggle:visible").trigger("click");
    t__wi_p.$(".navigation > li > ul.sub > li").removeClass("sub_active").find("span.current").remove();
    t__wi_p.$("#sidebar .navigation > ul.sub").slideUp($settings_animation_left_slide_time);
    t__wi_p.$("#sidebar .navigation > li").removeClass("active")
});
$('.switch-toggle label[for^="reserve_empty"]').on("click", function(b) {
    b.preventDefault()
});
$("body").on("click", 'a[data-refresh="true"]', function(b) {
    b.preventDefault();
    if (typeof t__wi_p.$('iframe[name="page"]') != "undefined" && t__wi_p.$('iframe[name="page"]').contents() && t__wi_p.$('iframe[name="page"]').contents().get(0)) {
        t__wi_p.$('iframe[name="page"]').contents().get(0).location.reload()
    }
});
$("body").on("click", function(b) {
    if (!$("ul.dropdown").is(b.target) && $("ul.dropdown").has(b.target).length === 0 && $(".open").has(b.target).length === 0) {
        $("ul.dropdown").removeClass("open")
    }
});
$(t__wi_p.$('iframe[name="page"]').contents()).on("click", function(b) {
    if (!t__wi_p.$("ul.dropdown").is(b.target) && t__wi_p.$("ul.dropdown").has(b.target).length === 0 && t__wi_p.$(".open").has(b.target).length === 0) {
        t__wi_p.$("body").find(".navbar-header").find(".dropdown.open").removeClass("open")
    }
});

function __tmp_opener() {
    t___wi.open($("#__tmp_openner").attr("href"));
    $("#__tmp_openner").remove()
}

function __tmp_opener_link(b) {
    $("body").append('<a href="' + t__wi_p.$__source_protocol + "://" + t__wi_p.$__host_url + ":" + $__source_port + b + '" target="_blank" class="hidden" id="__tmp_openner"></a>')
}
t__wi_p.$(".switch-toggle").on("contextmenu", "label", function(b) {
    b.preventDefault();
    if ($(this).attr("for") == "open_webmin" || $(this).attr("for") == "open_usermin") {
        __tmp_opener_link("");
        __tmp_opener()
    } else {
        if ($(this).attr("for") == "open_virtualmin") {
            __tmp_opener_link("?virtualmin");
            __tmp_opener()
        } else {
            if ($(this).attr("for") == "open_cloudmin") {
                __tmp_opener_link("?cloudmin");
                __tmp_opener()
            } else {
                if ($(this).attr("for") == "open_webmail") {
                    __tmp_opener_link("?mail");
                    __tmp_opener()
                }
            }
        }
    }
});
t__wi_p.$(".switch-toggle").on("click", "input.dynamic", function(b) {
    if (t___p__xhr_l === 1 || (typeof t___p__xhr_r != "undefined" && t___p__xhr_r === 1)) {
        b.preventDefault();
        b.stopPropagation();
        return
    }
    t__wi_p.hide_mobile_menu();
    if ($(this).attr("id") == "open_thirdlane") {
        t__wi_p.location.href = $_____link_full + "/asterisk/index.cgi";
        return
    }
    t__wi_p.t__s($(this).attr("id"));
    if ($(this).attr("id") == "open_dashboard") {
        t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi");
        t__wi_p.__cms();
        return
    }
    t__m($(this).attr("id"), false, false)
});
t_sel_i();
$("aside").mCustomScrollbar({
    axis: "y",
    theme: "minimal",
    scrollInertia: 100,
    scrollButtons: false,
    callbacks: {
        onScroll: function() {
            if (!t__wi_p.$(".mobile-menu-toggler").is(":visible")) {
                t__wi_p.$(".form-control.sidebar-search").blur();
                if (t__wi_p.$("aside select") && t__wi_p.$("aside select").length > 0 && t__wi_p.$("aside select").hasClass("select2-hidden-accessible")) {
                    t__wi_p.$("aside select").select2("close")
                }
            }
        }
    }
});
t__wi_p.$(".loader").append('<div class="loader-close" id="loader-close"><i class="fa fa-fw fa-times-circle pull-right hidden"></i></div>');
$("body").on("mouseover", "#loader-close, #loader-close-sm", function() {
    $(this).find(".fa").removeClass("hidden")
}).on("mouseout", "#loader-close, #loader-close-sm", function() {
    $(this).find(".fa").addClass("hidden")
});
$("body").on("click", "#loader-close > .fa", function(b) {
    t__wi_p.t___p__xhr_l = 0;
    t__wi_p.t___p__xhr_r = 0;
    t__wi_p.$___ajax_requested_url = "_blank";
    t__wi_p.__lre()
}).on("click", "#loader-close-sm > .fa", function(b) {
    t__wi_p.t___p__xhr_l = 0;
    t__wi_p.t___p__xhr_r = 0;
    t__wi_p.$___ajax_requested_url = "_blank";
    t__wi_p.__lle()
});
__shell_commands__i__ = 0;
t__wi_p.$(".form-control.sidebar-search").focus(function(a) {
    a.preventDefault();
    a.stopPropagation();
    __shell_commands__i__ = 0
});
$(window).keydown(function(i) {
    var j = t__wi_p.$(".form-control.sidebar-search").val(),
        f = (typeof t__wi_p.$(".form-control.sidebar-search").val() != "undefined");
    if ((f && (!j.trim() || j.trim().startsWith("!"))) && (i.keyCode == 38 || i.keyCode == 40)) {
        typeof localStorage.shell_commands == "undefined" ? localStorage.setItem("shell_commands", JSON.stringify({})) : false;
        var c = JSON.parse(localStorage.getItem("shell_commands")),
            g = c.length;
        i.preventDefault();
        i.stopPropagation();
        __shell_commands__i__ = i.keyCode == 40 ? ++__shell_commands__i__ : --__shell_commands__i__;
        if (__shell_commands__i__ < 0) {
            __shell_commands__i__ = g - 1
        }
        if (c[__shell_commands__i__ % g]) {
            t__wi_p.$(".form-control.sidebar-search").val(c[__shell_commands__i__ % g])
        }
        return
    } else {
        if (f && j.trim().startsWith("!") && i.keyCode == 27) {
            i.preventDefault();
            i.stopPropagation();
            t__wi_p.$(".form-control.sidebar-search").val("");
            return
        }
    }
    if (f && j.trim().startsWith("!") && i.keyCode == 13) {
        var e = JSON.parse(localStorage.getItem("shell_commands")),
            b = [],
            d = j.trim();
        for (var h in e) {
            b.push(e[h])
        }
        b = jQuery.grep(b, function(a) {
            return a != d
        });
        b.push(d);
        localStorage.setItem("shell_commands", JSON.stringify(b))
    }
    if (f && j.trim().startsWith("!") && i.keyCode == 13 && product_name(1).toLowerCase() != "cloudmin") {
        t__wi_p.$(".form-control.sidebar-search").addClass("_shell_form_");
        i.preventDefault();
        i.stopPropagation();
        if (t__wi_p.$('iframe[name="page"]').contents() && t__wi_p.$('iframe[name="page"]').contents().find("body").data("shell") == "1") {
            $__shell_form = '<form class="__shell_form__" role="form" action="' + $_____link_full + '/shell/index.cgi" method="post" enctype="multipart/form-data">									<input type="hidden" id="cmd" name="cmd" value="' + j.trim().substring(1).trim() + '">								</form>';
            t__wi_p.$('iframe[name="page"]').contents().find("body").append($__shell_form);
            t__wi_p.$('iframe[name="page"]').contents().find(".__shell_form__").submit();
            if (product_name(1).toLowerCase() == "virtualmin") {
                __cms()
            } else {
                if (!t__wi_p.$("a[href^='shell']").attr("href")) {
                    t__wi_p.t__wm_l("open_webmin")
                }
            }
        }
    } else {
        if (f && j.trim().startsWith("!") && i.keyCode == 13 && product_name(1).toLowerCase() == "cloudmin") {
            t__wi_p.$(".form-control.sidebar-search").addClass("_shell_form_");
            i.preventDefault();
            i.stopPropagation();
            if (t__wi_p.$('iframe[name="page"]').contents() && t__wi_p.$('a[target="page"][href*="/server-manager/save_serv.cgi"]').length && t__wi_p.$('a[target="page"][href*="shell=1"]').length) {
                $__shell_form = '<form class="__shell_form__" role="form" action="' + $_____link_full + '/server-manager/shell.cgi" method="post" enctype="multipart/form-data">									<input type="hidden" id="id" name="id" value="' + t__wi_p.$("#sid").val() + '">									<input type="hidden" id="cmd" name="cmd" value="' + j.trim().substring(1).trim() + '">								</form>';
                t__wi_p.$('iframe[name="page"]').contents().find("body").append($__shell_form);
                t__wi_p.$('iframe[name="page"]').contents().find(".__shell_form__").submit();
                __cms();
                t__wi_p.$('a[href*="server-manager/save_serv.cgi"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
            }
        }
    }
});
$(window).keyup(function(b) {
    t__wi_p.search_control(b);
    t__wi_p.shortcut_control(b)
});
$("body").on("submit", "#webmin_search_form", function(b) {
    setTimeout(function() {
        t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove();
        t__wi_p.$(".form-control.sidebar-search").val("")
    }, 30)
});
if (settings_favorites) {
    $("aside").on("click", ".user-links > li.favorites", function(b) {
        $(".favorites-menu-outer").addClass("hover")
    });
    $("body").on("click", "nav.favorites-menu li a", function() {});
    $("body").on("click", ".favorites-menu-close, nav.favorites-menu li a", function() {
        t__wi_p.$(".favorites-menu-outer").removeClass("hover")
    });
    $(document).on("keydown", function(b) {
        if ($(".favorites-menu-outer").css("left") == "0px" && b.keyCode == 27) {
            t__wi_p.$(".favorites-menu-outer").removeClass("hover")
        }
    })
}
favicon = new Favico({
    animation: "none"
});

function n___fv() {
    if (!settings_notification_slider_enabled) {
        return
    }
    var a = $(".right-side-tabs .list-group-item:not(.no-notifications, .opacity-0_3)").length;
    favicon.badge(a);
    __dpt();
    if (a > 0) {
        $(".right-side-tabs-toggler button i.fa-bell").addClass("faa-ring faa-slow animated-hover");
        $(".right-side-tabs-toggler button span.badge").removeClass("hidden").text(a)
    } else {
        $(".right-side-tabs-toggler button i.fa-bell").removeClass("faa-ring faa-slow animated-hover");
        $(".right-side-tabs-toggler button span.badge").addClass("hidden").text(0)
    }
}

function n___ck() {
    var b = {};
    $.each(localStorage, function(h, n) {
        if (typeof h == "string" && h.indexOf("notifications_") > -1) {
            var k = h.split("_")[1],
                o = JSON.parse(n),
                d = o.title,
                f = o.time,
                g = o.timestamp,
                j = o.message,
                e = o.readStatus,
                l = o.type,
                m = o.link;
            b[f] = "" + k + "~~~~" + d + "~~~~" + f + "~~~~" + g + "~~~~" + j + "~~~~" + e + "~~~~" + l + "~~~~" + m;
            if ($('.list-group-item[id="' + k + '"][data-type="' + l + '"]').length) {
                $('.list-group-item[id="' + k + '"][data-type="' + l + '"] .list-group-item-heading small').text(moment.unix(f).fromNow())
            }
        }
    });
    var c = [];
    for (var a in b) {
        if (b.hasOwnProperty(a)) {
            c.push(a)
        }
    }
    $current_localData_notifications_sorted_keys = c.sort();
    $.each($current_localData_notifications_sorted_keys, function(h, o) {
        var n = b[o],
            k = n.split("~~~~")[0],
            d = n.split("~~~~")[1],
            f = n.split("~~~~")[2],
            g = n.split("~~~~")[3],
            j = n.split("~~~~")[4],
            e = n.split("~~~~")[5],
            l = n.split("~~~~")[6],
            m = n.split("~~~~")[7];
        if (!$('.list-group-item[id="' + k + '"][data-type="' + l + '"]').length) {
            n___ad(k, d, f, g, j, e, l, m)
        }
    })
}

function n___rm() {
    $.each(localStorage, function(b, a) {
        if (typeof b == "string" && b.indexOf("notifications_") > -1) {
            delete localStorage[b]
        }
    })
}

function n___mr(d, a, b, e) {
    var c = JSON.parse(localStorage["notifications_" + d + "_" + a]);
    localStorage.setItem("notifications_" + d + "_" + a, JSON.stringify({
        title: c.title,
        time: c.time,
        timestamp: c.timestamp,
        message: c.message,
        readStatus: b,
        type: c.type,
        link: c.link
    }));
    e && n___fv()
}

function n___mr_a() {
    $(".right-side-tabs .list-group-item:not(.no-notifications)").each(function() {
        $(this).addClass("opacity-0_3");
        n___mr($(this).attr("id"), $(this).data("type"), 1, 0)
    }).promise().done(function() {
        n___fv()
    })
}

function n___ad(h, g, f, c, d, e, a, b) {
    $(".right-side-tabs .list-group").prepend('			<a class="list-group-item right-side-tabs-notification' + (e == "1" ? " opacity-0_3" : "") + '" data-type="' + a + '" id="' + h + '" href="' + b + '">			    <div class="media-body">			    <i class="fa fa-fw fa-trash-o pull-right hidden"></i>			    <i class="fa fa-fw fa-clear-all pull-right hidden"></i>			        <div class="list-group-item-heading">' + g + " <small>" + moment.unix(f).fromNow() + "</small></div>			        <small>" + d + "</small>			    </div>			</a>			");
    $(".right-side-tabs-no-notifications").remove();
    n___fv();
    if (!t__wi_p.$___________initial) {
        n___em()
    }
}

function n___em() {
    setTimeout(function() {
        if ($(".right-side-tabs .list-group-item").length === 0) {
            $(".right-side-tabs .list-group").prepend('				<div class="right-side-tabs-no-notifications" style="opacity: 0">	                <div class="list-group-item text-center no-notifications">	                    <small class="list-group-item-text text-lighter">NO NOTIFICATIONS</small>	                </div>	            </div>			');
            $(".right-side-tabs-no-notifications").animate({
                opacity: "1"
            }, $settings_animation_left_slide_time, function() {})
        }
        n___fv()
    }, $settings_animation_left_slide_time)
}
if ($access_level == 0) {
    $("body").append('		<div id="right-side-tabs" class="' + (settings_notification_slider_enabled ? "" : " hidden ") + "right-side-tabs" + (settings_notification_slider_fixed ? " right-side-tabs-fixed" : "") + '" data-background-style="' + settings_notification_color + '">	  		<ul class="nav nav-tabs" role="tablist">				<li role="presentation" class="active"><a href="#right-side-tabs-notifications" aria-controls="home" role="tab" data-toggle="tab">Notifications</a></li>			</ul>			<div class="tab-content">			    <div role="tabpanel" class="tab-pane active" id="right-side-tabs-notifications">		    		<div class="list-group"></div>			    </div>			    <div class="right-side-tabs-dismiss">			    	<i class="fa fa-fw fa-lg fa-refresh margined-left-8"></i>			    	<i class="fa fa-fw fa-lg fa-trash pull-right"></i>			    	<i class="fa fa-fw fa-lg fa-clear-all pull-right"></i>			  	</div>			</div>		</div>		  <div class="' + (settings_notification_slider_enabled ? "" : " hidden ") + "right-side-tabs-toggler" + (settings_notification_slider_fixed ? " hidden" : "") + '" data-background-style="' + settings_notification_color + '">		  	<button type="button" class="btn btn-primary btn-menu-toggler" style="padding-left: 6px; padding-right: 5px;' + ((__ie__() > 5 && __ie__() <= 11) ? " right: 0; position: fixed;" : "") + '">		  		<span class="badge badge-danger hidden"></span>		  		<i class="fa fa-fw fa-lg fa-bell"></i>		  	</button>		  </div>  	')
}
$(".right-side-tabs .tab-pane").each(function() {
    $(this).css("height", $(window).height() - 92)
});
$(".right-side-tabs").on("mouseover", ".list-group-item", function(a) {
    $(this).find(".fa.fa-trash-o").removeClass("hidden");
    !$(this).hasClass("opacity-0_3") && $(this).find(".fa-clear-all").removeClass("hidden")
}).on("mouseout", ".list-group-item", function(a) {
    $(this).find(".fa.fa-trash-o").addClass("hidden");
    $(this).find(".fa-clear-all").addClass("hidden")
});
$(".right-side-tabs").on("click", "[data-port-href]", function(a) {
    a.preventDefault();
    a.stopPropagation();
    t___wi.open($(this).data("port-href"))
});
$(".right-side-tabs").on("click", 'a.list-group-item[data-type="csf_deny"]', function(a) {
    a.preventDefault();
    a.stopPropagation();
    if ($(a.target).is(".fa.fa-trash-o") || $(a.target).is(".fa-clear-all") || $(a.target).is("[data-port-href]")) {
        return
    }
    t__wi_p.$('iframe[name="page"]').contents().find("body").append('						<form action="' + $_____link_full + '/csf/" method="post" class="hidden" id="csf_temporary_ip_entries">                    		<input type="hidden" name="action" value="temp">                		</form>');
    t__wi_p.$('iframe[name="page"]').contents().find("form#csf_temporary_ip_entries").submit();
    t__wi_p.$(".right-side-tabs-toggler:not(.hidden)").trigger("click")
});
$(".right-side-tabs").on("click contextmenu", "a.list-group-item", function(a) {
    a.preventDefault();
    if (typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__num == "function" && !t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__num()) {
        a.preventDefault();
        a.stopPropagation();
        return
    }
    if (a.type == "click" && ($(a.target).is(".authentic_update") || $(a.target).is(".fa-refresh"))) {
        n___mr($($(this).parents("a.list-group-item").context).attr("id"), $($(this).parents("a.list-group-item").context).data("type"), 1, 1);
        $($(this).parents("a.list-group-item").context).addClass("opacity-0_3");
        t__wi_p.$(".right-side-tabs-toggler:not(.hidden)").trigger("click");
        t__wi_p.history.pushState(null, null, $_____link_full + "/?updating-webmin-theme");
        t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/webmin/edit_themes.cgi");
        return
    }
    if (a.type == "contextmenu") {
        $(this).find(".fa-clear-all").trigger("click");
        a.preventDefault();
        a.stopPropagation();
        return
    }
    if (!$(a.target).is(".fa.fa-trash-o") && !$(a.target).is(".fa-clear-all") && !$(a.target).is("[data-port-href]")) {
        if ($(this).attr("href") && $(this).attr("href").length && $(this).attr("href") != "undefined" && $(this).attr("data-type") != "csf_deny") {
            $(this).addClass("opacity-0_3");
            $(this).find(".fa-clear-all").addClass("hidden");
            n___mr($(this).attr("id"), $(this).data("type"), 1, 1);
            t__wi_p.$(".right-side-tabs-toggler:not(.hidden)").trigger("click");
            t__wi_p.$('iframe[name="page"]').attr("src", $(this).attr("href"))
        } else {
            $(this).addClass("opacity-0_3");
            n___mr($(this).attr("id"), $(this).data("type"), 1, 1)
        }
    } else {
        if ($(a.target).is(".fa-clear-all")) {
            $(this).addClass("opacity-0_3");
            $(this).find(".fa-clear-all").addClass("hidden");
            n___mr($(this).attr("id"), $(this).data("type"), 1, 1);
            return
        }
        $(this).animate({
            opacity: "0"
        }, $settings_animation_left_slide_time, function() {
            $(this).remove();
            delete localStorage["notifications_" + $(this).attr("id") + "_" + $(this).data("type")];
            n___em()
        })
    }
});
$(".right-side-tabs-dismiss i.fa-refresh").click(function(a) {
    t__wi_p.__si__bg_upd_exec();
    var b = $(this);
    b.addClass("fa-spin");
    setTimeout(function() {
        b.removeClass("fa-spin")
    }, 2000)
});
$(".right-side-tabs-dismiss i.fa-clear-all").click(function(a) {
    n___mr_a()
});
$(".right-side-tabs-dismiss i.fa-trash").click(function(a) {
    $(".right-side-tabs .list-group-item:not(.no-notifications)").animate({
        opacity: "0"
    }, $settings_animation_left_slide_time, function() {
        $(this).remove();
        n___rm();
        n___em()
    })
});
$("body").on("click", ".right-side-tabs-toggler:not(.hidden)", function(a) {
    if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        $(this).animate({
            right: "0"
        }, $settings_animation_left_slide_time);
        $(".right-side-tabs").animate({
            right: "-302"
        }, $settings_animation_left_slide_time);
        if (__ie__() > 5 && __ie__() <= 11) {
            $(this).find("button").animate({
                right: "0"
            }, $settings_animation_left_slide_time)
        }
    } else {
        $(this).addClass("opened");
        $(this).animate({
            right: "300"
        }, $settings_animation_left_slide_time);
        $(".right-side-tabs").animate({
            right: "0"
        }, $settings_animation_left_slide_time);
        if (__ie__() > 5 && __ie__() <= 11) {
            $(this).find("button").animate({
                right: "300"
            }, $settings_animation_left_slide_time)
        }
    }
});
$(".right-side-tabs .tab-pane").mCustomScrollbar({
    axis: "y",
    theme: "minimal",
    scrollInertia: 100,
    scrollButtons: false
});
$("aside, .btn-menu-toggler").click(function(a) {
    if (!t__wi_p.$(".right-side-tabs-toggler").hasClass("hidden") && t__wi_p.$(".right-side-tabs-toggler").hasClass("opened") && !$(a.target).is(".btn-menu-toggler") && !$(a.target).is(".fa-bell") && !$(a.target).is(".badge.badge-danger")) {
        t__wi_p.$(".right-side-tabs-toggler:not(.hidden)").trigger("click")
    }
});
n___em();
n___ck();
setTimeout(function() {
    __si__bg_upd_exec()
}, 5000);