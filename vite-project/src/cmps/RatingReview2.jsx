import { FaStar } from 'react-icons/fa'

export function RatingReview2({ reviews }) {

    function calcAvgReview(reviews) {
        let total = 0
        let count = 0

        reviews.forEach(review => {
            total += Object.values(review.rate).reduce((a, b) => a + b)
            count += Object.keys(review.rate).length
        })
        return (
            +(total / count).toFixed(2)
        )
    }

    let avgRating = calcAvgReview(reviews)

    return (
        <>
            <span className="avg-rating flex1" style={{flexWrap: 'nowrap'}}>
                <span className="total-avg-star fs20"> <FaStar style={{fill: 'black',stroke:'black'}}/></span>
                <span className="total-avg-rating " style={{paddingLeft: '4px',marginTop:'-2px',fontSize:'26px'}}>{avgRating}</span>
            </span>
        </>
    )

}
