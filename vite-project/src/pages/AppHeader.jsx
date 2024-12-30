import { AppLogo } from '../cmps/app-logo' 
import { NavMenu } from './nav-menu'
import { SearchBars as StaySearchBars } from '../cmps/search-cmps/SearchBars'

export function AppHeader({ className, ...props }) {
  return (
    <div className='header-container'>
    <header {...props} className={`app-header ${className}`}>
      <div className='header-logo-container'>
        <AppLogo />
      </div>
      <div className='header-search-bar-container'>
        <StaySearchBars />
      </div>
      <div className='header-menu-container'>
        <NavMenu />
      </div>
    </header>
    </div>
  )
}
