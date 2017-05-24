import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as Common from '../../../common/common';
const onClick = (el) => {
  common.gotoGoodsDetail({ goodsId: el.goodsId });
}

/**图片在上面，文字在下面的布局 */
export function ImgGoodsInfo({ dataItem, columnNum }) {
  const styles = {
    fontSize: '.24rem',
    color: 'gray',
      paddingLeft:'20px',
      paddingRight:'20px',
  }
  return <div onClick={()=>onClick(dataItem)} style={{ margin: '0.16rem',  textAlign: 'center' }}>
  <img src={Common.imgtest + dataItem.goodsImage} style={{ width: '80%', height:'80%' }} alt="icon" />
</div>
}

/**文字在上面，图片在下面的布局 */
export function GoodsImgInfo({ dataItem, columnNum }) {
  const styles = {
    fontSize: '.24rem',
    color: 'gray'
  }
  return <Flex direction='column' style={{textAlign:'center'}} onClick={()=>onClick(dataItem)} >
    <div>
      <Flex.Item>
        <div style={{fontSize:'.24rem'}} className='text-overflow-hidden'> {dataItem.gcName}</div>
      </Flex.Item>
    </div>
    <Flex.Item style={{width:'100%'}}>
      <div style={styles} className='text-overflow-hidden'>{dataItem.goodsName}</div>
    </Flex.Item>
    <Flex.Item>
      <Img src={Common.imgtest + dataItem.goodsImage} style={{width:'100%',height:'100%' }} />
    </Flex.Item>
  </Flex>
}
