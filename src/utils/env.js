/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let linkedmeKey = '1357cc17c938b98079fafb246ea25602';
if (process.env.NODE_ENV == 'development') {
	baseUrl = "http://h5.jfz.net";
	// baseUrl = "http://10.3.10.52:8102";
} else if (process.env.NODE_ENV == 'production') {
	baseUrl = "https://h5.jfz.com";
}
// baseUrl = "http://h5.jfz.net"
export {
	linkedmeKey,
	baseUrl,
	routerMode
}