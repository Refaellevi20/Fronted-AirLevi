import { useState } from "react"

export function ReviewPreview({ reviewsToDisplay, MAX_LENGTH = 100 }) {
  const [expanded, setExpanded] = useState(Array(reviewsToDisplay.length).fill(false))

  const handleExpand = (index) => {
      const newExpanded = [...expanded]
      newExpanded[index] = !newExpanded[index]
      setExpanded(newExpanded) //~ change to acordian better writing
  } //! here acordion

  if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>

  return (
      <div className="reviews-list grid">
          {reviewsToDisplay.map((review, index) => (
              <div className="review-prev flex" key={index}>
                  <div className="mini-user-details grid">
                      <img src={review.by.imgUrl} alt={review.by.fullname} className="mini-user-img" />
                      <p className="review-fullname">{review.by.fullname}</p>
                      {/* <span>pen 2024</span> //! here createAt */}
                      {/* <span className="review-createdAt">{reviewsToDisplay.createdAt}</span> */}
                  </div>
                  <p>{expanded[index] ? review.txt : review.txt.substring(0, MAX_LENGTH)}</p>
                  {review.txt.length > MAX_LENGTH &&
                  <button className="show-more" onClick={() => handleExpand(index)}>
                      {expanded[index] ? <><span>{'< '}</span><span className="underline">Show less</span> </> : <> <span className="underline">Show more</span> <span>{'>'}</span></>}
                  </button>}
              </div>
          ))
          }
      </div >
  )
}