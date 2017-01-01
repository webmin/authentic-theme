/*!
 * Authentic Theme 18.31 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
t__wi_p.$____loader_block__ = 1;

function __f___mn() {
    return $g__m__name
}

function __f___gd() {
    return $(_f__table().fnGetNodes()).find("input").add($(".active form > input")).serialize()
}

function _f__gr(b) {
    if (b) {
        return $(_f__table().fnGetNodes()).find("input:checked")
    } else {
        return $(_f__table().fnGetNodes()).find("input")
    }
}

function __f__ld__sh() {
    if (typeof t__wi_p.NProgress == "object") {
        t__wi_p.NProgress.start()
    }
}

function __f__ld__bg() {
    modal_dismiss();
    __f_____ul()
}

function __f__upd_____tl(b) {
    var a = $("div.total").children().clone();
    $("div.total").empty().html(b + ".&nbsp;").append(a)
}

function __f___ub() {
    $("div button.o__f_m-button-delete").removeClass("disabled").attr("onclick", "removeDialog()");
    $(".o__f_m-button-chmod").removeClass("disabled").find("a").attr("onclick", "chmodDialog()");
    $(".o__f_m-button-chown").removeClass("disabled").find("a").attr("onclick", "chownDialog()");
    $(".o__f_m-button-chattr").removeClass("disabled").find("a").attr("onclick", "chattrDialog()");
    $(".o__f_m-button-chcon").removeClass("disabled").find("a").attr("onclick", "chconDialog()");
    $(".o__f_m-button-compress").removeClass("disabled").find("a").attr("onclick", "compressDialog()");
    $(".o__f_m-button-copy").removeClass("disabled");
    $(".o__f_m-button-cut").removeClass("disabled")
}

function __f___lb() {
    $("div button.o__f_m-button-delete").addClass("disabled").removeAttr("onclick");
    $(".o__f_m-button-chmod").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-chown").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-chattr").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-chcon").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-compress").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-copy").addClass("disabled").find("a").removeAttr("onclick");
    $(".o__f_m-button-cut").addClass("disabled").find("a").removeAttr("onclick")
}

function __f_____sl() {}

function __f_____hl() {}

function __f_____hl_() {
    setTimeout(function() {}, 750)
}

function __f_____lo(c, d) {
    if (d === true) {
        $("body").find("#list_form table tbody").addClass((c ? " o__f_m-updating" : "") + "");
        $("body").find("ul.pagination").addClass("pointer-events-none");
        $(".nav.nav-tabs li").addClass("disabled");
        $("#file-manager-new-instance").addClass("disabled_no_styling cursor-na")
    }
    __f_____sl()
}

function __f_____ul() {
    $("body").find("#list_form table tbody").css("opacity", "1").removeClass("o__f_m-updating");
    $("body").find("ul.pagination").css("opacity", "1").removeClass("pointer-events-none");
    __f_____hl();
    $(".btn-group.pull-right > .btn-group > button, .nav.nav-tabs li").removeClass("disabled");
    $("#file-manager-new-instance").removeClass("disabled_no_styling cursor-na")
}

function __init__dt_ck__e() {
    if ($(".active td.dataTables_empty").length) {
        $(".active table").attr("style", "border-top-width: 1px !important;");
        $(".active td.dataTables_empty").css({
            padding: "4px",
            "border-top-color": "#eaeaea"
        });
        $(".dataTables_paginate").addClass("hidden");
        $(".active td.dataTables_empty").attr("colspan", (parseInt($(".active thead tr th:visible").length)));
        setTimeout(function() {
            if ($(".__o__f_m-search-results").length) {
                $("td.dataTables_empty").html(lang("theme_xhred_datatable_no_search_results"))
            }
        }, 0)
    } else {
        $(".active table, .active td.dataTables_empty").removeAttr("style");
        $(".dataTables_paginate").removeClass("hidden")
    }
}

function __f____success(a, d, D, f, c, r, h, e, A, B, s, o, k, v, w) {
    var x = $.parseHTML(a),
        m = ($(x[2]).html() && $(x[2]).html().length),
        z = ($(x[3]).html() && $(x[3]).html().length),
        n = (typeof w == "undefined" ? false : w),
        u = $(".active form input#path").val(),
        q = 1,
        p = 1,
        t = 1;

    function C(G) {
        var F = JSON.parse(G),
            E = '<div class="margined-left-40">';
        $.each(F, function(I, H) {
            E += "<samp>• " + I + "</samp> - " + H + "<br>"
        });
        E += "</div>";
        return E
    }
    if (n && n[0] == "compress") {
        var y = n[1],
            b = n[2];
        if (u != y) {
            q = 0;
            p = 0;
            t = 0;
            if (m) {
                messenger('<i class="fa fa-lg fa-fw ' + (z ? "fa-exclamation-circle" : r) + '"></i>&nbsp;&nbsp;&nbsp;' + ((lang("theme_xhred_filemanager_successful_compression_bg_with_errors").replace("%file", b).replace("%path", y)) + (C($(x[2]).text()))), e, (A), v + "_" + A)
            } else {
                messenger('<i class="fa fa-lg fa-fw ' + B + '"></i>&nbsp;&nbsp;&nbsp;' + (lang("theme_xhred_filemanager_successful_compression_bg").replace("%file", b).replace("%path", y)), o, "info", v + "_" + k)
            }
        }
    }
    if (m && q) {
        messenger('<i class="fa fa-lg fa-fw ' + (z ? "fa-exclamation-circle" : r) + '"></i>&nbsp;&nbsp;&nbsp;' + lang(h + (z ? "_fatal" : "")) + (C($(x[2]).text())), e, (z ? "error" : A), v + "_" + A)
    } else {
        if (p) {
            messenger('<i class="fa fa-lg fa-fw ' + B + '"></i>&nbsp;&nbsp;&nbsp;' + lang(s), o, k, v + "_" + k)
        }
    }
    c && $("." + c).remove();
    if (!z) {
        d && __f_____ul();
        D && modal_dismiss();
        (f && t) && __f___u("upd", $(x[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, false, false, $(x[0]).text())
    }
}

function __f____a(n, e) {
    if (e && !$.isArray(e)) {
        e = encodeURIParam(e, "path")
    }
    if (n === "extract") {}
    var q = $('#list_form > input[type="hidden"][name="path"]').val();
    if (n != "bookmark") {
        __f_____lo(false, true)
    }
    if (n === "copy" || n === "cut") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/" + n + ".cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                localStorage.removeItem($hostname + "-cut");
                localStorage.removeItem($hostname + "-copy");
                localStorage.setItem($hostname + "-" + n, 1);
                $(".o__f_m-button-paste").removeClass("disabled");
                if (n === "copy") {
                    messenger('<i class="fa fa-lg fa-fw fa-clone"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_copying_successful"), 1.5, "info", n + "_info")
                } else {
                    if (n === "cut") {
                        messenger('<i class="fa fa-lg fa-fw fa-scissors"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_cutting_successful"), 1.5, "warning", n + "_warning")
                    }
                }
                __f_____ul()
            },
            error: function(a) {
                messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_buffer_error"), 10, "error", n + "_error")
            }
        })
    }
    if (n === "paste") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(q) + "&module=" + $g__m__name,
            data: false,
            dataType: "text",
            success: function(a) {
                messenger_hide("paste_info");
                g = $.parseHTML(a);
                var c = (get_cookie("file-manager-response_count") == "1" ? 1 : 2);
                var b = get_cookie("file-manager-response");
                if (b.indexOf("err") === -1) {
                    localStorage.removeItem($hostname + "-cut");
                    if (!localStorage.getItem($hostname + "-copy")) {
                        $(".o__f_m-button-paste").addClass("disabled")
                    }
                }
                if (b == "err") {
                    messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>&nbsp;&nbsp;&nbsp;' + $(g[2]).html(), 20, "warning", n + "_warning");
                    __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
                } else {
                    if (b == "merr") {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_move_into_self"), 10, "error", n + "_error");
                        __f_____ul()
                    } else {
                        if (b == "ep") {
                            bootbox.dialog({
                                message: lang("theme_xhred_filemanager_target_conflict_message_" + c + ""),
                                title: '<i class="fa fa-fw fa-exclamation-circle font-size-80p bootbox-o__f_m-save-prompt">&nbsp;&nbsp;</i> <strong class="font-size-90p">' + lang("theme_xhred_filemanager_target_conflict_" + c + "") + "</strong>",
                                buttons: {
                                    success: {
                                        label: '&nbsp;<i class="fa fa-fw fa-clipboard">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_target_conflict_paste") + "&nbsp;&nbsp;",
                                        className: "btn-primary vertical-align-top ",
                                        callback: function() {
                                            $.ajax({
                                                type: "POST",
                                                url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(q) + "&module=" + $g__m__name + "&ua=2",
                                                data: false,
                                                dataType: "text",
                                                success: function(d) {
                                                    d = $.parseHTML(d);
                                                    if ($(d[2]).html().length > 1) {
                                                        messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>&nbsp;&nbsp;&nbsp;' + $(d[2]).html(), 15, "warning", n + "_warning")
                                                    } else {
                                                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_pasting_and_copying_" + c + ""), 5, "success", n + "_success")
                                                    }
                                                    __f___u("upd", $(d[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(d[0]).text())
                                                },
                                                error: function(d) {}
                                            })
                                        }
                                    },
                                    danger: {
                                        label: '&nbsp;<i class="fa fa-fw fa-times-circle-o">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_target_conflict_replace") + "&nbsp;&nbsp;",
                                        className: "btn-danger vertical-align-top margined-left--2",
                                        callback: function() {
                                            $.ajax({
                                                type: "POST",
                                                url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(q) + "&module=" + $g__m__name + "&ua=1",
                                                data: false,
                                                dataType: "text",
                                                success: function(d) {
                                                    d = $.parseHTML(d);
                                                    if ($(d[2]).html().length > 1) {
                                                        messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>&nbsp;&nbsp;&nbsp;' + $(d[2]).html(), 15, "warning", n + "_warning")
                                                    } else {
                                                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_pasting_and_replacing_" + c + ""), 5, "success", n + "_success")
                                                    }
                                                    __f___u("upd", $(d[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(d[0]).text())
                                                },
                                                error: function(d) {}
                                            })
                                        }
                                    }
                                },
                                onEscape: function() {}
                            })
                        } else {
                            if (b == "cc") {
                                messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_pasting_and_copying_" + c + ""), 5, "success", n + "_success");
                                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
                            } else {
                                messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_pasting_successful"), 5, "success", n + "_success");
                                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
                            }
                        }
                    }
                }
            },
            error: function(a) {}
        })
    }
    if (n === "extract") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/extract.cgi?&module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (n === "bookmark") {
        __f_____sl();
        __f_____hl_();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/" + e + "&module=" + $g__m__name,
            data: false,
            dataType: "text",
            success: function(a) {
                exiting_book_mark = f_m__bm__u();
                if (exiting_book_mark.length) {
                    messenger('<i class="fa fa-lg fa-fw fa-star-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_unbookmark_success").replace("%value", (q ? q : "/")), 5, "warning", "bookmarkAddRemove")
                } else {
                    messenger('<i class="fa fa-lg fa-fw fa-star"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_bookmark_success").replace("%value", (q ? q : "/")), 5, "info", "bookmarkAddRemove")
                }
            },
            error: function(a) {}
        })
    }
    if (n === "delete") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/delete.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                messenger_hide("delete_info");
                __f____success(a, 1, 1, 1, false, "fa-exclamation-triangle", "theme_xhred_filemanager_delete_warning", 30, "warning", "fa-trash-o", "theme_xhred_filemanager_successful_deletion", 2, "info", n)
            },
            error: function(a) {}
        })
    }
    if (n === "rename") {
        __f__ld__sh();
        var h = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/rename.cgi?module=" + $g__m__name,
            data: $("#renameForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + a, 10, "error", n + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n)
            },
            error: function(a) {}
        })
    }
    if (n === "create_folder") {
        __f__ld__sh();
        var h = encodeURIComponentSafe($('#list_form > input[type="hidden"][name="path"]').val());
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/create_folder.cgi?module=" + $g__m__name,
            data: $("#createFolderForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + a, 10, "error", n + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (n === "create_file") {
        __f__ld__sh();
        var h = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/create_file.cgi?module=" + $g__m__name,
            data: $("#createFileForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + a, 10, "error", n + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, n, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (n === "url_download") {
        __f__ld__sh();
        var h = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $_____link_full + "/" + __f___mn() + "/http_download.cgi",
            data: $("#downFromUrlForm").serialize(),
            dataType: "text",
            success: function(a) {
                messenger_hide("url_download_info");
                if (!$(a).find(".panel-body").text().match(/100 %/) && !$(a).find(".panel-body").text().match(/100%/) && !$(a).find(".panel-body h3").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + $(a).find(".panel-body").html(), 10, "error", n + "_error");
                    __f_____ul();
                    return
                } else {
                    if ($(a).find(".panel-body h3").length) {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + $(a).find(".panel-body h3").html(), 10, "error", n + "_error");
                        return
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-download"></i>&nbsp;&nbsp;&nbsp;' + $(a).find(".panel-body").html(), 5, "success", n + "_success");
                        __f____r("get", "index.cgi?path=" + (h ? encodeURIComponentSafe(h) : ""), false, 0)
                    }
                }
            },
            error: function(a) {}
        })
    }
    if (n === "search") {
        __f__ld__sh();
        var h = $('#list_form > input[type="hidden"][name="path"]').val(),
            o = $("#searchForm").find('input[name="query"]').val(),
            m = $.trim($("#searchForm").find('input[name="grepstring"]').val()),
            k = $.trim($("#searchForm").find('input[name="grepreplace"]').val()),
            p = (m && !k ? " fa-1_50x fa-file-find" : m && k ? " fa-1_50x fa-find-replace" : " fa-lg fa-search");
        modal_dismiss();
        if (m && !k) {
            messenger('<i class="fa fa-1_50x fa-fw fa-file-find"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_searching_matching").replace("%value", o).replace("%text", m) + " " + lang("theme_xhred_global_please_wait"), 10000, "info", n + "_preMe")
        } else {
            if (m && k) {
                messenger('<i class="fa fa-1_50x fa-fw fa-find-replace"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_searching_replacing").replace("%value", o).replace("%text", m).replace("%replace", k) + " " + lang("theme_xhred_global_please_wait"), 10000, "warning", n + "_preMe")
            } else {
                messenger('<i class="fa fa-lg fa-fw fa-search"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_searching").replace("%value", o) + " " + lang("theme_xhred_global_please_wait"), 10000, "info", n + "_preMe")
            }
        }
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/search.cgi?module=" + $g__m__name,
            data: $("#searchForm").serialize(),
            dataType: "text",
            success: function(b) {
                xx = $.parseHTML(b);
                __f___u("upd", $(xx[1]).find("table.ui_columns").find(".ui_checked_columns"), 0, "search", false, $(xx[0]).text());
                var c = $('body[class*="' + $g__o__f_m + '"]');
                if (c.find(".breadcrumb .fa-hdd-o").length) {
                    c.find(".breadcrumb .fa-hdd-o").removeClass("fa-hdd-o").addClass("fa-search").addClass("text-light").parent("a").removeAttr("href").replaceTagName("span")
                } else {
                    c.find(".breadcrumb li:first-child a").html('<i class="fa fa-fw fa-search text-light"></i>')
                }
                c.find(".breadcrumb li:not(:first-child) a").replaceWith(function() {
                    return $("<span>", {
                        html: $(this).html()
                    })
                });
                c.find(".breadcrumb li").addClass("text-light");
                $(".__o__f_m-search-results").remove();
                $(".ui_checked_columns.directory_go_up").addClass("hidden");
                $_br = $(".breadcrumb > li:last-child");
                $_br.html($_br.html() + '<span class="__o__f_m-search-results">' + ($(".breadcrumb > li:last-child a i").hasClass("fa-search") ? "&nbsp;&nbsp;&nbsp;/&nbsp;" : "") + '&nbsp;&nbsp;:&nbsp;&nbsp;<span class="text-primary __o__f_m-search-results-data cursor-pointer">`<em><samp class="small">' + o + "</samp>" + (m && !k ? ' <samp class="small">[' + m + "]</samp>" : (m && k) ? ' <samp class="small">[' + m + '<span class="smaller"> -> </span>' + k + "]</samp>" : "") + "</em>`</span></span>");
                var a = 5000;
                if (__list_table_total_rows > 1) {
                    if (m && k) {
                        messenger('<i class="fa fa-fw ' + p + '"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_search_replaced_multi").replace("%value", __list_table_total_rows), 10, "success", n + "_success");
                        a = 9000
                    } else {
                        messenger('<i class="fa fa-fw ' + p + '"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_search_founds").replace("%value", __list_table_total_rows), 6, "success", n + "_success")
                    }
                } else {
                    if (__list_table_total_rows == 1) {
                        if (m && k) {
                            messenger('<i class="fa fa-fw ' + p + '"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_search_replaced"), 6, "success", n + "_success")
                        } else {
                            messenger('<i class="fa fa-fw ' + p + '"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_search_found"), 6, "success", n + "_success")
                        }
                    } else {
                        messenger('<i class="fa fa-fw ' + p + '"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_search_no_matches"), 6, "error", n + "_error")
                    }
                }
                setTimeout(function() {
                    messenger_hide("search_preMe")
                }, a)
            },
            error: function(a) {}
        })
    }
    if (n === "chmod") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="perms" value="' + e[0] + '" class="_o__f_m-tmp-chmod-inputs">');
        $("#list_form").append('<input type="hidden" name="applyto" value="' + e[1] + '" class="_o__f_m-tmp-chmod-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chmod.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chmod_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chmod-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_permissions_with_errors", 15, "warning", "fa-cogs", "theme_xhred_filemanager_successful_permissions", 3, "success", n)
            },
            error: function(a) {}
        })
    }
    if (n === "chown") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="owner" value="' + e[0] + '" class="_o__f_m-tmp-chown-inputs">');
        $("#list_form").append('<input type="hidden" name="group" value="' + e[1] + '" class="_o__f_m-tmp-chown-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + e[2] + '" class="_o__f_m-tmp-chown-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chown.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chown_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chown-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_ownership_with_errors", 15, "warning", "fa-users", "theme_xhred_filemanager_successful_ownership", 3, "success", n)
            },
            error: function(a) {}
        })
    }
    if (n === "chattr") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="label" value="' + e[0] + '" class="_o__f_m-tmp-chattr-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + e[1] + '" class="_o__f_m-tmp-chattr-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chattr.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chattr_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chattr-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_attributes_with_errors", 15, "warning", "fa-tags", "theme_xhred_filemanager_successful_attributes", 3, "success", n)
            },
            error: function(a) {}
        })
    }
    if (n === "chcon") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="label" value="' + e[0] + '" class="_o__f_m-tmp-chcon-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + e[1] + '" class="_o__f_m-tmp-chcon-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chcon.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chcon_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chcon-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_secontext_with_errors", 15, "warning", "fa-tags", "theme_xhred_filemanager_successful_secontext", 3, "success", n)
            },
            error: function(a) {}
        })
    }
    if (n === "compress") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="arch" value="' + e[0] + '" class="_o__f_m-tmp-compress-inputs">');
        $("#list_form").append('<input type="hidden" name="method" value="' + e[1] + '" class="_o__f_m-tmp-compress-inputs">');
        __f__ld__bg();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/compress.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    if (t__wi_p.t___p__xhr_r === 0) {
                        messenger_hide("compress_info")
                    }
                }, 2000);
                __f____success(a, 1, 0, 1, "_o__f_m-tmp-compress-inputs", "fa-exclamation-circle", "theme_xhred_filemanager_successful_compression_with_errors", 15, "warning", "fa-file-archive-o", "theme_xhred_filemanager_successful_compression", 8, "success", n, [n, q, e[0] + $('select option[value="' + e[1] + '"]').text()])
            },
            error: function(a) {}
        })
    }
}

function __f___cs() {
    $("#list_form table tbody tr").removeClass("m-active m-not-active")
}

function __f___ds_a() {
    var a = document.getElementsByClassName("ui_checked_columns");
    for (i = 0; i < a.length; i++) {
        var b = a[i].getElementsByTagName("input")[0];
        if (b.checked) {
            rowClick(a[i])
        }
    }
    __f___lb()
}

function __f__get_fs() {
    $(".total_size_data").parent("span").addClass("hidden");
    $(".total_size_data").data("total", 0);
    $.each(_f__table().dataTable().$("tr.hl-aw", {
        filter: "applied"
    }), function() {
        var d = $(this),
            c = $('#list_form > input[type="hidden"][name="path"]').val().replace(/\/$/g, "") + "/" + d.find("td:nth-child(3) a").text(),
            a = d.find("td.column-filesize").find("label"),
            b = _f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            });
        __f_____sl();
        a.html('<span class="cspinner" style="margin-top: -11px; margin-left: 20px;"><span class="cspinner-icon small"></span></span>');
        $.ajax({
            type: "POST",
            url: $_____link_full + "/index.cgi/?xhr-get_size=1&xhr-get_size_path=" + c,
            data: false,
            dataType: "text",
            success: function(e) {
                var k = e.split("|"),
                    h = _f__table().DataTable();
                h.cell(d.find("td.column-filesize")).data(k[0]).draw();
                var f;
                if (isNaN(parseInt(k[1]))) {
                    f = 0
                } else {
                    f = parseInt(k[1])
                }
                $(".total_size_data").data("total", (parseInt($(".total_size_data").data("total")) + f));
                if (!b.find("td.column-filesize").find("label").find(".cspinner").length) {
                    $.ajax({
                        type: "POST",
                        url: $_____link_full + "/index.cgi/?xhr-get_nice_size=1&xhr-get_nice_size_sum=" + parseInt($(".total_size_data").data("total")),
                        data: false,
                        dataType: "text",
                        success: function(m) {
                            $(".total_size_data").text(m);
                            $(".total_size_data").parent("span").removeClass("hidden")
                        },
                        error: function(m) {}
                    });
                    setTimeout(function() {
                        __f_____hl()
                    }, 600)
                }
            },
            error: function(e) {}
        })
    })
}

function __f__c__m() {
    var a = $(".tab-pane.active form table");
    $(".tab-pane table").unbind("contextmenu");
    a.contextMenu({
        menuSelector: "#__f__c__m",
        menuSelectorTriggered: function(d, b) {
            if ($(".tab-pane.active table tbody tr input").length && d.parents("tr").find("input:checked").length === 0) {
                __f___ds_a();
                d.parents("tr").find("td:first-child input").trigger("click");
                var c = jQuery.Event("keydown");
                c.which = 40;
                $("body").trigger(c);
                d.parents("tr").find("td:first-child").trigger("contextmenu")
            }
            if (d.parents("tr").find("i.fa-folder-open-o").length) {
                $(".context-o__f_m-dependent-goto").removeClass("hidden")
            } else {
                $(".context-o__f_m-dependent-goto").addClass("hidden")
            }
            if (d.parents("tr").find('a[href*="index.cgi?path="]').length) {
                $(".context-o__f_m-dependent-open-new-tab").removeClass("hidden")
            } else {
                $(".context-o__f_m-dependent-open-new-tab").addClass("hidden")
            }
            if (!d.parents("tr").find("i.fa-pencil-square-o").length) {
                $(".context-o__f_m-dependent-edit").addClass("hidden")
            } else {
                $(".context-o__f_m-dependent-edit").removeClass("hidden")
            }
            if (!d.parents("tr").find('a[href*="download.cgi"]').length) {
                $(".context-o__f_m-dependent-download").addClass("hidden")
            } else {
                $(".context-o__f_m-dependent-download").removeClass("hidden")
            }
            if (!d.parents("tr").find("i.fa.fa-extract-archive").length) {
                $(".context-o__f_m-dependent-extract").addClass("hidden")
            } else {
                $(".context-o__f_m-dependent-extract").removeClass("hidden")
            }
            if ($(".o__f_m-button-compress").hasClass("disabled")) {
                $("a[data-context-newarchive]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-newarchive]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-copy").hasClass("disabled")) {
                $("a[data-context-copy], a[data-context-clipboard]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-copy], a[data-context-clipboard]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-cut").hasClass("disabled")) {
                $("a[data-context-cut]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-cut]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-paste").hasClass("disabled")) {
                $("a[data-context-paste]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-paste]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-delete").hasClass("disabled")) {
                $("a[data-context-delete]").addClass("disabled").parent("li").addClass("disabled");
                $("a[data-context-rename]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-delete]").removeClass("disabled").parent("li").removeClass("disabled");
                $("a[data-context-rename]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            f_m__bm__cm();
            if ($(".o__f_m-button-chmod").hasClass("disabled") && $(".o__f_m-button-chown").hasClass("disabled")) {
                $(".context-properties").addClass("disabled")
            } else {
                $(".context-properties").removeClass("disabled")
            }
            _f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            }).length ? $("a[data-context-calculate-selected-size]").parent("li").removeClass("hidden") : $("a[data-context-calculate-selected-size]").parent("li").addClass("hidden");
            if ($(".o__f_m-button-chmod").hasClass("disabled")) {
                $("a[data-context-chmod]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-chmod]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-chown").hasClass("disabled")) {
                $("a[data-context-chown]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-chown]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-chattr").hasClass("disabled")) {
                $("a[data-context-chattr]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-chattr]").removeClass("disabled").parent("li").removeClass("disabled")
            }
            if ($(".o__f_m-button-chcon").hasClass("disabled")) {
                $("a[data-context-chcon]").addClass("disabled").parent("li").addClass("disabled")
            } else {
                $("a[data-context-chcon]").removeClass("disabled").parent("li").removeClass("disabled")
            }
        },
        menuSelected: function(c, e) {
            if (e.data("context-goto") == "1") {
                c.parents("tr").find('a.o__f_m-follow-file[href^="index.cgi?"]').trigger("click")
            }
            if (e.data("context-open-new-tab") == "1") {
                __f___nt($.url(decodeURIComponent(c.parents("tr").find('a[href*="index.cgi?path="]').attr("href"))).param("path").replace("//", "/"), 1)
            }
            if (e.data("context-select-all") == "1") {
                $('button[onclick="selectAll()"]').trigger("click")
            }
            if (e.data("context-deselect-all") == "1") {
                __f___ds_a();
                __r____changed()
            }
            if (e.data("context-invert-selection") == "1") {
                $('button[onclick="invertSelection()"]').trigger("click")
            }
            if (e.data("context-refresh") == "1") {
                $("button > .fa-refresh").parent("button").trigger("click")
            }
            if (e.data("context-newfile") == "1") {
                $('a[onclick="createFileDialog()"]').trigger("click")
            }
            if (e.data("context-newfolder") == "1") {
                $('a[onclick="createFolderDialog()"]').trigger("click")
            }
            if (e.data("context-newarchive") == "1") {
                $('a[onclick="compressDialog()"]').trigger("click")
            }
            if (e.data("context-upload") == "1") {
                $('a[onclick="viewReadyForUpload()"]').trigger("click")
            }
            if (e.data("context-download") == "1") {
                $('a[onclick="downFromUrlDialog()"]').trigger("click")
            }
            if (e.data("context-clipboard") == "1") {
                var b = $.url(c.parents("tr").find("img").parent("a").attr("href")),
                    f = (b.param("file") ? ("/" + b.param("file")) : "");
                $("body").append('<button class="hidden tmp-clipboard-obj" data-clipboard-text="' + (b.param("path") + f) + '"></button>');
                var d = new Clipboard(".tmp-clipboard-obj");
                $(".tmp-clipboard-obj").trigger("click");
                $(".tmp-clipboard-obj").remove();
                d.destroy()
            }
            if (e.data("context-copy") == "1") {
                $(".o__f_m-button-copy a").trigger("click")
            }
            if (e.data("context-cut") == "1") {
                $(".o__f_m-button-cut a").trigger("click")
            }
            if (e.data("context-paste") == "1") {
                $(".o__f_m-button-paste a").trigger("click")
            }
            if (e.data("context-delete") == "1") {
                $(".o__f_m-button-delete").trigger("click")
            }
            if ($(e).is(".file-manager-remove-bookmark")) {
                $('.btn-group .at-o__f_m-favorites-dropdown a[href="' + $(e).parent("a").attr("href") + '"]').find(".file-manager-remove-bookmark").trigger("click");
                $(e).parent("a").remove();
                return
            }
            if (e.data("context-bookmarks") == "1") {
                $('a[href^="bookmark.cgi"]').trigger("click")
            }
            if (e.data("context-search") == "1") {
                $('a[onclick="searchDialog()"]').trigger("click")
            }
            if (e.data("context-edit") == "1") {
                c.parents("tr").addClass("m-active");
                c.parents("tr").find('a[href^="edit_file.cgi?"]').trigger("click")
            }
            if (e.data("context-rename") == "1") {
                c.parents("tr").find('a[onclick^="renameDialog("]').trigger("click")
            }
            if (e.data("context-download-file") == "1") {
                $(c.parents("tr").find('a[href^="download.cgi?"]'))[0].click()
            }
            if (e.data("context-extract") == "1") {
                c.parents("tr").find('a[href^="extract.cgi?"]').trigger("click")
            }
            if (e.data("context-calculate-selected-size") == "1") {
                __f__get_fs()
            }
            if (e.data("context-chmod") == "1") {
                $('a[onclick="chmodDialog()"]').trigger("click")
            }
            if (e.data("context-chown") == "1") {
                $('a[onclick="chownDialog()"]').trigger("click")
            }
            if (e.data("context-chattr") == "1") {
                $('a[onclick="chattrDialog()"]').trigger("click")
            }
            if (e.data("context-chcon") == "1") {
                $('a[onclick="chconDialog()"]').trigger("click")
            }
        }
    })
}

function __f___u(B, y, C, z, E, q) {
    if (typeof E == "object") {
        var n = E[1],
            r = E[2],
            v = E[3],
            t = E[4],
            E = E[0]
    } else {
        var n = true
    }
    if ($__source_file == "config.cgi") {
        return
    }
    var x = null,
        k = null,
        m = null,
        o = null,
        A = $("#path").val();
    typeof q == "undefined" ? q = false : false;
    ((typeof E == "undefined" || (typeof E != "undefined" && E === false)) ? (x = false) : (x = true));
    (!x ? (k = ".tab-pane.active form table") : (k = '.tab-pane[id="tab-' + E + '"] form table'));
    (!x ? (m = ".tab-pane.active") : (m = '.tab-pane[id="tab-' + E + '"]'));
    var o = $(m).attr("id").replace(/^\D+/g, ""),
        o = (o ? o : 1);
    var p = $("body").find(k).attr("id"),
        e = p ? parseInt(p.replace(/^\D+/g, "")) : "none";
    (!x && e !== "none") && $("#DataTables_Table_" + e).dataTable().fnDestroy();
    if (B === "upd") {
        var u = y.find(".fa-font").first().parents("td").index();
        $(k).addClass("___f_m__q__");
        $("body").find(k + " tbody").empty();
        $("body").find(k + " tbody").append(y);
        !n && $(m).data("totalValue", v).data("breadcrumb", $(".breadcrumb").clone());
        (q && !r) && __f__upd_____tl(q);
        __mcr();
        __f_____ul()
    } else {
        var u = $(k).find(".fa-font").first().parents("td").index()
    }
    if (typeof localStorage["DataTables_DataTables_Table_" + e + "_/" + __f___mn() + "/index.cgi"] != "undefined") {
        _filemanager_data = JSON.parse(localStorage["DataTables_DataTables_Table_" + e + "_/" + __f___mn() + "/index.cgi"])
    } else {
        _filemanager_data = false
    }
    var s = ($.inArray($("#headln2r > div.btn-group > a[data-config-pagination]").data("config-pagination"), [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]) > -1 ? $("#headln2r > div.btn-group > a[data-config-pagination]").data("config-pagination") : 25),
        D = (($.inArray(parseInt(localStorage.getItem($hostname + "-_________per_page")), [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]) > -1) ? parseInt(localStorage.getItem($hostname + "-_________per_page")) : false),
        w = ((_filemanager_data.length && !D) ? (D ? D : _filemanager_data.length) : s);
    localStorage.removeItem($hostname + "-_________per_page");
    if (u != 3 && u != 4) {
        u = false
    }
    __f__c__m(1);
    $(k).unbind("click");
    $(k).on("click", 'a .fa.fa-pencil-square-o, a[href^="edit_file.cgi"]', function(a) {
        a.preventDefault();
        a.stopPropagation();
        var a = jQuery.Event("keydown");
        a.which = 115;
        $("body").trigger(a)
    });
    window["_f__table" + o] = $(k).dataTable({
        order: [],
        aaSorting: [],
        bDestroy: true,
        pageLength: 25,
        preDrawCallback: function() {
            if (config_portable_module_filemanager_hide_actions == true) {
                var c = $(k),
                    a = $(".tab-pane.active form table"),
                    f = a.find(".fa-font"),
                    d = a.find(".fa-i-cursor"),
                    b = f.length ? f.parents("td").index() : d.parents("td").index();
                if (b > 1) {
                    $(k + " thead th").eq(b).addClass("hidden");
                    c.find(".fa-font").length ? c.find(".fa-font").parents("td").addClass("hidden") : c.find(".fa-i-cursor").parents("td").addClass("hidden")
                }
            }
        },
        fnDrawCallback: function(b) {
            $(".tab-pane .paginate_button.previous > a").html('<i class="fa fa-fw fa-angle-left"></i>').css("border-top-left-radius", "0").css("border-bottom-left-radius", "0");
            $(".tab-pane .paginate_button.next > a").html('<i class="fa fa-fw fa-angle-right"></i>').css("border-top-right-radius", "0").css("border-bottom-right-radius", "0");
            $(k).find(".fa-font").removeClass("fa-font").addClass("fa-i-cursor").css("margin-right", "5px").css("margin-left", "5px");
            $(k).find(".fa-external-link").removeClass("fa-external-link").addClass("fa-extract-archive").css("margin-right", "5px").css("margin-left", "5px");
            $(k).find(".fa-edit").addClass("fa-pencil-square-o").css("margin-right", "7px").css("margin-left", "7px");
            $(k).find(".fa-arrow-right").removeClass("fa-arrow-right").addClass("fa-folder-open-o").parent("a").addClass("o__f_m-follow-file");
            __list_table_total_rows = b.fnRecordsTotal();
            if (b.fnRecordsTotal() <= b._iDisplayLength) {
                $(m + " .dataTables_paginate").hide()
            } else {
                $(m + " .dataTables_paginate").show()
            }
            $.each($(k + " tbody tr:not('.row-filesize-done') td"), function() {
                if (/((\d+(\s+)|\d+\.\d+(\s+)))(TB|GB|MB|KB|Byte|Bytes|ТБ|ГБ|МБ|КБ|Байт)|(Unlimited|Ubegrenset|Nielimitowane|Ilimitado|无限制|Не ограничено|No Limit|Same as admin)/i.test($(this).text())) {
                    if ($(this).index() > 1) {
                        list_form_table_file_size = $(this).index()
                    }
                }
            }).promise().done(function() {
                if (typeof list_form_table_file_size != "undefined") {
                    $.each($(k + " tbody tr:not('.row-filesize-done') td"), function() {
                        if ($(this).parent("tr").find('img[src$=".png"]').length) {
                            $(this).parent("tr").find("td").eq(list_form_table_file_size).addClass("column-filesize")
                        }
                        if ($(this).parent("tr").find('img[src$="inode-directory.png"]').length || $(this).parent("tr").find('img[src$="inode-symlink.png"]').length || $(this).parent("tr").find('img[src$="inode-mount-point.png"]').length) {
                            $(this).parent("tr").find("td").eq(list_form_table_file_size).addClass("column-filesize").find("label").text("")
                        }
                    }).promise().done(function() {
                        $(k + " thead th").eq(list_form_table_file_size).css("min-width", "51px")
                    })
                }
            });
            var a = $(k + " tbody tr td:nth-child(2)");
            a.unbind("mouseover");
            a.on("mouseover", "img", function(F) {
                var G = $(this).parents("td"),
                    h = G.find('img[src*="inode-symlink"]'),
                    d = G.next("td").find("a"),
                    f = $(m + ' form > input[type="hidden"][name="path"]').val().replace(/\/$/g, "") + "/" + d.text();
                if (h.length) {
                    if (h.attr("symlink-title") != 1) {
                        !h.parent().find(".cspinner").length && h.before('<span class="cspinner" style="margin-top: 5px; margin-left: -20px;"><span class="cspinner-icon small"></span></span>');
                        $.ajax({
                            type: "POST",
                            url: $_____link_full + "/index.cgi/?xhr-get_symlink=1&xhr-get_symlink_path=" + f,
                            data: false,
                            dataType: "text",
                            success: function(H) {
                                h.attr("data-content", '<code class="text-nowrap">' + H + "</code>").attr("symlink-title", "1").data("trigger", "manual").data("html", true).data("placement", "auto right").data("container", "body").data("animation", false);
                                h.is(":hover") && h.popover("show");
                                h.on("mouseenter", function() {
                                    if (h.is(":hover")) {
                                        $(this).popover("show")
                                    }
                                }).on("mouseleave", function() {
                                    var I = this;
                                    setTimeout(function() {
                                        if (!$(".popover:hover").length && !h.is(":hover")) {
                                            $(I).popover("hide")
                                        }
                                    }, 200)
                                });
                                h.parent().find(".cspinner").remove()
                            },
                            error: function(H) {}
                        })
                    }
                }
            });
            $(k + " #select-unselect").parents("th").css("opacity", 0).addClass("pointer-events-none");
            __init__dt_ck__e();
            if (A) {
                !$(".active table tbody tr.directory_go_up").length && $(".active table tbody").prepend('<tr class="ui_checked_columns directory_go_up" style="height: 23px;"><td colspan="' + $(".active thead tr th:visible").length + '"><input class="hidden" type="hidden">&nbsp;<i class="fa fa-fw fa-folder-btl"></i>&nbsp;..</td></tr>')
            } else {
                if (r && r != "/") {
                    !$(k + " tbody tr.directory_go_up").length && $(k + " tbody").prepend('<tr class="ui_checked_columns directory_go_up" style="height: 23px;"><td colspan="' + $(".active thead tr th:visible").length + '"><input class="hidden" type="hidden">&nbsp;<i class="fa fa-fw fa-folder-btl"></i>&nbsp;..</td></tr>')
                }
            }
            var c = $(".active td.dataTables_empty");
            if (c.length) {
                $("tr.directory_go_up").addClass("hidden")
            } else {
                $("tr.directory_go_up").removeClass("hidden")
            }
            setTimeout(function() {
                __dpt()
            }, 0)
        },
        initComplete: function(b) {
            n && __f___up__d("index.cgi?path=" + encodeURIComponentSafe(r ? r : A), E, false);
            !n && __f___upd___tb(r, E);
            !n && __f___up__tb_store();
            if (x != false && n) {
                $('a[href="#tab-' + E + '"').attr("newly-created", "1").trigger("click")
            }
            if (t) {
                setTimeout(function() {
                    $('a[href="#tab-1"] i.fa-close-box').trigger("click")
                }, 100)
            }
            $(k + " tbody").on("mouseout", "tr", function(c) {
                __f___cs()
            }).on("mouseover", "tr", function(c) {
                $(this).addClass("m-active")
            });
            if (C === 0 || $(k + " tbody tr").length === 1 && $(k + " tbody tr td.dataTables_empty").length) {
                l__res_fi()
            }
            $(k + ' select[name^="DataTables_Table"][name$="_length"]').val(w).change();
            var a
        },
        bInfo: true,
        destroy: true,
        oLanguage: {
            sEmptyTable: lang("theme_xhred_datatable_semptydirectory"),
            sInfo: lang("theme_xhred_datatable_sinfo"),
            sInfoEmpty: lang("theme_xhred_datatable_sinfoempty"),
            sLengthMenu: lang("theme_xhred_datatable_slengthmenu"),
            sLoadingRecords: lang("theme_xhred_datatable_sloadingrecords"),
            sProcessing: lang("theme_xhred_datatable_sprocessing"),
            sSearch: " ",
            sZeroRecords: lang("theme_xhred_datatable_szerorecords")
        },
        conditionalPaging: true,
        columnDefs: [{
            orderable: false,
            targets: [0, 1, (u ? u : 0)]
        }],
        bStateSave: true,
        bPaginate: w,
        aLengthMenu: [
            [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000],
            [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]
        ]
    });
    $('div button[onclick="removeDialog()"]').addClass("disabled o__f_m-button-delete").removeAttr("onclick");
    $('a[onclick="chmodDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chmod");
    $('a[onclick="chownDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chown");
    $('a[onclick="chattrDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chattr");
    $('a[onclick="chconDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chcon");
    $('a[onclick="compressDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-compress");
    $('a[onclick="copySelected()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-copy");
    $("li.o__f_m-button-copy").addClass("disabled");
    $('a[onclick="cutSelected()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-cut");
    $("li.o__f_m-button-cut").addClass("disabled");
    if (!localStorage.getItem($hostname + "-copy") && !localStorage.getItem($hostname + "-cut")) {
        $('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-paste")
    } else {
        $('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("o__f_m-button-paste")
    }
    if (z === "extract") {
        messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_extraction"), 5, "info", z + "_info")
    }
    if (z === "chmod") {
        messenger('<i class="fa fa-lg fa-fw fa-cogs"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_permissions"), 5, "info", z + "_info")
    }
    if (z === "chown") {
        messenger('<i class="fa fa-lg fa-fw fa-users"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_ownership"), 5, "info", z + "_info")
    }
    if (z === "compress") {
        messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_compression"), 5, "info", z + "_info")
    }
    if (z === "rename") {
        messenger('<i class="fa fa-lg fa-fw fa-i-cursor"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_rename").replace("%from", $('#renameForm input[name="file"]').val()).replace("%to", $('#renameForm input[name="name"]').val()), 5, "info", z + "_info")
    }
    if (z === "create_folder") {
        messenger('<i class="fa fa-lg fa-fw fa-folder"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_directory_creation").replace("%value", $('#createFolderForm input[name="name"]').val()), 5, "info", z + "_info")
    }
    if (z === "create_file") {
        messenger('<i class="fa fa-lg fa-fw fa-file"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_successful_file_creation").replace("%value", $('#createFileForm input[name="name"]').val()), 5, "info", z + "_info")
    }
}

function f_m__bm__cm() {
    var b = decodeURIComponent($('#list_form > input[type="hidden"][name="path"]').val()),
        b = (typeof b != "undefined" ? (!b.length ? "/" : b) : false);
    var a = $(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path=/"]').filter(function() {
        return $.trim($(this).text()) === b
    });
    if (a.length) {
        $(".data-context-bookmarks a").text(lang("theme_xhred_filemanager_unbookmark"));
        $("#__f__c__m").find(".fa-star-o").addClass("fa-star").removeClass("fa-star-o")
    } else {
        $(".data-context-bookmarks a").text(lang("theme_xhred_filemanager_bookmark"));
        $("#__f__c__m").find(".fa-star").removeClass("fa-star").addClass("fa-star-o")
    }
    setTimeout(function() {
        if (!$(".file-manager-remove-bookmark").length) {
            $.each($('.dropdown-menu.at-o__f_m-favorites-dropdown > li:not(.data-context-bookmarks) > a:not([href^="bookmark.cgi"])'), function(e, f) {
                $(this).prepend('<i class="fa fa-fw fa-minus-circle pull-right file-manager-remove-bookmark"></i>')
            })
        }
        var c = $(".btn-group .dropdown-menu.at-o__f_m-favorites-dropdown > li"),
            d = c.find('a[href]:not([href^="bookmark.cgi"], [href="#"])');
        c.find(".no_effect").parent("li").remove();
        if (!d.length) {
            $(".bm_e__me").remove();
            c.parent("ul").append('<li class="bm_e__me"><span class="bm_e__me_l">' + lang("theme_xhred_filemanager__no_bookmarks") + "</span></li>")
        } else {
            $(".bm_e__me").remove()
        }
        $(".dropdown-menu.at-o__f_m-favorites-dropdown li.divider").nextAll("li").remove();
        $(".btn-group .at-o__f_m-favorites-dropdown li:not(:first-child):not(:empty)").clone().insertAfter("li.data-context-bookmarks + .divider")
    }, 0)
}

function f_m__bm__c() {
    var a = decodeURIComponent($('#list_form > input[type="hidden"][name="path"]').val()),
        a = (typeof a != "undefined" ? (!a.length ? "/" : a) : false);
    $.each($(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path=/"]'), function() {
        if ($(this).text() == a) {
            $(this).parents(".at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_unbookmark"));
            return false
        } else {
            $(this).parents(".at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star-o" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_bookmark"))
        }
    }).promise().done(function() {
        setTimeout(function() {
            f_m__bm__cm()
        }, 100)
    })
}

function f_m__bm__u() {
    var b = decodeURIComponent($('#list_form > input[type="hidden"][name="path"]').val()),
        b = (typeof b != "undefined" ? (!b.length ? "/" : b) : "");
    var a = $(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path=/"]').filter(function() {
        return $.trim($(this).text()) === b
    });
    if (a.length) {
        a.parents(".at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star-o" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_bookmark"));
        a.parent("li").remove()
    } else {
        $(".btn-group > .at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_unbookmark"));
        $("body").find("ul.dropdown-menu.at-o__f_m-favorites-dropdown").append('<li><a href="index.cgi?path=' + b + '" style="padding-left: 12px;"><i class="fa fa-fw fa-minus-circle pull-right file-manager-remove-bookmark"></i>' + b + "</a></li>")
    }
    f_m__bm__cm();
    return a
}

function __f___upd___cr(d, c) {
    var b = $("body"),
        a = "";
    b.find(".breadcrumb").empty();
    if (access_level() == 0) {
        b.find(".breadcrumb").append('<li class="fm___root__"><a href="index.cgi?path="><i class="fa fa-hdd-o"></i></a></li>')
    } else {
        b.find(".breadcrumb").append('<li class="fm___root__"><a href="index.cgi?path="><i class="fa fa-user text-light"></i></a></li>')
    }
    $.each($(d), function(e, f) {
        a = a + (f != "" ? "/" + f : "");
        if (f != "") {
            b.find(".breadcrumb").append('<li><a href="index.cgi?path=' + encodeURIComponentSafe(a) + '">' + f + ' <i data-path="' + encodeURIComponentSafe(a.replace(f, "")) + '" class="fa fa-fw fa-lg fa-caret-right"></i></a></li>')
        }
    }).promise().done(function() {
        if (!$.isEmptyObject(c)) {
            b.find(".breadcrumb li a").removeAttr("href").replaceTagName("span");
            b.find(".breadcrumb li:last-child span").after($(c[0]));
            b.find(".breadcrumb li:first-child").replaceWith('<li class="fm___root__ text-light"><span><i class="fa fa-search text-light"></i></span></li>');
            $("div.total").html(c[1])
        } else {
            if (!$(".breadcrumb li:first-child").find(".fa.fa-keyboard-o").length && !$("a.popover-path").length) {
                $(".breadcrumb li:first-child").prepend('<a class="fa fa-fw fa-keyboard-o popover-path" style="position: absolute; margin-left: -12px; margin-top: 4px; font-size: 80%;" data-container="body" data-toggle="popover-path" data-placement="' + (config_portable_module_filemanager_hide_toolbar != true ? "auto right" : "auto left") + '" data-html="true" data-trigger="click" data-content=\'<div class="form-horizontal"> <div class="input-group input-group-sm"> <span class="input-group-addon"><i class="fa fa-fw fa-folder-open-o"></i></span><input type="text" class="form-control popover-path-input" placeholder="' + lang("theme_xhred_filemanager_manual_path") + '"> <span class="input-group-btn" style="width:0;"> <button class="btn btn-sm btn-default popover-path-button" type="button"><i class="fa fa-fw fa-chevron-circle-right text-lighter"></i><span class="cspinner hidden" style="margin-top: 2px; margin-left: -17px;"><span class="cspinner-icon small"></span></span></button> </span> </div> </div>\'></a>');
                if (config_portable_module_filemanager_hide_toolbar != true) {
                    $(".fa.fa-keyboard-o.popover-path").detach().appendTo(".breadcrumb li:last-child");
                    $(".fa.fa-keyboard-o.popover-path").css("margin-left", "2px")
                }
                $('[data-toggle="popover-path"]').popover()
            }
        }
    })
}

function __f___upd___tb(c, a) {
    var b = c.replace(/\/$/, "").split("/").slice(-1)[0];
    b = b ? b : "/";
    if (a) {
        $('li a[href="#tab-' + a + '"] span[data-tab-path]').text(b).attr("data-original-title", (c ? c : "/"));
        $("#file-manager-new-instance").removeClass("disabled").find("span.cspinner").parent("span").replaceWith('<i class="fa fa-plus"></i>')
    } else {
        $("li.active a span[data-tab-path]").text(b).attr("data-original-title", (c ? c : "/"))
    }
}

function __f___up__tb_store() {
    var a = [];
    $(".nav.nav-tabs li a span[data-original-title]").each(function(c, b) {
        var d = $(b).attr("data-original-title").replace(/\/$/, "");
        a.push(d)
    }).promise().done(function() {
        var c = {};
        c[$g__user__] = a;
        var b = JSON.parse(localStorage.getItem($hostname + "-settings_thirdparty_filemanager_remembered_tabs"));
        if (!$.isEmptyObject(b)) {
            delete b[$g__user__]
        }
        var d = $.extend({}, c, b);
        localStorage.setItem($hostname + "-settings_thirdparty_filemanager_remembered_tabs", JSON.stringify(d))
    })
}

function __f___ld__tb_stored_chk() {
    var a = JSON.parse(localStorage.getItem($hostname + "-settings_thirdparty_filemanager_remembered_tabs"));
    return (!$.isEmptyObject(a) ? a[$g__user__] : false)
}

function __f___ld__tb_stored() {
    var a = __f___ld__tb_stored_chk();
    if ($.isArray(a)) {
        $.each($(a), function(c, b) {
            __f___nt(b, false, c)
        })
    }
}

function __f___up__tb_vis() {
    $(".nav.nav-tabs li").length === 1 ? $(".nav.nav-tabs li:first-child").addClass("hidden") : $(".nav.nav-tabs li:first-child").removeClass("hidden")
}

function __f___up__d(n, m, k) {
    var e = $.url(decodeURIComponent(n)).param("path").replace("//", "/"),
        b = e.split("/"),
        d = $("body");
    $('[data-toggle="popover-path"]').popover("hide");
    $(".popover-path-button").find("i").removeClass("invisible").parent().find(".cspinner").addClass("hidden");
    __f___upd___cr(b, k);
    __f___upd___tb(e, m);
    if (e) {
        $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').removeClass("hidden")
    } else {
        $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').addClass("hidden")
    }
    t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=" + encodeURIComponentSafe(e));
    $.each($('.modal .modal-body form input[name="path"]'), function() {
        $(this).val(e)
    });
    $('ul li a[href^="bookmark.cgi?path="]').attr("href", "bookmark.cgi?path=" + e);
    f_m__bm__c();
    f__dt();
    setTimeout(function() {
        __dpt();
        __r____changed(1);
        __f___up__tb_vis();
        __f___up__tb_store()
    }, 0)
}
tab___to______create = 1;

function __f___nt(d, e, b) {
    var a = d,
        b = ((typeof b != "undefined" && b === 0) ? true : false);
    $this = $("#file-manager-new-instance");
    $this.blur();
    $(".nav.nav-tabs li").addClass("disabled");
    tab___to______create = tab___to______create + 1;
    $(".tabs-top > .nav.nav-tabs").append('<li class="ui-sortable-handle"><a href="#tab-' + tab___to______create + '" data-toggle="tab"><i class="fa fa-fw fa-close-box pull-right invisible"></i><span data-tab-path data-toggle="tooltip" data-placement="auto top"><span style="margin-top: 2px; margin-left: -3px" class="cspinner"><span class="cspinner-icon smaller"></span></span>&nbsp;</span></a></li>');
    $(".tabs-top > .tab-content").append('<div class="tab-pane fade" id="tab-' + tab___to______create + '">	    		<form class="ui_form" role="form" action="" method="post" id="list_form_AuthenticThemeTmp' + tab___to______create + '" name="list_form_AuthenticThemeTmp' + tab___to______create + '">	    			<table class="table table-striped table-hover table-condensed"><tbody></tbody></table>	    			<input class="ui_hidden heighter-34" type="hidden" name="path_AuthenticThemeTmp' + tab___to______create + '" id="path_AuthenticThemeTmp' + tab___to______create + '" value="' + a + '">	    		</form>	        </div>');
    var c = $(".active table thead").clone();
    c.removeClass("hidden");
    c.prependTo("#list_form_AuthenticThemeTmp" + tab___to______create + " table");
    __f____r("get", "index.cgi?path=" + encodeURIComponentSafe(a), false, 0, [tab___to______create, e, b]);
    setTimeout(function() {}, 0);
    tab___is______new = true
}

function __f____r(h, o, k, e, n) {
    if (typeof n == "object") {
        var f = n[2],
            m = n[1],
            n = n[0]
    } else {
        var m = true
    }
    if (o && !$.isArray(o)) {
        o = encodeURIParam(o, "path")
    }
    var a = encodeURIComponentSafe($.url(o).param("path").replace("//", "/"));
    typeof n == "undefined" ? n = false : false;
    if (h === "get") {
        if ($("body").find("#list_form table tbody").hasClass("o__f_m-updating") && m) {
            return
        }
        __f_____lo(true, true);
        (!$("div.popover.popover-path-data.in:visible").length && !n) && $('.active a[href="' + o + '"] img').before('<span class="cspinner" style="margin-top: 4px; margin-left: -25px;"><span class="cspinner-icon small"></span></span>');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/list.cgi?path=" + a + "&module=" + $g__m__name,
            data: false,
            dataType: "html",
            success: function(b) {
                messenger_hide("refreshDir_info");
                j = $.parseHTML(b);
                if (!$(j[1]).find("table").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>&nbsp;&nbsp;&nbsp;' + b, 15, "error", "getPath_error");
                    __f_____ul();
                    $(".active table .cspinner").remove();
                    if (n) {
                        $('a[href="#tab-' + n + '"]').parent("li").remove();
                        $('.tab-content .tab-pane[id="tab-' + n + '"]').remove()
                    }
                    return
                } else {
                    $('[data-toggle="popover-path"]').popover("hide")
                }!n && $('#list_form > input[type="hidden"][name="path"]').val($.url(decodeURIComponent(o)).param("path").replace("//", "/"));
                m && $("div.total").append(__f___tl_v());
                var c = $(j[0]).append(__f___tl_v()).html();
                m && $(".total").html(c);
                if (n) {
                    $('.tab-pane[id="' + n + '"]').data("totalValue", c)
                } else {
                    $(".tab-pane.active form table").data("totalValue", c)
                }
                __f___u("upd", $(j[1]).find("table").find(".ui_checked_columns"), e, false, [n, m, decodeURIComponent(a), c, f], $(h[0]).text());
                $("#__f__c__m").css("display", "none")
            },
            error: function(b) {}
        })
    }
}

function __f___tl_v() {
    return '. <span class="total_selected">' + lang("theme_xhred_filemanager_selected_entries").replace("%value", "<span>0</span>") + '</span> <span class="label label-warning total_size hidden"><span class="total_size_data"></span></span>'
}

function ___f__tw() {
    if ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {
        if ($__source_file == "config.cgi") {
            $('input[name="per_page"], input[name="disable_pagination"], input[name="menu_style"], textarea[name="bookmarks"]').parents("td.col_value").parent("tr").addClass("hidden");
            $("#columns_size").parent(".awobject").remove();
            $('form[action="save_config.cgi"]').append('<input type="hidden" name="columns" value="size">');
            $(".table-subtable .sub_table_container.table-hardcoded").find("tbody").append('				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hide_toolbar") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hide_toolbar" id="config_portable_module_filemanager_hide_toolbar_1" value="true"' + (config_portable_module_filemanager_hide_toolbar ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_toolbar_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hide_toolbar" id="config_portable_module_filemanager_hide_toolbar_0" value="false"' + (config_portable_module_filemanager_hide_toolbar ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_toolbar_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hovered_toolbar") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hovered_toolbar" id="config_portable_module_filemanager_hovered_toolbar_1" value="true"' + (config_portable_module_filemanager_hovered_toolbar ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hovered_toolbar_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hovered_toolbar" id="config_portable_module_filemanager_hovered_toolbar_0" value="false"' + (config_portable_module_filemanager_hovered_toolbar ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hovered_toolbar_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hide_actions") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hide_actions" id="config_portable_module_filemanager_hide_actions_1" value="true"' + (config_portable_module_filemanager_hide_actions ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_actions_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hide_actions" id="config_portable_module_filemanager_hide_actions_0" value="false"' + (config_portable_module_filemanager_hide_actions ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_actions_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_settings_tabs_remember_state") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_remember_tabs" id="config_portable_module_filemanager_remember_tabs_1" value="true"' + (config_portable_module_filemanager_remember_tabs ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_remember_tabs_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_remember_tabs" id="config_portable_module_filemanager_remember_tabs_0" value="false"' + (config_portable_module_filemanager_remember_tabs ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_remember_tabs_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_context_calculate_size") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_calculate_size" id="config_portable_module_filemanager_calculate_size_1" value="true"' + (config_portable_module_filemanager_calculate_size ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_calculate_size_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_calculate_size" id="config_portable_module_filemanager_calculate_size_0" value="false"' + (config_portable_module_filemanager_calculate_size ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_calculate_size_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_settings_notification_type") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_1" value="1"' + (config_portable_module_filemanager_notification_type == "1" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_1">' + lang("theme_xhred_global_all") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_4" value="4"' + (config_portable_module_filemanager_notification_type == "4" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_4">' + lang("theme_xhred_filemanager_settings_notification_type_inf_warn_err") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_2" value="2"' + (config_portable_module_filemanager_notification_type == "2" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_2">' + lang("theme_xhred_filemanager_settings_notification_type_warn_err") + "</label>					</span>				</span></td>				</tr>			");

            function c(d) {
                typeof d == "undefined" ? d = $('input[name="config_portable_module_filemanager_hide_toolbar"]:checked') : false;
                var e = ["config_portable_module_filemanager_hovered_toolbar"];
                if (d.val() == "true") {
                    $.each(e, function(f, h) {
                        $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", true);
                        $('input[name="' + h + '"], select[name="' + h + '"]').parent(".aradio").addClass("disabled")
                    })
                } else {
                    $.each(e, function(f, h) {
                        $('input[name="' + h + '"], select[name="' + h + '"]').prop("disabled", false);
                        $('input[name="' + h + '"], select[name="' + h + '"]').parent(".aradio").removeClass("disabled")
                    })
                }
            }
            c();
            $('input[name="config_portable_module_filemanager_hide_toolbar"]').on("change", function() {
                c($(this))
            });
            $('input[name="config_portable_module_filemanager_hide_toolbar"], input[name="config_portable_module_filemanager_hovered_toolbar"], input[name="config_portable_module_filemanager_hide_actions"], input[name="config_portable_module_filemanager_notification_type"], input[name="config_portable_module_filemanager_remember_tabs"], input[name="config_portable_module_filemanager_calculate_size"]').on("change", function() {
                var e = $(this).attr("name"),
                    d = $(this).val();
                localStorage.setItem($hostname + "-" + e, d);
                window[e] = d;
                t__wi_p.manageConfig("save")
            })
        } else {
            $(".panel-body").append('			<div>                <div class="tabs-top">                    <ul class="nav nav-tabs">                        <li class="active ui-sortable-handle"><a href="#tab-1" data-toggle="tab"><i class="fa fa-fw fa-close-box pull-right invisible"></i><span data-tab-path data-toggle="tooltip" data-placement="auto top" data-title="/">/</span></a></li>                    </ul>                    <div class="tab-content">                        <div class="tab-pane fade in active" id="tab-1">                        </div>                    </div>                </div>            </div>        ');
            $("#list_form").detach().appendTo("#tab-1");
            if (typeof jQuery.ui == "object") {
                $(".tabs-top > ul.nav").sortable({
                    revert: true,
                    delay: 100,
                    update: function() {}
                })
            }
            if (config_portable_module_filemanager_remember_tabs && __f___ld__tb_stored_chk()) {
                __f___ld__tb_stored()
            }
            $("#headln2r .btn-group").prepend('<a href="#" id="file-manager-new-instance" data-toggle="tooltip" data-title="' + lang("theme_xhred_filemanager_new_tab") + '" class="btn btn-link text-lighter pull-left"><i class="fa fa-plus"></i></a>')
        }
        $("body").on("mouseleave", ".popover:not(.file-manager-help)", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $(this).popover("hide")
        });
        $("div.total").append(__f___tl_v());
        $(".tab-pane.active").data("totalValue", $("div.total").html());
        $("body").append('<ul id="__f__c__m" class="dropdown-menu" role="menu" style="display:none">		            <li class="context-o__f_m-dependent-goto hidden"><a tabindex="-1" href="#" data-context-goto="1"><i class="fa fa-fw fa-folder-open-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_goto") + '</a></li>		            <li class="divider context-o__f_m-dependent-goto"></li>		            <li class="context-o__f_m-dependent-open-new-tab hidden"><a tabindex="-1" href="#" data-context-open-new-tab="1"><i class="fa fa-fw fa-tab"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_open_new_tab") + '</a></li>		            <li class="divider context-o__f_m-dependent-open-new-tab hidden"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#" data-context-select-all="1"><i class="fa fa-fw fa-check-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_select_all") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-deselect-all="1"><i class="fa fa-fw fa-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_deselect_all") + '</a></li>		            	</ul>		            </li>		            <li><a tabindex="-1" href="#" data-context-invert-selection="1"><i class="fa fa-fw fa-share-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_select_invert") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-refresh="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_refresh") + '</a></li>		            <li class="divider"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_new") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-newfile="1"><i class="fa fa-fw fa-file-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfile") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-newfolder="1"><i class="fa fa-fw fa-folder-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfoder") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-newarchive="1"><i class="fa fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newarchive") + '</a></li>		            		<li class="dropdown-submenu" role="menu">				            	<a tabindex="-1" href="#"><i class="fa fa-fw fa-exchange"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_transfer") + '</a>				            	<ul class="dropdown-menu" role="menu">				            		<li><a tabindex="-1" href="#" data-context-upload="1"><i class="fa fa-fw fa-upload"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_upload") + '</a></li>				            		<li><a tabindex="-1" href="#" data-context-download="1"><i class="fa fa-fw fa-download"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download") + '</a></li>				            	</ul>				            </li>		            	</ul>		            </li>		            <li class="divider"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#" data-context-copy="1"><i class="fa fa-fw fa-files-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_copy") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-clipboard="1"><i class="fa fa-fw fa-clone"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_clipboard") + '</a></li>		            	</ul>		            </li>		            <li><a tabindex="-1" href="#" data-context-cut="1"><i class="fa fa-fw fa-scissors"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_cut") + '</a></li>		            <li><a tabindex="-1" href="#" data-context-paste="1"><i class="fa fa-fw fa-clipboard"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_paste") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-delete="1"><i class="fa fa-fw fa-trash"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_delete") + '</a></li>		            <li class="divider"></li>		            <li class="context-o__f_m-dependent-edit"><a tabindex="-1" href="#" data-context-edit="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_edit") + '</a></li>		            <li><a tabindex="-1" href="#" data-context-rename="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_rename") + '</a></li>		            <li class="context-o__f_m-dependent-download"><a tabindex="-1" href="#" data-context-download-file="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download_file") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-search="1"><i class="fa fa-fw fa-search"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_search") + '</a></li>		            <li class="divider"></li>		            		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#"><i class="fa fa-fw fa-star-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_bookmarks") + '</a>		            	<ul class="dropdown-menu at-o__f_m-favorites-dropdown dropdown-submenu-bookmarks" role="menu">		            		<li class="data-context-bookmarks"><a tabindex="-1" href="#" data-context-bookmarks="1">' + lang("theme_xhred_filemanager_bookmark") + '</a></li>		            		<li class="divider"></li>		            	</ul>		            </li>		            		            <li class="divider context-o__f_m-dependent-extract"></li>		            <li class="context-o__f_m-dependent-extract"><a tabindex="-1" href="#" data-context-extract="1"><i class="fa fa-fw fa-extract-archive"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_extract") + '</a></li>		            <li class="divider"></li>		            <li class="dropdown-submenu context-properties" role="menu">		            	<a tabindex="-1" href="#">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_properties") + '</a>		            	<ul class="dropdown-menu dropdown-submenu-properties" role="menu">		            		<li><a tabindex="-1" href="#" data-context-calculate-selected-size="1"><i class="fa fa-fw fa-calculator"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_calculate_selected_size") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chmod="1"><i class="fa fa-fw fa-cogs"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chmod") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chown="1"><i class="fa fa-fw fa-users"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chown") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chattr="1"><i class="fa fa-fw fa-tags"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chattr") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chcon="1"><i class="fa fa-fw fa-shield"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chcon") + "</a></li>		            	</ul>		            </li>		        </ul>");
        $("body").on("click", "#__f__c__m li i.fa", function(d) {
            $(this).parents("a").trigger("click")
        });
        $("body").on("hidden.bs.modal", function() {
            $(".modal-backdrop").remove()
        });
        $("body").on("submit", 'form[action="save_config.cgi"]', function() {
            localStorage.setItem($hostname + "-_________per_page", parseInt($('input[name="per_page"]').val()))
        });
        $("body").on("click", function(d) {
            $(".tooltip").each(function() {
                if (!$(this).is(d.target) && $(this).has(d.target).length === 0 && $(".tooltip").has(d.target).length === 0) {
                    $(this).tooltip("hide")
                }
            })
        });
        $("body").on("click", ".breadcrumb .fa-caret-right", function(f) {
            f.preventDefault();
            f.stopPropagation();
            var d = $(".breadcrumb span[data-tree]"),
                m = $(".breadcrumb .fa-caret-down"),
                k = $(this),
                e = k.attr("data-path"),
                h = (e ? e : "/"),
                n = k.parent("a").attr("href");
            $dirCurrent = $.trim(k.parent("a").text());
            d.remove();
            m.addClass("fa-caret-right").removeClass("fa-caret-down");
            if (k.parent("a").next("span[data-tree]").length) {
                return
            }
            k.addClass("invisible").after('<span class="cspinner"><span class="cspinner-icon smallest"></span></span>');
            $(this).removeClass("fa-caret-right").addClass("fa-caret-down");
            k.parent("a").after('<span class="hidden" data-tree=""></div>');
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi/?xhr-get_list=1&xhr-get_list_path=" + h,
                data: false,
                dataType: "JSON",
                success: function(o) {
                    $.each($(o), function(q, p) {
                        k.parent("a").next("span[data-tree]").append('<a href="index.cgi?path=' + (encodeURIComponentSafe(h + "/" + p)) + '"><i class="fa fa-fw ' + ($dirCurrent == p ? "fa-folder-open-o" : "fa-folder-o") + '">&nbsp;&nbsp;</i>' + ($dirCurrent == p ? " <strong>" + p + "</strong>" : " " + p) + "</a>")
                    }).promise().done(function() {
                        k.removeClass("invisible").next(".cspinner").remove();
                        k.parent("a").removeClass("text-black");
                        k.parent("a").next("span[data-tree]").removeClass("hidden");
                        var q = k.parent("a").next("span[data-tree]"),
                            p = $("span[data-tree] i.fa-folder-open-o").parent("a");
                        q.animate({
                            scrollTop: p.offset().top - q.offset().top + q.scrollTop()
                        }, 0)
                    })
                },
                error: function(o) {}
            })
        }).on("mouseenter", ".breadcrumb .fa-caret-right", function(d) {
            $(this).parent("a").addClass("text-black")
        }).on("mouseleave", ".breadcrumb .fa-caret-right", function(d) {
            $(this).parent("a").removeClass("text-black")
        });
        $("body").on("click", function(e) {
            var d = $(".breadcrumb a + span[data-tree]"),
                f = $(".breadcrumb .fa-caret-down");
            if (d.length) {
                d.remove();
                f.addClass("fa-caret-right").removeClass("fa-caret-down")
            }
        });
        $.each($(".modal .modal-content .modal-footer"), function(e, d) {
            $(this).wrapInner('<div class="btn-group"></div>')
        });
        $(".btn-group.pull-right").find(".fa-check-square").removeClass("fa-check-square").addClass("fa-share-square-o");
        if ($___relative_url.indexOf("index.cgi") === -1) {
            t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=");
            $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').addClass("hidden");
            f__dt()
        }
        $("#headln2l .help_popup").css("padding", "6px 12px");
        $('ul > li > a[href^="bookmark.cgi?path="]').parents("ul").addClass("at-o__f_m-favorites-dropdown").find(".fa-bookmark-o").removeClass("fa-bookmark-o").addClass("fa-fw fa-star-o");
        $('div button[onclick="removeDialog()"]').addClass("disabled o__f_m-button-delete").removeAttr("onclick");
        $('a[onclick="chmodDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chmod");
        $('a[onclick="chownDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chown");
        $('a[onclick="chattrDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chattr");
        $('a[onclick="chconDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-chcon");
        $('a[onclick="compressDialog()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-compress");
        $('a[onclick="copySelected()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-copy");
        $('a[onclick="cutSelected()"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-cut");
        if (!localStorage.getItem($hostname + "-copy") && !localStorage.getItem($hostname + "-cut")) {
            $('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("disabled o__f_m-button-paste")
        } else {
            $('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("o__f_m-button-paste")
        }
        if (!$t_av_sestatus) {
            $("li.o__f_m-button-chcon").addClass("hidden");
            $("#__f__c__m a[data-context-chcon]").parent("li").addClass("hidden");
            $("#__f__c__m .dropdown-submenu-properties").css("top", "-74px")
        }
        $("body").on("click", 'button + .dropdown-menu.at-o__f_m-favorites-dropdown > li > a:not([href^="bookmark.cgi"])', function() {
            $(this).parents("ul").trigger("mouseleave")
        });
        $.each($(".btn-group.pull-right .btn-group"), function() {
            $(this).find("button > .caret").css("margin-left", "3px");
            $(this).find("button + ul.dropdown-menu > li > a").css("padding-left", "12px");
            $(this).find("button + ul.dropdown-menu > li > a > i").append("&nbsp;&nbsp;");
            $(this).find("ul").addClass("pull-right").find(".fa-paste").removeClass("fa-paste").addClass("fa-fw fa-clipboard").text("").after("&nbsp;&nbsp;");
            $(this).find("ul").addClass("pull-right").find(".fa-search").addClass("fa-fw").text("").after("&nbsp;")
        }).promise().done(function() {
            f_m__bm__c()
        });
        $("body").on("click", ".file-manager-remove-bookmark", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var d = $.url($(this).parent("a").attr("href")).param()["path"];
            $(this).parent("a").parent("li").remove();
            $.ajax({
                type: "POST",
                url: $g__e__path + "/file-manager/bookmark.cgi?path=" + encodeURIComponentSafe(d) + "&module=" + $g__m__name,
                data: false,
                dataType: "text",
                success: function(f) {
                    f_m__bm__c();
                    messenger('<i class="fa fa-lg fa-fw fa-star-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_unbookmark_success").replace("%value", (d ? d : "/")), 5, "warning", "bookmarkAddRemove")
                },
                error: function(f) {}
            })
        });
        if (access_level() !== 0) {
            $("body").find(".breadcrumb li:first-child a").html('<i class="fa fa-fw fa-user text-light">&nbsp;</i>')
        }
        $("body").find(".breadcrumb li:first-child").addClass("fm___root__");
        __f___u(false, false, 0, 0);
        $('button[onclick="selectAll()"], button[onclick="invertSelection()"]').click(function() {
            setTimeout(function() {
                __r____changed()
            }, 0)
        });
        $("body").on("click", '#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]', function(d) {
            d.preventDefault();
            d.stopPropagation();
            var e = "";
            if ($(".breadcrumb li:first-child a i").hasClass("fa-search")) {
                e = "index.cgi?path=" + encodeURIComponentSafe($('#list_form > input[type="hidden"][name="path"]').val())
            } else {
                e = $(".breadcrumb > li:eq(-2) > a").attr("href")
            }
            if (!e) {
                e = "index.cgi?path="
            }
            __f____r("get", e, false, 0);
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>')
        });
        $("body").on("click", ".breadcrumb li > a:not(.fa-keyboard-o), .breadcrumb li > a + span[data-tree] > a, .dropdown-menu.at-o__f_m-favorites-dropdown > li:not(.data-context-bookmarks) > a:not(.no_effect), .active table label > a.o__f_m-follow-file", function(d) {
            d.preventDefault();
            d.stopPropagation();
            var f = "index.cgi?path=",
                e = 0;
            if ($(this).attr("href") && $(this).attr("href").indexOf(("/" + $g__o__f_m)) === -1) {
                f = $(this).attr("href")
            }
            if (f === "index.cgi?path=/") {
                f = "index.cgi?path="
            }
            if (f && f.indexOf("bookmark.cgi?") > -1) {
                e = 1;
                return
            }
            __f____r("get", f, false, e);
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>')
        });
        $("body").on("click", 'li.o__f_m-button-copy:not(".disabled") a', function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-clone"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_copying_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "info", "copy_info");
            __f____a("copy", false)
        });
        $("body").on("click", 'li.o__f_m-button-cut:not(".disabled") a', function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-scissors"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_cutting_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "warning", "cut_warning");
            __f____a("cut", false)
        });
        $("body").on("click", 'li.o__f_m-button-paste:not(".disabled") a', function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_pasting_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "paste_info");
            __f____a("paste", false)
        });
        $("body").on("click", 'a[href^="extract.cgi"]', function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_unpacking_archive") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "extract_info");
            __f____a("extract", $(this).attr("href"))
        });
        $("body").find('#removeDialog button[type="button"][onclick="removeSelected()"]').removeAttr("onclick").addClass("_at_filemanager_delete_submit");
        $("body").on("click", "#removeDialog button._at_filemanager_delete_submit", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-trash-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_deleting_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "delete_info");
            __f____a("delete", false);
            modal_dismiss()
        });
        $("#removeDialog").on("show.bs.modal", function() {
            var d = $(this).find("#items-to-remove");
            d.empty();
            $.each(_f__gr("checked"), function() {
                d.append($(this).val() + "<br>")
            })
        });
        $("body").find('#renameDialog button[type="button"][onclick="renameSelected()"]').removeAttr("onclick").addClass("_at_filemanager_rename_submit");
        $("body").on("click", "#renameDialog button._at_filemanager_rename_submit", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-i-cursor"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_renaming_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "info", "rename_info");
            __f____a("rename", false)
        });
        $("body").on("submit", "#renameDialog", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#renameDialog button._at_filemanager_rename_submit").trigger("click")
        });
        $("#renameDialog").on("shown.bs.modal", function() {
            var d = $(this).find('input[type="text"]');
            d.focus();
            d.select()
        });
        $("#renameDialog").on("show.bs.modal", function() {
            var d = $(this).find('input[type="text"]'),
                e = $(this).find("button._at_filemanager_rename_submit")
        });
        $('#renameDialog input[type="text"]').on("keyup change click input", function(e) {
            var d = $("#renameDialog").find("button._at_filemanager_rename_submit");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("body").find('#createFolderDialog button[type="button"][onclick="createFolder()"]').removeAttr("onclick").addClass("_at_filemanager_create_folder_submit");
        $("body").on("click", "#createFolderDialog button._at_filemanager_create_folder_submit", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-folder"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_creating_directory") + " `<samp>" + $('#createFolderForm input[name="name"]').val() + "</samp>`. " + lang("theme_xhred_global_please_wait") + "", 10, "info", "create_folder_info");
            __f____a("create_folder", false)
        });
        $("body").on("submit", "#createFolderForm", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#createFolderDialog button._at_filemanager_create_folder_submit").trigger("click")
        });
        $("#createFolderDialog").on("shown.bs.modal", function() {
            var d = $(this).find('input[type="text"]');
            d.focus()
        });
        $("#createFolderDialog").on("show.bs.modal", function() {
            var d = $(this).find('input[type="text"]'),
                e = $(this).find("button._at_filemanager_create_folder_submit");
            d.val("");
            !d.val() && e.prop("disabled", true)
        });
        $('#createFolderDialog input[type="text"]').on("keyup change click input", function(e) {
            var d = $("#createFolderDialog").find("button._at_filemanager_create_folder_submit");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("body").find('#createFileDialog button[type="button"][onclick="createFile()"]').removeAttr("onclick").addClass("_at_filemanager_create_file_submit");
        $("body").on("click", "#createFileDialog button._at_filemanager_create_file_submit", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_creating_file") + " `<samp>" + $('#createFileForm input[name="name"]').val() + "</samp>`. " + lang("theme_xhred_global_please_wait"), 10, "info", "create_file_info");
            __f____a("create_file", false)
        });
        $("body").on("submit", "#createFileForm", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#createFileDialog button._at_filemanager_create_file_submit").trigger("click")
        });
        $("#createFileDialog").on("shown.bs.modal", function() {
            var d = $(this).find('input[type="text"]');
            d.focus()
        });
        $("#createFileDialog").on("show.bs.modal", function() {
            var d = $(this).find('input[type="text"]'),
                e = $(this).find("button._at_filemanager_create_file_submit");
            d.val("");
            !d.val() && e.prop("disabled", true)
        });
        $('#createFileDialog input[type="text"]').on("keyup change click input", function(e) {
            var d = $("#createFileDialog").find("button._at_filemanager_create_file_submit");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("body").find('#downFromUrlDialog button[type="button"][onclick="downFromUrl()"]').removeAttr("onclick").addClass("o__f_m-submitter-url_download");
        $("body").on("click", "#downFromUrlDialog button.o__f_m-submitter-url_download", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-download"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_downloading_from") + " <samp>" + $.url($('#downFromUrlForm input[name="link"]').val()).attr("host") + "</samp>. " + lang("theme_xhred_global_please_wait"), 1000000, "info", "url_download_info");
            __f____a("url_download", false)
        });
        $("body").on("submit", "#downFromUrlForm", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#downFromUrlDialog button.o__f_m-submitter-url_download").trigger("click")
        });
        $("#downFromUrlDialog").on("shown.bs.modal", function() {
            var d = $(this).find('input[name="link"]');
            d.focus()
        });
        $("#downFromUrlDialog").on("show.bs.modal", function() {
            var d = $(this).find('input[name="link"]'),
                e = $(this).find("button.o__f_m-submitter-url_download");
            !d.val() && e.prop("disabled", true)
        });
        $('#downFromUrlDialog input[name="link"]').on("keyup change click input", function(e) {
            var d = $("#downFromUrlDialog").find("button.o__f_m-submitter-url_download");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("#readyForUploadDialog").on("show.bs.modal", function() {
            var d = $.url($("#upload-form").attr("action")).param()["id"];
            $("#upload-form").attr("action", "upload.cgi?path=" + encodeURIComponentSafe($("#upload-form").find('input[name="path"]').val()) + "&id=" + d + "")
        });
        $("body").find('#searchDialog button[type="button"][onclick="search()"]').removeAttr("onclick").addClass("_at_filemanager_search_submit");
        $("body").on("click", "#searchDialog button._at_filemanager_search_submit", function(d) {
            d.preventDefault();
            d.stopPropagation();
            __f____a("search", false)
        });
        $("body").on("submit", "#searchForm", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#searchDialog button._at_filemanager_search_submit").trigger("click")
        });
        $("#searchDialog").on("shown.bs.modal", function() {
            var d = $(this).find('input[name="query"]');
            d.focus()
        }).on("show.bs.modal", function() {
            $('#searchDialog input[name="query"]').trigger("keyup");
            $('input[name="grepreplace"]').prop("disabled", true).val("");
            $("._at_filemanager_search_submit").text(lang("theme_xhred_global_find")).removeClass("btn-warning").addClass("btn-primary")
        }).on("keyup", 'input[name="query"]', function() {
            if ($(this).val().length) {
                $('input[name="grepstring"], input[name="grepreplace"]').removeAttr("disabled")
            } else {
                $('input[name="grepstring"], input[name="grepreplace"]').prop("disabled", true)
            }
            $('#searchDialog input[name="grepstring"]').trigger("keyup")
        }).on("keyup", 'input[name="grepstring"]', function() {
            if ($(this).val().length) {
                $('input[name="grepreplace"]').removeAttr("disabled")
            } else {
                $('input[name="grepreplace"]').prop("disabled", true)
            }
        }).on("keyup", 'input[name="grepreplace"]', function() {
            if ($.trim($(this).val()).length) {
                $("._at_filemanager_search_submit").text(lang("theme_xhred_global_replace")).removeClass("btn-primary").addClass("btn-warning")
            } else {
                $("._at_filemanager_search_submit").text(lang("theme_xhred_global_find")).removeClass("btn-warning").addClass("btn-primary")
            }
        });
        $("#searchDialog").on("show.bs.modal", function() {
            var d = $(this).find('input[type="text"]'),
                e = $(this).find("button._at_filemanager_search_submit");
            !d.val() && e.prop("disabled", true)
        });
        $("body").on("click", ".__o__f_m-search-results-data", function(d) {
            var d = $("#path").val();
            __f____r("get", "index.cgi?path=" + (d ? encodeURIComponentSafe(d) : ""), false, 0)
        });
        $('#searchDialog input[type="text"]').on("keyup change click input", function(e) {
            var d = $("#searchDialog").find("button._at_filemanager_search_submit");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("body").on("click", 'a[href^="bookmark.cgi"]', function(d) {
            d.preventDefault();
            d.stopPropagation();
            var e = $(this).attr("href");
            if (e === "bookmark.cgi?path=") {
                e = e + "/"
            }
            __f____a("bookmark", e)
        });
        $('body #chmodDialog button[onclick="chmodSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chmod");
        $("body").on("click", "#chmodDialog button.o__f_m-submitter-chmod", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-user"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_setting_permissions").replace("%value", $("#perms").val()) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chmod_info");
            __f____a("chmod", [$("#perms").val(), $('#chmodForm select[name="applyto"] option:selected').val()])
        });
        $("#chmodDialog").on("shown.bs.modal", function() {
            $('#chmodDialog input[id="perms"]').focus().select()
        });
        $('body #chownDialog button[onclick="chownSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chown");
        $("body").on("click", "#chownDialog button.o__f_m-submitter-chown", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-users"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_changing_ownership").replace("%value", $('#chownForm input[name="owner"]').val() + ":" + $('#chownForm input[name="group"]').val()) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chown_info");
            __f____a("chown", [$('#chownForm input[name="owner"]').val(), $('#chownForm input[name="group"]').val(), $('#chownForm input[name="recursive"]').prop("checked")])
        });
        $("#chownDialog").on("shown.bs.modal", function() {
            $('#chownDialog input[name="owner"]').focus()
        });
        $("#chownDialog").on("show.bs.modal", function() {
            var d = $(this).find("button.o__f_m-submitter-chown");
            d.prop("disabled", true)
        });
        $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup change click input", function(e) {
            var d = $("#chownDialog").find("button.o__f_m-submitter-chown");
            if ($('#chownDialog input[name="owner"]').val() && $('#chownDialog input[name="group"]').val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup", function(d) {
            d.preventDefault();
            var e = d.which;
            if (e == 13) {
                $("#chownDialog button.o__f_m-submitter-chown").trigger("click")
            }
        });
        $("#chownDialog").on("show.bs.modal", function() {
            $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').val("");
            $('#chownDialog input[name="recursive"]').removeAttr("checked")
        });
        $('body #chattrDialog button[onclick="chattrSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chattr");
        $("body").on("click", "#chattrDialog button.o__f_m-submitter-chattr", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-tags"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_changing_attributes").replace("%value", $('#chattrForm input[name="label"]').val()) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chattr_info");
            __f____a("chattr", [$('#chattrForm input[name="label"]').val(), $('#chattrForm input[name="recursive"]').prop("checked")])
        });
        $("#chattrDialog").on("shown.bs.modal", function() {
            $('#chattrDialog input[name="label"]').focus()
        });
        $("#chattrDialog").on("show.bs.modal", function() {
            var d = $(this).find("button.o__f_m-submitter-chattr");
            d.prop("disabled", true)
        });
        $('#chattrDialog input[name="label"]').on("keyup change click input", function(e) {
            var d = $("#chattrDialog").find("button.o__f_m-submitter-chattr");
            if ($('#chattrDialog input[name="label"]').val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $('#chattrDialog input[name="label"]').on("keyup", function(d) {
            d.preventDefault();
            var e = d.which;
            if (e == 13) {
                $("#chattrDialog button.o__f_m-submitter-chattr").trigger("click")
            }
        });
        $("#chattrDialog").on("show.bs.modal", function() {
            $('#chattrDialog input[name="label"]').val("");
            $('#chattrForm input[name="recursive"]').removeAttr("checked")
        });
        $('body #chconDialog button[onclick="chconSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chcon");
        $("body").on("click", "#chconDialog button.o__f_m-submitter-chcon", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-tags"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_changing_secontext").replace("%value", $('#chconForm input[name="label"]').val()) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chcon_info");
            __f____a("chcon", [$('#chconForm input[name="label"]').val(), $('#chconForm input[name="recursive"]').prop("checked")])
        });
        $("#chconDialog").on("shown.bs.modal", function() {
            $('#chconDialog input[name="label"]').focus()
        });
        $("#chconDialog").on("show.bs.modal", function() {
            var d = $(this).find("button.o__f_m-submitter-chcon");
            d.prop("disabled", true);
            var k = {};
            $.unique($("tr td span[data-secontext]").map(function() {
                k[$(this).text()] = $(this).text()
            }).get());
            var f = $.map(k, function(p, o) {
                if (o != "undefined") {
                    return {
                        value: p,
                        url: o,
                        data: {
                            category: 0
                        }
                    }
                }
            });

            function e(m) {
                $('#chconDialog input[name="label"]').autocomplete({
                    lookup: f,
                    onSelect: function(n) {},
                    showNoSuggestionNotice: true,
                    noSuggestionNotice: lang("theme_xhred_global_no_results_found")
                })
            }
            if (typeof $().autocomplete === "function") {
                e()
            } else {
                var h = 0;
                if (t__wi_p.$load____ext === "src") {
                    h = $('html head link[href*="css/jquery.jspanel."]:first')
                } else {
                    h = $('html head link[href*="css/bundle."]:first')
                }
                if (!$('html head link[href*="css/autocomplete."]').length) {
                    h.before('<link href="' + $_____link_full + "/unauthenticated/css/jquery.autocomplete." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
                }
                $.getScript("" + $_____link_full + "/unauthenticated/js/jquery.autocomplete." + t__wi_p.$load____ext + ".js", function(m, o, n) {
                    e();
                    t__wi_p.$___ajax_requested_url = "_blank"
                })
            }
        });
        $('#chconDialog input[name="label"]').on("keyup change click input", function(e) {
            var d = $("#chconDialog").find("button.o__f_m-submitter-chcon");
            if ($('#chconDialog input[name="label"]').val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $('#chconDialog input[name="label"]').on("keydown", function(d) {
            var e = d.which;
            if (e == 13 && !$(".autocomplete-suggestions:visible").length) {
                $("#chconDialog button.o__f_m-submitter-chcon").trigger("click")
            }
        });
        $("#chconDialog").on("show.bs.modal", function() {
            $('#chconDialog input[name="label"]').val("");
            $('#chconForm input[name="recursive"]').removeAttr("checked")
        });

        function a() {
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi/?xhr-get_command_exists=1&xhr-get_command_exists_name=zip",
                data: false,
                dataType: "text",
                success: function(d) {
                    if (!d) {
                        $('select[name="method"]').val("tar");
                        $('select[name="method"] option[value="zip"]').prop("disabled", true);
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + (lang("theme_xhred_global_no_such_command").replace("%cmd", "zip")), 15, "error")
                    } else {
                        $('select[name="method"] option[value="zip"]').prop("disabled", false)
                    }
                },
                error: function(d) {}
            })
        }
        $('body #compressDialog button[onclick="compressSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-compress").prop("disabled", true);
        $("body").on("click", "#compressDialog button.o__f_m-submitter-compress", function(d) {
            d.preventDefault();
            d.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_compressing_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "compress_info", 0);
            __f____a("compress", [$('#compressSelectedForm input[name="filename"]').val(), $('#compressSelectedForm select[name="method"] option:selected').val()])
        });
        $('#compressDialog input[name="filename"]').on("keyup change click input", function(e) {
            var d = $("#compressDialog").find("button.o__f_m-submitter-compress");
            if ($(this).val()) {
                d.prop("disabled", false)
            } else {
                d.prop("disabled", true)
            }
        });
        $("body").on("submit", "#compressSelectedForm", function(d) {
            d.preventDefault();
            d.stopPropagation();
            $("#compressDialog button.o__f_m-submitter-compress").trigger("click")
        });
        $("#compressDialog").on("show.bs.modal", function() {
            $('#compressDialog input[name="filename"]').val("")
        }).on("shown.bs.modal", function() {
            $('#compressDialog input[name="filename"]').focus();
            $('select[name="method"] option[value="zip"]').prop("disabled", false);
            if ($('select[name="method"]').val() == "zip") {
                a()
            }
        });
        $('select[name="method"]').change(function(d) {
            if ($(this).val() == "zip") {
                a()
            }
        });
        $("body").on("click", ".dropdown-menu > li.disabled", function(d) {
            d.preventDefault();
            d.stopPropagation()
        });
        if ($__source_file === "index.cgi" && !$.url(t___wi.location).param("path")) {
            $("#headln2l").find('a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').addClass("hidden")
        }
        $(".btn-group.pull-right > button:eq(2)").removeAttr("onclick");
        $("body").on("click", ".btn-group.pull-right > button:eq(2)", function(d) {
            var e = $.url(t___wi.location).param("path");
            __f____r("get", "index.cgi?path=" + (e ? encodeURIComponentSafe(e) : ""), false, 0);
            messenger('<i class="fa fa-lg fa-fw fa-refresh"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_refreshing") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "refreshDir_info")
        });
        setTimeout(function() {
            if (config_portable_module_filemanager_hovered_toolbar != true) {
                $(".btn-group.pull-right > .btn-group > button").hover(function(d) {
                    d.preventDefault();
                    d.stopPropagation()
                })
            }
        }, 100);
        $("body").on("click", ".btn-group.pull-right > button:eq(0), .btn-group.pull-right > button:eq(1), input", function() {
            if ($(".active table tbody input:checked").length !== 0) {
                __f___ub()
            } else {
                __f___lb()
            }
        });
        $(".o__f_m-button-chmod a").html('<i class="fa fa-fw fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chmod"));
        $("#chmodDialog .modal-header h4").html('<i class="fa fa-fw fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chmod"));
        $(".o__f_m-button-chown a").html('<i class="fa fa-fw fa-users" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chown"));
        $("#chownDialog .modal-header h4").html('<i class="fa fa-fw fa-users" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chown"));
        $(".o__f_m-button-chattr a").html('<i class="fa fa-fw fa-tags" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chattr"));
        $("#chattrDialog .modal-header h4").html('<i class="fa fa-fw fa-tags" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chattr"));
        $(".o__f_m-button-chcon a").html('<i class="fa fa-fw fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chcon"));
        $("#chconDialog .modal-header h4").html('<i class="fa fa-fw fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chcon"));
        $(".o__f_m-button-compress a").html('<i class="fa fa-fw fa-file-archive-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newarchive"));
        $("#compressDialog .modal-header h4").html('<i class="fa fa-fw fa-file-archive-o" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newarchive"));
        $("#searchDialog .modal-header h4").html('<i class="fa fa-fw fa-search" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_search"));
        $(".o__f_m-button-copy a").html('<i class="fa fa-fw fa-files-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_copy"));
        $(".o__f_m-button-cut a").html('<i class="fa fa-fw fa-scissors" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_cut"));
        $('.btn-group .btn-group a[onclick="createFileDialog()"]').html('<i class="fa fa-fw fa-file-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfile"));
        $("#createFileDialog .modal-header h4").html('<i class="fa fa-fw fa-file-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfile"));
        $('.btn-group .btn-group a[onclick="createFolderDialog()"]').parent("li").addClass("_createFolderDialog_");
        $('.btn-group .btn-group a[onclick="createFolderDialog()"]').html('<i class="fa fa-fw fa-folder-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfoder"));
        $("#createFolderDialog .modal-header h4").html('<i class="fa fa-fw fa-folder-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfoder"));
        $('.btn-group .btn-group a[onclick="viewReadyForUpload()"]').html('<i class="fa fa-fw fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_upload"));
        $("#readyForUploadDialog .modal-header h4").html('<i class="fa fa-fw fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_upload"));
        $('.btn-group .btn-group a[onclick="downFromUrlDialog()"]').html('<i class="fa fa-fw fa-download" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download"));
        $("#downFromUrlDialog .modal-header h4").html('<i class="fa fa-fw fa-download" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download"));
        $("#renameDialog .modal-header h4").prepend('<i class="fa fa-fw fa-i-cursor" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;');
        $('.btn-group .btn-group a[onclick="downFromUrlDialog()"] i').removeClass("fa-globe").addClass("fa-download");
        $("#removeDialog .modal-header h4").html('<i class="fa fa-fw fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_delete_selected"));
        $(".o__f_m-button-compress").detach().insertAfter("._createFolderDialog_");
        if (config_portable_module_filemanager_hide_toolbar) {
            $(".btn-group.pull-right").addClass("hidden");
            $(".breadcrumb.pull-left").removeClass("pull-left").addClass("pull-right").css("margin-bottom", "-20px");
            $(".o__f_m-main-spinner").css({
                "margin-top": "40px",
                "margin-left": "170px"
            })
        }
        $(".btn-group .at-o__f_m-favorites-dropdown li:not(:first-child):not(:empty)").clone().insertAfter("li.data-context-bookmarks + .divider");
        $("body").on("inserted.bs.popover", '.breadcrumb:visible [data-toggle="popover-path"]', function() {
            $(".popover-path-input").parents(".popover").addClass("popover-path-data")
        });
        $("body").on("shown.bs.popover", '.breadcrumb:visible [data-toggle="popover-path"]', function() {
            $(".popover-path-input").val(decodeURIComponent($("#path").val()));
            $(".popover-path-input").focus();
            $(".popover-path-input").keydown(function(d) {
                var e = d.keyCode ? d.keyCode : d.which;
                if (e == 13) {
                    $(".breadcrumb").append('<li class="hidden popover-path-input-value"><a href="index.cgi?path=' + encodeURIComponentSafe($(this).val()) + '"></a></li>');
                    $(".popover-path-button").find("i").addClass("invisible").parent().find(".cspinner").removeClass("hidden");
                    $(".popover-path-input-value").find("a").trigger("click").remove();
                    $('[data-toggle="popover-path"]').popover("hide");
                    __f__ld__sh()
                }
            });
            setTimeout(function() {
                $(".popover-path-data").animate({
                    opacity: 1
                }, $settings_animation_left_slide_time)
            }, 100)
        });
        $("body").on("hide.bs.popover", '[data-toggle="popover-path"]', function() {
            $(".popover-path-data").css("opacity", 0)
        });
        $("body").on("click", ".popover-path-button", function() {
            var d = jQuery.Event("keydown");
            d.which = 13;
            $(".popover-path-input").trigger(d)
        });
        $("body").on("contextmenu", ".breadcrumb", function(d) {
            d.preventDefault();
            $('[data-toggle="popover-path"]').popover("show")
        });
        $("#nothingSelected").remove();
        $(".active ul.pagination li:first-child").trigger("click")
    }
    f__mgk_fi();
    $('.file-manager .modal-content input:not([type="radio"], [type="checkbox"], [type="hidden"])').addClass("heighter-28");
    setTimeout(function() {
        l__res_fi()
    }, 10);
    $("body").on("click", ".active .ui_checked_columns", function(m) {
        var k = m.keyCode ? m.keyCode : m.which;
        if (get_selected_text()) {
            return
        }
        if (k !== 1) {
            return
        }
        var n = $(m.target).parents("tr");
        if ($(m.target).is(":checkbox") || $(m.target).is(".lawobject")) {
            return
        }
        var h = n.hasClass("directory_go_up"),
            f = n.find('td a[href*="index.cgi?path="]').attr("href"),
            d = n.find('td a[href*="download.cgi?"]').attr("href"),
            e = ($(m.target).is("td"));
        if (h) {
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>');
            $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').trigger("click")
        }
        if (d && !e) {
            return
        }
        m.preventDefault();
        if (f) {
            __f____r("get", f, false, 0);
            return
        }
        if (e) {
            $(m.target).parents("tr").find('td.ui_checked_checkbox input[type="checkbox"]').trigger("click");
            return
        }
    });
    $("body").on("keydown", function(d) {
        var k = d.keyCode ? d.keyCode : d.which;
        if ($("#__f__c__m").is(":visible") && k == 27) {
            $("#__f__c__m").css("display", "none");
            return
        } else {
            if ($("#__f__c__m").is(":visible")) {
                return
            }
        }
        if ($("input.popover-path-input").is(":focus") || $(".popover:visible").length) {
            return
        }
        if (!$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            if (k == 32 && d.ctrlKey) {
                d.preventDefault();
                d.stopPropagation();
                if (!d.shiftKey) {
                    $("#file-manager-new-instance:not(.disabled_no_styling)").trigger("click")
                } else {
                    $(".nav.nav-tabs").find("li.active").find("a").find("i").trigger("click")
                }
            }
            if ((k == 37 || k == 39) && d.ctrlKey) {
                d.preventDefault();
                d.stopPropagation();
                if (k == 37) {
                    $(".nav.nav-tabs").find("li.active").prev("li").find("a").trigger("click")
                } else {
                    $(".nav.nav-tabs").find("li.active").next("li").find("a").trigger("click")
                }
                return
            }
            if ((k == 49 || k == 50 || k == 51 || k == 52 || k == 53 || k == 54 || k == 55 || k == 56 || k == 57) && d.ctrlKey) {
                var y = (k - 48);
                d.preventDefault();
                d.stopPropagation();
                $.each($(".nav.nav-tabs").find("li"), function(n, m) {
                    if ((n + 1) == y) {
                        $(this).find("a").trigger("click");
                        return
                    }
                });
                return
            }
        }
        if ((k == 120 || k == 121) && !d.ctrlKey && !d.shiftKey && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            if (k == 120) {
                $('a[onclick="downFromUrlDialog()"]').trigger("click");
                return
            }
            if (k == 121) {
                $('a[onclick="viewReadyForUpload()"]').trigger("click");
                return
            }
        }
        if (!$("input.popover-path-input").is(":focus") && String.fromCharCode(k).toLowerCase() == "l" && d.ctrlKey && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            d.preventDefault();
            d.stopPropagation();
            var B = $('#headln2r > div.btn-group > a[href^="config.cgi"]');
            if (is_scrolled_into_view(B)) {
                $('[data-toggle="popover-path"]').popover("show")
            } else {
                B.scrollIntoView({
                    duration: 200,
                    direction: "vertical",
                    complete: function() {
                        setTimeout(function() {
                            $('[data-toggle="popover-path"]').popover("show")
                        }, 100)
                    }
                })
            }
            return
        }
        if (k == 93 && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            d.preventDefault();
            d.stopPropagation();
            if (!$("#list_form table tbody tr.m-active").length) {
                $("#list_form table tbody tr:first-child:not(.directory_go_up)").addClass("m-active")
            }
            $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("contextmenu");
            return
        }
        if (k == 13 && $(":focus").parents(".jsPanel").is(".jsPanel")) {
            if (d.ctrlKey && d.shiftKey) {
                $(":focus").parents(".jsPanel").find("._filemanager_file_editor_save").trigger("click");
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-close").trigger("click")
            } else {
                if (d.ctrlKey) {
                    $(":focus").parents(".jsPanel").find("._filemanager_file_editor_save").trigger("click")
                }
            }
        }
        if (k == 27 && $(":focus").parents(".jsPanel").is(".jsPanel")) {
            if (d.ctrlKey) {
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-min").trigger("click")
            } else {
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-close").trigger("click")
            }
            return
        }
        if ($(":focus").parents(".jsPanel").is(".jsPanel")) {
            return
        }
        if (k == 13 && $("#list_form table tbody tr.m-active").length === 1 && !$(".modal.in").length) {
            if ($("#list_form table tbody tr.m-active").hasClass("directory_go_up")) {
                $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>');
                $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').trigger("click")
            } else {
                var v = $('.active form table tbody tr.m-active td a[href*="index.cgi?path="]');
                v.length && v.first()[0].click()
            }
            return
        }
        if (!$(".modal.in").length && d.ctrlKey && (String.fromCharCode(k).toLowerCase() == "c" || String.fromCharCode(k).toLowerCase() == "v" || String.fromCharCode(k).toLowerCase() == "x")) {
            if ($("#list_form table tbody tr td:first-child").find("input:checked").length === 0 && $("#list_form table tbody tr.m-active").length === 1 && d.ctrlKey && (String.fromCharCode(k).toLowerCase() == "c" || String.fromCharCode(k).toLowerCase() == "v" || String.fromCharCode(k).toLowerCase() == "x")) {
                $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
            }
        }
        if (k == 13) {
            if ($(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                if ($(".modal.in .modal-footer button._at_filemanager_delete_submit").length) {
                    $(".modal.in .modal-footer button._at_filemanager_delete_submit").trigger("click")
                } else {
                    if ($(".modal.in .modal-footer button.o__f_m-submitter-chmod").length) {
                        $(".modal.in .modal-footer button.o__f_m-submitter-chmod").trigger("click")
                    } else {
                        if ($(".modal.in .modal-footer button._at_filemanager_create_folder_submit").length) {
                            $(".modal.in .modal-footer button._at_filemanager_create_folder_submit").trigger("click")
                        } else {
                            if ($(".modal.in .modal-footer button._at_filemanager_create_file_submit").length) {
                                $(".modal.in .modal-footer button._at_filemanager_create_file_submit").trigger("click")
                            } else {
                                if ($(".modal.in .modal-footer button.o__f_m-submitter-compress").length) {
                                    $(".modal.in .modal-footer button.o__f_m-submitter-compress").trigger("click")
                                } else {
                                    if ($(".modal.in .modal-footer button._at_filemanager_rename_submit").length) {
                                        $(".modal.in .modal-footer button._at_filemanager_rename_submit").trigger("click")
                                    } else {
                                        if ($(".modal.in .modal-footer button._at_filemanager_search_submit").length) {
                                            $(".modal.in .modal-footer button._at_filemanager_search_submit").trigger("click")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (k == 13 && $("#list_form table tbody tr:not(.directory_go_up)").length === 1 && !$(".modal.in").length && t__wi_p.t___p__xhr_r === 0) {
            $('.active form table tbody tr td a[href*="index.cgi?path="]').length && $('.active form table tbody tr td a[href*="index.cgi?path="]').first()[0].click();
            return
        }
        if (k == 13) {
            return
        }
        if ((k == 32) && !d.shiftKey && !$("#list_form table tbody tr.m-active").length) {
            return
        }
        if ((k == 46 || k == 113 || k == 114 || k == 115 || k == 116 || k == 117 || k == 119) && !_f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            }).length && !$(".ui_checked_columns input:checked").length && !$(".modal.in").length && !$(".popover").is(":visible") && !$("input").is(":focus") && !$("#list_form table tbody tr.m-active").length && (!d.shiftKey || (k == 116 && d.shiftKey) || (k == 115 && !d.shiftKey))) {
            d.preventDefault();
            d.stopPropagation();
            if (t___wi.document.activeElement && $(t___wi.document.activeElement).is('a[href^="edit_file.cgi"]')) {
                return
            }
            messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_nothing_is_selected"), 0.75, "warning", "noSelection_warning");
            return
        }
        if (!d.shiftKey && !d.ctrlKey && !d.altKey && !d.metaKey && !$("#__f__c__m").is(":visible")) {
            if (k != 33 && k != 34 && $("#list_form table tbody tr.m-active").length) {
                d.preventDefault();
                d.stopPropagation()
            }
            if (typeof ___contextmenu__triggered___ != "undefined") {
                return
            }
            l = $("#list_form table tbody tr.m-active").removeClass("m-active");
            var u = l.index();
            var C = l.index();
            if (k == 38 && !$(".modal.in").length) {
                if ($(".dataTable-mirror").is(":focus")) {
                    $.each($("input"), function() {
                        $(this).blur()
                    })
                }
                C--;
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr").addClass("m-not-active")
            }
            if (k == 40 && !$(".modal.in").length) {
                if ($(".dataTable-mirror").is(":focus")) {
                    $.each($("input"), function() {
                        $(this).blur()
                    })
                }
                C++;
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr").addClass("m-not-active")
            }
        }
        if ((k == 38 || k == 40 || k == 32 || k == 13 || k == 46 || k == 119 || k == 117 || k == 115 || k == 116 || k == 113 || k == 114) && !$(".modal.in").length) {
            l = (!$("#list_form table tbody tr").find(".dataTables_empty").length && $("#list_form table tbody tr").eq(C).addClass("m-active m-not-active"))
        }
        if (k == 27) {
            d.preventDefault();
            d.stopPropagation();
            $('.modal.in button[data-dismiss="modal"]').trigger("click")
        }
        if (k == 35 && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                l = $("#list_form table tbody tr").eq(parseInt($("#list_form table tbody tr").length) - 1).addClass("m-active m-not-active")
            }
        }
        if (k == 36 && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                l = $("#list_form table tbody tr").eq(0).addClass("m-active m-not-active")
            }
        }
        if (k == 13) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr.m-active").find("td:first-child").trigger("click")
            }
        }
        if (k == 8 && !$(".o__f_m-main-spinner").is(":visible") && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>');
                $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]:not(.hidden)').trigger("click")
            }
        }
        if (k == 32 && !d.ctrlKey) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                var A = $("#list_form table tbody tr.m-active"),
                    e = jQuery.Event("keydown");
                A.find("td:first-child input").trigger("click");
                e.which = 40;
                $("body").trigger(e);
                __r____changed();
                if (config_portable_module_filemanager_calculate_size) {
                    __f__get_fs()
                }
            }
        }
        if (k == 106 || (d.shiftKey && k == 56)) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                $('body button[onclick="invertSelection()"]').trigger("click")
            }
        }
        if (k == 107 || (d.shiftKey && k == 187)) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                $('body button[onclick="selectAll()"]').trigger("click")
            }
        }
        if (k == 109 || (d.shiftKey && k == 189)) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                var D = document.getElementsByClassName("ui_checked_columns");
                for (i = 0; i < D.length; i++) {
                    var h = D[i].getElementsByTagName("input")[0];
                    if (h.checked) {
                        rowClick(D[i])
                    }
                }
                __f___lb();
                __r____changed()
            }
        }
        if ((k == 46 || k == 119) && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                if ($(".o__f_m-button-delete.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-delete").trigger("click");
                __f___cs()
            }
        }
        if (k == 113 && !d.shiftKey) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                if ($(".o__f_m-button-chmod.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-chmod a").trigger("click");
                __f___cs()
            }
        } else {
            if (k === 113 && d.shiftKey) {
                if (!$(".modal.in").length) {
                    d.preventDefault();
                    d.stopPropagation();
                    if ($(".o__f_m-button-chattr.disabled").length) {
                        $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                    }
                    $("body .o__f_m-button-chattr a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (k == 114 && !d.shiftKey) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                if ($(".o__f_m-button-chown.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-chown a").trigger("click");
                __f___cs()
            }
        } else {
            if (k === 114 && d.shiftKey && $t_av_sestatus) {
                if (!$(".modal.in").length) {
                    d.preventDefault();
                    d.stopPropagation();
                    if ($(".o__f_m-button-chcon.disabled").length) {
                        $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                    }
                    $("body .o__f_m-button-chcon a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (k == 116 && !d.shiftKey) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                if ($(".o__f_m-button-compress.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-compress a").trigger("click");
                __f___cs()
            }
        }
        if (k == 118 && !d.shiftKey && !d.ctrlKey) {
            if (!$(".modal.in").length) {
                d.preventDefault();
                d.stopPropagation();
                $('a[onclick = "createFolderDialog()"]').trigger("click");
                __f___cs()
            }
        }
        if (k == 117) {
            if (!$(".modal.in").length) {
                if ($("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").length) {
                    d.preventDefault();
                    d.stopPropagation();
                    $("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (k == 115 && !d.shiftKey) {
            if (!$(".modal.in").length) {
                if ($("#list_form table tbody tr.m-active").find("i.fa-pencil-square-o").parent("a").length) {
                    d.preventDefault();
                    t__wi_p.$___ajax_requested_url = "edit_file.cgi";
                    var z = "jsp_" + parseInt(Math.random() * 1000000000000000000);
                    window[z] = $.jsPanel({
                        ajax: {
                            url: $("#list_form table tbody tr.m-active").find("i.fa-pencil-square-o").parent("a").attr("href"),
                            dataType: "text",
                            autoload: false,
                            done: function(F, o, E, q) {
                                var t = $(F).find(".ui_form"),
                                    G = "<strong>" + $(F).find(".panel-body").contents().filter(function() {
                                        return !!$.trim(this.innerHTML || this.data)
                                    }).first().text() + "</strong>",
                                    p = $(this).parents("div.jsPanel"),
                                    n = (parseInt(q.attr("id").replace("jsPanel-", "")) + 1);
                                if (!$(t).find("textarea").length) {
                                    var t = $(F).find('form[action="save_file.cgi"]').append($(F).find("#data").removeAttr("id")).prepend($(F).find("#file").removeAttr("id")).prepend($(F).find("#path").removeAttr("id")),
                                        G = "<strong>" + $(F).find(".table-title").text() + "</strong>"
                                }
                                q.title(G);
                                p.data("jspuid", z);
                                p.find(".jsPanel-hdr h3").prepend('<i class="fa fa-fw fa-lg fa-pencil-square-o" alt="Edit" style="margin-right: 7px; vertical-align: -15%">&nbsp;&nbsp;</i>').find("strong").attr("title", $(G).text());
                                p.find(".jsPanel-content").html(t);
                                $("#jsPanel-min-container").css({
                                    width: $(window).width(),
                                    overflow: "auto"
                                });
                                var s = p.find(".jsPanel-content");
                                var m = s.find(".ui_form_end_buttons tr td span:first-child input"),
                                    r = s.find(".ui_form_end_buttons tr td span:nth-child(2) input");
                                s.find(".ui_form_end_buttons").remove();
                                p.find(".jsPanel-hdr .jsPanel-hdr-r").append('<div class="jsPanel-btn-save _filemanager_file_editor_save" style="margin-right: 10px; margin-top: 5px;"><i class="fa fa-fw fa-floppy-o"></i></div>																								 <div class="jsPanel-btn-help " style="margin-right: 10px; margin-top: 5px;"><i class="fa fa-fw fa-question-circle __helper"></i></div>');
                                p.find(".jsPanel-btn-max").trigger("click");
                                t__cm___init(s.find("textarea"), $(G).text(), [null, parseInt(s.css("height"))], n);
                                p.animate({
                                    opacity: 1
                                }, 400, function() {
                                    window["__cm_editor_" + n].focus()
                                });
                                q.on("jspanelbeforeclose", function(x, J) {
                                    var I = $("#" + J)
                                });
                                p.find("._filemanager_file_editor_save").click(function(x) {
                                    $(this).find("i").replaceWith(t__lo__btn_md());
                                    $(this).removeClass("text-danger");
                                    p.find('form[action="save_file.cgi"]').submit()
                                });

                                function H() {
                                    var x = p.find("._filemanager_file_editor_save");
                                    x.find(".cspinner").remove();
                                    x.find("i").remove();
                                    x.prepend('<i class="fa fa-fw fa-floppy-o"></i>')
                                }
                                p.find('form[action="save_file.cgi"]').submit(function(x) {
                                    x.preventDefault();
                                    x.stopPropagation();
                                    messenger('<i class="fa fa-lg fa-fw fa-floppy-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_saving_file").replace("%value", G) + " " + lang("theme_xhred_global_please_wait"), 5, "info", "savingFileStart");
                                    $.ajax({
                                        type: "POST",
                                        url: $_____link_full + "/" + __f___mn() + "/save_file.cgi",
                                        data: p.find('form[action="save_file.cgi"]').serialize(),
                                        dataType: "text",
                                        success: function(I) {
                                            var J = p.find("._filemanager_file_editor_save .cspinner");
                                            if (!$(I).find("textarea#data").length) {
                                                messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + $(I).find(".panel-body").html(), 10, "error", "savingFileError");
                                                if (J.parent(".btn").index() === 1) {
                                                    modal_dismiss()
                                                }
                                                H();
                                                return
                                            }
                                            messenger('<i class="fa fa-lg fa-fw fa-check-circle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_file_saved").replace("%value", G), 1.5, "success", "savingFileDone");
                                            H()
                                        },
                                        error: function(I) {}
                                    })
                                })
                            }
                        },
                        selector: "body",
                        resizable: "disabled",
                        draggable: "disabled",
                        theme: "light",
                        controls: {
                            normalize: "disable",
                            smallify: "disable"
                        },
                        maximizedMargin: {
                            top: 20,
                            right: 25,
                            bottom: 20,
                            left: 25
                        },
                        dblclicks: {
                            title: "minimize"
                        },
                        onbeforeclose: function() {
                            if ($("body").find(".bootbox-o__f_m-save-prompt").length && this.find("._filemanager_file_editor_save.text-danger").length) {
                                return false
                            }
                            if (this.find("._filemanager_file_editor_save.text-danger").length) {
                                $this = this;
                                bootbox.dialog({
                                    message: "" + lang("theme_xhred_filemanager_file_edit_but_not_saved") + " <br><br>" + lang("theme_xhred_filemanager_file_edit_but_not_saved_what_to_do") + "",
                                    title: '<i class="fa fa-fw fa-question-circle font-size-80p bootbox-o__f_m-save-prompt">&nbsp;&nbsp;</i> <strong class="font-size-90p">' + $this.find(".jsPanel-title strong").text() + "</strong>",
                                    buttons: {
                                        success: {
                                            label: '&nbsp;<i class="fa fa-fw fa-floppy-o">&nbsp;&nbsp;</i>' + lang("theme_xhred_global_save_and_close") + "&nbsp;&nbsp;",
                                            className: "btn-primary vertical-align-top ",
                                            callback: function() {
                                                $this.find(".jsPanel-btn-save").trigger("click");
                                                $this.find(".jsPanel-btn-close").trigger("click")
                                            }
                                        },
                                        danger: {
                                            label: '&nbsp;<i class="fa fa-fw fa-times-circle-o">&nbsp;&nbsp;</i>' + lang("theme_xhred_global_close_without_saving") + "&nbsp;&nbsp;",
                                            className: "btn-danger vertical-align-top margined-left--2",
                                            callback: function() {
                                                $this.find("._filemanager_file_editor_save.text-danger").removeClass("text-danger");
                                                $this.find(".jsPanel-btn-close").trigger("click")
                                            }
                                        },
                                        main: {
                                            label: '&nbsp;<i class="fa fa-fw fa-arrow-circle-o-left">&nbsp;&nbsp;</i>' + lang("theme_xhred_global_continue_editing") + "&nbsp;&nbsp;",
                                            className: "btn-default vertical-align-top margined-left--2",
                                            callback: function() {
                                                setTimeout(function() {
                                                    var m = window["__cm_editor_" + (parseInt($this.attr("id").replace("jsPanel-", "")) + 1)];
                                                    m && m.focus()
                                                }, 100)
                                            }
                                        }
                                    },
                                    onEscape: function() {
                                        setTimeout(function() {
                                            var m = window["__cm_editor_" + (parseInt($this.attr("id").replace("jsPanel-", "")) + 1)];
                                            m && m.focus()
                                        }, 100)
                                    }
                                });
                                return false
                            }
                        },
                        onbeforemaximize: function() {
                            if ($("body").find(".bootbox-o__f_m-save-prompt").length && this.find("._filemanager_file_editor_save.text-danger").length) {
                                return false
                            }
                        }
                    });
                    __f___cs()
                } else {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_not_editable"), 0.75, "warning", "notEditableTarget")
                }
            }
        }
        if (!$("input").is(":focus") && !$("select").is(":focus") && !$("textarea").is(":focus") && !$(".modal.in").length && k != 32 && k != 113 && k != 114 && k != 106 && k != 107 && k != 116 && k != 109 && k != 46 && k != 119 && k != 118 && k != 115) {
            if ($(".tab-pane.active .paginate_button.next").parents("ul.pagination").hasClass("pointer-events-none")) {
                return
            }
            if (k === 39) {
                $(".tab-pane.active .paginate_button.next").trigger("click");
                $("#list_form table tbody tr.m-active").removeClass("m-active");
                $("#list_form table tbody tr").addClass("m-not-active")
            } else {
                if (k === 37) {
                    $(".tab-pane.active .paginate_button.previous").trigger("click");
                    $("#list_form table tbody tr.m-active").removeClass("m-active");
                    $("#list_form table tbody tr").addClass("m-not-active")
                } else {
                    var f = String.fromCharCode(k);
                    if (f && /[a-zA-Z0-9]/.test(f) && !d.ctrlKey && !d.altKey && !d.metaKey) {
                        $(".dataTables_filter label input").trigger("keyup").focus()
                    }
                }
            }
        }
        if (String.fromCharCode(k).toLowerCase() == "s" && d.ctrlKey) {
            d.preventDefault();
            d.stopPropagation();
            _f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            }).length && __f__get_fs()
        }
        if (d.shiftKey && d.ctrlKey) {
            return
        }
        if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus") && !$(".btn-filter-top-right input").is(":focus") && (k == 115 || k == 116 || k == 118 || String.fromCharCode(k).toLowerCase() == "c" || String.fromCharCode(k).toLowerCase() == "v" || String.fromCharCode(k).toLowerCase() == "x")) {
            if ((!(String.fromCharCode(d.which).toLowerCase() == "c" && d.ctrlKey) && !(String.fromCharCode(d.which).toLowerCase() == "v" && d.ctrlKey) && !(String.fromCharCode(d.which).toLowerCase() == "x" && d.ctrlKey) && !(k == 115 && d.shiftKey) && !(k == 116 && d.shiftKey) && !(k == 118 && d.shiftKey)) && !(d.which == 19)) {
                return true
            }
            d.preventDefault();
            if (k == 115) {
                if (!$(".modal.in").length) {
                    d.stopPropagation();
                    $('a[onclick = "createFileDialog()"]').trigger("click");
                    __f___cs();
                    return
                }
            }
            if (k == 116) {
                if (!$(".modal.in").length) {
                    d.stopPropagation();
                    if ($("#list_form table tbody tr.m-active").find("i.fa-extract-archive").parent("a").length) {
                        var w = $("#list_form table tbody tr.m-active").find("td.ui_checked_checkbox input");
                        !w.is(":checked") && w.trigger("click");
                        d.preventDefault();
                        d.stopPropagation();
                        $("#list_form table tbody tr.m-active").find("i.fa-extract-archive").parent("a")[0].click();
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_not_decompressable"), 0.75, "warning", "notDecompressableTarget")
                    }
                    return
                }
            }
            if (k == 118) {
                if (!$(".modal.in").length) {
                    d.stopPropagation();
                    $('a[onclick = "searchDialog()"]').trigger("click");
                    __f___cs();
                    return
                }
            }
            if (String.fromCharCode(k).toLowerCase() == "c") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    d.stopPropagation();
                    if (!$(".o__f_m-button-copy.disabled").length) {
                        $("body .o__f_m-button-copy a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_no_selection_to_copy"), 0.75, "warning", "nothingSelected")
                    }
                    return
                }
            }
            if (String.fromCharCode(k).toLowerCase() == "v") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    d.stopPropagation();
                    if (!$(".o__f_m-button-paste.disabled").length) {
                        $("body .o__f_m-button-paste a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_empty_clipboard"), 0.75, "warning", "emptyClipboard")
                    }
                    return
                }
            }
            if (String.fromCharCode(k).toLowerCase() == "x") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    d.stopPropagation();
                    if (!$(".o__f_m-button-cut.disabled").length) {
                        $("body .o__f_m-button-cut a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_no_selection_to_cut"), 0.75, "warning", "nothingSelected")
                    }
                    return
                }
            }
            return
        }
    });
    $("body").on("click", "a.action-link > .fa", function(f) {
        f.preventDefault();
        if ($(this).hasClass("fa-extract-archive")) {
            var d = $(this).parents("tr").find("td.ui_checked_checkbox input");
            !d.is(":checked") && d.trigger("click")
        } else {
            if ($(this).hasClass("fa-i-cursor")) {
                f.stopPropagation()
            }
        }
    });
    $("body").on("click", "#file-manager-new-instance:not(.disabled_no_styling)", function(d) {
        __f___nt($("#path").val(), true)
    });
    $("body").on("click", ".nav.nav-tabs li.ui-sortable-handle.disabled", function(d) {
        d.preventDefault;
        d.stopPropagation;
        return false
    });
    $("body").on("mouseenter mousemove", ".nav.nav-tabs li", function() {
        $(this).find("a > i").removeClass("invisible")
    }).on("mouseleave", ".nav.nav-tabs li", function() {
        $(this).find("a > i").addClass("invisible")
    });
    $("body").on("click", ".nav.nav-tabs li:not(.disabled) i", function(k) {
        k.preventDefault;
        if ($(".nav.nav-tabs li:not(.ui-sortable-placeholder)").length <= 1) {
            return
        }
        var h = $(this),
            f = h.parent("a").parent("li"),
            d = parseInt(h.parent("a").attr("href").replace(/^\D+/g, ""));
        if (!f.hasClass("active")) {
            $('a[href="#tab-' + d + '"]').parent("li").remove();
            $('.tab-content .tab-pane[id="tab-' + d + '"]').remove();
            __f___up__tb_vis();
            __f___up__tb_store()
        } else {
            tab___to______delete = d;
            if (h.parent("a").parent("li").prev("li:not(.active)").length) {
                h.parent("a").parent("li").prev("li:not(.active)").find("a").trigger("click")
            } else {
                if (h.parent("a").parent("li").next("li:not(.active)").length) {
                    h.parent("a").parent("li").next("li:not(.active)").find("a").trigger("click")
                }
            }
        }
        return false
    });
    $("body").on("hide.bs.tab", 'a[data-toggle="tab"]', function(d) {
        var f = $(d.target).attr("href").replace(/^\D+/g, "");
        if ($(".__o__f_m-search-results").length) {
            $('.tab-content .tab-pane[id="tab-' + f + '"]').data("searchQuery", $(".__o__f_m-search-results")).data("searchQueryTotal", $(".total").html())
        }
    });
    $("body").on("show.bs.tab", 'a[data-toggle="tab"]', function(d) {
        $(".nav.nav-tabs li").addClass("disabled")
    });
    $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function(m) {
        setTimeout(function() {
            $(".nav.nav-tabs li").removeClass("disabled")
        }, 400);
        var k = $(m.target).attr("href"),
            h = k.replace(/^\D+/g, ""),
            n = $(m.relatedTarget).attr("href"),
            d = n.replace(/^\D+/g, ""),
            f = "_AuthenticThemeTmp" + d;
        $(n).find("form").attr({
            id: "list_form" + f,
            name: "list_form" + f
        });
        $(n).find(".ui_checked_columns").removeClass("ui_checked_columns").addClass("_ui_checked_columns_tmp");
        $.each($(n).find("form *[id]"), function() {
            var q = $(this).attr("id"),
                e = $(this).attr("name"),
                p = q + f,
                o = (e ? (e + f) : false);
            if (q.indexOf("DataTable") === -1) {
                $(this).attr({
                    id: p
                });
                if (e) {
                    $(this).attr({
                        name: o
                    })
                }
            }
        }).promise().done(function() {
            var e = "_AuthenticThemeTmp" + h;
            $(k).find("._ui_checked_columns_tmp").addClass("ui_checked_columns").removeClass("_ui_checked_columns_tmp");
            $(k).find("form").attr({
                id: "list_form",
                name: "list_form"
            });
            $.each($(k).find("form *[id]"), function() {
                var r = $(this).attr("id"),
                    p = $(this).attr("name"),
                    q = r.replace(e, ""),
                    o = (p ? p.replace(e, "") : false);
                if (r.indexOf(e) > -1) {
                    $(this).attr({
                        id: q
                    });
                    if (p) {
                        $(this).attr({
                            name: o
                        })
                    }
                }
            }).promise().done(function() {
                __f__c__m(1);
                if ($(m.target).attr("newly-created") == "1") {
                    $(m.target).removeAttr("newly-created")
                } else {
                    var p = $('.tab-content .tab-pane[id="tab-' + h + '"]').data("searchQuery"),
                        o = $('.tab-content .tab-pane[id="tab-' + h + '"]').data("searchQueryTotal"),
                        r = [];
                    if (p) {
                        r.push(p);
                        r.push(o);
                        $('.tab-content .tab-pane[id="tab-' + h + '"]').removeData("searchQuery").removeData("searchQueryTotal")
                    }
                    __f___up__d("index.cgi?path=" + encodeURIComponentSafe($(k).find("form input#path").val()), false, r)
                }!p && $(".total").html($(".tab-pane.active").data("totalValue"));
                if (typeof tab___is______new != "undefined") {
                    _f__table().DataTable().draw();
                    delete tab___is______new
                } else {
                    __init__dt_ck__e()
                }
                if (typeof tab___to______delete != "undefined") {
                    var q = tab___to______delete;
                    delete tab___to______delete;
                    $('a[href="#tab-' + q + '"]').parent("li").remove();
                    $('.tab-content .tab-pane[id="tab-' + q + '"]').remove()
                }
            })
        })
    });
    $("#searchForm label:first-child").text(lang("theme_xhred_filemanager_search_query"));
    $("#searchForm .form-group").after('		<div class="form-inline">			<div class="form-group">				<label>' + lang("theme_xhred_filemanager_search_match") + '</label>				<br>				<input id="grepstring" name="grepstring" type="text" class="form-control heighter-28">			</div>			<div class="form-group"">				<label>' + lang("theme_xhred_filemanager_search_replace") + '</label>				<br>				<input id="grepreplace" name="grepreplace" type="text" class="form-control heighter-28">			</div>		</div>	');
    var b = $("#searchForm").find("span.awcheckbox");
    b.prev("br").remove();
    b.detach().appendTo($("#searchForm .form-inline"));
    $('#searchDialog input[name="query"]').val("*")
}
___f__tw();
t__cm___init(0, 0, 0, 0, 0, 0, 1);
setTimeout(function() {
    t__wi_p.$____loader_block__ = 0;
    __lre()
}, 1200);