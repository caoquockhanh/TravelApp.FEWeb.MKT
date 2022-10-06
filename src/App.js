import './App.css';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';
import LogoutPage from './pages/logout_page/LogOutPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
    <Routes>
      <Route path='/logout' element={<LogoutPage/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;
