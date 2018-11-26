/*!
 * Authentic Theme (https://github.com/authentic-theme/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.io>
 * Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
 */

/* jshint strict: true */
/* jshint esversion: 6 */
/* jslint bitwise: true */
/* jshint jquery: true */

'use strict';

/**
 * Mail object module
 *
 * @since 19.17
 *
 * @return {object} Reveal folders module API
 * @return {object} Reveal messages module API
 */

const mail = (function() {

  /* jshint -W117 */

  /**
   * Imports globals using abstraction layer (DI)
   *
   * @since 19.17
   *
   * @return {string|function|object}
   */
  const _ = {
      path: {
        origin: v___location_origin,
        prefix: v___location_prefix,
        extensions: v___server_extensions_path,
        css: v___server_css_path,
        js: v___server_js_path
      },
      variable: {
        switch: function() {
          return $t_uri_webmail
        },
        module: {
          name: function() {
            return v___module
          },
          link: function() {
            let prefix = v___location_prefix;
            return prefix ? `${prefix}/${v___module}` : `/${this.name()}`;
          },
        },
      },
      content: get_pjax_content,
      load: load,
      language: theme_language,
      notification: theme_messenger,
      rows: page_table_rows_control,
      navigation: {
        reset: navigation_clear
      },
      plugin: {
        json_to_query: Convert.json_to_query,
        timestamp: time.localize,
        offset_adjust: page.handle.content.offset,

        select: (data, size = '34') => {
          if (Array.isArray(data)) {
            data[0].select2(data[1])
            return
          }
          data.select2({
            minimumResultsForSearch: 5,
            containerCssClass: `select2-content heighter-${size}`,
            dropdownCssClass: `select2-content h${size}`
          });
          data.next('.select2').addClass('select2-content-container')
          data.on('select2:open', function() {
            $('.select2-container').off('click.container')
              .on('click.container', function(event) {
                event.stopPropagation();
              })
          });
        },
        scroll: (target, options) => {
          if (typeof target === 'string') {
            $(target).mCustomScrollbar(options)
          } else {
            $(target[0]).mCustomScrollbar('scrollTo', target[1], {
              scrollOffset: [$(target[0]), 3, 4]
            })
          }
        },
        tooltip: () => {
          $('[data-tooltip="mailbox"]').tooltip({
            html: true,
            trigger: 'hover',
            container: 'body',
            delay: {
              show: 600,
              hide: 30
            }
          });
        }
      },
    },

    /* jshint +W117 */

    /**
     * Defines component template
     *
     * @since 19.20
     *
     * @return {string|object}
     */
    $$ = {
      $: {

        /**
         * Returns set of selectors for generating layout
         *
         * @returns {object}
         */
        layout: {
          container: 'container-fluid',
          controls: 'mail-controls',
          panel: 'panel-mail panel-body',
          row: {
            controls: 'row row-controls',
            messages: 'row row-messages colorify',
            quota: 'row row-quota',
          },
          column: {
            3: 'col-xs-3',
            4: 'col-xs-4',
            6: 'col-xs-6',
            8: 'col-xs-8',
            9: 'col-xs-9',
            12: 'col-xs-12',
          },
          button: {
            link: 'btn btn-link text-decoration-none',
            transparent: 'btn btn-link btn-transparent',
            default: 'btn btn-default',
            primary: 'btn btn-primary',
            block: 'btn btn-default btn-block',
            dropdown: {
              default: 'btn btn-default dropdown-toggle'
            }
          }
        },

        /**
         * Returns used selectors for generating elements
         *
         * @returns {string|object}
         */
        tree: {
          container: 'data-mail-folders',
          active: 'fancytree-active',
          loader: 'fancytree-loader',
        },
        controls: {
          compose: {
            button: '[data-compose]',
            icon: 'fa-fw fa-plus',
          },
          select: {
            dropdown: 'dropdown-select',
            checkbox: '[data-select] input',
            menus: '[data-select-mass]',
          },
          delete: 'btn btn-default fa fa-trash',
          forward: 'btn btn-default fa fa-forward',
          search: {
            link: '[data-href^="sort.cgi"]',
            clear: {
              link: 'search-clear text-danger',
              icon: 'fa-fw fa-times-circle-o',
            },
            dropdown: 'dropdown-search',
            icon: 'fa-search',
            data: {
              form: {
                action: 'data-form-action',
                type: 'data-form-action-type',
                advanced: 'data-form-action-advanced'
              },
            },
            button: {
              type: '[data-toggle-type="1"]',
            },
            caret: {
              down: 'fa-caret-down',
              up: 'fa-caret-up',
            },
            submit: '[data-search-submit]',
          },
          move: {
            dropdown: 'dropdown-move',
            checkbox: '[data-copy-only]',
            icon: 'fa-folder-move',
            submit: '[data-transfer-submit]',
          },
          more: {
            dropdown: 'dropdown-more',
            icon: 'fa-dots-vertical',
            menu: {
              read: '[data-form-action="markas1"]',
              unread: '[data-form-action="markas0"]',
              special: '[data-form-action="markas2"]',
              spam: '[data-form-action="razor"]',
              ham: '[data-form-action="ham"]',
              black: '[data-form-action="black"]',
              white: '[data-form-action="white"]',
            },
          },
          sort: {
            dropdown: 'dropdown-sort',
            icon: 'fa-fw fa-sort',
          },
          counter: 'mail-selected-count',
          refresh: {
            button: 'btn btn-transparent-link btn-lg btn-transparent fa fa-refresh',
            animation: 'fa-spin-gradual'
          },
          pagination: 'pagination-title',
          settings: 'btn btn-default fa fa-cog'
        },
        mail: {
          checkbox: 'input[data-check]',
          flag: 'mail-list-trow-flag-security',
          special: {
            star: 'star',
            starred: 'fa-star star',
            unstarred: 'fa-star-o star',
          },
        },
      },

      /**
       * Creates HTML element specified by type
       *
       * @since 19.20
       *
       * @param {string} class     Class name for created element
       * @param {mixed}  data      Data attributes to pass
       * @param {string} [type]    Used tag name
       * @param {string} [content] Content of created element
       * @param {string} [icon]    Icon class name to use
       * @param {string} [tooltip] Element tooltip title to show on hover
       */
      create: {

        /**
         * Generates element with chosen tag name
         *
         * @returns {string}
         */
        $: function(classes, data, type = 'div', content = String(), tooltip = String()) {
          let attributes = this._attributes(data);

          classes = this._classes(classes);

          if (tooltip) {
            tooltip = 'data-tooltip="mailbox" data-placement="bottom" data-title="' + tooltip + '"'
          }
          return '<' + type + ' ' + attributes + ' ' + tooltip + ' class="' + classes + '">' + content + '</' + type + '>';
        },

        /**
         * Generates icon element
         *
         * @returns {string}
         */
        icon: function(classes, attributes = String()) {
          let attribute = this._attributes(attributes),
            icon = this._classes(classes);
          return '<i class="fa ' + icon + ' ' + attribute + '"></i>';
        },

        /**
         * Generates button element
         *
         * @returns {string}
         */
        button: function(classes, data, content, icon, tooltip) {
          icon = this._classes(icon);
          return this.$(classes, data, 'button', ((icon ? '<i class="fa ' + icon + '"></i>&nbsp;&nbsp;' : '') + content + ''), tooltip);
        },

        /**
         * Generates input element
         *
         * @returns {string}
         */
        input: function(name = String(), placeholder = String(), value = String(), type = 'text', attributes = String()) {
          let attribute = this._attributes(attributes);
          return '<input ' + attribute + ' type="' + type + '" name="' + name + '" id="' + name + '" placeholder="' + placeholder + '" value="' + value + '">';
        },

        /**
         * Generates label element
         *
         * @returns {string}
         */
        label: function(target = String(), content = String(), attributes = String()) {
          let attribute = this._attributes(attributes);
          return '<label ' + attribute + ' for="' + target + '">' + content + '</label>';
        },

        /**
         * Generates select element
         *
         * @returns {string}
         */
        select: function(data, attributes = String(), name = String()) {
          let attribute = this._attributes(attributes),
            select = '<select ' + attribute + ' name="' + name + '">';
          for (let [value, text] of Object.entries(data[0])) {
            select += '<option value="' + value + '"' + (data[1] && data[1] == value ? ' selected' : String()) + '>' + text + '</option>';
          }
          select += '</select>';
          return select;
        },

        /**
         * Generates checkbox element
         *
         * @returns {string}
         */
        checkbox: function(attributes = String(), name = String(), value = String(), label = '&nbsp;', id = String(), checked = String()) {
          let attribute = this._attributes(attributes),
            checkbox = String();
          checkbox += '<span ' + attribute + ' class="awcheckbox awobject">';
          checkbox += '<input class="iawobject" ' + checked + ' type="checkbox" name="' + name + '" value="' + value + '" id="' + id + '">';
          checkbox += '<label class="lawobject" for="' + id + '">' + label + '</label>';
          checkbox += '</span>';
          return checkbox;
        },

        /**
         * Generates radio element
         *
         * @returns {string}
         */
        radio: function(attributes = String(), name = String(), value = String(), label = '&nbsp;', id = String(), checked = String()) {
          let attribute = this._attributes(attributes),
            checkbox = String();
          checkbox += '<span ' + attribute + ' class="awradio awobject">';
          checkbox += '<input class="iawobject" ' + checked + ' type="radio" name="' + name + '" value="' + value + '" id="' + id + '">';
          checkbox += '<label class="lawobject" for="' + id + '">' + label + '</label>';
          checkbox += '</span>';
          return checkbox;
        },

        /**
         * Generates dropdown element
         *
         * @returns {string}
         */
        dropdown: function(classes, data, button, icon, tooltip) {
          let dropdown = String();
          classes = this._classes(classes);
          dropdown += '<div class="btn-group ' + classes + '">';

          if (button) {
            if (/<[a-z][\s\S]*>/i.test(button)) {
              dropdown += this.$('layout.button.default', false, 'span', button);
            } else {
              dropdown += this.button('layout.button.default', false, button);
            }
          }
          dropdown += this.button('layout.button.dropdown.default', {
            'toggle': 'dropdown'
          }, '<span class="' + (icon ? ('fa ' + $$.$.controls[icon].icon) : 'caret') + '"></span>', false, tooltip);
          dropdown += '<ul class="dropdown-menu" role="menu">';
          for (let [i, v] of data[0].entries()) {
            if (v) {
              dropdown += '<li>' + v + '</li>';
            }
            if (data[i - 1] && data[1] && data[1] === (i + 1) && data[0].length > data[1]) {
              dropdown += '<li role="separator" class="divider"></li>';
            }
          }
          dropdown += '</ul>';
          dropdown += '</div>';
          return (data[0].length ? dropdown : String());
        },

        /**
         * Converts passed object of attributes to string representation
         *
         * @param {object} data Array or hash to convert to string
         *
         * @example ['href="value"', 'title="value"'] or {type: value, title: value}.
         *
         * @returns {string}
         */
        _attributes: function(data) {
          let attributes = String();

          if (Array.isArray(data)) {
            attributes = data.join(' ');
          } else if (data) {
            attributes = Object.entries(data).map(([k, v]) => (attributes += (k.startsWith('data-') ? k : ('data-' + k)) + '=' + v + ' ')).slice(-1)[0];
          }
          return attributes;
        },

        /**
         * Converts passed selector to correspondent class name from the component template
         *
         * @returns {string}
         */
        _classes: function(classes) {
          return classes ? (classes.split('.').reduce((a, b) => {
            return a ? a[b] : undefined;
          }, $$.$)) : String();
        },
      },

      /**
       * Returns selector name derived from the component template
       *
       * @returns {string}
       */
      selector: function(selector) {
        selector = this.create._classes(selector);
        return selector.startsWith('[') ? selector :
          "." + selector.replace(/\s+/g, ".")

      },

      /**
       * Returns DOM object based on passed selector
       *
       * @returns {object}
       */
      element: function(element) {
        return element ? $(this.selector(element)) : String();
      },

    }

  /**
   * Messages object sub-module ;;
   *
   * @since 19.20
   *
   * @return {object}                Reveals messages module API
   * @return {type} messages.get     Lists messages with default sorting
   * @return {type} messages.sort    Lists messages with requested sorting
   * @return {type} messages.storage Accesses messages data storage
   */
  const messages = (function() {

    /**
     * Fetches and renders list of messages for the given folder with particular pagination
     *
     * @returns {void}
     */
    const get = (data) => {
        loader.start();
        _.notification('hide-all');
        $.post(_.path.extensions + '/mail/messages.cgi?' + _.plugin.json_to_query(data),
          function(data) {
            render(data);
            loader.end();
          });
      },

      /**
       * Displays loader while loading messages
       *
       * @returns {void}
       */
      loader = {
        target: $$.selector('tree.active'),
        start: function() {
          $(this.target).addClass($$.$.tree.loader)
        },
        end: function() {
          $(this.target).removeClass($$.$.tree.loader)
        }
      },

      /**
       * Defines the length of the preview to request from the server
       *
       * @returns {number}
       */
      preview_length = () => {
        return parseInt($(window).width() / 10);
      },


      /**
       * Holds temporary data storage for managing selected messages across different pages
       *
       * @returns {object}
       */
      storage = {
        target: '[' + $$.$.tree.container + ']',
        counter: $$.selector('controls.counter'),

        /**
         * Gets currently selected messages and its data
         *
         * @returns {object|array}
         */
        get: function(status = 0) {
          let data = $(this.target).data('messages') || {};
          if (!status) {
            data = Object.keys(data);
          }
          return data;
        },

        /**
         * Stores just checked/unchecked message and its data
         *
         * Updates selected messages counter, and controls display
         *
         * @returns {void}
         */
        set: function(id, state, status, starred, data) {
          let storage = this.get(1);

          // Process messages
          state ? storage[id] = [+status, +starred] : delete storage[id]

          // Set current messages storage
          $(this.target).data('messages', storage);

          // Update counter
          let selected_count = Object.keys(storage).length;
          $(this.counter).text(
            (
              selected_count ? (selected_count + ' ' + _.language('theme_xhred_global_selected')) : String()
            )
            .toLowerCase()
          );

          // Show/hide control row
          let controls = $$.selector('layout.controls');
          $(controls).toggleClass('hidden', !selected_count);

        },

        /**
         * Restores messages selection upon listing
         *
         * @returns {void}
         */
        restore: function() {
          let data = this.get(),
            checkboxes = $$.$.mail.checkbox;

          $(checkboxes).filter((i, t) => {
            data.includes(t.value) && $(t).prop('checked', 1)
          }).promise().done(function() {
            $(checkboxes).trigger('change');
          });

        },

        /**
         * Resets messages selection storage
         *
         * @returns {void}
         */
        reset: function() {
          let checkboxes = $$.$.mail.checkbox;
          $(this.target).data('messages', {})
          $(checkboxes + ':checked').prop('checked', 0).trigger('change');
        },
      },

      /**
       * Updates message(s) read/unread status
       *
       * @returns {object}
       */
      status = {

        /**
         * Extracts action name based on type
         *
         * @returns {string}
         */
        action: function(action, string = false) {
          action = parseInt((action).replace(/^\D+/g, ''));
          if (string) {
            return action ? 'read' : 'unread';
          }
          return action
        },

        /**
         * Sets message read/unread state in UI
         *
         * @returns {void}
         */
        set: function(action, messages) {
          let $messages = $($$.$.mail.checkbox).filter((i, c) => {
              return messages.includes(c.value)
            }),
            $targets = $messages.parent().parents('td').parents('tr');
          $targets.attr('data-unread', +!this.action(action))
        },

        /**
         * Writes message read/unread state to the server
         *
         * @returns {void}
         */
        write: function(data, messages = false) {
          let folder_index = data[1].searched_folder_index || data[1].folder_index;

          if (messages) {
            let action = this.action(data[0], 1);
            messages = `&d=${messages.join('&d=')}`;
            $.post(_.path.extensions + '/mail/message.cgi?folder=' + folder_index + '&mark=' + action + messages + '');

          } else {
            let action = this.action(data[0], 1),
              server = data[1],
              messages = storage.get(1),
              starred = {
                read: [],
                unread: []
              };

            // Filter out starred messages
            $.each(messages, function(i, o) {
              if (o[1] === 1) {
                o[0] === 1 ? starred.unread.push(i) : starred.read.push(i)
                delete messages[i];
              }
            });

            // Submit ordinary data
            submit(server, {
              [data[0]]: 1
            }, Object.keys(messages), 0, 1);

            // Submit data for incompatible states
            let link = _.path.extensions + '/mail/message.cgi?folder=' + folder_index + '&mark=starred&state=' + action + '';
            starred.read.length &&
              $.post(link + `&d=${starred.read.join('&d=')}` + '');
            starred.unread.length &&
              $.post(link + '' + `&d=${starred.unread.join('&d=')}` + '');

          }
        },

      },

      /**
       * Register events
       *
       * @returns {void}
       */
      events = (data) => {

        // Import targets
        let button = {
            search: $$.element('controls.search.dropdown'),
            refresh: $$.element('controls.refresh.button'),
            delete: $$.element('controls.delete'),
            forward: $$.element('controls.forward'),
            special: {
              star: $$.selector('mail.special.star'),
              starred: $$.selector('mail.special.starred'),
              unstarred: $$.selector('mail.special.unstarred'),
            }
          },
          dropdown = {
            mark: {
              read: $$.element('controls.more.menu.read'),
              unread: $$.element('controls.more.menu.unread'),
              special: $$.element('controls.more.menu.special'),
              spam: $$.element('controls.more.menu.spam'),
              ham: $$.element('controls.more.menu.ham'),
              black: $$.element('controls.more.menu.black'),
              white: $$.element('controls.more.menu.white'),
            },
            select: $$.selector('controls.select.dropdown'),
            move: $$.element('controls.move.dropdown'),
            search: $$.element('controls.search.dropdown')
          },
          checkbox = $($$.$.controls.select.checkbox),
          checkboxes = $$.$.mail.checkbox,
          flags = $$.selector('mail.flag');

        /**
         * Event listeners for selecting all messages
         *
         * @returns {void}
         */
        checkbox.on('change', function() {
          let $this = $(this),
            state = $this.is(':checked');
          $(checkboxes).prop('checked', state).trigger('change');
        }).parent().parent().on('click', function(event) {
          let $input = $(this).find('input');
          !$(event.target).is($input) && $input.prop('checked', !$input.is(':checked')).trigger('change');
        })

        /**
         * Event listeners for selecting all messages
         *
         * @returns {void}
         */
        $(flags).on('click', function(event) {
          event.stopPropagation()
        })


        /**
         * Event listener for selecting specific type of multiple messages
         *
         * @returns {void}
         */
        $(dropdown.select).find($$.$.controls.select.menus).on('click', function(event) {
          let _$ = $(event.target).data('type'),
            $_ = $(checkboxes),
            $__ = 'change',
            __$ = 'checked';

          // Select all/none
          if (_$ === 5 || _$ === 4) {
            $_.prop(__$, (_$ & 1)).trigger($__);
          }
          // Select invert
          else if (_$ === 3) {
            $_.prop(__$, function() {
              return !this.checked
            }).trigger($__);
          }
          // Select read/unread
          else if (_$ === 2 || _$ === 1) {
            $_.prop(__$, function() {
              return +$(this).parents('tr').attr('data-unread') === (_$ & 1)
            }).trigger($__);
          }
          // Select starred (special)
          else if (_$ === 0) {
            $_.prop(__$, function() {
              return +$(this).parents('tr').attr('data-starred') === +!(_$ & 1)
            }).trigger($__);
          }
        })

        /**
         * Event listener for selecting single message
         *
         * Updates the storage data
         *
         * @returns {void}
         */
        $(checkboxes).on('change', function() {
          let $this = $(this),
            $row = $this.parents('td').parent('tr'),
            state = $this.is(':checked'),
            id = $this.val(),
            checked = (checkboxes + ':checked'),
            status = $row.attr('data-unread'),
            starred = $row.attr('data-starred');
          storage.set(id, state, status, starred, data);
          $(checked).length === $(checkboxes).length ? checkbox.prop('checked', 1) : checkbox.prop('checked', 0);
        });

        /**
         * Event listener for deleting message(s)
         *
         * @returns {void}
         */
        button.delete.on('click', function() {
          submit(data, {
            'delete': 1
          }, storage.get(), 1, 1)
        });

        /**
         * Event listener for moving/copying message(s)
         *
         * @returns {void}
         */
        let $dropdown_move_select = dropdown.move.find('select');
        $dropdown_move_select.find('option').map((i, o) => {
          o.value <= -1 && o.remove()
        })
        _.plugin.select($dropdown_move_select);
        $dropdown_move_select.on('change', function() {
          setTimeout(() => {
            $($$.$.controls.move.submit).toggleClass('disabled', !this.value).trigger('focus');
          });
        })
        dropdown.move.find('li').on('click', function(event) {
          event.stopPropagation();
          let $target = $(event.target),
            $submit = $($$.$.controls.move.submit),
            $copy = $($$.$.controls.move.checkbox),
            copy = $copy.is(':checked');

          if ($target.is($copy)) {
            $submit.text(copy ? _.language('theme_xhred_global_copy') : _.language('theme_xhred_global_move'));
          }

          if ($target.is('button:not(.disabled)')) {
            let action = copy,
              target = parseInt($dropdown_move_select.val());

            submit(data, {
              [(action ? 'copy' : 'move') + '1']: 1,
              mfolder1: target
            }, storage.get(), (+!action || ((data.searched_folder_index || data.folder_index) === target)), 1)

            dropdown.move.removeClass('open')
          }
        })
        dropdown.move.on('shown.bs.dropdown', function() {
          _.plugin.select([$dropdown_move_select, 'open']);
        })

        /**
         * Event listener for forwarding message(s)
         *
         * @returns {void}
         */
        button.forward.on('click', function() {
          // Produce notification (temporary)
          _.notification(['exclamation-triangle', 'Forward functionality is no yet implemented. Expect it in the future beta pre-release.'], 10, "info", 0, 1, ['top', 'right'])
        });

        /**
         * Event listener for search
         *
         * @returns {void}
         */
        let $dropdown_search_select = dropdown.search.find('select'),
          $dropdown_search_simple = dropdown.search.find('[data-search-mail]'),
          $dropdown_search_advanced_all = dropdown.search.find('[name="search-wordsin"]');

        // Set current folder first
        $dropdown_search_select[0].value = data.searched_folder_index || data.folder_index;

        // Initialize folders select
        _.plugin.select($dropdown_search_select);

        button.search.find('li').on('click keyup', function(event) {
          event.stopPropagation();
          let $target = $(event.target),
            $advanced_form = dropdown.search.find('[' + $$.$.controls.search.data.form.advanced + ']'),
            $submit = $($$.$.controls.search.submit),
            advanced_form_hidden = () => window.getComputedStyle($advanced_form[0]).display === 'none';

          // Close and return
          if (event.keyCode === 27) {
            button.search.trigger('click')
            return

          }
          // Show/hide advanced search options
          if (
            (event.keyCode === 32 ||
              event.keyCode === 9 ||
              event.keyCode === 13 ||
              event.type === 'click') &&
            $target.is($($$.selector('controls.search.caret.down')).add($$.selector('controls.search.button.type')))
          ) {
            let $caret = $target.is('i') ? $target : $target.find('i');
            $caret.toggleClass($$.$.controls.search.caret.up)
            $advanced_form.toggleClass('show');
            $dropdown_search_simple[0].disabled = !advanced_form_hidden();

            let focus_target = advanced_form_hidden() ? $dropdown_search_simple : $advanced_form[0].querySelector('input');
            focus_target.focus();

            if (advanced_form_hidden()) {
              $dropdown_search_simple.val($dropdown_search_advanced_all.val())
              $dropdown_search_advanced_all.val(String())
            } else {
              $dropdown_search_advanced_all.val($dropdown_search_simple.val())
              $dropdown_search_simple.val(String())
            }
            return
          }

          // Submit search query
          if (
            (event.type === 'keyup' && event.keyCode === 13 && $target.is('[type="text"], [type="number"]')) ||
            (event.type === 'click' && $target.is('button:not(.disabled)'))
          ) {
            let simple_query = {
              folder: parseInt($dropdown_search_select[0].value),
              search: $dropdown_search_simple[0].value
            };

            // Submit simple search query
            if (advanced_form_hidden()) {
              if (simple_query.search) {
                $.post(_.path.prefix + '/' + _.variable.module.name() + '/mail_search.cgi?returned_format=json&json-error=1&simple=1&' + _.plugin.json_to_query(simple_query), function(data) {
                  messages.get(data);
                });
              }
            }

            // Submit advanced search query
            else {
              let $elements_input = $advanced_form.find('input[type="text"]').filter((i, v) => v.value),
                $elements_radios_status = $advanced_form.find('input[name="status"]'),
                $elements_limit = $advanced_form.find('input[name^="limit"]'),
                $elements_attach = $advanced_form.find('input[name="attach"]'),
                query = {};

              // Default query params
              query.all = 1;
              query.dest_def = 1;
              query.folder = simple_query.folder;

              // Create query for all input fields
              for (let i = 0; i < $elements_input.length; i++) {
                let value = $elements_input[i].value,
                  special = $elements_input[i].name.includes('words'),
                  name = $elements_input[i].name.replace('search-', String());
                if (value) {
                  query['what_' + i] = value;
                  if (special) {
                    query['field_' + i] = 'all';
                    query['neg_' + i] = ~~$elements_input[i].name.includes('out');
                  } else {
                    query['field_' + i] = name;
                    query['neg_' + i] = 0;
                  }
                }
              }

              // Create query with status radios
              query.status_def = 0;
              for (let i = 0; i < $elements_radios_status.length; i++) {
                let $this = $elements_radios_status[i],
                  value = $this.value,
                  def = value == -1 ? 1 : 0;
                if ($this.checked) {
                  query.status_def = def;
                  if (!def) {
                    query.status = value;
                  }
                }
              }

              // Create query with limit radios
              for (let i = 0; i < $elements_limit.length; i++) {
                let $this = $elements_limit[i],
                  name = $this.name;
                if ($this.checked && $this.name === 'limit_def' || $this.name !== 'limit_def') {
                  query[name] = $this.value
                }
              }

              // Create query with attachment status
              query.attach = ~~$elements_attach[0].checked;

              // Run the query
              $.post(_.path.prefix + '/' + _.variable.module.name() + '/mail_search.cgi?returned_format=json&json-error=1&' + _.plugin.json_to_query(query), function(data) {
                messages.get(data);
              });
            }
          }
        });

        dropdown.search.on('shown.bs.dropdown', function() {
          $dropdown_search_simple.trigger('focus');
        })

        /**
         * Event listener for refreshing messages list
         *
         * @returns {void}
         */
        button.refresh.on('click', function() {
          $(this).addClass($$.$.controls.refresh.animation);
          $$.element('tree.active').click()
        })

        /**
         * Event listener for marking message starred/unstarred (toggle special state)
         *
         * @returns {void}
         */
        $(button.special.star).on('click', function(event) {
          event.stopImmediatePropagation();
          let $this = $(this),
            $row = $(event.target).parents('td').parent('tr'),
            target = $$.$.mail.special,
            id = $row.find('input[value]').val(),
            state = $(event.target).is($(button.special.starred)) ? 1 : 0,
            unread = +$row.attr('data-unread'),
            text = _.language('theme_xhred_global_' + (state ? 'unstarred' : 'starred') + '');

          $row.attr('data-starred', +!state);

          // Submit changes and toggle state
          submit(data, {
            ['markas' + (state ? 1 : 2) + '']: 1
          }, [id])
          $this
            .removeClass(target[(state ? 'starred' : 'unstarred')])
            .addClass(target[(state ? 'unstarred' : 'starred')])
            .attr('data-original-title', text)
            .next().remove();

          // Write message status (redundant)
          status.write([(+!unread).toString(), data], [id]);
        });

        /**
         * Event listener for marking message(s) read/unread
         *
         * @returns {void}
         */
        dropdown.mark.read
          .add(dropdown.mark.unread)
          .on('click', function() {
            let action = $(this).data('form-action'),
              messages = storage.get();

            // Write message status (redundant)
            status.write([action, data]);

            // Change messages UI state
            status.set(action, messages);
          });

        /**
         * Event listener for reporting spam/ham and whitelisting/blacklisting message(s)
         *
         * @returns {void}
         */
        dropdown.mark.spam
          .add(dropdown.mark.ham)
          .add(dropdown.mark.black)
          .add(dropdown.mark.white)
          .on('click', function() {
            let action = $(this).data('form-action'),
              messages = storage.get(),
              refetch = /white|black/.test(action)

            submit(data, {
              [action]: 1
            }, messages, +refetch, 1);
          })

        /**
         * Event listener for running search
         *
         * @returns {void}
         */
        $($$.$.controls.search.link).on('click', function() {
          let link = this.getAttribute('data-href');
          fetch(link)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              messages.get(data)
            });
        })

        /**
         * Event listener for composing new message
         *
         * @returns {void}
         */
        $($$.$.controls.compose.button).off('click');
        $($$.$.controls.compose.button).on('click', function() {
          _.content(_.variable.module.link() + '/reply_mail.cgi?new=1&folder=0');
        })
      },

      /**
       * Submits changes to the server
       *
       * @param {string} data      Response object with data for current page
       * @param {object} actions   Action(s) to be submitted
       * @param {object} messages  Array of message ids to process
       * @param {int}    [refetch] Refetch current folder's content from the server
       * @param {int}    [reset]   Reset message selection
       *
       * @returns {void}
       */
      submit = (data, actions, messages, refetch = 0, reset = 0) => {
        let form = data.form_list,
          target = _.variable.module.link() + `/${form.target}?`,
          hidden = form.hidden,
          searched_index = data.searched_folder_index;

        hidden = _.plugin.json_to_query(hidden) + '&noredirect=1&';
        if (searched_index) {
          hidden = hidden.replace(/folder=\d+/, `folder=${searched_index}`)
        }

        actions = _.plugin.json_to_query(actions);
        messages = `&d=${messages.join('&d=')}`;
        refetch && (loader.start(), _.notification('hide-all'));
        $.post(target + hidden + actions + messages, function() {
          if (reset) {
            storage.reset();
          }
          if (refetch) {
            $.post(_.path.extensions + '/mail/messages.cgi?' + hidden + 'show_body_len=' + preview_length() + '', function(data) {
              render(data);
              loader.end();
            });
          }
        });
      },

      /**
       * Render messages and controls
       *
       * @param {object} source Response object with data for current page
       *
       * @returns {void}
       */
      render = (source) => {
        let container = $$.element('layout.container'),
          data = source[0],
          controls = {
            select: data.form_list.buttons.select,
            submit: data.form_list.buttons.submit
          },
          pagination = {
            link: (data.pagination_arrow_last || data.pagination_arrow_first || String()),
            title: (data.pagination_arrow_last ? _.language('theme_xhred_mail_pagination_last') : (data.pagination_arrow_first ? _.language('theme_xhred_mail_pagination_first') : false))
          },
          messages_list = (data.list.messages ? data.list.messages.replace(/�/g, '') : String());

        // Check for errors first
        if (data.error) {
          let errors = data.error.error;
          for (let i = 0; i < errors.length; i++) {
            _.notification(['exclamation-circle', errors[i]], 20, "error", i, 1, ['top', 'center']);
          }
          return
        }

        let messages_list_available = messages_list.length > 128 ? 1 : 0;
        if (!messages_list_available && data.searched) {
          _.notification(['search', _.language('theme_xhred_mail_search_empty')], 5, "info", 0, 0, ['top', 'right'])
          return
        }

        // Empty current panel and define target
        container.empty().append($$.create.$('layout.panel'));
        let panel = container.find($$.selector('layout.panel'));

        // Inject data to the panel
        if (messages_list_available) {
          panel
            .append($$.create.$('layout.row.controls'))
            .find($$.selector('layout.row.controls'))
            .append($$.create.$('layout.column.6'), $$.create.$('layout.column.6'))
            .find($$.selector('layout.column.6')).first()
            .append($$.create.dropdown('controls.select.dropdown', [
              [
                controls.select.all,
                controls.select.none,
                controls.select.invert,
                controls.select.read,
                controls.select.unread,
                controls.select.special
              ], 3
            ], $$.create.checkbox({
              select: 1
            }), String(), _.language('theme_xhred_global_select')));

          let $form_controls = $($$.create.$('layout.controls', {
            'form-controls': 1
          }, 'div'));
          Object.entries(controls.submit).map(([type, data]) => {
            for (let [i, v] of data.entries()) {
              if (type === 'buttons') {
                $form_controls.append($$.create.$('controls.' + v[0], {
                  'form-control': v[0]
                }, 'span', String(), _.language('theme_xhred_global_' + v[0] + '')));

              } else if (type === 'dropdowns') {
                for (let [di, dd] of v.entries()) {
                  let entries = [];
                  for (let [index, data] of v[1].entries()) {
                    data[0] && entries.push($$.create.$(0, {
                      'form-action': data[0]
                    }, 'span', data[1]));
                  }
                  if (typeof dd === "string") {
                    $form_controls.append(
                      $$.create.dropdown('controls.' + dd + '.dropdown', [
                        entries, 2
                      ], 0, dd, _.language('theme_xhred_mail_' + dd + '') || _.language('theme_xhred_global_' + dd + ''))

                    )
                  }
                }
              }
            }
          });

          panel
            .find($$.selector('layout.column.6')).first()
            .append(
              $form_controls,
              $$.create.dropdown('controls.sort.dropdown', [
                [
                  data.list.sort.date,
                  data.list.sort.from,
                  data.list.sort.size,
                  data.list.sort.subject,
                  data.list.sort.spam,
                ], 5
              ], data.list.sorted, 'sort', _.language('theme_xhred_global_sort')),
              $$.create.dropdown('controls.search.dropdown', [
                [
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.type]: 'simple'
                    }, 'span',
                    (
                      $$.create.input('search', _.language('theme_xhred_mail_search_search_mail'), String(), 'text', {
                        'search-mail': 1
                      }) +
                      $$.create.button('layout.button.transparent', {
                        'toggle-type': 1
                      }, String(), 'controls.search.caret.down')
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', {}, 'span', $$.create.label('search-from', _.language('theme_xhred_mail_search_from'))) +
                      $$.create.$('layout.column.9', {}, 'span', $$.create.input('search-from'))
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-to', _.language('theme_xhred_mail_search_to'))) +
                      $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-to'))
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-subject', _.language('theme_xhred_mail_search_subject'))) +
                      $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-subject'))
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsin', _.language('theme_xhred_mail_search_has_words'))) +
                      $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-wordsin'))
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsout', _.language('theme_xhred_mail_search_doesnt_have_words'))) +
                      $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-wordsout'))
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-status', _.language('theme_xhred_mail_search_with_status'))) +
                      $$.create.$('layout.column.9', 0, 'span',
                        $$.create.radio(0, 'status', -1, _.language('theme_xhred_mail_search_with_status_any'), 'status_def', 'checked') +
                        $$.create.radio(0, 'status', 0, _.language('theme_xhred_mail_search_with_status_unread'), 'status0') +
                        $$.create.radio(0, 'status', 1, _.language('theme_xhred_mail_search_with_status_read'), 'status1') +
                        $$.create.radio(0, 'status', 2, _.language('theme_xhred_mail_search_with_status_special'), 'status2')
                      )
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1,
                      [$$.$.controls.search.data.form.type]: 'search-in'
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-folder', _.language('theme_xhred_mail_search_search_in'))) +
                      $$.create.$('layout.column.9', 0, 'span', data.form_list.buttons.submit.dropdowns[0][1][0][1])
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1,
                      [$$.$.controls.search.data.form.type]: 'limit'
                    }, 'span',
                    (
                      $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsout', _.language('theme_xhred_mail_search_limit_results'))) +
                      $$.create.$('layout.column.9', 0, 'span',
                        $$.create.radio(0, 'limit_def', 1, _.language('theme_xhred_global_no'), 'limit_def0', 'checked') +
                        $$.create.radio(0, 'limit_def', 0, _.language('theme_xhred_mail_search_limit_results_yes') + ' ' + $$.create.input(
                          'limit', '', 20, 'number', ['step="20"', 'min="10"']) + ' latest messages', 'limit_def1')
                      )
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1,
                      [$$.$.controls.search.data.form.type]: 'attach'
                    }, 'span',
                    (
                      $$.create.checkbox(0, 'attach', 1, _.language('theme_xhred_mail_search_has_attach'), 'attach')
                    )
                  ),
                  $$.create.$(0, {
                      [$$.$.controls.search.data.form.action]: 'search',
                      [$$.$.controls.search.data.form.advanced]: 1,
                      [$$.$.controls.search.data.form.type]: 'submit'
                    }, 'span',
                    (
                      $$.create.button('layout.button.primary', false, _.language('theme_xhred_global_search'), 'controls.search.icon')
                    )
                  )
                ], 5
              ], (data.searched_message ?
                $$.create.$(
                  'controls.search.clear.link', ['href="index.cgi?folder=' + data.searched_folder_index + '"'],
                  'a',
                  ($$.create.icon('controls.search.clear.icon') + ' ' + data.searched_message.toLowerCase()),
                  _.language('theme_xhred_mail_search_clear')) : String()
              ), 'search', _.language('theme_xhred_global_search')),
              $$.create.$('controls.counter', 0, 'span')
            )
            .end().last()
            .append(
              $$.create.$('controls.refresh.button', {
                'refresh': 1
              }, 'span', String(), _.language('theme_xhred_global_refresh')),
              $$.create.$('controls.pagination', (pagination.link ? ['href="' + pagination.link + '"', 'data-href="' + pagination.link + '"'] : false), 'a', data.pagination_message, pagination.title),
              data.pagination_arrow_left,
              data.pagination_arrow_right
            )

          panel
            .append($$.create.$('layout.row.messages')).find($$.selector('layout.row.messages'))
            .append($$.create.$('layout.column.12')).find($$.selector('layout.column.12'))
            .append(messages_list)

          if (data.quota) {
            panel
              .append($$.create.$('layout.row.quota')).find($$.selector('layout.row.quota')).last()
              .append($$.create.$('layout.column.12')).find($$.selector('layout.column.12'))
              .append(data.quota)
          }

          _.plugin.timestamp();
          _.plugin.tooltip();
          _.plugin.offset_adjust(true);
          _.rows();
          folders.set(data.searched_folder_id || data.folder_id);
          events(data);
          messages.storage.restore();

        } else {
          panel.append('No Mail')
        }
      }

    // Reveal sub-modules ;;
    return {
      get: get,
      storage: storage,
    }
  })()

  /**
   * Folders sub-module ;;
   *
   * @since 19.17
   *
   * @return {object}              Reveals folders module API
   * @return {type} folders.get    Retrieve mail folders
   * @return {type} folders.set    Mark folder as active
   * @return {type} folders.adjust Adjust active folder into view
   */
  const folders = (function() {
    let

      // Define module static properties
      data = {
        file: {
          fancytree: 'jquery.fancytree'
        },
        selector: {
          navigation: 'aside .navigation'
        },
        options: {
          tree: {
            escapeTitles: false,
            autoActivate: false,
            autoScroll: true,
            keyboard: false,
            toggleEffect: false,
          },
          scroll: {
            axis: 'xy',
            theme: 'minimal',
            keyboard: false,
            scrollInertia: 300,
            scrollButtons: true,
            autoHideScrollbar: false,
          }
        },
        plugin: {
          tree: (source) => {
            source = (source === 'get' ? 'getTree' :
              (source === 'node' ? 'getActiveNode' :
                Object.assign(data.options.tree, {
                  source: source,
                  click: (e, d) => {
                    if (d.targetType === 'title') {
                      setTimeout(() => {
                        tree.adjust();
                      }, 1e2);
                      _.content(data.url.link + encodeURIComponent(d.node.key));
                      messages.storage.reset();
                      _.navigation.reset();
                    }
                  }
                })));
            if ($(tree.container).length) {
              return $(tree.container).fancytree(source);
            }
          }
        },
        url: {
          link: _.path.origin + _.path.prefix + '/mailbox/index.cgi?id=',
        }
      };

    /**
     * Tree sub-module ;;
     *
     * @return {string|function}
     */
    let tree = {
      fetched: 0,
      container: '[' + $$.$.tree.container + ']',
      container_adjust: function() {
        let container = $(this.container + ' >:first'),
          content = $(this.container + ' >>:first');
        if (container.height() > content.height()) {
          container.css('height', content.height())
        }
      },
      init: function(source) {

        // Load dependencies
        if (this.fetched === 0) {
          this.load();
          return;
        }

        // Insert tree container and compose button
        if ($(data.selector.navigation + ' ' + this.container).length === 0) {
          $(data.selector.navigation).prepend('<li><div ' + $$.$.tree.container + '></div></li>');
          $(data.selector.navigation).prepend('<li>' + $$.create.$('layout.button.block', {
            'compose': 1
          }, 'span', $$.create.icon('controls.compose.icon') + " " + _.language('theme_xhred_mail_new_message')) + '</li>');
        } else {
          return;
        }

        // Instantiate tree
        data.plugin.tree(source)

        // Make the container scrollable
        _.plugin.scroll(this.container, data.options.scroll)

        // Adjust container height
        this.container_adjust();
      },
      expand: function(node) {
        let expanded = node.isExpanded();
        !expanded && node.toggleExpanded();
      },
      load: function() {
        this.fetched = 1;
        _.load.bundle(_.path.js + '/' + data.file.fancytree,
          _.path.css + '/' + data.file.fancytree,
          (_.variable.switch() ? [get] : 0), 1
        );
      },
      reload: function(source) {
        let tree = data.plugin.tree('get');
        tree.$container.empty();
        tree.reload(source);
        setTimeout(() => {
          this.adjust();
        }, 1e2);
      },
      node: function() {
        return data.plugin.tree('node');
      },
      adjust: function() {
        let $_ = this.node();
        if ($_ && $_.li && $($_.li).length) {
          _.plugin.scroll([this.container, $($_.li)]);
        }
        this.container_adjust();
      }
    }

    /**
     * Retrieves mail folders
     *
     * @param {string} [key] Folder name to be set as active
     *
     * @return {void}
     */
    const get = (key) => {
      key = key ? ('?key=' + key.replace(/&/g, '%26')) : String();
      $.post(_.path.extensions + '/mail/folders.cgi' + key + '', function(source) {
        if (!!key) {
          tree.reload(source)
        } else {
          tree.init(source)
        }
      });
    }

    /**
     * Mark mail folder as active
     *
     * @param {string} key Folder name to set as active
     *
     * @return {void}
     */
    const set = function(key) {
      let tree = data.plugin.tree('get');
      if (typeof tree === 'object' && typeof tree.activateKey === 'function') {
        tree.activateKey(key)
      } else {
        setTimeout(() => {
          this.set(key);
        }, 1e2);
      }
    }

    /**
     * Adjust folders into view
     *
     * @return {void}
     */
    const adjust = () => {
      tree.adjust();
    }

    // Reveal sub-modules ;;
    return {
      get: get,
      set: set,
      adjust: adjust
    }
  })()

  // Reveal modules (API) ;;
  return {
    folders: {
      get: folders.get,
      set: folders.set,
      adjust: folders.adjust
    },
    messages: {
      get: messages.get,
      sort: messages.sort
    }
  }
})();
