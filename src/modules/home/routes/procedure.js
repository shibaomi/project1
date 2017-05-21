/**
 * Created by pc on 2017/5/20.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Modal,
    Toast,
    Flex,
    Button,
    List,
    Checkbox,
    Steps,
    Icon
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../order/api/order';
import { common } from 'common';

const Item = List.Item;
const Step = Steps.Step;
import '../../order/routes/order.less';

class Procedure extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return <div className='wx-pay-result' style={{backgroundColor:'white',paddingLeft:'0.2rem',paddingTop:'0.2rem'}}>
            <Steps current={1} >
                <Step status={'finish'} title="您的订单已完成 " icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
                <Step status={'finish'} title="您的检验报告已签发" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
                <Step status={'finish'} title="您的产品检验中" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
                <Step status={'finish'} title="您的产品已确认收样" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
                <Step status={'finish'} title="您已支付寄样" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
                <Step status={'finish'} title="您的订单已提交，您的订单编号为：124455998778" icon={<img style={{height:'0.3rem',width:'0.3rem',marginLeft:'0.03rem'}} src='../../../assets/img/danxuan-01.png' />} description="This is description" />
            </Steps>
        </div>
    }
}

export default withRouter(Procedure);
