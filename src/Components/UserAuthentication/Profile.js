import React, { useEffect, useState } from 'react'
import { FlexboxGrid } from 'rsuite'
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import { HistoryModal } from '../BookingHistory/HistoryModal.js';
const HOST = config.HOST;

export const Profile = () => {

  const navigate = useNavigate();

  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (!token && !adminToken) {
      navigate("/login")
    } else if (adminToken) navigate("/dashboard")
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
      }
    } catch (e) {
      localStorage.removeItem('token')
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

          <HistoryModal guest_id={guest && guest.guest_id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
