#
# Authentic Theme 18.00 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $__changelog
    = '<div class="modal fade fade4" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header background-success background--bordered">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label"><i class="fa fa-info-circle">&nbsp;&nbsp;</i>' . $text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body" style="font-weight: 300">
                <h4>Version 18.00 (May 26, 2016) &nbsp;&nbsp;&nbsp;<i class="fa fa-star"></i></h4>
                <ul>
                  <li>Fixed possible security issue and removed <em>Security Alerts</em> as they become the part of <em>Webmin Core</em> in the near future <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/467" target="_blank">#467</a></li>
                  <li>Improved <em>UI</em> overall</li>
                  <li>Reworked and empowered <em>File Manager</em> functionality:</li>
                    <ul>
                      <li>Increased speed load for all processes</li>
                      <li>Added back an option to <em>Calculate size on spacebar</em> (off by default)</li>
                      <li>Added use of multiple, draggable tabs. New <em>Open in new tab</em> option in <em>context menu</em>. Ability to load previously used tabs on the first load can be setup in module\'s options (on by default). Hotkeys are also supported for tab:</li>
                        <ul>
                          <li><code>Ctrl+space</code> - New tab</li>
                          <li><code>Ctrl+Shift+space</code> - Close current tab</li>
                          <li><code>Ctrl+left/right</code> - Change tabs</li>
                          <li><code>Ctrl+1..9</code> - Switch to the tab number</li>
                        </ul>
                      <li>Added <em>find/replace</em> functionality in search for files. It is possible now to find given string in files and replace it</li>
                      <li>Fixed ability <em>sort by size</em> folders/files, after <em>Calculate selected size</em> was applied. Added a hotkey to quickly get the size of selected:</li>
                        <ul>
                          <li><code>Ctrl+S</code> - Calculate selected size</li>
                        </ul>
                      <li>Extended notifications with proper server-response processing. Notifications now can be setup in module\'s options to display messages, either <em>All</em> (default), <em>Informations, warnings and errors</em> or <em>Warnings and Errors</em> only.</li>
                      <li>Extraction now supports multiple files and new formats <code>.7z, .bz2, .gz, .gzip, .rar, .xz</code> (in case needed dependencies installed)</li>
                      <li>Background operations for compress (However, it will work for any other operation but for now, it will not provide user-friendly message after process completes on the different folder from where it was initiated)</li>
                      <li>Fixed bug when <em>Change Permissions</em> worked correctly only for the first operation (until reload)</li>
                    </ul>
                  <li>Improved client-side code performance by lightening, separation and optimization:</li>
                    <ul>
                      <li>Each window will only load needed dependencies</li>
                      <li>Color palettes are now loaded on demand from separate file</li>
                      <li>Used only needed set of icons
                      <li>Removed JavaScript <em>checkboxes/radios</em> in favour of using pure CSS3 (great speed increase on large tables)</li>
                    </ul>
                  <li>Improved submit buttons. Type detection with adding icons, grouping and coloring. After submission, spinner appears and button becomes inactive to prevent accidental resubmission</li>
                  <li>Added an option to disable to fit database table content into screen height on <em>MySQL/PostgreSQL</em> modules. By default no scroll bars will be shown</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/422" target="_blank">#422</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/433" target="_blank">#433</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/455" target="_blank">#455</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/457" target="_blank">#457</a>  <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/460" target="_blank">#460</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/461" target="_blank">#461</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/462" target="_blank">#462</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/465" target="_blank">#465</a> <a class="label label-default" href="https://www.virtualmin.com/node/40490" target="_blank">#40490</a> <a class="label label-default" href="https://www.virtualmin.com/node/40767" target="_blank">#40767</a> <a class="label label-default" href="https://www.virtualmin.com/node/40686" target="_blank">#40686</a></li>
                  <li>Fixed dozens of other bugs</li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1800</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> <span class="font-family-default" style="margin-left: -7px;">donation</span></a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em style="border-bottom:1px dotted #ccc   ">help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>' . ( !licenses('cm') && !licenses('vm') ? '' : '-->' ) . '
                  Take a look at theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> <span class="font-family-default" style="margin-left: -7px;">YouTube</span></a> and please don\'t forget nor be lazy reporting bugs to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> <span class="font-family-default" style="margin-left: -7px;">GitHub</span></a>
                  <h4 style="margin-top:20px;">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';

1;
