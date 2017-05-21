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
class SaleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    questions:[]
  }
  }

  componentDidMount() {
    memberApi.question({
      type: 2
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

export default withRouter(createForm()(SaleQuestion));
