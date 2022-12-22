import React from 'react'
import { Col, FlexboxGrid } from 'rsuite'
import { FreqNoOfBooking } from './FreqNoOfBooking'
import { TotalPerHouse } from './TotalPerHouse'
import { TotalPerMonthYear } from './TotalPerMonthYear'

export const Dashboard = () => {
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
