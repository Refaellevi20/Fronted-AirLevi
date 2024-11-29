import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { StayList } from '../cmps/stay/StayList' 
import { loadStays } from '../store/stay/stay.action'

export function StayIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    startDate: new Date().setDate(new Date().getDate() + 1),
    endDate: new Date().setDate(new Date().getDate() + 4),
  }

  useEffect(() => {
    if (!stays || !stays.length) loadStays(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section style={{ position: 'relative' }}>
      {/* <AppHeader className='main-layout stay-index' />
      <CategoryFilterBar
        handleChange={handleChange}
        currCategory={filterBy.category}
      />
      {isLoading && <IndexLoader />}
      {filterBy.location && <h4 className='main-layout'>Showing results for {filterBy.location}</h4>} */}
      {!!stays && <StayList stays={stays} />}
      {/* <AppFooter className='main-layout stay-index-footer fixed' /> */}
    </section>
  )
}
