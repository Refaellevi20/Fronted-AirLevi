import { useSelector } from 'react-redux'
import Dashboard from './Dashboard'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { Analytics } from './Analytics'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'
import { AppFooterMobileOrder } from '../cmps/AppFooterMobileOrder'

export function DashboardPage() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
    .sort((a, b) => b.startDate - a.startDate)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  function handleClose() {
    navigate('/stay')
  }

  const payments = orders
    .slice(-15)
    .map(order => ({
      id: order._id,
      amount: order.totalPrice || utilService.getRandomIntInclusive(100, 1000),
      date: new Date(order.createdAt).toISOString().split('T')[0],
      status: order.status.charAt(0).toUpperCase() + order.status.slice(1)
    }))

  const paymentTrends = payments
    .map(payment => payment.amount)
    .reverse()

  return (
    <section>
      <header className='app-header secondary-layout flex border-buttom' style={{ justifyContent: 'space-between' }}>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      <div className='dashboard-page secondary-layout'>
        <div className='pointer close-dashboard' onClick={handleClose}>
          <MdKeyboardArrowLeft size={44} />
        </div>
        <div className='hero'>
          <h2>Welcome back, {loggedinUser.fullname}</h2>
        </div>
        <div className='dashboard'>
          <Dashboard payments={payments} paymentTrends={paymentTrends} />
        </div>
        {/* <Chatbot /> */}
        <Analytics />
      </div>
      <AppFooterMobileOrder />
    </section>
  )
}