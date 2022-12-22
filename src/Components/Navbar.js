import React, { useEffect, useState } from 'react'
import { Navbar, Nav } from 'rsuite';
import axios from 'axios';
import { config } from '../config.js';
import { useLocation, useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const TheNavbar = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [guest, setGuest] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [role, setRole] = useState(null);

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (token) verify(token)
    else if (adminToken) verifyAdmin(adminToken)
    else setIsLogin(false)
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
        setRole("guest")
        setIsLogin(true)
      }
    } catch (e) {
      localStorage.removeItem('token')
      setIsLogin(false)
      alert("กรุณาเข้าสู่ระบบอีกครั้ง!")
      navigate("/login")
    }
  }

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
        setRole("admin")
        setIsLogin(true)
      }
    } catch (e) {
      localStorage.removeItem('adminToken')
      setIsLogin(false)
      alert("กรุณาเข้าสู่ระบบอีกครั้ง! (แอดมิน)")
      navigate("/admin")
    }
  }

  const logout = () => {
    if (role && role === "guest") localStorage.removeItem('token')
    else if (role && role === "admin") localStorage.removeItem('adminToken')
    setIsLogin(false)
    alert("ออกจากระบบสำเร็จ!")
    if (role && role === "guest") navigate("/login", { replace: true })
    else if (role && role === "admin") navigate("/admin", { replace: true })
    window.location.reload(false)
  }

  return (
    <Navbar className="fs-6">
      <Navbar.Brand href="/" >RBS</Navbar.Brand>

      {!isLogin ?
        <Nav pullRight>
          <Nav.Item href="/admin">
            <span className='bi bi-box-arrow-in-right me-2' /> แอดมิน
          </Nav.Item>
          <Nav.Item href="/login">
            <span className='bi bi-box-arrow-in-right me-2' /> เข้าสู่ระบบ
          </Nav.Item>
          <Nav.Item href="/register">
            <span className='bi bi-box-arrow-in-right me-2' /> ลงทะเบียน
          </Nav.Item>
        </Nav>
        :
        <Nav pullRight>
          {role && role === "guest" ? (
            <Nav.Item href={`/profile?id=${guest.guest_id}`}>{guest.first_name} {guest.last_name[0]}.</Nav.Item>
          ) : role && role === "admin" ? (
            <Nav.Item href={`/dashboard`}>{admin.first_name} {admin.last_name[0]}. (ADMIN) </Nav.Item>
          ) : null}
          <Nav.Item onClick={logout}>
            <span className='bi bi-box-arrow-in-right me-2' /> ออกจากระบบ
          </Nav.Item>
        </Nav>
      }
    </Navbar>
  )
}