import React,{} from 'react';
import { PageHeader, Menu, Button,Dropdown,notification} from 'antd';
import { UserOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router'
import 'antd/dist/antd.min.css';
import '../assets/main.css';

const DropdownMenu = (props) => {
  const navigate = useNavigate()
  const logOut=()=>{
      fetch('/signout',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          'hashing': window.localStorage.getItem('hash')
      }
      }).then((res)=>{
        if(!res.ok){
          return{}
        }
        return res.json()
      }).then((res)=>{
        if(res.result==="success-logout"){
            console.log('Logged Out Successfully')
            notification.open({
              message: 'Logged Out',
              description:
                  'Successfully',
          });
            return navigate("/ ", {replace:true})
        }
        else{
          notification.open({
            message: 'Failed',
            description:
                'unable to logout :(',
        });
        }
      })
  }
  const menu = (
    <Menu>
      <Menu.Item disabled={true} key='0'>        
        <h3 style = {{
          backgroundColor: 'yellow'
        }}>{props.username.toUpperCase()}</h3>            
      </Menu.Item>
      {/* <Menu.Item disabled={true} key='0'>        
        <h3>Balnce: {props.balance}</h3>            
      </Menu.Item> */}
      <Menu.Item key='2' onClick={()=>{navigate("/mess/payment-history ")}}>        
        <h3>Mess Payment History </h3>            
      </Menu.Item>
      <Menu.Item key='3' onClick={()=>{navigate("/canteen/orders")}}>        
        <h3>Canteen Payment History </h3>            
      </Menu.Item>
      <Menu.Item key='4'>        
        <h3>Change Password</h3>            
      </Menu.Item>
      <Menu.Item key='1' onClick={logOut}>        
          <h3>Logout</h3>     
      </Menu.Item>
    </Menu>
  );
  return (
  <Dropdown key="more"  overlay={menu} placement="bottomRight">
    <Button type="text" icon={<UserOutlined style={{ fontSize: 20 }} />} />
  </Dropdown>
)};


var NavBar = (props) => {
    return (
      <div>
      <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Link to='/home'><h3>Foodium</h3></Link>}
                backIcon = {<ArrowLeftOutlined  style={{fontSize:'10h', paddingBottom:'1.4vh' }}/>}
                extra={[
                  <DropdownMenu key="more" username={props.username} balance={props.balance}/>
                ]}
            />
        
      </div>
    );
}

NavBar.defaultProps = {
  username: 'User'
}

export default NavBar;