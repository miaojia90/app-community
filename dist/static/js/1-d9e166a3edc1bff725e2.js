webpackJsonp([1,2],{16:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["text","hide"],mounted:function(){document.title=this.text}},e.exports=t.default},25:function(e,t,n){var o,r;o=n(16);var s=n(26);r=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(r=o=o.default),"function"==typeof r&&(r=r.options),r.render=s.render,r.staticRenderFns=s.staticRenderFns,e.exports=o},26:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.hide?e._e():n("h1",[e._v(e._s(e.text))])},staticRenderFns:[]}},44:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(27),s=n(25),u=o(s);t.default={data:function(){return{title:"ERROR!"}},computed:(0,r.mapState)(["message"]),mounted:function(){this.$store.commit("message","404 Not Found！")},components:{cTitle:u.default}},e.exports=t.default},97:function(e,t,n){var o,r;o=n(44);var s=n(99);r=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(r=o=o.default),"function"==typeof r&&(r=r.options),r.render=s.render,r.staticRenderFns=s.staticRenderFns,e.exports=o},99:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("c-title",{attrs:{text:e.title,hide:!0}}),e._v(" "),n("p",[e._v(e._s(e.message))])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1-d9e166a3edc1bff725e2.js.map