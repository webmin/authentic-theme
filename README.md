![webmin](https://img.shields.io/badge/Webmin-1.730%2B-green.svg)
![usermin](https://img.shields.io/badge/Usermin-1.640%2B-green.svg)
![virtualmin](https://img.shields.io/badge/Virtualmin-4.14%2B-green.svg)
![cloudmin](https://img.shields.io/badge/Cloudmin-8.01%2B-green.svg)
#Contents

* [Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)
* [Download![](https://rostovtsev.ru/pub/media/icons/download-23x14.png)](https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz)
* [About](#about)
* [FAQ](#faq)
* [Troubleshoot](#troubleshoot)
* [Development](#development)
* [Donation![](https://rostovtsev.ru/pub/media/icons/heart-23x15.png)](#donation)
* [License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)

##About
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

[![ScreenShot](https://raw.githubusercontent.com/qooob/authentic-theme/master/images/screenshot.png)](http://youtu.be/gfuPFuGpyv8)

####Principles
* Make the theme fully support all _Webmin/Usermin_ modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices

####Features
* Mail *notifications* upon unauthenticated user landing on login page and user successful login
* Unprecedentedly *convenient and complete navigation* for both desktop and mobile versions
* *Autocomplete* for quick and effective navigation
* *Hotkeys* for quick access control
* *Code highlight* when editing files manually
* Extensive list of customizable theme *settings*, with ability to embed user *logos*, *styles* and *scripts*
* Extended support for *ConfigServer Security & Firewall*

####Requirements
* Webmin _1.730+_ (required), Usermin _1.640+_ (optional), Virtualmin _4.14+_ (optional), Cloudmin _8.01+_ (optional)

####Recommended modules
* Installed _Net::SSLeay_ module, to make automatic update notifications work

####Browser support

######![](https://rostovtsev.ru/pub/media/icons/chrome-16.png) Chrome 24+

######![](https://rostovtsev.ru/pub/media/icons/firefox-16.png) Firefox 5+

######![](https://rostovtsev.ru/pub/media/icons/opera-16.png) Opera 18+

######![](https://rostovtsev.ru/pub/media/icons/safari-16.png) Safari 6+

######![](https://rostovtsev.ru/pub/media/icons/internet-explorer-16.png) IE 10+


###FAQ
####How do I install _Authentic_ Theme?

#####Webmin

  To install _Autentic_ Theme from repository, just `clone` it into your wherever Webmin binaries folder _(libexec)_ is or [download](https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz) it directly and install it going from Webmin:

  `Webmin->Webmin Configuration->Webmin Themes->Install themes->From uploaded file`

#####Usermin
  **a)** I'd recommend to create a _symlink_ to already installed _Authentic_ Theme, which will enable you to only update Webmin installation of the theme not both.

  Creating a _symlink_ as easy as it gets by running as root the following:

  `ln -s /usr/libexec/webmin/authentic-theme /usr/libexec/usermin/authentic-theme`

> The above implies that Webmin binaries on your system are installed under `/usr/libexec/webmin/` and Usermin installation is in `/usr/libexec/usermin/`. The above is true for _CentOS_ and other RHEL distros at least. You could easily though find out where your installations are by running `/usr/bin/whereis webmin` or `/usr/bin/whereis usermin`.

  **b)** Nevertheless, you could simply install Usermin theme using the same procedure as for Webmin. To install a copy for Usermin go to:

    `Webmin->Usermin Configuration->Usermin Themes->Install themes->From uploaded file`

#####Virtualmin/Cloudmin
There is no need to take any additional actions. In case _Virtualmin_ or _Cloudmin_ modules are installed, it will be automatically detected and supported.

####How do I set custom logos?
Custom logos can be easily set for both authenticated users and for login screen. It can be done by coping a file named `logo.png/logo_welcome.png` to _Authentic_ Theme *configuration* folder. It's located to wherever _Webmin/Usermin_ sets it's configuration directory. For example, on most systems this path would resolve to `/etc/webmin/authentic-theme` for _Webmin_ and `/etc/usermin/authentic-theme` for _Usermin_. Make sure that the file containing logo is called `logo.png` for authenticated users and `logo_welcome.png` for login screen. You can access logos with custom CSS styles (read below) by its class name, which is correspondingly `_logo/_logo_welcome`. Recommended size is _180x90_ pixels. In case you want to remove the logo, just delete this file from configuration directory. In case you want to have _Authentic_ Theme logo, you can find it in theme installation folder (usually located at `/usr/libexec/webmin/authentic-theme`), under images directory, with the file name called `__logo.png`. Don't forget to rename it, to make it work, when uploading to *configuration* directory.

####How do I load custom styles?
Custom styles are set by the same procedure described for the logos above. Only the file name that has to be copied to `/etc/webmin/authentic-theme` must be `styles.css`. For example, if you want to change `font-family` for the theme, you would have to add the following to custom `styles.css`:

```CSS
body,
html,
.tooltip,
.popover {
    font-family: "Times New Roman", Times, serif;
}
```

####How do I load custom scripts?
It's done the same way as described for styles and logos above. The file name that has to be copied to `/etc/webmin/authentic-theme` must be `scripts.js`. For example, if you want to load custom script and output something to browser's console, you would have to add the following to `scripts.js`:

```JavaScript
console.log('Script loaded...');
```

> Be advised, you might be surprised to see that your script is executed twice. It's because we technically have two `documents`, first is `main` container and second is `right` side that is loaded in _iframe_. You must refer to the exact `document` to make your script executed right.


####How do I use theme settings?
Theme can be tweaked using inbuilt _settings_. The list of the _settings_ will be growing, depending on users' requests.


```JavaScript
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//							Authentic Theme settings since version 11.55								//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Enable/disable Easy Pie Charts on System Information page. Default is set to `true`
settings_sysinfo_easypie_charts = true;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//							Authentic Theme settings since version 11.50								//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Enable/disable hotkeys usage
settings_hotkeys_active = true;

// Set hotkeys modifier. Available values are `altKey/ctrlKey/metaKey`.
// Note: `metaKey` is Windows/iOS special key. Default is set to `altKey`.
settings_hotkey_toggle_modifier = 'altKey';

// Set hotkey value for each action. For example, in case `settings_hotkey_toggle_modifier` is set to `ctrlKey` and one
// of the following options, let's say, `settings_hotkey_toggle_key_virtualmin` is set to 'i', then in order to switch
// to Virtualmin, you would have to click _Ctrl+I_. Default values are set as following: `w` for Webmin, `v` for Virtualmin,
// `c` for Cloudmin, `u` for Usermin, `m` for Webmail, `s` for focusing on search filed and `r` for performing page refresh.
settings_hotkey_toggle_key_webmin = 'w';
settings_hotkey_toggle_key_virtualmin = 'v';
settings_hotkey_toggle_key_cloudmin = 'c';
settings_hotkey_toggle_key_usermin = 'u';
settings_hotkey_toggle_key_webmail = 'm';
settings_hotkey_focus_search = 's';
settings_hotkey_reload = 'r';

// Enable/disable reloading of the right page when changing between Webmin/Virtualmin/Cloudmin
settings_right_reload = true;

// Where do you want to go after you load Virtualmin/Cloudmin the first time or where do you want to go when switching to Virtualmin/Cloudmin
// and `settings_right_reload` is set to `true`? It can be any valid Virtualmin/Cloudmin URL, that you can extract from the currently opened
// right side page (to extract it, open the right frame's source, where you'll find the URL that you need to set as default). The default
// value is `'sysinfo.cgi'` (System Information). It's important that URL has no slash at the begining. See default examples below.
settings_right_virtualmin_default = 'virtual-server/summary_domain.cgi?dom=142488888426248';
settings_right_cloudmin_default = 'server-manager/edit_serv.cgi?id=1422426860414460';

// Replace right page header links, such as, `Module Config`, `Preferences`, `Search Docs..` with icons
settings_right_iconize_header_links = true;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//							Authentic Theme settings since version 11.00								//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Enable/disable loader/spinner for the left frame
settings_loader_left = true;

// Enable/disable loader/spinner for the right frame
// Note: To prematurely dismiss right frame loader,
//       click on it using double mouse click or
//       quickly press Shift key two times
settings_loader_right = true;

// Replace dots in mailbox delimiter to slashes (UI only)
settings_mailbox_slash_delimiter = true;

// Autoscroll window down, upon page is populated from server-side
settings_window_autoscroll = true;

// Make all accordions expanded on System Information page
settings_sysinfo_expand_all_accordions = true;

// Check for theme updates on System Information page
settings_sysinfo_theme_updates = true;

// Check for CSF updates on System Information page
settings_sysinfo_csf_updates = true;

// Show/hide Webmin->Refresh Modules link on the left menu
settings_leftmenu_section_hide_refresh_modules = false;

// Show/hide Webmin->Unused Modules link on the left menu
settings_leftmenu_section_hide_unused_modules = false;

// Show/hide left menu's language button/link
settings_leftmenu_button_language = false;

// Show/hide left menu's refresh button/link
settings_leftmenu_button_refresh = true;

// Show Virtualmin->Install Scripts link on the left menu
settings_leftmenu_vm_installscripts = true;

// Show Virtualmin->Edit Web Pages link on the left menu
settings_leftmenu_vm_webpages = true;

// Show Virtualmin->Backup and Restore->Amazon S3 Buckets link on the left menu
settings_leftmenu_vm_backup_amazon = true;

// Show left menu's single links' icons in Virtualmin/Cloudmin
settings_leftmenu_singlelink_icons = true;

// Security notifications
// Format: 'Message|Subject|Comma separated list of users/emails|Comma separated list of trusted/ignored IPs'
// Usage: '%3 login page is accessed by unauthenticated user from %2|%3 login page access alert|root,user@example.org|1.2.3.4,FE00:0000:0000:0000:0000:AAAA:0000:0000'
// Output: From: root, To: Root, Subject: Webmin successful login alert, Message: Webmin successful login alert for user root from 2.3.4.5

// Notify when unauthenticated user is seeing pre-login banner
settings_security_notify_on_pre_login_request = '%3 pre-login page is accessed by unauthenticated user from %2|%3 login page access alert|root';

// Notify when unauthenticated user is landed on login page
settings_security_notify_on_login_request = '%3 login page is accessed by unauthenticated user from %2|%3 login page access alert|root';

// Notify on successful authentication
settings_security_notify_on_login_success = '%3 successful login alert for user %1 from %2|%3 successful login alert|root';

```

Settings must be initialized by the same procedure described for the scripts above. The only difference is that the file name, that has to be copied to `/etc/webmin/authentic-theme` or `/etc/usermin/authentic-theme` must be `settings.js`. Afterwards, put directives from the list of settings above and control it using boolean data type `(true/false)` or other (see comments for each setting respectively).


###Troubleshoot
1. Automatic updates notification feature doesn't work or `Can't locate Net/SSLeay.pm in ..)`<br>
   This happens because _Webmin_ is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in _Webmin_ or using CLI. Package name is `perl-Net-SSLeay`.
2. Strange `Â` character is appeared in text-editor mode<br>
   This happens because of encoding disparity. To fix this, just set language in _Webmin_ to `UTF-8` and make sure that your browser also has detected it as `UTF-8`.

###Development
####Lead developer
* [Ilia Rostovtsev](https://rostovtsev.ru)[![](https://rostovtsev.ru/pub/media/icons/stackoverflow-23x15.png)](http://stackoverflow.com/users/1455661/ilia-rostovtsev)


###Contributions

####Translations
* [Richard van Laak](https://github.com/Rvanlaak) (Dutch)
* [Kjetil Elde](https://github.com/w00p) (Norwegian)
* [Michał Pawlik](https://github.com/majk-p) (Polish)
* [Michael Keck](https://github.com/mkkeck) (German)
* [Ilia Rostovtsev](https://github.com/qooob) (Russian)
* [7stars](https://github.com/7starsone) (Spanish, French, Portuguese)
* [dreista](https://github.com/Dreista) (Chinese)
* [jlndk](https://github.com/jlndk) (Danish)

###Donation

 Overall development of this theme has already passed the stage of 430 hours. I'm happy to provide _Authentic_ Theme for free but please know, that it would mean a World to _[me](https://rostovtsev.ru)_, if you send me a donation. It doesn't matter how big or small your donation is. I appreciate all donations. Each donation will _help me to pay my bills_, excite future development and improve your everyday experience, while working with the theme.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>


### License

_Authentic_ Theme is released under the [MIT License][opensource].
[opensource]: http://www.opensource.org/licenses/MIT
