import React, { useState, useEffect } from 'react';
import MenuCard from '../components/menuCard';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import { Card, Row, notification} from 'antd';
import { StarOutlined } from '@ant-design/icons';

const LiveReview = (props) => {
    const [data, setData] = useState([])
    let clean, speed, taste, overallFood, overallService = 0;
    const getData = () => {
        fetch("/mess/livereview/"+props.vendor, {
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
                    console.log(res.reviews.length)
                    setData(res.reviews)
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
        console.log(data)
    }
    , [])
    useEffect(()=> {
        console.log(data)
        data.forEach(() => {
            clean += data.clean;
            speed += data.speed;
            taste += data.taste;
            overallFood += data.overallFood;
            overallService += data.overallService;
        });
    }, [])
    return(
        <div>
            <div>
                <Card style={{width:props.width}}>
                    <Row gutter={[props.hg, props.vg]} justify="space-between">
                        Clean: {clean}<StarOutlined /><br/>
                        Speed: {speed}<StarOutlined /><br/>
                        Taste: {taste}<StarOutlined /><br/>
                        Overall Food: {overallFood}<StarOutlined /><br/>
                        Overall Service: {overallService}<StarOutlined /><br/>
                    </Row>
                </Card>
            </div>
            <div style={{padding:"5%"}}>
                {data.map((item, index) => {
                    const key = index + 1;
                    return (<MenuCard title={item.name} content={item.comment} key={key}/>);
                })}
            </div>
        </div>
    );
}

LiveReview.defaultProps = {
    vendor: "Kitchen"
}

export default LiveReview