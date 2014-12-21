#Authentic
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin/](https://www.virtualmin.com/)[Cloudmin](http://webmin.com/cloudmin.html) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that is made with _love_. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually, [TinyMCE](http://www.tinymce.com/) to compose comprehensive HTML based messages and [DataTables](http://www.datatables.net/) to add advanced interaction controls to modules' tables. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

**Authentic** is fully compatible with latest Webmin 1.720+, Usermin 1.630+ and Virtualmin 4.12+.

##Changelog

####Version 7.0.0 (Dec 21, 2014)
* Improved overall `theme speed` - twice as fast as before
* Added scrolling to extra long `help popovers` that were going off the screen
* Added complete support for `Internet Explorer` browser
* Changed right side `body` background to draw more attention to content
* Changed `panel` top border height, to draw more attention, while being the main page header
* Changed `loader` - no more images or fonts used - pure script brings overall beauty and compatibility
* Updated `jQuery` to latest _2.1.3_ version
* Fixed problems when using `LastPass/FireBug` plugins [:paperclip:](https://github.com/qooob/authentic-theme/issues/6)
* Fixed extra width in table rows and all around the theme
* Fixed position of `dataTables` sorting images to be closer to the text [:paperclip:](https://github.com/qooob/authentic-theme/issues/55)
* Fixed `dataTables` disappear in `init` module in some cases [:paperclip:](https://github.com/qooob/authentic-theme/issues/55)
* Fixed missing `ui_hidden` when changing tabs [:paperclip:](https://github.com/qooob/authentic-theme/issues/56)
* Fixed `hundreds` of UI bugs

>[Complete Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)


##Screenshots

![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshot_function_update.png)
<hr>
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshot.png)

##Principles
* Make the theme fully support all Webmin/Usermin modules
* Be as beautiful, light and easy to use as possible
* Be compatible with mobile devices

##Issues
* Borders on some tables are missing, because of Webmin modules miscalculating _colspan_ values (developers promised to fix it in the near future)
* Few tables go off the grid on small resolutions (< 1000px)

##FAQ
####How do I install _Authentic_ theme?

####Webmin

  To install _Autentic_ theme from repository, just `clone` it into your wherever Webmin binaries folder _(libexec)_ is or [download](https://rostovtsev.ru/.git/authentic-theme/authentic-theme-latest.wbt.gz) it directly and install it going from Webmin:

  `Webmin->Webmin Configuration->Webmin Themes->Install themes->From uploaded file`

####Usermin
  **a)** I recommend to symlink already installed _Authentic_ theme, which will enable you to only update Webmin installation of _Authentic_ not both.

  Creating a symlink as easy as it gets by running as root the following:

  `ln -s /usr/libexec/webmin/authentic-theme /usr/libexec/usermin/authentic-theme`

> The above implies that Webmin binaries on your system are installed under `/usr/libexec/webmin/` and Usermin installation is in `/usr/libexec/usermin/`. The above is true for _CentOS_ and other RHEL distros. You could easily though find out where your installations are by running `/usr/bin/whereis webmin` or `/usr/bin/whereis usermin`.

  **b)** Nevertheless, you could simply install Usermin theme using the same procedure as for Webmin. To install a copy for Usermin go to:

    `Webmin->Usermin Configuration->Usermin Themes->Install themes->From uploaded file`

####Virtualmin
There is no need to take any additional actions. In case _Virtualmin_ module is installed, it will be automatically detected and supported.

###Troubleshoot
> 1. `Can't locate LWP/Simple.pm in @INC (@INC contains: /usr/libexec/webmin..) BEGIN failed--compilation aborted at ..`: <br>
It happens because the theme is trying to load _Perl_ module dependency, that are not installed on your system. `LWP::Simple` - is the simplest and most common type of HTTP request. You can install it using CPAN module in Webmin itself or using CLI and package manager. For example, in RHEL distro you would be able to install it by running<br> `yum install perl-libwww-perl`.
> 2. `Can't locate Net/SSLeay.pm in @INC (@INC contains: ..)`<br>
This happens because Webmin is trying to open a link and download the theme using _https_ protocol. `Net::SSLeay` - is high level functions for accessing web servers (by using HTTP/HTTPS). You can install it using CPAN module in Webmin or using CLI. Package name is `perl-Net-SSLeay`.
> 3. `Can't locate object method "parse" via package "version" (perhaps you forgot to load "version"?) at`. Installing `version` from CPAN, using CPAN module in Webmin will fix this error.
> 4. `Can't locate Switch.pm in @INC (@INC contains:)` You can install `Switch` module using CPAN in Webmin or by package name `perl-Switch` to fix this error. In case you got stuck with this error after updating theme and have no access to _CLI_, no worries, just type in _URL_ `http://yourhostname:10000/cpan` and from there choose to install `Switch` module.

##Contributions

###Translations
* [Kjetil Elde](https://github.com/w00p) (Norwegian)
* [Michał Pawlik](https://github.com/majk-p) (Polish)
* [Michael Keck](https://github.com/mkkeck) (German)

###Code contributions
* [Riccardo Nobile](mailto:riccardo.nobile@winfuture.it)
* [Simone Cragnolini](mailto:simone.cragnolini@winfuture.it)


##Donation

 Thank you for using _Authentic Theme_. Overall development of this theme has already passed the stage of 100 hours. While I am happy to provide <em>Authentic Theme</em> for free, it would mean a world to _[me](https://rostovtsev.ru)_, if you could send me a donation. It doesn't matter how big or small your donation is. I appreciate all donations. Each donation will excite future development.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=programming%40rostovtsev%2eru&lc=RU&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>


## License

_Authentic Theme_ is released under the [MIT License][opensource].
[opensource]: http://www.opensource.org/licenses/MIT
