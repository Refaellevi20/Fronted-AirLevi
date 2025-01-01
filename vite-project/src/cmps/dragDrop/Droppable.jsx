import React from 'react'
import { useDragDropContext } from './DragDropContext'

function Droppable({ children }) {
    const { dropItem } = useDragDropContext()

    function handleDrop(event) {
        event.preventDefault()
        const index = parseInt(event.dataTransfer.getData('text/plain'), 10)
        dropItem(index)
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ minHeight: '100px', border: '2px dashed #ccc', padding: '10px' }}
        >
            {children}
        </div>
    )
}

export default Droppable