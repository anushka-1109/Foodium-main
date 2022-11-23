import React,{ useState } from 'react';
import { Row,Col,  Card, Rate, Image, Typography } from 'antd';
import { UserOutlined, MenuOutlined, CloseOutlined,} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { Title } = Typography;
const MenuCard = (props) => {


    return (
        <Card style={{width:props.width}}>
            <Row gutter={[props.hg, props.vg]} justify="space-between">
                <Col span={props.spanc}>
                    <Title level={props.level}>{props.title}</Title>
                    <p>{props.content}</p>
                    Health: <Rate disabled defaultValue={props.rateh} /><br/>
                    Quality: <Rate disabled defaultValue={props.rateq} />
                </Col>
                <Col span={props.spani}>
                    <Image src={props.img} width={props.iwidth} height={props.iheight} style={{ objectFit: "cover" }}/>
                </Col>
            </Row>
        </Card>
    );
}

MenuCard.defaultProps = {
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

export default MenuCard