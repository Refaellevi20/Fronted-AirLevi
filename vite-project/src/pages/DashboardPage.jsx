
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const orders = useSelector((storeState) => storeState.orderModule.orders).sort((a, b) => b.startDate - a.startDate)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
// console.log('ordersssss',orders)

function handleClose(){
  navigate('/stay')
}

  const samplePayments = [
    { id: 1, amount: 150.0, date: '2024-12-01', status: 'Completed' },
    { id: 2, amount: 230.5, date: '2024-12-05', status: 'Pending' },
    { id: 3, amount: 300.0, date: '2024-12-08', status: 'Completed' },
    { id: 4, amount: 120.75, date: '2024-12-10', status: 'Completed' },
    { id: 5, amount: 500.0, date: '2024-12-15', status: 'Failed' },
    { id: 6, amount: 650.0, date: '2024-12-20', status: 'Completed' },
  ]
  
  const paymentTrends = [150, 230, 300, 120, 500, 650]

    return (
    <div className='dashboard-page secondary-layout'>
       <div className='pointer close-dashboard' onClick={handleClose} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <MdKeyboardArrowLeft size={24} />
    </div>
      <div className='hero'>
        <h2>Welcome back,{loggedinUser.fullname}</h2>
      </div>
      <div className='dashboard'>
        <Dashboard payments={samplePayments} paymentTrends={paymentTrends} />
      </div>
    </div>
  )
}