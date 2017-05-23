import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  TextareaItem,
  Checkbox,
  InputItem
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import './invoice.less'
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceHeader:1,
      invoiceType:1,//发票类型1普通发票2增值税发票
      needInvoice:'NO'
    }
  }
	componentDidMount() {
      let invoiceContentStr='';
      let invoiceHeaderStr='';
      let invoiceTypeStr='';
      if(localStorage.getItem('invoiceContentStr')){
        invoiceContentStr=localStorage.getItem('invoiceContentStr');
        this.setState({
              needInvoice:'YES'
        });
        invoiceHeaderStr=invoiceContentStr.substr(0,4);
        if(invoiceHeaderStr=='普通发票'){
          this.setState({
            invoiceType: 1
          });
        }else{
          this.setState({
            invoiceType: 2
          });
        }
        invoiceTypeStr=invoiceContentStr.substr(5,7);
        if(invoiceTypeStr=='个人'){
          this.setState({
            invoiceHeader: 1
          })
        }else{
          this.setState({
            invoiceHeader: 2
          })
        }
      }
	}
  onClick = () => {
    let invoiceContentStr='';
    // 提交地址
    const fieldsValue = this.props.form.getFieldsValue()
    // check ,明细必须输入抬头
    if (this.state.invoiceHeader == 2&&(fieldsValue.invoiceHeaderStr==undefined||fieldsValue.invoiceHeaderStr=='')) {
      Toast.fail('请输入发票抬头');
      return;
    }
    if(this.state.invoiceHeader == 1){
      fieldsValue.invoiceHeaderStr='个人';
      invoiceContentStr='个人'
    }else{
      invoiceContentStr='公司'
    }
    if(this.state.invoiceType==1){
      invoiceContentStr='普通发票-'+invoiceContentStr;
    }else{
      invoiceContentStr='增值发票-'+invoiceContentStr;
    }
    if(this.state.needInvoice=='NO'){
      localStorage.removeItem("invoiceContentStr");
      this.props.router.goBack();
      return;
    }

    orderApi.addInvoice({
      invTitle: fieldsValue.invoiceHeaderStr,
      invContent: fieldsValue.invoiceContent,
      invState: this.state.invoiceType
    }).then(result => {
      if (result.result == 1) {
        Toast.success(result.msg);
        localStorage.setItem("invoiceContentStr",invoiceContentStr);
        this.props.router.goBack();
      } else {
        Toast.fail(result.msg);
      }
    })
  }

  onChangeInvoiceHeader= (value) => {
    this.setState({
      invoiceHeader: value,
    });
  };

  onChangeInvoiceType= (value) => {
    this.setState({
      invoiceType: value,
    });
  };

  onChangeNeedInvoice= (value) => {
    this.setState({
      needInvoice: value,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return <div className='wx-invoice'>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票类型</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.2rem 0rem 0.3rem'}}>
          <Button type={this.state.invoiceType==1?"ghost":""} inline  style={this.state.invoiceType==1?{ marginRight: '0.08rem' }:{}} icon={this.state.invoiceType==1?"check":""} onClick={() => this.onChangeInvoiceType(1)} size="small">普通发票</Button>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.2rem'}}>
          <Button inline  type={this.state.invoiceType==2?"ghost":""} size="small" style={this.state.invoiceType==1?{ marginRight: '0.08rem' }:{}} icon={this.state.invoiceType==2?"check":""} onClick={() => this.onChangeInvoiceType(2)}>增值税发票</Button>
          </Flex.Item>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票抬头</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.1rem 0rem 0.3rem'}}>
            <CheckboxItem  checked={this.state.invoiceHeader==1} onChange={() => this.onChangeInvoiceHeader(1)}>个人</CheckboxItem>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.1rem'}}>
            <CheckboxItem checked={this.state.invoiceHeader==2} onChange={() => this.onChangeInvoiceHeader(2)}>公司</CheckboxItem>
          </Flex.Item>
          <div style={{width: '2rem', position: 'absolute',right: '0.2rem',zIndex: '100'}}>
          {this.state.invoiceHeader==2&& <InputItem
            {...getFieldProps('invoiceHeaderStr')}
            clear
            placeholder="请输入发票抬头"
            maxLength="100"
            />
          }
          </div>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票内容</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.1rem 0rem 0.3rem'}}>
            <CheckboxItem checked={this.state.needInvoice=='NO'} onChange={() => this.onChangeNeedInvoice('NO')}>不开发票</CheckboxItem>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.1rem'}}>
            <CheckboxItem checked={this.state.needInvoice=='YES'}  onChange={() => this.onChangeNeedInvoice('YES')}>明细</CheckboxItem>
          </Flex.Item>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票信息</div>}>
        <TextareaItem
            {...getFieldProps('invoiceContent')}
            placeholder='在此输入发票信息'
            autoHeight
            disabled={this.state.needInvoice=='NO'}
            rows={3}
        />
      </List>
      <div className='wx-invoicelist-bar'>
        <Button className = 'btn' type='primary' onClick={this.onClick}>确定</Button>
      </div>
    </div>
  }
}

export default withRouter(createForm()(Invoice));
