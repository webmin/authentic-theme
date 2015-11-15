#
# Authentic Theme 17.04 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
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

                <h4>Version 17.00-17.04 (November 15, 2015)</h4>

                <ul>

                  <li>Fixed a bug <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/279" target="_blank">#279</a><hr></li>

                  <li>Added document title dynamic update, depending on the current module. It also supports <em>Virtualmin/Cloudmin</em>, appending currenty selected virtual server/machine and <em>Filemin</em>, appending currently selected path <a class="label label-default" href="https://github.com/Real-Gecko/filemin/issues/76" target="_blank">#76</a></li>

                  <li>Added a feature to execute shell command from the search field. To do so, type <code>!</code> in search, followed by your command. Example: <code>! ls -lsaZ /root</code><br><em>Note:</em> It\'s required to have <em>Command Shell</em> module available</li>
                  <li>Fixed user-set virtual server/machine not properly loaded on the first run</li>

                  <li>Added <em>Sea Green</em> color palette and possibility to use custom <a class="label label-default" href="https://github.com/qooob/authentic-theme#how-do-i-make-user-palettes-work" target="_blank">user palettes</a></li>

                  <li>Added <em>10</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/264#issuecomment-147094497" target="_blank">predefined color palettes</a> for left navigation menu and <em>3</em> for the right content page</li>
                  <li>Added separate options for <em>Webmin</em>/<em>Usermin</em> to manage security notifications</li>
                  <li>Added quick access to theme\'s <em>extensions</em> editor and <em>logo</em> control from search</li>
                  <li>Improved code highlight in <em>Bind</em>, <em>Dovecot</em>, <em>SSH</em>, <em>Squid</em>, <em>ProFTPD</em>, <em>Spamassassin</em>, <em>Samba</em>, <em>fail2ban</em> and other modules</li>
                  <li>Improved rendering on <code>Webmin->Webmin Users->Available Webmin modules</code> tab</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/269" target="_blank">#269</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/273" target="_blank">#273</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/274" target="_blank">#274</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/255" target="_blank">#255</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/256" target="_blank">#256</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/259" target="_blank">#259</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/261" target="_blank">#261</a></li>

                </ul>
                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1000</span> hours.
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
