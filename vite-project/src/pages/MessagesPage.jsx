import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatOrderDetails } from '../cmps/chat/ChatOrderDetails'
import { ChatOrderList } from '../cmps/chat/ChatOrderList'
import { ChatRoom } from '../cmps/chat/ChatRoom'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'
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
      {/* HEADER */}
      <div className='header-container'>
      <header className='app-header header-container flex'>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      </div>

      {/* MAIN 3 Columns {orderList - messages - orderDetails} */}
      <div className='msg-main-container'>
        <div className='inbox-container'>
          {/* Column 1 - Orders List/Select */}
          <div className='inbox-column orders-list'>
            <div className='inbox-header all-orders'>
              <h2>Orders messages</h2>
            </div>
            {isLoading && (
              <div className='inbox-list'>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                  Loading...
                </h1>
              </div>
            )}
            {!isLoading && (
              <div className='inbox-list-container'>
                <ChatOrderList
                  orders={orders}
                  loggedInUser={loggedInUser}
                  onSetCurrOrder={onSetCurrOrder}
                  currOrder={currOrder}
                />
              </div>
            )}
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

          {/* Column 3 - Order Details */}
          <div className='inbox-column order-details'>
            <div className='inbox-header'>
              <h2>Order details</h2>
            </div>
            {currOrder && (
              <div className='currorder-details'>
                {isLoading && <div>Loading...</div>}
                {!isLoading && (
                  <>
                    <ChatOrderDetails currOrder={currOrder} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
