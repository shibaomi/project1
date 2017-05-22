import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon, Checkbox} from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import classnames from 'classnames';

import './GoodsSpec.less'
let self;

class SpecGroup extends React.PureComponent {

  render() {
    const { values, selectedValue, onChangeSpec } = this.props;
    return <div className='wx-goods-detail-spec-group'>
      {
        values.map((value, index) => {
          const tagClass = classnames('am-tag', {
            'am-tag-active': selectedValue.includes(value.spValueId),
            'am-tag-normal': !selectedValue.includes(value.spValueId)
          })  
          return <div key={index} onClick={() => onChangeSpec(value)} className={tagClass} style={{ marginLeft: '0.18rem' }}>
            <div className="am-tag-text">{value.spValueName}</div>
          </div>
        })
      }
    </div>
  }
}

class GoodsSpec extends React.PureComponent {

  constructor(props) {
    super();
    self = this;
    // console.log('props', props);
    this.state = {
      //goodsSpecValueAll: props.goodsDetailInfo.goodsSpecValueAll,
      goodsId: props.shopGoodsPackageList.goodsId,
      storeId: props.shopGoodsPackageList.storeId,
      shopGoodsPackageList:props.shopGoodsPackageList,
      specInfo:'',
      // goodsId: props.goodsDetailInfo.goodsId,
      // goodsName: props.goodsDetailInfo.goodsName,
      // goodsImage: props.goodsDetailInfo.goodsImage,
      // buyCount: props.buyCount
    }
  }
  componentDidMount(){
    goodsDetailApi.packageProgram({
      goodsId: this.state.goodsId,
      storeId:this.state.storeId,
    }).then(result => {
      if (result.result == 1) {
        this.setState({specInfo:result.data});
        //const data = result.data[0]
        // 更新组件相关数据
        // this.setState({
        //   goodsSpec: {
        //     ...this.state.goodsSpec,
        //     specGoodsPrice: data.price,
        //     specGoodsStorage: data.num,
        //     goodsSpecId: data.specId
        //   }
        // })
        // // 同步状态到外部页面
        // this.props.onChangeSpec(currentSpecs, data);
      }
    })
  }
  renderHeader = () => {
    const { shopGoodsPackageList } = this.state;
    if(self.state.shopGoodsPackageList.packageName == '自定义'){
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
        <Flex style={{ height: '50px' }}>
          <div>
            <Checkbox checked={true}
            >全选</Checkbox>
          </div>
        </Flex>
      </div>
    }else{
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
        <Flex style={{ height: '50px' }}>
          <Flex.Item style={{flex:1}}>
            <div style={{color:'#1786CD'}}>{shopGoodsPackageList.packageName}</div>
          </Flex.Item>
        </Flex>
      </div>
    }


  }

  onChangeSpec = (spec) => {
    const { goodsSpec, goodsSpecValueAll } = this.state;
    // 当前选择的所有规则
    let currentSpecs = goodsSpec.specGoodsSpec;
    // 删除当前规则组的所有子选项
    //const goodsSpecValueGroup = goodsSpecValueAll[spec.spId];
    const goodsSpecValueGroup = [];
    // 只有1个规则项，不做处理
    if (goodsSpecValueGroup.length == 1) {
      // console.log(this.refs[`specGroup-${spec.spId}`]);
      // const currentGroup = this.refs[`specGroup-${spec.spId}`];
      return;
    } else {
      //  当前规则组 ，存在多个规则时 切换处理
      goodsSpecValueAll[spec.spId].forEach(item => {
        delete currentSpecs[item.spValueId]
      })
      this.onChangeNum(1);
      // 添加当前规则到 已选择的规则
      currentSpecs[spec.spValueId] = spec.spValueName
      const specIds = Object.keys(currentSpecs).join()
      goodsDetailApi.getSpecByGoodsIdAndSpecIds({
        goodsId: goodsSpec.goodsId,
        specIds
      }).then(result => {
        if (result.result == 1) {
          const data = result.data[0]
          // 更新组件相关数据
          this.setState({
            goodsSpec: {
              ...this.state.goodsSpec,
              specGoodsPrice: data.price,
              specGoodsStorage: data.num,
              goodsSpecId: data.specId
            }
          })
          // 同步状态到外部页面
          this.props.onChangeSpec(currentSpecs, data);
        }
      })
    }
  }

  onChangeNum = (num) => {
    this.setState({
      buyCount: num
    })
    this.props.onChangeBuyNum(num);
  }

  addCart = () => {
    this.props.addCart(this.state.buyCount)
  }

  gotoBuy = () => {
    this.props.gotoBuy(this.state.buyCount)
  }

  render() {
    if(self.state.shopGoodsPackageList.packageName == '自定义'){
      return <div id = 'goodsSpec'>
        <List renderHeader={() => (this.renderHeader())}>
          {this.state.specInfo && this.state.specInfo.map((value, index) =>{
            return <List.Item key={index}  style={{ color:'#1786CD'}}>
              <Flex>
                <div>
                    <Checkbox checked={true}></Checkbox>
                </div>
                <Flex.Item>
                  <div  style = {{color:'#333'}}>
                    {value.specName}
                  </div>
                  <div style = {{color:'red'}}>
                    {'¥'+value.specGoodsPrice}
                  </div>
                  </Flex.Item>
                </Flex>
            </List.Item>
          })}
        </List>
      </div>
    }else{
      return <div id = 'goodsSpec'>
        <List renderHeader={() => (this.renderHeader())}>
          {this.state.specInfo && this.state.specInfo.map((value, index) =>{
            return <List.Item key={index}  style={{ color:'#1786CD'}}>
              <div  style = {{color:'#333'}}>
                {value.specName}
              </div>
              <div style = {{color:'red'}}>
                {'¥'+value.specGoodsPrice}
              </div>
            </List.Item>
          })}
        </List>
      </div>
    }

  }
}

export default GoodsSpec;
