import { FooterMenuTrip } from "./FooterMenuTrip";


export function AppFooterMobileTrip({ className, ...props }) {
  return (
    <footer {...props} className={`app-footer__app${className}`}>
      <div className='header-menu-container'>
        <FooterMenuTrip />
      </div>
    </footer>
  )
}
