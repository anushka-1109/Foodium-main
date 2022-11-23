import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import {
    Form,
    Input,
    Cascader,
    Checkbox,
    Button,
    Typography,
    Layout,
    notification,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
var CryptoJS = require("crypto-js");
const { Title } = Typography;
const { Content } = Layout;

const SignUpPage = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [positions, setPositions] = useState([])
    var phoneno = /^\d{10}$/;
    const getData = async () => {
        const req = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
        }
        let res = await fetch('/entry', req)
        if (!res.ok)
            return
        res = await res.json()
        if (res.result==='success') {
            setPositions(res.positions)
        }
    }
    useEffect(()=> {
        getData()
    }, [])

    const onFinish = async (values) => {
        let { username, prefix, phone, password, email, confirm, agreement } = values;
        password = CryptoJS.AES.encrypt(password, 'my-secret-key@123').toString();
        const position = values.position[0];
        const res = await fetch("/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                username, prefix, phone, password, email, confirm, agreement, position,
            })
        })
        if (!res.ok) {
            notification.open({
                message: 'Failed',
                description:
                    'unable to submit. Please try again later. :(',
            });
            return;
        }
        const data = await res.json();
        if (data.result === 'success') {
            return navigate('home', {replace:true});
        }
        else {
            notification.open({
                message: 'Login failed!',
                description:
                    'unable to log in. Please try again later. :(',
            });
        }

    };


    return (
        <Layout>
                <Content style={{padding:'10px'}}>
                    <Title level={2}>Sign Up</Title>
                    <Form
                        // {...formItemLayout}
                        className="registerationForm"
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            prefix: '91',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    unique: true,
                                    message: 'Please input your username!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                    validator: (_, value) =>
                                        value.match(phoneno) ? Promise.resolve() : Promise.reject(new Error('Invalid phone number')),
                                },
                            ]}
                        >
                            <Input
                                
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Enter Mobile NUmber"
                            prefix={<PhoneOutlined/>}
                            />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Who are you?',
                                },
                            ]}
                        >
                            <Cascader options={positions} placeholder='Position' />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        // {...tailFormItemLayout}
                        >
                            <Checkbox>
                                I have read the <a href="/">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                {/* </div > */}
        </Layout>

    );
};


export default SignUpPage