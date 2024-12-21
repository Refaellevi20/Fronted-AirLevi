import { FaStar } from 'react-icons/fa';

export function DetailsHouse({ stay }) {

    if (!stay || !stay.details) {
        return <p>No details available</p>
    }

    function calcAvgReview(reviews) {
        let total = 0
        let count = 0

        reviews.forEach(review => {
            total += Object.values(review.rate).reduce((a, b) => a + b, 0)
            count += Object.keys(review.rate).length
        })

        return +(total / count).toFixed(2)
    }

    const reviewCount = stay.reviews ? stay.reviews.length : 0
    const avgRating = stay.reviews ? calcAvgReview(stay.reviews) : 0

    return (
        <section className='info-details-house__container'>
            <div className=''>
                <div className='flex1'>
                    <h2 className="fs22 type-details">{stay?.loc?.address || "Location not available"}</h2>
                    <h2 className="fs22 space-txt type-details">{stay.type}</h2>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '5px' }}>
                    <li className='fs18 info-details__house'>{stay.details.guests} Guests · </li>
                    <li className='fs18 info-details__house'>{stay.details.bedroom} Bedrooms · </li>
                    <li className='fs18 info-details__house'>{stay.details.bed} Beds · </li>
                    <li className='fs18 info-details__house'>{stay.details.bath} Bathrooms </li>
                </ul>
                <div>
                    <span className="total-avg-star"> <FaStar style={{ fill: 'black', stroke: 'black', fontSize: '14px' }} /></span>
                    <span className="total-avg-rating fs17" style={{ paddingLeft: '4px', marginTop: '-2px'}}>
                        {avgRating} ·
                    </span>
                    <span className='underline-no__hover fs16'>
                        {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                    </span>
                    <p></p>
                </div>
            </div>
        </section>
    )
}
{/* <StayReviews reviews={stay.reviews} /> */ }
