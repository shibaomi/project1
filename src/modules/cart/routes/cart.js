import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  Checkbox,
  Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import CartShop from '../components/CartShop';
import * as goodsApi from 'common/api/goods';
import * as cartApi from '../api/cart';
import * as storeApi from '../api/store';
import { common } from 'common';
import CouponList from 'commonComponent/CouponList';

const AgreeItem = Checkbox.AgreeItem;

import './cart.less';
let self;
let goods = [], prices = [];
class Cart extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    clearAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    self = this;
    this.state = {
      relGoodsRecommedlist: [],
      cartList: [],
      isInit: false,
      checkAll: false,
      goodsNum: [],
      goodsTotalPrice: [],
      editStatus: 0,
      checkStoreId:''
    }
  }

  onChangeEditStatus = (status) => {
    this.setState({
      editStatus: status
    })
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  componentDidMount() {
    Toast.loading();
    cartApi.cartList().then(result => {
      Toast.hide();
      //debugger
      if (result.result == 1) {
        this.setState({
          isInit: true,
          cartList: result.data || [],//将购物车信息全部赋值给了cartList
          goodsNum:[{num:0,storeId:''}],
          goodsTotalPrice:[{num:0,storeId:''}],
        })
      }
    })

    goodsApi.relGoodsRecommedlist().then(result => {//推荐暂时不需要
      //debugger
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data;
      this.setState({
        relGoodsRecommedlist: data
      });
    });
  }

  refreshCartList = () => {//列表刷新
    cartApi.cartList().then(result => {
      //debugger
      if (result.result == 1) {
        const cartList = result.data || [];
        this.setState({
          cartList,
          editStatus: 0
        })
        this.refreshTotalPriceAndCount(cartList);
      }
    })
  }

  gotoLogin = () => {
    common.gotoLoginAndBack();
  }

  updateCart = (store, checkedGoods, num) => {
    cartApi.updateCartCount({
      packageId: checkedGoods.packageId,
      count: num
    }).then(result => {
      if (result.result == 1) {
        // 修改商品数量
        checkedGoods.goodsNum = num;
        // 选中商品
        this.checkGoods(store, checkedGoods, true);
      }
    });
  }

  updateReport = (store, checkedGoods, num) => {
    cartApi.updateReportCount({
      packageId: checkedGoods.packageId,
      reportCount: num
    }).then(result => {
      if (result.result == 1) { //更新报告接口成功处理算价钱
        // 修改商品数量
        checkedGoods.report = num;
        // 选中商品
        this.checkGoods(store, checkedGoods, true);
      }
    });
  }

  delCart = (goods) => {
    cartApi.deleteCart({ cartId: goods.cartId }).then(result => {
      if (result.result == 1) {
        this.refreshCartList();
      }
    })
  }

  delShopCart = (shop) => {
    cartApi.deleteCart({ cartId: shop.cartIds }).then(result => {
      if (result.result == 1) {
        this.refreshCartList();
      }
    })
  }

  delBySelected = () => {
    let cartId = [];
    this.state.cartList.forEach(shop => {
      shop.list.forEach(goods => {
          if (goods.checked) {
            cartId.push(goods.cartId);
          }
      })
    })
    if (cartId.length == 0) {
      Toast.info('请先选择商品', 1)
      return;
    }
    cartApi.deleteCart({ cartId: cartId.join(',') }).then(result => {
      if (result.result == 1) {
        // this.setState({
        //   editStatus: 0
        // });
        Toast.info('删除成功', 1, () => {
          this.refreshCartList();
        })
      }
    })
  }

  // 选择购物车
  checkGoods = (checkedStore, checkedGoods, checked) => {
    // 遍历当前店铺的所有商品
    const mapedList = checkedStore.list.map(goods => {
      if (checkedGoods.specId == goods.specId) {
        goods.checked = checked;
      }
      return goods
    })

    let isAllGoodsChecked = true;
    // 当前店铺商品 checked 不存在false,
    if (mapedList.find(item => !item.checked)) {
      isAllGoodsChecked = false;
    }

    const cartList = this.state.cartList.map(shop => {
      if (checkedStore.storeId == shop.storeId) {
        self.state.checkStoreId = shop.storeId;
        shop.list = mapedList;
        shop.checked = isAllGoodsChecked;
      }
      return shop;
    })

    let isCheckAll = true;
    if (cartList.find(shop => !shop.checked)) {
      isCheckAll = false;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  // 选中店
  checkShop = (store, checked) => {
    const cartList = this.state.cartList.map(shop => {
      if (store.storeId == shop.storeId) {
        self.state.checkStoreId = shop.storeId;
        shop.checked = checked;
        const mapedList = shop.list.map(goods => {
          goods.checked = checked;
          return goods;
        })
        shop.list = mapedList;
      }
      return shop;
    })
    let isCheckAll = false;
    const checkedShopCount = cartList.filter(item => item.checked).length;
    if (checkedShopCount == cartList.length) {
      isCheckAll = true;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  checkAll = (checked) => {
    const cartList = this.state.cartList.map(shop => {
      shop.checked = checked;
      const mapedList = shop.list.map(goods => {
        goods.checked = checked;
        return goods;
      })
      shop.list = mapedList;
      return shop;
    })
    this.setState({
      checkAll: checked,
      cartList: cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  // 刷新数量和金额
  refreshTotalPriceAndCount = (cartList) => {
    let totalPrice = 0;
    let goodsNum = 0;
    cartList.forEach(shop => {
          //if (store.storeId == shop.storeId) {
            if (self.state.checkStoreId == shop.storeId) {
            shop.list.forEach(goods => {
              if (goods.checked) {
                goodsNum += goods.goodsNum
                totalPrice = parseFloat(totalPrice) + parseFloat(goods.goodsPrice * goods.goodsNum)
              }
            })
          }
        }
    );
    totalPrice = totalPrice.toFixed(2)

    let good = {}, price = {}, flagPrice = 0, flagGood = 0;
    good.num = goodsNum;
    good.storeId = this.state.checkStoreId;
    price.num = totalPrice;
    price.storeId = this.state.checkStoreId;
    //goods.push(good);
    //prices.push(price);
    if(prices.length == 0){
      prices.push(price);
    }else{
      prices.map( pricedata => {
        if(pricedata.storeId == price.storeId){
          pricedata.storeId = price.storeId;
          pricedata.num = price.num;
        }else{
          flagPrice = 1;
        }
      });
      if(flagPrice == 1){
        prices.push(price);
      }
    }
    if(goods.length == 0){
      goods.push(good);
    }else{
      goods.map( gooddata => {
        if(gooddata.storeId == good.storeId){
          gooddata.storeId = good.storeId;
          gooddata.num = good.num;
        }else{
          flagGood = 1;
        }
      });
      if(flagGood == 1){
        goods.push(good);
      }
    }

    this.setState({
      goodsNum:goods,
      goodsTotalPrice: prices,
    })
  }

  // 领券  
  getCoupon = (store) => {
    storeApi.couponlist({
      storeId: store.storeId
    }).then(result => {
      const data = result.data;
      if (data && data.length > 0) {
        const onMaskClose = () => {
          console.log('关闭遮罩');
        }
        Popup.show(<CouponList
          storeId={store.storeId}
          couponList={data}
          onClose={() => Popup.hide()} />, { animationType: 'slide-up', onMaskClose });
      } else {
        Toast.info('暂无优惠券可领券', 1)
      }
    })

  }

  render() {
    const isLogin = common.isLogin();
    const { cartList, isInit, editStatus } = this.state;
    if (!isInit) {
      return null;
    }
    return <div className='wx-cart-list'>
      <div className='fix-scroll hastitle' style={{paddingBottom:'1.8rem'}}>
        {
          !isLogin && <WingBlank>
            <Button inline size="small" onClick={this.gotoLogin} style={{marginTop:'20px'}}>登录</Button>
          </WingBlank>
        }
        {
          cartList && cartList.map((shop,index) => {
            return <div>
            <CartShop
              key={index}  
              data={shop}
              goodsNum = {this.state.goodsNum}
              goodsTotalPrice = {this.state.goodsTotalPrice}
              delShopCart={this.delShopCart}
              delCart={this.delCart}
              updateCart={this.updateCart}
              checkShop={this.checkShop}
              checkGoods={this.checkGoods}
              getCoupon={this.getCoupon}
              updateReport = {this.updateReport}
            >
            </CartShop>
              <div style={{width:'100%',height:'0.2rem',backgroundColor:'#F3F3F3'}}></div>
            </div>
          })
        }
        {
          cartList.length == 0 && 
            <div style={{ padding:'20px 20px' }}>
              <img src={`./assets/img/b_3.png`}></img>
              <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
            </div>
        }
      
        {/*<div>*/}
          {/*<RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>*/}
        {/*</div>*/}
      </div>  
      
      {/*<div className='wx-cart-list-bar'>*/}
        {/*<Flex>*/}
          {/*<Flex.Item>*/}
            {/*<AgreeItem checked={this.state.checkAll}*/}
              {/*onChange={(e)=>this.checkAll(e.target.checked)}*/}
              {/*>全选</AgreeItem>*/}
          {/*</Flex.Item>*/}
          {/*{*/}
            {/*editStatus == 0 ? [*/}
              {/*<Flex.Item key={1}>*/}
                {/*<span style={{minWidth:'100px'}}>合计: ¥{this.state.goodsTotalPrice[0].num}</span><br/>*/}
                {/*<span>共{this.state.goodsNum[0].num}件</span>*/}
              {/*</Flex.Item>,*/}
              {/*<Flex.Item key={2} style={{*/}
                {/*textAlign: 'right',*/}
                {/*margin: '0.1rem',*/}
              {/*}}>*/}
                {/*<Button type='primary' size='small' inline onClick={this.gotoBuy}>去结算</Button>*/}
              {/*</Flex.Item>    */}
             {/*] : [*/}
              {/*<Flex.Item key={1}>*/}
                {/*<Button size='small' inline onClick={this.delBySelected}>删除</Button>    */}
              {/*</Flex.Item>,*/}
              {/*<Flex.Item key={2}>&nbsp;</Flex.Item>  */}
             {/*]*/}
          {/*}*/}
          {/**/}
        {/*</Flex>*/}
      {/*</div>*/}
    </div>

  }
}

export default withRouter(Cart);
