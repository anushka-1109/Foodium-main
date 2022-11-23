import { Layout, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import MenuCard from '../components/menuCard';
import {isMobile} from 'react-device-detect';
import 'antd/dist/antd.min.css';
import '../assets/main.css';

const { Content } = Layout;

const LiveMenu = (props) => {
    const [data, setData] = useState([])
    const today = new Date()
    let d = today.getDay()
    let h = today.getHours()
    let days = [
        'su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'
    ]
    let day = days[d]
    if (h<10) {
        h = 'breakfast'
    } else if (h<15){
        h='lunch'
    } else {
        h='dinner'
    }
    const getData = () => {
        fetch("/mess/livemenu/"+props.vendor+'/'+day+'/'+h, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        }).then((res)=> {
            if (!res.ok) {
                return {}
            }
            return res.json()
        }).then(
            (res) => {
                if (res.result==="success") {
                    console.log(res.menuItems.length)
                    setData(res.menuItems)
                } else {
                    notification.open({
                        message: 'Failed',
                        description:
                            'unable to fetch Data :(',
                    });
                }
            }
        )
    }

    useEffect(()=> {
        getData()
    }, [])
    let [iheight, iwidth, width, isCenter] = isMobile ? ['15vh', '15vh', '100vw', false] : ['10vw', '10vw', '50vw', true]
    return(
            <div style={{padding:"5%" }}>
                
                
                {data.map((item, index) => {
                    const key = index + 1;
                    if(isCenter){
                        return (<center>
                            <MenuCard 
                            title={item.name} 
                            width={width} 
                            iheight={iheight} 
                            iwidth={iwidth} 
                            content={item.desc} 
                            key={key} 
                            rateh={item.health} 
                            rateq={item.quality} 
                            div={item.desc} 
                            img={item.image}/></center>);
                    }
                    return (<MenuCard title={item.name} width={width} iheight={iheight} iwidth={iwidth} content={item.desc} key={key} rateh={item.health} rateq={item.quality} div={item.desc} img={item.image}/>);
                    
                })}
                
            </div>
    );
}

LiveMenu.defaultProps = {
    vendor: "Kitchen",
}

export default LiveMenu