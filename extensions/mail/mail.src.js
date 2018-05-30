/*!
 * Authentic Theme (https://github.com/authentic-theme/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
 */

/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint jquery: true */

'use strict';

// Mail module
const mail = (function() {
  let

    // Import globals
    extend = {
      path: {
        origin: v___location_origin,
        prefix: v___location_prefix,
        extensions: v___server_extensions_path,
        css: v___server_css_path,
        js: v___server_js_path
      },
      variable: {
        mail_switch: () => {
          return $t_uri_webmail
        }
      },
      content: get_pjax_content,
      load: load,
      plugin: {
        scroll: (target, options) => {
          if (typeof target === 'string') {
            $(target).mCustomScrollbar(options)
          } else {
            $(target[0]).mCustomScrollbar('scrollTo', target[1], {
              scrollOffset: [$(target[0]), 3, 4]
            })
          }
        }
      }
    };

  // Folders sub-module ;;
  const folders = (function() {
    let

      // Define module static properties
      data = {
        file: {
          fancytree: 'jquery.fancytree'
        },
        selector: {
          navigation: 'aside .navigation',
          folders: 'data-mail-folders'
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
                  activate: (e, d) => {
                    tree.adjust();
                    tree.expand(d.node);
                    extend.content(data.url.link + encodeURIComponent(d.node.key));
                  }
                })));
            return $(tree.container).fancytree(source)
          }
        },
        url: {
          link: extend.path.origin + extend.path.prefix + '/mailbox/index.cgi?id=',
        }
      };

    // Tree object literal
    let tree = {
      fetched: 0,
      container: '[' + data.selector.folders + ']',
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

        // Insert tree container
        if ($(data.selector.navigation + ' ' + this.container).length === 0) {
          $(data.selector.navigation).prepend('<div ' + data.selector.folders + '></div>');
        } else {
          return;
        }

        // Instantiate tree
        data.plugin.tree(source)

        // Make the container scrollable
        extend.plugin.scroll(this.container, data.options.scroll)

        // Adjust container height
        this.container_adjust();
      },
      expand: function(node) {
        let expanded = node.isExpanded();
        !expanded && node.toggleExpanded();
      },
      load: function() {
        this.fetched = 1;
        extend.load.bundle(extend.path.js + '/' + data.file.fancytree,
          extend.path.css + '/' + data.file.fancytree,
          (extend.variable.mail_switch() ? [get] : 0), 1
        );
      },
      reload: function(source) {
        let tree = data.plugin.tree('get');
        tree.$container.empty();
        tree.reload(source);
        setTimeout(() => {
          this.adjust();
          this.expand(this.node());
        }, 1e2);
      },
      node: function() {
        return data.plugin.tree('node');
      },
      adjust: function() {
        let $_ = this.node();
        if ($_ && $_.li && $($_.li).length) {
          extend.plugin.scroll([this.container, $($_.li)]);
        }
        this.container_adjust();
      }
    }

    // Get folders data
    function get(key) {
      key = key ? ('?key=' + key.replace(/&/g, '%26')) : String();
      $.post(extend.path.extensions + '/mail/folders.cgi' + key + '', function(source) {
        if (!!key) {
          tree.reload(source)
        } else {
          tree.init(source)
        }
      });
    }

    // Adjust folders into view
    function adjust() {
      tree.adjust();
    }

    // Reveal sub-modules ;;
    return {
      get: get,
      adjust: adjust
    }
  })()

  // Reveal modules (API) ;;
  return {
    folders: {
      get: folders.get,
      adjust: folders.adjust
    }
  }
})();
