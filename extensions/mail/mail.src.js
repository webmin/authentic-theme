/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */

/* jshint esversion: 6 */
/* jshint jquery: true */

// Mail module
const mail = (function() {
  let

    // Import globals
    extend = {
      path: {
        extensions: v___server_extensions_path,
        css: v___server_css_path,
        js: v___server_js_path
      },
      var: {
        mail: () => {
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
            axis: "xy",
            theme: "minimal",
            keyboard: false,
            scrollInertia: 300,
            scrollButtons: true,
            autoHideScrollbar: false,
          }
        },
        url: {
          link: v___location_origin + v___location_prefix + '/mailbox/index.cgi?id=',
        }
      };

    // Tree object literal
    let tree = {
      container: '[' + data.selector.folders + ']',
      init: function(source) {

        // Load dependencies
        if (typeof $.ui !== 'object') {
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
        $(this.container).fancytree(Object.assign(data.options.tree, {
          source: source,
          activate: (e, d) => {
            this.adjust();
            this.expand(d.node);
            extend.content(data.url.link + encodeURIComponent(d.node.key));
          }
        }));

        // Make the container scrollable
        extend.plugin.scroll(this.container, data.options.scroll)
      },
      expand: function(node) {
        let expanded = node.isExpanded();
        !expanded && node.toggleExpanded();
      },
      load: function() {
        extend.load.bundle(extend.path.js + "/" + data.file.fancytree,
          extend.path.css + "/" + data.file.fancytree,
          (extend.var.mail() ? [get] : 0), 1
        );
      },
      reload: function(source) {
        let tree = $(this.container).fancytree("getTree");
        tree.$container.empty();
        tree.reload(source);
        setTimeout(() => {
          this.adjust();
          this.expand(this.get_active_node());
        }, 1e2);
      },
      adjust: function() {
        let $_ = this.get_active_node();
        if ($_ && $_.li && $($_.li).length) {
          extend.plugin.scroll([this.container, $($_.li)]);
        }
      },
      get_active_node: function() {
        return $(this.container).fancytree("getActiveNode")
      }
    }

    // Get folders data
    function get(key) {
      key = key ? ('?key=' + key.replace(/&/g, '%26')) : String();
      $.post(extend.path.extensions + "/mail/folders.cgi" + key + "", function(source) {
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
