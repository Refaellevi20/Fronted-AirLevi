import { useState } from 'react'
import { ChartTypeSelector } from './ChartTypeSelector'
import { DataSourceSelector } from './DataSourceSelector'
import { FilterBuilder } from './FilterBuilder'

export function CustomInsightBuilder() {
    const [insight, setInsight] = useState({
        type: 'line',
        dataSource: '',
        filters: [],
        metrics: []
    })

    return (
        <div className="insight-builder">
            <h3>Create Custom Insight</h3>
            <ChartTypeSelector 
                selected={insight.type}
                onChange={type => setInsight(prev => ({...prev, type}))}
            />
            <DataSourceSelector 
                selected={insight.dataSource}
                onChange={ds => setInsight(prev => ({...prev, dataSource: ds}))}
            />
            <FilterBuilder 
                filters={insight.filters}
                onChange={filters => setInsight(prev => ({...prev, filters}))}
            />
        </div>
    )
}