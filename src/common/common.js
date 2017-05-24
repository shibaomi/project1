//开发环境获取url
const domain = location.host;
//图片服务url
export const IMAGE_DOMAIN = 'http://testbbc.leimingtech.com';
export const imgtest = 'http://www.longwi.com';
//API服务url
//export const SERVER_DOMAIN = 'http://222.128.107.235:8989/leimingtech-front';
export const SERVER_DOMAIN = 'http://localhost:8086/leimingtech-front';
export function getFullUrl(requestUrl) {
  //相对路径url   本地开发调试用这个！！！！！
  let url = location.protocol + '//' + domain;
  //绝对路径url   服务器上线部署方式用这个！！！！
  //let url = SERVER_DOMAIN;
  if (requestUrl.startsWith("/")) {
    url = url + requestUrl;
  } else {
    url = url + "/" + requestUrl;
  }
  return url;
}

export function isWechat() {
  return navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isQQ() {
  return navigator.userAgent.indexOf('QQ') > -1;
}

/**
 * 去登录
 * @param {登录成功后返回的页面} callBack 
 */
export function gotoLogin(callBack) {
  if (callBack) {
    window.location.href = `login.html#/?callBack=${callBack}`;
  } else {
    window.location.href = 'login.html';
  }
}
//时间戳转为时间
export function formatDate(now) {
  var year=now.getYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var hour=now.getHours();
  var minute=now.getMinutes();
  var second=now.getSeconds();
  return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
/**
 * 去登录回调
 */
export function gotoLoginAndBack() {
  // 获取当前URL,作为登录回调
  const currentUrl = window.location.href;
  gotoLogin(encodeURIComponent(currentUrl));
}
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export function gotoCart() {
  window.location.href = 'cart.html';
}

export function gotoGoodsDetail({ goodsId }) {
  // window.location.href = `goodsDetail.html#/?specId=${specId}`;
  window.location.href = `goodsDetail.html#/${goodsId}`;
}

export function gotoStore({ storeId }) {
  window.location.href = `home.html#/store/${storeId}/index`;
}

export function gotoOrder({ cartId }) {
  window.location.href = `order.html#/order/${cartId}`;
}

export function gotoPay({ paySn, orderTotalPrice }) {
	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+paySn+'/'+orderTotalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
  window.location.href = `order.html#/cashierList/${paySn}/${orderTotalPrice}`;
}

// 获取token
export function getToken() {
  return localStorage.getItem('token');
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function removeToken() {
  localStorage.removeItem('token');
  document.cookie = 'TOKEN=;';
}

/**
 * 是否登录
 */
export function isLogin() {
  const token = getToken();
  if (!token || token == '') {
    return false;
  }
  return true;
}

/**
 * 检查登录
 * @param {登录成功后返回的页面} callBack 
 */
export function checkLogin(callBack) {
  if (!isLogin()) {
    // 获取当前URL,作为登录回调
    const currentUrl = callBack || window.location.href;
    gotoLogin(encodeURIComponent(currentUrl));
  }
}

export function setCartNum(num) {
  localStorage.setItem('_cartnum', num);
}

export function getCartNum() {
  return localStorage.getItem('_cartnum') || 0;
}

export function phoneDesensitization(phone) {
  if(phone&&phone.length==11){
    return phone.substring(0,3)+"****"+phone.substring(7,11);
  }else{
    return phone;
  }
}
