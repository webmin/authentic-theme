##Changelog

####Version 10.1.1 (Mar 8, 2015)
* Added in settings `settings_menu_hide_webmin_unused_modules_link`
* Moved theme build to the separate directory as recommended by _Jamie Cameron_

####Version 10.1.0 (Mar 7, 2015)
* Changed left menu color to be slightly lighter
* Added in settings `settings_sysinfo_expand_all_accordions` and `settings_menu_hide_webmin_refresh_modules_link`
* Fixed quota/bandwidth calculations for _System Information_

####Version 10.0.0 (Mar 4, 2015)
* Changed theme **repo location** to _GitHub_.  **Attention:** It's required that your _Perl_ installation can handle _https_ connections. Make sure to have installed, either _LWP::Protocol::https_ or _Bundle::LWP_ modules to make future _automatic updates_ work
* Improved left menu design to be more flat-like _(complete page reload is required)_
* Improved the look of old **ui_hidden** collapse, to look more like new _Bootstrap_ collapse
* Added support for **Webmail** in _Usermin_ [#104](https://github.com/qooob/authentic-theme/issues/104)
* Added **dataTables** search, in case table contains more than 10 rows
* Added **dataTables** on filesize, to properly sort columns containing filesize data [#103](https://github.com/qooob/authentic-theme/issues/103)
* Added **custom logo** support for login screen [#116](https://github.com/qooob/authentic-theme/issues/116). Read the [manual](https://github.com/qooob/authentic-theme#how-do-i-set-custom-logos) for using it
* Added support for **basic settings** to control the theme (disable loaders and more). Read the [manual](https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings) for using it
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

####Version 9.5.0 (Feb 8, 2015)
* Added **dataTables** to _Software Package Updates_, as it's useful to sort packages by _name/description/status/source_
* Added font **Roboto** in the package and set as default. Font now is local, because _Google_ is blocked in some countries [#80](https://github.com/qooob/authentic-theme/issues/80)
* Added **Hotkey** - _double_ `Shift` for dismissing right side loader
* Added custom **styles** and **scripts** injector. Now you can apply custom _styles/scripts_ to the theme, which will be preserved upon updates. [Manual](https://github.com/qooob/authentic-theme#how-do-i-load-custom-styles) for using
* Added **brand** icons for _Webmin/Virtualmin/Cloudmin_ switches (thanks to _Joe Cooper_ for it)
* Added **left menu** dependency updates, upon some triggers happening on the right frame
* Added **extended panels** on _System Information_ page, like _Quotas_, _Status_, _IP address allocation_ and et cetera
* Added Perl **error message**, explaining how to make the theme work, if it's downloaded from _GitHub_ as _.zip_ [#85](https://github.com/qooob/authentic-theme/issues/85)
* Fixed missing option **create sub-servers**, when clicking on _Create Virtual Server_ link, on theme very first load [#96](https://github.com/qooob/authentic-theme/issues/96)
* Fixed **sticking out** _long text_ in the left menu in some languages (Russian, French, Polish and some other) [#95](https://github.com/qooob/authentic-theme/issues/95)
* Fixed **stuck loader**, when going to _Webmin Scheduled Functions_ [#86](https://github.com/qooob/authentic-theme/issues/86)

####Version 9.0.3 (Feb 3, 2015)
* Fixed file selector **filter broken** in some cases [#81](https://github.com/qooob/authentic-theme/issues/81)
* Fixed a general bug (not theme related), when **clicking** on _external links_ [#82](https://github.com/qooob/authentic-theme/issues/82)
* Fixed ConfigServer Security & Firewall **Firefox bug** when buttons didn't work [#83](https://github.com/qooob/authentic-theme/issues/83)

####Version 9.0.2 (Feb 2, 2015)
* Fixed **loader** positioning
* Fixed **small buttons** under the menu showing _correct language link_ on toggling between _Webmin/Virtualmin/Cloudmin_
* Fixed **menu jumps** [#76](https://github.com/qooob/authentic-theme/issues/76)
* Fixed **selects** incorrectly triggering loader in some cases [#78](https://github.com/qooob/authentic-theme/issues/78)
* Improved **mobile menu** trigger button position and some other mobile menu tweaks

####Version 9.0.1 (Feb 1, 2015)
* Fixed **Firefox bug** making right frame _links not clickable_ [#74](https://github.com/qooob/authentic-theme/issues/74)
* Improved **navigation** menu auto-opening

####Version 9.0.0 (Feb 1, 2015)
* Changed: Overall **UI redesign** for better experience
* Changed: Code **core** complete rewrite for both _server_ and _client-side_. Improved **speed** and **browser/plugin** compatibility
* Added support for _Virtualmin/Cloudmin_ **missing left menu**, for currently selected virtual server/machine. ***Attention:*** You need latest _Virtualmin_ installation to make it work. (For _Virtualmin_ *Pro*, minimum version requirement is 4.13 and for *GPL* users minimum is 4.14)
* Added **autocomplete** for currently **opened module** in _Webmin_, currently **selected domain** and list of all available **virtual domains/machines** in _Virtualmin/Cloudmin_ modules
* Added **complete mobile support**. Navigation menu now has absolutely _same functionality_ for both _desktop/mobile_ versions
* Added **custom logo** support. [Manual](https://github.com/qooob/authentic-theme#how-do-i-set-custom-logos) for using
* Added **screen-saver** effect (using pure CSS) after _2 minutes_ of inactivity
* Added **shortcut** _Alt+R_ for _reloading_ right frame
* Added **Chinese translation** by [Dreista](https://github.com/Dreista)

####Version 8.1.0 (Jan 9, 2015)
* Fixed script removing _text_ in rare cases, next to **radios/checkboxes**, which is actually crucial for understanding of what to select
* Changed alien Alt sign **⌥** to **Alt**, which now also only appears **onfocus** on search field (thanks to _Joe Cooper_ for advice)
* Fixed _dozens_ of UI issues, like broken borders on tables and some other visual improvements (now theme provides most accurate UI _ever_ achieved)
* Removed donation button from _System Information_ page, that was seen on everyday basis (thanks to _Joe Cooper_ for advice)

####Version 8.0.0 (Jan 4, 2015)
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

####Version 7.0.0 (Dec 21, 2014)
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

####Version 6.6.0 (Dec 2, 2014)
* Added basic support for _Cloudmin_ module
* Added **TinyMCE** text editor for _Mail_ modules
* Fixed display issues in _Mail_ modules
* Fixed login page being displayed inside of the right frame, when session is expired
* Fixed all possible issues with missing **input** fields, in all modules, including _ProFTPd_ module [#50](https://github.com/qooob/authentic-theme/issues/50)
* Fixed minor UI bugs

####Version 6.5.2 (Nov 23, 2014)
* Reverted incorrectly removed stray `div` tag at the **theme_footer**
* Added _Virtualmin Pro_ information popover and refresh license keys on _System Information_
* Fixed minor UI bugs

####Version 6.5.1 (Nov 23, 2014)
* Fixed display issues at small screen resolutions [#45](https://github.com/qooob/authentic-theme/issues/45)
* Added functionality to prevent stuck update states [#46](https://github.com/qooob/authentic-theme/issues/46)
* Removed stray `div` tag at the **theme_footer** to prevent possible page breaks

####Version 6.5.0 (Nov 21, 2014)
* Fixed positioning for new **quick-access menu** and **refresh button**. Refresh button now spins on frame reload. Both buttons now work well on mobile devices
* Added _File Manager_ link on **quick-access menu** per request
* Added link behavior, for/when clicking on _hostname_ in page header
* Fixed minor UI bugs

####Version 6.4.1 (Nov 20, 2014)
* Fixed missing icons on _Virtualmin_ **Bandwidth Usage** page [#41](https://github.com/qooob/authentic-theme/issues/41)

####Version 6.4.0 (Nov 18, 2014)
* Added **refresh button** to refresh the page. _Attention!_ **Left click** will refresh the right frame, while **right click** will refresh the whole page
* Added **quick access menu** and **refresh button** hover effect
* Fixed missing **font-family: monospace;** on all **pre** tags

####Version 6.3.0 (Nov 15, 2014)
* Added **quick access menu** for _Webmin/Usermin/Virtualmin_. It makes things easy accessible. Menu depends on the _module/user_ permissions
* Added display of **Virtualmin** version to the **System Information**
* Fixed minor UI bugs

####Version 6.2.4 (Nov 14, 2014)
* Fixed history state toggle for **System Information** [#39](https://github.com/qooob/authentic-theme/issues/39)
* Added **webprefix** to the file paths [#38](https://github.com/qooob/authentic-theme/issues/38)

####Version 6.2.3 (Nov 13, 2014)
* Updated to the latest _Bootstrap_ v3.3.1
* Fixed paginations misplacement and size on _Read Mail_ module [#37](https://github.com/qooob/authentic-theme/issues/37)
* Fixed/added missing icons on _Read Mail_ module

####Version 6.2.2 (Nov 9, 2014)
* Updated to _CodeMirror_ v4.7.0
* Improved page loader
* Fixed/added missing icons on _Read Mail_ module
* Fixed stuck spinner when printing mail on _Read Mail_ module
* Fixed minor UI bugs

####Version 6.2.1 (Nov 9, 2014)
* Fixed opening Webmin/Usermin at the right frame, when session is expired [#35](https://github.com/qooob/authentic-theme/issues/35)
* Fixed _Read User Mail_ module, showing a stuck spinner when performing mail download

####Version 6.2.0 (Nov 7, 2014)
* Fixed opening window issue on **user switch** action [#31](https://github.com/qooob/authentic-theme/issues/31)
* Fixed missing icons on **Read Mail** module [#33](https://github.com/qooob/authentic-theme/issues/33)
* Added _Italian_, _French_, _Spanish_ translations [#26](https://github.com/qooob/authentic-theme/issues/26)

####Version 6.1.0 (Nov 6, 2014)
* Fixed messed up theme automatic update [#29](https://github.com/qooob/authentic-theme/issues/29)
* Added option to refresh only system information and not packages, by clicking right mouse button on **refresh button** [#29](https://github.com/qooob/authentic-theme/issues/29)

####Version 6.0.2 (Nov 6, 2014)
* Fixed upcoming bug [#28](https://github.com/qooob/authentic-theme/issues/28)

####Version 6.0.1 (Nov 6, 2014)
* Fixed upcoming bug [#26](https://github.com/qooob/authentic-theme/issues/26#issuecomment-61886719)

####Version 6.0.0 (Nov 6, 2014)
* Fixed **refresh button** being slow on _System Information_ page [#24](https://github.com/qooob/authentic-theme/issues/24)
* Fixed _System Information_ being displayed properly based on logged in users' privileges [#10](https://github.com/qooob/authentic-theme/issues/10)
* Changed the way **refresh button** works on _System Information_ page. No more using **recollect.cgi** or any other server-side scripts.
* Fixed dozens of small bugs

####Version 5.1.0 (Oct 31, 2014)
* Added **refresh button** to _System Information_ page [#23](https://github.com/qooob/authentic-theme/issues/23)
* Added _System Information_ link to _Virtualmin_ left navigation bar

####Version 5.0.0 (Oct 30, 2014)
* Added new beautiful **ui_link** buttons in replacement for old links with **|** separator
* Fixed devastating bug, that stopped the script with fatal error, as **dataTables** were called prematurely
* Fixed dozens of small bugs

####Version 4.4.1 (Oct 28, 2014)
* Fixed an issue with **file chooser**, not selecting a _file/directory_ [#21](https://github.com/qooob/authentic-theme/issues/21)

####Version 4.4.0 (Oct 28, 2014)
* Fixed missing numbers for _memory_ and _local disk space_ [#20](https://github.com/qooob/authentic-theme/issues/20)

####Version 4.3.1 (Oct 25, 2014)
* Fixed automatic updates not working in some cases [#17](https://github.com/qooob/authentic-theme/issues/17)
* Fixed rating stars not being rendered on sub-server script installer page in Virtualmin module [#18](https://github.com/qooob/authentic-theme/issues/18)

####Version 4.3.0 (Oct 24, 2014)
* Fixed general issue causing **buttons** submit a form with an empty values [#16](https://github.com/qooob/authentic-theme/issues/16)

####Version 4.2.0 (Oct 23, 2014)
* Fixed general issue causing **forms** on submit return an error in some cases [#15](https://github.com/qooob/authentic-theme/issues/15)
* Fixed showing loader when clicking on **select_all/select_invert** links

####Version 4.1.7 (Oct 22, 2014)
* Added _Norwegian_ translation. Special thanks to _Kjetil Elde_ [#14](https://github.com/qooob/authentic-theme/issues/14)

####Version 4.1.6 (Oct 22, 2014)
* Fixed language files encoding [#13](https://github.com/qooob/authentic-theme/issues/13)

####Version 4.1.5 (Oct 21, 2014)
* Added _Polish_ translation. Special thanks to _Michał Pawlik_ [#12](https://github.com/qooob/authentic-theme/pull/12)

####Version 4.1.4 (Oct 20, 2014)
* Fixed general issue causing **radios** disappear in some modules, including _Linux Firewall_ [#11](https://github.com/qooob/authentic-theme/issues/11)

####Version 4.1.3 (Oct 18, 2014)
* Fixed tables automatic sorting by first **th**, to keep defaults set by **Webmin/Virtualmin** [#8](https://github.com/qooob/authentic-theme/issues/8)
* Fixed minor loader issues
* Fixed false/unclickable links in Usermin
* Added CodeMirror **autofocus** on editing _textarea_

####Version 4.1.2 (Oct 15, 2014)
* Added an option, upon logging in, automatically redirect to _Virtualmin_ module, in case it's installed

####Version 4.1.1 (Oct 13, 2014)
* Removed requirement for both, either using **Switch** module or **Feature** is no longer necessary. Replaced with simple **if/elsif/else** statements. Using **Switch** caused error messages on latest installations, e.g. _CentOS 7_, while using **Feature** caused errors on old installations

####Version 4.1.0 (Oct 12, 2014)

* :round_pushpin: Changed to using **Switch**(https://github.com/qooob/authentic-theme#troubleshoot) module, rather than **Feature** in **index.cgi** and **menu.cgi** to support old versions of _Perl_. [#2](https://github.com/qooob/authentic-theme/issues/2) In case, **Switch** module is not installed on your system, you will get an error. See [FAQ](https://github.com/qooob/authentic-theme#troubleshoot) for more details
* Changed **link** named _View changelog_ in _ConfigServer Security & Firewall_ module to a **button**
* Improved loader animation and behavior
* Added many missing _input_ stylings in some modules
* Added _German_ translation. Special thanks to _Michael Keck_ [#3](https://github.com/qooob/authentic-theme/issues/3)
* Fixed **theme_ui_form_end** generator to wrap buttons in _span_ not in _td_, which enables support for lower resolutions [#4](https://github.com/qooob/authentic-theme/issues/4)
* Removed redundant _fonts_ directory

####Version 4.0.0 (Oct 9, 2014)
 * Fixed lost pre-login banner option
 * Added support for _dataTables_. Now you can easily sort table rows based on the table header. It gets easier to manage data in such modules as _Bootup and Shutdown_, _Users and Groups_ and others, containing multi-row data. It also supports _ConfigServer Security & Firewall_, where you can also easily filter _Temporary IP Entries_ and _Listening Ports_
 * Added possibility to use automatic updates for **Authentic Theme**, with direct means of Webmin and its theme installation module - _no other server-side scripts are used_! Updates, when available, will be displayed in *System Information* tab.<br>*Warning!* In order to use automatic updates and check for new theme versions, your system _must have_ the following _Perl_ modules installed: _LWP::Simple_ and _Net::SSLeay_. You should be able to install it from official repos.<br>See [FAQ](https://github.com/qooob/authentic-theme#troubleshoot) for more details
 * Added ability to remove the page _loader_ and see what is happening before the page actually loaded/constructed or just in case of the _loader_ getting stuck. To prematurely remove the _loader_, click on it, using mouse **double-right-click**
 * Removed false dependency for **virtual-server-theme/virtual-server-theme-lib.pl**

####Version 3.0.1 (Oct 7, 2014)
 * Fixed malfunctioning **theme_ui_checkbox**, causing some _input_ fields disappear
 * Fixed few other small bugs

####Version 3.0.0 (Oct 5, 2014)
* Added popover tooltip for old **window.open** to process **help.cgi**
* Added theme information version (installed/update notice) in _System Information_ (works by just comparing **VERSION.txt** files, nothing more)
* Fixed error in _default.js_ script, throwing **NS_ERROR_NOT_AVAILABLE** in Firefox and other _Gecko_ browsers
* Fixed all problems with selecting and filtering _files/user/groups_ in ***_chooser.cgi**
* Fixed loaders being shown every time when waiting for server reply
* Fixed listing of virtual-servers in Virtualmin
* Fixed **checkboxes** margins in Virtualmin
* Fixed table **vertical-align: top** for selecting hours
* Fixed dozens of small bugs

####Version 2.0.1 (Oct 1, 2014)
* Fixed small bugs

####Version 2.0.0 (Oct 1, 2014)
* Added support for _Virtualmin_ module
* Added support for _ConfigServer Security & Firewall_ module
* Fixed/optimized images
* Fixed _Usermin_ not loading menu
* Fixed/added support for menu on mobile devices
* Fixed dozens of small bugs

####Version 1.1.0 (Sep 24, 2014)
* Added support for highlighting edited config files, with showing line numbers
* Fixed navigation menu problems, when using back (history) button
* Fixed/optimized favicons dimensions

####Version 1.0.0 (Sep 21, 2014)
* implemented full support for all elements: tables, forms, inputs, buttons and etc
* added stick menu to display which module was selected
* fixed problem when the changes/new settings were not submitted
* fixed missing radios/checkboxes because label tag isn't always used
* fixed/removed old/unnessesary icons/images all over the theme
* multiple small bug fixes
* added optional favicons to visually distinguish Webmin/Usermin
