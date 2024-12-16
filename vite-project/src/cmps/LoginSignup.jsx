import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.local.js' 
import { ImgUploader } from './ImgUploader.jsx'
import { showErrorMsg, showSuccessMsg  } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.actions'
import { BtnSquareColorRed } from './buttons ui/btn-square-color.jsx'
import { BtnLoginColorGold } from './buttons ui/btn-loginGust-color.jsx'
import { BtnLoginColorHost } from './buttons ui/btn-loginHost-color.jsx'


export function LoginSignup({ closeModal }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  // const user = useSelector((state) => state.userModule.user)

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

    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      closeModal()
    } catch (err) {
      showErrorMsg('Cannot login')
    }
    clearState()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
      if (!credentials.imgUrl) {credentials.imgUrl='https://robohash.org/mat.png?size=50x50&set=set1'}
    signup(credentials)
    clearState()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <div className='login-page'>
      <header className='login-signup-header'>
        {/* <h1>Login in or sign up</h1> */}
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
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
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
              type='text'
              name='fullname'
              value={credentials.fullname}
              placeholder='Fullname'
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='username'
              value={credentials.username}
              placeholder='Username'
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              value={credentials.password}
              placeholder='Password'
              onChange={handleChange}
              required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup!</button>
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
