import { PrgoressBar } from "../progress-bar" 
import { RatingReview } from "../RatingReview";

export function ReviewBar({ reviews,stay }) {
    let starsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
        const avgRating = Object.values(review.rate).reduce((a, b) => a + b, 0) / Object.keys(review.rate).length;

        if (avgRating >= 4.5) {
            starsCount[5]++
        } else if (avgRating >= 4) {
            starsCount[4]++
        } else if (avgRating >= 3) {
            starsCount[3]++
        } else if (avgRating >= 2) {
            starsCount[2]++
        } else {
            starsCount[1]++
        }
    })

    return (
        <section className="reviews-bar grid ">
        <p className="fs12">Overall rating</p>
        <span className="progress-bar flex review-line">
            <PrgoressBar progress={starsCount[5]} />
            <span style={{ marginLeft: '0.5rem' }}>
                {/* {starsCount[5]} review{starsCount[5] !== 1 ? 's' : ''} */}
            </span>
        </span>
        {/* <p>4 Stars</p> */}
        <span className="progress-bar flex">
            <PrgoressBar progress={starsCount[4]} />
            <span style={{ marginLeft: '0.5rem' }}>
                {/* {starsCount[4]} {starsCount[4] !== 1 ? 's' : ''} */}
            </span>
        </span>
        {/* <p>3 Stars</p> */}
        <span className="progress-bar flex">
            <PrgoressBar progress={starsCount[3]} />
            <span style={{ marginLeft: '0.5rem' }}>
                {/* {starsCount[3]} review{starsCount[3] !== 1 ? 's' : ''} */}
            </span>
        </span>
        {/* <p>2 Stars</p> */}
        <span className="progress-bar flex">
            <PrgoressBar progress={starsCount[2]} />
            <span style={{ marginLeft: '0.5rem' }}>
                {/* {starsCount[2]} review{starsCount[2] !== 1 ? 's' : ''} */}
            </span>
        </span>
        {/* <p>1 Star</p> */}
        <span className="progress-bar flex">
            <PrgoressBar progress={starsCount[1]} />
            <span style={{ marginLeft: '0.5rem' }}>
                {/* {starsCount[1]} review{starsCount[1] !== 1 ? 's' : ''} */}
            </span>
        </span>
                {/* <RatingReview /> */}
    </section>
    )
}