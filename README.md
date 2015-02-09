#Authentic
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

##Changelog

####Version 9.5.0 (Feb 8, 2015)
* Added **dataTables** to _Software Package Updates_, as it's useful to sort packages by _name/description/status/source_
* Added font **Roboto** in the package and set as default. Font now is local, because _Google_ is blocked in some countries [#80](https://github.com/qooob/authentic-theme/issues/80)
* Added **Hotkey** - _double_ `Shift` for dismissing right side loader
* Added custom **styles** and **scripts** injector. Now you can apply custom _styles/scripts_ to the theme, which will be preserved upon updates. [Manual](https://github.com/qooob/authentic-theme#how-do-i-load-custom-styles) for using it is below
* Added **brand** icons for _Webmin/Virtualmin/Cloudmin_ switches (thanks to _Joe Cooper_ for it)
* Added **left menu** dependency updates, upon some triggers happening on the right frame
* Added **extended panels** on _System Information_ page, like _Quotas_, _Status_, _IP address allocation_ and et cetera
* Added Perl **error message**, explaining how to make the theme work, if it's downloaded from _GitHub_ as _.zip_ [#85](https://github.com/qooob/authentic-theme/issues/85)
* Fixed missing option **create sub-servers**, when clicking on _Create Virtual Server_ link, on theme very first load [#96](https://github.com/qooob/authentic-theme/issues/96)
* Fixed **sticking out** _long text_ in the left menu in some languages (Russian, French, Polish and some other) [#95](https://github.com/qooob/authentic-theme/issues/95)
* Fixed **stuck loader**, when going to _Webmin Scheduled Functions_ [#86](https://github.com/qooob/authentic-theme/issues/86)

>[Complete Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)


##Video Screencast

[![ScreenShot](https://rostovtsev.ru/.git/authentic-theme/screenshot-screencast.png)](http://youtu.be/gfuPFuGpyv8)

##Principles
* Make the theme fully support all Webmin/Usermin modules
* Be as beautiful, fast, light and easy to use as possible
* Be compatible with all platforms and support mobile devices


## Features
* **Autocomplete** that lets you very quickly and effectively navigate through items in *left menu*, items of *currently opened* module in _Webmin_,  items for *currently selected domain* and list of *all available virtual domains/machines* in _Virtualmin/Cloudmin_ module
* **Hotkeys** for quicker access/control. `Alt+S` for focusing on search field; `Alt+R` for refreshing currently opened module; `Alt+W` switching to _Webmin_; `Alt+V` switching to _Virtualmin_; `Alt+C` switching to _Cloudmin_ and _double_ `Shift` to prematurely dismiss right page loader
* Extended support for **ConfigServer Security & Firewall**, with integrated _search_ and _filter_ features
* **Code highlight** with _line numbers_, when editing configuration files manually
* Ability to embed **custom** *logo*, *styles* and *scripts*
* Unprecedentedly **convenient and complete navigation**, with no difference among desktop/mobile versions
* _Dismissable_ page **loader**
* Basic **screen-saver** effect, after 2 minutes of inactivity

## Requirements
* Perl 5+, with _LWP::Simple_, _version_, _Net::SSLeay_ modules installed
* Webmin _1.730+_, Usermin _1.640+_ (optional), Virtualmin _4.14+_ (optional), Cloudmin _8.01+_ (optional)

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

####How do I set custom logo?
> Custom logo can be easily set by coping a file named `logo.png` to _Authentic_ Theme **configuration** folder. It's located to wherever _Webmin_ sets it's configuration directory. For example on most systems this path would resolve to `/etc/webmin/authentic-theme`. Make sure that the file is called `logo.png`. Recommended size is _180x90_ pixels. In case you want to remove the logo, just delete this file. In case you want to have _Authentic_ Theme logo, you can find it in theme installation folder (usually located at `/usr/libexec/webmin/authentic-theme`), under images directory, with the file name called `__logo.png`. Don't forget to rename it, to make it work, when uploading to **configuration** directory.

####How do I load custom styles?
> Custom styles are set by the same procedure described for the logo above. Only the file name that has to be copied to `/etc/webmin/authentic-theme` must be `styles.css`. For example, if you want to change `font-family` for the theme, you would have to add the following to custom `styles.css`:

```
body,
html,
.tooltip,
.popover {
    font-family: "Times New Roman", Times, serif;
}
```

####How do I load custom scripts?
> It's done the same way as described for styles and logo above. The file name that has to be copied to `/etc/webmin/authentic-theme` must be `scripts.js`. For example, if you want to load custom script and output something to browser's console, you would have to add the following to `scripts.js`:

```
console.log('Custom script loaded...');
```

> Beware, you might be surprised to see that your script is executed twice. It's because we technically have two `documents`, first is `main` container and second is `right` side that is loaded in _iframe_. You must refer to the exact `document` to make your script executed right.


###Troubleshoot
> 1. `Can't locate LWP/Simple.pm in @INC (@INC contains: /usr/libexec/webmin..) BEGIN failed--compilation aborted at ..`: <br>
It happens because the theme is trying to load _Perl_ module dependency, that are not installed on your system. `LWP::Simple` - is the simplest and most common type of HTTP request. You can install it using CPAN module in Webmin itself or using CLI and package manager. For example, in RHEL distro you would be able to install it by running<br> `yum install perl-libwww-perl`.
> 2. `Can't locate Net/SSLeay.pm in @INC (@INC contains: ..)`<br>
This happens because Webmin is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in Webmin or using CLI. Package name is `perl-Net-SSLeay`.
> 3. `Can't locate object method "parse" via package "version" (perhaps you forgot to load "version"?) at`. Installing `version` from CPAN, using CPAN module in Webmin will fix this error.

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
