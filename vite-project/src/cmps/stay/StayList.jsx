import { useNavigate, useLocation } from 'react-router-dom'
import { StayPreview } from './StayPreview'
// import { useModal } from '../../customHooks/useModal'
import { utilService } from '../../services/util.service'
import { stayService } from '../../services/stay.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { removeStay } from '../../store/stay/stay.action'

export function StayList({ stays, currency }) {
  const navigate = useNavigate()
  // const { openModal, Modal } = useModal()
  const currLocation = useLocation()
  // const [isSearchActive, setIsSearchActive] = useState(false)

  const handleClick = (stayId) => {
    const searchStr = utilService.setAnyBlankParamsWithDefaults(
      currLocation.search
    )
    const url = `/stay/${stayId}${searchStr}`
    //* Open the URL in a new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function onRemoveStay(stayId) {
    try {
      await removeStay(stayId)
      showSuccessMsg('Stay remove successfully')
    } catch {
      showErrorMsg('Cannot remove stay')
    }
  }

  return (
    <>
      {/* <div className='details-modal'>
        {' '}
        <Modal />
      </div> */}
      {/* <ul
        className={`card-grid stay-list clean-list main-layout ${isSearchActive ? 'search-active' : ''
          }`}
      ></ul> */}
      <ul
        className='card-grid stay-list clean-list main-layout '>
        {stays.map((stay) => {
          return (
            <li
              key={stay._id}
              onClick={() => handleClick(stay._id)}
              className='stay-list-item'>
              <StayPreview
                stay={stay}
                currency={currency}
                onRemoveStay={onRemoveStay} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
// onWishlistUpdate={onWishlistUpdate}