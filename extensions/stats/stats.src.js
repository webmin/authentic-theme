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
        /* jshint -W117 */
        extend: {
            prefix: v___location_prefix,
            error: connection_error,
            prevent: theme_updating,
            language: theme_language,
            chart: Chartist,
            moment: moment,
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

                // Disable stats upon theme update
                if (this.extend.prevent()) {
                    return
                }

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

                // Draw history graphs
                if (target === 'cached') {
                    let ls = 'live_stats',
                        lb = 'data-chart',
                        ll = 'data-loader',
                        cl = 'collapse',
                        lds = `${ls}-${cl}`,
                        ldv = $(`#${lds}`).hasClass('in'),
                        ld = $(`#${lds}`).find(`[${ll}]`);

                    // Process each supplied graph
                    Object.entries(data).map(([type, array]) => {
                        let options = {
                                chart: {
                                    type: () => {
                                        return (type === 'proc' || type === 'dio');
                                    },
                                    fill: function() { return this.type() ? false : true },
                                    high: function() { return this.type() ? undefined : 100 },
                                    threshold: function() { return this.type() ? -1 : 50 },
                                    height: '100px',
                                }
                            },
                            lg = this.extend.language(`${ls}_${type}`),
                            tg = $(`#${lds}`).find(`[${lb}=${type}]`),
                            sr = [{
                                name: `series-${type}`,
                                data: array
                            }];

                        // Don't run further in case there is no container or panel is closed
                        if (!tg.length || !ldv) {
                            return
                        }

                        // Extend data object expected way to draw multiple series in single graph
                        if (array[0] && typeof array[0].y === 'object') {
                            sr = [];
                            array[0].y.forEach(function(element, index) {
                                let data = [];
                                array.forEach(function(element2) {
                                    data.push({
                                        data: { x: element2.x, y: element2.y[index] }
                                    })
                                });
                                sr.push({
                                    name: `series-${type}-${index}`,
                                    data: data
                                })
                            });
                        }

                        // Update series if chart already exist
                        if (tg.textContent && tg.textContent.length) {
                            this[`chart_${type}`].update({
                                series: sr
                            });
                            return
                        }
                        // Initialize chart the first time
                        else {
                            this[`chart_${type}`] = new this.extend.chart.Line(tg[0], {
                                series: sr,
                            }, {
                                axisX: {
                                    type: this.extend.chart.FixedScaleAxis,
                                    divisor: 12,
                                    labelInterpolationFnc: (value) => {
                                        return this.extend.moment(value * 1000).format('LTS');
                                    }
                                },
                                height: options.chart.height,
                                showArea: options.chart.fill(),
                                showPoint: !options.chart.fill(),
                                high: options.chart.high(),
                                low: 0,
                                fullWidth: true,
                                chartPadding: {
                                    left: 25
                                },
                                axisY: {
                                    onlyInteger: true,
                                    labelInterpolationFnc: function(value) {
                                        if (options.chart.fill()) {
                                            return (value ? (value + '%') : value);
                                        } else {
                                            return value
                                        }
                                    },
                                },
                                plugins: [
                                    this.extend.chart.plugins.ctAxisTitle({
                                        axisY: {
                                            axisTitle: lg,
                                            axisClass: "ct-axis-title",
                                            offset: {
                                                x: 0,
                                                y: 12
                                            },
                                            flipTitle: true
                                        }
                                    }),
                                    this.extend.chart.plugins.ctThreshold({
                                        threshold: options.chart.threshold(),
                                    }),
                                ]
                            });
                        }

                        // Remove loader when chart is created
                        this[`chart_${type}`].on('created', function() {
                            ld.addClass('hidden')
                        });
                    })
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