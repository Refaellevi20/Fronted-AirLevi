import { useState } from 'react'
import { LongTxtReviews } from '../LongTxtReviews'
import Modal from '../Modal'
import moment from 'moment'
import { StarRating } from '../StarRating'

export function ReviewPreview({ reviewsToDisplay, MAX_LENGTH = 100 }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviewsForModal, setReviewsForModal] = useState([])

  function openModal(review) {
    setReviewsForModal(reviewsToDisplay)
    // setFocusedReview(review)
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
    setReviewsForModal([])
    // setFocusedReview(null)
  }

  if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>

  return (
    <>
      <div className="reviews-list grid">
        {reviewsToDisplay.map((review, index) => {
          const createAtFormatted = moment(review.by.createAt)
          const timeAgo = createAtFormatted.fromNow(true)

          return (
            <div className="review-prev flex1" key={index}>
              <div className="mini-user-details grid">
                <img src={review.by.imgUrl} alt={review.by.fullname} className="mini-user-img" />
                <div>
                <p className="review-fullname">{review.by.fullname}</p>
                <p className=''>{review.by.address || review.rate?.loc?.address || 'Address not available'}</p>
                </div>
              </div>
                <div className='flex1'>
                  <StarRating />
                  <p></p>
                  <p className='point-review'>·</p>
                  <span>{timeAgo}</span>
                </div>
              <LongTxtReviews
                txt={review.txt}
                length={MAX_LENGTH}
                onShowMoreClick={() => openModal(review)}
                />
                </div>
          )
        })}
      </div>
      {modalIsOpen && <Modal closeModal={closeModal} reviews={reviewsForModal} />}
    </>
  )
}
