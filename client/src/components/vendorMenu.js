import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
import VMenuCard from '../components/VMenuCard';
import {isMobile} from 'react-device-detect';
import 'antd/dist/antd.min.css';
import '../assets/main.css';

const VendorMenu = (props) => {
    const [data, setData] = useState([])
    const getData = () => {
        console.log('entered getDATA VendorMenu')
        fetch("/mess/livemenu/"+props.vendor+'/'+props.day+'/'+props.time, {
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
                    console.log(res.menuItems)
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
        window.addEventListener('build', getData)
        window.addEventListener('mv', getData)
        getData()
    }, [])
    let iheight='150px';
    let iwidth='150px';
    let width='100vw';
    let isCenter=true
    if (isMobile) {
        iheight='15vh'
        iwidth='15vh'
        width='100vw'
        isCenter=false
    } else {
        iheight='10vw';
        iwidth='10vw';
        width='50vw'
    }
    return(
            <div style={{padding:"5%" }}>
                {data.map((item, index) => {
                    const key = index + 1;
                    if(isCenter){
                        return (<center>
                            <VMenuCard 
                            id={item._id}
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
                    return (<VMenuCard title={item.name} width={width} iheight={iheight} iwidth={iwidth} content={item.desc} key={key} rateh={item.health} rateq={item.quality} div={item.desc} img={item.image}/>);
                })}
                
            </div>
    );
}

VendorMenu.defaultProps = {
    vendor: "Kitchen",
    time: 'breakfast',
    day: 'mo'
}

export default VendorMenu