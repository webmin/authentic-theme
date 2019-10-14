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
        killed: 0,
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
            locale: {
                time: config_portable_theme_locale_format_time,
            },
            state: () => {
                return settings_sysinfo_real_time_stored || v___theme_state_visible
            },
            stored_length: () => {
                return settings_sysinfo_real_time_stored_length
            },
            enabled: () => {
                return settings_sysinfo_real_time_status
            },
            timeout: () => {
                return settings_sysinfo_real_time_timeout
            },
        },

        // Define selectors
        selector: {
            chart: {
                container: {
                    parent: 'live_stats',
                    data: 'data-chart',
                },
                loader: 'data-charts-loader'

            },
            collapse: 'collapse',
            dashboard: 'system-status',
            slider: 'info-container',
            piechart: 'piechart'
        },

        // Get data
        query: function() {

            // Repeat right after success
            (this.stopped && !this.killed) && (() => {
                this.stopped = 0;
                this.call = {};

                // Disable stats upon theme update
                if (this.extend.prevent()) {
                    return
                }

                // Live charts already loaded
                let extra = String();
                if (document.querySelector(`[${this.selector.chart.loader}]`)) {
                    extra = '&sdata=1';
                }

                this.call = $.ajax({
                    context: this,
                    url: `${this.extend.prefix}/stats.cgi?xhr-stats=general${extra}`,
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
                    $pc = $(`#${this.selector.dashboard} .${this.selector.piechart}[data-charts*="${target}"]`),
                    $lc = $(`.${this.selector.slider} .${target}_percent`),
                    $od = $(`#${this.selector.dashboard} span[data-id="sysinfo_${target}"], 
                             .${this.selector.slider} span[data-data="${target}"]`),
                    cached = (target === 'fcached' ? 2 : (target === 'scached' ? 1 : 0));

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
                if (cached) {
                    let lds = `${this.selector.chart.container.parent}-${this.selector.collapse}`,
                        ldv = $(`#${lds}`).hasClass('in'),
                        ld = $(`#${lds}`).find(`[${this.selector.chart.loader}]`);

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
                            lg = this.extend.language(`${this.selector.chart.container.parent}_${type}`),
                            tg = $(`#${lds}`).find(`[${this.selector.chart.container.data}=${type}]`),
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
                            array[0].y.forEach(function(x, i) {
                                let data = [];
                                array.forEach(function(n) {
                                    data.push({
                                        data: { x: n.x, y: n.y[i] }
                                    })
                                });
                                sr.push({
                                    name: `series-${type}-${i}`,
                                    data: data
                                })
                            });
                        }

                        // Update series if chart already exist
                        if (tg[0] && tg[0].textContent) {
                            if (cached === 1) {
                                let qf = 1e3,
                                    lf = parseInt(this.extend.stored_length() * qf);
                                if (lf < qf / 2 || lf > qf * 6) {
                                    lf = qf;
                                }
                                let tdata = sr,
                                    cdata = this[`chart_${type}`].data.series,
                                    cdata_ready = new Promise((resolve) => {
                                        tdata.forEach(function(d, i, a) {
                                            cdata[i].data.push(d.data[0]);
                                            if (cdata[i].data.length > lf) {
                                                cdata[i].data.shift();
                                            }
                                            if (i === a.length - 1) {
                                                resolve()
                                            }
                                        });
                                    });
                                cdata_ready.then(() => {
                                    this[`chart_${type}`].update({
                                        series: cdata
                                    });
                                });
                            }
                        }

                        // Initialize chart the first time
                        else if (cached === 2) {
                            this[`chart_${type}`] = new this.extend.chart.Line(tg[0], {
                                series: sr,
                            }, {
                                axisX: {
                                    type: this.extend.chart.FixedScaleAxis,
                                    divisor: 12,
                                    labelInterpolationFnc: (value) => {
                                        return this.extend.moment(value * 1000).format(this.extend.locale.time);
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

                            // Remove loader
                            this[`chart_${type}`].on('created', () => ld.remove());
                        }
                    })
                }
            });
            setTimeout(() => {
                this.extend.state() && this.query();
            }, 200);
        },

        // Stop querying
        disable: function() {
            let abort = this.call.abort;

            typeof abort === "function" && (abort.call(), this.stopped = 0);

            this.killed = 1;
            
            setTimeout(() => {
                this.stopped = 1, this.call = {};
            }, this.timeout + 2);
        },

        // Check to enable stats after stop
        enable: function() {
            if (this.extend.enabled()) {
                this.timeout = this.extend.timeout(), this.stopped = 1, this.killed = 0, this.query();
            }
        }
    }
}