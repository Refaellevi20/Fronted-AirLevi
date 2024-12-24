import { useState } from 'react'
import { convertCurrency } from '../../services/currency'
import rateTag from '/rate-tag.svg'
import { useSelector } from 'react-redux';

export function LowerRate() {

    const [priceDifference, setPriceDifference] = useState(42)
    const currencyCode = useSelector((state) => state.stayModule.currency)
    const { convertedAmount, currencySymbol } = convertCurrency(priceDifference, currencyCode)
  
    return (
        <section className="lower-rate-container">
            <div className="lower-rate flex">
                <div className="lower-rate-txt">
                    <span className="lower-price-txt">
                        Lower price.
                    </span>
                    <span>
                        Your dates are {currencySymbol}{convertedAmount} less than the avg. nightly rate of the last 60 days.
                    </span>
                </div>
                <div className="rate-img-container">
                    <img src={rateTag} className="rate-tag-img" alt="rate-tag" />
                </div>
            </div>
        </section>
    )
}