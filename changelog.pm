#
# Authentic Theme 18.20 (https://github.com/qooob/authentic-theme)
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
                <h4>Version 18.20 (October 29, 2016) &nbsp;&nbsp;&nbsp;<i class="fa fa-star"></i></h4>
                <ul>
                    <li>Upgraded dependencies <em>jQuery 3.0</em>, latest <em>Bootstrap</em>, <em>DataTables</em>, <em>CodeMirror</em> and other</li>
                    <li>Optimized dependencies load <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/534" target="_blank">#534</a></li>
                    <li>Added support for <em>ConfigServer Security & Firewall</em> v.9.20+ <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/547" target="_blank">#547</a></li>
                    <li>Added ability to disable top progress bar and its loader</li>
                    <li>Enhanced display of <em>Virtualmin</em> select <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/466" target="_blank">#466</a></li>
                    <li>Fixed bugs <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/509" target="_blank">#509</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/510" target="_blank">#510</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/535" target="_blank">#535</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/536" target="_blank">#536</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/540" target="_blank">#540</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/541" target="_blank">#541</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/543" target="_blank">#543</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/544" target="_blank">#544</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/546" target="_blank">#546</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/547" target="_blank">#547</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/551" target="_blank">#551</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/553" target="_blank">#553</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/554" target="_blank">#554</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/556" target="_blank">#556</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/559" target="_blank">#559</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/561" target="_blank">#561</a>
                      <a class="label label-default" href="https://github.com/qooob/authentic-theme/issues/564" target="_blank">#564</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/42093" target="_blank">#42093</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/43096" target="_blank">#43096</a>
                      <a class="label label-default" href="https://www.virtualmin.com/node/43158" target="_blank">#43158</a>
                  </li>
                </ul>

                <!-- <h5 style="margin-top:10px; margin-bottom:5px; font-weight: 300">How do I make the theme load faster?</h5> <em>Webmin</em> has in-built option to compress static files. It\'s possible to enable this feature by going to <code>Webmin->Webmin Configuration->Web Server Options</code> and setting <em>Gzip compress static files</em> option to <em>Use pre-compressed file and compress dynamically</em>.-->
                <hr>
                <!-- <span style=" float: right; font-size: 10px; display: inline-block; margin-top: -36px; ">18.00-18.08</span> -->
                <h4 style="margin-top:20px;">' . $Atext{'theme_development_support'} . '&nbsp;&nbsp;<i class="fa fa-fw fa-lg fa-heartbeat" style="color: #c9302c"></i></h4>
                ' . ( !licenses('cm') && !licenses('vm') ? '' : '<!--' ) . 'Thank you for using <a target="_blank" style="color: #333; font-weight: normal;" href="https://github.com/qooob/authentic-theme">' . $Atext{'theme_name'} . '</a>. Overall development of this theme has already passed the stage of <span class="badge" style="font-size: 90%; background-color: #4ca14e; border-color: #3c763d;">1840</span> hours.
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
