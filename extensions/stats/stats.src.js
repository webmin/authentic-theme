/*!
 * Authentic Theme (https://github.com/qooob/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
 * Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
 */

/* jshint esversion: 6 */
/* jshint jquery: true */

// Register statistics object
const stats = {
  general: {
    timeout: 500,
    stopped: 1,
    call: {},

    // Get data
    query: function() {

      // Repeat right after success
      this.stopped && (() => {
        this.stopped = 0;
        this.call = {};

        this.call = $.ajax({
          context: this,
          url: v___server_extensions_path + "/stats/stats.cgi?xhr-stats=general",
          success: function(data) {

            // Take half a second delay, render and restart
            setTimeout(() => {
              this.render(data);
            }, this.timeout);

            this.stopped = 1;
          },
          dataType: "json",
        })
      })();
    },

    // Display changes
    render: function(data) {

      // Iterate through response
      Object.entries(data).map(([target, data]) => {
        let v = parseInt(data),
          $pc = $('#system-status .piechart[data-charts*="' + target + '"]'),
          $lc = $('.info-container .' + target + '_percent');

        if (Number.isInteger(v)) {

          // Update pie-charts
          if ($pc.length) {
            $pc.data('easyPieChart').update(v);
          }

          // Update line-charts
          if ($lc.length) {
            $lc.find('.bar').attr('style', 'width:' + v + '%');

            // Update line-charts' text
            let $dp = $lc.find('.description'),
              $tx = $dp.text().split(/\s+/),
              $ts;

            $.each($tx, function(id, vd) {
              if (vd.includes(':')) {
                $tx[id + 1] = (v + '%');
                $ts = id;
              }
            })
            $dp.text($tx.join(' ')).attr('title', $tx.splice($ts + 2, Infinity).join(' ').slice(1, -1));
          }
        }
      })
      this.query();
    },

    // Stop querying
    kill: function() {
      let abort = this.call.abort;

      typeof abort === "function" && (abort.call(), this.stopped = 0);

      setTimeout(() => {
        this.stopped = 1, this.call = {};
      }, this.timeout + 2);
    }
  }
}
