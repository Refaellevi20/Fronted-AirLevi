import { Trip } from './trip'

export function TripList({ orders, isLoading }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stay</th>
            <th>Host</th>
            <th>Dates</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            orders.map((order) => (
              <tr key={order._id}>
                <Trip order={order} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
