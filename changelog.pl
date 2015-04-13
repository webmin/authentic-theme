#
# Authentic Theme 11.10 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 11.10 (April 13, 2015)</h4>
                <ul>
                  <li>Added ability to <code>open new tab</code> of <em>Webmin/Usermin/Virtualmin/Cloudmin/Webmail</em> by clicking on the switch (top left menu\'s selector) by right mouse button.<br><strong>Important:</strong> You must once add <em>popup window exception</em> in your browser to make this feature work</li>
                  <li>Improved greatly the usage of <code>autocomplete</code> for basic <em>Webmin</em> modules. You can test it by going to <em>Running Processes</em> or <em>Perl Modules</em> and start typing in search field. Same done for most inbuilt modules</li>
                  <li>Removed a hack for <em>Historic System Statistics</em> module, as it was fixed by the author in version 2.11 <a href="https://github.com/qooob/authentic-theme/issues/1" target="_blank">#1</a></li>
                  <li>Fixed <code>login screen</code> missing for the link to <em>Virtualmin Password Recovery</em> module, in case it\'s installed and set in <em>Webmin Configuration->Anonymous Module Access</em>. In that case, the reset button will act as expected and be the color of yellow <a href="https://github.com/qooob/authentic-theme/issues/152" target="_blank">#152</a></li>
                  <li>Fixed <em>Webmin Servers Index</em> module issue <a href="https://github.com/qooob/authentic-theme/issues/147" target="_blank">#147</a></li>
                  <li>Fixed databases listing in editing table cells mode <a href="https://github.com/qooob/authentic-theme/issues/150" target="_blank">#150</a></li>
                  <li>Fixed increased the height of <code>::-webkit-scrollbar</code> for easy access</li>
                  <li>Fixed <code>.cgi</code> file attributes and set to be executable by default <a href="https://github.com/qooob/authentic-theme/issues/154" target="_blank">#154</a></li>
                  <li>Fixed missing images in <em>Translator Module</em> <a href="https://github.com/qooob/authentic-theme/issues/155" target="_blank">#155</a></li>
                  <li>Fixed multiple small bugs</li>
                </ul>
                <h4 style="margin-top:20px">' . $text{'theme_development_support'} . '</h4>
                Thank you for using <a target="_blank" href="https://github.com/qooob/authentic-theme"><kbd style="background:#5cb85c">' . $text{'theme_name'} . '<kbd></a>. Overall development of this theme has already passed the stage of <kbd>400</kbd> hours.
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
