import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Order } from './Order'

export function OrderList({ orders, onOrdersReorder }) {
    const onDragEnd = (result) => {
        const { destination, source } = result
        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const reorderedOrders = Array.from(orders)
        const [removed] = reorderedOrders.splice(source.index, 1)
        reorderedOrders.splice(destination.index, 0, removed)

        onOrdersReorder(reorderedOrders)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Guest</th>
                        <th>Dates</th>
                        <th>Stay</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <Droppable droppableId="orders">
                    {(provided) => (
                        <tbody
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {orders.reverse().map((order, index) => (
                                <Draggable
                                    key={order._id}
                                    draggableId={order._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={snapshot.isDragging ? 'dragging' : ''}
                                        >
                                            <Order order={order} />
                                        </tr>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
            </table>
        </DragDropContext>
    )
}