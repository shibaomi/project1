import React, { Component } from 'react'
import { withRouter , Link} from 'react-router'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as api from '../api/login';
import './reg.less';


const Item = List.Item;

class ForgetPasswordPhone extends Component {
  timout = null
  code = null
  constructor(props){
    super(props);
    this.state = {
      countDown: 60,
      showCountDown: false,
      memberId:'',
      code:''
    }
    this.user = 0;
  }



  onSubmit = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.mobile || getFieldsValue.mobile == ''||getFieldsValue.mobile.replace(/\s/g, "").length<11) {
      Toast.info('请输入11位手机号！');
      return;
    }

    if (!getFieldsValue.code || getFieldsValue.code == '') {
      Toast.info('请输入验证码！');
      return;
    }
    if(this.user == 1){
      Toast.info('您的账户不存在！')
      return;
    }
    if (Number(getFieldsValue.code) !== this.state.code) {
      Toast.info('请输入正确的验证码！');
      return;
    }
    // api.checkCode({
    //   bound: getFieldsValue.mobile.replace(/\s/g, ""),
    //   boundcode:getFieldsValue.code,
    //   pattern: '11'
    //
    // }).then(result => {
    //   // 注册处理
    //   if (result.result == 0) {
    //     Toast.fail(result.msg);
    //     return;
    //   }
    //
    //   // 注册成功提示
    //   Toast.success(result.msg);
    //   // 跳转设置密码
      window.location.href = 'login.html#/forgetPassword?memberId='+this.state.memberId;
    //});
  }

  countDown = () => {
    const self = this;
    this.timout = setTimeout(function() {
      if (self.state.countDown > 0) {
        self.setState({ countDown: self.state.countDown - 1 });
        self.countDown();
      } else {
        self.setState({
          showCountDown: false
        });
      }
    }, 1000, 0);
  }

  getCode = () => {
    if (this.state.showCountDown) {
      return;
    }
    const getFieldsValue = this.props.form.getFieldsValue();
    console.log(getFieldsValue);
    if (!getFieldsValue.mobile || getFieldsValue.mobile == ''||getFieldsValue.mobile.replace(/\s/g, "").length<11) {
      Toast.info('请先输入11手机号！');
      return;
    }
    api.verifyCode({ mobile: getFieldsValue.mobile.replace(/\s/g, "") }).then(result => {
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }
      if(result.data == undefined){
        // this.setState({
        //   user: 1,
        // });
        this.user = 1;
        Toast.info('您的账户不存在！')
        return;
      }
      //this.code = result.data.verifyCode
      this.setState({
        showCountDown: true,
        countDown: 60,
        memberId:result.data.memberId,
        code:result.data.code,
      })
      this.countDown();
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (<form className='wx-reg'>
      <List>
        <InputItem
          {...getFieldProps('mobile') }
          clear
          type="phone"
           placeholder="手机号码">
          <div style={{ backgroundImage: 'url(../../../assets/img/phone.bmp)', backgroundSize: 'cover', height: '0.4rem', width: '0.35rem' }} />
        </InputItem>
        <InputItem
            {...getFieldProps('code') }
            clear
            onExtraClick={this.getCode}
            maxLength="8"
            placeholder="请输入验证码" extra={this.state.showCountDown?`${this.state.countDown}秒后重新获取`:'获取验证码'}>
        </InputItem>
        <Item>
          <Button type="primary" onClick={this.onSubmit}>下一步</Button>
        </Item>
      </List>
    </form>);
  }
}

export default createForm()(ForgetPasswordPhone);
