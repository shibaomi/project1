import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
  InputItem,
  Picker
} from 'antd-mobile';

import * as addressApi from '../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
// 地区数据
const district = addressApi.getAreaData();

class AddressAdd extends Component {
  constructor(props) {
    super(props);
    this.state={sty:false}
  }

  onPickerChange = (value) => {
    console.log(value);
  }
  onBlur=()=>{
    this.setState({
      sty:false
    })
  }
  onFocus=()=>{
    this.setState({
      sty:true
    })
  }

  onSubmit = () => {
    // 提交地址
    const fieldsValue = this.props.form.getFieldsValue()
    // check
    if (!fieldsValue.trueName || fieldsValue.trueName == '') {
      Toast.info('请输入收货人姓名');
      return;
    }
    if (!fieldsValue.mobPhone || fieldsValue.mobPhone.trim() == ''||fieldsValue.mobPhone.replace(/\s/g, "").length<11) {
      Toast.info('请输入11位手机号');
      return;
    }
    
    if (!fieldsValue.areaInfo || fieldsValue.areaInfo.length == 0) {
      Toast.info('请选择所在地区');
      return;
    }
    if (!fieldsValue.address || fieldsValue.address == '') {
      Toast.info('详细地址不能为空');
      return;
    }
    fieldsValue.mobPhone=fieldsValue.mobPhone.replace(/\s/g, "");
    const provinceId = fieldsValue.areaInfo[0];
    const cityId = fieldsValue.areaInfo[1];
    const areaId = fieldsValue.areaInfo[2];

    const currentProvince = (district.filter(item => item.value == provinceId))[0]
    const currentCity = (currentProvince.children.filter(item => item.value == cityId))[0]
    const currentArea = (currentCity.children.filter(item => item.value == areaId))[0]
    const currentAreaName = [currentProvince.label, currentCity.label, currentArea.label].join(',');

    addressApi.saveAddress({
      ...fieldsValue,
      provinceId,
      cityId,
      areaId,
      areaInfo: currentAreaName
    }).then(result => {
      if (result.result == 1) {
        this.props.router.replace('/address')
      } else {
        Toast.info(result.msg);
      }
    })

  }
  render() {
    const { getFieldProps } = this.props.form;
    return <div className='wx-address-add'>
      <List className="picker-list">
         <InputItem
            {...getFieldProps('trueName')}
            clear
            placeholder="请输入收货人"
            maxLength="50"
          >收货人</InputItem>
        <InputItem
            {...getFieldProps('mobPhone')}
            clear
            type='phone'
            placeholder="请输入手机号"
        >手机号</InputItem>
        <Picker   
          data={district}
          title="选择地区"
          onPickerChange={this.onPickerChange}
          {...getFieldProps('areaInfo')}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <InputItem style={this.state.sty1==true?{position:'absolute',top:'10%',borderRadius:'30px',zIndex:'99999',width:'91%',padding:'0.2rem 0.3rem',border:'1px solid #000',borderBottom:'2px solid #000',background:'rgb(235, 235, 239)'}:{}}
            {...getFieldProps('address')}
            clear
            onFocus={this.onFocus1}
             onBlur={this.onBlur1}
            placeholder="街道、门牌号等">详细地址</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>保存</Button>
        </Item>
      </List>
    </div>
  }
}

export default withRouter(
  createForm()(AddressAdd)
);
