import React, {useState, useEffect} from 'react';
import { Navigate} from 'react-router';
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Hashcomp = (props) =>  {
    var [check, setCheck] = useState('wait')
    var [position, setPosition] = useState("wait")
    var [username, setUsername] = useState('')
    var [balance, setBalance] = useState(0)
    const getauth = () => {
        fetch('/hashcomp', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then(
            (result)=>{
                if (!result.ok) {
                    return {}
                }
                return result.json()
            }
        ).then(
            (result) => {
                if (result.result==='success') {
                    setCheck('success')
                    console.log(result.position)
                    setPosition(result.position)
                    setUsername(result.username)
                    setBalance(result.balance)
                } else {
                    setPosition('error')
                    setCheck('error')
                }
            }
        )
    }
    useEffect(()=> {
        console.log('entered hashcomploop')
        getauth()
        return ()=> {
            console.log('exited hashcomploop')
            setPosition('wait')
            setCheck('wait')
        }
    }, [])
    const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;
    if (check==='wait' || position==='wait') {
        return <center style={{margin:'0' ,left: '50%', position: 'absolute',top: '50%', transform: 'translate(-50%, -50%)'}}><Spin indicator={antIcon} /></center>
    }else if (check==='success') {
        if (props.position.length<1 || props.position.includes(position)) {
            return React.cloneElement(props.children, {position: position, username:username, balance: balance});
        }
        return <Navigate to={props.failPosRedirect} replace={true} />
    } else {
        return <Navigate to={props.fail} replace={true}/>
    }
}

Hashcomp.defaultProps = {
    position: [],
    failPosRedirect: "/home",
    fail: "/"
}

export default Hashcomp