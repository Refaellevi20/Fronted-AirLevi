import { useEffect, useState } from 'react'
import { utilService } from '../../services/util.service'
import { updateOrder } from '../../store/order.action'
import { GuestTable } from '../gust/GustTable'
import { StayTable } from './StayTable'
import { ActionButtons } from '../ActionButtons'
import { OrderStatus } from '../OrderStatus'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { convertCurrency } from '../../services/currency'
// import { format, differenceInCalendarDays } from 'date-fns'

export function Order({ order }) {
  const [orderToEdit, setOrderToEdit] = useState(order)
  const currency = useSelector((state) => state.stayModule.currency)

  function onUpdateOrderStatus(status) {
    const updatedOrder = { ...orderToEdit, status }
    setOrderToEdit(updatedOrder)
    updateOrder(updatedOrder) 
  }

  useEffect(() => {
    setOrderToEdit(order)
  }, [order])
  console.log('orders', order)

  //* Try to parse the dates without a specific format (moment can infer the format)
   const startDate = moment(order.startDate)
   const endDate = moment(order.endDate)
 
   //* Check if the dates are valid
   const startDateValid = startDate.isValid()
   const endDateValid = endDate.isValid()
 
  //  console.log("Start Date Valid:", startDateValid, "End Date Valid:", endDateValid)
  //  console.log("Start Date:", startDate.format(), "End Date:", endDate.format())
 
   //* Calculate the number of days if both dates are valid
   const days = startDateValid && endDateValid ? endDate.diff(startDate, 'days') : 0
  //  console.log("Calculated Days:", days)
 
   //* Check if price exists in order.stay, if not set a default value
   const pricePerDay = order.stay?.price > 0 ? order.stay?.price : 80 //! here is the problom Default to 100 if no price is available
  //  console.log("Price Per Day:", pricePerDay)
 
   //* Calculate total price, ensure it is valid
   const totalPrice = pricePerDay > 0 && days > 0 ? pricePerDay * days : 0
  //  console.log("Total Price:", totalPrice)
 
   //* Currency conversion
   const { convertedAmount = 0, currencySymbol = '$' } = convertCurrency(totalPrice, currency)
  //  console.log("Converted Amount:", convertedAmount, "Currency Symbol:", currencySymbol)
 
   //* Date formatting for display
   const formattedStartDate = startDate.format('MMM D, YYYY')
   const formattedEndDate = endDate.format('MMM D, YYYY h:mm:ss A')
 
  if (!order) return
  return (
    <>
      <td>
        <GuestTable guest={order.buyer} />
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
      <td>
        <StayTable stay={order.stay} />
      </td>
      <td className='text-bold'>
      {currencySymbol} {totalPrice > 0 ? convertedAmount : '0.00'}
      </td>
      <td className="order-status">
        <OrderStatus status={orderToEdit.status} />
      </td>
      <td className='action-btns'>
        <ActionButtons orderToEdit={orderToEdit} onUpdateOrderStatus={onUpdateOrderStatus} />
      </td>
    </>
  )
}