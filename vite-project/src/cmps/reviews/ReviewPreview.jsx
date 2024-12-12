import { useState } from 'react'
import { LongTxtReviews } from '../LongTxtReviews'
import Modal from '../Modal'

export function ReviewPreview({ reviewsToDisplay, MAX_LENGTH = 100 }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviewsForModal, setReviewsForModal] = useState([])

  const openModal = () => {
    setReviewsForModal(reviewsToDisplay)
    setModalIsOpen(true)
  };

  const closeModal = () => {
    setModalIsOpen(false)
    setReviewsForModal([])
  };

  if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>

  return (
    <>
      <div className="reviews-list grid">
        {reviewsToDisplay.map((review, index) => (
          <div className="review-prev flex" key={index}>
            <div className="mini-user-details grid">
              <img src={review.by.imgUrl} alt={review.by.fullname} className="mini-user-img" />
              <p className="review-fullname">{review.by.fullname}</p>
              <span>pen 2024</span>
            </div>
            <LongTxtReviews 
              txt={review.txt} 
              length={MAX_LENGTH} 
              onShowMoreClick={openModal}
            />
          </div>
        ))}
      </div>

      {modalIsOpen && <Modal closeModal={closeModal} reviews={reviewsForModal} />}
    </>
  )
}
