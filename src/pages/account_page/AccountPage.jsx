import {
    BlockOutlined,
    ClusterOutlined,
    DashboardOutlined,
    MenuOutlined,
    OrderedListOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Input, Space, Button } from 'antd';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import "./css/accountpage.css"

const cookies = new Cookies();
const token = cookies.get('token');

function AccountPage() {
    const [collapsed, setCollapsed] = useState(false);

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //API get Account Infomation
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://localhost:8080/api/user/my',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };

    axios(config)
        .then(function (response) {
            console.log(response.data);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPhone(response.data.phoneNumber);
            if (response.data.fullName == null) {
                setFullname("Chưa cập nhật tên");
            } else {
                setFullname(response.data.fullName);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <><div style={{width: '30%'}}>
<h1>Hello, {fullname}</h1>
        </div>
        <div style={{width: '70%', float: 'right'}}>
            <Space direction="vertical" style={{width: '100%'}}>
                    <Input addonBefore="http://" defaultValue="mysite" />
                    <Input addonBefore="http://" defaultValue="mysite" />
                    <Input addonBefore="http://" defaultValue="mysite" />   
                </Space>
            </div></>


    )
}
export default AccountPage;