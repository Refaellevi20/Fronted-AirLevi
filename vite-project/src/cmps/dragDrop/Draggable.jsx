import React from 'react'
import { useDragDropContext } from './DragDropContext'

const Draggable = ({ index, children }) => {
    const { startDrag } = useDragDropContext()

    function handleDragStart() {
        startDrag(index)
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{ padding: '10px', border: '1px solid #ccc', margin: '5px', cursor: 'move' }}
        >
            {children}
        </div>
    )
}

export default Draggable