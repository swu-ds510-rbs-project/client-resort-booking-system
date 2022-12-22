import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import { config } from '../../config.js';
const HOST = config.HOST;

export const TotalPerHouse = () => {

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLabels([])
        setData([])

        const url = `${HOST}/booking/totalPerHouse`
        const result = await axios.get(url)
        if (result.data.status) {
            const res = result.data.data
            res && res.map(bookingPerHouse => {
                setLabels(labels => [...labels, bookingPerHouse.name])
                setData(data => [...data, bookingPerHouse.total_bookings])
            })
        }
    }

    const dataSet = {
        labels: labels,
        datasets: [
            {
                label: "จำนวนการจอง",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                data: data
            },
        ],
    };

    return (
        <div>
            <p className="fs-5 text-center">จำนวนการจองแต่ละบ้าน</p>
            <p className="fs-6 text-center mb-3">การจองทั้งหมด: {data.reduce((a, b) => a + b, 0)} ครั้ง</p>
            <Bar data={dataSet} />
        </div>
    );
};