// src/pages/HistoryPage.jsx

import React from 'react';
import { useHistory } from '../CustomHook/StayHistory';
import { StayPreview } from '../cmps/stay/StayPreview';
import { Link } from 'react-router-dom';

export function HistoryPage() {
  const { history } = useHistory()

  if (history.length === 0) {
    return <div>No stays in history yet!</div>
  }

  const uniqueHistory = Array.from(new Set(history.map(stay => stay._id)))
    .map(id => history.find(stay => stay._id === id))

  return (
    <div>
      <h2>Your Stay History</h2>
      <ul className="card-grid stay-list clean-list">
        {uniqueHistory.map((stay) => (
          <li key={stay._id} className="stay-preview stay-list-item">
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </div>
  )
}
