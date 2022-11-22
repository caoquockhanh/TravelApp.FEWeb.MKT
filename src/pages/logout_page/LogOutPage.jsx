import React from "react";
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const url = {
    local: 'http://localhost:8080/api/auth/logout',
    ip: 'http://172.16.65.12:8080/api/auth/logout',
}

function LogoutPage(props) {

    const navigate = useNavigate();

    var axios = require('axios');

    const cookies = new Cookies();

    const Swal = require('sweetalert2')

    var config = {
        method: 'post',
        url: url.ip,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            cookies.set('token',"", { path: '/' });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đăng xuất thành công',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){
                navigate("/");
             }, 1500);
        })
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Lỗi đăng xuất',
                showConfirmButton: false,
                timer: 1500
              })
        });
    return (
        <></>
    )
}
export default LogoutPage;