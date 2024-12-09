

import React from 'react';

export function StayCard() {
  const price = 137;
  const originalPrice = 189;
  const checkIn = '12/26/2024';
  const checkOut = '12/27/2024';
  const guests = {
    adults: 2,
    infants: 5,
    pets: 5,
  };

  const totalPrice = price * 1

  return (
    <section style={cardStyle}>
      <div style={cardContentStyle}>
        <div style={priceStyle}>
          <span style={discountedPriceStyle}>${price}</span>
          <span style={originalPriceStyle}>${originalPrice}</span>
        </div>

        <div style={nightTextStyle}>night</div>

        <div style={dateStyle}>
          <p>Check-in: {checkIn}</p>
          <p>Checkout: {checkOut}</p>
        </div>

        <div style={guestsStyle}>
          <p>
            {guests.adults} guests, {guests.infants} infants, {guests.pets} pets
          </p>
        </div>

        {/* Price breakdown */}
        <div style={priceBreakdownStyle}>
          <p>
            ${price} x 1 night
          </p>
          <button style={reserveButtonStyle}>Reserve</button>
        </div>

        {/* Total */}
        <div style={totalStyle}>
          <p>Total: ${totalPrice}</p>
        </div>
      </div>
    </section>
  );
}

// Style for the card
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  width: '300px',
  padding: '16px',
  backgroundColor: '#fff',
};

const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const priceStyle = {
  display: 'flex',
  alignItems: 'center',
};

const discountedPriceStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#d32f2f',
  marginRight: '10px',
};

const originalPriceStyle = {
  fontSize: '16px',
  textDecoration: 'line-through',
  color: '#999',
};

const nightTextStyle = {
  fontSize: '14px',
  color: '#666',
};

const dateStyle = {
  fontSize: '14px',
  margin: '8px 0',
};

const guestsStyle = {
  fontSize: '14px',
  margin: '8px 0',
};

const priceBreakdownStyle = {
  fontSize: '14px',
  margin: '8px 0',
};

const reserveButtonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
};

const totalStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  color: '#333',
};
