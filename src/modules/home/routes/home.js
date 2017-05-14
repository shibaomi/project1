import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import { queryIndexData } from '../api';
import HomeCarouselBlock from '../components/HomeCarouselBlock'
import HomeFunctionBlock from '../components/HomeFunctionBlock'
import HomePromotionBlock from '../components/HomePromotionBlock'
import HomeFloorGoods from '../components/HomeFloorGoods';
import HomeNewGoodsBlock from '../components/HomeNewGoodsBlock';
import HomeRecommendGoods from 'commonComponent/RecommendGoods';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorList: [],
      relGoodsRecommedlist: [],
      activityBeenList: [], //
      advList: [], // 轮播
      navigationList: [],
        storeList: []
    }
  }


    MyComponent(data) {
        return <div dangerouslySetInnerHTML={{__html: data}} />;
    }
  componentWillMount() {
    Toast.loading();
    queryIndexData().then(result => {
      Toast.hide();
        let data = result.data[0];
        for(let i = 0;i<data.storeList.length;i++){
            data.storeList[i].description = this.MyComponent(data.storeList[i].description);
        }
      this.setState({
        advList: data.advPosition.advList,
        //activityBeenList: data.storeList,
          storeList: data.storeList,
        //relGoodsRecommedlist: data.storeList,
        floorList: data.floorList
      });
    });
  }

  onSearch = () => {
    this.props.router.push('/gotoSearch');
  }
    onLogin = () => {
        this.props.router.push('/login');
    }
  render() {
    const {
      floorList,
      relGoodsRecommedlist,
      activityBeenList,
      advPosition,
        storeList
    } = this.state;
    return (
      <div className='wx-index fix-scroll'>
        <div className='index-search'>
            <Flex>
                <Flex.Item  onClick={this.onSearch}>
                    <SearchBar placeholder="服饰产品" disabled style = {{backgroundColor:'#1786CD'}}></SearchBar>
                </Flex.Item>
                <div className='indexLoginLabel' onClick={this.onLogin}>登录</div>
            </Flex>


        </div>
        <HomeCarouselBlock data={this.state.advList}></HomeCarouselBlock>
        <div style={{height:'0.3rem', width:'100%', backgroundColor:'#F3F3F3'}}></div>
        {
          this.state.floorList && this.state.floorList.map((floor,index)=>{
            return <HomeFloorGoods key={index} data={floor}></HomeFloorGoods>
          })
        }
        {/*{*/}
              {/*this.state.storeList && this.state.storeList.map((store,index)=>{*/}
                 <HomeNewGoodsBlock data={this.state.storeList}></HomeNewGoodsBlock>
              {/*})*/}
          {/*}*/}
        {/*<HomeRecommendGoods data={this.state.relGoodsRecommedlist}></HomeRecommendGoods>*/}
      </div>
    )
  }
}

export default withRouter(Home);
