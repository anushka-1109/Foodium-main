import React,{ } from 'react';
import { Row,Col,  Card, Rate, Image, Typography, Button } from 'antd';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Title } = Typography;

const SMenuCard = (props) => {
    return (
        <Card style={{width:props.width}}>
            <Row gutter={[props.hg, props.vg]} justify="space-between">
                <Col span={props.spanc}>
                    <Title level={props.level}>{props.title}</Title>
                    <p>{props.content}</p>
                    Health: <Rate disabled defaultValue={props.rateh} /><br/>
                    Quality: <Rate disabled defaultValue={props.rateq} /><br/>
                </Col>
                <Col span={props.spani}>
                    <Image src={props.img} width={props.iwidth} height={props.iheight} style={{ objectFit: "cover" }}/>
                </Col>
            </Row>
        </Card>
    );
}

SMenuCard.defaultProps = {
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

export default SMenuCard