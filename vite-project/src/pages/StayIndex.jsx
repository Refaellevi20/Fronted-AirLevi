import { useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { StayList } from '../cmps/stay/StayList'

import { loadStays } from '../store/stay/stay.action'
import { AppFooterHome } from '../cmps/AppFooterHome'

export function StayIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    startDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    endDate: moment().add(4, 'days').format('YYYY-MM-DD')
  }

  useEffect(() => {
    if (!stays || !stays.length) loadStays(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section style={{ position: 'relative' }}>
      {!!stays && <StayList stays={stays} />}
      <AppFooterHome />
    </section>
  )
}
