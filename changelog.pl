#
# Authentic Theme 11.01 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 11.00-11.01 (March 29, 2015)</h4>
                <ul>
                    <li>Fixed unclickable left menu links, when custom logo is used <a href="https://github.com/qooob/authentic-theme/issues/143" target="_blank">#143</a></li>
                    <li>Fixed DHCP-server module showing no hostnames <a href="https://github.com/qooob/authentic-theme/issues/145" target="_blank">#145</a></li>
                    <li>Fixed multiple small bugs<hr></li>

                    <li>Added window automatic scrolling, upon page is populated from server-side.Test it and see it in action in such modules as <em>Fetchmail Mail Retrieval</em>, <em>Software Package Updates</em> and others. Intended mouse-scroll done by user, during auto-scrolling, will make it stop. Loader will be automatically hidden upon this features is triggered. This feature can be disabled using settings</li>
                    <li>Added in settings: <code>settings_security_notify_on_pre_login_request</code>, <code>settings_security_notify_on_login_request</code>, <code>settings_security_notify_on_login_success</code>, <code>settings_window_autoscroll</code>, <code>settings_sysinfo_theme_updates</code>, <code>settings_sysinfo_csf_updates</code>, <code>settings_leftmenu_button_language</code>, <code>settings_leftmenu_singlelink_icons</code>, <code>settings_leftmenu_vm_installscripts</code>, <code>settings_leftmenu_vm_webpages</code> and <code>settings_leftmenu_vm_backup_amazon</code>. Read the <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">manual</a> for using it</li>
                    <li>Added automatically stretching inputs for long text <a href="https://github.com/qooob/authentic-theme/issues/121" target="_blank">#121</a></li>
                    <li>Added auto-detection/redirection to <em>Mailbox</em> module upon logging in to <em>Usermin</em></li>
                    <li>Added <em>Dutch</em> translation by <a href="https://github.com/Rvanlaak" target="_blank">Richard van Laak</a></li>
                    <li>Added <em>Russian</em> translation</li>
                    <li>Fixed appearing loader on changing <code>select</code>, even though it was disabled in settings <a href="https://github.com/qooob/authentic-theme/issues/127" target="_blank">#127</a></li>
                    <li>Fixed text not being <em>wrapped</em> in <code>pre</code> tag and now scrollable horizontally instead <a href="https://github.com/qooob/authentic-theme/issues/123" target="_blank">#123</a></li>
                    <li>Fixed left menu output issue in uncategorised mode <a href="https://github.com/qooob/authentic-theme/issues/128" target="_blank">#128</a></li>
                    <li>Fixed encoding issue <a href="https://github.com/qooob/authentic-theme/issues/129" target="_blank">#129</a></li>
                    <li>Fixed stuck loader in <em>Virtualmin</em>, while using third party modules</li>
                    <li>Fixed left menu being shown irrespectively to the right frame <a href="https://github.com/qooob/authentic-theme/issues/131" target="_blank">#131</a></li>
                    <li>Fixed external custom links not being opened in new window in <em>Virtualmin</em> module <a href="https://github.com/qooob/authentic-theme/issues/130" target="_blank">#130</a></li>
                    <li>Improved UI of the right frame - dozens of improvements on fonts, tables, buttons, scrollbars and etc</li>
                    <li>Remove all dependencies <a href="https://github.com/qooob/authentic-theme/issues/125" target="_blank">#125</a></li>
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
