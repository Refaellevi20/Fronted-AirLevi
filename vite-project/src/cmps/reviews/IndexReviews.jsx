import React from 'react'
import { IoKeyOutline } from "react-icons/io5";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiSprayBottle } from "react-icons/pi";
import { CiMap } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ReviewBar } from './ReviewBar';

export function IndexReviews({ reviews }) {
    // console.log('Reviews:', reviews)
    function calculateAverageRating() {
        if (!reviews || reviews.length === 0) return {}

        const initialRating = {
            cleanliness: 0,
            communication: 0,
            'check-in': 0,
            accuracy: 0,
            location: 0,
            value: 0,
        }

        const totalReviews = reviews.length
        // console.log(totalReviews)
        
    
        reviews.forEach(({ rate }) => {
            Object.keys(initialRating).forEach((key) => {
                initialRating[key] += rate[key] || 0
            })
        })
    
        Object.keys(initialRating).forEach((key) => {
            initialRating[key] = (initialRating[key] / totalReviews).toFixed(1)
        })
    
        console.log(initialRating)
        
        return initialRating
    }

    const avgRating = calculateAverageRating()
    // console.log('Average Ratings:', avgRating)

    return (
        <div className="index-reviews">
            <div className="review-line">
                <div className="text fs14">{`Cleanliness`}</div>
                <div className="rating fs18">{avgRating.cleanliness || 'No Data'}</div>
                <div className="icon"><PiSprayBottle className='fs32' style={{color:'black'}}/></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Communication</div>
                <div className="rating fs18">{avgRating.communication || 'No Data'}</div>
                <div className="icon"><HiOutlineChatBubbleBottomCenter className='fs32' style={{color:'black'}}/></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Check-in</div>
                <div className="rating fs18">{avgRating['check-in'] || 'No Data'}</div>
                <div className="icon"><IoKeyOutline className='fs32' style={{color:'black'}}/></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Accuracy</div>
                <div className="rating fs18">{avgRating.accuracy || 'No Data'}</div>
                <div className="icon"><IoIosCheckmarkCircleOutline className='fs32' style={{color:'black'}}/></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Location</div>
                <div className="rating fs18">{avgRating.location || 'No Data'}</div>
                <div className="icon"><CiMap className='fs32' style={{color:'black'}}/></div>
            </div>
            <div className="review-line">
                <div className="text fs14">Value</div>
                <div className="rating fs18">{avgRating.value || 'No Data'}</div> 
                <div className="icon"><SlTag className='fs32' style={{color:'black'}}/></div>
            </div>
        </div>
    )
}
//! here for now data