import React,{ useState} from 'react';
import { Card, Typography, List} from 'antd';
import 'antd/dist/antd.min.css';
import {isMobile} from 'react-device-detect';
import '../assets/main.css';
const { Title } = Typography;

const OrderCard = (props) => {
    let width;
    let isCenter=true
    if (isMobile) {
        width='100vw'
        isCenter=false
    } else {
        width='50vw'
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
        <Card style={{width:width}} title={'Order Total: '+props.payment}>
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
        </Card>)
    }
}

OrderCard.defaultProps = {
    width: "100vw",
    // height: "22vh",
    price: 0

}

export default OrderCard