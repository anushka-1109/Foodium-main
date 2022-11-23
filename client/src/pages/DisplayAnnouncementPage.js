import { Layout, notification, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import AnnouncementCard from '../components/announcementCard';
import {isMobile} from 'react-device-detect';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import NavBar from '../components/NavBar'

const { Title} = Typography;
const { Content } = Layout;

const LiveMenu = (props) => {
    const [data, setData] = useState([])
    const getData = () => {
        fetch("/fetchannouncement", {
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
                    console.log(res.announcement)
                    setData(res.announcement)
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
    let [width, isCenter] = isMobile ? ['100vw', false] : ['50vw', true]
    return(
        <Layout>
            <NavBar username={props.username}/>

            <Content style={{padding:'0vh 5vh'}}>
                <Title level={2}>Announcements</Title>
            </Content>

            <div style={{padding:"5%" }}>
                
                {data.map((item, index) => {
                    if(isCenter){
                        return (<center>
                            <AnnouncementCard 
                            title={item.title} 
                            description={item.description}
                            width={width} /></center>);
                    }
                    return (
                        <AnnouncementCard 
                        title={item.title} 
                        description={item.description}
                        width={width} />);
                    
                })}
                
            </div>
        </Layout>
    );
}

export default LiveMenu