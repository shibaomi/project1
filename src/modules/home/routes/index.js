import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store/store';
import storeDetail from './store/storeDetail';
import storeGoods from './store/storeGoods';
import storeNewGoods from './store/storeNewGoods';
import storeCoupon from './store/storeCoupon';

import gotoSearch from './gotoSearch';
import goodsSearch from './goodsSearch';

import attention from './attention';
import viewRecord from './viewRecord';
import myIntegral from './myIntegral';
import coupon from './coupon';

import my from './my';
import orderList from './orderList';
import orderDetail from './orderDetail';

import afterSale from './afterSale/afterSale';
import applyAfterSale from './afterSale/applyAfterSale';
import progress from './afterSale/progress';
import progressDetail from './afterSale/progressDetail';
import returnDetail from './afterSale/returnDetail';
import returnGoods from './afterSale/returnGoods';
import changeGoods from './afterSale/changeGoods';

import commentList from './commentList';
import comment from './comment';

import account from './account/account';
import accountSafe from './account/accountSafe';
import recharge from './account/recharge';
import balance from './account/balance';
import lockBalance from './account/lockBalance';
import updateNickName from './account/updateNickName';
import updatePassword from './passwordandphone/updatePassword';
import updatePasswordPhone from './passwordandphone/updatePasswordPhone';
import updatePhone1 from './passwordandphone/updatePhone1';
import updatePhone2 from './passwordandphone/updatePhone2';
import invoice from './invoice/invoice';
import createPayword from './account/createPayword';

import address from './address/address';
import addressAdd from './address/addressAdd';
import addressEdit from './address/addressEdit';
import procedure from './procedure';

import customerService from './customerService/CustomerService';
import orderQuestion from './customerService/OrderQuestion';
import commonQuestion from './customerService/CommonQuestion';
import saleQuestion from './customerService/SaleQuestion';

import login from '../../login/routes/login';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false} selectedTab='home'/>
  <Route path='store/:storeId/'>
    <Route path='index' component={store} showTitle={true} from = 'store' title='店铺详情' />
    <Route path='detail' component={storeDetail} title='店铺详情'/>
    <Route path='goods(/:goodsName)' component={storeGoods} title='店铺商品' />
    <Route path='newgoods' component={storeNewGoods} title='上新' />
    <Route path='coupon' component={storeCoupon} title='优惠券' />
  </Route>
  
  <Route path='/gotoSearch' component={gotoSearch} showTitle={false}/>
  <Route path='/search/:searchType(/:keyword)' component={goodsSearch} title='商品搜索' />
  
  <Route path='/attention(/:type)' component={attention} title='我的收藏' />
  <Route path='/viewRecord(/:type)' component={viewRecord} title='浏览记录' />
  <Route path='/myIntegral' component={myIntegral} title='我的积分' />
  <Route path='/coupon(/:couponIsUser)' component={coupon} title='我的优惠券' />

  <Route path='/my' component={my} title='我的' showBottomBar={true} selectedTab='my'/>
  <Route path='/orderList/(:type)' showBottomBar={true} component={orderList} title='订单列表'/>
  <Route path='/orderDetail/(:id)' component={orderDetail} title='订单详情'/>

  <Route path='/afterSale' component={afterSale} title='售后列表' />
  <Route path='/applyAfterSale' component={applyAfterSale} title='申请售后' />
  <Route path='/progress(/:type)' component={progress} title='进度查询' />
  <Route path='/progressDetail/:type/:refundId' component={progressDetail} title='进度详情' />
  <Route path='/returnDetail/:refundId' component={returnDetail} title='退款详情' />
  <Route path='/returnGoods/:refundId' component={returnGoods} title='填写快递单号' />
  <Route path='/changeGoods/:barterId' component={changeGoods} title='填写换货快递单号' />

  <Route path='/commentList' component={commentList} title='评价晒单' />
  <Route path='/comment' component={comment} title='评价晒单'/>

  <Route path='/procedure' component={procedure} title='流程信息'/>
  <Route path='/account' showBottomBar={true} component={account} title='账户管理' selectedTab='account' />
  <Route path='/accountSafe' component={accountSafe} title='账户安全'/>
  <Route path='/recharge' component={recharge} title='余额充值' />
  <Route path='/updateNickName' component={updateNickName} title='账户管理'/>
  {/*<Route path='/attention' component={attention} title='我的收藏'/>*/}


  <Route path='/createPayword' component={createPayword} title='设置支付密码'/>

  <Route path='/balance' component={balance} title='可用余额'/>
  <Route path='/lockBalance' component={lockBalance} title='锁定余额' />
  
  <Route path='/address' component={address} title='报告接收人' />
  <Route path='/addressAdd' component={addressAdd} title='添加收货地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑收货地址'/>
  <Route path='/updatePassword' component={updatePassword} title='修改密码'/>
  <Route path='/updatePasswordPhone' component={updatePasswordPhone} title='修改密码'/>
  <Route path='/updatePhone1' component={updatePhone1} title='修改绑定手机'/>
  <Route path='/updatePhone2' component={updatePhone2} title='修改绑定手机'/>
  <Route path='/invoice' component={invoice} title='发票信息'/>
  <Route path='/customerService' component={customerService} title='客户服务'/>
  <Route path='/orderQuestion' component={orderQuestion} title='订单问题'/>
  <Route path='/saleQuestion' component={saleQuestion} title='售后问题'/>
  <Route path='/commonQuestion' component={commonQuestion} title='常见问题'/>

  <Route path='/login' component={login} title='登录'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
