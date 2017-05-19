import React, { Component } from 'react';
import { Grid, Flex, WhiteSpace, List } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as Common from '../../../common/common';
const IconClass = ({ url }) => {
  return <div style={{
    width: '0.50rem',
    height: '0.50rem',
    background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
    float:'left',
    marginRight:'0.1rem'
  }}
  />
}
let self;
class HomeNewGoodsBlock extends React.PureComponent {

  onClick = (el, index) => {
    // console.log(el);
    common.gotoGoodsDetail({ specId: el.specId });
  }
constructor(props){
  super(props);
  self = this;
}



  // renderItem = (dataItem) => {
  //   return
  //
  // }
  createMarkup(data) {
  return {__html: data};
}

  MyComponent(data) {
  return <div dangerouslySetInnerHTML={self.createMarkup(data)} />;
}
  render() {
    const { data } = this.props;
    {/*let storeList = data.map((store,index)=>{*/}
      {/*return <Flex direction='row' style={{fontSize:'.24rem',borderTop:'1px solid #ddd',borderBottom:'1px solid #ddd',padding:'0.2rem',height:'2rem'}}>*/}
        {/*<div style={{height:'1.6rem',width:'1.6rem'}}>*/}
          {/*<Img src={Common.imgtest + store.storeLogo} style={{width:'1.6rem', height:'1.6rem' }} />*/}
        {/*</div>*/}
        {/*<Flex.Item>*/}
          {/*<List>*/}
            {/*<List.Item style={{fontSize:'.22rem',height:'0.3rem',width:'4rem'}}>{store.storeName}</List.Item>*/}
            {/*<List.Item wrap >*/}
              {/*<p dangerouslySetInnerHTML={{ __html: store.description }}></p>*/}
            {/*</List.Item>*/}
          {/*</List>*/}
        {/*</Flex.Item>*/}
    //
    //   </Flex>
    // });
    return <List renderHeader={() => <div><IconClass url={'./assets/img/floor.png'}></IconClass><div style={{float:'left',marginTop:'0.10rem'}}>发现好店</div></div>}>
      <List.Item>
        {/*<Grid data={data.slice(0,6)} columnNum={3}*/}
        {/*onClick={this.onClick}*/}
          {/*renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>*/}
        {/*</Grid>*/}
        {data.map((store,index)=>{
          return <Flex key = {index} direction='row' style={{fontSize:'.24rem',borderTop:'1px solid #ddd',borderBottom:'1px solid #ddd',padding:'0.2rem',height:'2rem'}}>
            <div style={{height:'1.6rem',width:'1.6rem'}}>
              <Img src={Common.imgtest + store.storeLogo} style={{width:'1.6rem', height:'1.6rem' }} />
            </div>
            <Flex.Item>
              <List>
                <List.Item style={{fontSize:'.22rem',height:'0.3rem',width:'4rem'}}>{store.storeName}</List.Item>
                {/*<List.Item wrap >*/}
                  {/*<p dangerouslySetInnerHTML={{ __html: store.description }}></p>*/}
                {/*</List.Item>*/}
              </List>
            </Flex.Item>

          </Flex>
        })}
      </List.Item>
    </List>
  }
}

export default HomeNewGoodsBlock;
