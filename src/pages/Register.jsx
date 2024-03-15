import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css'
import axios from 'axios';
import { Form, Input, message } from 'antd';
function Register() {

  const navigate = useNavigate();


  const onFinish = async(values)=>{
    try {
      await axios.post('https://m3-backend-api.onrender.com/api/users/register',values)
      // await axios.post('http://localhost:3080/api/users/register',values)
      navigate('/')

    } catch (error) {
      console.log(error);
      message.error("something went wrong...")
    }
  }
  
  return (
    <div className="register" style={{}}>
      <div className="row w-100 h-100 justify-content-center align-items-center">
       
        <div className="col-md-4">
          <h1>Register</h1>

          <Form layout='vertical' onFinish={onFinish}>

            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type='email' />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type='password' />
            </Form.Item>
            <div className="d-flex">
              <Link to="/login">
                Login, Click here
              </Link>

              <button className='login-btn' type='submit'>
                Register
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ml0yft0o.json" background="transparent" speed="1"
            loop autoplay></lottie-player>
        </div>
      </div>
    </div>
  )
}

export default Register;