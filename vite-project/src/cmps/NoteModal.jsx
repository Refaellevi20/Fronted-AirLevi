import React, { useState, useEffect } from 'react'

export function NoteModal({ isOpen, onClose, onSave, existingNote }) {
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setNote(existingNote)
  }, [existingNote])

  function handleChange(ev) {
    const value = ev.target.value
    if (value.split(' ').length <= 250) {
      setNote(value)
      setError('')
    } else {
      setError('You can only add up to 250 words.')
    }
  }

 function handleSave(){
    if (note.trim()) {
      onSave(note)
      setNote('') 
    }
  }

  function handleClear() {
    setNote('')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className='note-modal'>
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button pointer" onClick={onClose}>X</button>
        <h2 className='pointer'>{existingNote ? 'Edit Note' : 'Add Note'}</h2> //! here pointer
        <textarea
          value={note}
          onChange={handleChange}
          placeholder="Write your note here..."
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
    </div>
  )
}
