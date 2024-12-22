// import React from 'react';
// import moment from 'moment';
// import Dashboard from '../pages/DashboardPage';
// import { useSelector } from 'react-redux'

// const ParentComponent = () => {
//     const orders = useSelector((storeState) => storeState.orderModule.orders).sort((a, b) => b.startDate - a.startDate)
//     const filteredOrders = orders.filter((order) => 
//     order.status === 'Accepted' || order.status === 'Completed'
//   )
//   console.log("Filtered Orders:", filteredOrders)

//   // Prepare data for the chart
//   const payments = filteredOrders.map((order) => ({
//     id: order.id,
//     amount: order.stay?.price * (moment(order.endDate).diff(moment(order.startDate), 'days')),
//     date: moment(order.startDate).format('MMM D, YYYY'),
//     status: order.status,
//   }))

//   console.log("Payments:", payments)


//   const paymentTrends = filteredOrders.map((order) => 
//     order.stay?.price * (moment(order.endDate).diff(moment(order.startDate), 'days')) // Trend data for chart
//   )

//   return (
//     <div>
//       <Dashboard payments={payments} paymentTrends={paymentTrends} />
//     </div>
//   )
// }

// export default ParentComponent;
