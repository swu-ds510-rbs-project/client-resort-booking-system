import React, { useEffect, useState } from 'react'
import { Modal, Button, ButtonToolbar, Placeholder, Input } from 'rsuite';
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const BookModal = ({ house, checkinDate, checkoutDate, totalDays }) => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [noOfGuest, setNoOfGuest] = useState(1);
    const [specialRequest, setSpecialRequest] = useState(null);
    const [guest, setGuest] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
        else verify(token)
    }, [open])

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

    const addBooking = async () => {
        const url = `${HOST}/booking`
        const newBooking = {
            checkin_date: checkinDate,
            checkout_date: checkoutDate,
            no_of_guest: noOfGuest,
            special_request: specialRequest,
            is_cancel: 0,
            house_id: house.house_id,
            guest_id: guest.guest_id
        }
        const result = await axios.post(url, newBooking)
        if (result.data.status) {
            alert("การจองสำเร็จ!")
            navigate("/profile")
        }
    }

    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} appearance="primary"> จองเลย</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title><p className='fs-4 fw-bold'>ยืนยันการจองบ้านพัก</p></Modal.Title>
                </Modal.Header>
                <Modal.Body className='fs-6'>
                    <p className='fs-5 fw-bold'>ข้อมูลบ้านพัก: {house.name}</p>
                    <li>พักได้สูงสุด {house.capacity} คน</li>
                    {house.no_of_large_bed > 0 ? <li>x{house.no_of_large_bed} เตียงใหญ่</li> : null}
                    {house.no_of_small_bed > 0 ? <li>x{house.no_of_small_bed} เตียงเดี่ยว</li> : null}
                    <li>{house.size} ตร.ม.</li>
                    {house.detail ? <li>{house.detail}</li> : null}
                    <li>ราคา {house.price}/คืน</li>

                    <p className='fs-5 mt-2 fw-bold'>ข้อมูลผู้จอง: {guest && guest.first_name + " " + guest.last_name}</p>
                    <li>เบอร์โทร: {guest && guest.tel}</li>
                    <li>อีเมล: {guest && guest.email}</li>

                    <p className='fs-5 mt-2 fw-bold'>ข้อมูลการจอง</p>
                    <li>วันที่เข้า (check-in): {checkinDate}</li>
                    <li>วันที่ออก (check-out): {checkoutDate}</li>
                    <li>รวมทั้งหมด {totalDays} คืน</li>
                    <div className='mt-2'>จำนวนคนเข้าพัก <Input type="number" value={noOfGuest} onChange={setNoOfGuest} min="1" max={house.capacity} /></div>
                    <div>request เพิ่มเติม <Input value={specialRequest} onChange={setSpecialRequest}/></div>
                    <p className='fs-5 mt-3 fw-bold'>จำนวนเงิน {house.price * totalDays} บาท</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addBooking} appearance="primary">
                        ยืนยันการจอง
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};