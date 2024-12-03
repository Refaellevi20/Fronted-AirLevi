import React from 'react'
import { IoMdClose } from "react-icons/io"
function Modal ({ isOpen, onClose, children }){
    if (!isOpen) return null

    function handleOverlayClick(ev) {
        if (ev.target === ev.currentTarget) {
            onClose()
        }
    }

    return (
        <div style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>  <IoMdClose style={{ position: 'absolute', left: '10px', fontSize: '1.24em' }} /></button>
                {children}
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    modal: {
        background: '#fff',
        padding: '20px',
        borderRadius: '10px 10px 0 0',
        textAlign: 'center',
        width: '100%',
    },
    closeButton: {
        marginTop: '10px',
        padding: '5px 10px',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none'
    },
};

export default Modal;