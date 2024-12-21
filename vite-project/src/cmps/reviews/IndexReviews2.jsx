import React from 'react'
import { IoKeyOutline } from "react-icons/io5";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiSprayBottle } from "react-icons/pi";
import { CiMap } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ReviewBar } from './ReviewBar';

export function IndexReviews2({ reviews }) {
    console.log('Reviews:', reviews)
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
        console.log(totalReviews)


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
    console.log('Average Ratings:', avgRating)

    return (
        <div className="index-reviews2 ">
            <div className="flex border-buttom">
                <div className="icon">
                    <PiSprayBottle className="fs24" style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">{`Cleanliness`}</div>
                <div className="rating fs12">{avgRating.cleanliness || 'No Data'}</div>
            </div>
            {/* Add more items as needed */}
            <div className="flex border-buttom">
                <div className="icon">
                    <HiOutlineChatBubbleBottomCenter className='fs24' style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">Communication</div>
                <div className="rating fs12">{avgRating.communication || 'No Data'}</div>
            </div>
            {/* <div className="review-line"> */}
            <div className="flex border-buttom">
                <div className="icon">
                    <IoKeyOutline className='fs24' style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">Check-in</div>
                <div className="rating fs12">{avgRating['check-in'] || 'No Data'}</div>
            </div>
            {/* </div> */}
            <div className="flex border-buttom">
                <div className="icon">
                    <IoIosCheckmarkCircleOutline className='fs24' style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">Accuracy</div>
                <div className="rating fs12">{avgRating.accuracy || 'No Data'}</div>
            </div>
            <div className="flex border-buttom">
                <div className="icon">
                    <CiMap className='fs24' style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">Location</div>
                <div className="rating fs12">{avgRating.location || 'No Data'}</div>
            </div>
            <div className="flex">
                <div className="icon">
                    <SlTag className='fs24' style={{ color: 'black' }} />
                </div>
                <div style={{marginLeft:'10px'}} className="text fs12">Value</div>
                <div className="rating fs12">{avgRating.value || 'No Data'}</div>
            </div>
        </div>
    )
}
//! here for now data