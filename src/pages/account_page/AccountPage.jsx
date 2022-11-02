import { Input, Space, Button, Modal, Form } from 'antd';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import "./css/accountpage.css"

const cookies = new Cookies();
const token = cookies.get('token');


function AccountPage() {

    const Swal = require('sweetalert2')

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e) => {
        setIsModalOpen(true);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const [form] = Form.useForm();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

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
            //setvalue input antd
            form.setFieldsValue({
                email: email,
                taikhoan: username,
                fullname: fullname,
                sdt: phone,
                //passwd: password,
            });

            //console.log(response.data);
            setUsername(response.data.username);
            setPassword(response.data.password)
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

    const onFinish = (values) => {
        //onFinish logic here
        console.log(values);
        //API update my account
        var axios = require('axios');
        var data = JSON.stringify({
            "email": values.email,
            "fullName": values.fullname,
            "phoneNumber": values.sdt,
            "username": values.taikhoan,
        });

        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/user/my',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật tài khoản thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onSubmit = (values) => {
        console.log(values.passwd);
        //API change password
        var axios = require('axios');
        var data = values.passwd;

        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/user/password',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div style={{ display: 'flex', }}>
                <div style={{ width: '30%', borderRight: '2px solid grey' }}>
                    <h1>Hello, {username}</h1>
                </div>
                <div style={{ width: '70%', paddingLeft: '30px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Form name="nest-messages" form={form} onFinish={onFinish}>
                            <Form.Item name="taikhoan" >
                                {/* <Input style={{ paddingBottom: '10px' }} addonBefore="Tài khoản" placeholder={"Your username"}/> */}
                            </Form.Item>
                            <Form.Item name="email" >
                                <Input style={{ paddingBottom: '10px' }} addonBefore="Email" placeholder={"Your email"} />
                            </Form.Item>
                            <Form.Item name="fullname" >
                                <Input style={{ paddingBottom: '10px' }} addonBefore="Họ và tên" placeholder={"Your name"} />
                            </Form.Item>
                            <Form.Item name="sdt" >
                                <Input style={{ paddingBottom: '10px' }} addonBefore="Điện thoại" placeholder={"Your phone"} />
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button danger onClick={showModal}>Đổi mật khẩu</Button>
                                <Button type="primary" htmlType='submit'>Cập nhật thông tin</Button>
                            </div>
                        </Form>
                    </Space>


                    <Modal id="myForm" title="Mật khẩu mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        <Form name="nest-messages" form={form} onFinish={onSubmit}>
                            <Form.Item name="passwd" >
                                <Input style={{ paddingBottom: '10px' }} addonBefore="Mật khẩu" placeholder={"Your Password"} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: '30%' }}>Cập nhật mật khẩu mới</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div></>
    )
}
export default AccountPage;