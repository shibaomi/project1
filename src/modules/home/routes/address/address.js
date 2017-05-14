import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
    WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as addressApi from '../../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  initAddressList = () => {
    addressApi.addressList().then(result => {
      if (result.result == 1) {
        this.setState({
          addressList: result.data
        })
      }
    })
  }

  componentDidMount() {
    this.initAddressList();
  }

  gotoAdd = () => {
    this.props.router.push('/addressAdd')
  }

  gotoEdit = (address) => {
    this.props.router.push({
      pathname: '/addressEdit',
      state: address
    });
  }

  gotoDel = (address) => {
    Modal.alert('删除', '确定删除地址么???', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          addressApi.delAddress(address.addressId).then(result => {
            if (result.result == 1) {
              this.setState({})
            }
            Toast.info(result.msg);
            this.initAddressList();
          })
        },
        style: { fontWeight: 'bold' }
      },
    ])
  }

  setDefault = (address) => {
    addressApi.updateAddressDef(address.addressId).then(result => {
      if (result.result == 1) {
        this.initAddressList();
      }
    })
  }

  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist fix-scroll hastitle'>
      <div style={{marginBottom:'0.84rem'}}>
          {
              addressList.map(address => {
                  return <List key={address.addressId}>
                    <Item multipleLine>
                        {address.trueName} &nbsp;&nbsp; {address.mobPhone}
                        { address.isDefault==1 ?  <label style={{backgroundColor:'#1786CD',marginLeft:'0.3rem',color: '#fff' }}>&nbsp;&nbsp;默认&nbsp;&nbsp;</label> : <label ></label> }
                        <Brief>{address.areaInfo} {address.address}</Brief>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item style={{textAlign:'right'}}>
                          <span size='small' onClick={()=>this.gotoEdit(address)} inline style={{marginRight:'0.4rem'}}>
                            <img src="../../../assets/img/edit.png" style={{height:'0.5rem',paddingBottom:'0.1rem',marginRight:'0.1rem' }}/>
                            编辑</span>&nbsp;
                          <span size='small' onClick={()=>this.gotoDel(address)} inline>
                            <img src="../../../assets/img/delete.png" style={{height:'0.5rem',paddingBottom:'0.1rem',marginRight:'0.1rem' }}/>
                            删除</span>
                        </Flex.Item>
                      </Flex>
                    </Item>
                    <WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>
                  </List>
              })
          }
      </div>

      <div className='wx-addresslist-bar'>
        <Button type='primary' onClick={this.gotoAdd}>新增地址</Button>
      </div>
    </div>
  }
}

export default withRouter(Address);
