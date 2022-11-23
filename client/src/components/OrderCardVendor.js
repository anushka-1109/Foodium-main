import React,{ useState} from 'react';
import { Card, Typography, List, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {isMobile} from 'react-device-detect';
import '../assets/main.css';
const { Title } = Typography;
const OrderCardVendor = (props) => {
    let width;
    let isCenter=true
    if (isMobile) {
        width='100vw'
        isCenter=false
    } else {
        width='50vw'
    }
    const onAccept = ()=> {
        fetch('/canteenvendor/orderstatus', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                response: 'accept',
                orderid: props.orderid
            })
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res=> {
            if (res.result==='success') {
                const event = new Event('op');
                window.dispatchEvent(event)
            }
        })
    }
    const onReject = ()=> {
        fetch('/canteenvendor/orderstatus', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                response: 'reject',
                orderid: props.orderid
            })
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res=> {
            if (res.result==='success') {
                const event = new Event('op');
                window.dispatchEvent(event)
            }
        })
    }
    const onReady = ()=> {
        fetch('/canteenvendor/orderstatus', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                response: 'ready',
                orderid: props.orderid
            })
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res=> {
            if (res.result==='success') {
                const event = new Event('op');
                window.dispatchEvent(event)
            }
        })
    }
    const onPick = () => {
        fetch('/canteenvendor/orderstatus', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                response: 'collected',
                orderid: props.orderid
            })
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res=> {
            if (res.result==='success') {
                const event = new Event('op');
                window.dispatchEvent(event)
            }
        })
    }
    let orders = props.order
    let uniqueorders = [
        ...new Map(orders.map((item) => [item["name"], item])).values(),
    ]
    let finorder = uniqueorders.map((el)=> {
        el.qt = orders.filter(e=> e.name===el.name).length
        return el
    })
    if (isCenter) {
        return (
            <center>
        <Card style={{width:width}} title={'Total: '+props.payment}>
        <Title level={5}>PIN: {props.item.pin}</Title>
        <Card type="inner" title={'Status: '+props.status} extra={'DATE: '+props.date}>    
        <List
            dataSource={finorder}
            renderItem={item => {
                if (item.qt>0)
                    return <>
                    <List.Item key={item.id} >
                    <List.Item.Meta
                        title={<center>{item.name}</center>}
                        description={<center>`price - Rs.{item.price} | Qt - {item.qt}`</center>}
                    />
                    </List.Item>
                    </>
                else
                    return <></>
                }}
            />
            </Card>
            <Button onClick={onAccept}>Accept Order</Button>
            <Button onClick={onReject}>Reject Order</Button>
            <Button onClick={onReady}>Order Ready</Button>
            <Button onClick={onPick}>Order Collected</Button>
        </Card>
        </center>
    );
    } else {
        return (<Card style={{width:width}} title={'Total: '+props.payment}>
        <Title level={5}>PIN: {props.item.pin}</Title>
        <Card type="inner" title={'Status: '+props.status} extra={'DATE: '+props.date}>    
        <List
            dataSource={finorder}
            renderItem={item => {
                if (item.qt>0)
                    return <>
                    <List.Item key={item.id} >
                    <List.Item.Meta
                        title={<center>{item.name}</center>}
                        description={<center>`price - Rs.{item.price} | Qt - {item.qt}`</center>}
                    />
                    </List.Item>
                    </>
                else
                    return <></>
                }}
            />
            </Card>
                <Button onClick={onAccept}>Accept Order</Button>
                <Button onClick={onReject}>Reject Order</Button>
                <Button onClick={onReady}>Order Ready</Button>
                <Button onClick={onPick}>Order Collected</Button>
        </Card>)
    }
}

OrderCardVendor.defaultProps = {
    width: "100vw",
    // height: "22vh",
    price: 0

}

export default OrderCardVendor