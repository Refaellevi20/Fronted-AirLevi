import { useState, useRef } from 'react'
import { FaCloudUploadAlt, FaImage, FaTrash } from 'react-icons/fa'
import { MdDragIndicator } from 'react-icons/md'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export function PhotoStep({ stayData, setStayData }) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef()

    const handleFileUpload = async (ev) => {
        try {
            const files = Array.from(ev.target.files)
            const newImgs = [...(stayData.imgUrls || [])]

            for (const file of files) {
                // Here you would typically upload to your storage service
                // For now, we'll use local URLs
                const url = URL.createObjectURL(file)
                newImgs.push(url)
            }

            setStayData({
                ...stayData,
                imgUrls: newImgs
            })
        } catch (err) {
            console.error('Failed to upload images:', err)
        }
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return

        const items = Array.from(stayData.imgUrls)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setStayData({
            ...stayData,
            imgUrls: items
        })
        setIsDragging(false)
    }

    const removeImage = (index) => {
        const newImgs = stayData.imgUrls.filter((_, idx) => idx !== index)
        setStayData({
            ...stayData,
            imgUrls: newImgs
        })
    }

    return (
        <div className="photo-step">
            <div className="photo-container">
                <h2>Add some photos of your place</h2>
                <p>You'll need 5 photos to get started. You can add more or make changes later.</p>

                {(!stayData.imgUrls || stayData.imgUrls.length === 0) ? (
                    <div
                        className="upload-container"
                        onDragOver={(e) => {
                            e.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault()
                            setIsDragging(false)
                            handleFileUpload({ target: { files: e.dataTransfer.files } })
                        }}
                    >
                        <div className={`upload-area ${isDragging ? 'dragging' : ''}`}>
                            <FaCloudUploadAlt className="upload-icon" />
                            <h3>Drag your photos here</h3>
                            <p>Choose at least 5 photos</p>
                            <button
                                className="upload-btn"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Upload from your device
                            </button>
                        </div>
                    </div>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="photos">
                            {(provided) => (
                                <div
                                    className="photos-grid"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {stayData.imgUrls.map((url, index) => (
                                        <Draggable
                                            key={url}
                                            draggableId={url}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    className={`photo-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                >
                                                    <img src={url} alt={`Photo ${index + 1}`} />
                                                    <div className="photo-overlay">
                                                        <div {...provided.dragHandleProps} className="drag-handle">
                                                            <MdDragIndicator />
                                                        </div>
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => removeImage(index)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                    {index === 0 && (
                                                        <div className="cover-badge">Cover photo</div>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <button
                                        className="add-photo-btn"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <FaImage />
                                        <span>Add more</span>
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*"
                    className="hidden-input"
                />

                {stayData.imgUrls && stayData.imgUrls.length > 0 && (
                    <div className="photo-tips">
                        <h3>Photo tips</h3>
                        <ul>
                            <li>Add photos that show the key features of your place</li>
                            <li>Choose high-quality photos that are at least 1024x683 pixels</li>
                            <li>Drag to reorder photos - your first photo will be your cover photo</li>
                            <li>Avoid photos with text, logos, or watermarks</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}