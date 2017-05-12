import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}

export function addCart({ goodsId, count, specId, saveType }) {
  return fetch.get('/cartapi/addCart', {
    goodsId,
    count,
    specId,
    saveType
  });
}

export function addCartBach({ goodsId, specStr }) {
  return fetch.get('/cartapi/addCartBach', {
    goodsId,
    specStr,
  });
}
