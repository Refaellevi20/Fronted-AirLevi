import { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { StayList } from '../cmps/stay/StayList'

import { loadStays } from '../store/stay/stay.action'
import { AppFooterHome } from '../cmps/footerHome/AppFooterHome'
import { NavBar } from '../cmps/NavBar'

export function StayIndex({stay,currency}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const [filteredStays, setFilteredStays] = useState([])

  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    startDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    endDate: moment().add(4, 'days').format('YYYY-MM-DD')
  }

  useEffect(() => {
    if (!stays || !stays.length) loadStays(filterBy)
      else {
        setFilteredStays(stays)
      }
  }, [stays,searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section>
      <NavBar setFilteredStays={setFilteredStays} />
      <section style={{ position: 'relative' }}>
        {!!filteredStays.length && <StayList stays={filteredStays} currency={currency}/>}
        {filteredStays.length === 0 && <p>No stays available for the selected category</p>}
        {/* {!!stays && <StayList stays={stays} />} */}
        <AppFooterHome />
      </section>
    </section>
  )
}
