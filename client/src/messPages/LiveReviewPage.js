import { Tabs,Layout, notification } from 'antd';
import 'antd/dist/antd.min.css';
import '../assets/main.css';
import React, { useState ,useEffect} from 'react';
import LiveReview from '../components/LiveReview';
import NavBar from '../components/NavBar'
const { TabPane } = Tabs;
const { Content } = Layout;
const LiveReviewPage=(props)=>{
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
    getData()
    console.log(data)
}, [])
    return (
        <Layout>
          <NavBar username={props.username} balance={props.balance}/>
          <Content>
          <Tabs tabPosition={'top'} animated={{inkbar:false, tabPane:true}} centered={true}>
            {data.map((item,index)=>{
              const key=index+1
              return(<TabPane tab={item.value} key={key}>
                  <LiveReview vendor={item.value}/>
              </TabPane>)
            })}
            
          </Tabs>
          </Content>
          </Layout>
      );
}


export default LiveReviewPage