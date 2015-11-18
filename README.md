##Contents
* [Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)
* [Download (17.10)![](https://rostovtsev.ru/pub/media/icons/download-23x14.png)](https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz)
* [About](#about)
* [FAQ](#faq)
* [Troubleshoot](#troubleshoot)
* [Development](#development)
* [Donation![](https://rostovtsev.ru/pub/media/icons/heart-23x15.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)
* [License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)

##About
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

[![ScreenShot](https://raw.githubusercontent.com/qooob/authentic-theme/master/images/screenshot.png)](http://youtu.be/f_oy3qX2GXo)
![](https://rostovtsev.ru/pub/media/screenshots/screenshot-pallets-1710.png)

####Principles
* Make the theme fully support all _Webmin/Usermin_ modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices

####Features
* Configurable theme options using _Webmin_ UI
* Favorites feature for any content page
* Unprecedentedly convenient and complete navigation menu for both desktop and mobile
* Autocomplete for quick and effective navigation with ability to execute shell commands [*](https://github.com/qooob/authentic-theme#how-do-i-execute-shell-command-using-search-filed)
* Hotkeys for quick access control
* Dynamically updated page title based on current module
* Security mail notifications
* Code highlight when editing files manually
* Extensive list of customizable theme options, with ability to embed user logos, styles and scripts
* Extended support for _Filemin_ and _ConfigServer Security & Firewall_ modules

####Requirements
* Webmin _1.730+_ (required), Usermin _1.640+_ (optional), Virtualmin _4.14+_ (optional), Cloudmin _8.01+_ (optional)

####Recommended modules
* Installed _Net::SSLeay_ module, to make automatic update notifications work

####Browser support

######![](https://rostovtsev.ru/pub/media/icons/chrome-16.png) Chrome 24+

######![](https://rostovtsev.ru/pub/media/icons/firefox-16.png) Firefox 5+

######![](https://rostovtsev.ru/pub/media/icons/opera-16.png) Opera 18+

######![](https://rostovtsev.ru/pub/media/icons/safari-16.png) Safari 6+

######![](https://rostovtsev.ru/pub/media/icons/edge-16.png) Edge 20+

######![](https://rostovtsev.ru/pub/media/icons/internet-explorer-16.png) IE 10+


###FAQ
####How to install _Authentic_ Theme?

#####Webmin

  To install _Autentic_ Theme from repository, just `clone` it into your wherever _Webmin_ binary folder _(libexec)_ is. After that, you must rename `authentic-theme-master` directory to `authentic-theme` to make the theme work properly. Besides, you could just [download](https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz) the theme directly and install it using _Webmin_:

  `Webmin->Webmin Configuration->Webmin Themes->Install themes->From uploaded file`

#####Usermin
  Use the same procedure as described above to install the theme for _Usermin_:

  `Webmin->Usermin Configuration->Usermin Themes->Install themes->From uploaded file`


#####Virtualmin/Cloudmin
There is no need to take any additional actions. In case _Virtualmin_ or/and _Cloudmin_ modules are installed, it will be automatically detected and supported.

####How to update _Authentic_ Theme automatically?
The theme has inbuilt feature to notify an administrative user to install updates. To enable this feature, turn `Check for Authentic Theme updates` on in theme settings.

####How do I customize the theme?
Theme has configurable options, that are located in `Webmin->Webmin Configuration->Webmin Themes`. There as well, you can set custom _logos_, _styles_ and _scripts_.


####How do I make user palettes work?
_Authentic_ Theme utilizes built-in, custom color palettes, that a user can define using theme's extensions. It's possible, by using theme's _CSS_ extensions, to pass user custom selector, such as `user-palette-1`, `user-palette-2`, `user-palette-3`, `user-palette-4`, `user-palette-5`, `user-palette-6`, `user-palette-7`, `user-palette-8`, `user-palette-9` and `user-palette-10` to enable a usage of user palettes. For example, in order to use `user-palette-1`, in the theme's settings, you would need to set the option _Navigation Menu Color_ to the value of `User Palette 1`. After that, provide a custom code to the theme's _CSS_ extension, with [a pre-built template](http://codepen.io/qooob/pen/dYaPvj), corresponding with custom theme's identification.

####How do I execute shell command using search filed?
Type `!` in search, followed by your command. Example: `! ls -lsaZ /root`. It's required to have _Command Shell_ module available.

####How do I make the theme load faster?
_Webmin_ has in-built option to compress static files.  It's possible to enable this feature by going to `Webmin->Webmin Configuration->Web Server Options` and setting _Gzip compress static files_ option to _Use pre-compressed file and compress dynamically_.

###Extended support for bundled/third-party modules

####_Filemin_
Theme has great support for this module, by adding numerous mast-have features. Most noticeable are listing without page reload (using XHR requests) and full keyboard support, which enables you to use _Filemin_ just as normal desktop browser.

#####List of keyboard shortcuts

  * `alphanumeric typing` - quick search
  * `up/down, home/end` - cursor position
  * `enter` - descent into selected
    * in case there is only one row filtered, enter on search field will perform trigger
  * `spacebar` - select current row
  * `backspace` - previous folder
  * `*` - inverse select
  * `+` - select all
  * `-` - deselect all
  * `F2` - change permissions
  * `F3` - change ownership
  * `F4` - edit where possible
  * `F5/Shift+F5` - compress/decompress
  * `F6` - rename
  * `Shift+F4/F7` - new file/folder
  * `Shift+F7` - search
  * `F8/Del` - delete
  * `Ctrl+X/C/V` - Cut/Copy/Paste
  * `Ctrl+Enter/Ctrl+Shift+Enter` - Save/Save and close currently edited file
  * `Theme reload hot key` - reload current directory

####_ConfigServer Security & Firewall_
Theme only re-renders this module and adds support for code highlight, when editing files manually.


###Troubleshoot
1. Automatic updates notification feature doesn't work or `Can't locate Net/SSLeay.pm in ..)`<br>
   This happens because _Webmin_ is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in _Webmin_ or using CLI. Package name is `perl-Net-SSLeay`. Besides, in case you have mentioned module installed and automatic update feature still doesn't work, you would have to also install either `LWP::Protocol::https` or `Bundle::LWP` using CPAN or by package name `perl-LWP-Protocol-https` or `perl-libwww-perl` respectively;
2. Strange `Â` character is appeared in text-editor mode<br>
   This happens because of encoding disparity. To fix this, just set language in _Webmin_ to `UTF-8` and make sure that your browser also has detected it as `UTF-8`;
3. I get `HEAD 404 (File not found)` in console<br>
   That is not really an error. It happens, when theme is checking, if needed _URL_ exists and can be loaded;
4. Page loader/spinner got stuck<br>
   To prematurely dismiss a loader, click the `Escape` key for the right loader and `Ctrl+Escape` for the left, or loader's close button, right next to it.

###Development
####Lead developer
* [Ilia Rostovtsev](https://rostovtsev.ru)[![](https://rostovtsev.ru/pub/media/icons/stackoverflow-23x15.png)](http://stackoverflow.com/users/1455661/ilia-rostovtsev)


###Contributions

####Translations
* [Richard van Laak](https://github.com/Rvanlaak) (Dutch)
* [Kjetil Elde](https://github.com/w00p) (Norwegian)
* [Michał Pawlik](https://github.com/majk-p) (Polish)
* [Michael Keck](https://github.com/mkkeck) (German)
* [Silviu-Ionut Radu](https://github.com/sealview) (Romanian)
* [Ilia Rostovtsev](https://github.com/qooob) (Russian)
* [7stars](https://github.com/7starsone) (Spanish, French, Portuguese)
* [dreista](https://github.com/Dreista) (Chinese)
* [jlndk](https://github.com/jlndk) (Danish)
* [stuchy3](https://github.com/stuchy3) (Czech)

###Donation

 Overall development of this theme has already passed the stage of 1100 hours. I'm happy to provide _Authentic_ Theme for free but please know, that it would mean a World to _[me](https://rostovtsev.ru)_, if you send me a donation. It doesn't matter how big or small your donation is. I appreciate all donations. Each donation will _help me to pay my bills_, excite future development and improve your everyday experience, while working with the theme.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>

### License

_Authentic_ Theme is released under the [MIT License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)
