#
# Authentic Theme 17.40 (https://github.com/qooob/authentic-theme)
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

                <h4>Version 17.40 (January 10, 2016)</h4>

                <ul>
                  <li>Added triggers to automatically dismiss loader and perform window autoscroll in <em>Virtualmin/Cloudmin</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39237" target="_blank">#39237</a></li>
                  <li>Added documentation links next to product\'s version on <em>System Information</em> page. Custom documentation links, configurable in <em>Virtualmin/Cloudmin</em> also supported <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39225" target="_blank">#39225</a></li>
                  <li>Added sorting/filter ability for <em>Installed Scripts</em> in <em>Virtualmin</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39237" target="_blank">#39237</a></li>
                  <li>Added an option to show HTML snippet for administrators only</li>
                  <li>Added an ability to edit <code>custom-lang</code> file from theme extensions\' editor</li>
                  <li>Changed previously removed <em>Virtualmin/Cloudmin</em> links from <em>Webmin</em> navigation menu from enforced to optional <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39237" target="_blank">#39237</a></li>
                  <li>Fixed hardcoded strings in some <em>Perl</em> and <em>JavaScript</em> code <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39228" target="_blank">#39228</a></li>
                  <li>Fixed hotkeys execution to be performed in the right context</li>
                  <li>Fixed removed obsolete logo options in <em>Virtualmin/Cloudmin</em> configuration page <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39225" target="_blank">#39225</a></li>
                  <li>Fixed missing input field on the navigation menu, when domain display limits are imposed using <em>Virtualmin Configuration</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/39219" target="_blank">#39219</a></li>
                  <li>Fixed <em>Notification Slider</em> to be unfixed disregard of visibility settings on mobile devices</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/321" target="_blank">#321</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/322" target="_blank">#322</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/323" target="_blank">#323</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/326" target="_blank">#326</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/328" target="_blank">#328</a></li>
                  <li>Fixed other bugs</li>
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
