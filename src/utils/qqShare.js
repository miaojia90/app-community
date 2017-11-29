/**
 * 通用的微信分享页面
 * 
 * Add by: major.miao
 */
export const qqShare = (shareTitle, shareLink, shareImgUrl, shareDesc, wxshareparamsUrl) => {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			wx.ready(function() {
				//朋友圈
				wx.onMenuShareTimeline({
					title: shareTitle,
					link: shareLink,
					imgUrl: shareImgUrl,
					trigger: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					},
					cancel: function(res) {
						console.log(res);
					},
					fail: function(res) {
						console.log(res);
					}
				});
				//朋友
				wx.onMenuShareAppMessage({
					title: shareTitle,
					desc: shareDesc,
					link: shareLink,
					imgUrl: shareImgUrl,
					type: 'link',
					dataUrl: '',
					trigger: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					},
					cancel: function(res) {
						console.log(res);
					},
					fail: function(res) {
						console.log(res);
					}
				});
				//QQ
				wx.onMenuShareQQ({
					title: shareTitle,
					desc: shareDesc,
					link: shareLink,
					imgUrl: shareImgUrl,
					trigger: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					},
					cancel: function(res) {
						console.log(res);
					},
					fail: function(res) {
						console.log(res);
					}
				});
			});
			wx.error(function(res) {});
			// Handle memory leak in IE 
			script.onload = script.onreadystatechange = null;
		}
	};
	// script.src = H5.hostUrl + "/weixin/other/wxshareparams?url=" + encodeURIComponent(window.location.href.split("#")[0]);
	script.src = wxshareparamsUrl;
	head.appendChild(script);
}