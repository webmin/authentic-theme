/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
const browser = {
        internet_explorer_version: function() {
            var t = 0,
                r = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
                n = !!navigator.userAgent.match(/Trident\/7.0/),
                e = navigator.userAgent.indexOf("rv:11.0");
            return r && (t = new Number(RegExp.$1)), -1 != navigator.appVersion.indexOf("MSIE 10") && (t = 10), n && -1 != e && (t = 11), t
        }
    },
    Convert = {
        arrFlip: function(t) {
            var r, n = {};
            for (r in t) t.hasOwnProperty(r) && (n[t[r]] = r);
            return n
        },
        uriDecodeComponent: function(t, r) {
            var n, e, a, o = new String,
                i = 0;
            if (void 0 === r && (r = 0), n = t ? t.split(/(%(?:d0|d1)%.{2})/) : [], $.isEmptyObject(n)) return t;
            for (e = n.length; i < e; i++) {
                try {
                    a = decodeURIComponent(n[i])
                } catch (t) {
                    a = r ? n[i].replace(/%(?!\d+)/g, "%25") : n[i]
                }
                o += a
            }
            return o
        },
        uriEncodeComponent: function(t) {
            return this.uriDecodeComponent(t) === t && (t = encodeURIComponent(t)), t
        },
        htmlEscape: function(t) {
            var r = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "=": "&#61;"
            };
            return String(t).replace(/[&<>"'=]/g, function(t) {
                return r[t]
            })
        },
        htmlUnEscape: function(t) {
            var r = [
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
                for (var n = 0, e = r.length; n < e; ++n) t = String(t).replace(new RegExp("&" + r[n][0] + ";", "g"), r[n][1]);
            return t || ""
        },
        htmlStrip: function(t) {
            return $("<div></div>").html(t).text()
        },
        pathnamePopLast: function(t) {
            var r = ~t.indexOf("%2F") ? "%2F" : "/",
                n = t.split(r);
            return n.pop(), n.join(r) || "/"
        },
        strUpFirst: function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
        },
        strUpInitial: function(t) {
            return t.length ? this.strUpFirst(t.toLowerCase()) : t
        }
    },
    Core = {
        fnExtend: function(t, r) {
            window[t] = function(t) {
                return function() {
                    t(), r()
                }
            }(window[t])
        },
        linkSameOrigin: function(t) {
            return t.attr("href") && (t.attr("href").match("^http:") || t.attr("href").match("^https:") || t.attr("href").match("^ftp:")) && URI(t.attr("href")).hostname() != v___location_hostname || t.attr("data-href") && (t.attr("data-href").match("^http:") || t.attr("data-href").match("^https:") || t.attr("data-href").match("^ftp:")) && URI(t.attr("data-href")).hostname() != v___location_hostname ? 0 : 1
        },
        moduleAvailable: function(t) {
            return void 0 != get_server_data(t) ? get_server_data(t) : $.inArray(t, get_server_data("available-modules")) > -1
        },
        curModuleFileQuery: function(t, r, n) {
            return $('body[class*="' + t + '"]').length && v___location_file == r && v___location_query && -1 !== v___location_query.indexOf(n)
        },
        curModuleFile: function(t, r) {
            return $('body[class*="' + t + '"]').length && v___location_file == r
        },
        curModule: function(t) {
            return $('body[class*="' + t + '"]').length
        }
    },
    HTML = {
        label: {
            temperature: function(t, r) {
                var n = "bg-semi-transparent";
                return r ? t <= 30 ? n : t > 30 && t <= 60 ? n : t > 60 && t <= 80 ? "bg-warning" : t > 80 ? "bg-danger" : "" : t <= 86 ? n : t > 86 && t <= 140 ? n : t > 140 && t <= 176 ? "bg-warning" : t > 176 ? "bg-danger" : ""
            },
            rpm: function(t) {
                return t <= 2 * rpmFactor ? bg_semi_tr : t > 2 * rpmFactor && t <= 3 * rpmFactor ? bg_semi_tr : t > 3 * rpmFactor && t <= 4 * rpmFactor ? bg_warn : t > 4 * rpmFactor ? bg_danger : ""
            }
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
        strContains: function(t, r) {
            return "string" == typeof t && !!~t.indexOf(r)
        },
        arrContains: function(t, r, n) {
            return void 0 === n && (n = 0), t = $.inArray(r, t), n ? t : -1 < t ? 1 : 0
        },
        arrIntersect: function(t, r) {
            var n = [];
            return $.each(t, function(t, e) {
                r.match(new RegExp(e, "gi")) && n.push(e)
            }), !$.isEmptyObject(n)
        },
        scrolledIntoView: function(t) {
            var r = $(t),
                n = $(window),
                e = n.scrollTop(),
                a = e + n.height(),
                o = r.offset().top;
            return o + r.height() <= a && o >= e
        }
    },
    time = {
        tictac: function(t) {
            var r = "convertible-timestamp-full",
                n = $("[data-" + r + "]");
            n.parent().contents().filter(function() {
                return 3 === this.nodeType
            }).remove(), n.data(r, parseInt(n.data(r)) + 1), "undefined" != typeof moment && n.text(moment.unix(n.data(r)).format(settings_window_replaced_timestamp_format_full)), !t && setInterval(this.tictac, 1e3)
        }
    };