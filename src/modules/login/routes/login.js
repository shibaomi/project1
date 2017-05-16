import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import { getFullUrl } from '../../../common/common';
import * as loginApi from '../api/login';

import './login.less';

const Item = List.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    // 获取URL参数
    if (this.props.location.query) {
      if (this.props.location.query.callBack) {
        this.callBack = this.props.location.query.callBack;
      }
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        loginApi.login(this.props.form.getFieldsValue()).then(result => {
          if (result.result == 1) {
            Toast.success('登录成功');
            // 登录成功保存 token
            localStorage.setItem('token', result.data[0].token);
            window.location.href = 'home.html';//this.callBack ||
          } else {
            Toast.fail(result.msg, 1);
          }
        })
      }
    });
  }
  validateusername = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('用户名至少4个字符'));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form id = 'loginForm'>
      <List
        renderFooter={() => getFieldError('username') && getFieldError('username').join(',')}
        style = {{border:'none'}}
      >
        <List renderHeader={() => <div  style={{ backgroundImage: 'url(./assets/img/notice.png)', backgroundSize: '0.3rem 0.3rem', backgroundRepeat:'no-repeat', paddingLeft:'0.44rem'}} >请登录检测服务平台账号</div>}>
          <Item>
          <InputItem
              {...getFieldProps('username', {
                rules: [
                  { required: true, message: '请输入用户名/邮箱/手机号' },
                  { validator: this.validateusername },
                ],
              })}
              clear
              placeholder="用户名/邮箱/手机号"
          >
            <div style={{ backgroundImage: 'url(./assets/img/people.png)', backgroundSize: 'cover', height: '0.4rem', width: '0.35rem' }} />
          </InputItem>
        </Item>
          <Item>
        <InputItem
            {...getFieldProps('password')}
            placeholder="请输入密码"
            type="password"
        >
          <div style={{ backgroundImage: 'url(./assets/img/pwd.png)', backgroundSize: 'cover', height: '0.4rem', width: '0.35rem' }} />
        </InputItem>
          </Item>
          <Item>
            <Flex>
              <Flex.Item>
                <InputItem
                    {...getFieldProps('captcha')}
                    placeholder="请输入验证码"
                />
              </Flex.Item>
              <div style = {{width:'1rem'}}><img style = {{width:'1rem'}} src={getFullUrl('loginapi/generateImage')}/></div>
            </Flex>
          </Item>
        </List>

        <Flex style={{backgroundColor:'#F3F3F3',padding:'0.3rem 0.5rem'}}>
          <Flex.Item>
            <Button type="primary" onClick={this.onSubmit} >登录</Button>
          </Flex.Item>
        </Flex>
        <Item style={{backgroundColor:'#F3F3F3',}} extra={<Link to='/forgetPasswordPhone' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>手机号快速注册</Link></Item>
      </List>
    </form>);
  }
}

export default createForm()(Login);
