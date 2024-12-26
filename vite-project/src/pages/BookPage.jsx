import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { stayService } from '../services/stay.service.js'
import { utilService } from '../services/util.service.js'
import { orderService } from '../services/order.service.js'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import arrowLeftImg from '/arrow-left.svg'
import rareDiamond from '/rare-diamond.svg'
import greenCheck from '/greenCheck.svg'
import { useSelector } from 'react-redux'
import { AppLogo } from '../cmps/app-logo.jsx'
import { BtnSquareColorRed } from '../cmps/buttons ui/btn-square-color.jsx'
import { RatingReview3 } from '../cmps/RatingReview3.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { Link} from 'react-router-dom'


export function BookPage() {
  const navigate = useNavigate()
  const { stayId } = useParams()
  const [info, setInfo] = useState(null)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const user = useSelector((state) => state.userModule.user)
  const [isBooked, setIsBooked] = useState(false)
  const { stay, order } = info || {}

  useEffect(() => {
    loadInfo()
  }, [])

  async function loadInfo() {
    try {
      const stayToSet = await stayService.getById(stayId)
      const orderToSet = loadOrder(stayToSet)
      setInfo({ stay: stayToSet, order: orderToSet })
    } catch (err) {
      console.log('Had issues loading  reservation', err)
      navigate('/stay')
    }
  }

  function loadOrder(stayToSet) {
    const SERVICE_FEE = 11.2
    const startDate = +params.get('checkIn') || Date.now()
    const endDate = +params.get('checkOut') || Date.now() + 1000 * 60 * 60 * 24
    const totalDays = +utilService.totalDays(startDate, endDate)
    const guests = {
      adults: +params.get('adults') || 1,
      children: +params.get('children') || 0,
      infants: +params.get('infants') || 0,
      pets: +params.get('pets') || 0,
    }

    const totalStayPrice = +(
      stayToSet.price * utilService.totalDays(startDate, endDate)
    ).toFixed(2)
    const totalFees = +(
      SERVICE_FEE * utilService.totalDays(startDate, endDate)
    ).toFixed(2)
    const totalWithFees = +(
      totalStayPrice +
      SERVICE_FEE * utilService.totalDays(startDate, endDate)
    ).toFixed(2)
    const hostId = stayToSet.host._id
    return {
      hostId,
      startDate,
      endDate,
      totalDays,
      totalWithFees,
      guests,
      totalFees,
      totalStayPrice,
    }
  }

  async function onAddOrder() {
    var {
      startDate,
      guests,
      endDate,
      totalWithFees: totalPrice,
      hostId,
    } = order
    const orderToSet = orderService.getEmptyOrder(
      startDate,
      endDate,
      guests,
      stayId,
      totalPrice,
      hostId
    )
    try {
      await orderService.save(orderToSet)
      setIsBooked(true)
      // setCurrentStep('payment')
      console.log('isBooked has been sent', isBooked)
    } catch (err) {
      console.log('Had issues in booking', err)
    }
    // const timeout = setTimeout(() => {
    //   navigate('/stay')
    // }, 3000)
    // return () => clearTimeout(timeout)
  }

  function getGuestsSubHeading() {
    var guestSubheading = ''
    const { adults, children, infants, pets } = order.guests
    if (adults) guestSubheading += `${adults} adults`
    if (children) guestSubheading += `, ${children} children`
    if (infants) guestSubheading += `, ${infants} infants`
    if (pets) guestSubheading += `, ${pets} pets`
    if (
      guestSubheading.includes(
        '1 adults' || '1 children' || '1 infants' || '1 pets'
      )
    ) {
      guestSubheading = guestSubheading.replace('1 adults', '1 adult')
      guestSubheading = guestSubheading.replace('1 children', '1 child')
      guestSubheading = guestSubheading.replace('1 infants', '1 infant')
      guestSubheading = guestSubheading.replace('1 pets', '1 pet')
    }
    if (!guestSubheading) guestSubheading = 'Add Guests'
    if (guestSubheading === '1 adult') guestSubheading = '1 guest'
    return guestSubheading
  }

  function onGoToTrip() {
    navigate('/trip')
  }

  function onGoBack() {
    navigate(-1)
  }

  if (!info) return <div><Loader /></div>
  return (
    <>
      <header className='app-header main-layout booking-header'>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
      </header>
      <section className='main-layout secondary-layout'>
        <header className='booking-title flex1 secondary-layout'>
          <div className='icon-svg'>
            {/* <img
              src={arrowLeftImg}
              className='arrow-img fs32'
              alt='arrowLeftImg'
              onClick={onGoBack}
            /> */}
            <Link to="/"><MdKeyboardArrowLeft size={44} style={{ cursor: 'pointer' }} /></Link>
          </div>
          <div>
            {/* {currentStep !== 'payment' && !isBooked && <h2>Request to book</h2>}
            {currentStep === 'payment' && <h2>Proceed to Payment</h2>} */}
            {!isBooked && <h2>Request to book</h2>}
            {isBooked && (
              <div className="success-message-container">
                <div className='success-title flex1'>
                  <img
                    src={greenCheck}
                    className='icon-svg greenCheck-img'
                    alt='Success'
                  />
                  <h2>Reservation success!</h2>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className='order-content flex justify-between secondary-layout'>
          <section className='order-details flex1'>
            <div className=''>
              <div className='rare-find flex1 justify-between'>
                <div>
                  <h4>This is a rare find</h4>
                  <h5 className='rare-host'>
                    {stay.host.fullname}'s place is usually booked.
                  </h5>
                </div>
                <img
                  src={rareDiamond}
                  className='diamond-img'
                  alt='arrowLeftImg'
                />
              </div>
              <div className='trip-details'>
                <h3 className='your-trip'>Your trip</h3>
                <div className='flex1 justify-between'>
                  <h4 className='trip-subheader'>Dates</h4>
                  <h5 className='trip-details-data'>
                    {utilService.formattedDate(order.startDate)} -{' '}
                    {utilService.formattedDate(order.endDate)}
                  </h5>
                </div>
                <div className='flex justify-between'>
                  <h4 className='trip-subheader'>Guests</h4>
                  <h5 className='trip-details-data'>{getGuestsSubHeading()}</h5>
                </div>
              </div>
            </div>
            <div className='order-user'>
              {!isBooked && (
                <>
                  {user ? (
                    <BtnSquareColorRed onClick={onAddOrder}>
                      Confirm
                    </BtnSquareColorRed>
                  ) : (
                    <div>
                      <h3 className='login-msg'>Please login to book</h3>
                      <LoginSignup />
                    </div>
                  )}
                </>
              )}
              {isBooked && (
                <>
                  <h3 className='success-msg'>
                    We look forward to hosting you!
                  </h3>
                  {user && (
                    <BtnSquareColorRed onClick={onGoToTrip}>
                      Review Trips
                    </BtnSquareColorRed>
                  )}
                  <div style={{ display: 'flex' }} className='success-txt'>
                    <div className='icon-svg'>
                      <img
                        src={greenCheck}
                        className='greenCheck-img'
                        alt='greenCheckImg'
                      />
                    </div>
                    <h4 className='res-success-txt'>Reservation success!</h4>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className='summary-card'>
            <div style={{ display: 'flex' }} className='stay-details border-buttom'>
              <img
                className='stay-img'
                src={stay.imgUrls[0]}
                alt='stay-preview'
              />
              <div className='stay-desc flex justify-between'>
                <div>
                  <h4 className='stay-name'>{stay.name}</h4>
                  <h4 className='stay-type'>{stay.type}</h4>
                  <div style={{ display: 'flex' }}>
                    <RatingReview3 reviews={stay.reviews} />
                    <span className='reviews calcAvgReview-reviews fs14'>
                      ({stay.reviews.length})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='air-cover flex1 border-buttom'>
              <p className='flex1'>
                <span className='air-cover-text'>
                  Your booking is protected by
                </span>
                <img
                  src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'
                  alt='aircover'
                />
              </p>
            </div>
            <div className='price-details'>
              <h3 className='price-details-header'>Price details</h3>
              <div style={{ display: 'flex' }} className='cost-breakdown'>
                <div style={{ display: 'flex' }} className='cost-details border-buttom'>
                  <div className='base-cost flex justify-between'>
                    <span className='cost-calc'>
                      ${stay.price.toLocaleString()} x {order.totalDays} nights
                    </span>
                    <span>$ {order.totalStayPrice.toLocaleString()}</span>
                  </div>
                  <div className='base-cost service flex justify-between'>
                    <span className='cost-calc'>Service fee</span>
                    <span>${order.totalFees.toLocaleString()}</span>
                  </div>
                </div>
                <div className='total-container'>
                  <div className='cost-total flex justify-between'>
                    <span>
                      Total{' '}
                      <span style={{ textDecoration: 'underline' }}>(USD)</span>
                    </span>
                    <span>${order.totalWithFees.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  )
}
