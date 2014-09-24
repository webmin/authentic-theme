/*!
 * Authentic v1.1.0 (https://github.com/qooob/authentic-theme)
 * Copyright 2014 Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */
$(document).ready(function () {

	// Manipulate loader and dependent pages
	function loading_start() {
		$('iframe[name="page"]').css('display', 'none');
		$('.loader-container').css('display', 'block');
	};

	function loading_end() {
		$('iframe[name="page"]').css('display', 'none');
		$('.loader-container').css('display', 'block');
	};
	$('iframe[name="page"]').load(function () {
		$('.loader-container').css('display', 'none');
		$('iframe[name="page"]').css('display', 'block');
	});

	// Loader run on initial load
	loading_start();

	$(".navigation > li").on('click', function () {
		typeof $processing == "undefined" ? $processing = false : false;
		if (!$processing) {
			$processing = true;
			var sub = $('a', this).attr('href'),
				target = $('a', this).attr('target'),
				$this = $(this);

			if (target) {
				$(".navigation > ul.sub > li").each(function () {
					$(this).removeClass('sub_active');
				});
			}
			$("#webmin_search_form").submit(function () {
				$(".navigation > ul.sub > li").each(function () {
					$(this).removeClass('sub_active');
				});
			});

			$.when(
				$('#sidebar .navigation > li').each(function () {
					var $parent_this = $(this);
					if (!$(this).is($this)) {
						$(this).removeClass('active');
						if (!$(this).find('a').attr('href').indexOf("#") && $(this).find('a').attr('href') != '#search' && !$(this).find('a').attr('target')) {
							if ($($parent_this.find('a').attr('href')).hasClass('sub')) {
								$($parent_this.find('a').attr('href')).slideUp(600);
							}
						}
					}
				})
			).done(function () {
				$this.hasClass('active') ? $this.removeClass('active') : (sub != '#hide' && !target) ? $this.addClass('active') : false;
				setTimeout(function () {
					if ($(sub).is(':visible') && sub != '#hide' && !target) {
						$this.addClass('active');
					} else {
						$this.removeClass('active');
					}
					$processing = false;
				}, 660);
				$(sub).slideToggle(600);
			});

			if (sub == '#search') {
				$('#sidebar input[name="search"]').focus();
			}
		}
	});
	$(".navigation > ul.sub > li").on('click', function () {
		var $this = $(this);

		$(".navigation > ul.sub > li").each(function () {
			$(this).removeClass('sub_active');
		});
		$("#webmin_search_form").find('input[name="search"]').val('');
		$this.addClass('sub_active');
	});

	// Initiate loader only when click on menu
	$('aside .navigation a[target="page"]').on('click', function () {
		loading_start();
		loading_end();
	});
	// Initialize styled file upload button
	$('input[type=file]').bootstrapFileInput();

	// Append additional style element
	$('#tall_0').before('<br>');

	// Process Webmin/Usermin accordions, in accordance with old hardcoded JavaScript functions
	function check_accordions_status() {
		$(".opener_container").each(function (index, value) {
			if ($(this).find('div').hasClass('opener_hidden')) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	}
	// Execute on page load
	check_accordions_status();

	// Process click events for accordion
	$('.opener_trigger').on('click', function () {
		$this = $(this);
		if ($this.closest('tbody').find('.opener_container').first().find('div').hasClass('opener_hidden')) {
			$this.closest('tbody').find('.opener_container').show();
			setTimeout(function () {
				$this.parent('td').find('.opener_trigger img').attr('src', '/images/open.gif');
			}, 10);
		} else {
			$this.closest('tbody').find('.opener_container').hide();
			setTimeout(function () {
				$this.parent('td').find('.opener_trigger img').attr('src', '/images/closed.gif');
			}, 10);
		}
	});
	if ($('.opener_shown').length > 0) {
		$('.panel-body  .ui_form .table  tbody  tr').removeClass('thead');
		$('.opener_trigger').parent('td').css('vertical-align', 'middle').css('height', '43px');
	}

	$(".navigation .navigation_sysinfo_modules_trigger, .navigation .navigation_refresh_modules_trigger").on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('iframe[name="page"]').attr("src", $(this).data('href'));
	});

	$product_name = window.parent.$('#wrapper').data('product');

	$('body table').each(function ($key, $value) {
		var $this = $(this);
		if (!$($value).hasClass('table') && !$($value).hasClass('header') && !$($value).hasClass('ui_form_end_buttons') && !$($value).hasClass('ui_table')) {
			$($value).addClass('table-hardcoded');
			if ($product_name == 'usermin') {
				$($value).addClass('table table-striped table-rounded table-condensed table-subtable');
			}
		}
	});

	$(window).load(function () {
		// Let's open menu/submenu for Webmin/Usermin default page
		// and add support for history button (by applying tricks
		// to overcome modules' programming inconsistency)
		var $htarget = $('#headln2l a');
		$hhreftarget = $htarget.attr('href');
		$hhreftarget ? $current_page = !$htarget.prop("onclick") ? ($hhreftarget.indexOf("?") >= 0) ? $hhreftarget.split("?").pop() : $hhreftarget.match(/\/(.*?)\//)[1] : $hhreftarget.match(/.cgi\/(.*?)\//)[1] : $current_page = false;
		if ($current_page) {
			window.parent.$(".navigation > ul.sub > li").removeClass('sub_active');
			window.parent.$('#sidebar .navigation > ul.sub').hide();
			window.parent.$('#sidebar .navigation > li').removeClass('active');
			window.parent.$('a[href="' + $current_page + '/"]').parent('li').addClass('sub_active').parent('ul.sub').show().prev('li').addClass('active');
		}

		// Applying CSS tricks for some elements to improve visible effects
		$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents('table.table-hardcoded > tbody > tr').css('border', 'none').parents('table').css('margin-top', '20px');
		$('.panel-body > form > table > tbody > tr > td:has(input[type="submit"])').parents('table.table-hardcoded > tbody').css('border', 'none');
		$('.ui_grid_table > tbody > tr.ui_grid_row > td:has(button[type="submit"])').parents('table.ui_grid_table').css('border', 'none');

		// Removing empty label to save space in tables
		$('form.ui_form > table label.radio, form.ui_form > table label.checkbox').each(function () {
			var $this = $(this),
				$obj = $this.find('i.fa'),
				$obj_text = $this.find('i.fa').text().trim(),
				$obj_text_parent = $this.text().trim();

			if ($obj_text.length === 0 && $obj_text_parent.length === 0) {
				$obj.parent('label').remove();
			}
		});

		// Changing icons for 'System and Server Status'
		$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/up.gif"], .ui_form[action^="save_mon"] img[src="images/up.gif"]').each(function ($key, $value) {
			var $this = $(this);
			$($value).attr('src', '/images/check.png');
		});
		$('.ui_form[action^="delete_mons"] tr.ui_checked_columns > td > label > img[src="images/down.gif"], .ui_form[action^="save_mon"] img[src="images/down.gif"]').each(function ($key, $value) {
			var $this = $(this);
			$($value).attr('src', '/images/cross.png');
		});

		$("img[src^=images]").each(function ($key, $value) {
			var $this = $(this);
			$($value).attr('src', '/' + $this.attr('src'));
		});

		$("a.ui_link + b").addClass('btn btn-success').css('margin-top', '4px');
		$("b + a.ui_link").addClass('btn btn-success').css('margin-top', '4px');

		if ($('.panel-body > b:first-child:contains("Display")').length > 0) {
			$(".panel-body > b:first-child").remove();
		}
	});

	// Initializing CodeMirror
	$("textarea").each(function (i, block) {
		var $this = $(this),
			$global_targets = ['phpini', 'bind8'],
			$z80_targets = ['phpini'],
			$xml_targets = ['bind8'];
		$('#headln2l a').attr('href') ? $page = $('#headln2l a').attr('href').split('/')[1] : $page = null;

		if ($global_targets.indexOf($page) >= 0) {
			$(this).attr('name', 'data');
			if ($z80_targets.indexOf($page) >= 0) {
				$(this).data('mode', 'text/x-z80');
			} else if ($xml_targets.indexOf($page) >= 0) {
				$(this).data('mode', 'xml');
			} else {
				$(this).data('mode', 'rpm-spec');
			}
		}

		if ($(this).attr('name') == 'data' && $("textarea").length === 1) {
			$parent_width = $this.parent('td').width();
			var editor = CodeMirror.fromTextArea(block, {
				mode: {
					name: $(this).data('mode') ? $(this).data('mode') : "rpm-spec"
				},
				tabMode: "indent",
				matchBrackets: true,
				lineNumbers: true,
				lineWrapping: true,
				indentUnit: 4
			});
			$window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2.8));
			editor.setSize($parent_width, $window_height);

			$(window).resize(function () {
				$parent_width = $this.parent('td').width();
				$window_height = ($(window).outerHeight() - ($(window).outerHeight() / 2.8));
				editor.setSize($parent_width, $window_height);
			});
		}
	});
});
