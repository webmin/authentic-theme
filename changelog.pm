#
# Authentic Theme 17.62 (https://github.com/qooob/authentic-theme)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
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

                <h4>Version 17.60-17.62 (February 01, 2016)</h4>
                <ul>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/365" target="_blank">#365</a>    <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/366" target="_blank">#366</a>    <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/368" target="_blank">#368</a>    <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/351" target="_blank">#351</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/364" target="_blank">#364</a><hr></li>

                  <li>Added ability to select virtual-server/machine in <em>Virtualmin/Cloudmin</em> using URL queries, like <code>?virtualmin&domain=example.com</code> or <code>?cloudmin&server=example.com</code>. Shortened params like, <code>dom</code> and <code>serv</code> are also supported</li>
                  <li>Added an option to control navigation menu\'s width <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/353" target="_blank">#353</a></li>
                  <li>Added an option to theme\'s settings to reverse switch order <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/358" target="_blank">#358</a></li>
                  <li>Added sortable/searchable table for <em>Webmin Servers Index</em> module. Useful when there are many hosts <a class="label label-default" href="https://www.virtualmin.com/node/39534" target="_blank">#39534</a></li>
                  <li>Added redirection to login page, on background calls, in case the session is expired</li>
                  <li>Updated dependencies. Most notable <em>jQuery 2.2.0</em>, which brings more speed and cross-browser compatibility</li>
                  <li>Improved speed by performing code optimizations</li>
                  <li>Improved content page loader animation</li>
                  <li>Improved the select\'s dropdown in navigation menu for long lists <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/358" target="_blank">#358</a></li>
                  <li>Improved username/password preview in <em>Virtualmin/Cloudmin</em> using nice popover <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/358" target="_blank">#358</a></li>
                  <li>Fixed incorrect sorting by size for <em>Edit Users</em> in <em>Virtualmin</em> <a class="label label-default" href="https://www.virtualmin.com/node/39494" target="_blank">#39494</a></li>
                  <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/351" target="_blank">#351</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/352" target="_blank">#352</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/354" target="_blank">#354</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/356" target="_blank">#356</a> <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/359" target="_blank">#359</a></li>

                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <h4 style="margin-top:20px;">' . $text{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat faa-pulse animated" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $text{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1400</span> hours.
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
