import React, { useEffect, useState } from 'react'
import { FlexboxGrid } from 'rsuite'
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const Profile = () => {
  
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false)
      navigate("/login")
    } 
    else verify(token)
  }, [guest])

  const verify = async (token) => {
    try {
      const url = `${HOST}/guest/authen`
      const result = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (result.data.status) {
        setGuest(result.data.data)
        setIsLogin(true)
      }
    } catch (e) {
      localStorage.removeItem('token')
      setIsLogin(false)
      alert("กรุณาเข้าสู่ระบบอีกครั้ง!")
      navigate("/login")
    }
  }

  return (
    <div>
      <FlexboxGrid justify="center" className='my-3'>
        <FlexboxGrid.Item>
          <p className='fs-2 text-center mb-4'>ข้อมูลส่วนตัว</p>
          <p className='fs-5'>ชื่อ-สกุล: {guest && guest.first_name + " " + guest.last_name}</p>
          <p className='fs-5'>เบอร์โทร: {guest && guest.tel}</p>
          <p className='fs-5'>เบอร์โทร: {guest && guest.email}</p>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
