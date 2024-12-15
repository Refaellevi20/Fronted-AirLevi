
import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service';
import { convertCurrency } from "../../services/currency"

import moment from 'moment'
import { useSelector } from 'react-redux'
export function Trip({ order }) {
  if (!order) return

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  const currency = useSelector((state) => state.stayModule.currency)

  // Calculate the total price (multiplying price per day by the number of days)
  const startDate = moment(order.startDate)
  const endDate = moment(order.endDate)
  const days = endDate.diff(startDate, 'days')

  // Multiply the stay price by days
  const totalPrice = order.stay.price * days

  // Convert the total price based on the selected currency
  const { convertedAmount: convertedTotalPrice, currencySymbol } = convertCurrency(totalPrice, currency)

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  return (
    <>
      <td>
        <p>user host </p>
      </td>
      <td>
        <p>dcvf</p>
      </td>
      <td>
        <p>format time</p>
      </td>
      <td className='text-bold'>
        <p>
        {currencySymbol} {convertedTotalPrice.toFixed(2)}
                </p>
        {/* {(order.stay.price * days)} */}
      </td>
      <td>
        {order.status === 'pending'}
        {order.status === 'approved'}
        {order.status === 'canceled'}
        {order.status === 'completed'}
        {order.status === 'rejected'} {order.status}
      </td>
      <td>
        <div onClick={() => cancelOrder()}>Cancel</div>
      </td>
    </>
  )
}
