import { Layout,  Drawer, Button, Space} from 'antd';
import Slider from '../components/Slider'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import React, { useState } from 'react';
import SignInPage from'./SignInPage';
import SignUpPage from './SignUpPage';
import { CloseOutlined  } from '@ant-design/icons';

const { Footer, Content } = Layout;
function importAll(r) {
    let img = {};
    r.keys().map((item, _index) => { img[item.replace('./', '')] = r(item); });
    return img;
  }
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

const EntryPage = () => {
    const [visibleSignIn, setVisibleSignIn] = useState(false);
    const [visibleSignUp, setVisibleSignUp] = useState(false);
    const [type, setType] = useState();

    const showSignIn = () => {
        setType('SignIn');
        setVisibleSignIn(true);
        setVisibleSignUp(false)
    };

    const showSignUp = () => {
        setType('Sign Up');
        setVisibleSignUp(true);
        setVisibleSignIn(false)
        
    };

    const onClose = () => {
        setVisibleSignIn(false);
        setVisibleSignUp(false);
    };
    
    return (
        <Layout style={{ padding: '0', margin: '0', height: '100vh' }} >
            {/* <Header style={{ padding: '0' }}>
                <NavBar />
            </Header> */}
            <Content style={{height:'90vh'}}>
                <div >
                    <Slider image_array={Object.values(images)} width={'100vw'} height={'90vh'} />
                </div>
            </Content>            

            <Footer style={{height:'10vh'}}>
                <center>
                <Space>
                    Have an account
                    <Button type="primary" onClick={showSignIn}>
                        SignIn
                    </Button>
                    or
                    <Button type="primary" onClick={showSignUp}>
                        Sign Up
                    </Button>

                    </Space>
                </center>
                <Drawer
                    title={<Button shape='circle' icon={<CloseOutlined /> } onClick={onClose}/>}
                    placement="right"
                    type={type}
                    onClose={onClose}
                    visible={visibleSignIn}
                    closable={false}
                    headerStyle={{ position: 'center',textAlign:'center' }}
                >    
                    <SignInPage/>
                </Drawer>
                <Drawer
                    title={<Button shape='circle' icon={<CloseOutlined /> } onClick={onClose}/>}
                    placement="right"
                    type={type}
                    onClose={onClose}
                    visible={visibleSignUp}
                    closable={false}
                    headerStyle={{ position: 'center',textAlign:'center' }}
                >
                    <SignUpPage/>
                </Drawer>
            </Footer>
        </Layout>

    );
}
export default EntryPage