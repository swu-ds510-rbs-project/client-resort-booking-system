import React, { useState } from 'react'
import { Button, ButtonToolbar, FlexboxGrid, Form } from 'rsuite'
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const Register = () => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({ email: null, password: null })
    const [errorMsg, setErrorMsg] = useState([]);

    const regis = async () => {
        try {
            setErrorMsg([])
            const url = `${HOST}/guest`
            let result = await axios.post(url, formValue)
            if (result.data.status === true) {
                alert("สร้างบัญชีสำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีที่คุณสร้าง")
                navigate("/login")
            }
        } catch (e) {
            const err = e.response.data.error
            return setErrorMsg(err ? e.response.data.error : [])
        }
    }

    return (
        <FlexboxGrid justify="center" className='my-3'>
            <FlexboxGrid.Item>
                <p className='fs-2 text-center mb-4'>สร้างบัญชีใหม่</p>
                <Form formValue={formValue} onChange={formValue => setFormValue(formValue)}>
                    <Form.Group controlId="firstname">
                        <Form.ControlLabel>ชื่อ</Form.ControlLabel>
                        <Form.Control
                            name="firstname"
                            placeholder="กรอกชื่อ"
                        />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.ControlLabel>นามสกุล</Form.ControlLabel>
                        <Form.Control
                            name="lastname"
                            placeholder="กรอกนามสกุล"
                        />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="tel">
                        <Form.ControlLabel>เบอร์โทร</Form.ControlLabel>
                        <Form.Control
                            name="tel"
                            placeholder="กรอกเบอร์โทร"
                        />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>อีเมล</Form.ControlLabel>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="กรอกอีเมล"
                        />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel>รหัสผ่าน</Form.ControlLabel>
                        <Form.Control
                            name="password"
                            type="password"
                            autoComplete="off"
                            placeholder="กรอกรหัสผ่าน"
                        />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>

                    {errorMsg.map((err) => <p className='text-danger'>{err}</p>)}

                    <Form.Group className='mt-4'>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={regis} block>ยืนยัน</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
