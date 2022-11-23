 import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import CMenuCardVendor from '../components/CMenuCardVendor';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import AddMenuPage from './AddMenuPage';
const { Content, Footer } = Layout;
const ChangeCanteenMenuPage = (props) => {
    const [addItem, setAddItem] = useState(false) 
    const [data, setData] = useState([])
    function getData() {
        fetch('/canteen/getmenu/'+props.username, {
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
            }
        })
    }
    useEffect(()=> {
        window.addEventListener('ct', getData)
        getData()
    }, [])
    
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content>
                <center>
                <Button
                    onClick={()=> {
                        if (addItem) {
                            setAddItem(false)
                        } else {
                            setAddItem(true)
                        }
                    }}
                >Add Menu Item</Button>
                </center>
                {data.map((item) =>{
                    return <CMenuCardVendor 
                            title={item.name}
                            rate={item.rating}
                            img={item.image}
                            pid={item._id}
                            vendor={item.vendor}
                            price={item.price}
                             />
                })}
            </Content>
            <Footer>
            <Drawer
                    title={<Button shape='circle' icon={<CloseOutlined /> } onClick={()=>{setAddItem(false)}}/>}
                    placement="right"
                    type={'Add MenuItem'}
                    onClose={()=>{setAddItem(false)}}
                    visible={addItem}
                    closable={false}
                    headerStyle={{ position: 'center',textAlign:'center' }}
                >
                <AddMenuPage username={props.username}/>
            </Drawer>
            </Footer>
            </Layout>
      );
}

export default ChangeCanteenMenuPage;