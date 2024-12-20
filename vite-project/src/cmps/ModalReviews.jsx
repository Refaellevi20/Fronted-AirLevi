import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StarRating } from './StarRating'
import ReviewFilter from './reviews/ReviewFilter'
import SortReviews from './reviews/SortReviews'

//^ i enter here the style because i have too many modals
//^ and i did not think before i started
//^ and i could do one modal that will be container for the most of my modals
//^ because almost all the modal are the same style
function Modal({ closeModal, reviews,stay }) {
    const [filteredReviews, setFilteredReviews] = useState(reviews)

    const handleModalClick = (ev) => {
        if (ev.target === ev.currentTarget) {
            closeModal()
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])  //! hidden scroll here


    const modalStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }

    const modalContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
        position: 'relative',
        border: '2px solid #ddd', // Add border here
        boxSizing: 'border-box',
    }

    const closeButtonStyle = {
        // position: 'absolute',
        top: '10px',
        right: '10px',
        width: '72px',
        fontSize: '24px',
        cursor: 'pointer',
    }

    const scrollableContentStyle = {
        maxHeight: 'calc(100% - 40px)', // Ensure that the content is within the padding area
        overflowY: 'auto', // Enable scrolling if the content exceeds the available height
        paddingRight: '10px', // Prevent content from getting clipped by the scrollbar
    }

    const allReviewsStyle = {
        marginTop: '20px',
    }

    const reviewItemStyle = {
        marginBottom: '20px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
    }

    const minUserDetailsStyle = {
        display: 'flex',
        alignItems: 'center',
    }

    const UserDetailsStyle = {
        display: 'block',
        alignItems: 'center',
    }

    const miniUserImgStyle = {
        borderRadius: '50%',
        marginRight: '10px',
        width: '48px',
    }

    const createAtFormatted = moment(reviews.by?.createAt)
    const timeAgo = createAtFormatted.fromNow(true)

    return (
        <div style={modalStyle} onClick={handleModalClick}>
            <div style={modalContentStyle}>
                <div style={{ width: '72px' }}>
                    <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
                </div>
                <section className='flex '>
                <p className="fs22">{stay.reviews.length} reviews</p>
                <SortReviews reviews={reviews} setFilteredReviews={setFilteredReviews} />
                </section>
                <ReviewFilter reviews={reviews} setFilteredReviews={setFilteredReviews} />
                <div style={scrollableContentStyle}>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review, index) => (
                            <div key={index} style={reviewItemStyle}>
                                <div style={minUserDetailsStyle}>
                                    <img
                                        src={review.by.imgUrl}
                                        alt={review.by.fullname}
                                        style={miniUserImgStyle}
                                    />
                                    <div style={UserDetailsStyle}>
                                        <p className='fs16'>{review.by.fullname}</p>
                                        <p className='fs12'>
                                            {review.by.address ||
                                                review.rate?.loc?.address ||
                                                'Address not available'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex1">
                                    <StarRating />
                                    <p>·</p>
                                    <p className='fs12'>{new Date(review.by.createAt).toLocaleString()}</p>
                                    <p>·</p>
                                    <p className='fs12'>Stayed a few nights</p>
                                </div>
                                <p className='fs16'>{review.txt}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal
//* can be use multipe of time so that is why it is a default
