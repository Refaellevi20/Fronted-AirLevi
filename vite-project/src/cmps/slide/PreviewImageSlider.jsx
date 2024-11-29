// import { Heart } from '../ui/heart'
import { useEffect, useState } from 'react'
import { Slider } from '../slider/slider'
// import { onLikeStayOptimistic } from '../../store/stay/stay.action'
// import { LoginSignup } from '../login-signup'
import { useSelector } from 'react-redux'
import { saveStay } from '../../store/stay/stay.action'
import { userService } from '../../services/user.service.local'

export function PreviewImageSlider({ imgUrls, isLiked, openModal, stayId, stay }) {
  const user = useSelector((state) => state.userModule.user)

  const [heart, setHeart] = useState(false)
  const [host, setHost] = useState(null)


  useEffect(() => {
    if (!stay) return
    if (user) {
      if (Array.isArray(stay.wishList) && stay.wishList.includes(user._id)) {
        setHeart(true)
      } else {
        setHeart(false)
      }
    } else {
      setHeart(false)
    }

    loadHost()
  }, [user, stay])

  async function loadHost() {
    try {
      if (!stay || !stay.host_id) return
      const host = await userService.getById(stay.host_id)
      setHost(host)
      if (!Array.isArray(stay.wishList)) {
        stay.wishList = []
      }
    } catch (err) {
      console.log('host =>', err)
    }
  }


  const onHandleHeart = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    try {
      const updatedStay = { ...stay }

      if (!Array.isArray(updatedStay.wishList)) {
        updatedStay.wishList = []
      }

      const userIndex = updatedStay.wishList.indexOf(user._id)

      if (userIndex > -1) {
        updatedStay.wishList.splice(userIndex, 1)
        setHeart(false)
        showSuccessMsg(`Remove to ${user.fullname}`)
      } else {
        updatedStay.wishList.push(user._id)
        setHeart(true)
        showSuccessMsg(`Saved to ${user.fullname}`)
      }

      await saveStay(updatedStay)
    } catch (err) {
      console.log("Error updating wishlist:", err)
    }
  }

  return (
    <div className='image-slider almost-square-ratio'>
  <span className="heart">
  <div className="stay-heart__preview">
    <button onClick={(ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      onHandleHeart(ev)
    }}>
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
