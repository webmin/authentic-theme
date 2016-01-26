#
# Authentic Theme 17.54 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $__changelog
    = '<div class="modal fade fade2" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-info-circle">&nbsp;&nbsp;</i>' . $text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body" style="font-weight: 300">

                <h4>Version 17.50-17.54 (January 26, 2016)</h4>
                <ul>

                  <li>Added display of <em>symlink\'s</em> target in <em>Filemin</em> when hovering on the symlink-icon <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/346" target="_blank">#346</a></li>
                  <li>Added an option for <em>Filemin</em> in theme\'s settings to show dropdowns in toolbar on hover or using click</li>
                  <li>Fixed bugs <a class="label label-default" href="https://www.virtualmin.com/node/39486" target="_blank">#39486</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/350" target="_blank">#350</a><hr></li>

                  <li>Added <em>Filemin</em> controls in theme\'s settings to hide toolbar (for extra lightness) and other options (the list will grow in time)</li>
                  <li>Added ability to let user choose as the default page the list of servers/systems in <em>Virtualmin/Cloudmin</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/348" target="_blank">#348</a></li>
                  <li>Fixed a bug, when search using <em>autocomplete</em> didn\'t work in <em>Virtualmin/Cloudmin</em> for Virtual Servers/Virtual Machines group</li>
                  <li>Added <em>Filemin</em> folder size auto-calculation on row selection</li>
                  <li>Improved right click <em>context menu</em> for <em>Filemin</em>, which now has all options and behaves smart</li>
                  <li>Fixed <em>Elegant</em> theme for <em>CodeMirror</em></li>
                  <li>Added right click <em>context menu</em> for <em>Filemin</em> for extra convenience</li>
                  <li>Added state of the art <em>color</em> management for the palettes, using theme\'s settings. It is possible now to control <code>grayscale, sepia, saturate, hue-rotate, invert, brightness, contrast</code> filters for navigation menu and <code>grayscale, saturate, hue-rotate</code> for content page. It enables you to generate <em>hundreds</em> of color palettes with ease</li>
                  <li>Added <em>White Snow</em> contrast theme, to resemble old <em>Virtualmin Framed Theme</em> <a class="label label-default" href="https://www.virtualmin.com/node/39344" target="_blank">#39344</a></li>
                  <li>Added line numbers for <em>System Logs</em> module</li>
                  <li>Added ability to choose <em>color palettes</em> for <em>CodeMirror</em> viewer/editor</li>
                  <li>Added <em>title notification counter</em>, to extend already existing <em>favicon</em> counter</li>
                  <li>Improved dynamic title output in <em>Virtualmin/Cloudmin</em></li>
                  <li>Fixed login and password <em>autocomplete</em> to be off on login page <a class="label label-default" href="https://www.virtualmin.com/node/39271" target="_blank">#39271</a></li>
                  <li>Fixed reseller account couldn\'t be saved, due to missing some form fields <a class="label label-default" href="https://www.virtualmin.com/node/39348" target="_blank">#39348</a></li>
                  <li>Fixed default page for <em>Usermin</em> in <em>Mail</em> mode is set to <em>Inbox</em>. Default page for Usermin in <em>non-mail</em> mode is also respected and can be set in <code>Webmin->Usermin Configuration->User Interface</code> <a class="label label-default" href="https://www.virtualmin.com/node/39324" target="_blank">#39324</a></li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/333" target="_blank">#333</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/334" target="_blank">#334</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/335" target="_blank">#335</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/336" target="_blank">#336</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/340" target="_blank">#340</a></li>
                  <li>Fixed dozens of other issues</li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1300</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em style="border-bottom:1px dotted #ccc   ">help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>' . ( !licenses('cm') && !licenses('vm') ? '' : '-->' ) . '
                  Take a look at theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> YouTube</a> and please don\'t forget nor be lazy reporting bugs to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a>
                  <h4 style="margin-top:20px;">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';
