// import { Heart } from '../ui/heart'
import { useEffect, useState } from 'react'
import { Slider } from '../slider/slider'
// import { onLikeStayOptimistic } from '../../store/stay/stay.action'
// import { LoginSignup } from '../login-signup'
import { useDispatch, useSelector } from 'react-redux'
import { updateStay } from '../../store/stay/stay.action'
// import { saveStay, updateStay } from '../../store/stay/stay.action'
// import { userService } from '../../services/user.service.local'

export function PreviewImageSlider({ imgUrls,stay }) {
  const user = useSelector((state) => state.userModule.user)
  // const dispatch = useDispatch()
  // const [heart, setHeart] = useState(false)
  // const [host, setHost] = useState(null)
  const [heart, setHeart] = useState(stay?.wishList && stay.wishList.length > 0)

  async function toggleCheck(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    try {

      const updatedStay = { ...stay }
      if (!Array.isArray(updatedStay.wishList)) {
        updatedStay.wishList = []
      }

      if (heart) {
        updatedStay.wishList = []
        setHeart(false)
      } else {
        updatedStay.wishList = ['global'] //! everyone can see
        setHeart(true)
      }

      (updateStay(updatedStay))
    } catch (err) {
      console.error('Failed to update wishlist:', err)
    }
  }
//! dispach remove from (updateStay(updatedStay)) here
  // function onWishListStay(stayId) {
  //   if (!user) {
  //     openModal(<LoginSignup />)
  //   } else {
  //     toggleCheck(ev) 
  //   }
  // }
  //! home footer on middle size + here user (login)
  return (
    <div className='image-slider almost-square-ratio'>
      <span className="heart">
        <div className="stay-heart__preview">
          <button onClick={toggleCheck}>
            <img
              src={heart ? "/img/red_heart.png" : "./img/gray_heart.png"}
              alt="Heart"
              className="heart-img"
            />
          </button>
        </div>
      </span>
      <Slider>
        {imgUrls.map((url, idx) => (
          <img key={idx} src={url} alt='Stay' />
        ))}
      </Slider>
    </div>
  )
}
