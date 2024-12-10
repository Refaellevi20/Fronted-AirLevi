
export function PrgoressBar({ progress }) {
    const FULL_BAR = 5
    const percentage = progress / FULL_BAR * 100

    return (
        <div 
        style={{
          backgroundColor: '#ddd',
          width: '75%',
          height: '0.25rem',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div 
          style={{
            backgroundColor: '#222222',
            width: `${percentage}%`,
            height: '100%',
            borderRadius: 'inherit',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      </div>
    )
}