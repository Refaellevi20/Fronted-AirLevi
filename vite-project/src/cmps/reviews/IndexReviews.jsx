import React from 'react'
import { IoKeyOutline } from "react-icons/io5";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiSprayBottle } from "react-icons/pi";
import { CiMap } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ReviewBar } from './ReviewBar';

export function IndexReviews({ reviews,stay }) {
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
                <div className="text fs14">{`Cleanliness`}</div>
                <div className="rating fs18">{avgRating.cleanliness}</div>
                <div className="icon"><PiSprayBottle className='fs32' /></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Communication</div>
                <div className="rating fs18">{avgRating.communication}</div>
                <div className="icon"><HiOutlineChatBubbleBottomCenter className='fs32' /></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Check-in</div>
                <div className="rating fs18">{avgRating['check-in']}</div>
                <div className="icon"><IoKeyOutline className='fs32' /></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Accuracy</div>
                <div className="rating fs18">{avgRating.accuracy}</div>
                <div className="icon"><IoIosCheckmarkCircleOutline className='fs32' /></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Location</div>
                <div className="rating fs18">{avgRating.location}</div>
                <div className="icon"><CiMap className='fs32' /></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Value</div>
                <div className="rating fs18">{avgRating.value}</div>
                <div className="icon"><SlTag className='fs32' /></div>
            </div>
        </div>
    )
}
