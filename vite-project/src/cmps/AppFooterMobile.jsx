
import { FooterMenu } from './FooterMenu.jsx'

export function AppFooterMobile({ className, ...props }) {
  return (
    <footer {...props} className={`app-footer__app${className}`}>
      <div className='header-menu-container'>
        <FooterMenu />
      </div>
    </footer>
  )
}
