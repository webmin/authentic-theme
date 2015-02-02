#Authentic
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

**Authentic** is fully compatible with latest Webmin 1.730+, Usermin 1.640+, Virtualmin 4.14+ and Cloudmin 8.00+

##Changelog

####Version 9.0.2 (Feb 3, 2015)
* Fixed **loader** positioning
* Fixed **small buttons** under the menu showing _correct language link_ on toggling between _Webmin/Virtualmin/Cloudmin_
* Fixed **menu jumps** [:paperclip:](https://github.com/qooob/authentic-theme/issues/76)
* Fixed **selects** incorrectly triggering loader in some cases [:paperclip:](https://github.com/qooob/authentic-theme/issues/78)
* Improved **mobile menu** trigger button position and some other mobile menu tweaks

####Version 9.0.1 (Feb 1, 2015)
* Fixed **Firefox bug** making right frame _links not clickable_ [:paperclip:](https://github.com/qooob/authentic-theme/issues/74)
* Improved **navigation** menu auto-opening

##Changelog
####Version 9.0.0 (Feb 1, 2015)
* Changed: Overall **UI redesign** for better experience
* Changed: Code **core** complete rewrite for both _server_ and _client-side_. Improved **speed** and **browser/plugin** compatibility
* Added support for _Virtualmin/Cloudmin_ **missing left menu**, for currently selected virtual server/machine. ***Attention:*** You need latest _Virtualmin_ installation to make it work. (For _Virtualmin_ *Pro*, minimum version requirement is 4.13 and for *GPL* users minimum is 4.14)
* Added **autocomplete** for currently **opened module** in _Webmin_, currently **selected domain** and list of all available **virtual domains/machines** in _Virtualmin/Cloudmin_ modules
* Added **complete mobile support**. Navigation menu now has absolutely _same functionality_ for both _desktop/mobile_ versions
* Added **custom logo** support. [Manual](https://github.com/qooob/authentic-theme#how-do-i-set-custom-logo) for using it is below
* Added **screen-saver** effect (using pure CSS) after _2 minutes_ of inactivity
* Added **shortcut** _Alt+R_ for _reloading_ right frame
* Added **Chinese translation** by [Dreista](https://github.com/Dreista)

>[Complete Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)


##Video Screencast

[![ScreenShot](https://rostovtsev.ru/.git/authentic-theme/screenshot-screencast.png)](http://youtu.be/gfuPFuGpyv8)

##Principles
* Make the theme fully support all Webmin/Usermin modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices

## Features
* _Autocomplete_ that lets you very quickly and effectively navigate through:
   * Items in left menu
   * Items in currently opened module in _Webmin_
   * Items for currently selected domain and list of all available virtual domains/machines in _Virtualmin/Cloudmin_ module
* _Hotkeys_ for quicker access/control:
   * `Alt+S` for focusing on search field
   * `Alt+R` for refreshing currently opened module
   * `Alt+W` switching to _Webmin_
   * `Alt+V` switching to _Virtualmin_
   * `Alt+C` switching to _Cloudmin_
* Extended support for _ConfigServer Security & Firewall_, with integrated search and filter features
* Code _highlight_ with _line numbers_, when editing configuration files manually
* Custom _logo_
* Basic _screen-saver_ effect (pure CSS) after 2 minutes of inactivity
* Unprecedentedly _convenient and complete navigation_, with no difference among desktop/mobile versions

## Tricks
* To prematurely dismiss a loader *click* on it 2 times

##Browser support

#####![](https://rostovtsev.ru/pub/media/icons/chrome-16.png) Chrome 24+

#####![](https://rostovtsev.ru/pub/media/icons/firefox-16.png) Firefox 5+

#####![](https://rostovtsev.ru/pub/media/icons/opera-16.png) Opera 18+

#####![](https://rostovtsev.ru/pub/media/icons/safari-16.png) Safari 6+

#####![](https://rostovtsev.ru/pub/media/icons/internet-explorer-16.png) IE 10+


##FAQ
###How do I install _Authentic_ theme?

####Webmin

  To install _Autentic_ theme from repository, just `clone` it into your wherever Webmin binaries folder _(libexec)_ is or [download](https://rostovtsev.ru/.git/authentic-theme/authentic-theme-latest.wbt.gz) it directly and install it going from Webmin:

  `Webmin->Webmin Configuration->Webmin Themes->Install themes->From uploaded file`

####Usermin
  **a)** I recommend to create a _symlink_ to already installed _Authentic_ theme, which will enable you to only update Webmin installation of the theme not both.

  Creating a _symlink_ as easy as it gets by running as root the following:

  `ln -s /usr/libexec/webmin/authentic-theme /usr/libexec/usermin/authentic-theme`

> The above implies that Webmin binaries on your system are installed under `/usr/libexec/webmin/` and Usermin installation is in `/usr/libexec/usermin/`. The above is true for _CentOS_ and other RHEL distros at least. You could easily though find out where your installations are by running `/usr/bin/whereis webmin` or `/usr/bin/whereis usermin`.

  **b)** Nevertheless, you could simply install Usermin theme using the same procedure as for Webmin. To install a copy for Usermin go to:

    `Webmin->Usermin Configuration->Usermin Themes->Install themes->From uploaded file`

####Virtualmin/Cloudmin
There is no need to take any additional actions. In case _Virtualmin_ or _Cloudmin_ modules are installed, it will be automatically detected and supported.

###How do I set custom logo?
> Custom logo can be easily set by coping a file named `logo.png` to _Authentic_ Theme **configuration** folder. It's located to wherever _Webmin_ sets it's configuration directory. For example on most systems this path would resolve to `/etc/webmin/authentic-theme`. Make sure that the file is called `logo.png`. Recommended size is _180x90_ pixels. In case you want to remove the logo, just delete this file. In case you want to have _Authentic_ Theme logo, you can find it in theme installation folder (usually located at `/usr/libexec/webmin/authentic-theme`), under images directory, with the file name called `__logo.png`. Don't forget to rename it, to make it work, when uploading to **configuration** directory.

###Troubleshoot
> 1. `Can't locate LWP/Simple.pm in @INC (@INC contains: /usr/libexec/webmin..) BEGIN failed--compilation aborted at ..`: <br>
It happens because the theme is trying to load _Perl_ module dependency, that are not installed on your system. `LWP::Simple` - is the simplest and most common type of HTTP request. You can install it using CPAN module in Webmin itself or using CLI and package manager. For example, in RHEL distro you would be able to install it by running<br> `yum install perl-libwww-perl`.
> 2. `Can't locate Net/SSLeay.pm in @INC (@INC contains: ..)`<br>
This happens because Webmin is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in Webmin or using CLI. Package name is `perl-Net-SSLeay`.
> 3. `Can't locate object method "parse" via package "version" (perhaps you forgot to load "version"?) at`. Installing `version` from CPAN, using CPAN module in Webmin will fix this error.
> 4. `Can't locate Switch.pm in @INC (@INC contains:)` You can install `Switch` module using CPAN in Webmin or by package name `perl-Switch` to fix this error. In case you got stuck with this error after updating theme and have no access to _CLI_, no worries, just type in _URL_ `http://yourhostname:10000/cpan` and from there choose to install `Switch` module.

##Development
###Lead developer
* [Ilia Rostovtsev](https://rostovtsev.ru)


##Contributions

###Translations
* [Kjetil Elde](https://github.com/w00p) (Norwegian)
* [Michał Pawlik](https://github.com/majk-p) (Polish)
* [Michael Keck](https://github.com/mkkeck) (German)
* [7stars](https://github.com/7starsone) (Spanish, French)
* [Dreista](https://github.com/Dreista) (Chinese)

##Donation

 Overall development of this theme has already passed the stage of 200 hours. While I am glad to provide _Authentic_ Theme for free, it would mean a world to _[me](https://rostovtsev.ru)_, if you could send me a donation. It doesn't matter how big or small your donation is. I appreciate all donations. Each donation will excite future development and improve your everyday experience, while working with the theme.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>


## License

_Authentic_ Theme is released under the [MIT License][opensource].
[opensource]: http://www.opensource.org/licenses/MIT
