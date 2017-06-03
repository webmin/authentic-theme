/*!
 * Authentic Theme 18.49 (https://github.com/qooob/authentic-theme)
 * Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/18/LICENSE)
 */
;
t__wi_p.$____loader_block__ = 1;
$g__v__home_base = Math.random();

function __f___mn() {
    return $g__m__name
}

function __f___um() {
    var a = localStorage.getItem($hostname + "-settings_thirdparty_filemanager_usermode");
    if (!!a) {
        return "&username=" + a + ""
    } else {
        return ""
    }
}

function checkSelected() {
    return _f__table().dataTable().$("tr.hl-aw", {
        filter: "applied"
    }).length
}

function renameDialog(a) {
    a = decode_html(a);
    $("#renameForm input[name=name]").val(a);
    $("#renameForm input[name=file]").val(a);
    $("#renameDialog").modal({
        backdrop: "static",
        keyboard: true,
        show: true
    })
}

function __f___gd() {
    var a = $(_f__table().fnGetNodes()).find("input").add($(".active form > input:not([name='path'])")).serialize();
    a = a + "&path=" + $("#path").val();
    return a
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

function __f___es_adj(a, c) {
    var d = a.find("option:selected").text(),
        f = $("<div data-encoding_manual-" + c + ' class="invisible inline-block">').html(d);
    $("body").append(f);
    var b = $("body").find("div[data-encoding_manual-" + c + "]"),
        e = b.width();
    a.css("width", e + 13);
    b.remove()
}
typeof __f___cas_jp_rev == "undefined" ? __f___cas_jp_rev = 0 : 0;

function __f___cas_jp(f, o, n) {
    var h = "-9999px",
        q = $(".jsPanel").filter(function() {
            return $(this).css("left") !== h
        }),
        m = q.length,
        c = $(window).width(),
        e = 1,
        r = $(window).height(),
        b = 2,
        p = c / m,
        k = r / m,
        a = $(".jsPanel-controlbar .jsPanel-btn-align"),
        d = (__f___cas_jp_rev ? $(q).toArray().reverse() : q);
    if (f) {
        if (m == 1) {
            a.addClass("disabled")
        } else {
            a.removeClass("disabled")
        }
        return
    }
    $.each(d, function(s, w) {
        if ($(this).css("left") === h) {
            return
        }
        var x = parseInt($(this).attr("data-uid").replace("jsp_", "")),
            u = (parseInt($(o).attr("id").replace("jsPanel-", "")) + 1);
        if (n === 1) {
            var v = (c - 20),
                t = (k - (((s + 1) == m) ? 20 : 5));
            window["jsp_" + x].resize(v, t).reposition("left-top 10 " + (10 + (k * s)) + "")
        } else {
            var v = (p - (((s + 1) == m) ? 20 : 5)),
                t = (r - 20);
            window["jsp_" + x].resize(v, t).reposition("left-top " + (10 + (p * s)) + " 10")
        }
    });
    (__f___cas_jp_rev === 1 ? __f___cas_jp_rev = 0 : __f___cas_jp_rev = 1);
    __f___cas_jp_rev = 0
}

function __f___cm_resize(a) {
    var b = (parseInt($(a).attr("id").replace("jsPanel-", "")) + 1);
    typeof window["__cm_editor_" + b] != "undefined" && window["__cm_editor_" + b].setSize(a.content.css("width"), a.content.css("height"))
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
            E += "<strong>• " + I + "</strong> - " + H + "<br>"
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
                messenger('<i class="fa fa-lg fa-fw ' + (z ? "fa-exclamation-circle" : r) + '"></i>' + ((lang("theme_xhred_filemanager_successful_compression_bg_with_errors").replace("%file", b).replace("%path", y)) + (C($(x[2]).text()))), e, (A), v + "_" + A)
            } else {
                messenger('<i class="fa fa-lg fa-fw ' + B + '"></i>' + (lang("theme_xhred_filemanager_successful_compression_bg").replace("%file", b).replace("%path", y)), o, "info", v + "_" + k)
            }
        }
    }
    if (m && q) {
        messenger('<i class="fa fa-lg fa-fw ' + (z ? "fa-exclamation-circle" : r) + '"></i>' + lang(h + (z ? "_fatal" : "")) + (C($(x[2]).text())), e, (z ? "error" : A), v + "_" + A)
    } else {
        if (p) {
            messenger('<i class="fa fa-lg fa-fw ' + B + '"></i>' + lang(s), o, k, v + "_" + k)
        }
    }
    c && $("." + c).remove();
    if (!z) {
        d && __f_____ul();
        D && modal_dismiss();
        (f && t) && __f___u("upd", $(x[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, false, false, $(x[0]).text())
    }
}

function __f____a(k, o) {
    if (k === "extract") {}
    var n = $('#list_form > input[type="hidden"][name="path"]').val();
    if (k != "bookmark") {
        __f_____lo(false, true)
    }
    if (k === "copy" || k === "cut") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/" + k + ".cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                localStorage.removeItem($hostname + "-cut");
                localStorage.removeItem($hostname + "-copy");
                localStorage.setItem($hostname + "-" + k, 1);
                $(".o__f_m-button-paste").removeClass("disabled");
                if (k === "copy") {
                    messenger('<i class="fa fa-lg fa-fw fa-clone"></i>' + lang("theme_xhred_filemanager_copying_successful"), 1.5, "info", k + "_info")
                } else {
                    if (k === "cut") {
                        messenger('<i class="fa fa-lg fa-fw fa-scissors"></i>' + lang("theme_xhred_filemanager_cutting_successful"), 1.5, "warning", k + "_warning")
                    }
                }
                __f_____ul()
            },
            error: function(a) {
                messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + lang("theme_xhred_filemanager_buffer_error"), 10, "error", k + "_error")
            }
        })
    }
    if (k === "paste") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(n) + "&module=" + $g__m__name,
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
                    messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>' + $(g[2]).html(), 20, "warning", k + "_warning");
                    __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
                } else {
                    if (b == "merr") {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_move_into_self"), 10, "error", k + "_error");
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
                                                url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(n) + "&module=" + $g__m__name + "&ua=2",
                                                data: false,
                                                dataType: "text",
                                                success: function(d) {
                                                    d = $.parseHTML(d);
                                                    if ($(d[2]).html().length > 1) {
                                                        messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>' + $(d[2]).html(), 15, "warning", k + "_warning")
                                                    } else {
                                                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_pasting_and_copying_" + c + ""), 5, "success", k + "_success")
                                                    }
                                                    __f___u("upd", $(d[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(d[0]).text())
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
                                                url: $g__e__path + "/file-manager/paste.cgi?path=" + encodeURIComponentSafe(n) + "&module=" + $g__m__name + "&ua=1",
                                                data: false,
                                                dataType: "text",
                                                success: function(d) {
                                                    d = $.parseHTML(d);
                                                    if ($(d[2]).html().length > 1) {
                                                        messenger('<i class="fa fa-lg fa-fw fa-question-circle"></i>' + $(d[2]).html(), 15, "warning", k + "_warning")
                                                    } else {
                                                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_pasting_and_replacing_" + c + ""), 5, "success", k + "_success")
                                                    }
                                                    __f___u("upd", $(d[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(d[0]).text())
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
                                messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_pasting_and_copying_" + c + ""), 5, "success", k + "_success");
                                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
                            } else {
                                messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_pasting_successful"), 5, "success", k + "_success");
                                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
                            }
                        }
                    }
                }
            },
            error: function(a) {}
        })
    }
    if (k === "extract") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/extract.cgi?module=" + $g__m__name + __f___um(),
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (k === "bookmark") {
        __f_____sl();
        __f_____hl_();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/bookmark.cgi?path=" + encodeURIComponentSafe(n) + "&module=" + $g__m__name,
            data: false,
            dataType: "text",
            success: function(a) {
                exiting_book_mark = f_m__bm__u();
                if (exiting_book_mark.length) {
                    messenger('<i class="fa fa-lg fa-fw fa-star-o"></i>' + lang("theme_xhred_filemanager_unbookmark_success").replace("%value", (n ? escape_html(decodeURIComponentSafe(n)) : "/")), 5, "warning", "bookmarkAddRemove")
                } else {
                    messenger('<i class="fa fa-lg fa-fw fa-star"></i>' + lang("theme_xhred_filemanager_bookmark_success").replace("%value", (n ? escape_html(decodeURIComponentSafe(n)) : "/")), 5, "info", "bookmarkAddRemove")
                }
            },
            error: function(a) {}
        })
    }
    if (k === "delete") {
        __f__ld__sh();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/delete.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                messenger_hide("delete_info");
                __f____success(a, 1, 1, 1, false, "fa-exclamation-triangle", "theme_xhred_filemanager_delete_warning", 30, "warning", "fa-trash-o", "theme_xhred_filemanager_successful_deletion", 2, "info", k)
            },
            error: function(a) {}
        })
    }
    if (k === "rename") {
        __f__ld__sh();
        var q = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/rename.cgi?module=" + $g__m__name,
            data: $("#renameForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + a, 10, "error", k + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k)
            },
            error: function(a) {}
        })
    }
    if (k === "create_folder") {
        __f__ld__sh();
        var q = encodeURIComponentSafe($('#list_form > input[type="hidden"][name="path"]').val());
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/create_folder.cgi?module=" + $g__m__name + __f___um(),
            data: $("#createFolderForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + a, 10, "error", k + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (k === "create_file") {
        __f__ld__sh();
        var q = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/create_file.cgi?module=" + $g__m__name + __f___um(),
            data: $("#createFileForm").serialize(),
            dataType: "text",
            success: function(a) {
                g = $.parseHTML(a);
                if (!$(g[1]).find("table.ui_columns").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + a, 10, "error", k + "_error");
                    __f_____ul();
                    return
                }
                __f___u("upd", $(g[1]).find("table.ui_columns").find(".ui_checked_columns"), 1, k, false, $(g[0]).text())
            },
            error: function(a) {}
        })
    }
    if (k === "url_download") {
        __f__ld__sh();
        var q = $('#list_form > input[type="hidden"][name="path"]').val();
        modal_dismiss();
        var h = $("#downFromUrlForm input:not([name='path'])").serialize();
        h = h + "&path=" + $("#path").val();
        $.ajax({
            type: "POST",
            url: $_____link_full + "/" + __f___mn() + "/http_download.cgi",
            data: h,
            dataType: "text",
            success: function(a) {
                messenger_hide("url_download_info");
                if (!$(a).find(".panel-body").text().match(/100 %/) && !$(a).find(".panel-body").text().match(/100%/) && !$(a).find(".panel-body h3").length) {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + $(a).find(".panel-body").html(), 10, "error", k + "_error");
                    __f_____ul();
                    return
                } else {
                    if ($(a).find(".panel-body h3").length) {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + $(a).find(".panel-body h3").html(), 10, "error", k + "_error");
                        return
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-download"></i>' + $(a).find(".panel-body").html(), 5, "success", k + "_success");
                        __f____r("get", "index.cgi?path=" + (q ? encodeURIComponentSafe(q) : ""), false, 0)
                    }
                }
            },
            error: function(a) {}
        })
    }
    if (k === "search") {
        __f__ld__sh();
        var q = $('#list_form > input[type="hidden"][name="path"]').val(),
            m = $("#searchForm").find('input[name="query"]').val(),
            r = $.trim($("#searchForm").find('input[name="grepstring"]').val()),
            e = $.trim($("#searchForm").find('input[name="grepreplace"]').val()),
            p = (r && !e ? " fa-1_50x fa-file-find" : r && e ? " fa-1_50x fa-find-replace" : " fa-lg fa-search");
        modal_dismiss();
        if (r && !e) {
            messenger('<i class="fa fa-1_50x fa-fw fa-file-find"></i>' + lang("theme_xhred_filemanager_searching_matching").replace("%value", m).replace("%text", r) + " " + lang("theme_xhred_global_please_wait"), 10000, "info", k + "_preMe")
        } else {
            if (r && e) {
                messenger('<i class="fa fa-1_50x fa-fw fa-find-replace"></i>' + lang("theme_xhred_filemanager_searching_replacing").replace("%value", m).replace("%text", r).replace("%replace", e) + " " + lang("theme_xhred_global_please_wait"), 10000, "warning", k + "_preMe")
            } else {
                messenger('<i class="fa fa-lg fa-fw fa-search"></i>' + lang("theme_xhred_filemanager_searching").replace("%value", m) + " " + lang("theme_xhred_global_please_wait"), 10000, "info", k + "_preMe")
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
                $_br.html($_br.html() + '<span class="__o__f_m-search-results">' + ($(".breadcrumb > li:last-child a i").hasClass("fa-search") ? "&nbsp;&nbsp;&nbsp;/&nbsp;" : "") + '&nbsp;&nbsp;:&nbsp;&nbsp;<span class="text-primary __o__f_m-search-results-data cursor-pointer">`<em><strong class="small">' + m + "</strong>" + (r && !e ? ' <strong class="small">[' + r + "]</strong>" : (r && e) ? ' <strong class="small">[' + r + '<span class="smaller"> -> </span>' + e + "]</strong>" : "") + "</em>`</span></span>");
                var a = 5000;
                if (__list_table_total_rows > 1) {
                    if (r && e) {
                        messenger('<i class="fa fa-fw ' + p + '"></i>' + lang("theme_xhred_filemanager_search_replaced_multi").replace("%value", __list_table_total_rows), 10, "success", k + "_success");
                        a = 9000
                    } else {
                        messenger('<i class="fa fa-fw ' + p + '"></i>' + lang("theme_xhred_filemanager_search_founds").replace("%value", __list_table_total_rows), 6, "success", k + "_success")
                    }
                } else {
                    if (__list_table_total_rows == 1) {
                        if (r && e) {
                            messenger('<i class="fa fa-fw ' + p + '"></i>' + lang("theme_xhred_filemanager_search_replaced"), 6, "success", k + "_success")
                        } else {
                            messenger('<i class="fa fa-fw ' + p + '"></i>' + lang("theme_xhred_filemanager_search_found"), 6, "success", k + "_success")
                        }
                    } else {
                        messenger('<i class="fa fa-fw ' + p + '"></i>' + lang("theme_xhred_filemanager_search_no_matches"), 6, "error", k + "_error")
                    }
                }
                setTimeout(function() {
                    messenger_hide("search_preMe")
                }, a)
            },
            error: function(a) {}
        })
    }
    if (k === "chmod") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="perms" value="' + o[0] + '" class="_o__f_m-tmp-chmod-inputs">');
        $("#list_form").append('<input type="hidden" name="applyto" value="' + o[1] + '" class="_o__f_m-tmp-chmod-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chmod.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chmod_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chmod-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_permissions_with_errors", 15, "warning", "fa-cogs", "theme_xhred_filemanager_successful_permissions", 3, "success", k)
            },
            error: function(a) {}
        })
    }
    if (k === "chown") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="owner" value="' + o[0] + '" class="_o__f_m-tmp-chown-inputs">');
        $("#list_form").append('<input type="hidden" name="group" value="' + o[1] + '" class="_o__f_m-tmp-chown-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + o[2] + '" class="_o__f_m-tmp-chown-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chown.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chown_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chown-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_ownership_with_errors", 15, "warning", "fa-users", "theme_xhred_filemanager_successful_ownership", 3, "success", k)
            },
            error: function(a) {}
        })
    }
    if (k === "chattr") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="label" value="' + o[0] + '" class="_o__f_m-tmp-chattr-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + o[1] + '" class="_o__f_m-tmp-chattr-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chattr.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chattr_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chattr-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_attributes_with_errors", 15, "warning", "fa-tags", "theme_xhred_filemanager_successful_attributes", 3, "success", k)
            },
            error: function(a) {}
        })
    }
    if (k === "chcon") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="label" value="' + o[0] + '" class="_o__f_m-tmp-chcon-inputs">');
        $("#list_form").append('<input type="hidden" name="recursive" value="' + o[1] + '" class="_o__f_m-tmp-chcon-inputs">');
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/chcon.cgi?module=" + $g__m__name,
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    messenger_hide("chcon_info")
                }, 2000);
                __f____success(a, 1, 1, 1, "_o__f_m-tmp-chcon-inputs", "fa-exclamation-triangle", "theme_xhred_filemanager_successful_secontext_with_errors", 15, "warning", "fa-tags", "theme_xhred_filemanager_successful_secontext", 3, "success", k)
            },
            error: function(a) {}
        })
    }
    if (k === "compress") {
        __f__ld__sh();
        $("#list_form").append('<input type="hidden" name="arch" value="' + o[0] + '" class="_o__f_m-tmp-compress-inputs">');
        $("#list_form").append('<input type="hidden" name="method" value="' + o[1] + '" class="_o__f_m-tmp-compress-inputs">');
        __f__ld__bg();
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/compress.cgi?module=" + $g__m__name + __f___um(),
            data: __f___gd(),
            dataType: "text",
            success: function(a) {
                setTimeout(function() {
                    if (t__wi_p.t___p__xhr_r === 0) {
                        messenger_hide("compress_info")
                    }
                }, 2000);
                __f____success(a, 1, 0, 1, "_o__f_m-tmp-compress-inputs", "fa-exclamation-circle", "theme_xhred_filemanager_successful_compression_with_errors", 15, "warning", "fa-file-archive-o", "theme_xhred_filemanager_successful_compression", 8, "success", k, [k, n, o[0] + $('select option[value="' + o[1] + '"]').text()])
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
        menuSelected: function(f, k) {
            if (k.data("context-goto") == "1") {
                f.parents("tr").find('a.o__f_m-follow-file[href^="index.cgi?"]').trigger("click")
            }
            if (k.data("context-open-new-tab") == "1") {
                var e = $("#path").val(),
                    c = f.parents("tr").find("td a[data-filemin-link]").attr("data-filemin-link");
                __f___nt((encodeURIComponentSafe(decode_html(e)) + "/" + encodeURIComponentSafe(decode_html(c))), 1)
            }
            if (k.data("context-select-all") == "1") {
                $('button[onclick="selectAll()"]').trigger("click")
            }
            if (k.data("context-deselect-all") == "1") {
                __f___ds_a();
                __r____changed()
            }
            if (k.data("context-invert-selection") == "1") {
                $('button[onclick="invertSelection()"]').trigger("click")
            }
            if (k.data("context-refresh") == "1") {
                $("button > ." + $__f__rf_s + "").parent("button").trigger("click")
            }
            if (k.data("context-newfile") == "1") {
                $('a[onclick="createFileDialog()"]').trigger("click")
            }
            if (k.data("context-newfolder") == "1") {
                $('a[onclick="createFolderDialog()"]').trigger("click")
            }
            if (k.data("context-newarchive") == "1") {
                $('a[onclick="compressDialog()"]').trigger("click")
            }
            if (k.data("context-upload") == "1") {
                $('a[onclick="viewReadyForUpload()"]').trigger("click")
            }
            if (k.data("context-download") == "1") {
                $('a[onclick="downFromUrlDialog()"]').trigger("click")
            }
            if (k.data("context-clipboard") == "1") {
                var d = f.parents("tr").find("img").parent("a").parent("td").next("td").find("a"),
                    b = ($("#path").val()),
                    m = d.attr("data-filemin-link");
                $("body").append('<button class="hidden tmp-clipboard-obj" data-clipboard-text="' + escape_html(decodeURIComponentSafe(b) + "/" + decodeURIComponentSafe(m)) + '"></button>');
                var h = new Clipboard(".tmp-clipboard-obj");
                $(".tmp-clipboard-obj").trigger("click");
                $(".tmp-clipboard-obj").remove();
                h.destroy()
            }
            if (k.data("context-copy") == "1") {
                $(".o__f_m-button-copy a").trigger("click")
            }
            if (k.data("context-cut") == "1") {
                $(".o__f_m-button-cut a").trigger("click")
            }
            if (k.data("context-paste") == "1") {
                $(".o__f_m-button-paste a").trigger("click")
            }
            if (k.data("context-delete") == "1") {
                $(".o__f_m-button-delete").trigger("click")
            }
            if ($(k).is(".file-manager-remove-bookmark")) {
                $('.btn-group .at-o__f_m-favorites-dropdown a[href="' + $(k).parent("a").attr("href") + '"]').find(".file-manager-remove-bookmark").trigger("click");
                $(k).parent("a").remove();
                return
            }
            if (k.data("context-bookmarks") == "1") {
                $('a[href^="bookmark.cgi"]').trigger("click")
            }
            if (k.data("context-search") == "1") {
                $('a[onclick="searchDialog()"]').trigger("click")
            }
            if (k.data("context-edit") == "1") {
                f.parents("tr").addClass("m-active");
                f.parents("tr").find('a[href^="edit_file.cgi?"]').trigger("click")
            }
            if (k.data("context-rename") == "1") {
                f.parents("tr").find('a[onclick^="renameDialog("]').trigger("click")
            }
            if (k.data("context-download-file") == "1") {
                $(f.parents("tr").find('a[href^="download.cgi?"]'))[0].click()
            }
            if (k.data("context-extract") == "1") {
                f.parents("tr").find('a[href^="extract.cgi?"]').trigger("click")
            }
            if (k.data("context-calculate-selected-size") == "1") {
                __f__get_fs()
            }
            if (k.data("context-chmod") == "1") {
                $('a[onclick="chmodDialog()"]').trigger("click")
            }
            if (k.data("context-chown") == "1") {
                $('a[onclick="chownDialog()"]').trigger("click")
            }
            if (k.data("context-chattr") == "1") {
                $('a[onclick="chattrDialog()"]').trigger("click")
            }
            if (k.data("context-chcon") == "1") {
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
                                h.attr("data-content", '<code class="symlink-text-string text-nowrap">' + escape_html(H) + "</code>").attr("symlink-title", "1").data("trigger", "manual").data("html", true).data("placement", "auto right").data("container", "body").data("animation", false);
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
                $("tr.directory_go_up").trigger("mouseover")
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
        messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>' + lang("theme_xhred_filemanager_successful_extraction"), 5, "info", z + "_info")
    }
    if (z === "chmod") {
        messenger('<i class="fa fa-lg fa-fw fa-cogs"></i>' + lang("theme_xhred_filemanager_successful_permissions"), 5, "info", z + "_info")
    }
    if (z === "chown") {
        messenger('<i class="fa fa-lg fa-fw fa-users"></i>' + lang("theme_xhred_filemanager_successful_ownership"), 5, "info", z + "_info")
    }
    if (z === "compress") {
        messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>' + lang("theme_xhred_filemanager_successful_compression"), 5, "info", z + "_info")
    }
    if (z === "rename") {
        messenger('<i class="fa fa-lg fa-fw fa-i-cursor"></i>' + lang("theme_xhred_filemanager_successful_rename").replace("%from", escape_html($('#renameForm input[name="file"]').val())).replace("%to", escape_html($('#renameForm input[name="name"]').val())), 5, "info", z + "_info")
    }
    if (z === "create_folder") {
        messenger('<i class="fa fa-lg fa-fw fa-folder"></i>' + lang("theme_xhred_filemanager_successful_directory_creation").replace("%value", escape_html($('#createFolderForm input[name="name"]').val())), 5, "info", z + "_info")
    }
    if (z === "create_file") {
        messenger('<i class="fa fa-lg fa-fw fa-file"></i>' + lang("theme_xhred_filemanager_successful_file_creation").replace("%value", escape_html($('#createFileForm input[name="name"]').val())), 5, "info", z + "_info")
    }
}
$("body").on("click", ".symlink-text-string", function(b) {
    b.preventDefault();
    b.stopPropagation();
    var d = $(this);
    $("body").append('<button class="hidden tmp-clipboard-obj" data-clipboard-text="' + escape_html(d.text()) + '"></button>');
    var c = $(".tmp-clipboard-obj"),
        a = new Clipboard(".tmp-clipboard-obj");
    c.trigger("click").remove();
    a.destroy();
    messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_link_to_clipboard").replace("%value", escape_html(d.text())), 7, "info", "link_to_clipboard")
});

function f_m__bm__cm() {
    var b = $('#list_form > input[type="hidden"][name="path"]').val(),
        b = (typeof b != "undefined" ? (!b.length ? "/" : b) : false);
    var a = $(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path="]').filter(function() {
        return encodeURIComponentSafe($(this).text()) === b
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
    var a = $('#list_form > input[type="hidden"][name="path"]').val(),
        a = (typeof a != "undefined" ? (!a.length ? "/" : a) : false);
    $.each($(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path="]'), function() {
        if (encodeURIComponentSafe($(this).text()) == a) {
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
    var b = $('#list_form > input[type="hidden"][name="path"]').val(),
        b = (typeof b != "undefined" ? (!b.length ? encodeURIComponentSafe("/") : b) : "");
    var a = $(".btn-group > .at-o__f_m-favorites-dropdown").find('li a[href*="index.cgi?path="]').filter(function() {
        return encodeURIComponentSafe($(this).text()) === b
    });
    if (a.length) {
        a.parents(".at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star-o" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_bookmark"));
        a.parent("li").remove()
    } else {
        $(".btn-group > .at-o__f_m-favorites-dropdown").find('a[href^="bookmark.cgi?path="]').html('<i class="fa fa-fw fa-star" aria-hidden="true">&nbsp;&nbsp;</i>' + lang("theme_xhred_filemanager_unbookmark"));
        $("body").find("ul.dropdown-menu.at-o__f_m-favorites-dropdown").append('<li><a href="index.cgi?path=' + encodeURIComponentSafe(b) + '" style="padding-left: 12px;"><i class="fa fa-fw fa-minus-circle pull-right file-manager-remove-bookmark"></i>' + escape_html(decodeURIComponentSafe(b)) + "</a></li>")
    }
    f_m__bm__cm();
    return a
}

function __f___upd___cr(d, c) {
    var b = $("body"),
        a = "";
    b.find(".breadcrumb").empty();
    if (access_level() == 0 || access_level() == 1) {
        b.find(".breadcrumb").append('<li class="fm___root__"><a href="index.cgi?path="><i class="fa fa-hdd-o"></i></a></li>')
    } else {
        b.find(".breadcrumb").append('<li class="fm___root__"><a href="index.cgi?path="><i class="fa fa-user text-light"></i></a></li>')
    }
    $.each($(d), function(e, f) {
        a = a + (f != "" ? "/" + f : "");
        if (f != "") {
            var h = '<i data-path="' + encodeURIComponentSafe(a.replace(f, "")) + '" class="fa fa-fw fa-lg fa-caret-right margined-left-4"></i>';
            (access_level() == 3 && a.indexOf($g__user__home + "/") === -1 ? h = "" : false);
            b.find(".breadcrumb").append('<li><a href="index.cgi?path=' + encodeURIComponentSafe(a) + '">' + escape_html(f) + h + "</a></li>")
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
        $('li a[href="#tab-' + a + '"] span[data-tab-path]').text(b).attr("data-original-title", (c ? escape_html(c) : "/"));
        $("#file-manager-new-instance").removeClass("disabled").find("span.cspinner").parent("span").replaceWith('<i class="fa fa-plus"></i>')
    } else {
        $("li.active a span[data-tab-path]").text(b).attr("data-original-title", (c ? escape_html(c) : "/"))
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
    var e = (decode_html(decodeURIComponentSafe(n)).replace("//", "/").replace("index.cgi?path=", "")),
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
    t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=/");
    $.each($('.modal .modal-body form input[name="path"]'), function() {
        $(this).val(e)
    });
    $('ul li a[href^="bookmark.cgi?path="]').attr("href", "bookmark.cgi?path=" + escape_html(e));
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
    var a = encodeURIComponentSafe(decode_html(d)),
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
    __f____r("get", "index.cgi?path=" + a, false, 0, [tab___to______create, e, b]);
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
    var a = decode_html(URI.parseQuery(URI(o).query())["path"].replace("//", "/"));
    typeof n == "undefined" ? n = false : false;
    if (h === "get") {
        if ($("body").find("#list_form table tbody").hasClass("o__f_m-updating") && m) {
            return
        }
        __f_____lo(true, true);
        (!$("div.popover.popover-path-data.in:visible").length && !n) && $('.active a[href="' + escape_html(o) + '"] img').before('<span class="cspinner" style="margin-top: 4px; margin-left: -25px;"><span class="cspinner-icon small"></span></span>');
        a = encodeURIComponent(a);
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/list.cgi?path=" + a + "&module=" + $g__m__name,
            data: false,
            dataType: "html",
            success: function(b) {
                messenger_hide("refreshDir_info");
                j = $.parseHTML(b);
                if (!$(j[1]).find("table").length) {
                    if ($(j[10]).is("h3") && access_level() == 3) {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>' + $(j[10]).text().replace(" :", ":").replace(" ,", ","), 15, "error", "getPath_error")
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>' + b, 15, "error", "getPath_error")
                    }
                    __f_____ul();
                    $(".active table .cspinner").remove();
                    if (n) {
                        $('a[href="#tab-' + n + '"]').parent("li").remove();
                        $('.tab-content .tab-pane[id="tab-' + n + '"]').remove()
                    }
                    return
                } else {
                    $('[data-toggle="popover-path"]').popover("hide")
                }
                var d = encodeURIComponentSafe(decode_html(decodeURIComponentSafe(o)).replace("//", "/").replace("index.cgi?path=", ""));
                !n && $('#list_form > input[type="hidden"][name="path"]').val(d);
                m && $("div.total").append(__f___tl_v());
                var c = $(j[0]).append(__f___tl_v()).html();
                m && $(".total").html(c);
                if (n) {
                    $('.tab-pane[id="tab-' + n + '"]').data("totalValue", c)
                } else {
                    $(".tab-pane.active form table").data("totalValue", c)
                }
                __f___u("upd", $(j[1]).find("table").find(".ui_checked_columns"), e, false, [n, m, decodeURIComponentSafe(a), c, f], $(h[0]).text());
                $("#__f__c__m").css("display", "none");
                setTimeout(function() {
                    __f___us_a();
                    typeof sortable == "function" && sortable($(".tabs-top > ul.nav"))
                }, 10)
            },
            error: function(b) {}
        })
    }
}

function __f___us_a() {
    if (access_level() != 0 || config_portable_module_filemanager_switch_user != true) {
        return
    }
    var a = $("#path").val();
    if (a.indexOf($g__v__home_base) > -1 && a != $g__v__home_base) {
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/fetcher.cgi?module=" + $g__m__name + "&list_users=1",
            data: false,
            dataType: "JSON",
            success: function(b) {
                $.each(array_flip(b), function(e, d) {
                    var c = encodeURIComponentSafe(e.split(":")[2]);
                    if (a == c || a.startsWith(c + "%2F")) {
                        localStorage.setItem($hostname + "-settings_thirdparty_filemanager_usermode", d)
                    }
                    __f___us_tl()
                })
            },
            error: function(b) {}
        })
    } else {
        __f___us_m_def();
        __f___us_tl()
    }
}

function __f___us_m_def() {
    localStorage.setItem($hostname + "-settings_thirdparty_filemanager_usermode", "")
}

function __f___us_tl() {
    var c = localStorage.getItem($hostname + "-settings_thirdparty_filemanager_usermode"),
        b = (lang("theme_xhred_filemanager_user_switch") + "<br><hr class='hr-dashed hr-no-margin hr-darker'>" + lang("theme_xhred_filemanager_user_switch_current_user") + ": <em>" + (c ? c : $g__user__)) + "</em>",
        a = "#file-manager-switch-user";
    $(a).attr("data-original-title", b);
    if (!!c) {
        $(a).addClass("btn-warning")
    } else {
        $(a).removeClass("btn-warning")
    }
}

function __f___tl_v() {
    var a = (lang("theme_xhred_filemanager_selected_entries").replace("%value", "<span>0</span>"));
    return '. <span class="total_selected">' + a + '</span> <span class="label label-warning total_size hidden"><span class="total_size_data"></span></span>'
}

function ___f__tw() {
    if ($("body").attr("class") && $("body").attr("class").indexOf($g__o__f_m) > -1) {
        $__f__rf_s = "fa-refresh";

        function a() {
            var f = 0,
                h = 'html head link[href*="css';
            if (t__wi_p.$load____ext === "src") {
                f = $("" + h + '/jquery.datatables."]:first')
            } else {
                f = $("" + h + '/bundle."]:first')
            }
            if (!$("" + h + '/jquery.jspanel."]').length) {
                f.before('<link href="' + $_____link_full + "/unauthenticated/css/jquery.jspanel." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
            }
        }

        function d() {
            if (typeof jsPanel != "object") {
                a();
                $.getScript("" + $_____link_full + "/unauthenticated/js/jquery.jspanel." + t__wi_p.$load____ext + ".js", function(f, k, h) {
                    t__wi_p.$___ajax_requested_url = "_blank"
                })
            }
        }
        d();
        !$g__v__nav && $(".container-fluid").removeClass("col-lg-10 col-lg-offset-1").addClass("margined-top-15").parents("html").addClass("single_tab");
        if ($__source_file == "config.cgi") {
            $('input[name="per_page"], input[name="disable_pagination"], input[name="menu_style"], textarea[name="bookmarks"]').parents("td.col_value").parent("tr").addClass("hidden");
            $("#columns_size").parent(".awobject").remove();
            $('form[action="save_config.cgi"]').append('<input type="hidden" name="columns" value="size">');
            $(".table-subtable .sub_table_container.table-hardcoded").find("tbody").append('				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hide_toolbar") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hide_toolbar" id="config_portable_module_filemanager_hide_toolbar_1" value="true"' + (config_portable_module_filemanager_hide_toolbar ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_toolbar_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hide_toolbar" id="config_portable_module_filemanager_hide_toolbar_0" value="false"' + (config_portable_module_filemanager_hide_toolbar ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_toolbar_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hovered_toolbar") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hovered_toolbar" id="config_portable_module_filemanager_hovered_toolbar_1" value="true"' + (config_portable_module_filemanager_hovered_toolbar ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hovered_toolbar_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hovered_toolbar" id="config_portable_module_filemanager_hovered_toolbar_0" value="false"' + (config_portable_module_filemanager_hovered_toolbar ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hovered_toolbar_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_hide_actions") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_hide_actions" id="config_portable_module_filemanager_hide_actions_1" value="true"' + (config_portable_module_filemanager_hide_actions ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_actions_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_hide_actions" id="config_portable_module_filemanager_hide_actions_0" value="false"' + (config_portable_module_filemanager_hide_actions ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_hide_actions_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_settings_tabs_remember_state") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_remember_tabs" id="config_portable_module_filemanager_remember_tabs_1" value="true"' + (config_portable_module_filemanager_remember_tabs ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_remember_tabs_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_remember_tabs" id="config_portable_module_filemanager_remember_tabs_0" value="false"' + (config_portable_module_filemanager_remember_tabs ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_remember_tabs_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_context_calculate_size") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_calculate_size" id="config_portable_module_filemanager_calculate_size_1" value="true"' + (config_portable_module_filemanager_calculate_size ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_calculate_size_1">' + lang("theme_xhred_global_yes") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_calculate_size" id="config_portable_module_filemanager_calculate_size_0" value="false"' + (config_portable_module_filemanager_calculate_size ? "" : " checked") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_calculate_size_0">' + lang("theme_xhred_global_no") + "</label>					</span>				</span></td>				</tr>        <tr" + (access_level() != 0 ? ' class="hidden"' : "") + '>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_user_switch_option") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">          <input class="iawobject" name="config_portable_module_filemanager_switch_user" id="config_portable_module_filemanager_switch_user_1" value="true"' + (config_portable_module_filemanager_switch_user ? " checked" : "") + ' type="radio">          <label class="lawobject" for="config_portable_module_filemanager_switch_user_1">' + lang("theme_xhred_global_yes") + '</label>          <input class="iawobject" name="config_portable_module_filemanager_switch_user" id="config_portable_module_filemanager_switch_user_0" value="false"' + (config_portable_module_filemanager_switch_user ? "" : " checked") + ' type="radio">          <label class="lawobject" for="config_portable_module_filemanager_switch_user_0">' + lang("theme_xhred_global_no") + '</label>					</span>				</span></td>				</tr>				<tr>					<td class="col_label"><b>' + lang("theme_xhred_filemanager_settings_notification_type") + '</b></td>					<td class="col_value"><span>					<span class="awradio awobject">						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_1" value="1"' + (config_portable_module_filemanager_notification_type == "1" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_1">' + lang("theme_xhred_global_all") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_4" value="4"' + (config_portable_module_filemanager_notification_type == "4" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_4">' + lang("theme_xhred_filemanager_settings_notification_type_inf_warn_err") + '</label>						<input class="iawobject" name="config_portable_module_filemanager_notification_type" id="config_portable_module_filemanager_notification_type_2" value="2"' + (config_portable_module_filemanager_notification_type == "2" ? " checked" : "") + ' type="radio">						<label class="lawobject" for="config_portable_module_filemanager_notification_type_2">' + lang("theme_xhred_filemanager_settings_notification_type_warn_err") + "</label>					</span>				</span></td>				</tr>			");

            function e(f) {
                typeof f == "undefined" ? f = $('input[name="config_portable_module_filemanager_hide_toolbar"]:checked') : false;
                var h = ["config_portable_module_filemanager_hovered_toolbar"];
                if (f.val() == "true") {
                    $.each(h, function(k, n) {
                        $('input[name="' + n + '"], select[name="' + n + '"]').prop("disabled", true);
                        $('input[name="' + n + '"], select[name="' + n + '"]').parent(".aradio").addClass("disabled")
                    })
                } else {
                    $.each(h, function(k, n) {
                        $('input[name="' + n + '"], select[name="' + n + '"]').prop("disabled", false);
                        $('input[name="' + n + '"], select[name="' + n + '"]').parent(".aradio").removeClass("disabled")
                    })
                }
            }
            e();
            $('input[name="config_portable_module_filemanager_hide_toolbar"]').on("change", function() {
                e($(this))
            });
            $('input[name="config_portable_module_filemanager_hide_toolbar"], input[name="config_portable_module_filemanager_hovered_toolbar"], input[name="config_portable_module_filemanager_hide_actions"], input[name="config_portable_module_filemanager_notification_type"], input[name="config_portable_module_filemanager_remember_tabs"], input[name="config_portable_module_filemanager_switch_user"], input[name="config_portable_module_filemanager_calculate_size"]').on("change", function() {
                var h = $(this).attr("name"),
                    f = $(this).val();
                if (h == "config_portable_module_filemanager_switch_user") {
                    __f___us_m_def()
                }
                localStorage.setItem($hostname + "-" + h, f);
                window[h] = f;
                t__wi_p.manageConfig("save")
            })
        } else {
            $(".panel-body").append('			<div>                <div class="tabs-top">                    <ul class="nav nav-tabs">                        <li class="active ui-sortable-handle"><a href="#tab-1" data-toggle="tab"><i class="fa fa-fw fa-close-box pull-right invisible"></i><span data-tab-path data-toggle="tooltip" data-placement="auto top" data-title="/">/</span></a></li>                    </ul>                    <div class="tab-content">                        <div class="tab-pane fade in active" id="tab-1">                        </div>                    </div>                </div>            </div>        ');
            $("#list_form").detach().appendTo("#tab-1");
            typeof sortable == "function" && sortable($(".tabs-top > ul.nav"), {});
            if (config_portable_module_filemanager_remember_tabs && __f___ld__tb_stored_chk()) {
                __f___ld__tb_stored()
            }
            $.ajax({
                type: "POST",
                url: $g__e__path + "/file-manager/fetcher.cgi?module=" + $g__m__name + "&home_base=1",
                data: false,
                dataType: "JSON",
                success: function(f) {
                    $g__v__home_base = jQuery.isEmptyObject(f) ? $g__user__home : encodeURIComponentSafe(f.home_base)
                },
                error: function(f) {}
            });
            if (access_level() == 0 && config_portable_module_filemanager_switch_user == false) {
                $("#headln2r .btn-group").prepend('<a href="#" id="file-manager-switch-user" data-toggle="tooltip" data-html="true" class="btn btn-link ' + (__f___um() ? "btn-warning " : "") + 'text-lighter pull-left"><i class="fa fa-user-switch"></i></a>');
                __f___us_tl();
                $("body").attr("data-user-switch", 1)
            }
            $("#headln2r .btn-group").prepend('<a href="#" id="file-manager-new-instance" data-toggle="tooltip" data-title="' + lang("theme_xhred_filemanager_new_tab") + '" class="btn btn-link text-lighter pull-left"><i class="fa fa-plus"></i></a>')
        }
        $("body").on("mouseleave", ".popover:not(.file-manager-help)", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $(this).popover("hide")
        });
        $("div.total").append(__f___tl_v());
        $(".tab-pane.active").data("totalValue", $("div.total").html());
        $("body").append('<ul id="__f__c__m" class="dropdown-menu" role="menu" style="display:none">		            <li class="context-o__f_m-dependent-goto hidden"><a tabindex="-1" href="#" data-context-goto="1"><i class="fa fa-fw fa-folder-open-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_goto") + '</a></li>		            <li class="divider context-o__f_m-dependent-goto"></li>		            <li class="context-o__f_m-dependent-open-new-tab hidden"><a tabindex="-1" href="#" data-context-open-new-tab="1"><i class="fa fa-fw fa-tab"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_open_new_tab") + '</a></li>		            <li class="divider context-o__f_m-dependent-open-new-tab hidden"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#" data-context-select-all="1"><i class="fa fa-fw fa-check-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_select_all") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-deselect-all="1"><i class="fa fa-fw fa-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_deselect_all") + '</a></li>		            	</ul>		            </li>		            <li><a tabindex="-1" href="#" data-context-invert-selection="1"><i class="fa fa-fw fa-share-square-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_select_invert") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-refresh="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_refresh") + '</a></li>		            <li class="divider"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_new") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-newfile="1"><i class="fa fa-fw fa-file-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfile") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-newfolder="1"><i class="fa fa-fw fa-folder-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newfoder") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-newarchive="1"><i class="fa fa-fw fa-file-archive-o"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_newarchive") + '</a></li>		            		<li class="dropdown-submenu" role="menu">				            	<a tabindex="-1" href="#"><i class="fa fa-fw fa-exchange"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_transfer") + '</a>				            	<ul class="dropdown-menu" role="menu">				            		<li><a tabindex="-1" href="#" data-context-upload="1"><i class="fa fa-fw fa-upload"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_upload") + '</a></li>				            		<li><a tabindex="-1" href="#" data-context-download="1"><i class="fa fa-fw fa-download"></i>&nbsp;&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download") + '</a></li>				            	</ul>				            </li>		            	</ul>		            </li>		            <li class="divider"></li>		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#" data-context-copy="1"><i class="fa fa-fw fa-files-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_copy") + '</a>		            	<ul class="dropdown-menu" role="menu">		            		<li><a tabindex="-1" href="#" data-context-clipboard="1"><i class="fa fa-fw fa-clone"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_clipboard") + '</a></li>		            	</ul>		            </li>		            <li><a tabindex="-1" href="#" data-context-cut="1"><i class="fa fa-fw fa-scissors"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_cut") + '</a></li>		            <li><a tabindex="-1" href="#" data-context-paste="1"><i class="fa fa-fw fa-clipboard"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_paste") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-delete="1"><i class="fa fa-fw fa-trash"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_delete") + '</a></li>		            <li class="divider"></li>		            <li class="context-o__f_m-dependent-edit"><a tabindex="-1" href="#" data-context-edit="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_edit") + '</a></li>		            <li><a tabindex="-1" href="#" data-context-rename="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_rename") + '</a></li>		            <li class="context-o__f_m-dependent-download"><a tabindex="-1" href="#" data-context-download-file="1">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_download_file") + '</a></li>		            <li class="divider"></li>		            <li><a tabindex="-1" href="#" data-context-search="1"><i class="fa fa-fw fa-search"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_search") + '</a></li>		            <li class="divider"></li>		            		            <li class="dropdown-submenu" role="menu">		            	<a tabindex="-1" href="#"><i class="fa fa-fw fa-star-o"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_bookmarks") + '</a>		            	<ul class="dropdown-menu at-o__f_m-favorites-dropdown dropdown-submenu-bookmarks" role="menu">		            		<li class="data-context-bookmarks"><a tabindex="-1" href="#" data-context-bookmarks="1">' + lang("theme_xhred_filemanager_bookmark") + '</a></li>		            		<li class="divider"></li>		            	</ul>		            </li>		            		            <li class="divider context-o__f_m-dependent-extract"></li>		            <li class="context-o__f_m-dependent-extract"><a tabindex="-1" href="#" data-context-extract="1"><i class="fa fa-fw fa-extract-archive"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_extract") + '</a></li>		            <li class="divider"></li>		            <li class="dropdown-submenu context-properties" role="menu">		            	<a tabindex="-1" href="#">&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_properties") + '</a>		            	<ul class="dropdown-menu dropdown-submenu-properties" role="menu">		            		<li><a tabindex="-1" href="#" data-context-calculate-selected-size="1"><i class="fa fa-fw fa-calculator"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_calculate_selected_size") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chmod="1"><i class="fa fa-fw fa-cogs"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chmod") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chown="1"><i class="fa fa-fw fa-users"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chown") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chattr="1"><i class="fa fa-fw fa-tags"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chattr") + '</a></li>		            		<li><a tabindex="-1" href="#" data-context-chcon="1"><i class="fa fa-fw fa-shield"></i>&nbsp;&nbsp;' + lang("theme_xhred_filemanager_context_chcon") + "</a></li>		            	</ul>		            </li>		        </ul>");
        $("body").on("click", "#__f__c__m li i.fa", function(f) {
            $(this).parents("a").trigger("click")
        });
        $("body").on("hidden.bs.modal", function() {
            $(".modal-backdrop").remove()
        });
        $("body").on("submit", 'form[action="save_config.cgi"]', function() {
            localStorage.setItem($hostname + "-_________per_page", parseInt($('input[name="per_page"]').val()))
        });
        $("body").on("click", function(f) {
            $(".tooltip").each(function() {
                if (!$(this).is(f.target) && $(this).has(f.target).length === 0 && $(".tooltip").has(f.target).length === 0) {
                    $(this).tooltip("hide")
                }
            })
        });
        $("body").on("click", ".breadcrumb .fa-caret-right", function(k) {
            k.preventDefault();
            k.stopPropagation();
            var f = $(".breadcrumb span[data-tree]"),
                o = $(".breadcrumb .fa-caret-down"),
                n = $(this),
                h = n.attr("data-path"),
                m = (h ? h : "/"),
                p = n.parent("a").attr("href");
            $dirCurrent = n.parent("a").text();
            f.remove();
            o.addClass("fa-caret-right").removeClass("fa-caret-down");
            if (n.parent("a").next("span[data-tree]").length) {
                return
            }
            n.addClass("invisible").after('<span class="cspinner"><span class="cspinner-icon smallest"></span></span>');
            $(this).removeClass("fa-caret-right").addClass("fa-caret-down");
            n.parent("a").after('<span class="hidden" data-tree=""></div>');
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi/?xhr-get_list=1&xhr-get_list_path=" + m,
                data: false,
                dataType: "JSON",
                success: function(q) {
                    $.each($(q), function(s, r) {
                        n.parent("a").next("span[data-tree]").append('<a href="index.cgi?path=' + (encodeURIComponentSafe(escape_html(m) + "/" + encodeURIComponentSafe(escape_html(r)))) + '"><i class="fa fa-fw ' + ($dirCurrent == r ? "fa-folder-open-o" : "fa-folder-o") + '">&nbsp;&nbsp;</i>' + ($dirCurrent == r ? " <strong>" + escape_html(r) + "</strong>" : " " + escape_html(r)) + "</a>")
                    }).promise().done(function() {
                        n.removeClass("invisible").next(".cspinner").remove();
                        n.parent("a").removeClass("text-black");
                        n.parent("a").next("span[data-tree]").removeClass("hidden");
                        var s = n.parent("a").next("span[data-tree]"),
                            r = $("span[data-tree] i.fa-folder-open-o").parent("a");
                        if (typeof r.offset() != "undefined" && typeof s.offset() != "undefined") {
                            s.animate({
                                scrollTop: r.offset().top - s.offset().top + s.scrollTop()
                            }, 0)
                        }
                    })
                },
                error: function(q) {}
            })
        }).on("mouseenter", ".breadcrumb .fa-caret-right", function(f) {
            $(this).parent("a").addClass("text-black")
        }).on("mouseleave", ".breadcrumb .fa-caret-right", function(f) {
            $(this).parent("a").removeClass("text-black")
        });
        $("body").on("click", function(h) {
            var f = $(".breadcrumb a + span[data-tree]"),
                k = $(".breadcrumb .fa-caret-down");
            if (f.length) {
                f.remove();
                k.addClass("fa-caret-right").removeClass("fa-caret-down")
            }
        });
        $.each($(".modal .modal-content .modal-footer"), function(h, f) {
            $(this).wrapInner('<div class="btn-group"></div>')
        });
        $(".btn-group.pull-right").find(".fa-check-square").removeClass("fa-check-square").addClass("fa-share-square-o");
        if ($___relative_url.indexOf("index.cgi") === -1) {
            t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=");
            $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').addClass("hidden");
            f__dt()
        }
        $("#headln2l .help_popup").css("padding", "6px 12px");
        $("#headln2l .btn-group > a.btn:first-child > i").attr("data-title", lang("theme_xhred_global_dir_up")).attr("data-toggle", "tooltip");
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
        $("body").on("click", ".file-manager-remove-bookmark", function(h) {
            h.preventDefault();
            h.stopPropagation();
            var f = URI.parseQuery(URI($(this).parent("a").attr("href")).query())["path"];
            $(this).parent("a").parent("li").remove();
            $.ajax({
                type: "POST",
                url: $g__e__path + "/file-manager/bookmark.cgi?path=" + encodeURIComponentSafe(f) + "&module=" + $g__m__name,
                data: false,
                dataType: "text",
                success: function(k) {
                    f_m__bm__c();
                    messenger('<i class="fa fa-lg fa-fw fa-star-o"></i>' + lang("theme_xhred_filemanager_unbookmark_success").replace("%value", (f ? escape_html(f) : "/")), 5, "warning", "bookmarkAddRemove")
                },
                error: function(k) {}
            })
        });
        $("body").on("mousemove", function(f) {
            $(this).data("mousePageX", f.pageX).data("mousePageY", f.pageY)
        });
        $("body").on(((window.navigator.platform === "MacIntel" && !___is_Safari) ? "mouseup" : "click"), ".___f_m__q__:visible .ui_checked_columns", function(f) {
            if (f.ctrlKey) {
                if ($(f.target).is('input[name="name"].iawobject')) {
                    return
                }
                f.preventDefault();
                f.stopPropagation();
                f.stopImmediatePropagation();
                $(this).find("td:first-child").trigger("contextmenu")
            }
        });
        if (access_level() !== 0 && access_level() !== 1) {
            $("body").find(".breadcrumb li:first-child a").html('<i class="fa fa-fw fa-user text-light">&nbsp;</i>')
        }
        $("body").find(".breadcrumb li:first-child").addClass("fm___root__");
        __f___u(false, false, 0, 0);
        $('button[onclick="selectAll()"], button[onclick="invertSelection()"]').click(function() {
            setTimeout(function() {
                __r____changed()
            }, 0)
        });
        $("body").on("click", '#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]', function(f) {
            f.preventDefault();
            f.stopPropagation();
            var h = "";
            if ($(".breadcrumb li:first-child a i").hasClass("fa-search")) {
                h = "index.cgi?path=" + encodeURIComponentSafe($('#list_form > input[type="hidden"][name="path"]').val())
            } else {
                h = $(".breadcrumb > li:eq(-2) > a").attr("href")
            }
            if (!h) {
                h = "index.cgi?path="
            }
            __f____r("get", h, false, 0);
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>')
        });
        $("body").on("click", ".breadcrumb li > a:not(.fa-keyboard-o), .breadcrumb li > a + span[data-tree] > a, .dropdown-menu.at-o__f_m-favorites-dropdown > li:not(.data-context-bookmarks) > a:not(.no_effect), .active table label > a.o__f_m-follow-file", function(f) {
            f.preventDefault();
            f.stopPropagation();
            var k = "index.cgi?path=",
                h = 0;
            if ($(this).attr("href") && $(this).attr("href").indexOf(("/" + $g__o__f_m)) === -1) {
                k = $(this).attr("href")
            }
            if (k === "index.cgi?path=/") {
                k = "index.cgi?path="
            }
            if (k && k.indexOf("bookmark.cgi?") > -1) {
                h = 1;
                return
            }
            __f____r("get", k, false, h);
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>')
        });
        $("body").on("click", 'li.o__f_m-button-copy:not(".disabled") a', function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-clone"></i>' + lang("theme_xhred_filemanager_copying_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "info", "copy_info");
            __f____a("copy", false)
        });
        $("body").on("click", 'li.o__f_m-button-cut:not(".disabled") a', function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-scissors"></i>' + lang("theme_xhred_filemanager_cutting_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "warning", "cut_warning");
            __f____a("cut", false)
        });
        $("body").on("click", 'li.o__f_m-button-paste:not(".disabled") a', function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_pasting_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "paste_info");
            __f____a("paste", false)
        });
        $("body").on("click", 'a[href^="extract.cgi"]', function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>' + lang("theme_xhred_filemanager_unpacking_archive") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "extract_info");
            __f____a("extract", $(this).attr("href"))
        });
        $("body").find('#removeDialog button[type="button"][onclick="removeSelected()"]').removeAttr("onclick").addClass("_at_filemanager_delete_submit");
        $("body").on("click", "#removeDialog button._at_filemanager_delete_submit", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-trash-o"></i>' + lang("theme_xhred_filemanager_deleting_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "delete_info");
            __f____a("delete", false);
            modal_dismiss()
        });
        $("#removeDialog").on("show.bs.modal", function() {
            var f = $(this).find("#items-to-remove");
            f.empty();
            $.each(_f__gr("checked"), function() {
                f.append(escape_html($(this).val()) + "<br>")
            })
        });
        $("body").find('#renameDialog button[type="button"][onclick="renameSelected()"]').removeAttr("onclick").addClass("_at_filemanager_rename_submit");
        $("body").on("click", "#renameDialog button._at_filemanager_rename_submit", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-i-cursor"></i>' + lang("theme_xhred_filemanager_renaming_selected") + " " + lang("theme_xhred_global_please_wait"), 10, "info", "rename_info");
            __f____a("rename", false)
        });
        $("body").on("submit", "#renameDialog", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#renameDialog button._at_filemanager_rename_submit").trigger("click")
        });
        $("#renameDialog").on("shown.bs.modal", function() {
            var f = $(this).find('input[type="text"]');
            f.focus();
            f.select()
        });
        $("#renameDialog").on("show.bs.modal", function() {
            var f = $(this).find('input[type="text"]'),
                h = $(this).find("button._at_filemanager_rename_submit")
        });
        $('#renameDialog input[type="text"]').on("keyup change click input", function(h) {
            var f = $("#renameDialog").find("button._at_filemanager_rename_submit");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("body").find('#createFolderDialog button[type="button"][onclick="createFolder()"]').removeAttr("onclick").addClass("_at_filemanager_create_folder_submit");
        $("body").on("click", "#createFolderDialog button._at_filemanager_create_folder_submit", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-folder"></i>' + lang("theme_xhred_filemanager_creating_directory") + " `<strong>" + escape_html($('#createFolderForm input[name="name"]').val()) + "</strong>`. " + lang("theme_xhred_global_please_wait") + "", 10, "info", "create_folder_info");
            __f____a("create_folder", false)
        });
        $("body").on("submit", "#createFolderForm", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#createFolderDialog button._at_filemanager_create_folder_submit").trigger("click")
        });
        $("#createFolderDialog").on("shown.bs.modal", function() {
            var f = $(this).find('input[type="text"]');
            f.focus()
        });
        $("#createFolderDialog").on("show.bs.modal", function() {
            var f = $(this).find('input[type="text"]'),
                h = $(this).find("button._at_filemanager_create_folder_submit");
            f.val("");
            !f.val() && h.prop("disabled", true)
        });
        $('#createFolderDialog input[type="text"]').on("keyup change click input", function(h) {
            var f = $("#createFolderDialog").find("button._at_filemanager_create_folder_submit");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("body").find('#createFileDialog button[type="button"][onclick="createFile()"]').removeAttr("onclick").addClass("_at_filemanager_create_file_submit");
        $("body").on("click", "#createFileDialog button._at_filemanager_create_file_submit", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file"></i>' + lang("theme_xhred_filemanager_creating_file") + " `<strong>" + $('#createFileForm input[name="name"]').val() + "</strong>`. " + lang("theme_xhred_global_please_wait"), 10, "info", "create_file_info");
            __f____a("create_file", false)
        });
        $("body").on("submit", "#createFileForm", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#createFileDialog button._at_filemanager_create_file_submit").trigger("click")
        });
        $("#createFileDialog").on("shown.bs.modal", function() {
            var f = $(this).find('input[type="text"]');
            f.focus()
        });
        $("#createFileDialog").on("show.bs.modal", function() {
            var f = $(this).find('input[type="text"]'),
                h = $(this).find("button._at_filemanager_create_file_submit");
            f.val("");
            !f.val() && h.prop("disabled", true)
        });
        $('#createFileDialog input[type="text"]').on("keyup change click input", function(h) {
            var f = $("#createFileDialog").find("button._at_filemanager_create_file_submit");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("body").find('#downFromUrlDialog button[type="button"][onclick="downFromUrl()"]').removeAttr("onclick").addClass("o__f_m-submitter-url_download");
        $("body").on("click", "#downFromUrlDialog button.o__f_m-submitter-url_download", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-download"></i>' + lang("theme_xhred_filemanager_downloading_from") + " <strong>" + URI($('#downFromUrlForm input[name="link"]').val()).hostname() + "</strong>. " + lang("theme_xhred_global_please_wait"), 1000000, "info", "url_download_info");
            __f____a("url_download", false)
        });
        $("body").on("submit", "#downFromUrlForm", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#downFromUrlDialog button.o__f_m-submitter-url_download").trigger("click")
        });
        $("#downFromUrlDialog").on("shown.bs.modal", function() {
            var f = $(this).find('input[name="link"]');
            f.focus()
        });
        $("#downFromUrlDialog").on("show.bs.modal", function() {
            var f = $(this).find('input[name="link"]'),
                h = $(this).find("button.o__f_m-submitter-url_download");
            !f.val() && h.prop("disabled", true)
        });
        $('#downFromUrlDialog input[name="link"]').on("keyup change click input", function(h) {
            var f = $("#downFromUrlDialog").find("button.o__f_m-submitter-url_download");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("#readyForUploadDialog").on("show.bs.modal", function() {
            var f = URI.parseQuery(URI($("#upload-form").attr("action")).query())["id"];
            $("#upload-form").attr("action", "upload.cgi?path=" + encodeURIComponentSafe($("#upload-form").find('input[name="path"]').val()) + "&id=" + f + "")
        });
        $("body").find('#searchDialog button[type="button"][onclick="search()"]').removeAttr("onclick").addClass("_at_filemanager_search_submit");
        $("body").on("click", "#searchDialog button._at_filemanager_search_submit", function(f) {
            f.preventDefault();
            f.stopPropagation();
            __f____a("search", false)
        });
        $("body").on("submit", "#searchForm", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#searchDialog button._at_filemanager_search_submit").trigger("click")
        });
        $("#searchDialog").on("shown.bs.modal", function() {
            var f = $(this).find('input[name="query"]');
            f.focus()
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
            var f = $(this).find('input[type="text"]'),
                h = $(this).find("button._at_filemanager_search_submit");
            !f.val() && h.prop("disabled", true)
        });
        $("body").on("click", ".__o__f_m-search-results-data", function(f) {
            var f = $("#path").val();
            __f____r("get", "index.cgi?path=" + (f ? encodeURIComponentSafe(f) : ""), false, 0)
        });
        $('#searchDialog input[type="text"]').on("keyup change click input", function(h) {
            var f = $("#searchDialog").find("button._at_filemanager_search_submit");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("body").on("click", 'a[href^="bookmark.cgi"]', function(f) {
            f.preventDefault();
            f.stopPropagation();
            var h = $(this).attr("href");
            if (h === "bookmark.cgi?path=") {
                h = h + "/"
            }
            __f____a("bookmark", h)
        });
        $('body #chmodDialog button[onclick="chmodSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chmod");
        $("body").on("click", "#chmodDialog button.o__f_m-submitter-chmod", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-user"></i>' + lang("theme_xhred_filemanager_setting_permissions").replace("%value", escape_html($("#perms").val())) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chmod_info");
            __f____a("chmod", [$("#perms").val(), $('#chmodForm select[name="applyto"] option:selected').val()])
        });
        $("#chmodDialog").on("shown.bs.modal", function() {
            $('#chmodDialog input[id="perms"]').focus().select()
        });
        $('body #chownDialog button[onclick="chownSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chown");
        $("body").on("click", "#chownDialog button.o__f_m-submitter-chown", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-users"></i>' + lang("theme_xhred_filemanager_changing_ownership").replace("%value", escape_html($('#chownForm input[name="owner"]').val()) + ":" + $('#chownForm input[name="group"]').val()) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chown_info");
            __f____a("chown", [$('#chownForm input[name="owner"]').val(), $('#chownForm input[name="group"]').val(), $('#chownForm input[name="recursive"]').prop("checked")])
        });
        $("#chownDialog").on("shown.bs.modal", function() {
            $('#chownDialog input[name="owner"]').focus()
        });
        $("#chownDialog").on("show.bs.modal", function() {
            var f = $(this).find("button.o__f_m-submitter-chown");
            f.prop("disabled", true)
        });
        $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup change click input", function(h) {
            var f = $("#chownDialog").find("button.o__f_m-submitter-chown");
            if ($('#chownDialog input[name="owner"]').val() && $('#chownDialog input[name="group"]').val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup", function(f) {
            f.preventDefault();
            var h = f.which;
            if (h == 13) {
                $("#chownDialog button.o__f_m-submitter-chown").trigger("click")
            }
        });
        $("#chownDialog").on("show.bs.modal", function() {
            $('#chownDialog input[name="owner"], #chownDialog input[name="group"]').val("");
            $('#chownDialog input[name="recursive"]').removeAttr("checked")
        });
        $('body #chattrDialog button[onclick="chattrSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chattr");
        $("body").on("click", "#chattrDialog button.o__f_m-submitter-chattr", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-tags"></i>' + lang("theme_xhred_filemanager_changing_attributes").replace("%value", escape_html($('#chattrForm input[name="label"]').val())) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chattr_info");
            __f____a("chattr", [$('#chattrForm input[name="label"]').val(), $('#chattrForm input[name="recursive"]').prop("checked")])
        });
        $("#chattrDialog").on("shown.bs.modal", function() {
            $('#chattrDialog input[name="label"]').focus()
        });
        $("#chattrDialog").on("show.bs.modal", function() {
            var f = $(this).find("button.o__f_m-submitter-chattr");
            f.prop("disabled", true)
        });
        $('#chattrDialog input[name="label"]').on("keyup change click input", function(h) {
            var f = $("#chattrDialog").find("button.o__f_m-submitter-chattr");
            if ($('#chattrDialog input[name="label"]').val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $('#chattrDialog input[name="label"]').on("keyup", function(f) {
            f.preventDefault();
            var h = f.which;
            if (h == 13) {
                $("#chattrDialog button.o__f_m-submitter-chattr").trigger("click")
            }
        });
        $("#chattrDialog").on("show.bs.modal", function() {
            $('#chattrDialog input[name="label"]').val("");
            $('#chattrForm input[name="recursive"]').removeAttr("checked")
        });
        $('body #chconDialog button[onclick="chconSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-chcon");
        $("body").on("click", "#chconDialog button.o__f_m-submitter-chcon", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-tags"></i>' + lang("theme_xhred_filemanager_changing_secontext").replace("%value", escape_html($('#chconForm input[name="label"]').val())) + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "chcon_info");
            __f____a("chcon", [$('#chconForm input[name="label"]').val(), $('#chconForm input[name="recursive"]').prop("checked")])
        });
        $("#chconDialog").on("shown.bs.modal", function() {
            $('#chconDialog input[name="label"]').focus()
        });
        $("#chconDialog").on("show.bs.modal", function() {
            var f = $(this).find("button.o__f_m-submitter-chcon");
            f.prop("disabled", true);
            var n = {};
            $.unique($("tr td span[data-secontext]").map(function() {
                n[$(this).text()] = $(this).text()
            }).get());
            var k = $.map(n, function(p, o) {
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

            function h(o) {
                $('#chconDialog input[name="label"]').autocomplete({
                    lookup: k,
                    onSelect: function(p) {},
                    showNoSuggestionNotice: true,
                    noSuggestionNotice: lang("theme_xhred_global_no_results_found")
                })
            }
            if (typeof $().autocomplete === "function") {
                h()
            } else {
                var m = 0;
                if (t__wi_p.$load____ext === "src") {
                    m = $('html head link[href*="css/jquery.datatables."]:first')
                } else {
                    m = $('html head link[href*="css/bundle."]:first')
                }
                if (!$('html head link[href*="css/autocomplete."]').length) {
                    m.before('<link href="' + $_____link_full + "/unauthenticated/css/jquery.autocomplete." + t__wi_p.$load____ext + ".css?" + $g__t__ver_str + '" rel="stylesheet" type="text/css">')
                }
                $.getScript("" + $_____link_full + "/unauthenticated/js/jquery.autocomplete." + t__wi_p.$load____ext + ".js", function(o, q, p) {
                    h();
                    t__wi_p.$___ajax_requested_url = "_blank"
                })
            }
        });
        $('#chconDialog input[name="label"]').on("keyup change click input", function(h) {
            var f = $("#chconDialog").find("button.o__f_m-submitter-chcon");
            if ($('#chconDialog input[name="label"]').val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $('#chconDialog input[name="label"]').on("keydown", function(f) {
            var h = f.which;
            if (h == 13 && !$(".autocomplete-suggestions:visible").length) {
                $("#chconDialog button.o__f_m-submitter-chcon").trigger("click")
            }
        });
        $("#chconDialog").on("show.bs.modal", function() {
            $('#chconDialog input[name="label"]').val("");
            $('#chconForm input[name="recursive"]').removeAttr("checked")
        });

        function b() {
            $.ajax({
                type: "POST",
                url: $_____link_full + "/index.cgi/?xhr-get_command_exists=1&xhr-get_command_exists_name=zip",
                data: false,
                dataType: "text",
                success: function(f) {
                    if (!f) {
                        $('select[name="method"]').val("tar");
                        $('select[name="method"] option[value="zip"]').prop("disabled", true);
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + (lang("theme_xhred_global_no_such_command").replace("%cmd", "zip")), 15, "error")
                    } else {
                        $('select[name="method"] option[value="zip"]').prop("disabled", false)
                    }
                },
                error: function(f) {}
            })
        }
        $('body #compressDialog button[onclick="compressSelected()"]').removeAttr("onclick").addClass("o__f_m-submitter-compress").prop("disabled", true);
        $("body").on("click", "#compressDialog button.o__f_m-submitter-compress", function(f) {
            f.preventDefault();
            f.stopPropagation();
            messenger('<i class="fa fa-lg fa-fw fa-file-archive-o"></i>' + lang("theme_xhred_filemanager_compressing_selected") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "compress_info", 0);
            __f____a("compress", [escape_html($('#compressSelectedForm input[name="filename"]').val()), $('#compressSelectedForm select[name="method"] option:selected').val()])
        });
        $('#compressDialog input[name="filename"]').on("keyup change click input", function(h) {
            var f = $("#compressDialog").find("button.o__f_m-submitter-compress");
            if ($(this).val()) {
                f.prop("disabled", false)
            } else {
                f.prop("disabled", true)
            }
        });
        $("body").on("submit", "#compressSelectedForm", function(f) {
            f.preventDefault();
            f.stopPropagation();
            $("#compressDialog button.o__f_m-submitter-compress").trigger("click")
        });
        $("#compressDialog").on("show.bs.modal", function() {
            $('#compressDialog input[name="filename"]').val("")
        }).on("shown.bs.modal", function() {
            $('#compressDialog input[name="filename"]').focus();
            $('select[name="method"] option[value="zip"]').prop("disabled", false);
            if ($('select[name="method"]').val() == "zip") {
                b()
            }
        });
        $('select[name="method"]').change(function(f) {
            if ($(this).val() == "zip") {
                b()
            }
        });
        $("body").on("click", ".dropdown-menu > li.disabled", function(f) {
            f.preventDefault();
            f.stopPropagation()
        });
        if ($__source_file === "index.cgi" && !URI(t___wi.location).hasQuery("path")) {
            $("#headln2l").find('a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').addClass("hidden")
        }
        $(".btn-group.pull-right > button:eq(2)").removeAttr("onclick");
        $("body").on("click", ".btn-group.pull-right > button:eq(2)", function(f) {
            var h = $("#path").val();
            __f____r("get", "index.cgi?path=" + (h ? encodeURIComponentSafe(h) : ""), false, 0);
            t__wi_p.$____loader_block__ === 0 && messenger('<i class="fa fa-lg fa-fw ' + $__f__rf_s + '"></i>' + lang("theme_xhred_filemanager_refreshing") + " " + lang("theme_xhred_global_please_wait"), 100000, "info", "refreshDir_info")
        });
        setTimeout(function() {
            if (config_portable_module_filemanager_hovered_toolbar != true) {
                $(".btn-group.pull-right > .btn-group > button").hover(function(f) {
                    f.preventDefault();
                    f.stopPropagation()
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
            $(".popover-path-input").val(decodeURIComponentSafe($("#path").val()));
            $(".popover-path-input").focus();
            $(".popover-path-input").keydown(function(f) {
                var h = f.keyCode ? f.keyCode : f.which;
                if (h == 13) {
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
            var f = jQuery.Event("keydown");
            f.which = 13;
            $(".popover-path-input").trigger(f)
        });
        $("body").on("contextmenu", ".breadcrumb", function(f) {
            f.preventDefault();
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
    $("body").on("click", ".active .ui_checked_columns", function(k) {
        var h = k.keyCode ? k.keyCode : k.which;
        if (get_selected_text()) {
            return
        }
        if (h !== 1) {
            return
        }
        var m = $(k.target).parents("tr");
        if ($(k.target).is(":checkbox") || $(k.target).is(".lawobject")) {
            return
        }
        var f = $("#path").val();
        goup = m.hasClass("directory_go_up"), link = m.find('td a[href*="index.cgi?path="]').attr("href"), link_escaped = m.find("td a[data-filemin-link]").attr("data-filemin-link"), download = m.find('td a[href*="download.cgi?"]').attr("href"), td_tag = ($(k.target).is("td"));
        if (goup) {
            $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>');
            $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').trigger("click")
        }
        if (download && !td_tag) {
            return
        }
        k.preventDefault();
        if (link) {
            $(this).find("img").before('<span class="cspinner" style="margin-top: 5px; margin-left: -20px;"><span class="cspinner-icon small"></span></span>');
            __f____r("get", ("index.cgi?path=" + (encodeURIComponentSafe(decode_html(f)) + "/" + encodeURIComponentSafe(decode_html(link_escaped)))), false, 0);
            return
        }
        if (td_tag) {
            $(k.target).parents("tr").find('td.ui_checked_checkbox input[type="checkbox"]').trigger("click");
            return
        }
    });
    $("body").on("keydown", function(f) {
        var w = f.keyCode ? f.keyCode : f.which;
        if ($("#__f__c__m").is(":visible") && w == 27) {
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
            if (w == 32 && f.ctrlKey) {
                f.preventDefault();
                f.stopPropagation();
                if (!f.shiftKey) {
                    $("#file-manager-new-instance:not(.disabled_no_styling)").trigger("click")
                } else {
                    $(".nav.nav-tabs").find("li.active").find("a").find("i").trigger("click")
                }
            }
            if ((w == 37 || w == 39) && f.ctrlKey) {
                f.preventDefault();
                f.stopPropagation();
                if (w == 37) {
                    $(".nav.nav-tabs").find("li.active").prev("li").find("a").trigger("click")
                } else {
                    $(".nav.nav-tabs").find("li.active").next("li").find("a").trigger("click")
                }
                return
            }
            if ((w == 49 || w == 50 || w == 51 || w == 52 || w == 53 || w == 54 || w == 55 || w == 56 || w == 57) && f.ctrlKey) {
                var B = (w - 48);
                f.preventDefault();
                f.stopPropagation();
                $.each($(".nav.nav-tabs").find("li"), function(n, m) {
                    if ((n + 1) == B) {
                        $(this).find("a").trigger("click");
                        return
                    }
                });
                return
            }
        }
        if ((w == 120 || w == 121) && !f.ctrlKey && !f.shiftKey && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            if (w == 120) {
                $('a[onclick="downFromUrlDialog()"]').trigger("click");
                return
            }
            if (w == 121) {
                $('a[onclick="viewReadyForUpload()"]').trigger("click");
                return
            }
        }
        if (!$("input.popover-path-input").is(":focus") && String.fromCharCode(w).toLowerCase() == "l" && f.ctrlKey && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            f.preventDefault();
            f.stopPropagation();
            var F = $('#headln2r > div.btn-group > a[href^="config.cgi"]');
            if (is_scrolled_into_view(F)) {
                $('[data-toggle="popover-path"]').popover("show")
            } else {
                F.scrollIntoView({
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
        if (w == 93 && !$(":focus").parents(".jsPanel").is(".jsPanel") && !$(".modal.in").length) {
            f.preventDefault();
            f.stopPropagation();
            if (!$("#list_form table tbody tr.m-active").length) {
                $("#list_form table tbody tr:first-child:not(.directory_go_up)").addClass("m-active")
            }
            $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("contextmenu");
            return
        }
        if (w == 13 && $(":focus").parents(".jsPanel").is(".jsPanel")) {
            if (f.ctrlKey && f.shiftKey) {
                $(":focus").parents(".jsPanel").find("._filemanager_file_editor_save").trigger("click");
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-close").trigger("click")
            } else {
                if (f.ctrlKey) {
                    $(":focus").parents(".jsPanel").find("._filemanager_file_editor_save").trigger("click")
                }
            }
        }
        if (w == 27 && $(":focus").parents(".jsPanel").is(".jsPanel")) {
            if (f.ctrlKey) {
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-min").trigger("click")
            } else {
                $(":focus").parents(".jsPanel").find(".jsPanel-btn-close").trigger("click")
            }
            return
        }
        if ($(":focus").parents(".jsPanel").is(".jsPanel")) {
            return
        }
        if (w == 13 && $("#list_form table tbody tr.m-active").length === 1 && !$(".modal.in").length) {
            if ($("#list_form table tbody tr.m-active").hasClass("directory_go_up")) {
                $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]').trigger("click")
            } else {
                var z = $('.active form table tbody tr.m-active td a[href*="index.cgi?path="]');
                z.length && z.first()[0].click()
            }
            return
        }
        if (!$(".modal.in").length && f.ctrlKey && (String.fromCharCode(w).toLowerCase() == "c" || String.fromCharCode(w).toLowerCase() == "v" || String.fromCharCode(w).toLowerCase() == "x")) {
            if ($("#list_form table tbody tr td:first-child").find("input:checked").length === 0 && $("#list_form table tbody tr.m-active").length === 1 && f.ctrlKey && (String.fromCharCode(w).toLowerCase() == "c" || String.fromCharCode(w).toLowerCase() == "v" || String.fromCharCode(w).toLowerCase() == "x")) {
                $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
            }
        }
        if (w == 13) {
            if ($(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
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
        if (w == 13 && $("#list_form table tbody tr:not(.directory_go_up)").length === 1 && !$(".modal.in").length && t__wi_p.t___p__xhr_r === 0) {
            $('.active form table tbody tr td a[href*="index.cgi?path="]').length && $('.active form table tbody tr td a[href*="index.cgi?path="]').first()[0].click();
            return
        }
        if (w == 13) {
            return
        }
        if ((w == 32) && !f.shiftKey && !$("#list_form table tbody tr.m-active").length) {
            return
        }
        if ((w == 46 || w == 113 || w == 114 || w == 115 || w == 116 || w == 117 || w == 119) && !_f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            }).length && !$(".ui_checked_columns input:checked").length && !$(".modal.in").length && !$(".popover").is(":visible") && !$("input").is(":focus") && !$("#list_form table tbody tr.m-active").length && (!f.shiftKey || (w == 116 && f.shiftKey) || (w == 115 && !f.shiftKey))) {
            f.preventDefault();
            f.stopPropagation();
            if (t___wi.document.activeElement && $(t___wi.document.activeElement).is('a[href^="edit_file.cgi"]')) {
                return
            }
            messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>' + lang("theme_xhred_filemanager_nothing_is_selected"), 0.75, "warning", "noSelection_warning");
            return
        }
        if (!f.shiftKey && !f.ctrlKey && !f.altKey && !f.metaKey && !$("#__f__c__m").is(":visible")) {
            if (w != 33 && w != 34 && $("#list_form table tbody tr.m-active").length) {
                f.preventDefault();
                f.stopPropagation()
            }
            if (typeof ___contextmenu__triggered___ != "undefined") {
                return
            }
            l = $("#list_form table tbody tr.m-active").removeClass("m-active");
            var y = l.index();
            var H = l.index();
            if (w == 38 && !$(".modal.in").length) {
                if ($(".dataTable-mirror").is(":focus")) {
                    $.each($("input"), function() {
                        $(this).blur()
                    })
                }
                H--;
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr").addClass("m-not-active")
            }
            if (w == 40 && !$(".modal.in").length) {
                if ($(".dataTable-mirror").is(":focus")) {
                    $.each($("input"), function() {
                        $(this).blur()
                    })
                }
                H++;
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr").addClass("m-not-active")
            }
        }
        if ((w == 38 || w == 40 || w == 32 || w == 13 || w == 46 || w == 119 || w == 117 || w == 115 || w == 116 || w == 113 || w == 114) && !$(".modal.in").length) {
            l = (!$("#list_form table tbody tr").find(".dataTables_empty").length && $("#list_form table tbody tr").eq(H).addClass("m-active m-not-active"))
        }
        if (w == 27) {
            f.preventDefault();
            f.stopPropagation();
            $('.modal.in button[data-dismiss="modal"]').trigger("click")
        }
        if (w == 35 && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                l = $("#list_form table tbody tr").eq(parseInt($("#list_form table tbody tr").length) - 1).addClass("m-active m-not-active")
            }
        }
        if (w == 36 && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                l = $("#list_form table tbody tr").eq(0).addClass("m-active m-not-active")
            }
        }
        if (w == 13) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $(".dataTables_filter label input").blur();
                $("#list_form table tbody tr.m-active").find("td:first-child").trigger("click")
            }
        }
        if (w == 8 && !$(".o__f_m-main-spinner").is(":visible") && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $(".active i.fa-folder-btl").after('<span class="cspinner" style="margin-top: 2px; margin-left: 28px;"><span class="cspinner-icon small"></span></span>');
                $('#headln2l > div.btn-group > a[href*="' + $g__o__f_m + '"][href*="index.cgi"]:not(.hidden)').trigger("click")
            }
        }
        if ((String.fromCharCode(w).toLowerCase() == "m") && f.ctrlKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $("#file-manager-switch-user").trigger("click")
            }
        }
        if (w == 32 && !f.ctrlKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                var E = $("#list_form table tbody tr.m-active"),
                    h = jQuery.Event("keydown");
                E.find("td:first-child input").trigger("click");
                h.which = 40;
                $("body").trigger(h);
                __r____changed();
                if (config_portable_module_filemanager_calculate_size) {
                    __f__get_fs()
                }
            }
        }
        if (w == 106 || (f.shiftKey && w == 56)) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $('body button[onclick="invertSelection()"]').trigger("click")
            }
        }
        if (w == 107 || (f.shiftKey && w == 187)) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $('body button[onclick="selectAll()"]').trigger("click")
            }
        }
        if (w == 109 || (f.shiftKey && w == 189)) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                var I = document.getElementsByClassName("ui_checked_columns");
                for (i = 0; i < I.length; i++) {
                    var v = I[i].getElementsByTagName("input")[0];
                    if (v.checked) {
                        rowClick(I[i])
                    }
                }
                __f___lb();
                __r____changed()
            }
        }
        if ((w == 46 || w == 119) && !$("input").is(":focus")) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                if ($(".o__f_m-button-delete.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-delete").trigger("click");
                __f___cs()
            }
        }
        if (w == 113 && !f.shiftKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                if ($(".o__f_m-button-chmod.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-chmod a").trigger("click");
                __f___cs()
            }
        } else {
            if (w === 113 && f.shiftKey) {
                if (!$(".modal.in").length) {
                    f.preventDefault();
                    f.stopPropagation();
                    if ($(".o__f_m-button-chattr.disabled").length) {
                        $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                    }
                    $("body .o__f_m-button-chattr a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (w == 114 && !f.shiftKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                if ($(".o__f_m-button-chown.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-chown a").trigger("click");
                __f___cs()
            }
        } else {
            if (w === 114 && f.shiftKey && $t_av_sestatus) {
                if (!$(".modal.in").length) {
                    f.preventDefault();
                    f.stopPropagation();
                    if ($(".o__f_m-button-chcon.disabled").length) {
                        $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                    }
                    $("body .o__f_m-button-chcon a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (w == 116 && !f.shiftKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                if ($(".o__f_m-button-compress.disabled").length) {
                    $("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
                }
                $("body .o__f_m-button-compress a").trigger("click");
                __f___cs()
            }
        }
        if (w == 118 && !f.shiftKey && !f.ctrlKey) {
            if (!$(".modal.in").length) {
                f.preventDefault();
                f.stopPropagation();
                $('a[onclick = "createFolderDialog()"]').trigger("click");
                __f___cs()
            }
        }
        if (w == 117) {
            if (!$(".modal.in").length) {
                if ($("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").length) {
                    f.preventDefault();
                    f.stopPropagation();
                    $("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").trigger("click");
                    __f___cs()
                }
            }
        }
        if (w == 115 && !f.shiftKey) {
            if (!$(".modal.in").length) {
                if ($("#list_form table tbody tr.m-active").find("i.fa-pencil-square-o").parent("a").length) {
                    f.preventDefault();
                    t__wi_p.$___ajax_requested_url = "edit_file.cgi";
                    var D = "jsp_" + parseInt(Math.random() * 1000000000000000000),
                        G = encodeURIComponentSafe(decode_html($("#list_form table tbody tr.m-active").find("a[data-filemin-link]").attr("data-filemin-link"))),
                        u = $("#path").val(),
                        C = ("edit_file.cgi?file=" + G + "&path=" + u);
                    window[D] = $.jsPanel({
                        contentAjax: {
                            url: C,
                            dataType: "text",
                            autoload: false,
                            done: function(P, s, Y, m) {
                                var q = G,
                                    o = u;
                                var N = ($("body").data("charset") != "UTF-8"),
                                    M = $(P).find(".ui_form"),
                                    R = ("<strong>" + (escape_html(decodeURIComponentSafe(G)) + " (" + escape_html(decodeURIComponentSafe(($("#path").val() ? (access_level() == 2 ? ($g__user__home + $("#path").val()) : $("#path").val()) : (access_level() == 2 ? $g__user__home : "/")))) + ")") + "</strong>"),
                                    n = this,
                                    W = $(n),
                                    Q = (parseInt(m.attr("id").replace("jsPanel-", "")) + 1);
                                m.attr("data-uid", D);
                                if (!$(M).find("textarea").length) {
                                    var M = $(P).find('form[action="save_file.cgi"]').append($(P).find("#data").removeAttr("id")).prepend($(P).find("#file").removeAttr("id")).prepend($(P).find("#path").removeAttr("id"))
                                }
                                m.headerTitle(R);
                                W.data("jspuid", D);
                                W.find(".jsPanel-hdr h3").prepend('<i class="fa fa-fw fa-lg fa-edit __helper___ pointer-events-none">&nbsp;&nbsp;</i>').find("strong").attr("title", R.replace(/<\/?[^>]+(>|$)/g, ""));
                                W.find(".jsPanel-content").html(M);
                                var J = W.find(".jsPanel-content");
                                var X = J.find(".ui_form_end_buttons tr td span:first-child input"),
                                    L = J.find(".ui_form_end_buttons tr td span:nth-child(2) input");
                                J.find(".ui_form_end_buttons").remove();
                                W.find(".jsPanel-hdr .jsPanel-controlbar").prepend('                        <div class="jsPanel-btn jsPanel-btn-save _filemanager_file_editor_save"><i class="fa fa-fw fa-save"></i></div>                        <div class="dropdown">                          <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">                            <i class="fa fa-menu"></i>                          </span>                          <ul class="dropdown-menu dropdown-menu-right small">                            <li class="jsPanel-btn-align vertical"><a class="ddm-link" href="javascript:;"><i class="fa fa-align-horizontal-middle pull-left margined-top-2"></i>' + lang("theme_xhred_filemanager_editor_align_panels_vertically") + '</a></li>                            <li class="jsPanel-btn-align hidden horizontal"><a class="ddm-link" href="javascript:;"><i class="fa fa-align-vertical-middle pull-left margined-top-2"></i>' + lang("theme_xhred_filemanager_editor_align_panels_horizontally") + '</a></li>                            <li class="jsPanel-btn-togglewrap"><a class="ddm-link" href="javascript:;"><i class="fa fa-wrap-text pull-left margined-top-2"></i>' + lang("theme_xhred_filemanager_editor_toggle_soft_wrap") + '</a></li>                            <li role="separator" class="divider"></li>                            ' + (!N ? '<li class="jsPanel-btn-content-refresh"><a class="ddm-link" href="javascript:;"><i class="fa fa-refresh pull-left margined-top-3"></i>' + lang("theme_xhred_filemanager_editor_refresh_content") + "</a></li>" : "") + '                            <li class="__helper___tr"><a class="ddm-link" href="javascript:;">' + lang("theme_xhred_global_help") + "</a></li>                          </ul>                        </div>                    ");
                                W.find(".jsPanel-hdr .jsPanel-controlbar .__helper___tr").click(function(aa) {
                                    var x = W.find(".jsPanel-hdr .fa-edit");
                                    x.removeClass("pointer-events-none").trigger("click");
                                    x.removeClass("pointer-events-none")
                                });
                                W.find(".jsPanel-hdr .jsPanel-controlbar .jsPanel-btn-align:not(.disabled)").click(function(x) {
                                    if ($(this).hasClass("disabled")) {
                                        return
                                    }
                                    __f___cas_jp(0, n, (!$(this).hasClass("horizontal") ? 0 : 1))
                                });
                                __f___cas_jp(1, n, 0);
                                var U = J.find("form").attr("data-encoding"),
                                    p = ($hostname + "-" + ("__cm_editor_encoding")),
                                    r = (U ? true : false),
                                    U = (U ? U : (localStorage.getItem(p) ? "not_detected" : "UTF-8"));
                                var V = "";
                                var T = {
                                    "UTF-8": "utf-8",
                                    "ISO-8859-1": "iso-8859-1 (cp1252)&#x200E;",
                                    "windows-1252": "cp1252 (iso-8859-1)&#x200E;",
                                    "windows-1250": "cp1250",
                                    "windows-1251": "cp1251",
                                    "windows-1253": "cp1253",
                                    "windows-1254": "cp1254",
                                    "windows-1255": "cp1255",
                                    "windows-1256": "cp1256",
                                    "ISO-8859-2": "iso-8859-2",
                                    "ISO-8859-7": "iso-8859-7",
                                    "ISO-8859-9": "iso-8859-9",
                                    "ISO-8859-15": "iso-8859-15",
                                    "US-ASCII": "ascii",
                                    "x-IBM874": "cp874",
                                    IBM866: "cp866",
                                    "KOI8-R": "koi8",
                                    "EUC-KR": "EUC encoding, Korean",
                                    "EUC-JP": "EUC encoding, Japanese",
                                    Shift_JIS: "Shift-JIS, Japanese"
                                };
                                if (!T.hasOwnProperty(U) && U != "not_detected") {
                                    V += '<option value="' + U + '" selected>' + U.toLowerCase() + "</option>"
                                }
                                $.each(T, function(x, aa) {
                                    V += '<option value="' + x + '"' + (((U.toLowerCase() == x.toLowerCase()) || (!x)) ? " selected" : "") + ">" + aa + "</option>"
                                });
                                W.find(".jsPanel-hdr .jsPanel-controlbar").prepend('<div data-encoding-label class="jsPanel-btn text-light cursor-default"><label class="select-styled select-styled-small select-styled-no-border select-styled-no-icon' + (N ? " pointer-events-none hidden" : "") + '"> <select required data-encoding dir="rtl">' + V + "</select> </label></div>");
                                var O = W.find("select[data-encoding]"),
                                    K = O.val(),
                                    t = W.find("._filemanager_file_editor_save");
                                __f___es_adj(O, Q);
                                K == Object.keys(T)[2] && O.val(Object.keys(T)[1]);
                                O.on("change", function(x) {
                                    if (N) {
                                        return
                                    }
                                    if (t.hasClass("text-danger") && t.hasClass("__locked__")) {
                                        return
                                    }
                                    var aa = $(this).val(),
                                        ab = o + "/" + q;
                                    __f___es_adj($(this), Q);
                                    (!r && localStorage.setItem(p, aa));
                                    if (access_level() == "2") {
                                        ab = $g__user__home + ab
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: $_____link_full + "/index.cgi?xhr-encoding_convert=1&xhr-encoding_convert_name=" + aa + "&xhr-encoding_convert_file=" + ab + "",
                                        data: false,
                                        dataType: "text",
                                        success: function(ac) {
                                            window["__cm_editor_" + Q].setValue(ac);
                                            t.removeClass("text-danger __locked__");
                                            O.removeClass("pointer-events-none")
                                        },
                                        error: function() {}
                                    })
                                });
                                var Z = localStorage.getItem(p);
                                if (!N && !r && Z) {
                                    if (Z && T.hasOwnProperty(Z)) {
                                        O.val(Z).trigger("change")
                                    }
                                }
                                t__cm___init(J.find("textarea"), R, [null, parseInt(J.css("height"))], Q);
                                W.addClass("jspShown").css("opacity", 0);
                                W.animate({
                                    opacity: 1
                                }, 400, function() {
                                    window["__cm_editor_" + Q].focus();
                                    W.find(".jsPanel-btn-togglewrap").click(function(aa) {
                                        var x = window["__cm_editor_" + Q];
                                        x.setOption("lineWrapping", !x.getOption("lineWrapping"))
                                    })
                                });
                                W.click(function() {
                                    var x = parseInt($(this).attr("data-uid").replace("jsp_", ""));
                                    window["jsp_" + x].front()
                                });
                                W.find(".jsPanel-hdr .jsPanel-controlbar [data-encoding-label], .jsPanel-hdr .jsPanel-controlbar .dropdown, .jsPanel-hdr .jsPanel-controlbar .jsPanel-btn").each(function(ab, ad) {
                                    $(this).attr("data-toggle", "tooltip").attr("data-placement", "auto top").attr("data-delay", '{"show":"800", "hide":"30"}');
                                    var ac = "data-title",
                                        x = ".jsPanel-btn-",
                                        aa = "theme_xhred_global_";
                                    if ($(this).is(x + "maximize")) {
                                        $(this).attr(ac, lang(aa + "maximize"))
                                    }
                                    if ($(this).is(x + "minimize")) {
                                        $(this).attr(ac, lang(aa + "minimize"))
                                    }
                                    if ($(this).is(x + "normalize")) {
                                        $(this).attr(ac, lang(aa + "normalize"))
                                    }
                                    if ($(this).is(x + "close")) {
                                        $(this).attr(ac, lang(aa + "close"))
                                    }
                                    if ($(this).is(x + "save")) {
                                        $(this).attr(ac, lang(aa + "save"))
                                    }
                                    if ($(this).is("[data-encoding-label]")) {
                                        $(this).attr(ac, lang(aa + "set_encoding"))
                                    }
                                });
                                O.click(function(x) {
                                    if (x.originalEvent !== undefined) {
                                        if (!N && $(this).hasClass("pointer-events-none")) {
                                            messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + lang("theme_xhred_filemanager_save_to_change_encoding"), 4, "warning", "savingFileDone")
                                        }
                                    } else {
                                        if ($(this).hasClass("pointer-events-none")) {
                                            messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + lang("theme_xhred_filemanager_save_to_refresh_content"), 4, "warning", "savingFileDone")
                                        } else {
                                            messenger('<i class="fa fa-lg fa-fw fa-refresh"></i>' + lang("theme_xhred_filemanager_save_to_refresh_content_proc") + " " + lang("theme_xhred_global_please_wait"), 1, "info", "refreshingFileDone")
                                        }
                                    }
                                });
                                W.find(".jsPanel-hdr .jsPanel-controlbar .jsPanel-btn-content-refresh").click(function(x) {
                                    O.val(O.val()).trigger("change").trigger("click")
                                });
                                $("body").keydown(function(x) {
                                    if (n.find(".dropdown").hasClass("open")) {
                                        if (x.altKey && !x.shiftKey) {
                                            W.find(".jsPanel-btn-align.vertical").addClass("hidden");
                                            W.find(".jsPanel-btn-align.horizontal").removeClass("hidden")
                                        }
                                        if (x.shiftKey) {
                                            __f___cas_jp_rev = 1
                                        }
                                    }
                                }).keyup(function(x) {
                                    if (n.find(".dropdown").hasClass("open")) {
                                        W.find(".jsPanel-btn-align.horizontal").addClass("hidden");
                                        W.find(".jsPanel-btn-align.vertical").removeClass("hidden")
                                    }
                                    if (!x.shiftKey) {
                                        __f___cas_jp_rev = 0
                                    }
                                });
                                n.find(".dropdown").on("show.bs.dropdown", function(x) {
                                    W.find(".jsPanel-btn-align.horizontal").addClass("hidden");
                                    W.find(".jsPanel-btn-align.vertical").removeClass("hidden")
                                });
                                t.click(function(x) {
                                    $(this).find("i").replaceWith(t__lo__btn_md());
                                    $(this).removeClass("text-danger __locked__");
                                    O.removeClass("pointer-events-none");
                                    W.find('form[action="save_file.cgi"]').submit()
                                });

                                function S() {
                                    var x = t;
                                    x.find(".cspinner").remove();
                                    x.find("i").remove();
                                    x.prepend('<i class="fa fa-fw fa-save"></i>')
                                }
                                W.find('form[action="save_file.cgi"]').submit(function(ad) {
                                    ad.preventDefault();
                                    ad.stopPropagation();
                                    messenger('<i class="fa fa-lg fa-fw fa-save"></i>' + lang("theme_xhred_filemanager_saving_file").replace("%value", R) + " " + lang("theme_xhred_global_please_wait"), 5, "info", "savingFileDone");
                                    var ac = 'form[action="save_file.cgi"]',
                                        ab = "select[data-encoding]",
                                        aa = W.find(ab).val(),
                                        x = W.find("" + ac + ' input:not([name="path"]), ' + ac + " textarea").serialize();
                                    x = x + "&path=" + o;
                                    if (aa) {
                                        x = x + "&encoding=" + aa
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: $_____link_full + "/" + __f___mn() + "/save_file.cgi",
                                        data: x,
                                        dataType: "text",
                                        success: function(ae) {
                                            var af = W.find("._filemanager_file_editor_save .cspinner");
                                            if (!$(ae).find("textarea#data").length) {
                                                messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + $(ae).find(".panel-body").html(), 10, "error", "savingFileError");
                                                if (af.parent(".btn").index() === 1) {
                                                    modal_dismiss()
                                                }
                                                S();
                                                return
                                            }
                                            messenger('<i class="fa fa-lg fa-fw fa-check-circle"></i>' + lang("theme_xhred_filemanager_file_saved").replace("%value", R), 1.5, "success", "savingFileDone");
                                            S()
                                        },
                                        error: function(ae) {}
                                    })
                                })
                            }
                        },
                        maximizedMargin: {
                            top: 10,
                            right: 10,
                            bottom: 10,
                            left: 10
                        },
                        panelSize: {
                            width: ($(window).width() * 0.9),
                            height: ($(window).height() * 0.7)
                        },
                        dblclicks: {
                            title: "normalize",
                            title: "maximize"
                        },
                        headerControls: {
                            smallify: "remove"
                        },
                        resizeit: {
                            stop: function() {
                                __f___cm_resize(this)
                            }
                        },
                        onresized: function() {
                            __f___cm_resize(this)
                        },
                        onnormalized: function() {
                            var m = parseInt($(this).attr("id").replace("jsPanel-", ""));
                            this.resize({
                                width: ($(window).width() / 3),
                                height: ($(window).height() / 4)
                            });
                            if (m < parseInt(($(window).height() / 3) / 11.5)) {
                                this.reposition("left-top " + (25 * m) + "px " + (25 * m) + "px")
                            }
                            __f___cas_jp(1, this, 0);
                            __f___cm_resize(this)
                        },
                        onmaximized: function() {
                            __f___cas_jp(1, this, 0);
                            __f___cm_resize(this)
                        },
                        onminimized: function() {
                            __f___cas_jp(1, this, 0)
                        },
                        onclosed: function() {
                            __f___cas_jp(1, this, 0)
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
                                            label: '&nbsp;<i class="fa fa-fw fa-save">&nbsp;&nbsp;</i>' + lang("theme_xhred_global_save_and_close") + "&nbsp;&nbsp;",
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
                        }
                    });
                    __f___cs()
                } else {
                    messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>' + lang("theme_xhred_filemanager_not_editable"), 0.75, "warning", "notEditableTarget")
                }
            }
        }
        if (!$("input").is(":focus") && !$("select").is(":focus") && !$("textarea").is(":focus") && !$(".modal.in").length && w != 32 && w != 113 && w != 114 && w != 106 && w != 107 && w != 116 && w != 109 && w != 46 && w != 119 && w != 118 && w != 115) {
            if ($(".tab-pane.active .paginate_button.next").parents("ul.pagination").hasClass("pointer-events-none")) {
                return
            }
            if (w === 39) {
                $(".tab-pane.active .paginate_button.next").trigger("click");
                $("#list_form table tbody tr.m-active").removeClass("m-active");
                $("#list_form table tbody tr").addClass("m-not-active")
            } else {
                if (w === 37) {
                    $(".tab-pane.active .paginate_button.previous").trigger("click");
                    $("#list_form table tbody tr.m-active").removeClass("m-active");
                    $("#list_form table tbody tr").addClass("m-not-active")
                } else {
                    var k = String.fromCharCode(w);
                    if (k && /[a-zA-Z0-9]/.test(k) && !f.ctrlKey && !f.altKey && !f.metaKey) {
                        $(".dataTables_filter label input").trigger("keyup").focus()
                    }
                }
            }
        }
        if (String.fromCharCode(w).toLowerCase() == "s" && f.ctrlKey) {
            f.preventDefault();
            f.stopPropagation();
            _f__table().dataTable().$("tr.hl-aw", {
                filter: "applied"
            }).length && __f__get_fs()
        }
        if (f.shiftKey && f.ctrlKey) {
            return
        }
        if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus") && !$(".btn-filter-top-right input").is(":focus") && (w == 115 || w == 116 || w == 118 || String.fromCharCode(w).toLowerCase() == "c" || String.fromCharCode(w).toLowerCase() == "v" || String.fromCharCode(w).toLowerCase() == "x")) {
            if ((!(String.fromCharCode(f.which).toLowerCase() == "c" && f.ctrlKey) && !(String.fromCharCode(f.which).toLowerCase() == "v" && f.ctrlKey) && !(String.fromCharCode(f.which).toLowerCase() == "x" && f.ctrlKey) && !(w == 115 && f.shiftKey) && !(w == 116 && f.shiftKey) && !(w == 118 && f.shiftKey)) && !(f.which == 19)) {
                return true
            }
            f.preventDefault();
            if (w == 115) {
                if (!$(".modal.in").length) {
                    f.stopPropagation();
                    $('a[onclick = "createFileDialog()"]').trigger("click");
                    __f___cs();
                    return
                }
            }
            if (w == 116) {
                if (!$(".modal.in").length) {
                    f.stopPropagation();
                    if ($("#list_form table tbody tr.m-active").find("i.fa-extract-archive").parent("a").length) {
                        var A = $("#list_form table tbody tr.m-active").find("td.ui_checked_checkbox input");
                        !A.is(":checked") && A.trigger("click");
                        f.preventDefault();
                        f.stopPropagation();
                        $("#list_form table tbody tr.m-active").find("i.fa-extract-archive").parent("a")[0].click();
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-circle"></i>' + lang("theme_xhred_filemanager_not_decompressable"), 0.75, "warning", "notDecompressableTarget")
                    }
                    return
                }
            }
            if (w == 118) {
                if (!$(".modal.in").length) {
                    f.stopPropagation();
                    $('a[onclick = "searchDialog()"]').trigger("click");
                    __f___cs();
                    return
                }
            }
            if (String.fromCharCode(w).toLowerCase() == "c") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    f.stopPropagation();
                    if (!$(".o__f_m-button-copy.disabled").length) {
                        $("body .o__f_m-button-copy a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + lang("theme_xhred_filemanager_no_selection_to_copy"), 0.75, "warning", "nothingSelected")
                    }
                    return
                }
            }
            if (String.fromCharCode(w).toLowerCase() == "v") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    f.stopPropagation();
                    if (!$(".o__f_m-button-paste.disabled").length) {
                        $("body .o__f_m-button-paste a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-clipboard"></i>' + lang("theme_xhred_filemanager_empty_clipboard"), 0.75, "warning", "emptyClipboard")
                    }
                    return
                }
            }
            if (String.fromCharCode(w).toLowerCase() == "x") {
                if (!$(".modal.in").length && !$(".popover").is(":visible") && !$("input.popover-path-input").is(":focus")) {
                    f.stopPropagation();
                    if (!$(".o__f_m-button-cut.disabled").length) {
                        $("body .o__f_m-button-cut a").trigger("click");
                        __f___cs()
                    } else {
                        messenger('<i class="fa fa-lg fa-fw fa-exclamation-triangle"></i>' + lang("theme_xhred_filemanager_no_selection_to_cut"), 0.75, "warning", "nothingSelected")
                    }
                    return
                }
            }
            return
        }
    });
    $("body").on("click", "a.action-link > .fa", function(h) {
        h.preventDefault();
        if ($(this).hasClass("fa-extract-archive")) {
            var f = $(this).parents("tr").find("td.ui_checked_checkbox input");
            !f.is(":checked") && f.trigger("click")
        } else {
            if ($(this).hasClass("fa-i-cursor")) {
                h.stopPropagation()
            }
        }
    });
    $("body").on("click", "#file-manager-switch-user:not(.disabled_no_styling)", function(f) {
        var h = $(this);
        h.addClass("disabled_no_styling");
        $.ajax({
            type: "POST",
            url: $g__e__path + "/file-manager/fetcher.cgi?module=" + $g__m__name + "&list_users=1",
            data: false,
            dataType: "JSON",
            success: function(o) {
                var r = localStorage.getItem($hostname + "-settings_thirdparty_filemanager_usermode"),
                    s = '<option value="" class="text-success"' + (!r || r == "" ? " selected" : "") + "><em>" + $g__user__ + "</em></option>";
                $.each(o, function(u, t) {
                    s += '<option value="' + u + '"' + (r == u ? " selected" : "") + ">" + u + '<span class="text-danger"> [' + t.split(":")[0] + "]</span></option>"
                });
                var p = $("body"),
                    n = '    		<div class="modal fade9 modal-list-users" tabindex="-1" role="dialog">    		  <div class="modal-dialog modal-md">    		    <div class="modal-content">    		      <div class="modal-header background-warning background--bordered">    		        <button type="button" class="close" data-dismiss="modal" aria-label="' + lang("theme_xhred_global_close") + '"><span aria-hidden="true">&times;</span></button>    		        <h4 class="modal-title"><i class="fa fa-fw fa-user-switch">&nbsp;&nbsp;</i> ' + lang("theme_xhred_filemanager_user_switch").replace(/\(.*?\)/g, "").replace(/\s+$/, "") + '</h4>    		      </div>    		      <div class="modal-body">    		        <p>' + lang("theme_xhred_filemanager_user_switch_description") + '</p>                <label class="select-styled fstreched"><select>                  ' + s + "                </select></label>                <hr>                <p>" + lang("theme_xhred_filemanager_user_switch_description_back") + "</p>    		      </div>    		    </div>    		  </div>    		</div>    	";
                p.append(n);
                var k = "body",
                    m = ".modal-list-users",
                    q = "#file-manager-switch-user";
                $(k + " " + m).on("show.bs.modal", function() {
                    $(k + " " + m).find("select").on("change", function() {
                        var t = $(this).val();
                        localStorage.setItem($hostname + "-settings_thirdparty_filemanager_usermode", t);
                        config_portable_module_filemanager_switch_user == false && __f___us_tl();
                        $(k + " " + m).modal("hide")
                    })
                });
                $(k + " " + m).on("shown.bs.modal", function() {
                    setTimeout(function() {
                        $(k + " " + m).focus();
                        var t = $(k + " " + m).find("select");
                        t.trigger("focus")
                    }, 360)
                });
                $(k + " " + m).on("hidden.bs.modal", function() {
                    $(this).remove();
                    h.removeClass("disabled_no_styling")
                });
                $(k + " " + m).modal("show")
            },
            error: function(k) {
                console.log(k)
            }
        })
    });
    $("body").on("click", "#file-manager-new-instance:not(.disabled_no_styling)", function(f) {
        __f___nt($("#path").val(), true)
    });
    $("body").on("click", ".nav.nav-tabs li.ui-sortable-handle.disabled", function(f) {
        f.preventDefault;
        f.stopPropagation;
        return false
    });
    $("body").on("mouseenter mousemove", ".nav.nav-tabs li", function() {
        $(this).find("a > i").removeClass("invisible")
    }).on("mouseleave", ".nav.nav-tabs li", function() {
        $(this).find("a > i").addClass("invisible")
    });
    $("body").on("click", ".nav.nav-tabs li:not(.disabled) i", function(m) {
        m.preventDefault;
        if ($(".nav.nav-tabs li:not(.ui-sortable-placeholder)").length <= 1) {
            return
        }
        var k = $(this),
            h = k.parent("a").parent("li"),
            f = parseInt(k.parent("a").attr("href").replace(/^\D+/g, ""));
        if (!h.hasClass("active")) {
            $('a[href="#tab-' + f + '"]').parent("li").remove();
            $('.tab-content .tab-pane[id="tab-' + f + '"]').remove();
            __f___up__tb_vis();
            __f___up__tb_store();
            setTimeout(function() {
                typeof sortable == "function" && sortable($(".tabs-top > ul.nav"))
            }, 100)
        } else {
            tab___to______delete = f;
            if (k.parent("a").parent("li").prev("li:not(.active)").length) {
                k.parent("a").parent("li").prev("li:not(.active)").find("a").trigger("click")
            } else {
                if (k.parent("a").parent("li").next("li:not(.active)").length) {
                    k.parent("a").parent("li").next("li:not(.active)").find("a").trigger("click")
                }
            }
        }
        return false
    });
    $("body").on("hide.bs.tab", 'a[data-toggle="tab"]', function(f) {
        var h = $(f.target).attr("href").replace(/^\D+/g, "");
        if ($(".__o__f_m-search-results").length) {
            $('.tab-content .tab-pane[id="tab-' + h + '"]').data("searchQuery", $(".__o__f_m-search-results")).data("searchQueryTotal", $(".total").html())
        }
    });
    $("body").on("show.bs.tab", 'a[data-toggle="tab"]', function(f) {
        $(".nav.nav-tabs li").addClass("disabled")
    });
    $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function(n) {
        setTimeout(function() {
            $(".nav.nav-tabs li").removeClass("disabled")
        }, 400);
        var m = $(n.target).attr("href"),
            k = m.replace(/^\D+/g, ""),
            o = $(n.relatedTarget).attr("href"),
            f = o.replace(/^\D+/g, ""),
            h = "_AuthenticThemeTmp" + f;
        $(o).find("form").attr({
            id: "list_form" + h,
            name: "list_form" + h
        });
        $(o).find(".ui_checked_columns").removeClass("ui_checked_columns").addClass("_ui_checked_columns_tmp");
        $.each($(o).find("form *[id]"), function() {
            var s = $(this).attr("id"),
                p = $(this).attr("name"),
                r = s + h,
                q = (p ? (p + h) : false);
            if (s.indexOf("DataTable") === -1) {
                $(this).attr({
                    id: r
                });
                if (p) {
                    $(this).attr({
                        name: q
                    })
                }
            }
        }).promise().done(function() {
            var p = "_AuthenticThemeTmp" + k;
            $(m).find("._ui_checked_columns_tmp").addClass("ui_checked_columns").removeClass("_ui_checked_columns_tmp");
            $(m).find("form").attr({
                id: "list_form",
                name: "list_form"
            });
            $.each($(m).find("form *[id]"), function() {
                var t = $(this).attr("id"),
                    r = $(this).attr("name"),
                    s = t.replace(p, ""),
                    q = (r ? r.replace(p, "") : false);
                if (t.indexOf(p) > -1) {
                    $(this).attr({
                        id: s
                    });
                    if (r) {
                        $(this).attr({
                            name: q
                        })
                    }
                }
            }).promise().done(function() {
                __f__c__m(1);
                if ($(n.target).attr("newly-created") == "1") {
                    $(n.target).removeAttr("newly-created")
                } else {
                    var r = $('.tab-content .tab-pane[id="tab-' + k + '"]').data("searchQuery"),
                        q = $('.tab-content .tab-pane[id="tab-' + k + '"]').data("searchQueryTotal"),
                        t = [];
                    if (r) {
                        t.push(r);
                        t.push(q);
                        $('.tab-content .tab-pane[id="tab-' + k + '"]').removeData("searchQuery").removeData("searchQueryTotal")
                    }
                    __f___up__d("index.cgi?path=" + encodeURIComponentSafe($(m).find("form input#path").val()), false, t)
                }!r && $(".total").html($(".tab-pane.active").data("totalValue"));
                if (typeof tab___is______new != "undefined") {
                    _f__table().DataTable().draw();
                    delete tab___is______new
                } else {
                    __init__dt_ck__e()
                }
                if (typeof tab___to______delete != "undefined") {
                    var s = tab___to______delete;
                    delete tab___to______delete;
                    $('a[href="#tab-' + s + '"]').parent("li").remove();
                    $('.tab-content .tab-pane[id="tab-' + s + '"]').remove()
                }
                __f___us_a()
            })
        })
    });
    $("#searchForm label:first-child").text(lang("theme_xhred_filemanager_search_query"));
    $("#searchForm .form-group").after('		<div class="form-inline">			<div class="form-group">				<label>' + lang("theme_xhred_filemanager_search_match") + '</label>				<br>				<input id="grepstring" name="grepstring" type="text" class="form-control heighter-28">			</div>			<div class="form-group"">				<label>' + lang("theme_xhred_filemanager_search_replace") + '</label>				<br>				<input id="grepreplace" name="grepreplace" type="text" class="form-control heighter-28">			</div>		</div>	');
    var c = $("#searchForm").find("span.awcheckbox");
    c.prev("br").remove();
    c.detach().appendTo($("#searchForm .form-inline"));
    $('#searchDialog input[name="query"]').val("*")
}
___f__tw();
t__cm___init(0, 0, 0, 0, 0, 0, 1);
setTimeout(function() {
    $("." + $__f__rf_s + "").trigger("click");
    t__wi_p.$____loader_block__ = 0;
    __lre()
}, 1200);