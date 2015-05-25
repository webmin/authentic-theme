#
# Authentic Theme 13.01 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 13.00-13.01 (May 25, 2015)</h4>
                <ul>
                <li>Fixed redirection loop on Safari OSX <a href="https://github.com/qooob/authentic-theme/issues/173" target="_blank">(Issue #173)</a></li>
                <li>Fixed switch-toggle in single mode <a href="https://github.com/qooob/authentic-theme/issues/172" target="_blank">(Issue #172)</a><hr></li>
                <li>Improved <kbd class="kbd-info">theme settings are now configurable using UI</kbd>. From now on, you don\'t need to edit settings manually. Theme configurable options located in <code>Webmin->Webmin Configuration->Webmin Themes</code></li>
                <li>Improved UI of <em>right frame</em> in great amount. Improved UI of <em>left menu</em> and <em>login page</em></li>
                <li>Improved <kbd class="kbd-info">content page loader</kbd> being less annoying. Content page spinner now will only appear in case something is <em>really</em> loading. On regular page switching it will not appear anymore. When content page starts/ends loading, it\'s animated to improve user experience. Please give it a try!</li>
                <li>Improved <kbd class="kbd-info">line-graph bars</kbd>. Graphs now can have description and color, based on percentage. To see it in action go to <code>Cloudmin->Edit System->Detailed system status</code></li>
                <li>Improved page <kbd class="kbd-info">autoscroll mechanism</kbd>. Now it works, more like in <code>gnome-terminal</code>, i.e., when you start scrolling the page - auto-scrolling stops, when you reach the bottom of the page, using double-scroll - it restarts</li>
                <li>Improved <kbd class="kbd-info">user mail</kbd> is now searchable, using <em>autocomplete</em> bar</li>
                <li>Improved <kbd class="kbd-info">help popovers</kbd> are now <em>not</em> destroyed, in case user made some text selection</li>
                <li>Added images\' support for <kbd class="kbd-info">third party modules</kbd></li>
                <li>Added table rows are now <kbd class="kbd-info">triggerable</kbd> using left click, <kbd class="kbd-info">highlighted</kbd> and <kbd class="kbd-info">selectable</kbd> using right mouse click</li>
                <li>Added in settings an option to <kbd class="kbd-info">disable/enable customized checkboxes and radio</kbd> buttons</li>
                <li>Added in settings an option to <kbd class="kbd-info">choose default tab/page</kbd> after logging in</li>
                <li>Fixed broken links when using proxy <a href="https://github.com/qooob/authentic-theme/issues/165" target="_blank">(Issue #165)</a></li>
                <li>Fixed drive temperature formatting on <em>System Information</em> page <a href="https://github.com/qooob/authentic-theme/issues/171" target="_blank">(Issue #171)</a></li>
                <li>Fixed frames being way too small in <em>Text Login</em> and <em>Root Shell</em> modules</li>
                <li>Fixed missing <em>custom styles</em> embedment on login page</li>
                <li>Fixed tabs being fail-safe</li>
                <li>Fixed hundreds of bugs</li>
                <li>Updated <em>jQuery</em> and the code to be <em>iOS fail-safe</em></li>
                <li>Updated to the latest <em>jQuery, dataTables, CodeMirror, TinyMCE</em></li>
                </ul>
                <p><strong>ATTENTION:</strong> Translations for <code>settings_*</code> and <code>theme_conference</code> is required.</p>
                <h4 style="margin-top:20px">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #c9302c; border-color: #d9534f;">600</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em>help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>
                  Please <i class="badge fa fa-thumbs-up faa-float animated" style="font-size: 11px; background:#5cb85c"> Like new </i>  theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> YouTube</a> channel.
                  <br>
                  <br>
                  Don\'t forget nor be lazy to post to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a> found bugs.
                  <h4 style="margin-top:20px">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions. In order to join the chat room, you would need <em>Jabber ID</em>. If you don\'t have <em>Jabber ID</em>, you can register it for free on <strong>jabbers.im</strong>, using any XMPP client, that supports account registrations.
              </div>
            </div>
          </div>
       </div>';
