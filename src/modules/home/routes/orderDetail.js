import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
    Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import './orderDetail.less'
import * as Common from '../../../common/common';
const Step = Steps.Step;
class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderDetail: null
    }
  }

  componentDidMount() {
    const orderId = this.props.params.id;
    orderApi.orderdetail({
      orderId
    }).then(result => {
      //debugger
      if (result.result == 1) {
        const data = result.data[0]
        this.setState({
          orderDetail: data
        });
      }
    })
  }

  getStatusShowText = (status) => {
    const orderStatus = {
      '0': '已取消',
      '10': '待支付',
      '20': '待发货',
      '30': '待收货',
      '40': '确认收货',
      '50': '已提交',
      '60': '待发货',
    }
    return orderStatus[status]
  }

  render() {
    const { orderDetail } = this.state
    if (!orderDetail) {
      return null;
    }
    return (
      <div className="wx-orderDetail">
        <Steps direction="horizontal" current={1} >
          {
            this.state.orderDetail && this.state.orderDetail.orderLogList.map((value,index)=>{
                return <Step status={'finish'} title="" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description={value.stateInfo} />
            })
          }
          {/*<Step status={'finish'} title="您的" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />*/}
          {/*<Step status={'finish'} title="您的" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />*/}
          {/*<Step status={'finish'} title="您的" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />*/}
        </Steps>
        <div style={{height:'0.2rem',width:'100%',backgroundColor:'#F3F3F3'}}></div>
          <div style={{backgroundColor:'white'}}>
            <p>
              订单状态: {this.getStatusShowText(orderDetail.orderState)}
            </p>
            <p>
              订单编号: {orderDetail.orderSn}
            </p>
            <p>
              下单时间: {Common.formatDate(new Date(orderDetail.createTime))}
            </p>
            <div style={{height:'0.2rem',width:'100%',backgroundColor:'#F3F3F3'}}></div>
            {/*<p>*/}
              {/*订单总额: {`￥${orderDetail.orderTotalPrice}`}*/}
            {/*</p>*/}
            <p>
              商品金额: {`￥${orderDetail.goodsAmount}`}
            </p>
            <p>
              发票信息: {orderDetail.invoice}
            </p>
            {/*<p>*/}
              {/*运费价格: {`￥${orderDetail.shippingFee}`}*/}
            {/*</p>*/}
            {/*<p>*/}
              {/*支付方式: {`￥${orderDetail.paymentName}`}*/}
            {/*</p>*/}
          </div>
          <div style={{backgroundColor:'white'}}>
            <p>
              接收报告人: {orderDetail.address.trueName}
            </p>
            <p>
              地址: {orderDetail.address.areaInfo} {orderDetail.address.address}
            </p>
          </div>
        <div style={{height:'0.2rem',width:'100%',backgroundColor:'#F3F3F3'}}></div>
          <div style={{backgroundColor:'white'}}>

              {
                  orderDetail.orderGoodsList.map(goods => {
                      return <Flex key={goods.specId} onClick={() => {
                          common.gotoGoodsDetail({
                            goodsId:goods.goodsId
                          })
                      }}>
                        <Img src={Common.imgtest + goods.goodsImage}
                             style={{ width: '1.5rem', height: '1.5rem' }} />
                        <div>
                          <p>{goods.goodsName}</p>
                          <p>{goods.packageName}x{goods.goodsNum}</p>
                        </div>
                        <div>
                            报告查询
                        </div>
                      </Flex>
                  })
              }
          </div>
      </div>
    )
  }
}

export default withRouter(OrderDetail);
