import React,{ useState} from 'react';
import { Row,Col,  Card, Rate, Image, Typography, Button, Modal, Input, Form } from 'antd';
import { AccountBookOutlined} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import {isMobile} from 'react-device-detect';
import '../assets/main.css';
const { Title } = Typography;

const CMenuCardVendor = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    let iheight;
    let iwidth;
    let width;
    let isCenter=true
    if (isMobile) {
        iheight='15vh'
        iwidth='15vh'
        width='100vw'
        isCenter=false
    } else {
        iheight='10vw';
        iwidth='10vw';
        width='50vw'
    }
    const showModal = () => {
        setIsModalVisible(true);
      };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleDelete = ()=> {
        fetch('/canteenvendor/deleteitem/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                _id: props.pid,
                vendor: props.vendor
            })
        }).then(res => {
            if (!res.ok) {
                return {}
            }
            return res.json()
        }).then(
            res => {
                if (res.result==='success') {
                    console.log('successful delete')
                    const event = new Event('ct');
                    window.dispatchEvent(event)
                }
            }
        )
    }
    const handleFinish = (v) => {
        fetch('/canteenvendor/changeprice', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                price: v.price,
                _id: props.pid,
                vendor: props.vendor
            })
        }).then((res)=> {
            if (!res.ok) {
                return {}
            }
            return res.json()
        }).then(res=> {
            if (res.result==='success') {
                console.log('successful modify')
                    const event = new Event('ct');
                    window.dispatchEvent(event)
            }
        })

        setIsModalVisible(false);
    }
    if (isCenter) {
        return (
            <center>
        <Card style={{width:width}}>
            <Row gutter={[props.hg, props.vg]} justify="space-between">
                <Col span={props.spanc}>
                    <Title level={props.level}>{props.title}</Title>
                    <p>{props.content}</p>
                    Rating: <Rate disabled defaultValue={props.rate} /><br/>
                    Price : {props.price} <br/>
                </Col>
                <Col span={props.spani}>
                    <Image src={props.img} width={iwidth} height={iheight} style={{ objectFit: "cover" }}/>
                </Col>
            </Row>
            <Button onClick={handleDelete}>Delete Item</Button>
            <Button onClick={showModal}>Change Price</Button>
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} onOk={form.submit}>
                Enter New Price
                <Form form={form} onFinish={handleFinish}>
                <Form.Item
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Price',
                            },
                        ]}>
                        <Input prefix={<AccountBookOutlined className="site-form-item-icon" />}
                                        type='number' 
                                        placeholder="Price"
                                        defaultValue={0}
                                        />
                </Form.Item>
                </Form>
      </Modal>
        </Card>
        </center>
    );
    } else {
        return (<Card style={{width:width}}>
            <Row gutter={[props.hg, props.vg]} justify="space-between">
                <Col span={props.spanc}>
                    <Title level={props.level}>{props.title}</Title>
                    <p>{props.content}</p>
                    Rating: <Rate disabled defaultValue={props.rate} /><br/>
                    Price : {props.price} <br/>
                </Col>
                <Col span={props.spani}>
                    <Image src={props.img} width={iwidth} height={iheight} style={{ objectFit: "cover" }}/>
                </Col>
            </Row>
            <Button onClick={handleDelete}>Delete Item</Button>
            <Button onClick={showModal}>Change Price</Button>
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} onOk={form.submit}>
                Enter New Price
                <Form form={form} onFinish={handleFinish}>
                <Form.Item
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Price',
                            },
                        ]}>
                        <Input prefix={<AccountBookOutlined className="site-form-item-icon" />}
                                        type='number' 
                                        placeholder="Price"
                                        defaultValue={0}
                                        />
                </Form.Item>
                </Form>
      </Modal>
        </Card>)
    }
}

CMenuCardVendor.defaultProps = {
    iwidth: "150px",
    iheight: "150px",
    width: "100vw",
    // height: "22vh",
    hg: 6,
    rate: 2,
    price: 0

}

export default CMenuCardVendor