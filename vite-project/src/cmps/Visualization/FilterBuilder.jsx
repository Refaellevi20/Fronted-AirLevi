import { useState } from 'react'

export function FilterBuilder({ filters, onChange }) {
    const [currentFilter, setCurrentFilter] = useState({
        field: '',
        operator: '',
        value: ''
    })

    const filterFields = [
        { id: 'price', label: 'Price', type: 'number' },
        { id: 'rating', label: 'Rating', type: 'number' },
        { id: 'status', label: 'Status', type: 'select', 
          options: ['pending', 'completed', 'cancelled'] },
        { id: 'date', label: 'Date', type: 'date' }
    ]

    const operators = [
        { id: 'eq', label: 'Equals', types: ['number', 'select'] },
        { id: 'gt', label: 'Greater Than', types: ['number', 'date'] },
        { id: 'lt', label: 'Less Than', types: ['number', 'date'] },
        { id: 'between', label: 'Between', types: ['number', 'date'] }
    ]

    const handleAddFilter = () => {
        if (currentFilter.field && currentFilter.operator && currentFilter.value) {
            onChange([...filters, currentFilter])
            setCurrentFilter({ field: '', operator: '', value: '' })
        }
    }

    const handleRemoveFilter = (index) => {
        const newFilters = filters.filter((_, idx) => idx !== index)
        onChange(newFilters)
    }

    const getOperatorsForField = (fieldType) => {
        return operators.filter(op => op.types.includes(fieldType))
    }

    return (
        <div className="filter-builder">
            <div className="filter-builder-header">
                <h4>Filters</h4>
                <div className="active-filters">
                    {filters.map((filter, index) => (
                        <div key={index} className="filter-tag">
                            <span>{filterFields.find(f => f.id === filter.field)?.label}</span>
                            <span>{operators.find(op => op.id === filter.operator)?.label}</span>
                            <span>{filter.value}</span>
                            <button 
                                className="remove-filter"
                                onClick={() => handleRemoveFilter(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-builder-form">
                <div className="filter-field">
                    <select 
                        value={currentFilter.field}
                        onChange={(e) => setCurrentFilter(prev => ({
                            ...prev,
                            field: e.target.value,
                            operator: '',
                            value: ''
                        }))}
                    >
                        <option value="">Select Field</option>
                        {filterFields.map(field => (
                            <option key={field.id} value={field.id}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>

                {currentFilter.field && (
                    <div className="filter-operator">
                        <select
                            value={currentFilter.operator}
                            onChange={(e) => setCurrentFilter(prev => ({
                                ...prev,
                                operator: e.target.value,
                                value: ''
                            }))}
                        >
                            <option value="">Select Operator</option>
                            {getOperatorsForField(
                                filterFields.find(f => f.id === currentFilter.field)?.type
                            ).map(op => (
                                <option key={op.id} value={op.id}>
                                    {op.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {currentFilter.operator && (
                    <div className="filter-value">
                        {filterFields.find(f => f.id === currentFilter.field)?.type === 'select' ? (
                            <select
                                value={currentFilter.value}
                                onChange={(e) => setCurrentFilter(prev => ({
                                    ...prev,
                                    value: e.target.value
                                }))}
                            >
                                <option value="">Select Value</option>
                                {filterFields
                                    .find(f => f.id === currentFilter.field)
                                    ?.options.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                            </select>
                        ) : filterFields.find(f => f.id === currentFilter.field)?.type === 'date' ? (
                            <input
                                type="date"
                                value={currentFilter.value}
                                onChange={(e) => setCurrentFilter(prev => ({
                                    ...prev,
                                    value: e.target.value
                                }))}
                            />
                        ) : (
                            <input
                                type="number"
                                value={currentFilter.value}
                                onChange={(e) => setCurrentFilter(prev => ({
                                    ...prev,
                                    value: e.target.value
                                }))}
                                placeholder="Enter value"
                            />
                        )}
                    </div>
                )}

                {currentFilter.value && (
                    <button 
                        className="add-filter-btn"
                        onClick={handleAddFilter}
                    >
                        Add Filter
                    </button>
                )}
            </div>
        </div>
    )
}