import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import { config } from '../../config.js';
const HOST = config.HOST;

export const FreqNoOfBooking = () => {

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLabels([])
        setData([])

        const url = `${HOST}/booking/freqNoOfBooking`
        const result = await axios.get(url)
        if (result.data.status) {
            const res = result.data.data
            res && res.map(bookingPerHouse => {
                setLabels(labels => [...labels, bookingPerHouse.booking_total_days + " คืน"])
                setData(data => [...data, bookingPerHouse.times])
            })
        }
    }

    const dataSet = {
        labels: labels,
        datasets: [
            {
                label: "จำนวนการจอง",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgb(153, 102, 255)",
                borderWidth: 1,
                data: data
            },
        ],
    };

    return (
        <div>
            <p className="fs-5 text-center">ความถี่ของจำนวนคืนที่จองบ้านพัก</p>
            <p className="fs-6 text-center mb-3">(x = จำนวนคืน, y = จำนวนครั้งการจอง)</p>
            <Bar data={dataSet} />
        </div>
    );
};