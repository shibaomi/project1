import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid,
  SearchBar,
  Icon,
  Tabs
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as storeApi from '../../api/store';
import GoodsList from '../goodsSearch';
import * as Common from '../../../../common/common';
import './store.less';

const Item = List.Item;
const TabPane = Tabs.TabPane;
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      store: null,
    }
  }

  componentDidMount() {
    storeApi.storedetail({
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data.goodsList,
          store: data
        })
      }
    });

    // if (common.isLogin()) {
    //   storeApi.storeBrowseSaveOrUpdate({
    //     storeId: this.props.params.storeId
    //   });
    // }
  }

  onClick = (dataItem) => {
    common.gotoGoodsDetail({ goodsId: dataItem.goodsId })
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ padding: '0.1rem' }} >
      <div>
        <Flex.Item style={{textAlign:'center'}}>
          <Img src={dataItem.goodsImage} style={{ width: '3rem',height:'3rem' }} />
        </Flex.Item>
      </div>
      <div>
        <Flex.Item>
          <div style={{
              fontSize: '.24rem',
              height: '0.8rem',
              lineHeight: '0.4rem',
              overflow:'hidden'
          }}>{dataItem.goodsName}</div>
        </Flex.Item>
      </div>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  storecollection = () => {
    common.checkLogin();
    storeApi.storecollection({
      storeId: this.props.params.storeId,
      favType: 2,
      goodsId: null
    }).then(result => {
      if (result.result == 1) {
        Toast.info(result.msg);
        const store = {
          ...this.state.store,
          isFav: result.isfav
        };
        // console.log(store);
        storeApi.storedetail({
		      storeId: this.props.params.storeId
		    }).then(result => {
		      if (result.result == 1) {
		        const data = result.data;
		        this.setState({
		          goodsList: data.goodsList,
		          store: data.store[0]
		        })
		      }
		    });
//      this.setState({
//        store
//      })
      }

    });
  }

  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }
    const { params, router } = this.props;
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat center center`;
    return <div className='wx-store'>
      <Tabs animated={false} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47">
        <TabPane tab="店铺首页" key="1" className = 'storeindex'>
          <div style={{width:'100%',height:'2rem',backgroundImage:'url(' + Common.imgtest + store.storeBanner+')',backgroundSize:'100%',backgroundRepeat:'no-repeat'}}></div>
            <GoodsList goodsType = 'commentList' store = {this.state.store}></GoodsList>
        </TabPane>
        <TabPane className = 'all' tab="全部商品" key="2" style={{overflowX:'hidden',marginBottom:'0.6rem'}}>
          <GoodsList goodsType = 'storeList' store = {this.state.store}></GoodsList>
        </TabPane>
        <TabPane tab="机构介绍" key="3">
          <div dangerouslySetInnerHTML={{ __html: store.description }}>

          </div>
        </TabPane>
      </Tabs>





      {/*<Flex className='wx-store-search'>*/}
        {/*<Icon type='left' onClick={()=>this.props.router.goBack()}/>*/}
        {/*<Flex.Item>*/}
          {/*<SearchBar placeholder="商品名称" onSubmit={value => {*/}
            {/*this.props.router.push(`/store/${this.props.params.storeId}/goods/${value}`)*/}
          {/*}}*/}
          {/*/>*/}
        {/*</Flex.Item>  */}
      {/*</Flex>*/}
      {/*<div className='fix-scroll hastitle hasbottom' style={{overflowX:'hidden'}}>*/}
        {/*<div className='wx-store-header' style={{ background: storeBannerShow }}>*/}
          {/*<WingBlank size='sm'>  */}
            {/*<Flex className='wx-store-header-body'>*/}
              {/*<Img src={store.storeLogo} style={{*/}
                {/*width: '2rem',*/}
                {/*height: '1rem'*/}
              {/*}} />*/}
              {/*<Flex.Item>*/}
                {/*<div>{store.storeName}</div>*/}
                {/*<div>{store.storeCollect}人关注</div>*/}
              {/*</Flex.Item>*/}
              {/*<Flex.Item>*/}
              {/*</Flex.Item>*/}
              {/*<Button className='rightBtn' type='primary' size='small' onClick={this.storecollection}>*/}
                {/*{*/}
                  {/*store.isFav==1?'已关注':'关注'*/}
                {/*}*/}
              {/*</Button>*/}
            {/*</Flex>*/}
          {/*</WingBlank>*/}
        {/*</div>*/}
        {/*<WhiteSpace></WhiteSpace>*/}
        {/*<Flex style={{textAlign: 'center'}}>*/}
          {/*<Flex.Item onClick={()=>*/}
            {/*router.push(`/store/${params.storeId}/goods`)*/}
          {/*}>*/}
            {/*<div>全部</div>*/}
            {/*<div>{store.storeGoodsCount}</div>*/}
          {/*</Flex.Item>*/}
          {/*<Flex.Item onClick={()=>*/}
            {/*router.push(`/store/${params.storeId}/newgoods`)*/}
          {/*}>*/}
            {/*<div>上新</div>*/}
            {/*<div>{store.newGoodsNum}</div>*/}
          {/*</Flex.Item>*/}
          {/*<Flex.Item onClick={()=>*/}
            {/*router.push(`/store/${params.storeId}/coupon`)*/}
          {/*}>*/}
            {/*<div>优惠券</div>*/}
            {/*<div>{store.couponNum}</div>*/}
          {/*</Flex.Item>*/}
          {/*<Flex.Item>*/}
            {/*<div>店铺动态</div>*/}
            {/*<div>0</div>*/}
          {/*</Flex.Item>*/}
        {/*</Flex>*/}
        {/*<WhiteSpace></WhiteSpace>*/}
        {/*<div>*/}
          {/*<Grid data={this.state.goodsList} columnNum={2}*/}
            {/*onClick={(el,index)=>this.onClick(el)}*/}
              {/*renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>*/}
          {/*</Grid>*/}
        {/*</div>*/}
      {/*</div>*/}
      {/*// <div className='wx-store-bar'>*/}
      {/*//   <Flex style={{ width:'100%',textAlign:'center'}} >*/}
      {/*//     <Flex.Item>*/}
      {/*//       <Link to={`/store/${this.props.params.storeId}/detail`}><span style={{color:'#000'}}>店铺详情</span></Link>*/}
      {/*//     </Flex.Item>*/}
      {/*//     <Flex.Item onClick={()=> Toast.info('暂无此功能，等待下次开放哦',1)} >*/}
      {/*//       热门分类*/}
      {/*//     </Flex.Item>*/}
      {/*//     <Flex.Item onClick={()=> Toast.info('暂无此功能，等待下次开放哦',1)}>*/}
      {/*//       联系卖家*/}
          {/*</Flex.Item>*/}
        {/*</Flex>*/}
      {/*</div>*/}
    </div>
  }
}

export default withRouter(Store);
