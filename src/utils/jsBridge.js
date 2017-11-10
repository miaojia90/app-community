/**
 * a webview javascript bridge wrapper for Jockey
 * @see https://github.com/tcoulter/jockeyjs
 * @see http://gitlab.jfz.net/jfzmobile/jfz_fortune_Doc/wikis/jockey-protocol
 *
 * @author major
 * @version 1.0.0
 */

;
(function(window, Jockey) {
	var environment;

	if (window.WebViewJavascriptBridge) {
		return;
	}

	function ready(callback) {
		callback = callback || function() {};

		if (!environment) {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(window.WebViewJavascriptBridge);
			}, false);
		} else {
			callback(window.WebViewJavascriptBridge);
		}
		return this;
	}

	function init() {
		var doc = document;
		var readyEvent = doc.createEvent('Events');
		readyEvent.initEvent('WebViewJavascriptBridgeReady', true, true);
		readyEvent.bridge = WebViewJavascriptBridge;

		getEnvironment(function(env) {
			doc.dispatchEvent(readyEvent);
		});
	}

	/**
	 * 获取客户端环境信息
	 * @param callback function will be called with argument
	 * {
	 *   c_business：产品编号 1：金斧子 2：滚雪球
	 *   c_channel：渠道号
	 *   c_identity：设备标识
	 *   c_mmodel：设备类型
	 *   c_network：网络类型
	 *   c_nonce：请求时间校准值（用于防止重放攻击）
	 *   c_platform：App平台
	 *   c_sysVer：系统版本
	 *   c_version：App版本号
	 *   sign：签名（如需使用此字段，请另行获取金斧子APP签名规则）
	 * }
	 *
	 * @since APP 1.0.0
	 */
	function getEnvironment(callback) {
		callback = callback || function() {};

		if (environment) {
			callback(environment);
			return false;
		}


		setTimeout(function() {
			Jockey.send("getEnvironment", function(env) {
				environment = env;
				callback(env);
			});
		}, 0);
	}

	/**
	 * 获取用户session
	 * @param callback function will be called with argument
	 * {
	 *   uid: ''
	 *   sid: ''
	 * }
	 *
	 * @since APP 1.0.0
	 */
	function getSession(callback) {
		callback = callback || function() {};
		setTimeout(function() {
			Jockey.send("getSession", function(session) {
				callback(session);
			});
		}, 0);
	}

	/**
	 * 调起预约界面
	 * @param title 预约标题 不传则默认为 “预约”
	 * @param type 1-路演 2-产品预约
	 * @param extra 额外信息
	 * @since APP 1.0.0
	 */
	function showAppointment(title, type, extra) {
		extra = extra || {};

		setTimeout(function() {
			Jockey.send("showAppointment", {
				title: title,
				'type': type,
				'extra': extra
			});
		}, 0);
	}

	/**
	 * 展示合格投资者
	 * @since APP 1.1.0
	 */
	function showInvestAgreeMentIfNeed() {
		setTimeout(function() {
			Jockey.send("showInvestAgreeMentIfNeed");
		}, 0);
	}


	/**
	 * 用于显示网页导航栏右边的分享按钮
	 * @param viewTitle
	 * @param shareTitle
	 * @param content
	 * @param url
	 * @param imageUrl
	 * @param shareID
	 * @param alwayShow
	 * @since APP 1.1.0
	 */
	function showRightShareButton(viewTitle, shareTitle, content, url, imageUrl, shareID, alwayShow, afterClickBottonCallback) {
		shareID = shareID || '';
		alwayShow = alwayShow || 0;
		afterClickBottonCallback = afterClickBottonCallback || function() {};

		var that = this;
		Jockey.off('afterClickRightShareButton');
		Jockey.on('afterClickRightShareButton', function() {
			that.shareToSNS(viewTitle, shareTitle, content, url, imageUrl, shareID);
			afterClickBottonCallback();
		});

		setTimeout(function() {
			Jockey.send("showRightBarItem", {
				itemType: '0',
				alwayShow: alwayShow,
				itemClickObject: {},
				msgAfterClick: 'afterClickRightShareButton',
				btnTitle: '',
				btnImage: 'http://oss-cn-hangzhou.aliyuncs.com/jfzapp-static2/ad/c6fd8c5187086c271e268ab810379a83.png'
			});
		}, 0);
	}

	/**
	 * 调用APP的分享控件，实现把内容传播到社交网络
	 * @param viewTitle
	 * @param shareTitle
	 * @param content
	 * @param url
	 * @param imageUrl
	 * @param shareID
	 * @since APP 1.1.0
	 */
	function shareToSNS(viewTitle, shareTitle, content, url, imageUrl, shareID) {
		shareID = shareID || '';
		var needReport = 'SHARE_NONEED_REPORT';
		setTimeout(function() {
			Jockey.send("shareToSNS", {
				viewTitle: viewTitle,
				shareTitle: shareTitle,
				content: content,
				url: url,
				imageUrl: imageUrl,
				shareID: shareID,
				needReport: needReport
			});
		}, 0);
	}

	/**
	 * 该事件用于跳转到购买流程部分
	 * @param proLevel://风险等级
	 * @param proLevelDes://风险等级描述
	 * @param proCode://产品code
	 */
	function jumpToBuy(proLevel, proLevelDes, proCode) {
		setTimeout(function() {
			Jockey.send("jumpToBuy", {
				proLevel: proLevel,
				proLevelDes: proLevelDes,
				proCode: proCode
			});
		}, 0);
	}

	/**
	 * 弹登录窗口，并回调用户session
	 * @param callback function will be called with argument
	 * {
	 *   uid: ''
	 *   sid: ''
	 * }
	 *
	 * @since APP 1.0.0
	 */
	function login(callback) {
		setTimeout(function() {
			Jockey.send("login", function(session) {
				callback && callback(session);
			});
		}, 0);
	}

	/**
	 * 该事件用于web获取用户实名认证信息及风险测评结果
	 * 接收参数无
	 * 返回参数,以字符串类型传输
	 */
	function getUserIdentifyInfo(callback) {
		callback = callback || function() {};
		setTimeout(function() {
			Jockey.send('getUserIdentifyInfo', function(res) {
				callback(res);
			});
		}, 0);
	}

	/**
	 * 该事件用于web获取用户实名认证信息及风险测评结果
	 * 接收参数无
	 * 返回参数,以字符串类型传输
	 */
	function goIdentifyPage(callback) {
		callback = callback || function() {};
		setTimeout(function() {
			Jockey.send('goIdentifyPage', function(res) {
				callback(res);
			});
		}, 0);
	}

	/**
	 * 该事件用于web获取用户实名认证信息及风险测评结果
	 * 接收参数无
	 * 返回参数,以字符串类型传输
	 */
	function riskEvaluationResult(callback) {
		callback = callback || function() {};
		setTimeout(function() {
			Jockey.send('riskEvaluationResult', function(res) {
				callback(res);
			});
		}, 0);
	}
	/**
	 * 用于右上角点击“关闭”基金评测浏览器后触发的事件
	 * @param callback 回调函数
	 * @param isTakeover 是否接管。（true：接管关闭功能；false：关闭接管功能）
	 * @since JFZFortune 1.2.0
	 */
	function closeBrowser(callback, isTakeover) {
		callback = callback || function() {};
		isTakeover = isTakeover ? '1' : '0';

		Jockey.off('modal');
		Jockey.on('modal', callback);

		setTimeout(function() {
			Jockey.send("takeoverCloseBrowser", {
				isTakeover: isTakeover,
				callback: 'modal'
			});
		}, 0);
	}
	/**
	 * 关闭webView
	 */
	function closeWebView() {
		setTimeout(function() {
			Jockey.send("closeWebView");
		});
	}

	//暴露桥接方法出去
	window.WebViewJavascriptBridge = {
		init: init,
		ready: ready,
		getEnvironment: getEnvironment,
		getSession: getSession,
		showAppointment: showAppointment,
		showInvestAgreeMentIfNeed: showInvestAgreeMentIfNeed,
		showRightShareButton: showRightShareButton,
		shareToSNS: shareToSNS,
		jumpToBuy: jumpToBuy,
		login: login,
		getUserIdentifyInfo: getUserIdentifyInfo,
		goIdentifyPage: goIdentifyPage,
		riskEvaluationResult: riskEvaluationResult,
		closeBrowser: closeBrowser,
		closeWebView: closeWebView
	};
	window.WebViewJavascriptBridge.init();
})(window, Jockey);