import React, { useState ,useEffect} from 'react';
import {Table, notification,Layout} from 'antd';
import NavBar from '../components/NavBar';
const { Content } = Layout;


const ProfilePage=(props)=>{
    const [profile, setProfile] = useState({
        username: '',
        position: '',
        image: '',
        phone: '',
        email: '',
        balance: '',
    });
    const getPaymentsHistory= () => {
        fetch('/profile',{
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

    useEffect(()=> {
        getPaymentsHistory()
    }, [])

        
    return (
        <div>  
            <Layout>    
            <NavBar username={props.username} balance={props.balance}/>   
                <Content style={{padding:'2vh 10vh 2vh 10vh'}}> 
                </Content>
            </Layout>
        </div>
    )
}
export default ProfilePage