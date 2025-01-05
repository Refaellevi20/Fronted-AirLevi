

import React, { useEffect } from "react";
import { SvgProfile, SvgSetting, SvgNotification, SvgHelp, SvgShield, SvgCloud, SvgStar } from "../cmps/svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { AppFooterMobile } from "../cmps/AppFooterMobile";
import { REMOVE_NOTIFICATION } from "../store/user.reducer";

export function ProfilePage() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  // const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (loggedinUser) {
  //     dispatch({ type: REMOVE_NOTIFICATION, notificationType: 'order' })
  //   }
  // }, [loggedinUser]) 
  //* maybe for someone that logged in and out

  async function onLogout() {
    try {
      await logout()
      navigate('/stay')
      showSuccessMsg('Bye now')
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }


  return (
    <section>
      <div className="profile-page--container">
        <header className="header">
          <div className="bell-icon"><SvgNotification size={40} /></div>
          <div className="profile-info">
            <span>Profile</span>
            {/* <span>{loggedinUser.fullname}</span> */}
            <span>View Profile</span>
            <div className="user-details">
            </div>
            {/* need to add image */}
          </div>
        </header>
        <main className="main-content">
          <div className="card">
            <div className="card-content">
              <h2>List Your Home on Airbnb</h2>
              <p>It’s easy to start hosting and earn extra income.</p>
            </div>
            <img src={"https://a0.muscache.com/pictures/carson/carson-1726021438613-d5c38791/original/1d79c71d-08b2-4cfc-bc76-2e4ec1196a81.png"} alt="Image 1" className="full-width--image" />
          </div>
          {/* <div className="card">
        // link to svg profile
        </div> */}
          <div className="menu-options">
            <div className="flex pointer">
              <div className="flex1">
                <SvgProfile />
                <span style={{ paddingRight: '10px' }}>Personal Details</span>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
            <div className="flex pointer" style={{ paddingTop: '10px' }}>
              <div className="flex1">
                <SvgSetting />
                <span style={{ paddingRight: '10px' }}>Account Settings</span>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
          </div>
          <div className="support-options">
            <h2>Support</h2>
            <div className="flex pointer">
              <div className="flex1">
                <SvgHelp />
                <div style={{ paddingRight: '10px', paddingTop: "10px" }}>Visit Help Center</div>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
            <div className="flex pointer">
              <div className="flex1">
                <SvgShield />
                <div style={{ paddingRight: '10px', paddingTop: "10px" }}>Get Help with Safety Issue</div>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
            <div className="flex pointer">
              <div className="flex1">
                <SvgCloud />
                <div style={{ paddingRight: '10px', paddingTop: "10px" }}>Report a Neighborhood Issue</div>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
            <div className="flex pointer">
              <div className="flex1">
                <SvgStar />
                <div style={{ paddingRight: '10px', paddingTop: "10px" }}>Explanation of Airbnb Process</div>
              </div>
              <MdKeyboardArrowLeft size={30} />
            </div>
            <button onClick={onLogout} className="rev-btn footer__logOut--mobile">Log out</button>
          </div>
        </main>
        {/* <footer className="footer">
        <button className="hosting-mode">Switch to Hosting Mode</button>
        <div className="experience-hosting">Host an Experience</div>
      </footer> */}
        {/* here langugaes */}
        <AppFooterMobile />
      </div>
    </section>
  )
}


