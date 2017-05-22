import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Button,
    List,
    Switch,
    Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import Shop from '../components/Shop';
import Fee from '../components/Fee';
import OrderBar from '../components/OrderBar';
import * as addressApi from '../api/address';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import './order.less';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectCarts:[],
      selectedAddress:''
    };
  }

  submitOrder = () => {
    // 提交订单
    const {
        selectedAddress,
        paytype,
        isPd,
        freight,
        couponId,
        invoice,
        priceData,
        cartId
    } = this.props.order;
    orderApi.saveorder({
      cartIds: cartId,
      addressId: selectedAddress.addressId,
      paytype,
      freight,
      couponId,
      invoiceId: invoice ? invoice.id : null,
      isPd,
      activityIds: null
    }).then(result => {
      if (result.result == 1) {
        // 货到付款，成功后跳转到货到付款提示页面
        if (paytype == 2) {
          Toast.success(result.msg, 1, () => {
            window.location.href = 'home.html#/orderList/0';
          });
        } else {
          // 余额数大于 订单支付额
          // console.log(priceData);
          if (parseFloat(priceData.totalPrice) == 0) {
            console.log('支付成功，跳转到成功页面');
            this.props.router.replace('/paySuccess/' + result.data[0].paySn);
          } else {
            // 跳转到收银台
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+result.data[0].paySn+'/'+priceData.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
            this.props.router.replace(`/cashier/${result.data[0].paySn}/${priceData.totalPrice}`);
          }
        }
      } else {
        Toast.fail(result.msg);
      }
    });
  }

  onSubmitOrder = () => {

    // 提交订单
    const {
        selectedAddress,
        paytype,
        isPd,
        freight,
        couponId,
        invoiceId,
        priceData,
    } = this.props.order;
    // 验证数据
    if (!selectedAddress) {
      Modal.fail('请先选择收货地址');
      return;
    }

    // 如果使用余额支付，弹出密码输入框，，否则跳到
    if (isPd == 1 && paytype == 1) {
      prompt(
          '请输入支付密码',
          '', [{ text: '取消' }, {
            text: '提交',
            onPress: passwd => {
              orderApi.chkPasswd({ passwd }).then(result => {
                if (result.result == 1) {
                  // 密码正确，继续提交订单
                  this.submitOrder();
                } else {
                  Toast.fail(result.msg);
                }
              })
            }
          }],
          'secure-text',
      )

    } else {
      // 在线支持 提交订单
      this.submitOrder();
    }
  }

  // 选择支付方式
  selectPayType = (type) => {
    this.props.dispatch({
      type: 'selectPayType',
      payload: type
    });
    Popup.hide();
  }

  onSelectPayTypeClick = () => {
    Popup.show(<div>
      <List renderHeader={() => '选择支付方式'}>
        <Item><Button type='primary' onClick={() => this.selectPayType(1)}>在线支付</Button></Item>
        <Item><Button type='primary' onClick={() => this.selectPayType(2)}>货到付款</Button></Item>
        <Item><Button type='ghost' onClick={()=>Popup.hide()}>取消</Button></Item>
      </List>
    </div>, { animationType: 'slide-up' })
  }

  onClickSelectedAddress = () => {
    this.props.router.push('/address');
  }


  onClickInvoice = (invoiceShow) => {
    console.log(invoiceShow)
    let invContent=1
    if(invoiceShow!='不开发票'){
      invContent=2
    }else{
      invContent=1
    }
//  this.props.router.push('/invoice/${invoiceShow,invContent}');
    this.props.router.push(`/invoice/${invoiceShow}/${invContent}`);
  }

  componentDidMount() {
    this.setState({
      selectCarts:JSON.parse(localStorage.getItem("selectCarts"))
    });
    this.initAddressList();
  }

  initAddressList = () => {
    addressApi.addressList().then(result => {
      if (result.result == 1) {
        result.data&&result.data.map((addr,index) => {
          if(addr.isDefault==1){
            this.setState({
              selectedAddress : addr
            });
          }
        })
      }
    })
  }

  render() {
    return <div className='wx-order'>
      <div className='fix-scroll hastitle' style={{paddingBottom:'1.1rem'}}>
        <List >
          <Item onClick={this.onClickSelectedAddress} multipleLine arrow="horizontal"
                style = {{padding:'0.2rem 0.3rem 0rem 0.3rem', border:'none'}}>
            {
            this.state.selectedAddress&&
            <Flex>
              <div>
                <div style={{ backgroundImage: 'url(../../../assets/img/dingwei.png)', backgroundSize: 'cover', height: '0.4rem', width: '0.35rem' }}/>
              </div>
              <Flex.Item>
                <div style = {{position:'relative'}}>
                  <div style = {{width:'4.3rem', position:'relative',height:'0.5rem'}}>
                    <div style = {{width:'1rem', position:'absolute',left:'0rem',}}>报告接收人</div>
                    <div style = {{width:'2rem', position:'absolute',left:'1.5rem',}}>{this.state.selectedAddress.trueName}</div>
                    <div style = {{width:'1rem', position:'absolute',left:'2.5rem',}}>
                      {common.phoneDesensitization(this.state.selectedAddress.mobPhone)}
                    </div>
                  </div>
                  <div style = {{width:'4.3rem', position:'relative',height:'0.5rem'}}>
                    <div style = {{width:'1rem', position:'absolute',left:'0rem',}}>{this.state.selectedAddress.areaInfo} {this.state.selectedAddress.address}</div>
                  </div>
                </div>
              </Flex.Item>
            </Flex>
            }
            {
              this.state.selectedAddress.length == 0 &&
              <div style={{ padding:'20px 20px' }}>
                <span style={{fontSize: '28px',color:'gray'}}>还没添加地址，去添加地址</span>
              </div>
            }
          </Item>
        </List>
        {
          this.state.selectCarts&&this.state.selectCarts.map((goods,index) => {
            return <Item key={index}>
              <Flex style = {{paddingLeft:'0.2rem'}}>
                <Img src={common.imgtest + goods.goodsImages} style={{ height: '1.5rem', width: '1.5rem', marginLeft:'0.1rem' }} />
                <Flex.Item>
                  <div className='text-overflow-hidden' >{goods.goodsName}</div>
                  <Flex justify='between'>
                    <div style={{width: '45%',paddingBottom:'0.1rem'}}>{goods.packageName}</div>
                    <div >{`x${goods.goodsNum}`}</div>
                    <div style={{ color:'red',paddingTop:'0.1rem'}}>{`￥${goods.goodsPrice}`}</div>
                  </Flex>
                  <Flex justify='between'>
                    <div >纸质报告正副本</div>
                    <div >{`x${goods.report}`}</div>
                    <div style={{ color:'red'}}>{`￥${goods.reportPrice}`}</div>
                  </Flex>
                </Flex.Item>
              </Flex>
            </Item>
          })
        }
        }
        <List>
          <Item
              onClick={this.onSelectPayTypeClick}
              arrow="horizontal"
              extra={1==1?'在线支付':'货到付款'}
          >
            支付方式
          </Item>
          <Item
              extra={<div><Switch checked={1 == 1} /></div>}
          >余额支付</Item>
          <Item

          >&nbsp;</Item>
          <Item
              arrow="horizontal"
          >
            发票信息
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Flex>
          <Flex.Item style={{flex:2.5,borderRight: '1px solid #ddd'}}>
            <List className="extrared">
              <Item >商品总价</Item>
              <Item >运费</Item>
              <Item >余额支付</Item>
              <Item >抵用券</Item>
              <Item>优惠促销</Item>
            </List>
          </Flex.Item>
          <Flex.Item style={{ flex: 1,background:'#fff'}}>
            <div>
              <div style={{height:'1.5rem',textAlign:'center',lineHeight:'2.5rem'}}>共需支付</div>
              <div style={{color:'red',height:'1.5rem',textAlign:'center',lineHeight:'0.5rem'}}></div>
            </div>
          </Flex.Item>
        </Flex>
      </div>
      <OrderBar ></OrderBar>
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(Order));
