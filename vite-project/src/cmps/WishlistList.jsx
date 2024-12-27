import { useLocation, useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'
// import { StayPreview } from './stay/StayPreview'
import Modal from './Modal'
import { StayPreview } from './stay/StayPreview'

export function WishlistList({ stays,openModal }) {
  const navigate = useNavigate()
  const currLocation = useLocation()

  const handleClick = (stayId) => {
    const searchStr = utilService.setAnyBlankParamsWithDefaults(
      currLocation.search
    )
    navigate(`/stay/${stayId}${searchStr}`)
  }

  if (!stays) return <div></div>
  return (
    <>
      {/* <div className='details-modal'>
        {' '}
        <Modal />
      </div> */}
      <ul className='card-grid stay-list clean-list main-layout'>
        {stays.map((stay) => {
          return (
            <li
              key={stay._id}
              onClick={() => handleClick(stay._id)}
              className='stay-list-item'>
              <StayPreview stay={stay} openModal={openModal} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
