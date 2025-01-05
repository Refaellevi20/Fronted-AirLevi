import { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState(null)

  function openModal(componentToOpen) {
    console.log('isOpen:', isOpen)
    setIsOpen(true)
    setComponent(componentToOpen)
  }

  function closeModal() {
    setIsOpen(false)
    setComponent(null)
  }

  const Modal2 = ({ isOpen, component: Component, closeModal }) => {
    if (!isOpen || !Component) return null
    return (
      <div className='modal'>
        <div className='close-modal-btn-container'>
          <div onClick={closeModal} />
        </div>
        <div className='content-container'>
          {component}
        </div>
      </div>
    )
  }

  return {
    isOpen,
    component,
    openModal,
    closeModal,
    Modal: (props) => (
      <Modal2 isOpen={isOpen} component={component} closeModal={closeModal} {...props} />
    )
  }
}
