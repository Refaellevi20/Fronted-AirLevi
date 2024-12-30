import { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { StayList } from '../cmps/stay/StayList'

import { loadStays } from '../store/stay/stay.action'
import { AppFooterHome } from '../cmps/footerHome/AppFooterHome'
import { NavBar } from '../cmps/NavBar'
import { AppHeader } from './AppHeader'
import { IndexLoader } from '../cmps/IndexLoader'

export function StayIndex({currency}) {
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
    <div className="">
      <AppHeader className='main-layout stay-index' />
      <NavBar setFilteredStays={setFilteredStays} />
    </div>
    <section style={{ position: 'relative' }}>
      {filterBy.location && <h4 className='main-layout'>Showing results for {filterBy.location}</h4>}
      {filteredStays.length === 0 ? (
        <IndexLoader />
      ) : (
        <StayList stays={filteredStays} currency={currency}/>
      )}
     {/* {filteredStays.length === 0 && (
          <div className="no-results-container">
            <div className="angry-emoji">😢</div>
            <div className="message-container">
              <p className="no-results-message">No stays available!</p>
              <p className="sub-message">Try different filters...</p>
            </div>
            <div className="angry-cloud-container">
              <div className="angry-cloud"></div>
              <div className="lightning"></div>
            </div>
          </div>
        )} */}
      <AppFooterHome />
    </section>
  </section>
  )
}

