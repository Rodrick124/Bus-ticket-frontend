import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function BookingSummary(){
  const {state} = useLocation()
  const booking = state?.booking || JSON.parse(localStorage.getItem('latestBooking')||'null')

  if(!booking) return (
    <div className="card p-4">
      <h3 className="font-bold">No booking found</h3>
      <Link to="/" className="text-primary">Back to Home</Link>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3 className="font-bold">Booking Summary</h3>
        <div className="mt-2 text-sm text-gray-700">
          <div><strong>Route:</strong> {booking.bus.from} → {booking.bus.to}</div>
          <div><strong>Operator:</strong> {booking.bus.company}</div>
          <div><strong>Seats:</strong> {booking.seats.join(', ')}</div>
          <div><strong>Passenger:</strong> {booking.passenger?.name}</div>
          <div className="mt-2 text-lg font-semibold">Total: {booking.total} XAF</div>
        </div>
      </div>

      <div className="card p-4 text-center">
        <div className="text-green-600 font-semibold">Success — Reservation saved</div>
        <div className="mt-3">
          <Link to="/" className="text-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
