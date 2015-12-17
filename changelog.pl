#
# Authentic Theme 17.20 (https://github.com/qooob/authentic-theme)
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

                <h4>Version 17.20 (December 17, 2015)</h4>

                <ul>
                  <li>Added <em>Notification Slider</em> to store pushed system messages. At the moment you will get notifications about <em>system packages updates</em>, <em>theme updates</em>, <em>ConfigServer Security & Firewall</em>\'s <em>updates, statuses</em> and <em>temporary blocks</em>, including server\'s attacked IP:port. There is an option to keep the slider fixed. Slider can be toggled by hotkey (default <code>Alt+N</code>)</li>
                  <li>Added two themes for <em>Notification Slider</em> - <em>Dim Grey (default)</em> and <em>White</em></li>
                  <li>Added <em>favicon</em> notification counter, which enables <em>Webmin</em> notifications seen anytime</li>
                  <li>Added arrows up/down navigation in autocomplete search box, through the history of previously executed shell commands</li>
                  <li>Added an ability for modules\' developers to use <code>[data-pagescroll="true"]</code> to activate theme\'s page autoscroll feature</li>
                  <li>Added an ability for modules\' developers to use <code>[data-convertible-timestamp-full="unix-timestamp"]</code> and <code>[data-convertible-timestamp-short="unix-timestamp"]</code> attributes on the disired container to easily display user defined dates</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/287" target="_blank">#287</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/295" target="_blank">#295</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/297" target="_blank">#297</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/298" target="_blank">#298</a></li>
                  <li>Fixed other bugs and made dozens of improvements</li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1200</span> hours.
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
