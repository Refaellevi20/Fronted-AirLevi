import React, { useState } from "react";
import { Picker } from "emoji-mart";

function EmojiModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close Emoji Picker"
        >
          &times;
        </button>
        <Picker onSelect={onSelect} />
      </div>
    </div>
  )
}


export default EmojiModal