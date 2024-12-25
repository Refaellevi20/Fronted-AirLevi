// src/pages/HistoryPage.jsx

import React, { useState } from 'react';
import { useHistory } from '../CustomHook/StayHistory';
import { StayPreview } from '../cmps/stay/StayPreview';
import { Link } from 'react-router-dom';
import { HiXMark } from "react-icons/hi2";
import { ChatBot } from './ChatBot';

export function HistoryPage() {
  const { history } = useHistory()
  const [isVisible, setIsVisible] = useState(true)

  function handleRemove() {
    setIsVisible(false)
  }
  if (history.length === 0) {
    return <div>No stays in history yet!</div>
  }

  const uniqueHistory = Array.from(new Set(history.map(stay => stay._id)))
    .map(id => history.find(stay => stay._id === id))

  return (
    <div className='main-layout'>
      <h2>wishlist</h2>
      <div className="card-grid__history">
        {isVisible && (
          <Link to="/wishlist" className="stay-list-item">
            <HiXMark
              className="remove-icon"
              onClick={(ev) => {
                ev.preventDefault()
                handleRemove()
              }}
            />
            <img
              src="./img/gray_heart.png"
              alt="heart-wish"
              className="img heart__history fs18"
            />
          </Link>
        )}
      </div>
      <p style={{ marginBottom: '120px' }}></p>
      <h2 className='history-txt__header'>Your Stay History</h2>
      <ul className="card-grid stay-history clean-list">
        {uniqueHistory.map((stay) => (
          <li key={stay._id} className="stay-preview stay-list-item">
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </div>
  )
}
