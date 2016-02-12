/*!
 * Authentic Theme 17.65 (https://github.com/qooob/authentic-theme)
 * Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
$__theme_name__ = "authentic";
$___________ready = 0;
t___wi = window;
t__wi_p = t___wi.parent;
t___wi.parent.$___________right = 0;
typeof t__wi_p.$___________lrs_r_l == "undefined" ? t__wi_p.$___________lrs_r_l = 0 : false;
if (t___wi.location == t__wi_p.location) {
	t___wi.parent.$___________left = 0
}
typeof t__wi_p.$___________initial == "undefined" ? t__wi_p.$___________initial = 1 : false;
typeof t__wi_p.$___ajax_requested_url == "undefined" ? t__wi_p.$___ajax_requested_url = "_blank" : false;
typeof settings_loader_left == "undefined" ? settings_loader_left = true : false;
typeof settings_mailbox_slash_delimiter == "undefined" ? settings_mailbox_slash_delimiter = true : false;
typeof settings_window_autoscroll == "undefined" ? settings_window_autoscroll = true : false;
typeof settings_right_reload == "undefined" ? settings_right_reload = true : false;
typeof settings_right_default_tab_usermin == "undefined" ? settings_right_default_tab_usermin = "/" : false;
typeof settings_right_virtualmin_default == "undefined" ? settings_right_virtualmin_default = "sysinfo.cgi" : false;
typeof settings_right_cloudmin_default == "undefined" ? settings_right_cloudmin_default = "sysinfo.cgi" : false;
typeof settings_cm_view_palette == "undefined" ? settings_cm_view_palette = "elegant" : false;
typeof settings_cm_editor_palette == "undefined" ? settings_cm_editor_palette = "elegant" : false;
typeof settings_notification_color == "undefined" ? settings_notification_color = "grey" : false;
typeof settings_notification_slider_enabled == "undefined" ? settings_notification_slider_enabled = true : false;
typeof settings_notification_slider_fixed == "undefined" ? settings_notification_slider_fixed = false : false;
typeof settings_thirdparty_filemin_hide_actions == "undefined" ? settings_thirdparty_filemin_hide_actions = true : false;
typeof settings_thirdparty_filemin_hide_toolbar == "undefined" ? settings_thirdparty_filemin_hide_toolbar = true : false;
typeof settings_thirdparty_filemin_hovered_toolbar == "undefined" ? settings_thirdparty_filemin_hovered_toolbar = false : false;
typeof settings_hotkeys_active == "undefined" ? settings_hotkeys_active = true : false;
typeof settings_hotkey_toggle_modifier == "undefined" ? settings_hotkey_toggle_modifier = "altKey" : false;
typeof settings_hotkey_toggle_key_webmin == "undefined" ? settings_hotkey_toggle_key_webmin = "w" : false;
typeof settings_hotkey_toggle_key_virtualmin == "undefined" ? settings_hotkey_toggle_key_virtualmin = "v" : false;
typeof settings_hotkey_toggle_key_cloudmin == "undefined" ? settings_hotkey_toggle_key_cloudmin = "c" : false;
typeof settings_hotkey_toggle_key_usermin == "undefined" ? settings_hotkey_toggle_key_usermin = "u" : false;
typeof settings_hotkey_toggle_key_webmail == "undefined" ? settings_hotkey_toggle_key_webmail = "m" : false;
typeof settings_hotkey_sysinfo == "undefined" ? settings_hotkey_sysinfo = "i" : false;
typeof settings_hotkey_favorites == "undefined" ? settings_hotkey_favorites = "f" : false;
typeof settings_hotkey_focus_search == "undefined" ? settings_hotkey_focus_search = "s" : false;
typeof settings_hotkey_toggle_slider == "undefined" ? settings_hotkey_toggle_slider = "n" : false;
typeof settings_hotkey_reload == "undefined" ? settings_hotkey_reload = "r" : false;
typeof settings_window_replace_timestamps == "undefined" ? settings_window_replace_timestamps = true : false;
typeof settings_window_replaced_timestamps_format_full == "undefined" ? settings_window_replaced_timestamps_format_full = "LLLL" : false;
typeof settings_window_replaced_timestamps_format_short == "undefined" ? settings_window_replaced_timestamps_format_short = "L, h:mm:ss" : false;
typeof settings_hotkey_custom_1 == "undefined" ? settings_hotkey_custom_1 = false : false;
typeof settings_hotkey_custom_2 == "undefined" ? settings_hotkey_custom_2 = false : false;
typeof settings_hotkey_custom_3 == "undefined" ? settings_hotkey_custom_3 = false : false;
typeof settings_hotkey_custom_4 == "undefined" ? settings_hotkey_custom_4 = false : false;
typeof settings_hotkey_custom_5 == "undefined" ? settings_hotkey_custom_5 = false : false;
typeof settings_hotkey_custom_6 == "undefined" ? settings_hotkey_custom_6 = false : false;
typeof settings_hotkey_custom_7 == "undefined" ? settings_hotkey_custom_7 = false : false;
typeof settings_hotkey_custom_8 == "undefined" ? settings_hotkey_custom_8 = false : false;
typeof settings_hotkey_custom_9 == "undefined" ? settings_hotkey_custom_9 = false : false;
typeof settings_right_iconize_header_links == "undefined" ? settings_right_iconize_header_links = true : false;
typeof settings_sysinfo_background_call_timeout == "undefined" ? settings_sysinfo_background_call_timeout = 10 : false;
typeof settings_leftmenu_width == "undefined" ? settings_leftmenu_width = 260 : false;
typeof settings_sysinfo_easypie_charts == "undefined" ? settings_sysinfo_easypie_charts = true : false;
typeof settings_sysinfo_csf_updates == "undefined" ? settings_sysinfo_csf_updates = false : false;
typeof settings_sysinfo_link_mini == "undefined" ? settings_sysinfo_link_mini = true : false;
typeof settings_window_customized_checkboxes_and_radios == "undefined" ? settings_window_customized_checkboxes_and_radios = true : false;
typeof settings_loader_top == "undefined" ? settings_loader_top = true : false;
typeof settings_loader_right == "undefined" ? settings_loader_right = true : false;
typeof settings_animation_left == "undefined" ? settings_animation_left = true : false;
settings_animation_left ? $settings_animation_left_slide_time = 280 : $settings_animation_left_slide_time = 0;
typeof settings_animation_tabs == "undefined" ? settings_animation_tabs = true : false;
settings_animation_tabs ? $settings_animation_tabs_slide_time = 280 : $settings_animation_tabs_slide_time = 0;
typeof settings_favorites == "undefined" ? settings_favorites = true : false;
try {
	t__wi_p.$
} catch (e) {
	t__wi_p = window
}

function n___p__f(b) {
	var a = t__wi_p.$("#wrapper").data("access-level");
	if (a != 0) {
		return
	}
	if (b) {
		t__wi_p.$("body .right-side-tabs-toggler").addClass("hidden");
		t__wi_p.$("body .right-side-tabs").css("right", "0px").addClass("right-side-tabs-fixed");
		t__wi_p.$("html").attr("data-slider-fixed", "1")
	} else {
		t__wi_p.$("body .right-side-tabs-toggler").removeClass("hidden opened").css("right", "0");
		t__wi_p.$("body .right-side-tabs").css("right", "-302px").removeClass("right-side-tabs-fixed");
		t__wi_p.$("html").attr("data-slider-fixed", "0")
	}
}
if (t__wi_p.$(".mobile-menu-toggler:visible").length) {
	n___p__f(0)
}

function __slm() {
	if (t__wi_p.$("aside").css("transform") == "none") {
		t__wi_p.$("aside").transition({
			x: settings_leftmenu_width
		}, 600, function () {
			if (t__wi_p.$(".__logo") && t__wi_p.$(".__logo").css("transform") == "none" && !t__wi_p.$(".mobile-menu-toggler:visible").length) {
				t__wi_p.$(".__logo").transition({
					y: "-140px"
				}, 900)
			}
		});
		setTimeout(function () {
			t__wi_p.$(".switch-toggle").css("display", "table")
		}, 1)
	}
}
__slm();

function arrayIntersect(g, d) {
	var f = [];
	$.each(g, function (b, a) {
		if (d.match(new RegExp(a, "gi"))) {
			f.push(a)
		}
	});
	return !$.isEmptyObject(f)
}

function __lrs(j, g) {
	var h = t__wi_p.document.getElementById("iframe"),
		k = t__wi_p.document.activeElement,
		i = ["export", "export as csv.", "download", "upload"];
	if (k) {
		if (($(k).is("a") && $(k).attr("href") && ($(k).attr("href").indexOf("awstats/view.cgi") > -1 || $(k).attr("href").indexOf("cwaf") > -1))) {
			return
		}
	}
	h ? h = h.contentDocument.activeElement : h = false;
	if (h) {
		if ((t__wi_p.$('iframe[name="page"]').attr("src") !== "/csf/") && (($(h).is("a") && $(h).attr("href") && ($(h).attr("href").indexOf("webminlog.csv") > -1 || $(h).attr("href").indexOf("detach.cgi") > -1 || $(h).attr("href").indexOf("download.cgi") > -1 || ($("body.virtualmin-awstats") && $("body.virtualmin-awstats").length && $(h).attr("href").indexOf("view.cgi?config") > -1))) || ($(h).is("a") && $(h).text() && (arrayIntersect(i, $(h).text()))) || ($(h).is("input") && $(h).val() && (arrayIntersect(i, $(h).val()) || $(h).parents('form[action="create_vpn.cgi"]').length)))) {
			return
		}
	}
	if (t__wi_p.$('iframe[name="page"]').attr("src") && t__wi_p.$('iframe[name="page"]').attr("src").indexOf("cwaf") > -1) {
		return
	}
	typeof j == "undefined" ? j = false : j = true;
	typeof g == "undefined" ? g = 60 : false;
	if (settings_loader_right) {
		t__wi_p.$('iframe[name="page"]').animate({
			opacity: 0
		}, g);
		t__wi_p.$(".loader-container").addClass("loading-started");
		if (((t__wi_p.$("aside").css("transform") == "none" || t__wi_p.$("aside").css("transform") != "matrix(1, 0, 0, 1, " + settings_leftmenu_width + ", 0)") && !t__wi_p.$(".btn-menu-toggler").is(":visible"))) {
			t__wi_p.$(".loader-container").css("background-color", "#ededed").css("display", "block")
		} else {
			t__wi_p.setTimeout(function () {
				if (t___wi.parent.$___________right === 0 && t__wi_p.$___________lrs_r_l === 0) {
					t__wi_p.$___________lrs_r_l = 1;
					if (t__wi_p.$(".loader-container").hasClass("loading-started")) {
						if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
							t__wi_p.NProgress.start()
						}
						t__wi_p.$(".loader-container").css("background-color", "#ededed").css("display", "block")
					}
					t__wi_p.setTimeout(function () {
						t__wi_p.$(".loader .loader-close").show();
						t__wi_p.$___________lrs_r_l = 0
					}, 1500)
				}
			}, 1500)
		}
	} else {
		if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
			t__wi_p.NProgress.start()
		}
	}
}

function product_name_lang(d) {
	if (t__wi_p.$("#wrapper").data("server-manager") != -1) {
		return lang("theme_xhred_titles_cm")
	} else {
		if (t__wi_p.$("#wrapper").data("virtual-server") != -1) {
			return lang("theme_xhred_titles_vm")
		} else {
			if (t__wi_p.$("#wrapper").data("webmail") != -1 && !d) {
				return lang("theme_xhred_titles_mail")
			} else {
				var c = t__wi_p.$("#wrapper").data("product");
				return (c == "webmin" ? lang("theme_xhred_titles_wm") : lang("theme_xhred_titles_um"))
			}
		}
	}
}

function product_name(d) {
	if (t__wi_p.$("#wrapper").data("server-manager") != -1) {
		return "Cloudmin"
	} else {
		if (t__wi_p.$("#wrapper").data("virtual-server") != -1) {
			return "Virtualmin"
		} else {
			if (t__wi_p.$("#wrapper").data("webmail") != -1 && !d) {
				return "Mail"
			} else {
				var c = t__wi_p.$("#wrapper").data("product");
				return c.charAt(0).toUpperCase() + c.slice(1)
			}
		}
	}
}

function __lre() {
	t__wi_p.$(".loader-container").removeClass("loading-started").css("background-color", "transparent").css("display", "none");
	t__wi_p.$('iframe[name="page"]').animate({
		opacity: 1
	}, 30, function () {});
	if (t__wi_p.$("aside").css("transform") == "none") {
		__slm()
	}
	if (__num()) {
		if (typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__dlm == "function") {
			$('iframe[name="page"]').get(0).contentWindow.__dlm()
		}
	}
	t__wi_p.$(".loader .loader-close").hide();
	if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
		t__wi_p.NProgress.done()
	}
	if (typeof hide_mobile_menu == "function") {
		hide_mobile_menu()
	}
}

function ___csf() {
	var r = window,
		o = r.parent,
		t = o.document.getElementById("iframe"),
		k = t.contentDocument.getElementsByTagName("head")[0],
		q = t.contentDocument.createElement("script");
	q.type = "text/javascript";
	q.src = "/unauthenticated/js/package.min.js?1765";
	k.appendChild(q);
	if (o.$('iframe[name="page"]').contents().find("body.csf").length === 0) {
		t.contentWindow.onbeforeunload = function (a) {
			o.__lrs()
		};
		o.$('a[href="csf/"]').parent("li").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().prev("li").addClass("active");
		$csf = o.$('iframe[name="page"]').contents();
		$csf.find("html").attr("data-background-style", o.$("html").attr("data-background-style"));
		$csf.find("head").append('				<link rel="shortcut icon" href="' + $_____link_full + '/images/favicon-webmin.ico">				<meta name="viewport" content="width=device-width, initial-scale=1.0">				<link href="' + $_____link_full + '/unauthenticated/css/package.min.css?1765" rel="stylesheet" type="text/css">			');
		$.each(o.$('link[href*="/styles.css"]'), function () {
			if ($(this)) {
				$csf.find("head").append('<link href="' + $_____link_full + '/unauthenticated/css/styles.css" rel="stylesheet" type="text/css">')
			}
		});
		$csf.find('body:not(".mobile-menu-toggler")').on("click", function () {
			o.hide_mobile_menu()
		});
		$csf.find("style").remove();
		$csf.find("body").addClass("csf").css("background", "#f5f5f5");
		$csf.find("body").wrapInner('<div class="container-fluid col-lg-10 col-lg-offset-1">');
		$csf.find(".container-fluid").wrapInner('<div class="panel panel-default">');
		$csf.find(".panel-default").wrapInner('<div class="panel-body">');
		$csf.find(".panel-default").css("border-color", "#e9e9e9").css("border-top-width", "4px").prepend('<div class="panel-heading" style="text-align:center"><font size="+2">ConfigServer Security & Firewall</font></div>');
		$csf.find(".panel-body > img:first-child, .panel-body > b").remove();
		$csf.find("#CSFajax").css("border", "1px solid #f0f0f0");
		$csf.find("body table").each(function () {
			$(this).addClass("table table-striped table-condensed").removeAttr("style")
		});
		$csf.find("body table tr td, body table tr th").each(function () {
			$(this).removeAttr("style")
		});
		$csf.find("body table tr").each(function () {
			$(this).removeAttr("bgcolor")
		});
		$csf.find(".panel-body > h2:first-child").each(function () {
			$(this).text($(this).text().replace(":", ""))
		});
		$csf.find(".csf table.table-striped.table-condensed th").each(function () {
			if ($(this).html() == "Time To Live") {
				$(this).css("min-width", "100px")
			}
			if ($(this).html() == "&nbsp;") {
				$(this).css("min-width", "70px")
			}
		});

		function m() {
			$csf.find("#CSFajax").css("max-height", $(window).outerHeight() - $(window).outerHeight() / 2.4 + "px");
			container_fluid_size()
		}
		var l;
		$(window).resize(function () {
			clearTimeout(l);
			l = setTimeout(function () {
				m()
			}, 1000)
		});
		m();
		$csf.find(".csf table.table-striped.table-condensed tbody > tr > td > p").each(function () {
			if ($(this).text().indexOf("Your Score") >= 0) {
				$(this).next("p").remove();
				$(this).next("table").remove();
				$(this).next("table").remove();
				$(this).next("p").css("text-align", "center")
			}
		});
		if ($csf.find(".csf h2").text().indexOf("Ports listening for external connections and the executables running behind them") !== -1) {
			$csf.find("table").each(function () {
				if (!$(this).find("thead").length) {
					var b = $(this),
						a = $(this).find("tbody tr:first-child");
					b.attr("style", "width: 100% !important");
					b.attr("style", "min-width: 100% !important");
					b.prepend("<thead>" + a.html() + "</thead>");
					$(this).find("thead td").replaceTagName("th");
					a.remove();
					$(this).dataTable({
						order: [],
						aaSorting: [],
						bDestroy: true,
						bPaginate: false,
						bInfo: false,
						destroy: true,
						oLanguage: {
							sSearch: " "
						}
					});
					$csf.find(".dataTables_filter input").attr("placeholder", "Filter")
				}
			})
		}
		if ($csf.find(".csf .table.table-striped.table-condensed tbody th:eq(1)").text().indexOf("A/D") !== -1 && $csf.find(".csf .table.table-striped.table-condensed tbody th:eq(2)").text().indexOf("IP address") !== -1) {
			$csf.find("table").each(function () {
				if (!$(this).find("thead").length) {
					var b = $(this),
						a = $(this).find("tbody tr:first-child");
					b.prepend("<thead>" + a.html() + "</thead>");
					a.remove();
					$(this).dataTable({
						order: [],
						aaSorting: [],
						bDestroy: true,
						bPaginate: false,
						bInfo: false,
						destroy: true,
						oLanguage: {
							sSearch: " "
						}
					});
					b.find('img[src^="csfimages/"]').each(function () {
						$(this).attr("src", $(this).attr("src").replace("/csfimages/", "csfimages/"))
					});
					$csf.find(".dataTables_filter input").attr("placeholder", "Filter")
				}
			})
		}
		$csf.find(".csf td.section-gap:first-child").each(function () {
			$(this).parent("tr:first-child").remove();
			$(this).parent("tr:last-child").remove()
		});
		$csf.find(".csf td.section-title").each(function () {
			$(this).parent("tr").prev("tr").find("td.section-gap").parent("tr").remove();
			$(this).parent("tr").prev("tr").find("td.section-gap").parent("tr").remove()
		});
		$csf.find('.csf input[type="text"]').each(function () {
			if ($(this).attr("id") == "allowip") {
				$(this).removeAttr("style").attr("style", "border-color: #8cac8c; background-color: #93b893;")
			}
			if ($(this).attr("style") == "background-color: pink") {
				$(this).removeAttr("style").attr("style", "color: #fff; border-color: #d4a09f; background-color: #e0a9a8;")
			}
			if ($(this).attr("id") == "ignoreip") {
				$(this).removeAttr("style").attr("style", "border-color: #b3dae5; background-color: #bfd9e1;")
			}
		});
		$csf.find("body table tr th").each(function () {
			if (!$(this).parents("tbody").find("form").length && $(this).text().indexOf("Upgrade") >= 0) {
				$(this).parents("table").prev("br").remove();
				$(this).parents("table").remove()
			}
		});
		$csf.find(".csf pre").each(function () {
			if ($(this).text().indexOf("csf: v") >= 0 && $(this).text().match(/((?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+))$/)) {
				$csf_version = $(this).text().match(/((?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+))$/)[0];
				$(this).remove()
			}
		});
		$csf.find('a[href$="/csf/changelog.txt"]').addClass("btn btn-xs btn-default").attr("style", "padding:0 12px; height:19px;font-size:11px").text("View changelog");
		$csf.find(".csf .panel-heading font").each(function () {
			if ($(this).text().indexOf("ConfigServer Security & Firewall") >= 0) {
				$(this).html('<font size="+2">Firewall</font><span style="font-size:14px;display:block">ConfigServer Security & Firewall version ' + $csf_version + "</span>")
			}
		});
		$csf.find('table > tbody > tr:first-child > th:first-child, table[align="center"] > tbody > tr:first-child').each(function () {
			$(this).css("border-top", "3px solid #f0f0f0")
		});
		$csf.find('table[align="center"] > tbody > tr > td.section-title').each(function () {
			$(this).parent("tr").css("border-top", "3px solid #f0f0f0")
		});
		typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
		$csf.find("div.panel-body p:last-child").each(function () {
			if ($(this).text().indexOf("2006-20") >= 0) {
				if ($hostname == settings_allowed_hostname) {
					$(this).remove();
					$csf.find(".csf td").each(function () {
						if ($(this).text().indexOf("able to provide this and other products") >= 0) {
							$(this).parents("table").remove()
						}
					})
				} else {
					$(this).css("font-size", "12px").css("margin-top", "12px")
				}
			}
		});
		$csf.find('big:contains("iptables logs")').parent("p").next().next().next(".table.table-striped.table-condensed").find("tbody tr:nth-child(2) td:first-child").css("min-width", "200px");
		if ($csf.find('.csf select[name="dur"]')[0]) {
			var n = $csf.find('.csf select[name="dur"]')[0].nextSibling;
			if (n.nodeValue == ".") {
				$(n).remove()
			}
		}
		$csf.find('.csf select:not([name="do"], [name="dur"]), .csf input:not([name="comment"], [name="ip"], [name="ports"], [name="timeout"], [aria-controls*="DataTables_Table_"])').each(function () {
			$(this).addClass("heighter-34")
		});
		$csf.find(".csf #paginatediv2.paginationstyle > select").each(function () {
			$(this).attr("style", "vertical-align: baseline !important")
		});
		$csf.find(".csf #paginatediv2 > a").each(function () {
			$(this).attr("style", "vertical-align: baseline !important")
		});
		$csf.find(".csf p > select").each(function () {
			$(this).attr("style", "vertical-align: baseline !important")
		});
		$csf.find('img[src="csfimages/loader.gif"]').each(function () {
			$(this).attr("src", "" + $_____link_full + "/images/loader-horizontal.gif").css("margin-left", "10px")
		});
		$csf.find(".paginationstyle a").each(function () {
			$(this).addClass("btn btn-default")
		});
		$csf.find('img[src^="lfd_"], img[src^="/csf/lfd_"]').each(function () {
			$(this).parents("table").removeClass("table-striped")
		});
		$csf.find('img[src^="csfimages/delete.png"]').each(function () {
			$(this).replaceWith('<i class="fa fa-unlock text-success" style="font-size: 1.1em; vertical-align: middle;"></i>')
		});
		$csf.find('img[src^="csfimages/perm.png"]').each(function () {
			$(this).replaceWith('<i class="fa fa-lock text-danger" style="font-size: 1.1em; vertical-align: middle;"></i>')
		});
		$csf.find(".csf fieldset legend b").each(function () {
			if ($(this).text().indexOf("Edit ConfigServer Firewall") >= 0) {
				$submit_changes = $csf.find('input[value="Change"]');
				$submit_changes.addClass("csf-submit_changes");
				$submit_changes.on("click", function () {
					$csf.find('input[value="saveconf"]').parent("form").submit()
				})
			}
		});

		function p() {
			$csf.find('textarea[name="formdata"]').each(function (c, d) {
				var a = $(this);
				$parent_width = a.parent("td").width();
				var b = o.$('iframe[name="page"]').get(0).contentWindow.CodeMirror.fromTextArea(d, {
					mode: {
						name: "rpm-spec"
					},
					tabMode: "indent",
					matchBrackets: true,
					lineNumbers: true,
					lineWrapping: true,
					indentUnit: 0,
					theme: settings_cm_editor_palette
				});
				$window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2));
				b.setSize($parent_width, $window_height);
				$(window).resize(function () {
					$parent_width = a.parent("td").width();
					$window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2));
					b.setSize($parent_width, $window_height)
				})
			})
		}
		setTimeout(function () {
			if (typeof o.$('iframe[name="page"]').get(0).contentWindow.CodeMirror == "function") {
				p()
			} else {
				setTimeout(function () {
					if (typeof o.$('iframe[name="page"]').get(0).contentWindow.CodeMirror == "function") {
						p()
					} else {
						setTimeout(function () {
							p()
						}, 10)
					}
				}, 140)
			}
		}, 50);
		$("#iframe").contents().find("body").on("keydown", function (a) {
			o.search_control(a);
			o.shortcut_control(a)
		});
		if (o.$("#open_webmin").length > 0 && o.$(".switch-toggle input:checked").attr("id") != "open_webmin" && t__wi_p.$("body").data("dashboard") == "1") {
			o.t__s("open_webmin")
		}
		o.__dlm("csf/");
		if (o.$___________initial === 1) {
			setTimeout(function () {
				o.__lre()
			}, 400)
		} else {
			setTimeout(function () {
				o.__lre()
			}, 250)
		}
		setTimeout(function () {
			if (!o.$('ul.sub li.sub_active a[target="page"][href="csf/"]').length) {
				o.__dlm("csf/")
			}
		}, 200)
	}
}

function f__r__s(b, a) {
	t__wi_p.$("#injected-css").remove();
	a ? (a = "translate(" + a + "px, 0px) !important") : (a = false);
	$.injectCSS({
		"#sidebar": {
			left: -b + "px",
			width: b + "px",
			transform: a
		},
		".switch-toggle": {
			width: b + "px"
		},
		"#content.__page": {
			"margin-left": b + "px"
		},
		".autocomplete-suggestions": {
			"min-width": (b - 23) + "px !important"
		},
		".__logo": {
			width: b + "px",
			"max-width": b + "px"
		}
	});
	if (t__wi_p.$("aside select").length) {
		t__wi_p.$("aside select[data-autocomplete-title]").attr("style", "width:" + (b - 24) + "px; margin-top: 0 !important");
		t__wi_p.t_sel_i()
	}
}

function f__c_view() {
	if (typeof t__wi_p.settings_leftmenu_width_initial == "undefined") {
		t__wi_p.settings_leftmenu_width_initial = t__wi_p.settings_leftmenu_width
	}
	if (window.matchMedia("(max-width: 767px)").matches) {
		t__wi_p.settings_leftmenu_width = 260;
		t__wi_p.f__r__s(t__wi_p.settings_leftmenu_width, 0)
	} else {
		if (t__wi_p.$___________initial === 1) {
			return
		}
		t__wi_p.settings_leftmenu_width = t__wi_p.settings_leftmenu_width_initial;
		t__wi_p.f__r__s(t__wi_p.settings_leftmenu_width, t__wi_p.settings_leftmenu_width)
	}
}

function s(d) {
	var g = document.getElementsByTagName("head")[0];
	var f = document.createElement("script");
	f.type = "text/javascript";
	f.src = d;
	g.appendChild(f)
}
t__wi_p.$('iframe[name="page"]').unbind("load");
t__wi_p.$('iframe[name="page"]').on("load", function () {
	if (t__wi_p.$___________initial === 1) {
		__mss()
	}
	var c = t__wi_p.$('iframe[name="page"]').contents();
	if (c && c.find('iframe[name="page"]').length) {
		console.log("Error! Entered fail state.. Authentic Theme is reloading...");
		t___wi.top.location.reload();
		return
	}
	var d = false;
	if (c && c.find("title").text() && c.find("title").text().indexOf("ConfigServer Security & Firewall") > -1) {
		d = true
	}
	if (__num() && !d) {
		t__wi_p.__lre()
	}
	if ($("body").find(".form-signin-banner").length === 1 || $("body").find('form[action*="session_login"]').length === 1) {
		t__wi_p.location = t___wi.location.origin
	}
	____iframe___ = t__wi_p.$("#iframe")[0];
	____iframe___ && ____iframe___.contentWindow.focus();
	$("body").on("shown.bs.modal", ".modal.in", function () {
		$(this).focus()
	});
	setTimeout(function () {
		t__m__m(false, true);
		t__wi_p.$___________m_locked = 0
	}, 200);
	setTimeout(function () {
		t__wi_p.$___________initial = 0
	}, 1000);
	$("body").find('a[href*="virtual-server/switch_user.cgi"]').attr("target", "_parent");
	if (c && !c.text().match(/___authentic_theme_footer___/)) {
		if (d) {
			t__wi_p.___csf();
			return
		}
		__lre();
		s("/unauthenticated/js/authentic.min.js?1765")
	}
	if (settings_loader_top && t__wi_p.t___p__xhr_l === 0) {
		t__wi_p.NProgress.done()
	}
	if (typeof t__wi_p.__dpt == "function") {
		t__wi_p.__dpt()
	}
	t___wi.parent.$___________right = 1
});
$(function () {
	if ($("html.session_login").length) {
		if (t__wi_p.$("aside").length) {
			t__wi_p.location.href = "/"
		}
		$("form").on("click", 'button[type="submit"]', function (b) {
			b.preventDefault();
			$(this).prop("disabled", "true").removeClass("btn-primary").addClass("btn-default").find(".fa-sign-in").removeClass("fa-sign-in").addClass("fa fa-circle-o-notch faa-spin faa-slow animated");
			$(this).parents("form").submit()
		})
	}
	if (t___wi.location == t__wi_p.location && window.matchMedia("(max-width: 767px)").matches) {
		f__c_view()
	}
	if (typeof $access_level != "undefined" && $access_level != 0) {
		settings_right_virtualmin_default = "sysinfo.cgi";
		settings_right_cloudmin_default = "sysinfo.cgi"
	}
	$___________ready = 1
});

function __num() {
	var d = $.url(t___wi.location),
		c = d.attr("path");
	if ((c && c.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-webmin-theme") || (c && c.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?downloading-webmin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?downloading-webmin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?updating-usermin-theme") || (c && c.indexOf("/usermin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-usermin-theme") || (c && c.indexOf("/usermin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?downloading-usermin-theme") || (c && c.indexOf("/usermin/install_theme.cgi") > -1 && t__wi_p.location.search == "?downloading-usermin-theme") || (c && c.indexOf("/webmin/install_theme.cgi") > -1 && t__wi_p.location.search == "?theme-update-finished") || (c && c.indexOf("/webmin/edit_webmincron.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollect-system-status" || t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting-system-status")) || (c && c.indexOf("/webmin/delete_webmincron.cgi") > -1 && (t__wi_p.location.search == "?recollecting-system-status" || t__wi_p.location.search == "?recollect-system-status" || t__wi_p.location.search == "?recollect-finished" || t__wi_p.location.search == "?recollecting-finished" || t__wi_p.location.search == "?recollecting-package-updates")) || (c && c.indexOf("/package-updates/index.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollecting-package-updates" || t__wi_p.location.search == "?recollecting-package-updates-processing")) || (c && c.indexOf("/package-updates/update.cgi") > -1 && (t__wi_p.location.search == "?recollect" || t__wi_p.location.search == "?recollecting" || t__wi_p.location.search == "?recollecting-package-updates" || t__wi_p.location.search == "?recollecting-package-updates-processing" || t__wi_p.location.search == "?recollecting-finished"))) {
		return false
	} else {
		return true
	}
}
var $__was = function () {
	var d = $.url(t___wi.location),
		c = d.attr("path");
	if (c && c.indexOf("/webmin_search.cgi") > -1 || c.indexOf("/virtual-server/import.cgi") > -1 || c.indexOf("/virtual-server/domain_setup.cgi") > -1 || c.indexOf("/virtual-server/mass_create.cgi") > -1 || c.indexOf("/virtual-server/restore.cgi") > -1 || c.indexOf("/virtual-server/mass_domains_change.cgi") > -1 || c.indexOf("/virtual-server/save_domain.cgi") > -1 || c.indexOf("/virtual-server/save_phpmode.cgi") > -1 || c.indexOf("/virtual-server/migrate.cgi") > -1 || c.indexOf("/virtual-server/mass_delete_domains.cgi") > -1 || c.indexOf("/virtual-server/delete_domain.cgi") > -1 || c.indexOf("/virtual-server/clone.cgi") > -1 || c.indexOf("/virtual-server/disable_domain.cgi") > -1 || c.indexOf("/virtual-server/edit_newlinks.cgi") > -1 || c.indexOf("/virtual-server/move.cgi") > -1 || c.indexOf("/virtual-server/enable_domain.cgi") > -1 || c.indexOf("/virtual-server/transfer.cgi") > -1 || c.indexOf("/virtual-server/rename.cgi") > -1 || c.indexOf("/virtual-server/check.cgi") > -1 || c.indexOf("/virtual-server/postsave.cgi") > -1 || c.indexOf("/virtual-server/unalias.cgi") > -1 || c.indexOf("/virtual-server/unsub.cgi") > -1 || c.indexOf("/server-manager/edit_serv.cgi") > -1 || c.indexOf("/server-manager/save_serv.cgi") > -1 || c.indexOf("/server-manager/mass.cgi") > -1 || c.indexOf("/server-manager/index.cgi") > -1 || c.indexOf("/server-manager/save_limits.cgi") > -1 || c.indexOf("/server-manager/save_pass.cgi") > -1 || c.indexOf("/server-manager/list_ifaces.cgi") > -1 || c.indexOf("/server-manager/mass_update.cgi") > -1 || c.indexOf("/server-manager/get_images.cgi") > -1 || c.indexOf("/server-manager/boot.cgi") > -1 || c.indexOf("/server-manager/save_ec2address.cgi") > -1 || c.indexOf("/server-manager/mass_move.cgi") > -1 || c.indexOf("/server-manager/edit_newlinks.cgi") > -1 || c.indexOf("/server-manager/move.cgi") > -1 || c.indexOf("/server-manager/list_gces.cgi") > -1 || c.indexOf("/server-manager/list_ec2s.cgi") > -1 || c.indexOf("/server-manager/failover.cgi") > -1 || c.indexOf("/server-manager/reset.cgi") > -1 || c.indexOf("/server-manager/unpause.cgi") > -1 || c.indexOf("/server-manager/find.cgi") > -1 || c.indexOf("/server-manager/pause.cgi") > -1) {
		$("html").data("data-pagescroll", true)
	}
	if (($("pre") && $("pre").length > 0 && $("pre").length <= 2) || $("html").data("data-pagescroll") === true) {
		if (__num()) {
			__lre()
		}
		$("body").unbind("mousewheel");
		t___wi.clearInterval($__was_runner);
		refresh = function () {
			$("body, html").animate({
				scrollTop: $(document).height()
			}, 200)
		};
		refresher = t___wi.setInterval(refresh, 201);
		setTimeout(function () {
			$("body").bind("mousewheel", function (b) {
				if (typeof refresher != "undefined") {
					t___wi.clearInterval(refresher)
				}
				delete refresh;
				delete refresher;
				delete $__was_runner;
				$("body").unbind("mousewheel");
				$(this).off()
			})
		}, 0)
	}
};
if (t___wi.location == t__wi_p.location) {
	t__wi_p.f__r__s(settings_leftmenu_width, 0);
	t__wi_p.f__c_view()
}
if (settings_window_autoscroll && t___wi.location != t__wi_p.location) {
	$__was_runner = t___wi.setInterval($__was, 201)
};
