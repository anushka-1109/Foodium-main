import React, { useState, useEffect } from 'react';
import { Layout, Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrderCardVendor from '../components/OrderCardVendor';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Content, Footer } = Layout;


const VendorOrderPage = (props) => {
    const [data, setData] = useState([])
    const [dis, setDis] = useState(false)
    function getData() {
        fetch('/canteenvendor/getorders/'+props.username, {
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
                console.log(res.orders)
                setData(res.orders)
            } else {
                console.log('FAIL')
            }
        })
    }
    useEffect(()=> {
        window.addEventListener('op', getData)
        getData()
    }, [])
    const onRefresh = () => {
        getData()
        setDis(true)
        setTimeout(() => {
            setDis(false)
        }, 5000)
    }
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content>
                <center>
                <Button disabled={dis} onClick={onRefresh}>Refresh</Button>
                </center>
                {data.map((item) =>{
                    if (item.orderStatus!='reject' && item.orderStatus!='collected')
                        return <OrderCardVendor 
                            payment={item.payment}
                            status={item.orderStatus}
                            order={item.order}
                            username={item.username}
                            orderid={item._id}
                            item={item}
                             />
                    else
                        return <></>
                })}
            </Content>
            </Layout>
      );
}

export default VendorOrderPage;