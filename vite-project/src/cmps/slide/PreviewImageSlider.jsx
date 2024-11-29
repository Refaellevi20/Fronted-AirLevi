// import { Heart } from '../ui/heart'
import { Slider } from '../slider/slider'
// import { onLikeStayOptimistic } from '../../store/stay/stay.action'
// import { LoginSignup } from '../login-signup'
import { useSelector } from 'react-redux'

export function PreviewImageSlider({ imgUrls, isLiked, openModal, stayId }) {
  // const user = useSelector((state) => state.userModule.user)

  // function onLikeStay(stayId) {
  //   if (!user) {
  //     openModal(<LoginSignup />)
  //   } else {
  //     onLikeStayOptimistic(stayId)
  //   }
  // }

  // const isLoggedin = user ? true : false

  return (
    <div className='image-slider almost-square-ratio'>
      <span className='heart'>
        {/* <Heart
          handleClick={() => onLikeStay(stayId)}
          isLiked={isLiked}
          isLoggedin={isLoggedin}
        /> */}
      </span>
      <Slider>
        {imgUrls.map((url, idx) => (
          <img key={idx} src={url} alt='Stay' />
        ))}
      </Slider>
    </div>
  )
}
