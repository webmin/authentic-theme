## Contents
* [Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)
* [Download (18.40)![](https://rostovtsev.ru/pub/media/icons/download-23x14.png)](https://github.com/qooob/authentic-theme/releases/download/18.40/authentic-theme-18.40.wbt.gz)
* [About](#about)
* [FAQ](#faq)
* [Troubleshoot](#troubleshoot)
* [Development](#development)
* [Donation![](https://rostovtsev.ru/pub/media/icons/heart-23x15.png)](https://github.com/qooob/authentic-theme#license)
* [License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)

## About
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [CKEditor](http://ckeditor.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

[![ScreenShot](https://raw.githubusercontent.com/qooob/authentic-theme/master/images/screenshot.png)](http://youtu.be/f_oy3qX2GXo)
![](https://rostovtsev.ru/pub/media/screenshots/screenshot-pallets-1710.png)
![](https://rostovtsev.ru/pub/media/screenshots/screenshot-content-page-18.40-final.png)

#### Principles
* Make the theme fully support all _Webmin/Usermin_ modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices

#### Features
* Configurable theme options using _Webmin_ UI
* Top-down terminal port
* Favorites feature for any content page
* Unprecedentedly convenient and complete navigation menu for both desktop and mobile
* Notification slider for quick access to pushed system messages
* Autocomplete for quick and effective navigation with ability to execute shell commands [*](https://github.com/qooob/authentic-theme#how-do-i-execute-shell-command-using-search-field)
* Hotkeys for quick access control
* Dynamically updated page title based on current module
* Code highlight when editing files manually
* Extensive list of customizable theme options, with ability to embed user logos, styles and scripts
* Extended support for _File Manager_ and _ConfigServer Security & Firewall_ modules

#### Requirements
* Webmin _1.830+_ (required), Usermin _1.700+_ (optional), Virtualmin _5.00+_ (optional), Cloudmin _9.00+_ (optional)

#### Recommended modules
* Installed _Net::SSLeay_ module, to make automatic update notifications work

#### Browser support

###### ![](https://rostovtsev.ru/pub/media/icons/chrome-16.png) Chrome 24+

###### ![](https://rostovtsev.ru/pub/media/icons/firefox-16.png) Firefox 5+

###### ![](https://rostovtsev.ru/pub/media/icons/opera-16.png) Opera 18+

###### ![](https://rostovtsev.ru/pub/media/icons/safari-16.png) Safari 6+

###### ![](https://rostovtsev.ru/pub/media/icons/edge-16.png) Edge 20+

###### ![](https://rostovtsev.ru/pub/media/icons/internet-explorer-16.png) IE 11

### FAQ
#### How to update _Authentic_ Theme manually?
Theme can be easily updated manually. Please make sure that you have `git` command installed on your system. Using console, do the following:
  1. Go to _Webmin_ (`cd /usr/libexec/webmin`) or _Usermin_ (`cd /usr/libexec/usermin`) directory __*__
  2. Descend into theme's directory (`cd authentic-theme`)
  3. Run [`./theme-update.sh -r`](https://github.com/qooob/authentic-theme/issues/703) and hit _y_ to continue
  4. Restart _Webmin_/_Usermin_ after update
<br>__*__ *Binary directory might be different from `libexec` depending on the system. Run `whereis webmin` to figure this out.*

#### How to update _Authentic_ Theme automatically?
The theme has inbuilt feature to notify an administrative user to install updates. To enable this feature, turn on `Check for Authentic Theme updates` in theme settings.

#### How do I customize the theme?
Theme has configurable options, that are located in `Webmin->Webmin Configuration->Webmin Themes`. There as well, you can upload custom _logos_ and code custom _styles.css_, _scripts.js_ and _scripts.pm_.

#### How do I execute shell command using search field?
Type `!` in search, followed by your command. Example: `! ls -lsaZ /root`. It's required to have _Command Shell_ module available.

#### How do I make the theme load faster?
_Webmin_ has in-built option to compress static files.  It's possible to enable this feature by going to `Webmin->Webmin Configuration->Web Server Options` and setting _Gzip compress static files_ option to _Use pre-compressed file and compress dynamically_.

Another solution would be to install used by default [_Roboto Font_](http://www.fontsquirrel.com/fonts/download/roboto "wget http://www.fontsquirrel.com/fonts/download/roboto -O roboto.zip") locally to prevent extra load from embedding it and later setting it in the theme's settings accordingly.

### Extended support for bundled/third-party modules

#### _File Manager_
Theme has great support for this module, by adding numerous mast-have features. Most noticeable are listing without page reload (using XHR requests) and full keyboard support, which enables you to use _File Manager_ just as normal desktop browser.

#### _ConfigServer Security & Firewall_
Theme only re-renders this module and adds support for code highlight, when editing files manually.


### Troubleshoot
1. Automatic updates notification feature doesn't work or `Can't locate Net/SSLeay.pm in ..)`<br>
   This happens because _Webmin_ is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using _Perl_ module in _Webmin_ or using _command-line_. Package name is `perl-Net-SSLeay`. Besides, in case you have mentioned module installed and automatic update feature still doesn't work, you would have to also install either `LWP::Protocol::https` or `Bundle::LWP` using _CPAN_ or by package name `perl-LWP-Protocol-https` or `perl-libwww-perl` respectively;
2. Strange `Â` character is appeared in text-editor mode or other encoding issues<br>
   This happens because of encoding disparity. To fix this, just set language in _Webmin_ to `UTF-8` and make sure that your browser also has detected it as `UTF-8`. Pay attention, that _Webmin_ in-built module, named _Change Language and Theme_ can override global settings;
3. I get `HEAD 404 (File not found)` in console<br>
   That is not really an error. It happens, when theme is checking, if needed _URL_ exists and can be loaded;
4. Page loading got stuck<br>
   To prematurely dismiss a loader, hover on it and click loader's close button, right next to it. It is also possible to unveil currently loading content page by double clicking on it;
5. Can't toggle _checkbox_ in a row of a _table_<br>
   Theme provides an extended support for operations with table rows. It's easy to select current row by simply `right-clicking` on it with the mouse (on mobile device `long-tap`). Regular `click` on the row will take you to the row's main link;
6. Default tab after logging in doesn't work<br>
   You need to set _Authentic Theme_ as default globally. To do so, go to _Webmin->Webmin Configuration->Themes_.
7. Blinking navigation menu or overall jerky theme's rendering<br>
   This could happen to GPU driver misconfiguration on your OS. For more details refer to [#453](https://github.com/qooob/authentic-theme/issues/453)

### Development
#### Lead developer
* [Ilia Rostovtsev](https://rostovtsev.ru)[![](https://rostovtsev.ru/pub/media/icons/stackoverflow-23x15.png)](http://stackoverflow.com/users/1455661/ilia-rostovtsev)


### Contributions

#### Translations
* [Richard van Laak](https://github.com/Rvanlaak) (Dutch)
* [Kjetil Elde](https://github.com/w00p) (Norwegian)
* [Michał Pawlik](https://github.com/majk-p) (Polish)
* [Michael Keck](https://github.com/mkkeck) (German)
* [Silviu-Ionut Radu](https://github.com/sealview) (Romanian)
* [Ilia Rostovtsev](https://github.com/qooob) (Russian)
* [David Canalias](https://github.com/diathesaron) (Catalan)
* [Sopor Spr](https://github.com/Sopor-) (Swedish)
* [7stars](https://github.com/7starsone) (Spanish, French, Portuguese)
* [dreista](https://github.com/Dreista) (Chinese)
* [jlndk](https://github.com/jlndk) (Danish)
* [stuchy3](https://github.com/stuchy3) (Czech)

### Donation
 You can make a difference. Donations show appreciation. Your donations would help me to pay my bills and _excite future development_.

[![](https://rostovtsev.ru/pub/media/icons/yandex-175x89.png)](http://rostovtsev.ru/pub/api/donation/yandex.html)
<br>
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">![](http://rostovtsev.ru/pub/media/icons/paypal-175x45.png)</a>
<br>
<a href="bitcoin:1AUpmkNSYfKpAUcs5Rz7pPvguRmZU5nPvP">![](https://rostovtsev.ru/pub/media/icons/bitcoin-175-207.png)</a>

### License

_Authentic_ Theme is released under the [MIT License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)
