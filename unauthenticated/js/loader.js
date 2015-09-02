/*!
 * Authentic Theme 15.51 (https://github.com/qooob/authentic-theme)
 * Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */

$__theme_name__ = "authentic";
$___________ready = 0;

typeof settings_loader_left == "undefined" ? settings_loader_left = true : false;
typeof settings_mailbox_slash_delimiter == "undefined" ? settings_mailbox_slash_delimiter = true : false;
typeof settings_window_autoscroll == "undefined" ? settings_window_autoscroll = true : false;
typeof settings_right_reload == "undefined" ? settings_right_reload = true : false;
typeof settings_right_virtualmin_default == "undefined" ? settings_right_virtualmin_default = "sysinfo.cgi" : false;
typeof settings_right_cloudmin_default == "undefined" ? settings_right_cloudmin_default = "sysinfo.cgi" : false;
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
typeof settings_hotkey_reload == "undefined" ? settings_hotkey_reload = "r" : false;
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
typeof settings_sysinfo_easypie_charts == "undefined" ? settings_sysinfo_easypie_charts = true : false;
typeof settings_sysinfo_link_mini == "undefined" ? settings_sysinfo_link_mini = true : false;
typeof settings_window_customized_checkboxes_and_radios == "undefined" ? settings_window_customized_checkboxes_and_radios = true : false;
typeof settings_loader_top == "undefined" ? settings_loader_top = true : false;
typeof settings_loader_right == "undefined" ? settings_loader_right = true : false;
typeof settings_animation_left == "undefined" ? settings_animation_left = true : false;
settings_animation_left ? $settings_animation_left_slide_time = 220 : $settings_animation_left_slide_time = 0;
typeof settings_animation_tabs == "undefined" ? settings_animation_tabs = true : false;
settings_animation_tabs ? $settings_animation_tabs_slide_time = 280 : $settings_animation_tabs_slide_time = 0;
typeof settings_favorites == "undefined" ? settings_favorites = true : false;
try {
	window.parent.$
} catch (e) {
	window.parent = window
}

function __slm() {
	if (window.parent.$("aside").css("transform") == "none") {
		setTimeout(function () {
			window.parent.$("aside").transition({
				x: 260
			}, 1000, function () {
				window.parent.autocomplete("c");
				if (window.parent.$(".__logo") && window.parent.$(".__logo").css("transform") == "none" && !window.parent.$(".mobile-menu-toggler:visible").length) {
					window.parent.$(".__logo").transition({
						y: "-140px"
					}, 1200)
				}
			})
		}, 300);
		setTimeout(function () {
			window.parent.$(".switch-toggle").css("display", "table")
		}, 301)
	}
}
__slm();

function arrayIntersect(c, b) {
	var a = [];
	$.each(c, function (d, f) {
		if (b.match(new RegExp(f, "gi"))) {
			a.push(f)
		}
	});
	return !$.isEmptyObject(a)
}

function __lrs(c, b) {
	var a = document.activeElement,
		d = ["export", "export as csv.", "download", "upload"];
	if (a) {
		if (($(a).is("a") && $(a).attr("href") && ($(a).attr("href").indexOf("webminlog.csv") > -1 || $(a).attr("href").indexOf("detach.cgi") > -1 || $(a).attr("href").indexOf("download.cgi") > -1)) || ($(a).is("a") && $(a).text() && (arrayIntersect(d, $(a).text()))) || ($(a).is("input") && $(a).val() && (arrayIntersect(d, $(a).val()) || $(a).parents('form[action="create_vpn.cgi"]').length)) || ($(a).is("body.filemin"))) {
			return
		}
	}(window.parent.$("aside").css("transform") == "none" && window.location == window.parent.location) ? $_____fl = 1: $_____fl = 0;
	typeof c == "undefined" ? c = false : c = true;
	typeof b == "undefined" ? b = 110 : false;
	if (settings_loader_right) {
		window.parent.$('iframe[name="page"]').animate({
			opacity: 0
		}, b);
		window.parent.$(".loader-container").addClass("loading-started");
		if (((window.parent.$("aside").css("transform") == "none" || window.parent.$("aside").css("transform") != "matrix(1, 0, 0, 1, 260, 0)") && !window.parent.$(".btn-menu-toggler").is(":visible")) || (window.parent.$('iframe[name="page"]').contents().find("title").text() && window.parent.$('iframe[name="page"]').contents().find("title").text().indexOf("ConfigServer Security & Firewall") > -1 && c)) {
			window.parent.$(".loader-container").css("background-color", "#ededed").css("display", "block")
		} else {
			window.parent.setTimeout(function () {
				if (window.parent.$(".loader-container").hasClass("loading-started")) {
					if (settings_loader_top) {
						window.parent.NProgress.configure({
							showSpinner: false,
							trickleRate: 0.08,
							trickleSpeed: 400
						}).start()
					}
					window.parent.$(".loader-container").css("background-color", "#ededed").css("display", "block")
				}
			}, 1501)
		}
	} else {
		if (settings_loader_top) {
			window.parent.NProgress.configure({
				showSpinner: true,
				trickleRate: 0.08,
				trickleSpeed: 400
			}).start()
		}
	}
	window.parent.$(".form-control.sidebar-search").attr("disabled", "true")
}

function product_name(a) {
	if (window.parent.$("#wrapper").data("server-manager") != -1) {
		return "Cloudmin"
	} else {
		if (window.parent.$("#wrapper").data("virtual-server") != -1) {
			return "Virtualmin"
		} else {
			if (window.parent.$("#wrapper").data("webmail") != -1 && !a) {
				return "Mail"
			} else {
				var b = window.parent.$("#wrapper").data("product");
				return b.charAt(0).toUpperCase() + b.slice(1)
			}
		}
	}
}

function __mss() {
	if (product_name(1).toLowerCase() == "cloudmin") {
		if (window.parent.$("aside").find("li.menu-container.menu-status.hidden").find("font").length > 0) {
			var c = window.parent.$("aside").find("li.menu-container.menu-status.hidden").find("font"),
				a = c.text(),
				b = c.attr("color");
			if (b && (b.indexOf("00ff00") || b.indexOf("008800") || b.indexOf("00aa00"))) {
				b = "success"
			} else {
				if (b && (b.indexOf("ff6600") || b.indexOf("ff00ff") || b.indexOf("ff22ff") || b.indexOf("ff44ff"))) {
					b = "warning"
				} else {
					if (b && (b.indexOf("ff0000") || b.indexOf("ff1100") || b.indexOf("aa0000") || b.indexOf("ff2200") || b.indexOf("ff4400"))) {
						b = "danger"
					} else {
						b = "info"
					}
				}
			}
			if (a == "Virtualmin") {
				a = "VM"
			}
			setTimeout(function () {
				var f = window.parent.$("aside .select2-selection__rendered");
				if (!f.find(".menu-status-label").length) {
					f.append('<span class="pull-right label label-' + b + ' menu-status-label bg-light-grey pointer-events-none">' + a + "</span>");
					var d = window.parent.$("aside .select2-selection__rendered .menu-status-label");
					d.animate({
						opacity: 1
					}, 500);
					d.on("mouseover", function () {
						$(this).removeClass("bg-light-grey")
					}).on("mouseout", function () {
						$(this).addClass("bg-light-grey")
					});
					f.on("mouseover", function () {
						$(this).find(".menu-status-label").removeClass("bg-light-grey")
					}).on("mouseout", function () {
						$(this).find(".menu-status-label").addClass("bg-light-grey")
					})
				}
			}, 300)
		}
	}
}

function __lre() {
	window.parent.$(".loader-container").removeClass("loading-started").css("background-color", "transparent").css("display", "none");
	window.parent.$('iframe[name="page"]').animate({
		opacity: 1
	}, 200, function () {
		if (typeof window.parent.$('iframe[name="page"]').get(0).contentWindow.autocomplete == "function") {
			window.parent.$('iframe[name="page"]').get(0).contentWindow.autocomplete("c")
		}
		if (window.location == window.parent.location && typeof window.parent.$('iframe[name="page"]').get(0).contentWindow.__dlm == "function") {
			$('iframe[name="page"]').get(0).contentWindow.__dlm()
		}
		if (window.parent.$_____fl) {
			__mss()
		}
	});
	if (window.parent.$("aside").css("transform") == "none") {
		__slm()
	}
	if (settings_loader_top) {
		if (typeof window.parent.NProgress === "object") {
			window.parent.NProgress.done()
		}
	}
	if (typeof hide_mobile_menu == "function") {
		hide_mobile_menu()
	}
}

function s(b) {
	var c = document.getElementsByTagName("head")[0];
	var a = document.createElement("script");
	a.type = "text/javascript";
	a.src = b;
	c.appendChild(a)
}
$(window.parent.$('iframe[name="page"]')).on("load", function () {
	if (window.parent.$('iframe[name="page"]') && window.parent.$('iframe[name="page"]').contents() && !window.parent.$('iframe[name="page"]').contents().text().match(/___authentic_theme_footer___/)) {
		__lre();
		s("/unauthenticated/js/authentic.min.js?1550")
	}
});

function __num() {
	var a = $.url(window.location),
		b = a.attr("path");
	if ((b && b.indexOf("/webmin/edit_themes.cgi") > -1 && window.parent.location.search == "?updating") || (b && b.indexOf("/webmin/edit_themes.cgi") > -1 && window.parent.location.search == "?updating-processing") || (b && b.indexOf("/webmin/install_theme.cgi") > -1 && window.parent.location.search == "?updating-processing") || (b && b.indexOf("/webmin/install_theme.cgi") > -1 && window.parent.location.search == "?updating-finished") || (b && b.indexOf("/webmin/edit_webmincron.cgi") > -1 && (window.parent.location.search == "?recollect" || window.parent.location.search == "?recollecting" || window.parent.location.search == "?recollect-system-status" || window.parent.location.search == "?recollect" || window.parent.location.search == "?recollecting-system-status")) || (b && b.indexOf("/webmin/delete_webmincron.cgi") > -1 && (window.parent.location.search == "?recollecting-system-status" || window.parent.location.search == "?recollect-system-status" || window.parent.location.search == "?recollect-finished" || window.parent.location.search == "?recollecting-finished" || window.parent.location.search == "?recollecting-package-updates")) || (b && b.indexOf("/package-updates/index.cgi") > -1 && (window.parent.location.search == "?recollect" || window.parent.location.search == "?recollecting" || window.parent.location.search == "?recollecting-package-updates" || window.parent.location.search == "?recollecting-package-updates-processing")) || (b && b.indexOf("/package-updates/update.cgi") > -1 && (window.parent.location.search == "?recollect" || window.parent.location.search == "?recollecting" || window.parent.location.search == "?recollecting-package-updates" || window.parent.location.search == "?recollecting-package-updates-processing" || window.parent.location.search == "?recollecting-finished"))) {
		return false
	} else {
		return true
	}
}
var $__was = function () {
	if ($("pre") && $("pre").length > 0 && $("pre").length <= 2) {
		if (__num()) {
			__lre()
		}
		$("body").unbind("mousewheel");
		window.clearInterval($__was_runner);
		refresh = function () {
			$("body, html").animate({
				scrollTop: $(document).height()
			}, 200)
		};
		refresher = window.setInterval(refresh, 201);
		setTimeout(function () {
			$("body").bind("mousewheel", function (a) {
				if (typeof refresher != "undefined") {
					window.clearInterval(refresher)
				}
				delete refresh;
				delete refresher;
				delete $__was_runner;
				$("body").unbind("mousewheel");
				$(this).off();
				setTimeout(function () {
					$("html").bind("mousewheel", function (b) {
						if ($(window).scrollTop() + $(window).height() == $(document).height()) {
							$("html").unbind("mousewheel");
							$(this).off();
							if (settings_window_autoscroll && window.location != window.parent.location && typeof $__was_runner_is_done == "undefined") {
								$__was_runner = window.setInterval($__was, 201)
							}
						}
					})
				}, 200)
			})
		}, 0)
	}
};
if (settings_window_autoscroll && window.location != window.parent.location) {
	$__was_runner = window.setInterval($__was, 201)
};
