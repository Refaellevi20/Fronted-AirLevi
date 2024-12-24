
import React, { useEffect, useState } from 'react'
import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service'
import { convertCurrency } from "../../services/currency"
import moment from 'moment'
import { useSelector } from 'react-redux'
import { OrderStatus } from '../OrderStatus'
import { StayTable } from '../host/StayTable'
import { StayHosTable } from '../host/StayHosTable'
import { HostedSmallDetails } from '../details/HostedSmallDetails'


export function Trip({ order,stay }) {
  const [currentOrder, setCurrentOrder] = useState(order)
  const currency = useSelector((state) => state.stayModule.currency)

  useEffect(() => {
    setCurrentOrder(order)
  }, [order])

  function cancelOrder() {
    console.log('cancel order')
    const updatedOrder = { ...currentOrder, status: 'canceled' }
    setCurrentOrder(updatedOrder)
    updateOrder(updatedOrder)
  }

  
  //* Try to parse the dates without a specific format (moment can infer the format)
  const startDate = moment(order.startDate)
  const endDate = moment(order.endDate)

  //* Check if the dates are valid
  const startDateValid = startDate.isValid()
  const endDateValid = endDate.isValid()

  // console.log("Start Date Valid:", startDateValid, "End Date Valid:", endDateValid)
  // console.log("Start Date:", startDate.format(), "End Date:", endDate.format())

  //* Calculate the number of days if both dates are valid
  const days = utilService.totalDays(order.startDate, order.endDate)
  // console.log("Calculated Days:", days)
  function getRandomNumberWithFractions(min, max) {
    return Math.random() * (max - min) + min
  }

  const randomNumWithFractions = getRandomNumberWithFractions(4, 9)
  // console.log(randomNumWithFractions)
  //* Check if price exists in order.stay, if not set a default value
  const getPricePerDay = () => {
    const stayPrice = order.stay?.price
    if (!stayPrice) return 600 
    if (stayPrice > 0 && stayPrice < 1000) return 600
    if (stayPrice >= 1000) return 1200
    return 600 // Fallback default
  }
  // console.log("Price Per Day:", pricePerDay)

  //* Calculate total price, ensure it is valid
  const pricePerDay = getPricePerDay()
  const totalPrice = randomNumWithFractions * pricePerDay
    // console.log("Total Price:", totalPrice)

  //* Currency conversion
  const { convertedAmount = 0, currencySymbol = '$' } = convertCurrency(totalPrice, currency)
  // console.log("Converted Amount:", convertedAmount, "Currency Symbol:", currencySymbol)

  //* Date formatting for display
  const formattedStartDate = startDate.format('MMM D, YYYY')
  const formattedEndDate = endDate.format('MMM D, YYYY h:mm:ss A')

  return (
    <>
      <td>        
      <StayTable stay={order.stay} />
      </td>
      <td>
      <div>
        <div className="flex">
          <img
            src={ 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/3.jpg'} 
            alt="host-img"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <h5>{'barba'}</h5>
        </div>
      </div>
        {/* <p>{order.stay.host || 'No description'}</p> */} 
      </td>
      <td>
      {startDateValid && endDateValid ? (
        <>
          <span>{formattedStartDate}- {formattedEndDate}</span>
        </>
      ) : (
        'Invalid Dates'
      )}
    </td>
      <td className='text-bold'>
      <div>
      {/* {(order.totalPrice)} */}
           {currencySymbol} {totalPrice > 0 ? convertedAmount : '0.00' }
          </div>      </td>
      <td>
        <OrderStatus status={currentOrder.status} />
      </td>
      <td>
        <div onClick={() => cancelOrder()}>Cancel</div>
      </td>
    </>
  )
}

