#
# Authentic Theme 18.10 (https://github.com/qooob/authentic-theme)
# Copyright 2014-2016 Ilia Rostovtsev <programming@rostovtsev.ru>
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
                <h4>Version 18.00-18.10 (August 06, 2016) &nbsp;&nbsp;&nbsp;<i class="fa fa-star"></i></h4>
                <ul>

                  <li>
                        Fixed bug <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/527" target="_blank">#527</a>
                        <span style=" float: right; font-size: 10px; display: inline-block; margin-top: 10px; ">18.10</span><hr>
                  </li>

                  <li>Added ability to embed custom <em>Perl</em> scripts to be able to run arbitrary code that survives updates. It can be edited in <em>Theme Extensions</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/525" target="_blank">#525</a></li>
                  <li>Added <em>Password Generator</em> feature for pages that require it. Password length and characters used can be set in theme settings <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/492" target="_blank">#492</a></li>
                  <li>Added ability to donate using <em>Bitcoin</em> and <em>Yandex Money</em></li>
                  <li>Improved <em>UI</em> of <em>ConfigServer Security & Firewall</em> (in particular, configuration page and server outputs)</li>
                  <li>Added ability to extract <code>.rpm</code> and <code>.deb</code> files in <em>File Manager</em> (needed dependencies for <code>.rpm</code>: <em>rpm2cpio</em> and <em>cpio</em>; for <code>.deb</code>: <em>dpkg</em>)</li>
                  <li>Added ability to have user-specific tabs in <em>File Manager</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/478" target="_blank">#478</a></li>
                  <li>Added ability to open correspondent module, when clicking on charts on <em>System Information</em> page <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/480" target="_blank">#480</a></li>

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
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/320" target="_blank">#320</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/422" target="_blank">#422</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/433" target="_blank">#433</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/455" target="_blank">#455</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/457" target="_blank">#457</a>  <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/460" target="_blank">#460</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/461" target="_blank">#461</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/462" target="_blank">#462</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/465" target="_blank">#465</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/445" target="_blank">#445</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/452" target="_blank">#452</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/470" target="_blank">#470</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/485" target="_blank">#485</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/487" target="_blank">#487</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/495" target="_blank">#495</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/496" target="_blank">#496</a> <a class="label label-default" href="https://www.virtualmin.com/node/40490" target="_blank">#40490</a> <a class="label label-default" href="https://www.virtualmin.com/node/40767" target="_blank">#40767</a> <a class="label label-default" href="https://www.virtualmin.com/node/39576" target="_blank">#39576</a> <a class="label label-default" href="https://www.virtualmin.com/node/39789" target="_blank">#39789</a> <a class="label label-default" href="https://www.virtualmin.com/node/40686" target="_blank">#40686</a> <a class="label label-default" href="https://www.virtualmin.com/node/40936" target="_blank">#40936</a> <a class="label label-default" href="https://www.virtualmin.com/node/40988" target="_blank">#40988</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/394" target="_blank">#394</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/503" target="_blank">#503</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/506" target="_blank">#506</a>  <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/507" target="_blank">#507</a>  <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/513" target="_blank">#513</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/514" target="_blank">#514</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/515" target="_blank">#515</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/516" target="_blank">#516</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/517" target="_blank">#517</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/518" target="_blank">#518</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/519" target="_blank">#519</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/pull/520" target="_blank">#520</a> <a class="label label-default" href="https://www.virtualmin.com/node/41530" target="_blank">#41530</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/522" target="_blank">#522</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/524" target="_blank">#524</a> <a class="label label-default" href="https://www.virtualmin.com/node/40515" target="_blank">#40515</a></li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <span style=" float: right; font-size: 10px; display: inline-block; margin-top: -36px; ">18.00-18.08</span>
                <h4 style="margin-top:20px;">' . $Atext{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $Atext{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1810</span> hours.
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
