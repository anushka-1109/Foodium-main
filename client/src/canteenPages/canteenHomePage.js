import { Avatar,Layout,Card,Col, Typography,Row} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom';
import { faBagShopping,faBullhorn,faUtensils,faFilePen,faUpload } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../components/NavBar'
const { Content } = Layout;

const { Title } = Typography;

const CanteenHomePage=(props)=>{
    var compstor = [
        {ic: faUtensils, name: 'Menu', link: '/canteen/menu/choose', id: 411},
        {ic: faBagShopping, name: 'Orders', link: '/canteen/orders', id: 111},    
        {ic: faFilePen, name: 'Feedback', link: '/mess/feedback', id: 511},
        {ic: faBullhorn, name: 'Announcements', link: "/canteen/display-announcement", id: 211}, 
    ]
    if (props.position=='Canteen Inspector')
        compstor.push({ic: faUpload, name: 'Inspection', link: '/canteen/inspection', id: 311})
    const [hg, vg, span,size, mg] = isMobile ? [4, 0, 12, 150, -5] : [10, 15, 7,200, -5];

    return <>
        <Layout  style={{overflowX: 'hidden',height:'100vh', width:'100vw'}}>
        <NavBar username={props.username} balance={props.balance}/>
            <Content >
                <div className="site-card-wrapper">
                    <Row gutter={[hg, vg]} justify='center' style={{ marginTop:{mg}}}>
                        {compstor.map(comp => 
                            <Col span={span} id={comp.id} key={comp.id}>
                                        <Link to={comp.link}>
                                            <Card style={{backgroundColor:'#f1f1f1'}} >
                                                <center>
                                                <Avatar style={{margin:"auto", display:'block', backgroundColor: 'rgba(100, 0, 0, 0.85)'}} size={size} 
                                                        icon={<FontAwesomeIcon icon={ comp.ic }/>}
                                                />
                                                <Title level={5}>{comp.name}</Title>
                                                </center>
                                            </Card>
                                        </Link>
                                    </Col>
                            )}
                    </Row>
                </div>
            </Content> 
        </Layout>
    </>   
}
export default CanteenHomePage;

