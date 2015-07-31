#
# Authentic Theme 14.02 (https://github.com/qooob/authentic-theme)
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

                <h4>Version 14.00 -14.02 (July 31, 2015)</h4>

                <ul>

                  <li>Fixed unrealistic bug <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/211" target="_blank">#211</a><hr></li>

                  <li>Added <em>CodeMirror</em> automatic mode (highlight syntax) detection for all file-editors</li>
                  <li>Added support for <em> <a target="_blank" href="https://github.com/Real-Gecko/filemin">Filemin</a></em> file-editor and improved general support for this module</li>
                  <li>Fixed multiple bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/205" target="_blank">#205</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/206" target="_blank">#206</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/207" target="_blank">#207</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/209" target="_blank">#209</a></li>

                  <li>Improved page spinners to use no <em> JavaScript</em>, adjusted theme colors and font-weights</li>
                  <li>Improved code and performance by combining styles/scripts in a single package and making other custom optimizations</li>
                  <li>Added new date-picker to replace old <em> JavaScript</em>  pop-ups</li>
                  <li>Added ability, when editing custom styles/scripts or uploading custom logos, to update page content dynamically, without reload, to immediately display final outlook</li>
                  <li>Added overall loading progress at the top of the page (like <em>YouTube</em> and <em>Medium</em>). Can be enabled/disabled in theme settings</li>
                  <li>Added <em> CodeMirror</em>  modes bundle, to be loadable on demand to support different file highlights in <em> <a target="_blank" href="https://github.com/Real-Gecko/filemin/issues/21">Filemin</a></em> . (File manager for <em>Webmin</em> written in <em>Perl</em> (without use of <em>Java</em>))</li>
                  <li>Added locales to <em> TinyMCE</em> </li>
                  <li>Updated <em> CodeMirror</em>  and <em> TinyMCE</em> </li>
                  <li>Fixed theme HTML output to be more validator friendly</li>
                  <li>Fixed missing status label on managed system in <em> Cloudmin</em>  (thanks to <em>Jamie Cameron</em> for reporting it)</li>
                  <li>Fixed <em> JavaScript</em>  history step back button in <em> Webmin</em> </li>
                  <li>Fixed <em> CodeMirror</em>  problem in <em> ConfigServer Security & Firewall</em>  module <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/199" target="_blank">#199</a></li>
                  <li>Fixed issues with <em> Server Index</em>  module <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/182" target="_blank">#182</a>  <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/201" target="_blank">#201</a></li>
                  <li>Fixed an issue in <em> MySQL/PostgreSQL Database Server</em>  modules, when trying to view/edit table rows <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/200" target="_blank">#200</a></li>
                  <li>Fixed an issue to make theme properly run when using <em>no_frame_options=1</em> option <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/204" target="_blank">#204</a></li>
                  <li>Fixed dozens of other bugs</li>

                </ul>
                <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #c9302c; border-color: #d9534f;">660</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em style="border-bottom:1px dotted #ccc   ">help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>
                  Take a look at theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> YouTube</a> and please don\'t forget nor be lazy reporting bugs to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a>
                  <h4 style="margin-top:20px;">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';
