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
                  orders.map((order, index) => (
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


// import React from 'react'
// import { DndProvider, useDrag, useDrop } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { TripPage } from '../../pages/TripPage'

// const ItemType = 'ORDER'

// const DraggableOrder = ({ order, index, moveOrder }) => {
//     const [{ isDragging }, drag] = useDrag({
//         type: ItemType,
//         item: { index },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     })

//     return (
//         <tr ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
//             <TripPage order={order} />
//         </tr>
//     )
// }

// const DroppableArea = ({ orders, moveOrder }) => {
//     const [, drop] = useDrop({
//         accept: ItemType,
//         hover(item) {
//             if (item.index !== index) {
//                 moveOrder(item.index, index)
//                 item.index = index; // Update the index for the dragged item
//             }
//         },
//     })

//     return (
//         <tbody ref={drop}>
//             {orders.map((order, index) => (
//                 <DraggableOrder key={order._id} order={order} index={index} moveOrder={moveOrder} />
//             ))}
//         </tbody>
//     )
// }

// export function OrderList({ orders, onOrdersReorder }) {
//     const moveOrder = (fromIndex, toIndex) => {
//         const updatedOrders = [...orders]
//         const [movedOrder] = updatedOrders.splice(fromIndex, 1)
//         updatedOrders.splice(toIndex, 0, movedOrder)
//         onOrdersReorder(updatedOrders); // Update the order in the parent component
//     }

//     return (
//         <DndProvider backend={HTML5Backend}>
//             <table className="orders-table">
//                 <thead>
//                     <tr>
//                         <th>Guest</th>
//                         <th>Dates</th>
//                         <th>Stay</th>
//                         <th>Total</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <DroppableArea orders={orders.reverse()} moveOrder={moveOrder} />
//             </table>
//         </DndProvider>
//     )
// }
