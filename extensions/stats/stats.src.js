/*!
 * Authentic Theme (https://github.com/authentic-theme/authentic-theme)
 * Copyright Ilia Rostovtsev <ilia@virtualmin.com>
 * Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
 */

/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint jquery: true */

"use strict";

// Stats module
const stats = {
    sys: {
        error: 0,
        activating: 0,
        requery: null,
        socket: null,
        getSocketDefs: function () {
            return {
                session: session.server.data("session-hash"),
                paused: 0,
                history: this.request_history(),
                interval: this.timeout(),
                disable: !this.enabled(),
                shutdown: settings_sysinfo_real_time_shutdown_on_last ? 1 : 0,
            };
        },
        fetch: function () {
            if (this.enabled()) {
                const socketData = this.getSocketDefs();
                // Update socket settings
                const history = this.request_history();
                if (history || this.request_history._) {
                    // console.log("Requesting history:", history);
                    this.request_history._ = !this.request_history._;
                    socketData.history = +this.request_history._;
                    this.socket.send(JSON.stringify(socketData));
                }
            }
        },
        request_history: function () {
            return document.querySelector(`[${this.selector.chart.loader}]`) ? 1 : 0;
        },
        timeout: () => {
            return settings_sysinfo_real_time_run_rate / 1000;
        },
        active: () => {
            return theme.visibility.get();
        },
        stored_length: () => {
            return settings_sysinfo_real_time_stored_duration;
        },
        enabled: () => {
            return settings_sysinfo_real_time_status ? 1 : 0;
        },
        disable: function () {
            if (this.socket) {
                const socketData = this.getSocketDefs();
                socketData.paused = 1;
                this.socket.send(JSON.stringify(socketData));
            }
        },
        enable: function () {
            if (this.enabled()) {
                if (this.socket) {
                    this.socket.send(JSON.stringify(this.getSocketDefs()));
                } else {
                    this.activate();
                }
            }
        },
        shutdown: function () {
            if (this.socket) {
                const socketData = this.getSocketDefs();
                socketData.disable = 1;
                this.socket.send(JSON.stringify(socketData));
            }
        },
        block: theme_updating,

        // Import globals
        /* jshint -W117 */
        _: {
            prefix: v___location_prefix,
            error: connection_error,
            language: theme_language,
            convert: {
                size: Convert.nice_size,
            },
            chart: Chartist,
            dayjs: dayjs,
            locale: {
                time: config_portable_theme_locale_format_time,
                offset: () => {
                    return get_utc_offset();
                },
            },
        },

        // Define selectors
        selector: {
            chart: {
                container: {
                    parent: "live_stats",
                    data: "data-chart",
                },
                loader: "data-charts-loader",
            },
            collapse: "collapse",
            dashboard: "system-status",
            slider: "info-container",
            piechart: "piechart",
        },

        // Get data
        activate: function () {
            if (this.activating++) {
                return;
            }
            if (this.block()) {
                return;
            }
            if (this.socket) {
                return;
            }

            // Live charts already loaded
            $.ajax({
                context: this,
                url: `${this._.prefix}/stats.cgi`,
                error: function () {
                    // Reset activating flag
                    this.activating = 0;
                    // Show error
                    if (this.error++ > 3) {
                        return;
                    }
                    // Retry again
                    !this.requery &&
                        (this.requery = setTimeout(() => {
                            this.requery = null;
                            this.activate();
                        }, this.timeout() * 1000));
                },
                success: function (data) {
                    // Do we have socket opened?
                    if (data.success) {
                        // Open socket
                        console.warn("WebSocket connection opened", data);
                        this.socket = new WebSocket(data.socket);
                        this.socket.onopen = () => {
                            this.activating = 0;
                            // console.log("WebSocket connection established");
                            this.socket.send(JSON.stringify(this.getSocketDefs()));
                        };
                        this.socket.onmessage = (event) => {
                            const message = JSON.parse(event.data);
                            this.render(message);
                            // console.log("Received stats:", message);
                            this.active() && this.fetch();
                        };
                        this.socket.onclose = () => {
                            console.warn("WebSocket connection closed");
                            setTimeout(() => {
                                this.socket = null;
                                this.activating = 0;
                                this.enable();
                            }, this.timeout());
                        };
                    } else {
                        // Reset activating flag
                        this.activating = 0;
                    }
                    // Reset error counter
                    this.error = 0;
                },
                dataType: "json",
            });
        },

        // Display changes
        render: function (data) {
            // Iterate through response
            Object.entries(data).map(([target, data]) => {
                let v = parseInt(data),
                    vo = typeof data === "object" ? data[data.length - 1] : false,
                    vt = vo ? vo : v,
                    $pc = $(
                        `#${this.selector.dashboard} .${this.selector.piechart}[data-charts*="${target}"]`
                    ),
                    $lc = $(`.${this.selector.slider} .${target}_percent`),
                    $od = $(`#${this.selector.dashboard} span[data-id="sysinfo_${target}"], 
                             .${this.selector.slider} span[data-data="${target}"]`),
                    cached = target === "_history" ? 2 : target === "_current" ? 1 : 0;

                if (Number.isInteger(v)) {
                    // Update pie-charts
                    if ($pc.length) {
                        let piechart = $pc.data("easyPieChart");
                        piechart && piechart.update(v);
                    }

                    // Update line-charts
                    if ($lc.length) {
                        $lc.find(".bar").attr("style", "width:" + v + "%");

                        // Update line-charts' text
                        let $dp = $lc.find(".description"),
                            $lb = $dp.text().split(":")[0];

                        $dp.attr("title", vo).text($lb + ": " + v + "% (" + vo + ")");
                    }

                    // Update other data
                    if ($od.length) {
                        if ($od.find("a").length) {
                            $od.find("a").text(vt);
                        } else {
                            $od.text(vt);
                        }
                    }
                }

                // Draw history graphs
                if (cached) {
                    let lds = `${this.selector.chart.container.parent}-${this.selector.collapse}`,
                        ld = $(`#${lds}`).find(`[${this.selector.chart.loader}]`);

                    // Process each supplied graph
                    Object.entries(data).map(([type, array]) => {
                        let options = {
                                chart: {
                                    type: () => {
                                        return type === "proc" || type === "disk" || type === "net";
                                    },
                                    bandwidth: () => {
                                        return type === "disk" || type === "net";
                                    },
                                    fill: function () {
                                        return this.type() ? false : true;
                                    },
                                    high: function () {
                                        return this.type() ? undefined : 100;
                                    },
                                    threshold: function () {
                                        return this.type() ? -1 : 50;
                                    },
                                    height: "100px",
                                },
                            },
                            lg = this._.language(`${this.selector.chart.container.parent}_${type}`),
                            tg = $(`#${lds}`).find(
                                `[${this.selector.chart.container.data}=${type}]`
                            ),
                            sr = [
                                {
                                    name: `series-${type}`,
                                    data: array,
                                },
                            ];

                        // Don't run further in case there is no container
                        if (!tg.length) {
                            return;
                        }

                        // Extend data object expected way to draw multiple series in single graph
                        if (array[0] && typeof array[0].y === "object") {
                            sr = [];
                            array[0].y.forEach(function (x, i) {
                                let data = [];
                                array.forEach(function (n) {
                                    data.push({
                                        data: { x: n.x, y: n.y[i] },
                                    });
                                });
                                sr.push({
                                    name: `series-${type}-${i}`,
                                    data: data,
                                });
                            });
                        }

                        // Update series if chart already exist
                        if (tg[0] && tg[0].textContent) {
                            if (cached === 1) {
                                let lf = parseInt(this.stored_length());
                                if (lf < 300 || lf > 86400) {
                                    lf = 600;
                                }
                                let tdata = sr,
                                    cdata = this[`chart_${type}`].data.series,
                                    cdata_start,
                                    cdata_end,
                                    cdata_ready = new Promise((resolve) => {
                                        tdata.forEach(function (d, i, a) {
                                            cdata_start =
                                                cdata[i].data[0].x || cdata[i].data[0].data.x;
                                            cdata_end =
                                                cdata[i].data[cdata[i].data.length - 1].x ||
                                                cdata[i].data[cdata[i].data.length - 1].data.x;
                                            cdata[i].data.push(d.data[0]);
                                            if (cdata_end - cdata_start > lf) {
                                                cdata[i].data.shift();
                                            }
                                            if (i === a.length - 1) {
                                                resolve();
                                            }
                                        });
                                    });
                                cdata_ready.then(() => {
                                    this[`chart_${type}`].update({
                                        series: cdata,
                                    });
                                });
                            }
                        }

                        // Initialize chart the first time
                        else if (cached === 2) {
                            this[`chart_${type}`] = new this._.chart.Line(
                                tg[0],
                                {
                                    series: sr,
                                },
                                {
                                    axisX: {
                                        type: this._.chart.FixedScaleAxis,
                                        divisor: 12,
                                        labelInterpolationFnc: (value) => {
                                            return this._.dayjs(value * 1000)
                                                .utcOffset(this._.locale.offset())
                                                .format(this._.locale.time);
                                        },
                                    },
                                    height: options.chart.height,
                                    showArea: options.chart.fill(),
                                    showPoint: !options.chart.fill(),
                                    high: options.chart.high(),
                                    low: 0,
                                    fullWidth: true,
                                    chartPadding: {
                                        left: 25,
                                    },
                                    axisY: {
                                        onlyInteger: true,
                                        labelInterpolationFnc: (value) => {
                                            if (options.chart.fill()) {
                                                return value ? value + "%" : value;
                                            } else if (options.chart.bandwidth(value)) {
                                                if (type === "net") {
                                                    return value
                                                        ? this._.convert.size(value, {
                                                              fixed: 0,
                                                              bits: 1,
                                                              round: 1,
                                                          })
                                                        : value;
                                                }
                                                return value
                                                    ? this._.convert.size(value * 1000, {
                                                          fixed: 0,
                                                          round: 1,
                                                      })
                                                    : value;
                                            } else {
                                                return value;
                                            }
                                        },
                                    },
                                    plugins: [
                                        this._.chart.plugins.ctAxisTitle({
                                            axisY: {
                                                axisTitle: lg,
                                                axisClass: "ct-axis-title",
                                                offset: {
                                                    x: 0,
                                                    y: 9,
                                                },
                                                flipTitle: true,
                                            },
                                        }),
                                        this._.chart.plugins.ctThreshold({
                                            threshold: options.chart.threshold(),
                                        }),
                                    ],
                                }
                            );

                            // Remove loader
                            this[`chart_${type}`].on("created", () => ld.remove());
                        }
                    });
                }
            });
        },
    },
};
