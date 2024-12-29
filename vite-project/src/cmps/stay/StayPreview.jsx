import { useSelector } from 'react-redux'
import { PreviewImageSlider } from '../slide/PreviewImageSlider'
import { PreviewInfo } from './PreviewInfo'

export function StayPreview({ stay, currency,onRemoveStay, onWishlistUpdate }) {
  const user = useSelector((state) => state.userModule.user)
  // const loggedInUser = useSelector(state => state.userModule.user)
  // const isOwner = loggedInUser?.isAdmin || stay.host._id === loggedInUser?._id
  const isOwner = user && ((stay.host && stay.host._id || user._id) || user.isOwner)



  const imgUrls = stay.imgUrls
  const { price, reviews, type, capacity } = stay

  const { loc: { address: location } = {} } = stay || {}
  const info = { price, reviews, location, type, capacity }

  return (
    <article className='preview'>
      <PreviewImageSlider
        imgUrls={imgUrls}
        user={user}
        stayId={stay._id}
        stay={stay}
        onWishlistUpdate={onWishlistUpdate}
        isOwner={isOwner}
        onRemoveStay={onRemoveStay}
      />
      <PreviewInfo info={info} currency={currency} />


    </article>
  )
}
