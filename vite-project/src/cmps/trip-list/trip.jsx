
import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service'

import moment from 'moment'
export function Trip({ order }) {
  if (!order) return 

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  console.log('order.stay:', order.stay)


  console.log('order.stay:', order.stay)
  
  // Parse the start and end dates using Moment.js
  const startDate = moment(order.startDate)
  const endDate = moment(order.endDate)
  
  // Check if the dates are in the same month
  const sameMonth = startDate.isSame(endDate, 'month')
  
  // Calculate the total days between the dates
  const days = endDate.diff(startDate, 'days')
  
  console.log('Same month:', sameMonth)
  console.log('Total days:', days)
  
  return (
    <>
      <td>
        <p>user host</p>
      </td>
      <td>
        <p>dcvf</p>
      </td>
      <td>
      <p>format time</p>
      </td>
      <td className='text-bold'>
        {/* {(order.stay.price * days)} */}
      </td>
      <td>
        {order.status === 'pending'  }
        {order.status === 'approved' }
        {order.status === 'canceled' }
        {order.status === 'completed'}
        {order.status === 'rejected' } {order.status}
      </td>
      <td>
        <div onClick={() => cancelOrder()}>Cancel</div>
      </td>
    </>
  )
}
