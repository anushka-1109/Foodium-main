import { Avatar,Layout,Card,Col, Typography,Row} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom';
import { faCashRegister,faBookOpenReader,faBullhorn,faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../components/NavBar'
const { Content } = Layout;

const { Title } = Typography;

const MessVendorHomePage=(props)=>{
    var compstor = [
        {ic: faCashRegister, name: 'Change Pin', link: '/mess-vendor/change-pin', id: 111},
        {ic: faMoneyBill, name: 'Change Price', link: "/mess-vendor/change-price", id: 211},     
        {ic: faBookOpenReader, name: 'Change Menu', link: '/mess-vendor/change-menu', id: 311},
        {ic: faBullhorn, name: 'Announcement', link: '/mess-vendor/post-announcement', id: 511},
    ]
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
export default MessVendorHomePage;

