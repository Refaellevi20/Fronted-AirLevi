import { useEffect, useState } from "react"
import { ImgUseGrid } from "../cmps/ImgUseGrid"
import { stayService } from "../services/stay.service.local"
import { Link, useNavigate, useParams } from "react-router-dom"
import { StayLoader } from "./StayLoader"
import { useHistory } from "../CustomHook/StayHistory"
import { AppFooterDetails } from "../cmps/detailsFooter/DetailsFooter"

export function StayDetails() {
  const [stay, setStay] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const imgsToDisplay = stay?.imgUrls?.slice(0, 5)
  const { addStayToHistory } = useHistory()

  useEffect(() => {
    loadStay()
  }, [])

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

  function onOpenStayGallery() {
    console.log('open gallery')
  }

  return (
    <section className="secondary-layout">
      {!stay && <StayLoader />}
      {stay && (
        <>
          <section className="revers-flex__media">
            <h1 className="stay-top">{stay.name}</h1>
            <div className="sss">
              <ImgUseGrid
                imgsToDisplay={imgsToDisplay}
                onOpenStayGallery={onOpenStayGallery}
              />
            </div>
          </section>
        </>
      )}
      <Link to="/history">Go to History</Link>
      <AppFooterDetails />
    </section>
  )
}
