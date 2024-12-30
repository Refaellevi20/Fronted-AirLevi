import { useSelector } from "react-redux"
import { useWishlist } from "../CustomHook/useWishlist"
import { useEffect } from "react"
import { Link,NavLink } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { loadStays } from "../store/stay/stay.action"
import { StayPreview } from "../cmps/stay/StayPreview"
import { Accordion } from "../cmps/Accordion"
import { AppLogo } from "../cmps/app-logo"
import { NavMenu } from "./nav-menu"
import { AboutMe } from "./AboutMe"

export function UserWishList() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const user = useSelector((state) => state.userModule.user)
    const { wishlistStays, setWishlistStays } = useWishlist()

    useEffect(() => {
        loadStays()
    }, [])

    useEffect(() => {
        if (stays.length && user) {
            const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')
            const filteredStays = stays.filter(stay => userWishlist.includes(stay._id))
            setWishlistStays(filteredStays)
        }
    }, [stays, user, setWishlistStays])

    return (
        <section>
         <header className='app-header main-layout flex' style={{ justifyContent: 'space-between' }}>
                        <div className='header-logo-container'>
                            <AppLogo />
                        </div>
                        <div className='spacer'></div>
                        <div className='header-menu-container'>
                            <NavMenu />
                        </div>
                    </header>
        <div className="wish-list main-layout">
            <Link to="/" ><IoIosArrowBack size={30}/></Link>
            <h1 style={{ marginTop: '23px' }} className='fs32'>Wishlist</h1>

            <Accordion >
                <section style={{cursor:'help'}}>
                <h5>Using local storage for a wishlist is beneficial because:</h5>
                <div  className="flex1 ff-cm">
                    <p >1 <strong>Simplicity:</strong> Local storage is easy to implement, requiring no backend setup or server infrastructure, saving development time and cost.</p>
                </div>
                <div>
                    <p>2 <strong>Speed:</strong>Data is stored locally on the user's device, ensuring instant access without network delays.</p>
                </div>
                <div>
                    <p>3 <strong>Privacy:</strong>The wishlist remains private to the user's device, reducing concerns about data being shared or exposed on external servers.</p>
                </div>
                <div>
                    <p>4 <strong>Offline Access:</strong>Users can access their wishlist even when offline, enhancing usability.</p>
                </div>
                <div>
                    <p>5 <strong>No Authentication Dependency:</strong>It works without requiring the user to log in, simplifying the experience.</p>
                </div>
                <div>
                    <p>6 <strong>Use Case Alignment:</strong>For non-critical, personal lists like a wishlist, local storage suffices, avoiding unnecessary backend complexity.</p>
                </div>
                </section>
            </Accordion>
            <ul className="card-grid stay-list clean-list">
                {wishlistStays.length > 0 ? (
                    wishlistStays.map((stay) => (
                        <li className="stay-preview stay-list-item" key={stay._id}>
                            <StayPreview stay={stay} />
                        </li>
                    ))
                ) : (
                    <div>No stays in your wishlist yet</div>
                )}
            </ul>
        </div>
        </section>
    )
}

//! acordion
//! be functions of dibager 