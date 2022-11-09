import React, { useState } from 'react';
import "./css/homepage.css"
import { Card, Avatar, message, Image, Modal, Row, Col } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

function HomePage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  }
  const showModal2 = () => {
    setIsModalOpen2(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const error = () => {
    message.error('Chức năng đang trong quá trình phát triển!');
  };

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <div className='banner' style={{ display: 'flex', justifyContent: 'center', fontSize: '3vh' }}>
        <h1 style={{ color: '#6C4AB6', paddingBottom: '10px' }}>Admin Web quản lí Tour của nhóm Chrome</h1>
      </div>
      <h2 style={{ color: '#3F3B6C' }}>Thành viên nhóm gồm: </h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Card
          hoverable
          style={{ width: 250 }}
          cover={
            <Image
              alt="example"
              src={require('./../../asset/img/buihuuthong.jpg')}
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error} />,
            <EditOutlined key="edit" onClick={error} />,
            <EyeOutlined key="ellipsis" onClick={showModal} />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Bùi Hữu Thông"
            description="Chức vụ: Leader"
          />
        </Card>

        <Card
          hoverable
          style={{ width: 250 }}
          cover={
            <Image
              alt="example"
              src={require('./../../asset/img/caoquockhanh.jpg')}
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error} />,
            <EditOutlined key="edit" onClick={error} />,
            <EyeOutlined key="ellipsis" onClick={showModal1}/>,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Cao Quốc Khánh"
            description="Chức vụ: Dev"
          />
        </Card>

        <Card
          hoverable
          style={{ width: 250 }}
          cover={
            <Image
              alt="example"
              src={require('./../../asset/img/trancongminh.jpg')}
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error} />,
            <EditOutlined key="edit" onClick={error} />,
            <EyeOutlined key="ellipsis" onClick={showModal2}/>,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Trần Công Minh"
            description="Chức vụ: Dev"
          />
        </Card>
      </div>

      {/* Bùi Hữu Thông */}
      <Modal title="Thông tin cá nhân" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{textAlign: 'center', marginLeft: '50px'}}>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Họ và tên: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Bùi Hữu Thông</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Ngày sinh: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>28/06/2002</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Lớp: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>20CT114</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Mssv: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>120000655</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Đến từ: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Đắk Lắk</p>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* Cao Quốc Khánh */}
      <Modal title="Thông tin cá nhân" open={isModalOpen1} onOk={handleOk} onCancel={handleCancel}>
        <div style={{textAlign: 'center', marginLeft: '50px'}}>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Họ và tên: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Cao Quốc Khánh</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Ngày sinh: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>15/03/2002</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Lớp: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>20CT114</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Mssv: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>120000909</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Đến từ: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Đắk Lắk</p>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* Trần Công Minh */}
      <Modal title="Thông tin cá nhân" open={isModalOpen2} onOk={handleOk} onCancel={handleCancel}>
        <div style={{textAlign: 'center', marginLeft: '50px'}}>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Họ và tên: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Trần Công Minh</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Ngày sinh: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>06/06/2002</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Lớp: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>20CT114</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Mssv: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>120001295</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <h3>Đến từ: </h3>
            </Col>
            <Col span={7} style={{ marginTop: '2px' }}>
              <p>Bình Dương</p>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
};

export default HomePage;