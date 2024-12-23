import { useState } from 'react'

export function OrderSortMsg({ onSort }) {
    const [selectedStatus, setSelectedStatus] = useState('all')

    function handleChange(ev){
        const status = ev.target.value
        setSelectedStatus(status)
        onSort(status)
    }

    return (
        <select 
            className="order-sort-select" 
            value={selectedStatus}
            onChange={handleChange}
        >
            <option value="all">All Messages</option>
            <option value="pending">Pending</option>
            <option value="approved">Active</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
        </select>
    )
}