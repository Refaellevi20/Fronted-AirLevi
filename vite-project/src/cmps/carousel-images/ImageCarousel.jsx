import React from 'react'
import classes from './image-carousel.module.scss';
import { HiXMark } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const ImageCarousel = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    return (
        <section>
            <div className={classes.carouselOverlay}>
                <button className={classes.closeButton} onClick={onClose} style={{ display: 'flex', alignItems: 'center' }}>
                    <HiXMark style={{ marginRight: '5px' }} /> close
                </button>
                <div className={classes.carousel}>
                    <div className={classes.imageInfo}>
                        {currentIndex + 1} / {images.length}
                    </div>
                    <img src={images[currentIndex]} alt={`carousel-${currentIndex}`} className={classes.carouselImage} />
                </div>
                <div className={classes.navigationButtons}>
                    <button className={classes.prevButton} onClick={onPrev}><MdKeyboardArrowLeft size={44} /></button>
                    <button className={classes.nextButton} onClick={onNext}><MdOutlineKeyboardArrowRight size={44} /></button>
                </div>
            </div>
        </section>
    )
}

export default ImageCarousel