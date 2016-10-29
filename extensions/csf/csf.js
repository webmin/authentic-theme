/*!
 * Authentic Theme 18.20 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2016 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
var b = window,
    f = b.parent,
    a = f.document.getElementById("iframe"),
    with_frame = !(typeof f.NProgress == "object" ? 0 : 1),
    html = $("html"),
    r = $('link[href*="configserver"]'),
    empty = $("style");
html.attr("data-background-style", f.$("html").attr("data-background-style")).attr("data-module", "csf");
empty.empty();
r.remove();
$(function() {});

function csf_init() {
    function q(d) {
        return $("<div></div>").html(d).text()
    }(function(d) {
        d.fn.replaceTagName = function(Q) {
            var P = [],
                O = this.length;
            while (O--) {
                var M = document.createElement(Q),
                    L = this[O],
                    R = L.attributes;
                for (var S = R.length - 1; S >= 0; S--) {
                    var N = R[S];
                    M.setAttribute(N.name, N.value)
                }
                M.innerHTML = L.innerHTML;
                d(L).after(M).remove();
                P[O - 1] = M
            }
            return d(P)
        }
    })(jQuery);
    (function(d) {
        d.fn.replaceText = function(g, L, M) {
            return this.each(function() {
                var O = this.firstChild,
                    N, P, Q = [];
                if (O) {
                    do {
                        if (O.nodeType === 3) {
                            N = O.nodeValue;
                            P = N.replace(g, L);
                            if (P !== N) {
                                if (!M && /</.test(P)) {
                                    d(O).before(P);
                                    Q.push(O)
                                } else {
                                    O.nodeValue = P
                                }
                            }
                        }
                    } while (O = O.nextSibling)
                }
                Q.length && d(Q).remove()
            })
        }
    })(jQuery);

    function v(d, L, g) {
        s.animate({
            opacity: 1
        }, L.$settings_animation_left_slide_time, function() {
            s.css("pointer-events", "auto").css("overflow", "auto")
        });
        g && L.__lre()
    }

    function w(U, S) {
        var N = (((U.attr("onclick") && U.attr("onclick").indexOf("blank") !== -1) || (U.parents("form").attr("target") && U.parents("form").attr("target").indexOf("blank") !== -1)) ? true : false),
            g = U.hasClass("heighter-28"),
            L = U.css("height") == "28px",
            P = U.hasClass("btn-lg"),
            O = 0,
            T = U.find(".fa").hasClass("fa-1_25x"),
            M = U.find(".fa"),
            Q = ((typeof S == "undefined" || S == false) ? false : S),
            R = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (Q ? Q[0] + "px" : (((g || L) && (!T && !P)) ? (-0.5 + O) + "px" : T ? "1.6px" : P ? "1.5px" : "0")) + " !important; margin-left: " + (Q ? Q[1] + "px" : (((g || L) && (!T && !P)) ? "-23.5px" : P ? "-28px" : (!g && !L && T) ? "-27.5px" : "-25.5px")) + ' !important;"><span class="cspinner-icon white ' + (Q ? (Q[2] ? Q[2] : "") : (g || L ? "smaller" : "small")) + '"></span></span></span>',
            d = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (Q ? Q[0] + "px" : (((g || L) && (!T && !P)) ? (-0.5 + O) + "px" : T ? "1.6px" : P ? "1.5px" : "0")) + " !important; margin-left: " + (Q ? Q[1] + "px" : (((g || L) && (!T && !P)) ? "-23.5px" : P ? "-28px" : (!g && !L && T) ? "-27.5px" : "-25.5px")) + '  !important;"><span class="cspinner-icon dark ' + (Q ? (Q[2] ? Q[2] : "") : (g || L ? "smaller" : "small")) + '"></span></span></span>';
        !N && U.addClass("disabled");
        if (M.length && !N) {
            if (U.hasClass("btn-default")) {
                M.addClass("invisible").after(d)
            } else {
                M.addClass("invisible").after(R)
            }
        }
        if (Q[3]) {
            setTimeout(function() {
                U.removeClass("disabled");
                M.removeClass("invisible");
                U.find(".cspinner_container").remove()
            }, Q[3])
        }
    }

    function l() {
        if ($('html[data-post="viewlogs"]').length) {
            setTimeout(function() {
                $.each($(".table.table-striped.table-condensed tbody tr"), function() {
                    var d = $(this),
                        g = parseInt(d.find('td[nowrap] button[type="button"]').attr("onClick").match(/\d+/)[0]);
                    $.grep($__submenus__, function(L) {
                        if ($(L).attr("id") == ("s" + g)) {
                            d.after($(L))
                        }
                    })
                })
            }, 100)
        }
    }
    typeof f.lang == "function" ? $is_lang = 1 : $is_lang = 0;
    if ($is_lang) {
        var J = {
            order: [],
            aaSorting: [],
            bDestroy: true,
            bPaginate: false,
            bInfo: false,
            destroy: true,
            oLanguage: {
                sEmptyTable: f.lang("theme_xhred_datatable_semptytable"),
                sInfo: f.lang("theme_xhred_datatable_sinfo"),
                sInfoEmpty: f.lang("theme_xhred_datatable_sinfoempty"),
                sLengthMenu: f.lang("theme_xhred_datatable_slengthmenu"),
                sLoadingRecords: f.lang("theme_xhred_datatable_sloadingrecords"),
                sProcessing: f.lang("theme_xhred_datatable_sprocessing"),
                sSearch: " ",
                sZeroRecords: f.lang("theme_xhred_datatable_szerorecords")
            },
            drawCallback: function(d) {
                l()
            }
        }
    } else {
        var J = {
            order: [],
            aaSorting: [],
            bDestroy: true,
            bPaginate: false,
            bInfo: false,
            destroy: true,
            drawCallback: function(d) {
                l()
            }
        }
    }

    function e(d, L) {
        if (t.find('textarea[name="formdata"]').length) {
            return
        }
        if (t.find('pre:not(:contains("<---"))').length) {
            var g = "log";
            setTimeout(function() {
                d && t.find("pre").css({
                    position: "initial",
                    left: "initial",
                    opacity: "0"
                });
                t.find("pre").each(function(O, N) {
                    var P = $(this),
                        M = q(P.html());
                    P.empty();
                    window[g + "_" + O] = window.CodeMirror(this, {
                        value: M,
                        lineNumbers: L,
                        mode: null,
                        theme: (with_frame ? f.settings_cm_view_palette : "monokai"),
                        readOnly: true,
                        viewportMargin: Infinity
                    });
                    d && window[g + "_" + O].setSize(null, ($(window).outerHeight() / 1.7))
                }).promise().done(function() {
                    if (d) {
                        t.find("pre").css({
                            position: "initial",
                            left: "initial"
                        });
                        setTimeout(function() {
                            t.find("pre").animate({
                                opacity: 1
                            }, f.$settings_animation_left_slide_time)
                        }, 10)
                    }
                    if (!d) {
                        var M = ($("pre[style]").length == 1 ? 1.4 : 1.8);
                        $.each($("pre[style]"), function(O, N) {
                            var P = ($(window).outerHeight() / (M * $("pre[style]").length)),
                                Q = ($(this).find(".CodeMirror-code").find("pre").length * 17);
                            if (Q > P) {
                                window[g + "_" + O].setSize(null, P)
                            } else {
                                window[g + "_" + O].setSize(null, Q - 10)
                            }
                        })
                    }
                })
            }, 10)
        } else {
            t.find("pre").css({
                position: "initial",
                left: "initial"
            });
            t.find("pre").replaceText(/<---- /gi, "");
            t.find("pre").replaceText(/ ---->/gi, "")
        }
    }

    function p() {
        setTimeout(function() {
            t.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-filter-top-right text-decoration-none pull-left" data-toggle="tooltip" data-title="' + ($is_lang ? f.lang("theme_xhred_datatable_filter_visible_tables") : "") + '" data-container="body">				<label style="font-weight: 400">					<input type="text" class="dataTable-mirror" placeholder="' + ($is_lang ? f.lang("theme_xhred_datatable_filter") : "") + '">				</label>				<i class="fa fa-filter"></i>			</a>			</div>		');
            var d = t.find(".dataTables_filter");
            d.hide();
            t.find(".btn-filter-top-right").click(function(g) {
                !$(g.target).is("input") && $(this).find("label").slideToggle(300, function() {
                    $(this).find("input").focus()
                })
            });
            t.find(".dataTable-mirror").keyup(function(g) {
                t.find(".dataTables_filter input").val($(this).val()).trigger("keyup");
                if ($.trim($(this).val()).length > 0) {
                    t.find(".btn-filter-top-right i").addClass("text-danger")
                } else {
                    t.find(".btn-filter-top-right i").removeClass("text-danger")
                }
            });
            t.find(".btn-filter-top-right input").blur(function(g) {
                $(this).parent("label").slideToggle(0)
            });
            t.on("keydown", function(M) {
                if (f.$('aside input[name="search"]').is(":focus")) {
                    return
                }
                var L = M.keyCode ? M.keyCode : M.which;
                if (!t.find("input").is(":focus") && !t.find("select").is(":focus") && !t.find("textarea").is(":focus") && !t.find(".modal.in").length) {
                    var g = String.fromCharCode(L).toLowerCase();
                    if (g && /[a-zA-Z0-9]/.test(g) && !M.ctrlKey && !M.altKey && !M.metaKey && L !== 106 && L !== 107 && L !== 109 && L !== 112 && L !== 113 && L !== 114 && L !== 115 && L !== 116 && L !== 117 && L !== 118 && L !== 119 && L !== 120 && L !== 121 && L !== 122 && L !== 123) {
                        if (t.find(".dataTables_filter label input").length) {
                            t.find(".btn-filter-top-right").trigger("click");
                            t.find(".btn-filter-top-right .dataTable-mirror").focus().trigger("keyup")
                        }
                    }
                }
            })
        }, 0)
    }
    r = $('link[href*="configserver"], style, a#toplink, a#botlink, div#loader, a#webmintr2');
    r.remove();
    var m = (a !== null ? a.contentWindow : window);
    if (with_frame) {
        m.onbeforeunload = function(d) {
            f.__lrs()
        };
        $('body:not(".mobile-menu-toggler")').on("click", function(d) {
            if ($(d.target).is('a[data-toggle="tab"]')) {
                return
            }
            f.hide_mobile_menu()
        });
        $("#iframe").contents().find("body").on("keydown", function(d) {
            f.search_control(d);
            f.shortcut_control(d)
        });
        if (f.$("#open_webmin").length > 0 && f.$(".switch-toggle input:checked").attr("id") != "open_webmin" && f.$("body").data("dashboard") == "1") {
            f.t__s("open_webmin")
        }
        f.__cms();
        f.$('a[href="csf/"]').parent("li").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().prev("li").addClass("active")
    }
    var t = $("html"),
        s = $("body"),
        i = $("body .container-fluid"),
        D = $("html").attr("data-post"),
        z = $('pre:contains("csf:")').text().match(/((?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+))$/)[0] || "9.xx";
    s.addClass("csf");
    i.addClass("col-lg-10 col-lg-offset-1").wrapInner('<div class="panel panel-default">');
    t.find(".panel-default").wrapInner('<div class="panel-body">');
    t.find(".panel-default:first").css("border-top-width", "4px").prepend('<div class="panel-heading" style="text-align:center"><font size="+2">Firewall</font><span style="font-size:14px;display:block">ConfigServer Security & Firewall version ' + z + "</span></div>");
    t.find(".panel-heading + .panel-body > .panel:first").remove();
    t.find(".nav.nav-tabs").addClass("hidden");
    t.find('a[data-toggle="tab"][href="#other"]').parent("li").remove();
    t.find(".csf .nav.nav-tabs:hidden + .tab-content").attr("style", "margin-top: -10px !important");
    t.find("body table tr th").each(function() {
        if (!$(this).parents("tbody").find("form").length && $(this).text().indexOf("Upgrade") >= 0) {
            $(this).parents("table").prev("br").remove();
            $(this).parents("table").remove()
        }
    });
    t.find('a[href$="/csf/changelog.txt"]').addClass("btn btn-xxs btn-default _btn-changelog").html('<i class="fa fa-info-circle"></i>Changelog');
    t.find("body table.table.table-bordered.table-striped").each(function() {
        $(this).addClass("table-condensed").removeClass("table-bordered").removeAttr("style")
    });
    t.find("a#MobileView").parent(".panel-body").parent(".panel-body").parent(".panel").remove();
    t.find(".mobilecontainer").remove();
    typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
    var j = t.find('.panel-heading:contains("Development Contribution")').parent().parent(),
        F = ($('link[rel="shortcut icon"]').data("hostname") == settings_allowed_hostname ? 1 : 0);
    if (D) {
        var K = t.find('br + pre:contains("csf:")');
        if (F) {
            K.prev("br").remove();
            K.next("p").remove();
            K.remove()
        } else {
            var u = K.next("p");
            K.remove();
            u.addClass("text-right footer-string")
        }
    } else {
        if (F) {
            j.remove()
        } else {
            j.find('br, br + pre:contains("csf:")').remove();
            j.find(".panel-info").removeClass("panel-info").addClass("panel-default text-center margined-top-10 _devcon");
            j.find("p").addClass("text-right footer-string")
        }
    }
    t.find('.csf select:not([name="backup"], [name="profile1"], [name="profile2"], [name="do"], [name="dur"]), .csf input:not([name="comment"], [name="ip"], [name="ports"], [name="timeout"], [aria-controls*="DataTables_Table_"])').each(function() {
        $(this).addClass("heighter-34")
    });
    var B = t.find('h4:contains("iptables logs*")');
    if (B.length) {
        $(".panel-body .pull-right").addClass("hidden");
        var y = B.next().next(".table.table-striped.table-condensed");
        B.addClass("col_header_custom big_big").attr("style", "border-bottom-color: transparent !important; background-color: #fafafa !important; line-height: 25px !important;");
        B.find("b").css("margin-left", "4px");
        y.attr("style", "margin-top: -8px !important");
        y.find("tbody tr:nth-child(2) td:first-child").css("min-width", "200px");
        $__submenus__ = $(".submenu").detach();
        setTimeout(function() {
            t.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-toggle-top-right text-decoration-none pull-left" data-toggle="tooltip" data-container="body">				<i class="fa fa-toggle-switch-off fa-1_25x"></i>			</a>			</div>		');
            t.find("body").on("click", ".btn-toggle-top-right", function(d) {
                d.preventDefault();
                if ($(this).find(".fa-toggle-switch-off").length) {
                    t.find('button[onclick*=".show()"]')[0].click();
                    t.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch");
                    $(this).find(".fa-toggle-switch-off").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch")
                } else {
                    t.find('button[onclick*=".hide()"]')[0].click();
                    t.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch").addClass("fa-toggle-switch-off");
                    $(this).find(".fa-toggle-switch").addClass("fa-toggle-switch-off").removeClass("fa-toggle-switch")
                }
            })
        }, 0);
        $('html[data-post="viewlogs"] button.glyphicon.glyphicon-resize-vertical').addClass("btn-xxs").removeClass("glyphicon glyphicon-resize-vertical").addClass("fa fa-toggle-switch-off fa-1_25x").removeAttr("data-tooltip").removeAttr("data-title").removeAttr("data-original-title");
        $("body").on("click", ".table.table-striped.table-condensed tbody tr", function(d) {
            $(this).find("button").trigger("click")
        });
        $("body").on("click love", ".btn.btn-xxs.fa-1_25x", function(d) {
            d.preventDefault();
            d.stopImmediatePropagation();
            if ($(this).hasClass("fa-toggle-switch-off")) {
                $(this).removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch")
            } else {
                $(this).removeClass("fa-toggle-switch").addClass("fa-toggle-switch-off")
            }
        });
        $(".table.table-striped.table-condensed").dataTable(J);
        p();
        setTimeout(function() {
            $(".btn-filter-top-right").parent().css("right", "58px")
        }, 100)
    }
    if (t.find('.csf select[name="dur"]')[0]) {
        var E = t.find('.csf select[name="dur"]')[0].nextSibling;
        if (E.nodeValue == ".") {
            $(E).remove()
        }
    }
    var I = $('html[data-post="conf"] .csf form .comment > br:first-child').map(function() {
        this.previousSibling.nodeValue && $(this.previousSibling).wrap('<span class="fst-ln-c">')
    });
    t.find(".csf #paginatediv2.paginationstyle > select").each(function() {
        $(this).attr("style", "vertical-align: top !important")
    });
    t.find(".csf #paginatediv2 > a").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    t.find(".csf p > select").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    t.find('img[src="csfimages/loader.gif"]').each(function() {
        $(this).attr("src", "" + (with_frame ? f.$_____link_full : "") + "/images/loader-horizontal.gif").css("margin-left", "10px")
    });
    t.find(".paginationstyle a").each(function() {
        $(this).addClass("btn btn-default")
    });
    t.find('img[src^="lfd_"], img[src^="/csf/lfd_"]').each(function() {
        $(this).parents("table").removeClass("table-striped")
    });
    t.find('img[src^="csfimages/delete.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-unlock text-success" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    t.find('img[src^="csfimages/perm.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-lock text-danger" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    t.find('img[src^="csfimages/plus.png"]').each(function() {
        $(this).addClass("hidden");
        b;
        $(this).after('<i class="fa fa-plus-circle text-success margined-right-2" style="font-size: 1.1em;"></i>')
    });
    t.find('img[src^="csfimages/minus.png"]').each(function() {
        $(this).addClass("hidden");
        $(this).after('<i class="fa fa-minus-circle text-danger margined-right-2" style="font-size: 1.1em;"></i>')
    });
    t.find(".csf fieldset legend b").each(function() {
        if ($(this).text().indexOf("Edit ConfigServer Firewall") >= 0) {
            $submit_changes = t.find('input[value="Change"]');
            $submit_changes.addClass("csf-submit_changes");
            $submit_changes.on("click", function() {
                t.find('input[value="saveconf"]').parent("form").submit()
            })
        }
    });
    typeof __csf__listen_log_grep != "undefined" && clearInterval(__csf__listen_log_grep);
    if (t.find("#CSFgrep_D").length && t.find("#CSFgrep_E").length && t.find("#CSFgrep_i").length) {
        t.find('select, input[type="text"], button[onclick="CSFgrep()"]').removeClass("heighter-34").addClass("heighter-28");
        t.find("#CSFgrep_i, #CSFgrep_E, #CSFgrep_D").attr("style", "vertical-align: middle; margin-right: 4px;");
        t.find("#CSFajax").css("margin-bottom", "4px");
        t.find("#CSFlognum").attr("onchange", "javascript: document.getElementsByTagName('button')[0].click()");
        t.find("#CSFgrep_D").addClass("hidden");
        t.find(".csf-box").replaceText(/Detach/gi, "");
        t.find("li:contains('Use the \"Detach\" option to display the search results in a separate window')").remove()
    }
    t.find("#CSFajax.csf-box").addClass("csf_force_log_size");
    setTimeout(function() {
        if (typeof window.CodeMirror == "function") {
            e(false, false)
        } else {
            setTimeout(function() {
                if (typeof window.CodeMirror == "function") {
                    e(false, false)
                } else {
                    setTimeout(function() {
                        e(false, false)
                    }, 100)
                }
            }, 100)
        }
    }, 100);

    function H() {
        t.find('textarea[name="formdata"]').each(function(L, M) {
            var d = $(this);
            $parent_width = d.parent("td").width();
            var g = window.CodeMirror.fromTextArea(M, {
                mode: {
                    name: "rpm-spec"
                },
                matchBrackets: true,
                lineNumbers: true,
                keyMap: "sublime",
                highlightSelectionMatches: {
                    showToken: /\w/,
                    annotateScrollbar: true
                },
                indentUnit: 0,
                autofocus: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                },
                styleActiveLine: true,
                lineWrapping: true,
                theme: (with_frame ? f.settings_cm_editor_palette : "monokai")
            });
            $window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2));
            g.setSize($parent_width, $window_height);
            $(window).resize(function() {
                $parent_width = d.parent("td").width();
                $window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2));
                g.setSize($parent_width, $window_height)
            })
        })
    }
    setTimeout(function() {
        if (typeof window.CodeMirror == "function") {
            H()
        } else {
            setTimeout(function() {
                if (typeof window.CodeMirror == "function") {
                    H()
                } else {
                    setTimeout(function() {
                        H()
                    }, 60)
                }
            }, 150)
        }
    }, 60);
    if (t.find("h4").text().indexOf("Ports listening for external connections and the executables running behind them") !== -1) {
        t.find(".container-fluid .panel .panel-body table.table-striped").each(function() {
            t.find("h4").addClass("col_header_custom").attr("style", "margin-bottom: -5px !important; margin-top: 2px !important");
            t.find("h4").replaceText(/:/gi, "");
            $(this).dataTable(J)
        });
        p()
    }
    if (t.find(".csf .table.table-striped.table-condensed tbody th:eq(1)").text().indexOf("A/D") !== -1 && t.find(".csf .table.table-striped.table-condensed tbody th:eq(2)").text().indexOf("IP address") !== -1) {
        t.find('table:not(:contains("©2006-"))').each(function() {
            $('html[data-post="temp"] tr td .btn').attr("data-placement", "right");
            $('html[data-post="temp"] tr td .btn').addClass("btn-xxs").find("span.glyphicon.glyphicon-ban-circle").removeClass("glyphicon glyphicon-ban-circle").addClass("fa fa-ban");
            $('html[data-post="temp"] tr td .btn').find("span.glyphicon.glyphicon-ok-circle").removeClass("glyphicon glyphicon-ok-circle").addClass("fa fa-unlock");
            if (!$(this).find("thead").length) {
                var g = $(this),
                    d = $(this).find("tbody tr:first-child");
                g.prepend("<thead>" + d.html() + "</thead>");
                d.remove();
                $(this).dataTable(J);
                setTimeout(function() {
                    t.find(".csf .dataTable thead tr th:eq(0)").css("opacity", "0").css("pointer-events", "none")
                }, 10)
            }
        });
        p();
        $('.dataTables_wrapper + div:contains("There are no temporary IP entries")').remove();
        $('html[data-post="temp"] .dataTables_wrapper + div').find("a").addClass("btn-xxs btn-inverse").removeClass("btn-success").prepend('<i class="fa fa-fw fa-unlock">&nbsp;</i>')
    }
    $.each(t.find('input[type="radio"]:not(.iawobject), input[type="checkbox"]:not(.iawobject):not(#CSFgrep_D)'), function() {
        if ($("html").attr("data-post") == "conf") {
            return
        }
        if ($(this).is(":checkbox")) {
            if ($(this)[0]) {
                $___text = $(this)[0].nextSibling
            }
            var N = $(this).next('input:not([type="radio"], [type="checkbox"], [type="hidden"]), select, textarea'),
                L = ($___text && $___text.nodeValue && $.trim($___text.nodeValue).length > 1),
                M = (L ? $___text.nodeValue : "&nbsp;");
            $(this).addClass("iawobject");
            var d = $(this).attr("id") ? 'for="' + $(this).attr("id") + '"' : false;
            if (d === false && $(this).attr("name") && $(this).val()) {
                var g = "__replaced_" + $(this).attr("name") + "_" + $(this).val() + "";
                var d = 'for="' + g + '"';
                $(this).attr("id", g)
            }
            if ($(this).is(":checkbox")) {
                if ($($___text).length) {
                    $($___text).wrap('<label style="font-weight: 400" class="lawobject" ' + d + ">" + $.trim(M) + " </label>");
                    $($___text).remove()
                } else {
                    $(this).after('<label class="lawobject" for="' + ($(this).attr("id") ? $(this).attr("id") : $(this).attr("name")) + '">&nbsp;</label>')
                }
            }
            $(this).next("label").addBack().wrapAll('<span class="aw' + $(this).attr("type") + ' awobject awobjectm"></span>')
        } else {
            if ($(this).is(":radio")) {
                $(this).addClass("iawobject vertical-align-middle");
                $(this).after('<label class="lawobject" for="' + $(this).attr("name") + '">&nbsp;</label>');
                $(this).next("label").addBack().wrapAll('<span class="aw' + $(this).attr("type") + ' awobject awobjectm"></span>')
            }
        }
    });
    var A = $('p:contains("..."):contains("Done")');
    if (A.length || $('html[data-post="logtail"], 									html[data-post="allow"],									html[data-post="deny"],									html[data-post="redirect"],									html[data-post="ignorefiles"],									html[data-post="dirwatch"],									html[data-post="dyndns"],									html[data-post="templates"],									html[data-post="logfiles"],									html[data-post="blocklists"],									html[data-post="syslogusers"]').length) {
        $("#csfreturn").parent("form").parent("div").prev("hr").remove();
        A.remove()
    } else {
        if ($('html[data-post="servercheck"], html[data-post="readme"], html[data-post="viewlogs"], html[data-post="chart"], html[data-post="loggrep"], html[data-post="viewports"], html[data-post="profiles"], html[data-post="status"], html[data-post="sips"], html[data-post="temp"]').length) {
            if ($('html[data-post="temp"]') && $('a[href="index.cgi?action=temprm&ip=all"]').length) {} else {
                $("#csfreturn").parent("form").parent("div").prev("hr").replaceTagName("br")
            }
        }
    }
    var c = $("#csfreturn").length;
    $('#csfreturn, 		   html[data-post="rblcheckedit"] input[value="rblcheck"] + input,		   html[data-post="serverchecksave"] input[value="servercheck"] + input,		   html[data-post="temprm"] input[value="temp"] + input,		   html[data-post="temptoperm"] input[value="temp"] + input		').replaceWith('<button type="submit" class="btn btn-' + (c ? "primary" : "default") + ' page_footer_submit"><i class="fa fa-fw fa-arrow-left">&nbsp;</i> Return' + (c ? " to module index" : "") + "</button>");
    var k = $('html input[value="lfdrestart"] + input, html input[value="restart"] + input, html input[value="restartboth"] + input'),
        x = "Save",
        G = "fa-circle-check";
    if (k.length) {
        x = k.val();
        G = "fa-circle-o-notch"
    }
    $('input[value="Change"],		html:not([data-post=""]) input[value="restartboth"] + input,		html:not([data-post=""]) input[value="lfdrestart"] + input,		html:not([data-post=""]) input[value="restart"] + input		').replaceWith('<button type="submit" class="btn btn-default page_footer_submit' + (k.length ? " __restart" : "") + '"><i class="fa fa-fw ' + G + '">&nbsp;</i> ' + x + "</button>");
    $("body").on("click", ".page_footer_submit:not(.disabled)", function(d) {
        w($(this), [2, -27, "small", 600])
    });
    var C = ".panel-heading font",
        o = "bs-callout",
        n = "" + C + " + .circles",
        h = $("." + o + ":visible");
    if (h.length && !$(n).length) {
        $(C).after('<span class="circles"></span>')
    }
    $.each(h, function() {
        var g = $.trim($(this).attr("class").replace(o, "").replace(o + "-", "").replace("text-center", "").replace("collapse", "")),
            d = $(this).text();
        if (!d) {
            return
        }
        $(n).prepend('<span data-tooltip="tooltip" data-container="body" data-html="true" data-placement="bottom" data-title="' + d + '" class="circle ' + g + '"><i class="fa fa-' + ((g == "warning" || g == "danger") ? "exclamation-circle" : (g == "info" ? "info-circle" : "check-circle")) + '"></i></span>');
        $(this).remove()
    });
    setTimeout(function() {
        v(i, f, with_frame)
    }, 100)
};