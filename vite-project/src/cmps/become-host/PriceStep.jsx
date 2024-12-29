import { useState } from "react"

export function PriceStep({ stayData, setStayData }) {
    const [basePrice, setBasePrice] = useState(stayData.price || 100)

    const updatePrice = (newPrice) => {
        const price = Math.max(0, newPrice)
        setBasePrice(price)
        setStayData({ ...stayData, price })
    }

    return (
        <div className="step-content price-step">
            <div className="price-container">
                <h3>Now, set your price</h3>
                <p>You can change it anytime.</p>

                <div className="price-input-container">
                    <button
                        onClick={() => updatePrice(basePrice - 5)}
                        className="price-adjust-btn"
                    >
                        -
                    </button>
                   
                    <div className="price-input">
                        <span className="currency">$</span>
                        <input
                            type="number"
                            value={basePrice}
                            onChange={(ev) => updatePrice(Number(ev.target.value))}
                            min="0"
                        />
                    </div>

                    <button
                        onClick={() => updatePrice(basePrice + 5)}
                        className="price-adjust-btn"
                    >
                        +
                    </button>
                </div>

                <div className="price-recommendations">
                    <h4>Price recommendations:</h4>
                    <ul>
                        <li>Similar listings in your area average ${basePrice - 20} - ${basePrice + 20}</li>
                        <li>Places like yours usually earn ${(basePrice * 15).toLocaleString()} - ${(basePrice * 20).toLocaleString()} per month</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}