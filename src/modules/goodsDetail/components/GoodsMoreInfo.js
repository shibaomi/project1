import React, { Component } from 'react'
import {
  List,
  Tabs,
  Toast
} from 'antd-mobile';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;
import * as goodsDetailApi from '../api/goodsDetail';
/**
 * 商品更多信息
 * @param {*} param0 
 */


export default class GoodsMoreInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      goodsDetailInfo:props.goodsDetailInfo,
      goodsEvaluteList:'',
      goodsConsultList:'',
    }
  }
  callback(key,goodsDetailInfo) {
    if(key == '2'){
      goodsDetailApi.goodsEvaluteList({
        goodsId:goodsDetailInfo.goodsId
      }).then(result => {
        if (result.result != 1) {
          Toast.fail(result.msg);
          return;
        }
        if(result.data[0].beanList.length == 0){
          this.setState({goodsEvaluteList:'该商品还没有评论信息'});
        }
      });
    }
    if(key == '3'){
      goodsDetailApi.goodsConsultList({
        goodsId:goodsDetailInfo.goodsId
      }).then(result => {
        if (result.result != 1) {
          Toast.fail(result.msg);
          return;
        }
        if(result.data.length == 0){
          this.setState({goodsConsultList:'该商品还没有咨询信息'});
        }
      });
    }
  }
  render(){
  return <Tabs animated={false} onChange={(key) => this.callback(key,this.state.goodsDetailInfo)} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47">
      <TabPane tab="商品详情" key="1">
      <div dangerouslySetInnerHTML={{ __html: this.state.goodsDetailInfo.goodsBody }}></div>
      </TabPane>
      <TabPane tab="商品评价" key="2" style={{overflowX:'hidden',marginBottom:'0.6rem'}}>
      {/*<div dangerouslySetInnerHTML={{ __html: goodsDetailInfo.goodsProperty }}></div>*/}
      {this.state.goodsEvaluteList}
      </TabPane>
      <TabPane tab="购买咨询" key="3">
      <div style={{minHeight:'200px'}}>
      {this.state.goodsConsultList}
      </div>
      </TabPane>
    </Tabs>
}

}
