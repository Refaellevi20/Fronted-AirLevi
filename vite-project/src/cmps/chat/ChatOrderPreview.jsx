import { utilService } from "../../services/util.service"

export function ChatOrderPreview({ order, onSetCurrOrder, currOrder, loggedInUser, }) {
  const className =
    currOrder && currOrder._id === order._id
      ? 'chat-order-preview active'
      : 'chat-order-preview'

  const contact =
    order.hostId === loggedInUser._id
      ? order.buyer
      : order.stay?.host || { fullname: 'Shuka', imgUrl: 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/3.jpg' }

  let hours
  let minutes
  if (order.msgs[order.msgs.length - 1]?.createdAt) {
    const msgTime = new Date(order.msgs[order.msgs.length - 1]?.createdAt)
    hours = msgTime.getHours()
    minutes =
      msgTime.getMinutes() < 10
        ? '0' + msgTime.getMinutes()
        : msgTime.getMinutes()
  }

  let orderMsg
  if (order.msgs[order.msgs.length - 1]?.txt) {
    const msgTxt = order.msgs[order.msgs.length - 1]?.txt
    orderMsg = msgTxt.length > 50 ? msgTxt.substring(0, 50) + '...' : msgTxt
  }

  const checkInDate = utilService.ShortFormattedDate(order.startDate)
  const checkOutDate = utilService.ShortFormattedDate(order.endDate)

  return (
    <div
      className={className}
      onClick={() => {
        onSetCurrOrder(order._id)
      }}>
      <div className='chat-order__avatar'>
        <img src={contact.imgUrl} alt={'avatar'} className='mini-user-img' />
      </div>
      <div className='chat-order__details flex'>
        <div className='chat-order__status flex '>
        </div>

        <div className='chat-order__name'>{contact.fullname}</div>
        <div className='chat-order__msg'>{orderMsg}</div>

        <div className='chat-mini__details'>
          <span className={`chat-show__status`}>{order.status}</span>
          {' \u2022 '}
          <span className='chat-mini__booking'>
            {checkInDate}-{checkOutDate}
          </span>
        </div>
      </div>
    </div>
  )
}

//^ Block-Element-Modifier