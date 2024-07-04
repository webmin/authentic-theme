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
        // Define variables
        error: 0,
        activating: 0,
        requery: null,
        socket: null,
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
            blocked: theme_updating,
            getHistoryData: function (data) {
                return vars.stats.history;
            },
        },
        // Define reusable selectors
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
        // Get current data to submit to the socket
        getSocketDefs: function () {
            return {
                session: session.server.data("session-hash"),
                paused: !this.canRender() ? 1 : 0,
                interval: this.getInterval(),
                disable: !this.isEnabled() ? 1 : 0,
                shutdown: settings_sysinfo_real_time_shutdown_on_last ? 1 : 0,
            };
        },
        // Update settings for the current client on the socket server
        // updateSocket: function () {
        //     if (this.isEnabled() && this.socket &&
        //         this.socket.readyState === 1) {
        //         const socketData = this.getSocketDefs();
        //         // Update socket settings
        //         this.socket.send(JSON.stringify(socketData));
        //     }
        // },
        // Check if graphs can be rendered
        graphsCanPreRender: function () {
            return document.querySelector(`[${this.selector.chart.loader}]`) ? 1 : 0;
        },
        // Get interval call for the stats update
        getInterval: function () {
            return settings_sysinfo_real_time_run_rate / 1000;
        },
        // Get the stored data duration period (e.g., from 300 to 3600 seconds)
        getStoredDuration: function () {
            return settings_sysinfo_real_time_stored_duration;
        },
        // Check if the received data has multiple datasets
        getRenderType: function(graphs) {
            graphs = graphs.graphs;
            let hasMultipleDatasets = false;
            for (const key in graphs) {
                if (graphs.hasOwnProperty(key) && Array.isArray(graphs[key])) {
                    if (graphs[key].length > 1) {
                        hasMultipleDatasets = true;
                        break;
                    }
                }
            }
            // Received graphs stats have history
            // data (3) or a single slice (null)
            return hasMultipleDatasets ? 3 : null;
        },
        // Can we update the stats in the UI?
        canRender: function() {
            return theme.visibility.get();
        },
        // Check if the stats are enabled
        isEnabled: function () {
            return settings_sysinfo_real_time_status ? 1 : 0;
        },
        // Restart the stats by shutting down and enabling them
        restart: function () {
            this.shutdown();
            setTimeout(() => {
                this.enable();
            }, this.getInterval() * 1000 * 3);
        },
        // Disable the stats broadcast for the client
        disable: function () {
            if (this.socket && this.socket.readyState === 1) {
                // console.warn("Disabling stats broadcast");
                const socketData = this.getSocketDefs();
                socketData.paused = 1;
                this.socket.send(JSON.stringify(socketData));
            }
        },
        // Enable the stats broadcast for the client
        enable: function () {
            if (this.isEnabled()) {
                // console.warn("Enabling stats broadcast");
                if (this.graphsCanPreRender()) {
                    this.preRender();
                }
                if (this.socket) {
                    // console.warn("Sending ..", this.socket.readyState === 1),
                    this.socket.readyState === 1 &&
                        this.socket.send(JSON.stringify(this.getSocketDefs()));
                } else {
                    // console.warn("Activating .."),
                    this.activate();
                }
            }
        },
        // Shutdown the stats broadcast for all
        // clients by shutting down the socket
        shutdown: function () {
            if (this.socket && this.socket.readyState === 1) {
                const socketData = this.getSocketDefs();
                socketData.disable = 1;
                this.socket.send(JSON.stringify(socketData));
            }
        },

        // Activate the stats server unless already up and open
        // the socket to receive the data for the current tab
        activate: function () {
            // Already called for this tab?
            if (this.activating++ ||
                this._.blocked() ||
                this.socket) {
                return;
            }
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
                        }, this.getInterval() * 1000));
                },
                success: function (data) {
                    // Do we have socket opened?
                    if (data.success) {
                        // Open socket
                        // console.warn("WebSocket connection opened", data);
                        this.socket = new WebSocket(data.socket);
                        // On socket open
                        this.socket.onopen = () => {
                            this.activating = 0;
                            // console.log("WebSocket connection established",
                            //         this.getSocketDefs());
                            this.socket.send(
                                JSON.stringify(this.getSocketDefs()));
                        };
                        // On socket message
                        this.socket.onmessage = (event) => {
                            const message = JSON.parse(event.data),
                                  renderType = this.getRenderType(message);
                            // Pause stats broadcast for this client
                            // if the tab is not visible
                            // err: no need, as redundant with enable/disable?
                            // if (this.canRender.last != this.canRender()) {
                            //    console.log("Visibility changed", this.canRender());
                            //     this.canRender.last = this.canRender();
                            //     this.updateSocket();
                            // }
                            // console.log("Received stats", renderType, message);
                            this.render(message, renderType);
                        };
                        // On socket close
                        this.socket.onclose = () => {
                            // console.warn("WebSocket connection closed");
                            setTimeout(() => {
                                this.socket = null;
                                this.activating = 0;
                                this.enable();
                            }, this.getInterval());
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

        // Draw initial graphs either using stored data or empty placeholders
        preRender: function () {
            this.render(this._.getHistoryData(), 2);
        },

        // Display changes
        render: function (data, graphs) {
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
                    cached = target === "graphs" ? (graphs ? (graphs === 3 ? 3 : 2) : (this.graphsCanPreRender() ? 2 : 1)) : 0;
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

                        // Update series if chart already
                        // exist unless it's a re-draw
                        if (tg[0] && tg[0].textContent && cached !== 3) {
                            if (cached === 1) {
                                let lf = parseInt(this.getStoredDuration());
                                if (lf < 300 || lf > 3600) {
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

                        // Initialize chart the first time (2) or fully
                        // update (3) the chart if it's already drawn
                        else if (cached === 2 || cached === 3) {
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
