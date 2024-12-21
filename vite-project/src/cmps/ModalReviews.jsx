import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StarRating } from './StarRating'
import ReviewFilter from './reviews/ReviewFilter'
import SortReviews from './reviews/SortReviews'
import { ReviewBar } from './reviews/ReviewBar'
import { IndexReviews } from './reviews/IndexReviews'
import { ReviewBar2 } from './reviews/ReviewBar2'
import { IndexReviews2 } from './reviews/IndexReviews2'
import { CalcAvgReview } from './calcAvgReview'
import { RatingReview2 } from './RatingReview2'
import { ModalSize } from '../CustomHook/useModalSize.tsx'


//^ i enter here the style because i have too many modals
//^ and i did not think before i started
//^ and i could do one modal that will be container for the most of my modals
//^ because almost all the modal are the same style
function Modal({ closeModal, reviews, stay }) {
    const [filteredReviews, setFilteredReviews] = useState(reviews)
  

    const handleModalClick = (ev) => {
        if (ev.target === ev.currentTarget) {
            closeModal()
        }
    }
    // 1125
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])  //! hidden scroll here

    const createAtFormatted = moment(reviews.by?.createAt)
    const timeAgo = createAtFormatted.fromNow(true)

    return (
        <div className="modal-reviews" onClick={handleModalClick}>
            <div className="modal-content section-size">
                <div className="close-container">
                <div className="close-container">
                    <ModalSize closeModal={closeModal} />
                </div>
                </div>
                <div></div>
                <RatingReview2 reviews={stay.reviews} />

                {/* <div className=''> */}
                <div className="flex1 top-reviews__none">
                    <ReviewBar reviews={stay.reviews} />
                    <IndexReviews reviews={reviews} />
                    {/* </div> */}
                </div>

                <div className=' top-reviews__left'>
                    <ReviewBar2 reviews={stay.reviews} />
                    <IndexReviews2 reviews={reviews} />
                </div>

                <div className='size-top'>
                    <section className="flex">
                        <p className="fs22">{stay.reviews.length} reviews</p>
                        <SortReviews reviews={reviews} setFilteredReviews={setFilteredReviews} />
                    </section>
                    <ReviewFilter reviews={reviews} setFilteredReviews={setFilteredReviews} isInModal={true} />
                    <div className="scrollable-content">
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="min-user-details">
                                        <img
                                            src={review.by.imgUrl}
                                            alt={review.by.fullname}
                                            className="mini-user-img"
                                        />
                                        <div className="user-details">
                                            <p className="fs16">{review.by.fullname}</p>
                                            <p className="fs12">
                                                {review.by.address ||
                                                    review.rate?.loc?.address ||
                                                    'Address not available'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex1">
                                        <StarRating />
                                        <p className='point-review'>·</p>
                                        <p className="fs12">{new Date(review.by.createAt).toLocaleString()}</p>
                                        <p className='point-review'>·</p>
                                        <p className="fs12">Stayed a few nights</p>
                                    </div>
                                    <p className="fs16">{review.txt}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
//* can be use multipe of time so that is why it is a default
