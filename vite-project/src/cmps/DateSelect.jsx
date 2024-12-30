import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'

import { useEffect, useState } from 'react'

export function DateSelect({ onSetField, checkIn, checkOut, monthsToShow = 2,clearDatesFlag }) {
  checkIn = checkIn || new Date()
  checkOut = checkOut || new Date()
  const [range, setRange] = useState([
    {
      startDate: checkIn,
      endDate: checkOut,
      key: 'selection'
    }
  ])

  useEffect(() => {
    if (clearDatesFlag) {
      // When clearDatesFlag is true, reset the range to empty
      setRange([{ startDate: null, endDate: null, key: 'selection' }])
    } else {
      // When clearDatesFlag is false
      setRange([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
    }
  }, [clearDatesFlag])

  function handleChange(item) {
    const selection = item.selection
    setRange([selection])
    if (selection.startDate === selection.endDate) {
      onSetField('checkIn', selection.startDate)
    } else {
      onSetField('checkOut', selection.endDate)
    }
  }

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={range}
      months={monthsToShow}
      direction="horizontal"
      rangeColors={['black']}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
    />
  )
}