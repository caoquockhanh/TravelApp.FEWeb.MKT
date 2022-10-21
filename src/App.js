import './App.css';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';
import LogoutPage from './pages/logout_page/LogOutPage';
import AccountPage from './pages/account_page/AccountPage';
import LayoutPage from './pages/layout_page/LayoutPage';
import "./pages/index"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return <LayoutPage/>
}

export default App;
