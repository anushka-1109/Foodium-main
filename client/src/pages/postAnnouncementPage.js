import React, { useRef } from 'react';
import { Form, Input, Button, Layout, Typography, notification} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import NavBar from '../components/NavBar'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const {Content } = Layout;
const { Title} = Typography;

const PostAnnouncementPage = (props) => {
    const onFinish = (values) => {
        console.log(values)
        fetch("/messvendor/postannouncement", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body:JSON.stringify({
                title: values.title,
                description: values.description
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
    })
    formRef.current.resetFields()
    }
    const formRef = useRef();
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content style={{padding:'0vh 5vh'}}>
                <Title level={2}>Post Announcement</Title>
                <Form
                    ref={formRef}
                    onFinish={onFinish}
                    
                >
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Title',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Description',
                            },
                    ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Description" />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType="submit" className="login-form-button">
                            Post
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default PostAnnouncementPage