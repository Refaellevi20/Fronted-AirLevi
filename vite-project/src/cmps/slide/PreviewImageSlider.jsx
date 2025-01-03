import { useEffect, useState } from 'react'
import { Slider } from '../slider/slider'
import { showSuccessMsg } from '../../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { LoginSignup } from '../LoginSignup'
import { useModal } from '../../customHook/useModal'
import { useLoginModal } from '../../CustomHook/useLoginModal'
import { DeleteConfirmation } from '../DeleteConfirmation'
import { Link,useNavigate } from 'react-router-dom'
import { useWishlist } from '../../CustomHook/useWishlist'
import { HiXMark } from "react-icons/hi2";

export function PreviewImageSlider({ imgUrls, stay, isOwner, onRemove, stayId }) {
    const [heart, setHeart] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state.userModule.user)
    const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()
    const dispatch = useDispatch()
    const { removeFromWishlist } = useWishlist()
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const navigate = useNavigate()

    function handleDeleteClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setShowDeleteConfirmation(true)
    }

    function handleConfirmDelete() {
        onRemove()
        setShowDeleteConfirmation(false)
    }

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
    // }, [])//^ but here is bad becouse it is on also when the modal is off so i can use ref to fix it 

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isModalOpen])

    async function onHandleHeart(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (!user) {
            if(ev) {
                ev.preventDefault()
                ev.stopPropagation()
            }
            // setIsModalOpen(true)
            openLoginModal(
                <LoginSignup
                    closeModal={() => {
                        closeLoginModal()
                        // setIsModalOpen(false)
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

    function handleModalClick(ev) {
        if (isModalOpen) {
            ev.preventDefault()
            ev.stopPropagation()
        }
    }


    //! dispach remove from (updateStay(updatedStay)) here
    // function onWishListStay(ev) {
    //     if(ev){
    //         ev.preventDefault()
    //         ev.stopPropagation()
    //     }
    //     if (!user) {
    //         if(ev){
    //             ev.preventDefault()
    //             ev.stopPropagation()
    //         }
    //         openLoginModal(<LoginSignup />)
    //     } else {
    //         if(ev){
    //             ev.preventDefault()
    //             ev.stopPropagation()
    //         }
    //         onHandleHeart(ev)
    //     }
    // }

function handleEditClick(stayId,ev) {
    if(ev){
        ev.preventDefault()
        ev.stopPropagation()
    }
    navigate(`/stay/edit/${stayId}`)
}

    //! home footer 
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
            <span className='btn-delete__preview'>
            {isOwner && (
                           <button
                               className="delete-btn"
                               onClick={handleDeleteClick}
                           >
                              <HiXMark className="fs24" />
                           </button>
                       )}
           
                       {showDeleteConfirmation && (
                           <DeleteConfirmation
                               onConfirm={handleConfirmDelete}
                               onCancel={() => setShowDeleteConfirmation(false)}
                           />
                       )}
            </span>
            {/* <span>
                <EditStay stay={stay}/>
            </span> */}

            {/* <span style={{zIndex:'10000'}}>
                <button onClick={() => handleEditClick(stay._id)}>ddddddddd</button>
            </span> */}
            <Slider>
                {imgUrls.map((url, idx) => (
                    <img key={idx} src={url} alt='Stay' />
                ))}
            </Slider>
        </div>
    )
}


// {!user ? (
//     <div className='menu-links'>
//         <Link onClick={() =>
//             openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
//         }>
//             Log in
//         </Link>
//     </div>
// ) : (
//     <span className="heart">
//         <div className="stay-heart__preview">
//             <button onClick={onHandleHeart}>
//                 <img
//                     src={heart ? "./img/red_heart.png" : "./img/gray_heart.png"}
//                     alt="Heart"
//                     className="heart-img"
//                 />
//             </button>
//         </div>
//     </span>
// )}
//^ option 2