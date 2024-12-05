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

  const handleSave = () => {
    if (note.trim()) {
      onSave(note)
      setNote('') 
    }
  }

  const handleClear = () => {
    setNote('')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{existingNote ? 'Edit Note' : 'Add Note'}</h2>
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
  )
}
