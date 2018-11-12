/*!
 * Authentic Theme (https://github.com/authentic-theme/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.io>
 * Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
 */

/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint jquery: true */

'use strict';

// Stats module
const stats = {
  general: {
    timeout: 1000,
    stopped: 1,
    error: 0,
    requery: 0,
    call: {},

    // Import globals
    extend: {
      prefix: v___location_prefix,
      error: connection_error,
      state: () => {
        return v___theme_state_visible
      },
      enabled: () => {
        return settings_sysinfo_real_time_status
      },
      timeout: () => {
        return settings_sysinfo_real_time_timeout
      },
    },

    // Get data
    query: function() {

      // Repeat right after success
      this.stopped && (() => {
        this.stopped = 0;
        this.call = {};

        this.call = $.ajax({
          context: this,
          url: this.extend.prefix + "/stats.cgi?xhr-stats=general",
          error: function(xhr) {

            // Set error counter
            this.error++;

            // Show error
            if (this.error > 3) {
              this.extend.error(xhr, 1), this.stopped = 1, this.error = 0, this.requery = 0;
              return;
            }

            // Retry again
            !this.requery && (this.requery = setTimeout(() => {
              this.stopped = 1, this.requery = 0, this.query();
            }, 3000));
          },
          success: function(data) {

            // Reset error counter
            this.error = 0;

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
      this.extend.state() && this.query();
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
      if (this.extend.enabled()) {
        this.timeout = this.extend.timeout(), this.stopped = 1, this.query();
      }
    }
  }
}
