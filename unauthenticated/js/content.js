/*!
 * Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
 */
;
charset_warning();
typeof t__wi_p.t___p__xhr_r == "undefined" ? t__wi_p.t___p__xhr_r = 0 : false;
$(window).ajaxStart(function() {
    t__wi_p.t___p__xhr_r = 1;
    if (t__wi_p.t___p__xhr_l === 0) {
        if (settings_loader_top && t__wi_p.$___ajax_requested_url.indexOf("index.cgi/?xhr-info=1") === -1 && ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) === -1 || t__wi_p.$___ajax_requested_url.indexOf("help.cgi") > -1 || t__wi_p.$___ajax_requested_url.indexOf("edit_file.cgi") > -1)) {
            t__wi_p.NProgress.remove();
            t__wi_p.NProgress.start()
        }
    }
}).ajaxStop(function() {
    if (t__wi_p.t___p__xhr_l === 0) {
        if (settings_loader_top && __num() && !t__wi_p.$____loader_block__) {
            t__wi_p.NProgress.done()
        }
        if (t__wi_p.t___p__ll === 1) {
            t__wi_p.__lle()
        }
    }
    t__wi_p.t___p__xhr_r = 0
});
$("body").attr("style", $("body").data("style"));

function _f__table() {
    var a = parseInt($(".tab-pane.active").attr("id").replace(/^\D+/g, ""));
    return window["_f__table" + a]
}

function __r____changed() {
    if ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {
        $(".total_size_data").parent("span").addClass("hidden");
        var a = _f__table().dataTable().$("tr.hl-aw", {
            filter: "applied"
        }).length;
        if (a) {
            __f___ub()
        } else {
            __f___lb()
        }
        $(".total_selected").html(a == 1 ? lang("theme_xhred_filemanager_selected_entry").replace("%value", "<span>1</span>") : lang("theme_xhred_filemanager_selected_entries").replace("%value", "<span>" + a + "</span>"))
    }
}

function __init_ck_(a) {
    CKEDITOR_BASEPATH = "/unauthenticated/js/ckeditor/";
    $.getScript("" + $_____link_full + "/unauthenticated/js/ckeditor/ckeditor.js", function(f, c, d) {
        if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
            CKEDITOR.tools.enableHtml5Elements(document)
        }

        function g() {
            if (CKEDITOR.revision == ("%REV%")) {
                return true
            }
            return !!CKEDITOR.plugins.get("wysiwygarea")
        }
        CKEDITOR.config.height = $(window).height() / a[1];
        CKEDITOR.config.width = "auto";
        CKEDITOR.config.removePlugins = "save, about";
        var k = ((__isNR || __isNM) ? 1 : 0);
        if (k) {
            CKEDITOR.config.contentsCss = ($_____link_full + "/unauthenticated/css/palettes/nightrider_ckeditor_content." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str);
            if (!$('html head link[href*="css/nightrider_ckeditor."]').length) {
                $("html head").append('<link href="' + $_____link_full + "/unauthenticated/css/palettes/nightrider_ckeditor." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
            }
        }
        var h = g();
        var j = CKEDITOR.document.getById(a[0]);
        if (h) {
            var b = $("body").data("language");
            CKEDITOR.replace(a[0], {
                language: (b == "zh" ? "zh-cn" : b)
            })
        } else {
            j.setAttribute("contenteditable", "true");
            CKEDITOR.inline(a[0])
        }
        if (a[2] === true) {
            for (var e in CKEDITOR.instances) {
                CKEDITOR.instances[e].on("change", function(i) {
                    i.removeListener();
                    $("body").attr("data-unload-warning", "1")
                })
            }
        }
        if (a[3] === "edit_web") {
            setTimeout(function() {
                $("hr + b").removeClass("hidden");
                $(".__tmp__spinner").remove()
            }, 100)
        }
    })
}
$.each($('tr td:last-child a:contains("..")'), function() {
    if ($current_page_full == $_____link_full + "/virtual-server/list_databases.cgi") {
        $(this).html($(this).text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("ui_link")
    }
});

function __init_dt_(f, e, a, d) {
    typeof e == "undefined" ? e = false : false;
    typeof a == "undefined" ? a = false : false;
    typeof d == "undefined" ? d = false : false;
    if (is__mf("virtual-server", "index.cgi")) {
        e = true
    }
    $.fn.dataTableExt.sErrMode = "throw";

    function b(g) {
        g.DataTable({
            order: [],
            aaSorting: [],
            bDestroy: true,
            bPaginate: false,
            columnDefs: [d],
            bInfo: false,
            bStateSave: e,
            destroy: true,
            dom: (a ? "Rlfrtip" : "f"),
            oLanguage: {
                sEmptyTable: lang("theme_xhred_datatable_semptytable"),
                sInfo: lang("theme_xhred_datatable_sinfo"),
                sInfoEmpty: lang("theme_xhred_datatable_sinfoempty"),
                sLengthMenu: lang("theme_xhred_datatable_slengthmenu"),
                sLoadingRecords: lang("theme_xhred_datatable_sloadingrecords"),
                sProcessing: lang("theme_xhred_datatable_sprocessing"),
                sSearch: " ",
                sZeroRecords: lang("theme_xhred_datatable_szerorecords")
            },
            initComplete: function(h) {
                $(".dataTables_filter").find('input[type="search"]').attr("placeholder", lang("theme_xhred_datatable_filter"))
            }
        })
    }
    if (is__mf("virtual-server", "list_users.cgi")) {
        var c = $(".table thead tr th").filter(function() {
            return $(this).text().match(/Last login|Dernière Connexion|Siste innlogging|Letzer Login|Laatste login/)
        }).index();
        if (c > -1) {
            $.each(f.find("tbody tr td:nth-child(" + (c + 1) + ")"), function(h, i) {
                var g = $(this).text();
                if (/Never|Jamais|Aldri|Niemals|Nigdy|Nooit/i.test(g)) {
                    g = 0
                }
                $(this).attr("data-sort", g)
            }).promise().done(function() {
                b(f)
            })
        } else {
            b(f)
        }
    } else {
        b(f)
    }
}

function f__gc() {
    return t__wi_p.$("#favorites-menu .favorites-menu-content li:not(.exclude)").length
}

function f__g() {
    var b = [];
    $.each(t__wi_p.$("#favorites-menu .favorites-menu-content li:not(.exclude) a"), function() {
        var e = $(this).text(),
            f = $(this).attr("href"),
            a = $(this).find(".wbm-sm").attr("data-product");
        favorite = {};
        favorite.link = f;
        favorite.title = e.trim();
        favorite.icon = (a == "virtualmin" ? (a + "") : a);
        b.push(favorite)
    });
    return b
}

function f__s__init() {
    var a = "#favorites-menu > div > nav > ul";
    if (typeof t__wi_p.sortable != "function" || !t__wi_p.$("#favorites-menu > div > nav > ul").length) {
        return
    }
    t__wi_p.sortable(a, {
        items: ":not(.favorites-title)",
        forcePlaceholderSize: false
    }).on("sortupdate", function() {
        f__u()
    })
}

function f__u() {
    $.ajax({
        type: "POST",
        url: $_____link_full + "/settings-favorites_save.cgi",
        data: {
            favorites: ('{"favorites":' + JSON.stringify(f__g(), null, 4).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f") + "}")
        },
        success: function(b) {
            t__wi_p.fetch_right_pane_favorites()
        },
        error: function(b) {}
    });
    t__wi_p.sortable("#favorites-menu > div > nav > ul")
}

function f__a(d, f, e) {
    if (f__gc() === 0) {
        t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-no-message").addClass("hidden");
        t__wi_p.$("#favorites-menu .favorites-menu-content .favorites-title sup a").removeClass("hidden")
    }
    t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-title").after('						<li class="menu-exclude" draggable="true">                        	<a class="menu-exclude-link" target="page" href="' + d + '"><i data-product="' + e + '" class="wbm-' + e + "" + (e == "virtualmin" ? "" : "") + ' wbm-sm">&nbsp;</i><span class="f__c">                            ' + f + '                        	&nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px"><i class="fa fa-fw fa-times"></i></small></span></a>                    	</li>					')
}

function f__us() {
    if (f__gc() === 0) {
        t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-no-message").removeClass("hidden");
        t__wi_p.$("#favorites-menu .favorites-menu-content .favorites-title sup a").addClass("hidden")
    }
}

function f__r(b) {
    t__wi_p.$("#favorites-menu .favorites-menu-content").find('a[href="' + b + '"]').parent("li").remove();
    $("#headln2c > .favorites").addClass("fa-star-o").removeClass("fa-star text-warning");
    f__us();
    f__u()
}

function f__dt() {
    $(f__g()).each(function() {
        if ($(this)[0]) {
            var b = URI(t___wi.location).resource();
            if ($(this)[0].link == b || $(this)[0].link + "index.cgi" == b) {
                setTimeout(function() {
                    $("#headln2c > .favorites").addClass("fa-star").removeClass("fa-star-o")
                }, 100);
                return false
            } else {
                setTimeout(function() {
                    $("#headln2c > .favorites").removeClass("fa-star").addClass("fa-star-o")
                }, 100)
            }
        }
    })
}
f__dt();
if (access_level() == 0 && $g__v__nav) {
    $("#headln2c").prepend('<i class="fa fa-fw fa-inverse fa-2x fa-star-o text-lighter favorites" style="position: absolute; margin-left: -35px; margin-top: 4px;"></i>&nbsp;');
    $("body").append('<span id="favorites-target" style="position: absolute; top: 0; right: 0; visibility: hidden"></span>')
}
$("body").on("click", "#headln2c > .favorites", function(m) {
    m.preventDefault();
    var k = URI(t___wi.location).resource();
    if ($(this).hasClass("fa-star-o")) {
        $(this).removeClass("fa-star-o").addClass("fa-star text-warning");
        var j = $("#headln2c > font").text(),
            n = t__wi_p.$(".has-sub.active").text().trim(),
            e = t__wi_p.$(".sub_active").text().trim(),
            i = "",
            l = "";
        if (product_name() === "Virtualmin" || product_name() === "Cloudmin") {
            i = t__wi_p.$(".ui_select option:selected").text()
        }
        if ($('body[class^="' + $g__o__f_m + '"]').length) {
            l = URI.parseQuery(URI(t___wi.location).query())["path"];
            if (!l) {
                l = "[/]"
            } else {
                l = "[" + l + "]"
            }
        }
        f__a(k, (((i.length ? (i + " - ") : "") + (n.length ? (n + "/") : "") + (e.length ? (e + ": ") : "")) + j.trim() + (l.length ? (" " + l) : "")), (product_name() === "Virtualmin" ? "virtualmin" : product_name() === "Cloudmin" ? "cloudmin" : "webmin"));
        f__u()
    } else {
        $(this).addClass("fa-star-o").removeClass("fa-star text-warning");
        f__r(k)
    }
});
t__wi_p.$___________initial === 1 && f__s__init();
t__wi_p.$("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function() {
    $(this).find("small").removeClass("hidden")
}).on("mouseleave", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function() {
    $(this).find("small").addClass("hidden")
});
t__wi_p.$("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) small", function() {
    $(this).find(".fa-times").removeClass("fa-times").addClass("fa-times-circle");
    $(this).animate({
        "font-size": "0.7em",
        "margin-top": "-2px",
        "margin-left": "-1px"
    }, 160)
}).on("mouseleave", "li:not(.exclude) small", function() {
    $(this).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-times");
    $(this).animate({
        "font-size": "0.6em",
        "margin-top": "-1px",
        "margin-left": "0"
    }, 80)
});
t__wi_p.$("#favorites-menu .favorites-menu-content").on("click", "li:not(.exclude) small .fa-times-circle", function(b) {
    b.preventDefault();
    b.stopPropagation();
    f__r($(this).parents("a").attr("href"))
});
$(document).on("keydown", function(b) {
    if (t__wi_p.$(".favorites-menu-outer").css("left") == "0px" && b.keyCode == 27) {
        t__wi_p.$(".favorites-menu-outer").removeClass("hover")
    }
});
f__us();

function l__res_fi() {
    $(".btn-filter-top-right .dataTable-mirror").val("").trigger("keyup");
    $(".btn-filter-top-right input").is(":visible") && $(".btn-filter-top-right input").trigger("blur")
}

function l__ck_fi() {
    if (($(".nav.nav-tabs").length && $(".active .dataTables_filter").length) || (!$(".nav.nav-tabs").length && $(".dataTables_filter").length)) {
        $(".btn-filter-top-right").show()
    } else {
        $(".btn-filter-top-right").hide()
    }
}

function f__mgk_sp(n, k, j, l) {
    var e = (((n.attr("onclick") && n.attr("onclick").indexOf("blank") !== -1) || (n.parents("form").attr("target") && n.parents("form").attr("target").indexOf("blank") !== -1)) ? true : false),
        b = n.hasClass("heighter-28"),
        c = n.css("height") == "28px",
        g = n.hasClass("btn-lg"),
        f = is__m("server-manager") ? 2 : 0,
        m = n.find(".fa").hasClass("fa-1_25x"),
        d = n.find(".fa"),
        h = ((typeof k == "undefined" || k == false) ? false : k),
        i = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (h ? h[0] + "px" : (((b || c) && (!m && !g)) ? (-0.5 + f) + "px" : m ? "1.6px" : g ? "1.5px" : "0")) + " !important; margin-left: " + (h ? h[1] + "px" : (((b || c) && (!m && !g)) ? "-23.5px" : g ? "-28px" : (!b && !c && m) ? "-27.5px" : "-25.5px")) + ' !important;"><span class="cspinner-icon white ' + (h ? (h[2] ? h[2] : "") : (b || c ? "smaller" : "small")) + '"></span></span></span>',
        a = '<span class="cspinner_container" style="position: absolute; width: 18px; height: 14px; display: inline-block;"><span class="cspinner" style="margin-top: ' + (h ? h[0] + "px" : (((b || c) && (!m && !g)) ? (-0.5 + f) + "px" : m ? "1.6px" : g ? "1.5px" : "0")) + " !important; margin-left: " + (h ? h[1] + "px" : (((b || c) && (!m && !g)) ? "-23.5px" : g ? "-28px" : (!b && !c && m) ? "-27.5px" : "-25.5px")) + '  !important;"><span class="cspinner-icon dark ' + (h ? (h[2] ? h[2] : "") : (b || c ? "smaller" : "small")) + '"></span></span></span>';
    !e && n.addClass("disabled");
    if (d.length && !e) {
        if (n.hasClass("btn-default")) {
            d.addClass("invisible").after(a)
        } else {
            d.addClass("invisible").after(i)
        }
    }
    typeof j == "undefind" ? j = false : false;
    typeof l == "undefind" ? l = false : false;
    if (h[3] || j) {
        setTimeout(function() {
            n.removeClass("disabled");
            d.removeClass("invisible");
            n.find(".cspinner_container").remove()
        }, (j ? j : h[3]))
    }
    if (l) {
        setTimeout(function() {
            __lre()
        }, 2)
    }
}

function f__mgk_fi() {
    if ($(".dataTables_filter").length) {
        setTimeout(function() {
            $("#headln2r .btn-group a").addClass("pull-left").attr("style", "");
            $("#headln2r .btn-group").prepend('				<a class="btn btn-link text-lighter btn-filter-top-right text-decoration-none pull-left" data-placement="auto top" data-toggle="tooltip" data-title="' + lang("theme_xhred_datatable_filter") + '" data-container="body">					<label>						<input type="text" class="dataTable-mirror" placeholder="' + lang("theme_xhred_datatable_filter") + '">					</label>					<i class="fa fa-filter"></i>				</a>			');
            if ($(".nav.nav-tabs").length) {
                $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function(b) {
                    var c = $(b.target).parent(".active");
                    if (c.data("filter-value")) {
                        $(".dataTable-mirror").val(c.data("filter-value")).trigger("keyup")
                    } else {
                        $(".dataTable-mirror").val("").trigger("keyup")
                    }
                    l__ck_fi()
                })
            }
            var a = $(".dataTables_filter");
            a.hide();
            $(".btn-filter-top-right").click(function(b) {
                !$(b.target).is("input") && $(this).find("label").slideToggle(300, function() {
                    $(this).find("input").focus()
                })
            });
            $(".dataTable-mirror").keyup(function(b) {
                if ($(".nav.nav-tabs").length) {
                    $(".nav-tabs li.active").data("filter-value", $(this).val());
                    $(".active .dataTables_filter input").val($(this).val()).trigger("keyup")
                } else {
                    $(".dataTables_filter input").val($(this).val()).trigger("keyup")
                }
                if ($.trim($(this).val()).length > 0) {
                    $(".btn-filter-top-right i").addClass("text-danger")
                } else {
                    $(".btn-filter-top-right i").removeClass("text-danger")
                }
            });
            $(".btn-filter-top-right input").blur(function(b) {
                $(this).parent("label").slideToggle(0)
            });
            l__ck_fi()
        }, 0)
    }
}

function datePicker(p, n, o, m) {
    var d = $(n).find("option:eq(0)").val() == 1 ? 0 : 1;
    var e = $(m),
        l = parseInt($(p).val()),
        q = ($(n).val() ? parseInt($(n).val()) + d : false),
        i = $(o).val();
    e.datepicker({
        format: " yyyy-m-d",
        language: $("body").data("language"),
        autoclose: true
    }).on("hide", function(a) {
        var b = e.val() ? e.val().split("-") : false;
        e.val("");
        if (b) {
            $(p).val(parseInt(b[2]));
            $(n).val(parseInt(b[1]) - d);
            $(o).val(parseInt(b[0]))
        }
    }).focus()
}
var $product_name = t__wi_p.$("#wrapper").data("product");
$('body:not(".mobile-menu-toggler")').on("click", function(b) {
    t__wi_p.hide_mobile_menu();
    if (t__wi_p.$(".autocomplete-suggestions").is(":visible")) {}
});
if (t__wi_p.$(".switch-toggle").find('label[for="open_thirdlane"]').length) {
    t__wi_p.$('.switch-toggle input:not([id="open_webmin"])').each(function() {
        $(this).removeAttr("checked")
    }).promise().done(function() {
        t__wi_p.$("#open_webmin").prop("checked", true)
    })
}
if (__num()) {
    if ($current_directory == $_____link + "init/") {
        $("table.table tbody tr").addClass("ui_checked_columns")
    }

    function __mr() {
        var a = ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1);
        if (a) {
            return
        }
        $.each($(".ui_checked_columns"), function(b, e) {
            if ($(e).find("a[href]") && !$("body").hasClass("servers") && !$(this).hasClass("selectable")) {
                $(e).addClass("cursor-pointer").find("td").addClass("cursor-pointer").find("label").addClass("cursor-pointer").find("tt").addClass("cursor-pointer")
            }
            $(e).find("td:not(.selectable)").click(function(d) {
                if ($(d.target).is(".awobject, .iawobject, .lawobject, .awcheckbox, .awradio")) {
                    return
                }
                if ($(e).find("a[href]") && !$("body").hasClass("servers")) {
                    var c = $(e).find("a[href]")[0],
                        h = $(this).parents("tr.ui_checked_columns"),
                        f = $(d.target).find('input[type="checkbox"]:not(":disabled")'),
                        g = f.length;
                    g && f.trigger("click");
                    if (c && ($(this).find("a").attr("href") === $(c).attr("href") || $(this).find("a").attr("href") === undefined) && !$(d.target).is("select, input, .awobject, .iawobject, .lawobject, .awcheckbox, .awradio") && ($(this).parent("tr").find('a[href*="download.cgi"]').length === 0)) {
                        d.preventDefault();
                        if ($(c).attr("target")) {
                            !g && window.open($(c).attr("href"), $(c).attr("target"))
                        } else {
                            window.location.href = $(c).attr("href")
                        }
                    }
                }
            });
            $(e).find("td").contextmenu(function(c) {
                var d = $(this).parents("tr.ui_checked_columns");
                c.preventDefault();
                if (($(this).parents("tr").find('input[type="checkbox"]:first').length && $(this).parents("tr").find('input[type="checkbox"][disabled]').length === 0) || ($(this).parents("tr").find('input[type="checkbox"][disabled]').length && $(this).parents("tr").find("input").length > 1)) {
                    if (d.find('input[type="checkbox"]:first').is(":checked")) {
                        d.removeClass("hl-aw");
                        __r____changed()
                    } else {
                        d.addClass("hl-aw");
                        __r____changed()
                    }
                    d.find('input[type="checkbox"]:first').trigger("click")
                }
            })
        })
    }
    __mr();

    function __mcr() {
        $.each($('input[type="radio"]:not(.iawobject), input[type="checkbox"]:not(.iawobject)'), function() {
            if ($(this)[0]) {
                $___text = $(this)[0].nextSibling
            }
            var e = $(this).next('input:not([type="radio"], [type="checkbox"], [type="hidden"]), select, textarea'),
                k = ($___text && $___text.nodeValue && $.trim($___text.nodeValue).length > 1),
                d = (k ? $___text.nodeValue : "&nbsp;"),
                j = $(this).attr("type").toLowerCase();
            if ($(this).next("label").length === 0 && e.length === 0 && k) {
                $(this).addClass("iawobject");
                var g = $(this).attr("id") ? 'for="' + $(this).attr("id") + '"' : false;
                if (g === false && $(this).attr("name") && $(this).val()) {
                    var h = "__replaced_" + $(this).attr("name") + "_" + $(this).val() + "";
                    var g = 'for="' + h + '"';
                    $(this).attr("id", h)
                }
                $($___text).wrap('<label class="lawobject" ' + g + ">" + d.replace(/<hr>/g, "&lt;hr&gt;").replace(/<header>/g, "&lt;header&gt;") + " </label>");
                $($___text).remove();
                $(this).next("label").addBack().wrapAll('<span class="aw' + j + ' awobject awobjectm"></span>')
            } else {
                if (e.length === 0 && $(this).next("label").length === 0 && $(this).prev("label").length === 1 && !k) {
                    var c = $(this).prev("label"),
                        f = c.text();
                    $(this).addClass("iawobject");
                    if (!$(this).attr("id") && !$("#" + $(this).attr("name")).length) {
                        $(this).attr("id", $(this).attr("name"))
                    }
                    $(this).after('<label class="lawobject" for="' + escape_html($(this).attr("name")) + '-aur0">' + f + "</label>");
                    $(this).next("label").addBack().wrapAll('<span class="aw' + j + ' awobject awobjectm"></span>');
                    $(this).attr("id", $(this).attr("name") + "-aur0").removeClass("form-control").css("width", "initial");
                    c.remove()
                } else {
                    if (e.length === 0 && $(this).next("label").length === 0 && !k) {
                        $(this).addClass("iawobject");
                        var i = $(this).attr("name");
                        if (i) {
                            i = $(this).attr("name").replace(".", "").replace("%", "")
                        }
                        if (!$(this).attr("id") && !$("#" + i).length) {
                            $(this).attr("id", i)
                        }
                        $(this).after('<label class="lawobject" for="' + escape_html($(this).attr("id") ? $(this).attr("id") : $(this).attr("name")) + '">&nbsp;</label>');
                        $(this).next("label").addBack().wrapAll('<span class="aw' + j + ' awobject awobjectm"></span>')
                    }
                }
            }
            if (e.length === 1 && $(this).next("label").length === 0) {
                $(this).addClass("iawobject");
                if (!$("#" + e.attr("name")).length) {
                    $(this).attr("id", e.attr("name"))
                } else {
                    if (!$("#" + e.attr("name")).length) {
                        e.attr("id", e.attr("name"))
                    }
                }
                $(this).after('<label class="lawobject" for="' + escape_html((d ? $(this).attr("id") : e.attr("name"))) + '">' + d + "</label>");
                $(this).next("label").addBack().wrapAll('<span class="aw' + j + ' awobject awobjectm"></span>');
                k && $($___text).remove()
            }
        })
    }
    __mcr();
    var $onLoad_checkBox = $('.ui_checked_columns td.ui_checked_checkbox input[type="checkbox"]:checked:not(disabled)').parents("tr.ui_checked_columns").addClass("hl-aw");
    $("body").on("change", 'input[type="checkbox"], input[type="radio"]', function(b) {
        var c = $(this).parents("tr.ui_checked_columns");
        if (c.length && c.find("input:first").is($(this))) {
            if ($(this).is(":checked")) {
                c.addClass("hl-aw");
                __r____changed()
            } else {
                c.removeClass("hl-aw");
                __r____changed()
            }
        }
    });
    $("body").on("click", ".ui_link, .ui_link_replaced", function() {
        $.each($('input[type="checkbox"]'), function() {
            if ($(this).is(":checked")) {
                $(this).parents("tr.ui_checked_columns").addClass("hl-aw");
                __r____changed()
            } else {
                $(this).parents("tr.ui_checked_columns").removeClass("hl-aw");
                __r____changed()
            }
        })
    })
}
if ($("body").hasClass("servers")) {
    $('form[action="delete_servs.cgi"] a.icon_link, form[action="delete_servs.cgi"] a.ui_link, form[action="delete_servs.cgi"] .col-xs-1').on("click", function(e) {
        if ($(e.target).is(".gl-icon-select")) {
            return
        }
        var g = $__source_url + $(this).attr("href"),
            f = $(this).attr("href"),
            h = $(this);
        if ((f && f.indexOf("edit_serv.cgi") > -1) || (f && f.indexOf("logout.cgi") > -1)) {
            t___wi.location.href = f
        } else {
            if (f && f.indexOf("://") === -1) {
                t___wi.open(g)
            } else {
                t___wi.open(f)
            }
        }
        e.preventDefault();
        e.stopPropagation()
    })
}
if ($current_page_full == $_____link_full + "/apache/edit_global.cgi" || $current_page_full == $_____link_full + "/apache/edit_virt.cgi" || $current_page_full == $_____link_full + "/apache/edit_dir.cgi") {
    $.each($(".ui_opt_textbox.form-control"), function() {
        if ($(this).parent("span").next("button.btn.btn-default.file_chooser_button").length > 0) {
            $(this).css("margin-right", "4px")
        }
    })
}
if ($(".opener_container").length) {
    $.each($(".opener_container"), function() {
        if ($(this).find(".opener_shown").is(":visible")) {
            $(this).parent("tr").prev("tr").find("td a:nth-child(1)").addClass("opener_container_opened").removeClass("opener_container_closed")
        }
    })
}

function hidden_opener(c, d) {
    if ($("#" + c).parent(".opener_container").length === 0) {
        $("#" + c).wrapAll('<div class="opener_container opener_sub_container margined-top"></div>')
    }
    if ($("#" + c).hasClass("opener_shown")) {
        $("#" + c).parent(".opener_container").prev(".opener_extra_container.opener_extra_container_style").find(".opener_extra_container_a_style").removeClass("opener_container_opened").addClass("opener_container_closed");
        $("#" + c).parent(".opener_container").prev("p").find(".opener_extra_container_a_style").removeClass("opener_container_opened").addClass("opener_container_closed");
        $("#" + c).parent(".opener_container").parent("tr").prev("tr").find("td a:nth-child(1)").removeClass("opener_container_opened").addClass("opener_container_closed");
        $("#" + c).parent(".opener_container").show().find("#" + c).slideUp($settings_animation_tabs_slide_time, function() {
            $("#" + c).removeClass("opener_shown").addClass("opener_hidden").parent('.opener_container:not(".opener_sub_container")').hide();
            $("#" + c).parent(".opener_sub_container").removeClass("margined-top")
        })
    } else {
        $("#" + c).parent(".opener_container").prev(".opener_extra_container.opener_extra_container_style").find(".opener_extra_container_a_style").addClass("opener_container_opened").removeClass("opener_container_closed");
        $("#" + c).parent(".opener_container").prev("p").find(".opener_extra_container_a_style").addClass("opener_container_opened").removeClass("opener_container_closed");
        $("#" + c).parent(".opener_container").parent("tr").prev("tr").find("td a:nth-child(1)").addClass("opener_container_opened").removeClass("opener_container_closed");
        $("#" + c).slideUp(0).removeClass("opener_hidden").addClass("opener_shown").parent(".opener_container").slideDown($settings_animation_tabs_slide_time).find(".opener_shown").slideDown($settings_animation_tabs_slide_time);
        $("#" + c).parent(".opener_sub_container").addClass("margined-top")
    }
}
if ($(".opener_shown").length > 0) {
    if ($(".opener_trigger").length > 0) {
        $(".panel-body  .ui_form .table  tbody  tr").removeClass("thead");
        $(".opener_trigger").parents("table.table").addClass("opener_table_style");
        $(".opener_trigger").parents("tr").addClass("_c__op_r").attr("style", "border: 0 !important");
        $(".opener_trigger").parent("td").addClass("_c__op_d");
        $(".opener_trigger").parent("td").find("a").addClass("link_hover_effect link_hover_effect_style_extra")
    }
}
if ($('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').length > 0) {
    $('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').each(function(e, g) {
        var d = (($current_page_full == $_____link_full + "/virtual-server/backup_form.cgi" && $__source_url && $__source_url.indexOf("?sched=") > -1) ? true : false);
        $(this).find("img").length > 0 ? $(this).remove() : false;
        $(this).css("border-bottom", "0");
        $(this).parents("table.table").addClass("opener_table_style_small");
        $(this).parent("td").addClass("opener_table_cell_style_small");
        if (!d) {
            $(this).parent("td").addClass("opener_table_cell_style_small opener_table_cell_style_small_exclusion_border_top")
        }
        $(this).parent("td").find("a").addClass("link_hover_effect link_hover_effect_style");
        if ($(this).parent().is(".panel-body") || $(this).parent().is(".ui_form")) {
            var h = $(this),
                c = h.parent().is(".panel-body") ? ".panel-body" : ".ui_form";
            h.parent(c).find('a[href^="javascript:hidden_opener"]:eq(1)').wrapAll('<div class="opener_extra_container"></div>');
            if (is__mf("bind8", "edit_zonekey.cgi")) {
                h.parent(c).find('a[href^="javascript:hidden_opener"]:eq(' + (e + 1) + ")").wrapAll('<div class="opener_extra_container"></div>')
            }
            h.parent('.panel-body > a[href^="javascript:hidden_opener"]:first-child').remove();
            var f = h.parent(c).find(".opener_extra_container");
            $(f).next("br").remove();
            $(f).addClass("opener_extra_container_style");
            $(f).find("a").addClass("opener_extra_container_a_style link_hover_effect");
            $(f).next(".opener_hidden").attr("style", "padding:8px")
        }
    });
    $.each($(".opener_hidden"), function() {
        $(this).css("display", "none")
    })
}
$("a.opener_trigger").each(function() {
    $(this).parent("td").css("text-align", "left")
});
$('form[action*="seen_newfeatures.cgi"]').each(function() {
    $(this).parents("table.table-striped").next(".ui_form_end_buttons").css("margin-top", "14px")
});
$("body").on("submit", 'form[action*="seen_newfeatures.cgi"]', function(b) {
    b.preventDefault();
    $this = $(this);
    $.ajax({
        type: "GET",
        url: $(this).attr("action"),
        data: false,
        statusCode: {
            200: function() {
                $this.parents(".panel.panel-default").remove()
            }
        }
    })
});
$(t__wi_p.$('iframe[name="page"]').contents()).keydown(function(b) {
    if (t__wi_p.$(".-shell-port-").hasClass("opened")) {
        b.preventDefault();
        b.stopPropagation();
        return
    }
    t__wi_p.search_control(b);
    t__wi_p.shortcut_control(b)
});
$("body").on("click", '.authentic_update:not([data-git="0"]):not(.disabled)', function(b) {
    b.preventDefault();
    b.stopPropagation();
    var c = $(this),
        e = $("body").add(t__wi_p.$("body")),
        d = c.data("stable") == "1" ? "-release" : "-beta";
    e.addClass("pointer-events-none");
    $("body").attr("data-unload-warning", "1");
    t__wi_p.NProgress.start();
    t__wi_p.$("#wrapper").addClass("bg-filter-blur-grayscale-opacity50");
    messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + lang("theme_xhred_git_patch_initiated") + " " + lang("theme_xhred_global_please_wait") + '&nbsp;&nbsp;&nbsp;<span class="cspinner"><span class="cspinner-icon white smallest margined-top-4"></span></span>', 1800, "info", "themeUpgrade", 0);
    $.ajax({
        type: "POST",
        url: $_____link_full + "/index.cgi?xhr-update=1&xhr-update-type=" + d + "",
        data: false,
        dataType: "json",
        success: function(a) {
            if (a[0] && a[0].success) {
                messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + a[0].success, 4, "success", "themeUpgrade");
                setTimeout(function() {
                    t___wi.top.location.reload()
                }, 2000)
            } else {
                if (a[0] && a[0].no_git) {
                    messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + a[0].no_git, 20, "warning", "themeUpgrade");
                    t__wi_p.$("#wrapper").removeClass("bg-filter-blur-grayscale-opacity50");
                    e.removeClass("pointer-events-none")
                } else {
                    messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + lang("theme_xhred_git_patch_update"), 20, "error", "themeUpgrade");
                    t__wi_p.$("#wrapper").removeClass("bg-filter-blur-grayscale-opacity50");
                    e.removeClass("pointer-events-none")
                }
            }
        },
        error: function(a) {
            messenger('<i class="fa fa-lg fa-fw fa-git-pull"></i>' + lang("theme_xhred_git_patch_update"), 20, "error", "themeUpgrade");
            t__wi_p.$("#wrapper").removeClass("bg-filter-blur-grayscale-opacity50");
            e.removeClass("pointer-events-none")
        },
        complete: function(a) {
            t__wi_p.NProgress.done();
            $("body").removeAttr("data-unload-warning")
        }
    })
});
$("body").on("click", '.authentic_update:not([data-git="1"])', function(b) {
    b.preventDefault();
    b.stopPropagation();
    t__wi_p.history.pushState(null, null, $_____link_full + "/?updating-webmin-theme");
    t__wi_p.$('iframe[name="page"]').attr("src", $(this).attr("href"))
});
$("body").on("click contextmenu", 'a[data-href*="/webmin/edit_webmincron.cgi"], a[data-href*="/package-updates/index.cgi"]', function(b) {
    b.preventDefault();
    b.stopPropagation();
    if ($(this).attr("data-refresh").indexOf("package-updates") !== -1) {
        t__wi_p.history.pushState(null, null, $_____link_full + "/?recollecting")
    } else {
        t__wi_p.history.pushState(null, null, $_____link_full + "/?recollect")
    }
    t__wi_p.$('iframe[name="page"]').attr("src", $(this).attr("data-href"))
});
$("#tall_0").before("<br>");
$(".opener_container").each(function(d, c) {
    if ($(this).find("div").hasClass("opener_hidden")) {
        $(this).hide()
    } else {
        $(this).show()
    }
});
$("body").tooltip({
    selector: '[data-toggle="tooltip"], [data-toggle="virtualmin-license"], .panel-body td a',
    container: "body",
    placement: "auto top",
    html: true,
    delay: {
        show: 800,
        hide: 30
    }
});
$.each($("div.barchart"), function() {
    var d = $(this).find('img[src*="red.gif"]'),
        c = $(this).parent("td").contents().filter(function() {
            return this.nodeType == 3
        }).text();
    if (d && d.attr("width")) {
        $(this).parent("td").html('<div class="graph-container graph-container-fw"><div class="graph"><div class="description"> ' + c + ' </div><strong class="bar" style="width:' + d.attr("width") + '">' + d.attr("width") + "</strong></div></div>")
    }
});
$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody > tr").css("border", "none").parents("table").css("margin-top", "20px");
$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody").css("border", "none");
$('.ui_grid_table > tbody > tr.ui_grid_row > td:has(button[type="submit"])').parents("table.ui_grid_table").css("border", "none");
$("form.ui_form > table label.radio, form.ui_form > table label.checkbox").each(function() {
    var h = $(this),
        g = h.find("i.fa"),
        e = h.find("i.fa").text().trim(),
        f = h.text().trim();
    if (e.length === 0 && f.length === 0) {
        g.parent("label").remove()
    }
});
if ($current_page_full && ($current_page_full.indexOf("/webmin/edit_themes.cgi") > -1 || $source_path == $_____link + "settings-user.cgi") && t__wi_p.location.search != "?updating-webmin-theme") {
    if ($source_path == $_____link + "settings-user.cgi") {
        t__wi_p.__cms()
    }
    $("body").on("change", 'form[action*="settings.cgi"] select, form[action*="save_config.cgi"] select, form[action*="settings.cgi"] input, form[action*="save_config.cgi"] input', function(a) {
        var b = $(this).val();
        if (b == "true" || b == "false") {
            if (b == "true") {
                var d = true
            } else {
                if (b == "false") {
                    var d = false
                }
            }
        } else {
            var d = b
        }
        window[$(this).attr("name")] = d;
        t__wi_p[$(this).attr("name")] = d;
        if (a.originalEvent !== undefined) {
            if ((t__wi_p.$___________initial && $__source_file !== "settings-user.cgi")) {
                t__wi_p.$___________initial = 0
            } else {
                at__s_s__b(1)
            }
        }
    });
    $("body").on("keydown", 'form[action*="settings.cgi"] input, form[action*="save_config.cgi"] input', function(a) {
        if (a.originalEvent !== undefined) {
            at__s_s__b(1)
        }
    });
    if ($source_path == $_____link + "settings-user.cgi") {
        $('button[type="button"][name="save_user"]').on("click", function(a) {
            a.preventDefault();
            a.stopPropagation();
            t__wi_p.$___ajax_requested_url = "_blank";
            t__wi_p.manageConfig("save");
            t__wi_p.__lls();
            f__mgk_sp($(this), [-0.5, -25, "small", 750]);
            setTimeout(function() {
                t__wi_p.f__l_reload()
            }, 1400)
        })
    }
    $(function() {
        function b() {
            $("body").on("click", "#atrestore:not(.disabled)", function() {
                $(this).off();
                var a = $(this);
                if (!a.hasClass("btn-inverse")) {
                    setTimeout(function() {
                        f__mgk_sp(a, [1.5, -33, "small", false]);
                        var d = $(".ui_form").serialize();
                        $.ajax({
                            type: "POST",
                            url: $_____link_full + "/index.cgi?xhr-settings=1&restore=1",
                            data: d,
                            success: function(c) {
                                t___wi.top.location.reload()
                            },
                            error: function(c) {
                                a.addClass("btn-danger").removeClass("btn-default btn-inverse opacity-0_5")
                            }
                        })
                    }, 0)
                }
            })
        }
        if (is_module("webmin")) {
            $(".nav.nav-tabs").prepend('<li><a data-toggle="tab" href="#atsettings"><span class="cspinner" style="position: relative"><span class="cspinner-icon" style="width:12px; height:12px; "></span></span></a></li>');
            $(".tab-pane").first().before('<div id="atsettings" class="tab-pane text-center"><span class="cspinner" style="margin-top:18px; position: relative"><span class="cspinner-icon"></span></span></div>');
            $('.nav-tabs a[href="#atsettings"]').tab("show")
        } else {}
        $.ajax({
            type: "GET",
            url: $_____link_full + "/index.cgi/?xhr-settings=1",
            data: false,
            dataType: "text",
            success: function(k) {
                $("#atsettings").html(k);
                var n = $("div#atsettings").find(".ui_form");
                $__theme_text_right_save = n.data("text-save");
                $__theme_text_right_saved = n.data("text-settings_right_saved");
                $__theme_text_right_saving = n.data("text-settings_right_saving");
                $__theme_text_right_restore_defaults = n.data("text-settings_right_restore_defaults");
                $__theme_text_right_restored = n.data("text-settings_right_restored");
                $__theme_text_right_restoring = n.data("text-settings_right_restoring");
                $__theme_text_right_error = n.data("text-error");
                $('.nav-tabs a[href="#atsettings"]').text(n.data("text-current_theme"));
                $("div#atsettings").removeClass("text-center");
                b();
                settings_update();
                var m = $("body").find(".fa.fa-sub-title").parent("span");
                $(m).next("br").remove();
                $(m).next("div.smaller").attr("style", "margin-top: -15px !important");
                m.remove();

                function e(c) {
                    typeof c == "undefined" ? c = $('input[name="settings_right_hide_table_icons"]:checked') : false;
                    var f = ["settings_right_small_table_icons", "settings_right_animate_table_icons", "settings_right_grayscaled_table_icons"];
                    if (c.val() == "true") {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", true);
                            $('input[name="' + h + '"]').parent(".aradio").addClass("disabled")
                        })
                    } else {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", false);
                            $('input[name="' + h + '"]').parent(".aradio").removeClass("disabled")
                        })
                    }
                }
                e();
                $('input[name="settings_right_hide_table_icons"]').on("change", function() {
                    e($(this))
                });

                function i(c) {
                    typeof c == "undefined" ? c = $('input[name="settings_hotkeys_active"]:checked') : false;
                    var f = ["settings_hotkey_custom_1", "settings_hotkey_custom_2", "settings_hotkey_custom_3", "settings_hotkey_custom_4", "settings_hotkey_custom_5", "settings_hotkey_custom_6", "settings_hotkey_custom_7", "settings_hotkey_custom_8", "settings_hotkey_custom_9", "settings_hotkey_toggle_modifier", "settings_hotkey_toggle_key_webmin", "settings_hotkey_toggle_key_virtualmin", "settings_hotkey_toggle_key_cloudmin", "settings_hotkey_toggle_key_usermin", "settings_hotkey_toggle_key_webmail", "settings_hotkey_focus_search", "settings_hotkey_toggle_slider", "settings_hotkey_reload", "settings_hotkey_reload", "settings_hotkey_toggle_key_night_mode", "settings_hotkey_sysinfo", "settings_hotkey_favorites"];
                    if (c.val() == "false") {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", true)
                        })
                    } else {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", false)
                        })
                    }
                }
                i();
                $('input[name="settings_hotkeys_active"]').on("change", function() {
                    i($(this))
                });

                function j(c) {
                    typeof c == "undefined" ? c = $('input[name="settings_side_slider_enabled"]:checked') : false;
                    var f = ["settings_side_slider_palette", "settings_side_slider_fixed", "settings_side_slider_background_refresh_time", "settings_side_slider_sysinfo_enabled", "settings_side_slider_notifications_enabled", "settings_side_slider_favorites_enabled", "settings_side_slider_tabs_hotkeys"];
                    if (c.val() == "false") {
                        $.each(f, function(g, h) {
                            if (h == "settings_side_slider_fixed") {
                                $('input[name="settings_side_slider_fixed"][value="false"]').trigger("click")
                            }
                            $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", true).parent(".aradio").addClass("disabled")
                        })
                    } else {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", false).parent(".aradio").removeClass("disabled")
                        })
                    }
                }
                j();
                $('input[name="settings_side_slider_enabled"]').on("change", function() {
                    j($(this))
                });

                function l(c) {
                    typeof c == "undefined" ? c = $('input[name="settings_sysinfo_easypie_charts"]:checked') : false;
                    var f = ["settings_sysinfo_easypie_charts_size", "settings_sysinfo_easypie_charts_width", "settings_sysinfo_easypie_charts_scale"];
                    if (c.val() == "true") {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", false).removeClass("disabled")
                        })
                    } else {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", true).addClass("disabled")
                        })
                    }
                }
                l();
                $('input[name="settings_sysinfo_easypie_charts"]').on("change", function() {
                    l($(this))
                });

                function a(c) {
                    typeof c == "undefined" ? c = $('input[name="settings_sysinfo_theme_updates"]:checked') : false;
                    var f = ["settings_sysinfo_theme_patched_updates"];
                    if (c.val() == "true") {
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", false).removeClass("disabled")
                        })
                    } else {
                        $('input[name="settings_sysinfo_theme_patched_updates"][value="false"]').trigger("click");
                        $.each(f, function(g, h) {
                            $('input[name="' + h + '"]').prop("disabled", true).addClass("disabled")
                        })
                    }
                }
                a();
                $('input[name="settings_sysinfo_theme_updates"]').on("change", function() {
                    a($(this))
                });
                $('select[name="settings_navigation_color"]').on("click keyup change", function(c) {
                    var f = $(this).val();
                    $("body").attr("data-theme", f);
                    t__wi_p.$("body").attr("data-theme", f);
                    t__wi_p.$("link[data-palette]").remove();
                    if (f != "blue") {
                        t__wi_p.$("head").append('<link href="' + $webprefix + "/unauthenticated/css/palettes/" + f.toLowerCase() + "." + $load____ext + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>')
                    }
                    t__wi_p.$("body").attr("data-default-theme", f);
                    $(t__wi_p.page.document).find("body").attr("data-default-theme", f);
                    t__wi_p.$("body .user-link.palette-toggle").find(".fa-sun").trigger("click");
                    settings_update()
                });
                $('select[name="settings_background_color"]').on("click keyup change", function(c) {
                    var f = $(this).val();
                    t__wi_p.$("html").attr("data-background-style", f);
                    $("html").attr("data-background-style", f);
                    $("link[data-palette]").remove();
                    if (f != "gainsboro") {
                        $("head").append('<link href="' + $webprefix + "/unauthenticated/css/palettes/" + f.toLowerCase() + "." + $load____ext + ".css?" + $.now() + '" rel="stylesheet" type="text/css" data-palette>');
                        $('select[name="settings_navigation_color"]').val("gunmetal").trigger("change")
                    }
                    settings_update()
                });
                $('select[name="settings_side_slider_palette"]').change(function(c) {
                    t__wi_p.$("body .right-side-tabs, body .right-side-tabs-toggler").attr("data-background-style", $(this).val())
                });
                $('input[name="settings_side_slider_enabled"]').change(function(c) {
                    if ($(this).val() == "true") {
                        t__wi_p.$("body .right-side-tabs-toggler").removeClass("hidden");
                        t__wi_p.$("body .right-side-tabs").removeClass("hidden");
                        $('input[name="settings_side_slider_sysinfo_enabled"][value="true"], input[name="settings_side_slider_notifications_enabled"][value="true"], input[name="settings_side_slider_favorites_enabled"][value="true"]').trigger("click")
                    } else {
                        t__wi_p.$("body .right-side-tabs-toggler").addClass("hidden");
                        t__wi_p.$("body .right-side-tabs").addClass("hidden")
                    }
                    settings_update()
                });
                $('input[name="settings_side_slider_fixed"]').change(function(c) {
                    if ($(this).val() == "true") {
                        n___p__f(1)
                    } else {
                        n___p__f(0)
                    }
                    settings_update()
                });
                $('input[name="settings_side_slider_sysinfo_enabled"], input[name="settings_side_slider_notifications_enabled"], input[name="settings_side_slider_favorites_enabled"]').change(function(c) {
                    var g = ("right-side-tabs-" + $(this).attr("name").split("_")[3]),
                        q = $(this).attr("name"),
                        f = t__wi_p.$("body").find("#" + g).hasClass("active"),
                        h = $('input[name="settings_side_slider_sysinfo_enabled"][value="true"]:checked, input[name="settings_side_slider_notifications_enabled"][value="true"]:checked, input[name="settings_side_slider_favorites_enabled"][value="true"]:checked').length;
                    if ($(this).val() == "true") {
                        t__wi_p.$("body").find('a[href="#' + g + '"], #' + g + "").removeClass("hidden").parent().removeClass("hidden");
                        if (q === "settings_side_slider_notifications_enabled") {
                            t__wi_p.$(".right-side-tab-notification-asterix").removeClass("invisible hidden hidden-forged");
                            t__wi_p.$(".right-side-tabs-toggler .badge.badge-danger").removeClass("invisible hidden hidden-forged");
                            setTimeout(function() {
                                if (typeof t__wi_p.n___fv === "function") {
                                    t__wi_p.n___fv()
                                }
                            }, 300)
                        }
                    } else {
                        t__wi_p.$("body").find('a[href="#' + g + '"], #' + g + "").addClass("hidden");
                        if (f && h) {
                            t__wi_p.$("body #right-side-tabs").find("li:not(.active) a:not(.hidden)").first().trigger("click")
                        } else {
                            if (h === 0) {
                                $('input[name="settings_side_slider_enabled"][value="false"]').trigger("click")
                            }
                        }
                        if (q === "settings_side_slider_notifications_enabled") {
                            t__wi_p.$(".right-side-tab-notification-asterix").addClass("invisible hidden hidden-forged");
                            t__wi_p.$(".right-side-tabs-toggler .badge.badge-danger").addClass("invisible hidden hidden-forged");
                            t__wi_p.favicon.badge(0);
                            t__wi_p.titlenotifier.set(0)
                        }
                    }
                    settings_update()
                });
                $('input[name="settings_side_slider_sysinfo_enabled"], input[name="settings_side_slider_notifications_enabled"], input[name="settings_side_slider_favorites_enabled"]').each(function() {
                    $('input[name="' + $(this).attr("name") + '"][value="' + window[$(this).attr("name")] + '"]').trigger("change")
                });
                $('select[name="settings_navigation_color"]').after('<i class="fa fa-fw fa-cog text-light settings_navigation_color_toggle cursor-default" data-name="settings_navigation_color" style="margin-left: 10px; vertical-align: middle; background-color: transparent !important"></i>																		 <i class="fa fa-fw fa-refresh text-light settings_navigation_color_reset cursor-default hidden" data-name="settings_navigation_color" style="margin-left: 4px; vertical-align: middle; background-color: transparent !important"></i>');
                $(".settings_navigation_color_toggle, .settings_background_color_toggle").on("click", function() {
                    if (typeof window[$(this).attr("data-name") + "controller"] == "undefined" || window[$(this).attr("data-name") + "controller"] == "hidden") {
                        $("." + $(this).attr("data-name") + "_reset, ." + $(this).attr("data-name") + "_rows").removeClass("hidden");
                        window[$(this).attr("data-name") + "controller"] = "shown"
                    } else {
                        $("." + $(this).attr("data-name") + "_reset, ." + $(this).attr("data-name") + "_rows").addClass("hidden");
                        window[$(this).attr("data-name") + "controller"] = "hidden"
                    }
                });
                $(".settings_navigation_color_reset, .settings_background_color_reset").on("click", function() {
                    if ($(this).attr("data-name") == "settings_navigation_color") {
                        f__l__filter_r()
                    } else {
                        f__c__filter_r()
                    }
                });
                var d = $('input[name="settings_grayscale_level_navigation"], input[name="settings_sepia_level_navigation"], input[name="settings_saturate_level_navigation"], input[name="settings_hue_level_navigation"], input[name="settings_invert_level_navigation"], input[name="settings_brightness_level_navigation"], input[name="settings_contrast_level_navigation"]');
                d.on("click keyup change", function(c) {
                    var f = "-webkit-filter: grayscale(" + $('input[name="settings_grayscale_level_navigation"]').val() + ") sepia(" + $('input[name="settings_sepia_level_navigation"]').val() + ") saturate(" + $('input[name="settings_saturate_level_navigation"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_navigation"]').val() + "deg) invert(" + $('input[name="settings_invert_level_navigation"]').val() + ") brightness(" + $('input[name="settings_brightness_level_navigation"]').val() + ") contrast(" + $('input[name="settings_contrast_level_navigation"]').val() + "); filter: grayscale(" + $('input[name="settings_grayscale_level_navigation"]').val() + ") sepia(" + $('input[name="settings_sepia_level_navigation"]').val() + ") saturate(" + $('input[name="settings_saturate_level_navigation"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_navigation"]').val() + "deg) invert(" + $('input[name="settings_invert_level_navigation"]').val() + ") brightness(" + $('input[name="settings_brightness_level_navigation"]').val() + ") contrast(" + $('input[name="settings_contrast_level_navigation"]').val() + ");";
                    t__wi_p.$(".visible-xs.mobile-menu-toggler").attr("style", "position: fixed;" + f);
                    t__wi_p.$("aside, .visible-xs.mobile-menu-toggler").attr("style", "z-index: 10; overflow: visible; transform: translate(" + settings_leftmenu_width + "px, 0px);" + f);
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    settings_update()
                });
                d.each(function() {
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    $(this).parent().parent("td").parent("tr.atshover").addClass("hidden settings_navigation_color_rows")
                });
                var p = $('input[name="settings_grayscale_level_content"], input[name="settings_saturate_level_content"], input[name="settings_hue_level_content"]');
                p.on("click keyup change", function(c) {
                    var f = "-webkit-filter: grayscale(" + $('input[name="settings_grayscale_level_content"]').val() + ") saturate(" + $('input[name="settings_saturate_level_content"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_content"]').val() + "deg); filter: grayscale(" + $('input[name="settings_grayscale_level_content"]').val() + ") saturate(" + $('input[name="settings_saturate_level_content"]').val() + ") hue-rotate(" + $('input[name="settings_hue_level_content"]').val() + "deg);";
                    $("body").attr("style", f);
                    t__wi_p.$("#content .loading-container").attr("style", f);
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    settings_update()
                });
                p.each(function() {
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    $(this).parent().parent("td").parent("tr.atshover").addClass("hidden settings_background_color_rows")
                });
                var o = $('input[name="settings_leftmenu_width"]');
                o.on("click keyup change", function(c) {
                    t__wi_p.f__r__s($(this).val(), $(this).val());
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    settings_update();
                    t__wi_p.settings_leftmenu_width_initial = $(this).val()
                });
                o.each(function() {
                    $('code[data-name="' + $(this).attr("name") + '"]').text($(this).val());
                    t__wi_p.settings_leftmenu_width_initial = $(this).val()
                });
                if ($__source_query == "restored") {
                    d.trigger("click");
                    p.trigger("click");
                    o.trigger("click");
                    $('select[name="settings_navigation_color"], select[name="settings_background_color"]').trigger("change");
                    window.history.pushState(null, null, $_____link_full + "/webmin/edit_themes.cgi")
                }
                t__wi_p.$("aside ul.user-html li.user-html-string").html($('input[name="settings_leftmenu_user_html"]').val());
                $('input[name="settings_leftmenu_user_html"]').keyup(function(c) {
                    t__wi_p.$("aside ul.user-html li.user-html-string").html($(this).val())
                });
                if (dashboard_switch()) {
                    $('input[name="settings_sysinfo_link_mini"]').parent().parent().parent().parent("tr").remove()
                }
                if (!$t_uri_virtualmin && !$t_uri_cloudmin) {}
                $('input[name^="settings_leftmenu_netdata_link"], input[name^="settings_leftmenu_user_html_only_for_administrator"], input[name="settings_sysinfo_easypie_charts_size"], input[name="settings_sysinfo_easypie_charts_width"], input[name="settings_sysinfo_easypie_charts_scale"], input[name="settings_sysinfo_theme_patched_updates"]').parents("td.col_value.atscontent").parent("tr.atshover").addClass("settings_option_padded");
                $('input[data-role="tagsinput"]').tagsinput();
                $("body").css("overflow", "auto");
                $.getScript("" + $_____link_full + "/unauthenticated/js/detector." + t__wi_p.$load____ext + ".js?" + $g__t__ver_str + "", function(c, h, g) {
                    var f = new Detector;
                    $.each($('select[name="settings_font_family"] option'), function() {
                        var q = $(this).text();
                        if (!f.detect(q) && $(this).val() != "system-default") {
                            $(this).attr("disabled", "disabled").text(q + " (" + lang("theme_xhred_global_not_available") + ")")
                        }
                    });
                    $('select[name="settings_font_family"]').on("click keyup change", function(q) {
                        var u = $(this).val(),
                            r = $.merge(t__wi_p.$("head"), t___wi.$("head")),
                            s = t__wi_p.$("head").find('link[href*="font-"]').add(t___wi.$("head").find('link[href*="font-"]')).add(t__wi_p.$("head").find('link[href*="fonts-roboto"]')).add(t___wi.$("head").find('link[href*="fonts-roboto"]')),
                            t = $.merge(t__wi_p.$("head").find('link[href*="/authentic."]'), t___wi.$("head").find('link[href*="/authentic."]')),
                            t = t.length ? t : $.merge(t__wi_p.$("head").find('link[href*="/bundle."]'), t___wi.$("head").find('link[href*="/bundle."]'));
                        s.remove();
                        if (u == "0" || u == "1") {
                            if (u == "0") {
                                t.after('<link href="' + $_____link_full + "/unauthenticated/css/fonts-roboto." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
                            }
                        } else {
                            t.after('<link href="' + $_____link_full + "/unauthenticated/css/font-" + u + "." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
                        }
                    })
                });
                $('input[name="settings_leftmenu_netdata"]').on("change", function() {
                    var c = $('input[name="settings_leftmenu_netdata_link"]');
                    if ($(this).val() == "true") {
                        c.removeAttr("disabled")
                    } else {
                        c.attr("disabled", "disabled")
                    }
                });
                $('input[name="settings_leftmenu_netdata"]:checked').trigger("change");
                if (is_module("status") == 0 || !t__wi_p.$(".right-side-tabs-toggler").length) {
                    $('input[name="settings_side_slider_enabled"][value="false"]').trigger("click");
                    $('input[name="settings_side_slider_enabled"]').attr("disabled", "disabled")
                }
            }
        })
    });
    $("body").on("click", "#atsave:not(.btn-inverse):not(.disabled)", function(d) {
        d.preventDefault();
        var c = $(this);
        f__mgk_sp(c, [1.5, -33, "small", 1000]);
        settings_update();
        t__wi_p.manageConfig("save");
        setTimeout(function() {
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi?xhr-settings=1&save=1",
                data: c.parents("form").serialize(),
                dataType: "text",
                success: function(a) {
                    t__wi_p.f__l_reload();
                    at__s_s__b(0)
                },
                error: function() {
                    c.addClass("btn-danger").removeClass("btn-success btn-inverse opacity-0_5")
                }
            })
        }, 1000)
    });
    $("body").on("click", ".authentic_update:not(.disabled), .page_footer_ajax_submit:not(.disabled)", function() {
        f__mgk_sp($(this), [1.5, -33, "small", false])
    })
}

function set_location_search() {
    if (t__wi_p.$("#wrapper").data("virtual-server") != -1) {
        t__wi_p.history.pushState(null, null, $_____link_full + "/?virtualmin")
    } else {
        if (t__wi_p.$("#wrapper").data("server-manager") != -1) {
            t__wi_p.history.pushState(null, null, $_____link_full + "/?cloudmin")
        } else {
            if (t__wi_p.$("#wrapper").data("dashboard") != -1) {
                t__wi_p.history.pushState(null, null, $_____link_full + "/?dashboard")
            } else {
                t__wi_p.history.pushState(null, null, $_____link_full + "/")
            }
        }
    }
}
$("body").on("click", 'a[data-href="#theme-info"]', function(b) {
    b.preventDefault();
    $(this).addClass("manual");
    $("#update_notice").modal("show")
});
$("body").on("hide.bs.modal", "#update_notice", function() {
    var a = $('a[data-href="#theme-info"]');
    if (!a.hasClass("manual")) {
        a.removeClass("manual");
        t__wi_p.$("body").append('<div class="update_notice_overlay" style="position: absolute; z-index: 10000001; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; background-color: ' + $("html").css("background-color") + ' !important; pointer-events: none;"></div>');
        t__wi_p.$("div.update_notice_overlay").animate({
            opacity: 1
        }, 560, function() {
            setTimeout(function() {
                t__wi_p.location = t__wi_p.location
            }, 100)
        })
    } else {
        t__wi_p.$("#content").animate({
            "margin-left": ___________content_initial_
        }, 280);
        t__wi_p.$("aside").animate({
            "margin-left": 0
        }, 280, function() {
            t__wi_p.$(".right-side-tabs, .right-side-tabs-toggler").removeClass("pointer-events-none bg-filter-grayscale-opacity50")
        })
    }
}).on("show.bs.modal", "#update_notice", function() {
    var e = $('a[data-href="#theme-info"]'),
        d = t__wi_p.$("aside").css("left");
    ___________content_initial_ = t__wi_p.$("#content").css("margin-left"), ________version_date_obj = $(this).find(".modal-body > h4:first-child"), ________version_curr_text = ________version_date_obj.text().split(/\s+/)[1], ________version_first_text = $(".version_separator:last").text(), ________multi_in_branch = $(".version_separator").length, _____version__x = (________version_first_text + "..." + ________version_curr_text), __release_time = $g__t__gver.slice(-4, -2) + ":" + $g__t__gver.slice(-2), _____release_date_ = ________version_date_obj.text().match(/\(([^)]+)\)/), _____release_date = _____release_date_ ? _____release_date_[1] : false, __release_date_time = (_____release_date + (__release_time.length > 2 ? (", " + __release_time) : ""));
    var b = lang("theme_xhred_global_release").toLowerCase(),
        i = $(".version_separator"),
        a = lang("theme_xhred_global_beta_version");
    $.each(i, function() {
        if ($(this).text().indexOf(b) === -1 && $(this).text().indexOf(a) === -1) {
            $(this).append('<span class="smaller">-' + b + " </span>")
        }
    });
    if (!e.hasClass("manual")) {
        setTimeout(function() {
            $(".container-fluid").addClass("bg-filter-blur-grayscale-opacity50")
        }, 0)
    }
    t__wi_p.$("#content").animate({
        "margin-left": 0
    }, 560);
    t__wi_p.$("aside").animate({
        "margin-left": d
    }, 560);
    t__wi_p.$(".right-side-tabs, .right-side-tabs-toggler").addClass("pointer-events-none bg-filter-grayscale-opacity50");
    var f = $(this).find(".modal-body h4");
    $modal_h4_first = $(this).find(".modal-body h4:first");
    if (!$(this).find(".modal-body h4:first .diffctl").length) {
        var h = new RegExp(RegExp.quote(________version_curr_text), "g");
        if (________multi_in_branch) {
            f.replaceText(h, "<span>" + _____version__x + "</span>");
            f.replaceText(/Version/, "Versions")
        }
        if (f.length && $(this).find('.modal-body h4:contains("patch")').length) {
            var c = parseFloat($(this).find('.modal-body a[href*="authentic-theme/releases"]:first').text().match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
            $modal_h4_first.append('<a data-toggle="tooltip" data-title="<strong>' + lang("theme_xhred_git_compare_changes") + "</strong><br>" + (lang("theme_xhred_global_committed_on") + ": <em>" + __release_date_time) + '</em>" class="btn btn-transparent diffctl text-dark text-force-link-hover" href="https://github.com/qooob/authentic-theme/compare/' + c + '...master"><i class="fa fa-lg fa-git-pull fa-flip-horizontal"></i></a>');
            $modal_h4_first.after('<span class="version_separator" style="margin-top: -32px;margin-right: 0;">            <span class="smaller text-danger"><span>' + a + "</span></span></span>")
        } else {
            if (________multi_in_branch) {
                $modal_h4_first.after('                <a href="https://github.com/qooob/authentic-theme/releases/tag/' + ________version_curr_text + '" class="version_separator" style="margin-top: -28px;">' + ________version_curr_text + '<span class="smaller">-' + lang("theme_xhred_global_release").toLowerCase() + " </span></a>")
            }
            $modal_h4_first.append('<a data-toggle="tooltip" data-html="true" data-title="<strong>' + lang("theme_xhred_global_complete_changelog") + "</strong><br>" + (lang("theme_xhred_global_released_on") + ": <em>" + __release_date_time) + '</em>" class="btn btn-transparent diffctl changelogctl text-dark text-force-link-hover" href="https://github.com/qooob/authentic-theme/blob/18/CHANGELOG.md"><i class="fa fa-1_50x fa-changelog' + (________multi_in_branch ? " multi-ver" : " single_ver") + '"></i></a>')
        }
    }
    var h = new RegExp(RegExp.quote("(" + _____release_date + ")"), "g");
    f.replaceText(h, "");
    var g = [];
    $.each($(this).find('li span:contains("Fixed bugs")'), function() {
        var m = $(this),
            j = $(this).parent("li"),
            k = j.parent("ul"),
            n = j.find("a:not(.bctl)"),
            l = n.length;
        if (________multi_in_branch) {
            g.push(n);
            if (k.find("li").length === 1) {
                k.prev("hr").prev("a").remove();
                k.prev("hr").remove();
                k.addClass("no-data")
            }
            j.remove()
        } else {
            m.html([m.text().slice(0, 6), "" + l + " ", m.text().slice(6)].join(""));
            j.find("a:first").before('<a class="btn btn-xxs btn-transparent bctl margined-right-8 text-semi-dark text-force-link-hover" style="padding-left: 1px; padding-right: 1px" href="javascript:;" ><i class="fa fa-plus-square-o"></i></a>');
            j.find("a.bctl").click(function(o) {
                n.toggleClass("hidden");
                j.find("a.bctl i").toggleClass("fa-minus-square-o")
            });
            n.addClass("obj-popup hidden")
        }
    }).promise().done(function() {
        if (________multi_in_branch && !$(".bctl").length) {
            $(".modal-body h4[data-development]").prev("hr").before('      <hr class="hr-dashed margined-top-15">      <div data-bugs><ul><li><span data-fixed-bugs data-fixed-bugs-obj>Fixed bugs</span><span data-bugs-container></span></li></ul></div>');
            $(".modal-body span[data-bugs-container]").append(g);

            function j(p, o) {
                return (parseInt($(o).text().replace("#", ""))) < parseInt(($(p).text().replace("#", ""))) ? 1 : -1
            }
            $(".modal-body span[data-bugs-container] a").sort(j).appendTo(".modal-body span[data-bugs-container]");
            var l = $("span[data-fixed-bugs]"),
                n = $("span[data-bugs-container]"),
                m = $(".modal-body span[data-bugs-container]").find("a:not(.bctl)"),
                k = m.length;
            l.html([l.text().slice(0, 6), "" + k + " ", l.text().slice(6)].join(""));
            l.append('<a class="btn btn-xxs btn-transparent bctl margined-left-4 text-semi-dark text-force-link-hover" style="padding-left: 1px; padding-right: 1px" href="javascript:;" ><i class="fa fa-plus-square-o"></i></a>');
            l.find("a.bctl").click(function(o) {
                m.toggleClass("hidden");
                l.find("a.bctl i").toggleClass("fa-minus-square-o")
            });
            m.addClass("obj-popup hidden")
        }
    })
});
var $___remove_theme_version = localStorage.getItem($hostname + "-sysinfo_authentic_remote_version"),
    $__remove_theme_version = ($___remove_theme_version ? $___remove_theme_version : $g__t__ver);
if ($__remove_theme_version && $__remove_theme_version.indexOf("git") > -1) {
    $__remove_theme_version = parseFloat($__remove_theme_version).toFixed(2)
}
var $__theme_link_upd = "https://github.com/qooob/authentic-theme/releases/download/" + ($__remove_theme_version.split("-")[0]) + "/authentic-theme-" + $__remove_theme_version + ".wbt.gz";
if ($current_page_full && $current_page_full.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-webmin-theme") {
    setTimeout(function() {
        $iframe = t__wi_p.$('iframe[name="page"]').contents();
        $iframe.find(".panel-body .tab-pane.active").removeClass("active");
        $iframe.find(".panel-body #att_install").addClass("active");
        $iframe.find('.panel-body .ui_radio_table.table-hardcoded input[id="source_2"]').prop("checked", true);
        $iframe.find('.panel-body .ui_radio_table.table-hardcoded input[id="source_2"]').parents("td").next("td").find('input[name="url"]').attr("autocomplete", "off").val($__theme_link_upd);
        setTimeout(function() {
            $iframe.find('.panel-body .tab-pane.active form[action^="install_theme."]').submit();
            t__wi_p.history.pushState(null, null, $_____link_full + "/?downloading-webmin-theme")
        }, 200)
    }, 400)
} else {
    if ($current_page_full && ($current_page_full.indexOf("/webmin/install_theme.cgi") > -1 || $current_page_full.indexOf("/usermin/install_theme.cgi") > -1 || $current_page_full.indexOf("/usermin/edit_themes.cgi") > -1) && (t__wi_p.location.search == "?downloading-webmin-theme" || t__wi_p.location.search == "?downloading-usermin-theme" || t__wi_p.location.search == "?updating-usermin-theme")) {
        if (t__wi_p.$t_av__usermin && t__wi_p.location.search != "?downloading-usermin-theme") {
            if (t__wi_p.location.search == "?updating-usermin-theme") {
                setTimeout(function() {
                    $__iframe = t__wi_p.$('iframe[name="page"]').contents();
                    $__iframe.find('input[name="source"][value="2"]').prop("checked", true);
                    $__iframe.find('input[name="url"]').val($__theme_link_upd);
                    $__iframe.find('form[action^="install_theme."]').submit();
                    t__wi_p.history.pushState(null, null, $_____link_full + "/?downloading-usermin-theme")
                }, 400)
            } else {
                t__wi_p.history.pushState(null, null, $_____link_full + "/?updating-usermin-theme");
                t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/usermin/edit_themes.cgi")
            }
        } else {
            t__wi_p.history.pushState(null, null, $_____link_full + "/?theme-update-finished");
            t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi")
        }
    } else {
        if ($current_page_full && $current_page_full.indexOf("/sysinfo.cgi") > -1 && t__wi_p.location.search == "?theme-update-finished") {
            set_location_search();
            $(t__wi_p).on("popstate", function() {
                t__wi_p.history.pushState(null, null, $_____link_full + "/")
            })
        }
    }
}
if ($current_page_full && $current_page_full.indexOf("/package-updates/index.cgi") > -1 && t__wi_p.location.search == "?recollecting") {
    t__wi_p.history.pushState(null, null, $_____link_full + "/?recollecting-package-updates");
    t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/package-updates/index.cgi?mode=updates")
} else {
    if ($current_page_full && $current_page_full.indexOf("/package-updates/index.cgi") > -1 && t__wi_p.location.search == "?recollecting-package-updates") {
        setTimeout(function() {
            $iframe = t__wi_p.$('iframe[name="page"]').contents();
            var b = $iframe.find('form[action^="update."]');
            b.append('<input type="hidden" name="refresh" value="1">');
            b.submit();
            t__wi_p.history.pushState(null, null, $_____link_full + "/?recollecting-package-updates-processing")
        }, 400)
    } else {
        if ($current_page_full && $current_page_full.indexOf("/package-updates/update.cgi") > -1 && t__wi_p.location.search == "?recollecting-package-updates-processing") {
            $iframe = t__wi_p.$('iframe[name="page"]').contents();
            $iframe.find("#refresh").trigger("click");
            t__wi_p.history.pushState(null, null, $_____link_full + "/?recollect");
            t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/webmin/edit_webmincron.cgi")
        }
    }
}
if ($current_page_full && $current_page_full.indexOf("/webmin/edit_webmincron.cgi") > -1 && t__wi_p.location.search == "?recollect") {
    setTimeout(function() {
        $sysinfo_content = $("body");
        $sysinfo_content.find("#" + $sysinfo_content.find("label:contains('cleanup_temp_files')").attr("for")).prop("checked", true);
        $sysinfo_content.find("#" + $sysinfo_content.find("label:contains('scheduled_collect_system_info')").attr("for")).prop("checked", true);
        $sysinfo_content.find("#" + $sysinfo_content.find("label:contains('collectinfo.pl')").attr("for")).prop("checked", true);
        $sysinfo_content.find("#" + $sysinfo_content.find("label:contains('status.pl')").attr("for")).prop("checked", true);
        $form_sysinfo = $sysinfo_content.find('form[action^="delete_webmincron."]');
        $form_sysinfo.append('<input type="hidden" name="run" value="1">');
        $form_sysinfo.submit();
        t__wi_p.history.pushState(null, null, $_____link_full + "/?recollect-system-status")
    }, 400)
} else {
    if ($current_page_full && $current_page_full.indexOf("/webmin/delete_webmincron.cgi") > -1 && t__wi_p.location.search == "?recollect-system-status") {
        t__wi_p.history.pushState(null, null, $_____link_full + "/?recollect-finished");
        t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi")
    } else {
        if ($current_page_full && $current_page_full.indexOf("/sysinfo.cgi") > -1 && t__wi_p.location.search == "?recollect-finished") {
            set_location_search();
            $(t__wi_p).on("popstate", function() {
                t__wi_p.history.pushState(null, null, $_____link_full + "/")
            })
        }
    }
}
$("#system-status > div.panel-body > table > tbody > tr").on("mouseover", function() {
    $(this).find(".btn-hidden").removeClass("hidden")
}).on("mouseout", function() {
    $(this).find(".btn-hidden").addClass("hidden")
});
$('input[name="but_switch"]').on("click", function(b) {
    $(t__wi_p).on("popstate", function() {
        t__wi_p.history.pushState(null, null, $_____link_full + "/")
    });
    $(this).parents("form").attr("target", "_top")
});
$('form[action*="switch_user.cgi"], a[href*="switch_user.cgi"]').each(function() {
    $(t__wi_p).on("popstate", function() {
        t__wi_p.history.pushState(null, null, $_____link_full + "/")
    });
    $(this).attr("target", "_top")
});
if (is__m("mysql") || is__m("postgresql")) {
    $('a > img[src*="images/left.gif"]').each(function(d, e) {
        var f = $(this);
        f.replaceWith('<i class="fa fa-fw fa-lg fa-arrow-circle-o-left text-semi-light vertical-align-baseline"></i>')
    });
    $('a > img[src*="images/right.gif"]').each(function(d, e) {
        var f = $(this);
        f.replaceWith('<i class="fa fa-fw fa-lg fa-arrow-circle-o-right text-semi-light vertical-align-baseline"></i>')
    })
}
if (is__m("mailboxes") || is__m("mailbox")) {
    var $mail_ar_selector = 'form.ui_form[action="index.cgi"]',
        $mail_icon_class = "fa fa-fw fa-lg text-semi-light vertical-align-baseline fa-angle-";
    $("" + $mail_ar_selector + ' img[src*="images/left"], center img[src*="images/left"]').each(function() {
        $(this).replaceWith('<i class="' + $mail_icon_class + 'left"></i>')
    });
    $("" + $mail_ar_selector + ' img[src*="images/right"], center img[src*="images/right"]').each(function() {
        $(this).replaceWith('<i class="' + $mail_icon_class + 'right"></i>')
    });
    $("" + $mail_ar_selector + ' img[src*="images/first"]').each(function() {
        $(this).replaceWith('<i class="' + $mail_icon_class + 'double-left"></i>')
    });
    $("" + $mail_ar_selector + ' img[src*="images/last"]').each(function() {
        $(this).replaceWith('<i class="' + $mail_icon_class + 'double-right"></i>')
    })
}
if (is__mf("virtual-server", "list_scripts.cgi")) {
    $('td > a > img[src*="images/staroff.gif"]').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/staroff.gif")
    });
    $('td > a > img[src*="images/staron.gif"]').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/staron.gif")
    })
}
if ($current_directory == $_____link + "status/") {
    $('td img[src*="images/up.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/check.png");
        f.addClass("scale-08")
    });
    $('td img[src*="images/down.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/cross.png");
        f.addClass("scale-08")
    });
    $('td img[src*="images/not.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/not.png");
        f.addClass("scale-08")
    })
}
$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/up.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/up.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/up.gif"]:not(".ui_icon_protected")').each(function(d, e) {
    var f = $(this);
    $(e).attr("src", "" + $_____link_full + "/images/check.png");
    f.addClass("scale-08")
});
$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/down.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/down.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/down.gif"]:not(".ui_icon_protected")').each(function(d, e) {
    var f = $(this);
    $(e).attr("src", "" + $_____link_full + "/images/cross.png");
    f.addClass("scale-08")
});
$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/not.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/not.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/not.gif"]:not(".ui_icon_protected")').each(function(d, e) {
    var f = $(this);
    $(e).attr("src", "" + $_____link_full + "/images/not.png");
    f.addClass("scale-08")
});
if (is__m("proc") || is__m("firewall") || is__m("firewall6") || is__m("shorewall") || is__m("shorewall6") || is__mf("pam", "edit_pam.cgi") || is__m("filter")) {
    $("td a img[src], td label a img[src]").parents("td").addClass("text-center");
    $('td img[src*="images/gap.gif"]').replaceWith('<i class="fa fa-fw fa-caret-down invisible"></i>');
    $('td a img[src*="images/down.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_down") + '" class="fa fa-fw fa-move-down cursor-pointer"></i>');
    $('td a img[src*="images/up.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_up") + '" class="fa fa-fw  fa-move-up cursor-pointer"></i>');
    $('td a img[src*="images/after.gif"]').replaceWith('<i title="' + lang("theme_xhred_add_after") + '" class="fa fa-fw fa-level-down cursor-pointer"></i>');
    $('td a img[src*="images/before.gif"]').replaceWith('<i title="' + lang("theme_xhred_add_before") + '" class="fa fa-fw fa-level-down fa-flip-vertical cursor-pointer"></i>')
}
if (is__m("squid") || is__m("cron")) {
    $('td a img[src*="images/movedown.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_down") + '" class="fa fa-fw fa-move-down cursor-pointer"></i>');
    $('td a img[src*="images/moveup.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_up") + '" class="fa fa-fw fa-move-up cursor-pointer"></i>')
}
if (is__m("cron")) {
    $('td a img[src*="images/bottom.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_bottom") + '" class="fa fa-fw fa-level-down cursor-pointer"></i>');
    $('td a img[src*="images/top.gif"]').replaceWith('<i title="' + lang("theme_xhred_move_top") + '" class="fa fa-fw fa-level-down fa-flip-vertical cursor-pointer"></i>')
}
$("input").each(function(c, d) {
    if ($(this).attr("src") == "images/ok.gif") {
        $(d).attr("src", "" + $_____link_full + "/" + $(this).attr("src"));
        $(this).parents("td").attr("style", "white-space: nowrap")
    }
});
v__cm___init() && t__cm___init($("textarea"), false, false, "static");
v__cm_viewer() && f__cm_viewer();
if ($(".ui_table tr td").has(".ui_grid_table.table-hardcoded") && ($current_directory == $_____link + "passwd/" || $current_directory == $_____link + "mailboxes/" || $current_page_full == $_____link_full + "/usermin/list_configs.cgi")) {
    $(".ui_table tr td .ui_grid_table.table-hardcoded").parents("table").css("border", "1px solid #f0f0f0");
    $(".ui_table tr td .ui_grid_table.table-hardcoded").addClass("table").parents("tr").css("border", "1px solid #f0f0f0")
}
if (($("body").attr("class") && $('body[class="custom"]').length || ($("body").attr("class") && $("body").attr("class").search(/custom\d+$/) === 0)) && $__source_file == "view.cgi") {
    var $_tt = $('form[action="save.cgi"]').find(".table-title").find("tt").text();
    $('form[action="save.cgi"]').find(".table-title").find("b").empty().append("<tt>" + $_tt + "</tt>")
}
$.each($("form > table"), function() {
    if ($(this).next('input[type="submit"]')) {
        if ($(this).attr("style")) {} else {}
    }
});
$.each($("table tr"), function() {
    if ($(this).is(":empty")) {
        $(this).remove()
    }
});

function __tables() {
    if ($current_page_full == $_____link_full + "fsdump/restore_form.cgi" || $current_page_full == $_____link_full + "/virtual-server/summary_domain.cgi" || $current_page_full == $_____link_full + "/usermin/edit_categories.cgi" || $current_page_full == $_____link_full + "/usermin/edit_defacl.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi" || $current_page_full == $_____link_full + "/bind8/conf_misc.cgi" || $current_page_full == $_____link_full + "/bind8/edit_recs.cgi" || $current_page_full == $_____link_full + "/postfix/sasl.cgi" || $current_page_full == $_____link_full + "/postfix/edit_master.cgi" || $current_page_full == $_____link_full + "/squid/edit_icp.cgi" || $current_page_full == $_____link_full + "/squid/edit_misc.cgi" || $current_page_full == $_____link_full + "/cpan/edit_mod.cgi" || $current_page_full == $_____link_full + "/phpini/edit_errors.cgi" || $current_page_full == $_____link_full + "/acl/edit_acl.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_domain.cgi" || $current_page_full == $_____link_full + "/apache/edit_virt.cgi" || $current_page_full == $_____link_full + "/apache/edit_dir.cgi" || $current_page_full == $_____link_full + "/mysql/edit_cnf.cgi" || $current_page_full == $_____link_full + "/squid/edit_logs.cgi" || $current_page_full == $_____link_full + "/net/edit_aifc.cgi" || $current_page_full == $_____link_full + "/phpini/edit_misc.cgi") {
        return [$("table#show_backup_destination"), $('form[action="save_categories.cgi"] > .table-hardcoded'), $('form[action="save_defacl.cgi"] > .table-hardcoded'), $('form[action="index_search.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_misc.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_sasl.cgi"] .table-hardcoded'), $('form[action="save_master.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_icp.cgi"] .table.table-striped.table-condensed.table-subtable'), $('form[action="save_misc.cgi"] .table.table-striped.table-condensed.table-subtable'), $(".table-responsive > .table.table-striped.table-condensed.table-subtable"), $(".table-responsive > .table.table-striped.table-condensed.table-subtable > .sub_table_container.table-hardcoded"), $("#hiddendiv_opts"), $('.ui_form[action="save_virt.cgi"] .sub_table_container.table-hardcoded')]
    } else {
        return false
    }
}
if (__tables()) {
    $.each(__tables(), function(d, f) {
        var e = $(this);
        $.each(e.find("td"), function() {
            if (!$(this).find("hr").length) {
                $(this).removeAttr("colspan")
            }
        });
        $.each(e.find("tbody"), function() {
            var a = $(this).children("tr"),
                c = [];
            $.each(a, function() {
                c.push($(this).children("td").length)
            });
            var b = Math.max.apply(this, c);
            $.each(a, function() {
                var i = $(this).children("td").length;
                if (b != i && !$(this).find("hr").length && __tables()) {
                    for (var g = 0; g < (b - i); g++) {
                        $(this).append("<td></td>")
                    }
                }
            })
        })
    })
}
$.each($("span > input"), function() {
    var f = $(this).parent("span").next(".file_chooser_button"),
        e = $(this).parent("span").next('input[type="button"][onclick]'),
        d = $(this).parent("span").next("select");
    if (f) {
        f.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; margin-top:4px !important;").find("i.fa-files-o").css("margin-top", "0").addClass("vertical-align-middle")
    }
    if ($(this).parents(".tab-content")) {
        f.css("margin-top", "4px")
    }
    if (e) {
        e.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; vertical-align: middle").next("i.fa-files-o").css("margin-top", "11px").addClass("vertical-align-middle");
        e.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; vertical-align: middle").next("i.fa-calendar").attr("style", "margin-top: 8px !important; font-size: 11px; margin-left: -27px; pointer-events: none;")
    }
});
$.each($('input[type="button"][onclick^="ifield"]'), function(d, c) {
    $(this).css("margin-left", "0").css("width", "40px").css("height", "28px")
});
$('.ui_form[action="switch.cgi"] > input.form-control.ui_textbox').next('input[type="button"][onclick^="ifield"]').attr("style", "margin-top: 2px !important; margin-bottom: 2px !important; margin-left: 0 !important");
setTimeout(function() {
    $('.ui_form[action="switch.cgi"]  .file_chooser_button_attached').attr("style", "font-size: 11px; pointer-events: none; margin-top: 14px !important;")
}, 10);
if ($current_directory == $_____link + "cshrc/") {
    $("textarea").each(function(d, c) {
        $(this).attr("style", "height: 20em !important")
    })
}
if ($current_page_full == $_____link_full + "/acl/" || $current_page_full == $_____link_full + "/acl/edit_user.cgi") {
    $('.ui_grid_table.table-hardcoded .ui_grid_row .ui_grid_cell input[type="checkbox"], .table-hardcoded .col_value input[type="checkbox"]').each(function(d, c) {
        $(this).attr("style", "vertical-align: bottom !important")
    })
}
if ($("body").attr("class") && $('body[class="custom"]').length || ($("body").attr("class") && $("body").attr("class").search(/custom\d+$/) === 0)) {
    $(".panel-body > .ui_grid_table.table-hardcoded").each(function(d, c) {
        $(this).attr("style", "margin-top: 3px !important")
    });
    $(".panel-body td > .ui_form").each(function() {
        $(this).attr("style", "padding-top: 0 !important")
    });
    $(".panel-body > a.ui_link").each(function(d, c) {
        $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
        $(this).text($(this).text().replace(/\.$/, ""));
        $(this).parent().contents().filter(function() {
            return this.nodeType == 3
        }).remove();
        if (($(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text())
        }
        if (($(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text())
        }
        if (($(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text())
        }
    });
    $.each($('td.td_tag:contains("|")'), function() {
        $(this).find('a[href^="edit_"]').addClass("ui_link_replaced btn btn-success btn-xxs").css("margin-right", "3px").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil">&nbsp;</i>');
        $(this).find('a:not([href^="edit_"])').remove();
        $(this).parents("table").find("thead > tr > th:eq(2)").addClass("pointer-events-none").html("")
    });
    $('td.td_tag:contains("|")').contents().filter(function() {
        return this.nodeType == 3
    }).remove()
}
f__lnk_t_btn(["/sysinfo.cgi", "/virtual-server/edit_newchangelog.cgi", "/server-manager/edit_newchangelog.cgi"], "#newfeatures-virtual-server-collapse dt, #newfeatures-server-manager-collapse dt, .table td dt", "a", "btn btn-link btn-link-bordered btn-xxs margined-left-3 vertical-align-top margined-top-2", "fa-eye", "|", "");
f__lnk_t_btn(["/virtual-server/", "/virtual-server/index.cgi", "/virtual-server/edit_plan.cgi"], "form table tbody td", 'a[href*="list_users.cgi?"], a[href*="list_aliases.cgi?"]', "btn btn-transparent btn-transparent-link-force btn-borderless btn-xxs vertical-align-top margined-top-2", 0, "(~)", " ~ ", "(~..)");
f__lnk_t_btn(["/quota/", "/quota/index.cgi"], ".table tbody td.td_tag", 'a[href*="activate.cgi"][href*="&active=3"]', "btn btn-warning btn-xxs vertical-align-top margined-top-2", "fa-ban");
f__lnk_t_btn(["/quota/", "/quota/index.cgi"], ".table tbody td.td_tag", 'a[href*="activate.cgi"][href*="&active=0"]', "btn btn-success btn-xxs vertical-align-top margined-top-2", "fa-check-circle-o");
f__lnk_t_btn(["/virtualmin-google-analytics/", "/virtualmin-google-analytics/index.cgi"], ".table tbody td.td_tag", 'a[href*="edit.cgi"]', "btn btn-warning btn-xxs vertical-align-top margined-top-2", "fa-pencil-square");
f__lnk_t_btn(["/apache/", "/apache/index.cgi"], ".table tbody tr td:last-child", "a.ui_link", "btn btn-transparent btn-link-bordered btn-xxs vertical-align-top margined-top-2", "fa-external-link");
if ($('body[class*="status"]').length && $__source_file == "edit_mon.cgi" || $current_page_full == $_____link_full + "/virtual-server/list_sched.cgi" || $current_page_full == $_____link_full + "/ldap-server/edit_schema.cgi" || $current_page_full == $_____link_full + "/software/list_pack.cgi" || $current_page_full == $_____link_full + "/mailboxes/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/list_folders.cgi" || $current_page_full == $_____link_full + "/phpini/" || $current_page_full == $_____link_full + "/phpini/index.cgi" || $current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi" || $current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi" || $current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/virtualmin-awstats/index.cgi" || $current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi") {
    $.each($('tr td:last-child:contains("|")'), function() {
        if ($current_page_full == $_____link_full + "/virtual-server/list_sched.cgi") {
            $(this).find('a[href^="backup_form.cgi"]').html($(this).find('a[href^="backup_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="restore_form.cgi"]').html($(this).find('a[href^="restore_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-reply" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="backuplog.cgi"]').html($(this).find('a[href^="backuplog.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-file-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if ($current_page_full == $_____link_full + "/ldap-server/edit_schema.cgi") {
            $(this).find('a[href^="view_sfile.cgi"]').html($(this).find('a[href^="view_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="edit_sfile.cgi"]').html($(this).find('a[href^="edit_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if ($current_page_full == $_____link_full + "/phpini/" || $current_page_full == $_____link_full + "/phpini/index.cgi") {
            $(this).find('a[href^="list_ini.cgi"]').html($(this).find('a[href^="list_ini.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="edit_manual.cgi"]').html($(this).find('a[href^="edit_manual.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("ui_link").prepend('<i class="fa fa-fw fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if ($current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi") {
            $(this).find('a[href^="edit_hdparm.cgi"]').html($(this).find('a[href^="edit_hdparm.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link");
            $(this).find('a[href*="smart-status/index.cgi"]').html($(this).find('a[href*="smart-status/index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link");
            $(this).find('a[href^="blink.cgi"]').html($(this).find('a[href^="blink.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link")
        }
        if ($current_page_full == $_____link_full + "/mailbox/list_folders.cgi") {
            $(this).find('a[href^="index.cgi"]').html($(this).find('a[href^="index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="edit_auto.cgi"]').html($(this).find('a[href^="edit_auto.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-recycle" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="copy_form.cgi"]').html($(this).find('a[href^="copy_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-clone" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if ($current_page_full == $_____link_full + "/mailboxes/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/view_mail.cgi") {
            $(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').html($(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href*="detach.cgi"][target="_blank"]').html($(this).find('a[href*="detach.cgi"][target="_blank"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-external-link" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href*="&save=1"]:not([target="_blank"])').html($(this).find('a[href*="&save=1"]:not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-download" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
        if ($current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/virtualmin-awstats/index.cgi") {
            $(this).find('a[href^="view.cgi"]').html($(this).find('a[href^="view.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="config.cgi"]').html($(this).find('a[href^="config.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        }
    });
    if ($('body[class*="status"]').length && $__source_file == "edit_mon.cgi") {
        $('a[href*="edit_mon.cgi?id"]').addClass("ui_link_replaced btn btn-default btn-xxs").removeClass("heighter-34").removeClass("ui_link");
        $('a[href*="edit_mon.cgi?id"]').last().css("margin-left", "-1px");
        $('tr td:last-child:contains("|")').replaceText(/\|/gi, "")
    } else {
        $('tr td:last-child:contains("|")').contents().filter(function() {
            return this.nodeType == 3
        }).remove()
    }
    if ($current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi") {
        $("body").find('a[href^="blink.cgi"]:not(.ui_link_replaced)').html($("body").find('a[href^="blink.cgi"]:not(.ui_link_replaced)').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").removeClass("ui_link")
    }
    if ($current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi") {
        $.each($("tr td:last-child"), function() {
            $(this).find('a[href^="backup.cgi"]').html($(this).find('a[href^="backup.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
            $(this).find('a[href^="kill.cgi"]').html($(this).find('a[href^="kill.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-danger btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-trash-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        })
    }
    if ($current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi") {
        $.each($("tr td:last-child"), function() {
            $(this).find('a[href*="save_log.cgi"][href*="view=1"]').html($(this).find('a[href*="save_log.cgi"][href*="view=1"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
        })
    }
    if ($current_page_full == $_____link_full + "/software/list_pack.cgi") {
        var __btn___str = 'td a.ui_link[href*="view.cgi"]';
        $(__btn___str).html('<i class="fa fa-fw fa-eye-fi fa-1_25x"></i>').addClass("ui_link_replaced btn btn-default btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 2px !important; margin-bottom: 0 !important; margin-right: 15px").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
    }
}
if ($current_page_full == $_____link_full + "/fdisk/edit_disk.cgi") {
    var __delete = [];
    $.each($(".panel-body > table.table.table-striped tbody tr"), function(a, b) {
        if ($(this).find("td:nth-child(3)").find('img[src*="images/use"]').length || $(this).find("td:nth-child(3)").find('img[src*="images/gap"]').length) {
            $(this).find("td:nth-child(3)").remove();
            __delete.push(a)
        }
    });
    if (!$.isEmptyObject(__delete)) {
        $(".panel-body > table.table.table-striped thead").find("th:nth-child(3)").remove();
        delete __delete
    }
}
if ($current_page_full == $_____link_full + "/virtual-server/edit_link.cgi") {
    $(".table-hardcoded").find('input[name="open"]').parent("td").parent("tr").remove()
}
if ($current_directory == $_____link + "init/") {
    $('.table.table-striped.table-condensed tr.tr_tag td.td_tag input[type="checkbox"]').each(function(d, c) {
        $(this).attr("style", "vertical-align: middle !important")
    })
}
if ($current_directory == $_____link + "proc/" || $source_path == $_____link + "proc/index.cgi") {
    if (($current_directory == $_____link + "proc/" && $__source_file && $__source_file.indexOf("index_") > -1) || $source_path == $_____link + "proc/index.cgi") {
        $("a.ui_link + b").addClass("btn").css("margin-left", "3px");
        $("b + a.ui_link").addClass("btn").css("margin-left", "3px");
        if ($('.panel-body > b:first-child:contains("Display")').length > 0) {
            $(".panel-body > b:first-child").remove()
        }
        $(".panel-body > b").addClass("btn btn-success")
    }
    $(".panel-body").contents().filter(function() {
        return this.nodeType == 3
    }).remove();
    $(".panel-body > a.ui_link").addClass("btn").css("margin-left", "3px")
}
if ($source_path == $_____link + "proc/edit_proc.cgi") {
    $("#signal").attr("style", "margin-bottom: 0 !important;")
}
if ($current_directory == $_____link + "procmail/") {
    $(".panel-body p:first-child").next("p").contents().filter(function() {
        return this.nodeType == 3
    }).remove();
    $(".panel-body p:last-child").prev("a.ui_link").remove()
}
if ($current_directory == $_____link + "cron/" || $source_path == $_____link + "cron/index.cgi") {
    $('.panel-body form.ui_form[action="index.cgi"]').next("script").next("b").next("p").contents().filter(function() {
        return this.nodeType == 3
    }).remove()
}
if ($current_directory == $_____link + "filter/") {
    $(".panel-body > b").next("p").contents().filter(function() {
        return this.nodeType == 3
    }).remove()
}
if ($current_directory == $_____link + "dhcpd/") {
    $(".panel-body > p").contents().filter(function() {
        return this.nodeType == 3
    }).remove()
}
if ($current_directory == $_____link + "htaccess-htpasswd/" || $current_directory == $_____link + "forward/") {
    $("td table.table-hardcoded.table.table-subtable").removeClass("table-striped")
}
$(".ui_buttons_hr > td > table.table-hardcoded > tbody > tr > td[nowrap]").each(function() {
    $(this).parents("table").attr("style", "margin-bottom: 15px !important")
});
$("textarea.form-control.ui_textarea").next('button[type="button"].btn-default').each(function() {
    $(this).prev("textarea").attr("style", "margin-bottom: 1px !important");
    $(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
});
$("textarea.form-control.ui_textarea").next("br").next('button[type="button"].btn-default').each(function() {
    $(this).prev("textarea").attr("style", "margin-bottom: 1px !important");
    $(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
});
$(".table-hardcoded > tbody > tr > td > input.form-control.ui_textbox").next('button[type="button"].ui_button').each(function() {
    $(this).attr("style", "margin-top: 2px !important")
});
$(".table-hardcoded > tbody > tr > td.col_label b a, .ui_table_row td a").each(function(d, c) {
    if (!$(this).attr("href")) {
        $(this).attr("style", "color: #333; text-decoration: none; cursor:default")
    }
});
$('input[name="all_weekdays"], .ui_grid_cell > table.table-condensed, table.table-hardcoded table.table-condensed, select[multiple][name="days"]').each(function() {
    $(this).parent("td").attr("style", "vertical-align: top !important; padding-left:2px; padding-right:2px;")
});
$('input[type="submit"]').each(function() {
    $(this).addClass("btn btn-default")
});
$("table tr th").each(function() {
    if ($(this).text()) {
        $(this).attr("style", "width: auto")
    }
});
$("table thead th:not(.table-title)").each(function() {
    $(this).css("border-top", "none");
    $(this).css("border-bottom", "none")
});
if ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {
    !$("body").hasClass("file-manager") && $("body").addClass("file-manager");
    $("#headln2l").prepend("<a onClick='window.open(\"" + $_____link_full + '/help.cgi/authentic-theme/file-manager", "help", "toolbar=no,menubar=no,scrollbars=yes,width=600,height=400,resizable=yes"); return false\' href="' + $_____link_full + '/help.cgi/authentic-theme/file-manager"></a>')
}
var $table_header_links = $(".panel-heading > table.header > tbody > tr > td > a");
$.each($table_header_links, function() {
    if ($(this).attr("href") && $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href") == $__current_directory || ($(this).attr("href").indexOf("index.cgi") > -1 && $current_directory == $_____link + "openvpn/") || ($(this).attr("href").indexOf("index.cgi?") > -1 && $current_directory == $_____link + "spam/") || $(this).attr("href").indexOf("restart_zone.cgi") > -1 || $(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1 || $(this).attr("href").indexOf("start.cgi") > -1 || $(this).attr("href").indexOf("stop.cgi") > -1 || ($(this).attr("href") == "//" && ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi")) || $(this).attr("href").indexOf("delete_") > -1 || $(this).attr("href").indexOf("list_mail.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1 || $(this).attr("href").indexOf("help.cgi") > -1) {
        $.each($(this).next("br"), function() {
            $(this).remove()
        });
        $.each($(this).prev("br"), function() {
            $(this).remove()
        });
        if ($(this).attr("href").indexOf("help.cgi") > -1) {
            var d = $(this),
                c = $(this).parent("td");
            $(this).remove();
            c.append(d)
        }
        if ($(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href") == $__current_directory || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1) {
            $iconized_class = "fa-arrow-left";
            $(this).data("title", "").data("back", 1)
        } else {
            if ($(this).attr("href") == "//" && ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi")) {
                $iconized_class = "fa-arrow-left";
                $(this).attr("href", ($_____link_full + "/webmin/edit_themes.cgi")).data("title", "").data("back", 1)
            } else {
                if ($(this).attr("href").indexOf("config.cgi") > -1) {
                    $iconized_class = "fa-cog";
                    $(this).data("title", "")
                } else {
                    if ($(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1) {
                        $iconized_class = "fa-refresh"
                    } else {
                        if ($(this).attr("href").indexOf("restart_zone.cgi") > -1) {
                            $iconized_class = "fa-retweet"
                        } else {
                            if ($(this).attr("href").indexOf("start.cgi") > -1) {
                                $iconized_class = "fa-play"
                            } else {
                                if ($(this).attr("href").indexOf("stop.cgi") > -1) {
                                    $iconized_class = "fa-square"
                                } else {
                                    if ($(this).attr("href").indexOf("man/search.cgi") > -1) {
                                        $iconized_class = "fa-search"
                                    } else {
                                        if ($(this).attr("href").indexOf("delete_") > -1) {
                                            $iconized_class = "fa-trash-o"
                                        } else {
                                            if ($(this).attr("href").indexOf("list_mail.cgi") > -1) {
                                                $iconized_class = "fa-inbox"
                                            } else {
                                                if ($(this).attr("href").indexOf("index.cgi") > -1 && $current_directory == $_____link + "openvpn/") {
                                                    $iconized_class = "fa-cogs"
                                                } else {
                                                    if ($(this).attr("href").indexOf("index.cgi?") > -1 && $current_directory == $_____link + "spam/") {
                                                        $iconized_class = "fa-arrow-left";
                                                        $(this).data("back", 1)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var e = $(this).attr("href").indexOf("help.cgi") > -1;
        if (e) {
            $iconized_class = "fa-question-circle";
            $(this).data("title", "")
        }
        $(this).data("toggle", "tooltip").data("title", upperFirstLowerAll(e ? lang("theme_xhred_global_help") : ($(this).data("back") === 1 ? (!is__m($g__o__f_m) ? lang("theme_xhred_global_prev_page") : "") : $(this).text()))).attr("data-container", "body").addClass("btn btn-link text-lighter").removeClass("ui_link").append('<i class="fa ' + $iconized_class + '"></i>');
        $(this).contents().filter(function() {
            return this.nodeType == 3
        }).remove();
        $(this).tooltip({
            container: "body",
            placement: "auto top",
            delay: {
                show: 800,
                hide: 30
            }
        });
        if ((($current_directory == $_____link + "apache/" || $current_directory == $_____link + "proftpd/") && ($(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1)) || $(this).parent("td").find("a") && $(this).parent("td").find("a").length == 1 || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1) {
            if (($(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1) && $("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {
                $(this).attr("style", "margin-right: 0 !important; padding: 6px 12px")
            } else {
                $(this).attr("style", "margin-right: 0 !important")
            }
        }
    }
    $("#headln2l").removeClass("invisible")
});
$("body").on("click", "#headln2l a", function(a) {
    if (unbuffered_header()) {
        return
    }
    if ($(this).find(".fa-arrow-left").length) {
        a.preventDefault();
        a.stopPropagation();
        window.history.back()
    }
});
if ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi") {
    if (t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').length) {
        t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').attr("href", t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').attr("href").split("?")[0] + "?" + (new Date()).getTime())
    }
    if (t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').length) {
        t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').attr("src", t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').attr("src").split("?")[0] + "?" + (new Date()).getTime())
    }
    $("body").on("click", 'a[href="/settings-editor_read.cgi"], a[href="/settings-upload.cgi"]', function() {});
    setTimeout(function() {
        $(".file-editor-saved").remove();
        $(".file-editor-save").removeClass("hidden")
    }, 2400);
    if ($__relative_url == "/settings-upload.cgi?saved=1") {
        $.each($(".file_chooser_button_preview:first"), function() {
            if (!$(this).hasClass("disabled")) {
                if (t__wi_p.$("aside + .__logo").length) {
                    t__wi_p.$('.__logo img[src*="/images/logo.png"]').attr("src", t__wi_p.$('.__logo img[src*="/images/logo.png"]').attr("src").split("?")[0] + "?" + (new Date()).getTime());
                    t__wi_p.$("aside + .__logo").attr("style", "transform: translate(0px, 0px);");
                    setTimeout(function() {
                        t__wi_p.$(".__logo").transition({
                            y: "-140px"
                        }, 1200)
                    }, 400)
                } else {
                    t__wi_p.$("aside").after('<div class="__logo _logo" style="transform: translate(0px, 0px);"><img src="' + $webprefix + "/images/logo.png?" + (new Date()).getTime() + '"></div>');
                    setTimeout(function() {
                        t__wi_p.$(".__logo").transition({
                            y: "-140px"
                        }, 1200)
                    }, 400)
                }
            } else {
                t__wi_p.$("aside + .__logo").remove()
            }
        })
    }
    $("body").on("click", ".page_footer_ajax_submit:not(.disabled):not(.file-editor-saved)", function() {
        f__mgk_sp($(this), [1.5, -28, "small", false])
    });
    setTimeout(function() {
        if ($source_path == $_____link + "settings-editor_read.cgi") {
            $(".end_submits").parent("td").after('<td style="text-align: right;"><a class="btn btn-default page_footer_ajax_submit pull-right" style="margin-top: 5px; margin-right: -2px;" id="edit_logos" href="' + $_____link_full + '/settings-upload.cgi" data-original-title="" title=""><i class="fa fa-fw fa-file-image-o" style="margin-right:5px;"></i>Theme logos</a>').parents(".ui_form_end_buttons").css("width", "100%")
        }
        $(".btn-group.end_submits").css("margin-left", "2px")
    }, 100)
}
if ($source_path == $_____link + "settings-upload.cgi") {
    $(function() {
        $_authenticated_logo = $('input[name="authenticated_logo"]:checked').val();
        $_unauthenticated_logo = $('input[name="unauthenticated_logo"]:checked').val();

        function c(a) {
            typeof a == "undefined" ? a = $('input[name="authenticated_logo"]:checked') : false;
            var b = ["authenticated_logo_file"];
            if (a.val() != "1") {
                $.each(b, function(e, h) {
                    $('input[name="' + h + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
                })
            } else {
                $.each(b, function(e, h) {
                    $('input[name="' + h + '"]').parents(".file-input-wrapper").removeClass("disabled");
                    if ($_authenticated_logo == "1") {
                        $('input[name="' + h + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
                    }
                })
            }
        }
        c();
        $('input[name="authenticated_logo"]').on("change", function() {
            c($(this))
        });

        function d(a) {
            typeof a == "undefined" ? a = $('input[name="unauthenticated_logo"]:checked') : false;
            var b = ["unauthenticated_logo_file"];
            if (a.val() != "1") {
                $.each(b, function(e, h) {
                    $('input[name="' + h + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
                })
            } else {
                $.each(b, function(e, h) {
                    $('input[name="' + h + '"]').parents(".file-input-wrapper").removeClass("disabled");
                    if ($_unauthenticated_logo == "1") {
                        $('input[name="' + h + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
                    }
                })
            }
        }
        d();
        $('input[name="unauthenticated_logo"]').on("change", function() {
            d($(this))
        })
    });
    $(".file_chooser_button_preview").on("mouseout", function(b) {
        $(this).css("background", "white")
    }).on("mouseover", function(b) {
        $(this).css("background", "#eee")
    });
    $.each($(".file_chooser_button_preview"), function() {
        if ($(this).data("image")) {
            $(this).popover({
                trigger: "hover",
                html: true,
                content: function() {
                    return "<img src='" + $(this).data("image") + "'>"
                }
            })
        }
    });
    var $__webmin_path = $('a[href^="/settings-editor_read.cgi?file=%path%"]');
    $__webmin_path.attr("href", $__webmin_path.attr("href").replace("%path%", $("#path").val()))
}
$.each($('td.ui_grid_cell:contains("|")'), function() {
    $(this).contents().filter(function() {
        return this.nodeType == 3
    }).remove()
});
$('a[href*="help.cgi"][onclick], a[href*="showpass.cgi?"][onclick]').attr("onclick", "").unbind("click").addClass("help_popup");
$(".help_popup").each(function() {
    $(this).attr("style", "color: #333; text-decoration: none; cursor:help")
});

function module_help_focuser(a) {
    $.each($(".module-help"), function(b, c) {
        if (!a.is($(this))) {
            $(this).css({
                "z-index": (214748364 - b),
                opacity: 0.85
            })
        } else {
            $(this).css({
                "z-index": (214748364 + b),
                opacity: 1
            })
        }
    })
}
$("body").on("click", function(a) {
    if ($(a.target).is(".close-popover-trigger")) {
        $(a.target).parent().parent().popover("hide")
    }
    $(".showpass-popover").each(function() {
        if (!$(this).is(a.target) && $(this).has(a.target).length === 0 && $(".popover").has(a.target).length === 0) {
            $(this).popover("hide")
        }
    })
});
$(".help_popup").on("click", function(f) {
    f.stopPropagation();
    f.preventDefault();
    var h = $(this),
        g = $(this).attr("href"),
        e = $(this).parents("td");
    e.append('<div class="_tmp_help_content hidden"></div>');
    t__wi_p.$___ajax_requested_url = "help.cgi";
    $.ajax({
        type: "POST",
        url: h.attr("href"),
        data: false,
        dataType: "text",
        success: function(b) {
            e.find("._tmp_help_content").html(b.replace(/<(script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, ""));
            $help_title = e.find("._tmp_help_content .ui_subheading").first().text();
            $help_body = e.find("._tmp_help_content title").remove();
            $help_body = e.find("._tmp_help_content h3.ui_subheading").remove();
            $help_body = e.find("._tmp_help_content h3").addClass("h3_help");
            $help_body = e.find("._tmp_help_content hr").remove();
            var a = e.find("._tmp_help_content a");
            if (typeof a.attr("href") != "undefined") {
                $.each(a, function() {
                    var i = $(this).attr("href");
                    if (i.startsWith("http")) {
                        $help_body = e.find("._tmp_help_content a").attr("target", "_blank").css("text-decoration", "none").css("font-style", "italic")
                    } else {
                        $("body").undelegate('a[href="' + i + '"]', "click");
                        $("body").one("click", 'a[href="' + i + '"]', function(k) {
                            if ($(k.target).is($('a[href="' + i + '"]'))) {
                                k.preventDefault();
                                var j = (removeLastDirectoryPartOf(h.attr("href")) + "/" + i);
                                $('a[href="' + g + '"].help_popup').attr("data-initial", g).attr("data-substituted", j);
                                $('a[href="' + g + '"].help_popup').attr("href", j);
                                h.trigger("click")
                            }
                        })
                    }
                })
            }
            $help_body = e.find("._tmp_help_content").html();
            e.find("._tmp_help_content").remove();
            var d = '<button type="button" class="close pull-right close-popover-trigger font-size-120p">&times;</button>',
                c = (h.attr("href").indexOf("showpass.cgi") > -1);
            if (c) {
                d = ""
            }
            h.popover({
                html: true,
                container: "body",
                template: '<div class="popover module-help' + (c ? " showpass-popover" : "") + '" role="tooltip" style="z-index: ' + (2147483642 + ($(".module-help").length * 10)) + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                title: function() {
                    return (d + $help_title)
                },
                content: function() {
                    return $help_body
                },
                placement: "auto right"
            });
            h.popover("show");
            h.on("shown.bs.popover", function() {
                if ($help_body.indexOf("<ad>") > -1) {
                    $(".popover").animate({
                        "max-width": "540px"
                    }, 300)
                }
                $("body").find(".popover:visible").addClass("module-help");
                $('body[class*="' + $g__o__f_m + '"]').find(".popover:visible").addClass("file-manager-help");
                if ($current_page_full && $current_page_full.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search != "?updating-webmin-theme") {
                    $("body").find(".popover:visible").addClass("at-help");
                    var n = $(".link-theme").text(),
                        k = $(".link-theme2").text(),
                        j = $(".link-changelog").text(),
                        i = $(".link-me").text(),
                        o = $(".link-donation").text(),
                        m = $(".link-youtube").text(),
                        l = $(".link-github").text();
                    $(".link-theme").replaceWith('<a href="https://github.com/qooob/authentic-theme" target="_blank"><em>' + n + "</em></a>");
                    $(".link-theme2").replaceWith('<a href="https://github.com/qooob/authentic-theme" target="_blank"><em>' + k + "</em></a>");
                    $(".link-changelog").replaceWith('<a href="https://github.com/qooob/authentic-theme/blob/18/CHANGELOG.md" target="_blank" class="label label-default pull-right link-changelog"><em class="fa fa-fw fa-history" style="font-size: 90%">&nbsp;&nbsp;<span class="font-family-default">' + j + "</span></em></a>");
                    $(".link-changelog").detach().appendTo(".at-help .popover-title");
                    $(".link-me").replaceWith('<a href="http://rostovtsev.ru" target="_blank"><em>' + i + "</em></a>");
                    $(".link-donation").replaceWith('<a target="_blank" class="badge fa fa-fw fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;lc=us&amp;business=programming%40rostovtsev%2eru&amp;currency_code=USD&amp;bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> <span class="font-family-default">' + o + "</span></a>");
                    $(".link-youtube").replaceWith('<a title="" data-original-title="" class="badge label-danger fa fa-fw fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> <span class="font-family-default">' + m + "</span></a>");
                    $(".link-github").replaceWith('<a title="" data-original-title="" class="badge fa fa-fw fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> <span class="font-family-default">' + l + "</span></a>")
                }
                setTimeout(function() {
                    $.each($(".module-help"), function() {
                        if (!$(this).is(h.next(".module-help"))) {
                            ($(".module-help").length > 1) ? $(this).css("opacity", 0.85): $(this).css("opacity", 1)
                        } else {
                            $(this).animate({
                                opacity: 1
                            }, 600);
                            module_help_focuser($(this))
                        }
                    })
                }, 100)
            });
            h.on("hidden.bs.popover", function() {
                $("body").undelegate(":not(tt)", "click");
                if (h.attr("data-initial")) {
                    h.attr("href", h.attr("data-initial"));
                    h.removeAttr("data-initial").removeAttr("data-substituted")
                }
            })
        }
    })
});
$("body").on("click", ".module-help", function(a) {
    module_help_focuser($(this))
});
if ($current_directory == $_____link + "fdisk/" || $current_directory == $_____link + "postfix/" || $current_directory == $_____link + "pam/" || $current_directory == $_____link + "syslog/") {
    $("p > a[href], table + a[href], div.panel-body > a.ui_link").each(function(d, c) {
        $(this).text($(this).text().replace(/\.$/, ""))
    })
}
$('.panel-body > form > p > a.ui_link, .panel-body > table.table + a.ui_link, .panel-body > p > a:not([href*="config.cgi?bacula-backup"]), body[data-current-product="usermin"] div.panel-body > p > a, div.panel-body > a[href^="edit_"]:not([href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_form > a, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a.ui_link:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_grid_cell > a.select_all, .ui_grid_cell > a.select_invert, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a[href*=".cgi"]:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="], [href^="edit_group.cgi?group="]), .ui_grid_cell > a[href*=".cgi"]:first-child:not([href^="edit_rpc.cgi"],[href^="edit_nuser.cgi"],[href*="edit_user.cgi?idx"]), .tab-pane > p > a, .tab-pane > a.ui_link, .tab-pane > .table-condensed > a.ui_link, .tab-pane > a, .panel-body > p > a.ui_link, a.select_all, a.select_invert, form[action="delete.cgi"] > table table.ui_grid_table + a').each(function() {
    if (is__mf("samba", "edit_epass.cgi") || (is__m("acl") && ($(this).is('[href^="edit_user.cgi?user="]') || $(this).parent("td.ui_grid_cell").length) && !$(this).parents("b").length)) {
        return
    }
    if (!is__mf("virtual-server", "history.cgi") && !is__mf("server-manager", "one_history.cgi") && $current_directory != $_____link + "passwd/" && $(this).text() && $current_page_full != $_____link_full + "/mailboxes/" && $current_page_full != $_____link_full + "/mailboxes/index.cgi" && $current_page_full != $_____link_full + "/usermin/list_configs.cgi" && !$(this).hasClass("help_popup")) {
        $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced");
        $(this).text($(this).text().replace(/\.$/, ""));
        var b = $(this).parent().contents().filter(function() {
            return this.nodeType == 3
        });
        if (b) {
            $.each(b, function() {
                if ($(this).text() && $(this).text().length <= 3) {
                    $(this).remove()
                }
            })
        }
        if ($(this).hasClass("select_all")) {
            $(this).html('<i class="fa fa-fw fa-check-square-o"> </i> ' + $(this).text())
        }
        if ($(this).hasClass("select_invert")) {
            $(this).html('<i class="fa fa-fw fa-share-square-o"> </i> ' + $(this).text())
        }
        if ($(this).attr("href") && (($(this).attr("href").indexOf("edit") === 0 && $(this).attr("href").indexOf("edit_allow") !== 0) || $(this).attr("href").indexOf("master_form") === 0 || $(this).attr("href").indexOf("slave_form") === 0 || $(this).attr("href").indexOf("stub_form") === 0 || $(this).attr("href").indexOf("forward_form") === 0 || $(this).attr("href").indexOf("delegation_form") === 0 || $(this).attr("href").indexOf("mass_form") === 0 || $(this).attr("href").indexOf("newdb_form") === 0)) {
            $(this).html('<i class="fa fa-fw fa-plus-square-o"> </i> ' + $(this).text())
        } else {
            if ($(this).attr("href") && $(this).attr("href").indexOf("edit_allow") === 0) {
                $(this).html('<i class="fa fa-fw fa-shield"> </i> ' + $(this).text())
            } else {
                if ($(this).attr("href") && $(this).attr("href").indexOf("mass_ucreate") === 0) {
                    $(this).html('<i class="fa fa-fw fa-user"> </i> ' + $(this).text())
                }
            }
        }
        if ($current_directory == $_____link + "custom/") {
            if (($(this).attr("href") && $(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
                $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text())
            }
            if (($(this).attr("href") && $(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
                $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text())
            }
            if (($(this).attr("href") && $(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
                $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text())
            }
        }
        if (!$(this).attr("href")) {
            $(this).remove()
        }
    }
});
$.each($(".btn-tiny.ui_link_replaced"), function() {
    if ($(this).prev('[class="table table-striped table-condensed"]').length && $(this).next(':not(".ui_link_replaced")').length) {
        $(this).removeClass("btn-tiny ui_link_replaced").addClass("ui_link_re-replaced")
    }
});
$("a.ui_link_replaced").each(function() {
    if ($(this).prev().is("b")) {
        $(this).prev("b").addClass("btn btn-success btn-tiny")
    }
    if ($(this).next().is("b")) {
        $(this).next("b").addClass("btn btn-success btn-tiny")
    }
});
$("a.ui_link_replaced").each(function() {
    if ($(this).next().is("a.ui_link_replaced") && !$(this).hasClass("select_all") && !$(this).hasClass("select_invert")) {
        $(this).next("a.ui_link_replaced").not(".btn-xxs");
        return false
    } else {
        if ($(this).prev().is("a.ui_link_replaced") && !$(this).hasClass("select_all") && !$(this).hasClass("select_invert")) {
            $(this).prev("a.ui_link_replaced").not(".btn-xxs");
            return false
        }
    }
});
if ($current_directory == $_____link + "fetchmail/") {
    $("a.ui_link").each(function() {
        $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").css("margin-bottom", "10px").css("margin-top", "4px");
        $(this).text($(this).text().replace(/\.$/, ""));
        $(this).parent().contents().filter(function() {
            return this.nodeType == 3
        }).remove()
    })
}
$('select.ui_select[name="days"]').each(function() {
    $(this).parent("td").attr("style", "vertical-align: top !important")
});
if ($current_directory == $_____link + "mailboxes/" || $current_page_full == $_____link_full + "/mailboxes/index.cgi" || $current_directory == $_____link + "mailbox/" || $current_page_full == $_____link_full + "/postfix/view_mailq.cgi") {
    if (!$__source_file) {
        $(".ui_form_end_submit").css("margin-top", "0");
        $("input#user").addClass("heighter-34 vertical-align-top")
    } else {
        if ($__source_file == "list_mail.cgi") {
            $('input:not([type="checkbox"]), .ui_form_end_submit, select').addClass("heighter-34").removeClass("heighter-28").css("margin-bottom", "-1px")
        }
    }
    $("body").find("form").removeAttr("onsubmit");
    $header_tables = $("body").find('input[name="from"]').parents(".tab-pane").parent("td");
    $header_tables.children("table").hide();
    $.each($header_tables.find("input, textarea, select"), function() {
        if (!$(this).hasClass("ui_select") && !$(this).attr("onclick") && $(this).attr("type") != "checkbox" && $(this).attr("type") != "submit") {
            $(this).attr("style", "width: 60%").addClass("inline-block")
        }
        if ($(this).attr("onclick")) {
            $(this).addClass("inline-block")
        }
    });
    t___wi.onbeforeunload = null;
    if ($("body").find('input.ui_hidden[name="html_edit"]').val() == 1) {
        __init_ck_(["body", 2, false, "edit_web"])
    }
    $("body").find('input[name="from"]').parents(".tab-pane").prev("table").remove();
    $("body").find('input[name="from"]').parents(".tab-pane ").parent("td").find("div, table").each(function(d, c) {
        $(this).find(".col_label").css("width", "20%");
        $(this).find('input[name="subject"]').parent("td").prev("td").find("b").attr("style", "font-size: 13px !important");
        $(this).find('input[name="subject"]').parents("table").show();
        $(this).find('input[name="subject"]').parent("td").find(".submitter").remove()
    });
    $editor_mode_link_container = $("body").find('textarea[id="body"]').parents("table").find("thead > tr > th:last-child");
    $editor_mode_link = $editor_mode_link_container.find("a").addClass("editor_mode_link");
    $editor_mode_link_container.parent("tr").find("th:first-child").append($editor_mode_link);
    $editor_mode_link_container.remove();
    $editor_mode_link_button = $("body").find('textarea[id="body"]').parents("table").find(".editor_mode_link");
    $editor_mode_link_button_state = $editor_mode_link_button.attr("href") ? $editor_mode_link_button.attr("href").indexOf("html=0") : false;
    $editor_mode_link_button.attr("title", $editor_mode_link_button.text()).addClass("editor_mode_link_button pull-right btn btn-sm " + ($editor_mode_link_button_state == -1 ? "btn-success" : "btn-primary")).html('<i class="fa ' + ($editor_mode_link_button_state == -1 ? "fa-font" : "fa-text-width") + '"> </i>');
    $("body").find('textarea[id="body"]').parents("table").find("thead > tr > th").find("b").css("padding-left", "45px");
    $(".editor_mode_link_button").tooltip();
    $fileinput_container = $("body").find('a[onclick="return add_ss_attachment()"]');
    $fileinput_container.parent("td").contents().filter(function() {
        return this.nodeType == 3
    }).remove();
    $fileinput_container.remove();
    $fileinput_add_another_attachment = $("body").find('a[onclick="return add_attachment()"]');
    $fileinput_add_another_attachment.addClass("btn btn-default");
    $fileinput_add_another_attachment.text($fileinput_add_another_attachment.text().replace(/\.$/, ""));
    if ($current_page_full.indexOf("view_mail.cgi") > -1 || $current_page_full.indexOf("view_mailq.cgi") > -1) {
        $table_title_header_container = $(".ui_form").find("div.table-responsive").first().find(".table-title");
        $table_title_links_container = $table_title_header_container.next();
        $table_title_links_container.contents().filter(function() {
            return this.nodeType == 3
        }).remove();
        $table_title_links_container.find("a").addClass("table_title_links pull-right btn btn-info btn-tiny");
        $table_title_links = $table_title_links_container.html();
        $table_title_header_container.append($table_title_links);
        $table_title_links_container.remove();
        $table_title_header_container_text_padding = 35;
        $(".table-title > a.table_title_links").each(function() {
            $table_title_header_container_text_padding = ($current_page_full == $_____link_full + "/postfix/view_mailq.cgi" ? 120 : 235)
        });
        $(".table_title_links_container a").each(function() {
            $table_title_header_container_text_padding = $table_title_header_container_text_padding + $(this).width()
        });
        $table_title_header_container.find("b").css("padding-left", $table_title_header_container_text_padding);
        $table_title_second_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("table:first-child");
        $table_title_header_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th:first-child");
        $table_title_links_container = $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th:last-child");
        if ($(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("th").length == 2) {
            $table_title_links_container.remove()
        } else {}
        $table_title_links_container.find("a").addClass("table_title_links pull-right btn btn-tiny");
        if ($table_title_links_container.find("a").attr("href") && $table_title_links_container.find("a").attr("href").indexOf("body=1") > -1) {
            $table_title_links_container.find("a").addClass("btn-info")
        } else {
            $table_title_links_container.find("a").addClass("btn-warning")
        }
        $table_title_links = $table_title_links_container.html();
        $table_title_header_container.append($table_title_links);
        $table_title_header_container_text_padding = 10;
        $table_title_header_container.find("a").each(function() {
            $table_title_header_container_text_padding = $table_title_header_container_text_padding + $(this).width()
        });
        setTimeout(function() {
            if ($(".ui_form").find("div.table-responsive").first().find("table:first-child").outerWidth() != $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("table:first-child").outerWidth()) {
                var b = parseInt($(".ui_form").find("div.table-responsive").first().find("table:first-child").width() / 2);
                $table_title_second_container.find(".table-title").addClass("left").find("b").css("padding-left", b - 175);
                $table_title_second_container.find(".pull-right").removeClass("pull-right").addClass("pull-left")
            }
            $.each($table_title_second_container.find("table"), function() {
                $(this).removeClass().addClass("clear-formatting");
                $.each($(this).find("td.col_value"), function() {
                    $(this).css("background-color", "white")
                })
            })
        }, 30);
        $table_title_header_container.find("b").css("padding-left", $table_title_header_container_text_padding);
        if ($table_title_header_container.find("b") && $table_title_header_container.find("b").length > 1) {
            if ($table_title_header_container.find("b:first-child").text() == $table_title_header_container.find("b:last-child").text()) {
                $table_title_header_container.find("b:last-child").remove()
            }
        }
    }
    $("td > a").on("click", function() {
        if ($(this).attr("onclick") == "return add_attachment()") {}
        $("input[type=file]").each(function() {
            if (!$(this).parent("a").hasClass("file-input-wrapper")) {
                $(this).bootstrapFileInput()
            }
        })
    });
    if (settings_mailbox_slash_delimiter) {
        $("select.ui_select[name] > option").each(function(d, c) {
            $(c).text($(c).text().replace(/\./g, "/").replace(/\/\//g, "/"))
        })
    }
    $.each($('table td[align="right"], table td[align="left"]'), function(d, c) {
        $(this).attr("style", "border: 0 !important;");
        $(this).parents("tbody").attr("style", "border: 0 !important;");
        $(this).parents("table.table-hardcoded.table.table-striped.table-condensed.table-subtable").removeClass("table-hardcoded table table-striped table-condensed table-subtable")
    });
    $.each($("div.table-responsive > table tbody tr td > table.table-hardcoded"), function(d, c) {
        $(this).find("tr > td.col_label > b").removeAttr("style");
        $(this).removeClass("table table-condensed")
    });
    $.each($("div.table-responsive > table tbody tr td > div.tab-pane"), function(d, c) {
        $(this).find("table").removeClass("table");
        $(this).parents("div.table-responsive").find("table").removeClass("table-striped table-subtable")
    });
    $.each($('div.table-responsive > table tbody tr td > div.tab-pane .col_value > input[type="button"][onclick^="ifield"]'), function(d, c) {
        $(this).attr("style", "margin-left: 0; margin-bottom: 3px !important")
    })
}
$.each($(".barchart"), function() {
    $(this).find("img").attr("height", 4)
});
$('#extended_sysinfo div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px");
$('#extended_sysinfo div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px").prev("table.table-condensed").prev("table.table.table-striped").addClass("invisible");
$("a").each(function() {
    if (!$(this).attr("href")) {
        $(this).addClass("no_effect")
    }
});
if ($current_page_full == $_____link_full + "/virtual-server/domain_form.cgi" || $current_page_full == $_____link_full + "/server-manager/list_images.cgi" || $current_page_full == $_____link_full + "/virtual-server/bwgraph.cgi") {
    $(".panel-body > a").each(function() {
        $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
        $(this).text($(this).text().replace(/\.$/, ""))
    });
    $.each($('.panel-body:contains("|")'), function() {
        $(this).contents().filter(function() {
            return this.nodeType == 3
        }).wrap('<span class="btn btn-info btn-tiny btn-automated"></span>')
    });
    $.each($(".btn-automated"), function() {
        if ($(this).text().replace(/[\t\n]+/g, " ").length < 4) {
            $(this).remove()
        } else {
            $(this).text($(this).text().replace("|", "").replace("|", "").replace(/(?:\r\n|\r|\n)/g, ""));
            if ($(this).prev().is("img")) {
                $(this).removeClass().addClass("margined-left-3")
            }
        }
    });
    $(".panel-body > b").css("margin-right", "7px");
    if ($current_page_full == $_____link_full + "/virtual-server/domain_form.cgi") {
        $.each($(".btn-automated, .ui_link_replaced"), function(c, d) {
            if (c == 0) {
                $(this).html('<i class="fa fa-fw fa-plus-square"> </i> ' + $(this).text())
            }
            if (c == 1) {
                $(this).html('<i class="fa fa-fw fa-level-down"> </i> ' + $(this).text())
            }
            if (c == 2) {
                $(this).html('<i class="fa fa-fw fa-reply fa-flip-horizontal"> </i> ' + $(this).text())
            }
            if (c == 3) {
                $(this).html('<i class="fa fa-fw fa-reply-all fa-flip-horizontal"> </i> ' + $(this).text())
            }
        })
    }
}
if ($current_page_full == $_____link_full + "/server-manager/edit_serv.cgi") {
    setTimeout(function() {
        $('.opener_container .table-hardcoded .col_value a[href^="edit_serv.cgi"]').each(function() {
            $(this).addClass("btn btn-inverse btn-xxs ui_link_replaced margined-right--2").removeClass("ui_link").attr("style", "margin-top: 0 !important");
            $(this).text($(this).text().replace(/\.$/, ""))
        });
        $.each($('.opener_container .table-hardcoded .col_value:contains("|")'), function() {
            if ($(this).find('a[href^="edit_serv.cgi"]').length) {
                $(this).contents().filter(function() {
                    return this.nodeType == 3
                }).wrap('<a class="btn btn-success btn-xxs ui_link_replaced btn-automated margined-right--2" style="margin-top: 0 !important"></a>')
            }
            $.each($(".btn-automated"), function() {
                if ($(this).text().length < 4) {
                    $(this).remove()
                } else {
                    $(this).text($(this).text().replace("|", "").replace("|", "").replace(/(?:\r\n|\r|\n)/g, ""))
                }
            })
        })
    }, 20)
}
if (settings_sysinfo_easypie_charts && $current_page_full == $_____link_full + "/sysinfo.cgi") {
    var isNR = ((__isNR || __isNM) ? 1 : 0);
    $("body").find(".page.__sytem_information").find(".piechart").easyPieChart({
        barColor: function(b) {
            return (b < 50 ? (isNR ? "#269373" : "#5cb85c") : b < 85 ? (isNR ? "#c38d40" : "#f0ad4e") : "#cb3935")
        },
        trackColor: (isNR ? "#3b424b" : "#f8f8f8"),
        scaleColor: (isNR ? "#3b424b" : "#dfe0e0"),
        size: settings_sysinfo_easypie_charts_size,
        scaleLength: settings_sysinfo_easypie_charts_scale,
        trackWidth: settings_sysinfo_easypie_charts_width,
        lineWidth: 0,
        lineCap: "square",
        onStep: function(f, d, e) {
            $(this.el).find(".percent").text(Math.round(e))
        }
    })
}
$.each($("input:not(.ui_upload)"), function() {
    if ($(this).css("height") == "28px") {
        $(this).prev("input").addClass("heighter-28")
    }
});
$.each($("select"), function() {
    if ($(this).next("input").css("height") == "34px") {
        $(this).addClass("heighter-34")
    }
});
$.each($(".ui_buttons_row input, .ui_buttons_row select"), function() {
    $(this).addClass("heighter-34")
});
if (is__mf("gnupg", "list_keys.cgi")) {
    $('input[id="id"]').addClass("heighter-34")
}
$.each($("tr > .ui_form"), function() {
    if ($(this).next().next("td").find("input.submitter")) {
        $(this).next().next("td").find("input.submitter").addClass("heighter-34")
    }
});
$.each($("input.heighter-34").next(".file_chooser_button"), function() {
    $(this).addClass("heighter-34");
    $(this).find(".fa.fa-files-o").css("margin-top", "0").addClass("vertical-align-middle")
});
setTimeout(function() {
    $.each($("select"), function() {
        if ($(this).next("input").outerHeight() == 34 || $(this).prev("input").outerHeight() == 34) {
            $(this).addClass("heighter-34").removeClass("heighter-28")
        } else {
            if ($(this).next("input").outerHeight() == 28 || $(this).prev("input").outerHeight() == 28) {
                $(this).addClass("heighter-28").removeClass("heighter-34")
            }
        }
    })
}, 1);
if (t__wi_p.$('iframe[name="page"]').contents().find('iframe:not([name="page"])').length) {
    var $this = t__wi_p.$('iframe[name="page"]').contents().find('iframe:not([name="page"])');
    $this.on("load", function() {
        $this.contents().find("#term").css("width", "99.3%").css("height", "576px").css("margin-top", "4px")
    });
    $(this).next("br").remove().next('input[type="button"]').remove();
    $(this).next('input[type="button"]').remove();
    $(this).next("p").remove()
}
$.each($(".file_chooser_button"), function() {
    if ($(this).prev("input").attr("style") && $(this).prev("input").attr("style").indexOf("max-width: 100%") > -1) {
        $(this).prev("input").css("max-width", "93%")
    }
});
if ($source_path == $_____link + "sysinfo.cgi" && settings_sysinfo_link_mini == true) {
    t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove()
}
$.each($('input[value="..."], input[value=" ..."], input[value="  ..."], input[value="... "], input[value="...  "], input[value=" ... "], input[value="  ...  "]'), function() {
    $(this).after('<i class="fa fa-fw fa-files-o file_chooser_button_attached vertical-align-middle" style="font-size:11px; pointer-events: none"></i>');
    $(this).attr("value", "")
});
$.each($(".file_chooser_button"), function() {
    $(this).prev("input").css("margin-top", "2px").css("margin-bottom", "2px")
});
$.each($(".file_chooser_button_attached"), function() {
    $(this).prev('input[type="button"]').prev("input").css("margin-top", "2px").css("margin-bottom", "2px");
    if (!$(this).parents(".ui_buttons_label").length && !$(this).parents(".table-subtable").length) {
        $(this).css("margin-top", "11px")
    }
});
$.each($(".ui_form > .file_chooser_button_attached"), function() {
    if (($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length) || ($(this).next(".heighter-34") && $(this).next(".heighter-34").length)) {
        $(this).css("margin-top", "16px");
        $(this).prev("input[onclick]").css("width", "40px")
    }
});
$.each($('.ui_form[action="init_cache.cgi"] > .file_chooser_button_attached'), function() {
    if (($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length) || ($(this).next(".heighter-34") && $(this).next(".heighter-34").length)) {
        $(this).css("margin-top", "14px")
    }
});
$.each($(".col_value > .file_chooser_button_attached"), function() {
    $(this).prev("input[onclick]").css("width", "40px").css("margin-left", "0")
});
$("a.ui_link, .btn").each(function() {
    if ($(this).text().substr(-1) == ".") {
        $(this).text($(this).text().substr(0, $(this).text().length - 1))
    }
    if ($(this).text().substr(-1) == ".") {
        $(this).text($(this).text().substr(0, $(this).text().length - 1))
    }
    if ($(this).text().substr(-1) == ".") {
        $(this).text($(this).text().substr(0, $(this).text().length - 1))
    }
});
if ($current_page_full == $_____link_full + "/virtualmin-mailman/" || $current_page_full == $_____link_full + "/virtualmin-mailman/index.cgi") {
    $("input[name^=reset_]").addClass("heighter-28")
}
if ($current_page_full == $_____link_full + "/software/edit_pack.cgi" || $current_page_full == $_____link_full + "/apache/show.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi") {
    $.each($(".btn:not(.file_chooser_button)"), function() {
        $(this).removeClass("heighter-28").addClass("heighter-34")
    })
}
if ($current_page_full == $_____link_full + "/virtualmin-git/" || $current_page_full == $_____link_full + "/virtualmin-git/index.cgi") {
    $.each($(".btn.btn-default.submitter.ui_submit"), function() {
        $(this).removeClass("heighter-28").addClass("heighter-28")
    })
}
if ($current_page_full == $_____link_full + "/apache/edit_global.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newlinks.cgi" || $current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/postfix/master.cgi") {
    $.each($(".ui_link_replaced"), function() {
        $(this).not(".btn-xxs").removeClass("btn-tiny").addClass("heighter-34")
    })
}
if ($current_page_full == $_____link_full + "/virtualmin-init/" || $current_page_full == $_____link_full + "/virtualmin-dav/list_shares.cgi" || $current_page_full == $_____link_full + "/squid/edit_acl.cgi" || $current_page_full == $_____link_full + "/virtualmin-nginx/" || $current_page_full == $_____link_full + "/fdisk/edit_disk.cgi" || $current_page_full == $_____link_full + "/server-manager/edit_newlinks.cgi" || $current_directory == $_____link + "backup-config/") {
    $.each($(".ui_link_re-replaced"), function() {
        $(this).addClass("btn-tiny").removeClass("heighter-34")
    })
}
if ($current_page_full == $_____link_full + "/pam/") {
    $(".panel-body > a.ui_link").addClass("btn-tiny")
}
if ($current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi") {
    $.each($(".btn"), function() {
        $(this).removeClass("btn-tiny")
    })
}
if ($current_page_full == $_____link_full + "/software/" || $current_page_full == $_____link_full + "/software/index.cgi") {
    $("input#search").addClass("heighter-34 vertical-align-top");
    $('form[action="file_info.cgi"] > .ui_form_end_submit').addClass("heighter-28 heighter-28-force margined-top-0")
}
if ($current_page_full == $_____link_full + "/software/tree.cgi") {
    $(".ui_link").addClass("margined-top-10")
}
if ($current_page_full == $_____link_full + "/syslog/save_log.cgi") {
    $.each($(".heighter-34"), function() {
        $(this).removeClass("heighter-34").addClass("heighter-28")
    });
    $("form:first").next("script").next("br").remove();
    $("form:last").css("margin-top", "5px")
}
if ($current_page_full == $_____link_full + "/status/edit_mon.cgi") {
    $('td.col_value > table[cellspacing="1"] tbody').attr("style", "border: 0 !important;");
    $(".opener_trigger:last-child").css("font-size", "16px");
    $.each($("table.sub_table_container td > font"), function() {
        $(this).parents("tbody");
        $(this).contents().unwrap().wrap('<i class="fa fa-info-circle"><span class="font-family-default vertical-align-baseline margined-left-3">&nbsp;</span></i>')
    })
}
if ($current_page_full == $_____link_full + "/shell/" || $current_page_full == $_____link_full + "/shell/index.cgi" || $current_page_full == $_____link_full + "/server-manager/shell.cgi") {
    $.each($(".btn:not(.btn-link), select, input"), function() {
        $(this).removeClass("heighter-28").addClass("heighter-34");
        if ($(this).is('input[type="button"]')) {
            $($(this).addClass("submitter"))
        }
        if (t__wi_p.$(".form-control.sidebar-search").val() && t__wi_p.$(".form-control.sidebar-search").val().trim().startsWith("!")) {
            t__wi_p.$(".form-control.sidebar-search").val("")
        }
        $(".ui_form").find("input.btn.btn-default:first").addClass("btn-success")
    });
    $("input#cmd").focus()
}
$.each($("input"), function() {
    if ($(this).css("height") == "28px" && $(this).next("input").css("height") != "28px") {
        if ($(this).is(':not([type="hidden"])')) {
            $(this).next("input").addClass("heighter-28")
        }
    }
});
$.each($("select"), function() {
    if ($(this).css("height") == "34px" && $(this).next("select").css("height") != "34px") {
        $(this).next("select").addClass("heighter-34")
    }
});
if ($current_page_full == $_____link_full + "/cluster-passwd/edit_passwd.cgi") {
    $.each($("input + button"), function(d, c) {
        if ($(this).css("height") == "28px") {
            $(this).addClass("heighter-28").css("line-height", "12px").css("margin-top", "2px")
        }
    })
}
if (t___wi.location.pathname == "/virtual-server/history.cgi" || t___wi.location.pathname == "/server-manager/bwgraph.cgi" || t___wi.location.pathname == "/server-manager/history.cgi" || t___wi.location.pathname == "/server-manager/one_history.cgi") {
    $("body").find("table.ui_form_end_buttons .btn.btn-default.submitter.ui_submit").addClass("btn-success");
    $(".panel-body > table tr td b").each(function(d, c) {
        $(this).addClass("btn btn-success btn-tiny ui_link_replaced")
    });
    $(".panel-body > table a").each(function(d, c) {
        $(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
        $(this).text($(this).text().replace(/\.$/, ""));
        if ($(this).text() && $(this).text().indexOf("<<") > -1) {
            $(this).text($(this).text().replace(/\<\</, ""));
            $(this).html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-angle-double-left"> </i> ' + $(this).text())
        }
        if ($(this).text() && $(this).text().indexOf(">>") > -1) {
            $(this).text($(this).text().replace(/\>\>/, ""));
            $(this).html($(this).text() + ' <i style="vertical-align: baseline !important;" class="fa fa-fw fa-angle-double-right"> </i>')
        }
        $(this).parent().contents().filter(function() {
            return this.nodeType == 3
        }).remove();
        if (($(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-terminal"> </i> ' + $(this).text())
        }
        if (($(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-pencil-square-o"> </i> ' + $(this).text())
        }
        if (($(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
            $(this).html('<i class="fa fa-fw fa-database"> </i> ' + $(this).text())
        }
        $(this).parents("table").css("margin-bottom", "3px")
    });
    if ($("#history").next("table.ui_grid_table").next("a").length) {
        $("#history").next("table").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank");
        $("#history").next("table").next("a").text($("#history").next("table").next("a").text().replace(/\.\.$/, ""));
        $("#history").next("table").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-external-link"></i>&nbsp;' + $("#history").next("table").next("a").text())
    } else {
        $("#history").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank");
        $("#history").next("a").text($("#history").next("a").text().replace(/\.\.$/, ""));
        $("#history").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-fw fa-external-link"></i>&nbsp;' + $("#history").next("a").text())
    }
    $(".panel-body > hr + b").attr("style", "font-size: 16px; font-weight: normal;");
    $(".panel-body > hr + b").text($(".panel-body > hr + b").text().replace(/\:$/, ""))
}

function tt__m__res() {
    var b;
    $(window).on("resize", function() {
        clearTimeout(b);
        b = setTimeout(function() {
            container_fluid_size()
        }, 1000);
        t__wi_p.ported_shell_size()
    })
}
tt__m__res();
$('input[type="file"]').bootstrapFileInput();
setTimeout(function() {
    $.each($(".file-input-wrapper > span"), function() {
        $(this).html('<i class="fa fa-fw fa-paperclip">')
    })
}, 1);
setTimeout(function() {
    if (typeof onLoad === "function" && typeof onResize === "function") {
        onLoad();
        $(window).resize(function(b) {
            onResize()
        })
    }
}, 600);
$.each($('tr > td[valign="top"][width="50%"]'), function() {
    $(this).attr("style", "vertical-align: top !important; " + $(this).attr("style"))
});
$("body table").each(function(d, e) {
    var f = $(this);
    if (!$(e).hasClass("table") && !$(e).hasClass("header") && !$(e).hasClass("ui_form_end_buttons") && !$(e).hasClass("ui_table")) {
        $(e).addClass("table-hardcoded");
        if ($product_name == "usermin") {
            $(e).addClass("table-subtable");
            if ($(e).find("tr.thead").length || $(e).hasClass("sub_table_container table-hardcoded table-subtable")) {
                $(e).find("tr.thead").attr("style", "border: 1px solid #efefef");
                $(e).attr("style", "border: 1px solid #efefef")
            } else {
                if ($(e).attr("style") && $current_page_full.indexOf("view_mail.cgi") > -1) {} else {
                    $(e).attr("style", "margin-top: 10px;")
                }
            }
        }
    }
});
if ((($current_page_full.indexOf(".cgi") === -1 || $current_page_full.indexOf("link.cgi") !== -1) || $current_page_full == $_____link_full + "/proc/open_files.cgi" || $current_page_full == $_____link_full + "/webmin/edit_webmincron.cgi" || $current_page_full == $_____link_full + "/postfix/mailq.cgi" || $current_page_full == $_____link_full + "/webmin_search.cgi" || $current_page_full == $_____link_full + "/useradmin/index.cgi" || $current_page_full == $_____link_full + "/quota/list_users.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi" || $current_page_full == $_____link_full + "/init/index.cgi") && ($current_directory == $_____link + "webmin/" && $_____link_full.indexOf("servers/link.cgi") === -1 || $current_directory == $_____link + "proc/" || $source_path == $_____link + "webmin_search.cgi" || $current_directory == $_____link + "postfix/" || $current_directory == $_____link + "virtual-server/" || $current_directory == $_____link + "init/" || $current_directory == $_____link + "mount/" || $current_directory == $_____link + "custom/" || $current_directory == $_____link + "quota/" || $current_directory == $_____link + "php-pear/" || $current_directory == $_____link + "fsdump/" || $current_directory == $_____link + "inittab/" || $current_directory == $_____link + "logrotate/" || $current_directory == $_____link + "mailcap/" || $current_directory == $_____link + "cron/" || $current_directory == $_____link + "software/" || $current_directory == $_____link + "syslog/" || $current_directory == $_____link + "useradmin/" || $current_directory == $_____link + "apache/" || $current_directory == $_____link + "webalizer/" || $current_directory == $_____link + "cpan/" || $current_directory == $_____link + "htaccess-htpasswd/" || $current_directory == $_____link + "fdisk/") || is__mf("ruby-gems", "index.cgi") || is__mf("postfix", "master.cgi") || is__mf("fail2ban", "list_filters.cgi") || is__mf("fail2ban", "list_actions.cgi") || is__mf("fail2ban", "list_jails.cgi") || is__mf("virtual-server", "list_databases.cgi") || is__mf("virtual-server", "connectivity.cgi") || is__mf("virtualmin-git", "index.cgi") || $current_page_full == $_____link_full + "/useradmin/list_logins.cgi" || $current_page_full == $_____link_full + "/man/search.cgi" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_user.cgi" || $current_page_full == $_____link_full + "/proc/index_size.cgi" || $current_page_full == $_____link_full + "/proc/index_cpu.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi" || $current_page_full == $_____link_full + "/software/search.cgi" || $current_page_full == $_____link_full + "/software/file_info.cgi" || $current_page_full == $_____link_full + "/software/list_pack.cgi" || $current_page_full == $_____link_full + "/virtual-server/index.cgi" || $current_page_full == $_____link_full + "/virtual-server/list_users.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newplan.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newfeatures.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newtmpl.cgi" || $current_page_full == $_____link_full + "/virtual-server/backuplog.cgi" || $current_page_full == $_____link_full + "/package-updates/index.cgi" || $current_page_full == $_____link_full + "/virtual-server/usage.cgi" || $current_page_full == $_____link_full + "/virtual-server/search.cgi" || (($current_page_full == $_____link_full + "/fetchmail/" || $current_page_full == $_____link_full + "/filter/") && product_name() == "Usermin")) {
    $("table.table").each(function() {
        if ($(this).find("thead") && $(this).find("thead").length && $(this).find("thead tr th") && $(this).find("thead tr th").length > 2) {
            if ($(this).find("thead") && $(this).find("thead").length > 1) {
                var d = $(this).find("thead:first-child");
                d.remove();
                if (product_name() == "Webmin" && ($current_page_full == $_____link_full + "/quota/list_users.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi")) {
                    $(this).before(d);
                    $(this).prev("thead").replaceTagName("table")
                }
            }
            __init_dt_($(this));
            $(this).find("th").each(function() {
                if (!$(this).text()) {
                    $(this).css("opacity", "0").css("cursor", "default")
                }
            });
            var c = -Infinity;
            $(this).find("tr").each(function(a, b) {
                c = Math.max(c, parseFloat(a))
            });
            if (c < 10) {
                $(this).parents(".dataTables_wrapper").find(".dataTables_filter").remove()
            }
            var f = $(this).parents(".dataTables_wrapper").find(".dataTables_filter").length ? 1 : 0;
            if (f && (($('body[class="init"]').length || ($('body[class^="init"]').length && $('body[class^="init"]').attr("class").match(/\d+$/) != null)) || ($('body[class="quota"]').length || ($('body[class^="quota"]').length && $('body[class^="quota"]').attr("class").match(/\d+$/) != null)) || ($('body[class="cron"]').length || ($('body[class^="cron"]').length && $('body[class^="cron"]').attr("class").match(/\d+$/) != null)))) {
                var g = -15,
                    e = $(this).parents(".dataTables_wrapper").attr("style");
                if ($('body[class^="quota"]').length) {
                    g = -27
                }
                $(this).parents(".dataTables_wrapper").attr("style", "margin-top: " + g + "px !important; " + (e ? e : ""))
            }
        }
    })
}
if ($current_page_full == $_____link_full + "/bind8/" || $current_page_full == $_____link_full + "/postfix/virtual.cgi") {
    __init_dt_($(".table.table-striped.table-hover.table-condensed"))
}
if ($current_page_full == $_____link_full + "/virtual-server/list_scripts.cgi") {
    __init_dt_($("#att_existing > form > table.table.table-striped.table-condensed"))
}
if ($current_page_full == $_____link_full + "/virtual-server/edit_newscripts.cgi") {
    __init_dt_($("#att_summary > table.table.table-striped.table-condensed"))
}
if ($current_page_full == $_____link_full + "/server-manager/index.cgi" || $current_page_full == $_____link_full + "/virtualmin-htpasswd/index.cgi") {
    __init_dt_($("body > div > div > div.panel-body > form > table.table.table-striped.table-condensed"))
}
if ((($('body[class*="status"]').length && !$('body[class*="smart-status"]').length) && !$__source_file) || $current_page_full == $_____link_full + "/servers/" || $current_page_full == $_____link_full + "/servers/index.cgi" || $current_page_full == $_____link_full + "/webminlog/search.cgi") {
    __init_dt_($("table.table-striped.table-condensed"))
}
if ($('body[class*="ldap-useradmin"]').length) {
    __init_dt_($("form > table.table.table-striped.table-condensed"))
}
if ($current_page_full == $_____link_full + "/virtual-server/list_sched.cgi") {
    __init_dt_($(".table.table-striped.table-hover.table-condensed"), false, false, {
        orderable: false,
        targets: [0, -1]
    })
}
if ($current_page_full == $_____link_full + "/servers/" || $current_page_full == $_____link_full + "/servers/index.cgi") {
    $(".ui_checked_columns td table tr td").find('a.ui_link[href*="edit_serv.cgi"]').addClass("margined-left-4 label label-sm label-primary hidden").html('<i class="fa fa-fw fa-pencil-square-o"></i>');
    $(".ui_checked_columns").hover(function() {
        $(this).find("td table tr a.ui_link.label.hidden").removeClass("hidden")
    }, function() {
        $(this).find("td table tr a.ui_link.label").addClass("hidden")
    })
}
$.each($('table.table.table-striped.table-condensed.dataTable.no-footer > thead > tr[role="row"]:first-child'), function(d, c) {
    $(this).attr("style", "border-top: 4px solid #f2f2f2 !important")
});
if (typeof refresher != "undefined") {
    t___wi.clearInterval(refresher)
}
if (typeof $__was_runner != "undefined") {
    t___wi.clearInterval($__was_runner)
}
$("body").unbind("mousewheel");
$("html").unbind("mousewheel");
delete refresh;
delete refresher;
delete $__was_runner;
$__was_runner_is_done = 1;
$.each($('button[onclick^="t___wi.ifield"].btn.btn-default.ui_button'), function() {
    $(this).addClass("file_chooser_button_emulate")
});
$.each($(".file_chooser_button_emulate"), function() {
    if (!$(this).find(".fa-files-o").length) {
        $(this).append('<i class="fa fa-fw fa-files-o vertical-align-middle" style="font-size:11px; pointer-events: none"></i>')
    }
    if ($(this).prev("input").css("height") == "28px") {
        $(this).addClass("heighter-28")
    }
});
$.each($("label > img"), function(d, c) {
    $(this).attr("style", "vertical-align: baseline !important")
});
$.each($('select[multiple][name="weekdays"]'), function() {
    $(this).parents('td[valign="top"], td.td_tag').attr("style", "vertical-align: top !important");
    $(this).parents('table[width="100%"]').parents(".ui_radio_table.table-hardcoded").css("width", "100%")
});
$("body").on("click", ".csf-submit", function(d) {
    d.preventDefault();
    var c = $(this).data("id");
    $("#" + c).submit()
});
$.each($("label").find("br"), function() {
    $(this).parent("label").prev(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;");
    $(this).parent("label").next(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;")
});
$.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function() {
    if ($(this).find(".heighter-34").length) {
        $.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function() {
            $(this).find(".btn").addClass("heighter-34")
        })
    }
});
if ($current_page_full == $_____link_full + "/cpan/edit_mod.cgi") {
    $('form[action="download.cgi"]').next().next().next().find(".submitter.ui_submit").addClass("heighter-34")
}
if ($current_page_full == $_____link_full + "/cpan/" || $current_page_full == $_____link_full + "/cpan/index.cgi") {
    $('input[name="cpan"]').next("button").append('<i class="fa fa-fw fa-files-o vertical-align-middle" style="font-size:11px; margin-top: -6px; pointer-events: none"></i>').attr("style", "width: 40px; height: 28px; vertical-align:middle !important; margin-top:2px; margin-bottom:2px;")
}
if ($("form").find(".icons-row:not(.inline-row)").length) {
    $("form").find(".icons-row").addClass("_processed_");
    $("form").find(".icons-row").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef");
    $("form").find(".icons-row").find(".icons-container").addClass("icons-container-stretched")
}

function __m_ico_row_tb() {
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
        "padding-top": "8px",
        "padding-bottom": "8px"
    });
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef")
}

function __m_ico_row_t() {
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
        "padding-top": "8px"
    });
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef")
}

function __m_ico_row_b() {
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
        "padding-bottom": "6px"
    });
    $("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-bottom", "1px solid #efefef")
}
if ($current_page_full == $_____link_full + "/lvm/" || $current_page_full == $_____link_full + "/virtualmin-support/" || $current_page_full == $_____link_full + "/proftpd/virt_index.cgi" || $current_page_full == $_____link_full + "/dhcpd/" || $current_page_full == $_____link_full + "/dhcpd/index.cgi" || $current_page_full == $_____link_full + "/cluster-usermin/" || $current_page_full == $_____link_full + "/cluster-usermin/index.cgi" || $current_page_full == $_____link_full + "/cluster-useradmin/" || $current_page_full == $_____link_full + "/cluster-useradmin/index.cgi" || $current_page_full == $_____link_full + "/cluster-webmin/" || $current_page_full == $_____link_full + "/cluster-webmin/index.cgi") {
    __m_ico_row_tb()
}
if ($current_page_full == $_____link_full + "/proftpd/" || $current_page_full == $_____link_full + "/proftpd/index.cgi" || $current_page_full == $_____link_full + "/bacula-backup/" || $current_page_full == $_____link_full + "/bacula-backup/index.cgi") {
    __m_ico_row_t()
}
if ($current_page_full == $_____link_full + "//") {
    __m_ico_row_b()
}
$("body").on("contextmenu", "div.icons-container, div.small-icons-container", function(b) {
    b.preventDefault();
    if ($(this).find("input").is(":checked")) {
        $(this).find("input").prop("checked", false);
        $(this).removeClass("highlighted")
    } else {
        if ($(this).find("input").length) {
            $(this).find("input").prop("checked", true);
            $(this).addClass("highlighted")
        }
    }
    var c = ($(b.target).is(".icon_link") ? $(b.target).parent(".gl-icon-container").find(".fa-select, .fa-selected") : ($(b.target).is(".gl-icon-select") ? $(b.target) : ($(b.target).is("img") ? $(b.target).parent("a").parent(".gl-icon-container").find(".fa-select, .fa-selected") : $(b.target).find(".fa-select, .fa-selected"))));
    c.hasClass("fa-select") ? c.removeClass("fa-select").addClass("fa-selected") : c.removeClass("fa-selected").addClass("fa-select")
});

function __m_ico_row_func() {
    return 0
}
$.each($(".row.icons-row.inline-row"), function(a, b) {
    $(this).find("a.icon_link").contents().filter(function() {
        return this.nodeType == 3
    }).remove()
});
$.each($(".row.icons-row:not(.inline-row) .icons-container"), function(a, b) {
    $(this).removeAttr("data-title").removeAttr("data-toggle").removeAttr("data-placement").removeAttr("data-container")
});
if ($("body").find(".icons-row > div.icons-container").length || $("body").find(".icons-row > div.small-icons-container").length) {
    $(".row.icons-row.vertical-align").on("click", ".icons-container, .small-icons-container", function() {
        if (!$(this).hasClass("forged-xx-skip")) {
            return
        }
        t___wi.location.href = $(this).find("a").attr("href")
    });
    var DELAY = 240,
        clicks = 0,
        timer = null;
    $("body").on("click", '.icons-row div[class*="icons-container"] .forged-xx-data, .icons-container, .small-icons-container', function(b) {
        var d = $(this);
        if ($(this).hasClass("forged-xx-skip") || $(b.target).is(".gl-icon-edit")) {
            return
        }
        if ($(b.target).parents(".inline-row").length) {
            if ($(b.target).is("input.iawobject")) {
                if (!$(b.target).is(":checked")) {
                    $(b.target).parents(".icons-container, .small-icons-container").removeClass("highlighted")
                } else {
                    $(b.target).parents(".icons-container, .small-icons-container").addClass("highlighted")
                }
            }
            return
        }
        b.preventDefault();
        b.stopPropagation();
        b.stopImmediatePropagation();
        if ($(b.target).is(".gl-icon-select")) {
            $(b.target).trigger("contextmenu");
            return
        }
        clicks++;
        if (clicks === 1) {
            timer = setTimeout(function() {
                clicks = 0;
                $(b.target).trigger("contextmenu");
                typeof db_check_selected === "function" && db_check_selected()
            }, DELAY)
        } else {
            clearTimeout(timer);
            clicks = 0;
            var f = $(b.target).parent("a").attr("href"),
                c = $(b.target).find("a").attr("href"),
                e = $(b.target).attr("href");
            if (f) {
                window.location.href = f
            } else {
                if (c) {
                    window.location.href = c
                } else {
                    if (e) {
                        window.location.href = e
                    }
                }
            }
        }
    }).on("dblclick", function(a) {
        a.preventDefault()
    });
    $("body").on("click", ".select_all", function() {
        if ($(this).parents("form").find('.icons-row div[class*="icons-container"]').length) {
            $.each($(".icons-row .hidden-forged-6"), function() {
                $(this).parents('div[class*="icons-container"]').addClass("highlighted");
                $(this).parents('div[class*="icons-container"]').find(".fa-select").removeClass("fa-select").addClass("fa-selected")
            })
        }
    }).on("click", ".select_invert", function() {
        $.each($(".icons-row .hidden-forged-6"), function() {
            if ($(this).find("input").is(":checked")) {
                $(this).parents('div[class*="icons-container"]').addClass("highlighted");
                $(this).parents('div[class*="icons-container"]').find(".fa-select, .fa-selected").removeClass("fa-select").addClass("fa-selected")
            } else {
                $(this).parents('div[class*="icons-container"]').removeClass("highlighted");
                $(this).parents('div[class*="icons-container"]').find(".fa-select, .fa-selected").removeClass("fa-selected").addClass("fa-select")
            }
        })
    });
    $.each($(".icons-row .hidden-forged-6"), function() {
        if ($(this).find("input").is(":checked")) {
            $(this).parents('div[class*="icons-container"]').addClass("highlighted")
        }
    });
    $.each($(".hidden-forged-7 > a"), function() {
        $(this).removeClass();
        if ($(this).parents(".hidden-forged-7").hasClass("hidden-forged-7-small")) {
            $(this).html('<i class="fa fa-edit text-semi-dark text-dark-hoverd"> </i>');
            $(this).parent().parent().prepend('<i class="fa fa-fw fa-select text-dark text-dark-hoverd gl-icon-select" style="top:1px; left:-1px"></i>')
        } else {
            $(this).html('<i class="fa fa-edit text-semi-dark text-dark-hoverd"> </i>');
            $(this).parent().parent().prepend('<i class="fa fa-fw fa-lg fa-select text-dark text-dark-hoverd gl-icon-select"></i>')
        }
    });
    $("body").on("mouseover", '.icons-row div[class*="icons-container"]', function(b) {
        $(this).find(".hidden-forged-7").removeClass("hidden-forged")
    }).on("mouseout", function(b) {
        $(this).find(".hidden-forged-7").addClass("hidden-forged")
    })
}
if ($current_directory == $_____link + "virtualmin-registrar/") {
    $.each($("td > input "), function() {
        if ($(this).parents("table.table-hardcoded").find('form[action="edit.cgi"]').length) {
            $(this).css("margin-left", "5px");
            $(this).parent("td").prev("td").find("select").css("margin-left", "5px")
        }
    })
}
if ($current_page_full == $_____link_full + "/cluster-webmin/edit_host.cgi") {
    $.each($(".panel-body > .table-hardcoded"), function() {
        $(this).attr("style", "margin-top: 10px !important")
    })
}
if ($current_page_full == $_____link_full + "/virtual-server/list_scripts.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newscripts.cgi") {
    $('form[action="disable_scripts.cgi"] thead + thead tr th, form[action="disable_scripts.cgi"] tbody + thead tr th, form[action="script_form.cgi"] thead + thead tr th, form[action="script_form.cgi"] tbody + thead tr th').attr("colspan", "5")
}
$.each($(".file_chooser_button_attached"), function(d, c) {
    if ($(this).prev('input[onclick*=".cgi"]')) {
        $(this).prev('input[onclick*=".cgi"]').css("width", "40px")
    }
});
if (product_name(1).toLowerCase() == "cloudmin" && ($current_page_full == $_____link_full + "/server-manager/add_form.cgi" || $current_page_full == $_____link_full + "/server-manager/scan_form.cgi")) {
    $.each($("label"), function() {
        $(this).find("br").remove()
    })
}
if (($current_page_full == $_____link_full + "/mysql/view_table.cgi" || $current_page_full == $_____link_full + "/postgresql/view_table.cgi") && $("td.td_tag > table.table-hardcoded")) {
    var $___colspan = $("td.td_tag > table.table-hardcoded").parents("table").find("thead").find("tr").find("th").length;
    $("td.td_tag > table.table-hardcoded").parent("td.td_tag").attr("colspan", $___colspan).attr("style", "padding: 1px !important;")
}
if ($current_page_full == $_____link_full + "/virtual-server/backup_form.cgi" && $__source_url && $__source_url.indexOf("?sched=") > -1) {
    $("body > div > div > div.panel-body > form > table:nth-child(4) > tbody > tr:nth-child(2) > td").css("display", "table-cell");
    setTimeout(function() {
        $("a[href=\"javascript:hidden_opener('hiddendiv_adddest', 'hiddenopener_adddest')\"]").next().attr("style", "").addClass("btn btn-tiny btn-default")
    }, 10)
}
if ($__source_path === "/config.cgi") {
    $("thead tr th.table-title").prepend('<i class="fa fa-fw fa-cogs vertical-align-text-bottom"></i>&nbsp;&nbsp;')
}
$.each($('form[action="save_global.cgi"], form[action="save_iptables.cgi"], form[action="save_domain.cgi"],form[action="domain_setup.cgi"],form[action="mass_create.cgi"],form[action="save_roundrobin.cgi"],form[action="save_alert.cgi"], body.time form[action="apply.cgi"]'), function() {
    $(this).find(".col_header").removeClass("col_header")
});
if ($__relative_url === "/virtual-server/edit_newchangelog.cgi" || $__relative_url === "/server-manager/edit_newchangelog.cgi" || $__relative_url === "/shell/" || $__relative_url === "/shell/index.cgi" || $__relative_url === "/server-manager/shell.cgi") {
    $("td.col_value.col_value").removeClass("col_header")
}
if ($__relative_url === "/ldap-server/edit_ldif.cgi") {
    $("span > input.ui_opt_textbox").unwrap()
}
if ($current_page_full == $_____link_full + "/server-manager/gvnc.cgi") {
    $("body.server-manager p > object").css("height", "100%").parent("p").attr("style", "display: block; height: " + parseInt($(window).outerHeight() / 1.4) + "px")
}
if (t___wi.location.search != "?dashboard" && dashboard_switch() == true) {
    if ($__source_file == "sysinfo.cgi") {
        t__wi_p.t__s("open_dashboard");
        t__wi_p.__cms()
    } else {
        if (t__wi_p.$("#open_webmin").length > 0 && t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_webmin" && __num()) {
            t__wi_p.t__s("open_webmin")
        } else {
            if (t__wi_p.$("#open_virtualmin").length > 0 && t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_virtualmin" && __num()) {
                t__wi_p.t__s("open_virtualmin")
            } else {
                if (t__wi_p.$("#open_cloudmin").length > 0 && t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_cloudmin" && __num()) {
                    t__wi_p.t__s("open_cloudmin")
                } else {
                    if (t__wi_p.$("#open_usermin").length > 0 && t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_usermin" && __num()) {
                        t__wi_p.t__s("open_usermin")
                    }
                }
            }
        }
    }
}
if ($current_page_full == $_____link_full + "/spam/edit_simple.cgi" || $current_page_full == $_____link_full + "/spam/edit_header.cgi") {
    var target = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:first-child"),
        container = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:last-child"),
        link = container.find("a");
    target.append(link);
    container.remove();
    target.find("a").addClass("table_title_links pull-right btn btn-xs btn-grey").attr("style", "position: absolute; right: 23px; margin-top: 7px !important;")
}
if ($current_page_full == $_____link_full + "/server-manager/edit_pass.cgi" && $('form[action="save_pass.cgi"]').find('a[href*="edit_pass.cgi?"]:not(.btn)').length) {
    var target = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:first-child"),
        container = $(".ui_form .table-responsive table.table.table-striped.table-condensed.table-subtable > thead tr th:last-child"),
        link = container.find("a");
    target.append(link);
    container.remove();
    target.find("a").addClass("table_title_links pull-right btn btn-info btn-tiny").attr("style", "position: absolute; right: 20px; margin-top: 3px !important;")
}
$('.panel-default + a[href="/virtual-server/"]').attr("href", "/virtual-server/index.cgi");
$('.panel-default + a[href="/server-manager/"]').attr("href", "/server-manager/index.cgi");
if ($__current_directory == $_____link_full + "/virtual-server/") {
    $("#headln2l > a:first-child .fa-arrow-left").parent("a").attr("href", "/virtual-server/index.cgi")
} else {
    if ($__current_directory == $_____link_full + "/server-manager/") {
        $("#headln2l > a:first-child .fa-arrow-left").parent("a").attr("href", "/server-manager/index.cgi")
    }
}
if ($current_directory == $_____link + "acl/") {
    $("body.acl > div > div > div.panel-body > form > div > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody").attr("style", "border: 0 !important");
    var $t__acl_title = $("br").next(".ui_grid_table.table-hardcoded").find("tbody").attr("style", "border: 1px solid #" + ((__isNR || __isNM) ? "393b3f" : "eee") + " !important").parent("table").prev("br").prev("b");
    $("br").next(".ui_grid_table.table-hardcoded").css("margin-bottom", "3px");
    $.each($t__acl_title, function(c, d) {
        if ($(this).text() == "") {
            $(this).next("br").remove();
            $(this).remove()
        }
    });
    $t__acl_title.attr("style", "margin-bottom: -3px !important").next("br").remove()
}
$('form[action="bootup.cgi"]').on("submit", function(b) {
    if ($("#starting").length > 0) {
        $("#starting").remove();
        $(this).append('<input type="hidden" id="starting" name="starting" value="' + $('input[name="boot"]:checked').val() + '">')
    } else {
        if ($("#table").length > 0) {
            $(this).append('<input type="hidden" id="table" name="table" value="' + $('input[name="boot"]:checked').val() + '">')
        } else {
            if ($('input[name="boot"][type="hidden"]').length > 0) {
                $('input[name="boot"][type="hidden"]').remove();
                $(this).append('<input type="hidden" name="boot" value="' + $('input[name="boot"]:checked').val() + '">')
            }
        }
    }
});
if ($('body[class*="bandwidth"]').length) {
    $(".fa.fa-calendar.file_chooser_button_attached").attr("style", "font-size: 11px; margin-top: 9px !important; pointer-events: none; margin-left: -27px !important;")
}
if ($current_page_full == $_____link_full + "/mysql/exec_form.cgi" || $current_page_full == $_____link_full + "/postgresql/exec_form.cgi") {
    $('select[name="old"], input[name="clear"], select[name="charset"]').removeClass("heighter-34").addClass("heighter-28");
    $('input[name="clear"]').attr("style", "margin-bottom: 3px !important;");
    $('select[name="old"]').attr("style", "margin-bottom: 3px !important; margin-right: 0 !important;")
}
if (($__source_file == "config.cgi" || $__source_file == "uconfig.cgi") && ($__source_query == "mysql" || $__source_query == "postgresql")) {
    $('input[name="style"]').parents("td.col_value").parent("tr").after('		<tr>			<td class="col_label"><b>' + lang("theme_xhred_xsql_fit_content_screen_height") + '</b></td>			<td class="col_value"><span>			<span class="awradio awobject">				<input class="iawobject" name="config_portable_module_xsql_fit_content_screen_height" id="config_portable_module_xsql_fit_content_screen_height_1" value="true"' + (config_portable_module_xsql_fit_content_screen_height ? " checked" : "") + ' type="radio">				<label class="lawobject" for="config_portable_module_xsql_fit_content_screen_height_1">' + lang("theme_xhred_global_yes") + '</label>				<input class="iawobject" name="config_portable_module_xsql_fit_content_screen_height" id="config_portable_module_xsql_fit_content_screen_height_0" value="false"' + (config_portable_module_xsql_fit_content_screen_height ? "" : " checked") + ' type="radio">				<label class="lawobject" for="config_portable_module_xsql_fit_content_screen_height_0">' + lang("theme_xhred_global_no") + "</label>			</span>		</span></td>		</tr>	");
    $('input[name="config_portable_module_xsql_fit_content_screen_height"]').on("change", function() {
        var b = $(this).attr("name"),
            a = $(this).val();
        localStorage.setItem($hostname + "-" + b, a);
        window[b] = a;
        t__wi_p.manageConfig("save")
    })
}
if ($(".ui_post_header.hidden").html() && $(".ui_post_header.hidden").html().length > 5) {
    $("#headln2c").append("<span data-sub_title>" + $(".ui_post_header.hidden").html() + "</span>");
    $(".ui_post_header.hidden").remove()
}
if ($current_page_full && $current_page_full.indexOf("/sysinfo.cgi") > -1 && __num()) {
    $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/up.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/check.png").css("margin-right", "3px").attr("title", $.trim(f.parent(".td_tag").text()))
    });
    $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/down.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/cross.png").css("margin-right", "3px").attr("title", $.trim(f.parent(".td_tag").text()))
    });
    $('#status_services-status-collapse .tr_tag .td_tag > img[src*="images/not.gif"]:not(".ui_icon_protected")').each(function(d, e) {
        var f = $(this);
        $(e).attr("src", "" + $_____link_full + "/images/not.png").css("margin-right", "3px").attr("title", $.trim(f.parent(".td_tag").text()))
    });

    function _update_time_() {
        var a = $("[data-convertible-timestamp-full]");
        a.data("convertible-timestamp-full", (parseInt(a.data("convertible-timestamp-full")) + 1));
        typeof t__wi_p.moment !== "undefined" && a.text(t__wi_p.moment.unix(a.data("convertible-timestamp-full")).format(settings_window_replaced_timestamp_format_full))
    }
    $(function() {
        setInterval(_update_time_, 1000)
    });
    $.each($(".piechart"), function() {
        if (isNaN($(this).data("percent"))) {
            $(this).parents(".text-center").remove()
        }
    }).promise().done(function() {
        var c = $("span[data-charts]"),
            b = 'div[class^="col-xs-"]',
            a = c.parents(".row").find(b).length;
        $.each(c.parents(".row"), function() {
            $(this).find(b).removeClass().addClass("text-center col-xs-6 col-sm-" + (12 / a) + "")
        })
    });
    $.each($(".panel-default:not(#system-status)"), function(a, b) {
        if (!$(this).parent(".panel-group").length) {
            $(this).detach().appendTo(".panel-group")
        }
    });
    $(".panel-default:not(#system-status)").sort(function(d, c) {
        return $(d).data("sorter") > $(c).data("sorter")
    }).each(function() {
        var a = $(this);
        a.remove();
        $(a).appendTo(".panel-group")
    }).promise().done(function() {
        $("#serial-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#vm2servers-server-manager, #serial-server-manager").parent(".panel").detach().prependTo(".panel-group");
        $("#sysinfo-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#quota-virtual-server, #bw-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#ftypes-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#status-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#status_services-status").parent(".panel").detach().prependTo(".panel-group");
        $("#newfeatures-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#updates-virtual-server").parent(".panel").detach().prependTo(".panel-group");
        $("#acl_logins-acl").parent(".panel").detach().appendTo(".panel-group")
    })
}
$("body").on("click", "a#atclearcache", function(a) {
    Object.keys(localStorage).forEach(function(c) {
        if (/^allowed_trigger|^notifications_|^sysinfo_/.test(c)) {
            localStorage.removeItem($hostname + "-" + c)
        }
    });
    t__wi_p.$(".right-side-tabs-dismiss .fa-trash").trigger("click");
    t__wi_p.$(".right-side-tabs-dismiss .fa-refresh").trigger("click");
    var b = $(this);
    f__mgk_sp(b, [1.5, -33, "small", 1000])
});
$("body").click(function(a) {
    if ($(a.target).is('select[name="settings_navigation_color"], select[name="settings_background_color"], select[name="settings_side_slider_palette"], input[name="settings_side_slider_fixed"], label[for^="settings_side_slider_fixed"], div.aradio')) {
        return
    }
    if (t__wi_p.$(".right-side-tabs-toggler").hasClass("opened") && !t__wi_p.$(".right-side-tabs-toggler").hasClass("hidden")) {
        t__wi_p.$(".right-side-tabs-toggler:not(.hidden)").trigger("click")
    }
});
if ($current_page_full == $_____link_full + "/virtual-server/edit_phpmode.cgi") {
    $("#hiddendiv_phpinfo table tbody tr").css("border", "1px solid #" + (__isNR ? "393b3f" : "eee") + "")
}
if (settings_window_replace_timestamps) {
    var xMoment = typeof t__wi_p.moment !== "undefined";
    $.each($("[data-convertible-timestamp-full]"), function() {
        xMoment && $(this).text(t__wi_p.moment.unix($(this).data("convertible-timestamp-full")).format(settings_window_replaced_timestamp_format_full))
    });
    $.each($("[data-convertible-timestamp-short]"), function() {
        xMoment && $(this).text(t__wi_p.moment.unix($(this).data("convertible-timestamp-short")).format(settings_window_replaced_timestamp_format_short))
    })
}
$.each($('a[href*="showpass.cgi?"][onclick]'), function() {
    $(this).html('<i class="fa fa-fw fa-lg fa-key margined-left-4"></i>').css("color", "#555")
});
if ($current_page_full == $_____link_full + "/webmin/edit_startpage.cgi") {
    $('select[name="deftab"]').parents("td.col_value").parent("tr").hide();
    $('select[name="gotomodule"] option').each(function() {
        ($(this).val() == "virtual-server" || $(this).val() == "server-manager" || $(this).val() == "csf") && $(this).remove()
    })
}
if ($current_page_full == $_____link_full + "/webmin/edit_ui.cgi" || $current_page_full == $_____link_full + "/usermin/edit_ui.cgi") {
    $('input[name*="cs_link_def"], input[name*="cs_header_def"], input[name*="cs_table_def"], input[name*="cs_text_def"], input[name*="cs_page_def"], input[name*="width_def"], input[name*="height_def"], input[name*="sizedate_def"], input[name*="texttitles"]').parents("td.col_value").parent("tr").addClass("hidden")
}
if ($__relative_url == "/config.cgi?virtual-server" || $__relative_url == "/config.cgi?server-manager") {
    $('input[name="theme_image"], input[name="theme_link"], input[name="theme_alt"]').parents("td.col_value").parent("tr").hide()
}
if ($current_page_full == $_____link_full + "/virtual-server/edit_resel.cgi") {
    $('input[name="logo"][id="logo"], input[name="link"]').parents("td.col_value").parent("tr").hide()
}
if ($current_page_full == $_____link_full + "/virtual-server/edit_newfeatures.cgi") {
    $('tr td:last-child label:contains("|")').replaceText(/\|/gi, "");
    $("td a.ui_link").addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").removeClass("ui_link").prepend('<i class="fa fa-fw fa-eye hidden" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
}
if ($current_page_full == $_____link_full + "/virtual-server/domain_form.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_domain.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_user.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_alias.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_limits.cgi") {
    __is_shifted = false;
    __is_tabbed = false;
    $(document).on("keyup keydown", function(a) {
        var b = a.keyCode ? a.keyCode : a.which;
        __is_shifted = a.shiftKey;
        __is_tabbed = (b == 9 ? true : false)
    });
    $("input, select").on("blur", function() {
        if (__is_tabbed && !$(this).next("input:visible").length && !$(this).prev("input:visible").length && !$(this).next("select:visible").length && !$(this).prev("select:visible").length) {
            if (!__is_shifted) {
                if ($(this).parent("td").parent("tr").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length || $(this).parent("td").parent("tr").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length || $(this).parent("td").parent("tr").next("script").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').length) {
                    $(this).parent("td").parent("tr").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus();
                    $(this).parent("td").parent("tr").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus();
                    $(this).parent("td").parent("tr").next("script").next("script").next("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus()
                } else {
                    $(this).parent("td").parent("tr").next("tr").find("select:first:visible").focus();
                    $(this).parent("td").parent("tr").next("script").next("tr").find("select:first:visible").focus();
                    $(this).parent("td").parent("tr").next("script").next("script").next("tr").find("select:first:visible").focus()
                }
            } else {
                if ($(this).parent("td").parent("tr").prev("tr").find("select:visible").length || $(this).parent("td").parent("tr").prev("script").prev("tr").find("select:visible").length || $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find("select:visible").length) {
                    $(this).parent("td").parent("tr").prev("tr").find("select:first:visible").focus();
                    $(this).parent("td").parent("tr").prev("script").prev("tr").find("select:first:visible").focus();
                    $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find("select:first:visible").focus()
                } else {
                    $(this).parent("td").parent("tr").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus();
                    $(this).parent("td").parent("tr").prev("script").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus();
                    $(this).parent("td").parent("tr").prev("script").prev("script").prev("tr").find('input[type="text"]:first:visible, input[type="password"]:first:visible').focus()
                }
            }
        }
    })
}
if ($("#headln2l .btn .fa-arrow-left").length) {
    if ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {} else {
        $("#headln2l .btn .fa-arrow-left").parent("a").attr("href", $("#headln2l .btn .fa-arrow-left").parent("a").attr("href").replace("index.cgi", ""))
    }
    var $_url = URI(t___wi.location);
    $__source_file = $_url.filename()
}
$("#headln2r, #headln2l").prepend('<div class="btn-group">').append("</div>");
$("#headln2r a").detach().appendTo("#headln2r .btn-group");
$("#headln2l a").detach().appendTo("#headln2l .btn-group");
$.each($(".ui_form_end_submit"), function() {
    if ($source_path == $_____link + "proc/edit_proc.cgi" || $__source_file == "edit_dbase.cgi" || $__source_file == "edit_pam.cgi" || $__source_file == "list_records.cgi" || is__m("mailbox") || is__m("mailboxes")) {
        return
    }
    var a = $(this).parent().find(".ui_form_end_submit");
    if (!a.parents(".btn-group").length && a.length > 1) {
        $(this).parent().find(".ui_form_end_submit, .ui_form_end_submit + input").wrapAll('<div class="btn-group end_submits"></div>')
    }
}).promise().done(function() {
    $.each($(".end_submits"), function(a, b) {
        if ($(this).prev(".heighter-28").length || $(this).prev("input, select").css("height") == "28px") {
            $(this).find(".ui_form_end_submit").addClass("heighter-28")
        }
    })
});
$('.ui_form_end_submit[onclick^="window.open"]').click(function() {
    var a = $(this);
    setTimeout(function() {
        a.removeClass("disabled");
        t__wi_p.__lle()
    }, 100)
});
$.each($(".btn-group").find("span"), function() {
    ($(this).not("[class]").length && !$.trim($(this).text()).length) && $(this).remove()
});
f__mgk_fi();
if ($(".panel-default").nextAll("a.btn.btn-primary").length === 2) {
    $(".panel-default").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-o-left")
}
if ($(".panel-default").nextAll("a.btn.btn-primary").length === 3) {
    $(".panel-default").next("a.btn.btn-primary").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-left");
    $(".panel-default").next("a.btn.btn-primary").find(".fa.fa-arrow-left").removeClass("fa-arrow-left").addClass("fa-arrow-circle-o-left")
}
if ($current_page_full == $_____link_full + "/init/reboot.cgi") {
    $("input.btn-success").removeClass("btn-success").addClass("btn-warning")
}
if ($current_page_full == $_____link_full + "/init/shutdown.cgi") {
    $("input.btn-success").removeClass("btn-success").addClass("btn-danger")
}
if (!$g__v__nav) {
    __s___()
}
$("body").on("click", 'button.ui_form_end_submit[type="button"]:not(.disabled)', function() {
    var b = $(this).next('input[type="submit"].hidden'),
        a = $(this).parent(".btn-group").next('input[type="submit"].hidden');
    if (b.length) {
        b.trigger("click")
    } else {
        a.trigger("click")
    }
});
$("body").on("click", ".ui_form_end_submit:not(.disabled), .page_footer_submit:not(.disabled)", function() {
    var a = false,
        b = false;
    if ($(this).hasClass("page_footer_submit")) {
        a = 1000
    } else {
        if ($(this).parents('form[action="fetch.cgi"]').length || $(this).parents('form[action="download.cgi"]').length) {
            a = 1000;
            b = 1
        }
    }
    f__mgk_sp($(this), false, a, b)
}).on("submit", 'form[action="fetch.cgi"], form[action="download.cgi"]', function() {
    setTimeout(function() {
        __lre()
    }, 1000)
});
$(".dataTable .ui_checked_checkbox").parent("tr").parent("tbody").prev("thead").find("th:first-child").addClass("opacity-0 pointer-events-none");
$("table tr.thead td").addClass("tdhead");
if (is__mf("virtual-server", "edit_newchroot.cgi") || is__mf("virtual-server", "edit_newglobal.cgi") || is__mf("virtual-server", "edit_newshells.cgi") || is__mf("virtual-server", "edit_newfields.cgi") || is__mf("server-manager", "edit_docker.cgi") || is__mf("server-manager", "edit_vserver.cgi") || is__mf("server-manager", "edit_zone.cgi") || is__mf("server-manager", "edit_openvz.cgi") || is__mf("server-manager", "list_locations.cgi") || is__mf("server-manager", "edit_lxc.cgi") || is__mf("server-manager", "list_ips.cgi") || ($('body[class*="bind8"]').length && $__source_file) || ($('body[class*="status"]').length && $__source_file == "edit_mon.cgi") || ($('body[class*="custom"]').length && $__source_file == "edit_sql.cgi") || ($('body[class*="custom"]').length && $__source_file == "edit_cmd.cgi") || ($('body[class*="custom"]').length && $__source_file == "edit_file.cgi")) {
    $(".table").removeClass("table-hover")
}
var dynamic_switch_off_on = $(".fa-toggle-switch-off").parent("button.btn-default");
if (dynamic_switch_off_on.length === 1) {
    var dynamic_switch__val = dynamic_switch_off_on.parent("td").find('input[type="radio"]:checked').val();
    if (dynamic_switch__val == "1") {
        dynamic_switch_off_on.find(".fa-toggle-switch-off").addClass("fa-toggle-switch").removeClass("fa-toggle-switch-off")
    }
}
dynamic_switch_off_on.parents("td").addClass("vertical-align-bottom");
var my_editor_page = $('form[action*="manual"] > select[name="file"], form[action*="manual.cgi"] > select[name="manual"], form[action*="edit_"] > select[name="file"]');
if (my_editor_page.length) {
    my_editor_page.addClass("heighter-34");
    $('form[action*="manual"], form[action*="edit_"]').css("margin-bottom", "2px")
}
if (is__m("firewalld")) {
    $("select#zone").addClass("heighter-34");
    $('form[action="save_ifaces.cgi"] button').addClass("heighter-28-force")
}
$('body[class*="proftpd"] .table-hardcoded tr td > input + input.btn.btn-default').removeClass("heighter-28").addClass("heighter-34").prev("input").addClass("heighter-34");
$('body[class*="proftpd"] form[action="find_ftpaccess.cgi"] > input:first-child').removeClass("heighter-34").addClass("heighter-28");
if ($__source_file == "edit_simple.cgi" && $('body[class*="spam"]').length) {
    $("tr td").contents().filter(function() {
        return this.nodeType == 3
    }).remove()
}
if ($__source_file == "edit_awl.cgi" && $('body[class*="spam"]').length) {
    $('input[name="user"]').next("input").addBack().addClass("heighter-34")
}
if (is__mf("usermin", "list_sessions.cgi")) {
    $('#user, input[type="button"]').addClass("heighter-34")
}
if (is__mf("htaccess-htpasswd", "") || is__mf("htaccess-htpasswd", "index.cgi")) {
    $("#search, .file_chooser_button").addClass("heighter-34").css("margin-bottom", "-1px");
    $("#search").css("margin-top", "0")
}
if (is__mf("mailboxes", "") || is__mf("mailboxes", "index.cgi")) {
    $("#user, .file_chooser_button").addClass("heighter-34 vertical-align-middle").css("margin-bottom", "-1px")
}
if (is__mf("mailboxes", "list_mail.cgi")) {
    $("#mfolder1, #mfolder2").addClass("heighter-34").css("margin-bottom", "-1px").css("margin-top", "-1px")
}
if (is__mf("quota", "list_users.cgi")) {
    $("#user, #user + input").addClass("heighter-34")
}
if (is__mf("quota", "list_groups.cgi")) {
    $("#group, #group + input").addClass("heighter-34")
}
if (is__mf("apache", "htaccess.cgi") || is__mf("virtualmin-registrar", "index.cgi") || is__mf("virtualmin-registrar", "")) {
    $(".ui_form_end_submit").addClass("heighter-28-force")
}
var attempt_make_all_elem = $('form:not([action="save_log.cgi"]) .table-responsive .table .sub_table_container .table tbody tr td > select,							   form:not([action="save_log.cgi"], [action="save_net.cgi"]) .table-responsive .table .sub_table_container .table tbody tr td > input,							   form:not([action="save_user.cgi"], [action="save_group.cgi"]) .table td.opener_container td.col_value table tbody tr td > select,							   form:not([action="save_user.cgi"], [action="save_group.cgi"]) .table td.opener_container td.col_value table tbody tr td > input,							   form[action="save_newglobal.cgi"] > table tbody tr td input,							   form[action="save_newfields.cgi"] > table tbody tr td input,							   form[action="save_newfields.cgi"] > table tbody tr td select,							   form[action="save_newshells.cgi"] > table tbody tr td select,							   form[action="save_newshells.cgi"] > table tbody tr td input,							   form[action="save_linkcats.cgi"] > table tbody tr td input,							   form[action="save_gen.cgi"] > table tbody tr td input							   ');
$.each(attempt_make_all_elem, function(a, b) {
    if ($(this).parent().find("input[data-mmclick]").length || $(this).parent().find("button[data-mmclick]").length || $(this).parent().find('input[onclick*="window.open"]').length || $(this).parent().find('button[onclick*="window.open"]').length) {
        return
    }
    if ($(this).prev(".awobject").length) {
        $(this).css("width", "auto");
        return
    }
    if ($(this).parent().find('input:not([type="checkbox"], [type="radio"]), select').length == 1) {
        $(this).css("width", "100%").css("min-width", "100%")
    } else {
        if ($(this).parent().find('input:not([type="checkbox"], [type="radio"]), select').length == 2) {
            $(this).parent().find("input, select").first().css("width", "39%");
            $(this).parent().find("input, select").last().css("width", "60%").css("float", "right")
        }
    }
});
if (is__mf("virtual-server", "edit_newstyles.cgi")) {
    $('a[onclick^="window.open(\\"thumb_style.cgi?"]').html('<i class="fa fa-fw fa-external-link"></i>').addClass("btn btn-default btn-xxs margined-top--3")
} else {
    if (is__m("virtual-server")) {
        $('a[onclick^="window.open(\\"thumb_style.cgi?"]').html('<i class="fa fa-fw fa-external-link" style="margin-top: 7px;"></i>').addClass("btn btn-default heighter-28-force")
    }
}
if (is__mf("virtual-server", "edit_html.cgi")) {
    $('script:contains("xinha")').remove();
    $('.ui_form_end_submit:not([name="create"], [name="cancel"], [name="save"], [name="delete"])').addClass("heighter-28-force");
    var is_html_mode_edit_web_pages = ($__source_query.indexOf("editok") !== -1 || $__source_query.indexOf("createok") !== -1 ? true : false),
        is_text_mode_edit_web_pages = ($__source_query.indexOf("textok") !== -1 ? true : false);
    if (is_html_mode_edit_web_pages && $("#body").length) {
        $("#editok").removeClass("btn-default").addClass("btn-grey");
        $("#body").css("display", "none");
        $("hr + b").addClass("hidden");
        $("#body").after('<div class="display-inline-block text-center __tmp__spinner" style="margin-top: -35px;"><span class="cspinner" style="margin-top:18px; position: relative"><span class="cspinner-icon"></span></span></div>');
        __init_ck_(["body", 2, true, "edit_web"])
    } else {
        if (is_text_mode_edit_web_pages) {
            $("#textok").removeClass("btn-default").addClass("btn-grey");
            v__cm___init() && t__cm___init($("textarea"), false, false, "static", true, true)
        }
    }
    $(".ui_form_end_submit").click(function() {
        $("body").removeAttr("data-unload-warning")
    });
    $("input:file").change(function() {
        var a = $(this);
        setTimeout(function() {
            $('form[action*="upload_html.cgi"]').append(a)
        }, 500)
    })
}
typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
if ($hostname == settings_allowed_hostname) {
    if (is__mf("postfix", "")) {
        $.each($(".icons-container a"), function(a, b) {
            if ($(this).attr("href") != "general.cgi" && $(this).attr("href") != "address_rewriting.cgi" && $(this).attr("href") != "local_delivery.cgi" && $(this).attr("href") != "resource.cgi" && $(this).attr("href") != "virtual.cgi" && $(this).attr("href") != "sasl.cgi" && $(this).attr("href") != "rate.cgi" && $(this).attr("href") != "rate.cgi" && $(this).attr("href") != "mailq.cgi" && $(this).attr("href") != "debug.cgi" && $(this).attr("href") != "manual.cgi") {
                $(this).parent(".icons-container").remove()
            }
        })
    }
}
var $magic_button_selector = '        body button[onclick*="window.open"][onclick*="choose"][onclick*="chooser.cgi"]:not([onclick*="_chooser.cgi"]),        body input[onclick*="window.open"][onclick*="choose"][onclick*="chooser.cgi"]:not([onclick*="_chooser.cgi"]),                body button[onclick*="window.open"][onclick*="choose"][onclick*="standard_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="standard_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="third_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="third_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="user_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="user_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="group_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="group_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="my_group_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="my_group_chooser.cgi"],                body button[onclick*="window.open"][onclick*="choose"][onclick*="module_chooser.cgi"],        body input[onclick*="window.open"][onclick*="choose"][onclick*="module_chooser.cgi"]    ';
if ($($magic_button_selector).length) {
    function magic_popup_run(b, f, h) {
        if (h) {
            if ($(".refInputData").is("textarea")) {
                var a = $(".refInputData");
                if (a.val()) {
                    a.val(a.val() + "\n" + b.replace(/\/\/+/g, "/"))
                } else {
                    a.val(b.replace(/\/\/+/g, "/"))
                }
            } else {
                $(".refInputData").val(b.replace(/\/\/+/g, "/"))
            }
            var g = $(".refInputData").parent("td").prev("td").find('input[type="radio"]'),
                e = $(".refInputData").parent("span").prev("span").find('input[type="radio"]'),
                d = $(".refInputData").prev("span").find('input[type="radio"]'),
                c = $(".refInputData").prev("select").find('option[value="*"]');
            if (e.length) {
                e.trigger("click")
            } else {
                if (d.length) {
                    d.trigger("click")
                } else {
                    if (c.length) {
                        c.parent("select").val("*").trigger("change")
                    } else {
                        g.trigger("click")
                    }
                }
            }
        }
        if (f) {
            $("body .mppopup").modal("hide")
        }
    }

    function addmodule(b, a) {
        adduser(b, a);
        return false
    }

    function addgroup(b, a) {
        adduser(b, a);
        return false
    }

    function adduser(b, a) {
        $v__mpp__g_olt = 0;
        $('.mppopup input[data-role="tagsinput"]').tagsinput("add", b);
        setTimeout(function() {
            if (!v__mpp__ml_t__e) {
                $(".mppopup_filter_input").val("");
                $(".mppopup_filter_input").focus().trigger("keyup")
            }
            v__mpp__ml_t__e = 0
        }, 440);
        return false
    }

    function parentdir(a) {
        fileclick(a, "1");
        $v__mpp__g_gp = 1
    }

    function fileclick(a, b) {
        $v__mpp__g_ol = a;
        $v__mpp__g_olt = b
    }

    function select(a, b) {
        $data_mppopup_value.val(a);
        return false
    }

    function filter_match(n, e, r) {
        e = "";
        r = r || false;
        var t = function(g) {
            g = g || false;
            var h = $(".mppopup table tbody tr");
            if (h.length > 0) {
                for (var b = 0; b < h.length; b++) {
                    var d = h[b];
                    var c = d.className;
                    if (!r && c !== e) {
                        continue
                    }
                    if (r && c.match(e) === null) {
                        continue
                    }
                    if (g) {
                        d.style.display = ""
                    } else {
                        d.style.display = "none"
                    }
                }
            }
            return h
        };
        n = n.trim();
        if (n !== "") {
            var q = t(false);
            if (q.length > 0) {
                for (var a = 0; a < q.length; a++) {
                    var s = q[a].className;
                    if (!r && s !== e) {
                        continue
                    }
                    if (r && s.match(e) === null) {
                        continue
                    }
                    var f = q[a].getElementsByTagName("a");
                    for (var i = 0; i < f.length; i++) {
                        var o = f[i].innerHTML.trim();
                        o = o.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");
                        if (o !== "") {
                            o = o.toLowerCase();
                            if (o.match(n.toLowerCase())) {
                                q[a].style.display = ""
                            }
                        }
                    }
                }
            }
        } else {
            t(true)
        }
    }

    function breadcrumbx_format(a) {
        a = $.url(a).attr("path").replace(/\/$/g, "").split("/");
        var b = "";
        $.each(a, function(d, e) {
            if (e === "") {
                b += '<a href="#' + d + '">' + (access_level() == 0 ? '<i class="fa fa-hdd-o margined-left--5"></i>' : '<i class="fa fa-user text-light margined-left--5"></i>') + "</a>\n"
            } else {
                b += '<a href="#' + d + '">' + e + "</a>\n"
            }
        });
        var c = '          <nav class="breadcrumbx">            ' + b + "            </nav>          ";
        return c + '<span class="cspinner hidden" style="margin-top: 2px; margin-left: 8px;"><span class="cspinner-icon smaller"></span></span>'
    }

    function mppopup_extract_chooser_link(a) {
        return a.replace(/&file.*&chroot/, "&file=" + encodeURIComponentSafe(($v__mpp__g_ol + "/").replace(/\/\/+/g, "/")) + "&chroot")
    }

    function mppopup_extract_chooser(a) {
        $(".mppopup .cspinner.hidden").removeClass("hidden");
        $.ajax({
            type: "POST",
            url: a,
            data: false,
            dataType: "text",
            success: function(e) {
                var d = e.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, ""),
                    c = $(d).filter(".table").html(),
                    b = $(d).filter(".table").prev("b").html();
                b = breadcrumbx_format(b);
                $(".mppopup .modal-body").html(b + '<table class="table table-hover table-condensed table-striped">' + c + "</table>");
                $v__mpp__g_gp = 0;
                $(".mppopup_filter_input").focus();
                $(".mppopup_filter_input").val("")
            }
        })
    }
    $("body").on("dblclick", '.mppopup a[onclick*="fileclick("], .mppopup a[onclick*="parentdir("]', function(a) {
        a.preventDefault()
    });
    var DELAY = 240,
        clicks = 0,
        timer = null;
    $("body").on("dblclick", '.mppopup a[onclick*="select("]', function(b) {
        $(".mppopup button[data-mppopup_confirm]").trigger("click")
    });
    $("body").on("click", '.mppopup a[onclick*="fileclick("], .mppopup a[onclick*="parentdir("]', function(b) {
        b.preventDefault();
        b.stopPropagation();
        b.stopImmediatePropagation();
        clicks++;
        $data_mppopup_value.val($v__mpp__g_ol);
        if (clicks === 1) {
            timer = setTimeout(function() {
                clicks = 0;
                typeof $v__mpp__g_gp == "undefined" ? $v__mpp__g_gp = 0 : 0;
                if (!$v__mpp__g_gp) {
                    magic_popup_run($v__mpp__g_ol, 0, 0)
                } else {
                    var a = mppopup_extract_chooser_link($v__mpp__g_op);
                    mppopup_extract_chooser(a)
                }
                $v__mpp__g_gp = 0
            }, DELAY)
        } else {
            clearTimeout(timer);
            clicks = 0;
            if ($v__mpp__g_olt) {
                var c = mppopup_extract_chooser_link($v__mpp__g_op);
                mppopup_extract_chooser(c)
            } else {
                magic_popup_run($v__mpp__g_ol, 1, 1)
            }
        }
    });
    $("body").on("click", ".mppopup button[data-mppopup_confirm]", function() {
        magic_popup_run($data_mppopup_value.val(), 1, 1)
    });
    $("body").on("show.bs.modal", ".mppopup", function() {
        v__mpp__ml_t__e = 0;
        $data_mppopup_value = $(".mppopup input[data-mppopup_value]");
        $('.mppopup input[data-role="tagsinput"]').tagsinput({
            onTagExists: function(b, a) {
                a.hide().fadeIn();
                v__mpp__ml_t__e = 1
            }
        })
    });
    $("body").on("shown.bs.modal", ".mppopup", function() {
        var b = $("body .mppopup").find(".modal-head"),
            a = $("body .mppopup").find(".modal-body"),
            d = $("body .mppopup").find(".modal-body table"),
            c = b.find(".mppopup_filter > input");
        setTimeout(function() {
            $(".mppopup_filter_input").animate({
                opacity: 1
            }, $settings_animation_tabs_slide_time);
            $(".mppopup_filter_input").focus()
        }, 0)
    });
    $("body").on("hidden.bs.modal", ".mppopup", function() {
        refInput.removeClass("refInputData");
        $('.mppopup input[data-role="tagsinput"]').tagsinput("destroy");
        $("body .mppopup").remove();
        $("button[data-mmclick].disabled, input[data-mmclick].disabled").removeClass("disabled").removeAttr("disabled")
    });
    $("body").on("click", ".mppopup_multi_done", function(a) {
        refInput.val($.trim($('.mppopup input[data-role="tagsinput"]').val().replace(/,/g, " ")));
        $('.mppopup span[aria-hidden="true"]').trigger("click")
    });
    $("body").on("keyup", ".mppopup_filter_input", function(c) {
        var d = c.which,
            j = $(".mppopup table tbody tr:visible"),
            g = j.find("td:first-child a"),
            e = $(".mppopup .breadcrumbx").length;
        if (e) {
            return
        }
        if (d == 13 && j.length === 1 && !c.shiftKey) {
            g.trigger("click")
        } else {
            if (d == 13 && j.length === 1 && c.shiftKey) {
                g.trigger("click").trigger("dblclick");
                var f = $(".mppopup .mppopup_multi_done:visible");
                if (f.length) {
                    setTimeout(function() {
                        f.trigger("click")
                    }, 240)
                }
            }
        }
        if (!$(".mppopup table tbody tr.noresults").length) {
            $(".mppopup table tbody").append('<tr class="hidden noresults"><td class="text-center" colspan="' + $(".mppopup table tbody tr:first-child td").length + '">' + lang("theme_xhred_global_no_results_found") + "</td></tr>")
        }
        var i = $(".mppopup table tbody tr:visible:not(.noresults)"),
            h = $(".mppopup table tbody tr.noresults");
        if (i.length) {
            h.addClass("hidden")
        } else {
            h.removeClass("hidden")
        }
    });

    function mppopup_get_ref_input(c, a) {
        var b = c.prev('input[type="text"], input[name]');
        if (!b.is("input") && !c.prev("textarea").length && !c.prev("br").prev("textarea").length) {
            b = c.prev("span:not(.awradio)").find('input[type="text"]')
        } else {
            if (!b.length && !b.is("input") && a) {
                b = c.prev("textarea");
                if (!b.length) {
                    b = c.prev("br").prev("textarea")
                }
            }
        }
        return b
    }
    $($magic_button_selector).each(function() {
        $(this).attr("data-mmclick", $(this).attr("onclick")).removeAttr("onclick");
        var a = mppopup_get_ref_input($(this), 0);
        if (a.length) {
            $(this).css("margin-left", "-8px")
        }
    });
    $("body").on("click", "button[data-mmclick]:not(.disabled), input[data-mmclick]:not(.disabled)", function(a) {
        a.preventDefault();
        a.stopPropagation();
        refInput = mppopup_get_ref_input($(this), 1);
        var h = $(this),
            c = refInput.val(),
            f = encodeURIComponent(c),
            i = $(this).attr("data-mmclick"),
            j = i.match("window.open\\(['\"]*(.*?)(\\s*['\"]*,.*?)"),
            b = j[1].match(/(\w+\.[a-z]{3,4})/gi)[0],
            e = b.replace(".cgi", "");
        h.addClass("disabled").attr("disabled", "disabled");
        if (j[1]) {
            var d = j[1].replace("encodeURIComponent(ifield.value)", "refInputCurrValSafe");
            d = d.replace('"+"', "").replace('"+', "").replace("refInputCurrValSafe", f);

            function k(q, p, o, n, r) {
                var m;
                if (r) {
                    m = '                  <div class="modal-footer">                    <div class="input-group">                      <input data-role="tagsinput" class="form-control ui_textbox" type="text" value="' + (c ? (c.replace(/ /g, ",")) : "") + '">                      <span class="input-group-btn mppopup_multi_done">                        <button type="button" class="btn btn-success heighter-28"><i class="fa fa-fw fa-circle-check"> </i>&nbsp;' + lang("theme_xhred_global_select") + "</button>                      </span>                    </div>                  </div>"
                } else {
                    m = '                  <div class="modal-footer">                    <div class="input-group">                      <input class="form-control ui_textbox" data-mppopup_value type="text" value="' + c + '">                      <span class="input-group-btn mppopup_string_done">                        <button type="button" class="btn btn-success heighter-28" data-mppopup_confirm><i class="fa fa-fw fa-circle-check"> </i>&nbsp;' + lang("theme_xhred_global_select") + "</button>                      </span>                    </div>                  </div>"
                }
                var l = '                      <div class="modal fade fade5 mppopup" tabindex="-1" role="dialog">                        <div class="modal-dialog" role="document">                        <div class="modal-content">                          <div class="modal-header">                            <button type="button" class="close" data-dismiss="modal" aria-label="' + lang("theme_xhred_global_close") + '"><span aria-hidden="true">&times;</span></button>                            <h4 class="modal-title">                              <div class="mppopup_filter">                                <input class="form-control ui_textbox mppopup_filter_input" style="opacity: 0" type="text" placeholder="' + lang("theme_xhred_datatable_filter") + '" size="50" onkeyup="filter_match(this.value,\'row\',true);">                              </div>                            </h4>                          </div>                          <div class="modal-body ' + e + '">                            ' + q + "                          </div>                            " + m + "                        </div>                      </div>                    </div>                ";
                $("body").append(l);
                refInput.addClass("refInputData");
                $("body .mppopup").modal("show")
            }

            function g(l) {
                if (!l[1].startsWith("/")) {
                    $v__mpp__g_op = "/" + l[1]
                } else {
                    $v__mpp__g_op = l[1]
                }
            }
            $.ajax({
                type: "POST",
                url: d,
                data: false,
                dataType: "text",
                success: function(p) {
                    var o = p;
                    var l = p.match('<frame.*?src="([^"]+)"');
                    if ($.isArray(l) && l[1] && l[1].indexOf("&multi=1") === -1) {
                        g(l);
                        $.ajax({
                            type: "POST",
                            url: $v__mpp__g_op,
                            data: false,
                            dataType: "text",
                            success: function(u) {
                                var s = u.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, ""),
                                    r = $(s).filter(".table").html(),
                                    q = $(s).filter(".table").prev("b").html();
                                var t = breadcrumbx_format(q);
                                s = t + '<table class="table table-hover table-condensed table-striped">' + r + "</table>";
                                k(s, "type1", 0, refInput, 0)
                            }
                        })
                    } else {
                        if (!$.isArray(l)) {
                            if ($.isArray(l) && l[1].indexOf("&multi=1") === -1) {
                                return
                            }
                            var n = o,
                                m = $(n).filter("table").html();
                            k('<table class="table table-hover table-condensed table-striped type2" data-target="' + refInput + '">' + m + "</table>", "", 1, refInput, 0)
                        } else {
                            g(l);
                            $.ajax({
                                type: "POST",
                                url: $v__mpp__g_op,
                                data: false,
                                dataType: "text",
                                success: function(s) {
                                    var r = s.replace(/<(!doctype|script|link|meta)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(script|link|meta)>/gi, "").replace(/<\/body>|<\/html>/gi, ""),
                                        q = $(r).filter("table").html();
                                    r = '<table class="table table-hover table-condensed table-striped type2">' + q + "</table>";
                                    k(r, "type2", 0, refInput, 1)
                                }
                            })
                        }
                    }
                }
            })
        } else {
            $(this).removeClass("disabled");
            $(this).attr("onclick", $(this).attr("data-mmclick")).removeAttr("data-mmclick");
            $(this).trigger("click")
        }
    })
}
if (is__mf("virtualmin-nginx", "") || is__mf("virtualmin-awstats", "") || is__mf("fdisk", "edit_disk.cgi") || is__mf("virtual-server", "edit_newlinks.cgi") || is__mf("virtualmin-dav", "list_shares.cgi") || ($current_directory == $_____link + "pam/" && !$__source_file) || ($current_directory == $_____link + "syslog/" && !$__source_file) || ($current_page_full == $_____link_full + "/postfix/master.cgi")) {
    setTimeout(function() {
        var b = $('.panel-body > .ui_link, .panel-body > .ui_link_replaced,					 body[data-uri*="virtualmin-awstats"] .panel-body > form > .ui_link_replaced,					 body[data-uri*="edit_disk.cgi"] .panel-body p > a.ui_link_replaced,					 body[data-uri*="edit_newlinks.cgi"] .panel-body > form > .ui_link_replaced,					 body[data-uri*="edit_newlinks.cgi"] .panel-body > .ui_emptymsg + p > .ui_link_replaced'),
            c = $.trim(b.first().text()),
            a = b.first().attr("href");
        $("#headln2r .btn-group a").addClass("pull-left").attr("style", "");
        $("#headln2r .btn-group").prepend('		<a href="' + a + '" class="btn btn-link text-lighter text-decoration-none pull-left" data-placement="auto top" data-toggle="tooltip" data-container="body" data-title="' + c + '">			<i class="fa fa-plus"></i>		</a>	');
        b.next("br").remove();
        b.remove()
    }, 0)
}
if (__isNR || __isNM) {
    if ($(".opener_shown").length > 0) {
        var __tmp_ui_grinTable = $(".opener_container, .opener_container:hidden").find(".ui_grid_table, .ui_grid_table:hidden");
        if (__tmp_ui_grinTable.length) {
            $.each(__tmp_ui_grinTable, function(a, b) {
                $(this).parent("td").attr("style", "padding: 0 !important")
            })
        }
    }
    if ($(".opener_table_style_small").length > 0) {
        var __tmp_ui_hardTable = $(".opener_table_style_small, .opener_table_style_small:hidden").find(".sub_table_container.table-hardcoded, .sub_table_container.table-hardcoded:hidden");
        if (__tmp_ui_hardTable.length) {
            $.each(__tmp_ui_hardTable, function(a, b) {
                $(this).parent("td").attr("style", "padding: 0 !important");
                $(this).find("tbody tr td").attr("style", "padding-left: 3px !important; padding-right: 3px !important")
            })
        }
    }
}
$('html[data-script-name*="webmin/edit_assignment.cgi"] table table tbody tr td, html[data-script-name*="usermin/edit_assignment.cgi"] table table tbody tr td').hover(function() {
    if ($(this).is("td:nth-child(1)") || $(this).is("td:nth-child(3)")) {
        $(this).addClass("hl-ow").next("td").addClass("hl-ow")
    } else {
        if ($(this).is("td:nth-child(2)") || $(this).is("td:nth-child(4)")) {
            $(this).addClass("hl-ow").prev("td").addClass("hl-ow")
        }
    }
}, function() {
    $(this).removeClass("hl-ow").next("td").removeClass("hl-ow");
    $(this).removeClass("hl-ow").prev("td").removeClass("hl-ow")
});
if ($current_page_full && $current_page_full.indexOf("/sysinfo.cgi") > -1 && __num()) {
    $(".piechart canvas").hover(function() {
        var a = $(this).parent("span").attr("data-charts").split("_")[1];
        if ((a == "cpu" || a == "mem" || a == "virt") && !is_module("proc")) {
            return
        } else {
            if (a == "disk" && !is_module("disk-usage") && !is_module("quota")) {
                return
            }
        }
        $(this).addClass("cursor-alias");
        $(this).prev("span").prepend('<i class="fa fa-fw fa-link">&nbsp;</i>')
    }, function() {
        $(this).prev("span").find("i").remove()
    });
    $("body").on("click", "canvas", function(b) {
        b.preventDefault();
        var a = $(this).parent("span").attr("data-charts").split("_")[1];
        if (a == "cpu" && is_module("proc")) {
            window.location.href = $_____link_full + "/proc/index_cpu.cgi"
        } else {
            if ((a == "mem" || a == "virt") && is_module("proc")) {
                window.location.href = $_____link_full + "/proc/index_size.cgi"
            } else {
                if (a == "disk" && is_module("disk-usage")) {
                    window.location.href = $_____link_full + "/disk-usage"
                } else {
                    if (a == "disk" && is_module("quota")) {
                        window.location.href = $_____link_full + "/quota/list_users.cgi?dir=%2F"
                    }
                }
            }
        }
    })
}
is__mf("sysstats", "display_all.cgi") && setTimeout(function() {
    __lre()
}, 600);
if (is__m("changepass") || is__mf("server-manager", "edit_pass.cgi") || is__mf("virtual-server", "list_databases.cgi") || is__mf("acl", "edit_user.cgi") || is__mf("virtual-server", "clone_form.cgi") || is__mf("virtual-server", "edit_user.cgi") || is__mf("virtual-server", "edit_domain.cgi") || is__mf("virtual-server", "domain_form.cgi") || is__mf("samba", "edit_euser.cgi") || is__mf("samba", "ask_epass.cgi") || is__mfq("virtualmin-registrar", "edit.cgi", "registrar=") || is__mfq("htaccess-htpasswd", "edit_user.cgi", "new=") || is__mfq("postgresql", "edit_user.cgi", "new=") || is__mfq("mysql", "edit_user.cgi", "new=") || is__mf("useradmin", "edit_group.cgi") || is__mf("useradmin", "edit_user.cgi") || is__mfq("passwd", "edit_passwd.cgi", "user=")) {
    setTimeout(function() {
        $("#headln2r .btn-group a").addClass("pull-left").attr("style", "");
        $("#headln2r .btn-group").prepend('		<a href="#" class="btn btn-link text-lighter text-decoration-none pull-left generate-password-key" data-placement="auto top" data-toggle="tooltip" data-container="body" data-title="' + upperFirstLowerAll(lang("theme_xhred_password_generator_new")) + '">			<i class="fa fa-1_25x fa-key-plus" style="width: 14px; margin-left: -3px;"></i>		</a>	');
        $("body .generate-password-key").click(function(c) {
            var a = passwordGenerator();
            $("body").append('<button class="hidden tmp-clipboard-obj" data-clipboard-text="' + a + '"></button>');
            var b = new Clipboard(".tmp-clipboard-obj");
            $(".tmp-clipboard-obj").trigger("click");
            $(".tmp-clipboard-obj").remove();
            b.destroy();
            messenger('<i class="fa fa-lg fa-fw fa-key-plus"></i>' + lang("theme_xhred_password_generator_new_success").replace("%password", '&nbsp;<code class="vertical-align-middle">' + a + "</code>&nbsp;"), 10, "success", "newGeneratedPassword")
        })
    }, 0)
}
if ($access_level == 0 && is_module("status") == 1) {} else {
    t___wi.settings_side_slider_enabled = false;
    t__wi_p.settings_side_slider_enabled = false;
    t__wi_p.$("html").attr("data-slider-fixed", "0");
    t__wi_p.$("#right-side-tabs, .right-side-tabs-toggler").addClass("hidden")
}
if (is__mf("bind8", "edit_zonekey.cgi")) {
    format_new_lines($("textarea#ds"), $("#headln2c").find("span[data-sub_title]").text())
}
if (is__mf("virtual-server", "edit_script.cgi")) {
    $('select[name="version"]').addClass("heighter-34 margined-top-4")
}
if (is__mf("virtual-server", "transfer_form.cgi")) {
    $('input[name="newttl"]').addClass("heighter-34")
}
brake_long_lines((is__mf("firewall", "") || is__mf("firewall", "index.cgi")), $(".ui_checked_columns td label b"), ",");
$.each($(".gl-icon-container"), function(a, b) {
    if (!$(this).find("a:first").find("i.fa-edit").length) {
        $(this).find("a:first").prepend('<i class="fa fa-fw fa-lg fa-select text-dark text-dark-hoverd gl-icon-select"></i>');
        $(this).find("a:first").prepend('<i class="fa fa-fw fa-edit text-semi-dark text-dark-hoverd gl-icon-edit"></i>')
    }
});
if (is__mf("virtual-server", "index.cgi")) {
    $("body").on("click", 'a[href*="edit_domain.cgi"], a[href*="list_users.cgi"], a[href*="list_aliases.cgi"]', function(e) {
        var g = URI.parseQuery(URI($(this).attr("href")).query())["dom"],
            h = t__wi_p.$('select[name="dom"]'),
            f = h.val();
        if (g != f) {
            t__wi_p.t__vm_l(g)
        }
    })
}
if (is__mf("server-manager", "index.cgi")) {
    $("body").on("click", 'a[href*="edit_serv.cgi"], a[href*="mass_update_form.cgi"]', function(e) {
        var g = URI.parseQuery(URI($(this).attr("href")).query())["id"],
            h = t__wi_p.$('select[name="sid"]'),
            f = h.val();
        if (g != f) {
            t__wi_p.t__cm_l(g)
        }
    })
}
if (is__mf("webmin", "refresh_modules.cgi")) {
    t__wi_p.f__l_reload()
}
t___wi.onbeforeunload = function(b) {
    if ($('form[action*="export"]:visible').length || ($__relative_url && $__relative_url.indexOf("software/list_pack.cgi?package=") > -1)) {
        return
    }
    t___wi.parent.$___________right = 0;
    t__wi_p.__lrs();
    if ($('body[data-unload-warning="1"]').length && $("#atsave, #save_user").length) {
        $("#atsave, #save_user")[0].scrollIntoView()
    }
    if ($('body[data-unload-warning="1"]').length || $('button[type="button"]:not(.ui_form_end_submit)').attr("data-form-onbeforeunload") == 1 || $('button[type="submit"]:not(.ui_form_end_submit)').attr("data-form-onbeforeunload") == 1 || $("body").find("._filemanager_file_editor_save.text-danger").length) {
        if (typeof t__wi_p.NProgress === "object") {
            t__wi_p.NProgress.done()
        }
        return (!$('[data-form-onbeforeunload-tabledata="1"]').length ? lang("theme_xhred_filemanager_file_edit_but_not_saved") : lang("theme_xhred_database_edit_but_not_saved")) + "\n\n" + lang("theme_xhred_filemanager_file_edit_but_not_saved_what_to_do")
    }
};