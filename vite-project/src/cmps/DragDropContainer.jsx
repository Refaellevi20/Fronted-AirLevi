import React, { useState } from 'react';

const DragDropContainer = ({ items, onItemsReorder, renderItem }) => {
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    function handleDragStart(index) {
        setDraggedItemIndex(index);
    };

    function handleDragOver(index) {
        if (draggedItemIndex === null) return
        if (index !== draggedItemIndex) {
            const newItems = [...items]
            const draggedItem = newItems[draggedItemIndex]

            newItems.splice(draggedItemIndex, 1)
            newItems.splice(index, 0, draggedItem)

            onItemsReorder(newItems);
            setDraggedItemIndex(index)
        }
    }

    function handleDragEnd() {
        setDraggedItemIndex(null)
    }

    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={() => handleDragOver(index)}
                    onDragEnd={handleDragEnd}
                    style={{
                        padding: '10px',
                        margin: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: draggedItemIndex === index ? '#f0f0f0' : 'white',
                        cursor: 'move',
                    }}
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}

export default DragDropC