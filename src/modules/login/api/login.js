import { fetch, common } from 'common';

export function login({ username, password, captcha }) {
  return fetch.get('/loginapi/login', {
    username,
    password,
    captcha
  });
}

export function verifyCode({ mobile }) {
  return fetch.get('/memberapi/findCode', {
    mobile
  });
}

export function register({ name, password, mobile,code }) {
  return fetch.get('/memberapi/register', {
    name,
    password,
    mobile,
    code
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
export function updatePassword({ newpassword, memberId }) {
  return fetch.get('/memberapi/updatePassword', {
    newpassword,
    memberId
  });
}
