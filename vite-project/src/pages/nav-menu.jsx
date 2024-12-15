import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import guest from '/guest.svg'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { LoginSignup } from '../cmps/LoginSignup' 
import { useModal } from '../customHook/useModal.jsx'
import { MenuHeader } from '../cmps/menuHeader.jsx'

export function NavMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const notifications = useSelector((storeState) => storeState.userModule.notifications)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { closeModal, openModal, Modal } = useModal()
  const elNav = useRef()

  async function onLogout() {
    try {
      await logout()
      navigate('/stay')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onAddStay() {
    navigate('/newStay')
  }

  function handleToggle(){
    setNavbarOpen((prev) => !prev)
  }

  return (
    <>
      <Modal />
      <nav className='nav-menu' onClick={handleToggle} ref={elNav}>
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
        {navbarOpen &&
          (!user ? (
            <div className='menu-links'>
              <Link
                onClick={() =>
                  openModal(<LoginSignup closeModal={closeModal} />)
                }>
                Log in
              </Link>
            </div>
          ) : (
            <div className='menu-links'>
              <Link to='/trip'>Trips</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <Link to='/user/Messages'>Messages</Link>
              <Link to='/history'>history</Link>
              {user.isOwner && <Link to='/hosting/orders'>View Orders</Link>}
              <button onClick={onAddStay}>
                {user.isOwner ? 'Add Another Stay' : 'Become a host (Add stay)'}
              </button>
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
