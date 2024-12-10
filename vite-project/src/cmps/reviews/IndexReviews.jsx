import React from 'react'
import { IoKeyOutline } from "react-icons/io5";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiSprayBottle } from "react-icons/pi";
import { CiMap } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export function IndexReviews({ reviews }) {
    function calculateAverageRating() {
        if (!reviews || reviews.length === 0) return {}

        const initialRating = { //! it is not right finish it later +style
            cleanliness: 0,
            communication: 0,
            'check-in': 0,
            accuracy: 0,
            location: 0,
            value: 0,
        }

        const totalReviews = reviews.length
        
        reviews.forEach((review) => {
            const { rate } = review
            Object.keys(rate).forEach((key) => {
                initialRating[key] += rate[key]
            })
        })

        Object.keys(initialRating).forEach((key) => {
            initialRating[key] = (initialRating[key] / totalReviews).toFixed(1)
        })

        return initialRating
    }

    const avgRating = calculateAverageRating()
    
    return (
<div className="index-reviews">
  <div className="review-line">
    <div className="text">{`Cleanliness`}</div>
    <div className="rating">{avgRating.cleanliness}</div>
    <div className="icon"><PiSprayBottle /></div>
  </div>
  <div className="review-line">
    <div className="text">Communication</div>
    <div className="rating">{avgRating.communication}</div>
    <div className="icon"><HiOutlineChatBubbleBottomCenter /></div>
  </div>
  <div className="review-line">
    <div className="text">Check-in</div>
    <div className="rating">{avgRating['check-in']}</div>
    <div className="icon"><IoKeyOutline /></div>
  </div>
  <div className="review-line">
    <div className="text">Accuracy</div>
    <div className="rating">{avgRating.accuracy}</div>
    <div className="icon"><IoIosCheckmarkCircleOutline /></div>
  </div>
  <div className="review-line">
    <div className="text">Location</div>
    <div className="rating">{avgRating.location}</div>
    <div className="icon"><CiMap /></div>
  </div>
  <div className="review-line">
    <div className="text">Value</div>
    <div className="rating">{avgRating.value}</div>
    <div className="icon"><SlTag /></div>
  </div>
</div>

      
    )
}
