import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import resort from '../../images/resort.jpg';
import { config } from '../../config.js';
import { Col, FlexboxGrid, Panel, Placeholder, Row } from 'rsuite';
const HOST = config.HOST;


export const HouseList = () => {
    const [searchParams] = useSearchParams();
    const [houseList, setHouseList] = useState([]);
    const [checkinDate, setCheckinDate] = useState("-");
    const [checkoutDate, setCheckoutDate] = useState("-");

    // tomorrow date
    const getTomorrow = (target) => {
        const date = new Date(target)
        const tomorrow = new Date(date)
        tomorrow.setDate(date.getDate() + 1);
        const tomorrowFormat = `${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()}`
        return tomorrowFormat
    }

    useEffect(() => {
        // today date
        const today = new Date()
        const todayFormat = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

        // set checkinDate
        const checkinDateParam = searchParams.get("checkinDate") ? searchParams.get("checkinDate") : todayFormat
        // set checkoutDate
        const checkoutDateParam = searchParams.get("checkoutDate") > searchParams.get("checkinDate") ? searchParams.get("checkoutDate") : getTomorrow(checkinDateParam)

        setCheckinDate(checkinDateParam)
        setCheckoutDate(checkoutDateParam)

        searchHouse(checkinDateParam, checkoutDateParam)
    }, [])

    const searchHouse = async (checkinDate, checkoutDate) => {
        const url = `${HOST}/house/${checkinDate}/${checkoutDate}`
        let result = await axios.get(url)
        setHouseList(result.data.data)
        console.log(result.data.data)
    }

    return (
        <div>
            <FlexboxGrid justify="center" className='my-3 text-center'>
                <FlexboxGrid.Item>
                    <p className='fs-2'>บ้านพักที่ว่างทั้งหมด</p>
                    <p className='fs-5'>Check-in: {checkinDate},  Check-out: {checkoutDate} </p>
                    <p className='fs-5 mb-4'>ผลการค้นหา {houseList.length} บ้านพัก</p>
                    {houseList.map((house) => {
                        return (
                            <Panel header={house.name} bordered>
                                <Row>
                                    <Col>
                                        <img src={resort} alt="logo" width={250} />
                                    </Col>
                                    <Col>
                                        <p>พักได้สูงสุด {house.capacity} คน</p>
                                        {house.no_of_large_bed > 0 ? <p>x{house.no_of_large_bed} เตียงใหญ่</p> : null}
                                        {house.no_of_small_bed > 0 ? <p>x{house.no_of_small_bed} เตียงเดี่ยว</p> : null}
                                        <p>{house.size} ตร.ม.</p>
                                        <p>รายละเอียด {house.detail}</p>
                                        <p>฿ {house.price}/คืน</p>
                                    </Col>
                                </Row>
                            </Panel>
                        )
                    }
                    )}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}
