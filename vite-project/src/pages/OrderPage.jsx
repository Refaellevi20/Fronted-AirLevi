import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/order.action'
import { REMOVE_NOTIFICATION } from '../store/user.reducer'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'
import { OrderList } from '../cmps/host/OrderList'
import { useNavigate } from 'react-router-dom'
import { ScrollButton } from '../cmps/ScrollButton'
import { AppFooterMobileOrder } from '../cmps/AppFooterMobileOrder'

export function OrderPage() {
  
  const initialOrders = useSelector((storeState) =>   storeState.orderModule.orders.sort((a, b) => b.startDate - a.startDate))
  const [orders, setOrders] = useState(initialOrders)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleOrdersReorder(reorderedOrders) {
      setOrders(reorderedOrders)

  }
  useEffect(() => {
    loadOrders({ userId: loggedinUser._id })
    dispatch({ type: REMOVE_NOTIFICATION, notificationType: 'order' })
  }, [loggedinUser])


  if (!loggedinUser) navigate('/stay')
  return (
    <div className='order-page'>
       <header className='app-header flex border-buttom'>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      {orders && (
        <div>
      <div className='hero'>
        <h2>Welcome back, {loggedinUser.fullname}</h2>
      </div>
      <h3>Orders</h3>
      <OrderList   onOrdersReorder={handleOrdersReorder} orders={orders} isLoading={isLoading} />
      </div>
    )}
      <ScrollButton />
      <AppFooterMobileOrder />
    </div>
  )
}
