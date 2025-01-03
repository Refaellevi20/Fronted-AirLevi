import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../cmps/app-logo'
import { REMOVE_NOTIFICATION } from '../store/user.reducer'
import { loadOrders } from '../store/order.action'
import { TripList } from '../cmps/trip-list/TripList'
import { NavMenu } from './nav-menu'
import { ScrollButton } from '../cmps/ScrollButton'
import { AppFooterMobile } from '../cmps/AppFooterMobile'


export function TripPage() {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const storeOrders = useSelector((storeState) => storeState.orderModule.orders)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const [orders, setOrders] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedinUser) {
      loadOrders({ userId: loggedinUser._id })
      dispatch({ type: REMOVE_NOTIFICATION, notificationType: 'order' })
    }
  }, [loggedinUser])

  useEffect(() => {
    if (storeOrders?.length) {
      setOrders(storeOrders)
    }
  }, [storeOrders])

  function handleOrdersReorder(reorderedOrders) {
    setOrders(reorderedOrders)
  }

  if (!loggedinUser) navigate('/stay')

  return (
    <section >
      <header className='app-header secondary-layout flex border-buttom' style={{ justifyContent: 'space-between' }}>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      {orders.length > 0 && (
        <section className='trip-page secondary-layout'>
          <div className='hero'>
            <h2>Welcome back, {loggedinUser.fullname}</h2>
          </div>
          <h3>Your trips</h3>
          <TripList
            orders={orders}
            isLoading={isLoading}
            onOrdersReorder={handleOrdersReorder}
          />
        </section>
      )}
      <ScrollButton />
      <AppFooterMobile />
    </section>
  )
}