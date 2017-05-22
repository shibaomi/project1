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
const CheckboxItem = Checkbox.CheckboxItem;
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

  }
  onChange = (addressId) => {
    addressApi.updateAddressDef(addressId).then(result => {
      if (result.result == 1) {
        this.initAddressList();
        Toast.success(result.msg);
      }
    })
  }
  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist fix-scroll hastitle'>
      <div style={{marginBottom:'0.84rem'}}>
          {
            addressList&&addressList.map(address => {
                  return <List key={address.addressId}>
                    <Item multipleLine style = {{padding:'0.2rem 0.3rem 0rem 0.3rem', border:'none'}}>
                      <Flex>
                        <div>
                          <Checkbox checked={address.isDefault==1} key={address.memberId} onChange={() => this.onChange(address.addressId)}>
                          </Checkbox>
                        </div>
                        <Flex.Item>


                          <div style = {{position:'relative'}}>
                            <div style = {{width:'4.3rem', position:'relative',height:'0.5rem'}}>
                                <div style = {{width:'1rem', position:'absolute',left:'0rem',}}>{address.trueName}</div>
                                <div style = {{width:'2rem', position:'absolute',left:'1rem',}}>{common.phoneDesensitization(address.mobPhone)}</div>
                                <div style = {{width:'1rem', position:'absolute',left:'3rem',}}>
                                  { address.isDefault==1 ?  <div style={{backgroundColor:'#1786CD',color: '#fff', textAlign:'center' }}>默认</div> : <label ></label> }
                                </div>
                            </div>

                            <Item wrap>
                              {address.areaInfo} {address.address}
                            </Item>
                          </div>


                        </Flex.Item>
                      </Flex>

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

                  </List>
              })
          }
      </div>

      <div className='wx-addresslist-bar'>
        <Button className = 'btn' type='primary' onClick={this.gotoAdd}>新增地址</Button>
      </div>
    </div>
  }
}

export default withRouter(Address);
