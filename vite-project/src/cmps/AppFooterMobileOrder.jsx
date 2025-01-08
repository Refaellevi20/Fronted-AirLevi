
import { FooterMenuOrder } from './FooterMenuOrder.jsx'

export function AppFooterMobileOrder({ className, ...props }) {
  return (
    <footer {...props} className={`app-footer__app${className}`}>
      <div className='header-menu-container'>
        <FooterMenuOrder />
      </div>
    </footer>
  )
}
