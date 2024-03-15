/* eslint-disable jsx-a11y/anchor-is-valid */
import '../resources/defaultLayout.css'

import React from 'react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//antd
import { DownOutlined } from '@ant-design/icons';
import { Dropdown,message,Space } from 'antd';
//


function DefaultLayout(props) {

    const logOut = () => {
        localStorage.removeItem('moneyMonitor-user')
        navigate('/login')
        message.success("Logged out")
    }
    // antd dropdown
    const items=[
                {
                    key: '0',
                    danger: true,
                    label: (<p onClick={logOut}>LogOut</p>),
                }
            ]
        
   
    // ant



    const user = JSON.parse(localStorage.getItem("moneyMonitor-user"));

    const navigate = useNavigate();


  

   
    return (
        <div className='layout'>

            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="logo">My Money Monito₹</h1>
                </div>
                <div>
                    <Dropdown menu={{items}}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <button className='btn btn-outline-success'>{user.name}</button>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

            </div>
            <div className="content">
                {props.children}
            </div>
            <div className="mobile-btn">
                <button className='btn btn-danger' onClick={logOut}>LogOut</button>
            </div>
        </div>
    )
}

export default DefaultLayout