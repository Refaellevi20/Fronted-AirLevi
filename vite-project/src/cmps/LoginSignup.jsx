import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { ImgUploader } from './ImgUploader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.actions'
import { BtnSquareColorRed } from './buttons ui/btn-square-color.jsx'
import { BtnLoginColorGold } from './buttons ui/btn-loginGust-color.jsx'
import { BtnLoginColorHost } from './buttons ui/btn-loginHost-color.jsx'
import { useNavigate } from 'react-router-dom'

export function LoginSignup({ closeModal }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  // const user = useSelector((state) => state.userModule.user)
  const navigate = useNavigate() //^ optional
  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onLogin(ev = null) {
    console.log('onLogin')
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    const user = await login(credentials)
    showSuccessMsg(`Welcome: ${user.fullname}`)
    try {
      closeModal()
    } catch (err) {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      // showErrorMsg('Cannot login')
    }
    clearState()
    closeModal()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    if (!credentials.imgUrl) { credentials.imgUrl = 'https://robohash.org/mat.png?size=50x50&set=set4' }
    signup(credentials)
    clearState()
    closeModal()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <div className='login-page login__plus--signup'>
      <header className='login-signup-header'>
      </header>
      {!isSignup && (
        <form className='login-form' onSubmit={onLogin}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            minLength="3"
            autoFocus
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
            minLength="3"
          />
          <BtnSquareColorRed>
            Login
          </BtnSquareColorRed>
        </form>
      )}
      <div className='demo-login-btns'>
        <BtnLoginColorHost onClick={() => {
          credentials.username = 'host'
          onLogin()
        }}>
          DEMO: login as Shukiy Host
        </BtnLoginColorHost>
        <BtnLoginColorGold onClick={() => {
          credentials.username = 'guest'
          onLogin()
        }}>
          DEMO: login as baba Guest
        </BtnLoginColorGold>
      </div>
      <div className='signup-section'>
        {isSignup && (
          <form className='signup-form' onSubmit={onSignup}>
            <input
              type="text"
              name="fullname"
              value={credentials.fullname}
              placeholder="Fullname"
              onChange={handleChange}
              required
              minLength="3"
            />
            <input
              type="text"
              name="username"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
              required
              minLength="3"
              autoFocus
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
              required
              minLength="3"
            />
            <ImgUploader onUploaded={onUploaded} />
            <button className='sing-up'>Signup!</button>
          </form>
        )}
      </div>
      <div className='sign-up-btn-container'>
        <div className='btn-link' onClick={toggleSignup}>
          {!isSignup ? 'Signup' : 'Login'}
        </div>
      </div>
    </div>
  )
}
