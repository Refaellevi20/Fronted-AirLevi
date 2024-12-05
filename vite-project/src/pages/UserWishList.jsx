import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { StayPreview } from '../cmps/stay/StayPreview'
import { loadStays } from '../store/stay/stay.action'
import { NoteModal } from '../cmps/NoteModal'

function UserWishList() {
  const currLocation = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [note, setNote] = useState('')
  const [savedNotes, setSavedNotes] = useState({})
  const [currentStayId, setCurrentStayId] = useState(null)
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays()
  }, [])

  useEffect(() => {
    const storedNotes = localStorage.getItem('savedNotes')
    if (storedNotes) {
      setSavedNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(savedNotes).length > 0) {
      localStorage.setItem('savedNotes', JSON.stringify(savedNotes))
    }
  }, [savedNotes])

  const handleSaveNote = (newNote) => {
    setSavedNotes(prevNotes => ({
      ...prevNotes,
      [currentStayId]: newNote 
    }))
    setIsModalOpen(false)
    console.log('Note saved:', newNote)
  }

  const handleOpenModal = (stayId) => {
    setCurrentStayId(stayId)
    setNote(savedNotes[stayId] || '')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const wishListStays = stays.filter((stay) => stay.wishList && stay.wishList.length > 0)

  return (
    <div className="wish-list main-layout">
      <Link to="/">back</Link>
      <h1 style={{ marginTop: '23px' }}>My list</h1>
      <p style={{ marginTop: '23px', fontSize: '1.4rem' }}>
        Organize your go-to freelancers and favorite services into
      </p>
      <p style={{ marginTop: '-13px', fontSize: '1.4rem' }}>
        custom lists you can easily access and share with your team.
      </p>
      <h3 style={{ marginTop: '10px', fontSize: '1.2rem' }}>
        You have {wishListStays.length} {wishListStays.length === 1 ? 'stay' : 'stays'} in the wishlist.
      </h3>
      <ul className="card-grid stay-list clean-list">
        {wishListStays.length > 0 ? (
          wishListStays.map((stay) => (
            <li className="stay-preview stay-preview stay-list-item" key={stay._id || uuidv4()}>
              <StayPreview stay={stay} />
              <button onClick={() => handleOpenModal(stay._id)}>
                {savedNotes[stay._id] ? 'Edit Note' : 'Add Note'}
              </button>
              {savedNotes[stay._id] && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                  <h3>Saved Note:</h3>
                  <p>{savedNotes[stay._id]}</p>
                </div>
              )}
              <NoteModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveNote}
                existingNote={note} 
              />
            </li>
          ))
        ) : (
          <h2>The wish list is empty</h2>
        )}
      </ul>
    </div>
  )
}

export default UserWishList
