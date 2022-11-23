import React, { useState, useEffect } from 'react';
import { Typography,Card, Layout, notification, Button,Row, Col,Input} from 'antd';
import NavBar from '../components/NavBar';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Content } = Layout;
const { Title } = Typography;


const ChangePricePage=(props)=>{
    const [breakPrice, setbreakPrice] = useState(-1)
    const [lunchPrice, setLunchPrice] = useState(-1)
    const [dinnerPrice, setDinnerPrice] = useState(-1)
    const [valbreak, setValBreak] = useState(0)
    const [vallunch, setValLunch] = useState(0)
    const [valdinner, setValDinner] = useState(0)
    const getData = async () => {
        let req = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }
        let res = await fetch('/messvendor/getprice/'+props.username, req)
        if (!res.ok) {
            return
        }
        res = await res.json()
        if (res.result==='success') {
            setbreakPrice(res.breakPrice)
            setLunchPrice(res.lunchPrice)
            setDinnerPrice(res.dinnerPrice)
        }
    }
    const setData = async (type, amt) => {
        console.log(amt)
        console.log(valbreak)
        let req = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                amt: amt.toString(),
                username: props.username,
                type: type,
            })
        }
        console.log({
            amt: amt.toString(),
            username: props.username,
            type: type,
        })
        let res = await fetch('/messvendor/changeprice', req)
        if (!res.ok) {
            notification.open({
                message: 'Error',
                description: 'Some Unknown Error Occurred'
            })
            return
        }
        res = await res.json()
        if (res.result==='success') {
            notification.open({
                message: 'Success',
                description: 'Price Changed'
            })
        } else {
            notification.open({
                message: 'Error',
                description: 'Unknown Error'
            })
        }
        getData()
    }
    useEffect(()=> {
        getData()
    }, [])
    return <>
        <Layout style={{height:'100vh', width:'100vw'}}>
        <NavBar username={props.username} balance={props.balance}/>
                <Content>
                <div className="site-card-wrapper">
                <Card style={{margin:'0 10vh'}}>
                        <Row justify="space-between">
                            <Col span={6}>
                            <Title level={2}>Breakfast</Title>
                                <Title level={4}>Current Price: {breakPrice}</Title>
                                
                            </Col>
                            <Col span={6}>
                                <center>
                                <Input style={{margin:'5 0vh'}} 
                                        type='number' 
                                        onChange={(e)=>{setValBreak(e.target.value)}} 
                                        value={valbreak}/>
                                <Button style={{marginTop:'10vh'}} onClick={()=> {setData('breakfast', valbreak)}}>Change Price</Button>
                                </center>
                            </Col>
                        </Row>
                    </Card>
                    <Card style={{margin:'0 10vh'}}>
                        <Row justify="space-between">
                            <Col span={6}>
                            <Title level={2}>Lunch</Title>
                                <Title level={4}>Current Price: {lunchPrice}</Title>
                                
                            </Col>
                            <Col span={6}>
                                <center>
                                <Input style={{margin:'5 0vh'}} 
                                        type='number' 
                                        onChange={(e)=>{setValLunch(e.target.value)}} 
                                        value={vallunch}/>
                                <Button style={{marginTop:'10vh'}} onClick={()=> {setData('lunch', vallunch)}}>Change Price</Button>
                                </center>
                            </Col>
                        </Row>
                    </Card>
                    <Card style={{margin:'0 10vh'}}>
                        <Row justify="space-between">
                            <Col span={6}>
                            <Title level={2}>Dinner</Title>
                                <Title level={4}>Current Price: {dinnerPrice}</Title>
                                
                            </Col>
                            <Col span={6}>
                                <center>
                                <Input style={{margin:'5 0vh'}} 
                                        type='number' 
                                        onChange={(e)=>{setValDinner(e.target.value)}} 
                                        value={valdinner}/>
                                <Button style={{marginTop:'10vh'}} onClick={()=> {setData('dinner', valdinner)}}>Change Price</Button>
                                </center>
                            </Col>
                        </Row>
                    </Card>
                </div>
                </Content>
        </Layout>
    </>;
}

export default ChangePricePage;