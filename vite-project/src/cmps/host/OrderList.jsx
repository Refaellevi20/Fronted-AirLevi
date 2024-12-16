import { Order } from './Order'

export function OrderList({ orders, isLoading }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Dates</th>
            <th>Stay</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {!isLoading && orders.reverse().map((order) => (
            <tr key={order._id}>
              <Order order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
