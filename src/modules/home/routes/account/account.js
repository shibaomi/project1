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

import './account.less';

const Item = List.Item;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: null
    }
  }

  getMember = () => {
    memberApi.memberDetail().then(result => {
      let data = result.data;
      if (data) {
        this.setState({
          memberDetail: data[0]
        });
      }
    })
  }

  componentDidMount() {
    this.getMember();
  }

  gotoLogin = () => {
    common.gotoLogin();
  }

  logout = () => {
    Modal.alert('系统提示', '您确定要退出登录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          common.removeToken();
          window.location.href = 'home.html';
        }
      },
    ]);
  }

  gotoAddress = () => {
    this.props.router.push('/address')
  }

  render() {
    const { memberDetail } = this.state;
    if (!memberDetail) {
      return null;
    }
    return <div className="wx-account">
      <List>
        <Item extra={memberDetail.memberTruename}>当前登录账号</Item>
        <Item extra={memberDetail.memberEmail}>邮箱</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/updatePhone1?phone='+memberDetail.memberMobile)} extra={common.phoneDesensitization(memberDetail.memberMobile)}>修改绑定手机号</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/updatePasswordPhone?phone='+memberDetail.memberMobile)}>修改登录密码</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/address')}>收货地址管理</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/invoice')}>发票信息管理</Item>
      </List>
      <div style={{borderBottom: '10PX solid #ddd'}}></div>
      <List>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/attention/1')}>我的收藏</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/customerService')}>客户服务</Item>
      </List>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Button type='primary' onClick={this.logout}>退出登录</Button>
      </WingBlank>
    </div>
  }
}

export default withRouter(createForm()(Account));
