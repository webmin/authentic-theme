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
    timeout: 1000,
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
          url: v___location_prefix + "/stats.cgi?xhr-stats=general",
          error: function() {
            v___theme_stats_error = 1;
          },
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
          vo = (typeof data === 'object' ? data[(data.length - 1)] : false),
          vt = (vo ? vo : v),
          $pc = $('#system-status .piechart[data-charts*="' + target + '"]'),
          $lc = $('.info-container .' + target + '_percent'),
          $od = $('#system-status span[data-id="sysinfo_' + target + '"], .info-container span[data-data="' + target + '"]');

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
              $lb = $dp.text().split(":")[0];

            $dp.attr('title', vo).text($lb + ": " + v + '% (' + vo + ')');
          }

          // Update other data
          if ($od.length) {
            if ($od.find('a').length) {
              $od.find('a').text(vt);
            } else {
              $od.text(vt);
            }
          }
        }
      })
      v___theme_state_visible && this.query();
    },

    // Stop querying
    kill: function() {
      let abort = this.call.abort;

      typeof abort === "function" && (abort.call(), this.stopped = 0);

      setTimeout(() => {
        this.stopped = 1, this.call = {};
      }, this.timeout + 2);
    },

    // Check to enable stats after stop
    enable: function() {
      if (settings_sysinfo_real_time_status) {
          this.timeout = settings_sysinfo_real_time_timeout;
          this.stopped = 1;
          this.query();
      }
    }
  }
}
