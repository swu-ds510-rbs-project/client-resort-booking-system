import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { config } from '../../config.js';
const HOST = config.HOST;

export const TotalPerMonthYear = () => {

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLabels([])
        setData([])

        const url = `${HOST}/booking/totalPerMonthYear`
        const result = await axios.get(url)
        if (result.data.status) {
            const res = result.data.data
            res && res.map(bookingPerMY => {
                setLabels(labels => [...labels, bookingPerMY.checkin_month_year])
                setData(data => [...data, bookingPerMY.total_bookings])
            })
        }
    }

    const dataSet = {
        labels: labels,
        datasets: [
            {
                label: "จำนวนการจอง",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 1,
                data: data,
            },
        ],
    };

    return (
        <div>
            <p className="fs-5 text-center">จำนวนการจองแต่ละเดือน</p>
            <p className="fs-6 text-center mb-3">การจองทั้งหมด: {data.reduce((a, b) => a + b, 0)} ครั้ง</p>
            <Line data={dataSet} />
        </div>
    );
};