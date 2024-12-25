import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TableSkeleton } from '../TableSkeleton'
import { Trip } from './trip'

export function TripList({ orders, isLoading, onOrdersReorder }) {
  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(orders)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onOrdersReorder(items)
  }

  return (
    <div className="trip-list-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <table>
          <thead>
            <tr>
              <th>Stay</th>
              <th>Host</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-trips">
            {(provided) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  orders.reverse().map((order, index) => (
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
                          <Trip order={order} />
                        </tr>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  )
}