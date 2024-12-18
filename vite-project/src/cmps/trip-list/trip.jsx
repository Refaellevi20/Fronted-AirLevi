
// import { updateOrder } from '../../store/order.action'
// import { utilService } from '../../services/util.service';
// import { convertCurrency } from "../../services/currency"

// import moment from 'moment'
// import { useSelector } from 'react-redux'
// import { OrderStatus } from '../OrderStatus';
// export function Trip({ order }) {
//   if (!order) return

//   function cancelOrder() {
//     console.log('cancel order')
//     updateOrder({ ...order, status: 'canceled' })
//   }

//   const currency = useSelector((state) => state.stayModule.currency);

//   const startDate = moment(order.startDate, "YYYY/MM/DD");
//   const endDate = moment(order.endDate, "YYYY/MM/DD");

//   const days = endDate.isValid() && startDate.isValid() ? endDate.diff(startDate, 'days') : 0;

//   const pricePerDay = parseFloat(order.stay.price);
//   const totalPrice = !isNaN(pricePerDay) && !isNaN(days) && days > 0 ? pricePerDay * days : 0;

//   const { convertedAmount = 0, currencySymbol = '$' } = convertCurrency(totalPrice, currency);

//   return (
//     <>
//       <td>
//         <p>user host </p>
//       </td>
//       <td>
//         <p>dcvf</p>
//       </td>
//       <td>
//         <p>{startDate.isValid() && endDate.isValid() ? ` ${endDate.format('DD/MM/YYYY')}` : 'Invalid Dates'}</p>
//       </td>
//       <td className='text-bold'>
//         <p>{currencySymbol} {convertedAmount > 0 ? convertedAmount.toFixed(2) : '0.00'}</p> 
//       </td>
//       <td>
//         <OrderStatus status={order.status} />
//       </td>
//       <td>
//         <div onClick={() => cancelOrder()}>Cancel</div>
//       </td>
//     </>
//   )
// }


import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service'
import { convertCurrency } from "../../services/currency"
import moment from 'moment'
import { useSelector } from 'react-redux'
import { OrderStatus } from '../OrderStatus'
// import { StayTable } from '../StayTable'


export function Trip({ order }) {
  const currency = useSelector((state) => state.stayModule.currency)

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  console.log("Order Object:", order)

  //* Try to parse the dates without a specific format (moment can infer the format)
  const startDate = moment(order.startDate)
  const endDate = moment(order.endDate)

  //* Check if the dates are valid
  const startDateValid = startDate.isValid()
  const endDateValid = endDate.isValid()

  console.log("Start Date Valid:", startDateValid, "End Date Valid:", endDateValid)
  console.log("Start Date:", startDate.format(), "End Date:", endDate.format())

  //* Calculate the number of days if both dates are valid
  const days = startDateValid && endDateValid ? endDate.diff(startDate, 'days') : 0
  console.log("Calculated Days:", days)

  //* Check if price exists in order.stay, if not set a default value
  const pricePerDay = order.stay?.price > 0 ? order.stay?.price : 100 //! here is the problom Default to 100 if no price is available
  console.log("Price Per Day:", pricePerDay)

  //* Calculate total price, ensure it is valid
  const totalPrice = pricePerDay > 0 && days > 0 ? pricePerDay * days : 0
  console.log("Total Price:", totalPrice)

  //* Currency conversion
  const { convertedAmount = 0, currencySymbol = '$' } = convertCurrency(totalPrice, currency)
  console.log("Converted Amount:", convertedAmount, "Currency Symbol:", currencySymbol)

  //* Date formatting for display
  const formattedStartDate = startDate.format('MMM D, YYYY')
  const formattedEndDate = endDate.format('MMM D, YYYY')

  return (
    <>
      <td>
      {/* <StayTable stay={order.stay || 'Unknown Host'} /> */}
      </td>
      <td>
      {/* {StayHosTable} */}
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
           {currencySymbol} {totalPrice > 0 ? convertedAmount.toFixed(2) : '0.00'}
          </div>      </td>
      <td>
        <OrderStatus status={order.status} />
      </td>
      <td>
        <div onClick={() => cancelOrder()}>Cancel</div>
      </td>
    </>
  )
}

// import React from 'react'

// export function Trip({ order }) {
//   if (!order || !order.stay) {
//     return (
//       <tr>
//         <td colSpan="5">Invalid order or stay information</td>
//       </tr>
//     )
//   }

//   const { stay, startDate, endDate } = order

//   const formattedStartDate = startDate
//     ? new Date(startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
//     : 'N/A'
//   const formattedEndDate = endDate
//     ? new Date(endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
//     : 'N/A'

//   const startDateObj = startDate ? new Date(startDate) : null
//   const endDateObj = endDate ? new Date(endDate) : null

//   const days =
//     startDateObj && endDateObj
//       ? Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24))
//       : 0

//   const pricePerNight = stay.price || 0
//   const totalPrice = pricePerNight * days

//   //^ Debugging 
//   console.log('Stay:', stay)
//   console.log('Price per night:', pricePerNight)
//   console.log('Start Date:', startDateObj)
//   console.log('End Date:', endDateObj)
//   console.log('Days:', days)
//   console.log('Total Price:', totalPrice)
//   return (
//     <tr>
//       <td>{stay.name || 'Unknown Stay'}</td>

//       <td>{stay.host || 'Unknown Host'}</td>

//       <td>
//         {formattedStartDate} - {formattedEndDate}
//       </td>

//       <td className="text-bold">
//         {totalPrice.toLocaleString()}
//       </td>

//       <td>
//         <span>{order.status || 'No Status'}</span>
//       </td>
//     </tr>
//   )
// }
