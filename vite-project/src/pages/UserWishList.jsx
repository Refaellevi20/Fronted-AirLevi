import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { StayPreview } from '../cmps/stay/StayPreview'
import { loadStays } from '../store/stay/stay.action'
export function UserWishList() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)
  const user = useSelector((state) => state.userModule.user)
  const navigate = useNavigate()
  const [wishlistStays, setWishlistStays] = useState([])

  useEffect(() => {
    loadStays()
  }, [])

  useEffect(() => {
    if (stays.length && user) {
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`) || '[]')
      const filteredStays = stays.filter(stay => userWishlist.includes(stay._id))
      setWishlistStays(filteredStays)
    }
  }, [stays, user])

  if (!user) {
    return (
      <div className="wish-list main-layout">
        <Link to="/" ><IoIosArrowBack /></Link>
        <h1 style={{ marginTop: '23px' }} className='fs32'>Please Login</h1>
        <p>You need to be logged in to view your wishlist</p>
      </div>
    )
  }

  return (
    <div className="wish-list main-layout">
      <Link to="/" ><IoIosArrowBack /></Link>
      <h1 style={{ marginTop: '23px' }} className='fs32'>Wishlist</h1>
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