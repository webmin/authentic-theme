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
    _g = {
      load: load,
      load_content: get_pjax_content,
      link: v___location_prefix + '/mailbox/index.cgi?id=',
      path: {
        extensions: v___server_extensions_path,
        css: v___server_css_path,
        js: v___server_js_path
      },
      lang: {
        noRecords: theme_language('theme_xhred_datatable_szerorecords')
      }
    };

  // Folders sub-module ;;
  const folders = (function() {
    let

      // Define strings
      strings = {
        files: {
          fancytree: 'jquery.fancytree'
        },
        selectors: {
          navigation: 'aside .navigation',
          folders: 'data-mail-folders'
        },
      };

    // Load dependencies
    (() => {
      _g.load.bundle(_g.path.js + "/" + strings.files.fancytree, _g.path.css + "/" + strings.files.fancytree, [get], 1);
    })();

    // Get folders data
    function get(key) {
      key = key ? ('?key=' + key) : String();

      $.post(_g.path.extensions + "/mail/folders.cgi" + key + "", function(data) {
        if (!!key) {
          tree.reload(data)
        } else {
          tree.init(data)
        }
      });
    }

    // Adjust folders into view
    function adjust() {
      tree.adjust();
    }

    // Tree object literal
    let tree = {
      container: '[' + strings.selectors.folders + ']',
      init: function(data) {

        // Insert tree container
        $(strings.selectors.navigation).prepend('<div ' + strings.selectors.folders + '></div>');

        // Instantiate tree
        $(this.container).fancytree({
          source: data,
          escapeTitles: false,
          autoActivate: false,
          autoScroll: true,
          keyboard: false,
          toggleEffect: false,
          init: (e, d) => {},
          activate: (e, d) => {
            this.adjust();
            this.expand(d.node);
            _g.load_content(_g.link + d.node.key);
          }
        });

        // Make the container scrollable
        $(this.container).mCustomScrollbar({
          axis: "xy",
          theme: "minimal",
          keyboard: false,
          scrollInertia: 300,
          scrollButtons: true,
          autoHideScrollbar: false,
        });
      },
      expand: function(node) {
        let expanded = node.isExpanded();
        !expanded && node.toggleExpanded();
      },
      reload: function(data) {
        $(this.container).fancytree("getTree").reload(data);
        setTimeout(() => {
          this.adjust();
          this.expand(this.get_active_node());
        }, 1e2);
      },
      adjust: function() {
        let $_ = this.get_active_node();
        if ($_ && $_.li && $($_.li).length) {
          $(this.container).mCustomScrollbar("scrollTo", $($_.li), {
            // scrollInertia: 100,
            scrollOffset: [$(this.container), 3, 4]
          })
        }
      },
      get_active_node: function() {
        return $(this.container).fancytree("getActiveNode");
      }
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
