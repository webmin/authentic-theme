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
            chart: uPlot,
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

        // Get graph style primitives for uPlot
        getChartStyle: function () {
            const rootStyle = getComputedStyle(document.documentElement),
                  getVar = (name) => rootStyle.getPropertyValue(name).trim();
            return {
                blue: getVar("--stats-chart-color-blue"),
                green: getVar("--stats-chart-color-green"),
                greenFill: getVar("--stats-chart-color-green-fill"),
                grid: getVar("--stats-chart-grid-color"),
                axisLabel: getVar("--stats-chart-axis-label-color"),
                axisLabelHover: getVar("--stats-chart-axis-label-hover-color"),
                label: getVar("--stats-chart-label-color"),
                red: getVar("--stats-chart-color-red"),
                redFill: getVar("--stats-chart-color-red-fill"),
            };
        },

        // Get stored graph duration with sane bounds
        getChartDuration: function () {
            let duration = parseInt(this.getStoredDuration(), 10);
            if (duration < 300 || duration > 86400) {
                duration = 1200;
            }
            return duration;
        },

        // Get graph pixel size, including a fallback for collapsed/empty panels
        getChartSize: function (target, height) {
            const rect = target.getBoundingClientRect(),
                  parentRect = target.parentNode ?
                      target.parentNode.getBoundingClientRect() : { width: 0 },
                  width = rect.width || parentRect.width ||
                      document.documentElement.clientWidth;
            return {
                width: Math.max(Math.floor(width - 6), 220),
                height: parseInt(height, 10) || 110,
            };
        },

        // Convert persisted `{x, y}` stats history into uPlot's aligned arrays
        getChartData: function (array, type) {
            const points = [],
                  first = array && array[0],
                  source = first && (first.data || first),
                  multi = source && Array.isArray(source.y),
                  seriesCount = multi ? source.y.length : 1,
                  hasThreshold = type === "cpu" || type === "virt",
                  data = [[]];
            for (let i = 0; i < (hasThreshold ? 2 : seriesCount); i++) {
                data.push([]);
            }
            (array || []).forEach((point) => {
                const entry = point && (point.data || point),
                      x = entry && parseFloat(entry.x);
                if (!Number.isFinite(x)) {
                    return;
                }
                points.push({
                    x: x,
                    y: entry.y,
                });
            });
            points.sort((a, b) => a.x - b.x);
            if (hasThreshold) {
                return this.getThresholdChartData(points, 80);
            }
            points.forEach((point) => {
                data[0].push(point.x);
                if (multi) {
                    for (let i = 0; i < seriesCount; i++) {
                        data[i + 1].push(parseFloat(point.y[i]) || 0);
                    }
                } else {
                    data[1].push(parseFloat(point.y) || 0);
                }
            });
            return data;
        },

        // Split over-threshold percentage graphs without hiding isolated spikes
        getThresholdChartData: function (points, threshold) {
            const data = [[], [], []],
                  addPoint = (x, lowValue, highValue) => {
                      data[0].push(x);
                      data[1].push(lowValue);
                      data[2].push(highValue);
                  };
            points.forEach((point, index) => {
                const value = parseFloat(point.y) || 0;
                if (index > 0) {
                    const prev = points[index - 1],
                          prevValue = parseFloat(prev.y) || 0,
                          crossed = (prevValue <= threshold && value > threshold) ||
                              (prevValue > threshold && value <= threshold);
                    if (crossed && value !== prevValue) {
                        const ratio = (threshold - prevValue) / (value - prevValue),
                              x = prev.x + ((point.x - prev.x) * ratio);
                        addPoint(x, threshold, threshold);
                    }
                }
                if (value > threshold) {
                    addPoint(point.x, null, value);
                } else {
                    addPoint(point.x, value, null);
                }
            });
            return data;
        },

        // Trim all aligned uPlot arrays to the selected time window
        trimChartData: function (data, cutoff) {
            const xdata = data[0];
            let lo = 0,
                hi = xdata.length - 1,
                cut = 0;
            while (lo <= hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (xdata[mid] < cutoff) {
                    lo = mid + 1;
                    cut = lo;
                } else {
                    hi = mid - 1;
                }
            }
            if (cut > 0) {
                data.forEach((series) => series.splice(0, cut));
            }
        },

        // Get the visible x-axis range for the current aligned data
        getChartWindow: function (data) {
            const xdata = data[0],
                  duration = this.getChartDuration(),
                  highX = xdata[xdata.length - 1] ||
                      Math.floor(Date.now() / 1000),
                  firstX = xdata[0] || highX;
            let lowX = Math.max(highX - duration, firstX);
            if (highX <= lowX) {
                lowX = highX - Math.max(this.getInterval(), 1);
            }
            return {
                low: lowX,
                high: highX,
            };
        },

        // Get a readable step for Chartist-like Network I/O y-axis labels
        getNetworkChartStep: function (value) {
            const magnitude = Math.pow(10, Math.floor(Math.log10(value))),
                  normalized = value / magnitude,
                  nice = normalized <= 1 ? 1 :
                      normalized <= 2 ? 2 :
                      normalized <= 2.5 ? 2.5 :
                      normalized <= 5 ? 5 :
                      normalized <= 7.5 ? 7.5 : 10;
            return nice * magnitude;
        },

        // Get a Chartist-like padded Network I/O scale with more grid divisions
        getNetworkChartScale: function (dataMax) {
            const max = Math.max(dataMax || 1, 1),
                  paddedMax = max * 1.25,
                  step = this.getNetworkChartStep(paddedMax / 3);
            return {
                high: step * Math.ceil(paddedMax / step),
                step: step,
            };
        },

        // Get Network I/O y-axis splits with intermediate divisions
        getNetworkChartSplits: function (scaleMax) {
            const step = this.getNetworkChartStep(scaleMax / 3),
                  splits = [];
            for (let value = 0; value <= scaleMax + (step / 2); value += step) {
                splits.push(value);
            }
            return splits;
        },

        // Format y-axis values exactly like the previous renderer
        formatChartValue: function (type, value, hasArea, hasBandwidth) {
            value = Math.round(value);
            if (hasArea) {
                return value ? value + "%" : value;
            } else if (hasBandwidth) {
                if (type === "net") {
                    if (!value) {
                        return value;
                    }
                    return this._.convert.size(value, {
                        fixed: 0,
                        bits: 1,
                        round: 1,
                    });
                }
                if (!value) {
                    return value;
                }
                return this._.convert.size(value * 1024, {
                    fixed: 0,
                    round: 1,
                });
            }
            return value;
        },

        // Build uPlot options for a single live-history graph
        getChartOptions: function (type, label, data, graphOptions, target) {
            const size = this.getChartSize(target, graphOptions.height),
                  hasArea = graphOptions.fill(),
                  hasBandwidth = graphOptions.bandwidth(),
                  axisXFont = "11px RobotoLocal",
                  axisYFont = "11px RobotoLocal",
                  axisLabelFont = "12px RobotoLocal",
                  // Resolve CSS vars lazily so a canvas repaint picks up
                  // palette changes
                  styleValue = (name) => {
                      return () => this.getChartStyle()[name];
                  },
                  grid = {
                      stroke: styleValue("grid"),
                      width: 1,
                      dash: [3, 4],
                  },
                  baseSeries = {
                      points: {
                          show: false,
                      },
                      width: hasArea ? 0.7 : 0.8,
                  },
                  series = [{}],
                  chartLib = this._.chart;

            if (type === "cpu" || type === "virt") {
                series.push(chartLib.assign({}, baseSeries, {
                    stroke: styleValue("green"),
                    fill: styleValue("greenFill"),
                    spanGaps: false,
                }));
                series.push(chartLib.assign({}, baseSeries, {
                    stroke: styleValue("red"),
                    fill: styleValue("redFill"),
                    spanGaps: false,
                }));
            } else if (type === "disk" || type === "net") {
                series.push(chartLib.assign({}, baseSeries, {
                    stroke: styleValue("blue"),
                }));
                series.push(chartLib.assign({}, baseSeries, {
                    stroke: styleValue("red"),
                }));
            } else {
                series.push(chartLib.assign({}, baseSeries, {
                    stroke: styleValue(type === "proc" ? "blue" : "green"),
                    fill: hasArea ? styleValue("greenFill") : null,
                }));
            }

            return {
                width: size.width,
                height: size.height,
                cursor: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                scales: {
                    x: {
                        time: true,
                        range: (self) => {
                            const range = this.getChartWindow(self.data || data);
                            return [range.low, range.high];
                        },
                    },
                    y: {
                        range: hasArea ?
                            (() => [0, 100]) :
                            ((self, dataMin, dataMax) => {
                                if (type === "net") {
                                    return [0, this.getNetworkChartScale(dataMax).high];
                                }
                                const max = Math.max(dataMax || 1, 1),
                                      range = chartLib.rangeNum(0, max, 0.1, true);
                                range[0] = 0;
                                return range;
                            }),
                    },
                },
                axes: [
                    {
                        stroke: styleValue("label"),
                        grid: grid,
                        ticks: {
                            show: false,
                        },
                        border: {
                            show: false,
                        },
                        font: axisXFont,
                        align: 1,
                        size: 24,
                        space: 120,
                        values: (self, splits) => {
                            const scale = self.scales.x,
                                  plotRight = scale && Number.isFinite(scale.max) ?
                                      self.valToPos(scale.max, "x") : 0,
                                  seenLabels = new Set();
                            return splits.map((value) => {
                                let label;
                                // Hide only the right-edge label early enough
                                // that it doesn't spill out
                                if (plotRight && plotRight - self.valToPos(value, "x") < 50) {
                                    return "";
                                }
                                label = this._.dayjs(value * 1000)
                                    .utcOffset(this._.locale.offset())
                                    .format(this._.locale.time);
                                // Fresh history can produce several distinct
                                // ticks that still format to the same minute;
                                // keep the left-most label and blank repeats
                                if (seenLabels.has(label)) {
                                    return "";
                                }
                                seenLabels.add(label);
                                return label;
                            });
                        },
                    },
                    {
                        stroke: styleValue("label"),
                        grid: grid,
                        ticks: {
                            show: false,
                        },
                        border: {
                            show: false,
                        },
                        label: "",
                        font: axisYFont,
                        labelFont: axisLabelFont,
                        labelGap: 12,
                        labelSize: 24,
                        size: 60,
                        splits: hasArea ? (() => [0, 50, 100]) :
                            (type === "net" ?
                                ((self, axisIdx, scaleMin, scaleMax) => {
                                    return this.getNetworkChartSplits(scaleMax);
                                }) : null),
                        values: (self, splits) => {
                            return splits.map((value) => {
                                return this.formatChartValue(
                                    type, value, hasArea, hasBandwidth);
                            });
                        },
                    },
                ],
                hooks: {
                    drawAxes: [
                        (self) => {
                            // uPlot colors the Y title and Y values with the
                            // same stroke; draw the title ourselves so hover
                            // opacity affects only it
                            const axis = self.axes[1],
                                  ctx = self.ctx,
                                  pxRatio = self.ctx.canvas.width / self.width,
                                  style = this.getChartStyle(),
                                  fill = target.matches(":hover") ?
                                      style.axisLabelHover : style.axisLabel;
                            ctx.save();
                            ctx.font = axis.labelFont[0];
                            ctx.fillStyle = fill;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";
                            ctx.translate(
                                // The extra nudge to keep the title in the lane
                                Math.round((axis._lpos - axis.labelGap + 5) * pxRatio),
                                Math.round(self.bbox.top + (self.bbox.height / 2))
                            );
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText(label, 0, 0);
                            ctx.restore();
                        },
                    ],
                },
                series: series,
            };
        },

        // Keep uPlot charts responsive inside dashboard panels
        bindChartResize: function (type, target, chart, height) {
            const resize = () => {
                const size = this.getChartSize(target, height);
                if (chart.width !== size.width || chart.height !== size.height) {
                    chart.setSize(size);
                }
            };
            if (window.ResizeObserver) {
                chart.resizeObserver = new ResizeObserver(resize);
                chart.resizeObserver.observe(target.parentNode || target);
            } else {
                chart.resizeEvent = `resize.stats-chart-${type}`;
                $(window).on(chart.resizeEvent, resize);
            }
        },

        // Remove previous uPlot instance and listeners
        destroyChart: function (type) {
            const chart = this[`chart_${type}`];
            if (!chart) {
                return;
            }
            if (chart.resizeObserver) {
                chart.resizeObserver.disconnect();
            }
            if (chart.resizeEvent) {
                $(window).off(chart.resizeEvent);
            }
            if (chart.hoverEvent && chart.statsTarget) {
                $(chart.statsTarget).off(chart.hoverEvent);
            }
            chart.destroy();
            this[`chart_${type}`] = null;
        },

        // Redraw axis text on hover to mimic old Chartist title opacity
        bindChartHover: function (type, target, chart) {
            chart.hoverEvent = `mouseenter.stats-chart-${type} mouseleave.stats-chart-${type}`;
            $(target)
                .off(chart.hoverEvent)
                .on(chart.hoverEvent, () => {
                    // Hover changes canvas text color, so CSS alone cannot
                    // update it
                    chart.redraw(false, false);
                });
        },

        // Repaint current charts after palette changes without restarting stats
        repaintCharts: function () {
            Object.keys(this).forEach((key) => {
                if (key.indexOf("chart_") !== 0) {
                    return;
                }
                const chart = this[key];
                if (!chart || typeof chart.redraw !== "function") {
                    return;
                }
                chart.redraw(false, false);
            });
        },

        // Add hover-only read/write labels for two-series traffic graphs
        addChartTrafficLabels: function (target, type) {
            if (type !== "disk" && type !== "net") {
                return;
            }
            const readLbl = this._.language(`dashboard_chart_${type}_read`),
                  writeLbl = this._.language(`dashboard_chart_${type}_write`);
            if (!readLbl || !writeLbl) {
                return;
            }
            $(target).find(".uplot-traffic-labels").remove();
            $("<span class=\"uplot-traffic-labels\" translate=\"no\"></span>")
                .append($("<span class=\"uplot-traffic-read\"></span>").text(`▪ ${readLbl}`))
                .append($("<span class=\"uplot-traffic-write\"></span>").text(`▪ ${writeLbl}`))
                .appendTo(target);
        },

        // Create or fully replace a uPlot chart
        drawChart: function (type, target, array, label, graphOptions) {
            const data = this.getChartData(array, type);
            if (!data[0].length) {
                return;
            }
            const range = this.getChartWindow(data);
            this.trimChartData(data, range.low);
            target.classList.add("uplot-chart-ready");
            this.destroyChart(type);
            const chart = new this._.chart(
                this.getChartOptions(type, label, data, graphOptions, target),
                data,
                target
            );
            this[`chart_${type}`] = chart;
            chart.statsTarget = target;
            this.bindChartResize(type, target, chart, graphOptions.height);
            this.bindChartHover(type, target, chart);
            this.addChartTrafficLabels(target, type);
        },

        // Append a live point to an existing uPlot chart
        updateChart: function (type, array) {
            const chart = this[`chart_${type}`],
                  incoming = this.getChartData(array, type);
            if (!chart || !incoming[0].length) {
                return false;
            }
            if (incoming.length !== chart.data.length) {
                return false;
            }
            incoming[0].forEach((x, pointIndex) => {
                chart.data[0].push(x);
                for (let i = 1; i < incoming.length; i++) {
                    chart.data[i].push(incoming[i][pointIndex]);
                }
            });
            const range = this.getChartWindow(chart.data);
            this.trimChartData(chart.data, range.low);
            chart.setData(chart.data, true);
            chart.setScale("x", {
                min: range.low,
                max: range.high,
            });
            return true;
        },

        // Display changes
        render: function (data, graphs) {
            if (!data) {
                return;
            }
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
                                        const value = sensor === "fans" ? data.rpm :
                                            (iSFahrenheit ? Math.round((data.temp * 9) / 5 + 32) : data.temp);
                                        return html.replace(
                                            /\d+/,
                                            value);
                                    });
                                } else {
                                    // Replace the numeric part after the colon, preserving prefix and unit
                                    $label.html(function (_, html) {
                                        const iSFahrenheit = html.includes("°F");
                                        const value = sensor === "fans" ? data.rpm :
                                            (iSFahrenheit ? Math.round((data.temp * 9) / 5 + 32) : data.temp);
                                        return html.replace(
                                            /: \d+/,
                                            `: ${value}`
                                        );
                                    });
                                }

                                const label_text = $label.text().replace(/.*?\d+:\s*/, "");
                                let className =
                                        HTML.label.textMaxLevels(sensor, label_text) ||
                                        (sideSlider ? this_.selector.defaultSliderClassLabel :
                                            this_.selector.defaultClassLabel);
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
                                    height: "110px",
                                },
                            },
                            lg = this._.language(`${this.selector.chart.container.parent}_${type}`),
                            tg = $(`#${lds}`).find(
                                `[${this.selector.chart.container.data}=${type}]`
                            ),
                            chart = this[`chart_${type}`],
                            chartTarget = chart && chart.statsTarget,
                            // PJAX swaps the dashboard DOM while old uPlot
                            // objects may still exist, so we need to redraw as
                            // the stored target is stale
                            drawRequired = !chart || cached === 2 || cached === 3 ||
                                !chartTarget || chartTarget !== tg[0] ||
                                !chartTarget.isConnected;

                        // Don't run further in case there is no container
                        if (!tg.length) {
                            return;
                        }

                        // Update series if chart already
                        // exist unless it's a re-draw
                        if (!drawRequired) {
                            if (cached === 1 &&
                                !this.updateChart(type, array)) {
                                this.drawChart(type, tg[0], array, lg, options.chart);
                                ld.remove();
                            }
                        }

                        // Initialize chart the first time (2) or fully
                        // update (3) the chart if it's already drawn
                        else if (drawRequired) {
                            this.drawChart(type, tg[0], array, lg, options.chart);
                            ld.remove();
                        }
                    });
                }
            });
        },
    },
};
