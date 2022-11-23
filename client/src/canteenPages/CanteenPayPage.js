import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import { Typography, Layout,notification, Button, Modal,Image} from 'antd';
import {isMobile} from 'react-device-detect';
import NavBar from '../components/NavBar';
import PinInput from 'w-react-pin-input';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import logo from '../images/foodiumLogo.png'
const { Content } = Layout;
const { Title } = Typography;

const CanteenPayPage=(props)=>{
    const navigate = useNavigate()
    var [pin, setPin] = useState(0)
    var [ind, setInd] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('Loading')
    const [mess, setMess] = useState("")
    const [isOkDisable, setIsOkDisable] = useState(false)
    const onFinish = ()=> {
        fetch("/mess/payeat",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body:JSON.stringify({
                pin: pin
            })
       }).then(
           (res) => {
            if (!res.ok) {
                return {}
           }
           return res.json()
        }
       ).then((res)=> {
        if (res.result==='success') {
            notification.open({
                message: 'success',
                description:
                    'Payment Complete complete :) to ' + res.data + "   "+res.date,
            });
            return navigate("/mess/success", {replace:true, state:{date: res.date}})
        } else {
        notification.open({
            message: 'Failed',
            description:
                'unable to payment :(',
        });
        setIsModalVisible(false)
        
    }
})
    }
    const handleClick = () => {
        fetch('/mess/confirmmess/'+pin.toString(), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then(async (res)=>{
            if (!res.ok) {
                setModalTitle('Unknown Error')
                setMess("unknown")
            }
            res = await res.json()
            if (res.result==='success')
            {
                if (res.data==='unknown') {

                    setModalTitle('Wrong PIN')
                    setMess("unknown")
                } else {
                    setModalTitle("Confirm")
                    setMess(res.data)
                }
            } else {
                setModalTitle('Wrong PIN')
                setMess("unknown")
            }
        }).then(()=>{
            setIsModalVisible(true)
        })
    }

    useEffect(() => {
        if (mess==='unknown')
            setIsOkDisable(true)
        else
            setIsOkDisable(false)
    }, [mess, modalTitle])

    return (
        <Layout style={{height:'100vh', width:'100vw'}}>
            <NavBar username={props.username} balance={props.balance}/>
                <Content>
                    <div style={{height:'50vh', 
                    width:'80vw', 
                    marginTop:'10vh',
                    marginBottom:'15vh', 
                    marginLeft: '8vw',
                    marginRight: '5vw',
                    verticalAlign:'center'}}>
                        <center>
                        <Title level={2} >Mess Payment</Title>
                        <Image src={logo} width='24vh' height='24vh' />
                        <PinInput 
                            length={4} 
                            initialValue=""
                            onChange={(value, index) => {
                                console.log(value)
                                console.log(index)
                                setPin(value)
                                setInd(0)
                            }} 
                            type="numeric" 
                            inputMode="number"
                            style={{padding: '10px'}}  
                            inputStyle={{borderColor: 'red'}}
                            inputFocusStyle={{borderColor: 'blue'}}
                            onComplete={(value, index) => {
                                setInd(1)
                            }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                            <Button type="primary" onClick={handleClick} disabled={ind!==1}>Submit</Button>
                        </center>
                        <Modal 
                        title={modalTitle} 
                        visible={isModalVisible} 
                        onCancel={()=> {setIsModalVisible(false)}}
                        okButtonProps={{disabled:isOkDisable}}
                        onOk={onFinish}
                        >
                            Payment to {mess}
                        </Modal>
                        </div>
                </Content>
        </Layout>
    );
}

export default CanteenPayPage;