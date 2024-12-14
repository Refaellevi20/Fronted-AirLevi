import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import { useForm } from "../../customHook/useForm"

import { SearchBtn } from "./SearchBtn.jsx"
import { RegionSelect } from "./RegionSelect.jsx"
import { DateSelect } from "./DateSelect.jsx"
import { GuestSelect } from "./GuestSelect.jsx"
import { SearchFormNav } from "./SearchForm-nav.jsx"

import { utilService } from "../../services/util.service"
import { loadStays } from '../../store/stay/stay.action'

export function SearchForm({ staySearchParams, handleToggle, selectedTab, setSelectedTab }) {
    const navigate = useNavigate()
    const { location, checkIn, checkOut, guests } = staySearchParams
    const [fields, setFields, handleChange] = useForm({ location, checkIn, checkOut, guests })
    const inputRef = useRef(null)

    useEffect(() => {
        if (selectedTab === 'location') inputRef.current.focus()
    }, [selectedTab])


    function onCategoryClick(category) {
        setSelectedTab(category)
    }

    function onSetField(field, value) {
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
        if (field === 'location') setSelectedTab('checkIn')
        if (field === 'checkIn') setSelectedTab('checkOut')
        if (field === 'checkOut') setSelectedTab('guests')
    }

    function setRandDates(){
        const randCheckIn = utilService.getTimeStampXDaysFromNow(utilService.getRandomIntInclusive(1, 5))
        const randCheckOut = utilService.getTimeStampXDaysFromNow(utilService.getRandomIntInclusive(8, 20))
        setFields((prevFields) => ({...prevFields, checkIn: new Date(randCheckIn), checkOut: new Date (randCheckOut)}))
        setSelectedTab('guests')
        return {randCheckIn, randCheckOut}
    }

    function handleSubmit() {
        const searchObject = {
            location: fields.location,
            checkIn: (fields.checkIn) ? fields.checkIn.getTime() :  utilService.getTimeStampXDaysFromNow(7),
            checkOut: (fields.checkOut) ? fields.checkOut.getTime() : utilService.getTimeStampXDaysFromNow(14),
            adults: fields.guests.adults,
            children: fields.guests.children,
            infants: fields.guests.infants,
            pets: fields.guests.pets,
        }
        const searchParams = utilService.objectToSearchParams(searchObject)
        navigate(`/stay?${searchParams}`)
        loadStays(searchObject)
        handleToggle()

    }

    const checkInSubHeading = (fields.checkIn) ? `${utilService.formattedDate(fields.checkIn)}` : 'Add dates'
    const checkOutSubHeading = (fields.checkOut) ? `${utilService.formattedDate(fields.checkOut)}` : 'Add dates'

    function getGuestsSubHeading() {
        var guestSubheading = ''
        if (fields.guests.adults) guestSubheading += `${fields.guests.adults} adults`
        if (fields.guests.children) guestSubheading += `, ${fields.guests.children} children`
        if (fields.guests.infants) guestSubheading += `, ${fields.guests.infants} infants`
        if (fields.guests.pets) guestSubheading += `, ${fields.guests.pets} pets`
        if (!guestSubheading) guestSubheading = 'Add guests'
        if (guestSubheading.includes('1 adults' || '1 children' || '1 infants' || '1 pets')) {
            guestSubheading = guestSubheading.replace('1 adults', '1 adult')
            guestSubheading = guestSubheading.replace('1 children', '1 child')
            guestSubheading = guestSubheading.replace('1 infants', '1 infant')
            guestSubheading = guestSubheading.replace('1 pets', '1 pet')
        }
        return guestSubheading
    }

    function checkForActiveClass(category) {
        return (selectedTab === category) ? ' active' : ''
    }

    return (
        <section className="search-form">
            <div className='search-form-nav-container'>
                <SearchFormNav />
            </div>
            <div className='search-form-menu-container'>
                <div className="search-form-menu">
                    {/* Location */}
                    <div className="input-query">
                        <div className={"search-category location" + checkForActiveClass('location')} onClick={() => onCategoryClick('location')}>
                            <div className="search-form-label">Where</div>
                            <input ref={inputRef} type="text" name='location' className="search-form-desc" placeholder="Search destinations" value={fields.location} onChange={handleChange} />
                        </div>
                        {selectedTab === 'location' &&
                            <div className="region-select-container">
                                <RegionSelect onSetField={onSetField} />
                            </div>}
                    </div>

                    {/* Dates: checkIn/checkOut */}
                    <div className="input-split-date">
                        <div className={"search-category check-in" + (checkForActiveClass('checkIn'))} onClick={() => onCategoryClick('checkIn')}>
                            <div className="search-form-label">Check in</div>
                            <div className="search-form-desc">{checkInSubHeading}</div>
                        </div>
                        <div className={"search-category check-out" + (checkForActiveClass('checkOut'))} onClick={() => onCategoryClick('checkOut')}>
                            <div className="search-form-label">Check out</div>
                            <div className="search-form-desc">{checkOutSubHeading}</div>
                        </div>
                        {(selectedTab === 'checkIn' || selectedTab === 'checkOut') &&
                            <div className="date-select-container">
                                <div className='date-tabs'>
                                    <button className='clean-button active'>Choose dates</button>
                                    <button className='clean-button' onClick={setRandDates}>Flexible dates</button>
                                </div>
                                <DateSelect checkIn={fields.checkIn} checkOut={fields.checkOut} onSetField={onSetField} />
                                
                            </div>}
                    </div>

                    {/* Guests */}
                    <div className={"input-with-search" + (checkForActiveClass('guests'))}>
                        <div className={"search-category add-guests"} onClick={() => onCategoryClick('guests')}>
                            <div className="search-form-label">Who</div>
                            <div className="search-form-desc">{getGuestsSubHeading()}</div>
                        </div>
                        <div style={{ display: "contents" }} onClick={handleSubmit}>
                            <SearchBtn />
                        </div>
                        {selectedTab === 'guests' &&
                            <div className="guest-select-container">
                                <GuestSelect guests={fields.guests} onSetField={onSetField} />
                            </div>}
                    </div>
                </div>
            </div>
        </section >
    )
}