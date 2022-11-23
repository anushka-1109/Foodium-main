import React, { useState ,useEffect} from 'react';
import {Table, notification,Layout} from 'antd';
import NavBar from '../components/NavBar';
const { Content } = Layout;
const CanteenPaymentHistoryPage=(props)=>{
    const [payments, setPayments] = useState([]);
    const getPaymentsHistory=()=>{
        fetch('/canteen/historyhandler',{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then((res)=>{
            if(!res.ok){
                return{}
            }
            else return res.json()
        }).then((res)=>{
            if(res.result==="success"){
                console.log(res.payments)
                setPayments(res.payments)
                
            }
            else {
                notification.open({
                    message: 'Failed',
                    description:
                        'unable to fetch Payment History :(',
                })
            }
        })
    }
    
    const makeDescription=(orders)=>{
        const map = orders.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        const order_items=[...map.keys()];
        const item_frequency=[...map.values()];
        var description='';
        order_items.map((item,index)=>{
            description+=`${item}x${item_frequency[index]} `
        })
        return description

    }

    useEffect(()=> {
        getPaymentsHistory()
        // console.log(payments)
    }, [])

        const columns = [
            {title:'Order_id',dataIndex: 'order_id',key: 'order_id'},
            { title: 'Date',dataIndex: 'date',key: 'date'},
            { title: 'Time',dataIndex: 'time', key: 'time'},
            {title:'Payment',dataIndex:'payment',key:'payment'},
            {title:'Balance',dataIndex:'balance',key:'balance'},
            {title:'Vendor',dataIndex:'vendor',key:'vendor'},
            
        ];
    return(
        <div>  
            <Layout>    
            <NavBar username={props.username} balance={props.balance}/>     
                <Content style={{padding:'2vh 10vh 2vh 10vh'}}>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{makeDescription(record.order)}</p>,
                        // rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={payments}
                />
                </Content>
            </Layout>
        </div>
    )
}
export default CanteenPaymentHistoryPage