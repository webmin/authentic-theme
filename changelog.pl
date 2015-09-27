#
# Authentic Theme 16.01 (https://github.com/qooob/authentic-theme)
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

                <h4>Version 16.00 - 16.01 (September 27, 2015)</h4>

                <ul>

                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/247" target="_blank">#247</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/252" target="_blank">#252</a><hr></li>

                  <li>Improved theme\'s <em>performance</em> by overall code optimization (biggest in theme\'s history)</li>
                  <li>Improved support for <em>Firefox</em>. <em>Firefox</em> version 42+ will render animations very smoothly and provide, in general, same experience as <em>Chrome</em> now</li>
                  <li>Improved support for <em>ConfigServer Security & Firewall</em> module</li>
                  <li>Added smart focus on visible search fields - no need to focus manually - just start typing and the theme will automatically decide what to do</li>
                  <li>Added support for <em>Edge</em> browser, which now can render theme properly</li>
                  <li>Added ability to dismiss the left spinner with <code>Ctrl + Esc</code> key combination and/or its close button, that appears after 3 seconds of spinner activity</li>
                  <li>Fixed in <em>Filemin</em> module, to submit all table rows, disregard of visibility (pagination)</li>
                  <li>Fixed in <em>Filemin</em> module looped XHR requests, which made it twice slower</li>
                  <li>Added for <em>Filemin</em> module extended user-friendly notifications</li>
                  <li>Added for <em>Filemin</em> module state of the art <em>keyboard navigation</em></li>
                    <ul>
                      <li><code>alphanumeric typing</code> - quick search</li>
                      <li><code>up/down, home/end</code> - cursor position</li>
                      <li><code>enter</code> - descent into selected (in case there is only one row filtered, enter on search field will perform trigger)</li>
                      <li><code>spacebar</code> - select current row, <code>backspace</code> - previous folder</li>
                      <li><code>*</code> - inverse select, <code>+</code> - select all, <code>-</code> - deselect all</li>
                      <li><code>F2</code> - change permissions, <code>F3</code> - change ownership, <code>F4</code> - edit where possible</li>
                      <li><code>F5/Shift+F5</code> - compress/decompress, <code>F6</code> - rename, <code>Shift+F4/F7</code> - new file/folder</li>
                      <li><code>Shift+F7</code> - search, <code>F8/Del</code> - delete, <code>Ctrl+X/C/V</code> - Cut/Copy/Paste</li>
                      <li><code>Ctrl+Enter/Ctrl+Shift+Enter</code> - Save/Save and close currently edited file</li>
                      <li><code>Theme reload hot key</code> - reload current directory</li>
                    </ul>
                  <li>Deuglifed a link for switching between basic/advanced modes in <em>SpamAssassin->Header and Body Tests</em> module</li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/234" target="_blank">#234</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/235" target="_blank">#235</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/236" target="_blank">#236</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/238" target="_blank">#238</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/239" target="_blank">#239</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/242" target="_blank">#242</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/243" target="_blank">#243</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/244" target="_blank">#244</a></li>
                  <li>Fixed other bugs and made dozes of improvements</li>


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
