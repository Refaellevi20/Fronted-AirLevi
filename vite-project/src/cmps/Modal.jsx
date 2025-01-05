import React, { useEffect, useRef } from 'react'

//^ i enter here the style because i have too many modals
//^ and i did not think before i started
//^ and i could do one modal that will be container for the most of my modals
//^ because almost all the modal are the same style
function Modal({ closeModal, reviews,focusedReview  }) {
    const focusedRef = useRef(null)
    const handleModalClick = (ev) => {
        if (ev.target === ev.currentTarget) {
            closeModal()
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
    
        if (focusedReview && focusedRef.current) {
          //* Scroll smoothly to the focused review
          focusedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    
        return () => {
          document.body.style.overflow = 'auto'
        }
      }, [focusedReview])


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
        border: '2px solid #ddd', 
        boxSizing: 'border-box',
    }

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '24px',
        cursor: 'pointer',
    }

    const scrollableContentStyle = {
        maxHeight: 'calc(100% - 40px)',
        overflowY: 'auto',
        paddingRight: '10px',
    }

    const allReviewsStyle = {
        marginTop: '20px',
    }

    const reviewItemStyle = {
        marginBottom: '20px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
    }

    const miniUserDetailsStyle = {
        display: 'flex',
        alignItems: 'center',
    }

    const miniUserImgStyle = {
        borderRadius: '50%',
        marginRight: '10px',
        width: '48px',
    }

    return (
        <div style={modalStyle} onClick={handleModalClick}>
            <div style={modalContentStyle}>
                <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
                <h2>All Reviews</h2>
                <div style={scrollableContentStyle}>
                    {reviews.map((review) => (
                        <div key={review.id}
                        ref={focusedReview?.id === review.id ? focusedRef : null}
                        style={reviewItemStyle}>
                            <div style={miniUserDetailsStyle}>
                                <img src={review.by.imgUrl} alt={review.by.fullname} style={miniUserImgStyle} />
                                <p>{review.by.fullname}</p>
                            </div>
                            <p>{review.txt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal
//* can be use multipe of time so that is why it is a default
