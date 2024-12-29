import { useSelector } from 'react-redux'
import { PreviewImageSlider } from '../slide/PreviewImageSlider'
import { PreviewInfo } from './PreviewInfo'
import { removeStay } from '../../store/stay/stay.action'

export function StayPreview({ stay, currency, onWishlistUpdate }) {
  const user = useSelector((state) => state.userModule.user)
  // const loggedInUser = useSelector(state => state.userModule.user)
  // const isOwner = loggedInUser?.isAdmin || stay.host._id === loggedInUser?._id
  const isOwner = user && ((stay.host && stay.host._id || user._id) || user.isOwner)



  const imgUrls = stay.imgUrls
  const { price, reviews, type, capacity } = stay

  const { loc: { address: location } = {} } = stay || {}
  const info = { price, reviews, location, type, capacity }

  async function handleRemove(ev) {
    if (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    }
    {
      try {
        await removeStay(stay._id)
        showSuccessMsg('Stay remove successfully')
      } catch {
        showErrorMsg('Cannot remove stay')
      }
    }
  }

  return (
    <article className='preview'>
      <PreviewImageSlider
        imgUrls={imgUrls}
        user={user}
        stayId={stay._id}
        stay={stay}
        onWishlistUpdate={onWishlistUpdate}
        isOwner={isOwner}
        onRemove={handleRemove}
      />
      <PreviewInfo info={info} currency={currency} />
    </article>
  )
}
