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
        tried: 0,
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
            can_conn_ws: can_conn_ws,
            blocked: theme_updating,
            getHistoryData: function () {
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
            defaultClassLabel: "bg-semi-transparent",
            defaultSliderClassLabel: "bg-semi-transparent-dark",
        },
        // Allow to start or pause check
        isAllowed: function () {
            // Check if the stats status
            const allowed =
                theme.visibility.get() && 
                (
                    plugins.dashboard.visible() ||
                    plugins.slider.visible()
                );
            // console.warn("Allowed :", allowed ? 'yes' : 'no');
            return allowed;
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
        // Get the stored data duration period (e.g., from 300 to 86400 seconds)
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
            const stats_enabled = settings_sysinfo_real_time_status ? 1 : 0,
                  stats_can = this._.can_conn_ws();
            return stats_enabled && stats_can;
        },
        // Restart the stats by shutting down and enabling them
        restart: function () {
            this.shutdown();
            setTimeout(() => {
                this.enable();
            }, this.getInterval() * 1000 * 4);
        },
        toggle: function () {
            setTimeout(() => {
                if (this.isAllowed()) {
                    this.enable();
                } else {
                    this.disable();
                }
            }, 200); // Don't lock the page in any possible way
        },
        _toggleLimiter: (() => {
            let timerId = null,
                lastJob = null;
            return (jobFn, ctx, args, delayMs) => {
                lastJob = () => jobFn.apply(ctx, args);
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    lastJob();
                    lastJob = timerId = null;
                }, delayMs);
            };
        })(),
        // Disable the stats broadcast for the client
        _disableFn: function () {
            if (this.socket && this.socket.readyState === 1 &&
                this.socket.paused !== true && !this.isAllowed()) {
                // console.warn("Disabling stats broadcast", this.socket);
                const socketData = this.getSocketDefs();
                socketData.paused = 1;
                this.socket.paused = true;
                this.socket.send(JSON.stringify(socketData));
            }
        },
        // Enable the stats broadcast for the client
        _enableFn: function () {
            if (this.isEnabled() && this.isAllowed()) {
                // console.warn("Enabling stats broadcast", this.socket);
                if (this.graphsCanPreRender()) {
                    this.preRender();
                }
                if (this.socket && this.socket.paused !== false) {
                    // console.warn("Sending ..", this.socket.readyState === 1),
                    this.socket.readyState === 1 &&
                        this.socket.send(JSON.stringify(this.getSocketDefs()));
                    this.socket.paused = false;
                } else {
                    // console.warn("Activating .."),
                    this.activate();
                }
            }
        },
        enable:  function () { this._toggleLimiter(
            this._enableFn,  this, arguments, 40); },
        disable: function () { this._toggleLimiter(
            this._disableFn, this, arguments, 4000); },
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
            // Tried too many times?
            if (this.tried++ > 4) {
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
                        }, this.getInterval() * 1000 * 4));
                },
                success: function (data) {
                    // Do we have socket opened?
                    if (data.success) {
                        // Open socket
                        // console.warn("WebSocket connection opened", data);
                        this.socket = new WebSocket(data.socket);
                        // On socket open
                        this.socket.onopen = () => {
                            this.tried = 0;
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
                            }, this.getInterval() * 1000 * 4);
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
                            $lb = $dp.text().split(":")[0],
                            uv = $lb + ": " + v + "% (" + vo + ")";
                        // Flatten and plunk the data for some graphs
                        if (target !== "cpu") {
                            uv = plugins.slider.update.stats.graphs.flatten(uv);
                            if (target !== "virt") {
                                uv = plugins.slider.update.stats.graphs.plunk(uv);
                            }
                        }
                        $dp.attr("title", vo).text(uv);
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

                // Update sensors data
                if (target === "sensors" && vo) {
                    // Iterate through sensors
                    Object.entries(vo).forEach(([sensor, value]) => {
                        let this_ = this,
                            $lb1 = $(`#${this.selector.dashboard} span[data-stats="${sensor}"]`),
                            $lb2 = $(`.${this.selector.slider} span[data-stats="${sensor}"]`);

                        if ($lb1 && $lb1.length) {
                            let lb_count1 = $lb1.length,
                                lb_count2 = $lb2.length;

                            // Sort the values based on 'fan' or 'core' field
                            value.sort((a, b) =>
                                sensor === "fans" ? a.fan - b.fan : a.core - b.core
                            );

                            // Function to update individual label
                            const updateLabel = function ($label, data, isSingleLabel, sideSlider) {
                                if (!data) {
                                    return;
                                }
                                // Update the label text based on count condition
                                if (isSingleLabel) {
                                    // Replace only the numeric part, preserving unit (°C or RPM)
                                    $label.html(function (_, html) {
                                        const iSFahrenheit = html.includes("°F");
                                        return html.replace(
                                            /\d+/,
                                            sensor === "fans"
                                                ? data.rpm
                                                : (iSFahrenheit ? Math.round((data.temp * 9) / 5 + 32) : data.temp));
                                    });
                                } else {
                                    // Replace the numeric part after the colon, preserving prefix and unit
                                    $label.html(function (_, html) {
                                        const iSFahrenheit = html.includes("°F");
                                        return html.replace(
                                            /: \d+/,
                                            `: ${sensor === "fans" ? data.rpm :
                                                (iSFahrenheit ? Math.round((data.temp * 9) / 5 + 32) : data.temp)}`
                                        );
                                    });
                                }

                                const label_text = $label.text().replace(/.*?\d+:\s*/, "");
                                let className =
                                        HTML.label.textMaxLevels(sensor, label_text) ||
                                        (sideSlider
                                            ? this_.selector.defaultSliderClassLabel
                                            : this_.selector.defaultClassLabel);
                                if (sideSlider && className === this_.selector.defaultClassLabel) {
                                    className = this_.selector.defaultSliderClassLabel;
                                }
                                // Update class based on current label text
                                $label
                                    .removeClass((i, c) => (c.match(/\bbg-\S+/g) || []).join(" "))
                                    .addClass(className);
                            };
                            // Handle $lb1 labels
                            if (lb_count1 === 1) {
                                updateLabel($lb1, value[0], true);
                            } else {
                                // Handle multiple labels for $lb1
                                $lb1.each((index, el) => {
                                    if (value[index]) {
                                        updateLabel($(el), value[index], false);
                                    }
                                });
                            }
                            // Handle $lb2 labels similarly
                            if (lb_count2 === 1) {
                                updateLabel($lb2, value[0], true, true);
                            } else {
                                $lb2.each((index, el) => {
                                    if (value[index]) {
                                        updateLabel($(el), value[index], false, true);
                                    }
                                });
                            }
                        }
                    });
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
                                        return this.type() ? -1 : 80;
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
                                let lf = parseInt(this.getStoredDuration(), 10);
                                if (lf < 300 || lf > 86400) lf = getStoredDuration();
                            
                                const chart = this[`chart_${type}`],
                                      cdata = chart.data.series;
                                let   tdata = sr; // keep input series
                            
                                const getX = p => (p && (p.x != null ? p.x : (p.data && p.data.x))) || 0;
                            
                                // Append and trim to last `lf` seconds
                                tdata.forEach((d, i) => {
                                    const series = cdata[i].data,
                                          newPt  = d.data[0];
                                    series.push(newPt);
                                
                                    const lastX  = getX(series[series.length - 1]),
                                          cutoff = lastX - lf;
                                
                                    // Dynamic trimming
                                    let lo = 0, hi = series.length - 1, cutIdx = 0;
                                    while (lo <= hi) {
                                        const mid = (lo + hi) >> 1;
                                        if (getX(series[mid]) < cutoff) {
                                            lo = mid + 1;
                                            cutIdx = lo;
                                        } else {
                                            hi = mid - 1;
                                        }
                                    }
                                    if (cutIdx > 0) series.splice(0, cutIdx);
                                });
                            
                                // Avoid empty leading space, and don't set low earlier than the first data point
                                const lastXAll  = Math.max.apply(null, cdata.map(s => getX(s.data[s.data.length - 1] || s.data[0] || { x: 0 }))),
                                      firstXAll = Math.min.apply(null, cdata.map(s => getX(s.data[0] || { x: lastXAll }))),
                                      highX = lastXAll,
                                      lowX  = Math.max(highX - lf, firstXAll),
                                      // Merge and keep existing by patching low/high
                                      opts = this._.chart.extend({}, chart.options, {
                                            axisX: this._.chart.extend({}, chart.options.axisX, {
                                                low: lowX,
                                                high: highX
                                            })
                                      });
                                // Prevents left overflow
                                cdata.forEach(s => {
                                    const a = s.data;
                                    let lo = 0, hi = a.length - 1, cut = 0;
                                    while (lo <= hi) {
                                        const mid = (lo + hi) >> 1;
                                        if (getX(a[mid]) < lowX) {
                                            lo = mid + 1; cut = lo;
                                        } else { 
                                            hi = mid - 1;
                                        }
                                    }
                                    if (cut > 0) a.splice(0, cut);
                                });
                            
                                // Force full redraw so the window shifts every tick
                                chart.update({ series: cdata }, opts, true);
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
                                                    ? this._.convert.size(value * 1024, {
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
                            this[`chart_${type}`].on("created", (data) => {
                                // Add labels to the first foreign object
                                const ffObj = data.svg.getNode().querySelector('foreignObject');
                                if (ffObj) {
                                    const readLbl = this._.language(`dashboard_chart_${type}_read`),
                                          writeLbl = this._.language(`dashboard_chart_${type}_write`);
                                    if (readLbl && writeLbl) {
                                        ffObj.setAttribute('data-label-read', `▪ ${readLbl}`);
                                        ffObj.setAttribute('data-label-write', `▪ ${writeLbl}`);
                                    }
                                }
                                // Clean-up loader
                                ld.remove();
                              });
                        }
                    });
                }
            });
        },
    },
};
