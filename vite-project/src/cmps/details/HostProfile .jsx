import React from 'react';

function HostProfile() {
    return (
        <div className="host-profile border-top border">
            <h2>Meet your Host</h2>
            <div className="host-card__center">
                <div className="host-info host-card">
                    <img src={"https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png"} alt="Host" className="host-image" />
                    <div className="host-details">
                        <h3 className="host-name">Bernardino</h3>
                        <span className="host-status">Superhost</span>
                        <div className="host-rating">
                            <span className="rating">4.95★</span>
                            <span className="reviews">137 Reviews</span>
                        </div>
                        <span className="hosting-years">6 Years hosting</span>
                    </div>
                </div>
                <div className="host-description ">
                    <div  className='border-buttom'>
                    <p className='text-host__profile'>
                        Bernardino is a Superhost. Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests,Superhosts consistently receive 5-star reviews, respond quickly to inquiries.
                    </p>
                    <div className="host-details-info ">
                        <p><strong>Response rate:</strong> 100%</p>
                        <p><strong>Responds within:</strong> an hour</p>
                    </div>
                    <div className='messege-host__profile'>
                    <button className="message-host ">Message Host</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="host-education ">
                <p>Where I went to school: <strong>São Paulo Administração Empresas</strong></p>
                <p>My work: <strong>Wine Ambassador</strong></p>
            </div>
            <div className="host-bio">
                <p>
                    Airbnb's Superhost, Bernardino Costa is calm, quiet and very attentive to making everything perfect in...
                </p>
                <button className="show-more">Show more</button>
            </div>
        </div>
    )
}

export default HostProfile

//! 3 jump