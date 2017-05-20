import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  Modal,
  WingBlank,
  Toast,
  Tabs,
  List,
  Flex,
  Button
} from 'antd-mobile';
import { common } from 'common';
import * as memberApi from '../api/member';
import * as storeApi from '../api/store';

import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';

import './attention.less';

const TabPane = Tabs.TabPane;

class Attention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      storeList: [],
      type: props.params.type
    }
  }

  componentDidMount() {
    this.onChangeTab(this.state.type);
  }

  onChangeTab = (value) => {
    this.setState({
      type: value
    })

    memberApi.memberfavotites({
      type: value,
      pageno: 1,
      pageSize: 50
    }).then(result => {
      if (result.result == 1) {
        if (value == 1) {
          this.setState({
            goodsList: result.data
          })
        } else {
          this.setState({
            storeList: result.data
          })
        }
      }
    })
  }

  onClick = (el) => {
    common.gotoGoodsDetail({ specId: el.goods.specId });
  }

  gotoStore = (item) => {
    if (item.store.storeId == 0) {
      return;
    }
    this.props.router.push(`/store/${item.store.storeId}/index`)
  }

  render() {
    const {
      goodsList,
      storeList,
      type
    } = this.state;
    return (
      <div className='wx-attention fix-scroll'>
        <Tabs swipeable={false} defaultActiveKey={type} onChange={this.onChangeTab} style={{marginTop:'0.9rem'}}>
          <TabPane tab="关注的商品" key="1">
            <List>
              {
                goodsList && goodsList.map((item, index) => <List.Item key={index}>
                  <Flex>
                    <Flex.Item
                      onClick={()=>this.onClick(item)}
                      style={{ flex: 1 }}><Img src={common.imgtest+item.goods.goodsImage} style={{ width: '100%', height: '100%' }} /></Flex.Item>
                    <Flex.Item style={{flex:4}}>
                      <div
                        onClick={()=>this.onClick(item)}
                        className='text-overflow-hidden'>{item.goods.goodsName}</div>
                      <Flex justify="between">
                        <div style={{color:'red'}}>￥{item.goods.goodsPrice}</div>
                      </Flex>
                      <Flex justify="between">
                        <div className='text-overflow-hidden'>成交量： {item.goods.salenum}&nbsp;&nbsp;&nbsp;&nbsp;{item.goods.evaluate}人评价</div>
                      </Flex>
                      <Flex justify="between">
                        <div className='text-overflow-hidden'>{item.goods.storeName}</div>
                      </Flex>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }{
              (!goodsList||goodsList.length == 0 )&&
              <div style={{  paddingTop: '0.7rem',textAlign:'center',fontSize:'0.24rem',paddingBottom:'0.7rem'}}>
                <span style={{fontSize: '28px',color:'gray'}}>您的收藏为空</span>
              </div>
            }
            </List>
          </TabPane>
          <TabPane tab="关注的店铺" key="2">
            <List>
              {
                storeList && storeList.map((item, index) => <List.Item key={index}>
                  <Flex>
                    <Flex.Item
                      onClick={() => { 
                        this.gotoStore(item)
                      }}
                      style={{ flex: 1 }}><Img src={common.imgtest+item.store.storeLogo} style={{ width: '2rem', height: '2rem',borderBottom: '1px solid #ddd'}} /></Flex.Item>
                    <Flex.Item style={{flex:2,top: '0.3rem', left:'30%', right:'5%',position:'absolute'}}>
                      <div style={{fontSize:'0.25rem',whiteSpace: 'initial',wordWrap:'break-word'}}
                        onClick={() => { 
                          this.gotoStore(item)
                        }}
                        className='text-overflow-hidden'>{item.store.storeName}</div>
                      <Flex justify="between" style={{paddingTop:'0.2rem'}}>
                        <div style={{color:'gray'}}>关注人数 {item.store.storeCollect}</div>
                      </Flex>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
              {
                (!storeList||storeList.length == 0) &&
                <div style={{ paddingTop: '0.7rem',textAlign:'center',fontSize:'0.24rem',paddingBottom:'0.7rem' }}>
                  <span style={{fontSize: '28px',color:'gray'}}>您的收藏为空</span>
                </div>
              }
            </List>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Attention);
