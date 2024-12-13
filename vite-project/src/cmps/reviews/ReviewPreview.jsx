import { useState } from 'react'
import { LongTxtReviews } from '../LongTxtReviews'
import Modal from '../Modal'
import moment from 'moment'

export function ReviewPreview({ reviewsToDisplay, MAX_LENGTH = 100 }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviewsForModal, setReviewsForModal] = useState([])

  function openModal() {
    setReviewsForModal(reviewsToDisplay)
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
    setReviewsForModal([])
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
                  <p className="review-fullname">{review.by.fullname}</p>
                  <span>{timeAgo}</span>
                </div>
                <LongTxtReviews
                  txt={review.txt}
                  length={MAX_LENGTH}
                  onShowMoreClick={openModal}
                />
              </div>
            )
          })}
        </div>
      {modalIsOpen && <Modal closeModal={closeModal} reviews={reviewsForModal} />}
    </>
  )
}
