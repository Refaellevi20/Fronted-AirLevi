export function ChartTypeSelector({ selected, onChange }) {
    const chartTypes = [
        { id: 'line', label: 'Line Chart', icon: '📈' },
        { id: 'bar', label: 'Bar Chart', icon: '📊' },
        { id: 'pie', label: 'Pie Chart', icon: '🥧' }
    ]

    return (
        <div className="chart-type-selector">
            <h4>Select Chart Type</h4>
            <div className="chart-options">
                {chartTypes.map(type => (
                    <button
                        key={type.id}
                        className={`chart-option ${selected === type.id ? 'selected' : ''}`}
                        onClick={() => onChange(type.id)}
                    >
                        <span className="chart-icon">{type.icon}</span>
                        {type.label}
                    </button>
                ))}
            </div>
        </div>
    )
}