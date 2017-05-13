import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as api from '../api/login';
import './reg.less';

const Item = List.Item;

class ForgetPassword extends Component {
  code = null
  memberId = null

  onSubmit = () => {
    const getFieldsValue = this.props.form.getFieldsValue();

    if (!getFieldsValue.password || getFieldsValue.password == '') {
      Toast.info('请输入密码！');
      return;
    }
    if (!getFieldsValue.password2 || getFieldsValue.password2 == '') {
      Toast.info('请确认密码！');
      return;
    }

    if (getFieldsValue.password != getFieldsValue.password2) {
      Toast.info('两次输入的密码不一致！');
      return;
    }
    
    api.updatePassword({
      newpassword: getFieldsValue.password,
      password: getFieldsValue.password2
    }).then(result => {
      // 修改密码处理
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }

      // 修改成功提示
      Toast.success(result.msg);
      // 跳转到登录
      common.gotoLogin();
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (<form className='wx-reg'>
      <List>
        <InputItem {...getFieldProps('password') } placeholder="设置登录密码" type="password" maxLength="20">
        </InputItem>
        <InputItem {...getFieldProps('password2') } placeholder="再次输入密码" type="password" maxLength="20">
        </InputItem>
        <Item>
          <Button type="primary" onClick={this.onSubmit}>修改密码</Button>
        </Item>
      </List>
    </form>);
  }
}

export default createForm()(ForgetPassword);
