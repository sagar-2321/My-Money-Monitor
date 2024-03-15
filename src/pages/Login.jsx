// import '../resources/authentication.css'

import React, { useEffect} from 'react'
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {

  const navigate = useNavigate();



  const onFinish = async(values) => {
      try {
       
        const response = await axios.post("https://m3-backend-api.onrender.com/api/users/login",values)
        // const response = await axios.post("http://localhost:3080/api/users/login",values)

        localStorage.setItem(
          "moneyMonitor-user",
          JSON.stringify({...response.data,password:""})
        );
        
        message.success('Login successful')
        navigate('/')

      } catch (error) {
        console.log(error)
        message.error("Login failed")
      }
  }

  useEffect(() => {
    if (localStorage.getItem("sheymoney-udemy-user")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="login">
     
      <div className="row justify-content-center w-100 h-100 align-items-center">
        <div className="col-md-4">
          <h1>Login</h1>

          <Form layout='vertical' onFinish={onFinish}>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label='Password' name="password">
              <Input type='password' />
            </Form.Item>

            <div className="d-flex">
              <Link to="/register">
                Not Registered, Click here
              </Link>

              <button className='login-btn' type='submit'>
                LOGIN
              </button>
            </div>

          </Form>

        </div>
        <div className="col-md-5">
          <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_svpaqngo.json" background="transparent" speed="1"
            loop autoplay></lottie-player>
        </div>
      </div>
    </div>
  )
}

export default Login