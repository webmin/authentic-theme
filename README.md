#Authentic
**Authentic** is [Webmin/Usermin](https://github.com/webmin/webmin) theme based on [Bootstrap](https://github.com/twbs/bootstrap) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) that you just longed to get. Theme runs using latest releases of dependent software (mentioned above), supporting all modules (even pretty ancient) and fully compatible with latest Webmin 1.700+ and Usermin 1.610+. [Screenshots](https://github.com/qooob/authentic-theme/blob/master/README.md#screenshots) can be found at the bottom of this file.

##Principles
* Make the theme fully support all Webmin/Usermin modules
* Be as beautiful, light and easy to use as possible
* Be compatible with mobile devices

##Roadmap
* Support for Virtualmin (it's supported really but missing left menu yet)
* Native support for [ConfigServer Security & Firewall](http://configserver.com/cp/csf.html) module
* Markup editor for textareas for editing manually config files

##Issues
* Back button (history) and correspondent menu toggling doesn't work correctly yet (will be fixed upon next release)
* Borders on some tables are missing, because of Webmin/Usermin modules miscalculating colspans value
* Few tables go off the grid on small resolutions (< 1000px)


##FAQ
####How do I install _Authentic_ theme?

####Webmin
  
  To install _Autentic_ theme from repository, just `clone` it into your wherever Webmin binaries folder _(libexec)_ is or [download it directly](https://rostovtsev.ru/.git/authentic-theme/authentic-theme-1.0.0.wbt.gz) and install it going from Webmin:
  
  `Webmin->Webmin Configuration->Webmin Themes->Install themes->From uploaded file`
  
####Usermin
  **a)** I recommend to symlink already installed _Authentic_ theme, which will enable you to only update Webmin installation of _Authentic_ not both.
  
  Creating a symlink as easy as it gets by running as root the following:
  
  `ln -s /usr/libexec/webmin/authentic-theme /usr/libexec/usermin/authentic-theme`
  
> The above implies that Webmin binaries on your system are installed under `/usr/libexec/webmin/` and Usermin installation is in `/usr/libexec/usermin/`. The above is true for _CentOS_ and other RHEL distros. You could easily though find out where your installations are by running `/usr/bin/whereis webmin` or `/usr/bin/whereis usermin`.
  
  **b)** Nevertheless, you could simply install Usermin theme using the same procedure as for Webmin. To install a copy for Usermin go to:
    
    `Webmin->Usermin Configuration->Usermin Themes->Install themes->From uploaded file`

##Code contributions
* [Riccardo Nobile](mailto:riccardo.nobile@winfuture.it)
* [Simone Cragnolini](mailto:simone.cragnolini@winfuture.it)
 

##Screenshots

![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/loading.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/system-bootup-shutdown.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/system-bootup-shutdown-edit.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/webmin-configuration.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/webmin-list-users.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/webmin-users-details.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/system-software-packages.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/system-software-packages-edit.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/filesystem-backups.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/smart-drive-status-details.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/smart-drive-status.png)
![screenshots](https://rostovtsev.ru/.git/authentic-theme/screenshots/hardware-system-time.png)


##Donation

I didn't expect to get donations really and it wasn't the reason at all when I started working on this theme but if you do
_donate_ **it will mean a world for [me](https://rostovtsev.ru)**.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=programming%40rostovtsev%2eru&lc=RU&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">PayPal</a> or <a href="https://money.yandex.ru" alt="41001414241949">Yandex Money: 41001414241949</a>


## License

_Authentic_ is released under the [MIT License][opensource].
[opensource]: http://www.opensource.org/licenses/MIT
