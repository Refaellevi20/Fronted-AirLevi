import { useEffect, useState } from 'react'
import { Slider } from '../slider/slider'
import { showSuccessMsg } from '../../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { LoginSignup } from '../LoginSignup'
import { useModal } from '../../customHook/useModal'
import { useLoginModal } from '../../CustomHook/useLoginModal'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../CustomHook/useWishlist'


export function PreviewImageSlider({ imgUrls, stay,onWishlistUpdate }) {
    const [heart, setHeart] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state.userModule.user)
    const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()
    const dispatch = useDispatch()
    const { removeFromWishlist } = useWishlist()


    useEffect(() => {
        if (user) {
            const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')
            setHeart(userWishlist.includes(stay._id))
        } else {
            setHeart(false)
        }
    }, [stay._id, user])

    //^ better to do for it custom hook
    // useEffect(() => {
    //     document.body.style.overflow = 'hidden'

    //     return () => {
    //         document.body.style.overflow = 'auto'
    //     }
    // }, []) but here is bad becouse it is on also when the modal is off so i can use ref to fix it 

    async function onHandleHeart(ev){
        ev.preventDefault()
        ev.stopPropagation()

        if (!user) {
            setIsModalOpen(true)
            openLoginModal(
                <LoginSignup
                    closeModal={() => {
                        closeLoginModal()
                        setIsModalOpen(false)
                    }}
                />
            )
            return
        }

        try {
            const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')

            if (userWishlist.includes(stay._id)) {
                //* Remove
                const newWishlist = userWishlist.filter(id => id !== stay._id)
                localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(newWishlist))
                setHeart(false)
                removeFromWishlist(stay._id)
                showSuccessMsg('Removed from wishlist')

                // Dispatch action to update global state
               
            } else {
                //* Add 
                userWishlist.push(stay._id)
                localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(userWishlist))
                setHeart(true)
                showSuccessMsg('Added to wishlist')

                // dispatch({ type: UPDATE_WISHLIST, wishlist: userWishlist })

                // if (onWishlistUpdate) onWishlistUpdate(userWishlist)

            }
        } catch (err) {
            console.error('Failed to update wishlist:', err)
        }
    }

    const handleModalClick = (ev) => {
        if (isModalOpen) {
            ev.preventDefault()
            ev.stopPropagation()
        }
    }


    //! dispach remove from (updateStay(updatedStay)) here
    function onWishListStay(stayId) {
        if (!user) {
            openModal(<LoginSignup />)
        } else {
            onHandleHeart(ev)
        }
    }
    //! home footer on middle size + here user (login)
    return (
        <div className='image-slider almost-square-ratio'>
            <div className='click-outside login__modal--wrapper' onClick={handleModalClick}>
                <LoginModal />
            </div>
            <span className="heart">
                <div className="stay-heart__preview">
                    <button onClick={onHandleHeart}>
                        <img
                            src={heart ? "./img/red_heart.png" : "./img/gray_heart.png"}
                            alt="Heart"
                            className="heart-img"
                        />
                    </button>
                </div>
            </span>
            <Slider>
                {imgUrls.map((url, idx) => (
                    <img key={idx} src={url} alt='Stay' />
                ))}
            </Slider>
        </div>
    )
}
