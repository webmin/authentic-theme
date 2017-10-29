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
            var n, r, a, i = new String,
                o = 0;
            if (void 0 === e && (e = 0), n = t ? t.split(/(%(?:d0|d1)%.{2})/) : [], $.isEmptyObject(n)) return t;
            for (r = n.length; o < r; o++) {
                try {
                    a = decodeURIComponent(n[o])
                } catch (t) {
                    a = e ? n[o].replace(/%(?!\d+)/g, "%25") : n[o]
                }
                i += a
            }
            return i
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
            accordion: function(t, e, n, r) {
                for (var a = '<div class="panel-group panel-filter" id="' + t + '" role="tablist" aria-multiselectable="true">', i = 0; i < e.length; i++) {
                    var o = !$.isArray(r) || $.isEmptyObject(r) ? 0 === i ? 1 : 0 : r[i] ? 1 : 0,
                        l = $.isEmptyObject(r) || !$.isEmptyObject(r) && r.filter(function(t) {
                            return 1 === t
                        }).length <= 1,
                        s = t.endsWith("_-gr") && l ? 1 : 0;
                    a += '<div class="panel panel-default' + ($settings_animation_tabs_slide_time ? "" : " disable-animations") + '"><div class="panel-heading" role="tab" id="' + t + "_h_" + i + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" ' + (s ? ' data-parent="#' + t + '"' : " ") + ' href="#' + t + "_c_" + i + '" aria-expanded="' + (o ? "true" : "false") + '" aria-controls="' + t + "_c_" + i + '">' + e[i] + '</a></h4></div><div id="' + t + "_c_" + i + '" class="panel-collapse collapse' + (o ? " in" : "") + '" role="tabpanel" aria-labelledby="' + t + "_h_" + i + '"><div class="panel-body inner">' + n[i] + "</div></div></div>"
                }
                return a += "</div>"
            },
            page_content_preloader: function(t) {
                return '<div class="container-fluid-loading col-lg-10 col-lg-offset-1"><div class="panel-loading panel-default-loading"><div class="panel-heading-loading text-center"><i class="fa fa-fw fa-inverse fa-2x text-lighter favorites xcustom-favorites fa-star-o dummy"></i>&nbsp;<span>' + t + '</span></div><div class="panel-body-loading"><span class="cspinner"><span class="cspinner-icon light"></span></span></div></div></div>'
            }
        }
    },
    page = {
        handle: {
            content: {
                preloader: function(t) {
                    var e = this,
                        n = $("#content"),
                        r = $(".container-fluid"),
                        a = $(".container-fluid-loading"),
                        i = $("span[data-main_title]").text(),
                        o = HTML.template.page_content_preloader(i);
                    a.length ? (a.remove(), r.removeClass("invisible"), n.removeClass("progressing"), setTimeout(function() {
                        progress.progress() && progress.end()
                    }, 100)) : (n.addClass("progressing").prepend(o), r.addClass("invisible")), t && setTimeout(function() {
                        e.preloader()
                    }, t)
                }
            }
        },
        render: {
            content: {
                filter: {
                    init: function(t) {
                        var e = this,
                            n = "container-fluid .nav.nav-tabs",
                            r = $(".__page .dataTables_filter"),
                            a = $(".__page .panel-filter"),
                            i = $("body");
                        (r.length || a.length) && setTimeout(function() {
                            $(".btn-filter-top-right").length || $(".btn-accordion-filter").length || ($("#headln2r .btn-group a").addClass("pull-left").attr("style", ""), $("#headln2r .btn-group").prepend('<a class="btn btn-link text-lighter btn-' + (t ? "accordion-filter" : "filter-top-right") + ' text-decoration-none pull-left" data-placement="auto top" data-toggle="tooltip" data-title="' + theme_language("theme_xhred_filter_accordions_content") + '" data-container="body"><label>&nbsp;&nbsp;<span class="fa fa-times-circle-o vertical-align-middle filter_mirror_clear text-lighter"></span><input type="text" class="dataTable-mirror" placeholder="' + theme_language("theme_xhred_datatable_filter") + '"></label><i class="fa fa-filter' + (t ? "2" : "") + '"></i></a>' + (t ? '<a class="btn btn-link text-lighter btn-toggle-accordions text-decoration-none pull-left"><i class="fa fa-toggle-switch-off fa-1_25x"></i></a>' : ""))), $("." + n).length && (t && i.on("hide.bs.tab", 'a[data-toggle="tab"]', function(t) {
                                e.clear()
                            }), i.on("shown.bs.tab", 'a[data-toggle="tab"]', function(t) {
                                var r = $(t.target).parent(".active");
                                r.data("filter-value") ? $(".dataTable-mirror").val(r.data("filter-value")).trigger("keyup") : $(".dataTable-mirror").val("").trigger("keyup"), e.visibility("btn-filter-top-right", "btn-accordion-filter", "btn-toggle-accordions", n)
                            }));
                            var r = $(".btn-toggle-accordions");
                            t ? $(a).find('a[data-toggle="collapse"]').on("click", function(t) {
                                t.originalEvent && $(".btn-toggle-accordions").find("i").removeClass("fa-toggle-switch text-light")
                            }) : $(".dataTables_filter").hide(), $(".filter_mirror_clear").mousedown(function(t) {
                                $(t.target).is(".filter_mirror_clear") && e.clear()
                            }), $(".btn-filter-top-right, .btn-accordion-filter").click(function(t) {
                                !$(t.target).is("input") && $(this).find("label").slideToggle(300, function() {
                                    $(this).find("input").focus()
                                })
                            }), r.click(function(t) {
                                var n = $(this).find(".fa"),
                                    r = $(this).find(".fa-toggle-switch").length ? 1 : 0,
                                    a = $(".__page .panel-filter:visible");
                                0 === r ? (a.find(".panel-collapse.in").length, a.find(".panel-collapse").length, a.find(".panel-collapse:not(.in)").filter(function() {
                                    $(this).removeData("bs.collapse").collapse({
                                        parent: !0,
                                        toggle: !1
                                    }).collapse("show").removeData("bs.collapse")
                                })) : a.find(".panel-collapse.in").filter(function() {
                                    $(this).collapse("hide")
                                }), n.toggleClass("fa-toggle-switch text-light"), void 0 !== t.originalEvent && $(".btn-accordion-filter input").val().length && e.clear()
                            }), $(".dataTable-mirror").keydown(function(t) {
                                76 == t.keyCode && t.ctrlKey && (t.preventDefault(), t.stopPropagation(), e.clear())
                            }).keyup(function(e) {
                                var a = $(this).val(),
                                    i = $(".__page .panel-filter:visible");
                                if (t)
                                    if (a) {
                                        $.support.transition && ($.support.transition = !1), r.find(".fa-toggle-switch-off:not(.fa-toggle-switch)").trigger("click"), i.find(".panel tr:not([data-empty-row])").addClass("hidden-forged"), i.find('.panel tbody tr:containsi("' + a + '")').removeClass("hidden-forged");
                                        var o = $(".__page .panel-filter:visible");
                                        $.each(o.find(".panel"), function() {
                                            var t = $(this).find("tr").first().find("td").length;
                                            rows = $(this).find("tbody").find("tr:not([data-empty-row])"), hidden_rows = $(this).find("tbody tr:not([data-empty-row]):hidden");
                                            var e = $(this).find("tbody tr[data-empty-row]");
                                            rows.length === hidden_rows.length ? !e.length && $(this).find("tbody").append('<tr data-empty-row colspan="' + t + '"><td class="text-center">' + theme_language("theme_xhred_datatable_szerorecords") + "</td></tr>") : e.remove()
                                        })
                                    } else r.find(".fa-toggle-switch").trigger("click"), i.find(".panel tr").removeClass("hidden-forged"), !$.support.transition && ($.support.transition = {
                                        end: "webkitTransitionEnd"
                                    });
                                else {
                                    $("." + n).length ? ($(".nav-tabs li.active").data("filter-value", a), $(".active .dataTables_filter input").val(a).trigger("keyup")) : $(".dataTables_filter input").val(a).trigger("keyup")
                                }
                                var l = ".btn-filter-top-right span, .btn-accordion-filter span",
                                    s = ".btn-filter-top-right i, .btn-accordion-filter i";
                                $.trim($(this).val()).length > 0 ? ($(l).removeClass("text-lighter"), $(s).addClass("text-danger")) : ($(l).addClass("text-lighter"), $(s).removeClass("text-danger"))
                            }), $(".btn-filter-top-right input, .btn-accordion-filter input").blur(function(t) {
                                $(this).parent("label").slideToggle(0)
                            }), e.visibility("btn-filter-top-right", "btn-accordion-filter", "btn-toggle-accordions", n)
                        }, 0)
                    },
                    visibility: function(t, e, n, r) {
                        var a = $("." + t + ", ." + e + ", ." + n);
                        $("." + r).length && ($(".active .dataTables_filter").length || $(".active #conf-_-gr").length) || !$("." + r).length && ($(".dataTables_filter").length || $("#conf-_-gr").length) ? a.show() : a.hide()
                    },
                    clear: function() {
                        var t = $(".btn-filter-top-right .dataTable-mirror, .btn-accordion-filter .dataTable-mirror"),
                            e = $(".btn-filter-top-right input, .btn-accordion-filter input");
                        t.val("").trigger("keyup"), e.is(":visible") && e.trigger("blur"), $(".panel-filter").find("tr[data-empty-row]").remove(), !$.support.transition && ($.support.transition = {
                            end: "webkitTransitionEnd"
                        })
                    }
                }
            },
            module_config: function(t) {
                var e = v___page_container.find(".table-title:visible").parents(".table:visible"),
                    n = e.parent("div.table-responsive:visible"),
                    r = e.find("tbody > tr > td > table:visible"),
                    a = 0;
                $.each(r.find("tr"), function(t, e) {
                    var n = $(this);
                    n.find(".col_header").length ? (a += 1, n.attr("tj", a + ":0")) : n.attr("tj", a + ":1")
                }).promise().done(function() {
                    var e = $('tr[tj$=":0"]').map(function() {
                        return $.trim($(this).text())
                    });
                    if (!(e.length <= 1)) {
                        for (var r = [], a = 1; a < e.length + 1; a++) {
                            var i = '<table class="table sub_table_container table-hardcoded"><tbody>';
                            i += $('[tj="' + a + ':0"]').nextAll('[tj="' + a + ':1"]').map(function() {
                                return this.outerHTML.replace(/\n/g, "")
                            }).get().join("\n"), i += "</tbody></table>", r[a - 1] = i
                        }
                        var o = "conf-_-gr";
                        n.replaceWith(HTML.template.accordion(o, e, r, t)), page.render.content.filter.init(1), $(".container-fluid > .panel > .panel-body").on("hide.bs.collapse show.bs.collapse", "#conf-_-gr", function() {
                            $(".module-help .close-popover-trigger").trigger("click")
                        })
                    }
                })
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
                i = e.offset().top;
            return i + e.height() <= a && i >= r
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