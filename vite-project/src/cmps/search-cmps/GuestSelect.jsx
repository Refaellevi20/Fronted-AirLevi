import { useEffect, useRef, useState } from "react"
import { Counter } from "../Counter"; 
import { HiXMark } from "react-icons/hi2";

export function GuestSelect({ onSetField, guests, closeModal }) {
    const [isServiceAnimalModalOpen, setIsServiceAnimalModalOpen] = useState(false)
    const modalRefPets = useRef(null)

    function openServiceAnimalModal(ev) {
        ev.preventDefault()
        setIsServiceAnimalModalOpen(true)
      }
  
    function closeServiceAnimalModal() {
      setIsServiceAnimalModalOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRefPets.current && !modalRefPets.current.contains(event.target)) {
            closeServiceAnimalModal()
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])

    function handleChange(field, value) {
        if (value <= 0) value = 0
        if (field === 'adults') {
            onSetField('guests', { ...guests, adults: value })
        }
        if (field === 'children') {
            onSetField('guests', { ...guests, children: value })
        }
        if (field === 'infants') {
            onSetField('guests', { ...guests, infants: value })
        }
        if (field === 'pets') {
            onSetField('guests', { ...guests, pets: value })
        }
    }

    const guestSelectOpts = [
        {
            label: 'Adults',
            subLabel: 'Ages 13 +',
            field: 'adults'
        },
        {
            label: 'Children',
            subLabel: 'Ages 2-12',
            field: 'children'
        },
        {
            label: 'Infants',
            subLabel: 'Under 2',
            field: 'infants'
        },
        {
            label: 'Pets',
            subLabel: <a href="" onClick={openServiceAnimalModal}>Bringing a Service Animal?</a>, //! here on size page + open modal
            field: 'pets'
        }
    ]

    return (
        <div className='guest-select-list'>
            {guestSelectOpts.map((opt, idx) => {
                return (
                    <div className="guest-select-row" key={idx}>
                        <div className="guest-select-label">
                            <div className="guest-select-label-header">{opt.label}</div>
                            <div className="guest-select-label-sub-header">{opt.subLabel}</div>
                        </div>
                        <Counter field={opt.field} value={guests[opt.field]} onChange={handleChange} />
                    </div>

                )
            })}
            <p onClick={closeModal} className="close-modal">Close</p>
            {isServiceAnimalModalOpen && (
                <div className="service-animal-modal modal-overlay">
                    <div className="modal-content" ref={modalRefPets}>
                    <button className='fs22' onClick={closeServiceAnimalModal}><HiXMark /></button> //! here style here
                       <img src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg"></img>
                        <h3>Service animals</h3>
                        <p>Service animals aren’t pets, so there’s no need to add them here.</p>
                        <p>Traveling with an emotional support animal? Check out our</p>
                        <a href="accessibility policy.">accessibility policy.</a>
                    </div>
                </div>
            )}
        </div>
    )
}