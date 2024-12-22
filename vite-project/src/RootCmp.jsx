import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { StayIndex } from './pages/StayIndex'
// import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { StayDetails } from './pages/StayDetails'
import { HistoryPage } from './pages/HistoryPage'
import UserWishList from './pages/UserWishList'
import { BookPage } from './pages/BookPage'
import { TripPage } from './pages/TripPage'
import { OrderPage } from './pages/OrderPage'
import { DashboardPage } from './pages/DashboardPage'
import { MessagesPage } from './pages/MessagesPage'


export function RootCmp() {

  return (
    <div className="main-container full">
      <UserMsg />
      <main>
        <Routes>
        <Route path='/' element={<StayIndex />} />
          <Route path='/stay' element={<StayIndex />} /> 
          <Route path="/stay/:stayId" element={<StayDetails />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route element={<BookPage />} path='/book/stay/:stayId' />
          {/* <Route path="/history/historyAll" element={<historyAllPage />} /> */}
          <Route path="/wishlist" element={<UserWishList />} />
          <Route path="/hosting/orders" element={<OrderPage />} />
          <Route element={<TripPage />} path='/trip' />
          <Route path="/payment" element={<stayPayment />} />
          <Route element={<DashboardPage />} path='/hosting/orders/dashboard' />

          <Route element={<MessagesPage />} path='user/Messages' />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        </Routes>
      </main>
    </div>
  )
}

