import { useSelector } from 'react-redux'
import { PreviewImageSlider } from '../slide/PreviewImageSlider'
import { PreviewInfo } from './PreviewInfo'

export function StayPreview({ stay,currency }) {
  const user = useSelector((state) => state.userModule.user)
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
      />
      <PreviewInfo info={info} currency={currency}/>
    </article>
  )
}
