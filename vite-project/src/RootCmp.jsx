import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { StayIndex } from './pages/StayIndex'
// import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { StayDetails } from './pages/StayDetails'
import { HistoryPage } from './pages/HistoryPage'
import { BookPage } from './pages/BookPage'
import { TripPage } from './pages/TripPage'
import { OrderPage } from './pages/OrderPage'
import { DashboardPage } from './pages/DashboardPage'
import { MessagesPage } from './pages/MessagesPage'
import  GamesPage  from './pages/GamesPage' 
import { Analytics } from './pages/Analytics'
import { UserWishList } from './pages/UserWishList'
import { debuggerService } from './services/Debugger.Service'
import { AboutMe } from './pages/AboutMe'
import { GroupChatPage } from './pages/GroupChatPage'
import { useSelector } from 'react-redux'
import { BecomeHostPage } from './pages/BecomeHostPage'
import EditStay from './pages/EditStay'
import { ProfilePage } from './pages/ProfilePage'

export function RootCmp() {
  // useEffect(() => { //* debugger
  //   debuggerService.info('system', 'Application started')
    
  //   debuggerService.debug('user', 'User module initialized')
  //   debuggerService.warn('stay', 'Stay cache outdated')
  //   debuggerService.error('order', 'Failed to process order',new Error('Payment failed'))

  //   return () => {
  //     debuggerService.info('system', 'Application shutting down')
  //   }  
  // }, [])
  
  return (
    <div className="main-container full">
          

      <main>
        <Routes>
        <Route path='/' element={<StayIndex />} />
          <Route path='/stay' element={<StayIndex />} /> 
          <Route path="/stay/:stayId" element={<StayDetails />} />
          <Route path="/stay/edit/:id" element={<EditStay />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route element={<BookPage />} path='/book/stay/:stayId' />
          {/* <Route path="/history/historyAll" element={<historyAllPage />} /> */}
          <Route path="/wishlist" element={<UserWishList />} />
          <Route path="/hosting/orders" element={<OrderPage />} />
          <Route element={<TripPage />} path='/trip' />
          <Route path="/payment" element={<stayPayment />} />
          <Route element={<DashboardPage />} path='/hosting/orders/dashboard' />
          <Route element={<GamesPage />} path='/gust/trip/games' />
          <Route path="/analytics" element={<Analytics />} />
          <Route element={<MessagesPage />} path='user/Messages' />
          <Route element={<BecomeHostPage />} path='Become-a-Host' />
          <Route 
                path="/group-chat" 
                element={
                    <PrivateRoute isOwnerOnly={true}>
                        <GroupChatPage />
                    </PrivateRoute>
                } 
            />
          <Route element={<AboutMe />} path='about/development' />
          <Route element={<ProfilePage />} path='Profile' />
        </Routes>
      </main>
        <UserMsg />
    </div>
  )
}


function PrivateRoute({ children, isOwnerOnly = false }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  
  if (!user) return <Navigate to="/login" />
  if (isOwnerOnly && !user.isOwner) return <Navigate to="/" />
  
  return children
}
//! flash
