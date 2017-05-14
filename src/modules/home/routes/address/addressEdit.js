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

import * as addressApi from '../../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const district = addressApi.getAreaData();

class AddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state={ }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      ...this.props.location.state,
      areaIds: [
        this.props.location.state.provinceId,
        this.props.location.state.cityId,
        this.props.location.state.areaId
      ]
    });
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
    if (!fieldsValue.areaIds || fieldsValue.areaIds.length == 0) {
      Toast.info('请选择所在地区');
      return;
    }
    if (!fieldsValue.address || fieldsValue.address == '') {
      Toast.info('详细地址不能为空');
      return;
    }
    fieldsValue.mobPhone=fieldsValue.mobPhone.replace(/\s/g, "");
    const provinceId = fieldsValue.areaIds[0];
    const cityId = fieldsValue.areaIds[1];
    const areaId = fieldsValue.areaIds[2];

    const currentProvince = (district.filter(item => item.value == provinceId))[0]
    const currentCity = (currentProvince.children.filter(item => item.value == cityId))[0]
    const currentArea = (currentCity.children.filter(item => item.value == areaId))[0]
    const currentAreaName = [currentProvince.label, currentCity.label, currentArea.label].join(',');

    addressApi.saveAddress({
      addressId: this.props.location.state.addressId,
      ...fieldsValue,
      provinceId,
      cityId,
      areaId,
      areaInfo: currentAreaName
    }).then(result => {
      if (result.result == 1) {
        this.props.router.push('/address')
      } else {
        Toast.info(result.msg);
      }
    })

  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

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
          {...getFieldProps('areaIds')}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <InputItem
            {...getFieldProps('address')}
            clear
            maxLength="50"
            placeholder="街道、门牌号等">详细地址</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>保存</Button>
        </Item>
      </List>
    </div>
  }
}

export default withRouter(
  createForm()(AddressEdit)
);
