import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

type Payment = {
  id: number
  amount: number
  date: string
  status: string
}

type DashboardProps = {
  payments: Payment[]
  paymentTrends: number[]
}

const Dashboard: React.FC<DashboardProps> = ({ payments, paymentTrends }) => {
  const data = {
    labels: payments.map((payment) => payment.date),
    datasets: [
      {
        label: 'Payment Trend',
        data: paymentTrends,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        pointBorderColor: '#ff5722',
        pointBackgroundColor: '#ff5722',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0, 
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Payment Trend (Stock-like)',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          callback: (value: number) => `$${value.toFixed(2)}`,
        },
      },
    },
  }

  return (
    <div >
      <h2>Payment Dashboard</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          {/* <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr> */}
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{payment.id}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.date}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ width: '100%', height: '400px' }}>
        <Line data={data} />
      </div>
    </div>
  )
}
// options={options}
export default Dashboard
