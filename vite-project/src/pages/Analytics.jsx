import { useState } from 'react'
import { DashboardGrid } from '../cmps/Visualization/DashboardGrid'

export function Analytics() {
    //^ Hardcoded data for each chart
    const mockData = {
        bookings: [{
            id: "bookings",
            data: [
                { x: "Jan", y: 45 },
                { x: "Feb", y: 52 },
                { x: "Mar", y: 61 },
                { x: "Apr", y: 67 },
                { x: "May", y: 72 },
                { x: "Jun", y: 78 }
            ]
        }],
        revenue: [{
            id: "revenue",
            data: [
                { x: "Jan", y: 5400 },
                { x: "Feb", y: 6240 },
                { x: "Mar", y: 7320 },
                { x: "Apr", y: 8040 },
                { x: "May", y: 8640 },
                { x: "Jun", y: 9360 }
            ]
        }],
        reviews: [{
            id: "reviews",
            data: [
                { x: "Jan", y: 4.5 },
                { x: "Feb", y: 4.7 },
                { x: "Mar", y: 4.6 },
                { x: "Apr", y: 4.8 },
                { x: "May", y: 4.9 },
                { x: "Jun", y: 4.7 }
            ]
        }],
        occupancy: [{
            id: "occupancy",
            data: [
                { x: "Jan", y: 75 },
                { x: "Feb", y: 82 },
                { x: "Mar", y: 88 },
                { x: "Apr", y: 85 },
                { x: "May", y: 90 },
                { x: "Jun", y: 95 }
            ]
        }]
    }

    const items = [
        {
            id: 'bookings',
            title: 'Bookings',
            type: 'line',
            data: mockData.bookings,
            position: { x: 0, y: 0, w: 6, h: 2 }
        },
        {
            id: 'revenue',
            title: 'Revenue',
            type: 'bar',
            data: mockData.revenue,
            position: { x: 6, y: 0, w: 6, h: 2 }
        },
        {
            id: 'reviews',
            title: 'Reviews',
            type: 'line',
            data: mockData.reviews,
            position: { x: 0, y: 2, w: 6, h: 2 }
        },
        {
            id: 'occupancy',
            title: 'Occupancy Rate',
            type: 'line',
            data: mockData.occupancy,
            position: { x: 6, y: 2, w: 6, h: 2 }
        }
    ]

    return (
        <section className="analytics-page">
            <h1>Analytics Dashboard</h1>
            <DashboardGrid items={items} />
        </section>
    )
}

//^  works but no orders on last and next month so that not looking so good 
// import { useState, useEffect } from 'react'
// import { observer } from 'mobx-react-lite'
// import { DashboardGrid } from '../cmps/analytics/DashboardGrid'
// import { orderService } from '../services/order.service'
// import { reviewService } from '../services/review.service'

// export const Analytics = observer(() => {
//     const [analyticsData, setAnalyticsData] = useState({
//         bookings: [],
//         revenue: [],
//         reviews: [],
//         occupancy: []
//     })
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         loadAnalytics()
//     }, [])

//     async function loadAnalytics() {
//         try {
//             setIsLoading(true)
            
//             // Get orders
//             const orders = await orderService.query()
//             const reviews = await reviewService.query()

//             // Process data
//             const processedData = {
//                 bookings: processBookings(orders),
//                 revenue: processRevenue(orders),
//                 reviews: processReviews(reviews),
//                 occupancy: processOccupancy(orders)
//             }

//             setAnalyticsData(processedData)
//         } catch (err) {
//             console.error('Failed to load analytics:', err)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const items = [
//         {
//             id: 'bookings',
//             title: 'Bookings',
//             type: 'line',
//             data: [{
//                 id: 'bookings',
//                 data: analyticsData.bookings.map(item => ({
//                     x: new Date(item.date).toLocaleString('default', { month: 'short' }),
//                     y: item.count
//                 }))
//             }],
//             position: { x: 0, y: 0, w: 6, h: 2 }
//         },
//         {
//             id: 'revenue',
//             title: 'Revenue',
//             type: 'bar',
//             data: [{
//                 id: 'revenue',
//                 data: analyticsData.revenue.map(item => ({
//                     x: new Date(item.date).toLocaleString('default', { month: 'short' }),
//                     y: item.amount
//                 }))
//             }],
//             position: { x: 6, y: 0, w: 6, h: 2 }
//         },
//         {
//             id: 'reviews',
//             title: 'Reviews',
//             type: 'line',
//             data: [{
//                 id: 'reviews',
//                 data: analyticsData.reviews.map(item => ({
//                     x: new Date(item.date).toLocaleString('default', { month: 'short' }),
//                     y: item.rating
//                 }))
//             }],
//             position: { x: 0, y: 2, w: 6, h: 2 }
//         },
//         {
//             id: 'occupancy',
//             title: 'Occupancy Rate',
//             type: 'line',
//             data: [{
//                 id: 'occupancy',
//                 data: analyticsData.occupancy.map(item => ({
//                     x: new Date(item.date).toLocaleString('default', { month: 'short' }),
//                     y: item.rate
//                 }))
//             }],
//             position: { x: 6, y: 2, w: 6, h: 2 }
//         }
//     ]

//     if (isLoading) return <div>Loading...</div>

//     return (
//         <section className="analytics-page">
//             <h1>Analytics Dashboard</h1>
//             <DashboardGrid items={items} />
//         </section>
//     )
// })

// // Helper functions
// function processBookings(orders) {
//     const monthlyBookings = {}
    
//     orders.forEach(order => {
//         const date = new Date(order.createdAt)
//         const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
//         monthlyBookings[monthKey] = (monthlyBookings[monthKey] || 0) + 1
//     })

//     return Object.entries(monthlyBookings).map(([date, count]) => ({
//         date,
//         count
//     }))
// }

// function processRevenue(orders) {
//     const monthlyRevenue = {}
    
//     orders.forEach(order => {
//         const date = new Date(order.createdAt)
//         const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
//         monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + order.totalPrice
//     })

//     return Object.entries(monthlyRevenue).map(([date, amount]) => ({
//         date,
//         amount
//     }))
// }

// function processReviews(reviews) {
//     const monthlyReviews = {}
    
//     reviews.forEach(review => {
//         const date = new Date(review.createdAt)
//         const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
//         if (!monthlyReviews[monthKey]) {
//             monthlyReviews[monthKey] = { total: 0, count: 0 }
//         }
//         monthlyReviews[monthKey].total += review.rate
//         monthlyReviews[monthKey].count++
//     })

//     return Object.entries(monthlyReviews).map(([date, data]) => ({
//         date,
//         rating: data.total / data.count
//     }))
// }

// function processOccupancy(orders) {
//     const monthlyOccupancy = {}
    
//     orders.forEach(order => {
//         const checkIn = new Date(order.checkIn)
//         const monthKey = `${checkIn.getFullYear()}-${String(checkIn.getMonth() + 1).padStart(2, '0')}`
        
//         if (!monthlyOccupancy[monthKey]) {
//             monthlyOccupancy[monthKey] = { occupied: 0, total: 30 }
//         }
        
//         const days = Math.ceil((new Date(order.checkOut) - checkIn) / (1000 * 60 * 60 * 24))
//         monthlyOccupancy[monthKey].occupied += days
//     })

//     return Object.entries(monthlyOccupancy).map(([date, data]) => ({
//         date,
//         rate: Math.min((data.occupied / data.total) * 100, 100) // Cap at 100%
//     }))
// }