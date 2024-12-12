

export function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const arrow = isOpen ? '▲' : '▼';
    return (
        <section className="accordion">
            <section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container">
                <h2>{title}</h2>
                <span>{arrow}</span>
            </section>
            {isOpen && <div>{children}</div>}
            <hr />
        </section>
    )
} 
