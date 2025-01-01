import React, { createContext, useContext, useState } from 'react'

const DragDropContext = createContext()

export function useDragDropContext(){
    return useContext(DragDropContext)
}

export function DragDropProvider({ children }) {
    const [draggedItemIndex, setDraggedItemIndex] = useState(null)
    const [items, setItems] = useState([])

    function startDrag(index) {
        setDraggedItemIndex(index)
    }

    function dropItem(index) {
        if (draggedItemIndex === null || draggedItemIndex === index) return

        const newItems = [...items]
        const [movedItem] = newItems.splice(draggedItemIndex, 1)
        newItems.splice(index, 0, movedItem)
        setItems(newItems)
        setDraggedItemIndex(null)
    }

    function setItemsList(newItems) {
        setItems(newItems)
    }

    return (
        <DragDropContext.Provider value={{ startDrag, dropItem, setItemsList, items }}>
            {children}
        </DragDropContext.Provider>
    )
}
