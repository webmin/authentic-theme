#
# Authentic Theme 10.1.2 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

our $__changelog
    = '<div class="modal fade" id="update_notice" tabindex="-1" role="dialog" aria-labelledby="update_notice_label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-update">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="update_notice_label">' . $text{'theme_update_notice'} . '</h4>
              </div>
              <div class="modal-body">
                <h4>Version 10.0.0-10.1.2 (March 9, 2015)</h4>
                <ul>
                    <li>Fixed sub-accordions issue found by <em>Joe Cooper</em><hr></li>
                    <li>Added in settings <code>settings_menu_hide_webmin_unused_modules_link</code></li>
                    <li>Moved theme build to the separate directory as recommended by <em>Jamie Cameron</em></li>
                    <li>Changed left menu color to be slightly lighter</li>
                    <li>Added <code>settings_sysinfo_expand_all_accordions</code> and <code>settings_menu_hide_webmin_refresh_modules_link</code></li>
                    <li>Fixed quota/bandwidth calculations for <em>System Information</em></li>
                    <li>Improved left menu design to be more flat-like <em>(complete page reload is required)</em></li>
                    <li>Improved the look of old <code>ui_hidden</code> collapse, to look more like new <em>Bootstrap</em> collapse</li>
                    <li>Added support for <code>Webmail</code> in <em>Usermin</em> <a href="https://github.com/qooob/authentic-theme/issues/104" target="_blank">(Issue 104)</a></li>
                    <li>Added <code>dataTables</code>, search in case table contains more than 10 rows</li>
                    <li>Added <code>dataTables</code> on filesize, to properly sort columns containing filesize data <a href="https://github.com/qooob/authentic-theme/issues/103" target="_blank">(Issue 103)</a></li>
                    <li>Added <code>custom logo</code> support for login screen <a href="https://github.com/qooob/authentic-theme/issues/116" target="_blank">(Issue 116)</a>. Read the <a href="https://github.com/qooob/authentic-theme#how-do-i-set-custom-logos" target="_blank">manual</a></li>
                    <li>Added support for <code>basic settings</code> to control the theme (disable loaders and more). Read the <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">manual</a></li>
                    <li>Added extended controls to <em>System Information</em> page for <code>ConfigServer Security & Firewall</code></li>
                    <li>Added complete support for scrolling on <em>iPhone/iPad</em> <a href="https://github.com/qooob/authentic-theme/issues/115" target="_blank">(Issue 115)</a></li>
                    <li>Fixed server-side search that stopped working after adding <em>autocomplete</em></li>
                    <li>Fixed <code>select</code> issue in <em>Internet Explorer</em> browser <a href="https://github.com/qooob/authentic-theme/issues/99" target="_blank">(Issue 99)</a></li>
                    <li>Fixed package updates showing wrong numbers on <em>System Information</em> page <a href="https://github.com/qooob/authentic-theme/issues/112" target="_blank">(Issue 112)</a></li>
                    <li>Fixed <code>quotas charts</code> issue, displaying incorrect numbers in <em>System Information</em>/<em>Quotas</em> <a href="https://github.com/qooob/authentic-theme/issues/110" target="_blank">(Issue 110)</a></li>
                    <li>Fixed missing left menu reload upon importing new virtual server</li>
                    <li>Fixed stuck loader appearing in certain cases <a href="https://github.com/qooob/authentic-theme/issues/117" target="_blank">(Issue 117)</a></li>
                    <li>Fixed stuck loader in all third party modules, like <code>AWStat, Webminstat</code> and <code>OpenVPN + CA</code> <a href="https://github.com/qooob/authentic-theme/issues/106" target="_blank">(Issue 106)</a></li>
                    <li>Fixed <code>hotkeys triggers</code>, which now is executed only in case the switch is not already active <a href="https://github.com/qooob/authentic-theme/issues/118" target="_blank">(Issue 118)</a></li>
                    <li>Fixed fatal error happening when changing domain in <em>Webmin/Virtualmin</em> domain owner mode</li>
                    <li>Fixed <code>System Statistics</code> link to be shown only in administrative mode</li>
                    <li>Fixed <em>Virtualmin->Administration Options->Switch To Server\'s Admin</em> link, being opened in <code>__parent</code> window</li>
                    <li>Fixed <code>WYSIWYG bar</code> being <em>lower</em> than it should be from the upper border, when composing new message</li>
                    <li>Fixed login page throwing an error to the console</li>
                    <li>Removed screen-saver, as it was eating a lot of memory</li>
                    <li>Changed theme <code>repo location</code> to <em>GitHub</em>.  <strong>Attention:</strong> It\'s required that your <em>Perl</em> installation can handle <em>https</em> connections. Make sure to have installed, either <em>LWP::Protocol::https</em> or <em>Bundle::LWP</em> modules to make future <em>automatic updates</em> work</li>
                </ul>
                <h4 style="margin-top:20px">' . $text{'theme_development_support'} . '</h4>
                Thank you for using <a target="_blank" href="https://github.com/qooob/authentic-theme"><kbd style="background:#5cb85c">' . $text{'authentic_theme'} . '<kbd></a>. Overall development of this theme has already passed the stage of <kbd>400</kbd> hours.
                  I am happy to provide <em>Authentic</em> Theme for free but please know, that it would mean a World to <a href="https://rostovtsev.ru" target="_blank">me</a>, if you send me a <a target="_blank" class="badge fa fa-paypal" style="font-size: 11px; background-color: #5bc0de;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&lc=us&business=programming%40rostovtsev%2eru&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"> donation</a>.
                  It doesn\'t matter how big or small your donation is. I appreciate all donations. Each donation will <em>help me to pay my bills</em>, excite future development and improve your everyday experience, while working with the theme.
                  <br>
                  <br>
                  Please <i class="badge fa fa-thumbs-up" style="font-size: 11px; background:#5cb85c"> Like</i> theme presentation on <a class="badge label-danger fa fa-youtube" style="font-size: 11px; background-color: #c9302c;" target="_blank" href="http://www.youtube.com/watch?v=gfuPFuGpyv8"> YouTube</a> channel.
                  <br>
                  <br>
                  Don\'t forget nor be lazy to post to <a class="badge fa fa-github" style="font-size: 11px; background-color: #337ab7;" target="_blank" href="https://github.com/qooob/authentic-theme/issues"> GitHub</a> found bugs.
              </div>
            </div>
          </div>
       </div>';
