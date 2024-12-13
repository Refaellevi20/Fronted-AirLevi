import React from 'react'
import { ReviewPreview } from '../cmps/reviews/ReviewPreview'

function Reviews({ reviews }) {
    const MAX_LENGTH = 100
    
    return (
        <div className="all-reviews">
            <h3>Reviews</h3>
                    <ReviewPreview  
                    reviewsToDisplay={reviews}
                    MAX_LENGTH={MAX_LENGTH}
                    key={reviews.id}
                  /> 
        </div>
    )
}

export default Reviews
