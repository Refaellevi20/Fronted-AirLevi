import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { WishlistList } from '../cmps/WishlistList.jsx' 
import arrowLeftImg from '/arrow-left.svg'

import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../cmps/app-logo.jsx'
import { NavMenu } from './nav-menu.jsx'
import { IndexLoader } from '../cmps/IndexLoader.jsx'
import { loadStays, onLikeStayOptimistic } from '../store/stay/stay.action.js'

export function WishList() {
  const stays = useSelector((state) => state.stayModule.stays)
  const user = useSelector((state) => state.userModule.user)
  const isLoading = useSelector((state) => state.systemModule.isLoading)
  const navigate = useNavigate()

  useEffect(() => {
    loadStays({ likedByUserId: user._id })
  }, [])

  function backToList() {
    loadStays()
    navigate(-1)
  }

  return (
    <>
      <header className='app-header main-layout flex'>
        <div className='header-logo-container'>
          <AppLogo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      <header className='wishlist-title main-layout full flex'>
        <div className='icon-svg'>
          <img
            src={arrowLeftImg}
            className='arrow-img'
            alt='arrowLeftImg'
            onClick={() => backToList()}
          />
        </div>
        <div>{<h2>Wishlist</h2>}</div>
      </header>
      {isLoading && <IndexLoader />}
      {!stays && (
        <div className='main-layout wish-list'> Your wishlist is empty </div>
      )}
      {stays && (
        <WishlistList stays={stays} onToggleLike={onLikeStayOptimistic} />
      )}
    </>
  )
}
