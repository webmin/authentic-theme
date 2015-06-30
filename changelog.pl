#
# Authentic Theme 13.10 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $__changelog
    = '<div class="modal fade" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-info-circle">&nbsp;&nbsp;</i>' . $text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body">
                <h4>Version 13.10 (June 30, 2015)</h4>
                <ul>
                  <li>Added an option to <em>disable all animation</em> on the left menu and on tabs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/192" target="_blank">Issue #192</a></li>
                  <li>Added <code>autofocus</code> on input field in <em>Command Shell</em> module <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/190" target="_blank">Issue #190</a></li>
                  <li>Improved the look of <em>custom radio</em> buttons</li>
                  <li>Updated <em>Romanian</em> translation</li>
                  <li>Fixed external links issue <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/182" target="_blank">Issue #182</a></li>
                  <li>Fixed different <em>Internet Explorer</em> issues <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/191" target="_blank">Issue #191</a></li>
                  <li>Fixed issue with the size of input fields in <em>Squid Module</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/197" target="_blank">Issue #197</a></li>
                  <li>Fixed other multiple bugs</li>
                </ul>
                <p><strong>ATTENTION:</strong> Translations for <code>settings_*</code> and <code>theme_conference</code> is required.</p>
                <h4 style="margin-top:20px">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #c9302c; border-color: #d9534f;">600</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em>help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>
                  Please <i class="badge fa fa-thumbs-up" style="font-size: 11px; background:#5cb85c"> Like</i> theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> YouTube</a> channel.
                  <br>
                  <br>
                  Don\'t forget nor be lazy to post to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a> found bugs.
                  <h4 style="margin-top:20px">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';
