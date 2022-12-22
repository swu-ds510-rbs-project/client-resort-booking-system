import React, { useEffect, useState } from 'react'
import { Modal, Button, ButtonToolbar, Placeholder, Input } from 'rsuite';
import axios from 'axios';
import { config } from '../../config.js';
const HOST = config.HOST;

export const HistoryModal = ({ guest_id }) => {

  const [bookingList, setBookingList] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBooking()
  }, [open])


  const getBooking = async () => {
    const url = `${HOST}/booking/${guest_id}`
    const result = await axios.get(url)
    if (result.data.status) {
      setBookingList(result.data.data)
    }
  }

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} className="mt-4" block> ประวัติการจอง</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title><p className='fs-4'>ประวัติการจองบ้านพัก</p></Modal.Title>
        </Modal.Header>
        <Modal.Body className='fs-6'>
          {bookingList.map((booking) => {
            const startDate = new Date(booking.checkin_date)
            const endDate = new Date(booking.checkout_date)
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24)
            const totalPrice = totalDays*booking.price

            return (
              <>
                <p className=''>รหัสการจอง: {booking.booking_id}</p>
                <p className=''>Check-in: {booking.checkin_date}</p>
                <p className=''>Check-out: {booking.checkout_date}</p>
                <p className=''>บ้านที่จอง: {booking.name}</p>
                <p className=''>จำนวนคนเข้าพัก: {booking.no_of_guest} คน</p>
                <p className=''>จำนวนคืน: {totalDays} คืน</p>
                <p className=''>ราคา: {totalPrice} บาท</p>
                <hr />
              </>
            )
          })}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
