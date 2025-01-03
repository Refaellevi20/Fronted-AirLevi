import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import guest from '/guest.svg'
import { CiHeart } from "react-icons/ci"
import { IoSearchOutline } from "react-icons/io5"
import { FaAirbnb } from "react-icons/fa"
import { FaRegMessage } from "react-icons/fa6"
import { useModal } from '../customHook/useModal'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { LoginSignup } from './LoginSignup'
import { useScrollVisibility } from '../CustomHook/useScrollVisibility'
import { SvgChat } from './svg'

export function FooterMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState('search')
  const isVisible = useScrollVisibility(50)

  const { closeModal, openModal, Modal } = useModal()

  async function onLogout() {
    try {
      await logout()
      navigate('/stay')
      showSuccessMsg('Bye now')
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  useEffect(() => {
    // Update route
    if (location.pathname.includes('profile')) {
      setSelectedMenu('profile')
    } else if (location.pathname.includes('messages')) {
      setSelectedMenu('messages')
    } else if (location.pathname.includes('trip')) {
      setSelectedMenu('trip')
    } else if (location.pathname.includes('wishlist')) {
      setSelectedMenu('wishlist')
    } else {
      setSelectedMenu('search')
    }
  }, [location])

  return (
    <>
      <Modal />
      {isVisible && (
      <nav className="nav-menu--container">
        {!user ? (
          <div className="menu-not-logged">
            <Link
              onClick={() => {
                openModal(<LoginSignup closeModal={closeModal} />)
                setSelectedMenu('login')
              }}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'login' ? 'selected' : ''}`}>
              <img src={guest} alt='' />
              Login
              </div>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setSelectedMenu('wishlist')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'wishlist' ? 'selected' : ''}`}>
                <CiHeart size={25} />
                <p>Wishlist</p>
              </div>
            </Link>
            <Link
              to="/stay"
              onClick={() => setSelectedMenu('search')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'search' ? 'selected' : ''}`}>
                <IoSearchOutline size={25} />
                <p>Search</p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="menu-logged">
            <Link
              to="/profile"
              onClick={() => setSelectedMenu('profile')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'profile' ? 'selected' : ''}`}>
                {user?.imgUrl ? (
                  <img src={user.imgUrl} alt={user.fullname} />
                ) : (
                  <img src={guest} alt='' />
                )}
                <p>Profile</p>
              </div>
            </Link>
            <Link
              to="/user/Messages"
              onClick={() => setSelectedMenu('messages')}
              className="no-underline--mobile uuu"
            >
              <div className={`icon-container uuu${selectedMenu === 'messages' ? 'selected' : ''}`}>
                <SvgChat size={25} />
                <p>Messages</p>
              </div>
            </Link>
            <Link
              to="/trip"
              onClick={() => setSelectedMenu('trip')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'trip' ? 'selected' : ''}`}>
                <FaAirbnb size={25} />
                <p>Trip</p>
              </div>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setSelectedMenu('wishlist')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'wishlist' ? 'selected' : ''}`}>
                <CiHeart size={25} />
                <p>Wishlist</p>
              </div>
            </Link>
            <Link
              to="/stay"
              onClick={() => setSelectedMenu('search')}
              className="no-underline--mobile"
            >
              <div className={`icon-container ${selectedMenu === 'search' ? 'selected' : ''}`}>
                <IoSearchOutline size={25} />
                <p>Search</p>
              </div>
            </Link>
          </div>
        )}
      </nav>
      )}
    </>
  )
}
