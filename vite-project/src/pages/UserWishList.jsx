import { useSelector } from "react-redux"
import { useWishlist } from "../CustomHook/useWishlist" 
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { loadStays } from "../store/stay/stay.action"
import { StayPreview } from "../cmps/stay/StayPreview"
// import { Accordion } from "../cmps/Accordion"

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
        <div className="wish-list main-layout">
            <Link to="/" ><IoIosArrowBack /></Link>
            <h1 style={{ marginTop: '23px' }} className='fs32'>Wishlist</h1>
            {/* <Accordion> */}
            <h5>u will see your wishlist only on your device only!!!</h5>
            {/* </Accordion> */}
            <p>LOOOOOOOOOOOOOOO</p>
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
    )
}

//! acordion 
//! be functions of dibager 