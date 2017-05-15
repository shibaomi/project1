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
import * as orderApi from '../../api/order';
import { common } from 'common';
import './invoice.less'

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invState: 1,
      invTitle: '',
      invContent: 1
    }
  }
	componentDidMount() {
		console.log(this.props.params)
		this.setState({
			invTitle:this.props.params.invContent==1?'':this.props.params.invoiceShow,
			invContent:this.props.params.invContent
		})
	}
  onClick = () => {
    // check ,明细必须输入抬头
    if (this.state.invTitle == ''&&this.state.invContent==2) {
      Toast.fail('请输入发票抬头');
      return;
    }
    orderApi.addInvoice({
      invState: this.state.invState,
      invContent: this.state.invContent,
      invTitle: this.state.invTitle
    }).then(result => {
      if (result.result == 1) {
        // 新增成功，回订单确认页面
        // console.log(result);
        const invId = result.data[0].invId;
        // 同步到redux order页面
        this.props.dispatch({
          type: 'invoiceChange',
          payload: {
            ...this.props.order.invoice,
            invId: invId
          }
        })
        this.props.router.goBack();
      } else {
        Toast.info(result.msg);
      }
    })
  }

  onChangeContent = (value) => {
    this.setState({
      invContent: value
    })
    // 同步到redux order页面
    this.props.dispatch({
      type: 'invoiceChange',
      payload: {
        ...this.props.order.invoice,
        invContent: value
      }
    })
  }

  onChangeTitle = (value) => {
    this.setState({
      invTitle: value
    })
    // 同步到redux order页面
    this.props.dispatch({
      type: 'invoiceChange',
      payload: {
        ...this.props.order.invoice,
        invTitle: value
      }
    })
  }

  render() {
    return <div className='wx-invoice'>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票类型</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.2rem 0rem 0.3rem'}}>
          <Button type="ghost" inline  style={{ marginRight: '0.08rem' }} icon="check" size="small">普通发票</Button>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.2rem'}}>
          <Button inline  type="ghost" icon="check" size="small" style={{marginRight: '0.08rem'}}>增值税发票</Button>
          </Flex.Item>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票抬头</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.1rem 0rem 0.3rem'}}>
            <CheckboxItem checked={this.state.invContent==1} onChange={() => this.onChangeContent(1)} >个人</CheckboxItem>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.1rem'}}>
            <CheckboxItem checked={this.state.invContent==2} onChange={() => this.onChangeContent(2)}>公司</CheckboxItem>
          </Flex.Item>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票内容</div>} inline>
        <Flex style={{ marginBottom: '0.16rem', textAlign:'center',paddingBottom: '0.2rem'}}>
          <Flex.Item style = {{padding:'0rem 0.1rem 0rem 0.3rem'}}>
            <CheckboxItem checked={this.state.invContent==1} onChange={() => this.onChangeContent(1)} >不开发票</CheckboxItem>
          </Flex.Item>
          <Flex.Item style = {{padding:'0rem 0.3rem 0rem 0.1rem'}}>
            <CheckboxItem checked={this.state.invContent==2} onChange={() => this.onChangeContent(2)}>明细</CheckboxItem>
          </Flex.Item>
        </Flex>
      </List>
      <List renderHeader= {() =><div style={{backgroundColor:'#fff',border:'0PX solid #ddd',}}>发票信息</div>}>
        <TextareaItem
            title="111"
            autoHeight
            rows={3}
        />
      </List>
      <div className='wx-invoicelist-bar'>
        <Button className = 'btn' type='primary' onClick={this.onClick}>确定</Button>
      </div>
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(Invoice));
