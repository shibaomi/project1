import React, { ReactDOM, Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  ActionSheet,
  Modal,
  DatePicker
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import { common } from 'common';
import moment from 'moment';
import * as memberApi from '../../api/member';

import './customerService.less';

const Item = List.Item;

class OrderQuestion extends Component {
  render() {
    return <div className="wx-account">
      <div style={{backgroundColor:'#1786CD',paddingBottom:'0.2rem'}}>
        <div style={{textAlign:'center'}}>
          <Img src='../../../assets/img/dingdanwenti.png' style={{ width: '1.1rem', height: '1rem'}} />
        </div>
        <div style={{textAlign:'center',color:'white',paddingTop:'0.2rem'}}>
          你的专属服务顾问
        </div>
      </div>
      <div style={{color:'#777',backgroundColor:'#fff',padding:'0.3rem'}}>
      <div style={{marginBottom:'0.2rem'}}>
        一、如何下单
      </div>
      <div style={{color:'#777'}}>
        1、用手机选择购物商品后，在订单信息确认里面选择在线支付，然后选择相同的银行卡即可。
      </div>
      <div style={{color:'#777'}}>
        2、用手机选择购物商品后，在订单信息确认里面选择在线支付，然后选择相同的银行卡即可。
      </div>
    </div>
    <div style={{color:'#777',backgroundColor:'#fff',padding:'0.3rem'}}>
      <div style={{marginBottom:'0.2rem'}}>
        二、如何下单
      </div>
      <div style={{color:'#777'}}>
        1、用手机选择购物商品后，在订单信息确认里面选择在线支付，然后选择相同的银行卡即可。
      </div>
      <div style={{color:'#777'}}>
        2、用手机选择购物商品后，在订单信息确认里面选择在线支付，然后选择相同的银行卡即可。
      </div>
    </div>

    </div>
  }
}

export default withRouter(createForm()(OrderQuestion));
