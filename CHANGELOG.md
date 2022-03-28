## Changelog

#### Version 19.91.1-RC1 (March 29, 2022)
* Add ability to choose on the fly if files must be overwritten in File Manager [forum.virtualmin.com/t/114497](https://forum.virtualmin.com/t/114497/7)
* Add support for purging all users trash directories in File Manager [#629/comment-1081220953](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-1081220953)
* Add support for additional English locales for better control over date formats [#1587](https://github.com/authentic-theme/authentic-theme/issues/1587)
* Fix symlink naming on duplicates in File Manager

#### Version 19.91 (March 21, 2022)
* Add significant improvements to dark palette
* Add an option to change hold modifier key [forum.virtualmin.com/t/114331](https://forum.virtualmin.com/t/change-remove-to-delete-not-with-alt-but-shift/114331/6)
* Fiх scrollbar visibility [#1584/comment-1060766894](https://github.com/authentic-theme/authentic-theme/issues/1584#issuecomment-1060766894)
* Fix help popover not being displayed if not inside of accordion
* Fix display logic for backups virtual servers destination and format in Virtualmin
* Fix opening correct link in a table cell with multiple links
* Fix placeholder font size for textareas
* Fix a bug preventing correctly opening file viewer on first call

#### Version 19.90.1 (March 06, 2022)
* Fix Usermin dependency check before installing a new update

#### Version 19.90 (March 04, 2022)
* Update contacts
* Fix to sync theme version with Webmin version released

#### Version 19.85.1 (February 24, 2022)
* Add improved security in File Manager
* Add various enhancements to GPG encryption/decryption functionality in File Manager
* Add ability to display out of quota message using toast notification
* Fix smoothness of toast notifications in File Manager
* Fix login screen save session checkbox

#### Version 19.85 (February 16, 2022)
* Add improved focus state for elements to support navigation using keyboard with tab key
* Add reworked toast notifications with better support for mobile devices
* Add basic theme API for module developers [authentic-theme/wiki/API](https://github.com/authentic-theme/authentic-theme/wiki/API)
* Add ability to switch between other remote Webmin servers from navigation menu [sourceforge.net#1a86e7bdc7](https://sourceforge.net/p/webadmin/discussion/600155/thread/1a86e7bdc7/#cf22)
* Add ability to copy overall system information to clipboard from the dashboard [webmin#1569/comment-1001784592](https://github.com/webmin/webmin/issues/1569#issuecomment-1001784592)
* Add ability for submitting support tickets using the dashboard for Virtualmin Pro users
* Add ability to optionally control existing file overwrite upon compress/decompress in File Manager
* Add support to copy text from draggable by holding ⎇ key [webmin#1569/comment-1003734006](https://github.com/webmin/webmin/issues/1569#issuecomment-1003734006)
* Add further multiple improvements to elements align across various browsers/platforms
* Add an option to disable auto folding inactive categories in navigation menu
* Add support for filtering server templates options in Virtualmin
* Add visual improvements to Bandwidth Usage submodule in Virtualmin
* Add various improvements and fixes to Edit Databases submodule in Virtualmin
* Add ability to detach edited file to a separate editor in Custom Commands module
* Add various visual improvements to Webmin Actions Log module
* Add visual improvements to PHP Options submodule in Virtualmin
* Add better support for a new upcoming version of Virtualmin Support module
* Add multiple improvements for ConfigServer Security & Firewall module support
* Add Virtualmin community link to the dashboard
* Fix system monitors icons for System and Server Status module
* Fix to avoid fetching navigation menu on simple domain selection on Virtualmin Virtual Servers page
* Fiх upload tracker for safe user in File Manager [#1576](https://github.com/authentic-theme/authentic-theme/issues/1576)
* Fiх configuration page work in File Manager when opened in a separate tab [sourceforge.net#5539](https://sourceforge.net/p/webadmin/bugs/5539/)
* Fix to display delete/move to trash button color conditionally based on option in File Manager
* Fix calculations of directory size in File Manager to be error resilient
* Fix regression bug for spinner positioning in File Manager on retrieving directory size
* Fix returning to module index after saving configuration in File Manager
* Fix various bugs for FTP Directory Restrictions submodule in Virtualmin
* Fix table rendering upon submit for Backup Virtual Servers submodule in Virtualmin
* Fiх false redirection after opening a link in HTTP Tunnel module [virtualmin/virtualmin-gpl#358](https://github.com/virtualmin/virtualmin-gpl/issues/358)
* Fiх highlight syntax detection for Custom Commands module when editing a file [webmin#1591](https://github.com/webmin/webmin/issues/1591)
* Fix Custom Commands module support in Usermin

<!--- separator --->

#### Version 19.84.7 (December 14, 2021)
* Fix navigation detection with menu reload after progressive call end
* Fix navigation detection processing depending on intermediate user interaction
* Fiх sorting by size in File Manager [#629/comment-990445478](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-990445478)
* Fix to display missing icon on navigation menu for opening Webmin link in Cloudmin
* Fix various popover positioning issues
* Fix various align issues for teletype text
* Fix Custom Commands module support in Usermin

#### Version 19.84.6 (December 04, 2021)
* Fix to make initial load resilient to errors
* Fiх connection flooding for server owners and mail users with disabled status collection [sourceforge.net#492](https://sourceforge.net/p/webadmin/usermin-bugs/492/)
* Fiх regression preventing password complexity meter shown for some pages [#1568](https://github.com/authentic-theme/authentic-theme/issues/1568)

#### Version 19.84.5 (November 27, 2021)
* Fix scheduled cron jobs radios positioning
* Fix password strength meter algorithm
* Fix broken tooltip positioning on the dashboard for panels with fixed right side slider
* Fix to focus search field for custom select dropdown

#### Version 19.84.4 (November 21, 2021)
* Fix to drop showing old tooltips for symlinks on hover in File Manager
* Fix to resolve symlink path when opening a directory in File Manager

#### Version 19.84.3 (November 21, 2021)
* Add support for creating multiple symlinks at once in File Manager
* Add new hotkey _Ctrl+Alt+C_ to copy filename with full path to clipboard in File Manager

#### Version 19.84.2 (November 20, 2021)
* Fix support for new two dot theme version format

#### Version 19.84.1 (November 20, 2021)
* Fix to always reset previous search for data tables on full page reload
* Fix to properly allow only one MPM mode selected for Apache modules page
* Fix to treat new reset features page in Virtualmin as progressive
* Fiх wording for update warning message [#1563](https://github.com/authentic-theme/authentic-theme/issues/1563)

#### Version 19.84 (November 15, 2021)
* Update numerous of major upstream libraries
* Add ability for administrators to broadcast messages to other users on the system [virtualmin/motd#1](https://github.com/virtualmin/virtualmin-messageoftheday/issues/1#issuecomment-968371746)
* Add support for purging trash in File Manager [forum.virtualmin.com/t/112778](https://forum.virtualmin.com/t/cant-delete-files-from-trash/112778/6?u=ilia)
* Add support for remote products versions fetching for displaying outdated on Dashboard
* Add better indent prints for progressive output
* Add an option to automatically convert tab key press to spaces when editing a file
* Add support for displaying CPU fans nicely
* Fiх layout for more advanced commands in Custom Commands module [#1544](https://github.com/authentic-theme/authentic-theme/issues/1544#issuecomment-962495501)
* Fiх navigation detect with URLs containing query
* Fiх fix progressive output for files that earlier were migrated to Pro product
* Fix progressive output fetching when HTML is present
* Fix redirect on page reload in proxy mode
* Fiх webprefix duplication in standard proxy mode [forum.virtualmin.com/t/112199](https://forum.virtualmin.com/t/112199)
* Fix server redirects upon form submissions with Servers Index module
* Fix BIND module highlight syntax when editing manually
* Fix alerts buttons positioning
* Fix display of menu and slider toggle buttons
* Fix post-install script to clear menu caches
* Fix not to scroll nested preformatted text
* Fix to align _tt_ tags inside of tables row


#### Version 19.83 (August 28, 2021)
* Add ability to install a panel as Chrome application on desktop or mobile device [#1459](https://github.com/authentic-theme/authentic-theme/issues/1459)
* Fiх displaying modal window above the backdrop in File Manager on Apple mobile devices [webmin/webmin#1508](https://github.com/webmin/webmin/issues/1508)
* Fix regression bugs with Servers Index module
* Fiх to respect Webmin _nohostname_ config option when generating document title [#1554](https://github.com/authentic-theme/authentic-theme/issues/1554)
* Fix mail related issues for Usermin
* Fix elements vertical alignments
* Fix other minor bugs

#### Version 19.82 (June 29, 2021)
* Add ability to install previous stable theme versions from a dropdown on theme configuration page
* Fiх data parsing regression on page load [webmin/webmin#1497](https://github.com/webmin/webmin/issues/1497)
* Fix broken after content for radio subroutine in theme UI library
* Fix to update search directory and allow it being modified in File Manager search dialog
* Fix font rendering for Microsoft Windows users
* Fix table icons to dynamically fill flex container
* Fix automatic page scrolling

#### Version 19.81 (June 12, 2021)
* Fiх theme update script to function if repo moved to new organization [#1548](https://github.com/authentic-theme/authentic-theme/issues/1548)
* Fiх modules listing without categories in navigation menu [#1552](https://github.com/authentic-theme/authentic-theme/issues/1552)

#### Version 19.80 (June 10, 2021)
* Add improvements to various aspects of the UI [forum.virtualmin.com/t/111034](https://forum.virtualmin.com/t/authentic-theme-19-80-release-overview/111034)
* Add new properties popup for File Manager to display overall file details [#629/comment-851638537](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-851638537)
* Add ability to fully revert theme settings to existing when page is not saved [#1538](https://github.com/authentic-theme/authentic-theme/issues/1538)
* Fiх file tree-view issues when used with various allowed paths in File Manager [webmin/webmin#1487](https://github.com/webmin/webmin/issues/1487)
* Fix progressive output content extraction and loader premature dismissal issue
* Fix emails printing and other UI issues for Read User Mail module
* Fiх bugs for Servers Index module [#1540](https://github.com/authentic-theme/authentic-theme/issues/1540)

#### Version 19.75 (April 19, 2021)
* Add improvements to color palettes for navigation menu and side slider
* Fix accessibility contrast for navigation menu and side slider
* Fix file tree-view with sub-directories in multiple allowed paths in File Manager

#### Version 19.74 (April 04, 2021)
* Add branding splash screen on initial loading [#639/comment-805378509](https://github.com/authentic-theme/authentic-theme/issues/639#issuecomment-805378509)
* Add ability to setup custom company branding and favicons [#639/comment-801339035](https://github.com/authentic-theme/authentic-theme/issues/639#issuecomment-801339035)
* Add navigation menu code refactoring, improving speed and stability
* Add ability to load the same content page on domain select in Virtualmin and Cloudmin
* Add to display a link to reload the page when the theme upgraded in background [#1521](https://github.com/authentic-theme/authentic-theme/issues/1521#issuecomment-802347210)
* Add an option to force stats collection when tab is not focused [webmin/webmin#1460](https://github.com/webmin/webmin/issues/1460#issuecomment-801078993)
* Add to display question mark icon next to any help link which brings tooltip
* Add better wrapping of large tables for better mobile support
* Fiх theme configuration page to work with older Perl versions [#1520](https://github.com/authentic-theme/authentic-theme/issues/1520)
* Fix help popovers to work with links and adjust to content
* Fix to display start/kill buttons for Scheduled Cron Jobs module
* Fix various inconsistencies in animation and improve visual performance
* Fix to align checkboxes and labels correctly when displaying Virtualmin features


#### Version 19.73 (March 04, 2021)
* Add cut/paste operation to actually move files (instead of copy and delete) in File Manager
* Fiх to prevent deleting files (data loss) on error when pasting in File Manager [sourceforge.net#5458](https://sourceforge.net/p/webadmin/bugs/5458/)
* Fiх _tar_ command to add files starting with a dash in File Manager [sourceforge.net#5457](https://sourceforge.net/p/webadmin/bugs/5457/)
* Fix panels order in side slider correspond with dashboard
* Fix on load issue with Servers Index module
* Fix sub-title font family and size

#### Version 19.72 (February 28, 2021)
* Add error handler when viewed/edited file outside of allowed path
* Add file tree-view optimizations for speed and security in File Manager
* Fix file tree-view child counter bubble styling in File Manager
* Fix to improve support when multi allowed directories are used in File Manager
* Fix navigation menu detection with new File Manager preferences page
* Fix tooltip placement to be conditional to avoid breakage for the last element
* Fix smarter titling when adding pages to favorites
* Fix bugs

#### Version 19.71 (February 24, 2021)
* Add ability to hide and reorder panels on dashboard
* Add ability to use server side generated passwords [forum.virtualmin.com/t/108121](https://forum.virtualmin.com/t/cant-find-increasing-password-length-settings-anymore/108121)
* Add better error handling for pages with SSL certificate errors [forum.virtualmin.com/t/108760](https://forum.virtualmin.com/t/post-install-lets-encrypt-disconnect-error/108760/7)
* Add reworked theme configuration page
* Add reworked File Manager configuration page
* Add initial ACLs listing support in File Manager
* Fiх troublesome bug causing servers overload [@a8c894b](https://github.com/authentic-theme/authentic-theme/commit/a8c894bc82a81b92d9e71a2ca6a1ef8f25c271bd)
* Fix navigation menu detections in Virtualmin for some pages
* Fix to better detect editor highlight modes
* Fix correctly printing very first portion of progressive output

#### Version 19.70 (January 17, 2021)
* Add ability to preview any file in File Manager
* Add support for removing files to trash in File Manager
* Add more features to search functionality (filter user, group, size and type) in File Manager
* Add to display extended file status output for editor and viewer windows
* Add better support for native form validation (HTML5)


#### Version 19.62 (November 08, 2020)
* Add better menu icons, fix alignment and size
* Fix bugs

#### Version 19.61 (October 16, 2020)
* Add sortable table for mailbox user list [#1496/comment-703835699](https://github.com/authentic-theme/authentic-theme/issues/1496#issuecomment-703835699)
* Add to display two-factor authentication field for user selectively on login page
* Add better display of restore virtual server page in Virtualmin
* Fix to stop re-submitting modifier forms (delete, remove, add, new) when using internal page refresh
* Fix directory tree listing in File Manager for safe user
* Fix other bugs

#### Version 19.60 (October 04, 2020)
* Add to display module config by section with search capability
* Add better font contrast and greater overall consistency
* Add better styling for a new apply config changes button [webmin/webmin@2d95efa](https://github.com/webmin/webmin/commit/2d95efa30e587a40642288c9274930f40b2b13fb#commitcomment-41816394)
* Add support for new consecutive line breaks [webmin/webmin@3e60854](https://github.com/webmin/webmin/commit/3e60854861c0ec1b9a1835245da9b5c1970f4512)
* Add more distinctive look for focused checkboxes/radios
* Add missing message signature to a new mail composer
* Add native table filter for install scripts page in Virtualmin
* Add ability to refresh logs with smaller interval
* Fix elements and loader positioning in file editor
* Fix top loader not being shown on calling the page multiple times
* Fix to HTML escape a label that is put inside of actual tags
* Fix error message print style for failed certificate renewal in Virtualmin
* Fix PostgreSQL password change field width in Virtualmin
* Fix an icon for create system submenu in Cloudmin navigation
* Fix to have better version type recognition for Cloudmin
* Fix radio buttons going out of table area
* Fix to display all textareas using monospace font family
* Fix to correct textareas default size
* Fix dozens of other tiny UI issues


#### Version 19.54 (August 17, 2020)
* Add ability for admins to enforce palette for login page [#1488/comment-674190326](https://github.com/authentic-theme/authentic-theme/issues/1488#issuecomment-674190326)
* Add ability to manually register progressive page for module developers [wiki/progressive](https://github.com/authentic-theme/authentic-theme/wiki/Progressive-Pages)
* Fiх to add better outline for selected text in editor [#1490](https://github.com/authentic-theme/authentic-theme/issues/1490#issuecomment-674392206)
* Fix displaying Virtualmin Pro version twice on dashboard
* Fiх to direct to the right form's URL, when opened via proxy [virtualmin.com/69681](https://www.virtualmin.com/node/69681)

#### Version 19.53 (July 28, 2020)
* Add alignment for all table labels to the top vertically, and to the right horizontally for better UX
* Add better mobile device support
* Add control of the state of previous fetch call in mail for Usermin [@629437a](https://github.com/authentic-theme/authentic-theme/commit/629437a6f2f53c29d923eb0c669cd6bcbed25aa1)
* Fix to drop no longer needed row highlight for tables with new labels align
* Fix to slightly enhance initial saturation value for navigation
* Fix loaders positioning in File Manager
* Fiх upload button functionality and alignment [#1483](https://github.com/authentic-theme/authentic-theme/issues/1483)
* Fiх to improve user interactions with notification popups [@d69ccdf](https://github.com/authentic-theme/authentic-theme/commit/d69ccdfb32bbcdaf07a52e4d8db2571834a09202)
* Fiх to properly handle changed IMAP/POP3 login credentials update [usermin/usermin@c763233](https://github.com/webmin/usermin/commit/c763233916938468f12c2b439664e5ab8e1b59e2)

#### Version 19.52 (July 06, 2020)
* Add better display of catched errors upon setting up virtual server in Virtualmin
* Fix a bug when removing bookmarks in File Manager
* Fix top buttons positioning in context menu for File Manager
* Fix to prevent copying to internal buffer, if text on page is selected in File Manager
* Fix to allow only one Multi-Processing Module (MPM) be chosen when configuring Apache modules
* Fiх to keep all cookies secure [@7d6b234](https://github.com/authentic-theme/authentic-theme/commit/7d6b234966be108c047d2c81526ff4e520940bec)
* Fix to color enable/disable virtual server buttons
* Fix stuck loader when using new mail UI in Usermin
* Fix onload error for new mail UI on slow connections in Usermin

#### Version 19.51 (June 30, 2020)
* Add ability to disable select in pair of input radios
* Add to disable compression format for single archive [virtualmin/virtualmin-gpl@d89f950](https://github.com/virtualmin/virtualmin-gpl/commit/d89f950c36b6022b16a204bd78055a31f138cad0#commitcomment-39584388)
* Add a check for update script, if a user installed Git version of Webmin/Usermin [#1477](https://github.com/authentic-theme/authentic-theme/issues/1477)
* Add better show password links styling
* Fiх move arrows positioning [#1473](https://github.com/authentic-theme/authentic-theme/issues/1473)
* Fix language machine translations checkbox display
* Fix config page broken filter functionality
* Fix to consider nearby textarea for chooser
* Fix managed systems menu link detection in Cloudmin
* Fix onload error for mail module in Usermin
* Fix a bug when removing bookmarks in File Manager
* Fix top buttons positioning in context menu for File Manager

#### Version 19.50 (May 10, 2020)
* Add improvements to mail module in Usermin for smoother UX
* Add mail automatic refresh support to mail module in Usermin
* Add support for aliases in new mail composer
* Add better support for HTML descriptions in Custom Commands module [sourceforge.net/tread#015e51d013](https://sourceforge.net/p/webadmin/discussion/600155/thread/015e51d013/#98b2)
* Add clear cache menu option to side slider dropdown
* Add translations to 41 languages
* Add dozens of other UI improvements
* Fix submitting a form on saving a draft, upon composing mail in Usermin (in Safari)
* Fix interruption of standard call by progressive call, without breaking page


#### Version 19.47 (April 06, 2020)
* Add ability to recognize downloads in submitted form
* Add new date/time display format type in mail listing in Usermin
* Add better protection against re-submitting modifier pages on reload
* Add ability to use port and target in custom links [#904](https://github.com/authentic-theme/authentic-theme/issues/904#issuecomment-595632748)
* Add ability to keep autocomplete search on page load, speeding navigation
* Add password meter when editing databases passwords in Virtualmin
* Add ability to copy read-only textarea content to clipboard
* Add Italian, Swedish, French and Japanese language translation updates
* Fiх stats history duration inaccuracy [#1464](https://github.com/authentic-theme/authentic-theme/issues/1464)
* Fix top navigation in Running Processes module for other languages
* Fix missing borders in high-contrast mode
* Fix not to style links on dashboard in alerts
* Fix error message line height and don't convert links to buttons on error pages
* Fix to prevent editor panel go over dropdowns
* Fix to force disable spellcheck for new mail composer
* Fiх to enlarge input fields for locale language and format [#1456](https://github.com/authentic-theme/authentic-theme/issues/1456)
* Fix to use "/var/" dir for storing temporary theme data (like stats)
* Fix edit scheduled backup/another destination UI bugs in Virtualmin
* Fix broken tree-view in extra admin mode in Virtualmin
* Fix blur event for new mail composer in Usermin
* Fix to add missing icon in change password link in navigation menu
* Fix to respect user option for displaying hostname on dashboard
* Fix to print DS record each on new line on Setup DNSSEC Key page in BIND module
* Fix system monitors icons alignment on dashboard
* Fiх reloading and redirects when webprefix is used [webmin/webmin#1195](https://github.com/webmin/webmin/issues/1195)
* Fix displaying password meter while typing

#### Version 19.46 (February 04, 2020)
* Set royal blue color palette as default
* Add recipient (from address book) autocomplete for new mail composer in Usermin
* Add significant even though tiny CSS enhancements
* Add ability to navigate pages using backspace/⇧+backspace (before user interaction)
* Add hotkeys to maximize/normalize file editor window (Alt + ▵/Alt + ▿)
* Add ability to select/deselect row using ⇧ + ▵ or ⇧ + ▿ in File Manager
* Add better post server-error handling for initial load in File Manager
* Add ability to save accordions state used last time on dashboard
* Add ability to clear table/accordion filter with escape key as well
* Fix to improve keyboard navigation (up/down/pgup/pgdn/home/end) in File Manager
* Fix to embed font family and size values inline for new mail composer
* Fix to forbid recalling certain pages on page reload
* Fix to let manually dismiss session reauthenticate modal
* Fix fatal fail on invalid/incomplete regex passed in System Logs/View Logfile
* Fix users in jailed mode in Usermin for File Manager
* Fix tree depth control for multiple modes in File Manager

#### Version 19.45 (January 14, 2020)
* Add stored listing navigation in File Manager [@2405933](https://github.com/authentic-theme/authentic-theme/commit/2405933f5fb526cdafb0377e157dccbbaa89c8c8)
* Add protection against re-submitting progressive/modifier pages
* Add user-friendly reload message upon language change
* Add date/time offset to display server timezone
* Add support for running the theme inside of an iframe
* Add better bottom buttons alignment in navigation menu for long usernames
* Fix file editor not saving files correctly
* Fix broken file editor focus on resize/drag operations
* Fix to maximized file editor window, if called from File Manager
* Fix to improve logic for stealing cursor in File Manager with keyboard navigation
* Fix to return ability to display Command Shell module as it is
* Fix to avoid connection error dialog, if _webmin_ package is being updated
* Fix to avoid styled links in table headers and on progressive pages
* Fix to handle page reloads correctly in Usermin
* Fix stuck Usermin switch in certain cases
* Fiх to avoid warnings about elements with non-unique id [@68b204e](https://github.com/authentic-theme/authentic-theme/commit/68b204e0f10dc786cbad70a5df3ff39c37b06158)

#### Version 19.44 (December 21, 2019)
* Add better support for folders with escaped entries in File Manager
* Add improvements to cursor stealing when using keyboard navigation in File Manager
* Add ability to raise editor's collapsed panel on single click [#629/comment-564448213](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-564448213)
* Add row highlights for certain pages on Virtualmin/Cloudmin [virtualmin.com/67945](https://virtualmin.com/node/67945)
* Add protection against submitting broken form data, while filter is active [@5fb9301](https://github.com/authentic-theme/authentic-theme/commit/5fb9301bc250d5f3af001914d79a41c46dd0a895)
* Add user-friendly reload message upon language change
* Add German, Swedish, Italian, and French language translation updates
* Fiх theme favorites fail-over and possible XSS prevention [webmin/webmin#1156](https://github.com/webmin/webmin/issues/1156)
* Fix file editor's issues: XSS, encoding conversion and other
* Fix horizontal scroll for tree-view in File Manager
* Fix progressive page detection/separation (AWstats, Webalizer, and many other)

#### Version 19.43 (December 07, 2019)
* Set saddle brown color palette as default
* Add various UI improvements
* Add ability to automatically focus rows in post-actions in File Manager [@8317851](https://github.com/authentic-theme/authentic-theme/commit/83178518c3218ad01ee13a8e0368a02143e9c110)
* Add an option to avoid formatting dates using browser (use server format instead)
* Add better support and safety when working with HTML based filenames in File Manager
* Fix numerous and infamous issues with File Manager
* Fiх to improve account level control in File Manager [@ef22ef0](https://github.com/authentic-theme/authentic-theme/commit/ef22ef0d87dcc96147924ef3830327fb1164a27c)
* Fiх breakage as navigating from File Manager to one of the progressive pages [@6cfcfae](https://github.com/authentic-theme/authentic-theme/commit/6cfcfae7922a2395b44ab58a7bb9aa02de93189a)
* Fix to let JavaScript store current select state on popstate
* Fix icon rows look and size (minimal)
* Fix to improve data tables behaviour on popstate
* Fix MySQL/PostgreSQL controls to work on popstate

#### Version 19.42 (November 23, 2019)
* Add ability for side slider to inherit colors from navigation menu
* Add greatly improved icons' rendering for Microsoft Windows users
* Add navigation ability to breadcrumbs for file chooser and improve its icons
* Add support for jailed server owners in File Manager
* Add better support for mobile devices
* Add many small, while important visual improvements
* Fix toning issues for color palettes

#### Version 19.41 (November 08, 2019)
* Add improvements to dark theme and color palettes
* Add better scrollbars styling across browsers
* Add better support for horizontally long tables
* Add better attachments tags management for new mail composer
* Add ConfigServer Security & Firewall have reloadable URLs
* Fix issues with Usermin on mobile devices
* Fix other bugs

#### Version 19.40 (October 31, 2019)
* Add basic stats history charts to dashboard [#1415/comment-542940377](https://github.com/authentic-theme/authentic-theme/issues/1415#issuecomment-542940377)
* Add brand new mail composer with scheduled emails for Usermin [#431/comment-529125690](https://github.com/authentic-theme/authentic-theme/issues/431#issuecomment-529125690)
* Add keyboard navigation support for tree-view in File Manager [#629/comment-526274970](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-526274970)
* Add mobile color themes to blend with current palette [#1405](https://github.com/authentic-theme/authentic-theme/issues/1405)
* Add greater saturation to default navigation color palette
* Add improvements to inbuilt command shell
* Fix possible XSS when adding to favorites
* Fiх context menu call using row icon in File Manager [#1394](https://github.com/authentic-theme/authentic-theme/issues/1394)
* Fiх to prevent progressive output on initial load [#1396](https://github.com/authentic-theme/authentic-theme/issues/1396)
* Fix issues with directory tree-view in File Manager in Usermin
* Fix bundle background load to try/catch errors for callbacks
* Fix CPU core count start from one on dashboard
* Fix reauthenticate screen interaction with other elements, and improve its error handling
* Fix stack order for popovers
* Fix issues with dropdowns in latest versions of Chrome
* Fix other issues and perform many other optimizations

#### Version 19.39 (August 18, 2019)
* Add ability to restore initial sorting for tables [#1386](https://github.com/authentic-theme/authentic-theme/issues/1386)
* Add to show minor theme version
* Add to display datetime in from now format for Running Processes module [#1387/comment-516709651](https://github.com/authentic-theme/authentic-theme/issues/1387#issuecomment-516709651)
* Add to display current user login mode for Virtualmin/Cloudmin
* Fix to prevent possible XSS
* Fix bugs

#### Version 19.38 (July 20, 2019)
* Add to ship Roboto Mono font for smoother UX across platforms
* Fiх minimum value for starting server pagination in File Manager [sourceforge.net/5286](https://sourceforge.net/p/webadmin/bugs/5286)
* Fix to consider case sensitivity when excluding from search in File Manager
* Fix bugs

#### Version 19.37 (July 16, 2019)
* Add ability to exclude entries from search using semicolon separated list in File Manager
* Add caching for searched results in File Manager for faster data management upon large search results
* Add rename and delete operation support on cached search results in File Manager
* Add support for updating alerts on dashboard in background [#1380](https://github.com/authentic-theme/authentic-theme/issues/1380)
* Fix to have greater accuracy when rendering iconed rows
* Fix bugs

#### Version 19.36 (July 03, 2019)
* Fix bugs

#### Version 19.35 (June 23, 2019)
* Add unread message count dynamic update for mail folders in Usermin [#1372](https://github.com/authentic-theme/authentic-theme/issues/1372)
* Add missing error handler for new drag & drop file uploads for Upload and Download module
* Fix downloads for Virtualmin backup virtual servers, MySQL backup database, and other modules
* Fix multiple bugs and made various UI improvements

#### Version 19.34 (June 01, 2019)
* Add ability to detach file to separate editor when editing configs manually
* Add ability to pass currently opened path in File Manager to console [#1359](https://github.com/authentic-theme/authentic-theme/issues/1359)
* Add ability to remember and return to previous page when going back directory up in File Manager
* Add number formatting in File Manager
* Add improved hierarchy display for BIND DNS Server module
* Add ability to revert content for file editor
* Add improved UI for complex schedule chooser [#1342](https://github.com/authentic-theme/authentic-theme/issues/1342)
* Fiх to respect redirects on progressive pages [webmin/webmin#1056](https://github.com/webmin/webmin/issues/1056)
* Fiх to improve client-side sorting by name, to display folders ahead of files in File Manager [#1347](https://github.com/authentic-theme/authentic-theme/issues/1347)
* Fiх to add view labels for zones, when searching [1347](https://github.com/authentic-theme/authentic-theme/issues/1336)
* Fiх redirects for external links [#1344](https://github.com/authentic-theme/authentic-theme/issues/1344)
* Fiх sorting by modified date in File Manager [#1345](https://github.com/authentic-theme/authentic-theme/issues/1345)
* Fiх post reinstall issues for ConfigServer Security & Firewall [#1341](https://github.com/authentic-theme/authentic-theme/issues/1341)
* Fiх pagination delimiter and other small issues in File Manager
* Fiх to have more distinctive scrollbar in navigation menu and right side slider
* Fiх various issues with right slider (white palette and night mode)
* Fix missing link icons in some module (Cluster modules in particular)

#### Version 19.33 (May 06, 2019)
* Add to let user use regex as filename mask in File Manager when searching [@066e11b](https://github.com/authentic-theme/authentic-theme/commit/066e11b54a17c30d6d85b7648ce32b09644e8bf2)
* Add to use regex in find results in File Manager when searching/replacing [@ee71b71](https://github.com/authentic-theme/authentic-theme/commit/ee71b71d1413bd25794fdd3726b29484250b318a)
* Add drag and drop with progress, for file uploads in Upload and Download module [#1334](https://github.com/authentic-theme/authentic-theme/issues/1334)
* Add ability for Usermin user to select default module
* Fix to perfect navigation menu autocomplete links generation, grouping and opening
* Fix occasional broken initial theme post-reload state

#### Version 19.32 (April 28, 2019)
* Add significant improvements to directory listing (support of 1m+ files) in File Manager [@8cdb7a4](https://github.com/authentic-theme/authentic-theme/commit/8cdb7a4eaf9c691dc9f26d5769b102b340f19802)
* Add ability to preview images directly on the server in File Manager [#1323](https://github.com/authentic-theme/authentic-theme/issues/1323#issue-435839231)
* Add ability to encrypt/decrypt files in File Manager [#1322](https://github.com/authentic-theme/authentic-theme/issues/1322#issue-434304461)
* Add ability for File Manager to encrypt/decrypt archives [#1320](https://github.com/authentic-theme/authentic-theme/issues/1320#issue-432834927)
* Add password meter and password visibility toggle [#1327](https://github.com/authentic-theme/authentic-theme/issues/1327)
* Add ability to change document title output [#1326](https://github.com/authentic-theme/authentic-theme/issues/1326#issuecomment-486816033)
* Add user friendly message upon server reboot [#1307](https://github.com/authentic-theme/authentic-theme/issues/1307#issuecomment-469652215)
* Add ability to store opened/closed state of collapsible panels on dashboard upon page refresh [@b201085](https://github.com/authentic-theme/authentic-theme/commit/b201085b5ea13d2c1c8f35986b24126ba81076f5)
* Add perfected history manipulation to move back and forth through the user's history
* Add paste with the same name for files, while keeping extension in File Manager
* Add ability to select all items in directory on all pages for further operations in File Manager
* Add ability to select/deselect a range of checked table rows by holding shift in File Manager
* Add tooltips with size in bytes, numeric user/group and last access/change time to File Manager
* Add ability to pass to compress and download unlimited number of items in File Manager
* Add intuitive folder refresh hotkey (Ctrl+R) in File Manager
* Add hotkeys (Ctrl+A/Ctrl+⇧+A) to select/deselect all items in File Manager
* Add to update file size after closing file editor in File Manager
* Add send browser notification when progressive output is finished and user not looking at the page
* Add improved BIND syntax highlight for manual editors
* Add ability for any user to use favorites
* Add improved error handling
* Fix paste into itself error appearing wrong in some cases in File Manager
* Fix to improve and optimize initial load for File Manager
* Fix to prevent multiple alike processes running possibly causing server going out of memory in File Manager
* Fiх sporadic tree-view errors in File Manager [#1213](https://github.com/authentic-theme/authentic-theme/issues/1213)
* Fix to prettify the look of Webalizer usage statistics
* Fix compose mail button not working on empty mail folder

#### Version 19.31 (February 22, 2019)
* Fix to prevent preloader appearing on progressive pages
* Fix update notice to prevent grouping strings without link
* Fix other minor bugs

#### Version 19.30 (February 22, 2019)
* Add major code refactor, clear and optimize
* Add command shell port reverse search, and ability to interrupt currently running command [#991](https://github.com/authentic-theme/authentic-theme/issues/991)
* Add ability to add file editor to favorites [#1270](https://github.com/authentic-theme/authentic-theme/issues/1270)
* Add ability to auto-remove favorites that no longer exist [#1197](https://github.com/authentic-theme/authentic-theme/issues/1197)
* Add error handlers for server responses [#1047](https://github.com/authentic-theme/authentic-theme/issues/1047)
* Add ability to select/deselect a range of checked table rows by holding shift [webmin/usermin#45](https://github.com/webmin/usermin/issues/45)
* Add ability for user to inject custom links into navigation menu [904](https://github.com/authentic-theme/authentic-theme/issues/904)
* Add display corresponded hostname in command shell port when used with Cloudmin
* Add enhancements for screen reader accessibility [#1284](https://github.com/authentic-theme/authentic-theme/issues/1284)
* Add support for displaying cached memory from system status [webmin/webmin@5344bac](https://github.com/webmin/webmin/commit/5344bacaec3bc1b1524fc59a96b67fdb99774076)
* Add support for nested servers index usage
* Add pre-compressed .gz files for faster initial load
* Fix displaying quotas in servers index
* Fix fatal error when trying to split on array (affected module Linux IPv6 Firewall)
* Fix to improve color combinations for navigation menu palettes
* Fix to balance multi selects
* Fix status label placement in Cloudmin navigation
* Fix over a hundred of other minor bugs and made other improvements

#### Version 19.22 (December 25, 2018)
* Add ability to raise internal file editor from inbuilt command line interface [#1268](https://github.com/authentic-theme/authentic-theme/issues/1268)
* Add ability to resize tree-view in File Manager [#1271](https://github.com/authentic-theme/authentic-theme/issues/1271)
* Add hotkey for toggling word wrap in file viewers [#1264](https://github.com/authentic-theme/authentic-theme/issues/1264)
* Add improved context menu interactions for File Manager [#1184](https://github.com/authentic-theme/authentic-theme/issues/1184) [#1240](https://github.com/authentic-theme/authentic-theme/issues/1240)
* Add warning modal for unsaved forms [#1248](https://github.com/authentic-theme/authentic-theme/issues/1248)
* Add theme pre-reload message [#1248/comment-443444767](https://github.com/authentic-theme/authentic-theme/issues/1248#issuecomment-443444767)
* Add an option to hide pin/unpin navigation menu button [#1241](https://github.com/authentic-theme/authentic-theme/issues/1241)
* Add styling and progressive output for Custom Commands module when cloned [sourceforge.net/5211](https://sourceforge.net/p/webadmin/bugs/5211)
* Fix interactions and restoration of tabs on first load in File Manager [#1246](https://github.com/authentic-theme/authentic-theme/issues/1246)
* Fix new styling for Custom Commands module respect columns config option [#1245](https://github.com/authentic-theme/authentic-theme/issues/1245)
* Fix to improve page auto-scroll user interactions
* Fix code highlight in PHP mixed content mode [#1239](https://github.com/authentic-theme/authentic-theme/issues/1239)
* Fix sporadic fatal errors in File Manager [sourceforge.net/5096](https://sourceforge.net/p/webadmin/bugs/5096)
* Fix missing configuration button for Read User Mail module [#1238](https://github.com/authentic-theme/authentic-theme/issues/1238)
* Fix compose button malfunction on initial load in mail [#1260](https://github.com/authentic-theme/authentic-theme/issues/1260)
* Fix detecting other modifier key being pressed (in-built hotkey functionality)
* Fix backup all databases section for MySQL/PostgreSQL database server
* Fix to revert default navigation menu color to _Royal Blue_

#### Version 19.21 (November 15, 2018)
* Add an error message upon theme update for no connection to GitHub or its API rate limit excess
* Fix not to show updates for releases with dependency issue

#### Version 19.20 (November 14, 2018)
* Add brand new mail listing, search and controls for mailbox module in Usermin [#431/comment-407828197](https://github.com/authentic-theme/authentic-theme/issues/431#issuecomment-407828197)
* Add ability to search for text when editing config files manually [#1198](https://github.com/authentic-theme/authentic-theme/issues/1198)
* Add support to setup and display background for login page [#1195](https://github.com/authentic-theme/authentic-theme/issues/1195)
* Add optimisations to bring speed to dashboard; rely on core subroutines to extract data
* Add brand favicons to display for each module [#1227](https://github.com/authentic-theme/authentic-theme/issues/1227)
* Add to display database quota along with disk space on dashboard [#1206](https://github.com/authentic-theme/authentic-theme/issues/1206)
* Add ability to stop/start automatic scrolling on user interaction [#1224](https://github.com/authentic-theme/authentic-theme/issues/1224)
* Add ability to manually select syntax for editor in File Manager and Custom Commands module [#1222](https://github.com/authentic-theme/authentic-theme/issues/1222)
* Add significant UI improvements to Custom Commands module for default mode
* Add support for creating symbolic links in File Manager [#629/comment-426615864](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-426615864)
* Add ability to control number of shown virtual servers on dashboard [#1200](https://github.com/authentic-theme/authentic-theme/issues/1200)
* Add ability to open multiple tabs simultaneously (quickly) [#1196](https://github.com/authentic-theme/authentic-theme/issues/1196)
* Add theme overlays native support [#1186](https://github.com/authentic-theme/authentic-theme/issues/1186)
* Add ability to disable new mail UI
* Add Japanese, German and Swedish language translation update
* Fix guessing button type mechanism [#1157](https://github.com/authentic-theme/authentic-theme/issues/1157)
* Fix to detect favorites despite presence of home page pointer [#1211](https://github.com/authentic-theme/authentic-theme/issues/1211)
* Fix data filter to support paste event; improve its performance [#1207](https://github.com/authentic-theme/authentic-theme/issues/1207)
* Fix to utilize fail proof load method for theme language strings [#1203/comment-429554824](https://github.com/authentic-theme/authentic-theme/issues/1203#issuecomment-429554824)
* Fix MySQL/PostgreSQL vertical row editing interface mode; fix back (cancel) button
* Fix not to leak hostname and product version on login page [webmin/webmin#972](https://github.com/webmin/webmin/issues/972)
* Fix download issues across UI [virtualmin.com/58225](https://virtualmin.com/node/58225) [sourceforge.net/5176](https://sourceforge.net/p/webadmin/bugs/5176)
* Fix referer error when downloading file in some browsers [virtualmin.com/59234](https://virtualmin.com/node/59234)
* Fix connection error message appearing on slow connections [sourceforge.net/5059](https://sourceforge.net/p/webadmin/bugs/5059) [sourceforge.net/5187](https://sourceforge.net/p/webadmin/bugs/5187)
* Fix to display local time on dashboard [sourceforge.net/5212](https://sourceforge.net/p/webadmin/bugs/5212)
* Fix module link detection at navigation menu in Usermin
* Fix to improve editor's height and its save buttons positioning
* Fix to catch pages with progressive output called from autocomplete menu
* Fix to stretch viewer/editor container to full width in ConfigServer Security & Firewall version
* Fix to avoid File Manager to load bundle check on foreign modules
* Fix sorting by size issue in File Manager for folders being redundant
* Fix notifications alignment for multiple configurations [#1186](https://github.com/authentic-theme/authentic-theme/issues/1186)
* Fix directory download issue in user mode in File Manager [virtualmin.com/58448](https://virtualmin.com/node/58448)
* Fix not to scroll confirmation page for Package Updates on Debian
* Fix not to log deleted files in File Manager
* Fix excessive escaping for upload progress data in File Manager [#1174](https://github.com/authentic-theme/authentic-theme/issues/1174)
* Fix read mail link not loading content [#1177](https://github.com/authentic-theme/authentic-theme/issues/1177)
* Fix dark palettes erroneously applying some rules to content page [#1175](https://github.com/authentic-theme/authentic-theme/issues/1175)


#### Version 19.19 (June 26, 2018)
* Add improved context menu to File Manager [#1147](https://github.com/authentic-theme/authentic-theme/issues/1147)
* Add ability to disable real-time monitoring for disks  [#1062](https://github.com/authentic-theme/authentic-theme/issues/1062)
* Add to restore ability to set format for displayed dates in non-UI mode
* Add ability to force _tar_ command when downloading as archive in File Manager
* Add Japanese and German language translation updates
* Add theme [channel](https://t.me/authentic_theme) on Telegram
* Fix missing logo due to prior code refactoring
* Fix escaping file name for uploads [#1162](https://github.com/authentic-theme/authentic-theme/issues/1162)
* Fix issues with navigation menu on touch-enabled devices [#1143](https://github.com/authentic-theme/authentic-theme/issues/1143) [virtualmin.com/57264](https://virtualmin.com/node/57264)
* Fix to perfect context menu positioning in File Manager [#1141](https://github.com/authentic-theme/authentic-theme/issues/1141)
* Fix forms submitting data from previous calls on history actions [#1144](https://github.com/authentic-theme/authentic-theme/issues/1144)
* Fix issues related to sorting columns containing size values [virtualmin.com/57297](https://virtualmin.com/node/57297)
* Fix to adjust folder container height accordingly
* Fix numerous of other bugs

#### Version 19.14...19.18 (May 12, 2018)
* Add new tree-view for mail folders [#431](https://github.com/authentic-theme/authentic-theme/issues/431)
* Add ability to download directories in File Manager
* Add an option to enable/disable container offset [virtualmin.com/56924](https://virtualmin.com/node/56924)
* Add Swedish and Albanian language translation updates
* Fix help tooltip to be used inside of any container [#1134](https://github.com/authentic-theme/authentic-theme/issues/1134)
* Fix File-Manager minor bugs [#1137](https://github.com/authentic-theme/authentic-theme/issues/1137) [#1138](https://github.com/authentic-theme/authentic-theme/issues/1138)
* Fix bugs in new tree-view for mail folders
* Fix to perfect progressive output processor [sourceforge.net/5112](https://sourceforge.net/p/webadmin/bugs/5112)
* Fix automatic refresh to be more specific about triggering [virtualmin.com/56923](https://virtualmin.com/node/56923)
* Fix downloads work correctly in Upload and Download module [virtualmin.com/56925](https://virtualmin.com/node/56925)
* Fix detection of initially requested page based on custom header [virtualmin.com/56916](https://virtualmin.com/node/56916)

#### Version 19.13 (April 23, 2018)
* Add perfected mechanisms for controlling page cache and dealing with history steps
* Add high contrast mode [virtualmin.com/56725](https://virtualmin.com/node/56725) [virtualmin.com/56817](https://virtualmin.com/node/56817)
* Add ability to refresh page content that was submitted by form [#972](https://github.com/authentic-theme/authentic-theme/issues/972)
* Add ability for regular user to control color filters for navigation menu
* Add ability to hide Webmin switch in server owner mode [#1116](https://github.com/authentic-theme/authentic-theme/issues/1116)
* Add ability to open appropriate link when clicking on HTML5 notifications
* Add ability to File Manager to interrupt current directory load request
* Add trigger to File Manager to refresh directory contents on closing inbuilt command shell
* Add showing available theme versions on configuration page [#1097](https://github.com/authentic-theme/authentic-theme/issues/1097)
* Add ability to exclude Usermin from theme updates
* Add Japanese and Swedish language translation updates
* Fix to intense buttons saturation and contrast
* Fix internal locale conversion work for all elements [virtualmin.com/56882](https://virtualmin.com/node/56882)
* Fix showing post apply notifications for ConfigServer Security & Firewall
* Fix post download invalidly replacing URL
* Fix loading correspondent navigation menu if clicked from virtual servers/managed systems
* Fix logic for accordions on configuration pages
* Fix navigation detection for ambiguous links
* Fix chooser positioning for some modules
* Fix to use other means for storing user configuration data to avoid modifying the package files
* Fix error handler for invalid path on initial load in File Manager
* Fix to bring back logo support in reseller accounts
* Fix printing date/time for non UI calls
* Fix select/invert buttons logic for disabled and single checkboxes
* Fix initial menu content after login for defaults [#1099](https://github.com/authentic-theme/authentic-theme/issues/1099)
* Fix missing default form method  [#893/comment-379585204](https://github.com/webmin/webmin/issues/893#issuecomment-379585204)
* Fix numerous of other issues and made dozens of improvements


#### Version 19.12 (April 01, 2018)
* Add ability to pin right side slider; add tooltips on its buttons [#968](https://github.com/authentic-theme/authentic-theme/issues/968)
* Add an option to always display vertical scrollbar [#1092](https://github.com/authentic-theme/authentic-theme/issues/1092)
* Fix side slider being stuck on unsaved configuration [#1093](https://github.com/authentic-theme/authentic-theme/issues/1093)
* Fix Mailman module not submitting forms [virtualmin.com/55729](https://virtualmin.com/node/55729)

#### Version 19.11 (March 28, 2018)
* Fix failing File Manager initial load for specific configurations [#1090](https://github.com/authentic-theme/authentic-theme/issues/1090)
* Fix date/time conversion for side slider
* Fix external links always open on new tab
* Fix container width when used with fixed side slider

#### Version 19.10 (March 28, 2018)
* Add advanced tree-view to File Manager [#1066](https://github.com/authentic-theme/authentic-theme/issues/1066)
* Add HTML editor to File Manager [#1031](https://github.com/authentic-theme/authentic-theme/issues/1031)
* Add an option to File Manager to choose default sorting in module configuration
* Add an option to File Manager to choose number of records per page [webmin/webmin#857](https://github.com/webmin/webmin/issues/857)
* Add date/time conversion support based on locale [#1035](https://github.com/authentic-theme/authentic-theme/issues/1035)
* Add search on selects for Actions Log, System Logs, Edit Config File manually and other pages
* Add to display Apache/Nginx access and error logs' URL strings decoded [webmin/webmin#686](https://github.com/webmin/webmin/issues/686)
* Add Command Shell module configuration control from inside drop-down terminal
* Add displaying notification upon enabled caps-lock for password inputs [#1039](https://github.com/authentic-theme/authentic-theme/issues/1039)
* Add an option to allow navigation menu to be always collapsed [#1032](https://github.com/authentic-theme/authentic-theme/issues/1032)
* Add Japanese, German and Swedish language translation updates
* Add German translation to locale help [#1052](https://github.com/authentic-theme/authentic-theme/issues/1052)
* Fix large content sticking out of the main container
* Fix stuck upload window and abandoned upload progress for wheel users [#1041](https://github.com/authentic-theme/authentic-theme/issues/1041)
* Fix stuck cache issue for browsers after theme update
* Fix post change theme behaviour [#1050](https://github.com/authentic-theme/authentic-theme/issues/1050)
* Fix to display side slider in kiosk mode on first load
* Fix editor to highlight only selected words
* Fix stuck pagination issue in File Manager [virtualmin.com/56381](https://www.virtualmin.com/node/56381)
* Fix form submission for strict methods [#1042](https://github.com/authentic-theme/authentic-theme/issues/1042)
* Fix to disallow multiple field to keep PCI scanners happy [webmin/webmin@16445b6](https://github.com/webmin/webmin/commit/16445b60e2ba64f57c548c6d409aac22c7100986)
* Fix to preserve newlines when wrapping configuration pages [#1045](https://github.com/authentic-theme/authentic-theme/issues/1045)
* Fix lost language strings on session expire [#1020](https://github.com/authentic-theme/authentic-theme/issues/1020)
* Fix buttons in table rows to open correct link


#### Version 19.09.2 (February 22, 2018)
* Add fail proof method of extracting page content with broken HTML [webmin/webmin#825](https://github.com/webmin/webmin/issues/825)
* Add better Cloudmin support and fixed corresponding issues
* Add German and Catalan language translation updates
* Fix to drop using smartmatch [#1014](https://github.com/authentic-theme/authentic-theme/issues/1014)
* Fix to contrast the look of the pop-up reauthentication screen
* Fix various UI issues

#### Version 19.09.1 (February 14, 2018)
* Add highlight of matched strings for code-viewer
* Add listener for user interaction before triggering autofocus [virtualmin.com/55770](https://www.virtualmin.com/node/55770)
* Add Swedish and German language translation updates
* Fix print issues in mail modules [#1012](https://github.com/authentic-theme/authentic-theme/issues/1012)
* Fix update script to support minor versions
* Fix to re-enable accurate security notifications for ConfigServer Security & Firewall
* Fix numerous of other small issues

#### Version 19.09 (February 06, 2018)
* Add better highlights for Apache and Nginx configuration files [#981](https://github.com/authentic-theme/authentic-theme/issues/981)
* Add support for detecting encoding using special comment in file's content [#987](https://github.com/authentic-theme/authentic-theme/issues/987)
* Add Webmin/Usermin version check, before installing development version of the theme using UI [#966](https://github.com/authentic-theme/authentic-theme/issues/966)
* Add support for fast navigation using anchors [#1005](https://github.com/authentic-theme/authentic-theme/issues/1005)
* Add improved support for Usermin
* Add padding for collapsed panels' container based on navigation width
* Add close button for inbuilt command shell
* Fix code highlight for PHP files [#997](https://github.com/authentic-theme/authentic-theme/issues/997)
* Fix occasionally losing messages for server notifications
* Fix issues with links and page refresh for Servers Index module
* Fix navigation trigger being appended twice
* Fix menu detection for ambiguous link entries [#994](https://github.com/authentic-theme/authentic-theme/issues/994)
* Fix version comparison logic
* Fix to improve development versions control [@c22908d](https://github.com/authentic-theme/authentic-theme/commit/c22908d24155a96de8d30061a074d01d75a43cdc)
* Fix to generate security notification, only for mentioned ports for ConfigServer Security & Firewall [@5b957fe](https://github.com/authentic-theme/authentic-theme/commit/5b957fe8f75ca5d16eebe7fb241c07ff926319e7)
* Fix internal redirects [#982](https://github.com/authentic-theme/authentic-theme/issues/982)
* Fix to secure session id [@b85d67d](https://github.com/authentic-theme/authentic-theme/commit/b85d67d56260d8bb285e7a2a93d8620dc8ac4ea5)
* Fix to set mail tab to be default in Usermin
* Fix scores of other unreported bugs

#### Version 19.08 (January 08, 2018)
* Add drag and drop file uploads to File Manager [#979](https://github.com/authentic-theme/authentic-theme/issues/979#issuecomment-355857544)
* Fix not to log XHR requests [webmin/webmin#740](https://github.com/webmin/webmin/issues/740)
* Fix HTML editor mode for mail [#977](https://github.com/authentic-theme/authentic-theme/issues/977)
* Fix navigation menu and product switch to be set correctly in different modes
* Fix HTML editor's controls for night mode
* Fixed bugs [#970](https://github.com/authentic-theme/authentic-theme/issues/970) [#971](https://github.com/authentic-theme/authentic-theme/issues/971) [#976](https://github.com/authentic-theme/authentic-theme/issues/976) [virtualmin.com/54918](https://www.virtualmin.com/node/54918)


#### Version 19.07 (December 28, 2017)
* Fixed upcoming bugs

#### Version 19.06 (December 24, 2017)
* Add progressive output for inbuilt command shell [#955](https://github.com/authentic-theme/authentic-theme/issues/955)
* Fix to query real-time monitoring only on active window [#960](https://github.com/authentic-theme/authentic-theme/issues/960)
* Fix file downloads; display download progress
* Fixed bugs [#959](https://github.com/authentic-theme/authentic-theme/issues/959)

#### Version 19.05 (December 20, 2017)
* Add continuous mode for top loader [#913](https://github.com/authentic-theme/authentic-theme/issues/913)
* Add complete support for Servers Index module
* Add user-friendly message requiring to enable JavaScript [#930](https://github.com/authentic-theme/authentic-theme/issues/930)
* Fix UX for Firefox users improving elements alignment
* Fix multiple crucial issues
* Fixed bugs [#824](https://github.com/authentic-theme/authentic-theme/issues/824) [#923](https://github.com/authentic-theme/authentic-theme/issues/923) [#925](https://github.com/authentic-theme/authentic-theme/issues/925) [#927](https://github.com/authentic-theme/authentic-theme/issues/927) [#928](https://github.com/authentic-theme/authentic-theme/issues/928) [#933](https://github.com/authentic-theme/authentic-theme/issues/933)

#### Version 19.04 (December 04, 2017)
* Add real-time monitoring [#896](https://github.com/authentic-theme/authentic-theme/issues/896)
* Fixed bugs [#898](https://github.com/authentic-theme/authentic-theme/issues/898) [#900](https://github.com/authentic-theme/authentic-theme/issues/900) [#902](https://github.com/authentic-theme/authentic-theme/issues/902) [#905](https://github.com/authentic-theme/authentic-theme/issues/905) [#906](https://github.com/authentic-theme/authentic-theme/issues/906) [#912](https://github.com/authentic-theme/authentic-theme/issues/912) [#913](https://github.com/authentic-theme/authentic-theme/issues/913) [webmin/webmin#711](https://github.com/webmin/webmin/pull/711) [virtualmin.com/54475](https://www.virtualmin.com/node/54475) [virtualmin.com/54476](https://www.virtualmin.com/node/54476)

#### Version 19.03 (November 19, 2017)
* Add ability to remove commands from history list of drop-down terminal [#828](https://github.com/authentic-theme/authentic-theme/issues/828)
* Add pop-up authentication screen to let user reauthenticate on session expire [#892](https://github.com/authentic-theme/authentic-theme/issues/892)
* Add to produce user-friendly message in case server can't be reached [#846](https://github.com/authentic-theme/authentic-theme/issues/846)
* Add quick accessibility menu for products and its references [#886](https://github.com/authentic-theme/authentic-theme/issues/886)
* Add return to System Information page after applied theme update [#882](https://github.com/authentic-theme/authentic-theme/issues/882)
* Fixed bugs [#872](https://github.com/authentic-theme/authentic-theme/issues/872) [#878/comment-341989960](https://github.com/authentic-theme/authentic-theme/issues/878#issuecomment-341989960) [#880](https://github.com/authentic-theme/authentic-theme/issues/880) [#883](https://github.com/authentic-theme/authentic-theme/issues/883) [#887](https://github.com/authentic-theme/authentic-theme/issues/887) [#888](https://github.com/authentic-theme/authentic-theme/issues/888) [#889](https://github.com/authentic-theme/authentic-theme/issues/889) [#890](https://github.com/authentic-theme/authentic-theme/issues/890) [#893](https://github.com/authentic-theme/authentic-theme/issues/893) [#895](https://github.com/authentic-theme/authentic-theme/issues/895) [#897](https://github.com/authentic-theme/authentic-theme/issues/897)

#### Version 19.02 (November 7, 2017)
* Add to wrap long configuration pages into accordions for faster navigation
* Add to support latest version of ConfigServer Security & Firewall
* Add to focus first form element on page render [#871](https://github.com/authentic-theme/authentic-theme/issues/871) [virtualmin.com/53791](https://www.virtualmin.com/node/53791)
* Add to revert bookmark editor in File Manager configuration
* Fixed bugs [#834](https://github.com/authentic-theme/authentic-theme/issues/834) [#857/comment-338026476](https://github.com/authentic-theme/authentic-theme/issues/857#issuecomment-338026476) [#860](https://github.com/authentic-theme/authentic-theme/issues/860) [#862](https://github.com/authentic-theme/authentic-theme/issues/862) [#866](https://github.com/authentic-theme/authentic-theme/issues/866) [#867](https://github.com/authentic-theme/authentic-theme/issues/867) [#869](https://github.com/authentic-theme/authentic-theme/issues/869) [#872](https://github.com/authentic-theme/authentic-theme/issues/872) [#874](https://github.com/authentic-theme/authentic-theme/issues/874) [#875](https://github.com/authentic-theme/authentic-theme/issues/875) [#878](https://github.com/authentic-theme/authentic-theme/issues/878)

#### Version 19.01 (October 16, 2017)
* Add container offset to be shown only on high resolution screens
* Fix page reloading to take back to previously used page
* Swedish language update [#836](https://github.com/authentic-theme/authentic-theme/issues/836)
* Albanian language update [#837](https://github.com/authentic-theme/authentic-theme/issues/837)
* Fixed bugs [#821](https://github.com/authentic-theme/authentic-theme/issues/821) [#838](https://github.com/authentic-theme/authentic-theme/issues/838) [#842](https://github.com/authentic-theme/authentic-theme/issues/842) [#844](https://github.com/authentic-theme/authentic-theme/issues/844) [#848](https://github.com/authentic-theme/authentic-theme/issues/848) [#849](https://github.com/authentic-theme/authentic-theme/issues/849) [#850](https://github.com/authentic-theme/authentic-theme/issues/850) [#851](https://github.com/authentic-theme/authentic-theme/issues/851) [#852](https://github.com/authentic-theme/authentic-theme/issues/852) [#853](https://github.com/authentic-theme/authentic-theme/issues/853) [#855](https://github.com/authentic-theme/authentic-theme/issues/855) [#856](https://github.com/authentic-theme/authentic-theme/issues/856) [#857](https://github.com/authentic-theme/authentic-theme/issues/857) [#859](https://github.com/authentic-theme/authentic-theme/issues/859) [webmin/webmin#639/comment-333394539](https://github.com/webmin/webmin/issues/639#issuecomment-333394539)

#### Version 19.00 (September 30, 2017)
* Single-page application design delivers you the fastest and smoothest _UX_ you've ever experienced
* Multiple stability and usability enhancements
* Dropped support for _Internet Explorer 11_ [#818](https://github.com/authentic-theme/authentic-theme/issues/818)
* Fixed bugs [#754](https://github.com/authentic-theme/authentic-theme/issues/754) [#786](https://github.com/authentic-theme/authentic-theme/issues/786) [#807](https://github.com/authentic-theme/authentic-theme/issues/807) [#812](https://github.com/authentic-theme/authentic-theme/issues/812) [#822](https://github.com/authentic-theme/authentic-theme/issues/822) [#825](https://github.com/authentic-theme/authentic-theme/issues/825) [#827](https://github.com/authentic-theme/authentic-theme/issues/827) [#832](https://github.com/authentic-theme/authentic-theme/issues/832) [#833](https://github.com/authentic-theme/authentic-theme/issues/833) [webmin/webmin#652](https://github.com/webmin/webmin/pull/652) [virtualmin.com/53995](https://www.virtualmin.com/node/53995) [virtualmin.com/53811](https://www.virtualmin.com/node/53811) [virtualmin.com/53082](https://www.virtualmin.com/node/53082) [virtualmin.com/53174](https://www.virtualmin.com/node/53174) [virtualmin.com/53358](https://www.virtualmin.com/node/53358) [virtualmin.com/53722](https://www.virtualmin.com/node/53722) [configserver.com/10414](https://forum.configserver.com/viewtopic.php?f=5&t=10414#p28652)


---------------------------------
&nbsp;&nbsp;[18.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1800-may-26-2016)
&nbsp;&nbsp;[17.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1700-october-11-2015)
&nbsp;&nbsp;[16.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1600-september-18-2015)
&nbsp;&nbsp;[15.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1500-august-23-2015)
&nbsp;&nbsp;[14.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1400-july-21-2015)
&nbsp;&nbsp;[13.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1300-may-24-2015)
&nbsp;&nbsp;[12.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1200-may-3-2015)
&nbsp;&nbsp;[11.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1100-mar-25-2015)
&nbsp;&nbsp;[10.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-1000-mar-4-2015)
&nbsp;&nbsp;[9.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-900-feb-1-2015)
&nbsp;&nbsp;[8.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-800-jan-4-2015)
&nbsp;&nbsp;[7.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-700-dec-21-2014)
&nbsp;&nbsp;[6.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-600-nov-6-2014)
&nbsp;&nbsp;[5.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-500-oct-30-2014)
&nbsp;&nbsp;[4.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-400-oct-9-2014)
&nbsp;&nbsp;[3.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-300-oct-5-2014)
&nbsp;&nbsp;[2.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-200-oct-1-2014)
&nbsp;&nbsp;[1.00](https://github.com/authentic-theme/authentic-theme/blob/18/CHANGELOG.md#version-100-sep-21-2014)
