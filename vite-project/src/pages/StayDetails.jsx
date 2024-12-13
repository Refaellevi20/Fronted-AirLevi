import { useEffect, useRef, useState } from "react"
import { HiXMark } from "react-icons/hi2";
import { ImgUseGrid } from "../cmps/ImgUseGrid"
import { stayService } from "../services/stay.service.local"
import { Link, useNavigate, useParams } from "react-router-dom"
import { StayLoader } from "./StayLoader"
import { useHistory } from "../CustomHook/StayHistory"
import { AppFooterDetails } from "../cmps/details/DetailsFooter"
import { DetailsHouse } from "../cmps/details/DetailsHouse"
import { HostedSmallDetails } from "../cmps/details/HostedSmallDetails"
import { StayCalendar } from "../cmps/StayCalendar"
import { OrderModal } from "./OrderModal"
import { AllAmenities } from "../cmps/AllAmenities"
import { AmenitiesList } from "../cmps/AmenitiesList"
import { StayHighlights } from "../cmps/StayHighlights";
import Reviews from "./Reviews";
import { ReviewBar } from "../cmps/reviews/ReviewBar";
import { IndexReviews } from "../cmps/reviews/IndexReviews";
import { SecondaryHeader } from "../cmps/details/SecondaryHeader";
import { ReviewPreview } from "../cmps/reviews/ReviewPreview";
import useOnScreen from '../CustomHook/useOnScreen';
import { RatingReview2 } from "../cmps/RatingReview2";
import { StayMobileFooter } from "../cmps/details/StayNobileFooter";
import Gallery from "../cmps/buttons ui/image-grid";


export function StayDetails({ reviews }) {
  const [stay, setStay] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const { addStayToHistory } = useHistory()
  const reserveBtnRef = useRef()
  const imgGridRef = useRef()
  const [openTab, setOpenTab] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState(null)
  // const imgGridVisible = useOnScreen(imgGridRef, '-20px')
  const reserveBtnVisible = useOnScreen(reserveBtnRef, '-34px')
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const imgsToDisplay = stay?.imgUrls?.slice(0, 5)
  const amenitiesToDisplay = stay?.amenities?.slice(0, 10)
  const reviewsToDisplay = stay?.reviews?.slice(0, 6)


  useEffect(() => {
    loadStay()
  }, [])

  //^ becouse i have the scroll of the page too
  //^ becouse i did 100% modal (all the page)
  useEffect(() => { 
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isGalleryOpen])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
      addStayToHistory(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      navigate('/stay')
    }
  }

  function openModal(componentToOpen) {
    console.log('isOpen:', isOpen)
    setIsOpen(true)
    setComponent(componentToOpen)
  }

  function closeModal() {
    setIsOpen(false)
    setComponent(null)
  }

  function onOpenStayGallery() {
    console.log('open gallery')
    setIsGalleryOpen(true)
  }

  function onCloseStayGallery() {
    setIsGalleryOpen(false)
  }

  // function calcAvgReview(reviews) {
  //   let total = 0
  //   let count = 0

  //   reviews.forEach(review => {
  //     total += Object.values(review.rate).reduce((a, b) => a + b, 0)
  //     count += Object.keys(review.rate).length
  //   })

  //   return +(total / count).toFixed(2)
  // }

  // const reviewCount = stay.reviews ? stay.reviews.length : 0
  // const avgRating = stay.reviews ? calcAvgReview(stay.reviews) : 0


  if (!stay) {
    return <StayLoader />
  }

  return (
    <section className="">
      <section className="">
        {!stay && <StayLoader />}
        {!!stay && (
          <>
            <SecondaryHeader
              stay={stay}
              // imgGridVisible={imgGridVisible}
              reserveBtnVisible={reserveBtnVisible}
              setOpenTab={setOpenTab}
            />
            <section className="revers-flex__media">
              <div className="controller-layout__details">
                <h1 id="stay-top" className="stay-top">{stay.name}</h1>
              </div>
              <div className="sss">
                <ImgUseGrid
                  imgsToDisplay={imgsToDisplay}
                  onOpenStayGallery={onOpenStayGallery}
                />
                {isGalleryOpen && (
                <div className="modal-gallery">
                    <div className="modal-content__gallery">
                      <div className='flex gallery-txt'>
                        <button className="btn-close" onClick={onCloseStayGallery}>
                        <HiXMark className="fs24"/>
                        </button>
                        <h2>Gallery</h2>
                        </div>
                        <Gallery />
                    </div>
                </div>
            )}
              </div>
            </section>
          </>
        )}
        <section>
        </section>
      </section>
      <Link to="/history">Go to History</Link>
      <div className="controller-layout__details container-details__split secondary-layout">
        <div className="details-house">
          <DetailsHouse stay={stay} />
          <HostedSmallDetails host={stay.host} />
          <div className='stay-highlights border-buttom'>
            <StayHighlights />
          </div>
          <div>
            <div id="amenities" className="stay-amenities border-bottom">
              <h4 className="subheading">What this place offers</h4>
              {amenitiesToDisplay && <AmenitiesList amenitiesToDisplay={amenitiesToDisplay} />}
              {stay.amenities.length > 10 && (
                <div
                  className="rev-btn show-all-amenities  fs16"
                  onClick={() => openModal(<AllAmenities amenities={stay.amenities} />)}
                >
                  Show all {stay.amenities.length} amenities
                </div>
              )}
            </div>
            {isOpen && (
              <section className="amenities-modal__container">
                <div className="modal-overlay" onClick={closeModal}>
                  <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    <button onClick={closeModal} className="modal-close-btn"> <HiXMark style={{ fontSize: '20px' }} /></button>
                    {component}
                  </div>
                </div>
              </section>
            )}
          </div>
          <div className='stay-calendar'>
            <StayCalendar />
          </div>

        </div>
        {/* <div className="stay-card">
          <div className='stay-review-order'> */}
        <OrderModal
          stay={stay}
          openTab={openTab}
          setOpenTab={setOpenTab}
          reserveBtnRef={reserveBtnRef}
        />
        {/* </div>
        </div> */}
      </div>
      <div className="secondary-layout">
        <section id="reviews" className=" controller-Reviews-details__stay">
          <div className="flex1 avr-reviews__details">
            <RatingReview2 reviews={stay.reviews} />
            {/* <span className='fs26'>
            ·{reviewCount} review{reviewCount !== 1 ? 's' : ''}
            </span> */}  //! here sometimes problom for no reasen
          </div>
          <div className="flex1">
            <ReviewBar reviews={stay.reviews} />
            <IndexReviews reviews={reviews} />
          </div>
        </section>
        <div className="controller-layout__details">
          <Reviews reviews={stay.reviews} />
        </div>
        <div //* to fix 
          className='stay-rating controller-layout__details'
          onClick={() =>
            openModal(
              <ReviewPreview
                reviewsToDisplay={reviewsToDisplay}
                key={reviewsToDisplay.id}
              />
            )
          }>
          <div className=" show-all-details btn-reviews__details">
            <p className="">{stay.reviews.length} reviews</p>
          </div>
        </div>
      </div>
      <div >
        <AppFooterDetails />
      </div>
      <div className='details-app-footer'>
        {stay && <StayMobileFooter stay={stay} setOpenTab={setOpenTab} />} //! here that is on the appFooter
      </div>
    </section>
  )
}
