/*!
 * Authentic Theme 17.03 (https://github.com/qooob/authentic-theme)
 * Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
;
try {
	t__wi_p.$
} catch (e) {
	t__wi_p = window
}
var $_url = $.url(t___wi.location),
	$__source_protocol = $_url.attr("protocol"),
	$__source_port = $_url.attr("port"),
	$__source_url = $_url.attr("source"),
	$__source_path = $_url.attr("path"),
	$___source_path = $_url.attr("path").replace(/^\//g, "").replace(/\/$/g, ""),
	$__source_file = $_url.attr("file"),
	$__source_dir = $_url.attr("directory"),
	$___source_dir = $_url.attr("directory").replace(/^\//g, "").replace(/\/$/g, ""),
	$__source_query = $_url.attr("query"),
	$source_path = $_url.attr("path").replace(/^\//g, ""),
	$__host_url = $_url.attr("host"),
	$__current_directory = $_url.attr("directory"),
	$__relative_url = $_url.attr("relative"),
	$___relative_url = $_url.attr("relative").replace(/^\//g, "").replace(/\/$/g, ""),
	$current_page = $_url.attr("path").replace(/^\//g, "").replace(/\/\//g, "/"),
	$current_directory = $__current_directory.replace(/^\//g, ""),
	$current_page_full = $_url.attr("path").replace(/\/\//g, "/"),
	$webprefix = $("body").data("webprefix"),
	$webprefix_full = "",
	$__source_host_complete = ($__source_protocol + "://" + $__host_url + ($__source_port ? ":" : "") + $__source_port + ("/" + $webprefix + $__source_path)).replace(/\/\//g, "/"),
	$access_level = t__wi_p.$("#wrapper").data("access-level"),
	$hostname = t__wi_p.$("#wrapper").data("hostname"),
	$t_uri_virtualmin = t__wi_p.location.search == "?virtualmin" ? 1 : 0,
	$t_uri_cloudmin = t__wi_p.location.search == "?cloudmin" ? 1 : 0,
	$t_uri_webmail = t__wi_p.location.search == "?mail" ? 1 : 0,
	$t_uri_dashboard = t__wi_p.location.search == "?dashboard" ? 1 : 0;
if ($webprefix) {
	$webprefix = ($webprefix + "/").replace(/\/\//g, "/");
	$webprefix_full = $webprefix;
	$webprefix_full = ($webprefix_full.replace(/\/$/g, "")).replace(/\/\//g, "/");
	if (!$webprefix_full.substr(0, 1) == "/") {
		$webprefix_full = "/" + $webprefix_full
	}
	if ($webprefix.substr(-1) == "/") {
		$webprefix = $webprefix.substr(0, $webprefix.length - 1)
	}
}
if ($current_page_full && $current_page_full.indexOf("/servers/link.cgi/") > -1) {
	$____link = $current_page_full.split("/");
	if (/^\d+$/.test($____link[3])) {
		$_____link = $____link[1] + "/" + $____link[2] + "/" + $____link[3];
		$webprefix = $webprefix + $_____link + "/";
		$webprefix_full = $webprefix_full + "/" + $_____link;
		$_____link = $webprefix;
		$_____link_full = $webprefix_full
	} else {
		$_____link = $webprefix;
		$_____link_full = (("/" + $webprefix.replace(/\/$/g, "")).replace(/\/\//g, "/")).replace(/\/$/g, "")
	}
} else {
	$_____link = $webprefix;
	$_____link_full = (("/" + $webprefix.replace(/\/$/g, "")).replace(/\/\//g, "/")).replace(/\/$/g, "")
}
if ($__source_host_complete.substr(-1) == "/") {
	$__source_host_complete = $__source_host_complete.substr(0, $__source_host_complete.length - 1)
}

function prt(b) {
	return console.log(b)
}(function (b) {
	b.fn.replaceTagName = function (p) {
		var o = [],
			n = this.length;
		while (n--) {
			var l = document.createElement(p),
				a = this[n],
				q = a.attributes;
			for (var r = q.length - 1; r >= 0; r--) {
				var m = q[r];
				l.setAttribute(m.name, m.value)
			}
			l.innerHTML = a.innerHTML;
			b(a).after(l).remove();
			o[n - 1] = l
		}
		return b(o)
	}
})(t___wi.jQuery);

function array_swap(g) {
	var f = {};
	for (var d in g) {
		f[g[d]] = d
	}
	return f
}

function dblrclick(g) {
	var d = 0,
		f = false;
	return function (a) {
		if (f) {
			clearTimeout(d);
			f = false;
			return g.apply(this, arguments)
		} else {
			f = true;
			d = setTimeout(function () {
				f = false
			}, 300)
		}
	}
}

function tab_action(d, c) {
	if (document.forms[0] && document.forms[0][d]) {
		document.forms[0][d].value = c
	}
}

function parse_bool(b) {
	return !(/^(false|0)$/i).test(b) && !!b
}
$(function () {
	var b;
	setInterval(function () {
		if (b == 0) {
			$(".blinking-default").css("color", "#333");
			b = 1
		} else {
			if (b = 1) {
				$(".blinking-default").css("color", "crimson");
				b = 0
			}
		}
	}, 900)
});

function t__lo__btn_md() {
	return '<span class="cspinner in-btn-md" style="position: relative"><span class="cspinner-icon white" style="width:12px; height:12px; margin-right: 7px;"></span></span>'
}

function get_selected_text() {
	if (t___wi.getSelection) {
		return t___wi.getSelection().toString()
	} else {
		if (document.selection) {
			return document.selection.createRange().text
		}
	}
	return ""
}

function loaders_dismiss() {
	if (settings_hotkeys_active) {
		$(window).on("keydown", function (b) {
			if (!b.ctrlKey && b.keyCode == 27 && t__wi_p.$(".loader-container").is(":visible")) {
				b.preventDefault();
				b.stopPropagation();
				t__wi_p.__lre()
			}
			if (b.ctrlKey && b.keyCode == 27 && t__wi_p.$("#_menu_loader").length) {
				b.preventDefault();
				b.stopPropagation();
				t__wi_p.__lle()
			}
		})
	}
}

function modal_dismiss() {
	$(".modal.in").find("[data-dismiss]").trigger("click")
}

function search_control(b) {
	if (settings_hotkeys_active) {
		if (!(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_focus_search && b[settings_hotkey_toggle_modifier])) {
			return true
		}
		b.preventDefault();
		$search = t__wi_p.$(".form-control.sidebar-search").focus();
		return false
	}
}

function access_level() {
	return t__wi_p.$("body").data("level")
}

function dashboard_switch() {
	if (t__wi_p.$("body").data("dashboard") == "1") {
		return true
	} else {
		return false
	}
}

function dashboard_switch_set() {
	t__wi_p.t__s("open_dashboard");
	t__wi_p.__cms();
	t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi")
}

function messenger(d, g, f) {
	t__wi_p.Messenger().post({
		message: d,
		hideAfter: g,
		showCloseButton: true,
		type: f
	})
}

function shortcut_control(b) {
	if (settings_hotkeys_active) {
		if (!(String.fromCharCode(b.which) == "1" && settings_hotkey_custom_1 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "2" && settings_hotkey_custom_2 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "3" && settings_hotkey_custom_3 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "4" && settings_hotkey_custom_4 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "5" && settings_hotkey_custom_5 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "6" && settings_hotkey_custom_6 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "7" && settings_hotkey_custom_7 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "8" && settings_hotkey_custom_8 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which) == "9" && settings_hotkey_custom_9 && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_favorites && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_sysinfo && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_reload && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_webmail && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_usermin && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_cloudmin && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_virtualmin && b[settings_hotkey_toggle_modifier]) && !(String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_webmin && b[settings_hotkey_toggle_modifier])) {
			return true
		}
		if (String.fromCharCode(b.which) == "1" && settings_hotkey_custom_1) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_1)
		}
		if (String.fromCharCode(b.which) == "2" && settings_hotkey_custom_2) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_2)
		}
		if (String.fromCharCode(b.which) == "3" && settings_hotkey_custom_3) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_3)
		}
		if (String.fromCharCode(b.which) == "4" && settings_hotkey_custom_4) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_4)
		}
		if (String.fromCharCode(b.which) == "5" && settings_hotkey_custom_5) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_5)
		}
		if (String.fromCharCode(b.which) == "6" && settings_hotkey_custom_6) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_6)
		}
		if (String.fromCharCode(b.which) == "7" && settings_hotkey_custom_7) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_7)
		}
		if (String.fromCharCode(b.which) == "8" && settings_hotkey_custom_8) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_8)
		}
		if (String.fromCharCode(b.which) == "9" && settings_hotkey_custom_9) {
			b.preventDefault();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + settings_hotkey_custom_9)
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_webmin && t__wi_p.$('.switch-toggle input[id="open_webmin"]') && !t__wi_p.$('.switch-toggle input[id="open_webmin"]').is(":checked") && (product_name() != "Usermin" && product_name() != "Mail")) {
			b.preventDefault();
			t__wi_p.$('.switch-toggle input[id="open_webmin"]').trigger("click")
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_virtualmin && t__wi_p.$('.switch-toggle input[id="open_virtualmin"]') && !t__wi_p.$('.switch-toggle input[id="open_virtualmin"]').is(":checked") && (product_name() != "Usermin" && product_name() != "Mail")) {
			b.preventDefault();
			t__wi_p.$('.switch-toggle input[id="open_virtualmin"]').trigger("click")
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_cloudmin && t__wi_p.$('.switch-toggle input[id="open_cloudmin"]') && !t__wi_p.$('.switch-toggle input[id="open_cloudmin"]').is(":checked") && (product_name() != "Usermin" && product_name() != "Mail")) {
			b.preventDefault();
			t__wi_p.$('.switch-toggle input[id="open_cloudmin"]').trigger("click")
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_usermin && t__wi_p.$('.switch-toggle input[id="open_usermin"]') && !t__wi_p.$('.switch-toggle input[id="open_usermin"]').is(":checked") && (product_name() != "Webmin" && product_name() != "Virtualmin" && product_name() != "Cloudmin")) {
			b.preventDefault();
			t__wi_p.$('.switch-toggle input[id="open_usermin"]').trigger("click")
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_toggle_key_webmail && t__wi_p.$('.switch-toggle input[id="open_webmail"]') && !t__wi_p.$('.switch-toggle input[id="open_webmail"]').is(":checked") && (product_name() != "Webmin" && product_name() != "Virtualmin" && product_name() != "Cloudmin")) {
			b.preventDefault();
			t__wi_p.$('.switch-toggle input[id="open_webmail"]').trigger("click")
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_reload && t__wi_p.$('.user-links a[data-refresh="true"]')) {
			b.preventDefault();
			if (t__wi_p.$('iframe[name="page"]') && t__wi_p.$('iframe[name="page"]').attr("src") && t__wi_p.$('iframe[name="page"]').attr("src").indexOf("filemin") > -1) {
				if (t__wi_p.$('iframe[name="page"]').contents()) {
					t__wi_p.$('iframe[name="page"]').contents().find(".btn-group i.fa-refresh").parent("button").trigger("click")
				}
			} else {
				t__wi_p.$('.user-links a[data-refresh="true"]').trigger("click")
			}
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_sysinfo) {
			b.preventDefault();
			if (dashboard_switch() == true) {
				dashboard_switch_set()
			} else {
				t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi")
			}
		}
		if (String.fromCharCode(b.which).toLowerCase() == settings_hotkey_favorites) {
			b.preventDefault();
			if (settings_favorites) {
				if ($(".favorites-menu-outer").css("left") != "0px") {
					$(".user-link.favorites").trigger("click")
				} else {
					t__wi_p.$(".favorites-menu-outer").removeClass("hover")
				}
			}
		}
		return false
	}
}

function right_module_title() {
	$_right_menu_title = t__wi_p.$('iframe[name="page"]').contents().find("#headln2c");
	if ($_right_menu_title.find("font").text().length) {
		return $_right_menu_title.find("font").text()
	} else {
		if ($_right_menu_title.text().length) {
			return $_right_menu_title.text().text()
		} else {
			return "->"
		}
	}
}

function t__s(b) {
	t__wi_p.$('.switch-toggle input:not([id="' + b + '"])').each(function () {
		$(this).removeAttr("checked")
	}).promise().done(function () {
		t__wi_p.$("#" + b).prop("checked", true)
	});
	if (b == "open_webmin" || b == "open_usermin") {
		t__wi_p.history.pushState(null, null, $_____link_full + "/");
		t__wi_p.$("#wrapper").data("virtual-server", -1);
		t__wi_p.$("#wrapper").data("server-manager", -1);
		t__wi_p.$("#wrapper").data("webmail", -1)
	} else {
		if (b == "open_dashboard") {
			t__wi_p.history.pushState(null, null, $_____link_full + "/?dashboard");
			t__wi_p.$("#wrapper").data("virtual-server", -1);
			t__wi_p.$("#wrapper").data("server-manager", -1);
			t__wi_p.$("#wrapper").data("webmail", -1)
		} else {
			if (b == "open_virtualmin") {
				t__wi_p.history.pushState(null, null, $_____link_full + "/?virtualmin");
				t__wi_p.$("#wrapper").data("virtual-server", 2);
				t__wi_p.$("#wrapper").data("server-manager", -1);
				t__wi_p.$("#wrapper").data("webmail", -1)
			} else {
				if (b == "open_cloudmin") {
					t__wi_p.history.pushState(null, null, $_____link_full + "/?cloudmin");
					t__wi_p.$("#wrapper").data("virtual-server", -1);
					t__wi_p.$("#wrapper").data("server-manager", 2);
					t__wi_p.$("#wrapper").data("webmail", -1)
				} else {
					if (b == "open_webmail") {
						t__wi_p.history.pushState(null, null, $_____link_full + "/?mail");
						t__wi_p.$("#wrapper").data("virtual-server", -1);
						t__wi_p.$("#wrapper").data("server-manager", -1);
						t__wi_p.$("#wrapper").data("webmail", 2)
					}
				}
			}
		}
	}
}

function hide_mobile_menu() {
	if (t__wi_p.$(".mobile-menu-toggler:visible").length && $(".mobile-menu-toggler").attr("style") && $(".mobile-menu-toggler").attr("style").indexOf("ease") == -1) {
		if (t__wi_p.$(".__logo")) {
			t__wi_p.$(".__logo").transition({
				y: 0
			}, 1000)
		}
		t__wi_p.$("aside, .mobile-menu-toggler").transition({
			x: 0
		}, 300, function () {
			t__wi_p.$(".mobile-menu-toggler").removeClass("selected").find("button").removeClass("btn-primary").addClass("btn-primary");
			t__wi_p.$(".switch-toggle").css("display", "none");
			t__wi_p.$("aside").addClass("hidden-xs")
		})
	}
}

function t_sel_i() {
	if (t__wi_p.$("aside select").length) {
		t__wi_p.$("aside select").removeAttr("onchange disabled");
		t__wi_p.$("aside select").data("select2") ? t__wi_p.$("aside select").select2("destroy") : false;
		t__wi_p.$("aside select").unbind("select2:select");
		t__wi_p.$("aside select").select2({
			minimumResultsForSearch: 5
		});
		$create_link = $('a.navigation_module_trigger[data-href^="/virtual-server/domain_form.cgi?generic=1&amp;gparent="]');
		if (!$.url($create_link.data("href")).param("gparent")) {
			$create_link.data("href", $create_link.data("href") + t__wi_p.$("aside select").val())
		}
		t__wi_p.$("aside select").on("select2:select", function (b) {
			if (b.currentTarget.id === "dom") {
				t__vm_l(b.currentTarget.value);
				t_vm_r(b.currentTarget.value)
			} else {
				if (b.currentTarget.id === "sid") {
					t__cm_l(b.currentTarget.value);
					t_cm_r(b.currentTarget.value)
				}
			}
		});
		$.each($("select > option"), function () {
			if ($(this).attr("style") && $(this).attr("style").indexOf("italic") > -1) {
				if ($(".select2-selection > .select2-selection__rendered").text().trim() == $(this).text().trim()) {
					$(".select2-selection > .select2-selection__rendered").attr("style", "color: #f95753 !important; font-style:italic !important; ")
				}
			}
		});
		t__wi_p.$("aside select").on("select2:open", function (b) {
			$.each($("select > option"), function () {
				if ($(this).attr("style") && $(this).attr("style").indexOf("italic") > -1) {
					$("body").find('li[id$="' + $(this).attr("value") + '"]').attr("style", "color: #e8433f !important; font-style:italic !important; ")
				}
			})
		});
		if (t__wi_p.$("aside select option").size() - 1 === 0) {
			t__wi_p.$(".select2 span").css("cursor", "default");
			t__wi_p.$(".select2 .select2-selection__arrow").remove();
			t__wi_p.$("aside select").on("select2:open", function () {
				t__wi_p.$(".select2-container .select2-dropdown").css("opacity", "0")
			})
		}
	}
}

function __mss() {
	if (product_name(1).toLowerCase() == "cloudmin") {
		if (t__wi_p.$("aside").find("li.menu-container.menu-status.hidden").find("font").length > 0) {
			var g = t__wi_p.$("aside").find("li.menu-container.menu-status.hidden").find("font"),
				f = g.text(),
				d = g.attr("color");
			if (d && (d.indexOf("00ff00") || d.indexOf("008800") || d.indexOf("00aa00"))) {
				d = "success"
			} else {
				if (d && (d.indexOf("ff6600") || d.indexOf("ff00ff") || d.indexOf("ff22ff") || d.indexOf("ff44ff"))) {
					d = "warning"
				} else {
					if (d && (d.indexOf("ff0000") || d.indexOf("ff1100") || d.indexOf("aa0000") || d.indexOf("ff2200") || d.indexOf("ff4400"))) {
						d = "danger"
					} else {
						d = "info"
					}
				}
			}
			if (f == "Virtualmin") {
				f = "VM"
			}
			setTimeout(function () {
				var a = t__wi_p.$("aside .select2-selection__rendered");
				if (!a.find(".menu-status-label").length) {
					a.append('<span class="pull-right label label-' + d + ' menu-status-label bg-light-grey pointer-events-none">' + f + "</span>");
					var b = t__wi_p.$("aside .select2-selection__rendered .menu-status-label");
					b.animate({
						opacity: 1
					}, 500);
					b.on("mouseover", function () {
						$(this).removeClass("bg-light-grey")
					}).on("mouseout", function () {
						$(this).addClass("bg-light-grey")
					});
					a.on("mouseover", function () {
						$(this).find(".menu-status-label").removeClass("bg-light-grey")
					}).on("mouseout", function () {
						$(this).find(".menu-status-label").addClass("bg-light-grey")
					})
				}
			}, 300)
		}
	}
}

function __lls() {
	t__wi_p.t___p__ll = 1;
	if (settings_loader_top && t__wi_p.t___p__xhr_r === 0) {
		t__wi_p.NProgress.start()
	}
	if (settings_loader_left) {
		t__wi_p.$(".mCSB_container, .mCSB_dragger").css("top", "0");
		!t__wi_p.$("#_menu_loader").length && t__wi_p.$("body ul.navigation").before('<span id="_menu_loader" class="loading loading-sm"></span>');
		!t__wi_p.$("#loader-close-sm").length && t__wi_p.$("#_menu_loader").before('<div class="loader-close sm hidden" id="loader-close-sm"><i class="fa fa-times-circle pull-right hidden scale-08"></i></div>');
		t__wi_p.setTimeout(function () {
			t__wi_p.$("#loader-close-sm").removeClass("hidden")
		}, 3000);
		t__wi_p.$("body aside .mCSB_scrollTools").css("visibility", "hidden");
		t__wi_p.$("body ul.navigation").css("visibility", "hidden");
		t__wi_p.$("body ul.user-links").css("visibility", "hidden")
	}
}

function __lle() {
	if (settings_loader_top && t__wi_p.t___p__xhr_r === 0) {
		t__wi_p.NProgress.done()
	}
	t__wi_p.$("body aside .mCSB_scrollTools").css("visibility", "visible");
	t__wi_p.$("body ul.navigation").css("visibility", "visible");
	t__wi_p.$("body ul.user-links").css("visibility", "visible");
	t__wi_p.$("#_menu_loader").remove();
	t__wi_p.$("#loader-close-sm").remove();
	t__wi_p.t_sel_i();
	__mss();
	if (typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.__dlm == "function") {
		$('iframe[name="page"]').get(0).contentWindow.__dlm()
	}
	setTimeout(function () {
		t__au__c___r(1, 1)
	}, 1);
	loader_start_config();
	t__wi_p.t___p__ll = 0
}

function t__au__c___i(u) {
	t__wi_p.$(".autocomplete-suggestions").remove();
	t__wi_p.$(".form-control.sidebar-search").removeAttr("disabled");
	t__wi_p.$(".form-control.sidebar-search").autocomplete("dispose");
	if (u == "c") {
		t__wi_p.$(".form-control.sidebar-search").val("")
	}
	var p = {};
	$.each(t__wi_p.$('li:not(.menu-exclude):not(.user-link) > ul[id^="global_"].sub > li:not(.menu-exclude):not(.user-link) > a'), function (a, b) {
		p[($(this).attr("href").substring(0, 1) == "/" ? "" : "/") + $(this).attr("href")] = $.trim($(this).text())
	});
	t__wi_p.$('li > a[target="page"][data-href="/virtual-server/index.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/sysinfo.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/virtual-server/history.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_folders.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_ifolders.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/list_addresses.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_forward.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_auto.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/edit_auto.cgi"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/filter/"], li:not(.menu-exclude):not(.user-link) > a[target="page"][data-href="/mailbox/edit_sig.cgi"]').each(function (a, b) {
		p[$(this).attr("data-href")] = $.trim($(this).text())
	});
	var t = $.map(p, function (b, a) {
		return {
			value: b,
			url: a,
			data: {
				category: product_name(1)
			}
		}
	});
	var o = {};
	if ($current_page_full == $_____link_full + "/custom/" || $current_page_full == $_____link_full + "/custom/index.cgi" || $current_page_full == $_____link_full + "/backup-config/" || $current_page_full == $_____link_full + "/backup-config/index.cgi" || $current_page_full == $_____link_full + "/usermin/" || $current_page_full == $_____link_full + "/usermin/index.cgi" || $current_page_full == $_____link_full + "/webmin/" || $current_page_full == $_____link_full + "/webmin/index.cgi" || $current_page_full == $_____link_full + "/acl/" || $current_page_full == $_____link_full + "/acl/index.cgi" || $current_page_full == $_____link_full + "/init/" || $current_page_full == $_____link_full + "/init/index.cgi" || $current_page_full == $_____link_full + "/mount/" || $current_page_full == $_____link_full + "/mount/index.cgi" || $current_page_full == $_____link_full + "/quota/" || $current_page_full == $_____link_full + "/quota/index.cgi" || $current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi" || $current_page_full == $_____link_full + "/inittab/" || $current_page_full == $_____link_full + "/inittab/index.cgi" || $current_page_full == $_____link_full + "/logrotate/" || $current_page_full == $_____link_full + "/logrotate/index.cgi" || $current_page_full == $_____link_full + "/mailcap/" || $current_page_full == $_____link_full + "/mailcap/index.cgi" || $current_page_full == $_____link_full + "/pam/" || $current_page_full == $_____link_full + "/pam/index.cgi" || $current_page_full == $_____link_full + "/proc/" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_user.cgi" || $current_page_full == $_____link_full + "/proc/index_size.cgi" || $current_page_full == $_____link_full + "/proc/index_cpu.cgi" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi" || $current_page_full == $_____link_full + "/cron/" || $current_page_full == $_____link_full + "/cron/index.cgi" || $current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi" || $current_page_full == $_____link_full + "/useradmin/" || $current_page_full == $_____link_full + "/useradmin/index.cgi" || $current_page_full == $_____link_full + "/apache/" || $current_page_full == $_____link_full + "/apache/index.cgi" || $current_page_full == $_____link_full + "/bind8/" || $current_page_full == $_____link_full + "/bind8/index.cgi" || $current_page_full == $_____link_full + "/dhcpd/" || $current_page_full == $_____link_full + "/dhcpd/index.cgi" || $current_page_full == $_____link_full + "/dovecot/" || $current_page_full == $_____link_full + "/dovecot/index.cgi" || $current_page_full == $_____link_full + "/ldap-server/" || $current_page_full == $_____link_full + "/ldap-server/index.cgi" || $current_page_full == $_____link_full + "/virtualmin-nginx/" || $current_page_full == $_____link_full + "/virtualmin-nginx/index.cgi" || $current_page_full == $_____link_full + "/fetchmail/" || $current_page_full == $_____link_full + "/fetchmail/index.cgi" || $current_page_full == $_____link_full + "/mysql/" || $current_page_full == $_____link_full + "/mysql/index.cgi" || $current_page_full == $_____link_full + "/mysql/edit_dbase.cgi" || $current_page_full == $_____link_full + "/postgresql/" || $current_page_full == $_____link_full + "/postgresql/index.cgi" || $current_page_full == $_____link_full + "/postgresql/edit_dbase.cgi" || $current_page_full == $_____link_full + "/postfix/" || $current_page_full == $_____link_full + "/postfix/index.cgi" || $current_page_full == $_____link_full + "/procmail/" || $current_page_full == $_____link_full + "/procmail/index.cgi" || $current_page_full == $_____link_full + "/proftpd/" || $current_page_full == $_____link_full + "/proftpd/index.cgi" || $current_page_full == $_____link_full + "/mailboxes/" || $current_page_full == $_____link_full + "/mailboxes/index.cgi" || $current_page_full == $_____link_full + "/mailboxes/list_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/" || $current_page_full == $_____link_full + "/mailbox/index.cgi" || $current_page_full == $_____link_full + "/samba/" || $current_page_full == $_____link_full + "/samba/index.cgi" || $current_page_full == $_____link_full + "/spam/" || $current_page_full == $_____link_full + "/spam/index.cgi" || $current_page_full == $_____link_full + "/squid/" || $current_page_full == $_____link_full + "/squid/index.cgi" || $current_page_full == $_____link_full + "/sshd/" || $current_page_full == $_____link_full + "/sshd/index.cgi" || $current_page_full == $_____link_full + "/webalizer/" || $current_page_full == $_____link_full + "/webalizer/index.cgi" || $current_page_full == $_____link_full + "/cpan/" || $current_page_full == $_____link_full + "/cpan/index.cgi" || $current_page_full == $_____link_full + "/htaccess-htpasswd/" || $current_page_full == $_____link_full + "/htaccess-htpasswd/index.cgi" || $current_page_full == $_____link_full + "/status/" || $current_page_full == $_____link_full + "/status/index.cgi" || $current_page_full == $_____link_full + "/net/" || $current_page_full == $_____link_full + "/net/index.cgi" || $current_page_full == $_____link_full + "/tcpwrappers/" || $current_page_full == $_____link_full + "/tcpwrappers/index.cgi" || $current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi" || $current_page_full == $_____link_full + "/fail2ban/" || $current_page_full == $_____link_full + "/fail2ban/index.cgi" || $current_page_full == $_____link_full + "/nis/" || $current_page_full == $_____link_full + "/nis/index.cgi" || $current_page_full == $_____link_full + "/passwd/" || $current_page_full == $_____link_full + "/passwd/index.cgi") {
		$(t__wi_p.$('iframe[name="page"]').contents().find(".panel-body a[href]:not([href*='javascript'],[href*='list_users.cgi?dom'],[href*='edit_hdparm.cgi?disk'],[href*='blink.cgi?disk'],[href*='smart-status/index.cgi?drive'],[href*='help.cgi'],[href*='edit_user.cgi?new='],[href*='edit_user.cgi?idx='],[href*='edit_recipe.cgi'],[href*='up.cgi'],[href*='down.cgi'],[href*='virt_index.cgi'],[href*='save_log.cgi'],[href*='backup.cgi'],[href*='activate.cgi'],[href*='#'])")).each(function (a, b) {
			if ($current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi") {
				o["/" + $current_page + $(this).parent("td").next("td.td_tag").next("td.td_tag").next("td.td_tag").find("a").attr("href")] = $.trim($(this).text())
			} else {
				if ($current_page_full == $_____link_full + "/backup-config/" || $current_page_full == $_____link_full + "/backup-config/index.cgi") {
					$description = $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text())
				} else {
					if ($current_page_full == $_____link_full + "/mount/" || $current_page_full == $_____link_full + "/mount/index.cgi" || $current_page_full == $_____link_full + "/quota/" || $current_page_full == $_____link_full + "/quota/index.cgi") {
						$description = $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text())
					} else {
						if ($current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi") {
							$description = $.trim($(this).parents("td").next("td").next("td").next("td").find("label").find("tt").find("tt").text())
						} else {
							if ($current_page_full == $_____link_full + "/proc/" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_user.cgi" || $current_page_full == $_____link_full + "/proc/index_size.cgi" || $current_page_full == $_____link_full + "/proc/index_cpu.cgi" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi") {
								if ($current_page_full == $_____link_full + "/proc/index_size.cgi" || $current_page_full == $_____link_full + "/proc/index_cpu.cgi") {
									$description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").text())
								} else {
									if ($current_page_full == $_____link_full + "/proc/index_search.cgi") {
										$description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").text())
									} else {
										$description = $.trim($(this).parent("td").next("td.td_tag").text()) + " — " + $.trim($(this).parents("td").next("td").next("td").next("td").text())
									}
								}
							} else {
								if ($current_page_full == $_____link_full + "/useradmin/" || $current_page_full == $_____link_full + "/useradmin/index.cgi") {
									$description = $.trim($(this).parents("td").next("td").find("label").text()) + " — " + $(this).text() + ":" + $.trim($(this).parents("td").next("td").next("td").find("label").text()) + " - " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").find("label").text()) + ", " + $.trim($(this).parents("td").next("td").next("td").next("td").next("td").next("td").find("label").text())
								} else {
									if ($current_page_full == $_____link_full + "/mailboxes/list_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/" || $current_page_full == $_____link_full + "/mailbox/index.cgi") {
										$description = $.trim($(this).parents("td").next("td").next("td").next("td").find("label").text()) + " — " + $.trim($(this).parents("td").next("td").find("label").text()) + " [" + $.trim($(this).parents("td").next("td").next("td").find("label").text()) + "]"
									} else {
										if ($current_page_full == $_____link_full + "/cpan/" || $current_page_full == $_____link_full + "/cpan/index.cgi") {
											$description = $.trim($(this).parents("td").next("td").next("td").find("label").text())
										} else {
											if ($current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi") {
												$description = $.trim($(this).parent("td").next("td.td_tag").text()) + " - " + $.trim($(this).parent("td").next("td.td_tag").next("td.td_tag").text())
											} else {
												$description = $.trim($(this).parent("td").next("td.td_tag").text())
											}
										}
									}
								}
							}
						}
					}
				}
				$description ? $_description = true : $_description = false;
				o[($(this).attr("href").substring(0, 1) == "/" ? "" : "/") + $current_page + $(this).attr("href")] = $.trim($(this).text()) + ($_description ? " (" : "") + $description + ($_description ? ")" : "")
			}
		})
	}
	var n = $.map(o, function (b, a) {
		return {
			value: b,
			url: a,
			data: {
				category: right_module_title()
			}
		}
	});
	var m = {};
	$.each(t__wi_p.$('li:not(.menu-exclude):not(.user-link) > ul.sub:not([id^="global_"]) > li:not(.menu-exclude):not(.user-link) > a'), function (a, b) {
		m[($(this).attr("href").substring(0, 1) == "/" ? "" : "/") + $(this).attr("href")] = $.trim($(this).text())
	});
	t__wi_p.$('li:not(.menu-exclude):not(.user-link) > a[target="page"]:not([data-href="/acl/edit_user.cgi"],[data-href="/virtual-server/index.cgi"],[data-href="/sysinfo.cgi"],[data-href="/virtual-server/history.cgi"], [data-href="/mailbox/list_folders.cgi"], [data-href="/mailbox/list_ifolders.cgi"], [data-href="/mailbox/list_addresses.cgi"], [data-href="/filter/edit_forward.cgi"], [data-href="/filter/edit_auto.cgi"], [data-href="/filter/edit_auto.cgi"], [data-href="/filter/"], [data-href="/mailbox/edit_sig.cgi"])').each(function (a, b) {
		if (product_name(1).toLowerCase() != "usermin" && !dashboard_switch()) {
			m[$(this).attr("data-href")] = $.trim($(this).text())
		}
	});
	var v = $.map(m, function (b, a) {
		return {
			value: b,
			url: a,
			data: {
				category: t__wi_p.$("aside .select2-selection__rendered").text() ? '<span style="font-style: italic">' + t__wi_p.$("aside .select2-selection__rendered").text() + "</span>" : product_name(0)
			}
		}
	});
	var s = {};
	t__wi_p.$("aside select option").each(function () {
		s[$(this).val() + ":::" + $(this).parent("select").attr("name")] = $.trim($(this).text())
	});
	var q = $.map(s, function (b, a) {
		return {
			value: b,
			url: a,
			data: {
				category: t__wi_p.$("aside select").data("autocomplete-title")
			}
		}
	});
	if (t__wi_p.location.search) {
		var r = v.concat(n).concat(q).concat(t)
	} else {
		var r = q.concat(n).concat(v).concat(t)
	}
	t__wi_p.$(".form-control.sidebar-search").on("keydown", function (a) {
		if (a.keyCode == 34 || a.keyCode == 33 || a.keyCode == 20 || a.keyCode == 17 || a.keyCode == 16 || a.keyCode == 9) {
			a.preventDefault();
			a.stopPropagation()
		}
	});
	t__wi_p.$(".form-control.sidebar-search").autocomplete({
		lookup: r,
		onSelect: function (a) {
			if (dashboard_switch() === true && t__wi_p.location.search === "?dashboard" && access_level() != 2 && access_level() != 4) {
				t__wi_p.t__s("open_webmin")
			}
			$(this).val("").blur();
			hide_mobile_menu();
			if (a.url.substring(0, 1) == "/") {
				var b = t__wi_p.$("body").find('a[href="' + a.url + '"]').attr("target");
				if (b && b == "_parent") {
					t__wi_p.location.href = t__wi_p.$("body").find('a[href="' + a.url + '"]').attr("href")
				} else {
					t__wi_p.$('iframe[name="page"]').attr("src", a.url.indexOf($_____link_full) > -1 ? a.url : $_____link_full + a.url)
				}
			} else {
				t__wi_p.__lls()
			}
		},
		groupBy: "category",
		noSuggestionNotice: "No results found"
	})
}

function t__au__c___r(d, c) {
	if (typeof t__au__c___i == "function" && d === 0) {
		t__au__c___i((c ? "c" : false))
	} else {
		t__wi_p.t__au__c___i((c ? "c" : false))
	}
}

function container_fluid_size() {
	if (!t__wi_p.$(".mobile-menu-toggler").hasClass("selected")) {
		if (t__wi_p.$("#sidebar:visible").length !== 1) {
			t__wi_p.$('iframe[name="page"]').contents().find(".container-fluid, .container")
		} else {
			t__wi_p.$('iframe[name="page"]').contents().find(".container-fluid, .container")
		}
		t__wi_p.$("aside").addClass("hidden-xs");
		t__wi_p.$("aside").css("transform", "translate(260px, 0px)");
		t__wi_p.$(".switch-toggle").css("display", "table");
		if (t__wi_p.$(".__logo") && !t__wi_p.$(".mobile-menu-toggler:visible").length) {
			t__wi_p.$(".__logo").transition({
				y: "-140px"
			}, 700, function () {})
		} else {
			if (t__wi_p.$(".__logo")) {
				t__wi_p.$(".__logo").css("transform", "translate(0px, 0px)")
			}
		}
	}
}

function __cms() {
	t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove();
	t__wi_p.$(".navigation > li > ul.sub > li").removeClass("sub_active").find("span.current").remove();
	t__wi_p.$(".navigation > li.has-sub").removeClass("active");
	t__wi_p.$(".navigation > li > ul.sub").hide();
	t__wi_p.$(".navigation > li > a > i.fa.fa-folder-open-o").removeClass("fa-folder-open-o")
}

function __is_same_origin(b) {
	if ((b.attr("href") && (b.attr("href").match("^http:") || b.attr("href").match("^https:") || b.attr("href").match("^ftp:")) && b.attr("target") != "page" && $.url(b.attr("href")).attr("host") != $__host_url) || b.attr("data-href") && (b.attr("data-href").match("^http:") || b.attr("data-href").match("^https:") || b.attr("data-href").match("^ftp:")) && $.url(b.attr("data-href")).attr("host") != $__host_url) {
		return 0
	} else {
		return 1
	}
}

function settings_update() {
	$.each(t__wi_p.$('iframe[name="page"]').contents().find("#atsettings .ui_form").serializeArray(), function (d, f) {
		if (f.value == "true" || f.value == "false") {
			if (f.value == "true") {
				var g = true
			} else {
				if (f.value == "false") {
					var g = false
				}
			}
		} else {
			var g = f.value
		}
		window[f.name] = g;
		t__wi_p[f.name] = g
	})
}

function loader_start_config() {
	$("body").on("click", 'a[href^="http"], a[href^="https"], a[href^="ftp"], a[href^="ftps"]', function (b) {
		if (!__is_same_origin($(this))) {
			$(this).attr("target", "_blank");
			t__wi_p.__lre()
		}
	});
	t__wi_p.$.each($('ul.navigation a[href^="http"], ul.navigation a[href^="https"], ul.navigation a[href^="ftp"], ul.navigation a[href^="ftps"], ul.navigation a[data-href^="http"], ul.navigation a[data-href^="https"], ul.navigation a[data-href^="ftp"], ul.navigation a[data-href^="ftps"]'), function () {
		$(this).removeClass("navigation_module_trigger").parents("li").addClass("navigation_external");
		$(this).attr("target", "_blank");
		$(this).attr("href", $(this).data("href"));
		$(this).removeAttr("data-href")
	})
}
loader_start_config();

function t__wm_l(b) {
	if (dashboard_switch() == false) {
		$.ajax({
			type: "GET",
			url: $_____link_full + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=" + (b == "open_webmail" ? "webmail" : "webmin"),
			data: false,
			dataType: "text",
			success: function (a) {
				t__wi_p.$("body ul.navigation").html(a)
			}
		});
		t__m_b()
	}
}

function t__vm_l(b) {
	$.ajax({
		type: "GET",
		url: $_____link_full + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=virtualmin" + (b ? ("&dom=" + b) : (settings_right_virtualmin_default ? ("&dom=" + settings_right_virtualmin_default) : false)),
		data: false,
		dataType: "text",
		success: function (a) {
			t__wi_p.$("body ul.navigation").html(a)
		}
	});
	t__m_b()
}

function t__cm_l(b) {
	$.ajax({
		type: "GET",
		url: $_____link_full + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=cloudmin" + ((b || b === 0) ? ("&sid=" + b) : (settings_right_cloudmin_default ? ("&sid=" + settings_right_cloudmin_default) : false)),
		data: false,
		dataType: "text",
		success: function (a) {
			t__wi_p.$("body ul.navigation").html(a)
		}
	});
	t__m_b()
}

function t__m_b() {
	$.ajax({
		type: "GET",
		url: $_____link_full + "/index.cgi/?xhr-buttons=1&xhr-buttons-type=" + (($t_uri_virtualmin || $t_uri_cloudmin) ? 1 : 0) + "",
		data: false,
		dataType: "text",
		success: function (b) {
			t__wi_p.$("body ul.user-links").html(b)
		}
	})
}

function t__wm_r() {
	$("body").append('<span id="____switch"></span>');
	$.ajax({
		type: "GET",
		url: $_____link_full + "/index.cgi/?xhr-default=1",
		data: false,
		dataType: "text",
		success: function (b) {
			$("#____switch").html(b);
			$____switch = $("#____switch").text();
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + (($____switch.substring(0, 1) == "/" ? "" : "/") + $____switch));
			$("#____switch").remove()
		}
	})
}

function t_vm_r(c) {
	var d;
	if (c !== false) {
		d = "virtual-server/summary_domain.cgi?dom=" + c
	} else {
		if (settings_right_virtualmin_default == "sysinfo.cgi" || settings_right_virtualmin_default == "") {
			d = "sysinfo.cgi"
		} else {
			d = "virtual-server/summary_domain.cgi?dom=" + settings_right_virtualmin_default
		}
	}
	t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/" + d)
}

function t_cm_r(c) {
	var d;
	if (c !== false) {
		d = "server-manager/edit_serv.cgi?id=" + c
	} else {
		if (settings_right_cloudmin_default == "sysinfo.cgi" || settings_right_cloudmin_default == "") {
			d = "sysinfo.cgi"
		} else {
			d = "server-manager/edit_serv.cgi?id=" + settings_right_cloudmin_default
		}
	}
	t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/" + d)
}

function t__m(d, g, f) {
	if (d === "open_virtualmin") {
		t__vm_l(false);
		if ((settings_right_reload == true || g === true) && f !== true) {
			t_vm_r(false)
		}
	} else {
		if (d === "open_cloudmin") {
			t__cm_l(false);
			if ((settings_right_reload == true || g === true) && f !== true) {
				t_cm_r(false)
			}
		} else {
			t__wm_l(d);
			if ((settings_right_reload == true || g === true) && f !== true) {
				t__wm_r()
			}
		}
	}
}

function ___dlm(c, d) {
	if (d) {
		__cms()
	}
	t__wi_p.$('a[href="' + c + '"]:first').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
}

function __samn() {
	return ':not(.menu-exclude-link, [data-href="/webmin/refresh_modules.cgi"])'
}

function __sam(h, k) {
	if (k === false) {
		var j = false,
			m = "href";
		if (t__wi_p.$('a[data-href="' + h + '"]' + __samn() + "").length) {
			j = "=";
			m = "data-href"
		} else {
			if (t__wi_p.$('a[data-href="' + h + '/"]' + __samn() + "").length) {
				j = "=";
				h = h + "/";
				m = "data-href"
			} else {
				if (t__wi_p.$('a[data-href="/' + h + '"]' + __samn() + "").length) {
					j = "=";
					h = "/" + h;
					m = "data-href"
				} else {
					if (t__wi_p.$('a[data-href^="' + h + '"]' + __samn() + "").length) {
						j = "^=";
						m = "data-href"
					} else {
						if (t__wi_p.$('a[data-href^="' + h + '/"]' + __samn() + "").length) {
							j = "^=";
							h = h + "/";
							m = "data-href"
						} else {
							if (t__wi_p.$('a[data-href^="/' + h + '"]' + __samn() + "").length) {
								j = "^=";
								h = "/" + h;
								m = "data-href"
							} else {
								if (t__wi_p.$('a[data-href$="' + h + '"]' + __samn() + "").length) {
									j = "$=";
									m = "data-href"
								} else {
									if (t__wi_p.$('a[data-href$="' + h + '/"]' + __samn() + "").length) {
										j = "$=";
										h = h + "/";
										m = "data-href"
									} else {
										if (t__wi_p.$('a[data-href$="/' + h + '"]' + __samn() + "").length) {
											j = "$=";
											h = "/" + h;
											m = "data-href"
										} else {
											if (t__wi_p.$('a[data-href*="' + h + '"]' + __samn() + "").length) {
												j = "*=";
												m = "data-href"
											} else {
												if (m === "href") {
													if (t__wi_p.$('a[href="' + h + '"]' + __samn() + "").length) {
														j = "="
													} else {
														if (t__wi_p.$('a[href="' + h + '/"]' + __samn() + "").length) {
															j = "=";
															h = h + "/"
														} else {
															if (t__wi_p.$('a[href="/' + h + '"]' + __samn() + "").length) {
																j = "=";
																h = "/" + h
															} else {
																if (t__wi_p.$('a[href^="' + h + '"]' + __samn() + "").length) {
																	j = "^="
																} else {
																	if (t__wi_p.$('a[href^="' + h + '/"]' + __samn() + "").length) {
																		j = "^=";
																		h = h + "/"
																	} else {
																		if (t__wi_p.$('a[href^="/' + h + '"]' + __samn() + "").length) {
																			j = "^=";
																			h = "/" + h
																		} else {
																			if (t__wi_p.$('a[href$="' + h + '"]' + __samn() + "").length) {
																				j = "$="
																			} else {
																				if (t__wi_p.$('a[href$="' + h + '/"]' + __samn() + "").length) {
																					j = "$=";
																					h = h + "/"
																				} else {
																					if (t__wi_p.$('a[href$="/' + h + '"]' + __samn() + "").length) {
																						j = "$=";
																						h = "/" + h
																					} else {
																						if (t__wi_p.$('a[href*="' + h + '"]' + __samn() + "").length) {
																							j = "*="
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
										}
									}
								}
							}
						}
					}
				}
			}
		}
		if (j) {
			__cms();
			t__wi_p.$("a[" + m + "" + j + '"' + h + '"]:first' + __samn() + "").parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
		}
	} else {
		if ($__source_file == "settings-editor_read.cgi" || $__source_file == "settings-upload.cgi") {
			__sam("webmin/", false);
			return
		}
		if ($__source_path === "/config.cgi") {
			__sam($__source_query + "/", false);
			return
		}
		if ($__source_path === "/phpini/list_ini.cgi") {
			__sam($__source_query.replace(".", "%2E"), false);
			return
		}
		custom_url = "auto";
		if (custom_url != "auto") {
			$current_page = custom_url
		} else {
			$current_page = $_url.attr("path").replace(/^\//g, "")
		}
		if ($("#headln2l a").attr("href")) {
			if ($("#headln2l a").attr("href").indexOf(".cgi") >= 0) {
				$current_page_webmin = 1
			} else {
				$current_page_webmin = 0
			}
		} else {
			$current_page_webmin = 0
		}(($current_page.split("/")[0] == "virtual-server" || $current_page.split("/")[0] == "server-manager") && !$current_page_webmin && (t__wi_p.$("#wrapper").data("virtual-server") != -1 || t__wi_p.$("#wrapper").data("server-manager") != -1)) ? $current_page = $current_page.split("/")[0] + "/" + $current_page.split("/")[1]: $current_page = $current_page.split("/")[0] + "/";
		$current_page_search = t__wi_p.$('iframe[name="page"]').get(0) ? t__wi_p.$('iframe[name="page"]').get(0).contentWindow.location.search : 0;
		var l = [];
		t__wi_p.$('li > ul.sub li:not(.menu-exclude):not(.user-link) a:not(.menu-exclude-link, [data-href="/webmin/refresh_modules.cgi"])').each(function () {
			if ($(this).attr("href").substring(0, 1) == "/") {
				l.push($(this).attr("href").substring(1))
			} else {
				l.push($(this).attr("href"))
			}
		});
		if ((product_name() !== "Virtualmin" && $__source_file.indexOf("save_log.cgi") === -1) && (product_name() !== "Virtualmin" && $__source_file.indexOf("edit_log.cgi") === -1) && ($current_page_full && $current_page_full.indexOf("/servers/link.cgi/") === -1) && (l.indexOf($current_page) > -1 || l.indexOf(($current_page + "index.cgi")) > -1 || l.indexOf($current_page + $current_page_search) > -1 || l.indexOf(($current_page_full)) > -1 || l.indexOf(($current_page_full.substring(1))) > -1)) {
			if (product_name() !== "Virtualmin" && product_name() !== "Cloudmin") {
				__cms()
			}
			if (t__wi_p.$('a[href="' + $current_page + 'index.cgi"]').length) {
				$current_page = $current_page + "index.cgi"
			} else {
				if (t__wi_p.$('a[href="/' + $current_page + 'index.cgi"]').length) {
					$current_page = "/" + $current_page + "index.cgi"
				} else {
					if (t__wi_p.$('a[href="/' + $current_page + '"]').length) {
						$current_page = "/" + $current_page
					} else {
						if (t__wi_p.$('a[href="/' + $current_page + $current_page_search + '"]').length) {
							$current_page = "/" + $current_page + $current_page_search
						} else {
							if (t__wi_p.$('a[href="' + $current_page + $current_page_search + '"]').length) {
								$current_page = $current_page + $current_page_search
							}
						}
					}
				}
			}
			if (t__wi_p.$('a[href="' + $current_page + '"]').length) {
				t__wi_p.$('a[href="' + $current_page + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
			} else {
				if (t__wi_p.$('a[href="' + $current_page_full + '"]').length) {
					t__wi_p.$('a[href="' + $current_page_full + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
				} else {
					if (t__wi_p.$('a[href="' + $current_page_full.substring(1) + '"]').length) {
						t__wi_p.$('a[href="' + $current_page_full.substring(1) + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
					}
				}
			}
		} else {
			if ($t_uri_virtualmin || $t_uri_cloudmin) {
				$current_page_with_path = $_url.attr("path").substring(1);
				if ($current_page_with_path == "virtual-server/webminlog") {
					$current_page_with_path = "webminlog/search.cgi?"
				} else {
					if ($current_page_with_path == "virtual-server/syslog") {
						$current_page_with_path = "syslog/save_log.cgi?"
					} else {
						if ($current_page_with_path == "virtual-server/apache") {
							$current_page_with_path = "apache/virt_index.cgi?"
						} else {
							if ($current_page_with_path == "virtual-server/webalizer") {
								$current_page_with_path = "webalizer/edit_log.cgi?"
							} else {
								if ($current_page_with_path == "webminlog/search.cgi") {
									$current_page_with_path = "webminlog/search.cgi?"
								}
							}
						}
					}
				}
				if ($current_page_with_path == "apache/virt_index.cgi?" || $current_page_with_path == "apache/virt_index.cgi") {
					__cms();
					t__wi_p.$('a[href^="/' + $current_page_with_path + "?" + $_url.attr("query") + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
				} else {
					if ($current_page_with_path == "syslog/save_log.cgi") {
						if ($_url.attr("query").indexOf("access_log") > -1) {
							__cms();
							t__wi_p.$('a[href$="access%5Flog"]:first' + __samn() + "").parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
						} else {
							if ($_url.attr("query").indexOf("error_log") > -1) {
								__cms();
								t__wi_p.$('a[href$="error%5Flog"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
							}
						}
					} else {
						if ($current_page_with_path == "webalizer/edit_log.cgi" || $current_page_with_path == "webalizer/index.cgi") {
							__cms();
							t__wi_p.$('a[href*="webalizer/"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
						} else {
							if ($current_page_with_path == "config.cgi" || $current_page_with_path == "/config.cgi") {
								__cms();
								t__wi_p.$('a[href*="config.cgi"]:first' + __samn() + "").parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
							} else {
								if ($current_page_with_path == "webminlog/search.cgi?") {
									__cms();
									t__wi_p.$('a[href^="/webminlog/search.cgi"]:first' + __samn() + "").parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
								} else {
									if (typeof $current_page_with_path != "undefined" && t__wi_p.$('a[href*="' + $current_page_with_path + '"]:first' + __samn() + "").length > 0) {
										__cms();
										t__wi_p.$('a[href*="' + $current_page_with_path + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
									}
								}
							}
						}
					}
				}
			}
		}
		var n = [];
		t__wi_p.$("a.navigation_module_trigger").each(function () {
			if ($(this).hasClass("navigation_trigger_single_link")) {
				n.push($(this).data("href"))
			} else {
				if ($(this).data("href") != "/virtual-server/index.cgi") {
					n.push($(this).data("href"))
				} else {
					if ($(this).data("href") == "/virtual-server/index.cgi") {
						n.push("/virtual-server");
						n.push("/virtual-server/index.cgi")
					}
				}
			}
		});
		var l = [];
		t__wi_p.$('li > ul.sub li:not(.menu-exclude):not(.user-link) a:not(.menu-exclude-link, [data-href="/webmin/refresh_modules.cgi"])').each(function () {
			if ($(this).attr("href").substring(0, 1) == "/") {
				l.push($(this).attr("href").substring(1))
			} else {
				l.push($(this).attr("href"))
			}
		});
		$___current_page_search = $current_page.replace(/\/$/, "") + $current_page_search;
		$_current_page_search = "/" + $current_page.replace(/\/$/, "") + $current_page_search;
		if ($current_page_full == $_____link_full + "/virtual-server/history.cgi") {
			__cms();
			t__wi_p.$('a[data-href="/virtual-server/history.cgi"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
		} else {
			if ($current_page_full == $_____link_full + "/server-manager/index.cgi") {
				__cms();
				t__wi_p.$('a[data-href="/server-manager/index.cgi"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
			} else {
				if ($current_page_full == $_____link_full + "/webmin_search.cgi") {
					__cms()
				} else {
					if ((n.indexOf($_current_page_search) > -1)) {
						__cms();
						t__wi_p.$('a[data-href="' + $_current_page_search + ($_current_page_search == "/virtual-server" ? "/index.cgi" : "") + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
					} else {
						if (l.indexOf($_current_page_search) > -1 || l.indexOf($___current_page_search) > -1) {
							__cms();
							t__wi_p.$('a[href*="' + $___current_page_search + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
						} else {
							if (t__wi_p.$("#wrapper").data("product") == "usermin" && $t_uri_webmail && $current_page_full && ($current_page_full.indexOf("/mailbox") || $current_page_full.indexOf("/filter"))) {
								$_current_page_search_no_extra = $_current_page_search.replace("&user=", "").replace(/\./g, "%2E").replace("mailbox?id=", "mailbox/index.cgi?id=");
								$.each(n, function (b, a) {
									if ($_current_page_search_no_extra && $_current_page_search_no_extra.indexOf(a) > -1) {
										if (t__wi_p.$('a[data-href="' + a + '"]').length > 0) {
											__cms();
											t__wi_p.$('a[data-href="' + a + '"]').find(".fa.fa-folder-o").addClass("fa-folder-open-o");
											t__wi_p.$('a[data-href="' + a + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
										}
									}
								});
								$_current_page_search = "/" + $current_page + "index.cgi" + $current_page_search;
								$__relative_url == "/mailbox/edit_sig.cgi?" ? $__relative_url = "/mailbox/edit_sig.cgi" : false;
								if (t__wi_p.$('a[data-href="' + $__relative_url + '"]').length > 0) {
									__cms();
									t__wi_p.$('a[data-href="' + $__relative_url + '"]').find(".fa.fa-folder-o").addClass("fa-folder-open-o");
									t__wi_p.$('a[data-href="' + $__relative_url + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
								}
								if ($current_page_full == $_____link_full + "/mailbox/") {
									if (t__wi_p.$('a[data-href="' + $_current_page_search + '"]').length > 0) {
										__cms();
										t__wi_p.$('a[data-href="' + $_current_page_search + '"]').find(".fa.fa-folder-o").addClass("fa-folder-open-o");
										t__wi_p.$('a[data-href="' + $_current_page_search + '"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>')
									} else {
										if (t__wi_p.$('a[data-href="/mailbox/index.cgi?id=INBOX"]').length > 0 && n.indexOf("/" + $current_page) === -1) {
											__cms();
											t__wi_p.$('a[data-href="/mailbox/index.cgi?id=INBOX"]').parent("li:first-child").find(".fa.fa-folder-o").addClass("fa-folder-open-o");
											t__wi_p.$('a[data-href="/mailbox/index.cgi?id=INBOX"]').parent("li:first-child").addClass("sub_active").append('<span class="current-large"></span>')
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

function __dpt() {
	if (!localStorage.getItem("system_default_title")) {
		localStorage.setItem("system_default_title", t__wi_p.document.title)
	}
	if (t__wi_p.$('li.sub_active a[href*="filemin"]').length) {
		if ($('iframe[name="page"]').get(0) && $('iframe[name="page"]').get(0).contentWindow && $('iframe[name="page"]').get(0).contentWindow.$('body[class*="filemin"] form input#path').val()) {
			t__wi_p.document.title = $('iframe[name="page"]').get(0).contentWindow.$('body[class*="filemin"] form input#path').val() + " - " + t__wi_p.$("li.sub_active a").text() + " — " + localStorage.getItem("system_default_title")
		} else {
			t__wi_p.document.title = t__wi_p.$("li.sub_active a").text() + " — " + localStorage.getItem("system_default_title")
		}
	} else {
		if ((product_name() == "Virtualmin" || product_name() == "Cloudmin") && t__wi_p.$("select option:checked").text() && t__wi_p.$("select option:checked").text().length) {
			if (t__wi_p.$("li.sub_active a").text() && t__wi_p.$("li.sub_active a").text().length) {
				t__wi_p.document.title = t__wi_p.$("select option:checked").text() + " - " + t__wi_p.$("li.sub_active a").text() + " — " + localStorage.getItem("system_default_title")
			} else {
				t__wi_p.document.title = product_name() + " — " + localStorage.getItem("system_default_title")
			}
		} else {
			if (product_name() == "Mail") {
				if (t__wi_p.$("li.sub_active a").text() && t__wi_p.$("li.sub_active a").text().length) {
					t__wi_p.document.title = t__wi_p.$("li.sub_active a").text() + " - Mail  — " + localStorage.getItem("system_default_title")
				} else {
					t__wi_p.document.title = product_name() + " — " + localStorage.getItem("system_default_title")
				}
			} else {
				if (t__wi_p.$("li.sub_active a").text() && t__wi_p.$("li.sub_active a").text().length) {
					t__wi_p.document.title = t__wi_p.$("li.sub_active a").text() + " — " + localStorage.getItem("system_default_title")
				} else {
					t__wi_p.document.title = localStorage.getItem("system_default_title")
				}
			}
		}
	}
}

function __dlm(b) {
	if (t__wi_p.$___________m_locked === 1) {
		return
	}
	typeof b === "undefined" ? b = false : false;
	if (!b && $current_page_full == $_____link_full + "/virtual-server/summary_domain.cgi") {
		__sam("/virtual-server/index.cgi", false)
	}
	if (b) {
		__sam(b, false)
	} else {
		if (product_name() !== "Webmin" && product_name() !== "Usermin" && (t__wi_p.$('a[href*="' + $___relative_url + '"]:first' + __samn() + "").length || t__wi_p.$('a[data-href*="' + $___relative_url + '"]:first' + __samn() + "").length)) {
			__sam($___relative_url, false)
		} else {
			if ((product_name() !== "Virtualmin" && product_name() !== "Cloudmin") && product_name() !== "Webmin" && product_name() !== "Usermin" && (t__wi_p.$('a[href*="' + $___source_path + '"]:first' + __samn() + "").length || t__wi_p.$('a[data-href*="' + $___source_path + '"]:first' + __samn() + "").length)) {
				__sam($___source_path, false)
			} else {
				if ((product_name() !== "Virtualmin" && product_name() !== "Cloudmin") && (t__wi_p.$('a[href*="' + $___source_dir + '"]:first' + __samn() + "").length || t__wi_p.$('a[data-href*="' + $___source_dir + '"]:first' + __samn() + "").length) || ((access_level() == 2 || access_level() == 4) && t___wi.location.search == "?virtualmin")) {
					__sam($___source_dir, false)
				} else {
					if ($__source_file) {
						__sam($__source_file, true)
					}
				}
			}
		}
	}
	if (t__wi_p.$('a[data-href="/sysinfo.cgi"]').hasClass("hidden") && $current_page_full == $_____link_full + "/sysinfo.cgi") {
		__cms()
	}
	__dpt()
}

function t__m__m(h, g) {
	if ($.url($__source_url).param("refresh") == "1") {
		if (!$("body").contents().text().match(/___theme_post_save___/)) {
			var f = false;
			if ($.url($__source_url).param("id") || $.url($__source_url).param("dom") && ($t_uri_virtualmin || $t_uri_cloudmin)) {
				if ($t_uri_virtualmin) {
					f = $.url($__source_url).param("dom")
				} else {
					if ($t_uri_cloudmin) {
						f = $.url($__source_url).param("id")
					}
				}
			} else {
				if ($t_uri_virtualmin || $t_uri_cloudmin) {
					f = t__wi_p.$("aside select").val()
				}
			}
			if ($t_uri_virtualmin) {
				t__wi_p.t__vm_l(f)
			} else {
				if ($t_uri_cloudmin) {
					t__wi_p.t__cm_l(f)
				} else {
					var j = $(".switch-toggle input.dynamic:checked").attr("id");
					t__wi_p.t__wm_l((j ? j : "open_webmin"))
				}
			}
			return
		}
	} else {
		if (t__wi_p.t___p__ll === 0 && (($t_uri_virtualmin || $t_uri_cloudmin) && ($.url($__source_url).param("id") || $.url($__source_url).param("dom")))) {
			if (!$("body").contents().text().match(/___theme_post_save___/)) {
				if ($t_uri_virtualmin && $.url($__source_url).param("dom") && t__wi_p.$("aside select").val() && ($.url($__source_url).param("dom") != t__wi_p.$("aside select").val())) {
					t__wi_p.t__vm_l($.url($__source_url).param("dom"))
				} else {
					if ($t_uri_cloudmin && $.url($__source_url).param("id") && t__wi_p.$("aside select").val() && ($.url($__source_url).param("id") != t__wi_p.$("aside select").val())) {
						t__wi_p.t__cm_l($.url($__source_url).param("id"))
					}
				}
				return
			}
		}
	}
	if (t___wi.location != t__wi_p.location) {
		if ($__current_directory == $_____link_full + "/virtual-server/" || $current_page_full == $_____link_full + "/virtual-server/index.cgi" || $__relative_url == "/config.cgi?virtual-server") {
			if (t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_virtualmin" && t__wi_p.$('.switch-toggle input[id="open_virtualmin"]').length) {
				t__wi_p.t__s("open_virtualmin");
				t__wi_p.t__m("open_virtualmin", h, g)
			}
		} else {
			if ($__current_directory == $_____link_full + "/server-manager/" || $current_page_full == $_____link_full + "/server-manager/index.cgi" || $__relative_url == "/config.cgi?server-manager") {
				if (t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_cloudmin" && t__wi_p.$('.switch-toggle input[id="open_cloudmin"]').length) {
					t__wi_p.t__s("open_cloudmin");
					t__wi_p.t__m("open_cloudmin", h, g)
				}
			}
		}
	}
}

function ___f__tw() {
	if ($("body").attr("class") && $("body").attr("class").indexOf("filemin") > -1) {
		$("body").on("hidden.bs.modal", function () {
			$(".modal-backdrop").remove()
		});
		$("#select-unselect").parents("th").css("opacity", 0).addClass("pointer-events-none");
		$("body").on("submit", 'form[action="save_config.cgi"]', function () {
			localStorage.setItem("_________per_page", parseInt($('input[name="per_page"]').val()))
		});
		$("body").on("click", function (b) {
			$(".tooltip").each(function () {
				if (!$(this).is(b.target) && $(this).has(b.target).length === 0 && $(".tooltip").has(b.target).length === 0) {
					$(this).tooltip("hide")
				}
			})
		});
		$.each($(".modal .modal-content .modal-footer"), function (d, c) {
			$(this).wrapInner('<div class="btn-group"></div>')
		});
		$(".btn-group.pull-right").find(".fa-check-square").removeClass("fa-check-square").addClass("fa-share-square-o");
		if ($___relative_url.indexOf("index.cgi") === -1) {
			t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=");
			$('#headln2l > a[href*="filemin"][href*="index.cgi"]').addClass("hidden");
			if (settings_favorites) {
				f__dt()
			}
		}
		$('ul > li > a[href^="bookmark.cgi?path="]').parents("ul").addClass("at-filemin-favorites-dropdown");
		$('div button[onclick="removeDialog()"]').addClass("disabled filemin-button-delete").removeAttr("onclick");
		$('a[onclick="chmodDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-chmod");
		$('a[onclick="chownDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-chown");
		$('a[onclick="compressDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-compress");
		$('a[onclick="copySelected()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-copy");
		$('a[onclick="cutSelected()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-cut");
		if (!localStorage.getItem("copy") && !localStorage.getItem("cut")) {
			$('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-paste")
		} else {
			$('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("filemin-button-paste")
		}
		$("body").on("click", 'button + .dropdown-menu.at-filemin-favorites-dropdown > li > a:not([href^="bookmark.cgi"])', function () {
			$(this).parents("ul").trigger("mouseleave")
		});
		$.each($(".btn-group.pull-right .btn-group"), function () {
			$(this).find("button > .caret").css("margin-left", "3px");
			$(this).find("button + ul.dropdown-menu > li > a").css("padding-left", "12px");
			$(this).find("button + ul.dropdown-menu > li > a > i").append("&nbsp;&nbsp;")
		});
		$(".breadcrumb").after('<span class="cspinner hidden filemin-main-spinner" style="margin-top: 9px; margin-left: 14px;"><span class="cspinner-icon"></span></span>');
		if (access_level() !== 0) {
			$("body").find(".breadcrumb li:first-child a").html('<i class="fa fa-user text-light">&nbsp;</i>')
		}
		__f___u(false, false, 0, 0);
		$("body").on("click", '#headln2l > a[href*="filemin"][href*="index.cgi"]', function (c) {
			c.preventDefault();
			c.stopPropagation();
			var d = "";
			if ($(".breadcrumb li:first-child a i").hasClass("fa-search")) {
				d = "index.cgi?path=" + $('#list_form > input[type="hidden"][name="path"]').val()
			} else {
				d = $(".breadcrumb > li:eq(-2) > a").attr("href")
			}
			__f____r("get", d, false, 0)
		});
		$("body").on("click", ".breadcrumb li > a, button + .dropdown-menu.at-filemin-favorites-dropdown > li > a, #DataTables_Table_0 label > a.filemin-follow-file", function (c) {
			c.preventDefault();
			c.stopPropagation();
			var d = "index.cgi?path=";
			if ($(this).attr("href") && $(this).attr("href").indexOf("/filemin") === -1) {
				d = $(this).attr("href")
			}
			if (d === "index.cgi?path=/") {
				d = "index.cgi?path="
			}
			if (d && d.indexOf("bookmark.cgi?") > -1) {
				$keep_search = 1;
				return
			} else {
				$keep_search = 0
			}
			__f____r("get", d, false, $keep_search)
		});
		$("body").on("click", 'li.filemin-button-copy:not(".disabled") a', function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-clone">&nbsp;&nbsp;&nbsp;</i>Copying selected. Please wait...', 5, "info");
			__f____a("copy", false)
		});
		$("body").on("click", 'li.filemin-button-cut:not(".disabled") a', function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-scissors">&nbsp;&nbsp;&nbsp;</i>Cutting selected. Please wait...', 5, "info");
			__f____a("cut", false)
		});
		$("body").on("click", 'li.filemin-button-paste:not(".disabled") a', function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-clipboard">&nbsp;&nbsp;&nbsp;</i>Pasting from clipboard. Please wait...', 5, "info");
			__f____a("paste", false)
		});
		$("body").on("click", 'a[href^="extract.cgi"]', function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-file-archive-o">&nbsp;&nbsp;&nbsp;</i>Unpacking archive. Please wait...', 5, "info");
			__f____a("extract", $(this).attr("href"))
		});
		$("body").find('#removeDialog button[type="button"][onclick="removeSelected()"]').removeAttr("onclick").addClass("_at_filemin_delete_submit");
		$("body").on("click", "#removeDialog button._at_filemin_delete_submit", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-trash-o">&nbsp;&nbsp;&nbsp;</i>Deleting selected...', 5, "warning");
			__f____a("delete", false);
			modal_dismiss()
		});
		$("#removeDialog").on("show.bs.modal", function () {
			var b = $(this).find("#items-to-remove");
			b.empty();
			$.each(_f__gr("checked"), function () {
				b.append($(this).val() + "<br>")
			})
		});
		$("body").find('#renameDialog button[type="button"][onclick="renameSelected()"]').removeAttr("onclick").addClass("_at_filemin_rename_submit");
		$("body").on("click", "#renameDialog button._at_filemin_rename_submit", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-i-cursor">&nbsp;&nbsp;&nbsp;</i>Renaming selected. Please wait...', 5, "info");
			__f____a("rename", false)
		});
		$("body").on("submit", "#renameDialog", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#renameDialog button._at_filemin_rename_submit").trigger("click")
		});
		$("#renameDialog").on("shown.bs.modal", function () {
			var b = $(this).find('input[type="text"]');
			b.focus();
			b.select()
		});
		$("#renameDialog").on("show.bs.modal", function () {
			var c = $(this).find('input[type="text"]'),
				d = $(this).find("button._at_filemin_rename_submit")
		});
		$('#renameDialog input[type="text"]').on("keyup change click input", function (d) {
			var c = $("#renameDialog").find("button._at_filemin_rename_submit");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("body").find('#createFolderDialog button[type="button"][onclick="createFolder()"]').removeAttr("onclick").addClass("_at_filemin_create_folder_submit");
		$("body").on("click", "#createFolderDialog button._at_filemin_create_folder_submit", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-folder">&nbsp;&nbsp;&nbsp;</i>Creating folder `<samp>' + $('#createFolderForm input[name="name"]').val() + "</samp>`. Please wait...", 5, "info");
			__f____a("create_folder", false)
		});
		$("body").on("submit", "#createFolderForm", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#createFolderDialog button._at_filemin_create_folder_submit").trigger("click")
		});
		$("#createFolderDialog").on("shown.bs.modal", function () {
			var b = $(this).find('input[type="text"]');
			b.focus()
		});
		$("#createFolderDialog").on("show.bs.modal", function () {
			var c = $(this).find('input[type="text"]'),
				d = $(this).find("button._at_filemin_create_folder_submit");
			c.val("");
			!c.val() && d.prop("disabled", true)
		});
		$('#createFolderDialog input[type="text"]').on("keyup change click input", function (d) {
			var c = $("#createFolderDialog").find("button._at_filemin_create_folder_submit");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("body").find('#createFileDialog button[type="button"][onclick="createFile()"]').removeAttr("onclick").addClass("_at_filemin_create_file_submit");
		$("body").on("click", "#createFileDialog button._at_filemin_create_file_submit", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-file">&nbsp;&nbsp;&nbsp;</i>Creating file `<samp>' + $('#createFileForm input[name="name"]').val() + "</samp>`. Please wait...", 5, "info");
			__f____a("create_file", false)
		});
		$("body").on("submit", "#createFileForm", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#createFileDialog button._at_filemin_create_file_submit").trigger("click")
		});
		$("#createFileDialog").on("shown.bs.modal", function () {
			var b = $(this).find('input[type="text"]');
			b.focus()
		});
		$("#createFileDialog").on("show.bs.modal", function () {
			var c = $(this).find('input[type="text"]'),
				d = $(this).find("button._at_filemin_create_file_submit");
			c.val("");
			!c.val() && d.prop("disabled", true)
		});
		$('#createFileDialog input[type="text"]').on("keyup change click input", function (d) {
			var c = $("#createFileDialog").find("button._at_filemin_create_file_submit");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("body").find('#downFromUrlDialog button[type="button"][onclick="downFromUrl()"]').removeAttr("onclick").addClass("filemin-submitter-url_download");
		$("body").on("click", "#downFromUrlDialog button.filemin-submitter-url_download", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-download">&nbsp;&nbsp;&nbsp;</i>Downloading from <samp>' + $.url($('#downFromUrlForm input[name="link"]').val()).attr("host") + "</samp>. Please wait...", 5, "info");
			__f____a("url_download", false)
		});
		$("body").on("submit", "#downFromUrlForm", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#downFromUrlDialog button.filemin-submitter-url_download").trigger("click")
		});
		$("#downFromUrlDialog").on("shown.bs.modal", function () {
			var b = $(this).find('input[name="link"]');
			b.focus()
		});
		$("#downFromUrlDialog").on("show.bs.modal", function () {
			var c = $(this).find('input[name="link"]'),
				d = $(this).find("button.filemin-submitter-url_download");
			!c.val() && d.prop("disabled", true)
		});
		$('#downFromUrlDialog input[name="link"]').on("keyup change click input", function (d) {
			var c = $("#downFromUrlDialog").find("button.filemin-submitter-url_download");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("#readyForUploadDialog").on("show.bs.modal", function () {
			var b = $.url($("#upload-form").attr("action")).param()["id"];
			$("#upload-form").attr("action", "upload.cgi?path=" + $("#upload-form").find('input[name="path"]').val() + "&id=" + b + "")
		});
		$("body").find('#searchDialog button[type="button"][onclick="search()"]').removeAttr("onclick").addClass("_at_filemin_search_submit");
		$("body").on("click", "#searchDialog button._at_filemin_search_submit", function (b) {
			b.preventDefault();
			b.stopPropagation();
			__f____a("search", false)
		});
		$("body").on("submit", "#searchForm", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#searchDialog button._at_filemin_search_submit").trigger("click")
		});
		$("#searchDialog").on("shown.bs.modal", function () {
			var b = $(this).find('input[type="text"]');
			b.focus()
		});
		$("#searchDialog").on("show.bs.modal", function () {
			var c = $(this).find('input[type="text"]'),
				d = $(this).find("button._at_filemin_search_submit");
			!c.val() && d.prop("disabled", true)
		});
		$("body").on("click", ".__filemin-search-results-data", function (b) {
			$('#headln2l > a[href*="filemin"][href*="index.cgi"]').trigger("click")
		});
		$('#searchDialog input[type="text"]').on("keyup change click input", function (d) {
			var c = $("#searchDialog").find("button._at_filemin_search_submit");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("body").on("click", 'a[href^="bookmark.cgi"]', function (c) {
			c.preventDefault();
			c.stopPropagation();
			var d = $(this).attr("href");
			if (d === "bookmark.cgi?path=") {
				d = d + "/"
			}
			__f____a("bookmark", d)
		});
		$('body #chmodDialog button[onclick="chmodSelected()"]').removeAttr("onclick").addClass("filemin-submitter-chmod");
		$("body").on("click", "#chmodDialog button.filemin-submitter-chmod", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-user">&nbsp;&nbsp;&nbsp;</i>Setting permissions to <samp><em>' + $("#perms").val() + "</em></samp> on selected file(s). Please wait...", 5, "info");
			__f____a("chmod", [$("#perms").val(), $('#chmodForm select[name="applyto"] option:selected').val()])
		});
		$("#chmodDialog").on("shown.bs.modal", function () {
			$('#chmodDialog input[id="perms"]').focus().select()
		});
		$("body").on("keyup", "#perms", function (b) {
			if (settings_window_customized_checkboxes_and_radios) {
				$("#chmodForm .acheckbox, #chmodForm .aradio").icheck("updated")
			}
		});
		$('body #chownDialog button[onclick="chownSelected()"]').removeAttr("onclick").addClass("filemin-submitter-chown");
		$("body").on("click", "#chownDialog button.filemin-submitter-chown", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-users">&nbsp;&nbsp;&nbsp;</i>Changing ownership to <samp><em>' + $('#chownForm input[name="owner"]').val() + ":" + $('#chownForm input[name="group"]').val() + "</em></samp> on selected file(s). Please wait...", 5, "info");
			__f____a("chown", [$('#chownForm input[name="owner"]').val(), $('#chownForm input[name="group"]').val(), $("#chown-recursive").prop("checked")])
		});
		$("#chownDialog").on("shown.bs.modal", function () {
			$('#chownDialog input[name="owner"]').focus()
		});
		$("#chownDialog").on("show.bs.modal", function () {
			var b = $(this).find("button.filemin-submitter-chown");
			b.prop("disabled", true)
		});
		$('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup change click input", function (d) {
			var c = $("#chownDialog").find("button.filemin-submitter-chown");
			if ($('#chownDialog input[name="owner"]').val() && $('#chownDialog input[name="group"]').val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$('#chownDialog input[name="owner"], #chownDialog input[name="group"]').on("keyup", function (c) {
			c.preventDefault();
			var d = c.which;
			if (d == 13) {
				$("#chownDialog button.filemin-submitter-chown").trigger("click")
			}
		});
		$("#chownDialog").on("show.bs.modal", function () {
			$('#chownDialog input[name="owner"], #chownDialog input[name="group"]').val("");
			$("#chown-recursive").removeAttr("checked");
			if (settings_window_customized_checkboxes_and_radios) {
				$("#chown-recursive").icheck("updated")
			}
		});
		$('body #compressDialog button[onclick="compressSelected()"]').removeAttr("onclick").addClass("filemin-submitter-compress").prop("disabled", true);
		$("body").on("click", "#compressDialog button.filemin-submitter-compress", function (b) {
			b.preventDefault();
			b.stopPropagation();
			messenger('<i class="fa fa-file-archive-o">&nbsp;&nbsp;&nbsp;</i>Compressing selected. Please wait...', 5, "info");
			__f____a("compress", [$('#compressSelectedForm input[name="filename"]').val(), $('#compressSelectedForm select[name="method"] option:selected').val()])
		});
		$('#compressDialog input[name="filename"]').on("keyup change click input", function (d) {
			var c = $("#compressDialog").find("button.filemin-submitter-compress");
			if ($(this).val()) {
				c.prop("disabled", false)
			} else {
				c.prop("disabled", true)
			}
		});
		$("body").on("submit", "#compressSelectedForm", function (b) {
			b.preventDefault();
			b.stopPropagation();
			$("#compressDialog button.filemin-submitter-compress").trigger("click")
		});
		$("#compressDialog").on("show.bs.modal", function () {
			$('#compressDialog input[name="filename"]').val("")
		}).on("shown.bs.modal", function () {
			$('#compressDialog input[name="filename"]').focus()
		});
		$("body").on("click", ".dropdown-menu > li.disabled", function (b) {
			b.preventDefault();
			b.stopPropagation()
		});
		if ($__source_file === "index.cgi" && !$.url(t___wi.location).param("path")) {
			$("#headln2l").find('a[href*="filemin"][href*="index.cgi"]').addClass("hidden")
		}
		$(".btn-group.pull-right > button:eq(2)").removeAttr("onclick");
		$("body").on("click", ".btn-group.pull-right > button:eq(2)", function (c) {
			var d = $.url(t___wi.location).param("path");
			__f____r("get", "index.cgi?path=" + (d ? d : ""), false, 0);
			messenger('<i class="fa fa-refresh">&nbsp;&nbsp;&nbsp;</i>Refreshing folder content. Please wait...', 2, "info")
		});
		setTimeout(function () {
			typeof settings_allowed_hostname == "undefined" ? settings_allowed_hostname = true : false;
			if ($hostname == settings_allowed_hostname) {
				$(".btn-group.pull-right > .btn-group > button").hover(function (b) {
					b.preventDefault();
					b.stopPropagation()
				})
			}
		}, 100);
		$("body").on("click", ".acheckbox, .btn-group.pull-right > button:eq(0), .btn-group.pull-right > button:eq(1), input", function () {
			if ($("#DataTables_Table_0 tbody input:checked").length !== 0) {
				__f___ub()
			} else {
				__f___lb()
			}
		});
		if (settings_window_customized_checkboxes_and_radios) {
			$("body").on("click", ".acheckbox, .btn-group.pull-right > button:eq(0), .btn-group.pull-right > button:eq(1)", function () {
				if ($("table .acheckbox:visible").filter(function () {
						return $(this).children("#select-unselect").length === 0
					}).length) {
					$(".acheckbox, .aradio").icheck("updated");
					if ($("table .acheckbox.checked:visible").filter(function () {
							return $(this).children("#select-unselect").length === 0
						}).length === $("table .acheckbox:visible").filter(function () {
							return $(this).children("#select-unselect").length === 0
						}).length) {
						$("#select-unselect").prop("checked", true)
					} else {
						$("#select-unselect").prop("checked", false)
					}
					$(".acheckbox, .aradio").icheck("updated")
				}
			})
		}
	}
}

function t__cm___init(d, f, g) {
	$.each(d, function (s, u) {
		var b = $(this),
			c = ["phpini", "bind8"],
			z = ["phpini"],
			m = ["bind8"];
		$("#headln2l a").attr("href") ? $page = $("#headln2l a").attr("href").split("/")[1] : $page = null;
		c.indexOf($page) >= 0 && $(this).data("name", "data");
		CodeMirror.modeURL = "/unauthenticated/js/codemirror/mode/%N/%N.js";
		var a = null,
			v = "text/plain";
		var t = false;
		if ($current_page_full == $_____link_full + "/custom/view.cgi") {
			t = $('form[action="save.cgi"]').find(".table-title").find("tt").text()
		} else {
			if ($('body[class^="filemin"]').length) {
				t = $.url($__relative_url).param("file")
			} else {
				t = $('select[name="file"]').val()
			}
		}
		var x = (f ? f : t),
			w, a, v;
		if (w = /.+\.([^.]+)$/.exec(x)) {
			var y = CodeMirror.findModeByExtension(w[1]);
			if (y) {
				a = y.mode;
				v = y.mime
			}
		} else {
			if (/\//.test(x)) {
				var y = CodeMirror.findModeByMIME(x);
				if (y) {
					a = y.mode;
					v = x
				}
			} else {
				a = null;
				v = "text/plain"
			}
		}
		if ($page == "apache" || $page == "postfix" || $page == "dovecot" || $page == "spam" || $page == "virtualmin-nginx" || $page == "sendmail" || $page == "samba" || $page == "proftpd" || $page == "fail2ban" || $page == "sshd" || $page == "squid" || $page == "ldap-server") {
			a = "rpm";
			v = "rpm-spec"
		} else {
			if ($page == "phpini") {
				a = "z80";
				v = "text/x-z80"
			} else {
				if ($page == "bind8" || $page == "procmail") {
					a = "clike";
					v = "text/x-java"
				} else {
					if ($page == "virtual-server" && $(this).attr("name") == "body") {
						a = "htmlmixed";
						v = "text/html"
					}
				}
			}
		}
		$current_file = $current_page_full.replace(/^\//g, "");
		if ($current_file) {
			$current_file = $current_file.split("/")[1]
		}
		if ($("textarea").length === 1 && $("textarea").parent("td.td_tag").length === 0) {
			if ($source_path == $_____link + "settings-editor_read.cgi" || (product_name(1).toLowerCase() == "virtualmin" && ($current_page_full == "/apache/manual_form.cgi" || $current_page_full == "/spam/edit_manual.cgi" || $current_page_full == "/virtual-server/edit_html.cgi" || $current_page_full == "/virtual-server/apply_style.cgi" || $current_page_full == "/phpini/edit_manual.cgi")) || product_name(1).toLowerCase() != "virtualmin" && product_name(1).toLowerCase() != "cloudmin" && $current_page_full != $_____link_full + "/virtualmin-sqlite/" && $current_page_full != $_____link_full + "/updown/" && $current_directory != $_____link + "firewalld/" && $current_directory != $_____link + "firewall/" && $current_directory != $_____link + "net/" && $current_directory != $_____link + "acl/" && $current_directory != $_____link + "inetd/" && $current_directory != $_____link + "nis/" && $current_directory != $_____link + "pap/" && $current_directory != $_____link + "ppp-client/" && $current_directory != $_____link + "pptp-client/" && $current_directory != $_____link + "pptp-server/" && $current_directory != $_____link + "shorewall/" && $current_directory != $_____link + "shorewall6/" && $current_directory != $_____link + "raid/" && $current_directory != $_____link + "lvm/" && $current_directory != $_____link + "fdisk/" && $current_directory != $_____link + "lpadmin/" && $current_directory != $_____link + "virtualmin-registrar/" && $current_directory && $current_directory.indexOf("cluster") === -1 && $current_file != "edit_access.cgi" && $current_file != "edit_file.cgi" && $current_file != "edit_referers.cgi" && $current_file != "edit_lock.cgi" && $current_file != "edit_mobile.cgi" && $current_file != "edit_user.cgi" && $current_file != "edit_unix.cgi" && $current_file != "edit_pass.cgi" && $current_file != "edit_dump.cgi" && $current_file != "edit_cron.cgi" && $current_file != "gbatch_form.cgi" && $current_file != "batch_form.cgi" && $current_file != "edit_score.cgi" && $current_file != "edit_ports.cgi" && $current_file != "acl.cgi" && $current_file != "edit_recs.cgi" && $current_file != "edit_dirs.cgi" && $current_page_full != $_____link_full + "/config.cgi" && $current_page_full != $_____link_full + "/apache/edit_defines.cgi" && $current_page_full != $_____link_full + "/apache/edit_gmime_type.cgi" && $current_page_full != $_____link_full + "/fail2ban/edit_filter.cgi" && $current_page_full != $_____link_full + "/fail2ban/edit_action.cgi" && $current_page_full != $_____link_full + "/fail2ban/edit_jail.cgi" && $current_page_full != $_____link_full + "/usermin/edit_configs.cgi" && $current_page_full != $_____link_full + "/virtualmin-support/ticket.cgi" && $current_page_full != $_____link_full + "/virtualmin-support/login.cgi" && $current_page_full != $_____link_full + "/webminlog/view.cgi" && $current_page_full != $_____link_full + "/bind8/slave_form.cgi" && $current_page_full != $_____link_full + "/bind8/stub_form.cgi" && $current_page_full != $_____link_full + "/bind8/mass_form.cgi") {
				__cm_editor = CodeMirror.fromTextArea(u, {
					tabMode: "indent",
					matchBrackets: true,
					lineNumbers: true,
					lineWrapping: true,
					indentUnit: 0,
					autofocus: true
				});
				__cm_editor.setOption("mode", v);
				if (a != "rpm") {
					CodeMirror.autoLoadMode(__cm_editor, a)
				}
				if ($current_directory != $_____link + "init/" && $current_file != "edit_cron.cgi" && $current_page_full != $_____link_full + "/virtualmin-password-recovery/" && $current_page_full != $_____link_full + "/bind8/forward_form.cgi") {
					g ? ($resize = g) : ($resize = 2.8);
					if (!g) {
						$window_height = ($(window).outerHeight() - ($(window).outerHeight() / $resize));
						__cm_editor.setSize(null, $window_height);
						$(t___wi).resize(function () {
							$window_height = ($(window).outerHeight() - ($(window).outerHeight() / $resize));
							__cm_editor.setSize(null, $window_height)
						})
					} else {
						__cm_editor.on("change", function (j, h) {
							d.val(__cm_editor.getValue())
						});
						__cm_editor.setSize($resize[0], $resize[1])
					}
				}
			}
		}
	})
}
$(document).on("click", function (b) {
	if ($(b.target).attr("class") && $(b.target).attr("class").indexOf("select2") === 0) {} else {
		if (t__wi_p.$("aside select") && t__wi_p.$("aside select").length > 0) {
			t__wi_p.$("aside select").select2("close")
		}
	}
});
$("a").each(function () {
	if ($(this).find("img").length) {
		$(this).css("text-decoration", "none")
	}
});
$('body:not([class*="filemin"])').on("keydown", function (g) {
	var f = g.keyCode ? g.keyCode : g.which;
	if (!$("input").is(":focus") && !$("select").is(":focus") && !$("textarea").is(":focus")) {
		var d = String.fromCharCode(f).toLowerCase();
		if (d && /[a-zA-Z0-9]/.test(d) && !g.ctrlKey && !g.altKey && !g.metaKey) {
			if (!$(".dataTables_filter label input").length) {
				setTimeout(function () {
					if (g.shiftKey && d == "1") {
						t__wi_p.$('aside input[name="search"]').focus().val("!")
					} else {
						t__wi_p.$('aside input[name="search"]').focus().val(d)
					}
				}, 1)
			} else {
				$(".dataTables_filter label input").trigger("keyup").focus()
			}
		}
	}
});
if (t___wi.location == t__wi_p.location) {
	loaders_dismiss();
	if (t__wi_p.$___________initial === 1) {
		console.log("Welcome to Authentic Theme 17.03 https://github.com/qooob/authentic-theme")
	}
	typeof t__wi_p.t___p__xhr_l == "undefined" ? t__wi_p.t___p__xhr_l = 0 : false;
	typeof t__wi_p.t___p__ll == "undefined" ? t__wi_p.t___p__ll = 0 : false;
	$(function () {
		t___wi.parent.$___________left = 1
	});
	if (settings_loader_right) {
		if (settings_loader_top) {
			NProgress.configure({
				showSpinner: false,
				trickleRate: 0.08,
				trickleSpeed: 400
			})
		}
	} else {
		if (settings_loader_top) {
			NProgress.configure({
				showSpinner: true,
				trickleRate: 0.08,
				trickleSpeed: 400
			})
		}
	}
	$(window).ajaxStart(function () {
		t___p__xhr_l = 1;
		t__wi_p.__lls()
	}).ajaxStop(function () {
		t___p__xhr_l = 0;
		t__wi_p.__lle()
	});
	(function () {
		var k, j, l, h = {}.hasOwnProperty,
			g = function (a, c) {
				for (var d in c) {
					if (h.call(c, d)) {
						a[d] = c[d]
					}
				}

				function b() {
					this.constructor = a
				}
				b.prototype = c.prototype;
				a.prototype = new b();
				a.__super__ = c.prototype;
				return a
			};
		k = jQuery;
		l = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';
		j = (function (b) {
			g(a, b);

			function a() {
				return a.__super__.constructor.apply(this, arguments)
			}
			a.prototype.template = function (c) {
				var d;
				d = a.__super__.template.apply(this, arguments);
				d.append(k(l));
				return d
			};
			return a
		})(t___wi.Messenger.Message);
		t___wi.Messenger.themes.air = {
			Message: j
		};
		Messenger.options = {
			extraClasses: "messenger-fixed messenger-on-bottom",
			theme: "air"
		}
	}).call(this);
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		$("#content").attr("style", "-webkit-overflow-scrolling: touch !important; overflow-y: scroll !important;")
	}
	if (t__wi_p.$('a[target="page"][href="link/"]').first().length) {
		t__wi_p.$('a[target="page"][href="link/"]').first().attr("target", "blank")
	}
	$("body").on("keydown", ".sidebar-search", function (b) {
		if (t__wi_p.$("#wrapper").data("webmail") !== -1) {
			if (b.keyCode == 13) {
				b.preventDefault();
				return false
			}
		}
	});
	$("body").on("click", ".mobile-menu-toggler", function (b) {
		$this = $(this);
		if ($("aside").hasClass("hidden-xs")) {
			$(this).addClass("selected").find("button").addClass("btn-primary").removeClass("btn-default");
			if (t__wi_p.$(".__logo")) {
				t__wi_p.$(".__logo").css("transform", "translate(0px, 0px)");
				setTimeout(function () {
					t__wi_p.$(".__logo").transition({
						y: "-140px"
					}, 1000)
				}, 1100)
			}
			t__wi_p.$this.css("transform", "translate(0px, 0px)");
			t__wi_p.$("aside").css("transform", "translate(0px, 0px)");
			t__wi_p.$(".switch-toggle").css("display", "none");
			$("aside").removeClass("hidden-xs");
			t__wi_p.$("aside, .mobile-menu-toggler").transition({
				x: 260
			}, 1000);
			t__wi_p.$(".switch-toggle").css("display", "table")
		} else {
			hide_mobile_menu()
		}
	});
	$.each($('ul.navigation li.navigation_external a[href^="../servers/link.cgi/"]'), function (d, c) {
		$(this).attr("href", $__source_url + $(this).attr("href").replace("../", "").replace(/\/$/g, ""))
	});
	$("body").on("click", '.navigation a[target="page"], .user-links a[target="page"]', function () {
		hide_mobile_menu()
	});
	$("body").on("click", ".navigation > li:not('.sub-wrapper'):not('.menu-container'):not('.navigation_external')", function (h) {
		h.preventDefault();
		h.stopPropagation();
		t__wi_p.$___________m_locked = 1;
		typeof $processing == "undefined" ? $processing = false : false;
		if (!$processing) {
			$processing = true;
			var g = $("a", this).attr("href"),
				j = $("a", this).attr("target"),
				f = $(this);
			if (j) {
				$(".navigation > li > ul.sub > li").each(function () {
					$(this).removeClass("sub_active").find("span.current").remove()
				})
			}
			$("#webmin_search_form").submit(function () {
				$(".navigation > li > ul.sub > li").each(function () {
					$(this).removeClass("sub_active").find("span.current").remove()
				})
			});
			$.when($("#sidebar .navigation > li").each(function () {
				var a = $(this);
				if (!$(this).is(f)) {
					$(this).removeClass("active");
					if ($(this).find("a").attr("href") != "#search" && !$(this).find("a").attr("target")) {
						if ($(a.find("a").attr("href")).hasClass("sub")) {
							$(a.find("a").attr("href")).slideUp($settings_animation_left_slide_time)
						}
					}
				}
			})).done(function () {
				f.hasClass("active") ? f.removeClass("active") : (g != "#hide" && !j) ? f.addClass("active") : false;
				setTimeout(function () {
					if ($(g).is(":visible") && g != "#hide" && !j) {
						f.addClass("active")
					} else {
						f.removeClass("active")
					}
					$processing = false
				}, ((2 * $settings_animation_left_slide_time) > 0 ? (2 * $settings_animation_left_slide_time) : 1));
				$(g).slideToggle($settings_animation_left_slide_time)
			});
			if (g == "#search") {
				$('#sidebar input[name="search"]').focus()
			}
		}
	});
	$("body").on("click", ".navigation > li > ul.sub > li:not('.menu-container')", function () {
		var b = $(this);
		if (__num()) {
			t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove()
		}
		$(".navigation > li > ul.sub > li").each(function () {
			$(this).removeClass("sub_active").find("span.current").remove()
		});
		$("#webmin_search_form").find('input[name="search"]').val("");
		b.addClass("sub_active").append('<span class="current"></span>')
	});
	$(".navigation > li > ul.sub").each(function () {
		if ($(this).attr("id") === "") {
			$(this).remove()
		}
	});
	$("body").on("submit", "#webmin_search_form", function () {});
	$("body").on("click", ".navigation_module_trigger", function (b) {
		b.preventDefault();
		b.stopPropagation();
		$('iframe[name="page"]').attr("src", $(this).data("href"));
		$(".navbar-toggle:visible").trigger("click");
		t__wi_p.$(".navigation > li > ul.sub > li").removeClass("sub_active").find("span.current").remove();
		t__wi_p.$("#sidebar .navigation > ul.sub").slideUp($settings_animation_left_slide_time);
		t__wi_p.$("#sidebar .navigation > li").removeClass("active")
	});
	$('.switch-toggle label[for^="reserve_empty"]').on("click", function (b) {
		b.preventDefault()
	});
	$("body").on("click", 'a[data-refresh="true"]', function (b) {
		b.preventDefault();
		if (typeof t__wi_p.$('iframe[name="page"]').get(0).contentWindow.$__relative_url == "string") {
			t__wi_p.$('iframe[name="page"]').attr("src", t__wi_p.$('iframe[name="page"]').get(0).contentWindow.$__relative_url)
		}
	});
	$("body").on("click", function (b) {
		if (!$("ul.dropdown").is(b.target) && $("ul.dropdown").has(b.target).length === 0 && $(".open").has(b.target).length === 0) {
			$("ul.dropdown").removeClass("open")
		}
	});
	$(t__wi_p.$('iframe[name="page"]').contents()).on("click", function (b) {
		if (!t__wi_p.$("ul.dropdown").is(b.target) && t__wi_p.$("ul.dropdown").has(b.target).length === 0 && t__wi_p.$(".open").has(b.target).length === 0) {
			t__wi_p.$("body").find(".navbar-header").find(".dropdown.open").removeClass("open")
		}
	});

	function __tmp_opener() {
		t___wi.open($("#__tmp_openner").attr("href"));
		$("#__tmp_openner").remove()
	}

	function __tmp_opener_link(b) {
		$("body").append('<a href="' + t__wi_p.$__source_protocol + "://" + t__wi_p.$__host_url + ":" + $__source_port + b + '" target="_blank" class="hidden" id="__tmp_openner"></a>')
	}
	t__wi_p.$(".switch-toggle").on("contextmenu", "label", function (b) {
		b.preventDefault();
		if ($(this).attr("for") == "open_webmin" || $(this).attr("for") == "open_usermin") {
			__tmp_opener_link("");
			__tmp_opener()
		} else {
			if ($(this).attr("for") == "open_virtualmin") {
				__tmp_opener_link("?virtualmin");
				__tmp_opener()
			} else {
				if ($(this).attr("for") == "open_cloudmin") {
					__tmp_opener_link("?cloudmin");
					__tmp_opener()
				} else {
					if ($(this).attr("for") == "open_webmail") {
						__tmp_opener_link("?mail");
						__tmp_opener()
					}
				}
			}
		}
	});
	t__wi_p.$(".switch-toggle").on("click", "input.dynamic", function (b) {
		t__wi_p.hide_mobile_menu();
		if ($(this).attr("id") == "open_thirdlane") {
			t__wi_p.location.href = $_____link_full + "/asterisk/index.cgi";
			return
		}
		t__wi_p.t__s($(this).attr("id"));
		if ($(this).attr("id") == "open_dashboard") {
			t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/sysinfo.cgi");
			t__wi_p.__cms();
			return
		}
		t__m($(this).attr("id"), false, false)
	});
	t_sel_i();
	$("aside").mCustomScrollbar({
		axis: "y",
		theme: "minimal",
		scrollInertia: 100,
		scrollButtons: false,
		callbacks: {
			onScroll: function () {
				if (!t__wi_p.$(".mobile-menu-toggler").is(":visible")) {
					t__wi_p.$(".form-control.sidebar-search").blur();
					if (t__wi_p.$("aside select") && t__wi_p.$("aside select").length > 0) {
						t__wi_p.$("aside select").select2("close")
					}
				}
			}
		}
	});
	t__wi_p.$(".loader").append('<div class="loader-close" id="loader-close"><i class="fa fa-times-circle pull-right hidden"></i></div>');
	$("body").on("mouseover", "#loader-close, #loader-close-sm", function () {
		$(this).find(".fa").removeClass("hidden")
	}).on("mouseout", "#loader-close, #loader-close-sm", function () {
		$(this).find(".fa").addClass("hidden")
	});
	$("body").on("click", "#loader-close > .fa", function (b) {
		t__wi_p.__lre()
	}).on("click", "#loader-close-sm > .fa", function (b) {
		t__wi_p.__lle()
	});
	$(window).keydown(function (b) {
		if (t__wi_p.$(".form-control.sidebar-search").val().trim().startsWith("!") && b.keyCode == 13 && product_name(1).toLowerCase() != "cloudmin") {
			t__wi_p.$(".form-control.sidebar-search").addClass("_shell_form_");
			b.preventDefault();
			b.stopPropagation();
			if (t__wi_p.$('iframe[name="page"]').contents() && t__wi_p.$('iframe[name="page"]').contents().find("body").data("shell") == "1") {
				$__shell_form = '<form class="__shell_form__" role="form" action="' + $_____link_full + '/shell/index.cgi" method="post" enctype="multipart/form-data">									<input type="hidden" id="cmd" name="cmd" value="' + t__wi_p.$(".form-control.sidebar-search").val().trim().substring(1).trim() + '">								</form>';
				t__wi_p.$('iframe[name="page"]').contents().find("body").append($__shell_form);
				t__wi_p.$('iframe[name="page"]').contents().find(".__shell_form__").submit();
				if (product_name(1).toLowerCase() == "virtualmin") {
					__cms()
				} else {
					if (!t__wi_p.$("a[href^='shell']").attr("href")) {
						t__wi_p.t__wm_l("open_webmin")
					}
				}
			}
		} else {
			if (t__wi_p.$(".form-control.sidebar-search").val().trim().startsWith("!") && b.keyCode == 13 && product_name(1).toLowerCase() == "cloudmin") {
				t__wi_p.$(".form-control.sidebar-search").addClass("_shell_form_");
				b.preventDefault();
				b.stopPropagation();
				if (t__wi_p.$('iframe[name="page"]').contents() && t__wi_p.$('a[target="page"][href*="/server-manager/save_serv.cgi"]').length && t__wi_p.$('a[target="page"][href*="shell=1"]').length) {
					$__shell_form = '<form class="__shell_form__" role="form" action="' + $_____link_full + '/server-manager/shell.cgi" method="post" enctype="multipart/form-data">									<input type="hidden" id="id" name="id" value="' + t__wi_p.$("#sid").val() + '">									<input type="hidden" id="cmd" name="cmd" value="' + t__wi_p.$(".form-control.sidebar-search").val().trim().substring(1).trim() + '">								</form>';
					t__wi_p.$('iframe[name="page"]').contents().find("body").append($__shell_form);
					t__wi_p.$('iframe[name="page"]').contents().find(".__shell_form__").submit();
					__cms();
					t__wi_p.$('a[href*="server-manager/save_serv.cgi"]').parent("li:not(.menu-exclude):not(.user-link)").addClass("sub_active").append('<span class="current-large"></span>').parent("ul.sub").show().parent("li:not(.menu-exclude):not(.user-link)").prev("li").addClass("active")
				}
			}
		}
	});
	$(window).keyup(function (b) {
		t__wi_p.search_control(b);
		t__wi_p.shortcut_control(b)
	});
	$("body").on("submit", "#webmin_search_form", function (b) {
		setTimeout(function () {
			t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove();
			t__wi_p.$(".form-control.sidebar-search").val("")
		}, 30)
	});
	if (settings_favorites) {
		$("aside").on("click", ".user-links > li.favorites", function (b) {
			$(".favorites-menu-outer").addClass("hover")
		});
		$("body").on("click", "nav.favorites-menu li a", function () {});
		$("body").on("click", ".favorites-menu-close, nav.favorites-menu li a", function () {
			t__wi_p.$(".favorites-menu-outer").removeClass("hover")
		});
		$(document).on("keydown", function (b) {
			if ($(".favorites-menu-outer").css("left") == "0px" && b.keyCode == 27) {
				t__wi_p.$(".favorites-menu-outer").removeClass("hover")
			}
		})
	}
} else {
	typeof t__wi_p.t___p__xhr_r == "undefined" ? t__wi_p.t___p__xhr_r = 0 : false;
	loaders_dismiss();
	$(window).ajaxStart(function () {
		t__wi_p.t___p__xhr_r = 1;
		if (t__wi_p.t___p__xhr_l === 0) {
			if (settings_loader_top && !$('body[class^="filemin"]').length) {
				t__wi_p.NProgress.start()
			}
		}
	}).ajaxStop(function () {
		if (t__wi_p.t___p__xhr_l === 0) {
			if (settings_loader_top) {
				t__wi_p.NProgress.done()
			}
			if (t__wi_p.t___p__ll === 1) {
				t__wi_p.__lle()
			}
		}
		t__wi_p.t___p__xhr_r = 0
	});

	function __f___mn() {
		var b = $("body").attr("class");
		if (b) {
			b = b.split(/\s+/)[0]
		} else {
			b = "filemin"
		}
		return b
	}

	function __f___gd() {
		return $(_f__table.fnGetNodes()).find("input").add($("#list_form > input")).serialize()
	}

	function _f__gr(b) {
		if (b) {
			return $(_f__table.fnGetNodes()).find("input:checked")
		} else {
			return $(_f__table.fnGetNodes()).find("input")
		}
	}

	function __f___ub() {
		$("div button.filemin-button-delete").removeClass("disabled").attr("onclick", "removeDialog()");
		$(".filemin-button-chmod").removeClass("disabled").find("a").attr("onclick", "chmodDialog()");
		$(".filemin-button-chown").removeClass("disabled").find("a").attr("onclick", "chownDialog()");
		$(".filemin-button-compress").removeClass("disabled").find("a").attr("onclick", "compressDialog()");
		$(".filemin-button-copy").removeClass("disabled");
		$(".filemin-button-cut").removeClass("disabled")
	}

	function __f___lb() {
		$("div button.filemin-button-delete").addClass("disabled").removeAttr("onclick");
		$(".filemin-button-chmod").addClass("disabled").find("a").removeAttr("onclick");
		$(".filemin-button-chown").addClass("disabled").find("a").removeAttr("onclick");
		$(".filemin-button-compress").addClass("disabled").find("a").removeAttr("onclick");
		$(".filemin-button-copy").addClass("disabled").find("a").removeAttr("onclick");
		$(".filemin-button-cut").addClass("disabled").find("a").removeAttr("onclick")
	}

	function __f_____sl() {
		$("body").find(".breadcrumb + .filemin-main-spinner").removeClass("hidden")
	}

	function __f_____hl() {
		$("body").find(".breadcrumb + .filemin-main-spinner").addClass("hidden")
	}

	function __f_____hl_() {
		setTimeout(function () {
			$("body").find(".breadcrumb + .filemin-main-spinner").addClass("hidden")
		}, 750)
	}

	function __f_____lo(c, d) {
		if (d === true) {
			$("body").find("#list_form table tbody").css("opacity", "0.5").addClass("filter-grayscale" + (c ? " filemin-updating" : "") + "");
			$("body").find("ul.pagination").css("opacity", "0.5").addClass("filter-grayscale pointer-events-none")
		}
		__f_____sl()
	}

	function __f_____ul() {
		$("body").find("#list_form table tbody").css("opacity", "1").removeClass("filter-grayscale filemin-updating");
		$("body").find("ul.pagination").css("opacity", "1").removeClass("filter-grayscale pointer-events-none");
		__f_____hl();
		$(".btn-group.pull-right > .btn-group > button").removeClass("disabled")
	}

	function __f____a(j, g) {
		var l = $('#list_form > input[type="hidden"][name="path"]').val();
		if (j != "bookmark") {
			__f_____lo(false, true)
		}
		if (j === "copy" || j === "cut") {
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/" + j + ".cgi",
				data: __f___gd(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error")
					} else {
						delete localStorage.cut;
						delete localStorage.copy;
						localStorage.setItem(j, 1);
						$(".filemin-button-paste").removeClass("disabled")
					}
					if (j === "copy") {
						setTimeout(function () {
							messenger('<i class="fa fa-clone">&nbsp;&nbsp;&nbsp;</i>Copy to clipboard successful', 5, "success")
						}, 10)
					} else {
						if (j === "cut") {
							setTimeout(function () {
								messenger('<i class="fa fa-scissors">&nbsp;&nbsp;&nbsp;</i>Cut to clipboard successful', 5, "warning")
							}, 10)
						}
					}
					__f_____ul()
				},
				error: function (a) {}
			})
		}
		if (j === "paste") {
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/paste.cgi?path=" + l,
				data: false,
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error")
					} else {
						delete localStorage.cut;
						if (!localStorage.copy) {
							$(".filemin-button-paste").addClass("disabled")
						}
						messenger('<i class="fa fa-clipboard">&nbsp;&nbsp;&nbsp;</i>Paste from clipboard was successful', 5, "success")
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "extract") {
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/" + g,
				data: false,
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error")
					} else {}
					messenger('<i class="fa fa-file-archive-o">&nbsp;&nbsp;&nbsp;</i>Extracting archive...', 5, "info");
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 0, j)
				},
				error: function (a) {}
			})
		}
		if (j === "bookmark") {
			__f_____sl();
			__f_____hl_();
			$('a[href^="bookmark.cgi?path="]').parents("ul").append('<li><a href="index.cgi?path=' + l + '" style="padding-left: 12px;">' + l + "</a></li>");
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/" + g,
				data: false,
				dataType: "text",
				success: function (a) {
					messenger('<i class="fa fa-bookmark-o">&nbsp;&nbsp;&nbsp;</i>Bookmark added successfully', 5, "info")
				},
				error: function (a) {}
			})
		}
		if (j === "delete") {
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/delete.cgi",
				data: __f___gd(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error")
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "rename") {
			var h = $('#list_form > input[type="hidden"][name="path"]').val();
			modal_dismiss();
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/rename.cgi",
				data: $("#renameForm").serialize(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "create_folder") {
			var h = $('#list_form > input[type="hidden"][name="path"]').val();
			modal_dismiss();
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/create_folder.cgi",
				data: $("#createFolderForm").serialize(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "create_file") {
			var h = $('#list_form > input[type="hidden"][name="path"]').val();
			modal_dismiss();
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/create_file.cgi",
				data: $("#createFileForm").serialize(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "url_download") {
			var h = $('#list_form > input[type="hidden"][name="path"]').val();
			modal_dismiss();
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/http_download.cgi",
				data: $("#downFromUrlForm").serialize(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find(".panel-body").text().match(/100 %/) && !$(a).find(".panel-body").text().match(/100%/) && !$(a).find(".panel-body h3").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 0, j);
						return
					} else {
						if ($(a).find(".panel-body h3").length) {
							messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body h3").html(), 10, "error");
							__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 0, j);
							return
						} else {
							messenger('<i class="fa fa-download">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "success");
							__f____r("get", "index.cgi?path=" + (h ? h : ""), false, 0)
						}
					}
				},
				error: function (a) {}
			})
		}
		if (j === "search") {
			var h = $('#list_form > input[type="hidden"][name="path"]').val(),
				k = $("#searchForm").find('input[name="query"]').val();
			modal_dismiss();
			messenger('<i class="fa fa-search">&nbsp;&nbsp;&nbsp;</i>Searching <em>`' + $('#searchForm input[name="query"]').val() + "`</em>. Please wait...", 5, "info");
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/search.cgi",
				data: $("#searchForm").serialize(),
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					var b = $('body[class*="filemin"]');
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 0, "search");
					$("#list_form table").find(".fa-i-cursor").parent("a.action-link").remove();
					$("#list_form table").find(".at-font-box-remove").parent("a.action-link").remove();
					$("#list_form table").find(".fa-edit").parent("a.action-link").remove();
					if (b.find(".breadcrumb .fa-hdd-o").length) {
						b.find(".breadcrumb .fa-hdd-o").removeClass("fa-hdd-o").addClass("fa-search").addClass("text-light")
					} else {
						b.find(".breadcrumb li:first-child a").html('<i class="fa fa-search text-light"></i>')
					}
					b.find(".breadcrumb li:not(:first-child) a").replaceWith(function () {
						return $("<span>", {
							html: $(this).html()
						})
					});
					b.find(".breadcrumb li").addClass("text-light");
					$(".__filemin-search-results").remove();
					$_br = $(".breadcrumb > li:last-child");
					$_br.html($_br.html() + '<span class="__filemin-search-results">' + ($(".breadcrumb > li:last-child a i").hasClass("fa-search") ? "&nbsp;&nbsp;&nbsp;/&nbsp;" : "") + '&nbsp;&nbsp;:&nbsp;&nbsp;<span class="text-primary __filemin-search-results-data cursor-pointer">`<em>' + k + "</em>`</span></span>");
					if (__list_table_total_rows > 1) {
						messenger('<i class="fa fa-search">&nbsp;&nbsp;&nbsp;</i>Found <samp>' + __list_table_total_rows + "</samp> matches", 5, "success")
					} else {
						if (__list_table_total_rows == 1) {
							messenger('<i class="fa fa-search">&nbsp;&nbsp;&nbsp;</i>Found <samp>1</samp> match', 5, "success")
						} else {
							messenger('<i class="fa fa-search">&nbsp;&nbsp;&nbsp;</i>No matches found', 5, "warning")
						}
					}
					if (settings_favorites) {
						f__dt()
					}
				},
				error: function (a) {}
			})
		}
		if (j === "chmod") {
			$("#list_form").append('<input type="hidden" name="perms" value="' + g[0] + '" class="_filemin-tmp-chmod-inputs">');
			$("#list_form").append('<input type="hidden" name="applyto" value="' + g[1] + '" class="_filemin-tmp-chmod-inputs">');
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/chmod.cgi",
				data: __f___gd(),
				dataType: "text",
				success: function (a) {
					$("#list_form ._filemin-tmp-chmod-inputs").remove();
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					modal_dismiss();
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "chown") {
			$("#list_form").append('<input type="hidden" name="owner" value="' + g[0] + '" class="_filemin-tmp-chown-inputs">');
			$("#list_form").append('<input type="hidden" name="group" value="' + g[1] + '" class="_filemin-tmp-chown-inputs">');
			$("#list_form").append('<input type="hidden" name="recursive" value="' + g[2] + '" class="_filemin-tmp-chown-inputs">');
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/chown.cgi",
				data: __f___gd(),
				dataType: "text",
				success: function (a) {
					$("#list_form ._filemin-tmp-chown-inputs").remove();
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					modal_dismiss();
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
		if (j === "compress") {
			$("#list_form").append('<input type="hidden" name="arch" value="' + g[0] + '" class="_filemin-tmp-compress-inputs">');
			$("#list_form").append('<input type="hidden" name="method" value="' + g[1] + '" class="_filemin-tmp-compress-inputs">');
			modal_dismiss();
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/compress.cgi",
				data: __f___gd(),
				dataType: "text",
				success: function (a) {
					$("#list_form ._filemin-tmp-compress-inputs").remove();
					if (!$(a).find("#list_form").length) {
						messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), 1, j)
				},
				error: function (a) {}
			})
		}
	}

	function __f___cs() {
		$("#list_form table tbody tr").removeClass("m-active m-not-active")
	}

	function __f___u(r, p, k, q) {
		$("#DataTables_Table_0").dataTable().fnDestroy();
		$("body").unbind("keydown", onkeydown);
		if (r === "upd") {
			var n = p.find(".fa-font").first().parents("td").index();
			$("body").find("#list_form table tbody").empty();
			$("body").find("#list_form table tbody").append(p);
			__f_____ul();
			__mr()
		} else {
			var n = $("#list_form table").find(".fa-font").first().parents("td").index()
		}
		if (typeof localStorage["DataTables_DataTables_Table_0_/" + __f___mn() + "/index.cgi"] != "undefined") {
			_filemin_data = JSON.parse(localStorage["DataTables_DataTables_Table_0_/" + __f___mn() + "/index.cgi"])
		} else {
			_filemin_data = false
		}
		var m = ($.inArray($("#headln2r > a[data-config-pagination]").data("config-pagination"), [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]) > -1 ? $("#headln2r > a[data-config-pagination]").data("config-pagination") : 25),
			l = (($.inArray(parseInt(localStorage.getItem("_________per_page")), [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]) > -1) ? parseInt(localStorage.getItem("_________per_page")) : false),
			o = ((_filemin_data.length && !l) ? (l ? l : _filemin_data.length) : m);
		delete localStorage._________per_page;
		if (n != 3 && n != 4) {
			n = false
		}
		if (settings_window_customized_checkboxes_and_radios) {
			$(".acheckbox, .aradio").icheck("destroy");
			$('input[type="radio"], input[type="checkbox"]').icheck({
				checkboxClass: "acheckbox",
				radioClass: "aradio",
				increaseArea: "20%"
			})
		}
		$("#list_form > table").unbind("click");
		$("#list_form > table").on("click", 'a .fa.fa-edit, a[href^="edit_file.cgi"]', function (a) {
			a.preventDefault();
			a.stopPropagation();
			var a = jQuery.Event("keydown");
			a.which = 115;
			$("body").trigger(a)
		});
		_f__table = $("#list_form > table").dataTable({
			order: [],
			aaSorting: [],
			bDestroy: true,
			fnDrawCallback: function (a) {
				__list_table_total_rows = a.fnRecordsTotal();
				if (a.fnRecordsTotal() <= a._iDisplayLength) {
					$(".dataTables_paginate").hide()
				} else {
					$(".dataTables_paginate").show()
				}
				$("#DataTables_Table_0_previous > a").html('<i class="fa fa-angle-left"></i>').css("border-top-left-radius", "2px").css("border-bottom-left-radius", "2px");
				$("#DataTables_Table_0_next > a").html('<i class="fa fa-angle-right"></i>').css("border-top-right-radius", "2px").css("border-bottom-right-radius", "2px");
				$("#list_form table").find(".fa-font").removeClass("fa-font").addClass("fa-i-cursor").css("margin-right", "5px").css("margin-left", "5px");
				$("#list_form table").find(".fa-external-link").removeClass("fa-external-link").addClass("at-font-box-remove").css("margin-right", "5px").css("margin-left", "5px");
				$("#list_form table").find(".fa-edit").css("margin-right", "7px").css("margin-left", "7px");
				$("#list_form table").find(".fa-arrow-right").removeClass("fa-arrow-right").addClass("fa-folder-open-o").css("margin-right", "30px").css("margin-left", "30px").parent("a").addClass("filemin-follow-file");
				if ($(".breadcrumb li:first-child a").find(".fa-search").length) {
					$("#list_form table").find(".fa-i-cursor").parent("a.action-link").remove();
					$("#list_form table").find(".at-font-box-remove").parent("a.action-link").remove();
					$("#list_form table").find(".fa-edit").parent("a.action-link").remove()
				}
			},
			initComplete: function (b) {
				$("#list_form table tbody").on("mouseout", "tr", function (c) {
					__f___cs()
				}).on("mouseover", "tr", function (c) {
					$(this).addClass("m-active")
				});
				if (k === 0 || $("#list_form table tbody tr").length === 1 && $("#list_form table tbody tr td.dataTables_empty").length) {
					$("div.dataTables_filter input").val("").trigger("keyup")
				}
				$('select[name="DataTables_Table_0_length"]').val(o).change();
				var a;
				$("body").on("keydown", function (g) {
					var v = g.keyCode ? g.keyCode : g.which;
					if (v == 13 && $(".modal.in._filemin_file_editor").length) {
						if (g.ctrlKey && g.shiftKey) {
							$("._filemin_file_editor_save_and_close").trigger("click")
						} else {
							if (g.ctrlKey) {
								$("._filemin_file_editor_save").trigger("click")
							}
						}
					}
					if (v == 13 && $("#list_form table tbody tr.m-active").length === 1 && !$(".modal.in").length && t__wi_p.t___p__xhr_r === 0) {
						$("#list_form table tbody tr.m-active").find("td:first-child").trigger("click");
						return
					}
					if (!$(".modal.in").length && g.ctrlKey && (String.fromCharCode(v).toLowerCase() == "c" || String.fromCharCode(v).toLowerCase() == "v" || String.fromCharCode(v).toLowerCase() == "x")) {
						if ($("#list_form table tbody tr td:first-child").find("input:checked").length === 0 && $("#list_form table tbody tr.m-active").length === 1 && g.ctrlKey && (String.fromCharCode(v).toLowerCase() == "c" || String.fromCharCode(v).toLowerCase() == "v" || String.fromCharCode(v).toLowerCase() == "x")) {
							$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
						}
					}
					if (v == 13) {
						if ($(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							if ($(".modal.in .modal-footer button._at_filemin_delete_submit").length) {
								$(".modal.in .modal-footer button._at_filemin_delete_submit").trigger("click")
							} else {
								if ($(".modal.in .modal-footer button.filemin-submitter-chmod").length) {
									$(".modal.in .modal-footer button.filemin-submitter-chmod").trigger("click")
								} else {
									if ($(".modal.in .modal-footer button._at_filemin_create_folder_submit").length) {
										$(".modal.in .modal-footer button._at_filemin_create_folder_submit").trigger("click")
									} else {
										if ($(".modal.in .modal-footer button._at_filemin_create_file_submit").length) {
											$(".modal.in .modal-footer button._at_filemin_create_file_submit").trigger("click")
										} else {
											if ($(".modal.in .modal-footer button.filemin-submitter-compress").length) {
												$(".modal.in .modal-footer button.filemin-submitter-compress").trigger("click")
											} else {
												if ($(".modal.in .modal-footer button._at_filemin_rename_submit").length) {
													$(".modal.in .modal-footer button._at_filemin_rename_submit").trigger("click")
												} else {
													if ($(".modal.in .modal-footer button._at_filemin_search_submit").length) {
														$(".modal.in .modal-footer button._at_filemin_search_submit").trigger("click")
													}
												}
											}
										}
									}
								}
							}
						}
					}
					if (v == 13 && $("#list_form table tbody tr").length === 1 && !$(".modal.in").length && t__wi_p.t___p__xhr_r === 0) {
						$("#list_form table tbody tr").find("td:first-child").trigger("click");
						return
					}
					if (v == 13) {
						return
					}
					if ((v == 32) && !g.shiftKey && !$("#list_form table tbody tr.m-active").length) {
						return
					}
					if ((v == 46 || v == 113 || v == 114 || v == 115 || v == 116 || v == 117 || v == 119) && !$(".ui_checked_columns input:checked").length && !$(".modal.in").length && !$("input").is(":focus") && !$("#list_form table tbody tr.m-active").length && (!g.shiftKey || (v == 116 && g.shiftKey) || (v == 115 && !g.shiftKey))) {
						g.preventDefault();
						g.stopPropagation();
						if (t___wi.document.activeElement && $(t___wi.document.activeElement).is('a[href^="edit_file.cgi"]')) {
							return
						}
						messenger('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;&nbsp;</i>Nothing is selected!', 3, "warning");
						return
					}
					if (!g.shiftKey && !g.ctrlKey && !g.altKey && !g.metaKey) {
						a = $("#list_form table tbody tr.m-active").removeClass("m-active");
						var c = a.index();
						var d = a.index();
						if (v == 38 && !$(".modal.in").length) {
							d--;
							$(".dataTables_filter label input").blur();
							$("#list_form table tbody tr").addClass("m-not-active")
						}
						if (v == 40 && !$(".modal.in").length) {
							d++;
							$(".dataTables_filter label input").blur();
							$("#list_form table tbody tr").addClass("m-not-active")
						}
					}
					if ((v == 38 || v == 40 || v == 32 || v == 13 || v == 46 || v == 119 || v == 117 || v == 115 || v == 116 || v == 113 || v == 114) && !$(".modal.in").length) {
						a = $("#list_form table tbody tr").eq(d).addClass("m-active m-not-active")
					}
					if (v == 27) {
						g.preventDefault();
						g.stopPropagation();
						$('.modal.in button[data-dismiss="modal"]').trigger("click")
					}
					if (v == 35 && !$("input").is(":focus")) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							a = $("#list_form table tbody tr").eq(parseInt($("#list_form table tbody tr").length) - 1).addClass("m-active m-not-active")
						}
					}
					if (v == 36 && !$("input").is(":focus")) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							a = $("#list_form table tbody tr").eq(0).addClass("m-active m-not-active")
						}
					}
					if (v == 13) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$(".dataTables_filter label input").blur();
							$("#list_form table tbody tr.m-active").find("td:first-child").trigger("click")
						}
					}
					if (v == 8 && !$(".filemin-main-spinner").is(":visible") && !$("input").is(":focus")) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$('#headln2l > a[href*="filemin"][href*="index.cgi"]:not(.hidden)').trigger("click")
						}
					}
					if (v == 32) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click");
							var h = jQuery.Event("keydown");
							h.which = 40;
							$("body").trigger(h)
						}
					}
					if (v == 106 || (g.shiftKey && v == 56)) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$('body button[onclick="invertSelection()"]').trigger("click")
						}
					}
					if (v == 107 || (g.shiftKey && v == 187)) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$('body button[onclick="selectAll()"]').trigger("click")
						}
					}
					if (v == 109 || (g.shiftKey && v == 189)) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							var f = document.getElementsByClassName("ui_checked_columns");
							for (i = 0; i < f.length; i++) {
								var u = f[i].getElementsByTagName("input")[0];
								if (u.checked) {
									rowClick(f[i])
								}
							}
							if (settings_window_customized_checkboxes_and_radios) {
								$(".acheckbox, .aradio").icheck("updated")
							}
							__f___lb()
						}
					}
					if ((v == 46 || v == 119) && !$("input").is(":focus")) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							if ($(".filemin-button-delete.disabled").length) {
								$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
							}
							$("body .filemin-button-delete").trigger("click");
							__f___cs()
						}
					}
					if (v == 113) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							if ($(".filemin-button-chmod.disabled").length) {
								$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
							}
							$("body .filemin-button-chmod a").trigger("click");
							__f___cs()
						}
					}
					if (v == 114) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							if ($(".filemin-button-chown.disabled").length) {
								$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
							}
							$("body .filemin-button-chown a").trigger("click");
							__f___cs()
						}
					}
					if (v == 116 && !g.shiftKey) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							if ($(".filemin-button-compress.disabled").length) {
								$("#list_form table tbody tr.m-active").find("td:first-child input").trigger("click")
							}
							$("body .filemin-button-compress a").trigger("click");
							__f___cs()
						}
					}
					if (v == 118 && !g.shiftKey) {
						if (!$(".modal.in").length) {
							g.preventDefault();
							g.stopPropagation();
							$('a[onclick = "createFolderDialog()"]').trigger("click");
							__f___cs()
						}
					}
					if (v == 117) {
						if (!$(".modal.in").length) {
							if ($("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").length) {
								g.preventDefault();
								g.stopPropagation();
								$("#list_form table tbody tr.m-active").find("i.fa-i-cursor").parent("a").trigger("click");
								__f___cs()
							}
						}
					}
					if (v == 115 && !g.shiftKey) {
						if (!$(".modal.in").length) {
							$(".filemin-main-spinner").removeClass("hidden");
							if ($("#list_form table tbody tr.m-active").find("i.fa-edit").parent("a").length) {
								g.preventDefault();
								$.ajax({
									type: "POST",
									url: $("#list_form table tbody tr.m-active").find("i.fa-edit").parent("a").attr("href"),
									data: false,
									dataType: "text",
									success: function (t) {
										$(".filemin-main-spinner").addClass("hidden");
										var s = $(t).find(".panel-body > .ui_form"),
											y = "<strong>" + $(t).find(".panel-body").contents().filter(function () {
												return !!$.trim(this.innerHTML || this.data)
											}).first().text() + "</strong>";
										$("body").append('<div class="modal fade fade7 _filemin_file_editor">															  <div class="modal-dialog modal-lg" style="width: 91%; height: 100%">															    <div class="modal-content" style="height: 94%">															      <div class="modal-header">															        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>															        <h5 class="modal-title"><i class="fa fa-lg fa-pencil-square-o" alt="Edit" style="margin-right: 7px; vertical-align: -32%">&nbsp;&nbsp;</i><kbd>' + y + '</kbd></h5>															      </div>															      <div class="modal-body">															      </div>															    </div>															  </div>															</div>														');
										$("._filemin_file_editor .modal-body").append(s);
										$("._filemin_file_editor").on("show.bs.modal", function () {
											$(this).find("textarea").css("height", (parseInt($(window).height()) - 200));
											$(this).find(".ui_form_end_buttons tr td").css("padding-left", "4px");
											var w = $(this).find(".ui_form_end_buttons tr td span:first-child input"),
												x = $(this).find(".ui_form_end_buttons tr td span:nth-child(2) input"),
												B = '<button type="button" class="btn btn-danger" data-dismiss="modal" style="margin-top: 2px; margin-bottom: 2px"><i class="fa fa-times-circle">&nbsp;&nbsp;</i>Close</button>';
											$(this).find(".ui_form_end_buttons tr td").html('<div style="margin-top: 6px;">																								<button type="submit" class="btn btn-primary _filemin_file_editor_save"><i class="fa fa-floppy-o">&nbsp;&nbsp;</i>' + w.val() + '</button>																								<button type="submit" class="btn btn-primary _filemin_file_editor_save_and_close hidden"><i class="fa fa-floppy-o">&nbsp;&nbsp;</i>' + x.val() + "</button>																								" + B + "																								</div>")
										});
										$("._filemin_file_editor").on("shown.bs.modal", function () {
											t__cm___init($(this).find("textarea"), $(y).text(), [null, parseInt($(".modal.in._filemin_file_editor .modal-content").css("height")) - 130]);
											$(t___wi).on("resize", function () {
												__cm_editor.setSize(null, parseInt($(".modal.in._filemin_file_editor .modal-content").css("height")) - 130)
											});
											$("._filemin_file_editor .CodeMirror-wrap").animate({
												opacity: 1
											}, 400, function () {
												__cm_editor.focus()
											})
										});
										$("._filemin_file_editor").on("hide.bs.modal", function () {
											$("._filemin_file_editor").remove();
											$(t___wi).unbind("resize");
											tt__m__res()
										});
										$("._filemin_file_editor").modal("show");
										$('form[action="save_file.cgi"]').on("click", "._filemin_file_editor_save, ._filemin_file_editor_save_and_close", function (w) {
											if (_filemin_file_editor_processing === 1) {
												w.preventDefault();
												w.stopPropagation();
												return
											}
											$(this).find("i").replaceWith(t__lo__btn_md())
										});

										function z() {
											$('form[action="save_file.cgi"] ._filemin_file_editor_save .cspinner').remove();
											$('form[action="save_file.cgi"] ._filemin_file_editor_save i').remove();
											$('form[action="save_file.cgi"] ._filemin_file_editor_save').prepend('<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>');
											$('form[action="save_file.cgi"] ._filemin_file_editor_save_and_close .cspinner').remove();
											$('form[action="save_file.cgi"] ._filemin_file_editor_save_and_close i').remove();
											$('form[action="save_file.cgi"] ._filemin_file_editor_save_and_close').prepend('<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>')
										}
										_filemin_file_editor_processing = 0;
										$('form[action="save_file.cgi"]').on("submit", function (w) {
											w.preventDefault();
											w.stopPropagation();
											if (_filemin_file_editor_processing === 1) {
												return
											}
											messenger('<i class="fa fa-floppy-o">&nbsp;&nbsp;&nbsp;</i>Saving file `<samp><em>' + y + "</em></samp>`. Please wait...", 2, "info");
											if (_filemin_file_editor_processing === 0) {
												_filemin_file_editor_processing = 1;
												$.ajax({
													type: "POST",
													url: $_____link_full + "/" + __f___mn() + "/save_file.cgi",
													data: $("._filemin_file_editor form").serialize(),
													dataType: "text",
													success: function (x) {
														var B = $('form[action="save_file.cgi"] .cspinner');
														if (!$(x).find("textarea#data").length) {
															messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>' + $(x).find(".panel-body").html(), 5, "error");
															if (B.parent(".btn").index() === 1) {
																modal_dismiss()
															}
															_filemin_file_editor_processing = 0;
															z();
															return
														}
														if (B.parent(".btn").index() === 0) {
															B.replaceWith('<i class="fa fa-check-circle-o">&nbsp;&nbsp;</i>');
															messenger('<i class="fa fa-floppy-o">&nbsp;&nbsp;&nbsp;</i>File has been successfully saved', 3, "success");
															setTimeout(function () {
																z()
															}, 1000)
														} else {
															if (B.parent(".btn").index() === 1) {
																z();
																messenger('<i class="fa fa-floppy-o">&nbsp;&nbsp;&nbsp;</i>File has been successfully saved and closed', 4, "success");
																modal_dismiss()
															}
														}
														_filemin_file_editor_processing = 0
													}
												})
											}
										})
									}
								});
								__f___cs()
							} else {
								$(".filemin-main-spinner").addClass("hidden");
								messenger('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;&nbsp;</i>Can not edit this type of selection', 5, "warning")
							}
						}
					}
					if (!$("input").is(":focus") && !$("select").is(":focus") && !$("textarea").is(":focus") && !$(".modal.in").length && v != 32 && v != 113 && v != 114 && v != 106 && v != 107 && v != 116 && v != 109 && v != 46 && v != 119 && v != 118 && v != 115) {
						if ($("#DataTables_Table_0_next").parents("ul.pagination").hasClass("pointer-events-none")) {
							return
						}
						if (v === 39) {
							$("#DataTables_Table_0_next").trigger("click");
							$("#list_form table tbody tr.m-active").removeClass("m-active");
							$("#list_form table tbody tr").addClass("m-not-active")
						} else {
							if (v === 37) {
								$("#DataTables_Table_0_previous").trigger("click");
								$("#list_form table tbody tr.m-active").removeClass("m-active");
								$("#list_form table tbody tr").addClass("m-not-active")
							} else {
								var j = String.fromCharCode(v);
								if (j && /[a-zA-Z0-9]/.test(j) && !g.ctrlKey && !g.altKey && !g.metaKey) {
									$(".dataTables_filter label input").trigger("keyup").focus()
								}
							}
						}
					}
					if (g.shiftKey && g.ctrlKey) {
						return
					}
					if (!$(".modal.in").length && (v == 115 || v == 116 || v == 118 || String.fromCharCode(v).toLowerCase() == "c" || String.fromCharCode(v).toLowerCase() == "v" || String.fromCharCode(v).toLowerCase() == "x")) {
						if ((!(String.fromCharCode(g.which).toLowerCase() == "c" && g.ctrlKey) && !(String.fromCharCode(g.which).toLowerCase() == "v" && g.ctrlKey) && !(String.fromCharCode(g.which).toLowerCase() == "x" && g.ctrlKey) && !(v == 115 && g.shiftKey) && !(v == 116 && g.shiftKey) && !(v == 118 && g.shiftKey)) && !(g.which == 19)) {
							return true
						}
						g.preventDefault();
						if (v == 115) {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								$('a[onclick = "createFileDialog()"]').trigger("click");
								__f___cs();
								return
							}
						}
						if (v == 116) {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								if ($("#list_form table tbody tr.m-active").find("i.at-font-box-remove").parent("a").length) {
									g.preventDefault();
									g.stopPropagation();
									$("#list_form table tbody tr.m-active").find("i.at-font-box-remove").parent("a")[0].click();
									__f___cs()
								} else {
									messenger('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;&nbsp;</i>Can not decompress this type of file', 5, "warning")
								}
								return
							}
						}
						if (v == 118) {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								$('a[onclick = "searchDialog()"]').trigger("click");
								__f___cs();
								return
							}
						}
						if (String.fromCharCode(v).toLowerCase() == "c") {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								if (!$(".filemin-button-copy.disabled").length) {
									$("body .filemin-button-copy a").trigger("click");
									__f___cs()
								} else {
									messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>No folders/files selected to copy', 5, "error")
								}
								return
							}
						}
						if (String.fromCharCode(v).toLowerCase() == "v") {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								if (!$(".filemin-button-paste.disabled").length) {
									$("body .filemin-button-paste a").trigger("click");
									__f___cs()
								} else {
									messenger('<i class="fa fa-clipboard">&nbsp;&nbsp;&nbsp;</i>Clipboard is empty', 5, "error")
								}
								return
							}
						}
						if (String.fromCharCode(v).toLowerCase() == "x") {
							if (!$(".modal.in").length) {
								g.stopPropagation();
								if (!$(".filemin-button-cut.disabled").length) {
									$("body .filemin-button-cut a").trigger("click");
									__f___cs()
								} else {
									messenger('<i class="fa fa-exclamation-triangle">&nbsp;&nbsp;&nbsp;</i>No folders/files selected to cut', 5, "error")
								}
								return
							}
						}
						return
					}
				})
			},
			bInfo: false,
			destroy: true,
			oLanguage: {
				sSearch: " "
			},
			conditionalPaging: true,
			columnDefs: [{
				orderable: false,
				targets: [0, 1, (n ? n : 0)]
			}],
			bStateSave: true,
			bPaginate: o,
			aLengthMenu: [[5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000], [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 250, 500, 1000]]
		});
		$('div button[onclick="removeDialog()"]').addClass("disabled filemin-button-delete").removeAttr("onclick");
		$('a[onclick="chmodDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-chmod");
		$('a[onclick="chownDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-chown");
		$('a[onclick="compressDialog()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-compress");
		$('a[onclick="copySelected()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-copy");
		$("li.filemin-button-copy").addClass("disabled");
		$('a[onclick="cutSelected()"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-cut");
		$("li.filemin-button-cut").addClass("disabled");
		if (!localStorage.getItem("copy") && !localStorage.getItem("cut")) {
			$('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("disabled filemin-button-paste")
		} else {
			$('a[onclick*="paste.cgi"]').removeAttr("onclick").parent("li").addClass("filemin-button-paste")
		}
		if (q === "extract") {
			messenger('<i class="fa fa-file-archive-o">&nbsp;&nbsp;&nbsp;</i>Extraction was successful', 5, "success")
		} else {
			if (q === "delete") {
				messenger('<i class="fa fa-trash-o">&nbsp;&nbsp;&nbsp;</i>Deletion was successful', 5, "success")
			} else {
				if (q === "chmod") {
					messenger('<i class="fa fa-user">&nbsp;&nbsp;&nbsp;</i>Permissions have been changed successfully', 5, "success")
				} else {
					if (q === "chown") {
						messenger('<i class="fa fa-users">&nbsp;&nbsp;&nbsp;</i>Ownership has been changed successfully', 5, "success")
					} else {
						if (q === "compress") {
							messenger('<i class="fa fa-file-archive-o">&nbsp;&nbsp;&nbsp;</i>Compression has successfully finished', 5, "success")
						} else {
							if (q === "rename") {
								messenger('<i class="fa fa-i-cursor">&nbsp;&nbsp;&nbsp;</i>Rename operation was successful', 5, "success")
							} else {
								if (q === "create_folder") {
									messenger('<i class="fa fa-folder">&nbsp;&nbsp;&nbsp;</i>Folder `<samp>' + $('#createFolderForm input[name="name"]').val() + "</samp>` was created successfully", 5, "success")
								} else {
									if (q === "create_file") {
										messenger('<i class="fa fa-file">&nbsp;&nbsp;&nbsp;</i>File `<samp>' + $('#createFileForm input[name="name"]').val() + "</samp>` was created successfully", 5, "success")
									}
								}
							}
						}
					}
				}
			}
		}
	}

	function __f____r(k, n, m, h) {
		if (k === "get") {
			if ($("body").find("#list_form table tbody").hasClass("filemin-updating")) {
				return
			}
			var l = $.url(n).param("path"),
				j = l.split("/");
			__f_____lo(true, true);
			$.ajax({
				type: "POST",
				url: $_____link_full + "/" + __f___mn() + "/" + n,
				data: false,
				dataType: "text",
				success: function (a) {
					if (!$(a).find("#list_form").length) {
						messenger($(a).find(".panel-body").html(), 10, "error");
						__f_____ul();
						return
					}
					var b = $("body");
					b.find(".breadcrumb").empty();
					$__path_prev = "";
					if (access_level() == 0) {
						b.find(".breadcrumb").append('<li><a href="index.cgi?path="><i class="fa fa-hdd-o">&nbsp;</i></a></li>')
					} else {
						b.find(".breadcrumb").append('<li><a href="index.cgi?path="><i class="fa fa-user text-light">&nbsp;</i></a></li>')
					}
					$.each(j, function (c, d) {
						$__path_prev = $__path_prev + (d != "" ? "/" + d : "");
						if (d != "") {
							b.find(".breadcrumb").append('<li><a href="index.cgi?path=' + $__path_prev + '">' + d + "</a></li>")
						}
					});
					if (l) {
						$('#headln2l > a[href*="filemin"][href*="index.cgi"]').removeClass("hidden")
					} else {
						$('#headln2l > a[href*="filemin"][href*="index.cgi"]').addClass("hidden")
					}
					t___wi.history.pushState(null, null, $_____link_full + "/" + __f___mn() + "/index.cgi?path=" + l);
					$.each($('.modal .modal-body form input[name="path"], #list_form > input[type="hidden"][name="path"]'), function () {
						$(this).val(l)
					});
					$('ul li a[href^="bookmark.cgi?path="]').attr("href", "bookmark.cgi?path=" + l);
					__f___u("upd", $(a).find("#list_form table").find(".ui_checked_columns"), h, false);
					if (settings_favorites) {
						f__dt()
					}
					t__wi_p.__dpt()
				},
				error: function (a) {}
			})
		}
	}
	if (settings_favorites) {
		function f__gc() {
			return t__wi_p.$("#favorites-menu .favorites-menu-content li:not(.exclude)").length
		}

		function f__g() {
			var b = [];
			$.each(t__wi_p.$("#favorites-menu .favorites-menu-content li:not(.exclude) a"), function () {
				var f = $(this).text(),
					g = $(this).attr("href"),
					a = $(this).find(".wbm-sm").attr("data-product");
				favorite = {};
				favorite.link = g;
				favorite.title = f.trim();
				favorite.icon = a;
				b.push(favorite)
			});
			return b
		}

		function f__u() {
			$.ajax({
				type: "POST",
				url: $_____link_full + "/settings-favorites_save.cgi",
				data: ('{"favorites":' + JSON.stringify(f__g(), null, 4).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f") + "}"),
				success: function (b) {},
				error: function (b) {}
			})
		}

		function f__a(d, g, f) {
			if (f__gc() === 0) {
				t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-no-message").addClass("hidden");
				t__wi_p.$("#favorites-menu .favorites-menu-content .favorites-title sup a").removeClass("hidden")
			}
			t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-title").after('						<li class="menu-exclude ui-sortable-handle">                        	<a class="menu-exclude-link" target="page" href="' + d + '"><i data-product="' + f + '" class="wbm-' + f + ' wbm-sm">&nbsp;</i><span class="f__c">                            ' + g + '                        	&nbsp;<small class="hidden" style="font-size: 0.6em; position: absolute; margin-top: -1px"><i class="fa fa-times"></i></small></span></a>                    	</li>					')
		}

		function f__us() {
			if (f__gc() === 0) {
				t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-no-message").removeClass("hidden");
				t__wi_p.$("#favorites-menu .favorites-menu-content .favorites-title sup a").addClass("hidden")
			}
		}

		function f__r(b) {
			t__wi_p.$("#favorites-menu .favorites-menu-content").find('a[href="' + b + '"]').parent("li").effect("drop", {}, 300, function () {
				$(this).remove();
				$("#headln2c > .favorites").addClass("fa-star-o").removeClass("fa-star text-warning");
				f__us();
				f__u()
			})
		}

		function f__dt() {
			$(f__g()).each(function () {
				if ($(this)[0]) {
					var b = $.url(t___wi.location).attr("relative");
					if ($(this)[0].link == b || $(this)[0].link + "index.cgi" == b) {
						setTimeout(function () {
							$("#headln2c > .favorites").addClass("fa-star").removeClass("fa-star-o")
						}, 100);
						return false
					} else {
						setTimeout(function () {
							$("#headln2c > .favorites").removeClass("fa-star").addClass("fa-star-o")
						}, 100)
					}
				}
			})
		}
		f__dt();
		if (settings_favorites && access_level() == 0) {
			$("#headln2c").prepend('<i class="fa fa-inverse fa-2x fa-star-o text-lighter favorites" style="position: absolute; margin-left: -35px; margin-top: 2px;"></i>&nbsp;');
			$("body").append('<span id="favorites-target" style="position: absolute; top: 0; right: 0; visibility: hidden"></span>')
		}
		$("body").on("click", "#headln2c > .favorites", function (o) {
			o.preventDefault();
			var m = $.url(t___wi.location).attr("relative");
			if ($(this).hasClass("fa-star-o")) {
				$(this).removeClass("fa-star-o").addClass("fa-star text-warning");
				var l = $("#headln2c > font").text(),
					p = t__wi_p.$(".has-sub.active").text().trim(),
					j = t__wi_p.$(".sub_active").text().trim(),
					k = "",
					n = "";
				if (product_name() === "Virtualmin" || product_name() === "Cloudmin") {
					k = t__wi_p.$(".ui_select option:selected").text()
				}
				if ($('body[class^="filemin"]').length) {
					n = $.url(t___wi.location).param("path");
					if (!n) {
						n = "[/]"
					} else {
						n = "[" + n + "]"
					}
				}
				f__a(m, (((k.length ? (k + " – ") : "") + (p.length ? (p + "/") : "") + (j.length ? (j + ": ") : "")) + l.trim() + (n.length ? (" " + n) : "")), (product_name() === "Virtualmin" ? "virtualmin" : product_name() === "Cloudmin" ? "cloudmin" : "webmin"))
			} else {
				$(this).addClass("fa-star-o").removeClass("fa-star text-warning");
				f__r(m)
			}
			f__u()
		});
		t__wi_p.$("#favorites-menu > div > nav > ul").sortable({
			revert: true,
			delay: 100,
			update: function () {
				f__u()
			}
		});
		t__wi_p.$("#favorites-menu .favorites-menu-content li.favorites-title").hover(function () {
			$(this).find("sup").removeClass("hidden")
		}, function () {
			$(this).find("sup").addClass("hidden")
		});
		t__wi_p.$("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function () {
			$(this).find("small").removeClass("hidden")
		}).on("mouseleave", "li:not(.exclude) span.f__c, li:not(.exclude) span.f__c small", function () {
			$(this).find("small").addClass("hidden")
		});
		t__wi_p.$("#favorites-menu .favorites-menu-content").on("mouseover", "li:not(.exclude) small", function () {
			$(this).find(".fa-times").removeClass("fa-times").addClass("fa-times-circle");
			$(this).animate({
				"font-size": "0.7em",
				"margin-top": "-2px",
				"margin-left": "-1px"
			}, 160)
		}).on("mouseleave", "li:not(.exclude) small", function () {
			$(this).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-times");
			$(this).animate({
				"font-size": "0.6em",
				"margin-top": "-1px",
				"margin-left": "0"
			}, 80)
		});
		t__wi_p.$("#favorites-menu .favorites-menu-content").on("click", "li:not(.exclude) small .fa-times-circle", function (b) {
			b.preventDefault();
			b.stopPropagation();
			f__r($(this).parents("a").attr("href"))
		});
		$(document).on("keydown", function (b) {
			if (t__wi_p.$(".favorites-menu-outer").css("left") == "0px" && b.keyCode == 27) {
				t__wi_p.$(".favorites-menu-outer").removeClass("hover")
			}
		});
		f__us()
	}

	function datePicker(d, q, r, p) {
		$monthCorrection = $(q).find("option:eq(0)").val() == 1 ? 0 : 1;
		var m = $(p),
			o = parseInt($(d).val()),
			l = ($(q).val() ? parseInt($(q).val()) + $monthCorrection : false),
			n = $(r).val();
		m.datepicker({
			format: " yyyy-m-d",
			language: $("body").data("language"),
			autoclose: true
		}).on("hide", function (a) {
			var b = m.val() ? m.val().split("-") : false;
			m.val("");
			if (b) {
				$(d).val(parseInt(b[2]));
				$(q).val(parseInt(b[1]) - $monthCorrection);
				$(r).val(parseInt(b[0]))
			}
		}).focus()
	}
	var $product_name = t__wi_p.$("#wrapper").data("product");
	$('body:not(".mobile-menu-toggler")').on("click", function (b) {
		t__wi_p.hide_mobile_menu();
		if (t__wi_p.$(".autocomplete-suggestions").is(":visible")) {}
	});
	if (t__wi_p.$(".switch-toggle").find('label[for="open_thirdlane"]').length) {
		t__wi_p.$('.switch-toggle input:not([id="open_webmin"])').each(function () {
			$(this).removeAttr("checked")
		}).promise().done(function () {
			t__wi_p.$("#open_webmin").prop("checked", true)
		})
	}
	if (__num()) {
		if ($current_directory == $_____link + "init/") {
			$.each($("table.table tbody tr"), function () {
				$(this).addClass("ui_checked_columns")
			})
		}

		function __mr() {
			$.each($(".ui_checked_columns"), function (a, b) {
				$(b).on("click", "td", function (d) {
					if ($(b).find("a[href]") && !$("body").hasClass("servers")) {
						var c = $(b).find("a[href]")[0];
						if (c && ($(this).find("a").attr("href") === $(c).attr("href") || $(this).find("a").attr("href") === undefined) && !$(d.target).is("select, input, .acheckbox, .aradio") && ($(this).parent("tr").find('a[href*="download.cgi"]').length === 0)) {
							d.preventDefault();
							if ($("body").attr("class") && $("body").attr("class").indexOf("filemin") > -1 && $(c).attr("href") && $(c).attr("href").indexOf("index.cgi?path=") > -1) {
								__f____r("get", $(c).attr("href"), false, 0);
								return
							}
							if ($(c).attr("target")) {
								window.open($(c).attr("href"), $(c).attr("target"))
							} else {
								window.location.href = $(c).attr("href")
							}
						}
					}
				}).on("contextmenu", "td", function (c) {
					c.preventDefault();
					if (($(this).parents("tr").find('input[type="checkbox"]:first').length && $(this).parents("tr").find('input[type="checkbox"][disabled]').length === 0) || ($(this).parents("tr").find('input[type="checkbox"][disabled]').length && $(this).parents("tr").find("input").length > 1)) {
						if ($(this).parents("tr.ui_checked_columns").find('input[type="checkbox"]:first').is(":checked")) {
							$(this).parents("tr.ui_checked_columns").removeClass("hl-aw")
						} else {
							$(this).parents("tr.ui_checked_columns").addClass("hl-aw")
						}
						$(this).parents("tr.ui_checked_columns").find('input[type="checkbox"]:first').trigger("click");
						if (settings_window_customized_checkboxes_and_radios) {
							$(".acheckbox, .aradio").icheck("updated")
						}
					}
				})
			})
		}
		__mr();
		$.each($('input[type="radio"], input[type="checkbox"]'), function () {
			if ($(this)[0]) {
				$___text = $(this)[0].nextSibling
			}
			if ($(this).next("label").length === 0 && $___text && $___text.nodeValue && $___text.nodeValue.length > 1) {
				$(this).addClass("ui_radio");
				var c = $(this).attr("id") ? 'for="' + $(this).attr("id") + '"' : false;
				if (c === false && $(this).attr("name") && $(this).val()) {
					var d = "__replaced_" + $(this).attr("name") + "_" + $(this).val() + "";
					var c = 'for="' + d + '"';
					$(this).attr("id", d)
				}
				$($___text).wrap('<label class="radio"' + c + ">" + $___text.nodeValue.replace(/<hr>/g, "&lt;hr&gt;").replace(/<header>/g, "&lt;header&gt;") + " </label>");
				$($___text).remove()
			}
		}).promise().done(function () {
			if (settings_window_customized_checkboxes_and_radios) {
				$('input[type="radio"], input[type="checkbox"]').icheck({
					checkboxClass: "acheckbox",
					radioClass: "aradio",
					increaseArea: "20%"
				})
			}
		});
		$.each($(".ui_checked_columns td.ui_checked_checkbox"), function () {
			if (!$(this).parent("tr.ui_checked_columns").find('input[type="checkbox"][disabled]:first').length) {
				if (settings_window_customized_checkboxes_and_radios) {
					if ($(this).find(".acheckbox").hasClass("checked")) {
						$(this).parent("tr.ui_checked_columns").addClass("hl-aw")
					}
				} else {
					if ($(this).find('input[type="checkbox"]:first').is(":checked")) {
						$(this).parent("tr.ui_checked_columns").addClass("hl-aw")
					}
				}
				if (settings_window_customized_checkboxes_and_radios) {
					$(".acheckbox, .aradio").icheck("updated")
				}
			}
		});
		$("body").on("change", 'input[type="checkbox"], input[type="radio"]', function (b) {
			if ($(this).parents("tr.ui_checked_columns").length && $(this).parents("tr.ui_checked_columns").find("input:first").is($(this))) {
				if ($(this).is(":checked")) {
					$(this).parents("tr.ui_checked_columns").addClass("hl-aw")
				} else {
					$(this).parents("tr.ui_checked_columns").removeClass("hl-aw")
				}
			}
			setTimeout(function () {
				if (settings_window_customized_checkboxes_and_radios) {
					$(".acheckbox, .aradio").icheck("updated")
				}
			}, 2)
		});
		$("body").on("click", ".ui_link, .ui_link_replaced", function () {
			if (settings_window_customized_checkboxes_and_radios) {
				$(".acheckbox, .aradio").icheck("updated");
				$.each($(".acheckbox"), function () {
					if ($(this).hasClass("checked")) {
						$(this).parents("tr.ui_checked_columns").addClass("hl-aw")
					} else {
						$(this).parents("tr.ui_checked_columns").removeClass("hl-aw")
					}
				})
			} else {
				$.each($('input[type="checkbox"]'), function () {
					if ($(this).is(":checked")) {
						$(this).parents("tr.ui_checked_columns").addClass("hl-aw")
					} else {
						$(this).parents("tr.ui_checked_columns").removeClass("hl-aw")
					}
				})
			}
		});
		if ($current_page_full == $_____link_full + "/mysql/view_table.cgi") {
			$("body").on("click", ".ui_checked_checkbox", function (b) {
				$(this).find('input[type="checkbox"]').trigger("click");
				$(".acheckbox").icheck("updated")
			})
		}
	}
	if ($("body").hasClass("servers")) {
		$('form[action="delete_servs.cgi"] a.icon_link, form[action="delete_servs.cgi"] a.ui_link, form[action="delete_servs.cgi"] .col-xs-1').on("click", function (f) {
			var h = $__source_url + $(this).attr("href"),
				g = $(this).attr("href"),
				j = $(this);
			if ((g && g.indexOf("edit_serv.cgi") > -1) || (g && g.indexOf("logout.cgi") > -1)) {
				t___wi.location.href = g
			} else {
				if (g && g.indexOf("://") === -1) {
					t___wi.open(h)
				} else {
					t___wi.open(g)
				}
			}
			f.preventDefault();
			f.stopPropagation()
		})
	}
	if ($current_page_full == $_____link_full + "/apache/edit_global.cgi" || $current_page_full == $_____link_full + "/apache/edit_virt.cgi" || $current_page_full == $_____link_full + "/apache/edit_dir.cgi") {
		$.each($(".ui_opt_textbox.form-control"), function () {
			if ($(this).parent("span").next("button.btn.btn-default.file_chooser_button").length > 0) {
				$(this).css("margin-right", "4px")
			}
		})
	}
	$.each($("input[onclick]"), function () {
		if (!$(this).parent(".aradio").length) {
			$(this).next("label").attr("style", "margin-left: 3px !important;")
		}
	});

	function hidden_opener(c, d) {
		if ($("#" + c).parent(".opener_container").length === 0) {
			$("#" + c).wrapAll('<div class="opener_container opener_sub_container margined-top"></div>')
		}
		if ($("#" + c).hasClass("opener_shown")) {
			$("#" + c).parent(".opener_container").show().find("#" + c).slideUp($settings_animation_tabs_slide_time, function () {
				$("#" + c).removeClass("opener_shown").addClass("opener_hidden").parent('.opener_container:not(".opener_sub_container")').hide();
				$("#" + c).parent(".opener_sub_container").removeClass("margined-top")
			})
		} else {
			$("#" + c).slideUp(0).removeClass("opener_hidden").addClass("opener_shown").parent(".opener_container").slideDown($settings_animation_tabs_slide_time).find(".opener_shown").slideDown($settings_animation_tabs_slide_time);
			$("#" + c).parent(".opener_sub_container").addClass("margined-top")
		}
	}
	if ($(".opener_shown").length > 0) {
		if ($(".opener_trigger").length > 0) {
			$(".panel-body  .ui_form .table  tbody  tr").removeClass("thead");
			$(".opener_trigger").parents("table.table").attr("style", "margin-bottom:6px !important; border-collapse: separate !important; border: 0 !important; border-bottom:1px solid #f0f0f0 !important;");
			$(".opener_trigger").parents("tr").attr("style", "border: 0 !important");
			$(".opener_trigger").parent("td").attr("style", "vertical-align: middle; height:37px; text-align:left; border:0; border-left:1px solid #f0f0f0; border-right:1px solid #f0f0f0; border-top:4px solid #f0f0f0; box-shadow:0 1px 1px rgba(0,0,0,.05); border-top-left-radius:4px; border-top-right-radius:4px");
			$(".opener_trigger").parent("td").find("a").addClass("link_hover_effect").attr("style", "padding-left:3px; font-size:16px; line-height: 20px !important; font-weight: 400 !important")
		}
	}
	if ($('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').length > 0) {
		$('a[href^="javascript:hidden_opener"]:not(".opener_trigger")').each(function () {
			$(this).find("img").length > 0 ? $(this).remove() : false;
			$(this).css("border-bottom", "0");
			$(this).parents("table.table").attr("style", "margin-bottom:6px !important; border-collapse: separate !important; border: 0 !important; border-bottom:1px solid #f0f0f0 !important;");
			$(this).parent("td").attr("style", "vertical-align: middle; height:27px; background: #f5f5f5; text-align:left; border:0; border-left:1px solid #f0f0f0; border-right:1px solid #f0f0f0; border-top:4px solid #f0f0f0; border-bottom:1px solid #f0f0f0 !important; border-top-left-radius:4px; border-top-right-radius:4px");
			$(this).parent("td").find("a").addClass("link_hover_effect").attr("style", "padding-left:6px; font-size:14px; font-weight: 400 !important; background: #f5f5f5 !important");
			if ($(this).parent().is(".panel-body") || $(this).parent().is(".ui_form")) {
				var c = $(this).parent().is(".panel-body") ? ".panel-body" : ".ui_form";
				$(this).parent(c).find('a[href^="javascript:hidden_opener"]:eq(1)').wrapAll('<div class="opener_extra_container"></div>');
				$(this).parent('.panel-body > a[href^="javascript:hidden_opener"]:first-child').remove();
				var d = $(this).parent(c).find(".opener_extra_container");
				$(d).next("br").remove();
				$(d).attr("style", "vertical-align: middle; height:30px; background: #f5f5f5; text-align:left; border:0; border-left:1px solid #f0f0f0; border-right:1px solid #f0f0f0; border-top:4px solid #f0f0f0; border-bottom:1px solid #f0f0f0 !important; border-top-left-radius:4px; border-top-right-radius:4px;");
				$(d).find("a").attr("style", "padding-left:8px; line-height:24px; font-size:14px; font-weight: 400 !important; background: #f5f5f5 !important").addClass("link_hover_effect");
				$(d).next(".opener_hidden").attr("style", "padding:8px")
			}
		});
		$.each($(".opener_hidden"), function () {
			$(this).css("display", "none")
		})
	}
	$("a.opener_trigger").each(function () {
		$(this).parent("td").css("text-align", "left")
	});
	$('form[action*="seen_newfeatures.cgi"]').each(function () {
		$(this).parents("table.table-striped.table-rounded").next(".ui_form_end_buttons").css("margin-top", "14px")
	});
	$("body").on("submit", 'form[action*="seen_newfeatures.cgi"]', function (b) {
		b.preventDefault();
		$this = $(this);
		$.ajax({
			type: "GET",
			url: $(this).attr("action"),
			data: false,
			statusCode: {
				200: function () {
					$this.parents(".panel.panel-default").remove()
				}
			}
		})
	});
	$(t__wi_p.$('iframe[name="page"]').contents()).keydown(function (b) {
		t__wi_p.search_control(b);
		t__wi_p.shortcut_control(b)
	});
	$(".authentic_update").on("click", function (b) {
		b.preventDefault();
		b.stopPropagation();
		t__wi_p.history.pushState(null, null, $_____link_full + "/?updating-webmin-theme");
		t__wi_p.$('iframe[name="page"]').attr("src", $(this).attr("href"))
	});
	$('a[data-href*="/webmin/edit_webmincron.cgi"], a[data-href*="/package-updates/index.cgi"]').on("click contextmenu", function (b) {
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
	$(".opener_container").each(function (d, c) {
		if ($(this).find("div").hasClass("opener_hidden")) {
			$(this).hide()
		} else {
			$(this).show()
		}
	});
	$("body").tooltip({
		selector: '[data-toggle="tooltip"], [data-toggle="virtualmin-license"], .panel-body td a',
		html: true
	});
	$.each($("div.barchart"), function () {
		var d = $(this).find('img[src*="red.gif"]'),
			c = $(this).parent("td").contents().filter(function () {
				return this.nodeType == 3
			}).text();
		if (d && d.attr("width")) {
			$(this).parent("td").html('<div class="graph-container graph-container-fw"><div class="graph"><div class="description"> ' + c + ' </div><strong class="bar" style="width:' + d.attr("width") + '">' + d.attr("width") + "</strong></div></div>")
		}
	});
	$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody > tr").css("border", "none").parents("table").css("margin-top", "20px");
	$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents("table.table-hardcoded > tbody").css("border", "none");
	$('.ui_grid_table > tbody > tr.ui_grid_row > td:has(button[type="submit"])').parents("table.ui_grid_table").css("border", "none");
	$("form.ui_form > table label.radio, form.ui_form > table label.checkbox").each(function () {
		var j = $(this),
			h = j.find("i.fa"),
			f = j.find("i.fa").text().trim(),
			g = j.text().trim();
		if (f.length === 0 && g.length === 0) {
			h.parent("label").remove()
		}
	});
	if ($current_page_full && $current_page_full.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search != "?updating-webmin-theme") {
		$(function () {
			function b() {
				$("#atrestore").confirmation({}, function () {
					$(this).off();
					var a = $(this);
					if (!a.hasClass("btn-inverse")) {
						setTimeout(function () {
							a.text($__theme_text_right_restoring + "...").prepend('<i class="fa fa-fw fa-circle-o-notch faa-spin faa-slow animated" style="margin-right:7px;"></i>').removeClass("btn-danger btn-default ").addClass("btn-inverse opacity-0_5");
							setTimeout(function () {
								var d = $(".ui_form").serialize();
								$.ajax({
									type: "POST",
									url: $_____link_full + "/index.cgi?xhr-settings=1&restore=1",
									data: d,
									success: function (c) {
										a.text($__theme_text_right_restored).prepend('<i class="fa fa-fw fa-check-square-o" style="margin-right:7px;"></i>').removeClass("btn-inverse opacity-0_5").addClass("btn-default");
										setTimeout(function () {
											a.text($__theme_text_right_restored).prepend('<i class="fa fa-fw fa-history" style="margin-right:7px;"></i>')
										}, 1800);
										setTimeout(function () {
											t__wi_p.t__s("open_webmin");
											t__wi_p.t__wm_l("open_webmin");
											t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/webmin/edit_themes.cgi")
										}, 1600)
									},
									error: function (c) {
										a.text($__theme_text_right_error + "!").prepend('<i class="fa fa-fw fa-exclamation-triangle" style="margin-right:7px;"></i>').addClass("btn-danger").removeClass("btn-default btn-inverse opacity-0_5");
										b()
									}
								})
							}, 1000)
						}, 0)
					}
				})
			}
			$(".nav.nav-tabs").prepend('<li><a data-toggle="tab" href="#atsettings"><span class="cspinner" style="position: relative"><span class="cspinner-icon" style="width:12px; height:12px; "></span></span></a></li>');
			$(".tab-pane").first().before('<div id="atsettings" class="tab-pane text-center"><span class="cspinner" style="margin-top:18px; position: relative"><span class="cspinner-icon"></span></span></div>');
			$('.nav-tabs a[href="#atsettings"]').tab("show");
			$.ajax({
				type: "GET",
				url: $_____link_full + "/index.cgi/?xhr-settings=1",
				data: false,
				dataType: "text",
				success: function (l) {
					$("#atsettings").html(l);
					if (t__wi_p.$("#open_webmin").length > 0 && t__wi_p.$(".switch-toggle input:checked").attr("id") != "open_webmin") {
						t__wi_p.t__s("open_webmin");
						t__wi_p.t__wm_l("open_webmin")
					}
					var a = $("div#atsettings").find(".ui_form");
					$__theme_text_right_save = a.data("text-save");
					$__theme_text_right_saved = a.data("text-settings_right_saved");
					$__theme_text_right_saving = a.data("text-settings_right_saving");
					$__theme_text_right_restore_defaults = a.data("text-settings_right_restore_defaults");
					$__theme_text_right_restored = a.data("text-settings_right_restored");
					$__theme_text_right_restoring = a.data("text-settings_right_restoring");
					$__theme_text_right_error = a.data("text-error");
					$('.nav-tabs a[href="#atsettings"]').text(a.data("text-current_theme"));
					$("div#atsettings").removeClass("text-center");
					b();
					settings_update();
					if (settings_window_customized_checkboxes_and_radios) {
						$('input[type="radio"][name^="settings_"], input[type="checkbox"][name^="settings_"]').icheck({
							checkboxClass: "acheckbox",
							radioClass: "aradio",
							increaseArea: "20%"
						})
					}
					var n = $("body").find(".fa.fa-sub-title").parent("span");
					$(n).next("br").remove();
					$(n).next("div.smaller").attr("style", "margin-top: -15px !important");
					n.remove();

					function j(c) {
						typeof c == "undefined" ? c = $('input[name="settings_right_hide_table_icons"]:checked') : false;
						var d = ["settings_right_small_table_icons", "settings_right_xsmall_table_icons", "settings_right_animate_table_icons", "settings_right_grayscaled_table_icons"];
						if (c.val() == "true") {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"]').prop("disabled", true);
								$('input[name="' + g + '"]').parent(".aradio").addClass("disabled")
							})
						} else {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"]').prop("disabled", false);
								$('input[name="' + g + '"]').parent(".aradio").removeClass("disabled")
							})
						}
					}
					j();
					$('input[name="settings_right_hide_table_icons"]').on("change", function () {
						j($(this));
						m()
					});

					function k(c) {
						typeof c == "undefined" ? c = $('input[name="settings_hotkeys_active"]:checked') : false;
						var d = ["settings_hotkey_custom_1", "settings_hotkey_custom_2", "settings_hotkey_custom_3", "settings_hotkey_custom_4", "settings_hotkey_custom_5", "settings_hotkey_custom_6", "settings_hotkey_custom_7", "settings_hotkey_custom_8", "settings_hotkey_custom_9", "settings_hotkey_toggle_modifier", "settings_hotkey_toggle_key_webmin", "settings_hotkey_toggle_key_virtualmin", "settings_hotkey_toggle_key_cloudmin", "settings_hotkey_toggle_key_usermin", "settings_hotkey_toggle_key_webmail", "settings_hotkey_focus_search", "settings_hotkey_reload", "settings_hotkey_sysinfo", "settings_hotkey_favorites"];
						if (c.val() == "false") {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"], select[name="' + g + '"]').prop("disabled", true)
							})
						} else {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"], select[name="' + g + '"]').prop("disabled", false)
							})
						}
					}
					k();
					$('input[name="settings_hotkeys_active"]').on("change", function () {
						k($(this))
					});

					function m(c) {
						typeof c == "undefined" ? c = $('input[name="settings_right_xsmall_table_icons"]:checked') : false;
						var d = ["settings_right_small_table_icons"];
						if (c.val() == "true") {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"], select[name="' + g + '"]').prop("disabled", true);
								$('input[name="' + g + '"], select[name="' + g + '"]').parent(".aradio").addClass("disabled")
							})
						} else {
							$.each(d, function (f, g) {
								$('input[name="' + g + '"], select[name="' + g + '"]').prop("disabled", false);
								$('input[name="' + g + '"], select[name="' + g + '"]').parent(".aradio").removeClass("disabled")
							})
						}
					}
					m();
					$('input[name="settings_right_xsmall_table_icons"]').on("change", function () {
						m($(this))
					});
					$('select[name="settings_navigation_color"]').change(function (c) {
						$("body").attr("data-theme", $(this).val());
						t__wi_p.$("body").attr("data-theme", $(this).val())
					});
					$('select[name="settings_background_color"]').change(function (c) {
						$("html").attr("data-background-style", $(this).val())
					});
					if (dashboard_switch()) {
						$('input[name="settings_sysinfo_link_mini"]').parent().parent().parent().parent("tr").remove()
					}
				}
			})
		});
		$("body").on("click", "#atsave:not(.btn-inverse)", function (d) {
			d.preventDefault();
			$(this).text($__theme_text_right_saving).prepend('<i class="fa fa-fw fa-circle-o-notch faa-spin faa-slow animated" style="margin-right:7px;"></i>').removeClass("btn-danger btn-success").addClass("btn-inverse opacity-0_5");
			var c = $(this);
			parse_bool($('input[name="settings_window_customized_checkboxes_and_radios"]:checked').val()) != settings_window_customized_checkboxes_and_radios ? _settings_reload = true : _settings_reload = false;
			settings_update();
			setTimeout(function () {
				$.ajax({
					type: "POST",
					url: $_____link_full + "/index.cgi?xhr-settings=1&save=1",
					data: c.parents("form").serialize(),
					dataType: "text",
					success: function (a) {
						t__wi_p.__lls();
						c.text($__theme_text_right_saved).prepend('<i class="fa fa-fw fa-check-square-o" style="margin-right:7px;"></i>').removeClass("btn-inverse opacity-0_5").addClass("btn-success");
						$.ajax({
							type: "GET",
							url: $_____link_full + "/index.cgi/?xhr-navigation=1&xhr-navigation-type=webmin",
							data: false,
							dataType: "text",
							success: function (b) {
								t__wi_p.$("body ul.navigation").html(b);
								$.ajax({
									type: "GET",
									url: $_____link_full + "/index.cgi/?xhr-buttons=1",
									data: false,
									dataType: "text",
									success: function (g) {
										t__wi_p.$("body ul.user-links").html(g);
										if (_settings_reload) {
											t__wi_p.$('iframe[name="page"]').attr("src", $_____link_full + "/webmin/edit_themes.cgi")
										}
									}
								})
							}
						});
						setTimeout(function () {
							c.text($__theme_text_right_save).prepend('<i class="fa fa-fw fa-floppy-o" style="margin-right:7px;"></i>')
						}, 1800)
					},
					error: function () {
						c.text($__theme_text_right_error + "!").prepend('<i class="fa fa-fw fa-exclamation-triangle" style="margin-right:7px;"></i>').addClass("btn-danger").removeClass("btn-success btn-inverse opacity-0_5")
					}
				})
			}, 300)
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
	if (t__wi_p.location.search == "?theme-update-finished" || $("#wrapper").data("notice") == 1) {
		setTimeout(function () {
			t__wi_p.$('iframe[name="page"]').contents().find("button[data-target='#update_notice']").click()
		}, 400)
	}
	$("body").on("click", 'button[data-href="#theme-info"]', function (b) {
		b.preventDefault();
		t__wi_p.$('iframe[name="page"]').contents().find("button[data-target='#update_notice']").addClass("manual").click()
	});
	$("#update_notice").on("hide.bs.modal", function () {
		if (!t__wi_p.$('iframe[name="page"]').contents().find("button[data-target='#update_notice']").hasClass("manual")) {
			t__wi_p.$('iframe[name="page"]').contents().find("button[data-target='#update_notice']").removeClass("manual");
			t__wi_p.$("aside").hide();
			t__wi_p.$(".loader-container").css("background-color", "#f0f0f0").show();
			t__wi_p.location = t__wi_p.location
		} else {
			t__wi_p.$("aside").find(".modal-backdrop.fade.in").remove()
		}
	}).on("show.bs.modal", function () {
		t__wi_p.$("aside").append('<div class="modal-backdrop fade in"></div>')
	});
	if ($current_page_full && $current_page_full.indexOf("/webmin/edit_themes.cgi") > -1 && t__wi_p.location.search == "?updating-webmin-theme") {
		setTimeout(function () {
			$iframe = t__wi_p.$('iframe[name="page"]').contents();
			$iframe.find(".panel-body .tab-pane.active").removeClass("active");
			$iframe.find(".panel-body #att_install").addClass("active");
			$iframe.find('.panel-body .ui_radio_table.table-hardcoded input[id="source_2"]').prop("checked", true);
			$iframe.find('.panel-body .ui_radio_table.table-hardcoded input[id="source_2"]').parents("td").next("td").find('input[name="url"]').val("https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz");
			$iframe.find('.panel-body .tab-pane.active form[action^="install_theme."]').submit();
			t__wi_p.history.pushState(null, null, $_____link_full + "/?downloading-webmin-theme")
		}, 400)
	} else {
		if ($current_page_full && ($current_page_full.indexOf("/webmin/install_theme.cgi") > -1 || $current_page_full.indexOf("/usermin/install_theme.cgi") > -1 || $current_page_full.indexOf("/usermin/edit_themes.cgi") > -1) && (t__wi_p.location.search == "?downloading-webmin-theme" || t__wi_p.location.search == "?downloading-usermin-theme" || t__wi_p.location.search == "?updating-usermin-theme")) {
			if (t__wi_p.$('.sub a[target="page"][href*="usermin"]:not([href*="cluster"])').length && t__wi_p.location.search != "?downloading-usermin-theme") {
				if (t__wi_p.location.search == "?updating-usermin-theme") {
					setTimeout(function () {
						$__iframe = t__wi_p.$('iframe[name="page"]').contents();
						$__iframe.find('input[name="source"][value="2"]').prop("checked", true);
						$__iframe.find('input[name="url"]').val("https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz");
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
				$(t__wi_p).on("popstate", function () {
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
			setTimeout(function () {
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
		setTimeout(function () {
			$sysinfo_content = $("body");
			$sysinfo_content.find("#" + $sysinfo_content.find("label:contains('cleanup_temp_files')").attr("for")).prop("checked", true);
			$sysinfo_content.find("#" + $sysinfo_content.find("label:contains('scheduled_collect_system_info')").attr("for")).prop("checked", true);
			$sysinfo_content.find("#" + $sysinfo_content.find("label:contains('collectinfo.pl')").attr("for")).prop("checked", true);
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
				$(t__wi_p).on("popstate", function () {
					t__wi_p.history.pushState(null, null, $_____link_full + "/")
				})
			}
		}
	}
	$("#system-status > div.panel-body > table > tbody > tr").on("mouseover", function () {
		$(this).find(".btn-hidden").removeClass("hidden")
	}).on("mouseout", function () {
		$(this).find(".btn-hidden").addClass("hidden")
	});
	$('input[name="but_switch"]').on("click", function (b) {
		$(t__wi_p).on("popstate", function () {
			t__wi_p.history.pushState(null, null, $_____link_full + "/")
		});
		$(this).parents("form").attr("target", "_top")
	});
	$('form[action*="switch_user.cgi"], a[href*="switch_user.cgi"]').each(function () {
		$(t__wi_p).on("popstate", function () {
			t__wi_p.history.pushState(null, null, $_____link_full + "/")
		});
		$(this).attr("target", "_top")
	});
	if ($current_directory == $_____link + "status/") {
		$('td > label > img[src*="images/up.gif"]:not(".ui_icon_protected")').each(function (d, f) {
			var g = $(this);
			$(f).attr("src", "" + $_____link_full + "/images/check.png")
		});
		$('td > label > img[src*="images/down.gif"]:not(".ui_icon_protected")').each(function (d, f) {
			var g = $(this);
			$(f).attr("src", "" + $_____link_full + "/images/cross.png")
		});
		$('td > label > img[src*="images/not.gif"]:not(".ui_icon_protected")').each(function (d, f) {
			var g = $(this);
			$(f).attr("src", "" + $_____link_full + "/images/not.png")
		})
	}
	$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/up.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/up.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/up.gif"]:not(".ui_icon_protected")').each(function (d, f) {
		var g = $(this);
		$(f).attr("src", "" + $_____link_full + "/images/check.png")
	});
	$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/down.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/down.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/down.gif"]:not(".ui_icon_protected")').each(function (d, f) {
		var g = $(this);
		$(f).attr("src", "" + $_____link_full + "/images/cross.png")
	});
	$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/not.gif"]:not(".ui_icon_protected"), .ui_form[action^="save_mon"] img[src="images/not.gif"]:not(".ui_icon_protected"), table.ui_buttons_table > tbody > tr.ui_buttons_row > td.ui_buttons_label > img[src="images/not.gif"]:not(".ui_icon_protected")').each(function (d, f) {
		var g = $(this);
		$(f).attr("src", "" + $_____link_full + "/images/not.png")
	});
	$('img[src^="images"]:not(".ui_icon_protected")').each(function (d, f) {
		var g = $(this),
			f = f;
		if ($__current_directory == $_____link_full + "/virtual-server/") {
			$(f).attr("src", "" + $_____link_full + "/" + g.attr("src"))
		} else {
			if ($('body[class^="filemin"]').length) {
				return
			}
			$.ajax({
				type: "HEAD",
				data: false,
				url: $_____link_full + "/" + g.attr("src"),
				success: function () {
					$(f).attr("src", "" + $_____link_full + "/" + g.attr("src"))
				},
				error: function () {}
			})
		}
	});
	$('img[src^="../images"]:not(".ui_icon_protected")').each(function (d, f) {
		var g = $(this),
			f = f;
		if ($__current_directory == $_____link_full + "/virtual-server/") {
			$(f).attr("src", "" + $_____link_full + "/" + g.attr("src").replace("../", ""))
		} else {
			if ($('body[class^="filemin"]').length) {
				return
			}
			$.ajax({
				type: "HEAD",
				data: false,
				url: $_____link_full + "/" + g.attr("src"),
				success: function () {
					$(f).attr("src", "" + $_____link_full + "/" + g.attr("src").replace("../", ""))
				},
				error: function () {}
			})
		}
	});
	$("input").each(function (c, d) {
		if ($(this).attr("src") == "images/ok.gif") {
			$(d).attr("src", "" + $_____link_full + "/" + $(this).attr("src"));
			$(this).parents("td").attr("style", "white-space: nowrap")
		}
	});
	t__cm___init($("textarea"), false, false);
	if ($(".ui_table tr td").has(".ui_grid_table.table-hardcoded") && ($current_directory == $_____link + "passwd/" || $current_directory == $_____link + "mailboxes/" || $current_page_full == $_____link_full + "/usermin/list_configs.cgi")) {
		$(".ui_table tr td .ui_grid_table.table-hardcoded").parents("table").css("border", "1px solid #f0f0f0");
		$(".ui_table tr td .ui_grid_table.table-hardcoded").addClass("table").parents("tr").css("border", "1px solid #f0f0f0")
	}
	if ($current_page_full == $_____link_full + "/custom/view.cgi") {
		var $_tt = $('form[action="save.cgi"]').find(".table-title").find("tt").text();
		$('form[action="save.cgi"]').find(".table-title").find("b").empty().append("<tt>" + $_tt + "</tt>")
	}
	$.each($("form > table"), function () {
		if ($(this).next('input[type="submit"]')) {
			if ($(this).attr("style")) {} else {}
		}
	});
	$.each($("table tr"), function () {
		if ($(this).is(":empty")) {
			$(this).remove()
		}
	});

	function __tables() {
		if ($current_directory == $_____link + "backup-config/" && $("table#show_backup_destination") || $current_page_full == $_____link_full + "/virtual-server/summary_domain.cgi" || $current_page_full == $_____link_full + "/usermin/edit_categories.cgi" || $current_page_full == $_____link_full + "/usermin/edit_defacl.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi" || $current_page_full == $_____link_full + "/bind8/conf_misc.cgi" || $current_page_full == $_____link_full + "/bind8/edit_recs.cgi" || $current_page_full == $_____link_full + "/postfix/sasl.cgi" || $current_page_full == $_____link_full + "/postfix/edit_master.cgi" || $current_page_full == $_____link_full + "/squid/edit_icp.cgi" || $current_page_full == $_____link_full + "/squid/edit_misc.cgi" || $current_page_full == $_____link_full + "/cpan/edit_mod.cgi" || $current_page_full == $_____link_full + "/phpini/edit_errors.cgi" || $current_page_full == $_____link_full + "/acl/edit_acl.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_domain.cgi" || $current_page_full == $_____link_full + "/apache/edit_virt.cgi" || $current_page_full == $_____link_full + "/apache/edit_dir.cgi" || $current_page_full == $_____link_full + "/mysql/edit_cnf.cgi" || $current_page_full == $_____link_full + "/squid/edit_logs.cgi" || $current_page_full == $_____link_full + "/net/edit_aifc.cgi" || $current_page_full == $_____link_full + "/phpini/edit_misc.cgi") {
			return [$("table#show_backup_destination"), $('form[action="save_categories.cgi"] > .table-hardcoded'), $('form[action="save_defacl.cgi"] > .table-hardcoded'), $('form[action="index_search.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_misc.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_sasl.cgi"] .table-hardcoded'), $('form[action="save_master.cgi"] .sub_table_container.table-hardcoded'), $('form[action="save_icp.cgi"] .table.table-striped.table-rounded.table-condensed.table-subtable'), $('form[action="save_misc.cgi"] .table.table-striped.table-rounded.table-condensed.table-subtable'), $(".table-responsive > .table.table-striped.table-rounded.table-condensed.table-subtable"), $(".table-responsive > .table.table-striped.table-rounded.table-condensed.table-subtable > .sub_table_container.table-hardcoded"), $("#hiddendiv_opts"), $('.ui_form[action="save_virt.cgi"] .sub_table_container.table-hardcoded')]
		} else {
			return false
		}
	}
	if (__tables()) {
		$.each(__tables(), function (d, g) {
			var f = $(this);
			$.each(f.find("td"), function () {
				if (!$(this).find("hr").length) {
					$(this).removeAttr("colspan")
				}
			});
			$.each(f.find("tbody"), function () {
				var a = $(this).children("tr"),
					c = [];
				$.each(a, function () {
					c.push($(this).children("td").length)
				});
				var b = Math.max.apply(this, c);
				$.each(a, function () {
					var l = $(this).children("td").length;
					if (b != l && !$(this).find("hr").length && __tables()) {
						for (var k = 0; k < (b - l); k++) {
							$(this).append("<td></td>")
						}
					}
				})
			})
		})
	}
	$.each($("span > input"), function () {
		var g = $(this).parent("span").next(".file_chooser_button"),
			f = $(this).parent("span").next('input[type="button"][onclick]'),
			d = $(this).parent("span").next("select");
		if (g) {
			g.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; margin-top:4px !important;").find("i.fa-files-o").css("margin-top", "0")
		}
		if ($(this).parents(".tab-content")) {
			g.css("margin-top", "4px")
		}
		if (f) {
			f.attr("style", "display: inline; width:40px; height: 28px; margin-right:0 !important; margin-top:4px !important;").next("i.fa-files-o").css("margin-top", "11px")
		}
		if (d) {
			d.attr("style", "margin-top:4px !important;")
		}
	});
	$.each($('input[type="button"][onclick^="ifield"]'), function (d, c) {
		$(this).css("margin-left", "0").css("width", "40px").css("height", "28px")
	});
	$('.ui_form[action="switch.cgi"] > input.form-control.ui_textbox').next('input[type="button"][onclick^="ifield"]').attr("style", "margin-top: 2px !important; margin-bottom: 2px !important; margin-left: 0 !important");
	if ($current_directory == $_____link + "cshrc/") {
		$("textarea").each(function (d, c) {
			$(this).attr("style", "height: 20em !important")
		})
	}
	if ($current_page_full == $_____link_full + "/acl/" || $current_page_full == $_____link_full + "/acl/edit_user.cgi") {
		$('.ui_grid_table.table-hardcoded .ui_grid_row .ui_grid_cell input[type="checkbox"], .table-hardcoded .col_value input[type="checkbox"]').each(function (d, c) {
			$(this).attr("style", "vertical-align: bottom !important")
		})
	}
	if ($current_directory == $_____link + "custom/") {
		$(".panel-body > .ui_grid_table.table-hardcoded").each(function (d, c) {
			$(this).attr("style", "margin-top: 3px !important")
		});
		$(".panel-body td > .ui_form").each(function () {
			$(this).attr("style", "padding-top: 0 !important")
		});
		$(".panel-body > a.ui_link").each(function (d, c) {
			$(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
			$(this).text($(this).text().replace(/\.$/, ""));
			$(this).parent().contents().filter(function () {
				return this.nodeType == 3
			}).remove();
			if (($(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-terminal"> </i> ' + $(this).text())
			}
			if (($(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-edit"> </i> ' + $(this).text())
			}
			if (($(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-database"> </i> ' + $(this).text())
			}
		});
		$.each($('td.td_tag:contains("|")'), function () {
			$(this).find('a[href^="edit_"]').addClass("ui_link_replaced btn btn-success btn-xxs").css("margin-right", "3px").removeClass("ui_link").prepend('<i class="fa fa-pencil">&nbsp;</i>');
			$(this).find('a:not([href^="edit_"])').remove();
			$(this).parents("table").find("thead > tr > th:eq(2)").addClass("pointer-events-none").html("")
		});
		$('td.td_tag:contains("|")').contents().filter(function () {
			return this.nodeType == 3
		}).remove()
	}
	if ($current_page_full == $_____link_full + "/virtual-server/list_sched.cgi" || $current_page_full == $_____link_full + "/ldap-server/edit_schema.cgi" || $current_page_full == $_____link_full + "/mailboxes/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/list_folders.cgi" || $current_page_full == $_____link_full + "/phpini/" || $current_page_full == $_____link_full + "/phpini/index.cgi" || $current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi" || $current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi" || $current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/virtualmin-awstats/index.cgi") {
		$.each($('tr td:last-child:contains("|")'), function () {
			if ($current_page_full == $_____link_full + "/virtual-server/list_sched.cgi") {
				$(this).find('a[href^="backup_form.cgi"]').html($(this).find('a[href^="backup_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="restore_form.cgi"]').html($(this).find('a[href^="restore_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-reply" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
			if ($current_page_full == $_____link_full + "/ldap-server/edit_schema.cgi") {
				$(this).find('a[href^="view_sfile.cgi"]').html($(this).find('a[href^="view_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="edit_sfile.cgi"]').html($(this).find('a[href^="edit_sfile.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
			if ($current_page_full == $_____link_full + "/phpini/" || $current_page_full == $_____link_full + "/phpini/index.cgi") {
				$(this).find('a[href^="list_ini.cgi"]').html($(this).find('a[href^="list_ini.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="edit_manual.cgi"]').html($(this).find('a[href^="edit_manual.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-pencil" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
			if ($current_page_full == $_____link_full + "/fdisk/" || $current_page_full == $_____link_full + "/fdisk/index.cgi") {
				$(this).find('a[href^="edit_hdparm.cgi"]').html($(this).find('a[href^="edit_hdparm.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link");
				$(this).find('a[href*="smart-status/index.cgi"]').html($(this).find('a[href*="smart-status/index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link");
				$(this).find('a[href^="blink.cgi"]').html($(this).find('a[href^="blink.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link")
			}
			if ($current_page_full == $_____link_full + "/mailbox/list_folders.cgi") {
				$(this).find('a[href^="index.cgi"]').html($(this).find('a[href^="index.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="edit_auto.cgi"]').html($(this).find('a[href^="edit_auto.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-info btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-recycle" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="copy_form.cgi"]').html($(this).find('a[href^="copy_form.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-clone" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
			if ($current_page_full == $_____link_full + "/mailboxes/view_mail.cgi" || $current_page_full == $_____link_full + "/mailbox/view_mail.cgi") {
				$(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').html($(this).find('a[href^="detach.cgi"]:not([href*="&save=1"]):not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").removeClass("ui_link").prepend('<i class="fa fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href*="detach.cgi"][target="_blank"]').html($(this).find('a[href*="detach.cgi"][target="_blank"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-external-link" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href*="&save=1"]:not([target="_blank"])').html($(this).find('a[href*="&save=1"]:not([target="_blank"])').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-warning btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-download" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
			if ($current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/virtualmin-awstats/index.cgi") {
				$(this).find('a[href^="view.cgi"]').html($(this).find('a[href^="view.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-eye" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="config.cgi"]').html($(this).find('a[href^="config.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-primary btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-cog" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			}
		});
		$('tr td:last-child:contains("|")').contents().filter(function () {
			return this.nodeType == 3
		}).remove();
		if ($current_page_full == $_____link_full + "/fsdump/" || $current_page_full == $_____link_full + "/fsdump/index.cgi") {
			$.each($("tr td:last-child"), function () {
				$(this).find('a[href^="backup.cgi"]').html($(this).find('a[href^="backup.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-success btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-floppy-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>');
				$(this).find('a[href^="kill.cgi"]').html($(this).find('a[href^="kill.cgi"]').text().replace(/\.\.$/, "&nbsp;")).addClass("ui_link_replaced btn btn-danger btn-xxs").removeClass("heighter-34").attr("style", "margin-top: 0 !important; margin-bottom: 0 !important; margin-right: 3px").removeClass("ui_link").prepend('<i class="fa fa-trash-o" style="vertical-align: baseline !important">&nbsp;&nbsp;</i>')
			})
		}
	}
	if ($current_page_full == $_____link_full + "/fdisk/edit_disk.cgi") {
		var __delete = [];
		$.each($(".panel-body > table.table.table-striped tbody tr"), function (a, b) {
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
		$('.table.table-striped.table-condensed tr.tr_tag td.td_tag input[type="checkbox"]').each(function (d, c) {
			$(this).attr("style", "vertical-align: middle !important")
		})
	}
	if ($current_page_full.indexOf(".cgi") === -1 && $current_directory == $_____link + "useradmin/") {
		$('.table.table-striped.table-condensed tbody tr td input[type="checkbox"], .table.table-striped.table-condensed tbody tr td label').each(function (d, c) {
			$(this).parents("td").attr("style", "padding: 2px 2px 0 2px !important")
		});
		$(".table.table-striped.table-condensed tbody tr td label").each(function (d, c) {
			$(this).attr("style", "vertical-align: bottom !important")
		})
	}
	if ($current_directory == $_____link + "proc/" || $source_path == $_____link + "proc/index.cgi" || ($current_directory == $_____link + "fetchmail/" && $("link").attr("href") == "/images/favicon-usermin.ico")) {
		if ($current_directory == $_____link + "proc/" || $source_path == $_____link + "proc/index.cgi") {
			$("a.ui_link + b").addClass("btn btn-success").css("margin-top", "3px").css("margin-left", "3px");
			$("b + a.ui_link").addClass("btn btn-success").css("margin-top", "3px").css("margin-left", "3px");
			if ($('.panel-body > b:first-child:contains("Display")').length > 0) {
				$(".panel-body > b:first-child").remove()
			}
			if ($(".panel-body").find("b:first-child").text() == "PID") {
				$(".panel-body").find("b:first-child").addClass("btn btn-success").css("margin-top", "3px")
			}
		}
		$(".panel-body").contents().filter(function () {
			return this.nodeType == 3
		}).remove();
		$(".panel-body > a.ui_link").css("margin-left", "3px")
	}
	if ($current_directory == $_____link + "procmail/") {
		$(".panel-body p:first-child").next("p").contents().filter(function () {
			return this.nodeType == 3
		}).remove();
		$(".panel-body p:last-child").prev("a.ui_link").remove()
	}
	if ($current_directory == $_____link + "cron/" || $source_path == $_____link + "cron/index.cgi") {
		$('.panel-body form.ui_form[action="index.cgi"]').next("script").next("b").next("p").contents().filter(function () {
			return this.nodeType == 3
		}).remove()
	}
	if ($current_directory == $_____link + "filter/") {
		$(".panel-body > b").next("p").contents().filter(function () {
			return this.nodeType == 3
		}).remove()
	}
	if ($current_directory == $_____link + "dhcpd/") {
		$(".panel-body > p").contents().filter(function () {
			return this.nodeType == 3
		}).remove()
	}
	if ($current_directory == $_____link + "htaccess-htpasswd/" || $current_directory == $_____link + "forward/") {
		$("td table.table-hardcoded.table.table-subtable").removeClass("table-striped")
	}
	$("td.td_tag").contents().filter(function () {
		return this.nodeType == 3
	}).next("input").css("margin-left", "3px");
	$(".ui_buttons_hr > td > table.table-hardcoded > tbody > tr > td[nowrap]").each(function () {
		$(this).parents("table").attr("style", "margin-bottom: 15px !important")
	});
	$("textarea.form-control.ui_textarea").next('button[type="button"].btn-default').each(function () {
		$(this).prev("textarea").attr("style", "margin-bottom: 1px !important");
		$(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
	});
	$("textarea.form-control.ui_textarea").next("br").next('button[type="button"].btn-default').each(function () {
		$(this).prev("textarea").attr("style", "margin-bottom: 1px !important");
		$(this).attr("style", "width:100% !important; padding-top: 0; height:28px !important")
	});
	$(".table-hardcoded > tbody > tr > td > input.form-control.ui_textbox").next('button[type="button"].ui_button').each(function () {
		$(this).attr("style", "margin-top: 2px !important")
	});
	$(".table-hardcoded > tbody > tr > td.col_label b a, .ui_table_row td a").each(function (d, c) {
		if (!$(this).attr("href")) {
			$(this).attr("style", "color: #333; text-decoration: none; cursor:default")
		}
	});
	$('input[name="all_weekdays"], .ui_grid_cell > table.table-condensed, table.table-hardcoded table.table-condensed, select[multiple][name="days"]').each(function () {
		$(this).parent("td").attr("style", "vertical-align: top !important; padding-left:2px; padding-right:2px;")
	});
	$('input[type="submit"]').each(function () {
		$(this).addClass("btn btn-default")
	});
	$("table tr th").each(function () {
		if ($(this).text()) {
			$(this).attr("style", "width: auto")
		}
	});
	$("table thead th:not(.table-title)").each(function () {
		$(this).css("border-top", "none");
		$(this).css("border-bottom", "none")
	});
	if (settings_right_iconize_header_links) {
		$.each($(".panel-heading > table.header > tbody > tr > td > a"), function () {
			if ($(this).attr("href") && $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href") == $__current_directory || ($(this).attr("href").indexOf("index.cgi") > -1 && $current_directory == $_____link + "openvpn/") || ($(this).attr("href").indexOf("index.cgi?") > -1 && $current_directory == $_____link + "spam/") || $(this).attr("href").indexOf("restart_zone.cgi") > -1 || $(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1 || $(this).attr("href").indexOf("start.cgi") > -1 || $(this).attr("href").indexOf("stop.cgi") > -1 || ($(this).attr("href") == "//" && ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi")) || $(this).attr("href").indexOf("delete_") > -1 || $(this).attr("href").indexOf("list_mail.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1 || $(this).attr("href").indexOf("help.cgi") > -1) {
				$.each($(this).next("br"), function () {
					$(this).remove()
				});
				$.each($(this).prev("br"), function () {
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
					$(this).data("title", "")
				} else {
					if ($(this).attr("href") == "//" && ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi")) {
						$iconized_class = "fa-arrow-left";
						$(this).attr("href", "/webmin/edit_themes.cgi").data("title", "")
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
																$iconized_class = "fa-arrow-left"
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
				if ($(this).attr("href").indexOf("help.cgi") > -1) {
					$iconized_class = "fa-question";
					$(this).data("title", "")
				}
				$(this).attr("data-title", $(this).text()).attr("data-container", "body").addClass("btn btn-link text-lighter").removeClass("ui_link").css("margin-right", "3px").append('<i class="fa ' + $iconized_class + '"></i>');
				$(this).contents().filter(function () {
					return this.nodeType == 3
				}).remove();
				$(this).tooltip();
				if ((($current_directory == $_____link + "apache/" || $current_directory == $_____link + "proftpd/") && ($(this).attr("href").indexOf("restart.cgi") > -1 || $(this).attr("href").indexOf("apply.cgi") > -1)) || $(this).parent("td").find("a") && $(this).parent("td").find("a").length == 1 || $(this).attr("href").indexOf("man/search.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("/virtual-") > -1 || $(this).attr("href").indexOf("/virtualmin-") > -1 || $(this).attr("href").indexOf("/server-") > -1) {
					if (($(this).attr("href").indexOf("/index.cgi") > -1 || $(this).attr("href").indexOf("config.cgi") > -1) && $("body").attr("class") && $("body").attr("class").indexOf("filemin") > -1) {
						$(this).attr("style", "margin-right: 0 !important; padding: 6px 12px")
					} else {
						$(this).attr("style", "margin-right: 0 !important")
					}
				}
			}
			$("#headln2l").removeClass("invisible")
		})
	}
	if ($source_path == $_____link + "settings-editor_read.cgi" || $source_path == $_____link + "settings-upload.cgi") {
		if (t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').length) {
			t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').attr("href", t__wi_p.$('link[href*="/unauthenticated/css/styles.css"]').attr("href").split("?")[0] + "?" + (new Date()).getTime())
		}
		if (t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').length) {
			t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').attr("src", t__wi_p.$('script[src*="/unauthenticated/js/scripts.js"]').attr("src").split("?")[0] + "?" + (new Date()).getTime())
		}
		$("body").on("click", 'a[href="/settings-editor_read.cgi"], a[href="/settings-upload.cgi"]', function () {});
		setTimeout(function () {
			$(".file-editor-saved").remove();
			$(".file-editor-save").removeClass("hidden")
		}, 2400);
		if ($__relative_url == "/settings-upload.cgi?saved=1") {
			$.each($(".file_chooser_button_preview:first"), function () {
				if (!$(this).hasClass("disabled")) {
					if (t__wi_p.$("aside + .__logo").length) {
						t__wi_p.$('.__logo img[src*="/images/logo.png"]').attr("src", t__wi_p.$('.__logo img[src*="/images/logo.png"]').attr("src").split("?")[0] + "?" + (new Date()).getTime());
						t__wi_p.$("aside + .__logo").attr("style", "transform: translate(0px, 0px);");
						setTimeout(function () {
							t__wi_p.$(".__logo").transition({
								y: "-140px"
							}, 1200)
						}, 400)
					} else {
						t__wi_p.$("aside").after('<div class="__logo _logo" style="transform: translate(0px, 0px);"><img src="' + $webprefix + "/images/logo.png?" + (new Date()).getTime() + '"></div>');
						setTimeout(function () {
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
	}
	if ($source_path == $_____link + "settings-upload.cgi") {
		$(function () {
			$_authenticated_logo = $('input[name="authenticated_logo"]:checked').val();
			$_unauthenticated_logo = $('input[name="unauthenticated_logo"]:checked').val();

			function c(a) {
				typeof a == "undefined" ? a = $('input[name="authenticated_logo"]:checked') : false;
				var b = ["authenticated_logo_file"];
				if (a.val() != "true") {
					$.each(b, function (h, j) {
						$('input[name="' + j + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
					})
				} else {
					$.each(b, function (h, j) {
						$('input[name="' + j + '"]').parents(".file-input-wrapper").removeClass("disabled");
						if ($_authenticated_logo == "true") {
							$('input[name="' + j + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
						}
					})
				}
			}
			c();
			$('input[name="authenticated_logo"]').on("change", function () {
				c($(this))
			});

			function d(a) {
				typeof a == "undefined" ? a = $('input[name="unauthenticated_logo"]:checked') : false;
				var b = ["unauthenticated_logo_file"];
				if (a.val() != "true") {
					$.each(b, function (h, j) {
						$('input[name="' + j + '"]').parents(".file-input-wrapper").addClass("disabled").prev(".file_chooser_button_preview").addClass("disabled")
					})
				} else {
					$.each(b, function (h, j) {
						$('input[name="' + j + '"]').parents(".file-input-wrapper").removeClass("disabled");
						if ($_unauthenticated_logo == "true") {
							$('input[name="' + j + '"]').parents(".file-input-wrapper").prev(".file_chooser_button_preview").removeClass("disabled")
						}
					})
				}
			}
			d();
			$('input[name="unauthenticated_logo"]').on("change", function () {
				d($(this))
			})
		});
		$(".file_chooser_button_preview").on("mouseout", function (b) {
			$(this).css("background", "white")
		}).on("mouseover", function (b) {
			$(this).css("background", "#eee")
		});
		$.each($(".file_chooser_button_preview"), function () {
			if ($(this).data("image")) {
				$(this).popover({
					trigger: "hover",
					html: true,
					content: function () {
						return "<img src='" + $(this).data("image") + "'>"
					}
				})
			}
		});
		var $__webmin_path = $('a[href^="/settings-editor_read.cgi?file=%path%"]');
		$__webmin_path.attr("href", $__webmin_path.attr("href").replace("%path%", $("#path").val()))
	}
	$.each($('td.ui_grid_cell:contains("|")'), function () {
		$(this).contents().filter(function () {
			return this.nodeType == 3
		}).remove()
	});
	$('a[href^="/help.cgi"]').attr("onclick", "").unbind("click").addClass("help_popup");
	$(".help_popup").each(function () {
		$(this).attr("style", "color: #333; text-decoration: none; cursor:help")
	});
	$(".help_popup").on("click", function (g) {
		g.stopPropagation();
		g.preventDefault();
		if ($(this).is(g.target) && $(".popover").is(":visible")) {
			$(".popover").popover("hide");
			return true
		}
		var j = $(this),
			h = $(this).attr("href"),
			f = $(this).parents("td");
		f.append('<div class="_tmp_help_content hidden"></div>');
		$.ajax({
			type: "GET",
			url: j.attr("href"),
			data: false,
			dataType: "text",
			success: function (a) {
				f.find("._tmp_help_content").html(a);
				$help_title = f.find("._tmp_help_content .ui_subheading").first().text();
				$help_body = f.find("._tmp_help_content title").remove();
				$help_body = f.find("._tmp_help_content h3.ui_subheading").remove();
				$help_body = f.find("._tmp_help_content h3").addClass("h3_help");
				$help_body = f.find("._tmp_help_content hr").remove();
				$help_body = f.find("._tmp_help_content a").removeAttr("href").css("text-decoration", "none").css("color", "#333").css("font-style", "italic");
				$help_body = f.find("._tmp_help_content").html();
				f.find("._tmp_help_content").remove();
				j.popover({
					html: true,
					container: "body",
					title: function () {
						return $help_title
					},
					content: function () {
						return $help_body
					},
					placement: "right"
				});
				j.popover("show");
				$("body").on("click", function () {
					if (get_selected_text().length === 0) {
						j.popover("destroy")
					}
				});
				j.on("shown.bs.popover", function () {
					if ($help_body.indexOf("<ad>") > -1) {
						$(".popover").animate({
							"min-width": "540px"
						}, 300)
					}
				});
				j.on("hidden.bs.popover", function () {
					j.popover("destroy")
				})
			}
		})
	});
	if ($current_directory == $_____link + "fdisk/" || $current_directory == $_____link + "postfix/" || $current_directory == $_____link + "pam/" || $current_directory == $_____link + "syslog/") {
		$("p > a[href], table + a[href], div.panel-body > a.ui_link").each(function (d, c) {
			$(this).text($(this).text().replace(/\.$/, ""))
		})
	}
	$('.panel-body > form > p > a.ui_link, .panel-body > table.table + a.ui_link, .panel-body > p > a:not([href*="config.cgi?bacula-backup"]), body[data-current-product="usermin"] div.panel-body > p > a, div.panel-body > a[href^="edit_"]:not([href^="edit_user.cgi?user="]), .ui_form > a, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a.ui_link:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="]), .ui_grid_cell > a.select_all, .ui_grid_cell > a.select_invert, .ui_grid_cell > :not(input):not(.acheckbox):not(.aradio):not(label) + a[href*=".cgi"]:not([href^="edit_acl.cgi"], [href^="edit_rpc.cgi"], [href^="edit_user.cgi?user="]), .ui_grid_cell > a[href*=".cgi"]:first-child:not([href^="edit_rpc.cgi"],[href^="edit_nuser.cgi"],[href*="edit_user.cgi?idx"]), .tab-pane > p > a, .tab-pane > a.ui_link, .tab-pane > .table-condensed > a.ui_link, .tab-pane > a, .panel-body > p > a.ui_link, a.select_all, a.select_invert, form[action="delete.cgi"] > table table.ui_grid_table + a').each(function () {
		if ($current_directory != $_____link + "passwd/" && $(this).text() && $current_page_full != $_____link_full + "/mailboxes/" && $current_page_full != $_____link_full + "/mailboxes/index.cgi" && $current_page_full != $_____link_full + "/usermin/list_configs.cgi" && !$(this).hasClass("help_popup")) {
			$(this).addClass("btn btn-inverse btn-tiny ui_link_replaced");
			$(this).text($(this).text().replace(/\.$/, ""));
			var b = $(this).parent().contents().filter(function () {
				return this.nodeType == 3
			});
			if (b) {
				$.each(b, function () {
					if ($(this).text() && $(this).text().length <= 3) {
						$(this).remove()
					}
				})
			}
			if ($(this).hasClass("select_all")) {
				$(this).html('<i class="fa fa-check-square-o"> </i> ' + $(this).text())
			}
			if ($(this).hasClass("select_invert")) {
				$(this).html('<i class="fa fa-share-square-o"> </i> ' + $(this).text())
			}
			if ($(this).attr("href") && (($(this).attr("href").indexOf("edit") === 0 && $(this).attr("href").indexOf("edit_allow") !== 0) || $(this).attr("href").indexOf("master_form") === 0 || $(this).attr("href").indexOf("slave_form") === 0 || $(this).attr("href").indexOf("stub_form") === 0 || $(this).attr("href").indexOf("forward_form") === 0 || $(this).attr("href").indexOf("delegation_form") === 0 || $(this).attr("href").indexOf("mass_form") === 0 || $(this).attr("href").indexOf("newdb_form") === 0)) {
				$(this).html('<i class="fa fa-plus-square-o"> </i> ' + $(this).text())
			} else {
				if ($(this).attr("href") && $(this).attr("href").indexOf("edit_allow") === 0) {
					$(this).html('<i class="fa fa-shield"> </i> ' + $(this).text())
				} else {
					if ($(this).attr("href") && $(this).attr("href").indexOf("mass_ucreate") === 0) {
						$(this).html('<i class="fa fa-user"> </i> ' + $(this).text())
					}
				}
			}
			if ($current_directory == $_____link + "custom/") {
				if (($(this).attr("href") && $(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
					$(this).html('<i class="fa fa-terminal"> </i> ' + $(this).text())
				}
				if (($(this).attr("href") && $(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
					$(this).html('<i class="fa fa-edit"> </i> ' + $(this).text())
				}
				if (($(this).attr("href") && $(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
					$(this).html('<i class="fa fa-database"> </i> ' + $(this).text())
				}
			}
			if (!$(this).attr("href")) {
				$(this).remove()
			}
		}
	});
	$.each($(".btn-tiny.ui_link_replaced"), function () {
		if ($(this).prev('[class="table table-striped table-condensed"]').length && $(this).next(':not(".ui_link_replaced")').length) {
			$(this).removeClass("btn-tiny ui_link_replaced").addClass("ui_link_re-replaced")
		}
	});
	$("a.ui_link_replaced").each(function () {
		if ($(this).prev().is("b")) {
			$(this).prev("b").addClass("btn btn-success btn-tiny").attr("style", "margin-left: 3px !important; margin-right: 3px !important; ")
		}
		if ($(this).next().is("b")) {
			$(this).next("b").addClass("btn btn-success btn-tiny").attr("style", "margin-left: 3px !important; margin-right: 3px !important; ")
		}
	});
	$("a.ui_link_replaced").each(function () {
		if ($(this).next().is("a.ui_link_replaced") && !$(this).hasClass("select_all") && !$(this).hasClass("select_invert")) {
			$(this).next("a.ui_link_replaced").not(".btn-xxs").attr("style", "margin-left: 3px !important;");
			return false
		} else {
			if ($(this).prev().is("a.ui_link_replaced") && !$(this).hasClass("select_all") && !$(this).hasClass("select_invert")) {
				$(this).prev("a.ui_link_replaced").not(".btn-xxs").attr("style", "margin-right: 3px !important;");
				return false
			}
		}
	});
	if ($current_directory == $_____link + "fetchmail/") {
		$("a.ui_link").each(function () {
			$(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").css("margin-bottom", "10px").css("margin-top", "4px");
			$(this).text($(this).text().replace(/\.$/, ""));
			$(this).parent().contents().filter(function () {
				return this.nodeType == 3
			}).remove()
		})
	}
	$('select.ui_select[name="days"]').each(function () {
		$(this).parent("td").attr("style", "vertical-align: top !important")
	});
	$.each($(".panel-body > .ui_link"), function () {
		if ($current_directory == $_____link + "pam/" || $current_directory == $_____link + "syslog/" || $current_page_full == $_____link_full + "/postfix/master.cgi") {
			$(this).html('<i class="fa fa-plus-square-o text-muted">&nbsp;&nbsp;</i>' + $(this).text())
		}
	});
	$('input[type="submit"]').each(function () {
		if ($(this).val().indexOf("Start at") != -1 || $(this).val() == "Scan for servers") {
			$(this).addClass("btn-primary")
		}
		if (($(this).attr("name") && $(this).attr("name").indexOf("send") > -1)) {
			$(this).addClass("btn-info")
		}
		if ($(this).val().indexOf("Delete") != -1 || ($(this).attr("name") && $(this).attr("name").indexOf("delete") > -1)) {
			$(this).addClass("btn-danger")
		}
		if ($(this).val().indexOf("Stop") != -1 || $(this).val().indexOf("Warning") != -1 || $(this).val().indexOf("Restart") != -1 || ($(this).attr("name") && $(this).attr("name").indexOf("disable") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("draft") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("remove") > -1)) {
			$(this).addClass("btn-warning")
		}
		if ($(this).val().indexOf("Download") > -1 || $(this).val() == "Save" || $(this).val().indexOf("Create") > -1) {
			$(this).addClass("btn-success")
		}
		if (($(this).attr("name") && $(this).attr("name") == "confirm") || ($(this).attr("name") && $(this).attr("name").indexOf("enable") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("save") > -1) || ($(this).attr("name") && $(this).attr("name").match("^apply")) || ($(this).attr("name") && $(this).attr("name").indexOf("ok") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("new") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("create") > -1) || ($(this).attr("name") && $(this).attr("name").indexOf("start") > -1)) {
			$(this).addClass("btn-success")
		}
	});
	if ($current_directory == $_____link + "mailboxes/" || $current_page_full == $_____link_full + "/mailboxes/index.cgi" || $current_directory == $_____link + "mailbox/" || $current_page_full == $_____link_full + "/postfix/view_mailq.cgi") {
		$("body").find("form").removeAttr("onsubmit");
		$header_tables = $("body").find('input[name="from"]').parents(".tab-pane").parent("td");
		$header_tables.children("table").hide();
		$.each($header_tables.find("input, textarea, select"), function () {
			if (!$(this).hasClass("ui_select") && !$(this).attr("onclick") && $(this).attr("type") != "checkbox" && $(this).attr("type") != "submit") {
				$(this).attr("style", "width: 60%").addClass("inline-block")
			}
			if ($(this).attr("onclick")) {
				$(this).addClass("inline-block")
			}
		});
		t___wi.onbeforeunload = null;
		if ($("body").find('input.ui_hidden[name="html_edit"]').val() == 1) {
			tinyMCE.baseURL = "/unauthenticated/js/tinymce";
			tinyMCE.init({
				mode: "exact",
				elements: "body",
				auto_focus: "body",
				language: $("body").data("language"),
				menubar: false,
				height: 420,
				plugins: ["advlist autolink lists link image charmap print hr anchor pagebreak fullscreen", "searchreplace wordcount visualblocks visualchars code", "insertdatetime media nonbreaking save table contextmenu directionality", "template paste textcolor colorpicker textpattern"],
				toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | fullscreen print media | forecolor backcolor | visualblocks charmap code"
			})
		}
		$("body").find('input[name="from"]').parents(".tab-pane").prev("table").remove();
		$("body").find('input[name="from"]').parents(".tab-pane ").parent("td").find("div, table").each(function (d, c) {
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
		$fileinput_container.parent("td").contents().filter(function () {
			return this.nodeType == 3
		}).remove();
		$fileinput_container.remove();
		$fileinput_add_another_attachment = $("body").find('a[onclick="return add_attachment()"]');
		$fileinput_add_another_attachment.addClass("btn btn-default");
		$fileinput_add_another_attachment.text($fileinput_add_another_attachment.text().replace(/\.$/, ""));
		if ($current_page_full.indexOf("view_mail.cgi") > -1 || $current_page_full.indexOf("view_mailq.cgi") > -1) {
			$table_title_header_container = $(".ui_form").find("div.table-responsive").first().find(".table-title");
			$table_title_links_container = $table_title_header_container.next();
			$table_title_links_container.contents().filter(function () {
				return this.nodeType == 3
			}).remove();
			$table_title_links_container.find("a").addClass("table_title_links pull-right btn btn-info btn-tiny");
			$table_title_links = $table_title_links_container.html();
			$table_title_header_container.append($table_title_links);
			$table_title_links_container.remove();
			$table_title_header_container_text_padding = 35;
			$(".table-title > a.table_title_links").each(function () {
				$table_title_header_container_text_padding = ($current_page_full == $_____link_full + "/postfix/view_mailq.cgi" ? 120 : 235)
			});
			$(".table_title_links_container a").each(function () {
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
			$table_title_header_container.find("a").each(function () {
				$table_title_header_container_text_padding = $table_title_header_container_text_padding + $(this).width()
			});
			setTimeout(function () {
				if ($(".ui_form").find("div.table-responsive").first().find("table:first-child").outerWidth() != $(".ui_form").find("div.table-responsive").first().next("div.table-responsive").find("table:first-child").outerWidth()) {
					var b = parseInt($(".ui_form").find("div.table-responsive").first().find("table:first-child").width() / 2);
					$table_title_second_container.find(".table-title").addClass("left").find("b").css("padding-left", b - 175);
					$table_title_second_container.find(".pull-right").removeClass("pull-right").addClass("pull-left")
				}
				$.each($table_title_second_container.find("table"), function () {
					$(this).removeClass().addClass("clear-formatting");
					$.each($(this).find("td.col_value"), function () {
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
		$("td > a").on("click", function () {
			if ($(this).attr("onclick") == "return add_attachment()") {}
			$("input[type=file]").each(function () {
				if (!$(this).parent("a").hasClass("file-input-wrapper")) {
					$(this).bootstrapFileInput()
				}
			})
		});
		if (settings_mailbox_slash_delimiter) {
			$("select.ui_select[name] > option").each(function (d, c) {
				$(c).text($(c).text().replace(/\./g, "/").replace(/\/\//g, "/"))
			})
		}
		$.each($('table td[align="right"], table td[align="left"]'), function (d, c) {
			$(this).attr("style", "border: 0 !important;");
			$(this).parents("tbody").attr("style", "border: 0 !important;");
			$(this).parents("table.table-hardcoded.table.table-striped.table-condensed.table-subtable").removeClass("table-hardcoded table table-striped table-rounded table-condensed table-subtable")
		});
		$.each($("div.table-responsive > table tbody tr td > table.table-hardcoded"), function (d, c) {
			$(this).find("tr > td.col_label > b").removeAttr("style");
			$(this).removeClass("table table-rounded table-condensed")
		});
		$.each($("div.table-responsive > table tbody tr td > div.tab-pane"), function (d, c) {
			$(this).find("table").removeClass("table");
			$(this).parents("div.table-responsive").find("table").removeClass("table-striped table-subtable")
		});
		$.each($('div.table-responsive > table tbody tr td > div.tab-pane .col_value > input[type="button"][onclick^="ifield"]'), function (d, c) {
			$(this).attr("style", "margin-left: 0; margin-bottom: 3px !important")
		})
	}
	$.each($(".barchart"), function () {
		$(this).find("img").attr("height", 4)
	});
	$('#extended_sysinfo div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px");
	$('#extended_sysinfo div[aria-labelledby^="updates-"] div.panel-body div.table-responsive table.table.table-striped.table-condensed').next("table.ui_form_end_buttons").css("margin-top", "10px").prev("table.table-condensed").prev("table.table.table-striped.table-rounded").addClass("invisible");
	$("a").each(function () {
		if (!$(this).attr("href")) {
			$(this).addClass("no_effect")
		}
	});
	if ($current_page_full == $_____link_full + "/virtual-server/domain_form.cgi" || $current_page_full == $_____link_full + "/server-manager/list_images.cgi") {
		$(".panel-body > a").each(function () {
			$(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
			$(this).text($(this).text().replace(/\.$/, ""))
		});
		$.each($('.panel-body:contains("|")'), function () {
			$(this).contents().filter(function () {
				return this.nodeType == 3
			}).wrap('<span class="btn btn-success btn-tiny btn-automated"></span>')
		});
		$.each($(".btn-automated"), function () {
			if ($(this).text().length < 4) {
				$(this).remove()
			} else {
				$(this).text($(this).text().replace("|", "").replace("|", "").replace(/(?:\r\n|\r|\n)/g, ""))
			}
		});
		$(".panel-body > b").css("margin-right", "7px");
		if ($current_page_full == $_____link_full + "/virtual-server/domain_form.cgi") {
			$.each($(".btn-automated, .ui_link_replaced"), function (c, d) {
				if (c == 0) {
					$(this).html('<i class="fa fa-plus-square"> </i> ' + $(this).text())
				}
				if (c == 1) {
					$(this).html('<i class="fa fa-level-down"> </i> ' + $(this).text())
				}
				if (c == 2) {
					$(this).html('<i class="fa fa-reply fa-flip-horizontal"> </i> ' + $(this).text())
				}
				if (c == 3) {
					$(this).html('<i class="fa fa-reply-all fa-flip-horizontal"> </i> ' + $(this).text())
				}
			})
		}
	}
	if ($current_page_full == $_____link_full + "/server-manager/edit_serv.cgi") {
		setTimeout(function () {
			$('.opener_container .table-hardcoded .col_value a[href^="edit_serv.cgi"]').each(function () {
				$(this).addClass("btn btn-inverse btn-xxs ui_link_replaced margined-right-2").removeClass("ui_link").attr("style", "margin-top: 0 !important");
				$(this).text($(this).text().replace(/\.$/, ""))
			});
			$.each($('.opener_container .table-hardcoded .col_value:contains("|")'), function () {
				if ($(this).find('a[href^="edit_serv.cgi"]').length) {
					$(this).contents().filter(function () {
						return this.nodeType == 3
					}).wrap('<a class="btn btn-success btn-xxs ui_link_replaced btn-automated margined-right-2" style="margin-top: 0 !important"></a>')
				}
				$.each($(".btn-automated"), function () {
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
		$(".piechart").easyPieChart({
			barColor: function (b) {
				return (b < 50 ? "#5cb85c" : b < 85 ? "#f0ad4e" : "#cb3935")
			},
			size: 150,
			scaleLength: 8,
			trackWidth: 2,
			lineWidth: 2,
			lineCap: "square",
			onStep: function (g, d, f) {
				$(this.el).find(".percent").text(Math.round(f))
			}
		})
	}
	$.each($("input:not(.ui_upload)"), function () {
		if ($(this).css("height") == "28px") {
			$(this).prev("input").addClass("heighter-28")
		}
	});
	$.each($("select"), function () {
		if ($(this).next("input").css("height") == "34px") {
			$(this).addClass("heighter-34")
		}
	});
	$.each($(".ui_buttons_row input, .ui_buttons_row select"), function () {
		$(this).addClass("heighter-34")
	});
	$.each($(".ui_form > input, .ui_form > select"), function () {
		$(this).addClass("heighter-34")
	});
	$.each($("tr > .ui_form"), function () {
		if ($(this).next().next("td").find("input.submitter")) {
			$(this).next().next("td").find("input.submitter").addClass("heighter-34")
		}
	});
	$.each($("input.heighter-34").next(".file_chooser_button"), function () {
		$(this).addClass("heighter-34");
		$(this).find(".fa.fa-files-o").css("margin-top", "0")
	});
	setTimeout(function () {
		$.each($("select"), function () {
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
		$this.on("load", function () {
			$this.contents().find("#term").css("width", "99.3%").css("height", "576px").css("margin-top", "4px")
		});
		$(this).next("br").remove().next('input[type="button"]').remove();
		$(this).next('input[type="button"]').remove();
		$(this).next("p").remove()
	}
	$(".row.icons-row.vertical-align").on("click", ".icons-container, .small-icons-container, .xsmall-icons-container", function () {
		t___wi.location.href = $(this).find("a").attr("href")
	});
	$.each($(".file_chooser_button"), function () {
		if ($(this).prev("input").attr("style") && $(this).prev("input").attr("style").indexOf("max-width: 100%") > -1) {
			$(this).prev("input").css("max-width", "93%")
		}
	});
	if ($source_path == $_____link + "sysinfo.cgi" && settings_sysinfo_link_mini == true) {
		t__wi_p.$(".navigation > li:not('.has-sub')").removeClass("sub_active").find("span.current-large").remove()
	}
	$.each($('input[value="..."], input[value=" ..."], input[value="  ..."], input[value="... "], input[value="...  "], input[value=" ... "], input[value="  ...  "]'), function () {
		$(this).after('<i class="fa fa-fw fa-files-o file_chooser_button_attached" style="font-size:11px; pointer-events: none"></i>');
		$(this).attr("value", "")
	});
	$.each($(".file_chooser_button"), function () {
		$(this).prev("input").css("margin-top", "2px").css("margin-bottom", "2px")
	});
	$.each($(".file_chooser_button_attached"), function () {
		$(this).prev('input[type="button"]').prev("input").css("margin-top", "2px").css("margin-bottom", "2px");
		if (!$(this).parents(".ui_buttons_label").length && !$(this).parents(".table-subtable").length) {
			$(this).css("margin-top", "11px")
		}
	});
	$.each($(".ui_form > .file_chooser_button_attached"), function () {
		if (($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length) || ($(this).next(".heighter-34") && $(this).next(".heighter-34").length)) {
			$(this).css("margin-top", "16px");
			$(this).prev("input[onclick]").css("width", "40px")
		}
	});
	$.each($('.ui_form[action="init_cache.cgi"] > .file_chooser_button_attached'), function () {
		if (($(this).prev(".heighter-34") && $(this).prev(".heighter-34").length) || ($(this).next(".heighter-34") && $(this).next(".heighter-34").length)) {
			$(this).css("margin-top", "14px")
		}
	});
	$.each($(".col_value > .file_chooser_button_attached"), function () {
		$(this).prev("input[onclick]").css("width", "40px").css("margin-left", "0")
	});
	$("a.ui_link, .btn").each(function () {
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
		$.each($(".btn:not(.file_chooser_button)"), function () {
			$(this).removeClass("heighter-28").addClass("heighter-34")
		})
	}
	if ($current_page_full == $_____link_full + "/virtualmin-git/" || $current_page_full == $_____link_full + "/virtualmin-git/index.cgi") {
		$.each($(".btn.btn-default.submitter.ui_submit"), function () {
			$(this).removeClass("heighter-28").addClass("heighter-28")
		})
	}
	if ($current_page_full == $_____link_full + "/apache/edit_global.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newlinks.cgi" || $current_page_full == $_____link_full + "/virtualmin-awstats/" || $current_page_full == $_____link_full + "/postfix/master.cgi") {
		$.each($(".ui_link_replaced"), function () {
			$(this).not(".btn-xxs").removeClass("btn-tiny").addClass("heighter-34")
		})
	}
	if ($current_page_full == $_____link_full + "/virtualmin-init/" || $current_page_full == $_____link_full + "/virtualmin-dav/list_shares.cgi" || $current_page_full == $_____link_full + "/squid/edit_acl.cgi" || $current_page_full == $_____link_full + "/virtualmin-nginx/" || $current_page_full == $_____link_full + "/fdisk/edit_disk.cgi" || $current_page_full == $_____link_full + "/server-manager/edit_newlinks.cgi" || $current_directory == $_____link + "backup-config/") {
		$.each($(".ui_link_re-replaced"), function () {
			$(this).addClass("btn-tiny").removeClass("heighter-34")
		})
	}
	if ($current_page_full == $_____link_full + "/pam/") {
		$(".panel-body > a.ui_link").addClass("btn-tiny")
	}
	if ($current_page_full == $_____link_full + "/syslog/" || $current_page_full == $_____link_full + "/syslog/index.cgi") {
		$.each($(".btn"), function () {
			$(this).removeClass("btn-tiny")
		})
	}
	if ($current_page_full == $_____link_full + "/status/edit_mon.cgi") {
		$('td.col_value > table[cellspacing="1"] tbody').attr("style", "border: 0 !important;");
		$.each($("table.sub_table_container td > font"), function () {
			$(this).parents("tbody").attr("style", "border: 0 !important; ");
			$(this).contents().unwrap().wrap('<i class="fa fa-info-circle">&nbsp;</i>')
		})
	}
	if ($current_page_full == $_____link_full + "/shell/" || $current_page_full == $_____link_full + "/shell/index.cgi" || $current_page_full == $_____link_full + "/server-manager/shell.cgi") {
		$.each($(".btn:not(.btn-link), select, input"), function () {
			$(this).removeClass("heighter-28").addClass("heighter-34");
			if ($(this).is('input[type="button"]')) {
				$($(this).addClass("submitter"))
			}
			if (t__wi_p.$(".form-control.sidebar-search").val().trim().startsWith("!")) {
				t__wi_p.$(".form-control.sidebar-search").val("")
			}
			$(".ui_form").find("input.btn.btn-default:first").addClass("btn-success")
		});
		$("input#cmd").focus()
	}
	$.each($(".acheckbox + label, .aradio + label"), function (d, c) {
		if ($(this).find("br:last-child").length) {
			$(this).prev(".acheckbox, .aradio").attr("style", "margin-left: 0 !important;")
		}
	});
	$.each($("input"), function () {
		if ($(this).css("height") == "28px" && $(this).next("input").css("height") != "28px") {
			if ($(this).is(':not([type="hidden"])')) {
				$(this).next("input").addClass("heighter-28")
			}
		}
	});
	$.each($("select"), function () {
		if ($(this).css("height") == "34px" && $(this).next("select").css("height") != "34px") {
			$(this).next("select").addClass("heighter-34")
		}
	});
	if ($current_page_full == $_____link_full + "/cluster-passwd/edit_passwd.cgi") {
		$.each($("input + button"), function (d, c) {
			if ($(this).css("height") == "28px") {
				$(this).addClass("heighter-28").css("line-height", "12px").css("margin-top", "2px")
			}
		})
	}
	if (t___wi.location.pathname == "/virtual-server/history.cgi" || t___wi.location.pathname == "/server-manager/bwgraph.cgi" || t___wi.location.pathname == "/server-manager/history.cgi" || t___wi.location.pathname == "/server-manager/one_history.cgi") {
		$.each($("table tr td .acheckbox + a"), function () {
			$(this).css("margin-left", "4px")
		});
		$("body").find("table.ui_form_end_buttons .btn.btn-default.submitter.ui_submit").addClass("btn-success");
		$(".panel-body > table tr td b").each(function (d, c) {
			$(this).addClass("btn btn-success btn-tiny ui_link_replaced")
		});
		$(".panel-body > table a").each(function (d, c) {
			$(this).addClass("btn btn-inverse btn-tiny ui_link_replaced").removeClass("ui_link");
			$(this).text($(this).text().replace(/\.$/, ""));
			if ($(this).text() && $(this).text().indexOf("<<") > -1) {
				$(this).text($(this).text().replace(/\<\</, ""));
				$(this).html('<i style="vertical-align: baseline !important;" class="fa fa-angle-double-left"> </i> ' + $(this).text())
			}
			if ($(this).text() && $(this).text().indexOf(">>") > -1) {
				$(this).text($(this).text().replace(/\>\>/, ""));
				$(this).html($(this).text() + ' <i style="vertical-align: baseline !important;" class="fa fa-angle-double-right"> </i>')
			}
			$(this).parent().contents().filter(function () {
				return this.nodeType == 3
			}).remove();
			if (($(this).attr("href").indexOf("edit_cmd.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-terminal"> </i> ' + $(this).text())
			}
			if (($(this).attr("href").indexOf("edit_file.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-edit"> </i> ' + $(this).text())
			}
			if (($(this).attr("href").indexOf("edit_sql.cgi?new") === 0)) {
				$(this).html('<i class="fa fa-database"> </i> ' + $(this).text())
			}
			$(this).parents("table").css("margin-bottom", "3px")
		});
		if ($("#history").next("table.ui_grid_table").next("a").length) {
			$("#history").next("table").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank");
			$("#history").next("table").next("a").text($("#history").next("table").next("a").text().replace(/\.\.$/, ""));
			$("#history").next("table").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-external-link"></i>&nbsp;' + $("#history").next("table").next("a").text())
		} else {
			$("#history").next("a").addClass("btn btn-info btn-tiny ui_link_replaced").attr("style", "margin-top: 4px !important").attr("target", "_blank");
			$("#history").next("a").text($("#history").next("a").text().replace(/\.\.$/, ""));
			$("#history").next("a").html('<i style="vertical-align: baseline !important;" class="fa fa-external-link"></i>&nbsp;' + $("#history").next("a").text())
		}
		$(".panel-body > hr + b").attr("style", "font-size: 16px; font-weight: normal;");
		$(".panel-body > hr + b").text($(".panel-body > hr + b").text().replace(/\:$/, ""))
	}

	function tt__m__res() {
		var b;
		$(window).on("resize", function () {
			clearTimeout(b);
			b = setTimeout(function () {
				container_fluid_size()
			}, 1000)
		})
	}
	tt__m__res();
	$('input[type="file"]').bootstrapFileInput();
	setTimeout(function () {
		$.each($(".file-input-wrapper > span"), function () {
			$(this).html('<i class="fa fa-fw fa-paperclip">')
		})
	}, 1);
	setTimeout(function () {
		Plugins.AutosizeInput.getDefaultOptions().space = 0;
		$('input[name="deny"], input[name="cmd"],input[name="url"],input[name="user"],input[name="group"],input[name="edit"],input[name="label"],input[name="dir"],input[name="file"],input[name="comment"],input[name="pre"],input[name="post"],input[name="before"],input[name="after"]').each(function () {
			if (!$(this).hasClass("ui_radio") && $(this).attr("type") != "checkbox" && $(this).attr("type") != "radio") {
				if ($(this).attr("size") == 40) {
					$(this).css("min-width", "306px")
				} else {
					$(this).css("min-width", "198px")
				}
				$(this).css("max-width", $(this).parents("div.panel.panel-default").width() / 2.5);
				$(this).autosizeInput()
			}
		})
	}, 100);
	setTimeout(function () {
		if (typeof onLoad === "function" && typeof onResize === "function") {
			onLoad();
			$(window).resize(function (b) {
				onResize()
			})
		}
	}, 600);
	$.each($('tr > td[valign="top"][width="50%"]'), function () {
		$(this).attr("style", "vertical-align: top !important; " + $(this).attr("style"))
	});
	$("body table").each(function (d, f) {
		var g = $(this);
		if (!$(f).hasClass("table") && !$(f).hasClass("header") && !$(f).hasClass("ui_form_end_buttons") && !$(f).hasClass("ui_table")) {
			$(f).addClass("table-hardcoded");
			if ($product_name == "usermin") {
				$(f).addClass("table-subtable");
				if ($(f).find("tr.thead").length || $(f).hasClass("sub_table_container table-hardcoded table-subtable")) {
					$(f).find("tr.thead").attr("style", "border: 1px solid #efefef");
					$(f).attr("style", "border: 1px solid #efefef")
				} else {
					if ($(f).attr("style") && $current_page_full.indexOf("view_mail.cgi") > -1) {} else {
						$(f).attr("style", "margin-top: 10px;")
					}
				}
			}
		}
	});
	if ((($current_page_full.indexOf(".cgi") === -1 || $current_page_full.indexOf("link.cgi") !== -1) || $current_page_full == $_____link_full + "/proc/open_files.cgi" || $current_page_full == $_____link_full + "/webmin/edit_webmincron.cgi" || $current_page_full == $_____link_full + "/postfix/mailq.cgi" || $current_page_full == $_____link_full + "/webmin_search.cgi" || $current_page_full == $_____link_full + "/useradmin/index.cgi" || $current_page_full == $_____link_full + "/quota/list_users.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi" || $current_page_full == $_____link_full + "/init/index.cgi") && ($current_directory == $_____link + "webmin/" || $current_directory == $_____link + "proc/" || $source_path == $_____link + "webmin_search.cgi" || $current_directory == $_____link + "postfix/" || $current_directory == $_____link + "virtual-server/" || $current_directory == $_____link + "init/" || $current_directory == $_____link + "mount/" || $current_directory == $_____link + "custom/" || $current_directory == $_____link + "quota/" || $current_directory == $_____link + "fsdump/" || $current_directory == $_____link + "inittab/" || $current_directory == $_____link + "logrotate/" || $current_directory == $_____link + "mailcap/" || $current_directory == $_____link + "cron/" || $current_directory == $_____link + "software/" || $current_directory == $_____link + "syslog/" || $current_directory == $_____link + "useradmin/" || $current_directory == $_____link + "apache/" || $current_directory == $_____link + "webalizer/" || $current_directory == $_____link + "cpan/" || $current_directory == $_____link + "htaccess-htpasswd/" || $current_directory == $_____link + "fdisk/") || $current_page_full == $_____link_full + "/man/search.cgi" || $current_page_full == $_____link_full + "/proc/index_tree.cgi" || $current_page_full == $_____link_full + "/proc/index_user.cgi" || $current_page_full == $_____link_full + "/proc/index_size.cgi" || $current_page_full == $_____link_full + "/proc/index_cpu.cgi" || $current_page_full == $_____link_full + "/proc/index_search.cgi" || $current_page_full == $_____link_full + "/software/search.cgi" || $current_page_full == $_____link_full + "/virtual-server/index.cgi" || $current_page_full == $_____link_full + "/virtual-server/list_users.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newplan.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newfeatures.cgi" || $current_page_full == $_____link_full + "/virtual-server/edit_newtmpl.cgi" || $current_page_full == $_____link_full + "/virtual-server/backuplog.cgi" || $current_page_full == $_____link_full + "/package-updates/index.cgi" || $current_page_full == $_____link_full + "/virtual-server/usage.cgi" || $current_page_full == $_____link_full + "/virtual-server/search.cgi" || (($current_page_full == $_____link_full + "/fetchmail/" || $current_page_full == $_____link_full + "/filter/") && product_name() == "Usermin")) {
		$("table").each(function () {
			if ($(this).find("thead") && $(this).find("thead").length && $(this).find("thead tr th") && $(this).find("thead tr th").length > 2) {
				if ($(this).find("thead") && $(this).find("thead").length > 1) {
					var d = $(this).find("thead:first-child");
					d.remove();
					if (product_name() == "Webmin" && ($current_page_full == $_____link_full + "/quota/list_users.cgi" || $current_page_full == $_____link_full + "/quota/list_groups.cgi")) {
						$(this).before(d);
						$(this).prev("thead").replaceTagName("table")
					}
				}
				$.fn.dataTableExt.sErrMode = "throw";
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
				$(this).find("th").each(function () {
					if (!$(this).text()) {
						$(this).css("opacity", "0").css("cursor", "default")
					}
				});
				var c = -Infinity;
				$(this).find("tr").each(function (a, b) {
					c = Math.max(c, parseFloat(a))
				});
				if (c < 10) {
					$(this).parents(".dataTables_wrapper").find(".dataTables_filter").remove()
				}
				$(".dataTables_filter input").attr("placeholder", "Filter")
			}
		})
	}
	$.each($('table.table.table-striped.table-condensed.dataTable.no-footer > thead > tr[role="row"]:first-child'), function (d, c) {
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
	$.each($('button[onclick^="t___wi.ifield"].btn.btn-default.ui_button'), function () {
		$(this).addClass("file_chooser_button_emulate")
	});
	$.each($(".file_chooser_button_emulate"), function () {
		if (!$(this).find(".fa-files-o").length) {
			$(this).append('<i class="fa fa-fw fa-files-o" style="font-size:11px; pointer-events: none"></i>')
		}
		if ($(this).prev("input").css("height") == "28px") {
			$(this).addClass("heighter-28")
		}
	});
	$.each($("label > img"), function (d, c) {
		$(this).attr("style", "vertical-align: baseline !important")
	});
	$.each($('select[multiple][name="weekdays"]'), function () {
		$(this).parents('td[valign="top"], td.td_tag').attr("style", "vertical-align: top !important");
		$(this).parents('table[width="100%"]').parents(".ui_radio_table.table-hardcoded").css("width", "100%")
	});
	$("body").on("click", ".csf-submit", function (d) {
		d.preventDefault();
		var c = $(this).data("id");
		$("#" + c).submit()
	});
	$.each($("label").find("br"), function () {
		$(this).parent("label").prev(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;");
		$(this).parent("label").next(".aradio, .acheckbox").attr("style", "margin-left: 0 !important;")
	});
	$("body").on("contextmenu", 'label, .acheckbox, .aradio, input[type="radio"], input[type="checkbox"]', function (b) {
		b.preventDefault();
		if (!$(this).find("a").length && !$(this).parents("tr.ui_checked_columns").length) {
			$(this).trigger("click")
		}
	});
	$.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function () {
		if ($(this).find(".heighter-34").length) {
			$.each($(".table-responsive + .table-responsive + .table-hardcoded td"), function () {
				$(this).find(".btn").addClass("heighter-34")
			})
		}
	});
	if ($current_page_full == $_____link_full + "/cpan/edit_mod.cgi") {
		$('form[action="download.cgi"]').next().next().next().find(".submitter.ui_submit").addClass("heighter-34")
	}
	if ($current_page_full == $_____link_full + "/cpan/" || $current_page_full == $_____link_full + "/cpan/index.cgi") {
		$('input[name="cpan"]').next("button").append('<i class="fa fa-fw fa-files-o" style="font-size:11px; margin-top: -6px; pointer-events: none"></i>').attr("style", "width: 40px; height: 28px; vertical-align:middle !important; margin-top:2px; margin-bottom:2px;")
	}
	if ($("form").find(".icons-row:not(.inline-row)").length) {
		$("form").find(".icons-row").addClass("_processed_");
		$("form").find(".icons-row").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef");
		$("form").find(".icons-row").find(".icons-container").addClass("icons-container-stretched");
		$("form").find(".icons-row").find(".xsmall-icons-container").addClass("xsmall-icons-container-stretched")
	}

	function __m_ico_row_tb() {
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
			"padding-top": "8px",
			"padding-bottom": "8px"
		});
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef").css("border-bottom", "1px solid #efefef");
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").find(".xsmall-icons-container").addClass("xsmall-icons-container-stretched")
	}

	function __m_ico_row_t() {
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
			"padding-top": "8px"
		});
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-top", "1px solid #efefef");
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").find(".xsmall-icons-container").addClass("xsmall-icons-container-stretched")
	}

	function __m_ico_row_b() {
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css({
			"padding-bottom": "6px"
		});
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").css("border-bottom", "1px solid #efefef");
		$("body").find(".icons-row:not(._processed_):not(.inline-row)").find(".xsmall-icons-container").addClass("xsmall-icons-container-stretched")
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
	$("body").on("contextmenu", "div.icons-container, div.small-icons-container, div.xsmall-icons-container", function (b) {
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
	});
	if ($("body").find(".icons-row > div.icons-container").length || $("body").find(".icons-row > div.small-icons-container").length || $("body").find(".icons-row > div.xsmall-icons-container").length) {
		$("body").on("click", ".select_all", function () {
			if ($(this).parents("form").find('.icons-row div[class*="icons-container"]').length) {
				$.each($(".icons-row .hidden-forged-6"), function () {
					$(this).parents('div[class*="icons-container"]').addClass("highlighted")
				})
			}
		}).on("click", ".select_invert", function () {
			$.each($(".icons-row .hidden-forged-6"), function () {
				if ($(this).find("input").is(":checked")) {
					$(this).parents('div[class*="icons-container"]').addClass("highlighted")
				} else {
					$(this).parents('div[class*="icons-container"]').removeClass("highlighted")
				}
			})
		});
		$.each($(".icons-row .hidden-forged-6"), function () {
			if ($(this).find("input").is(":checked")) {
				$(this).parents('div[class*="icons-container"]').addClass("highlighted")
			}
		});
		$.each($(".hidden-forged-7 > a"), function () {
			$(this).removeClass();
			if ($(this).parents(".hidden-forged-7").hasClass("hidden-forged-7-small")) {
				$(this).html('<i class="fa fa-pencil-square text-dark text-dark-hoverd"> </i>')
			} else {
				if ($(this).parents(".hidden-forged-7").hasClass("hidden-forged-7-xsmall")) {
					$(this).html('<i class="fa fa-pencil-square text-dark text-dark-hoverd"> </i>')
				} else {
					$(this).html('<i class="fa fa-lg fa-pencil-square text-dark text-dark-hoverd"> </i>')
				}
			}
		});
		$("body").on("mouseover", '.icons-row div[class*="icons-container"]', function (b) {
			$(this).find(".hidden-forged-7").removeClass("hidden-forged")
		}).on("mouseout", function (b) {
			$(this).find(".hidden-forged-7").addClass("hidden-forged")
		})
	}
	if ($current_directory == $_____link + "virtualmin-registrar/") {
		$.each($("td > input "), function () {
			if ($(this).parents("table.table-hardcoded").find('form[action="edit.cgi"]').length) {
				$(this).css("margin-left", "5px");
				$(this).parent("td").prev("td").find("select").css("margin-left", "5px")
			}
		})
	}
	if ($current_page_full == $_____link_full + "/cluster-webmin/edit_host.cgi") {
		$.each($(".panel-body > .table-hardcoded"), function () {
			$(this).attr("style", "margin-top: 10px !important")
		})
	}
	if ($current_page_full == $_____link_full + "/virtual-server/list_scripts.cgi") {
		$('form[action="script_form.cgi"] thead + thead').find("tr").append('<th style="width: auto; border-top-style: none; border-bottom-style: none;"></th><th style="width: auto; border-top-style: none; border-bottom-style: none;"></th><th style="width: auto; border-top-style: none; border-bottom-style: none;"></th><th style="width: auto; border-top-style: none; border-bottom-style: none;"></th>')
	}
	$.each($(".file_chooser_button_attached"), function (d, c) {
		if ($(this).prev('input[onclick*=".cgi"]')) {
			$(this).prev('input[onclick*=".cgi"]').css("width", "40px")
		}
	});
	if (product_name(1).toLowerCase() == "cloudmin" && ($current_page_full == $_____link_full + "/server-manager/add_form.cgi" || $current_page_full == $_____link_full + "/server-manager/scan_form.cgi")) {
		$.each($("label"), function () {
			$(this).find("br").remove()
		})
	}
	if (($current_page_full == $_____link_full + "/mysql/view_table.cgi" || $current_page_full == $_____link_full + "/postgresql/view_table.cgi") && $("td.td_tag > table.table-hardcoded")) {
		var $___colspan = $("td.td_tag > table.table-hardcoded").parents("table").find("thead").find("tr").find("th").length;
		$("td.td_tag > table.table-hardcoded").parent("td.td_tag").attr("colspan", $___colspan).attr("style", "padding: 1px !important;")
	}
	if ($current_page_full == $_____link_full + "/virtual-server/backup_form.cgi" && $__source_url && $__source_url.indexOf("?sched=") > -1) {
		$("body > div > div > div.panel-body > form > table:nth-child(4) > tbody > tr:nth-child(2) > td").css("display", "table-cell")
	}
	if ($__source_path === "/config.cgi") {
		$("thead tr th.table-title").prepend('<i class="fa fa-cogs">&nbsp;&nbsp;</i>')
	}
	___f__tw();
	$.each($('form[action="save_global.cgi"], form[action="save_iptables.cgi"], form[action="save_domain.cgi"],form[action="domain_setup.cgi"],form[action="mass_create.cgi"],form[action="save_roundrobin.cgi"],form[action="save_alert.cgi"], body.time form[action="apply.cgi"]'), function () {
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
		var target = $(".ui_form .table-responsive table.table.table-striped.table-rounded.table-condensed.table-subtable > thead tr th:first-child"),
			container = $(".ui_form .table-responsive table.table.table-striped.table-rounded.table-condensed.table-subtable > thead tr th:last-child"),
			link = container.find("a");
		target.append(link);
		container.remove();
		target.find("a").addClass("table_title_links pull-right btn btn-warning btn-tiny").attr("style", "position: absolute; right: 20px; margin-top: 3px !important;");
		if (target.find("a").attr("href").indexOf("edit_simple.cgi") > -1) {
			target.find("a").removeClass("btn-warning").addClass("btn-success")
		}
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
		var $t__acl_title = $("br").next(".ui_grid_table.table-hardcoded").find("tbody").attr("style", "border: 1px solid #eee !important").parent("table").prev("br").prev("b");
		$("br").next(".ui_grid_table.table-hardcoded").css("margin-bottom", "3px");
		$.each($t__acl_title, function (c, d) {
			if ($(this).text() == "") {
				$(this).next("br").remove();
				$(this).remove()
			}
		});
		$t__acl_title.attr("style", "margin-bottom: -3px !important").next("br").remove()
	}
	$('form[action="bootup.cgi"]').on("submit", function (b) {
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
	t___wi.onbeforeunload = function (b) {
		t___wi.parent.$___________right = 0;
		t__wi_p.__lrs()
	}
};
