import React from 'react'
import { ReviewPreview } from '../cmps/reviews/ReviewPreview'
import { ReviewBar } from '../cmps/reviews/ReviewBar'
import { IndexReviews } from '../cmps/reviews/IndexReviews'

function Reviews({ reviews }) {
//     const [userReviews, setUserReviews] = useState(null)
    
//     useEffect(() => {
//         loadUserReviews()
//     }, [])

//     async function loadUserReviews() {
//         try {
//             const userReviews = await userService.getUserReviews(user_id)
//             setUserReviews(userReviews)
//         } catch (err) {
//             console.log('userReviews: err in userReviews', err)
//         }
//     }

//     function calculateAverageRating (reviews) {
//         if (!reviews || reviews.length === 0) return 0
//         const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)
//         return parseFloat((totalRating / reviews.length).toFixed(1))
//     }

//     if (!userReviews) return <div className="loader-container-all">
//         <div className="loader-all"></div>
//     </div>

// const averageRating = calculateAverageRating(userReviews)

    return (
        <div className="reviews">
            <div className="reviews-list">
                {reviews.map((review) => (
                    <ReviewPreview key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}

export default Reviews
