import resort from './images/resort.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, FlexboxGrid } from 'rsuite';
const { beforeToday } = DateRangePicker;

function App() {
  const navigate = useNavigate();

  const [selectDates, setSelectDates] = useState(null)

  useEffect(() => {
    if (selectDates) {
      if (selectDates[0] >= selectDates[1]) {
        alert("กรุณาเลือกวันที่ check-out ให้เป็นวันที่หลัง check-in")
        setSelectDates(null)
      } else {
        let checkinDate = `${selectDates[0].getFullYear()}-${selectDates[0].getMonth()+1}-${selectDates[0].getDate()}`
        let checkoutDate = `${selectDates[1].getFullYear()}-${selectDates[0].getMonth()+1}-${selectDates[0].getDate()}`
        return navigate(`available-houses?checkinDate=${checkinDate}&checkoutDate=${checkoutDate}`)
      }
    }
  }, [selectDates])

  return (
    <div className="show-grid">
      <div className='m-4' />
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item xs={8}>
          <div className="text-center mb-2 fs-2">ยินดีต้อนรับเข้าสู่ อาร์บีเอส รีสอร์ต</div>
          <DateRangePicker
            placeholder="เลือกวันที่ต้องการเข้าพัก"
            size="lg"
            disabledDate={beforeToday()}
            value={selectDates}
            onChange={setSelectDates} 
            ranges = {[]}
            block />
          <img src={resort} alt="logo" width={450} className="mt-3"/>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default App;
