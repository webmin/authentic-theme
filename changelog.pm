#
# Authentic Theme 18.32 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2017 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $__changelog
    = '<div class="modal fade fade4" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header background-success background--bordered">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-fw fa-info-circle">&nbsp;&nbsp;</i>' . $Atext{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body" style="font-weight: 300">
                <h4>Version 18.30-18.32 (January 05, 2017)</h4>
                <ul>
                    <li>Added <em>Catalan</em> language, thanks to <a class="label label-default" href="https://github.com/diathesaron" target="_blank">David Canalias</a></li>
                    <li>Fixed bugs
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/605" target="_blank">#605</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/pull/611" target="_blank">#611</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/pull/617" target="_blank">#617</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/619" target="_blank">#619</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/620" target="_blank">#620</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/624" target="_blank">#624</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/628" target="_blank">#628</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/44856" target="_blank">#44856</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/44874" target="_blank">#44874</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/45206" target="_blank">#45206</a>
                    </li>
                </ul>
                <span style=" float: right; font-size: 10px; display: inline-block; margin-top: -7px; ">18.32</span><hr style="margin-top: 18px; margin-bottom: 12px;">
                <ul>
                    <li>Increased theme\'s speed and stability</li>
                    <li>Added new drop-down <em>Command Shell</em> port. There is no need in going to <em>Shell</em> module to use console anymore. By default, hitting <code>Alt+K</code> anywhere in the theme will bring its accessibility immediately <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/566" target="_blank">#566</a></li>
                    <li>Added new functionality that replaces old pop-up windows with contemporary modals for file-chooser and other familiar operations <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/552" target="_blank">#552</a></li>
                    <li>Added navigation link for the servers with installed <a class="label label-default" href="https://github.com/firehol/netdata" target="_blank">Netdata</a> real-time monitoring tool</li>
                    <li>Added <em>Dashboard</em> and <em>Favorites</em> tabs to the <em>Side Slider</em>. Hotkeys for switching tabs are available. Check theme <em>Side slider options</em> for more details</li>
                    <li>Added ability to change fonts in theme settings. This feature will let you as well use local <em>system-default</em> fonts</li>
                    <li>Added ability to disable <em>Virtualmin/Cloudmin</em> drop-down\'s symbolic icons <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/569" target="_blank">#569</a></li>
                    <li>Added ability to store local configs on the server <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/488" target="_blank">#488</a></li>
                    <li>Added support for multiple hosts when using browser\'s storage <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/523" target="_blank">#523</a></li>
                    <li>Added support for displaying very long log files smoothly</li>
                    <li>Added support for PAM authentication <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/544" target="_blank">#544</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/580" target="_blank">#580</a></li>
                    <li>Added support for <em>SELinux</em> and file <em>attributes</em> in <em>File Manager</em>. It can be enabled in module\'s config (requires Webmin 1.830+) <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/565" target="_blank">#565</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/590" target="_blank">#590</a></li>
                    <li>Added tree-view drop-down for navigation breadcrumbs in <em>File Manager</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/442" target="_blank">#442</a></li>
                    <li>Added support for overwriting files upon extraction in <em>File Manager</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/589" target="_blank">#589</a></li>
                    <li>Added ability to select/copy any text from the table to clipboard in <em>File Manager</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/591" target="_blank">#591</a></li>
                    <li>Fixed the logic of selecting/accessing objects in modules for list (icons) mode. For selecting use click/right-click; for accessing double-click <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/575" target="_blank">#575</a></li>
                    <li>Fixed missed tag at core function. Thanks to <em>Michael Varian</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/pull/576" target="_blank">#576</a></li>
                    <li>Fixed dozens of unreported bugs</li>
                    <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/394" target="_blank">#394</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/571" target="_blank">#571</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/582" target="_blank">#582</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/583" target="_blank">#583</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/587" target="_blank">#587</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/592" target="_blank">#592</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/593" target="_blank">#593</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/pull/594" target="_blank">#594</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/597" target="_blank">#597</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/599" target="_blank">#599</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/600" target="_blank">#600</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/601" target="_blank">#601</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/602" target="_blank">#602</a> <a class="label label-default" href="https://www.virtualmin.com/node/43304" target="_blank">#43304</a> <a class="label label-default" href="https://www.virtualmin.com/node/44156" target="_blank">#44156</a></li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <span style=" float: right; font-size: 10px; display: inline-block; margin-top: -36px; ">18.30-18.31</span>
                <h4 style="margin-top:20px;">' . $Atext{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $Atext{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">2000</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a donation using <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> <span class="font-family-default" style="margin-left: -7px;">PayPal</span></a> or <a target="_blank" class="badge" style="font-size: 11px; background-color: #f7931a; display: inline-block; max-height: 17px;" href="https://github.com/qooob/authentic-theme#license"> <span class="font-family-default" style="margin-left: -7px;"><em style="margin-left: 7px; font-weight: 700; margin-right: 3px; font-size: 15px; vertical-align: middle; margin-top: -3px; display: inline-block;">฿ </em> Bitcoin</span></a> or <a target="_blank" class="badge fa fa-y-combinator" style="font-size: 11px; background-color: #fac514;" href="https://rostovtsev.ru/pub/api/donation/yandex.html"> <span class="font-family-default" style="margin-left: -7px;">Yandex Money</span></a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em style="border-bottom:1px dotted #ccc   ">help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>' . ( !licenses('cm') && !licenses('vm') ? '' : '-->' ) . '
                  Take a look at theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> <span class="font-family-default" style="margin-left: -7px;">YouTube</span></a> and please don\'t forget nor be lazy reporting bugs to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> <span class="font-family-default" style="margin-left: -7px;">GitHub</span></a>
                  <h4 style="margin-top:20px;">' . $Atext{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';

1;
