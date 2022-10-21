import {
    BlockOutlined,
    ClusterOutlined,
    DashboardOutlined,
    MenuOutlined,
    OrderedListOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css'
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from '../login_page/LoginPage';
import HomePage from '../home_page/HomePage';
import LogoutPage from '../logout_page/LogOutPage';
import AccountPage from '../account_page/AccountPage';

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

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {location.pathname === "/" ?
                <LoginPage></LoginPage>

                : <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => {
                            if (key === 'logout') {
                                // navigate('/login');
                            } else {
                                //setItemName(items.find((elm) => elm.key === key).label);
                                console.log(key);
                                navigate(key);
                            }

                        }} />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Routes>

                                    <Route path='/home' element={<HomePage />} />
                                    <Route path='/account' element={<AccountPage />} />
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