import React, {useState, useEffect} from 'react';
import { Navigate} from 'react-router';
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Authenticate = (props) =>  {
    var [check, setCheck] = useState('wait')
    var [position, setPosition] = useState("wait")
    const getauth = () => {
        fetch('/authenticate', {
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
                } else {
                    setPosition('error')
                    setCheck('error')
                }
            }
        )
    }
    useEffect(()=> {
        console.log('entered authentication loop')
        getauth()
        return ()=> {
            setPosition('wait')
            setCheck('wait')
        }
    }, [])
    const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;
    if (check==='wait' || position==='wait') {
        return <center style={{margin:'0' ,left: '50%', position: 'absolute',top: '50%', transform: 'translate(-50%, -50%)'}}><Spin indicator={antIcon} /></center>
    }else if (check==='success') {
        if (props.position.length<1 || props.position.includes(position)) {
            return props.children;
        }
        return <Navigate to={props.failPosRedirect} replace={true}/>
    } else {
        return <Navigate to={props.fail} replace={true}/>
    }
}

Authenticate.defaultProps = {
    position: ["Student"],
    failPosRedirect: "/home",
    fail: "/"
}

export default Authenticate