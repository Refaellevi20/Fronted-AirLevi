import { useSelector } from "react-redux"
import { StarRating } from "./StarRating"
import { SlideAirPreview } from "./slide/SlideAirPreview"
import { Link } from "react-router-dom"
import { updateAir } from "../store/actions/air.actions"
import { useEffect, useState } from "react"
import { userService } from "../services/user/user.service.local"

export function AirPreview({ air }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    
    const [heart, setHeart] = useState(false)
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        if (user) {
          if (Array.isArray(air.wishList) && air.wishList.includes(user._id)) {
            setHeart(true)
          } else {
            setHeart(false)
          }
        } else {
          setHeart(false)
        }
      
        loadOwner()
      }, [user, air])

    async function loadOwner() {
        try {
            const owner = await userService.getById(air.owner_id)
            setOwner(owner)
            if (!Array.isArray(air.wishList)) {
                air.wishList = [] 
              }
        } catch (err) {
            console.log('owner =>', err)
        }
    }


    const onHandleHeart = async (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
    
        try {
          const updatedAir = { ...air }
    
          if (!Array.isArray(updatedAir.wishList)) {
            updatedAir.wishList = []  
          }
    
          const userIndex = updatedAir.wishList.indexOf(user._id)
    
          if (userIndex > -1) {
            updatedAir.wishList.splice(userIndex, 1)
            setHeart(false)
            showSuccessMsg(`Remove to ${user.fullname}`)
          } else {
            updatedAir.wishList.push(user._id)
            setHeart(true)
            showSuccessMsg(`Saved to ${user.fullname}`)
          }
    
          await updateAir(updatedAir)
        } catch (err) {
          console.log("Error updating wishlist:", err)
        }
      }
    

    return (
        <section className="air-preview__container">
        <Link to={`/air/${air._id}`} className="img-preview__container">
            <SlideAirPreview air={air} />
            <div className="container-heart">
                <button onClick={onHandleHeart}>
                    <img
                        src={heart ? "/img/red_heart.png" : "/img/gray_heart.png"}
                        alt="Heart"
                        className="heart-img"
                    />
                </button>
            </div>
        </Link>
    
        <section className="air-preview__card">
            <div className="flex">
                <span className="air-preview__fullname">{air.loc.name}</span>
                <span className="star-rating">
                    <StarRating value={air.rate} />
                </span>
            </div>
            <span className="air-preview__price">Price ${air.price}</span>
        </section>
    </section>
    )
}
