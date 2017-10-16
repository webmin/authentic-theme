/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
const browser = {
        internet_explorer_version: function() {
            var t = 0,
                n = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
                r = !!navigator.userAgent.match(/Trident\/7.0/),
                e = navigator.userAgent.indexOf("rv:11.0");
            return n && (t = new Number(RegExp.$1)), -1 != navigator.appVersion.indexOf("MSIE 10") && (t = 10), r && -1 != e && (t = 11), t
        }
    },
    Convert = {
        arrFlip: function(t) {
            var n, r = {};
            for (n in t) t.hasOwnProperty(n) && (r[t[n]] = n);
            return r
        },
        uriDecodeComponent: function(t, n) {
            var r, e, o, a = new String,
                i = 0;
            if (void 0 === n && (n = 0), r = t ? t.split(/(%(?:d0|d1)%.{2})/) : [], $.isEmptyObject(r)) return t;
            for (e = r.length; i < e; i++) {
                try {
                    o = decodeURIComponent(r[i])
                } catch (t) {
                    o = n ? r[i].replace(/%(?!\d+)/g, "%25") : r[i]
                }
                a += o
            }
            return a
        },
        uriEncodeComponent: function(t) {
            return this.uriDecodeComponent(t) === t && (t = encodeURIComponent(t)), t
        },
        htmlEscape: function(t) {
            var n = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "=": "&#61;"
            };
            return String(t).replace(/[&<>"'=]/g, function(t) {
                return n[t]
            })
        },
        htmlUnEscape: function(t) {
            var n = [
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
                for (var r = 0, e = n.length; r < e; ++r) t = String(t).replace(new RegExp("&" + n[r][0] + ";", "g"), n[r][1]);
            return t || ""
        },
        htmlStrip: function(t) {
            return $("<div></div>").html(t).text()
        },
        pathnamePopLast: function(t) {
            var n = ~t.indexOf("%2F") ? "%2F" : "/",
                r = t.split(n);
            return r.pop(), r.join(n) || "/"
        },
        strUpFirst: function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
        },
        strUpInitial: function(t) {
            return t.length ? this.strUpFirst(t.toLowerCase()) : t
        }
    },
    Core = {
        fnExtend: function(t, n) {
            window[t] = function(t) {
                return function() {
                    t(), n()
                }
            }(window[t])
        },
        linkSameOrigin: function(t) {
            return t.attr("href") && (t.attr("href").match("^http:") || t.attr("href").match("^https:") || t.attr("href").match("^ftp:")) && URI(t.attr("href")).hostname() != v___location_hostname || t.attr("data-href") && (t.attr("data-href").match("^http:") || t.attr("data-href").match("^https:") || t.attr("data-href").match("^ftp:")) && URI(t.attr("data-href")).hostname() != v___location_hostname ? 0 : 1
        },
        moduleAvailable: function(t) {
            return void 0 != get_server_data(t) ? get_server_data(t) : $.inArray(t, get_server_data("available-modules")) > -1
        },
        curModuleFileQuery: function(t, n, r) {
            return $('body[class*="' + t + '"]').length && v___location_file == n && v___location_query && -1 !== v___location_query.indexOf(r)
        },
        curModuleFile: function(t, n) {
            return $('body[class*="' + t + '"]').length && v___location_file == n
        },
        curModule: function(t) {
            return $('body[class*="' + t + '"]').length
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
        strContains: function(t, n) {
            return "string" == typeof t && !!~t.indexOf(n)
        },
        arrContains: function(t, n, r) {
            return void 0 === r && (r = 0), t = $.inArray(n, t), r ? t : -1 < t ? 1 : 0
        },
        arrIntersect: function(t, n) {
            var r = [];
            return $.each(t, function(t, e) {
                n.match(new RegExp(e, "gi")) && r.push(e)
            }), !$.isEmptyObject(r)
        },
        scrolledIntoView: function(t) {
            var n = $(t),
                r = $(window),
                e = r.scrollTop(),
                o = e + r.height(),
                a = n.offset().top;
            return a + n.height() <= o && a >= e
        }
    };