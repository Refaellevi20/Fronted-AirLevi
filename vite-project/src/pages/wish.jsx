import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLoginModal } from '../CustomHook/useLoginModal'
import { showSuccessMsg } from '../services/event-bus.service'
import { LoginSignup } from '../cmps/LoginSignup'
import { useWishlist } from "../CustomHook/useWishlist" 

export function Wish({ stayId }) {
    const [heart, setHeart] = useState(false)
    const user = useSelector((state) => state.userModule.user)
    const { openLoginModal, closeLoginModal } = useLoginModal()
    const { removeFromWishlist } = useWishlist()

    useEffect(() => {
        if (user) {
            const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')
            setHeart(userWishlist.includes(stayId))
        } else {
            setHeart(false)
        }
    }, [stayId, user])

    async function handleHeartToggle(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (!user) {
            openLoginModal(
                <LoginSignup
                    closeModal={() => closeLoginModal()}
                />
            )
            return
        }

        try {
            const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')

            if (userWishlist.includes(stayId)) {
                const newWishlist = userWishlist.filter((id) => id !== stayId)
                localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(newWishlist))
                setHeart(false)
                removeFromWishlist(stayId)
                showSuccessMsg('Removed from wishlist')
            } else {
                userWishlist.push(stayId)
                localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(userWishlist))
                setHeart(true)
                showSuccessMsg('Added to wishlist')
            }
        } catch (err) {
            console.error('Failed to update wishlist:', err)
        }
    }

    return (
        <div className="stay-heart__preview">
            <button onClick={handleHeartToggle}>
                <img
                    src={heart ? "./img/red_heart.png" : "./img/gray_heart.svg"}
                    alt="Heart"
                    className="heart-img"
                />
            </button>
        </div>
    )
}
