import { fetch, common } from 'common';

export function login({ username, password, captcha }) {
  localStorage.removeItem('token');
  return fetch.post('/loginapi/login', {
    username,
    password,
    captcha
  });
}

//不需要登录的获取验证码
export function verifyCode({ mobile }) {
  return fetch.get('/floor/api/verifyCode', {
    mobile
  });
}

export function register({ name, password, mobile }) {
  return fetch.get('/memberapi/register', {
    name,
    password,
    mobile,
    //code
  });
}

// 验证验证码
export function checkCode({ bound ,boundcode,pattern}) {
  return fetch.get('/memberapi/checkCode', {
    bound,
    boundcode,
    pattern
  });
}

// 重置密码-重新获取验证码
export function findCode({ mobile }) {
  return fetch.get('/memberapi/findCode', {
    mobile
  });
}

// 重置密码
export function updatePassword({
    code,
    newpassword,
    password
}) {
  return fetch.post('/memberapi/updatePassword', {
    code,
    newpassword,
    password
  });
}

// 忘记密码
export function forgetPassword({
    memberId,
    password
}) {
  localStorage.removeItem('token');
  return fetch.post('/floor/api/forgotPassword', {
    memberId,
    password
  });
}