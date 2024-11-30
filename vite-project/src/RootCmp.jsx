import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { StayIndex } from './pages/StayIndex'
// import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { StayDetails } from './pages/StayDetails'



export function RootCmp() {


  return (
    <div className="main-container full">
      <UserMsg />
      <main>
        <Routes>
        <Route path='/' element={<StayIndex />} />
          <Route path='/stay' element={<StayIndex />} /> 
          <Route path="/stay/:stayId" element={<StayDetails />} />

        </Routes>
      </main>
    </div>
  )
}

