/*!
 * Authentic Theme (https://github.com/authentic-theme/authentic-theme)
 * Copyright Ilia Rostovtsev <programming@rostovtsev.io>
 * Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
 */

/* jshint strict: true */
/* jshint esversion: 6 */
/* jslint bitwise: true */
/* jshint jquery: true */

'use strict';

/**
 * Mail object module
 *
 * @since 19.17
 *
 * @return {object} Reveal folders module API
 * @return {object} Reveal messages module API
 */

const mail = (function() {

    /* jshint -W117 */

    /**
     * Imports globals using abstraction layer (DI)
     *
     * @since 19.17
     *
     * @return {string|function|object}
     */
    const _ = {
            path: {
                origin: v___location_origin,
                prefix: v___location_prefix,
                extensions: v___server_extensions_path,
                css: v___server_css_path,
                js: v___server_js_path
            },
            variable: {
                switch: function() {
                    return $t_uri_webmail;
                },
                module: {
                    name: function() {
                        return 'mailbox';
                    },
                    link: function() {
                        let prefix = v___location_prefix;
                        return prefix ? `${prefix}/${v___module}` : `/${this.name()}`;
                    },
                },
                locale: {
                    short: config_portable_theme_locale_format_short,
                }
            },
            platform: {
                mac: window.navigator.platform === 'MacIntel',
            },
            pjax: {
                fetch: get_pjax_content,
            },
            load: load,
            sdata: get_server_data,
            mavailable: core.moduleAvailable,
            lang: theme_language,
            notification: plugins.messenger.post,
            file_chooser: plugins.chooser.file,
            button: {
                progress: snippets.progressive_button,
                lock: snippets.button_lock,
            },
            rows: page_table_rows_control,
            document_title: theme_title_generate,
            update_mdata: core.updateModuleData,
            uri_param: uri_parse_param,
            error: connection_error,
            event: {
                generate: event_generate
            },
            navigation: {
                reset: plugins.navigation.reset
            },
            plugin: {
                json_to_query: Convert.json_to_query,
                serialized_to_json: Convert.serialized_to_json,
                nice_size: Convert.nice_size,
                html_escape: Convert.htmlEscape,
                timestamp: snippets.datetime.locale,
                offset_adjust: page.handle.content.offset,
                preloader_dismiss: page.handle.content.preloader_dismiss,
                moment: moment,

                select: (data, size = '34') => {
                    if (Array.isArray(data)) {
                        data[0].select2(data[1])
                        return
                    }
                    data.select2({
                        minimumResultsForSearch: 5,
                        containerCssClass: `select2-content heighter-${size}`,
                        dropdownCssClass: `select2-content h${size}`
                    });
                    data.next('.select2').addClass('select2-content-container')
                    data.on('select2:open', function() {
                        $('.select2-container').off('click.container')
                            .on('click.container', function(event) {
                                event.stopPropagation();
                            })
                    });
                },
                scroll: (target, options) => {
                    if (typeof target === 'string') {
                        $(target).mCustomScrollbar(options)
                    } else {
                        $(target[0]).mCustomScrollbar('scrollTo', target[1], {
                            scrollOffset: [$(target[0]), 3, 4]
                        })
                    }
                },
                arialabel: () => {
                    let arialabel = 'aria-label';
                    document.querySelectorAll('[data-tooltip="mailbox"]:not(' + arialabel + ')').forEach(
                        t => t.setAttribute(arialabel, t.getAttribute('data-title'))
                    )

                },
                tooltip: (target) => {
                    let $target = target || $('[data-tooltip="mailbox"]');
                    $target.tooltip({
                        html: true,
                        trigger: 'hover',
                        container: 'body',
                        sanitize: false,
                        delay: {
                            show: 600,
                            hide: 30
                        }
                    });
                }
            },
        },

        /* jshint +W117 */

        /**
         * Defines component template
         *
         * @since 19.20
         *
         * @return {string|object}
         */
        $$ = {
            $: {

                /**
                 * Returns set of selectors for generating layout
                 *
                 * @returns {string}
                 */
                layout: {
                    container: 'container-fluid',
                    controls: 'mail-controls',
                    panel: 'panel-mail panel-body',
                    row: {
                        controls: 'row row-controls',
                        messages: 'row row-messages colorify',
                        quota: 'row row-quota',
                        centered: 'row text-center',
                    },
                    column: {
                        3: 'col-xs-3',
                        4: 'col-xs-4',
                        6: 'col-xs-6',
                        8: 'col-xs-8',
                        9: 'col-xs-9',
                        12: 'col-xs-12',
                    },
                    button: {
                        link: 'btn btn-link text-decoration-none',
                        transparent: {
                            plain: 'btn btn-transparent',
                            link: 'btn btn-link btn-transparent',
                        },
                        default: 'btn btn-default',
                        primary: 'btn btn-primary',
                        block: {
                            default: 'btn btn-default btn-block',
                            transparent: 'btn btn-transparent btn-block'
                        },
                        dropdown: {
                            default: 'btn btn-default dropdown-toggle'
                        }
                    }
                },

                /**
                 * Returns used selectors for generating elements
                 *
                 * @returns {string}
                 */
                tree: {
                    container: 'data-mail-folders',
                    active: 'fancytree-active',
                    loader: 'fancytree-loader',
                    title: 'fancytree-title',
                    bubble: 'label label-danger',
                },
                controls: {
                    compose: {
                        button: '[data-compose]',
                        icon: 'fa-fw fa-plus',
                    },
                    select: {
                        dropdown: 'dropdown-select',
                        checkbox: '[data-select] input',
                        menus: '[data-select-mass]',
                    },
                    delete: 'btn btn-default fa fa-trash',
                    forward: 'btn btn-default fa fa-forward',
                    search: {
                        link: '[data-href^="sort.cgi"]',
                        clear: {
                            link: 'search-clear text-danger',
                            icon: 'fa-fw fa-times-circle-o',
                        },
                        dropdown: 'dropdown-search',
                        icon: 'fa-search',
                        data: {
                            form: {
                                action: 'data-form-action',
                                type: 'data-form-action-type',
                                advanced: 'data-form-action-advanced'
                            },
                        },
                        button: {
                            type: '[data-toggle-type="1"]',
                        },
                        caret: {
                            down: 'fa-caret-down',
                            up: 'fa-caret-up',
                        },
                        submit: '[data-search-submit]',
                    },
                    move: {
                        dropdown: 'dropdown-move',
                        checkbox: '[data-copy-only]',
                        icon: 'fa-folder-move',
                        submit: '[data-transfer-submit]',
                    },
                    more: {
                        dropdown: 'dropdown-more',
                        icon: 'fa-dots-vertical',
                        menu: {
                            read: '[data-form-action="markas1"]',
                            unread: '[data-form-action="markas0"]',
                            special: '[data-form-action="markas2"]',
                            spam: '[data-form-action="razor"]',
                            ham: '[data-form-action="ham"]',
                            black: '[data-form-action="black"]',
                            white: '[data-form-action="white"]',
                        },
                    },
                    sort: {
                        dropdown: 'dropdown-sort',
                        icon: 'fa-fw fa-sort',
                    },
                    counter: 'mail-selected-count',
                    refresh: {
                        button: 'btn btn-lg btn-default fa fa-refresh-mdi'
                    },
                    pagination: 'pagination-title',
                    settings: 'btn btn-default fa fa-cog'
                },
                messages: {
                    checkbox: 'input[data-check]',
                    flag: 'mail-list-trow-flag-security',
                    special: {
                        star: 'star',
                        starred: 'fa-star star',
                        unstarred: 'fa-star-o star',
                    },
                    row: {
                        empty: 'fa fa-fw fa-1_50x fa-inbox'
                    }
                },
                compose: {
                    button: {
                        inverse: 'btn-inverse',
                        submit: 'btn-primary',
                        schedule: 'btn-info',
                    },
                    hidden: 'hidden',
                    panel: {
                        content: 'jsPanel-content',
                        container: 'jspCompose',
                        container_shown: 'jspShown',
                        backdrop: 'compose_backdrop',
                    },
                    editor: {
                        compose: 'ql-compose',
                        composer: 'data-composer',
                        scheduled: 'scheduled',
                        content: 'ql-editor',
                        toolbar: 'ql-toolbar',
                        disabled: 'ql-disabled',
                        tb_bold: 'ql-bold',
                        tb_link: 'ql-link',
                        tb_image: 'ql-image',
                        controls: {
                            compose: 'compose-controls',
                            more: 'more-options',
                            extra: {
                                attach: 'e-attachment',
                                link: 'e-ql-link',
                                image: 'e-ql-image',
                                html: 'e-html',
                                discard: 'e-discard',
                            }
                        }
                    },
                    form: {
                        header: 'form-head',
                        recipients: {
                            control: 'recipients-control',
                            fields: 'recipients-control-fields',
                        },
                        name: {
                            tattach: 'tattachments',
                            scheduled: 'scheduled',
                        }
                    },
                    icons: {
                        upload: {
                            server: 'fa fa-fw fa-download-cloud',
                            attach: 'fa2 fa2-attach',
                        }
                    }
                },
                notification: {
                    danger: 'exclamation-triangle',
                    error: 'exclamation-circle',
                    success: 'check-circle',
                    type: {
                        search: 'search',
                        scheduled: 'clock',
                        trash: '- fa2 fa2-trash',
                    }
                },
                class: {
                    events_none: 'pointer-events-none',
                },

                /**
                 * Returns templates
                 *
                 * @returns {string}
                 */
                template: {
                    compose: (data) => {
                        let hidden = ' class="' + data.class.hidden + '"',
                            empty = String(),
                            status = {
                                server_file: empty,
                                abook: empty,
                                crypt: empty,
                                sign: empty,
                                dsn: empty,
                                del: empty,
                                menu: {
                                    server_file: empty,
                                    encrypt: empty,
                                    options: empty,
                                },
                            },
                            value = {
                                server_file: data.toggle.more.server_file,
                                crypt: data.toggle.more.crypt[0],
                                sign: data.toggle.more.sign[0],
                                abook: data.toggle.more.abook,
                                dsn: data.toggle.more.dsn,
                                del: data.toggle.more.del,
                            }

                        value.server_file === null && (status.server_file = hidden);
                        if (value.server_file === null) {
                            status.menu.server_file = hidden
                        }
                        value.crypt === null && (status.crypt = hidden);
                        value.sign === null && (status.sign = hidden);
                        if (value.crypt === null && value.sign === null) {
                            status.menu.encrypt = hidden
                        }

                        value.abook === null && (status.abook = hidden);
                        value.dsn === null && (status.dsn = hidden);
                        value.del === null && (status.del = hidden);
                        if (value.abook === null &&
                            value.dsn === null &&
                            value.del === null) {
                            status.menu.options = hidden
                        }
                        return `
                            <form class="compose" data-pjax="no" action="${data.prefix}/${data.target.send}?id=${data.id}" method="post" enctype="multipart/form-data" accept-charset="${data.charset}">
                                <div class="form-e">
                                    <div class="${data.class.form.header}">
                                        <div class="form-group from">
                                            <div class="flex">
                                                <div class="col-xs-1">
                                                    <label for="c-from-${data.id}">${data.language.real || data.language.from}</label>
                                                </div>
                                                <div class="col-xs-11">
                                                    <span class="btn-group ${data.class.form.recipients.control}">
                                                        <button type="button" class="btn btn-link btn-transparent-link btn-resized btn-link-bordered cc${data.toggle.recipients.cc}">Cc</button>
                                                        <button type="button" class="btn btn-link btn-transparent-link btn-resized btn-link-bordered bcc${data.toggle.recipients.bcc}">Bcc</button>
                                                    </span>
                                                    ${typeof data.from === 'object' ? 
                                                    `<div class="input-group c-from-input-group">
                                                        <input type="text" name="real" id="c-from-${data.id}" value="${data.from.name}" placeholder="${data.language._name}">
                                                        <span class="ltgt">&lt;</span><input type="text" name="user" value="${data.from.user}" placeholder="${data.language._username}">
                                                        <span class="input-group-addon">@${data.from.dom}&gt;</span>
                                                        <input type="hidden" name="dom" value="${data.from.dom}">
                                                    </div>` : 
                                                    data.from
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group to">
                                            <div class="flex">
                                                <div class="col-xs-1">
                                                    <label for="c-to-${data.id}">${data.language.to}</label>
                                                </div>
                                                <div class="col-xs-11">
                                                    ${data.to}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="${data.class.form.recipients.fields}">
                                            <div class="form-group cc${data.toggle.recipients.ccf}">
                                                <div class="flex">
                                                    <div class="col-xs-1">
                                                        <label for="c-cc-${data.id}">${data.language.cc}</label>
                                                    </div>
                                                    <div class="col-xs-11">
                                                        ${data.cc}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group bcc${data.toggle.recipients.bccf}">
                                                <div class="flex">
                                                    <div class="col-xs-1">
                                                        <label for="c-bcc-${data.id}">${data.language.bcc}</label>
                                                    </div>
                                                    <div class="col-xs-11">
                                                        ${data.bcc}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="flex">
                                                <div class="col-xs-1">
                                                    <label for="c-subject-${data.id}">${data.language.subject}</label>
                                                </div>
                                                <div class="col-xs-11">
                                                    ${data.subject}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="flex attachments hidden">
                                                <div class="col-xs-1">
                                                    <label for="c-attach-${data.id}">${data.language._attachments}</label>
                                                </div>
                                                <div class="col-xs-11">
                                                    ${data.attachments}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="compose-controls-block">
                                        <div class="ql-compose-container">
                                          <textarea class="${data.status.text}" ${data.class.editor.composer}="text"></textarea>
                                          <div ${data.class.editor.composer}="html" class="ql-compose ql-container-toolbar-bottom ${data.status.html}">${data.body}</div>
                                          <div id="tb-${data.id}">
                                            <span class="ql-formats">
                                              <select class="ql-font">
                                                <option value="initial" selected>${data.language._default}</option>
                                                <option value="sans-serif">Sans Serif</option>
                                                <option value="serif">Serif</option>
                                                <option value="monospace">Monospace</option>
                                              </select>
                                              <select class="ql-size">
                                                  <option value="0.75em">${data.language._font_size.small}</option>
                                                  <option selected>${data.language._font_size.normal}</option>
                                                  <option value="1.2em">${data.language._font_size.medium}</option>
                                                  <option value="1.5em">${data.language._font_size.large}</option>
                                                  <option value="2.5em">${data.language._font_size.huge}</option>
                                              </select>
                                            </span>
                                            <span class="ql-formats">
                                              <button class="ql-bold"></button>
                                              <button class="ql-italic"></button>
                                              <button class="ql-underline"></button>
                                              <select class="ql-color"></select>
                                              <select class="ql-background"></select>
                                            </span>
                                            <span class="ql-formats">
                                              <select class="ql-align"></select>
                                            </span>
                                            <span class="ql-formats">
                                              <button class="ql-list" value="ordered"></button>
                                              <button class="ql-list" value="bullet"></button>
                                            </span>
                                            <span class="ql-formats">
                                                <span class="dropup">
                                                    <button class="btn btn-default dropdown-toggle pd-0" type="button" id="extra-${data.id}" data-toggle="dropdown" aria-expanded="true">
                                                      <span class="fa fa-lg fa-menu"></span>
                                                    </button>
                                                    <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="extra-${data.id}">
                                                      <li role="presentation"><button role="menuitem" tabindex="-1" class="ql-strike"></button></li>
                                                      <li role="presentation"><button role="menuitem" tabindex="-1" class="ql-blockquote"></button></li>
                                                      <li role="presentation"><button role="menuitem" tabindex="-1" class="ql-code-block"></button></li>
                                                      <li role="presentation" class="${data.class.hidden}"><button role="menuitem" tabindex="-1" class="ql-link"></button></li>
                                                      <li role="presentation" class="${data.class.hidden}"><button role="menuitem" tabindex="-1" class="ql-image"></button></li>
                                                      <li role="presentation"><button role="menuitem" tabindex="-1" class="ql-clean"></button></li>
                                                    </ul>
                                                </span>
                                            </span>
                                          </div>
                                        </div>
                                        <div class="btn-group ${data.class.editor.controls.compose}">
                                          <button type="submit" class="btn btn-primary btn-progress">
                                            <span>
                                                <span>${data.language._send}</span>
                                                <span>
                                                    <span class="progressing"></span>
                                                </span>
                                            </span>
                                          </button>
                                          <button type="button" class="btn btn-primary dropdown-toggle ${data.status.module.schedule}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="fa fa-0_90x fa-clock"></span>
                                          </button>
                                          <ul class="dropdown-menu ${data.class.editor.scheduled} ${data.status.module.schedule}">
                                            <li><a>${$$.create.checkbox(0, 'scheduled', 1)}${data.language._scheduled}</a></li>
                                          </ul>
                                          <button type="button" class="btn btn-link btn-transparent-link ${data.class.editor.controls.extra.attach}" data-title="${data.language._attach}"><i class="fa-fw fa2 fa2-attach fa-md"></i></button>
                                          <button type="button" class="btn btn-link btn-transparent-link ${data.class.editor.controls.extra.link} ${data.status.html}" ${data.class.editor.composer}-h data-title="${data.language._insert_link}"><i class="fa-fw fa2 fa2-link fa-1_25x"></i></button>
                                          <button type="button" class="btn btn-link btn-transparent-link ${data.class.editor.controls.extra.image} ${data.status.html}" ${data.class.editor.composer}-h data-title="${data.language._insert_picture}"><i class="fa fa-fw fa-md fa-image"></i></button>
                                          <button type="button" class="btn btn-link btn-transparent-link ${data.class.editor.controls.extra.html}" data-title="${data.language._toggle}"><i class="fa fa-fw fa-md fa-html"></i></button>
                                        </div>
                                        <div class="btn-group ${data.class.editor.controls.compose} pull-right">
                                            <span class="dropup ${data.class.editor.controls.more}">
                                                <button class="btn btn-link btn-transparent-link dropdown-toggle" type="button" id="${data.class.editor.controls.more}-${data.id}" data-toggle="dropdown" aria-expanded="true">
                                                  <span class="fa fa-lg fa-dots-vertical"></span>
                                                </button>
                                                <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="${data.class.editor.controls.more}-${data.id}">
                                                  <li${status.server_file} role="presentation"><a data-value="server-attach"><i class="fa fa-fw fa-download-cloud"></i>&nbsp;&nbsp;${data.language._server_attach}</a></li>
                                                  <li${status.menu.server_file} class="divider"></li>
                                                  <li${status.menu.encrypt} class="dropdown-submenu right" role="menu">
                                                      <a tabindex="-1">${data.language._encrypt}</a>
                                                      <ul class="dropdown-menu" role="menu" data-type="encrypt">
                                                        <li data-encrypt-container>
                                                            <div class="menu-group">
                                                                <div${status.sign}>
                                                                    <label>${data.language.sign}</label>
                                                                    ${data.toggle.more.sign[1]}
                                                                </div>
                                                                <div${status.crypt}>
                                                                    <label>${data.language.crypt}</label>
                                                                    ${data.toggle.more.crypt[1]}
                                                                </div>
                                                            </div>
                                                        </li>
                                                      </ul>
                                                  </li>
                                                  <li class="dropdown-submenu right" role="menu">
                                                      <a tabindex="-1">${data.language.pri.label}</a>
                                                      <ul class="dropdown-menu" role="menu" data-type="priority">
                                                        <li><a tabindex="-1" data-value="1">${data.language.pri.data[0]}</a></li>
                                                        <li><a tabindex="-1" data-value="2">${data.language.pri.data[1]}</a></li>
                                                        <li><a tabindex="-1"><i class="fa fa-fw fa-check pull-left"></i>${data.language.pri.data[2]}</a></li>
                                                        <li><a tabindex="-1" data-value="4">${data.language.pri.data[3]}</a></li>
                                                        <li><a tabindex="-1" data-value="5">${data.language.pri.data[4]}</a></li>
                                                      </ul>
                                                  </li>
                                                  <li${status.menu.options} class="divider"></li>
                                                  <li${status.menu.options} class="dropdown-submenu right" role="menu">
                                                      <a tabindex="-1">${data.language._options}</a>
                                                      <ul class="dropdown-menu" role="menu" data-type="options">
                                                        <li${status.abook}><a tabindex="-1">${$$.create.checkbox(0, 'abook', 1, 0, value.abook)}${data.language._addrecipients}</a></li>
                                                        <li${status.dsn}><a tabindex="-1">${$$.create.checkbox(0, 'dsn', 1, value.dsn)}${data.language._notifications_dsn}</a></li>
                                                        <li${status.del}><a tabindex="-1">${$$.create.checkbox(0, 'del', 1, value.del)}${data.language._notifications_del}</a></li>
                                                      </ul>
                                                  </li>
                                                </ul>
                                            </span>
                                            <button type="button" class="btn btn-link btn-transparent-link ${data.class.editor.controls.extra.discard}" data-title="${data.language._discard}"><i class="fa fa2 fa-fw fa-sm fa2-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        `;
                    }
                }

            },

            /**
             * Creates HTML element specified by type
             *
             * @since 19.20
             *
             * @param {string} class     Class name for created element
             * @param {mixed}  data      Data attributes to pass
             * @param {string} [type]    Used tag name
             * @param {string} [content] Content of created element
             * @param {string} [icon]    Icon class name to use
             * @param {string} [tooltip] Element tooltip title to show on hover
             */
            create: {

                /**
                 * Generates element with chosen tag name
                 *
                 * @returns {string}
                 */
                $: function(classes, data, type = 'div', content = String(), tooltip = String()) {
                    let attributes = this._attributes(data);

                    classes = this._classes(classes);

                    if (tooltip) {
                        tooltip = 'data-tooltip="mailbox" data-placement="bottom" data-title="' + tooltip + '"'
                    }
                    return '<' + type + ' ' + attributes + ' ' + tooltip + ' class="' + classes + '">' + content + '</' + type + '>';
                },

                /**
                 * Generates icon element
                 *
                 * @returns {string}
                 */
                icon: function(classes, attributes = String()) {
                    let attribute = this._attributes(attributes),
                        icon = this._classes(classes);
                    return '<i class="fa ' + icon + ' ' + attribute + '"></i>';
                },

                /**
                 * Generates button element
                 *
                 * @returns {string}
                 */
                button: function(classes, data, content, icon, tooltip) {
                    icon = this._classes(icon);
                    return this.$(classes, data, 'button', ((icon ? '<i class="fa ' + icon + '"></i>&nbsp;&nbsp;' : '') + content + ''), tooltip);
                },

                /**
                 * Generates input element
                 *
                 * @returns {string}
                 */
                input: function(name = String(), placeholder = String(), value = String(), type = 'text', attributes = String()) {
                    let attribute = this._attributes(attributes),
                        id = name;
                    if (typeof name === 'object') {
                        id = name[1];
                        name = name[0];
                    }
                    return '<input ' + attribute + ' type="' + type + '" name="' + name + '" id="' + id + '" placeholder="' + placeholder + '" value="' + value + '">';
                },

                /**
                 * Generates textarea element
                 *
                 * @returns {string}
                 */
                textarea: function(name = String(), placeholder = String(), value = String(), attributes = String()) {
                    let attribute = this._attributes(attributes),
                        id = name;
                    if (typeof name === 'object') {
                        id = name[1];
                        name = name[0];
                    }
                    return '<textarea ' + attribute + ' name="' + name + '" id="' + id + '" placeholder="' + placeholder + '">' + value + '</textarea>';
                },

                /**
                 * Generates label element
                 *
                 * @returns {string}
                 */
                label: function(target = String(), content = String(), attributes = String()) {
                    let attribute = this._attributes(attributes);
                    return '<label ' + attribute + ' for="' + target + '">' + content + '</label>';
                },

                /**
                 * Generates select element
                 *
                 * @returns {string}
                 */
                select: function(data, attributes = String(), name = String()) {
                    let attribute = this._attributes(attributes),
                        select = '<select ' + attribute + ' name="' + name + '">';
                    for (let [value, text] of Object.entries(data[0])) {
                        select += '<option value="' + value + '"' + (data[1] && data[1] == value ? ' selected' : String()) + '>' + text + '</option>';
                    }
                    select += '</select>';
                    return select;
                },

                /**
                 * Generates checkbox element
                 *
                 * @returns {string}
                 */
                checkbox: function(attributes = String(), name = String(), value = String(), label = '&nbsp;', checked = String()) {
                    let attribute = this._attributes(attributes),
                        checkbox = String(),
                        id = name + '-' + Math.floor(Math.random() * 9e10);

                    !label && (label = '&nbsp;');
                    checked && (checked = 'checked')
                    checkbox += '<span ' + attribute + ' class="awcheckbox awobject">';
                    checkbox += '<input class="iawobject" ' + checked + ' type="checkbox" name="' + name + '" value="' + value + '" id="' + id + '">';
                    checkbox += '<label class="lawobject" for="' + id + '">' + label + '</label>';
                    checkbox += '</span>';
                    return checkbox;
                },

                /**
                 * Generates radio element
                 *
                 * @returns {string}
                 */
                radio: function(attributes = String(), name = String(), value = String(), label = '&nbsp;', id = String(), checked = String()) {
                    let attribute = this._attributes(attributes),
                        checkbox = String();
                    checkbox += '<span ' + attribute + ' class="awradio awobject">';
                    checkbox += '<input class="iawobject" ' + checked + ' type="radio" name="' + name + '" value="' + value + '" id="' + id + '">';
                    checkbox += '<label class="lawobject" for="' + id + '">' + label + '</label>';
                    checkbox += '</span>';
                    return checkbox;
                },

                /**
                 * Generates dropdown element
                 *
                 * @returns {string}
                 */
                dropdown: function(classes, data, button, icon, tooltip) {
                    let dropdown = String();
                    classes = this._classes(classes);
                    dropdown += '<div class="btn-group ' + classes + '">';

                    if (button) {
                        if (/<[a-z][\s\S]*>/i.test(button)) {
                            dropdown += this.$('layout.button.default', false, 'span', button);
                        } else {
                            dropdown += this.button('layout.button.default', false, button);
                        }
                    }
                    dropdown += this.button('layout.button.dropdown.default', {
                        'toggle': 'dropdown'
                    }, '<span class="' + (icon ? ('fa ' + $$.$.controls[icon].icon) : 'caret') + '"></span>', false, tooltip);
                    dropdown += '<ul class="dropdown-menu" role="menu">';
                    for (let [i, v] of data[0].entries()) {
                        if (v) {
                            dropdown += '<li>' + v + '</li>';
                        }
                        if (data[i - 1] && data[1] && data[1] === (i + 1) && data[0].length > data[1]) {
                            dropdown += '<li role="separator" class="divider"></li>';
                        }
                    }
                    dropdown += '</ul>';
                    dropdown += '</div>';
                    return (data[0].length ? dropdown : String());
                },

                /**
                 * Converts passed object of attributes to string representation
                 *
                 * @param {object} data Array or hash to convert to string
                 *
                 * @example ['href="value"', 'title="value"'] or {type: value, title: value}.
                 *
                 * @returns {string}
                 */
                _attributes: function(data) {
                    let attributes = String();

                    if (Array.isArray(data)) {
                        attributes = data.join(' ');
                    } else if (data) {
                        attributes = Object.entries(data).map(([k, v]) => (attributes += (k.startsWith('data-') ? k : ('data-' + k)) + '=' + v + ' ')).slice(-1)[0];
                    }
                    return attributes;
                },

                /**
                 * Converts passed selector to correspondent class name from the component template
                 *
                 * @returns {string}
                 */
                _classes: function(classes) {
                    return classes ? (classes.split('.').reduce((a, b) => {
                        return a ? a[b] : undefined;
                    }, $$.$)) : String();
                },
            },

            /**
             * Returns selector name derived from the component template
             *
             * @returns {string}
             */
            selector: function(selector) {
                selector = this.create._classes(selector);
                return selector.startsWith('[') ? selector :
                    "." + selector.replace(/\s+/g, ".")

            },

            /**
             * Returns DOM object based on passed selector
             *
             * @returns {object}
             */
            element: function(element) {
                return element ? $(this.selector(element)) : String();
            },

        }
    /**
     * Imports configs
     */
    const config = {
            d: {},
            set: function(config) {
                this.d = config;
            }
        },

        /**
         * Compose object sub-module ;;
         *
         * @since 19.40
         *
         * @return {object} Reveals compose module API
         */
        compose = (function() {
            let xtarget = {};
            xtarget.send = 'send_mail.cgi';
            xtarget.reply = 'reply_mail.cgi';

            // Load dependencies
            _.load.bundle(['jquery.jspanel', 'quill'], 1);

            /**
             * Creates new compose message dialog
             *
             * @param {object}  [form]   Refers to form data in case of replied message
             * @param {boolean} [inline] Returns composer without panel
             * @param {object}  [types]  Sets composer type for reply all and forward
             *
             * @returns {string}
             */
            const message = (form = false, inline = false, types = {}) => {
                let path = _.path.prefix,
                    cmodule = _.variable.module.name(),
                    prefix = `${path}/${cmodule}`;

                xtarget.getSize = `${path}/index.cgi/?xhr-get_size=1&xhr-get_size_nodir=1&xhr-get_size_path=`;
                xtarget.delete = `${prefix}/delete_mail.cgi?confirm=1&delete=1&noredirect=1`;
                xtarget.schedule = `${path}/schedule/save.cgi`;
                xtarget.addressBook = `${prefix}/export.cgi?fmt=csv&dup=0&incgr=1`;

                if (typeof form === 'object' && form.length) {
                    form = $(form).serialize() + '&reply=1';
                    types.new = 0;
                } else {
                    form = 'new=1';
                    types.new = 1;
                }

                // Check for message type
                if (types.reply_all) {
                    form += '&rall=1';
                } else if (types.forward) {
                    form += '&forward=1';
                }

                // Get reply form as provided
                fetch(`${prefix}/${xtarget.reply}?${form}`)
                    .then(rs => {
                        return rs.text();
                    }).then(rs => {

                        // Reply data for further send mail
                        let $form = $(rs).find(`[action*="${xtarget.send}"]`),
                            generate = {
                                timestamp: () => {
                                    return _.plugin.moment().valueOf() * 1e2
                                },
                                random: () => {
                                    return Math.floor(Math.random() * 9e14);
                                }
                            },
                            id = generate.timestamp(),
                            form_data_lost = $form.find(':checkbox:not(:checked)').attr('value', '0').prop('checked', true).map(function() {
                                return this.name
                            }).get(),
                            form_data = $form.serialize();

                        if (form_data) {
                            form_data = _.plugin.serialized_to_json(form_data);

                            let
                                // Object data for extracted fields
                                data = {
                                    visible: {},
                                    hidden: {},
                                },
                                classes = $$.$.compose,

                                toggle = {
                                    // Toggle visibility of extra fields and its controllers
                                    recipients: (id, data, data_visible) => {
                                        if (typeof data === 'object') {
                                            let target = data[0],
                                                state = data[1],
                                                rcs = `.${classes.form.recipients.control}`,
                                                rcsf = `.${classes.form.recipients.fields}`,
                                                rc = target.querySelector(rcs),
                                                rf = target.querySelector(rcsf);

                                            rc.querySelector(`.${id}`).classList.toggle(classes.button.inverse, !state)
                                            rf.querySelector(`.${id}`).classList.toggle(classes.hidden, state)
                                            return;
                                        } else if (data === 'rc') {
                                            return !data_visible[id] ? String() : ` ${classes.button.inverse}`
                                        } else if (data === 'rf') {
                                            return data_visible[id] ? String() : ` ${classes.hidden}`
                                        }
                                    },

                                    // Toggle visibility of attachment field
                                    attachments: (panel) => {
                                        let a = panel.querySelector(`[name="${classes.form.name.tattach}"]`),
                                            l = a.previousSibling.querySelectorAll('.tag').length;
                                        a.parentNode.parentNode.classList.toggle(classes.hidden, !l);
                                        adjust.contenteditable(panel);
                                    },

                                    // Add backdrop for maximized panel
                                    backdrop: (panel, show) => {
                                        let body = $('body'),
                                            re_zi = 99999,
                                            compose_backdrop = classes.panel.backdrop;

                                        if (show) {
                                            panel[0].dataset.zIndex = panel[0].style.zIndex;
                                            panel[0].style.zIndex = re_zi + 1;
                                            panel[0].setAttribute('maximized', 1);
                                            body.append(`<div class="modal-backdrop fade2 in zi-${re_zi} ${compose_backdrop}"></div>`)
                                        } else {
                                            if (panel[0]) {
                                                panel[0].style.zIndex = panel[0].dataset.zIndex;
                                                panel[0].removeAttribute('maximized');
                                                delete panel[0].dataset.zIndex;
                                            }
                                            body.find(`.modal-backdrop.${compose_backdrop}`).remove();
                                        }
                                    },

                                    // Toggle HTML/text input
                                    formatting: (target, status) => {
                                        let es = classes.editor.composer,
                                            eb = target.querySelectorAll(`[${es}-h]`),
                                            ed = target.querySelectorAll(`[${es}]`);

                                        eb.forEach((b) => {
                                            b.classList.toggle(classes.hidden, !status);
                                        })

                                        ed.forEach((e) => {
                                            if (e.getAttribute(es) === 'text') {
                                                e.classList.toggle(classes.hidden, status)
                                            } else {
                                                e.classList.toggle(classes.hidden, !status)
                                            }
                                        })
                                        adjust.contenteditable(target);
                                    },
                                },
                                adjust = {

                                    // Adjust the size of editable area
                                    contenteditable: (panel) => {
                                        let target = panel.querySelector(`.${classes.panel.content}`),
                                            container = target ? target.offsetHeight : window.innerHeight / 4,
                                            top_block = panel.querySelector(`.${classes.form.header}`).offsetHeight,
                                            editor_toolbar = panel.querySelector(`.${classes.editor.toolbar}`).offsetHeight,
                                            editor = panel.querySelector(`[${classes.editor.composer}]:not(.${classes.hidden})`),
                                            offset = 50 + editor_toolbar,
                                            height = `${container - top_block - offset}px`;
                                        editor.style.height = height;
                                    },

                                    // Define modifier key
                                    modifier: (str) => {
                                        return str.replace(/%cmd/, _.platform.mac ? 'Cmd' : 'Ctrl');
                                    }
                                },
                                check = {
                                    field: (field, object) => {
                                        let value = object[field];
                                        if (value && !isNaN(value)) {
                                            value = ~~value;
                                        }
                                        return typeof value === 'undefined' ? null : value
                                    },
                                },
                                element = {
                                    input: (str, data, readonly = false, no_escape = false, type = 'text') => {
                                        let value = (typeof data === 'object' ? data[str] : data);
                                        if (readonly) {
                                            readonly = ['readonly'];
                                        }
                                        if (!no_escape) {
                                            value = _.plugin.html_escape(value);
                                        }
                                        return $$.create.input([str, `c-${str}-${id}`], String(), value, type, readonly);
                                    },
                                    select: {},
                                    type: {
                                        time: () => {
                                            let ct = new Date(),
                                                format = (s) => {
                                                    return ('0' + s).substr(-2)
                                                },
                                                round = (m) => {
                                                    let r = Math.ceil(m / 10) * 10;
                                                    return r === 60 ? r - 5 : r;
                                                },
                                                h = format(ct.getHours()),
                                                m = round(format(ct.getMinutes()));
                                            return `<input type="time" name="time" step="300" value="${h}:${m}">`;
                                        },
                                        date: () => {
                                            let ct = new Date(),
                                                y = ct.getFullYear(),
                                                m = ct.getMonth() + 1,
                                                d = ct.getDate();
                                            return `<input type="text" name="date" data-value="${y}-${m}-${d}">`;
                                        }
                                    },
                                    composer: function(target) {
                                        let panel = target,
                                            paneled = panel.header ? true : false,
                                            config_html = {
                                                allowed: parseInt(data.hidden.html_edit),
                                                initial: parseInt(data.hidden.html_edit_config),
                                            },
                                            config_update = function(option, value) {
                                                _.update_mdata("/uconfig.cgi?mailbox", "/uconfig_save.cgi", {
                                                    [option]: value
                                                })
                                            },
                                            qs = Quill.import('attributors/style/size'),
                                            qf = Quill.import('attributors/style/font');

                                        // Quill: assign font-size and font-family, rather than using classes
                                        qs.whitelist = ["0.75em", "1.2em", "1.5em", "2.5em"];
                                        qf.whitelist = ["initial", "sans-serif", "serif", "monospace"];
                                        Quill.register(qs, true);
                                        Quill.register(qf, true);

                                        // Redefine the actual target
                                        target = target[0];


                                        let asb = target.querySelector(`.${classes.form.header}`),
                                            ccs = target.querySelectorAll(`.${classes.editor.controls.compose}`),
                                            rcs = target.querySelector(`.${classes.form.recipients.control}`),
                                            qtg = target.querySelector(`.${classes.editor.compose}`),
                                            tcm = target.querySelector(`[${classes.editor.composer}="text"]`),
                                            editor = {
                                                this: new Quill(qtg, {
                                                    modules: {
                                                        formula: false,
                                                        syntax: false,
                                                        imageDrop: true,
                                                        toolbar: target.querySelector(`#tb-${id}`),
                                                    },
                                                    bounds: target,
                                                    theme: 'snow'
                                                }),
                                                get: {
                                                    text: () => {
                                                        return tcm.value
                                                    },
                                                    html: () => {
                                                        return editor.this.root.innerHTML
                                                    },
                                                    data: () => {
                                                        return config_html.allowed ? editor.get.html() : editor.get.text();
                                                    },
                                                },
                                                convert: () => {
                                                    let he = editor.this,
                                                        te = he.root.parentElement.previousElementSibling;

                                                    if (config_html.allowed) {
                                                        he.setText(te.value);
                                                    } else {
                                                        te.value = he.getText();
                                                    }
                                                },
                                                maximized: () => {
                                                    return target.hasAttribute('maximized');
                                                }
                                            },

                                            // Update message title dynamically
                                            title_update = function(ds) {
                                                let sf = asb.querySelector('[name="subject"]'),

                                                    // Trigger title update
                                                    ud = () => {
                                                        sf.dispatchEvent(new Event('input'));
                                                    },

                                                    // Change opacity for notifications
                                                    us = (tg, df) => {
                                                        if (paneled) {
                                                            tg.style.opacity = (df ? 0.7 : 1);
                                                        }
                                                    },

                                                    // Display draft processing notifications
                                                    du = (tg) => {

                                                        if (ds === 1) {
                                                            tg.textContent = _.lang('mail_composer_draft_saving');
                                                            us(tg, true);
                                                        } else if (ds === -1) {
                                                            tg.textContent = _.lang('mail_composer_draft_saved');
                                                            us(tg, true);

                                                            // Change status back to original title
                                                            setTimeout(() => {
                                                                us(tg);
                                                                ud();
                                                            }, 2e3)
                                                        }
                                                    }

                                                if (paneled) {
                                                    let pt = panel.header.title[0],
                                                        pti = pt.textContent;
                                                    if (ds) {
                                                        du(pt, pti);
                                                    } else {
                                                        sf.addEventListener('input', function() {
                                                            pt.textContent = this.value || pti;
                                                        })

                                                        // Update subject on initial load for replied mail
                                                        ud();
                                                    }
                                                }
                                            };

                                        paneled && target.classList.add(classes.panel.container, classes.panel.container_shown);
                                        adjust.contenteditable(target);

                                        // Reflect subject in panel title if exists
                                        title_update();

                                        // Toggle HTML/text editor state
                                        let ctl_tgl = ccs[0].querySelector(`.${classes.editor.controls.extra.html}`);
                                        ctl_tgl.addEventListener('click', () => {
                                            let st = parseInt(config_html.allowed) || 0,
                                                ia = parseInt(config_html.initial) || 0,
                                                sg = +!st,
                                                co = sg ? 2 : (ia === 1 ? 1 : 0);

                                            toggle.formatting(target, sg);
                                            config_html.allowed = sg;

                                            // Change actual config option
                                            config_update('html_edit', co);

                                            // Convert current message to make sure HTML is removed
                                            editor.convert();
                                        })

                                        // Event to automatically adjust adjust real name and username
                                        let from_from = target.querySelector('input[name="from"]:not(disabled)'),
                                            from_name = target.querySelector('input[name="real"]'),
                                            from_user = target.querySelector('input[name="user"]');
                                        if (from_name && from_user) {
                                            $.fn.eW = function(text, font) {
                                                if (!$.fn.eW.fakeEl) {
                                                    $.fn.eW.fakeEl = $('<span data-eW>').hide().appendTo(document.body);
                                                }
                                                $.fn.eW.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
                                                return $.fn.eW.fakeEl.width() + 7;
                                            };
                                            [from_name, from_user].forEach((i, n) => {
                                                i.addEventListener('input', function() {
                                                    $(this).css({ width: parseInt($(this).eW() + (!n && 3)) })
                                                });
                                                i.dispatchEvent(new Event('input'));
                                            })
                                        }

                                        // Focus editable from input
                                        let from_focus = from_from || from_name;
                                        if (from_focus) {
                                            from_focus.focus();
                                            from_focus.setSelectionRange(-1, -1);
                                        }

                                        // Register controls and its events
                                        setTimeout(() => {
                                            let tb = editor.this.options.modules.toolbar.container,
                                                upload_list = [],
                                                server_list = [],
                                                priority = null,
                                                server_attach_previous = null,
                                                attachments = target.querySelector(`[name="${classes.form.name.tattach}"]`),
                                                content = target.querySelector(`.${classes.editor.content}`),
                                                ctl_att = ccs[0].querySelector(`.${classes.editor.controls.extra.attach}`),
                                                ctl_lnk = ccs[0].querySelector(`.${classes.editor.controls.extra.link}`),
                                                ctl_img = ccs[0].querySelector(`.${classes.editor.controls.extra.image}`),
                                                ctl_dis = ccs[1].querySelector(`.${classes.editor.controls.extra.discard}`),
                                                submit = target.querySelector('button[type="submit"]'),
                                                to_ = target.querySelector('input[name="to"]'),
                                                cc_ = target.querySelector('input[name="cc"]'),
                                                bcc_ = target.querySelector('input[name="bcc"]'),
                                                $more_options = $(target).find(`.${classes.editor.controls.more}`),

                                                scheduled = {
                                                    target: target.querySelector(`[name="${classes.form.name.scheduled}"]`),
                                                    container: target.querySelector(`.${classes.editor.scheduled}`),
                                                    events: function() {

                                                        // Event to prevent closing dropdown for scheduled mail
                                                        this.container.addEventListener('click', (event) => {
                                                            event.stopPropagation();
                                                        });

                                                        // Event to change send/scheduled label for submit button
                                                        this.checkbox().addEventListener('click', function() {
                                                            let s = submit,
                                                                t = s.querySelector('span').querySelector('span'),
                                                                ct = _.lang('mail_composer_schedule'),
                                                                c = this.checked,
                                                                sb = classes.button.submit,
                                                                sc = classes.button.schedule,
                                                                d = s.nextElementSibling,
                                                                st = language._send;

                                                            s.classList.toggle(sc, c);
                                                            s.classList.toggle(sb, !c);
                                                            d.classList.toggle(sc, c);
                                                            d.classList.toggle(sb, !c);
                                                            t.textContent = c ? ct : st;
                                                        });

                                                        // Initialize date picker
                                                        this.datepicker();
                                                    },
                                                    status: function() {
                                                        return this.target.checked;
                                                    },
                                                    checkbox: function() {
                                                        return this.container.querySelector('[type="checkbox"]');
                                                    },
                                                    holder: function() {
                                                        return this.container.querySelector('[data-t]');
                                                    },
                                                    datepicker: function() {

                                                        let tag = this.holder(),
                                                            input = tag.previousSibling;

                                                        // Event to handle change date for scheduled mail
                                                        tag.addEventListener('click', function() {
                                                            $(input).datepicker('show');
                                                        });

                                                        $(input).datepicker({
                                                            language: _.sdata("language"),
                                                            todayHighlight: true,
                                                            autoclose: true,
                                                            startDate: "0d",
                                                        }).on("changeDate", function(l) {
                                                            let today = _.lang('global_today').toLowerCase(),
                                                                tomorrow = _.lang('global_tomorrow').toLowerCase(),
                                                                label = today,
                                                                now = new Date(),
                                                                y = now.getFullYear(),
                                                                m = now.getMonth() + 1,
                                                                d = now.getDate(),
                                                                py = l.date.getFullYear(),
                                                                pm = l.date.getMonth() + 1,
                                                                pd = l.date.getDate(),
                                                                date = l.dates[0],
                                                                date_ = py + '-' + pm + '-' + pd,
                                                                date_formatted = moment(date).format(_.variable.locale.short);

                                                            this.dataset.value = date_;

                                                            if (
                                                                y === py && m === pm &&
                                                                (d === pd || d + 1 === pd)
                                                            ) {
                                                                if (d + 1 === pd) {
                                                                    label = tomorrow
                                                                }
                                                            } else {
                                                                label = date_formatted
                                                            }

                                                            tag.textContent = label
                                                        })
                                                    }
                                                },

                                                draft = {

                                                    timeout: {
                                                        update: null,
                                                        discard: null,
                                                    },

                                                    // Draft data
                                                    data: [],

                                                    // Reset draft data
                                                    reset: function() {
                                                        let folder = this.data[0];
                                                        this.data = [];
                                                        if (folder) {
                                                            this.data.push(folder);
                                                        }
                                                    },

                                                    // Test draft data
                                                    test: function() {
                                                        return this.data.length >= 1;
                                                    },

                                                    // Initiate draft save
                                                    save: function() {
                                                        this.terminate();
                                                        this.timeout.update = setTimeout(() => {
                                                            submit.dispatchEvent(new Event('click'));
                                                        }, 2e3);
                                                    },

                                                    // Terminate draft save
                                                    terminate: function() {
                                                        typeof this.timeout.update === 'number' &&
                                                            clearTimeout(this.timeout.update);
                                                    },

                                                    // Discard the draft
                                                    purge: function(id, folder, message) {
                                                        fetch(`${xtarget.delete}&id=${id}&folder=${folder}&d=${message}`).then(r => {
                                                            r.text().then(() => {
                                                                draft.refresh();
                                                            });
                                                        })
                                                    },

                                                    // Update draft folder's content if opened
                                                    refresh: function() {
                                                        if (this.test() && folders.check(this.data[0])) {
                                                            folders.refresh();
                                                        }
                                                    },

                                                    clean: function() {
                                                        this.test() && this.purge(this.data[0], this.data[1], this.data[3]);
                                                        this.reset();
                                                        this.terminate();
                                                    },

                                                    control: {

                                                        // Schedule draft for discard
                                                        discard: function() {
                                                            editor.maximized() && panel.normalize();
                                                            draft.timeout.discard = setTimeout(() => {
                                                                draft.test() && draft.purge(draft.data[0], draft.data[1], draft.data[3]);
                                                                draft.reset();
                                                                draft.terminate();
                                                                paneled && panel.close();
                                                            }, 5e3);
                                                        },

                                                        // Undo discarded draft
                                                        undo: function() {
                                                            target.classList.remove(classes.hidden);
                                                            typeof draft.timeout.discard === 'number' &&
                                                                clearTimeout(draft.timeout.discard);
                                                        },
                                                    }

                                                },

                                                // Process added attachment
                                                add_attachment = (type, id, filedata, size, update) => {

                                                    let icon = (type === 'server' ? classes.icons.upload.server : classes.icons.upload.attach),
                                                        name = filedata.name.split("/").pop() || filedata.name;

                                                    $(attachments).tagsinput('add', `[i class="${icon}"][/i]${name} [em](${_.plugin.nice_size(size)})[/em]`);

                                                    // Register reference for inserted tag
                                                    let tags = attachments.previousSibling.querySelectorAll('.tag'),
                                                        last = tags[tags.length - 1];
                                                    last.dataset.reference = id;

                                                    // Store uploaded/attached file
                                                    if (type === 'server') {
                                                        server_list[id] = filedata.name;
                                                    } else {
                                                        upload_list[id] = filedata.file;
                                                    }

                                                    // Update editor on last
                                                    if (update) {
                                                        adjust.contenteditable(target)
                                                        toggle.attachments(target);
                                                    }
                                                };

                                            // Event for external insert link to editor button
                                            ctl_lnk.addEventListener('click', () => {
                                                tb.querySelector(`.${classes.editor.tb_link}`).dispatchEvent(new Event('click'));
                                            })

                                            // Event for external add images to editor button
                                            ctl_img.addEventListener('click', () => {
                                                tb.querySelector(`.${classes.editor.tb_image}`).dispatchEvent(new Event('click'));
                                            })

                                            // Event for discarding the draft
                                            ctl_dis.addEventListener('click', () => {
                                                draft.control.discard();
                                                let undo = {
                                                    cancel: {
                                                        label: _.lang('global_undo'),
                                                        action: function() {
                                                            this.hide();
                                                            draft.control.undo();
                                                        }
                                                    }
                                                };
                                                _.notification([$$.$.notification.type.trash, _.lang('mail_composer_discarded_draft')], 5, "warning", `discard-${id}`, 1, ['bottom', 'center'], undo);
                                                target.classList.add(classes.hidden);
                                            })

                                            // Event for controlling visibility of extra recipients fields
                                            rcs.querySelectorAll('button').forEach((b) => {
                                                b.addEventListener('click', () => {
                                                    let enabled = b.classList.contains(classes.button.inverse),
                                                        type = b.classList.contains("bcc") ? 'bcc' : 'cc';
                                                    toggle.recipients(type, [target, enabled]);
                                                    adjust.contenteditable(target);
                                                });
                                            })

                                            // Event for attaching new file(s)
                                            ctl_att.addEventListener('click', () => {
                                                let form = target.querySelector('form'),
                                                    xu = document.createElement('input');

                                                // Create temporary file input and listen for change
                                                xu.type = "file";
                                                xu.setAttribute('multiple', 1);
                                                xu.classList.add(classes.hidden);
                                                xu = form.appendChild(xu);
                                                xu.click();
                                                xu.addEventListener('change', function() {
                                                    Array.from(this.files).forEach((file, i, arr) => {
                                                        let fuid = generate.random() + i,
                                                            size = file.size,
                                                            name = file.name,
                                                            last = (i === arr.length - 1);
                                                        add_attachment('upload', fuid, { name: name, file: file }, size, last);
                                                        last && xu.remove();
                                                    })
                                                })
                                            })

                                            // Events to manage more options menu
                                            $more_options.find('.dropdown-menu').on("click.bs.dropdown", function(event) {

                                                let type = this.dataset.type,
                                                    etarget = event.target,
                                                    action = etarget.dataset.value;

                                                // Attach new file from server
                                                if (action === 'server-attach') {
                                                    let error = {
                                                        read: _.lang('mail_composer_server_attach_error_read'),
                                                        dir: _.lang('mail_composer_server_attach_error_dir')
                                                    };

                                                    _.file_chooser({
                                                        file: server_attach_previous
                                                    }).then(file => {
                                                        if (file) {
                                                            let suid = generate.random();
                                                            fetch(xtarget.getSize + file).then(r => {
                                                                r.text().then(rs => {
                                                                    let s = rs.split(`|`),
                                                                        size = s[1].replace(/\s+/g, String());
                                                                    if (size == -1 || size == -2) {
                                                                        let message = size == -1 ? error.read : error.dir
                                                                        _.notification([$$.$.notification.danger, message], 10, "error", 0, 1, ['bottom', 'center'])
                                                                    } else {
                                                                        add_attachment('server', suid, { name: file }, size, true);
                                                                    }
                                                                });
                                                            })
                                                        }
                                                        server_attach_previous = file;
                                                    });
                                                    return
                                                }

                                                // Prevent closing dropdown menu on click for all other
                                                event.stopPropagation();

                                                // Change message priority
                                                if (type === 'priority') {
                                                    let check = etarget.closest('ul').querySelector('i');
                                                    check.remove();
                                                    etarget.appendChild(check);
                                                    priority = action ? ~~action : null;
                                                }

                                                // Toggle options checkboxes
                                                if (type === 'options') {
                                                    let cb = etarget.querySelector('input[type="checkbox"]');
                                                    cb && (cb.checked ^= 1);
                                                }
                                            });

                                            // Init attachment tags input
                                            $(attachments).tagsinput({
                                                allowDuplicates: true,
                                                confirmKeys: [13],
                                                delimiter: '\\000',
                                            });

                                            // Remove actual attachments upon removing a tag
                                            $(attachments).on('itemRemoved', (event) => {
                                                let item = event.item[1];
                                                if (item) {
                                                    delete upload_list[item];
                                                    delete server_list[item];
                                                }
                                                toggle.attachments(target);
                                            });

                                            // Init tooltip for compose controls
                                            _.plugin.tooltip($(ctl_att)
                                                .add(ctl_img)
                                                .add(ctl_att)
                                                .add(ctl_lnk)
                                                .add(ctl_tgl)
                                                .add(ctl_dis)
                                            );

                                            // Create tooltip for editor controls
                                            let editor_controls = [
                                                'font',
                                                'size',
                                                'bold',
                                                'italic',
                                                'underline',
                                                'color',
                                                'background',
                                                'align',
                                                { 'list': 'ordered' },
                                                { 'list': 'bullet' },
                                                'strike',
                                                'blockquote',
                                                'code-block',
                                                'link',
                                                'clean',
                                            ]
                                            editor_controls.forEach((v) => {
                                                let button,
                                                    key,
                                                    value,
                                                    language = 'editor_tb';

                                                if (typeof v === 'object') {
                                                    key = Object.keys(v)[0];
                                                    value = `${key}[value="${v[key]}"]`;
                                                    language += `_${key}_${v[key]}`;
                                                } else {
                                                    value = v;
                                                    language += `_${v}`;
                                                }

                                                button = tb.querySelector(`.ql-${value}`)
                                                button.dataset.title = adjust.modifier(_.lang(language));
                                                _.plugin.tooltip($(button))
                                            })

                                            // Event to handle change in header
                                            asb.addEventListener('input', function() {

                                                // Save the draft
                                                draft.save();
                                            })

                                            // Event to prevent default submit on input fields
                                            asb.querySelectorAll('input').forEach((input) => {
                                                input.addEventListener('keydown', (event) => {
                                                    if (event.keyCode === 13) {
                                                        event.preventDefault();
                                                        return
                                                    }
                                                    draft.save();
                                                });
                                            })

                                            // Event to handle content change in HTML body
                                            editor.this.on('text-change', function() {

                                                // Save the draft
                                                draft.save();
                                            })

                                            // Event to handle content change in text body
                                            tcm.addEventListener('input', function() {

                                                // Save the draft
                                                draft.save();
                                            })

                                            // Scheduled mail events
                                            scheduled.events();

                                            // Bring address book autocompletion
                                            fetch(xtarget.addressBook)
                                                .then(function(rs) {
                                                    return rs.text();
                                                })
                                                .then(function(d) {

                                                    [to_, cc_, bcc_].forEach(input => {

                                                        // Bind tags input
                                                        let tags = $(input).tagsinput({
                                                            confirmKeys: [13, 32],
                                                            addOnBlur: false,
                                                            cancelConfirmKeysOnEmpty: false,
                                                            tagClass: 'label recipient'
                                                        });

                                                        // Initialize autocomplete on received data,
                                                        // if there is something in user's address book
                                                        let a = _.lang('theme_xhred_global_alias'),
                                                            b = d.match(/"(.*)","(.*)"/gm);
                                                        if (b) {
                                                            let book = [];
                                                            b.map(function(en) {
                                                                let gr = en.match(/"-","(.*)"/),
                                                                    em = en.match(/"(.*)","(.*)"/);
                                                                if (gr) {
                                                                    book.push(a + " <" + em[2] + ">");
                                                                } else if (em) {
                                                                    book.push(em[2] + " <" + em[1] + ">");
                                                                }
                                                            });

                                                            !$.isEmptyObject(book) && tags[0].$input.autocomplete({
                                                                lookup: book,
                                                                autoSelectFirst: true,
                                                                position: 'relative',
                                                                appendTo: tags[0].$container,
                                                                onSelect: function(m) {
                                                                    $(input).tagsinput('add', m.value);
                                                                    this.value = String();
                                                                }
                                                            });
                                                        }

                                                        $(input)

                                                            .on('itemAdded itemRemoved', function(event) {

                                                                // Soft validate email address
                                                                let email = event.item,
                                                                    contact;
                                                                if (email) {
                                                                    contact = email.match(/<(.*)>/);
                                                                    if (contact) {
                                                                        email = contact[1];
                                                                    }
                                                                    if (!event.item.startsWith(a) && event.type === 'itemAdded' && !/.+@.+\..+/.test(email)) {
                                                                        $(event.target.previousSibling).find('.recipient').last().addClass('error')
                                                                    }
                                                                }

                                                                // Adjust the container size on adding/removing recipient
                                                                adjust.contenteditable(target);

                                                            })

                                                        // Imitate tab keypress to generate the tag as well
                                                        tags[0].$input.on('keydown blur', function(event) {
                                                            let value = this.value;
                                                            if (event.keyCode === 9 || (event.type === 'blur' && event.relatedTarget)) {

                                                                // Dispatch event to complete the tag
                                                                $(this).trigger(_.event.generate('keypress', 32));

                                                                // Adjust the container size on adding/removing recipient
                                                                adjust.contenteditable(target);

                                                                if (value) {
                                                                    event.preventDefault();
                                                                }
                                                            }
                                                        });
                                                    })
                                                });

                                            // Submitting mail
                                            submit.addEventListener('click', function(event) {
                                                event.preventDefault();

                                                let form = this.closest('form'),
                                                    form_data = new FormData(form),
                                                    trusted = event.isTrusted || ~~submit.dataset.isTrusted,
                                                    draft_status = !trusted;

                                                // Reset trusted state for submit
                                                this.dataset.isTrusted = 0;

                                                // Terminate draft event in case mail is actually submitted
                                                if (trusted) {
                                                    draft.terminate();
                                                }

                                                // Add message body
                                                form_data.append('body', editor.get.data());

                                                // Set message priority
                                                let pri_key = 'pri'
                                                priority ? form_data.set(pri_key, priority) : form_data.delete(pri_key);

                                                // Add hidden entries except ones already in the form
                                                Object.entries(data.hidden).forEach((e) => {
                                                    let key = e[0],
                                                        value = e[1];
                                                    if (!form_data.has(key)) {
                                                        form_data.set(key, value)
                                                    }
                                                });

                                                // Add file uploads
                                                let fsus = Object.values(upload_list);
                                                fsus.length && fsus.forEach((f, i) => {
                                                    form_data.set(`attach${i}`, f)
                                                });

                                                // Add server attachments
                                                let ssus = Object.values(server_list);
                                                ssus.length &&
                                                    ssus.forEach((f, i) => {
                                                        form_data.set(`file${i}`, f)
                                                    });

                                                // Update HTML/text mode status
                                                form_data.set('html_edit', config_html.allowed);

                                                // Force disable spellcheck for new mail composer
                                                form_data.set('spell', 0);

                                                // Check for draft
                                                draft_status && (
                                                    form_data.set('new', 0),
                                                    form_data.set('enew', 1),
                                                    form_data.set('save', 1),
                                                    title_update(1)
                                                );

                                                // Prepare scheduled mail
                                                let schedule = {
                                                    date: {
                                                        get: function(d) {
                                                            let date = this.value,
                                                                t = scheduled.container.querySelector('[name="date"]');
                                                            if (t) {
                                                                date = t.dataset.value.split('-');
                                                            }
                                                            return d === 'y' ? ~~date[0] : d === 'm' ? ~~date[1] : ~~date[2];
                                                        }
                                                    },
                                                    time: {
                                                        value: scheduled.container.querySelector('[type="time"]').value,
                                                        get: function(t) {
                                                            let time = ['12', '00'];
                                                            if (this.value) {
                                                                time = this.value.split(':');
                                                            }
                                                            return t === 'h' ? ~~time[0] : ~~time[1];
                                                        }
                                                    }
                                                }

                                                if (scheduled.status() && !draft_status) {
                                                    let m = {
                                                        body: 'mail',
                                                        is_html: config_html.allowed,
                                                        delete_after: 1,
                                                        enabled: 1,
                                                        status: 1,
                                                        mode: 1,
                                                        hour: schedule.time.get('h'),
                                                        min: schedule.time.get('m'),
                                                        day: schedule.date.get('d'),
                                                        month: schedule.date.get('m'),
                                                        year: schedule.date.get('y'),
                                                    }

                                                    // Extens submitted form data
                                                    Object.entries(m).forEach(function(e, i) {
                                                        if (i) {
                                                            form_data.set(e[0], e[1])
                                                        } else {
                                                            form_data.set(e[1], form_data.get(e[0]));
                                                            form_data.delete(e[0]);
                                                        }
                                                    })
                                                }

                                                // Post mail data
                                                let xhr = new XMLHttpRequest(),
                                                    link = ((scheduled.status() && !draft_status) ? xtarget.schedule : form.getAttribute('action'));
                                                xhr.open("POST", link);
                                                xhr.upload.onprogress = (e) => {
                                                    !draft_status &&
                                                        (
                                                            _.button.progress(this, Math.ceil((e.loaded / e.total) * 100)),
                                                            _.button.lock(this, true)
                                                        );
                                                };
                                                xhr.onload = (e) => {
                                                    let rs = e.target.responseText,
                                                        status = String(),
                                                        error = String(),
                                                        error_container = false,
                                                        parser = new DOMParser(),
                                                        _g = function(param) {
                                                            return _.uri_param(param, e.target.responseURL)
                                                        },
                                                        _d = {
                                                            id: _g('id'),
                                                            folder: {
                                                                index: _g('folder'),
                                                                type: _g('folder_type'),
                                                                id: _g('folder_id'),
                                                            },
                                                            input: {
                                                                id: form.querySelector('[name="id"]'),
                                                                folder: form.querySelector('[name="folder"]'),
                                                            },
                                                        };

                                                    // Handle previously saved draft
                                                    if (draft_status) {

                                                        // Update title
                                                        title_update(-1);

                                                        // Store reference for current draft
                                                        draft.data = [_d.folder.id, _d.folder.index, (_d.input.id && _d.input.id.value), _d.id];

                                                        // Clear previous drafts for IMAP and POP
                                                        if (_d.folder.type == 2 || _d.folder.type == 4) {
                                                            if (_d.input.id) {
                                                                draft.purge.apply(null, draft.data)
                                                            } else {
                                                                draft.refresh()
                                                            }
                                                        } else {

                                                            // Refresh drafts folder at once when mail can be edited
                                                            draft.refresh()
                                                        }

                                                        // Remove previously set data
                                                        _d.input.id && _d.input.id.remove();
                                                        _d.input.folder && _d.input.folder.remove();

                                                        // Update form data
                                                        form.insertAdjacentHTML('beforeend', element.input('id', _d.id, false, false, 'hidden'));
                                                        form.insertAdjacentHTML('beforeend', element.input('folder', _d.folder.index, false, false, 'hidden'));
                                                    } else {

                                                        // Handle responses
                                                        rs = parser.parseFromString(rs, 'text/html');
                                                        if (rs) {
                                                            rs = rs.querySelector('.panel-body'),
                                                                error_container = rs.querySelector('h3');
                                                            if (error_container) {

                                                                // Send error notification
                                                                error = error_container.innerHTML.replace(/\s:/, ':&nbsp;');
                                                                _.notification([$$.$.notification.danger, error], 10, "error", 0, 1, ['bottom', 'center']);

                                                                // Reset progress
                                                                _.button.progress(this, 0);

                                                                // Unlock button
                                                                _.button.lock(this, false)

                                                            } else {

                                                                // Send success notification
                                                                status = rs.innerHTML;
                                                                _.notification([scheduled.status() ? $$.$.notification.type.scheduled : $$.$.notification.success, status], 10, "success", 0, 1, ['bottom', 'center'])
                                                                paneled && panel.close();

                                                                // Delete previously stored draft message
                                                                draft.clean();
                                                            }
                                                        }
                                                    }
                                                }
                                                xhr.onerror = (e) => {

                                                    // Reset progress
                                                    _.button.progress(this, 0);

                                                    // Unlock button
                                                    _.button.lock(this, false)

                                                    // Display error message
                                                    _.error({
                                                        responseText: e.target.responseText,
                                                        status: xhr.status
                                                    }, 1);
                                                }
                                                xhr.send(form_data);

                                            })

                                            // Submit mail using hotkey(%cmd-enter)
                                            target.addEventListener('keydown', e => {
                                                let meta = _.platform.mac ? e.metaKey : e.ctrlKey,
                                                    enter = e.keyCode === 13;
                                                if (meta && enter) {
                                                    submit.dataset.isTrusted = 1;
                                                    submit.dispatchEvent(new Event('click'));
                                                }
                                            });

                                        }, 3e2)
                                    },

                                },
                                language = {},
                                template = {};

                            // Group received fields
                            Object.entries(form_data).filter((f) => {
                                [
                                    'from',
                                    'real',
                                    'to',
                                    'cc',
                                    'bcc',
                                    'subject',
                                    'body'
                                ].includes(f[0]) ? (data.visible[f[0]] = f[1]) : (data.hidden[f[0]] = f[1]);
                            });

                            // Extract language strings for visible fields
                            Object.entries(data.visible).forEach((e) => {
                                let id = e[0];
                                language[id] = $form.find(`[name=${id}]`).parent().prev().text();
                            });

                            // Extract language strings for hidden fields
                            Object.entries(data.hidden).forEach(function(e) {
                                let id = e[0];
                                if (['crypt', 'sign'].includes(id)) {
                                    language[id] = $form.find(`[name=${id}]`).parent().prev().text();
                                } else if (['pri'].includes(id)) {
                                    let data = {};
                                    $form.find(`[name=${id}] option`).map(function(ix) {
                                        data[ix] = this.innerText
                                    });
                                    language[id] = { label: $form.find(`[name=${id}]`).parent().prev().text(), data: data };
                                }
                            });

                            // Extend language with more strings
                            language._attachments = _.lang('global_attachments');
                            language._send = _.lang('mail_composer_send');
                            language._scheduled = _.lang('mail_composer_scheduled')
                                .replace(/%1/, `<span data-i>${element.type.date()}<span data-t>${_.lang('global_today').toLowerCase()}</span></span>`)
                                .replace(/%2/, element.type.time());
                            language._attach = _.lang('mail_composer_attach');
                            language._insert_link = adjust.modifier(_.lang('editor_tb_link'));
                            language._insert_picture = _.lang('mail_composer_insert_picture');
                            language._toggle = _.lang('mail_composer_toggle');
                            language._discard = _.lang('mail_composer_discard');
                            language._server_attach = _.lang('mail_composer_server_attach');
                            language._notifications = _.lang('global_notifications');
                            language._notifications_dsn = _.lang('mail_composer_notifications_dsn');
                            language._notifications_del = _.lang('mail_composer_notifications_del');
                            language._encrypt = _.lang('global_encrypt');
                            language._options = _.lang('global_options');
                            language._addrecipients = _.lang('mail_composer_addrecipients');
                            language._default = _.lang('global_default');
                            language._name = _.lang('mail_composer_real_name');
                            language._username = _.lang('mail_composer_username');
                            language._font_size = {
                                small: _.lang('global_small'),
                                normal: _.lang('global_normal'),
                                medium: _.lang('global_medium'),
                                large: _.lang('global_large'),
                                huge: _.lang('global_huge'),
                            };

                            // Check if we have composable from email address 
                            let from_name = $form[0].querySelector(`input[name="real"]`),
                                from_user = $form[0].querySelector(`input[name="user"]`),
                                from_dom = $form[0].querySelector(`input[name="dom"]`),
                                from_composable;
                            if (from_dom) {
                                from_composable = {
                                    name: from_name.value,
                                    user: from_user.value,
                                    dom: from_dom.value,
                                }
                            }

                            // Check for form selects
                            element.select.from = $form[0].querySelector(`select[name="from"]`);
                            element.select.sign = $form[0].querySelector(`select[name="sign"]`);
                            element.select.crypt = $form[0].querySelector(`select[name="crypt"]`);
                            if (element.select.from) {
                                element.select.from = element.select.from.outerHTML;
                            }
                            if (element.select.sign) {
                                element.select.sign = element.select.sign.outerHTML;
                            }
                            if (element.select.crypt) {
                                element.select.crypt = element.select.crypt.outerHTML;
                            }

                            // Build mail form the template
                            template.form = $$.$.template.compose({
                                prefix: prefix,
                                target: {
                                    send: xtarget.send
                                },
                                charset: data.hidden.charset,
                                id: id,
                                class: classes,
                                language: language,
                                status: {
                                    text: ~~data.hidden.html_edit ? classes.hidden : String(),
                                    html: ~~data.hidden.html_edit ? String() : classes.hidden,
                                    module: {
                                        schedule: _.mavailable('schedule') ? String() : classes.hidden,
                                    }
                                },
                                toggle: {
                                    recipients: {
                                        cc: toggle.recipients('cc', 'rc', data.visible),
                                        bcc: toggle.recipients('bcc', 'rc', data.visible),
                                        ccf: toggle.recipients('cc', 'rf', data.visible),
                                        bccf: toggle.recipients('bcc', 'rf', data.visible),
                                    },
                                    more: {
                                        server_file: check.field('file0', data.hidden),
                                        abook: check.field('abook', data.hidden),
                                        dsn: check.field('dsn', data.hidden),
                                        del: check.field('del', data.hidden),
                                        sign: [check.field('sign', data.hidden), element.select.sign],
                                        crypt: [check.field('crypt', data.hidden), element.select.crypt],
                                        pri: check.field('pri', data.hidden),
                                    }
                                },
                                from: from_composable || element.select.from || element.input('from', data.visible, !~~config.d.g.edit_from),
                                to: element.input('to', data.visible),
                                cc: element.input('cc', data.visible),
                                bcc: element.input('bcc', data.visible),
                                subject: element.input('subject', data.visible),
                                attachments: element.input(classes.form.name.tattach, data.visible, false, true),
                                body: data.visible.body,
                            })

                            if (inline) {
                                let inlne_form = inline.append(template.form);
                                element.composer(inlne_form);
                            } else {

                                // Create compose panel
                                let composers = $(`.${classes.panel.container} .${classes.editor.compose}`).length,
                                    window_width = window.innerWidth,
                                    small_window_width = window_width < 640,
                                    window_height = window.innerHeight,
                                    small_window_height = window_height < 640,
                                    small_window = small_window_width || small_window_height,
                                    ioffset = -15,
                                    offset = composers ? ioffset * 5 * composers : ioffset,
                                    position = small_window ? {} : { my: "right-bottom", at: "right-bottom", offsetX: offset, offsetY: offset },
                                    panel = $.jsPanel({
                                        position: position,
                                        theme: "dimgrey",
                                        onwindowresize: true,
                                        panelSize: {
                                            width: (small_window ? window_width + 4 * ioffset : 600),
                                            height: (small_window ? window_height + 4 * ioffset : 600)
                                        },
                                        headerTitle: _.lang('mail_new_message'),
                                        content: template.form,
                                        maximizedMargin: {
                                            top: small_window ? -1 * ioffset : window_height * 0.03,
                                            bottom: small_window ? -1 * ioffset : window_height * 0.03,
                                            left: small_window ? -1 * ioffset : window_height * 0.1,
                                            right: small_window ? -1 * ioffset : window_height * 0.1,
                                        },
                                        footerToolbar: function() {},
                                        dblclicks: {
                                            title: "maximize"
                                        },
                                        onminimized: function() {
                                            toggle.backdrop(this);
                                        },
                                        onclosed: function() {
                                            toggle.backdrop(this);
                                        },
                                        onnormalized: function() {
                                            adjust.contenteditable(this[0]);
                                            toggle.backdrop(this);
                                        },
                                        onmaximized: function() {
                                            adjust.contenteditable(this[0]);
                                            toggle.backdrop(this, 1);
                                        },
                                        callback: function() {
                                            element.composer(this);
                                            if (small_window) {
                                                this.maximize();
                                            }
                                        },
                                    });

                                panel.header.title.addClass('plain');
                            }
                        }
                    });
            }

            // Reveal sub-modules ;;
            return {
                message: message,
            }
        })();

    /**
     * Messages object sub-module ;;
     *
     * @since 19.20
     *
     * @return {object}                    Reveals messages module API
     * @return {void} messages.get         Lists messages with default sorting
     * @return {void} messages.sort        Lists messages with requested sorting
     * @return {object} messages.storage   Accesses messages data storage
     */
    const messages = (function() {

        /**
         * Fetches and renders list of messages for the given folder with particular pagination
         *
         * @returns {void}
         */
        const get = (data) => {
                loader.start();
                // _.notification('hide-all');
                $.post(_.path.extensions + '/mail/messages.cgi?' + _.plugin.json_to_query(data),
                    function(data) {
                        render(data);
                        loader.end();
                        _.document_title(0, _.lang('titles_mail'));

                        // Set received config data
                        config.set(data[0].config);
                    });
            },

            /**
             * Displays loader while loading messages
             *
             * @returns {void}
             */
            loader = {
                target: $$.selector('tree.active'),
                start: function() {
                    $(this.target).addClass($$.$.tree.loader)
                },
                end: function() {
                    $(this.target).removeClass($$.$.tree.loader)
                }
            },

            /**
             * Defines the length of the preview to request from the server
             *
             * @returns {number}
             */
            preview_length = () => {
                return parseInt($(window).width() / 10);
            },


            /**
             * Holds temporary data storage for managing selected messages across different pages
             *
             * @returns {object}
             */
            storage = {
                target: '[' + $$.$.tree.container + ']',
                counter: $$.selector('controls.counter'),

                /**
                 * Gets currently selected messages and its data
                 *
                 * @returns {object|array}
                 */
                get: function(status = 0) {
                    let data = $(this.target).data('messages') || {};
                    if (!status) {
                        data = Object.keys(data);
                    }
                    return data;
                },

                /**
                 * Stores just checked/unchecked message and its data
                 *
                 * Updates selected messages counter, and controls display
                 *
                 * @returns {void}
                 */
                set: function(id, state, status, starred, data) {
                    let storage = this.get(1);

                    // Process messages
                    state ? storage[id] = [+status, +starred] : delete storage[id]

                    // Set current messages storage
                    $(this.target).data('messages', storage);

                    // Update counter
                    let selected_count = Object.keys(storage).length;
                    $(this.counter).text(
                        (
                            selected_count ? (selected_count + ' ' + _.lang('global_selected')) : String()
                        )
                        .toLowerCase()
                    );

                    // Show/hide control row
                    let controls = $$.selector('layout.controls');
                    $(controls).toggleClass('hidden', !selected_count);

                },

                /**
                 * Restores messages selection upon listing
                 *
                 * @returns {void}
                 */
                restore: function() {
                    let data = this.get(),
                        checkboxes = $$.$.messages.checkbox;

                    $(checkboxes).filter((i, t) => {
                        data.includes(t.value) && $(t).prop('checked', 1)
                    }).promise().done(function() {
                        $(checkboxes).trigger('change');
                    });

                },

                /**
                 * Resets messages selection storage
                 *
                 * @returns {void}
                 */
                reset: function() {
                    let checkboxes = $$.$.messages.checkbox;
                    $(this.target).data('messages', {})
                    $(checkboxes + ':checked').prop('checked', 0).trigger('change');
                },
            },

            /**
             * Updates message(s) read/unread status
             *
             * @returns {object}
             */
            status = {

                /**
                 * Extracts action name based on type
                 *
                 * @returns {string}
                 */
                action: function(action, string = false) {
                    action = parseInt((action).replace(/^\D+/g, ''));
                    if (string) {
                        return action ? 'read' : 'unread';
                    }
                    return action
                },

                /**
                 * Sets message read/unread state in UI
                 *
                 * @returns {void}
                 */
                set: function(action, messages) {
                    let $messages = $($$.$.messages.checkbox).filter((i, c) => {
                            return messages.includes(c.value)
                        }),
                        $targets = $messages.parent().parents('td').parents('tr');
                    $targets.attr('data-unread', +!this.action(action))
                },

                /**
                 * Writes message read/unread state to the server
                 *
                 * @returns {void}
                 */
                write: function(data, messages = false) {
                    let folder_index = data[1].searched_folder_index || data[1].folder_index;

                    if (messages) {
                        let action = this.action(data[0], 1);
                        messages = `&d=${messages.join('&d=')}`;
                        $.post(_.path.extensions + '/mail/message.cgi?folder=' + folder_index + '&mark=' + action + messages + '');

                    } else {
                        let action = this.action(data[0], 1),
                            server = data[1],
                            messages = storage.get(1),
                            starred = {
                                read: [],
                                unread: []
                            };

                        // Filter out starred messages
                        $.each(messages, function(i, o) {
                            if (o[1] === 1) {
                                o[0] === 1 ? starred.unread.push(i) : starred.read.push(i)
                                delete messages[i];
                            }
                        });

                        // Submit ordinary data
                        submit(server, {
                            [data[0]]: 1
                        }, Object.keys(messages), 0, 1);

                        // Submit data for incompatible states
                        let link = _.path.extensions + '/mail/message.cgi?folder=' + folder_index + '&mark=starred&state=' + action + '';
                        starred.read.length &&
                            $.post(link + `&d=${starred.read.join('&d=')}` + '');
                        starred.unread.length &&
                            $.post(link + '' + `&d=${starred.unread.join('&d=')}` + '');

                    }
                },

            },

            /**
             * Register events
             *
             * @returns {void}
             */
            events = (data) => {

                // Import targets
                let button = {
                        compose: $$.$.controls.compose.button,
                        search: $$.element('controls.search.dropdown'),
                        refresh: $$.element('controls.refresh.button'),
                        delete: $$.element('controls.delete'),
                        forward: $$.element('controls.forward'),
                        special: {
                            star: $$.selector('messages.special.star'),
                            starred: $$.selector('messages.special.starred'),
                            unstarred: $$.selector('messages.special.unstarred'),
                        }
                    },
                    dropdown = {
                        mark: {
                            read: $$.element('controls.more.menu.read'),
                            unread: $$.element('controls.more.menu.unread'),
                            special: $$.element('controls.more.menu.special'),
                            spam: $$.element('controls.more.menu.spam'),
                            ham: $$.element('controls.more.menu.ham'),
                            black: $$.element('controls.more.menu.black'),
                            white: $$.element('controls.more.menu.white'),
                        },
                        select: $$.selector('controls.select.dropdown'),
                        move: $$.element('controls.move.dropdown'),
                        search: $$.element('controls.search.dropdown')
                    },
                    checkbox = $($$.$.controls.select.checkbox),
                    checkboxes = $$.$.messages.checkbox,
                    flags = $$.selector('messages.flag');

                /**
                 * Event listeners for selecting all messages
                 *
                 * @returns {void}
                 */
                checkbox.on('change', function() {
                    let $this = $(this),
                        state = $this.is(':checked');
                    $(checkboxes).prop('checked', state).trigger('change');
                }).parent().parent().on('click', function(event) {
                    let $input = $(this).find('input');
                    !$(event.target).is($input) && $input.prop('checked', !$input.is(':checked')).trigger('change');
                })

                /**
                 * Event listeners for selecting all messages
                 *
                 * @returns {void}
                 */
                $(flags).on('click', function(event) {
                    event.stopPropagation()
                })


                /**
                 * Event listener for selecting specific type of multiple messages
                 *
                 * @returns {void}
                 */
                $(dropdown.select).find($$.$.controls.select.menus).on('click', function(event) {
                    let _$ = $(event.target).data('type'),
                        $_ = $(checkboxes),
                        $__ = 'change',
                        __$ = 'checked';

                    // Select all/none
                    if (_$ === 5 || _$ === 4) {
                        $_.prop(__$, (_$ & 1)).trigger($__);
                    }
                    // Select invert
                    else if (_$ === 3) {
                        $_.prop(__$, function() {
                            return !this.checked
                        }).trigger($__);
                    }
                    // Select read/unread
                    else if (_$ === 2 || _$ === 1) {
                        $_.prop(__$, function() {
                            return +$(this).parents('tr').attr('data-unread') === (_$ & 1)
                        }).trigger($__);
                    }
                    // Select starred (special)
                    else if (_$ === 0) {
                        $_.prop(__$, function() {
                            return +$(this).parents('tr').attr('data-starred') === +!(_$ & 1)
                        }).trigger($__);
                    }
                })

                /**
                 * Event listener for selecting single message
                 *
                 * Updates the storage data
                 *
                 * @returns {void}
                 */
                $(checkboxes).on('change', function() {
                    let $this = $(this),
                        $row = $this.parents('td').parent('tr'),
                        state = $this.is(':checked'),
                        id = $this.val(),
                        checked = (checkboxes + ':checked'),
                        status = $row.attr('data-unread'),
                        starred = $row.attr('data-starred');
                    storage.set(id, state, status, starred, data);
                    $(checked).length === $(checkboxes).length ? checkbox.prop('checked', 1) : checkbox.prop('checked', 0);
                });

                /**
                 * Event listener for deleting message(s)
                 *
                 * @returns {void}
                 */
                button.delete.on('click', function() {
                    submit(data, {
                        'delete': 1
                    }, storage.get(), 1, 1)
                });

                /**
                 * Event listener for moving/copying message(s)
                 *
                 * @returns {void}
                 */
                let $dropdown_move_select = dropdown.move.find('select');
                $dropdown_move_select.find('option').map((i, o) => {
                    o.value <= -1 && o.remove()
                })
                _.plugin.select($dropdown_move_select);
                $dropdown_move_select.on('change', function() {
                    setTimeout(() => {
                        $($$.$.controls.move.submit).toggleClass('disabled', !this.value).trigger('focus');
                    });
                })
                dropdown.move.find('li').on('click', function(event) {
                    event.stopPropagation();
                    let $target = $(event.target),
                        $submit = $($$.$.controls.move.submit),
                        $copy = $($$.$.controls.move.checkbox),
                        copy = $copy.is(':checked');

                    if ($target.is($copy)) {
                        $submit.text(copy ? _.lang('global_copy') : _.lang('global_move'));
                    }

                    if ($target.is('button:not(.disabled)')) {
                        let action = copy,
                            target = parseInt($dropdown_move_select.val());

                        submit(data, {
                            [(action ? 'copy' : 'move') + '1']: 1,
                            mfolder1: target
                        }, storage.get(), (+!action || ((data.searched_folder_index || data.folder_index) === target)), 1)

                        dropdown.move.removeClass('open')
                    }
                })
                dropdown.move.on('shown.bs.dropdown', function() {
                    _.plugin.select([$dropdown_move_select, 'open']);
                })

                /**
                 * Event listener for forwarding message(s)
                 *
                 * @returns {void}
                 */
                button.forward.on('click', function() {
                    // Produce notification (temporary)
                    _.notification([$$.$.notification.danger, 'Forward functionality is no yet implemented. Expect it in the future beta pre-release.'], 10, "info", 0, 1, ['bottom', 'center'])
                });

                /**
                 * Event listener for search
                 *
                 * @returns {void}
                 */
                let $dropdown_search_select = dropdown.search.find('select'),
                    $dropdown_search_simple = dropdown.search.find('[data-search-mail]'),
                    $dropdown_search_advanced_all = dropdown.search.find('[name="search-wordsin"]');

                // Set current folder first
                if (data && $dropdown_search_select.length) {
                    $dropdown_search_select[0].value = data.searched_folder_index || data.folder_index;
                }

                // Initialize folders select
                _.plugin.select($dropdown_search_select);

                button.search.find('li').on('click keyup', function(event) {
                    event.stopPropagation();
                    let $target = $(event.target),
                        $advanced_form = dropdown.search.find('[' + $$.$.controls.search.data.form.advanced + ']'),
                        advanced_form_hidden = () => window.getComputedStyle($advanced_form[0]).display === 'none';

                    // Close and return
                    if (event.keyCode === 27) {
                        button.search.trigger('click')
                        return

                    }
                    // Show/hide advanced search options
                    if (
                        (event.keyCode === 32 ||
                            event.keyCode === 9 ||
                            event.keyCode === 13 ||
                            event.type === 'click') &&
                        $target.is($($$.selector('controls.search.caret.down')).add($$.selector('controls.search.button.type')))
                    ) {
                        let $caret = $target.is('i') ? $target : $target.find('i');
                        $caret.toggleClass($$.$.controls.search.caret.up)
                        $advanced_form.toggleClass('show');
                        $dropdown_search_simple[0].disabled = !advanced_form_hidden();

                        let focus_target = advanced_form_hidden() ? $dropdown_search_simple : $advanced_form[0].querySelector('input');
                        focus_target.focus();

                        if (advanced_form_hidden()) {
                            $dropdown_search_simple.val($dropdown_search_advanced_all.val())
                            $dropdown_search_advanced_all.val(String())
                        } else {
                            $dropdown_search_advanced_all.val($dropdown_search_simple.val())
                            $dropdown_search_simple.val(String())
                        }
                        return
                    }

                    // Submit search query
                    if (
                        (event.type === 'keyup' && event.keyCode === 13 && $target.is('[type="text"], [type="number"]')) ||
                        (event.type === 'click' && $target.is('button:not(.disabled)'))
                    ) {
                        let simple_query = {
                            folder: parseInt($dropdown_search_select[0].value),
                            search: $dropdown_search_simple[0].value
                        };

                        // Submit simple search query
                        if (advanced_form_hidden()) {
                            if (simple_query.search) {
                                $.post(_.path.prefix + '/' + _.variable.module.name() + '/mail_search.cgi?returned_format=json&json-error=1&simple=1&' + _.plugin.json_to_query(simple_query), function(data) {
                                    messages.get(data);
                                });
                            }
                        }

                        // Submit advanced search query
                        else {
                            let $elements_input = $advanced_form.find('input[type="text"]').filter((i, v) => v.value),
                                $elements_radios_status = $advanced_form.find('input[name="status"]'),
                                $elements_limit = $advanced_form.find('input[name^="limit"]'),
                                $elements_attach = $advanced_form.find('input[name="attach"]'),
                                query = {};

                            // Default query params
                            query.all = 1;
                            query.dest_def = 1;
                            query.folder = simple_query.folder;

                            // Create query for all input fields
                            for (let i = 0; i < $elements_input.length; i++) {
                                let value = $elements_input[i].value,
                                    special = $elements_input[i].name.includes('words'),
                                    name = $elements_input[i].name.replace('search-', String());
                                if (value) {
                                    query['what_' + i] = value;
                                    if (special) {
                                        query['field_' + i] = 'all';
                                        query['neg_' + i] = ~~$elements_input[i].name.includes('out');
                                    } else {
                                        query['field_' + i] = name;
                                        query['neg_' + i] = 0;
                                    }
                                }
                            }

                            // Create query with status radios
                            query.status_def = 0;
                            for (let i = 0; i < $elements_radios_status.length; i++) {
                                let $this = $elements_radios_status[i],
                                    value = $this.value,
                                    def = value == -1 ? 1 : 0;
                                if ($this.checked) {
                                    query.status_def = def;
                                    if (!def) {
                                        query.status = value;
                                    }
                                }
                            }

                            // Create query with limit radios
                            for (let i = 0; i < $elements_limit.length; i++) {
                                let $this = $elements_limit[i],
                                    name = $this.name;
                                if ($this.checked && $this.name === 'limit_def' || $this.name !== 'limit_def') {
                                    query[name] = $this.value
                                }
                            }

                            // Create query with attachment status
                            query.attach = ~~$elements_attach[0].checked;

                            // Run the query
                            $.post(_.path.prefix + '/' + _.variable.module.name() + '/mail_search.cgi?returned_format=json&json-error=1&' + _.plugin.json_to_query(query), function(data) {
                                messages.get(data);
                            });
                        }
                    }
                });

                dropdown.search.on('shown.bs.dropdown', function() {
                    $dropdown_search_simple.trigger('focus');
                })

                /**
                 * Event listener for refreshing messages list
                 *
                 * @returns {void}
                 */
                button.refresh.on('click', function() {
                    $$.element('tree.active').click()
                })

                /**
                 * Event listener for marking message starred/unstarred (toggle special state)
                 *
                 * @returns {void}
                 */
                $(button.special.star).on('click', function(event) {
                    event.stopImmediatePropagation();
                    let $this = $(this),
                        $row = $(event.target).parents('td').parent('tr'),
                        target = $$.$.messages.special,
                        id = $row.find('input[value]').val(),
                        state = $(event.target).is($(button.special.starred)) ? 1 : 0,
                        unread = +$row.attr('data-unread'),
                        text = _.lang('global_' + (state ? 'unstarred' : 'starred') + '');

                    $row.attr('data-starred', +!state);

                    // Submit changes and toggle state
                    submit(data, {
                        ['markas' + (state ? 1 : 2) + '']: 1
                    }, [id])
                    $this
                        .removeClass(target[(state ? 'starred' : 'unstarred')])
                        .addClass(target[(state ? 'unstarred' : 'starred')])
                        .attr('data-original-title', text)
                        .next().remove();

                    // Write message status (redundant)
                    status.write([(+!unread).toString(), data], [id]);
                });

                /**
                 * Event listener for marking message(s) read/unread
                 *
                 * @returns {void}
                 */
                dropdown.mark.read
                    .add(dropdown.mark.unread)
                    .on('click', function() {
                        let action = $(this).data('form-action'),
                            messages = storage.get();

                        // Write message status (redundant)
                        status.write([action, data]);

                        // Change messages UI state
                        status.set(action, messages);
                    });

                /**
                 * Event listener for reporting spam/ham and whitelisting/blacklisting message(s)
                 *
                 * @returns {void}
                 */
                dropdown.mark.spam
                    .add(dropdown.mark.ham)
                    .add(dropdown.mark.black)
                    .add(dropdown.mark.white)
                    .on('click', function() {
                        let action = $(this).data('form-action'),
                            messages = storage.get(),
                            refetch = /razor|black/.test(action);

                        submit(data, {
                            [action]: 1
                        }, messages, +refetch, 1);
                    })

                /**
                 * Event listener for running search
                 *
                 * @returns {void}
                 */
                $($$.$.controls.search.link).on('click', function() {
                    let link = this.getAttribute('data-href');
                    fetch(link)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(data) {
                            messages.get(data)
                        });
                })

                /**
                 * Event listener for composing new message
                 *
                 * @returns {void}
                 */
                $(folders.data.selector.navigation)
                    .off('click', button.compose)
                    .on('click', button.compose, function() {
                        compose.message();
                    })
            },

            /**
             * Submits changes to the server
             *
             * @param {object} data      Response object with data for current page
             * @param {object} actions   Action(s) to be submitted
             * @param {object} messages  Array of message ids to process
             * @param {int}    [refetch] Refetch current folder's content from the server
             * @param {int}    [reset]   Reset message selection
             *
             * @returns {void}
             */
            submit = (data, actions, messages, refetch = 0, reset = 0) => {
                let form = data.form_list,
                    target = _.variable.module.link() + `/${form.target}?`,
                    hidden = form.hidden,
                    searched_index = data.searched_folder_index,
                    mail_system = parseInt(data.mail_system);

                hidden = _.plugin.json_to_query(hidden) + '&noredirect=1&';

                // Focus actual folder instead of virtual
                if (searched_index && (mail_system === 2 || mail_system === 4)) {
                    hidden = hidden.replace(/folder=\d+/, `folder=${searched_index}`)
                }

                actions = _.plugin.json_to_query(actions);
                messages = `&d=${messages.join('&d=')}`;
                refetch && (loader.start(), _.notification('hide-all'));
                $.post(target + hidden + actions + encodeURI(messages), function() {
                    if (reset) {
                        storage.reset();
                    }
                    if (refetch || data.folder_counts_allowed) {
                        $.post(_.path.extensions + '/mail/messages.cgi?' + hidden + 'show_body_len=' + preview_length() + '', function(data) {
                            render(data);
                            loader.end();
                        });
                    }
                });
            },

            /**
             * Render row
             *
             * @param {string} text
             * @param {string} icon
             *
             * @returns {string}
             */
            row = (text, icon) => {

                let row = String(),
                    centered_row = $$.create.$('layout.row.centered');

                row = $(centered_row)
                    .append((icon ? $$.create.icon(icon) : String()) +
                        '<div class="text-uppercase"> ' + text + ' </div>');

                return row;

            },

            /**
             * Render messages and controls
             *
             * @param {object} source Response object with data for current page
             *
             * @returns {void}
             */
            render = (source) => {
                let container = $$.element('layout.container'),
                    data = source[0],
                    messages_list = ((data.list.messages && data.form_list.buttons) ? data.list.messages.replace(/�/g, '') : String());

                // Check for errors first
                if (data.error) {
                    let errors = data.error.error;
                    for (let i = 0; i < errors.length; i++) {
                        _.notification([$$.$.notification.error, errors[i]], 20, "error", i, 1, ['bottom', 'center']);
                    }

                    // If redirect requested, follow it
                    if (data.redirect) {
                        _.pjax.fetch(data.redirect);
                    }
                    return
                }

                let messages_list_available = messages_list.length > 128 ? 1 : 0;
                if (!messages_list_available && data.searched) {
                    _.notification([$$.$.notification.type.search, _.lang('mail_search_empty')], 5, "info", 0, 1, ['bottom', 'center'])
                    return
                }

                // Empty current panel and define target
                container.empty().append($$.create.$('layout.panel'));
                let panel = container.find($$.selector('layout.panel'));

                // Inject data to the panel
                if (messages_list_available) {
                    let controls = {
                            select: data.form_list.buttons.select,
                            submit: data.form_list.buttons.submit
                        },
                        pagination = {
                            link: (data.pagination_arrow_last || data.pagination_arrow_first || String()),
                            title: (data.pagination_arrow_last ? _.lang('mail_pagination_last') : (data.pagination_arrow_first ? _.lang('mail_pagination_first') : false))
                        }

                    panel
                        .append($$.create.$('layout.row.controls'))
                        .find($$.selector('layout.row.controls'))
                        .append($$.create.$('layout.column.6'), $$.create.$('layout.column.6'))
                        .find($$.selector('layout.column.6')).first()
                        .append($$.create.dropdown('controls.select.dropdown', [
                            [
                                controls.select.all,
                                controls.select.none,
                                controls.select.invert,
                                controls.select.read,
                                controls.select.unread,
                                controls.select.special
                            ], 3
                        ], $$.create.checkbox({
                            select: 1
                        }), String(), _.lang('global_select')));

                    let $form_controls = $($$.create.$('layout.controls', {
                        'form-controls': 1
                    }, 'div'));
                    Object.entries(controls.submit).map(([type, data]) => {
                        for (let [i, v] of data.entries()) {
                            if (type === 'buttons') {
                                $form_controls.append($$.create.$('controls.' + v[0], {
                                    'form-control': v[0]
                                }, 'span', String(), _.lang('global_' + v[0] + '')));

                            } else if (type === 'dropdowns') {
                                for (let [di, dd] of v.entries()) {
                                    let entries = [];
                                    for (let [index, data] of v[1].entries()) {
                                        data[0] && entries.push($$.create.$(0, {
                                            'form-action': data[0]
                                        }, 'span', data[1]));
                                    }
                                    if (typeof dd === "string") {
                                        $form_controls.append(
                                            $$.create.dropdown('controls.' + dd + '.dropdown', [
                                                entries, 2
                                            ], 0, dd, _.lang('mail_' + dd + '') || _.lang('global_' + dd + ''))

                                        )
                                    }
                                }
                            }
                        }
                    });

                    panel
                        .find($$.selector('layout.column.6')).first()
                        .append(
                            $form_controls,
                            $$.create.$('controls.refresh.button', {
                                'refresh': 1
                            }, 'button', String(), _.lang('global_refresh')),
                            $$.create.dropdown('controls.sort.dropdown', [
                                [
                                    data.list.sort.date,
                                    data.list.sort.from,
                                    data.list.sort.size,
                                    data.list.sort.subject,
                                    data.list.sort.spam,
                                ], 5
                            ], data.list.sorted, 'sort', _.lang('global_sort')),
                            $$.create.dropdown('controls.search.dropdown', [
                                [
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.type]: 'simple'
                                        }, 'span',
                                        (
                                            $$.create.input('search', _.lang('mail_search_search_mail'), String(), 'text', {
                                                'search-mail': 1
                                            }) +
                                            $$.create.button('layout.button.transparent.link', {
                                                'toggle-type': 1
                                            }, String(), 'controls.search.caret.down')
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', {}, 'span', $$.create.label('search-from', _.lang('mail_search_from'))) +
                                            $$.create.$('layout.column.9', {}, 'span', $$.create.input('search-from'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-to', _.lang('mail_search_to'))) +
                                            $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-to'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-subject', _.lang('mail_search_subject'))) +
                                            $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-subject'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsin', _.lang('mail_search_has_words'))) +
                                            $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-wordsin'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsout', _.lang('mail_search_doesnt_have_words'))) +
                                            $$.create.$('layout.column.9', 0, 'span', $$.create.input('search-wordsout'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-status', _.lang('mail_search_with_status'))) +
                                            $$.create.$('layout.column.9', 0, 'span',
                                                $$.create.radio(0, 'status', -1, _.lang('mail_search_with_status_any'), 'status_def', 'checked') +
                                                $$.create.radio(0, 'status', 0, _.lang('mail_search_with_status_unread'), 'status0') +
                                                $$.create.radio(0, 'status', 1, _.lang('mail_search_with_status_read'), 'status1') +
                                                $$.create.radio(0, 'status', 2, _.lang('mail_search_with_status_special'), 'status2')
                                            )
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1,
                                            [$$.$.controls.search.data.form.type]: 'search-in'
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-folder', _.lang('mail_search_search_in'))) +
                                            $$.create.$('layout.column.9', 0, 'span', data.form_list.buttons.submit.dropdowns[0][1][0][1])
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1,
                                            [$$.$.controls.search.data.form.type]: 'limit'
                                        }, 'span',
                                        (
                                            $$.create.$('layout.column.3', 0, 'span', $$.create.label('search-wordsout', _.lang('mail_search_limit_results'))) +
                                            $$.create.$('layout.column.9', 0, 'span',
                                                $$.create.radio(0, 'limit_def', 1, _.lang('global_no'), 'limit_def0', 'checked') +
                                                $$.create.radio(0, 'limit_def', 0, _.lang('mail_search_limit_results_yes') + ' ' + $$.create.input(
                                                    'limit', '', 20, 'number', ['step="20"', 'min="10"']) + ' latest messages', 'limit_def1')
                                            )
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1,
                                            [$$.$.controls.search.data.form.type]: 'attach'
                                        }, 'span',
                                        (
                                            $$.create.checkbox(0, 'attach', 1, _.lang('mail_search_has_attach'))
                                        )
                                    ),
                                    $$.create.$(0, {
                                            [$$.$.controls.search.data.form.action]: 'search',
                                            [$$.$.controls.search.data.form.advanced]: 1,
                                            [$$.$.controls.search.data.form.type]: 'submit'
                                        }, 'span',
                                        (
                                            $$.create.button('layout.button.primary', false, _.lang('global_search'), 'controls.search.icon')
                                        )
                                    )
                                ], 5
                            ], (data.searched_message ?
                                $$.create.$(
                                    'controls.search.clear.link', ['href="index.cgi?folder=' + data.searched_folder_index + '"'],
                                    'a',
                                    ($$.create.icon('controls.search.clear.icon') + ' ' + data.searched_message.toLowerCase()),
                                    _.lang('mail_search_clear')) : String()
                            ), 'search', _.lang('global_search')),
                            $$.create.$('controls.counter', 0, 'span')
                        )
                        .end().last()
                        .append(
                            $$.create.$('controls.pagination', (pagination.link ? ['href="' + pagination.link + '"', 'data-href="' + pagination.link + '"'] : false), 'a', data.pagination_message, pagination.title),
                            data.pagination_arrow_left,
                            data.pagination_arrow_right
                        )

                    panel
                        .append($$.create.$('layout.row.messages')).find($$.selector('layout.row.messages'))
                        .append($$.create.$('layout.column.12')).find($$.selector('layout.column.12'))
                        .append(messages_list)

                    if (data.quota) {
                        panel
                            .append($$.create.$('layout.row.quota')).find($$.selector('layout.row.quota')).last()
                            .append($$.create.$('layout.column.12')).find($$.selector('layout.column.12'))
                            .append(data.quota)
                    }

                    _.plugin.timestamp();
                    _.plugin.arialabel();
                    _.plugin.tooltip();
                    _.plugin.offset_adjust(true);
                    _.rows();
                    folders.set(data);
                    folders.update(data);
                    events(data);
                    messages.storage.restore();
                    messages.refresh(panel);

                } else {
                    events();
                    panel.append(row((data.folder_index === 0 ? _.lang('mail_no_new_mail') : _.lang('mail_no_mail')), 'messages.row.empty'))
                }

                // Dismiss the loader for all calls
                setTimeout(() => {
                    _.plugin.preloader_dismiss();
                }, 2e2);
            },

            /**
             * Set interval for automatic messages update
             *
             * @returns {void}
             */
            refresh = function(panel, stop) {
                typeof this.refreshTimer === "number" && clearInterval(this.refreshTimer);

                // Clear timer and return
                if (stop) {
                    return;
                }

                // Register last interaction time for smother UX
                let last_interaction_time = Date.now();
                panel[0].addEventListener('mousemove', function() {
                    last_interaction_time = Date.now();
                })

                // Update messages, if conditions are met
                this.refreshTimer = setInterval(() => {
                    let refreshing = () => {
                        panel.find($$.element('controls.refresh.button')).trigger('click');
                    }
                    if (config.d.u) {
                        clearInterval(this.refreshTimer);
                        if (config.d.u.refresh) {

                            // Perform actual refresh
                            this.refreshTimer = setInterval(() => {
                                // Stop refresh if there is no mail list
                                if (!document.querySelector(`.${panel[0].classList[0]}`)) {
                                    this.refresh(false, true);
                                }

                                // Refresh the page if user is not interacting with the page or idle for more than 60 seconds
                                let last_interaction_ago = parseInt((Date.now() - last_interaction_time) / 1000),
                                    is_checked = panel.find('[name="d"]:checked').length,
                                    is_pagination = panel.find('[href*="index.cgi"][href*="start=0"]').length,
                                    is_open = panel.find('.open').length;
                                if (((is_checked || is_pagination || is_open) && last_interaction_ago > 60) ||
                                    (!is_checked && !is_pagination && !is_open)) {
                                    refreshing();
                                }
                            }, parseInt(config.d.u.refresh) * 1000);
                        } else {
                            this.refresh(false, true);
                        }
                    }
                }, 1e2)
            }

        // Reveal sub-modules ;;
        return {
            get: get,
            storage: storage,
            refresh: refresh,
            events: events,
        }
    })();

    /**
     * Folders sub-module ;;
     *
     * @since 19.17
     *
     * @return {object}                    Reveals folders module API
     * @return {void}   folders.get        Retrieve mail folders
     * @return {void}   folders.set        Mark folder as active
     * @return {void}   folders.adjust     Adjust active folder into view
     * @return {object} folders.data       Returns module properties
     */
    const folders = (function() {
        let

            // Define module static properties
            data = {
                file: {
                    fancytree: 'jquery.fancytree'
                },
                selector: {
                    navigation: 'aside .navigation'
                },
                options: {
                    tree: {
                        escapeTitles: false,
                        autoActivate: false,
                        autoScroll: true,
                        keyboard: false,
                        toggleEffect: false,
                    },
                    scroll: {
                        axis: 'xy',
                        theme: 'minimal',
                        keyboard: false,
                        scrollInertia: 300,
                        scrollButtons: true,
                        autoHideScrollbar: false,
                    }
                },
                plugin: {
                    tree: (source) => {
                        if (!$.fn.fancytree) {
                            setTimeout(() => {
                                data.plugin.tree(source);
                            }, 4e2);
                            return;
                        }
                        source = (source === 'get' ? 'getTree' :
                            (source === 'node' ? 'getActiveNode' :
                                Object.assign(data.options.tree, {
                                    source: source,
                                    scrollParent: $('[' + $$.$.tree.container + ']'),
                                    click: (e, d) => {
                                        if (d.targetType === 'title') {
                                            setTimeout(() => {
                                                tree.adjust();
                                            }, 1e2);
                                            _.pjax.fetch(data.url.link + encodeURIComponent(d.node.key));
                                            messages.storage.reset();
                                            _.navigation.reset();
                                        }
                                    }
                                })));
                        if ($(tree.container).length) {
                            return $(tree.container).fancytree(source);
                        }
                    }
                },
                url: {
                    link: _.path.origin + _.path.prefix + '/mailbox/index.cgi?id=',
                }
            };

        /**
         * Tree sub-module ;;
         *
         * @return {string|function}
         */
        let tree = {
            fetched: 0,
            container: '[' + $$.$.tree.container + ']',
            container_adjust: function() {
                let container = $(this.container + ' >:first'),
                    content = $(this.container + ' >>:first');
                if (container.height() > content.height()) {
                    container.css('height', content.height())
                }
            },
            init: function(source) {

                // Load dependencies
                if (this.fetched === 0) {
                    this.load();
                    return;
                }

                // Insert tree container and compose button
                if ($(data.selector.navigation + ' ' + this.container).length === 0) {
                    $(data.selector.navigation).prepend('<li><div ' + $$.$.tree.container + '></div></li>');
                    $(data.selector.navigation).prepend('<li>' + $$.create.$('layout.button.block.transparent', {
                        'compose': 1
                    }, 'span', $$.create.icon('controls.compose.icon') + " " + _.lang('mail_new_message')) + '</li>');
                } else {
                    return;
                }

                // Instantiate tree
                data.plugin.tree(source);

                // Make the container scrollable
                _.plugin.scroll(this.container, data.options.scroll);

                // Adjust container height
                this.container_adjust();
            },
            expand: function(node) {
                let expanded = node.isExpanded();
                !expanded && node.toggleExpanded();
            },
            load: function() {
                this.fetched = 1;
                _.load.bundle(data.file.fancytree, 1, (_.variable.switch() ? [get] : 0), 1);
            },
            reload: function(source) {
                let tree = data.plugin.tree('get');
                tree.$container.empty();
                tree.reload(source);
                setTimeout(() => {
                    this.adjust();
                }, 1e2);
            },
            node: function() {
                return data.plugin.tree('node');
            },
            adjust: function() {
                let $_ = this.node();
                if ($_ && $_.li && $($_.li).length) {
                    _.plugin.scroll([this.container, $($_.li)]);
                }
                this.container_adjust();
            }
        }

        /**
         * Retrieves mail folders
         *
         * @param {string} [key] Folder name to be set as active
         *
         * @return {void}
         */
        const get = (key) => {
            key = key ? ('?key=' + key.replace(/&/g, '%26')) : String();
            $.post(_.path.extensions + '/mail/folders.cgi' + key + '', function(source) {
                if (!!key) {
                    tree.reload(source)
                } else {
                    tree.init(source)
                    mail.messages.events()
                }
            });
        }

        /**
         * Mark mail folder as active
         *
         * @param {string|object} key Extract folder name to set as active
         *
         * @return {void}
         */
        const set = function(key) {
            let tree = data.plugin.tree('get');

            // Detect source 
            if (typeof key === 'object') {
                let search = {
                        id: key.searched_folder_id,
                        file: key.searched_folder_file,
                    },
                    id = key.folder_id;

                // Set active folder
                if (search.file && search.id != null && key.mail_system != 2 && key.mail_system != 4) {
                    key = search.file
                } else {
                    key = search.id || id;
                }

            }

            if (typeof tree === 'object' && typeof tree.activateKey === 'function') {
                tree.activateKey(key)
            } else {
                setTimeout(() => {
                    this.set(key);
                }, 1e2);
            }
        }

        /**
         * Refreshes mail in currently selected folder
         *
         * @returns {void}
         */
        const refresh = () => {
            let node = tree.node();
            node.span.click();
        }

        /**
         * Update mail folder unread counter
         *
         * @param {object} data Response object with data for current page
         *
         * @return {void}
         */
        const update = function(data) {
            let allowed = data.folder_counts_allowed,
                unread_count = data.unread,
                $node_titles = $($$.selector('tree.title')),
                active_node = $$.selector('tree.active'),
                node_bubble = $$.selector('tree.bubble'),
                $active_node_title = $(active_node).find($$.selector('tree.title')),
                $active_node_bubble = $(active_node).find(node_bubble);

            // Update active folder counter
            if (allowed) {
                if (unread_count) {
                    if ($active_node_bubble.length) {
                        $active_node_bubble.text(unread_count)
                    } else {
                        $active_node_title.append($$.create.$('tree.bubble', false, 'span', unread_count))
                    }
                } else {
                    $active_node_bubble.remove();
                }
            } else {
                $node_titles.find(node_bubble).remove();
            }
        }

        /**
         * Check if selected folder is what we are looking for
         *
         * @param {string} folder Folder name to check if currently selected
         *
         * @return {boolean}
         */
        const check = function(folder) {
            let node = tree.node();
            if (node && node.key === folder) {
                return true;
            }
            return false;
        }

        /**
         * Adjust folders into view
         *
         * @return {void}
         */
        const adjust = () => {
            tree.adjust();
        }

        // Reveal sub-modules ;;
        return {
            get: get,
            set: set,
            refresh: refresh,
            update: update,
            check: check,
            adjust: adjust,
            data: data
        }
    })();

    // Reveal modules (API) ;;
    return {
        folders: {
            get: folders.get,
            set: folders.set,
            refresh: folders.refresh,
            update: folders.update,
            check: folders.check,
            adjust: folders.adjust
        },
        messages: {
            get: messages.get,
            sort: messages.sort,
            events: messages.events,
        },
        compose: compose.message
    }
})();