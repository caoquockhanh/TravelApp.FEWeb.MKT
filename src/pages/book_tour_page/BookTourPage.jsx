import React, { useState, useEffect } from "react";
import {
    Space,
    Table,
    Tag,
    Spin,
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');
const url = {
    getAllTour: 'http://localhost:8080/api/bookTour',
    getOneTour: 'http://localhost:8080/api/bookTour/',
}

function BookTourPage(props) {

    const [dataSource, setDataSource] = useState([]);

    const [loading, setLoading] = useState(false);

    const [modal1Open, setModal1Open] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])


    //API get allbookTour
    var axios = require('axios');

    var config = {
        method: 'get',
        url: url.getAllTour,
        headers: {
            'accept': '*/*',
            'Authorization': 'Bearer ' + token,
        }
    };
    axios(config)
        .then(function (response) {
            //console.log(response.data);
            setLoading(false);
            var res = response.data;
            setDataSource(response.data);

            res.map(function (element) {
                //console.log(element);
                if (element.isCanceled === true) {
                    element.isCanceled = <Tag color="red">Đã hủy</Tag>;
                }
                if (element.isCanceled === false) {
                    element.isCanceled = <Tag color="blue">Đã đặt</Tag>;

                }
                return element.user.fullName && element.tour.tourName && String(element.isCanceled);
            })
            //console.log(arr);

        })
        .catch(function (error) {
            console.log(error);
        });

    //Buid table
    const columns = [
        {
            title: 'Tên tour',
            render: (_, data) => <p> {data.tour.tourName}</p>,
        },
        {
            title: 'Tên người đặt',
            render: (_, data) => <p> {data.user.fullName}</p>,
        },
        {
            title: 'Trạng thái tour',
            dataIndex: 'isCanceled',
        },
        {
            title: 'Action',
            render: (_, record) =>
                <Space size="middle">
                    <Button style={{ backgroundColor: "#C539B4", borderColor: "#C539B4", color: '#EFF5F5' }} onClick={() => { ViewDetails(record) }}>Xem chi tiết</Button>
                </Space>

        },
    ];

    const handleOk = () => {
        setModal1Open(false);
    };

    const handleCancel = () => {
        setModal1Open(false);
    };

    //View Details (get one bookTour)
    function ViewDetails(record) {
        setModal1Open(true);
        //console.log(record.id);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: url.getOneTour + record.id,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);

                form.setFieldsValue({
                    fullName: response.data.user.fullName,
                    phone: response.data.user.phoneNumber,
                    email: response.data.user.email,
                    tourName: response.data.tour.tourName,
                    tourPlace: response.data.tour.tourPlace,
                    introduce: response.data.tour.introduce,
                    child: response.data.child,
                    adult: response.data.adult,
                    totalPrice: response.data.totalPrice,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
            {/* Bảng book Tour */}
            <Table dataSource={dataSource} columns={columns} loading={loading ? <Spin /> : { indicator: <Spin />, spinning: false }}>
            </Table>

            {/* Modal xem chi tiết */}
            <Modal
                title="Thông tin chi tiết"
                style={{
                    top: 5,
                }}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                open={modal1Open}
            >
                <Form {...layout}
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <h3>Thông tin người dùng</h3>
                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>
                    <h3>Thông tin Tour</h3>
                    <Form.Item
                        label="Tên tour"
                        name="tourName"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Địa điểm"
                        name="tourPlace"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Thời gian"
                        name="timePicker"
                    >
                        <Input defaultValue={'Thứ 2 - Thứ 7 • 08:15 - 16:30'} disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Thông tin"
                        name="introduce"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Trẻ em"
                        name="child"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Người lớn"
                        name="adult"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>

                    <Form.Item
                        label="Tổng tiền"
                        name="totalPrice"
                    >
                        <Input disabled={true} style={{ color: 'black' }} />
                    </Form.Item>
                    <Rule color="#FAF7F0" />
                    {/* Button */}
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
                        <Button key="submit" type="primary" htmlType="submit" onClick={handleOk} style={{ width: '120px', height: '45px', borderRadius: '10px', backgroundColor: "#C539B4", borderColor: "#C539B4", color: '#EFF5F5' }}>
                            Xác nhận
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
export default BookTourPage;