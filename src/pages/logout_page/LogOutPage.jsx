import React from "react";
import { useNavigate } from 'react-router-dom'

function LogoutPage(props) {

    const navigate = useNavigate();

    var axios = require('axios');

    const Swal = require('sweetalert2')

    var config = {
        method: 'post',
        url: 'http://localhost:8080/api/auth/logout',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
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