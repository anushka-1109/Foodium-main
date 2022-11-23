import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import { Typography, Layout,notification, Button, Modal,Image} from 'antd';
import NavBar from '../components/NavBar';
import PinInput from 'w-react-pin-input';
import logo from '../images/foodiumLogo.png'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Content } = Layout;
const { Title } = Typography;

const ChangePinPage=(props)=>{
    const navigate = useNavigate()
    var [pin, setPin] = useState(0)
    var [newpin, setNewPin] = useState(0)
    var [ind, setInd] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mess, setMess] = useState("")
    const [isOkDisable, setIsOkDisable] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [pageTitle, setPageTitle] = useState('Re-enter Previous PIN')
    const onFinish = ()=> {
        fetch("/messvendor/changepin",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body:JSON.stringify({
                oldpin: pin,
                newpin: newpin
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
                    'PIN Changed for ' + res.data,
            });
            return navigate("/mess-vendor/home", {replace:true, state:{date: res.date}})
        } else {
        notification.open({
            message: 'Failed',
            description:
                'unable to Set PIN',
        });
        setIsModalVisible(false)
        
    }
})
    }
    const handleClick = () => {
        fetch('/messvendor/confirmmess/'+pin.toString(), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then(async (res)=>{
            if (!res.ok) {
                setMess("unknown")
                return false
            }
            res = await res.json()
            if (res.result==='success')
            {
                if (res.data==='unknown') {

                    setMess("unknown")
                    notification.open({
                        message: 'Wrong PIN'
                    })
                    return false
                } else {
                    if (res.data===props.username) {
                        setMess(res.data)
                        setPageTitle('Enter New PIN')
                        setIsSubmitDisabled(false)
                        return true
                    }
                }
            }
        }).then((_val)=>{
            setIsModalVisible(false)
        })
    }

    useEffect(() => {
        if (mess==='unknown')
            setIsOkDisable(true)
        else
            setIsOkDisable(false)
    }, [mess])

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
                        <Title level={2} >{pageTitle}</Title>
                        <Image src={logo} width='24vh' height='24vh' />
                        <PinInput 
                            length={4} 
                            initialValue=""
                            onChange={(value, _index) => {
                                if (isSubmitDisabled) {
                                    setPin(value)
                                } else {
                                    setNewPin(value)
                                }
                                setInd(0)
                            }} 
                            type="numeric" 
                            inputMode="number"
                            style={{padding: '10px'}}  
                            inputStyle={{borderColor: 'red'}}
                            inputFocusStyle={{borderColor: 'blue'}}
                            onComplete={(_value, _index) => {
                                console.log(_value)
                                setInd(1)
                            }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                            <Button type="primary" onClick={handleClick} disabled={ind!==1}>Verify</Button>
                            <Button type="primary" onClick={()=> {setIsModalVisible(true)}} disabled={ind!==1 || isSubmitDisabled}>Submit</Button>
                        </center>
                        <Modal 
                        title='Confirm New PIN' 
                        visible={isModalVisible} 
                        onCancel={()=> {setIsModalVisible(false)}}
                        okButtonProps={{disabled:isOkDisable}}
                        onOk={onFinish}
                        >
                            Changing PIN from {pin} to {newpin}
                        </Modal>
                        </div>
                </Content>
        </Layout>
    );
}

export default ChangePinPage;