import { useState } from 'react'
import { LineChart } from './chart/LineChart'
import { BarChart } from './chart/BarChart'
import { PieChart } from './chart/PieChart'
import { ChartTypeSelector } from './ChartTypeSelector'

export function WidgetRenderer({ widget }) {
    const [chartType, setChartType] = useState(widget.type || 'line')
    const [data, setData] = useState(widget.data || [])

    const handleChartTypeChange = (newType) => {
        setChartType(newType)
    }

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return <LineChart data={data} />
            case 'bar':
                return <BarChart data={data} />
            case 'pie':
                return <PieChart data={transformToPieData(data)} />
            default:
                return <LineChart data={data} />
        }
    }

    const transformToPieData = (data) => {
        return data[0]?.data.map(item => ({
            id: item.x,
            label: item.x,
            value: item.y
        })) || []
    }

    return (
        <div className="widget-container">
            <div className="widget-header">
                <h3>{widget.title}</h3>
                <ChartTypeSelector 
                    selected={chartType} 
                    onChange={handleChartTypeChange} 
                />
            </div>
            <div className="widget-content">
                {renderChart()}
            </div>
        </div>
    )
}