import React, { useEffect, useState } from 'react'
import { Navbar, Nav } from 'rsuite';
import axios from 'axios';
import { config } from '../config.js';
import { useLocation, useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const TheNavbar = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [guest, setGuest] = useState(null);

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setIsLogin(false)
    else verify(token)
  }, [location])

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

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogin(false)
    alert("ออกจากระบบสำเร็จ!")
    navigate("/login", { replace: true })
    window.location.reload(false)
  }

  return (
    <Navbar className="fs-6">
      <Navbar.Brand href="/" >RBS</Navbar.Brand>

      {!isLogin ?
        <Nav pullRight>
          <Nav.Item href="/login">
            <span className='bi bi-box-arrow-in-right me-2' /> เข้าสู่ระบบ
          </Nav.Item>
          <Nav.Item href="/register">
            <span className='bi bi-box-arrow-in-right me-2' /> ลงทะเบียน
          </Nav.Item>
        </Nav>
        :
        <Nav pullRight>
          <Nav.Item href={`/profile?id=${guest.guest_id}`}>{guest.first_name} {guest.last_name[0]}.</Nav.Item>
          <Nav.Item onClick={logout}>
            <span className='bi bi-box-arrow-in-right me-2' /> ออกจากระบบ
          </Nav.Item>
        </Nav>
      }
    </Navbar>
  )
}