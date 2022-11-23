import React, { useState, useRef } from 'react';
import { Form, Input, Button, Layout, Typography, notification, Image} from 'antd';
import { UserOutlined, AccountBookOutlined} from '@ant-design/icons';
import FileBase64 from 'react-file-base64';
import NavBar from '../components/NavBar'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const {Content } = Layout;
const { Title } = Typography;

const AddMenuPage = (props) => {
    const [item, setItem] = useState({ image: '' });
    console.log(props.username)
    console.log(props.time)
    console.log(props.day)
    const onFinish = (values) => {
        console.log(values)
        fetch("/canteenvendor/addmenuitem", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body:JSON.stringify({
                name: values.food_name,
                rating: 0,
                vendor: props.username,
                desc: values.desc,
                image: item.image,
                price: values.price
            })
       }).then(
           (res) => {
            if (!res.ok) {
                return {}
           }
           return res.json()
        }
       ).then((res)=> {
        if (res.result==='success') {
            notification.open({
                message: 'success',
                description:
                    'success :)',
            });
        } else {
        notification.open({
            message: 'Failed',
            description:
                'unable to upload :(',
        });
        }
        setItem({ image: '' });
        const event = new Event('ct');
        window.dispatchEvent(event)
        formRef.current.resetFields()
    })
    }
    const formRef = useRef();

    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content style={{padding:'0vh 5vh'}}>
                <Title level={2}>Menu for {props.time}</Title>
                <Form onFinish={onFinish} ref={formRef}>
                    <Form.Item
                        name="food_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of food item!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="item name" />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: 'Enter food description',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Price',
                            },
                        ]}
                    >
                    <Input prefix={<AccountBookOutlined className="site-form-item-icon" />}
                                        type='number' 
                                        placeholder="Price"
                                        defaultValue={0}
                                        />
                    </Form.Item>
                    <Form.Item
                    name='file'
                    rules={[
                        {
                            message:'Please Upload'
                        }
                    ]}
                    >
                    <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                    />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className="login-form-button">
                            Upload
                        </Button>
                    </Form.Item>
                </Form>
                <Image src={item.image}/>
            </Content>
        </Layout>
    );
};

export default AddMenuPage