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

class CustomerService extends Component {
  render() {
    return <div className="wx-account">
      <List>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/orderQuestion')}>
          <Img src='../../../assets/img/dingdanwenti-01.png' style={{ width: '0.33rem', height: '0.33rem'}} />&nbsp;订单问题
        </Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/saleQuestion')}>
          <Img src='../../../assets/img/shouhouwenti.png' style={{ width: '0.33rem', height: '0.33rem'}} />&nbsp;售后问题
        </Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/commonQuestion')}>
          <Img src='../../../assets/img/changjianwenti.png' style={{ width: '0.33rem', height: '0.33rem'}} />&nbsp;常见问题
        </Item>
      </List>
    </div>
  }
}

export default withRouter(createForm()(CustomerService));
