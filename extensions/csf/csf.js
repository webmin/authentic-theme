/*!
 * Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
 */
;
var b = window,
    f = b.parent,
    a = f.document.getElementById("iframe"),
    with_frame = !(typeof f.NProgress == "object" ? 0 : 1),
    html = $("html"),
    r = $('link[href*="configserver"]'),
    empty = $("style"),
    __isNR = (($('html[data-background-style="nightRider"]').length && $('link[href*="nightrider"]').length) ? 1 : 0);
f.$___________initial = 0;
html.attr("data-background-style", f.$("html").attr("data-background-style")).attr("data-module", "csf");
empty.empty();
r.remove();

function csf_init() {
    function w(d) {
        return $("<div></div>").html(d).text()
    }(function(d) {
        d.fn.replaceTagName = function(V) {
            var U = [],
                T = this.length;
            while (T--) {
                var R = document.createElement(V),
                    Q = this[T],
                    W = Q.attributes;
                for (var X = W.length - 1; X >= 0; X--) {
                    var S = W[X];
                    R.setAttribute(S.name, S.value)
                }
                R.innerHTML = Q.innerHTML;
                d(Q).after(R).remove();
                U[T - 1] = R
            }
            return d(U)
        }
    })(jQuery);
    (function(d) {
        d.fn.replaceText = function(g, Q, R) {
            return this.each(function() {
                var T = this.firstChild,
                    S, U, V = [];
                if (T) {
                    do {
                        if (T.nodeType === 3) {
                            S = T.nodeValue;
                            U = S.replace(g, Q);
                            if (U !== S) {
                                if (!R && /</.test(U)) {
                                    d(T).before(U);
                                    V.push(T)
                                } else {
                                    T.nodeValue = U
                                }
                            }
                        }
                    } while (T = T.nextSibling)
                }
                V.length && d(V).remove()
            })
        }
    })(jQuery);

    function o(d, Q, g) {
        u.animate({
            opacity: 1
        }, Q.$settings_animation_left_slide_time, function() {
            u.css("pointer-events", "auto").css("overflow", "auto")
        });
        g && Q.__lre()
    }

    function s(Z, X) {
        var S = (((Z.attr("onclick") && Z.attr("onclick").indexOf("blank") !== -1) || (Z.parents("form").attr("target") && Z.parents("form").attr("target").indexOf("blank") !== -1)) ? true : false),
            g = Z.hasClass("heighter-28"),
            Q = Z.css("height") == "28px",
            U = Z.hasClass("btn-lg"),
            T = 0,
            Y = Z.find(".fa").hasClass("fa-1_25x"),
            R = Z.find(".fa"),
            V = ((typeof X == "undefined" || X == false) ? false : X),
            W = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (V ? V[0] + "px" : (((g || Q) && (!Y && !U)) ? (-0.5 + T) + "px" : Y ? "1.6px" : U ? "1.5px" : "0")) + " !important; margin-left: " + (V ? V[1] + "px" : (((g || Q) && (!Y && !U)) ? "-23.5px" : U ? "-28px" : (!g && !Q && Y) ? "-27.5px" : "-25.5px")) + ' !important;"><span class="cspinner-icon white ' + (V ? (V[2] ? V[2] : "") : (g || Q ? "smaller" : "small")) + '"></span></span></span>',
            d = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (V ? V[0] + "px" : (((g || Q) && (!Y && !U)) ? (-0.5 + T) + "px" : Y ? "1.6px" : U ? "1.5px" : "0")) + " !important; margin-left: " + (V ? V[1] + "px" : (((g || Q) && (!Y && !U)) ? "-23.5px" : U ? "-28px" : (!g && !Q && Y) ? "-27.5px" : "-25.5px")) + '  !important;"><span class="cspinner-icon dark ' + (V ? (V[2] ? V[2] : "") : (g || Q ? "smaller" : "small")) + '"></span></span></span>';
        !S && Z.addClass("disabled");
        if (R.length && !S) {
            if (Z.hasClass("btn-default")) {
                R.addClass("invisible").after(d)
            } else {
                R.addClass("invisible").after(W)
            }
        }
        if (V[3]) {
            setTimeout(function() {
                Z.removeClass("disabled");
                R.removeClass("invisible");
                Z.find(".cspinner_container").remove()
            }, V[3])
        }
    }

    function D() {
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
        var y = {
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
                D()
            }
        }
    } else {
        var y = {
            order: [],
            aaSorting: [],
            bDestroy: true,
            bPaginate: false,
            bInfo: false,
            destroy: true,
            drawCallback: function(d) {
                D()
            }
        }
    }

    function k(d, Q) {
        if (z.find('textarea[name="formdata"]').length || !$("html[data-post]").attr("data-post")) {
            return
        }
        if (z.find('pre:not(:contains("<---"))').length) {
            var g = "log";
            setTimeout(function() {
                d && z.find("pre").css({
                    position: "initial",
                    left: "initial",
                    opacity: "0"
                });
                z.find("pre").each(function(T, S) {
                    var U = $(this),
                        R = w(U.html());
                    U.empty();
                    window[g + "_" + T] = window.CodeMirror(this, {
                        value: R,
                        lineNumbers: Q,
                        mode: null,
                        theme: ((with_frame && !f.__isNM) ? f.settings_cm_editor_palette : "monokai"),
                        readOnly: true,
                        viewportMargin: Infinity
                    });
                    d && window[g + "_" + T].setSize(null, ($(window).outerHeight() / 1.7))
                }).promise().done(function() {
                    if (d) {
                        z.find("pre").css({
                            position: "initial",
                            left: "initial"
                        });
                        setTimeout(function() {
                            z.find("pre").animate({
                                opacity: 1
                            }, f.$settings_animation_left_slide_time)
                        }, 10)
                    }
                    if (!d) {
                        var R = ($("pre[style]").length == 1 ? 1.4 : 1.8);
                        $.each($("pre[style]"), function(T, S) {
                            var U = ($(window).outerHeight() / (R * $("pre[style]").length)),
                                V = ($(this).find(".CodeMirror-code").find("pre").length * 17);
                            if (V > U) {
                                window[g + "_" + T].setSize(null, U)
                            } else {
                                window[g + "_" + T].setSize(null, V - 10)
                            }
                        })
                    }
                })
            }, 10)
        } else {
            z.find("pre").css({
                position: "initial",
                left: "initial"
            });
            z.find("pre").replaceText(/<---- /gi, "");
            z.find("pre").replaceText(/ ---->/gi, "")
        }
    }

    function q() {
        setTimeout(function() {
            z.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-filter-top-right text-decoration-none pull-left" data-toggle="tooltip" data-title="' + ($is_lang ? f.lang("theme_xhred_datatable_filter") : "") + '" data-container="body">				<label style="font-weight: 400">					<input type="text" class="dataTable-mirror" placeholder="' + ($is_lang ? f.lang("theme_xhred_datatable_filter") : "") + '">				</label>				<i class="fa fa-filter"></i>			</a>			</div>		');
            var d = z.find(".dataTables_filter");
            d.hide();
            z.find(".btn-filter-top-right").click(function(g) {
                !$(g.target).is("input") && $(this).find("label").slideToggle(300, function() {
                    $(this).find("input").focus()
                })
            });
            z.find(".dataTable-mirror").keyup(function(g) {
                z.find(".dataTables_filter input").val($(this).val()).trigger("keyup");
                if ($.trim($(this).val()).length > 0) {
                    z.find(".btn-filter-top-right i").addClass("text-danger")
                } else {
                    z.find(".btn-filter-top-right i").removeClass("text-danger")
                }
            });
            z.find(".btn-filter-top-right input").blur(function(g) {
                $(this).parent("label").slideToggle(0)
            });
            z.on("keydown", function(R) {
                if (f.$('aside input[name="search"]').is(":focus")) {
                    return
                }
                var Q = R.keyCode ? R.keyCode : R.which;
                if (!z.find("input").is(":focus") && !z.find("select").is(":focus") && !z.find("textarea").is(":focus") && !z.find(".modal.in").length) {
                    var g = String.fromCharCode(Q).toLowerCase();
                    if (g && /[a-zA-Z0-9]/.test(g) && !R.ctrlKey && !R.altKey && !R.metaKey && Q !== 106 && Q !== 107 && Q !== 109 && Q !== 112 && Q !== 113 && Q !== 114 && Q !== 115 && Q !== 116 && Q !== 117 && Q !== 118 && Q !== 119 && Q !== 120 && Q !== 121 && Q !== 122 && Q !== 123) {
                        if (z.find(".dataTables_filter label input").length) {
                            z.find(".btn-filter-top-right").trigger("click");
                            z.find(".btn-filter-top-right .dataTable-mirror").focus().trigger("keyup")
                        }
                    }
                }
            })
        }, 0)
    }
    r = $('link[href*="configserver"], style, a#toplink, a#botlink, div#loader, a#webmintr2');
    r.remove();
    var G = (a !== null ? a.contentWindow : window);
    if (with_frame) {
        G.onbeforeunload = function(d) {
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
    var z = $("html"),
        u = $("body"),
        B = $("body .container-fluid"),
        n = $("html").attr("data-post"),
        O = $('pre:contains("csf:")').text().match(/((?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+))$/)[0] || "9.xx";
    u.addClass("csf");
    B.addClass("col-lg-10 col-lg-offset-1").wrapInner('<div class="panel panel-default">');
    z.find(".panel-default").wrapInner('<div class="panel-body">');
    z.find(".panel-default:first").css("border-top-width", "4px").prepend('<div class="panel-heading" style="text-align:center"><font size="+2">Firewall</font><span style="font-size:14px;display:block">ConfigServer Security & Firewall version ' + O + "</span></div>");
    z.find(".panel-heading + .panel-body > .panel:first").remove();
    z.find(".nav.nav-tabs").addClass("hidden");
    z.find('a[data-toggle="tab"][href="#other"]').parent("li").remove();
    z.find(".csf .nav.nav-tabs:hidden + .tab-content").attr("style", "margin-top: -10px !important");
    if (z.find('button[value="upgrade"]').length === 0) {
        $("#upgradetable").remove()
    }
    z.find('a[href$="/csf/changelog.txt"]').addClass("btn btn-xxs btn-default _btn-changelog").html('<i class="fa fa-info-circle"></i>Changelog');
    z.find("body table.table.table-bordered.table-striped").each(function() {
        $(this).addClass("table-condensed").removeClass("table-bordered").removeAttr("style")
    });
    z.find("a#MobileView").parent(".panel-body").parent(".panel-body").parent(".panel").remove();
    var N = 0;
    if (z.find(".mobilecontainer").length) {
        N = 1
    }
    z.find(".mobilecontainer").remove();
    typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
    var E = N ? z.find('.panel-heading:contains("Development Contribution")').parent().parent() : z.find('.panel-heading:contains("Development Contribution")').parent(),
        p = ($('link[rel="shortcut icon"]').data("hostname") == settings_allowed_hostname ? 1 : 0);
    if (n) {
        var l = z.find('br + pre:contains("csf:")');
        if (p) {
            l.prev("br").remove();
            l.next("p").remove();
            l.remove()
        } else {
            var x = l.next("p");
            l.remove();
            l.prev("br").remove();
            x.addClass("text-right footer-string")
        }
    } else {
        if (p) {
            if (N) {
                E.remove()
            } else {
                E.parent().find('br, br + pre:contains("csf:")').remove();
                E.parent().find("p").remove();
                E.remove()
            }
        } else {
            if (N) {
                E.find('br, br + pre:contains("csf:")').remove();
                E.find(".panel-info").removeClass("panel-info").addClass("panel-default text-center margined-top-10 _devcon");
                E.find("p").addClass("text-right footer-string")
            } else {
                E.parent().find('br, br + pre:contains("csf:")').remove();
                E.parent().find(".panel-info").removeClass("panel-info").addClass("panel-default text-center margined-top-10 _devcon");
                E.parent().find("p").addClass("text-right footer-string")
            }
        }
    }
    z.find('.csf select:not([name="backup"], [name="profile1"], [name="profile2"], [name="do"], [name="dur"]), .csf input:not([name="comment"], [name="ip"], [name="ports"], [name="timeout"], [aria-controls*="DataTables_Table_"])').addClass("heighter-34");
    var m = z.find('h4:contains("iptables logs*")');
    if (m.length) {
        $(".panel-body .pull-right").addClass("hidden");
        var F = m.next().next(".table.table-striped.table-condensed");
        m.addClass("col_header_custom big_big");
        m.find("b").css("margin-left", "4px");
        F.attr("style", "margin-top: -8px !important");
        F.find("tbody tr:nth-child(2) td:first-child").css("min-width", "200px");
        $__submenus__ = $(".submenu").detach();
        setTimeout(function() {
            z.find(".panel-heading").prepend('			<div class="btn-group pull-right" style="position: absolute; right: 15px; top: 17px;">			<a class="btn btn-link text-lighter btn-toggle-top-right text-decoration-none pull-left" data-toggle="tooltip" data-container="body">				<i class="fa fa-toggle-switch-off fa-1_25x"></i>			</a>			</div>		');
            z.find("body").on("click", ".btn-toggle-top-right", function(d) {
                d.preventDefault();
                if ($(this).find(".fa-toggle-switch-off").length) {
                    z.find('button[onclick*=".show()"]')[0].click();
                    z.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch");
                    $(this).find(".fa-toggle-switch-off").removeClass("fa-toggle-switch-off").addClass("fa-toggle-switch")
                } else {
                    z.find('button[onclick*=".hide()"]')[0].click();
                    z.find(".btn.btn-xxs.fa-1_25x").removeClass("fa-toggle-switch").addClass("fa-toggle-switch-off");
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
        $(".table.table-striped.table-condensed").dataTable(y);
        q();
        setTimeout(function() {
            $(".btn-filter-top-right").parent().css("right", "58px")
        }, 100)
    }
    if (z.find('.csf select[name="dur"]')[0]) {
        var I = z.find('.csf select[name="dur"]')[0].nextSibling;
        if (I.nodeValue == ".") {
            $(I).remove()
        }
    }
    var i = $('html[data-post="conf"] .csf form .comment > br:first-child').map(function() {
        this.previousSibling.nodeValue && $(this.previousSibling).wrap('<span class="fst-ln-c">')
    });
    z.find(".csf #paginatediv2.paginationstyle > select").each(function() {
        $(this).attr("style", "vertical-align: top !important")
    });
    z.find(".csf #paginatediv2 > a").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    z.find(".csf p > select").each(function() {
        $(this).attr("style", "vertical-align: baseline !important")
    });
    var v = ((f.__isNR || f.__isNM) ? 1 : 0);
    z.find('img[src="csfimages/loader.gif"]').each(function() {
        $(this).attr("src", "" + (with_frame ? f.$_____link_full : "") + "/images/loader-horizontal" + (v ? "_dark" : "") + ".gif").css("margin-left", "10px")
    });
    z.find(".paginationstyle a").each(function() {
        $(this).addClass("btn btn-default")
    });
    z.find('img[src^="lfd_"], img[src^="/csf/lfd_"]').each(function() {
        $(this).parents("table").removeClass("table-striped")
    });
    z.find('img[src^="csfimages/delete.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-unlock text-success" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    z.find('img[src^="csfimages/perm.png"]').each(function() {
        $(this).replaceWith('<i class="fa fa-lock text-danger" style="font-size: 1.1em; vertical-align: middle;"></i>')
    });
    z.find('img[src^="csfimages/plus.png"]').each(function() {
        $(this).addClass("hidden");
        b;
        $(this).after('<i class="fa fa-plus-circle text-success margined-right-2" style="font-size: 1.1em;"></i>')
    });
    z.find('img[src^="csfimages/minus.png"]').each(function() {
        $(this).addClass("hidden");
        $(this).after('<i class="fa fa-minus-circle text-danger margined-right-2" style="font-size: 1.1em;"></i>')
    });
    z.find(".csf fieldset legend b").each(function() {
        if ($(this).text().indexOf("Edit ConfigServer Firewall") >= 0) {
            $submit_changes = z.find('input[value="Change"]');
            $submit_changes.addClass("csf-submit_changes");
            $submit_changes.on("click", function() {
                z.find('input[value="saveconf"]').parent("form").submit()
            })
        }
    });
    typeof __csf__listen_log_grep != "undefined" && clearInterval(__csf__listen_log_grep);
    if (z.find("#CSFgrep_D").length && z.find("#CSFgrep_E").length && z.find("#CSFgrep_i").length) {
        z.find('select, input[type="text"], button[onclick="CSFgrep()"]').removeClass("heighter-34").addClass("heighter-28");
        z.find("#CSFgrep_i, #CSFgrep_E, #CSFgrep_D").attr("style", "vertical-align: middle; margin-right: 4px;");
        z.find("#CSFajax").css("margin-bottom", "4px")
    }
    z.find("#CSFajax.csf-box").addClass("csf_force_log_size");
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

    function M() {
        if (!$("html[data-post]").attr("data-post")) {
            return
        }
        z.find('textarea[name="formdata"]').each(function(Q, R) {
            var d = $(this);
            $parent_width = d.parent("td").width();
            var g = window.CodeMirror.fromTextArea(R, {
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
                theme: ((with_frame && !f.__isNM) ? f.settings_cm_editor_palette : "monokai")
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
            M()
        } else {
            setTimeout(function() {
                if (typeof window.CodeMirror == "function") {
                    M()
                } else {
                    setTimeout(function() {
                        M()
                    }, 60)
                }
            }, 150)
        }
    }, 60);
    if (z.find("h4").text().indexOf("Ports listening for external connections") !== -1) {
        z.find(".container-fluid .panel .panel-body table.table-striped").each(function() {
            z.find("h4").addClass("col_header_custom").attr("style", "margin-bottom: -5px !important; margin-top: 2px !important");
            z.find("h4").text("Ports listening for external connections");
            $(this).dataTable(y)
        });
        q()
    }
    if (z.find(".csf th:eq(1)").text().indexOf("A/D") !== -1 && z.find(".csf th:eq(2)").text().indexOf("IP address") !== -1) {
        z.find('table:not(:contains("©2006-"))').each(function() {
            $.each($('html[data-post="temp"] tr td a.btn'), function(d, g) {
                $(this).attr("data-placement", "right");
                $(this).addClass("btn-xxs");
                if ($(this).hasClass("btn-danger")) {
                    $(this).addClass("margined-right-8")
                }
            });
            $(this).dataTable(y);
            setTimeout(function() {
                z.find(".csf .dataTable thead tr th:eq(0)").css("opacity", "0").css("pointer-events", "none")
            }, 10)
        });
        q();
        $('.dataTables_wrapper + div:contains("There are no temporary IP entries")').remove();
        $('html[data-post="temp"] .dataTables_wrapper + div').find("a").addClass("btn-xxs btn-inverse").removeClass("btn-success").prepend('<i class="fa fa-fw fa-unlock">&nbsp;</i>')
    }
    if ($("html").attr("data-post") === "") {
        z.find('button[value="conf"]').prepend('<i class="fa fa-cog margined-right-5"></i>');
        z.find('button[value="enable"]').addClass("page_footer_submit btn-success").removeClass("btn-default").prepend('<i class="fa fa-toggle-switch fa-1_25x margined-right-5"></i>');
        z.find('button[value="disable"]').addClass("page_footer_submit btn-danger").removeClass("btn-default").prepend('<i class="fa fa-toggle-switch-off fa-1_25x margined-right-5"></i>');
        z.find('button[value="restart"]').addClass("page_footer_submit btn-info").removeClass("btn-default").prepend('<i class="fa fa-circle-o-notch margined-right-5"></i>');
        z.find('button[value="denyf"]').addClass("page_footer_submit btn-warning").removeClass("btn-default").prepend('<i class="fa fa-unlock margined-right-5"></i>')
    }
    $.each(z.find('input[type="radio"]:not(.iawobject), input[type="checkbox"]:not(.iawobject)'), function() {
        if ($("html").attr("data-post") == "conf") {
            return
        }
        if ($(this).is(":checkbox")) {
            if ($(this)[0]) {
                $___text = $(this)[0].nextSibling
            }
            var S = $(this).next('input:not([type="radio"], [type="checkbox"], [type="hidden"]), select, textarea'),
                Q = ($___text && $___text.nodeValue && $.trim($___text.nodeValue).length > 1),
                R = (Q ? $___text.nodeValue : "&nbsp;");
            $(this).addClass("iawobject");
            var d = $(this).attr("id") ? 'for="' + $(this).attr("id") + '"' : false;
            if (d === false && $(this).attr("name") && $(this).val()) {
                var g = "__replaced_" + $(this).attr("name") + "_" + $(this).val() + "";
                var d = 'for="' + g + '"';
                $(this).attr("id", g)
            }
            if ($(this).is(":checkbox")) {
                if ($($___text).length) {
                    $($___text).wrap('<label style="font-weight: 400" class="lawobject" ' + d + ">" + $.trim(R) + " </label>");
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
    var H = $('p:contains("..."):contains("Done")');
    if (H.length || $('html[data-post="logtail"], 									html[data-post="allow"],									html[data-post="deny"],									html[data-post="redirect"],									html[data-post="ignorefiles"],									html[data-post="dirwatch"],									html[data-post="dyndns"],									html[data-post="templates"],									html[data-post="logfiles"],									html[data-post="blocklists"],									html[data-post="syslogusers"]').length) {
        $("#csfreturn").parent("form").parent("div").prev("hr").replaceTagName("br");
        H.remove()
    } else {
        if ($('html[data-post="servercheck"], html[data-post="readme"], html[data-post="viewlogs"], html[data-post="chart"], html[data-post="loggrep"], html[data-post="viewports"], html[data-post="profiles"], html[data-post="status"], html[data-post="sips"], html[data-post="temp"]').length) {
            if ($('html[data-post="temp"]') && $('a[href="index.cgi?action=temprm&ip=all"]').length) {} else {
                $("#csfreturn").parent("form").parent("div").prev("hr").replaceTagName("br")
            }
        }
    }
    var c = $("#csfreturn").length;
    $('#csfreturn, 		   html[data-post="rblcheckedit"] input[value="rblcheck"] + input,		   html[data-post="serverchecksave"] input[value="servercheck"] + input,		   html[data-post="temprm"] input[value="temp"] + input,		   html[data-post="temptoperm"] input[value="temp"] + input		').replaceWith('<button type="submit" class="btn btn-' + (c ? "primary" : "default margined-top-10") + ' page_footer_submit"><i class="fa fa-fw fa-arrow-left">&nbsp;</i> ' + (c ? ($is_lang ? f.lang("theme_xhred_global_return_to_module_index") : "Return to module index") : ($is_lang ? f.lang("theme_xhred_global_return") : "Return")) + "</button>");
    var J = $('html input[value="lfdrestart"] + input, html input[value="restart"] + input, html input[value="restartboth"] + input'),
        P = "Save",
        A = "fa-circle-check";
    if (J.length) {
        P = J.val();
        A = "fa-circle-o-notch"
    }
    $('input[value="Change"],		html:not([data-post=""]) input[value="restartboth"] + input,		html:not([data-post=""]) input[value="lfdrestart"] + input,		html:not([data-post=""]) input[value="restart"] + input		').replaceWith('<button type="submit" class="btn btn-default page_footer_submit' + (J.length ? " __restart" : "") + '"><i class="fa fa-fw ' + A + '">&nbsp;</i> ' + P + "</button>");
    $("body").on("click", ".page_footer_submit:not(.disabled)", function(d) {
        s($(this), [2, -27, "small", 600])
    });
    var K = ".panel-heading font",
        t = "bs-callout",
        e = "" + K + " + .circles",
        L = $("." + t + ":visible");
    if (L.length && !$(e).length) {
        $(K).after('<span class="circles"></span>')
    }
    $.each(L, function() {
        var g = $.trim($(this).attr("class").replace(t, "").replace(t + "-", "").replace("text-center", "").replace("collapse", "")),
            d = $(this).text();
        if (!d) {
            return
        }
        $(e).prepend('<span data-tooltip="tooltip" data-container="body" data-html="true" data-placement="bottom" data-title="' + d + '" class="circle ' + g + '"><i class="fa fa-' + ((g == "warning" || g == "danger") ? "exclamation-circle" : (g == "info" ? "info-circle" : "check-circle")) + '"></i></span>');
        $(this).remove()
    });
    if ($("html").attr("data-post") !== "") {
        var j = z.find(".btn-primary.page_footer_submit");
        if (j.length) {
            z.find(".panel-heading font").before('<a data-tooltip="tooltip" data-container="body" data-html="true" data-placement="auto top" title="' + $.trim($(".page_footer_submit.btn-primary:first").text()) + '"  href="/csf" class="btn btn-link footer_module_index_top"><i class="fa fa-arrow-left"></i></a>');
            $("body").on("click", ".footer_module_index_top", function(d) {
                d.preventDefault();
                $("body").find(".btn.btn-primary.page_footer_submit").before('<input type="submit" class="submit_tmp_index hidden">');
                $(".submit_tmp_index").trigger("click")
            })
        }
    } else {
        var C = z.find('button[value="conf"]'),
            h = C.text();
        conf_row = C.parent("form").parent("td").parent("tr").addClass("hidden").detach(), info_button = z.find('button[value="readme"]'), title_help = info_button.text(), info_row = info_button.parent("td").parent("tr").addClass("hidden").detach();
        $("#csf > table > tbody").append(conf_row);
        z.find(".panel-heading font").before('<div class="btn-group btn-group-csf-home"><a href="/" data-tooltip="tooltip" data-container="body" data-html="true" data-placement="auto top" title="' + ($is_lang ? f.lang("theme_xhred_global_module_config") : "Module config") + '" class="btn btn-link text-lighter ported_module_csf_conf"><i class="fa fa-cog"></i></a><a href="/" data-tooltip="tooltip" data-container="body" data-html="true" data-placement="auto top" title="' + ($is_lang ? f.lang("theme_xhred_global_help") : "Module help") + '" class="btn btn-link text-lighter ported_module_csf_help"><i class="fa fa-question-circle"></i></a></div>');
        $("body").on("click", 'a[href="/"].ported_module_csf_conf', function(d) {
            d.preventDefault();
            C.trigger("click")
        });
        $("#home form table tbody").append(info_row);
        $("body").on("click", 'a[href="/"].ported_module_csf_help', function(d) {
            d.preventDefault();
            info_button.trigger("click")
        })
    }
    setTimeout(function() {
        o(B, f, with_frame);
        $("body").tooltip({
            selector: 'a[data-toggle="tooltip"]',
            container: "body",
            placement: "auto top",
            html: true,
            delay: {
                show: 800,
                hide: 30
            }
        })
    }, 100)
};