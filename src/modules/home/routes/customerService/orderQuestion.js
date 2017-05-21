import React, { ReactDOM, Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  ActionSheet,
  Modal,
  DatePicker
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import { common } from 'common';
import moment from 'moment';
import * as memberApi from '../../api/member';

import './customerService.less';

const Item = List.Item;

class OrderQuestion extends Component {
  constructor(props) {
  super(props);
    this.state = {
      questions:[]
    }
  }

  componentDidMount() {
    memberApi.question({
      type: 1
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          questions: result.data
        })
      }else{
        Toast.fail(result.msg);
      }
    })
  }
  render() {
    const {
        questions
    } = this.state;
    return <div className="wx-account">
      <div style={{backgroundColor:'#1786CD',paddingBottom:'0.2rem'}}>
        <div style={{textAlign:'center'}}>
          <Img src='../../../assets/img/dingdanwenti.png' style={{ width: '1.1rem', height: '1rem'}} />
        </div>
        <div style={{textAlign:'center',color:'white',paddingTop:'0.2rem'}}>
          你的专属服务顾问
        </div>
      </div>
      {
        questions && questions.map((item, index) =>
            <div style={{color:'#777',backgroundColor:'#fff',padding:'0.15rem'}}>
              <div style={{paddingBottom:'0.2rem'}}>
                {item.articleTitle}
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.articleContent }} style={{color:'#777'}}>
              </div>
            </div>
        )
      }
    </div>
  }
}

export default withRouter(createForm()(OrderQuestion));
