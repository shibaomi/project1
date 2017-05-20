import React, { Component } from 'react';
import { Flex, List, Grid } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class GoodsList extends Component {

  onClick = (item) => {
    this.props.onGoodsClassClick(item);
  }

  render() {
    const { data } = this.props;
    const { advPosition, classCustomList } = data;

    if (!advPosition) {
      return null;
    }
    return <div>
      {
        advPosition.advList[0] &&  <div>
          <Img src={common.imgtest+advPosition.advList[0].resUrl} style={{width:'100%',height:'2rem'}}
               onClick={()=>window.location.href = advPosition.advList[0].advUrl}></Img>
        </div>
      }

      {
        classCustomList && classCustomList.map(customList => {
          const gridData = customList.classCustomList.map((item) => {
            return {
              icon: `${common.IMAGE_DOMAIN}${item.gcPic}`,
              text: item.gcName,
              ...item
            }
          });
          {/*<List key={customList.gcId} renderHeader={() => customList.gcName}>*/}
            {/*<Grid data={gridData}*/}
                  {/*onClick={this.onClick}*/}
                  {/*columnNum={3} hasLine={true} />*/}
          {/*</List>*/}
          return <div onClick={() =>this.onClick(customList.gcName)} style={{height:'0.6rem',lineHeight:'0.6rem',textAlign:'center',backgroundColor: '#fff'}}>
            {customList.gcName}
          </div>
        })
      }
    </div>
  }
}

export default GoodsList;
