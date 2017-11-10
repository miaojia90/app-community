// APP内部
function appInnerOpenWebAccount() {
	var _jfz_paq = _jfz_paq || [];
	_jfz_paq.push(['setTrackerMethod', 2]);
	try {
		WebViewJavascriptBridge.ready(function(bridge) {
			bridge.getEnvironment(function(environment) {
				_jfz_paq.push(['setCookieId', environment.c_identity]);
			});
			bridge.getSession(function(session) {
				session = session || {}
				if (session.uid && session.sid) {
					_jfz_paq.push(['setUserId', session.uid]);
				}
				_jfz_paq.push(['trackPageView']);
			});
		});
	} catch (e) {};

	(function() {
		var sm = document.createElement('script');
		sm.type = 'text/javascript';
		sm.async = true;
		sm.src = 'https://jfzapp-static2.jfz.com/static/js/record.origin.min.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(sm, s);
	})();

	WebViewJavascriptBridge.ready(function(bridge) {
		bridge.closeBrowser(function() {
			_jfz_paq.push(['trackPageClose']);
			bridge.closeBrowser();
			bridge.closeWebView();
		}, true);
	});
}
//APP外部
function appOutOpenWebAccount() {
	var sm = document.createElement('script');
	sm.type = 'text/javascript';
	sm.async = true;
	sm.src = 'https://jfzapp-static2.jfz.com/static/js/record.origin.min.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(sm, s);
}

//检查是否在APP内打开
function checkIsAppEnvironment() {
	return /JFZFortune/i.test(navigator.userAgent);
}

//立即执行的匿名函数
(function() {
	if (!checkIsAppEnvironment()) {
		appOutOpenWebAccount();
	} else {
		appInnerOpenWebAccount();
	}
})();