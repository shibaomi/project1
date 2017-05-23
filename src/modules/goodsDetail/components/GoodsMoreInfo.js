import React, { Component } from 'react'
import {
  List,
  Tabs,
  Toast,
  Flex,
} from 'antd-mobile';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;
import * as goodsDetailApi from '../api/goodsDetail';
import './GoodsMoreInfo.less'
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
        debugger
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
        }else{
          let data = result.data.map((value,index)=>{
            return <Flex direction='column' style = {{padding:'0.2rem 0.3rem',borderBottom:'1px solid #ddd'}}>
              <div style={{width:'100%',height:'0.6rem',lineHeight:'0.6rem'}}>
                  <div style={{width:'2rem',height:'0.6rem',lineHeight:'0.6rem',float:'left'}}>{value.cmemberName}</div>
                  <div style={{width:'3rem',height:'0.6rem',lineHeight:'0.6rem',float:'right',textAlign:'right'}}>{value.consultAddtimeStr}</div>
              </div>
              <Flex.Item>
                <Flex justify="start">
                  <div style={{width:'0.4rem',height:'0.4rem',lineHeight:'0.4rem'}}>
                    <img src='../../../assets/img/wen.png'/>
                  </div>
                  <Flex.Item>{value.cgoodsName}</Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Flex>
                  <div style={{width:'0.4rem',height:'0.4rem'}}>
                    <img src='../../../assets/img/da.png'/>
                  </div>
                  <Flex.Item>{value.consultContent}</Flex.Item>
                </Flex>
              </Flex.Item>

            </Flex>
          });
          this.setState({goodsConsultList:data});
        }
      });
    }
  }
  render(){
  return <div id = 'moreinfo'>
    <Tabs animated={false} onChange={(key) => this.callback(key,this.state.goodsDetailInfo)} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47">
      <TabPane tab="商品详情" key="1">
      <div dangerouslySetInnerHTML={{ __html: this.state.goodsDetailInfo.goodsBody }}></div>
      </TabPane>
      <TabPane tab="商品评价" key="2" style={{overflowX:'hidden',marginBottom:'0.6rem'}}>
      {/*<div dangerouslySetInnerHTML={{ __html: goodsDetailInfo.goodsProperty }}></div>*/}
      {this.state.goodsEvaluteList}
      </TabPane>
      <TabPane tab="购买咨询" key="3">
      <div style={{minHeight:'200px',marginBottom:'0.6rem'}}>
      {this.state.goodsConsultList}
      </div>
      </TabPane>
    </Tabs>
  </div>
}

}
