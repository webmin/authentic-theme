/*!
 * @package Authentic v1.0.0 (https://github.com/qooob/authentic-theme)
 * @description Webmin/Usermin theme based on Bootstrap and Font Awesome
 * @developer Ilia Rostovtsev <programming@rostovtsev.ru>
 * @copyright (c) 2014 Ilia Rostovtsev
 * @contributors (https://github.com/qooob/authentic-theme#code-contributions)
 * @license (https://github.com/qooob/authentic-theme/blob/master/LICENSE) The MIT License (MIT)
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

	// Process navigation
	var hidden = 0;

	function hide_show(status) {
		if (status == 'open') {
			$('#sidebar .open-hidden').hide();
			$('#sidebar').animate({
				width: "240px"
			}, 200, function () {
				$('#sidebar a span').toggle();
				$('#sidebar ul.navigation:not(:first-child)').css({
					'margin-top': '0'
				});
			});
			$('#sidebar form').css({
				"margin": "10px"
			});
			$('#sidebar input[name="search"]').toggle();
			$('#wrapper .menu').animate({
				marginLeft: "240px"
			}, 200);
		} else if (status == 'close') {
			$('#sidebar .sub').hide();
			width = '40px';
			$('#sidebar a span').toggle();
			$('#sidebar .open-hidden').show();
			$('#sidebar input[name="search"]').toggle();
			$('#sidebar form').css({
				'margin': '0'
			});
			$('#sidebar ul.navigation:not(:first-child)').css({
				'margin-top': '-1px'
			});
			$('#sidebar').animate({
				width: "40px"
			}, 200);
			$('#wrapper .menu').animate({
				marginLeft: "40px"
			}, 200);

		}
		hidden = !hidden;
	}

	$(".navigation > li").on('click', function () {
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
		$('#sidebar .navigation > li').each(function () {
			var $thisEach = $(this);
			if (!$(this).is($this)) {
				$(this).removeClass('active');
				if (!$(this).find('a').attr('href').indexOf("#") && $(this).find('a').attr('href') != '#search' && !$(this).find('a').attr('target')) {
					setTimeout(function () {
						if ($($thisEach.find('a').attr('href')).hasClass('sub'))
							$($thisEach.find('a').attr('href')).slideUp(250);
					}, 100);
				}
			}
		});
		$this.hasClass('active') ? $this.removeClass('active') : (sub != '#hide' && !target) ? $this.addClass('active') : false;
		setTimeout(function () {
			if ($(sub).is(':visible') && sub != '#hide' && !target) {
				$this.addClass('active');
			} else {
				$this.removeClass('active');
			};
		}, 660);

		if (sub == '#hide') {
			if (hidden == 0) {
				hide_show('close');
			} else {
				hide_show('open');
			}
		} else {
			if (hidden == 1) {
				hide_show('open');
			}
			$(sub).slideToggle();
			if (sub == '#search') {
				$('#sidebar input[name="search"]').focus();
			}
		}
		return false;
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

		// On clicking back button, drop previous menu selections
		//$(window.parent).on('onhashchange', function (event) {
		//if (event.target.target !== 'page') {
		//window.parent.$(".navigation > ul.sub > li").removeClass('sub_active');
		//window.parent.$('#sidebar .navigation > ul.sub').hide();
		//window.parent.$('#sidebar .navigation > li').removeClass('active');
		//$(".navigation > li").trigger('click');
		//$(".navigation > ul.sub > li").trigger('click');
		//}
		//});

		// Let's open menu/submenu for Webmin/Usermin default page
		$('#headln2l a').attr('href') ? $current_page = $('#headln2l a').attr('href').split("?").pop() : $current_page = false;

		if ($current_page) {
			window.parent.$('a[href="' + $current_page + '/"]').parent('li').addClass('sub_active').parent('ul.sub').show().prev('li').addClass('active');
		}

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

});
