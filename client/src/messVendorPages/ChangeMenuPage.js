import React, { useState, } from 'react';
import {Tabs, Layout, Drawer,  Button} from 'antd';
import { CloseOutlined  } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import VendorMenu from '../components/vendorMenu';
import AddMenuPage from './AddMenuPage';
const { Content, Footer } = Layout;
const { TabPane } = Tabs;
const ChangeMenuPage = (props) => {
    const [addItem, setAddItem] = useState(false) 
    const [time, setTime] = useState('breakfast')
    const [day, setDay] = useState('mo')
    let days = [
        'su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'
    ]
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content>
            <Tabs tabPosition={'top'} animated={{inkbar:false, tabPane:true}} centered={true}>
            {days.map((d, ind)=> {
                return <>
                    <TabPane tab={d} key={ind}>
                    <Tabs tabPosition={'top'} animated={{inkbar:false, tabPane:true}} centered={true}>
                        <TabPane tab='breakfast' key={0}>
                            <center>
                                <Button onClick={()=>{
                                setTime('breakfast')
                                setDay(d)
                                setAddItem(true)
                            }} >Add Item</Button></center>
                            <VendorMenu vendor={props.username} time='breakfast' day={d}/>
                        </TabPane>
                        <TabPane tab='lunch' key={1}>
                            <center><Button onClick={()=>{
                                setTime('lunch')
                                setDay(d)
                                setAddItem(true)
                            }} >Add Item</Button></center>
                            <VendorMenu vendor={props.username} time='lunch' day={d}/>
                        </TabPane>
                        <TabPane tab='dinner' key={2}>
                            <center><Button onClick={()=>{
                                setTime('dinner')
                                setDay(d)
                                setAddItem(true)
                            }} >Add Item</Button></center>
                            <VendorMenu vendor={props.username} time='dinner' day={d}/>
                        </TabPane>
                    </Tabs>
                    </TabPane>
                </>
            })}
            
            </Tabs>
            </Content>
            <Footer>
            <Drawer
                    title={<Button shape='circle' icon={<CloseOutlined /> } onClick={()=>{setAddItem(false)}}/>}
                    placement="right"
                    type={'Add MenuItem'}
                    onClose={()=>{setAddItem(false)}}
                    visible={addItem}
                    closable={false}
                    headerStyle={{ position: 'center',textAlign:'center' }}
                >
                <AddMenuPage username={props.username} time={time} day={day}/>
            </Drawer>
            </Footer>
            </Layout>
      );
}

export default ChangeMenuPage;