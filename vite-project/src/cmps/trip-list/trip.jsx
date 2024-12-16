
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
  if (!order) return null

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  const currency = useSelector((state) => state.stayModule.currency)

  const startDate = moment(order.startDate, "YYYY/MM/DD")
  const endDate = moment(order.endDate, "YYYY/MM/DD")

  console.log("Start Date Valid:", startDate.isValid(), "End Date Valid:", endDate.isValid())
  console.log("Start Date:", startDate.format(), "End Date:", endDate.format())

  const days = startDate.isValid() && endDate.isValid() ? endDate.diff(startDate, 'days') : 0
  console.log("Calculated Days:", days)

  const pricePerDay = parseFloat(order.stay.price)
  console.log("Price Per Day:", pricePerDay)

  const totalPrice = !isNaN(pricePerDay) && days > 0 ? pricePerDay * days : 0
  console.log("Total Price:", totalPrice)

  // Currency conversion
  const { convertedAmount = 0, currencySymbol = '$' } = convertCurrency(totalPrice, currency)
  console.log("Converted Amount:", convertedAmount, "Currency Symbol:", currencySymbol)

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
        <p>
          {startDate.isValid() && endDate.isValid()
            ? `${endDate.format('DD/MM/YYYY')}`
            : 'Invalid Dates'}
        </p>
      </td>
      <td className='text-bold'>
        <p>{currencySymbol} {totalPrice > 0 ? convertedAmount.toFixed(2) : '0.00'}</p>
      </td>
      <td>
        <OrderStatus status={order.status} />
      </td>
      <td>
        <div onClick={() => cancelOrder()}>Cancel</div>
      </td>
    </>
  )
}
