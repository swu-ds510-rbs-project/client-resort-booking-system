import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, FlexboxGrid, Form } from 'rsuite'
import axios from 'axios';
import { config } from '../../config.js';
import { useNavigate } from 'react-router-dom';
const HOST = config.HOST;

export const Login = () => {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({ email: null, password: null })
    const [errorMsg, setErrorMsg] = useState([]);

    const logingIn = async () => {
        try {
            setErrorMsg([])
            const url = `${HOST}/guest/login`
            let result = await axios.post(url, formValue)
            if (result.data.status === true) {
                const token = result.data.data.token
                localStorage.setItem("token", token)
                alert("เข้าสู่ระบบสำเร็จ!")
                navigate(`/profile?id=${result.data.data.guest_id}`)
            }
        } catch (e) {
            const err = e.response.data.error
            return setErrorMsg(err ? e.response.data.error : [])
        }
    }

    return (
        <div>
            <FlexboxGrid justify="center" className='my-3'>
                <FlexboxGrid.Item>
                    <p className='fs-2 text-center mb-4'>เข้าสู่ระบบ</p>
                    <Form formValue={formValue} onChange={formValue => setFormValue(formValue)}>
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
                                <Button appearance="primary" onClick={logingIn} block>ยืนยัน</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}
