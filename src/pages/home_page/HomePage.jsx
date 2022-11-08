import React from 'react';
import "./css/homepage.css"
import { Card, Avatar, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

function HomePage() {

  const error = () => {
    message.error('Chức năng đang được xây dựng!');
  };

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <div className='banner' style={{ display: 'flex', justifyContent: 'center', fontSize: '3vh' }}>
        <h1 style={{ color: '#6C4AB6', paddingBottom: '10px' }}>Chào các bạn đây là trang Admin Web quản lí Tour của nhóm MKT</h1>
      </div>
      <h2 style={{ color: '#3F3B6C' }}>Thành viên nhóm gồm: </h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error}/>,
            <EditOutlined key="edit" onClick={error}/>,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Bùi Hữu Thông"
            description="Chức vụ: Leader"
          />
        </Card>

        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error}/>,
            <EditOutlined key="edit" onClick={error}/>,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Cao Quốc Khánh"
            description="Chức vụ: Dev"
          />
        </Card>

        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={error}/>,
            <EditOutlined key="edit" onClick={error}/>,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Trần Công Minh"
            description="Chức vụ: Dev"
          />
        </Card>
      </div>
    </div>
  )
};

export default HomePage;