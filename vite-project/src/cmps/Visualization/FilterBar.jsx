import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function FilterBar({ onFilter }) {
    const [startDate, setStartDate] = useState(new Date(2024, 0, 1))
    const [endDate, setEndDate] = useState(new Date())

    const handleDateChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        if (start && end) {
            onFilter({ startDate: start, endDate: end })
        }
    }

    return (
        <div className="filter-bar">
            <div className="date-range">
                <label>Date Range:</label>
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                />
            </div>
        </div>
    )
}