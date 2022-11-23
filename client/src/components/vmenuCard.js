import React,{ } from 'react';
import { Row,Col,  Card, Rate, Image, Typography, Button } from 'antd';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Title } = Typography;

const VMenuCard = (props) => {
    const handleDelete = () =>{
        fetch('/mess/deleteitem', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body: JSON.stringify({
                _id: props.id
            })
        }).then(res=>{
            if (!res.ok)
                return {}
            return res.json()
        }).then((res)=> {
            if (res.result==='success')
                console.log('SUCCESSFUL DELETION')
            const event = new Event('mv');
            window.dispatchEvent(event)
        })
    }
    return (
        <Card style={{width:props.width}}>
            <Row gutter={[props.hg, props.vg]} justify="space-between">
                <Col span={props.spanc}>
                    <Title level={props.level}>{props.title}</Title>
                    <p>{props.content}</p>
                    Health: <Rate disabled defaultValue={props.rateh} /><br/>
                    Quality: <Rate disabled defaultValue={props.rateq} /><br/>
                    <Button onClick={handleDelete}>Delete Item</Button>
                </Col>
                <Col span={props.spani}>
                    <Image src={props.img} width={props.iwidth} height={props.iheight} style={{ objectFit: "cover" }}/>
                </Col>
            </Row>
        </Card>
    );
}

VMenuCard.defaultProps = {
    iwidth: "150px",
    iheight: "150px",
    width: "100vw",
    // height: "22vh",
    hg: 6,
    vg: 6,
    spanc: 12,
    spani: 10,
    img: '',
    content: "nothing",
    title: "Not",
    level: 3,
    rateh: 2,
    rateq: 2

}

export default VMenuCard