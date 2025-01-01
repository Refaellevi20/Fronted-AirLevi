import React from 'react'

function ThingsToKnow() {
    return (
        <div className="things-to-know">
            <h2>Things to know</h2>
            <div className="info-cards">
                <div className="info-card">
                    <h3>House rules</h3>
                    <p>Check-in: 3:00PM - 11:00PM</p>
                    <p>Checkout before 12:00PM</p>
                    <p>6 guests maximum</p>
                    <button className="show-more">Show more</button>
                </div>
                <div className="info-card">
                    <h3>Safety & property</h3>
                    <p>Carbon monoxide alarm not reported</p>
                    <p>Smoke alarm</p>
                    <button className="show-more">Show more</button>
                </div>
                <div className="info-card">
                    <h3>Cancellation policy</h3>
                    <p>This reservation is non-refundable.</p>
                    <p>Review this Host's full policy for details.</p>
                    <button className="show-more">Show more</button>
                </div>
            </div>
        </div>
    )
}

export default ThingsToKnow