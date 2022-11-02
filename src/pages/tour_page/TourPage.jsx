import React, { useState, useEffect } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Spin, Modal, Form, Input, Select } from 'antd';
import Cookies from 'universal-cookie';
import './css/TourPage.css';

const cookies = new Cookies();
const token = cookies.get('token');

const { Option } = Select;

function TourPage() {

    const Swal = require('sweetalert2')

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    //API get list tour
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:8080/api/tours',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };
    //setLoading(true);
    axios(config)
        .then(function (response) {
            //console.log(response.data);
            setDataSource(response.data);
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        });

    const { Column } = Table;

    const [dataSource, setDataSource] = useState([]);

    //Lưu id Tour
    const [uid, setUid] = useState('');

    const [visible, setVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    //Modal thêm Tour
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const showModal = () => {
        setVisible(true)
    }
    const handleOk = () => {
        console.log("Ok");
    };
    const handleCancel = () => {
        setVisible(false)
        setIsModalOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setVisible(true)
        setIsModalOpen(true)
    };

    //API thêm Tour
    const handleSubmit = (values) => {
        console.log(values)
        var axios = require('axios');
        var data = JSON.stringify({
            "banner": "string",
            "basePrice": values.basePrice,
            "introduce": values.introduce,
            "phone": values.phone,
            "rating": values.rating,
            "tourName": values.tourName,
            "tourPlan": values.tourPlan,
            "tourTime": values.tourTime,
            "types": [
                values.types
            ]
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8080/api/tours',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Thêm Tour thành công!',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
                // setTimeout(function () {
                //     setVisible(false)
                //     form.resetFields()
                // }, 1400);
                setVisible(false)
                form.resetFields()
            })
            .catch(function (error) {
                //console.log(error);
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Thêm thất bại',
                //     text: error.message,
                // })
                setVisible(false)
                form.resetFields()
            });
    }

    //Button edit Tour
    const editTour = (record) => {
        setIsModalOpen(true);
        //API get one Tour
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/tours/' + record.id,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data.id);
                //Lấy id Tour lưu vào state khi Click
                setUid(response.data.id);
                form1.setFieldsValue({
                    tourName1: response.data.tourName,
                    introduce1: response.data.introduce,
                    rating1: response.data.rating,
                    tourPlan1: response.data.tourPlan,
                    phone1: response.data.phone,
                    tourTime1: response.data.tourTime,
                    basePrice1: response.data.basePrice,
                    // type1: response.data.type,
                });
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    //Event handle Update Tour
    const handleSubmit1 = (values) => {
        //console.log(values);
        //API sửa Tour
        var axios = require('axios');
        var data = JSON.stringify({
            "banner": "string",
            "basePrice": values.basePrice1,
            "introduce": values.introduce1,
            "phone": values.phone1,
            "rating": values.rating1,
            "tourName": values.tourName1,
            "tourPlan": values.tourPlan1,
            "tourTime": values.tourTime1,
            "types": [
                values.type1,
            ]
        });

        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/tours/' + uid,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật Tour thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () {
                    setIsModalOpen(false)
                }, 1400);
            })
            .catch(function (error) {
                //console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: error.message,
                })
            });
    }

    //Modal confim xóa Tour
    const { confirm } = Modal;
    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Bạn chắc chắn muốn xóa Tour này chứ?',
            icon: <ExclamationCircleOutlined />,
            content: "Tên Tour: " + record.tourName,
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                //API xóa Tour
                var axios = require('axios');
                var config = {
                    method: 'delete',
                    url: 'http://localhost:8080/api/tours/' + record.id,
                    headers: {
                        'accept': '*/*',
                        'Authorization': 'Bearer ' + token,
                    }
                };

                axios(config)
                    .then(function (response) {
                        //console.log(JSON.stringify(response.data));
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa Tour thành công!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // Căn layout input Modal
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const Rule = ({ color }) => (
        <hr
            style={{
                borderColor: color,
            }}
        />
    );

    return (
        <>
            <div style={{ width: '100%' }}>

                <Button type="primary" style={{ float: 'right', marginBottom: '20px' }} onClick={showModal}>Thêm Tour</Button>
                {/* Modal thêm Tour */}
                <Modal
                    open={visible}
                    title="Thêm Tour"
                    onOk={form.submit}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form {...layout} onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        form={form}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên Tour"
                            name="tourName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên Tour!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Introduce"
                            name="introduce"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Introduce!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Rating!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Plan"
                            name="tourPlan"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Tour Plan!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Phone!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Time"
                            name="tourTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Tour Time!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="types"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn Types!',
                                },
                            ]}
                        >
                            <Select defaultValue="Vui lòng chọn...">
                                <Option value="mount">Núi</Option>
                                <Option value="nature">Thiên nhiên</Option>
                                <Option value="sea">Biển</Option>
                                <Option value="normal">Bình thường</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Base Price"
                            name="basePrice"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Base Price!',
                                },
                            ]}
                        >
                            <Input maxLength={16} />
                        </Form.Item>
                        <Rule color="#FAF7F0" />
                        {/* Button */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '5px' }}>
                            <Button key="back" onClick={handleCancel} style={{ marginRight: '20px' }}>
                                Đóng
                            </Button>

                            <Button key="submit" type="primary" htmlType="submit" onClick={handleOk}>
                                Thêm
                            </Button>
                        </div>
                    </Form>
                </Modal>
                {/* Modal cập nhật Tour */}
                <Modal
                    open={isModalOpen}
                    title="Cập nhật Tour"
                    onOk={form1.submit}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form {...layout} onFinish={handleSubmit1}
                        onFinishFailed={onFinishFailed}
                        form={form1}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên Tour"
                            name="tourName1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Introduce"
                            name="introduce1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Plan"
                            name="tourPlan1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Time"
                            name="tourTime1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="types1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Select defaultValue="Vui lòng chọn...">
                                <Option value="mount">Núi</Option>
                                <Option value="nature">Thiên nhiên</Option>
                                <Option value="sea">Biển</Option>
                                <Option value="normal">Bình thường</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Base Price"
                            name="basePrice1"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input maxLength={16} />
                        </Form.Item>
                        <Rule color="#FAF7F0" />
                        {/* Button */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '5px' }}>
                            <Button key="back" onClick={handleCancel} style={{ marginRight: '20px' }}>
                                Đóng
                            </Button>

                            <Button key="submit" type="primary" htmlType="submit" onClick={handleOk}>
                                Cập nhật
                            </Button>
                        </div>
                    </Form>
                </Modal>
                {/* Hiển thị bảng chứa các Tour */}
                <Table dataSource={dataSource} loading={loading ? <Spin /> : { indicator: <Spin />, spinning: false }}>
                    <Column title="Tên Tour" dataIndex="tourName" key="tourName" />
                    <Column title="Introduce" dataIndex="introduce" key="introduce" />
                    <Column title="Rating" dataIndex="rating" key="rating" />
                    <Column title="Tour Plan" dataIndex="tourPlan" key="tourPlan" />
                    <Column title="Phone" dataIndex="phone" key="phone" />
                    <Column title="Tour Time" dataIndex="tourTime" key="tourTime" />
                    <Column title="Base Price" dataIndex="basePrice" key="basePrice" />

                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button primary>Xem ảnh</Button>
                                <Button style={{ borderColor: "#FF884B", color: '#FF884B' }} onClick={() => { editTour(record) }}>Sửa</Button>
                                <Button danger onClick={() => { showDeleteConfirm(record) }}>Xóa</Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </>
    )
}
export default TourPage;