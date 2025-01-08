import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import guest from '/guest.svg'
import { CiHeart } from "react-icons/ci"
import { IoSearchOutline } from "react-icons/io5"
import { FaAirbnb } from "react-icons/fa"
import { LoginSignup } from './LoginSignup'
import { useScrollVisibility } from '../CustomHook/useScrollVisibility'
import { SvgChat } from './svg'
import { useLoginModal } from '../CustomHook/useLoginModal'
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaIoxhost } from "react-icons/fa6";
import { SiAboutdotme } from "react-icons/si";

export function FooterMenuOrder({ isOwner }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState('search')
  const isVisible = useScrollVisibility(50)
  const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()

  useEffect(() => {
    // Update route
    if (location.pathname.includes('profile')) {
      setSelectedMenu('profile')
    } else if (location.pathname.includes('Dashboard')) {
      setSelectedMenu('Dashboard')
    } else if (location.pathname.includes('group')) {
      setSelectedMenu('group')
    } else if (location.pathname.includes('Become-a-Host')) {
      setSelectedMenu('Become-a-Host')
    } else if (location.pathname.includes('about')) {
      setSelectedMenu('about')
    } else {
      setSelectedMenu('search')
    }
  }, [location])

  return (
    <>
      <LoginModal />
      {isVisible && (
        <nav className="nav-menu--container">
          {!user ? (
            <div className="menu-not-logged">
              <Link
                onClick={() => {
                  openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
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
              {user.isOwner && (
                <Link
                  to="/hosting/orders/dashboard"
                  onClick={() => setSelectedMenu('Dashboard')}
                  className="no-underline--mobile uuu"
                >
                  <div className={`icon-container uuu${selectedMenu === 'Dashboard' ? 'selected' : ''}`}>
                    <MdDashboard size={25} />
                    <p>Dashboard</p>
                  </div>
                </Link>
              )}
              {user?.isOwner ? (
                <Link
                  to="/group-chat"
                  onClick={() => setSelectedMenu('group')}
                  className="no-underline--mobile"
                >
                  <div className={`icon-container ${selectedMenu === 'group' ? 'selected' : ''}`}>
                    <FaPeopleGroup size={25} />
                    <p>Group Chats</p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="about/development"
                  onClick={() => setSelectedMenu('about')}
                  className="no-underline--mobile uuu"
                >
                  <div className={`icon-container uuu${selectedMenu === 'about' ? 'selected' : ''}`}>
                    <SiAboutdotme size={25} />
                    <p>About</p>
                  </div>
                </Link>
              )}
              <Link
                to="/Become-a-Host"
                onClick={() => setSelectedMenu('Become-a-Host')}
                className="no-underline--mobile"
              >
                <div className={`icon-container ${selectedMenu === 'Become-a-Host' ? 'selected' : ''}`}>
                  <FaIoxhost size={25} />
                  <p>Become-a-Host</p>
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
