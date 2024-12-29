import { FaStar, FaHome, FaBed, FaBath, FaUsers } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export function ReviewStep({ stayData }) {
    // Add safety checks for nested objects
    const details = stayData?.details || {
        guests: 1,
        bedroom: 1,
        bed: 1,
        bath: 1
    }

    const location = stayData?.loc || {
        country: '',
        city: '',
        address: ''
    }

    return (
        <div className="review-step">
            <div className="review-container">
                <h2>Review your listing</h2>
                <p>Here's what we'll show to guests. Make sure everything looks good.</p>

                <div className="preview-card">
                    <div className="preview-image">
                        {stayData.imgUrls && stayData.imgUrls[0] ? (
                            <img src={stayData.imgUrls[0]} alt="Property preview" />
                        ) : (
                            <div className="placeholder-image">
                                <FaHome />
                            </div>
                        )}
                    </div>

                    <div className="preview-details">
                        <h3>{stayData.name || 'Unnamed Property'}</h3>
                       
                        <div className="location">
                            <MdLocationOn />
                            <span>{location.city}, {location.country}</span>
                        </div>

                        <div className="amenities-preview">
                            <div className="amenity">
                                <FaUsers />
                                <span>{details.guests} guests</span>
                            </div>
                            <div className="amenity">
                                <FaBed />
                                <span>{details.bedroom} bedrooms</span>
                            </div>
                            <div className="amenity">
                                <FaBed />
                                <span>{details.bed} beds</span>
                            </div>
                            <div className="amenity">
                                <FaBath />
                                <span>{details.bath} baths</span>
                            </div>
                        </div>

                        <div className="description">
                            <p>{stayData.summary || 'No description provided'}</p>
                        </div>

                        <div className="price">
                            <strong>${stayData.price || 0}</strong> / night
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
