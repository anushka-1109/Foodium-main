import { useNavigate } from 'react-router';
import { Form, Input, Button, Layout, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const {Content } = Layout;
var CryptoJS = require("crypto-js");
const { Title } = Typography;

const SignInPage = (props) => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        let { username, password } = values;//{username:Anirudh,password:abc,k:dsas,k:asjas}
        password = CryptoJS.AES.encrypt(password, 'my-secret-key@123').toString();
        const res = await fetch("/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                username,  password
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
        notification.open({
            message: 'Login failed!',
            description:
                'Invalid Username or Password :(',
        });
    };

    return (
        <Layout>
            {/* <Header style={{ padding: '0' }}><NavBar /></Header> */}
            <Content style={{padding:'10px'}}>
                <Title level={2}>Sign In</Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Content>

        </Layout>

    );
};

export default SignInPage