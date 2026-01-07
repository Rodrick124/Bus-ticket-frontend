import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SeatMap from '../components/SeatMap'
import Button from '../components/Button'

export default function SeatSelection(){
  const { state } = useLocation()
  const navigate = useNavigate()
  const bus = state?.bus || { company: 'Unknown Operator', price: 5000, from: 'N/A', to: 'N/A', departure: '-' }

  // Example booked seats: allow override via state.booked array
  const booked = state?.booked || []

  const [seats, setSeats] = useState(state?.seats || [])

  const handleContinue = () => {
    if(seats.length === 0) return
    navigate('/passenger', { state: { bus, seats } })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4">
      <div className="card p-4 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold dark:text-gray-100">{bus.company}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{bus.from} → {bus.to} • {bus.departure}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold dark:text-gray-200">{bus.price} XAF</div>
          </div>
        </div>
      </div>

      <div className="card p-2 dark:bg-gray-800">
        <h3 className="font-semibold mb-3 dark:text-white">Select Seats</h3>
        <SeatMap price={bus.price} booked={booked} onChange={setSeats} initialSelected={seats} />
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">Seats: {seats.join(', ') || '—'}</div>
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold dark:text-gray-200">Total: {seats.length * bus.price} XAF</div>
            <Button onClick={handleContinue} disabled={seats.length===0}>Continue Booking</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
