import React, { useState, useEffect } from "react";
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
    Space,
    Table,
    Button,
    Spin,
    Modal,
    Form,
    Input,
    Select,
    Image,
} from 'antd';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import './css/TourPage.css';

const cookies = new Cookies();
const token = cookies.get('token');

const { Option } = Select;

const { TextArea } = Input;

function TourPage() {

    const Swal = require('sweetalert2')

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    //API get list tour (Hiển thị danh sách các Tour)
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://172.16.65.12:8080/api/tours',
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

    const [uid1, setUid1] = useState('');

    const [visible, setVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modal1Open, setModal1Open] = useState(false);

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
        setModal1Open(false)
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setVisible(true)
        //setIsModalOpen(true)
    };

    //API thêm Tour
    const handleSubmit = (values) => {
        //console.log(values)
        var axios = require('axios');
        var data = JSON.stringify({
            "banner": "string",
            "basePrice": values.basePrice,
            "introduce": values.introduce,
            "phone": values.phone,
            "rating": values.rating,
            "tourName": values.tourName,
            "tourPlan": values.tourPlan,
            "tourPlace": values.tourPlace,
            "types": [
                values.types
            ]
        });

        var config = {
            method: 'post',
            url: 'http://172.16.65.12:8080/api/tours',
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
                    title: 'Thêm Tour thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () {
                    setVisible(false)
                    form.resetFields()
                    window.location.reload();
                }, 1400);
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Thêm thất bại',
                    text: error.message,
                })
                setVisible(true)
                //form.resetFields()
            });
    }

    //Event show Image Upload
    const [previewImage, setPreviewImage] = useState('');
    const viewPicture = (record) => {
        //console.log(record.id);
        setUid1(record.id)
        setModal1Open(true)
        setPreviewImage('http://172.16.65.12:8080/api/tours/image?id=' + record.id)
        //
        var config = {
            method: 'get',
            url: 'http://172.16.65.12:8080/api/tours/image?id=' + record.id,
            headers: {
                'accept': 'image/jpeg',
                'Authorization': 'Bearer ' + token,
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response);
                form.resetFields()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Button edit Tour
    const editTour = (record) => {
        setVisible(false)
        setIsModalOpen(true);
        //API get one Tour
        var axios = require('axios');
        var loai;
        var config = {
            method: 'get',
            url: 'http://172.16.65.12:8080/api/tours/' + record.id,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                //Lấy id Tour lưu vào state khi Click
                setUid(response.data.id);
                var res = response.data.types;
                $.each(res, (i) => {
                    loai = res[i].id;
                    //console.log(loai);
                })
                form1.setFieldsValue({
                    tourName1: response.data.tourName,
                    introduce1: response.data.introduce,
                    rating1: response.data.rating,
                    tourPlan1: response.data.tourPlan,
                    phone1: response.data.phone,
                    tourPlace1: response.data.tourPlace,
                    basePrice1: response.data.basePrice,
                    types1: loai,
                });
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    //Event handle Update Tour
    const handleSubmit1 = (values) => {
        //API sửa Tour
        var axios = require('axios');
        var data = JSON.stringify({
            "basePrice": values.basePrice1,
            "introduce": values.introduce1,
            "phone": values.phone1,
            "rating": values.rating1,
            "tourName": values.tourName1,
            "tourPlan": values.tourPlan1,
            "tourPlace": values.tourPlace1,
            "types": [
                {
                    "id": values.types1
                }
            ]
        });

        var config = {
            method: 'put',
            url: 'http://172.16.65.12:8080/api/tours/' + uid,
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
                    url: 'http://172.16.65.12:8080/api/tours/' + record.id,
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

    //Image
    const [image, setImage] = useState(null);
    const handleImage = (e) => {
        //console.log(e.target.files);
        setImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }

    const onFinish = (e) => {
        //console.log(e);
        var axios = require('axios');
        const data = new FormData();
        data.append('image', image);

        var config = {
            method: 'put',
            url: 'http://172.16.65.12:8080/api/tours/image?id=' + uid1,
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật Banner thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () {
                    setModal1Open(false)
                    form.resetFields();
                }, 1400);
            })
            .catch(function (error) {
                //console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: error.message,
                })
                form.resetFields();
            });
    }

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
                            label="Tour Name"
                            name="tourName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng không để trống ô này!',
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
                                    message: 'Vui lòng không để trống ô này!',
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
                                    message: 'Vui lòng không để trống ô này!',
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
                                    message: 'Vui lòng không để trống ô này!',
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
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Place"
                            name="tourPlace"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="types"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng không để trống ô này!',
                                },
                            ]}
                        >
                            <Select defaultValue="Vui lòng chọn...">
                                <Option value="recommend">Khuyến nghị</Option>
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

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Introduce"
                            name="introduce1"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating1"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Plan"
                            name="tourPlan1"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone1"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tour Place"
                            name="tourPlace1"

                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="types1"

                        >
                            <Select defaultValue="Vui lòng chọn...">
                                <Option value="637776457952f95763843331">Khuyến nghị</Option>
                                <Option value="635a0274843f5bf7652e4ebc">Núi</Option>
                                <Option value="635a02a4843f5bf7652e4ebd">Thiên nhiên</Option>
                                <Option value="635a02b3843f5bf7652e4ebe">Biển</Option>
                                <Option value="635a02cf843f5bf7652e4ebf">Bình thường</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Base Price"
                            name="basePrice1"

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
                {/* Modal cập nhật Image */}
                <Modal
                    title="Ảnh"
                    style={{
                        top: 20,
                    }}
                    visible={modal1Open}
                    onOk={() => setModal1Open(false)}
                    onCancel={() => setModal1Open(false)}
                    footer={null}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h4>Vui lòng chọn Banner</h4>
                        <Form.Item
                            name="image"
                            style={{ width: '100%' }}
                        >
                            <Input type="file" onChange={handleImage} accept="image/*" />
                        </Form.Item>

                        <h4 style={{ paddingTop: '10px' }}>Banner</h4>
                        <Image
                            width={350}
                            src={previewImage}
                            defaultValue={previewImage}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        />


                        <br />
                        <Rule color="#FAF7F0" />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '5px' }}>
                            <Button key="back" onClick={handleCancel} style={{ marginRight: '20px' }}>
                                Đóng
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Upload
                            </Button>
                        </div>
                    </Form>


                </Modal>
                {/* Hiển thị bảng chứa các Tour */}
                <Table dataSource={dataSource} loading={loading ? <Spin /> : { indicator: <Spin />, spinning: false }}>
                    <Column title="Tour Name" dataIndex="tourName" key="tourName" />
                    <Column title="Introduce" dataIndex="introduce" key="introduce" />
                    <Column title="Rating" dataIndex="rating" key="rating" />
                    <Column title="Tour Plan" dataIndex="tourPlan" key="tourPlan" />
                    <Column title="Phone" dataIndex="phone" key="phone" />
                    <Column title="Tour Place" dataIndex="tourPlace" key="tourPlace" />
                    <Column title="Base Price" dataIndex="basePrice" key="basePrice" render={(value) => {
                        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
                    }} />

                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button style={{ borderColor: "#8D9EFF", color: '#8D9EFF' }} primary onClick={() => { viewPicture(record) }}>Xem ảnh</Button>
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