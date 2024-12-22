import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/order.action'
import { REMOVE_NOTIFICATION } from '../store/user.reducer'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'
import { OrderList } from '../cmps/host/OrderList'
import { NavLink, useNavigate } from 'react-router-dom'

export function OrderPage() {
  // const user = useSelector((storeState) => storeState.userModule.user)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const orders = useSelector((storeState) => storeState.orderModule.orders).sort((a, b) => b.startDate - a.startDate)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders({ userId: loggedinUser._id })
    dispatch({ type: REMOVE_NOTIFICATION, notificationType: 'order' })
  }, [loggedinUser])


  if (!loggedinUser) navigate('/stay')
  return (
    <div className='order-page'>
       <header className='app-header flex'>
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
      <OrderList orders={orders} isLoading={isLoading} />
      </div>
    )}
    </div>
  )
}
