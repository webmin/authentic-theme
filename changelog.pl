#
# Authentic Theme 12.00 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 12.00 - 11.50 (May 3, 2015)</h4>
                <ul>
                  <li>Added right page <em style="color: #c9302c; font-weight: bold">icons</em>, that had been around in other themes for decades. Many people asked for it, including <em>Joe Cooper</em>. It was one of the conditions for making <em>Authentic Theme</em> default in <em>Webmin</em>. <em>Icons</em> that are used at the moment, are not brand new but looks good. Brand new, <em>SVG</em> icons, are coming in the near future! It\'s very important to know, that all of these innovations, can be tweaked using settings. By default, <em>big icons</em> are enabled, with <em>animation</em> and <em>grayscale effect</em>. Using settings, you can change default icons, to small or extra small, or even completely disable them and get back to what <em>Authentic Theme</em> has been before. Added in settings <code>settings_right_hide_table_icons</code>, <code>settings_right_small_table_icons</code>, <code>settings_right_xsmall_table_icons</code>, <code>settings_right_animate_table_icons</code>, <code>settings_right_grayscaled_table_icons</code> <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Improved general UI of the left menu</li>
                  <li>Fixed some bugs<hr></li>

                  <li>Added <em>Easy Pie Charts</em> and corresponding option <code>settings_sysinfo_easypie_charts</code>, that will let you enable/disable <em>Charts</em> on <em>System Information</em> page <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Added in settings <code>settings_right_iconize_header_links</code>, that enables you to choose between old style right-page header links or replace it with new beautiful icon links. Default is set to <code>true</code>. <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Added ability to disable right-page reload upon switching between <em>Webmin/Virtualmin/Cloudmin</em> by the following option <code>settings_right_reload</code>. The default value is set to <code>true</code>. <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Added ability to choose hotkeys modifier and hotkeys values, when using it by the following options <code>settings_hotkey_toggle_modifier</code>, <code>settings_hotkey_toggle_key_webmin</code>, <code>settings_hotkey_toggle_key_virtualmin</code>, <code>settings_hotkey_toggle_key_cloudmin</code>, <code>settings_hotkey_toggle_key_usermin</code>, <code>settings_hotkey_toggle_key_webmail</code>, <code>settings_hotkey_focus_search</code> and <code>settings_hotkey_reload</code>. <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Added ability to choose the custom page, when <em>Virtualmin/Cloudmin</em> is loaded/selected by the following options <code>settings_right_virtualmin_default</code> and <code>settings_right_cloudmin_default</code>. The default value is <code>\'sysinfo.cgi\'</code> (System Information). <a href="https://github.com/qooob/authentic-theme#how-do-i-use-theme-settings" target="_blank">&nbsp;&nbsp;<i class="fa fa-lg fa-book text-lighter faa-tada animated-hover" title="Manual"></i></a></li>
                  <li>Added <code>autofocus</code> on <em>username</em> field, when login page is accessed</li>
                  <li>Fixed mail being displayed in HTML, to preserve message custom formatting</li>
                  <li>Fixed <em>dozens</em> of other bugs</li>
                </ul>
                <h4 style="margin-top:20px">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                Thank you for using <a target="_blank" href="https://github.com/qooob/authentic-theme"><kbd style="background:#5cb85c">' . $text{'theme_name'} . '<kbd></a>. Overall development of this theme has already passed the stage of <span class="badge" style="background-color: #f0ad4e; border-color: #eea236;">440</span> hours.
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
