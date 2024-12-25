const sampleData = {
    bookings: [
        { x: 'Jan', y: 12 },
        { x: 'Feb', y: 19 },
        { x: 'Mar', y: 25 },
        { x: 'Apr', y: 22 },
        { x: 'May', y: 28 },
        { x: 'Jun', y: 32 }
    ],
    revenue: [
        { x: 'Jan', y: 1200 },
        { x: 'Feb', y: 1900 },
        { x: 'Mar', y: 2500 },
        { x: 'Apr', y: 2200 },
        { x: 'May', y: 2800 },
        { x: 'Jun', y: 3200 }
    ],
    reviews: [
        { x: 'Jan', y: 4.5 },
        { x: 'Feb', y: 4.7 },
        { x: 'Mar', y: 4.6 },
        { x: 'Apr', y: 4.8 },
        { x: 'May', y: 4.9 },
        { x: 'Jun', y: 4.7 }
    ],
    occupancy: [
        { x: 'Jan', y: 75 },
        { x: 'Feb', y: 82 },
        { x: 'Mar', y: 88 },
        { x: 'Apr', y: 85 },
        { x: 'May', y: 90 },
        { x: 'Jun', y: 95 }
    ]
}

// export const analyticsService = {
//     getBookingStats,
//     getRevenueData,
//     getReviewMetrics,
//     getOccupancyRates,
//     getCustomInsight,
//     sampleData
// }

import { httpService } from './http.service'

export const analyticsService = {
    async getBookingStats(filters = {}) {
        try {
            const data = await httpService.get('analytics/bookings', filters)
            return [{
                id: "bookings",
                data: data.map(item => ({
                    x: formatMonth(item.date),
                    y: item.count
                }))
            }]
        } catch (error) {
            console.error('Failed to fetch booking stats:', error)
            return [{
                id: "bookings",
                data: []
            }]
        }
    },

    async getRevenueData(filters = {}) {
        try {
            const data = await httpService.get('analytics/revenue', filters)
            return [{
                id: "revenue",
                data: data.map(item => ({
                    x: formatMonth(item.date),
                    y: item.amount
                }))
            }]
        } catch (error) {
            console.error('Failed to fetch revenue data:', error)
            return [{
                id: "revenue",
                data: []
            }]
        }
    },

    async getReviewMetrics(filters = {}) {
        try {
            const data = await httpService.get('analytics/reviews', filters)
            return [{
                id: "reviews",
                data: data.map(item => ({
                    x: formatMonth(item.date),
                    y: item.averageRating
                }))
            }]
        } catch (error) {
            console.error('Failed to fetch review metrics:', error)
            return [{
                id: "reviews",
                data: []
            }]
        }
    },

    async getOccupancyRates(filters = {}) {
        try {
            const data = await httpService.get('analytics/occupancy', filters)
            return [{
                id: "occupancy",
                data: data.map(item => ({
                    x: formatMonth(item.date),
                    y: item.rate
                }))
            }]
        } catch (error) {
            console.error('Failed to fetch occupancy rates:', error)
            return [{
                id: "occupancy",
                data: []
            }]
        }
    }
}

function formatMonth(dateString) {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { month: 'short' })
}