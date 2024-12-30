import React, { useState } from 'react'
import classes from './image-grid.module.scss'
import img1 from '/img1.jpg'
import img2 from '/img2.jpg'
import img3 from '/img3.jpg'
import img4 from '/img4.jpg'
import img5 from '/img5.jpg'
import img6 from '/img6.jpg'
import img7 from '/img7.jpg'
import img8 from '/img8.jpg'
import img9 from '/img9.jpg'
import img10 from '/img10.jpg'
import img11 from '/img11.jpg'
import img12 from '/img12.jpg'
import img13 from '/img13.jpg'
import img14 from '/img14.jpg'
import img15 from '/img15.jpg'
import img16 from '/img16.jpg'
import img17 from '/img17.jpg'
import img18 from '/img18.jpg'
import ImageCarousel from '../carousel-images/ImageCarousel'

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18]

function Gallery() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const openCarousel = (index) => {
        // console.log('Opening carousel for image index:', index)
        setCurrentIndex(index)
        setIsOpen(true)
    }

    const closeCarousel = () => {
        setIsOpen(false)
    }

    const nextImage = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % images.length
            // console.log('Next image index:', newIndex) 
            return newIndex
        })
    }
    
    const prevImage = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + images.length) % images.length
            // console.log('Previous image index:', newIndex) 
            return newIndex
        })
    }

    return (
        <section className={classes.gallery}>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`image-${index}`} onClick={() => openCarousel(index)} />
            ))}
            {isOpen && (
                <ImageCarousel
                    images={images}
                    currentIndex={currentIndex}
                    onClose={closeCarousel}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
        </section>
    )
}

export default Gallery
//* default can be reusabllity