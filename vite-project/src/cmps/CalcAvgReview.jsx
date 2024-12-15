
import { TbPointFilled } from "react-icons/tb";


export function CalcAvgReview({stay}) {

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
        <section>
            <span className=' fs26'>
            {/* <TbPointFilled style={{fontSize:'8', textAlign:'center',marginTop:'-210px'}}/> */}
             {reviewCount} reviews
            </span>
        </section>
    )

}