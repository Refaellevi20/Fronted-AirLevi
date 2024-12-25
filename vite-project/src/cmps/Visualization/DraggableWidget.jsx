import { Draggable } from 'react-beautiful-dnd'

export function DraggableWidget({ widget, index }) {
    return (
        <Draggable draggableId={widget.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`widget-item ${snapshot.isDragging ? 'dragging' : ''}`}
                >
                    <div className="widget-item-icon">{widget.icon}</div>
                    <div className="widget-item-content">
                        <h4>{widget.title}</h4>
                        <p>{widget.description}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}