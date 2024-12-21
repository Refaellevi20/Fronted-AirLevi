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
import ModalReviews from "../cmps/ModalReviews";
import { StayMap } from "../cmps/StayMap";
import { AppHeader } from "../cmps/AppHeader";
import { CalcAvgReview } from "../cmps/calcAvgReview";
import { ModalSize } from "../CustomHook/useModalSize";

const randomTextOptions = [
  "Lexington, Kentucky is the second-largest city in Kentucky next to Louisville, and is located in the heart of the Bluegrass region. Lexington is known as the 'Horse Capital of the World,' since it is home to the Kentucky Horse Park, Keeneland race course and the Red Mile race course.",
  "Lexington, Kentucky is famous for its rich history in horse racing and breeding. The city is home to several historical sites, including the Mary Todd Lincoln House, and hosts many annual events.",
  "The city of Lexington, Kentucky, is an urban hub in the midst of the Bluegrass region. Known for its stunning horse farms and thoroughbred racing, it offers a blend of Southern charm and modern amenities.",
  "Nestled in the heart of Kentucky, Lexington offers a perfect mix of scenic views, cultural history, and outdoor activities. It's a city that embraces both tradition and innovation."
]

export function StayDetails({ reviews }) {
  const [stay, setStay] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const { addStayToHistory } = useHistory()
  const reserveBtnRef = useRef()
  const imgGridRef = useRef()
  const [openTab, setOpenTab] = useState(null)
  const [isOpenAmenities, setIsOpenAmenities] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState(null)
  const imgGridVisible = useOnScreen(imgGridRef, '-0')
  const reserveBtnVisible = useOnScreen(reserveBtnRef, '-34px')
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [reviewsForModal, setReviewsForModal] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [randomText, setRandomText] = useState(getRandomText);

  const imgsToDisplay = stay?.imgUrls?.slice(0, 5)
  const amenitiesToDisplay = stay?.amenities?.slice(0, 10)
  // const reviewsToDisplay = stay?.reviews?.slice(0, 6)
  const [reviewsToDisplay, setReviewsToDisplay] = useState(stay?.reviews?.slice(0, 6) || [])
  const reviewsToAll = stay?.reviews || []


  useEffect(() => {
    const updateReviewsToDisplay = () => {
      if (window.innerWidth <= 950) {
        setReviewsToDisplay(stay?.reviews?.slice(0, 3) || [])
      } else {
        setReviewsToDisplay(stay?.reviews?.slice(0, 6) || [])
      }
    }

    updateReviewsToDisplay()

    window.addEventListener('resize', updateReviewsToDisplay);

    return () => window.removeEventListener('resize', updateReviewsToDisplay);
  }, [stay?.reviews])

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


  useEffect(() => {
    if (isOpenAmenities) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpenAmenities])


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

  function openModalAmenities(componentToOpen) {
    console.log('isOpen:', isOpen)
    setIsOpenAmenities(true)
    setComponent(componentToOpen)
  }

  function closeModalAmenities() {
    setIsOpenAmenities(false)
    setComponent(null)
  }

  function onOpenStayGallery() {
    console.log('open gallery')
    setIsGalleryOpen(true)
  }

  function onCloseStayGallery() {
    setIsGalleryOpen(false)
  }

  function openModal() {
    setReviewsForModal(reviewsToAll)
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
    setReviewsForModal([])
  }

  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * randomTextOptions.length);
    return randomTextOptions[randomIndex];
  }

  if (!stay) {
    return <StayLoader />
  }

  return (
    <section className="">
      <section className="">
        {!stay && <StayLoader />}
        {!!stay && (
          <>
            <div>
              {/* <AppHeader className='main-layout stay-index' />  */}
              {/*remove postion:fix by creating header2  */}
            </div>
            <SecondaryHeader
              stay={stay}
              imgGridVisible={imgGridVisible}
              reserveBtnVisible={reserveBtnVisible}
              setOpenTab={setOpenTab}
            />
            <section className="revers-flex__media">
              <div>
                <div className="controller-layout__details secondary-layout">
                  <h1 id="stay-top" className="stay-top">{stay.name}</h1>
                </div>
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
                          <HiXMark className="fs24" />
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
      {/* <Link to="/history">Go to History</Link> */}
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
                  onClick={() => openModalAmenities(<AllAmenities amenities={stay.amenities} />)}
                >
                  Show all {stay.amenities.length} amenities
                </div>
              )}
            </div>
            {isOpenAmenities && (
              <section className="amenities-modal__container">
                <div className="modal-overlay" onClick={closeModalAmenities}>
                  <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    <ModalSize closeModal={closeModalAmenities} className="modal-close-btn" />
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
            <p><em></em></p>
            <p className="spaced-point">·</p>
            <CalcAvgReview stay={stay} />
          </div>
          <div className="flex1">
            <ReviewBar reviews={stay.reviews} />
            <IndexReviews reviews={reviews} />
          </div>
        </section>
        <div className="controller-layout__details">
          <Reviews reviews={reviewsToDisplay} />
        </div>
        <div className="stay-rating controller-layout__details stay-rating__details">
          <div onClick={openModal} className=" rev-btn show-all-amenities fs16 border-reviews__details">
            <p className="">{stay.reviews.length} reviews</p>
            
          </div>
          {modalIsOpen && (
            <>
              <ModalReviews closeModal={closeModal} reviews={reviewsForModal} stay={stay}/>
            </>
          )}
        </div>
        <div>
        </div>
        {/* </div> */}
      </div>
      {/* <div style={{ position: 'relative' }}></div> */}
      <div >
        <div className='stay-map secondary-layout'>
          <h1 id="location">Where you'll be</h1>
          <StayMap stay={stay} />
          <h3 className='stay-location-name'>
            {stay.loc.country}, {stay.loc.city}
          </h3>
          <p>{randomText}</p>
        </div>
        <div className="main-content">
          <AppFooterDetails />
        </div>
      </div>
      <div className='details-app-footer'>
        {stay && <StayMobileFooter stay={stay} setOpenTab={setOpenTab} />}
      </div>
    </section>
  )
}

