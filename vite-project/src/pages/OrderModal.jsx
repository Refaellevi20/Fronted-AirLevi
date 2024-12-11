import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { DateSelect } from '../cmps/DateSelect.jsx'
import { GuestSelect } from '../cmps/GuestSelect.jsx'
import { OrderDetails } from '../cmps/details/OrderDetails.jsx'
import { utilService } from '../services/util.service.js'

export function OrderModal({ stay, setOpenTab, openTab, reserveBtnRef }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [refVisible, setRefVisible] = useState(false)
  const navigate = useNavigate()
  const modalRef = useRef(null)


  const orderParams = {
    checkIn: searchParams.get('checkIn')
      ? new Date(+searchParams.get('checkIn'))
      : '',
    checkOut: searchParams.get('checkOut')
      ? new Date(+searchParams.get('checkOut'))
      : '',
    guests: {
      adults: +searchParams.get('adults') || 1,
      children: +searchParams.get('children') || 0,
      infants: +searchParams.get('infants') || 0,
      pets: +searchParams.get('pets') || 0,
    },
  }

  function onSetField(field, value) {
    console.log(searchParams)
    if (field === 'guests') {
      searchParams.set('adults', value.adults)
      searchParams.set('children', value.children)
      searchParams.set('infants', value.infants)
      searchParams.set('pets', value.pets)
    }
    if (field === 'checkIn' || field === 'checkOut') {
      if (value) {
        value = value.getTime()
      }
      searchParams.set(field, value)
    }
    setSearchParams(searchParams)
  }

  function onClickReserve() {
    const paramsToSet = utilService.objectToSearchParams({
      checkIn: orderParams.checkIn.getTime(),
      checkOut: orderParams.checkOut.getTime(),
      adults: orderParams.guests.adults,
      children: orderParams.guests.children,
      infants: orderParams.guests.infants,
      pets: orderParams.guests.pets,
    })
    navigate(`/book/stay/${stay._id}?${paramsToSet}`)
  }

  const checkInSubHeading = orderParams.checkIn
    ? `${utilService.formattedDate(+orderParams.checkIn)}`
    : 'Add Date'
  const checkOutSubHeading = orderParams.checkOut
    ? `${utilService.formattedDate(+orderParams.checkOut)}`
    : 'Add Date'

  function getGuestsSubHeading() {
    var guestSubheading = ''
    const { adults, children, infants, pets } = orderParams.guests
    if (adults) guestSubheading += `${adults} adults`
    if (children) guestSubheading += `, ${children} children`
    if (infants) guestSubheading += `, ${infants} infants`
    if (pets) guestSubheading += `, ${pets} pets`
    if (guestSubheading.includes('1 adults' || '1 children' || '1 infants' || '1 pets')) {
      guestSubheading = guestSubheading.replace('1 adults', '1 adult')
      guestSubheading = guestSubheading.replace('1 children', '1 child')
      guestSubheading = guestSubheading.replace('1 infants', '1 infant')
      guestSubheading = guestSubheading.replace('1 pets', '1 pet')
    }
    if (!guestSubheading) guestSubheading = 'Add Guests'
    if (guestSubheading === '1 adult') guestSubheading = '1 guest'
    return guestSubheading
  }

  function handleOverlayClick(ev) {
    if (modalRef.current && !modalRef.current.contains(ev.target)) {
      setOpenTab('')
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOverlayClick)
    return () => {
      document.removeEventListener('click', handleOverlayClick)
    }
  }, [])

  return (
    <section className='order-modal'>
         {/* <div className="modal-overlay" onClick={handleOverlayClick}></div> */}
      <div className='order-modal-form flex' ref={modalRef}>
        <header className='order-form-header flex'>
          <h4>
            <span className="order-price">${(Math.round(stay.price)).toLocaleString()}</span>
            <span className="order-night" style={{ fontFamily: 'cereal-Book' }}> night</span>
          </h4>
        </header>

        <section className='picker-container'>
          
          {(openTab === 'checkIn' || openTab === 'checkOut') && (
            <section className='date-picker-modal'>
              <div className='date-picker-header'>
              {(orderParams.checkIn && orderParams.checkOut) ? (<h4>{utilService.totalDays(orderParams.checkIn, orderParams.checkOut)} nights</h4>) : <h4>Select Dates</h4>}
              {(orderParams.checkIn && orderParams.checkOut) ? ( <h5>{utilService.ShortFormattedDate(orderParams.checkIn)}-{utilService.ShortFormattedDate(orderParams.checkOut)}</h5>) : <h5>Minimum nights: 2 days</h5>}
              </div>
              <DateSelect
                checkIn={orderParams.checkIn}
                checkOut={orderParams.checkOut}
                onSetField={onSetField}
                className='date-picker'
              />
              <div className="date-picker-modal-btns">
                <button className="reset-dates-btn clean-button" onClick={() => { onSetField('checkIn', ''); onSetField('checkOut', '') }}>Clear dates</button>
                <div className='close-dates-btn'>
                  <div className='pointer' onClick={() => setOpenTab('')}>Close</div>
                </div>
              </div>
            </section>
          )}
          <section className={(openTab === 'checkIn' || openTab === 'checkOut') ? 'dates-selection active' : 'dates-selection'}>
            <button
              onClick={() => setOpenTab('checkIn')}
              className='clean-button check-in picker'>
              <div className='order-heading'>Check-In</div>
              <div className='order-sub-heading'>{checkInSubHeading}</div>
            </button>

            <button
              onClick={() => setOpenTab('checkOut')}
              className='clean-button check-out picker'>
              <div className='order-heading'>Check-Out</div>
              <div className='order-sub-heading'>{checkOutSubHeading}</div>
            </button>
          </section>

          <div className='guest-picker'>
            <button className='clean-button guest-btn' onClick={() => (openTab === 'guests' ? setOpenTab(null) : setOpenTab('guests'))}>
              <div className='order-heading'>Guests</div>
              <div className='order-sub-heading'>{getGuestsSubHeading()}</div>
              <div className="drawer-arrow-icon">{(openTab === 'guests' ? <IoIosArrowUp /> : <IoIosArrowDown />)}</div>
            </button>
            {openTab === 'guests' && (
              <div className='guest-select-container-small'>
                <GuestSelect
                  guests={orderParams.guests}
                  onSetField={onSetField}
                />
              </div>
            )}
          </div>
        </section>

        {/* Reserve/CheckAvailability Button */}
        <div>
          <div className='reserve-btns-ref' ref={el => { reserveBtnRef.current = el; setRefVisible(!!el) }}></div>
          
          <section className='order-details flex'>
            {orderParams.checkIn && orderParams.checkOut && (
              <OrderDetails
                checkIn={orderParams.checkIn}
                checkOut={orderParams.checkOut}
                stay={stay}
              />
            )}

          </section>
        </div>
      </div>
    </section>
  )
}
