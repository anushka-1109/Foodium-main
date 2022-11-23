import { Tabs, Layout, notification } from 'antd';
import React, { useState ,useEffect} from 'react';
import LiveMenu from '../components/LiveMenu';
import NavBar from '../components/NavBar'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const { TabPane } = Tabs;
const { Content } = Layout;
const LiveMenuPage=(props)=>{
  const [data, setData] = useState([]);
  const getData = () => {
    console.log("entered getDATA")
    fetch("/mess/messvendors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'hashing': window.localStorage.getItem('hash')
        }
    }).then((res) => {
        if (!res.ok) {
            return {}
        }
        return res.json()
    }).then(
        (res) => {
            if (res.result==="success") {
                // console.log(res.menuItems)
                setData(res.vendors)
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
    
    return (
        <Layout>
          <NavBar username={props.username} balance={props.balance}/>
          <Content>
          <Tabs tabPosition={'top'} animated={{inkbar:false, tabPane:true}} centered={true}>
            {data.map((item,index)=>{
              const key=index+1
              return(<TabPane tab={item.value} key={key}>
                  <LiveMenu vendor={item.value}/>
              </TabPane>)
            })}
            
          </Tabs>
          </Content>
          </Layout>
      );
}


export default LiveMenuPage
  
    
 

