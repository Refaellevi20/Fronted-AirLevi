import React from 'react'

function getStatusStyles(status) {
  switch (status) {
    case 'pending':
      return { color: '#FFA500', text: 'Pending' }
    case 'approved':
      return { color: '#00FF00', text: 'Approved' }
    case 'completed':
      return { color: '#0000FF', text: 'Completed' }
    case 'rejected':
      return { color: '#FF0000', text: 'Rejected' }
    default:
      return { color: '#696969', text: 'Unknown' }
  }
}

// OrderStatus component
export function OrderStatus({ status }){
  const { color, text } = getStatusStyles(status)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span 
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: color,
          marginRight: '8px',
          animation: 'pulse 1.5s ease-out infinite',
        }} 
      />
      <span style={{ fontWeight: 'bold' }}>
        {text}
      </span>
    </div>
  )
}
