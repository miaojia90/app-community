import './jockey.js';
import './jsBridge.js';
import {
    linkedmeKey
} from './env.js';
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 判断是否登录 如果未登录 进行登录
 */
export const callLoginJockey = (callback) => {
    WebViewJavascriptBridge.ready(function(bridge) {
        bridge.login(function(session) {
            var uid = session.uid;
            var sid = session.sid;
            setStore("sessionSid", session.sid);
            setStore("sessionUid", session.uid);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        });
    });
}

/**
 * 检查用户的session是否存在
 */
export const checkUserSession = (callback) => {
    WebViewJavascriptBridge.ready(function(bridge) {
        bridge.getSession(function(session) {
            var uid = session.uid;
            var sid = session.sid;
            setStore("sessionSid", session.sid);
            setStore("sessionUid", session.uid);
            //用户没有登录跳转到登录
            if (!sid) {
                callLoginJockey(callback);
            } else {
                //调用点赞的接口
                if (callback && typeof(callback) === "function") {
                    callback();
                } else {
                    return;
                }
            }
        });
    });
}

/**
 * 检查用户的session是否存在
 */
export const getUserSession = (callback) => {
    WebViewJavascriptBridge.ready(function(bridge) {
        bridge.getSession(function(session) {
            var uid = session.uid;
            var sid = session.sid;
            setStore("sessionSid", session.sid);
            setStore("sessionUid", session.uid);
            //调用点赞的接口
            if (callback && typeof(callback) === "function") {
                callback();
            } else {
                return;
            }
        });
    });
}

/**
 * 发布评论
 */
export const publishComment = (code, type, replyCommentId, placeholder, callback) => {
    WebViewJavascriptBridge.ready(function(bridge) {
        bridge.getSession(function(session) {
            var uid = session.uid;
            var sid = session.sid;
            setStore("sessionSid", session.sid);
            setStore("sessionUid", session.uid);
            //用户没有登录跳转到登录
            if (!sid) {
                callLoginJockey(callback);
            } else {
                //调用点赞的接口
                WebViewJavascriptBridge.ready(function(bridge) {
                    bridge.publishComment(code, type, replyCommentId, placeholder, callback);
                });
            }
        });
    });
}

/**
 *  站内分享
 */
export const innerAppShare = (viewTitle, shareTitle, content, url, imageUrl, shareID, alwayShow, afterClickBottonCallback) => {
    WebViewJavascriptBridge.showRightShareButton(viewTitle, shareTitle, content, url, imageUrl, shareID, alwayShow, afterClickBottonCallback);
}

/**
 *  关闭webview
 */
export const closeWebView = () => {
    WebViewJavascriptBridge.closeWebView();
}

/*
 *  页面跳转
 */
export const jumpToView = (viewId, closeWebView, viewProperty) => {
    WebViewJavascriptBridge.ready(function(bridge) {
        bridge.jumpToView(viewId, closeWebView, viewProperty);
    });
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 *  检查是否存在在APP中
 */
export const isInnerApp = () => {
    return /JFZFortune/i.test(navigator.userAgent);
}

/**
 * 进入到相对应的详情页
 */
export const enterDetailPageEvent = (url, uid) => {
    if (!!!uid) {
        //直接跳转到详情页
        window.location.href = decodeURI(url);
    } else {
        if (/JFZFortune/i.test(navigator.userAgent)) {
            //站内
            WebViewJavascriptBridge.ready(function(bridge) {
                bridge.jumpToView('32', '0', {
                    "uid": uid
                });
            });
        } else {
            //站外
            window.location.href = decodeURI(url);
        }
    }
}

/**
 *  linkedme 跳转
 */
export const linkedmeFun = (callback) => {
    var linkedme_key = linkedmeKey;
    var initData = {};
    initData.type = "live";
    linkedme.init(linkedme_key, initData, function(err, response) {});

    //创建深度链接  跳转到首页
    var data = {};
    var appJsonString = window.location.href;
    var appJson = encodeURI(appJsonString);
    data.params = '{"linkedme":"' + appJson + '"}'; //注意单引号和双引号的位置
    linkedme.link(data, function(err, response) {
        if (err) {
            // 生成深度链接失败，返回错误对象err
            console.log("errr" + err);
        } else {
            if (callback && typeof(callback) === "function") {
                callback(response.url);
            } else {
                return;
            }
            // $("#pop_download").addClass("linkedme").attr("href", response.url);
        }
    }, false);
}

/**
 *  linkedme 跳转
 */
export const linkedmeInnerApp = (viewId, viewProperty, callback) => {
    var linkedme_key = linkedmeKey;
    var initData = {};
    initData.type = "live";
    linkedme.init(linkedme_key, initData, function(err, response) {});

    //创建深度链接  跳转到首页
    var data = {};
    var appJson = {
        "view": {
            "viewId": viewId,
            "viewProperty": viewProperty
        }
    };
    var appJsonString = encodeURI("app://") + JSON.stringify(appJson);
    appJson = encodeURI(appJsonString);
    data.params = '{"linkedme":"' + appJson + '"}'; //注意单引号和双引号的位置
    linkedme.link(data, function(err, response) {
        if (err) {
            // 生成深度链接失败，返回错误对象err
            console.log("errr" + err);
        } else {
            if (callback && typeof(callback) === "function") {
                console.log("response.url", response.url);
                callback(response.url);
            } else {
                return;
            }
            // $("#pop_download").addClass("linkedme").attr("href", response.url);
        }
    }, false);
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
    }, {
        passive: true
    })

    document.addEventListener('touchmove', () => {
        showBackFun();
    }, {
        passive: true
    })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, {
        passive: true
    })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
            if (attr === "opacity") {
                return Math.round(getStyle(element, attr, 'float') * 100);
            } else {
                return getStyle(element, attr);
            }
        }
        //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
        } else {
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {}; //记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0; //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration * 20 / 400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}