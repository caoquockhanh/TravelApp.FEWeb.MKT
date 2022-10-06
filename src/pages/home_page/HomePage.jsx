import {
  BlockOutlined,
  ClusterOutlined,
  ControlOutlined,
  DashboardOutlined,
  MenuOutlined,
  OrderedListOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Form, Input } from 'antd';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import "./css/homepage.css"
import $ from 'jquery'; 
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, title, children, type) {
  return {
    key,
    icon,
    title,
    children,
    label,
    type,
  }
}

const items = [
  getItem(
    <Link to='/dashboard'>Dashboard</Link>,
    'dashboard',
    <DashboardOutlined />,
    'Dashboard',
    [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
  getItem(<Link to='/serie'>Serie</Link>, 'serie', <BlockOutlined />, 'Serie'),
  getItem(
    <Link to='/line-machine'>Line &amp; machine</Link>,
    'line-machine',
    <ControlOutlined />,
    'Line & machine'
  ),
  getItem(
    <Link to='/category'>Production property</Link>,
    'production-property',
    <MenuOutlined />,
    'Production property'
  ),
  getItem(
    <Link to='/price-book'>Price book</Link>,
    'price-book',
    <OrderedListOutlined />,
    'Price book'
  ),
  getItem('Sawable', 'sawable', <ClusterOutlined />, '', [
    getItem(<Link to='/sawable/sawing'>Sawing</Link>, 'sawable_sawing', '', 'Sawable / Sawing'),
    getItem(
      <Link to='/sawable/sorting'>Sorting</Link>,
      'sawable_sorting',
      '',
      'Sawable / Sorting'
    ),
    getItem(
      <Link to='/sawable/brutting'>Brutting</Link>,
      'sawable_brutting',
      '',
      'Sawable / Brutting'
    ),
    getItem(
      <Link to='/sawable/polishing-table'>Polishing table</Link>,
      'sawable_polishing-table',
      '',
      'Sawable / Polishing table'
    ),
    getItem(
      <Link to='/sawable/check-table'>Check table</Link>,
      'sawable_check-table',
      '',
      'Sawable / Check table'
    ),
    getItem(
      <Link to='/sawable/polishing-bottom'>Polishing bottom</Link>,
      'sawable_polishing-bottom',
      '',
      'Sawable / Polishing bottom'
    ),
    getItem(
      <Link to='/sawable/polishing-top-star'>Polishing top star</Link>,
      'sawable_polishing-top-star',
      '',
      'Sawable / Polishing top star'
    ),
  ]),
  getItem('Makeable', 'makeable', <ClusterOutlined />, '', [
    getItem(
      <Link to='/makeable/sawing'>Sawing</Link>,
      'makeable_sawing',
      '',
      'Makeable / Sawing'
    ),
    getItem(
      <Link to='/makeable/sorting'>Sorting</Link>,
      'makeable_sorting',
      '',
      'Makeable / Sorting'
    ),
    getItem(
      <Link to='/makeable/brutting'>Brutting</Link>,
      'makeable_brutting',
      '',
      'Makeable / Brutting'
    ),
  ]),
  getItem('Tài khoản', 'Tài khoản', <ToolOutlined />, '', [
    getItem(<Link to='/account/info'>Thông tin tài khoản</Link>, 'system_log', '', 'Thông tin tài khoản'),
    getItem(<Link to='/logout'>Đăng xuất</Link>, 'system_user', '', 'Đăng xuất'),
  ]),
];

function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [text, setText] = useState('');

    
  

  var res;
  const cookies = new Cookies();
  const token = cookies.get('token');
  //API logout

  //API get list tour
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:8080/api/tours',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  axios(config)
    .then(function (response) {
      res = response.data;
      $.each(res, (i) => {
        setText(res[i].phone);
      })
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <form>
            <input 
              value={text} 
              />
              <p>{text}</p>
            </form>
          

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Travel App ©2022 Created by Group MKT</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;