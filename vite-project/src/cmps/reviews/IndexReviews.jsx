import React from 'react'

export function IndexReviews({ reviews }) {
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
            <div className="avg-rating">
                <span>Cleanliness: {avgRating.cleanliness}</span>
                <span>Communication: {avgRating.communication}</span>
                <span>Check-in: {avgRating['check-in']}</span>
                <span>Accuracy: {avgRating.accuracy}</span>
                <span>Location: {avgRating.location}</span>
                <span>Value: {avgRating.value}</span>
            </div>
        </div>
    )
}
