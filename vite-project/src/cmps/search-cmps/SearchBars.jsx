import { useState } from 'react'
import { useRef} from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchForm as StaySearchForm } from './SearchForm'
import { SearchPreview } from './SearchPreview'


export function SearchBars() {
    const [searchParams] = useSearchParams()
    const [selectedTab, setSelectedTab] = useState('location')
    const seachBarsRef = useRef()

    const staySearchParams = {
        location: searchParams.get('location') || '',
        checkIn: searchParams.get('checkIn') ? new Date(+searchParams.get('checkIn')) : '',
        checkOut: searchParams.get('checkOut') ? new Date(+searchParams.get('checkOut')) : '',
        guests: {
            adults: +searchParams.get('adults') || 0,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        }
    }

    const handleToggle = () => {
        seachBarsRef.current.classList.toggle('search-bars-open') 
    }

    function handlePreviewClick(tabToSet) {
        setSelectedTab(tabToSet)
        handleToggle()
    }


        return (
            <div ref={seachBarsRef} className='search-bars'>
                <SearchPreview staySearchParams={staySearchParams} handlePreviewClick={handlePreviewClick}/>
                <StaySearchForm staySearchParams={staySearchParams} handleToggle={handleToggle} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className='screen-blur' onClick={handleToggle}></div>
            </div>
        )

}