//^ i called it diffrente from the others because i want to use it a lot 
//^ so i needed it to unique name

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import guest from '/guest.svg'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { LoginSignup } from '../cmps/LoginSignup'
import { MenuHeader } from '../cmps/menuHeader.jsx'
import { useLoginModal } from '../CustomHook/useLoginModal.jsx'

export function NavMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const notifications = useSelector((storeState) => storeState.userModule.notifications)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()
  const navRef = useRef()

  //* i could do customHooks to all of the modal 
  //* with a lot of every kind of use ref
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavbarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function onLogout() {
    try {
      await logout()
      navigate('/stay')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  // function onAddStay() {
  //   navigate('/newStay')
  // }

  function handleToggle() {
    setNavbarOpen((prev) => !prev)
  }

  // function GamesLink() {
  //   const loggedInUser = useSelector((state) => state.userModule.user)
  //   const orders = useSelector((state) => state.orderModule.orders)

  //   const hasValidOrder = orders?.some(order =>
  //     order.buyerId === loggedInUser?._id &&
  //     order.status === 'completed' &&
  //     order.isPaid
  //   )

  //   if (!loggedInUser || !hasValidOrder) return null

  // } //^ maybe only the people that ordered can play the game

  return (
    <>
      <LoginModal />
      <nav className='nav-menu' onClick={handleToggle} ref={navRef}>
        {notifications.length > 0 && (
          <div className='notificaiton-badge'>{notifications.length}</div>
        )}
        <div className='menu-btn'>
          <MenuHeader />
          <div />
          <div className='menu-avatar'>
            {user?.imgUrl ? (
              <img src={user.imgUrl} alt={user.fullname} />
            ) : (
              <img src={guest} alt='' />
            )}
          </div>
        </div>
        {navbarOpen && (!user ? (
          <div className='menu-links'>
            <Link onClick={() =>
              openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
            }>
              Log in
            </Link>
            <NavLink to="/about/development">About Me</NavLink>
          </div>
        ) : (
          <div className='menu-links'>
            <Link to='/trip'>Trips</Link>
            <Link to='/wishlist'>Wishlist</Link>
            <Link to='/user/Messages'>Messages</Link>
            <Link to='/history'>History</Link>
            <NavLink to="/about/development">About Me</NavLink>
            {/* <NavLink to="/analytics">Analytics</NavLink> */}
            <Link to='/gust/trip/games'>Time To Think</Link>
            <Link to='/Become-a-Host'>Become a host (Add stay)</Link>
            {user.isOwner && <Link to='/hosting/orders'>View orders</Link>}
            {user.isOwner && <Link to='/hosting/orders/dashboard'>Dashboard</Link>}
            {user?.isOwner && (
              <NavLink to="/group-chat" className='nav-link'>Group Chats</NavLink>
            )}
           
            <button
              style={{ borderTop: `1px solid hsl(0, 0%, 87%)` }}
              onClick={onLogout}>
              Log out
            </button>
          </div>
        ))}
      </nav>
    </>
  )
}

 {/* <button onClick={onAddStay}>
              {user.isOwner ? 'Add Another Stay' : 'Become a host (Add stay)'}
            </button> */} //^ another way to do it