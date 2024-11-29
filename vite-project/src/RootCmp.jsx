import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { StayIndex } from './pages/StayIndex'
import { AppFooter } from './cmps/AppFooter'
// import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'



export function RootCmp() {


  return (
    <div className="main-container  main-layout full">
      <UserMsg />
      <main>
        <Routes>
        <Route path='/' element={<StayIndex />} />
          <Route path='/stay' element={<StayIndex />} />

        </Routes>
      </main>
      <AppFooter/>
    </div>
  )
}

