#
# Authentic Theme 15.51 (https://github.com/qooob/authentic-theme)
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

                <h4>Version 15.00-15.51 (September 01, 2015)</h4>

                <ul>

                  <li>Fixed initiation of the spinner, that was shown on file download in <em>Filemin</em>, while clicking on the row</li>
                  <li>Fixed adding bookmarks in <em>Filemin</em> no longer locks the table</li>
                  <li>Fixed minor bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/228" target="_blank">#228</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/230" target="_blank">#230</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/231" target="_blank">#231</a><hr></li>

                  <li>Improved support for <em>ConfigServer Security & Firewall</em> module. Editor mode and code highlights are now working flawlessly</li>
                  <li>Added initialization of filter in <em>Filemin</em> on plain typing (like in <em>Nautilus</em>, for example)</li>
                  <li>Added ability to dismiss the page loader with single escape click. Attention! Be careful when you click escape key once, the loader will disappear, when you click it over again and the loader is hidden, you will interrupt the execution of the page process</li>
                  <li>Changed theme auto-updates notifications to be off by default. This will not affect existing users</li>
                  <li>Fixed history buttons, navigating using browser\'s back/forward buttons now working properly</li>

                  <li>Improved and optimized theme\'s <em>speed</em> and <em>display</em> options</li>
                  <li>Added a new feature of adding any right side page to global <em>Favorites</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/210" target="_blank">#210</a></li>
                  <li>Added complete <em>AJAX</em> support for <em>Filemin</em> (by <em>Alexandr Bezenkov</em>), taking it to the next, absolutely new level <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/222" target="_blank">#222</a></li>
                  <li>Added emphasis on the table sub-titles <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/218" target="_blank">#218</a></li>
                  <li>Added CZ language, thanks to <a class="label label-default" href="https://github.com/stuchy3" target="_blank">stuchy3</a></li>
                  <li>Fixed sorting issue by file-size in <em>Filemin</em> and other modules, where file-size like sorting is used</li>
                  <li>Fixed link for <em>System Statistics</em> in <em>Cloudmin</em></li>
                  <li>Fixed multiple bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/224" target="_blank">#224</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/226" target="_blank">#226</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme-extensions/issues/1" target="_blank">#1</a> <a class="label label-default" href="https://github.com/Real-Gecko/filemin/issues/57" target="_blank">#57</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/223" target="_blank">#223</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/213" target="_blank">#213</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/214" target="_blank">#214</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/220" target="_blank">#220</a></li>
                  <li>Fixed and made dozens of unmentioned bugs/improvements</li>

                </ul>
                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #c9302c; border-color: #d9534f;">850</span> hours.
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
