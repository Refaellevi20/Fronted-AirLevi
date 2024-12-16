import React from 'react';

export function TableSkeleton() {
  return (
    <div className="table-skeleton">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="skeleton-cell"></td>
              <td className="skeleton-cell"></td>
              <td className="skeleton-cell"></td>
              <td className="skeleton-cell"></td>
              <td className="skeleton-cell"></td>
              <td className="skeleton-cell"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
