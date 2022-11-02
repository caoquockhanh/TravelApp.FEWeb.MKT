import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import "./css/homepage.css"
import $ from 'jquery';

const cookies = new Cookies();
const token = cookies.get('token');


function HomePage() {

  const [text, setText] = useState('');

  var res;


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
 
     <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <form>
        <input
          value={text}
        />
        <p>{text}</p>
      </form>
    </div>
 
  )
};

export default HomePage;