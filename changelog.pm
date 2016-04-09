#
# Authentic Theme 17.81 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 17.80 - 17.81 (April 9, 2016) &nbsp;&nbsp;&nbsp;<i class="fa fa-star"></i></h4>
                <ul>
                  <li>Improved support for the latest <em>ConfigServer Security & Firewall</em></li>
                  <li>Fixed a bug <a class="label label-default" href="https://www.virtualmin.com/node/40293" target="_blank">#40293</a><hr></li>
                  <li>Improved theme\'s speed, up to around <em style="font-weight: 500;">20%</em>, depending on the module, due to large code optimisation</li>
                  <li>Improved general <em>UI</em></li>
                  <li>Improved <em>autocomplete</em> links\' processing</li>
                  <li>Improved output of <em>System and Server Status</em> to <em>System Information</em> page</li>
                  <li>Improved and enhanced file editor functionality:</li>
                    <ul></li>
                      <li>Find/search/replace/replace all/jump to line</li>
                      <li>Auto close/match brackets</li>
                      <li>Code fold</li>
                      <li>Scroll-bar annotations</li>
                      <li>Match-highlight on text selection</li>
                      <li>Highlight of the current line</li>
                      <li>Word autocompletion (hint), based on the words found in the current window (<i>Ctrl + Space</i>)</li>
                    </ul></li>
                  <li>Improved and enhanced <em>File Manager</em> functionality:</li>
                    <ul></li>
                      <li>Switched to using <em>WebminCore</em> for copying/moving files (Suggested by <em>Joe Cooper</em>)</li>
                      <li>Pasting existing file/folder in a directory with the new name <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/390" target="_blank">#390</a></li>
                      <li>Prompt for copying/replacing existing folders/files from other directory <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/401" target="_blank">#401</a></li>
                      <li>Copying path to clipboard using <em>context menu</em> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/408" target="_blank">#408</a></li>
                      <li>Error message for moving directory into itself</li>
                      <li>Improved bookmarks functionality and fixed usability for wheel users.<br>Bookmarks control no longer in settings <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/347" target="_blank">#347</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/389" target="_blank">#389</a></li>
                      <li>Options control was ported away from theme\'s settings to the module\'s configuration page</li>
                    </ul></li>
                  <li>Added character set notification warning for <em>non UTF-8</em> users <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/416" target="_blank">#416</a></li>
                  <li>Added ability to save config files, that are edited manually, without reloading the page. Script will also makes sure that you are not going to leave the page unsaved.<br>Hotkeys are supported - <em>Ctrl + Enter / Ctrl + ⇧ + Enter</em> - Save/Save and close currently edited file</li>
                  <li>Added ability to prematurely unveil the page by double-clicking on the content page</li>
                  <li>Added support for <em>ConfigServer Security & Firewall</em> 8.19+</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/176" target="_blank">#176</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/386" target="_blank">#386</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/399" target="_blank">#399</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/403" target="_blank">#403</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/411" target="_blank">#411</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/412" target="_blank">#412</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/414" target="_blank">#414</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/417" target="_blank">#417</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/419" target="_blank">#419</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/424" target="_blank">#424</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/426" target="_blank">#426</a> <br style="line-height: 19px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="label label-default" href="https://www.virtualmin.com/node/39272" target="_blank">#39272</a> <a class="label label-default" href="https://www.virtualmin.com/node/39722" target="_blank">#39722</a> <a class="label label-default" href="https://www.virtualmin.com/node/39958" target="_blank">#39958</a> <a class="label label-default" href="https://www.virtualmin.com/node/39974" target="_blank">#39974</a> <a class="label label-default" href="https://www.virtualmin.com/node/39977" target="_blank">#39977</a> <a class="label label-default" href="https://www.virtualmin.com/node/39999" target="_blank">#39999</a> <a class="label label-default" href="https://www.virtualmin.com/node/40066" target="_blank">#40066</a></li>
                  </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1600</span> hours.
                  I am happy to provide it for free but it would mean a lot to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you sent me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> <span class="font-family-default">donation</span></a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em style="border-bottom:1px dotted #ccc   ">help me to pay my bills</em> and excite future progress.
                  <br>
                  <br>' . ( !licenses('cm') && !licenses('vm') ? '' : '-->' ) . '
                  Take a look at theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://youtu.be/f_oy3qX2GXo"> <span class="font-family-default">YouTube</span></a> and please don\'t forget nor be lazy reporting bugs to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> <span class="font-family-default">GitHub</span></a>
                  <h4 style="margin-top:20px;">' . $text{'theme_conference'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-weixin" style="color: #333"></i></h4>
                A chat room <code>authentic-theme@conference.jabbers.im</code> is opened for discussions.
              </div>
            </div>
          </div>
       </div>';

1;
