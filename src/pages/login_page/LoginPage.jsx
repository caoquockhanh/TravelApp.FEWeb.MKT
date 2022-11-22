import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.min.css'
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const url = {
    local: `http://localhost:8080/api/auth/signin`,
    ip: 'http://172.16.65.12:8080/api/auth/signin'
}
function LoginPage(props) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const cookies = new Cookies();

    const Swal = require('sweetalert2')

    var axios = require('axios');
    var data = JSON.stringify({
        "password": password,
        "username": username
    });
    function handleSubmit(e) {
        e.preventDefault();
        var config = {
            method: 'post',
            url: url.ip,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                cookies.set('token', response.data.accessToken, { path: '/' });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Đăng nhập thành công',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){
                    navigate('/home');
                    window.location.reload();
                 }, 1500);
                  
                  
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    title: 'Thông báo!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Đóng'
                  })
            });
    }

    return (

        <div style={{ width: "30%", margin: "auto", paddingTop: "120px" }}>
            <img src={require('./../../asset/img/logo.png')} style={{marginLeft: "38%", marginTop: '-50px'}}/>
            <h1 style={{ marginLeft: "38%", color: "#47B5FF" }}>Travel By Chrome</h1>
            <form onSubmit={handleSubmit}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                >
                    <Input onChange={e => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password onChange={e => setPassword(e.target.value)} />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item> */}
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </div>

            </form>
        </div>

    );
};

export default LoginPage;
