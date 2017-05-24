import React, { Component } from 'react'
import {
  List,
  Tabs,
  WingBlank,
  Flex,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;
import * as Common from '../../../common/common';
const gotoStore = (goodsDetailInfo) => {
  common.gotoStore({ storeId: goodsDetailInfo.storeId });
}

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ goodsDetailInfo }) {
  const { evaluateStore, storeId } = goodsDetailInfo;
  return <WingBlank>
    <Flex style = {{padding:'0.2rem 0rem'}}>
      <Flex.Item style={{ flex: 1 }}>
        <Img src={Common.imgtest + goodsDetailInfo.storeLabel} style={{width:'100%'}}></Img>
      </Flex.Item>
      <Flex.Item style={{ flex: 2 }}>
        <Flex>
          <Flex.Item style={{ flex: 2 }}><div><span style={{color:'#333'}}>{goodsDetailInfo.storeName}</span><br/><font color='gray'>正品行货,欢迎选购</font></div></Flex.Item>
          {/*<Flex.Item style={{ flex: 1 }}><div style={{ color: 'red', textAlign: 'right' }}>{evaluateStore.averageCredit}</div></Flex.Item>*/}
        </Flex>  
      </Flex.Item>
    </Flex>
    <WhiteSpace></WhiteSpace>  
    <Flex>
      <Flex.Item>
          <Flex direction='column'>
          {/*<Flex.Item>商品{evaluateStore.sevalDesccredit}</Flex.Item>*/}
          <Flex.Item style = {{height:'0.3rem'}}><span style={{color:'red'}}>{goodsDetailInfo.evaluateNum}</span></Flex.Item>
            <Flex.Item><span style={{color:'#999'}}>关注人数</span></Flex.Item>
          </Flex>
      </Flex.Item>
        <Flex.Item>
          <Flex direction='column'>
            {/*<Flex.Item>服务{evaluateStore.sevalServicecredit}</Flex.Item>*/}
            <Flex.Item style = {{height:'0.3rem'}}><span style={{color:'red'}}>{goodsDetailInfo.storeGoodsNum}</span></Flex.Item>
            <Flex.Item><span style={{color:'#999'}}>全部商品</span></Flex.Item>
          </Flex>
        </Flex.Item>
        {/*<Flex.Item>*/}
          {/*<Flex direction='column'>*/}
            {/*/!*<Flex.Item>物流{evaluateStore.sevalDeliverycredit}</Flex.Item>*!/*/}
            {/*<Flex.Item>149</Flex.Item>*/}
            {/*<Flex.Item>店铺动态</Flex.Item>*/}
          {/*</Flex>*/}
      {/*</Flex.Item>  */}
      </Flex>
    <WhiteSpace></WhiteSpace>  
    {
      storeId != "0" && <Flex>
        <Flex.Item style = {{textAlign:'center'}}>
          <Button type="ghost" inline size="small" style={{ margin: '0.08rem',color:'#BCBCBC',borderColor:'#BCBCBC',width:'2.5rem' }}>收藏店铺</Button>
        </Flex.Item>
        <Flex.Item style = {{textAlign:'center'}}>
          <Button type="ghost" onClick={() => gotoStore(goodsDetailInfo)} inline size="small" style={{ margin: '0.08rem',color:'#BCBCBC',borderColor:'#BCBCBC',width:'2.5rem' }}>进入店铺</Button>
        </Flex.Item>
      </Flex>
    }  
  </WingBlank>
}
