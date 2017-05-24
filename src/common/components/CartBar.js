import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge } from 'antd-mobile';

import "./CartBar.less"

class CartBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // 收藏
  _storecollection = () => {
    this.props.storecollection();
  }
  // 去购物车
  _gotoCart = () => {
    this.props.gotoCart();
  }
  // 加入购物车处理
  _addCart = () => {
    this.props.addCart();
  }
  // 立即购买
  _gotoBuy = () => {
    this.props.gotoBuy();
  }

  render() {
    const { showCollectionCart } = this.props;
    const filename = this.props.isFav == 1 ? 'shoucang-01.png' : 'shoucang-02.png'
    const isFavUrl = `./assets/img/${filename}`
    return (
      <div className='wx-cartbar'>
        <Flex style={{
          width: '100%',
          paddingLeft: '0.1rem',
          paddingRight:'0rem',
          height:'0.8rem',
        }}>
          {
            showCollectionCart && <Flex.Item style={{ flex: 1, textAlign: 'center',height:'0.8rem', borderRight:'1px solid #ddd',paddingTop:'0.1rem'}} onClick={() => this._storecollection()}>
              <img src={isFavUrl} style={{width:'.34rem',height:'.34rem'}} alt=""/>
              <div>收藏</div>
            </Flex.Item>
          }
          {
            showCollectionCart && <Flex.Item style={{ flex: 1, textAlign: 'center' ,paddingTop:'0.1rem'}} onClick={() => this._gotoCart()}>
              <div>
                <Badge text={this.props.cartNum} style={{
                  position: 'absolute',
                  top: '-34px',
                  left: '.22rem'
                }}></Badge>
                <img src={`./assets/img/b_3.png`} style={{ width: '.34rem', height: '.34rem' }} alt="" />
                <div>购物车</div>
              </div>
            </Flex.Item>
          }
          <Flex.Item className='addCart' onClick={()=>this._addCart()} style={{flex:2}}>
            <div disabled={this.props.data==0?true:false} type='primary'>添加购物车</div>
          </Flex.Item>
          <Flex.Item className='goBuy' onClick={()=>this._gotoBuy()} style={{flex:2}}>
            <div disabled={this.props.data==0?true:false} type='primary'>立即购买</div>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default CartBar;
