export function ReviewItem({ review }) {
    const { txt, rate, by } = review
  
    return (
      <div className="review-card" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={by.imgUrl}
            alt={`${by.fullname}'s avatar`}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <h4>{by.fullname}</h4>
        </div>
        <p>{txt}</p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '0.9rem' }}>
          <span>Cleanliness: {rate.cleanliness}</span>
          <span>Communication: {rate.communication}</span>
          <span>Check-in: {rate['check-in']}</span>
          <span>Accuracy: {rate.accuracy}</span>
          <span>Location: {rate.location}</span>
          <span>Value: {rate.value}</span>
        </div>
      </div>
    )
  }
  