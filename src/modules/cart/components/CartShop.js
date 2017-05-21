import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Modal,
  Toast,
  Flex,
  Button,
  Checkbox,
  List,
  Icon,
  Stepper
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as cartApi from '../api/cart';
import { common } from 'common';
import * as Common from '../../../common/common';
import './CartShop.less';
const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;

class CartShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:0,
    }
  }

  // 领券  
  getCoupon = (shop) => {
    this.props.getCoupon(shop);
  }

  // 删除店
  delShopCart = (shop) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delShopCart(shop);
        }
      },
    ]);
  }

  // 删除购物车商品
  delCart = (goods) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delCart(goods);
        }
      },
    ]);
  }

  // 更新购物车数量
  updateCart = (store, goods, num) => {
    this.props.updateCart(store, goods, num);
  }
// 更新报告数量
  updateReport = (store, goods, num) => {
    this.props.updateReport(store, goods, num);
  }
  // 选择购物车
  checkGoods = (store, goods, e) => {
    this.props.checkGoods(store, goods, e.target.checked);
  }
  // 选中店
  checkShop = (store, e) => {
    this.props.checkShop(store, e.target.checked);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({show: this.state.show++});
  // }
  renderHeader = () => {
    const { data } = this.props;
    return <Flex>
      <Img src='../../../assets/img/store.png' style={{ height: '0.5rem', width: '0.5rem' }} />{data.storeName}
      {/*<Icon type='right' />*/}
      {/*<Flex.Item style={{ textAlign: 'right' }}>*/}
        {/*<Button size='small' inline onClick={()=>this.getCoupon(data)}>领券</Button>*/}
        {/*<Button size='small' inline onClick={()=>this.delShopCart(data)}>删除</Button>*/}
      {/*</Flex.Item>*/}
    </Flex>
  }

  renderFooter = () => {
    const { data, goodsNum, goodsTotalPrice } = this.props;
    let price = 0;
    let reportPrice=0;
    goodsTotalPrice.map(pricedata => {
      if(pricedata.storeId == data.storeId){
        price = pricedata.num;
        if(price>0){
          reportPrice=0;
          data.list.map(reportData =>{
            reportPrice+=reportData.reportPrice*reportData.report;
          })
        }
      }
      if(pricedata.storeId == '' || pricedata.storeId == null){
        price = 0;
        reportPrice=0;
      }
    })
    return <Flex>
      <Checkbox checked={data.checked}
                onChange={(e)=>this.checkShop(data,e)}
      >全选</Checkbox>
      <Flex.Item style = {{textAlign:'right',paddingRight:'0.1rem'}}>
      {'总计:¥'+ (Number(price)+Number(reportPrice))+'元'}
      </Flex.Item>
      {/*<Icon type='right' />*/}
      {/*<Flex.Item style={{ textAlign: 'right' }}>*/}
      {/*<Button size='small' inline onClick={()=>this.getCoupon(data)}>领券</Button>*/}
      {/*<Button size='small' inline onClick={()=>this.delShopCart(data)}>删除</Button>*/}
      {/*</Flex.Item>*/}
     <div style = {{height:'100%',backgroundColor:'#e93220', color:'#fff',width:'1.5rem', textAlign:'center'}}>
       去结算
     </div>
    </Flex>
  }

  gotoGoodsDetail = (goods) => {
    common.gotoGoodsDetail({
      goodsId: goods.goodsId
    });
  }

  render() {
    const { data } = this.props;
    const gotoGoodsDetail = this.gotoGoodsDetail;
    return <div id='cartshop'>
    <List renderHeader={this.renderHeader} renderFooter = {this.renderFooter()}>
      {
        data.list.map((goods,index) => {
          return <Item key={index}>
            <Flex style = {{paddingLeft:'0.2rem'}}>
              <Checkbox checked={goods.checked} onChange={e => this.checkGoods(data,goods,e)}></Checkbox>
              <Img src={Common.imgtest + goods.goodsImages} style={{ height: '1.5rem', width: '1.5rem', marginLeft:'0.1rem' }} />
              <Flex.Item>
                <div className='text-overflow-hidden' onClick={()=>gotoGoodsDetail(goods)}>{goods.goodsName}</div>
                <div className='text-overflow-hidden' onClick={()=>gotoGoodsDetail(goods)} style={{ fontSize: '.20rem',color:'#bbb' }}>
                  {goods.packageName}
                </div>
                <Flex justify='between'>
                  <div onClick={()=>gotoGoodsDetail(goods)}>{`￥${goods.goodsPrice}`}</div>
                  <div>
                    <Stepper showNumber min={1} value={goods.goodsNum} onChange={(val)=>this.updateCart(data,goods,val)} useTouch={false}/>
                    {/*<Button style={{float:'right'}} size='small' inline onClick={() => this.delCart(goods)}>删除</Button>*/}
                  </div>
                </Flex>

              </Flex.Item>
            </Flex>
            <Flex style = {{paddingLeft:'0.2rem'}}>
              <Flex.Item>
                <Flex justify='between'>
                  <div>每套报告需要副本数量<span style={{color:'#e93220'}}>¥{goods.reportPrice}</span>份</div>
                  <div>
                    <Stepper showNumber min={0} value={goods.report} onChange={(val)=>this.updateReport(data,goods,val)} useTouch={false}/>
                    {/*<Button style={{float:'right'}} size='small' inline onClick={() => this.delCart(goods)}>删除</Button>*/}
                  </div>
                </Flex>
              </Flex.Item>
            </Flex>
          </Item>
        })
      }  
    </List>
    </div>
  }
}

export default CartShop;
