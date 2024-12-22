import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatRoom } from '../cmps/chat/ChatRoom'
import { loadOrders } from '../store/order.action'


export function MessagesPage() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const [currOrder, setCurrOrder] = useState(null)
  const notifications = useSelector(
    (storeState) => storeState.userModule.notifications
  )
  const dispatch = useDispatch()
  console.log(notifications)

  useEffect(() => {
    loadOrders()
    dispatch({ type: 'REMOVE_NOTIFICATIONS', notificationType: 'msg' })
  }, [])

  function onSetCurrOrder(orderId) {
    const orderToSet = orders.find((order) => order._id === orderId)
    setCurrOrder(orderToSet)
    console.log('currOrder', currOrder)
  }

  return (
    <section className='messages-page'>
    

      {/* MAIN 3 Columns {orderList - messages - orderDetails} */}
      <div className='msg-main-container'>
        <div className='inbox-container'>
          {/* Column 1 - Orders List/Select */}
          <div className='inbox-column orders-list'>
            <div className='inbox-header all-orders'>
              <h2>Orders messages</h2>
            </div>
          </div>

          {/* Column 2 - Messages */}
          <div className='inbox-column messages'>
            <div className='chat-backdrop'>
              {isLoading && (
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                  Loading...
                </h1>
              )}
              {!isLoading && currOrder && (
                <div className={'chat-container'}>
                  <ChatRoom order={currOrder} loggedInUser={loggedInUser} />
                </div>
              )}
            </div>
          </div>         
        </div>
      </div>
    </section>
  )
}
