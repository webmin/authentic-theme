/*!
 * Authentic Theme 18.40 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
var b = window,
    f = b.parent,
    a = f.document.getElementById("iframe"),
    with_frame = !(typeof f.NProgress == "object" ? 0 : 1),
    html = $("html"),
    r = $('link[href*="configserver"]'),
    empty = $("style"),
    __isNR = ($('link[href*="nightrider"]').length ? 1 : 0);
f.$___________initial = 0;
html.attr("data-background-style", f.$("html").attr("data-background-style")).attr("data-module", "csf");
empty.empty();
r.remove();

function csf_init() {
    function y(d) {
        return $("<div></div>").html(d).text()
    }(function(d) {
        d.fn.replaceTagName = function(X) {
            var W = [],
                V = this.length;
            while (V--) {
                var T = document.createElement(X),
                    S = this[V],
                    Y = S.attributes;
                for (var Z = Y.length - 1; Z >= 0; Z--) {
                    var U = Y[Z];
                    T.setAttribute(U.name, U.value)
                }
                T.innerHTML = S.innerHTML;
                d(S).after(T).remove();
                W[V - 1] = T
            }
            return d(W)
        }
    })(jQuery);
    (function(d) {
        d.fn.replaceText = function(g, S, T) {
            return this.each(function() {
                var V = this.firstChild,
                    U, W, X = [];
                if (V) {
                    do {
                        if (V.nodeType === 3) {
                            U = V.nodeValue;
                            W = U.replace(g, S);
                            if (W !== U) {
                                if (!T && /</.test(W)) {
                                    d(V).before(W);
                                    X.push(V)
                                } else {
                                    V.nodeValue = W
                                }
                            }
                        }
                    } while (V = V.nextSibling)
                }
                X.length && d(X).remove()
            })
        }
    })(jQuery);

    function p(d, S, g) {
        w.animate({
            opacity: 1
        }, S.$settings_animation_left_slide_time, function() {
            w.css("pointer-events", "auto").css("overflow", "auto")
        });
        g && S.__lre()
    }

    function u(ab, Z) {
        var U = (((ab.attr("onclick") && ab.attr("onclick").indexOf("blank") !== -1) || (ab.parents("form").attr("target") && ab.parents("form").attr("target").indexOf("blank") !== -1)) ? true : false),
            g = ab.hasClass("heighter-28"),
            S = ab.css("height") == "28px",
            W = ab.hasClass("btn-lg"),
            V = 0,
            aa = ab.find(".fa").hasClass("fa-1_25x"),
            T = ab.find(".fa"),
            X = ((typeof Z == "undefined" || Z == false) ? false : Z),
            Y = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (X ? X[0] + "px" : (((g || S) && (!aa && !W)) ? (-0.5 + V) + "px" : aa ? "1.6px" : W ? "1.5px" : "0")) + " !important; margin-left: " + (X ? X[1] + "px" : (((g || S) && (!aa && !W)) ? "-23.5px" : W ? "-28px" : (!g && !S && aa) ? "-27.5px" : "-25.5px")) + ' !important;"><span class="cspinner-icon white ' + (X ? (X[2] ? X[2] : "") : (g || S ? "smaller" : "small")) + '"></span></span></span>',
            d = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (X ? X[0] + "px" : (((g || S) && (!aa && !W)) ? (-0.5 + V) + "px" : aa ? "1.6px" : W ? "1.5px" : "0")) + " !important; margin-left: " + (X ? X[1] + "px" : (((g || S) && (!aa && !W)) ? "-23.5px" : W ? "-28px" : (!g && !S && aa) ? "-27.5px" : "-25.5px")) + '  !important;"><span class="cspinner-icon dark ' + (X ? (X[2] ? X[2] : "") : (g || S ? "smaller" : "small")) + '"></span></span></span>';
        !U && ab.addClass("disabled");
        if (T.length && !U) {
            if (ab.hasClass("btn-default")) {
                T.addClass("invisible").after(d)
            } else {
                T.addClass("invisible").after(Y)
            }
        }
        if (X[3]) {
            setTimeout(function() {
                ab.removeClass("disabled");
                T.removeClass("invisible");
                ab.find(".cspinner_container").remove()
            }, X[3])
        }
    }

    function F() {
        if ($('html[data-post="viewlogs"]').length) {
            setTimeout(function() {
                $.each($(".table.table-striped.table-condensed tbody tr"), function() {
                    var d = $(this);
                    targ = d.find('td[style*="nowrap"] button[type="button"]').attr("onclick");
                    __id = (targ ? parseInt(targ.match(/\d+/)[0]) : -1);
                    $.grep($__submenus__, function(g) {
                        if ($(g).attr("id") == ("s" + __id)) {
                            d.after($(g))
                        }
                    })
                })
            }, 100)
        }
    }
    typeof f.lang == "function" ? $is_lang = 1 : $is_lang = 0;
    if ($is_lang) {
        var A = {
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
                F()
            }
        }
    } else {
        var A = {
            order: [],
            aaSorting: [],
            bDestroy: true,
            bPaginate: false,
            bInfo: false,
            destroy: true,
            drawCallback: function(d) {
                F()
            }
        }
    }

    function k(d, S) {
        if (B.find('textarea[name="formdata"]').length || !$("html[data-post]").attr("data-post")) {
            return
        }
        if (B.find('pre:not(:contains("<---"))').length) {
            var g = "log";
            setTimeout(function() {
                d && B.find("pre").css({
                    position: "initial",
                    left: "initial",
                    opacity: "0"
                });
                B.find("pre").each(function(V, U) {
                    var W = $(this),
                        T = y(W.html());
                    W.empty();
                    window[g + "_" + V] = window.CodeMirror(this, {
                        value: T,
                        lineNumbers: S,
                        mode: null,
                        theme: (with_frame ? f.settings_cm_view_palette : "monokai"),
                        readOnly: true,
                        viewportMargin: Infinity
                    });
                    d && window[g + "_" + V].setSize(null, ($(window).outerHeight() / 1.7))
                }).promise().done(function() {
                    if (d) {
                        B.find("pre").css({
                            position: "initial",
                            left: "initial"
                        });
                        setTimeout(function() {
                            B.find("pre").animate({
                                opacity: 1
                            }, f.$settings_animation_left_slide_time)
                        }, 10)
                    }
                    if (!d) {
                        var T = ($("pre[style]").length == 1 ? 1.4 : 1.8);
                        $.each($("pre[style]"), function(V, U) {
                            var W = ($(window).outerHeight() / (T * $("pre[style]").length)),
                                X = ($(this).find(".CodeMirror-code").find("pre").length * 17);
                            if (X > W) {
                                window[g + "_" + V].setSize(null, W)
                            } else {
                                window[g + "_" + V].setSize(null, X - 10)
                            }
                        })
                    }
                })
            }, 10)
        } else {
            B.find("pre").css({
                position: "initial",
                left: "initial"
            });
            B.find("pre").replaceText(/<---- /gi, "");
            B.find("pre").replaceText(/ ---->/gi, "")
        }
    }

    function s() {
        setTimeout(function() {
            B.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-filter-top-right text-decoration-none pull-left" data-toggle="tooltip" data-title="' + ($is_lang ? f.lang("theme_xhred_datatable_filter_visible_tables") : "") + '" data-container="body">				<label style="font-weight: 400">					<input type="text" class="dataTable-mirror" placeholder="' + ($is_lang ? f.lang("theme_xhred_datatable_filter") : "") + '">				</label>				<i class="fa fa-filter"></i>			</a>			</div>		');
            var d = B.find(".dataTables_filter");
            d.hide();
            B.find(".btn-filter-top-right").click(function(g) {
                !$(g.target).is("input") && $(this).find("label").slideToggle(300, function() {
                    $(this).find("input").focus()
                })
            });
            B.find(".dataTable-mirror").keyup(function(g) {
                B.find(".dataTables_filter input").val($(this).val()).trigger("keyup");
                if ($.trim($(this).val()).length > 0) {
                    B.find(".btn-filter-top-right i").addClass("text-danger")
                } else {
                    B.find(".btn-filter-top-right i").removeClass("text-danger")
                }
            });
            B.find(".btn-filter-top-right input").blur(function(g) {
                $(this).parent("label").slideToggle(0)
            });
            B.on("keydown", function(T) {
                if (f.$('aside input[name="search"]').is(":focus")) {
                    return
                }
                var S = T.keyCode ? T.keyCode : T.which;
                if (!B.find("input").is(":focus") && !B.find("select").is(":focus") && !B.find("textarea").is(":focus") && !B.find(".modal.in").length) {
                    var g = String.fromCharCode(S).toLowerCase();
                    if (g && /[a-zA-Z0-9]/.test(g) && !T.ctrlKey && !T.altKey && !T.metaKey && S !== 106 && S !== 107 && S !== 109 && S !== 112 && S !== 113 && S !== 114 && S !== 115 && S !== 116 && S !== 117 && S !== 118 && S !== 119 && S !== 120 && S !== 121 && S !== 122 && S !== 123) {
                        if (B.find(".dataTables_filter label input").length) {
                            B.find(".btn-filter-top-right").trigger("click");
                            B.find(".btn-filter-top-right .dataTable-mirror").focus().trigger("keyup")
                        }
                    }
                }
            })
        }, 0)
    }
    r = $('link[href*="configserver"], style, a#toplink, a#botlink, div#loader, a#webmintr2');
    r.remove();
    var I = (a !== null ? a.contentWindow : window);
    if (with_frame) {
        I.onbeforeunload = function(d) {
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
    var B = $("html"),
        w = $("body"),
        D = $("body .container-fluid"),
        o = $("html").attr("data-post"),
        Q = $('pre:contains("csf:")').text().match(/((?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+))$/)[0] || "9.xx";
    w.addClass("csf");
    D.addClass("col-lg-10 col-lg-offset-1").wrapInner('<div class="panel panel-default">');
    B.find(".panel-default").wrapInner('<div class="panel-body">');
    B.find(".panel-default:first").css("border-top-width", "4px").prepend('<div class="panel-heading" style="text-align:center"><font size="+2">Firewall</font><span style="font-size:14px;display:block">ConfigServer Security & Firewall version ' + Q + "</span></div>");
    B.find(".panel-heading + .panel-body > .panel:first").remove();
    B.find(".nav.nav-tabs").addClass("hidden");
    B.find('a[data-toggle="tab"][href="#other"]').parent("li").remove();
    B.find(".csf .nav.nav-tabs:hidden + .tab-content").attr("style", "margin-top: -10px !important");
    if (B.find('button[value="upgrade"]').length === 0) {
        $("#upgradetable").remove()
    }
    B.find('a[href$="/csf/changelog.txt"]').addClass("btn btn-xxs btn-default _btn-changelog").html('<i class="fa fa-info-circle"></i>Changelog');
    B.find("body table.table.table-bordered.table-striped").each(function() {
        $(this).addClass("table-condensed").removeClass("table-bordered").removeAttr("style")
    });
    B.find("a#MobileView").parent(".panel-body").parent(".panel-body").parent(".panel").remove();
    var P = 0;
    if (B.find(".mobilecontainer").length) {
        P = 1
    }
    B.find(".mobilecontainer").remove();
    typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
    var G = P ? B.find('.panel-heading:contains("Development Contribution")').parent().parent() : B.find('.panel-heading:contains("Development Contribution")').parent(),
        q = ($('link[rel="shortcut icon"]').data("hostname") == settings_allowed_hostname ? 1 : 0);
    if (o) {
        var m = B.find('br + pre:contains("csf:")');
        if (q) {
            m.prev("br").remove();
            m.next("p").remove();
            m.remove()
        } else {
            var z = m.next("p");
            m.remove();
            m.prev("br").remove();
            z.addClass("text-right footer-string")
        }
    } else {
        if (q) {
            if (P) {
                G.remove()
            } else {
                G.parent().find('br, br + pre:contains("csf:")').remove();
                G.parent().find("p").remove();
                G.remove()
            }
        } else {
            if (P) {
                G.find('br, br + pre:contains("csf:")').remove();
                G.find(".panel-info").removeClass("panel-info").addClass("panel-default text-center margined-top-10 _devcon");
                G.find("p").addClass("text-right footer-string")
            } else {
                G.parent().find('br, br + pre:contains("csf:")').remove();
                G.parent().find(".panel-info").removeClass("panel-info").addClass("panel-default text-center margined-top-10 _devcon");
                G.parent().find("p").addClass("text-right footer-string")
            }
        }
    }
    B.find('.csf select:not([name="backup"], [name="profile1"], [name="profile2"], [name="do"], [name="dur"]), .csf input:not([name="comment"], [name="ip"], [name="ports"], [name="timeout"], [aria-controls*="DataTables_Table_"])').addClass("heighter-34");
    var n = B.find('h4:contains("iptables logs*")');
    if (n.length) {
        $(".panel-body .pull-right").addClass("hidden");
        var H = n.next().next(".table.table-striped.table-condensed");
        n.addClass("col_header_custom big_big");
        n.find("b").css("margin-left", "4px");
        H.attr("style", "margin-top: -8px !important");
        H.find("tbody tr:nth-child(2) td:first-child").css("min-width", "200px");
        $__submenus__ = $(".submenu").detach();
        setTimeout(function() {
            B.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-toggle-top-right text-decoration-none pull-left" data-toggle="tooltip" data-container="body">				<i class="fa fa-toggle-switch-off fa-1_25x"></i>			</a>			</div>		');
            B.find("body").on("click", ".btn-toggle-top-right", function(d) {
                d.preventDefault();
                if ($(this).find(".fa-toggle-switch-off").length) {
                    B.find('button[onclick*=".show()"]')[0].click();
                    B.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch");
                    $(this).find(".fa-toggle-switch-off").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch")
                } else {
                    B.find('button[onclick*=".hide()"]')[0].click();
                    B.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch").addClass("fa-toggle-switch-off");
                    $(this).find(".fa-toggle-switch").addClass("fa-toggle-switch-off").removeClass("fa-toggle-switch")
                }
            })
        }, 0);
        $('html[data-post="viewlogs"] button.glyphicon.glyphicon-resize-vertical').addClass("btn-xxs").removeClass("glyphicon glyphicon-resize-vertical").addClass("fa fa-toggle-switch-off fa-1_25x").removeAttr("data-tooltip").removeAttr("data-title").removeAttr("data-original-title");
        $("body").on("click", ".table.table-striped.table-condensed tbody tr", function(d) {
            $(this).find("button").trigger("click")
        });
        $("body").on("click", ".btn.btn-xxs.fa-1_25x", function(d) {
            d.preventDefault();
            d.stopImmediatePropagation();
            if ($(this).hasClass("fa-toggle-switch-off")) {
                $(this).removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch")
            } else {
                $(this).removeClass("fa-toggle-switch").addClass("fa-toggle-switch-off")
            }
        });
        $(".table.table-striped.table-condensed").dataTable(A);
        s();
        setTimeout(function() {
            $(".btn-filter-top-right").parent().css("right", "58px")
        }, 100)
    }
    if (B.find('.csf select[name="dur"]')[0]) {
        var K = B.find('.csf select[name="dur"]')[0].nextSibling;
        if (K.nodeValue == ".") {
            $(K).remove()
        }
    }
    var i = $('html[data-post="conf"] .csf form .comment > br:first-child').map(function() {
        this.previousSibling.nodeValue && $(this.previousSibling).wrap('<span class="fst-ln-c">')
    });
    B.find(".csf #paginatediv2.paginationstyle > select").each(function() {
        $(this).attr("style", "vertical-align: top !important")
    });
    B.find(".csf #paginatediv2 > a").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    B.find(".csf p > select").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    var x = ((f.__isNR || f.__isNM) ? 1 : 0);
    B.find('img[src="csfimages/loader.gif"]').each(function() {
        $(this).attr("src", "" + (with_frame ? f.$_____link_full : "") + "/images/loader-horizontal" + (x ? "_dark" : "") + ".gif").css("margin-left", "10px")
    });
    B.find(".paginationstyle a").each(function() {
        $(this).addClass("btn btn-default")
    });
    B.find('img[src^="lfd_"], img[src^="/csf/lfd_"]').each(function() {
        $(this).parents("table").removeClass("table-striped")
    });
    B.find('img[src^="csfimages/delete.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-unlock text-success" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    B.find('img[src^="csfimages/perm.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-lock text-danger" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    B.find('img[src^="csfimages/plus.png"]').each(function() {
        $(this).addClass("hidden");
        b;
        $(this).after('<i class="fa fa-plus-circle text-success margined-right-2" style="font-size: 1.1em;"></i>')
    });
    B.find('img[src^="csfimages/minus.png"]').each(function() {
        $(this).addClass("hidden");
        $(this).after('<i class="fa fa-minus-circle text-danger margined-right-2" style="font-size: 1.1em;"></i>')
    });
    B.find(".csf fieldset legend b").each(function() {
        if ($(this).text().indexOf("Edit ConfigServer Firewall") >= 0) {
            $submit_changes = B.find('input[value="Change"]');
            $submit_changes.addClass("csf-submit_changes");
            $submit_changes.on("click", function() {
                B.find('input[value="saveconf"]').parent("form").submit()
            })
        }
    });
    typeof __csf__listen_log_grep != "undefined" && clearInterval(__csf__listen_log_grep);
    if (B.find("#CSFgrep_D").length && B.find("#CSFgrep_E").length && B.find("#CSFgrep_i").length) {
        B.find('select, input[type="text"], button[onclick="CSFgrep()"]').removeClass("heighter-34").addClass("heighter-28");
        B.find("#CSFgrep_i, #CSFgrep_E, #CSFgrep_D").attr("style", "vertical-align: middle; margin-right: 4px;");
        B.find("#CSFajax").css("margin-bottom", "4px")
    }
    B.find("#CSFajax.csf-box").addClass("csf_force_log_size");
    setTimeout(function() {
        if (typeof window.CodeMirror == "function") {
            k(false, false)
        } else {
            setTimeout(function() {
                if (typeof window.CodeMirror == "function") {
                    k(false, false)
                } else {
                    setTimeout(function() {
                        k(false, false)
                    }, 100)
                }
            }, 100)
        }
    }, 100);

    function O() {
        if (!$("html[data-post]").attr("data-post")) {
            return
        }
        B.find('textarea[name="formdata"]').each(function(S, T) {
            var d = $(this);
            $parent_width = d.parent("td").width();
            var g = window.CodeMirror.fromTextArea(T, {
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
            O()
        } else {
            setTimeout(function() {
                if (typeof window.CodeMirror == "function") {
                    O()
                } else {
                    setTimeout(function() {
                        O()
                    }, 60)
                }
            }, 150)
        }
    }, 60);
    if (B.find("h4").text().indexOf("Ports listening for external connections") !== -1) {
        B.find(".container-fluid .panel .panel-body table.table-striped").each(function() {
            B.find("h4").addClass("col_header_custom").attr("style", "margin-bottom: -5px !important; margin-top: 2px !important");
            B.find("h4").text("Ports listening for external connections");
            $(this).dataTable(A)
        });
        s()
    }
    if (B.find(".csf th:eq(1)").text().indexOf("A/D") !== -1 && B.find(".csf th:eq(2)").text().indexOf("IP address") !== -1) {
        B.find('table:not(:contains("©2006-"))').each(function() {
            $.each($('html[data-post="temp"] tr td a.btn'), function(d, g) {
                $(this).attr("data-placement", "right");
                $(this).addClass("btn-xxs");
                if ($(this).hasClass("btn-danger")) {
                    $(this).addClass("margined-right-8")
                }
            });
            $(this).dataTable(A);
            setTimeout(function() {
                B.find(".csf .dataTable thead tr th:eq(0)").css("opacity", "0").css("pointer-events", "none")
            }, 10)
        });
        s();
        $('.dataTables_wrapper + div:contains("There are no temporary IP entries")').remove();
        $('html[data-post="temp"] .dataTables_wrapper + div').find("a").addClass("btn-xxs btn-inverse").removeClass("btn-success").prepend('<i class="fa fa-fw fa-unlock">&nbsp;</i>')
    }
    if ($("html").attr("data-post") === "") {
        B.find('button[value="conf"]').prepend('<i class="fa fa-cog margined-right-5"></i>');
        B.find('button[value="enable"]').addClass("page_footer_submit btn-success").removeClass("btn-default").prepend('<i class="fa fa-toggle-switch fa-1_25x margined-right-5"></i>');
        B.find('button[value="disable"]').addClass("page_footer_submit btn-danger").removeClass("btn-default").prepend('<i class="fa fa-toggle-switch-off fa-1_25x margined-right-5"></i>');
        B.find('button[value="restart"]').addClass("page_footer_submit btn-info").removeClass("btn-default").prepend('<i class="fa fa-circle-o-notch margined-right-5"></i>');
        B.find('button[value="denyf"]').addClass("page_footer_submit btn-warning").removeClass("btn-default").prepend('<i class="fa fa-unlock margined-right-5"></i>')
    }
    $.each(B.find('input[type="radio"]:not(.iawobject), input[type="checkbox"]:not(.iawobject)'), function() {
        if ($("html").attr("data-post") == "conf") {
            return
        }
        if ($(this).is(":checkbox")) {
            if ($(this)[0]) {
                $___text = $(this)[0].nextSibling
            }
            var U = $(this).next('input:not([type="radio"], [type="checkbox"], [type="hidden"]), select, textarea'),
                S = ($___text && $___text.nodeValue && $.trim($___text.nodeValue).length > 1),
                T = (S ? $___text.nodeValue : "&nbsp;");
            $(this).addClass("iawobject");
            var d = $(this).attr("id") ? 'for="' + $(this).attr("id") + '"' : false;
            if (d === false && $(this).attr("name") && $(this).val()) {
                var g = "__replaced_" + $(this).attr("name") + "_" + $(this).val() + "";
                var d = 'for="' + g + '"';
                $(this).attr("id", g)
            }
            if ($(this).is(":checkbox")) {
                if ($($___text).length) {
                    $($___text).wrap('<label style="font-weight: 400" class="lawobject" ' + d + ">" + $.trim(T) + " </label>");
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
    var J = $('p:contains("..."):contains("Done")');
    if (J.length || $('html[data-post="logtail"], 									html[data-post="allow"],									html[data-post="deny"],									html[data-post="redirect"],									html[data-post="ignorefiles"],									html[data-post="dirwatch"],									html[data-post="dyndns"],									html[data-post="templates"],									html[data-post="logfiles"],									html[data-post="blocklists"],									html[data-post="syslogusers"]').length) {
        $("#csfreturn").parent("form").parent("div").prev("hr").replaceTagName("br");
        J.remove()
    } else {
        if ($('html[data-post="servercheck"], html[data-post="readme"], html[data-post="viewlogs"], html[data-post="chart"], html[data-post="loggrep"], html[data-post="viewports"], html[data-post="profiles"], html[data-post="status"], html[data-post="sips"], html[data-post="temp"]').length) {
            if ($('html[data-post="temp"]') && $('a[href="index.cgi?action=temprm&ip=all"]').length) {} else {
                $("#csfreturn").parent("form").parent("div").prev("hr").replaceTagName("br")
            }
        }
    }
    var c = $("#csfreturn").length;
    $('#csfreturn, 		   html[data-post="rblcheckedit"] input[value="rblcheck"] + input,		   html[data-post="serverchecksave"] input[value="servercheck"] + input,		   html[data-post="temprm"] input[value="temp"] + input,		   html[data-post="temptoperm"] input[value="temp"] + input		').replaceWith('<button type="submit" class="btn btn-' + (c ? "primary" : "default margined-top-10") + ' page_footer_submit"><i class="fa fa-fw fa-arrow-left">&nbsp;</i> Return' + (c ? " to module index" : "") + "</button>");
    var L = $('html input[value="lfdrestart"] + input, html input[value="restart"] + input, html input[value="restartboth"] + input'),
        R = "Save",
        C = "fa-circle-check";
    if (L.length) {
        R = L.val();
        C = "fa-circle-o-notch"
    }
    $('input[value="Change"],		html:not([data-post=""]) input[value="restartboth"] + input,		html:not([data-post=""]) input[value="lfdrestart"] + input,		html:not([data-post=""]) input[value="restart"] + input		').replaceWith('<button type="submit" class="btn btn-default page_footer_submit' + (L.length ? " __restart" : "") + '"><i class="fa fa-fw ' + C + '">&nbsp;</i> ' + R + "</button>");
    $("body").on("click", ".page_footer_submit:not(.disabled)", function(d) {
        u($(this), [2, -27, "small", 600])
    });
    var M = ".panel-heading font",
        v = "bs-callout",
        h = "" + M + " + .circles",
        N = $("." + v + ":visible");
    if (N.length && !$(h).length) {
        $(M).after('<span class="circles"></span>')
    }
    $.each(N, function() {
        var g = $.trim($(this).attr("class").replace(v, "").replace(v + "-", "").replace("text-center", "").replace("collapse", "")),
            d = $(this).text();
        if (!d) {
            return
        }
        $(h).prepend('<span data-tooltip="tooltip" data-container="body" data-html="true" data-placement="bottom" data-title="' + d + '" class="circle ' + g + '"><i class="fa fa-' + ((g == "warning" || g == "danger") ? "exclamation-circle" : (g == "info" ? "info-circle" : "check-circle")) + '"></i></span>');
        $(this).remove()
    });
    if ($("html").attr("data-post") !== "") {
        var j = B.find(".btn-primary.page_footer_submit");
        if (j.length) {
            B.find(".panel-heading font").before('<a href="/csf" class="btn btn-link footer_module_index_top"><i class="fa fa-arrow-left"></i></a>');
            $("body").on("click", ".footer_module_index_top", function(d) {
                d.preventDefault();
                $("body").find(".btn.btn-primary.page_footer_submit").before('<input type="submit" class="submit_tmp_index hidden">');
                $(".submit_tmp_index").trigger("click")
            })
        }
    } else {
        var E = B.find('button[value="conf"]'),
            l = E.parent("form").parent("td").parent("tr").addClass("hidden").detach();
        $("#csf > table > tbody").append(l);
        B.find(".panel-heading font").before('<div class="btn-group btn-group-csf-home"><a href="/" class="btn btn-link text-lighter ported_module_csf_conf"><i class="fa fa-cog"></i></a><a href="/" class="btn btn-link text-lighter ported_module_csf_help"><i class="fa fa-question-circle"></i></a></div>');
        $("body").on("click", 'a[href="/"].ported_module_csf_conf', function(d) {
            d.preventDefault();
            E.trigger("click")
        });
        var t = B.find('button[value="readme"]'),
            e = t.parent("td").parent("tr").addClass("hidden").detach();
        $("#home form table tbody").append(e);
        $("body").on("click", 'a[href="/"].ported_module_csf_help', function(d) {
            d.preventDefault();
            t.trigger("click")
        })
    }
    setTimeout(function() {
        p(D, f, with_frame)
    }, 100)
};