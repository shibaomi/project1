webpackJsonp([9],{1068:function(e,t,a){function n(e){return a(r(e))}function r(e){var t=u[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var u={"./index.js":217};n.keys=function(){return Object.keys(u)},n.resolve=r,e.exports=n,n.id=1068},217:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(1068),r=n.keys().filter(function(e){return"./index.js"!==e}),u=r.reduce(function(e,t){return e[t.match(/([^\/]+)\.js$/)[1]]=n(t),e},{});t.default=u,e.exports=t.default},469:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.history;return l.default.createElement(o.Router,{history:t},d)}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),l=n(u),o=a(3),i=a(55),c=n(i),s=a(574),f=n(s),d=l.default.createElement(o.Route,{path:"/",component:c.default},l.default.createElement(o.Route,{path:"/groupBuy/:activityClass",component:f.default,title:"团购"}));t.default=r,e.exports=t.default},572:function(e,t,a){"use strict";function n(e){var t=e.activityClass,a=e.pageNo,n=e.apKey,u=e.activityType,l=e.pageSize;return r.fetch.get("/groupPurchaseApi/list",{activityClass:t,pageNo:a,apKey:n,activityType:u,pageSize:l})}Object.defineProperty(t,"__esModule",{value:!0}),t.groupPurchaseList=n;var r=a(2)},573:function(e,t,a){"use strict";new(a(2).Startup)({allReducers:a(217),routes:a(469)}).run(function(){})},574:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=(a(46),a(45)),i=n(o),c=(a(84),a(83)),s=n(c),f=(a(24),a(23)),d=n(f),p=(a(7),a(6)),m=n(p),y=(a(12),a(11)),v=n(y),g=(a(52),a(51)),h=n(g),b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},E=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_=a(0),C=n(_),w=a(3),j=a(572),O=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(j),P=a(4),k=a(2);a(742);var x=h.default.TabPane,I=function(e){function t(e){r(this,t);var a=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.onTabChange=function(e){O.groupPurchaseList({activityClass:e,pageNo:1,activityType:50,pageSize:15,apKey:"groupbanner"}).then(function(e){if(1==e.result){var t=e.data[0];a.setState(b({},t))}})},a.renderItem=function(e){var t=function(e){var t=e.url;return C.default.createElement("div",{style:{width:"2rem",height:"2rem",background:"url("+t+") center center /  2rem 2rem",display:"inline-block"}})};return C.default.createElement("div",{style:{padding:"0 0.1rem",margin:"0.2rem 0"}},void 0==e.goodsImage||""==e.goodsImage?C.default.createElement(t,{url:"./assets/img/img_default.png"}):C.default.createElement(P.Img,{src:e.goodsImage,style:{width:"2rem",height:"2rem"}}),C.default.createElement("div",{className:"text-overflow-hidden"},e.goodsName),C.default.createElement("div",null,C.default.createElement("span",{style:{color:"red"}},"¥"+e.price),C.default.createElement("br",null),C.default.createElement("span",{style:{textDecoration:"line-through"}},"¥"+e.specGoodsPrice)),C.default.createElement(m.default,{justify:"end"},C.default.createElement(v.default,{onClick:function(){return a.gotoBuy(e)},size:"small",type:"primary"},"入场疯抢")))},a.gotoBuy=function(e){k.common.gotoGoodsDetail({specId:e.goodsSpecId})},a.state={qiangClass:[],defaultActiveClass:e.params.activityClass,goodsList:[],scrollAdv:null},a}return l(t,e),E(t,[{key:"componentDidMount",value:function(){var e=this;O.groupPurchaseList({activityClass:this.state.defaultActiveClass,pageNo:1,activityType:50,pageSize:1}).then(function(t){if(1==t.result){var a=t.data[0].qiangClass;a&&a.length>0&&(e.onTabChange(e.state.defaultActiveClass),e.setState({qiangClass:a}))}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.qiangClass,n=t.defaultActiveClass,r=t.scrollAdv,u=t.goodsList;return 0==a.length?null:C.default.createElement("div",{className:"wx-group fix-scroll"},C.default.createElement(h.default,{swipeable:!1,onChange:this.onTabChange,defaultActiveKey:n},a.map(function(t,a){return C.default.createElement(x,{tab:t.dictionaryName,key:t.dictionaryValue},C.default.createElement("div",null,C.default.createElement(d.default,null),r&&C.default.createElement(s.default,{className:"wx-group-carousel",autoplay:!0,infinite:!0,dots:!1},r.advList.map(function(e,t){return C.default.createElement("div",{key:t},C.default.createElement("a",{href:e.advUrl},C.default.createElement(P.Img,{src:e.resUrl})))})),C.default.createElement(d.default,null),C.default.createElement(i.default,{data:u,columnNum:3,renderItem:e.renderItem})))})))}}]),t}(_.Component);t.default=(0,w.withRouter)(I),e.exports=t.default},742:function(e,t){}},[573]);