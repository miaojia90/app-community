webpackJsonp([4,2],{0:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}var o=n(103),r=u(o),a=n(27),f=u(a),i=n(101),d=u(i),c=n(95),l=u(c),s=n(45),p=u(s),v=n(46),h=u(v);r.default.use(f.default),r.default.use(d.default);var m=new d.default({mode:"history",routes:p.default}),_=new f.default.Store(h.default);window.app=new r.default({el:"#app",router:m,store:_,render:function(e){return e(l.default)}}),document.body.addEventListener("click",function(e){var t=e.target,n={INPUT:1,TEXTAREA:1};t.tagName in n&&setTimeout(function(){t.scrollIntoViewIfNeeded()},400)},!1)},45:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){return n.e(0,function(t){var n=[t(96)];e.apply(null,n)}.bind(this))},o=function(e){return n.e(1,function(t){var n=[t(97)];e.apply(null,n)}.bind(this))},r="",a=[{path:"/",redirect:{name:"hello"}},{path:"/hello",component:u,name:"hello"}].map(function(e){return e.path=r+e.path,e});a.push({path:"*",component:o,name:"notfound"}),t.default=a,e.exports=t.default},46:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function o(e){return function(t,n){t[e]=n||t[e]}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(47),a=u(r),f={state:{message:""},actions:{},mutations:{}};(0,a.default)(f.state).forEach(function(e){f.mutations[e]=o(e)}),t.default=f,e.exports=t.default},88:function(e,t){},95:function(e,t,n){var u,o;n(88);var r=n(98);o=u=u||{},"object"!=typeof u.default&&"function"!=typeof u.default||(o=u=u.default),"function"==typeof o&&(o=o.options),o.render=r.render,o.staticRenderFns=r.staticRenderFns,e.exports=u},98:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},104:function(e,t){}});
//# sourceMappingURL=main-3107aed89a213c3b75ad.js.map