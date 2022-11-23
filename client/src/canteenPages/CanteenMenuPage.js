import React, { useState, useEffect } from 'react';
import { Layout, Drawer, List, Space, notification} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Container, Button} from 'react-floating-action-button'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../components/NavBar';
import CMenuCard from '../components/CMenuCard';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
let generator = require('string-generator-js');
const { Content, Footer } = Layout;
const CanteenMenuPage = (props) => {
    const navigate = useNavigate()
    let params = useParams()
    let vendor = params.canteenname
    const [cart, setCart] = useState([])
    const [sum, setSum] = useState(0)
    const [data, setData] = useState([])
    const [vis, setVis] = useState(false)
    function getData() {
        console.log(vendor)
        console.log(params)
        fetch('/canteen/getmenu/'+vendor, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then(res => {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res => {
            if (res.result==='success') {
                setData(res.canteenItems)
                let arr = res.canteenItems.map(e => {return {id:e._id , name: e.name, qt: 0, price: e.price}})
                console.log(arr)
                setCart(arr)
            }
        })
    }
    useEffect(()=> {
        window.addEventListener('ct', getData)
        getData()
    }, [])
    const onChange = (val, name) => {
        let tmp = cart
        let ind = tmp.findIndex(e => e.name===name)
        tmp[ind].qt = val;
        console.log(cart)
        let vl = 0
        cart.forEach((el => {
            vl += el.price*el.qt
        }));
        setSum(vl)
    }
    const onCart = () => {
        setVis(true)
        // navigate('/canteen/canteen-pay', {state: {data: data} })
    }
    const onDClose = () => {
        setVis(false)
    }
    const onOrder = () => {
        console.log('FINAL ', cart)
        const pin = generator.generate({length:4, type:'numbers'})
        fetch('/canteen/confirmorder', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                vendor: vendor,
                cart: cart,
                username: props.username,
                pin: pin
            })
        }).then(res=> {
            if (!res.ok)
                return {}
            return res.json()
        }).then(res =>{
            if (res.result==='success') {
                notification.open({
                    message: 'success',
                    description:
                        'success :)',
                });
                navigate('/canteen/orders', {replace:true})
            } else {
            notification.open({
                message: 'Failed',
                description:
                    'unable to upload :(',
            });
            }
        })
        
    }
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content>
                {data.map((item) =>{
                    return <CMenuCard 
                            title={item.name}
                            rate={item.rating}
                            img={item.image}
                            pid={item._id}
                            vendor={item.vendor}
                            price={item.price}
                            onChange={onChange}
                             />
                })}
            </Content>
            <Container>
            <Button
                tooltip="See Cart"
                rotate={true}
                onClick={onCart} >
                    <FontAwesomeIcon icon={ faShoppingCart}/>
                </Button>
                </Container>
            <Footer>
            <Drawer
                title={"Your Order: "+sum}
                placement='bottom'
                width={1000}
                height='100vh'
                visible={vis}
                onClose = {onDClose}
                extra={
                <Space>
                    <Button onClick={onOrder}>Order Now</Button>
                </Space>
                }>
                <List
                dataSource={cart}
                renderItem={item => {
                    if (item.qt>0)
                        return <>
                        <List.Item key={item.id} >
                        <List.Item.Meta
                            title={<center>{item.name}</center>}
                            description={<center>Price - Rs.{item.price} | Qt - {item.qt} | Total - Rs.{parseInt(item.price)*parseInt(item.qt)}</center>}
                        />
                        </List.Item>
                        </>
                    else
                        return <></>
                    }}
                />
            </Drawer>
            </Footer>
            </Layout>
      );
}

export default CanteenMenuPage;