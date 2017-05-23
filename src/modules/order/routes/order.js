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
    Checkbox,
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
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

import './order.less';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectCarts:[],
      selectedAddress:'',
      invoiceContentStr:'',
      selectPayTypeClick:1,
      nextStep:true,
      packageIds:[],
      cartIds:[]
    };
  }

  submitOrder = () => {
    let orderInfo={};
    // 提交订单
    if(!this.state.selectedAddress||this.state.selectedAddress==''){
      Toast.fail('请先选择收货地址');
      return;
    }
    orderInfo.invoiceId=localStorage.getItem("invId");
    orderInfo.addressId=this.state.selectedAddress.addressId;
    orderInfo.paytype=this.state.selectPayTypeClick;
    orderInfo.cartIds=this.state.cartIds;
    orderInfo.packageIds=this.state.packageIds;
    console.log(JSON.stringify(orderInfo));
  }

  onSelectPayTypeClick = (type) => {
    this.setState({
      selectPayTypeClick:type
    });
  }

  onClickSelectedAddress = () => {
    this.props.router.push('/address');
  }

  onClickAddInvoice = () => {
    this.props.router.push('/invoice');
  }

  componentDidMount() {
    this.setState({
      selectCarts:JSON.parse(localStorage.getItem("selectCarts"))
    });
    if(localStorage.getItem("invoiceContentStr")){
      this.setState({
        invoiceContentStr:localStorage.getItem("invoiceContentStr")
      });
    }else{
      this.setState({
        invoiceContentStr:'不开发票'
      });
    }
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

  renderHeader = () => {
    let storeName='';
    if(this.state.selectCarts&&this.state.selectCarts.length>0){
      storeName=this.state.selectCarts[0].storeName;
    }
    return <Flex>
      <Img src='../../../assets/img/store.png' style={{ height: '0.5rem', width: '0.5rem' }} />{storeName}
    </Flex>
  }

  agrreProtocol=(e)=>{
    if(e.target.checked){
      this.setState({
        nextStep:false
      })
      this.setState({
        cartIds:[],
        packageIds:[]
      })
    }else{
      this.setState({
        nextStep:true
      })
    }
  }

  render() {
    let totalPrice=0;
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
        <List renderHeader={this.renderHeader}>
        {
          this.state.selectCarts&&this.state.selectCarts.map((goods,index) => {
            totalPrice=Number(totalPrice)+(goods.goodsPrice*goods.goodsNum)+(goods.report*goods.reportPrice);
            this.state.packageIds.push(goods.packageId);
            this.state.cartIds.push(goods.cartId);
            return <Item key={index}>
              <Flex style = {{paddingLeft:'0.2rem'}}>
                <Img src={common.imgtest + goods.goodsImages} style={{ height: '1.5rem', width: '1.5rem', marginLeft:'0.1rem' }} />
                <Flex.Item>
                  <div className='text-overflow-hidden' >{goods.goodsName}</div>
                  <Flex justify='between'>
                    <div style={{width: '65%',paddingBottom:'0.1rem'}}>{goods.packageName}</div>
                    <div style={{width: '10%'}}>{`x${goods.goodsNum}`}</div>
                    <div style={{width: '30%', color:'red',paddingTop:'0.1rem',paddingLeft:'0.1rem'}}>{`￥${goods.goodsPrice}`}</div>
                  </Flex>
                  <Flex justify='between'>
                    <div style={{width: '65%'}}>纸质报告正副本</div>
                    <div style={{width: '10%'}}>{`x${goods.report}`}</div>
                    <div style={{width: '30%', color:'red',paddingLeft:'0.1rem'}}>{`￥${goods.reportPrice}`}</div>
                  </Flex>
                </Flex.Item>
              </Flex>
            </Item>
          })
        }
        </List>
        <List>
          <Item
              arrow="horizontal"
              onClick={this.onClickAddInvoice}
              extra={this.state.invoiceContentStr}
          >
            发票信息
          </Item>
          <Item>
            <Flex>
              <Flex.Item>
                <Flex justify='between'>
                  <div style={{width: '60%'}}>总价</div>
                  <div style={{width: '30%', color:'red',textAlign:'right'}}>{`￥${totalPrice}`}</div>
                </Flex>
              </Flex.Item>
            </Flex>
          </Item>
          <Item>
            <CheckboxItem style={{borderBottom:'1PX solid #ddd'}} checked={this.state.selectPayTypeClick==1}  onChange={() => this.onSelectPayTypeClick(1)}>微信支付</CheckboxItem>
            <CheckboxItem style={{borderBottom:'1PX solid #ddd'}} checked={this.state.selectPayTypeClick==2}  onChange={() => this.onSelectPayTypeClick(3)}>线下定期结算</CheckboxItem>
            <CheckboxItem style={{borderBottom:'1PX solid #ddd'}} checked={this.state.selectPayTypeClick==3}  onChange={() => this.onSelectPayTypeClick(2)}>线下结算</CheckboxItem>
          </Item>
          <Flex>
            <Flex.Item>
              <AgreeItem data-seed="logId" onChange={(e) => this.agrreProtocol(e)}>
                我已阅读并同意<a onClick={(e) => { e.preventDefault(); }}>《服务声明》</a>
              </AgreeItem>
            </Flex.Item>
          </Flex>
          <div className='wx-invoicelist-bar'>
            <Button className = 'btn' type='primary' disabled={this.state.nextStep} onClick={this.submitOrder}>下一步</Button>
          </div>
        </List>
      </div>
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(Order));
