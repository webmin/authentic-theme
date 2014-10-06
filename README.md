#Authentic
**Authentic** is [Webmin/](https://github.com/webmin/webmin)[Usermin/](https://github.com/webmin/usermin)[Virtualmin](https://www.virtualmin.com/) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that you just longed to get. It uses [CodeMirror](http://codemirror.net/) to highlight config files and show line numbers, when editing manually. Theme runs using latest releases of dependent software (mentioned above), supporting all in-built modules (even ancient ones) and third-party modules, including [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html).

**Authentic** is fully compatible with latest Webmin 1.710+, Usermin 1.620+ and Virtualmin 4.11+.

##Changelog

####Version 3.0.1 (Oct 7, 2014)
 * Fixed malfunctioning `theme_ui_checkbox`, causing some _input_ fields disappear
 * Fixed few other small bugs

####Version 3.0.0 (Oct 5, 2014)
* Added popover tooltip for old `window.open` to process `help.cgi`
* Added theme information version (installed/update notice) in _System Information_ (works by just comparing `VERSION.txt` files, nothing more)
* Fixed error in _default.js_ script, throwing `NS_ERROR_NOT_AVAILABLE` in Firefox and other _Gecko_ browsers
* Fixed all problems with selecting and filtering _files/user/groups_ in `*_chooser.cgi`
* Fixed loaders being shown every time when waiting for server reply
* Fixed listing of virtual-servers in Virtualmin
* Fixed `checkboxes` margins in Virtualmin
* Fixed table `vertical-align: top` for selecting hours
* Fixed dozens of small bugs

>[Complete Changelog](https://github.com/qooob/authentic-theme/blob/master/CHANGELOG.md)

##Screenshots

![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshot-2.0.0.png)

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

  To install _Autentic_ theme from repository, just `clone` it into your wherever Webmin binaries folder _(libexec)_ is or [download it directly](https://rostovtsev.ru/.git/authentic-theme/authentic-theme-latest.wbt.gz) and install it going from Webmin:

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

##Code contributions
* [Riccardo Nobile](mailto:riccardo.nobile@winfuture.it)
* [Simone Cragnolini](mailto:simone.cragnolini@winfuture.it)

##Donation

When I started working on this theme, I didn't expect to get any donations  but if you do
_donate_ **it will mean a lot** for _[me](https://rostovtsev.ru)_ and will excite future development.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=programming%40rostovtsev%2eru&lc=RU&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>


## License

_Authentic_ is released under the [MIT License][opensource].
[opensource]: http://www.opensource.org/licenses/MIT
