import { useEffect, useState } from 'react'
import { IoIosArrowForward, IoIosArrowDown  } from 'react-icons/io';
import { IoIosArrowUp } from "react-icons/io";

export function Accordion({ children, title = 'u will see your wishlist only on your device!!!' }) {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 600px)").matches)
    const [isOpen, setIsOpen] = useState(false)

    function toggleAccordion() {
            setIsOpen((prev) => !prev)
    }

    return (
            <section style={{cursor:'pointer'}} className={`accordion ${isOpen ? 'open' : ''}`}>
                <section onClick={toggleAccordion} className="title-container flex1">
                    <h2>{title}</h2>
                    <span className="arrow">
                    {isOpen ? <IoIosArrowDown size={30} style={{marginTop:'10px'}}/> : <IoIosArrowUp  size={30} style={{marginTop:'10px'}}/>} 
                </span>
                </section>
                {isOpen && <section className="content">{children}</section>}
            </section>
    )
}

