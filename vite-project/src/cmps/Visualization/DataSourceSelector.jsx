export function DataSourceSelector({ selected, onChange }) {
    const dataSources = [
        { id: 'bookings', label: 'Bookings' },
        { id: 'revenue', label: 'Revenue' },
        { id: 'reviews', label: 'Reviews' }
    ]

    return (
        <div className="data-source-selector">
            <h4>Select Data Source</h4>
            <select value={selected} onChange={e => onChange(e.target.value)}>
                <option value="">Select a source...</option>
                {dataSources.map(source => (
                    <option key={source.id} value={source.id}>
                        {source.label}
                    </option>
                ))}
            </select>
        </div>
    )
}