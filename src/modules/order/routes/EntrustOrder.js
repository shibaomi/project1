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
    DatePicker,
    Picker
} from 'antd-mobile';

import * as addressApi from '../api/order';
import { common } from 'common';
import { createForm } from 'rc-form';

import './entrustOrder.less';

const Item = List.Item;

class EntrustOrder extends Component {
  constructor(props) {
    super(props);
    this.state={}
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

  createEntrustOrder = () => {
    const { getFieldProps } = this.props.form;
    return <List className="picker-list">
      <div style={{backgroundColor:'rgb(255, 255, 255)', border:'0px solid rgb(221, 221, 221)',
          paddingTop: '0.2rem',
          fontSize: '0.34rem',
          paddingBottom: '0.3rem',
          paddingLeft: '0.2rem'}}>委托信息</div>
      <InputItem
          {...getFieldProps('name')}
          clear
          placeholder="请输入委托人姓名"
          maxLength="50"
      >委托人姓名</InputItem>
      <DatePicker
          className="forss"
          mode="date"
          onChange={this.onChange}
          value={this.state.date}
      >
        <List.Item arrow="horizontal">要求完成日期</List.Item>
      </DatePicker>
      <InputItem
          {...getFieldProps('name')}
          clear
          placeholder="请输入委托单位名称"
          maxLength="50"
      >委托单位名称</InputItem>
      <InputItem
          {...getFieldProps('type')}
          clear
          maxLength="100"
          placeholder="请输入委托单位地址"
      >委托单位地址</InputItem>
      <div style={{backgroundColor:'rgb(255, 255, 255)', border:'0px solid rgb(221, 221, 221)',
          paddingTop: '0.2rem',
          fontSize: '0.34rem',
          paddingBottom: '0.3rem',
          paddingLeft: '0.2rem'}}>样品信息</div>
      <InputItem
          {...getFieldProps('name')}
          clear
          placeholder="请输入样品名称"
          maxLength="50"
      >样品名称</InputItem>
      <InputItem
          {...getFieldProps('type')}
          clear
          maxLength="50"
          placeholder="请输入样品规格型号"
      >样品规格型号</InputItem>
      <InputItem
          {...getFieldProps('count')}
          clear
          maxLength="10"
          placeholder="请输入样品数量"
      >样品数量</InputItem>
      <DatePicker
          className="forss"
          mode="date"
          onChange={this.onChange}
          value={this.state.date}
      >
        <List.Item arrow="horizontal">批号/生产日期</List.Item>
      </DatePicker>
      <InputItem
          {...getFieldProps('enterpriseName')}
          clear
          maxLength="50"
          placeholder="请输入生产企业名称"
      >生产企业名称</InputItem>
      <InputItem
          {...getFieldProps('enterpriseAddr')}
          clear
          maxLength="50"
          placeholder="请输入生产企业地址"
      >生产企业地址</InputItem>
      <InputItem
          {...getFieldProps('desc')}
          clear
          maxLength="100"
          placeholder="请输入检验项目描述"
      >检验项目描述</InputItem>
      <InputItem
          {...getFieldProps('remark')}
          clear
          maxLength="100"
          placeholder="备注"
      >备注</InputItem>
      <InputItem
          {...getFieldProps('enterpriseName')}
          clear
          maxLength="100"
          placeholder="请输入产品检验依据"
      >产品检验依据</InputItem>
      <InputItem
          {...getFieldProps('enterpriseName')}
          clear
          maxLength="100"
          placeholder="样品照片"
      >样品照片</InputItem>

      <Item>
        <Button onClick={this.onSubmit} type='primary'>提交订单</Button>
      </Item>
    </List>
  }
  render() {
    return <div className='wx-address-add'>
      {this.createEntrustOrder()}
    </div>
  }
}

export default withRouter(
    createForm()(EntrustOrder)
);
