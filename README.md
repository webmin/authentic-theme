##Contents
* [Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)
* [Download![](https://rostovtsev.ru/pub/media/icons/download-23x14.png)](https://raw.githubusercontent.com/qooob/authentic-theme/master/.build/authentic-theme-latest.wbt.gz)
* [About](#about)
* [FAQ](#faq)
* [Troubleshoot](#troubleshoot)
* [Development](#development)
* [Donation![](https://rostovtsev.ru/pub/media/icons/heart-23x15.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)
* [License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)

##About
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

[![ScreenShot](https://raw.githubusercontent.com/qooob/authentic-theme/master/images/screenshot.png)](http://youtu.be/f_oy3qX2GXo)

####Principles
* Make the theme fully support all _Webmin/Usermin_ modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices

####Features
* Configurable theme options using _Webmin_ UI
* Unprecedentedly convenient and complete navigation for both desktop and mobile versions
* Autocomplete for quick and effective navigation
* Hotkeys for quick access control
* Security mail notifications
* Code highlight when editing files manually
* Extensive list of customizable theme options, with ability to embed user logos, styles and scripts
* Extended support for _ConfigServer Security & Firewall_

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

####How do I customize the theme?
Theme has configurable options, that are located in `Webmin->Webmin Configuration->Webmin Themes`. There as well, you can set custom _logos_, _styles_ and _scripts_.

####How do I make the theme load faster?
_Webmin_ has in-built option to compress static files.  It's possible to enable this feature by going to `Webmin->Webmin Configuration->Web Server Options` and setting _Gzip compress static files_ option to _Use pre-compressed file and compress dynamically_.

###Troubleshoot
1. Automatic updates notification feature doesn't work or `Can't locate Net/SSLeay.pm in ..)`<br>
   This happens because _Webmin_ is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in _Webmin_ or using CLI. Package name is `perl-Net-SSLeay`. Besides, in case you have mentioned module installed and automatic update feature still doesn't work, you would have to also install either `LWP::Protocol::https` or `Bundle::LWP` using CPAN or by package name `perl-LWP-Protocol-https` or `perl-libwww-perl` respectively.
2. Strange `Â` character is appeared in text-editor mode<br>
   This happens because of encoding disparity. To fix this, just set language in _Webmin_ to `UTF-8` and make sure that your browser also has detected it as `UTF-8`.
3. I get `HEAD 404 (File not found)` in console<br>
   That is not really an error. It happens, when theme is checking, if needed _URL_ exists and can be loaded

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

###Donation

 Overall development of this theme has already passed the stage of 660 hours. I'm happy to provide _Authentic_ Theme for free but please know, that it would mean a World to _[me](https://rostovtsev.ru)_, if you send me a donation. It doesn't matter how big or small your donation is. I appreciate all donations. Each donation will _help me to pay my bills_, excite future development and improve your everyday experience, while working with the theme.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>

### License

_Authentic_ Theme is released under the [MIT License](https://github.com/qooob/authentic-theme/blob/master/LICENSE)
