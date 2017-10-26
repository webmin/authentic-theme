/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
const browser = {
        internet_explorer_version: function() {
            var t = 0,
                e = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
                n = !!navigator.userAgent.match(/Trident\/7.0/),
                r = navigator.userAgent.indexOf("rv:11.0");
            return e && (t = new Number(RegExp.$1)), -1 != navigator.appVersion.indexOf("MSIE 10") && (t = 10), n && -1 != r && (t = 11), t
        }
    },
    Convert = {
        arrFlip: function(t) {
            var e, n = {};
            for (e in t) t.hasOwnProperty(e) && (n[t[e]] = e);
            return n
        },
        uriDecodeComponent: function(t, e) {
            var n, r, a, o = new String,
                i = 0;
            if (void 0 === e && (e = 0), n = t ? t.split(/(%(?:d0|d1)%.{2})/) : [], $.isEmptyObject(n)) return t;
            for (r = n.length; i < r; i++) {
                try {
                    a = decodeURIComponent(n[i])
                } catch (t) {
                    a = e ? n[i].replace(/%(?!\d+)/g, "%25") : n[i]
                }
                o += a
            }
            return o
        },
        uriEncodeComponent: function(t) {
            return this.uriDecodeComponent(t) === t && (t = encodeURIComponent(t)), t
        },
        htmlEscape: function(t) {
            var e = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "=": "&#61;"
            };
            return String(t).replace(/[&<>"'=]/g, function(t) {
                return e[t]
            })
        },
        htmlUnEscape: function(t) {
            var e = [
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
            if (t)
                for (var n = 0, r = e.length; n < r; ++n) t = String(t).replace(new RegExp("&" + e[n][0] + ";", "g"), e[n][1]);
            return t || ""
        },
        htmlStrip: function(t) {
            return $("<div></div>").html(t).text()
        },
        pathnamePopLast: function(t) {
            var e = ~t.indexOf("%2F") ? "%2F" : "/",
                n = t.split(e);
            return n.pop(), n.join(e) || "/"
        },
        strUpFirst: function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
        },
        strUpInitial: function(t) {
            return t.length ? this.strUpFirst(t.toLowerCase()) : t
        }
    },
    Core = {
        fnExtend: function(t, e) {
            window[t] = function(t) {
                return function() {
                    t(), e()
                }
            }(window[t])
        },
        linkSameOrigin: function(t) {
            return t.attr("href") && (t.attr("href").match("^http:") || t.attr("href").match("^https:") || t.attr("href").match("^ftp:")) && URI(t.attr("href")).hostname() != v___location_hostname || t.attr("data-href") && (t.attr("data-href").match("^http:") || t.attr("data-href").match("^https:") || t.attr("data-href").match("^ftp:")) && URI(t.attr("data-href")).hostname() != v___location_hostname ? 0 : 1
        },
        moduleAvailable: function(t) {
            return void 0 != get_server_data(t) ? get_server_data(t) : $.inArray(t, get_server_data("available-modules")) > -1
        },
        curModuleFileQuery: function(t, e, n) {
            return $('body[class*="' + t + '"]').length && v___location_file == e && v___location_query && -1 !== v___location_query.indexOf(n)
        },
        curModuleFile: function(t, e) {
            return $('body[class*="' + t + '"]').length && v___location_file == e
        },
        curModule: function(t) {
            return $('body[class*="' + t + '"]').length
        }
    },
    HTML = {
        label: {
            temperature: function(t, e) {
                var n = "bg-semi-transparent";
                return e ? t <= 30 ? n : t > 30 && t <= 60 ? n : t > 60 && t <= 80 ? "bg-warning" : t > 80 ? "bg-danger" : "" : t <= 86 ? n : t > 86 && t <= 140 ? n : t > 140 && t <= 176 ? "bg-warning" : t > 176 ? "bg-danger" : ""
            },
            rpm: function(t) {
                return t <= 2 * rpmFactor ? bg_semi_tr : t > 2 * rpmFactor && t <= 3 * rpmFactor ? bg_semi_tr : t > 3 * rpmFactor && t <= 4 * rpmFactor ? bg_warn : t > 4 * rpmFactor ? bg_danger : ""
            }
        },
        template: {
            page_content_preloader: function(t) {
                return '<div class="container-fluid-loading col-lg-10 col-lg-offset-1"><div class="panel-loading panel-default-loading"><div class="panel-heading-loading text-center"><i class="fa fa-fw fa-inverse fa-2x text-lighter favorites xcustom-favorites fa-star-o dummy"></i>&nbsp;<span>' + t + '</span></div><div class="panel-body-loading"><span class="cspinner"><span class="cspinner-icon light"></span></span></div></div></div>'
            }
        }
    },
    page = {
        handle: {
            content: {
                preloader: function(t) {
                    var e = $("#content"),
                        n = $(".container-fluid"),
                        r = $(".container-fluid-loading"),
                        a = $("span[data-main_title]").text(),
                        o = HTML.template.page_content_preloader(a);
                    r.length ? (r.remove(), n.removeClass("invisible"), e.removeClass("progressing"), setTimeout(function() {
                        progress.progress() && progress.end()
                    }, 100)) : (e.addClass("progressing").prepend(o), n.addClass("invisible")), t && setTimeout(function() {
                        page.handle.content.preloader()
                    }, t)
                }
            }
        }
    },
    progress = {
        progress: function() {
            return "object" == typeof NProgress && settings_loader_top
        },
        start: function() {
            this.progress() && NProgress.start()
        },
        end: function() {
            this.progress() && NProgress.done()
        },
        configure: function() {
            this.progress() && NProgress.configure({
                showSpinner: !1,
                trickleRate: .09,
                trickleSpeed: 100
            })
        }
    },
    Test = {
        true: function(t) {
            return !/^(false|0)$/i.test(t) && !!t
        },
        false: function(t) {
            return /^(false|0)$/i.test(t) || !t
        },
        numeric: function(t) {
            return Number(parseFloat(t)) == t
        },
        string: function(t) {
            return "string" == typeof t || t instanceof String ? 1 : 0
        },
        strContains: function(t, e) {
            return "string" == typeof t && !!~t.indexOf(e)
        },
        arrContains: function(t, e, n) {
            return void 0 === n && (n = 0), t = $.inArray(e, t), n ? t : -1 < t ? 1 : 0
        },
        arrIntersect: function(t, e) {
            var n = [];
            return $.each(t, function(t, r) {
                e.match(new RegExp(r, "gi")) && n.push(r)
            }), !$.isEmptyObject(n)
        },
        scrolledIntoView: function(t) {
            var e = $(t),
                n = $(window),
                r = n.scrollTop(),
                a = r + n.height(),
                o = e.offset().top;
            return o + e.height() <= a && o >= r
        }
    },
    time = {
        tictac: function(t) {
            var e = "convertible-timestamp-full",
                n = $("[data-" + e + "]");
            n.parent().contents().filter(function() {
                return 3 === this.nodeType
            }).remove(), n.data(e, parseInt(n.data(e)) + 1), "undefined" != typeof moment && n.text(moment.unix(n.data(e)).format(settings_window_replaced_timestamp_format_full)), !t && setInterval(this.tictac, 1e3)
        }
    };