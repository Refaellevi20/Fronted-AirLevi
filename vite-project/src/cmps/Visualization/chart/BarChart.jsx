import { ResponsiveBar } from '@nivo/bar'

export function BarChart({ data }) {
    const transformedData = data[0].data.map(d => ({
        month: d.x,
        value: d.y
    }))

    return (
        <div style={{ height: '100%' }}>
            <ResponsiveBar
                data={transformedData}
                keys={['value']}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                colors={{ scheme: 'nivo' }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
            />
        </div>
    )
}