import { Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import host from './../../asset/Host/host.js'

function SignUpPage(props) {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [navigate, setNavigate] = useState(false);
    
    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
            phoneNumber
        };
        await axios.post('http://localhost:8080/api/auth/signup', data)
            .then(res => 
                {
                    console.log(res);
                })
                .catch(err => 
                    {
                        console.log(err);
                    })
      }

    const submit = async e => {
        e.prenvenDefault();
        

       
        // setNavigate(true);
    }


    // if(navigate)
    // {
    //     return <Navigate to="/login"/>
    // }

    return (
        

        <div style={{ width: "40%", margin: "auto", paddingTop: "120px" }}>
            <h1 style={{ marginLeft: "50%", color: "#47B5FF" }}>Travel By KTM</h1>
            <form onSubmit={handleSubmit} 
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            >
                
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập tài khoản Email!' }]}
                >
                    <input onChange={e => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
                >
                    <input onChange={e => setPhoneNumber(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                >
                    <input onChange={e => setUserName(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <input type={'password'} onChange={e => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType='submit'>
                        Đăng kí Now
                    </Button>
                    
                </Form.Item>
                
            </form>
        </div>

    );
};

export default SignUpPage;
