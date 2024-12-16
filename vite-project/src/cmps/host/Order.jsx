import { useState } from 'react'
import { utilService } from '../../services/util.service'
import { updateOrder } from '../../store/order.action'
import { GuestTable } from '../gust/GustTable'
import { format, differenceInCalendarDays } from 'date-fns'

export function Order({ order }) {
  const [orderToEdit, setOrderToEdit] = useState(order)

  function onUpdateOrderStatus(status) {
    setOrderToEdit((prevOrder) => ({ ...prevOrder, status }))
    updateOrder({ ...order, status })
  }

  const startDate = new Date(order.startDate)
  const endDate = new Date(order.endDate)

  const sameMonth = startDate.getMonth() === endDate.getMonth()

  const days = differenceInCalendarDays(endDate, startDate)

  const formatStart = format(startDate, 'MMM d')
  const formatEnd = format(endDate, sameMonth ? 'd' : 'MMM d')

  if (!order) return
  return (
    <>
      <td>
        <GuestTable guest={order.buyer} />
      </td>
      <td>
        {formatStart} - {formatEnd} ({days} days)
      </td>
      <td>
        <p>buyer</p>
      </td>
      <td className='text-bold'>
        <p>time</p>
      </td>
      <td className='order-status'>
        {order.status === 'pending'}
        {order.status === 'approved'}
        {order.status === 'canceled'}
        {order.status === 'completed'}
        {order.status === 'rejected'}
        {order.status}
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
