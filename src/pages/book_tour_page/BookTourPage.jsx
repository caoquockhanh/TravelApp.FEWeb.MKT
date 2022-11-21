import React, { useState, useEffect } from "react";
import {
    Space,
    Table,
    Tag,
    Spin,
    Button,
    Modal
} from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');
const url = 'http://localhost:8080/api/bookTour';

function BookTourPage(props) {

    const [dataSource, setDataSource] = useState([]);

    const [loading, setLoading] = useState(false);

    const [modal1Open, setModal1Open] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    //API get allbookTour
    var axios = require('axios');

    var config = {
        method: 'get',
        url: url,
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

            let arr = res.map(function (element) {
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


    //View Details (get one bookTour)
    function ViewDetails(record) {
        setModal1Open(true);
        //console.log(record.id);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/bookTour/' + record.id,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOk = () => {
        setModal1Open(false);
    };

    const handleCancel = () => {
        setModal1Open(false);
    };
    return (
        <>
            {/* Bảng book Tour */}
            <Table dataSource={dataSource} columns={columns} loading={loading ? <Spin /> : { indicator: <Spin />, spinning: false }}>
            </Table>

            {/* Modal xem chi tiết */}
            <Modal
                title="20px to Top"
                style={{
                    top: 20,
                }}
                visible={modal1Open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
}
export default BookTourPage;