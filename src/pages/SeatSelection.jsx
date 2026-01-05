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
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold">{bus.company}</div>
            <div className="text-sm text-gray-600">{bus.from} → {bus.to} • {bus.departure}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{bus.price} XAF</div>
          </div>
        </div>
      </div>

      <div className="card p-2">
        <h3 className="font-semibold mb-3">Select Seats</h3>
        <SeatMap price={bus.price} booked={booked} onChange={setSeats} initialSelected={seats} />
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Seats: {seats.join(', ') || '—'}</div>
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">Total: {seats.length * bus.price} XAF</div>
            <Button onClick={handleContinue} disabled={seats.length===0}>Continue Booking</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
