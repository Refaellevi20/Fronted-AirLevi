// import { makeAutoObservable } from 'mobx'

// export class AnalyticsStore {
//     bookings = []
//     revenue = []
//     reviews = []
//     occupancy = []

//     constructor() {
//         makeAutoObservable(this)
//     }

//     setData(type, data) {
//         this[type] = this.formatDataForChart(data)
//     }

//     formatDataForChart(data) {
//         if (!data || !data.length) return []
        
//         return [{
//             id: 'data',
//             data: data.map(item => ({
//                 x: new Date(item.date).toLocaleString('en-US', { month: 'short' }),
//                 y: item.count || item.amount || item.averageRating || item.rate || 0
//             }))
//         }]
//     }
// }

// export const analyticsStore = new AnalyticsStore()


//!!!!!!!!!!!!!!!!!! do not read  //!!!!!!!!!!!!!!