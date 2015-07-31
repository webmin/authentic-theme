##Changelog

####Version 14.02 (July 31, 2015)
* Fixed unrealistic bugs [#211](https://github.com/qooob/authentic-theme/issues/211)

####Version 14.01 (July 30, 2015)
* Added _CodeMirror_ automatic mode (highlight syntax) detection for all file-editors
* Added support for [_Filemin_](https://github.com/Real-Gecko/filemin) file-editor and improved general support for this module
* Fixed multiple bugs [#205](https://github.com/qooob/authentic-theme/issues/205), [#206](https://github.com/qooob/authentic-theme/issues/206), [#207](https://github.com/qooob/authentic-theme/issues/207), [#209](https://github.com/qooob/authentic-theme/issues/209)

####Version 14.00 (July 21, 2015)

* Improved page spinners to use no _JavaScript_, adjusted theme colors and font-weights
* Improved code and performance by combining styles/scripts in a single package and making other custom optimizations
* Added new date-picker to replace old _JavaScript_ pop-ups
* Added ability, when editing custom styles/scripts or uploading custom logos, to update page content dynamically, without reload, to immediately display final outlook
* Added overall loading progress at the top of the page (like _YouTube_ and _Medium_). Can be enabled/disabled in theme settings
* Added _CodeMirror_ modes bundle, to be loadable on demand to support different file highlights in [_Filemin_](https://github.com/Real-Gecko/filemin/issues/21) (File manager for _Webmin_) written in _Perl_ (without use of _Java_))
* Added locales to _TinyMCE_
* Updated _CodeMirror_ and _TinyMCE_
* Fixed theme HTML output to be more validator friendly
* Fixed missing status label on managed system in _Cloudmin_ (thanks to _Jamie Cameron_ for reporting it)
* Fixed _JavaScript_ history step back button in _Webmin_
* Fixed _CodeMirror_ problem in _ConfigServer Security & Firewall_ module [#199](https://github.com/qooob/authentic-theme/issues/199)
* Fixed issues with _Server Index_ module [#182](https://github.com/qooob/authentic-theme/issues/182), [#201](https://github.com/qooob/authentic-theme/issues/201)
* Fixed an issue in _MySQL/PostgreSQL Database Server_ modules, when trying to view/edit table rows [#200](https://github.com/qooob/authentic-theme/issues/200)
* Fixed an issue to make theme properly run when using `no_frame_options=1` option [#204](https://github.com/qooob/authentic-theme/issues/204)
* Fixed dozens of other bugs

####Version 13.10 (June 30, 2015)
* Added an option to _disable all animation_ on the left menu and on tabs [#192](https://github.com/qooob/authentic-theme/issues/192)
* Added `autofocus` on input field in _Command Shell_ module [#190](https://github.com/qooob/authentic-theme/issues/190)
* Improved the look of custom radio buttons
* Updated _Romanian_ translation
* Fixed external links issue [#182](https://github.com/qooob/authentic-theme/issues/182)
* Fixed different _Internet Explorer_ issues [#191](https://github.com/qooob/authentic-theme/issues/191)
* Fixed issue with the size of input fields in _Squid Module_ [#197](https://github.com/qooob/authentic-theme/issues/197)
* Fixed other multiple bugs

####Version 13.05 (June 2, 2015)
* Added in settings an option to use _custom links_ for quick-switching, while using digit hotkeys from 1 to 9, i.e. `Alt+1`, `Alt+2`, `Alt+3` ... `Alt+9` [#183](https://github.com/qooob/authentic-theme/issues/183)
* Added disabled virtual servers/machines are now marked red [#184](https://github.com/qooob/authentic-theme/issues/184)
* Fixed _line-graph bars_ issues [#185](https://github.com/qooob/authentic-theme/issues/185)
* Fixed minor bugs

####Version 13.04 (May 31, 2015)
* Added in settings an option to quick-switch, using hotkey to _System Information_ page (`Alt+I`)
* Fixed broken logo uploads [#181](https://github.com/qooob/authentic-theme/issues/181)
* Fixed go back button in _Virtualmin/Cloudmin_
* Fixed minor bugs

####Version 13.03 (May 30, 2015)
* Improved UI of _System Statistics Graphs_ and optimized its usage
* Fixed global issue, with generation icon-like links, when _show as_ set to _icons_ in module's settings [#180](https://github.com/qooob/authentic-theme/issues/180)
* Fixed defaults properly set for _Make all accordions expanded_ [#179](https://github.com/qooob/authentic-theme/issues/179)
* Fixed issues in _Webmin Servers Index_ module [#178](https://github.com/qooob/authentic-theme/issues/178)
* Fixed overflow problem when listing long titles in _Easy Pie Charts_ [#177](https://github.com/qooob/authentic-theme/issues/177)
* Added theme extensions [repo](https://github.com/qooob/authentic-theme-extensions)

####Version 13.02 (May 27, 2015)
* Added support for old versions of Perl [#174](https://github.com/qooob/authentic-theme/issues/174)

####Version 13.01 (May 25, 2015)
* Fixed redirection loop on Safari OSX [#173](https://github.com/qooob/authentic-theme/issues/173)
* Fixed switch-toggle in single mode [#172](https://github.com/qooob/authentic-theme/issues/172)

####Version 13.00 (May 24, 2015)
* Improved _theme settings are now configurable using UI_. From now on, you don't need to edit settings manually. Theme configurable options located in `Webmin->Webmin Configuration->Webmin Themes`
* Improved UI of _right frame_ in great amount. Improved UI of _left menu_ and _login page_
* Improved content _page loader_ being less annoying. Content page spinner now will only appear in case something is _really_ loading. On regular page switching it will not appear anymore. When content page starts/ends loading, it's animated to improve user experience
* Improved _line-graph bars_. Graphs now can have description and color, based on percentage. To see it in action go to `Cloudmin->Edit System->Detailed system status`
* Improved page _autoscroll_ mechanism. Now _autoscroll_ works, more like in `gnome-terminal`, i.e., when you start scrolling the page - auto-scrolling stops, when you reach the bottom of the page, using double-scroll - it restarts
* Improved _user mail_ is now searchable, using _autocomplete_ bar
* Improved _help popovers_ are now not destroyed, in case user made some text selection
* Added support for images for third party modules. Modules' developers no longer need to do workarounds
* Added table rows are now _triggerable_ using left click, _highlighted_ and _selectable_ using right mouse click
* Added in settings an option to _disable/enable customized checkboxes and radio_ buttons
* Added in settings an option to _choose default tab/page_ after logging in
* Fixed broken links when using proxy [#165](https://github.com/qooob/authentic-theme/issues/165)
* Fixed drive temperature formatting on _System Information_ page [#171](https://github.com/qooob/authentic-theme/issues/171)
* Fixed frames being way too small in _Text Login_ and _Root Shell_ modules
* Fixed missing _custom styles_ embedment on login page
* Fixed tabs being fail-safe
* Fixed hundreds of bugs
* Updated _jQuery_ and the code to be _iOS fail-safe_
* Updated to the latest _jQuery_, _dataTables_, _CodeMirror_, _TinyMCE_

> __ATTENTION:__ Translations for `settings_*` and `theme_conference` is required.

> __NOTICE:__ A chat room `authentic-theme@conference.jabbers.im` is opened for discussions. In order to join the chat room, you would need _Jabber ID_. If you don't have _Jabber ID_, you can register it for free on __jabbers.im__, using any XMPP client, that supports account registrations.

####Version 12.00 (May 3, 2015)
* Added right page _icons_, that had been around in other themes for decades. Many people asked for it, including _Joe Cooper_. It was one of the conditions for making _Authentic Theme_ default in _Webmin_. _Icons_ that are used at the moment, are not brand new but looks good. Brand new, _SVG_ icons, are coming in the near future! It's very important to know, that all of these innovations, can be tweaked using settings. By default, _big icons_ are enabled, with _animation_ and _grayscale effect_. Using settings, you can change default icons, to small or extra small, or even completely disable them and get back to what _Authentic Theme_ has been before. Added in settings `settings_right_hide_table_icons`, `settings_right_small_table_icons`, `settings_right_xsmall_table_icons`, `settings_right_animate_table_icons`, `settings_right_grayscaled_table_icons`
* Improved general UI of the left menu
* Fixed some bugs

####Version 11.55 (May 2, 2015)
* Added _Easy Pie Charts_ and corresponding option `settings_sysinfo_easypie_charts`, that will let you enable/disable _Charts_ on _System Information_ page

####Version 11.50 (May 1, 2015)
* Added in settings `settings_right_iconize_header_links`, that enables you to choose between old style right-page header links or replace it with new beautiful icon links. Default is set to `true`
* Added ability to disable right-page reload upon switching between _Webmin/Virtualmin/Cloudmin_ by the following option `settings_right_reload`. The default value is set to `true`
* Added ability to choose hotkeys modifier and hotkeys values, when using it by the following options `settings_hotkey_toggle_modifier`, `settings_hotkey_toggle_key_webmin`, `settings_hotkey_toggle_key_virtualmin`, `settings_hotkey_toggle_key_cloudmin`, `settings_hotkey_toggle_key_usermin`, `settings_hotkey_toggle_key_webmail`, `settings_hotkey_focus_search` and `settings_hotkey_reload`
* Added ability to choose the custom page, when _Virtualmin/Cloudmin_ is loaded/selected by the following options `settings_right_virtualmin_default` and `settings_right_cloudmin_default`. The default value is `'sysinfo.cgi'` (System Information)
* Added `autofocus` on _username_ field, when login page is accessed
* Fixed mail being displayed in HTML, to preserve message custom formatting
* Fixed _dozens_ of bugs

####Version 11.10 (Apr 13, 2015)
* Added ability to open new tab of _Webmin/Usermin/Virtualmin/Cloudmin/Webmail_ by clicking on the switch (top left menu's selector) by right mouse button. **Important:** You must once add _popup window exception_ in your browser to make this feature work
* Improved greatly the usage of `autocomplete` for basic _Webmin_ modules. You can test it by going to _Running Processes_ or _Perl Modules_ and start typing in search field. Same done for most inbuilt modules
* Removed a hack for _Historic System Statistics_ module, as it was fixed by the author in version 2.11 [#1](https://github.com/qooob/authentic-theme/issues/1#issuecomment-91328157)
* Fixed login screen missing for the link to _Virtualmin Password Recovery_ module, in case it's installed and set in _Webmin Configuration->Anonymous Module Access_. In that case, the reset button will act as expected and be the color of yellow [#152](https://github.com/qooob/authentic-theme/issues/152)
* Fixed _Webmin Servers Index_ module issue [#147](https://github.com/qooob/authentic-theme/issues/147)
* Fixed databases listing in editing table cells mode [#150](https://github.com/qooob/authentic-theme/issues/150)
* Fixed increased the height of `::-webkit-scrollbar` for easy access
* Fixed `.cgi` file attributes and set to be executable by default [#154](https://github.com/qooob/authentic-theme/issues/154)
* Fixed missing images in _Translator Module_ [#155](https://github.com/qooob/authentic-theme/issues/155)
* Fixed multiple small bugs

####Version 11.01 (Mar 29, 2015)
* Fixed unclickable left menu links, when custom logo is used [#143](https://github.com/qooob/authentic-theme/issues/143)
* Fixed DHCP-server module showing no hostnames [#145](https://github.com/qooob/authentic-theme/issues/145)
* Fixed multiple small bugs

####Version 11.00 (Mar 25, 2015)
* Added window automatic scrolling, upon page is populated from server-side.Test it and see it in action in such modules as _Fetchmail Mail Retrieval_, _Software Package Updates_ and others. Intended mouse-scroll done by user, during auto-scrolling, will make it stop. Loader will be automatically hidden upon this features is triggered. This feature can be disabled using settings
* Added in settings: `settings_security_notify_on_pre_login_request`, `settings_security_notify_on_login_request`, `settings_security_notify_on_login_success`, `settings_window_autoscroll`, `settings_sysinfo_theme_updates`, `settings_sysinfo_csf_updates`, `settings_leftmenu_button_language`, `settings_leftmenu_singlelink_icons`, `settings_leftmenu_vm_installscripts`, `settings_leftmenu_vm_webpages` and `settings_leftmenu_vm_backup_amazon`
* Added automatically stretching inputs for long text [#121](https://github.com/qooob/authentic-theme/issues/121)
* Added auto-detection/redirection to _Mailbox_ module upon logging in to _Usermin_
* Added _Dutch_ translation by [Richard van Laak](https://github.com/Rvanlaak)
* Added _Russian_ translation
* Fixed appearing loader on changing `select`, even though it was disabled in settings [#127](https://github.com/qooob/authentic-theme/issues/127)
* Fixed text not being _wrapped_ in `pre` tag and now scrollable horizontally instead [#123](https://github.com/qooob/authentic-theme/issues/123)
* Fixed left menu output issue in uncategorised mode [#128](https://github.com/qooob/authentic-theme/issues/128)
* Fixed encoding issue [#129](https://github.com/qooob/authentic-theme/issues/129)
* Fixed stuck loader in _Virtualmin_, while using third party modules
* Fixed left menu being shown irrespectively to the right frame [#131](https://github.com/qooob/authentic-theme/issues/131)
* Fixed external custom links not being opened in new window in _Virtualmin_ module [#130](https://github.com/qooob/authentic-theme/issues/130)
* Improved UI of the right frame - dozens of improvements on fonts, tables, buttons, scrollbars and etc
* Remove all dependencies [#125](https://github.com/qooob/authentic-theme/issues/125)

####Version 10.20 (Mar 15, 2015)
* Fixed issues with slight text flickering on the left menu
* Fixed missing table headers/borders in some modules
* Fixed compatibility mode for third-party modules

####Version 10.12 (Mar 9, 2015)
* Fixed sub-accordions issue found by _Joe Cooper_

####Version 10.11 (Mar 8, 2015)
* Added in settings `settings_leftmenu_section_hide_unused_modules`
* Moved theme build to the separate directory as recommended by _Jamie Cameron_

####Version 10.10 (Mar 7, 2015)
* Changed left menu color to be slightly lighter
* Added in settings `settings_sysinfo_expand_all_accordions` and `settings_leftmenu_section_hide_refresh_modules`
* Fixed quota/bandwidth calculations for _System Information_

####Version 10.00 (Mar 4, 2015)
* Changed theme **repo location** to _GitHub_.  **Attention:** It's required that your _Perl_ installation can handle _https_ connections. Make sure to have installed, either _LWP::Protocol::https_ or _Bundle::LWP_ modules to make future _automatic updates_ work
* Improved left menu design to be more flat-like _(complete page reload is required)_
* Improved the look of old **ui_hidden** collapse, to look more like new _Bootstrap_ collapse
* Added support for **Webmail** in _Usermin_ [#104](https://github.com/qooob/authentic-theme/issues/104)
* Added **dataTables** search, in case table contains more than 10 rows
* Added **dataTables** on filesize, to properly sort columns containing filesize data [#103](https://github.com/qooob/authentic-theme/issues/103)
* Added **custom logo** support for login screen [#116](https://github.com/qooob/authentic-theme/issues/116)
* Added support for **basic settings** to control the theme (disable loaders and more)
* Added extended controls to _System Information_ page for **ConfigServer Security & Firewall**
* Added complete support for scrolling on _iPhone/iPad_ [#115](https://github.com/qooob/authentic-theme/issues/115)
* Fixed server-side search that stopped working after adding _autocomplete_
* Fixed **select** issue in _Internet Explorer_ browser [#99](https://github.com/qooob/authentic-theme/issues/99)
* Fixed package updates showing wrong numbers on _System Information_ page [#112](https://github.com/qooob/authentic-theme/issues/112)
* Fixed **quotas charts** issue, displaying incorrect numbers in _System Information_/_Quotas_ [#110](https://github.com/qooob/authentic-theme/issues/110)
* Fixed missing left menu reload upon importing new virtual server
* Fixed stuck loader appearing in certain cases [#117](https://github.com/qooob/authentic-theme/issues/117)
* Fixed stuck loader in all third party modules, like **AWStat, Webminstat** and **OpenVPN + CA** [#106](https://github.com/qooob/authentic-theme/issues/106)
* Fixed **hotkeys triggers**, which now is executed only in case the switch is not already active [#118](https://github.com/qooob/authentic-theme/issues/118)
* Fixed fatal error happening when changing domain in _Webmin/Virtualmin_ domain owner mode
* Fixed **System Statistics** link to be shown only in administrative mode
* Fixed _Virtualmin->Administration Options->Switch To Server's Admin_ link, being opened in `__parent` window
* Fixed **WYSIWYG bar** being _lower_ than it should be from the upper border, when composing new message
* Fixed login page throwing an error to the console
* Removed screen-saver, as it was eating a lot of memory

####Version 9.50 (Feb 8, 2015)
* Added **dataTables** to _Software Package Updates_, as it's useful to sort packages by _name/description/status/source_
* Added font **Roboto** in the package and set as default. Font now is local, because _Google_ is blocked in some countries [#80](https://github.com/qooob/authentic-theme/issues/80)
* Added **Hotkey** - _double_ `Shift` for dismissing right side loader
* Added custom **styles** and **scripts** injector. Now you can apply custom _styles/scripts_ to the theme, which will be preserved upon updates
* Added **brand** icons for _Webmin/Virtualmin/Cloudmin_ switches (thanks to _Joe Cooper_ for it)
* Added **left menu** dependency updates, upon some triggers happening on the right frame
* Added **extended panels** on _System Information_ page, like _Quotas_, _Status_, _IP address allocation_ and et cetera
* Added Perl **error message**, explaining how to make the theme work, if it's downloaded from _GitHub_ as _.zip_ [#85](https://github.com/qooob/authentic-theme/issues/85)
* Fixed missing option **create sub-servers**, when clicking on _Create Virtual Server_ link, on theme very first load [#96](https://github.com/qooob/authentic-theme/issues/96)
* Fixed **sticking out** _long text_ in the left menu in some languages (Russian, French, Polish and some other) [#95](https://github.com/qooob/authentic-theme/issues/95)
* Fixed **stuck loader**, when going to _Webmin Scheduled Functions_ [#86](https://github.com/qooob/authentic-theme/issues/86)

####Version 9.03 (Feb 3, 2015)
* Fixed file selector **filter broken** in some cases [#81](https://github.com/qooob/authentic-theme/issues/81)
* Fixed a general bug (not theme related), when **clicking** on _external links_ [#82](https://github.com/qooob/authentic-theme/issues/82)
* Fixed ConfigServer Security & Firewall **Firefox bug** when buttons didn't work [#83](https://github.com/qooob/authentic-theme/issues/83)

####Version 9.02 (Feb 2, 2015)
* Fixed **loader** positioning
* Fixed **small buttons** under the menu showing _correct language link_ on toggling between _Webmin/Virtualmin/Cloudmin_
* Fixed **menu jumps** [#76](https://github.com/qooob/authentic-theme/issues/76)
* Fixed **selects** incorrectly triggering loader in some cases [#78](https://github.com/qooob/authentic-theme/issues/78)
* Improved **mobile menu** trigger button position and some other mobile menu tweaks

####Version 9.01 (Feb 1, 2015)
* Fixed **Firefox bug** making right frame _links not clickable_ [#74](https://github.com/qooob/authentic-theme/issues/74)
* Improved **navigation** menu auto-opening

####Version 9.00 (Feb 1, 2015)
* Changed: Overall **UI redesign** for better experience
* Changed: Code **core** complete rewrite for both _server_ and _client-side_. Improved **speed** and **browser/plugin** compatibility
* Added support for _Virtualmin/Cloudmin_ **missing left menu**, for currently selected virtual server/machine. ***Attention:*** You need latest _Virtualmin_ installation to make it work. (For _Virtualmin_ *Pro*, minimum version requirement is 4.13 and for *GPL* users minimum is 4.14)
* Added **autocomplete** for currently **opened module** in _Webmin_, currently **selected domain** and list of all available **virtual domains/machines** in _Virtualmin/Cloudmin_ modules
* Added **complete mobile support**. Navigation menu now has absolutely _same functionality_ for both _desktop/mobile_ versions
* Added **custom logo** support
* Added **screen-saver** effect (using pure CSS) after _2 minutes_ of inactivity
* Added **shortcut** _Alt+R_ for _reloading_ right frame
* Added **Chinese translation** by [Dreista](https://github.com/Dreista)

####Version 8.10 (Jan 9, 2015)
* Fixed script removing _text_ in rare cases, next to **radios/checkboxes**, which is actually crucial for understanding of what to select
* Changed alien Alt sign **⌥** to **Alt**, which now also only appears **onfocus** on search field (thanks to _Joe Cooper_ for advice)
* Fixed _dozens_ of UI issues, like broken borders on tables and some other visual improvements (now theme provides most accurate UI _ever_ achieved)
* Removed donation button from _System Information_ page, that was seen on everyday basis (thanks to _Joe Cooper_ for advice)

####Version 8.00 (Jan 4, 2015)
* Added **Quick Search**. No more searching through the menus. Hit _Alt+S_ **(⌥S)** and start typing to see what you get. When you use suggestions from dropdown, you get quick access to the modules; if you just type and hit enter you get the regular search
* Added **Quick Toggle**. It lets you quickly switch between Webmin/Virtualmin/Cloudmin. To toggle use _Alt+W_ **(⌥W)** / _Alt+V_ **(⌥V)** / _Alt+C_ **(⌥C)**
* Added support for **TimePlot** for Pro versions of _Virtualmin_ to display _System Statistics_
* Added search for **CodeMirror** files
* Added basic support for **Webminstats** module [#1](https://github.com/qooob/authentic-theme/issues/1)
* Updated **CodeMirror** to the latest version 4.10
* Updated **DataTables** to the latest version 1.10.4
* Fixed stray `/div` tag [#62](https://github.com/qooob/authentic-theme/issues/62)
* Fixed sticking out tables on very long content [#58](https://github.com/qooob/authentic-theme/issues/58)
* Fixed _ConfigServer Security & Firewall_ **UI bugs**
* Fixed minor **UI bugs** fixes

####Version 7.00 (Dec 21, 2014)
* Improved overall **theme speed** - twice as fast as before
* Added scrolling to extra long **help popovers** that were going off the screen
* Added complete support for **Internet Explorer** browser
* Changed right side **body** background to draw more attention to content
* Changed **panel** top border height, to draw more attention, while being the main page header
* Changed **loader** - no more images or fonts used - pure script brings overall beauty and compatibility
* Updated **jQuery** to latest _2.1.3_ version
* Fixed problems when using **LastPass/FireBug** plugins [#6](https://github.com/qooob/authentic-theme/issues/6)
* Fixed extra width in table rows and all around the theme
* Fixed position of **dataTables** sorting images to be closer to the text [#55](https://github.com/qooob/authentic-theme/issues/55)
* Fixed **dataTables** disappear in **init** module in some cases [#55](https://github.com/qooob/authentic-theme/issues/55)
* Fixed missing **ui_hidden** when changing tabs [#56](https://github.com/qooob/authentic-theme/issues/56)
* Fixed **hundreds** of UI bugs

####Version 6.60 (Dec 2, 2014)
* Added basic support for _Cloudmin_ module
* Added **TinyMCE** text editor for _Mail_ modules
* Fixed display issues in _Mail_ modules
* Fixed login page being displayed inside of the right frame, when session is expired
* Fixed all possible issues with missing **input** fields, in all modules, including _ProFTPd_ module [#50](https://github.com/qooob/authentic-theme/issues/50)
* Fixed minor UI bugs

####Version 6.52 (Nov 23, 2014)
* Reverted incorrectly removed stray `div` tag at the **theme_footer**
* Added _Virtualmin Pro_ information popover and refresh license keys on _System Information_
* Fixed minor UI bugs

####Version 6.51 (Nov 23, 2014)
* Fixed display issues at small screen resolutions [#45](https://github.com/qooob/authentic-theme/issues/45)
* Added functionality to prevent stuck update states [#46](https://github.com/qooob/authentic-theme/issues/46)
* Removed stray `div` tag at the **theme_footer** to prevent possible page breaks

####Version 6.50 (Nov 21, 2014)
* Fixed positioning for new **quick-access menu** and **refresh button**. Refresh button now spins on frame reload. Both buttons now work well on mobile devices
* Added _File Manager_ link on **quick-access menu** per request
* Added link behavior, for/when clicking on _hostname_ in page header
* Fixed minor UI bugs

####Version 6.41 (Nov 20, 2014)
* Fixed missing icons on _Virtualmin_ **Bandwidth Usage** page [#41](https://github.com/qooob/authentic-theme/issues/41)

####Version 6.40 (Nov 18, 2014)
* Added **refresh button** to refresh the page. _Attention!_ **Left click** will refresh the right frame, while **right click** will refresh the whole page
* Added **quick access menu** and **refresh button** hover effect
* Fixed missing **font-family: monospace;** on all **pre** tags

####Version 6.30 (Nov 15, 2014)
* Added **quick access menu** for _Webmin/Usermin/Virtualmin_. It makes things easy accessible. Menu depends on the _module/user_ permissions
* Added display of **Virtualmin** version to the **System Information**
* Fixed minor UI bugs

####Version 6.24 (Nov 14, 2014)
* Fixed history state toggle for **System Information** [#39](https://github.com/qooob/authentic-theme/issues/39)
* Added **webprefix** to the file paths [#38](https://github.com/qooob/authentic-theme/issues/38)

####Version 6.23 (Nov 13, 2014)
* Updated to the latest _Bootstrap_ v3.3.1
* Fixed paginations misplacement and size on _Read Mail_ module [#37](https://github.com/qooob/authentic-theme/issues/37)
* Fixed/added missing icons on _Read Mail_ module

####Version 6.22 (Nov 9, 2014)
* Updated to _CodeMirror_ v4.7.0
* Improved page loader
* Fixed/added missing icons on _Read Mail_ module
* Fixed stuck spinner when printing mail on _Read Mail_ module
* Fixed minor UI bugs

####Version 6.21 (Nov 9, 2014)
* Fixed opening Webmin/Usermin at the right frame, when session is expired [#35](https://github.com/qooob/authentic-theme/issues/35)
* Fixed _Read User Mail_ module, showing a stuck spinner when performing mail download

####Version 6.20 (Nov 7, 2014)
* Fixed opening window issue on **user switch** action [#31](https://github.com/qooob/authentic-theme/issues/31)
* Fixed missing icons on **Read Mail** module [#33](https://github.com/qooob/authentic-theme/issues/33)
* Added _Italian_, _French_, _Spanish_ translations [#26](https://github.com/qooob/authentic-theme/issues/26)

####Version 6.10 (Nov 6, 2014)
* Fixed messed up theme automatic update [#29](https://github.com/qooob/authentic-theme/issues/29)
* Added option to refresh only system information and not packages, by clicking right mouse button on **refresh button** [#29](https://github.com/qooob/authentic-theme/issues/29)

####Version 6.02 (Nov 6, 2014)
* Fixed upcoming bug [#28](https://github.com/qooob/authentic-theme/issues/28)

####Version 6.01 (Nov 6, 2014)
* Fixed upcoming bug [#26](https://github.com/qooob/authentic-theme/issues/26#issuecomment-61886719)

####Version 6.00 (Nov 6, 2014)
* Fixed **refresh button** being slow on _System Information_ page [#24](https://github.com/qooob/authentic-theme/issues/24)
* Fixed _System Information_ being displayed properly based on logged in users' privileges [#10](https://github.com/qooob/authentic-theme/issues/10)
* Changed the way **refresh button** works on _System Information_ page. No more using **recollect.cgi** or any other server-side scripts.
* Fixed dozens of small bugs

####Version 5.10 (Oct 31, 2014)
* Added **refresh button** to _System Information_ page [#23](https://github.com/qooob/authentic-theme/issues/23)
* Added _System Information_ link to _Virtualmin_ left navigation bar

####Version 5.00 (Oct 30, 2014)
* Added new beautiful **ui_link** buttons in replacement for old links with **|** separator
* Fixed devastating bug, that stopped the script with fatal error, as **dataTables** were called prematurely
* Fixed dozens of small bugs

####Version 4.41 (Oct 28, 2014)
* Fixed an issue with **file chooser**, not selecting a _file/directory_ [#21](https://github.com/qooob/authentic-theme/issues/21)

####Version 4.40 (Oct 28, 2014)
* Fixed missing numbers for _memory_ and _local disk space_ [#20](https://github.com/qooob/authentic-theme/issues/20)

####Version 4.31 (Oct 25, 2014)
* Fixed automatic updates not working in some cases [#17](https://github.com/qooob/authentic-theme/issues/17)
* Fixed rating stars not being rendered on sub-server script installer page in Virtualmin module [#18](https://github.com/qooob/authentic-theme/issues/18)

####Version 4.30 (Oct 24, 2014)
* Fixed general issue causing **buttons** submit a form with an empty values [#16](https://github.com/qooob/authentic-theme/issues/16)

####Version 4.20 (Oct 23, 2014)
* Fixed general issue causing **forms** on submit return an error in some cases [#15](https://github.com/qooob/authentic-theme/issues/15)
* Fixed showing loader when clicking on **select_all/select_invert** links

####Version 4.17 (Oct 22, 2014)
* Added _Norwegian_ translation. Special thanks to _Kjetil Elde_ [#14](https://github.com/qooob/authentic-theme/issues/14)

####Version 4.16 (Oct 22, 2014)
* Fixed language files encoding [#13](https://github.com/qooob/authentic-theme/issues/13)

####Version 4.15 (Oct 21, 2014)
* Added _Polish_ translation. Special thanks to _Michał Pawlik_ [#12](https://github.com/qooob/authentic-theme/pull/12)

####Version 4.14 (Oct 20, 2014)
* Fixed general issue causing **radios** disappear in some modules, including _Linux Firewall_ [#11](https://github.com/qooob/authentic-theme/issues/11)

####Version 4.13 (Oct 18, 2014)
* Fixed tables automatic sorting by first **th**, to keep defaults set by **Webmin/Virtualmin** [#8](https://github.com/qooob/authentic-theme/issues/8)
* Fixed minor loader issues
* Fixed false/unclickable links in Usermin
* Added CodeMirror **autofocus** on editing _textarea_

####Version 4.12 (Oct 15, 2014)
* Added an option, upon logging in, automatically redirect to _Virtualmin_ module, in case it's installed

####Version 4.11 (Oct 13, 2014)
* Removed requirement for both, either using **Switch** module or **Feature** is no longer necessary. Replaced with simple **if/elsif/else** statements. Using **Switch** caused error messages on latest installations, e.g. _CentOS 7_, while using **Feature** caused errors on old installations

####Version 4.10 (Oct 12, 2014)

* Changed **link** named _View changelog_ in _ConfigServer Security & Firewall_ module to a **button**
* Improved loader animation and behavior
* Added many missing _input_ stylings in some modules
* Added _German_ translation. Special thanks to _Michael Keck_ [#3](https://github.com/qooob/authentic-theme/issues/3)
* Fixed **theme_ui_form_end** generator to wrap buttons in _span_ not in _td_, which enables support for lower resolutions [#4](https://github.com/qooob/authentic-theme/issues/4)
* Removed redundant _fonts_ directory

####Version 4.00 (Oct 9, 2014)
 * Fixed lost pre-login banner option
 * Added support for _dataTables_. Now you can easily sort table rows based on the table header. It gets easier to manage data in such modules as _Bootup and Shutdown_, _Users and Groups_ and others, containing multi-row data. It also supports _ConfigServer Security & Firewall_, where you can also easily filter _Temporary IP Entries_ and _Listening Ports_
 * Added possibility to use automatic updates for **Authentic Theme**, with direct means of Webmin and its theme installation module - _no other server-side scripts are used_! Updates, when available, will be displayed in *System Information* tab.<br>*Warning!* In order to use automatic updates and check for new theme versions, your system _must have_ the following _Perl_ modules installed: _Net::SSLeay_. You should be able to install it from official repos.<br>See [FAQ](https://github.com/qooob/authentic-theme#troubleshoot) for more details
 * Added ability to remove the page _loader_ and see what is happening before the page actually loaded/constructed or just in case of the _loader_ getting stuck. To prematurely remove the _loader_, click on it, using mouse **double-right-click**
 * Removed false dependency for **virtual-server-theme/virtual-server-theme-lib.pl**

####Version 3.01 (Oct 7, 2014)
 * Fixed malfunctioning **theme_ui_checkbox**, causing some _input_ fields disappear
 * Fixed few other small bugs

####Version 3.00 (Oct 5, 2014)
* Added popover tooltip for old **window.open** to process **help.cgi**
* Added theme information version (installed/update notice) in _System Information_ (works by just comparing **VERSION.txt** files, nothing more)
* Fixed error in _default.js_ script, throwing **NS_ERROR_NOT_AVAILABLE** in Firefox and other _Gecko_ browsers
* Fixed all problems with selecting and filtering _files/user/groups_ in ***_chooser.cgi**
* Fixed loaders being shown every time when waiting for server reply
* Fixed listing of virtual-servers in Virtualmin
* Fixed **checkboxes** margins in Virtualmin
* Fixed table **vertical-align: top** for selecting hours
* Fixed dozens of small bugs

####Version 2.01 (Oct 1, 2014)
* Fixed small bugs

####Version 2.00 (Oct 1, 2014)
* Added support for _Virtualmin_ module
* Added support for _ConfigServer Security & Firewall_ module
* Fixed/optimized images
* Fixed _Usermin_ not loading menu
* Fixed/added support for menu on mobile devices
* Fixed dozens of small bugs

####Version 1.10 (Sep 24, 2014)
* Added support for highlighting edited config files, with showing line numbers
* Fixed navigation menu problems, when using back (history) button
* Fixed/optimized favicons dimensions

####Version 1.00 (Sep 21, 2014)
* Added full support for all elements: tables, forms, inputs, buttons and etc
* Added stick menu to display which module was selected
* Added optional favicons to visually distinguish Webmin/Usermin
* Fixed problem when the changes/new settings were not submitted
* Fixed missing radios/checkboxes because label tag isn't always used
* Fixed/removed old/unnessesary icons/images all over the theme
