## Changelog

#### Version 19.21 (November 15, 2018)
* Add an error message upon theme update for no connection to GitHub or its API rate limit excess
* Fix not to show updates for releases with dependency issue

#### Version 19.20 (November 14, 2018)
* Add brand new mail listing, search and controls for mailbox module in Usermin [#431/comment-407828197](https://github.com/authentic-theme/authentic-theme/issues/431#issuecomment-407828197)
* Add ability to search for text when editing config files manually [#1198](https://github.com/authentic-theme/authentic-theme/issues/1198)
* Add support to setup and display background for login page [#1195](https://github.com/authentic-theme/authentic-theme/issues/1195)
* Add optimisations to bring speed to Dashboard; rely on core subroutines to extract data
* Add brand favicons to display for each module [#1227](https://github.com/authentic-theme/authentic-theme/issues/1227)
* Add to display database quota along with disk space on Dashboard [#1206](https://github.com/authentic-theme/authentic-theme/issues/1206)
* Add ability to stop/start automatic scrolling on user interaction [#1224](https://github.com/authentic-theme/authentic-theme/issues/1224)
* Add ability to manually select syntax for editor in File Manager and Custom Commands module [#1222](https://github.com/authentic-theme/authentic-theme/issues/1222)
* Add significant UI improvements to Custom Commands module for default mode
* Add support for creating symbolic links in File Manager [#629/comment-426615864](https://github.com/authentic-theme/authentic-theme/issues/629#issuecomment-426615864)
* Add ability to control number of shown virtual servers on Dashboard [#1200](https://github.com/authentic-theme/authentic-theme/issues/1200)
* Add ability to open multiple tabs simultaneously (quickly) [#1196](https://github.com/authentic-theme/authentic-theme/issues/1196)
* Add theme overlays native support [#1186](https://github.com/authentic-theme/authentic-theme/issues/1186)
* Add ability to disable new mail UI
* Add Japanese, German and Swedish language translation update
* Set navigation menu to default to White palette upon fresh installs
* Fix guessing button type mechanism [#1157](https://github.com/authentic-theme/authentic-theme/issues/1157)
* Fix to detect favorites despite presence of home page pointer [#1211](https://github.com/authentic-theme/authentic-theme/issues/1211)
* Fix data filter to support paste event; improve its performance [#1207](https://github.com/authentic-theme/authentic-theme/issues/1207)
* Fix to utilize fail proof load method for theme language strings [#1203/comment-429554824](https://github.com/authentic-theme/authentic-theme/issues/1203#issuecomment-429554824)
* Fix MySQL/PostgreSQL vertical row editing interface mode; fix back (cancel) button
* Fix not to leak hostname and product version on login page [webmin/webmin#972](https://github.com/webmin/webmin/issues/972)
* Fix download issues across UI [virtualmin.com/58225](https://virtualmin.com/node/58225) [sourceforge.net/5176](https://sourceforge.net/p/webadmin/bugs/5176)
* Fix referer error when downloading file in some browsers [virtualmin.com/59234](https://virtualmin.com/node/59234)
* Fix connection error message appearing on slow connections [sourceforge.net/5059](https://sourceforge.net/p/webadmin/bugs/5059) [sourceforge.net/5187](https://sourceforge.net/p/webadmin/bugs/5187)
* Fix to display local time on Dashboard [sourceforge.net/5212](https://sourceforge.net/p/webadmin/bugs/5212)
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

<!--- separator --->

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
