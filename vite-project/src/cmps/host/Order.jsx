import { useState } from 'react'
import { utilService } from '../../services/util.service'
import { updateOrder } from '../../store/order.action'
import { GuestTable } from '../gust/GustTable'
// import { format, differenceInCalendarDays } from 'date-fns'

export function Order({ order }) {
  const [orderToEdit, setOrderToEdit] = useState(order)
  function onUpdateOrderStatus(status) {
    setOrderToEdit((prevOrder) => ({ ...prevOrder, status }))
    updateOrder({ ...order, status })
  }

  const startDate = new Date(order.startDate)
  const endDate = new Date(order.endDate)
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const days = utilService.totalDays(order.startDate, order.endDate)

  if (!order) return
  return (
    <>
      <td>
        <GuestTable guest={order.buyer} />
      </td>
      <td>
        {startDate.toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {sameMonth
          ? endDate.toLocaleString('en-US', {
              day: 'numeric',
            })
          : endDate.toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
            })}
      </td>
      <td>
        {/* <StayCard stay={order.stay} /> */}
      </td>
      <td className='text-bold'>
        {utilService.formatCurrency2(order.stay.price * days)}
      </td>
      <td className='order-status'>
        {order.status === 'pending' }
        {order.status === 'approved' }
        {order.status === 'canceled' }
        {order.status === 'completed' }
        {order.status === 'rejected' } {order.status}
      </td>
      <td className='action-btns'>
        <div
          className={orderToEdit.status === 'pending' ? '' : 'disable'}
          onClick={() => onUpdateOrderStatus('approved')}>
          Accept
        </div>
        <div
          className={orderToEdit.status === 'pending' ? '' : 'disable'}
          onClick={() => onUpdateOrderStatus('rejected')}>
          Reject
        </div>
      </td>
    </>
  )
}