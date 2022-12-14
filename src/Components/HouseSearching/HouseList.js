import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import resort from '../../images/resort.jpg';
import { config } from '../../config.js';
import { Button, Col, FlexboxGrid, Panel, Placeholder, Row } from 'rsuite';
import { BookModal } from '../HouseBooking/BookModal';
const HOST = config.HOST;

export const HouseList = () => {
    const [searchParams] = useSearchParams();
    const [houseList, setHouseList] = useState([]);
    const [checkinDate, setCheckinDate] = useState("-");
    const [checkoutDate, setCheckoutDate] = useState("-");
    const [totalDays, setTotalDays] = useState(0);

    // tomorrow date
    const getTomorrow = (target) => {
        const date = new Date(target)
        const tomorrow = new Date(date)
        tomorrow.setDate(date.getDate() + 1);
        const tomorrowFormat = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`
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
        // set totalDays
        const totalDaysParam = searchParams.get("totalDays") ? searchParams.get("totalDays") : 1

        setCheckinDate(checkinDateParam)
        setCheckoutDate(checkoutDateParam)
        setTotalDays(totalDaysParam)

        searchHouse(checkinDateParam, checkoutDateParam)
    }, [])

    const searchHouse = async (checkinDate, checkoutDate) => {
        const url = `${HOST}/house/${checkinDate}/${checkoutDate}`
        let result = await axios.get(url)
        setHouseList(result.data.data)
    }

    return (
        <div>
            <FlexboxGrid justify="center" className='my-3 text-center'>
                <FlexboxGrid.Item>
                    <p className='fs-2'>???????????????????????????????????????????????????????????????</p>
                    <p className='fs-5'>Check-in: {checkinDate},  Check-out: {checkoutDate} </p>
                    <p className='fs-5 mb-4'>?????????????????????????????? {houseList.length} ?????????????????????</p>
                    {houseList.map((house) => {
                        return (
                            <Panel header={house.name} bordered>
                                <Row className='text-start'>
                                    <Col>
                                        <img src={resort} alt="logo" width={250} />
                                    </Col>
                                    <Col>
                                        <p>???????????????????????????????????? {house.capacity} ??????</p>
                                        {house.no_of_large_bed > 0 ? <p>x{house.no_of_large_bed} ???????????????????????????</p> : null}
                                        {house.no_of_small_bed > 0 ? <p>x{house.no_of_small_bed} ?????????????????????????????????</p> : null}
                                        <p>{house.size} ??????.???.</p>
                                        <p>{house.detail}</p>
                                        <p>??? {house.price}/?????????</p>
                                        <BookModal house={house} checkinDate={checkinDate} checkoutDate={checkoutDate} totalDays={totalDays}/>
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