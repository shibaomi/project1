import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon, Tabs, Toast } from 'antd-mobile';

import './GoodsMultiSpec.less'

const TabPane = Tabs.TabPane
class GoodsMultiSpec extends React.PureComponent {

  constructor(props) {
    super();
    this.state = {
      goodsSpec: props.goodsDetailInfo.goodsSpec,
      buyCount: props.buyCount
    }
  }

  renderHeader = () => {
    const { goodsImage, goodsName } = this.props.goodsDetailInfo;
    const { goodsSpec } = this.state;
    return <div>
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute', right: 3, top: -5,
          }}
          onClick={() => this.props.onClose('cancel')}>
          <Icon type="cross" />
        </span>
      </div>
      <Flex style={{ height: '200px' }}>  
        <Flex.Item style={{flex:1}}>
          <Img src={goodsImage} style={{height:'200px'}}></Img>
        </Flex.Item>  
        <Flex.Item style={{flex:2}}>
          <div style={{color:'red'}}>{`¥${goodsSpec.specGoodsPrice}`}</div>
          <div>{goodsName}</div>
        </Flex.Item> 
      </Flex>
    </div>
  }

  onChangeNum = (value, num, item) => {
    let buyCount = {
      ...this.state.buyCount,
      ...{
        [value.goodsSpecId]: {
          num,
          name: item,
          source: value
        }
      }
    };
    const filterBuyCount = {};
    Object.keys(buyCount).forEach(function(key) {
      // 数量大于0
      if (buyCount[key].num > 0) {
        filterBuyCount[key] = buyCount[key]
      }
    })
    buyCount = filterBuyCount
    this.setState({
      buyCount
    });
    console.log(buyCount);
    this.props.onChangeBuyNum(buyCount);
  }

  addCart = () => {
    this.props.addCart(this.state.buyCount)
  }

  gotoBuy = () => {
    if (Object.keys(this.state.buyCount).length == 0) {
      Toast.info("请选择规格和数量", 1);
      return;
    }
    this.props.gotoBuy(this.state.buyCount)
  }

  render() {
    // 获取规格属性
    const { specs, specName, goodsName, goodsImage, goodsSpecValueAll } = this.props.goodsDetailInfo;
    const { goodsSpec, buyCount } = this.state;
    //  组装规格数据
    const { flag } = specs
    const specsGroups = {}
    // 多个规格
    if (flag) {
      Object.keys(specs).forEach(item => {
        if (item == 'flag') {
          return;
        }
        specsGroups[item] = specs[item];
      })
    } else {
      specsGroups['默认'] = specs.data;
    }
    const onChangeNum = this.onChangeNum;

    // 计算总数和总额
    let totalCount = 0;
    let totalPrice = 0;
    Object.keys(buyCount).forEach(function(item) {
      totalCount += buyCount[item].num;
      let singleTotalPrice = parseFloat(buyCount[item].source.specGoodsPrice) * parseFloat(buyCount[item].num)
      totalPrice = parseFloat(totalPrice) + singleTotalPrice;
    })

    totalPrice = parseFloat(totalPrice).toFixed(2);

    return <div style={{ marginBottom: '1.1rem'}}>
      <List renderHeader={() => (this.renderHeader())}>
      </List>
      <Tabs animated={false} onChange={() => { }} onTabClick={() => { }}>
        {
          Object.keys(specsGroups).map(function (item) {
            return <TabPane tab={item} key={item}>
              <div style={{
                height: '5rem',
                backgroundColor: '#fff',
                padding:'0 0.2rem'
              }}>
                {
                  specsGroups[item].map(function (value) { 
                    const specBuyCount = buyCount[value.goodsSpecId] && buyCount[value.goodsSpecId].num || 0
                    return <Flex
                      key={value.goodsSpecId}
                      style={{ height: '1.5rem',borderBottom:'1px solid #e5e5e5'}}
                      justify='between'>
                      <Flex.Item>
                        <div style={{ height: '.78rem' }}>
                          {value.specName}
                        </div>
                        {/*<div style={{color: '#999',fontSize:'.24rem'}}>价格:{`￥${value.specGoodsPrice}`}</div>*/}
                      </Flex.Item>
                      <Flex direction='column' align='end'>
                        <Stepper
                          style={{ minWidth: '1.5rem' }}
                          showNumber
                          min={0}
                          max={value.specGoodsStorage}
                          onChange={(num)=>onChangeNum(value,num,item)}
                          size="small"
                          value={specBuyCount} />
                        <span style={{color: '#999',fontSize:'.24rem'}}>库存：{value.specGoodsStorage}</span>
                      </Flex>
                    </Flex>
                  })
                }
              </div>
            </TabPane>
          })             
        }
      </Tabs>
      <Flex justify='end' style={{height:'.64rem',paddingRight:'0.1rem'}}>
        <div>共{totalCount}件 ￥{totalPrice}</div>
      </Flex>
      <CartBar
        gotoBuy={this.gotoBuy}
        addCart={this.addCart}
      ></CartBar>
    </div>
  }
}

export default GoodsMultiSpec;
