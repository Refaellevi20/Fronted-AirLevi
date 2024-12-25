import { useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

export function DashboardGrid({ items }) {
    const [chartTypes, setChartTypes] = useState({})

    const handleChartTypeChange = (itemId, type) => {
        setChartTypes(prev => ({ ...prev, [itemId]: type }))
    }

    const renderChart = (item) => {
        const type = chartTypes[item.id] || item.type
        const chartHeight = '300px'

        switch (type) {
            case 'line':
                return (
                    <div style={{ height: chartHeight }}>
                        <ResponsiveLine
                            data={item.data}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                            axisTop={null}
                            axisRight={null}
                            pointSize={10}
                            useMesh={true}
                        />
                    </div>
                )
            case 'bar':
                return (
                    <div style={{ height: chartHeight }}>
                        <ResponsiveBar
                            data={item.data[0].data}
                            keys={['y']}
                            indexBy="x"
                            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            colors={{ scheme: 'nivo' }}
                            axisTop={null}
                            axisRight={null}
                        />
                    </div>
                )
            case 'pie':
                return (
                    <div style={{ height: chartHeight }}>
                        <ResponsivePie
                            data={item.data[0].data.map(d => ({
                                id: d.x,
                                label: d.x,
                                value: d.y
                            }))}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="dashboard-grid">
            {items.map(item => (
                <div key={item.id} className="dashboard-item" style={{
                    gridColumn: `span ${item.position.w}`,
                    gridRow: `span ${item.position.h}`
                }}>
                    <div className="widget-header">
                        <h3>{item.title}</h3>
                        <div className="chart-controls">
                            <button 
                                className={`chart-btn ${(chartTypes[item.id] || item.type) === 'line' ? 'active' : ''}`}
                                onClick={() => handleChartTypeChange(item.id, 'line')}
                            >
                                📈 Line
                            </button>
                            <button 
                                className={`chart-btn ${(chartTypes[item.id] || item.type) === 'bar' ? 'active' : ''}`}
                                onClick={() => handleChartTypeChange(item.id, 'bar')}
                            >
                                📊 Bar
                            </button>
                            <button 
                                className={`chart-btn ${(chartTypes[item.id] || item.type) === 'pie' ? 'active' : ''}`}
                                onClick={() => handleChartTypeChange(item.id, 'pie')}
                            >
                                🥧 Pie
                            </button>
                        </div>
                    </div>
                    <div className="widget-content">
                        {renderChart(item)}
                    </div>
                </div>
            ))}
        </div>
    )
}

//^  works but no orders on last and next month so that not looking so good 
// import { useState } from 'react'
// import { ResponsiveLine } from '@nivo/line'
// import { ResponsiveBar } from '@nivo/bar'
// import { ResponsivePie } from '@nivo/pie'

// export function DashboardGrid({ items }) {
//     const [chartTypes, setChartTypes] = useState({})

//     const handleChartTypeChange = (itemId, type) => {
//         setChartTypes(prev => ({ ...prev, [itemId]: type }))
//     }

//     const renderChart = (item) => {
//         const type = chartTypes[item.id] || item.type
//         const chartHeight = '300px'

//         // Ensure data exists and has the correct structure
//         if (!item.data?.[0]?.data || item.data[0].data.length === 0) {
//             return <div>No data available</div>
//         }

//         switch (type) {
//             case 'line':
//                 return (
//                     <div style={{ height: chartHeight }}>
//                         <ResponsiveLine
//                             data={item.data}
//                             margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                             xScale={{ type: 'point' }}
//                             yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
//                             axisTop={null}
//                             axisRight={null}
//                             pointSize={10}
//                             useMesh={true}
//                         />
//                     </div>
//                 )
//             case 'bar':
//                 return (
//                     <div style={{ height: chartHeight }}>
//                         <ResponsiveBar
//                             data={item.data[0].data}
//                             keys={['y']}
//                             indexBy="x"
//                             margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//                             padding={0.3}
//                             valueScale={{ type: 'linear' }}
//                             colors={{ scheme: 'nivo' }}
//                             axisTop={null}
//                             axisRight={null}
//                         />
//                     </div>
//                 )
//             case 'pie':
//                 return (
//                     <div style={{ height: chartHeight }}>
//                         <ResponsivePie
//                             data={item.data[0].data.map(d => ({
//                                 id: d.x,
//                                 label: d.x,
//                                 value: d.y
//                             }))}
//                             margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//                             innerRadius={0.5}
//                             padAngle={0.7}
//                             cornerRadius={3}
//                             activeOuterRadiusOffset={8}
//                         />
//                     </div>
//                 )
//             default:
//                 return <div>Invalid chart type</div>
//         }
//     }

//     return (
//         <div className="dashboard-grid">
//             {items.map(item => (
//                 <div key={item.id} className="dashboard-item" style={{
//                     gridColumn: `span ${item.position.w}`,
//                     gridRow: `span ${item.position.h}`
//                 }}>
//                     <div className="widget-header">
//                         <h3>{item.title}</h3>
//                         <div className="chart-controls">
//                             <button 
//                                 className={`chart-btn ${(chartTypes[item.id] || item.type) === 'line' ? 'active' : ''}`}
//                                 onClick={() => handleChartTypeChange(item.id, 'line')}
//                             >
//                                 📈 Line
//                             </button>
//                             <button 
//                                 className={`chart-btn ${(chartTypes[item.id] || item.type) === 'bar' ? 'active' : ''}`}
//                                 onClick={() => handleChartTypeChange(item.id, 'bar')}
//                             >
//                                 📊 Bar
//                             </button>
//                             <button 
//                                 className={`chart-btn ${(chartTypes[item.id] || item.type) === 'pie' ? 'active' : ''}`}
//                                 onClick={() => handleChartTypeChange(item.id, 'pie')}
//                             >
//                                 🥧 Pie
//                             </button>
//                         </div>
//                     </div>
//                     <div className="widget-content">
//                         {renderChart(item)}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }