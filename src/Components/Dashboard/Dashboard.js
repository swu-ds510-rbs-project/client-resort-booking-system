import React, { useEffect, useState } from 'react'
import { Col, FlexboxGrid } from 'rsuite'
import { FreqNoOfBooking } from './FreqNoOfBooking'
import { TotalPerHouse } from './TotalPerHouse'
import { TotalPerMonthYear } from './TotalPerMonthYear'
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom'
const HOST = config.HOST;

export const Dashboard = () => {
    
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (!token && !adminToken) {
      navigate("/login")
    } else if (token && !adminToken) navigate("/profile")
    else verifyAdmin(adminToken)
  }, [admin])

  
  const verifyAdmin = async (adminToken) => {
    try {
      const url = `${HOST}/admin/authen`
      const result = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${adminToken}`
        }
      })
      if (result.data.status) {
        setAdmin(result.data.data)
      }
    } catch (e) {
      localStorage.removeItem('adminToken')
      alert("กรุณาเข้าสู่ระบบอีกครั้ง!")
      navigate("/admin")
    }
  }

    return (
        <div>
            <p className='fs-2 text-center my-4'>RBS Dashboard</p>
            <FlexboxGrid justify="center" className='my-3'>
                <FlexboxGrid.Item as={Col} colspan={24} lg={8}>
                    <TotalPerMonthYear />
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <hr />
            <FlexboxGrid justify="center" className='my-3'>
                <FlexboxGrid.Item as={Col} colspan={24} lg={8}>
                    <TotalPerHouse />
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <hr />
            <FlexboxGrid justify="center" className='my-3'>
                <FlexboxGrid.Item as={Col} colspan={24} lg={8}>
                    <FreqNoOfBooking />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}
