import {
    BlockOutlined,
    DashboardOutlined,
    MenuOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from '../login_page/LoginPage';
import HomePage from '../home_page/HomePage';
import LogoutPage from '../logout_page/LogOutPage';
import AccountPage from '../account_page/AccountPage';
import TourPage from '../tour_page/TourPage';

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
        'Trang chủ',
        '/home',
        <DashboardOutlined />,
        'Trang chủ',
    ),
    getItem('Quản lí người dùng', '/user', <BlockOutlined />, 'Quản lí người dùng'),
    getItem(
        'Quản lí tours',
        '/tours',
        <MenuOutlined />,
        'Quản lí tours'
    ),
    getItem('Tài khoản', 'Tài khoản', <ToolOutlined />, 'Tài khoản', [
        getItem('Thông tin tài khoản', '/account', '', 'Thông tin tài khoản'),
        getItem('Đăng xuất', '/logout', '', 'Đăng xuất'),
    ]),
];

function LayoutPage() {
    const location = useLocation();
    if (location.pathname === "/login") {
        console.log(location.pathname + "|true");
    }
    else {
        console.log(location.pathname + "|false");
    }
    // if(location.pathname === "/account"){
    //     console.log('Tài khoản');
    // }

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const [itemname, setItemName] = useState('');
    const [itemname1, setItemName1] = useState('');

    return (
        <>
            {location.pathname === "/"
                ?
                <LoginPage></LoginPage>
                :
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                        <div className="logo" />
                        <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => {
                            if (key === 'logout') {
                                // navigate('/login');
                            } else {
                                //console.log(key);
                                navigate(key);
                                if(key === '/account')
                                {
                                    setItemName('Tài khoản')
                                }
                                setItemName(items.find((elm) => elm.key === key).label);
                                if(key === '/user')
                                {
                                    message.error('Chức năng đang được xây dựng!');
                                }
                            }
                        }} />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 16px', height: 'auto' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{itemname}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 570 }}>
                                <Routes>
                                    <Route path='/home' element={<HomePage />} />
                                    <Route path='/account' element={<AccountPage />} />
                                    <Route path='/tours' element={<TourPage />} />
                                </Routes>
                                <Routes>
                                    <Route path='/logout' element={<LogoutPage />} />
                                </Routes>

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Travel App ©2022 Created by Group MKT</Footer>
                    </Layout>
                </Layout>}</>
    );
};

export default LayoutPage;