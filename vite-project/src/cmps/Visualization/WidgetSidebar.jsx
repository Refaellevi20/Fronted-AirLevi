import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { DraggableWidget } from './DraggableWidget'

export function WidgetSidebar({ onAddWidget }) {
    const availableWidgets = [
        {
            id: 'bookings',
            type: 'line',
            title: 'Booking Statistics',
            icon: '📊',
            description: 'Monthly booking trends'
        },
        {
            id: 'revenue',
            type: 'bar',
            title: 'Revenue Analysis',
            icon: '💰',
            description: 'Monthly revenue breakdown'
        },
        {
            id: 'reviews',
            type: 'line',
            title: 'Review Metrics',
            icon: '⭐',
            description: 'Average ratings over time'
        },
        {
            id: 'occupancy',
            type: 'bar',
            title: 'Occupancy Rates',
            icon: '🏠',
            description: 'Property occupancy rates'
        }
    ]

    const handleDragEnd = (result) => {
        if (!result.destination) return

        const widget = availableWidgets.find(w => w.id === result.draggableId)
        if (widget) {
            onAddWidget({
                ...widget,
                id: `${widget.id}_${Date.now()}`,
                position: { x: 0, y: 0, w: 6, h: 4 }
            })
        }
    }

    return (
        <aside className="widget-sidebar">
            <div className="widget-sidebar-header">
                <h3>Available Widgets</h3>
                <p className="widget-sidebar-subtitle">Drag widgets to add them to your dashboard</p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="widgets">
                    {(provided) => (
                        <div
                            className="widget-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {availableWidgets.map((widget, index) => (
                                <DraggableWidget 
                                    key={widget.id}
                                    widget={widget}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="widget-sidebar-footer">
                <button 
                    className="create-custom-widget-btn"
                    onClick={() => onAddWidget({
                        id: `custom_${Date.now()}`,
                        type: 'custom',
                        title: 'Custom Widget',
                        icon: '🔧'
                    })}
                >
                    <span>+</span> Create Custom Widget
                </button>
            </div>
        </aside>
    )
}