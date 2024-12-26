// import { useState } from "react"
// import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"

// export function Accordion({ title, children }) {
//     const [isOpen, setIsOpen] = useState(false)
//     const [showExtra, setShowExtra] = useState(false)

//     return (
//         <section className="accordion">
//             <button 
//                 onClick={() => setIsOpen(prev => !prev)} 
//                 className="accordion-header"
//                 aria-expanded={isOpen}
//             >
//                 <h2>{title}</h2>
//                 <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>
//                 <p className="extra-content">LOOOOOOOOOOOOOOO</p>
//                     {isOpen ?  <IoIosArrowDown /> : <IoIosArrowForward />}
//                 </span>
//             </button>
//             <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
//                 <h5 
//                     className="clickable-text"
//                     onClick={() => setShowExtra(prev => !prev)}
//                 >
//                     u will see your wishlist only on your device only!!!
//                 </h5>
//                 {showExtra && (
//                     <p className="extra-content">LOOOOOOOOOOOOOOO</p>
//                 )}
//                 {children}
//             </div>
//             <hr className="accordion-divider" />
//         </section>
//     )
// }