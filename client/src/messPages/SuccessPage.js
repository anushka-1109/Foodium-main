import React from 'react';
import { Typography, Layout, Image} from 'antd';
import NavBar from '../components/NavBar';
import tick from '../assets/tick.jpeg';
import {isMobile} from 'react-device-detect';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Content } = Layout;
const { Title } = Typography;

const SuccessPage = (props) => {

    var dim = "65vh"
    if (isMobile) {
        dim = "75vw"
    } 
    console.log(props.date)
    return(
        <Layout style={{height:'100vh', width:'100vw', overflow:'hidden'}}>
            <NavBar username={props.username} balance={props.balance}/>
            <Content>
                <center>
                <Title>Success</Title>
                <Image src={tick} width={dim} height={dim}/>
                </center>
            </Content>
        </Layout>
    )
}

export default SuccessPage