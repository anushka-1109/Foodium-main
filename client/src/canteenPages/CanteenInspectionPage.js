import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Typography, notification, Image, Rate, Card, Cascader} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import FileBase64 from 'react-file-base64';
import NavBar from '../components/NavBar'
import 'antd/dist/antd.min.css';
import '../assets/main.css';
const {Content } = Layout;
const { Title, Text } = Typography;

const CanteenInspectionPage = (props) => {
    const [rating, setRating] = useState(0);
    const [id, setID] = useState(0)
    const [data, setData] = useState([{
        value: 'Label',
        label: 'Label',
    }]);
    const handleRating = (val) => {
        setRating(val)
    }
    const [items, setItems] = useState([{
        value: 'Unknown',
        label: 'Unknown'
    }])
    const onFinish = (values) => {
        console.log(values)
        fetch("/canteen/updateitem", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            },
            body:JSON.stringify({
                _id: values.food_name,
                rating: rating,
                vendor: values.vendor[0],
            })
       }).then(
           (res) => {
            if (!res.ok) {
                return {}
           }
           return res.json()
        }
       ).then((res)=> {
        if (res.result==='success') {
            notification.open({
                message: 'success',
                description:
                    'success :)',
            });
        } else {
        notification.open({
            message: 'Failed',
            description:
                'unable to upload :(',
        });
        }
    })
    }
    const getData = () => {
        console.log("entered getDATA")
        fetch("/canteen/getvendors", {
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
                    // console.log(res.vendors)
                    setData(res.vendors.map(e=> {return {value: e, label: e}}))
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
    const getItems = async (vendor) => {
        let res = await fetch('/canteen/getmenu/'+vendor, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                'hashing': window.localStorage.getItem('hash')
            }
        })
        if (!res.ok) {
            return
        }
        res = await res.json()
        if (res.result==='success') {
            console.log(res.canteenItems)
            setItems(res.canteenItems.map(e=> {return {value: e._id, label: e.name}}))
        }
    }
    const onValueChange = (c, _a) => {
        console.log(c)
        if (Object.hasOwn(c, 'vendor')) {
            getItems(c.vendor)
        }
    }
    useEffect(()=> {
        getData()
    }, [])
    return (
        <Layout>
            <NavBar username={props.username} balance={props.balance}/>
            <Content style={{padding:'0vh 5vh'}}>
                <Title level={2}>Inspection Report</Title>
                <Form
                    onFinish={onFinish}
                    onValuesChange={onValueChange}
                >
                    <Form.Item
                            name="vendor"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Mess Name',
                                },
                            ]}
                        >
                            <Cascader options={data} placeholder='vendor name' />
                        </Form.Item>
                    <Form.Item
                        name="food_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of food item!',
                            },
                        ]}
                    >
                        <Cascader options={items} placeholder='food name' />
                    </Form.Item>
                    <Form.Item
                        name="quality"
                        rules={[
                            {
                                message: 'Please input your Quality!',
                            },
                        ]}
                    >
                    <Card>
                        <Text>Rating </Text><Rate  onChange={handleRating} value={rating} />
                    </Card>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className="login-form-button">
                            Upload
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default CanteenInspectionPage