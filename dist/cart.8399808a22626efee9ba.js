webpackJsonp([5],{1063:function(e,t,n){function r(e){return n(o(e))}function o(e){var t=a[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var a={"./index.js":212};r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id=1063},212:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1063),o=r.keys().filter(function(e){return"./index.js"!==e}),a=o.reduce(function(e,t){return e[t.match(/([^\/]+)\.js$/)[1]]=r(t),e},{});t.default=a,e.exports=t.default},230:function(e,t,n){"use strict";function r(){return u.fetch.get("/cartapi/cartList")}function o(e){var t=e.cartId;return u.fetch.get("/cartapi/deleteCart",{cartId:t})}function a(e){var t=e.cartId,n=e.count;return u.fetch.get("/cartapi/updateCartCount",{cartId:t,count:n})}Object.defineProperty(t,"__esModule",{value:!0}),t.cartList=r,t.deleteCart=o,t.updateCartCount=a;var u=n(2)},464:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.history;return u.default.createElement(c.Router,{history:t},d)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),u=r(a),c=n(3),l=n(55),i=r(l),s=n(541),f=r(s),d=u.default.createElement(c.Route,{path:"/",component:i.default},u.default.createElement(c.IndexRoute,{component:f.default,selectedTab:"cart",showBottomBar:!0,title:"购物车",showTitle:!0}));t.default=o,e.exports=t.default},537:function(e,t,n){"use strict";function r(e){var t=e.storeId;return a.fetch.get("/storeapi/couponlist",{storeId:t})}function o(e){var t=e.couponId,n=e.storeId;return a.fetch.get("/storeapi/receiveCoupon",{couponId:t,storeId:n})}Object.defineProperty(t,"__esModule",{value:!0}),t.couponlist=r,t.receiveCoupon=o;var a=n(2)},538:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=(n(128),n(127)),l=r(c),i=(n(7),n(6)),s=r(i),f=(n(12),n(11)),d=r(f),p=(n(32),n(31)),h=r(p),m=(n(41),n(40)),y=r(m),g=(n(65),n(72)),v=r(g),C=(n(5),n(8)),k=r(C),b=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),E=n(0),_=r(E),I=(n(3),n(4)),w=n(87),S=(r(w),n(230)),O=(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);t.default=e}(S),n(2));n(735);var P=k.default.Item,j=(v.default.AgreeItem,function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getCoupon=function(e){n.props.getCoupon(e)},n.delShopCart=function(e){y.default.alert("提示","确定要删除吗",[{text:"取消"},{text:"确定",onPress:function(){n.props.delShopCart(e)}}])},n.delCart=function(e){y.default.alert("提示","确定要删除吗",[{text:"取消"},{text:"确定",onPress:function(){n.props.delCart(e)}}])},n.updateCart=function(e,t,r){n.props.updateCart(e,t,r)},n.checkGoods=function(e,t,r){n.props.checkGoods(e,t,r.target.checked)},n.checkShop=function(e,t){n.props.checkShop(e,t.target.checked)},n.renderHeader=function(){var e=n.props.data;return _.default.createElement(s.default,null,_.default.createElement(v.default,{checked:e.checked,onChange:function(t){return n.checkShop(e,t)}})," ",e.storeName,_.default.createElement(h.default,{type:"right"}),_.default.createElement(s.default.Item,{style:{textAlign:"right"}},_.default.createElement(d.default,{size:"small",inline:!0,onClick:function(){return n.getCoupon(e)}},"领券"),_.default.createElement(d.default,{size:"small",inline:!0,onClick:function(){return n.delShopCart(e)}},"删除")))},n.gotoGoodsDetail=function(e){O.common.gotoGoodsDetail({specId:e.specId})},n}return u(t,e),b(t,[{key:"render",value:function(){var e=this,t=this.props.data,n=this.gotoGoodsDetail;return _.default.createElement(k.default,{renderHeader:this.renderHeader},t.list.map(function(r,o){return _.default.createElement(P,{key:o},_.default.createElement(s.default,null,_.default.createElement(v.default,{checked:r.checked,onChange:function(n){return e.checkGoods(t,r,n)}}),_.default.createElement(I.Img,{src:r.goodsImages,style:{height:"1.5rem",width:"1.5rem"}}),_.default.createElement(s.default.Item,null,_.default.createElement("div",{className:"text-overflow-hidden",onClick:function(){return n(r)}},r.goodsName),_.default.createElement("p",{className:"text-overflow-hidden",onClick:function(){return n(r)},style:{fontSize:".24rem",color:"#bbb"},dangerouslySetInnerHTML:{__html:r.specInfo}}),_.default.createElement(s.default,{justify:"between"},_.default.createElement("div",{onClick:function(){return n(r)}},"￥"+r.goodsPrice)),_.default.createElement("div",null,_.default.createElement(l.default,{showNumber:!0,min:1,value:r.goodsNum,onChange:function(n){return e.updateCart(t,r,n)}}),_.default.createElement(d.default,{style:{float:"right"},size:"small",inline:!0,onClick:function(){return e.delCart(r)}},"删除")))))}))}}]),t}(E.Component));t.default=j,e.exports=t.default},539:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(c),i=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onClick=function(){var e=1==n.state.status?0:1;n.setState({status:e}),n.props.onChange(e)},n.state={status:0},n}return a(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){e.status!=this.state.status&&this.setState({status:e.status})}},{key:"render",value:function(){return l.default.createElement("div",{onClick:this.onClick},1==this.state.status?"完成":"编辑")}}]),t}(c.Component);t.default=i,e.exports=t.default},540:function(e,t,n){"use strict";new(n(2).Startup)({allReducers:n(212),routes:n(464)}).run(function(){})},541:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l,i,s=(n(7),n(6)),f=o(s),d=(n(26),n(25)),p=o(d),h=(n(12),n(11)),m=o(h),y=(n(86),n(85)),g=o(y),v=(n(10),n(9)),C=o(v),k=(n(65),n(72)),b=o(k),E=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_=n(0),I=o(_),w=n(3),S=(n(4),n(87)),O=o(S),P=n(538),j=o(P),x=n(227),L=r(x),A=n(230),T=r(A),M=n(537),N=r(M),G=n(2),R=n(129),z=o(R),B=n(539),D=o(B);n(736);var H=b.default.AgreeItem,F=(i=l=function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChangeEditStatus=function(e){n.setState({editStatus:e})},n.initAction=function(){n.context.initAction({title:I.default.createElement(D.default,{status:n.state.editStatus,onChange:n.onChangeEditStatus})})},n.refreshCartList=function(){T.cartList().then(function(e){if(1==e.result){var t=e.data||[];n.setState({cartList:t,editStatus:0}),n.initAction(),n.refreshTotalPriceAndCount(t)}})},n.gotoLogin=function(){G.common.gotoLoginAndBack()},n.gotoBuy=function(){var e=[];if(n.state.cartList.forEach(function(t){t.list.forEach(function(t){t.checked&&e.push(t.cartId)})}),0==e.length)return void C.default.info("请先选择商品",1);G.common.gotoOrder({cartId:e.join(",")})},n.updateCart=function(e,t,r){T.updateCartCount({cartId:t.cartId,count:r}).then(function(o){1==o.result&&(t.goodsNum=r,n.checkGoods(e,t,!0))})},n.delCart=function(e){T.deleteCart({cartId:e.cartId}).then(function(e){1==e.result&&n.refreshCartList()})},n.delShopCart=function(e){T.deleteCart({cartId:e.cartIds}).then(function(e){1==e.result&&n.refreshCartList()})},n.delBySelected=function(){var e=[];if(n.state.cartList.forEach(function(t){t.list.forEach(function(t){t.checked&&e.push(t.cartId)})}),0==e.length)return void C.default.info("请先选择商品",1);T.deleteCart({cartId:e.join(",")}).then(function(e){1==e.result&&C.default.info("删除成功",1,function(){n.refreshCartList()})})},n.checkGoods=function(e,t,r){var o=e.list.map(function(e){return t.specId==e.specId&&(e.checked=r),e}),a=!0;o.find(function(e){return!e.checked})&&(a=!1);var u=n.state.cartList.map(function(t){return e.storeId==t.storeId&&(t.list=o,t.checked=a),t}),c=!0;u.find(function(e){return!e.checked})&&(c=!1),n.setState({checkAll:c,cartList:u}),n.refreshTotalPriceAndCount(u)},n.checkShop=function(e,t){var r=n.state.cartList.map(function(n){if(e.storeId==n.storeId){n.checked=t;var r=n.list.map(function(e){return e.checked=t,e});n.list=r}return n}),o=!1;r.filter(function(e){return e.checked}).length==r.length&&(o=!0),n.setState({checkAll:o,cartList:r}),n.refreshTotalPriceAndCount(r)},n.checkAll=function(e){var t=n.state.cartList.map(function(t){t.checked=e;var n=t.list.map(function(t){return t.checked=e,t});return t.list=n,t});n.setState({checkAll:e,cartList:t}),n.refreshTotalPriceAndCount(t)},n.refreshTotalPriceAndCount=function(e){var t=0,r=0;e.forEach(function(e){e.list.forEach(function(e){e.checked&&(r+=e.goodsNum,t=parseFloat(t)+parseFloat(e.goodsPrice*e.goodsNum))})}),t=t.toFixed(2),n.setState({goodsNum:r,goodsTotalPrice:t})},n.getCoupon=function(e){N.couponlist({storeId:e.storeId}).then(function(t){var n=t.data;if(n&&n.length>0){var r=function(){};g.default.show(I.default.createElement(z.default,{storeId:e.storeId,couponList:n,onClose:function(){return g.default.hide()}}),{animationType:"slide-up",onMaskClose:r})}else C.default.info("暂无优惠券可领券",1)})},n.state={relGoodsRecommedlist:[],cartList:[],isInit:!1,checkAll:!1,goodsNum:0,goodsTotalPrice:0,editStatus:0},n}return c(t,e),E(t,[{key:"componentWillUnmount",value:function(){this.context.clearAction()}},{key:"componentDidMount",value:function(){var e=this;this.initAction(),C.default.loading(),T.cartList().then(function(t){C.default.hide(),1==t.result&&e.setState({isInit:!0,cartList:t.data||[]})}),L.relGoodsRecommedlist().then(function(t){if(1!=t.result)return void C.default.error(t.msg);var n=t.data;e.setState({relGoodsRecommedlist:n})})}},{key:"render",value:function(){var e=this,t=G.common.isLogin(),n=this.state,r=n.cartList,o=n.isInit,a=n.editStatus;return o?I.default.createElement("div",{className:"wx-cart-list"},I.default.createElement("div",{className:"fix-scroll hastitle",style:{paddingBottom:"1.8rem"}},!t&&I.default.createElement(p.default,null,I.default.createElement(m.default,{inline:!0,size:"small",onClick:this.gotoLogin,style:{marginTop:"20px"}},"登录")),r&&r.map(function(t,n){return I.default.createElement(j.default,{key:n,data:t,delShopCart:e.delShopCart,delCart:e.delCart,updateCart:e.updateCart,checkShop:e.checkShop,checkGoods:e.checkGoods,getCoupon:e.getCoupon})}),0==r.length&&I.default.createElement("div",{style:{padding:"20px 20px"}},I.default.createElement("img",{src:"./assets/img/b_3.png"}),I.default.createElement("span",{style:{fontSize:"28px",color:"gray"}},"购物车是空的")),I.default.createElement("div",null,I.default.createElement(O.default,{data:this.state.relGoodsRecommedlist}))),I.default.createElement("div",{className:"wx-cart-list-bar"},I.default.createElement(f.default,null,I.default.createElement(f.default.Item,null,I.default.createElement(H,{checked:this.state.checkAll,onChange:function(t){return e.checkAll(t.target.checked)}},"全选")),0==a?[I.default.createElement(f.default.Item,{key:1},I.default.createElement("span",{style:{minWidth:"100px"}},"合计: ¥",this.state.goodsTotalPrice),I.default.createElement("br",null),I.default.createElement("span",null,"共",this.state.goodsNum,"件")),I.default.createElement(f.default.Item,{key:2,style:{textAlign:"right",margin:"0.1rem"}},I.default.createElement(m.default,{type:"primary",size:"small",inline:!0,onClick:this.gotoBuy},"去结算"))]:[I.default.createElement(f.default.Item,{key:1},I.default.createElement(m.default,{size:"small",inline:!0,onClick:this.delBySelected},"删除")),I.default.createElement(f.default.Item,{key:2}," ")]))):null}}]),t}(_.Component),l.contextTypes={router:I.default.PropTypes.object.isRequired,initAction:I.default.PropTypes.func,clearAction:I.default.PropTypes.func},i);t.default=(0,w.withRouter)(F),e.exports=t.default},735:function(e,t){},736:function(e,t){}},[540]);