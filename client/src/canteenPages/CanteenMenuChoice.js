import React, { useState, useEffect } from 'react';
import { Avatar,Layout,Card,Col, Typography,Row} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom';
import { faUtensils, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../components/NavBar'
const { Content } = Layout;

const { Title } = Typography;

const CanteenMenuChoice=(props)=>{
    

    const [data, setData] = useState([])
    const getData = () => {
        fetch('/canteen/getvendors', {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res => {
            if (res.result==='success') {
                setData(res.vendors.map(e=> {return {ic: faUtensils, title: e, link: '/canteen/menu/'+e, id: e}}));
            }
        })
    }
    useEffect(() => {
        getData()
    }, []);
    const [hg, vg, span,size, mg] = isMobile ? [4, 0, 12, 150, -5] : [10, 15, 7,200, -5];

    return <>
        <Layout  style={{overflowX: 'hidden',height:'100vh', width:'100vw'}}>
        <NavBar username={props.username} balance={props.balance}/>
            <Content >
                <div className="site-card-wrapper">
                    <Row gutter={[hg, vg]} justify='center' style={{ marginTop:{mg}}}>
                        {data.map(comp => 
                            <Col span={span} id={comp.id} key={comp.id}>
                                        <Link to={comp.link}>
                                            <Card style={{backgroundColor:'#f1f1f1'}} >
                                                <center>
                                                <Avatar style={{margin:"auto", display:'block', backgroundColor: 'rgba(100, 0, 0, 0.85)'}} size={size} 
                                                        icon={<FontAwesomeIcon icon={ comp.ic }/>}
                                                />
                                                <Title level={5}>{comp.title}</Title>
                                                </center>
                                            </Card>
                                        </Link>
                                    </Col>
                            )}
                    </Row>
                </div>
            </Content> 
        </Layout>
    </>   
}
export default CanteenMenuChoice;

