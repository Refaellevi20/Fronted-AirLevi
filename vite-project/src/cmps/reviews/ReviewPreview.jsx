import { useState } from 'react'
import { LongTxt } from '../LongTxt' 

export function ReviewPreview({ reviewsToDisplay, MAX_LENGTH = 100 }) {
  if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>

  return (
      <div className="reviews-list grid">
          {reviewsToDisplay.map((review, index) => (
              <div className="review-prev flex" key={index}>
                  <div className="mini-user-details grid">
                      <img src={review.by.imgUrl} alt={review.by.fullname} className="mini-user-img" />
                      <p className="review-fullname">{review.by.fullname}</p>
                      <span>pen 2024</span> 
                  </div>
                  <LongTxt txt={review.txt} length={MAX_LENGTH} />     
              </div>
          ))}
      </div>
  )
}
